import { describe, expect, test } from "vitest";
import { docCommentStart, privatizeSchemas } from "../../src/codegen/privatize.ts";

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

  test("removes adjacent dead schemas, each with its own doc comment and trailing newlines", () => {
    const code = [
      `/** Kept. */`,
      `export const Used = S.String;`,
      `/** First. */`,
      `export const DeadA = S.Struct({});`,
      ``,
      `/**`,
      ` * Second.`,
      ` */`,
      `export const DeadB = S.Struct({ a: DeadA });`,
      `export const DeadC = S.Struct({});`,
      `export const op = API.make(() => ({ input: Used, output: Used }));`,
    ].join("\n");
    expect(run(code)).toBe(
      [
        `/** Kept. */`,
        `const Used = S.String;`,
        `export const op = API.make(() => ({ input: Used, output: Used }));`,
      ].join("\n"),
    );
  });

  test("finds the same doc comment as the whole-prefix regex", () => {
    const regex = (code: string) => /\/\*\*(?:(?!\*\/)[\s\S])*\*\/\s*$/.exec(code)?.index;
    // Strings over the characters that matter: openers, closers, overlaps (`/**/`), whitespace.
    const alphabet = ["/", "*", " ", "\n", "a"];
    let seed = 1;
    const next = () => (seed = (seed * 48271) % 2147483647);
    for (let n = 0; n < 20000; n++) {
      let code = "";
      for (let i = next() % 16; i > 0; i--) code += alphabet[next() % alphabet.length];
      expect(docCommentStart(code, code.length), JSON.stringify(code)).toBe(regex(code));
    }
  });

  test("type-only references do not keep a schema alive", () => {
    const code = [
      `export const Gone = S.String;`,
      `export const op: API.OperationMethod<Gone, Gone, never, never> = API.make(() => ({ input: S.String, output: S.String }));`,
    ].join("\n");
    expect(run(code)).not.toContain("Gone = S.String");
  });
});
