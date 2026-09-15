---
title: Get latest Internet traffic anomalies
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[Traffic Anomalies](https://developers.cloudflare.com/api/resources/radar/subresources/traffic_anomalies)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get latest Internet traffic anomalies

GET/radar/traffic\_anomalies

Retrieves the latest Internet traffic anomalies, which are signals that might indicate an outage. These alerts are automatically detected by Radar and manually verified by our team.

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

asn: optional number

Filters results by Autonomous System. Specify a single Autonomous System Number (ASN) as integer.

[Link to this property](#)%20radar.traffic_anomalies%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20asn%20%3E%20(schema)>)

<details>

<summary>

dataSource: optional "ALL"or "AI\_BOTS"or "AI\_GATEWAY"or 22 more

Filters results by data source.

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

[Link to this property](#)%20radar.traffic_anomalies%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20dataSource%20%3E%20(schema)>)

dateEnd: optional string

End of the date range (inclusive). Alternative to `dateRange`; provide together with `dateStart`.

formatdate-time

[Link to this property](#)%20radar.traffic_anomalies%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20dateEnd%20%3E%20(schema)>)

dateRange: optional string

Filters results by a relative date range ending at the current time. Use `<n>d` for days (up to `364d`) or `<n>w` for weeks (up to `52w`), e.g. `7d`. Append `control` to request the equivalent previous period for comparison: the comparison window is shifted back by the current window’s length rounded up to a whole number of weeks, so it keeps the same weekday alignment and does not overlap the current window (e.g. `3dcontrol` covers days -10 to -7, `7dcontrol` covers days -14 to -7, `28dcontrol` covers days -56 to -28, and `10dcontrol` covers days -24 to -14). Mutually exclusive with `dateStart`/`dateEnd`.

[Link to this property](#)%20radar.traffic_anomalies%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20dateRange%20%3E%20(schema)>)

dateStart: optional string

Start of the date range (inclusive). Alternative to `dateRange`; provide together with `dateEnd`.

formatdate-time

[Link to this property](#)%20radar.traffic_anomalies%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20dateStart%20%3E%20(schema)>)

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

[Link to this property](#)%20radar.traffic_anomalies%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

limit: optional number

Limits the number of objects returned in the response.

exclusiveMinimum

minimum0

[Link to this property](#)%20radar.traffic_anomalies%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

location: optional string

Filters results by location. Specify an alpha-2 location code.

maxLength2

minLength2

[Link to this property](#)%20radar.traffic_anomalies%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20location%20%3E%20(schema)>)

offset: optional number

Skips the specified number of objects before fetching the results.

minimum0

[Link to this property](#)%20radar.traffic_anomalies%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20offset%20%3E%20(schema)>)

origin: optional string

Filters results by origin.

maxLength100

[Link to this property](#)%20radar.traffic_anomalies%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20origin%20%3E%20(schema)>)

<details>

<summary>

status: optional "VERIFIED"or "UNVERIFIED"

</summary>

One of the following:

"VERIFIED"

<a href="#">Link to this property</a>

"UNVERIFIED"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.traffic_anomalies%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20status%20%3E%20(schema)>)

<details>

<summary>

type: optional array of "LOCATION"or "AS"or "ORIGIN"

Filters results by entity type (LOCATION, AS, or ORIGIN).

</summary>

One of the following:

"LOCATION"

<a href="#">Link to this property</a>

"AS"

<a href="#">Link to this property</a>

"ORIGIN"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.traffic_anomalies%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20type%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {trafficAnomalies }

</summary>

<details>

<summary>

trafficAnomalies: array of object {asnDetails, endDate, locationDetails, 6 more }

</summary>

<details>

<summary>

asnDetails: object {asn, location, name }

</summary>

asn: string

<a href="#">Link to this property</a>

<details>

<summary>

location: object {code, name }

</summary>

code: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

endDate: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

locationDetails: object {code, name }

</summary>

code: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

originDetails: object {name, origin }

</summary>

name: string

<a href="#">Link to this property</a>

origin: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

startDate: string

<a href="#">Link to this property</a>

status: string

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

visibleInDataSources: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.traffic_anomalies%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.traffic_anomalies%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get latest Internet traffic anomalies

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/traffic_anomalies \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "trafficAnomalies": [
      {
        "asnDetails": {
          "asn": "189",
          "location": {
            "code": "US",
            "name": "United States"
          },
          "name": "LUMEN-LEGACY-L3-PARTITION"
        },
        "endDate": "2019-12-27T18:11:19.117Z",
        "locationDetails": {
          "code": "US",
          "name": "United States"
        },
        "originDetails": {
          "name": "us-east-1 Amazon Web Services",
          "origin": "amazon-us-east-1"
        },
        "startDate": "2023-08-02T23:15:00Z",
        "status": "UNVERIFIED",
        "type": "LOCATION",
        "uuid": "55a57f33-8bc0-4984-b4df-fdaff72df39d",
        "visibleInDataSources": [
          "string"
        ]
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
    "trafficAnomalies": [
      {
        "asnDetails": {
          "asn": "189",
          "location": {
            "code": "US",
            "name": "United States"
          },
          "name": "LUMEN-LEGACY-L3-PARTITION"
        },
        "endDate": "2019-12-27T18:11:19.117Z",
        "locationDetails": {
          "code": "US",
          "name": "United States"
        },
        "originDetails": {
          "name": "us-east-1 Amazon Web Services",
          "origin": "amazon-us-east-1"
        },
        "startDate": "2023-08-02T23:15:00Z",
        "status": "UNVERIFIED",
        "type": "LOCATION",
        "uuid": "55a57f33-8bc0-4984-b4df-fdaff72df39d",
        "visibleInDataSources": [
          "string"
        ]
      }
    ]
  },
  "success": true
}
```