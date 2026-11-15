/**
 * Sensitive data schemas for smithy.api#sensitive trait.
 *
 * This module is separate from traits.ts to avoid circular import issues.
 * The protocol modules import from traits.ts, and traits.ts imports from protocols.
 * By keeping sensitive schemas here, they can be imported without triggering the cycle.
 */
import * as S from "@distilled.cloud/core/schema-lite";
import type * as Redacted from "effect/Redacted";
import { blob, sensitive } from "./lite.ts";

/**
 * smithy.api#sensitive - Marks data as sensitive, wrapping in Effect's Redacted type.
 *
 * - TypeScript type: `A | Redacted.Redacted<A>` (accepts both for inputs)
 * - Responses: the wire value is always wrapped in Redacted
 * - Requests: accepts raw values and Redacted ones, and sends the raw value
 *
 * @example
 * // In generated code:
 * const AccessKey = S.Struct({ SecretAccessKey: T.SensitiveString })
 *
 * // Users can pass raw strings (convenient):
 * API.createAccessKey({ SecretAccessKey: "my-secret" })
 *
 * // Or Redacted values (explicit):
 * API.createAccessKey({ SecretAccessKey: Redacted.make("my-secret") })
 *
 * // Response values are always Redacted (safe):
 * const key = result.SecretAccessKey; // string | Redacted<string>
 * console.log(key); // logs "<redacted>"
 */
export const Sensitive = <A>(schema: S.Schema<A>): S.Schema<A | Redacted.Redacted<A>> =>
  sensitive(
    schema as any,
    `Sensitive<${(schema.ast.annotations?.identifier as string | undefined) ?? "unknown"}>`,
  ) as any;

/**
 * Sensitive string - a string marked with @sensitive trait.
 * Wire format is plain string, TypeScript type is string | Redacted<string>.
 * At runtime, decoded values are always Redacted<string>.
 */
export const SensitiveString: S.Schema<string | Redacted.Redacted<string>> =
  /*@__PURE__*/ sensitive(S.String, "SensitiveString") as any;

/**
 * Sensitive blob - binary data marked with @sensitive trait.
 * Wire format is base64 string, TypeScript type is Uint8Array | Redacted<Uint8Array>.
 * At runtime, decoded values are always Redacted<Uint8Array>.
 */
export const SensitiveBlob: S.Schema<
  Uint8Array<ArrayBufferLike> | Redacted.Redacted<Uint8Array<ArrayBufferLike>>
> = /*@__PURE__*/ sensitive(/*@__PURE__*/ blob(), "SensitiveBlob") as any;
