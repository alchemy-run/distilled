/**
 * Operation spans that cover a streamed response (the
 * `com.distilled.telemetry#operation` trait's `stream`). Generated modules
 * import this only for the operations whose trait has it, so other programs
 * never bundle it.
 *
 * The GenAI conventions say a GenAI span ends "when the response is fully
 * received", and the OpenTelemetry AWS SDK instrumentations (JavaScript,
 * Python) end Bedrock `ConverseStream` and `InvokeModelWithResponseStream`
 * spans when the caller has read the stream. Every other operation span,
 * S3 `GetObject` included, ends when the call returns, after the response
 * headers, as those instrumentations and the HTTP client span conventions
 * do: reading an object body is the app's work.
 *
 * With `stream: { member }`, the span ends when the caller has read that
 * output member to its end. An error while reading fails it and sets
 * `error.type`; a caller that stops early (`Stream.take`, an interruption)
 * ends it then, with success. A stream the caller never reads never ends
 * the span, as in those instrumentations: the conventions ask clients not
 * to end a span later, in clean-up. `firstChunk` names the attribute that
 * records the seconds from the span's start to the first item
 * (`gen_ai.response.time_to_first_chunk`).
 */
import * as Cause from "effect/Cause";
import * as Clock from "effect/Clock";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as References from "effect/References";
import * as Stream from "effect/Stream";
import { type SpanHold, tagOf } from "./telemetry.ts";

export interface StreamRule {
  /** The output member holding the stream (the generated property name). */
  readonly member: string;
  /** Attribute for the seconds from the span's start to the first item. */
  readonly firstChunk?: string;
}

export const holdForStream =
  (rule: StreamRule): SpanHold =>
  (fiber, name, options, debug, inSpan) => {
    const clock = fiber.getRef(Clock.Clock);
    const timing = fiber.getRef(References.TracerTimingEnabled);
    const now = () => (timing ? clock.currentTimeNanosUnsafe() : 0n);
    return Effect.uninterruptibleMask((restore) =>
      Effect.flatMap(Effect.makeSpan(name, options), (span) => {
        const end = (exit: Exit.Exit<unknown, unknown>) => {
          if (span.status._tag !== "Ended") span.end(now(), exit);
        };
        let held = false;
        const body = Effect.map(inSpan(span), (output) => {
          const fields = output as Record<string, unknown> | null;
          const stream = fields?.[rule.member];
          if (!Stream.isStream(stream)) return output;
          held = true;
          let done = false;
          const read = Stream.suspend(() => {
            let items = debug === undefined ? stream : debug.readStream(stream, span, rule.member);
            const attribute = rule.firstChunk;
            if (attribute !== undefined) {
              let first = true;
              items = Stream.map(items, (item) => {
                if (first) {
                  first = false;
                  span.attribute(attribute, Number(now() - span.status.startTime) / 1e9);
                }
                return item;
              });
            }
            return items;
          });
          const wrapped = Stream.onExit(read, (exit) =>
            Effect.sync(() => {
              if (done) return;
              done = true;
              if (Exit.isFailure(exit) && !Cause.hasInterruptsOnly(exit.cause)) {
                span.attribute("error.type", tagOf(Cause.squash(exit.cause)));
                end(exit);
              } else end(Exit.void);
            }),
          );
          return { ...fields, [rule.member]: wrapped } as typeof output;
        });
        return Effect.onExit(restore(body), (exit) =>
          Effect.sync(() => {
            if (!held || Exit.isFailure(exit)) end(exit);
          }),
        );
      }),
    );
  };
