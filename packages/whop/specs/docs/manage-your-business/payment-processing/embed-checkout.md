> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Embed checkout

> Learn how to embed Whop's checkout flow on your website

Embedded checkout puts Whop's checkout flow on your website. Your customers get a seamless checkout experience without leaving your website.

<Card title="Try the checkout playground" icon="sliders" href="https://whop.com/checkout-playground">
  Customize colors, radius, and fields in real time, then copy the generated embed code.
</Card>

<iframe width="100%" height="400" src="https://www.youtube.com/embed/0hGnAzwxd4g?si=0LDncN3P_MKfrsvD&rel=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen />

## React setup

### Step 1: Install the package

```bash theme={null}
npm install @whop/checkout
```

### Step 2: Add the checkout element

```tsx theme={null}
import { WhopCheckoutEmbed } from "@whop/checkout/react";

export default function Home() {
	return (
		<WhopCheckoutEmbed
			planId="plan_XXXXXXXXX"
			returnUrl="https://yoursite.com/checkout/complete"
		/>
	);
}
```

This component will mount an iframe with the Whop checkout embed.

You must provide `returnUrl` to handle redirects from external payment providers. After a redirect, check the `status` query parameter:

* **success**: The payment succeeded. Use the receipt information to render a success page.
* **error**: The payment failed, or the customer canceled it. Remount the checkout so your customer can try again.

<Tip>
  Keep that Plan ID handy. You'll need to paste it into your website code, so
  save it somewhere you can find it.
</Tip>

### Step 3 (optional): Configure programmatic controls

To get access to the controls of the checkout embed, you can use the `ref` prop.

```tsx theme={null}
const ref = useCheckoutEmbedControls();

return <WhopCheckoutEmbed ref={ref} planId="plan_XXXXXXXXX" />;
```

#### **`submit`**

To submit checkout programmatically, you can use the `submit` method on the checkout element.

```tsx theme={null}
ref.current?.submit();
```

#### **`getEmail`**

To get the email of the user who is checking out, you can use the `getEmail` method on the checkout element.

```tsx theme={null}
const email = await ref.current?.getEmail();
console.log(email);
```

#### **`setEmail`**

Use the `setEmail` method on the checkout element to provide the user's email.

```tsx theme={null}
try {
	await ref.current?.setEmail("example@domain.com");
} catch (error) {
	console.error(error);
}
```

#### **`getAddress`**

To get the address of the user who is checking out, you can use the `getAddress` method on the checkout element.

```tsx theme={null}
const address = await ref.current?.getAddress();
console.log(address);
```

#### **`setAddress`**

Use the `setAddress` method on the checkout element to provide the user's address.

<Note>
  This method works only when you hide the address form. You can hide the
  address form by setting the `hideAddressForm` prop to `true`.
</Note>

```tsx theme={null}
try {
	await ref.current?.setAddress({
		name: "John Doe",
		country: "US",
		line1: "123 Main St",
		city: "Any Town",
		state: "CA",
		postalCode: "12345",
	});
} catch (error) {
	console.error(error);
}
```

### Step 4 (optional): Configure available properties

#### **`planId`**

**Required** - The plan id you want to checkout.

#### **`theme`**

**Optional** - The theme you want to use for the checkout.

Possible values are `light`, `dark` or `system`.

#### **`sessionId`**

**Optional** - The session id to use for the checkout.

To attach metadata to a checkout, first create a session through the API. Then pass the session ID to the checkout element.

#### **`returnUrl`**

**Optional** - The URL to redirect the user to after checkout completes.

```tsx theme={null}
<WhopCheckoutEmbed
	returnUrl="https://yoursite.com/checkout/complete"
	planId="plan_XXXXXXXXX"
/>
```

#### **`affiliateCode`**

**Optional** - The affiliate code to use for the checkout.

```tsx theme={null}
<WhopCheckoutEmbed affiliateCode="tristan" planId="plan_XXXXXXXXX" />
```

#### **`hidePrice`**

**Optional** - Turn on to hide the price in the embedded checkout form.

