---
title: Agent Readiness
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Agent Readiness

##### [Get agent readiness summary](https://developers.cloudflare.com/api/resources/radar/subresources/agent_readiness/methods/summary)

GET/radar/agent\_readiness/summary/{dimension}

##### ModelsExpand Collapse

<details>

<summary>

AgentReadinessSummaryResponse object {meta, summary\_0 }

</summary>

<details>

<summary>

meta: object {date, domainCategories, lastUpdated, 4 more }

</summary>

date: string

Date of the returned scan (YYYY-MM-DD). May differ from the requested date if no scan exists for that exact date.

<a href="#">Link to this property</a>

<details>

<summary>

domainCategories: array of object {name, value }

Available domain sub-categories with their scan counts. Use as filter options for the domainCategory parameter.

</summary>

name: string

Sub-category name.

<a href="#">Link to this property</a>

value: number

Number of successfully scanned domains in this sub-category.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

lastUpdated: string

Timestamp of the last dataset update.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

normalization: "PERCENTAGE"or "MIN0\_MAX"or "MIN\_MAX"or 5 more

Normalization method applied to the results. Refer to <a href="https://developers.cloudflare.com/radar/concepts/normalization/">Normalization methods</a>.

</summary>

One of the following:

"PERCENTAGE"

<a href="#">Link to this property</a>

"MIN0\_MAX"

<a href="#">Link to this property</a>

"MIN\_MAX"

<a href="#">Link to this property</a>

"RAW\_VALUES"

<a href="#">Link to this property</a>

"PERCENTAGE\_CHANGE"

<a href="#">Link to this property</a>

"ROLLING\_AVERAGE"

<a href="#">Link to this property</a>

"OVERLAPPED\_PERCENTAGE"

<a href="#">Link to this property</a>

"RATIO"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

successfulDomains: number

Domains successfully scanned (excludes errors).

<a href="#">Link to this property</a>

totalDomains: number

Total domains attempted in the scan.

<a href="#">Link to this property</a>

<details>

<summary>

units: array of object {name, value }

Measurement units for the results.

</summary>

name: string

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

summary\_0: map\[string]

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.agent_readiness%20%3E%20(model)%20agent_readiness_summary_response%20%3E%20(schema)>)