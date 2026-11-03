/**
 * An HTTP/2 `fetch` -- hand-written.
 *
 * A sandbox's task command router accepts only HTTP/2 (its TLS endpoint
 * offers no HTTP/1.1), and `fetch` in Node and Bun speaks HTTP/1.1. This
 * `fetch` sends each request on a pooled `node:http2` session per origin and
 * folds the response trailers, where gRPC puts `grpc-status`, into the
 * response headers. `node:http2` is imported on first use, so bundles for
 * runtimes without it (Cloudflare Workers) only fail if a router call runs.
 */

type Http2 = typeof import("node:http2");
type Session = import("node:http2").ClientHttp2Session;

let http2: Promise<Http2> | undefined;
const sessions = new Map<string, { session: Session; active: number }>();

const sessionFor = async (origin: string) => {
  const existing = sessions.get(origin);
  if (existing && !existing.session.closed && !existing.session.destroyed) return existing;
  const { connect } = await (http2 ??= import("node:http2"));
  const entry = { session: connect(origin), active: 0 };
  // An idle session doesn't keep the process alive; a request in flight does.
  entry.session.unref();
  const drop = () => {
    if (sessions.get(origin) === entry) sessions.delete(origin);
  };
  entry.session.on("error", drop);
  entry.session.on("close", drop);
  entry.session.on("goaway", drop);
  sessions.set(origin, entry);
  return entry;
};

/** Headers HTTP/2 forbids or derives itself. */
const CONNECTION_HEADERS = new Set([
  "host",
  "connection",
  "keep-alive",
  "content-length",
  "transfer-encoding",
  "upgrade",
]);

const bodyBytes = (body: unknown): Uint8Array | undefined => {
  if (body === undefined || body === null) return undefined;
  if (body instanceof Uint8Array) return body;
  if (body instanceof ArrayBuffer) return new Uint8Array(body);
  if (typeof body === "string") return new TextEncoder().encode(body);
  throw new TypeError("http2Fetch sends only byte, ArrayBuffer and string bodies");
};

/**
 * `fetch` over HTTP/2. Provide it as `FetchHttpClient.Fetch` to send an
 * Effect `HttpClient`'s requests over HTTP/2.
 */
export const http2Fetch = async (
  input: string | URL | Request,
  init: RequestInit = {},
): Promise<Response> => {
  const url = new URL(
    typeof input === "string" || input instanceof URL ? input.toString() : input.url,
  );
  const entry = await sessionFor(url.origin);
  const headers: Record<string, string> = {};
  new Headers(init.headers).forEach((value, key) => {
    if (!CONNECTION_HEADERS.has(key)) headers[key] = value;
  });
  const body = bodyBytes(init.body);
  return new Promise<Response>((resolve, reject) => {
    if (entry.active++ === 0) entry.session.ref();
    const settle = () => {
      if (--entry.active === 0 && !entry.session.destroyed) entry.session.unref();
    };
    const stream = entry.session.request({
      ":method": init.method ?? "GET",
      ":path": `${url.pathname}${url.search}`,
      ...headers,
    });
    const signal = init.signal;
    const onAbort = () => stream.close();
    if (signal) {
      if (signal.aborted) onAbort();
      else signal.addEventListener("abort", onAbort, { once: true });
    }
    let status = 0;
    const responseHeaders = new Headers();
    const copy = (incoming: Record<string, string | string[] | undefined>) => {
      for (const [key, value] of Object.entries(incoming)) {
        if (key.startsWith(":") || value === undefined) continue;
        for (const v of Array.isArray(value) ? value : [value]) responseHeaders.append(key, v);
      }
    };
    const chunks: Uint8Array[] = [];
    stream.on("response", (incoming) => {
      status = Number(incoming[":status"] ?? 0);
      copy(incoming);
    });
    stream.on("trailers", copy);
    stream.on("data", (chunk: Uint8Array) => chunks.push(chunk));
    stream.on("end", () => {
      settle();
      signal?.removeEventListener("abort", onAbort);
      const bytes = Buffer.concat(chunks);
      resolve(
        new Response(bytes.length > 0 ? bytes : null, {
          status: status || 200,
          headers: responseHeaders,
        }),
      );
    });
    stream.on("error", (error) => {
      settle();
      signal?.removeEventListener("abort", onAbort);
      reject(error);
    });
    stream.end(body === undefined ? undefined : Buffer.from(body));
  });
};
