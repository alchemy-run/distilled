#!/usr/bin/env -S node --conditions=bun
/**
 * convert — original AWS Smithy models + patches/{sdkId}.json →
 * `.generated-specs/<sdkId>.json`, plus the endpoint rules engine's
 * partition data → `packages/s3/src/rules-engine/partitions.json`.
 *
 * generate.ts compiles those models and does not read the spec-mirror.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { writeModel } from "@distilled.cloud/dev/codegen/models";
import { convertOpenApiToSmithy } from "@distilled.cloud/dev/codegen/openapi";
import { finalizeConvert } from "@distilled.cloud/dev/codegen/patches";
import { resolveSpecPath } from "@distilled.cloud/dev/codegen/spec-path";
import { applyTelemetryTraits } from "@distilled.cloud/dev/codegen/telemetry";
import { AWS_EVENT_TRAIT } from "./events-spec.ts";
import { loadServiceSpecPatch } from "./spec-schema.ts";
import { applyAwsSpecPatches, dropForeignNamespaceShapes } from "./spec.ts";
import { awsTelemetry } from "./telemetry.ts";

const root = path.resolve(import.meta.dirname, "..");
const specsRoot = resolveSpecPath(root, "specs/spec-mirror-aws/specs");
const modelsRoot = path.join(specsRoot, "models");
const outDir = path.join(root, ".generated-specs");

// rpcv2Cbor-only services; the runtime has no CBOR protocol yet.
const UNSUPPORTED_SERVICES = new Set([
  "cloudwatchomni",
  "eventbridgev2",
  "partnercentral-revenue-measurement",
]);

const moduleName = (sdkId: string) => sdkId.toLowerCase().replaceAll(" ", "-");

const sdkIdOf = (model: { shapes?: Record<string, any> }): string => {
  const shape = Object.values(model.shapes ?? {}).find((s: any) => s?.type === "service") as
    | { traits?: { "aws.api#service"?: { sdkId?: string } } }
    | undefined;
  const sdkId = shape?.traits?.["aws.api#service"]?.sdkId;
  if (!sdkId) throw new Error("service sdkId not found");
  return sdkId;
};

if (!fs.existsSync(modelsRoot)) {
  throw new Error(
    `${modelsRoot} not found — run \`pnpm --filter @distilled.cloud/aws run specs:fetch\``,
  );
}

// Region → partition data the endpoint resolver (in @distilled.cloud/s3)
// reads at runtime. Not generated code, but it comes from the same mirror as
// the models.
{
  const partitions = path.join(specsRoot, "partitions.json");
  const dest = path.join(root, "..", "s3", "src", "rules-engine");
  fs.mkdirSync(dest, { recursive: true });
  fs.copyFileSync(partitions, path.join(dest, "partitions.json"));
  console.log("✅ partitions.json");
}

const services = fs.readdirSync(modelsRoot).sort();
let written = 0;
let patched = 0;
for (const service of services) {
  if (UNSUPPORTED_SERVICES.has(service)) continue;
  const base = path.join(modelsRoot, service, "service");
  if (!fs.existsSync(base)) continue;
  const versions = fs.readdirSync(base);
  const version = versions[0];
  if (version === undefined) continue;
  const files = fs.readdirSync(path.join(base, version)).filter((f) => f.endsWith(".json"));
  const file = files[0];
  if (file === undefined) continue;

  const model = JSON.parse(fs.readFileSync(path.join(base, version, file), "utf8"));
  const dropped = dropForeignNamespaceShapes(model);
  const sdkId = sdkIdOf(model);
  const patchFileBase = moduleName(sdkId);
  const spec = loadServiceSpecPatch(sdkId, root);
  applyAwsSpecPatches(model, spec, patchFileBase);
  applyTelemetryTraits(model, patchFileBase, awsTelemetry(sdkId));
  const hasPatch = fs.existsSync(path.join(root, "patches", `${patchFileBase}.json`));
  if (hasPatch) patched++;

  const outName = `${patchFileBase}.json`;
  writeModel(path.join(outDir, outName), model);
  written++;
  if (dropped > 0) {
    console.log(`   ${outName}: dropped ${dropped} foreign-namespace shape(s)`);
  }
}

console.log(`✅ ${written} AWS Smithy models (${patched} with patches/) → ${outDir}`);

// ---- Event schemas ----------------------------------------------------------
// The Smithy models describe API calls only. What a service SENDS (an SES
// bounce, an EC2 state change) is described by the EventBridge schema
// registry's AWS-managed `aws.events` registry, which the mirror keeps under
// `event-schemas/aws.events/<source>@<DetailType>.json`: one OpenAPI 3
// document per event, with an `AWSEvent` envelope and its `detail`.
//
// Each source becomes one types-only model, `<service>-events`. The events
// convert as synthetic POST operations, like GitHub's webhooks: the request
// body IS the event, so the converter's schema handling applies unchanged.
// The operations are then dropped, `<DetailType>Request` is renamed
// `<DetailType>Event`, and each event is tagged with its source and
// detail-type for generate.ts. Patches in `patches/<service>-events/` fill in
// what the registry leaves out (SES publishes every email event's `detail`
// as a bare `{ "type": "object" }`).
const eventsRoot = path.join(specsRoot, "event-schemas", "aws.events");
if (!fs.existsSync(eventsRoot)) {
  throw new Error(
    `${eventsRoot} not found — the mirror predates event schemas; run \`pnpm --filter @distilled.cloud/aws run specs:update\``,
  );
}

const bySource = new Map<string, string[]>();
for (const file of fs.readdirSync(eventsRoot).sort()) {
  const at = file.indexOf("@");
  if (at === -1 || !file.endsWith(".json")) continue;
  const source = file.slice(0, at);
  bySource.set(source, [...(bySource.get(source) ?? []), file]);
}

const eventModels: string[] = [];
for (const [source, files] of bySource) {
  const service = source.replace(/^aws\./, "");
  const resource = `${service}-events`;
  const ns = `com.amazonaws.${service}.events`;
  const schemas: Record<string, unknown> = {};
  const paths: Record<string, unknown> = {};
  const meta = new Map<string, { source: string; detailType: string }>();
  for (const file of files) {
    const doc = JSON.parse(fs.readFileSync(path.join(eventsRoot, file), "utf8"));
    const name = file.slice(source.length + 1, -".json".length);
    const envelope = `${name}Event`;
    // Every document names its envelope `AWSEvent`; give each its own name
    // so they can share one components table.
    const own = JSON.parse(
      JSON.stringify(doc.components.schemas).replaceAll(
        '"#/components/schemas/AWSEvent"',
        `"#/components/schemas/${envelope}"`,
      ),
    );
    own[envelope] = own.AWSEvent;
    delete own.AWSEvent;
    Object.assign(schemas, own);
    paths[`/events/${name}`] = {
      post: {
        operationId: name,
        requestBody: {
          content: { "application/json": { schema: { $ref: `#/components/schemas/${envelope}` } } },
        },
        responses: { "200": { description: "Delivered" } },
      },
    };
    meta.set(name, {
      source: own[envelope]["x-amazon-events-source"],
      detailType: own[envelope]["x-amazon-events-detail-type"],
    });
  }

  const model = convertOpenApiToSmithy(
    {
      openapi: "3.0.0",
      info: { title: `${source} events`, version: "1.0.0" },
      paths,
      components: { schemas },
    },
    { namespace: ns, serviceName: `${service}Events`, skipDeprecated: false },
  );

  // `<DetailType>Request` and its nested shapes → `<DetailType>Event…`.
  let json = JSON.stringify(model);
  for (const name of meta.keys()) {
    json = json.replace(new RegExp(`#${name}Request(?=["A-Z])`, "g"), `#${name}Event`);
  }
  const renamed = JSON.parse(json);
  const shapes: Record<string, any> = {};
  for (const [id, shape] of Object.entries<any>(renamed.shapes)) {
    if (shape.type === "operation" || shape.type === "service") continue;
    // The module is types only, so a member's TS key has to be the key on
    // the wire: `detail-type`, not the converter's `detail_type`.
    if (shape.type === "structure" && shape.members) {
      shape.members = Object.fromEntries(
        Object.entries<any>(shape.members).map(([member, def]) => {
          const { "smithy.api#jsonName": wire, ...traits } = def.traits ?? {};
          return [wire ?? member, { ...def, traits }];
        }),
      );
    }
    shapes[id] = shape;
  }
  for (const [name, event] of meta) {
    const id = `${ns}#${name}Event`;
    const { "smithy.api#input": _, ...traits } = shapes[id].traits ?? {};
    shapes[id].traits = { ...traits, [AWS_EVENT_TRAIT]: event };
  }
  writeModel(path.join(outDir, `${resource}.json`), { ...renamed, shapes });
  eventModels.push(resource);
}
console.log(`✅ ${eventModels.length} event models (${eventModels.join(", ")}) → ${outDir}`);

// Patches for the event models are RFC-6902 ops on the converted model, in
// `patches/<service>-events/`; the service models keep their own format.
await finalizeConvert({
  root,
  include: (resource) => eventModels.includes(resource),
  operationNaming: "as-is",
  telemetry: false,
});
