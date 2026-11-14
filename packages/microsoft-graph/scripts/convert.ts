#!/usr/bin/env -S node --conditions=bun
/**
 * convert — Microsoft Graph's v1.0 OpenAPI description → Smithy JSON models
 * in .generated-specs.
 *
 * Microsoft publishes ONE ~44 MB OpenAPI 3.0 YAML document
 * (`openapi/v1.0/openapi.yaml` in microsoftgraph/msgraph-metadata) covering
 * ~18,000 operations across ~70 top-level tag groups (`applications`,
 * `servicePrincipals`, `groups`, `users`, …). The layout wants one Smithy
 * model — one service module — per group. The ordering is load-bearing:
 *
 *   1. Read and parse the full YAML spec.
 *   2. Normalise the schema graph (see `normalise`): drop navigation
 *      properties and discriminator mappings, strip the `microsoft.graph.`
 *      schema prefix, rewrite `{type: object, nullable: true}` union arms to
 *      null, and stop requiring `@odata.type`.
 *   3. Bucket operations by the group of their PRIMARY (first) tag
 *      (`applications.application.Actions` → `applications`).
 *   4. Shorten operation ids (see `shortenIds`) so the group isn't repeated
 *      in every member of its module.
 *   5. Convert each bucket through the shared `convertOpenApiToSmithy`, then
 *      give sanitised members readable names and mark `x-ms-pageable`
 *      operations paginated (see `finishModel`), and write
 *      `.generated-specs/<group>.json`.
 *
 * Patches are Smithy ops on the converted models, under the names the spec
 * gives; the finalizeConvert at the end applies them, then the deferred
 * verbNoun names (see `@distilled.cloud/dev/codegen/patches`).
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { clearModels, writeModel } from "@distilled.cloud/dev/codegen/models";
import { convertOpenApiToSmithy } from "@distilled.cloud/dev/codegen/openapi";
import { finalizeConvert } from "@distilled.cloud/dev/codegen/patches";
import { resolveSpecPath } from "@distilled.cloud/dev/codegen/spec-path";
import { parse as parseYaml } from "yaml";

const rootDir = path.resolve(import.meta.dirname, "..");
const specPath = resolveSpecPath(rootDir, "specs/spec-mirror-microsoft-graph/specs/openapi.yaml");
const outDir = path.join(rootDir, ".generated-specs");

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;
const SCHEMA_REF = "#/components/schemas/";
const GRAPH_PREFIX = "microsoft.graph.";

/**
 * String members that carry a secret. Exact names rather than the shared
 * substring patterns: Graph has many `password*` / `*Key*` members that are
 * plain settings (`passwordPolicies`, `customKeyIdentifier`, `keyId`).
 */
const SENSITIVE_MEMBERS: readonly RegExp[] = [
  /^password$/i,
  /^newPassword$/i,
  /^adDomainPassword$/i,
  /^passwordBase64$/i,
  /^secretText$/i,
  /^clientSecret$/i,
  /^secret$/i,
  /^secretKey$/i,
  /^webPushEncryptionSecret$/i,
  /^token$/i,
  /^accessToken$/i,
  /^apiToken$/i,
  /^clientToken$/i,
  /^serverToken$/i,
  /^sasToken$/i,
  /^recordingAccessToken$/i,
  /^privateKey$/i,
  /^decryptionKey$/i,
  /^encryptionKey$/i,
  /^macKey$/i,
  /^deploymentAccessKey$/i,
  /^azureOperationalInsightsWorkspaceKey$/i,
];

/** Synthetic input member carrying a page's `@odata.nextLink` (see protocol.ts). */
const NEXT_LINK_MEMBER = "nextLink";

// ---- 1. Read the full spec -------------------------------------------------
if (!fs.existsSync(specPath)) {
  throw new Error(
    `${specPath} not found — run \`pnpm run specs:fetch\` to check out the spec submodule`,
  );
}
const fullSpec = parseYaml(fs.readFileSync(specPath, "utf-8"), { maxAliasCount: -1 });

