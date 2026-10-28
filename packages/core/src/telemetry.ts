/**
 * Telemetry shared by every distilled SDK.
 *
 *   operation spans (always): one span per operation call, around every retry.
 *               Its name, kind and attributes come from the model's
 *               `com.distilled.telemetry` traits (see
 *               `packages/dev/src/codegen/telemetry-traits.md`), carried by the generated
 *               operation's `telemetry` and `span` config, plus the
 *               request's host and method and the response's status. It
 *               replaces Effect's HTTP span. Retries are attributes on it
 *               (attempts, errors, total backoff). A failure gets the
 *               user's call site as a stack frame, so `Cause.pretty`
 *               shows it.
 *   debug (opt in):  spans for distilled's internals too, INTERNAL spans
 *               at trace level `Debug`: first-call setup, serialize, sign,
 *               deserialize, one `Attempt` per try, backoff sleeps, and the
 *               caller's `code.*` attributes. Its code lives in
 *               `./telemetry-debug.ts`, so only programs that import it
 *               bundle it:
 *
 * ```ts
 * import { TelemetryDebug } from "@distilled.cloud/core/telemetry-debug";
 * program.pipe(Effect.provide(TelemetryDebug.layer));
 * ```
 *
 * No span is recorded unless the app installs a tracer (an exporter).
 */
import * as Cause from "effect/Cause";
import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import type * as Exit from "effect/Exit";
import * as Fiber from "effect/Fiber";
import * as HttpClient from "effect/http/HttpClient";
import type * as HttpClientError from "effect/http/HttpClientError";
import * as HttpClientRequest from "effect/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Redacted from "effect/Redacted";
import * as References from "effect/References";
import type * as AST from "effect/SchemaAST";
import * as Tracer from "effect/Tracer";
import { getAnn, getProps } from "./annotations.ts";

/**
 * Debug mode's implementation, provided by `TelemetryDebug.layer`
 * (`./telemetry-debug.ts`); undefined, the default, is operation spans only.
 * The per-call path only checks whether it is set.
 */
export interface DebugHooks {
  /** An INTERNAL span around one of distilled's steps. */
  readonly phase: <A, E, R>(
    name: string,
    effect: Effect.Effect<A, E, R>,
    attributes?: Record<string, unknown>,
  ) => Effect.Effect<A, E, R>;
  /** Try `n` (1-based) as its own `Attempt` span. */
  readonly attempt: <A, E, R>(base: Effect.Effect<A, E, R>, n: number) => Effect.Effect<A, E, R>;
  /** Log each request and response line to stderr (`./debug.ts`). */
  readonly logRequests: boolean;
  /** OTel `code.*` attributes for the caller's line. */
  readonly callSite: (
    callSite: (() => string | undefined) | undefined,
  ) => Record<string, unknown> | undefined;
}

export const Debug = /*@__PURE__*/ Context.Reference<DebugHooks | undefined>(
  "@distilled.cloud/core/Telemetry/Debug",
  { defaultValue: () => undefined },
);

/**
 * The traced call running on this fiber: its operation span, the debug-mode
 * attempt span of the current try, and the retry history so far. Protocols
 * write through {@link annotate} synchronously, without an extra effect.
 */
export interface Call {
  readonly span: Tracer.Span;
  readonly info: OperationInfo;
  attempt: Tracer.Span | undefined;
  readonly retryErrors: Array<string>;
  retryDelayMs: number;
}

export const OperationSpan = /*@__PURE__*/ Context.Reference<Call | undefined>(
  "@distilled.cloud/core/Telemetry/OperationSpan",
  { defaultValue: () => undefined },
);

//#region traits

/**
 * How a value becomes an attribute value (`com.distilled.telemetry`
 * transforms; see `packages/dev/src/codegen/telemetry-traits.md`).
 */
export type Transform =
  | "list"
  | "keys"
  | "count"
  | "lastPathSegment"
  | "arnResource"
  | "arn"
  | "jsonList"
  | "nonZero";

