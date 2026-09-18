> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Payment Method

<ResponseExample>
  ```json Example theme={null}
  {
  	"created_at": "2023-12-01T05:00:00.401Z",
  	"icons": {
  		"card": {
  			"dark": {
  				"png_1x": "<string>",
  				"png_2x": "<string>",
  				"png_4x": "<string>",
  				"svg": "<string>"
  			},
  			"light": {
  				"png_1x": "<string>",
  				"png_2x": "<string>",
  				"png_4x": "<string>",
  				"svg": "<string>"
  			}
  		},
  		"square": {
  			"dark": {
  				"png_1x": "<string>",
  				"png_2x": "<string>",
  				"png_4x": "<string>",
  				"svg": "<string>"
  			},
  			"light": {
  				"png_1x": "<string>",
  				"png_2x": "<string>",
  				"png_4x": "<string>",
  				"svg": "<string>"
  			}
  		}
  	},
  	"id": "payt_xxxxxxxxxxxxx",
  	"payment_method_type": "acss_debit",
  	"typename": "BasePaymentMethod"
  }
  ```
</ResponseExample>

This object is one of the following variants, distinguished by `typename`:

### Base Payment Method

<ResponseField name="created_at" type="string<date-time>" required>
  The time of the event in ISO 8601 UTC format with millisecond precision

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="icons" type="object" required>
  Every rendition of the icon to display this payment method with. A saved card carries its brand's icon (Visa, Mastercard, ...) rather than the generic card art.

  <Expandable title="child attributes">
    <ResponseField name="card" type="object" required>
      The credit-card-proportioned tile (48x30).

      <Expandable title="child attributes">
        <ResponseField name="dark" type="object" required>
          The colorway for dark surfaces.

          <Expandable title="child attributes">
            <ResponseField name="png_1x" type="string" required>
              Raster fallback at the shape's native size.
            </ResponseField>

            <ResponseField name="png_2x" type="string" required>
              Raster fallback at double density.
            </ResponseField>

            <ResponseField name="png_4x" type="string" required>
              Raster fallback at quadruple density.
            </ResponseField>

            <ResponseField name="svg" type="string" required>
              The vector file. Prefer this everywhere SVG renders.
            </ResponseField>
          </Expandable>
        </ResponseField>

        <ResponseField name="light" type="object" required>
          The colorway for light surfaces.

          <Expandable title="child attributes">
            <ResponseField name="png_1x" type="string" required>
              Raster fallback at the shape's native size.
            </ResponseField>

            <ResponseField name="png_2x" type="string" required>
              Raster fallback at double density.
            </ResponseField>

            <ResponseField name="png_4x" type="string" required>
              Raster fallback at quadruple density.
            </ResponseField>

            <ResponseField name="svg" type="string" required>
              The vector file. Prefer this everywhere SVG renders.
            </ResponseField>
          </Expandable>
        </ResponseField>
      </Expandable>
    </ResponseField>

    <ResponseField name="square" type="object" required>
      The square tile (32x32).

      <Expandable title="child attributes">
        <ResponseField name="dark" type="object" required>
          The colorway for dark surfaces.

          <Expandable title="child attributes">
            <ResponseField name="png_1x" type="string" required>
              Raster fallback at the shape's native size.
            </ResponseField>

            <ResponseField name="png_2x" type="string" required>
              Raster fallback at double density.
            </ResponseField>

            <ResponseField name="png_4x" type="string" required>
              Raster fallback at quadruple density.
            </ResponseField>

            <ResponseField name="svg" type="string" required>
              The vector file. Prefer this everywhere SVG renders.
            </ResponseField>
          </Expandable>
        </ResponseField>

        <ResponseField name="light" type="object" required>
          The colorway for light surfaces.

          <Expandable title="child attributes">
            <ResponseField name="png_1x" type="string" required>
              Raster fallback at the shape's native size.
            </ResponseField>

            <ResponseField name="png_2x" type="string" required>
              Raster fallback at double density.
            </ResponseField>

            <ResponseField name="png_4x" type="string" required>
              Raster fallback at quadruple density.
            </ResponseField>

            <ResponseField name="svg" type="string" required>
              The vector file. Prefer this everywhere SVG renders.
            </ResponseField>
          </Expandable>
        </ResponseField>
      </Expandable>
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="id" type="string" required>
  Example: `payt_xxxxxxxxxxxxx`
</ResponseField>

