#!/usr/bin/env -S node --conditions=bun
/**
 * generate: the Smithy models from scripts/convert.ts -> the Proxmox VE
 * Effect SDK.
 *
 * Output: src/services/<area>.ts, src/services/index.ts and
 * src/property-strings.ts.
 *
 * Proxmox's wire format differs from plain JSON REST in three ways the spec
 * below accounts for:
 *
 * - Booleans often come back as `0`/`1`.
 * - Operations with no return value answer `{ "data": null }`.
 * - Indexed families (`net[n]` in the schema, `net0`, `net1`, ... on the
 *   wire) have no Smithy equivalent. Convert keeps them in a trait and
 *   {@link lowerFamilies} turns them into template-key records here.
 *
 * Property-string codecs come from the same models: generate reads them in
 * memory right after convert writes them (see {@link convertAndWriteCodecs}).
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";
import { formatGenerated, runTool } from "@distilled.cloud/dev/codegen/format";
import type { SdkSpec } from "@distilled.cloud/dev/codegen/generator";
import { listModels, readModel } from "@distilled.cloud/dev/codegen/models";
import { JSON_PRELUDE, TS_JSON_PRELUDE } from "@distilled.cloud/dev/codegen/prelude";
import * as Effect from "effect/Effect";
import { generatePropertyStrings } from "./property-strings.ts";
import type { Model } from "./schema.ts";

const root = path.resolve(import.meta.dirname, "..");
const propertyStrings = path.join(root, "src/property-strings.ts");

/** `nodes_lxc` -> `nodesLxc` (the barrel's export name). */
const camel = (slug: string): string =>
  slug.replace(/_([a-z0-9])/g, (_, c: string) => c.toUpperCase());

/**
 * Lowers indexed families at the emission boundary. A `"net[n]"?: string`
 * member becomes a `net${number}` index signature in the interface and a
 * `T.FamilyKey("net")` record in the schema.
 */
export const lowerFamilies = (code: string): string =>
  code
    .replace(/"(\w+)\[n\]"\?: string;/g, "[key: `$1${number}`]: string | undefined;")
    .replace(/S\.Struct\(\{(\n[\s\S]*?)^\}\)/gm, (whole: string, fields: string) => {
      const families: string[] = [];
      const rest = fields.replace(
        /^ {2}"(\w+)\[n\]": S\.optional\(S\.String\),\n/gm,
        (_, prefix: string) => {
          families.push(`S.Record(T.FamilyKey(${JSON.stringify(prefix)}), S.String)`);
          return "";
        },
      );
      return families.length
        ? `S.StructWithRest(S.Struct({${rest}}), [${families.join(", ")}])`
        : whole;
    });

const spec: SdkSpec = {
  sourceNote: `.generated-specs (pve-docs, specs/spec-mirror-proxmox/specs/api-structure.json)`,
  prelude: {
    ...JSON_PRELUDE,
    Boolean: "S.Union([S.Boolean, S.Literals([0, 1])])",
    Unit: "S.Null",
  },
  tsPrelude: { ...TS_JSON_PRELUDE, Boolean: "boolean | 0 | 1", Unit: "null" },
  extraBindings: [
    {
      // Every response is `{ "data": ... }`; the protocol unwraps it, so the
      // sole `data` member IS the payload.
      trait: "com.distilled.openapi#rawResponse",
      binding: "rawResponse",
      pipe: "T.RawResponse()",
      rootPipe: "T.RawResponseRoot()",
    },
  ],
  operationDecl: {
    contextType: "ProxmoxOpContext",
    commonErrorType: "ProxmoxOpError",
    commonErrorClasses: ["UnknownProxmoxError"],
    protocol: "ProxmoxProtocol",
    // No retry policy: replaying a write could start its task twice.
  },
  postProcess: lowerFamilies,
};

/**
 * Runs convert, then writes the property-string codecs from the models it
 * left in memory. Convert always converts every area, so the codecs stay
 * complete on a `--resource` run too.
 */
const convertAndWriteCodecs = async () => {
  await import("./convert.ts");
  const models = new Map<string, Model>(
    listModels(path.join(root, ".generated-specs")).map((file) => [
      path.basename(file, ".json"),
      readModel(file),
    ]),
  );
  fs.writeFileSync(propertyStrings, generatePropertyStrings(models));
};

runGeneratorCli({
  description: "Generate the Proxmox VE Effect SDK from the Smithy models",
  convert: convertAndWriteCodecs,
  root,
  patchesDir: false,
  barrelExportName: camel,
  finalize: (dir) =>
    Effect.andThen(formatGenerated(dir), runTool(["pnpm", "exec", "oxfmt", propertyStrings])),
  spec: () => spec,
});
