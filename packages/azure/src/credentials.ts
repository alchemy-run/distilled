import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as ServiceMap from "effect/ServiceMap";
import { ConfigError } from "@distilled.cloud/core/errors";

/**
 * Default base URL for Azure Resource Manager (ARM) API.
 */
export const DEFAULT_API_BASE_URL = "https://management.azure.com";

export interface Config {
  /** OAuth2 Bearer token for authenticating with Azure. */
  readonly bearerToken: Redacted.Redacted<string>;
  /** Azure subscription ID used as a path parameter in most ARM operations. */
  readonly subscriptionId: string;
  /** Azure tenant (directory) ID. Required for some management plane operations. */
  readonly tenantId?: string;
  /** Base URL for the Azure API (defaults to management.azure.com). */
  readonly apiBaseUrl: string;
}

export class Credentials extends ServiceMap.Service<Credentials, Config>()(
  "AzureCredentials",
) {}

/**
 * Reads Azure credentials from environment variables:
 *
 * - `AZURE_BEARER_TOKEN` — OAuth2 bearer token (required)
 * - `AZURE_SUBSCRIPTION_ID` — Azure subscription ID (required)
 * - `AZURE_TENANT_ID` — Azure tenant/directory ID (optional)
 * - `AZURE_API_BASE_URL` — Optional override for the API base URL
 */
export const CredentialsFromEnv = Layer.effect(
  Credentials,
  Effect.gen(function* () {
    const bearerToken = process.env.AZURE_BEARER_TOKEN;

    if (!bearerToken) {
      return yield* new ConfigError({
        message: "AZURE_BEARER_TOKEN environment variable is required",
      });
    }

    const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;

    if (!subscriptionId) {
      return yield* new ConfigError({
        message: "AZURE_SUBSCRIPTION_ID environment variable is required",
      });
    }

    return {
      bearerToken: Redacted.make(bearerToken),
      subscriptionId,
      tenantId: process.env.AZURE_TENANT_ID,
      apiBaseUrl: process.env.AZURE_API_BASE_URL ?? DEFAULT_API_BASE_URL,
    };
  }),
);
