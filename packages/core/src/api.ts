import * as Context from "effect/Context";
import type * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import type * as HttpClientRequest from "effect/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import { pipeArguments } from "effect/Pipeable";
import * as Ref from "effect/Ref";
import * as S from "effect/Schema";
import type * as AST from "effect/SchemaAST";
import * as Scope from "effect/Scope";
import type * as Stream from "effect/Stream";
import { SingleShotGen } from "effect/Utils";
import { isThrottling } from "./category.ts";
import * as Pagination from "./pagination.ts";
import {
  type Backoff,
  defaultOptions,
  type Options as RetryOptions,
  type Policy as RetryPolicy,
  resolveServerRetryHintCapMs,
  serverHintMillis,
} from "./retry.ts";

//#region Protocol

/**
 * The view of an operation's config that protocols receive on every
 * encode/decode call. The object is the same memoized config instance for
 * every call to a given operation, so protocols can key per-operation
 * preprocessing (handler construction, error maps) off its identity in a
 * WeakMap.
 */
export interface ProtocolOperationConfig {
  readonly input?: S.Top;
  readonly output?: S.Top;
  readonly errors?: ReadonlyArray<ApiErrorClass>;
  /**
   * The wire operation name (e.g. the Smithy operation shape name). RPC-style
   * protocols address operations by name (AWS JSON's `X-Amz-Target`, AWS
   * Query's `Action=`) and unwrap responses by it; REST protocols ignore it.
   */
  readonly operationName?: string;
  /**
   * The smithy `smithy.api#endpoint` hostPrefix (e.g. `sync-` for Step
   * Functions' StartSyncExecution). Protocols prepend it to the resolved
   * endpoint host, substituting `{memberName}` labels from the input.
   */
  readonly endpointHostPrefix?: string;
  readonly pagination?: Pagination.PaginatedTrait;
}

/**
 * The Protocol service knows how to turn a value into an HTTP request using
 * only the input schema's trait annotations, and how to turn a response back
 * into an output value using the output schema's trait annotations.
 *
 * Swap implementations by providing a different `Layer<Protocol>`.
 */
export class Protocol
  extends /*@__PURE__*/ Context.Service<
    Protocol,
    {
      readonly encode: (args: {
        readonly input: unknown;
        readonly inputAst: AST.AST;
        /** The operation's config (memoized per operation -- see {@link ProtocolOperationConfig}). */
        readonly config: ProtocolOperationConfig;
      }) => Effect.Effect<HttpClientRequest.HttpClientRequest>;
      readonly decode: (args: {
        readonly response: HttpClientResponse.HttpClientResponse;
        readonly outputAst: AST.AST;
        /**
         * The operation's declared error classes (from `OperationConfig.errors`).
         * Protocols use these to surface wire failures as the operation's typed
         * errors -- e.g. by consulting matcher metadata stamped on the class.
         */
        readonly errors: ReadonlyArray<ApiErrorClass>;
        /** The operation's config (memoized per operation -- see {@link ProtocolOperationConfig}). */
        readonly config: ProtocolOperationConfig;
      }) => Effect.Effect<unknown>;
      /**
       * Optional whole-call implementation. When present, `API.make` runs a
       * call as `call(operation, input)` instead of encode -> HttpClient ->
       * decode, so a protocol can read the context once, build the request
       * synchronously and decode the response without intermediate effects.
       * It must read the `HttpClient` from the calling fiber's context and
       * produce the same request, result and errors as encode/decode.
       */
      readonly call?: (operation: PreparedOperation, input: unknown) => Effect.Effect<unknown>;
    }
  >()("Protocol") {}

/** The service a protocol layer provides. */
export type ProtocolShape = (typeof Protocol)["Service"];

/**
 * One operation as a protocol's {@link Protocol.call} sees it. Built once per
 * operation on its first call; the same object is passed on every call.
 */
export interface PreparedOperation {
  readonly config: ProtocolOperationConfig;
  readonly inputAst: AST.AST;
  readonly outputAst: AST.AST;
  readonly errors: ReadonlyArray<ApiErrorClass>;
  /** Per-operation slot owned by the operation's protocol (compiled codecs). */
  compiled?: unknown;
}

//#endregion

//#region Make

/**
 * Run `f` on the value of `effect` -- directly when `effect` is already a
 * successful `Exit` (e.g. a `Credentials` service holding
 * `Effect.succeed(config)`), so a resolved value costs no fiber step.
 */
export const withValue = <A, B>(
  effect: Effect.Effect<A, any, any>,
  f: (a: A) => Effect.Effect<B, any, any>,
): Effect.Effect<B, any, any> =>
  Exit.isExit(effect)
    ? Exit.isSuccess(effect)
      ? f(effect.value as A)
      : (effect as unknown as Effect.Effect<never, any>)
    : Effect.flatMap(effect, f);

export type ApiErrorClass = {
  new (...args: any[]): {
    readonly _tag: string;
    readonly message: string;
  };
};

/**
 * The shape of a generated SDK operation -- usable two ways (mirrors the
 * distilled repo's OperationMethod):
 *
 * 1. Direct call: `yield* operation(input)` -- an Effect with requirements.
 * 2. Yield first: `const fn = yield* operation` -- captures the current
 *    context and returns a requirement-free call function.
 *
 * Generated service files annotate every exported operation with this type
 * explicitly (against their hand-emitted interfaces), so the compiler never
 * has to infer it back out of the schema generics.
 */
export type OperationMethod<I, O, E, R> = Effect.Effect<
  (input: I) => Effect.Effect<O, E, never>,
  never,
  R
> &
  ((input: I) => Effect.Effect<O, E, R>) &
  OperationSchemas<I, O>;

/**
 * An operation's request and response schemas, built on first access.
 * Generated modules export operations, errors and types; the schemas
 * themselves are module-private, so this is how to reach them as values.
 */
export interface OperationSchemas<I, O> {
  readonly input: S.Codec<I, any>;
  readonly output: S.Codec<O, any>;
}

// NOTE: request/response ASTs are handed to the protocol RAW (Suspend nodes
// included). Pre-resolving Suspends here would drop annotations that sit on
// intermediate nodes -- e.g. a bare-payload response whose payload type is
// itself a suspended schema carries its EnvelopePayloadRoot marker on the
// inner Suspend, and unwrapping it silently degrades decode to the struct
// path. The protocol helpers (core/protocol-http getAnn/getProps) descend
// Suspends themselves, and `Suspend.thunk` memoizes, so raw ASTs cost
// nothing extra.