<ResponseField name="payment_method_type" type="PaymentMethodTypes" required>
  The type of payment instrument stored on file (e.g., card, us\_bank\_account, cashapp, ideal, sepa\_debit).

  Available options: `acss_debit`, `addi`, `affirm`, `afterpay_clearpay`, `alipay`, `alma`, `amazon_pay`, `apple`, `apple_pay`, `au_bank_transfer`, `au_becs_debit`, `bacs_debit`, `bancolombia`, `bancontact`, `bank_wire`, `billie`, `bizum`, `blik`, `boleto`, `bre_b`, `ca_bank_transfer`, `capchase_pay`, `card`, `card_installments_three`, `card_installments_six`, `card_installments_twelve`, `cashapp`, `claritypay`, `coinbase`, `crypto`, `custom`, `customer_balance`, `demo_pay`, `efecty`, `eps`, `eu_bank_transfer`, `fpx`, `gb_bank_transfer`, `giropay`, `google_pay`, `gopay`, `grabpay`, `id_bank_transfer`, `ideal`, `interac`, `kakao_pay`, `klarna`, `klarna_pay_now`, `konbini`, `kr_card`, `kr_market`, `kriya`, `kueski`, `link`, `mb_way`, `m_pesa`, `mercado_pago`, `mobilepay`, `modo`, `mondu`, `multibanco`, `naver_pay`, `nequi`, `netbanking`, `ng_bank`, `ng_bank_transfer`, `ng_card`, `ng_market`, `ng_ussd`, `ng_wallet`, `nz_bank_account`, `oxxo`, `p24`, `pago_efectivo`, `pse`, `pay_by_bank`, `payco`, `paynow`, `paypal`, `paypay`, `payto`, `pix`, `platform_balance`, `promptpay`, `qris`, `rapipago`, `rechnung`, `revolut_pay`, `samsung_pay`, `satispay`, `scalapay`, `sencillito`, `sepa_debit`, `sequra`, `servipag`, `sezzle`, `shop_pay`, `shopeepay`, `sofort`, `south_korea_market`, `spei`, `splitit`, `sunbit`, `swish`, `tamara`, `twint`, `upi`, `us_bank_account`, `us_bank_transfer`, `venmo`, `vipps`, `webpay`, `wechat_pay`, `yape`, `zip`, `coinflow`, `unknown`
</ResponseField>

<ResponseField name="typename" type="string" required>
  The typename of this object
</ResponseField>

### Card Payment Method

<ResponseField name="card" type="object" required>
  The card-specific details for this payment method, including brand, last four digits, and expiration.

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

    <ResponseField name="expired" type="boolean" required>
      Whether the card is past its expiration month. An expired card cannot take a
      new charge.
    </ResponseField>

    <ResponseField name="fingerprint" type="string | null" required>
      A stable identifier for the underlying card. Two payment methods with the same
      fingerprint are the same card. Null if not available.
    </ResponseField>

    <ResponseField name="funding_type" type="CardFundingTypes | null" required>
      How the card is funded by the issuer. Null if the funding type could not be determined.

      Available options: `credit`, `debit`, `prepaid`
    </ResponseField>

    <ResponseField name="last4" type="string | null" required>
      The last four digits of the card number. Null if not available.

      Example: `4242`
    </ResponseField>

    <ResponseField name="three_ds_verified" type="boolean" required>
      Whether this card was verified with 3D Secure, either when it was saved or on a payment that used it.
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="created_at" type="string<date-time>" required>
  The time of the event in ISO 8601 UTC format with millisecond precision

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="has_payer_document" type="boolean" required>
  Whether this card has the payer identity document required by its payment
  provider.
</ResponseField>

<ResponseField name="icons" type="object" required>
  Every rendition of the icon to display this payment method with. A saved card carries its brand's icon (Visa, Mastercard, ...) rather than the generic card art.

  <Expandable title="child attributes">
    <ResponseField name="card" type="object" required>
      The credit-card-proportioned tile (48x30).

      <Expandable title="child attributes">
        <ResponseField name="dark" type="object" required>
          The colorway for dark surfaces.

          <Expandable title="child attributes">
            <ResponseField name="png_1x" type="string" required>
              Raster fallback at the shape's native size.
            </ResponseField>

            <ResponseField name="png_2x" type="string" required>
              Raster fallback at double density.
            </ResponseField>

            <ResponseField name="png_4x" type="string" required>
              Raster fallback at quadruple density.
            </ResponseField>

            <ResponseField name="svg" type="string" required>
              The vector file. Prefer this everywhere SVG renders.
            </ResponseField>
          </Expandable>
        </ResponseField>

        <ResponseField name="light" type="object" required>
          The colorway for light surfaces.

          <Expandable title="child attributes">
            <ResponseField name="png_1x" type="string" required>
              Raster fallback at the shape's native size.
            </ResponseField>

            <ResponseField name="png_2x" type="string" required>
              Raster fallback at double density.
            </ResponseField>

            <ResponseField name="png_4x" type="string" required>
              Raster fallback at quadruple density.
            </ResponseField>

            <ResponseField name="svg" type="string" required>
              The vector file. Prefer this everywhere SVG renders.
            </ResponseField>
          </Expandable>
        </ResponseField>
      </Expandable>
    </ResponseField>

    <ResponseField name="square" type="object" required>
      The square tile (32x32).

      <Expandable title="child attributes">
        <ResponseField name="dark" type="object" required>
          The colorway for dark surfaces.

          <Expandable title="child attributes">
            <ResponseField name="png_1x" type="string" required>
              Raster fallback at the shape's native size.
            </ResponseField>

            <ResponseField name="png_2x" type="string" required>
              Raster fallback at double density.
            </ResponseField>

            <ResponseField name="png_4x" type="string" required>
              Raster fallback at quadruple density.
            </ResponseField>

            <ResponseField name="svg" type="string" required>
              The vector file. Prefer this everywhere SVG renders.
            </ResponseField>
          </Expandable>
        </ResponseField>

        <ResponseField name="light" type="object" required>
          The colorway for light surfaces.

          <Expandable title="child attributes">
            <ResponseField name="png_1x" type="string" required>
              Raster fallback at the shape's native size.
            </ResponseField>

            <ResponseField name="png_2x" type="string" required>
              Raster fallback at double density.
            </ResponseField>

            <ResponseField name="png_4x" type="string" required>
              Raster fallback at quadruple density.
            </ResponseField>

            <ResponseField name="svg" type="string" required>
              The vector file. Prefer this everywhere SVG renders.
            </ResponseField>
          </Expandable>
        </ResponseField>
      </Expandable>
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="id" type="string" required />

