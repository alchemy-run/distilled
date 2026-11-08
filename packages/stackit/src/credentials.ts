/**
 * STACKIT credentials -- hand-written.
 *
 * The `Credentials` service resolves `{ token, region }` per request; the
 * protocol layer formats the `Authorization: Bearer <token>` header from it
 * and rewrites each operation's spec `servers` URL for the region.
 *
 * Three ways to get the token; the key flow and a ready-made token match the
 * official Go SDK (`stackit-sdk-go/core/auth` and `core/clients/key_flow.go`):
 *
 *   * **Service-account key flow** (the supported one). A key file created
 *     for a service account holds `credentials.{kid, iss, sub, aud}` and,
 *     for STACKIT-generated key pairs, the RSA `privateKey`. The SDK signs a
 *     one-hour RS512 assertion JWT with it and exchanges that at the token
 *     endpoint (`grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer`)
 *     for a short-lived access token. The access token is cached and a new
 *     assertion is minted five minutes before it expires (refresh tokens are
 *     deprecated upstream and never used); concurrent requests share one
 *     exchange. Signing uses WebCrypto, so it runs on Node, Bun, Workers and
 *     Lambda. See {@link fromServiceAccountKey}.
 *   * **A server's attached service account** -- {@link fromServerMetadata}, for
 *     code running on a STACKIT server: no key, just the metadata API.
 *   * **A ready-made access token** -- {@link credentials} or
 *     `STACKIT_SERVICE_ACCOUNT_TOKEN`. STACKIT has retired long-lived
 *     service-account access tokens; this remains for tokens minted
 *     elsewhere.
 *
 * {@link CredentialsFromEnv} reads, in order: `STACKIT_SERVICE_ACCOUNT_KEY_PATH`
 * (a key file) or `STACKIT_SERVICE_ACCOUNT_KEY` (its JSON), with the private
 * key overridden by `STACKIT_PRIVATE_KEY_PATH` / `STACKIT_PRIVATE_KEY`; else
 * `STACKIT_SERVICE_ACCOUNT_TOKEN`. `STACKIT_TOKEN_BASEURL` overrides the
 * token endpoint (full URL), ahead of the key's `credentials.tokenEndpoint`
 * and the default `https://service-account.api.stackit.cloud/token`.
 * Token exchange failures surface on the operation as `ConfigError`.
 *
 * Each STACKIT product has its own host (`iaas.api.stackit.cloud`,
 * `secrets-manager.api.{region}stackit.cloud`, ...). The per-operation host is
 * baked into the generated `T.Http` trait from the OpenAPI `servers` entry;
 * `region` (default `eu01`) fills a `{region}` placeholder at request time, and
 * hosts without one are global. An explicit `apiBaseUrl` overrides that host
 * for every call -- a proxy, not a per-product map.
 */
import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Clock from "effect/Clock";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";
import * as Schedule from "effect/Schedule";
import { makeRefreshGate } from "./refresh-gate.ts";

/** STACKIT's primary public region (Schwarz IT / Germany). */
export const DEFAULT_REGION = "eu01";

/** The service-account token endpoint the Go SDK defaults to. */
export const DEFAULT_TOKEN_URL = "https://service-account.api.stackit.cloud/token";

/** Mint a new access token this long before the cached one expires. */
export const REFRESH_WINDOW_MS = 5 * 60 * 1000;

export interface Config {
  readonly token: Redacted.Redacted<string>;
  /**
   * Region filling a `{region}` placeholder in a product host (`eu01` ->
   * `https://secrets-manager.api.eu01.stackit.cloud`). Hosts without one are
   * global and stay unchanged; `"global"` drops the placeholder.
   */
  readonly region: string;
  /** When set, every operation uses this host instead of the spec's. */
  readonly apiBaseUrl?: string;
}

export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
    "StackitCredentials",
  ) {}

//#region Service-account key

/** The `credentials` object of a STACKIT service-account key file. */
export interface ServiceAccountKeyCredentials {
  /** Key id, sent as the assertion's `kid` header. */
  readonly kid: string;
  /** Assertion issuer (the service account's email). */
  readonly iss: string;
  /** Assertion subject (the service account's id). */
  readonly sub: string;
  /** Assertion audience. */
  readonly aud: string;
  /**
   * The RSA private key (PEM, PKCS #8 or PKCS #1). Present only for key
   * pairs STACKIT generated; a key created from a user-provided public key
   * has none, and the private key must be supplied separately.
   */
  readonly privateKey?: Redacted.Redacted<string>;
  /** Token endpoint the key was issued for. */
  readonly tokenEndpoint?: string;
}

/**
 * A STACKIT service-account key file, as `stackit service-account key
 * create` or the portal writes it. Parse one with
 * {@link parseServiceAccountKey}; the private key is kept redacted.
 */
