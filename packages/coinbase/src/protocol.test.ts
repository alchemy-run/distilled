import * as crypto from "node:crypto";
import * as ResponseValidation from "@distilled.cloud/core/response-validation";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { describe, expect, test } from "vitest";
import { type Config, Credentials } from "./credentials.ts";
import {
  AlreadyExists,
  BadRequest,
  CoinbaseParseError,
  InternalServerError,
  NotFound,
  PaymentRequired,
  PolicyViolation,
  TooManyRequests,
  UnknownCoinbaseError,
} from "./errors.ts";
import type { CoinbaseOpContext } from "./protocol.ts";
import * as Retry from "./retry.ts";
import {
  createEvmAccount,
  getEvmAccount,
  getWebhookSubscription,
  listEvmAccounts,
} from "./services/cdp.ts";

const BASE_URL = "https://cdp.test/platform";
const KEY_ID = "organizations/org-1/apiKeys/key-1";

interface Recorded {
  readonly method: string;
  readonly url: string;
  readonly headers: Record<string, string>;
  readonly body: string | undefined;
}

const decoder = new TextDecoder();

const bodyText = (request: HttpClientRequest.HttpClientRequest) =>
  request.body._tag === "Uint8Array" ? decoder.decode(request.body.body) : undefined;

const makeClient = (respond: (request: Recorded) => Response) => {
  const requests: Recorded[] = [];
  const client = HttpClient.make((request) =>
    Effect.sync(() => {
      const recorded: Recorded = {
        method: request.method,
        url: request.url,
        headers: { ...request.headers },
        body: bodyText(request),
      };
      requests.push(recorded);
      return HttpClientResponse.fromWeb(request, respond(recorded));
    }),
  );
  return { client, requests };
};

const ecKeys = crypto.generateKeyPairSync("ec", { namedCurve: "P-256" });
const ecSecret = ecKeys.privateKey.export({ format: "pem", type: "sec1" }).toString();

const edKeys = crypto.generateKeyPairSync("ed25519");
const edJwk = edKeys.privateKey.export({ format: "jwk" });
const edSecret = Buffer.concat([
  Buffer.from(edJwk.d!, "base64url"),
  Buffer.from(edJwk.x!, "base64url"),
]).toString("base64");

const configFor = (overrides: Partial<Config> = {}): Config => ({
  apiKeyId: KEY_ID,
  apiKeySecret: Redacted.make(ecSecret),
  apiBaseUrl: BASE_URL,
  ...overrides,
});

const run = <A, E>(
  operation: Effect.Effect<A, E, CoinbaseOpContext>,
  respond: (request: Recorded) => Response,
  config: Config = configFor(),
) => {
  const { client, requests } = makeClient(respond);
  const result = Effect.runPromise(
    operation.pipe(
      Retry.none,
      Effect.provide(
        Layer.mergeAll(
          Layer.succeed(HttpClient.HttpClient, client),
          Layer.succeed(Credentials, Effect.succeed(config)),
        ),
      ),
    ),
  );
  return { result, requests };
};

const runError = <A, E>(
  operation: Effect.Effect<A, E, CoinbaseOpContext>,
  respond: (request: Recorded) => Response,
) => run(Effect.flip(operation), respond).result;

const json = (value: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(value), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });

const account = { address: "0xabc", name: "test-account" };

const decodeJwt = (authorization: string | undefined) => {
  expect(authorization).toMatch(/^Bearer [\w-]+\.[\w-]+\.[\w-]+$/);
  const token = authorization!.slice("Bearer ".length);
  const [h, p, s] = token.split(".") as [string, string, string];
  return {
    header: JSON.parse(Buffer.from(h, "base64url").toString()),
    payload: JSON.parse(Buffer.from(p, "base64url").toString()),
    signingInput: Buffer.from(`${h}.${p}`),
    signature: Buffer.from(s, "base64url"),
  };
};

