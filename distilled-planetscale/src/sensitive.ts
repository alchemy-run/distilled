/**
 * Sensitive data schemas for handling credentials and secrets.
 *
 * This module provides schemas that wrap sensitive data in Effect's Redacted type,
 * preventing accidental logging of secrets like passwords and tokens.
 */
import * as Redacted from "effect/Redacted";
import * as S from "effect/Schema";
import * as SchemaTransformation from "effect/SchemaTransformation";

/**
 * Sensitive - Marks data as sensitive, wrapping in Effect's Redacted type.
 *
 * This schema provides a convenient way to handle sensitive data:
 * - TypeScript type: `A | Redacted.Redacted<A>` (accepts both for inputs)
 * - Decode (responses): Always wraps wire value in Redacted
 * - Encode (requests): Accepts BOTH raw values and Redacted, extracts the raw value
 *
 * The union type allows users to conveniently pass plain values for inputs while
 * still getting proper Redacted types for outputs. Response values will always
 * be Redacted, which prevents accidental logging.
 *
 * @example
 * // In generated code:
 * const Password = S.Struct({ plain_text: Sensitive(S.String) })
 *
 * // Users can pass raw strings (convenient):
 * API.createPassword({ plain_text: "my-secret" })
 *
 * // Or Redacted values (explicit):
 * API.createPassword({ plain_text: Redacted.make("my-secret") })
 *
 * // Response values are always Redacted (safe):
 * const pwd = result.plain_text; // string | Redacted<string>
 * // But at runtime, it's always Redacted:
 * console.log(pwd); // logs "<redacted>"
 */
export const Sensitive = <A>(
  schema: S.Schema<A>,
): S.Schema<A | Redacted.Redacted<A>> =>
  schema
    .pipe(
      S.decodeTo(
        S.Union([S.toType(schema), S.Redacted(S.toType(schema))]),
        SchemaTransformation.transform({
          // Decode: wire format → always wrap in Redacted
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          decode: (a) => Redacted.make(a) as any,
          // Encode: accept both raw and Redacted → extract raw value
          encode: (v) => (Redacted.isRedacted(v) ? Redacted.value(v) : v),
        }),
      ),
    )
    .annotate({
      identifier: `Sensitive<${schema.ast.annotations?.identifier ?? "unknown"}>`,
    });

/**
 * Sensitive string - a string marked as sensitive.
 * Wire format is plain string, TypeScript type is string | Redacted<string>.
 * At runtime, decoded values are always Redacted<string>.
 */
export const SensitiveString = Sensitive(S.String).annotate({
  identifier: "SensitiveString",
});

/**
 * Sensitive nullable string - a nullable string marked as sensitive.
 * Wire format is plain string | null, TypeScript type is string | null | Redacted<string>.
 * At runtime, decoded non-null values are always Redacted<string>.
 */
export const SensitiveNullableString = S.NullOr(SensitiveString).annotate({
  identifier: "SensitiveNullableString",
});
