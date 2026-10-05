/**
 * Event Stream Serializer
 *
 * Converts an Effect Stream of typed events into encoded bytes.
 * Supports both raw StreamEvent streams and typed input event streams.
 */

import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import * as Schema from "effect/Schema";
import * as Stream from "effect/Stream";
import {
  getEventMemberBindings,
  type EventMemberBindings,
  type EventPayloadKind,
} from "../traits.ts";
import {
  encodeEvent,
  type EventStreamEncodeError,
  type HeaderValue,
  HeaderType,
  type Headers,
  type MessageEvent,
  type StreamEvent,
} from "./codec.ts";

// ============================================================================
// Serializer Types
// ============================================================================

/** Errors that can occur during event stream serialization */
export type EventStreamSerializeError = EventStreamEncodeError;

// ============================================================================
// Stream Serializer
// ============================================================================

/**
 * Serialize an Effect Stream of events into a Stream of encoded bytes.
 */
export const serializeEventStream = (
  events: Stream.Stream<StreamEvent, EventStreamSerializeError>,
): Stream.Stream<Uint8Array, EventStreamSerializeError> => {
  return Stream.mapEffect(events, encodeEvent);
};

// ============================================================================
// Input Event Stream Serialization
// ============================================================================

/**
 * Input event type - represents an event from a union type.
 *
 * Supports two formats:
 * 1. Tagged format: { _tag: "EventName", ...properties }
 * 2. Smithy union format: { EventName: { ...properties } }
 */
export interface InputEvent {
  readonly _tag?: string;
  [key: string]: unknown;
}

/**
 * Extract event type and payload from an input event.
 * Handles both _tag format and Smithy union format.
 */
function extractEventTypeAndPayload(event: InputEvent): {
  eventType: string;
  payload: unknown;
} {
  // Check for _tag format first
  if (event._tag) {
    const { _tag, ...payload } = event;
    return { eventType: _tag, payload };
  }

  // Smithy union format: { EventName: { ...properties } }
  const keys = Object.keys(event);
  if (keys.length === 1) {
    const eventType = keys[0];
    const innerValue = event[eventType];
    return { eventType, payload: innerValue };
  }

  // Fallback: use "Unknown" as event type
  return { eventType: "Unknown", payload: event };
}

/**
 * Serialize a typed input event (from a union) into a StreamEvent.
 * Converts the event's type to the event type header and serializes
 * the payload as JSON.
 *
 * @param event - The typed event (either _tag or Smithy union format)
 * @param contentType - The content type for the payload (default: application/json)
 * @returns A MessageEvent ready for wire serialization
 */
export const serializeInputEvent = (
  event: InputEvent,
  contentType: string = "application/json",
): MessageEvent => {
  const { eventType, payload } = extractEventTypeAndPayload(event);

  // Create JSON payload from event properties
  const payloadBytes = new TextEncoder().encode(JSON.stringify(payload));

  return {
    _tag: "MessageEvent",
    eventType,
    contentType,
    payload: payloadBytes,
    headers: {},
  };
};

/**
 * Serialize an Effect Stream of typed events into a ReadableStream of bytes.
 * This is the main entry point for input event stream serialization.
 *
 * For input event streams (like Transcribe's AudioStream), this:
 * 1. Takes each typed event from the stream
 * 2. Converts it to event stream wire format with proper headers
 * 3. Returns a ReadableStream suitable for HTTP request body
 *
 * @param events - Stream of typed events (with _tag property)
 * @param contentType - Content type for JSON payloads
 * @returns ReadableStream of encoded event stream bytes
 */
export const serializeInputEventStream = <E extends InputEvent>(
  events: Stream.Stream<E, unknown>,
  contentType: string = "application/json",
): ReadableStream<Uint8Array> => {
  // Convert typed events to StreamEvents, then encode to bytes
  const byteStream = events.pipe(
    Stream.map((event) => serializeInputEvent(event, contentType)),
    Stream.mapEffect(encodeEvent),
  );

  return Stream.toReadableStream(byteStream);
};

// ============================================================================
// Schema-driven Input Event Serialization
// ============================================================================

const textEncoder = new TextEncoder();

const unwrapRedacted = (value: unknown): unknown =>
  Redacted.isRedacted(value) ? Redacted.value(value) : value;

