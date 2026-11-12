import { Effect, Exit, Fiber, Layer, Redacted, Ref } from "effect";
import { FetchHttpClient } from "effect/http";
import { TestClock } from "effect/testing";
import { describe, expect, it } from "vitest";
import { AuthenticationStore, SteamOpenId, StoreError, layer } from "../src/index.ts";

const instant = "2026-11-12T00:00:00Z";
const run = (program: Effect.Effect<unknown, unknown>) =>
  Effect.runPromise(
    Effect.gen(function* () {
      yield* TestClock.setTime(Date.parse(instant));
      yield* program;
    }).pipe(Effect.provide(TestClock.layer())),
  );

const ns = "http://specs.openid.net/auth/2.0";
const endpoint = "https://steamcommunity.com/openid/login";
const id = "76561197960287930";
const claimed = `https://steamcommunity.com/openid/id/${id}`;
const xrds = `<?xml version="1.0"?><xrds:XRDS xmlns:xrds="xri://$xrds" xmlns="xri://$xrd*($v*2.0)"><XRD><Service priority="0"><Type>${ns}/signon</Type><URI>${endpoint}</URI></Service></XRD></xrds:XRDS>`;
const config = {
  returnTo: "https://app.example/auth/steam?intent=login",
  realm: "https://app.example/",
};

// Deliberately process-local test fixture. Ref.modify supplies one atomic transition.
const setup = (
  options: {
    verification?: string;
    discovery?: string;
    networkFailure?: boolean;
    hanging?: boolean;
    storeFailure?: boolean;
  } = {},
) =>
  Effect.gen(function* () {
    const state = yield* Ref.make({
      transactions: new Map<string, number>(),
      nonces: new Map<string, number>(),
    });
    const requests: Array<{ url: string; init: RequestInit | undefined }> = [];
    const store = AuthenticationStore.of({
      register: (key, expiry) =>
        Ref.update(state, (s) => ({
          ...s,
          transactions: new Map(s.transactions).set(Redacted.value(key), expiry),
        })),
      consume: (input) =>
        options.storeFailure
          ? Effect.fail(new StoreError({}))
          : Ref.modify(state, (s) => {
              const key = Redacted.value(input.state);
              const nonce = Redacted.value(input.nonce);
              if ((s.transactions.get(key) ?? 0) <= input.now) return ["transaction", s];
              if ((s.nonces.get(nonce) ?? 0) > input.now) return ["replay", s];
              const transactions = new Map(s.transactions);
              transactions.delete(key);
              return [
                "accepted",
                { transactions, nonces: new Map(s.nonces).set(nonce, input.nonceExpiresAt) },
              ];
            }),
    });
    const fetcher: typeof fetch = async (input, init) => {
      const url = String(input);
      requests.push({ url, init });
      if (options.networkFailure) throw new Error("simulated transport failure");
      if (options.hanging)
        return new Promise((_resolve, reject) =>
          init?.signal?.addEventListener("abort", () => reject(new Error("aborted"))),
        );
      return new Response(
        url === claimed
          ? (options.discovery ?? xrds)
          : (options.verification ?? `ns:${ns}\nis_valid:true\n`),
      );
    };
    const live = layer(config).pipe(
      Layer.provide(Layer.succeed(AuthenticationStore, store)),
      Layer.provide(Layer.succeed(FetchHttpClient.Fetch, fetcher)),
    );
    return { live, requests };
  });

const assertion = (url: Redacted.Redacted<string>, overrides: Record<string, string> = {}) => {
  const redirect = new URL(Redacted.value(url));
  const callback = new URL(redirect.searchParams.get("openid.return_to") ?? "");
  for (const [key, value] of Object.entries({
    ns,
    mode: "id_res",
    op_endpoint: endpoint,
    claimed_id: claimed,
    identity: claimed,
    return_to: callback.href,
    response_nonce: `${instant}unique`,
    assoc_handle: "handle",
    signed: "op_endpoint,claimed_id,identity,return_to,response_nonce,assoc_handle",
    sig: "secret-signature",
    ...overrides,
  }))
    callback.searchParams.set(`openid.${key}`, value);
  return Redacted.make(callback.href);
};

