> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Accept payments

> Accept one-time and recurring payments across 195 countries with 100+ payment methods

export const ExamplesLink = ({href}) => <a href={href} className="examples-link">
		<div className="examples-link__row">
			<span className="examples-link__title">✨ Build this with AI</span>
			<span className="examples-link__jump">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
					<path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
					<polyline points="15 3 21 3 21 9" />
					<line x1="10" y1="14" x2="21" y2="3" />
				</svg>
			</span>
		</div>
		<p className="examples-link__description">
			Copy and paste our templates using your favorite editor
		</p>
		<div className="examples-link__icons">
			<span className="examples-link__icon" title="Claude">
				<svg viewBox="0 0 24 24">
					<path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z" fill="#D97757" fillRule="nonzero" />
				</svg>
			</span>
			<span className="examples-link__icon" title="Cursor">
				<svg viewBox="85 69 343 354" fill="currentColor">
					<path d="M255.428 423l148.991-83.5L255.428 256l-148.99 83.5 148.99 83.5z" fillOpacity=".7" />
					<path d="M404.419 339.5v-167L255.428 89v167l148.991 83.5z" fillOpacity=".5" />
					<path d="M255.428 89l-148.99 83.5v167l148.99-83.5V89z" fillOpacity=".6" />
					<path d="M404.419 172.5L255.428 423V256l148.991-83.5z" fillOpacity=".9" />
					<path d="M404.419 172.5L255.428 256l-148.99-83.5h297.981z" />
				</svg>
			</span>
			<span className="examples-link__icon" title="Codex">
				<svg viewBox="0 0 24 24" fill="#10a37f">
					<path d="M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z" />
				</svg>
			</span>
			<span className="examples-link__icon" title="Lovable">
				<svg viewBox="0 0 24 24">
					<path clipRule="evenodd" d="M7.082 0c3.91 0 7.081 3.179 7.081 7.1v2.7h2.357c3.91 0 7.082 3.178 7.082 7.1 0 3.923-3.17 7.1-7.082 7.1H0V7.1C0 3.18 3.17 0 7.082 0z" fill="url(#lovable-grad)" fillRule="evenodd" />
					<defs>
						<radialGradient cx="0" cy="0" gradientTransform="matrix(-1 22.5 -30.454 -1.354 14 3)" gradientUnits="userSpaceOnUse" id="lovable-grad" r="1">
							<stop offset=".25" stopColor="#FE7B02" />
							<stop offset=".433" stopColor="#FE4230" />
							<stop offset=".548" stopColor="#FE529A" />
							<stop offset=".654" stopColor="#DD67EE" />
							<stop offset=".95" stopColor="#4B73FF" />
						</radialGradient>
					</defs>
				</svg>
			</span>
			<span className="examples-link__more">+ more</span>
		</div>
	</a>;

<ExamplesLink href="https://whop.com/network/examples?filter=checkouts" />

<iframe src="https://www.youtube.com/embed/AJeghHHvKfw?rel=0" title="Accept payments directly in your web app with Whop" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style={{ aspectRatio: "16 / 9", width: "100%", border: 0 }} />

Accept one-time and recurring payments using checkout links or an embedded checkout component. Whop supports **100+ payment methods** across **195 countries**, and the right ones appear automatically based on the buyer's location. [See all payment methods](/payments-and-billing/local-payment-methods).

