/**
 * The emitted schema's type matches the emitted TypeScript type.
 *
 * The generator writes every shape twice, as an interface and as a schema,
 * and casts the schema to the interface (`as any as S.Schema<X>`), so the
 * compiler never compares them. This test generates a fixture model that
 * covers every shape kind, removes the casts, builds the schemas from the
 * typed lite builders, and type-checks that each schema's `Type` and its
 * interface are assignable to each other.
 *
 * Both sides first go through {@link LOOSE}, which removes the differences
 * the generator makes on purpose (see the comments there). Anything else
 * that differs (a member's presence, optional vs required, `null`, a scalar's
 * kind, nesting, union cases) fails the test.
 */
import { spawnSync } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";
import { parseAst } from "rolldown/parseAst";
import { describe, expect, test } from "vitest";
import { applyEdits, type Edit } from "../../src/codegen/edits.ts";
import { SPREAD_TRAIT } from "../../src/codegen/flatten-payload.ts";
import { generateService, type EmittedMember, type SdkSpec } from "../../src/codegen/generator.ts";
import { ADDITIONAL_PROPERTIES_TRAIT, DEFAULT_TRAIT } from "../../src/codegen/members.ts";

const repoRoot = path.resolve(import.meta.dirname, "../../../..");
const devRoot = path.join(repoRoot, "packages/dev");
const tsrs = path.join(repoRoot, "node_modules/.bin/tsrs");

const NS = "com.example";
const NULLABLE = `${NS}#nullable`;
const RAW_RESPONSE = `${NS}#rawResponse`;
const SENSITIVE = "smithy.api#sensitive";

const str = "smithy.api#String";
const member = (target: string, traits?: Record<string, unknown>) => ({
  target,
  ...(traits ? { traits } : {}),
});
const required = { "smithy.api#required": {} };
const enumOf = (values: readonly (string | number)[], type: "enum" | "intEnum" = "enum") => ({
  type,
  members: Object.fromEntries(
    values.map((v) => [
      `V${v}`.replace(/\W/g, "_"),
      member("smithy.api#Unit", { "smithy.api#enumValue": v }),
    ]),
  ),
});

