> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Save payment methods

> Save customer payment methods to charge them later

Use saved payment methods to charge customers automatically for subscriptions, renewals, or usage-based billing. The customer saves their card once using a Whop hosted or embedded flow, and you can charge it any time after.

<Tip>
  Pair this guide with [webhooks](/developer/guides/webhooks): listen for `setup_intent.succeeded` to confirm the save, then for `payment.succeeded` / `payment.failed` to track future charges.
</Tip>

## Pick your save flow

Two paths, depending on whether the user is also paying right now.

|                           | Setup mode (collect-only)                                                                                                  | Save during checkout                                          |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| **Charges the user now**  | No                                                                                                                         | Yes                                                           |
| **Use case**              | Free trial signup, on-file card before usage-based billing                                                                 | Subscription that renews after the first paid checkout        |
| **API**                   | [Create checkout configuration](/api-reference/checkout-configurations/create-checkout-configuration) with `mode: "setup"` | Pass `setupFutureUsage: "off_session"` on `WhopCheckoutEmbed` |
| **Webhook to listen for** | `setup_intent.succeeded`                                                                                                   | `payment.succeeded` (the `payment_method` is on the result)   |

The rest of this page covers setup mode end-to-end, then shows how to charge a saved method later.

## Save a payment method

<Warning>
  `webhooks.unwrap` is not available in the current `@whop/sdk`. The webhook handler shown under "Handle completion" is kept for reference and will not run as written.
</Warning>

<Steps>
  <Step title="Create a checkout configuration in setup mode">
    [Create a checkout configuration](/api-reference/checkout-configurations/create-checkout-configuration) without a plan to collect payment details without charging. Add metadata to be able to link the member and payment method to a customer in your system.

    <CodeGroup>
      ```typescript TypeScript theme={null}
      const checkoutConfiguration = await whopsdk.checkoutConfigurations.create({
        account_id: "biz_XXXXXX",
        mode: "setup",
        redirect_url: "https://mywebsite.com/return_location",
        metadata: { customer_id: "my_internal_user_id" },
      });
      ```

      ```python Python theme={null}
      checkout_configuration = whopsdk.checkout_configurations.create(
          account_id="biz_XXXXXX",
          mode="setup",
          redirect_url="https://mywebsite.com/return_location",
          metadata={"customer_id": "my_internal_user_id"},
      )
      ```

      ```ruby Ruby theme={null}
      checkout_configuration = whopsdk.checkout_configurations.create(
        account_id: "biz_XXXXXX",
        mode: "setup",
        redirect_url: "https://mywebsite.com/return_location",
        metadata: { customer_id: "my_internal_user_id" },
      )
      ```
    </CodeGroup>
  </Step>

  <Step title="Direct the user to checkout">
    Use embedded checkout or redirect the user to save their payment method.

    <Tabs>
      <Tab title="Embedded">
        ```tsx theme={null}
        import { WhopCheckoutEmbed } from "@whop/checkout/react";

        export default function SavePayment() {
          return (
            <WhopCheckoutEmbed
              sessionId={checkoutConfiguration.id}
              returnUrl="https://yoursite.com/setup/complete"
              onComplete={(sessionId, setupIntentId, result) => {
                // payt_XXXXXXXXX — charge this any time
                saveForLater(result.payment_method_id);
              }}
            />
          );
        }
        ```

        The saved payment method is on the `onComplete` result, so a virtual
        terminal can charge it right away instead of waiting for a webhook. Whop
        only completes the checkout once the method is stored, so
        `payment_method_id` is always set here in setup mode.
      </Tab>

      <Tab title="Redirect">
        ```typescript theme={null}
        window.location.href = checkoutConfiguration.purchase_url;
        ```
      </Tab>
    </Tabs>
  </Step>

  <Step title="Handle completion">
    Listen for the `setup_intent.succeeded` webhook to get the payment method ID. The CheckoutConfiguration and its metadata will be included on the SetupIntent, which you can use to link the member and payment method to a customer in your system.

    <Note>
      Keep the webhook even if you read `payment_method_id` from `onComplete` — it's the only path that survives a closed tab, and the one that fires for the redirect flow.
    </Note>

    <Tip>
      The example uses `waitUntil` from `@vercel/functions` to run the handler after responding `200`. On other runtimes (Bun, Cloudflare Workers, Fastify, Hono) swap it for your framework's equivalent background-task primitive or a job queue. See the [webhooks guide](/developer/guides/webhooks) for Python and Ruby handler equivalents.
    </Tip>

    ```typescript theme={null}
    import { waitUntil } from "@vercel/functions";
    import type { NextRequest } from "next/server";
    import { whopsdk } from "@/lib/whop-sdk";

    export async function POST(request: NextRequest): Promise<Response> {
      const requestBodyText = await request.text();
      const headers = Object.fromEntries(request.headers);
      const webhookData = whopsdk.webhooks.unwrap(requestBodyText, { headers });

      if (webhookData.type === "setup_intent.succeeded") {
        waitUntil(handleSetupSucceeded(webhookData.data));
      }

      return new Response("OK", { status: 200 });
    }

    async function handleSetupSucceeded(setupIntent) {
      console.log("Payment method ID:", setupIntent.payment_method.id);
      console.log("Member ID:", setupIntent.member.id);
      console.log("Metadata:", setupIntent.metadata);
    }
    ```

    The payment method is now saved and authorized for this member.
  </Step>