// ---- 2. Normalise the schema graph -----------------------------------------

/**
 * Graph's entity schemas carry every navigation property (`application.owners`,
 * `user.drive`, `group.sites`, …) as a `$ref`, and every base type
 * (`entity`, `directoryObject`) carries a discriminator mapping to all of its
 * subtypes. Followed, either one pulls the whole ~5,000-schema entity graph
 * into every module. Neither is returned by a plain read: navigation
 * properties only come back under `$expand`, and the subtype is the
 * endpoint's own. Both are dropped; `$expand` results pass through
 * undecoded.
 *
 * `@odata.type` is listed as required on every entity, but Graph infers it
 * from the endpoint and never needs it on a create; it stays an optional
 * member.
 *
 * Nullable references are spelled `anyOf: [{ $ref }, { type: object,
 * nullable: true }]`; the second arm means null, so it becomes one.
 */
const normalise = (spec: any): void => {
  const schemas: Record<string, any> = spec.components.schemas;

  // Strip the namespace prefix where the short name is free.
  const renames = new Map<string, string>();
  const taken = new Set(Object.keys(schemas).filter((k) => !k.startsWith(GRAPH_PREFIX)));
  for (const name of Object.keys(schemas)) {
    if (!name.startsWith(GRAPH_PREFIX)) continue;
    const short = name.slice(GRAPH_PREFIX.length);
    if (taken.has(short)) continue;
    taken.add(short);
    renames.set(name, short);
  }
  const renamed: Record<string, any> = {};
  for (const [name, schema] of Object.entries(schemas)) {
    renamed[renames.get(name) ?? name] = schema;
  }
  spec.components.schemas = renamed;

  const isNullObject = (b: any): boolean =>
    b !== null &&
    typeof b === "object" &&
    b.type === "object" &&
    b.nullable === true &&
    Object.keys(b).every((k) => k === "type" || k === "nullable");

  const visit = (node: any): void => {
    if (Array.isArray(node)) {
      for (const n of node) visit(n);
      return;
    }
    if (node === null || typeof node !== "object") return;
    if (typeof node.$ref === "string" && node.$ref.startsWith(SCHEMA_REF)) {
      const name = node.$ref.slice(SCHEMA_REF.length);
      const short = renames.get(name);
      if (short !== undefined) node.$ref = `${SCHEMA_REF}${short}`;
    }
    if (node.discriminator !== undefined && typeof node.discriminator === "object") {
      delete node.discriminator;
    }
    if (node.properties !== null && typeof node.properties === "object") {
      for (const [k, v] of Object.entries<any>(node.properties)) {
        if (v?.["x-ms-navigationProperty"] === true) delete node.properties[k];
      }
      if (Array.isArray(node.required)) {
        node.required = node.required.filter(
          (k: string) => k !== "@odata.type" && k in node.properties,
        );
        if (node.required.length === 0) delete node.required;
      }
    }
    for (const key of ["anyOf", "oneOf"] as const) {
      if (Array.isArray(node[key])) {
        node[key] = node[key].map((b: any) => (isNullObject(b) ? { type: "null" } : b));
      }
    }
    for (const v of Object.values(node)) visit(v);
  };
  visit(spec.components);
  visit(spec.paths);
};
normalise(fullSpec);

// ---- 3./4. Bucket by tag group and shorten ids -----------------------------

interface OpRef {
  readonly method: (typeof HTTP_METHODS)[number];
  readonly pathTemplate: string;
  readonly op: Record<string, any>;
}

/** `applications.application.Actions` → `applications`. */
const groupOf = (op: Record<string, any>): string => {
  const tag: string = Array.isArray(op.tags) && op.tags.length > 0 ? op.tags[0] : "default";
  return tag.split(".")[0]!.replace(/[^A-Za-z0-9]/g, "") || "default";
};

const upperFirst = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

/** Graph's per-path disambiguation suffix: `GetCount-3aad`. */
const HASH_SUFFIX = /-([0-9a-f]{4})$/;