/** A model with one of each shape kind, reached from requests, responses or both. */
const fixture = (options: { readonly structureUnion: boolean }) => ({
  smithy: "2.0",
  shapes: {
    [`${NS}#Example`]: {
      type: "service",
      version: "1",
      operations: [{ target: `${NS}#PutThing` }, { target: `${NS}#ListTags` }],
    },
    [`${NS}#PutThing`]: {
      type: "operation",
      input: { target: `${NS}#PutThingRequest` },
      output: { target: `${NS}#Thing` },
      traits: { "smithy.api#http": { method: "POST", uri: "/things/{thing_id}" } },
    },
    [`${NS}#ListTags`]: {
      type: "operation",
      input: { target: `${NS}#ListTagsRequest` },
      output: { target: `${NS}#ListTagsResponse` },
      traits: { "smithy.api#http": { method: "GET", uri: "/tags" } },
    },
    // Request: path, query and header members, a "true" | "false" enum, and a
    // spread body (the input extends the body's struct and interface).
    [`${NS}#PutThingRequest`]: {
      type: "structure",
      traits: { "smithy.api#input": {} },
      members: {
        thing_id: member(str, { ...required, "smithy.api#httpLabel": {} }),
        dry_run: member("smithy.api#Boolean", { "smithy.api#httpQuery": "dry_run" }),
        api_token: member(str, { "smithy.api#httpHeader": "x-api-token", [SENSITIVE]: {} }),
        verbose: member(`${NS}#TrueFalse`),
        body: member(`${NS}#ThingBody`, { [SPREAD_TRAIT]: {} }),
      },
    },
    [`${NS}#TrueFalse`]: enumOf(["true", "false"]),
    // Reached from the request and the response: enum references re-open.
    [`${NS}#ThingBody`]: {
      type: "structure",
      members: {
        name: member(str, required),
        thing_id: member(str),
        labels: member(`${NS}#StringMap`),
        owner: member(`${NS}#Owner`),
        status: member(`${NS}#Status`),
      },
    },
    [`${NS}#Owner`]: {
      type: "structure",
      members: {
        name: member(str, required),
        email: member(str, { [NULLABLE]: {} }),
        role: member(`${NS}#Status`),
      },
    },
    // Response only.
    [`${NS}#Thing`]: {
      type: "structure",
      members: {
        id: member(str, required),
        name: member(str),
        description: member(str, { [NULLABLE]: {} }),
        count: member("smithy.api#Integer", { [DEFAULT_TRAIT]: 0 }),
        size: member("smithy.api#Long"),
        ratio: member("smithy.api#Float"),
        score: member("smithy.api#Double", required),
        big: member("smithy.api#BigInteger"),
        precise: member("smithy.api#BigDecimal"),
        enabled: member("smithy.api#Boolean"),
        created_at: member("smithy.api#Timestamp"),
        data: member("smithy.api#Blob"),
        metadata: member("smithy.api#Document"),
        status: member(`${NS}#Status`, required),
        priority: member(`${NS}#Priority`),
        tags: member(`${NS}#TagList`),
        root: member(`${NS}#Node`),
        nodes: member(`${NS}#NodeList`),
        labels: member(`${NS}#StringMap`),
        owners: member(`${NS}#OwnerMap`),
        owner: member(`${NS}#Owner`, required),
        body: member(`${NS}#ThingBody`),
        scalar: member(`${NS}#Scalar`),
        ...(options.structureUnion ? { shape: member(`${NS}#Shape`) } : {}),
        extra: member(`${NS}#OpenObject`),
        secret: member(str, { [SENSITIVE]: {} }),
        secrets: member(`${NS}#SecretList`),
        secret_map: member(`${NS}#SecretMap`),
        maybe_tags: member(`${NS}#NullableTagList`),
        empty: member(`${NS}#Empty`),
      },
    },
    [`${NS}#Status`]: enumOf(["active", "deleted"]),
    [`${NS}#Priority`]: enumOf([1, 2], "intEnum"),
    [`${NS}#TagList`]: { type: "list", member: member(str) },
    [`${NS}#NullableTagList`]: { type: "list", member: member(str, { [NULLABLE]: {} }) },
    [`${NS}#SecretList`]: { type: "list", member: member(str, { [SENSITIVE]: {} }) },
    [`${NS}#StringMap`]: { type: "map", key: member(str), value: member(str) },
    [`${NS}#OwnerMap`]: { type: "map", key: member(str), value: member(`${NS}#Owner`) },
    [`${NS}#SecretMap`]: { type: "map", key: member(str), value: member(str, { [SENSITIVE]: {} }) },
    // Recursive: Node -> NodeList -> Node.
    [`${NS}#Node`]: {
      type: "structure",
      members: { value: member(str, required), children: member(`${NS}#NodeList`) },
    },
    [`${NS}#NodeList`]: { type: "list", member: member(`${NS}#Node`) },
    [`${NS}#Scalar`]: {
      type: "union",
      members: {
        text: member(str),
        number: member("smithy.api#Integer"),
        status: member(`${NS}#Status`),
      },
    },
    ...(options.structureUnion
      ? {
          // Cases discriminated by a one-value enum.
          [`${NS}#Shape`]: {
            type: "union",
            members: { circle: member(`${NS}#Circle`), square: member(`${NS}#Square`) },
          },
          [`${NS}#Circle`]: {
            type: "structure",
            members: {
              kind: member(`${NS}#CircleKind`, required),
              radius: member("smithy.api#Double", required),
            },
          },
          [`${NS}#Square`]: {
            type: "structure",
            members: {
              kind: member(`${NS}#SquareKind`, required),
              side: member("smithy.api#Double", required),
            },
          },
          [`${NS}#CircleKind`]: enumOf(["circle"]),
          [`${NS}#SquareKind`]: enumOf(["square"]),
        }
      : {}),
    [`${NS}#OpenObject`]: {
      type: "structure",
      traits: { [ADDITIONAL_PROPERTIES_TRAIT]: {} },
      members: { known: member(str) },
    },
    [`${NS}#Empty`]: { type: "structure", members: {} },
    [`${NS}#ListTagsRequest`]: {
      type: "structure",
      traits: { "smithy.api#input": {} },
      members: { prefix: member(str, { "smithy.api#httpQuery": "prefix" }) },
    },
    // A bare-payload response when the spec has a root binding for it.
    [`${NS}#ListTagsResponse`]: {
      type: "structure",
      members: { tags: member(`${NS}#TagList`, { ...required, [RAW_RESPONSE]: {} }) },
    },
  },
});

