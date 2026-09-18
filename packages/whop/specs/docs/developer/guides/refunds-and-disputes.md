> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Refunds and disputes

> Issue refunds, respond to disputes with evidence, and listen for chargeback events.

Two things can happen after a payment goes through. **Refunds** are a reversal you (or your support team) issue on purpose. **Disputes** are chargebacks the buyer files with their bank. You don't always control how a dispute lands, but you can respond with evidence.

<Tip>
  Subscribe to [webhooks](/developer/guides/webhooks) for `refund.created`, `refund.updated`, `dispute.created`, `dispute.updated`, and `dispute_alert.created` so you can reconcile status changes without polling.
</Tip>

## Refunds

Refunds reverse a successful payment. Whop processes them through the original payment processor. The matching membership status updates automatically.

### Issue a refund

Create refunds for a payment, not directly on the refunds resource. Call `payments.refund({ id })`. Omit `partial_amount` for a full refund, or pass it for a partial.

<CodeGroup>
  ```typescript TypeScript theme={null}
  import { WhopClient } from "@whop/sdk";

  const client = new WhopClient({ token: process.env.WHOP_API_KEY });

  // Full refund
  const fullRefund = await client.payments.refund({ id: "pay_xxxxxxxxxxxxx" });

  // Partial refund
  const partialRefund = await client.payments.refund({
    id: "pay_xxxxxxxxxxxxx",
    partial_amount: 5.0, // in payment currency, e.g. 5 USD
  });
  ```

  ```python Python theme={null}
  import os
  from whop_sdk import Whop

  client = Whop(token=os.environ["WHOP_API_KEY"])

  # Full refund
  full_refund = client.payments.refund("pay_xxxxxxxxxxxxx")

  # Partial refund
  partial_refund = client.payments.refund(
      "pay_xxxxxxxxxxxxx",
      partial_amount=5.0,
  )
  ```

  ```ruby Ruby theme={null}
  require "whop_sdk"

  client = Whop_sdk::Client.new(token: ENV.fetch("WHOP_API_KEY"))

  # Full refund
  full_refund = client.payments.refund(id: "pay_xxxxxxxxxxxxx")

  # Partial refund
  partial_refund = client.payments.refund(
    id: "pay_xxxxxxxxxxxxx",
    partial_amount: 5.0,
  )
  ```
</CodeGroup>

The response is the updated `Payment` object. The `refunded_amount` field reflects the cumulative refunded total. You can call `refund` multiple times for a payment up to its full amount.

<Note>
  Required permission: `payment:manage`. Add it from the [Permissions guide](/developer/guides/permissions) before publishing your app.
</Note>

### Inspect refunds

Refunds have their own resource if you need to look them up after the fact.

<CodeGroup>
  ```typescript TypeScript theme={null}
  const refund = await client.refunds.retrieve({ id: "ref_xxxxxxxxxxxxx" });

  const refunds = await client.refunds.list({
    company_id: "biz_xxxxxxxxxxxxx",
  });

  for await (const item of refunds) {
    console.log(item);
  }
  ```

  ```python Python theme={null}
  refund = client.refunds.retrieve("ref_xxxxxxxxxxxxx")

  for item in client.refunds.list(company_id="biz_xxxxxxxxxxxxx"):
      print(item)
  ```

  ```ruby Ruby theme={null}
  refund = client.refunds.retrieve(id: "ref_xxxxxxxxxxxxx")

  client.refunds.list(company_id: "biz_xxxxxxxxxxxxx").each do |item|
    puts item
  end
  ```
</CodeGroup>

## Disputes

A dispute (chargeback) opens when the buyer's bank challenges a payment. You have a window to respond with evidence before the bank decides. Whop forwards the dispute to you, you submit evidence, the bank rules, and the dispute closes.

### Watch for incoming disputes

Two events to subscribe to:

| Event                                                                          | Meaning                                                                                                       |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| [`dispute_alert.created`](/api-reference/dispute-alerts/dispute-alert-created) | Dispute alert before a formal dispute. Some processors give a heads-up. Not every alert turns into a dispute. |
| [`dispute.created`](/api-reference/disputes/dispute-created)                   | Formal dispute opened. Response window starts.                                                                |
| [`dispute.updated`](/api-reference/disputes/dispute-updated)                   | Status changes (e.g. from `needs_response` to `under_review`, then `won` or `lost`).                          |

### List and retrieve

<CodeGroup>
  ```typescript TypeScript theme={null}
  const disputes = await client.disputes.list({
    account_id: "biz_xxxxxxxxxxxxx",
  });

  for await (const item of disputes) {
    console.log(item);
  }

  const dispute = await client.disputes.retrieve({ id: "dp_xxxxxxxxxxxxx" });
  ```

  ```python Python theme={null}
  for item in client.disputes.list(account_id="biz_xxxxxxxxxxxxx"):
      print(item)

  dispute = client.disputes.retrieve("dp_xxxxxxxxxxxxx")
  ```

  ```ruby Ruby theme={null}
  client.disputes.list(account_id: "biz_xxxxxxxxxxxxx").each do |item|
    puts item
  end

  dispute = client.disputes.retrieve(id: "dp_xxxxxxxxxxxxx")
  ```
</CodeGroup>

### Respond with evidence

Disputes have a two-step response: stage your evidence with `updateEvidenceDispute`, then submit with `submitEvidenceDispute`. Update is idempotent. You can edit fields up until you submit.