Defaults to `false`

#### **`hideTermsAndConditions`**

**Optional** - Set to `true` to hide the terms and conditions in the embedded checkout form.

Defaults to `false`

#### **`skipRedirect`**

**Optional** - Set to `true` to skip the final redirect and keep the top frame loaded.

Defaults to `false`

#### **`collectPhoneNumbers`**

**Optional** - Set to `true` to require a phone number, `"optional"` to show a phone number field that buyers may leave blank, or `false` to disable collection. When omitted, checkout uses the plan's feature setting.

```tsx theme={null}
<WhopCheckoutEmbed collectPhoneNumbers="optional" planId="plan_XXXXXXXXX" />
```

#### **`onComplete`**

**Optional** - A callback function that checkout calls when it completes.

<Note>This option will set `skipRedirect` to `true`</Note>

```tsx theme={null}
<WhopCheckoutEmbed
	onComplete={(planId, receiptId) => {
		console.log(planId, receiptId);
	}}
	planId="plan_XXXXXXXXX"
/>
```

#### **`utm`**

**Optional** - Campaign tracking parameters to add to the checkout URL.

**Note** - The keys must start with `utm_`

```tsx theme={null}
<WhopCheckoutEmbed
	planId="plan_XXXXXXXXX"
	utm={{ utm_campaign: "ad_XXXXXXX" }}
/>
```

#### **`fallback`**

**Optional** - The fallback content to show while the checkout is loading.

```tsx theme={null}
<WhopCheckoutEmbed fallback={<>loading...</>} planId="plan_XXXXXXXXX" />
```

#### **`prefill`**

**Optional** - The prefill options to apply to the checkout embed.

Used to prefill the email or address in the embedded checkout form.
This setting can help when integrating the embed into a funnel that collects the email before payment.

```tsx theme={null}
<WhopCheckoutEmbed
  prefill={{ email: "example@domain.com" }}
  planId="plan_XXXXXXXXX"
/>
<WhopCheckoutEmbed
  prefill={{ address: {
    name: "John Doe",
    country: "US",
    line1: "123 Main St",
    city: "Any Town",
    state: "CA",
    postalCode: "12345",
  } }}
  planId="plan_XXXXXXXXX"
/>
```

#### **`hideEmail`**

**Optional** - Set to `true` to hide the email input in the embedded checkout form. Make sure to display the users email in the parent page when setting this attribute.

Defaults to `false`

<Note>
  Use this in conjunction with the `prefill` attribute or the `setEmail` method
  to control the email input.
</Note>

```tsx theme={null}
<WhopCheckoutEmbed hideEmail planId="plan_XXXXXXXXX" />
```

#### **`disableEmail`**

**Optional** - Set to `true` to disable the email input in the embedded checkout form.

Defaults to `false`

<Note>
  Use this in conjunction with the `prefill` attribute or the `setEmail` method
  to control the email input.
</Note>

```tsx theme={null}
<WhopCheckoutEmbed disableEmail planId="plan_XXXXXXXXX" />
```

#### **`hideAddressForm`**

**Optional** - Set to `true` to hide the address form in the embedded checkout form.

Defaults to `false`

<Note>
  Use this in conjunction with the `setAddress` method to control the address
  input.
</Note>

```tsx theme={null}
<WhopCheckoutEmbed hideAddressForm planId="plan_XXXXXXXXX" />
```

#### **`setupFutureUsage`**

**Optional** - The future usage mode for checkout. When using the `chargeUser` API, set this to `off_session`. Checkout then filters out payment methods that the API doesn't support.

```tsx theme={null}
<WhopCheckoutEmbed setupFutureUsage="off_session" planId="plan_XXXXXXXXX" />
```

#### **`onStateChange`**

**Optional** - A callback function that checkout calls when its state changes.

Use this callback when submitting the checkout embed programmatically.

Possible values are `loading`, `ready`, `disabled`.

```tsx theme={null}
<WhopCheckoutEmbed
	onStateChange={(state) => {
		console.log(state);
	}}
	planId="plan_XXXXXXXXX"
/>
```

