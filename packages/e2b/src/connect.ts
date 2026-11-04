/**
 * envd's server-streaming Connect RPCs -- hand-written.
 *
 * The generated `process` and `filesystem` modules cover envd's unary RPCs.
 * Three RPCs stream their responses and cannot be a request/response
 * operation: `Process.Start` (run a command and stream its output),
 * `Process.Connect` (re-attach to a running process) and
 * `Filesystem.WatchDir` (stream changes under a directory). They are
 * implemented here over the Connect protocol's streaming wire format:
 *
 *   POST /<package>.<Service>/<Method>
 *   Content-Type: application/connect+json
 *   body:     one envelope
 *   response: a sequence of envelopes, the last flagged end-of-stream
 *
 * An envelope is one flags byte, a 4-byte big-endian length, then that many
 * bytes of JSON. Flag `0x02` marks the end-of-stream envelope, whose JSON is
 * `{ error?: { code, message } }`. `Process.StreamInput` (client streaming)
 * is not implemented: `process.sendInput` sends input unary.
 *
 * Every call addresses the {@link SandboxConnection} on the calling fiber,
 * like the generated envd operations. The generator re-exports the calls
 * from the services they belong to: `process.startProcess`,
 * `process.connectProcess` and `filesystem.watchDir`.
 */
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as Redacted from "effect/Redacted";
import * as Stream from "effect/Stream";
import { ENVD_PORT, envdBaseUrlFor, SandboxConnection } from "./credentials.ts";
import {
  BadRequest,
  Conflict,
  E2BParseError,
  Forbidden,
  NotFound,
  SandboxNotRunning,
  Unauthorized,
  UnknownE2BError,
} from "./errors.ts";

// =============================================================================
// Messages
// =============================================================================

/** A command to run. `cmd` is executed directly, with `args` as its argument vector. */
export interface ProcessConfig {
  readonly cmd: string;
  readonly args?: ReadonlyArray<string>;
  readonly envs?: Readonly<Record<string, string>>;
  readonly cwd?: string;
}

/** A pseudo-terminal of the given size. */
export interface Pty {
  readonly size: { readonly cols: number; readonly rows: number };
}

export interface StartProcessRequest {
  readonly process: ProcessConfig;
  /** Run the command in a pseudo-terminal; its output arrives as `Pty` events. */
  readonly pty?: Pty;
  /** A tag the process can later be selected by. */
  readonly tag?: string;
  /** Keep stdin open for `process.sendInput`. */
  readonly stdin?: boolean;
}

/** Selects a running process by pid or by the tag it was started with. */
export type ProcessSelector = { readonly pid: number } | { readonly tag: string };

export interface ConnectProcessRequest {
  readonly process: ProcessSelector;
}

/** An event from a running process. Output bytes are decoded from the wire's base64. */
export type ProcessEvent =
  | { readonly _tag: "Start"; readonly pid: number }
  | { readonly _tag: "Stdout"; readonly data: Uint8Array }
  | { readonly _tag: "Stderr"; readonly data: Uint8Array }
  | { readonly _tag: "Pty"; readonly data: Uint8Array }
  | {
      readonly _tag: "End";
      readonly exitCode: number;
      readonly exited: boolean;
      readonly status: string;
      readonly error?: string;
    }
  | { readonly _tag: "KeepAlive" };

export interface WatchDirRequest {
  readonly path: string;
  readonly recursive?: boolean;
  /** Include the changed entry's info on each event, when it can still be stat-ed. */
  readonly includeEntry?: boolean;
  /** Allow watching network mounts (NFS, CIFS, SMB, FUSE); events there may be unreliable. */
  readonly allowNetworkMounts?: boolean;
}

export type FilesystemEventType =
  | "EVENT_TYPE_UNSPECIFIED"
  | "EVENT_TYPE_CREATE"
  | "EVENT_TYPE_WRITE"
  | "EVENT_TYPE_REMOVE"
  | "EVENT_TYPE_RENAME"
  | "EVENT_TYPE_CHMOD";

