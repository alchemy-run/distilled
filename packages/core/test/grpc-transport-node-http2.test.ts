import * as http2 from "node:http2";
import type { AddressInfo } from "node:net";
import * as net from "node:net";
import * as Effect from "effect/Effect";
import type * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Result from "effect/Result";
import * as Tracer from "effect/Tracer";
import { afterEach, describe, expect, test } from "vitest";
import * as NodeHttp2 from "../src/grpc-transport-node-http2.ts";
import { resetTrailers, trailersOf } from "../src/grpc-transport.ts";
import { encode } from "../src/hpack.ts";

const C = http2.constants;

const closers: Array<() => void> = [];
afterEach(() => {
  for (const close of closers.splice(0)) close();
});

/** A `node:http2` server that handles each stream with `onStream`. */
const serve = async (onStream: (stream: http2.ServerHttp2Stream) => void) => {
  const server = http2.createServer();
  const sessions = new Set<http2.ServerHttp2Session>();
  server.on("session", (session) => sessions.add(session));
  server.on("stream", (stream: http2.ServerHttp2Stream) => {
    stream.on("error", () => undefined);
    onStream(stream);
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  closers.push(() => {
    for (const session of sessions) session.destroy();
    server.close();
  });
  return `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
};

const frameOf = (type: number, flags: number, stream: number, payload: Uint8Array) => {
  const out = Buffer.alloc(9 + payload.length);
  out.writeUIntBE(payload.length, 0, 3);
  out[3] = type;
  out[4] = flags;
  out.writeUInt32BE(stream, 5);
  out.set(payload, 9);
  return out;
};

const resetFrame = (code: number) => {
  const payload = Buffer.alloc(4);
  payload.writeUInt32BE(code);
  return frameOf(0x3, 0, 1, payload);
};

const headFrame = () =>
  frameOf(
    0x1,
    0x4,
    1,
    encode([
      [":status", "200"],
      ["content-type", "application/grpc"],
    ]),
  );

/**
 * A server that speaks raw HTTP/2 frames and calls `answer` once the
 * client's request HEADERS arrive, on a TCP port or at the Unix socket
 * `path`. The frames are exact on every runtime: Bun's `node:http2` server
 * doesn't send the code given to `stream.close`, and Node 22 and Bun refuse
 * to destroy an HTTP/2 session's socket.
 */
const serveRaw = async (answer: (socket: net.Socket) => void, path?: string) => {
  const server = net.createServer((socket) => {
    socket.on("error", () => undefined);
    socket.write(frameOf(0x4, 0, 0, new Uint8Array(0)));
    let seen = Buffer.alloc(0);
    let answered = false;
    socket.on("data", (chunk: Buffer) => {
      seen = Buffer.concat([seen, chunk]);
      // The client's preface, then its frames.
      for (let at = 24; !answered && at + 9 <= seen.length;) {
        const length = seen.readUIntBE(at, 3);
        if (seen[at + 3] === 0x1) {
          answered = true;
          answer(socket);
        }
        at += 9 + length;
      }
    });
  });
  if (path === undefined) {
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  } else {
    await new Promise<void>((resolve) => server.listen(path, resolve));
  }
  closers.push(() => server.close());
  return path === undefined
    ? `http://127.0.0.1:${(server.address() as AddressInfo).port}`
    : "http://localhost";
};

const call = (client: HttpClient.HttpClient, url: string) =>
  Effect.runPromise(
    Effect.result(
      client
        .execute(
          HttpClientRequest.post(`${url}/test.Svc/Get`).pipe(
            HttpClientRequest.bodyUint8Array(new Uint8Array([0, 0, 0, 0, 0]), "application/grpc"),
            HttpClientRequest.setHeader("te", "trailers"),
          ),
        )
        // Fails the test rather than waiting for vitest's timeout.
        .pipe(Effect.timeout("2 seconds"), Effect.provideService(Tracer.DisablePropagation, true)),
    ),
  );

const answered = async (client: HttpClient.HttpClient, url: string) => {
  const result = await call(client, url);
  if (!Result.isSuccess(result)) throw new Error(`no response: ${String(result.failure)}`);
  return result.success;
};

const read = async (response: HttpClientResponse.HttpClientResponse) => ({
  status: response.status,
  contentType: response.headers["content-type"],
  body: await Effect.runPromise(response.text),
  trailers: await Effect.runPromise(trailersOf(response)),
});

describe("gRPC over node:http2: stream resets", () => {
  test("a full reply reads its body and trailers", async () => {
    const url = await serve((stream) => {
      stream.respond(
        { ":status": 200, "content-type": "application/grpc" },
        { waitForTrailers: true },
      );
      stream.on("wantTrailers", () => stream.sendTrailers({ "grpc-status": "0" }));
      stream.end("ok");
    });
    expect(await read(await answered(NodeHttp2.client, url))).toEqual({
      status: 200,
      contentType: "application/grpc",
      body: "ok",
      trailers: { "grpc-status": "0" },
    });
  });

  // gRPC over HTTP/2 (PROTOCOL-HTTP2.md, "Errors"), as grpc-js maps it.
  // NO_ERROR and CANCEL emit no `error` event, and used to leave the call pending.
  test.each([
    [
      C.NGHTTP2_NO_ERROR,
      "13",
      "the server reset the stream without a grpc-status (HTTP/2 error 0)",
    ],
    [C.NGHTTP2_INTERNAL_ERROR, "13", "the server reset the stream (HTTP/2 error 2)"],
    [C.NGHTTP2_REFUSED_STREAM, "14", "the server refused the stream (HTTP/2 error 7)"],
    [C.NGHTTP2_CANCEL, "1", "the server cancelled the call (HTTP/2 error 8)"],
    [C.NGHTTP2_ENHANCE_YOUR_CALM, "8", "the server asked to slow down (HTTP/2 error 11)"],
    [C.NGHTTP2_INADEQUATE_SECURITY, "7", "the connection is not secure enough (HTTP/2 error 12)"],
  ])(
    "a reset %i before the head is a reply of trailers alone with status %s",
    async (code, status, message) => {
      const url = await serveRaw((socket) => socket.write(resetFrame(code)));
      expect(await read(await answered(NodeHttp2.client, url))).toEqual({
        status: 200,
        contentType: "application/grpc",
        body: "",
        trailers: { "grpc-status": status, "grpc-message": message },
      });
    },
  );

  test("a reset before the head over a Unix socket", async () => {
    const path = `/tmp/distilled-grpc-reset-${process.pid}.sock`;
    const url = await serveRaw((socket) => socket.write(resetFrame(C.NGHTTP2_NO_ERROR)), path);
    const response = await answered(NodeHttp2.unixSocket(path), url);
    expect((await read(response)).trailers).toEqual(resetTrailers(C.NGHTTP2_NO_ERROR));
  });

  test.each([
    [C.NGHTTP2_INTERNAL_ERROR, ""],
    [C.NGHTTP2_REFUSED_STREAM, "partial"],
  ])("a reset %i after the head ends the body with its status", async (code, body) => {
    const url = await serveRaw((socket) =>
      socket.write(
        Buffer.concat([
          headFrame(),
          ...(body === "" ? [] : [frameOf(0x0, 0, 1, Buffer.from(body))]),
          resetFrame(code),
        ]),
      ),
    );
    expect(await read(await answered(NodeHttp2.client, url))).toEqual({
      status: 200,
      contentType: "application/grpc",
      body,
      trailers: resetTrailers(code),
    });
  });

  test("a connection lost before the head is a transport error", async () => {
    const url = await serveRaw((socket) => socket.destroy());
    const result = await call(NodeHttp2.client, url);
    if (!Result.isFailure(result)) throw new Error("the request was answered");
    const error = result.failure as HttpClientError.HttpClientError;
    expect(error._tag).toBe("HttpClientError");
    expect(error.reason._tag).toBe("TransportError");
  });
});
