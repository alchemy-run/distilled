/**
 * OpenAI credentials — hand-written.
 *
 * The `Credentials` service holds an *effect* that resolves the current
 * credentials on every request (the protocol resolves it per request on the
 * calling fiber). OpenAI authenticates with `Authorization: Bearer <key>`
 * and has two kinds of key:
 *
 * - an **API key** (`OPENAI_API_KEY`, usually a project key `sk-proj-…`) for
 *   the inference and platform API — responses, chat, files, vector stores…
 * - an **Admin key** (`OPENAI_ADMIN_KEY`, `sk-admin-…`) for the Admin API —
 *   every `/organization/*` operation plus project roles/role assignments.
 *
 * Either may be omitted; the protocol picks the key per operation and fails
 * with `MissingCredentials` (naming the variable) when the one an operation
 * needs is not configured, rather than sending a request that would 401.
 */
import * as EffectConfig from "effect/Config";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import type * as Option from "effect/Option";
import * as Redacted from "effect/Redacted";

/** OpenAI's API root (the spec's `servers` entry). */
export const DEFAULT_API_BASE_URL = "https://api.openai.com/v1";

export interface Config {
  /** Inference/platform API key — `OPENAI_API_KEY`. */
  readonly apiKey?: Redacted.Redacted<string>;
  /** Admin API key — `OPENAI_ADMIN_KEY`; required by Admin-API operations. */
  readonly adminKey?: Redacted.Redacted<string>;
  readonly apiBaseUrl: string;
  /** Sent as `OpenAI-Organization` when set. */
  readonly organization?: string;
  /** Sent as `OpenAI-Project` when set. */
  readonly project?: string;
}

export class Credentials extends Context.Service<Credentials, Effect.Effect<Config>>()(
  "OpenAICredentials",
) {}

/** Layer from redacted keys + optional base URL / organization / project. */
export const credentials = (config: {
  readonly apiKey?: Redacted.Redacted<string>;
  readonly adminKey?: Redacted.Redacted<string>;
  readonly apiBaseUrl?: string;
  readonly organization?: string;
  readonly project?: string;
}): Layer.Layer<Credentials> =>
  Layer.succeed(
    Credentials,
    Effect.succeed({
      apiKey: config.apiKey,
      adminKey: config.adminKey,
      apiBaseUrl: config.apiBaseUrl ?? DEFAULT_API_BASE_URL,
      organization: config.organization,
      project: config.project,
    }),
  );

/** Layer from a single redacted API key (the common inference case). */
export const fromApiKey = (apiKey: Redacted.Redacted<string>): Layer.Layer<Credentials> =>
  credentials({ apiKey });

const optionalValue = <A>(o: Option.Option<A>): A | undefined =>
  o._tag === "Some" ? o.value : undefined;

const envConfig = EffectConfig.all({
  apiKey: EffectConfig.Redacted("OPENAI_API_KEY").pipe(EffectConfig.option),
  adminKey: EffectConfig.Redacted("OPENAI_ADMIN_KEY").pipe(EffectConfig.option),
  apiBaseUrl: EffectConfig.String("OPENAI_BASE_URL").pipe(
    EffectConfig.withDefault(DEFAULT_API_BASE_URL),
  ),
  organization: EffectConfig.String("OPENAI_ORGANIZATION").pipe(EffectConfig.option),
  project: EffectConfig.String("OPENAI_PROJECT").pipe(EffectConfig.option),
});

/**
 * Reads `OPENAI_API_KEY` and/or `OPENAI_ADMIN_KEY` (each optional — an
 * operation fails with `MissingCredentials` when the key it needs is
 * absent), `OPENAI_BASE_URL` (default {@link DEFAULT_API_BASE_URL}), and the
 * optional `OPENAI_ORGANIZATION` / `OPENAI_PROJECT` scoping headers — the
 * same variables the official OpenAI SDKs read.
 */
export const CredentialsFromEnv: Layer.Layer<Credentials> = Layer.succeed(
  Credentials,
  envConfig.pipe(
    Effect.map((env): Config => ({
      apiKey: optionalValue(env.apiKey),
      adminKey: optionalValue(env.adminKey),
      apiBaseUrl: env.apiBaseUrl.replace(/\/+$/, ""),
      organization: optionalValue(env.organization),
      project: optionalValue(env.project),
    })),
    // Every variable is optional or defaulted, so only a malformed value
    // can fail here — a defect, not a recoverable error.
    Effect.orDie,
  ),
);

/** Unwrap a key for the `Authorization` header (point of use only). */
export const bearer = (key: Redacted.Redacted<string>): string => `Bearer ${Redacted.value(key)}`;
