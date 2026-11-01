/**
 * STACKIT Git data plane helpers -- hand-written.
 *
 * A Git instance serves Forgejo's REST API under its URL, which takes Forgejo's own users and
 * access tokens, not a STACKIT token. `services/git_forgejo` holds the operations; this module
 * holds what the spec can't: how an instance's URL and an identity become `ForgejoCredentials`.
 */
import { ConfigError } from "@distilled.cloud/core/errors";
import * as Effect from "effect/Effect";
import type { ForgejoAuth, ForgejoConfig } from "./credentials.ts";

export { type ForgejoAuth, type ForgejoConfig, ForgejoCredentials } from "./credentials.ts";

/** Forgejo's REST API prefix: the swagger's `basePath`, so the generated routes don't carry it. */
export const FORGEJO_API_PATH = "/api/v1";

/**
 * The API root for an instance's URL: a bare host gets `https://`, any user and password are
 * dropped, and so is a trailing slash. Returns `undefined` for something that isn't a URL.
 */
export const forgejoApiUrl = (instanceUrl: string): string | undefined => {
  const withScheme = /^https?:\/\//.test(instanceUrl) ? instanceUrl : `https://${instanceUrl}`;
  if (!URL.canParse(withScheme)) return undefined;
  const url = new URL(withScheme);
  return `${url.origin}${url.pathname.replace(/\/+$/, "")}${FORGEJO_API_PATH}`;
};

/** The `ForgejoCredentials` value for one identity on one instance. */
export const forgejoCredentialsOf = (config: {
  /** The instance's URL. */
  readonly instanceUrl: string;
  readonly auth: ForgejoAuth;
}): Effect.Effect<ForgejoConfig, ConfigError> => {
  const apiUrl = forgejoApiUrl(config.instanceUrl);
  return apiUrl === undefined
    ? Effect.fail(new ConfigError({ message: "A STACKIT Git instance's URL is not a URL" }))
    : Effect.succeed({ apiUrl, ...config.auth });
};
