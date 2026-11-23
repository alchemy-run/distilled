/**
 * Credential caches shared by the requests of one Worker isolate. A layer
 * built at module scope keeps its cache for every request, so a burst of
 * requests on a cold cache must share one token fetch, and no request may
 * wait on another request's work: workerd cancels a request that waits on
 * nothing of its own ("your Worker's code had hung"), and one request's
 * events never wake another's.
 *
 * Bundles fixtures/credential-cache-worker.mjs from source and runs it with
 * `workerd serve` beside a token Worker that answers after a second.
 */
import { spawn, type ChildProcess } from "node:child_process";
import * as fs from "node:fs";
import * as http from "node:http";
import { createRequire } from "node:module";
import * as net from "node:net";
import * as os from "node:os";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const WORKERD = path.join(
  path.dirname(createRequire(import.meta.url).resolve("workerd/package.json")),
  "bin",
  "workerd",
);

const TOKEN_WORKER = `let n = 0;
const entra = new Map();
export default {
  async fetch(request) {
    const path = new URL(request.url).pathname;
    if (path === "/fast") return new Response("ok");
    if (path === "/hang") return new Promise(() => {});
    if (path.startsWith("/count/")) return new Response(String(entra.get(path.slice(7)) ?? 0));
    const tenant = path.match(/^\\/([^/]+)\\/oauth2\\/v2\\.0\\/token$/)?.[1];
    if (tenant !== undefined) {
      const count = (entra.get(tenant) ?? 0) + 1;
      entra.set(tenant, count);
      if (tenant.endsWith("hang") && count === 1) return new Promise(() => {});
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const key = "key-" + ++n;
    return tenant === undefined
      ? new Response(key)
      : Response.json({ access_token: key, expires_in: 3600, token_type: "Bearer" });
  },
};
`;

const config = (port: number) => `using Workerd = import "/workerd/workerd.capnp";

const config :Workerd.Config = (
  services = [ (name = "main", worker = .main), (name = "token", worker = .token) ],
  sockets = [ (name = "http", address = "127.0.0.1:${port}", http = (), service = "main") ],
);

const main :Workerd.Worker = (
  modules = [ (name = "main.mjs", esModule = embed "main.mjs") ],
  compatibilityDate = "2026-10-01",
  globalOutbound = "token",
);

const token :Workerd.Worker = (
  modules = [ (name = "token.mjs", esModule = embed "token.mjs") ],
  compatibilityDate = "2026-10-01",
);
`;

const freePort = () =>
  new Promise<number>((resolve, reject) => {
    const server = net.createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address() as net.AddressInfo;
      server.close(() => resolve(port));
    });
  });

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let dir: string;
let port: number;
let workerd: ChildProcess;

/** GET a path; `dropAfter` closes the connection that many ms in. */
const get = (urlPath: string, dropAfter?: number) =>
  new Promise<{ status: number; body: string }>((resolve) => {
    const request = http.get({ host: "127.0.0.1", port, path: urlPath, agent: false }, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => resolve({ status: res.statusCode ?? 0, body }));
    });
    request.on("error", (e) => resolve({ status: 0, body: e.message }));
    request.setTimeout(10_000, () => request.destroy(new Error("no answer in 10 s")));
    if (dropAfter !== undefined) setTimeout(() => request.destroy(), dropAfter);
  });

beforeAll(async () => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), "distilled-credential-cache-"));
  const { build } = await import("esbuild");
  await build({
    entryPoints: [path.join(import.meta.dirname, "../fixtures/credential-cache-worker.mjs")],
    outfile: path.join(dir, "main.mjs"),
    bundle: true,
    format: "esm",
    platform: "browser",
    // `bun` resolves the workspace packages to their source.
    conditions: ["bun", "workerd", "worker", "browser"],
    external: ["node:*", "cloudflare:*"],
    logLevel: "silent",
  });
  fs.writeFileSync(path.join(dir, "token.mjs"), TOKEN_WORKER);
  port = await freePort();
  fs.writeFileSync(path.join(dir, "config.capnp"), config(port));
  workerd = spawn(WORKERD, ["serve", "config.capnp"], { cwd: dir, stdio: "ignore" });
  for (let i = 0; i < 100; i++) {
    if ((await get("/aws/ready")).status === 200) return;
    await sleep(100);
  }
  throw new Error("workerd did not start");
});

afterAll(() => {
  workerd?.kill();
  if (dir) fs.rmSync(dir, { recursive: true, force: true });
});

const served = /^token=(key-\d+) own=ok fetches=\d+$/;

describe.each(["core", "aws", "gcp", "azure", "graph"])("%s", (cache) => {
  it("shares one token fetch between requests that arrive together", async () => {
    const responses = await Promise.all(Array.from({ length: 5 }, () => get(`/${cache}/together`)));
    for (const r of responses) expect(r).toMatchObject({ status: 200, body: served });
    expect(new Set(responses.map((r) => r.body)).size).toBe(1);
    expect(responses[0]!.body).toMatch(/fetches=1$/);
  });

  it("serves the next request when the one refreshing is dropped", async () => {
    const dropped = get(`/${cache}/dropped`, 200);
    await sleep(300);
    expect(await get(`/${cache}/dropped`)).toMatchObject({ status: 200, body: served });
    await dropped;
    expect(await get(`/${cache}/dropped`)).toMatchObject({ status: 200, body: served });
  });

  it("serves the next request when a refresh never answers", async () => {
    const dropped = get(`/${cache}/hang`, 200);
    await sleep(300);
    expect(await get(`/${cache}/hang`)).toMatchObject({ status: 200, body: served });
    await dropped;
  });
});
