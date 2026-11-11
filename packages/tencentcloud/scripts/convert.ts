#!/usr/bin/env -S node --conditions=bun
/**
 * convert — Tencent Cloud API 3.0 models → Smithy 2.0 JSON models.
 *
 * Input:  specs/spec-mirror-tencentcloud/specs/_manifest.json (drives the run)
 *         specs/spec-mirror-tencentcloud/specs/<product>/v<date>/api.json
 * Output: .generated-specs/<product>.json, one model per product
 *
 * The models are the ones Tencent ships in its own CLI (tencentcloud-cli,
 * `tccli/services/<product>/v<date>/api.json`). The dialect:
 *
 *   metadata: { serviceShortName, apiVersion }
 *   actions: { <Action>: { input, output, document, status } }
 *   objects: { <Name>: { members: [{ name, type, member, required,
 *              output_required, value_allowed_null, disabled, document }] } }
 *
 * `type` is `string` | `int` | `bool` | `float` | `binary` | `list` |
 * `object`; for `list` and `object`, `member` names the element type (a
 * primitive or another object), and for `int` it is `int64` or `uint64`.
 *
 * Model conventions:
 *   • namespace `com.tencentcloud.<product>`, the CLI's product name
 *     (`autoscaling`); metadata carries `{ product, service, version }`.
 *     `service` is the model's `serviceShortName`, the API host's first
 *     label and the TC3 signing scope (`as` → as.tencentcloudapi.com).
 *     Every action is `POST https://<service>.tencentcloudapi.com/` with
 *     `X-TC-Action: <Action>` and `X-TC-Version: <version>`, stamped on each
 *     operation as the `com.tencentcloud#action` trait (read by
 *     scripts/generate.ts).
 *   • operations `ns#<Action>` (with a trailing `_` when an object owns that
 *     name; generate.ts strips it from the export); input and output are the
 *     action's own request and response objects.
 *   • every input gets an optional `region` member bound to the
 *     `X-TC-Region` header, so a call can pick its region; the `Region`
 *     layer and the credentials supply it otherwise (src/protocol.ts).
 *   • request members keep their `required` flag; members of objects only
 *     responses use are optional, and `value_allowed_null` members are
 *     nullable.
 *   • `disabled` members and `offline` actions are dropped; `deprecated`
 *     actions are kept with `smithy.api#deprecated`.
 *   • the `document` texts are left out. Tencent writes them in Chinese
 *     only, and the generator keeps module source Latin-1
 *     (codegen/latin1.ts), which would turn every character into a
 *     `U+XXXX` escape.
 *   • failures carry a string code in the response envelope
 *     (`Response.Error.Code`); the models declare none, and the protocol
 *     maps the documented common codes (src/errors.ts).
 *
 * Usage:
 *   node --conditions=bun scripts/convert.ts                  # every product
 *   node --conditions=bun scripts/convert.ts --product cvm    # one product
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { clearModels, writeModel } from "@distilled.cloud/dev/codegen/models";
import { NULLABLE_TRAIT } from "@distilled.cloud/dev/codegen/openapi";
import { finalizeConvert } from "@distilled.cloud/dev/codegen/patches";
import { resolveSpecPath } from "@distilled.cloud/dev/codegen/spec-path";

/** The operation trait carrying the call's `X-TC-*` routing (see scripts/generate.ts). */
export const ACTION_TRAIT = "com.tencentcloud#action";

// =============================================================================
// Tencent model types (the subset the converter reads)
// =============================================================================

interface TcMember {
  readonly name: string;
  readonly type: string;
  readonly member: string;
  readonly required?: boolean;
  readonly value_allowed_null?: boolean;
  readonly disabled?: boolean;
}

interface TcObject {
  readonly members: readonly TcMember[];
}

interface TcAction {
  readonly input: string;
  readonly output: string;
  readonly status?: string;
}

interface TcModel {
  readonly actions: Record<string, TcAction>;
  readonly objects: Record<string, TcObject>;
  readonly metadata: { readonly serviceShortName: string };
}

interface ManifestEntry {
  readonly product: string;
  readonly version: string;
  readonly file: string;
}

// =============================================================================
// Conversion
// =============================================================================

/**
 * Names an object cannot keep: the generated module's own imports and
 * locals, and TypeScript globals. They become `<Product><Name>`
 * (`Function` → `ScfFunction`).
 */
const RESERVED_NAMES = new Set([
  "S",
  "API",
  "T",
  "Retry",
  "Redacted",
  "TencentCloudProtocol",
  "TencentCloudOpError",
  "TencentCloudOpContext",
  "UnknownTencentCloudError",
  "TELEMETRY",
  "Schema",
  "Effect",
  "Context",
  "Layer",
  "Stream",
  "HttpClient",
  "Credentials",
  "Record",
  "Array",
  "Map",
  "Set",
  "Promise",
  "Error",
  "Function",
  "Object",
  "String",
  "Number",
  "Boolean",
  "Symbol",
  "Date",
  "RegExp",
  "JSON",
]);

/** Primitive `type`/`member` names → Smithy prelude shapes. */
const PRIMITIVES: Record<string, string> = {
  string: "smithy.api#String",
  int64: "smithy.api#Long",
  uint64: "smithy.api#Long",
  int: "smithy.api#Long",
  bool: "smithy.api#Boolean",
  float: "smithy.api#Double",
  binary: "smithy.api#Blob",
};

const capitalize = (s: string): string => (s ? s[0]!.toUpperCase() + s.slice(1) : s);

