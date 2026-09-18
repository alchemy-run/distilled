> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Payments

> Collect a payment from a `plan_` ID or inline currency and amount. Mount PaymentElement, CardElement, or CardFields, then call `payments.createConfirmationToken` with billing details. Wallet selections open their sheet automatically. Confirm the token server-side, then pass the payment's `client_secret` to `handleNextAction` for any pending step.

<Info>This page documents `@whop/elements@1.0.0-beta.2` and `@whop/elements-react@1.0.0-beta.2`.</Info>

*Pre-release, not yet part of a stable release.*

## Playground

Assemble the elements with example data. Drive the controls, add and arrange elements, and watch events fire live:

<div data-whop-demo-shell style={{ position: "relative", minHeight: "480px", transition: "min-height 200ms ease" }}>
  <div data-whop-demo-skeleton style={{ position: "absolute", inset: "0", borderRadius: "12px", background: "rgba(140, 140, 140, 0.12)", pointerEvents: "none", transition: "opacity 200ms ease" }} />

  <div data-whop-demo-native="playground:payments" data-whop-elements-version="1.0.0-beta.2" style={{ position: "relative" }} />
</div>

<div data-whop-usage="payments/playground">
  <CodeGroup>
    ```tsx React theme={null}
    import { WhopElements, Payments } from "@whop/elements-react";
    import { loadWhop } from "@whop/elements";

    function Example() {
      return (
        <WhopElements elements={loadWhop()}>
          <Payments /* options */>
            {/* mount elements here */}
          </Payments>
        </WhopElements>
      );
    }
    ```

    ```html JavaScript theme={null}
    <script src="https://js.whop.cloud/elements/amber/elements.js" data-whop-elements></script>
    <script type="module">
      const payments = window.WhopElements().payments.create({ /* options */ });
    </script>
    ```
  </CodeGroup>
</div>

## Options

Pass these to `whop.payments.create({ … })`, or as props on `<Payments>` in React.

<ResponseField name="accountId" type="string">
  Account ID, prefixed `biz_`. Omit only when calling static methods without a collection surface.
</ResponseField>

<ResponseField name="plan" type="string">
  Plan ID, prefixed `plan_`. It resolves client-side to currency, amount, and method configuration. Pass a plan or inline currency and amount, never both.
</ResponseField>

<ResponseField name="offerAmounts" type="undefined">
  Minor-unit `feeInclusive` and `feeFree` totals used to gate methods when checkout re-prices `amount` for a fee-free method such as BNPL. Each method is checked against its matching total, preventing the selected fee-free method from disappearing. When omitted, `amount` gates every method.
</ResponseField>

<ResponseField name="returnUrl" type="string">
  Return URL for off-site bank or 3DS steps. Defaults to the mounting page.
</ResponseField>

<ResponseField name="setupFutureUsage" type="&#x22;off_session&#x22; | &#x22;on_session&#x22;">
  Displays consent to save the payment method and marks the token for `off_session` or `on_session` use.
</ResponseField>

<ResponseField name="previewWalletAvailability" type="WalletAvailability">
  Wallet availability override for deterministic previews. Live checkouts probe the host.
</ResponseField>

<ResponseField name="checkoutSession" type="{ id: string; clientSecret: string; }">
  Checkout session updated when a buyer signs in. Pass its `chs_`-prefixed `id` and `client_secret`. Without them, sign-in succeeds but the session does not record the buyer.
</ResponseField>

<ResponseField name="currency" type="string">
  Lowercase three-letter ISO 4217 payment currency code. It filters the payment-method matrix.
</ResponseField>

<ResponseField name="amount" type="number">
  Payment amount in minor units. Methods whose bounds exclude it aren't offered.
</ResponseField>

<ResponseField name="paymentMethodConfiguration" type="{ enabled?: string[] | undefined; disabled?: string[] | undefined; include_platform_defaults?: boolean | undefined; }">
  Account payment-method filters in the API's `enabled`, `disabled`, and `include_platform_defaults` format. `disabled` removes types, `enabled` restores offered types, and `include_platform_defaults: false` leaves only enabled types. Plans provide their own configuration.
</ResponseField>

<ResponseField name="appearance" type="Appearance">
  Visual customization for this group's elements. Overrides the global `WhopElements({ appearance })`. Change it live with `update({ appearance })`.
