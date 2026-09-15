---
title: Percentiles
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DEX](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex)

[HTTP Tests](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/http_tests)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Percentiles

##### [Get percentiles for an http test](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/http_tests/subresources/percentiles/methods/get)

GET/accounts/{account\_id}/dex/http-tests/{test\_id}/percentiles

##### ModelsExpand Collapse

<details>

<summary>

HTTPDetailsPercentiles object {dnsResponseTimeMs, resourceFetchTimeMs, serverResponseTimeMs }

</summary>

dnsResponseTimeMs: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex%20%3E%20(model)%20percentiles%20%3E%20(schema)">Percentiles</a> { p50, p90, p95, p99 }

<a href="#">Link to this property</a>

resourceFetchTimeMs: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex%20%3E%20(model)%20percentiles%20%3E%20(schema)">Percentiles</a> { p50, p90, p95, p99 }

<a href="#">Link to this property</a>

serverResponseTimeMs: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex%20%3E%20(model)%20percentiles%20%3E%20(schema)">Percentiles</a> { p50, p90, p95, p99 }

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.http_tests.percentiles%20%3E%20(model)%20http_details_percentiles%20%3E%20(schema)>)

<details>

<summary>

TestStatOverTime object {slots, avg, max, min }

</summary>

<details>

<summary>

slots: array of object {timestamp, value }

</summary>

timestamp: string

<a href="#">Link to this property</a>

value: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

avg: optional number

average observed in the time period.

<a href="#">Link to this property</a>

max: optional number

highest observed in the time period.

<a href="#">Link to this property</a>

min: optional number

lowest observed in the time period.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.http_tests.percentiles%20%3E%20(model)%20test_stat_over_time%20%3E%20(schema)>)