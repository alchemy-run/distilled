import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import type * as S from "effect/Schema";
import type * as AST from "effect/SchemaAST";
import { pipeArguments } from "effect/Pipeable";
import * as Ref from "effect/Ref";
import * as Scope from "effect/Scope";
import type * as Stream from "effect/Stream";
import { SingleShotGen } from "effect/Utils";
import * as Pagination from "./pagination.ts";
import { makeDefault, type Policy as RetryPolicy } from "./retry.ts";
import * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import type * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";

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
  /**
   * Schema-free operations carry a descriptor (see `./shape.ts`) instead of
   * `input`/`output` schemas: only the members the wire protocol cannot
   * infer from the value itself. Its shape is owned by the SDK's protocol.
   */
  readonly descriptor?: unknown;
}

/**
 * The Protocol service knows how to turn a value into an HTTP request using
 * only the input schema's trait annotations, and how to turn a response back
 * into an output value using the output schema's trait annotations.
 *
 * Swap implementations by providing a different `Layer<Protocol>`.
 */
export class Protocol extends Context.Service<
  Protocol,
  {
    readonly encode: (args: {
      readonly input: unknown;
      readonly inputAst: AST.AST;
      /** The operation's config (memoized per operation — see {@link ProtocolOperationConfig}). */
      readonly config: ProtocolOperationConfig;
    }) => Effect.Effect<HttpClientRequest.HttpClientRequest>;
    readonly decode: (args: {
      readonly response: HttpClientResponse.HttpClientResponse;
      readonly outputAst: AST.AST;
      /**
       * The operation's declared error classes (from `OperationConfig.errors`).
       * Protocols use these to surface wire failures as the operation's typed
       * errors — e.g. by consulting matcher metadata stamped on the class.
       */
      readonly errors: ReadonlyArray<ApiErrorClass>;
      /** The operation's config (memoized per operation — see {@link ProtocolOperationConfig}). */
      readonly config: ProtocolOperationConfig;
    }) => Effect.Effect<unknown>;
  }
>()("Protocol") {}

//#endregion

//#region Make

export type ApiErrorClass = {
  new (...args: any[]): {
    readonly _tag: string;
    readonly message: string;
  };
};

// Every operation is a plain function whose prototype carries the shared
// machinery (yieldable, pipeable, introspection getters). Creating one at
// import time is a single closure; the config is resolved on first call.
const stateKey = Symbol.for("@distilled.cloud/core/api/operation");

interface OperationState {
  readonly configFn: () => OperationConfig<any, any, any, any, any>;
  prepared:
    | {
        readonly cfg: OperationConfig<any, any, any, any, any>;
        readonly inputAst: AST.AST;
        readonly outputAst: AST.AST;
      }
    | undefined;
  strategy: Pagination.PaginationStrategy | undefined;
}

interface OperationFn {
  (input: unknown): Effect.Effect<any, any, any>;
  [stateKey]: OperationState;
}

const prepareOperation = (fn: OperationFn) => {
  const state = fn[stateKey];
  if (state.prepared) return state.prepared;
  const cfg = state.configFn();
  // Schema-free (descriptor) operations have no AST; their protocols read
  // `config.descriptor` instead.
  state.prepared = {
    cfg,
    inputAst: cfg.input?.ast as AST.AST,
    outputAst: cfg.output?.ast as AST.AST,
  };
  return state.prepared;
};

const callOperation = (fn: OperationFn, input: unknown) =>
  Effect.suspend(() => {
    const { cfg, inputAst, outputAst } = prepareOperation(fn);
    const call = Effect.flatMap(protocolContext(cfg.protocol), (protocolCtx) =>
      Effect.gen(function* () {
        const protocol = yield* Protocol;
        const client = yield* HttpClient.HttpClient;
        const request = yield* protocol.encode({
          input,
          inputAst,
          config: cfg,
        });
        const response = yield* client.execute(request);
        return yield* protocol.decode({
          response,
          outputAst,
          errors: cfg.errors ?? [],
          config: cfg,
        });
      }).pipe(Effect.provideContext(protocolCtx)),
    );
    return applyRetry(call, cfg.retry);
  });

