/**
 * The `com.distilled.telemetry#operation` trait's `inject` and `extract`
 * (format `awsMessageAttributes`): W3C trace context in SQS and SNS
 * message attributes. Generated code imports this only where a trait has
 * one. See `packages/dev/src/codegen/telemetry-traits.md`.
 */
import * as Tracer from "effect/Tracer";
import { parseTraceHeader } from "./telemetry-xray.ts";
import type { MessageExtract } from "./telemetry.ts";

/** W3C `traceparent` of a span. */
export const traceparent = (span: Tracer.AnySpan): string =>
  `00-${span.traceId}-${span.spanId}-${span.sampled ? "01" : "00"}`;

const TRACEPARENT = /^00-([0-9a-f]{32})-([0-9a-f]{16})-([0-9a-f]{2})$/;

/** The span a W3C `traceparent` names, if it is well formed. */
export const parseTraceparent = (value: unknown): Tracer.ExternalSpan | undefined => {
  const match = typeof value === "string" ? TRACEPARENT.exec(value) : null;
  if (match === null) return undefined;
  return Tracer.externalSpan({
    traceId: match[1]!,
    spanId: match[2]!,
    sampled: (Number.parseInt(match[3]!, 16) & 1) === 1,
  });
};

/** Where messages sit: `member` of the value, or of every element of its `list` member. */
export interface MessagePlace {
  readonly member: string;
  readonly list?: string;
}

/** SQS and SNS take at most 10 message attributes. */
const MAX_MESSAGE_ATTRIBUTES = 10;

const withTraceparent = (attributes: unknown, value: string): unknown => {
  const map =
    attributes !== null && typeof attributes === "object"
      ? (attributes as Record<string, unknown>)
      : {};
  if ("traceparent" in map || Object.keys(map).length >= MAX_MESSAGE_ATTRIBUTES) return attributes;
  return { ...map, traceparent: { DataType: "String", StringValue: value } };
};

/**
 * Write the span's `traceparent` into each message's attributes (a map of
 * `{ DataType, StringValue }`, the SQS and SNS shape). Kept: a
 * `traceparent` already there, and a message with 10 attributes. The
 * caller's input object is not changed.
 */
export const injectAwsMessageAttributes =
  (place: MessagePlace) =>
  (span: Tracer.Span, input: unknown): unknown => {
    if (input === null || typeof input !== "object") return input;
    const record = input as Record<string, unknown>;
    const value = traceparent(span);
    if (place.list === undefined) {
      return { ...record, [place.member]: withTraceparent(record[place.member], value) };
    }
    const entries = record[place.list];
    if (!Array.isArray(entries)) return input;
    return {
      ...record,
      [place.list]: entries.map((entry) =>
        entry !== null && typeof entry === "object"
          ? {
              ...entry,
              [place.member]: withTraceparent(
                (entry as Record<string, unknown>)[place.member],
                value,
              ),
            }
          : entry,
      ),
    };
  };

/**
 * Where else a received message can carry trace context, by generated
 * property name (SQS `ReceiveMessage`):
 *
 *   envelope       the body member; an SNS notification delivered without
 *                  raw message delivery is JSON whose `MessageAttributes`
 *                  carry the publisher's `traceparent`
 *   system         the system-attributes member, whose `AWSTraceHeader` is
 *                  an X-Ray trace header (set by X-Ray-instrumented
 *                  producers); `systemRequest` is the input member listing
 *                  system attributes to return
 */
export interface MessageExtractPlace extends MessagePlace {
  readonly request?: string;
  /** The message's id member: each link carries it as `messaging.message.id`. */
  readonly messageId?: string;
  readonly envelope?: string;
  readonly system?: string;
  readonly systemRequest?: string;
}

const asksFor = (names: unknown, name: string): boolean =>
  Array.isArray(names) && names.some((n) => n === "All" || n === ".*" || n === name);

const askFor = (record: Record<string, unknown>, member: string | undefined, name: string) => {
  if (member === undefined || asksFor(record[member], name)) return record;
  const names = record[member];
  return { ...record, [member]: [...(Array.isArray(names) ? names : []), name] };
};

/** The publisher's `traceparent` in an SNS notification body, if there is one. */
const envelopeTraceparent = (body: unknown): unknown => {
  // Parse only bodies that can hold one: most messages are not SNS JSON.
  if (typeof body !== "string" || !body.includes('"traceparent"')) return undefined;
  try {
    const parsed = JSON.parse(body);
    return parsed?.Type === "Notification"
      ? parsed.MessageAttributes?.traceparent?.Value
      : undefined;
  } catch {
    return undefined;
  }
};

/**
 * Ask for `traceparent` (and `AWSTraceHeader`) back, unless the input asks
 * for `All` or `.*`, and link the span to every well-formed trace context
 * each message carries: its `traceparent` attribute, else the SNS
 * envelope's, plus its X-Ray `AWSTraceHeader` when that names another span.
 */
export const extractAwsMessageAttributes = (place: MessageExtractPlace): MessageExtract => ({
  request: (input) => {
    if (input === null || typeof input !== "object") return input;
    let record = askFor(input as Record<string, unknown>, place.request, "traceparent");
    if (place.system !== undefined) record = askFor(record, place.systemRequest, "AWSTraceHeader");
    return record;
  },
  links: (output) => {
    if (output === null || typeof output !== "object") return [];
    const record = output as Record<string, unknown>;
    const holders =
      place.list === undefined
        ? [record]
        : Array.isArray(record[place.list])
          ? (record[place.list] as unknown[])
          : [];
    const links: Tracer.SpanLink[] = [];
    for (const holder of holders) {
      if (holder === null || typeof holder !== "object") continue;
      const message = holder as Record<string, unknown>;
      const id = place.messageId === undefined ? undefined : message[place.messageId];
      const linkAttributes = typeof id === "string" ? { "messaging.message.id": id } : {};
      const attributes = message[place.member] as
        | Record<string, { readonly StringValue?: unknown } | undefined>
        | undefined;
      const span =
        parseTraceparent(attributes?.traceparent?.StringValue) ??
        (place.envelope !== undefined
          ? parseTraceparent(envelopeTraceparent(message[place.envelope]))
          : undefined);
      if (span !== undefined) links.push({ span, attributes: linkAttributes });
      if (place.system !== undefined) {
        const system = message[place.system] as Record<string, unknown> | undefined;
        const xray = parseTraceHeader(system?.AWSTraceHeader);
        if (xray !== undefined && xray.spanId !== span?.spanId) {
          links.push({ span: xray, attributes: linkAttributes });
        }
      }
    }
    return links;
  },
});
