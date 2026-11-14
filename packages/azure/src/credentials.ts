/**
 * Azure credential providers -- hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol resolves it per request on the
 * calling fiber). Each provider below is a `Layer.Layer<Credentials>` that
 * mints Microsoft Entra ID tokens for any scope through `Config.token`,
 * caches them per scope (core `refreshingByKey`, created with the layer),
 * and mints again 5 minutes before they expire:
 *
 * - {@link fromClientSecret} -- a service principal's client secret
 *   (OAuth2 client-credentials grant).
 * - {@link fromManagedIdentity} -- the identity of the host: App Service,
 *   Functions and Container Apps (`IDENTITY_ENDPOINT`), an AKS pod with
 *   workload identity (`AZURE_FEDERATED_TOKEN_FILE`), or VMs and AKS nodes
 *   (the instance metadata service).
 * - {@link fromWorkloadIdentity} -- an AKS pod's federated workload identity
 *   (the projected service-account token exchanged at Entra ID).
 * - {@link fromStaticToken} / {@link CredentialsFromEnv} -- one pre-acquired
 *   bearer token (`AZURE_BEARER_TOKEN`).
 * - {@link fromEnv} -- the chain: client secret, then managed identity, then
 *   a static token.
 *
 * The token requests are the one place this SDK sends raw HTTP. They use the
 * calling fiber's `HttpClient` when one is in scope (an operation always has
 * one), else the platform `fetch` client.
 */
import * as EffectConfig from "@distilled.cloud/core/config";
import { ConfigError } from "@distilled.cloud/core/errors";
import { type Expiring, refreshingByKey } from "@distilled.cloud/core/token-cache";
import * as Clock from "effect/Clock";
import * as Effect from "effect/Effect";
import * as FetchHttpClient from "effect/http/FetchHttpClient";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";
import * as Schedule from "effect/Schedule";
import {
  type AzureCredentialsError,
  type Config,
  Credentials,
  DEFAULT_API_BASE_URL,
  DEFAULT_AUTHORITY_HOST,
  InvalidClientSecret,
  ManagedIdentityUnavailable,
  TokenRequestFailed,
} from "./credentials-service.ts";

export * from "./credentials-service.ts";

/** An access token and when it expires (epoch milliseconds). */
export type AccessToken = Expiring<Redacted.Redacted<string>>;

// ---------------------------------------------------------------------------
// Token HTTP
// ---------------------------------------------------------------------------

/** Per-attempt timeout of a token request. */
const TOKEN_TIMEOUT_MS = 30_000;
/** How long `fromEnv` waits for the instance metadata service to answer. */
const IMDS_PROBE_TIMEOUT_MS = 1_000;
/** Retries of a throttled or failed token request: 0.2 s + 0.4 s + 0.8 s. */
const TOKEN_RETRY = {
  times: 3,
  schedule: /*@__PURE__*/ Schedule.exponential("200 millis"),
} as const;
/**
 * Retries of the instance metadata service: 1 + 2 + 4 + 8 + 16 + 32 s. IMDS
 * answers 410 for up to 70 s after a VM starts, and Microsoft's guidance is
 * to back off exponentially through it.
 */
const IMDS_RETRY = {
  times: 6,
  schedule: /*@__PURE__*/ Schedule.exponential("1 second"),
} as const;

export const IMDS_TOKEN_URL = "http://169.254.169.254/metadata/identity/oauth2/token";
const IMDS_API_VERSION = "2018-02-01";
const APP_SERVICE_API_VERSION = "2019-08-01";

/** Run `effect` with the fiber's `HttpClient` when one is in scope, else `fetch`. */
const withHttpClient = <A, E>(
  effect: Effect.Effect<A, E, HttpClient.HttpClient>,
): Effect.Effect<A, E> =>
  Effect.serviceOption(HttpClient.HttpClient).pipe(
    Effect.flatMap((client) =>
      Option.isSome(client)
        ? Effect.provideService(effect, HttpClient.HttpClient, client.value)
        : Effect.provide(effect, FetchHttpClient.layer),
    ),
  );

interface TokenResponse {
  readonly status: number;
  /** The parsed JSON body, or `undefined` when the body is not JSON. */
  readonly body: Record<string, unknown> | undefined;
}

/** A transport failure (connection refused, DNS, timeout); never a response. */
interface Unreachable {
  readonly _tag: "Unreachable";
  readonly message: string;
}

