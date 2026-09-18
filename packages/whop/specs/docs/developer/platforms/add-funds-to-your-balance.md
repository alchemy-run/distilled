> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Add funds to your balance

> Top up your platform balance to pay out connected accounts

<Steps>
  <Step title="Create your first top up in the dashboard">
    Before using the API, you need to create a top up from the [Dashboard](https://whop.com/dashboard/balance/). This saves a payment method that you can reuse programmatically.
  </Step>

  <Step title="Get payment methods">
    List saved payment methods for your account:

    <CodeGroup>
      ```typescript TypeScript theme={null}
      const paymentMethods = await client.paymentMethods.list({
        company_id: "biz_xxxxxxxxxxxxx",
      });

      const paymentMethod = paymentMethods.data[0];
      ```

      ```python Python theme={null}
      payment_methods = client.payment_methods.list(
          company_id="biz_xxxxxxxxxxxxx",
      )

      payment_method = payment_methods.items[0]
      ```
    </CodeGroup>
  </Step>

  <Step title="Create a top up">
    <CodeGroup>
      ```typescript TypeScript theme={null}
      const topup = await client.topups.create({
        company_id: "biz_xxxxxxxxxxxxx",
        amount: 1000.0,
        currency: "usd",
        payment_method_id: paymentMethod.id,
      });

      console.log(topup.id);
      ```

      ```python Python theme={null}
      topup = client.topups.create(
          company_id="biz_xxxxxxxxxxxxx",
          amount=1000.0,
          currency="usd",
          payment_method_id=payment_method.id,
      )

      print(topup.id)
      ```
    </CodeGroup>

    In this example:

    * `company_id` is your platform's account ID
    * `amount` is the amount to add to your balance
    * `currency` is the currency of the top up
    * `payment_method_id` is the saved payment method to charge
  </Step>

  <Step title="Handle payment events">
    Listen for payment webhooks to confirm the top up was successful:

    ```typescript theme={null}
    if (webhookData.type === "payment.succeeded") {
      const payment = webhookData.data;
      console.log("Top up successful:", payment.id);
    }

    if (webhookData.type === "payment.failed") {
      const payment = webhookData.data;
      console.log("Top up failed:", payment.failure_message);
    }
    ```
  </Step>
</Steps>

## Related resources

<CardGroup cols={2}>
  <Card title="Collect payments for connected accounts" icon="arrow-right-arrow-left" href="/developer/platforms/collect-payments-for-connected-accounts">
    Transfer funds to connected accounts
  </Card>

  <Card title="Render payout portal" icon="browser" href="/developer/platforms/render-payout-portal">
    Let users withdraw their funds
  </Card>
</CardGroup>
