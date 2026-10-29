/**
 * Client call metrics (opt in): a program that never imports this module
 * never bundles it.
 *
 * ```ts
 * import { TelemetryMetrics } from "@distilled.cloud/core/telemetry-metrics";
 * program.pipe(Effect.provide(TelemetryMetrics.layer));
 * ```
 *
 * Records `rpc.client.call.duration` (semantic conventions v1.44:
 * histogram, seconds) for every operation call, around all its retries,
 * whether or not a span is recorded, with `rpc.system.name`, `rpc.method`
 * and, on failure, `error.type`. Effect's metric exporters
 * (`@effect/opentelemetry`, `effect/observability`) send it on.
 */
import * as Cause from "effect/Cause";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as Layer from "effect/Layer";
import * as Metric from "effect/Metric";
import { type Measure, Metrics, type OperationInfo, tagOf } from "./telemetry.ts";

/** The buckets the RPC and HTTP conventions recommend, in seconds. */
const BOUNDARIES = [0.005, 0.01, 0.025, 0.05, 0.075, 0.1, 0.25, 0.5, 0.75, 1, 2.5, 5, 7.5, 10];

const duration = /*@__PURE__*/ Metric.histogram("rpc.client.call.duration", {
  description: "Duration of outbound RPC calls.",
  boundaries: BOUNDARIES,
});

/** One histogram per operation and outcome, built once. */
const byOperation = new WeakMap<OperationInfo, Map<string, Metric.Metric<number, unknown>>>();

const metricOf = (info: OperationInfo, errorType: string | undefined) => {
  let byOutcome = byOperation.get(info);
  if (byOutcome === undefined) byOperation.set(info, (byOutcome = new Map()));
  const key = errorType ?? "";
  let metric = byOutcome.get(key);
  if (metric === undefined) {
    const attributes: Record<string, string> = {};
    for (const name of ["rpc.system.name", "rpc.method"]) {
      const value = info.attributes[name];
      if (typeof value === "string") attributes[name] = value;
    }
    if (errorType !== undefined) attributes["error.type"] = errorType;
    metric = Metric.withAttributes(duration, attributes) as Metric.Metric<number, unknown>;
    byOutcome.set(key, metric);
  }
  return metric;
};

const errorTypeOf = (exit: Exit.Exit<unknown, unknown>): string | undefined =>
  Exit.isSuccess(exit) ? undefined : tagOf(Cause.squash(exit.cause));

const measure: Measure = (info, effect) =>
  Effect.clockWith((clock) => {
    const start = clock.currentTimeNanosUnsafe();
    return Effect.onExit(effect, (exit) =>
      Metric.update(
        metricOf(info, errorTypeOf(exit)),
        Number(clock.currentTimeNanosUnsafe() - start) / 1e9,
      ),
    );
  });

export const TelemetryMetrics = {
  /** Records `rpc.client.call.duration` for every distilled call it is provided to. */
  layer: /*@__PURE__*/ Layer.succeed(Metrics, measure) as Layer.Layer<never>,
} as const;
