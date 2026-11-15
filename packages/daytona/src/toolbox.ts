/**
 * Toolbox calls the REST protocol can't make -- hand-written.
 *
 * Daytona's toolbox speaks two things besides JSON over HTTP:
 *
 *   * WebSockets, for anything that streams: a code interpreter run
 *     (`/process/interpreter/execute`), a terminal (`/process/pty/...`),
 *     and followed logs (`.../logs?follow=true`). Sockets authenticate
 *     with a preview token in the `DAYTONA_SANDBOX_AUTH_KEY` query
 *     parameter, not a header, so they work from any runtime -- browsers,
 *     Cloudflare Workers and Lambda included -- with the standard
 *     `WebSocket` constructor.
 *   * multipart/form-data, for bulk file transfer (`/files/bulk-upload`,
 *     `/files/bulk-download`).
 *
 * Every function here is sandbox-scoped like the generated toolbox
 * operations: configure `sandboxId` (or a resolved `toolboxBaseUrl`) on
 * `Credentials`. Socket functions also need a `Socket.WebSocketConstructor`
 * (`Socket.layerWebSocketConstructorGlobal` on any runtime with a global
 * `WebSocket`).
 */
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Schema from "@distilled.cloud/core/schema-lite-typed";
import type * as Cause from "effect/Cause";
import * as Deferred from "effect/Deferred";
import * as Effect from "effect/Effect";
import * as HttpBody from "effect/http/HttpBody";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as Queue from "effect/Queue";
import type * as Scope from "effect/Scope";
import * as Socket from "effect/socket/Socket";
import * as Stream from "effect/Stream";
import { Credentials, type Config } from "./credentials.ts";
import { requestHeaders, SDK_VERSION, toolboxBaseUrl } from "./protocol.ts";
import { deletePtySession, resizePtySession } from "./services/process.ts";
import { getPortPreviewUrl, type GetPortPreviewUrlError } from "./services/sandbox.ts";

// ---------------------------------------------------------------------------
// Errors
// ---------------------------------------------------------------------------

/**
 * A toolbox WebSocket failed: the handshake was refused, the connection
 * dropped, or the daemon closed it with an error code.
 */
export class ToolboxSocketError
  extends /*@__PURE__*/ Schema.TaggedError<ToolboxSocketError>()("ToolboxSocketError", {
    message: Schema.String,
    /** The WebSocket close code, when the daemon closed the socket. */
    closeCode: /*@__PURE__*/ Schema.optional(Schema.Number),
  }) {}

/** A code interpreter run exceeded its `timeout` (close code 4008). */
export class InterpreterTimeout
  extends /*@__PURE__*/ Schema.TaggedError<InterpreterTimeout>()("InterpreterTimeout", {
    message: Schema.String,
  }) {}

/** The daemon refused a terminal connection, e.g. an unknown session. */
export class PtyConnectionRefused
  extends /*@__PURE__*/ Schema.TaggedError<PtyConnectionRefused>()("PtyConnectionRefused", {
    message: Schema.String,
  }) {}

/** A bulk file transfer failed as a whole (non-2xx), with Daytona's message. */
export class BulkTransferFailed
  extends /*@__PURE__*/ Schema.TaggedError<BulkTransferFailed>()("BulkTransferFailed", {
    status: Schema.Number,
    message: Schema.String,
    code: /*@__PURE__*/ Schema.optional(Schema.String),
  }) {}

/** What every socket function needs. */
export type ToolboxSocketContext =
  | Credentials
  | HttpClient.HttpClient
  | Socket.WebSocketConstructor;

/** Errors opening any toolbox socket. */
export type ToolboxSocketOpenError = ToolboxSocketError | ConfigError | GetPortPreviewUrlError;

// ---------------------------------------------------------------------------
// Sockets
// ---------------------------------------------------------------------------

type Frame = Uint8Array | string;

const config = Effect.flatMap(Credentials, (resolve) => resolve);

const toolboxRoot = (creds: Config) => {
  const base = toolboxBaseUrl(creds);
  return typeof base === "string" ? Effect.succeed(base.replace(/\/$/, "")) : Effect.fail(base);
};

/**
 * Socket URL for a toolbox path, authenticated with a preview token.
 * Daytona's own SDKs authenticate the same way on runtimes that can't set
 * handshake headers.
 */
