/**
 * Retry Policy System
 *
 * Provides configurable retry policies for API operations.
 * Each SDK creates its own `Retry` Context.Service tag (via
 * `makeRetryService`) and threads it into `makeAPI({ retry: <SDK>.Retry })`
 * so that callers can install a blanket retry policy at the layer level
 * for that SDK without wrapping every call with `Effect.retry`.
 */
import * as Context from "effect/Context";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import { pipe } from "effect/Function";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Ref from "effect/Ref";
import * as Schedule from "effect/Schedule";
import { isThrottling, isTransientError } from "./category.ts";

// ============================================================================
// Retry Policy Types
// ============================================================================

/**
 * Retry policy options that match the Effect.retry contract.
 */
/**
 * Capped exponential backoff, as plain data: the built-in policies use this
 * instead of an Effect `Schedule`, so bundles do not carry the Schedule
 * machinery unless a caller supplies a schedule of their own.
 *
 * Delay before retry `n` (0-based): `min(baseMs * factor^n, capMs)`; a
 * server `retryAfter` hint replaces it when `serverHint` is set (capped by
 * {@link ServerRetryHintCapMs}); otherwise throttling errors wait at least
 * `minThrottleMs`. Then up to `jitterMs` of random jitter is added.
 */
export interface Backoff {
  readonly baseMs: number;
  readonly factor: number;
  readonly capMs: number;
  /** Stop after this many retries; unlimited when absent. */
  readonly maxRetries?: number;
  readonly jitterMs?: number;
  readonly minThrottleMs?: number;
  readonly serverHint?: boolean;
}

export interface Options {
  /**
   * Predicate to determine if an error should trigger a retry.
   */
  readonly while?: (error: unknown) => boolean;
  /**
   * The schedule to use for retrying.
   */
  readonly schedule?: Schedule.Schedule<unknown>;
  /** Used when no `schedule` is given. */
  readonly backoff?: Backoff;
}

/**
 * A factory function that creates retry policy options with access to the last error ref.
 * This allows dynamic policies that can inspect the last error for retry-after headers, etc.
 */
export type Factory = (lastError: Ref.Ref<unknown>) => Options;

/**
 * A retry policy can be either static options or a factory that receives the last error ref.
 */
export type Policy = Options | Factory;

// ============================================================================
// Retry Service Factory
// ============================================================================

/**
 * Create a typed Retry service class for an SDK.
 * Each SDK creates its own Retry service using this factory; the SDK's
 * client wraps `makeAPI` with `retry: <SDK>.Retry` so the policy applies
 * to every API call below it.
 *
 * @example
 * ```ts
 * // packages/<sdk>/src/retry.ts
 * export class Retry extends makeRetryService("PlanetScaleRetry") {}
 * ```
 */
export const makeRetryService = (name: string) => Context.Service<any, Policy>()(name);

// ============================================================================
// Retry Schedule Utilities
// ============================================================================

/**
 * Custom jittered schedule helper.
 * Adds random jitter between 0-50ms to avoid thundering herd.
 */
export const jittered = /*@__PURE__*/ Schedule.addDelay(() =>
  Effect.succeed(Duration.millis(Math.random() * 50)),
);

/**
 * Cap delay at a maximum duration.
 */
export const capped = (max: Duration.Duration) =>
  Schedule.modifyDelay(({ duration }) =>
    Effect.succeed(Duration.isGreaterThan(duration, max) ? max : duration),
  );

// ============================================================================
// Server Hint Helpers
// ============================================================================

/**
 * Default cap (milliseconds) on how long we'll honor a server-provided
 * `Retry-After` / `RateLimit` hint. A misbehaving server can otherwise park
 * us forever.
 */
export const DEFAULT_SERVER_RETRY_HINT_CAP_MS = 60_000;

const ENV_SERVER_RETRY_HINT_CAP_MS = "DISTILLED_SERVER_RETRY_HINT_CAP_MS";

/**
 * Optional override for the server-hint cap, in milliseconds. When provided
 * via `Layer.succeed(ServerRetryHintCapMs, n)`, that value wins over the
 * environment.
 *
 * @example
 * ```ts
 * Effect.retry(op, policy).pipe(
 *   Effect.provide(serverRetryHintCapLayer(120_000)),
 * )
 * ```
 */
export const ServerRetryHintCapMs = /*@__PURE__*/ Context.Service<number>(
  "@distilled.cloud/core/ServerRetryHintCapMs",
);

/**
 * Layer that pins the server `retryAfter` cap to a fixed value (milliseconds).
 */
export const serverRetryHintCapLayer = (capMs: number) =>
  Layer.succeed(ServerRetryHintCapMs, capMs);

/**
 * Effective cap when neither {@link ServerRetryHintCapMs} nor
 * `DISTILLED_SERVER_RETRY_HINT_CAP_MS` is set: {@link DEFAULT_SERVER_RETRY_HINT_CAP_MS}.
 *
 * Reads the `DISTILLED_SERVER_RETRY_HINT_CAP_MS` environment variable (must
 * be a non-negative finite number; invalid values fall back to the default).
 * It reads `process.env` directly: Effect's `Config` would add about 5 KB
 * gzip to every bundle for this one optional knob. Use
 * {@link ServerRetryHintCapMs} to set the cap from code.
 */
