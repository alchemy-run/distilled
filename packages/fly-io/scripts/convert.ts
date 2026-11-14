#!/usr/bin/env -S node --conditions=bun
/**
 * convert — turn Fly.io specs into Smithy JSON models.
 *
 *   machines  OpenAPI  specs/spec-mirror-fly-io/specs/openapi.json
 *             → .generated-specs/machines.json
 *             patches: patches/machines/*.patch.json (Smithy)
 *             operationNaming: verbNoun (not JSON-pointer patches)
 *
 *   sprites   OpenAPI  specs/spec-mirror-fly-io/specs/sprites.json
 *             (https://api.sprites.dev/openapi.json; names pinned in
 *             sprites-operation-ids.ts)
 *             → .generated-specs/sprites.json
 *             patches: patches/sprites/*.patch.json (Smithy)
 *
 *   mpg       OpenAPI  specs/spec-mirror-fly-io/specs/mpg.json (hand-written
 *             for flyctl's internal /api/v1/.../postgresv2 endpoints; edit it in
 *             stacks/distilled-submodules/spec-repos/fly-io/models/)
 *             → .generated-specs/mpg.json
 *             patches: patches/mpg/*.patch.json (Smithy)
 *
 * The GraphQL API (add-ons, remote builders, and the rest of
 * api.fly.io/graphql) is a Query SDK: scripts/convert-graphql.ts.
 *
 * Every patch is a Smithy op on upstream names, applied by the
 * finalizeConvert at the end. `scripts/generate.ts` only compiles
 * `.generated-specs`.
 */
import { ERROR_MATCHERS_TRAIT } from "@distilled.cloud/dev/codegen/openapi";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";
import { finalizeConvert } from "@distilled.cloud/dev/codegen/patches";
import { MACHINES_OPERATION_NAMES } from "./machines-operation-ids.ts";
import { SPRITES_OPERATION_NAMES, stripSpritesV1 } from "./sprites-operation-ids.ts";

// `convert --resource machines` (run directly) converts machines alone;
// generate imports this module with its own argv and converts everything.
const resourceIndex = process.argv.indexOf("--resource");
const machinesOnly = import.meta.main && resourceIndex !== -1;
if (machinesOnly && process.argv[resourceIndex + 1] !== "machines") {
  throw new Error("Only --resource machines is supported");
}

const root = `${import.meta.dirname}/..`;

const STATUS_TO_ERROR = {
  400: "BadRequest",
  403: "Forbidden",
  404: "NotFound",
  408: "GatewayTimeout",
  409: "Conflict",
  422: "UnprocessableEntity",
} as const;

const DEFAULT_ERROR_STATUSES = ["401", "429", "500", "502", "503", "504"];

// ---------------------------------------------------------------------------
// machines — patches/machines/ apply in the finalizeConvert below
// ---------------------------------------------------------------------------

await runOpenApiConvert({
  root,
  specs: [
    {
      name: "machines",
      specPath: "specs/spec-mirror-fly-io/specs/openapi.json",
    },
  ],
  patchesDir: false,
  finalize: false,
  options: {
    namespace: "com.flyio.machines",
    serviceName: "FlyMachines",
    statusToErrorClass: STATUS_TO_ERROR,
    defaultErrorStatuses: DEFAULT_ERROR_STATUSES,
    skipDeprecated: true,
    operationNaming: "verbNoun",
    operationNames: MACHINES_OPERATION_NAMES,
  },
});

if (machinesOnly) {
  await finalizeConvert({ root, include: (name) => name === "machines" });
  process.exit(0);
}

// ---------------------------------------------------------------------------
// sprites + mpg — per-spec OpenAPI under patches/{sprites,mpg}/
// ---------------------------------------------------------------------------