export interface AttributeRule {
  readonly name: string;
  /** Dotted path into the member's value, read before the transform. */
  readonly field?: string;
  readonly transform?: Transform;
}

/**
 * Extra facts for a request, by host (`hostRules` in
 * `./telemetry-host-rules.ts`): `set` records an attribute on the span.
 */
export type RequestHook = (
  host: string,
  span: Tracer.Span,
  set: (key: string, value: unknown) => void,
) => void;

/** The `com.distilled.telemetry#service` trait, as generated code carries it. */
export interface ServiceTelemetry {
  readonly system: string;
  readonly attributes?: Readonly<Record<string, string | number | boolean>>;
  readonly responseHeaders?: ReadonlyArray<AttributeRule & { readonly header: string }>;
  /** From the trait's `hosts`. */
  readonly onRequest?: RequestHook;
  /**
   * The rules every operation of this module follows, so its generated
   * `span` holds only what differs (see {@link operationInfo}): span name
   * `<prefix>.<op>`, `rpc.method` `<service>/<op>`, and each path label
   * recorded as `<labels>.<label in snake_case>`.
   */
  readonly prefix?: string;
  readonly service?: string;
  readonly labels?: string;
  /** Path labels named another way than `<labels>.<snake_case>`, by property. */
  readonly labelNames?: Readonly<Record<string, string>>;
  /** `false`: operations do not derive `url.template` (RPC protocols). */
  readonly templates?: false;
  /**
   * How requests carry the span's trace context, from the trait's
   * `propagation`: `"w3c"`, a `traceparent` header; or a function returning
   * the header to set (X-Ray, `./telemetry-xray.ts`).
   */
  readonly propagate?: "w3c" | ((span: Tracer.AnySpan) => readonly [header: string, value: string]);
}

/** A span name for one call from its input attributes; undefined keeps the trait's `name`. */
export type SpanRename = (attributes: Readonly<Record<string, unknown>>) => string | undefined;

/** Read trace context back from an operation's messages (the trait's `extract`). */
export interface MessageExtract {
  /** The input asking the service to return the trace context. */
  readonly request: (input: unknown) => unknown;
  /** Links to the spans the output's messages name. */
  readonly links: (output: unknown) => ReadonlyArray<Tracer.SpanLink>;
}

/**
 * The `com.distilled.telemetry#operation` trait plus its input members'
 * rules. The trait's `nameTemplate`, `inject` and `extract` arrive as the
 * functions `./telemetry-name-template.ts` and
 * `./telemetry-message-context.ts` build from them.
 */
export interface SpanConfig {
  /**
   * The operation's model name. With it, whatever this config leaves out
   * follows the service's rules and the input schema's annotations.
   */
  readonly op?: string;
  /** `false`: no `url.template`, whatever the service's rule. */
  readonly template?: false;
  readonly name?: string;
  readonly method?: string;
  readonly kind?: "client" | "producer" | "consumer";
  /** Fixed attributes; `null` drops one the service sets. */
  readonly attributes?: Readonly<Record<string, string | number | boolean | null>>;
  /** `com.distilled.telemetry#attributes` of the input members, by property name. */
  readonly input?: Readonly<Record<string, ReadonlyArray<AttributeRule>>>;
  /**
   * Attributes recorded under a second name once the request is built:
   * `{ "cloud.region": "faas.invoked_region" }`.
   */
  readonly copy?: Readonly<Record<string, string>>;
  /** The same, for output members: recorded when the call succeeds. */
  readonly output?: Readonly<Record<string, ReadonlyArray<AttributeRule>>>;
  readonly rename?: SpanRename;
  /** Write the span's trace context into the request's messages. */
  readonly inject?: (span: Tracer.Span, input: unknown) => unknown;
  readonly extract?: MessageExtract;
}

