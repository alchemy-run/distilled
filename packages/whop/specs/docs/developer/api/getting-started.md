> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Getting started

> Start programmatically accepting payments, paying other people, and building businesses.

# Use cases

1. Create a checkout configuration
2. Onboard sub-merchants
3. Verify your platform account
4. Programmatically pay out users
5. Generate payout onboarding links for your sub-merchants

<CodeGroup>
  ```bash Typescript theme={null}
  pnpm install @whop/sdk
  ```

  ```bash Python theme={null}
  pip install whop-sdk
  ```

  ```bash Ruby theme={null}
  gem install whop_sdk
  ```
</CodeGroup>

Before you begin, follow the [Quickstart](/developer/api/quickstart#create-an-api-key) to create an API key.

<Card title="Troubleshoot API requests" icon="bug" href="/developer/troubleshooting#api-authentication">
  Debug authentication failures, permission errors, retryable responses, and sandbox/production mismatches.
</Card>

<CodeGroup>
  ```python Python theme={null}
  from whop_sdk import Whop, BadRequestError
  import random

  client = Whop(
      token="YOUR_API_KEY",
  )

  your_account_id = "YOUR_ACCOUNT_ID"

  # 1. Create a checkout configuration
  checkout = client.checkout_configurations.create(
      currency="usd",
      plan={
          "initial_price": 10.0,
          "plan_type": "one_time",
          "account_id": your_account_id,
          "currency": "usd",
          "payment_method_configuration": {
              "enabled": [
                  "crypto", # low fees
                  "us_bank_transfer", # very low fees
                  "apple_pay", # standard cc rates
              ],
              "disabled": [
                  "acss_debit",
                  "affirm",
                  "afterpay_clearpay",
                  "alipay",
                  "alma",
                  "amazon_pay",
              ],
          },
      },
      metadata={
          "order_id": "order_12345",
      },
  )

  checkout_link = f"https://whop.com/checkout/{checkout.plan.id}"
  print(f"\n✅ Checkout created → {checkout_link}\n   (redirect customers here to pay or embed it)")
  input("\nPress Enter to continue...")

  # 2. Onboard sub-merchants to pay them out
  sub_merchant = client.companies.create(
      email="merchant@example.com",
      parent_company_id=your_account_id,
      title="Acme Merchant Store #" + str(random.randint(1, 200)),
      # logo={"id": "file_xxxxxxxxxxxxx"},
      metadata={
          "internal_user_id": "user_12345",
          "seller_tier": "gold",
      },
  )
  print(f"\n✅ Sub-merchant onboarded → {sub_merchant.id}")

  # 2.5 Verify your platform account (skip if already done)
  # Your account must be verified to send transfers.
  print(f"\n🔐 Verify your platform account:\n   https://whop.com/verify-identity/{your_account_id}/")
  input("\nPress Enter when done...")

  # 3. Programmatically pay out users
  while True:
      try:
          transfer = client.transfers.create(
              amount=1.0,
              currency="usd",
              origin_id=your_account_id,
              destination_id=sub_merchant.id,
              metadata={"reason": "creator_payout"},
          )
          if transfer.object == "transfer":
              print(f"\n✅ Transfer complete → {transfer.id}")
          break
      except BadRequestError as e:
          print(f"\n❌ Transfer failed: {e.body['error']['message']}")
          input("\nFix the issue above, then press Enter to retry...")


  # 4. Generate a payout onboarding link for your sub-merchant
  # Short-lived URL — send to the sub-merchant to complete identity verification and payout setup.
  account_link = client.account_links.create(
      company_id=sub_merchant.id,
      refresh_url="https://yourapp.com/onboarding/refresh",
      return_url="https://yourapp.com/onboarding/complete",
      use_case="account_onboarding",
  )
  print(f"\n✅ Send to sub-merchant for payout setup:\n   {account_link.url}")
  ```

  ```typescript Typescript theme={null}
  import { Whop, WhopClient } from "@whop/sdk";
  import * as readline from "node:readline/promises";

  const client = new WhopClient({
    token: "YOUR_API_KEY",
  });

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const yourAccountId = "YOUR_ACCOUNT_ID";

  // 1. Create a checkout configuration
  const checkout = await client.checkoutConfigurations.create({
    currency: "usd",
    plan: {
      initial_price: 10.0,
      plan_type: "one_time",
      account_id: yourAccountId,
      currency: "usd",
      payment_method_configuration: {
        enabled: [
          "crypto", // low fees
          "us_bank_transfer", // very low fees
          "apple_pay", // standard cc rates
        ],
        disabled: [
          "acss_debit",
          "affirm",
          "afterpay_clearpay",
          "alipay",
          "alma",
          "amazon_pay",
        ],
      },
    },
    metadata: {
      order_id: "order_12345",
    },
  });

  const checkoutLink = `https://whop.com/checkout/${checkout.plan?.id}`;
  console.log(`\n✅ Checkout created → ${checkoutLink}\n   (redirect customers here to pay or embed it)`);
  await rl.question("\nPress Enter to continue...");

  // 2. Onboard sub-merchants to pay them out
  const subMerchant = await client.companies.create({
    email: "merchant@example.com",
    parent_company_id: yourAccountId,
    title: `Acme Merchant Store #${Math.floor(Math.random() * 200) + 1}`,
    // logo: new File([...], "logo.png"),
    metadata: {
      internal_user_id: "user_12345",
      seller_tier: "gold",
    },
  });
  console.log(`\n✅ Sub-merchant onboarded → ${subMerchant.id}`);

  // 2.5 Verify your platform account (skip if already done)
  // Your account must be verified to send transfers.
  console.log(`\n🔐 Verify your platform account:\n   https://whop.com/verify-identity/${yourAccountId}/`);
  await rl.question("\nPress Enter when done...");

  // 3. Programmatically pay out users
  while (true) {
    try {
      const transfer = await client.transfers.create({
        amount: 1.0,
        currency: "usd",
        origin_id: yourAccountId,
        destination_id: subMerchant.id,
        metadata: { reason: "creator_payout" },
      });
      if (transfer.object === "transfer") {
        console.log(`\n✅ Transfer complete → ${transfer.id}`);
      }
      break;
    } catch (err) {
      if (err instanceof Whop.BadRequestError) {
        console.log(`\n❌ Transfer failed: ${err.message}`);
        await rl.question("\nFix the issue above, then press Enter to retry...");
        continue;
      }
      throw err;
    }
  }

  // 4. Generate a payout onboarding link for your sub-merchant
  // Short-lived URL — send to the sub-merchant to complete identity verification and payout setup.
  const accountLink = await client.accountLinks.create({
    company_id: subMerchant.id,
    refresh_url: "https://yourapp.com/onboarding/refresh",
    return_url: "https://yourapp.com/onboarding/complete",
    use_case: "account_onboarding",
  });
  console.log(`\n✅ Send to sub-merchant for payout setup:\n   ${accountLink.url}`);

  rl.close();
  ```

  ```ruby Ruby theme={null}
  require "whop_sdk"

  client = Whop_sdk::Client.new(
    token: "YOUR_API_KEY",
  )

  your_account_id = "YOUR_ACCOUNT_ID"

  # 1. Create a checkout configuration
  checkout = client.checkout_configurations.create(
    currency: "usd",
    plan: {
      initial_price: 10.0,
      plan_type: "one_time",
      account_id: your_account_id,
      currency: "usd",
      payment_method_configuration: {
        enabled: [
          "crypto", # low fees
          "us_bank_transfer", # very low fees
          "apple_pay", # standard cc rates
        ],
        disabled: [
          "acss_debit",
          "affirm",
          "afterpay_clearpay",
          "alipay",
          "alma",
          "amazon_pay",
        ],
      },
    },
    metadata: {
      order_id: "order_12345",
    },
  )

  checkout_link = "https://whop.com/checkout/#{checkout.plan.id}"
  puts "\n✅ Checkout created → #{checkout_link}\n   (redirect customers here to pay or embed it)"
  print "\nPress Enter to continue..."
  gets

  # 2. Onboard sub-merchants to pay them out
  sub_merchant = client.companies.create(
    email: "merchant@example.com",
    parent_company_id: your_account_id,
    title: "Acme Merchant Store ##{rand(1..200)}",
    metadata: {
      internal_user_id: "user_12345",
      seller_tier: "gold",
    },
  )
  puts "\n✅ Sub-merchant onboarded → #{sub_merchant.id}"

  # 2.5 Verify your platform account (skip if already done)
  # Your account must be verified to send transfers.
  puts "\n🔐 Verify your platform account:\n   https://whop.com/verify-identity/#{your_account_id}/"
  print "\nPress Enter when done..."
  gets

  # 3. Programmatically pay out users
  loop do
    begin
      transfer = client.transfers.create(
        amount: 1.0,
        currency: "usd",
        origin_id: your_account_id,
        destination_id: sub_merchant.id,
        metadata: { reason: "creator_payout" },
      )
      puts "\n✅ Transfer complete → #{transfer.id}"
      break
    # The Ruby gem has no 400-specific error class, so catch every 4xx.
    rescue Whop_sdk::Errors::ClientError => e
      puts "\n❌ Transfer failed: #{e.message}"
      print "\nFix the issue above, then press Enter to retry..."
      gets
    end
  end

  # 4. Generate a payout onboarding link for your sub-merchant
  # Short-lived URL — send to the sub-merchant to complete identity verification and payout setup.
  account_link = client.account_links.create(
    company_id: sub_merchant.id,
    refresh_url: "https://yourapp.com/onboarding/refresh",
    return_url: "https://yourapp.com/onboarding/complete",
    use_case: "account_onboarding",
  )
  puts "\n✅ Send to sub-merchant for payout setup:\n   #{account_link.url}"
  ```
</CodeGroup>

# API keys

<AccordionGroup>
  <Accordion title="Account API keys" icon="building">
    Use Account API keys when you only want to fetch data or perform actions for your own Account
    and [connected accounts](/supported-business-models/platforms).

    1. Follow the [Quickstart API key steps](/developer/api/quickstart#create-an-api-key) and open **Account API Keys**.
    2. Select **Create** in the **Account API Keys** section.
    3. Give your API key a name, such as `Data pipeline` or `GHL Integration`.
    4. Select a role or a custom set of permissions. You can update the key and add permissions later.
    5. Create the API key, and copy it from the modal.
  </Accordion>

  <Accordion title="App API keys" icon="code">
    Use app API keys when you are building an app and need to access data on accounts that have installed your app.

    1. Open your [dashboard](https://whop.com/dashboard) and choose the business that owns the app.
    2. Open **Developer** → **Apps**.
    3. Select **Create app** and give the app a name, or select an existing app.
    4. On **App details**, find **Get started** → **Set up your local environment**.
    5. Use the copy button in **Copy these environment variables** to copy the real `WHOP_API_KEY`, then store it securely. You will need it to make API calls on behalf of the app.

    <Note>
      This `WHOP_API_KEY` is the app's API credential. It's different from the runtime secrets managed by [`whop apps secrets`](/developer/cli#manage-app-secrets), which are arbitrary key-value environment bindings for your hosted code.
    </Note>
  </Accordion>

  <Accordion title="OAuth tokens" icon="user">
    Use OAuth tokens when you want users to sign in with their Whop account and grant your app permission to act on their behalf. Unlike API keys which use your app's permissions, OAuth tokens are scoped to what each individual user can access.

    Common use cases:

    * "Sign in with Whop" authentication
    * Accessing a user's memberships, purchases, or profile
    * Performing actions as a specific user (not as your app)

    OAuth tokens are obtained through the OAuth 2.1 + PKCE flow:

    1. Redirect users to Whop's authorization page
    2. User logs in and approves your requested scopes
    3. Exchange the authorization code for access and refresh tokens
    4. Use the access token as your API key in SDK calls or the `Authorization` header

    See the [OAuth guide](/developer/guides/oauth) for full implementation details.
  </Accordion>
</AccordionGroup>

# Making API calls

The public API is available at `https://api.whop.com/api/v1`.

Use curl to test the API by fetching your public user profile data:

```bash theme={null}
# replace "j" with your own whop username
curl https://api.whop.com/api/v1/users/j
```

To make authenticated requests you need to include your API key in the `Authorization` header using the `Bearer` scheme:

```bash theme={null}
# replace "YOUR_API_KEY" with your real API key
curl https://api.whop.com/api/v1/payments?company_id=biz_xxxxxxxxxxx \
    -H "Authorization: Bearer YOUR_API_KEY"
```

# SDK reference

* [TypeScript / JavaScript](https://npmjs.com/package/@whop/sdk) / [Docs](https://github.com/whopio/whopsdk-typescript)
* [Python](https://pypi.org/project/whop-sdk) / [Docs](https://github.com/whopio/whopsdk-python)
* [Ruby](https://rubygems.org/gems/whop_sdk) / [Docs](https://github.com/whopio/whopsdk-ruby)

## MCP

You can also access the API through the Whop Model Context Protocol server at
`https://mcp.whop.com/mcp` (Cursor) or `https://mcp.whop.com/sse` (Claude).

[Learn more here](/developer/guides/ai_and_mcp)