/**
 * Protocol layers are built once per process and shared by every operation
 * call (keyed by layer value identity -- generated operations all reference the
 * same module-level layer const). The build runs against a process-lifetime
 * scope, and concurrent first calls are deduplicated through a private
 * MemoMap.
 *
 * Contract for protocol implementations: the layer build must not capture
 * per-call context. Anything call-dependent -- credentials, per-request
 * options -- must be resolved inside `encode`/`decode`, which execute on the
 * calling fiber and therefore see the caller's services on every request.
 */
const protocolMemoMap = /*@__PURE__*/ Layer.makeMemoMapUnsafe();
const protocolScope = /*@__PURE__*/ Scope.makeUnsafe();
const protocolContexts = /*@__PURE__*/ new WeakMap<
  Layer.Layer<Protocol, any, any>,
  Context.Context<Protocol>
>();

const protocolContext = <PE, PR>(
  layer: Layer.Layer<Protocol, PE, PR>,
): Effect.Effect<Context.Context<Protocol>, PE, PR> => {
  const cached = protocolContexts.get(layer);
  if (cached) return Effect.succeed(cached);
  return Effect.map(Layer.buildWithMemoMap(layer, protocolMemoMap, protocolScope), (ctx) => {
    protocolContexts.set(layer, ctx);
    return ctx;
  });
};

export interface OperationConfig<
  I extends S.Top,
  O extends S.Top,
  PE,
  PR,
  E extends readonly ApiErrorClass[] = readonly ApiErrorClass[],
> {
  input?: I;
  output?: O;
  errors?: E;
  /**
   * The protocol layer that knows how to encode/decode this operation's wire
   * format. Built once per process and shared across all operations that
   * reference the same layer value -- it must resolve call-dependent services
   * (credentials etc.) inside encode/decode, not at build time.
   */
  protocol: Layer.Layer<Protocol, PE, PR>;
  /**
   * SDK-specific retry service tag (see `core/retry`). When provided and the
   * caller's context carries a policy under this tag, every call is retried
   * per that policy (e.g. `Layer.succeed(Cloudflare.Retry.Retry, factory)`).
   */
  retry?: Context.Key<any, RetryPolicy>;
  /**
   * The wire operation name for RPC-style protocols (see
   * {@link ProtocolOperationConfig.operationName}).
   */
  operationName?: string;
  /**
   * Host prefix from the smithy endpoint trait (see
   * {@link ProtocolOperationConfig.endpointHostPrefix}).
   */
  endpointHostPrefix?: string;
}

/**
 * Wrap one operation call with the caller-provided retry policy, if the
 * operation declares a retry tag and the context carries a policy for it.
 */
/** Delay before retry `attempt` (0-based) under `b`, in milliseconds. */
const backoffDelay = (b: Backoff, attempt: number, error: unknown): Effect.Effect<number> => {
  const base = Math.min(b.baseMs * b.factor ** attempt, b.capMs);
  const jitter = () => Math.random() * (b.jitterMs ?? 0);
  if (b.serverHint && (error as { retryAfter?: unknown } | null)?.retryAfter !== undefined) {
    return Effect.map(resolveServerRetryHintCapMs(), (capMs) => {
      const hint = serverHintMillis(error, capMs);
      return (hint ?? base) + jitter();
    });
  }
  const floored =
    b.minThrottleMs !== undefined && base < b.minThrottleMs && isThrottling(error)
      ? b.minThrottleMs
      : base;
  return Effect.succeed(floored + jitter());
};

const NO_BACKOFF: Backoff = { baseMs: 0, factor: 1, capMs: 0 };

/**
 * Wrap one operation call with the caller-provided retry policy, if the
 * operation declares a retry tag. The call runs once with no retry
 * machinery; the policy is read only after a failure. Built-in policies are
 * {@link Backoff} data run by a small loop; a caller-supplied `schedule`
 * runs under `Effect.retry`, with the first failure replayed as attempt one
 * so delays and counts match running the whole call under it.
 */
const applyRetry = (
  base: Effect.Effect<any, any, any>,
  retryKey: Context.Key<any, RetryPolicy> | undefined,
): Effect.Effect<any, any, any> =>
  retryKey === undefined
    ? base
    : Effect.catch(base, (error) =>
        Effect.flatMap(Effect.serviceOption(retryKey), (opt) => {
          if (Option.isNone(opt)) return retryWith(base, defaultOptions, error);
          const policy = opt.value;
          if (typeof policy !== "function") return retryWith(base, policy, error);
          return Effect.flatMap(Ref.make<unknown>(error), (lastError) =>
            retryWith(
              Effect.tapError(base, (e) => Ref.set(lastError, e)),
              policy(lastError),
              error,
            ),
          );
        }),
      );

const retryWith = (
  base: Effect.Effect<any, any, any>,
  opts: RetryOptions,
  error: unknown,
): Effect.Effect<any, any, any> => {
  const keepGoing = opts.while;
  if (!keepGoing || !keepGoing(error)) return Effect.fail(error);
  if (opts.schedule) {
    // Drive the caller's schedule through its own `step`, as Effect.retry
    // does, without importing the Schedule module into every bundle: the
    // first failure is the schedule's first input; a step that fails means
    // the schedule is done.
    const schedule = opts.schedule as unknown as {
      readonly step: Effect.Effect<
        (now: number, input: unknown) => Effect.Effect<readonly [unknown, Duration.Input], unknown>
      >;
    };
    return Effect.flatMap(schedule.step, (next) => {
      const loop = (e: unknown): Effect.Effect<any, any, any> =>
        !keepGoing(e)
          ? Effect.fail(e)
          : Effect.clockWith((clock) =>
              Effect.matchEffect(next(clock.currentTimeMillisUnsafe(), e), {
                onFailure: () => Effect.fail(e),
                onSuccess: ([, delay]) =>
                  Effect.flatMap(Effect.sleep(delay), () => Effect.catch(base, loop)),
              }),
            );
      return loop(error);
    });
  }
  const b = opts.backoff ?? NO_BACKOFF;
  const step = (e: unknown, n: number): Effect.Effect<any, any, any> =>
    !keepGoing(e) || (b.maxRetries !== undefined && n >= b.maxRetries)
      ? Effect.fail(e)
      : Effect.flatMap(backoffDelay(b, n, e), (ms) =>
          Effect.flatMap(Effect.sleep(ms), () => Effect.catch(base, (next) => step(next, n + 1))),
        );
  return step(error, 0);
};

