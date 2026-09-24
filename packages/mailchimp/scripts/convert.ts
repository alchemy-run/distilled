#!/usr/bin/env bun
/**
 * convert — turn Mailchimp's API documents into Smithy 2.0 JSON models.
 *
 * Input:  specs/spec-mirror-mailchimp/specs/marketing.json       (spec
 *         specs/spec-mirror-mailchimp/specs/transactional.json   submodule —
 *         the Swagger 2.0 documents Mailchimp generates its own clients from)
 *         specs/spec-mirror-mailchimp/specs/transactional.openapi.json
 *         (the same routes as OpenAPI 3.1; read only for its error responses)
 *         patches/*.patch.json  (RFC-6902 patches to the OpenAPI documents)
 * Output: .generated-specs/marketing.json
 *         .generated-specs/transactional.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/core/codegen/openapi`; this script is Mailchimp's pipeline
 * config. `scripts/generate.ts` compiles the model into src/services.
 */
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";
import { resolveSpecPath } from "@distilled.cloud/core/codegen/spec-path";

const ROOT = path.resolve(import.meta.dir, "..");
const TRANSACTIONAL_ERRORS_SPEC =
  "specs/spec-mirror-mailchimp/specs/transactional.openapi.json";

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

/**
 * Transactional names, by route. The document's `operationId`s restate the
 * route (`postMessagesSend`) and its vendor names are bare verbs unique
 * only within a tag (`send`, `info`, `list`), so every one is named here.
 */
const TRANSACTIONAL_NAMES: Readonly<Record<string, string>> = {
  "POST /allowlists/add": "addAllowlistEntry",
  "POST /allowlists/list": "listAllowlistEntries",
  "POST /allowlists/delete": "deleteAllowlistEntry",
  "POST /exports/info": "getExport",
  "POST /exports/list": "listExports",
  "POST /exports/rejects": "exportRejects",
  "POST /exports/whitelist": "exportWhitelist",
  "POST /exports/allowlist": "exportAllowlist",
  "POST /exports/activity": "exportActivity",
  "POST /inbound/domains": "listInboundDomains",
  "POST /inbound/add-domain": "addInboundDomain",
  "POST /inbound/check-domain": "checkInboundDomain",
  "POST /inbound/delete-domain": "deleteInboundDomain",
  "POST /inbound/routes": "listInboundRoutes",
  "POST /inbound/add-route": "addInboundRoute",
  "POST /inbound/update-route": "updateInboundRoute",
  "POST /inbound/delete-route": "deleteInboundRoute",
  "POST /inbound/send-raw": "sendRawInbound",
  "POST /ips/list": "listIps",
  "POST /ips/info": "getIp",
  "POST /ips/provision": "provisionIp",
  "POST /ips/start-warmup": "startIpWarmup",
  "POST /ips/cancel-warmup": "cancelIpWarmup",
  "POST /ips/set-pool": "setIpPool",
  "POST /ips/delete": "deleteIp",
  "POST /ips/list-pools": "listIpPools",
  "POST /ips/pool-info": "getIpPool",
  "POST /ips/create-pool": "createIpPool",
  "POST /ips/delete-pool": "deleteIpPool",
  "POST /ips/check-custom-dns": "checkIpCustomDns",
  "POST /ips/set-custom-dns": "setIpCustomDns",
  "POST /mctemplates/info": "getMcTemplate",
  "POST /mctemplates/list": "listMcTemplates",
  "POST /mctemplates/render": "renderMcTemplate",
  "POST /mctemplates/time-series": "getMcTemplateTimeSeries",
  "POST /messages/send-sms": "sendSms",
  "POST /messages/send": "sendMessage",
  "POST /messages/send-template": "sendTemplate",
  "POST /messages/send-mc-template": "sendMcTemplate",
  "POST /messages/search": "searchMessages",
  "POST /messages/search-time-series": "searchMessagesTimeSeries",
  "POST /messages/info": "getMessage",
  "POST /messages/content": "getMessageContent",
  "POST /messages/parse": "parseMessage",
  "POST /messages/send-raw": "sendRawMessage",
  "POST /messages/list-scheduled": "listScheduledMessages",
  "POST /messages/cancel-scheduled": "cancelScheduledMessage",
  "POST /messages/reschedule": "rescheduleMessage",
  "POST /metadata/list": "listMetadataFields",
  "POST /metadata/add": "addMetadataField",
  "POST /metadata/update": "updateMetadataField",
  "POST /metadata/delete": "deleteMetadataField",
  "POST /rejects/add": "addReject",
  "POST /rejects/list": "listRejects",
  "POST /rejects/delete": "deleteReject",
  "POST /rejects/add-sms": "addSmsReject",
  "POST /rejects/list-sms": "listSmsRejects",
  "POST /rejects/delete-sms": "deleteSmsReject",
  "POST /senders/list": "listSenders",
  "POST /senders/domains": "listSenderDomains",
  "POST /senders/add-domain": "addSenderDomain",
  "POST /senders/delete-domain": "deleteSenderDomain",
  "POST /senders/check-domain": "checkSenderDomain",
  "POST /senders/verify-domain": "verifySenderDomain",
  "POST /senders/info": "getSender",
  "POST /senders/time-series": "getSenderTimeSeries",
  "POST /subaccounts/list": "listSubaccounts",
  "POST /subaccounts/add": "addSubaccount",
  "POST /subaccounts/info": "getSubaccount",
  "POST /subaccounts/update": "updateSubaccount",
  "POST /subaccounts/delete": "deleteSubaccount",
  "POST /subaccounts/pause": "pauseSubaccount",
  "POST /subaccounts/resume": "resumeSubaccount",
  "POST /tags/list": "listTags",
  "POST /tags/delete": "deleteTag",
  "POST /tags/info": "getTag",
  "POST /tags/time-series": "getTagTimeSeries",
  "POST /tags/all-time-series": "getAllTagsTimeSeries",
  "POST /templates/add": "addTemplate",
  "POST /templates/info": "getTemplate",
  "POST /templates/update": "updateTemplate",
  "POST /templates/publish": "publishTemplate",
  "POST /templates/delete": "deleteTemplate",
  "POST /templates/list": "listTemplates",
  "POST /templates/time-series": "getTemplateTimeSeries",
  "POST /templates/render": "renderTemplate",
  "POST /urls/tracking-domains": "listTrackingDomains",
  "POST /urls/add-tracking-domain": "addTrackingDomain",
  "POST /urls/delete-tracking-domain": "deleteTrackingDomain",
  "POST /urls/check-tracking-domain": "checkTrackingDomain",
  "POST /users/info": "getUser",
  "POST /users/ping": "ping",
  "POST /users/ping2": "ping2",
  "POST /users/senders": "listUserSenders",
  "POST /webhooks/list": "listWebhooks",
  "POST /webhooks/add": "addWebhook",
  "POST /webhooks/info": "getWebhook",
  "POST /webhooks/update": "updateWebhook",
  "POST /webhooks/delete": "deleteWebhook",
};

