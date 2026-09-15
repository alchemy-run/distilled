---
title: Aggregate indicators by column(s)
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Threat Events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events)

[Indicators](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/indicators)

[Aggregate](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/indicators/subresources/aggregate)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Aggregate indicators by column(s)

GET/accounts/{account\_id}/cloudforce-one/events/indicators/aggregate

Aggregate threat indicators by one or more columns (e.g., indicatorType, value) across datasets. Returns top-N groups ordered by count.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Cloudforce One Write``Cloudforce One Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20cloudforce_one.threat_events.indicators.aggregate%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

aggregateBy: string

Column(s) to aggregate by - single column or comma-separated list (e.g., ‘indicatorType’, ‘value’, ‘indicatorType,value’)

[Link to this property](#)%20cloudforce_one.threat_events.indicators.aggregate%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20aggregateBy%20%3E%20(schema)>)

<details>

<summary>

createdAfter: optional stringor string

Filter indicators created after this date/datetime (ISO 8601, e.g., ‘2024-01-01’ or ‘2024-01-01T00:00:00Z’)

</summary>

One of the following:

string

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.indicators.aggregate%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20createdAfter%20%3E%20(schema)>)

<details>

<summary>

createdBefore: optional stringor string

Filter indicators created before this date/datetime (ISO 8601, e.g., ‘2024-12-31’ or ‘2024-12-31T23:59:59Z’)

</summary>

One of the following:

string

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.indicators.aggregate%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20createdBefore%20%3E%20(schema)>)

datasetIds: optional array of string

Dataset UUIDs to filter by, or one standalone scope value: ‘all’/’\*’ for all accessible datasets, ‘analytics’ for isAnalytics=true datasets, or ‘operational’ for isAnalytics=false datasets. If not provided, aggregates across all accessible datasets.

[Link to this property](#)%20cloudforce_one.threat_events.indicators.aggregate%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20datasetIds%20%3E%20(schema)>)

eventDateAfter: optional string

For measure=relationships: only count indicator→event links whose relationship was created/observed on or after this date (ISO 8601). Bounds the activity view to recently-observed links. Note: this filters by the relationship’s createdAt (link-observation time), not the underlying event’s business date.

[Link to this property](#)%20cloudforce_one.threat_events.indicators.aggregate%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20eventDateAfter%20%3E%20(schema)>)

eventDateBefore: optional string

For measure=relationships: only count indicator→event links whose relationship was created/observed on or before this date (ISO 8601). Bounds the activity view by the relationship’s createdAt (link-observation time), not the underlying event’s business date.

[Link to this property](#)%20cloudforce_one.threat_events.indicators.aggregate%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20eventDateBefore%20%3E%20(schema)>)

limit: optional number

Maximum number of aggregation results to return (1-100)

maximum100

minimum1

[Link to this property](#)%20cloudforce_one.threat_events.indicators.aggregate%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

<details>

<summary>

measure: optional "indicators"or "relationships"

What to count per group: ‘indicators’ (catalog rows, default) or ‘relationships’ (linked events per indicator). Use ‘relationships’ for ‘top indicator by event activity’.

</summary>

One of the following:

"indicators"

<a href="#">Link to this property</a>

"relationships"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.indicators.aggregate%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20measure%20%3E%20(schema)>)

tagUuid: optional string

Scope to indicators associated with this tag/actor UUID. Combine with measure=relationships for ‘top indicator for an actor’.

[Link to this property](#)%20cloudforce_one.threat_events.indicators.aggregate%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20tagUuid%20%3E%20(schema)>)

##### ReturnsExpand Collapse

aggregateBy: string

Column(s) that were aggregated by

[Link to this property](#)%20cloudforce_one.threat_events.indicators.aggregate%20%3E%20(model)%20aggregate_list_response%20%3E%20(schema)%20%3E%20(property)%20aggregateBy>)

<details>

<summary>

aggregations: array of object {count }

Array of aggregation results with dynamic fields based on aggregateBy columns

</summary>

count: number

Number of indicators for this aggregation

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.indicators.aggregate%20%3E%20(model)%20aggregate_list_response%20%3E%20(schema)%20%3E%20(property)%20aggregations>)

failedDatasets: number

Number of datasets whose aggregation failed and were excluded from the result

[Link to this property](#)%20cloudforce_one.threat_events.indicators.aggregate%20%3E%20(model)%20aggregate_list_response%20%3E%20(schema)%20%3E%20(property)%20failedDatasets>)

total: number

Total count in the aggregation: indicator rows when measure=indicators, or linked-event rows when measure=relationships

[Link to this property](#)%20cloudforce_one.threat_events.indicators.aggregate%20%3E%20(model)%20aggregate_list_response%20%3E%20(schema)%20%3E%20(property)%20total>)

### Aggregate indicators by column(s)

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/indicators/aggregate \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "aggregateBy": "aggregateBy",
  "aggregations": [
    {
      "count": 0
    }
  ],
  "failedDatasets": 0,
  "total": 0
}
```

##### Returns Examples

200 example

```
{
  "aggregateBy": "aggregateBy",
  "aggregations": [
    {
      "count": 0
    }
  ],
  "failedDatasets": 0,
  "total": 0
}
```