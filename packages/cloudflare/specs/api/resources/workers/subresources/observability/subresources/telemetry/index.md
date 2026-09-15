---
title: Telemetry
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers](https://developers.cloudflare.com/api/resources/workers)

[Observability](https://developers.cloudflare.com/api/resources/workers/subresources/observability)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Telemetry

##### [List keys](https://developers.cloudflare.com/api/resources/workers/subresources/observability/subresources/telemetry/methods/keys)

POST/accounts/{account\_id}/workers/observability/telemetry/keys

##### [Run a query](https://developers.cloudflare.com/api/resources/workers/subresources/observability/subresources/telemetry/methods/query)

POST/accounts/{account\_id}/workers/observability/telemetry/query

##### [List values](https://developers.cloudflare.com/api/resources/workers/subresources/observability/subresources/telemetry/methods/values)

POST/accounts/{account\_id}/workers/observability/telemetry/values

##### [Prepare live tail](https://developers.cloudflare.com/api/resources/workers/subresources/observability/subresources/telemetry/methods/live_tail)

POST/accounts/{account\_id}/workers/observability/telemetry/live-tail

##### [Live tail heartbeat](https://developers.cloudflare.com/api/resources/workers/subresources/observability/subresources/telemetry/methods/live_tail_heartbeat)

POST/accounts/{account\_id}/workers/observability/telemetry/live-tail/heartbeat

##### ModelsExpand Collapse

<details>

<summary>

TelemetryKeysResponse object {key, lastSeenAt, type }

</summary>

key: string

<a href="#">Link to this property</a>

lastSeenAt: number

<a href="#">Link to this property</a>

<details>

<summary>

type: "string"or "boolean"or "number"

</summary>

One of the following:

"string"

<a href="#">Link to this property</a>

"boolean"

<a href="#">Link to this property</a>

"number"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.observability.telemetry%20%3E%20(model)%20telemetry_keys_response%20%3E%20(schema)>)

<details>

<summary>

TelemetryQueryResponse object {run, statistics, agents, 6 more }

Complete results of a query run. The populated fields depend on the requested view type (events, calculations, invocations, traces, or agents).

</summary>

<details>

<summary>

run: object {id, accountId, dry, 8 more }

Represents a single execution of a query against Workers Observability data, including the query definition, execution status, and performance statistics.

</summary>

id: string

Unique identifier for this query run.

<a href="#">Link to this property</a>

accountId: string

Cloudflare account ID that owns this query run.

<a href="#">Link to this property</a>

dry: boolean

Whether this was a dry run (results not persisted).

<a href="#">Link to this property</a>

granularity: number

Number of time-series buckets used for the query. Higher values produce more detailed series data.

<a href="#">Link to this property</a>

<details>

<summary>

query: object {id, adhoc, created, 6 more }

A saved query definition with its parameters, metadata, and ownership information.

</summary>

id: string

<a href="#">Link to this property</a>

adhoc: boolean

If the query wasn’t explcitly saved

<a href="#">Link to this property</a>

<details>

<summary>

created: stringor string

formatdate-time

</summary>

One of the following:

string

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

createdBy: string

<a href="#">Link to this property</a>

description: string

maxLength1000

<a href="#">Link to this property</a>

name: string

Query name

maxLength250

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

parameters: object {calculations, datasets, filterCombination, 6 more }

</summary>

<details>

<summary>

calculations: optional array of object {operator, alias, key, keyType } or object {key, operator, alias, keyType }

Create Calculations to compute as part of the query.

</summary>

One of the following:

<details>

<summary>

object {operator, alias, key, keyType }

</summary>

<details>

<summary>

operator: "count"or "COUNT"

</summary>

One of the following:

"count"

<a href="#">Link to this property</a>

"COUNT"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

alias: optional string

<a href="#">Link to this property</a>

key: optional string

<a href="#">Link to this property</a>

<details>

<summary>

keyType: optional "string"or "number"or "boolean"

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

<a href="#">Link to this property</a>

<details>

<summary>

operator: "uniq"or "max"or "min"or 33 more

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

<a href="#">Link to this property</a>

<details>

<summary>

keyType: optional "string"or "number"or "boolean"

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

Set the Datasets to query. Leave it empty to query all the datasets.

<a href="#">Link to this property</a>

<details>

<summary>

filterCombination: optional "and"or "or"or "AND"or "OR"

Set a Flag to describe how to combine the filters on the query.

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

Configure the Filters to apply to the query. Supports nested groups via kind: ‘group’.

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

<details>

<summary>

groupBys: optional array of object {type, value }

Define how to group the results of the query.

</summary>

<details>

<summary>

type: "string"or "number"or "boolean"

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

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

havings: optional array of object {key, operation, value }

Configure the Having clauses that filter on calculations in the query result.

</summary>

key: string

<a href="#">Link to this property</a>

<details>

<summary>

operation: "eq"or "neq"or "gt"or 3 more

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

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

limit: optional number

Set a limit on the number of results / records returned by the query

maximum100

minimum0

<a href="#">Link to this property</a>

<details>

<summary>

needle: optional object {value, isRegex, matchCase }

Define an expression to search using full-text search.

</summary>

value:

<a href="#">Link to this property</a>

isRegex: optional boolean

<a href="#">Link to this property</a>

matchCase: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

orderBy: optional object {value, order }

Configure the order of the results returned by the query.

</summary>

value: string

Configure which Calculation to order the results by.

<a href="#">Link to this property</a>

<details>

<summary>

order: optional "asc"or "desc"

Set the order of the results

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

<a href="#">Link to this property</a>

<details>

<summary>

updated: stringor string

formatdate-time

</summary>

One of the following:

string

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updatedBy: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: "STARTED"or "COMPLETED"

Current execution status of the query run.

</summary>

One of the following:

"STARTED"

<a href="#">Link to this property</a>

"COMPLETED"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

timeframe: object {from, to }

Time range for the query execution. ‘from’ must be earlier than ‘to’. No fractional milliseconds.

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

<a href="#">Link to this property</a>

userId: string

ID of the user who initiated the query run.

<a href="#">Link to this property</a>

created: optional string

ISO-8601 timestamp when the query run was created.

<a href="#">Link to this property</a>

<details>

<summary>

statistics: optional object {bytes\_read, elapsed, rows\_read, abr\_level }

Query performance statistics from the database (does not include network latency).

</summary>

bytes\_read: number

Number of uncompressed bytes read from the table.

<a href="#">Link to this property</a>

elapsed: number

Time in seconds for the query to run.

<a href="#">Link to this property</a>

rows\_read: number

Number of rows scanned from the table.

<a href="#">Link to this property</a>

abr\_level: optional number

The level of Adaptive Bit Rate (ABR) sampling used for the query. If empty the ABR level is 1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated: optional string

ISO-8601 timestamp when the query run was last updated.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

statistics: object {bytes\_read, elapsed, rows\_read, abr\_level }

Query performance statistics from the database. Includes execution time, rows scanned, and bytes read. Does not include network latency.

</summary>

bytes\_read: number

Number of uncompressed bytes read from the table.

<a href="#">Link to this property</a>

elapsed: number

Time in seconds for the query to run.

<a href="#">Link to this property</a>

rows\_read: number

Number of rows scanned from the table.

<a href="#">Link to this property</a>

abr\_level: optional number

The level of Adaptive Bit Rate (ABR) sampling used for the query. If empty the ABR level is 1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

agents: optional array of object {id, errors, models, 13 more }

Agent run summaries. Present when the query view is ‘agents’. Each entry represents one trace containing at least one agent invocation.

</summary>

id: string

Stable pagination cursor for this agent run.

<a href="#">Link to this property</a>

errors: array of string

Distinct errors reported by spans in the run.

<a href="#">Link to this property</a>

models: array of string

Distinct models reported by chat spans across the run’s trace.

<a href="#">Link to this property</a>

providers: array of string

Distinct GenAI providers reported by chat spans in the run.

<a href="#">Link to this property</a>

services: array of string

Worker services represented in the run’s trace.

<a href="#">Link to this property</a>

spans: number

Number of spans in the run’s trace.

<a href="#">Link to this property</a>

<details>

<summary>

status: "completed"or "error"

Observed run status.

</summary>

One of the following:

"completed"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

traceDurationMs: number

Total trace duration in milliseconds.

<a href="#">Link to this property</a>

traceEndMs: number

End of the run’s trace as a Unix epoch in milliseconds.

<a href="#">Link to this property</a>

traceId: string

Trace identifier for this agent run.

<a href="#">Link to this property</a>

traceStartMs: number

Start of the run’s trace as a Unix epoch in milliseconds.

<a href="#">Link to this property</a>

agentId: optional string

ID from the earliest agent invocation that provides one.

<a href="#">Link to this property</a>

agentName: optional string

Name from the earliest agent invocation that provides one.

<a href="#">Link to this property</a>

conversationId: optional string

Conversation ID from the earliest invocation that provides one.

<a href="#">Link to this property</a>

inputTokens: optional number

Input tokens summed across chat spans in the run’s trace; informational, not billing data.

<a href="#">Link to this property</a>

outputTokens: optional number

Output tokens summed across chat spans in the run’s trace; informational, not billing data.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

calculations: optional array of object {aggregates, calculation, series, alias }

Aggregated calculation results. Present when the query view is ‘calculations’. Contains computed metrics (count, avg, p99, etc.) with optional group-by breakdowns and time-series data.

</summary>

<details>

<summary>

aggregates: array of object {count, interval, sampleInterval, 2 more }

</summary>

count: number

<a href="#">Link to this property</a>

interval: number

<a href="#">Link to this property</a>

sampleInterval: number

<a href="#">Link to this property</a>

value: number

<a href="#">Link to this property</a>

<details>

<summary>

groups: optional array of object {key, value }

</summary>

key: string

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor boolean

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

calculation: string

<a href="#">Link to this property</a>

<details>

<summary>

series: array of object {data, time }

</summary>

<details>

<summary>

data: array of object {count, interval, sampleInterval, 4 more }

</summary>

count: number

<a href="#">Link to this property</a>

interval: number

<a href="#">Link to this property</a>

sampleInterval: number

<a href="#">Link to this property</a>

value: number

<a href="#">Link to this property</a>

firstSeen: optional string

<a href="#">Link to this property</a>

<details>

<summary>

groups: optional array of object {key, value }

</summary>

key: string

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor boolean

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

lastSeen: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

time: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

alias: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

compare: optional array of object {aggregates, calculation, series, alias }

Comparison calculation results from the previous time period. Present when the compare option is enabled. Same structure as calculations.

</summary>

<details>

<summary>

aggregates: array of object {count, interval, sampleInterval, 2 more }

</summary>

count: number

<a href="#">Link to this property</a>

interval: number

<a href="#">Link to this property</a>

sampleInterval: number

<a href="#">Link to this property</a>

value: number

<a href="#">Link to this property</a>

<details>

<summary>

groups: optional array of object {key, value }

</summary>

key: string

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor boolean

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

calculation: string

<a href="#">Link to this property</a>

<details>

<summary>

series: array of object {data, time }

</summary>

<details>

<summary>

data: array of object {count, interval, sampleInterval, 4 more }

</summary>

count: number

<a href="#">Link to this property</a>

interval: number

<a href="#">Link to this property</a>

sampleInterval: number

<a href="#">Link to this property</a>

value: number

<a href="#">Link to this property</a>

firstSeen: optional string

<a href="#">Link to this property</a>

<details>

<summary>

groups: optional array of object {key, value }

</summary>

key: string

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor boolean

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

lastSeen: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

time: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

alias: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

distribution: optional object {bins, bucketBoundaries, bucketMode, 2 more }

Bucketed 2D histogram of a numeric field over time. Present when chartType is ‘distribution’.

</summary>

bins: array of string

Time-bucket labels (ISO-8601 strings), one per matrix column.

<a href="#">Link to this property</a>

bucketBoundaries: array of number

Raw bucket edges in the value’s native unit, length buckets.length + 1. Used for the colour scale and percentile mapping.

<a href="#">Link to this property</a>

<details>

<summary>

bucketMode: "log"or "linear"

Bucketing scheme used to derive the boundaries. ‘log’ produces geometric edges; ‘linear’ produces fixed-width edges.

</summary>

One of the following:

"log"

<a href="#">Link to this property</a>

"linear"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

buckets: array of string

Value-range labels, one per matrix row (e.g. ‘50–100ms’).

<a href="#">Link to this property</a>

matrix: array of array of number

Sampling-corrected counts. matrix\[bucketIdx]\[binIdx] is the estimated number of events in value-bucket ‘bucketIdx’ during time-bin ‘binIdx’.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

events: optional object {count, events, fields, series }

Individual event results. Present when the query view is ‘events’. Contains the matching log lines and their metadata.

</summary>

count: optional number

Total number of events matching the query (may exceed the number returned due to limits).

<a href="#">Link to this property</a>

<details>

<summary>

events: optional array of object {"$metadata", dataset, source, 3 more }

List of individual telemetry events matching the query.

</summary>

<details>

<summary>

"$metadata": object {id, account, cloudService, 29 more }

Structured metadata extracted from the event. These fields are indexed and available for filtering and aggregation.

</summary>

id: string

Unique event ID. Use as the cursor value for offset-based pagination.

<a href="#">Link to this property</a>

account: optional string

Cloudflare account identifier.

<a href="#">Link to this property</a>

cloudService: optional string

Cloudflare product that generated this event (e.g. workers, pages).

<a href="#">Link to this property</a>

coldStart: optional number

exclusiveMinimum

minimum0

<a href="#">Link to this property</a>

cost: optional number

Estimated cost units for this invocation.

exclusiveMinimum

minimum0

<a href="#">Link to this property</a>

duration: optional number

Span duration in milliseconds.

exclusiveMinimum

minimum0

<a href="#">Link to this property</a>

endTime: optional number

Span end time as a Unix epoch in milliseconds.

minimum0

<a href="#">Link to this property</a>

error: optional string

Error message, present when the log represents an error.

<a href="#">Link to this property</a>

errorTemplate: optional string

Templatized version of the error message used for grouping similar errors.

<a href="#">Link to this property</a>

fingerprint: optional string

Content-based fingerprint used to group similar events.

<a href="#">Link to this property</a>

level: optional string

Log level (e.g. log, debug, info, warn, error).

<a href="#">Link to this property</a>

message: optional string

Log message text.

<a href="#">Link to this property</a>

messageTemplate: optional string

Templatized version of the log message used for grouping similar messages.

<a href="#">Link to this property</a>

metricName: optional string

Metric name when the event represents a metric data point.

<a href="#">Link to this property</a>

origin: optional string

Origin of the event (e.g. fetch, scheduled, queue).

<a href="#">Link to this property</a>

parentSpanId: optional string

Span ID of the parent span in the trace hierarchy.

<a href="#">Link to this property</a>

provider: optional string

Infrastructure provider identifier.

<a href="#">Link to this property</a>

rayId: optional string

Cloudflare Ray ID from the <code>cf-ray</code> header of the request that triggered the invocation.

<a href="#">Link to this property</a>

region: optional string

Cloudflare data center / region that handled the request.

<a href="#">Link to this property</a>

requestId: optional string

Cloudflare request ID that ties all logs from a single invocation together.

<a href="#">Link to this property</a>

service: optional string

Worker script name that produced this event.

<a href="#">Link to this property</a>

spanId: optional string

Span ID for this individual unit of work within a trace.

<a href="#">Link to this property</a>

spanName: optional string

Human-readable name for this span.

<a href="#">Link to this property</a>

stackId: optional string

Stack / deployment identifier.

<a href="#">Link to this property</a>

startTime: optional number

Span start time as a Unix epoch in milliseconds.

minimum0

<a href="#">Link to this property</a>

statusCode: optional number

HTTP response status code returned by the Worker.

exclusiveMinimum

minimum0

<a href="#">Link to this property</a>

traceDuration: optional number

Total duration of the entire trace in milliseconds.

exclusiveMinimum

minimum0

<a href="#">Link to this property</a>

traceId: optional string

Distributed trace ID linking spans across services.

<a href="#">Link to this property</a>

transactionName: optional string

Logical transaction name for this request.

<a href="#">Link to this property</a>

trigger: optional string

What triggered the invocation (e.g. GET /users, POST /orders, queue message).

<a href="#">Link to this property</a>

type: optional string

Event type classifier (e.g. cf-worker-event, cf-worker-log).

<a href="#">Link to this property</a>

url: optional string

Request URL that triggered the Worker invocation.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

dataset: string

The dataset this event belongs to (e.g. cloudflare-workers).

<a href="#">Link to this property</a>

<details>

<summary>

source: stringor map\[unknown]

Raw log payload. May be a string or a structured object depending on how the log was emitted.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

timestamp: number

Event timestamp as a Unix epoch in milliseconds.

minimum0

<a href="#">Link to this property</a>

"$containers": optional map\[unknown]

Cloudflare Containers event information that enriches your logs for identifying and debugging issues.

<a href="#">Link to this property</a>

<details>

<summary>

"$workers": optional object {eventType, requestId, scriptName, 10 more } or object {cpuTimeMs, eventType, outcome, 14 more }

Cloudflare Workers event information that enriches your logs for identifying and debugging issues.

</summary>

One of the following:

<details>

<summary>

object {eventType, requestId, scriptName, 10 more }

</summary>

<details>

<summary>

eventType: "fetch"or "scheduled"or "alarm"or 9 more

</summary>

One of the following:

"fetch"

<a href="#">Link to this property</a>

"scheduled"

<a href="#">Link to this property</a>

"alarm"

<a href="#">Link to this property</a>

"cron"

<a href="#">Link to this property</a>

"queue"

<a href="#">Link to this property</a>

"email"

<a href="#">Link to this property</a>

"tail"

<a href="#">Link to this property</a>

"rpc"

<a href="#">Link to this property</a>

"jsrpc"

<a href="#">Link to this property</a>

"websocket"

<a href="#">Link to this property</a>

"workflow"

<a href="#">Link to this property</a>

"unknown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

requestId: string

<a href="#">Link to this property</a>

scriptName: string

<a href="#">Link to this property</a>

durableObjectId: optional string

<a href="#">Link to this property</a>

entrypoint: optional string

<a href="#">Link to this property</a>

event: optional map\[unknown]

<a href="#">Link to this property</a>

<details>

<summary>

executionModel: optional "durableObject"or "stateless"

</summary>

One of the following:

"durableObject"

<a href="#">Link to this property</a>

"stateless"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

outcome: optional string

<a href="#">Link to this property</a>

<details>

<summary>

preview: optional object {id, name, slug }

</summary>

id: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

slug: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

scriptVersion: optional object {id, message, tag }

</summary>

id: optional string

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

tag: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

spanId: optional string

<a href="#">Link to this property</a>

traceId: optional string

<a href="#">Link to this property</a>

truncated: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {cpuTimeMs, eventType, outcome, 14 more }

</summary>

cpuTimeMs: number

<a href="#">Link to this property</a>

<details>

<summary>

eventType: "fetch"or "scheduled"or "alarm"or 9 more

</summary>

One of the following:

"fetch"

<a href="#">Link to this property</a>

"scheduled"

<a href="#">Link to this property</a>

"alarm"

<a href="#">Link to this property</a>

"cron"

<a href="#">Link to this property</a>

"queue"

<a href="#">Link to this property</a>

"email"

<a href="#">Link to this property</a>

"tail"

<a href="#">Link to this property</a>

"rpc"

<a href="#">Link to this property</a>

"jsrpc"

<a href="#">Link to this property</a>

"websocket"

<a href="#">Link to this property</a>

"workflow"

<a href="#">Link to this property</a>

"unknown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

outcome: string

<a href="#">Link to this property</a>

requestId: string

<a href="#">Link to this property</a>

scriptName: string

<a href="#">Link to this property</a>

wallTimeMs: number

<a href="#">Link to this property</a>

<details>

<summary>

diagnosticsChannelEvents: optional array of object {channel, message, timestamp }

</summary>

channel: string

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

timestamp: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

dispatchNamespace: optional string

<a href="#">Link to this property</a>

durableObjectId: optional string

<a href="#">Link to this property</a>

entrypoint: optional string

<a href="#">Link to this property</a>

event: optional map\[unknown]

<a href="#">Link to this property</a>

<details>

<summary>

executionModel: optional "durableObject"or "stateless"

</summary>

One of the following:

"durableObject"

<a href="#">Link to this property</a>

"stateless"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

preview: optional object {id, name, slug }

</summary>

id: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

slug: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

scriptVersion: optional object {id, message, tag }

</summary>

id: optional string

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

tag: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

spanId: optional string

<a href="#">Link to this property</a>

traceId: optional string

<a href="#">Link to this property</a>

truncated: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

fields: optional array of object {key, type }

List of fields discovered in the matched events. Useful for building dynamic UIs.

</summary>

key: string

Field name present in the matched events.

<a href="#">Link to this property</a>

type: string

Data type of the field (string, number, or boolean).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

series: optional array of object {data, time }

Time-series data for the matched events, bucketed by the query granularity.

</summary>

<details>

<summary>

data: array of object {aggregates, count, interval, 3 more }

</summary>

<details>

<summary>

aggregates: object {\_count, \_interval, \_firstSeen, 2 more }

</summary>

Deprecated\_count: number

exclusiveMinimum

minimum0

<a href="#">Link to this property</a>

Deprecated\_interval: number

exclusiveMinimum

minimum0

<a href="#">Link to this property</a>

Deprecated\_firstSeen: optional string

<a href="#">Link to this property</a>

Deprecated\_lastSeen: optional string

<a href="#">Link to this property</a>

Deprecatedbin: optional unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

count: number

<a href="#">Link to this property</a>

interval: number

<a href="#">Link to this property</a>

sampleInterval: number

<a href="#">Link to this property</a>

errors: optional number

<a href="#">Link to this property</a>

<details>

<summary>

groups: optional map\[stringor numberor boolean]

Groups in the query results.

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

time: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

invocations: optional map\[array of object {"$metadata", dataset, source, 3 more } ]

Events grouped by invocation (request ID). Present when the query view is ‘invocations’. Each key is a request ID mapping to all events from that invocation.

</summary>

<details>

<summary>

"$metadata": object {id, account, cloudService, 29 more }

Structured metadata extracted from the event. These fields are indexed and available for filtering and aggregation.

</summary>

id: string

Unique event ID. Use as the cursor value for offset-based pagination.

<a href="#">Link to this property</a>

account: optional string

Cloudflare account identifier.

<a href="#">Link to this property</a>

cloudService: optional string

Cloudflare product that generated this event (e.g. workers, pages).

<a href="#">Link to this property</a>

coldStart: optional number

exclusiveMinimum

minimum0

<a href="#">Link to this property</a>

cost: optional number

Estimated cost units for this invocation.

exclusiveMinimum

minimum0

<a href="#">Link to this property</a>

duration: optional number

Span duration in milliseconds.

exclusiveMinimum

minimum0

<a href="#">Link to this property</a>

endTime: optional number

Span end time as a Unix epoch in milliseconds.

minimum0

<a href="#">Link to this property</a>

error: optional string

Error message, present when the log represents an error.

<a href="#">Link to this property</a>

errorTemplate: optional string

Templatized version of the error message used for grouping similar errors.

<a href="#">Link to this property</a>

fingerprint: optional string

Content-based fingerprint used to group similar events.

<a href="#">Link to this property</a>

level: optional string

Log level (e.g. log, debug, info, warn, error).

<a href="#">Link to this property</a>

message: optional string

Log message text.

<a href="#">Link to this property</a>

messageTemplate: optional string

Templatized version of the log message used for grouping similar messages.

<a href="#">Link to this property</a>

metricName: optional string

Metric name when the event represents a metric data point.

<a href="#">Link to this property</a>

origin: optional string

Origin of the event (e.g. fetch, scheduled, queue).

<a href="#">Link to this property</a>

parentSpanId: optional string

Span ID of the parent span in the trace hierarchy.

<a href="#">Link to this property</a>

provider: optional string

Infrastructure provider identifier.

<a href="#">Link to this property</a>

rayId: optional string

Cloudflare Ray ID from the <code>cf-ray</code> header of the request that triggered the invocation.

<a href="#">Link to this property</a>

region: optional string

Cloudflare data center / region that handled the request.

<a href="#">Link to this property</a>

requestId: optional string

Cloudflare request ID that ties all logs from a single invocation together.

<a href="#">Link to this property</a>

service: optional string

Worker script name that produced this event.

<a href="#">Link to this property</a>

spanId: optional string

Span ID for this individual unit of work within a trace.

<a href="#">Link to this property</a>

spanName: optional string

Human-readable name for this span.

<a href="#">Link to this property</a>

stackId: optional string

Stack / deployment identifier.

<a href="#">Link to this property</a>

startTime: optional number

Span start time as a Unix epoch in milliseconds.

minimum0

<a href="#">Link to this property</a>

statusCode: optional number

HTTP response status code returned by the Worker.

exclusiveMinimum

minimum0

<a href="#">Link to this property</a>

traceDuration: optional number

Total duration of the entire trace in milliseconds.

exclusiveMinimum

minimum0

<a href="#">Link to this property</a>

traceId: optional string

Distributed trace ID linking spans across services.

<a href="#">Link to this property</a>

transactionName: optional string

Logical transaction name for this request.

<a href="#">Link to this property</a>

trigger: optional string

What triggered the invocation (e.g. GET /users, POST /orders, queue message).

<a href="#">Link to this property</a>

type: optional string

Event type classifier (e.g. cf-worker-event, cf-worker-log).

<a href="#">Link to this property</a>

url: optional string

Request URL that triggered the Worker invocation.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

dataset: string

The dataset this event belongs to (e.g. cloudflare-workers).

<a href="#">Link to this property</a>

<details>

<summary>

source: stringor map\[unknown]

Raw log payload. May be a string or a structured object depending on how the log was emitted.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

timestamp: number

Event timestamp as a Unix epoch in milliseconds.

minimum0

<a href="#">Link to this property</a>

"$containers": optional map\[unknown]

Cloudflare Containers event information that enriches your logs for identifying and debugging issues.

<a href="#">Link to this property</a>

<details>

<summary>

"$workers": optional object {eventType, requestId, scriptName, 10 more } or object {cpuTimeMs, eventType, outcome, 14 more }

Cloudflare Workers event information that enriches your logs for identifying and debugging issues.

</summary>

One of the following:

<details>

<summary>

object {eventType, requestId, scriptName, 10 more }

</summary>

<details>

<summary>

eventType: "fetch"or "scheduled"or "alarm"or 9 more

</summary>

One of the following:

"fetch"

<a href="#">Link to this property</a>

"scheduled"

<a href="#">Link to this property</a>

"alarm"

<a href="#">Link to this property</a>

"cron"

<a href="#">Link to this property</a>

"queue"

<a href="#">Link to this property</a>

"email"

<a href="#">Link to this property</a>

"tail"

<a href="#">Link to this property</a>

"rpc"

<a href="#">Link to this property</a>

"jsrpc"

<a href="#">Link to this property</a>

"websocket"

<a href="#">Link to this property</a>

"workflow"

<a href="#">Link to this property</a>

"unknown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

requestId: string

<a href="#">Link to this property</a>

scriptName: string

<a href="#">Link to this property</a>

durableObjectId: optional string

<a href="#">Link to this property</a>

entrypoint: optional string

<a href="#">Link to this property</a>

event: optional map\[unknown]

<a href="#">Link to this property</a>

<details>

<summary>

executionModel: optional "durableObject"or "stateless"

</summary>

One of the following:

"durableObject"

<a href="#">Link to this property</a>

"stateless"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

outcome: optional string

<a href="#">Link to this property</a>

<details>

<summary>

preview: optional object {id, name, slug }

</summary>

id: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

slug: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

scriptVersion: optional object {id, message, tag }

</summary>

id: optional string

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

tag: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

spanId: optional string

<a href="#">Link to this property</a>

traceId: optional string

<a href="#">Link to this property</a>

truncated: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {cpuTimeMs, eventType, outcome, 14 more }

</summary>

cpuTimeMs: number

<a href="#">Link to this property</a>

<details>

<summary>

eventType: "fetch"or "scheduled"or "alarm"or 9 more

</summary>

One of the following:

"fetch"

<a href="#">Link to this property</a>

"scheduled"

<a href="#">Link to this property</a>

"alarm"

<a href="#">Link to this property</a>

"cron"

<a href="#">Link to this property</a>

"queue"

<a href="#">Link to this property</a>

"email"

<a href="#">Link to this property</a>

"tail"

<a href="#">Link to this property</a>

"rpc"

<a href="#">Link to this property</a>

"jsrpc"

<a href="#">Link to this property</a>

"websocket"

<a href="#">Link to this property</a>

"workflow"

<a href="#">Link to this property</a>

"unknown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

outcome: string

<a href="#">Link to this property</a>

requestId: string

<a href="#">Link to this property</a>

scriptName: string

<a href="#">Link to this property</a>

wallTimeMs: number

<a href="#">Link to this property</a>

<details>

<summary>

diagnosticsChannelEvents: optional array of object {channel, message, timestamp }

</summary>

channel: string

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

timestamp: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

dispatchNamespace: optional string

<a href="#">Link to this property</a>

durableObjectId: optional string

<a href="#">Link to this property</a>

entrypoint: optional string

<a href="#">Link to this property</a>

event: optional map\[unknown]

<a href="#">Link to this property</a>

<details>

<summary>

executionModel: optional "durableObject"or "stateless"

</summary>

One of the following:

"durableObject"

<a href="#">Link to this property</a>

"stateless"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

preview: optional object {id, name, slug }

</summary>

id: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

slug: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

scriptVersion: optional object {id, message, tag }

</summary>

id: optional string

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

tag: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

spanId: optional string

<a href="#">Link to this property</a>

traceId: optional string

<a href="#">Link to this property</a>

truncated: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

traces: optional array of object {rootSpanName, rootTransactionName, service, 6 more }

Trace summaries matching the query. Present when the query view is ‘traces’. Each entry represents a distributed trace with its spans, duration, and services involved.

</summary>

rootSpanName: string

Name of the root span that initiated the trace.

<a href="#">Link to this property</a>

rootTransactionName: string

Logical transaction name for the root span.

<a href="#">Link to this property</a>

service: array of string

List of Worker services involved in the trace.

<a href="#">Link to this property</a>

spans: number

Total number of spans in the trace.

<a href="#">Link to this property</a>

traceDurationMs: number

Total duration of the trace in milliseconds.

<a href="#">Link to this property</a>

traceEndMs: number

Trace end time as a Unix epoch in milliseconds.

<a href="#">Link to this property</a>

traceId: string

Unique identifier for the distributed trace.

<a href="#">Link to this property</a>

traceStartMs: number

Trace start time as a Unix epoch in milliseconds.

<a href="#">Link to this property</a>

errors: optional array of string

Error messages encountered during the trace, if any.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.observability.telemetry%20%3E%20(model)%20telemetry_query_response%20%3E%20(schema)>)

<details>

<summary>

TelemetryValuesResponse object {dataset, key, type, value }

</summary>

dataset: string

<a href="#">Link to this property</a>

key: string

<a href="#">Link to this property</a>

<details>

<summary>

type: "string"or "boolean"or "number"

</summary>

One of the following:

"string"

<a href="#">Link to this property</a>

"boolean"

<a href="#">Link to this property</a>

"number"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor boolean

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

[Link to this property](#)%20workers.observability.telemetry%20%3E%20(model)%20telemetry_values_response%20%3E%20(schema)>)

<details>

<summary>

TelemetryLiveTailResponse object {wsUrl }

</summary>

wsUrl: string

WebSocket URL clients connect to in order to stream live tail events.

formaturi

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.observability.telemetry%20%3E%20(model)%20telemetry_live_tail_response%20%3E%20(schema)>)

TelemetryLiveTailHeartbeatResponse = unknown

[Link to this property](#)%20workers.observability.telemetry%20%3E%20(model)%20telemetry_live_tail_heartbeat_response%20%3E%20(schema)>)