const toBytes = (value: unknown): Uint8Array => {
  if (value instanceof Uint8Array) return value;
  if (ArrayBuffer.isView(value)) {
    return new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
  }
  if (value instanceof ArrayBuffer) return new Uint8Array(value);
  if (typeof value === "string") return textEncoder.encode(value);
  return new Uint8Array(0);
};

const INT32_MIN = -(2 ** 31);
const INT32_MAX = 2 ** 31 - 1;

/** Map an `eventHeader` member value to a typed event stream header. */
const toHeaderValue = (value: unknown): HeaderValue | undefined => {
  if (typeof value === "string") return { type: HeaderType.String, value };
  if (typeof value === "boolean") {
    return value
      ? { type: HeaderType.BoolTrue, value: true }
      : { type: HeaderType.BoolFalse, value: false };
  }
  if (typeof value === "bigint") return { type: HeaderType.Long, value };
  if (typeof value === "number") {
    return Number.isInteger(value) && value >= INT32_MIN && value <= INT32_MAX
      ? { type: HeaderType.Int, value }
      : { type: HeaderType.Long, value: BigInt(Math.trunc(value)) };
  }
  if (value instanceof Date) return { type: HeaderType.Timestamp, value };
  if (value instanceof Uint8Array || ArrayBuffer.isView(value) || value instanceof ArrayBuffer) {
    return { type: HeaderType.ByteArray, value: toBytes(value) };
  }
  return undefined;
};

const PAYLOAD_CONTENT_TYPE: Record<EventPayloadKind, string> = {
  blob: "application/octet-stream",
  string: "text/plain",
  structure: "application/json",
};

/**
 * Build the frame for one input event from its decoded value (what the caller
 * passed) and its wire form (the event schema's encoding, with blobs as
 * base64 and sensitive values unwrapped), following Smithy's event stream
 * binding rules:
 * - `eventHeader` members become typed frame headers;
 * - an `eventPayload` member IS the frame payload — raw bytes for a blob,
 *   UTF-8 for a string, JSON for a structure;
 * - otherwise the remaining members are the JSON payload.
 */
const buildInputEventMessage = (
  eventType: string,
  member: Record<string, unknown>,
  wireMember: Record<string, unknown>,
  bindings: EventMemberBindings | undefined,
): MessageEvent => {
  const headers: Headers = {};
  for (const name of bindings?.headers ?? []) {
    const header = toHeaderValue(unwrapRedacted(member[name]));
    if (header) headers[name] = header;
  }

  const payloadBinding = bindings?.payload;
  if (payloadBinding) {
    const { name, kind } = payloadBinding;
    const value = unwrapRedacted(member[name]);
    let payload: Uint8Array;
    if (value === undefined || value === null) {
      payload = new Uint8Array(0);
    } else if (kind === "structure") {
      payload = textEncoder.encode(JSON.stringify(wireMember[name] ?? value));
    } else {
      payload = toBytes(value);
    }
    return {
      _tag: "MessageEvent",
      eventType,
      contentType: PAYLOAD_CONTENT_TYPE[kind],
      payload,
      headers,
    };
  }

  const body: Record<string, unknown> = { ...wireMember };
  for (const name of bindings?.headers ?? []) delete body[name];
  return {
    _tag: "MessageEvent",
    eventType,
    contentType: "application/json",
    payload: textEncoder.encode(JSON.stringify(body)),
    headers,
  };
};

/**
 * Serialize an input event stream using its event union schema.
 *
 * Each event is encoded through `eventSchema` (so blob members inside JSON
 * payloads become base64 strings, as the service expects) and framed per the
 * `eventPayload` / `eventHeader` bindings derived from the event structs'
 * member annotations. An explicit `eventPayloadMap` (event type → payload
 * member) overrides the derived payload member.
 *
 * @param events - Stream of events, in Smithy union (`{ EventName: {...} }`)
 *   or tagged (`{ _tag: "EventName", ... }`) form
 * @param eventSchema - The stream's event union schema
 * @param eventPayloadMap - Optional explicit event type → payload member map
 */
