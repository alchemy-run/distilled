#!/usr/bin/env -S node --conditions=bun
/**
 * convert — turn the Resend OpenAPI spec into a Smithy 2.0 JSON model.
 *
 * Input:  specs/spec-mirror-resend/specs/openapi.json  (spec submodule)
 *         patches/*.json  (RFC-6902 patches to the converted Smithy model,
 *                          under the upstream shape ids: `pnpm patches:names resend`)
 * Output: .generated-specs/resend.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/dev/codegen/openapi`; this script is Resend's pipeline
 * config. `scripts/generate.ts` compiles the model into src/services.
 *
 * Resend's operationIds are `group/action` (`emails/send`, `domains/remove`).
 * `operationNames` keeps the names this SDK already shipped (`createEmail`,
 * `deleteDomain`, ...), spells every other delete the same way, and renames
 * the ids that read poorly as verbNoun (`broadcasts/recipients`).
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";

await runOpenApiConvert({
  root: path.resolve(import.meta.dirname, ".."),
  specs: [
    {
      name: "resend",
      specPath: "specs/spec-mirror-resend/specs/openapi.json",
    },
  ],
  // Smithy-model patches (flat patches/*.json), applied after conversion.
  // generate.ts compiles the patched model and applies none itself.
  patchesDir: "patches",
  options: {
    namespace: "com.resend.api",
    serviceName: "Resend",
    skipDeprecated: true,
    operationNames: {
      // Names shipped before the spec moved to resend-openapi.
      "POST /emails": "createEmail",
      "POST /emails/batch": "createEmailBatch",
      "POST /contacts/{contact_id}/segments/{segment_id}": "updateContactSegment",
      "DELETE /api-keys/{api_key_id}": "deleteApiKey",
      "DELETE /automations/{automation_id}": "deleteAutomation",
      "DELETE /broadcasts/{id}": "deleteBroadcast",
      "DELETE /contacts/{id}": "deleteContact",
      "DELETE /contact-properties/{id}": "deleteContactProperty",
      "DELETE /contacts/{contact_id}/segments/{segment_id}": "deleteContactSegment",
      "DELETE /domains/{domain_id}": "deleteDomain",
      "DELETE /events/{identifier}": "deleteEvent",
      "DELETE /segments/{id}": "deleteSegment",
      "DELETE /templates/{id}": "deleteTemplate",
      "DELETE /topics/{id}": "deleteTopic",
      "DELETE /webhooks/{webhook_id}": "deleteWebhook",
      // New deletes, spelled like the ones above.
      "DELETE /inboxes/{inbox_id}": "deleteInbox",
      "DELETE /inboxes/{inbox_id}/drafts/{draft_id}": "deleteInboxDraft",
      "DELETE /inboxes/{inbox_id}/labels/{label_id}": "deleteInboxLabel",
      "DELETE /inboxes/{inbox_id}/threads/{thread_id}": "deleteInboxThread",
      "DELETE /inboxes/{inbox_id}/threads/{thread_id}/labels/{label_id}": "deleteInboxThreadLabel",
      "DELETE /suppressions/{suppression}": "deleteSuppression",
      // Ids that do not read as verbNoun.
      "GET /broadcasts/{id}/recipients": "listBroadcastRecipients",
      "POST /contacts/imports": "createContactImport",
      "GET /contacts/imports/{id}": "getContactImport",
      "GET /emails/metrics": "getEmailMetrics",
      "POST /inboxes/{inbox_id}/threads/{thread_id}/emails/{email_id}/forward":
        "forwardInboxThreadEmail",
      "POST /suppressions/batch/add": "batchAddSuppressions",
      "POST /suppressions/batch/remove": "batchDeleteSuppressions",
      "POST /webhooks/{webhook_id}/events/{event_id}/replay": "replayWebhookEvent",
    },
  },
});
