> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Resolution Center Case

> A resolution center case is a dispute or support case between a user and a company, tracking the issue, status, and outcome.

<Note>
  This resource has a successor in the [Whop
  API](/api-reference/beta/resolution-center-cases/list-resolution-center-cases),
  the versioned API that new integrations should build on. This page stays fully
  supported.
</Note>

<ResponseExample>
  ```json Example theme={null}
  {
  	"company": {
  		"id": "biz_xxxxxxxxxxxxxx",
  		"title": "Pickaxe"
  	},
  	"created_at": "2023-12-01T05:00:00.401Z",
  	"customer_appealed": true,
  	"customer_response_actions": ["respond"],
  	"due_date": "2023-12-01T05:00:00.401Z",
  	"id": "reso_xxxxxxxxxxxxx",
  	"issue": "forgot_to_cancel",
  	"member": {
  		"id": "<string>"
  	},
  	"merchant_appealed": true,
  	"merchant_response_actions": ["accept"],
  	"payment": {
  		"created_at": "2023-12-01T05:00:00.401Z",
  		"currency": "usd",
  		"id": "pay_xxxxxxxxxxxxxx",
  		"paid_at": "2023-12-01T05:00:00.401Z",
  		"subtotal": 6.9,
  		"total": 6.9
  	},
  	"platform_response_actions": ["request_buyer_info"],
  	"resolution_events": [
  		{
  			"action": "created",
  			"created_at": "2023-12-01T05:00:00.401Z",
  			"details": "I did not authorize this purchase.",
  			"id": "revt_xxxxxxxxxxxxx",
  			"reporter_type": "merchant"
  		}
  	],
  	"status": "merchant_response_needed",
  	"updated_at": "2023-12-01T05:00:00.401Z",
  	"user": {
  		"id": "user_xxxxxxxxxxxxx",
  		"name": "John Doe",
  		"username": "johndoe42"
  	}
  }
  ```
</ResponseExample>

