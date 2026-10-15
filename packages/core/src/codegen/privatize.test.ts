import { describe, expect, test } from "vitest";
import { privatizeSchemas } from "./privatize.ts";

const run = (code: string) => privatizeSchemas(code).code;

describe("privatizeSchemas", () => {
  test("un-exports schemas operations use and keeps types and operations exported", () => {
    const code = [
      `export interface In { a: string }`,
      `export const In = S.Struct({ a: S.String });`,
      `export const Out = S.Struct({});`,
      `export const op = API.make(() => ({ input: In, output: Out }));`,
    ].join("\n");
    expect(run(code)).toBe(
      [
        `export interface In { a: string }`,
        `const In = S.Struct({ a: S.String });`,
        `const Out = S.Struct({});`,
        `export const op = API.make(() => ({ input: In, output: Out }));`,
      ].join("\n"),
    );
  });

  test("removes schemas nothing reaches, with their doc comment", () => {
    const code = [
      `export const Used = S.String;`,
      `/** Unused. */`,
      `export const Unused = S.Struct({ x: Used });`,
      `export const op = API.make(() => ({ input: Used, output: Used }));`,
    ].join("\n");
    expect(run(code)).toBe(
      [
        `const Used = S.String;`,
        `export const op = API.make(() => ({ input: Used, output: Used }));`,
      ].join("\n"),
    );
  });

  test("keeps schemas reached through other schemas and error classes", () => {
    const code = [
      `export const Leaf = S.String;`,
      `export const Mid = S.Struct({ leaf: Leaf });`,
      `export const ErrBody = S.Struct({ code: S.Number });`,
      `export class Boom extends S.TaggedError()("Boom", { body: ErrBody }) {}`,
      `export const op = API.make(() => ({ input: Mid, output: Mid, errors: [Boom] }));`,
    ].join("\n");
    const out = run(code);
    expect(out).toContain(`const Leaf = S.String;`);
    expect(out).toContain(`const ErrBody = S.Struct({ code: S.Number });`);
    expect(out).toContain(`export class Boom`);
  });

  test("keeps operation aliases exported", () => {
    const code = [
      `export const In = S.String;`,
      `export const listBucketObjects = API.make(() => ({ input: In, output: In }));`,
      `export const listObjects = listBucketObjects;`,
    ].join("\n");
    expect(run(code)).toBe(
      [
        `const In = S.String;`,
        `export const listBucketObjects = API.make(() => ({ input: In, output: In }));`,
        `export const listObjects = listBucketObjects;`,
      ].join("\n"),
    );
  });

  test("type-only references do not keep a schema alive", () => {
    const code = [
      `export const Gone = S.String;`,
      `export const op: API.OperationMethod<Gone, Gone, never, never> = API.make(() => ({ input: S.String, output: S.String }));`,
    ].join("\n");
    expect(run(code)).not.toContain("Gone = S.String");
  });
});
