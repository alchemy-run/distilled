> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# ExpressCheckoutElement

> One-press Apple Pay and Google Pay buttons for a checkout — the OS payment sheet collects whatever the session still needs (the buyer's email, a shipping address for physical goods, a promo code where the seller offers entry) and one press finishes the purchase. It shares the checkout's entry slot with the full checkout element, so a handle mounts exactly one of the two: this button alone where the purchase is simple enough for a sheet to finish, or the full checkout surface for everything else. Renders only the wallets the buyer's device can actually pay with, using the served button art, and renders nothing where no wallet is available. A checkout the sheet cannot honestly finish — a waitlist join, a transfer, a form question only a page can ask — refuses loudly instead of rendering a doomed button.

<Info>This page documents `@whop/elements@1.0.0-beta.2` and `@whop/elements-react@1.0.0-beta.2`.</Info>

*Pre-release, not yet part of a stable release.*

Mounts inside [`Checkout`](/elements/beta/checkout/overview). Pass props and callbacks through the create options or React props.

<Note>**Exclusive.** `ExpressCheckoutElement` is an alternative to `CheckoutElement` in this Checkout handle. Mount one at a time. Destroy it before mounting another.</Note>

<div data-whop-split style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", flexWrap: "wrap" }}>
  <div style={{ flex: "1 1 26rem", minWidth: 0 }}>
    <div data-whop-usage="checkout/expressCheckout">
      <CodeGroup>
        ```tsx React theme={null}
        import { WhopElements, Checkout, ExpressCheckoutElement } from "@whop/elements-react";
        import { loadWhop } from "@whop/elements";

        function Example() {
          return (
            <WhopElements elements={loadWhop()}>
              <Checkout /* options */>
                <ExpressCheckoutElement />
              </Checkout>
            </WhopElements>
          );
        }
        ```

        ```html JavaScript theme={null}
        <script src="https://js.whop.cloud/elements/amber/elements.js" data-whop-elements></script>
        <script type="module">
          const checkout = window.WhopElements().checkout.create({ /* options */ });
          checkout.create('expressCheckout').mount('#checkout-expressCheckout');
        </script>
        ```
      </CodeGroup>
    </div>
  </div>

  <div style={{ flex: "1 1 20rem", minWidth: 0 }}>
    <div data-whop-demo-shell style={{ position: "relative", minHeight: "320px", transition: "min-height 200ms ease" }}>
      <div data-whop-demo-skeleton style={{ position: "absolute", inset: "0", borderRadius: "12px", background: "rgba(140, 140, 140, 0.12)", pointerEvents: "none", transition: "opacity 200ms ease" }} />

      <div data-whop-demo-native="element:checkout/expressCheckout" data-whop-elements-version="1.0.0-beta.2" style={{ position: "relative" }} />
    </div>

    <p style={{ fontSize: "0.8125rem", opacity: 0.7 }}>Example data. [Open the Playground](/elements/beta/checkout/overview#playground).</p>
  </div>
</div>

## Props

<ResponseField name="wallets" type="(&#x22;apple_pay&#x22; | &#x22;google_pay&#x22;)[]">
  Which wallets may render — a filter over what the buyer’s device actually offers. The element never shows a wallet the device or the served matrix cannot back, and the render order stays best-native-first whatever order this lists. An empty list renders nothing (warned in dev builds). Defaults to `["apple_pay","google_pay"]`.
</ResponseField>

<ResponseField name="layout" type="&#x22;auto&#x22; | &#x22;horizontal&#x22; | &#x22;vertical&#x22;">
  How the buttons stack. `auto` follows the element’s own container — stacked in narrow containers, side by side in wide ones; `horizontal` and `vertical` force one arrangement. Defaults to `"auto"`.
</ResponseField>

## Events

Pass callbacks in the create options or React props.

### `onLoaderStart`

Runs after the loading skeleton first paints and before `onReady`.

**Signature:** `(() => void)`

### `onReady`

Runs after the element's first complete paint.

**Signature:** `(() => void)`

### `onError`

Runs when the element fails to load or crashes. The fallback remains visible. Use `code` for programmatic handling. `sourceKey` identifies a failed host-state source.

**Signature:** `((e: { message: string; code?: string | undefined; sourceKey?: string | undefined; }) => void)`

## Methods

Call these on the handle returned by `create`, or through a React `ref`.

### `mount`

Mounts the element in `target` and starts loading. React components mount themselves.

**Signature:** `(target: string | HTMLElement) => void`

### `destroy`

Removes the element and releases its frame and subscriptions. You can call it more than once. React removes the element automatically.

**Signature:** `() => void`

### `update`

Merges new props into the mounted element. In React, change the component props instead.

**Signature:** `(options: Partial<ExpressCheckoutElementProps>) => void`

## Styling

Style these parts through `appearance.classes`. Use camel case or kebab case for property names and include units. Page stylesheets can't reach the element's frame. The framework validates each declaration before injecting it.

| Class                                      | Targets                                                                                                                                                                         |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.whop-Address`                            | The address form root                                                                                                                                                           |
| `.whop-AddressErrorSummary`                | The summary line shown when validation reveals missing or invalid fields                                                                                                        |
| `.whop-AddressField`                       | One field cell in the address form                                                                                                                                              |
| `.whop-AddressFieldError`                  | The error line under an address field (full layout)                                                                                                                             |
| `.whop-AddressFieldInput`                  | A text input in the address form                                                                                                                                                |
| `.whop-AddressFieldInputInvalid`           | Added to an address input while it fails validation                                                                                                                             |
| `.whop-AddressFieldInvalid`                | Added to a compact field cell while it fails validation                                                                                                                         |
| `.whop-AddressFieldLabel`                  | Address field label in full layout                                                                                                                                              |
| `.whop-AddressFieldSelect`                 | A select (country, state, organization type) in the address form                                                                                                                |
| `.whop-AddressLine2Toggle`                 | Collapsed address line 2 toggle                                                                                                                                                 |
| `.whop-AddressManualEntry`                 | The "Enter address manually" text button below the collapsed form — expands the full country format                                                                             |
| `.whop-AddressSuggestion`                  | One suggestion row in the autocomplete overlay                                                                                                                                  |
| `.whop-AddressSuggestionActive`            | Added to the keyboard/pointer-active suggestion row                                                                                                                             |
| `.whop-AddressSuggestionManual`            | The "Enter address manually" row closing the suggestions list                                                                                                                   |
| `.whop-AddressSuggestions`                 | The autocomplete suggestions overlay anchored to the address line 1 field                                                                                                       |
| `.whop-AddressSuggestionsEmpty`            | The quiet line shown when the query settled with no address matches                                                                                                             |
| `.whop-Card`                               | Card element root                                                                                                                                                               |
| `.whop-CardError`                          | Card configuration error pane                                                                                                                                                   |
| `.whop-CardField`                          | Card number, expiration, or security code field                                                                                                                                 |
| `.whop-CardFieldError`                     | Card validation message                                                                                                                                                         |
| `.whop-CardFieldGroup`                     | The grouped card fields — number on top, expiration and security code below                                                                                                     |
| `.whop-CardFieldInput`                     | Bordered PCI input container                                                                                                                                                    |
| `.whop-CardFieldInputFocused`              | Focused PCI input container                                                                                                                                                     |
| `.whop-CardFieldInputInvalid`              | Invalid or incomplete PCI input container                                                                                                                                       |
| `.whop-CardFieldRow`                       | Compact card number, expiration, and security code row                                                                                                                          |
| `.whop-CardLabel`                          | Card information label                                                                                                                                                          |
| `.whop-CardSaveNotice`                     | Payment method saving consent                                                                                                                                                   |
| `.whop-CheckoutExpress`                    | The express checkout row — one-press wallet payments above the form                                                                                                             |
| `.whop-CheckoutExpressApplePay`            | The Apple Pay express button                                                                                                                                                    |
| `.whop-CheckoutExpressButtons`             | The wallet button stack — vertical in a narrow container, side by side in a wide one                                                                                            |
| `.whop-CheckoutExpressComplete`            | The standalone express button’s settled outcome line                                                                                                                            |
| `.whop-CheckoutExpressDivider`             | The divider between express checkout and the form                                                                                                                               |
| `.whop-CheckoutExpressError`               | The retryable error line under the express button                                                                                                                               |
| `.whop-CheckoutExpressFinishPayment`       | The finish-payment line shown while the payment still needs a step the buyer dismissed                                                                                          |
| `.whop-CheckoutExpressFinishPaymentButton` | The re-entry button that re-runs the payment’s pending step                                                                                                                     |
| `.whop-CheckoutExpressGooglePay`           | The Google Pay express button                                                                                                                                                   |
| `.whop-CheckoutExpressRetry`               | The failed rest’s button — re-reads the reopened session so the buyer can pay again                                                                                             |
| `.whop-CheckoutExpressUnavailable`         | The face shown when an express button cannot serve this checkout                                                                                                                |
| `.whop-CompletePayment`                    | Completion surface root                                                                                                                                                         |
| `.whop-CompletePaymentAmount`              | The amount the buyer must pay                                                                                                                                                   |
| `.whop-CompletePaymentBarcode`             | The scannable barcode card                                                                                                                                                      |
| `.whop-CompletePaymentDocumentLink`        | The hosted-instructions button                                                                                                                                                  |
| `.whop-CompletePaymentError`               | Error pane                                                                                                                                                                      |
| `.whop-CompletePaymentFrame`               | Framed PSP step                                                                                                                                                                 |
| `.whop-CompletePaymentHint`                | Automatic-update hint                                                                                                                                                           |
| `.whop-CompletePaymentInstructions`        | Payment-instructions pane                                                                                                                                                       |
| `.whop-CompletePaymentProviderMark`        | The voucher network logo                                                                                                                                                        |
| `.whop-CompletePaymentQr`                  | The scannable QR card                                                                                                                                                           |
| `.whop-CompletePaymentReference`           | A copyable code block (reference, payment key)                                                                                                                                  |
| `.whop-CompletePaymentSettled`             | Resting-state pane shown before closing                                                                                                                                         |
| `.whop-CompletePaymentSettledFailed`       | Failed resting-state pane shown before closing                                                                                                                                  |
| `.whop-CompletePaymentSpinner`             | Waiting spinner                                                                                                                                                                 |
| `.whop-CompletePaymentTitle`               | Dialog title                                                                                                                                                                    |
| `.whop-CompletePaymentTransferDetails`     | The bank-transfer detail rows                                                                                                                                                   |
| `.whop-Email`                              | Email element root                                                                                                                                                              |
| `.whop-EmailError`                         | Invalid email message                                                                                                                                                           |
| `.whop-EmailInput`                         | The email input                                                                                                                                                                 |
| `.whop-EmailInputInvalid`                  | Email input with an implausible value                                                                                                                                           |
| `.whop-EmailLabel`                         | Email field label                                                                                                                                                               |
| `.whop-EmailSignedIn`                      | Signed-in buyer row                                                                                                                                                             |
| `.whop-EmailSignIn`                        | Welcome back sign-in control                                                                                                                                                    |
| `.whop-EmailSignInError`                   | Sign-in error message                                                                                                                                                           |
| `.whop-EmailSignOut`                       | Choose a different email control                                                                                                                                                |
| `.whop-Payment`                            | The payment element root                                                                                                                                                        |
| `.whop-PaymentBalance`                     | One wallet in the balance tile                                                                                                                                                  |
| `.whop-PaymentBalanceHint`                 | The wallet's available amount in the charge currency                                                                                                                            |
| `.whop-PaymentBalanceList`                 | The balance tile's scrollable list of the buyer's wallets                                                                                                                       |
| `.whop-PaymentBalanceMore`                 | The sentinel row that pages in more balances as it scrolls into view                                                                                                            |
| `.whop-PaymentBalanceRow`                  | The clickable balance row                                                                                                                                                       |
| `.whop-PaymentBalanceRowSelected`          | Selected balance row                                                                                                                                                            |
| `.whop-PaymentBalanceRowUnavailable`       | A wallet that cannot pay right now — blocked or empty — greyed and disabled                                                                                                     |
| `.whop-PaymentBillingBlock`                | The payment element's internal billing address block                                                                                                                            |
| `.whop-PaymentCardFields`                  | The inline card fields panel                                                                                                                                                    |
| `.whop-PaymentCompactBalance`              | The selected balance on a compact direct checkout                                                                                                                               |
| `.whop-PaymentCompactSavedMethod`          | The selected saved method on a compact direct checkout                                                                                                                          |
| `.whop-PaymentDetailIcon`                  | The template icon beside the detail region's explainer                                                                                                                          |
| `.whop-PaymentDetailRegion`                | The expanded detail region for a selected method — collection surfaces first (inline card fields, declared inputs), then the explainer and disclosure lines as the bottom block |
| `.whop-PaymentDetailSubtext`               | The consent subtext under the explainer on wallet methods                                                                                                                       |
| `.whop-PaymentDetailText`                  | The detail region's explainer line                                                                                                                                              |
| `.whop-PaymentError`                       | Unavailable payment methods error pane                                                                                                                                          |
| `.whop-PaymentFieldError`                  | The Invalid message under a declared input                                                                                                                                      |
| `.whop-PaymentFieldInput`                  | A declared method input in the detail region                                                                                                                                    |
| `.whop-PaymentFieldInputInvalid`           | Added to a declared input while its value fails the declared format                                                                                                             |
| `.whop-PaymentFieldLabel`                  | Declared payment field label                                                                                                                                                    |
| `.whop-PaymentInstallmentDetail`           | An installment option row's per-installment amount                                                                                                                              |
| `.whop-PaymentInstallmentLabel`            | An installment option row's label                                                                                                                                               |
| `.whop-PaymentInstallmentList`             | The installment picker's option list                                                                                                                                            |
| `.whop-PaymentInstallmentRadio`            | The radio indicator on an installment option row                                                                                                                                |
| `.whop-PaymentInstallmentRow`              | One installment option row                                                                                                                                                      |
| `.whop-PaymentInstallmentRowSelected`      | The selected installment option row                                                                                                                                             |
| `.whop-PaymentInstallments`                | The card pane's installment plan picker                                                                                                                                         |
| `.whop-PaymentInstallmentsLabel`           | The installment picker's heading                                                                                                                                                |
| `.whop-PaymentInstallmentsNotice`          | The issuer-fee disclaimer under a selected tier with no declared fee                                                                                                            |
| `.whop-PaymentMandateLink`                 | The mandate terms link inside the mandate notice                                                                                                                                |
| `.whop-PaymentMandateNotice`               | The mandate authorization notice on methods whose matrix configuration declares a mandate                                                                                       |
| `.whop-PaymentMethod`                      | One payment method — the row plus its expanding detail region                                                                                                                   |
| `.whop-PaymentMethodDetail`                | The expanding region that reveals the selected method's detail — inline card fields, explainer, or declared inputs                                                              |
| `.whop-PaymentMethodIcon`                  | The method icon on a row                                                                                                                                                        |
| `.whop-PaymentMethodLabel`                 | The method display name on a row                                                                                                                                                |
| `.whop-PaymentMethodMoreSelect`            | The invisible native select stretched over the More tile                                                                                                                        |
| `.whop-PaymentMethodMoreTile`              | Overflow tile with method icons and a native selector                                                                                                                           |
| `.whop-PaymentMethodPanel`                 | The selected method's detail panel below the tile row (horizontal layout)                                                                                                       |
| `.whop-PaymentMethodRadio`                 | The radio indicator on a method row                                                                                                                                             |
| `.whop-PaymentMethodRadioSelected`         | Selected payment method radio                                                                                                                                                   |
| `.whop-PaymentMethodRow`                   | The clickable payment method row                                                                                                                                                |
| `.whop-PaymentMethodRowSelected`           | Selected payment method row                                                                                                                                                     |
| `.whop-PaymentMethods`                     | The payment method list                                                                                                                                                         |
| `.whop-PaymentMethodSeparated`             | Added to a method item while it renders as its own separated card                                                                                                               |
| `.whop-PaymentMethodsSeparated`            | Separated accordion method list                                                                                                                                                 |
| `.whop-PaymentMethodTile`                  | One method tile in the horizontal tile row                                                                                                                                      |
| `.whop-PaymentMethodTileRow`               | Horizontal method tile row with overflow methods in the final More tile                                                                                                         |
| `.whop-PaymentMethodTileSelected`          | Selected payment method tile                                                                                                                                                    |
| `.whop-PaymentMoreRow`                     | The "N more payment methods" expander row                                                                                                                                       |
| `.whop-PaymentPayerDocument`               | Currency-specific buyer identity document fields                                                                                                                                |
| `.whop-PaymentPayerDocumentError`          | Buyer identity document error                                                                                                                                                   |
| `.whop-PaymentPayerDocumentLabel`          | Buyer identity document label                                                                                                                                                   |
| `.whop-PaymentPayerDocumentType`           | Buyer identity document type selector                                                                                                                                           |
| `.whop-PaymentSavedMethod`                 | One saved payment method specifically — carries PaymentMethod too                                                                                                               |
| `.whop-PaymentSavedMethodHint`             | The saved method's trailing detail — a card's expiration                                                                                                                        |
| `.whop-PaymentSavedMethodRow`              | The clickable saved method row specifically — carries PaymentMethodRow too                                                                                                      |
| `.whop-PaymentSavedMethodRowSelected`      | Selected saved payment method row                                                                                                                                               |
| `.whop-PaymentSavedMethods`                | The saved-methods list specifically — carries PaymentMethods too, so one rule styles both lists                                                                                 |
| `.whop-PaymentSavedMethodSeparated`        | The separated marker on a saved method specifically                                                                                                                             |
| `.whop-PaymentSavedMore`                   | The control that fetches the next page of saved payment methods                                                                                                                 |
| `.whop-PaymentSavedMoreSpinner`            | The spinner shown while the next page of saved payment methods loads                                                                                                            |
| `.whop-PaymentSaveNotice`                  | The save-for-future-purchases consent line closing the detail region                                                                                                            |
| `.whop-PaymentSettlementNotice`            | The settlement-window hint on methods whose matrix configuration declares one                                                                                                   |
| `.whop-PhoneVerificationChangeNumber`      | Return-to-number control                                                                                                                                                        |
| `.whop-PhoneVerificationCode`              | Six-digit confirmation-code pane                                                                                                                                                |
| `.whop-PhoneVerificationDone`              | Success pane shown before closing                                                                                                                                               |
| `.whop-PhoneVerificationError`             | Number-pane failure message                                                                                                                                                     |
| `.whop-PhoneVerificationInput`             | Phone-number input                                                                                                                                                              |
| `.whop-PhoneVerificationNumber`            | Phone-number entry pane                                                                                                                                                         |
| `.whop-PhoneVerificationResend`            | Resend-code control with countdown                                                                                                                                              |
| `.whop-PhoneVerificationSend`              | Send-code button                                                                                                                                                                |
| `.whop-PhoneVerificationTitle`             | Dialog header wordmark                                                                                                                                                          |
| `.whop-TaxId`                              | Tax registration root                                                                                                                                                           |
| `.whop-TaxIdError`                         | API validation error                                                                                                                                                            |
| `.whop-TaxIdInput`                         | Registration value input                                                                                                                                                        |
| `.whop-TaxIdLabel`                         | Registration value label                                                                                                                                                        |
| `.whop-TaxIdTypeLabel`                     | Registration type label                                                                                                                                                         |
| `.whop-TaxIdTypeSelect`                    | Registration type selector                                                                                                                                                      |
| `.whop-Verification`                       | Verification-code dialog body                                                                                                                                                   |
| `.whop-VerificationDismiss`                | Continue-as-guest control for unavailable sign-in                                                                                                                               |
| `.whop-VerificationError`                  | Dialog failure message                                                                                                                                                          |
| `.whop-VerificationExpired`                | Expired sign-in pane                                                                                                                                                            |
| `.whop-VerificationHeading`                | Code dialog heading and explanation                                                                                                                                             |
| `.whop-VerificationHint`                   | Code-delivery explanation                                                                                                                                                       |
| `.whop-VerificationInput`                  | The one-time-code input                                                                                                                                                         |
| `.whop-VerificationInputInvalid`           | Added to the code input after a failed attempt                                                                                                                                  |
| `.whop-VerificationInputSlot`              | One digit box of the one-time-code input                                                                                                                                        |
| `.whop-VerificationInputSlotActive`        | Added to the code slot the buyer is typing into                                                                                                                                 |
| `.whop-VerificationPending`                | The verifying… line while a submit is in flight                                                                                                                                 |
| `.whop-VerificationResend`                 | Resend-code control with countdown                                                                                                                                              |
| `.whop-VerificationRestart`                | Expired-pane start-over control                                                                                                                                                 |
| `.whop-VerificationTitle`                  | Dialog header wordmark                                                                                                                                                          |

```ts theme={null}
const checkout = whop.checkout.create({
  appearance: {
    classes: {
      'whop-Address': { borderRadius: '8px', fontWeight: '600' },
      'whop-AddressErrorSummary': { borderRadius: '8px', fontWeight: '600' },
      'whop-AddressField': { borderRadius: '8px', fontWeight: '600' }
    }
  }
});

// 156 classes use this shape
checkout.update({
  appearance: { classes: { 'whop-Address': { fontWeight: '700' } } }
});
```

In React, pass `appearance` to `<Checkout>`. Set it globally with `WhopElements({ appearance })`.
