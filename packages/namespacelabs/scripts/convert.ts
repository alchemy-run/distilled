#!/usr/bin/env -S node --conditions=bun
/**
 * convert — turn Namespace's proto3 API (`buf.build/namespace/cloud`) into
 * Smithy 2.0 JSON models, one per proto service. Each unary RPC becomes
 * `POST /<package>.<Service>/<Method>` with a proto3 JSON body; streaming
 * RPCs are skipped.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { clearModels, writeModel } from "@distilled.cloud/dev/codegen/models";
import { finalizeConvert } from "@distilled.cloud/dev/codegen/patches";
import {
  convertProtoToSmithy,
  parseProto,
  type ProtoErrorSpec,
  type ProtoFile,
} from "@distilled.cloud/dev/codegen/proto";
import { resolveSpecPath } from "@distilled.cloud/dev/codegen/spec-path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, ".generated-specs");
const SPEC_DIR = "specs/spec-mirror-namespacelabs/specs/proto/namespace";

/** Slugs the package/service rule spells out too literally. */
const SLUG_ALIAS: Record<string, string> = {
  network_egress_policy: "egress",
  registry_container_registry: "registry",
  storage_artifacts: "artifacts",
  testing_test_results: "testing",
  private_sessions_user_sessions: "private_user_sessions",
};

/** Services in the module that no `namespaceapis.com` host serves (every host answers 404). */
const UNSERVED_SERVICES = new Set([
  "namespace.cloud.compute.v1beta.ManagementService",
  "namespace.experimental.remote.ExecutionService",
  "namespace.private.devbox.extra.v1beta.DevBoxExtraService",
  "namespace.private.devbox.wire.v1beta.AgentService",
  "namespace.private.instance.v1beta.InstanceService",
]);

/** Connect error codes, as the HTTP status Connect maps them to plus the body `code`. */
const CONNECT_ERRORS: ReadonlyArray<ProtoErrorSpec> = [
  { name: "InvalidArgument", status: 400, code: "invalid_argument" },
  { name: "FailedPrecondition", status: 400, code: "failed_precondition" },
  { name: "OutOfRange", status: 400, code: "out_of_range" },
  { name: "Unauthenticated", status: 401 },
  { name: "PermissionDenied", status: 403 },
  { name: "NotFound", status: 404 },
  { name: "AlreadyExists", status: 409, code: "already_exists" },
  { name: "Aborted", status: 409, code: "aborted" },
  { name: "ResourceExhausted", status: 429 },
  { name: "Canceled", status: 499 },
  { name: "Unimplemented", status: 501 },
];

const snake = (name: string): string =>
  name
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
    .toLowerCase();

/**
 * `namespace.cloud.compute.v1beta` + `CommandService` → `compute_command`;
 * `namespace.private.devbox.v1beta` + `DevBoxService` → `private_devbox`.
 * The `cloud` tier and the version segment are dropped, and a service named
 * after its package collapses onto the package.
 */
const slugFor = (protoPackage: string, serviceName: string): string => {
  const [, tier, ...rest] = protoPackage.split(".");
  const area = rest
    .filter((segment) => !/^v\d/.test(segment) && segment !== "integrations")
    .join("_");
  const words = snake(serviceName.replace(/Service$/, "")).split("_");
  const compactArea = area.replace(/_/g, "");
  let prefix = "";
  let taken = 0;
  while (taken < words.length && prefix.length < compactArea.length) {
    prefix += words[taken];
    taken++;
  }
  const suffix = (prefix === compactArea ? words.slice(taken) : words).join("_");
  const raw = [tier === "cloud" ? undefined : tier, area, suffix || undefined]
    .filter((part): part is string => part !== undefined && part !== "")
    .join("_");
  return SLUG_ALIAS[raw] ?? raw;
};

const walk = (dir: string): string[] =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const full = path.join(dir, entry.name);
      return entry.isDirectory() ? walk(full) : full.endsWith(".proto") ? [full] : [];
    })
    .sort();

