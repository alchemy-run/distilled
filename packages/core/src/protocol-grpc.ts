/**
 * gRPC (binary protobuf) protocol for proto-sourced SDKs.
 *
 * Proto SDKs are generated as REST-shaped operations: each RPC is
 * `POST /<package>.<Service>/<Method>` with a proto3 JSON body. Servers that
 * accept JSON (Connect, grpc-gateway) use {@link makeRestProtocol} directly.
 * Servers that only speak gRPC use this protocol, which builds the request
 * with the REST protocol and speaks gRPC on the wire:
 *
 * - **Request**: the proto3 JSON body is transcoded to one protobuf message
 *   ({@link encodeMessage}) in one gRPC frame, sent as `application/grpc`.
 * - **Transport**: the call goes through the `HttpClient` the
 *   `GrpcTransport` reference holds, or the caller's `HttpClient` when it
 *   holds none (see `@distilled.cloud/core/grpc-transport`). Plain `fetch`
 *   works where a proxy bridges HTTP/1.1 to gRPC (envoy).
 * - **Status**: the call's `grpc-status` is read from the trailers, or from
 *   the headers of a trailers-only reply. A transport that can't see
 *   trailers (`fetch`) leaves only the headers; a reply with message frames
 *   and no status there is treated as OK.
 * - **Errors**: a non-zero status becomes the operation's typed error. The
 *   REST decoder receives `{ code, status, message }` (`{ code: 5, status:
 *   "NOT_FOUND", ... }`) with the HTTP status grpc-gateway maps the code to
 *   (`NOT_FOUND` -> 404, `UNAVAILABLE` -> 503, ...), so error matchers key on
 *   the numeric gRPC `code`, and categories and retries follow the HTTP
 *   status.
 * - **Response**: protobuf messages are transcoded back to proto3 JSON and
 *   decoded by the operation's output schema, so schemas, sensitive values
 *   and response validation behave exactly as for REST.
 *
 * A server-streaming method's output is `{ items: [message, ...] }`. Calling
 * the operation collects the whole stream; its `.stream(input)` (see
 * `API.makeStreaming`) emits each message as it arrives, and stopping the
 * stream cancels the call.
 *
 * {@link Deadline} bounds calls in its scope: it is sent as `grpc-timeout`
 * and enforced here, and a call that runs past it fails with
 * `DEADLINE_EXCEEDED` (code 4).
 */
import * as Context from "effect/Context";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import type * as HttpBody from "effect/http/HttpBody";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Stream from "effect/Stream";
import * as API from "./api.ts";
import { GrpcTransport, trailersOf } from "./grpc-transport.ts";
import {
  decodeMessage,
  encodeMessage,
  frame,
  FrameReader,
  type ProtobufEncodeError,
  type ProtoDescriptors,
} from "./protobuf.ts";
import { InvalidInput } from "./protocol-http.ts";
import { makeRestProtocol, type RestProtocolOptions } from "./protocol-rest.ts";
import * as Telemetry from "./telemetry.ts";

/** gRPC status code -> name. */
export const GRPC_STATUS_NAMES: Readonly<Record<number, string>> = {
  0: "OK",
  1: "CANCELLED",
  2: "UNKNOWN",
  3: "INVALID_ARGUMENT",
  4: "DEADLINE_EXCEEDED",
  5: "NOT_FOUND",
  6: "ALREADY_EXISTS",
  7: "PERMISSION_DENIED",
  8: "RESOURCE_EXHAUSTED",
  9: "FAILED_PRECONDITION",
  10: "ABORTED",
  11: "OUT_OF_RANGE",
  12: "UNIMPLEMENTED",
  13: "INTERNAL",
  14: "UNAVAILABLE",
  15: "DATA_LOSS",
  16: "UNAUTHENTICATED",
};

/** gRPC status code -> HTTP status (grpc-gateway's mapping). */
export const GRPC_HTTP_STATUS: Readonly<Record<number, number>> = {
  0: 200,
  1: 499,
  2: 500,
  3: 400,
  4: 504,
  5: 404,
  6: 409,
  7: 403,
  8: 429,
  9: 400,
  10: 409,
  11: 400,
  12: 501,
  13: 500,
  14: 503,
  15: 500,
  16: 401,
};

