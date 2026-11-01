import { createPrivateKey } from "node:crypto";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { ConfigError } from "@distilled.cloud/core/errors";
import * as ConfigProvider from "effect/ConfigProvider";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientError from "effect/http/HttpClientError";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import {
  Credentials,
  CredentialsFromEnv,
  DEFAULT_TOKEN_URL,
  fromServiceAccountKey,
  parseServiceAccountKey,
  type ServiceAccountKey,
} from "../src/credentials.ts";
import * as Retry from "../src/retry.ts";
import { getProject } from "../src/services/resource_manager.ts";

//#region fixtures

const RS512 = { name: "RSASSA-PKCS1-v1_5", hash: "SHA-512" } as const;

let keyPair: CryptoKeyPair;
let pkcs8Pem: string;
let pkcs1Pem: string;

const toPem = (label: string, der: ArrayBuffer) => {
  const b64 = Buffer.from(der).toString("base64");
  const lines = b64.match(/.{1,64}/g)!.join("\n");
  return `-----BEGIN ${label}-----\n${lines}\n-----END ${label}-----\n`;
};

beforeAll(async () => {
  keyPair = await crypto.subtle.generateKey(
    { ...RS512, modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]) },
    true,
    ["sign", "verify"],
  );
  pkcs8Pem = toPem("PRIVATE KEY", await crypto.subtle.exportKey("pkcs8", keyPair.privateKey));
  pkcs1Pem = createPrivateKey(pkcs8Pem).export({ type: "pkcs1", format: "pem" }) as string;
});

let counter = 0;
/** A key file's JSON; each call gets a distinct kid so module caches never collide. */
const keyFileJson = (
  credentials: { privateKey?: string | null; tokenEndpoint?: string } = {},
): string => {
  counter += 1;
  const { privateKey = pkcs8Pem.replace(/\n/g, "\\n"), tokenEndpoint } = credentials;
  // `JSON.stringify` of a string holding literal `\n` escapes keeps them
  // escaped, as STACKIT's portal-exported files have them.
  return JSON.stringify({
    id: `key-${counter}`,
    publicKey: "-----BEGIN PUBLIC KEY-----\n...",
    createdAt: "2026-10-01T00:00:00Z",
    validUntil: "2027-10-01T00:00:00Z",
    keyType: "USER_MANAGED",
    keyOrigin: privateKey === null ? "USER_PROVIDED" : "GENERATED",
    keyAlgorithm: "RSA_2048",
    active: true,
    credentials: {
      kid: `kid-${counter}`,
      iss: "sa@sa.stackit.cloud",
      sub: "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
      aud: "https://stackit-service-account-prod.apps.01.cf.eu01.stackit.cloud",
      ...(privateKey === null ? {} : { privateKey }),
      ...(tokenEndpoint ? { tokenEndpoint } : {}),
    },
  });
};

const parse = (json: string) => Effect.runPromise(parseServiceAccountKey(json));

const decodePart = (part: string): Record<string, unknown> =>
  JSON.parse(Buffer.from(part, "base64url").toString("utf8"));

/** An unsigned JWT access token expiring `inSeconds` from now. */
const accessJwt = (inSeconds: number, tag: string) => {
  const exp = Math.floor(Date.now() / 1000) + inSeconds;
  const enc = (v: unknown) => Buffer.from(JSON.stringify(v)).toString("base64url");
  return `${enc({ alg: "RS512", typ: "JWT" })}.${enc({ exp, tag })}.sig`;
};

interface Exchange {
  readonly url: string;
  readonly contentType: string | undefined;
  readonly form: URLSearchParams;
}

/**
 * A stub HttpClient: requests to the token endpoints go through `token`,
 * everything else answers `{}` and records its Authorization header.
 */
const stubHttp = (
  token: (exchange: Exchange, n: number) => Response | Promise<Response>,
  options: { readonly delayMs?: number; readonly networkError?: boolean } = {},
) => {
  const exchanges: Exchange[] = [];
  const apiCalls: { url: string; authorization: string | undefined }[] = [];
  const layer = Layer.succeed(
    HttpClient.HttpClient,
    HttpClient.make((request, url) =>
      Effect.gen(function* () {
        const isApi = url.pathname.includes("/projects/");
        if (isApi) {
          apiCalls.push({ url: url.toString(), authorization: request.headers.authorization });
          return HttpClientResponse.fromWeb(request, new Response("{}", { status: 200 }));
        }
        if (options.networkError) {
          return yield* Effect.fail(
            new HttpClientError.HttpClientError({
              reason: new HttpClientError.TransportError({
                request,
                description: "connection refused",
              }),
            }),
          );
        }
        const body =
          request.body._tag === "Uint8Array" ? new TextDecoder().decode(request.body.body) : "";
        const exchange: Exchange = {
          url: url.toString(),
          contentType: request.headers["content-type"],
          form: new URLSearchParams(body),
        };
        exchanges.push(exchange);
        if (options.delayMs) yield* Effect.sleep(options.delayMs);
        const response = yield* Effect.promise(async () => token(exchange, exchanges.length));
        return HttpClientResponse.fromWeb(request, response);
      }),
    ),
  );
  return { exchanges, apiCalls, layer };
};

