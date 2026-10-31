/**
 * crds — turn CustomResourceDefinition manifests into Swagger 2.0 paths and
 * definitions shaped like the ones the API server publishes for them, so
 * scripts/convert.ts can convert custom resources exactly like built-in ones.
 *
 * The API server serves each CRD version as the standard resource endpoints
 * (list/create/deletecollection, read/replace/delete/patch, the `status` and
 * `scale` subresources, list across namespaces). Their parameters are the
 * same as a built-in resource's of the same scope, so each path item is a
 * copy of a built-in template resource's, with the group, version, kind,
 * plural and schema refs swapped. What differs from a built-in resource:
 *
 * - operation ids name the group with `.k8s.io` dropped and each remaining
 *   segment capitalized (`snapshot.storage.k8s.io` → `SnapshotStorage`,
 *   `cert-manager.io` → `CertManagerIo`)
 * - definitions are named by the reversed group
 *   (`io.k8s.storage.snapshot.v1.VolumeSnapshot`): the version's
 *   `openAPIV3Schema` with `metadata` as `ObjectMeta`, plus a `<Kind>List`.
 *   The API server keeps nested objects inline; here each one becomes a
 *   definition named by its path (`…VolumeSnapshotSpecSource`), the way the
 *   built-in definitions name theirs, so the generated types do too.
 * - PATCH accepts JSON patch, merge patch and apply, not strategic merge
 *
 * Checked against the OpenAPI a v1.36 API server publishes for the
 * external-snapshotter CRDs (scripts/crds.test.ts).
 */
import * as fs from "node:fs/promises";
import { parseAllDocuments } from "yaml";

/**
 * The CustomResourceDefinitions in `files`, every YAML document of each.
 * A missing file names the commands that fetch it; a file that does not
 * parse, or holds another kind, is refused.
 */
export const readCrds = async (files: ReadonlyArray<string>): Promise<Crd[]> => {
  const crds: Crd[] = [];
  for (const file of files) {
    const text = await fs.readFile(file, "utf8").catch((cause) => {
      throw new Error(
        `crds: cannot read ${file}. Fetch the spec mirror with \`pnpm --filter @distilled.cloud/kubernetes run specs:fetch\`; if the mirror has no CRD manifests yet, run \`pnpm specs:local kubernetes\` and generate with DISTILLED_SPECS_LOCAL=1`,
        { cause },
      );
    });
    for (const doc of parseAllDocuments(text)) {
      if (doc.errors.length > 0) {
        throw new Error(`crds: ${file} is not valid YAML: ${doc.errors[0]!.message}`);
      }
      const crd = doc.toJS();
      if (crd === null || crd === undefined) continue;
      if (crd.kind !== "CustomResourceDefinition") {
        throw new Error(`crds: ${file}: expected a CustomResourceDefinition, got ${crd.kind}`);
      }
      crds.push(crd);
    }
  }
  return crds;
};

/** The parts of a CustomResourceDefinition this reads. */
export interface Crd {
  readonly kind: "CustomResourceDefinition";
  readonly spec: {
    readonly group: string;
    readonly scope: "Namespaced" | "Cluster";
    readonly names: { readonly kind: string; readonly listKind?: string; readonly plural: string };
    readonly versions: ReadonlyArray<{
      readonly name: string;
      readonly served: boolean;
      readonly schema?: { readonly openAPIV3Schema?: Record<string, any> };
      readonly subresources?: { readonly status?: object; readonly scale?: object };
    }>;
  };
}

/** The Swagger 2.0 fragment for one or more CRDs. */
export interface CrdSpec {
  readonly paths: Record<string, any>;
  readonly definitions: Record<string, any>;
}

/** Patch types the API server accepts for a custom resource. */
const CRD_PATCH_TYPES = [
  "application/json-patch+json",
  "application/merge-patch+json",
  "application/apply-patch+yaml",
];

const META = "io.k8s.apimachinery.pkg.apis.meta.v1";

/** A group, version and kind, as `x-kubernetes-group-version-kind` names it. */
interface Gvk {
  readonly group: string;
  readonly version: string;
  readonly kind: string;
}

const pascal = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** `snapshot.storage.k8s.io` → `SnapshotStorage`. */
export const groupPascal = (group: string): string =>
  group
    .replace(/\.k8s\.io$/, "")
    .split(/[.-]/)
    .map(pascal)
    .join("");

/** `snapshot.storage.k8s.io` → `io.k8s.storage.snapshot`. */
const definitionPrefix = (group: string): string => group.split(".").reverse().join(".");

/**
 * A built-in resource whose path items serve as the template for one
 * scope: its group-version path (`base`), and the names to swap out.
 */
interface Template {
  readonly base: string;
  readonly gv: string;
  readonly kind: string;
  readonly def: string;
  readonly plural: string;
  readonly namespaced: boolean;
}

