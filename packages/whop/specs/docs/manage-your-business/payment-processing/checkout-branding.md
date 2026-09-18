> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Checkout branding

> Customize the look and feel of your checkout pages with button colors, fonts, and border styles

Checkout branding lets you match your checkout pages to your brand. Choose a background color, button color, font, and border style at the account level, and optionally override them per checkout link or per checkout session via the API.

<Card title="Try the checkout playground" icon="sliders" href="https://whop.com/checkout-playground">
  Preview background color, button color, font, and border style on a live checkout before you apply them.
</Card>

## What you can customize

| Setting              | Description                                                                               |
| -------------------- | ----------------------------------------------------------------------------------------- |
| **Background color** | A hex color code applied to the order summary panel on the checkout page (e.g. `#F4F4F5`) |
| **Button color**     | A hex color code for the button color (e.g. `#FF5733`)                                    |
| **Font family**      | `system` (default), `roboto`, or `open_sans`                                              |
| **Border style**     | `rounded` (default), `pill`, or `rectangular`                                             |

## Global branding

Global branding applies to every checkout link for your business. Individual links inherit these settings unless they have their own overrides.

1. Go to **Dashboard** > **Settings** > **Checkout Branding**
2. Choose your **background color**, **button color**, **font**, and **border style**
3. Use the live preview to see how your checkout will look
4. Select **Save**

## Per-link overrides

Override the global branding on a specific checkout link. Useful when a particular product or campaign needs a different look.

1. Go to **Dashboard** > **Checkout Links**
2. Edit the checkout link you want to customize
3. In the **Checkout branding** section, adjust any setting
4. Save your changes

Any setting left on **Global default** inherits from account branding. Only the settings you explicitly change are overridden for that link.

<Note>
  Per-link branding takes precedence over global branding. If you update your
  global settings later, any link with its own overrides keeps its custom values
  for the overridden settings.
</Note>

## Customize individual checkout sessions

Set branding on individual checkout sessions using the `checkoutStyling` parameter when creating a checkout session. Session-level branding takes the highest precedence.

The resolution order is: **checkout session** > **checkout link (plan)** > **account defaults**.

```graphql theme={null}
mutation {
	createCheckoutSession(
		input: {
			planId: "plan_XXXXXXXXX"
			checkoutStyling: {
				backgroundColor: "#F4F4F5"
				buttonColor: "#FF5733"
				fontFamily: roboto
				borderStyle: pill
			}
		}
	) {
		id
		purchaseUrl
		checkoutStyling {
			backgroundColor
			buttonColor
			fontFamily
			borderStyle
		}
	}
}
```

### Parameters

| Field             | Type   | Description                                             |
| ----------------- | ------ | ------------------------------------------------------- |
| `backgroundColor` | String | A hex color code (e.g. `#F4F4F5`). `null` to inherit.   |
| `buttonColor`     | String | A hex color code (e.g. `#FF5733`). `null` to inherit.   |
| `fontFamily`      | enum   | `system`, `roboto`, or `open_sans`. `null` to inherit.  |
| `borderStyle`     | enum   | `rounded`, `pill`, or `rectangular`. `null` to inherit. |

Pass `null` for any field to inherit from the next level in the resolution chain.

## Add a known email address

Control the email field on checkout pages using URL parameters. This is useful when you already know a customer's email from a landing page or customer relationship management system. You can skip collecting the email address again.

| Parameter          | Effect                                              |
| ------------------ | --------------------------------------------------- |
| `email`            | Fills in the email field                            |
| `email.disabled=1` | Locks the email field so the customer can't edit it |
| `email.hidden=1`   | Hides the email field entirely                      |

### Examples

Prefill and lock:

```
https://whop.com/checkout/plan_XXXXXXXXX?email=customer@example.com&email.disabled=1
```

Prefill and hide:

```
https://whop.com/checkout/plan_XXXXXXXXX?email=customer@example.com&email.hidden=1
```

<Note>
  Provide the `email` parameter to use `email.hidden` or `email.disabled`. If you enable
  both options, checkout hides the field.
</Note>

These parameters also work with [embedded checkout](/payments/checkout-embed). In the embedded checkout, use the `prefill`, `disableEmail`, and `hideEmail` props instead.