const socketUrl = Effect.fn(function* (path: string, query: Record<string, string | undefined>) {
  const creds = yield* config;
  const root = yield* toolboxRoot(creds);
  const sandboxId = creds.sandboxId;
  if (sandboxId === undefined || sandboxId === "") {
    return yield* new ConfigError({
      message: "Daytona toolbox sockets need a sandbox: configure credentials({ sandboxId })",
    });
  }
  // Any port's preview token authorizes the sandbox's toolbox.
  const { token } = yield* getPortPreviewUrl({ sandboxIdOrName: sandboxId, port: 1 });
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined) params.set(key, value);
  }
  params.set("DAYTONA_SANDBOX_AUTH_KEY", token);
  return `${root.replace(/^http/, "ws")}${path}?${params.toString()}`;
});

const SDK_PROTOCOL = `X-Daytona-SDK-Version~${SDK_VERSION}`;

/** An open toolbox socket: pull frames, write frames. Lives in the ambient scope. */
interface Connection {
  readonly pull: Effect.Effect<readonly Frame[], Socket.SocketError>;
  readonly write: (frame: Frame) => Effect.Effect<void, ToolboxSocketError>;
}

const socketFailure = (error: Socket.SocketError) =>
  new ToolboxSocketError({
    message: error.message,
    closeCode: error.reason._tag === "SocketCloseError" ? error.reason.code : undefined,
  });

const open = Effect.fn(function* (
  path: string,
  options: { query?: Record<string, string | undefined>; protocols?: string[] } = {},
) {
  const url = yield* socketUrl(path, options.query ?? {});
  const socket = yield* Socket.makeWebSocket(url, {
    protocols: [SDK_PROTOCOL, ...(options.protocols ?? [])],
    openTimeout: "15 seconds",
  });
  // The reader dials and waits for the socket to open; write after it.
  const reader = yield* socket.reader.pipe(Effect.mapError(socketFailure));
  const writer = yield* socket.writer;
  return {
    pull: reader.pull,
    write: (frame: Frame) => writer.write(frame).pipe(Effect.mapError(socketFailure)),
  } satisfies Connection;
});

/** The close a pull failed with, if it failed because the socket closed. */
const closeOf = (error: Socket.SocketError) =>
  error.reason._tag === "SocketCloseError" ? error.reason : undefined;

const isNormalClose = (code: number) => code === 1000 || code === 1001;

const decoder = () => new TextDecoder("utf-8");

const textOf = (frame: Frame, decode: TextDecoder) =>
  typeof frame === "string" ? frame : decode.decode(frame);

const bytesOf = (frame: Frame) =>
  typeof frame === "string" ? new TextEncoder().encode(frame) : frame;

// ---------------------------------------------------------------------------
// Code interpreter
// ---------------------------------------------------------------------------

/** Input for a code interpreter run. */
export interface InterpreterCodeRequest {
  /** The code to run (Python). */
  readonly code: string;
  /** Interpreter context to run in; the default context when omitted. */
  readonly contextId?: string;
  /** Extra environment variables for the run. */
  readonly envs?: Record<string, string>;
  /** Seconds before the run is stopped; fails with `InterpreterTimeout`. */
  readonly timeout?: number;
}

/** One chunk of a code interpreter run, in the order the daemon sent it. */
export type InterpreterOutput =
  | { readonly type: "stdout"; readonly text: string }
  | { readonly type: "stderr"; readonly text: string }
  | {
      readonly type: "error";
      readonly name: string;
      readonly value: string;
      readonly traceback: string;
    };

/** A finished code interpreter run. */
export interface InterpreterResult {
  readonly stdout: string;
  readonly stderr: string;
  /** The exception the code raised, if any. */
  readonly error?: { readonly name: string; readonly value: string; readonly traceback: string };
}

export type InterpreterCodeError = ToolboxSocketOpenError | InterpreterTimeout;

interface InterpreterChunk {
  readonly type?: string;
  readonly text?: string;
  readonly name?: string;
  readonly value?: string;
  readonly traceback?: string;
}

const parseChunk = (text: string): InterpreterChunk | undefined => {
  try {
    const value: unknown = JSON.parse(text);
    return typeof value === "object" && value !== null ? (value as InterpreterChunk) : undefined;
  } catch {
    return undefined;
  }
};

/**
 * Run code in an interpreter context and stream its output as it is
 * produced. The stream ends when the run completes or is interrupted; an
 * exception the code raises is an `error` chunk, not a failure.
 */