/** Execute a token request and read its JSON body. Non-2xx statuses are returned. */
const send = (
  request: HttpClientRequest.HttpClientRequest,
  timeoutMs: number,
): Effect.Effect<TokenResponse, Unreachable> =>
  HttpClient.execute(request).pipe(
    Effect.flatMap((response) =>
      Effect.map(response.text, (text) => ({ status: response.status, body: parseJson(text) })),
    ),
    Effect.timeout(timeoutMs),
    Effect.mapError((cause): Unreachable => ({
      _tag: "Unreachable",
      message:
        cause._tag === "TimeoutError"
          ? `timed out after ${timeoutMs} ms`
          : `request failed: ${cause.message}`,
    })),
    withHttpClient,
  );

const parseJson = (text: string): Record<string, unknown> | undefined => {
  try {
    const value: unknown = JSON.parse(text);
    return value !== null && typeof value === "object"
      ? (value as Record<string, unknown>)
      : undefined;
  } catch {
    return undefined;
  }
};

/** Statuses a token endpoint answers transiently (IMDS also uses 404 and 410 while starting). */
const isTransientStatus = (status: number, imds: boolean) =>
  status === 429 || status >= 500 || (imds && (status === 404 || status === 410));

/**
 * Send with bounded retries: transport failures briefly ({@link TOKEN_RETRY};
 * a host with no identity endpoint fails fast), transient statuses on the
 * endpoint's own schedule ({@link IMDS_RETRY} for IMDS). Returns the last
 * response, or the transport failure once retries run out.
 */
const sendWithRetry = (
  request: HttpClientRequest.HttpClientRequest,
  options: { readonly imds: boolean },
): Effect.Effect<TokenResponse, Unreachable> =>
  send(request, TOKEN_TIMEOUT_MS).pipe(
    Effect.retry(TOKEN_RETRY),
    Effect.flatMap((response) =>
      isTransientStatus(response.status, options.imds)
        ? Effect.fail({ _tag: "Transient" as const, response })
        : Effect.succeed(response),
    ),
    Effect.retry({
      ...(options.imds ? IMDS_RETRY : TOKEN_RETRY),
      while: (e) => e._tag === "Transient",
    }),
    // Out of retries on a transient status: the caller reports that response.
    Effect.catch((e) => (e._tag === "Transient" ? Effect.succeed(e.response) : Effect.fail(e))),
  );

const stringField = (body: Record<string, unknown> | undefined, name: string) => {
  const value = body?.[name];
  return typeof value === "string" ? value : undefined;
};

/** `expires_on` is epoch seconds (a number or a numeric string); `expires_in` is seconds from now. */
const expiresOnMs = (body: Record<string, unknown>, issuedAtMs: number): number => {
  const on = body.expires_on;
  const onSeconds = typeof on === "number" ? on : typeof on === "string" ? Number(on) : NaN;
  if (Number.isFinite(onSeconds) && onSeconds > 0) return onSeconds * 1000;
  if (typeof on === "string") {
    const parsed = Date.parse(on);
    if (Number.isFinite(parsed)) return parsed;
  }
  const inSeconds = Number(body.expires_in);
  return issuedAtMs + (Number.isFinite(inSeconds) && inSeconds > 0 ? inSeconds : 3600) * 1000;
};

/** The reason an identity endpoint gives for not issuing a token (never a secret). */
const reasonOf = (response: TokenResponse): string =>
  stringField(response.body, "error_description") ??
  stringField(response.body, "message") ??
  stringField(response.body, "error") ??
  `HTTP ${response.status}`;

const accessTokenOf = (response: TokenResponse, issuedAtMs: number): AccessToken | undefined => {
  const token = stringField(response.body, "access_token");
  if (response.status !== 200 || token === undefined || response.body === undefined) {
    return undefined;
  }
  return { value: Redacted.make(token), expiresAt: expiresOnMs(response.body, issuedAtMs) };
};

/** `https://vault.azure.net/.default` -> `https://vault.azure.net` (managed identity takes a resource). */
export const resourceOf = (scope: string): string => scope.replace(/\/\.default$/, "");

// ---------------------------------------------------------------------------
// Client secret
// ---------------------------------------------------------------------------

