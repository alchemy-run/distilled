#!/usr/bin/env -S node --conditions=bun
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";

/**
 * The docs' Alpha badge on an operation (`x-badges: [{ name: "Alpha" }]`).
 * A badged operation is marked `smithy.api#unstable`, so generate writes it
 * to `unstable/tailscale` and the rest to the stable module.
 */
const isAlpha = (op: Record<string, any>): boolean =>
  Array.isArray(op["x-badges"]) && op["x-badges"].some((badge: any) => badge?.name === "Alpha");

await runOpenApiConvert({
  root: path.resolve(import.meta.dirname, ".."),
  specs: [
    {
      name: "tailscale",
      specPath: "specs/spec-mirror-tailscale/specs/openapi.json",
    },
  ],
  patchesDir: "patches",
  options: {
    namespace: "com.tailscale.api",
    serviceName: "Tailscale",
    skipDeprecated: true,
    headerParams: true,
    unstableOperation: isAlpha,
    statusToErrorClass: {
      "400": "BadRequest",
      "403": "Forbidden",
      "404": "NotFound",
      "409": "Conflict",
      "412": "PreconditionFailed",
      "422": "UnprocessableEntity",
    },
  },
});
