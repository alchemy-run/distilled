/**
 * `any`-collapsing re-export of `effect/Schema` for generated service files.
 *
 * This is the single, shared definition consumed by every code-generated
 * provider package via `@distilled.cloud/core/schema`. Do not copy it into
 * individual packages.
 *
 * Every real TYPE (`Schema`, `Codec`, `Top`, ...) is re-exported untouched, so
 * the `Schema.Schema<Foo>` annotations on generated consts (and the public
 * `.d.ts`) stay precise. The schema *construction surface* (`Struct`,
 * `optional`, `suspend`, ...) and the leaf scalar schemas are retyped to `any`,
 * so the compiler instantiates none of the heavy Schema generics while
 * building a service file -- the explicit annotations carry the real types.
 *
 * Overriding a *value* export never affects the same-named *type* export (they
 * live in separate namespaces and continue to flow through `export *`), so
 * `Schema.Literal<"x">`-style type usages remain precise.
 *
 * Runtime behaviour is identical. Every override aliases the exact same
 * runtime value from `effect/Schema`, except `suspend`, `Array` and
 * `Record`, which build the same schema lazily (see "Lazy schemas").
 */
// Types only: a value `export *` costs one binding per Effect Schema export
// (345 of them, ~70 KB) in every process that imports an SDK. The values
// generated and hand-written code use are re-exported explicitly below.
export type * from "effect/Schema";
export { declare, Duration, instanceOf, Redacted } from "effect/Schema";

import { pipeArguments } from "effect/Pipeable";
import * as S from "effect/Schema";

export type AnyFn = (...args: any[]) => any;

// Construction surface -- collapse to `any` so generics are never instantiated.
export const optional: AnyFn = S.optional as AnyFn;
export const Struct: AnyFn = S.Struct as AnyFn;
export const StructWithRest: AnyFn = S.StructWithRest as AnyFn;
export const suspend: AnyFn = (f: () => S.Top) => lazySuspend(f);
export const Array: AnyFn = (item: S.Top) => lazyArray(item);
export const Record: AnyFn = (key: S.Top, value: S.Top) => lazyRecord(key, value);
export const Union: AnyFn = S.Union as AnyFn;
export const Literal: AnyFn = S.Literal as AnyFn;
export const Literals: AnyFn = S.Literals as AnyFn;
export const NullOr: AnyFn = S.NullOr as AnyFn;
export const Tuple: AnyFn = S.Tuple as AnyFn;
export const encodeKeys: AnyFn = S.encodeKeys as AnyFn;

// Leaf schemas -- collapse to `any` so `.pipe(...)` on them is free.
export const String: any = S.String;
export const Number: any = S.Number;
export const Boolean: any = S.Boolean;
export const Date: any = S.Date;
export const Unknown: any = S.Unknown;
export const Null: any = S.Null;
export const Void: any = S.Void;
export const Any: any = S.Any;

// NOTE: `Schema` / `Codec` (types) are intentionally NOT overridden -- they
// flow through `export *` with real types so cast targets stay precise.
// `TaggedError` is overridden with the same type (see "Lazy error classes").

//#region Lazy schemas

/**
 * Schemas whose real Effect schema is built on first use instead of at
 * import.
 *
 * A service module declares every schema as a top-level const, and
 * importing it constructs all of them: EC2 has 2,575 `S.suspend(...)` and
 * 784 `S.Array(...)` consts, Elasticsearch 3,272 and 2,265. An Effect schema
 * is a function object plus an AST node (a `suspend` also a wrapper
 * closure), and `.annotate` copies both: about 550 bytes per suspend, more
 * for an array whose item it forces. A lazy schema is one small object
 * holding how to build the real one and any annotations added before then:
 * about 180 bytes.
 *
 * It inherits Effect's own schema prototype, so `pipe`, `annotate`, `make`,
 * `isSchema` and every combinator see a schema. On first use of `.ast` (or
 * of an own member such as an array's `value`) it builds the real schema --
 * `build().annotate(annotations)`, exactly what eager code would have made --
 * and copies the real schema's own properties onto itself, so from then on
 * it IS that schema: same AST (memoized, stable identity), same rebuild
 * options for later `.annotate` / `.check` calls.
 */