export interface ClientSecretOptions {
  /** Entra ID tenant (directory) ID of the service principal. */
  readonly tenantId: string;
  /** Application (client) ID of the service principal. */
  readonly clientId: string;
  /** Client secret of the service principal. */
  readonly clientSecret: Redacted.Redacted<string>;
  /** Subscription for ARM operations that take `{subscriptionId}`. */
  readonly subscriptionId: string;
  /** @default "https://login.microsoftonline.com" */
  readonly authorityHost?: string;
  /** @default "https://management.azure.com" */
  readonly apiBaseUrl?: string;
}

/** Entra ID error codes that mean the client credentials themselves are wrong. */
const INVALID_CLIENT_ERRORS = new Set(["invalid_client", "unauthorized_client"]);

/** Request one token with the OAuth2 client-credentials grant. */
export const requestClientSecretToken = (
  options: ClientSecretOptions,
  scope: string,
): Effect.Effect<AccessToken, AzureCredentialsError | ConfigError> =>
  Effect.gen(function* () {
    const issuedAt = yield* Clock.currentTimeMillis;
    const authority = (options.authorityHost ?? DEFAULT_AUTHORITY_HOST).replace(/\/+$/, "");
    const request = HttpClientRequest.post(
      `${authority}/${encodeURIComponent(options.tenantId)}/oauth2/v2.0/token`,
      { acceptJson: true },
    ).pipe(
      HttpClientRequest.bodyUrlParams({
        grant_type: "client_credentials",
        client_id: options.clientId,
        client_secret: Redacted.value(options.clientSecret),
        scope,
      }),
    );
    const response = yield* sendWithRetry(request, { imds: false }).pipe(
      Effect.mapError(
        (e) =>
          new TokenRequestFailed({
            message: `Microsoft Entra ID token endpoint ${e.message}`,
            scope,
          }),
      ),
    );
    const token = accessTokenOf(response, issuedAt);
    if (token !== undefined) return token;
    const code = stringField(response.body, "error");
    const fields = {
      message: `Microsoft Entra ID did not issue a token for client ${options.clientId}: ${reasonOf(response)}`,
      code,
      status: response.status,
      scope,
    };
    return yield* Effect.fail(
      code !== undefined && INVALID_CLIENT_ERRORS.has(code)
        ? new InvalidClientSecret(fields)
        : new TokenRequestFailed(fields),
    );
  });

/**
 * The `Config` effect of a token source. The per-scope token cache is
 * created here, once per provider layer, and a token is minted only when an
 * operation asks for its scope.
 */
const makeConfig = (
  request: (scope: string) => Effect.Effect<AccessToken, AzureCredentialsError | ConfigError>,
  options: {
    readonly subscriptionId: Effect.Effect<string, ConfigError>;
    readonly tenantId?: string;
    readonly apiBaseUrl?: string;
  },
): Effect.Effect<Config, ConfigError> => {
  const token = refreshingByKey(request);
  const apiBaseUrl = options.apiBaseUrl ?? DEFAULT_API_BASE_URL;
  return Effect.map(options.subscriptionId, (subscriptionId) => ({
    token,
    subscriptionId,
    ...(options.tenantId !== undefined ? { tenantId: options.tenantId } : {}),
    apiBaseUrl,
  }));
};

const clientSecretConfig = (options: ClientSecretOptions) =>
  makeConfig((scope) => requestClientSecretToken(options, scope), {
    subscriptionId: Effect.succeed(options.subscriptionId),
    tenantId: options.tenantId,
    apiBaseUrl: options.apiBaseUrl,
  });

/**
 * Credentials of a service principal: tokens for any scope from the OAuth2
 * client-credentials grant against
 * `https://login.microsoftonline.com/<tenant>/oauth2/v2.0/token`.
 *
 * @example
 * ```ts
 * Effect.provide(
 *   Azure.fromClientSecret({ tenantId, clientId, clientSecret, subscriptionId }),
 * );
 * ```
 */
export const fromClientSecret = (options: ClientSecretOptions): Layer.Layer<Credentials> =>
  Layer.succeed(Credentials, clientSecretConfig(options));

// ---------------------------------------------------------------------------
// Managed identity
// ---------------------------------------------------------------------------

export interface ManagedIdentityOptions {
  /** Client ID of a user-assigned identity; the system-assigned identity when omitted. */
  readonly clientId?: string;
  /**
   * Subscription for ARM operations that take `{subscriptionId}`.
   * @default the `AZURE_SUBSCRIPTION_ID` environment variable, else none
   */
  readonly subscriptionId?: string;
  /** Tenant of the identity, when ARM operations need it. */
  readonly tenantId?: string;
  /** @default "https://management.azure.com" */
  readonly apiBaseUrl?: string;
}