/** Sensitive members the way most specs write them: plain schema, `string | Redacted` type. */
const sensitiveType = (m: EmittedMember) =>
  SENSITIVE in m.traits
    ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
    : undefined;

const camel = (name: string) => name.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase());

/** The spec options every variant shares: types and schemas only, no operations. */
const base: SdkSpec = {
  header: () =>
    [
      `import * as S from "./schema.ts";`,
      `import type * as Redacted from "effect/Redacted";`,
      `import * as T from "@distilled.cloud/core/trait";`,
      `import * as P from "@distilled.cloud/core/protocol-rest";`,
      "",
    ].join("\n"),
  operation: () => "",
  operationDecl: {
    contextType: "ExampleContext",
    commonErrorType: "ExampleError",
    commonErrorClasses: [],
    protocol: "ExampleProtocol",
  },
};

/** One spec per way SDKs configure the shared generator. */
const variants: ReadonlyArray<{
  readonly name: string;
  readonly spec: SdkSpec;
  readonly structureUnion: boolean;
}> = [
  {
    name: "untagged",
    structureUnion: true,
    spec: {
      unionStyle: "untagged",
      memberTraitPipes: { [SENSITIVE]: "P.SensitiveValue" },
      memberTsType: sensitiveType,
    },
  },
  {
    // Codec schemas, nullable traits, renamed members, a bare-payload
    // response, and sensitive members that also decode as Redacted.
    name: "codec",
    structureUnion: true,
    spec: {
      unionStyle: "untagged",
      schemaType: "Codec",
      nullableTrait: NULLABLE,
      memberName: camel,
      memberTraitPipes: { [SENSITIVE]: "P.SensitiveValue" },
      memberSchema: (m, ref) =>
        SENSITIVE in m.traits
          ? `S.Union([${ref(m.target)}, S.Redacted(${ref(m.target)})])`
          : undefined,
      memberTsType: sensitiveType,
      extraBindings: [
        {
          trait: RAW_RESPONSE,
          binding: "rawResponse",
          pipe: "P.RawResponse()",
          rootPipe: "P.RawResponseRoot()",
        },
      ],
    },
  },
  {
    // Every optional response member also accepts null.
    name: "optionals-nullable",
    structureUnion: true,
    spec: { unionStyle: "untagged", nullableTrait: NULLABLE, optionalsNullable: true },
  },
  {
    // Primitive unions; this style refuses structure unions.
    name: "primitive",
    structureUnion: false,
    spec: { unionStyle: "primitive", nullableTrait: NULLABLE },
  },
  {
    // Structure unions are opaque `S.Unknown` with no cast, so only the
    // other shapes are checked.
    name: "opaque-cases",
    structureUnion: true,
    spec: { unionStyle: "opaque-cases", nullableTrait: NULLABLE },
  },
];

