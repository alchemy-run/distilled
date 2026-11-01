/**
 * STACKIT OpenSearch and LogMe data plane helpers -- hand-written.
 *
 * Both services serve OpenSearch's REST API on each credential's URI, which takes the
 * credential's user and password as HTTP Basic. `services/opensearch_data` holds the
 * operations; this module holds what the spec can't: how a credential becomes
 * `OpenSearchCredentials`, and how `_bulk`'s newline-delimited body is written.
 */
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Effect from "effect/Effect";
import type * as Redacted from "effect/Redacted";
import type { OpenSearchConfig } from "./credentials.ts";

export { type OpenSearchConfig, OpenSearchCredentials } from "./credentials.ts";

/**
 * The API root for a credential's URI: a bare host gets `https://`, any user and
 * password are dropped, and so is a trailing slash. Returns `undefined` for something
 * that isn't a URL.
 */
export const opensearchApiUrl = (uri: string): string | undefined => {
  const withScheme = /^https?:\/\//.test(uri) ? uri : `https://${uri}`;
  if (!URL.canParse(withScheme)) return undefined;
  const url = new URL(withScheme);
  return `${url.origin}${url.pathname.replace(/\/+$/, "")}`;
};

/**
 * The `OpenSearchCredentials` value for one credential. The URI can hold the password,
 * so a failure doesn't quote it.
 */
export const opensearchCredentialsOf = (config: {
  readonly uri: string;
  readonly username: string;
  readonly password: Redacted.Redacted<string>;
}): Effect.Effect<OpenSearchConfig, ConfigError> => {
  const apiUrl = opensearchApiUrl(config.uri);
  return apiUrl === undefined
    ? Effect.fail(new ConfigError({ message: "An OpenSearch credential's URI is not a URL" }))
    : Effect.succeed({ apiUrl, username: config.username, password: config.password });
};

/**
 * Write `_bulk`'s body: one JSON value per line, ending in a newline, which OpenSearch
 * requires. Pass each action followed by its document, as the API lays them out.
 */
export const opensearchBulkBody = (lines: ReadonlyArray<unknown>): string =>
  lines.map((line) => `${JSON.stringify(line)}\n`).join("");