describe("JWT bearer authentication", () => {
  test("ES256: header and claims, signature verifies with the public key", async () => {
    const before = Math.floor(Date.now() / 1000);
    const { result, requests } = run(getEvmAccount({ address: "0xabc" }), () => json(account));
    expect(await result).toEqual(account);
    const after = Math.floor(Date.now() / 1000);

    expect(requests).toHaveLength(1);
    expect(requests[0]!.method).toBe("GET");
    expect(requests[0]!.url).toBe(`${BASE_URL}/v2/evm/accounts/0xabc`);
    const jwt = decodeJwt(requests[0]!.headers["authorization"]);
    expect(jwt.header).toEqual({
      alg: "ES256",
      kid: KEY_ID,
      typ: "JWT",
      nonce: expect.stringMatching(/^[0-9a-f]{32}$/),
    });
    expect(jwt.payload).toEqual({
      sub: KEY_ID,
      iss: "cdp",
      aud: ["cdp_service"],
      nbf: expect.any(Number),
      exp: jwt.payload.nbf + 120,
      uri: "GET cdp.test/platform/v2/evm/accounts/0xabc",
    });
    expect(jwt.payload.nbf).toBeGreaterThanOrEqual(before);
    expect(jwt.payload.nbf).toBeLessThanOrEqual(after);

    // JWS ES256 signatures are raw r||s (64 bytes), not DER.
    expect(jwt.signature).toHaveLength(64);
    expect(
      crypto.verify(
        "sha256",
        jwt.signingInput,
        { key: ecKeys.publicKey, dsaEncoding: "ieee-p1363" },
        jwt.signature,
      ),
    ).toBe(true);
    const otherKey = crypto.generateKeyPairSync("ec", { namedCurve: "P-256" }).publicKey;
    expect(
      crypto.verify(
        "sha256",
        jwt.signingInput,
        { key: otherKey, dsaEncoding: "ieee-p1363" },
        jwt.signature,
      ),
    ).toBe(false);
  });

  test("ES256 accepts a PKCS#8 PEM secret too", async () => {
    const pkcs8 = ecKeys.privateKey.export({ format: "pem", type: "pkcs8" }).toString();
    const { result, requests } = run(
      getEvmAccount({ address: "0xabc" }),
      () => json(account),
      configFor({ apiKeySecret: Redacted.make(pkcs8) }),
    );
    await result;
    const jwt = decodeJwt(requests[0]!.headers["authorization"]);
    expect(
      crypto.verify(
        "sha256",
        jwt.signingInput,
        { key: ecKeys.publicKey, dsaEncoding: "ieee-p1363" },
        jwt.signature,
      ),
    ).toBe(true);
  });

  test("EdDSA: a base64 64-byte Ed25519 secret signs with EdDSA", async () => {
    const { result, requests } = run(
      getEvmAccount({ address: "0xabc" }),
      () => json(account),
      configFor({ apiKeySecret: Redacted.make(edSecret) }),
    );
    await result;
    const jwt = decodeJwt(requests[0]!.headers["authorization"]);
    expect(jwt.header.alg).toBe("EdDSA");
    expect(jwt.header.kid).toBe(KEY_ID);
    expect(crypto.verify(null, jwt.signingInput, edKeys.publicKey, jwt.signature)).toBe(true);
  });

  test("the uri claim carries method, host and path but not the query string", async () => {
    const { result, requests } = run(listEvmAccounts({ pageSize: 5, pageToken: "next" }), () =>
      json({ accounts: [account], nextPageToken: "n2" }),
    );
    expect(await result).toEqual({ accounts: [account], nextPageToken: "n2" });
    const url = new URL(requests[0]!.url);
    expect(url.pathname).toBe("/platform/v2/evm/accounts");
    expect(url.searchParams.get("pageSize")).toBe("5");
    expect(url.searchParams.get("pageToken")).toBe("next");
    expect(decodeJwt(requests[0]!.headers["authorization"]).payload.uri).toBe(
      "GET cdp.test/platform/v2/evm/accounts",
    );
  });

  test("a POST signs its method and sends the JSON body", async () => {
    const { result, requests } = run(createEvmAccount({ name: "test-account" }), () =>
      json(account),
    );
    await result;
    expect(requests[0]!.method).toBe("POST");
    expect(JSON.parse(requests[0]!.body!)).toEqual({ name: "test-account" });
    expect(decodeJwt(requests[0]!.headers["authorization"]).payload.uri).toBe(
      "POST cdp.test/platform/v2/evm/accounts",
    );
  });

  test("every request gets a fresh JWT nonce", async () => {
    const { client, requests } = makeClient(() => json(account));
    const layer = Layer.mergeAll(
      Layer.succeed(HttpClient.HttpClient, client),
      Layer.succeed(Credentials, Effect.succeed(configFor())),
    );
    const call = getEvmAccount({ address: "0xabc" }).pipe(Retry.none, Effect.provide(layer));
    await Effect.runPromise(call);
    await Effect.runPromise(call);
    const [a, b] = requests.map((r) => decodeJwt(r.headers["authorization"]).header.nonce);
    expect(a).not.toBe(b);
  });

  test("credentials are resolved per request", async () => {
    let n = 0;
    const { client, requests } = makeClient(() => json(account));
    const layer = Layer.mergeAll(
      Layer.succeed(HttpClient.HttpClient, client),
      Layer.succeed(
        Credentials,
        Effect.sync(() => configFor({ apiKeyId: `key-${++n}` })),
      ),
    );
    const call = getEvmAccount({ address: "0xabc" }).pipe(Retry.none, Effect.provide(layer));
    await Effect.runPromise(call);
    await Effect.runPromise(call);
    expect(requests.map((r) => decodeJwt(r.headers["authorization"]).header.kid)).toEqual([
      "key-1",
      "key-2",
    ]);
  });

  test("no X-Wallet-Auth header is generated, even with a wallet secret", async () => {
    const { result, requests } = run(
      createEvmAccount({ name: "test-account" }),
      () => json(account),
      configFor({ walletSecret: Redacted.make("wallet-secret") }),
    );
    await result;
    expect(requests[0]!.headers["x-wallet-auth"]).toBeUndefined();
  });
});

