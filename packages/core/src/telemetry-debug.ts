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
 *     serialize, sign, deserialize, backoff sleeps and the caller's read
 *     of a streamed output (`Tracer.MinimumTraceLevel` can drop them);
 *
 * and carries the caller's `code.*` attributes.
 *
 * Every SDK also writes the same `Effect.logDebug` lines for each call,
 * with or without an exporter. They go to the program's logger, so they
 * show when `References.MinimumLogLevel` admits `Debug`, and a logger that
 * reads the current span (an OTel log exporter) links them to the trace:
 *
 * ```
 * DEBUG distilled.operation=0ms: call S3.PutObject
 *   distilled.operation: S3.PutObject
 *   url.template: /{Bucket}/{Key+}
 * DEBUG distilled.operation=23ms: -> PUT my-bucket.s3.us-east-1.amazonaws.com
 * DEBUG distilled.operation=25ms: <- 200
 * DEBUG distilled.operation=27ms: ok S3.PutObject
 * ```
 *
 * The lines hold no request or response body and no full URL (a URL can
 * carry a presigned signature): the method, host, URL template, status,
 * and the error's tag on failure.
 */
import * as Cause from "effect/Cause";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as Layer from "effect/Layer";
import * as Stream from "effect/Stream";
import * as Tracer from "effect/Tracer";
import { Debug, type DebugHooks, OperationSpan, tagOf } from "./telemetry.ts";

/**
 * The call's log lines. Every line inside (the HTTP ones included) carries
 * the operation and its URL template, and the exit line its duration.
 */
const call: DebugHooks["call"] = (info, effect) => {
  const template = info.attributes["url.template"];
  const logged = Effect.flatMap(Effect.logDebug(`call ${info.name}`), () =>
    Effect.onExit(effect, (exit) =>
      Exit.isSuccess(exit)
        ? Effect.logDebug(`ok ${info.name}`)
        : Cause.hasInterruptsOnly(exit.cause)
          ? Effect.logDebug(`interrupted ${info.name}`)
          : Effect.logDebug(`failed ${info.name}: ${tagOf(Cause.squash(exit.cause))}`),
    ),
  );
  return Effect.annotateLogs(Effect.withLogSpan(logged, "distilled.operation"), {
    "distilled.operation": info.name,
    ...(typeof template === "string" ? { "url.template": template } : {}),
  });
};

/** The host of `url`, without the path or query (which can carry secrets). */
const hostOf = (url: string): string => {
  try {
    return new URL(url).host;
  } catch {
    return "";
  }
};

/** One HTTP exchange: method and host out, status back. */
const http: DebugHooks["http"] = (request, sent) =>
  Effect.flatMap(Effect.logDebug(`-> ${request.method} ${hostOf(request.url)}`), () =>
    Effect.tap(sent, (response) => Effect.logDebug(`<- ${response.status}`)),
  );

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

/**
 * `distilled.read_stream`: from the caller's first pull on a streamed
 * output member (an S3 object body, a Bedrock event stream) to its end,
 * with the member's name and how many items (and bytes) it carried. It
 * fills the operation span's time after the response headers arrive.
 */
const readStream: DebugHooks["readStream"] = (stream, parent, member) =>
  Stream.unwrap(
    Effect.map(
      Effect.makeSpan("distilled.read_stream", {
        parent,
        level: "Debug",
        attributes: { "distilled.stream.member": member },
      }),
      (span) => {
        let items = 0;
        let bytes = 0;
        const counted = Stream.map(stream, (item) => {
          items++;
          if (item instanceof Uint8Array) bytes += item.byteLength;
          return item;
        });
        return Stream.onExit(counted, (exit) =>
          Effect.clockWith((clock) =>
            Effect.sync(() => {
              span.attribute("distilled.stream.items", items);
              if (bytes > 0) span.attribute("distilled.stream.bytes", bytes);
              if (Exit.isFailure(exit) && !Cause.hasInterruptsOnly(exit.cause)) {
                span.attribute("error.type", tagOf(Cause.squash(exit.cause)));
              }
              span.end(clock.currentTimeNanosUnsafe(), exit);
            }),
          ),
        );
      },
    ),
  );

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

export const TelemetryDebug = {
  /** Turns on debug spans and debug log lines for every distilled call it is provided to. */
  layer: /*@__PURE__*/ Layer.succeed(Debug, {
    phase,
    attempt,
    readStream,
    callSite,
    call,
    http,
  }) as Layer.Layer<never>,
} as const;
