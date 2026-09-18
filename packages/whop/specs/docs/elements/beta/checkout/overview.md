> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Checkout

> Drives a full hosted checkout for one plan — price summary, promo codes, the currency the buyer pays in, and the whole payment collection surface (the payments elements, composed inside) — against the Whop checkout sessions API. Mount it with a `plan` (or a `checkoutConfiguration` you authored) and the element opens the checkout session itself; the session credential never leaves the element. The buyer pays inside the element, and a finished checkout redirects the current tab to `returnUrl`, including the page that contains the element. Fulfill from webhooks rather than a browser callback. Without a `returnUrl`, the buyer rests on the element’s own success face. The element automatically drives an off-site payment step, such as 3DS or a bank page. On whop.com, it brings the buyer back into the restored checkout; in an embed, the buyer returns to the same `returnUrl`. A failed payment reopens the same checkout with the reason shown, so the buyer can pay again. Every option is set at creation: the element mints a checkout session from these values when it mounts. Changing one later with `update()` or new React props fails instead of changing the existing order. Mount a new checkout to change the purchase.

<Info>This page documents `@whop/elements@1.0.0-beta.2` and `@whop/elements-react@1.0.0-beta.2`.</Info>

*Pre-release, not yet part of a stable release.*

## Playground

Assemble the elements with example data. Drive the controls, add and arrange elements, and watch events fire live:

<div data-whop-demo-shell style={{ position: "relative", minHeight: "480px", transition: "min-height 200ms ease" }}>
  <div data-whop-demo-skeleton style={{ position: "absolute", inset: "0", borderRadius: "12px", background: "rgba(140, 140, 140, 0.12)", pointerEvents: "none", transition: "opacity 200ms ease" }} />

  <div data-whop-demo-native="playground:checkout" data-whop-elements-version="1.0.0-beta.2" style={{ position: "relative" }} />
</div>

<div data-whop-usage="checkout/playground">
  <CodeGroup>
    ```tsx React theme={null}
    import { WhopElements, Checkout } from "@whop/elements-react";
    import { loadWhop } from "@whop/elements";

    function Example() {
      return (
        <WhopElements elements={loadWhop()}>
          <Checkout /* options */>
            {/* mount elements here */}
          </Checkout>
        </WhopElements>
      );
    }
    ```

    ```html JavaScript theme={null}
    <script src="https://js.whop.cloud/elements/amber/elements.js" data-whop-elements></script>
    <script type="module">
      const checkout = window.WhopElements().checkout.create({ /* options */ });
    </script>
    ```
  </CodeGroup>
</div>

## Options

Pass these to `whop.checkout.create({ … })`, or as props on `<Checkout>` in React.

<ResponseField name="plan" type="string">
  Existing plan ID, prefixed `plan_`. The element creates a checkout session for it, and the plan defines the price; nothing about amounts can be asserted client-side. Every checkout is created from this or a `checkoutConfiguration` — omitting both refuses loudly at mount. Set at create only: the session is minted from it, and changing it later refuses.
</ResponseField>

<ResponseField name="checkoutConfiguration" type="string">
  Existing checkout configuration ID, prefixed `ch_`. The element creates the checkout session from it: the configuration names the plan being sold and seeds its own affiliate code, metadata, redirect and payment-method presets — an option passed here beside it wins over the configuration’s copy, field by field. Pass `plan` alongside only to set `quantity`; it must be the configuration’s own plan, which can never be swapped out from under its presets. Set at create only.
</ResponseField>

<ResponseField name="quantity" type="number">
  How many units to purchase. Plans that disallow multiples refuse values above 1. Set at create only: the session is minted with it, and changing it later refuses. @default 1
</ResponseField>

<ResponseField name="promoCode" type="string">
  A promo code to apply before the buyer ever sees the price — the discount is on the first quote, and the buyer can still change or remove it. Pass the code a marketing link carried: a code that has expired or was never valid opens the checkout at full price with the reason on the promo row, never a checkout that will not open. Set at create only.
</ResponseField>

<ResponseField name="affiliateCode" type="string">
  The affiliate this checkout is attributed to. Set at create only.
</ResponseField>