export interface ServiceAccountKey {
  readonly id?: string;
  readonly publicKey?: string;
  readonly createdAt?: string;
  readonly validUntil?: string;
  readonly keyType?: string;
  readonly keyOrigin?: string;
  readonly keyAlgorithm?: string;
  readonly active?: boolean;
  readonly credentials: ServiceAccountKeyCredentials;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const optionalString = (record: Record<string, unknown>, name: string): string | undefined =>
  typeof record[name] === "string" ? (record[name] as string) : undefined;

const keyError = (message: string, key?: string) =>
  new ConfigError({ message: `STACKIT service-account key: ${message}`, key });

const decodeServiceAccountKey = (
  json: string,
  source?: string,
): Effect.Effect<ServiceAccountKey, ConfigError> =>
  Effect.suspend(() => {
    let parsed: unknown;
    try {
      parsed = JSON.parse(json);
    } catch {
      // The cause can quote key material, so it is not attached.
      return Effect.fail(
        keyError(
          json.trimStart().startsWith("-----BEGIN")
            ? "expected the key file's JSON, got a PEM private key (pass that as the private key instead)"
            : "not valid JSON",
          source,
        ),
      );
    }
    if (!isRecord(parsed)) return Effect.fail(keyError("expected a JSON object", source));
    const credentials = parsed.credentials;
    if (!isRecord(credentials)) {
      return Effect.fail(keyError("missing the `credentials` object", source));
    }
    const missing = ["kid", "iss", "sub", "aud"].filter(
      (name) => typeof credentials[name] !== "string" || credentials[name] === "",
    );
    if (missing.length > 0) {
      return Effect.fail(
        keyError(`\`credentials\` is missing ${missing.map((m) => `\`${m}\``).join(", ")}`, source),
      );
    }
    const privateKey = optionalString(credentials, "privateKey");
    const tokenEndpoint = optionalString(credentials, "tokenEndpoint");
    return Effect.succeed<ServiceAccountKey>({
      id: optionalString(parsed, "id"),
      publicKey: optionalString(parsed, "publicKey"),
      createdAt: optionalString(parsed, "createdAt"),
      validUntil: optionalString(parsed, "validUntil"),
      keyType: optionalString(parsed, "keyType"),
      keyOrigin: optionalString(parsed, "keyOrigin"),
      keyAlgorithm: optionalString(parsed, "keyAlgorithm"),
      active: typeof parsed.active === "boolean" ? parsed.active : undefined,
      credentials: {
        kid: credentials.kid as string,
        iss: credentials.iss as string,
        sub: credentials.sub as string,
        aud: credentials.aud as string,
        privateKey: privateKey ? Redacted.make(privateKey) : undefined,
        tokenEndpoint: tokenEndpoint || undefined,
      },
    });
  });

/**
 * Parse a service-account key file's JSON. Fails with `ConfigError` when it
 * is not JSON or lacks `credentials.{kid, iss, sub, aud}`.
 */
export const parseServiceAccountKey = (
  json: string,
): Effect.Effect<ServiceAccountKey, ConfigError> => decodeServiceAccountKey(json);

//#endregion

//#region Assertion signing (WebCrypto)

const encoder = /*@__PURE__*/ new TextEncoder();

const base64url = (input: Uint8Array | string): string => {
  const bytes = typeof input === "string" ? encoder.encode(input) : input;
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

const base64Decode = (input: string): Uint8Array => {
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
  return Uint8Array.from(atob(padded), (c) => c.charCodeAt(0));
};

/** DER length octets. */
const derLength = (n: number): number[] =>
  n < 0x80
    ? [n]
    : n < 0x100
      ? [0x81, n]
      : n < 0x10000
        ? [0x82, n >> 8, n & 0xff]
        : [0x83, n >> 16, (n >> 8) & 0xff, n & 0xff];

/** `AlgorithmIdentifier { rsaEncryption, NULL }`. */
const RSA_ALGORITHM_ID = [
  0x30, 0x0d, 0x06, 0x09, 0x2a, 0x86, 0x48, 0x86, 0xf7, 0x0d, 0x01, 0x01, 0x01, 0x05, 0x00,
];

/** Wrap a PKCS #1 `RSAPrivateKey` into a PKCS #8 `PrivateKeyInfo`. */
const pkcs1ToPkcs8 = (pkcs1: Uint8Array): Uint8Array => {
  const head = [0x02, 0x01, 0x00, ...RSA_ALGORITHM_ID, 0x04, ...derLength(pkcs1.length)];
  const prefix = [0x30, ...derLength(head.length + pkcs1.length), ...head];
  const out = new Uint8Array(prefix.length + pkcs1.length);
  out.set(prefix, 0);
  out.set(pkcs1, prefix.length);
  return out;
};

/** PKCS #8 DER from a PEM (PKCS #8 or PKCS #1; literal `\n` escapes allowed). */
const pemToPkcs8 = (pem: string): Uint8Array | undefined => {
  const text = pem.replace(/\\n/g, "\n");
  const match = /-----BEGIN (RSA )?PRIVATE KEY-----([\s\S]*?)-----END \1?PRIVATE KEY-----/.exec(
    text,
  );
  if (!match) return undefined;
  const der = base64Decode(match[2]!.replace(/\s+/g, ""));
  return match[1] ? pkcs1ToPkcs8(der) : der;
};

const RS512 = { name: "RSASSA-PKCS1-v1_5", hash: "SHA-512" } as const;

const importSigningKey = (
  privateKey: Redacted.Redacted<string>,
  keyName: string,
): Effect.Effect<CryptoKey, ConfigError> =>
  Effect.tryPromise({
    try: async () => {
      const der = pemToPkcs8(Redacted.value(privateKey));
      if (!der) throw new Error("not a PEM private key");
      return crypto.subtle.importKey("pkcs8", der as Uint8Array<ArrayBuffer>, RS512, false, [
        "sign",
      ]);
    },
    // The cause can quote key material, so it is not attached.
    catch: () =>
      keyError(
        `could not import the private key of ${keyName}; it must be an RSA key in PEM form (BEGIN PRIVATE KEY or BEGIN RSA PRIVATE KEY)`,
      ),
  });

/** Sign the assertion JWT the token endpoint exchanges for an access token. */
const signAssertion = (
  signingKey: CryptoKey,
  key: ServiceAccountKey,
  nowMs: number,
  jti: string,
): Effect.Effect<string, ConfigError> =>
  Effect.tryPromise({
    try: async () => {
      const { kid, iss, sub, aud } = key.credentials;
      const iat = Math.floor(nowMs / 1000);
      const header = { alg: "RS512", typ: "JWT", kid };
      const claims = { iss, sub, aud, jti, iat, exp: iat + 3600 };
      const signingInput = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(claims))}`;
      const signature = await crypto.subtle.sign(RS512, signingKey, encoder.encode(signingInput));
      return `${signingInput}.${base64url(new Uint8Array(signature))}`;
    },
    catch: () => keyError(`could not sign the assertion for ${key.credentials.iss}`),
  });

/** A JWT's `exp` in epoch milliseconds, read without verifying it. */
const jwtExpiry = (jwt: string): number | undefined => {
  try {
    const payload = JSON.parse(new TextDecoder().decode(base64Decode(jwt.split(".")[1] ?? "")));
    return isRecord(payload) && typeof payload.exp === "number" ? payload.exp * 1000 : undefined;
  } catch {
    return undefined;
  }
};

//#endregion

//#region Token exchange

interface CachedToken {
  readonly token: Redacted.Redacted<string>;
  /** Epoch milliseconds. */
  readonly expiresAt: number;
}

interface KeyFlowOptions {
  readonly key: ServiceAccountKey;
  /** Overrides `key.credentials.privateKey`. */
  readonly privateKey?: Redacted.Redacted<string>;
  /** Resolved before each exchange. */
  readonly tokenUrl: Effect.Effect<string, ConfigError>;
}

const truncate = (text: string, max = 300) =>
  text.length > max ? `${text.slice(0, max)}...` : text;

/** The OAuth error from a token endpoint response body, for the message. */
const describeTokenError = (text: string): string => {
  try {
    const body: unknown = JSON.parse(text);
    if (isRecord(body)) {
      const parts = [body.error, body.error_description, body.message].filter(
        (p): p is string => typeof p === "string" && p !== "",
      );
      if (parts.length > 0) return truncate(parts.join(": "));
    }
  } catch {
    // not JSON -- fall through to the raw body
  }
  return truncate(text.trim());
};

/**
 * The key flow: an access token, minted from the key when the cached one is
 * within {@link REFRESH_WINDOW_MS} of expiry. One exchange at a time; requests
 * that arrive during it wait and reuse its token. See `refresh-gate.ts` for why
 * that isn't a semaphore.
 */
const makeKeyFlow = (
  options: KeyFlowOptions,
): Effect.Effect<Redacted.Redacted<string>, ConfigError, HttpClient.HttpClient> => {
  const withClaim = makeRefreshGate();
  const keyName = options.key.id ?? options.key.credentials.kid;
  let cached: CachedToken | undefined;
  let signingKey: CryptoKey | undefined;

  const resolveSigningKey = Effect.suspend(() => {
    if (signingKey) return Effect.succeed(signingKey);
    const privateKey = options.privateKey ?? options.key.credentials.privateKey;
    if (!privateKey) {
      return Effect.fail(
        keyError(
          `${keyName} carries no private key (a user-provided key pair); supply the private key explicitly`,
        ),
      );
    }
    return importSigningKey(privateKey, keyName).pipe(
      Effect.tap((imported) =>
        Effect.sync(() => {
          signingKey = imported;
        }),
      ),
    );
  });

  const exchange = Effect.gen(function* () {
    const client = yield* HttpClient.HttpClient;
    const tokenUrl = yield* options.tokenUrl;
    const cryptoKey = yield* resolveSigningKey;
    const issuedAt = yield* Clock.currentTimeMillis;
    const jti = yield* Effect.sync(() => crypto.randomUUID());
    const assertion = yield* signAssertion(cryptoKey, options.key, issuedAt, jti);
    const step = `STACKIT token exchange at ${tokenUrl}`;

    const response = yield* client
      .execute(
        HttpClientRequest.post(tokenUrl).pipe(
          HttpClientRequest.acceptJson,
          HttpClientRequest.bodyUrlParams({
            grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
            assertion,
          }),
        ),
      )
      .pipe(
        Effect.mapError(
          (error) => new ConfigError({ message: `${step} failed: ${error.message}` }),
        ),
      );
    const text = yield* response.text.pipe(
      Effect.mapError((error) => new ConfigError({ message: `${step} failed: ${error.message}` })),
    );
    if (response.status < 200 || response.status >= 300) {
      const detail = describeTokenError(text);
      const hint = /Key with kid .*? was not found/.test(text)
        ? " (check that the key is valid and the token endpoint is right for it)"
        : "";
      return yield* Effect.fail(
        new ConfigError({
          message: `${step} failed with HTTP ${response.status}: ${detail}${hint}`,
        }),
      );
    }

    let body: unknown;
    try {
      body = JSON.parse(text);
    } catch {
      return yield* Effect.fail(new ConfigError({ message: `${step} returned a non-JSON body` }));
    }
    if (!isRecord(body) || typeof body.access_token !== "string" || body.access_token === "") {
      return yield* Effect.fail(
        new ConfigError({ message: `${step} returned no \`access_token\`` }),
      );
    }
    const accessToken = body.access_token;
    // STACKIT access tokens are JWTs: their `exp` is authoritative (the Go
    // SDK reads only that). `expires_in` is the fallback; with neither, the
    // token is not reused.
    const expiresAt =
      jwtExpiry(accessToken) ??
      (typeof body.expires_in === "number" ? issuedAt + body.expires_in * 1000 : issuedAt);
    return { token: Redacted.make(accessToken), expiresAt } satisfies CachedToken;
  });

  const fresh = (now: number) => cached !== undefined && now < cached.expiresAt - REFRESH_WINDOW_MS;

  const fromCache = <E, R>(
    orElse: Effect.Effect<Redacted.Redacted<string>, E, R>,
  ): Effect.Effect<Redacted.Redacted<string>, E, R> =>
    Effect.flatMap(Clock.currentTimeMillis, (now) =>
      fresh(now) ? Effect.succeed(cached!.token) : orElse,
    );

  return fromCache(
    withClaim(
      fromCache(
        exchange.pipe(
          Effect.map((token) => {
            cached = token;
            return token.token;
          }),
        ),
      ),
    ),
  );
};

/** The token endpoint: `STACKIT_TOKEN_BASEURL` > the key's > the default. */
const tokenUrlFromEnv = (key: ServiceAccountKey): Effect.Effect<string, ConfigError> =>
  EffectConfig.option(EffectConfig.String("STACKIT_TOKEN_BASEURL")).pipe(
    Effect.mapError(
      () =>
        new ConfigError({
          message: "Could not read STACKIT_TOKEN_BASEURL",
          key: "STACKIT_TOKEN_BASEURL",
        }),
    ),
    Effect.map(
      (env) =>
        Option.getOrUndefined(Option.filter(env, (url) => url !== "")) ??
        key.credentials.tokenEndpoint ??
        DEFAULT_TOKEN_URL,
    ),
  );

/**
 * Credentials from a service-account key: each request uses a cached access
 * token, exchanged for a fresh one five minutes before it expires. The layer
 * does no I/O; a failed exchange surfaces on the operation as `ConfigError`.
 *
 * The token endpoint is `tokenUrl`, else `STACKIT_TOKEN_BASEURL`, else the
 * key's `credentials.tokenEndpoint`, else
 * `https://service-account.api.stackit.cloud/token`. `privateKey` overrides
 * the key's embedded one and is required for user-provided key pairs.
 *
 * The token cache belongs to the returned layer value, so build it once and
 * share it rather than calling this per request.
 */
export const fromServiceAccountKey = (config: {
  readonly key: ServiceAccountKey;
  readonly privateKey?: Redacted.Redacted<string>;
  readonly region?: string;
  readonly apiBaseUrl?: string;
  readonly tokenUrl?: string;
}): Layer.Layer<Credentials, never, HttpClient.HttpClient> => {
  const flow = makeKeyFlow({
    key: config.key,
    privateKey: config.privateKey,
    tokenUrl:
      config.tokenUrl !== undefined && config.tokenUrl !== ""
        ? Effect.succeed(config.tokenUrl)
        : tokenUrlFromEnv(config.key),
  });
  const region = config.region ?? DEFAULT_REGION;
  return Layer.effect(
    Credentials,
    Effect.gen(function* () {
      const client = yield* HttpClient.HttpClient;
      return flow.pipe(
        Effect.provideService(HttpClient.HttpClient, client),
        Effect.map((token): Config => ({ token, region, apiBaseUrl: config.apiBaseUrl })),
      );
    }),
  );
};

//#endregion

//#region Server metadata

/**
 * The metadata API's list of a server's service accounts. It answers only from
 * inside a STACKIT server.
 */
export const SERVER_METADATA_URL = "http://169.254.169.254/stackit/v1/service-accounts";

/** STACKIT documents metadata requests taking up to 30 seconds. */
const METADATA_ATTEMPT_TIMEOUT = "35 seconds";

const metadataError = (detail: string) =>
  new ConfigError({ message: `STACKIT server metadata API: ${detail}` });

/** A JSON object from the metadata API. A failure never quotes the body: it can hold a token. */
const getMetadataObject = (
  url: string,
): Effect.Effect<Record<string, unknown>, ConfigError, HttpClient.HttpClient> =>
  Effect.gen(function* () {
    const client = yield* HttpClient.HttpClient;
    const response = yield* client
      .execute(HttpClientRequest.get(url).pipe(HttpClientRequest.acceptJson))
      .pipe(
        Effect.mapError((error) => metadataError(`request failed: ${error.message}`)),
        Effect.timeoutOrElse({
          duration: METADATA_ATTEMPT_TIMEOUT,
          orElse: () => Effect.fail(metadataError(`no answer within ${METADATA_ATTEMPT_TIMEOUT}`)),
        }),
      );
    if (response.status !== 200) {
      return yield* Effect.fail(metadataError(`answered with HTTP ${response.status}`));
    }
    const text = yield* response.text.pipe(
      Effect.mapError((error) => metadataError(`reading the answer failed: ${error.message}`)),
    );
    let body: unknown;
    try {
      body = JSON.parse(text);
    } catch {
      return yield* Effect.fail(metadataError("the answer is not JSON"));
    }
    if (!isRecord(body)) return yield* Effect.fail(metadataError("the answer is not an object"));
    return body;
  }).pipe(Effect.retry({ schedule: Schedule.spaced("1 second"), times: 2 }));

/**
 * Credentials of a service account attached to the STACKIT server this process
 * runs on: `GET /stackit/v1/service-accounts/{mail}/token` on the metadata API,
 * which answers `{ "token": "..." }`. No key is stored on the server.
 *
 * Without `serviceAccountEmail`, the first account in the server's list is used.
 * STACKIT documents these tokens as short-lived without saying how short: a token
 * is reused until five minutes before the `exp` it carries, and one without a
 * readable `exp` isn't reused. The layer does no I/O; a failure surfaces on the
 * operation as `ConfigError`. Requires an attachment
 * (`addServiceAccountToServer`, or `serviceAccountMails` at creation).
 *
 * @see https://docs.stackit.cloud/products/iaas-api/how-tos/use-service-accounts-via-the-iaas-api/
 */
export const fromServerMetadata = (
  config: {
    readonly serviceAccountEmail?: string;
    readonly region?: string;
    readonly apiBaseUrl?: string;
    readonly metadataUrl?: string;
  } = {},
): Layer.Layer<Credentials, never, HttpClient.HttpClient> => {
  const metadataUrl = config.metadataUrl ?? SERVER_METADATA_URL;
  const region = config.region ?? DEFAULT_REGION;
  // A caller waits at most this long for a refresh another one is running.
  const withClaim = makeRefreshGate({ claimBudgetMs: 2 * 40_000 });
  let email = config.serviceAccountEmail;
  let cached: CachedToken | undefined;

  const resolveEmail = Effect.suspend(() =>
    email !== undefined
      ? Effect.succeed(email)
      : getMetadataObject(metadataUrl).pipe(
          Effect.flatMap((body) => {
            const mails = body.serviceAccountMails;
            const first = Array.isArray(mails) ? mails[0] : undefined;
            if (typeof first !== "string" || first === "") {
              return Effect.fail(metadataError("no service account is attached to this server"));
            }
            email = first;
            return Effect.succeed(first);
          }),
        ),
  );

  const fetchToken = resolveEmail.pipe(
    Effect.flatMap((mail) => getMetadataObject(`${metadataUrl}/${encodeURIComponent(mail)}/token`)),
    Effect.flatMap((body) => {
      const token = body.token;
      if (typeof token !== "string" || token === "") {
        return Effect.fail(metadataError("the answer holds no `token`"));
      }
      return Clock.currentTimeMillis.pipe(
        Effect.map((now) => {
          cached = { token: Redacted.make(token), expiresAt: jwtExpiry(token) ?? now };
          return cached.token;
        }),
      );
    }),
  );

  const fromCache = <E, R>(orElse: Effect.Effect<Redacted.Redacted<string>, E, R>) =>
    Effect.flatMap(Clock.currentTimeMillis, (now) =>
      cached !== undefined && now < cached.expiresAt - REFRESH_WINDOW_MS
        ? Effect.succeed(cached.token)
        : orElse,
    );

  const token = fromCache(withClaim(fromCache(fetchToken)));

  return Layer.effect(
    Credentials,
    Effect.gen(function* () {
      const client = yield* HttpClient.HttpClient;
      return token.pipe(
        Effect.provideService(HttpClient.HttpClient, client),
        Effect.map((value): Config => ({ token: value, region, apiBaseUrl: config.apiBaseUrl })),
      );
    }),
  );
};

//#endregion

//#region Environment

const envConfig = /*@__PURE__*/ EffectConfig.all({
  // The variables the official Go SDK, CLI and Terraform provider read.
  keyPath: /*@__PURE__*/ EffectConfig.option(
    /*@__PURE__*/ EffectConfig.String("STACKIT_SERVICE_ACCOUNT_KEY_PATH"),
  ),
  key: /*@__PURE__*/ EffectConfig.option(
    /*@__PURE__*/ EffectConfig.String("STACKIT_SERVICE_ACCOUNT_KEY"),
  ),
  privateKeyPath: /*@__PURE__*/ EffectConfig.option(
    /*@__PURE__*/ EffectConfig.String("STACKIT_PRIVATE_KEY_PATH"),
  ),
  privateKey: /*@__PURE__*/ EffectConfig.option(
    /*@__PURE__*/ EffectConfig.String("STACKIT_PRIVATE_KEY"),
  ),
  token: /*@__PURE__*/ EffectConfig.option(
    /*@__PURE__*/ EffectConfig.String("STACKIT_SERVICE_ACCOUNT_TOKEN"),
  ),
  region: /*@__PURE__*/ EffectConfig.String("STACKIT_REGION").pipe(
    /*@__PURE__*/ EffectConfig.withDefault(DEFAULT_REGION),
  ),
  apiBaseUrl: /*@__PURE__*/ EffectConfig.option(
    /*@__PURE__*/ EffectConfig.String("STACKIT_API_BASE_URL"),
  ),
});

const nonEmpty = (value: Option.Option<string>): string | undefined => {
  const v = Option.getOrUndefined(value);
  return v === undefined || v === "" ? undefined : v;
};

interface NodeFsPromises {
  readonly readFile: (path: string, encoding: "utf8") => Promise<string>;
}

/**
 * Read a file named by environment variable `env`: through the fiber's
 * `FileSystem` when one is provided, else `node:fs` where the runtime has it.
 */
const readEnvFile = (path: string, env: string): Effect.Effect<string, ConfigError> => {
  const failed = () => new ConfigError({ message: `Could not read ${env} file ${path}`, key: env });
  return Effect.flatMap(Effect.serviceOption(FileSystem.FileSystem), (fs) => {
    if (Option.isSome(fs)) return Effect.mapError(fs.value.readFileString(path), failed);
    const nodeFs = (
      globalThis as { process?: { getBuiltinModule?: (id: string) => unknown } }
    ).process?.getBuiltinModule?.("node:fs/promises") as NodeFsPromises | undefined;
    if (!nodeFs) {
      return Effect.fail(
        new ConfigError({
          message: `${env} needs a file system; provide a FileSystem layer or set the file's contents instead`,
          key: env,
        }),
      );
    }
    return Effect.tryPromise({ try: () => nodeFs.readFile(path, "utf8"), catch: failed });
  });
};

/** Run with the fiber's `HttpClient` (an operation always has one), else `fetch`. */
const withHttpClient = <A, E>(
  effect: Effect.Effect<A, E, HttpClient.HttpClient>,
): Effect.Effect<A, E> =>
  Effect.flatMap(Effect.serviceOption(HttpClient.HttpClient), (client) =>
    Option.isSome(client)
      ? Effect.provideService(effect, HttpClient.HttpClient, client.value)
      : Effect.provide(effect, FetchHttpClient.layer),
  );

type EnvValues = Effect.Success<typeof envConfig>;

// The key flow built from the environment, shared by every build of
// `CredentialsFromEnv` (like the Go SDK's process-wide client) and rebuilt
// when the key variables change.
let envFlow:
  | {
      readonly fingerprint: string;
      readonly flow: Effect.Effect<Redacted.Redacted<string>, ConfigError, HttpClient.HttpClient>;
    }
  | undefined;

const keyFlowFromEnv = (env: EnvValues) => {
  const keyPath = nonEmpty(env.keyPath);
  const keyJson = nonEmpty(env.key);
  const privateKeyPath = nonEmpty(env.privateKeyPath);
  const privateKey = nonEmpty(env.privateKey);
  const fingerprint = JSON.stringify([
    keyPath,
    keyPath ? undefined : keyJson,
    privateKeyPath,
    privateKey,
  ]);
  const build = Effect.gen(function* () {
    const json =
      keyPath !== undefined
        ? yield* readEnvFile(keyPath, "STACKIT_SERVICE_ACCOUNT_KEY_PATH")
        : keyJson!;
    const key = yield* decodeServiceAccountKey(
      json,
      keyPath !== undefined ? "STACKIT_SERVICE_ACCOUNT_KEY_PATH" : "STACKIT_SERVICE_ACCOUNT_KEY",
    );
    const explicitPrivateKey =
      privateKeyPath !== undefined
        ? yield* readEnvFile(privateKeyPath, "STACKIT_PRIVATE_KEY_PATH")
        : privateKey;
    const flow = makeKeyFlow({
      key,
      privateKey: explicitPrivateKey !== undefined ? Redacted.make(explicitPrivateKey) : undefined,
      tokenUrl: tokenUrlFromEnv(key),
    });
    envFlow = { fingerprint, flow };
    return flow;
  });
  // Concurrent first requests may each build a flow, and the last one stays:
  // parsing a key is cheap, and at most it costs a token exchange more.
  return Effect.suspend(() =>
    envFlow?.fingerprint === fingerprint ? Effect.succeed(envFlow.flow) : build,
  );
};

const missingCredentials = () =>
  new ConfigError({
    message:
      "STACKIT credentials are required: set STACKIT_SERVICE_ACCOUNT_KEY_PATH (or STACKIT_SERVICE_ACCOUNT_KEY), or STACKIT_SERVICE_ACCOUNT_TOKEN",
    key: "STACKIT_SERVICE_ACCOUNT_KEY_PATH",
  });

// A plain chain rather than `Effect.gen`: the token path runs on every
// request and stays a synchronous read of the environment.
const resolveFromEnv: Effect.Effect<Config, ConfigError> = /*@__PURE__*/ envConfig.pipe(
  /*@__PURE__*/ Effect.mapError(
    () => new ConfigError({ message: "Could not read the STACKIT environment" }),
  ),
  /*@__PURE__*/ Effect.flatMap((env): Effect.Effect<Config, ConfigError> => {
    const region = env.region;
    const apiBaseUrl = Option.getOrUndefined(env.apiBaseUrl);
    if (nonEmpty(env.keyPath) !== undefined || nonEmpty(env.key) !== undefined) {
      return keyFlowFromEnv(env).pipe(
        Effect.flatMap(withHttpClient),
        Effect.map((token) => ({ token, region, apiBaseUrl })),
      );
    }
    const token = nonEmpty(env.token);
    return token !== undefined
      ? Effect.succeed({ token: Redacted.make(token), region, apiBaseUrl })
      : Effect.fail(missingCredentials());
  }),
);

/**
 * Credentials from the environment: the service-account key flow when
 * `STACKIT_SERVICE_ACCOUNT_KEY_PATH` or `STACKIT_SERVICE_ACCOUNT_KEY` is set
 * (private key overridable with `STACKIT_PRIVATE_KEY_PATH` /
 * `STACKIT_PRIVATE_KEY`, token endpoint with `STACKIT_TOKEN_BASEURL`), else
 * `STACKIT_SERVICE_ACCOUNT_TOKEN`. `STACKIT_REGION` (default `eu01`) and
 * `STACKIT_API_BASE_URL` apply to both. Read per request, so a provided
 * `ConfigProvider` is honored. The key flow uses the operation's
 * `HttpClient` and, for `*_PATH` variables, a provided `FileSystem` or
 * `node:fs`.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = /*@__PURE__*/ Layer.succeed(
  Credentials,
  resolveFromEnv,
);

//#endregion

/** Convenience layer from a redacted token + optional region / base URL. */
export const credentials = (config: {
  readonly token: Redacted.Redacted<string>;
  readonly region?: string;
  readonly apiBaseUrl?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      token: config.token,
      region: config.region ?? DEFAULT_REGION,
      apiBaseUrl: config.apiBaseUrl,
    }),
  );

