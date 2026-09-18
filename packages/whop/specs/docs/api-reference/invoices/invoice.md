> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Invoice

> An invoice represents an itemized bill sent by a company to a customer for a specific product and plan, tracking the amount owed, due date, and payment status.

<ResponseExample>
  ```json Example theme={null}
  {
  	"automatically_finalizes_at": "2023-12-01T05:00:00.401Z",
  	"charge_buyer_fee": true,
  	"collection_method": "send_invoice",
  	"company": {
  		"id": "biz_xxxxxxxxxxxxxx"
  	},
  	"created_at": "2023-12-01T05:00:00.401Z",
  	"current_plan": {
  		"currency": "usd",
  		"description": "Monthly access to all premium analytics dashboards and data exports.",
  		"formatted_price": "$10.00",
  		"id": "plan_xxxxxxxxxxxxx"
  	},
  	"customer_name": "Jane Doe",
  	"due_date": "2023-12-01T05:00:00.401Z",
  	"email_address": "customer@example.com",
  	"fetch_invoice_token": "eyJhbGciOiJIUzI1NiJ9...",
  	"id": "inv_xxxxxxxxxxxxxx",
  	"line_items": [
  		{
  			"label": "Platform subscription",
  			"position": 42,
  			"quantity": 6.9,
  			"total": 6.9,
  			"unit_price": 6.9
  		}
  	],
  	"mailing_address": {
  		"city": "<string>",
  		"country": "<string>",
  		"line1": "<string>",
  		"line2": "<string>",
  		"name": "<string>",
  		"phone": "<string>",
  		"postal_code": "<string>",
  		"state": "<string>"
  	},
  	"member": {
  		"id": "<string>"
  	},
  	"number": "#0001",
  	"pay_online_url": "<string>",
  	"payment": {
  		"id": "pay_xxxxxxxxxxxxxx"
  	},
  	"payment_processing": true,
  	"product": {
  		"id": "prod_xxxxxxxxxxxxx",
  		"title": "Pickaxe Analytics"
  	},
  	"status": "draft",
  	"subscription_billing_anchor_at": "2023-12-01T05:00:00.401Z",
  	"updated_at": "2023-12-01T05:00:00.401Z",
  	"user": {
  		"email": "john.doe@example.com",
  		"id": "user_xxxxxxxxxxxxx",
  		"name": "John Doe",
  		"username": "johndoe42"
  	}
  }
  ```
</ResponseExample>

<ResponseField name="automatically_finalizes_at" type="string<date-time> | null" required>
  The date and time when the invoice will be automatically finalized. For charge\_automatically, triggers an automatic charge. For send\_invoice, sends the invoice email at the specified time.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="charge_buyer_fee" type="boolean" required>
  Whether the invoice includes a buyer processing fee on top of the plan price.
</ResponseField>

<ResponseField name="collection_method" type="InvoiceCollectionMethods" required>
  The method used to collect payment for this invoice, such as automatic charging or manual payment.

  Available options: `send_invoice`, `charge_automatically`
</ResponseField>

<ResponseField name="company" type="object" required>
  The company that issued this invoice.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the company.

      Example: `biz_xxxxxxxxxxxxxx`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="created_at" type="string<date-time>" required>
  The datetime the invoice was created.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="current_plan" type="object" required>
  The plan that this invoice charges for.

  <Expandable title="child attributes">
    <ResponseField name="currency" type="Currencies" required>
      The currency used for all prices on this plan (e.g., 'usd', 'eur'). All monetary amounts on the plan are denominated in this currency.

      Available options: `usd`, `sgd`, `inr`, `aud`, `brl`, `cad`, `dkk`, `eur`, `nok`, `gbp`, `sek`, `chf`, `hkd`, `huf`, `jpy`, `mxn`, `myr`, `pln`, `czk`, `nzd`, `aed`, `eth`, `ape`, `cop`, `ron`, `thb`, `bgn`, `idr`, `dop`, `php`, `try`, `krw`, `twd`, `vnd`, `pkr`, `clp`, `uyu`, `ars`, `zar`, `dzd`, `tnd`, `mad`, `kes`, `kwd`, `jod`, `all`, `xcd`, `amd`, `bsd`, `bhd`, `bob`, `bam`, `khr`, `crc`, `xof`, `egp`, `etb`, `gmd`, `ghs`, `gtq`, `gyd`, `ils`, `jmd`, `mop`, `mga`, `mur`, `mdl`, `mnt`, `nad`, `ngn`, `mkd`, `omr`, `pyg`, `pen`, `qar`, `rwf`, `sar`, `rsd`, `lkr`, `tzs`, `ttd`, `uzs`, `rub`, `btc`, `cny`, `usdt`, `kzt`, `awg`, `whop_usd`, `xau`
    </ResponseField>

    <ResponseField name="description" type="string | null" required>
      A text description of the plan visible to customers. Maximum 1000 characters. Null if no description is set.

      Example: `Monthly access to all premium analytics dashboards and da…`
    </ResponseField>

    <ResponseField name="formatted_price" type="string" required>
      The formatted price (including currency) for the plan.

      Example: `$10.00`
    </ResponseField>

    <ResponseField name="id" type="string" required>
      The unique identifier for the plan.

      Example: `plan_xxxxxxxxxxxxx`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="customer_name" type="string | null" required>
  The full name of the customer this invoice is addressed to. Null if no name is on file.

  Example: `Jane Doe`
