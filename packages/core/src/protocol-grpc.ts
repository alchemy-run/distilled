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
 * - **gRPC-Web**: with `web: true` the request is sent as
 *   `application/grpc-web+proto`, which servers such as `tonic-web` answer
 *   over HTTP/1.1. The reply's trailers arrive as the last frame of its body,
 *   so plain `fetch` sees every status.
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
import * as Stream from "effect/Stream";
import * as API from "./api.ts";
import type { HTTP_STATUS_MAP } from "./errors.ts";
import { GrpcTransport, hasTrailers, trailersOf } from "./grpc-transport.ts";
import {
  decodeMessage,
  encodeMessage,
  frame,
  FrameReader,
  type ProtoDescriptors,
} from "./protobuf.ts";
import { InvalidInput, matchTypedError } from "./protocol-http.ts";
import {
  makeRestProtocolImpl,
  type RestCoreError,
  type RestProtocolOptions,
  type StatusMap,
  type StatusMapError,
} from "./protocol-rest.ts";
import { SdkError } from "./sdk-error.ts";
import * as Send from "./send.ts";

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

export interface GrpcProtocolOptions<
  C,
  CE = never,
  CR = never,
  EB = never,
  EC = never,
  EU = never,
  EP = never,
  SM extends StatusMap = typeof HTTP_STATUS_MAP,
  EG = never,
> extends RestProtocolOptions<C, CE, CR, EB, EC, EU, EP, SM> {
  /** The SDK's generated descriptors (`src/descriptors.ts`). */
  readonly descriptors: ProtoDescriptors;
  /**
   * The error for a non-zero status no typed error matched, from its gRPC
   * code. By default the REST decoder classifies it by the HTTP status the
   * code maps to (`UNAVAILABLE` -> `ServiceUnavailable`, which retries), which
   * keeps retries working but merges codes that share a status
   * (`INVALID_ARGUMENT`, `FAILED_PRECONDITION` and `OUT_OF_RANGE` are all
   * `BadRequest`).
   */
  readonly statusError?: (info: StatusInfo) => EG;
  /**
   * Send gRPC-Web (`application/grpc-web+proto`) instead of gRPC, for a
   * server that answers HTTP/1.1 only that way (`tonic-web`). The reply
   * carries its trailers in its body, so `fetch` sees every status.
   */
  readonly web?: boolean;
}

/** A non-OK gRPC status, as `statusError` receives it. */
export interface StatusInfo {
  readonly code: number;
  readonly message: string;
  /** `google.rpc.Status.details` from `grpc-status-details-bin`, as proto3 JSON `Any`s. */
  readonly details: ReadonlyArray<unknown>;
  readonly headers: Readonly<Record<string, string>>;
}

/** gRPC's mapping of an HTTP status, for a reply that carries no gRPC status. */
export const HTTP_GRPC_STATUS: Readonly<Record<number, number>> = {
  400: 13,
  401: 16,
  403: 7,
  404: 12,
  429: 14,
  502: 14,
  503: 14,
  504: 14,
};

const STATUS_DESCRIPTORS: ProtoDescriptors = {
  messages: {
    "google.rpc.Status": [
      [1, "code", "int32"],
      [2, "message", "string"],
      [3, "details", "message", "google.protobuf.Any", 1],
    ],
  },
  enums: {},
  methods: {},
};

/** The details of `grpc-status-details-bin` (base64, padding optional). */
const detailsOf = (raw: string | undefined): ReadonlyArray<unknown> => {
  if (!raw) return [];
  try {
    const padded = raw.padEnd(raw.length + ((4 - (raw.length % 4)) % 4), "=");
    const bin = atob(padded.replace(/-/g, "+").replace(/_/g, "/"));
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    const status = decodeMessage(STATUS_DESCRIPTORS, "google.rpc.Status", bytes) as {
      readonly details: ReadonlyArray<unknown>;
    };
    return status.details;
  } catch {
    // Malformed details don't hide the status itself.
    return [];
  }
};

type Headers = Readonly<Record<string, string | undefined>>;

const textDecoder = /*@__PURE__*/ new TextDecoder();