/**
 * Environment variable `name`, or `undefined` when it is not set. A
 * `ConfigProvider` that cannot read its source fails with `ConfigError`.
 */
const optionalEnv = (name: string): Effect.Effect<string | undefined, ConfigError> =>
  EffectConfig.option(EffectConfig.String(name)).pipe(
    Effect.map(Option.getOrUndefined),
    Effect.mapError(
      (cause) => new ConfigError({ message: `cannot read ${name}: ${cause.message}`, key: name }),
    ),
  );

/** `AZURE_SUBSCRIPTION_ID`, or empty when it is not set. */
const subscriptionFromEnv = /*@__PURE__*/ Effect.map(
  /*@__PURE__*/ optionalEnv("AZURE_SUBSCRIPTION_ID"),
  (id) => id ?? "",
);

/** The App Service identity endpoint, when `IDENTITY_ENDPOINT` and `IDENTITY_HEADER` are set. */
const appServiceEndpoint = /*@__PURE__*/ Effect.gen(function* () {
  const endpoint = yield* optionalEnv("IDENTITY_ENDPOINT");
  const header = yield* optionalEnv("IDENTITY_HEADER");
  return endpoint && header ? { endpoint, header } : undefined;
});

// ---------------------------------------------------------------------------
// Workload identity (AKS)
// ---------------------------------------------------------------------------

export interface WorkloadIdentityOptions {
  /**
   * Tenant of the identity.
   * @default the `AZURE_TENANT_ID` environment variable
   */
  readonly tenantId?: string;
  /**
   * Client ID of the user-assigned identity the Kubernetes service account is federated with.
   * @default the `AZURE_CLIENT_ID` environment variable
   */
  readonly clientId?: string;
  /**
   * Path of the projected service-account token.
   * @default the `AZURE_FEDERATED_TOKEN_FILE` environment variable
   */
  readonly tokenFile?: string;
  /**
   * @default the `AZURE_AUTHORITY_HOST` environment variable, else "https://login.microsoftonline.com"
   */
  readonly authorityHost?: string;
  /**
   * Subscription for ARM operations that take `{subscriptionId}`.
   * @default the `AZURE_SUBSCRIPTION_ID` environment variable, else none
   */
  readonly subscriptionId?: string;
  /** @default "https://management.azure.com" */
  readonly apiBaseUrl?: string;
}

interface ResolvedWorkloadIdentity {
  readonly tenantId: string;
  readonly clientId: string;
  readonly tokenFile: string;
  readonly authorityHost: string;
}

/**
 * The workload identity the AKS webhook injects into a pod labelled
 * `azure.workload.identity/use: "true"`, when all of it is present.
 */
const workloadIdentityOf = (
  options: Pick<WorkloadIdentityOptions, "tenantId" | "clientId" | "tokenFile" | "authorityHost">,
): Effect.Effect<ResolvedWorkloadIdentity | undefined, ConfigError> =>
  Effect.gen(function* () {
    const tokenFile = options.tokenFile ?? (yield* optionalEnv("AZURE_FEDERATED_TOKEN_FILE"));
    const clientId = options.clientId ?? (yield* optionalEnv("AZURE_CLIENT_ID"));
    const tenantId = options.tenantId ?? (yield* optionalEnv("AZURE_TENANT_ID"));
    const authorityHost =
      options.authorityHost ??
      (yield* optionalEnv("AZURE_AUTHORITY_HOST")) ??
      DEFAULT_AUTHORITY_HOST;
    return tokenFile && clientId && tenantId
      ? { tokenFile, clientId, tenantId, authorityHost }
      : undefined;
  });

/**
 * Read the projected service-account token. Kubelet rotates the file, so it
 * is read again for every token request (the token cache bounds how often).
 */
const readFederatedToken = (tokenFile: string, scope: string) =>
  Effect.tryPromise({
    try: () => import("node:fs/promises").then((fs) => fs.readFile(tokenFile, "utf8")),
    catch: (cause) =>
      new ManagedIdentityUnavailable({
        message: `No workload identity: cannot read the federated token file ${tokenFile}: ${String(cause)}`,
        scope,
      }),
  }).pipe(Effect.map((token) => token.trim()));

