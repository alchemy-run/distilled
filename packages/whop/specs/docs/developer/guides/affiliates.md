> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Affiliates

> Create affiliate records, assign per-plan or rev-share commission overrides, and track referral earnings.

Affiliates earn commissions for referred sales. The API flow has two parts: create an affiliate record, then add overrides that define the commission.

## How attribution works

1. You create an affiliate record for a user, then add overrides. Each override returns `product_direct_link` and `checkout_direct_link` fields. These are referral URLs the affiliate shares (they include `?a=<username>`).
2. A buyer uses the link. Whop stores the affiliate cookie (30-day attribution window by default).
3. Buyer checks out within the window. The matching override calculates the commission: `standard` (per-plan, percentage or flat fee) or `rev_share` (percentage of revenue, product-specific or account-wide).
4. Whop attributes the commission to the affiliate and reflects it in the override's `total_referral_earnings_usd` field.

<Note>
  **Refunds reverse commissions.** If a buyer refunds within the window, the affiliate's earning on that sale is clawed back automatically.
</Note>

<Note>
  **Affiliates need a Whop account to receive payouts.** Earnings accrue on the record. Payouts go to their account balance via [transfers](/developer/platforms/collect-payments-for-connected-accounts#transfers). If they don't have an account yet, onboard them with [connected account enrollment](/developer/platforms/enroll-connected-accounts).
</Note>

## Create an affiliate

`user_identifier` resolves flexibly. Pass a username, email, user ID, or Discord ID. If an affiliate record already exists for the account and user pair, Whop returns the existing record (idempotent).

<CodeGroup>
  ```typescript TypeScript theme={null}
  import { WhopClient } from "@whop/sdk";

  const client = new WhopClient({ token: process.env.WHOP_API_KEY });

  const affiliate = await client.affiliates.create({
    company_id: "biz_xxxxxxxxxxxxx",
    user_identifier: "johndoe", // username, email, usr_xxx, or Discord ID
  });

  console.log(`Affiliate ${affiliate.id} created`);
  ```

  ```python Python theme={null}
  import os
  from whop_sdk import Whop

  client = Whop(token=os.environ["WHOP_API_KEY"])

  affiliate = client.affiliates.create(
      company_id="biz_xxxxxxxxxxxxx",
      user_identifier="johndoe",
  )

  print(f"Affiliate {affiliate.id} created")
  ```
</CodeGroup>

## Add commission overrides

An affiliate record doesn't define a commission by itself. Add **overrides** to decide what the affiliate gets paid.

| Override type   | What it does                                               | Required fields                                                         |
| --------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------- |
| **`standard`**  | Per-plan commission, percentage or flat fee                | `plan_id`, `commission_type`, `commission_value`, `applies_to_payments` |
| **`rev_share`** | Percentage revenue share, product-specific or account-wide | `commission_value` (always percentage) and optional `product_id`        |

### Standard (per-plan)

<CodeGroup>
  ```typescript TypeScript theme={null}
  const override = await client.affiliates.overrides.create({
    id: affiliate.id,
    body: {
      id: affiliate.id,
      override_type: "standard",
      plan_id: "plan_xxxxxxxxxxxxx",
      commission_type: "percentage",       // "percentage" or "flat_fee"
      commission_value: 40,                // 40% (or $40 if flat_fee)
      applies_to_payments: "first_payment" // "first_payment" or "all_payments"
    },
  });

  // Share these with the affiliate
  console.log(override.product_direct_link);
  console.log(override.checkout_direct_link);
  ```

  ```python Python theme={null}
  override = client.affiliates.overrides.create(
      affiliate.id,
      request={
          "override_type": "standard",
          "plan_id": "plan_xxxxxxxxxxxxx",
          "commission_type": "percentage",   # "percentage" or "flat_fee"
          "commission_value": 40,            # 40% (or $40 if flat_fee)
          "applies_to_payments": "first_payment",
      },
  )

  print(override.product_direct_link)
  print(override.checkout_direct_link)
  ```
</CodeGroup>

`commission_value` rules:

* `"percentage"`: whole number 1–100 (`40` = 40%).
* `"flat_fee"`: dollar amount (`10` = \$10).

`applies_to_payments`:

* `"first_payment"`: affiliate earns only on the initial purchase.
* `"all_payments"`: affiliate earns on every recurring payment too.

### Rev-share (revenue percentage)

Rev-share overrides are always percentage-based. Don't pass `commission_type: "flat_fee"`.

<CodeGroup>
  ```typescript TypeScript theme={null}
  // Product-specific: affiliate earns 30% on sales of this product
  await client.affiliates.overrides.create({
    id: affiliate.id,
    body: {
      id: affiliate.id,
      override_type: "rev_share",
      product_id: "prod_xxxxxxxxxxxxx",
      commission_value: 30,
    },
  });

  // Account-wide: affiliate earns 15% on every product
  await client.affiliates.overrides.create({
    id: affiliate.id,
    body: {
      id: affiliate.id,
      override_type: "rev_share",
      commission_value: 15,
    },
  });
  ```

  ```python Python theme={null}
  # Product-specific: affiliate earns 30% on sales of this product
  client.affiliates.overrides.create(
      affiliate.id,
      request={
          "override_type": "rev_share",
          "product_id": "prod_xxxxxxxxxxxxx",
          "commission_value": 30,
      },
  )

  # Account-wide: affiliate earns 15% on every product
  client.affiliates.overrides.create(
      affiliate.id,
      request={
          "override_type": "rev_share",
          "commission_value": 15,
      },
  )
  ```
</CodeGroup>

## Manage overrides

<CodeGroup>
  ```typescript TypeScript theme={null}
  // List all overrides for an affiliate
  const overrides = await client.affiliates.overrides.list({ id: "aff_xxxxxxxxxxxxx" });

  // Filter by type
  const standardOnly = await client.affiliates.overrides.list({
    id: "aff_xxxxxxxxxxxxx",
    override_type: "standard",
  });

  // Retrieve one
  const o = await client.affiliates.overrides.retrieve({
    id: "aff_xxxxxxxxxxxxx",
    override_id: "aovr_xxxxxxxxxxxxx",
  });

  // Update
  await client.affiliates.overrides.update({
    id: "aff_xxxxxxxxxxxxx",
    override_id: "aovr_xxxxxxxxxxxxx",
    commission_value: 50,
    applies_to_payments: "all_payments",
  });

  // Delete (for standard overrides, this also removes the affiliate from that plan)
  await client.affiliates.overrides.delete({
    id: "aff_xxxxxxxxxxxxx",
    override_id: "aovr_xxxxxxxxxxxxx",
  });
  ```

  ```python Python theme={null}
  # List all overrides for an affiliate
  overrides = client.affiliates.overrides.list("aff_xxxxxxxxxxxxx")

  # Filter by type
  standard_only = client.affiliates.overrides.list(
      "aff_xxxxxxxxxxxxx",
      override_type="standard",
  )

  # Retrieve one
  o = client.affiliates.overrides.retrieve("aff_xxxxxxxxxxxxx", "aovr_xxxxxxxxxxxxx")

  # Update
  client.affiliates.overrides.update(
      "aff_xxxxxxxxxxxxx",
      "aovr_xxxxxxxxxxxxx",
      commission_value=50,
      applies_to_payments="all_payments",
  )

  # Delete (for standard overrides, this also removes the affiliate from that plan)
  client.affiliates.overrides.delete("aff_xxxxxxxxxxxxx", "aovr_xxxxxxxxxxxxx")
  ```
</CodeGroup>

## Manage affiliates

<CodeGroup>
  ```typescript TypeScript theme={null}
  // List, optionally filtered by status. The page is async-iterable and
  // fetches the next page for you as you consume it.
  const affiliates = await client.affiliates.list({
    company_id: "biz_xxxxxxxxxxxxx",
    status: "active",
  });

  for await (const affiliate of affiliates) {
    console.log(affiliate);
  }

  const single = await client.affiliates.retrieve({ id: "aff_xxxxxxxxxxxxx" });

  // Archive blocks the affiliate from earning further commissions
  await client.affiliates.archive({ id: "aff_xxxxxxxxxxxxx" });
  await client.affiliates.unarchive({ id: "aff_xxxxxxxxxxxxx" });
  ```

  ```python Python theme={null}
  # List, optionally filtered by status. Iterating the pager fetches
  # the next page for you as you consume it.
  for affiliate in client.affiliates.list(
      company_id="biz_xxxxxxxxxxxxx",
      status="active",
  ):
      print(affiliate)

  single = client.affiliates.retrieve("aff_xxxxxxxxxxxxx")

  # Archive blocks the affiliate from earning further commissions
  client.affiliates.archive("aff_xxxxxxxxxxxxx")
  client.affiliates.unarchive("aff_xxxxxxxxxxxxx")
  ```
</CodeGroup>

## Account-level affiliate settings

Three account fields control how Whop presents the affiliate program to users. Update them through the Account resource.

<CodeGroup>
  ```typescript TypeScript theme={null}
  await client.companies.update({
    id: "biz_xxxxxxxxxxxxx",
    affiliate_instructions: "Share your link on social. 30-day cookie window.",
    affiliate_application_required: true,
    featured_affiliate_product_id: "prod_xxxxxxxxxxxxx",
  });
  ```

  ```python Python theme={null}
  client.companies.update(
      "biz_xxxxxxxxxxxxx",
      affiliate_instructions="Share your link on social. 30-day cookie window.",
      affiliate_application_required=True,
      featured_affiliate_product_id="prod_xxxxxxxxxxxxx",
  )
  ```
</CodeGroup>

| Field                            | Description                                                              |
| -------------------------------- | ------------------------------------------------------------------------ |
| `affiliate_instructions`         | Guidelines shown to affiliates promoting this account                    |
| `affiliate_application_required` | Whether users must apply and receive approval before becoming affiliates |
| `featured_affiliate_product_id`  | Which product to feature for affiliate promotion                         |

## Tracking earnings

Each override includes a `total_referral_earnings_usd` field that reflects cumulative earnings (in United States dollars) for that specific override. Re-fetch the override (or list overrides on an affiliate) to get the current total.

<Note>
  There is no dedicated `affiliate.*` webhook in v1, and the public `payment` schema doesn't expose affiliate linkage. Poll `affiliates.overrides.list` on your payout schedule and compare the latest `total_referral_earnings_usd` values with the last values you stored.
</Note>

## Override response fields

| Field                         | Description                                                                 |
| ----------------------------- | --------------------------------------------------------------------------- |
| `override_type`               | `"standard"` or `"rev_share"`                                               |
| `commission_type`             | `"percentage"` or `"flat_fee"`                                              |
| `commission_value`            | Percentage (1–100) or flat fee in dollars                                   |
| `applies_to_payments`         | `"first_payment"` or `"all_payments"` (standard only, `null` for rev-share) |
| `plan_id`                     | Plan ID (standard only)                                                     |
| `product_id`                  | Product ID (rev-share only, `null` if account-wide)                         |
| `applies_to_products`         | `"single_product"` or `"all_products"` (rev-share only)                     |
| `product_direct_link`         | Referral link to product page (standard only)                               |
| `checkout_direct_link`        | Referral link to checkout page (standard only)                              |
| `total_referral_earnings_usd` | Cumulative earnings for this override                                       |

## Next steps

<CardGroup cols={2}>
  <Card title="Pay out affiliate earnings" href="/developer/platforms/collect-payments-for-connected-accounts#transfers">
    Transfer accrued commissions from your balance to affiliate accounts.
  </Card>

  <Card title="Accept payments" href="/developer/guides/accept-payments">
    Checkout configurations attribute sales automatically when referral cookies are set.
  </Card>

  <Card title="Listen to webhooks" href="/developer/guides/webhooks">
    Use `payment.succeeded` for general sales telemetry. Affiliate attribution still polls.
  </Card>

  <Card title="Affiliates API reference" href="/api-reference/affiliates/affiliate">
    Full resource. Endpoints, fields, and override schemas.
  </Card>
</CardGroup>