export const streamInterpreterCode = (
  request: InterpreterCodeRequest,
): Stream.Stream<InterpreterOutput, InterpreterCodeError, ToolboxSocketContext> =>
  Stream.callback<InterpreterOutput, InterpreterCodeError, ToolboxSocketContext>((queue) =>
    Effect.gen(function* () {
      const connection = yield* open("/process/interpreter/execute");
      yield* connection.write(
        JSON.stringify({
          code: request.code,
          contextId: request.contextId,
          envs: request.envs,
          timeout: request.timeout,
        }),
      );
      const decode = decoder();
      // After `interrupted` the daemon closes the socket; the close code
      // says why (4008: the run's timeout).
      let interrupted = false;
      while (true) {
        const pulled = yield* Effect.result(
          interrupted
            ? connection.pull.pipe(
                Effect.timeoutOrElse({
                  duration: "5 seconds",
                  orElse: () => Effect.succeed<readonly Frame[]>([]),
                }),
              )
            : connection.pull,
        );
        if (pulled._tag === "Success" && interrupted && pulled.success.length === 0) {
          return yield* Queue.end(queue);
        }
        if (pulled._tag === "Failure") {
          const close = closeOf(pulled.failure);
          if (close && isNormalClose(close.code)) return yield* Queue.end(queue);
          if (close?.code === 4008) {
            return yield* Queue.fail(
              queue,
              new InterpreterTimeout({ message: close.closeReason || "Execution timed out" }),
            );
          }
          return yield* Queue.fail(queue, socketFailure(pulled.failure));
        }
        for (const frame of pulled.success) {
          const chunk = parseChunk(textOf(frame, decode));
          if (!chunk) continue;
          if (chunk.type === "stdout" || chunk.type === "stderr") {
            yield* Queue.offer(queue, { type: chunk.type, text: chunk.text ?? "" });
          } else if (chunk.type === "error") {
            yield* Queue.offer(queue, {
              type: "error",
              name: chunk.name ?? "",
              value: chunk.value ?? "",
              traceback: chunk.traceback ?? "",
            });
          } else if (chunk.type === "control" && chunk.text === "completed") {
            return yield* Queue.end(queue);
          } else if (chunk.type === "control" && chunk.text === "interrupted") {
            interrupted = true;
          }
        }
      }
    }).pipe(Effect.catch((error) => Queue.fail(queue, error))),
  );

/**
 * Run code in an interpreter context and wait for it: its stdout, stderr
 * and the exception it raised, if any.
 */
export const executeInterpreterCode = (
  request: InterpreterCodeRequest,
): Effect.Effect<InterpreterResult, InterpreterCodeError, ToolboxSocketContext> =>
  streamInterpreterCode(request).pipe(
    Stream.runFold(
      (): InterpreterResult => ({ stdout: "", stderr: "" }),
      (result, chunk): InterpreterResult =>
        chunk.type === "stdout"
          ? { ...result, stdout: result.stdout + chunk.text }
          : chunk.type === "stderr"
            ? { ...result, stderr: result.stderr + chunk.text }
            : {
                ...result,
                error: { name: chunk.name, value: chunk.value, traceback: chunk.traceback },
              },
    ),
  );

// ---------------------------------------------------------------------------
// Followed logs
// ---------------------------------------------------------------------------

/** A piece of a command's output, labelled with the stream it came from. */
export interface LogOutput {
  readonly stream: "stdout" | "stderr";
  readonly text: string;
}

const STDOUT_MARK = 0x01;
const STDERR_MARK = 0x02;
const MARK_LENGTH = 3;

/**
 * Split the daemon's labelled log bytes into stdout and stderr. Each run
 * of output starts with a three-byte marker (`01 01 01` stdout, `02 02 02`
 * stderr); a marker can straddle frames, so up to two trailing marker
 * bytes wait for the next frame.
 */
