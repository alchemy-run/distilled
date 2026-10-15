/**
 * `@distilled.cloud/aws/Credentials` for Node, Bun and workers: everything
 * the browser entry exports, with the Node variants of `fromHttp`,
 * `fromInstanceMetadata` and `fromTemporaryCredentials` in place of the
 * browser ones, plus the providers that read `~/.aws` or run a process.
 * Each layer is defined in its provider's own file.
 */
export * from "./credentials.browser.ts";

// Providers load on first use: importing every provider eagerly cost ~700 KB of heap
// (INI parsing, SSO, Cognito, process, metadata clients) in every program.
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import type * as __from_http_node from "./credential-providers/from-http.node.ts";
import type * as __from_ini from "./credential-providers/from-ini.ts";
import type * as __from_instance_metadata_node from "./credential-providers/from-instance-metadata.node.ts";
import type * as __from_login_credentials from "./credential-providers/from-login-credentials.ts";
import type * as __from_node_provider_chain from "./credential-providers/from-node-provider-chain.ts";
import type * as __from_process from "./credential-providers/from-process.ts";
import type * as __from_sso from "./credential-providers/from-sso.ts";
import type * as __from_temporary_credentials_node from "./credential-providers/from-temporary-credentials.node.ts";
import type * as __from_token_file from "./credential-providers/from-token-file.ts";
export const fromHttp: typeof __from_http_node.fromHttp = (...args: any[]) =>
  Layer.unwrap(
    Effect.map(
      Effect.promise(() => import("./credential-providers/from-http.node.ts")),
      (m) => (m.fromHttp as (...a: any[]) => any)(...args),
    ),
  ) as any;
export const fromIni: typeof __from_ini.fromIni = (...args: any[]) =>
  Layer.unwrap(
    Effect.map(
      Effect.promise(() => import("./credential-providers/from-ini.ts")),
      (m) => (m.fromIni as (...a: any[]) => any)(...args),
    ),
  ) as any;
export const fromInstanceMetadata: typeof __from_instance_metadata_node.fromInstanceMetadata = (
  ...args: any[]
) =>
  Layer.unwrap(
    Effect.map(
      Effect.promise(() => import("./credential-providers/from-instance-metadata.node.ts")),
      (m) => (m.fromInstanceMetadata as (...a: any[]) => any)(...args),
    ),
  ) as any;
export const fromLoginCredentials: typeof __from_login_credentials.fromLoginCredentials = (
  ...args: any[]
) =>
  Layer.unwrap(
    Effect.map(
      Effect.promise(() => import("./credential-providers/from-login-credentials.ts")),
      (m) => (m.fromLoginCredentials as (...a: any[]) => any)(...args),
    ),
  ) as any;
export const fromChain: typeof __from_node_provider_chain.fromChain = (...args: any[]) =>
  Layer.unwrap(
    Effect.map(
      Effect.promise(() => import("./credential-providers/from-node-provider-chain.ts")),
      (m) => (m.fromChain as (...a: any[]) => any)(...args),
    ),
  ) as any;
export const fromNodeProviderChain: typeof __from_node_provider_chain.fromNodeProviderChain = (
  ...args: any[]
) =>
  Layer.unwrap(
    Effect.map(
      Effect.promise(() => import("./credential-providers/from-node-provider-chain.ts")),
      (m) => (m.fromNodeProviderChain as (...a: any[]) => any)(...args),
    ),
  ) as any;
export const fromProcess: typeof __from_process.fromProcess = (...args: any[]) =>
  Layer.unwrap(
    Effect.map(
      Effect.promise(() => import("./credential-providers/from-process.ts")),
      (m) => (m.fromProcess as (...a: any[]) => any)(...args),
    ),
  ) as any;
export const fromSSO: typeof __from_sso.fromSSO = (...args: any[]) =>
  Layer.unwrap(
    Effect.map(
      Effect.promise(() => import("./credential-providers/from-sso.ts")),
      (m) => (m.fromSSO as (...a: any[]) => any)(...args),
    ),
  ) as any;
export const fromTemporaryCredentials: typeof __from_temporary_credentials_node.fromTemporaryCredentials =
  (...args: any[]) =>
    Layer.unwrap(
      Effect.map(
        Effect.promise(() => import("./credential-providers/from-temporary-credentials.node.ts")),
        (m) => (m.fromTemporaryCredentials as (...a: any[]) => any)(...args),
      ),
    ) as any;
export const fromTokenFile: typeof __from_token_file.fromTokenFile = (...args: any[]) =>
  Layer.unwrap(
    Effect.map(
      Effect.promise(() => import("./credential-providers/from-token-file.ts")),
      (m) => (m.fromTokenFile as (...a: any[]) => any)(...args),
    ),
  ) as any;