const tokenResponse = (accessToken: string, extra: Record<string, unknown> = {}) =>
  new Response(
    JSON.stringify({
      access_token: accessToken,
      refresh_token: "refresh-unused",
      token_type: "Bearer",
      scope: "",
      ...extra,
    }),
    { status: 200, headers: { "content-type": "application/json" } },
  );

const resolveToken = Effect.gen(function* () {
  const resolve = yield* Credentials;
  return yield* resolve;
});

const withEnv = (env: Record<string, string>) =>
  Effect.provideService(ConfigProvider.ConfigProvider, ConfigProvider.fromEnv({ env }));

const runWith = <A, E>(
  effect: Effect.Effect<A, E, Credentials>,
  credentials: Layer.Layer<Credentials, never, HttpClient.HttpClient>,
  http: Layer.Layer<HttpClient.HttpClient>,
  env: Record<string, string> = {},
) =>
  Effect.runPromise(
    effect.pipe(Effect.provide(credentials), Effect.provide(http), withEnv(env)) as Effect.Effect<
      A,
      E
    >,
  );

//#endregion

describe("parseServiceAccountKey", () => {
  test("reads a key file and keeps the private key redacted", async () => {
    const key = await parse(keyFileJson({ tokenEndpoint: "https://tokens.example/token" }));
    expect(key.credentials.kid).toMatch(/^kid-/);
    expect(key.credentials.iss).toBe("sa@sa.stackit.cloud");
    expect(key.credentials.tokenEndpoint).toBe("https://tokens.example/token");
    expect(key.active).toBe(true);
    expect(Redacted.isRedacted(key.credentials.privateKey)).toBe(true);
    expect(String(key.credentials.privateKey)).not.toContain("PRIVATE KEY");
  });

  test("a user-provided key pair has no private key", async () => {
    const key = await parse(keyFileJson({ privateKey: null }));
    expect(key.credentials.privateKey).toBeUndefined();
    expect(key.keyOrigin).toBe("USER_PROVIDED");
  });

  test.each([
    ["not JSON", "{", /not valid JSON/],
    ["a PEM", "-----BEGIN PRIVATE KEY-----\nabc", /got a PEM private key/],
    ["no credentials", JSON.stringify({ id: "k" }), /missing the `credentials` object/],
    [
      "incomplete credentials",
      JSON.stringify({ credentials: { kid: "k", iss: "i" } }),
      /missing `sub`, `aud`/,
    ],
  ])("fails with ConfigError on %s", async (_, json, message) => {
    const error = await Effect.runPromise(Effect.flip(parseServiceAccountKey(json)));
    expect(error).toBeInstanceOf(ConfigError);
    expect(error.message).toMatch(message);
  });
});