const NAMESPACED: Template = {
  base: "/apis/batch/v1",
  gv: "BatchV1",
  kind: "Job",
  def: "io.k8s.api.batch.v1.Job",
  plural: "jobs",
  namespaced: true,
};
const CLUSTER: Template = {
  base: "/api/v1",
  gv: "CoreV1",
  kind: "PersistentVolume",
  def: "io.k8s.api.core.v1.PersistentVolume",
  plural: "persistentvolumes",
  namespaced: false,
};
/** The scale subresource, which the templates above do not have. */
const SCALE: Template = {
  base: "/apis/apps/v1",
  gv: "AppsV1",
  kind: "StatefulSet",
  def: "io.k8s.api.apps.v1.StatefulSet",
  plural: "statefulsets",
  namespaced: true,
};

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

/**
 * The error statuses each verb declares, the same as the built-in groups'
 * patches (patches/<group>/00{1,2,3}-add-missing-*-responses.patch.json):
 * 404 when it names an object, 409 when it writes one, 422 when it
 * validates one. List and deletecollection declare none.
 */
const ERRORS: Record<(typeof HTTP_METHODS)[number], { named: string[]; collection: string[] }> = {
  get: { named: ["404"], collection: [] },
  post: { named: [], collection: ["409", "422"] },
  put: { named: ["404", "409", "422"], collection: [] },
  patch: { named: ["404", "409", "422"], collection: [] },
  delete: { named: ["404", "409"], collection: [] },
};
const STATUS_TEXT: Record<string, string> = {
  "404": "Not Found",
  "409": "Conflict",
  "422": "Unprocessable Entity",
};

/** The collection path under a group-version: `[/namespaces/{namespace}]/<plural>`. */
const collection = (namespaced: boolean, plural: string) =>
  `${namespaced ? "/namespaces/{namespace}" : ""}/${plural}`;

/**
 * Copy a template path item for the custom resource: operation ids, schema
 * refs, descriptions and the group-version-kind name the CR instead.
 */
const fromTemplate = (
  base: Record<string, any>,
  t: Template,
  templatePath: string,
  target: { gv: string; kind: string; def: string; listDef: string; tag: string; gvk: Gvk },
): any => {
  const item = base.paths?.[templatePath];
  if (item === undefined) {
    throw new Error(`crds: the base spec has no template path ${templatePath}`);
  }
  const copy = structuredClone(item);
  const swapRefs = (node: any): void => {
    if (node === null || typeof node !== "object") return;
    if (typeof node.$ref === "string") {
      if (node.$ref === `#/definitions/${t.def}`) node.$ref = `#/definitions/${target.def}`;
      else if (node.$ref === `#/definitions/${t.def}List`) {
        node.$ref = `#/definitions/${target.listDef}`;
      }
    }
    for (const v of Object.values(node)) swapRefs(v);
  };
  const kindWord = new RegExp(`\\b${t.kind}\\b`, "g");
  for (const param of copy.parameters ?? []) {
    if (typeof param.description === "string") {
      param.description = param.description.replace(kindWord, target.kind);
    }
  }
  for (const method of HTTP_METHODS) {
    const op = copy[method];
    if (op === undefined) continue;
    // `{verb}{GV}{rest}`: the GV is the first match, the kind the first
    // match after it.
    const at = op.operationId.indexOf(t.gv);
    if (at < 0) throw new Error(`crds: ${op.operationId} does not name ${t.gv}`);
    const rest = op.operationId.slice(at + t.gv.length).replace(t.kind, target.kind);
    op.operationId = `${op.operationId.slice(0, at)}${target.gv}${rest}`;
    if (typeof op.description === "string") {
      op.description = op.description.replace(kindWord, target.kind);
    }
    op.tags = [target.tag];
    op["x-kubernetes-group-version-kind"] = target.gvk;
    if (method === "patch") op.consumes = [...CRD_PATCH_TYPES];
    const errors = ERRORS[method][templatePath.includes("{name}") ? "named" : "collection"];
    for (const status of errors) op.responses[status] = { description: STATUS_TEXT[status] };
    swapRefs(op);
  }
  return copy;
};

/** A property key as a definition name segment: `app.kubernetes.io/name` → `AppKubernetesIoName`. */
const segment = (key: string) =>
  key
    .split(/[^A-Za-z0-9]+/)
    .map(pascal)
    .join("");

/** Add `value` to `definitions` as `name`, which must be free. */
const define = (definitions: Record<string, any>, name: string, value: unknown) => {
  if (definitions[name] !== undefined) throw new Error(`crds: two schemas are named ${name}`);
  definitions[name] = value;
};

/**
 * `schema`, with each nested object schema (one with `properties`, also as
 * an array item) moved into `definitions` under `name` + its property path.
 */
