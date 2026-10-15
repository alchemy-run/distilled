/**
 * Measure one official-SDK program in a fresh process, the same way probe.ts
 * measures a distilled program: import time and heap, live objects added by
 * the import, first call, and added latency per call against a mocked
 * transport (minus a bare mocked fetch round trip).
 *
 *   node --expose-gc src/official-probe.ts <setupModule> <cannedResponseJSON> [budgetMs] [objects]
 *
 * Prints one JSON line.
 */
import { generateKeyPairSync } from "node:crypto";
import { registerHooks } from "node:module";
import { Readable } from "node:stream";
import { queryObjects } from "node:v8";

const [setupPath, cannedJson, budgetArg, objectsArg] = process.argv.slice(2) as [
  string,
  string,
  string?,
  string?,
];
const canned = JSON.parse(cannedJson) as {
  status: number;
  headers: Record<string, string>;
  body: string;
};
const budgetMs = Number(budgetArg ?? 1500);

const gc = (globalThis as { gc?: () => void }).gc!;
const heap = () => {
  gc();
  gc();
  return process.memoryUsage().heapUsed;
};
const objects = () => {
  gc();
  gc();
  return queryObjects(Object, { format: "count" }) as number;
};

// Every request goes to this mock: the canned response, or an OAuth token for
// Google's token endpoint. Nothing reaches the network.
const tokenBody = JSON.stringify({
  access_token: "bench-token",
  expires_in: 3600,
  token_type: "Bearer",
});
const mockFetch = async (url: unknown): Promise<Response> => {
  const u = String(url instanceof Request ? url.url : url);
  if (u.includes("oauth2.googleapis.com/token"))
    return new Response(tokenBody, {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  return new Response(canned.status === 204 ? null : canned.body, {
    status: canned.status,
    headers: canned.headers,
  });
};
globalThis.fetch = mockFetch as typeof fetch;
(globalThis as any).__benchFetch = mockFetch;
// gaxios (Google) uses node-fetch on Node; route it to the mock.
const nodeFetchMock = new URL("./official-node-fetch.ts", import.meta.url).href;
registerHooks({
  resolve: (spec, ctx, next) =>
    spec === "node-fetch" ? { url: nodeFetchMock, shortCircuit: true } : next(spec, ctx),
});

/** AWS SDK v3 request handler backed by the mock. */
const awsHandler = {
  async handle(request: any) {
    const q =
      request.query && Object.keys(request.query).length
        ? `?${new URLSearchParams(request.query)}`
        : "";
    const res = await mockFetch(`${request.protocol}//${request.hostname}${request.path}${q}`);
    const headers: Record<string, string> = {};
    res.headers.forEach((v, k) => (headers[k] = v));
    const body = Buffer.from(await res.arrayBuffer());
    return {
      response: { statusCode: res.status, reason: "", headers, body: Readable.from([body]) },
    };
  },
  updateHttpClientConfig() {},
  httpHandlerConfigs: () => ({}),
  destroy() {},
};

const rsaKey = generateKeyPairSync("rsa", {
  modulusLength: 2048,
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
  publicKeyEncoding: { type: "spki", format: "pem" },
}).privateKey;

const time = async (fn: () => Promise<unknown>) => {
  for (let i = 0; i < 200; i++) await fn();
  const samples: number[] = [];
  const deadline = performance.now() + budgetMs;
  while (samples.length < 20_000 && (samples.length < 200 || performance.now() < deadline)) {
    const t = process.hrtime.bigint();
    await fn();
    samples.push(Number(process.hrtime.bigint() - t));
  }
  samples.sort((a, b) => a - b);
  return samples[samples.length >> 1]! / 1e3;
};

const baseline = await time(() =>
  mockFetch("https://bench.example.com/v1/thing").then((r) => r.text()),
);

const h0 = heap();
const o0 = objectsArg ? objects() : 0;
const t0 = performance.now();
const mod = await import(setupPath);
const importMs = performance.now() - t0;
const h1 = heap();
const o1 = objectsArg ? objects() : 0;

const call = mod.make({ fetch: mockFetch, awsHandler, rsaKey }) as () => Promise<unknown>;
const t1 = performance.now();
let error: string | undefined;
try {
  await call();
} catch (e) {
  error = String(e).slice(0, 300);
}
const firstCallMs = performance.now() - t1;
const h2 = heap();
const o2 = objectsArg ? objects() : 0;

const out: Record<string, unknown> = {
  importMs,
  importHeap: h1 - h0,
  firstCallMs,
  firstCallHeap: h2 - h1,
  ...(objectsArg ? { importObjects: o1 - o0, firstCallObjects: o2 - o1 } : {}),
};
if (error) out.error = error;
else {
  const p50 = await time(call);
  out.p50Us = p50;
  out.baselineP50Us = baseline;
  out.addedP50Us = p50 - baseline;
}
console.log(JSON.stringify(out));