describe("fromServiceAccountKey", () => {
  test("signs an RS512 assertion with the key's kid and claims", async () => {
    const key = await parse(keyFileJson());
    const access = accessJwt(3600, "a");
    const http = stubHttp(() => tokenResponse(access));
    const before = Math.floor(Date.now() / 1000);
    const config = await runWith(resolveToken, fromServiceAccountKey({ key }), http.layer);
    expect(Redacted.value(config.token)).toBe(access);
    expect(config.region).toBe("eu01");

    expect(http.exchanges).toHaveLength(1);
    const [exchange] = http.exchanges;
    expect(exchange!.url).toBe(DEFAULT_TOKEN_URL);
    expect(exchange!.contentType).toBe("application/x-www-form-urlencoded");
    expect(exchange!.form.get("grant_type")).toBe("urn:ietf:params:oauth:grant-type:jwt-bearer");
    const assertion = exchange!.form.get("assertion")!;
    const [header, claims, signature] = assertion.split(".");

    expect(decodePart(header!)).toEqual({ alg: "RS512", typ: "JWT", kid: key.credentials.kid });
    const decoded = decodePart(claims!);
    expect(decoded).toMatchObject({
      iss: key.credentials.iss,
      sub: key.credentials.sub,
      aud: key.credentials.aud,
    });
    expect(decoded.jti).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    );
    expect(decoded.iat).toBeGreaterThanOrEqual(before);
    expect(decoded.exp).toBe((decoded.iat as number) + 3600);

    const valid = await crypto.subtle.verify(
      RS512,
      keyPair.publicKey,
      Buffer.from(signature!, "base64url"),
      new TextEncoder().encode(`${header}.${claims}`),
    );
    expect(valid).toBe(true);
  });

  test("accepts a PKCS #1 private key supplied separately", async () => {
    const key = await parse(keyFileJson({ privateKey: null }));
    const http = stubHttp(() => tokenResponse(accessJwt(3600, "pkcs1")));
    await runWith(
      resolveToken,
      fromServiceAccountKey({ key, privateKey: Redacted.make(pkcs1Pem) }),
      http.layer,
    );
    const [header, claims, signature] = http.exchanges[0]!.form.get("assertion")!.split(".");
    const valid = await crypto.subtle.verify(
      RS512,
      keyPair.publicKey,
      Buffer.from(signature!, "base64url"),
      new TextEncoder().encode(`${header}.${claims}`),
    );
    expect(valid).toBe(true);
  });

  test("an operation sends the exchanged access token", async () => {
    const key = await parse(keyFileJson());
    const access = accessJwt(3600, "op");
    const http = stubHttp(() => tokenResponse(access));
    await Effect.runPromise(
      getProject({ id: "11111111-2222-3333-4444-555555555555" }).pipe(
        Retry.none,
        Effect.provide(fromServiceAccountKey({ key })),
        Effect.provide(http.layer),
        withEnv({}),
      ),
    );
    expect(http.apiCalls).toHaveLength(1);
    expect(http.apiCalls[0]!.authorization).toBe(`Bearer ${access}`);
  });

  test("reuses the access token until five minutes before it expires", async () => {
    const key = await parse(keyFileJson());
    const tokens = [accessJwt(4 * 60, "short"), accessJwt(3600, "long")];
    const http = stubHttp((_, n) => tokenResponse(tokens[n - 1] ?? "unexpected"));
    const layer = fromServiceAccountKey({ key });
    const seen = await runWith(
      Effect.all([resolveToken, resolveToken, resolveToken]),
      layer,
      http.layer,
    );
    // The first token is already inside the refresh window, so the second
    // request mints anew; the third reuses the long-lived one.
    expect(seen.map((c) => Redacted.value(c.token))).toEqual([tokens[0], tokens[1], tokens[1]]);
    expect(http.exchanges).toHaveLength(2);
    // A fresh assertion each time (no refresh-token grant).
    expect(http.exchanges.map((e) => e.form.get("grant_type"))).toEqual([
      "urn:ietf:params:oauth:grant-type:jwt-bearer",
      "urn:ietf:params:oauth:grant-type:jwt-bearer",
    ]);
    expect(http.exchanges[0]!.form.get("assertion")).not.toBe(
      http.exchanges[1]!.form.get("assertion"),
    );
  });

  test("the cache is shared across builds of the same layer", async () => {
    const key = await parse(keyFileJson());
    const http = stubHttp(() => tokenResponse(accessJwt(3600, "shared")));
    const layer = fromServiceAccountKey({ key });
    await runWith(resolveToken, layer, http.layer);
    await runWith(resolveToken, layer, http.layer);
    expect(http.exchanges).toHaveLength(1);
  });

  test("falls back to expires_in when the access token is not a JWT", async () => {
    const key = await parse(keyFileJson());
    let n = 0;
    const http = stubHttp(() => tokenResponse(`opaque-${++n}`, { expires_in: 60 }));
    const seen = await runWith(
      Effect.all([resolveToken, resolveToken]),
      fromServiceAccountKey({ key }),
      http.layer,
    );
    // 60s is inside the refresh window: every request mints.
    expect(seen.map((c) => Redacted.value(c.token))).toEqual(["opaque-1", "opaque-2"]);

    const longLived = stubHttp(() => tokenResponse("opaque-long", { expires_in: 3600 }));
    await runWith(
      Effect.all([resolveToken, resolveToken]),
      fromServiceAccountKey({ key }),
      longLived.layer,
    );
    expect(longLived.exchanges).toHaveLength(1);
  });

  test("concurrent requests share one exchange", async () => {
    const key = await parse(keyFileJson());
    const http = stubHttp(() => tokenResponse(accessJwt(3600, "single")), { delayMs: 50 });
    const seen = await runWith(
      Effect.all(
        Array.from({ length: 10 }, () => resolveToken),
        { concurrency: "unbounded" },
      ),
      fromServiceAccountKey({ key }),
      http.layer,
    );
    expect(http.exchanges).toHaveLength(1);
    expect(new Set(seen.map((c) => Redacted.value(c.token))).size).toBe(1);
  });

  describe("token endpoint precedence", () => {
    const urlFor = async (options: {
      tokenUrl?: string;
      keyEndpoint?: string;
      env?: Record<string, string>;
    }) => {
      const key = await parse(keyFileJson({ tokenEndpoint: options.keyEndpoint }));
      const http = stubHttp(() => tokenResponse(accessJwt(3600, "url")));
      await runWith(
        resolveToken,
        fromServiceAccountKey({ key, tokenUrl: options.tokenUrl }),
        http.layer,
        options.env,
      );
      return http.exchanges[0]!.url;
    };
    const env = { STACKIT_TOKEN_BASEURL: "https://env.example/token" };

    test("explicit tokenUrl wins", async () => {
      expect(
        await urlFor({
          tokenUrl: "https://explicit.example/token",
          keyEndpoint: "https://key.example/token",
          env,
        }),
      ).toBe("https://explicit.example/token");
    });
    test("then STACKIT_TOKEN_BASEURL", async () => {
      expect(await urlFor({ keyEndpoint: "https://key.example/token", env })).toBe(
        "https://env.example/token",
      );
    });
    test("then the key's tokenEndpoint", async () => {
      expect(await urlFor({ keyEndpoint: "https://key.example/token" })).toBe(
        "https://key.example/token",
      );
    });
    test("then the default", async () => {
      expect(await urlFor({})).toBe(DEFAULT_TOKEN_URL);
    });
  });

  describe("errors are ConfigError", () => {
    const failWith = async (
      key: ServiceAccountKey,
      http: ReturnType<typeof stubHttp>,
      privateKey?: string,
    ) => {
      const error = await runWith(
        Effect.flip(resolveToken),
        fromServiceAccountKey({
          key,
          privateKey: privateKey === undefined ? undefined : Redacted.make(privateKey),
        }),
        http.layer,
      );
      expect(error).toBeInstanceOf(ConfigError);
      return error;
    };

    test("a rejected exchange carries the endpoint's error", async () => {
      const key = await parse(keyFileJson());
      const http = stubHttp(
        () =>
          new Response(
            JSON.stringify({
              error: "invalid_grant",
              error_description: "Key with kid abc was not found",
            }),
            { status: 400 },
          ),
      );
      const error = await failWith(key, http);
      expect(error.message).toContain("HTTP 400");
      expect(error.message).toContain("invalid_grant: Key with kid abc was not found");
      expect(error.message).toContain("check that the key is valid");
      expect(error.message).not.toContain(http.exchanges[0]!.form.get("assertion")!);
    });

    test("a transport failure", async () => {
      const key = await parse(keyFileJson());
      const error = await failWith(
        key,
        stubHttp(() => tokenResponse("x"), { networkError: true }),
      );
      expect(error.message).toMatch(/STACKIT token exchange at .* failed/);
    });

    test("a response without access_token", async () => {
      const key = await parse(keyFileJson());
      const error = await failWith(
        key,
        stubHttp(() => new Response(JSON.stringify({ token_type: "Bearer" }), { status: 200 })),
      );
      expect(error.message).toContain("no `access_token`");
    });

    test("a key without a private key", async () => {
      const key = await parse(keyFileJson({ privateKey: null }));
      const http = stubHttp(() => tokenResponse("x"));
      const error = await failWith(key, http);
      expect(error.message).toContain("carries no private key");
      expect(http.exchanges).toHaveLength(0);
    });

    test("a private key that is not PEM", async () => {
      const key = await parse(keyFileJson({ privateKey: null }));
      const error = await failWith(
        key,
        stubHttp(() => tokenResponse("x")),
        "not a key",
      );
      expect(error.message).toContain("could not import the private key");
      expect(error.message).not.toContain("not a key");
    });

    test("a failed exchange is retried on the next request", async () => {
      const key = await parse(keyFileJson());
      const access = accessJwt(3600, "retry");
      const http = stubHttp((_, n) =>
        n === 1 ? new Response("upstream down", { status: 503 }) : tokenResponse(access),
      );
      const layer = fromServiceAccountKey({ key });
      const error = await runWith(Effect.flip(resolveToken), layer, http.layer);
      expect(error.message).toContain("HTTP 503: upstream down");
      const config = await runWith(resolveToken, layer, http.layer);
      expect(Redacted.value(config.token)).toBe(access);
    });
  });
});