//#region Harbor (Container Registry data plane)

/**
 * Harbor's REST API prefix. The version is a path segment, so it belongs to
 * the base URL: `registry_harbor` operations carry prefix-less routes.
 */
export const HARBOR_API_PATH = "/api/v2.0";

/**
 * The Harbor API root for a registry URL: a bare host gets `https://`, any
 * path is dropped, and {@link HARBOR_API_PATH} is appended. STACKIT's API
 * reports a project's `url`; Harbor serves its API at the host's root.
 */
export const harborApiBaseUrl = (registryUrl: string): string => {
  const withScheme = /^https?:\/\//.test(registryUrl) ? registryUrl : `https://${registryUrl}`;
  return `${new URL(withScheme).origin}${HARBOR_API_PATH}`;
};

export interface HarborConfig {
  /** Basic-auth user: a robot account (`robot$...`) or a Harbor username. */
  readonly username: string;
  /** Basic-auth password: a robot's secret, or a user's CLI secret. */
  readonly secret: Redacted.Redacted<string>;
  /** Fully-qualified API root, e.g. `https://registry.onstackit.cloud/api/v2.0`. */
  readonly apiBaseUrl: string;
}

/**
 * What `registry_harbor` operations sign with. Harbor doesn't accept STACKIT
 * access tokens as far as anyone has documented, so this is its own service
 * rather than {@link Credentials}.
 */
