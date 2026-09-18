> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Dispute

> A dispute is a chargeback or payment challenge filed against a company, including evidence and response status.

<Note>
  This resource has a successor in the [Whop
  API](/api-reference/beta/disputes/list-disputes), the versioned API that new
  integrations should build on. This page stays fully supported.
</Note>

<ResponseExample>
  ```json Example theme={null}
  {
  	"access_activity_log": "192.168.1.1 - 2024-01-15 12:00:00 UTC",
  	"amount": 6.9,
  	"billing_address": "123 Main St, New York, NY 10001",
  	"cancellation_policy_attachment": {
  		"content_type": "image/jpeg",
  		"filename": "document.pdf",
  		"id": "<string>",
  		"url": "https://media.whop.com/abc123/optimized.jpg"
  	},
  	"cancellation_policy_disclosure": "All sales are final. No refunds after 30 days.",
  	"company": {
  		"id": "biz_xxxxxxxxxxxxxx",
  		"title": "<string>"
  	},
  	"created_at": "2023-12-01T05:00:00.401Z",
  	"currency": "usd",
  	"customer_communication_attachment": {
  		"content_type": "image/jpeg",
  		"filename": "document.pdf",
  		"id": "<string>",
  		"url": "https://media.whop.com/abc123/optimized.jpg"
  	},
  	"customer_email_address": "customer@example.com",
  	"customer_name": "Jane Doe",
  	"editable": true,
  	"id": "dspt_xxxxxxxxxxxxx",
  	"needs_response_by": "2023-12-01T05:00:00.401Z",
  	"notes": "Customer used the product for 3 months before disputing.",
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
  		"payment_instrument": {
  			"display_name": "<string>",
  			"icons": {
  				"square": {
  					"dark": {
  						"svg": "<string>"
  					},
  					"light": {
  						"svg": "<string>"
  					}
  				}
  			},
  			"installment_count": 42,
  			"payment_method_type": "<string>"
  		},
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
  	"plan": {
  		"id": "plan_xxxxxxxxxxxxx"
  	},
  	"product": {
  		"id": "prod_xxxxxxxxxxxxx",
  		"title": "Pickaxe Analytics"
  	},
  	"product_description": "Monthly subscription to premium analytics dashboard.",
  	"reason": "Product Not Received",
  	"reason_code": "10.4",
  	"refund_policy_attachment": {
  		"content_type": "image/jpeg",
  		"filename": "document.pdf",
  		"id": "<string>",
  		"url": "https://media.whop.com/abc123/optimized.jpg"
  	},
  	"refund_policy_disclosure": "Refunds available within 14 days of purchase.",
  	"refund_refusal_explanation": "The customer exceeded the refund window by 60 days.",
  	"service_date": "2024-01-15",
  	"status": "warning_needs_response",
  	"uncategorized_attachment": {
  		"content_type": "image/jpeg",
  		"filename": "document.pdf",
  		"id": "<string>",
  		"url": "https://media.whop.com/abc123/optimized.jpg"
  	},
  	"visa_rdr": true
  }
  ```
</ResponseExample>

<ResponseField name="access_activity_log" type="string | null" required>
  A log of IP-based access activity for the customer on Whop, submitted as evidence in the dispute.

  Example: `192.168.1.1 - 2024-01-15 12:00:00 UTC`
</ResponseField>

<ResponseField name="amount" type="number" required>
  The disputed amount in the specified currency, formatted as a decimal.

  Example: `6.9`
</ResponseField>

<ResponseField name="billing_address" type="string | null" required>
  The customer's billing address from their payment details, submitted as evidence in the dispute.

  Example: `123 Main St, New York, NY 10001`
</ResponseField>

<ResponseField name="cancellation_policy_attachment" type="object | null" required>
  The cancellation policy document uploaded as dispute evidence. Null if no cancellation policy has been provided.

  <Expandable title="child attributes">
    <ResponseField name="content_type" type="string | null" required>
      Uploaded file MIME type, such as image/jpeg, video/mp4, or audio/mpeg.

      Example: `image/jpeg`
    </ResponseField>

    <ResponseField name="filename" type="string | null" required>
      The original filename of the uploaded attachment, including its file extension.

      Example: `document.pdf`
    </ResponseField>

    <ResponseField name="id" type="string" required />

    <ResponseField name="url" type="string | null" required>
      A pre-optimized URL for rendering this attachment on the client. This should be used for displaying attachments in apps.

      Example: `https://media.whop.com/abc123/optimized.jpg`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="cancellation_policy_disclosure" type="string | null" required>
  A text disclosure describing the company's cancellation policy, submitted as dispute evidence.

  Example: `All sales are final. No refunds after 30 days.`
