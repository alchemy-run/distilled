#!/usr/bin/env -S node --conditions=bun
import { readFileSync } from "node:fs";
import { runGeneratorCli } from "@distilled.cloud/dev/codegen/cli";
import { lintAndFormatGenerated } from "@distilled.cloud/dev/codegen/format";
/**
 * generate — turn the AWS Smithy models into an Effect SDK.
 *
 * Input:  .generated-specs/<sdkId>.json  (original Smithy + patches/<sdkId>/,
 *         written by scripts/convert.ts)
 *         manual-specs/<service>.json  (hand-authored models for APIs AWS
 *         never published a Smithy model for — see manual-specs/README.md)
 * Output: src/services/<sdkId>.ts  +  services/index.ts
 *
 * This runs the SHARED generator CLI (`@distilled.cloud/dev/codegen/cli`).
 * convert.ts turns the spec-mirror Smithy + patches/ into `.generated-specs`
 * and copies partition data; generate only compiles those models (430
 * services — one bad one shouldn't hide the other 429; the run still fails
 * at the end).
 *
 * The AWS provider spec — shape/error/operation emission, service consts —
 * lives in `./spec.ts`. Patches (`patches/<sdkId>/`) apply in convert.
 *
 * Flags: `--resource <sdkId>` generates a single service (e.g. `s3`).
 */
import { Schema as S } from "effect";
import { eventsResourceName, eventsSpec, isEventsModel } from "./events-spec.ts";
import { SmithyModel, type ServiceShape } from "./model-schema.ts";
import { awsSpec, moduleName } from "./spec.ts";

// Model and patch values reach the generated code only through `lit()`,
// `num()` and identifier checks (spec.ts) or JSON.stringify. A hand-quoted
// interpolation such as `"${name}"` lets a quote in a model end the string
// literal, so refuse to generate while an emitter has one.
const RAW_INTERPOLATION = /["']\$\{|\$\{[^{}]*\}["']/;
const rawInterpolations = ["spec.ts", "compile-rules.ts", "events-spec.ts"].flatMap((file) =>
  readFileSync(`${import.meta.dirname}/${file}`, "utf8")
    .split("\n")
    .flatMap((line, i) =>
      RAW_INTERPOLATION.test(line) ? [`  ${file}:${i + 1}: ${line.trim()}`] : [],
    ),
);
if (rawInterpolations.length > 0) {
  throw new Error(
    `quoted interpolation in an AWS emitter; emit model strings with lit() or JSON.stringify:\n${rawInterpolations.join("\n")}`,
  );
}

/** The service shape and its sdkId — every AWS model has exactly one. */
const serviceOf = (model: any): ServiceShape => {
  const shape = Object.values(model.shapes ?? {}).find((s: any) => s?.type === "service") as
    | ServiceShape
    | undefined;
  if (!shape) throw new Error("service shape not found");
  return shape;
};

const sdkIdOf = (model: any): string => serviceOf(model).traits["aws.api#service"].sdkId;

runGeneratorCli({
  description: "Generate the AWS Effect SDK from patched Smithy models",
  convert: () => import("./convert.ts"),
  root: `${import.meta.dirname}/..`,
  smithyDir: ".generated-specs",
  manualSpecsDir: "manual-specs",
  patchesDir: false,

  // Modules are named after the service's PUBLIC sdkId, not the directory
  // Amazon files it under: `amazon-s3` → `s3.ts`, so callers write
  // `AWS.S3.getObject`.
  // Event models (scripts/events-spec.ts) have no service shape.
  resourceName: ({ model }) =>
    isEventsModel(model) ? eventsResourceName(model) : moduleName(sdkIdOf(model)),

  // `s3` → `S3`, `api-gateway` → `ApiGateway`.
  barrelExportName: (resource) =>
    resource
      .replace(/^amazon-/, "")
      .replace(/^aws-/, "")
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(""),

  // S3 ships on its own as @distilled.cloud/s3, the package the rest of the
  // AWS runtime builds on; src/services/s3.ts re-exports it.
  relocate: (resource) =>
    resource === "s3" ? { dir: "../s3/src/services", reexport: "@distilled.cloud/s3" } : undefined,

  // One malformed model shouldn't stop the other 429 from regenerating —
  // but the run reports them together and exits non-zero.
  continueOnModelError: true,

  // AWS lint-fixes its generated output before formatting.
  finalize: lintAndFormatGenerated,

  spec: (model) => {
    if (isEventsModel(model)) return eventsSpec(model);
    // Validate against the Smithy model schema before compiling. Throws,
    // which `continueOnModelError` records as this service's failure.
    S.decodeUnknownSync(SmithyModel)(model);
    return awsSpec(model);
  },
});
