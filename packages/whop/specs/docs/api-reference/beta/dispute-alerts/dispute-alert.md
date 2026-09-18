> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Dispute Alerts

A Dispute alert is an early warning from a card issuer that a settled payment is being questioned, ahead of any chargeback. `type` separates fraud reports (`early_fraud_warning`), pre-dispute notices (`dispute_alert`), and Visa RDR cases the network already closed by refunding (`rapid_dispute_resolution`).

Use the Dispute alerts API to list alerts for an account, filter them by type or payment, and read `actionable` to see whether refunding can still avoid the chargeback.

## Endpoints

| Endpoint                                                                            | Request                                                                 |
| ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| [List Dispute Alerts](/api-reference/beta/dispute-alerts/list-dispute-alerts)       | <Badge color="blue" size="sm" stroke>GET</Badge> `/dispute_alerts`      |
| [Retrieve Dispute Alert](/api-reference/beta/dispute-alerts/retrieve-dispute-alert) | <Badge color="blue" size="sm" stroke>GET</Badge> `/dispute_alerts/{id}` |

## Attributes

<Columns cols={2}>
  <Column>
    <ResponseField name="id" type="string" required>
      Dispute alert ID, prefixed `dspa_`.
    </ResponseField>

    <ResponseField name="account_id" type="string | null" required>
      The account the alerted payment belongs to, prefixed `biz_`. `null` while the
      alert is unmatched.
    </ResponseField>

    <ResponseField name="actionable" type="boolean" required>
      Whether refunding the payment can still avoid a chargeback. `false` once the
      payment has been disputed or fully refunded, or when the alert could not be
      matched to a payment — `not_actionable_reason` says which.
    </ResponseField>

    <ResponseField name="amount" type="number" required>
      The alerted amount, in whole units of `currency`. This is what the issuer
      reported, which can differ from the payment's own amount.
    </ResponseField>

    <ResponseField name="card_brand" type="string | null" required>
      The card network as reported by the issuer, lowercased, such as `visa` or
      `mastercard`. `unknown` when the report carries neither a network nor a
      recognizable BIN.
    </ResponseField>

    <ResponseField name="created_at" type="string" required>
      When Whop received the alert, as an ISO 8601 timestamp.
    </ResponseField>

    <ResponseField name="currency" type="string" required>
      Three-letter ISO currency code of the alerted amount.
    </ResponseField>

    <ResponseField name="fee_charged" type="boolean" required>
      Whether Whop charged the account an alert fee for this one. Always `false` for
      `early_fraud_warning`, which Whop is not billed for and never passes on.
    </ResponseField>

    <ResponseField name="issuer" type="string | null" required>
      Name of the bank that issued the card and filed the report.
    </ResponseField>

    <ResponseField name="not_actionable_reason" type="string | null" required>
      Why refunding can no longer avoid a chargeback. `network_resolved` when a Visa RDR already closed the case, `payment_unmatched` when no payment matched, `payment_not_captured` when it never captured money, `payment_disputed` once the payment carries a dispute, `payment_refunded` once fully refunded. `null` while `actionable` is true.

      Available options: `network_resolved`, `payment_unmatched`, `payment_not_captured`, `payment_disputed`, `payment_refunded`
    </ResponseField>

    <ResponseField name="payment_id" type="string | null" required>
      The payment the issuer reported, prefixed `pay_`. `null` when Whop could not
      match the report to a payment.
    </ResponseField>

    <ResponseField name="product_id" type="string | null" required>
      The product the alerted payment was for, prefixed `prod_`.
    </ResponseField>

    <ResponseField name="reported_at" type="string" required>
      When the issuer filed the report, as an ISO 8601 timestamp. Earlier than
      `created_at`, which is when Whop received it.
    </ResponseField>

    <ResponseField name="transaction_at" type="string | null" required>
      When the reported transaction was made, as an ISO 8601 timestamp.
    </ResponseField>

    <ResponseField name="type" type="string" required>
      What the issuer sent. `early_fraud_warning` is a fraud report on a settled payment (Visa TC40 / Mastercard SAFE) — refunding still avoids the chargeback, and Whop never charges a fee for one. `dispute_alert` is a pre-dispute notice from the issuer's alert network, which Whop pays for and passes on as a fee. `rapid_dispute_resolution` is a Visa RDR case the network already closed by refunding the payment — nothing is left to act on.

      Available options: `early_fraud_warning`, `dispute_alert`, `rapid_dispute_resolution`
    </ResponseField>

    <ResponseField name="updated_at" type="string" required>
      When the alert was last changed, as an ISO 8601 timestamp.
    </ResponseField>
  </Column>

  <Column>
    <div className="api-resource-sticky-example">
      ```json DisputeAlert theme={null}
      {
      	"id": "dspa_xxxxxxxxxxxxx",
      	"type": "dispute_alert",
      	"actionable": true,
      	"not_actionable_reason": null,
      	"amount": 69.95,
      	"currency": "usd",
      	"card_brand": "visa",
      	"issuer": "JPMorgan Chase Bank",
      	"account_id": "biz_xxxxxxxxxxxxxx",
      	"payment_id": "pay_xxxxxxxxxxxxxx",
      	"product_id": "prod_xxxxxxxxxxxxx",
      	"fee_charged": true,
      	"reported_at": "2026-08-10T17:37:09.000Z",
      	"transaction_at": "2026-08-02T00:00:00.000Z",
      	"created_at": "2026-08-10T21:39:26.668Z",
      	"updated_at": "2026-08-10T21:39:28.137Z"
      }
      ```
    </div>
  </Column>
</Columns>