/**
 * A list RPC pages when its request and response both carry a cursor and the
 * response has exactly one list member. Page sizes are only usable as such
 * when they are 32-bit (64-bit integers are strings on the wire).
 */
const stampPagination = (shapes: Record<string, any>): number => {
  let stamped = 0;
  for (const op of Object.values(shapes)) {
    if (op.type !== "operation") continue;
    const input = shapes[op.input.target]?.members ?? {};
    const output = shapes[op.output.target]?.members ?? {};
    const inputToken = Object.keys(input).find((name) => /cursor/i.test(name));
    const outputToken = Object.keys(output).find((name) => /cursor/i.test(name));
    const items = Object.entries(output)
      .filter(([, member]: [string, any]) => shapes[member.target]?.type === "list")
      .map(([name]) => name);
    if (!inputToken || !outputToken || items.length !== 1) continue;
    const pageSize = Object.entries(input).find(
      ([name, member]: [string, any]) =>
        /^(maxEntries|limit|pageSize)$/.test(name) && member.target === "smithy.api#Integer",
    )?.[0];
    op.traits["smithy.api#paginated"] = {
      mode: "cursor",
      inputToken,
      outputToken,
      items: items[0],
      ...(pageSize ? { pageSize } : {}),
    };
    stamped++;
  }
  return stamped;
};

const specDir = resolveSpecPath(ROOT, SPEC_DIR);
if (!fs.existsSync(specDir)) {
  throw new Error(
    `${specDir} not found — run \`pnpm specs:local namespacelabs\` (or \`pnpm run specs:fetch\` once the mirror exists)`,
  );
}

const files: ProtoFile[] = walk(specDir).map((file) =>
  parseProto(fs.readFileSync(file, "utf-8"), path.relative(specDir, file)),
);

clearModels(OUT_DIR);

let written = 0;
let totalOps = 0;
let totalStreaming = 0;
let totalPaginated = 0;
const slugs = new Map<string, string>();

for (const file of files) {
  for (const service of file.services) {
    if (UNSERVED_SERVICES.has(service.fullName)) {
      console.log(`   ${service.fullName}: not served on any host, skipped`);
      continue;
    }
    const slug = slugFor(file.package, service.name);
    const taken = slugs.get(slug);
    if (taken !== undefined) {
      throw new Error(`${service.fullName} and ${taken} both map to the model slug "${slug}"`);
    }
    slugs.set(slug, service.fullName);

    const result = convertProtoToSmithy({
      files,
      namespace: `so.namespace.${slug.replace(/_/g, ".")}`,
      serviceName: service.name,
      serviceTitle: `Namespace ${service.name}`,
      serviceDocumentation:
        (service.documentation ? `${service.documentation}\n\n` : "") +
        `${service.fullName}. Each operation is POST /${service.fullName}/<Method> with a proto3 JSON body.`,
      protoService: service.fullName,
      skipStreaming: true,
      skipDeprecated: true,
      errors: CONNECT_ERRORS,
    });
    totalStreaming += result.skippedStreaming;
    if (result.converted === 0) {
      console.log(`   ${slug}: only streaming RPCs, skipped`);
      continue;
    }
    const paginated = stampPagination(result.model.shapes);
    totalPaginated += paginated;
    writeModel(path.join(OUT_DIR, `${slug}.json`), result.model);
    written++;
    totalOps += result.converted;
    console.log(
      `   ${slug}: ${result.converted} ops (${paginated} paginated), ${result.skippedStreaming} streaming skipped, ${result.shapeCount} shapes`,
    );
  }
}

console.log(
  `✅ ${written} Smithy models (${totalOps} operations, ${totalPaginated} paginated` +
    (totalStreaming ? `, ${totalStreaming} streaming skipped` : "") +
    `) → ${OUT_DIR}`,
);

await finalizeConvert({ root: ROOT });