/**
 * The deadline of gRPC calls in its scope, from when each call starts.
 * `undefined` (the default) sets none.
 *
 * ```ts
 * router.taskExecWait(input).pipe(Effect.provideService(Deadline, "30 seconds"));
 * ```
 */
export const Deadline = /*@__PURE__*/ Context.Reference<Duration.Input | undefined>(
  "@distilled.cloud/core/protocol-grpc/Deadline",
  { defaultValue: () => undefined },
);

export interface GrpcProtocolOptions<C> extends RestProtocolOptions<C> {
  /** The SDK's generated descriptors (`src/descriptors.ts`). */
  readonly descriptors: ProtoDescriptors;
}

type Headers = Readonly<Record<string, string | undefined>>;

const textDecoder = /*@__PURE__*/ new TextDecoder();

const isEncodeError = (cause: unknown): cause is ProtobufEncodeError =>
  typeof cause === "object" &&
  cause !== null &&
  "_tag" in cause &&
  cause._tag === "ProtobufEncodeError";

const methodPath = (url: string): string => {
  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
};

/** The JSON a REST request carries, or `undefined` for an empty body. */
const jsonBody = (body: HttpBody.Uint8Array | HttpBody.Raw | HttpBody.Empty): unknown => {
  switch (body._tag) {
    case "Empty":
      return undefined;
    case "Uint8Array": {
      const text = textDecoder.decode(body.body);
      return text ? JSON.parse(text) : undefined;
    }
    case "Raw":
      return typeof body.body === "string" && body.body ? JSON.parse(body.body) : body.body;
  }
};

const jsonResponse = (
  request: HttpClientRequest.HttpClientRequest,
  status: number,
  headers: Record<string, string>,
  value: unknown,
): HttpClientResponse.HttpClientResponse =>
  HttpClientResponse.fromWeb(
    request,
    new Response(JSON.stringify(value), {
      status,
      headers: { ...headers, "content-type": "application/json" },
    }),
  );

const plainHeaders = (headers: Headers) => {
  const out: Record<string, string> = {};
  for (const key in headers) {
    const v = headers[key];
    if (v !== undefined && key !== "content-length" && key !== "content-type") out[key] = v;
  }
  return out;
};

const statusOf = (value: string | undefined): number | undefined =>
  value === undefined || value === "" ? undefined : Number(value);

const messageOf = (raw: string | undefined, status: number): string => {
  let message = raw ?? "";
  try {
    message = decodeURIComponent(message);
  } catch {
    // Not percent-encoded: keep it as sent.
  }
  return message || GRPC_STATUS_NAMES[status] || `gRPC status ${status}`;
};

/** A `grpc-timeout` value for `ms` (at most 8 digits per the spec). */
const grpcTimeout = (ms: number): string => {
  const rounded = Math.max(1, Math.ceil(ms));
  if (rounded < 1e8) return `${rounded}m`;
  const seconds = Math.ceil(rounded / 1000);
  return seconds < 1e8 ? `${seconds}S` : `${Math.min(99_999_999, Math.ceil(seconds / 3600))}H`;
};

type DecodeArgs = Omit<Parameters<API.ProtocolShape["decode"]>[0], "response">;

/**
 * A gRPC protocol over the given REST protocol options. See the module
 * documentation for the wire behavior.
 */
