---
title: Data Security
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Analytics Query](https://developers.cloudflare.com/api/resources/analytics_query)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Data Security

#### Data SecurityContent Findings

##### [Top integrations by content findings](https://developers.cloudflare.com/api/resources/analytics_query/subresources/data_security/subresources/content_findings/methods/top_n)

POST/accounts/{account\_id}/analytics/query/data-security/content-findings/top-n

##### ModelsExpand Collapse

ContentFindingTopNResponse = map\[unknown]

Maps field names to values. Keys represent stat names and group-by column names. Values depend on the dataset (strings, numbers, booleans).

[Link to this property](#)%20analytics_query.data_security.content_findings%20%3E%20(model)%20content_finding_top_n_response%20%3E%20(schema)>)

#### Data SecurityFindings

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