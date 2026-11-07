#!/usr/bin/env -S node --conditions=bun
/**
 * convert — turn Modal's proto3 gRPC API into Smithy 2.0 JSON models.
 *
 * Input:  specs/spec-mirror-modal/specs/{api,task_command_router}.proto
 *         (a 24h mirror of modal-labs/modal-client/modal_proto)
 * Output: .generated-specs/<group>.json  (one Smithy model per RPC-name
 *         prefix of each proto service — `AppCreate` → `app.json`)
 *
 * The proto→Smithy converter lives in `@distilled.cloud/dev/codegen/proto`.
 * Operations are unary gRPC methods, stamped as
 * `POST /<package>.<Service>/<Method>` with proto3 JSON field names.
 * Server-streaming RPCs are kept as operations that collect the stream
 * (`{ items }`); client- and bidi-streaming RPCs are skipped.
 *
 * Modal's control plane only speaks binary gRPC (it answers JSON with 415).
 * The model describes the proto3 JSON shape; `src/descriptors.ts` (written
 * here too) lets the protocol transcode it to protobuf on the wire.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { clearModels, writeModel } from "@distilled.cloud/dev/codegen/models";
import { finalizeConvert } from "@distilled.cloud/dev/codegen/patches";
import {
  convertProtoToSmithy,
  parseProto,
  protoDescriptors,
  rpcGroupName,
} from "@distilled.cloud/dev/codegen/proto";
import { resolveSpecPath } from "@distilled.cloud/dev/codegen/spec-path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, ".generated-specs");

const PROTO_FILES = ["api.proto", "task_command_router.proto"] as const;

/** Filenames that would emit invalid JS (`export * as function`). */
const SLUG_ALIAS: Record<string, string> = {
  function: "functions",
  map: "maps",
  class: "classes",
  client: "clients",
};

const toSlug = (group: string): string => {
  const raw = group
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
    .toLowerCase();
  return SLUG_ALIAS[raw] ?? raw;
};

const files = PROTO_FILES.map((name) => {
  const specPath = resolveSpecPath(ROOT, `specs/spec-mirror-modal/specs/${name}`);
  if (!fs.existsSync(specPath)) {
    throw new Error(
      `${specPath} not found — run \`pnpm specs:local modal\` (or \`pnpm run specs:fetch\` once the mirror exists)`,
    );
  }
  return parseProto(fs.readFileSync(specPath, "utf-8"), name);
});

clearModels(OUT_DIR);

let written = 0;
let totalOps = 0;
let totalStreaming = 0;

const convertService = (
  slug: string,
  serviceName: string,
  serviceTitle: string,
  serviceDocumentation: string,
  protoService: string,
  rpcNames?: Set<string>,
) => {
  const result = convertProtoToSmithy({
    files,
    namespace: `com.modal.${slug.replace(/_/g, ".")}`,
    serviceName,
    serviceTitle,
    serviceDocumentation,
    protoService,
    rpcNames,
    skipStreaming: true,
    collectServerStreams: true,
    skipDeprecated: true,
  });
  if (result.converted === 0) {
    totalStreaming += result.skippedStreaming;
    return;
  }
  writeModel(path.join(OUT_DIR, `${slug}.json`), result.model);
  written++;
  totalOps += result.converted;
  totalStreaming += result.skippedStreaming;
  console.log(
    `   ${slug}: ${result.converted} ops, ${result.skippedStreaming} streaming skipped, ${result.shapeCount} shapes`,
  );
};

for (const file of files) {
  for (const service of file.services) {
    // ModalClient is large; split by RPC-name prefix. Other services stay
    // one model so they cannot collide with ModalClient group filenames
    // (`Sandbox*` lives on both ModalClient and TaskCommandRouter).
    if (service.name === "ModalClient") {
      const groups = new Map<string, string[]>();
      for (const rpc of service.rpcs) {
        const group = rpcGroupName(rpc.name);
        if (!groups.has(group)) groups.set(group, []);
        groups.get(group)!.push(rpc.name);
      }
      for (const group of [...groups.keys()].sort()) {
        const slug = toSlug(group);
        convertService(
          slug,
          group,
          `Modal ${group}`,
          `${service.fullName} RPCs whose names start with \`${group}\`. ` +
            `Each operation is POST /${service.fullName}/<Method> with a proto3 JSON body.`,
          service.fullName,
          new Set(groups.get(group)!),
        );
      }
    } else {
      const slug = toSlug(service.name);
      convertService(
        slug,
        service.name,
        `Modal ${service.name}`,
        `${service.fullName}. Each operation is POST /${service.fullName}/<Method> with a proto3 JSON body.`,
        service.fullName,
      );
    }
  }
}

console.log(
  `✅ ${written} Smithy models (${totalOps} operations` +
    (totalStreaming ? `, ${totalStreaming} streaming skipped` : "") +
    `) → ${OUT_DIR}`,
);

/** A string literal the formatter leaves alone (single quotes unless escaping). */
const quoteForSource = (text: string): string =>
  /['\\\n]/.test(text) ? JSON.stringify(text) : `'${text}'`;

// Binary wire descriptors for the gRPC protocol (src/protocol.ts): Modal's
// API only speaks binary gRPC, so the proto3 JSON bodies the services build
// are transcoded with this table.
const descriptors = protoDescriptors(files, { collectServerStreams: true, skipDeprecated: true });
fs.writeFileSync(
  path.join(ROOT, "src", "descriptors.ts"),
  [
    "// AUTO-GENERATED by scripts/convert.ts from modal_proto. Do not edit.",
    'import type { ProtoDescriptors } from "@distilled.cloud/core/protobuf";',
    "",
    "/** Field numbers, kinds, enums and gRPC methods for the binary wire codec. */",
    "export const descriptors: ProtoDescriptors = /*@__PURE__*/ JSON.parse(",
    `  ${quoteForSource(JSON.stringify(descriptors))},`,
    ");",
    "",
  ].join("\n"),
);
console.log(
  `   descriptors: ${Object.keys(descriptors.messages).length} messages, ${Object.keys(descriptors.methods).length} methods`,
);

await finalizeConvert({ root: ROOT });
