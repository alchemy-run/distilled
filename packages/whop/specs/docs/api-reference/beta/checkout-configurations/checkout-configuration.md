> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Checkout Configuration

A Checkout Configuration is a reusable checkout link owned by an account. In `payment` mode it sells a specific plan; in `setup` mode it collects and saves payment details without charging. Each configuration can also override which payment methods are accepted and how 3D Secure is enforced for that checkout.

Use the Checkout Configurations API to create checkout links for an existing or inline plan, list configurations for an account, retrieve the configuration behind a checkout URL, and delete links that should no longer be used.

<Note>
  Replaces the Legacy [Checkout
  configurations](/api-reference/checkout-configurations/checkout-configuration)
  resource. Existing Legacy integrations keep working; see [API
  versions](/developer/api/versioning) for the stability contract.
</Note>

## Endpoints

| Endpoint                                                                                                           | Request                                                                            |
| ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| [List checkout configurations](/api-reference/beta/checkout-configurations/list-checkout-configurations)           | <Badge color="blue" size="sm" stroke>GET</Badge> `/checkout_configurations`        |
| [Create a checkout configuration](/api-reference/beta/checkout-configurations/create-a-checkout-configuration)     | <Badge color="green" size="sm" stroke>POST</Badge> `/checkout_configurations`      |
| [Retrieve a checkout configuration](/api-reference/beta/checkout-configurations/retrieve-a-checkout-configuration) | <Badge color="blue" size="sm" stroke>GET</Badge> `/checkout_configurations/{id}`   |
| [Delete a checkout configuration](/api-reference/beta/checkout-configurations/delete-a-checkout-configuration)     | <Badge color="red" size="sm" stroke>DELETE</Badge> `/checkout_configurations/{id}` |

## Attributes