</ResponseField>

<ResponseField name="locale" type="WhopElementsLocale">
  Locale for this group's element UI text. Set it to one of the app's built locales to override the global configuration. Any other value falls back to the default locale.
</ResponseField>

<Note>The options are a union. Provide **exactly one** of these shapes, plus the shared event callbacks below:</Note>

* `{ accountId: string; plan: string; offerAmounts?: undefined; returnUrl?: string; setupFutureUsage?: "off_session" | "on_session"; previewWalletAvailability?: WalletAvailability; checkoutSession?: { id: string; clientSecret: string; }; analytics?: false }`
* `{ accountId: string; currency: string; amount: number; offerAmounts?: { feeInclusive: number; feeFree: number; }; paymentMethodConfiguration?: { enabled?: string[] | undefined; disabled?: string[] | undefined; include_platform_defaults?: boolean | undefined; }; returnUrl?: string; setupFutureUsage?: "off_session" | "on_session"; previewWalletAvailability?: WalletAvailability; checkoutSession?: { id: string; clientSecret: string; }; analytics?: false }`
* `{ accountId?: undefined; plan?: undefined; currency?: undefined; amount?: undefined; offerAmounts?: undefined; paymentMethodConfiguration?: undefined; returnUrl?: string; setupFutureUsage?: "off_session" | "on_session"; previewWalletAvailability?: WalletAvailability; checkoutSession?: { id: string; clientSecret: string; }; analytics?: false }`

## Events

Pass callbacks in the create options or React props.

### `onLoadingChange`

Runs when the grouped loading state changes. The value is `true` while any mounted element is still loading.

**Signature:** `((loading: boolean) => void)`

## Methods

Call these on the Payments handle from `whop.payments.create({ … })` or `usePayments()`.

### `createConfirmationToken`

Creates a confirmation token for the selected method from your pay button. Pass the checkout's billing details. They must include `email`. Cards also need `name` and an address containing `line1` and `country`. Wallet selections open their sheet during the pay-button interaction. Confirm the returned `confirmationToken` server-side, then call `WhopElements.payments.handleNextAction(…)`. Runs on your page (host-side), not in the controller iframe.

**Signature:** `(input: { billingDetails?: { email?: string | undefined; name?: string | undefined; address?: { country?: string | undefined; line1?: string | undefined; line2?: string | undefined; city?: string | undefined; state?: string | undefined; postal_code?: string | undefined; } | undefined; } | undefined; }) => Promise<{ confirmationToken: string; type: string; }>`

### `update`

Merges new handle options into every mounted element. In React, change the namespace props instead.

**Signature:** `(options: Partial<PaymentsOptions>) => void`

### `destroy`

Destroys every element and sub-controller this handle created, removes the controller frame, and releases its subscriptions. You can call it more than once, but a destroyed handle refuses any other call — create a new handle to start over. React removes the group automatically when the provider unmounts.

**Signature:** `() => void`

## Static methods

Call these without mounting: `whop.payments.<method>(…)` in vanilla or `useWhop().payments.<method>(…)` in React.

### `handleNextAction`

Completes a confirmed payment's pending step without mounting an element. `clientSecret` identifies the payment. You don't need a payment ID. Inline steps open in a dialog and resolve with `redirected: false`. Dismissing the dialog returns the payment's current status, which can remain pending. Full-page steps redirect with `redirected: true` to `return_url`, or a hosted receipt when the payment has no return URL. They reject with code `FULL_PAGE_STEP_IN_FRAME` inside subordinate frames. Set `returnUrl` to update the destination before presentation. An update failure rejects before any step runs. Inline steps never navigate to that URL. A payment with no pending step resolves immediately.

**Signature:** `(input: { clientSecret: string; returnUrl?: string | undefined; pollIntervalMs?: number | undefined; }) => Promise<{ status: string; redirected: boolean; lastPaymentError: { code?: string | null | undefined; decline_code?: string | null | undefined; message?: string | null | undefined; } | null; }>`

## Resources

Create these SDK objects without mounting an element. Each has its own page:

<CardGroup cols={2}>
  <Card title="PaymentRequest" href="/elements/beta/payments/paymentRequest">
    Low-level Apple Pay or Google Pay sheet for custom buttons, express checkout, and shipping callbacks. Wallet tiles automate this flow through `payments.createConfirmationToken`. Await `canMakePayment()` to check availability and prime the sheet, then call `show(type)` synchronously in the user-interaction handler. The resolved `ctok` is a `ctok_`-prefixed confirmation token. Confirm it server-side like an element-minted token.
  </Card>
</CardGroup>

## Types

Named types used throughout this page.

## `WalletAvailability`

Host-probed wallet availability after checking offered methods, device capability, and Google Pay origin approval.

### `applePay`

**Signature:** `boolean`

### `googlePay`

**Signature:** `boolean`

### `order`

The wallets ranked by which sheet is native to this browser — Apple Pay first on WebKit, Google Pay first everywhere else — so express buttons can stack best-first. Absent on consumer-stated availability (previews) and on wires that predate it. An inline union, not payment-request's WalletSheetType: that module already imports this one.

**Signature:** `("apple_pay" | "google_pay")[] | undefined`

## `CardNetworkArt`

The slice of a matrix card network the fields need: identity plus the API-served square art.

### `brand`

**Signature:** `"visa" | "mastercard" | "amex" | "discover" | "jcb" | "diners" | "unionpay" | "elo" | "maestro"`

### `icons`

**Signature:** `{ square: { light: { svg: string; }; dark: { svg: string; }; }; }`

## `PaymentRequestLineItem`

Fields on `PaymentRequestLineItem`.

### `label`

**Signature:** `string`

### `amount`

Minor units, same as `amount`.

**Signature:** `number`

## `PaymentRequestShippingOption`

Fields on `PaymentRequestShippingOption`.

### `id`

**Signature:** `string`

### `label`

**Signature:** `string`

### `detail`

**Signature:** `string | undefined`

### `amount`

Minor-unit display value. The resource doesn't calculate shipping. Update `amount` from your handler.

**Signature:** `number`

## `PaymentRequestAddress`

Fields on `PaymentRequestAddress`.

### `line1`

**Signature:** `string | undefined`

### `line2`

**Signature:** `string | undefined`

### `city`

**Signature:** `string | undefined`

### `state`

**Signature:** `string | undefined`

### `postal_code`

**Signature:** `string | undefined`

### `country`

**Signature:** `string | undefined`

### `recipient`

**Signature:** `string | undefined`

### `phone`

**Signature:** `string | undefined`

## `PaymentRequestResult`

Fields on `PaymentRequestResult`.

### `ctok`

Confirmation token ID, prefixed `ctok_`. Confirm it server-side with your secret key.

**Signature:** `string`

### `type`

**Signature:** `"apple_pay" | "google_pay"`

### `payer`

**Signature:** `{ email?: string | undefined; name?: string | undefined; phone?: string | undefined; }`

### `shipping`

**Signature:** `{ address?: PaymentRequestAddress | undefined; option?: PaymentRequestShippingOption | undefined; } | null`

## `PaymentRequestError`

Fields on `PaymentRequestError`.

### `code`

**Signature:** `"shipping_address_invalid" | "shipping_address_unserviceable" | "shipping_option_invalid" | "other" | undefined`

### `message`

**Signature:** `string`

## `PaymentRequestUpdate`

Fields on `PaymentRequestUpdate`.

### `amount`

**Signature:** `number | undefined`

### `lineItems`

**Signature:** `PaymentRequestLineItem[] | undefined`

### `shippingOptions`

**Signature:** `PaymentRequestShippingOption[] | undefined`

### `errors`

**Signature:** `PaymentRequestError[] | undefined`

## `ShippingAddressChangeEvent`

Fields on `ShippingAddressChangeEvent`.

### `address`

Vendor-normalized pre-authorization address. It includes only city, state, postal code, and country.

**Signature:** `PaymentRequestAddress`

### `updateWith`

Call this exactly once, or the sheet stalls until the vendor times it out.

**Signature:** `(update: PaymentRequestUpdate) => void`

## `ShippingOptionChangeEvent`

Fields on `ShippingOptionChangeEvent`.

### `option`

Always includes the selected `id`. It includes the full option when it matches one of yours.

**Signature:** `{ id: string; } & Partial<PaymentRequestShippingOption>`

### `updateWith`

**Signature:** `(update: PaymentRequestUpdate) => void`