#### **`environment`**

**Optional** - The environment to use for the checkout.

Possible values are `production` or `sandbox`.

Defaults to `production`

<Note>
  When using `sandbox`, make sure to use a sandbox plan ID. Sandbox plans can be
  created in the [sandbox dashboard](https://sandbox.whop.com/dashboard).
</Note>

```tsx theme={null}
<WhopCheckoutEmbed environment="sandbox" planId="plan_XXXXXXXXX" />
```

#### **`onAddressValidationError`**

**Optional** - A callback function that checkout calls when an address validation error occurs.

<Note>
  This method works only when you hide the address form. You can hide the
  address form by setting the `hideAddressForm` prop to `true`.
</Note>

```tsx theme={null}
<WhopCheckoutEmbed
	hideAddressForm
	onAddressValidationError={(error) => {
		console.log(error);
	}}
	planId="plan_XXXXXXXXX"
/>
```

#### **`onPaymentError`**

**Optional** - A callback function that checkout calls when payment processing fails.

The callback receives an error object with a human readable `message` and an optional machine readable `code`. It fires for declines on submit and failures detected during payment processing. For example, it fires after 3D Secure and after external provider redirects.

```tsx theme={null}
<WhopCheckoutEmbed
	onPaymentError={(error) => {
		console.log(error.message, error.code);
	}}
	planId="plan_XXXXXXXXX"
/>
```

#### **`styles`**

**Optional** - Customize the padding of the checkout embed container.

The `styles` prop accepts a `container` object with the following properties:

| Property        | Description                          | Default |
| --------------- | ------------------------------------ | ------- |
| `paddingTop`    | Top padding in pixels                | `32`    |
| `paddingBottom` | Bottom padding in pixels             | `32`    |
| `paddingLeft`   | Left padding in pixels               | `32`    |
| `paddingRight`  | Right padding in pixels              | `32`    |
| `paddingY`      | Shorthand for top and bottom padding | `32`    |
| `paddingX`      | Shorthand for left and right padding | `32`    |

Individual properties take precedence over their shorthand equivalents.

```tsx theme={null}
<WhopCheckoutEmbed
	planId="plan_XXXXXXXXX"
	styles={{ container: { paddingX: 0 } }}
/>
```

```tsx theme={null}
<WhopCheckoutEmbed
	planId="plan_XXXXXXXXX"
	styles={{
		container: {
			paddingLeft: 16,
			paddingRight: 16,
			paddingTop: 0,
			paddingBottom: 0,
		},
	}}
/>
```

### Full example

```tsx theme={null}
import { WhopCheckoutEmbed } from "@whop/checkout/react";

export default function Home() {
	return (
		<WhopCheckoutEmbed
			fallback={<>loading...</>}
			planId="plan_XXXXXXXXX"
			sessionId="ch_XXXXXXXXX"
			returnUrl="https://yoursite.com/checkout/complete"
			theme="light"
			hidePrice={false}
		/>
	);
}
```

## Other websites

### Step 1: Add the script tag

To embed checkout, you need to add the following script tag into the `<head>` of your page:

```md theme={null}
<script
  async
  defer
  src="https://js.whop.com/static/checkout/loader.js"
></script>
```

### Step 2: Add the checkout element

To create a checkout element, you need to include the following attributes on an element in your page:

```md theme={null}
<div
  data-whop-checkout-plan-id="plan_XXXXXXXXX"
  data-whop-checkout-return-url="https://yoursite.com/checkout/complete"
></div>
```

This will mount an iframe inside of the element with the plan id you provided.

You must provide `data-whop-checkout-return-url` to handle redirects from external payment providers. After a redirect, check the `status` query parameter:

* **success**: The payment succeeded. Use the receipt information to render a success page.
* **error**: The payment failed, or the customer canceled it. Remount the checkout so your customer can try again.

### Step 3 (optional): Configure programmatic controls

First, attach an `id` to the checkout container:

```md theme={null}
<div id="whop-embedded-checkout" data-whop-checkout-plan-id="plan_XXXXXXXXX"></div>
```

#### **`submit`**

To submit checkout programmatically, you can use the `submit` method on the checkout element.

```js theme={null}
wco.submit("whop-embedded-checkout");
```

#### **`getEmail`**

To get the email of the user who is checking out, you can use the `getEmail` method on the checkout element.

```js theme={null}
const email = await wco.getEmail("whop-embedded-checkout");
console.log(email);
```

#### **`setEmail`**

Use the `setEmail` method on the checkout element to provide the user's email.

```js theme={null}
wco.setEmail("whop-embedded-checkout", "example@domain.com");
```

#### **`getAddress`**

To get the address of the user who is checking out, you can use the `getAddress` method on the checkout element.

```js theme={null}
const address = await wco.getAddress("whop-embedded-checkout");
console.log(address);
```

#### **`setAddress`**

Use the `setAddress` method on the checkout element to provide the user's address.

<Note>
  This method works only when you hide the address form. You can hide the
  address form by setting the `data-whop-checkout-hide-address` prop to `true`.
</Note>

```js theme={null}
try {
	await wco.setAddress("whop-embedded-checkout", {
		name: "John Doe",
		country: "US",
		line1: "123 Main St",
		city: "Any Town",
		state: "CA",
		postalCode: "12345",
	});
} catch (error) {
	console.error(error);
}
```

### Step 4 (optional): Configure available attributes

#### **`data-whop-checkout-plan-id`**

**Required** - The plan id you want to checkout.

> To get your plan id, you need to first create a plan in the **Manage Pricing** section on your whop page.

#### **`data-whop-checkout-theme`**

**Optional** - The theme you want to use for the checkout.

Possible values are `light`, `dark` or `system`.

```md theme={null}
<div data-whop-checkout-theme="light" data-whop-checkout-plan-id="plan_XXXXXXXXX"></div>
```

#### **`data-whop-checkout-theme-accent-color`**

**Optional** - The accent color to apply to the checkout embed

Possible values are

* `tomato`
* `red`
* `ruby`
* `crimson`
* `pink`
* `plum`
* `purple`
* `violet`
* `iris`
* `cyan`
* `teal`
* `jade`
* `green`
* `grass`
* `brown`
* `blue`
* `orange`
* `indigo`
* `sky`
* `mint`
* `yellow`
* `amber`
* `lime`
* `lemon`
* `magenta`
* `gold`
* `bronze`
* `gray`

```md theme={null}
<div data-whop-checkout-theme-accent-color="green" data-whop-checkout-plan-id="plan_XXXXXXXXX"></div>
```

#### **`data-whop-checkout-session`**

**Optional** - The session id to use for the checkout.

To attach metadata to a checkout, first create a session through the API. Then pass the session ID to the checkout element.

```md theme={null}
<div data-whop-checkout-session="ch_XXXXXXXXX" data-whop-checkout-plan-id="plan_XXXXXXXXX"></div>
```

#### **`data-whop-checkout-return-url`**

**Optional** - The URL to redirect the user to after checkout completes.

```md theme={null}
<div data-whop-checkout-return-url="https://yoursite.com/checkout/complete" data-whop-checkout-plan-id="plan_XXXXXXXXX"></div>
```

#### **`data-whop-checkout-affiliate-code`**

**Optional** - The affiliate code to use for the checkout.

```md theme={null}
<div data-whop-checkout-affiliate-code="tristan" data-whop-checkout-plan-id="plan_XXXXXXXXX"></div>
```

#### **`data-whop-checkout-hide-price`**

**Optional** - Set to `true` to hide the price in the embedded checkout form.

Defaults to `false`

```md theme={null}
<div data-whop-checkout-hide-price="true" data-whop-checkout-plan-id="plan_XXXXXXXXX"></div>
```

#### **`data-whop-checkout-hide-submit-button`**

**Optional** - Set to `true` to hide the submit button in the embedded checkout form.

Defaults to `false`

<Note>
  When using this Option, you will need to [programmatically submit](#submit)
  the checkout form.
</Note>

```md theme={null}
<div data-whop-checkout-hide-submit-button="true" data-whop-checkout-plan-id="plan_XXXXXXXXX"></div>
```

#### **`data-whop-checkout-hide-tos`**

**Optional** - Set to `true` to hide the terms and conditions in the embedded checkout form.

Defaults to `false`

```md theme={null}
<div data-whop-checkout-hide-tos="true" data-whop-checkout-plan-id="plan_XXXXXXXXX"></div>
```

#### **`data-whop-checkout-skip-redirect`**

**Optional** - Set to `true` to skip the final redirect and keep the top frame loaded.

Defaults to `false`

```md theme={null}
<div data-whop-checkout-skip-redirect="true" data-whop-checkout-plan-id="plan_XXXXXXXXX"></div>
```

#### **`data-whop-checkout-collect-phone-numbers`**

**Optional** - Set to `true` to require a phone number, `optional` to show a phone number field that buyers may leave blank, or `false` to disable collection. When omitted, checkout uses the plan's feature setting.

```md theme={null}
<div data-whop-checkout-collect-phone-numbers="optional" data-whop-checkout-plan-id="plan_XXXXXXXXX"></div>
```

#### **`data-whop-checkout-on-complete`**

**Optional** - The callback to call when the checkout succeeds

<Note>This option will set `data-whop-checkout-skip-redirect` to `true`</Note>

```html theme={null}
<script>
	window.onCheckoutComplete = (planId, receiptId) => {
		console.log(planId, receiptId);
	};
</script>

<div
	data-whop-checkout-on-complete="onCheckoutComplete"
	data-whop-checkout-plan-id="plan_XXXXXXXXX"
></div>
```

#### **`data-whop-checkout-on-state-change`**

**Optional** - The callback to call when state of the checkout changes

Use this callback when submitting the checkout embed programmatically.

Possible values are `loading`, `ready`, `disabled`.

```html theme={null}
<script>
	window.onCheckoutStateChange = (state) => {
		console.log(state);
	};
</script>

<div
	data-whop-checkout-on-state-change="onCheckoutStateChange"
	data-whop-checkout-plan-id="plan_XXXXXXXXX"
></div>
```

#### **`data-whop-checkout-skip-utm`**

By default, checkout forwards campaign tracking parameters from the main page to the checkout embed.

**Optional** - Set to `true` to prevent automatic forwarding of campaign tracking parameters

Defaults to `false`

#### **`data-whop-checkout-prefill-*`**

Use this to prefill the email or address in the embedded checkout form. This setting can help when integrating the embed into a funnel that collects the email before payment.

```md theme={null}
<div data-whop-checkout-prefill-email="example@domain.com" data-whop-checkout-plan-id="plan_XXXXXXXXX"></div>

<div 
	data-whop-checkout-prefill-name="John Doe"
	data-whop-checkout-prefill-address-country="US"
	data-whop-checkout-prefill-address-line1="123 Main St"
	data-whop-checkout-prefill-address-line2=""
	data-whop-checkout-prefill-address-city="Any Town"
	data-whop-checkout-prefill-address-state="CA"
	data-whop-checkout-prefill-address-postal-code="12345"
	data-whop-checkout-plan-id="plan_XXXXXXXXX"
></div>

<div data-whop-checkout-prefill-address-name="John Doe" data-whop-checkout-plan-id="plan_XXXXXXXXX"></div>
```

#### **`data-whop-checkout-hide-email`**

**Optional** - Set to `true` to hide the email input in the embedded checkout form. Make sure to display the users email in the parent page when setting this attribute.

Defaults to `false`

<Note>
  Use this in conjunction with the `data-whop-checkout-prefill-email` attribute
  or the `setEmail` method to control the email input.
</Note>

```md theme={null}
<div data-whop-checkout-hide-email="true" data-whop-checkout-plan-id="plan_XXXXXXXXX"></div>
```

#### **`data-whop-checkout-disable-email`**

**Optional** - Set to `true` to disable the email input in the embedded checkout form.

Defaults to `false`

<Note>
  Use this in conjunction with the `data-whop-checkout-prefill-email` attribute
  or the `setEmail` method to control the email input.
</Note>

```md theme={null}
<div data-whop-checkout-disable-email="true" data-whop-checkout-plan-id="plan_XXXXXXXXX"></div>
```

#### **`data-whop-checkout-hide-address`**

**Optional** - Set to `true` to hide the address form in the embedded checkout form.

Defaults to `false`

<Note>
  This method works only when you hide the address form. You can hide the
  address form by setting the `data-whop-checkout-hide-address` prop to `true`.
</Note>

```md theme={null}
<div data-whop-checkout-hide-address="true" data-whop-checkout-plan-id="plan_XXXXXXXXX"></div>
```

#### **`data-whop-checkout-setup-future-usage`**

**Optional** - The future usage mode for checkout. When using the `chargeUser` API, set this to `off_session`. Checkout then filters out payment methods that the API doesn't support.

```md theme={null}
<div data-whop-checkout-setup-future-usage="off_session" data-whop-checkout-plan-id="plan_XXXXXXXXX"></div>
```

#### **`data-whop-checkout-environment`**

**Optional** - The environment to use for the checkout.

Possible values are `production` or `sandbox`.

Defaults to `production`

<Note>
  When using `sandbox`, make sure to use a sandbox plan ID. Sandbox plans can be
  created in the [sandbox dashboard](https://sandbox.whop.com/dashboard).
</Note>

```md theme={null}
<div data-whop-checkout-environment="sandbox" data-whop-checkout-plan-id="plan_XXXXXXXXX"></div>
```

#### **`data-whop-checkout-on-address-validation-error`**

**Optional** - The callback to call when the address validation error occurs.

<Note>
  This method works only when you hide the address form. You can hide the
  address form by setting the `data-whop-checkout-hide-address` prop to `true`.
</Note>

```html theme={null}
<script>
	window.onAddressValidationError = (error) => {
		console.log(error);
	};
</script>

<div
	data-whop-checkout-on-address-validation-error="onAddressValidationError"
	data-whop-checkout-plan-id="plan_XXXXXXXXX"
></div>
```

#### **`data-whop-checkout-on-payment-error`**

**Optional** - The callback to call when checkout payment processing fails.

The callback receives an error object with a human readable `message` and an optional machine readable `code`. It fires for declines on submit and failures detected during payment processing. For example, it fires after 3D Secure and after external provider redirects.

```html theme={null}
<script>
	window.onPaymentError = (error) => {
		console.log(error.message, error.code);
	};
</script>

<div
	data-whop-checkout-on-payment-error="onPaymentError"
	data-whop-checkout-plan-id="plan_XXXXXXXXX"
></div>
```

#### **`data-whop-checkout-style-*`**

**Optional** - Customize the padding of the checkout embed container.

The attribute pattern is `data-whop-checkout-style-container-{property}` where `{property}` is a kebab-case padding property.

| Attribute                                           | Description                          | Default |
| --------------------------------------------------- | ------------------------------------ | ------- |
| `data-whop-checkout-style-container-padding-top`    | Top padding in pixels                | `32`    |
| `data-whop-checkout-style-container-padding-bottom` | Bottom padding in pixels             | `32`    |
| `data-whop-checkout-style-container-padding-left`   | Left padding in pixels               | `32`    |
| `data-whop-checkout-style-container-padding-right`  | Right padding in pixels              | `32`    |
| `data-whop-checkout-style-container-padding-y`      | Shorthand for top and bottom padding | `32`    |
| `data-whop-checkout-style-container-padding-x`      | Shorthand for left and right padding | `32`    |

Individual properties take precedence over their shorthand equivalents.

```md theme={null}
<div
  data-whop-checkout-plan-id="plan_XXXXXXXXX"
  data-whop-checkout-style-container-padding-x="0"
></div>
```

```md theme={null}
<div
  data-whop-checkout-plan-id="plan_XXXXXXXXX"
  data-whop-checkout-style-container-padding-left="16"
  data-whop-checkout-style-container-padding-right="16"
  data-whop-checkout-style-container-padding-top="0"
  data-whop-checkout-style-container-padding-bottom="0"
></div>
```

### Full example

```md theme={null}
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width">
		<script
			async
			defer
  			src="https://js.whop.com/static/checkout/loader.js"
		></script>
		<title>Whop embedded checkout example</title>
		<style>
			div {
				box-sizing: border-box;
			}
			body {
				margin: 0
			}
		</style>
	</head>
	<body>
		<div
			data-whop-checkout-plan-id="plan_XXXXXXXXX"
			data-whop-checkout-session="ch_XXXXXXXXX"
			data-whop-checkout-return-url="https://yoursite.com/checkout/complete"
			data-whop-checkout-theme="light"
			data-whop-checkout-hide-price="false"
			style="height: fit-content; overflow: hidden; max-width: 50%;"
		></div>
	</body>
</html>
```

## Digital wallet payments

Customers can pay using Apple Pay in their Apple Wallet, which provides a seamless checkout experience on Safari and iOS devices. To enable Apple Pay on your embedded checkout, verify ownership of your domain.

<Card title="Set up Apple Pay" icon="apple" href="/payments/apple-pay">
  Learn how to verify your domain and enable Apple Pay for embedded checkout
</Card>

<Note>
  When using the `hideSubmitButton` option in React, use `@whop/checkout@0.0.43`
  or later for Apple Pay to appear in the embed.
</Note>

## Platform-specific guides

<CardGroup cols={1}>
  <Card title="GoHighLevel" icon="browser" href="/third-party-integrations/gohighlevel">
    Process GoHighLevel payments through Whop
  </Card>
</CardGroup>

## Frequently asked questions

<AccordionGroup>
  <Accordion title="Why is my checkout not loading?">
    Make sure the `plan_XXXXXXXXX` or `PLAN_ID_HERE` value in each code snippet matches your Plan ID from the Whop dashboard. For HTML or JavaScript, also verify that the script tag appears in the `<head>` section.
  </Accordion>

  <Accordion title="Where do I find my Plan ID?">
    Go to your **Dashboard** > **Checkout links** > Select the **three dots (⋮)** on your pricing option > Hover over **Details** > Select the ID (starts with `plan_`) to copy it.
  </Accordion>

  <Accordion title="Can I embed multiple checkouts on the same page?">
    Yes, you can add multiple checkout embeds with different Plan IDs. Each embed operates independently.
  </Accordion>

  <Accordion title="How do I change the checkout theme?">
    For React: add `theme="dark"` or `theme="light"` as a property. For HTML: add `data-whop-checkout-theme="dark"` to your div element.
  </Accordion>

  <Accordion title="Can I hide the price in the embedded checkout?">
    Yes, add `hidePrice={true}` in React or `data-whop-checkout-hide-price="true"` in HTML to hide the price display.
  </Accordion>

  <Accordion title="What happens after a customer completes checkout?">
    By default, checkout redirects customers to your whop. Use a custom redirect URL or skip the redirect to customize this behavior.
  </Accordion>

  <Accordion title="How do I prevent the redirect after checkout?">
    Use `skipRedirect={true}` in React or `data-whop-checkout-skip-redirect="true"` in HTML to keep users on the same page.
  </Accordion>

  <Accordion title="Is the embedded checkout mobile-responsive?">
    Yes, the checkout automatically adapts to different screen sizes and devices.
  </Accordion>

  <Accordion title="Can I customize the checkout's appearance with CSS?">
    You can style the wrapper using the `.whop-checkout-wrapper iframe` CSS class, but security restrictions prevent you from modifying the checkout content.
  </Accordion>

  <Accordion title="Can I pre-fill customer information?">
    Yes, use `prefill={{ email: "customer@example.com" }}` in React or `data-whop-checkout-prefill-email="customer@example.com"` in HTML.
  </Accordion>
</AccordionGroup>