/** One operation's span facts, built once per operation. */
export interface OperationInfo {
  /** Span name, e.g. `S3.GetObject`. */
  readonly name: string;
  readonly kind: "client" | "producer" | "consumer";
  /** Fixed attributes: rpc.system.name, rpc.method, service and operation attributes. */
  readonly attributes: Readonly<Record<string, unknown>>;
  /** Input property and rule pairs, flattened. */
  readonly input: ReadonlyArray<readonly [property: string, rule: AttributeRule]>;
  readonly output: ReadonlyArray<readonly [property: string, rule: AttributeRule]>;
  readonly responseHeaders: ReadonlyArray<AttributeRule & { readonly header: string }>;
  readonly onRequest: RequestHook | undefined;
  readonly propagate: ServiceTelemetry["propagate"];
  readonly copy: SpanConfig["copy"];
  readonly rename: SpanRename | undefined;
  readonly inject: SpanConfig["inject"];
  readonly extract: MessageExtract | undefined;
}

const isScalar = (value: unknown): value is string | number | boolean =>
  typeof value === "string" || typeof value === "number" || typeof value === "boolean";

const fieldOf = (value: unknown, path: string): unknown => {
  let at = value;
  for (const key of path.split(".")) {
    if (at === null || typeof at !== "object") return undefined;
    at = (at as Record<string, unknown>)[key];
  }
  return at;
};

const transform = (rule: AttributeRule, raw: unknown): unknown => {
  const value = rule.field === undefined ? raw : fieldOf(raw, rule.field);
  if (value === undefined || value === null || Redacted.isRedacted(value)) return undefined;
  switch (rule.transform) {
    case undefined:
      return isScalar(value) || (Array.isArray(value) && value.length > 0 && value.every(isScalar))
        ? value
        : undefined;
    case "nonZero":
      return typeof value === "number" && value !== 0 ? value : undefined;
    case "list":
      return typeof value === "string" ? [value] : undefined;
    case "keys":
      return value !== null && typeof value === "object" ? Object.keys(value) : undefined;
    case "count":
      return Array.isArray(value) ? value.length : undefined;
    case "lastPathSegment":
      return typeof value === "string" ? value.slice(value.lastIndexOf("/") + 1) : undefined;
    case "arnResource":
      return typeof value === "string" ? value.slice(value.lastIndexOf(":") + 1) : undefined;
    case "arn":
      return typeof value === "string" && value.startsWith("arn:") ? value : undefined;
    case "jsonList":
      return Array.isArray(value)
        ? value.map((v) => JSON.stringify(v))
        : typeof value === "object"
          ? [JSON.stringify(value)]
          : undefined;
  }
};

const HTTP = /*@__PURE__*/ Symbol.for("@distilled.cloud/core/http");
const LABEL = /*@__PURE__*/ Symbol.for("@distilled.cloud/core/http/label");

/** `zoneId` / `zone-id` / `ZoneID` -> `zone_id`, as the trait defaults spell labels. */
const snakeCase = (name: string): string =>
  name
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
    .replace(/[^A-Za-z0-9]+/g, "_")
    .toLowerCase();

/**
 * The span facts of an operation from its generated `telemetry` and `span`
 * config. A `span` naming its `op` (a string is just the op) derives what it
 * leaves out, from the service's rules and the input schema:
 *
 *   name          `<service.prefix>.<op>`
 *   rpc.method    `<service.service>/<op>`
 *   url.template  the path of the input's `T.Http` uri, unless the service
 *                 or the span says `false`
 *   input         each `T.Label` property as `<service.labels>.<snake_case>`;
 *                 an explicit entry replaces it (`[]` records nothing)
 *
 * The generator emits only what differs from these rules, so the result is
 * exactly the model's `com.distilled.telemetry` traits. An operation
 * generated without traits gets its operation name, or
 * `distilled.operation`.
 */
