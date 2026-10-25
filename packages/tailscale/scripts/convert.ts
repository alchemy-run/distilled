#!/usr/bin/env -S node --conditions=bun
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";

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
