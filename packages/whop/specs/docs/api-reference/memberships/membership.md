> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Membership

> A membership represents an active relationship between a user and a product. It tracks the user's access, billing status, and renewal schedule.

<Note>
  This resource has a successor in the [Whop
  API](/api-reference/beta/memberships/membership), the versioned API that new
  integrations should build on. This page stays fully supported.
</Note>

<ResponseExample>
  ```json Example theme={null}
  {
  	"cancel_at_period_end": true,
  	"cancel_option": "too_expensive",
  	"cancelation_status": "won_back",
  	"canceled_at": "2023-12-01T05:00:00.401Z",
  	"cancellation_reason": "I found a better alternative.",
  	"checkout_configuration_id": "ch_xxxxxxxxxxxxxxx",
  	"company": {
  		"id": "biz_xxxxxxxxxxxxxx",
  		"title": "Pickaxe"
  	},
  	"created_at": "2023-12-01T05:00:00.401Z",
  	"currency": "usd",
  	"custom_field_responses": [
  		{
  			"answer": "<string>",
  			"id": "cfrp_xxxxxxxxxxxxx",
  			"question": "<string>"
  		}
  	],
  	"formatted_renewal_price": "$25.00 / month",
  	"id": "mem_xxxxxxxxxxxxxx",
  	"initial_price_paid": "$25.00",
  	"joined_at": "2023-12-01T05:00:00.401Z",
  	"license_key": "A1B2C3-D4E5F6-G7H8I9",
  	"manage_url": "https://whop.com/billing/manage/mem_abc123",
  	"member": {
  		"id": "mber_xxxxxxxxxxxxx"
  	},
  	"metadata": {},
  	"payment_collection_paused": true,
  	"plan": {
  		"id": "plan_xxxxxxxxxxxxx",
  		"metadata": {}
  	},
  	"product": {
  		"id": "prod_xxxxxxxxxxxxx",
  		"metadata": {},
  		"title": "Pickaxe Analytics"
  	},
  	"promo_code": {
  		"id": "promo_xxxxxxxxxxxx"
  	},
  	"renewal_period_end": "2023-12-01T05:00:00.401Z",
  	"renewal_period_start": "2023-12-01T05:00:00.401Z",
  	"status": "trialing",
  	"updated_at": "2023-12-01T05:00:00.401Z",
  	"user": {
  		"email": "john.doe@example.com",
  		"id": "user_xxxxxxxxxxxxx",
  		"name": "John Doe",
  		"profile_pic": "<string>",
  		"username": "johndoe42"
  	}
  }
  ```
</ResponseExample>

<ResponseField name="cancel_at_period_end" type="boolean" required>
  Whether this membership is set to cancel at the end of the current billing
  cycle. Only applies to memberships with a recurring plan.
</ResponseField>

<ResponseField name="cancel_option" type="CancelOptions | null" required>
  The category selected for why the member canceled (e.g. too\_expensive, switching, missing\_features).

  Available options: `too_expensive`, `switching`, `missing_features`, `technical_issues`, `bad_experience`, `other`, `testing`
</ResponseField>

<ResponseField name="cancelation_status" type="CancelationStatus | null" required>
  Whether the customer is canceling, left, or was won back. Null if the membership has no cancellation reason or its cancellation state is indeterminate.

  Available options: `won_back`, `left`, `canceling`
</ResponseField>

<ResponseField name="canceled_at" type="string<date-time> | null" required>
  The time the customer initiated cancellation of this membership. As a Unix timestamp. Null if the membership has not been canceled.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="cancellation_reason" type="string | null" required>
  Free-text explanation provided by the customer when canceling. Null if the customer did not provide a reason.

  Example: `I found a better alternative.`
</ResponseField>

<ResponseField name="checkout_configuration_id" type="string | null" required>
  The ID of the checkout session/configuration that produced this membership, if any. Use this to map memberships back to the checkout configuration that created them.

  Example: `ch_xxxxxxxxxxxxxxx`
</ResponseField>

<ResponseField name="company" type="object" required>
  The company this membership belongs to.

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
  The datetime the membership was created.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="currency" type="Currencies | null" required>
  The three-letter ISO currency code for this membership's billing. Null if the membership is free.

  Available options: `usd`, `sgd`, `inr`, `aud`, `brl`, `cad`, `dkk`, `eur`, `nok`, `gbp`, `sek`, `chf`, `hkd`, `huf`, `jpy`, `mxn`, `myr`, `pln`, `czk`, `nzd`, `aed`, `eth`, `ape`, `cop`, `ron`, `thb`, `bgn`, `idr`, `dop`, `php`, `try`, `krw`, `twd`, `vnd`, `pkr`, `clp`, `uyu`, `ars`, `zar`, `dzd`, `tnd`, `mad`, `kes`, `kwd`, `jod`, `all`, `xcd`, `amd`, `bsd`, `bhd`, `bob`, `bam`, `khr`, `crc`, `xof`, `egp`, `etb`, `gmd`, `ghs`, `gtq`, `gyd`, `ils`, `jmd`, `mop`, `mga`, `mur`, `mdl`, `mnt`, `nad`, `ngn`, `mkd`, `omr`, `pyg`, `pen`, `qar`, `rwf`, `sar`, `rsd`, `lkr`, `tzs`, `ttd`, `uzs`, `rub`, `btc`, `cny`, `usdt`, `kzt`, `awg`, `whop_usd`, `xau`