export class HarborCredentials
  extends /*@__PURE__*/ Context.Service<
    HarborCredentials,
    Effect.Effect<HarborConfig, ConfigError>
  >()("StackitHarborCredentials") {}

/** The `HarborCredentials` value for one registry and one Basic-auth identity. */
export const harborCredentialsOf = (config: {
  readonly registryUrl: string;
  readonly username: string;
  readonly secret: Redacted.Redacted<string>;
}): Effect.Effect<HarborConfig, ConfigError> =>
  Effect.try({
    try: (): HarborConfig => ({
      username: config.username,
      secret: config.secret,
      apiBaseUrl: harborApiBaseUrl(config.registryUrl),
    }),
    catch: () => new ConfigError({ message: `Not a Harbor registry URL: ${config.registryUrl}` }),
  });

/** Layer form of {@link harborCredentialsOf}. */
export const harborCredentials = (config: {
  readonly registryUrl: string;
  readonly username: string;
  readonly secret: Redacted.Redacted<string>;
}): Layer.Layer<HarborCredentials> => Layer.succeed(HarborCredentials, harborCredentialsOf(config));

//#endregion

//#region Cloud Foundry (`scf` data plane)

export interface CloudFoundryConfig {
  /** A platform's `apiUrl`, e.g. `https://api.system.01.cf.eu01.stackit.cloud`. */
  readonly apiUrl: string;
  /** A UAA access token, sent as `Authorization: Bearer`. */
  readonly token: Redacted.Redacted<string>;
}

