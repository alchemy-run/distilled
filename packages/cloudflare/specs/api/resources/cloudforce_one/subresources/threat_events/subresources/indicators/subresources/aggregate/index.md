---
title: Aggregate
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Threat Events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events)

[Indicators](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/indicators)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Aggregate

##### [Aggregate indicators by column(s)](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/indicators/subresources/aggregate/methods/list)

GET/accounts/{account\_id}/cloudforce-one/events/indicators/aggregate

##### ModelsExpand Collapse

<details>

<summary>

AggregateListResponse object {aggregateBy, aggregations, failedDatasets, total }

</summary>

aggregateBy: string

Column(s) that were aggregated by

<a href="#">Link to this property</a>

<details>

<summary>

aggregations: array of object {count }

Array of aggregation results with dynamic fields based on aggregateBy columns

</summary>

count: number

Number of indicators for this aggregation

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

failedDatasets: number

Number of datasets whose aggregation failed and were excluded from the result

<a href="#">Link to this property</a>

total: number

Total count in the aggregation: indicator rows when measure=indicators, or linked-event rows when measure=relationships

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.indicators.aggregate%20%3E%20(model)%20aggregate_list_response%20%3E%20(schema)>)