<ResponseField name="payment_method_type" type="PaymentMethodTypes" required>
  The type of payment instrument stored on file (e.g., card, us\_bank\_account, cashapp, ideal, sepa\_debit).

  Available options: `acss_debit`, `addi`, `affirm`, `afterpay_clearpay`, `alipay`, `alma`, `amazon_pay`, `apple`, `apple_pay`, `au_bank_transfer`, `au_becs_debit`, `bacs_debit`, `bancolombia`, `bancontact`, `bank_wire`, `billie`, `bizum`, `blik`, `boleto`, `bre_b`, `ca_bank_transfer`, `capchase_pay`, `card`, `card_installments_three`, `card_installments_six`, `card_installments_twelve`, `cashapp`, `claritypay`, `coinbase`, `crypto`, `custom`, `customer_balance`, `demo_pay`, `efecty`, `eps`, `eu_bank_transfer`, `fpx`, `gb_bank_transfer`, `giropay`, `google_pay`, `gopay`, `grabpay`, `id_bank_transfer`, `ideal`, `interac`, `kakao_pay`, `klarna`, `klarna_pay_now`, `konbini`, `kr_card`, `kr_market`, `kriya`, `kueski`, `link`, `mb_way`, `m_pesa`, `mercado_pago`, `mobilepay`, `modo`, `mondu`, `multibanco`, `naver_pay`, `nequi`, `netbanking`, `ng_bank`, `ng_bank_transfer`, `ng_card`, `ng_market`, `ng_ussd`, `ng_wallet`, `nz_bank_account`, `oxxo`, `p24`, `pago_efectivo`, `pse`, `pay_by_bank`, `payco`, `paynow`, `paypal`, `paypay`, `payto`, `pix`, `platform_balance`, `promptpay`, `qris`, `rapipago`, `rechnung`, `revolut_pay`, `samsung_pay`, `satispay`, `scalapay`, `sencillito`, `sepa_debit`, `sequra`, `servipag`, `sezzle`, `shop_pay`, `shopeepay`, `sofort`, `south_korea_market`, `spei`, `splitit`, `sunbit`, `swish`, `tamara`, `twint`, `upi`, `us_bank_account`, `us_bank_transfer`, `venmo`, `vipps`, `webpay`, `wechat_pay`, `yape`, `zip`, `coinflow`, `unknown`
</ResponseField>

<ResponseField name="typename" type="string" required>
  The typename of this object
</ResponseField>

### Us Bank Account Payment Method