## `BillingAddressChangeEvent`

Fields on `BillingAddressChangeEvent`.

### `address`

Vendor-normalized pre-authorization billing address. It includes only city, state, postal code, and country.

**Signature:** `PaymentRequestAddress`

### `updateWith`

Call this exactly once. An event left unanswered keeps the current total when the reply deadline passes.

**Signature:** `(update: PaymentRequestUpdate) => void`

## Elements

The elements this group mounts. Each has its own page:

<CardGroup cols={2}>
  <Card title="AddressElement" href="/elements/beta/payments/address">
    Collects a billing or shipping address. Fields, order, and validation follow the selected country. Includes street autocomplete and methods to read or validate the address.
  </Card>

  <Card title="EmailElement" href="/elements/beta/payments/email">
    Collects the buyer's email and passes it to `payments.createConfirmationToken()` while mounted. Explicit `billingDetails.email` wins. A matching Whop account shows optional sign-in with code verification. Successful sign-in unlocks saved payment methods in the payment element. Buyers can continue as guests.
  </Card>

  <Card title="TaxIdElement" href="/elements/beta/payments/taxId">
    Collects a business tax registration accepted by the API. Labels use buyer-facing names. The placeholder matches the selected format. `country` preselects a type. `onChange` emits committed pairs. The host supplies API validation errors.
  </Card>

  <Card title="BrandingElement" href="/elements/beta/payments/branding">
    Whop's merchant-of-record notice: the Whop wordmark with links to the buyer terms and privacy policy. Mount it alongside every payment collection surface.
  </Card>
</CardGroup>

**Alternatives.** Mount one at a time. Destroy it before mounting another:

<CardGroup cols={2}>
  <Card title="PaymentElement" href="/elements/beta/payments/payment">
    Shows available payment methods and collects the selected method's required fields and disclosures. Use `change` to enable your pay button. In its activation handler, call `payments.createConfirmationToken()`. Confirm the token server-side, then pass any pending step to `payments.handleNextAction(…)`. Use `addressChange` for address-dependent updates.
  </Card>

  <Card title="CardElement" href="/elements/beta/payments/card">
    Prearranged fields for card number, expiration, and security code. Create with `payments.create("card")`, enable your payment button from `onChange`, and confirm with `payments.createConfirmationToken()`. Card numbers remain in PCI-isolated hosted fields. `layout` supports `stacked` (default) and `compact`.
  </Card>

  <Card title="CardFields" href="/elements/beta/payments/cardFields">
    Three separately mountable, PCI-isolated card fields for custom layouts: number, expiration, and security code. Create with `payments.create("cardFields")`, place each field, enable your payment button from `onChange`, and confirm with `payments.createConfirmationToken()`. Card numbers remain in hosted fields. *(sub-controller, 3 elements)*
  </Card>
</CardGroup>

## Flow surfaces

These internal elements open automatically during guided flows. They aren't part of the consumer API, so you don't mount or configure them.

* **AddressSuggestionsElement** (`addressSuggestions`): The address autocomplete overlay — suggestion rows plus `Enter address manually`, anchored beside the street field.
* **BillingAddressSuggestionsElement** (`billingAddressSuggestions`): The billing address autocomplete overlay — suggestion rows plus `Enter address manually`, anchored beside the billing street field.
* **VerificationCodeElement** (`verificationCode`): The payments controller opens this buyer sign-in dialog when a recognized buyer chooses to sign in. It verifies a one-time code with the pending session's `client_secret`. The dialog enforces the resend window and shows verification failures, including expired or incorrect codes, rate limits, and required email-link steps. On success, it sends the session token to the controller and closes.
* **CompletePaymentElement** (`completePayment`): Detached modal opened by `payments.handleNextAction` to finish a pending payment step. It handles embedded provider flows, bank-transfer instructions, and confirmation waits. The surface polls payment status with its scoped `client_secret` and closes when no action remains. Consumers never mount it directly.
* **PhoneVerificationElement** (`phoneVerification`): Dialog opened by the payments controller for a checkout's `verify_phone` step. It collects the buyer's phone number, sends a confirmation code, and verifies it with the buyer's signed-in credential. It closes after verification succeeds. Accounts requiring a verified phone block the sale until this two-pane flow succeeds. Consumers never mount it directly.