const SchemaProto: object = /*@__PURE__*/ Object.getPrototypeOf(S.String);
const buildKey = /*@__PURE__*/ Symbol.for("@distilled.cloud/core/schema/build");
const annotationsKey = /*@__PURE__*/ Symbol.for("@distilled.cloud/core/schema/annotations");

type Annotations = Record<string, unknown>;

/**
 * How a lazy schema builds itself: a closure, or a shared builder plus data
 * stored on the schema object (no closure per schema; see packed.ts).
 */
export interface LazyBuilder {
  readonly build: (data: unknown) => S.Top;
}
const dataKey = /*@__PURE__*/ Symbol.for("@distilled.cloud/core/schema/data");

interface LazySchema {
  [buildKey]?: (() => S.Top) | LazyBuilder;
  [dataKey]?: unknown;
  [annotationsKey]?: Annotations;
}

/** Build the real schema and become it. */
const force = (self: LazySchema): void => {
  const build = self[buildKey];
  if (!build) return;
  const annotations = self[annotationsKey];
  const built = typeof build === "function" ? build() : build.build(self[dataKey]);
  const real = annotations ? built.annotate(annotations) : built;
  delete self[buildKey];
  delete self[dataKey];
  delete self[annotationsKey];
  Object.defineProperties(self, Object.getOwnPropertyDescriptors(real));
};

/** Members a built schema carries as own properties (array item, record key/value). */
const forwarded = (name: string): PropertyDescriptor => ({
  configurable: true,
  get(this: LazySchema & Record<string, unknown>) {
    if (!this[buildKey]) return undefined;
    force(this);
    return this[name];
  },
});

const LazyProto: object = /*@__PURE__*/ Object.create(SchemaProto, {
  ast: /*@__PURE__*/ forwarded("ast"),
  value: /*@__PURE__*/ forwarded("value"),
  key: /*@__PURE__*/ forwarded("key"),
  annotate: {
    configurable: true,
    writable: true,
    value(this: LazySchema, annotations: Annotations) {
      const build = this[buildKey];
      // Once built, annotate like any schema (a rebuilt copy).
      if (!build) return (SchemaProto as { annotate: Function }).annotate.call(this, annotations);
      const previous = this[annotationsKey];
      return lazy(build, previous ? { ...previous, ...annotations } : annotations, this[dataKey]);
    },
  },
});

// Effect detects schemas by this key on the prototype; if a future Effect
// moves it, build eagerly.
const supported = (SchemaProto as Record<string, unknown>)["~effect/Schema/Schema"] !== undefined;

const lazy = (
  build: (() => S.Top) | LazyBuilder,
  annotations?: Annotations,
  data?: unknown,
): S.Top => {
  if (!supported) {
    const built = typeof build === "function" ? build() : build.build(data);
    return annotations ? built.annotate(annotations) : built;
  }
  const self = Object.create(LazyProto);
  self[buildKey] = build;
  if (data !== undefined) self[dataKey] = data;
  if (annotations) self[annotationsKey] = annotations;
  return self;
};

/** A schema built on first use by `builder.build(data)`. */
export const lazyFrom = (builder: LazyBuilder, data: unknown): S.Top =>
  lazy(builder, undefined, data);

const lazySuspend = (f: () => S.Top): S.Top => lazy(() => S.suspend(f));
const lazyArray = (item: S.Top): S.Top => lazy(() => S.Array(item));
const lazyRecord = (key: S.Top, value: S.Top): S.Top => lazy(() => S.Record(key as any, value));

//#endregion

//#region Lazy error classes

