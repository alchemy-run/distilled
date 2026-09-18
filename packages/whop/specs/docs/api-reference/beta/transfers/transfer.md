> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Transfers

Transfers move value between identities on Whop. They are used for account-to-account money movement, user payouts inside Whop, crypto transfers, and claim links depending on the destination type.

Use the Transfers API to create a transfer, list previous transfers, and retrieve a transfer by ID when reconciling money movement between accounts or users.

## Endpoints

| Endpoint                                                                           | Request                                                                  |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [List Transfers](/api-reference/beta/transfers/list-transfers)                     | <Badge color="blue" size="sm" stroke>GET</Badge> `/transfers`            |
| [Create Transfer](/api-reference/beta/transfers/create-transfer)                   | <Badge color="green" size="sm" stroke>POST</Badge> `/transfers`          |
| [Retrieve Transfer](/api-reference/beta/transfers/retrieve-transfer)               | <Badge color="blue" size="sm" stroke>GET</Badge> `/transfers/{id}`       |
| [List Transfer Recipients](/api-reference/beta/transfers/list-transfer-recipients) | <Badge color="blue" size="sm" stroke>GET</Badge> `/transfers/recipients` |

## Attributes

<Columns cols={2}>
  <Column>
    <ResponseField name="id" type="string" required>
      Transfer ID.
    </ResponseField>

    <ResponseField name="amount" type="number" required>
      Transfer amount.
    </ResponseField>

    <ResponseField name="created_at" type="string" required>
      When the transfer was created.
    </ResponseField>

    <ResponseField name="created_by_user" type="object | null" required>
      The user who initiated the transfer, such as the team member who sent a manual payout. Null if the creator is unavailable.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          User ID.
        </ResponseField>

        <ResponseField name="name" type="string | null">
          User display name.
        </ResponseField>

        <ResponseField name="username" type="string" required>
          User's username.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="currency" type="string" required>
      Transfer currency.
    </ResponseField>

    <ResponseField name="destination" type="object" required>
      Account or user receiving funds.
    </ResponseField>

    <ResponseField name="destination_ledger_account_id" type="string" required>
      Destination ledger account ID.
    </ResponseField>

    <ResponseField name="failed_at" type="string | null">
      When the transfer failed, as an ISO 8601 timestamp. Null unless the transfer
      has failed.
    </ResponseField>

    <ResponseField name="failure_code" type="string | null">
      Machine-readable code for why the transfer failed. Null unless the transfer
      has failed.
    </ResponseField>

    <ResponseField name="failure_reason" type="string | null">
      Human-readable explanation of why the transfer failed. Null unless the
      transfer has failed.
    </ResponseField>

    <ResponseField name="fee_amount" type="number | null">
      Fee charged for the transfer.
    </ResponseField>

    <ResponseField name="metadata" type="object | null">
      Custom metadata attached to the transfer.
    </ResponseField>

    <ResponseField name="notes" type="string | null">
      Transfer note.
    </ResponseField>

    <ResponseField name="object" type="string" required>
      The object type. Discriminates the create response from a send or a claim
      link.
    </ResponseField>

    <ResponseField name="origin" type="object" required>
      Account or user sending funds.
    </ResponseField>

    <ResponseField name="origin_ledger_account_id" type="string" required>
      Source ledger account ID.
    </ResponseField>

    <ResponseField name="status" type="string" required>
      Transfer status. `processing` means the on-chain leg is still executing — poll the transfer until it resolves to `succeeded` or `failed`. A `failed` transfer may be retried under the same ID and later resolve to `succeeded`.

      Available options: `processing`, `succeeded`, `failed`
    </ResponseField>
  </Column>

  <Column>
    <div className="api-resource-sticky-example">
      ```json Transfer theme={null}
      {
      	"id": "tr_xxxxxxxxxxxxx",
      	"amount": 50,
      	"created_at": "2026-06-01T12:00:00Z",
      	"created_by_user": {
      		"id": "user_xxxxxxxxxxxxx",
      		"name": "Jordan Lee",
      		"username": "jordan"
      	},
      	"currency": "usd",
      	"destination": {
      		"id": "user_xxxxxxxxxxxxx",
      		"name": "Alex Rivera",
      		"typename": "User",
      		"username": "alex"
      	},
      	"destination_ledger_account_id": "la_destxxxxxxxx",
      	"fee_amount": null,
      	"metadata": {
      		"external_transfer_id": "transfer_123"
      	},
      	"notes": "Creator bonus",
      	"object": "transfer",
      	"origin": {
      		"id": "biz_xxxxxxxxxxxxxx",
      		"route": "pickaxe",
      		"title": "Pickaxe",
      		"typename": "Company"
      	},
      	"origin_ledger_account_id": "la_originxxxxxx",
      	"status": "succeeded"
      }
      ```
    </div>
  </Column>
</Columns>
