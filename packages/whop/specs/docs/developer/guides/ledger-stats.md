> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Wallet Stats API

> Query aggregated financial time-series from your Fragment ledger

The Wallet Stats API gives you access to financial analytics from your Fragment ledger — the same data that powers the Whop dashboard charts. Whop automatically resolves the wallet from your API key's auth context. See the [API Reference](/api-reference/beta/ledger-stats/time-series) for the full list of parameters and allowed values.

<Note>
  The `time_series` endpoint requires the `company:balance:read` permission. See
  [Permissions](/developer/guides/permissions) to learn how to request
  permissions for your app.
</Note>

## Discover available filters

Before building queries, call the **schema** endpoint to get the full taxonomy of reporting categories, groupings, and line categories with human-readable descriptions. No authentication required.

```bash theme={null}
curl "https://api.whop.com/api/v1/stats/schema?resource_type=wallet"
```

The response tells you:

* **`reporting_categories`** — predefined report scopes (e.g. `gross_income`, `net_activity`) and which line categories each one includes
* **`groupings`** — logical buckets (e.g. `payments`, `refunds`, `disputes`) and their line categories
* **`line_categories`** — every active transaction type with its description, grouping, and which reports it belongs to

Use this to understand what filters to pass to the `time_series` endpoint. See the [Schema API Reference](/api-reference/beta/ledger-stats/schema) for the full response schema.

## Time series

```
GET https://api.whop.com/api/v1/stats/time_series?resource_type=wallet
```

Returns total `amount` and `line_count` per period. Filter with `reporting_category`, `grouping`, or `line_category` to narrow results.

Whop resolves the wallet from your API key's auth context, so the URL doesn't need an account ID.

### Parameters

| Parameter            | Type      | Default | Required | Description                                                                                                                               |
| -------------------- | --------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `resource_type`      | string    | —       | yes      | Must be `wallet`                                                                                                                          |
| `account_id`         | string    | —       | no       | Query a sub-account's wallet (e.g. `biz_xxx`). Pass `global` for platform-wide queries (admin only). Omit to use the caller's own wallet. |
| `from`               | date      | —       | yes      | Start date, International Organization for Standardization (ISO) 8601 (e.g. `2025-01-01`)                                                 |
| `to`                 | date      | —       | yes      | End date, ISO 8601 (e.g. `2025-12-31`)                                                                                                    |
| `group_by`           | string    | `month` | no       | Granularity: `day`, `week`, or `month`                                                                                                    |
| `reporting_category` | string    | all     | no       | Filter to a reporting category: `net_activity`, `gtv`, `gross_income`, `net_income`, `payment_processing_fees`                            |
| `grouping`           | string\[] | all     | no       | Filter by groupings: `payments`, `refunds`, `fees`, `disputes`, `withdrawals`, etc.                                                       |
| `line_category`      | string\[] | all     | no       | Filter by transaction types (e.g. `payment_gross`, `payment_refund`)                                                                      |
| `currency`           | string    | all     | no       | Filter to a single currency (e.g. `usd`)                                                                                                  |
| `convert_currency`   | string    | —       | no       | Convert all amounts to this currency using historical exchange rates                                                                      |
| `timezone`           | string    | `UTC`   | no       | Internet Assigned Numbers Authority (IANA) timezone for period boundaries                                                                 |

### Example

```bash theme={null}
curl "https://api.whop.com/api/v1/stats/time_series?resource_type=wallet&from=2025-01-01&to=2025-06-01&group_by=month&convert_currency=usd" \
  -H "Authorization: Bearer $WHOP_API_KEY"
```

```json theme={null}
{
  "data": [
    {
      "period": "2025-01-01",
      "amount": 14550.35,
      "line_count": 342
    }
  ],
  "metadata": {
    "wallet_id": "ldgr_xxx",
    "from": "2025-01-01",
    "to": "2025-06-01",
    "group_by": "month",
    "convert_currency": "usd",
    "timezone": "UTC"
  }
}
```

### Filtering

Use `reporting_category` to scope to a predefined set of line categories (e.g. only income-related activity):

```bash theme={null}
curl "...?resource_type=wallet&from=2025-01-01&to=2025-06-01&group_by=month&reporting_category=gross_income" \
  -H "Authorization: Bearer $WHOP_API_KEY"
```

Use `grouping` to narrow to specific groupings (e.g. only payments and refunds):

```bash theme={null}
curl "...?resource_type=wallet&from=2025-01-01&to=2025-06-01&group_by=month&grouping[]=payments&grouping[]=refunds" \
  -H "Authorization: Bearer $WHOP_API_KEY"
```

Use `line_category` for the most granular filtering:

```bash theme={null}
curl "...?resource_type=wallet&from=2025-01-01&to=2025-06-01&group_by=month&line_category[]=payment_gross&line_category[]=payment_refund" \
  -H "Authorization: Bearer $WHOP_API_KEY"
```

You can combine all three filters. Whop applies `reporting_category` first, then `grouping`, and then `line_category`.

### Global queries

Pass `account_id=global` to query aggregated data across all wallets. This requires admin access.

```bash theme={null}
curl "https://api.whop.com/api/v1/stats/time_series?resource_type=wallet&account_id=global&from=2025-01-01&to=2025-06-01&group_by=month&convert_currency=usd" \
  -H "Authorization: Bearer $WHOP_API_KEY"
```

Global queries omit `wallet_id` from the response metadata since data spans all wallets.

### Currency handling

There are two separate currency controls: **filter** and **convert**.

**Filter** — `currency` restricts rows to a single currency:

```bash theme={null}
curl "...?resource_type=wallet&from=2025-01-01&to=2025-06-01&group_by=month&currency=usd" \
  -H "Authorization: Bearer $WHOP_API_KEY"
```

**Convert** — `convert_currency` converts all amounts to a target currency using historical exchange rates, collapsing multi-currency rows into one per period:

```bash theme={null}
curl "...?resource_type=wallet&from=2025-01-01&to=2025-06-01&group_by=month&convert_currency=usd" \
  -H "Authorization: Bearer $WHOP_API_KEY"
```

When you set neither, rows include a `currency` field and you may get multiple rows per period (one per currency):

```json theme={null}
{
  "data": [
    { "period": "2025-01-01", "currency": "usd", "amount": 14550.35, "line_count": 300 },
    { "period": "2025-01-01", "currency": "eur", "amount": 3200.00, "line_count": 42 }
  ]
}
```

You can combine both: `currency=eur&convert_currency=usd` filters to euro rows, then converts them to United States dollars.

### Errors

| Status | Cause                                                                                        |
| ------ | -------------------------------------------------------------------------------------------- |
| 400    | Missing or invalid parameters (including missing `resource_type`)                            |
| 401    | Missing or invalid API key                                                                   |
| 403    | API key lacks `company:balance:read` permission, or `account_id=global` without admin access |