/**
 * What `cloud_foundry` operations sign with: the Cloud Controller takes UAA access tokens rather
 * than STACKIT ones, so this is its own service rather than {@link Credentials}.
 * `@distilled.cloud/stackit/CloudFoundry` builds it from a user's name and password.
 */
export class CloudFoundryCredentials
  extends /*@__PURE__*/ Context.Service<
    CloudFoundryCredentials,
    Effect.Effect<CloudFoundryConfig, ConfigError>
  >()("StackitCloudFoundryCredentials") {}

/**
 * The URL `cloud_foundry`'s discovery and login go to. They have no token to sign with, so they
 * read this service instead of {@link CloudFoundryCredentials}.
 */
export class CloudFoundryEndpoint
  extends /*@__PURE__*/ Context.Service<CloudFoundryEndpoint, string>()(
    "StackitCloudFoundryEndpoint",
  ) {}

//#endregion

//#region Vault (Secrets Manager data plane)

export interface VaultConfig {
  /** A Secrets Manager instance's `apiUrl`, e.g. `https://prod.sm.eu01.stackit.cloud`. */
  readonly apiUrl: string;
  /** A client token from a Vault login, sent as `X-Vault-Token`. */
  readonly token: Redacted.Redacted<string>;
}

/**
 * What `secrets_manager_kv` operations sign with: Vault takes its own client
 * tokens, not STACKIT access tokens, so this is its own service rather than
 * {@link Credentials}. `@distilled.cloud/stackit/Vault` builds it from an AppRole
 * or a user.
 */
