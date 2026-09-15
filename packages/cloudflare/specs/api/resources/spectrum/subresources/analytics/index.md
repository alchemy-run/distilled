---
title: Analytics
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Spectrum](https://developers.cloudflare.com/api/resources/spectrum)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Analytics

#### AnalyticsAggregates

#### AnalyticsAggregatesCurrents

##### [Get current aggregated analytics](https://developers.cloudflare.com/api/resources/spectrum/subresources/analytics/subresources/aggregates/subresources/currents/methods/get)

GET/zones/{zone\_id}/spectrum/analytics/aggregate/current

##### ModelsExpand Collapse

<details>

<summary>

CurrentGetResponse = array of object {appID, bytesEgress, bytesIngress, 2 more }

</summary>

appID: string

Application identifier.

maxLength32

<a href="#">Link to this property</a>

bytesEgress: number

Number of bytes sent.

<a href="#">Link to this property</a>

bytesIngress: number

Number of bytes received.

<a href="#">Link to this property</a>

connections: number

Number of connections.

<a href="#">Link to this property</a>

durationAvg: number

Average duration of connections.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20spectrum.analytics.aggregates.currents%20%3E%20(model)%20current_get_response%20%3E%20(schema)>)

#### AnalyticsEvents

##### ModelsExpand Collapse

<details>

<summary>

Dimension = "event"or "appID"or "coloName"or "ipVersion"

</summary>

One of the following:

"event"

<a href="#">Link to this property</a>

"appID"

<a href="#">Link to this property</a>

"coloName"

<a href="#">Link to this property</a>

"ipVersion"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20spectrum.analytics.events%20%3E%20(model)%20dimension%20%3E%20(schema)>)

#### AnalyticsEventsBytimes

##### [Get analytics by time](https://developers.cloudflare.com/api/resources/spectrum/subresources/analytics/subresources/events/subresources/bytimes/methods/get)

GET/zones/{zone\_id}/spectrum/analytics/events/bytime

##### ModelsExpand Collapse

<details>

<summary>

BytimeGetResponse object {data, data\_lag, max, 5 more }

</summary>

<details>

<summary>

data: array of object {dimensions, metrics }

List of columns returned by the analytics query.

</summary>

dimensions: optional array of string

<a href="#">Link to this property</a>

<details>

<summary>

metrics: optional array of numberor array of array of number

</summary>

One of the following:

array of number

<a href="#">Link to this property</a>

array of array of number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

data\_lag: number

Number of seconds between current time and last processed event, i.e. how many seconds of data could be missing.

minimum0

<a href="#">Link to this property</a>

max: map\[number]

Maximum result for each selected metrics across all data.

<a href="#">Link to this property</a>

min: map\[number]

Minimum result for each selected metrics across all data.

<a href="#">Link to this property</a>

<details>

<summary>

query: object {dimensions, filters, limit, 4 more }

</summary>

<details>

<summary>

dimensions: optional array of <a href="https://developers.cloudflare.com/api/resources/spectrum#(resource)%20spectrum.analytics.events%20%3E%20(model)%20dimension%20%3E%20(schema)">Dimension</a>

Can be used to break down the data by given attributes. Options are:

| Dimension | Name | Example |
| --- | --- | --- |
| event | Connection Event | connect, progress, disconnect, originError, clientFiltered |
| appID | Application ID | 40d67c87c6cd4b889a4fd57805225e85 |
| coloName | Colo Name | SFO |
| ipVersion | IP version used by the client | 4, 6. |

</summary>

One of the following:

"event"

<a href="#">Link to this property</a>

"appID"

<a href="#">Link to this property</a>

"coloName"

<a href="#">Link to this property</a>

"ipVersion"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

filters: optional string

Used to filter rows by one or more dimensions. Filters can be combined using OR and AND boolean logic. AND takes precedence over OR in all the expressions. The OR operator is defined using a comma (,) or OR keyword surrounded by whitespace. The AND operator is defined using a semicolon (;) or AND keyword surrounded by whitespace. Note that the semicolon is a reserved character in URLs (rfc1738) and needs to be percent-encoded as %3B. Comparison options are:

| Operator | Name | URL Encoded |
| --- | --- | --- |
| == | Equals | %3D%3D |
| != | Does not equals | !%3D |
| &gt; | Greater Than | %3E |
| &lt; | Less Than | %3C |
| &gt;= | Greater than or equal to | %3E%3D |
| &lt;= | Less than or equal to | %3C%3D |

Use the above to construct filters.

<a href="#">Link to this property</a>

limit: optional number

Limit number of returned metrics.

<a href="#">Link to this property</a>

<details>

<summary>

metrics: optional array of "count"or "bytesIngress"or "bytesEgress"or 4 more

One or more metrics to compute. Options are:

| Metric | Name | Example | Unit |
| --- | --- | --- | --- |
| count | Count of total events | 1000 | Count |
| bytesIngress | Sum of ingress bytes | 1000 | Sum |
| bytesEgress | Sum of egress bytes | 1000 | Sum |
| durationAvg | Average connection duration | 1.0 | Time in milliseconds |
| durationMedian | Median connection duration | 1.0 | Time in milliseconds |
| duration90th | 90th percentile connection duration | 1.0 | Time in milliseconds |
| duration99th | 99th percentile connection duration | 1.0 | Time in milliseconds. |

</summary>

One of the following:

"count"

<a href="#">Link to this property</a>

"bytesIngress"

<a href="#">Link to this property</a>

"bytesEgress"

<a href="#">Link to this property</a>

"durationAvg"

<a href="#">Link to this property</a>

"durationMedian"

<a href="#">Link to this property</a>

"duration90th"

<a href="#">Link to this property</a>

"duration99th"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

since: optional string

