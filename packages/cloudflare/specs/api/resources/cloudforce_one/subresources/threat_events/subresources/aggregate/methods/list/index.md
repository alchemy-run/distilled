---
title: Aggregate events by single or multiple columns with optional date filtering
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Threat Events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events)

[Aggregate](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/aggregate)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Aggregate events by single or multiple columns with optional date filtering

GET/accounts/{account\_id}/cloudforce-one/events/aggregate

Aggregate threat events by one or more columns (e.g., attacker, targetIndustry) with optional date filtering and daily grouping. Supports multi-dimensional aggregation for cross-analysis.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.threat_events.aggregate%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

aggregateBy: string

Column(s) to aggregate by - single column or comma-separated list (e.g., ‘attacker’, ‘targetIndustry’, ‘attacker,targetIndustry’)

[Link to this property](#)%20cloudforce_one.threat_events.aggregate%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20aggregateBy%20%3E%20(schema)>)

datasetId: optional array of string

Dataset UUIDs to filter by, or one standalone scope value: ‘all’/’\*’ for all accessible non-analytics event datasets (analytics datasets are silently excluded), ‘analytics’ for isAnalytics=true datasets, or ‘operational’ for isAnalytics=false datasets. If not provided, uses the default dataset.

[Link to this property](#)%20cloudforce_one.threat_events.aggregate%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20datasetId%20%3E%20(schema)>)

endDate: optional string

End date for filtering (ISO 8601 format, e.g., ‘2024-12-31’)

[Link to this property](#)%20cloudforce_one.threat_events.aggregate%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20endDate%20%3E%20(schema)>)

groupByDate: optional boolean

Whether to group results by date (daily aggregation)

[Link to this property](#)%20cloudforce_one.threat_events.aggregate%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20groupByDate%20%3E%20(schema)>)

limit: optional number

Maximum number of results to return

[Link to this property](#)%20cloudforce_one.threat_events.aggregate%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

startDate: optional string

Start date for filtering (ISO 8601 format, e.g., ‘2024-01-01’)

[Link to this property](#)%20cloudforce_one.threat_events.aggregate%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20startDate%20%3E%20(schema)>)

##### ReturnsExpand Collapse

aggregateBy: string

Column(s) that were aggregated by

[Link to this property](#)%20cloudforce_one.threat_events.aggregate%20%3E%20(model)%20aggregate_list_response%20%3E%20(schema)%20%3E%20(property)%20aggregateBy>)

<details>

<summary>

aggregations: array of object {count, date }

Array of aggregation results with dynamic fields based on aggregateBy columns

</summary>

count: number

Number of events for this aggregation

<a href="#">Link to this property</a>

date: optional string

Date (if groupByDate is true)

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.aggregate%20%3E%20(model)%20aggregate_list_response%20%3E%20(schema)%20%3E%20(property)%20aggregations>)

total: number

Total number of events in the aggregation

[Link to this property](#)%20cloudforce_one.threat_events.aggregate%20%3E%20(model)%20aggregate_list_response%20%3E%20(schema)%20%3E%20(property)%20total>)

<details>

<summary>

dateRange: optional object {endDate, startDate }

Date range used for filtering

</summary>

endDate: optional string

<a href="#">Link to this property</a>

startDate: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.aggregate%20%3E%20(model)%20aggregate_list_response%20%3E%20(schema)%20%3E%20(property)%20dateRange>)

### Aggregate events by single or multiple columns with optional date filtering

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/aggregate \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "aggregateBy": "aggregateBy",
  "aggregations": [
    {
      "count": 0,
      "date": "date"
    }
  ],
  "total": 0,
  "dateRange": {
    "endDate": "endDate",
    "startDate": "startDate"
  }
}
```

##### Returns Examples

200 example

```
{
  "aggregateBy": "aggregateBy",
  "aggregations": [
    {
      "count": 0,
      "date": "date"
    }
  ],
  "total": 0,
  "dateRange": {
    "endDate": "endDate",
    "startDate": "startDate"
  }
}
```