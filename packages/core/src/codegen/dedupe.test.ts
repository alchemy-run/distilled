import { describe, expect, test } from "vitest";
import { dedupeSchemas } from "./dedupe.ts";

const run = (code: string) => dedupeSchemas(code).code;

describe("dedupeSchemas", () => {
  test("aliases structurally identical schemas, ignoring their own identifier", () => {
    const code = [
      `export const A = S.Struct({ x: S.String }).annotate({ identifier: "A" });`,
      `export const B = S.Struct({ x: S.String }).annotate({ identifier: "B" });`,
    ].join("\n");
    expect(run(code)).toBe(
      [
        `export const A = S.Struct({ x: S.String }).annotate({ identifier: "A" });`,
        `export const B = A as any as S.Schema<B>;`,
      ].join("\n"),
    );
  });

  test("merges bottom-up through references", () => {
    const code = [
      `export const A = S.Struct({ x: S.String });`,
      `export const B = S.Struct({ x: S.String });`,
      `export const LA = S.Array(A);`,
      `export const LB = S.Array(B);`,
    ].join("\n");
    const out = run(code);
    expect(out).toContain(`export const B = A as any as S.Schema<B>;`);
    expect(out).toContain(`export const LB = LA as any as S.Schema<LB>;`);
  });

  test("keeps schemas that differ in metadata", () => {
    const code = [
      `export const A = S.Struct({ x: S.String.pipe(T.JsonName("a")) });`,
      `export const B = S.Struct({ x: S.String.pipe(T.JsonName("b")) });`,
    ].join("\n");
    expect(run(code)).toBe(code);
  });

  test("keeps operation input schemas as their own objects", () => {
    const code = [
      `export const A = S.Struct({ x: S.String }).annotate({ identifier: "A" });`,
      `export const B = S.Struct({ x: S.String }).annotate({ identifier: "B" });`,
      `export const op = API.make(() => ({ input: B, output: A }));`,
    ].join("\n");
    expect(run(code)).toBe(code);
  });

  test("leaves AWS XML and query protocol modules alone", () => {
    const code = [
      `const proto = T.AwsProtocolsRestXml();`,
      `export const A = S.Struct({ x: S.String });`,
      `export const B = S.Struct({ x: S.String });`,
    ].join("\n");
    expect(run(code)).toBe(code);
  });

  test("self references in recursive schemas compare equal", () => {
    const code = [
      `export const A = S.suspend(() => S.Struct({ next: S.optional(A) })).annotate({ identifier: "A" });`,
      `export const B = S.suspend(() => S.Struct({ next: S.optional(B) })).annotate({ identifier: "B" });`,
    ].join("\n");
    expect(run(code)).toContain(`export const B = A as any as S.Schema<B>;`);
  });
});

test("structs that name different enum aliases of the same leaf merge", () => {
  const code = [
    `export const PaymentStatus = S.String;`,
    `export const SetupStatus = S.String;`,
    `export const A = S.Struct({ status: S.optional(PaymentStatus) });`,
    `export const B = S.Struct({ status: S.optional(SetupStatus) });`,
  ].join("\n");
  expect(dedupeSchemas(code).code).toContain(`export const B = A as any as S.Schema<B>;`);
});