/**
 * Per-operation state. Kept to one small object per exported operation:
 * importing a service module creates every operation in it, so anything
 * allocated here is paid hundreds of times per import (EC2 has 807
 * operations) whether or not the operation is ever called.
 */
interface OperationState {
  readonly configFn: () => OperationConfig<any, any, any, any, any>;
  prepared?: Prepared;
  /** Paginated operations only. */
  readonly strategy?: Pagination.PaginationStrategy;
}

interface Prepared extends PreparedOperation {
  readonly cfg: OperationConfig<any, any, any, any, any>;
  /** The built protocol service, once its layer has been built. */
  service?: ProtocolShape;
}

const stateKey = /*@__PURE__*/ Symbol.for("@distilled.cloud/core/api/OperationState");

// Lazily resolve the operation config + schema ASTs on first call, not at
// module-load time. Generated SDKs wrap each request/response schema in
// `Schema.suspend(() => ...)`; forcing them here (rather than when the
// `export const` is evaluated) keeps importing a service module cheap and
// only pays the schema-construction cost for operations that are actually
// called. Memoized so subsequent calls are free.
const prepare = (state: OperationState): Prepared => {
  if (state.prepared) return state.prepared;
  const cfg = state.configFn();
  return (state.prepared = {
    cfg,
    config: cfg,
    inputAst: cfg.input!.ast,
    outputAst: cfg.output!.ast,
    errors: cfg.errors ?? [],
    compiled: undefined,
    service: undefined,
  });
};

const stateOf = (op: unknown): OperationState => (op as Record<symbol, OperationState>)[stateKey]!;

const defineState = (op: unknown, state: OperationState): OperationState => {
  Object.defineProperty(op, stateKey, { value: state });
  return state;
};

const runWith = (
  p: Prepared,
  protocol: ProtocolShape,
  input: unknown,
): Effect.Effect<any, any, any> => {
  if (protocol.call !== undefined) return protocol.call(p, input);
  const { cfg, inputAst, outputAst, errors } = p;
  return Effect.flatMap(HttpClient.HttpClient, (client) =>
    Effect.flatMap(protocol.encode({ input, inputAst, config: cfg }), (request) =>
      Effect.flatMap(client.execute(request), (response) =>
        protocol.decode({ response, outputAst, errors, config: cfg }),
      ),
    ),
  );
};

const callOperation = (state: OperationState, input: unknown): Effect.Effect<any, any, any> => {
  // Warm path: the operation is prepared and its protocol built, so the call
  // is whatever the protocol returns, with no wrapper effects around it.
  const p = state.prepared;
  if (p?.service !== undefined) return applyRetry(runWith(p, p.service, input), p.cfg.retry);
  return Effect.suspend(() => {
    const prepared = prepare(state);
    const call = Effect.flatMap(protocolContext(prepared.cfg.protocol), (protocolCtx) => {
      const service = (prepared.service = Context.get(protocolCtx, Protocol));
      return runWith(prepared, service, input);
    });
    return applyRetry(call, prepared.cfg.retry);
  });
};

/**
 * `const fn = yield* operation`: a requirement-free call function over the
 * current context. The captured context is a FALLBACK, not a snapshot:
 * entries present on the calling fiber at call time win, so per-call
 * overrides -- e.g. providing `Endpoint` with a discovered data-plane address
 * around one invocation -- take effect instead of being shadowed by the
 * context captured at yield time.
 */
const bindContext = (op: (input: unknown) => Effect.Effect<any, any, any>) =>
  Effect.map(
    Effect.context(),
    (context) => (input: unknown) =>
      // `Context` is contravariant, so `Context<never>` is not assignable
      // to the `Context<any>` updateContext expects -- the widening cast is
      // sound (the merge only ever adds entries).
      Effect.updateContext(op(input), (current): Context.Context<any> =>
        Context.merge(context, current),
      ),
  );

/**
 * Shared by every operation function (its prototype; it inherits from
 * `Function.prototype`, so operations stay ordinary callables). Makes the
 * operation yieldable -- `yield* operation` returns a requirement-free call
 * function, mirroring the distilled repo's OperationMethod -- and carries the
 * debug/introspection surface (`op.input` / `.output` / `.errors` /
 * `.operationName` / `.pagination`) as lazy getters, so importing a service
 * module doesn't force its suspended schemas.
 */
const OperationProto: object = /*@__PURE__*/ Object.setPrototypeOf(
  {
    [Symbol.iterator](this: any) {
      return new SingleShotGen(this.asEffect());
    },
    pipe(this: any) {
      return pipeArguments(this.asEffect(), arguments);
    },
    asEffect(this: any) {
      return bindContext(this);
    },
    get input() {
      return prepare(stateOf(this)).cfg.input;
    },
    get output() {
      return prepare(stateOf(this)).cfg.output;
    },
    get errors() {
      return prepare(stateOf(this)).cfg.errors ?? [];
    },
    get operationName() {
      return prepare(stateOf(this)).cfg.operationName;
    },
    get pagination() {
      return (prepare(stateOf(this)).cfg as PaginatedOperationConfig<any, any, any, any>)
        .pagination;
    },
  },
  Function.prototype,
);

const makeOperation = (state: OperationState, proto: object): any => {
  const fn = (input: unknown) => callOperation(state, input);
  defineState(fn, state);
  return Object.setPrototypeOf(fn, proto);
};

export function make<
  I extends S.Top,
  O extends S.Top,
  PE,
  PR,
  const E extends readonly ApiErrorClass[] = readonly [],
>(
  configFn: () => OperationConfig<I, O, PE, PR, E>,
): OperationMethod<
  S.Schema.Type<I>,
  S.Schema.Type<O>,
  InstanceType<E[number]> | PE | HttpClientError.HttpClientError,
  PR | HttpClient.HttpClient
> {
  return makeOperation({ configFn }, OperationProto);
}

//#endregion

//#region MakePaginated

