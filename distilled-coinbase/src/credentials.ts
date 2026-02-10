import { Context, Effect, Layer } from "effect";
import { ConfigError } from "./errors";

export const DEFAULT_API_BASE_URL = "https://api.cdp.coinbase.com/platform";

export interface Config {
  /** CDP API Key ID (used as JWT key id) */
  readonly apiKeyId: string;
  /** CDP API Key Secret (ES256 private key, used to sign JWTs) */
  readonly apiKeySecret: string;
  /** Optional wallet secret for signing wallet operations (X-Wallet-Auth) */
  readonly walletSecret?: string | undefined;
  /** API base URL */
  readonly apiBaseUrl: string;
}

export class Credentials extends Context.Tag("Credentials")<
  Credentials,
  Config
>() {}

export const CredentialsFromEnv = Layer.effect(
  Credentials,
  Effect.gen(function* () {
    const apiKeyId = process.env.COINBASE_API_KEY_ID;
    const apiKeySecret = process.env.COINBASE_API_KEY_SECRET;
    const walletSecret = process.env.COINBASE_WALLET_SECRET;

    if (!apiKeyId) {
      return yield* new ConfigError({
        message: "COINBASE_API_KEY_ID environment variable is required",
      });
    }

    if (!apiKeySecret) {
      return yield* new ConfigError({
        message: "COINBASE_API_KEY_SECRET environment variable is required",
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