export const readServerRetryHintCapMsFromEnv = (): number =>
  parseCapMs(
    (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env?.[
      ENV_SERVER_RETRY_HINT_CAP_MS
    ],
  );

const parseCapMs = (raw: string | undefined): number => {
  if (raw === undefined || raw === "") return DEFAULT_SERVER_RETRY_HINT_CAP_MS;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? Math.trunc(n) : DEFAULT_SERVER_RETRY_HINT_CAP_MS;
};

/**
 * The `ConfigProvider` the caller provided, looked up by its context key.
 * Importing `effect/Config` / `effect/ConfigProvider` to read one optional
 * env var would add about 5 KB gzip to every bundle; a provider object
 * carries its own `load`, so neither module is needed.
 */
const CONFIG_PROVIDER_KEY = "effect/ConfigProvider";
interface ProvidedConfigProvider {
  readonly load: (
    path: ReadonlyArray<string>,
  ) => Effect.Effect<{ readonly _tag: string; readonly value?: string } | undefined, unknown>;
}

export const resolveServerRetryHintCapMs = (): Effect.Effect<number, never, never> =>
  Effect.gen(function* () {
    const fromLayer = yield* Effect.serviceOption(ServerRetryHintCapMs);
    if (Option.isSome(fromLayer)) {
      const n = fromLayer.value;
      if (Number.isFinite(n) && n >= 0) return Math.trunc(n);
    }
    const provider = (yield* Effect.context<never>()).mapUnsafe.get(CONFIG_PROVIDER_KEY) as
      | ProvidedConfigProvider
      | undefined;
    if (!provider) return readServerRetryHintCapMsFromEnv();
    const node = yield* provider
      .load([ENV_SERVER_RETRY_HINT_CAP_MS])
      .pipe(Effect.orElseSucceed(() => undefined));
    return parseCapMs(node?._tag === "Value" ? node.value : undefined);
  });

/**
 * Extract a server-provided retry hint (in milliseconds) from an error's
 * optional `retryAfter` field, capped by the effective server-hint cap
 * (see {@link ServerRetryHintCapMs} and {@link readServerRetryHintCapMsFromEnv}).
 *
 * Returns `undefined` when the error doesn't carry a hint.
 */
export const serverHintMillis = (error: unknown, capMs: number): number | undefined => {
  const hint = (error as { retryAfter?: unknown } | null | undefined)?.retryAfter;
  if (!Duration.isDuration(hint)) return undefined;
  return Math.min(Duration.toMillis(hint), capMs);
};

/**
 * Schedule modifier that honors `error.retryAfter` (set by the SDK's
 * `matchError` from `Retry-After` / `RateLimit` headers) with precedence
 * over the input delay. Falls back to the original delay when no hint is
 * present.
 */
const honorServerHint = (
  lastError: Ref.Ref<unknown>,
  baseline?: (duration: Duration.Duration, error: unknown) => Duration.Duration,
) =>
  Schedule.modifyDelay(
    Effect.fnUntraced(function* ({ duration }) {
      const capMs = yield* resolveServerRetryHintCapMs();
      const error = yield* Ref.get(lastError);
      const hint = serverHintMillis(error, capMs);
      if (hint !== undefined) return hint;
      const adjusted = baseline ? baseline(duration, error) : duration;
      return Duration.toMillis(adjusted);
    }),
  );

// ============================================================================
// Default Retry Policies
// ============================================================================

/**
 * Creates the default retry policy.
 *
 * This policy:
 * - Retries transient errors (throttling, server, network, locked errors)
 * - Honors `error.retryAfter` (server-provided hint) with precedence, capped
 *   by {@link DEFAULT_SERVER_RETRY_HINT_CAP_MS} by default; override with
 *   `DISTILLED_SERVER_RETRY_HINT_CAP_MS` or {@link ServerRetryHintCapMs}
 * - Otherwise uses exponential backoff starting at 250ms with a factor of 2,
 *   capped at 5s per delay
 * - Ensures at least 500ms delay for throttling errors
 * - Limits to 8 retry attempts
 * - Applies jitter to avoid thundering herd
 *
 * The 250ms/5s-cap/8-attempt shape (~20s of total patience) comes from
 * alchemy's Cloudflare provider suite, where transient auth blips under
 * high request concurrency routinely outlast a short 5-attempt/3s policy
 * while a genuinely broken credential still fails within seconds.
 */
/** The policy used when the context provides none. */
export const defaultOptions: Options = {
  while: (error) => isTransientError(error),
  backoff: {
    baseMs: 250,
    factor: 2,
    capMs: 5000,
    maxRetries: 8,
    jitterMs: 50,
    minThrottleMs: 500,
    serverHint: true,
  },
};

export const makeDefault: Factory = () => defaultOptions;

const slowBackoff: Backoff = {
  baseMs: 1000,
  factor: 2,
  capMs: 5000,
  jitterMs: 50,
  serverHint: true,
};
const slowBackoffNoHint: Backoff = { baseMs: 1000, factor: 2, capMs: 5000, jitterMs: 50 };

export const throttlingFactory: Factory = () => throttlingFactoryOptions;
const throttlingFactoryOptions: Options = {
  while: (error) => isThrottling(error),
  backoff: slowBackoff,
};

export const throttlingOptions: Options = {
  while: (error) => isThrottling(error),
  backoff: slowBackoffNoHint,
};

export const transientFactory: Factory = () => transientFactoryOptions;
const transientFactoryOptions: Options = { while: isTransientError, backoff: slowBackoff };

export const transientOptions: Options = { while: isTransientError, backoff: slowBackoffNoHint };
