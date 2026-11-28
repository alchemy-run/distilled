#!/usr/bin/env -S node --conditions=bun
/**
 * convert — turn the UniFi OpenAPI specs into Smithy 2.0 JSON models.
 *
 * Input:  specs/spec-mirror-unifi/specs/<api>.json  (spec submodule)
 *         patches/<model>/*.json  (RFC-6902 patches to the converted Smithy model)
 * Output: .generated-specs/<model>.json, one per API:
 *         network, protect, innerspace, mobility, site_manager, carrier_fabric
 *
 * The OpenAPI→Smithy converter lives in `@distilled.cloud/dev/codegen/openapi`;
 * this script is UniFi's pipeline config. `scripts/generate.ts` compiles the
 * models into src/services.
 */
import * as path from "node:path";
import type { OpenApiConvertOptions } from "@distilled.cloud/dev/codegen/openapi";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";

/**
 * Protect declares no `operationId`s, so the converter derives names from the
 * route. These are the routes whose derived name reads wrong: a plural noun on
 * a single-resource route (`GetCameras`), or an action the route nests under
 * its resource (`CreateSirenPlay`). Keyed `"METHOD path"`.
 */
const PROTECT_NAMES: Readonly<Record<string, string>> = {
  "GET /v1/cameras/{id}": "getCamera",
  "PATCH /v1/cameras/{id}": "updateCamera",
  "GET /v1/cameras/{id}/rtsps-stream": "getCameraRtspsStream",
  "POST /v1/cameras/{id}/rtsps-stream": "createCameraRtspsStream",
  "DELETE /v1/cameras/{id}/rtsps-stream": "deleteCameraRtspsStream",
  "GET /v1/cameras/{id}/snapshot": "getCameraSnapshot",
  "POST /v1/cameras/{id}/disable-mic-permanently": "disableCameraMicPermanently",
  "POST /v1/cameras/{id}/talkback-session": "createCameraTalkbackSession",
  "POST /v1/cameras/{id}/ptz/patrol/start/{slot}": "startCameraPtzPatrol",
  "POST /v1/cameras/{id}/ptz/patrol/stop": "stopCameraPtzPatrol",
  "POST /v1/cameras/{id}/ptz/goto/{slot}": "gotoCameraPtzPreset",
  "POST /v1/alarm-manager/webhook/{id}": "sendAlarmManagerWebhook",
  "PATCH /v1/arm-profiles/settings": "setArmProfileSettings",
  "POST /v1/arm-profiles/enable": "enableArmAlarm",
  "POST /v1/arm-profiles/disable": "disableArmAlarm",
  "POST /v1/external/arm-profiles/{id}/actions/arm": "armExternalArmProfile",
  "POST /v1/external/arm-profiles/{id}/actions/disarm": "disarmExternalArmProfile",
  "POST /v1/sirens/{id}/play": "playSiren",
  "POST /v1/relays/{id}/outputs/{outputId}/activate": "activateRelayOutput",
  "POST /v1/alarm-hubs/{id}/outputs/{outputId}/trigger": "triggerAlarmHubOutput",
  "GET /v1/nvrs": "getNvr",
  "POST /v1/files/{fileType}": "uploadFile",
  "POST /v1/pos/cameras/{id}/transactions": "createPosTransaction",
};

const spec = (
  name: string,
  file: string,
  namespace: string,
  serviceName: string,
  extra: Partial<OpenApiConvertOptions> = {},
) => ({
  name,
  specPath: `specs/spec-mirror-unifi/specs/${file}.json`,
  options: { namespace, serviceName, ...extra },
});

await runOpenApiConvert({
  root: path.resolve(import.meta.dirname, ".."),
  specs: [
    spec("network", "network", "com.ui.network", "UniFiNetwork"),
    // `binaryTypes`: the camera snapshot (`image/jpeg`) and the floor-plan
    // assets (`image/jpeg`, `image/png`) answer bytes.
    spec("protect", "protect", "com.ui.protect", "UniFiProtect", {
      operationNames: (_id, ctx) => PROTECT_NAMES[`${ctx.method.toUpperCase()} ${ctx.path}`],
      binaryTypes: true,
    }),
    spec("innerspace", "innerspace", "com.ui.innerspace", "UniFiInnerSpace", { binaryTypes: true }),
    spec("mobility", "mobility", "com.ui.mobility", "UniFiMobility"),
    spec("site_manager", "site-manager", "com.ui.sitemanager", "UniFiSiteManager"),
    spec("carrier_fabric", "carrier-fabric", "com.ui.carrierfabric", "UniFiCarrierFabric"),
  ],
  options: {
    // Required by the converter; every spec above overrides both.
    namespace: "com.ui",
    serviceName: "UniFi",
    skipDeprecated: true,
  },
});
