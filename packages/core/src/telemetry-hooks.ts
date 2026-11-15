/**
 * App callbacks on each recorded operation span, for attributes distilled
 * does not record (an app's own ids, a custom request field):
 *
 * ```ts
 * import { TelemetryHooks } from "@distilled.cloud/core/telemetry-hooks";
 *
 * program.pipe(
 *   Effect.provide(
 *     TelemetryHooks.layer({
 *       onStart: (span, { method, input }) => {
 *         if (method === "S3/PutObject") span.attribute("app.tenant", tenantOf(input));
 *       },
 *       onEnd: (span, exit) => {},
 *     }),
 *   ),
 * );
 * ```
 *
 * `onStart` runs when the span starts, before the request is built, with
 * the operation's span name, its `rpc.method` and the caller's input.
 * `onEnd` runs when the call ends, after every retry. Both run only when a
 * span is recorded (an exporter is installed). A program that never
 * imports this module never bundles it.
 */
import * as Layer from "effect/Layer";
import { Hooks, type SpanHooks } from "./telemetry.ts";

export type { SpanHooks };

export const TelemetryHooks = {
  layer: (hooks: SpanHooks): Layer.Layer<never> => Layer.succeed(Hooks, hooks),
} as const;
