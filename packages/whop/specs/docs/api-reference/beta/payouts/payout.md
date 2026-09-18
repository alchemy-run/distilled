> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Payouts

Payouts represent money sent from an account or user balance to an external destination, such as a bank account, wallet, or other saved payout method.

Use the Payouts API to create and track payouts, manage saved payout methods, and show expected arrival details for funds leaving Whop.

## Endpoints

| Endpoint                                                                                   | Request                                                                       |
| ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| [List Payouts](/api-reference/beta/payouts/list-payouts)                                   | <Badge color="blue" size="sm" stroke>GET</Badge> `/payouts`                   |
| [Create Payout](/api-reference/beta/payouts/create-payout)                                 | <Badge color="green" size="sm" stroke>POST</Badge> `/payouts`                 |
| [Retrieve Payout](/api-reference/beta/payouts/retrieve-payout)                             | <Badge color="blue" size="sm" stroke>GET</Badge> `/payouts/{id}`              |
| [Cancel Payout](/api-reference/beta/payouts/cancel-payout)                                 | <Badge color="green" size="sm" stroke>POST</Badge> `/payouts/{id}/cancel`     |
| [List Saved Payout Methods](/api-reference/beta/payouts/list-saved-payout-methods)         | <Badge color="blue" size="sm" stroke>GET</Badge> `/payouts/methods`           |
| [Create Saved Payout Method](/api-reference/beta/payouts/create-saved-payout-method)       | <Badge color="green" size="sm" stroke>POST</Badge> `/payouts/methods`         |
| [Rename Saved Payout Method](/api-reference/beta/payouts/rename-saved-payout-method)       | <Badge color="orange" size="sm" stroke>PATCH</Badge> `/payouts/methods/{id}`  |
| [Delete Saved Payout Method](/api-reference/beta/payouts/delete-saved-payout-method)       | <Badge color="red" size="sm" stroke>DELETE</Badge> `/payouts/methods/{id}`    |
| [List Supported Payout Methods](/api-reference/beta/payouts/list-supported-payout-methods) | <Badge color="blue" size="sm" stroke>GET</Badge> `/payouts/supported_methods` |

## Attributes