describe("CredentialsFromEnv", () => {
  let dir: string;
  beforeAll(() => {
    dir = mkdtempSync(join(tmpdir(), "stackit-credentials-"));
  });
  afterAll(() => rmSync(dir, { recursive: true, force: true }));

  const fromEnv = async (env: Record<string, string>, token = accessJwt(3600, "env")) => {
    const http = stubHttp(() => tokenResponse(token));
    const config = await runWith(resolveToken, CredentialsFromEnv, http.layer, env);
    return { config, http };
  };

  test("STACKIT_SERVICE_ACCOUNT_KEY_PATH runs the key flow", async () => {
    const path = join(dir, "key.json");
    writeFileSync(path, keyFileJson());
    const access = accessJwt(3600, "path");
    const { config, http } = await fromEnv(
      {
        STACKIT_SERVICE_ACCOUNT_KEY_PATH: path,
        STACKIT_SERVICE_ACCOUNT_KEY: "{ ignored",
        STACKIT_SERVICE_ACCOUNT_TOKEN: "ignored",
        STACKIT_REGION: "eu02",
      },
      access,
    );
    expect(Redacted.value(config.token)).toBe(access);
    expect(config.region).toBe("eu02");
    expect(http.exchanges).toHaveLength(1);
  });

  test("STACKIT_SERVICE_ACCOUNT_KEY wins over the token and is cached", async () => {
    const env = {
      STACKIT_SERVICE_ACCOUNT_KEY: keyFileJson(),
      STACKIT_SERVICE_ACCOUNT_TOKEN: "ignored",
    };
    const http = stubHttp(() => tokenResponse(accessJwt(3600, "content")));
    await runWith(resolveToken, CredentialsFromEnv, http.layer, env);
    await runWith(resolveToken, CredentialsFromEnv, http.layer, env);
    expect(http.exchanges).toHaveLength(1);
  });

  test("STACKIT_PRIVATE_KEY_PATH / STACKIT_PRIVATE_KEY supply the private key", async () => {
    const keyOnly = keyFileJson({ privateKey: null });
    const pkPath = join(dir, "private.pem");
    writeFileSync(pkPath, pkcs1Pem);
    const viaPath = await fromEnv({
      STACKIT_SERVICE_ACCOUNT_KEY: keyOnly,
      STACKIT_PRIVATE_KEY_PATH: pkPath,
      STACKIT_PRIVATE_KEY: "ignored",
    });
    expect(viaPath.http.exchanges).toHaveLength(1);
    const viaContent = await fromEnv({
      STACKIT_SERVICE_ACCOUNT_KEY: keyOnly,
      STACKIT_PRIVATE_KEY: pkcs8Pem,
    });
    expect(viaContent.http.exchanges).toHaveLength(1);
  });

  test("STACKIT_TOKEN_BASEURL overrides the token endpoint", async () => {
    const { http } = await fromEnv({
      STACKIT_SERVICE_ACCOUNT_KEY: keyFileJson({ tokenEndpoint: "https://key.example/token" }),
      STACKIT_TOKEN_BASEURL: "https://env.example/token",
    });
    expect(http.exchanges[0]!.url).toBe("https://env.example/token");
  });

  test("falls back to STACKIT_SERVICE_ACCOUNT_TOKEN", async () => {
    const { config, http } = await fromEnv({
      STACKIT_SERVICE_ACCOUNT_TOKEN: "legacy-token",
      STACKIT_API_BASE_URL: "https://proxy.example",
    });
    expect(Redacted.value(config.token)).toBe("legacy-token");
    expect(config.apiBaseUrl).toBe("https://proxy.example");
    expect(http.exchanges).toHaveLength(0);
  });

  test("fails with ConfigError when nothing is set", async () => {
    const error = await runWith(
      Effect.flip(resolveToken),
      CredentialsFromEnv,
      stubHttp(() => tokenResponse("x")).layer,
    );
    expect(error).toBeInstanceOf(ConfigError);
    expect(error.message).toContain("STACKIT_SERVICE_ACCOUNT_KEY_PATH");
  });

  test("an unreadable key file is a ConfigError naming the variable", async () => {
    const error = await runWith(
      Effect.flip(resolveToken),
      CredentialsFromEnv,
      stubHttp(() => tokenResponse("x")).layer,
      { STACKIT_SERVICE_ACCOUNT_KEY_PATH: join(dir, "missing.json") },
    );
    expect(error).toBeInstanceOf(ConfigError);
    expect(error.key).toBe("STACKIT_SERVICE_ACCOUNT_KEY_PATH");
  });
});