export const operationInfo = (
  service: ServiceTelemetry | undefined,
  config: SpanConfig | string | undefined,
  operationName: string | undefined,
  inputAst?: AST.AST,
): OperationInfo => {
  const span: SpanConfig | undefined = typeof config === "string" ? { op: config } : config;
  const op = span?.op;
  let rules = span?.input;
  let template: string | undefined;
  if (op !== undefined && inputAst !== undefined) {
    if (service?.templates !== false && span?.template !== false) {
      template = (getAnn(inputAst, HTTP) as { readonly uri?: string } | undefined)?.uri?.split(
        "?",
      )[0];
    }
    if (service?.labels !== undefined) {
      const derived: Record<string, ReadonlyArray<AttributeRule>> = {};
      for (const prop of getProps(inputAst)) {
        if (getAnn(prop.type, LABEL) === undefined) continue;
        const property = String(prop.name);
        derived[property] = [
          { name: service.labelNames?.[property] ?? `${service.labels}.${snakeCase(property)}` },
        ];
      }
      rules = { ...derived, ...rules };
    }
  }
  const input = flatten(rules);
  const attributes: Record<string, unknown> = {
    ...(service ? { "rpc.system.name": service.system } : {}),
    ...service?.attributes,
    ...(template !== undefined ? { "url.template": template } : {}),
    ...span?.attributes,
  };
  for (const key in span?.attributes) if (attributes[key] === null) delete attributes[key];
  const method =
    span?.method ??
    (op !== undefined && service?.service !== undefined ? `${service.service}/${op}` : undefined);
  return {
    name:
      span?.name ??
      (op !== undefined && service?.prefix !== undefined ? `${service.prefix}.${op}` : undefined) ??
      operationName ??
      "distilled.operation",
    kind: span?.kind ?? "client",
    attributes: method === undefined ? attributes : { "rpc.method": method, ...attributes },
    input,
    output: flatten(span?.output),
    responseHeaders: service?.responseHeaders ?? [],
    onRequest: service?.onRequest,
    propagate: service?.propagate,
    copy: span?.copy,
    rename: span?.rename,
    inject: span?.inject,
    extract: span?.extract,
  };
};

const flatten = (
  rules: Readonly<Record<string, ReadonlyArray<AttributeRule>>> | undefined,
): Array<readonly [string, AttributeRule]> => {
  const out: Array<readonly [string, AttributeRule]> = [];
  for (const property in rules) {
    for (const rule of rules[property]!) out.push([property, rule]);
  }
  return out;
};

/** Attributes the rules read from a value (the input or the output). Redacted values are skipped. */
const readRules = (
  rules: OperationInfo["input"],
  value: unknown,
  set: (key: string, value: unknown) => void,
): void => {
  if (rules.length === 0 || value === null || typeof value !== "object") return;
  for (const [property, rule] of rules) {
    const read = transform(rule, (value as Record<string, unknown>)[property]);
    if (read !== undefined) set(rule.name, read);
  }
};

/**
 * An opt-in observer of every operation call (`./telemetry-metrics.ts`):
 * wraps the call, whether or not a span is recorded.
 */
export type Measure = <A, E, R>(
  info: OperationInfo,
  effect: Effect.Effect<A, E, R>,
) => Effect.Effect<A, E, R>;

export const Metrics = /*@__PURE__*/ Context.Reference<Measure | undefined>(
  "@distilled.cloud/core/Telemetry/Metrics",
  { defaultValue: () => undefined },
);

/** App callbacks on each recorded operation span (`./telemetry-hooks.ts`). */
export interface SpanHooks {
  readonly onStart?: (
    span: Tracer.Span,
    call: { readonly name: string; readonly method: unknown; readonly input: unknown },
  ) => void;
  readonly onEnd?: (span: Tracer.Span, exit: Exit.Exit<unknown, unknown>) => void;
}

export const Hooks = /*@__PURE__*/ Context.Reference<SpanHooks | undefined>(
  "@distilled.cloud/core/Telemetry/Hooks",
  { defaultValue: () => undefined },
);

//#endregion

export const isDebug = (context: Context.Context<any>): boolean =>
  Context.get(context, Debug) !== undefined;

/**
 * Record a fact about the current try (status, request id, host): on the
 * operation span, where the last try wins, and on the debug attempt span.
 */
