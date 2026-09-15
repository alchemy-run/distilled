---
title: Create a sharable link to a query result
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers](https://developers.cloudflare.com/api/resources/workers)

[Observability](https://developers.cloudflare.com/api/resources/workers/subresources/observability)

[Shared Queries](https://developers.cloudflare.com/api/resources/workers/subresources/observability/subresources/shared_queries)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create a sharable link to a query result

POST/accounts/{account\_id}/workers/observability/shared/query

Shared queries store the results of a previously run query, allowing you to share the results with others.

##### Security

<details>

<summary>API Email + API Key</summary>



The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**<code>X-Auth-Email: user@example.com</code>

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**<code>X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194</code>

</details>

<details>

<summary>API Token</summary>



The preferred authorization scheme for interacting with the Cloudflare API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/create-token/">Create a token</a>.

**Example:**<code>Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY</code>

</details>

<details>

<summary>User Service Key</summary>



Used when interacting with the Origin CA certificates API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/ca-keys/#viewchange-your-origin-ca-keys">View/change your key</a>.

**Example:**<code>X-Auth-User-Service-Key: v1.0-144c9defac04969c7bfad8ef-631a41d003a32d25fe878081ef365c49503f7fada600da935e2851a1c7326084b85cbf6429c4b859de8475731dc92a9c329631e6d59e6c73da7b198497172b4cefe071d90d0f5d2719</code>

</details>

##### Accepted Permissions (at least one required)

`Workers Observability Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20workers.observability.shared_queries%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

queryId: string

Identifier for the query. When parameters are omitted, this ID is used to load a previously saved query’s parameters. When providing parameters inline, pass any identifier (e.g. an ad-hoc ID).

[Link to this property](#)%20workers.observability.shared_queries%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20queryId%20%3E%20(schema)>)

<details>

<summary>

timeframe: object {from, to }

Timeframe for the query using Unix timestamps in milliseconds. ‘from’ must be earlier than ‘to’. Narrower timeframes produce faster responses and more specific results.

</summary>

from: number

Start timestamp for the query timeframe. Unix timestamp in milliseconds

maximum253402300799999

minimum0

<a href="#">Link to this property</a>

to: number

End timestamp for the query timeframe. Unix timestamp in milliseconds

maximum253402300799999

minimum0

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.observability.shared_queries%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20timeframe%20%3E%20(schema)>)

chart: optional boolean

When true, includes time-series data in the response.

[Link to this property](#)%20workers.observability.shared_queries%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20chart%20%3E%20(schema)>)

<details>

<summary>

chartType: optional "timeseries\_and\_aggregate"or "timeseries"or "aggregate"or "distribution"

Controls the SQL shape and response payload for the ‘calculations’ view. Omitted or ‘timeseries\_and\_aggregate’: current behaviour — both the time-series and aggregate queries. ‘timeseries’: time-series only. ‘aggregate’: aggregate only. ‘distribution’: a bucketed 2D histogram (time × value buckets) returned in ‘distribution’ instead of ‘calculations’. ‘distribution’ is not compatible with ‘compare’ — combining them returns a 400.

</summary>

One of the following:

"timeseries\_and\_aggregate"

<a href="#">Link to this property</a>

"timeseries"

<a href="#">Link to this property</a>

"aggregate"

<a href="#">Link to this property</a>

"distribution"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.observability.shared_queries%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20chartType%20%3E%20(schema)>)

compare: optional boolean

When true, includes a comparison dataset from the previous time period of equal length.

[Link to this property](#)%20workers.observability.shared_queries%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20compare%20%3E%20(schema)>)

<details>

<summary>

distributionScale: optional "log"or "linear"

Value-axis bucketing for chartType ‘distribution’. Omitted or ‘log’: geometric buckets, best for heavy-tailed latency. ‘linear’: fixed-width buckets, clearer for narrow or additive ranges. Ignored for other chartTypes. The response echoes the scheme used in distribution.bucketMode.

</summary>

One of the following:

"log"

<a href="#">Link to this property</a>

"linear"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.observability.shared_queries%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20distributionScale%20%3E%20(schema)>)

dry: optional boolean

When true, executes the query without persisting the results. Useful for validation or previewing.

[Link to this property](#)%20workers.observability.shared_queries%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20dry%20%3E%20(schema)>)

granularity: optional number

Number of time-series buckets. Only used when view is ‘calculations’. Omit to let the system auto-detect an appropriate granularity.

[Link to this property](#)%20workers.observability.shared_queries%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20granularity%20%3E%20(schema)>)

ignoreSeries: optional boolean

When true, omits time-series data from the response and returns only aggregated values. Reduces response size when series are not needed.

[Link to this property](#)%20workers.observability.shared_queries%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20ignoreSeries%20%3E%20(schema)>)

limit: optional number

Maximum number of events to return when view is ‘events’. Also controls the number of group-by rows when view is ‘calculations’.

maximum2000

[Link to this property](#)%20workers.observability.shared_queries%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20limit%20%3E%20(schema)>)

offset: optional string

Cursor for pagination in event, trace, invocation, and agent views. Pass the $metadata.id of the last event, the trace cursor, or AgentRun.id to fetch the next page.

[Link to this property](#)%20workers.observability.shared_queries%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20offset%20%3E%20(schema)>)

offsetBy: optional number

Numeric offset for paginating grouped/pattern results (top-N lists). Use together with limit. Not used by cursor-based pagination.

[Link to this property](#)%20workers.observability.shared_queries%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20offsetBy%20%3E%20(schema)>)

offsetDirection: optional string

Pagination direction: ‘next’ for forward, ‘prev’ for backward.

[Link to this property](#)%20workers.observability.shared_queries%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20offsetDirection%20%3E%20(schema)>)

<details>

<summary>

parameters: optional object {calculations, datasets, filterCombination, 6 more }

Query parameters defining what data to retrieve — filters, calculations, group-bys, and ordering. In practice this should always be provided for ad-hoc queries. Only omit when executing a previously saved query by queryId. Use the keys and values endpoints to discover available fields before building filters.

</summary>

<details>

<summary>

calculations: optional array of object {operator, alias, key, keyType } or object {key, operator, alias, keyType }

Aggregation calculations to compute (e.g. count, avg, p99). Each calculation produces aggregate values and optional time-series data.

</summary>

One of the following:

<details>

<summary>

object {operator, alias, key, keyType }

</summary>

<details>

<summary>

operator: "count"or "COUNT"

Aggregation operator to apply. Examples: count, avg, sum, min, max, median, p90, p95, p99, uniq, stddev, variance.

</summary>

One of the following:

"count"

<a href="#">Link to this property</a>

"COUNT"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

alias: optional string

Custom label for this calculation in the results. Useful for distinguishing multiple calculations.

<a href="#">Link to this property</a>

key: optional string

Field name to calculate over. Must exist in the data. Verify with the keys endpoint. Required for every operator except <code>count</code>, which aggregates whole rows and may omit it.

<a href="#">Link to this property</a>

<details>

<summary>

keyType: optional "string"or "number"or "boolean"

Data type of the key. Required when key is provided to ensure correct aggregation.

</summary>

One of the following:

"string"

<a href="#">Link to this property</a>

"number"

<a href="#">Link to this property</a>

"boolean"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {key, operator, alias, keyType }

</summary>

key: string

Field name to calculate over. Must exist in the data. Verify with the keys endpoint. Required for every operator except <code>count</code>, which aggregates whole rows and may omit it.

<a href="#">Link to this property</a>

<details>

<summary>

operator: "uniq"or "max"or "min"or 33 more

Aggregation operator to apply. Examples: count, avg, sum, min, max, median, p90, p95, p99, uniq, stddev, variance.

</summary>

One of the following:

"uniq"

<a href="#">Link to this property</a>

"max"

<a href="#">Link to this property</a>

"min"

<a href="#">Link to this property</a>

"sum"

<a href="#">Link to this property</a>

"avg"

<a href="#">Link to this property</a>

"median"

<a href="#">Link to this property</a>

"p001"

<a href="#">Link to this property</a>

"p01"

<a href="#">Link to this property</a>

"p05"

<a href="#">Link to this property</a>

"p10"

<a href="#">Link to this property</a>

"p25"

<a href="#">Link to this property</a>

"p75"

<a href="#">Link to this property</a>

"p90"

<a href="#">Link to this property</a>

"p95"

<a href="#">Link to this property</a>

"p99"

<a href="#">Link to this property</a>

"p999"

<a href="#">Link to this property</a>

"stddev"

<a href="#">Link to this property</a>

"variance"

<a href="#">Link to this property</a>

"COUNT\_DISTINCT"

<a href="#">Link to this property</a>

"MAX"

<a href="#">Link to this property</a>

"MIN"

<a href="#">Link to this property</a>

"SUM"

<a href="#">Link to this property</a>

"AVG"

<a href="#">Link to this property</a>

"MEDIAN"

<a href="#">Link to this property</a>

"P001"

<a href="#">Link to this property</a>

"P01"

<a href="#">Link to this property</a>

"P05"

<a href="#">Link to this property</a>

"P10"

<a href="#">Link to this property</a>

"P25"

<a href="#">Link to this property</a>

"P75"

<a href="#">Link to this property</a>

"P90"

<a href="#">Link to this property</a>

"P95"

<a href="#">Link to this property</a>

"P99"

<a href="#">Link to this property</a>

"P999"

<a href="#">Link to this property</a>

"STDDEV"

<a href="#">Link to this property</a>

"VARIANCE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

alias: optional string

Custom label for this calculation in the results. Useful for distinguishing multiple calculations.

<a href="#">Link to this property</a>

<details>

<summary>

keyType: optional "string"or "number"or "boolean"

Data type of the key. Required when key is provided to ensure correct aggregation.

</summary>

One of the following:

"string"

<a href="#">Link to this property</a>

"number"

<a href="#">Link to this property</a>

"boolean"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

datasets: optional array of string

Datasets to query. Leave empty to query all available datasets.

<a href="#">Link to this property</a>

<details>

<summary>

filterCombination: optional "and"or "or"or "AND"or "OR"

Logical operator for combining top-level filters: ‘and’ (all must match) or ‘or’ (any must match). Defaults to ‘and’.

</summary>

One of the following:

"and"

<a href="#">Link to this property</a>

"or"

<a href="#">Link to this property</a>

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

filters: optional array of object {filterCombination, filters, kind } or object {key, operation, type, 2 more }

Filters to narrow query results. Use the keys and values endpoints to discover available fields before building filters. Supports nested groups via kind: ‘group’. Maximum nesting depth is 4.

</summary>

One of the following:

<details>

<summary>

object {filterCombination, filters, kind }

</summary>

<details>

<summary>

filterCombination: "and"or "or"or "AND"or "OR"

</summary>

One of the following:

"and"

<a href="#">Link to this property</a>

"or"

<a href="#">Link to this property</a>

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

filters: array of object {filterCombination, filters, kind } or object {key, operation, type, 2 more }

</summary>

One of the following:

<details>

<summary>

object {filterCombination, filters, kind }

</summary>

<details>

<summary>

filterCombination: "and"or "or"or "AND"or "OR"

</summary>

One of the following:

"and"

<a href="#">Link to this property</a>

"or"

<a href="#">Link to this property</a>

"AND"

<a href="#">Link to this property</a>

"OR"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

filters: array of unknown

<a href="#">Link to this property</a>

kind: "group"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

WorkersObservabilityFilterLeaf object {key, operation, type, 2 more }

A filter condition applied to query results. Use the keys and values endpoints to discover available fields and their values before constructing filters.

</summary>

key: string

Filter field name. Use verified keys from previous query results or the keys endpoint. Common keys include $metadata.service, $metadata.origin, $metadata.trigger, $metadata.message, and $metadata.error.

<a href="#">Link to this property</a>

<details>

<summary>

operation: "includes"or "not\_includes"or "starts\_with"or 27 more

Comparison operator. String operators: includes, not\_includes, starts\_with, ends\_with, regex. Existence: exists, is\_null. Set membership: in, not\_in (comma-separated values). Numeric: eq, neq, gt, gte, lt, lte.

</summary>

One of the following:

"includes"

<a href="#">Link to this property</a>

"not\_includes"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"regex"

<a href="#">Link to this property</a>

"exists"

<a href="#">Link to this property</a>

"is\_null"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

"eq"

<a href="#">Link to this property</a>

"neq"

<a href="#">Link to this property</a>

"gt"

<a href="#">Link to this property</a>

"gte"

<a href="#">Link to this property</a>

"lt"

<a href="#">Link to this property</a>

"lte"

<a href="#">Link to this property</a>

"="

<a href="#">Link to this property</a>

"!="

<a href="#">Link to this property</a>

"&gt;"

<a href="#">Link to this property</a>

"&gt;="

<a href="#">Link to this property</a>

"&lt;"

<a href="#">Link to this property</a>

"&lt;="

<a href="#">Link to this property</a>

"INCLUDES"

<a href="#">Link to this property</a>

"DOES\_NOT\_INCLUDE"

<a href="#">Link to this property</a>

"MATCH\_REGEX"

<a href="#">Link to this property</a>

"EXISTS"

<a href="#">Link to this property</a>

"DOES\_NOT\_EXIST"

<a href="#">Link to this property</a>

"IN"

<a href="#">Link to this property</a>

"NOT\_IN"

<a href="#">Link to this property</a>

"STARTS\_WITH"

<a href="#">Link to this property</a>

"ENDS\_WITH"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: "string"or "number"or "boolean"

Data type of the filter field. Must match the actual type of the key being filtered.

</summary>

One of the following:

"string"

<a href="#">Link to this property</a>

"number"

<a href="#">Link to this property</a>

"boolean"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

kind: optional "filter"

Discriminator for leaf filter nodes. Always ‘filter’ when present; may be omitted.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional stringor numberor boolean

Comparison value. Must match actual values in your data — verify with the values endpoint. Ensure the value type (string/number/boolean) matches the field type. String comparisons are case-sensitive. Regex uses RE2 syntax (no lookaheads/lookbehinds).

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

kind: "group"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

WorkersObservabilityFilterLeaf object {key, operation, type, 2 more }

A filter condition applied to query results. Use the keys and values endpoints to discover available fields and their values before constructing filters.

</summary>

key: string

Filter field name. Use verified keys from previous query results or the keys endpoint. Common keys include $metadata.service, $metadata.origin, $metadata.trigger, $metadata.message, and $metadata.error.

<a href="#">Link to this property</a>

<details>

<summary>

operation: "includes"or "not\_includes"or "starts\_with"or 27 more

Comparison operator. String operators: includes, not\_includes, starts\_with, ends\_with, regex. Existence: exists, is\_null. Set membership: in, not\_in (comma-separated values). Numeric: eq, neq, gt, gte, lt, lte.

</summary>

One of the following:

"includes"

<a href="#">Link to this property</a>

"not\_includes"

<a href="#">Link to this property</a>

"starts\_with"

<a href="#">Link to this property</a>

"ends\_with"

<a href="#">Link to this property</a>

"regex"

<a href="#">Link to this property</a>

"exists"

<a href="#">Link to this property</a>

"is\_null"

<a href="#">Link to this property</a>

"in"

<a href="#">Link to this property</a>

"not\_in"

<a href="#">Link to this property</a>

"eq"

<a href="#">Link to this property</a>

"neq"

<a href="#">Link to this property</a>

"gt"

<a href="#">Link to this property</a>

"gte"

<a href="#">Link to this property</a>

"lt"

<a href="#">Link to this property</a>

"lte"

<a href="#">Link to this property</a>

"="

<a href="#">Link to this property</a>

"!="

<a href="#">Link to this property</a>

"&gt;"

<a href="#">Link to this property</a>

"&gt;="

<a href="#">Link to this property</a>

"&lt;"

<a href="#">Link to this property</a>

"&lt;="

<a href="#">Link to this property</a>

"INCLUDES"

<a href="#">Link to this property</a>

"DOES\_NOT\_INCLUDE"

<a href="#">Link to this property</a>

"MATCH\_REGEX"

<a href="#">Link to this property</a>

"EXISTS"

<a href="#">Link to this property</a>

"DOES\_NOT\_EXIST"

<a href="#">Link to this property</a>

"IN"

<a href="#">Link to this property</a>

"NOT\_IN"

<a href="#">Link to this property</a>

"STARTS\_WITH"

<a href="#">Link to this property</a>

"ENDS\_WITH"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: "string"or "number"or "boolean"

Data type of the filter field. Must match the actual type of the key being filtered.

</summary>

One of the following:

"string"

<a href="#">Link to this property</a>

"number"

<a href="#">Link to this property</a>

"boolean"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

kind: optional "filter"

Discriminator for leaf filter nodes. Always ‘filter’ when present; may be omitted.

<a href="#">Link to this property</a>

<details>

<summary>

value: optional stringor numberor boolean

Comparison value. Must match actual values in your data — verify with the values endpoint. Ensure the value type (string/number/boolean) matches the field type. String comparisons are case-sensitive. Regex uses RE2 syntax (no lookaheads/lookbehinds).

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

groupBys: optional array of object {type, value }

Fields to group calculation results by. Only applicable when the query view is ‘calculations’. Produces per-group aggregate values.

</summary>

<details>

<summary>

type: "string"or "number"or "boolean"

Data type of the group-by field.

</summary>

One of the following:

"string"

<a href="#">Link to this property</a>

"number"

<a href="#">Link to this property</a>

"boolean"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: string

Field name to group results by (e.g. $metadata.service, $metadata.statusCode).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

havings: optional array of object {key, operation, value }

Post-aggregation filters applied to calculation results. Use to filter groups after aggregation (e.g. only groups where count &gt; 100).

</summary>

key: string

Calculation alias or operator to filter on after aggregation.

<a href="#">Link to this property</a>

<details>

<summary>

operation: "eq"or "neq"or "gt"or 3 more

Numeric comparison operator: eq, neq, gt, gte, lt, lte.

</summary>

One of the following:

"eq"

<a href="#">Link to this property</a>

"neq"

<a href="#">Link to this property</a>

"gt"

<a href="#">Link to this property</a>

"gte"

<a href="#">Link to this property</a>

"lt"

<a href="#">Link to this property</a>

"lte"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: number

Threshold value to compare the calculation result against.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

limit: optional number

Maximum number of group-by rows to return in calculation results. A value of 10 is a sensible default for most use cases.

maximum2000

minimum0

<a href="#">Link to this property</a>

<details>

<summary>

needle: optional object {value, isRegex, matchCase }

Full-text search expression applied across all event fields. Matches events containing the specified text.

</summary>

<details>

<summary>

value: stringor numberor boolean

The text or pattern to search for.

maxLength1000

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

isRegex: optional boolean

When true, treats the value as a regular expression (RE2 syntax).

<a href="#">Link to this property</a>

matchCase: optional boolean

When true, performs a case-sensitive search. Defaults to case-insensitive.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

orderBy: optional object {value, order }

Ordering for grouped calculation results. Only effective when a group-by is present.

</summary>

value: string

Alias of the calculation to order results by. Must match the alias (or operator) of a calculation in the query.

<a href="#">Link to this property</a>

<details>

<summary>

order: optional "asc"or "desc"

Sort direction: ‘asc’ for ascending, ‘desc’ for descending.

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.observability.shared_queries%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20parameters%20%3E%20(schema)>)

<details>

<summary>

view: optional "traces"or "events"or "calculations"or 3 more

Controls the shape of the response. ‘events’: individual log lines matching the query. ‘calculations’: aggregated metrics (count, avg, p99, etc.) with optional group-by breakdowns and time-series. ‘invocations’: events grouped by request ID. ‘traces’: distributed trace summaries. ‘agents’: agent-specific trace summaries.

</summary>

One of the following:

"traces"

<a href="#">Link to this property</a>

"events"

<a href="#">Link to this property</a>

"calculations"

<a href="#">Link to this property</a>

"invocations"

<a href="#">Link to this property</a>

"requests"

<a href="#">Link to this property</a>

"agents"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.observability.shared_queries%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20view%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {message }

</summary>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.observability.shared_queries%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {message }

</summary>

message: "Successful request"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.observability.shared_queries%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {id }

</summary>

id: string

Specify the ID of the shared query.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.observability.shared_queries%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

[Link to this property](#)%20workers.observability.shared_queries%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Create a sharable link to a query result

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/observability/shared/query \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "queryId": "queryId",
          "timeframe": {
            "from": 0,
            "to": 0
          }
        }'
```

200 example

```
{
  "errors": [
    {
      "message": "message"
    }
  ],
  "messages": [
    {
      "message": "Successful request"
    }
  ],
  "result": {
    "id": "id"
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "message": "message"
    }
  ],
  "messages": [
    {
      "message": "Successful request"
    }
  ],
  "result": {
    "id": "id"
  },
  "success": true
}
```