export class VaultCredentials
  extends /*@__PURE__*/ Context.Service<
    VaultCredentials,
    Effect.Effect<VaultConfig, ConfigError>
  >()("StackitVaultCredentials") {}

/**
 * The instance URL a Vault login goes to. Logins have no token to sign with, so
 * they read this service instead of {@link VaultCredentials}.
 */
export class VaultEndpoint
  extends /*@__PURE__*/ Context.Service<VaultEndpoint, string>()("StackitVaultEndpoint") {}

//#endregion

//#region RabbitMQ management API (RabbitMQ data plane)

export interface RabbitMQManagementConfig {
  /** Root the API's `/api/...` routes hang off, with no user or password in it. */
  readonly apiUrl: string;
  /** Basic-auth user: a credential's `username`. */
  readonly username: string;
  /** Basic-auth password: a credential's `password`. */
  readonly password: Redacted.Redacted<string>;
}

/**
 * What `rabbitmq_management` operations sign with: the broker takes the Basic auth
 * of a `rabbitmq` credential, not a STACKIT access token, so this is its own service
 * rather than {@link Credentials}.
 */
export class RabbitMQManagementCredentials
  extends /*@__PURE__*/ Context.Service<
    RabbitMQManagementCredentials,
    Effect.Effect<RabbitMQManagementConfig, ConfigError>
  >()("StackitRabbitMQManagementCredentials") {}

/**
 * The API root for a credential's `http_api_uri`: a bare host gets `https://`, any
 * user and password are dropped, and so is a trailing `/api`, because the operations'
 * routes carry it. Returns `undefined` for something that isn't a URL.
 */