describe("Steam OpenID", () => {
  it("times out with a controllable clock and preserves storage failures", async () => {
    await run(
      Effect.gen(function* () {
        const fixture = yield* setup({ hanging: true });
        yield* Effect.gen(function* () {
          const steam = yield* SteamOpenId;
          const login = yield* steam.begin();
          const fiber = yield* steam
            .verify({
              callbackUrl: assertion(login.authenticationUrl),
              browserState: login.browserState,
            })
            .pipe(Effect.flip, Effect.forkChild);
          yield* TestClock.adjust("11 seconds");
          expect(yield* Fiber.join(fiber)).toMatchObject({ reason: "timeout" });
        }).pipe(Effect.provide(fixture.live));
        const brokenStore = yield* setup({ storeFailure: true });
        yield* Effect.gen(function* () {
          const steam = yield* SteamOpenId;
          const login = yield* steam.begin();
          expect(
            yield* steam
              .verify({
                callbackUrl: assertion(login.authenticationUrl),
                browserState: login.browserState,
              })
              .pipe(Effect.flip),
          ).toBeInstanceOf(StoreError);
        }).pipe(Effect.provide(brokenStore.live));
      }),
    );
  });

  it("rejects replay with a fresh transaction and expires unused transactions", async () => {
    await run(
      Effect.gen(function* () {
        const fixture = yield* setup();
        yield* Effect.gen(function* () {
          const steam = yield* SteamOpenId;
          const first = yield* steam.begin();
          yield* steam.verify({
            callbackUrl: assertion(first.authenticationUrl),
            browserState: first.browserState,
          });
          const second = yield* steam.begin();
          expect(
            yield* steam
              .verify({
                callbackUrl: assertion(second.authenticationUrl),
                browserState: second.browserState,
              })
              .pipe(Effect.flip),
          ).toMatchObject({ reason: "replay" });
          yield* TestClock.adjust("11 minutes");
          const nonce = "2026-11-12T00:11:00Zfresh";
          expect(
            yield* steam
              .verify({
                callbackUrl: assertion(second.authenticationUrl, { response_nonce: nonce }),
                browserState: second.browserState,
              })
              .pipe(Effect.flip),
          ).toMatchObject({ reason: "transaction" });
        }).pipe(Effect.provide(fixture.live));
      }),
    );
  });

  it("builds a redirect, discovers identity, verifies signed values, and prevents concurrent reuse", async () => {
    await run(
      Effect.gen(function* () {
        const fixture = yield* setup();
        yield* Effect.gen(function* () {
          const steam = yield* SteamOpenId;
          const login = yield* steam.begin();
          const redirect = new URL(Redacted.value(login.authenticationUrl));
          expect(redirect.searchParams.get("openid.claimed_id")).toBe(`${ns}/identifier_select`);
          const callbackUrl = assertion(login.authenticationUrl);
          const results = yield* Effect.all(
            [
              steam.verify({ callbackUrl, browserState: login.browserState }).pipe(Effect.exit),
              steam.verify({ callbackUrl, browserState: login.browserState }).pipe(Effect.exit),
            ],
            { concurrency: "unbounded" },
          );
          expect(results.filter(Exit.isSuccess)).toHaveLength(1);
          const success = results.find(Exit.isSuccess);
          expect(success?.value).toEqual({ steamId: id, claimedId: claimed });
          for (const request of fixture.requests) expect(request.init?.redirect).toBe("error");
          const post = fixture.requests.find((r) => r.url === endpoint);
          const body = new URLSearchParams(String(post?.init?.body));
          expect(body.get("openid.mode")).toBe("check_authentication");
          expect(body.get("openid.sig")).toBe("secret-signature");
        }).pipe(Effect.provide(fixture.live));
      }),
    );
  });

  it.each([
    [{ mode: "cancel" }, "cancelled"],
    [{ mode: "error" }, "provider"],
    [{ identity: `${claimed}1` }, "identity"],
    [{ op_endpoint: "https://evil.example" }, "identity"],
    [{ return_to: "https://evil.example" }, "returnTo"],
    [{ signed: "identity" }, "malformed"],
    [{ response_nonce: "2000-01-01T00:00:00Zold" }, "expired"],
    [{ response_nonce: "2099-01-01T00:00:00Zfuture" }, "expired"],
  ])("rejects assertion tampering %j", async (overrides, reason) => {
    await run(
      Effect.gen(function* () {
        const fixture = yield* setup();
        yield* Effect.gen(function* () {
          const steam = yield* SteamOpenId;
          const login = yield* steam.begin();
          const result = yield* steam
            .verify({
              callbackUrl: assertion(login.authenticationUrl, overrides),
              browserState: login.browserState,
            })
            .pipe(Effect.flip);
          expect(result).toMatchObject({ reason });
          expect(fixture.requests).toHaveLength(0);
        }).pipe(Effect.provide(fixture.live));
      }),
    );
  });

  it.each([
    [{ verification: `ns:${ns}\nis_valid:false\n` }, "rejected"],
    [{ verification: `ns:${ns}\nis_valid:true\nis_valid:false\n` }, "malformed"],
    [{ verification: "is_valid:true\n" }, "malformed"],
    [{ discovery: xrds.replace(endpoint, "https://evil.example") }, "discovery"],
    [{ networkFailure: true }, "transport"],
  ])("fails closed on provider and infrastructure failures %j", async (options, reason) => {
    await run(
      Effect.gen(function* () {
        const fixture = yield* setup(options);
        yield* Effect.gen(function* () {
          const steam = yield* SteamOpenId;
          const login = yield* steam.begin();
          const error = yield* steam
            .verify({
              callbackUrl: assertion(login.authenticationUrl),
              browserState: login.browserState,
            })
            .pipe(Effect.flip);
          expect(error).toMatchObject({ reason });
        }).pipe(Effect.provide(fixture.live));
      }),
    );
  });

  it("rejects duplicate parameters and absent browser binding", async () => {
    await run(
      Effect.gen(function* () {
        const fixture = yield* setup();
        yield* Effect.gen(function* () {
          const steam = yield* SteamOpenId;
          const login = yield* steam.begin();
          const callback = assertion(login.authenticationUrl);
          const duplicate = Redacted.make(`${Redacted.value(callback)}&openid.mode=id_res`);
          expect(
            yield* steam
              .verify({ callbackUrl: duplicate, browserState: login.browserState })
              .pipe(Effect.flip),
          ).toMatchObject({ reason: "malformed" });
          expect(
            yield* steam
              .verify({ callbackUrl: callback, browserState: Redacted.make("") })
              .pipe(Effect.flip),
          ).toMatchObject({ reason: "transaction" });
        }).pipe(Effect.provide(fixture.live));
      }),
    );
  });
});
