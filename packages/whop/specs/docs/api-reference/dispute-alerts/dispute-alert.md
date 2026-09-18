> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Dispute Alert

> A dispute alert represents an early warning notification from a payment processor about a potential dispute or chargeback.

<ResponseExample>
  ```json Example theme={null}
  {
  	"alert_type": "dispute",
  	"amount": 6.9,
  	"charge_for_alert": true,
  	"created_at": "2023-12-01T05:00:00.401Z",
  	"currency": "usd",
  	"dispute": {
  		"amount": 6.9,
  		"created_at": "2023-12-01T05:00:00.401Z",
  		"currency": "usd",
  		"id": "dspt_xxxxxxxxxxxxx",
  		"reason": "Product Not Received",
  		"status": "warning_needs_response"
  	},
  	"id": "dspa_xxxxxxxxxxxxx",
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
  		"paid_at": "2023-12-01T05:00:00.401Z",
  		"payment_method_type": "acss_debit",
  		"subtotal": 6.9,
  		"total": 6.9,
  		"usd_total": 6.9,
  		"user": {
  			"email": "john.doe@example.com",
  			"id": "user_xxxxxxxxxxxxx",
  			"name": "John Doe",
  			"username": "johndoe42"
  		}
  	},
  	"transaction_date": "2023-12-01T05:00:00.401Z"
  }
  ```
</ResponseExample>

<ResponseField name="alert_type" type="DisputeAlertTypes" required>
  The type of the dispute alert.

  Available options: `dispute`, `dispute_rdr`, `fraud`
</ResponseField>

<ResponseField name="amount" type="number" required>
  The alerted amount in the specified currency.

  Example: `6.9`
</ResponseField>

<ResponseField name="charge_for_alert" type="boolean" required>
  Whether this alert incurs a charge.
</ResponseField>

<ResponseField name="created_at" type="string<date-time>" required>
  The time the dispute alert was created.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="currency" type="Currencies" required>
  The three-letter ISO currency code for the alerted amount.

  Available options: `usd`, `sgd`, `inr`, `aud`, `brl`, `cad`, `dkk`, `eur`, `nok`, `gbp`, `sek`, `chf`, `hkd`, `huf`, `jpy`, `mxn`, `myr`, `pln`, `czk`, `nzd`, `aed`, `eth`, `ape`, `cop`, `ron`, `thb`, `bgn`, `idr`, `dop`, `php`, `try`, `krw`, `twd`, `vnd`, `pkr`, `clp`, `uyu`, `ars`, `zar`, `dzd`, `tnd`, `mad`, `kes`, `kwd`, `jod`, `all`, `xcd`, `amd`, `bsd`, `bhd`, `bob`, `bam`, `khr`, `crc`, `xof`, `egp`, `etb`, `gmd`, `ghs`, `gtq`, `gyd`, `ils`, `jmd`, `mop`, `mga`, `mur`, `mdl`, `mnt`, `nad`, `ngn`, `mkd`, `omr`, `pyg`, `pen`, `qar`, `rwf`, `sar`, `rsd`, `lkr`, `tzs`, `ttd`, `uzs`, `rub`, `btc`, `cny`, `usdt`, `kzt`, `awg`, `whop_usd`, `xau`
</ResponseField>