/**
 * STRUCTURAL fallback for the element type `.items()` yields: the array
 * element of the page response itself, or of its `result` member.
 *
 * It can only see shapes it was taught, so any other envelope
 * (`{ branches: [...] }`, `{ data: [...] }`, ...) lands on `unknown` -- which is
 * why generators pass the item type EXPLICITLY as
 * {@link PaginatedOperationMethod}'s `Item` argument, resolved from the
 * pagination trait's `items` path against the response shape. This default
 * only applies to hand-written operations.
 */
export type PaginatedItem<A> =
  A extends ReadonlyArray<infer Item>
    ? Item
    : A extends { result: ReadonlyArray<infer Item> }
      ? Item
      : A extends { result?: ReadonlyArray<infer Item> | null | undefined }
        ? Item
        : unknown;

/**
 * The callable half of a paginated operation: the operation call itself, plus
 * `.pages(input)` streaming every page response and `.items(input)` streaming
 * the individual items across pages.
 *
 * Used twice in {@link PaginatedOperationMethod} -- once with the operation's
 * requirements (`R`) for the direct-call style, once with `R = never` for the
 * value `yield* operation` hands back, which has the caller's context baked in.
 */
export interface PaginatedCall<I, O, E, R, Item> {
  (input: I): Effect.Effect<O, E, R>;
  readonly pages: (input: I) => Stream.Stream<O, E, R>;
  readonly items: (input: I) => Stream.Stream<Item, E, R>;
}

/**
 * A paginated operation: usable both ways an {@link OperationMethod} is, with
 * `.pages` / `.items` on BOTH -- the operation object for
 * `yield* op.items(input)`, and the requirement-free call function for
 * `const op = yield* operation; yield* op.items(input)` (distilled #145).
 */
export type PaginatedOperationMethod<I, O, E, R, Item = PaginatedItem<O>> = Effect.Effect<
  PaginatedCall<I, O, E, never, Item>,
  never,
  R
> &
  PaginatedCall<I, O, E, R, Item> &
  OperationSchemas<I, O>;

export interface PaginatedOperationConfig<
  I extends S.Top,
  O extends S.Top,
  PE,
  PR,
  E extends readonly ApiErrorClass[] = readonly ApiErrorClass[],
> extends OperationConfig<I, O, PE, PR, E> {
  /** How to advance between pages (mirrors the `smithy.api#paginated` trait). */
  pagination: Pagination.PaginatedTrait;
}

/** `.pages` / `.items` over any call function (the operation itself or a context-bound one). */
const streamsOf = (state: OperationState, call: (input: any) => Effect.Effect<any, any, any>) => {
  const pag = () => (prepare(state).cfg as PaginatedOperationConfig<any, any, any, any>).pagination;
  // Data operations carry their strategy in the config.
  const paginate =
    state.strategy ??
    (prepare(state).cfg as { strategy?: Pagination.PaginationStrategy }).strategy ??
    Pagination.paginateWithDefaults;
  const pages = (input: Record<string, unknown>) => paginate(call, input, pag());
  const items = (input: Record<string, unknown>) => {
    const p = pag();
    return p.items ? Pagination.extractItems(pages(input), p.items) : pages(input);
  };
  return { pages, items };
};

/**
 * `.pages` / `.items` are getters that build the stream functions on first
 * access and cache them on the operation, so they cost nothing until used
 * and stay detachable (`const { items } = op` works).
 */
const streamGetter = (name: "pages" | "items") =>
  function (this: any) {
    const fns = streamsOf(stateOf(this), this);
    Object.defineProperties(this, {
      pages: { value: fns.pages, configurable: true },
      items: { value: fns.items, configurable: true },
    });
    return fns[name];
  };

const PaginatedOperationProto: object = /*@__PURE__*/ Object.create(OperationProto, {
  pages: { get: /*@__PURE__*/ streamGetter("pages"), configurable: true },
  items: { get: /*@__PURE__*/ streamGetter("items"), configurable: true },
  // `yield* operation` returns a fresh context-bound function; give it
  // `.pages` / `.items` too (distilled #145). Same fallback (not snapshot)
  // semantics as the plain operation.
  asEffect: {
    value(this: any) {
      const state = stateOf(this);
      return Effect.map(bindContext(this), (call) => Object.assign(call, streamsOf(state, call)));
    },
    configurable: true,
    writable: true,
  },
});

/**
 * Like {@link make}, plus `.pages()` / `.items()` streaming built on the
 * operation's pagination trait. The SDK can pass a provider-specific
 * {@link Pagination.PaginationStrategy} (e.g. Cloudflare stops page-mode
 * traversal on the first empty page); the default dispatches on
 * `pagination.mode`.
 */
export function makePaginated<
  I extends S.Top,
  O extends S.Top,
  PE,
  PR,
  const E extends readonly ApiErrorClass[] = readonly [],
>(
  configFn: () => PaginatedOperationConfig<I, O, PE, PR, E>,
  strategy?: Pagination.PaginationStrategy,
): PaginatedOperationMethod<
  S.Schema.Type<I>,
  S.Schema.Type<O>,
  InstanceType<E[number]> | PE | HttpClientError.HttpClientError,
  PR | HttpClient.HttpClient
> {
  return makeOperation(strategy ? { configFn, strategy } : { configFn }, PaginatedOperationProto);
}

//#endregion

//#region Data operations

/**
 * Generated operations described by data instead of code.
 *
 * A service module holds each operation as one arrow that is both the
 * callable operation and the holder of its description:
 *
 *   export const getFile = API.op((i) => i === API.D ? ['{input:#1,...};__more', [__0, __4, ...]] : API.call(getFile, i));
 *
 * Called with {@link D}, it returns `[data, refs]`: `;`-separated entries
 * in a small expression language (below) and the values they name. `refs[0]`
 * is the schema-lite `at` (lazy schema wrapper). Schemas reached by more
 * than one operation live in shared holders, `function __d3() { return
 * [data, refs]; }`, named in `refs` so a bundler keeps only the holders an
 * operation reaches. Entry 0 of an operation is its config; the rest are
 * schemas and thunk bodies. Evaluating an entry calls the same
 * constructors the code form called, in the same order, so the result is
 * the same schema.
 *
 * Importing a module allocates one function per operation and one per
 * holder; the data stays text in the module source until first use. A
 * holder's refs may also be values built from module code on first use
 * (service traits, endpoint rules), which its value entries name.
 *
 * Grammar (`;` never appears outside an entry separator; strings escape it):
 *
 *   $N        refs[N]
 *   #N  #R:N  schema entry N of this holder / of the holder refs[R] (lazy, memoized)
 *   ~N  ~R:N  value entry N of this holder / of refs[R] (a constant, evaluated once)
 *   >N        thunk `() => entry N`
 *   "..." -1.5 true false null   JSON literal   u  undefined
 *   {k:e,"k":e}  object   [e,e]  array
 *   e(a,b)    call   e.name  member   e.name(a,b)  method call   e@"X"  e.annotate({ identifier: "X" })
 */