/** The CRUD verb Graph's ids lead their last segment with. */
const LEADING_VERB = /^(Get|List|Create|Update|Delete|Set)(?=[A-Z]|$)/;

/**
 * Graph operation ids are `<group>.<path segments>.<VerbNoun>`
 * (`applications.application.ListApplication`,
 * `applications.owners.DeleteRefDirectoryObject`). The group is already the
 * module name, so it goes. Each id then keeps the fewest trailing segments
 * that are unique in its module: `ListApplication`, `addPassword`, but
 * `GetOwnersAsUser` next to `ListOwnersAsUser`. When ids collide, the one
 * on the shortest path keeps the short name. The `-xxxx` suffix Graph adds
 * to repeated `GetCount` ids is kept only when nothing else separates them.
 */
const shortenIds = (ops: readonly OpRef[], group: string): void => {
  const segs = ops.map((o) => {
    const parts = String(o.op.operationId).split(".");
    return parts[0] === group ? parts.slice(1) : parts;
  });
  const depth = ops.map(() => 1);
  // A qualified name keeps the verb first: `members.DeleteRefDirectoryObject`
  // → `DeleteMembersRefDirectoryObject`, not `MembersDeleteRef…`.
  const nameAt = (i: number, withHash: boolean): string => {
    const parts = segs[i]!.slice(-depth[i]!).map((s, j, all) =>
      upperFirst(j === all.length - 1 && !withHash ? s.replace(HASH_SUFFIX, "") : s),
    );
    const last = parts.length > 1 ? LEADING_VERB.exec(parts[parts.length - 1]!) : null;
    const joined = last
      ? `${last[1]}${parts.slice(0, -1).join("")}${parts[parts.length - 1]!.slice(last[1]!.length)}`
      : parts.join("");
    return joined.replace(/[^A-Za-z0-9]/g, "");
  };

  const collisions = (withHash: boolean): number[][] => {
    const by = new Map<string, number[]>();
    ops.forEach((_, i) => {
      const k = nameAt(i, withHash).toLowerCase();
      by.set(k, [...(by.get(k) ?? []), i]);
    });
    return [...by.values()].filter((v) => v.length > 1);
  };

  for (let changed = true; changed;) {
    changed = false;
    for (const clash of collisions(false)) {
      // The op on the shortest path is the resource's own (`GET
      // /users/{user-id}` is `getUser`); the nested ones qualify.
      const lengths = clash.map((i) => ops[i]!.pathTemplate.length);
      const shortest = Math.min(...lengths);
      const keeper =
        lengths.filter((l) => l === shortest).length === 1
          ? clash[lengths.indexOf(shortest)]
          : undefined;
      for (const i of clash) {
        if (i !== keeper && depth[i]! < segs[i]!.length) {
          depth[i]!++;
          changed = true;
        }
      }
    }
  }
  const hashed = new Set(collisions(false).flat());
  const names = ops.map((_, i) => nameAt(i, hashed.has(i)));
  const seen = new Map<string, number>();
  ops.forEach((o, i) => {
    let name = names[i]!;
    const n = seen.get(name.toLowerCase()) ?? 0;
    seen.set(name.toLowerCase(), n + 1);
    if (n > 0) name = `${name}${n + 1}`;
    o.op.operationId = name;
  });
};

const buckets = new Map<string, OpRef[]>();
for (const [pathTemplate, pathItem] of Object.entries<Record<string, any>>(fullSpec.paths)) {
  for (const method of HTTP_METHODS) {
    const op = pathItem[method];
    if (!op) continue;
    const group = groupOf(op);
    if (!buckets.has(group)) buckets.set(group, []);
    buckets.get(group)!.push({ method, pathTemplate, op });
  }
}
for (const [group, ops] of buckets) shortenIds(ops, group);

// ---- 5. Convert each bucket ------------------------------------------------

/** Same sanitisation the converter applies to label names. */
const memberIdent = (name: string): string => {
  let out = name.replace(/[^A-Za-z0-9_]/g, "_");
  if (/^[0-9]/.test(out)) out = `_${out}`;
  return out || "_";
};

