---
title: Get email DMARC validation time series
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[Email](https://developers.cloudflare.com/api/resources/radar/subresources/email)

[Security](https://developers.cloudflare.com/api/resources/radar/subresources/email/subresources/security)

[Timeseries Groups](https://developers.cloudflare.com/api/resources/radar/subresources/email/subresources/security/subresources/timeseries_groups)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get email DMARC validation time series

Deprecated: Use \[Radar Email Security Timeseries Groups By Dimension](https://developers.cloudflare.com/api/resources/radar/subresources/email/subresources/security/methods/timeseries\_groups\_v2/) instead.

GET/radar/email/security/timeseries\_groups/dmarc

Retrieves the distribution of emails by DMARC (Domain-based Message Authentication, Reporting and Conformance) validation over time.

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

##### Q uery ParametersExpand Collapse

<details>

<summary>

aggInterval: optional "15m"or "1h"or "1d"or "1w"

Aggregation interval of the results (e.g., in 15 minutes or 1 hour intervals). Refer to <a href="https://developers.cloudflare.com/radar/concepts/aggregation-intervals/">Aggregation intervals</a>. When omitted, the interval is auto-selected from the requested date range; finer intervals are only available for shorter ranges. If the requested interval is too granular for the date range, the request is rejected.

</summary>

One of the following:

"15m"

<a href="#">Link to this property</a>

"1h"

<a href="#">Link to this property</a>

"1d"

<a href="#">Link to this property</a>

"1w"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.email.security.timeseries_groups%20%3E%20(method)%20dmarc%20%3E%20(params)%20default%20%3E%20(param)%20aggInterval%20%3E%20(schema)>)

<details>

<summary>

arc: optional array of "PASS"or "NONE"or "FAIL"

Filters results by ARC (Authenticated Received Chain) validation.

</summary>

One of the following:

"PASS"

<a href="#">Link to this property</a>

"NONE"

<a href="#">Link to this property</a>

"FAIL"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.email.security.timeseries_groups%20%3E%20(method)%20dmarc%20%3E%20(params)%20default%20%3E%20(param)%20arc%20%3E%20(schema)>)

dateEnd: optional array of string

End of the date range (inclusive). Alternative to `dateRange`; provide together with `dateStart`. When requesting comparison series, every series must resolve to the same duration as the main series. Each `dateStart`/`dateEnd` is floored to the nearest 15 minutes before evaluation, so windows whose durations match only before alignment may be rejected.

[Link to this property](#)%20radar.email.security.timeseries_groups%20%3E%20(method)%20dmarc%20%3E%20(params)%20default%20%3E%20(param)%20dateEnd%20%3E%20(schema)>)

dateRange: optional array of string

Filters results by relative date range ending at the current time, with each value producing a separate series. Use `<n>d` for days (up to `364d`) or `<n>w` for weeks (up to `52w`). Append `control` to request the equivalent previous period for comparison: the comparison window is shifted back by the current window’s length rounded up to a whole number of weeks, so it keeps the same weekday alignment and does not overlap the current window (e.g. `7dcontrol` covers days -14 to -7, `10dcontrol` covers days -24 to -14). For example, pass `7d` and `7dcontrol` to compare this week with the previous week. All series must resolve to the same duration as the main series; relative ranges (including `control`) satisfy this automatically. Use this parameter or set specific start and end dates (`dateStart` and `dateEnd` parameters).

[Link to this property](#)%20radar.email.security.timeseries_groups%20%3E%20(method)%20dmarc%20%3E%20(params)%20default%20%3E%20(param)%20dateRange%20%3E%20(schema)>)

dateStart: optional array of string

Start of the date range. Alternative to `dateRange`; provide together with `dateEnd`. When requesting comparison series, every series must resolve to the same duration as the main series. Each `dateStart`/`dateEnd` is floored to the nearest 15 minutes before evaluation, so windows whose durations match only before alignment may be rejected.

[Link to this property](#)%20radar.email.security.timeseries_groups%20%3E%20(method)%20dmarc%20%3E%20(params)%20default%20%3E%20(param)%20dateStart%20%3E%20(schema)>)

<details>

<summary>

dkim: optional array of "PASS"or "NONE"or "FAIL"

Filters results by DKIM (DomainKeys Identified Mail) validation status.

</summary>

One of the following:

"PASS"

<a href="#">Link to this property</a>

"NONE"

<a href="#">Link to this property</a>

"FAIL"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.email.security.timeseries_groups%20%3E%20(method)%20dmarc%20%3E%20(params)%20default%20%3E%20(param)%20dkim%20%3E%20(schema)>)

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

[Link to this property](#)%20radar.email.security.timeseries_groups%20%3E%20(method)%20dmarc%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

name: optional array of string

Array of names used to label the series in the response.

[Link to this property](#)%20radar.email.security.timeseries_groups%20%3E%20(method)%20dmarc%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

<details>

<summary>

spf: optional array of "PASS"or "NONE"or "FAIL"

Filters results by SPF (Sender Policy Framework) validation status.

</summary>

One of the following:

"PASS"

<a href="#">Link to this property</a>

"NONE"

<a href="#">Link to this property</a>

"FAIL"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.email.security.timeseries_groups%20%3E%20(method)%20dmarc%20%3E%20(params)%20default%20%3E%20(param)%20spf%20%3E%20(schema)>)

<details>

<summary>

tlsVersion: optional array of "TLSv1\_0"or "TLSv1\_1"or "TLSv1\_2"or "TLSv1\_3"

Filters results by TLS version.

</summary>

One of the following:

"TLSv1\_0"

<a href="#">Link to this property</a>

"TLSv1\_1"

<a href="#">Link to this property</a>

"TLSv1\_2"

<a href="#">Link to this property</a>

"TLSv1\_3"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.email.security.timeseries_groups%20%3E%20(method)%20dmarc%20%3E%20(params)%20default%20%3E%20(param)%20tlsVersion%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {meta, serie\_0 }

</summary>

<details>

<summary>

meta: object {aggInterval, confidenceInfo, dateRange, 3 more }

Metadata for the results.

</summary>

<details>

<summary>

aggInterval: "FIFTEEN\_MINUTES"or "ONE\_HOUR"or "ONE\_DAY"or 2 more

Aggregation interval of the results (e.g., in 15 minutes or 1 hour intervals). Refer to <a href="https://developers.cloudflare.com/radar/concepts/aggregation-intervals/">Aggregation intervals</a>.

</summary>

One of the following:

"FIFTEEN\_MINUTES"

<a href="#">Link to this property</a>

"ONE\_HOUR"

<a href="#">Link to this property</a>

"ONE\_DAY"

<a href="#">Link to this property</a>

"ONE\_WEEK"

<a href="#">Link to this property</a>

"ONE\_MONTH"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

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

<details>

<summary>

serie\_0: <a href="https://developers.cloudflare.com/api/resources/radar#(resource)%20radar.email%20%3E%20(model)%20radar_email_series%20%3E%20(schema)">RadarEmailSeries</a> { FAIL, NONE, PASS }

</summary>

FAIL: array of string

<a href="#">Link to this property</a>

NONE: array of string

<a href="#">Link to this property</a>

PASS: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.email.security.timeseries_groups%20%3E%20(method)%20dmarc%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.email.security.timeseries_groups%20%3E%20(method)%20dmarc%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get email DMARC validation time series

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/email/security/timeseries_groups/dmarc \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "meta": {
      "aggInterval": "FIFTEEN_MINUTES",
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
    "serie_0": {
      "FAIL": [
        "10"
      ],
      "NONE": [
        "10"
      ],
      "PASS": [
        "10"
      ]
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
      "aggInterval": "FIFTEEN_MINUTES",
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
    "serie_0": {
      "FAIL": [
        "10"
      ],
      "NONE": [
        "10"
      ],
      "PASS": [
        "10"
      ]
    }
  },
  "success": true
}
```