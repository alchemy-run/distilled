> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Fee Markup

> A fee markup configuration that defines additional charges applied to transactions for a platform's connected accounts.

<ResponseExample>
  ```json Example theme={null}
  {
  	"created_at": "2023-12-01T05:00:00.401Z",
  	"fee_type": "crypto_withdrawal_markup",
  	"fixed_fee_usd": 6.9,
  	"id": "<string>",
  	"notes": "Approved by finance team on 2024-01-15",
  	"percentage_fee": 6.9,
  	"updated_at": "2023-12-01T05:00:00.401Z"
  }
  ```
</ResponseExample>

<ResponseField name="created_at" type="string<date-time>" required>
  The datetime the fee markup was created.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="fee_type" type="FeeMarkupTypes" required>
  The category of fee this markup applies to.

  Available options: `crypto_withdrawal_markup`, `rtp_withdrawal_markup`, `next_day_bank_withdrawal_markup`, `bank_wire_withdrawal_markup`, `digital_wallet_withdrawal_markup`
</ResponseField>

<ResponseField name="fixed_fee_usd" type="number | null" required>
  A flat fee charged per transaction, in USD. Ranges from 0 to 50. Null if no fixed fee is configured.

  Example: `6.9`
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the fee markup.
</ResponseField>

<ResponseField name="notes" type="string | null" required>
  Internal notes about this fee markup, visible only to administrators. Null if no notes have been added.

  Example: `Approved by finance team on 2024-01-15`
</ResponseField>

<ResponseField name="percentage_fee" type="number | null" required>
  A percentage-based fee charged per transaction. Ranges from 0 to 25. Null if no percentage fee is configured.

  Example: `6.9`
</ResponseField>

<ResponseField name="updated_at" type="string<date-time>" required>
  The datetime the fee markup was last updated.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>