export const D: unique symbol = /*@__PURE__*/ Symbol.for("@distilled.cloud/core/api/D") as any;

type DataFn = (i?: unknown) => any;

interface Source {
  readonly fn: DataFn;
  e?: string[];
  r?: ReadonlyArray<any>;
  b?: (j: number) => unknown;
  readonly c: unknown[];
  /** Data error classes: the built base class. */
  k?: Function;
}

const sources = /*@__PURE__*/ new WeakMap<DataFn, Source>();

const sourceOf = (fn: DataFn): Source => {
  let src = sources.get(fn);
  if (!src) sources.set(fn, (src = { fn, c: [] }));
  if (!src.e) {
    // Called with itself as `this`: a lazy error placeholder finds its data by it.
    const [s, r] = fn.call(fn, D);
    src.e = s.split(";");
    src.r = r;
  }
  return src;
};

/** Schema `j` of a holder, wrapped by `at` (lazy until first use). */
const schemaOf = (src: Source, j: number): unknown =>
  (src.c[j] ??= src.r![0]((src.b ??= (k: number) => evalEntry(src, k)), j));

/** A schema of a holder, for module-level code (error classes) that names one at import. */
export const schema = (fn: DataFn, j: number): any => schemaOf(sourceOf(fn), j);

const TOKEN = /"(?:[^"\\]|\\.)*"|[\w$.+-]*/y;
const NAME = /[\w$]*/y;

const evalEntry = (src: Source, j: number): any => {
  const s = src.e![j]!;
  const r = src.r!;
  let p = 0;
  const tok = (re = NAME): string => {
    re.lastIndex = p;
    const t = re.exec(s)![0];
    p += t.length;
    return t;
  };
  const list = (close: string): any[] => {
    const a: any[] = [];
    if (s[p] === close) p++;
    else
      do a.push(expr());
      while (s[p++] !== close);
    return a;
  };
  const expr = (): any => {
    let v: any;
    const c = s[p++]!;
    if (c === "{") {
      v = {};
      if (s[p] === "}") p++;
      else
        do {
          const k = tok(TOKEN);
          p++;
          v[k[0] === '"' ? JSON.parse(k) : k] = expr();
        } while (s[p++] !== "}");
    } else if (c === "[") v = list("]");
    else if ("$#~>".includes(c)) {
      let h = src;
      let k = +tok();
      if (s[p] === ":") {
        p++;
        h = sourceOf(r[k]);
        k = +tok();
      }
      // A value entry is evaluated once, unwrapped.
      v =
        c === "$"
          ? r[k]
          : c === ">"
            ? () => evalEntry(src, k)
            : c === "#"
              ? schemaOf(h, k)
              : (h.c[k] ??= evalEntry(h, k));
    } else {
      p--;
      const t = tok(TOKEN);
      v = t === "u" ? undefined : JSON.parse(t);
    }
    for (;;) {
      const d = s[p++];
      if (d === "(") v = v(...list(")"));
      else if (d === "@") v = v.annotate({ identifier: JSON.parse(tok(TOKEN)) });
      else if (d === ".") {
        const name = tok();
        v = s[p] === "(" ? (p++, v[name](...list(")"))) : v[name];
      } else return (p--, v);
    }
  };
  return expr();
};

// A data operation gets its state on first use, from this inherited getter.
// Its descriptors are written inline: nothing keeps them after the prototype is made.
const dataState = function (this: DataFn): OperationState {
  return defineState(this, { configFn: () => evalEntry(sourceOf(this), 0) });
};
let dataProto: object | undefined;
let dataPaginatedProto: object | undefined;
/**
 * While a lazy service loads its full module (see {@link lazyService}), the module's
 * definitions go to it instead (kind 0 operation, 1 paginated, 2 error class).
 */
let definer: ((fn: DataFn, kind: 0 | 1 | 2) => unknown) | undefined;

/** Runs `f` with `d` receiving the definitions it evaluates. */
const defining = (d: typeof definer, f: () => void): void => {
  const outer = definer;
  definer = d;
  try {
    f();
  } finally {
    definer = outer;
  }
};

/**
 * The data of an operation whose name recurs in its strings: `%` in them
 * stands for `stem` (a literal `%` is escaped).
 */
export const named = (stem: string, data: string, refs: unknown): [string, unknown] => [
  data.replaceAll("%", stem),
  refs,
];

const asOp = (fn: DataFn): any =>
  Object.setPrototypeOf(
    fn,
    (dataProto ??= Object.create(OperationProto, {
      [stateKey]: { get: dataState, configurable: true },
    })),
  );

const asOpPaginated = (fn: DataFn): any =>
  Object.setPrototypeOf(
    fn,
    (dataPaginatedProto ??= Object.create(PaginatedOperationProto, {
      [stateKey]: { get: dataState, configurable: true },
    })),
  );

/** An operation described by data (see the region header). */
export const op = (fn: DataFn): any => (definer ? definer(fn, 0) : asOp(fn));

/** A paginated operation described by data; its config may name a `strategy`. */
export const opPaginated = (fn: DataFn): any => (definer ? definer(fn, 1) : asOpPaginated(fn));

/** The call path of a data operation. */
export const call = (op: unknown, input: unknown): Effect.Effect<any, any, any> =>
  callOperation(stateOf(op), input);

/**
 * Generated error classes described by data:
 *
 *   export const Oops = API.error(function Oops(i) {
 *     return API.newError(i, new.target, ['$1()("Oops",{...})', [...]]);
 *   });
 *
 * The function is the class callers see: `new Oops(props)` constructs, a
 * plain call returns the data. Entry 0 of the data is the expression the
 * class extended (e.g. `S.TaggedError()(...).pipe(category)`). The first
 * `new`, or the first read of a static the function does not own (`ast`,
 * `fields`, `identifier`, error matchers, ...), builds that base class and
 * puts it underneath: the function's statics and prototype then inherit
 * from it as `class Oops extends Base {}` did, so `instanceof`, `_tag`,
 * categories and subclasses behave as before. Until then an error class
 * costs one function. The `in` operator sees only `Function` members until
 * the class is built.
 */