export const makeLogDemuxer = () => {
  let pending = new Uint8Array(0);
  let current: "stdout" | "stderr" = "stdout";
  const decoders = { stdout: decoder(), stderr: decoder() };
  const isMark = (byte: number | undefined) => byte === STDOUT_MARK || byte === STDERR_MARK;

  return (chunk: Uint8Array, final = false): LogOutput[] => {
    const bytes = new Uint8Array(pending.length + chunk.length);
    bytes.set(pending);
    bytes.set(chunk, pending.length);
    const out: LogOutput[] = [];
    const emit = (from: number, to: number) => {
      if (to <= from) return;
      const text = decoders[current].decode(bytes.subarray(from, to), { stream: true });
      if (text) out.push({ stream: current, text });
    };
    let start = 0;
    let i = 0;
    while (i + MARK_LENGTH <= bytes.length) {
      const byte = bytes[i];
      if (isMark(byte) && bytes[i + 1] === byte && bytes[i + 2] === byte) {
        emit(start, i);
        current = byte === STDOUT_MARK ? "stdout" : "stderr";
        i += MARK_LENGTH;
        start = i;
      } else {
        i++;
      }
    }
    // Hold back a possible partial marker at the end.
    let end = bytes.length;
    if (!final) {
      while (end > start && end > bytes.length - (MARK_LENGTH - 1) && isMark(bytes[end - 1])) {
        end--;
      }
    }
    emit(start, end);
    pending = bytes.slice(end);
    if (final) {
      for (const stream of ["stdout", "stderr"] as const) {
        const rest = decoders[stream].decode();
        if (rest) out.push({ stream, text: rest });
      }
    }
    return out;
  };
};

const followLogs = (path: string) =>
  Stream.callback<LogOutput, ToolboxSocketOpenError, ToolboxSocketContext>((queue) =>
    Effect.gen(function* () {
      const connection = yield* open(path, { query: { follow: "true" } });
      const demux = makeLogDemuxer();
      while (true) {
        const pulled = yield* Effect.result(connection.pull);
        if (pulled._tag === "Failure") {
          const close = closeOf(pulled.failure);
          if (close && isNormalClose(close.code)) {
            yield* Queue.offerAll(queue, demux(new Uint8Array(0), true));
            return yield* Queue.end(queue);
          }
          return yield* Queue.fail(queue, socketFailure(pulled.failure));
        }
        for (const frame of pulled.success) {
          yield* Queue.offerAll(queue, demux(bytesOf(frame)));
        }
      }
    }).pipe(Effect.catch((error) => Queue.fail(queue, error))),
  );

/**
 * Follow a session command's output while it runs, as stdout and stderr
 * pieces. The stream ends when the command exits.
 */
export const followSessionCommandLogs = (request: {
  readonly sessionId: string;
  readonly commandId: string;
}): Stream.Stream<LogOutput, ToolboxSocketOpenError, ToolboxSocketContext> =>
  followLogs(
    `/process/session/${encodeURIComponent(request.sessionId)}/command/${encodeURIComponent(request.commandId)}/logs`,
  );

/**
 * Follow the sandbox entrypoint's output, as stdout and stderr pieces.
 * The stream ends when the entrypoint exits.
 */
export const followEntrypointLogs = (): Stream.Stream<
  LogOutput,
  ToolboxSocketOpenError,
  ToolboxSocketContext
> => followLogs("/process/session/entrypoint/logs");

// ---------------------------------------------------------------------------
// Terminals
// ---------------------------------------------------------------------------

/** How a terminal session ended. */
export interface PtyExit {
  readonly exitCode: number;
  /** Why it exited, when not cleanly (e.g. `non-zero exit`). */
  readonly reason?: string;
}

/**
 * A live connection to a terminal session. It closes with the scope it
 * was opened in; the session itself keeps running until it exits or is
 * killed.
 */
export interface PtyConnection {
  readonly sessionId: string;
  /** Terminal output bytes, until the session exits or the connection closes. */
  readonly output: Stream.Stream<Uint8Array, ToolboxSocketError>;
  /** Type into the terminal (keystrokes, commands with `\n`, control bytes). */
  readonly write: (data: string | Uint8Array) => Effect.Effect<void, ToolboxSocketError>;
  /** Resize the terminal. */
  readonly resize: (
    cols: number,
    rows: number,
  ) => Effect.Effect<void, ToolboxSocketOpenError | HttpClientError.HttpClientError>;
  /** Kill the session. */
  readonly kill: Effect.Effect<void, ToolboxSocketOpenError | HttpClientError.HttpClientError>;
  /** Wait for the session to exit. */
  readonly exit: Effect.Effect<PtyExit, ToolboxSocketError>;
}

