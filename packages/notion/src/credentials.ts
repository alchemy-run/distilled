import { ConfigError } from "@distilled.cloud/core/errors";
/**
 * Notion credentials — hand-written.
 *
 * The `Credentials` service resolves `{ token, apiBaseUrl, notionVersion }`
 * per request; the protocol layer formats the `Authorization: Bearer
 * <token>` and `Notion-Version` headers from it. The token is an internal
 * integration secret, a personal access token, or an OAuth access token.
 *
 * Notion requires the `Notion-Version` header on every request. It defaults
 * to the version this package is generated against.
 */
import * as EffectConfig from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

/** The API root (the spec's `servers` entry; routes carry `/v1`). */
export const DEFAULT_API_BASE_URL = "https://api.notion.com";

/** The `Notion-Version` this package is generated against. */
export const DEFAULT_NOTION_VERSION = "2026-03-11";

export interface Config {
  readonly token: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
  readonly notionVersion: string;
}

export class Credentials extends Context.Service<Credentials, Effect.Effect<Config>>()(
  "NotionCredentials",
) {}

const envConfig = EffectConfig.all({
  token: EffectConfig.Redacted("NOTION_TOKEN"),
  apiBaseUrl: EffectConfig.String("NOTION_API_BASE_URL").pipe(
    EffectConfig.withDefault(DEFAULT_API_BASE_URL),
  ),
  notionVersion: EffectConfig.String("NOTION_VERSION").pipe(
    EffectConfig.withDefault(DEFAULT_NOTION_VERSION),
  ),
});

/** Reads NOTION_TOKEN, and optionally NOTION_API_BASE_URL and NOTION_VERSION. */
export const CredentialsFromEnv = Layer.succeed(
  Credentials,
  envConfig.pipe(
    Effect.mapError(
      () =>
        new ConfigError({
          message: "NOTION_TOKEN environment variable is required",
        }),
    ),
    Effect.orDie,
  ),
);

/** Layer from a redacted token + optional base URL and API version. */
export const credentials = (config: {
  readonly token: Redacted.Redacted<string>;
  readonly apiBaseUrl?: string;
  readonly notionVersion?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      token: config.token,
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
      notionVersion: config.notionVersion ?? DEFAULT_NOTION_VERSION,
    }),
  );