<ResponseField name="dispute" type="object | null" required>
  The dispute associated with the dispute alert.

  <Expandable title="child attributes">
    <ResponseField name="amount" type="number" required>
      The disputed amount in the specified currency, formatted as a decimal.

      Example: `6.9`
    </ResponseField>

    <ResponseField name="created_at" type="string<date-time> | null" required>
      The datetime the dispute was created.

      Example: `2023-12-01T05:00:00.401Z`
    </ResponseField>

    <ResponseField name="currency" type="Currencies" required>
      The three-letter ISO currency code for the disputed amount.

      Available options: `usd`, `sgd`, `inr`, `aud`, `brl`, `cad`, `dkk`, `eur`, `nok`, `gbp`, `sek`, `chf`, `hkd`, `huf`, `jpy`, `mxn`, `myr`, `pln`, `czk`, `nzd`, `aed`, `eth`, `ape`, `cop`, `ron`, `thb`, `bgn`, `idr`, `dop`, `php`, `try`, `krw`, `twd`, `vnd`, `pkr`, `clp`, `uyu`, `ars`, `zar`, `dzd`, `tnd`, `mad`, `kes`, `kwd`, `jod`, `all`, `xcd`, `amd`, `bsd`, `bhd`, `bob`, `bam`, `khr`, `crc`, `xof`, `egp`, `etb`, `gmd`, `ghs`, `gtq`, `gyd`, `ils`, `jmd`, `mop`, `mga`, `mur`, `mdl`, `mnt`, `nad`, `ngn`, `mkd`, `omr`, `pyg`, `pen`, `qar`, `rwf`, `sar`, `rsd`, `lkr`, `tzs`, `ttd`, `uzs`, `rub`, `btc`, `cny`, `usdt`, `kzt`, `awg`, `whop_usd`, `xau`
    </ResponseField>

    <ResponseField name="id" type="string" required>
      The unique identifier for the dispute.

      Example: `dspt_xxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="reason" type="string | null" required>
      A human-readable reason for the dispute.

      Example: `Product Not Received`
    </ResponseField>

    <ResponseField name="status" type="DisputeStatuses" required>
      The current status of the dispute lifecycle, such as needs\_response, under\_review, won, or lost.

      Available options: `warning_needs_response`, `warning_under_review`, `warning_closed`, `needs_response`, `under_review`, `won`, `lost`, `closed`, `other`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier of the dispute alert.

  Example: `dspa_xxxxxxxxxxxxx`
</ResponseField>

<ResponseField name="payment" type="object | null" required>
  The payment associated with the dispute alert.

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

    <ResponseField name="paid_at" type="string<date-time> | null" required>
      The time at which this payment was successfully collected. Null if the payment has not yet succeeded. As a Unix timestamp.

      Example: `2023-12-01T05:00:00.401Z`
    </ResponseField>

    <ResponseField name="payment_method_type" type="PaymentMethodTypes | null" required>
      The type of payment instrument used for this payment (e.g., card, Cash App, iDEAL, Klarna, crypto). Null when the processor does not supply a type.

      Available options: `acss_debit`, `addi`, `affirm`, `afterpay_clearpay`, `alipay`, `alma`, `amazon_pay`, `apple`, `apple_pay`, `au_bank_transfer`, `au_becs_debit`, `bacs_debit`, `bancolombia`, `bancontact`, `bank_wire`, `billie`, `bizum`, `blik`, `boleto`, `bre_b`, `ca_bank_transfer`, `capchase_pay`, `card`, `card_installments_three`, `card_installments_six`, `card_installments_twelve`, `cashapp`, `claritypay`, `coinbase`, `crypto`, `custom`, `customer_balance`, `demo_pay`, `efecty`, `eps`, `eu_bank_transfer`, `fpx`, `gb_bank_transfer`, `giropay`, `google_pay`, `gopay`, `grabpay`, `id_bank_transfer`, `ideal`, `interac`, `kakao_pay`, `klarna`, `klarna_pay_now`, `konbini`, `kr_card`, `kr_market`, `kriya`, `kueski`, `link`, `mb_way`, `m_pesa`, `mercado_pago`, `mobilepay`, `modo`, `mondu`, `multibanco`, `naver_pay`, `nequi`, `netbanking`, `ng_bank`, `ng_bank_transfer`, `ng_card`, `ng_market`, `ng_ussd`, `ng_wallet`, `nz_bank_account`, `oxxo`, `p24`, `pago_efectivo`, `pse`, `pay_by_bank`, `payco`, `paynow`, `paypal`, `paypay`, `payto`, `pix`, `platform_balance`, `promptpay`, `qris`, `rapipago`, `rechnung`, `revolut_pay`, `samsung_pay`, `satispay`, `scalapay`, `sencillito`, `sepa_debit`, `sequra`, `servipag`, `sezzle`, `shop_pay`, `shopeepay`, `sofort`, `south_korea_market`, `spei`, `splitit`, `sunbit`, `swish`, `tamara`, `twint`, `upi`, `us_bank_account`, `us_bank_transfer`, `venmo`, `vipps`, `webpay`, `wechat_pay`, `yape`, `zip`, `coinflow`, `unknown`
    </ResponseField>

    <ResponseField name="subtotal" type="number | null" required>
      The subtotal to show to the creator (excluding buyer fees).

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

<ResponseField name="transaction_date" type="string<date-time> | null" required>
  The date of the original transaction.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>
