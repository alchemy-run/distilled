/**
 * Debug telemetry: spans for distilled's internals, on top of the operation
 * span every call records. Opt in by providing the layer; a program that
 * never imports this module never bundles it.
 *
 * ```ts
 * import { TelemetryDebug } from "@distilled.cloud/core/telemetry-debug";
 * program.pipe(Effect.provide(TelemetryDebug.layer));
 * ```
 *
 * With it, the operation span is the parent of:
 *
 *   - one `Attempt` span per try, with Effect's HTTP span under it;
 *   - INTERNAL spans at trace level `Debug` for first-call setup,
 *     serialize, sign, deserialize and backoff sleeps
 *     (`Tracer.MinimumTraceLevel` can drop them);
 *
 * and carries the caller's `code.*` attributes.
 *
 * `layerWith({ logRequests: true })` also prints one stderr line per request
 * and per response, whether or not an exporter is installed:
 *
 * ```
 * [distilled] -> GET /zones/{zone_id}
 * [distilled] <- 404 {"success":false,"errors":[...]}
 * ```
 *
 * Response lines carry up to 400 characters of the body, which can hold
 * secrets the API returns.
 */
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Tracer from "effect/Tracer";
import { Debug, type DebugHooks, OperationSpan, tagOf } from "./telemetry.ts";

const phase: DebugHooks["phase"] = (name, effect, attributes) =>
  Effect.withSpan(effect, name, { level: "Debug", attributes, captureStackTrace: false });

const attempt: DebugHooks["attempt"] = (base, n) =>
  Effect.withFiber((fiber) => {
    const call = fiber.getRef(OperationSpan);
    if (call === undefined) return base;
    return Effect.useSpan(
      "Attempt",
      {
        parent: call.span,
        attributes: { "distilled.attempt": n, "http.request.resend_count": n - 1 },
      },
      (span) => {
        call.attempt = span;
        const run = Effect.tapError(base, (error) =>
          Effect.sync(() => span.attribute("error.type", tagOf(error))),
        );
        return Effect.provideService(run, Tracer.ParentSpan, span);
      },
    );
  });

const LOCATION = /\(?((?:file:\/\/)?[^\s()]+):(\d+):(\d+)\)?$/;

/** OTel `code.*` attributes for the caller's line. */
const callSite: DebugHooks["callSite"] = (site) => {
  const line = site?.();
  const match = line ? LOCATION.exec(line) : null;
  if (!match) return undefined;
  const fn = /^at (\S+) \(/.exec(line!)?.[1];
  return {
    "code.file.path": match[1],
    "code.line.number": Number(match[2]),
    "code.column.number": Number(match[3]),
    ...(fn ? { "code.function.name": fn } : {}),
  };
};

export interface Options {
  /** Print each request and response to stderr. Default `false`. */
  readonly logRequests?: boolean;
}

const layerWith = (options: Options = {}): Layer.Layer<never> =>
  Layer.succeed(Debug, {
    phase,
    attempt,
    callSite,
    logRequests: options.logRequests === true,
  }) as Layer.Layer<never>;

export const TelemetryDebug = {
  /** Turns on debug spans for every distilled call it is provided to. */
  layer: /*@__PURE__*/ layerWith(),
  /** Debug spans, with options (`logRequests`). */
  layerWith,
} as const;
