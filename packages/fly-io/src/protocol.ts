import { InternalServerError } from "@distilled.cloud/core/errors";
import type {
  DecodeArgs,
  EncodeArgs,
  ErrorOf,
  Protocol,
  ProtocolOf,
} from "@distilled.cloud/core/protocol";
import { buildRequest, mapKeys, matchTypedError } from "@distilled.cloud/core/protocol-http";
import {
  declaredStatusClass,
  restProtocol,
  unwrapRedactedDeep,
  validateSuccess,
  unknownErrorProps,
} from "@distilled.cloud/core/protocol-rest";
import { parseRetryAfterForStatus } from "@distilled.cloud/core/retry-after";
/**
 * Fly.io protocols -- Machines REST, UI-EX REST (MPG), and Sprites REST. The
 * GraphQL API is a Query SDK (`./GraphQL`, src/graphql-transport.ts).
 *
 * Machines (`FlyIoProtocol`) is a plain bearer-token JSON API at
 * `api.machines.dev` (routes carry the `/v1` prefix). MPG (`FlyApiProtocol`) is the same token against
 * `https://api.fly.io`.
 *
 * Sprites (`SpritesProtocol`) sends the {@link SpritesCredentials} token as
 * `Authorization: Bearer` at `https://api.sprites.dev/v1`. The Sprites API
 * rejects a Fly token, and the protocol never mints a Sprites token.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";
import {
  Credentials,
  DEFAULT_FLY_API_BASE_URL,
  DEFAULT_SPRITES_API_BASE_URL,
  SpritesCredentials,
} from "./credentials.ts";
import {
  FlyIoParseError,
  SpritesNotEnabled,
  UnknownFlyIoError,
  type FlyIoServiceError,
} from "./errors.ts";

/**
 * What every generated Machines and MPG operation fails with besides its
 * own errors: the service's errors, the protocol's, and what resolving the
 * credentials fails with. Generated service files annotate operations with
 * `API.OperationMethod<I, O, FlyIoOpError, FlyIoOpContext>` explicitly so
 * the compiler never infers these back out of the schema generics.
 */
export type FlyIoOpError =
  | FlyIoServiceError
  | ErrorOf<typeof FlyIoProtocol | typeof FlyApiProtocol>;

/** Context (requirements) shared by Machines / MPG operations. */
export type FlyIoOpContext = Credentials | HttpClient.HttpClient;

/**
 * What every generated Sprites operation fails with besides its own errors:
 * the service's errors, the protocol's, and what resolving the credentials
 * fails with.
 */
export type SpritesOpError = FlyIoServiceError | ErrorOf<typeof SpritesProtocol>;
export type SpritesOpContext = SpritesCredentials | HttpClient.HttpClient;

const flyErrorEnvelope = (body: unknown) => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const errors = b.errors as Record<string, unknown> | undefined;
  const detail = errors && typeof errors.detail === "string" ? errors.detail : undefined;
  return {
    message:
      typeof b.error === "string" ? b.error : typeof b.message === "string" ? b.message : detail,
  };
};

/** Sprites prefers `message` when the body carries both `error` (code) and `message`. */
const spritesErrorEnvelope = (body: unknown) => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const message =
    typeof b.message === "string" ? b.message : typeof b.error === "string" ? b.error : undefined;
  const code = typeof b.error === "string" && typeof b.message === "string" ? b.error : undefined;
  return { message, code };
};

const resolveFlyCreds = /*@__PURE__*/ Effect.gen(function* () {
  const resolve = yield* Credentials;
  return yield* resolve;
});

/**
 * Per-call signal that this Machines request is the Fly Machine itself
 * (unix socket `/.fly/api`). Org tokens stay on {@link Credentials} for
 * GetSecret in the same process; this service only changes headers:
 * omit `Authorization`, send `Connection: close`.
 */
export class MachineIdentity
  extends /*@__PURE__*/ Context.Service<MachineIdentity, true>()("FlyIoMachineIdentity") {}

const FlyIoProtocolRest = /*@__PURE__*/ restProtocol({
  credentials: resolveFlyCreds,
  baseUrl: (creds) => creds.apiBaseUrl,
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
  }),
  errorEnvelope: flyErrorEnvelope,
  unknownError: (info) => new UnknownFlyIoError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new FlyIoParseError({ body, cause }),
});

const flyIoProtocolMethods = {
  encode: (args) =>
    Effect.gen(function* () {
      const request = yield* FlyIoProtocolRest.encode(args);
      const machine = yield* Effect.serviceOption(MachineIdentity);
      if (Option.isNone(machine)) return request;
      return request.pipe(
        HttpClientRequest.removeHeader("authorization"),
        HttpClientRequest.setHeader("connection", "close"),
      );
    }),
  // Read on each call, so a bundle without Machines operations drops both.
  decode: (args) => FlyIoProtocolRest.decode(args),
} satisfies Protocol<unknown, unknown>;

export const FlyIoProtocol: ProtocolOf<typeof flyIoProtocolMethods> = flyIoProtocolMethods;

/** MPG UI-EX REST at `https://api.fly.io` with the Machines bearer token. */
export const FlyApiProtocol = /*@__PURE__*/ restProtocol({
  credentials: resolveFlyCreds,
  baseUrl: () => DEFAULT_FLY_API_BASE_URL,
  headers: (creds) => ({
    Authorization: `Bearer ${Redacted.value(creds.apiKey)}`,
  }),
  errorEnvelope: flyErrorEnvelope,
  unknownError: (info) => new UnknownFlyIoError(unknownErrorProps(info)),
  parseError: ({ body, cause }) => new FlyIoParseError({ body, cause }),
});