const errorBase = (f: any): Function | undefined => {
  // `f` may be a subclass: find the data class it extends.
  while (f && Object.getPrototypeOf(f) !== lazyErrorStatics && !sources.get(f)?.k)
    f = Object.getPrototypeOf(f);
  if (!f) return undefined;
  const src = sourceOf(f);
  if (!src.k) {
    const base = evalEntry(src, 0) as Function;
    src.k = base;
    Object.setPrototypeOf(f, base);
    Object.setPrototypeOf(f.prototype, base.prototype);
  }
  return src.k;
};

// The statics of an unbuilt error class: `Function.prototype` members answer
// directly; any other read builds the class, then reads again. Made on first
// use, so bundles without data errors drop it.
let lazyErrorStatics: object | undefined;
const LazyErrorStatics = (): object =>
  (lazyErrorStatics ??= new Proxy(Object.create(Function.prototype), {
    get: (target, key, receiver) =>
      key in target || !errorBase(receiver)
        ? Reflect.get(target, key, receiver)
        : Reflect.get(receiver, key, receiver),
  }));

const asError = (fn: DataFn): any => Object.setPrototypeOf(fn, LazyErrorStatics());

/** An error class described by data (see {@link errorBase}). */
export const error = (fn: DataFn): any => (definer ? definer(fn, 2) : asError(fn));

/**
 * The body of a data error class: with `new`, an instance of the built
 * base whose prototype is `newTarget`'s; called plainly, the class's data.
 */
export const newError = (props: unknown, newTarget: Function | undefined, data: unknown): any =>
  newTarget ? Reflect.construct(errorBase(newTarget)!, [props], newTarget) : data;

//#endregion

//#region Lazy service modules

/**
 * Node loads a service module as a stub (`lib/services/<name>.js`): one cheap
 * placeholder per operation and error class, no operation data. Its first
 * use loads the full module (`lib/services.full/<name>.js`, what bundlers
 * get) with `require(esm)`.
 *
 *   const { o, e, E } = API.lazyService(import.meta.url, "../services.full/sqs.js", "oop", [$0], at, len);
 *   export const { OverLimit, QueueDoesNotExist } = E;  // or OverLimit = e("OverLimit"), ...
 *   export const addPermission = o(), _1 = o(), listQueues = o();
 *
 * Generated stubs reach this through their package's `_bundle/lazy.js`,
 * which passes its own URL and the namespaces every stub imports.
 *
 * `kinds` has one letter per operation definition of the full module: `o`
 * plain, `p` paginated. While the stub's load evaluates the full module,
 * `op` / `opPaginated` / `error` hand back the stub's placeholders in
 * definition order instead of new values, and each placeholder takes the
 * data function it stands for: the full module's operations, error lists
 * and exports are the very objects the stub exported.
 *
 * With a slice index (below), a placeholder's first use evaluates only what
 * its operation reaches instead of the whole full module. A full module that
 * was imported directly (lib code names services through the package, so
 * Node resolves the stub; only explicit `services.full` imports do) keeps
 * its own objects, separate from the stub's.
 */
interface LazyService {
  readonly url: string;
  readonly spec: string;
  readonly kinds: string;
  /** Namespaces of the full module's imports, when it has a slice index. */
  readonly ns: readonly any[] | undefined;
  /** Byte range of the slice index, a comment at the end of the full module. */
  readonly at: number | undefined;
  readonly len: number | undefined;
  /** The slice index (see {@link sliced}); false: load the whole module. */
  ix?: SliceIndex | false;
  readonly o: any[];
  readonly e: any[];
  /** Data functions by placeholder, filled while the full module loads. */
  od?: DataFn[];
  ed?: DataFn[];
  oi: number;
  ei: number;
}

const define = (svc: LazyService, fn: DataFn, kind: 0 | 1 | 2): any => {
  if (kind === 2) {
    const i = svc.ei++;
    if (i >= svc.e.length) throw new Error(`distilled: ${svc.spec}: error ${i} has no stub`);
    svc.ed![i] = fn;
    return svc.e[i];
  }
  const i = svc.oi++;
  if (i >= svc.o.length || (svc.kinds[i] === "p") !== (kind === 1))
    throw new Error(`distilled: ${svc.spec}: operation ${i} does not match its stub`);
  svc.od![i] = fn;
  return svc.o[i];
};

const load = (svc: LazyService): void => {
  if (svc.od) return;
  svc.od = [];
  svc.ed = [];
  try {
    defining(
      (fn, kind) => define(svc, fn, kind),
      () =>
        (globalThis as any).process.getBuiltinModule("node:module").createRequire(svc.url)(
          svc.spec,
        ),
    );
  } catch (e) {
    svc.od = svc.ed = undefined;
    svc.oi = svc.ei = 0;
    throw e;
  }
  if (svc.oi !== svc.o.length || svc.ei !== svc.e.length)
    throw new Error(
      `distilled: ${svc.spec} defined ${svc.oi} of ${svc.o.length} operations and ${svc.ei} of ${svc.e.length} errors (was it imported directly before?)`,
    );
};

/**
 * Per-operation loading. bundle-lib ends a full module with a comment
 * holding its slice index (see scripts/lazy-services.ts): for every top-level
 * declaration, the byte range of its expression and the declarations it may
 * read. A placeholder's first use evaluates only its own data function and,
 * on demand, what that reaches -- one `Function` per declaration, the
 * module's imports and its dependencies passed in as parameters -- instead
 * of the whole module. Function declarations (the shared schema holders)
 * become forwarding functions compiled on their first call, so cycles
 * between them need no order. Without an index, or where code generation
 * from strings is disallowed, the whole module is loaded instead.
 */
interface SliceIndex {
  readonly file: string;
  /** Open while a burst of evaluations runs; closed in a microtask. */
  fd?: number;
  /** The index text, and where its sections start. */
  readonly raw: string;
  readonly imports: number;
  readonly importsAt: number;
  readonly tableAt: number;
  readonly linesAt: number;
  /** Split on first use. */
  specs?: string[];
  readonly importValues: unknown[];
  /** Values by declaration; `busy` marks one being evaluated. */
  readonly v: unknown[];
}

