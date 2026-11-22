#!/usr/bin/env -S node --conditions=bun
/**
 * convert — turn Meta's WhatsApp Business Platform OpenAPI spec into a
 * Smithy 2.0 JSON model.
 *
 * Input:  specs/spec-mirror-whatsapp/specs/openapi.yaml  (spec submodule — the
 *         newest `business-messaging-api_v<version>.yaml` from
 *         https://github.com/facebook/openapi, parsed with the `yaml` package)
 *         patches/*.json  (RFC-6902 patches to the converted Smithy model,
 *                          under the upstream shape ids: `pnpm patches:names whatsapp`)
 * Output: .generated-specs/whatsapp.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/dev/codegen/openapi`; this script is WhatsApp's pipeline
 * config. `scripts/generate.ts` compiles the model into src/services.
 *
 * PROTOCOL PARAMETERS. Every operation declares the same header parameters —
 * `Authorization` (the bearer token), `User-Agent`, and on most writes a
 * required `Content-Type` — and every Graph API route starts with a
 * `/{Version}` segment (`/v23.0/{Phone-Number-ID}/messages`).
 * WhatsAppProtocol sends the token, picks the content type from the body,
 * and puts the Graph API version from the credentials in front of every
 * path (`src/credentials.ts`, like Gusto's `X-Gusto-API-Version` pin), so
 * {@link dropProtocolParameters} removes them before conversion rather than
 * making each one a per-call input.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";
import { parse as parseYaml } from "yaml";

const SPEC_PATH = "specs/spec-mirror-whatsapp/specs/openapi.yaml";

const METHODS = ["get", "put", "post", "patch", "delete"] as const;

/** Headers WhatsAppProtocol sets on every request. */
const PROTOCOL_HEADERS = new Set(["authorization", "user-agent", "content-type", "accept"]);

/** The path parameter every Graph API route starts with. */
const VERSION_SEGMENT = "/{Version}";

const resolveParam = (spec: any, p: any): any =>
  typeof p?.$ref === "string" && p.$ref.startsWith("#/components/parameters/")
    ? spec.components?.parameters?.[p.$ref.slice("#/components/parameters/".length)]
    : p;

const dropProtocolParameters = (spec: any): void => {
  const isProtocolParam = (p: any): boolean => {
    const param = resolveParam(spec, p);
    if (param?.in === "header") return PROTOCOL_HEADERS.has(String(param.name).toLowerCase());
    return param?.in === "path" && param.name === "Version";
  };
  const filterList = (params: unknown): unknown =>
    Array.isArray(params) ? params.filter((p) => !isProtocolParam(p)) : params;

  const paths: Record<string, any> = {};
  for (const [route, item] of Object.entries<any>(spec.paths ?? {})) {
    const stripped = route.startsWith(`${VERSION_SEGMENT}/`)
      ? route.slice(VERSION_SEGMENT.length)
      : route;
    if (stripped.includes("{Version}")) {
      throw new Error(`${route}: {Version} outside the leading segment`);
    }
    if (paths[stripped] !== undefined) {
      throw new Error(`${route}: collides with another route once ${VERSION_SEGMENT} is removed`);
    }
    if (Array.isArray(item.parameters)) item.parameters = filterList(item.parameters);
    for (const method of METHODS) {
      const op = item[method];
      if (op && Array.isArray(op.parameters)) op.parameters = filterList(op.parameters);
    }
    paths[stripped] = item;
  }
  spec.paths = paths;
};

await runOpenApiConvert({
  root: path.resolve(import.meta.dirname, ".."),
  specs: [
    {
      name: "whatsapp",
      specPath: SPEC_PATH,
      preprocess: dropProtocolParameters,
    },
  ],
  // Smithy-model patches (flat patches/*.json), applied after conversion.
  // generate.ts compiles the patched model and applies none itself.
  patchesDir: "patches",
  parse: (text) => parseYaml(text),
  options: {
    namespace: "com.meta.whatsapp",
    serviceName: "WhatsApp",
    skipDeprecated: true,
    // Ids that do not read as verbNoun, or that name one example of what
    // the operation does (`createAuthenticationTemplateWOtpCopyCodeButton`
    // creates every kind of template).
    operationNames: {
      blockUserS: "blockUsers",
      unblockUserS: "unblockUsers",
      uploadImage: "uploadMedia",
      GraphWhatsAppBusinessAccountToNumberCurrentStatusOfficialBusinessAccountPost:
        "updateOfficialBusinessAccountStatus",
      getPhoneNumberById: "getPhoneNumber",
      updatePhoneNumberStatus: "updatePhoneNumber",
      deleteGroup: "deleteGroup",
      retrieveMediaUrl: "getMedia",
      deleteMedia: "deleteMedia",
      deletePreVerifiedPhoneNumber: "deletePreVerifiedPhoneNumber",
      getFlow: "getFlow",
      deleteFlow: "deleteFlow",
      listAssetsGetFlowJsonUrl: "listFlowAssets",
      getOBOMobilityIntent: "getOBOMobilityIntent",
      getAllSubscriptionsForAWaba: "listSubscribedApps",
      getTemplateByIdDefaultFields: "getMessageTemplate",
      editTemplate: "updateMessageTemplate",
      getTemplateByNameDefaultFields: "listMessageTemplates",
      createAuthenticationTemplateWOtpCopyCodeButton: "createMessageTemplate",
      deleteTemplateByName: "deleteMessageTemplate",
    },
  },
});
