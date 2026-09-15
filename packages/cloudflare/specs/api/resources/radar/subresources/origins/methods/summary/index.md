---
title: Get origin metrics distribution by dimension
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[Origins](https://developers.cloudflare.com/api/resources/radar/subresources/origins)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get origin metrics distribution by dimension

GET/radar/origins/summary/{dimension}

Retrieves an aggregated summary of origin metrics grouped by the specified dimension.

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

`User Details Write``User Details Read`

##### P ath ParametersExpand Collapse

<details>

<summary>

dimension: "ORIGIN"or "REGION"or "SUCCESS\_RATE"or "PERCENTILE"

Specifies the origin attribute by which to group the results. <code>ORIGIN</code> groups across all providers and does not accept an <code>origin</code> or <code>region</code>. <code>REGION</code> requires an <code>origin</code>. <code>SUCCESS_RATE</code> and <code>PERCENTILE</code> require both an <code>origin</code> and a <code>region</code> and constrain the <code>metric</code> (<code>SUCCESS_RATE</code> supports only <code>REQUESTS</code>; <code>PERCENTILE</code> supports any metric except <code>REQUESTS</code>). <code>limitPerGroup</code> is only supported on the <code>REGION</code> dimension.

</summary>

One of the following:

"ORIGIN"

<a href="#">Link to this property</a>

"REGION"

<a href="#">Link to this property</a>

"SUCCESS\_RATE"

<a href="#">Link to this property</a>

"PERCENTILE"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.origins%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20dimension%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

<details>

<summary>

metric: "CONNECTION\_FAILURES"or "REQUESTS"or "RESPONSE\_HEADER\_RECEIVE\_DURATION"or 3 more

Specifies the metric to retrieve. Allowed metrics depend on the selected dimension (see the <code>dimension</code> path parameter).

</summary>

One of the following:

"CONNECTION\_FAILURES"

<a href="#">Link to this property</a>

"REQUESTS"

<a href="#">Link to this property</a>

"RESPONSE\_HEADER\_RECEIVE\_DURATION"

<a href="#">Link to this property</a>

"TCP\_HANDSHAKE\_DURATION"

<a href="#">Link to this property</a>

"TCP\_RTT"

<a href="#">Link to this property</a>

"TLS\_HANDSHAKE\_DURATION"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.origins%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20metric%20%3E%20(schema)>)

dateEnd: optional array of string

End of the date range (inclusive). Alternative to `dateRange`; provide together with `dateStart`. When requesting comparison series, every series must resolve to the same duration as the main series. Each `dateStart`/`dateEnd` is floored to the nearest 15 minutes before evaluation, so windows whose durations match only before alignment may be rejected.