</Steps>

## Charge a saved payment method

<Steps>
  <Step title="Get the payment method">
    [List saved payment methods](/api-reference/payment-methods/list-payment-methods) for a member or use the payment method ID from the setup intent in the previous step.

    <CodeGroup>
      ```typescript TypeScript theme={null}
      const payment_methods = await whopsdk.paymentMethods.list({
        member_id: "mber_XXXXXXXX",
      });

      const payment_method = payment_methods.data[0];
      ```

      ```python Python theme={null}
      payment_methods = whopsdk.payment_methods.list(member_id="mber_XXXXXXXX")
      payment_method = payment_methods.items[0]
      ```

      ```ruby Ruby theme={null}
      # list returns an Enumerable that pages for you; there is no `.data` on it
      payment_method = whopsdk.payment_methods.list(member_id: "mber_XXXXXXXX").first
      ```
    </CodeGroup>
  </Step>

  <Step title="Create an off-session payment">
    Charge the payment method without customer interaction. The [create payment endpoint](/api-reference/payments/create-payment) returns a payment object immediately and processes the charge asynchronously.

    <CodeGroup>
      ```typescript TypeScript theme={null}
      const payment = await whopsdk.payments.create({
        plan: { initial_price: 40.00, currency: "usd", plan_type: "one_time" },
        company_id: "biz_XXXXXXXX",
        member_id: "mber_XXXXXXXX",
        payment_method_id: "payt_XXXXXXXXX",
      });

      console.log("Payment:", payment.id);
      ```

      ```python Python theme={null}
      payment = whopsdk.payments.create(
          request={
              "plan": {"initial_price": 40.00, "currency": "usd", "plan_type": "one_time"},
              "company_id": "biz_XXXXXXXX",
              "member_id": "mber_XXXXXXXX",
              "payment_method_id": "payt_XXXXXXXXX",
          },
      )

      print("Payment:", payment.id)
      ```

      ```ruby Ruby theme={null}
      payment = whopsdk.payments.create(
        plan: { initial_price: 40.00, currency: "usd", plan_type: "one_time" },
        company_id: "biz_XXXXXXXX",
        member_id: "mber_XXXXXXXX",
        payment_method_id: "payt_XXXXXXXXX",
      )

      puts "Payment: #{payment.id}"
      ```
    </CodeGroup>

    <Tip>
      To apply a discount, pass the ID of one of your [promo codes](/manage-your-business/growth-marketing/promo-codes) as `promo_code_id` and Whop calculates the discounted price for you. The promo code must be active and valid for the plan, and the plan must belong to a product.
    </Tip>
  </Step>

  <Step title="Handle payment events">
    Listen for payment webhooks to track success or failure.

    ```typescript theme={null}
    if (webhookData.type === "payment.succeeded") {
      await fulfillOrder(webhookData.data);
    }

    if (webhookData.type === "payment.failed") {
      await notifyCustomer(webhookData.data.member.email, webhookData.data.failure_message);
    }
    ```
  </Step>
</Steps>

## Save during checkout

To save a payment method while processing a payment, add `setupFutureUsage: "off_session"` to the embedded checkout.

```tsx theme={null}
<WhopCheckoutEmbed
	planId="plan_XXXXXXXX"
	returnUrl="https://yoursite.com/checkout/complete"
	setupFutureUsage="off_session"
/>
```

Whop saves the payment method after a successful payment.

## Next steps

<CardGroup cols={2}>
  <Card title="Accept payments" href="/developer/guides/accept-payments">
    One-time and subscription checkouts to pair with your save flow.
  </Card>

  <Card title="Embedded checkout" href="/payments/checkout-embed">
    Drop checkout into your own site without redirects.
  </Card>

  <Card title="Listen to webhooks" href="/developer/guides/webhooks">
    Track `setup_intent.succeeded`, `payment.succeeded`, and `payment.failed`.
  </Card>

  <Card title="Billing portal" href="/payments-and-billing/manage-billing/billing-portal">
    Let customers manage and remove their saved payment methods.
  </Card>
</CardGroup>