<Tip>
  For an iOS app, the [Whop iOS Checkout SDK](/developer/guides/ios/overview) handles checkout natively with lower fees (2.7% + \$0.30 vs Apple's 15–30%). The SDK uses a scoped `iap:read` API key that's [safe to embed in your app](/developer/guides/ios/installation#step-3-create-an-api-key).
</Tip>

## Choose your integration

|                          | Checkout link              | Embedded checkout          |
| ------------------------ | -------------------------- | -------------------------- |
| **Effort**               | Low                        | Medium                     |
| **Customization**        | Limited                    | Full control               |
| **Best for**             | Sharing links, quick setup | Custom UX, dynamic pricing |
| **Server code required** | No (Dashboard) / Yes (API) | Yes                        |

## Option 1: Create a checkout link

Checkout links are the simplest way to accept payments. Create a plan to get a shareable checkout URL.

<Tabs>
  <Tab title="Dashboard">
    1. Go to your [Dashboard](https://whop.com/dashboard/links/checkout) > **Checkout links**
       2\. Select **+ Create checkout link**
    2. Select a product and configure your pricing (free, one-time, or recurring)
    3. Select **Create checkout link**

    The generated link can be shared directly with customers or embedded on your website.
  </Tab>

  <Tab title="API">
    Create a plan via the API to get a `purchase_url`:

    <CodeGroup>
      ```typescript TypeScript theme={null}
      import { WhopClient } from "@whop/sdk";

      const client = new WhopClient({
        token: "Account API Key",
      });

      // account_id: find in Dashboard > Settings
      // product_id: find in Dashboard > Products
      const plan = await client.plans.create({
        account_id: "biz_xxxxxxxxxxxxx",
        product_id: "prod_xxxxxxxxxxxxx",
        initial_price: 10.0,
        plan_type: "one_time",
      });

      console.log(plan.purchase_url);
      ```

      ```python Python theme={null}
      from whop_sdk import Whop

      client = Whop(
          token="Account API Key",
      )

      # account_id: find in Dashboard > Settings
      # product_id: find in Dashboard > Products
      plan = client.plans.create(
          account_id="biz_xxxxxxxxxxxxx",
          product_id="prod_xxxxxxxxxxxxx",
          initial_price=10.0,
          plan_type="one_time",
      )

      print(plan.purchase_url)
      ```
    </CodeGroup>

    Redirect customers to the `purchase_url` to complete payment on a Whop-hosted checkout page.
  </Tab>
</Tabs>

## Option 2: Embedded checkout

For a custom checkout experience, use the embedded checkout component with a checkout configuration.

### Step 1: Create a checkout configuration

Create a checkout configuration on your server with an inline plan:

<CodeGroup>
  ```typescript TypeScript theme={null}
  import { WhopClient } from "@whop/sdk";

  const client = new WhopClient({
    token: "Account API Key",
  });

  const checkoutConfig = await client.checkoutConfigurations.create({
    account_id: "biz_xxxxxxxxxxxxx",
    plan: {
      initial_price: 10.0,
      plan_type: "one_time",
    },
    metadata: {
      order_id: "order_12345",
    },
  });

  console.log(checkoutConfig.id); // ch_xxxxxxxxxxxxx (session ID)
  console.log(checkoutConfig.plan?.id); // plan_xxxxxxxxxxxxx (plan ID)
  ```

  ```python Python theme={null}
  from whop_sdk import Whop

  client = Whop(
      token="Account API Key",
  )

  checkout_config = client.checkout_configurations.create(
      account_id="biz_xxxxxxxxxxxxx",
      plan={
          "initial_price": 10.0,
          "plan_type": "one_time",
      },
      metadata={
          "order_id": "order_12345",
      },
  )

  print(checkout_config.id)  # ch_xxxxxxxxxxxxx (session ID)
  print(checkout_config.plan.id)  # plan_xxxxxxxxxxxxx (plan ID)
  ```
</CodeGroup>

In this example:

* `account_id` is your account ID
* `plan.initial_price` is the payment amount
* `plan.plan_type` is either `one_time` or `renewal` for subscriptions
* `metadata` stores custom data for your reference

### Step 2: Render the checkout

<Tabs>
  <Tab title="React">
    ```tsx theme={null}
    import { WhopCheckoutEmbed } from "@whop/checkout/react";

    export function Checkout({ sessionId }: { sessionId: string }) {
      return (
        <WhopCheckoutEmbed
          sessionId={sessionId}
          returnUrl="https://yoursite.com/checkout/complete"
          onComplete={(paymentId) => {
            console.log("Payment complete:", paymentId);
          }}
        />
      );
    }
    ```

    Pass the `checkoutConfig.id` from step 1 as the `sessionId` prop.
  </Tab>

  <Tab title="HTML / JavaScript">
    Add the loader script to your page:

    ```html theme={null}
    <script async defer src="https://js.whop.com/static/checkout/loader.js"></script>
    ```

    Then add a checkout element with your plan ID and the `checkoutConfig.id` from step 1:

    ```html theme={null}
    <div
      data-whop-checkout-plan-id="plan_XXXXXXXXX"
      data-whop-checkout-session="ch_XXXXXXXXX"
      data-whop-checkout-return-url="https://yoursite.com/checkout/complete"
    ></div>
    ```
  </Tab>
</Tabs>

You must provide `returnUrl` to handle redirects from external payment providers. After a redirect, check the `status` query parameter:

* **success**: The payment succeeded. Use the receipt information to render a success page.
* **error**: The payment failed or the customer canceled it. Remount the checkout so your customer can try again.

### Step 3: Customize the checkout

You can customize the checkout appearance and behavior:

| Prop (React)               | Attribute (HTML)                        | Description                                  |
| -------------------------- | --------------------------------------- | -------------------------------------------- |
| `theme`                    | `data-whop-checkout-theme`              | `"light"`, `"dark"`, or `"system"` (default) |
| `hidePrice`                | `data-whop-checkout-hide-price`         | Hide the price display                       |
| `themeOptions.accentColor` | `data-whop-checkout-theme-accent-color` | Custom accent color                          |

For the full list of customization options, see the [Embedded checkout reference](/payments/checkout-embed).

## Handle payment webhooks

<Warning>
  `webhooks.unwrap` is not available in the current `@whop/sdk`. The handler below is kept for reference and will not run as written.
</Warning>

Listen for webhooks to fulfill orders on your server. This example uses Next.js on Vercel, but the `whopsdk.webhooks.unwrap` pattern works with any framework:

```typescript theme={null}
import { waitUntil } from "@vercel/functions";
import type { Whop } from "@whop/sdk";
import type { NextRequest } from "next/server";
import { whopsdk } from "@/lib/whop-sdk"; // your Whop SDK instance

export async function POST(request: NextRequest): Promise<Response> {
  const requestBodyText = await request.text();
  const headers = Object.fromEntries(request.headers);
  const webhookData = whopsdk.webhooks.unwrap(requestBodyText, { headers });

  if (webhookData.type === "payment.succeeded") {
    waitUntil(handlePaymentSucceeded(webhookData.data));
  }

  return new Response("OK", { status: 200 });
}

async function handlePaymentSucceeded(payment: Whop.Payment) {
  console.log("Payment succeeded:", payment.id);
}
```

Other useful webhook events: `membership.activated` (access granted), `payment.failed` (payment failed).

## See it work end-to-end

The fastest way to confirm everything's wired up is to run a test charge in sandbox and watch the result flow back to your server and dashboard.

### 1. Trigger a test charge

Switch your SDK and checkout to the sandbox environment, then run a checkout with a test card. The [sandbox guide](/developer/guides/sandbox) covers the URL changes and lists test cards for every payment outcome (succeeded, failed, requires action).

### 2. Inspect the webhook payload

When the test charge settles, your webhook handler receives a `payment.succeeded` event shaped like this:

```json theme={null}
{
  "id": "msg_xxxxxxxxxxxxx",
  "api_version": "v1",
  "api_version_date": "2026-08-14",
  "type": "payment.succeeded",
  "timestamp": "2026-05-12T18:42:11.041Z",
  "account_id": "biz_xxxxxxxxxxxxx",
  "data": {
    "id": "pay_xxxxxxxxxxxxx",
    "status": "succeeded",
    "amount_after_fees": 9.71,
    "currency": "usd",
    "paid_at": "2026-05-12T18:42:10Z",
    "payment_method_type": "card",
    "card_brand": "visa",
    "card_last4": "4242",
    "member": { "id": "mem_xxxxxxxxxxxxx" },
    "metadata": {
      "order_id": "order_12345"
    }
  }
}
```

The `metadata.order_id` you attached when creating the checkout configuration flows straight through to the webhook handler. That's the hook you use to map the payment back to your own order record.

### 3. Verify in the sandbox dashboard

Open the sandbox dashboard at `https://sandbox.whop.com/dashboard/<your_account_id>/payments`. The test charge appears in this payments list with its status and amount. Use your server logs to confirm the `metadata.order_id` you set maps back to the same order.

<img src="https://mintcdn.com/whop/jU1qiugUa1yCR1I4/images/sandbox-payments-dashboard.png?fit=max&auto=format&n=jU1qiugUa1yCR1I4&q=85&s=0dac30d4936ad5a412f1ceb5d54d056b" alt="Sandbox dashboard Payments page showing the payments list" width="1600" height="255" data-path="images/sandbox-payments-dashboard.png" />

If you see both the dashboard row and the `payment.succeeded` event on your server, the integration is live. Switch your SDK and webhook URL to production when ready.

## Next steps

<CardGroup cols={2}>
  <Card title="Webhooks" icon="webhook" href="/developer/guides/webhooks">
    Handle payment events in real-time
  </Card>

  <Card title="Save payment methods" icon="credit-card" href="/developer/guides/save-payment-methods">
    Save and charge payment methods
  </Card>

  <Card title="iOS payments" icon="apple" href="/developer/guides/ios/overview">
    Accept payments in your iOS app with lower fees
  </Card>

  <Card title="Payment methods" icon="globe" href="/payments-and-billing/local-payment-methods">
    100+ payment methods across 195 countries
  </Card>
</CardGroup>
