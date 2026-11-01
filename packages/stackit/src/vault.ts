/**
 * STACKIT Secrets Manager's Vault credentials -- hand-written.
 *
 * Secret values live behind HashiCorp Vault's HTTP API on an instance's
 * `apiUrl`, which takes its own client tokens rather than STACKIT access tokens.
 * A client token comes from a login, with an AppRole (`fromAppRole`) or a user
 * (`fromUserpass`), and lasts 15 minutes by default. The providers here cache
 * it, log in again one minute before it expires, and let concurrent requests
 * share one login. They don't renew: logging in again is what STACKIT documents
 * for a client whose token ran out, and it needs nothing a renewal doesn't.
 *
 * A failed login surfaces on the operation as `ConfigError`, as a failed token
 * exchange does. Repeated failures lock the identity out for 10 minutes
 * (docs.stackit.cloud, "Handle authentication lockouts"), and the lock also stops
 * logins that hold valid credentials. So these never retry a login Vault refused,
 * and request traffic can't retry it either: the refusal is held for a cooldown,
 * and every call during it gets the same error without logging in.
 */
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Clock from "effect/Clock";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { type VaultConfig, VaultCredentials, VaultEndpoint } from "./credentials.ts";
import type { VaultLoginContext } from "./protocol.ts";
import { makeRefreshGate } from "./refresh-gate.ts";
import * as kv from "./services/secrets_manager_kv.ts";

export { type VaultConfig, VaultCredentials, VaultEndpoint } from "./credentials.ts";

/** Log in again this long before the cached token expires. */
export const VAULT_REFRESH_WINDOW_MS = 60 * 1000;

/** How long a lockout lasts, per STACKIT's docs, so how long to stop trying. */
const LOCKED_COOLDOWN_MS = 10 * 60 * 1000;

/**
 * How long to hold any other refusal. A stale secret id costs one failed login a
 * minute per isolate, and a credential or ACL fixed meanwhile works within a minute.
 */
const REFUSED_COOLDOWN_MS = 60 * 1000;

/** Refusals of these credentials from here: logging in again gets the same answer. */
const REFUSALS: ReadonlySet<string> = new Set([
  "BadRequest",
  "Forbidden",
  "NotFound",
  "TooManyRequests",
  "Unauthorized",
  "UnprocessableEntity",
]);

/** How long to hold a failed login. Outages and network errors aren't held. */
const cooldownOf = (tag: string): number | undefined =>
  tag === "AuthenticationLocked"
    ? LOCKED_COOLDOWN_MS
    : REFUSALS.has(tag)
      ? REFUSED_COOLDOWN_MS
      : undefined;

const loginError = (
  apiUrl: string,
  error: { readonly _tag: string; readonly message?: string | undefined },
) =>
  new ConfigError({
    message: `Vault login at ${apiUrl} failed with ${error._tag}: ${error.message ?? "no message"}${
      error._tag === "Forbidden"
        ? " (STACKIT answers this when the source IP is not in the instance's ACL)"
        : error._tag === "AuthenticationLocked"
          ? " (lockouts last 10 minutes)"
          : ""
    }`,
  });

/**
 * A login, with its result cached until shortly before the token expires, and a
 * refusal held for its cooldown. See the module docs for why neither retries.
 */
const cachedLogin = (
  apiUrl: string,
  login: Effect.Effect<kv.LoginResponse, kv.LoginWithAppRoleError, VaultLoginContext>,
): Effect.Effect<VaultConfig, ConfigError, HttpClient.HttpClient> => {
  const withClaim = makeRefreshGate();
  let cached: { readonly config: VaultConfig; readonly expiresAt: number } | undefined;
  let refused: { readonly error: ConfigError; readonly until: number } | undefined;

  const fromCache = <E, R>(orElse: Effect.Effect<VaultConfig, E, R>) =>
    Effect.flatMap(
      Clock.currentTimeMillis,
      (now): Effect.Effect<VaultConfig, E | ConfigError, R> =>
        cached !== undefined && now < cached.expiresAt - VAULT_REFRESH_WINDOW_MS
          ? Effect.succeed(cached.config)
          : refused !== undefined && now < refused.until
            ? Effect.fail(refused.error)
            : orElse,
    );

  const toConfigError = (error: kv.LoginWithAppRoleError) =>
    error._tag === "ConfigError" ? error : loginError(apiUrl, error);

  const fresh = Effect.gen(function* () {
    const issuedAt = yield* Clock.currentTimeMillis;
    const { auth } = yield* login.pipe(
      Effect.provideService(VaultEndpoint, apiUrl),
      Effect.tapError((error) =>
        Effect.sync(() => {
          const cooldown = cooldownOf(error._tag);
          if (cooldown !== undefined) {
            refused = { error: toConfigError(error), until: issuedAt + cooldown };
          }
        }),
      ),
      Effect.mapError(toConfigError),
    );
    const token = auth.client_token;
    const config: VaultConfig = {
      apiUrl,
      token: Redacted.isRedacted(token) ? token : Redacted.make(token),
    };
    cached = { config, expiresAt: issuedAt + auth.lease_duration * 1000 };
    refused = undefined;
    return config;
  });

  return fromCache(withClaim(fromCache(fresh)));
};

/** Vault credentials from a Secrets Manager AppRole's role id and secret id. */
export const appRoleVaultCredentials = (config: {
  /** The instance's `apiUrl`. */
  readonly apiUrl: string;
  readonly roleId: string;
  readonly secretId: Redacted.Redacted<string>;
}): Effect.Effect<VaultConfig, ConfigError, HttpClient.HttpClient> =>
  cachedLogin(
    config.apiUrl,
    kv.loginWithAppRole({ role_id: config.roleId, secret_id: config.secretId }),
  );

/** Vault credentials from a Secrets Manager user's generated username and password. */
export const userpassVaultCredentials = (config: {
  /** The instance's `apiUrl`. */
  readonly apiUrl: string;
  readonly username: string;
  readonly password: Redacted.Redacted<string>;
}): Effect.Effect<VaultConfig, ConfigError, HttpClient.HttpClient> =>
  cachedLogin(
    config.apiUrl,
    kv.loginWithUserpass({ username: config.username, password: config.password }),
  );

const asLayer = (
  credentials: Effect.Effect<VaultConfig, ConfigError, HttpClient.HttpClient>,
): Layer.Layer<VaultCredentials, never, HttpClient.HttpClient> =>
  Layer.effect(
    VaultCredentials,
    Effect.gen(function* () {
      const client = yield* HttpClient.HttpClient;
      return credentials.pipe(Effect.provideService(HttpClient.HttpClient, client));
    }),
  );

/**
 * `VaultCredentials` from an AppRole. The token cache belongs to the returned
 * layer value, so build it once per instance and share it.
 */
export const fromAppRole = (config: {
  readonly apiUrl: string;
  readonly roleId: string;
  readonly secretId: Redacted.Redacted<string>;
}): Layer.Layer<VaultCredentials, never, HttpClient.HttpClient> =>
  asLayer(appRoleVaultCredentials(config));

/**
 * `VaultCredentials` from a user. The token cache belongs to the returned layer
 * value, so build it once per instance and share it.
 */
export const fromUserpass = (config: {
  readonly apiUrl: string;
  readonly username: string;
  readonly password: Redacted.Redacted<string>;
}): Layer.Layer<VaultCredentials, never, HttpClient.HttpClient> =>
  asLayer(userpassVaultCredentials(config));
