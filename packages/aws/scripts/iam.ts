/**
 * Each operation's `iam` (core `OperationIam`): what AWS's Service
 * Authorization Reference says the call is authorized as, joined to the
 * Smithy operation and corrected by `patches/<sdkId>.json`
 * (`operations.<op>.iam`).
 *
 * The reference is mirrored into `specs/iam/<prefix>.json` by the spec
 * mirror's fetch script. An operation is found there by its boto3 client and
 * name (the reference lists both), falling back to the service's ARN
 * namespace, which is its IAM prefix.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { resolveSpecPath } from "@distilled.cloud/dev/codegen/spec-path";
import type { OperationIamPatch } from "./spec-schema.ts";

interface ReferenceFile {
  prefix: string;
  operations: Record<string, { actions: string[]; sdk: string[] }>;
  /** Action → resource types, `*`-suffixed when required. */
  actions: Record<string, string[]>;
  resources: Record<string, string[]>;
}

export interface OperationIam {
  actions: string[];
  resources?: Record<string, string[]>;
  conditional?: Record<string, string>;
}

let reference: Map<string, ReferenceFile> | undefined;
const loadReference = () => {
  if (reference) return reference;
  reference = new Map();
  const dir = path.join(
    resolveSpecPath(path.resolve(import.meta.dirname, ".."), "specs/spec-mirror-aws/specs"),
    "iam",
  );
  if (!fs.existsSync(dir)) return reference;
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".json"))) {
    const entry = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8")) as ReferenceFile;
    reference.set(entry.prefix, entry);
  }
  return reference;
};

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

const lookupAction = (action: string) => {
  const [prefix, name] = action.split(":") as [string, string];
  const file = loadReference().get(prefix);
  if (!file || name === undefined) return undefined;
  const key = Object.keys(file.actions).find((k) => k.toLowerCase() === name.toLowerCase());
  return key === undefined ? undefined : { file, types: file.actions[key]! };
};

/** The ARN formats a grant on `action` may name: only when every type it accepts is required. */
const resourcesOf = (action: string): string[] | undefined => {
  const found = lookupAction(action);
  if (!found || found.types.length === 0) return undefined;
  if (found.types.some((t) => !t.endsWith("*"))) return undefined;
  const formats = found.types.flatMap((t) => found.file.resources[t.slice(0, -1)] ?? []);
  return formats.length > 0 ? [...new Set(formats)] : undefined;
};

const TAG_MEMBERS = new Set(["tags", "taglist", "tagspecifications", "resourcetags"]);
const isTagging = (action: string) =>
  /^(Tag|Untag|AddTags|RemoveTags|CreateTags)/.test(action.split(":")[1] ?? "");

/** Members of a structure shape, with whether each is required. */
const membersOf = (shapes: Record<string, any>, id: string | undefined) =>
  Object.entries((id && shapes[id]?.members) ?? {}).map(([name, m]: [string, any]) => ({
    name,
    target: m.target as string,
    required: m.traits?.["smithy.api#required"] !== undefined,
  }));

/** The first role member of the input (one level deep), as a `Field.Sub` path. */
const roleField = (shapes: Record<string, any>, input: string | undefined) => {
  const isRole = (n: string) => /Role(Arn|Name)?$/i.test(n);
  for (const m of membersOf(shapes, input)) {
    if (isRole(m.name)) return { path: m.name, required: m.required };
  }
  for (const m of membersOf(shapes, input)) {
    for (const sub of membersOf(shapes, m.target)) {
      if (isRole(sub.name))
        return { path: `${m.name}.${sub.name}`, required: m.required && sub.required };
    }
  }
  return undefined;
};

export const operationIam = (options: {
  shapes: Record<string, any>;
  service: { sdkId: string; endpointPrefix?: string; arnNamespace?: string };
  opName: string;
  input: string | undefined;
  patch: OperationIamPatch | undefined;
  /** Actions removed from every operation of the service (`allOperations.iam`). */
  removeEverywhere?: readonly string[];
}): OperationIam | undefined => {
  const { shapes, service, opName, input, patch } = options;
  const names = new Set(
    [service.sdkId, service.endpointPrefix, service.arnNamespace]
      .filter(Boolean)
      .map((n) => norm(n!)),
  );
  // By boto3 client + name first; a prefix lists other clients' operations
  // too (s3 holds s3control's).
  let actions: string[] | undefined;
  for (const file of loadReference().values()) {
    const op = file.operations[opName];
    if (op && op.sdk.some((s) => names.has(norm(s)))) {
      actions = op.actions;
      break;
    }
  }
  const prefix = service.arnNamespace;
  if (actions === undefined && prefix)
    actions = loadReference().get(prefix)?.operations[opName]?.actions;
  // No operation entry: the action named after the operation, when it exists.
  if (
    (actions === undefined || actions.length === 0) &&
    prefix &&
    lookupAction(`${prefix}:${opName}`)
  ) {
    actions = [`${prefix}:${opName}`];
  }
  if (patch?.actions) actions = [...patch.actions];
  if (actions === undefined || actions.length === 0) return undefined;
  // `remove` takes globs: `sso-directory:*`, `es:*Elasticsearch*`.
  const glob = (pattern: string) =>
    new RegExp(
      `^${pattern
        .split("*")
        .map((p) => p.replace(/[.+?^${}()|[\]\\]/g, "\\$&"))
        .join(".*")}$`,
    );
  const removed = (patch?.remove ?? []).map(glob);
  // A service-wide removal never takes an operation's own action away:
  // `DescribeStandardsControls` is a legacy action everywhere else.
  const removedEverywhere = (options.removeEverywhere ?? []).map(glob);
  const own = (a: string) => a.split(":")[1]?.toLowerCase() === opName.toLowerCase();
  actions = [...new Set([...actions, ...(patch?.add ?? [])])].filter(
    (a) => !removed.some((r) => r.test(a)) && (own(a) || !removedEverywhere.some((r) => r.test(a))),
  );

  const resources: Record<string, string[]> = {};
  for (const action of actions) {
    const formats = resourcesOf(action);
    if (formats) resources[action] = formats;
  }
  for (const [action, formats] of Object.entries(patch?.resources ?? {})) {
    if (formats === "*") delete resources[action];
    else resources[action] = [...formats];
  }

  // Actions only some requests need: a role the request passes, tags it sets.
  const conditional: Record<string, string> = {};
  if (actions.includes("iam:PassRole")) {
    const role = roleField(shapes, input);
    if (!role?.required) conditional["iam:PassRole"] = role?.path ?? "a role the request names";
  }
  const tags = membersOf(shapes, input).find((m) => TAG_MEMBERS.has(m.name.toLowerCase()));
  if (tags && !tags.required) {
    for (const action of actions.filter(isTagging)) conditional[action] = tags.name;
  }
  for (const [action, field] of Object.entries(patch?.conditional ?? {}))
    conditional[action] = field;
  for (const action of Object.keys(conditional))
    if (!actions.includes(action)) delete conditional[action];

  return {
    actions,
    ...(Object.keys(resources).length ? { resources } : {}),
    ...(Object.keys(conditional).length ? { conditional } : {}),
  };
};
