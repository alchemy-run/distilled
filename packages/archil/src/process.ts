/**
 * Archil sandbox processes -- hand-written.
 *
 * `createSandboxConnection` mints a short-lived WebSocket URL; the process
 * protocol runs over that socket (the same protocol the official `disk` SDK
 * speaks):
 *
 *   • first text frame in   — `{type:"start", command, cwd, env, terminal, timeout_seconds}`
 *                             or `{type:"attach", process_id, offset}`
 *   • text frames out        — `{type:"started"|"attached", process_id}`,
 *                             `{type:"exit", status, exit_code, exit_reason, cursor}`,
 *                             `{type:"error", error, message}`
 *   • binary frames out      — `[1 byte stream (1 stdout, 2 stderr)][8 byte BE offset][payload]`
 *   • binary frames in       — stdin bytes; `{type:"close_stdin"}` closes stdin
 *   • control (new socket)   — `{type:"kill"|"resize", process_id, cols?, rows?}`
 *                             answered by `{type:"killed"|"resized"}`
 *
 * Offsets are positions in the process's combined output, so a reconnect
 * with `attach({ offset })` resumes without duplicating output. Processes
 * keep running when a socket closes.
 */
import * as Category from "@distilled.cloud/core/category";
import * as Cause from "effect/Cause";
import * as Effect from "effect/Effect";
import * as Queue from "effect/Queue";
import * as Redacted from "effect/Redacted";
import * as Schema from "effect/Schema";
import * as Stream from "effect/Stream";
import { createSandboxConnection } from "./services/archil.ts";

/** The process socket failed, or the runtime reported an error. */
export class ProcessError extends Schema.TaggedError<ProcessError>()("ProcessError", {
  message: Schema.String,
  error: Schema.optional(Schema.String),
}).pipe(Category.withServerError) {}

export interface RunOptions {
  /** Working directory inside the sandbox. */
  readonly cwd?: string;
  /** Environment for the process. */
  readonly env?: Record<string, string>;
  /** Allocate a pseudo-terminal (optionally with its size). */
  readonly terminal?: boolean | { readonly cols?: number; readonly rows?: number };
  /** Kill the process after this many seconds. */
  readonly timeoutSeconds?: number;
}

/** A chunk of process output, at its offset in the combined output. */
export interface ProcessOutput {
  readonly stream: "stdout" | "stderr";
  readonly offset: number;
  readonly data: Uint8Array;
}

/** How a process ended. */
export interface ProcessExit {
  readonly status: string;
  readonly exitCode: number | undefined;
  readonly exitReason: string | undefined;
  /** Output offset at exit, for a later `attach`. */
  readonly cursor: number;
}

/** A finished process with its collected output. */
export interface ProcessResult extends ProcessExit {
  readonly stdout: string;
  readonly stderr: string;
}

/**
 * A process attached over one socket. The socket closes with the scope that
 * opened it; the process keeps running and can be re-attached by `id`.
 */
export interface Process {
  readonly id: string;
  /** Output frames until the process exits. Consume once. */
  readonly output: Stream.Stream<ProcessOutput, ProcessError>;
  /** Wait for the process to exit. */
  readonly exit: Effect.Effect<ProcessExit, ProcessError>;
  /** Write to stdin. Strings are UTF-8 encoded. */
  write(data: string | Uint8Array): Effect.Effect<void, ProcessError>;
  /** Close stdin. */
  readonly closeStdin: Effect.Effect<void, ProcessError>;
}

const STDIN_CHUNK_BYTES = 1024 * 1024;
const utf8 = new TextEncoder();

type Event =
  | { readonly type: "started" | "attached"; readonly process_id: string }
  | {
      readonly type: "exit";
      readonly status: string;
      readonly exit_code?: number | null;
      readonly exit_reason?: string | null;
      readonly cursor: number;
    }
  | { readonly type: "error"; readonly error: string; readonly message: string }
  | { readonly type: "killed" | "resized" };

const connectionUrl = (sid: string) =>
  createSandboxConnection({ sid }).pipe(
    Effect.map((response) => Redacted.value(response.data.url)),
  );

const openSocket = (url: string) =>
  Effect.acquireRelease(
    Effect.callback<WebSocket, ProcessError>((resume) => {
      const socket = new WebSocket(url);
      socket.binaryType = "arraybuffer";
      const onOpen = () => {
        cleanup();
        resume(Effect.succeed(socket));
      };
      const onError = () => {
        cleanup();
        resume(Effect.fail(new ProcessError({ message: "Process connection failed" })));
      };
      const cleanup = () => {
        socket.removeEventListener("open", onOpen);
        socket.removeEventListener("error", onError);
      };
      socket.addEventListener("open", onOpen);
      socket.addEventListener("error", onError);
      return Effect.sync(() => {
        cleanup();
        socket.close();
      });
    }),
    (socket) => Effect.sync(() => socket.close()),
  );