/**
 * Request one token by exchanging the pod's projected service-account token
 * (a client assertion) at Microsoft Entra ID for the federated identity.
 */
const requestWorkloadIdentityToken = (
  identity: ResolvedWorkloadIdentity,
  scope: string,
): Effect.Effect<AccessToken, AzureCredentialsError | ConfigError> =>
  Effect.gen(function* () {
    const issuedAt = yield* Clock.currentTimeMillis;
    const assertion = yield* readFederatedToken(identity.tokenFile, scope);
    const authority = identity.authorityHost.replace(/\/+$/, "");
    const request = HttpClientRequest.post(
      `${authority}/${encodeURIComponent(identity.tenantId)}/oauth2/v2.0/token`,
      { acceptJson: true },
    ).pipe(
      HttpClientRequest.bodyUrlParams({
        grant_type: "client_credentials",
        client_id: identity.clientId,
        client_assertion_type: "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
        client_assertion: assertion,
        scope,
      }),
    );
    const response = yield* sendWithRetry(request, { imds: false }).pipe(
      Effect.mapError(
        (e) =>
          new TokenRequestFailed({
            message: `Microsoft Entra ID token endpoint ${e.message}`,
            scope,
          }),
      ),
    );
    const token = accessTokenOf(response, issuedAt);
    if (token !== undefined) return token;
    return yield* Effect.fail(
      new TokenRequestFailed({
        message: `Microsoft Entra ID did not issue a workload identity token for client ${identity.clientId}: ${reasonOf(response)}`,
        code: stringField(response.body, "error"),
        status: response.status,
        scope,
      }),
    );
  });

/**
 * Credentials of an AKS pod with Microsoft Entra Workload ID: the pod's
 * projected service-account token (`AZURE_FEDERATED_TOKEN_FILE`) is
 * exchanged at Microsoft Entra ID for tokens of the user-assigned identity
 * its service account is federated with (`AZURE_CLIENT_ID`,
 * `AZURE_TENANT_ID`). {@link fromManagedIdentity} uses it too when the
 * workload identity webhook set those variables.
 *
 * @example
 * ```ts
 * Effect.provide(Azure.fromWorkloadIdentity());
 * ```
 */
export const fromWorkloadIdentity = (
  options: WorkloadIdentityOptions = {},
): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    makeConfig(
      (scope) =>
        workloadIdentityOf(options).pipe(
          Effect.flatMap((identity) =>
            identity !== undefined
              ? requestWorkloadIdentityToken(identity, scope)
              : Effect.fail(
                  new ManagedIdentityUnavailable({
                    message:
                      "No workload identity: AZURE_FEDERATED_TOKEN_FILE, AZURE_CLIENT_ID and AZURE_TENANT_ID are required",
                    scope,
                  }),
                ),
          ),
        ),
      {
        subscriptionId:
          options.subscriptionId !== undefined
            ? Effect.succeed(options.subscriptionId)
            : subscriptionFromEnv,
        tenantId: options.tenantId,
        apiBaseUrl: options.apiBaseUrl,
      },
    ),
  );

/**
 * Request one managed-identity token: from the App Service identity endpoint
 * (App Service, Functions, Container Apps) when the host sets one, from the
 * workload identity token exchange in an AKS pod the workload identity
 * webhook configured, else from the instance metadata service (VMs, VM
 * scale sets, AKS nodes).
 */
export const requestManagedIdentityToken = (
  options: { readonly clientId?: string },
  scope: string,
): Effect.Effect<AccessToken, AzureCredentialsError | ConfigError> =>
  Effect.gen(function* () {
    const workload = yield* workloadIdentityOf({});
    if (
      workload !== undefined &&
      (options.clientId === undefined || options.clientId === workload.clientId)
    ) {
      return yield* requestWorkloadIdentityToken(workload, scope);
    }
    const issuedAt = yield* Clock.currentTimeMillis;
    const appService = yield* appServiceEndpoint;
    const resource = resourceOf(scope);
    const clientId = options.clientId !== undefined ? { client_id: options.clientId } : {};
    const source = appService !== undefined ? "App Service identity endpoint" : "IMDS";
    const request =
      appService !== undefined
        ? HttpClientRequest.get(appService.endpoint, {
            urlParams: { resource, "api-version": APP_SERVICE_API_VERSION, ...clientId },
            headers: { "X-IDENTITY-HEADER": appService.header },
            acceptJson: true,
          })
        : HttpClientRequest.get(IMDS_TOKEN_URL, {
            urlParams: { "api-version": IMDS_API_VERSION, resource, ...clientId },
            headers: { Metadata: "true" },
            acceptJson: true,
          });
    const response = yield* sendWithRetry(request, { imds: appService === undefined }).pipe(
      Effect.mapError(
        (e) =>
          new ManagedIdentityUnavailable({
            message: `No managed identity: the ${source} ${e.message}`,
            scope,
          }),
      ),
    );
    const token = accessTokenOf(response, issuedAt);
    if (token !== undefined) return token;
    const fields = {
      message: `The ${source} did not issue a token${options.clientId ? ` for client ${options.clientId}` : ""}: ${reasonOf(response)}`,
      code: stringField(response.body, "error"),
      status: response.status,
      scope,
    };
    // 400: the host has no identity, or not the one asked for.
    return yield* Effect.fail(
      response.status === 400
        ? new ManagedIdentityUnavailable(fields)
        : new TokenRequestFailed(fields),
    );
  });

