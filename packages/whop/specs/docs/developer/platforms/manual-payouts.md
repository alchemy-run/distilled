> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Manual payouts to connected accounts

> Onboard connected accounts and programmatically pay them out

Send payouts directly to your connected accounts from your platform balance. Connected accounts must complete identity verification and add a payout method before they can receive funds.

<Steps>
  <Step title="Complete KYC verification">
    Before a user can receive payouts, they must complete identity verification (KYC). Use the hosted account onboarding flow to guide users through this process:

    <CodeGroup>
      ```typescript TypeScript theme={null}
      import { WhopClient } from "@whop/sdk";

      const client = new WhopClient({
        token: "Account API Key",
      });

      const accountLink = await client.accountLinks.create({
        company_id: "biz_xxxxxxxxxxxxx",
        use_case: "account_onboarding",
        return_url: "https://yourapp.com/onboarding/complete",
        refresh_url: "https://yourapp.com/onboarding/refresh",
      });

      // Redirect the user to complete KYC
      console.log(accountLink.url);
      ```

      ```python Python theme={null}
      from whop_sdk import Whop

      client = Whop(
          token="Account API Key",
      )

      account_link = client.account_links.create(
          company_id="biz_xxxxxxxxxxxxx",
          use_case="account_onboarding",
          return_url="https://yourapp.com/onboarding/complete",
          refresh_url="https://yourapp.com/onboarding/refresh",
      )

      # Redirect the user to complete KYC
      print(account_link.url)
      ```
    </CodeGroup>

    Redirect the user to the `url` returned in the response. After completing verification, they will be redirected back to your `return_url`.
  </Step>

  <Step title="Add a payout method">
    Before creating a payout, the account needs a payout method. Use the embedded component to let users add a payout method:

    <CodeGroup>
      ```tsx React theme={null}
      "use client";

      import {
        Elements,
        PayoutsSession,
        PayoutMethodElement,
      } from "@whop/embedded-components-react-js";
      import { loadWhopElements } from "@whop/embedded-components-vanilla-js";

      const elements = loadWhopElements();

      export function AddPayoutMethod({ accountId }: { accountId: string }) {
        return (
          <Elements elements={elements}>
            <PayoutsSession
              token={() =>
                fetch(`/api/token?accountId=${accountId}`)
                  .then((res) => res.json())
                  .then((data) => data.token)
              }
              companyId={accountId}
              redirectUrl="https://yourapp.com/verification-complete"
            >
              <PayoutMethodElement fallback={<div>Loading...</div>} />
            </PayoutsSession>
          </Elements>
        );
      }
      ```
    </CodeGroup>
  </Step>

  <Step title="Get the default payout method">
    List the connected account's payout methods and find the one with `is_default: true`:

    <CodeGroup>
      ```typescript TypeScript theme={null}
      import { WhopClient } from "@whop/sdk";

      const client = new WhopClient({
        token: "Account API Key",
      });

      const payoutMethods = await client.payoutMethods.listPayoutMethod({
        company_id: "biz_xxxxxxxxxxxxx",
      });

      const defaultMethod = payoutMethods.data.find((method) => method.is_default);
      console.log(defaultMethod?.id);
      ```

      ```python Python theme={null}
      from whop_sdk import Whop

      client = Whop(
          token="Account API Key",
      )

      payout_methods = client.payout_methods.list_payout_method(
          company_id="biz_xxxxxxxxxxxxx",
      )

      default_method = next((m for m in payout_methods.items if m.is_default), None)
      print(default_method.id)
      ```
    </CodeGroup>
  </Step>

  <Step title="Create a payout">
    <CodeGroup>
      ```typescript TypeScript theme={null}
      import { WhopClient } from "@whop/sdk";

      const client = new WhopClient({
        token: "Account API Key",
      });

      const payout = await client.payouts.create({
        account_id: "biz_xxxxxxxxxxxxx",
        amount: 100.0,
        currency: "usd",
        payout_method_id: "potk_xxxxxxxxxxxxx",
      });

      console.log(payout.id);
      ```

      ```python Python theme={null}
      from whop_sdk import Whop

      client = Whop(
          token="Account API Key",
      )

      payout = client.payouts.create(
          request={
              "account_id": "biz_xxxxxxxxxxxxx",
              "amount": 100.0,
              "currency": "usd",
              "payout_method_id": "potk_xxxxxxxxxxxxx",
          },
      )

      print(payout.id)
      ```
    </CodeGroup>

    In this example:

    * `account_id` is the connected account to pay out
    * `amount` is the payout amount (100.00 USD) - fees will be deducted from this amount
    * `currency` is the ISO currency code
    * `payout_method_id` is the ID of the payout method to use (from step 3)

    The request will return an error if the amount exceeds the available balance.

    ### Cover payout fees for your connected accounts

    By default, payout fees are deducted from the connected account's balance. You can choose to cover these fees from your platform balance instead by setting `platform_covers_fees` to `true`:

    <CodeGroup>
      ```typescript TypeScript theme={null}
      const payout = await client.payouts.create({
        account_id: "biz_xxxxxxxxxxxxx",
        amount: 100.0,
        currency: "usd",
        payout_method_id: "potk_xxxxxxxxxxxxx",
        platform_covers_fees: true,
      });
      ```

      ```python Python theme={null}
      payout = client.payouts.create(
          request={
              "account_id": "biz_xxxxxxxxxxxxx",
              "amount": 100.0,
              "currency": "usd",
              "payout_method_id": "potk_xxxxxxxxxxxxx",
              "platform_covers_fees": True,
          },
      )
      ```
    </CodeGroup>

    When `platform_covers_fees` is `true`, the connected account receives the full payout amount and the fee is debited from your platform's balance instead. This requires your platform's fee coverage policy to cover the payout method, or an API key authorized to manage your connected accounts' fees.
  </Step>
</Steps>

## API reference

<Card title="Create Payout API" icon="code" href="/api-reference/beta/payouts/create-payout">
  See the full API reference for creating payouts
</Card>

## Related resources

<CardGroup cols={2}>
  <Card title="Pay connected accounts" icon="arrow-right-arrow-left" href="/developer/platforms/collect-payments-for-connected-accounts">
    Transfer funds to your connected accounts
  </Card>

  <Card title="Render payout portal" icon="money-bill-transfer" href="/developer/platforms/render-payout-portal">
    Let your users withdraw their funds
  </Card>
</CardGroup>