/**
 * The typed schema module the fixtures import, and `Loose`. Each rule in
 * `Loose` is a difference the generator makes on purpose:
 *
 * - enums: the type lists the documented values; the schema is `S.String` /
 *   `S.Number` so an undocumented value still decodes (emit.ts `enumDecl`);
 * - `Redacted`: the protocol wraps a sensitive value on decode and accepts
 *   it on encode; many specs keep the schema a plain string;
 * - `readonly`: callers get mutable interfaces; schemas type readonly;
 * - map values: the interface types a missing key's lookup as `undefined`;
 * - `Uint8Array`: the interface does not pin the buffer type.
 */
const LOOSE = `
import type * as Effect from "effect/Schema";
import type * as Redacted from "effect/Redacted";
export * from "@distilled.cloud/core/schema-lite-typed";

/** lite \`Extend\`: the struct of both arguments' members. */
export declare const Extend: <A extends Effect.Top, B extends Effect.Top>(
  a: A,
  b: B,
) => Effect.Codec<A["Type"] & B["Type"]>;

export type Loose<T> =
  T extends Redacted.Redacted<infer A>
    ? Loose<A>
    : T extends string
      ? string
      : T extends number
        ? number
        : T extends boolean
          ? boolean
          : T extends Uint8Array
            ? Uint8Array
            : T extends ReadonlyArray<infer E>
              ? ReadonlyArray<Loose<E>>
              : T extends object
                ? {
                    readonly [K in keyof T]: string extends K
                      ? Loose<Exclude<T[K], undefined>>
                      : Loose<T[K]>;
                  }
                : T;
`;

type Node = { readonly type: string; readonly start: number; readonly end: number } & Record<
  string,
  any
>;

/**
 * Rebuild each cast schema const as an uncast `X__schema` plus the cast `X`
 * the other schemas reference, then check `X__schema`'s type against `X`.
 * Annotated consts (`const X: S.Codec<X> = …`) are rebuilt the same way.
 */
