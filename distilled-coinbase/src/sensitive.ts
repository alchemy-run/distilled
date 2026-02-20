/**
 * Sensitive data schemas for handling credentials and secrets.
 *
 * This module provides schemas that wrap sensitive data in Effect's Redacted type,
 * preventing accidental logging of secrets like private keys and tokens.
 */
import * as Redacted from "effect/Redacted";
import * as S from "effect/Schema";

/**
 * Sensitive - Marks data as sensitive, wrapping in Effect's Redacted type.
 */
export const Sensitive = <A, I, R>(
  schema: S.Schema<A, I, R>,
): S.Schema<A | Redacted.Redacted<A>, I, R> =>
  S.transform(
    schema,
    S.Union(S.typeSchema(schema), S.RedactedFromSelf(S.typeSchema(schema))),
    {
      strict: true,
      decode: (a) => Redacted.make(a),
      encode: (v) => (Redacted.isRedacted(v) ? Redacted.value(v) : v),
    },
  ).annotate({
    identifier: `Sensitive<${schema.ast.annotate?.identifier ?? "unknown"}>`,
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