/** Input for {@link createPty}. */
export interface CreatePtyRequest {
  /** Session ID. */
  readonly id: string;
  /** Columns. @default 80 */
  readonly cols?: number;
  /** Rows. @default 24 */
  readonly rows?: number;
  /** Working directory. */
  readonly cwd?: string;
  /** Environment variables for the shell. */
  readonly envs?: Record<string, string>;
}

export type PtyError = ToolboxSocketOpenError | PtyConnectionRefused;

const PTY_EXIT_CONTROL = "X-Daytona-Pty-Exit-Control";

interface PtyControl {
  readonly type?: string;
  readonly status?: string;
  readonly exitCode?: number;
  readonly exitReason?: string;
  readonly error?: string;
}

const controlOf = (frame: string): PtyControl | undefined => {
  const value = parseChunk(frame) as PtyControl | undefined;
  return value?.type === "control" ? value : undefined;
};

const base64Url = (text: string) =>
  btoa(String.fromCharCode(...new TextEncoder().encode(text)))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/, "");

const attachPty = Effect.fn(function* (
  sessionId: string,
  path: string,
  options: { query?: Record<string, string | undefined>; protocols?: string[] },
) {
  const services = yield* Effect.context<Credentials | HttpClient.HttpClient>();
  const connection = yield* open(path, {
    query: options.query,
    protocols: [...(options.protocols ?? []), PTY_EXIT_CONTROL],
  });
  const output = yield* Queue.unbounded<Uint8Array, ToolboxSocketError | Cause.Done>();
  const connected = yield* Deferred.make<void, PtyConnectionRefused | ToolboxSocketError>();
  const exited = yield* Deferred.make<PtyExit, ToolboxSocketError>();

  const finish = (exit: PtyExit) =>
    Effect.andThen(Deferred.succeed(exited, exit), Queue.end(output));

  yield* Effect.gen(function* () {
    while (true) {
      const pulled = yield* Effect.result(connection.pull);
      if (pulled._tag === "Failure") {
        const close = closeOf(pulled.failure);
        // The close reason carries the exit when no control frame did.
        const reason = close?.closeReason
          ? (parseChunk(close.closeReason) as PtyControl | undefined)
          : undefined;
        if (reason?.exitCode !== undefined) {
          return yield* finish({ exitCode: reason.exitCode, reason: reason.exitReason });
        }
        if (close && isNormalClose(close.code)) return yield* finish({ exitCode: 0 });
        const failure = socketFailure(pulled.failure);
        yield* Deferred.fail(
          connected,
          reason?.error ? new PtyConnectionRefused({ message: reason.error }) : failure,
        );
        yield* Deferred.fail(exited, failure);
        return yield* Queue.fail(output, failure);
      }
      for (const frame of pulled.success) {
        const control = typeof frame === "string" ? controlOf(frame) : undefined;
        if (control?.status === "connected") {
          yield* Deferred.succeed(connected, undefined);
        } else if (control?.status === "exited") {
          yield* Deferred.succeed(connected, undefined);
          return yield* finish({ exitCode: control.exitCode ?? 0, reason: control.exitReason });
        } else if (control?.status === "error") {
          const message = control.error ?? "PTY connection error";
          yield* Deferred.fail(connected, new PtyConnectionRefused({ message }));
          const failure = new ToolboxSocketError({ message });
          yield* Deferred.fail(exited, failure);
          return yield* Queue.fail(output, failure);
        } else {
          yield* Queue.offer(output, bytesOf(frame));
        }
      }
    }
  }).pipe(Effect.forkScoped);

  yield* Deferred.await(connected).pipe(
    Effect.timeoutOrElse({
      duration: "15 seconds",
      orElse: () =>
        Effect.fail(new ToolboxSocketError({ message: "Timed out waiting for the terminal" })),
    }),
  );

  const http = <A, E>(effect: Effect.Effect<A, E, Credentials | HttpClient.HttpClient>) =>
    Effect.provideContext(effect, services);

  return {
    sessionId,
    output: Stream.fromQueue(output),
    write: (data: string | Uint8Array) =>
      connection.write(typeof data === "string" ? new TextEncoder().encode(data) : data),
    resize: (cols: number, rows: number) =>
      http(resizePtySession({ sessionId, cols, rows })).pipe(Effect.asVoid),
    kill: http(deletePtySession({ sessionId })).pipe(Effect.asVoid),
    exit: Deferred.await(exited),
  } satisfies PtyConnection;
});