<ResponseField name="created_at" type="string<date-time>" required>
  The time of the event in ISO 8601 UTC format with millisecond precision

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="icons" type="object" required>
  Every rendition of the icon to display this payment method with. A saved card carries its brand's icon (Visa, Mastercard, ...) rather than the generic card art.

  <Expandable title="child attributes">
    <ResponseField name="card" type="object" required>
      The credit-card-proportioned tile (48x30).

      <Expandable title="child attributes">
        <ResponseField name="dark" type="object" required>
          The colorway for dark surfaces.

          <Expandable title="child attributes">
            <ResponseField name="png_1x" type="string" required>
              Raster fallback at the shape's native size.
            </ResponseField>

            <ResponseField name="png_2x" type="string" required>
              Raster fallback at double density.
            </ResponseField>

            <ResponseField name="png_4x" type="string" required>
              Raster fallback at quadruple density.
            </ResponseField>

            <ResponseField name="svg" type="string" required>
              The vector file. Prefer this everywhere SVG renders.
            </ResponseField>
          </Expandable>
        </ResponseField>

        <ResponseField name="light" type="object" required>
          The colorway for light surfaces.

          <Expandable title="child attributes">
            <ResponseField name="png_1x" type="string" required>
              Raster fallback at the shape's native size.
            </ResponseField>

            <ResponseField name="png_2x" type="string" required>
              Raster fallback at double density.
            </ResponseField>

            <ResponseField name="png_4x" type="string" required>
              Raster fallback at quadruple density.
            </ResponseField>

            <ResponseField name="svg" type="string" required>
              The vector file. Prefer this everywhere SVG renders.
            </ResponseField>
          </Expandable>
        </ResponseField>
      </Expandable>
    </ResponseField>

    <ResponseField name="square" type="object" required>
      The square tile (32x32).

      <Expandable title="child attributes">
        <ResponseField name="dark" type="object" required>
          The colorway for dark surfaces.

          <Expandable title="child attributes">
            <ResponseField name="png_1x" type="string" required>
              Raster fallback at the shape's native size.
            </ResponseField>

            <ResponseField name="png_2x" type="string" required>
              Raster fallback at double density.
            </ResponseField>

            <ResponseField name="png_4x" type="string" required>
              Raster fallback at quadruple density.
            </ResponseField>

            <ResponseField name="svg" type="string" required>
              The vector file. Prefer this everywhere SVG renders.
            </ResponseField>
          </Expandable>
        </ResponseField>

        <ResponseField name="light" type="object" required>
          The colorway for light surfaces.

          <Expandable title="child attributes">
            <ResponseField name="png_1x" type="string" required>
              Raster fallback at the shape's native size.
            </ResponseField>

            <ResponseField name="png_2x" type="string" required>
              Raster fallback at double density.
            </ResponseField>

            <ResponseField name="png_4x" type="string" required>
              Raster fallback at quadruple density.
            </ResponseField>

            <ResponseField name="svg" type="string" required>
              The vector file. Prefer this everywhere SVG renders.
            </ResponseField>
          </Expandable>
        </ResponseField>
      </Expandable>
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="id" type="string" required />

<ResponseField name="payment_method_type" type="PaymentMethodTypes" required>
  The type of payment instrument stored on file (e.g., card, us\_bank\_account, cashapp, ideal, sepa\_debit).

  Available options: `acss_debit`, `addi`, `affirm`, `afterpay_clearpay`, `alipay`, `alma`, `amazon_pay`, `apple`, `apple_pay`, `au_bank_transfer`, `au_becs_debit`, `bacs_debit`, `bancolombia`, `bancontact`, `bank_wire`, `billie`, `bizum`, `blik`, `boleto`, `bre_b`, `ca_bank_transfer`, `capchase_pay`, `card`, `card_installments_three`, `card_installments_six`, `card_installments_twelve`, `cashapp`, `claritypay`, `coinbase`, `crypto`, `custom`, `customer_balance`, `demo_pay`, `efecty`, `eps`, `eu_bank_transfer`, `fpx`, `gb_bank_transfer`, `giropay`, `google_pay`, `gopay`, `grabpay`, `id_bank_transfer`, `ideal`, `interac`, `kakao_pay`, `klarna`, `klarna_pay_now`, `konbini`, `kr_card`, `kr_market`, `kriya`, `kueski`, `link`, `mb_way`, `m_pesa`, `mercado_pago`, `mobilepay`, `modo`, `mondu`, `multibanco`, `naver_pay`, `nequi`, `netbanking`, `ng_bank`, `ng_bank_transfer`, `ng_card`, `ng_market`, `ng_ussd`, `ng_wallet`, `nz_bank_account`, `oxxo`, `p24`, `pago_efectivo`, `pse`, `pay_by_bank`, `payco`, `paynow`, `paypal`, `paypay`, `payto`, `pix`, `platform_balance`, `promptpay`, `qris`, `rapipago`, `rechnung`, `revolut_pay`, `samsung_pay`, `satispay`, `scalapay`, `sencillito`, `sepa_debit`, `sequra`, `servipag`, `sezzle`, `shop_pay`, `shopeepay`, `sofort`, `south_korea_market`, `spei`, `splitit`, `sunbit`, `swish`, `tamara`, `twint`, `upi`, `us_bank_account`, `us_bank_transfer`, `venmo`, `vipps`, `webpay`, `wechat_pay`, `yape`, `zip`, `coinflow`, `unknown`
</ResponseField>

<ResponseField name="typename" type="string" required>
  The typename of this object
</ResponseField>

