/**
 * Environment configuration for credentials, endpoints and regions: the
 * small part of `effect/Config` that SDKs use, as plain Effects.
 *
 * Importing `effect/Config` costs about 280 KB of heap per process (it pulls
 * in ConfigProvider, Schema-based parsing and their dependencies), and every
 * SDK whose credentials read the environment paid it at import. These
 * readers do the same lookups without it:
 *
 * - When the caller provided a `ConfigProvider` (found by its context key),
 *   the value comes from that provider, so `ConfigProvider.fromUnknown(...)`
 *   in tests and custom providers on Workers keep working.
 * - Otherwise the value comes from `process.env`, which is what Effect's
 *   default provider reads.
 *
 * A missing variable fails with {@link ConfigMissing} (tag `ConfigError`, like
 * Effect's), which `withDefault`, `option` and `orElse` handle.
 *
 * Credentials read these on every request, so without a provider a whole
 * reader tree (`all`, `withDefault`, `orElse`, ...) runs as one synchronous
 * read of `process.env` in a single fiber step: each reader carries a plain
 * `read` function next to its effect, and the combinators compose those.
 * A missing value inside the tree is a plain marker; the tagged error is
 * only built if the whole tree fails.
 */
import * as Context from "effect/Context";
import * as Data from "effect/Data";
import * as Effect from "effect/Effect";
import * as Option from "effect/Option";
import * as Redact from "effect/Redacted";

/** A required configuration value is missing. */
export class ConfigMissing
  extends /*@__PURE__*/ Data.TaggedError("ConfigError")<{
    readonly name: string;
    readonly message: string;
  }> {}

const CONFIG_PROVIDER_KEY = "effect/ConfigProvider";

interface ProvidedConfigProvider {
  readonly load: (
    path: ReadonlyArray<string>,
  ) => Effect.Effect<{ readonly _tag: string; readonly value?: string } | undefined, unknown>;
}