</ResponseField>

<ResponseField name="company" type="object | null" required>
  The company that the dispute was filed against.

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

<ResponseField name="created_at" type="string<date-time> | null" required>
  The datetime the dispute was created.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="currency" type="Currencies" required>
  The three-letter ISO currency code for the disputed amount.

  Available options: `usd`, `sgd`, `inr`, `aud`, `brl`, `cad`, `dkk`, `eur`, `nok`, `gbp`, `sek`, `chf`, `hkd`, `huf`, `jpy`, `mxn`, `myr`, `pln`, `czk`, `nzd`, `aed`, `eth`, `ape`, `cop`, `ron`, `thb`, `bgn`, `idr`, `dop`, `php`, `try`, `krw`, `twd`, `vnd`, `pkr`, `clp`, `uyu`, `ars`, `zar`, `dzd`, `tnd`, `mad`, `kes`, `kwd`, `jod`, `all`, `xcd`, `amd`, `bsd`, `bhd`, `bob`, `bam`, `khr`, `crc`, `xof`, `egp`, `etb`, `gmd`, `ghs`, `gtq`, `gyd`, `ils`, `jmd`, `mop`, `mga`, `mur`, `mdl`, `mnt`, `nad`, `ngn`, `mkd`, `omr`, `pyg`, `pen`, `qar`, `rwf`, `sar`, `rsd`, `lkr`, `tzs`, `ttd`, `uzs`, `rub`, `btc`, `cny`, `usdt`, `kzt`, `awg`, `whop_usd`, `xau`
</ResponseField>

<ResponseField name="customer_communication_attachment" type="object | null" required>
  Evidence of customer communication or product usage, uploaded as a dispute attachment. Null if not provided.

  <Expandable title="child attributes">
    <ResponseField name="content_type" type="string | null" required>
      Uploaded file MIME type, such as image/jpeg, video/mp4, or audio/mpeg.

      Example: `image/jpeg`
    </ResponseField>

    <ResponseField name="filename" type="string | null" required>
      The original filename of the uploaded attachment, including its file extension.

      Example: `document.pdf`
    </ResponseField>

    <ResponseField name="id" type="string" required />

    <ResponseField name="url" type="string | null" required>
      A pre-optimized URL for rendering this attachment on the client. This should be used for displaying attachments in apps.

      Example: `https://media.whop.com/abc123/optimized.jpg`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="customer_email_address" type="string | null" required>
  The customer's email address from their payment details, included in the evidence packet sent to the payment processor. Editable before submission.

  Example: `customer@example.com`
</ResponseField>

<ResponseField name="customer_name" type="string | null" required>
  The customer's full name from their payment details, included in the evidence packet sent to the payment processor. Editable before submission.

  Example: `Jane Doe`
</ResponseField>

<ResponseField name="editable" type="boolean | null" required>
  Whether the dispute evidence can still be edited and submitted.
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the dispute.

  Example: `dspt_xxxxxxxxxxxxx`
</ResponseField>

<ResponseField name="needs_response_by" type="string<date-time> | null" required>
  The deadline by which dispute evidence must be submitted. Null if no response deadline is set.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="notes" type="string | null" required>
  Additional freeform notes submitted by the company as part of the dispute evidence.

  Example: `Customer used the product for 3 months before disputing.`
</ResponseField>

