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
import * as fs from "node:fs";
import * as path from "node:path";
import { writeModel } from "@distilled.cloud/dev/codegen/models";
import { convertOpenApiToSmithy } from "@distilled.cloud/dev/codegen/openapi";
import { runOpenApiConvert } from "@distilled.cloud/dev/codegen/openapi-cli";
import { resolveSpecPath } from "@distilled.cloud/dev/codegen/spec-path";

const root = path.resolve(import.meta.dirname, "..");
const SPEC_PATH = "specs/spec-mirror-resend/specs/openapi.json";

await runOpenApiConvert({
  root,
  specs: [
    {
      name: "resend",
      specPath: SPEC_PATH,
    },
  ],
  // Smithy-model patches (flat patches/*.json), applied after conversion.
  // generate.ts compiles the patched model and applies none itself.
  patchesDir: "patches",
  options: {
    namespace: "com.resend.api",
    serviceName: "Resend",
    skipDeprecated: true,
    // Idempotency-Key, the spec's only header parameter, is a real per-call input.
    headerParams: true,
    // POST /events/send answers 202 Accepted with a body.
    successStatuses: ["200", "201", "202", "204"],
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

// ---- Webhook payloads ------------------------------------------------------
// The spec's `webhooks` section describes every event Resend POSTs to a
// webhook endpoint (`email.bounced`, `inbox.thread.created`, ...), each with
// its payload as the request body. As in packages/github, they convert as
// synthetic POST operations, so the converter's schema handling applies; the
// operations are then dropped, leaving a types-only `webhook_events` model.
// Each payload keeps its component name (`EmailBouncedEvent`) and is tagged
// with its event name, which roots it for generate.ts. `type: { const }`
// becomes a one-value enum first, so the payloads discriminate on `type`.
const WEBHOOK_EVENT_TRAIT = "com.distilled.resend#webhookEvent";
const spec = JSON.parse(fs.readFileSync(resolveSpecPath(root, SPEC_PATH), "utf8"));
const constToEnum = (node: unknown): unknown => {
  if (Array.isArray(node)) return node.map(constToEnum);
  if (node === null || typeof node !== "object") return node;
  const { const: value, ...rest } = node as Record<string, unknown>;
  const out = Object.fromEntries(Object.entries(rest).map(([k, v]) => [k, constToEnum(v)]));
  return value === undefined ? out : { ...out, enum: [value] };
};
const webhookPaths: Record<string, unknown> = {};
const webhookEvents = new Map<string, string>();
for (const [event, item] of Object.entries<any>(spec.webhooks ?? {})) {
  const body = item.post?.requestBody?.content?.["application/json"];
  const name = body?.schema?.$ref?.split("/").pop();
  if (typeof name !== "string") continue;
  webhookPaths[`/webhooks/${event}`] = {
    post: {
      operationId: name,
      requestBody: { content: { "application/json": body } },
      responses: { "200": { description: "Delivered" } },
    },
  };
  webhookEvents.set(name, event);
}
if (webhookEvents.size > 0) {
  const ns = "com.resend.webhooks";
  const model = convertOpenApiToSmithy(
    { ...spec, components: constToEnum(spec.components), paths: webhookPaths },
    { namespace: ns, serviceName: "WebhookEvents", skipDeprecated: false },
  );
  // Drop the operations first: each one's id is the name its payload takes.
  const kept: Record<string, any> = {};
  for (const [id, shape] of Object.entries<any>(model.shapes)) {
    if (shape.type !== "operation" && shape.type !== "service") kept[id] = shape;
  }
  let json = JSON.stringify(kept);
  for (const name of webhookEvents.keys()) {
    // `EmailBouncedEventRequest…` → `EmailBouncedEvent…` (the payload and its nested shapes)
    json = json.replace(new RegExp(`#${name}Request(?=["A-Z])`, "g"), `#${name}`);
  }
  const shapes: Record<string, any> = JSON.parse(json);
  for (const [name, event] of webhookEvents) {
    const { "smithy.api#input": _, ...traits } = shapes[`${ns}#${name}`].traits ?? {};
    shapes[`${ns}#${name}`].traits = { ...traits, [WEBHOOK_EVENT_TRAIT]: { event } };
  }
  writeModel(path.join(root, ".generated-specs", "webhook_events.json"), { ...model, shapes });
  console.log(`   ✅ webhook_events: ${webhookEvents.size} payloads`);
}