<Columns cols={2}>
  <Column>
    <ResponseField name="id" type="string" required>
      Checkout configuration ID, prefixed `ch_`.
    </ResponseField>

    <ResponseField name="account_id" type="string" required>
      Account ID, prefixed `biz_`.
    </ResponseField>

    <ResponseField name="affiliate_code" type="string | null">
      Affiliate code applied at checkout, or `null` when none is set.
    </ResponseField>

    <ResponseField name="created_at" type="string" required>
      When the checkout configuration was created, as an ISO 8601 timestamp.
    </ResponseField>

    <ResponseField name="currency" type="string | null">
      Currency used for setup-mode payment method availability; defaults to `usd`
      when omitted.
    </ResponseField>

    <ResponseField name="effective_payment_method_configuration" type="object | null">
      The configuration governing a checkout mounted from this configuration, resolved through every layer (its own overrides, the plan's, and the account's) — the shape a session's `payment_method_configuration` carries. Apply it over the payment method types catalogue for the offerable set. `null` means platform defaults; `payment_method_configuration` stays this configuration's own editable override.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="disabled" type="string[]">
          Payment methods explicitly disabled.
        </ResponseField>

        <ResponseField name="enabled" type="string[]">
          Payment methods explicitly enabled.
        </ResponseField>

        <ResponseField name="include_platform_defaults" type="boolean">
          Whether platform default payment methods are included.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="metadata" type="object | null">
      Custom key-value metadata copied to payments and memberships. `null` without
      the `checkout_configuration:basic:read` scope.
    </ResponseField>

    <ResponseField name="mode" type="string" required>
      Controls whether checkout charges the buyer immediately or saves payment details for later.

      Available options: `payment`, `setup`
    </ResponseField>

    <ResponseField name="payment_method_configuration" type="object | null">
      Payment method overrides for this checkout. `null` when it uses the plan or platform defaults.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="disabled" type="string[]">
          Payment methods explicitly disabled for checkout.
        </ResponseField>

        <ResponseField name="enabled" type="string[]">
          Payment methods explicitly enabled for checkout.
        </ResponseField>

        <ResponseField name="include_platform_defaults" type="boolean">
          Whether platform default payment methods are included.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="plan" type="object | null">
      Plan used for payment checkout. `null` in setup mode.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          Plan ID, prefixed `plan_`.
        </ResponseField>

        <ResponseField name="adaptive_pricing_enabled" type="boolean" required>
          Whether this plan accepts local currency payments via adaptive pricing.
        </ResponseField>

        <ResponseField name="billing_period" type="integer | null" required>
          Recurring billing interval in days, such as 30 for monthly or 365 for annual.
          `null` for one-time plans.
        </ResponseField>

        <ResponseField name="currency" type="string" required>
          Three-letter ISO currency code for the plan's prices.
        </ResponseField>

        <ResponseField name="expiration_days" type="integer | null" required>
          Access duration in days for expiration-based plans.
        </ResponseField>

        <ResponseField name="initial_price" type="number" required>
          Initial purchase price in the plan currency.
        </ResponseField>

        <ResponseField name="plan_type" type="string" required>
          Billing model for the plan.

          Available options: `renewal`, `one_time`
        </ResponseField>

        <ResponseField name="release_method" type="string" required>
          Sales method for the plan.

          Available options: `buy_now`, `waitlist`
        </ResponseField>

        <ResponseField name="renewal_price" type="number" required>
          Recurring price charged each billing period.
        </ResponseField>

        <ResponseField name="three_ds_level" type="string | null" required>
          3D Secure behavior for this plan, or `null` to use the account default.

          Available options: `mandate_challenge`, `frictionless`
        </ResponseField>

        <ResponseField name="trial_period_days" type="integer | null" required>
          Free trial days before the first renewal charge.
        </ResponseField>

        <ResponseField name="visibility" type="string" required>
          Whether the plan is visible to customers or hidden from public view.

          Available options: `visible`, `hidden`, `archived`, `quick_link`
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="purchase_url" type="string | null">
      Checkout URL you can send to customers.
    </ResponseField>

    <ResponseField name="redirect_url" type="string | null">
      URL customers are sent to after checkout, or `null` when no redirect is
      configured.
    </ResponseField>

    <ResponseField name="three_ds_level" type="string | null">
      3D Secure behavior for this checkout, or `null` to use the account default.

      Available options: `mandate_challenge`, `frictionless`
    </ResponseField>

    <ResponseField name="updated_at" type="string" required>
      When the checkout configuration was last updated, as an ISO 8601 timestamp.
    </ResponseField>
  </Column>

  <Column>
    <div className="api-resource-sticky-example">
      ```json CheckoutConfiguration theme={null}
      {
      	"id": "ch_xxxxxxxxxxxxxx",
      	"account_id": "biz_xxxxxxxxxxxxxx",
      	"affiliate_code": "pickaxe-partner",
      	"created_at": "2026-07-01T12:00:00Z",
      	"currency": "usd",
      	"metadata": {
      		"campaign": "summer-launch"
      	},
      	"mode": "payment",
      	"payment_method_configuration": {
      		"enabled": ["card", "apple_pay"],
      		"disabled": ["crypto"],
      		"include_platform_defaults": true
      	},
      	"effective_payment_method_configuration": {
      		"enabled": ["card", "apple_pay"],
      		"disabled": ["crypto"],
      		"include_platform_defaults": true
      	},
      	"plan": {
      		"id": "plan_xxxxxxxxxxxxx",
      		"visibility": "visible",
      		"plan_type": "renewal",
      		"release_method": "buy_now",
      		"currency": "usd",
      		"billing_period": 30,
      		"expiration_days": null,
      		"initial_price": 29,
      		"renewal_price": 29,
      		"trial_period_days": 7,
      		"three_ds_level": "frictionless",
      		"adaptive_pricing_enabled": true
      	},
      	"purchase_url": "https://whop.com/checkout/plan_xxxxxxxxxxxxx/?session=ch_xxxxxxxxxxxxxx",
      	"redirect_url": "https://pickaxe.example/welcome",
      	"three_ds_level": "frictionless",
      	"updated_at": "2026-07-02T12:00:00Z"
      }
      ```
    </div>
  </Column>
</Columns>
