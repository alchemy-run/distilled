> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Webhook

> A webhook endpoint that receives event notifications for a company via HTTP POST.

<Note>
  This resource has a successor in the [Whop
  API](/api-reference/beta/webhooks/list-webhooks), the versioned API that new
  integrations should build on. This page stays fully supported.
</Note>

<ResponseExample>
  ```json Example theme={null}
  {
  	"api_version": "v1",
  	"api_version_date": "<string>",
  	"child_resource_events": true,
  	"created_at": "2023-12-01T05:00:00.401Z",
  	"enabled": true,
  	"events": ["account.updated"],
  	"id": "hook_xxxxxxxxxxxxx",
  	"resource_id": "<string>",
  	"testable_events": ["account.updated"],
  	"url": "https://example.com/path",
  	"webhook_secret": "whsec_abc123def456"
  }
  ```
</ResponseExample>

<ResponseField name="api_version" type="ApiVersion" required>
  The API version used to format payloads sent to this webhook endpoint.

  Available options: `v1`, `v2`, `v5`
</ResponseField>

<ResponseField name="api_version_date" type="string | null" required>
  The dated API version (Api-Version-Date) that v1 payloads for this endpoint
  are pinned to: events serialize exactly like a REST read at this version (the
  native serializer where the resource has one). Null when unpinned — legacy
  (v2/v5) webhooks, and v1 webhooks on the legacy payload shape.
</ResponseField>

<ResponseField name="child_resource_events" type="boolean" required>
  Whether events are sent for child resources. For example, if the webhook is on
  a company, enabling this sends events only from the company's sub-merchants
  (child companies).
</ResponseField>

<ResponseField name="created_at" type="string<date-time>" required>
  The datetime the webhook was created.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="enabled" type="boolean" required>
  Whether this webhook endpoint is currently active and receiving events.
</ResponseField>

<ResponseField name="events" type="array<WebhookEvent>" required>
  The list of event types this webhook is subscribed to.

  Available options: `account.updated`, `invoice.created`, `invoice.marked_uncollectible`, `invoice.paid`, `invoice.past_due`, `invoice.voided`, `membership.activated`, `membership.deactivated`, `membership.trial_ending_soon`, `entry.created`, `entry.approved`, `entry.denied`, `entry.deleted`, `export.completed`, `export.failed`, `setup_intent.requires_action`, `setup_intent.succeeded`, `setup_intent.canceled`, `ledger_account.funds_available`, `swap.completed`, `deposit.succeeded`, `transfer.created`, `transfer.completed`, `transfer.failed`, `withdrawal.created`, `withdrawal.updated`, `withdrawal.reversed`, `payout.created`, `payout.updated`, `payout.reversed`, `card_transaction.created`, `card_transaction.updated`, `card_transaction.completed`, `card_transaction.declined`, `card_transaction.reversed`, `card.created`, `card.updated`, `card.frozen`, `card.canceled`, `card_application.created`, `card_application.updated`, `card_application.approved`, `card_application.denied`, `course_lesson_interaction.completed`, `payout_method.created`, `verification.succeeded`, `identity_profile.approved`, `identity_profile.rejected`, `identity_profile.needs_action`, `identity_profile.updated`, `payout_account.status_updated`, `resolution_center_case.created`, `resolution_center_case.updated`, `resolution_center_case.decided`, `product.created`, `product.updated`, `product.deleted`, `product.published`, `product.unpublished`, `plan.created`, `plan.updated`, `plan.deleted`, `shipment.created`, `shipment.updated`, `member.created`, `ad_campaign.payment_failed`, `chat.message.created`, `chat.reaction.created`, `payment.created`, `payment.succeeded`, `payment.failed`, `payment.pending`, `dispute.created`, `dispute.updated`, `refund.created`, `refund.updated`, `dispute_alert.created`, `membership.cancel_at_period_end_changed`
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the webhook.

  Example: `hook_xxxxxxxxxxxxx`
</ResponseField>

<ResponseField name="resource_id" type="string" required>
  The ID of the resource (company or product) this webhook is attached to.
</ResponseField>

<ResponseField name="testable_events" type="array<WebhookEvent>" required>
  The subset of subscribed event types that support sending test payloads.

  Available options: `account.updated`, `invoice.created`, `invoice.marked_uncollectible`, `invoice.paid`, `invoice.past_due`, `invoice.voided`, `membership.activated`, `membership.deactivated`, `membership.trial_ending_soon`, `entry.created`, `entry.approved`, `entry.denied`, `entry.deleted`, `export.completed`, `export.failed`, `setup_intent.requires_action`, `setup_intent.succeeded`, `setup_intent.canceled`, `ledger_account.funds_available`, `swap.completed`, `deposit.succeeded`, `transfer.created`, `transfer.completed`, `transfer.failed`, `withdrawal.created`, `withdrawal.updated`, `withdrawal.reversed`, `payout.created`, `payout.updated`, `payout.reversed`, `card_transaction.created`, `card_transaction.updated`, `card_transaction.completed`, `card_transaction.declined`, `card_transaction.reversed`, `card.created`, `card.updated`, `card.frozen`, `card.canceled`, `card_application.created`, `card_application.updated`, `card_application.approved`, `card_application.denied`, `course_lesson_interaction.completed`, `payout_method.created`, `verification.succeeded`, `identity_profile.approved`, `identity_profile.rejected`, `identity_profile.needs_action`, `identity_profile.updated`, `payout_account.status_updated`, `resolution_center_case.created`, `resolution_center_case.updated`, `resolution_center_case.decided`, `product.created`, `product.updated`, `product.deleted`, `product.published`, `product.unpublished`, `plan.created`, `plan.updated`, `plan.deleted`, `shipment.created`, `shipment.updated`, `member.created`, `ad_campaign.payment_failed`, `chat.message.created`, `chat.reaction.created`, `payment.created`, `payment.succeeded`, `payment.failed`, `payment.pending`, `dispute.created`, `dispute.updated`, `refund.created`, `refund.updated`, `dispute_alert.created`, `membership.cancel_at_period_end_changed`
</ResponseField>

<ResponseField name="url" type="string" required>
  The destination URL where webhook payloads are delivered via HTTP POST.

  Example: `https://example.com/path`
</ResponseField>

<ResponseField name="webhook_secret" type="string" required>
  The secret key used to sign webhook payloads for verification. Include this in your HMAC validation logic. Returned on the create response and to interactive dashboard sessions; empty for API-key and OAuth callers on later reads.

  Example: `whsec_abc123def456`
</ResponseField>
