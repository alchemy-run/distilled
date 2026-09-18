> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Payout Method

> A configured payout destination where a user receives earned funds, such as a bank account or digital wallet.

<ResponseExample>
  ```json Example theme={null}
  {
  	"account_reference": "****1234",
  	"company": {
  		"id": "biz_xxxxxxxxxxxxxx"
  	},
  	"created_at": "2023-12-01T05:00:00.401Z",
  	"currency": "USD",
  	"destination": {
  		"category": "crypto",
  		"country_code": "<string>",
  		"name": "<string>"
  	},
  	"id": "potk_xxxxxxxxxxxxx",
  	"institution_name": "Frost Bank",
  	"is_default": true,
  	"nickname": "Ops checking"
  }
  ```
</ResponseExample>

<ResponseField name="account_reference" type="string | null" required>
  A masked identifier for the payout destination, such as the last four digits of a bank account or an email address. Null if no reference is available.

  Example: `****1234`
</ResponseField>

<ResponseField name="company" type="object | null" required>
  The company associated with this payout destination. Null if not linked to a specific company.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the company.

      Example: `biz_xxxxxxxxxxxxxx`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="created_at" type="string<date-time>" required>
  The datetime the payout token was created.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="currency" type="string" required>
  The three-letter ISO currency code that payouts are delivered in for this destination.

  Example: `USD`
</ResponseField>

<ResponseField name="destination" type="object | null" required>
  The payout destination configuration linked to this token. Null if not yet configured.

  <Expandable title="child attributes">
    <ResponseField name="category" type="PayoutDestinationCategory" required>
      The category of the payout destination

      Available options: `crypto`, `rtp`, `next_day_bank`, `bank_wire`, `digital_wallet`, `unknown`
    </ResponseField>

    <ResponseField name="country_code" type="string" required>
      The country code of the payout destination
    </ResponseField>

    <ResponseField name="name" type="string" required>
      The name of the payer associated with the payout destination
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the payout token.

  Example: `potk_xxxxxxxxxxxxx`
</ResponseField>

<ResponseField name="institution_name" type="string | null" required>
  The name of the bank or financial institution receiving payouts. Null if not applicable or not provided.

  Example: `Frost Bank`
</ResponseField>

<ResponseField name="is_default" type="boolean" required>
  Whether this is the default payout destination for the associated payout
  account.
</ResponseField>

<ResponseField name="nickname" type="string | null" required>
  A user-defined label to help identify this payout destination. Not sent to the provider. Null if no nickname has been set.

  Example: `Ops checking`
</ResponseField>
