/**
 * OpenRouter credentials — hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol resolves it per request on the
 * calling fiber, so context-provided credentials are always picked up).
 *
 * OpenRouter issues two kinds of key, both sent as `Authorization: Bearer`:
 *
 * - an **API key** (`OPENROUTER_API_KEY`) for inference and everything an
 *   application does at runtime — chat completions, responses, messages,
 *   embeddings, images, generations, files, presets, …
 * - a **management key** (`OPENROUTER_MANAGEMENT_KEY`, a.k.a. provisioning
 *   key) for account administration — API keys, guardrails, workspaces, BYOK,
 *   credits, analytics, … Management keys cannot call the inference
 *   endpoints.
 *
 * The protocol picks the key per operation from its route (see
 * `MANAGEMENT_ROUTE_PREFIXES` in protocol.ts), falling back to whichever key
 * is configured. Public endpoints (`listModels`, `listProviders`, …) work
 * with no key at all.
 *
 * `referer` / `title` are OpenRouter's optional app-attribution headers
 * (`HTTP-Referer`, `X-Title`), used to rank and identify your app.
 */
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";

export const DEFAULT_API_BASE_URL = "https://openrouter.ai/api/v1";

export interface Config {
  /** Inference API key (`sk-or-v1-…`). */
  readonly apiKey?: Redacted.Redacted<string>;
  /** Management (provisioning) key for the account-administration routes. */
  readonly managementKey?: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
  /** Sent as `HTTP-Referer` — your app's URL, for OpenRouter attribution. */
  readonly referer?: string;
  /** Sent as `X-Title` — your app's display name, for OpenRouter attribution. */
  readonly title?: string;
}

export class Credentials extends Context.Service<Credentials, Effect.Effect<Config>>()(
  "OpenRouterCredentials",
) {}

/** Credentials layer from explicit (redacted) keys + optional settings. */
export const credentials = (config: {
  readonly apiKey?: Redacted.Redacted<string>;
  readonly managementKey?: Redacted.Redacted<string>;
  readonly apiBaseUrl?: string;
  readonly referer?: string;
  readonly title?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      apiKey: config.apiKey,
      managementKey: config.managementKey,
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
      referer: config.referer,
      title: config.title,
    }),
  );

/** Credentials layer from an inference API key alone. */
export const fromApiKey = (
  apiKey: Redacted.Redacted<string>,
  options: {
    readonly apiBaseUrl?: string;
    readonly referer?: string;
    readonly title?: string;
  } = {},
): Layer.Layer<Credentials> => credentials({ ...options, apiKey });

/** Credentials layer from a management (provisioning) key alone. */
export const fromManagementKey = (
  managementKey: Redacted.Redacted<string>,
  options: {
    readonly apiBaseUrl?: string;
    readonly referer?: string;
    readonly title?: string;
  } = {},
): Layer.Layer<Credentials> => credentials({ ...options, managementKey });

const env = (name: string): string | undefined => {
  const value = process.env[name];
  return value !== undefined && value.length > 0 ? value : undefined;
};

/**
 * Reads `OPENROUTER_API_KEY` and `OPENROUTER_MANAGEMENT_KEY` (both optional —
 * set whichever the operations you call need), `OPENROUTER_BASE_URL`
 * (default {@link DEFAULT_API_BASE_URL}), and the attribution headers
 * `OPENROUTER_HTTP_REFERER` / `OPENROUTER_X_TITLE`. Read on every request.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  Effect.sync(() => {
    const apiKey = env("OPENROUTER_API_KEY");
    const managementKey = env("OPENROUTER_MANAGEMENT_KEY");
    return {
      apiKey: apiKey !== undefined ? Redacted.make(apiKey) : undefined,
      managementKey: managementKey !== undefined ? Redacted.make(managementKey) : undefined,
      apiBaseUrl: env("OPENROUTER_BASE_URL") ?? DEFAULT_API_BASE_URL,
      referer: env("OPENROUTER_HTTP_REFERER"),
      title: env("OPENROUTER_X_TITLE"),
    };
  }),
);