<Columns cols={2}>
  <Column>
    <ResponseField name="id" type="string" required>
      Payout ID, prefixed `wdrl_`.
    </ResponseField>

    <ResponseField name="amount" type="string" required>
      The payout amount in whole currency units, as a decimal string.
    </ResponseField>

    <ResponseField name="created_at" type="string" required>
      When the payout was created.
    </ResponseField>

    <ResponseField name="currency" type="string" required>
      Payout currency.
    </ResponseField>

    <ResponseField name="destination_amount" type="string | null" required>
      The amount delivered in the destination currency, as a decimal string.
      Assigned when the payout is processed, so it is `null` before then and on
      payouts without a recorded conversion.
    </ResponseField>

    <ResponseField name="destination_currency" type="string | null" required>
      Currency the funds are delivered in, taken from the payout method when the
      payout is created. On a stablecoin payout it follows the settlement payout
      minted alongside it — the `GET /payouts` row carrying this payout's id as
      `payout_request_id` — and is `null` only when no settlement payout exists.
    </ResponseField>

    <ResponseField name="estimated_arrival" type="string | null" required>
      Estimated time the funds become available in the destination account.
    </ResponseField>

    <ResponseField name="exchange_rate" type="number | null" required>
      Exchange rate from the payout currency to the destination currency. Assigned
      when the payout is processed, so it is `null` before then and on payouts
      without a recorded rate.
    </ResponseField>

    <ResponseField name="failure" type="object | null" required>
      Why the payout ended without paying, or why it reversed after settlement. Present on failed, canceled, denied, and reversed payouts; `null` otherwise.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="code" type="string | null" required>
          Classified failure code from the maintained error catalog.
        </ResponseField>

        <ResponseField name="funds_returned_at" type="string | null" required>
          The effective time of the reversal that put the funds back in the balance —
          `null` if they never left it or have not returned yet. Set only once the
          return is confirmed in the ledger; the ledger posting itself can land moments
          after this time.
        </ResponseField>

        <ResponseField name="message" type="string | null" required>
          Human-readable explanation of the failure. Callers holding `payout:destination:read` may receive text personalized to the destination; other callers get the generic catalog message.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="fee_amount" type="string" required>
      The fee charged for the payout, in the payout currency, as a decimal string.
    </ResponseField>

    <ResponseField name="fee_paid_by" type="string" required>
      Who bore the payout fee: the account itself, or its parent platform.

      Available options: `self`, `platform`
    </ResponseField>

    <ResponseField name="markup_fee" type="string" required>
      Whop's markup on the provider fee, in the payout currency, as a decimal
      string. `"0.0"` when none applies.
    </ResponseField>

    <ResponseField name="metadata" type="object" required>
      Key-value data attached at creation and echoed on every read. At most 50 keys,
      key names up to 40 characters, string values up to 500 characters.
    </ResponseField>

    <ResponseField name="net_amount" type="string" required>
      The planned net for the destination, in the payout currency: amount minus
      fee\_amount minus markup\_fee when fee\_paid\_by is `self`; equal to amount when
      the platform covers the fees. A payout that ends denied, canceled, or failed
      delivered nothing — most keep the planned figure and `failure` says where the
      funds are, but a canceled stablecoin payout can report the settled outcome
      instead: `amount` carries what stayed in the balance, fees are zero because
      none were charged, and `net_amount` is 0 because nothing was delivered.
    </ResponseField>

    <ResponseField name="notes" type="string | null" required>
      Free-form notes attached by the payout creator, or `null` when none were
      provided. Maximum 255 characters.
    </ResponseField>

    <ResponseField name="object" type="string" required />

    <ResponseField name="payer_name" type="string | null" required>
      Name of the entity processing the payout.
    </ResponseField>

    <ResponseField name="payout_method" type="object | null" required>
      The saved payout method used. Requires payout:destination:read; null without it.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="nickname" type="string | null" required>
          Saved payout method nickname.
        </ResponseField>

        <ResponseField name="supported_payout_method" type="object | null" required>
          Supported payout method display details.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="delivery_type" type="string" required>
              How the funds are delivered to the recipient.

              Available options: `cash_pickup`, `bank_deposit`, `home_delivery`, `mobile_wallet`, `card`, `check`, `bill`, `cryptocurrency`, `unknown`
            </ResponseField>

            <ResponseField name="icon_url" type="string | null" required>
              Supported payout method icon URL.
            </ResponseField>

            <ResponseField name="payer_name" type="string | null" required>
              Supported payout method display name.
            </ResponseField>
          </Accordion>
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="payout_request_id" type="string | null" required>
      Payout request ID, prefixed `cofr_`, returned by `POST /payouts`. Match it to
      the settled payout in `GET /payouts`. Returns `null` for payouts not created
      by `POST /payouts`.
    </ResponseField>

    <ResponseField name="source" type="string | null" required>
      How the payout was created. `automatic` means a scheduled auto-payout; `null` on payouts created before source tracking or through internal tooling.

      Available options: `api`, `dashboard`, `automatic`
    </ResponseField>

    <ResponseField name="speed" type="string" required>
      Payout delivery speed.

      Available options: `standard`, `instant`
    </ResponseField>

    <ResponseField name="status" type="string" required>
      Current payout status.

      Available options: `requested`, `in_review`, `processing`, `completed`, `reversed`, `canceled`, `failed`, `denied`
    </ResponseField>

    <ResponseField name="status_detail" type="string" required>
      The finest machine phase under `status` — for example
      `awaiting_provider_acceptance` vs `in_transit` under `processing`, or the
      stablecoin conversion phase under `requested`. Informational vocabulary:
      values can be added without a version bump; `status` is the versioned
      contract.
    </ResponseField>

    <ResponseField name="trace_code" type="string | null" required>
      ACH trace number the recipient's bank can use to locate this payout. Assigned
      when the payout is submitted to the bank, so it is `null` before then and on
      payouts not sent over ACH.
    </ResponseField>
  </Column>

  <Column>
    <div className="api-resource-sticky-example">
      ```json Payout theme={null}
      {
      	"id": "wdrl_xxxxxxxxxxxxx",
      	"amount": "125.5",
      	"created_at": "2026-06-01T12:00:00Z",
      	"currency": "usd",
      	"destination_amount": "115.89",
      	"destination_currency": "eur",
      	"estimated_arrival": "2026-06-03T12:00:00Z",
      	"exchange_rate": 0.9234,
      	"failure": null,
      	"fee_amount": "1.25",
      	"fee_paid_by": "self",
      	"markup_fee": "0.0",
      	"metadata": {
      		"batch_id": "2026-06-01"
      	},
      	"net_amount": "124.25",
      	"notes": "March affiliate commissions",
      	"object": "payout",
      	"payer_name": "Whop Payments",
      	"payout_request_id": "cofr_xxxxxxxxxxxxx",
      	"payout_method": {
      		"nickname": "Operating account",
      		"supported_payout_method": {
      			"delivery_type": "bank_deposit",
      			"icon_url": "https://cdn.whop.com/bank.png",
      			"payer_name": "Whop Payments"
      		}
      	},
      	"source": "api",
      	"speed": "standard",
      	"status": "completed",
      	"status_detail": "completed",
      	"trace_code": "021000021234567"
      }
      ```
    </div>
  </Column>
</Columns>