/** An event from a watched directory. `entry` is envd's `EntryInfo`, as JSON. */
export type WatchDirEvent =
  | { readonly _tag: "Start" }
  | {
      readonly _tag: "Filesystem";
      readonly name: string;
      readonly type: FilesystemEventType;
      readonly entry?: Readonly<Record<string, unknown>>;
    }
  | { readonly _tag: "KeepAlive" };

/** Errors a streaming envd call can fail with. */
export type ConnectStreamError =
  | BadRequest
  | Unauthorized
  | Forbidden
  | NotFound
  | Conflict
  | SandboxNotRunning
  | UnknownE2BError
  | E2BParseError
  | ConfigError
  | HttpClientError.HttpClientError;

// =============================================================================
// Envelopes
// =============================================================================

const END_STREAM_FLAG = 0x02;
const HEADER_BYTES = 5;

/** One decoded envelope: a message, or the end-of-stream trailer. */
export type Envelope =
  | { readonly _tag: "Message"; readonly json: unknown }
  | { readonly _tag: "End"; readonly json: unknown };

const encoder = /*@__PURE__*/ new TextEncoder();
const decoder = /*@__PURE__*/ new TextDecoder();

/** Frames a JSON message as one Connect envelope. */
export const encodeEnvelope = (message: unknown): Uint8Array => {
  const payload = encoder.encode(JSON.stringify(message));
  const frame = new Uint8Array(HEADER_BYTES + payload.length);
  new DataView(frame.buffer).setUint32(1, payload.length, false);
  frame.set(payload, HEADER_BYTES);
  return frame;
};

const concat = (a: Uint8Array, b: Uint8Array): Uint8Array => {
  if (a.length === 0) return b;
  const out = new Uint8Array(a.length + b.length);
  out.set(a, 0);
  out.set(b, a.length);
  return out;
};

const parseJson = (bytes: Uint8Array): unknown => {
  const text = decoder.decode(bytes);
  try {
    return JSON.parse(text);
  } catch {
    return { __invalidJson: text };
  }
};

/**
 * Splits a chunk into the envelopes it completes, keeping the remainder.
 * Pure, so a chunk boundary anywhere (mid-header, mid-payload) is safe.
 */
export const takeEnvelopes = (
  buffer: Uint8Array,
  chunk: Uint8Array,
): readonly [remainder: Uint8Array, envelopes: ReadonlyArray<Envelope>] => {
  let data = concat(buffer, chunk);
  const envelopes: Envelope[] = [];
  while (data.length >= HEADER_BYTES) {
    const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
    const flags = view.getUint8(0);
    const length = view.getUint32(1, false);
    if (data.length < HEADER_BYTES + length) break;
    const json = parseJson(data.subarray(HEADER_BYTES, HEADER_BYTES + length));
    envelopes.push(
      (flags & END_STREAM_FLAG) !== 0 ? { _tag: "End", json } : { _tag: "Message", json },
    );
    data = data.slice(HEADER_BYTES + length);
  }
  return [data, envelopes];
};

/** Maps a Connect error code onto the SDK's error classes. */
export const connectError = (
  error: { readonly code?: string; readonly message?: string },
  body: unknown,
) => {
  const message = error.message ?? error.code ?? "envd call failed";
  switch (error.code) {
    case "invalid_argument":
    case "failed_precondition":
    case "out_of_range":
      return new BadRequest({ message });
    case "unauthenticated":
      return new Unauthorized({ message });
    case "permission_denied":
      return new Forbidden({ message });
    case "not_found":
      return new NotFound({ message });
    case "already_exists":
    case "aborted":
      return new Conflict({ message });
    default:
      return new UnknownE2BError({ code: error.code, message: error.message, body });
  }
};

