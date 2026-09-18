> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Stats

Stats represent aggregated activity for an account over time. They help you understand revenue, transactions, disputes, members, referrals, and advertising performance across reporting periods like days, weeks, or months.

Use the Stats API to list available metrics and their filterable properties, then retrieve time-series values for a date range.

## Endpoints

| Endpoint                                                     | Request                                                            |
| ------------------------------------------------------------ | ------------------------------------------------------------------ |
| [List Metrics](/api-reference/beta/stats/list-metrics)       | <Badge color="blue" size="sm" stroke>GET</Badge> `/stats`          |
| [Retrieve Metric](/api-reference/beta/stats/retrieve-metric) | <Badge color="blue" size="sm" stroke>GET</Badge> `/stats/{metric}` |

## Metrics glossary

Every metric has a `key` that you pass as the `{metric}` path segment to [Retrieve Metric](/api-reference/beta/stats/retrieve-metric). [List Metrics](/api-reference/beta/stats/list-metrics) returns the same catalog at runtime, with each metric's `unit` and the `properties` you can filter or break down by. An unknown key returns a `404`.

### Units

| Unit       | How to read the value                                                                                    |
| ---------- | -------------------------------------------------------------------------------------------------------- |
| `count`    | An integer count.                                                                                        |
| `currency` | A decimal amount in the display currency (see [`convert_to`](#query-parameters)), for example `4899.50`. |
| `percent`  | A number where `1.6` means 1.6%, already scaled to percentage points rather than a `0`–`1` fraction.     |

### Filtering and breaking down

Each property works two ways unless noted otherwise:

* **Filter** — pass `property=value` to narrow the series to a single value, for example `?payment_method=card`.
* **Break down** — pass `breakdown_by=property` to split each point into one entry per value. For example, `?breakdown_by=currency` returns an entry for `usd`, an entry for `eur`, and so on. One `breakdown_by` at a time.

Passing a property a metric doesn't list returns a `400`.

| Property             | Values                                                                                                                                                                                                                                                        |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `currency`           | A currency code from the International Organization for Standardization (ISO) 4217, such as `usd` or `eur`. For `market_prices`, it can also be an asset symbol such as `btc` or `xaut`. Transaction metrics report the original currency without conversion. |
| `hostname`           | The website hostname associated with the traffic, for example `shop.example.com` (traffic metrics only).                                                                                                                                                      |
| `page`               | A hostname plus normalized path, for example `shop.example.com/pricing` (traffic metrics only).                                                                                                                                                               |
| `source`             | Where a visit came from: `whop_ads` for traffic from Whop ads, `direct` for unattributed visits, or the visit's `utm_source` value (traffic metrics only).                                                                                                    |
| `device_type`        | `desktop`, `mobile`, `tablet`, or `unknown` (traffic metrics only).                                                                                                                                                                                           |
| `country_code`       | An uppercase ISO 3166-1 alpha-2 code, for example `US`. Empty when unknown (traffic metrics only).                                                                                                                                                            |
| `payment_method`     | `card` or `crypto`.                                                                                                                                                                                                                                           |
| `card_network`       | A card brand, for example `visa` or `mastercard`. A refinement of `payment_method=card` — only valid alongside it.                                                                                                                                            |
| `dispute_reason`     | A provider-normalized dispute reason such as `product_not_received`, `product_unacceptable`, `fraudulent`, or `credit_not_processed`. Use it on `snapshot_disputes`. Clients can group remaining reason slugs into “Other” for display.                       |
| `product`            | A product ID to scope the metric to a single product.                                                                                                                                                                                                         |
| `fee_type`           | A fee line type, for example `payment_processing_percentage_fee` (see the [Ledger Activity fees glossary](/api-reference/beta/ledgers/ledger-activity#fees)).                                                                                                 |
| `status`             | A membership status for New users, or an affiliate payment status for Partner metrics.                                                                                                                                                                        |
| `access_level`       | A member's access level, for example `customer` (New users only).                                                                                                                                                                                             |
| `most_recent_action` | A member's most recent lifecycle action (New users only).                                                                                                                                                                                                     |
| `account_id`         | A referred business ID (Partner metrics only).                                                                                                                                                                                                                |
| `tier`               | `first` or `second` (Partner metrics only).                                                                                                                                                                                                                   |
| `referred_user_id`   | A referred user ID. Filter-only. You can't use it with `breakdown_by` (Partner metrics only).                                                                                                                                                                 |
| `merchant`           | A slugified merchant name, for example `starbucks`, or `other` when unknown (card metrics only). On `card_spend`, it names the transaction's merchant. On cashback metrics, it names the cashback offer's merchant bucket.                                    |
| `event_name`         | A tracked event name, for example `pixel.page` or `pixel.custom` (`events` only).                                                                                                                                                                             |
| `event_type`         | A canonical group of events: `page_view` (pixel page views plus whop.com store views), `checkout_start` (hosted and embedded checkout views), or `other` (`events` only).                                                                                     |
| `custom_name`        | The merchant-defined name of a custom event (`events` only). A refinement of `event_name=pixel.custom` — only valid alongside it, since no other event carries a custom name.                                                                                 |

### Query parameters

These apply to every metric on [Retrieve Metric](/api-reference/beta/stats/retrieve-metric), independent of its properties:

| Parameter         | Description                                                                                                                                                                                                                                                                                    |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `from`, `to`      | Required. The date range (`YYYY-MM-DD`) to plot.                                                                                                                                                                                                                                               |
| `interval`        | Point width: `hour`, `day`, `week`, or `month`. Defaults to `day`. Traffic metrics also accept `minute` for ranges up to one hour. `market_prices` accepts `five_minutes`, `thirty_minutes`, `hour`, or `day`.                                                                                 |
| `convert_to`      | Display currency for money metrics. The API converts every amount into this ISO currency at each period's rate. Defaults to `usd`. Filtering or breaking down by `currency` reports the original currency and ignores this parameter. `market_prices` currently supports only `usd`.           |
| `time_zone`       | An Internet Assigned Numbers Authority (IANA) time zone to group the series, for example `America/New_York`. Defaults to Coordinated Universal Time (`UTC`).                                                                                                                                   |
| `breakdown_by`    | Split each point out by one of the metric's properties.                                                                                                                                                                                                                                        |
| `snapshot_window` | Snapshot metrics only. Ordinary snapshots accept `30d` as their trailing activity window. Cohorted dispute metrics accept `7d` or `28d` as the sales-transaction pooling window. The metric name fixes the attribution window. Check the metric catalog's `windows` array for accepted values. |

### Revenue

| Metric                             | Unit       | Filters & breakdowns                    | Description                                                                                        |
| ---------------------------------- | ---------- | --------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `net_revenue`                      | `currency` | —                                       | Earnings kept after refunds, disputes, and all fees.                                               |
| `gross_revenue`                    | `currency` | `payment_method`, `product`, `currency` | Gross earnings from sales and platform income before refunds or fees.                              |
| `net_volume`                       | `currency` | —                                       | Gross earnings minus Whop fees before refunds and other deductions.                                |
| `gross_transaction_value`          | `currency` | `currency`                              | Gross Merchandise Value (GMV): total value of completed sales before refunds or fees.              |
| `marketplace_revenue`              | `currency` | `payment_method`, `product`, `currency` | Revenue from marketplace sales, excluding direct-to-consumer.                                      |
| `churned_revenue`                  | `currency` | —                                       | Recurring revenue lost from memberships whose monthly recurring revenue decreased over the period. |
| `total_refunded`                   | `currency` | `payment_method`, `product`, `currency` | Total amount refunded to buyers.                                                                   |
| `monthly_recurring_revenue`        | `currency` | `currency`                              | Monthly recurring revenue from active subscriptions.                                               |
| `annual_recurring_revenue`         | `currency` | `currency`                              | Annualized recurring revenue: monthly recurring revenue times twelve.                              |
| `average_revenue_per_user`         | `currency` | `payment_method`, `product`, `currency` | Average revenue earned per paying user.                                                            |
| `average_revenue_per_subscription` | `currency` | `payment_method`, `product`, `currency` | Average revenue earned per active subscription.                                                    |

### Payments

| Metric                | Unit    | Filters & breakdowns                    | Description                   |
| --------------------- | ------- | --------------------------------------- | ----------------------------- |
| `successful_payments` | `count` | `payment_method`, `product`, `currency` | Successful payments received. |

### Fees

Every fee metric accepts a `currency` filter.

| Metric                    | Unit       | Filters & breakdowns   | Description                                                   |
| ------------------------- | ---------- | ---------------------- | ------------------------------------------------------------- |
| `fees`                    | `currency` | `currency`, `fee_type` | All fees charged. Break down by `fee_type` to itemize them.   |
| `payment_processing_fees` | `currency` | `currency`             | Card, network, currency-conversion, billing, and payout fees. |
| `whop_processing_fees`    | `currency` | `currency`             | Whop's processing fee on transactions.                        |
| `affiliate_fees`          | `currency` | `currency`             | Fees paid to affiliates on referred sales.                    |
| `marketplace_fees`        | `currency` | `currency`             | Affiliate fees on marketplace sales.                          |
| `dispute_fees`            | `currency` | `currency`             | Fees charged for disputes and dispute alerts.                 |
| `sales_tax_withheld`      | `currency` | `currency`             | Sales tax withheld and remitted.                              |

### Disputes & refunds

| Metric           | Unit      | Filters & breakdowns | Description                                                      |
| ---------------- | --------- | -------------------- | ---------------------------------------------------------------- |
| `disputes`       | `count`   | —                    | Disputes opened for the account.                                 |
| `dispute_alerts` | `count`   | —                    | Early warning dispute alerts received on the account's payments. |
| `dispute_rate`   | `percent` | `payment_method`     | Share of paid receipts with a dispute.                           |
| `refund_rate`    | `percent` | `payment_method`     | Share of paid receipts refunded.                                 |

### Authorizations

| Metric      | Unit      | Filters & breakdowns | Description                                                  |
| ----------- | --------- | -------------------- | ------------------------------------------------------------ |
| `auth_rate` | `percent` | —                    | Share of decided card authorizations the processor approved. |

### Members & users

| Metric                  | Unit      | Filters & breakdowns                                      | Description                             |
| ----------------------- | --------- | --------------------------------------------------------- | --------------------------------------- |
| `new_users`             | `count`   | `status`, `access_level`, `most_recent_action`, `product` | Users who joined.                       |
| `users_growth`          | `count`   | —                                                         | Active members over time.               |
| `paid_active_members`   | `count`   | —                                                         | Active paying members.                  |
| `churn_rate`            | `percent` | —                                                         | Share of paying members who canceled.   |
| `trial_conversion_rate` | `percent` | —                                                         | Share of trials that converted to paid. |

### Partners

| Metric             | Unit       | Filters & breakdowns                                              | Description                                                              |
| ------------------ | ---------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `partner_earnings` | `currency` | `status`, `account_id`, `tier`. `referred_user_id` is filter-only | Commissions earned from referred businesses across both partner tiers.   |
| `partner_volume`   | `currency` | `status`, `account_id`, `tier`. `referred_user_id` is filter-only | Sales volume generated by referred businesses across both partner tiers. |

### Cards

Card metrics report spend and cashback on the account's issued Whop cards. They use only United States dollars and Coordinated Universal Time (UTC). They don't accept `convert_to` or `time_zone`. Accounts without issued cards return an empty series.

| Metric                     | Unit       | Filters & breakdowns | Description                                                                                  |
| -------------------------- | ---------- | -------------------- | -------------------------------------------------------------------------------------------- |
| `card_spend`               | `currency` | `merchant`           | Total spend on issued cards each period. Break down by `merchant` to split by merchant.      |
| `cashback`                 | `currency` | `merchant`           | Cashback earned on eligible card spend. Break down by `merchant` to split by cashback offer. |
| `cashback_qualified_spend` | `currency` | `merchant`           | Card spend that earned cashback. Break down by `merchant` to split by cashback offer.        |

### Market data

`market_prices` is publicly available without authentication, `account_id`, or `user_id`. It returns historical prices for Bitcoin (`btc`) and Gold (`xaut`) in United States dollars. It supports ranges up to one year and returns at most 2,000 points.

| Metric          | Unit       | Filters & breakdowns | Description                                                         |
| --------------- | ---------- | -------------------- | ------------------------------------------------------------------- |
| `market_prices` | `currency` | `currency`           | Market price of Bitcoin or Gold in United States dollars over time. |

### Advertising & traffic

Traffic metrics cover pixel events on the merchant's own websites plus whop.com store views, support `interval=minute` for ranges up to one hour, and cap their range at 30 days. High-cardinality breakdowns (such as `page`) return at most the top 500 entries per point.

| Metric        | Unit       | Filters & breakdowns                                                                                   | Description                                                                                                                                                                            |
| ------------- | ---------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ad_spend`    | `currency` | —                                                                                                      | Total advertising spend across the account's ad campaigns.                                                                                                                             |
| `page_visits` | `count`    | —                                                                                                      | Store page views for the account.                                                                                                                                                      |
| `events`      | `count`    | `event_name`, `custom_name`, `event_type`, `hostname`, `page`, `source`, `device_type`, `country_code` | Tracked events across the account's traffic, excluding crawlers. Filter by `event_type=page_view` or `event_type=checkout_start` for canonical counts, `event_name` for one raw event. |
| `people`      | `count`    | `hostname`, `page`, `source`, `device_type`, `country_code`                                            | Unique people across the account's traffic, deduplicated by resolved identity.                                                                                                         |

### Snapshot metrics

<Note>
  Snapshot metrics are captured once per day and preserve what was known at that
  time. They are day-only and UTC-only: `interval` must be `day` and `time_zone`
  is not accepted. You still pass `from` and `to` to choose the range of daily
  points. Use each metric's `windows` catalog field to determine which
  `snapshot_window` values it accepts.
</Note>

| Metric                                    | Unit      | `snapshot_window` | Filters & breakdowns                               | Description                                                                                                                                                      |
| ----------------------------------------- | --------- | ----------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `snapshot_receipts`                       | `count`   | `30d`             | `card_network`, `payment_method`                   | Paid receipts in the trailing 30 days.                                                                                                                           |
| `snapshot_refunds`                        | `count`   | `30d`             | —                                                  | Refunds issued in the trailing 30 days.                                                                                                                          |
| `snapshot_refund_rate`                    | `percent` | `30d`             | —                                                  | Share of trailing-30-day paid receipts refunded.                                                                                                                 |
| `snapshot_disputes`                       | `count`   | `30d`             | `card_network`, `payment_method`, `dispute_reason` | Disputes outside the Rapid Dispute Resolution (RDR) program filed in the trailing 30 days. Break down by normalized reason to build a dispute-composition chart. |
| `snapshot_dispute_rate`                   | `percent` | `30d`             | `card_network`, `payment_method`                   | Disputes filed in the trailing 30 days divided by paid receipts in that window.                                                                                  |
| `snapshot_cohorted_dispute_rate_7d_attr`  | `percent` | `7d`, `28d`       | `card_network`, `payment_method`                   | Share of the latest mature sales cohort disputed within 7 days of purchase.                                                                                      |
| `snapshot_cohorted_dispute_rate_14d_attr` | `percent` | `7d`, `28d`       | `card_network`, `payment_method`                   | Share of the latest mature sales cohort disputed within 14 days.                                                                                                 |
| `snapshot_cohorted_dispute_rate_28d_attr` | `percent` | `7d`, `28d`       | `card_network`, `payment_method`                   | Share of the latest mature sales cohort disputed within 28 days.                                                                                                 |
| `snapshot_resolution_center_cases`        | `count`   | `30d`             | —                                                  | Resolution Center cases opened in the trailing 30 days.                                                                                                          |
| `snapshot_resolution_center_case_rate`    | `percent` | `30d`             | —                                                  | Trailing-30-day Resolution Center cases divided by paid receipts.                                                                                                |
| `snapshot_approved_authorizations`        | `count`   | `30d`             | —                                                  | Card authorizations approved in the trailing 30 days.                                                                                                            |
| `snapshot_decided_authorizations`         | `count`   | `30d`             | —                                                  | Card authorizations approved or declined in the trailing 30 days.                                                                                                |
| `snapshot_auth_rate`                      | `percent` | `30d`             | —                                                  | Trailing-30-day approved authorizations divided by decided authorizations.                                                                                       |

### Cohorted dispute snapshots

Cohorted metrics attribute each dispute to the date of its original paid receipt. The attribution window in the metric name controls how long after purchase a dispute can count. The `snapshot_window` controls how many consecutive sales days contribute to a point. Use `7d` for a more reactive series or `28d` for a smoother denominator.

Each captured point uses the latest sales cohort whose complete attribution window has elapsed. For a snapshot captured on date `D`, its cohort ends on `D - attribution days - 1 day`. The extra day ensures the final attribution day is complete. To reproduce a cohort-end-date chart, plot each point on that inferred cohort end date. Comparing 7d, 14d, and 28d attribution values at the same raw API timestamp compares different mature cohorts. Align them by cohort end date before expecting `7d ≤ 14d ≤ 28d`.
