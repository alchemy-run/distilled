> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Setup Intent

> A setup intent allows a user to save a payment method for future use without making an immediate purchase.

<Note>
  **There is no `createSetupIntent` endpoint.** Setup intents are created indirectly by creating a [Checkout Configuration](/api-reference/checkout-configurations/create-checkout-configuration) with `mode: "setup"`. The buyer completes that checkout, and Whop creates the setup intent behind the scenes. Listen for the `setup_intent.succeeded` webhook to receive the payment method ID once it's saved.

  See [Save payment methods](/developer/guides/save-payment-methods) for the full flow.
</Note>

```typescript theme={null}
// Create a setup intent by opening a checkout in setup mode
const checkoutConfiguration = await client.checkoutConfigurations.create({
	account_id: "biz_xxxxxxxxxxxxx",
	mode: "setup",
	redirect_url: "https://yoursite.com/return",
	metadata: { customer_id: "your_internal_id" },
});

// Redirect the buyer to checkoutConfiguration.purchase_url
// or use <WhopCheckoutEmbed sessionId={checkoutConfiguration.id} />.
// Then listen for setup_intent.succeeded on your webhook handler.
```

<ResponseExample>
  ```json Example theme={null}
  {
  	"checkout_configuration": {
  		"id": "ch_xxxxxxxxxxxxxxx"
  	},
  	"company": {
  		"id": "biz_xxxxxxxxxxxxxx"
  	},
  	"created_at": "2023-12-01T05:00:00.401Z",
  	"error_message": "Your card was declined.",
  	"id": "sint_xxxxxxxxxxxxx",
  	"member": {
  		"id": "<string>",
  		"user": {
  			"email": "<string>",
  			"id": "<string>",
  			"name": "<string>",
  			"username": "<string>"
  		}
  	},
  	"metadata": {},
  	"payment_method": {
  		"card": {
  			"brand": "mastercard",
  			"exp_month": 42,
  			"exp_year": 42,
  			"last4": "4242"
  		},
  		"created_at": "2023-12-01T05:00:00.401Z",
  		"id": "payt_xxxxxxxxxxxxx",
  		"mailing_address": {
  			"city": "<string>",
  			"country": "<string>",
  			"line1": "<string>",
  			"line2": "<string>",
  			"name": "<string>",
  			"postal_code": "<string>",
  			"state": "<string>"
  		},
  		"payment_method_type": "acss_debit"
  	},
  	"status": "processing",
  	"three_ds_verified": true
  }
  ```
</ResponseExample>

<ResponseField name="checkout_configuration" type="object | null" required>
  The checkout session configuration associated with this setup intent. Null if no checkout session was used.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the checkout session.

      Example: `ch_xxxxxxxxxxxxxxx`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="company" type="object | null" required>
  The company that initiated this setup intent. Null if the company has been deleted.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the company.

      Example: `biz_xxxxxxxxxxxxxx`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="created_at" type="string<date-time>" required>
  The datetime the setup intent was created.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="error_message" type="string | null" required>
  A human-readable error message explaining why the setup intent failed. Null if no error occurred.

  Example: `Your card was declined.`
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the setup intent.

  Example: `sint_xxxxxxxxxxxxx`
</ResponseField>

<ResponseField name="member" type="object | null" required>
  The company member associated with this setup intent. Null if the user is not a member.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the company member.
    </ResponseField>

    <ResponseField name="user" type="object | null" required>
      The user for this member, if any.

      <Expandable title="child attributes">
        <ResponseField name="email" type="string | null" required>
          The digital mailing address of the user.
        </ResponseField>

        <ResponseField name="id" type="string" required>
          The unique identifier for the company member user.
        </ResponseField>

        <ResponseField name="name" type="string | null" required>
          The user's full name.
        </ResponseField>

        <ResponseField name="username" type="string" required>
          The whop username.
        </ResponseField>
      </Expandable>
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="metadata" type="object | null" required>
  Custom key-value pairs attached to this setup intent. Null if no metadata was
  provided.
</ResponseField>