/**
 * `S.TaggedError` whose Effect class is built on first use instead of at
 * import.
 *
 * Every error class Effect builds carries its own copies of about fifteen
 * static methods plus a tagged struct schema: about 4.6 KB per class, and
 * AWS EC2 alone declares 248 of them. This returns a small constructor that
 * stands in for the class until something needs it -- constructing an
 * instance, or a schema static such as `ast` / `fields` / `make`. Then it
 * builds the real class with `S.TaggedError` and puts it underneath: the
 * lazy class's prototype starts inheriting from the real prototype, and
 * statics forward to the real class with `this` bound to the lazy class, so
 * decoding produces instances of the lazy class (and of its subclasses).
 *
 * `pipe` (used to attach error categories), `identifier` and the schema
 * marker answer without building. Instances behave as before: same
 * `_tag`, fields, validation, `instanceof`, stack and `Effect.catchTag`.
 */
const lazyErrorKey = /*@__PURE__*/ Symbol.for("@distilled.cloud/core/schema/lazyError");

interface LazyErrorState {
  readonly identifier: string | undefined;
  readonly args: ReadonlyArray<unknown>;
  readonly lazy: Function;
  real?: Function;
}

const SchemaTypeId = "~effect/Schema/Schema";

// The base every Effect error class extends (`core.Error`, a yieldable
// Error). Found on first use, so bundles without error classes do not keep
// Effect's class machinery.
let errorBase: Function | undefined;
const ErrorBase = (): Function =>
  (errorBase ??= Object.getPrototypeOf(S.TaggedError()("Probe", {})) as Function);

const realErrorClass = (cls: Function): Function => {
  const state = (cls as unknown as Record<symbol, LazyErrorState>)[lazyErrorKey];
  if (!state.real) {
    const real = (S.TaggedError as Function)(state.identifier)(...state.args) as Function;
    state.real = real;
    Object.setPrototypeOf(state.lazy.prototype, real.prototype);
  }
  return state.real;
};

/** Effect's class statics that need the real class. */
const FORWARDED_STATICS = [
  "ast",
  "fields",
  "make",
  "makeOption",
  "makeEffect",
  "annotate",
  "annotateKey",
  "check",
  "rebuild",
  "extend",
  "mapFields",
];

let lazyErrorStatics: object | undefined;
const LazyErrorStatics = (): object =>
  (lazyErrorStatics ??= Object.create(ErrorBase(), {
    [SchemaTypeId]: { value: SchemaTypeId, configurable: true },
    identifier: {
      configurable: true,
      get(this: Record<symbol, LazyErrorState>) {
        const state = this[lazyErrorKey];
        return state.identifier ?? state.args[0];
      },
    },
    pipe: {
      configurable: true,
      writable: true,
      value(this: unknown) {
        return pipeArguments(this, arguments);
      },
    },
    ...Object.fromEntries(
      FORWARDED_STATICS.map((name) => [
        name,
        {
          configurable: true,
          get(this: Function) {
            let owner: object | null = realErrorClass(this);
            let descriptor: PropertyDescriptor | undefined;
            while (owner && !(descriptor = Object.getOwnPropertyDescriptor(owner, name))) {
              owner = Object.getPrototypeOf(owner);
            }
            if (!descriptor) return undefined;
            if (descriptor.get) return descriptor.get.call(this);
            return typeof descriptor.value === "function"
              ? descriptor.value.bind(this)
              : descriptor.value;
          },
        },
      ]),
    ),
  }));

const lazyTaggedError =
  (identifier?: string) =>
  (...args: ReadonlyArray<unknown>): Function => {
    function LazyTaggedError(this: unknown, input?: unknown, options?: unknown) {
      if (!new.target) throw new TypeError("Class constructor cannot be invoked without 'new'");
      return Reflect.construct(realErrorClass(new.target), [input, options], new.target);
    }
    Object.setPrototypeOf(LazyTaggedError, LazyErrorStatics());
    LazyTaggedError.prototype = Object.create(ErrorBase().prototype, {
      constructor: { value: LazyTaggedError, writable: true, configurable: true },
    });
    const state: LazyErrorState = { identifier, args, lazy: LazyTaggedError };
    Object.defineProperty(LazyTaggedError, lazyErrorKey, { value: state });
    return LazyTaggedError;
  };

export const TaggedError: typeof S.TaggedError = lazyTaggedError as typeof S.TaggedError;

//#endregion