export const annotate = (context: Context.Context<any>, key: string, value: unknown): void => {
  const call = Context.get(context, OperationSpan);
  if (call === undefined) return;
  call.span.attribute(key, value);
  call.attempt?.attribute(key, value);
};

/**
 * The request facts, recorded when it is sent (so a call that never gets a
 * response still has them): method, host and port. Host only: the full URL
 * can carry a presigned signature.
 */
export const annotateRequest = (
  context: Context.Context<any>,
  method: string,
  url: string,
): void => {
  if (Context.get(context, OperationSpan) === undefined) return;
  const schemeEnd = url.indexOf("://");
  const hostStart = schemeEnd + 3;
  let hostEnd = hostStart;
  while (hostEnd < url.length && !"/?#".includes(url[hostEnd]!)) hostEnd++;
  const authority = url.slice(hostStart, hostEnd);
  const colon = authority.lastIndexOf(":");
  const hasPort = colon !== -1 && !authority.endsWith("]");
  const host = hasPort ? authority.slice(0, colon) : authority;
  annotate(context, "http.request.method", method);
  annotate(context, "server.address", host);
  annotate(
    context,
    "server.port",
    hasPort ? Number(authority.slice(colon + 1)) : url.startsWith("https") ? 443 : 80,
  );
  const call = Context.get(context, OperationSpan)!;
  call.info.onRequest?.(host, call.span, (key, value) => annotate(context, key, value));
  for (const from in call.info.copy) {
    const value = call.span.attributes.get(from);
    if (value !== undefined) annotate(context, call.info.copy[from]!, value);
  }
};

/**
 * The response facts, for every protocol: status, and the response
 * headers the service trait lists (request ids).
 */
export const annotateResponse = (
  context: Context.Context<any>,
  status: number,
  headers: Readonly<Record<string, string | undefined>>,
): void => {
  const call = Context.get(context, OperationSpan);
  if (call === undefined) return;
  annotate(context, "http.response.status_code", status);
  for (const rule of call.info.responseHeaders) {
    const value = headers[rule.header];
    if (value !== undefined) annotate(context, rule.name, transform(rule, value));
  }
};

/**
 * `client.execute(request)` for the traced call on this fiber: the
 * request facts before it is sent, the response facts when it returns.
 * Untraced calls pay one context read.
 */
export const execute = (
  context: Context.Context<any>,
  client: HttpClient.HttpClient,
  request: HttpClientRequest.HttpClientRequest,
): Effect.Effect<HttpClientResponse.HttpClientResponse, HttpClientError.HttpClientError> => {
  const call = Context.get(context, OperationSpan);
  if (call === undefined) return client.execute(request);
  annotateRequest(context, request.method, request.url);
  const propagate = call.info.propagate;
  if (propagate !== undefined) {
    const span = call.attempt ?? call.span;
    request =
      propagate === "w3c"
        ? HttpClientRequest.setHeader(
            request,
            "traceparent",
            `00-${span.traceId}-${span.spanId}-${span.sampled ? "01" : "00"}`,
          )
        : HttpClientRequest.setHeader(request, ...propagate(span));
  }
  return Effect.map(client.execute(request), (response) => {
    annotateResponse(
      context,
      response.status,
      response.headers as Readonly<Record<string, string | undefined>>,
    );
    return response;
  });
};

//#region retries

export const tagOf = (error: unknown): string =>
  (error as { _tag?: string } | null)?._tag ?? "_OTHER";

/**
 * Try `n` failed with `error` and the call retries after `delayMs`. The
 * operation span carries the history, so a slow call shows why:
 *
 *   distilled.attempts        5 (tries so far, including the next one)
 *   distilled.retry.errors    ["SlowDown", "SlowDown", "SlowDown", "SlowDown"]
 *   distilled.retry.delay_ms  4087 (total backoff)
 *
 * A call that succeeds first time has none of them.
 */
