---
title: Analytics Query
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Analytics Query

##### [Query analytics summary](https://developers.cloudflare.com/api/resources/analytics_query/methods/summary)

POST/accounts/{account\_id}/analytics/query/{dataset}/summary

##### [Query analytics timeseries](https://developers.cloudflare.com/api/resources/analytics_query/methods/timeseries)

POST/accounts/{account\_id}/analytics/query/{dataset}/timeseries

##### [Query analytics top-N](https://developers.cloudflare.com/api/resources/analytics_query/methods/top_n)

POST/accounts/{account\_id}/analytics/query/{dataset}/top-n

##### ModelsExpand Collapse

<details>

<summary>

AnalyticsQuerySummaryResponse object {currentTotal, previousTotal }

</summary>

currentTotal: array of map\[unknown]

Aggregated stats for the requested time range.

<a href="#">Link to this property</a>

previousTotal: array of map\[unknown]

Aggregated stats for the equivalent preceding time range, for trend comparison.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20analytics_query%20%3E%20(model)%20analytics_query_summary_response%20%3E%20(schema)>)

<details>

<summary>

AnalyticsQueryTimeseriesResponse object {resolution, slots }

</summary>

resolution: string

The resolution used for time bucketing.

<a href="#">Link to this property</a>

slots: array of map\[unknown]

Time-bucketed result rows. Each slot contains a <code>time_bucket</code> field plus the requested stats and group-by dimensions.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20analytics_query%20%3E%20(model)%20analytics_query_timeseries_response%20%3E%20(schema)>)

AnalyticsQueryTopNResponse = map\[unknown]

Maps field names to values. Keys represent stat names and group-by column names. Values depend on the dataset (strings, numbers, booleans).

[Link to this property](#)%20analytics_query%20%3E%20(model)%20analytics_query_top_n_response%20%3E%20(schema)>)

#### Analytics QueryData Security

#### Analytics QueryData SecurityContent Findings

##### [Top integrations by content findings](https://developers.cloudflare.com/api/resources/analytics_query/subresources/data_security/subresources/content_findings/methods/top_n)

POST/accounts/{account\_id}/analytics/query/data-security/content-findings/top-n

##### ModelsExpand Collapse

ContentFindingTopNResponse = map\[unknown]

Maps field names to values. Keys represent stat names and group-by column names. Values depend on the dataset (strings, numbers, booleans).

[Link to this property](#)%20analytics_query.data_security.content_findings%20%3E%20(model)%20content_finding_top_n_response%20%3E%20(schema)>)

#### Analytics QueryData SecurityFindings

##### [Data security findings summary](https://developers.cloudflare.com/api/resources/analytics_query/subresources/data_security/subresources/findings/methods/summary)

POST/accounts/{account\_id}/analytics/query/data-security/findings/summary

##### [Data security findings timeseries](https://developers.cloudflare.com/api/resources/analytics_query/subresources/data_security/subresources/findings/methods/timeseries)

POST/accounts/{account\_id}/analytics/query/data-security/findings/timeseries

##### ModelsExpand Collapse

<details>

<summary>

FindingSummaryResponse object {currentTotal, previousTotal }

</summary>

currentTotal: array of map\[unknown]

Aggregated stats for the requested time range.

<a href="#">Link to this property</a>

previousTotal: array of map\[unknown]

Aggregated stats for the equivalent preceding time range, for trend comparison.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20analytics_query.data_security.findings%20%3E%20(model)%20finding_summary_response%20%3E%20(schema)>)

<details>

<summary>

FindingTimeseriesResponse object {slots, resolution }

Merged CASB and CDE findings timeseries result.

</summary>

slots: array of map\[unknown]

Contains time-bucketed result rows. Each slot includes a <code>timestamp</code> plus <code>content</code> and <code>posture</code> maps with <code>cloud</code> and <code>saas</code> keys.

<a href="#">Link to this property</a>

resolution: optional string

Always null for this endpoint.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20analytics_query.data_security.findings%20%3E%20(model)%20finding_timeseries_response%20%3E%20(schema)>)