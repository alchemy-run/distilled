---
title: Get top user agents by HTTP requests
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[HTTP](https://developers.cloudflare.com/api/resources/radar/subresources/http)

[Top](https://developers.cloudflare.com/api/resources/radar/subresources/http/subresources/top)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get top user agents by HTTP requests

Deprecated: Use \[Radar HTTP Summary By Dimension](https://developers.cloudflare.com/api/resources/radar/subresources/http/methods/summary\_v2/) instead.

GET/radar/http/top/browser

Retrieves the top user agents by HTTP requests.

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

asn: optional array of string

Filters results by Autonomous System. Specify one or more Autonomous System Numbers (ASNs) as a comma-separated list. Prefix with `-` to exclude ASNs from results. For example, `-174, 3356` excludes results from AS174, but includes results from AS3356.

[Link to this property](#)%20radar.http.top%20%3E%20(method)%20browser%20%3E%20(params)%20default%20%3E%20(param)%20asn%20%3E%20(schema)>)

<details>

<summary>

botClass: optional array of "LIKELY\_AUTOMATED"or "LIKELY\_HUMAN"

Filters results by bot class. Refer to <a href="https://developers.cloudflare.com/radar/concepts/bot-classes/">Bot classes</a>.

</summary>

One of the following:

"LIKELY\_AUTOMATED"

<a href="#">Link to this property</a>

"LIKELY\_HUMAN"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.http.top%20%3E%20(method)%20browser%20%3E%20(params)%20default%20%3E%20(param)%20botClass%20%3E%20(schema)>)

<details>

<summary>

browserFamily: optional array of "CHROME"or "EDGE"or "FIREFOX"or "SAFARI"

Filters results by browser family.

</summary>

One of the following:

"CHROME"

<a href="#">Link to this property</a>

"EDGE"

<a href="#">Link to this property</a>

"FIREFOX"

<a href="#">Link to this property</a>

"SAFARI"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.http.top%20%3E%20(method)%20browser%20%3E%20(params)%20default%20%3E%20(param)%20browserFamily%20%3E%20(schema)>)

continent: optional array of string

Filters results by continent. Specify a comma-separated list of alpha-2 codes. Prefix with `-` to exclude continents from results. For example, `-EU,NA` excludes results from EU, but includes results from NA.

[Link to this property](#)%20radar.http.top%20%3E%20(method)%20browser%20%3E%20(params)%20default%20%3E%20(param)%20continent%20%3E%20(schema)>)

dateEnd: optional array of string

End of the date range (inclusive). Alternative to `dateRange`; provide together with `dateStart`. When requesting comparison series, every series must resolve to the same duration as the main series. Each `dateStart`/`dateEnd` is floored to the nearest 15 minutes before evaluation, so windows whose durations match only before alignment may be rejected.

[Link to this property](#)%20radar.http.top%20%3E%20(method)%20browser%20%3E%20(params)%20default%20%3E%20(param)%20dateEnd%20%3E%20(schema)>)

dateRange: optional array of string

Filters results by relative date range ending at the current time, with each value producing a separate series. Use `<n>d` for days (up to `364d`) or `<n>w` for weeks (up to `52w`). Append `control` to request the equivalent previous period for comparison: the comparison window is shifted back by the current window’s length rounded up to a whole number of weeks, so it keeps the same weekday alignment and does not overlap the current window (e.g. `7dcontrol` covers days -14 to -7, `10dcontrol` covers days -24 to -14). For example, pass `7d` and `7dcontrol` to compare this week with the previous week. All series must resolve to the same duration as the main series; relative ranges (including `control`) satisfy this automatically. Use this parameter or set specific start and end dates (`dateStart` and `dateEnd` parameters).

[Link to this property](#)%20radar.http.top%20%3E%20(method)%20browser%20%3E%20(params)%20default%20%3E%20(param)%20dateRange%20%3E%20(schema)>)

dateStart: optional array of string

Start of the date range. Alternative to `dateRange`; provide together with `dateEnd`. When requesting comparison series, every series must resolve to the same duration as the main series. Each `dateStart`/`dateEnd` is floored to the nearest 15 minutes before evaluation, so windows whose durations match only before alignment may be rejected.

[Link to this property](#)%20radar.http.top%20%3E%20(method)%20browser%20%3E%20(params)%20default%20%3E%20(param)%20dateStart%20%3E%20(schema)>)

<details>

<summary>

deviceType: optional array of "DESKTOP"or "MOBILE"or "OTHER"

Filters results by device type.

</summary>

One of the following:

"DESKTOP"

<a href="#">Link to this property</a>

"MOBILE"

<a href="#">Link to this property</a>

"OTHER"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.http.top%20%3E%20(method)%20browser%20%3E%20(params)%20default%20%3E%20(param)%20deviceType%20%3E%20(schema)>)

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

[Link to this property](#)%20radar.http.top%20%3E%20(method)%20browser%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

geoId: optional array of string

Filters results by Geolocation. Specify a comma-separated list of GeoNames IDs. Prefix with `-` to exclude geoIds from results. For example, `-2267056,360689` excludes results from the 2267056 (Lisbon), but includes results from 5128638 (New York).

[Link to this property](#)%20radar.http.top%20%3E%20(method)%20browser%20%3E%20(params)%20default%20%3E%20(param)%20geoId%20%3E%20(schema)>)

<details>

<summary>

httpProtocol: optional array of "HTTP"or "HTTPS"

Filters results by HTTP protocol (HTTP vs. HTTPS).

</summary>

One of the following:

"HTTP"

<a href="#">Link to this property</a>

"HTTPS"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.http.top%20%3E%20(method)%20browser%20%3E%20(params)%20default%20%3E%20(param)%20httpProtocol%20%3E%20(schema)>)

<details>

<summary>

httpVersion: optional array of "HTTPv1"or "HTTPv2"or "HTTPv3"

Filters results by HTTP version.

</summary>

One of the following:

"HTTPv1"

<a href="#">Link to this property</a>

"HTTPv2"

<a href="#">Link to this property</a>

"HTTPv3"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.http.top%20%3E%20(method)%20browser%20%3E%20(params)%20default%20%3E%20(param)%20httpVersion%20%3E%20(schema)>)

<details>

<summary>

ipVersion: optional array of "IPv4"or "IPv6"

Filters results by IP version (Ipv4 vs. IPv6).

</summary>

One of the following:

"IPv4"

<a href="#">Link to this property</a>

"IPv6"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.http.top%20%3E%20(method)%20browser%20%3E%20(params)%20default%20%3E%20(param)%20ipVersion%20%3E%20(schema)>)

limit: optional number

Limits the number of objects returned in the response.

exclusiveMinimum

minimum0

[Link to this property](#)%20radar.http.top%20%3E%20(method)%20browser%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

location: optional array of string

Filters results by location. Specify a comma-separated list of alpha-2 codes. Prefix with `-` to exclude locations from results. For example, `-US,PT` excludes results from the US, but includes results from PT.

[Link to this property](#)%20radar.http.top%20%3E%20(method)%20browser%20%3E%20(params)%20default%20%3E%20(param)%20location%20%3E%20(schema)>)

name: optional array of string

Array of names used to label the series in the response.

[Link to this property](#)%20radar.http.top%20%3E%20(method)%20browser%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

<details>

<summary>

os: optional array of "WINDOWS"or "MACOSX"or "IOS"or 4 more

Filters results by operating system.

</summary>

One of the following:

"WINDOWS"

<a href="#">Link to this property</a>

"MACOSX"

<a href="#">Link to this property</a>

"IOS"

<a href="#">Link to this property</a>

"ANDROID"

<a href="#">Link to this property</a>

"CHROMEOS"

<a href="#">Link to this property</a>

"LINUX"

<a href="#">Link to this property</a>

"SMART\_TV"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.http.top%20%3E%20(method)%20browser%20%3E%20(params)%20default%20%3E%20(param)%20os%20%3E%20(schema)>)

<details>

<summary>

tlsVersion: optional array of "TLSv1\_0"or "TLSv1\_1"or "TLSv1\_2"or 2 more

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

"TLSvQUIC"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.http.top%20%3E%20(method)%20browser%20%3E%20(params)%20default%20%3E%20(param)%20tlsVersion%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {meta, top\_0 }

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

<details>

<summary>

top\_0: array of object {name, value }

</summary>

name: string

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.http.top%20%3E%20(method)%20browser%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.http.top%20%3E%20(method)%20browser%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get top user agents by HTTP requests

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/http/top/browser \
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
    "top_0": [
      {
        "name": "chrome",
        "value": "value"
      }
    ]
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
    "top_0": [
      {
        "name": "chrome",
        "value": "value"
      }
    ]
  },
  "success": true
}
```