const fromEnv = (name: string): string | undefined =>
  (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env?.[name];

/** A required value that is missing, inside a synchronous read. */
class Missing {
  constructor(readonly name: string) {}
}

/**
 * A synchronous read that cannot finish on its own (an `orElse` fallback
 * that is an arbitrary effect): the outermost reader runs its effect path.
 */
const DEFER: unique symbol = /*@__PURE__*/ Symbol("defer");
type Read<A> = A | Missing | typeof DEFER;

const readSymbol = /*@__PURE__*/ Symbol.for("@distilled.cloud/core/config/read");

/**
 * A reader: an effect, plus the same read as a plain function of
 * `process.env` (used when no `ConfigProvider` is in the context) and the
 * effect-based read used when one is (or when the read defers).
 */
interface Reader<A> {
  readonly read: () => Read<A>;
  readonly viaEffect: () => Effect.Effect<A, any, any>;
}

const readerOf = <A, E, R>(self: Effect.Effect<A, E, R>): Reader<A> | undefined =>
  (self as unknown as { [readSymbol]?: Reader<A> })[readSymbol];

// Looked up by its string key so `effect/ConfigProvider` stays out of bundles.
const providerKey = { key: CONFIG_PROVIDER_KEY } as Context.Key<never, ProvidedConfigProvider>;

const hasProvider = (context: Context.Context<never>): boolean =>
  Context.getOrUndefined(context, providerKey) !== undefined;

const missingError = (m: Missing) =>
  new ConfigMissing({ name: m.name, message: `Expected ${m.name} to be set` });

const fromReader = <A>(reader: Reader<A>): Effect.Effect<A, any, any> => {
  const effect = Effect.withFiber((fiber) => {
    if (hasProvider(fiber.context as Context.Context<never>)) return reader.viaEffect();
    const value = reader.read();
    if (value === DEFER) return reader.viaEffect();
    return value instanceof Missing ? Effect.fail(missingError(value)) : Effect.succeed(value);
  });
  (effect as unknown as { [readSymbol]: Reader<A> })[readSymbol] = reader;
  return effect;
};

/** The raw value of `name` from the provided `ConfigProvider`, or undefined when unset. */
const lookup = (name: string): Effect.Effect<string | undefined> =>
  Effect.flatMap(Effect.context<never>(), (context) => {
    const provider = context.mapUnsafe.get(CONFIG_PROVIDER_KEY) as
      | ProvidedConfigProvider
      | undefined;
    if (!provider) return Effect.succeed(fromEnv(name));
    return provider.load([name]).pipe(
      Effect.map((node) => (node?._tag === "Value" ? node.value : undefined)),
      Effect.orElseSucceed(() => undefined),
    );
  });

const required = (name: string): Effect.Effect<string, ConfigMissing> =>
  fromReader({
    read: () => fromEnv(name) ?? new Missing(name),
    viaEffect: () =>
      Effect.flatMap(lookup(name), (value) =>
        value === undefined ? Effect.fail(missingError(new Missing(name))) : Effect.succeed(value),
      ),
  }) as Effect.Effect<string, ConfigMissing>;

/** The string value of environment variable `name`. */
export const String = (name: string): Effect.Effect<string, ConfigMissing> => required(name);

/** The value of `name`, redacted. */
export const Redacted = (name: string): Effect.Effect<Redact.Redacted<string>, ConfigMissing> =>
  map((value: string) => Redact.make(value))(required(name));

/** The value as an `Option`: `None` when missing. */
export const option = <A, E, R>(
  self: Effect.Effect<A, E, R>,
): Effect.Effect<Option.Option<A>, never, R> => {
  const viaEffect = () =>
    Effect.catch(Effect.map(self, Option.some), () => Effect.succeed(Option.none<A>()));
  const reader = readerOf(self);
  if (!reader) return viaEffect();
  return fromReader({
    read: () => {
      const value = reader.read();
      if (value === DEFER) return DEFER;
      return value instanceof Missing ? Option.none<A>() : Option.some(value);
    },
    viaEffect,
  }) as Effect.Effect<Option.Option<A>, never, R>;
};

/** Use `value` when missing. */
export const withDefault =
  <B>(value: B) =>
  <A, E, R>(self: Effect.Effect<A, E, R>): Effect.Effect<A | B, never, R> => {
    const viaEffect = () => Effect.catch(self, () => Effect.succeed(value));
    const reader = readerOf(self);
    if (!reader) return viaEffect();
    return fromReader<A | B>({
      read: () => {
        const v = reader.read();
        return v instanceof Missing ? value : v;
      },
      viaEffect,
    }) as Effect.Effect<A | B, never, R>;
  };

/** Try `that` when missing. */
export const orElse =
  <A2, E2, R2>(that: () => Effect.Effect<A2, E2, R2>) =>
  <A, E, R>(self: Effect.Effect<A, E, R>): Effect.Effect<A | A2, E2, R | R2> => {
    const viaEffect = () => Effect.catch(self, () => that());
    const reader = readerOf(self);
    if (!reader) return viaEffect();
    return fromReader<A | A2>({
      read: () => {
        const v = reader.read();
        if (!(v instanceof Missing)) return v;
        const fallback = readerOf(that());
        return fallback ? fallback.read() : DEFER;
      },
      viaEffect,
    }) as Effect.Effect<A | A2, E2, R | R2>;
  };

export const map =
  <A, B>(f: (a: A) => B) =>
  <E, R>(self: Effect.Effect<A, E, R>): Effect.Effect<B, E, R> => {
    const reader = readerOf(self);
    if (!reader) return Effect.map(self, f);
    return fromReader({
      read: () => {
        const v = reader.read();
        return v === DEFER || v instanceof Missing ? v : f(v);
      },
      viaEffect: () => Effect.map(reader.viaEffect(), f),
    }) as Effect.Effect<B, E, R>;
  };

/** Read every value of a struct of readers. */
export const all = <const T extends Record<string, Effect.Effect<any, any, any>>>(
  readers: T,
): Effect.Effect<
  { -readonly [K in keyof T]: Effect.Success<T[K]> },
  Effect.Error<T[keyof T]>,
  Effect.Services<T[keyof T]>
> => {
  const viaEffect = () => Effect.all(readers) as any;
  const keys = Object.keys(readers);
  const parts = keys.map((k) => readerOf(readers[k]!));
  if (parts.some((r) => r === undefined)) return viaEffect();
  return fromReader({
    read: () => {
      const out: Record<string, unknown> = {};
      for (let i = 0; i < keys.length; i++) {
        const v = parts[i]!.read();
        if (v === DEFER || v instanceof Missing) return v;
        out[keys[i]!] = v;
      }
      return out;
    },
    viaEffect: viaEffect,
  }) as any;
};
