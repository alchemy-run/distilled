import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as ServiceMap from "effect/ServiceMap";
import { ConfigError } from "@distilled.cloud/core/errors";

export const DEFAULT_API_BASE_URL = "https://api.cdp.coinbase.com/platform";

export interface Config {
  /**
   * CDP API Key ID (UUID format or legacy `organizations/.../apiKeys/...` format).
   */
  readonly apiKeyId: string;

  /**
   * CDP API Key Secret (Ed25519 base64 or EC PEM private key).
   * Used to sign JWT bearer tokens for API authentication.
   */
  readonly apiKeySecret: string;

  /**
   * CDP Wallet Secret (base64-encoded DER EC private key).
   * Required only for sensitive wallet operations (POST/DELETE/PUT to account endpoints).
   * If not provided, wallet-auth-requiring operations will fail.
   */
  readonly walletSecret?: string | undefined;

  /**
   * Base URL for the Coinbase CDP API.
   * @default "https://api.cdp.coinbase.com/platform"
   */
  readonly apiBaseUrl: string;
}

export class Credentials extends ServiceMap.Service<Credentials, Config>()(
  "CoinbaseCredentials",
) {}

export const CredentialsFromEnv = Layer.effect(
  Credentials,
  Effect.gen(function* () {
    const apiKeyId = process.env.CDP_API_KEY_ID ?? process.env.CDP_API_KEY_NAME;
    const apiKeySecret = process.env.CDP_API_KEY_SECRET;
    const walletSecret = process.env.CDP_WALLET_SECRET;

    if (!apiKeyId) {
      return yield* new ConfigError({
        message:
          "CDP_API_KEY_ID (or CDP_API_KEY_NAME) environment variable is required",
      });
    }

    if (!apiKeySecret) {
      return yield* new ConfigError({
        message: "CDP_API_KEY_SECRET environment variable is required",
      });
    }

    return {
      apiKeyId,
      apiKeySecret,
      walletSecret,
      apiBaseUrl: DEFAULT_API_BASE_URL,
    };
  }),
);
