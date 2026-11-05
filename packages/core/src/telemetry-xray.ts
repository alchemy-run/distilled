/**
 * AWS X-Ray trace context, which AWS services read and pass on (the OTel
 * AWS SDK conventions recommend it for AWS calls). Generated code imports
 * this only where the model's `com.distilled.telemetry` traits ask for it:
 * a service's `propagation: "xray"`, an operation's `inject` with format
 * `xrayTraceHeader`. See `packages/dev/src/codegen/telemetry-traits.md`.
 *
 * `Root=1-<8 hex>-<24 hex>;Parent=<16 hex>;Sampled=<0|1>`, from a W3C trace
 * id split after 8 hex digits, as OTel's AWS X-Ray propagator writes it.
 */
import * as Tracer from "effect/Tracer";

export const HEADER = "X-Amzn-Trace-Id";

/** The X-Ray trace header of a span. */
export const traceHeader = (span: Tracer.AnySpan): string =>
  `Root=1-${span.traceId.slice(0, 8)}-${span.traceId.slice(8)};Parent=${span.spanId};Sampled=${
    span.sampled ? 1 : 0
  }`;

const ROOT = /(?:^|;)\s*Root=1-([0-9a-f]{8})-([0-9a-f]{24})/;
const PARENT = /(?:^|;)\s*Parent=([0-9a-f]{16})/;
const SAMPLED = /(?:^|;)\s*Sampled=([01])/;

/** The span an X-Ray trace header names, if it has a root and a parent. */
export const parseTraceHeader = (value: unknown): Tracer.ExternalSpan | undefined => {
  if (typeof value !== "string") return undefined;
  const root = ROOT.exec(value);
  const parent = PARENT.exec(value);
  if (root === null || parent === null) return undefined;
  return Tracer.externalSpan({
    traceId: root[1]! + root[2]!,
    spanId: parent[1]!,
    sampled: SAMPLED.exec(value)?.[1] !== "0",
  });
};

/** `propagation: "xray"`: the `X-Amzn-Trace-Id` request header. */
export const propagate = (span: Tracer.AnySpan): readonly [string, string] => [
  HEADER,
  traceHeader(span),
];

/**
 * Write the span's X-Ray trace header into a string `member` of the input,
 * or of every element of its `list` member (EventBridge `PutEvents`
 * entries' `TraceHeader`). A value the caller set is kept.
 */
export const injectTraceHeader =
  (place: { readonly member: string; readonly list?: string }) =>
  (span: Tracer.Span, input: unknown): unknown => {
    if (input === null || typeof input !== "object") return input;
    const record = input as Record<string, unknown>;
    const value = traceHeader(span);
    const set = (holder: Record<string, unknown>) =>
      holder[place.member] === undefined ? { ...holder, [place.member]: value } : holder;
    if (place.list === undefined) return set(record);
    const entries = record[place.list];
    if (!Array.isArray(entries)) return input;
    return {
      ...record,
      [place.list]: entries.map((entry) =>
        entry !== null && typeof entry === "object" ? set(entry as Record<string, unknown>) : entry,
      ),
    };
  };