<ResponseField name="us_bank_account" type="object" required>
  The bank account-specific details for this payment method, including bank name and last four digits.

  <Expandable title="child attributes">
    <ResponseField name="account_type" type="string" required>
      The type of bank account (e.g., checking, savings).

      Example: `checking`
    </ResponseField>

    <ResponseField name="bank_name" type="string" required>
      The name of the financial institution holding the account.

      Example: `Chase`
    </ResponseField>

    <ResponseField name="last4" type="string" required>
      The last four digits of the bank account number.

      Example: `6789`
    </ResponseField>
  </Expandable>
</ResponseField>

### Cashapp Payment Method

<ResponseField name="cashapp" type="object" required>
  The Cash App-specific details for this payment method, including cashtag and buyer ID.

  <Expandable title="child attributes">
    <ResponseField name="buyer_id" type="string | null" required>
      The unique and immutable identifier assigned by Cash App to the buyer. Null if not available.

      Example: `BUYER_abc123`
    </ResponseField>

    <ResponseField name="cashtag" type="string | null" required>
      The public cashtag handle of the buyer on Cash App. Null if not available.

      Example: `$jacksmith`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="created_at" type="string<date-time>" required>
  The time of the event in ISO 8601 UTC format with millisecond precision

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="icons" type="object" required>
  Every rendition of the icon to display this payment method with. A saved card carries its brand's icon (Visa, Mastercard, ...) rather than the generic card art.

  <Expandable title="child attributes">
    <ResponseField name="card" type="object" required>
      The credit-card-proportioned tile (48x30).

      <Expandable title="child attributes">
        <ResponseField name="dark" type="object" required>
          The colorway for dark surfaces.

          <Expandable title="child attributes">
            <ResponseField name="png_1x" type="string" required>
              Raster fallback at the shape's native size.
            </ResponseField>

            <ResponseField name="png_2x" type="string" required>
              Raster fallback at double density.
            </ResponseField>

            <ResponseField name="png_4x" type="string" required>
              Raster fallback at quadruple density.
            </ResponseField>

            <ResponseField name="svg" type="string" required>
              The vector file. Prefer this everywhere SVG renders.
            </ResponseField>
          </Expandable>
        </ResponseField>

        <ResponseField name="light" type="object" required>
          The colorway for light surfaces.

          <Expandable title="child attributes">
            <ResponseField name="png_1x" type="string" required>
              Raster fallback at the shape's native size.
            </ResponseField>

            <ResponseField name="png_2x" type="string" required>
              Raster fallback at double density.
            </ResponseField>

            <ResponseField name="png_4x" type="string" required>
              Raster fallback at quadruple density.
            </ResponseField>

            <ResponseField name="svg" type="string" required>
              The vector file. Prefer this everywhere SVG renders.
            </ResponseField>
          </Expandable>
        </ResponseField>
      </Expandable>
    </ResponseField>

    <ResponseField name="square" type="object" required>
      The square tile (32x32).

      <Expandable title="child attributes">
        <ResponseField name="dark" type="object" required>
          The colorway for dark surfaces.

          <Expandable title="child attributes">
            <ResponseField name="png_1x" type="string" required>
              Raster fallback at the shape's native size.
            </ResponseField>

            <ResponseField name="png_2x" type="string" required>
              Raster fallback at double density.
            </ResponseField>

            <ResponseField name="png_4x" type="string" required>
              Raster fallback at quadruple density.
            </ResponseField>

            <ResponseField name="svg" type="string" required>
              The vector file. Prefer this everywhere SVG renders.
            </ResponseField>
          </Expandable>
        </ResponseField>

        <ResponseField name="light" type="object" required>
          The colorway for light surfaces.

          <Expandable title="child attributes">
            <ResponseField name="png_1x" type="string" required>
              Raster fallback at the shape's native size.
            </ResponseField>

            <ResponseField name="png_2x" type="string" required>
              Raster fallback at double density.
            </ResponseField>

            <ResponseField name="png_4x" type="string" required>
              Raster fallback at quadruple density.
            </ResponseField>

            <ResponseField name="svg" type="string" required>
              The vector file. Prefer this everywhere SVG renders.
            </ResponseField>
          </Expandable>
        </ResponseField>
      </Expandable>
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="id" type="string" required />

