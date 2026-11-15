#!/usr/bin/env -S node --conditions=bun
/**
 * convert — turn the npm registry's OpenAPI documents into Smithy 2.0 JSON
 * models.
 *
 * Input:  specs/spec-mirror-npm/specs/api/merge-config.yaml  (spec submodule)
 *         and every document it lists, plus the files they `$ref`
 * Output: .generated-specs/<area>.json  (one model per area document)
 *
 * npm splits its registry API description (npm/api-documentation, `api/`)
 * into `base.yaml` — info, servers, security schemes — and one paths-only
 * document per API area. `merge-config.yaml` lists them in the order npm's
 * own build merges them; the first input is the base. Each area document
 * becomes one service module: the base's `openapi`, `info`, `servers` and
 * security schemes are put around its paths and components, the way the
 * merge does, and every external `$ref` (`./api/shared-components.yaml#…`)
 * is inlined. Those refs are written relative to the merged document's
 * location (merge-config's `output`), so they are resolved from there.
 *
 * Header parameters are kept (`headerParams`): `npm-otp` carries the
 * one-time password that 2FA-protected writes need. The `Authorization`
 * header some operations restate is removed by patches, because the
 * protocol sends it from the credentials. `binaryTypes` reads the staged
 * tarball (`application/octet-stream`) as bytes.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";
import { resolveSpecPath } from "@distilled.cloud/dev/codegen/spec-path";
import { parse as parseYaml } from "yaml";

const root = path.resolve(import.meta.dirname, "..");

/** The mirror's `specs/` directory holds the upstream repository's paths. */
const SPEC_ROOT = "specs/spec-mirror-npm/specs";
const MERGE_CONFIG = "api/merge-config.yaml";

const repoRoot = resolveSpecPath(root, SPEC_ROOT);
const readYaml = (file: string): any => parseYaml(fs.readFileSync(file, "utf8"));

const config = readYaml(path.join(repoRoot, MERGE_CONFIG));
const configDir = path.dirname(path.join(repoRoot, MERGE_CONFIG));
const [baseInput, ...areaInputs]: { inputFile: string }[] = config.inputs;
if (baseInput === undefined || areaInputs.length === 0 || typeof config.output !== "string") {
  throw new Error(`${MERGE_CONFIG} lists no base and area documents, or no output`);
}
const base = readYaml(path.join(configDir, baseInput.inputFile));
const mergedDir = path.dirname(path.join(configDir, config.output));

/** A JSON pointer (`/components/responses/X`) into a document. */
const at = (doc: any, pointer: string): unknown =>
  pointer
    .split("/")
    .slice(1)
    .map((s) => s.replace(/~1/g, "/").replace(/~0/g, "~"))
    .reduce((node, key) => (node === undefined ? undefined : node[key]), doc);

/**
 * Replace every external `$ref` with the object it names. Local refs stay;
 * one inside an inlined object would point into the wrong document, so it
 * fails instead.
 */
const inlineExternalRefs = (node: unknown, refBase: string, external: boolean): unknown => {
  if (Array.isArray(node)) return node.map((item) => inlineExternalRefs(item, refBase, external));
  if (node === null || typeof node !== "object") return node;
  const { $ref, ...rest } = node as Record<string, unknown>;
  if (typeof $ref === "string") {
    if ($ref.startsWith("#")) {
      if (external) throw new Error(`local $ref ${$ref} inside an inlined external document`);
      return node;
    }
    const [file, pointer = ""] = $ref.split("#");
    const target = path.resolve(refBase, file!);
    const value = at(readYaml(target), pointer);
    if (value === undefined) throw new Error(`$ref ${$ref} does not resolve (${target})`);
    return { ...(inlineExternalRefs(value, path.dirname(target), true) as object), ...rest };
  }
  return Object.fromEntries(
    Object.entries(rest).map(([key, value]) => [key, inlineExternalRefs(value, refBase, external)]),
  );
};

/** `registry.npmjs.com/package-version-status.yaml` → `package_version_status`. */
const toSlug = (file: string): string =>
  path
    .basename(file, path.extname(file))
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();

const toPascal = (slug: string): string =>
  slug
    .split("_")
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");

await runOpenApiConvert({
  root,
  specs: areaInputs.map(({ inputFile }) => {
    const slug = toSlug(inputFile);
    return {
      name: slug,
      specPath: `${SPEC_ROOT}/${path.posix.join(path.posix.dirname(MERGE_CONFIG), inputFile)}`,
      preprocess: (area: any) =>
        inlineExternalRefs(
          {
            openapi: base.openapi,
            info: base.info,
            servers: base.servers,
            paths: area.paths,
            components: {
              ...area.components,
              securitySchemes: base.components?.securitySchemes,
            },
          },
          mergedDir,
          false,
        ),
      options: {
        namespace: `com.npmjs.registry.${slug}`,
        serviceName: toPascal(slug),
      },
    };
  }),
  parse: (text) => parseYaml(text),
  options: {
    namespace: "com.npmjs.registry",
    serviceName: "Npm",
    skipDeprecated: true,
    headerParams: true,
    binaryTypes: true,
    // Ids that collide with a schema name (`publish`, `stagePackageVersion`)
    // or only restate the route (`getsearch`).
    operationNames: {
      "PUT /{escapedPackageName}": "publishPackage",
      "POST /-/stage/package/{package-name}": "stagePackage",
      "GET /-/v1/search": "searchPackages",
    },
  },
});
