> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Checkout Configuration

> A checkout configuration is a reusable configuration for a checkout, including the plan, affiliate, and custom metadata. Payments and memberships created from a checkout session inherit its metadata.

<Note>
  This resource has a successor in the [Whop
  API](/api-reference/beta/checkout-configurations/checkout-configuration), the
  versioned API that new integrations should build on. This page stays fully
  supported.
</Note>

<ResponseExample>
  ```json Example theme={null}
  {
  	"affiliate_code": "<string>",
  	"company_id": "<string>",
  	"currency": "usd",
  	"id": "ch_xxxxxxxxxxxxxxx",
  	"metadata": {},
  	"mode": "payment",
  	"payment_method_configuration": {
  		"disabled": ["acss_debit"],
  		"enabled": ["acss_debit"],
  		"include_platform_defaults": true
  	},
  	"plan": {
  		"adaptive_pricing_enabled": true,
  		"billing_period": 42,
  		"currency": "usd",
  		"expiration_days": 42,
  		"id": "plan_xxxxxxxxxxxxx",
  		"initial_price": 6.9,
  		"plan_type": "renewal",
  		"release_method": "buy_now",
  		"renewal_price": 6.9,
  		"three_ds_level": "mandate_challenge",
  		"trial_period_days": 42,
  		"visibility": "visible"
  	},
  	"purchase_url": "<string>",
  	"redirect_url": "<string>"
  }
  ```
</ResponseExample>

<ResponseField name="affiliate_code" type="string | null" required>
  The affiliate code to use for the checkout configuration
</ResponseField>

<ResponseField name="company_id" type="string" required>
  The ID of the company to use for the checkout configuration
</ResponseField>

<ResponseField name="currency" type="Currencies | null" required>
  The currency to use for the configuration when in 'setup' mode. This is used to target which currency specific payment methods are available. If not provided, it will default to 'usd' when in setup mode.

  Available options: `usd`, `sgd`, `inr`, `aud`, `brl`, `cad`, `dkk`, `eur`, `nok`, `gbp`, `sek`, `chf`, `hkd`, `huf`, `jpy`, `mxn`, `myr`, `pln`, `czk`, `nzd`, `aed`, `eth`, `ape`, `cop`, `ron`, `thb`, `bgn`, `idr`, `dop`, `php`, `try`, `krw`, `twd`, `vnd`, `pkr`, `clp`, `uyu`, `ars`, `zar`, `dzd`, `tnd`, `mad`, `kes`, `kwd`, `jod`, `all`, `xcd`, `amd`, `bsd`, `bhd`, `bob`, `bam`, `khr`, `crc`, `xof`, `egp`, `etb`, `gmd`, `ghs`, `gtq`, `gyd`, `ils`, `jmd`, `mop`, `mga`, `mur`, `mdl`, `mnt`, `nad`, `ngn`, `mkd`, `omr`, `pyg`, `pen`, `qar`, `rwf`, `sar`, `rsd`, `lkr`, `tzs`, `ttd`, `uzs`, `rub`, `btc`, `cny`, `usdt`, `kzt`, `awg`, `whop_usd`, `xau`
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the checkout session.

  Example: `ch_xxxxxxxxxxxxxxx`
</ResponseField>

<ResponseField name="metadata" type="object | null" required>
  The metadata to use for the checkout configuration
</ResponseField>

<ResponseField name="mode" type="CheckoutModes" required>
  The mode of the checkout session.

  Available options: `payment`, `setup`
</ResponseField>

