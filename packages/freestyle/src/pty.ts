/**
 * Freestyle PTY WebSocket helper — hand-written.
 *
 * Generated `openPty` / `attachPty` are REST stubs: the converter only
 * models JSON, and these routes answer `101 Switching Protocols`. This
 * module opens the socket, waits for the `sessionInfo` text frame, then
 * speaks the documented frame protocol:
 *
 *   • binary frames — terminal I/O (stdin in, stdout/stderr out)
 *   • text frames   — `{type:"resize"|"signal"}` in, `{type:"exited"|"error"}` out
 *
 * Auth is the same Bearer (and optional identity token) the REST protocol
 * sends. Bun and `ws` accept handshake headers; browsers cannot, so a
 * browser page will 401 unless some other proof is in play.
 */
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import * as Schema from "effect/Schema";
import * as Category from "@distilled.cloud/core/category";
import { Credentials } from "./credentials.ts";

export class PtyError extends Schema.TaggedError<PtyError>()("PtyError", {
  message: Schema.String,
  code: Schema.optional(Schema.Number),
}).pipe(Category.withServerError) {}

export interface ConnectPtyOptions {
  readonly vmIdOrSlug: string;
  /** Command to run; omit for a login shell. */
  readonly exec?: string;
  readonly cols?: number;
  readonly rows?: number;
  readonly linuxUser?: string;
  /** Name this session so you can reconnect without storing the minted id. */
  readonly slug?: string;
  readonly replaceOnExit?: boolean;
}

export interface ReconnectPtyOptions {
  readonly vmIdOrSlug: string;
  /** Session id, or the slug the session was opened with. */
  readonly sessionId: string | number;
  readonly linuxUser?: string;
}

export interface PtySession {
  readonly sessionId: number;
  readonly slug: string | undefined;
  readonly created: boolean;
  readonly socket: WebSocket;
  /** Send stdin. Strings are UTF-8 encoded into a binary frame. */
  write(data: string | Uint8Array): void;
  resize(size: { readonly cols: number; readonly rows: number }): void;
  signal(signal: "sigint" | "sigkill"): void;
  /** Close this connection; the guest session keeps running. */
  detach(): void;
}

type HeaderWebSocket = new (
  url: string,
  options: { readonly headers?: Record<string, string> },
) => WebSocket;

const utf8 = new TextEncoder();
const utf8Decoder = new TextDecoder();

const query = (
  entries: Record<string, string | number | boolean | undefined>,
) => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(entries)) {
    if (value !== undefined) params.set(key, String(value));
  }
  const encoded = params.toString();
  return encoded.length > 0 ? `?${encoded}` : "";
};

const wsUrl = (apiBaseUrl: string, path: string) =>
  `${apiBaseUrl.replace(/^http/, "ws")}${path}`;

const authHeaders = (creds: {
  readonly apiKey?: Redacted.Redacted<string>;
  readonly identityAccessToken?: Redacted.Redacted<string>;
}): Record<string, string> => {
  const headers: Record<string, string> = {};
  if (creds.apiKey !== undefined) {
    headers.Authorization = `Bearer ${Redacted.value(creds.apiKey)}`;
  }
  if (creds.identityAccessToken !== undefined) {
    headers["x-freestyle-identity-access-token"] = Redacted.value(
      creds.identityAccessToken,
    );
  }
  return headers;
};

const openSocket = (url: string, headers: Record<string, string>): WebSocket =>
  new (WebSocket as unknown as HeaderWebSocket)(url, { headers });

const asBytes = (raw: unknown): Uint8Array | undefined => {
  if (raw instanceof Uint8Array) return raw;
  if (raw instanceof ArrayBuffer) return new Uint8Array(raw);
  return undefined;
};

const asText = (raw: unknown): string | undefined => {
  if (typeof raw === "string") return raw;
  const bytes = asBytes(raw);
  return bytes ? utf8Decoder.decode(bytes) : undefined;
};

const makeSession = (
  socket: WebSocket,
  info: { sessionId: number; slug?: string; created: boolean },
): PtySession => ({
  sessionId: info.sessionId,
  slug: info.slug,
  created: info.created,
  socket,
  write(data) {
    const bytes = typeof data === "string" ? utf8.encode(data) : data;
    socket.send(bytes as BufferSource);
  },
  resize(size) {
    socket.send(
      JSON.stringify({ type: "resize", cols: size.cols, rows: size.rows }),
    );
  },
  signal(signal) {
    socket.send(JSON.stringify({ type: "signal", signal }));
  },
  detach() {
    socket.close();
  },
});

const handshake = (
  url: string,
  headers: Record<string, string>,
): Promise<PtySession> =>
  new Promise((resolve, reject) => {
    const socket = openSocket(url, headers);
    let settled = false;
    const fail = (error: Error) => {
      if (settled) return;
      settled = true;
      socket.close();
      reject(error);
    };

    socket.addEventListener("message", (event) => {
      const data = (event as MessageEvent).data;
      const text = typeof data === "string" ? data : asText(data);
      if (text === undefined) return;
      let msg: {
        type?: string;
        sessionId?: number;
        slug?: string;
        created?: boolean;
      };
      try {
        msg = JSON.parse(text) as typeof msg;
      } catch {
        return;
      }
      if (msg.type !== "sessionInfo" || typeof msg.sessionId !== "number") {
        return;
      }
      if (settled) return;
      settled = true;
      resolve(
        makeSession(socket, {
          sessionId: msg.sessionId,
          slug: msg.slug,
          created: msg.created ?? true,
        }),
      );
    });
    socket.addEventListener("error", () =>
      fail(new Error("PTY WebSocket error before sessionInfo")),
    );
    socket.addEventListener("close", (event) => {
      const close = event as CloseEvent;
      fail(
        new Error(
          `PTY WebSocket closed before sessionInfo (${close.code}${close.reason ? `: ${close.reason}` : ""})`,
        ),
      );
    });
  });

const connect = (path: string) =>
  Effect.gen(function* () {
    const creds = yield* yield* Credentials;
    return yield* Effect.tryPromise({
      try: () => handshake(wsUrl(creds.apiBaseUrl, path), authHeaders(creds)),
      catch: (cause) =>
        new PtyError({
          message: cause instanceof Error ? cause.message : String(cause),
        }),
    });
  });

/** Open a PTY on a VM. Resolves once the server's `sessionInfo` frame arrives. */
export const connectPty = (
  options: ConnectPtyOptions,
): Effect.Effect<PtySession, PtyError, Credentials> =>
  connect(
    `/v5/vms/${encodeURIComponent(options.vmIdOrSlug)}/pty${query({
      exec: options.exec,
      cols: options.cols,
      rows: options.rows,
      linuxUser: options.linuxUser,
      slug: options.slug,
      replaceOnExit: options.replaceOnExit,
    })}`,
  );

/** Reattach to an existing PTY session. Scrollback replays first. */
export const reconnectPty = (
  options: ReconnectPtyOptions,
): Effect.Effect<PtySession, PtyError, Credentials> =>
  connect(
    `/v5/vms/${encodeURIComponent(options.vmIdOrSlug)}/pty/sessions/${encodeURIComponent(String(options.sessionId))}${query(
      { linuxUser: options.linuxUser },
    )}`,
  );