<ResponseField name="payment" type="object | null" required>
  The original payment that was disputed.

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

    <ResponseField name="payment_instrument" type="object | null" required>
      The instrument this payment was made with, shaped for display: the method type, a buyer-facing name, the standard icon set, and the card facts when it was a card. Null when the receipt names no payment method.

      <Expandable title="child attributes">
        <ResponseField name="display_name" type="string" required>
          Buyer-facing instrument name — "Visa •••• 4242" when the card surfaced, else
          the method's own name ("Klarna").
        </ResponseField>

        <ResponseField name="icons" type="object" required>
          The standard icon set: square and card shapes, each in light and dark colorways.

          <Expandable title="child attributes">
            <ResponseField name="square" type="object" required>
              The square tile (32x32).

              <Expandable title="child attributes">
                <ResponseField name="dark" type="object" required>
                  The colorway for dark surfaces.

                  <Expandable title="child attributes">
                    <ResponseField name="svg" type="string" required>
                      The vector file. Prefer this everywhere SVG renders.
                    </ResponseField>
                  </Expandable>
                </ResponseField>

                <ResponseField name="light" type="object" required>
                  The colorway for light surfaces.

                  <Expandable title="child attributes">
                    <ResponseField name="svg" type="string" required>
                      The vector file. Prefer this everywhere SVG renders.
                    </ResponseField>
                  </Expandable>
                </ResponseField>
              </Expandable>
            </ResponseField>
          </Expandable>
        </ResponseField>

        <ResponseField name="installment_count" type="integer | null" required>
          Installment methods only: how many payments the charge splits into. Data, not copy — compose and translate the label client-side.

          Example: `42`
        </ResponseField>

        <ResponseField name="payment_method_type" type="string" required>
          The payment method type identifier, e.g. `card`, `klarna`, `apple_pay`.
        </ResponseField>
      </Expandable>
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

<ResponseField name="plan" type="object | null" required>
  The plan associated with the disputed payment. Null if the dispute is not linked to a specific plan.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the plan.

      Example: `plan_xxxxxxxxxxxxx`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="product" type="object | null" required>
  The product associated with the disputed payment. Null if the dispute is not linked to a specific product.

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

<ResponseField name="product_description" type="string | null" required>
  A description of the product or service provided, submitted as dispute evidence.

  Example: `Monthly subscription to premium analytics dashboard.`
</ResponseField>

<ResponseField name="reason" type="string | null" required>
  A human-readable reason for the dispute.

  Example: `Product Not Received`
</ResponseField>

<ResponseField name="reason_code" type="string | null" required>
  The card network reason code for the dispute. Null when the payment processor did not provide one.

  Example: `10.4`
</ResponseField>

<ResponseField name="refund_policy_attachment" type="object | null" required>
  The refund policy document uploaded as dispute evidence. Null if no refund policy has been provided.

  <Expandable title="child attributes">
    <ResponseField name="content_type" type="string | null" required>
      Uploaded file MIME type, such as image/jpeg, video/mp4, or audio/mpeg.

      Example: `image/jpeg`
    </ResponseField>

    <ResponseField name="filename" type="string | null" required>
      The original filename of the uploaded attachment, including its file extension.

      Example: `document.pdf`
    </ResponseField>

    <ResponseField name="id" type="string" required />

    <ResponseField name="url" type="string | null" required>
      A pre-optimized URL for rendering this attachment on the client. This should be used for displaying attachments in apps.

      Example: `https://media.whop.com/abc123/optimized.jpg`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="refund_policy_disclosure" type="string | null" required>
  A text disclosure describing the company's refund policy, submitted as dispute evidence.

  Example: `Refunds available within 14 days of purchase.`
</ResponseField>

<ResponseField name="refund_refusal_explanation" type="string | null" required>
  An explanation from the company for why a refund was refused, submitted as dispute evidence.

  Example: `The customer exceeded the refund window by 60 days.`
</ResponseField>

<ResponseField name="service_date" type="string | null" required>
  The date when the product or service was delivered to the customer, submitted as dispute evidence.

  Example: `2024-01-15`
</ResponseField>

<ResponseField name="status" type="DisputeStatuses" required>
  The current status of the dispute lifecycle, such as needs\_response, under\_review, won, or lost.

  Available options: `warning_needs_response`, `warning_under_review`, `warning_closed`, `needs_response`, `under_review`, `won`, `lost`, `closed`, `other`
</ResponseField>

<ResponseField name="uncategorized_attachment" type="object | null" required>
  An additional attachment that does not fit into the standard evidence categories. Null if not provided.

  <Expandable title="child attributes">
    <ResponseField name="content_type" type="string | null" required>
      Uploaded file MIME type, such as image/jpeg, video/mp4, or audio/mpeg.

      Example: `image/jpeg`
    </ResponseField>

    <ResponseField name="filename" type="string | null" required>
      The original filename of the uploaded attachment, including its file extension.

      Example: `document.pdf`
    </ResponseField>

    <ResponseField name="id" type="string" required />

    <ResponseField name="url" type="string | null" required>
      A pre-optimized URL for rendering this attachment on the client. This should be used for displaying attachments in apps.

      Example: `https://media.whop.com/abc123/optimized.jpg`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="visa_rdr" type="boolean" required>
  Whether the dispute was automatically resolved through Visa Rapid Dispute
  Resolution (RDR).
</ResponseField>