<ResponseField name="payment_method_configuration" type="object | null" required>
  The explicit payment method configuration for the session, if any. This currently only works in 'setup' mode. Use the plan's payment\_method\_configuration for payment method.

  <Expandable title="child attributes">
    <ResponseField name="disabled" type="array<PaymentMethodTypes>" required>
      An array of payment method identifiers that are explicitly disabled. Only applies if the include\_platform\_defaults is true.

      Available options: `acss_debit`, `addi`, `affirm`, `afterpay_clearpay`, `alipay`, `alma`, `amazon_pay`, `apple`, `apple_pay`, `au_bank_transfer`, `au_becs_debit`, `bacs_debit`, `bancolombia`, `bancontact`, `bank_wire`, `billie`, `bizum`, `blik`, `boleto`, `bre_b`, `ca_bank_transfer`, `capchase_pay`, `card`, `card_installments_three`, `card_installments_six`, `card_installments_twelve`, `cashapp`, `claritypay`, `coinbase`, `crypto`, `custom`, `customer_balance`, `demo_pay`, `efecty`, `eps`, `eu_bank_transfer`, `fpx`, `gb_bank_transfer`, `giropay`, `google_pay`, `gopay`, `grabpay`, `id_bank_transfer`, `ideal`, `interac`, `kakao_pay`, `klarna`, `klarna_pay_now`, `konbini`, `kr_card`, `kr_market`, `kriya`, `kueski`, `link`, `mb_way`, `m_pesa`, `mercado_pago`, `mobilepay`, `modo`, `mondu`, `multibanco`, `naver_pay`, `nequi`, `netbanking`, `ng_bank`, `ng_bank_transfer`, `ng_card`, `ng_market`, `ng_ussd`, `ng_wallet`, `nz_bank_account`, `oxxo`, `p24`, `pago_efectivo`, `pse`, `pay_by_bank`, `payco`, `paynow`, `paypal`, `paypay`, `payto`, `pix`, `platform_balance`, `promptpay`, `qris`, `rapipago`, `rechnung`, `revolut_pay`, `samsung_pay`, `satispay`, `scalapay`, `sencillito`, `sepa_debit`, `sequra`, `servipag`, `sezzle`, `shop_pay`, `shopeepay`, `sofort`, `south_korea_market`, `spei`, `splitit`, `sunbit`, `swish`, `tamara`, `twint`, `upi`, `us_bank_account`, `us_bank_transfer`, `venmo`, `vipps`, `webpay`, `wechat_pay`, `yape`, `zip`, `coinflow`, `unknown`
    </ResponseField>

    <ResponseField name="enabled" type="array<PaymentMethodTypes>" required>
      An array of payment method identifiers that are explicitly enabled. This means these payment methods will be shown on checkout. Example use case is to only enable a specific payment method like cashapp, or extending the platform defaults with additional methods.

      Available options: `acss_debit`, `addi`, `affirm`, `afterpay_clearpay`, `alipay`, `alma`, `amazon_pay`, `apple`, `apple_pay`, `au_bank_transfer`, `au_becs_debit`, `bacs_debit`, `bancolombia`, `bancontact`, `bank_wire`, `billie`, `bizum`, `blik`, `boleto`, `bre_b`, `ca_bank_transfer`, `capchase_pay`, `card`, `card_installments_three`, `card_installments_six`, `card_installments_twelve`, `cashapp`, `claritypay`, `coinbase`, `crypto`, `custom`, `customer_balance`, `demo_pay`, `efecty`, `eps`, `eu_bank_transfer`, `fpx`, `gb_bank_transfer`, `giropay`, `google_pay`, `gopay`, `grabpay`, `id_bank_transfer`, `ideal`, `interac`, `kakao_pay`, `klarna`, `klarna_pay_now`, `konbini`, `kr_card`, `kr_market`, `kriya`, `kueski`, `link`, `mb_way`, `m_pesa`, `mercado_pago`, `mobilepay`, `modo`, `mondu`, `multibanco`, `naver_pay`, `nequi`, `netbanking`, `ng_bank`, `ng_bank_transfer`, `ng_card`, `ng_market`, `ng_ussd`, `ng_wallet`, `nz_bank_account`, `oxxo`, `p24`, `pago_efectivo`, `pse`, `pay_by_bank`, `payco`, `paynow`, `paypal`, `paypay`, `payto`, `pix`, `platform_balance`, `promptpay`, `qris`, `rapipago`, `rechnung`, `revolut_pay`, `samsung_pay`, `satispay`, `scalapay`, `sencillito`, `sepa_debit`, `sequra`, `servipag`, `sezzle`, `shop_pay`, `shopeepay`, `sofort`, `south_korea_market`, `spei`, `splitit`, `sunbit`, `swish`, `tamara`, `twint`, `upi`, `us_bank_account`, `us_bank_transfer`, `venmo`, `vipps`, `webpay`, `wechat_pay`, `yape`, `zip`, `coinflow`, `unknown`
    </ResponseField>

    <ResponseField name="include_platform_defaults" type="boolean" required>
      Whether Whop's platform default payment method enablement settings are included in this configuration. The full list of default payment methods can be found in the documentation at docs.whop.com/payments.
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="plan" type="object | null" required>
  The plan to use for the checkout configuration

  <Expandable title="child attributes">
    <ResponseField name="adaptive_pricing_enabled" type="boolean" required>
      Whether the creator has turned on adaptive pricing for this plan. Raw setting
      — does not check processor compatibility or feature flags.
    </ResponseField>

    <ResponseField name="billing_period" type="integer | null" required>
      Number of days between recurring charges, such as 30 for monthly or 365 for annual. `null` for one-time plans.

      Example: `42`
    </ResponseField>

    <ResponseField name="currency" type="Currencies" required>
      The currency used for all prices on this plan (e.g., 'usd', 'eur'). All monetary amounts on the plan are denominated in this currency.

      Available options: `usd`, `sgd`, `inr`, `aud`, `brl`, `cad`, `dkk`, `eur`, `nok`, `gbp`, `sek`, `chf`, `hkd`, `huf`, `jpy`, `mxn`, `myr`, `pln`, `czk`, `nzd`, `aed`, `eth`, `ape`, `cop`, `ron`, `thb`, `bgn`, `idr`, `dop`, `php`, `try`, `krw`, `twd`, `vnd`, `pkr`, `clp`, `uyu`, `ars`, `zar`, `dzd`, `tnd`, `mad`, `kes`, `kwd`, `jod`, `all`, `xcd`, `amd`, `bsd`, `bhd`, `bob`, `bam`, `khr`, `crc`, `xof`, `egp`, `etb`, `gmd`, `ghs`, `gtq`, `gyd`, `ils`, `jmd`, `mop`, `mga`, `mur`, `mdl`, `mnt`, `nad`, `ngn`, `mkd`, `omr`, `pyg`, `pen`, `qar`, `rwf`, `sar`, `rsd`, `lkr`, `tzs`, `ttd`, `uzs`, `rub`, `btc`, `cny`, `usdt`, `kzt`, `awg`, `whop_usd`, `xau`
    </ResponseField>

    <ResponseField name="expiration_days" type="integer | null" required>
      Access duration in days for expiration-based plans, such as 365 for a one-year pass.

      Example: `42`
    </ResponseField>

    <ResponseField name="id" type="string" required>
      The unique identifier for the plan.

      Example: `plan_xxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="initial_price" type="number" required>
      The initial purchase price in the plan's base\_currency (e.g., 49.99 for \$49.99). For one-time plans, this is the full price. For renewal plans, this is charged on top of the first renewal\_price.

      Example: `6.9`
    </ResponseField>

    <ResponseField name="plan_type" type="PlanTypes" required>
      The billing model for this plan: 'renewal' for recurring subscriptions or 'one\_time' for single payments.

      Available options: `renewal`, `one_time`
    </ResponseField>

    <ResponseField name="release_method" type="ReleaseMethod" required>
      Sales method for this plan: `buy_now` for immediate purchase or `waitlist` for waitlist-based access.

      Available options: `buy_now`, `waitlist`
    </ResponseField>

    <ResponseField name="renewal_price" type="number" required>
      The recurring price charged every billing\_period in the plan's base\_currency (e.g., 9.99 for \$9.99/period). Zero for one-time plans.

      Example: `6.9`
    </ResponseField>

    <ResponseField name="three_ds_level" type="PlanThreeDsLevels | null" required>
      The 3D Secure behavior for this plan. Null means the plan inherits the account default.

      Available options: `mandate_challenge`, `frictionless`
    </ResponseField>

    <ResponseField name="trial_period_days" type="integer | null" required>
      Free trial days before first renewal charge. `null` if no trial is configured or the user has already used a trial for this plan.

      Example: `42`
    </ResponseField>

    <ResponseField name="visibility" type="Visibility" required>
      Controls whether the plan is visible to customers. When set to 'hidden', the plan is only accessible via direct link.

      Available options: `visible`, `hidden`, `archived`, `quick_link`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="purchase_url" type="string" required>
  A URL you can send to customers to complete a checkout. It looks like
  `/checkout/ch_xxxx/`
</ResponseField>

<ResponseField name="redirect_url" type="string | null" required>
  The URL to redirect the user to after the checkout configuration is created
</ResponseField>
