/**
 * `@distilled.cloud/aws/Credentials` for the browser: the `Credentials`
 * service and the providers that need neither a file system nor a child
 * process. Each layer is defined in its provider's own file.
 */
export * from "./credentials-service.ts";
export type { Secret } from "./credential-providers/credential-source.ts";
export {
  createCredentialChain,
  propertyProviderChain,
} from "./credential-providers/create-credential-chain.ts";

export {
  fromCredentials,
  type StaticCredentials,
} from "./credential-providers/from-credentials.ts";
export { fromEnv } from "./credential-providers/from-env.ts";

import { loadModule, type SdkError } from "@distilled.cloud/core/sdk-error";
// Providers load on first use: importing every provider eagerly cost ~700 KB of heap
// (INI parsing, SSO, Cognito, process, metadata clients) in every program.
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import type * as __from_cognito_identity_pool from "./credential-providers/from-cognito-identity-pool.ts";
import type * as __from_cognito_identity from "./credential-providers/from-cognito-identity.ts";
import type * as __from_container_metadata from "./credential-providers/from-container-metadata.ts";
import type * as __from_http from "./credential-providers/from-http.ts";
import type * as __from_instance_metadata from "./credential-providers/from-instance-metadata.ts";
import type * as __from_temporary_credentials from "./credential-providers/from-temporary-credentials.ts";
import type * as __from_web_token from "./credential-providers/from-web-token.ts";
/** A provider loaded on first use: building its layer also fails if its module can't load. */
type WithLoadError<F> = F extends (...args: infer A) => Layer.Layer<infer S, infer E, infer R>
  ? (...args: A) => Layer.Layer<S, E | SdkError, R>
  : never;
export const fromCognitoIdentityPool: WithLoadError<
  typeof __from_cognito_identity_pool.fromCognitoIdentityPool
> = (...args: any[]) =>
  Layer.unwrap(
    Effect.map(
      loadModule(() => import("./credential-providers/from-cognito-identity-pool.ts")),
      (m) => (m.fromCognitoIdentityPool as (...a: any[]) => any)(...args),
    ),
  ) as any;
export const fromCognitoIdentity: WithLoadError<
  typeof __from_cognito_identity.fromCognitoIdentity
> = (...args: any[]) =>
  Layer.unwrap(
    Effect.map(
      loadModule(() => import("./credential-providers/from-cognito-identity.ts")),
      (m) => (m.fromCognitoIdentity as (...a: any[]) => any)(...args),
    ),
  ) as any;
export const fromContainerMetadata: WithLoadError<
  typeof __from_container_metadata.fromContainerMetadata
> = (...args: any[]) =>
  Layer.unwrap(
    Effect.map(
      loadModule(() => import("./credential-providers/from-container-metadata.ts")),
      (m) => (m.fromContainerMetadata as (...a: any[]) => any)(...args),
    ),
  ) as any;
export const fromHttp: WithLoadError<typeof __from_http.fromHttp> = (...args: any[]) =>
  Layer.unwrap(
    Effect.map(
      loadModule(() => import("./credential-providers/from-http.ts")),
      (m) => (m.fromHttp as (...a: any[]) => any)(...args),
    ),
  ) as any;
export const fromInstanceMetadata: WithLoadError<
  typeof __from_instance_metadata.fromInstanceMetadata
> = (...args: any[]) =>
  Layer.unwrap(
    Effect.map(
      loadModule(() => import("./credential-providers/from-instance-metadata.ts")),
      (m) => (m.fromInstanceMetadata as (...a: any[]) => any)(...args),
    ),
  ) as any;
export const fromTemporaryCredentials: WithLoadError<
  typeof __from_temporary_credentials.fromTemporaryCredentials
> = (...args: any[]) =>
  Layer.unwrap(
    Effect.map(
      loadModule(() => import("./credential-providers/from-temporary-credentials.ts")),
      (m) => (m.fromTemporaryCredentials as (...a: any[]) => any)(...args),
    ),
  ) as any;
export const fromWebToken: WithLoadError<typeof __from_web_token.fromWebToken> = (...args: any[]) =>
  Layer.unwrap(
    Effect.map(
      loadModule(() => import("./credential-providers/from-web-token.ts")),
      (m) => (m.fromWebToken as (...a: any[]) => any)(...args),
    ),
  ) as any;
