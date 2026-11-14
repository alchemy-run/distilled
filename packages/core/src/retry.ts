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
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Ref from "effect/Ref";
import * as Schedule from "effect/Schedule";
import { isThrottling, isTransientError } from "./category.ts";
import { successesOf } from "./retry-state.ts";

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
 * Delay before retry `n` (0-based), `t`:
 *
 * - with `fullJitter`: `random(0, 1) × min(capMs, base × factor^n)`, where
 *   `base` is `throttlingBaseMs` for throttling errors and `baseMs` otherwise;
 * - without it: `min(baseMs × factor^n, capMs)`, at least `minThrottleMs` for
 *   throttling errors, plus up to `jitterMs` of random jitter.
 *
 * With `serverHint`, the server can lengthen `t`:
 *
 * - a bounded hint (`x-amz-retry-after` or `x-distilled-retry-after`, in
 *   milliseconds) is clamped to `[t, t + 5s]` and used as is;
 * - otherwise `error.retryAfter` (`Retry-After` / `RateLimit`) is a minimum,
 *   as RFC 9110 defines it; a hint over the cap ({@link ServerRetryHintCapMs})
 *   stops retrying, because retrying earlier than the server asked fails again.
 *
 * With a `budget`, each retry withdraws from it and stops when it is empty.
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
  /** Base delay for throttling errors under `fullJitter`; `baseMs` when absent. */
  readonly throttlingBaseMs?: number;
  readonly fullJitter?: boolean;
  readonly budget?: Budget;
}

/** How far a bounded server hint may lengthen the computed delay. */
export const BOUNDED_HINT_MAX_EXTRA_MS = 5_000;

// ============================================================================
// Retry Budget
// ============================================================================

/**
 * A retry budget: one token bucket per key (the request's host). A retry
 * withdraws its cost; a successful response from that host adds one token,
 * up to `max`; a retry that succeeds gets its cost back. When a bucket
 * cannot pay, the call fails instead of retrying, so a failing dependency
 * sees about `1 / cost` extra load instead of `maxRetries` times its load.
 *
 * The bucket lives as long as the budget value. A policy defined at module
 * scope shares one budget across calls (and across Lambda invocations); a
 * policy built per call starts a fresh one each time.
 */
export interface Budget {
  /** Withdraw a retry's cost from `key`'s bucket; the cost, or `undefined` when it cannot pay. */
  readonly withdraw: (key: string, throttling: boolean) => number | undefined;
  /** Give back what a retry that succeeded withdrew. */
  readonly refund: (key: string, cost: number) => void;
  /** Tokens left in `key`'s bucket. */
  readonly tokens: (key: string) => number;
  /** Return every bucket to its initial tokens. */
  readonly reset: () => void;
}

export interface BudgetOptions {
  /** Tokens a new bucket starts with. Default 100: 7 transient or 20 throttling retries. */
  readonly initial?: number;
  /** Most tokens a bucket holds. Default 500. */
  readonly max?: number;
  /** Cost of retrying a non-throttling error. Default 14. */
  readonly transientCost?: number;
  /** Cost of retrying a throttling error. Default 5. */
  readonly throttlingCost?: number;
}

/**
 * The AWS SDKs' retry quota (Retry Behavior 2.1: 500 tokens, a transient
 * retry costs 14, a throttling retry 5, a success adds 1), except that a
 * bucket starts with 100 tokens instead of full: many short-lived clients,
 * each starting full, would together retry a failing service at nearly
 * `maxRetries` times its load.
 */
export const makeBudget = (options: BudgetOptions = {}): Budget => {
  const initial = options.initial ?? 100;
  const max = options.max ?? 500;
  const transientCost = options.transientCost ?? 14;
  const throttlingCost = options.throttlingCost ?? 5;
  const buckets = new Map<string, { tokens: number; seen: number }>();
  const bucket = (key: string) => {
    const seen = successesOf(key);
    let b = buckets.get(key);
    if (b === undefined) {
      b = { tokens: initial, seen };
      buckets.set(key, b);
    } else if (seen !== b.seen) {
      // Successes since the last look, one token each.
      b.tokens = Math.min(max, b.tokens + (seen - b.seen));
      b.seen = seen;
    }
    return b;
  };
  return {
    withdraw: (key, throttling) => {
      const b = bucket(key);
      const cost = throttling ? throttlingCost : transientCost;
      if (b.tokens < cost) return undefined;
      b.tokens -= cost;
      return cost;
    },
    refund: (key, cost) => {
      const b = bucket(key);
      // The success itself already added a token.
      b.tokens = Math.min(max, b.tokens + cost - 1);
    },
    tokens: (key) => bucket(key).tokens,
    reset: () => buckets.clear(),
  };
};

/**
 * The budget of the default policy, shared by every SDK in this process.
 * Its buckets are keyed by host, so one failing service does not use up the
 * retries of another.
 */
export const defaultBudget: Budget = /*@__PURE__*/ makeBudget();

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

// ============================================================================
// Default Retry Policies
// ============================================================================

/**
 * The policy used when the context provides none, tuned for calls at
 * runtime (a request handler, a Lambda) after AWS's Retry Behavior 2.1:
 *
 * - retries only errors marked retryable (see `isTransientError`);
 * - at most 2 retries (3 attempts);
 * - full jitter: `random(0, 1) × min(20s, base × 2^n)`, base 50ms, or 1s
 *   for throttling errors;
 * - honors server hints (see {@link Backoff});
 * - draws from {@link defaultBudget}.
 *
 * Deploy tools that should wait out longer outages install their own
 * policy, for example {@link transientFactory}.
 */
export const defaultOptions: Options = {
  while: (error) => isTransientError(error),
  backoff: {
    baseMs: 50,
    throttlingBaseMs: 1000,
    factor: 2,
    capMs: 20_000,
    maxRetries: 2,
    fullJitter: true,
    serverHint: true,
    budget: defaultBudget,
  },
};

export const makeDefault: Factory = () => defaultOptions;

/**
 * A model's `distilled.retry#policy` trait: numbers that replace the default
 * policy's for a service or an operation. What retries still comes from the
 * error's marks.
 */
export interface RetryOverride {
  /** Attempts in total, the first included. */
  readonly maxAttempts?: number;
  readonly baseMs?: number;
  readonly throttlingBaseMs?: number;
  readonly capMs?: number;
}

const overridden = new WeakMap<RetryOverride, Options>();

/** {@link defaultOptions} with `override`'s numbers, memoized per override object. */
export const defaultWith = (override: RetryOverride): Options => {
  const cached = overridden.get(override);
  if (cached !== undefined) return cached;
  const backoff = defaultOptions.backoff!;
  const result: Options = {
    ...defaultOptions,
    backoff: {
      ...backoff,
      ...(override.maxAttempts !== undefined ? { maxRetries: override.maxAttempts - 1 } : {}),
      ...(override.baseMs !== undefined ? { baseMs: override.baseMs } : {}),
      ...(override.throttlingBaseMs !== undefined
        ? { throttlingBaseMs: override.throttlingBaseMs }
        : {}),
      ...(override.capMs !== undefined ? { capMs: override.capMs } : {}),
    },
  };
  overridden.set(override, result);
  return result;
};

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