const parseOutput = (data: ArrayBuffer): ProcessOutput | ProcessError => {
  const bytes = new Uint8Array(data);
  if (bytes.byteLength < 9 || (bytes[0] !== 1 && bytes[0] !== 2)) {
    return new ProcessError({ message: "Invalid process output frame" });
  }
  return {
    stream: bytes[0] === 1 ? "stdout" : "stderr",
    offset: Number(new DataView(data).getBigUint64(1)),
    data: bytes.subarray(9),
  };
};

const connect = Effect.fn(function* (sid: string, request: Record<string, unknown>) {
  const url = yield* connectionUrl(sid);
  const socket = yield* openSocket(url);
  const output = yield* Queue.make<ProcessOutput, ProcessError | Cause.Done>();
  let exited: ProcessExit | undefined;
  let cursor = typeof request.offset === "number" ? request.offset : 0;

  const ready = yield* Effect.callback<string, ProcessError>((resume) => {
    let settled = false;
    const settle = (effect: Effect.Effect<string, ProcessError>) => {
      if (settled) return;
      settled = true;
      resume(effect);
    };
    socket.addEventListener("message", (message) => {
      if (typeof message.data !== "string") {
        const frame = parseOutput(message.data as ArrayBuffer);
        if (frame instanceof ProcessError) {
          Queue.failCauseUnsafe(output, Cause.fail(frame));
          return;
        }
        // Skip bytes already delivered before a reconnect.
        const end = frame.offset + frame.data.byteLength;
        if (end <= cursor) return;
        const skip = Math.max(0, cursor - frame.offset);
        cursor = end;
        Queue.offerUnsafe(output, {
          ...frame,
          offset: frame.offset + skip,
          data: frame.data.subarray(skip),
        });
        return;
      }
      const event = JSON.parse(message.data) as Event;
      switch (event.type) {
        case "started":
        case "attached":
          settle(Effect.succeed(event.process_id));
          return;
        case "exit":
          exited = {
            status: event.status,
            exitCode: event.exit_code ?? undefined,
            exitReason: event.exit_reason ?? undefined,
            cursor: Math.max(cursor, event.cursor),
          };
          Queue.endUnsafe(output);
          return;
        case "error": {
          const error = new ProcessError({ message: event.message, error: event.error });
          settle(Effect.fail(error));
          Queue.failCauseUnsafe(output, Cause.fail(error));
          return;
        }
      }
    });
    socket.addEventListener("close", () => {
      settle(Effect.fail(new ProcessError({ message: "Process connection closed before ready" })));
      if (exited === undefined) {
        Queue.failCauseUnsafe(
          output,
          Cause.fail(new ProcessError({ message: "Process connection closed before exit" })),
        );
      }
    });
    socket.send(JSON.stringify(request));
  });

  const send = (data: string | Uint8Array) =>
    Effect.try({
      try: () => socket.send(typeof data === "string" ? data : new Uint8Array(data)),
      catch: () => new ProcessError({ message: "Process is disconnected" }),
    });

  const outputStream = Stream.fromQueue(output);
  const process: Process = {
    id: ready,
    output: outputStream,
    exit: outputStream.pipe(
      Stream.runDrain,
      Effect.flatMap(() =>
        exited
          ? Effect.succeed(exited)
          : Effect.fail(new ProcessError({ message: "Process connection closed before exit" })),
      ),
    ),
    write: Effect.fn(function* (data: string | Uint8Array) {
      const bytes = typeof data === "string" ? utf8.encode(data) : data;
      for (let offset = 0; offset < bytes.byteLength; offset += STDIN_CHUNK_BYTES) {
        yield* send(bytes.subarray(offset, offset + STDIN_CHUNK_BYTES));
      }
    }),
    closeStdin: send(JSON.stringify({ type: "close_stdin" })),
  };
  return process;
});

/**
 * Start a command in a running sandbox and attach to it. The socket closes
 * with the scope; the process keeps running.
 */
export const run = (sid: string, command: string, options: RunOptions = {}) =>
  connect(sid, {
    type: "start",
    command,
    cwd: options.cwd,
    env: options.env ?? {},
    terminal:
      typeof options.terminal === "object"
        ? { cols: options.terminal.cols ?? 80, rows: options.terminal.rows ?? 24 }
        : options.terminal,
    timeout_seconds: options.timeoutSeconds,
  });

/** Re-attach to a running process, resuming its output at `offset`. */
export const attach = (sid: string, processId: string, offset = 0) =>
  connect(sid, { type: "attach", process_id: processId, offset });

const control = Effect.fn(function* (
  sid: string,
  request: {
    readonly type: "kill" | "resize";
    readonly process_id: string;
    readonly cols?: number;
    readonly rows?: number;
  },
) {
  const url = yield* connectionUrl(sid);
  const expected = request.type === "kill" ? "killed" : "resized";
  yield* Effect.scoped(
    Effect.gen(function* () {
      const socket = yield* openSocket(url);
      yield* Effect.callback<void, ProcessError>((resume) => {
        socket.addEventListener(
          "message",
          (message) => {
            const event = JSON.parse(String(message.data)) as Event;
            if (event.type === "error") {
              resume(Effect.fail(new ProcessError({ message: event.message, error: event.error })));
            } else if (event.type !== expected) {
              resume(
                Effect.fail(
                  new ProcessError({ message: `Expected ${expected}, received ${event.type}` }),
                ),
              );
            } else {
              resume(Effect.void);
            }
          },
          { once: true },
        );
        socket.addEventListener("close", () =>
          resume(
            Effect.fail(new ProcessError({ message: `Process ${request.type} connection closed` })),
          ),
        );
        socket.send(JSON.stringify(request));
      });
    }),
  );
});

