> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Card Transaction

> A card transaction record.

<ResponseExample>
  ```json Example theme={null}
  {
  	"authorization_method": "ecommerce",
  	"card_id": "<string>",
  	"cashback_usd_amount": 6.9,
  	"created_at": "2023-12-01T05:00:00.401Z",
  	"currency": "USD",
  	"declined_reason": "insufficient_funds",
  	"id": "<string>",
  	"international": true,
  	"local_amount": 6.9,
  	"memo": "Team dinner",
  	"merchant_category": "Software",
  	"merchant_category_code": "5734",
  	"merchant_icon_url": "https://logo.clearbit.com/example.com",
  	"merchant_name": "Acme Corporation",
  	"posted_at": "2023-12-01T05:00:00.401Z",
  	"status": "pending",
  	"transaction_type": "spend",
  	"usd_amount": 6.9
  }
  ```
</ResponseExample>

<ResponseField name="authorization_method" type="string | null" required>
  How the card was presented or authenticated for the purchase.

  Example: `ecommerce`
</ResponseField>

<ResponseField name="card_id" type="string" required />

<ResponseField name="cashback_usd_amount" type="number | null" required>
  The cashback reward amount earned on this transaction, in USD.

  Example: `6.9`
</ResponseField>

<ResponseField name="created_at" type="string<date-time>" required>
  The datetime the card transaction was created.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="currency" type="string | null" required>
  The ISO 4217 currency code for the transaction amount.

  Example: `USD`
</ResponseField>

<ResponseField name="declined_reason" type="string | null" required>
  The issuer-provided reason the transaction was declined.

  Example: `insufficient_funds`
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the card transaction.
</ResponseField>

<ResponseField name="international" type="boolean" required>
  Whether the transaction was made with a merchant outside the card's home
  country.
</ResponseField>

<ResponseField name="local_amount" type="number | null" required>
  The transaction amount in the merchant's local currency before conversion.

  Example: `6.9`
</ResponseField>

<ResponseField name="memo" type="string | null" required>
  A user-provided note attached to the transaction.

  Example: `Team dinner`
</ResponseField>

<ResponseField name="merchant_category" type="string | null" required>
  The enriched or raw category label for the merchant.

  Example: `Software`
</ResponseField>

<ResponseField name="merchant_category_code" type="string | null" required>
  The four-digit ISO 18245 merchant category code (MCC).

  Example: `5734`
</ResponseField>

<ResponseField name="merchant_icon_url" type="string | null" required>
  A URL to the enriched merchant logo image.

  Example: `https://logo.clearbit.com/example.com`
</ResponseField>

<ResponseField name="merchant_name" type="string | null" required>
  The enriched or raw name of the merchant where the purchase was made.

  Example: `Acme Corporation`
</ResponseField>

<ResponseField name="posted_at" type="string<date-time> | null" required>
  When the transaction was settled by the card network.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="status" type="CardIssuingTransactionStatus" required>
  The current lifecycle status of the transaction.

  Available options: `pending`, `completed`, `reversed`, `declined`
</ResponseField>

<ResponseField name="transaction_type" type="string" required>
  The type of transaction.

  Example: `spend`
</ResponseField>

<ResponseField name="usd_amount" type="number | null" required>
  The transaction amount in USD.

  Example: `6.9`
</ResponseField>
