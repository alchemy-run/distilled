> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Enroll connected accounts

> Onboard businesses or individuals to your platform and facilitate payments

To enroll a connected account on your platform, create an Account object for them under your platform account. That account can then accept direct charges, receive transfers, and use Whop payout flows.

## Example

Create an account for the connected account:

<CodeGroup>
  ```typescript TypeScript theme={null}
  import { WhopClient } from "@whop/sdk";

  const client = new WhopClient({
  	token: "Account API Key",
  });

  const account = await client.companies.create({
  	email: "merchant@example.com",
  	parent_company_id: "biz_xxxxxxxxxxxxx",
  	title: "Acme Merchant Store",
  	metadata: {
  		internal_user_id: "user_12345",
  		seller_tier: "gold",
  	},
  });

  console.log(account.id);
  ```

  ```python Python theme={null}
  from whop_sdk import Whop

  client = Whop(
      token="Account API Key",
  )

  account = client.companies.create(
      email="merchant@example.com",
      parent_company_id="biz_xxxxxxxxxxxxx",
      title="Acme Merchant Store",
      metadata={
          "internal_user_id": "user_12345",
          "seller_tier": "gold",
      },
  )

  print(account.id)
  ```
</CodeGroup>

In this example:

* `email` is the connected account's email address. Whop uses it to identify the connected account and send important notifications.
* `parent_company_id` is your platform's account ID (the parent account)
* `title` is the required display name for the connected account.
* `metadata` contains custom key-value pairs:
  * `internal_user_id`: Your platform's internal identifier for this connected account
  * `seller_tier`: A classification or tier level for the connected account (e.g., "bronze," "silver," or "gold")
* The response includes an `account.id` that you can use to reference this connected account in future API calls

<Tip>
  The email address should belong to the connected account (business or
  individual) who will be managing the account. This person will receive account
  setup and payment notifications.
</Tip>

## Finish onboarding

If the recipient doesn't already have a Whop account, send them an account onboarding link after you create the account. They complete Know Your Customer (KYC) verification through that link, and then the account can receive transfers and other payout flows.

<CodeGroup>
  ```typescript TypeScript theme={null}
  const accountLink = await client.accountLinks.create({
  	company_id: account.id,
  	refresh_url: "https://yourapp.com/onboarding/refresh",
  	return_url: "https://yourapp.com/onboarding/complete",
  	use_case: "account_onboarding",
  });

  console.log(accountLink.url);
  ```

  ```python Python theme={null}
  account_link = client.account_links.create(
      company_id=account.id,
      refresh_url="https://yourapp.com/onboarding/refresh",
      return_url="https://yourapp.com/onboarding/complete",
      use_case="account_onboarding",
  )

  print(account_link.url)
  ```
</CodeGroup>

After the recipient completes onboarding, you can:

* create checkout flows for them with application fees.
* transfer funds to their account balance.
* let them withdraw funds with the payout portal.

## Getting started

Before you can enroll connected accounts, you need to set up your platform account:

1. **Sign up for a platform account**: Create an Account at [whop.com/dashboard](https://whop.com/dashboard)
2. **Generate an Account API key**: Go to your developer settings page and generate an Account API key
3. **Use the API key for authentication**: This API key is how you authenticate with the Whop API and control your connected accounts

The Account API key provides the necessary permissions to create and manage connected accounts under your platform account.

## Custom metadata

You can attach custom metadata to accounts when creating them. Metadata lets you store additional information about each connected account as key-value pairs. This is useful for:

* Storing your internal user or merchant identifiers
* Tracking connected account tiers or classifications
* Linking to your platform's database records

Whop stores metadata on the Account object. You can retrieve it later for reporting, filtering, or integration purposes.

## API reference

<Card title="Create Account API" icon="code" href="/api-reference/companies/create-company">
  See the full API reference for creating accounts and all available parameters
</Card>

## Next steps

After creating an Account for a connected account:

<CardGroup cols={2}>
  <Card title="Collect and split payments" icon="arrow-right-arrow-left" href="/developer/platforms/collect-payments-for-connected-accounts">
    Choose between direct charges and transfers
  </Card>

  <Card title="Render payout portal" icon="money-bill-transfer" href="/developer/platforms/render-payout-portal">
    Let connected accounts withdraw their funds
  </Card>
</CardGroup>
