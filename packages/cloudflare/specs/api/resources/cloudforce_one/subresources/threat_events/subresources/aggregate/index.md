---
title: Aggregate
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Threat Events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Aggregate

##### [Aggregate events by single or multiple columns with optional date filtering](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/aggregate/methods/list)

GET/accounts/{account\_id}/cloudforce-one/events/aggregate

##### ModelsExpand Collapse

<details>

<summary>

AggregateListResponse object {aggregateBy, aggregations, total, dateRange }

</summary>

aggregateBy: string

Column(s) that were aggregated by

<a href="#">Link to this property</a>

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

<a href="#">Link to this property</a>

total: number

Total number of events in the aggregation

<a href="#">Link to this property</a>

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

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.aggregate%20%3E%20(model)%20aggregate_list_response%20%3E%20(schema)>)