await runOpenApiConvert({
  root,
  specs: [
    {
      name: "sprites",
      specPath: "specs/spec-mirror-fly-io/specs/sprites.json",
      preprocess: stripSpritesV1,
      options: {
        operationNaming: "verbNoun",
        operationNames: SPRITES_OPERATION_NAMES,
        namespace: "com.flyio.sprites",
        serviceName: "FlySprites",
        successStatuses: ["200", "201", "204"],
        // 401 on mint is SpritesNotEnabled (message-matched), not the
        // catch-all Unauthorized that defaultErrorStatuses would swallow.
        defaultErrorStatuses: DEFAULT_ERROR_STATUSES.filter((s) => s !== "401"),
        statusToErrorClass: {
          ...STATUS_TO_ERROR,
          401: "SpritesNotEnabled",
        },
        errorShapes: {
          SpritesNotEnabled: {
            members: {
              code: { target: "smithy.api#Integer" },
              message: { target: "smithy.api#String" },
            },
            traits: {
              [ERROR_MATCHERS_TRAIT]: [
                {
                  status: 401,
                  message: { matches: "[Ss]prites not enabled" },
                },
              ],
            },
          },
        },
      },
    },
    {
      name: "mpg",
      specPath: "specs/spec-mirror-fly-io/specs/mpg.json",
      options: {
        namespace: "com.flyio.mpg",
        serviceName: "FlyMpg",
        successStatuses: ["200", "201", "204", "202"],
      },
    },
  ],
  patchesDir: "patches",
  finalize: false,
  options: {
    namespace: "com.flyio",
    serviceName: "Fly",
    statusToErrorClass: STATUS_TO_ERROR,
    defaultErrorStatuses: DEFAULT_ERROR_STATUSES,
    skipDeprecated: true,
  },
});

// Sprites fixes the converter cannot derive. They name final shapes, so they
// run in finalizeConvert's transform, after the deferred verbNoun rename.
const stampSprites = (model: { shapes: Record<string, any> }): string => {
  const notes: string[] = [];
  // Cursor pagination on listSprites (continuation_token). The OpenAPI
  // converter's auto-detect looks for next_token / NextToken, not Sprites'
  // next_continuation_token.
  const op = model.shapes["com.flyio.sprites#ListSprites"];
  if (op?.type === "operation") {
    op.traits = {
      ...op.traits,
      "smithy.api#paginated": {
        inputToken: "continuation_token",
        outputToken: "next_continuation_token",
        items: "sprites",
        pageSize: "max_results",
        mode: "cursor",
      },
    };
    notes.push("listSprites cursor pagination");
  } else {
    console.warn("   ⚠️  com.flyio.sprites#ListSprites not found — pagination not stamped");
  }

  // OpenAPI convert only flattens json / form / multipart bodies. Sprites
  // writeFile and exec stdin are `application/octet-stream`, so stamp a
  // Blob httpPayload member onto the generated input shapes.
  const stampBlobBody = (shapeId: string, required: boolean) => {
    const shape = model.shapes[shapeId];
    if (shape?.type !== "structure") {
      console.warn(`   ⚠️  ${shapeId} not found — blob payload not stamped`);
      return;
    }
    shape.members = shape.members ?? {};
    shape.members.body = {
      target: "smithy.api#Blob",
      traits: {
        "smithy.api#httpPayload": {},
        ...(required ? { "smithy.api#required": {} } : {}),
      },
    };
    notes.push(`${shapeId} blob httpPayload`);
  };
  stampBlobBody("com.flyio.sprites#ExecCommandRequest", false);
  stampBlobBody("com.flyio.sprites#WriteFileRequest", true);

  const stampOctetStream = (opId: string) => {
    const op = model.shapes[opId];
    const http = op?.traits?.["smithy.api#http"];
    if (http === undefined || typeof http !== "object") {
      console.warn(`   ⚠️  ${opId} http trait missing — bodyMediaType not stamped`);
      return;
    }
    http.bodyMediaType = "application/octet-stream";
    notes.push(`${opId} bodyMediaType application/octet-stream`);
  };
  stampOctetStream("com.flyio.sprites#ExecCommand");
  stampOctetStream("com.flyio.sprites#WriteFile");
  return `stamped ${notes.join(", ")}`;
};

await finalizeConvert({
  root,
  transform: (model, resource) => {
    if (resource === "sprites") return stampSprites(model);
  },
});
