> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Plan

A Plan defines how customers buy a product. It controls pricing, billing cadence, availability, tax behavior, checkout fields, and purchase visibility.

Use the Plans API to create plans for products, list existing plans, retrieve or update plan configuration, calculate tax for checkout, and delete plans that should no longer be offered.

## Endpoints

| Endpoint                                                 | Request                                                                        |
| -------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [List Plans](/api-reference/beta/plans/list-plans)       | <Badge color="blue" size="sm" stroke>GET</Badge> `/plans`                      |
| [Create Plan](/api-reference/beta/plans/create-plan)     | <Badge color="green" size="sm" stroke>POST</Badge> `/plans`                    |
| [Retrieve Plan](/api-reference/beta/plans/retrieve-plan) | <Badge color="blue" size="sm" stroke>GET</Badge> `/plans/{id}`                 |
| [Update Plan](/api-reference/beta/plans/update-plan)     | <Badge color="orange" size="sm" stroke>PATCH</Badge> `/plans/{id}`             |
| [Delete Plan](/api-reference/beta/plans/delete-plan)     | <Badge color="red" size="sm" stroke>DELETE</Badge> `/plans/{id}`               |
| [Calculate Tax](/api-reference/beta/plans/calculate-tax) | <Badge color="green" size="sm" stroke>POST</Badge> `/plans/{id}/calculate_tax` |

## Attributes

