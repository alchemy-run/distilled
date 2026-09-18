> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Promo Code

> A promo code applies a discount to a plan during checkout. Promo codes can be percentage-based or fixed-amount, and can have usage limits and expiration dates.

<Note>
  This resource has a successor in the [Whop
  API](/api-reference/beta/promo-codes/list-promo-codes), the versioned API that
  new integrations should build on. This page stays fully supported.
</Note>

<ResponseExample>
  ```json Example theme={null}
  {
  	"amount_off": 6.9,
  	"churned_users_only": true,
  	"code": "<string>",
  	"company": {
  		"id": "biz_xxxxxxxxxxxxxx",
  		"title": "<string>"
  	},
  	"created_at": "2023-12-01T05:00:00.401Z",
  	"currency": "usd",
  	"duration": "forever",
  	"existing_memberships_only": true,
  	"expires_at": "2023-12-01T05:00:00.401Z",
  	"id": "promo_xxxxxxxxxxxx",
  	"new_users_only": true,
  	"one_per_customer": true,
  	"product": {
  		"id": "prod_xxxxxxxxxxxxx",
  		"title": "Pickaxe Analytics"
  	},
  	"promo_duration_months": 42,
  	"promo_type": "percentage",
  	"status": "active",
  	"stock": 42,
  	"unlimited_stock": true,
  	"uses": 42
  }
  ```
</ResponseExample>

<ResponseField name="amount_off" type="number" required>
  The discount amount. Interpretation depends on promo\_type: if 'percentage', this is the percentage (e.g., 20 means 20% off); if 'flat\_amount', this is dollars off (e.g., 10.00 means \$10.00 off).

  Example: `6.9`
</ResponseField>

<ResponseField name="churned_users_only" type="boolean" required>
  Restricts promo use to only users who have churned from the company before.
</ResponseField>

<ResponseField name="code" type="string | null" required>
  The specific code used to apply the promo at checkout.
</ResponseField>

<ResponseField name="company" type="object" required>
  The company for the promo code.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the company.

      Example: `biz_xxxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="title" type="string" required>
      The written name of the company.
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="created_at" type="string<date-time>" required>
  The datetime the promo code was created.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="currency" type="Currencies" required>
  The monetary currency of the promo code.

  Available options: `usd`, `sgd`, `inr`, `aud`, `brl`, `cad`, `dkk`, `eur`, `nok`, `gbp`, `sek`, `chf`, `hkd`, `huf`, `jpy`, `mxn`, `myr`, `pln`, `czk`, `nzd`, `aed`, `eth`, `ape`, `cop`, `ron`, `thb`, `bgn`, `idr`, `dop`, `php`, `try`, `krw`, `twd`, `vnd`, `pkr`, `clp`, `uyu`, `ars`, `zar`, `dzd`, `tnd`, `mad`, `kes`, `kwd`, `jod`, `all`, `xcd`, `amd`, `bsd`, `bhd`, `bob`, `bam`, `khr`, `crc`, `xof`, `egp`, `etb`, `gmd`, `ghs`, `gtq`, `gyd`, `ils`, `jmd`, `mop`, `mga`, `mur`, `mdl`, `mnt`, `nad`, `ngn`, `mkd`, `omr`, `pyg`, `pen`, `qar`, `rwf`, `sar`, `rsd`, `lkr`, `tzs`, `ttd`, `uzs`, `rub`, `btc`, `cny`, `usdt`, `kzt`, `awg`, `whop_usd`, `xau`
</ResponseField>

<ResponseField name="duration" type="PromoDurations | null" required>
  The duration of the promo.

  Available options: `forever`, `once`, `repeating`
</ResponseField>

<ResponseField name="existing_memberships_only" type="boolean" required>
  Restricts promo use to only be applied to already purchased memberships.
</ResponseField>

<ResponseField name="expires_at" type="string<date-time> | null" required>
  The date/time of when the promo expires.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the promo code.

  Example: `promo_xxxxxxxxxxxx`
</ResponseField>

<ResponseField name="new_users_only" type="boolean" required>
  Restricts promo use to only users who have never purchased from the company
  before.
</ResponseField>

<ResponseField name="one_per_customer" type="boolean" required>
  Restricts promo use to only be applied once per customer.
</ResponseField>

<ResponseField name="product" type="object | null" required>
  The product this promo code applies to

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

<ResponseField name="promo_duration_months" type="integer | null" required>
  The number of months the promo is applied for.

  Example: `42`
</ResponseField>

<ResponseField name="promo_type" type="PromoTypes" required>
  The type (% or flat amount) of the promo.

  Available options: `percentage`, `flat_amount`
</ResponseField>

<ResponseField name="status" type="PromoCodeStatus" required>
  Indicates if the promo code is live or disabled.

  Available options: `active`, `inactive`, `archived`
</ResponseField>

<ResponseField name="stock" type="integer" required>
  The quantity limit on the number of uses.

  Example: `42`
</ResponseField>

<ResponseField name="unlimited_stock" type="boolean" required>
  Whether or not the promo code has unlimited stock.
</ResponseField>

<ResponseField name="uses" type="integer" required>
  The amount of times the promo codes has been used.

  Example: `42`
</ResponseField>