const busy = {};

const node = (m: string): any => (globalThis as any).process?.getBuiltinModule?.(m);

/** Reads `length` bytes at `position` of the full module. */
const read = (ix: { file: string; fd?: number }, position: number, length: number): string => {
  const fs = node("node:fs");
  if (ix.fd === undefined) {
    ix.fd = fs.openSync(ix.file, "r") as number;
    queueMicrotask(() => {
      fs.closeSync(ix.fd);
      ix.fd = undefined;
    });
  }
  const buf = (globalThis as any).Buffer.allocUnsafe(length);
  fs.readSync(ix.fd, buf, 0, length, position);
  return buf.toString("utf8", 0, length);
};

const indexOf = (file: string, raw: string): SliceIndex => {
  const importsAt = raw.indexOf("\n") + 1;
  const tableAt = raw.indexOf("\n", importsAt) + 1;
  return {
    file,
    raw,
    imports: parseInt(raw),
    importsAt,
    tableAt,
    linesAt: raw.indexOf("\n", tableAt) + 1,
    importValues: [],
    v: [],
  };
};

const fileOf = (svc: LazyService): string =>
  // A plain POSIX file URL is its path (URL parsing costs ~0.1 ms the first time).
  /^file:\/\/\/[^%?#]*$/.test(svc.url) && (globalThis as any).process.platform !== "win32"
    ? svc.url.slice(7, svc.url.lastIndexOf("/") + 1) + svc.spec
    : node("node:url").fileURLToPath(new URL(svc.spec, svc.url));

const sliced = (svc: LazyService): SliceIndex | false => {
  if (svc.ix !== undefined) return svc.ix;
  svc.ix = false;
  if (svc.at === undefined || svc.od) return false;
  try {
    Function("");
    const file = fileOf(svc);
    svc.ix = indexOf(file, read({ file }, svc.at, svc.len!));
    svc.od = [];
    svc.ed = [];
  } catch {}
  return svc.ix;
};

/**
 * The first lazy service of a process reads its slice index right after it
 * is imported (in a microtask, so before the import settles), instead of on
 * its first call: that read also pays Node's one-time costs of the slice path
 * (~0.2 ms). Later services read theirs on first use; nothing else is read
 * ahead, so importing a whole provider holds one index.
 */
let primed = false;
const prime = (svc: LazyService): void => {
  primed = true;
  queueMicrotask(() => {
    const ix = sliced(svc);
    // The first read of an export through a module namespace is slow.
    if (ix && ix.imports > 0) importOf(svc, ix, 0);
  });
};

/** The index line of declaration `k`. */
const lineOf = (ix: SliceIndex, k: number): string => {
  const at = ix.tableAt + 5 * k;
  return ix.raw.slice(
    ix.linesAt + parseInt(ix.raw.slice(at, at + 5), 36),
    ix.linesAt + parseInt(ix.raw.slice(at + 5, at + 10), 36) - 1,
  );
};

const nameOf = (ix: SliceIndex, k: number): string => lineOf(ix, k).split("|")[0]!.split(" ")[3]!;

const importSpec = (ix: SliceIndex, j: number): string[] =>
  (ix.specs ??= ix.raw.slice(ix.importsAt, ix.tableAt - 1).split(" "))[j]!.split(":");

const importOf = (svc: LazyService, ix: SliceIndex, j: number): unknown => {
  if (j in ix.importValues) return ix.importValues[j];
  const [, source, name] = importSpec(ix, j);
  return (ix.importValues[j] = svc.ns![+source!][name!]);
};

/** A top-level name of the full module: imports first, then declarations. */
const refOf = (svc: LazyService, ix: SliceIndex, j: number): unknown =>
  j < ix.imports ? importOf(svc, ix, j) : valueOf(svc, ix, j - ix.imports);

/**
 * Evaluates declaration `k` that is not a data function in its generated
 * shape: compiled with its dependencies in scope; a function with plain
 * parameters from its body, so it is parsed once, bound to those values.
 */
const evaluate = (svc: LazyService, ix: SliceIndex, k: number): any => {
  const [head, fn, depText] = lineOf(ix, k).split("|");
  const deps = depText ? depText.split(" ").map((x) => parseInt(x, 36)) : [];
  const names = deps.map((j) =>
    j < ix.imports ? importSpec(ix, j)[0]! : nameOf(ix, j - ix.imports),
  );
  const values = deps.map((j) => refOf(svc, ix, j));
  const url = `\n//# sourceURL=${ix.file}#${nameOf(ix, k)}`;
  if (fn && fn[0] !== "(") {
    const [params, range] = fn.split(";");
    const [start, end, expr] = range!.split(" ").map((x) => parseInt(x, 36));
    return compileBody(
      ix,
      names,
      values,
      params ? params.split(",") : [],
      start!,
      end!,
      expr!,
      url,
    );
  }
  const [, start, end] = head!.split(" ").map((x) => parseInt(x, 36));
  let text: string;
  if (fn?.[0] === "(") {
    // Functions it passes compile on their first call (many never are): it
    // reads the text around them only.
    const args = fn.slice(1).split(",");
    const outer = { names: names.slice(), values: values.slice() };
    text = "";
    let at = start!;
    args.forEach((arg, i) => {
      const [a, b, bs, be, expr] = arg.split(" ").map((x) => parseInt(x, 36));
      const params = arg.split(" ")[5];
      let compiled: Function | undefined;
      names.push(`$lazy${i}`);
      values.push(function (this: unknown) {
        compiled ??= compileBody(
          ix,
          outer.names,
          outer.values,
          params ? params.split("+") : [],
          bs!,
          be!,
          expr!,
          url,
        );
        return compiled.apply(this, arguments);
      });
      text += `${read(ix, at, a! - at)}$lazy${i}`;
      at = b!;
    });
    text += read(ix, at, end! - at);
  } else text = read(ix, start!, end! - start!);
  return Function(...names, `"use strict";return(${text}\n)${url}`)(...values);
};

/**
 * A function with plain parameters, compiled from its body (parsed once)
 * with `names` in scope bound to `values`; its parameters shadow them.
 */
const compileBody = (
  ix: SliceIndex,
  names: string[],
  values: unknown[],
  own: string[],
  start: number,
  end: number,
  expr: number,
  url: string,
): Function => {
  const text = read(ix, start, end - start);
  const keep = names.map((n) => !own.includes(n));
  return Function(
    ...names.filter((_, i) => keep[i]),
    ...own,
    // A block: the body's own declarations shadow the names in scope, as they did.
    `"use strict";${expr ? `return(${text}\n)` : `{${text}\n}`}${url}`,
  ).bind(undefined, ...values.filter((_, i) => keep[i]));
};

/**
 * The data function of a data line (`=stem;start end;refs`): reads the data
 * and resolves its refs, compiling nothing.
 */
const dataFn = (svc: LazyService, ix: SliceIndex, fn: string): [string, unknown[]] => {
  const [stem, range, refs] = fn.slice(1).split(";");
  const sp = range!.indexOf(" ");
  const start = parseInt(range!, 36);
  const data = read(ix, start, parseInt(range!.slice(sp + 1), 36) - start);
  const values: unknown[] = [];
  if (refs)
    for (const x of refs.split(",")) {
      const j = parseInt(x, 36);
      values.push(j < ix.imports ? importOf(svc, ix, j) : slot(svc, ix, j - ix.imports, false));
    }
  return [stem ? data.replaceAll("%", stem) : data, values];
};

/**
 * The value declaration `k` of the full module has; with `own`, for an
 * operation or error class, its data function instead of its placeholder.
 */
const slot = (svc: LazyService, ix: SliceIndex, k: number, own: boolean): any => {
  if (!own) {
    if (k in ix.v) return ix.v[k] === busy ? undefined : ix.v[k];
    const ops = svc.o.length;
    if (k < ops) return (ix.v[k] = svc.o[k]);
    if (k < ops + svc.e.length) return (ix.v[k] = svc.e[k - ops]);
  }
  const at = ix.tableAt + 5 * k;
  const line = ix.raw.slice(
    ix.linesAt + parseInt(ix.raw.slice(at, at + 5), 36),
    ix.linesAt + parseInt(ix.raw.slice(at + 5, at + 10), 36) - 1,
  );
  const bar = line.indexOf("|");
  if (line[bar + 1] === "=") {
    const fn = dataFn.bind(undefined, svc, ix, line.slice(bar + 1)) as DataFn;
    return own ? fn : (ix.v[k] = fn);
  }
  if (own) return evaluate(svc, ix, k);
  if (line[0] === "1") {
    // A function declaration: compiled on its first call, so cycles need no order.
    let fn: Function | undefined;
    return (ix.v[k] = function (this: unknown) {
      return (fn ??= evaluate(svc, ix, k)).apply(this, arguments);
    });
  }
  ix.v[k] = busy;
  return (ix.v[k] = evaluate(svc, ix, k));
};

const valueOf = (svc: LazyService, ix: SliceIndex, k: number): unknown => slot(svc, ix, k, false);

/** The data function of placeholder `i` (`kind` 0: operation, 1: error class). */
const dataOf = (svc: LazyService, kind: 0 | 1, i: number): DataFn => {
  const loaded = kind === 0 ? svc.od : svc.ed;
  if (loaded?.[i]) return loaded[i]!;
  const ix = sliced(svc);
  if (!ix) {
    load(svc);
    return (kind === 0 ? svc.od : svc.ed)![i]!;
  }
  return ((kind === 0 ? svc.od : svc.ed)![i] = slot(
    svc,
    ix,
    kind === 0 ? i : svc.o.length + i,
    true,
  ));
};

/**
 * The placeholders of a lazy service module (see the region header): `o()`
 * and `e()` make the next operation / error class. A placeholder finds its
 * data by its index; it closes over nothing of its own, so it costs one
 * function.
 */
export const lazyService = (
  url: string,
  spec: string,
  kinds: string,
  ns?: readonly any[],
  at?: number,
  len?: number,
): { readonly o: () => any; readonly e: (name: string) => any; readonly E: any } => {
  const svc: LazyService = { url, spec, kinds, ns, at, len, o: [], e: [], oi: 0, ei: 0 };
  if (!primed && at !== undefined && !(globalThis as any).process?.env?.NOPRIME) prime(svc);
  return {
    o: () => {
      const paginated = kinds[svc.o.length] === "p";
      const f: DataFn = function op(x) {
        return x === D ? dataOf(svc, 0, svc.o.indexOf(op))(D) : call(op, x);
      };
      svc.o.push(paginated ? asOpPaginated(f) : asOp(f));
      return f;
    },
    e: (name: string) => {
      // A computed key names the function without a property of its own.
      const f = {
        [name]: function (this: unknown, x: unknown) {
          return new.target
            ? newError(x, new.target, undefined)
            : dataOf(svc, 1, svc.e.indexOf(this))(x);
        },
      }[name]!;
      svc.e.push(asError(f));
      return f;
    },
    // Destructured once by the stub: each property read makes the error class of that name.
    get E() {
      const e = this.e;
      return new Proxy({}, { get: (_, name) => e(name as string) });
    },
  };
};

/**
 * A service barrel's stand-in for `export * as sqs from "./sqs.js"` in Node:
 * a namespace whose module is loaded (`require(esm)`) on first access, so
 * importing a provider's barrel loads no service module. Reads, `in`,
 * `Object.keys` and spreading see the module's exports; it is read-only.
 */
interface LazyNamespace {
  readonly url: string;
  readonly spec: string;
  ns?: any;
}

const namespaceOf = (t: LazyNamespace): any =>
  (t.ns ??= (globalThis as any).process.getBuiltinModule("node:module").createRequire(t.url)(
    t.spec,
  ));

let lazyNamespaceHandler: ProxyHandler<LazyNamespace> | undefined;

export const lazyNamespace = (url: string, spec: string): any =>
  new Proxy<LazyNamespace>(
    { url, spec },
    (lazyNamespaceHandler ??= {
      get: (t, k) => namespaceOf(t)[k],
      has: (t, k) => k in namespaceOf(t),
      ownKeys: (t) => Reflect.ownKeys(namespaceOf(t)),
      getOwnPropertyDescriptor: (t, k) => {
        const d = Reflect.getOwnPropertyDescriptor(namespaceOf(t), k);
        // The target does not hold these: a proxy may only report them configurable.
        return d && { ...d, configurable: true };
      },
      getPrototypeOf: () => null,
      set: () => false,
      defineProperty: () => false,
      deleteProperty: () => false,
    }),
  );

//#endregion
