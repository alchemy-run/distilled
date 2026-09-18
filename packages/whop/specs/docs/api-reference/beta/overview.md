> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Overview

> What the API does, how requests work, and a map of every resource.

The Whop API is how you move money programmatically. Accept payments with checkout links, hold balances, send payouts, issue cards, transfer funds between accounts, and manage the products and plans you sell. Do it all from your server with one API key.

## Make a request

The base URL is `https://api.whop.com/api/v1`. Authenticate every request with a Bearer API key:

```bash theme={null}
curl https://api.whop.com/api/v1/accounts/me \
  -H "Authorization: Bearer $WHOP_API_KEY"
```

```json theme={null}
{
	"id": "biz_XXXXXXXX",
	"title": "Acme Studio",
	"route": "acme-studio",
	"status": "approved"
}
```

If you're new, the [Quickstart](/api-reference/beta/quickstart) takes you from [creating a key](https://whop.com/dashboard/developer) to a live checkout link in about five minutes.

## How requests work

### Authentication

[Create an API key here](https://whop.com/dashboard/developer) under **Account API Keys**. Keys belong to an account and carry the permissions you grant them. Keep keys on your server, never in browser code, mobile apps, or public repos.

### Versioning

Whop versions the API by date. Send an `Api-Version-Date` header, such as `2026-07-01`, to pin the shapes of your requests and responses. Later changes won't break a pinned caller. When you omit the header, requests use the original `2025-01-01` shapes. Generated SDKs always send the latest version available when Whop built them. See [Versioning](/developer/api/versioning).

### Pagination

List endpoints return a `data` array plus a `page_info` object. Pass `first` to choose the page size. Pass `after` with the previous response's `page_info.end_cursor` to fetch the next page. `page_info.has_next_page` tells you when to stop.

### Errors

Failed requests return a conventional HTTP status (`400`, `401`, `403`, `404`) and a body with a single `error` object: `type` is a machine-readable code and `message` explains what went wrong.

```json theme={null}
{
	"error": {
		"type": "invalid_parameters",
		"message": "initial_price must be greater than 0"
	}
}
```

## Where everything lives

This reference covers the versioned API. Some resources are still served by the earlier surface and documented in the [Legacy API reference](/api-reference/payments/payment) — fully supported, and marked with a pointer wherever a successor exists here:

* Charging: [Payments](/api-reference/payments/payment), [Refunds](/api-reference/refunds/refund), [Invoices](/api-reference/invoices/invoice), [Payment methods](/api-reference/payment-methods/payment-method)
* Content and community: [Courses](/api-reference/courses/course), [Forums](/api-reference/forums/forum), [Messages](/api-reference/messages/message)
* Growth: [Affiliates](/api-reference/affiliates/affiliate), [Leads](/api-reference/leads/lead), [Reviews](/api-reference/reviews/review)

Use the Legacy API section in the sidebar to browse the full Legacy reference.

## Resources

### Core Resources

The accounts and people everything else hangs off.

| Resource                                                        | What it's for                                                         |
| --------------------------------------------------------------- | --------------------------------------------------------------------- |
| [Accounts](/api-reference/beta/accounts/account)                | A business on Whop: profile, wallet, capabilities, settings.          |
| [Users](/api-reference/beta/users/user)                         | A person on Whop: profile and connected identities.                   |
| [Team Members](/api-reference/beta/team-members/team-member)    | An account's team members and the roles that scope their access.      |
| [Members](/api-reference/beta/members/member)                   | One buyer's relationship with an account, across all their purchases. |
| [Webhooks](/api-reference/beta/webhooks/list-webhooks)          | Event notifications pushed to your server as things happen.           |
| [Stats](/api-reference/beta/stats/stats)                        | Aggregated financial, audience, and traffic reporting.                |
| [Verifications](/api-reference/beta/verifications/verification) | Legal identity required before payouts and card issuing.              |
| [Exports](/api-reference/beta/exports/list-exports)             | Asynchronous CSV dumps of an account's dashboard data.                |

### Notifications

What users get told about, and how they tune it.

| Resource                                                              | What it's for                                                                             |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [Notifications](/api-reference/beta/notifications/list-notifications) | The user's notification feed: unread badges, mark-read, app sends, and the topic catalog. |

### Money

Balances and every way funds move in or out.

| Resource                                                                                            | What it's for                                                              |
| --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [Payments](/api-reference/beta/payments/update-payment-return-url)                                  | A charge against a buyer, and the step they still owe.                     |
| [Setup Intents](/api-reference/beta/setup-intents/update-setup-return-url)                          | Saving a buyer's payment method without charging it.                       |
| [Ledgers](/api-reference/beta/ledgers/ledger-activity)                                              | The activity feed behind an account or user's balance.                     |
| [Payouts](/api-reference/beta/payouts/payout)                                                       | Send money from a balance to a bank or wallet.                             |
| [Cards](/api-reference/beta/cards/card)                                                             | Issue cards that spend from a balance.                                     |
| [Transfers](/api-reference/beta/transfers/transfer)                                                 | Move funds between Whop accounts and users.                                |
| [Disputes](/api-reference/beta/disputes/dispute)                                                    | Chargebacks filed against an account, with evidence and outcomes.          |
| [Dispute alerts](/api-reference/beta/dispute-alerts/dispute-alert)                                  | Issuer warnings that arrive before a chargeback does.                      |
| [Deposits](/api-reference/beta/deposits/deposit)                                                    | Add funds to a balance.                                                    |
| [Swaps](/api-reference/beta/swaps/swap)                                                             | Convert a balance between currencies.                                      |
| [Resolution Center Cases](/api-reference/beta/resolution-center-cases/list-resolution-center-cases) | File or respond to a case against a payment, as the buyer or the merchant. |

### Commerce

Sell products and get paid.

| Resource                                                                                      | What it's for                                                               |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [Products](/api-reference/beta/products/product)                                              | The things you sell. Each owns plans and a store page.                      |
| [Plans](/api-reference/beta/plans/plan)                                                       | Pricing for a product: one-time, recurring, trials, stock.                  |
| [Promo Codes](/api-reference/beta/promo-codes/list-promo-codes)                               | Discounts that creators configure for checkout.                             |
| [Memberships](/api-reference/beta/memberships/membership)                                     | A customer's purchase of a plan, from checkout through cancellation.        |
| [Checkout Configurations](/api-reference/beta/checkout-configurations/checkout-configuration) | Turn a plan into a shareable, prefilled checkout link.                      |
| [Payment Method Domains](/api-reference/beta/payment-method-domains/payment-method-domain)    | Domains verified to show wallet payment methods like Apple Pay at checkout. |
| [Shipments](/api-reference/beta/shipments/list-shipments)                                     | Track the delivery of an order by its carrier tracking number.              |

### Partners

Refer users and businesses to Whop and track what you earn.

| Resource                                         | What it's for                                                               |
| ------------------------------------------------ | --------------------------------------------------------------------------- |
| [Partners](/api-reference/beta/partners/partner) | The users and businesses you referred to Whop, and what you earn from them. |

### Workforce

Post paid tasks and pay people for completed work.

| Resource                                                                             | What it's for                                              |
| ------------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| [Bounties](/api-reference/beta/bounties/bounty)                                      | Paid tasks with reviewed submissions and escrowed rewards. |
| [Bounty Submissions](/api-reference/beta/bounty-submissions/list-bounty-submissions) | Work submitted to a bounty, from attempt to payout.        |

### Tracking

Who visits and what converts, captured by the pixel.

| Resource                                                                          | What it's for                                                                        |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| [People](/api-reference/beta/people/person)                                       | Visitors and customers of an account, with identity, purchase, and traffic profiles. |
| [Events](/api-reference/beta/events/event)                                        | Conversion and engagement events tracked for attribution.                            |
| [Recommended Actions](/api-reference/beta/recommended-actions/list-action-chains) | Suggested next-step action chains for an account.                                    |

### Ads

Run and measure ad campaigns from your integration.

| Resource                                                     | What it's for                                         |
| ------------------------------------------------------------ | ----------------------------------------------------- |
| [Ads](/api-reference/beta/ads/ad)                            | The creative: copy, assets, and destination URL.      |
| [Ad Campaigns](/api-reference/beta/ad-campaigns/ad-campaign) | Platform, objective, and budget for a set of ads.     |
| [Ad Groups](/api-reference/beta/ad-groups/ad-group)          | Audience, placements, and schedule within a campaign. |
| [Audiences](/api-reference/beta/audiences/audience)          | Reusable targeting lists for ad groups.               |

### Media

Generate media assets from your integration.

| Resource                                      | What it's for                                                                       |
| --------------------------------------------- | ----------------------------------------------------------------------------------- |
| [Files](/api-reference/beta/files/list-files) | Upload files and attach them wherever Whop accepts documents.                       |
| [Media](/api-reference/beta/media/media)      | AI-generated assets, billed from a balance, attachable wherever files are accepted. |

### Identity

Accounts connected from other platforms.

| Resource                                                              | What it's for                                           |
| --------------------------------------------------------------------- | ------------------------------------------------------- |
| [Social Accounts](/api-reference/beta/social-accounts/social-account) | Connected Facebook and Instagram accounts that run ads. |

### Developer

Build, host, and observe apps on the Whop platform.

| Resource                                                  | What it's for                                                  |
| --------------------------------------------------------- | -------------------------------------------------------------- |
| [Apps](/api-reference/beta/apps/app)                      | Apps you build on Whop: metadata, hosted builds, runtime logs. |
| [App Builds](/api-reference/beta/app-builds/app-build)    | Versioned build artifacts deployed to an app's platforms.      |
| [API Keys](/api-reference/beta/api-keys/api-key)          | Programmatic credentials for an account or app.                |
| [Permissions](/api-reference/beta/permissions/permission) | What your credential is allowed to do on a resource.           |