<ResponseField name="payment_method_type" type="PaymentMethodTypes" required>
  The type of payment instrument stored on file (e.g., card, us\_bank\_account, cashapp, ideal, sepa\_debit).

  Available options: `acss_debit`, `addi`, `affirm`, `afterpay_clearpay`, `alipay`, `alma`, `amazon_pay`, `apple`, `apple_pay`, `au_bank_transfer`, `au_becs_debit`, `bacs_debit`, `bancolombia`, `bancontact`, `bank_wire`, `billie`, `bizum`, `blik`, `boleto`, `bre_b`, `ca_bank_transfer`, `capchase_pay`, `card`, `card_installments_three`, `card_installments_six`, `card_installments_twelve`, `cashapp`, `claritypay`, `coinbase`, `crypto`, `custom`, `customer_balance`, `demo_pay`, `efecty`, `eps`, `eu_bank_transfer`, `fpx`, `gb_bank_transfer`, `giropay`, `google_pay`, `gopay`, `grabpay`, `id_bank_transfer`, `ideal`, `interac`, `kakao_pay`, `klarna`, `klarna_pay_now`, `konbini`, `kr_card`, `kr_market`, `kriya`, `kueski`, `link`, `mb_way`, `m_pesa`, `mercado_pago`, `mobilepay`, `modo`, `mondu`, `multibanco`, `naver_pay`, `nequi`, `netbanking`, `ng_bank`, `ng_bank_transfer`, `ng_card`, `ng_market`, `ng_ussd`, `ng_wallet`, `nz_bank_account`, `oxxo`, `p24`, `pago_efectivo`, `pse`, `pay_by_bank`, `payco`, `paynow`, `paypal`, `paypay`, `payto`, `pix`, `platform_balance`, `promptpay`, `qris`, `rapipago`, `rechnung`, `revolut_pay`, `samsung_pay`, `satispay`, `scalapay`, `sencillito`, `sepa_debit`, `sequra`, `servipag`, `sezzle`, `shop_pay`, `shopeepay`, `sofort`, `south_korea_market`, `spei`, `splitit`, `sunbit`, `swish`, `tamara`, `twint`, `upi`, `us_bank_account`, `us_bank_transfer`, `venmo`, `vipps`, `webpay`, `wechat_pay`, `yape`, `zip`, `coinflow`, `unknown`
</ResponseField>

<ResponseField name="typename" type="string" required>
  The typename of this object
</ResponseField>

### Ideal Payment Method

<ResponseField name="created_at" type="string<date-time>" required>
  The time of the event in ISO 8601 UTC format with millisecond precision

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="icons" type="object" required>
  Every rendition of the icon to display this payment method with. A saved card carries its brand's icon (Visa, Mastercard, ...) rather than the generic card art.

  <Expandable title="child attributes">
    <ResponseField name="card" type="object" required>
      The credit-card-proportioned tile (48x30).

      <Expandable title="child attributes">
        <ResponseField name="dark" type="object" required>
          The colorway for dark surfaces.

          <Expandable title="child attributes">
            <ResponseField name="png_1x" type="string" required>
              Raster fallback at the shape's native size.
            </ResponseField>

            <ResponseField name="png_2x" type="string" required>
              Raster fallback at double density.
            </ResponseField>

            <ResponseField name="png_4x" type="string" required>
              Raster fallback at quadruple density.
            </ResponseField>

            <ResponseField name="svg" type="string" required>
              The vector file. Prefer this everywhere SVG renders.
            </ResponseField>
          </Expandable>
        </ResponseField>

        <ResponseField name="light" type="object" required>
          The colorway for light surfaces.

          <Expandable title="child attributes">
            <ResponseField name="png_1x" type="string" required>
              Raster fallback at the shape's native size.
            </ResponseField>

            <ResponseField name="png_2x" type="string" required>
              Raster fallback at double density.
            </ResponseField>

            <ResponseField name="png_4x" type="string" required>
              Raster fallback at quadruple density.
            </ResponseField>

            <ResponseField name="svg" type="string" required>
              The vector file. Prefer this everywhere SVG renders.
            </ResponseField>
          </Expandable>
        </ResponseField>
      </Expandable>
    </ResponseField>

    <ResponseField name="square" type="object" required>
      The square tile (32x32).

      <Expandable title="child attributes">
        <ResponseField name="dark" type="object" required>
          The colorway for dark surfaces.

          <Expandable title="child attributes">
            <ResponseField name="png_1x" type="string" required>
              Raster fallback at the shape's native size.
            </ResponseField>

            <ResponseField name="png_2x" type="string" required>
              Raster fallback at double density.
            </ResponseField>

            <ResponseField name="png_4x" type="string" required>
              Raster fallback at quadruple density.
            </ResponseField>

            <ResponseField name="svg" type="string" required>
              The vector file. Prefer this everywhere SVG renders.
            </ResponseField>
          </Expandable>
        </ResponseField>

        <ResponseField name="light" type="object" required>
          The colorway for light surfaces.

          <Expandable title="child attributes">
            <ResponseField name="png_1x" type="string" required>
              Raster fallback at the shape's native size.
            </ResponseField>

            <ResponseField name="png_2x" type="string" required>
              Raster fallback at double density.
            </ResponseField>

            <ResponseField name="png_4x" type="string" required>
              Raster fallback at quadruple density.
            </ResponseField>

            <ResponseField name="svg" type="string" required>
              The vector file. Prefer this everywhere SVG renders.
            </ResponseField>
          </Expandable>
        </ResponseField>
      </Expandable>
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="id" type="string" required />