export const rabbitmqManagementApiUrl = (httpApiUri: string): string | undefined => {
  const withScheme = /^https?:\/\//.test(httpApiUri) ? httpApiUri : `https://${httpApiUri}`;
  if (!URL.canParse(withScheme)) return undefined;
  const url = new URL(withScheme);
  return `${url.origin}${url.pathname.replace(/\/+$/, "").replace(/\/api$/, "")}`;
};

/**
 * The `RabbitMQManagementCredentials` value for one credential. The URI can hold the
 * password, so a failure doesn't quote it.
 */
export const rabbitmqManagementCredentialsOf = (config: {
  readonly httpApiUri: string;
  readonly username: string;
  readonly password: Redacted.Redacted<string>;
}): Effect.Effect<RabbitMQManagementConfig, ConfigError> => {
  const apiUrl = rabbitmqManagementApiUrl(config.httpApiUri);
  return apiUrl === undefined
    ? Effect.fail(new ConfigError({ message: "A RabbitMQ credential's http_api_uri is not a URL" }))
    : Effect.succeed({ apiUrl, username: config.username, password: config.password });
};

//#endregion

//#region Grafana Loki API (Logs data plane)

export interface LokiConfig {
  /** Root of the instance's API: its `datasourceUrl`, with no trailing slash. */
  readonly apiUrl: string;
  /** The instance's access token, sent as `Authorization: Bearer`. */
  readonly token: Redacted.Redacted<string>;
}

/**
 * What `logs_loki` operations sign with: a Logs instance takes one of its own access
 * tokens, not a STACKIT access token, so this is its own service rather than
 * {@link Credentials}. An Observability instance's Loki takes a credential's HTTP Basic
 * instead: see {@link observabilityDataCredentialsOf}.
 */
export class LokiCredentials
  extends /*@__PURE__*/ Context.Service<
    LokiCredentials,
    Effect.Effect<LokiConfig | ObservabilityDataConfig, ConfigError>
  >()("StackitLokiCredentials") {}

/**
 * The `LokiCredentials` value for one access token on one instance. A token the API no
 * longer returns, on an adopted resource, fails here rather than on the wire.
 */
export const lokiCredentialsOf = (config: {
  readonly datasourceUrl: string;
  readonly token: Redacted.Redacted<string> | undefined;
}): Effect.Effect<LokiConfig, ConfigError> => {
  const withScheme = /^https?:\/\//.test(config.datasourceUrl)
    ? config.datasourceUrl
    : `https://${config.datasourceUrl}`;
  if (!URL.canParse(withScheme)) {
    return Effect.fail(
      new ConfigError({ message: "A Logs instance's datasourceUrl is not a URL" }),
    );
  }
  if (config.token === undefined) {
    return Effect.fail(
      new ConfigError({ message: "This Logs access token has no known value: create a new one" }),
    );
  }
  const url = new URL(withScheme);
  return Effect.succeed({
    apiUrl: `${url.origin}${url.pathname.replace(/\/+$/, "")}`,
    token: config.token,
  });
};

//#endregion

//#region Alertmanager, Prometheus and Loki APIs (Observability data plane)

export interface ObservabilityDataConfig {
  /** Root of one of the instance's APIs, with no trailing slash. */
  readonly apiUrl: string;
  /** The `username` of an Observability credential, sent as HTTP Basic. */
  readonly username: string;
  /** The `password` of an Observability credential. */
  readonly password: Redacted.Redacted<string>;
}

/**
 * What `observability_alertmanager` and `observability_prometheus` operations sign with:
 * an Observability instance takes one of its own credentials, not a STACKIT access token,
 * so this is its own service rather than {@link Credentials}.
 */
export class ObservabilityDataCredentials
  extends /*@__PURE__*/ Context.Service<
    ObservabilityDataCredentials,
    Effect.Effect<ObservabilityDataConfig, ConfigError>
  >()("StackitObservabilityDataCredentials") {}

/**
 * The credentials for one Observability credential on one of an instance's URLs. Whichever
 * of its URLs is given, this keeps the root: STACKIT documents `logsPushUrl` as ending in
 * `/loki/api/v1/push`, and the generated routes already carry their API's path. A credential
 * whose password a crash lost fails here rather than on the wire. A failure doesn't quote
 * the URL.
 */
export const observabilityDataCredentialsOf = (config: {
  readonly url: string;
  readonly username: string;
  readonly password: Redacted.Redacted<string> | undefined;
}): Effect.Effect<ObservabilityDataConfig, ConfigError> => {
  const withScheme = /^https?:\/\//.test(config.url) ? config.url : `https://${config.url}`;
  if (!URL.canParse(withScheme)) {
    return Effect.fail(
      new ConfigError({ message: "An Observability instance's URL is not a URL" }),
    );
  }
  if (config.password === undefined) {
    return Effect.fail(
      new ConfigError({ message: "This Observability credential has no known password" }),
    );
  }
  const url = new URL(withScheme);
  const root = url.pathname.replace(/\/(?:loki\/)?api\/v\d+(?:\/.*)?$/, "").replace(/\/+$/, "");
  return Effect.succeed({
    apiUrl: `${url.origin}${root}`,
    username: config.username,
    password: config.password,
  });
};

//#endregion

//#region Forgejo REST API (STACKIT Git data plane)

/** How a call signs in to a Git instance's Forgejo API. */
export type ForgejoAuth =
  | {
      /** A Forgejo access token, sent as `Authorization: token <token>`. */
      readonly token: Redacted.Redacted<string>;
    }
  | {
      /** A Forgejo user, for HTTP Basic. */
      readonly username: string;
      /** That user's password. */
      readonly password: Redacted.Redacted<string>;
    };

/** One identity on one Git instance. */
export type ForgejoConfig = ForgejoAuth & {
  /** Root of the REST API, `<instance url>/api/v1`. */
  readonly apiUrl: string;
};

/**
 * What `git_forgejo` operations sign with: an instance's Forgejo takes its own users and
 * tokens, not a STACKIT access token, so this is its own service rather than
 * {@link Credentials}. `@distilled.cloud/stackit/Forgejo` builds the value.
 */
export class ForgejoCredentials
  extends /*@__PURE__*/ Context.Service<
    ForgejoCredentials,
    Effect.Effect<ForgejoConfig, ConfigError>
  >()("StackitForgejoCredentials") {}

//#endregion

//#region Dremio REST API (Dremio data plane)

export interface DremioConfig {
  /** Root of the REST API, an instance's `endpoints.ui` without a trailing slash. */
  readonly apiUrl: string;
  /** A token from a Dremio login, or a personal access token, sent as a Bearer token. */
  readonly token: Redacted.Redacted<string>;
}