[Link to this property](#)%20radar.origins%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20dateEnd%20%3E%20(schema)>)

dateRange: optional array of string

Filters results by relative date range ending at the current time, with each value producing a separate series. Use `<n>d` for days (up to `364d`) or `<n>w` for weeks (up to `52w`). Append `control` to request the equivalent previous period for comparison: the comparison window is shifted back by the current window’s length rounded up to a whole number of weeks, so it keeps the same weekday alignment and does not overlap the current window (e.g. `7dcontrol` covers days -14 to -7, `10dcontrol` covers days -24 to -14). For example, pass `7d` and `7dcontrol` to compare this week with the previous week. All series must resolve to the same duration as the main series; relative ranges (including `control`) satisfy this automatically. Use this parameter or set specific start and end dates (`dateStart` and `dateEnd` parameters).

[Link to this property](#)%20radar.origins%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20dateRange%20%3E%20(schema)>)

dateStart: optional array of string

Start of the date range. Alternative to `dateRange`; provide together with `dateEnd`. When requesting comparison series, every series must resolve to the same duration as the main series. Each `dateStart`/`dateEnd` is floored to the nearest 15 minutes before evaluation, so windows whose durations match only before alignment may be rejected.

[Link to this property](#)%20radar.origins%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20dateStart%20%3E%20(schema)>)

<details>

<summary>

format: optional "JSON"or "CSV"

Format in which results will be returned.

</summary>

One of the following:

"JSON"

<a href="#">Link to this property</a>

"CSV"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.origins%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

limitPerGroup: optional number

Limits the number of objects per group to the top items within the specified time range. When item count exceeds the limit, extra items appear grouped under an “other” category. Only supported on high-cardinality dimensions; otherwise the request is rejected. Minimum value is 2.

[Link to this property](#)%20radar.origins%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20limitPerGroup%20%3E%20(schema)>)

name: optional array of string

Array of names used to label the series in the response.

[Link to this property](#)%20radar.origins%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

<details>

<summary>

origin: optional array of "AMAZON"or "GOOGLE"or "MICROSOFT"or "ORACLE"

Filters results by origin. Required for every dimension except <code>ORIGIN</code>; must not be set on the <code>ORIGIN</code> dimension, which groups across all providers.

</summary>

One of the following:

"AMAZON"

<a href="#">Link to this property</a>

"GOOGLE"

<a href="#">Link to this property</a>

"MICROSOFT"

<a href="#">Link to this property</a>

"ORACLE"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.origins%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20origin%20%3E%20(schema)>)

region: optional array of string

Filters results by origin region. Requires `origin` to be set and is validated against it.

[Link to this property](#)%20radar.origins%20%3E%20(method)%20summary%20%3E%20(params)%20default%20%3E%20(param)%20region%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {meta, summary\_0 }

</summary>

<details>

<summary>

meta: object {confidenceInfo, dateRange, lastUpdated, 2 more }

Metadata for the results.

</summary>

<details>

<summary>

confidenceInfo: object {annotations, level }

</summary>

<details>

<summary>

annotations: array of object {dataSource, description, endDate, 5 more }

</summary>

<details>

<summary>

dataSource: "ALL"or "AI\_BOTS"or "AI\_GATEWAY"or 22 more

Data source for annotations.

</summary>

One of the following:

"ALL"

<a href="#">Link to this property</a>

"AI\_BOTS"

<a href="#">Link to this property</a>

"AI\_GATEWAY"

<a href="#">Link to this property</a>

"BGP"

<a href="#">Link to this property</a>

"BOTS"

<a href="#">Link to this property</a>

"CONNECTION\_ANOMALY"

<a href="#">Link to this property</a>

"CT"

<a href="#">Link to this property</a>

"DNS"

<a href="#">Link to this property</a>

"DNS\_MAGNITUDE"

<a href="#">Link to this property</a>

"DNS\_AS112"

<a href="#">Link to this property</a>

"DOS"

<a href="#">Link to this property</a>

"EMAIL\_ROUTING"

<a href="#">Link to this property</a>

"EMAIL\_SECURITY"

<a href="#">Link to this property</a>

"FW"

<a href="#">Link to this property</a>

"FW\_PG"

<a href="#">Link to this property</a>

"HTTP"

<a href="#">Link to this property</a>

"HTTP\_CONTROL"

<a href="#">Link to this property</a>

"HTTP\_CRAWLER\_REFERER"

<a href="#">Link to this property</a>

"HTTP\_ORIGINS"

<a href="#">Link to this property</a>

"IQI"

<a href="#">Link to this property</a>

"LEAKED\_CREDENTIALS"

<a href="#">Link to this property</a>

"NET"

<a href="#">Link to this property</a>

"ROBOTS\_TXT"

<a href="#">Link to this property</a>

"SPEED"

<a href="#">Link to this property</a>

"WORKERS\_AI"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: string

<a href="#">Link to this property</a>

endDate: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

eventType: "GENERAL"or "OUTAGE"or "PARTIAL\_PROJECTION"or 2 more

Event type for annotations.

</summary>

One of the following:

"GENERAL"

<a href="#">Link to this property</a>

"OUTAGE"

<a href="#">Link to this property</a>

"PARTIAL\_PROJECTION"

<a href="#">Link to this property</a>

"PIPELINE"

<a href="#">Link to this property</a>

"TRAFFIC\_ANOMALY"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

isInstantaneous: boolean

Whether event is a single point in time or a time range.

<a href="#">Link to this property</a>

linkedUrl: string

formaturi

<a href="#">Link to this property</a>

startDate: string

formatdate-time

<a href="#">Link to this property</a>

tags: optional array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

level: number

Provides an indication of how much confidence Cloudflare has in the data.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

dateRange: array of object {endTime, startTime }

</summary>

endTime: string

Adjusted end of date range.

formatdate-time

<a href="#">Link to this property</a>

startTime: string

Adjusted start of date range.

formatdate-time

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

[Link to this property](#)%20radar.origins%20%3E%20(method)%20summary%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.origins%20%3E%20(method)%20summary%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get origin metrics distribution by dimension

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/origins/summary/$DIMENSION \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "meta": {
      "confidenceInfo": {
        "annotations": [
          {
            "dataSource": "ALL",
            "description": "Cable cut in Tonga",
            "endDate": "2019-12-27T18:11:19.117Z",
            "eventType": "GENERAL",
            "isInstantaneous": true,
            "linkedUrl": "https://example.com",
            "startDate": "2019-12-27T18:11:19.117Z",
            "tags": [
              "BOT_CLASS"
            ]
          }
        ],
        "level": 0
      },
      "dateRange": [
        {
          "endTime": "2022-09-17T10:22:57.555Z",
          "startTime": "2022-09-16T10:22:57.555Z"
        }
      ],
      "lastUpdated": "2019-12-27T18:11:19.117Z",
      "normalization": "PERCENTAGE",
      "units": [
        {
          "name": "*",
          "value": "requests"
        }
      ]
    },
    "summary_0": {
      "eu-west-1": "52.14",
      "us-east-1": "45.23",
      "us-west-2": "38.67"
    }
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "meta": {
      "confidenceInfo": {
        "annotations": [
          {
            "dataSource": "ALL",
            "description": "Cable cut in Tonga",
            "endDate": "2019-12-27T18:11:19.117Z",
            "eventType": "GENERAL",
            "isInstantaneous": true,
            "linkedUrl": "https://example.com",
            "startDate": "2019-12-27T18:11:19.117Z",
            "tags": [
              "BOT_CLASS"
            ]
          }
        ],
        "level": 0
      },
      "dateRange": [
        {
          "endTime": "2022-09-17T10:22:57.555Z",
          "startTime": "2022-09-16T10:22:57.555Z"
        }
      ],
      "lastUpdated": "2019-12-27T18:11:19.117Z",
      "normalization": "PERCENTAGE",
      "units": [
        {
          "name": "*",
          "value": "requests"
        }
      ]
    },
    "summary_0": {
      "eu-west-1": "52.14",
      "us-east-1": "45.23",
      "us-west-2": "38.67"
    }
  },
  "success": true
}
```