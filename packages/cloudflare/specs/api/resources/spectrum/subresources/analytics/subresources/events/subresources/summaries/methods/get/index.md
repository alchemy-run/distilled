---
title: Get analytics summary
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Spectrum](https://developers.cloudflare.com/api/resources/spectrum)

[Analytics](https://developers.cloudflare.com/api/resources/spectrum/subresources/analytics)

[Events](https://developers.cloudflare.com/api/resources/spectrum/subresources/analytics/subresources/events)

[Summaries](https://developers.cloudflare.com/api/resources/spectrum/subresources/analytics/subresources/events/subresources/summaries)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get analytics summary

GET/zones/{zone\_id}/spectrum/analytics/events/summary

Retrieves a list of summarised aggregate metrics over a given time period.

##### Security

<details>

<summary>API Token</summary>



The preferred authorization scheme for interacting with the Cloudflare API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/create-token/">Create a token</a>.

**Example:**<code>Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY</code>

</details>

<details>

<summary>API Email + API Key</summary>



The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**<code>X-Auth-Email: user@example.com</code>

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**<code>X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194</code>

</details>

##### Accepted Permissions (at least one required)

`Analytics Read`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20spectrum.analytics.events.summaries%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

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

[Link to this property](#)%20spectrum.analytics.events.summaries%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20dimensions%20%3E%20(schema)>)

filters: optional string

Used to filter rows by one or more dimensions. Filters can be combined using OR and AND boolean logic. AND takes precedence over OR in all the expressions. The OR operator is defined using a comma (,) or OR keyword surrounded by whitespace. The AND operator is defined using a semicolon (;) or AND keyword surrounded by whitespace. Note that the semicolon is a reserved character in URLs (rfc1738) and needs to be percent-encoded as %3B. Comparison options are:

| Operator | Name | URL Encoded |
| --- | --- | --- |
| == | Equals | %3D%3D |
| != | Does not equals | !%3D |
| > | Greater Than | %3E |
| < | Less Than | %3C |
| >= | Greater than or equal to | %3E%3D |
| <= | Less than or equal to | %3C%3D |

Use the above to construct filters.

[Link to this property](#)%20spectrum.analytics.events.summaries%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20filters%20%3E%20(schema)>)

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

[Link to this property](#)%20spectrum.analytics.events.summaries%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20metrics%20%3E%20(schema)>)

since: optional string

Start of time interval to query, defaults to `until` - 6 hours. Timestamp must be in RFC3339 format and uses UTC unless otherwise specified.

formatdate-time

[Link to this property](#)%20spectrum.analytics.events.summaries%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20since%20%3E%20(schema)>)

sort: optional array of string

The sort order for the result set; sort fields must be included in `metrics` or `dimensions`.

[Link to this property](#)%20spectrum.analytics.events.summaries%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20sort%20%3E%20(schema)>)

until: optional string

End of time interval to query, defaults to current time. Timestamp must be in RFC3339 format and uses UTC unless otherwise specified.

formatdate-time

[Link to this property](#)%20spectrum.analytics.events.summaries%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20until%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20spectrum.analytics.events.summaries%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20spectrum.analytics.events.summaries%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20spectrum.analytics.events.summaries%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {data, data\_lag, max, 5 more }

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

[Link to this property](#)%20spectrum.analytics.events.summaries%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get analytics summary

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/spectrum/analytics/events/summary \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "data": [
      {
        "dimensions": [
          "string"
        ],
        "metrics": [
          0
        ]
      }
    ],
    "data_lag": 3,
    "max": {
      "bytesEgress": 100,
      "bytesIngress": 50
    },
    "min": {
      "bytesEgress": 100,
      "bytesIngress": 50
    },
    "query": {
      "dimensions": [
        "event",
        "appID"
      ],
      "filters": "event==disconnect%20AND%20coloName!=SFO",
      "limit": 0,
      "metrics": [
        "count",
        "bytesIngress"
      ],
      "since": "2014-01-01T05:20:00.12345Z",
      "sort": [
        "+count",
        "-bytesIngress"
      ],
      "until": "2014-01-01T05:20:00.12345Z"
    },
    "rows": 5,
    "totals": {
      "bytesEgress": 100,
      "bytesIngress": 50
    },
    "time_intervals": [
      [
        "2014-01-01T05:20:00.12345Z"
      ]
    ]
  }
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "data": [
      {
        "dimensions": [
          "string"
        ],
        "metrics": [
          0
        ]
      }
    ],
    "data_lag": 3,
    "max": {
      "bytesEgress": 100,
      "bytesIngress": 50
    },
    "min": {
      "bytesEgress": 100,
      "bytesIngress": 50
    },
    "query": {
      "dimensions": [
        "event",
        "appID"
      ],
      "filters": "event==disconnect%20AND%20coloName!=SFO",
      "limit": 0,
      "metrics": [
        "count",
        "bytesIngress"
      ],
      "since": "2014-01-01T05:20:00.12345Z",
      "sort": [
        "+count",
        "-bytesIngress"
      ],
      "until": "2014-01-01T05:20:00.12345Z"
    },
    "rows": 5,
    "totals": {
      "bytesEgress": 100,
      "bytesIngress": 50
    },
    "time_intervals": [
      [
        "2014-01-01T05:20:00.12345Z"
      ]
    ]
  }
}
```