const ident = (s: string): string => s.replace(/[^A-Za-z0-9_]/g, "_");

const REGION_MEMBER = {
  target: "smithy.api#String",
  traits: {
    "smithy.api#httpHeader": "X-TC-Region",
    "smithy.api#documentation":
      "Region the call goes to (`X-TC-Region`), e.g. `ap-guangzhou`. Overrides the `Region` layer and the credentials' region. Leave it unset for a product that is not regional.",
  },
};

const convertModel = (entry: ManifestEntry, model: TcModel): object => {
  const ns = `com.tencentcloud.${ident(entry.product)}`;
  const service = model.metadata.serviceShortName;
  const shapes: Record<string, any> = {};
  const taken = new Set<string>();
  const alloc = (base: string): string => {
    let name = base;
    while (taken.has(name)) name = `${name}_`;
    taken.add(name);
    return name;
  };

  const objectNames = new Map<string, string>();
  for (const name of Object.keys(model.objects)) {
    const local = RESERVED_NAMES.has(name) ? `${capitalize(ident(entry.product))}${name}` : name;
    objectNames.set(name, alloc(local));
  }
  const objectTarget = (name: string): string => {
    const local = objectNames.get(name);
    if (local === undefined) {
      throw new Error(`${entry.product}: reference to unknown object ${name}`);
    }
    return `${ns}#${local}`;
  };

  const lists = new Map<string, string>();
  const listOf = (element: string): string => {
    let id = lists.get(element);
    if (id === undefined) {
      id = `${ns}#${alloc(`${element.split("#")[1]}List`)}`;
      shapes[id] = { type: "list", member: { target: element } };
      lists.set(element, id);
    }
    return id;
  };

  const memberTarget = (m: TcMember): string => {
    if (m.type === "list") return listOf(PRIMITIVES[m.member] ?? objectTarget(m.member));
    if (m.type === "object") return objectTarget(m.member);
    const target = PRIMITIVES[m.member] ?? PRIMITIVES[m.type];
    if (target === undefined) {
      throw new Error(`${entry.product}: member ${m.name} has unknown type ${m.type}`);
    }
    return target;
  };

  // Request members keep `required`; objects only responses reach are all
  // optional. An object both sides use follows the request side.
  const actions = Object.entries(model.actions).filter(([, a]) => a.status !== "offline");
  const requestSide = new Set<string>();
  const visit = (name: string): void => {
    if (requestSide.has(name)) return;
    requestSide.add(name);
    for (const m of model.objects[name]?.members ?? []) {
      if (m.disabled === true) continue;
      if ((m.type === "object" || m.type === "list") && PRIMITIVES[m.member] === undefined) {
        visit(m.member);
      }
    }
  };
  for (const [, action] of actions) visit(action.input);

  for (const [name, object] of Object.entries(model.objects)) {
    const members: Record<string, any> = {};
    for (const m of object.members) {
      if (m.disabled === true) continue;
      const traits: Record<string, unknown> = {};
      if (requestSide.has(name) && m.required === true) traits["smithy.api#required"] = {};
      if (m.value_allowed_null === true) traits[NULLABLE_TRAIT] = {};
      members[m.name] = { target: memberTarget(m), traits };
    }
    shapes[objectTarget(name)] = { type: "structure", members };
  }

  for (const [actionName, action] of actions) {
    const input = shapes[objectTarget(action.input)];
    input.members.region ??= REGION_MEMBER;
    const local = alloc(taken.has(actionName) ? `${actionName}_` : actionName);
    const traits: Record<string, unknown> = {
      [ACTION_TRAIT]: { service, version: entry.version, action: actionName },
    };
    if (action.status === "deprecated") traits["smithy.api#deprecated"] = {};
    shapes[`${ns}#${local}`] = {
      type: "operation",
      input: { target: objectTarget(action.input) },
      output: { target: objectTarget(action.output) },
      traits,
    };
  }

  return {
    smithy: "2.0",
    metadata: {
      product: entry.product,
      service,
      version: entry.version,
    },
    shapes,
  };
};

// =============================================================================
// Main
// =============================================================================

const args = process.argv.slice(2);
const productFilter = args.includes("--product") ? args[args.indexOf("--product") + 1] : undefined;

const root = path.resolve(import.meta.dirname, "..");
const specsDir = resolveSpecPath(root, "specs/spec-mirror-tencentcloud/specs");
const manifestPath = path.join(specsDir, "_manifest.json");
if (!fs.existsSync(manifestPath)) {
  console.error(
    `${manifestPath} not found — run \`pnpm --filter @distilled.cloud/tencentcloud run specs:fetch\` first`,
  );
  process.exit(1);
}

const manifest: ManifestEntry[] = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
const entries = productFilter ? manifest.filter((e) => e.product === productFilter) : manifest;
if (entries.length === 0) {
  console.error(`No product ${productFilter} in the mirror's manifest`);
  process.exit(1);
}

const outDir = path.join(root, ".generated-specs");
if (!productFilter) clearModels(outDir);

for (const entry of entries) {
  const model: TcModel = JSON.parse(fs.readFileSync(path.join(specsDir, entry.file), "utf-8"));
  writeModel(path.join(outDir, `${ident(entry.product)}.json`), convertModel(entry, model));
}
console.log(`✅ Converted ${entries.length} Tencent Cloud models to Smithy`);

await finalizeConvert({
  root,
  operationNaming: "as-is",
  include: productFilter ? (resource) => resource === ident(productFilter) : undefined,
  telemetry: { prefix: "TencentCloud", system: "tencentcloud-api" },
});