export const retried = (
  context: Context.Context<any>,
  n: number,
  error: unknown,
  delayMs: number,
): void => {
  const call = Context.get(context, OperationSpan);
  if (call === undefined) return;
  call.retryErrors.push(tagOf(error));
  call.retryDelayMs += delayMs;
  call.span.attribute("distilled.attempts", n + 1);
  call.span.attribute("distilled.retry.errors", call.retryErrors.slice());
  call.span.attribute("distilled.retry.delay_ms", Math.round(call.retryDelayMs));
};

//#endregion

/** Debug-only internal span around `effect`; `effect` itself otherwise. */
export const phase = <A, E, R>(
  context: Context.Context<any>,
  name: string,
  effect: Effect.Effect<A, E, R>,
  attributes?: Record<string, unknown>,
): Effect.Effect<A, E, R> => {
  const debug = Context.get(context, Debug);
  return debug === undefined ? effect : debug.phase(name, effect, attributes);
};

//#region call site

// Frames inside any distilled package (workspace sources or installed).
const CORE_FRAME =
  /[\\/](?:packages[\\/][^\\/]+[\\/](?:src|lib)[\\/]|@distilled\.cloud[\\/])|node:internal/;

/**
 * Capture the caller of an operation, cheaply: `Error.captureStackTrace`
 * drops `entry` (the operation function the user called) and every frame
 * above it, so 2 frames are enough. V8 records them now and formats them
 * only if someone reads `.stack` (an error rendered with `Cause.pretty`, or
 * a debug span exporting `code.*`). Skipped when `Error.stackTraceLimit`
 * is 0, the rule Effect's own spans follow.
 */
export const captureCallSite = (entry: Function): (() => string | undefined) | undefined => {
  const limit = Error.stackTraceLimit;
  if (limit === 0) return undefined;
  const holder: { stack?: string } = {};
  Error.stackTraceLimit = 2;
  if (typeof Error.captureStackTrace === "function") Error.captureStackTrace(holder, entry);
  else holder.stack = new Error().stack;
  Error.stackTraceLimit = limit;
  let cache: string | undefined | null = null;
  return () => {
    if (cache !== null) return cache;
    const lines = holder.stack?.split("\n") ?? [];
    // Skip the "Error" line and any frame still inside distilled.
    cache = lines
      .slice(1)
      .find((line) => !CORE_FRAME.test(line))
      ?.trim();
    return cache;
  };
};

/**
 * Build typed errors without a JS stack: their own
 * frames all point into distilled's response decoder (noise), and the
 * failure frame supplies the caller's line instead. Saves the frame capture
 * on every error. Defects keep their stacks. Use inline:
 *
 *   const saved = suppressStack();
 *   try { error = new Cls(...) } finally { restoreStack(saved) }
 */
export const suppressStack = (): number | undefined => {
  const limit = Error.stackTraceLimit;
  if (limit === 0) return undefined;
  Error.stackTraceLimit = 0;
  return limit;
};

export const restoreStack = (saved: number | undefined): void => {
  if (saved !== undefined) Error.stackTraceLimit = saved;
};

//#endregion

//#region operation span

const always = () => true;

/** Whether an app installed a tracer (an exporter); the native tracer exports nothing. */
const exporting = (fiber: Fiber.Fiber<unknown, unknown>): boolean => {
  const tracer = fiber.cache.tracer;
  return tracer !== undefined && tracer !== Tracer.nativeTracer;
};

/**
 * On failure only, add the operation as a stack frame at the caller's line,
 * so `Cause.pretty` prints `at S3.GetObject (user.ts:12:5)`. Success pays
 * one `catchCause`; no stack-frame context is provided per call.
 */
const withFailureFrame = <A, E, R>(
  body: Effect.Effect<A, E, R>,
  name: string,
  callSite: (() => string | undefined) | undefined,
): Effect.Effect<A, E, R> =>
  callSite === undefined
    ? body
    : Effect.catchCause(body, (cause) =>
        Effect.withFiber((fiber) =>
          Effect.failCause(
            Cause.annotate(
              cause,
              Context.make(Cause.StackTrace, {
                name,
                stack: callSite,
                parent:
                  Context.getOrUndefined(Cause.annotations(cause), Cause.StackTrace) ??
                  fiber.getRef(References.CurrentStackFrame),
              }),
              { overwrite: true },
            ),
          ),
        ),
      );