describe("Response decoding", () => {
  test("sensitive output members are delivered as Redacted", async () => {
    const subscription = {
      createdAt: "2026-01-01T00:00:00Z",
      eventTypes: ["onchain.activity.detected"],
      isEnabled: true,
      secret: "whsec_123",
      subscriptionId: "sub-1",
      target: { url: "https://hooks.test" },
    };
    const { result, requests } = run(getWebhookSubscription({ subscriptionId: "sub-1" }), () =>
      json(subscription),
    );
    const decoded = await result;
    expect(requests[0]!.url).toBe(`${BASE_URL}/v2/data/webhooks/subscriptions/sub-1`);
    expect(Redacted.isRedacted(decoded.secret)).toBe(true);
    expect(Redacted.value(decoded.secret as unknown as Redacted.Redacted<string>)).toBe(
      "whsec_123",
    );
  });

  test("strict mode fails a mismatched payload with CoinbaseParseError", async () => {
    const { client } = makeClient(() => json({ address: 42 }));
    const error = await Effect.runPromise(
      getEvmAccount({ address: "0xabc" }).pipe(
        Retry.none,
        Effect.provide(
          Layer.mergeAll(
            Layer.succeed(HttpClient.HttpClient, client),
            Layer.succeed(Credentials, Effect.succeed(configFor())),
          ),
        ),
        Effect.provide(ResponseValidation.strict),
        Effect.flip,
      ),
    );
    expect(error).toBeInstanceOf(CoinbaseParseError);
  });
});

describe("Error decoding", () => {
  const envelope = (errorType: string, errorMessage = "failed") => ({
    errorType,
    errorMessage,
    correlationId: "corr-1",
    errorLink: `https://docs.cdp.coinbase.com/errors#${errorType}`,
  });
  const call = () => getEvmAccount({ address: "0xabc" });

  test("a Coinbase errorType maps to its typed class with the envelope fields", async () => {
    const error = await runError(call(), () =>
      json(envelope("already_exists", "Account exists."), 409),
    );
    expect(error).toBeInstanceOf(AlreadyExists);
    expect(error).toMatchObject({
      errorType: "already_exists",
      errorMessage: "Account exists.",
      correlationId: "corr-1",
      errorLink: "https://docs.cdp.coinbase.com/errors#already_exists",
    });
  });

  test("errorType takes precedence over the HTTP status", async () => {
    const error = await runError(call(), () => json(envelope("policy_violation"), 400));
    expect(error).toBeInstanceOf(PolicyViolation);
  });

  test("standard errorTypes map to core classes with the message", async () => {
    const notFound = await runError(call(), () => json(envelope("not_found", "No account."), 404));
    expect(notFound).toBeInstanceOf(NotFound);
    expect(notFound).toMatchObject({ message: "No account." });

    const invalid = await runError(call(), () => json(envelope("invalid_request"), 422));
    expect(invalid).toBeInstanceOf(BadRequest);
  });

  test("rate limiting carries the Retry-After hint", async () => {
    const error = await runError(call(), () =>
      json(envelope("rate_limit_exceeded"), 429, { "Retry-After": "7" }),
    );
    expect(error).toBeInstanceOf(TooManyRequests);
    expect(Duration.toSeconds((error as TooManyRequests).retryAfter!)).toBe(7);
  });

  test("an unknown errorType falls back to the HTTP status", async () => {
    const error = await runError(call(), () => json(envelope("brand_new_error", "Huh."), 500));
    expect(error).toBeInstanceOf(InternalServerError);
    expect(error).toMatchObject({ message: "Huh." });
  });

  test("402 maps to PaymentRequired", async () => {
    const error = await runError(call(), () => json(envelope("brand_new_error"), 402));
    expect(error).toBeInstanceOf(PaymentRequired);
    expect(error).toMatchObject({ errorType: "brand_new_error", correlationId: "corr-1" });
  });

  test("an unknown errorType at an unmapped status is UnknownCoinbaseError", async () => {
    const body = envelope("brand_new_error", "Teapot.");
    const error = await runError(call(), () => json(body, 418));
    expect(error).toBeInstanceOf(UnknownCoinbaseError);
    expect(error).toMatchObject({
      errorType: "brand_new_error",
      errorMessage: "Teapot.",
      correlationId: "corr-1",
      body,
    });
  });

  test("a body that is not the Coinbase envelope is UnknownCoinbaseError with the raw body", async () => {
    const plain = await runError(call(), () => new Response("upstream exploded", { status: 500 }));
    expect(plain).toBeInstanceOf(UnknownCoinbaseError);
    expect(plain).toMatchObject({ body: "upstream exploded" });

    const other = await runError(call(), () => json({ message: "nope" }, 404));
    expect(other).toBeInstanceOf(UnknownCoinbaseError);
    expect(other).toMatchObject({ body: { message: "nope" } });
  });

  test("an isValid/success body with an error status is a success value", async () => {
    const { result } = run(call(), () => json({ isValid: false, address: "0xabc" }, 400));
    expect(await result).toEqual({ isValid: false, address: "0xabc" });
  });
});
