/**
 * `Send.send` follows redirects itself: a hop to another origin keeps only
 * the safe headers, so an API key in a custom header never reaches the new
 * host (issue #1581). Two local servers on different origins, run against
 * the fetch client and both Node clients.
 */
import * as http from "node:http";
import type { AddressInfo } from "node:net";
import * as NodeHttpClient from "@effect/platform-node/NodeHttpClient";
import type * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as HttpBody from "effect/http/HttpBody";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import type * as Layer from "effect/Layer";
import * as Stream from "effect/Stream";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import * as Send from "../src/send.ts";

interface Seen {
  readonly url: string;
  readonly method: string;
  readonly headers: http.IncomingHttpHeaders;
  readonly body: string;
}

let seenA: Array<Seen> = [];
let seenB: Array<Seen> = [];
let serverA: http.Server;
let serverB: http.Server;
let originA = "";
let originB = "";

const listen = (server: http.Server) =>
  new Promise<string>((resolve) =>
    server.listen(0, "127.0.0.1", () =>
      resolve(`http://127.0.0.1:${(server.address() as AddressInfo).port}`),
    ),
  );

const record = (into: Array<Seen>, req: http.IncomingMessage) =>
  new Promise<void>((resolve) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      into.push({ url: req.url!, method: req.method!, headers: req.headers, body });
      resolve();
    });
  });

beforeAll(async () => {
  serverB = http.createServer(async (req, res) => {
    await record(seenB, req);
    res.end("from-b");
  });
  // `localhost` and `127.0.0.1` are different origins.
  originB = (await listen(serverB)).replace("127.0.0.1", "localhost");
  serverA = http.createServer(async (req, res) => {
    await record(seenA, req);
    const url = new URL(req.url!, "http://a");
    const status = Number(url.searchParams.get("status") ?? 302);
    if (url.pathname === "/cross") {
      res.writeHead(status, { location: `${originB}/blob?sig=a%20b&X-Amz=1+2` });
    } else if (url.pathname === "/same") {
      res.writeHead(status, { location: "/final" });
    } else if (url.pathname === "/loop") {
      res.writeHead(302, { location: "/loop" });
    } else {
      res.writeHead(200);
    }
    res.end("from-a");
  });
  originA = await listen(serverA);
});

afterAll(() => {
  serverA.close();
  serverB.close();
});

const headers = {
  authorization: "Bearer A",
  cookie: "c=1",
  "x-api-key": "K",
  "dd-api-key": "D",
  "x-amz-security-token": "S",
  accept: "application/json",
  range: "bytes=0-1",
};

const send = (
  layer: Layer.Layer<HttpClient.HttpClient>,
  request: HttpClientRequest.HttpClientRequest,
  init?: RequestInit,
) => {
  seenA = [];
  seenB = [];
  const program = Effect.gen(function* () {
    const client = yield* HttpClient.HttpClient;
    const context = (yield* Effect.context<never>()) as Context.Context<any>;
    const response = yield* Send.send(context, client, request);
    return { status: response.status, text: yield* response.text };
  });
  const withInit =
    init === undefined
      ? program
      : program.pipe(Effect.provideService(FetchHttpClient.RequestInit, init));
  return Effect.runPromise(withInit.pipe(Effect.provide(layer)));
};

const clients: ReadonlyArray<readonly [string, Layer.Layer<HttpClient.HttpClient>]> = [
  ["fetch", FetchHttpClient.layer],
  ["node http", NodeHttpClient.layerNodeHttp],
  ["undici", NodeHttpClient.layerUndici],
];

describe.each(clients)("%s client", (_, layer) => {
  test("a cross-origin hop drops credentials and keeps the safe headers", async () => {
    const result = await send(
      layer,
      HttpClientRequest.get(`${originA}/cross`).pipe(HttpClientRequest.setHeaders(headers)),
    );
    expect(result).toEqual({ status: 200, text: "from-b" });
    expect(seenB).toHaveLength(1);
    const sent = seenB[0]!.headers;
    for (const name of ["authorization", "cookie", "x-api-key", "dd-api-key"]) {
      expect(sent[name], name).toBeUndefined();
    }
    expect(sent["x-amz-security-token"]).toBeUndefined();
    expect(sent.accept).toBe("application/json");
    expect(sent.range).toBe("bytes=0-1");
  });

  test("the Location is requested as sent, so a signed query stays intact", async () => {
    await send(layer, HttpClientRequest.get(`${originA}/cross`));
    expect(seenB[0]!.url).toBe("/blob?sig=a%20b&X-Amz=1+2");
  });

  test("a same-origin hop keeps every header", async () => {
    const result = await send(
      layer,
      HttpClientRequest.get(`${originA}/same`).pipe(HttpClientRequest.setHeaders(headers)),
    );
    expect(result.status).toBe(200);
    expect(seenA).toHaveLength(2);
    expect(seenA[1]!.url).toBe("/final");
    expect(seenA[1]!.headers["x-api-key"]).toBe("K");
    expect(seenA[1]!.headers.authorization).toBe("Bearer A");
  });

  test("a 303 turns a POST into a GET without its body", async () => {
    const result = await send(
      layer,
      HttpClientRequest.post(`${originA}/cross?status=303`).pipe(
        HttpClientRequest.bodyText("secret-body", "text/plain"),
      ),
    );
    expect(result.status).toBe(200);
    expect(seenB[0]!.method).toBe("GET");
    expect(seenB[0]!.body).toBe("");
    expect(seenB[0]!.headers["content-type"]).toBeUndefined();
  });

  test("a 307 keeps the method and the body", async () => {
    const result = await send(
      layer,
      HttpClientRequest.put(`${originA}/cross?status=307`).pipe(
        HttpClientRequest.setHeaders(headers),
        HttpClientRequest.bodyText("payload", "text/plain"),
      ),
    );
    expect(result.status).toBe(200);
    expect(seenB[0]!.method).toBe("PUT");
    expect(seenB[0]!.body).toBe("payload");
    expect(seenB[0]!.headers["x-api-key"]).toBeUndefined();
  });

  test("a 307 with a spent stream body is the response", async () => {
    const result = await send(
      layer,
      HttpClientRequest.put(`${originA}/cross?status=307`).pipe(
        HttpClientRequest.setBody(
          HttpBody.stream(Stream.make(new TextEncoder().encode("s")), "text/plain"),
        ),
      ),
    );
    expect(result.status).toBe(307);
    expect(seenB).toHaveLength(0);
  });

  test(`after ${Send.MAX_REDIRECTS} hops the last 3xx is the response`, async () => {
    const result = await send(layer, HttpClientRequest.get(`${originA}/loop`));
    expect(result.status).toBe(302);
    expect(seenA).toHaveLength(Send.MAX_REDIRECTS + 1);
  });
});

describe("fetch RequestInit", () => {
  test("a redirect mode the caller set wins", async () => {
    const result = await send(
      FetchHttpClient.layer,
      HttpClientRequest.get(`${originA}/cross`).pipe(HttpClientRequest.setHeaders(headers)),
      { redirect: "follow" },
    );
    expect(result.status).toBe(200);
    // The caller chose the platform's rule.
    expect(seenB[0]!.headers["x-api-key"]).toBe("K");
  });

  test("the caller's other options are kept", async () => {
    const result = await send(FetchHttpClient.layer, HttpClientRequest.get(`${originA}/same`), {
      headers: { "x-from-init": "1" },
    });
    expect(result.status).toBe(200);
    expect(seenA[1]!.headers["x-from-init"]).toBe("1");
  });
});