/**
 * Every Transactional body carries `key` as a required member. The protocol
 * sends it from the credentials, so it leaves the model here; a route this
 * misses would make callers type the secret into every call.
 */
const stripTransactionalKey = (spec: any): void => {
  for (const [route, item] of Object.entries<any>(spec.paths ?? {})) {
    const body = item?.post?.parameters?.find((p: any) => p.in === "body");
    const schema = body?.schema;
    if (schema?.properties?.key === undefined) {
      throw new Error(`${route}: expected a \`key\` body member`);
    }
    delete schema.properties.key;
    schema.required = (schema.required ?? []).filter(
      (name: string) => name !== "key",
    );
    if (schema.required.length === 0) delete schema.required;
  }
};

/**
 * The Swagger document declares only `200`; the OpenAPI 3.1 one declares each
 * route's failures (`404` on `/templates/info`, `402` on `/messages/send`).
 * Copying those statuses across is what gives every operation its own error
 * list. The class is chosen per status, so two "not found" components on one
 * status collapse onto `NotFound`; the vendor's name stays in the message.
 */
const declareTransactionalErrors = async (spec: any): Promise<void> => {
  const source = JSON.parse(
    await fs.readFile(resolveSpecPath(ROOT, TRANSACTIONAL_ERRORS_SPEC), "utf8"),
  );
  const components = source.components?.responses ?? {};
  for (const [route, item] of Object.entries<any>(spec.paths ?? {})) {
    const declared = source.paths?.[route]?.post?.responses;
    if (declared === undefined) {
      throw new Error(`${route}: not in transactional.openapi.json`);
    }
    for (const [status, response] of Object.entries<any>(declared)) {
      if (!/^[45]\d\d$/.test(status)) continue;
      const name = response.$ref?.split("/").pop();
      const description =
        components[name]?.description ?? response.description ?? name;
      item.post.responses[status] = { description };
    }
  }
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
  root: ROOT,
  specs: [
    {
      name: "marketing",
      specPath: "specs/spec-mirror-mailchimp/specs/marketing.json",
      preprocess: collectVendorNames,
    },
    {
      name: "transactional",
      specPath: "specs/spec-mirror-mailchimp/specs/transactional.json",
      preprocess: async (spec) => {
        stripTransactionalKey(spec);
        await declareTransactionalErrors(spec);
      },
      options: {
        namespace: "com.mailchimp.transactional",
        serviceName: "MailchimpTransactional",
        statusToErrorClass: {
          400: "BadRequest",
          402: "PaymentRequired",
          403: "Forbidden",
          404: "NotFound",
          422: "UnprocessableEntity",
        },
        defaultErrorStatuses: ["401", "429", "500", "502", "503", "504"],
        operationNames: (_id, ctx) => {
          const name =
            TRANSACTIONAL_NAMES[`${ctx.method.toUpperCase()} ${ctx.path}`];
          if (name === undefined) {
            throw new Error(`unnamed Transactional route: ${ctx.path}`);
          }
          return name;
        },
      },
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