<CodeGroup>
  ```typescript TypeScript theme={null}
  // Stage evidence (call as many times as needed)
  await client.disputes.updateEvidenceDispute({
    id: "dp_xxxxxxxxxxxxx",
    customer_name: "Jane Doe",
    customer_email_address: "jane@example.com",
    product_description: "Annual subscription to Acme Pro, purchased 2026-01-15.",
    service_date: "2026-01-15",
    refund_policy_disclosure: "Customer agreed to no-refunds policy at checkout.",
    notes: "Customer used the product 47 times across 8 sessions before disputing.",
  });

  // Submit evidence to the processor. After this, you can no longer edit.
  await client.disputes.submitEvidenceDispute({ id: "dp_xxxxxxxxxxxxx" });
  ```

  ```python Python theme={null}
  client.disputes.update_evidence_dispute(
      "dp_xxxxxxxxxxxxx",
      customer_name="Jane Doe",
      customer_email_address="jane@example.com",
      product_description="Annual subscription to Acme Pro, purchased 2026-01-15.",
      service_date="2026-01-15",
      refund_policy_disclosure="Customer agreed to no-refunds policy at checkout.",
      notes="Customer used the product 47 times across 8 sessions before disputing.",
  )

  client.disputes.submit_evidence_dispute("dp_xxxxxxxxxxxxx")
  ```

  ```ruby Ruby theme={null}
  # Stage evidence (call as many times as needed)
  client.disputes.update_evidence_dispute(
    id: "dp_xxxxxxxxxxxxx",
    customer_name: "Jane Doe",
    customer_email_address: "jane@example.com",
    product_description: "Annual subscription to Acme Pro, purchased 2026-01-15.",
    service_date: "2026-01-15",
    refund_policy_disclosure: "Customer agreed to no-refunds policy at checkout.",
    notes: "Customer used the product 47 times across 8 sessions before disputing.",
  )

  # Submit evidence to the processor. After this, you can no longer edit.
  client.disputes.submit_evidence_dispute(id: "dp_xxxxxxxxxxxxx")
  ```
</CodeGroup>

### Evidence fields

Every field is optional, but the more you provide, the stronger the response. Common ones:

| Field                                                               | What to put in it                                                                         |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `customer_name` / `customer_email_address`                          | Identifying info you have on file                                                         |
| `product_description`                                               | What the customer bought, in plain language                                               |
| `service_date`                                                      | When you rendered the service (International Organization for Standardization (ISO) 8601) |
| `billing_address`                                                   | The address used at checkout                                                              |
| `customer_communication_attachment`                                 | Email or chat threads showing the customer engaged                                        |
| `cancellation_policy_attachment` / `cancellation_policy_disclosure` | Your policy and proof the customer accepted it                                            |
| `refund_policy_attachment` / `refund_policy_disclosure`             | Same for refunds                                                                          |
| `refund_refusal_explanation`                                        | Why you didn't refund (e.g. usage past return window)                                     |
| `access_activity_log`                                               | Login or usage logs proving the customer used the product                                 |
| `uncategorized_attachment`                                          | Anything else relevant                                                                    |

Attachment fields take an uploaded file ID. Upload first via the [Files API](/developer/guides/upload-files), then pass `file.id`.

### Dispute statuses

The dispute moves through a state machine. There are two phases: the early warning phase (statuses prefixed `warning_`, surfaced through `dispute_alert.created`) and the formal dispute phase. Every status the SDK can return:

| Status                   | Phase   | Meaning                                                                                    |
| ------------------------ | ------- | ------------------------------------------------------------------------------------------ |
| `warning_needs_response` | Alert   | A dispute alert is open. You can preempt it with a refund or response before it escalates. |
| `warning_under_review`   | Alert   | You responded to the alert, and the processor is deciding whether to escalate.             |
| `warning_closed`         | Alert   | The alert resolved without becoming a formal dispute.                                      |
| `needs_response`         | Dispute | Formal dispute open. Submit evidence before the response window closes.                    |
| `under_review`           | Dispute | You submitted evidence, and the processor is deciding.                                     |
| `won`                    | Dispute | Funds stay with you.                                                                       |
| `lost`                   | Dispute | Funds go back to the buyer. Whop reverses the original payment.                            |
| `closed`                 | Dispute | Dispute closed without a formal won/lost outcome (e.g. withdrawn).                         |
| `other`                  | Either  | Catch-all for statuses that don't fit this table. Treat as informational.                  |

<Note>
  When a dispute is **lost**, Whop doesn't automatically create a Refund record, and you can't create one yourself. `payments.refund` rejects calls against a disputed payment with `This payment has been disputed. Therefore, it cannot be refunded.` Track the lost dispute as the source of truth, and don't expect a `refund.created` event.
</Note>

## Permissions

| Action                    | Required permission    |
| ------------------------- | ---------------------- |
| Create a refund           | `payment:manage`       |
| Retrieve / list refunds   | `payment:basic:read`   |
| Retrieve / list disputes  | `payment:dispute:read` |
| Update or submit evidence | `payment:dispute`      |

Add these from the [Permissions guide](/developer/guides/permissions).

## Next steps

<CardGroup cols={2}>
  <Card title="Accept payments" href="/developer/guides/accept-payments">
    The flow that creates the payments you'll later refund or defend.
  </Card>

  <Card title="Listen to webhooks" href="/developer/guides/webhooks">
    React to refund and dispute events server-side.
  </Card>

  <Card title="Upload files" href="/developer/guides/upload-files">
    Upload evidence attachments for dispute responses.
  </Card>

  <Card title="Disputes API reference" href="/api-reference/disputes/dispute">
    Full resource: fields, statuses, and every endpoint.
  </Card>
</CardGroup>
