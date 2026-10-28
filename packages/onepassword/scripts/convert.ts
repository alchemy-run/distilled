#!/usr/bin/env -S node --conditions=bun
/**
 * convert — turn 1Password's OpenAPI specs into Smithy 2.0 JSON models, one
 * per API:
 *
 *   connect      specs/spec-mirror-onepassword/specs/openapi.json
 *                → .generated-specs/connect.json
 *   events       specs/spec-mirror-onepassword/specs/events.json
 *                → .generated-specs/events.json
 *   users        specs/spec-mirror-onepassword/specs/users.json
 *                → .generated-specs/users.json
 *   oauth        specs/spec-mirror-onepassword/specs/oauth.json
 *                → .generated-specs/oauth.json
 *   partnership  specs/spec-mirror-onepassword/specs/partnership.json
 *                → .generated-specs/partnership.json
 *
 * Patches: patches/<name>/*.patch.json (Smithy ops on upstream names),
 * applied by finalizeConvert. The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/dev/codegen/openapi`; `scripts/generate.ts` compiles
 * the models into src/services.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";

await runOpenApiConvert({
  root: path.resolve(import.meta.dirname, ".."),
  specs: [
    {
      name: "connect",
      specPath: "specs/spec-mirror-onepassword/specs/openapi.json",
      options: {
        namespace: "com.onepassword.connect",
        serviceName: "OnepasswordConnect",
      },
    },
    {
      name: "events",
      specPath: "specs/spec-mirror-onepassword/specs/events.json",
      options: {
        namespace: "com.onepassword.events",
        serviceName: "OnepasswordEvents",
      },
    },
    {
      name: "users",
      specPath: "specs/spec-mirror-onepassword/specs/users.json",
      options: {
        namespace: "com.onepassword.users",
        serviceName: "OnepasswordUsers",
      },
    },
    {
      name: "oauth",
      specPath: "specs/spec-mirror-onepassword/specs/oauth.json",
      options: {
        namespace: "com.onepassword.oauth",
        serviceName: "OnepasswordOAuth",
      },
    },
    {
      name: "partnership",
      specPath: "specs/spec-mirror-onepassword/specs/partnership.json",
      options: {
        namespace: "com.onepassword.partnership",
        serviceName: "OnepasswordPartnership",
        // getAccount answers 410 when the account has been removed.
        statusToErrorClass: {
          400: "BadRequest",
          403: "Forbidden",
          404: "NotFound",
          409: "Conflict",
          410: "Gone",
          422: "UnprocessableEntity",
        },
        operationNames: {
          getAccountByPartnerAccountUID: "getAccount",
          updateAccountByID: "updateAccount",
        },
      },
    },
  ],
  patchesDir: "patches",
  options: {
    namespace: "com.onepassword",
    serviceName: "Onepassword",
    skipDeprecated: true,
  },
});