/**
 * What `dremio_rest` operations sign with: Dremio takes its own tokens, not a STACKIT
 * access token, so this is its own service rather than {@link Credentials}.
 * `@distilled.cloud/stackit/Dremio` builds it from a user's password.
 */
export class DremioCredentials
  extends /*@__PURE__*/ Context.Service<
    DremioCredentials,
    Effect.Effect<DremioConfig, ConfigError>
  >()("StackitDremioCredentials") {}

/**
 * The instance URL a Dremio login goes to. A login has no token to sign with, so it
 * reads this service instead of {@link DremioCredentials}.
 */
export class DremioEndpoint
  extends /*@__PURE__*/ Context.Service<DremioEndpoint, string>()("StackitDremioEndpoint") {}

//#endregion

//#region Apache Airflow REST API (STACKIT Workflows data plane)

export interface WorkflowsAirflowConfig {
  /** Root of the REST API, an instance's `endpoints.url` without a trailing slash. */
  readonly apiUrl: string;
  /** The session from the instance's session endpoint, as a `Cookie` header's value. */
  readonly cookie: Redacted.Redacted<string>;
}

/**
 * What `workflows_airflow` operations sign with: an instance's Airflow takes a session
 * cookie from its session endpoint, not a STACKIT access token, so this is its own service
 * rather than {@link Credentials}. `@distilled.cloud/stackit/WorkflowsAirflow` builds it.
 */
export class WorkflowsAirflowCredentials
  extends /*@__PURE__*/ Context.Service<
    WorkflowsAirflowCredentials,
    Effect.Effect<WorkflowsAirflowConfig, ConfigError>
  >()("StackitWorkflowsAirflowCredentials") {}

//#endregion

//#region OpenSearch REST API (OpenSearch and LogMe data plane)

export interface OpenSearchConfig {
  /** Root of the REST API, with no user or password in it. */
  readonly apiUrl: string;
  /** Basic-auth user: a credential's `username`. */
  readonly username: string;
  /** Basic-auth password: a credential's `password`. */
  readonly password: Redacted.Redacted<string>;
}

/**
 * What `opensearch_data` operations sign with: an instance takes the Basic auth of an
 * `opensearch` or `logme` credential, not a STACKIT access token, so this is its own
 * service rather than {@link Credentials}.
 */
export class OpenSearchCredentials
  extends /*@__PURE__*/ Context.Service<
    OpenSearchCredentials,
    Effect.Effect<OpenSearchConfig, ConfigError>
  >()("StackitOpenSearchCredentials") {}

//#endregion

//#region AI Model Serving inference API (`model_serving` data plane)

export interface ModelServingInferenceConfig {
  /** Root of the API, without the `/v1` the routes carry. */
  readonly apiUrl: string;
  /** A `model_serving` auth token, sent as `Authorization: Bearer`. */
  readonly token: Redacted.Redacted<string>;
}

/**
 * What `model_serving_inference` operations sign with: a `model_serving` auth token, not a
 * STACKIT access token, so this is its own service rather than {@link Credentials}.
 */
export class ModelServingInferenceCredentials
  extends /*@__PURE__*/ Context.Service<
    ModelServingInferenceCredentials,
    Effect.Effect<ModelServingInferenceConfig, ConfigError>
  >()("StackitModelServingInferenceCredentials") {}

/**
 * The inference API's root in a region. STACKIT documents it for `eu01`; the same shape in another
 * region is an inference from the host's name. Returns `undefined` for a region that isn't one
 * DNS label, which could otherwise point the token at another server.
 */
export const modelServingInferenceApiUrl = (region: string): string | undefined =>
  /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(region)
    ? `https://api.openai-compat.model-serving.${region}.onstackit.cloud`
    : undefined;

/**
 * The `ModelServingInferenceCredentials` value for one auth token. A token Alchemy holds no value
 * for, on an adopted resource, fails here rather than on the wire.
 */
export const modelServingInferenceCredentialsOf = (config: {
  readonly region: string;
  readonly token: Redacted.Redacted<string> | undefined;
}): Effect.Effect<ModelServingInferenceConfig, ConfigError> => {
  const apiUrl = modelServingInferenceApiUrl(config.region);
  if (apiUrl === undefined) {
    return Effect.fail(new ConfigError({ message: "A model serving region is not a DNS label" }));
  }
  if (config.token === undefined) {
    return Effect.fail(
      new ConfigError({ message: "This model serving token has no known value: create a new one" }),
    );
  }
  return Effect.succeed({ apiUrl, token: config.token });
};

//#endregion

//#region MLflow tracking API (`model_experiments` data plane)

export interface MlflowConfig {
  /** An instance's `url` without a trailing slash, which the `/api/2.0/mlflow` routes hang off. */
  readonly apiUrl: string;
  /** One of the instance's tracking tokens, sent as `Authorization: Bearer`. */
  readonly token: Redacted.Redacted<string>;
}

/**
 * What `model_experiments_mlflow` operations sign with: a tracking token scoped to one instance,
 * not a STACKIT access token, so this is its own service rather than {@link Credentials}.
 */
export class MlflowCredentials
  extends /*@__PURE__*/ Context.Service<
    MlflowCredentials,
    Effect.Effect<MlflowConfig, ConfigError>
  >()("StackitMlflowCredentials") {}

/**
 * The `MlflowCredentials` value for one token on one instance. A token Alchemy holds no value
 * for, on an adopted resource, fails here rather than on the wire. A bare host gets `https://`,
 * and any user and password are dropped, so they can't leak into an error.
 */
export const mlflowCredentialsOf = (config: {
  readonly instanceUrl: string;
  readonly token: Redacted.Redacted<string> | undefined;
}): Effect.Effect<MlflowConfig, ConfigError> => {
  const withScheme = /^https?:\/\//.test(config.instanceUrl)
    ? config.instanceUrl
    : `https://${config.instanceUrl}`;
  if (!URL.canParse(withScheme)) {
    return Effect.fail(
      new ConfigError({ message: "A Model Experiments instance's url is not a URL" }),
    );
  }
  if (config.token === undefined) {
    return Effect.fail(
      new ConfigError({
        message: "This Model Experiments token has no known value: create a new one",
      }),
    );
  }
  const url = new URL(withScheme);
  return Effect.succeed({
    apiUrl: `${url.origin}${url.pathname.replace(/\/+$/, "")}`,
    token: config.token,
  });
};

//#endregion