<Columns cols={2}>
  <Column>
    <ResponseField name="id" type="string" required>
      Plan ID, prefixed `plan_`.
    </ResponseField>

    <ResponseField name="account" type="object | null" required>
      Account that sells this plan; `null` for standalone invoice plans.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          Account ID, prefixed `biz_`.
        </ResponseField>

        <ResponseField name="title" type="string" required>
          Account display name.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="adaptive_pricing_enabled" type="boolean" required>
      Whether adaptive pricing is enabled for this plan. Raw setting — does not
      check processor compatibility or feature flags.
    </ResponseField>

    <ResponseField name="billing_period" type="number | null" required>
      Number of days between recurring charges, such as 30 for monthly or 365 for
      annual. `null` for one-time plans.
    </ResponseField>

    <ResponseField name="cancel_discount_intervals" type="number | null" required>
      Billing intervals the cancellation discount applies to (`0` forever, `1` first
      payment, or a month count). `null` when none is offered or the actor lacks the
      `plan:basic:read` scope.
    </ResponseField>

    <ResponseField name="cancel_discount_percentage" type="number | null" required>
      Cancellation discount as a whole-number percentage. `null` when none is
      offered or the actor lacks the `plan:basic:read` scope.
    </ResponseField>

    <ResponseField name="checkout_styling" type="object | null" required>
      Plan-level checkout styling (`background_color`, `button_color`,
      `font_family`, `border_style`); `null` inherits the account default.
    </ResponseField>

    <ResponseField name="collect_tax" type="boolean" required>
      Whether tax is collected on purchases of this plan, based on the account's tax
      configuration.
    </ResponseField>

    <ResponseField name="created_at" type="string" required>
      When the plan was created, as an ISO 8601 timestamp.
    </ResponseField>

    <ResponseField name="currency" type="string" required>
      Three-letter ISO currency code for this plan's prices.

      Available options: `usd`, `sgd`, `inr`, `aud`, `brl`, `cad`, `dkk`, `eur`, `nok`, `gbp`, `sek`, `chf`, `hkd`, `huf`, `jpy`, `mxn`, `myr`, `pln`, `czk`, `nzd`, `aed`, `eth`, `ape`, `cop`, `ron`, `thb`, `bgn`, `idr`, `dop`, `php`, `try`, `krw`, `twd`, `vnd`, `pkr`, `clp`, `uyu`, `ars`, `zar`, `dzd`, `tnd`, `mad`, `kes`, `kwd`, `jod`, `all`, `xcd`, `amd`, `bsd`, `bhd`, `bob`, `bam`, `khr`, `crc`, `xof`, `egp`, `etb`, `gmd`, `ghs`, `gtq`, `gyd`, `ils`, `jmd`, `mop`, `mga`, `mur`, `mdl`, `mnt`, `nad`, `ngn`, `mkd`, `omr`, `pyg`, `pen`, `qar`, `rwf`, `sar`, `rsd`, `lkr`, `tzs`, `ttd`, `uzs`, `rub`, `btc`, `cny`, `usdt`, `kzt`, `awg`, `whop_usd`, `xau`
    </ResponseField>

    <ResponseField name="custom_fields" type="object[]" required>
      Custom input fields collected on the checkout form.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          Custom field ID, prefixed `field_`.
        </ResponseField>

        <ResponseField name="field_type" type="string" required>
          Custom field input type.

          Available options: `text`
        </ResponseField>

        <ResponseField name="name" type="string" required>
          Field label shown to customer at checkout.
        </ResponseField>

        <ResponseField name="order" type="number" required>
          Field position on checkout form.
        </ResponseField>

        <ResponseField name="placeholder" type="string | null" required>
          Placeholder text shown in the empty field. `null` if none is set.
        </ResponseField>

        <ResponseField name="required" type="boolean" required>
          Whether the customer must complete this field to check out.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="deletable" type="boolean | null" required>
      Whether the plan can be deleted (it has no memberships or waitlist entries).
      `null` unless the actor has the `plan:basic:read` scope on the plan's account.
    </ResponseField>

    <ResponseField name="description" type="string | null" required>
      Customer-visible plan description. Maximum 1000 characters. `null` if no
      description is set.
    </ResponseField>

    <ResponseField name="effective_payment_method_configuration" type="object | null" required>
      The configuration governing a checkout for this plan, resolved through every layer (the plan's own and the account's) — the shape a session's `payment_method_configuration` carries. Apply it over the payment method types catalogue for the offerable set. `null` means platform defaults; `payment_method_configuration` stays the plan's own editable override.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="disabled" type="string[]" required>
          Payment methods this checkout withholds, even when the defaults would offer
          them.
        </ResponseField>

        <ResponseField name="enabled" type="string[]" required>
          Payment methods this checkout offers on top of whatever the defaults provide.
        </ResponseField>

        <ResponseField name="include_platform_defaults" type="boolean" required>
          Whether Whop's default set is the starting point. When `false`, only `enabled` is offered.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="expiration_days" type="number | null" required>
      Access duration in days for expiration-based plans, such as 365 for a one-year
      pass. `null` for plans without an expiration.
    </ResponseField>

    <ResponseField name="formatted_price" type="string" required>
      Human-readable price for display (currency + interval), e.g. "\$10 / month".
    </ResponseField>

    <ResponseField name="image" type="object | null" required>
      Pricing-tier image (`url`, `blurhash`) shown on the product page; `null` when
      no image is set.
    </ResponseField>

    <ResponseField name="initial_price" type="number" required>
      Initial purchase price in plan currency.
    </ResponseField>

    <ResponseField name="internal_notes" type="string | null" required>
      Private notes not shown to customers. `null` unless the actor has the
      `plan:basic:read` scope on the plan's account.
    </ResponseField>

    <ResponseField name="invoice" type="object | null" required>
      Invoice this plan was generated for; `null` unless created for an invoice.
    </ResponseField>

    <ResponseField name="member_count" type="number | null" required>
      Active memberships through this plan. `null` unless the actor has the
      `plan:basic:read` scope on the plan's account.
    </ResponseField>

    <ResponseField name="metadata" type="object | null" required>
      Custom key-value pairs stored on the plan. Included in webhook payloads for
      payment and membership events. Maximum 50 keys, 100 characters per key, 500
      characters per value. The reserved keys `custom_cta` and `custom_cta_url`,
      when set, override the product's checkout call to action for this plan.
    </ResponseField>

    <ResponseField name="offer_cancel_discount" type="boolean | null" required>
      Whether a cancellation discount is offered. `null` unless the actor has the
      `plan:basic:read` scope on the plan's account.
    </ResponseField>

    <ResponseField name="payment_method_configuration" type="object | null" required>
      Payment method configuration (`enabled`, `disabled`,
      `include_platform_defaults`); `null` when plan uses default settings.
    </ResponseField>

    <ResponseField name="plan_type" type="string" required>
      Billing model for this plan.

      Available options: `renewal`, `one_time`
    </ResponseField>

    <ResponseField name="product" type="object | null" required>
      Product this plan belongs to; `null` for standalone plans.
    </ResponseField>

    <ResponseField name="purchase_url" type="string" required>
      URL where customers can purchase this plan directly.
    </ResponseField>

    <ResponseField name="release_method" type="string" required>
      Sales method for this plan.

      Available options: `buy_now`, `waitlist`
    </ResponseField>

    <ResponseField name="renewal_price" type="number" required>
      Recurring price charged every billing period.
    </ResponseField>

    <ResponseField name="split_pay_required_payments" type="number | null" required>
      Installment payments required before the subscription pauses. Must be greater
      than 1. `null` if split pay is not configured.
    </ResponseField>

    <ResponseField name="stock" type="number | null" required>
      Units available for purchase. `null` unless the actor has the
      `plan:basic:read` scope on the plan's account.
    </ResponseField>

    <ResponseField name="strike_through_initial_price" type="number | null" required>
      Original initial price shown with a strikethrough, in the plan's currency.
      `null` when no strikethrough is set.
    </ResponseField>

    <ResponseField name="strike_through_renewal_price" type="number | null" required>
      Original renewal price shown with a strikethrough, in the plan's currency.
      `null` when no strikethrough is set.
    </ResponseField>

    <ResponseField name="tax_type" type="string" required>
      How tax is handled for this plan, including whether tax is included in the price, added at checkout, or not configured.

      Available options: `inclusive`, `exclusive`, `unspecified`
    </ResponseField>

    <ResponseField name="three_ds_level" type="string | null" required>
      3D Secure behavior for this plan; `null` inherits the account default.

      Available options: `mandate_challenge`, `frictionless`
    </ResponseField>

    <ResponseField name="title" type="string | null" required>
      Plan display name shown to customers. Maximum 30 characters. `null` if no
      title has been set.
    </ResponseField>

    <ResponseField name="trial_period_days" type="number | null" required>
      Free trial days before the first renewal charge. `null` if no trial is
      configured or the user has already used a trial for this plan.
    </ResponseField>

    <ResponseField name="unlimited_stock" type="boolean" required>
      Whether the plan has unlimited stock. When `true`, the `stock` field is
      ignored; waitlist plans always report `true`.
    </ResponseField>

    <ResponseField name="updated_at" type="string" required>
      When the plan was last updated, as an ISO 8601 timestamp.
    </ResponseField>

    <ResponseField name="visibility" type="string" required>
      Controls where this plan can be seen. When `hidden`, the plan is reachable only by its direct link.

      Available options: `visible`, `hidden`, `archived`, `quick_link`
    </ResponseField>
  </Column>

  <Column>
    <div className="api-resource-sticky-example">
      ```json Plan theme={null}
      {
      	"id": "plan_xxxxxxxxxxxxx",
      	"account": {
      		"id": "biz_xxxxxxxxxxxxxx",
      		"title": "Pickaxe"
      	},
      	"adaptive_pricing_enabled": true,
      	"billing_period": 30,
      	"cancel_discount_intervals": null,
      	"cancel_discount_percentage": null,
      	"checkout_styling": null,
      	"collect_tax": true,
      	"created_at": "2023-12-01T05:00:00.401Z",
      	"currency": "usd",
      	"custom_fields": [
      		{
      			"id": "cusf_xxxxxxxxxxxx",
      			"field_type": "text",
      			"name": "Discord username",
      			"order": 0,
      			"placeholder": "e.g. pickaxe_user",
      			"required": true
      		}
      	],
      	"deletable": false,
      	"description": "Monthly access to Pickaxe Analytics.",
      	"expiration_days": null,
      	"formatted_price": "$29.00 / month",
      	"image": null,
      	"initial_price": 29,
      	"internal_notes": "Standard monthly plan",
      	"invoice": null,
      	"member_count": 42,
      	"metadata": {
      		"external_plan_id": "monthly",
      		"custom_cta": "subscribe",
      		"custom_cta_url": "https://example.com/wash-club"
      	},
      	"offer_cancel_discount": false,
      	"payment_method_configuration": {
      		"enabled": ["card"],
      		"disabled": [],
      		"include_platform_defaults": true
      	},
      	"effective_payment_method_configuration": {
      		"enabled": ["card"],
      		"disabled": [],
      		"include_platform_defaults": true
      	},
      	"plan_type": "renewal",
      	"product": {
      		"id": "prod_xxxxxxxxxxxxx",
      		"title": "Pickaxe Analytics"
      	},
      	"purchase_url": "https://whop.com/pickaxe-analytics/checkout/plan_xxxxxxxxxxxxx",
      	"release_method": "buy_now",
      	"renewal_price": 29,
      	"split_pay_required_payments": null,
      	"stock": null,
      	"strike_through_initial_price": null,
      	"strike_through_renewal_price": null,
      	"tax_type": "exclusive",
      	"three_ds_level": "frictionless",
      	"title": "Monthly",
      	"trial_period_days": 7,
      	"unlimited_stock": true,
      	"updated_at": "2023-12-01T05:00:00.401Z",
      	"visibility": "visible"
      }
      ```
    </div>
  </Column>
</Columns>