/** `@odata.nextLink` → `odataNextLink`, `$filter` → `filter`. */
const readableName = (wire: string): string => {
  const parts = wire.split(/[^A-Za-z0-9]+/).filter(Boolean);
  const out = parts
    .map((p, i) => (i === 0 ? p.charAt(0).toLowerCase() + p.slice(1) : upperFirst(p)))
    .join("");
  return /^[0-9]/.test(out) ? `_${out}` : out;
};

/**
 * Members whose wire name is not an identifier (`$filter`, `@odata.nextLink`,
 * `members@odata.bind`) come out of the converter as `_filter`,
 * `_odata_nextLink`; rename them to `filter`, `odataNextLink`. The wire name
 * stays on the `httpQuery` / `jsonName` trait.
 *
 * `x-ms-pageable` list operations get a `cursor` pagination trait over a
 * synthetic `nextLink` input member: the protocol requests a page's
 * `@odata.nextLink` URL verbatim when it is set.
 */
const finishModel = (model: any, pageable: ReadonlySet<string>): number => {
  for (const shape of Object.values<any>(model.shapes)) {
    if (shape.type !== "structure" || !shape.members) continue;
    const next: Record<string, any> = {};
    for (const [name, member] of Object.entries<any>(shape.members)) {
      const traits = member.traits ?? {};
      const wire: string | undefined =
        traits["smithy.api#httpQuery"] ?? traits["smithy.api#jsonName"];
      let target = name;
      if (name.startsWith("_") && typeof wire === "string") {
        const readable = readableName(wire);
        if (readable && !(readable in shape.members) && !(readable in next)) {
          target = readable;
          if (!traits["smithy.api#httpQuery"] && !traits["smithy.api#jsonName"]) {
            member.traits = { ...traits, "smithy.api#jsonName": wire };
          }
        }
      }
      next[target] = member;
    }
    shape.members = next;
  }

  let paginated = 0;
  for (const shape of Object.values<any>(model.shapes)) {
    if (shape.type !== "operation") continue;
    const http = shape.traits?.["smithy.api#http"];
    if (!http) continue;
    const isPageable = pageable.has(`${http.method} ${http.uri}`);
    // Path labels come out as `application_id` (from `{application-id}`):
    // rename them `applicationId`, in the input and the URI alike. Each
    // input shape belongs to exactly one operation.
    const labelled = model.shapes[shape.input?.target];
    if (labelled?.members) {
      const next: Record<string, any> = {};
      for (const [name, member] of Object.entries<any>(labelled.members)) {
        const readable = readableName(name);
        if (
          member.traits?.["smithy.api#httpLabel"] !== undefined &&
          readable !== name &&
          !(readable in labelled.members)
        ) {
          http.uri = http.uri
            .split(`{${name}}`)
            .join(`{${readable}}`)
            .split(`{${name}+}`)
            .join(`{${readable}+}`);
          next[readable] = member;
        } else {
          next[name] = member;
        }
      }
      labelled.members = next;
    }
    if (!isPageable) continue;
    const output = model.shapes[shape.output?.target];
    if (!output?.members?.value || !output.members.odataNextLink) continue;
    const input = model.shapes[shape.input?.target];
    if (!input?.members) continue;
    input.members[NEXT_LINK_MEMBER] = {
      target: "smithy.api#String",
      traits: {
        "smithy.api#documentation":
          "The `@odata.nextLink` of the previous page. When set, the request goes to this URL as-is and the other query members are ignored.",
      },
    };
    shape.traits["smithy.api#paginated"] = {
      mode: "cursor",
      inputToken: NEXT_LINK_MEMBER,
      outputToken: "odataNextLink",
      items: "value",
      ...(input.members.top ? { pageSize: "top" } : {}),
    };
    paginated++;
  }
  return paginated;
};

/** Generate maps it to `T.CommaDelimited()`. */
const COMMA_DELIMITED_TRAIT = "com.microsoft.graph#commaDelimited";