export const makeGrpcProtocol = <C>(options: GrpcProtocolOptions<C>): Layer.Layer<API.Protocol> =>
  Layer.effect(
    API.Protocol,
    Effect.map(Effect.service(API.Protocol), (rest) => {
      const d = options.descriptors;
      const methodOf = (url: string) => d.methods[methodPath(url)];

      /** The REST request as one gRPC frame of protobuf. */
      const encode: API.ProtocolShape["encode"] = (args) =>
        Effect.flatMap(rest.encode(args), (request) => {
          const method = methodOf(request.url);
          if (!method) return Effect.die(new Error(`no gRPC descriptor for ${request.url}`));
          const body = request.body;
          if (body._tag !== "Empty" && body._tag !== "Uint8Array" && body._tag !== "Raw") {
            return Effect.die(new Error(`gRPC requests need a JSON body, got ${body._tag}`));
          }
          let payload: Uint8Array;
          try {
            payload = encodeMessage(d, method[0], jsonBody(body) ?? {});
          } catch (cause) {
            if (isEncodeError(cause)) {
              // The encode channel is typed `never`; InvalidInput is part of
              // every operation's declared error channel.
              return Effect.fail(
                new InvalidInput({ member: method[0], message: cause.message }),
              ) as unknown as Effect.Effect<HttpClientRequest.HttpClientRequest>;
            }
            return Effect.die(cause);
          }
          return Effect.succeed(
            request.pipe(
              HttpClientRequest.bodyUint8Array(frame(payload), "application/grpc"),
              HttpClientRequest.setHeader("te", "trailers"),
            ),
          );
        });

      /** A gRPC status as the REST decoder sees it: the operation's typed error. */
      const failWith = (
        args: DecodeArgs,
        request: HttpClientRequest.HttpClientRequest,
        headers: Headers,
        status: number,
        message: string | undefined,
      ): Effect.Effect<never> =>
        Effect.flatMap(
          rest.decode({
            ...args,
            response: jsonResponse(
              request,
              GRPC_HTTP_STATUS[status] ?? 500,
              plainHeaders(headers),
              {
                code: status,
                status: GRPC_STATUS_NAMES[status] ?? String(status),
                message: messageOf(message, status),
              },
            ),
          }),
          () => Effect.die(new Error(`gRPC status ${status} decoded as a success`)),
        );

      /** A reply value decoded by the operation's output schema. */
      const succeedWith = (
        args: DecodeArgs,
        request: HttpClientRequest.HttpClientRequest,
        headers: Headers,
        value: unknown,
      ) =>
        rest.decode({
          ...args,
          response: jsonResponse(request, 200, plainHeaders(headers), value),
        });

      const parseFailure = (body: unknown, cause: unknown): Effect.Effect<never> =>
        Effect.fail(options.parseError({ body, cause })) as Effect.Effect<never>;

      const deadlineMillis = (context: Context.Context<any>): number | undefined => {
        const deadline = Context.get(context, Deadline);
        return deadline === undefined ? undefined : Duration.toMillis(deadline);
      };

      /** Send a call through the transport in scope, with the deadline in scope. */
      const send = (
        context: Context.Context<any>,
        operation: API.PreparedOperation,
        input: unknown,
        ms: number | undefined,
      ) =>
        Effect.flatMap(
          encode({ input, inputAst: operation.inputAst, config: operation.config }),
          (encoded) => {
            const request =
              ms === undefined
                ? encoded
                : HttpClientRequest.setHeader(encoded, "grpc-timeout", grpcTimeout(ms));
            const client =
              Context.get(context, GrpcTransport) ?? Context.get(context, HttpClient.HttpClient);
            return Telemetry.execute(context, client, request);
          },
        );

      /** Decode a whole reply (its body read to the end). */
      const decode: API.ProtocolShape["decode"] = (args) => {
        const { response } = args;
        const headers = response.headers as Headers;
        const contentType = headers["content-type"] ?? "";
        // A proxy's own failure (415, 503 text/plain) is not gRPC: let the
        // REST decoder classify it by HTTP status.
        if (!contentType.startsWith("application/grpc")) return rest.decode(args);
        const request = response.request;
        const method = methodOf(request.url);
        if (!method) return Effect.die(new Error(`no gRPC descriptor for ${request.url}`));
        // Protocol effects carry no error type: callers see the operation's.
        return Effect.flatMap(response.arrayBuffer as Effect.Effect<ArrayBuffer>, (buffer) =>
          Effect.flatMap(trailersOf(response), (trailers) => {
            const status = statusOf(trailers["grpc-status"] ?? headers["grpc-status"]);
            if (status !== undefined && status !== 0) {
              return failWith(
                args,
                request,
                headers,
                status,
                trailers["grpc-message"] ?? headers["grpc-message"],
              );
            }
            const reader = new FrameReader();
            let frames: Uint8Array[];
            try {
              frames = reader.push(new Uint8Array(buffer));
            } catch (cause) {
              return parseFailure(buffer, cause);
            }
            if (reader.rest !== 0) return parseFailure(buffer, "truncated gRPC frame");
            if (frames.length === 0 && status === undefined) {
              return failWith(
                args,
                request,
                headers,
                2,
                "gRPC response carried no message and no grpc-status",
              );
            }
            const [, responseType, stream] = method;
            let value: unknown;
            try {
              value = stream
                ? { items: frames.map((f) => decodeMessage(d, responseType, f)) }
                : frames.length === 0
                  ? {}
                  : decodeMessage(d, responseType, frames[0]!);
            } catch (cause) {
              return parseFailure(buffer, cause);
            }
            return succeedWith(args, request, headers, value);
          }),
        );
      };

      const deadlineExceeded = (args: DecodeArgs, url: string) =>
        failWith(args, HttpClientRequest.post(url), {}, 4, "Deadline Exceeded");

      return API.Protocol.of({
        encode,
        decode,
        call: (operation, input) =>
          Effect.withFiber((fiber) => {
            const context = fiber.context as Context.Context<any>;
            const args: DecodeArgs = {
              outputAst: operation.outputAst,
              errors: operation.errors,
              config: operation.config,
            };
            const ms = deadlineMillis(context);
            const run = Effect.flatMap(
              send(
                context,
                operation,
                input,
                ms,
              ) as Effect.Effect<HttpClientResponse.HttpClientResponse>,
              (response) => decode({ ...args, response }),
            );
            return ms === undefined
              ? run
              : Effect.timeoutOrElse(run, {
                  duration: ms,
                  orElse: () => deadlineExceeded(args, ""),
                });
          }),
        stream: (operation, input) =>
          Stream.unwrap(
            Effect.withFiber((fiber) => {
              const context = fiber.context as Context.Context<any>;
              const args: DecodeArgs = {
                outputAst: operation.outputAst,
                errors: operation.errors,
                config: operation.config,
              };
              const ms = deadlineMillis(context);
              const messages = Effect.map(
                send(
                  context,
                  operation,
                  input,
                  ms,
                ) as Effect.Effect<HttpClientResponse.HttpClientResponse>,
                (response) => streamReply(args, response),
              );
              const stream = Stream.unwrap(messages);
              return Effect.succeed(
                ms === undefined
                  ? stream
                  : Stream.interruptWhen(
                      stream,
                      Effect.flatMap(Effect.sleep(ms), () => deadlineExceeded(args, "")),
                    ),
              );
            }),
          ),
      });

      /** Each message of a server stream, decoded as it arrives. */
      function streamReply(
        args: DecodeArgs,
        response: HttpClientResponse.HttpClientResponse,
      ): Stream.Stream<unknown, unknown> {
        const headers = response.headers as Headers;
        const request = response.request;
        const contentType = headers["content-type"] ?? "";
        if (!contentType.startsWith("application/grpc")) {
          // Not gRPC: the REST decoder fails it by HTTP status.
          return Stream.drain(Stream.fromEffect(rest.decode({ ...args, response })));
        }
        const method = methodOf(request.url);
        if (!method) return Stream.die(new Error(`no gRPC descriptor for ${request.url}`));
        // A trailers-only reply: the call failed before any message.
        const early = statusOf(headers["grpc-status"]);
        if (early !== undefined && early !== 0) {
          return Stream.fromEffect(
            failWith(args, request, headers, early, headers["grpc-message"]),
          );
        }
        const [, responseType] = method;
        const reader = new FrameReader();
        const item = (payload: Uint8Array) => {
          let value: unknown;
          try {
            value = decodeMessage(d, responseType, payload);
          } catch (cause) {
            return parseFailure(payload, cause);
          }
          return Effect.map(
            succeedWith(args, request, headers, { items: [value] }),
            (decoded) => (decoded as { readonly items: ReadonlyArray<unknown> }).items[0],
          );
        };
        const messages = Stream.flatMap(response.stream, (chunk) =>
          Stream.fromIterableEffect(
            Effect.suspend(() => {
              let frames: Uint8Array[];
              try {
                frames = reader.push(chunk);
              } catch (cause) {
                return parseFailure(chunk, cause);
              }
              return Effect.forEach(frames, item);
            }),
          ),
        );
        const end = Effect.flatMap(trailersOf(response), (trailers) => {
          if (reader.rest !== 0) return parseFailure(undefined, "truncated gRPC frame");
          const status = statusOf(trailers["grpc-status"] ?? headers["grpc-status"]);
          return status !== undefined && status !== 0
            ? failWith(
                args,
                request,
                headers,
                status,
                trailers["grpc-message"] ?? headers["grpc-message"],
              )
            : Effect.void;
        });
        return Stream.concat(messages, Stream.drain(Stream.fromEffect(end)));
      }
    }),
  ).pipe(Layer.provide(makeRestProtocol(options)));
