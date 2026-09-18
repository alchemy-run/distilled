> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# PaymentRequest

> Low-level Apple Pay or Google Pay sheet for custom buttons, express checkout, and shipping callbacks. Wallet tiles automate this flow through `payments.createConfirmationToken`. Await `canMakePayment()` to check availability and prime the sheet, then call `show(type)` synchronously in the user-interaction handler. The resolved `ctok` is a `ctok_`-prefixed confirmation token. Confirm it server-side like an element-minted token.

Create this [`Payments`](/elements/upcoming/payments/overview) resource without mounting an element: `whop.payments.paymentRequest.create({ … })` in vanilla or `useWhop().payments.paymentRequest.create({ … })` in React.

## Options

Pass these to `whop.payments.paymentRequest.create({ … })`.

<ResponseField name="accountId" type="string" required>
  Account ID, prefixed `biz_`, that scopes every client-side call.
</ResponseField>

<ResponseField name="currency" type="string" required>
  Three-letter ISO 4217 payment currency code.
</ResponseField>

<ResponseField name="amount" type="number" required>
  Payment amount in minor units.
</ResponseField>

<ResponseField name="setupFutureUsage" type="&#x22;off_session&#x22; | &#x22;on_session&#x22;">
  Set only after displaying save consent. Marks the token for `off_session` or `on_session` use.
</ResponseField>

<ResponseField name="requestPayerEmail" type="boolean">
  Ask the sheet for the payer's email — the confirmation token requires one. Defaults to `true`.
</ResponseField>

<ResponseField name="requestShipping" type="boolean">
  Ask the sheet for a shipping address (and offer `shippingOptions` when given). Defaults to `false`.
</ResponseField>

<ResponseField name="countryCode" type="string">
  Account ISO 3166-1 alpha-2 country code for the Apple Pay sheet. Omit it to use the account's published registration country. The sheet defaults to `US` when neither is available.
</ResponseField>

<ResponseField name="lineItems" type="PaymentRequestLineItem[]">
  Line items the sheet lists under the total.
</ResponseField>

<ResponseField name="shippingOptions" type="PaymentRequestShippingOption[]">
  Shipping options the sheet offers when `requestShipping` is set. Display-only — update `amount` from your change handler.
</ResponseField>

## Methods

Call these on the resource.

<Warning>Call `show` synchronously during user activation. Await prerequisites first.</Warning>

### `canMakePayment`

Returns availability for each wallet when the account offers it, the device supports it, and this page's origin is approved for the account (first-party whop.com pages are pre-approved; a merchant page needs its domain registered as a payment method domain). Apple Pay on non-WebKit browsers is the desktop iPhone-handoff flow, so mobile devices there report it unavailable — native Apple Pay on iOS browsers is unaffected. `order` ranks the wallets by which sheet is native to the browser — Apple Pay first on Safari, Google Pay first elsewhere — so express buttons can stack best-first. This primes `show()`. Always await it first.

**Signature:** `() => Promise<WalletAvailability>`

### `show`

Open the selected wallet sheet after awaiting `canMakePayment()`. Apple requires session creation within the gesture stack. Pass `email` when your page already collected one — the sheet takes it and never asks for a second. With `requestPayerEmail: false`, passing one is required, and the sheet refuses to open without it because confirmation tokens require an email. Call synchronously during user activation. Await prerequisites first because browsers revoke activation across asynchronous steps.

**Signature:** `(type: "apple_pay" | "google_pay", provided?: { email?: string | undefined; } | undefined) => Promise<PaymentRequestResult>`

## Events

Subscribe to events below. Each method returns an unsubscribe function.

<Warning>Each event handler must call its documented reply method exactly once. Otherwise, the flow waits for the vendor timeout.</Warning>

### `onShippingAddressChange`

The sheet's shipping address changed (redacted pre-authorization: city/state/postal/country only). Call `updateWith(…)` exactly once per event or the flow waits until the vendor times out. Returns the unsubscribe function.

**Signature:** `(handler: (ev: ShippingAddressChangeEvent) => void) => () => void`

### `onShippingOptionChange`

The buyer picked a shipping option. Amount-only contract: `updateWith` carries amount/lineItems/shippingOptions/errors. Call `updateWith(…)` exactly once per event or the flow waits until the vendor times out. Returns the unsubscribe function.

**Signature:** `(handler: (ev: ShippingOptionChangeEvent) => void) => () => void`

### `onBillingAddressChange`

Fires at sheet open and on card switches with the selected card's redacted billing address (city/state/postal/country only) — reprice the total for the address the charge taxes off. Answer `updateWith({ amount })` in minor units, or `updateWith({})` to keep the current total. Every event is answered exactly once: a slow, thrown, or superseded handler answers keep-current. Call `updateWith(…)` exactly once per event or the flow waits until the vendor times out. Returns the unsubscribe function.

**Signature:** `(handler: (ev: BillingAddressChangeEvent) => void) => () => void`

### `onConfirmationToken`

The sheet created a confirmation token. This is the same result that `show()` returns. Returns the unsubscribe function.

**Signature:** `(handler: (ev: PaymentRequestResult) => void) => () => void`

### `onCancel`

The buyer dismissed the sheet. Returns the unsubscribe function.

**Signature:** `(handler: () => void) => () => void`
