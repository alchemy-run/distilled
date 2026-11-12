// Run: node --experimental-strip-types packages/steam/examples/server.ts
// Demonstration only: state disappears on restart and is not shared between workers.
import { createServer } from "node:http";
import { Clock, Effect, Layer, ManagedRuntime, Redacted, Ref } from "effect";
import { AuthenticationStore, SteamOpenId, StoreError, layer } from "../src/index.ts";

const storage = Layer.effect(
  AuthenticationStore,
  Effect.gen(function* () {
    const records = yield* Ref.make({
      transactions: new Map<string, number>(),
      nonces: new Map<string, number>(),
    });
    return AuthenticationStore.of({
      register: (state, expiresAt) =>
        Effect.gen(function* () {
          const now = yield* Clock.currentTimeMillis;
          const inserted = yield* Ref.modify(records, (old) => {
            const transactions = new Map(
              [...old.transactions].filter(([, expiry]) => expiry > now),
            );
            const key = Redacted.value(state);
            if (transactions.has(key)) return [false, old];
            transactions.set(key, expiresAt);
            return [true, { ...old, transactions }];
          });
          if (!inserted) return yield* Effect.fail(new StoreError({}));
        }),
      consume: (input) =>
        Ref.modify(records, (old) => {
          const key = Redacted.value(input.state);
          const nonce = Redacted.value(input.nonce);
          const transactions = new Map(
            [...old.transactions].filter(([, expiry]) => expiry > input.now),
          );
          const nonces = new Map([...old.nonces].filter(([, expiry]) => expiry > input.now));
          if (!transactions.has(key)) return ["transaction", old];
          if (nonces.has(nonce)) return ["replay", old];
          transactions.delete(key);
          nonces.set(nonce, input.nonceExpiresAt);
          return ["accepted", { transactions, nonces }];
        }),
    });
  }),
);

// Fixed trusted origin. Do not substitute request Host or forwarded headers.
const origin = "http://localhost:3000";
const runtime = ManagedRuntime.make(
  layer({
    returnTo: `${origin}/auth/steam/callback`,
    realm: `${origin}/`,
    allowLocalHttp: true,
  }).pipe(Layer.provide(storage)),
);
const cookie = "steam_login";
const cookieOptions = "Path=/auth/steam; HttpOnly; SameSite=Lax";

const server = createServer((request, response) => {
  const handle = Effect.gen(function* () {
    const steam = yield* SteamOpenId;
    const path = request.url?.split("?")[0];
    response.setHeader("Cache-Control", "no-store");
    response.setHeader("Referrer-Policy", "no-referrer");
    if (request.method !== "GET") {
      response.writeHead(405).end();
      return;
    }
    if (path === "/auth/steam") {
      const login = yield* steam.begin();
      response.setHeader(
        "Set-Cookie",
        `${cookie}=${Redacted.value(login.browserState)}; ${cookieOptions}; Max-Age=600`,
      );
      response.writeHead(302, { Location: Redacted.value(login.authenticationUrl) }).end();
      return;
    }
    if (path !== "/auth/steam/callback") {
      response.writeHead(404).end();
      return;
    }
    const cookies = (request.headers.cookie ?? "")
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.startsWith(`${cookie}=`));
    const state = cookies.length === 1 ? (cookies[0]?.slice(cookie.length + 1) ?? "") : "";
    const identity = yield* steam.verify({
      callbackUrl: Redacted.make(`${origin}${request.url}`),
      browserState: Redacted.make(state),
    });
    response.setHeader("Set-Cookie", `${cookie}=; ${cookieOptions}; Max-Age=0`);
    // Application boundary: explicitly create/link the local account and issue its session here.
    // This demo returns identity only and does not create an authenticated application session.
    response.writeHead(200, { "Content-Type": "application/json" }).end(JSON.stringify(identity));
  }).pipe(
    Effect.catchTags({
      SteamAuthenticationError: (error) =>
        Effect.sync(() => {
          const infrastructure = ["transport", "timeout", "entropy"].includes(error.reason);
          if (!infrastructure)
            response.setHeader("Set-Cookie", `${cookie}=; ${cookieOptions}; Max-Age=0`);
          response
            .writeHead(infrastructure ? 503 : 400)
            .end(
              infrastructure
                ? "Steam unavailable; retry shortly"
                : "Login unsuccessful; start again",
            );
        }),
      SteamStoreError: () =>
        Effect.sync(() => {
          response.setHeader("Set-Cookie", `${cookie}=; ${cookieOptions}; Max-Age=0`);
          response.writeHead(503).end("Login storage unavailable; start again");
        }),
    }),
  );
  void runtime.runPromise(handle);
});
server.listen(3000, "127.0.0.1");
process.once("SIGINT", () =>
  server.close(() => {
    void runtime.dispose();
  }),
);