/**
 * Array query parameters by name, each with whether every declaration of it
 * is `style: form, explode: false` -- one comma-joined value
 * (`$select=id,appId`). Graph rejects the key repeated per element.
 */
const commaDelimitedQueries = (() => {
  const explodeByName = new Map<string, Set<boolean>>();
  const resolve = (node: any): any =>
    typeof node?.$ref === "string"
      ? fullSpec.components?.parameters?.[node.$ref.split("/").at(-1)]
      : node;
  for (const pathItem of Object.values<any>(fullSpec.paths ?? {})) {
    for (const method of HTTP_METHODS) {
      const op = pathItem?.[method];
      if (!op) continue;
      for (const raw of [...(pathItem.parameters ?? []), ...(op.parameters ?? [])]) {
        const param = resolve(raw);
        if (param?.in !== "query" || param.schema?.type !== "array") continue;
        const set = explodeByName.get(param.name) ?? new Set<boolean>();
        set.add(param.explode === false);
        explodeByName.set(param.name, set);
      }
    }
  }
  return new Set(
    [...explodeByName]
      .filter(([, values]) => values.size === 1 && values.has(true))
      .map(([n]) => n),
  );
})();

/** Stamp the comma-delimited trait on the list query members the spec joins. */
const stampCommaDelimited = (model: any): void => {
  for (const shape of Object.values<any>(model.shapes)) {
    if (shape.type !== "structure") continue;
    for (const member of Object.values<any>(shape.members ?? {})) {
      const query = member.traits?.["smithy.api#httpQuery"];
      if (typeof query !== "string" || !commaDelimitedQueries.has(query)) continue;
      if (model.shapes[member.target]?.type !== "list") continue;
      member.traits[COMMA_DELIMITED_TRAIT] = {};
    }
  }
};

clearModels(outDir);

let written = 0;
let totalOps = 0;
let totalPaginated = 0;
for (const group of [...buckets.keys()].sort()) {
  const ops = buckets.get(group)!;
  const paths: Record<string, Record<string, unknown>> = {};
  const pageable = new Set<string>();
  for (const { method, pathTemplate, op } of ops) {
    if (!paths[pathTemplate]) {
      const pathParams = fullSpec.paths[pathTemplate].parameters;
      paths[pathTemplate] = pathParams ? { parameters: pathParams } : {};
    }
    paths[pathTemplate]![method] = op;
    if (op["x-ms-pageable"]?.nextLinkName === "@odata.nextLink") {
      const uri = pathTemplate.replace(/\{([^}]+)\}/g, (_, raw) => `{${memberIdent(raw)}}`);
      pageable.add(`${method.toUpperCase()} ${uri}`);
    }
  }
  const model = convertOpenApiToSmithy(
    { ...fullSpec, paths },
    {
      deferNaming: true,
      namespace: `com.microsoft.graph.${group}`,
      serviceName: upperFirst(group),
      skipDeprecated: true,
      // Graph declares only `2XX` / `4XX` / `5XX` ranges: success bodies
      // come from `2XX`, and every failure is dispatched by the protocol
      // on the error envelope's `code` (see src/protocol.ts).
      successStatuses: ["2XX", "200", "201", "204"],
      statusToErrorClass: {},
      // `ConsistencyLevel: eventual` is a real per-call input ($count and
      // $search on directory objects need it), as are `If-Match` and
      // `Prefer` where the spec declares them.
      headerParams: true,
      sensitivePatterns: SENSITIVE_MEMBERS,
    },
  );
  const opCount = Object.values(model.shapes).filter((s: any) => s.type === "operation").length;
  if (opCount === 0) continue; // all-deprecated bucket
  totalPaginated += finishModel(model, pageable);
  stampCommaDelimited(model);
  writeModel(path.join(outDir, `${group}.json`), model);
  written++;
  totalOps += opCount;
}

console.log(
  `✅ ${written} Smithy models (${totalOps} operations, ${totalPaginated} paginated) → ${outDir}`,
);

await finalizeConvert({ root: rootDir });