/**
 * The SDK can't make the call (a broken descriptor table, or a REST
 * encode/decode result gRPC can't use).
 */
const sdkFailure = (message: string): Effect.Effect<never, SdkError> =>
  Effect.fail(new SdkError({ message }));

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

/** A gRPC-Web reply, whose trailers are the last frame of its body. */
const isWeb = (headers: Headers): boolean =>
  (headers["content-type"] ?? "").startsWith("application/grpc-web");

const statusOf = (value: string | undefined): number | undefined =>
  value === undefined || value === "" ? undefined : Number(value);

/** `text` percent-decoded, or as sent when it is not percent-encoded. */
const percentDecoded = (text: string): string => {
  try {
    return decodeURIComponent(text);
  } catch {
    return text;
  }
};

const messageOf = (raw: string | undefined, status: number): string =>
  percentDecoded(raw ?? "") || GRPC_STATUS_NAMES[status] || `gRPC status ${status}`;

/** A `grpc-timeout` value for `ms` (at most 8 digits per the spec). */
const grpcTimeout = (ms: number): string => {
  const rounded = Math.max(1, Math.ceil(ms));
  if (rounded < 1e8) return `${rounded}m`;
  const seconds = Math.ceil(rounded / 1000);
  return seconds < 1e8 ? `${seconds}S` : `${Math.min(99_999_999, Math.ceil(seconds / 3600))}H`;
};

type DecodeArgs = Omit<API.ProtocolDecodeArgs, "response">;

/**
 * A gRPC protocol over the given REST protocol options. See the module
 * documentation for the wire behavior.
 */
export const makeGrpcProtocol = <
  C,
  CE = never,
  CR = never,
  EB = never,
  EC = never,
  EU = never,
  EP = never,
  SM extends StatusMap = typeof HTTP_STATUS_MAP,
  EG = never,
