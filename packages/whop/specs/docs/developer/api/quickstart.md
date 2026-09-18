> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Quickstart

> Create your Whop account, find the dashboard, get an API key, make your first SDK call, and test a webhook.

Use this page the first time you connect Whop to your app or backend. You'll sign up, open the dashboard, create an API key, install the SDK, make your first call, and watch a webhook land on your server.

<Note>
  Keep `WHOP_API_KEY` on your server. Don't put Account API keys in browser code, mobile apps, or public repositories.
</Note>

## Set up your account

<Steps>
  <Step title="Sign up for Whop">
    Go to [whop.com/start](https://whop.com/start) and create your Whop account. The onboarding flow creates your first business, which is the Account that owns API keys, products, webhooks, and payments.
  </Step>

  <Step title="Open the dashboard">
    After onboarding, open [whop.com/dashboard](https://whop.com/dashboard). If you have more than one business, choose the one you want to build against from the business switcher.
  </Step>

  <Step title="Open Developer">
    Select **Dashboard ↗** in the top-right corner of these docs to open your developer dashboard directly.
  </Step>
</Steps>

## Create an API key

For the quickest path, create an Account API key. Use this when your server acts on behalf of your own business.

When building a Whop app, learn when to use [app API keys](/developer/api/getting-started#app-api-keys) and [OAuth tokens](/developer/guides/oauth).

<Steps>
  <Step title="Create an Account API key">
    In **Account API Keys**, select **Create**. Name the key something you can recognize later, like `Local development` or `Production payments`.
  </Step>

  <Step title="Choose permissions">
    For the first SDK call below, use the Admin role or grant the read permissions listed on [Retrieve Requesting Account](/api-reference/beta/accounts/retrieve-requesting-account). For production, switch to a narrower custom permission set once you know exactly which endpoints you use.
  </Step>

  <Step title="Copy the key">
    Copy the key when Whop shows it. Store it in your local `.env` file as `WHOP_API_KEY`.

    <Frame>
      <img src="https://mintcdn.com/whop/xuW6TKFlagvnbmV0/images/developer-api-key-field.png?fit=max&auto=format&n=xuW6TKFlagvnbmV0&q=85&s=699bf36af18f7a12dfd855eb0684b38e" alt="Whop dashboard Account API Keys section showing a key name, masked value, and Create button" width="3100" height="450" data-path="images/developer-api-key-field.png" />
    </Frame>
  </Step>
</Steps>

## Install the SDK

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

Add your credentials to `.env`:

```bash theme={null}
WHOP_API_KEY=whop_xxxxxxxxxxxxxxxxx
```

## Make your first call

Retrieve the account tied to your API key. This confirms your key and permissions work correctly and prints your account ID, which starts with `biz_`.

<CodeGroup>
  ```typescript TypeScript theme={null}
  import { WhopClient } from "@whop/sdk";

  const apiKey = process.env.WHOP_API_KEY;

  if (!apiKey) {
    throw new Error("Set WHOP_API_KEY");
  }

  const client = new WhopClient({
    token: apiKey,
  });

  const account = await client.accounts.me();

  console.log(account.id);
  ```

  ```python Python theme={null}
  import os
  from whop_sdk import Whop

  client = Whop(
      token=os.environ["WHOP_API_KEY"],
  )

  account = client.accounts.me()

  print(account.id)
  ```

  ```ruby Ruby theme={null}
  require "whop_sdk"

  client = Whop_sdk::Client.new(
    token: ENV.fetch("WHOP_API_KEY"),
  )

  account = client.accounts.me

  puts account.id
  ```
</CodeGroup>

## See a webhook

Whop sends a webhook to your server when something happens in your business, like `payment.succeeded` or `membership.activated`.

<Steps>
  <Step title="Create a local webhook endpoint">
    Add a `POST` endpoint in your app and expose it with ngrok, Cloudflare Tunnel, or another HTTPS tunnel while developing.
  </Step>

  <Step title="Create the webhook in the dashboard">
    Open **Developer > Webhooks**, then select **Create webhook**.

    <Frame>
      <img src="https://mintcdn.com/whop/Ck4TMcyCw4wzCcNW/images/app-webhooks.png?fit=max&auto=format&n=Ck4TMcyCw4wzCcNW&q=85&s=770322f79278e3ca244a4269a2cbb45f" alt="Whop Developer Webhooks page with a Create webhook button" width="2730" height="952" data-path="images/app-webhooks.png" />
    </Frame>
  </Step>

  <Step title="Enter your URL and events">
    Paste your HTTPS endpoint, keep the API version on `v1`, and select the events you want to receive.

    <Frame>
      <img src="https://mintcdn.com/whop/RLIxcN4GVU-CLB5B/images/create-webhook-url.png?fit=max&auto=format&n=RLIxcN4GVU-CLB5B&q=85&s=4016395a2563955dfb323d797b17409e" alt="Create webhook form showing the endpoint URL and API version fields" width="2048" height="1252" data-path="images/create-webhook-url.png" />
    </Frame>

    <Frame>
      <img src="https://mintcdn.com/whop/RLIxcN4GVU-CLB5B/images/create-webhook-select-events.png?fit=max&auto=format&n=RLIxcN4GVU-CLB5B&q=85&s=079887392e21e4680a82415244aeaea4" alt="Create webhook form showing the payment_succeeded event selected in the events list" width="2048" height="1252" data-path="images/create-webhook-select-events.png" />
    </Frame>
  </Step>

  <Step title="Send a test event">
    Use the webhook row actions to send a test event. When your server logs the request, your setup is complete.

    <Frame>
      <img src="https://mintcdn.com/whop/RLIxcN4GVU-CLB5B/images/test-webhook-send-event.png?fit=max&auto=format&n=RLIxcN4GVU-CLB5B&q=85&s=6f023e619faa1a14557787c04f0091d8" alt="Whop dashboard test webhook menu showing Send event" width="697" height="353" data-path="images/test-webhook-send-event.png" />
    </Frame>
  </Step>
</Steps>

## Next steps

<CardGroup cols={2}>
  <Card title="Accept payments" href="/developer/guides/accept-payments">
    Create checkout links or embedded checkout flows.
  </Card>

  <Card title="Validate webhooks" href="/developer/guides/webhooks">
    Verify signatures before handling payment events.
  </Card>

  <Card title="API walkthrough" href="/developer/api/getting-started">
    Explore endpoints, SDK examples, and required permissions.
  </Card>
</CardGroup>