</ResponseField>

<ResponseField name="custom_field_responses" type="array<object>" required>
  The customer's responses to custom checkout questions configured on the product at the time of purchase.

  <Expandable title="child attributes">
    <ResponseField name="answer" type="string" required>
      The response a user gave to the specific question or field.
    </ResponseField>

    <ResponseField name="id" type="string" required>
      The unique identifier for the custom field response.

      Example: `cfrp_xxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="question" type="string" required>
      The question asked by the custom field
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="formatted_renewal_price" type="string | null" required>
  The recurring renewal price for this membership, formatted with currency symbol and billing interval. Null if the membership is not recurring.

  Example: `$25.00 / month`
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the membership.

  Example: `mem_xxxxxxxxxxxxxx`
</ResponseField>

<ResponseField name="initial_price_paid" type="string" required>
  The amount the customer paid when first purchasing this membership, formatted with currency symbol.

  Example: `$25.00`
</ResponseField>

<ResponseField name="joined_at" type="string<date-time> | null" required>
  The time the user first joined the company associated with this membership. As a Unix timestamp. Null if the member record does not exist.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="license_key" type="string | null" required>
  The software license key associated with this membership. Only present if the product includes a Whop Software Licensing experience. Null otherwise.

  Example: `A1B2C3-D4E5F6-G7H8I9`
</ResponseField>

<ResponseField name="manage_url" type="string | null" required>
  The URL where the customer can view and manage this membership, including cancellation and plan changes. Null if no member record exists.

  Example: `https://whop.com/billing/manage/mem_abc123`
</ResponseField>

<ResponseField name="member" type="object | null" required>
  The member record linking the user to the company for this membership. Null if the member record has not been created yet.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the member.

      Example: `mber_xxxxxxxxxxxxx`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="metadata" type="object | null" required>
  Custom key-value pairs for the membership (commonly used for software
  licensing, e.g., HWID). Max 50 keys, 100 chars per key, 500 chars per string
  value.
</ResponseField>

<ResponseField name="payment_collection_paused" type="boolean" required>
  Whether recurring payment collection for this membership is temporarily paused
  by the company.
</ResponseField>

<ResponseField name="plan" type="object" required>
  The plan the customer purchased to create this membership.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the plan.

      Example: `plan_xxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="metadata" type="object | null" required>
      Custom key-value pairs stored on the plan. Included in webhook payloads for payment and membership events. Max 50 keys, 100 chars per key, 500 chars per string value. The reserved keys `custom_cta` and `custom_cta_url`, when set, override the product's checkout call to action for this plan.
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="product" type="object" required>
  The product this membership grants access to.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the product.

      Example: `prod_xxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="metadata" type="object | null" required>
      Custom key-value pairs stored on the product and included in payment and
      membership webhook payloads. Max 50 keys, 100 characters per key, 500
      characters per string value.
    </ResponseField>

    <ResponseField name="title" type="string" required>
      The display name of the product shown to customers on the product page and in search results.

      Example: `Pickaxe Analytics`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="promo_code" type="object | null" required>
  The promotional code currently applied to this membership's billing. Null if no promo code is active.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the promo code.

      Example: `promo_xxxxxxxxxxxx`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="renewal_period_end" type="string<date-time> | null" required>
  The end of the current billing period for this recurring membership. As a Unix timestamp. Null if the membership is not recurring.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="renewal_period_start" type="string<date-time> | null" required>
  The start of the current billing period for this recurring membership. As a Unix timestamp. Null if the membership is not recurring.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="status" type="MembershipStatus" required>
  The current lifecycle status of the membership (e.g., active, trialing, past\_due, canceled, expired, completed).

  Available options: `trialing`, `active`, `past_due`, `completed`, `canceled`, `expired`, `unresolved`, `drafted`, `canceling`
</ResponseField>

<ResponseField name="updated_at" type="string<date-time>" required>
  The datetime the membership was last updated.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="user" type="object | null" required>
  The user who owns this membership. Null if the user account has been deleted.

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

    <ResponseField name="profile_pic" type="string" required>
      The URL of the user's profile picture. Use profilePicture for the full
      attachment object.
    </ResponseField>

    <ResponseField name="username" type="string" required>
      The user's unique username shown on their public profile.

      Example: `johndoe42`
    </ResponseField>
  </Expandable>
</ResponseField>