>(
  options: GrpcProtocolOptions<C, CE, CR, EB, EC, EU, EP, SM, EG>,
): API.ProtocolLayer<CE | EB | EC | EU | EP | StatusMapError<SM> | RestCoreError | EG, CR> => {
  /** What the REST protocol fails with, and gRPC's own failures. */
  type Failure = CE | EB | EC | EU | EP | StatusMapError<SM> | RestCoreError | EG;
  const rest = makeRestProtocolImpl(options);
  const d = options.descriptors;
  const methodOf = (url: string) => d.methods[methodPath(url)];

  /** The REST request as one gRPC frame of protobuf. */
  const encode = (
    args: API.ProtocolEncodeArgs,
  ): Effect.Effect<HttpClientRequest.HttpClientRequest, Failure, CR> =>
    Effect.flatMap(
      rest.encode(args),
      (request): Effect.Effect<HttpClientRequest.HttpClientRequest, Failure> => {
        const method = methodOf(request.url);
        if (!method) return sdkFailure(`no gRPC descriptor for ${request.url}`);
        const body = request.body;
        if (body._tag !== "Empty" && body._tag !== "Uint8Array" && body._tag !== "Raw") {
          return sdkFailure(`gRPC requests need a JSON body, got ${body._tag}`);
        }
        let payload: Uint8Array;
        try {
          payload = encodeMessage(d, method[0], jsonBody(body) ?? {});
        } catch (cause) {
          return Effect.fail(
            new InvalidInput({
              member: method[0],
              message: cause instanceof Error ? cause.message : String(cause),
            }),
          );
        }
        return Effect.succeed(
          options.web
            ? request.pipe(
                HttpClientRequest.bodyUint8Array(frame(payload), "application/grpc-web+proto"),
                HttpClientRequest.setHeader("x-grpc-web", "1"),
              )
            : request.pipe(
                HttpClientRequest.bodyUint8Array(frame(payload), "application/grpc"),
                HttpClientRequest.setHeader("te", "trailers"),
              ),
        );
      },
    );

  /** A gRPC status as the operation's typed error. */
  const failWith = (
    args: DecodeArgs,
    request: HttpClientRequest.HttpClientRequest,
    headers: Headers,
    status: number,
    message: string | undefined,
    details: ReadonlyArray<unknown> = [],
  ): Effect.Effect<never, Failure, CR> => {
    const httpStatus = GRPC_HTTP_STATUS[status] ?? 500;
    const body = {
      code: status,
      status: GRPC_STATUS_NAMES[status] ?? String(status),
      message: messageOf(message, status),
      details,
    };
    if (options.statusError !== undefined) {
      const plain = plainHeaders(headers);
      const typed = matchTypedError(
        args.errors,
        httpStatus,
        [{ code: status, message: body.message }],
        { body, headers: plain },
      );
      return Effect.fail(
        typed ??
          options.statusError({ code: status, message: body.message, details, headers: plain }),
      );
    }
    return Effect.flatMap(
      rest.decode({
        ...args,
        response: jsonResponse(request, httpStatus, plainHeaders(headers), body),
      }),
      () => sdkFailure(`gRPC status ${status} decoded as a success`),
    );
  };

  /**
   * The call's failure, if any, once its body has ended. The status is in
   * the trailers, or in the headers of a trailers-only reply (one with no
   * body); a status in the headers of a reply with a body is ignored. A
   * transport that reads trailers must deliver one, and so must a
   * gRPC-Web reply, in its trailer frame; over `fetch`, which can't read
   * trailers, a gRPC reply with messages and no status is OK.
   */
  const endOf = (
    args: DecodeArgs,
    response: HttpClientResponse.HttpClientResponse,
    trailers: Readonly<Record<string, string>>,
    sawBody: boolean,
  ): Effect.Effect<void, Failure, CR> => {
    const headers = response.headers as Headers;
    const readsTrailers = hasTrailers(response) || isWeb(headers);
    const source =
      trailers["grpc-status"] !== undefined
        ? trailers
        : !sawBody || !readsTrailers
          ? headers
          : undefined;
    const status = statusOf(source?.["grpc-status"]);
    if (source === undefined || status === undefined) {
      if (readsTrailers) {
        return failWith(
          args,
          response.request,
          headers,
          13,
          "server ended the call without a grpc-status",
        );
      }
      return sawBody
        ? Effect.void
        : failWith(
            args,
            response.request,
            headers,
            2,
            "gRPC response carried no message and no grpc-status",
          );
    }
    return status === 0
      ? Effect.void
      : failWith(
          args,
          response.request,
          headers,
          status,
          source["grpc-message"],
          detailsOf(source["grpc-status-details-bin"]),
        );
  };

  /** A malformed frame (compressed, truncated): gRPC's INTERNAL. */
  const badFrame = (
    args: DecodeArgs,
    response: HttpClientResponse.HttpClientResponse,
    cause: unknown,
  ) =>
    failWith(
      args,
      response.request,
      response.headers as Headers,
      13,
      cause instanceof Error ? cause.message : String(cause),
    );

  /**
   * A reply that isn't gRPC: a status other than 200, or another content
   * type. The REST decoder classifies a non-200 by its HTTP status; with
   * `statusError`, it maps as gRPC specifies (503 -> UNAVAILABLE, ...).
   */
  const notGrpc = (
    args: DecodeArgs,
    response: HttpClientResponse.HttpClientResponse,
  ): Effect.Effect<never, Failure, CR> | undefined => {
    const headers = response.headers as Headers;
    const isGrpc = (headers["content-type"] ?? "").startsWith("application/grpc");
    if (response.status === 200 && isGrpc) return undefined;
    if (response.status !== 200 && options.statusError === undefined) {
      return Effect.flatMap(rest.decode({ ...args, response }), () =>
        sdkFailure(`HTTP ${response.status} decoded as a success`),
      );
    }
    if (response.status !== 200) {
      return failWith(
        args,
        response.request,
        headers,
        HTTP_GRPC_STATUS[response.status] ?? 2,
        `HTTP ${response.status}`,
      );
    }
    return failWith(
      args,
      response.request,
      headers,
      2,
      `unexpected content-type ${JSON.stringify(headers["content-type"] ?? "")}`,
    );
  };

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

  const parseFailure = (body: unknown, cause: unknown): Effect.Effect<never, EP> =>
    Effect.fail(options.parseError({ body, cause }));

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
        return Send.send(context, client, request);
      },
    );

  /** Decode a whole reply (its body read to the end). */
  const decode = (args: API.ProtocolDecodeArgs): Effect.Effect<unknown, Failure, CR> => {
    const { response } = args;
    const failed = notGrpc(args, response);
    if (failed) return failed;
    const headers = response.headers as Headers;
    const request = response.request;
    const method = methodOf(request.url);
    if (!method) return sdkFailure(`no gRPC descriptor for ${request.url}`);
    return Effect.flatMap(response.arrayBuffer, (buffer) =>
      Effect.flatMap(trailersOf(response), (trailers) => {
        const reader = new FrameReader();
        let frames: Uint8Array[];
        try {
          frames = reader.push(new Uint8Array(buffer));
        } catch (cause) {
          return Effect.flatMap(endOf(args, response, trailers, true), () =>
            badFrame(args, response, cause),
          );
        }
        const all = { ...trailers, ...reader.trailers };
        return Effect.flatMap(endOf(args, response, all, buffer.byteLength > 0), () => {
          if (reader.rest !== 0) return badFrame(args, response, "truncated gRPC frame");
          const [, responseType, stream] = method;
          if (!stream && frames.length !== 1) {
            return failWith(
              args,
              request,
              headers,
              12,
              `expected one response message, got ${frames.length}`,
            );
          }
          let value: unknown;
          try {
            value = stream
              ? { items: frames.map((f) => decodeMessage(d, responseType, f)) }
              : decodeMessage(d, responseType, frames[0]!);
          } catch (cause) {
            return parseFailure(buffer, cause);
          }
          return succeedWith(args, request, headers, value);
        });
      }),
    );
  };

  const deadlineExceeded = (args: DecodeArgs, url: string) =>
    failWith(args, HttpClientRequest.post(url), {}, 4, "Deadline Exceeded");

  return API.makeProtocol<Failure, CR>({
    encode,
    decode,
    call: (operation: API.PreparedOperation, input: unknown) =>
      Effect.withFiber((fiber) => {
        const context = fiber.context as Context.Context<any>;
        const args: DecodeArgs = {
          outputAst: operation.outputAst,
          errors: operation.errors,
          config: operation.config,
        };
        const ms = deadlineMillis(context);
        const run = Effect.flatMap(send(context, operation, input, ms), (response) =>
          decode({ ...args, response }),
        );
        return ms === undefined
          ? run
          : Effect.timeoutOrElse(run, {
              duration: ms,
              orElse: () => deadlineExceeded(args, ""),
            });
      }),
    stream: (operation: API.PreparedOperation, input: unknown) =>
      Stream.unwrap(
        Effect.withFiber((fiber) => {
          const context = fiber.context as Context.Context<any>;
          const args: DecodeArgs = {
            outputAst: operation.outputAst,
            errors: operation.errors,
            config: operation.config,
          };
          const ms = deadlineMillis(context);
          const messages = Effect.map(send(context, operation, input, ms), (response) =>
            streamReply(args, response),
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
  ): Stream.Stream<unknown, Failure, CR> {
    const headers = response.headers as Headers;
    const request = response.request;
    const failed = notGrpc(args, response);
    if (failed) return Stream.fromEffect(failed);
    const method = methodOf(request.url);
    if (!method) return Stream.fromEffect(sdkFailure(`no gRPC descriptor for ${request.url}`));
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
          if (chunk.length > 0) sawBody = true;
          let frames: Uint8Array[];
          try {
            frames = reader.push(chunk);
          } catch (cause) {
            return badFrame(args, response, cause);
          }
          return Effect.forEach(frames, item);
        }),
      ),
    );
    let sawBody = false;
    const end = Effect.flatMap(trailersOf(response), (trailers) =>
      Effect.flatMap(endOf(args, response, { ...trailers, ...reader.trailers }, sawBody), () =>
        reader.rest !== 0 ? badFrame(args, response, "truncated gRPC frame") : Effect.void,
      ),
    );
    return Stream.concat(messages, Stream.drain(Stream.fromEffect(end)));
  }
};
