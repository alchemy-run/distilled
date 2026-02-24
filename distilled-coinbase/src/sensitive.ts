/**
 * Sensitive data schemas for handling credentials and secrets.
 *
 * This module provides schemas that wrap sensitive data in Effect's Redacted type,
 * preventing accidental logging of secrets like private keys and tokens.
 */
import * as Redacted from "effect/Redacted";
import * as S from "effect/Schema";
import * as SchemaTransformation from "effect/SchemaTransformation";

/**
 * Sensitive - Marks data as sensitive, wrapping in Effect's Redacted type.
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
 */
export const SensitiveString = Sensitive(S.String).annotate({
  identifier: "SensitiveString",
});

/**
 * Sensitive nullable string - a nullable string marked as sensitive.
 */
export const SensitiveNullableString = S.NullOr(SensitiveString).annotate({
  identifier: "SensitiveNullableString",
});
