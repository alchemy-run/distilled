#!/usr/bin/env bun
/**
 * convert — turn Mailchimp's Marketing API document into a Smithy 2.0 JSON model.
 *
 * Input:  specs/spec-mirror-mailchimp/specs/marketing.json  (spec submodule —
 *         the Swagger 2.0 document Mailchimp generates its own clients from)
 *         patches/*.patch.json  (RFC-6902 patches to the OpenAPI document)
 * Output: .generated-specs/marketing.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/core/codegen/openapi`; this script is Mailchimp's pipeline
 * config. `scripts/generate.ts` compiles the model into src/services.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

const METHODS = ["get", "put", "post", "patch", "delete"] as const;

/**
 * `"METHOD path"` → the name Mailchimp's own clients use.
 *
 * The document's `operationId`s are path-derived (`putListsIdMembersId`), and
 * verbNoun cannot recover a name from most of them: the member upsert stays
 * `putListsIdMembersId`, and `POST /lists/{list_id}` (batch subscribe) comes
 * out as `updateList`. Every operation also carries
 * `x-custom-config.methodNameCamel` (`setListMember`), which is what
 * Mailchimp documents. That name is only unique within a tag — `campaigns`,
 * `templates` and a dozen others all have a `list`/`get`/`create` — so the
 * colliding ones are left to verbNoun, which names those resource-level
 * routes well (`getCampaigns`, `createCampaign`).
 */
const vendorNames = new Map<string, string>();

/**
 * Where neither source gives a verbNoun name: the vendor's is a bare verb or
 * noun only its tag disambiguates (`pause`, `stores`), or verbNoun reads an
 * action route as a create (`createCampaignActionsSend`).
 */
const OVERRIDES: Readonly<Record<string, string>> = {
  "POST /automations/{workflow_id}/actions/archive": "archiveAutomation",
  "POST /batches": "startBatch",
  "GET /batches/{batch_id}": "getBatch",
  "PATCH /batch-webhooks/{batch_webhook_id}": "updateBatchWebhook",
  "POST /campaigns/{campaign_id}/actions/cancel-send": "cancelCampaignSend",
  "POST /campaigns/{campaign_id}/actions/pause": "pauseCampaign",
  "POST /campaigns/{campaign_id}/actions/replicate": "replicateCampaign",
  "POST /campaigns/{campaign_id}/actions/resume": "resumeCampaign",
  "POST /campaigns/{campaign_id}/actions/schedule": "scheduleCampaign",
  "POST /campaigns/{campaign_id}/actions/send": "sendCampaign",
  "POST /campaigns/{campaign_id}/actions/unschedule": "unscheduleCampaign",
  "PUT /campaigns/{campaign_id}/content": "setCampaignContent",
  "POST /customer-journeys/journeys/{journey_id}/steps/{step_id}/actions/trigger":
    "triggerCustomerJourneyStep",
  "GET /ecommerce/orders": "listOrders",
  "GET /ecommerce/stores": "listStores",
  "GET /file-manager/files": "listFiles",
  "POST /file-manager/files": "uploadFile",
  "GET /file-manager/folders/{folder_id}/files": "listFolderFiles",
  "POST /landing-pages": "createLandingPage",
  "GET /search-campaigns": "searchCampaigns",
  "GET /search-members": "searchMembers",
  "POST /sms-campaigns/{sms_campaign_id}/actions/cancel-send":
    "cancelSmsCampaignSend",
  "POST /sms-campaigns/{sms_campaign_id}/actions/schedule":
    "scheduleSmsCampaign",
  "POST /sms-campaigns/{sms_campaign_id}/actions/send": "sendSmsCampaign",
  "PUT /sms-campaigns/{sms_campaign_id}/content": "setSmsCampaignContent",
};

const collectVendorNames = (spec: any): void => {
  const found: { key: string; name: string }[] = [];
  for (const [route, item] of Object.entries<any>(spec.paths ?? {})) {
    for (const method of METHODS) {
      const name = item?.[method]?.["x-custom-config"]?.methodNameCamel;
      if (typeof name === "string") {
        found.push({ key: `${method.toUpperCase()} ${route}`, name });
      }
    }
  }
  const counts = new Map<string, number>();
  for (const { name } of found) counts.set(name, (counts.get(name) ?? 0) + 1);
  for (const { key, name } of found) {
    if (counts.get(name) === 1) vendorNames.set(key, name);
  }
};

await runOpenApiConvert({
  root: path.resolve(import.meta.dir, ".."),
  specs: [
    {
      name: "marketing",
      specPath: "specs/spec-mirror-mailchimp/specs/marketing.json",
      preprocess: collectVendorNames,
    },
  ],
  patchesDir: "patches",
  options: {
    namespace: "com.mailchimp.marketing",
    serviceName: "Mailchimp",
    // Every operation declares only `200`/`204` and `default` (the problem
    // document), so there is nothing per-operation to type; failures map by
    // status in src/protocol.ts.
    statusToErrorClass: {},
    skipDeprecated: true,
    operationNames: (_id, ctx) => {
      const key = `${ctx.method.toUpperCase()} ${ctx.path}`;
      return OVERRIDES[key] ?? vendorNames.get(key);
    },
  },
});