<ResponseField name="attribution" type="CheckoutAttributionInput">
  Where this sale came from, for the account's reporting: the campaign parameters of the link the buyer arrived on (`utmSource`, `utmMedium`, `utmCampaign`, `utmTerm`, `utmContent`, a Whop `trackingLinkId`, a `funnelId`, and your own `source`). Everything here is recorded against the order and is never shown to the buyer. Set at create only.
</ResponseField>

<ResponseField name="metadata" type="Record<string, string>">
  Your own key/value pairs to record against the order and read back on the payment — order IDs, cart IDs, or anything you reconcile against. Up to 40 string pairs. Set at create only.
</ResponseField>

<ResponseField name="returnUrl" type="string">
  Where the buyer lands after an off-site payment step. Https-only (http for localhost). Set at create only.
</ResponseField>

<ResponseField name="appearance" type="Appearance">
  Visual customization for this group's elements. Overrides the global `WhopElements({ appearance })`. Change it live with `update({ appearance })`.
</ResponseField>

<ResponseField name="locale" type="WhopElementsLocale">
  Locale for this group's element UI text. Set it to one of the app's built locales to override the global configuration. Any other value falls back to the default locale.
</ResponseField>

## Events

Pass callbacks in the create options or React props.

### `onLoadingChange`

Runs when the grouped loading state changes. The value is `true` while any mounted element is still loading.

**Signature:** `((loading: boolean) => void)`

## Methods

Call these on the Checkout handle from `whop.checkout.create({ … })` or `useCheckout()`.

### `update`

Merges new handle options into every mounted element. In React, change the namespace props instead.

**Signature:** `(options: Partial<CheckoutOptions>) => void`

### `destroy`

Destroys every element and sub-controller this handle created, removes the controller frame, and releases its subscriptions. You can call it more than once, but a destroyed handle refuses any other call — create a new handle to start over. React removes the group automatically when the provider unmounts.

**Signature:** `() => void`

## Types

Named types used throughout this page.

## `CheckoutAttributionInput`

Checkout attribution recorded with the session. The element maps these fields to `POST /api/v1/checkout_sessions`; empty values are omitted, and `country` is resolved by the API.

### `utmSource`

**Signature:** `string | undefined`

### `utmMedium`

**Signature:** `string | undefined`

### `utmCampaign`

**Signature:** `string | undefined`

### `utmTerm`

**Signature:** `string | undefined`

### `utmContent`

**Signature:** `string | undefined`

### `trackingLinkId`

**Signature:** `string | undefined`

### `funnelId`

**Signature:** `string | undefined`

### `source`

**Signature:** `string | undefined`

## Elements

The elements this group mounts. Each has its own page:

**Alternatives.** Mount one at a time. Destroy it before mounting another:

<CardGroup cols={2}>
  <Card title="CheckoutElement" href="/elements/beta/checkout/checkout">
    The full checkout surface — order summary with the live quote, promo code entry, the currency the buyer pays in, everything this checkout has to collect from the buyer, the composed payment methods surface, and the pay flow. What it collects is whatever the seller set up (email, their own questions, a phone number, a shipping address for physical goods, an explicit agreement to their terms), rendered together on one screen in the order they chose — so a seller who starts asking for something new needs no change here. Renders the whole purchase; the checkout controller owns the session and the credential. After a payment that needs an off-site step, this same surface renders the outcome the server reports when the buyer comes back.
  </Card>

  <Card title="ExpressCheckoutElement" href="/elements/beta/checkout/expressCheckout">
    One-press Apple Pay and Google Pay buttons for a checkout — the OS payment sheet collects whatever the session still needs (the buyer's email, a shipping address for physical goods, a promo code where the seller offers entry) and one press finishes the purchase. It shares the checkout's entry slot with the full checkout element, so a handle mounts exactly one of the two: this button alone where the purchase is simple enough for a sheet to finish, or the full checkout surface for everything else. Renders only the wallets the buyer's device can actually pay with, using the served button art, and renders nothing where no wallet is available. A checkout the sheet cannot honestly finish — a waitlist join, a transfer, a form question only a page can ask — refuses loudly instead of rendering a doomed button.
  </Card>
</CardGroup>

## Flow surfaces

These internal elements open automatically during guided flows. They aren't part of the consumer API, so you don't mount or configure them.

* **CheckoutDetailsElement** (`checkoutDetails`): The order-details sheet a narrow checkout opens for the promo code, currency, and totals.