/**
 * One operation call (every attempt), with or without debug hooks.
 *
 *   no exporter: no span. Effect's HTTP span is switched off too (nobody
 *                would see it); the failure frame still names the call.
 *   operation:   one CLIENT span. Effect's HTTP span is switched off and
 *                protocols copy its facts (status, host, request id) onto
 *                this span, so one span per call.
 *   debug:       the span is the parent of Effect's HTTP span (one per
 *                attempt) and of distilled's internal spans.
 *
 * Failures set `error.type` to the error's tag; Effect sets the status.
 */
export const operationSpan = <A, E, R>(
  fiber: Fiber.Fiber<unknown, unknown>,
  debug: DebugHooks | undefined,
  info: OperationInfo,
  callSite: (() => string | undefined) | undefined,
  input: unknown,
  run: (input: unknown) => Effect.Effect<A, E, R>,
): Effect.Effect<A, E, R> => {
  const measure = fiber.getRef(Metrics);
  const traced = traceCall(fiber, debug, info, callSite, input, run);
  return measure === undefined ? traced : measure(info, traced);
};

const traceCall = <A, E, R>(
  fiber: Fiber.Fiber<unknown, unknown>,
  debug: DebugHooks | undefined,
  info: OperationInfo,
  callSite: (() => string | undefined) | undefined,
  input: unknown,
  run: (input: unknown) => Effect.Effect<A, E, R>,
): Effect.Effect<A, E, R> => {
  if (!exporting(fiber)) {
    const body = run(input);
    return withFailureFrame(
      debug !== undefined
        ? body
        : Effect.provideService(body, HttpClient.TracerDisabledWhen, always),
      info.name,
      callSite,
    );
  }
  const attributes: Record<string, unknown> =
    debug !== undefined
      ? { ...info.attributes, ...debug.callSite(callSite) }
      : { ...info.attributes };
  readRules(info.input, input, (key, value) => (attributes[key] = value));
  const hooks = fiber.getRef(Hooks);
  const traced = Effect.useSpan(
    info.rename?.(attributes) ?? info.name,
    { kind: info.kind, attributes },
    (span) => {
      const extract = info.extract;
      let sent = info.inject === undefined ? input : info.inject(span, input);
      if (extract !== undefined) sent = extract.request(sent);
      let body = Effect.tapError(run(sent), (error) =>
        Effect.sync(() => span.attribute("error.type", tagOf(error))),
      );
      if (extract !== undefined || info.output.length > 0) {
        body = Effect.tap(body, (output) =>
          Effect.sync(() => {
            readRules(info.output, output, (key, value) => span.attribute(key, value));
            if (extract !== undefined) {
              const links = extract.links(output);
              if (links.length > 0) span.addLinks(links);
            }
          }),
        );
      }
      if (hooks !== undefined) {
        hooks.onStart?.(span, { name: info.name, method: info.attributes["rpc.method"], input });
        const onEnd = hooks.onEnd;
        if (onEnd !== undefined) {
          body = Effect.onExit(body, (exit) => Effect.sync(() => onEnd(span, exit)));
        }
      }
      const call: Call = {
        span,
        info,
        attempt: undefined,
        retryErrors: [],
        retryDelayMs: 0,
      };
      if (debug !== undefined) {
        // ParentSpan directly: withParentSpan would also push a name-only
        // stack frame, printed twice next to the failure frame.
        return Effect.updateContext(body, (context: Context.Context<any>) =>
          Context.add(Context.add(context, OperationSpan, call), Tracer.ParentSpan, span),
        );
      }
      return Effect.updateContext(body, (context: Context.Context<any>) =>
        Context.add(
          Context.add(context, OperationSpan, call),
          HttpClient.TracerDisabledWhen,
          always,
        ),
      );
    },
  ) as Effect.Effect<A, E, R>;
  return withFailureFrame(traced, info.name, callSite);
};

//#endregion