/** E2B's proxy body for a paused or killed sandbox: `{ sandboxId, message: "The sandbox was not found", code: 502 }`. */
const notRunning = (body: unknown): boolean =>
  body !== null &&
  typeof body === "object" &&
  typeof (body as { message?: unknown }).message === "string" &&
  (body as { message: string }).message.includes("sandbox was not found");

const errorOf = (json: unknown): { code?: string; message?: string } | undefined => {
  if (json === null || typeof json !== "object") return undefined;
  const error = (json as { error?: unknown }).error;
  if (error === null || typeof error !== "object") return undefined;
  const { code, message } = error as { code?: unknown; message?: unknown };
  return {
    code: typeof code === "string" ? code : undefined,
    message: typeof message === "string" ? message : undefined,
  };
};

const missingSandbox = /*@__PURE__*/ Effect.fail(
  new ConfigError({
    message:
      "E2B envd operations address one sandbox -- provide E2B.sandboxConnection({ sandboxId, accessToken })",
  }),
);

/**
 * Calls a server-streaming envd RPC and streams its decoded messages.
 * Exported for RPCs envd adds before this module models them.
 */
export const serverStream = (
  method: string,
  request: unknown,
): Stream.Stream<unknown, ConnectStreamError, SandboxConnection | HttpClient.HttpClient> =>
  Stream.unwrap(
    Effect.gen(function* () {
      const sandbox = yield* Effect.flatMap(Effect.serviceOption(SandboxConnection), (option) =>
        option._tag === "Some" ? Effect.succeed(option.value) : missingSandbox,
      );
      const client = yield* HttpClient.HttpClient;
      const headers: Record<string, string> = {
        "Connect-Protocol-Version": "1",
        "E2b-Sandbox-Id": sandbox.sandboxId,
        "E2b-Sandbox-Port": String(sandbox.port ?? ENVD_PORT),
      };
      if (sandbox.accessToken !== undefined) {
        headers["X-Access-Token"] = Redacted.value(sandbox.accessToken);
      }
      const response = yield* client.execute(
        HttpClientRequest.post(`${envdBaseUrlFor(sandbox)}/${method}`).pipe(
          HttpClientRequest.setHeaders(headers),
          HttpClientRequest.bodyUint8Array(encodeEnvelope(request), "application/connect+json"),
        ),
      );
      if (response.status < 200 || response.status >= 300) {
        // A failure before the stream starts is a unary Connect error body.
        const body = yield* response.json.pipe(Effect.orElseSucceed(() => undefined));
        const error = errorOf({ error: body }) ?? {};
        if (response.status === 502 && notRunning(body)) {
          return yield* Effect.fail(
            new SandboxNotRunning({
              sandboxId: sandbox.sandboxId,
              message: (body as { message: string }).message,
              code: 502,
            }),
          );
        }
        return yield* Effect.fail(
          error.code === undefined && response.status === 404
            ? new NotFound({ message: `envd ${method} not found` })
            : connectError(error, body),
        );
      }
      return response.stream.pipe(
        Stream.mapAccum(() => new Uint8Array(0), takeEnvelopes),
        Stream.mapEffect((envelope) => {
          if (envelope._tag === "Message") {
            return Effect.succeed([envelope.json] as ReadonlyArray<unknown>);
          }
          const error = errorOf(envelope.json);
          return error === undefined
            ? Effect.succeed([] as ReadonlyArray<unknown>)
            : Effect.fail(connectError(error, envelope.json));
        }),
        Stream.flatMap((messages) => Stream.fromIterable(messages)),
      );
    }),
  );

// =============================================================================
// Process
// =============================================================================

const fromBase64 = (value: unknown): Uint8Array =>
  typeof value === "string"
    ? Uint8Array.from(atob(value), (c) => c.charCodeAt(0))
    : new Uint8Array(0);

const isRecord = (value: unknown): value is Record<string, any> =>
  value !== null && typeof value === "object";