<ResponseField name="company" type="object | null" required>
  The company involved in this resolution case. Null if the company no longer exists.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the company.

      Example: `biz_xxxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="title" type="string" required>
      The display name of the company shown to customers.

      Example: `Pickaxe`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="created_at" type="string<date-time>" required>
  The datetime the resolution was created.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="customer_appealed" type="boolean" required>
  Whether the customer has filed an appeal after the initial resolution
  decision.
</ResponseField>

<ResponseField name="customer_response_actions" type="array<ResolutionCenterCaseCustomerResponses>" required>
  The list of actions currently available to the customer.

  Available options: `respond`, `appeal`, `withdraw`
</ResponseField>

<ResponseField name="due_date" type="string<date-time> | null" required>
  The deadline by which the next response is required. Null if no deadline is currently active. As a Unix timestamp.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the resolution.

  Example: `reso_xxxxxxxxxxxxx`
</ResponseField>

<ResponseField name="issue" type="ResolutionCenterCaseIssueTypes" required>
  The category of the dispute.

  Available options: `forgot_to_cancel`, `item_not_received`, `significantly_not_as_described`, `unauthorized_transaction`, `product_unacceptable`
</ResponseField>

<ResponseField name="member" type="object | null" required>
  The membership record associated with the disputed payment. Null if the membership no longer exists.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the extra public member.
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="merchant_appealed" type="boolean" required>
  Whether the merchant has filed an appeal after the initial resolution
  decision.
</ResponseField>

<ResponseField name="merchant_response_actions" type="array<ResolutionCenterCaseMerchantResponses>" required>
  The list of actions currently available to the merchant.

  Available options: `accept`, `deny`, `request_more_info`, `appeal`, `respond`
</ResponseField>

<ResponseField name="payment" type="object" required>
  The payment record that is the subject of this resolution case.

  <Expandable title="child attributes">
    <ResponseField name="created_at" type="string<date-time>" required>
      The datetime the payment was created.

      Example: `2023-12-01T05:00:00.401Z`
    </ResponseField>

    <ResponseField name="currency" type="Currencies | null" required>
      The three-letter ISO currency code for this payment (e.g., 'usd', 'eur').

      Available options: `usd`, `sgd`, `inr`, `aud`, `brl`, `cad`, `dkk`, `eur`, `nok`, `gbp`, `sek`, `chf`, `hkd`, `huf`, `jpy`, `mxn`, `myr`, `pln`, `czk`, `nzd`, `aed`, `eth`, `ape`, `cop`, `ron`, `thb`, `bgn`, `idr`, `dop`, `php`, `try`, `krw`, `twd`, `vnd`, `pkr`, `clp`, `uyu`, `ars`, `zar`, `dzd`, `tnd`, `mad`, `kes`, `kwd`, `jod`, `all`, `xcd`, `amd`, `bsd`, `bhd`, `bob`, `bam`, `khr`, `crc`, `xof`, `egp`, `etb`, `gmd`, `ghs`, `gtq`, `gyd`, `ils`, `jmd`, `mop`, `mga`, `mur`, `mdl`, `mnt`, `nad`, `ngn`, `mkd`, `omr`, `pyg`, `pen`, `qar`, `rwf`, `sar`, `rsd`, `lkr`, `tzs`, `ttd`, `uzs`, `rub`, `btc`, `cny`, `usdt`, `kzt`, `awg`, `whop_usd`, `xau`
    </ResponseField>

    <ResponseField name="id" type="string" required>
      The unique identifier for the payment.

      Example: `pay_xxxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="paid_at" type="string<date-time> | null" required>
      The time at which this payment was successfully collected. Null if the payment has not yet succeeded. As a Unix timestamp.

      Example: `2023-12-01T05:00:00.401Z`
    </ResponseField>

    <ResponseField name="subtotal" type="number | null" required>
      The payment amount before taxes and discounts are applied. In the currency specified by the currency field.

      Example: `6.9`
    </ResponseField>

    <ResponseField name="total" type="number" required>
      The total amount charged to the customer for this payment, including taxes and after any discounts. In the currency specified by the currency field.

      Example: `6.9`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="platform_response_actions" type="array<ResolutionCenterCasePlatformResponses>" required>
  The list of actions currently available to the Whop platform for moderating this resolution.

  Available options: `request_buyer_info`, `request_merchant_info`, `merchant_wins`, `merchant_refund`
</ResponseField>

<ResponseField name="resolution_events" type="array<object>" required>
  The most recent 50 messages, actions, and status changes that have occurred during this resolution case.

  <Expandable title="child attributes">
    <ResponseField name="action" type="ResolutionCenterCaseActions" required>
      The type of action recorded in this event.

      Available options: `created`, `responded`, `accepted`, `denied`, `appealed`, `withdrew`, `requested_more_info`, `escalated`, `dispute_opened`, `dispute_customer_won`, `dispute_merchant_won`
    </ResponseField>

    <ResponseField name="created_at" type="string<date-time>" required>
      The datetime the resolution event was created.

      Example: `2023-12-01T05:00:00.401Z`
    </ResponseField>

    <ResponseField name="details" type="string | null" required>
      The message body or additional context provided with this resolution event. Null if no details were included.

      Example: `I did not authorize this purchase.`
    </ResponseField>

    <ResponseField name="id" type="string" required>
      The unique identifier for the resolution event.

      Example: `revt_xxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="reporter_type" type="ResolutionCenterCaseReporters" required>
      The party who performed this action.

      Available options: `merchant`, `customer`, `platform`, `system`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="status" type="ResolutionCenterCaseStatuses" required>
  The current status of the resolution case, indicating which party needs to respond or if the case is closed.

  Available options: `merchant_response_needed`, `customer_response_needed`, `merchant_info_needed`, `customer_info_needed`, `under_platform_review`, `customer_won`, `merchant_won`, `customer_withdrew`
</ResponseField>

<ResponseField name="updated_at" type="string<date-time>" required>
  The datetime the resolution was last updated.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="user" type="object" required>
  The customer (buyer) who filed this resolution case.

  <Expandable title="child attributes">
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