<ResponseField name="ideal" type="object" required>
  The iDEAL-specific details for this payment method, including bank name and BIC.

  <Expandable title="child attributes">
    <ResponseField name="bank" type="string | null" required>
      The name of the customer's bank used for the iDEAL transaction. Null if not available.

      Example: `ing`
    </ResponseField>

    <ResponseField name="bic" type="string | null" required>
      The Bank Identifier Code (BIC/SWIFT) of the customer's bank. Null if not available.

      Example: `INGBNL2A`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="payment_method_type" type="PaymentMethodTypes" required>
  The type of payment instrument stored on file (e.g., card, us\_bank\_account, cashapp, ideal, sepa\_debit).

  Available options: `acss_debit`, `addi`, `affirm`, `afterpay_clearpay`, `alipay`, `alma`, `amazon_pay`, `apple`, `apple_pay`, `au_bank_transfer`, `au_becs_debit`, `bacs_debit`, `bancolombia`, `bancontact`, `bank_wire`, `billie`, `bizum`, `blik`, `boleto`, `bre_b`, `ca_bank_transfer`, `capchase_pay`, `card`, `card_installments_three`, `card_installments_six`, `card_installments_twelve`, `cashapp`, `claritypay`, `coinbase`, `crypto`, `custom`, `customer_balance`, `demo_pay`, `efecty`, `eps`, `eu_bank_transfer`, `fpx`, `gb_bank_transfer`, `giropay`, `google_pay`, `gopay`, `grabpay`, `id_bank_transfer`, `ideal`, `interac`, `kakao_pay`, `klarna`, `klarna_pay_now`, `konbini`, `kr_card`, `kr_market`, `kriya`, `kueski`, `link`, `mb_way`, `m_pesa`, `mercado_pago`, `mobilepay`, `modo`, `mondu`, `multibanco`, `naver_pay`, `nequi`, `netbanking`, `ng_bank`, `ng_bank_transfer`, `ng_card`, `ng_market`, `ng_ussd`, `ng_wallet`, `nz_bank_account`, `oxxo`, `p24`, `pago_efectivo`, `pse`, `pay_by_bank`, `payco`, `paynow`, `paypal`, `paypay`, `payto`, `pix`, `platform_balance`, `promptpay`, `qris`, `rapipago`, `rechnung`, `revolut_pay`, `samsung_pay`, `satispay`, `scalapay`, `sencillito`, `sepa_debit`, `sequra`, `servipag`, `sezzle`, `shop_pay`, `shopeepay`, `sofort`, `south_korea_market`, `spei`, `splitit`, `sunbit`, `swish`, `tamara`, `twint`, `upi`, `us_bank_account`, `us_bank_transfer`, `venmo`, `vipps`, `webpay`, `wechat_pay`, `yape`, `zip`, `coinflow`, `unknown`
</ResponseField>

<ResponseField name="typename" type="string" required>
  The typename of this object
</ResponseField>

### Sepa Debit Payment Method

<ResponseField name="created_at" type="string<date-time>" required>
  The time of the event in ISO 8601 UTC format with millisecond precision

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="icons" type="object" required>
  Every rendition of the icon to display this payment method with. A saved card carries its brand's icon (Visa, Mastercard, ...) rather than the generic card art.

  <Expandable title="child attributes">
    <ResponseField name="card" type="object" required>
      The credit-card-proportioned tile (48x30).

      <Expandable title="child attributes">
        <ResponseField name="dark" type="object" required>
          The colorway for dark surfaces.

          <Expandable title="child attributes">
            <ResponseField name="png_1x" type="string" required>
              Raster fallback at the shape's native size.
            </ResponseField>

            <ResponseField name="png_2x" type="string" required>
              Raster fallback at double density.
            </ResponseField>

            <ResponseField name="png_4x" type="string" required>
              Raster fallback at quadruple density.
            </ResponseField>

            <ResponseField name="svg" type="string" required>
              The vector file. Prefer this everywhere SVG renders.
            </ResponseField>
          </Expandable>
        </ResponseField>

        <ResponseField name="light" type="object" required>
          The colorway for light surfaces.

          <Expandable title="child attributes">
            <ResponseField name="png_1x" type="string" required>
              Raster fallback at the shape's native size.
            </ResponseField>

            <ResponseField name="png_2x" type="string" required>
              Raster fallback at double density.
            </ResponseField>

            <ResponseField name="png_4x" type="string" required>
              Raster fallback at quadruple density.
            </ResponseField>

            <ResponseField name="svg" type="string" required>
              The vector file. Prefer this everywhere SVG renders.
            </ResponseField>
          </Expandable>
        </ResponseField>
      </Expandable>
    </ResponseField>

    <ResponseField name="square" type="object" required>
      The square tile (32x32).

      <Expandable title="child attributes">
        <ResponseField name="dark" type="object" required>
          The colorway for dark surfaces.

          <Expandable title="child attributes">
            <ResponseField name="png_1x" type="string" required>
              Raster fallback at the shape's native size.
            </ResponseField>

            <ResponseField name="png_2x" type="string" required>
              Raster fallback at double density.
            </ResponseField>

            <ResponseField name="png_4x" type="string" required>
              Raster fallback at quadruple density.
            </ResponseField>

            <ResponseField name="svg" type="string" required>
              The vector file. Prefer this everywhere SVG renders.
            </ResponseField>
          </Expandable>
        </ResponseField>

        <ResponseField name="light" type="object" required>
          The colorway for light surfaces.

          <Expandable title="child attributes">
            <ResponseField name="png_1x" type="string" required>
              Raster fallback at the shape's native size.
            </ResponseField>

            <ResponseField name="png_2x" type="string" required>
              Raster fallback at double density.
            </ResponseField>

            <ResponseField name="png_4x" type="string" required>
              Raster fallback at quadruple density.
            </ResponseField>

            <ResponseField name="svg" type="string" required>
              The vector file. Prefer this everywhere SVG renders.
            </ResponseField>
          </Expandable>
        </ResponseField>
      </Expandable>
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="id" type="string" required />