const uncast = (code: string): { code: string; checked: string[] } => {
  const program = parseAst(code, { sourceType: "module", lang: "ts" }, "fixture.ts");
  const edits: Edit[] = [];
  const checked: string[] = [];
  for (const st of program.body as unknown as Node[]) {
    if (st.type !== "ExportNamedDeclaration" || st.declaration?.type !== "VariableDeclaration") {
      continue;
    }
    const d = st.declaration.declarations[0] as Node;
    const name = d.id.name as string;
    const init = d.init as Node;
    let expr: Node | undefined;
    let target: string | undefined;
    if (
      init.type === "TSAsExpression" &&
      init.expression.type === "TSAsExpression" &&
      init.expression.typeAnnotation.type === "TSAnyKeyword"
    ) {
      expr = init.expression.expression;
      target = code.slice(init.typeAnnotation.start, init.typeAnnotation.end);
    } else if (d.id.typeAnnotation) {
      expr = init;
      const annotation = d.id.typeAnnotation.typeAnnotation as Node;
      target = code.slice(annotation.start, annotation.end);
    }
    // An opaque union (`unionStyle: "opaque-cases"`) is `S.Unknown` by
    // design and has no cast to check. Give it its declared type so the
    // shapes that reference it are still checked.
    if (
      expr === undefined &&
      /^(?:\/\*[@#]__PURE__\*\/\s*)?S\.Unknown\.pipe\(T\.UnionCases\(/.test(
        code.slice(init.start, init.end),
      )
    ) {
      edits.push([init.end, init.end, ` as any as S.Schema<${name}>`]);
      continue;
    }
    if (expr === undefined || target === undefined) continue;
    if (target !== `S.Schema<${name}>` && target !== `S.Codec<${name}>`) {
      throw new Error(`${name} is cast to ${target}, not its own type`);
    }
    const schema = `${name}__schema`;
    edits.push([
      st.start,
      st.end,
      `const ${schema} = ${code.slice(expr.start, expr.end)};\n` +
        `export const ${name} = ${schema} as any as ${target};`,
    ]);
    checked.push(name);
  }
  const checks = checked.flatMap((name) => {
    const type = `(typeof ${name}__schema)["Type"]`;
    return [
      `(null! as S.Loose<${name}>) satisfies S.Loose<${type}>; // ${name}: type -> schema`,
      `(null! as S.Loose<${type}>) satisfies S.Loose<${name}>; // ${name}: schema -> type`,
    ];
  });
  return { code: `${applyEdits(code, edits)}\n${checks.join("\n")}\n`, checked };
};

/** Type-check the fixtures; the errors, each with its source line. */
const typecheck = (files: Record<string, string>): string[] => {
  const cache = path.join(devRoot, "node_modules/.cache");
  fs.mkdirSync(cache, { recursive: true });
  const dir = fs.mkdtempSync(path.join(cache, "schema-type-"));
  try {
    fs.writeFileSync(path.join(dir, "schema.ts"), LOOSE);
    for (const [file, code] of Object.entries(files)) {
      fs.writeFileSync(path.join(dir, file), code);
    }
    fs.writeFileSync(
      path.join(dir, "tsconfig.json"),
      JSON.stringify({
        extends: path.join(repoRoot, "tsconfig.base.json"),
        include: ["*.ts"],
        compilerOptions: {
          noCheck: false,
          noEmit: true,
          paths: { "@distilled.cloud/core/*": [path.join(repoRoot, "packages/core/src/*")] },
        },
      }),
    );
    const run = spawnSync(tsrs, ["-p", path.join(dir, "tsconfig.json")], {
      cwd: dir,
      encoding: "utf8",
    });
    if (run.error) throw run.error;
    const output = `${run.stdout}${run.stderr}`;
    if (run.status === 0) return [];
    // `file.ts(line,col): error …` → the error and the line it points at.
    const errors = output
      .split(/\n(?=\S)/)
      .filter((e) => e.trim())
      .map((e) => {
        const m = /^([\w.-]+\.ts)\((\d+),\d+\)/.exec(e.trim());
        const line = m
          ? fs.readFileSync(path.join(dir, m[1]!), "utf8").split("\n")[Number(m[2]) - 1]
          : "";
        return `${e.trim()}\n  at: ${line?.trim()}`;
      });
    return errors.length ? errors : [output || `tsrs exited with ${run.status}`];
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
};

const generate = (variant: (typeof variants)[number]) =>
  generateService(fixture({ structureUnion: variant.structureUnion }), {
    ...base,
    ...variant.spec,
  }).code;

describe("emitted schemas match emitted types", () => {
  test("every spec variant", { timeout: 60_000 }, () => {
    const files: Record<string, string> = {};
    for (const variant of variants) {
      const code = generate(variant);
      const { code: uncastCode, checked } = uncast(code);
      // Every cast or annotated schema const in the module was rebuilt.
      const casts = code.match(/ as any as S\.(?:Schema|Codec)</g)?.length ?? 0;
      const annotated = code.match(/^export const \w+: S\.(?:Schema|Codec)</gm)?.length ?? 0;
      expect(checked.length, variant.name).toBe(casts + annotated);
      expect(checked, variant.name).toContain("Thing");
      files[`${variant.name}.ts`] = uncastCode;
    }
    expect(typecheck(files)).toEqual([]);
  });

  test("a schema that drifts from its type fails the check", { timeout: 60_000 }, () => {
    const code = generate(variants[0]!);
    // The interface keeps `id` required and `name` optional: the schema
    // accepts a response with no `id`, and requires a `name` callers may omit.
    const drifted = code
      .replace(`"id": S.String,`, `"id": S.optional(S.String),`)
      .replace(`"name": S.optional(S.String),`, `"name": S.String,`);
    expect(drifted).not.toBe(code);
    const errors = typecheck({ "drift.ts": uncast(drifted).code });
    expect(errors.some((e) => e.includes("// Thing: type -> schema"))).toBe(true);
    expect(errors.some((e) => e.includes("// Thing: schema -> type"))).toBe(true);
  });
});
