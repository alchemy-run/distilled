> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# CheckoutElement

> The full checkout surface — order summary with the live quote, promo code entry, the currency the buyer pays in, everything this checkout has to collect from the buyer, the composed payment methods surface, and the pay flow. What it collects is whatever the seller set up (email, their own questions, a phone number, a shipping address for physical goods, an explicit agreement to their terms), rendered together on one screen in the order they chose — so a seller who starts asking for something new needs no change here. Renders the whole purchase; the checkout controller owns the session and the credential. After a payment that needs an off-site step, this same surface renders the outcome the server reports when the buyer comes back.

Mounts inside [`Checkout`](/elements/upcoming/checkout/overview). Pass props and callbacks through the create options or React props.

<Note>**Exclusive.** `CheckoutElement` is an alternative to `ExpressCheckoutElement` in this Checkout handle. Mount one at a time. Destroy it before mounting another.</Note>

<div data-whop-split style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", flexWrap: "wrap" }}>
  <div style={{ flex: "1 1 26rem", minWidth: 0 }}>
    <div data-whop-usage="checkout/checkout">
      <CodeGroup>
        ```tsx React theme={null}
        import { WhopElements, Checkout, CheckoutElement } from "@whop/elements-react";
        import { loadWhop } from "@whop/elements";

        function Example() {
          return (
            <WhopElements elements={loadWhop()}>
              <Checkout /* options */>
                <CheckoutElement />
              </Checkout>
            </WhopElements>
          );
        }
        ```

        ```html JavaScript theme={null}
        <script src="https://js.whop.cloud/elements/amber/elements.js" data-whop-elements></script>
        <script type="module">
          const checkout = window.WhopElements().checkout.create({ /* options */ });
          checkout.create('checkout').mount('#checkout-checkout');
        </script>
        ```
      </CodeGroup>
    </div>
  </div>

  <div style={{ flex: "1 1 20rem", minWidth: 0 }}>
    <div data-whop-demo-shell style={{ position: "relative", minHeight: "320px", transition: "min-height 200ms ease" }}>
      <div data-whop-demo-skeleton style={{ position: "absolute", inset: "0", borderRadius: "12px", background: "rgba(140, 140, 140, 0.12)", pointerEvents: "none", transition: "opacity 200ms ease" }} />

      <div data-whop-demo-native="element:checkout/checkout" data-whop-elements-version="" style={{ position: "relative" }} />
    </div>

    <p style={{ fontSize: "0.8125rem", opacity: 0.7 }}>Example data. [Open the Playground](/elements/upcoming/checkout/overview#playground).</p>
  </div>
</div>

## Props

*This element takes no consumer props.*

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

**Signature:** `(options: Partial<CheckoutElementProps>) => void`

## Styling

Style these parts through `appearance.classes`. Use camel case or kebab case for property names and include units. Page stylesheets can't reach the element's frame. The framework validates each declaration before injecting it.

| Class                                   | Targets                                                                                                                                                                         |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `.whop-Address`                         | The address form root                                                                                                                                                           |
| `.whop-AddressErrorSummary`             | The summary line shown when validation reveals missing or invalid fields                                                                                                        |
| `.whop-AddressField`                    | One field cell in the address form                                                                                                                                              |
| `.whop-AddressFieldError`               | The error line under an address field (full layout)                                                                                                                             |
| `.whop-AddressFieldInput`               | A text input in the address form                                                                                                                                                |
| `.whop-AddressFieldInputInvalid`        | Added to an address input while it fails validation                                                                                                                             |
| `.whop-AddressFieldInvalid`             | Added to a compact field cell while it fails validation                                                                                                                         |
| `.whop-AddressFieldLabel`               | Address field label in full layout                                                                                                                                              |
| `.whop-AddressFieldSelect`              | A select (country, state, organization type) in the address form                                                                                                                |
| `.whop-AddressLine2Toggle`              | Collapsed address line 2 toggle                                                                                                                                                 |
| `.whop-AddressManualEntry`              | The "Enter address manually" text button below the collapsed form — expands the full country format                                                                             |
| `.whop-AddressSuggestion`               | One suggestion row in the autocomplete overlay                                                                                                                                  |
| `.whop-AddressSuggestionActive`         | Added to the keyboard/pointer-active suggestion row                                                                                                                             |
| `.whop-AddressSuggestionManual`         | The "Enter address manually" row closing the suggestions list                                                                                                                   |
| `.whop-AddressSuggestions`              | The autocomplete suggestions overlay anchored to the address line 1 field                                                                                                       |
| `.whop-AddressSuggestionsEmpty`         | The quiet line shown when the query settled with no address matches                                                                                                             |
| `.whop-Card`                            | Card element root                                                                                                                                                               |
| `.whop-CardError`                       | Card configuration error pane                                                                                                                                                   |
| `.whop-CardField`                       | Card number, expiration, or security code field                                                                                                                                 |
| `.whop-CardFieldError`                  | Card validation message                                                                                                                                                         |
| `.whop-CardFieldGroup`                  | The grouped card fields — number on top, expiration and security code below                                                                                                     |
| `.whop-CardFieldInput`                  | Bordered PCI input container                                                                                                                                                    |
| `.whop-CardFieldInputFocused`           | Focused PCI input container                                                                                                                                                     |
| `.whop-CardFieldInputInvalid`           | Invalid or incomplete PCI input container                                                                                                                                       |
| `.whop-CardFieldRow`                    | Compact card number, expiration, and security code row                                                                                                                          |
| `.whop-CardLabel`                       | Card information label                                                                                                                                                          |
| `.whop-CardSaveNotice`                  | Payment method saving consent                                                                                                                                                   |
| `.whop-Checkout`                        | The checkout element root                                                                                                                                                       |
| `.whop-CheckoutAwaitClaim`              | The resting await\_claim line on the success face                                                                                                                               |
| `.whop-CheckoutBreakdownPending`        | The placeholder shown for a figure that is still being calculated                                                                                                               |
| `.whop-CheckoutBreakdownRows`           | The opened price breakdown — the item’s own subtotal and the service fee                                                                                                        |
| `.whop-CheckoutBreakdownToggle`         | The "Price breakdown" disclosure that opens the subtotal and service fee rows                                                                                                   |
| `.whop-CheckoutClaimOffer`              | The embedded claim-offer line on the success face                                                                                                                               |
| `.whop-CheckoutCollection`              | The collection column — email, payment methods, and the pay flow                                                                                                                |
| `.whop-CheckoutCompanyPurchase`         | The company-purchase block — the checkbox and the tax registration fields it reveals                                                                                            |
| `.whop-CheckoutCompanyPurchaseCheckbox` | The checkbox that reveals the tax registration fields                                                                                                                           |
| `.whop-CheckoutCompleted`               | The success face shown once the checkout completed                                                                                                                              |
| `.whop-CheckoutContinue`                | The blocked-redirect press on the completed face — finishes the trip to the seller’s returnUrl                                                                                  |
| `.whop-CheckoutCurrencyNote`            | The conversion disclosure — what the payment converted from, and at what rate                                                                                                   |
| `.whop-CheckoutCurrencyRow`             | The pay-in-currency row — the conversion disclosure, the switch affordance, and its refusal line                                                                                |
| `.whop-CheckoutCurrencyToggle`          | The "pay in another currency" affordance                                                                                                                                        |
| `.whop-CheckoutDetailRow`               | One label/value row of the pricing details section                                                                                                                              |
| `.whop-CheckoutDetails`                 | The order-details column — summary, currency, promo. Sits beside the collection column in wide containers, above it in narrow ones                                              |
| `.whop-CheckoutDetailsToggle`           | The narrow-container affordance that opens the order-details sheet                                                                                                              |
| `.whop-CheckoutError`                   | The retryable error line under the payment surface                                                                                                                              |
| `.whop-CheckoutExpired`                 | The face shown when the session expired before completing                                                                                                                       |
| `.whop-CheckoutExpress`                 | The express checkout row — one-press wallet payments above the form                                                                                                             |
| `.whop-CheckoutExpressApplePay`         | The Apple Pay express button                                                                                                                                                    |
| `.whop-CheckoutExpressButtons`          | The wallet button stack — vertical in a narrow container, side by side in a wide one                                                                                            |
| `.whop-CheckoutExpressDivider`          | The divider between express checkout and the form                                                                                                                               |
| `.whop-CheckoutExpressError`            | The retryable error line under the express button                                                                                                                               |
| `.whop-CheckoutExpressGooglePay`        | The Google Pay express button                                                                                                                                                   |
| `.whop-CheckoutFailed`                  | The face shown when the completed session’s charge or vault died — the payment did not go through                                                                               |
| `.whop-CheckoutFailedRetry`             | The failure face’s button — re-reads the reopened session so the buyer can pay again                                                                                            |
| `.whop-CheckoutFieldError`              | Every inline field-level error line (email, promo, currency)                                                                                                                    |
| `.whop-CheckoutFinishPayment`           | The face shown while the payment still needs a step the buyer dismissed — carries the re-entry button                                                                           |
| `.whop-CheckoutFinishPaymentButton`     | The re-entry button that re-runs the payment’s pending step                                                                                                                     |
| `.whop-CheckoutFrameBound`              | The face shown when the payment’s remaining step cannot run inside this embedded frame                                                                                          |
| `.whop-CheckoutInvoiceDue`              | The invoice due-date block — when this invoice checkout’s payment is due, red once it is behind                                                                                 |
| `.whop-CheckoutItem`                    | The item line — what is being bought, named the way the seller sells it. Centered above the price in a narrow container, left-aligned beside the collection column              |
| `.whop-CheckoutItemDescription`         | The item’s long description block, under its own heading                                                                                                                        |
| `.whop-CheckoutItemHeadline`            | The one-line description under the item — the checkout link’s own wording, else the product’s headline                                                                          |
| `.whop-CheckoutLayout`                  | The two-column/stacked layout row — order details and collection side by side in wide containers, stacked in narrow ones                                                        |
| `.whop-CheckoutNextActionNotice`        | The line explaining a step the server requires before this checkout can be paid                                                                                                 |
| `.whop-CheckoutPasswordUnlock`          | The control that submits the checkout password                                                                                                                                  |
| `.whop-CheckoutPayButton`               | The pay button                                                                                                                                                                  |
| `.whop-CheckoutPolicyLink`              | Each link to a seller-published policy document in the terms disclosure                                                                                                         |
| `.whop-CheckoutPrice`                   | The price block — centered under the seller line in a narrow container, left-aligned beside the collection column                                                               |
| `.whop-CheckoutPriceContext`            | Each context line under the quoted total — the billing period, "Due today", what follows the trial, and a stepping promo’s return price                                         |
| `.whop-CheckoutPricingDetails`          | The itemized pricing details below the promo code — line items, tax, the totals block, and the price breakdown                                                                  |
| `.whop-CheckoutPromoActions`            | The slot holding the apply-promo button                                                                                                                                         |
| `.whop-CheckoutPromoApplied`            | The applied-promo row — the code chip beside what it takes off                                                                                                                  |
| `.whop-CheckoutPromoApply`              | The apply-promo button                                                                                                                                                          |
| `.whop-CheckoutPromoChip`               | The applied code — a chip that removes it on click                                                                                                                              |
| `.whop-CheckoutPromoDiscount`           | What the code takes off each covered charge                                                                                                                                     |
| `.whop-CheckoutPromoInput`              | The promo code input                                                                                                                                                            |
| `.whop-CheckoutPromoPeriod`             | Which charges the discount covers                                                                                                                                               |
| `.whop-CheckoutPromoRow`                | The promo code affordance — a pill that grows into the input                                                                                                                    |
| `.whop-CheckoutQuantity`                | The quantity line, shown above 1                                                                                                                                                |
| `.whop-CheckoutRequirementInput`        | A collected value’s input                                                                                                                                                       |
| `.whop-CheckoutRequirementLabel`        | A collected value’s label                                                                                                                                                       |
| `.whop-CheckoutRequirementRequired`     | The marker beside a value an answer is required for                                                                                                                             |
| `.whop-CheckoutRequirementRow`          | One collected value — its label, its input, and its inline error                                                                                                                |
| `.whop-CheckoutRequirements`            | The requirements form — every value this checkout collects, rendered as one block in the order the server declared                                                              |
| `.whop-CheckoutSeller`                  | The seller title line                                                                                                                                                           |
| `.whop-CheckoutSellerLogo`              | The seller logo beside the seller title, initials when none is uploaded                                                                                                         |
| `.whop-CheckoutSettling`                | The face shown while an accepted payment is still clearing                                                                                                                      |
| `.whop-CheckoutSettlingCheck`           | The settling face’s re-check — re-reads the session for a charge that may have decided                                                                                          |
| `.whop-CheckoutShippingAddress`         | The shipping address section, rendered when the session requires one                                                                                                            |
| `.whop-CheckoutSummary`                 | The order summary block — seller, items, and the live total                                                                                                                     |
| `.whop-CheckoutSummaryHead`             | The seller line, with the order-details trigger opposite it in a narrow container                                                                                               |
| `.whop-CheckoutTerms`                   | The terms disclosure under the pay button — the seller policies and the Whop buyer terms                                                                                        |
| `.whop-CheckoutTermsAccept`             | The explicit terms-acceptance row, rendered only when the session requires an explicit act of acceptance                                                                        |
| `.whop-CheckoutTermsCheckbox`           | The terms-acceptance checkbox                                                                                                                                                   |
| `.whop-CheckoutTotal`                   | The quoted total the buyer pays                                                                                                                                                 |
| `.whop-CheckoutTotalOriginal`           | The pre-promo total, struck through beside the discounted one                                                                                                                   |
| `.whop-CheckoutTrialSkippedAck`         | The acknowledgment a buyer must tick when the trial skip was resolved only after they signed in mid-checkout                                                                    |
| `.whop-CheckoutTrialSkippedCheckbox`    | The acknowledgment checkbox itself                                                                                                                                              |
| `.whop-CheckoutTrialSkippedNotice`      | The notice shown when the buyer has already used the plan’s free trial and is charged the full price today                                                                      |
| `.whop-CheckoutUncollectable`           | The line shown when the checkout requires something this surface cannot collect                                                                                                 |
| `.whop-CheckoutVerifyPhone`             | The control that (re)opens the phone-verification ceremony                                                                                                                      |
| `.whop-CheckoutWaitlistVaulted`         | The line on the waitlist-joined face saying the saved payment method is only charged on acceptance                                                                              |
| `.whop-CompletePayment`                 | Completion surface root                                                                                                                                                         |
| `.whop-CompletePaymentAmount`           | The amount the buyer must pay                                                                                                                                                   |
| `.whop-CompletePaymentBarcode`          | The scannable barcode card                                                                                                                                                      |
| `.whop-CompletePaymentDocumentLink`     | The hosted-instructions button                                                                                                                                                  |
| `.whop-CompletePaymentError`            | Error pane                                                                                                                                                                      |
| `.whop-CompletePaymentFrame`            | Framed PSP step                                                                                                                                                                 |
| `.whop-CompletePaymentHint`             | Automatic-update hint                                                                                                                                                           |
| `.whop-CompletePaymentInstructions`     | Payment-instructions pane                                                                                                                                                       |
| `.whop-CompletePaymentProviderMark`     | The voucher network logo                                                                                                                                                        |
| `.whop-CompletePaymentQr`               | The scannable QR card                                                                                                                                                           |
| `.whop-CompletePaymentReference`        | A copyable code block (reference, payment key)                                                                                                                                  |
| `.whop-CompletePaymentSettled`          | Resting-state pane shown before closing                                                                                                                                         |
| `.whop-CompletePaymentSettledFailed`    | Failed resting-state pane shown before closing                                                                                                                                  |
| `.whop-CompletePaymentSpinner`          | Waiting spinner                                                                                                                                                                 |
| `.whop-CompletePaymentTitle`            | Dialog title                                                                                                                                                                    |
| `.whop-CompletePaymentTransferDetails`  | The bank-transfer detail rows                                                                                                                                                   |
| `.whop-Email`                           | Email element root                                                                                                                                                              |
| `.whop-EmailError`                      | Invalid email message                                                                                                                                                           |
| `.whop-EmailInput`                      | The email input                                                                                                                                                                 |
| `.whop-EmailInputInvalid`               | Email input with an implausible value                                                                                                                                           |
| `.whop-EmailLabel`                      | Email field label                                                                                                                                                               |
| `.whop-EmailSignedIn`                   | Signed-in buyer row                                                                                                                                                             |
| `.whop-EmailSignIn`                     | Welcome back sign-in control                                                                                                                                                    |
| `.whop-EmailSignInError`                | Sign-in error message                                                                                                                                                           |
| `.whop-EmailSignOut`                    | Choose a different email control                                                                                                                                                |
| `.whop-Payment`                         | The payment element root                                                                                                                                                        |
| `.whop-PaymentBalance`                  | One wallet in the balance tile                                                                                                                                                  |
| `.whop-PaymentBalanceHint`              | The wallet's available amount in the charge currency                                                                                                                            |
| `.whop-PaymentBalanceList`              | The balance tile's scrollable list of the buyer's wallets                                                                                                                       |
| `.whop-PaymentBalanceMore`              | The sentinel row that pages in more balances as it scrolls into view                                                                                                            |
| `.whop-PaymentBalanceRow`               | The clickable balance row                                                                                                                                                       |
| `.whop-PaymentBalanceRowSelected`       | Selected balance row                                                                                                                                                            |
| `.whop-PaymentBalanceRowUnavailable`    | A wallet that cannot pay right now — blocked or empty — greyed and disabled                                                                                                     |
| `.whop-PaymentBillingBlock`             | The payment element's internal billing address block                                                                                                                            |
| `.whop-PaymentCardFields`               | The inline card fields panel                                                                                                                                                    |
| `.whop-PaymentCompactBalance`           | The selected balance on a compact direct checkout                                                                                                                               |
| `.whop-PaymentCompactSavedMethod`       | The selected saved method on a compact direct checkout                                                                                                                          |
| `.whop-PaymentDetailIcon`               | The template icon beside the detail region's explainer                                                                                                                          |
| `.whop-PaymentDetailRegion`             | The expanded detail region for a selected method — collection surfaces first (inline card fields, declared inputs), then the explainer and disclosure lines as the bottom block |
| `.whop-PaymentDetailSubtext`            | The consent subtext under the explainer on wallet methods                                                                                                                       |
| `.whop-PaymentDetailText`               | The detail region's explainer line                                                                                                                                              |
| `.whop-PaymentError`                    | Unavailable payment methods error pane                                                                                                                                          |
| `.whop-PaymentFieldError`               | The Invalid message under a declared input                                                                                                                                      |
| `.whop-PaymentFieldInput`               | A declared method input in the detail region                                                                                                                                    |
| `.whop-PaymentFieldInputInvalid`        | Added to a declared input while its value fails the declared format                                                                                                             |
| `.whop-PaymentFieldLabel`               | Declared payment field label                                                                                                                                                    |
| `.whop-PaymentInstallmentDetail`        | An installment option row's per-installment amount                                                                                                                              |
| `.whop-PaymentInstallmentLabel`         | An installment option row's label                                                                                                                                               |
| `.whop-PaymentInstallmentList`          | The installment picker's option list                                                                                                                                            |
| `.whop-PaymentInstallmentRadio`         | The radio indicator on an installment option row                                                                                                                                |
| `.whop-PaymentInstallmentRow`           | One installment option row                                                                                                                                                      |
| `.whop-PaymentInstallmentRowSelected`   | The selected installment option row                                                                                                                                             |
| `.whop-PaymentInstallments`             | The card pane's installment plan picker                                                                                                                                         |
| `.whop-PaymentInstallmentsLabel`        | The installment picker's heading                                                                                                                                                |
| `.whop-PaymentInstallmentsNotice`       | The issuer-fee disclaimer under a selected tier with no declared fee                                                                                                            |
| `.whop-PaymentMandateLink`              | The mandate terms link inside the mandate notice                                                                                                                                |
| `.whop-PaymentMandateNotice`            | The mandate authorization notice on methods whose matrix configuration declares a mandate                                                                                       |
| `.whop-PaymentMethod`                   | One payment method — the row plus its expanding detail region                                                                                                                   |
| `.whop-PaymentMethodDetail`             | The expanding region that reveals the selected method's detail — inline card fields, explainer, or declared inputs                                                              |
| `.whop-PaymentMethodIcon`               | The method icon on a row                                                                                                                                                        |
| `.whop-PaymentMethodLabel`              | The method display name on a row                                                                                                                                                |
| `.whop-PaymentMethodMoreSelect`         | The invisible native select stretched over the More tile                                                                                                                        |
| `.whop-PaymentMethodMoreTile`           | Overflow tile with method icons and a native selector                                                                                                                           |
| `.whop-PaymentMethodPanel`              | The selected method's detail panel below the tile row (horizontal layout)                                                                                                       |
| `.whop-PaymentMethodRadio`              | The radio indicator on a method row                                                                                                                                             |
| `.whop-PaymentMethodRadioSelected`      | Selected payment method radio                                                                                                                                                   |
| `.whop-PaymentMethodRow`                | The clickable payment method row                                                                                                                                                |
| `.whop-PaymentMethodRowSelected`        | Selected payment method row                                                                                                                                                     |
| `.whop-PaymentMethods`                  | The payment method list                                                                                                                                                         |
| `.whop-PaymentMethodSeparated`          | Added to a method item while it renders as its own separated card                                                                                                               |
| `.whop-PaymentMethodsSeparated`         | Separated accordion method list                                                                                                                                                 |
| `.whop-PaymentMethodTile`               | One method tile in the horizontal tile row                                                                                                                                      |
| `.whop-PaymentMethodTileRow`            | Horizontal method tile row with overflow methods in the final More tile                                                                                                         |
| `.whop-PaymentMethodTileSelected`       | Selected payment method tile                                                                                                                                                    |
| `.whop-PaymentMoreRow`                  | The "N more payment methods" expander row                                                                                                                                       |
| `.whop-PaymentPayerDocument`            | Currency-specific buyer identity document fields                                                                                                                                |
| `.whop-PaymentPayerDocumentError`       | Buyer identity document error                                                                                                                                                   |
| `.whop-PaymentPayerDocumentLabel`       | Buyer identity document label                                                                                                                                                   |
| `.whop-PaymentPayerDocumentType`        | Buyer identity document type selector                                                                                                                                           |
| `.whop-PaymentSavedMethod`              | One saved payment method specifically — carries PaymentMethod too                                                                                                               |
| `.whop-PaymentSavedMethodHint`          | The saved method's trailing detail — a card's expiration                                                                                                                        |
| `.whop-PaymentSavedMethodRow`           | The clickable saved method row specifically — carries PaymentMethodRow too                                                                                                      |
| `.whop-PaymentSavedMethodRowSelected`   | Selected saved payment method row                                                                                                                                               |
| `.whop-PaymentSavedMethods`             | The saved-methods list specifically — carries PaymentMethods too, so one rule styles both lists                                                                                 |
| `.whop-PaymentSavedMethodSeparated`     | The separated marker on a saved method specifically                                                                                                                             |
| `.whop-PaymentSavedMore`                | The control that fetches the next page of saved payment methods                                                                                                                 |
| `.whop-PaymentSavedMoreSpinner`         | The spinner shown while the next page of saved payment methods loads                                                                                                            |
| `.whop-PaymentSaveNotice`               | The save-for-future-purchases consent line closing the detail region                                                                                                            |
| `.whop-PaymentSettlementNotice`         | The settlement-window hint on methods whose matrix configuration declares one                                                                                                   |
| `.whop-PhoneVerificationChangeNumber`   | Return-to-number control                                                                                                                                                        |
| `.whop-PhoneVerificationCode`           | Six-digit confirmation-code pane                                                                                                                                                |
| `.whop-PhoneVerificationDone`           | Success pane shown before closing                                                                                                                                               |
| `.whop-PhoneVerificationError`          | Number-pane failure message                                                                                                                                                     |
| `.whop-PhoneVerificationInput`          | Phone-number input                                                                                                                                                              |
| `.whop-PhoneVerificationNumber`         | Phone-number entry pane                                                                                                                                                         |
| `.whop-PhoneVerificationResend`         | Resend-code control with countdown                                                                                                                                              |
| `.whop-PhoneVerificationSend`           | Send-code button                                                                                                                                                                |
| `.whop-PhoneVerificationTitle`          | Dialog header wordmark                                                                                                                                                          |
| `.whop-TaxId`                           | Tax registration root                                                                                                                                                           |
| `.whop-TaxIdError`                      | API validation error                                                                                                                                                            |
| `.whop-TaxIdInput`                      | Registration value input                                                                                                                                                        |
| `.whop-TaxIdLabel`                      | Registration value label                                                                                                                                                        |
| `.whop-TaxIdTypeLabel`                  | Registration type label                                                                                                                                                         |
| `.whop-TaxIdTypeSelect`                 | Registration type selector                                                                                                                                                      |
| `.whop-Verification`                    | Verification-code dialog body                                                                                                                                                   |
| `.whop-VerificationDismiss`             | Continue-as-guest control for unavailable sign-in                                                                                                                               |
| `.whop-VerificationError`               | Dialog failure message                                                                                                                                                          |
| `.whop-VerificationExpired`             | Expired sign-in pane                                                                                                                                                            |
| `.whop-VerificationHeading`             | Code dialog heading and explanation                                                                                                                                             |
| `.whop-VerificationHint`                | Code-delivery explanation                                                                                                                                                       |
| `.whop-VerificationInput`               | The one-time-code input                                                                                                                                                         |
| `.whop-VerificationInputInvalid`        | Added to the code input after a failed attempt                                                                                                                                  |
| `.whop-VerificationInputSlot`           | One digit box of the one-time-code input                                                                                                                                        |
| `.whop-VerificationInputSlotActive`     | Added to the code slot the buyer is typing into                                                                                                                                 |
| `.whop-VerificationPending`             | The verifying… line while a submit is in flight                                                                                                                                 |
| `.whop-VerificationResend`              | Resend-code control with countdown                                                                                                                                              |
| `.whop-VerificationRestart`             | Expired-pane start-over control                                                                                                                                                 |
| `.whop-VerificationTitle`               | Dialog header wordmark                                                                                                                                                          |

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

// 220 classes use this shape
checkout.update({
  appearance: { classes: { 'whop-Address': { fontWeight: '700' } } }
});
```

In React, pass `appearance` to `<Checkout>`. Set it globally with `WhopElements({ appearance })`.