Start of time interval to query, defaults to <code>until</code> - 6 hours. Timestamp must be in RFC3339 format and uses UTC unless otherwise specified.

formatdate-time

<a href="#">Link to this property</a>

sort: optional array of string

The sort order for the result set; sort fields must be included in <code>metrics</code> or <code>dimensions</code>.

<a href="#">Link to this property</a>

until: optional string

End of time interval to query, defaults to current time. Timestamp must be in RFC3339 format and uses UTC unless otherwise specified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

rows: number

Total number of rows in the result.

minimum0

<a href="#">Link to this property</a>

totals: map\[number]

Total result for each selected metrics across all data.

<a href="#">Link to this property</a>

time\_intervals: optional array of array of string

List of time interval buckets: \[start, end].

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20spectrum.analytics.events.bytimes%20%3E%20(model)%20bytime_get_response%20%3E%20(schema)>)

#### AnalyticsEventsSummaries

##### [Get analytics summary](https://developers.cloudflare.com/api/resources/spectrum/subresources/analytics/subresources/events/subresources/summaries/methods/get)

GET/zones/{zone\_id}/spectrum/analytics/events/summary

##### ModelsExpand Collapse

<details>

<summary>

SummaryGetResponse object {data, data\_lag, max, 5 more }

</summary>

<details>

<summary>

data: array of object {dimensions, metrics }

List of columns returned by the analytics query.

</summary>

dimensions: optional array of string

<a href="#">Link to this property</a>

<details>

<summary>

metrics: optional array of numberor array of array of number

</summary>

One of the following:

array of number

<a href="#">Link to this property</a>

array of array of number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

data\_lag: number

Number of seconds between current time and last processed event, i.e. how many seconds of data could be missing.

minimum0

<a href="#">Link to this property</a>

max: map\[number]

Maximum result for each selected metrics across all data.

<a href="#">Link to this property</a>

min: map\[number]

Minimum result for each selected metrics across all data.

<a href="#">Link to this property</a>

<details>

<summary>

query: object {dimensions, filters, limit, 4 more }

</summary>

<details>

<summary>

dimensions: optional array of <a href="https://developers.cloudflare.com/api/resources/spectrum#(resource)%20spectrum.analytics.events%20%3E%20(model)%20dimension%20%3E%20(schema)">Dimension</a>

Can be used to break down the data by given attributes. Options are:

| Dimension | Name | Example |
| --- | --- | --- |
| event | Connection Event | connect, progress, disconnect, originError, clientFiltered |
| appID | Application ID | 40d67c87c6cd4b889a4fd57805225e85 |
| coloName | Colo Name | SFO |
| ipVersion | IP version used by the client | 4, 6. |

</summary>

One of the following:

"event"

<a href="#">Link to this property</a>

"appID"

<a href="#">Link to this property</a>

"coloName"

<a href="#">Link to this property</a>

"ipVersion"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

filters: optional string

Used to filter rows by one or more dimensions. Filters can be combined using OR and AND boolean logic. AND takes precedence over OR in all the expressions. The OR operator is defined using a comma (,) or OR keyword surrounded by whitespace. The AND operator is defined using a semicolon (;) or AND keyword surrounded by whitespace. Note that the semicolon is a reserved character in URLs (rfc1738) and needs to be percent-encoded as %3B. Comparison options are:

| Operator | Name | URL Encoded |
| --- | --- | --- |
| == | Equals | %3D%3D |
| != | Does not equals | !%3D |
| &gt; | Greater Than | %3E |
| &lt; | Less Than | %3C |
| &gt;= | Greater than or equal to | %3E%3D |
| &lt;= | Less than or equal to | %3C%3D |

Use the above to construct filters.

<a href="#">Link to this property</a>

limit: optional number

Limit number of returned metrics.

<a href="#">Link to this property</a>

<details>

<summary>

metrics: optional array of "count"or "bytesIngress"or "bytesEgress"or 4 more

One or more metrics to compute. Options are:

| Metric | Name | Example | Unit |
| --- | --- | --- | --- |
| count | Count of total events | 1000 | Count |
| bytesIngress | Sum of ingress bytes | 1000 | Sum |
| bytesEgress | Sum of egress bytes | 1000 | Sum |
| durationAvg | Average connection duration | 1.0 | Time in milliseconds |
| durationMedian | Median connection duration | 1.0 | Time in milliseconds |
| duration90th | 90th percentile connection duration | 1.0 | Time in milliseconds |
| duration99th | 99th percentile connection duration | 1.0 | Time in milliseconds. |

</summary>

One of the following:

"count"

<a href="#">Link to this property</a>

"bytesIngress"

<a href="#">Link to this property</a>

"bytesEgress"

<a href="#">Link to this property</a>

"durationAvg"

<a href="#">Link to this property</a>

"durationMedian"

<a href="#">Link to this property</a>

"duration90th"

<a href="#">Link to this property</a>

"duration99th"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

since: optional string

Start of time interval to query, defaults to <code>until</code> - 6 hours. Timestamp must be in RFC3339 format and uses UTC unless otherwise specified.

formatdate-time

<a href="#">Link to this property</a>

sort: optional array of string

The sort order for the result set; sort fields must be included in <code>metrics</code> or <code>dimensions</code>.

<a href="#">Link to this property</a>

until: optional string

End of time interval to query, defaults to current time. Timestamp must be in RFC3339 format and uses UTC unless otherwise specified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

rows: number

Total number of rows in the result.

minimum0

<a href="#">Link to this property</a>

totals: map\[number]

Total result for each selected metrics across all data.

<a href="#">Link to this property</a>

time\_intervals: optional array of array of string

List of time interval buckets: \[start, end].

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20spectrum.analytics.events.summaries%20%3E%20(model)%20summary_get_response%20%3E%20(schema)>)