/** Decodes `{ event: ProcessEvent }` (proto3 JSON, oneofs flattened). */
export const decodeProcessEvent = (message: unknown): ProcessEvent | E2BParseError => {
  const event = isRecord(message) ? message.event : undefined;
  if (!isRecord(event)) return new E2BParseError({ body: message, cause: "missing event" });
  if (isRecord(event.start)) return { _tag: "Start", pid: Number(event.start.pid ?? 0) };
  if (isRecord(event.data)) {
    const data = event.data;
    if (data.stdout !== undefined) return { _tag: "Stdout", data: fromBase64(data.stdout) };
    if (data.stderr !== undefined) return { _tag: "Stderr", data: fromBase64(data.stderr) };
    if (data.pty !== undefined) return { _tag: "Pty", data: fromBase64(data.pty) };
    return { _tag: "Stdout", data: new Uint8Array(0) };
  }
  if (isRecord(event.end)) {
    const end = event.end;
    return {
      _tag: "End",
      exitCode: Number(end.exitCode ?? 0),
      exited: Boolean(end.exited),
      status: typeof end.status === "string" ? end.status : "",
      ...(typeof end.error === "string" ? { error: end.error } : {}),
    };
  }
  if (isRecord(event.keepalive)) return { _tag: "KeepAlive" };
  return new E2BParseError({ body: message, cause: "unknown process event" });
};

const decodeWith =
  <A extends { readonly _tag: string }>(decode: (message: unknown) => A | E2BParseError) =>
  (message: unknown): Effect.Effect<A, E2BParseError> => {
    const decoded = decode(message);
    return decoded._tag === "E2BParseError"
      ? Effect.fail(decoded as E2BParseError)
      : Effect.succeed(decoded as A);
  };

/**
 * Starts a process in the sandbox and streams its events: `Start` (with the
 * pid), output, then `End` with the exit code. Interrupting the stream closes
 * the connection; the process keeps running and can be re-attached with
 * {@link connectProcess} or stopped with `process.sendSignal`.
 */
export const startProcess = (
  request: StartProcessRequest,
): Stream.Stream<ProcessEvent, ConnectStreamError, SandboxConnection | HttpClient.HttpClient> =>
  serverStream("process.Process/Start", request).pipe(
    Stream.mapEffect(decodeWith(decodeProcessEvent)),
  );

/** Re-attaches to a running process and streams its events from now on. */
export const connectProcess = (
  request: ConnectProcessRequest,
): Stream.Stream<ProcessEvent, ConnectStreamError, SandboxConnection | HttpClient.HttpClient> =>
  serverStream("process.Process/Connect", request).pipe(
    Stream.mapEffect(decodeWith(decodeProcessEvent)),
  );

// =============================================================================
// Filesystem
// =============================================================================

/** Decodes `WatchDirResponse` (proto3 JSON, oneof flattened). */
export const decodeWatchDirEvent = (message: unknown): WatchDirEvent | E2BParseError => {
  if (!isRecord(message)) return new E2BParseError({ body: message, cause: "not an object" });
  if (isRecord(message.start)) return { _tag: "Start" };
  if (isRecord(message.keepalive)) return { _tag: "KeepAlive" };
  if (isRecord(message.filesystem)) {
    const event = message.filesystem;
    return {
      _tag: "Filesystem",
      name: typeof event.name === "string" ? event.name : "",
      type: (typeof event.type === "string"
        ? event.type
        : "EVENT_TYPE_UNSPECIFIED") as FilesystemEventType,
      ...(isRecord(event.entry) ? { entry: event.entry } : {}),
    };
  }
  return new E2BParseError({ body: message, cause: "unknown watch event" });
};

/** Watches a directory and streams its changes until the stream is interrupted. */
export const watchDir = (
  request: WatchDirRequest,
): Stream.Stream<WatchDirEvent, ConnectStreamError, SandboxConnection | HttpClient.HttpClient> =>
  serverStream("filesystem.Filesystem/WatchDir", request).pipe(
    Stream.mapEffect(decodeWith(decodeWatchDirEvent)),
  );