const managedIdentityConfig = (options: ManagedIdentityOptions) =>
  makeConfig((scope) => requestManagedIdentityToken(options, scope), {
    subscriptionId:
      options.subscriptionId !== undefined
        ? Effect.succeed(options.subscriptionId)
        : subscriptionFromEnv,
    tenantId: options.tenantId,
    apiBaseUrl: options.apiBaseUrl,
  });

/**
 * Credentials of the host's managed identity. App Service, Functions and
 * Container Apps serve tokens at `IDENTITY_ENDPOINT` (api-version
 * 2019-08-01, `X-IDENTITY-HEADER`); VMs and AKS at the instance metadata
 * service (api-version 2018-02-01, `Metadata: true`). `clientId` selects a
 * user-assigned identity.
 *
 * @example
 * ```ts
 * Effect.provide(Azure.fromManagedIdentity({ clientId: process.env.AZURE_CLIENT_ID }));
 * ```
 */
export const fromManagedIdentity = (
  options: ManagedIdentityOptions = {},
): Layer.Layer<Credentials> => Layer.succeed(Credentials, managedIdentityConfig(options));

// ---------------------------------------------------------------------------
// Static token
// ---------------------------------------------------------------------------

export interface StaticTokenOptions {
  /** A pre-acquired OAuth2 bearer token, sent to every operation. */
  readonly bearerToken: Redacted.Redacted<string>;
  readonly subscriptionId: string;
  readonly tenantId?: string;
  /** @default "https://management.azure.com" */
  readonly apiBaseUrl?: string;
}

/** The same token for every scope. */
const staticToken = (token: Redacted.Redacted<string>): Config["token"] => {
  const value = Effect.succeed(token);
  return () => value;
};

/**
 * One pre-acquired bearer token, sent to every operation (ARM and data
 * plane alike). It is never refreshed.
 */
export const fromStaticToken = (options: StaticTokenOptions): Layer.Layer<Credentials> => {
  const config: Config = {
    token: staticToken(options.bearerToken),
    subscriptionId: options.subscriptionId,
    ...(options.tenantId !== undefined ? { tenantId: options.tenantId } : {}),
    apiBaseUrl: options.apiBaseUrl ?? DEFAULT_API_BASE_URL,
  };
  return Layer.succeed(Credentials, Effect.succeed(config));
};

const staticEnvConfig = /*@__PURE__*/ EffectConfig.all({
  bearerToken: /*@__PURE__*/ EffectConfig.Redacted("AZURE_BEARER_TOKEN"),
  subscriptionId: /*@__PURE__*/ EffectConfig.String("AZURE_SUBSCRIPTION_ID"),
  tenantId: /*@__PURE__*/ EffectConfig.option(/*@__PURE__*/ EffectConfig.String("AZURE_TENANT_ID")),
  apiBaseUrl: /*@__PURE__*/ EffectConfig.String("AZURE_API_BASE_URL").pipe(
    /*@__PURE__*/ EffectConfig.withDefault(DEFAULT_API_BASE_URL),
  ),
});

const staticFromEnv = (message: string): Effect.Effect<Config, ConfigError> =>
  staticEnvConfig.pipe(
    Effect.mapError(() => new ConfigError({ message })),
    Effect.map(({ bearerToken, subscriptionId, tenantId, apiBaseUrl }) => ({
      token: staticToken(bearerToken),
      subscriptionId,
      ...(Option.isSome(tenantId) ? { tenantId: tenantId.value } : {}),
      apiBaseUrl,
    })),
  );

