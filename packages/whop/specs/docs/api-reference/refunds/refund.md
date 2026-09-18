> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Refund

> A refund represents a full or partial reversal of a payment, including the amount, status, and payment provider.

<ResponseExample>
  ```json Example theme={null}
  {
  	"amount": 6.9,
  	"created_at": "2023-12-01T05:00:00.401Z",
  	"currency": "usd",
  	"id": "rf_xxxxxxxxxxxxxxx",
  	"payment": {
  		"billing_reason": "subscription_create",
  		"card_brand": "mastercard",
  		"card_last4": "4242",
  		"created_at": "2023-12-01T05:00:00.401Z",
  		"currency": "usd",
  		"dispute_alerted_at": "2023-12-01T05:00:00.401Z",
  		"id": "pay_xxxxxxxxxxxxxx",
  		"member": {
  			"id": "<string>",
  			"phone": "<string>"
  		},
  		"membership": {
  			"id": "mem_xxxxxxxxxxxxxx",
  			"status": "trialing"
  		},
  		"metadata": {},
  		"paid_at": "2023-12-01T05:00:00.401Z",
  		"payment_method_type": "acss_debit",
  		"plan": {
  			"id": "plan_xxxxxxxxxxxxx",
  			"metadata": {}
  		},
  		"product": {
  			"id": "prod_xxxxxxxxxxxxx",
  			"metadata": {}
  		},
  		"subtotal": 6.9,
  		"tax_amount": 6.9,
  		"tax_behavior": "exclusive",
  		"tax_refunded_amount": 6.9,
  		"total": 6.9,
  		"usd_total": 6.9,
  		"user": {
  			"email": "john.doe@example.com",
  			"id": "user_xxxxxxxxxxxxx",
  			"name": "John Doe",
  			"username": "johndoe42"
  		}
  	},
  	"provider": "stripe",
  	"provider_created_at": "2023-12-01T05:00:00.401Z",
  	"reference_status": "available",
  	"reference_type": "acquirer_reference_number",
  	"reference_value": "74850120752",
  	"status": "pending"
  }
  ```
</ResponseExample>

<ResponseField name="amount" type="number" required>
  The refunded amount as a decimal in the specified currency, such as 10.43 for \$10.43 USD.

  Example: `6.9`
</ResponseField>

<ResponseField name="created_at" type="string<date-time>" required>
  The datetime the refund was created.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="currency" type="Currencies" required>
  The three-letter ISO currency code for the refunded amount.

  Available options: `usd`, `sgd`, `inr`, `aud`, `brl`, `cad`, `dkk`, `eur`, `nok`, `gbp`, `sek`, `chf`, `hkd`, `huf`, `jpy`, `mxn`, `myr`, `pln`, `czk`, `nzd`, `aed`, `eth`, `ape`, `cop`, `ron`, `thb`, `bgn`, `idr`, `dop`, `php`, `try`, `krw`, `twd`, `vnd`, `pkr`, `clp`, `uyu`, `ars`, `zar`, `dzd`, `tnd`, `mad`, `kes`, `kwd`, `jod`, `all`, `xcd`, `amd`, `bsd`, `bhd`, `bob`, `bam`, `khr`, `crc`, `xof`, `egp`, `etb`, `gmd`, `ghs`, `gtq`, `gyd`, `ils`, `jmd`, `mop`, `mga`, `mur`, `mdl`, `mnt`, `nad`, `ngn`, `mkd`, `omr`, `pyg`, `pen`, `qar`, `rwf`, `sar`, `rsd`, `lkr`, `tzs`, `ttd`, `uzs`, `rub`, `btc`, `cny`, `usdt`, `kzt`, `awg`, `whop_usd`, `xau`
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the refund.

  Example: `rf_xxxxxxxxxxxxxxx`
</ResponseField>