/**
 * Create a terminal session and connect to it in one round trip. The
 * connection closes with the scope; the session keeps running until it
 * exits or is killed.
 */
export const createPty = (
  request: CreatePtyRequest,
): Effect.Effect<PtyConnection, PtyError, ToolboxSocketContext | Scope.Scope> =>
  attachPty(request.id, "/process/pty/create-connect", {
    query: {
      id: request.id,
      cols: String(request.cols ?? 80),
      rows: String(request.rows ?? 24),
      cwd: request.cwd,
    },
    // Environment variables travel as a subprotocol token, as Daytona's SDKs send them.
    protocols:
      request.envs && Object.keys(request.envs).length > 0
        ? [`X-Daytona-Pty-Envs~${base64Url(JSON.stringify(request.envs))}`]
        : [],
  });

/**
 * Connect to an existing terminal session. The connection closes with the
 * scope; the session keeps running.
 */
export const connectPty = (request: {
  readonly sessionId: string;
}): Effect.Effect<PtyConnection, PtyError, ToolboxSocketContext | Scope.Scope> =>
  attachPty(request.sessionId, `/process/pty/${encodeURIComponent(request.sessionId)}/connect`, {});

// ---------------------------------------------------------------------------
// Bulk file transfer
// ---------------------------------------------------------------------------

/** One file to upload. */
export interface UploadFileEntry {
  /** Destination path in the sandbox; parent directories are created. */
  readonly path: string;
  /** File contents. */
  readonly content: string | Uint8Array;
}

/** What {@link uploadFiles} wrote. */
export interface UploadFilesResult {
  readonly files: ReadonlyArray<{ readonly path: string; readonly bytes: number }>;
}

/** A file {@link downloadFiles} could not read. */
export interface DownloadFileFailure {
  readonly path: string;
  readonly statusCode: number;
  readonly message: string;
  /** Daytona's error code, e.g. `FILE_NOT_FOUND`. */
  readonly code?: string;
}

/** What {@link downloadFiles} read: each file's bytes, and the paths it couldn't read. */
export interface DownloadFilesResult {
  readonly files: ReadonlyArray<{ readonly path: string; readonly content: Uint8Array }>;
  readonly errors: ReadonlyArray<DownloadFileFailure>;
}

export type BulkTransferError = BulkTransferFailed | ConfigError | HttpClientError.HttpClientError;

const bulkRequest = Effect.fn(function* (path: string, body: HttpBody.HttpBody) {
  const creds = yield* config;
  const root = yield* toolboxRoot(creds);
  const client = yield* HttpClient.HttpClient;
  const headers = requestHeaders(creds);
  const response = yield* client.execute(
    HttpClientRequest.post(`${root}${path}`).pipe(
      HttpClientRequest.setHeaders(headers),
      HttpClientRequest.setBody(body),
    ),
  );
  if (response.status < 200 || response.status >= 300) {
    const text = yield* response.text;
    const parsed = parseChunk(text) as { message?: string; code?: string } | undefined;
    return yield* new BulkTransferFailed({
      status: response.status,
      message: parsed?.message ?? text,
      code: parsed?.code,
    });
  }
  return response;
});

/**
 * Upload several files in one request. Existing files are overwritten and
 * missing parent directories are created.
 */
export const uploadFiles = Effect.fn("Daytona.uploadFiles")(function* (request: {
  readonly files: ReadonlyArray<UploadFileEntry>;
}) {
  const form = new FormData();
  request.files.forEach((file, i) => {
    form.append(`files[${i}].path`, file.path);
    const bytes =
      typeof file.content === "string" ? new TextEncoder().encode(file.content) : file.content;
    form.append(`files[${i}].file`, new Blob([bytes.slice()]), file.path);
  });
  const response = yield* bulkRequest("/files/bulk-upload", HttpBody.formData(form));
  const body = (yield* response.json) as {
    files?: Array<{ path?: string; bytes?: number }> | null;
  };
  return {
    files: (body.files ?? []).map((file) => ({ path: file.path ?? "", bytes: file.bytes ?? 0 })),
  } satisfies UploadFilesResult;
}) as (request: {
  readonly files: ReadonlyArray<UploadFileEntry>;
}) => Effect.Effect<UploadFilesResult, BulkTransferError, Credentials | HttpClient.HttpClient>;

/** One part of a multipart body. */
export interface MultipartPart {
  readonly name?: string;
  readonly filename?: string;
  readonly headers: Readonly<Record<string, string>>;
  readonly data: Uint8Array;
}

