---
title: By Time
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[DNS](https://developers.cloudflare.com/api/resources/dns)

[Analytics](https://developers.cloudflare.com/api/resources/dns/subresources/analytics)

[Reports](https://developers.cloudflare.com/api/resources/dns/subresources/analytics/subresources/reports)

[Bytimes](https://developers.cloudflare.com/api/resources/dns/subresources/analytics/subresources/reports/subresources/bytimes)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# By Time

Deprecated: This endpoint is deprecated. See \[the API deprecation notice](https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#2025-12-09).

GET/zones/{zone\_id}/dns\_analytics/report/bytime

Retrieves a list of aggregate metrics grouped by time interval.

See [Analytics API properties](https://developers.cloudflare.com/dns/reference/analytics-api-properties/) for detailed information about the available query parameters.

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

[Link to this property](#)%20dns.analytics.reports.bytimes%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

dimensions: optional string

A comma-separated list of dimensions to group results by.

[Link to this property](#)%20dns.analytics.reports.bytimes%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20dimensions%20%3E%20(schema)>)

filters: optional string

Segmentation filter in ‘attribute operator value’ format.

[Link to this property](#)%20dns.analytics.reports.bytimes%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20filters%20%3E%20(schema)>)

limit: optional number

Limit number of returned metrics.

[Link to this property](#)%20dns.analytics.reports.bytimes%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

metrics: optional string

A comma-separated list of metrics to query.

[Link to this property](#)%20dns.analytics.reports.bytimes%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20metrics%20%3E%20(schema)>)

since: optional string

Start date and time of requesting data period in ISO 8601 format.

formatdate-time

[Link to this property](#)%20dns.analytics.reports.bytimes%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20since%20%3E%20(schema)>)

sort: optional string

A comma-separated list of dimensions to sort by, where each dimension may be prefixed by - (descending) or + (ascending).

[Link to this property](#)%20dns.analytics.reports.bytimes%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20sort%20%3E%20(schema)>)

<details>

<summary>

time\_delta: optional "all"or "auto"or "year"or 7 more

Unit of time to group data by.

</summary>

One of the following:

"all"

<a href="#">Link to this property</a>

"auto"

<a href="#">Link to this property</a>

"year"

<a href="#">Link to this property</a>

"quarter"

<a href="#">Link to this property</a>

"month"

<a href="#">Link to this property</a>

"week"

<a href="#">Link to this property</a>

"day"

<a href="#">Link to this property</a>

"hour"

<a href="#">Link to this property</a>

"dekaminute"

<a href="#">Link to this property</a>

"minute"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.analytics.reports.bytimes%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20time_delta%20%3E%20(schema)>)

until: optional string

End date and time of requesting data period in ISO 8601 format.

formatdate-time

[Link to this property](#)%20dns.analytics.reports.bytimes%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20until%20%3E%20(schema)>)

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

[Link to this property](#)%20dns.analytics.reports.bytimes%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20dns.analytics.reports.bytimes%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20dns.analytics.reports.bytimes%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.analytics.reports.bytimes%20%3E%20(model)%20by_time%20%3E%20(schema)">ByTime</a> { data, data\_lag, max, 5 more }

</summary>

<details>

<summary>

data: array of object {dimensions, metrics }

Array with one row per combination of dimension values.

</summary>

dimensions: array of string

Array of dimension values, representing the combination of dimension values corresponding to this row.

<a href="#">Link to this property</a>

metrics: array of array of number

Array with one item per requested metric. Each item is an array of values, broken down by time interval.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

data\_lag: number

Number of seconds between current time and last processed event, in another words how many seconds of data could be missing.

minimum0

<a href="#">Link to this property</a>

max: unknown

Maximum results for each metric (object mapping metric names to values). Currently always an empty object.

<a href="#">Link to this property</a>

min: unknown

Minimum results for each metric (object mapping metric names to values). Currently always an empty object.

<a href="#">Link to this property</a>

<details>

<summary>

query: object {dimensions, limit, metrics, 5 more }

</summary>

dimensions: array of string

Array of dimension names.

<a href="#">Link to this property</a>

limit: number

Limit number of returned metrics.

<a href="#">Link to this property</a>

metrics: array of string

Array of metric names.

<a href="#">Link to this property</a>

since: string

Start date and time of requesting data period in ISO 8601 format.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

time\_delta: "all"or "auto"or "year"or 7 more

Unit of time to group data by.

</summary>

One of the following:

"all"

<a href="#">Link to this property</a>

"auto"

<a href="#">Link to this property</a>

"year"

<a href="#">Link to this property</a>

"quarter"

<a href="#">Link to this property</a>

"month"

<a href="#">Link to this property</a>

"week"

<a href="#">Link to this property</a>

"day"

<a href="#">Link to this property</a>

"hour"

<a href="#">Link to this property</a>

"dekaminute"

<a href="#">Link to this property</a>

"minute"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

until: string

End date and time of requesting data period in ISO 8601 format.

formatdate-time

<a href="#">Link to this property</a>

filters: optional string

Segmentation filter in ‘attribute operator value’ format.

<a href="#">Link to this property</a>

sort: optional array of string

Array of dimensions to sort by, where each dimension may be prefixed by - (descending) or + (ascending).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

rows: number

Total number of rows in the result.

minimum0

<a href="#">Link to this property</a>

time\_intervals: array of array of string

Array of time intervals in the response data. Each interval is represented as an array containing two values: the start time, and the end time.

<a href="#">Link to this property</a>

totals: unknown

Total results for metrics across all data (object mapping metric names to values).

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.analytics.reports.bytimes%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### By Time

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_analytics/report/bytime \
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
          "NODATA"
        ],
        "metrics": [
          [
            0
          ]
        ]
      }
    ],
    "data_lag": 60,
    "max": {},
    "min": {},
    "query": {
      "dimensions": [
        "responseCode",
        "queryName"
      ],
      "limit": 100,
      "metrics": [
        "queryCount",
        "responseTimeAvg"
      ],
      "since": "2023-11-11T12:00:00Z",
      "time_delta": "hour",
      "until": "2023-11-11T13:00:00Z",
      "filters": "responseCode==NOERROR,queryType==A",
      "sort": [
        "+responseCode",
        "-queryName"
      ]
    },
    "rows": 100,
    "time_intervals": [
      [
        "2023-11-11T12:00:00Z"
      ]
    ],
    "totals": {}
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
          "NODATA"
        ],
        "metrics": [
          [
            0
          ]
        ]
      }
    ],
    "data_lag": 60,
    "max": {},
    "min": {},
    "query": {
      "dimensions": [
        "responseCode",
        "queryName"
      ],
      "limit": 100,
      "metrics": [
        "queryCount",
        "responseTimeAvg"
      ],
      "since": "2023-11-11T12:00:00Z",
      "time_delta": "hour",
      "until": "2023-11-11T13:00:00Z",
      "filters": "responseCode==NOERROR,queryType==A",
      "sort": [
        "+responseCode",
        "-queryName"
      ]
    },
    "rows": 100,
    "time_intervals": [
      [
        "2023-11-11T12:00:00Z"
      ]
    ],
    "totals": {}
  }
}
```