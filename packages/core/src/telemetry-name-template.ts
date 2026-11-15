/**
 * The `com.distilled.telemetry#operation` trait's `nameTemplate`, as a
 * function: generated code imports this only where a trait has one
 * (messaging operations). See `packages/dev/src/codegen/telemetry-traits.md`.
 */
import type { SpanRename } from "./telemetry.ts";

const PLACEHOLDER = /\{([^{}]+)\}/g;

/**
 * Span name from `{attribute}` placeholders filled from the call's input
 * attributes (`send {messaging.destination.name}`); undefined (the trait's
 * `name`) when one is missing.
 */
export const nameTemplate =
  (template: string): SpanRename =>
  (attributes) => {
    let complete = true;
    const name = template.replace(PLACEHOLDER, (_, key: string) => {
      const value = attributes[key];
      if (typeof value === "string" || typeof value === "number") return String(value);
      complete = false;
      return "";
    });
    return complete ? name : undefined;
  };
