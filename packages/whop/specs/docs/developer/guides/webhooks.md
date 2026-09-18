> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Webhooks

> Receive payment, membership, and event notifications from Whop in realtime.

A webhook is a `POST` request that Whop sends to your server when an event occurs. Examples of events: a payment succeeds, a membership activates, a dispute opens. You register a public URL. Whop sends a signed JSON event to this URL each time one of your subscribed events occurs.

<Tip>
  Whop webhooks use the [Standard Webhooks](https://github.com/standard-webhooks/standard-webhooks) specification. The Whop SDKs verify the signature and parse the event in one call.
</Tip>

## What a webhook looks like

<Warning>
  Signature verification ships as a standalone helper, not as a client method. The `webhooks.unwrap` method and the `webhookKey` client option belonged to the older SDKs. Every current SDK drops both. The helpers shown here land in the next release. Until then, use **Verify without an SDK** at the bottom of this page.
</Warning>

Each event is one `POST` request:

```http theme={null}
POST /webhooks/whop HTTP/1.1
content-type: application/json
webhook-id: msg_bQPHmO2eBnHYtWWuxAN9K3Xd
webhook-timestamp: 1786381404
webhook-signature: v1,K5oZfzN95Z9UVu1EsfQmfVNQhnkZ2pCPljWFR61G0P0=
```

```json theme={null}
{
  "id": "msg_bQPHmO2eBnHYtWWuxAN9K3Xd",
  "type": "payment.succeeded",
  "api_version": "v1",
  "api_version_date": "2026-08-14",
  "timestamp": "2026-08-10T17:03:24.291Z",
  "account_id": "biz_XXXXXXXX",
  "data": {
    "id": "pay_XXXXXXXX",
    "...": "the full payment object"
  }
}
```

The envelope follows your webhook's `api_version_date` pin, the same way `data` does. Webhooks pinned before `2026-08-14` — and webhooks without a pin — receive the account field as `company_id` instead of `account_id`.

The HTTP request headers version the same way: any future header change ships as a dated API version, and your pin keeps the headers you integrated against. Four headers are contractually frozen and never change on any version: `webhook-id`, `webhook-signature`, `webhook-timestamp`, and `content-type` — signature verification works identically on every pin.

One optional envelope field describes what changed:

* **`previous_attributes`** — present on `.updated` events that capture changes (`account.updated`, `product.updated`, `plan.updated`, and `shipment.updated`): an object with the old values of the `data` fields that changed, keyed by field name. Renaming the account to "Shine Time Auto Detailing" delivers `{"title": "Webb's Mobile Detailing"}` — the value each changed field had before the write. When the field is absent, no change capture was available for the event. Values follow your webhook's `api_version_date` pin, the same way `data` does.

## Create a webhook

<Tabs>
  <Tab title="API">
    <div id="mint-api-key-live" />

    ```bash theme={null}
    curl -X POST "https://api.whop.com/api/v1/webhooks" \
      -H "Authorization: Bearer $WHOP_API_KEY" \
      -H "Content-Type: application/json" \
      -d '{
        "url": "https://example.com/webhooks/whop",
        "events": ["payment.succeeded"]
      }'
    ```

    The response contains `webhook_secret`. **The API shows this value only one time.** Store it immediately. See the [Webhooks API reference](/api-reference/webhooks/webhook) for all fields, including `resource_id` (the account or app that owns the webhook) and `child_resource_events`.
  </Tab>

  <Tab title="Dashboard">
    1. Open the [Developer tab of your dashboard](https://whop.com/dashboard/developer) and select **Create webhook**.
    2. Enter your endpoint URL and select the events.
    3. After you create the webhook, copy the signing secret from the **Secret** column of the table. Store it as `WHOP_WEBHOOK_SECRET`.
  </Tab>
</Tabs>

## Verify and handle events

Always verify the signature before you use a payload.

<Steps>
  <Step title="Store your signing secret">
    Verification needs the secret, not an SDK client. Store the value the API returned as `WHOP_WEBHOOK_SECRET`, and pass it to the helper exactly as Whop gave it to you — a `ws_` string. Don't strip the prefix, and don't base64-encode it. The helper derives the key.

    ```bash theme={null}
    WHOP_WEBHOOK_SECRET=ws_0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef
    ```
  </Step>

  <Step title="Handle events on your server">
    One call verifies the signature and returns the parsed event. If the signature is wrong, the call raises and your handler never sees the payload.

    <CodeGroup>
      ```typescript Typescript + NextJS theme={null}
      import { waitUntil } from "@vercel/functions";
      import { unwrapWebhook } from "@whop/sdk/helpers";
      import type { NextRequest } from "next/server";

      export async function POST(request: NextRequest): Promise<Response> {
         	// Give the raw body. Parsing it first changes the bytes and the signature check fails.
         	const payload = await request.text();
         	const headers = Object.fromEntries(request.headers);

         	const event = unwrapWebhook(payload, {
        		headers,
        		key: process.env.WHOP_WEBHOOK_SECRET!,
         	});

         	if (event.type === "payment.succeeded") {
        		waitUntil(handlePaymentSucceeded(event.data));
         	}

         	// Respond in less than 5 seconds, or Whop retries.
         	return new Response("OK", { status: 200 });
      }

      async function handlePaymentSucceeded(payment: Record<string, unknown>) {
         	// Do the fulfillment work here: update your database, give access, send email.
         	console.log("[PAYMENT SUCCEEDED]", payment);
      }
      ```

      ```python Python + FastAPI theme={null}
      import os

      from fastapi import BackgroundTasks, FastAPI, Request, Response
      from whop_sdk.lib.verify_webhook import unwrap

      app = FastAPI()

      @app.post("/api/webhooks/whop")
      async def whop_webhook(request: Request, background: BackgroundTasks):
          # Give the raw body. Parsing it first changes the bytes and the signature check fails.
          payload = await request.body()

          event = unwrap(payload, dict(request.headers), os.environ["WHOP_WEBHOOK_SECRET"])

          if event["type"] == "payment.succeeded":
              background.add_task(handle_payment_succeeded, event["data"])

          # Respond in less than 5 seconds, or Whop retries.
          return Response(status_code=200)


      def handle_payment_succeeded(payment):
          # Do the fulfillment work here: update your database, give access, send email.
          print(f"[PAYMENT SUCCEEDED] {payment['id']}")
      ```

      ```ruby Ruby on Rails theme={null}
      require "whop_sdk"

      class Api::WebhooksController < ApplicationController
        skip_before_action :verify_authenticity_token

        def whop
          # Give the raw body. Parsing it first changes the bytes and the signature check fails.
          event = WhopSDK::Helpers::VerifyWebhook.unwrap(
            request.raw_post,
            headers: request.headers.to_h,
            key: ENV.fetch("WHOP_WEBHOOK_SECRET"),
          )

          if event[:type] == "payment.succeeded"
            HandlePaymentSucceededJob.perform_later(event[:data][:id])
          end

          # Respond in less than 5 seconds, or Whop retries.
          head :ok
        end
      end
      ```
    </CodeGroup>

    The helper returns the parsed body, not a typed event object: a plain object in TypeScript, a `dict` in Python, and a `Hash` with symbol keys in Ruby. Branch on `type` and read `data` as shown.

    <Tip>
      Do only the necessary work before you respond: verify the event, put the work in a queue, and return `200`. The TypeScript example uses `waitUntil` from `@vercel/functions`. On other runtimes, use the background-task function of your framework or a job queue.
    </Tip>
  </Step>
</Steps>

<Accordion title="Verify without an SDK">
  Whop signs the string `{webhook-id}.{webhook-timestamp}.{raw body}` with HMAC-SHA256. The key is your `ws_...` secret. The `webhook-signature` header contains the result in base64: `v1,<signature>`.

  To verify a request: compute the HMAC over the raw request body, encode the result in base64, and compare it to the header value with a constant-time comparison. Reject a request if its `webhook-timestamp` is more than 5 minutes from the current time. This prevents replay attacks. The SDK verifiers apply this limit automatically.
</Accordion>

## Test your endpoint

* **Send a test event.** In the dashboard, open the menu of the webhook and select a test event. Or call [`POST /api/v1/webhooks/{id}/test`](/api-reference/webhooks/webhook). Whop sends a sample payload to your URL and returns the response status and body from your server.
* **Examine deliveries.** Whop keeps each delivery for 30 days: the request, the response code, the response body, and the timing. See the deliveries in the dashboard or with [`GET /api/v1/webhooks/{id}/deliveries`](/api-reference/webhooks/webhook).

<Info>
  A webhook URL must be reachable from the public internet. Whop rejects `localhost` and private-network addresses. For local development, use [ngrok](https://ngrok.com) or [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/) to forward a public URL to your machine. Register the tunnel URL.
</Info>

## Delivery

**Respond with a 2xx status in less than 5 seconds.** All other results are failed attempts: a timeout, an error status, or a redirect. Whop doesn't follow redirects.

**Whop delivers each event at least one time.** The same event can arrive more than one time. Make your handler idempotent. Each retry of a delivery has the same `webhook-id`. Store the `webhook-id` and ignore duplicates.

**Whop retries failed deliveries for approximately 3 days.** After the first attempt, Whop retries 12 times with increased delays: 30 seconds, 2 minutes, 8 minutes, 30 minutes, 1 hour, 3 hours, 6 hours, and then each 12 hours. The full schedule is approximately 71 hours.

**The sequence of deliveries isn't guaranteed.** A newer event can arrive before an older event. Process each event independently. If the sequence is important, read the current state from the API.

**Whop disables endpoints that continue to fail.** If all deliveries to your endpoint fail for 24 hours, Whop sends a warning email to your account. If the failures continue for 72 hours and 10 or more deliveries failed, Whop disables the webhook and sends a second email. To enable the webhook again, use the dashboard or send `PATCH /api/v1/webhooks/{id}` with `"enabled": true`. This resets the failure history. Whop doesn't send the events that occurred while the webhook was turned off. Read the API to find the data that you missed.

<Card title="Troubleshoot webhook delivery" icon="bug" href="/developer/troubleshooting#webhook-delivery">
  Fix signature failures, retries, duplicate events, and local tunnel issues.
</Card>

## Events and versions

Two version fields control the data that your endpoint receives:

* **`api_version`** — the envelope format. Use `v1`. This page describes only `v1`. The legacy formats `v2` and `v5` exist for old integrations and don't use Standard Webhooks signatures. Don't use them for new integrations.
* **`api_version_date`** — the dated API version that sets the shape of `data` and of the envelope itself (for example, pins from `2026-08-14` carry `account_id` where older pins carry `company_id`). It operates the same as the `Api-Version-Date` header on REST reads. Set it when you create a webhook with the API. Then the payload shape stays stable when the API changes. Webhooks without a pin keep their initial payload and envelope shape. Exception: resources that exist only on the current API (cards, plans, transfers, swaps, deposits, exports) always receive the latest `data` shape — the envelope still follows the pin.

Event names have the format `resource.action`. Each event in the table links to a reference page with the payload schema:

| Resource                   | Events                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Accounts                   | [`account.updated`](/api-reference/beta/accounts/account-updated)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Ad Campaigns               | [`ad_campaign.payment_failed`](/api-reference/beta/ad-campaigns/ad-campaign-payment-failed)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Card transactions          | [`card_transaction.completed`](/api-reference/beta/cards/cardtransaction-completed), [`card_transaction.created`](/api-reference/beta/cards/cardtransaction-created), [`card_transaction.declined`](/api-reference/beta/cards/cardtransaction-declined), [`card_transaction.reversed`](/api-reference/beta/cards/cardtransaction-reversed), [`card_transaction.updated`](/api-reference/beta/cards/cardtransaction-updated)                                                                                                                                                    |
| Cards                      | [`card.canceled`](/api-reference/beta/cards/card-canceled), [`card.created`](/api-reference/beta/cards/card-created), [`card.frozen`](/api-reference/beta/cards/card-frozen), [`card.updated`](/api-reference/beta/cards/card-updated), [`card_application.approved`](/api-reference/beta/cards/card-application-approved), [`card_application.created`](/api-reference/beta/cards/card-application-created), [`card_application.denied`](/api-reference/beta/cards/card-application-denied), [`card_application.updated`](/api-reference/beta/cards/card-application-updated) |
| Course lesson interactions | [`course_lesson_interaction.completed`](/api-reference/course-lesson-interactions/courselessoninteraction-completed)                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Deposits                   | [`deposit.succeeded`](/api-reference/beta/deposits/deposit-succeeded)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Dispute alerts             | [`dispute_alert.created`](/api-reference/beta/dispute-alerts/dispute-alert-created)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Disputes                   | [`dispute.created`](/api-reference/beta/disputes/dispute-created), [`dispute.updated`](/api-reference/beta/disputes/dispute-updated)                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Entries                    | [`entry.approved`](/api-reference/entries/entry-approved), [`entry.created`](/api-reference/entries/entry-created), [`entry.deleted`](/api-reference/entries/entry-deleted), [`entry.denied`](/api-reference/entries/entry-denied)                                                                                                                                                                                                                                                                                                                                             |
| Exports                    | `export.completed`, `export.failed`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Identity profiles          | [`identity_profile.updated`](/api-reference/beta/verifications/identityprofile-updated)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Invoices                   | [`invoice.created`](/api-reference/invoices/invoice-created), [`invoice.marked_uncollectible`](/api-reference/invoices/invoice-marked-uncollectible), [`invoice.paid`](/api-reference/invoices/invoice-paid), [`invoice.past_due`](/api-reference/invoices/invoice-past-due), [`invoice.voided`](/api-reference/invoices/invoice-voided)                                                                                                                                                                                                                                       |
| Ledger accounts            | [`ledger_account.funds_available`](/api-reference/ledger-accounts/ledgeraccount-funds-available)                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Members                    | [`member.created`](/api-reference/beta/members/member-created)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Memberships                | [`membership.activated`](/api-reference/beta/memberships/membership-activated), [`membership.cancel_at_period_end_changed`](/api-reference/beta/memberships/membership-cancel-at-period-end-changed), [`membership.deactivated`](/api-reference/beta/memberships/membership-deactivated), [`membership.trial_ending_soon`](/api-reference/beta/memberships/membership-trial-ending-soon)                                                                                                                                                                                       |
| Messages                   | [`chat.message.created`](/api-reference/messages/chat-message-created)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Payments                   | [`payment.created`](/api-reference/payments/payment-created), [`payment.failed`](/api-reference/payments/payment-failed), [`payment.pending`](/api-reference/payments/payment-pending), [`payment.succeeded`](/api-reference/payments/payment-succeeded)                                                                                                                                                                                                                                                                                                                       |
| Payout accounts            | [`payout_account.status_updated`](/api-reference/payout-accounts/payoutaccount-status-updated)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Payout methods             | [`payout_method.created`](/api-reference/beta/payouts/payoutmethod-created)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Payouts                    | [`payout.created`](/api-reference/beta/payouts/payout-created), [`payout.reversed`](/api-reference/beta/payouts/payout-reversed), [`payout.updated`](/api-reference/beta/payouts/payout-updated)                                                                                                                                                                                                                                                                                                                                                                               |
| Plans                      | [`plan.created`](/api-reference/beta/plans/plan-created), [`plan.deleted`](/api-reference/beta/plans/plan-deleted), [`plan.updated`](/api-reference/beta/plans/plan-updated)                                                                                                                                                                                                                                                                                                                                                                                                   |
| Products                   | [`product.created`](/api-reference/beta/products/product-created), [`product.deleted`](/api-reference/beta/products/product-deleted), [`product.published`](/api-reference/beta/products/product-published), [`product.unpublished`](/api-reference/beta/products/product-unpublished), [`product.updated`](/api-reference/beta/products/product-updated)                                                                                                                                                                                                                      |
| Reactions                  | [`chat.reaction.created`](/api-reference/reactions/chat-reaction-created)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Refunds                    | [`refund.created`](/api-reference/refunds/refund-created), [`refund.updated`](/api-reference/refunds/refund-updated)                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Resolution center cases    | [`resolution_center_case.created`](/api-reference/resolution-center-cases/resolutioncentercase-created), [`resolution_center_case.decided`](/api-reference/resolution-center-cases/resolutioncentercase-decided), [`resolution_center_case.updated`](/api-reference/resolution-center-cases/resolutioncentercase-updated)                                                                                                                                                                                                                                                      |
| Setup intents              | [`setup_intent.canceled`](/api-reference/setup-intents/setupintent-canceled), [`setup_intent.requires_action`](/api-reference/setup-intents/setupintent-requires-action), [`setup_intent.succeeded`](/api-reference/setup-intents/setupintent-succeeded)                                                                                                                                                                                                                                                                                                                       |
| Shipments                  | [`shipment.created`](/api-reference/shipments/shipment-created), [`shipment.updated`](/api-reference/shipments/shipment-updated)                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Swaps                      | [`swap.completed`](/api-reference/beta/swaps/swap-completed)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Transfers                  | [`transfer.completed`](/api-reference/beta/transfers/transfer-completed), [`transfer.created`](/api-reference/beta/transfers/transfer-created), [`transfer.failed`](/api-reference/beta/transfers/transfer-failed)                                                                                                                                                                                                                                                                                                                                                             |
| Verifications              | [`verification.succeeded`](/api-reference/verifications/verification-succeeded)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

## Next steps

<CardGroup cols={2}>
  <Card title="Accept payments" href="/developer/guides/accept-payments">
    Use `payment.succeeded` webhooks with checkout to fulfill orders.
  </Card>

  <Card title="Save payment methods" href="/developer/guides/save-payment-methods">
    Use setup intents and webhooks to charge customers later.
  </Card>

  <Card title="API walkthrough" href="/developer/api/getting-started">
    See how webhooks operate with checkout, transfers, and KYC.
  </Card>

  <Card title="Webhooks API reference" href="/api-reference/webhooks/webhook">
    All endpoints and fields: create, update, test, deliveries.
  </Card>
</CardGroup>