<ResponseField name="payment_method_type" type="PaymentMethodTypes" required>
  The type of payment instrument stored on file (e.g., card, us\_bank\_account, cashapp, ideal, sepa\_debit).

  Available options: `acss_debit`, `addi`, `affirm`, `afterpay_clearpay`, `alipay`, `alma`, `amazon_pay`, `apple`, `apple_pay`, `au_bank_transfer`, `au_becs_debit`, `bacs_debit`, `bancolombia`, `bancontact`, `bank_wire`, `billie`, `bizum`, `blik`, `boleto`, `bre_b`, `ca_bank_transfer`, `capchase_pay`, `card`, `card_installments_three`, `card_installments_six`, `card_installments_twelve`, `cashapp`, `claritypay`, `coinbase`, `crypto`, `custom`, `customer_balance`, `demo_pay`, `efecty`, `eps`, `eu_bank_transfer`, `fpx`, `gb_bank_transfer`, `giropay`, `google_pay`, `gopay`, `grabpay`, `id_bank_transfer`, `ideal`, `interac`, `kakao_pay`, `klarna`, `klarna_pay_now`, `konbini`, `kr_card`, `kr_market`, `kriya`, `kueski`, `link`, `mb_way`, `m_pesa`, `mercado_pago`, `mobilepay`, `modo`, `mondu`, `multibanco`, `naver_pay`, `nequi`, `netbanking`, `ng_bank`, `ng_bank_transfer`, `ng_card`, `ng_market`, `ng_ussd`, `ng_wallet`, `nz_bank_account`, `oxxo`, `p24`, `pago_efectivo`, `pse`, `pay_by_bank`, `payco`, `paynow`, `paypal`, `paypay`, `payto`, `pix`, `platform_balance`, `promptpay`, `qris`, `rapipago`, `rechnung`, `revolut_pay`, `samsung_pay`, `satispay`, `scalapay`, `sencillito`, `sepa_debit`, `sequra`, `servipag`, `sezzle`, `shop_pay`, `shopeepay`, `sofort`, `south_korea_market`, `spei`, `splitit`, `sunbit`, `swish`, `tamara`, `twint`, `upi`, `us_bank_account`, `us_bank_transfer`, `venmo`, `vipps`, `webpay`, `wechat_pay`, `yape`, `zip`, `coinflow`, `unknown`
</ResponseField>

<ResponseField name="sepa_debit" type="object" required>
  The SEPA Direct Debit-specific details for this payment method, including bank code and last four IBAN digits.

  <Expandable title="child attributes">
    <ResponseField name="bank_code" type="string | null" required>
      The bank code of the financial institution associated with this SEPA account. Null if not available.

      Example: `37040044`
    </ResponseField>

    <ResponseField name="branch_code" type="string | null" required>
      The branch code of the financial institution associated with this SEPA account. Null if not available.

      Example: `0532`
    </ResponseField>

    <ResponseField name="country" type="string | null" required>
      The two-letter ISO country code where the bank account is located. Null if not available.

      Example: `DE`
    </ResponseField>

    <ResponseField name="last4" type="string | null" required>
      The last four digits of the IBAN associated with this SEPA account. Null if not available.

      Example: `3000`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="typename" type="string" required>
  The typename of this object
</ResponseField>