const parseMaybeNdjson = (body: unknown): unknown => {
  if (typeof body !== "string") return body;
  const lines = body
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  if (lines.length === 0) return body;
  try {
    return lines.map((l) => JSON.parse(l) as unknown);
  } catch {
    return body;
  }
};

/**
 * HTTP exec (`POST /sprites/{name}/exec`) returns `application/octet-stream`
 * frames: 1-byte stream id + payload. Ids: 1 stdout, 2 stderr, 3 exit
 * (payload is a single exit-code byte). HTTP may coalesce chunks; for a
 * complete body the exit frame is the last two bytes when present.
 */
const parseSpritesExecFrames = (
  bytes: Uint8Array,
): { stdout: string; stderr: string; exit_code: number } | undefined => {
  if (bytes.length === 0) return undefined;
  const first = bytes[0]!;
  if (first > 3) return undefined;
  let end = bytes.length;
  let exit_code = 0;
  if (end >= 2 && bytes[end - 2] === 3) {
    exit_code = bytes[end - 1]!;
    end -= 2;
  }
  let stdout = "";
  let stderr = "";
  if (end > 0) {
    const decoder = new TextDecoder();
    const id = bytes[0]!;
    const payload = decoder.decode(bytes.subarray(1, end));
    if (id === 2) stderr = payload;
    else stdout = payload;
  }
  return { stdout, stderr, exit_code };
};

const SPRITES_NOT_ENABLED = /sprites not enabled/i;

const haystackOf = (body: unknown, text: string): string => {
  const parts: string[] = [text];
  if (body !== null && typeof body === "object") {
    const b = body as Record<string, unknown>;
    if (typeof b.message === "string") parts.push(b.message);
    if (typeof b.error === "string") parts.push(b.error);
  }
  return parts.join(" ");
};

const errorEnv = (body: unknown): { message?: string; code?: string } =>
  spritesErrorEnvelope(body) ?? flyErrorEnvelope(body) ?? {};

const encodeSpritesRequest = ({ input, inputAst }: EncodeArgs) =>
  Effect.gen(function* () {
    const resolve = yield* SpritesCredentials;
    const { token } = yield* resolve;
    return yield* buildRequest({
      input: unwrapRedactedDeep(input),
      inputAst,
      baseUrl: DEFAULT_SPRITES_API_BASE_URL,
      headers: {
        Authorization: `Bearer ${Redacted.value(token)}`,
        Accept: "application/json",
      },
    });
  });

const decodeSpritesResponse = ({ response, outputAst, errors: errorClasses }: DecodeArgs) =>
  Effect.gen(function* () {
    const buffer = yield* response.arrayBuffer.pipe(Effect.map((bytes) => new Uint8Array(bytes)));
    const text = new TextDecoder().decode(buffer);
    const execFrames = parseSpritesExecFrames(buffer);
    let json: unknown;
    let nonJson = false;
    if (execFrames === undefined && text.trim().length > 0) {
      try {
        json = JSON.parse(text);
      } catch {
        nonJson = true;
      }
    }
    const status = response.status;
    const headers = response.headers as Record<string, string | undefined>;

    if (status >= 400) {
      const env = nonJson ? {} : errorEnv(json);
      const message = env.message ?? (nonJson && text.trim() ? text.trim() : `HTTP ${status}`);
      if (SPRITES_NOT_ENABLED.test(haystackOf(nonJson ? text : json, message))) {
        return yield* Effect.fail(new SpritesNotEnabled({ message }));
      }
      const typed = matchTypedError(
        errorClasses,
        status,
        [
          {
            code: typeof env.code === "number" ? env.code : undefined,
            message,
          },
        ],
        { body: nonJson ? text : json, headers },
      );
      if (typed !== undefined) return yield* Effect.fail(typed);

      // Core's class for the status, which the service declares
      // (`FlyIoServiceErrors`).
      const StatusErrorClass = declaredStatusClass(status, errorClasses);
      if (StatusErrorClass) {
        return yield* Effect.fail(
          new StatusErrorClass({
            message,
            retryAfter: parseRetryAfterForStatus(status, headers),
          }),
        );
      }
      if (status >= 500) {
        return yield* Effect.fail(
          new InternalServerError({
            message,
            retryAfter: parseRetryAfterForStatus(status, headers),
          }),
        );
      }
      return yield* Effect.fail(
        new UnknownFlyIoError({ status, message, body: nonJson ? text : json }),
      );
    }

    // Strict mode checks the mapped body (or parsed exec frames) against the
    // output schema, and parse errors withhold a body that can hold a secret
    // (core `validateSuccess`).
    const body: unknown =
      execFrames ?? parseMaybeNdjson(nonJson ? text : json === undefined ? {} : json);
    return yield* validateSuccess(
      outputAst,
      {
        value: mapKeys(outputAst, body, "decode"),
        body: execFrames ?? (nonJson ? text : json),
        nonJson,
      },
      (info) => new FlyIoParseError(info),
    );
  });

const spritesProtocolMethods = {
  encode: encodeSpritesRequest,
  decode: decodeSpritesResponse,
} satisfies Protocol<unknown, unknown>;

/** Sprites REST at `https://api.sprites.dev/v1`, with the {@link SpritesCredentials} token. */
export const SpritesProtocol: ProtocolOf<typeof spritesProtocolMethods> = spritesProtocolMethods;