const indexOf = (haystack: Uint8Array, needle: Uint8Array, from: number) => {
  outer: for (let i = from; i <= haystack.length - needle.length; i++) {
    for (let j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) continue outer;
    }
    return i;
  }
  return -1;
};

const dispositionParam = (disposition: string, name: string) => {
  // RFC 5987 `name*=utf-8''...` wins over the plain parameter.
  const plainParam = () => {
    const plain = new RegExp(`(?:^|;)\\s*${name}="([^"]*)"|(?:^|;)\\s*${name}=([^;]+)`, "i").exec(
      disposition,
    );
    return plain ? (plain[1] ?? plain[2]?.trim()) : undefined;
  };
  const extended = new RegExp(`(?:^|;)\\s*${name}\\*=([^']*)'[^']*'([^;]+)`, "i").exec(disposition);
  if (!extended) return plainParam();
  try {
    return decodeURIComponent(extended[2]!.trim());
  } catch {
    // Not percent-encoded: the plain parameter instead.
    return plainParam();
  }
};

/** Split a multipart body into its parts. */
export const parseMultipart = (body: Uint8Array, boundary: string): MultipartPart[] => {
  const encoder = new TextEncoder();
  const delimiter = encoder.encode(`--${boundary}`);
  const headerEnd = encoder.encode("\r\n\r\n");
  const parts: MultipartPart[] = [];
  let at = indexOf(body, delimiter, 0);
  while (at >= 0) {
    const afterDelimiter = at + delimiter.length;
    // `--boundary--` closes the body.
    if (body[afterDelimiter] === 0x2d && body[afterDelimiter + 1] === 0x2d) break;
    const headersStart = afterDelimiter + 2; // CRLF
    const next = indexOf(body, delimiter, headersStart);
    if (next < 0) break;
    const separator = indexOf(body, headerEnd, headersStart);
    if (separator >= 0 && separator < next) {
      const headers: Record<string, string> = {};
      for (const line of new TextDecoder()
        .decode(body.subarray(headersStart, separator))
        .split("\r\n")) {
        const colon = line.indexOf(":");
        if (colon > 0)
          headers[line.slice(0, colon).trim().toLowerCase()] = line.slice(colon + 1).trim();
      }
      const disposition = headers["content-disposition"] ?? "";
      parts.push({
        name: dispositionParam(disposition, "name"),
        filename: dispositionParam(disposition, "filename"),
        headers,
        // The part's data ends at the CRLF before the next delimiter.
        data: body.slice(
          separator + headerEnd.length,
          Math.max(separator + headerEnd.length, next - 2),
        ),
      });
    }
    at = next;
  }
  return parts;
};

/**
 * Download several files in one request. A path that can't be read is
 * reported in `errors`, not failed.
 */
export const downloadFiles = Effect.fn("Daytona.downloadFiles")(function* (request: {
  readonly paths: ReadonlyArray<string>;
}) {
  const response = yield* bulkRequest(
    "/files/bulk-download",
    HttpBody.jsonUnsafe({ paths: request.paths }),
  );
  const boundary = /boundary="?([^";]+)"?/i.exec(response.headers["content-type"] ?? "")?.[1];
  const body = new Uint8Array(yield* response.arrayBuffer);
  if (!boundary) {
    return yield* new BulkTransferFailed({
      status: response.status,
      message: `Expected a multipart reply, got ${response.headers["content-type"] ?? "no content type"}`,
    });
  }
  const files: Array<{ path: string; content: Uint8Array }> = [];
  const errors: DownloadFileFailure[] = [];
  for (const part of parseMultipart(body, boundary)) {
    const path = part.filename ?? "";
    if (part.name === "error") {
      const error = parseChunk(new TextDecoder().decode(part.data)) as
        | { statusCode?: number; message?: string; code?: string; path?: string }
        | undefined;
      errors.push({
        path: error?.path ?? path,
        statusCode: error?.statusCode ?? 500,
        message: error?.message ?? "",
        code: error?.code,
      });
    } else {
      files.push({ path, content: part.data });
    }
  }
  return { files, errors } satisfies DownloadFilesResult;
}) as (request: {
  readonly paths: ReadonlyArray<string>;
}) => Effect.Effect<DownloadFilesResult, BulkTransferError, Credentials | HttpClient.HttpClient>;
