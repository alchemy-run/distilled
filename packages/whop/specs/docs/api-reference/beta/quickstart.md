> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Quickstart

> Make your first call in about a minute, then create a checkout link that takes real payments.

## Try it

<Steps>
  <Step title="Grab an API key">
    <Card title="Create an API key" icon="key" horizontal arrow href="https://whop.com/dashboard/developer">
      Opens your dashboard. Under **Account API Keys**, click **Create** and copy the key.
    </Card>

    The Admin role is fine for poking around. Narrow it down before production.
  </Step>

  <Step title="Call the API">
    <CodeGroup>
      ```bash Request theme={null}
      curl https://api.whop.com/api/v1/accounts/me \
        -H "Authorization: Bearer YOUR_API_KEY"
      ```

      ```json Response theme={null}
      {
      	"id": "biz_XXXXXXXX",
      	"title": "Acme Studio",
      	"route": "acme-studio",
      	"status": "approved"
      }
      ```
    </CodeGroup>

    <Check>
      That's your account. The key works.
    </Check>

    Not a terminal person? Every endpoint page has a playground: open [Retrieve Requesting Account](/api-reference/beta/accounts/retrieve-requesting-account), paste your key, hit **Send**.
  </Step>
</Steps>

## Build it

Install the SDK, check your key, then create a checkout link.

<Steps>
  <Step title="Install the SDK">
    <CodeGroup>
      ```bash TypeScript theme={null}
      pnpm add @whop/sdk
      ```

      ```bash Python theme={null}
      pip install whop-sdk
      ```

      ```bash Ruby theme={null}
      gem install whop_sdk
      ```
    </CodeGroup>

    Store your key as `WHOP_API_KEY` on your server. Don't put it in browser code, mobile apps, or public repos.

    ```bash theme={null}
    WHOP_API_KEY=whop_xxxxxxxxxxxxxxxxx
    ```
  </Step>

  <Step title="Verify your key">
    If this prints an ID starting with `biz_`, you're set.

    <CodeGroup>
      ```typescript TypeScript theme={null}
      import { WhopClient } from "@whop/sdk";

      const client = new WhopClient({ token: process.env.WHOP_API_KEY });

      const account = await client.accounts.me();

      console.log(account.id);
      ```

      ```python Python theme={null}
      import os
      from whop_sdk import Whop

      client = Whop(token=os.environ["WHOP_API_KEY"])

      account = client.accounts.me()

      print(account.id)
      ```

      ```ruby Ruby theme={null}
      require "whop_sdk"

      client = Whop_sdk::Client.new(token: ENV.fetch("WHOP_API_KEY"))

      account = client.accounts.me

      puts account.id
      ```
    </CodeGroup>
  </Step>

  <Step title="Create a checkout link">
    One call creates a plan and returns a `purchase_url`, a live checkout page anyone can pay you at. Open it in your browser.

    <CodeGroup>
      ```typescript TypeScript theme={null}
      const checkout = await client.checkoutConfigurations.create({
      	plan: {
      		title: "Starter",
      		plan_type: "one_time",
      		initial_price: 10.0,
      		currency: "usd",
      	},
      });

      console.log(checkout.purchase_url);
      ```

      ```python Python theme={null}
      checkout = client.checkout_configurations.create(
          plan={
              "title": "Starter",
              "plan_type": "one_time",
              "initial_price": 10.0,
              "currency": "usd",
          },
      )

      print(checkout.purchase_url)
      ```

      ```ruby Ruby theme={null}
      checkout = client.checkout_configurations.create(
        plan: {
          title: "Starter",
          plan_type: "one_time",
          initial_price: 10.0,
          currency: "usd",
        },
      )

      puts checkout.purchase_url
      ```
    </CodeGroup>

    The link is real: if someone checks out, they get charged and your balance goes up. Already have a plan? Pass `plan_id` instead of the inline `plan` (you can't send both). [Create Checkout Configuration](/api-reference/beta/checkout-configurations/create-a-checkout-configuration) has every option, including recurring pricing, trials, and redirect URLs.
  </Step>
</Steps>

## Pin your version

Whop versions the API by date. SDKs handle versioning for you. If you call the API directly, send the header so future changes don't break your integration:

```bash theme={null}
curl https://api.whop.com/api/v1/accounts/me \
  -H "Authorization: Bearer $WHOP_API_KEY" \
  -H "Api-Version-Date: 2026-07-01"
```

See [Versioning](/developer/api/versioning) for how dated versions work.

## Next steps

<CardGroup cols={2}>
  <Card title="Explore every resource" icon="map" href="/api-reference/beta/overview">
    The full map: commerce, money movement, accounts, and ads.
  </Card>

  <Card title="Send a payout" icon="money-bill-transfer" href="/api-reference/beta/payouts/payout">
    Pay out your balance to a bank or wallet.
  </Card>

  <Card title="Watch money move" icon="wave-pulse" href="/api-reference/beta/ledgers/ledger-activity">
    The ledger activity feed behind every balance change.
  </Card>

  <Card title="Handle webhooks" icon="webhook" href="/developer/guides/webhooks">
    React to payments and memberships as they happen.
  </Card>
</CardGroup>
