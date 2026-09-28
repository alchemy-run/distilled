import * as crypto from "node:crypto";
import { membersOf, specOf, type Struct } from "@distilled.cloud/core/shape";

/** Input members marked `@idempotencyToken`. */
export const findIdempotencyTokenProps = (
  input: Struct | undefined,
): string[] => {
  if (input === undefined) return [];
  const props: string[] = [];
  for (const [name, member] of membersOf(input)) {
    if (specOf(member)?.idempotency === true) props.push(name);
  }
  return props;
};

/** Fill any unset idempotency tokens with generated UUIDs. */
export const fillIdempotencyTokens = (
  input: unknown,
  idempotencyTokenProps: string[],
): unknown => {
  if (idempotencyTokenProps.length === 0) return input;
  if (input === null || typeof input !== "object") return input;

  const inputObj = input as Record<string, unknown>;
  let result: Record<string, unknown> | undefined;
  for (const propName of idempotencyTokenProps) {
    if (inputObj[propName] === undefined) {
      result ??= { ...inputObj };
      result[propName] = crypto.randomUUID();
    }
  }
  return result ?? input;
};