/**
 * `yield* operation` captures the current context and returns a
 * requirement-free call function. The captured context is a FALLBACK, not a
 * snapshot: entries present on the calling fiber at call time win, so
 * per-call overrides (e.g. an `Endpoint` provided around one invocation)
 * take effect.
 */
const bindContext =
  (
    call: (input: unknown) => Effect.Effect<any, any, any>,
    context: Context.Context<never>,
  ) =>
  (input: unknown) =>
    // `Context` is contravariant; the widening cast is sound (the merge only
    // ever adds entries).
    Effect.updateContext(call(input), (current): Context.Context<any> =>
      Context.merge(context, current),
    );

const OperationProto: any = Object.setPrototypeOf(
  {
    [Symbol.iterator](this: any) {
      return new SingleShotGen(this.asEffect());
    },
    pipe(this: any) {
      return pipeArguments(this.asEffect(), arguments);
    },
    asEffect(this: OperationFn) {
      return Effect.map(Effect.context(), (context) =>
        bindContext(this, context),
      );
    },
  },
  Function.prototype,
);

// Debug/introspection surface: the operation's metadata is readable off the
// exported callable (`iam.listRoles.errors` / `.operationName` /
// `.pagination`). Lazy, so importing a service module resolves nothing.
for (const [name, get] of Object.entries({
  input: (cfg: any) => cfg.input,
  output: (cfg: any) => cfg.output,
  descriptor: (cfg: any) => cfg.descriptor,
  errors: (cfg: any) => cfg.errors ?? [],
  operationName: (cfg: any) => cfg.operationName,
  pagination: (cfg: any) => cfg.pagination,
})) {
  Object.defineProperty(OperationProto, name, {
    get(this: OperationFn) {
      return get(prepareOperation(this).cfg);
    },
    configurable: true,
  });
}

/**
 * The shape of a generated SDK operation — usable two ways (mirrors the
 * distilled repo's OperationMethod):
 *
 * 1. Direct call: `yield* operation(input)` — an Effect with requirements.
 * 2. Yield first: `const fn = yield* operation` — captures the current
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
  ((input: I) => Effect.Effect<O, E, R>);

// NOTE: request/response ASTs are handed to the protocol RAW (Suspend nodes
// included). Pre-resolving Suspends here would drop annotations that sit on
// intermediate nodes — e.g. a bare-payload response whose payload type is
// itself a suspended schema carries its EnvelopePayloadRoot marker on the
// inner Suspend, and unwrapping it silently degrades decode to the struct
// path. The protocol helpers (core/protocol-http getAnn/getProps) descend
// Suspends themselves, and `Suspend.thunk` memoizes, so raw ASTs cost
// nothing extra.

/**
 * Protocol layers are built once per process and shared by every operation
 * call (keyed by layer value identity — generated operations all reference the
 * same module-level layer const). The build runs against a process-lifetime
 * scope, and concurrent first calls are deduplicated through a private
 * MemoMap.
 *
 * Contract for protocol implementations: the layer build must not capture
 * per-call context. Anything call-dependent — credentials, per-request
 * options — must be resolved inside `encode`/`decode`, which execute on the
 * calling fiber and therefore see the caller's services on every request.
 */
const protocolMemoMap = Layer.makeMemoMapUnsafe();
const protocolScope = Scope.makeUnsafe();
const protocolContexts = new WeakMap<
  Layer.Layer<Protocol, any, any>,
  Context.Context<Protocol>
>();