export const serializeInputEventStreamWithSchema = <E extends InputEvent>(
  events: Stream.Stream<E, unknown>,
  eventSchema: Schema.Schema<unknown> | undefined,
  eventPayloadMap?: Record<string, string>,
): ReadableStream<Uint8Array> => {
  const derived = eventSchema ? (getEventMemberBindings(eventSchema) ?? {}) : {};
  const bindings: Record<string, EventMemberBindings> = { ...derived };
  for (const [eventType, name] of Object.entries(eventPayloadMap ?? {})) {
    const existing = derived[eventType];
    bindings[eventType] = {
      headers: existing?.headers ?? [],
      payload: {
        name,
        kind: existing?.payload?.name === name ? existing.payload.kind : "blob",
      },
    };
  }
  const encode = eventSchema ? Schema.encodeUnknownEffect(eventSchema) : undefined;

  const byteStream = events.pipe(
    Stream.mapEffect((event) => {
      const { eventType, payload } = extractEventTypeAndPayload(event);
      const member =
        payload !== null && typeof payload === "object" ? (payload as Record<string, unknown>) : {};
      const binding = bindings[eventType];
      // Raw (blob/string) payload frames need no wire form; skip encoding so
      // large audio chunks are not base64-encoded only to be discarded.
      const needsWire = !binding?.payload || binding.payload.kind === "structure";
      const wire: Effect.Effect<unknown> =
        encode && needsWire
          ? (encode({ [eventType]: member }).pipe(
              Effect.catch(() => Effect.succeed(undefined)),
            ) as Effect.Effect<unknown>)
          : Effect.succeed(undefined);
      return wire.pipe(
        Effect.map((encoded) => {
          const wireMember =
            encoded !== undefined &&
            encoded !== null &&
            typeof encoded === "object" &&
            eventType in encoded
              ? ((encoded as Record<string, unknown>)[eventType] as Record<string, unknown>)
              : member;
          return buildInputEventMessage(eventType, member, wireMember, binding);
        }),
      );
    }),
    Stream.mapEffect(encodeEvent),
  );

  return Stream.toReadableStream(byteStream);
};

/**
 * Serialize a typed input event with a specific eventPayload member.
 * Used for events that have an @eventPayload member (like AudioEvent with AudioChunk).
 *
 * @param event - The typed event (either _tag or Smithy union format)
 * @param payloadMemberName - The name of the @eventPayload member (e.g., "AudioChunk")
 * @param contentType - The content type for binary payloads (default: application/octet-stream)
 * @returns A MessageEvent ready for wire serialization
 */
export const serializeInputEventWithPayload = (
  event: InputEvent,
  payloadMemberName: string,
  contentType: string = "application/octet-stream",
): MessageEvent => {
  const { eventType, payload: innerPayload } = extractEventTypeAndPayload(event);

  // For Smithy format, innerPayload is the event object itself
  // Extract the payload member from it
  const payloadSource =
    innerPayload && typeof innerPayload === "object"
      ? (innerPayload as Record<string, unknown>)
      : event;
  const payloadValue = payloadSource[payloadMemberName];

  // Get the payload bytes
  let payloadBytes: Uint8Array;
  if (payloadValue instanceof Uint8Array) {
    payloadBytes = payloadValue;
  } else if (typeof payloadValue === "string") {
    payloadBytes = new TextEncoder().encode(payloadValue);
  } else if (payloadValue === undefined || payloadValue === null) {
    payloadBytes = new Uint8Array(0);
  } else {
    // Fallback to JSON for complex types
    payloadBytes = new TextEncoder().encode(JSON.stringify(payloadValue));
  }

  // Build custom headers from non-payload members that have eventHeader trait
  // For now, we just pass the event type
  const headers: Headers = {};

  return {
    _tag: "MessageEvent",
    eventType,
    contentType,
    payload: payloadBytes,
    headers,
  };
};

/**
 * Serialize a stream of events where events may have @eventPayload members.
 * This handles the case where some event types have binary payloads (like AudioEvent)
 * while others have JSON payloads (like ConfigurationEvent).
 *
 * @param events - Stream of typed events
 * @param eventPayloadMap - Map of event type (name) to its payload member name, if any
 * @returns ReadableStream of encoded event stream bytes
 */
export const serializeInputEventStreamWithPayloads = <E extends InputEvent>(
  events: Stream.Stream<E, unknown>,
  eventPayloadMap: Record<string, string>,
): ReadableStream<Uint8Array> => {
  const byteStream = events.pipe(
    Stream.map((event) => {
      // Extract event type for lookup (handles both _tag and Smithy formats)
      const { eventType } = extractEventTypeAndPayload(event);
      const payloadMember = eventPayloadMap[eventType];
      if (payloadMember) {
        return serializeInputEventWithPayload(event, payloadMember);
      }
      return serializeInputEvent(event);
    }),
    Stream.mapEffect(encodeEvent),
  );

  return Stream.toReadableStream(byteStream);
};