<ResponseField name="payment_method" type="object | null" required>
  The saved payment method created by this setup intent. Null if the setup has not completed successfully.

  <Expandable title="child attributes">
    <ResponseField name="card" type="object | null" required>
      The card data associated with the payment method, if its a debit or credit card.

      <Expandable title="child attributes">
        <ResponseField name="brand" type="CardBrands | null" required>
          The card network (e.g., visa, mastercard, amex). Null if the brand could not be determined.

          Available options: `mastercard`, `visa`, `amex`, `discover`, `unionpay`, `jcb`, `diners`, `link`, `troy`, `visadankort`, `visabancontact`, `china_union_pay`, `rupay`, `jcbrupay`, `elo`, `maestro`, `tarjeta_naranja`, `cirrus`, `nspk_mir`, `verve`, `ebt`, `private_label`, `local_brand`, `uatp`, `wexcard`, `uzcard`, `meeza`, `hrg_store_card`, `girocard`, `fuel_card`, `dankort`, `carnet`, `atm_card`, `china_union_payuzcard`, `codensa`, `cabal`, `hipercard`, `jcblankapay`, `cmi`, `aura`, `accel`, `culiance`, `nyce`, `pulse`, `star`, `unknown`
        </ResponseField>

        <ResponseField name="exp_month" type="integer | null" required>
          The two-digit expiration month of the card (1-12). Null if not available.

          Example: `42`
        </ResponseField>

        <ResponseField name="exp_year" type="integer | null" required>
          The two-digit expiration year of the card (e.g., 27 for 2027). Null if not available.

          Example: `42`
        </ResponseField>

        <ResponseField name="last4" type="string | null" required>
          The last four digits of the card number. Null if not available.

          Example: `4242`
        </ResponseField>
      </Expandable>
    </ResponseField>

    <ResponseField name="created_at" type="string<date-time>" required>
      The datetime the payment token was created.

      Example: `2023-12-01T05:00:00.401Z`
    </ResponseField>

    <ResponseField name="id" type="string" required>
      The unique identifier for the payment token.

      Example: `payt_xxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="mailing_address" type="object | null" required>
      The mailing address associated with the payment method's user

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

        <ResponseField name="postal_code" type="string | null" required>
          The postal code of the address.
        </ResponseField>

        <ResponseField name="state" type="string | null" required>
          The state of the address.
        </ResponseField>
      </Expandable>
    </ResponseField>

    <ResponseField name="payment_method_type" type="PaymentMethodTypes" required>
      The payment method type of the payment method

      Available options: `acss_debit`, `addi`, `affirm`, `afterpay_clearpay`, `alipay`, `alma`, `amazon_pay`, `apple`, `apple_pay`, `au_bank_transfer`, `au_becs_debit`, `bacs_debit`, `bancolombia`, `bancontact`, `bank_wire`, `billie`, `bizum`, `blik`, `boleto`, `bre_b`, `ca_bank_transfer`, `capchase_pay`, `card`, `card_installments_three`, `card_installments_six`, `card_installments_twelve`, `cashapp`, `claritypay`, `coinbase`, `crypto`, `custom`, `customer_balance`, `demo_pay`, `efecty`, `eps`, `eu_bank_transfer`, `fpx`, `gb_bank_transfer`, `giropay`, `google_pay`, `gopay`, `grabpay`, `id_bank_transfer`, `ideal`, `interac`, `kakao_pay`, `klarna`, `klarna_pay_now`, `konbini`, `kr_card`, `kr_market`, `kriya`, `kueski`, `link`, `mb_way`, `m_pesa`, `mercado_pago`, `mobilepay`, `modo`, `mondu`, `multibanco`, `naver_pay`, `nequi`, `netbanking`, `ng_bank`, `ng_bank_transfer`, `ng_card`, `ng_market`, `ng_ussd`, `ng_wallet`, `nz_bank_account`, `oxxo`, `p24`, `pago_efectivo`, `pse`, `pay_by_bank`, `payco`, `paynow`, `paypal`, `paypay`, `payto`, `pix`, `platform_balance`, `promptpay`, `qris`, `rapipago`, `rechnung`, `revolut_pay`, `samsung_pay`, `satispay`, `scalapay`, `sencillito`, `sepa_debit`, `sequra`, `servipag`, `sezzle`, `shop_pay`, `shopeepay`, `sofort`, `south_korea_market`, `spei`, `splitit`, `sunbit`, `swish`, `tamara`, `twint`, `upi`, `us_bank_account`, `us_bank_transfer`, `venmo`, `vipps`, `webpay`, `wechat_pay`, `yape`, `zip`, `coinflow`, `unknown`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="status" type="SetupIntentStatuses" required>
  The current status of the setup intent.

  Available options: `processing`, `succeeded`, `canceled`, `requires_action`
</ResponseField>

<ResponseField name="three_ds_verified" type="boolean" required>
  Whether 3D Secure authentication was completed when this payment method was
  set up.
</ResponseField>
