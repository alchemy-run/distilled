> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# One click checkout button

> Drop a single Apple Pay, Google Pay, or Whop Pay button on your site that opens Whop checkout in a dialog

export const OneClickCheckoutDemo = ({planId, returnUrl}) => {
  const [mounted, setMounted] = React.useState(false);
  const [ready, setReady] = React.useState(false);
  const subscribe = React.useCallback(onChange => {
    const observer = new MutationObserver(() => {
      onChange();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
    return () => observer.disconnect();
  }, []);
  const getSnapshot = React.useCallback(() => {
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  }, []);
  const getServerSnapshot = React.useCallback(() => {
    return null;
  }, []);
  const theme = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  React.useEffect(() => {
    const src = "https://js.whop.com/static/checkout/loader.js";
    if (!document.querySelector(`script[src="${src}"]`)) {
      const script = document.createElement("script");
      script.async = true;
      script.src = src;
      document.head.appendChild(script);
    }
    setMounted(true);
  }, []);
  const revealCleanup = React.useRef(null);
  const buttonRef = React.useCallback(node => {
    if (!node) {
      if (revealCleanup.current) revealCleanup.current();
      revealCleanup.current = null;
      return;
    }
    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      const skeleton = document.getElementById("one-click-demo-skeleton");
      if (skeleton) skeleton.style.display = "none";
      setReady(true);
    };
    node.addEventListener("ready", reveal, {
      once: true
    });
    const errorObserver = new MutationObserver(() => {
      if (node.dataset.state === "error") reveal();
    });
    errorObserver.observe(node, {
      attributes: true,
      attributeFilter: ["data-state"]
    });
    const revealTimeout = setTimeout(reveal, 10000);
    revealCleanup.current = () => {
      revealed = true;
      clearTimeout(revealTimeout);
      errorObserver.disconnect();
      node.removeEventListener("ready", reveal);
    };
  }, []);
  if (!mounted || !theme) return null;
  return React.createElement("whop-express-checkout-button", {
    ref: buttonRef,
    "plan-id": planId,
    "return-url": returnUrl,
    theme,
    style: {
      display: "block",
      opacity: ready ? 1 : 0,
      transition: "opacity 200ms ease"
    }
  });
};

## Try it (its real) 👇

<div style={{ position: "relative", minHeight: "55px" }}>
  <style>
    {`@keyframes occd-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }`}
  </style>

  <div
    id="one-click-demo-skeleton"
    style={{
		position: "absolute",
		inset: 0,
		borderRadius: "8px",
		background: "rgba(128, 128, 128, 0.15)",
		animation: "occd-pulse 1.5s ease-in-out infinite",
	}}
  />

  <OneClickCheckoutDemo planId="plan_HmQiPLPPnvsFG" returnUrl="https://docs.whop.com/payments/one-click-checkout-button" />
</div>

## React setup

### Step 1: Install the package

```bash theme={null}
npm install @whop/checkout
```

### Step 2: Add the button

```tsx theme={null}
import { WhopExpressCheckoutButton } from "@whop/checkout/react";

export default function PricingCard() {
	return (
		<WhopExpressCheckoutButton
			planId="plan_XXXXXXXXX"
			returnUrl="https://yoursite.com/checkout/complete"
		/>
	);
}
```

You must provide `returnUrl` for the one click checkout button. The regular embedded checkout makes this property optional. Redirect-based payment methods may complete inside the Whop Pay dialog. The return URL closes the payment loop on your page.

When Whop sends the customer back, check the `status` query parameter:

* **success**: The payment succeeded.
* **error**: The payment failed, or the customer canceled it.

On success, the redirect also includes:

* **`payment_id`** — the id of the [payment](/api-reference/payments/payment). Use it to look up the payment on your backend or render a confirmation.
* **`setup_intent_id`** — set instead of `payment_id` when checkout didn't charge anything (e.g. saving a card for future use).
* **`state_id`** — the checkout session id.

### Step 3: Configure optional properties

#### **`planId`**

**Required (or `checkoutConfigurationId`)** - The plan id you want to checkout. Provide either this or `checkoutConfigurationId`, not both.

#### **`checkoutConfigurationId`**

**Required (or `planId`)** - An API-created checkout configuration id. Use this to mount the button with a pre-configured checkout. For example, the configuration can include metadata, a pre-applied promotion, or a multi-line cart. The button then skips creating a session at mount time. Provide either this property or `planId`, not both.

#### **`returnUrl`**

**Required** - The URL to return to after payment authorization flows.

#### **`methods`**

**Optional** - The methods that the button can render, in priority order. Defaults to `["apple-pay", "google-pay", "whop-pay"]`.

* `apple-pay` — the native Apple Pay button (Safari and other Apple Pay-capable browsers).
* `google-pay` — the native Google Pay button (Chrome, Android, and other Google Pay-capable browsers).
* `whop-pay` — a Whop Pay button that opens checkout in a dialog.

```tsx theme={null}
<WhopExpressCheckoutButton
	methods={["apple-pay"]}
	planId="plan_XXXXXXXXX"
	returnUrl="https://yoursite.com/checkout/complete"
/>
```

Wallet requests are strict: a `methods={["google-pay"]}` button only ever renders Google Pay — it never falls back to Apple Pay (and vice versa). If none of the allowed methods can render in the current browser, nothing renders and the `onExpressMethodResolved` callback fires with `{ rendered: "none" }`.

#### **`theme`**

**Optional** - The theme for the button and the dialog. Possible values are `light`, `dark`, or `system`.

#### **`themeOptions`**

**Optional** - Theme tuning for the Whop Pay dialog.

```tsx theme={null}
<WhopExpressCheckoutButton
	planId="plan_XXXXXXXXX"
	returnUrl="https://yoursite.com/checkout/complete"
	theme="dark"
	themeOptions={{ accentColor: "violet", highContrast: true }}
/>
```

#### **`prefill`**

**Optional** - Prefill the email or address inside the Whop Pay dialog. Same shape as the regular embedded checkout — see [prefill options](/payments/checkout-embed#prefill).

```tsx theme={null}
<WhopExpressCheckoutButton
	planId="plan_XXXXXXXXX"
	returnUrl="https://yoursite.com/checkout/complete"
	prefill={{ email: "example@domain.com" }}
/>
```

#### **`affiliateCode`**

**Optional** - Attribute the sale to an affiliate.

#### **`promoCode`**

**Optional** - Apply a promo code on the session.

#### **`adaptivePricing`**

**Optional** - Set to `true` to present prices in the buyer's local currency where supported. Defaults to `false`.

#### **`skipRedirect`**

**Optional** - Set to `true` to skip the final redirect and keep your page loaded. Automatically `true` when you provide `onComplete`.

#### **`onComplete`**

**Optional** - Fires when the checkout completes successfully.

<Note>Setting this implies `skipRedirect = true`.</Note>

```tsx theme={null}
<WhopExpressCheckoutButton
	planId="plan_XXXXXXXXX"
	returnUrl="https://yoursite.com/checkout/complete"
	onComplete={(planId, receiptId) => {
		console.log("paid", planId, receiptId);
	}}
/>
```

#### **`onPaymentError`**

**Optional** - Fires when checkout payment processing fails, with a human readable `message` and an optional machine readable `code`.

```tsx theme={null}
<WhopExpressCheckoutButton
	planId="plan_XXXXXXXXX"
	returnUrl="https://yoursite.com/checkout/complete"
	onPaymentError={(error) => {
		console.log(error.message, error.code);
	}}
/>
```

#### **`onExpressMethodResolved`**

**Optional** - Fires once the button decides which method it will render.

```tsx theme={null}
<WhopExpressCheckoutButton
	planId="plan_XXXXXXXXX"
	returnUrl="https://yoursite.com/checkout/complete"
	onExpressMethodResolved={({ rendered }) => {
		// rendered: "apple-pay" | "google-pay" | "whop-pay" | "none"
		if (rendered === "none") hidePricingCard();
	}}
/>
```

`rendered: "none"` means the button won't show anything — typically because the only requested method is `apple-pay` and the browser can't render it. Use this to hide the surrounding slot so you don't leave an empty space on the page.

## What renders

The button picks one method per browser, in this order:

| Browser                                          | Renders                  | Notes                                     |
| ------------------------------------------------ | ------------------------ | ----------------------------------------- |
| Safari (macOS/iOS) with an Apple Pay card set up | Native Apple Pay button  | Submits inline without a dialog           |
| Chrome / Android with Google Pay                 | Native Google Pay button | Submits inline without a dialog           |
| Anything else                                    | Whop Pay button          | Opens checkout in a dialog over your page |

If you only request `apple-pay` and the browser can't render it, the button signals back to your page (via the `express-method-resolved` event) so you can hide the slot.

## Other websites

### Step 1: Add the script tag

```html theme={null}
<script
	async
	defer
	src="https://js.whop.com/static/checkout/loader.js"
></script>
```

### Step 2: Add the button

The one click checkout button is a custom element. Once loaded, the script registers `<whop-express-checkout-button>`:

```html theme={null}
<whop-express-checkout-button
	plan-id="plan_XXXXXXXXX"
	return-url="https://yoursite.com/checkout/complete"
></whop-express-checkout-button>
```

### Step 3: Configure optional attributes

| Attribute                              | Required                             | Description                                                                                 |
| -------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------- |
| `plan-id`                              | yes (or `checkout-configuration-id`) | The plan to check out.                                                                      |
| `checkout-configuration-id`            | yes (or `plan-id`)                   | An API-created checkout configuration to resume instead of creating a new session at mount. |
| `return-url`                           | yes                                  | Where to return after redirect-based authorization.                                         |
| `methods`                              | no                                   | Comma-separated list — `apple-pay`, `google-pay`, `whop-pay`. Defaults to all.              |
| `theme`                                | no                                   | `light`, `dark`, or `system`.                                                               |
| `theme-accent-color`                   | no                                   | Frosted UI accent color name (e.g. `violet`).                                               |
| `theme-high-contrast`                  | no                                   | `"true"` or `"false"`.                                                                      |
| `prefill-email`                        | no                                   | Prefill the buyer's email.                                                                  |
| `prefill-name`                         | no                                   | Prefill the buyer's name.                                                                   |
| `prefill-address-line1`                | no                                   | Prefill billing address line 1.                                                             |
| `prefill-address-line2`                | no                                   | Prefill billing address line 2.                                                             |
| `prefill-address-city`                 | no                                   | Prefill billing city.                                                                       |
| `prefill-address-state`                | no                                   | Prefill billing state.                                                                      |
| `prefill-address-country`              | no                                   | Prefill billing country code.                                                               |
| `prefill-address-postal-code`          | no                                   | Prefill billing postal code.                                                                |
| `prefill-shipping-name`                | no                                   | Prefill shipping name.                                                                      |
| `prefill-shipping-address-line1`       | no                                   | Prefill shipping address line 1.                                                            |
| `prefill-shipping-address-line2`       | no                                   | Prefill shipping address line 2.                                                            |
| `prefill-shipping-address-city`        | no                                   | Prefill shipping city.                                                                      |
| `prefill-shipping-address-state`       | no                                   | Prefill shipping state.                                                                     |
| `prefill-shipping-address-country`     | no                                   | Prefill shipping country code.                                                              |
| `prefill-shipping-address-postal-code` | no                                   | Prefill shipping postal code.                                                               |
| `affiliate-code`                       | no                                   | Affiliate attribution.                                                                      |
| `promo-code`                           | no                                   | Apply a promo code on the session.                                                          |
| `state-id`                             | no                                   | Resume a previously created session.                                                        |
| `adaptive-pricing`                     | no                                   | `"true"` to present buyer-local currency.                                                   |
| `skip-redirect`                        | no                                   | `"true"` to keep your page loaded after payment.                                            |
| `setup-future-usage`                   | no                                   | Set to `off_session` to save the payment method for future charges.                         |
| `environment`                          | no                                   | Override the API environment when needed.                                                   |
| `wuid`                                 | no                                   | Stable per-buyer identifier for analytics.                                                  |

### Step 4: Listening for events

The custom element dispatches DOM events you can listen for:

```html theme={null}
<whop-express-checkout-button
	id="my-button"
	plan-id="plan_XXXXXXXXX"
	return-url="https://yoursite.com/checkout/complete"
></whop-express-checkout-button>

<script>
	const button = document.getElementById("my-button");

	button.addEventListener("express-method-resolved", (event) => {
		// event.detail.rendered: "apple-pay" | "google-pay" | "whop-pay" | "none"
		if (event.detail.rendered === "none") button.style.display = "none";
	});

	button.addEventListener("complete", (event) => {
		// event.detail: { planId, receiptOrSetupIntentId }
		console.log("paid", event.detail);
	});

	button.addEventListener("payment-error", (event) => {
		// event.detail: { message, code? }
		console.log("payment failed", event.detail);
	});

	button.addEventListener("overlay-open", () => {
		// the Whop Pay dialog opened
	});

	button.addEventListener("overlay-close", () => {
		// the Whop Pay dialog closed (cancelled or completed)
	});
</script>
```

| Event                     | Fires when                                                                                                                           |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `ready`                   | The button has mounted and measured itself.                                                                                          |
| `express-method-resolved` | The button decided which method it will render. `event.detail.rendered` is `"apple-pay"`, `"google-pay"`, `"whop-pay"`, or `"none"`. |
| `overlay-open`            | The Whop Pay dialog opened.                                                                                                          |
| `overlay-close`           | The Whop Pay dialog closed (for any reason).                                                                                         |
| `complete`                | Payment completed successfully. `event.detail` has `planId` and `receiptOrSetupIntentId`.                                            |
| `payment-error`           | Payment processing failed. `event.detail` has a human readable `message` and an optional machine readable `code`.                    |
