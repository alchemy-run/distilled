---
title: HTTP Tests
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DEX](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# HTTP Tests

##### [Get details and aggregate metrics for an http test](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/http_tests/methods/get)

GET/accounts/{account\_id}/dex/http-tests/{test\_id}

##### ModelsExpand Collapse

<details>

<summary>

HTTPDetails object {host, httpStats, httpStatsByColo, 6 more }

</summary>

host: optional string

The url of the HTTP synthetic application test.

<a href="#">Link to this property</a>

<details>

<summary>

httpStats: optional object {availabilityPct, dnsResponseTimeMs, httpStatusCode, 3 more }

</summary>

<details>

<summary>

availabilityPct: object {slots, avg, max, min }

</summary>

<details>

<summary>

slots: array of object {timestamp, value }

</summary>

timestamp: string

<a href="#">Link to this property</a>

value: number

formatfloat

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

avg: optional number

average observed in the time period.

formatfloat

<a href="#">Link to this property</a>

max: optional number

highest observed in the time period.

formatfloat

<a href="#">Link to this property</a>

min: optional number

lowest observed in the time period.

formatfloat

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

dnsResponseTimeMs: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.http_tests.percentiles%20%3E%20(model)%20test_stat_over_time%20%3E%20(schema)">TestStatOverTime</a> { slots, avg, max, min }

<a href="#">Link to this property</a>

<details>

<summary>

httpStatusCode: array of object {status200, status300, status400, 2 more }

</summary>

status200: number

<a href="#">Link to this property</a>

status300: number

<a href="#">Link to this property</a>

status400: number

<a href="#">Link to this property</a>

status500: number

<a href="#">Link to this property</a>

timestamp: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

resourceFetchTimeMs: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.http_tests.percentiles%20%3E%20(model)%20test_stat_over_time%20%3E%20(schema)">TestStatOverTime</a> { slots, avg, max, min }

<a href="#">Link to this property</a>

serverResponseTimeMs: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.http_tests.percentiles%20%3E%20(model)%20test_stat_over_time%20%3E%20(schema)">TestStatOverTime</a> { slots, avg, max, min }

<a href="#">Link to this property</a>

uniqueDevicesTotal: number

Count of unique devices that have run this test in the given time period.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

httpStatsByColo: optional array of object {availabilityPct, colo, dnsResponseTimeMs, 4 more }

</summary>

<details>

<summary>

availabilityPct: object {slots, avg, max, min }

</summary>

<details>

<summary>

slots: array of object {timestamp, value }

</summary>

timestamp: string

<a href="#">Link to this property</a>

value: number

formatfloat

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

avg: optional number

average observed in the time period.

formatfloat

<a href="#">Link to this property</a>

max: optional number

highest observed in the time period.

formatfloat

<a href="#">Link to this property</a>

min: optional number

lowest observed in the time period.

formatfloat

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

colo: string

<a href="#">Link to this property</a>

dnsResponseTimeMs: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.http_tests.percentiles%20%3E%20(model)%20test_stat_over_time%20%3E%20(schema)">TestStatOverTime</a> { slots, avg, max, min }

<a href="#">Link to this property</a>

<details>

<summary>

httpStatusCode: array of object {status200, status300, status400, 2 more }

</summary>

status200: number

<a href="#">Link to this property</a>

status300: number

<a href="#">Link to this property</a>

status400: number

<a href="#">Link to this property</a>

status500: number

<a href="#">Link to this property</a>

timestamp: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

resourceFetchTimeMs: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.http_tests.percentiles%20%3E%20(model)%20test_stat_over_time%20%3E%20(schema)">TestStatOverTime</a> { slots, avg, max, min }

<a href="#">Link to this property</a>

serverResponseTimeMs: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex.http_tests.percentiles%20%3E%20(model)%20test_stat_over_time%20%3E%20(schema)">TestStatOverTime</a> { slots, avg, max, min }

<a href="#">Link to this property</a>

uniqueDevicesTotal: number

Count of unique devices that have run this test in the given time period.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

interval: optional string

The interval at which the HTTP synthetic application test is set to run.

<a href="#">Link to this property</a>

kind: optional "http"

<a href="#">Link to this property</a>

method: optional string

The HTTP method to use when running the test.

<a href="#">Link to this property</a>

name: optional string

The name of the HTTP synthetic application test.

<a href="#">Link to this property</a>

<details>

<summary>

target\_policies: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.dex%20%3E%20(model)%20digital_experience_monitor%20%3E%20(schema)">DigitalExperienceMonitor</a> { id, default, name }

</summary>

id: string

API Resource UUID tag.

maxLength36

<a href="#">Link to this property</a>

default: boolean

Whether the policy is the default for the account.

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

targeted: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.http_tests%20%3E%20(model)%20http_details%20%3E%20(schema)>)

#### HTTP TestsPercentiles

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