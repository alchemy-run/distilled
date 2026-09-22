/**
 * Credentials for an Amazon Cognito identity pool, which mints the identity
 * id before exchanging it for credentials.
 */
import * as Effect from "effect/Effect";
import * as Option from "effect/Option";
import {
  cognitoFailure,
  cognitoRegion,
  getCredentialsForIdentity,
  type Logins,
  resolveLogins,
  unsigned,
} from "./cognito-identity.ts";
import {
  type CredentialSource,
  CredentialSourceError,
} from "./credential-source.ts";
import { withHttpClient } from "./http-client.ts";

/**
 * Where the identity id minted for a pool is kept between resolutions.
 * `localStorage` when the runtime has it (as the SDK does in the browser),
 * else a map for the life of the process.
 */
export interface IdentityIdCache {
  readonly get: (key: string) => Effect.Effect<string | undefined>;
  readonly set: (key: string, value: string) => Effect.Effect<void>;
  readonly remove: (key: string) => Effect.Effect<void>;
}

const memoryStore = new Map<string, string>();

/** `localStorage` where the runtime has a usable one; Node does not. */
const storage = (): Storage | undefined => {
  try {
    return (globalThis as { localStorage?: Storage }).localStorage;
  } catch {
    // Accessing it can throw, e.g. a browser with storage disabled.
    return undefined;
  }
};

export const defaultIdentityIdCache: IdentityIdCache = {
  get: (key) =>
    Effect.sync(
      () => storage()?.getItem(key) ?? memoryStore.get(key) ?? undefined,
    ),
  set: (key, value) =>
    Effect.sync(() => {
      memoryStore.set(key, value);
      storage()?.setItem(key, value);
    }),
  remove: (key) =>
    Effect.sync(() => {
      memoryStore.delete(key);
      storage()?.removeItem(key);
    }),
};

export interface FromCognitoIdentityPoolOptions {
  readonly identityPoolId: string;
  readonly logins?: Logins;
  readonly customRoleArn?: string;
  /** The account that owns the pool, for `GetId`. */
  readonly accountId?: string;
  /**
   * Distinguishes cached identity ids for several users of one pool.
   * Defaults to `ANONYMOUS` when there are no logins, as the SDK does.
   */
  readonly userIdentifier?: string;
  readonly cache?: IdentityIdCache;
  /** Region to call Cognito in; defaults to the pool id's prefix. */
  readonly region?: string;
}

/**
 * Credentials for an identity pool: `GetId` for the identity id, then
 * `GetCredentialsForIdentity`. The identity id is cached, and a cached id
 * the pool no longer knows is discarded and re-fetched once.
 */
export const fromCognitoIdentityPool = (
  options: FromCognitoIdentityPoolOptions,
): CredentialSource =>
  Effect.gen(function* () {
    const region = yield* cognitoRegion(options.region, options.identityPoolId);
    const cache = options.cache ?? defaultIdentityIdCache;
    const userIdentifier =
      options.userIdentifier ?? (options.logins ? undefined : "ANONYMOUS");
    const cacheKey = userIdentifier
      ? `aws:cognito-identity-ids:${options.identityPoolId}:${userIdentifier}`
      : undefined;

    const getId = Effect.gen(function* () {
      const Cognito = yield* Effect.promise(
        () => import("../services/cognito-identity.ts"),
      );
      const logins = yield* resolveLogins(options.logins);
      const response = yield* Cognito.getId({
        IdentityPoolId: options.identityPoolId,
        ...(options.accountId && { AccountId: options.accountId }),
        ...(logins && { Logins: logins }),
      }).pipe(
        unsigned(region),
        withHttpClient,
        Effect.mapError(cognitoFailure),
      );
      if (!response.IdentityId) {
        return yield* new CredentialSourceError({
          message: `Cognito Identity returned no identity id for pool ${options.identityPoolId}.`,
          tryNextLink: false,
        });
      }
      if (cacheKey) yield* cache.set(cacheKey, response.IdentityId);
      return response.IdentityId;
    });

    const cached = cacheKey ? yield* cache.get(cacheKey) : undefined;
    if (cached) {
      const credentials = yield* Effect.option(
        getCredentialsForIdentity(cached, region, options),
      );
      if (Option.isSome(credentials)) return credentials.value;
      // The pool no longer knows the cached id (it was deleted, or belongs
      // to another pool): forget it and mint a new one.
      if (cacheKey) yield* cache.remove(cacheKey);
    }
    const identityId = yield* getId;
    return yield* getCredentialsForIdentity(identityId, region, options);
  });