/** Kill a running process. */
export const kill = (sid: string, processId: string) =>
  control(sid, { type: "kill", process_id: processId });

/** Resize a running process's pseudo-terminal. */
export const resize = (
  sid: string,
  processId: string,
  size: { readonly cols: number; readonly rows: number },
) => control(sid, { type: "resize", process_id: processId, ...size });

const utf8Decoder = () => new TextDecoder();

/** Run a command to completion and collect its output. */
export const exec = Effect.fn(function* (sid: string, command: string, options: RunOptions = {}) {
  return yield* Effect.scoped(
    Effect.gen(function* () {
      const process = yield* run(sid, command, options);
      const out = utf8Decoder();
      const err = utf8Decoder();
      let stdout = "";
      let stderr = "";
      yield* process.output.pipe(
        Stream.runForEach((chunk) =>
          Effect.sync(() => {
            if (chunk.stream === "stdout") stdout += out.decode(chunk.data, { stream: true });
            else stderr += err.decode(chunk.data, { stream: true });
          }),
        ),
      );
      const exit = yield* process.exit;
      return {
        ...exit,
        stdout: stdout + out.decode(),
        stderr: stderr + err.decode(),
      } satisfies ProcessResult;
    }),
  );
});

const UPLOAD_COMMAND = `set -eu
mkdir -p "$ARCHIL_FILE_PARENT"
trap 'rm -f "$ARCHIL_FILE_TEMP"' EXIT HUP INT TERM
: > "$ARCHIL_FILE_TEMP"
cat > "$ARCHIL_FILE_TEMP"
chmod "$ARCHIL_FILE_MODE" "$ARCHIL_FILE_TEMP"
mv -f "$ARCHIL_FILE_TEMP" "$ARCHIL_FILE_TARGET"
trap - EXIT HUP INT TERM`;

const transferId = () => Math.random().toString(36).slice(2, 12);

const splitPath = (remotePath: string) => {
  const path = remotePath.startsWith("/") ? remotePath : `/${remotePath}`;
  const parent = path.slice(0, path.lastIndexOf("/")) || "/";
  return { path, parent };
};

const ensureSuccess = (result: ProcessExit, stderr: string, what: string) =>
  result.exitCode === 0
    ? Effect.void
    : Effect.fail(
        new ProcessError({
          message: `${what} failed (exit ${result.exitCode ?? result.status})${stderr ? `: ${stderr.trim()}` : ""}`,
        }),
      );

/** Write a file in a running sandbox (atomic: temp file, then rename). */
export const uploadFile = Effect.fn(function* (
  sid: string,
  remotePath: string,
  data: string | Uint8Array,
  options: { readonly mode?: number } = {},
) {
  const { path, parent } = splitPath(remotePath);
  yield* Effect.scoped(
    Effect.gen(function* () {
      const process = yield* run(sid, UPLOAD_COMMAND, {
        env: {
          ARCHIL_FILE_PARENT: parent,
          ARCHIL_FILE_TARGET: path,
          ARCHIL_FILE_TEMP: `${parent}/.archil-upload-${transferId()}`,
          ARCHIL_FILE_MODE: (options.mode ?? 0o644).toString(8),
        },
      });
      yield* process.write(data);
      yield* process.closeStdin;
      let stderr = "";
      const err = utf8Decoder();
      yield* process.output.pipe(
        Stream.runForEach((chunk) =>
          Effect.sync(() => {
            if (chunk.stream === "stderr") stderr += err.decode(chunk.data, { stream: true });
          }),
        ),
      );
      yield* ensureSuccess(yield* process.exit, stderr, `Upload of ${path}`);
    }),
  );
});

/** Read a file from a running sandbox. */
export const downloadFile = Effect.fn(function* (sid: string, remotePath: string) {
  const { path } = splitPath(remotePath);
  return yield* Effect.scoped(
    Effect.gen(function* () {
      const process = yield* run(sid, `cat -- "$ARCHIL_FILE_PATH"`, {
        env: { ARCHIL_FILE_PATH: path },
      });
      const chunks: Uint8Array[] = [];
      let stderr = "";
      const err = utf8Decoder();
      yield* process.output.pipe(
        Stream.runForEach((chunk) =>
          Effect.sync(() => {
            if (chunk.stream === "stdout") chunks.push(chunk.data);
            else stderr += err.decode(chunk.data, { stream: true });
          }),
        ),
      );
      yield* ensureSuccess(yield* process.exit, stderr, `Download of ${path}`);
      const size = chunks.reduce((n, c) => n + c.byteLength, 0);
      const bytes = new Uint8Array(size);
      let offset = 0;
      for (const chunk of chunks) {
        bytes.set(chunk, offset);
        offset += chunk.byteLength;
      }
      return bytes;
    }),
  );
});