/**
 * A static token from environment variables:
 *
 * - `AZURE_BEARER_TOKEN` -- OAuth2 bearer token (required)
 * - `AZURE_SUBSCRIPTION_ID` -- Azure subscription ID (required)
 * - `AZURE_TENANT_ID` -- Azure tenant/directory ID (optional)
 * - `AZURE_API_BASE_URL` -- Optional override for the API base URL
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = /*@__PURE__*/ Layer.succeed(
  Credentials,
  /*@__PURE__*/ staticFromEnv(
    "AZURE_BEARER_TOKEN and AZURE_SUBSCRIPTION_ID environment variables are required",
  ),
);

// ---------------------------------------------------------------------------
// Chain
// ---------------------------------------------------------------------------

/** Whether the instance metadata service answers at all (any HTTP response counts). */
const imdsAnswers: Effect.Effect<boolean> = /*@__PURE__*/ Effect.suspend(() =>
  // Without the `Metadata` header IMDS answers 400 at once, so the probe
  // never waits for a token.
  send(HttpClientRequest.get(IMDS_TOKEN_URL), IMDS_PROBE_TIMEOUT_MS).pipe(
    Effect.as(true),
    // Unreachable within the probe timeout: this host has no IMDS, so the
    // chain moves on to a static token.
    Effect.orElseSucceed(() => false),
  ),
);

/**
 * The first credentials the environment provides:
 *
 * 1. a client secret: `AZURE_TENANT_ID`, `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET`
 *    (+ `AZURE_SUBSCRIPTION_ID`, `AZURE_AUTHORITY_HOST`, `AZURE_API_BASE_URL`);
 * 2. a managed identity, when `IDENTITY_ENDPOINT` is set or the instance
 *    metadata service answers (`AZURE_CLIENT_ID` selects a user-assigned one);
 * 3. a static token: `AZURE_BEARER_TOKEN` + `AZURE_SUBSCRIPTION_ID`.
 *
 * The choice is made on first use and kept for the layer's lifetime.
 */
export const fromEnv = (): Layer.Layer<Credentials> => {
  let chosen: Effect.Effect<Config, ConfigError> | undefined;
  const choose = Effect.gen(function* () {
    const tenantId = yield* optionalEnv("AZURE_TENANT_ID");
    const clientId = yield* optionalEnv("AZURE_CLIENT_ID");
    const clientSecret = yield* optionalEnv("AZURE_CLIENT_SECRET");
    const subscriptionId = yield* optionalEnv("AZURE_SUBSCRIPTION_ID");
    const apiBaseUrl = yield* optionalEnv("AZURE_API_BASE_URL");
    const authorityHost = yield* optionalEnv("AZURE_AUTHORITY_HOST");
    if (tenantId && clientId && clientSecret) {
      return clientSecretConfig({
        tenantId,
        clientId,
        clientSecret: Redacted.make(clientSecret),
        subscriptionId: subscriptionId ?? "",
        ...(authorityHost ? { authorityHost } : {}),
        ...(apiBaseUrl ? { apiBaseUrl } : {}),
      });
    }
    const appService = yield* appServiceEndpoint;
    const workload = yield* workloadIdentityOf({});
    const managed = appService !== undefined || workload !== undefined || (yield* imdsAnswers);
    if (managed) {
      return managedIdentityConfig({
        ...(clientId ? { clientId } : {}),
        ...(subscriptionId ? { subscriptionId } : {}),
        ...(tenantId ? { tenantId } : {}),
        ...(apiBaseUrl ? { apiBaseUrl } : {}),
      });
    }
    return staticFromEnv(
      "No Azure credentials found: set AZURE_TENANT_ID, AZURE_CLIENT_ID and AZURE_CLIENT_SECRET, " +
        "run on a host with a managed identity, or set AZURE_BEARER_TOKEN and AZURE_SUBSCRIPTION_ID",
    );
  });
  return Layer.succeed(
    Credentials,
    Effect.suspend(() =>
      chosen !== undefined
        ? chosen
        : choose.pipe(
            Effect.flatMap((config) =>
              Effect.suspend(() => {
                // A concurrent first use may have chosen already; keep one.
                chosen ??= config;
                return chosen;
              }),
            ),
          ),
    ),
  );
};
