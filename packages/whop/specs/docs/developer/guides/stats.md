> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Stats API

> Explore and query analytics data for your account

The Stats API gives you access to your account's analytics data. It's designed to be self-exploratory - use the describe endpoints to discover what data is available, then query raw records or pre-defined metrics.

<Note>
  The Stats API requires the `stats:read` permission. See
  [Permissions](/developer/guides/permissions) to learn how to request
  permissions for your app.
</Note>

## Getting started

The API explains its available data. Start by calling the describe endpoint to see what's available:

```bash theme={null}
curl "https://api.whop.com/api/v1/stats/describe?company_id=YOUR_ACCOUNT_ID" \
  -H "Authorization: Bearer $WHOP_API_KEY"
```

This returns the available data nodes, views, and metrics you can query. The response varies based on your permissions and what data exists for your account.

## Core concepts

The Stats API has three main operations:

| Operation    | Purpose                                                                 |
| ------------ | ----------------------------------------------------------------------- |
| **Describe** | Discover available nodes, views, columns, metrics, and their parameters |
| **Raw**      | Query paginated rows from any data node or view                         |
| **Metric**   | Get pre-defined aggregated time-series data                             |

All endpoints are `GET` requests. The `resource` parameter uses `:` as a separator for paths (e.g., `receipts:gross_revenue`).

## Exploring the schema

Use describe to navigate the API. It works at any level:

```bash theme={null}
# What nodes, views, and metrics are available?
curl "https://api.whop.com/api/v1/stats/describe?company_id=YOUR_ACCOUNT_ID" \
  -H "Authorization: Bearer $WHOP_API_KEY"

# What columns does a specific node have?
curl "https://api.whop.com/api/v1/stats/describe?resource=receipts&company_id=YOUR_ACCOUNT_ID" \
  -H "Authorization: Bearer $WHOP_API_KEY"

# What parameters does a metric support?
curl "https://api.whop.com/api/v1/stats/describe?resource=receipts:gross_revenue&company_id=YOUR_ACCOUNT_ID" \
  -H "Authorization: Bearer $WHOP_API_KEY"
```

The describe response tells you:

* Available columns and their types
* Associations to other nodes (for joins)
* Supported filters and breakdowns (for metrics)
* Example data to understand the shape

<Info>
  The API is designed to be AI-friendly. Point an AI assistant at the describe
  endpoints and it can explore your data, understand the schema, and help you
  build queries.
</Info>

## Querying raw data

Fetch paginated rows from any node or view:

```bash theme={null}
# Basic query
curl "https://api.whop.com/api/v1/stats/raw?resource=receipts&company_id=YOUR_ACCOUNT_ID" \
  -H "Authorization: Bearer $WHOP_API_KEY"

# With parameters
curl "https://api.whop.com/api/v1/stats/raw?resource=receipts&limit=50&from=1704067200&to=1706745600&company_id=YOUR_ACCOUNT_ID" \
  -H "Authorization: Bearer $WHOP_API_KEY"
```

You can join related nodes by chaining paths with `:`:

```bash theme={null}
# Members with their receipts
curl "https://api.whop.com/api/v1/stats/raw?resource=members:receipts&company_id=YOUR_ACCOUNT_ID" \
  -H "Authorization: Bearer $WHOP_API_KEY"
```

### Response format

```json theme={null}
{
  "columns": ["id", "status", "final_amount"],
  "data": [["pay_abc123", "paid", 2999], ...],
  "node": "receipts",
  "debug": {
    "engine": "planetscale",
    "request_id": "2524d58d-e06e-4e27-ac7d-dcc2bc7f964e",
    "sql": "SELECT ..."
  },
  "pagination": {
    "next_cursor": "eyJpZCI6MTIzNDV9"
  }
}
```

Use `cursor` from the response for pagination:

```bash theme={null}
curl "https://api.whop.com/api/v1/stats/raw?resource=receipts&cursor=eyJpZCI6MTIzNDV9&company_id=YOUR_ACCOUNT_ID" \
  -H "Authorization: Bearer $WHOP_API_KEY"
```

## Querying metrics

Metrics are pre-defined aggregations. Call describe on a metric to see its available filters and breakdowns:

```bash theme={null}
# What can I filter/breakdown by?
curl "https://api.whop.com/api/v1/stats/describe?resource=gross_revenue&company_id=YOUR_ACCOUNT_ID" \
  -H "Authorization: Bearer $WHOP_API_KEY"

# Query the metric
curl "https://api.whop.com/api/v1/stats/metric?resource=gross_revenue&granularity=daily&company_id=YOUR_ACCOUNT_ID" \
  -H "Authorization: Bearer $WHOP_API_KEY"

# With breakdown
curl "https://api.whop.com/api/v1/stats/metric?resource=gross_revenue&granularity=monthly&breakdowns[]=currency&company_id=YOUR_ACCOUNT_ID" \
  -H "Authorization: Bearer $WHOP_API_KEY"

# With filter
curl "https://api.whop.com/api/v1/stats/metric?resource=gross_revenue&filters[currency]=usd&company_id=YOUR_ACCOUNT_ID" \
  -H "Authorization: Bearer $WHOP_API_KEY"
```

Granularity options: `daily`, `weekly`, `monthly`

## Common parameters

| Parameter         | Description                                                                    |
| ----------------- | ------------------------------------------------------------------------------ |
| `company_id`      | Account to scope the query to (required unless using `user_id`)                |
| `user_id`         | User to scope the query to                                                     |
| `resource`        | Resource path using `:` as separator (e.g., `receipts`, `payments:membership`) |
| `from`            | Start of time range (Unix timestamp)                                           |
| `to`              | End of time range (Unix timestamp)                                             |
| `limit`           | Records per page (default 10, maximum 10000)                                   |
| `cursor`          | Pagination cursor from previous response                                       |
| `sort`            | Column to sort by                                                              |
| `sort_direction`  | `asc` or `desc`                                                                |
| `granularity`     | For metrics: `daily`, `weekly`, `monthly`                                      |
| `breakdowns[]`    | For metrics: columns to group by                                               |
| `filters[column]` | For metrics: filter by column value                                            |

## Error responses

Errors include a `debug` field with a `request_id` for debugging:

```json theme={null}
{
	"error": {
		"message": "Unknown node: invalid_node",
		"type": "bad_request",
		"debug": {
			"request_id": "2524d58d-e06e-4e27-ac7d-dcc2bc7f964e"
		}
	}
}
```