const protocolContext = <PE, PR>(
  layer: Layer.Layer<Protocol, PE, PR>,
): Effect.Effect<Context.Context<Protocol>, PE, PR> => {
  const cached = protocolContexts.get(layer);
  if (cached) return Effect.succeed(cached);
  return Effect.map(
    Layer.buildWithMemoMap(layer, protocolMemoMap, protocolScope),
    (ctx) => {
      protocolContexts.set(layer, ctx);
      return ctx;
    },
  );
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
  /** Schema-free operations: see {@link ProtocolOperationConfig.descriptor}. */
  descriptor?: unknown;
  /** How to advance between pages (paginated operations). */
  pagination?: Pagination.PaginatedTrait;
  /**
   * The protocol layer that knows how to encode/decode this operation's wire
   * format. Built once per process and shared across all operations that
   * reference the same layer value — it must resolve call-dependent services
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
export const applyRetry = (
  base: Effect.Effect<any, any, any>,
  retryKey: Context.Key<any, RetryPolicy> | undefined,
): Effect.Effect<any, any, any> =>
  retryKey === undefined
    ? base
    : Effect.flatMap(Effect.serviceOption(retryKey), (opt) =>
        Effect.gen(function* () {
          const lastError = yield* Ref.make<unknown>(undefined);
          // No policy in context → makeDefault (transient/throttling/server
          // errors, capped exponential backoff + jitter, honors server
          // retryAfter hints). Mirrors the distilled client.
          const policy = Option.isSome(opt) ? opt.value : makeDefault;
          const opts =
            typeof policy === "function" ? policy(lastError) : policy;
          if (!opts.while) return yield* base;
          return yield* base.pipe(
            Effect.tapError((e) => Ref.set(lastError, e)),
            Effect.retry({
              while: (e: unknown) => opts.while!(e),
              ...(opts.schedule ? { schedule: opts.schedule as any } : {}),
            }),
          );
        }),
      );

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
  const fn = ((input: unknown) => callOperation(fn, input)) as OperationFn;
  fn[stateKey] = { configFn, prepared: undefined, strategy: undefined };
  Object.setPrototypeOf(fn, OperationProto);
  return fn as any;
}

//#endregion

//#region MakePaginated

/**
 * STRUCTURAL fallback for the element type `.items()` yields: the array
 * element of the page response itself, or of its `result` member.
 *
 * It can only see shapes it was taught, so any other envelope
 * (`{ branches: […] }`, `{ data: […] }`, …) lands on `unknown` — which is
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
 * Used twice in {@link PaginatedOperationMethod} — once with the operation's
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
 * `.pages` / `.items` on BOTH — the operation object for
 * `yield* op.items(input)`, and the requirement-free call function for
 * `const op = yield* operation; yield* op.items(input)` (distilled #145).
 */
export type PaginatedOperationMethod<
  I,
  O,
  E,
  R,
  Item = PaginatedItem<O>,
> = Effect.Effect<PaginatedCall<I, O, E, never, Item>, never, R> &
  PaginatedCall<I, O, E, R, Item>;

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
  const fn: any = make(configFn);
  fn[stateKey].strategy = strategy;
  Object.setPrototypeOf(fn, PaginatedProto);
  return fn;
}

const pagesOf = (
  call: (input: any) => Effect.Effect<any, any, any>,
  fn: OperationFn,
  input: Record<string, unknown>,
) => {
  const state = fn[stateKey];
  const pagination = prepareOperation(fn).cfg.pagination!;
  const paginate = state.strategy ?? Pagination.paginateWithDefaults;
  return paginate(call, input, pagination);
};

const itemsOf = (
  call: (input: any) => Effect.Effect<any, any, any>,
  fn: OperationFn,
  input: Record<string, unknown>,
) => {
  const items = prepareOperation(fn).cfg.pagination?.items;
  const pages = pagesOf(call, fn, input);
  return items ? Pagination.extractItems(pages, items) : pages;
};

// Paginated operations add `.pages` / `.items` to the operation AND to the
// context-bound function `yield* operation` hands back (distilled #145).
const PaginatedProto: any = Object.setPrototypeOf(
  {
    pages(this: OperationFn, input: Record<string, unknown>) {
      return pagesOf(this, this, input);
    },
    items(this: OperationFn, input: Record<string, unknown>) {
      return itemsOf(this, this, input);
    },
    asEffect(this: OperationFn) {
      return Effect.map(Effect.context(), (context) => {
        const bound = bindContext(this, context);
        return Object.assign(bound, {
          pages: (input: Record<string, unknown>) =>
            pagesOf(bound, this, input),
          items: (input: Record<string, unknown>) =>
            itemsOf(bound, this, input),
        });
      });
    },
  },
  OperationProto,
);

//#endregion