</ResponseField>

<ResponseField name="due_date" type="string<date-time> | null" required>
  The deadline by which payment is expected. Null if the invoice is collected automatically.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="email_address" type="string | null" required>
  The email address of the customer this invoice is addressed to. Null if no email is on file.

  Example: `customer@example.com`
</ResponseField>

<ResponseField name="fetch_invoice_token" type="string" required>
  A signed token that allows fetching invoice data publicly without authentication.

  Example: `eyJhbGciOiJIUzI1NiJ9...`
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the invoice.

  Example: `inv_xxxxxxxxxxxxxx`
</ResponseField>

<ResponseField name="line_items" type="array<object>" required>
  Optional line items that break down the invoice total into individual charges.

  <Expandable title="child attributes">
    <ResponseField name="label" type="string" required>
      The label or description for this line item.

      Example: `Platform subscription`
    </ResponseField>

    <ResponseField name="position" type="integer" required>
      The display order of this line item within the invoice.

      Example: `42`
    </ResponseField>

    <ResponseField name="quantity" type="number" required>
      The quantity of this line item.

      Example: `6.9`
    </ResponseField>

    <ResponseField name="total" type="number" required>
      The computed total for this line item (quantity \* unit\_price).

      Example: `6.9`
    </ResponseField>

    <ResponseField name="unit_price" type="number" required>
      The unit price for this line item. Negative for a credit or deduction.

      Example: `6.9`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="mailing_address" type="object | null" required>
  The billing/mailing address associated with this invoice, if one was provided at creation time.

  <Expandable title="child attributes">
    <ResponseField name="city" type="string | null" required>
      The city of the address.
    </ResponseField>

    <ResponseField name="country" type="string | null" required>
      The country of the address.
    </ResponseField>

    <ResponseField name="line1" type="string | null" required>
      The line 1 of the address.
    </ResponseField>

    <ResponseField name="line2" type="string | null" required>
      The line 2 of the address.
    </ResponseField>

    <ResponseField name="name" type="string | null" required>
      The name of the customer.
    </ResponseField>

    <ResponseField name="phone" type="string | null" required>
      The phone number of the customer.
    </ResponseField>

    <ResponseField name="postal_code" type="string | null" required>
      The postal code of the address.
    </ResponseField>

    <ResponseField name="state" type="string | null" required>
      The state of the address.
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="member" type="object | null" required>
  The member that the invoice was created for. Null when the invoice is addressed to an email address with no member record behind it.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the company member.
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="number" type="string" required>
  The sequential invoice number for display purposes.

  Example: `#0001`
</ResponseField>

<ResponseField name="pay_online_url" type="string | null" required>
  The checkout URL where the customer can pay this invoice online, with their
  email address pre-filled and locked.
</ResponseField>

<ResponseField name="payment" type="object | null" required>
  The payment that settled this invoice. Null while the invoice is unpaid, when the invoice was marked paid manually, and on a subscription renewal invoice, where the settling payment cannot yet be identified.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the payment.

      Example: `pay_xxxxxxxxxxxxxx`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="payment_processing" type="boolean" required>
  Whether a payment on this invoice is still clearing. True while a delayed
  payment method such as ACH or SEPA settles, during which the invoice stays
  open and is not marked past due.
</ResponseField>

<ResponseField name="product" type="object" required>
  The product that this invoice was generated for.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the product.

      Example: `prod_xxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="title" type="string" required>
      The display name of the product shown to customers on the product page and in search results.

      Example: `Pickaxe Analytics`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="status" type="InvoiceStatuses" required>
  The current payment status of the invoice, such as draft, open, paid, or void.

  Available options: `draft`, `open`, `paid`, `past_due`, `uncollectible`, `void`
</ResponseField>

<ResponseField name="subscription_billing_anchor_at" type="string<date-time> | null" required>
  The date that defines when the subscription billing cycle starts. When set on a renewal plan invoice, all future billing periods anchor to this date.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="updated_at" type="string<date-time>" required>
  The datetime the invoice was last updated.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="user" type="object | null" required>
  The user this invoice is addressed to. Null if the user account has been removed.

  <Expandable title="child attributes">
    <ResponseField name="email" type="string | null" required>
      The user's email address. Requires the member:email:read permission to access. Null if not authorized.

      Example: `john.doe@example.com`
    </ResponseField>

    <ResponseField name="id" type="string" required>
      The unique identifier for the user.

      Example: `user_xxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="name" type="string | null" required>
      The user's display name shown on their public profile.

      Example: `John Doe`
    </ResponseField>

    <ResponseField name="username" type="string" required>
      The user's unique username shown on their public profile.

      Example: `johndoe42`
    </ResponseField>
  </Expandable>
</ResponseField>