<ResponseField name="payment" type="object | null" required>
  The original payment that this refund was issued against. Null if the payment is no longer available.

  <Expandable title="child attributes">
    <ResponseField name="billing_reason" type="BillingReasons | null" required>
      The machine-readable reason this charge was created, such as initial subscription purchase, renewal cycle, or one-time payment.

      Available options: `subscription_create`, `subscription_cycle`, `subscription_update`, `one_time`, `manual`, `subscription`
    </ResponseField>

    <ResponseField name="card_brand" type="CardBrands | null" required>
      Card network reported by the processor (e.g., 'visa', 'mastercard', 'amex'). Present only when the payment method type is 'card'.

      Available options: `mastercard`, `visa`, `amex`, `discover`, `unionpay`, `jcb`, `diners`, `link`, `troy`, `visadankort`, `visabancontact`, `china_union_pay`, `rupay`, `jcbrupay`, `elo`, `maestro`, `tarjeta_naranja`, `cirrus`, `nspk_mir`, `verve`, `ebt`, `private_label`, `local_brand`, `uatp`, `wexcard`, `uzcard`, `meeza`, `hrg_store_card`, `girocard`, `fuel_card`, `dankort`, `carnet`, `atm_card`, `china_union_payuzcard`, `codensa`, `cabal`, `hipercard`, `jcblankapay`, `cmi`, `aura`, `accel`, `culiance`, `nyce`, `pulse`, `star`, `unknown`
    </ResponseField>

    <ResponseField name="card_last4" type="string | null" required>
      The last four digits of the card used to make this payment. Null if the payment was not made with a card.

      Example: `4242`
    </ResponseField>

    <ResponseField name="created_at" type="string<date-time>" required>
      The datetime the payment was created.

      Example: `2023-12-01T05:00:00.401Z`
    </ResponseField>

    <ResponseField name="currency" type="Currencies" required>
      The three-letter ISO currency code for this payment (e.g., 'usd', 'eur').

      Available options: `usd`, `sgd`, `inr`, `aud`, `brl`, `cad`, `dkk`, `eur`, `nok`, `gbp`, `sek`, `chf`, `hkd`, `huf`, `jpy`, `mxn`, `myr`, `pln`, `czk`, `nzd`, `aed`, `eth`, `ape`, `cop`, `ron`, `thb`, `bgn`, `idr`, `dop`, `php`, `try`, `krw`, `twd`, `vnd`, `pkr`, `clp`, `uyu`, `ars`, `zar`, `dzd`, `tnd`, `mad`, `kes`, `kwd`, `jod`, `all`, `xcd`, `amd`, `bsd`, `bhd`, `bob`, `bam`, `khr`, `crc`, `xof`, `egp`, `etb`, `gmd`, `ghs`, `gtq`, `gyd`, `ils`, `jmd`, `mop`, `mga`, `mur`, `mdl`, `mnt`, `nad`, `ngn`, `mkd`, `omr`, `pyg`, `pen`, `qar`, `rwf`, `sar`, `rsd`, `lkr`, `tzs`, `ttd`, `uzs`, `rub`, `btc`, `cny`, `usdt`, `kzt`, `awg`, `whop_usd`, `xau`
    </ResponseField>

    <ResponseField name="dispute_alerted_at" type="string<date-time> | null" required>
      When an alert came in that this transaction will be disputed

      Example: `2023-12-01T05:00:00.401Z`
    </ResponseField>

    <ResponseField name="id" type="string" required>
      The unique identifier for the payment.

      Example: `pay_xxxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="member" type="object | null" required>
      The member attached to this payment.

      <Expandable title="child attributes">
        <ResponseField name="id" type="string" required>
          The unique identifier for the company member.
        </ResponseField>

        <ResponseField name="phone" type="string | null" required>
          The phone number for the member, if available.
        </ResponseField>
      </Expandable>
    </ResponseField>

    <ResponseField name="membership" type="object | null" required>
      The membership attached to this payment.

      <Expandable title="child attributes">
        <ResponseField name="id" type="string" required>
          The unique identifier for the membership.

          Example: `mem_xxxxxxxxxxxxxx`
        </ResponseField>

        <ResponseField name="status" type="MembershipStatus" required>
          The state of the membership.

          Available options: `trialing`, `active`, `past_due`, `completed`, `canceled`, `expired`, `unresolved`, `drafted`, `canceling`
        </ResponseField>
      </Expandable>
    </ResponseField>

    <ResponseField name="metadata" type="object | null" required>
      The custom metadata stored on this payment. This will be copied over to the
      checkout configuration for which this payment was made
    </ResponseField>

    <ResponseField name="paid_at" type="string<date-time> | null" required>
      The time at which this payment was successfully collected. Null if the payment has not yet succeeded. As a Unix timestamp.

      Example: `2023-12-01T05:00:00.401Z`
    </ResponseField>

    <ResponseField name="payment_method_type" type="PaymentMethodTypes | null" required>
      The type of payment instrument used for this payment (e.g., card, Cash App, iDEAL, Klarna, crypto). Null when the processor does not supply a type.

      Available options: `acss_debit`, `addi`, `affirm`, `afterpay_clearpay`, `alipay`, `alma`, `amazon_pay`, `apple`, `apple_pay`, `au_bank_transfer`, `au_becs_debit`, `bacs_debit`, `bancolombia`, `bancontact`, `bank_wire`, `billie`, `bizum`, `blik`, `boleto`, `bre_b`, `ca_bank_transfer`, `capchase_pay`, `card`, `card_installments_three`, `card_installments_six`, `card_installments_twelve`, `cashapp`, `claritypay`, `coinbase`, `crypto`, `custom`, `customer_balance`, `demo_pay`, `efecty`, `eps`, `eu_bank_transfer`, `fpx`, `gb_bank_transfer`, `giropay`, `google_pay`, `gopay`, `grabpay`, `id_bank_transfer`, `ideal`, `interac`, `kakao_pay`, `klarna`, `klarna_pay_now`, `konbini`, `kr_card`, `kr_market`, `kriya`, `kueski`, `link`, `mb_way`, `m_pesa`, `mercado_pago`, `mobilepay`, `modo`, `mondu`, `multibanco`, `naver_pay`, `nequi`, `netbanking`, `ng_bank`, `ng_bank_transfer`, `ng_card`, `ng_market`, `ng_ussd`, `ng_wallet`, `nz_bank_account`, `oxxo`, `p24`, `pago_efectivo`, `pse`, `pay_by_bank`, `payco`, `paynow`, `paypal`, `paypay`, `payto`, `pix`, `platform_balance`, `promptpay`, `qris`, `rapipago`, `rechnung`, `revolut_pay`, `samsung_pay`, `satispay`, `scalapay`, `sencillito`, `sepa_debit`, `sequra`, `servipag`, `sezzle`, `shop_pay`, `shopeepay`, `sofort`, `south_korea_market`, `spei`, `splitit`, `sunbit`, `swish`, `tamara`, `twint`, `upi`, `us_bank_account`, `us_bank_transfer`, `venmo`, `vipps`, `webpay`, `wechat_pay`, `yape`, `zip`, `coinflow`, `unknown`
    </ResponseField>

    <ResponseField name="plan" type="object | null" required>
      The plan attached to this payment.

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

    <ResponseField name="product" type="object | null" required>
      The product this payment was made for

      <Expandable title="child attributes">
        <ResponseField name="id" type="string" required>
          The unique identifier for the product.

          Example: `prod_xxxxxxxxxxxxx`
        </ResponseField>

        <ResponseField name="metadata" type="object | null" required>
          Custom key-value pairs stored on the product and included in payment and membership webhook payloads. Max 50 keys, 100 characters per key, 500 characters per string value.
        </ResponseField>
      </Expandable>
    </ResponseField>

    <ResponseField name="subtotal" type="number | null" required>
      The subtotal to show to the creator (excluding buyer fees).

      Example: `6.9`
    </ResponseField>

    <ResponseField name="tax_amount" type="number | null" required>
      The calculated amount of the sales/VAT tax (if applicable).

      Example: `6.9`
    </ResponseField>

    <ResponseField name="tax_behavior" type="ReceiptTaxBehaviors | null" required>
      The type of tax inclusivity applied to the payment, for determining whether the tax is included in the final price, or paid on top.

      Available options: `exclusive`, `inclusive`, `unspecified`, `unable_to_collect`
    </ResponseField>

    <ResponseField name="tax_refunded_amount" type="number | null" required>
      The amount of tax that has been refunded (if applicable).

      Example: `6.9`
    </ResponseField>

    <ResponseField name="total" type="number | null" required>
      The total to show to the creator (excluding buyer fees).

      Example: `6.9`
    </ResponseField>

    <ResponseField name="usd_total" type="number | null" required>
      The total in USD to show to the creator (excluding buyer fees).

      Example: `6.9`
    </ResponseField>

    <ResponseField name="user" type="object | null" required>
      The user that made this payment.

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
  </Expandable>
</ResponseField>

<ResponseField name="provider" type="PaymentProviders" required>
  The payment provider that processed the refund.

  Available options: `stripe`, `coinbase`, `paypal`, `apple`, `sezzle`, `splitit`, `platform_balance`, `multi_psp`, `adyen`, `claritypay`, `checkout_dot_com`, `airwallex`, `coinflow`, `sequra`, `dlocal`, `masspay`, `braintree`
</ResponseField>

<ResponseField name="provider_created_at" type="string<date-time> | null" required>
  The timestamp when the refund was created in the payment provider's system. Null if not available from the provider.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="reference_status" type="RefundReferenceStatuses | null" required>
  The availability status of the refund tracking reference from the payment processor. Null if no reference was provided.

  Available options: `available`, `pending`, `unavailable`
</ResponseField>

<ResponseField name="reference_type" type="RefundReferenceTypes | null" required>
  The type of tracking reference provided by the payment processor, such as an acquirer reference number. Null if no reference was provided.

  Available options: `acquirer_reference_number`, `retrieval_reference_number`, `system_trace_audit_number`
</ResponseField>

<ResponseField name="reference_value" type="string | null" required>
  The tracking reference value from the payment processor, used to trace the refund through banking networks. Null if no reference was provided.

  Example: `74850120752`
</ResponseField>

<ResponseField name="status" type="RefundStatuses" required>
  The current processing status of the refund, such as pending, succeeded, or failed.

  Available options: `pending`, `requires_action`, `succeeded`, `failed`, `canceled`
</ResponseField>