const hoist = (schema: any, name: string, definitions: Record<string, any>): any => {
  if (schema?.type === "array" && schema.items !== undefined) {
    return { ...schema, items: hoist(schema.items, name, definitions) };
  }
  if (schema?.type !== "object" || schema.properties === undefined) return schema;
  const properties: Record<string, any> = {};
  for (const [key, value] of Object.entries<any>(schema.properties)) {
    properties[key] = hoist(value, `${name}${segment(key)}`, definitions);
  }
  define(definitions, name, { ...schema, properties });
  return { $ref: `#/definitions/${name}` };
};

/** The definition of a served version: its schema with typed metadata. */
const resourceDefinition = (
  schema: Record<string, any> | undefined,
  def: string,
  gvk: Gvk,
  definitions: Record<string, any>,
) => {
  const properties: Record<string, any> = {};
  for (const [key, value] of Object.entries<any>(schema?.properties ?? {})) {
    properties[key] =
      key === "metadata"
        ? { description: "Standard object's metadata.", $ref: `#/definitions/${META}.ObjectMeta` }
        : hoist(value, `${def}${segment(key)}`, definitions);
  }
  return {
    type: "object",
    ...schema,
    properties,
    "x-kubernetes-group-version-kind": [gvk],
  };
};

const listDefinition = (def: string, gvk: Gvk, kind: string) => ({
  description: `${kind} is a list of ${gvk.kind}`,
  type: "object",
  required: ["items"],
  properties: {
    apiVersion: { type: "string" },
    items: { type: "array", items: { $ref: `#/definitions/${def}` } },
    kind: { type: "string" },
    metadata: { $ref: `#/definitions/${META}.ListMeta` },
  },
  "x-kubernetes-group-version-kind": [{ ...gvk, kind }],
});

/**
 * The paths and definitions for every served version of `crds`, built from
 * the template path items in `base` (the core swagger.json).
 */
export const crdSpec = (base: Record<string, any>, crds: ReadonlyArray<Crd>): CrdSpec => {
  const paths: Record<string, any> = {};
  const definitions: Record<string, any> = {};
  for (const crd of crds) {
    const { group, scope, names } = crd.spec;
    const listKind = names.listKind ?? `${names.kind}List`;
    for (const version of crd.spec.versions) {
      if (!version.served) continue;
      const gvk = { group, kind: names.kind, version: version.name };
      const def = `${definitionPrefix(group)}.${version.name}.${names.kind}`;
      const listDef = `${definitionPrefix(group)}.${version.name}.${listKind}`;
      define(
        definitions,
        def,
        resourceDefinition(version.schema?.openAPIV3Schema, def, gvk, definitions),
      );
      define(definitions, listDef, listDefinition(def, gvk, listKind));

      const gp = groupPascal(group);
      const target = {
        gv: `${gp}${pascal(version.name)}`,
        kind: names.kind,
        def,
        listDef,
        tag: `${gp.charAt(0).toLowerCase()}${gp.slice(1)}_${version.name}`,
        gvk,
      };
      const t = scope === "Namespaced" ? NAMESPACED : CLUSTER;
      const here = `/apis/${group}/${version.name}`;
      const copy = (from: Template, suffix: string) =>
        (paths[`${here}${collection(t.namespaced, names.plural)}${suffix}`] = fromTemplate(
          base,
          from,
          `${from.base}${collection(from.namespaced, from.plural)}${suffix}`,
          target,
        ));
      // Where the custom resource handler differs from a built-in one:
      // deletecollection takes the list parameters (and no DeleteOptions
      // body), delete returns a Status, and read takes resourceVersion.
      const items = copy(t, "");
      items.delete.parameters = structuredClone(items.get.parameters);
      const resourceVersion = items.get.parameters.find(
        (p: any) =>
          (p.$ref ? base.parameters?.[p.$ref.split("/").pop()] : p)?.name === "resourceVersion",
      );
      const item = copy(t, "/{name}");
      for (const code of ["200", "202"]) {
        if (item.delete.responses[code]) {
          item.delete.responses[code].schema = { $ref: `#/definitions/${META}.Status` };
        }
      }
      const reads = [item];
      if (version.subresources?.status !== undefined) reads.push(copy(t, "/{name}/status"));
      if (resourceVersion !== undefined) {
        for (const read of reads)
          read.get.parameters = [...(read.get.parameters ?? []), resourceVersion];
      }
      if (version.subresources?.scale !== undefined) {
        if (!t.namespaced) {
          throw new Error(
            `crds: ${names.kind}: scale on a cluster-scoped resource is not supported`,
          );
        }
        copy(SCALE, "/{name}/scale");
      }
      if (t.namespaced) {
        paths[`${here}/${names.plural}`] = fromTemplate(base, t, `${t.base}/${t.plural}`, target);
      }
    }
  }
  return { paths, definitions };
};
