/**
 * W3C trace context in a Lambda `Invoke`'s `ClientContext` (base64 JSON),
 * under `custom.traceparent`, as `@opentelemetry/instrumentation-aws-sdk`
 * writes it; the invoked function reads it from `context.clientContext`.
 * Generated code imports this only where an operation's `inject` has format
 * `lambdaClientContext`. See `packages/dev/src/codegen/telemetry-traits.md`.
 */
import type * as Tracer from "effect/Tracer";
import { traceparent } from "./telemetry-message-context.ts";

/** Lambda caps `ClientContext` at 3583 bytes of base64. */
const MAX_CLIENT_CONTEXT = 3583;

const toBase64 = (text: string): string => {
  let binary = "";
  for (const byte of new TextEncoder().encode(text)) binary += String.fromCharCode(byte);
  return btoa(binary);
};

const fromBase64 = (text: string): string =>
  new TextDecoder().decode(Uint8Array.from(atob(text), (c) => c.charCodeAt(0)));

/**
 * Add `custom.traceparent` to the input's `member` (a base64 JSON client
 * context). Kept as it was: a `traceparent` already there, a value that is
 * not base64 JSON, and a result over Lambda's size cap.
 */
export const injectLambdaClientContext =
  (place: { readonly member: string }) =>
  (span: Tracer.Span, input: unknown): unknown => {
    if (input === null || typeof input !== "object") return input;
    const record = input as Record<string, unknown>;
    const current = record[place.member];
    try {
      const parsed =
        typeof current === "string" && current.length > 0 ? JSON.parse(fromBase64(current)) : {};
      if (parsed === null || typeof parsed !== "object") return input;
      if (parsed.custom?.traceparent !== undefined) return input;
      const encoded = toBase64(
        JSON.stringify({ ...parsed, custom: { ...parsed.custom, traceparent: traceparent(span) } }),
      );
      return encoded.length > MAX_CLIENT_CONTEXT ? input : { ...record, [place.member]: encoded };
    } catch {
      return input;
    }
  };
