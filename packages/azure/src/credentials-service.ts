/**
 * The `Credentials` service, its `Config`, and the typed errors of the
 * credential providers -- hand-written.
 *
 * Kept apart from the providers in `credentials.ts` so that both the
 * providers and the protocol can import it without an import cycle.
 */
import * as Category from "@distilled.cloud/core/category";
import type { ConfigError } from "@distilled.cloud/core/errors";
import * as Schema from "@distilled.cloud/core/schema-lite-typed";
import * as Context from "effect/Context";
import type * as Effect from "effect/Effect";
import type * as Redacted from "effect/Redacted";

/**
 * Default base URL for the Azure Resource Manager (ARM) API.
 */
export const DEFAULT_API_BASE_URL = "https://management.azure.com";

/** Microsoft Entra ID authority of the Azure public cloud. */
export const DEFAULT_AUTHORITY_HOST = "https://login.microsoftonline.com";

/** The Entra ID scope of Azure Resource Manager in the public cloud. */
export const ARM_SCOPE = "https://management.azure.com/.default";

/** The Entra ID scope of the ARM endpoint `apiBaseUrl` (sovereign clouds included). */
export const armScopeFor = (apiBaseUrl: string): string =>
  `${apiBaseUrl.replace(/\/+$/, "")}/.default`;

const CredentialErrorFields = {
  message: /*@__PURE__*/ Schema.String,
  /** The Entra ID / identity endpoint error code, e.g. `invalid_client`. */
  code: /*@__PURE__*/ Schema.optional(Schema.String),
  /** HTTP status of the token endpoint, when it answered. */
  status: /*@__PURE__*/ Schema.optional(Schema.Number),
  /** The scope the token was requested for. */
  scope: /*@__PURE__*/ Schema.optional(Schema.String),
};

/**
 * Microsoft Entra ID rejected the client credentials: the secret is wrong
 * or expired (`AADSTS7000215`, `AADSTS7000222`), or the client ID is not an
 * application in the tenant (`AADSTS700016`).
 */
export class InvalidClientSecret
  extends /*@__PURE__*/ Schema.TaggedError<InvalidClientSecret>()(
    "InvalidClientSecret",
    CredentialErrorFields,
  ).pipe(Category.withAuthError) {}

/**
 * No managed identity is available: neither the App Service identity
 * endpoint (`IDENTITY_ENDPOINT` + `IDENTITY_HEADER`) nor the instance
 * metadata service answered, or the requested identity is not assigned to
 * this host.
 */
export class ManagedIdentityUnavailable
  extends /*@__PURE__*/ Schema.TaggedError<ManagedIdentityUnavailable>()(
    "ManagedIdentityUnavailable",
    CredentialErrorFields,
  ).pipe(Category.withConfigurationError) {}

/**
 * The token endpoint could not be reached or did not issue a token (after
 * the bounded retries for throttling and server errors).
 */
export class TokenRequestFailed
  extends /*@__PURE__*/ Schema.TaggedError<TokenRequestFailed>()(
    "TokenRequestFailed",
    CredentialErrorFields,
  ).pipe(Category.withAuthError) {}

/** Every failure of a credential provider. */
export type AzureCredentialsError =
  | InvalidClientSecret
  | ManagedIdentityUnavailable
  | TokenRequestFailed;

/**
 * A data-plane operation has no known token audience, so the protocol
 * refuses to send it any token rather than leak the ARM token to a
 * caller-chosen host.
 */
export class MissingTokenAudience
  extends /*@__PURE__*/ Schema.TaggedError<MissingTokenAudience>()("MissingTokenAudience", {
    message: Schema.String,
    /** The operation's URI template. */
    uri: Schema.String,
  }).pipe(Category.withConfigurationError) {}

export interface Config {
  /**
   * A bearer token for an Entra ID scope: `armScopeFor(apiBaseUrl)` for an
   * ARM operation, the service's own scope for a data-plane operation
   * (`https://vault.azure.net/.default` for Key Vault). The operation asks
   * for the token when it runs, so a program that only calls Key Vault
   * never mints an ARM token. A static token answers every scope with the
   * same token.
   */
  readonly token: (
    scope: string,
  ) => Effect.Effect<Redacted.Redacted<string>, AzureCredentialsError | ConfigError>;
  /**
   * Azure subscription ID used as a path parameter in most ARM operations.
   * Empty when the identity has none configured.
   */
  readonly subscriptionId: string;
  /** Azure tenant (directory) ID. Required for some management plane operations. */
  readonly tenantId?: string;
  /** Base URL for the Azure API (defaults to management.azure.com). */
  readonly apiBaseUrl: string;
}

/**
 * Holds an effect that resolves the current credentials. The protocol runs
 * it on the calling fiber for every request; reading it does no I/O, and
 * `Config.token` caches each scope's token (core `refreshingByKey`).
 */
export class Credentials
  extends /*@__PURE__*/ Context.Service<Credentials, Effect.Effect<Config, ConfigError>>()(
    "AzureCredentials",
  ) {}
