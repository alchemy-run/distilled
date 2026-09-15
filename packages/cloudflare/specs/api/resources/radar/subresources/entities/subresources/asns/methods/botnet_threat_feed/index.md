---
title: Get AS rankings by botnet threat feed activity
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[Entities](https://developers.cloudflare.com/api/resources/radar/subresources/entities)

[ASNs](https://developers.cloudflare.com/api/resources/radar/subresources/entities/subresources/asns)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get AS rankings by botnet threat feed activity

GET/radar/entities/asns/botnet\_threat\_feed

Retrieves a ranked list of Autonomous Systems based on their presence in the Cloudflare Botnet Threat Feed. Rankings can be sorted by offense count or number of bad IPs. Optionally compare to a previous date to see rank changes.

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

[Link to this property](#)%20radar.entities.asns%20%3E%20(method)%20botnet_threat_feed%20%3E%20(params)%20default%20%3E%20(param)%20asn%20%3E%20(schema)>)

compareDateRange: optional string

Relative date range for rank change comparison (e.g., “1d”, “7d”, “30d”).

[Link to this property](#)%20radar.entities.asns%20%3E%20(method)%20botnet_threat_feed%20%3E%20(params)%20default%20%3E%20(param)%20compareDateRange%20%3E%20(schema)>)

date: optional string

The date to retrieve (YYYY-MM-DD format). If not specified, returns the most recent available data. Note: This is the date the report was generated. The report is generated from information collected from the previous day (e.g., the 2026-02-23 entry contains data from 2026-02-22).

formatdate

[Link to this property](#)%20radar.entities.asns%20%3E%20(method)%20botnet_threat_feed%20%3E%20(params)%20default%20%3E%20(param)%20date%20%3E%20(schema)>)

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

[Link to this property](#)%20radar.entities.asns%20%3E%20(method)%20botnet_threat_feed%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

limit: optional number

Limits the number of objects returned in the response.

exclusiveMinimum

minimum0

[Link to this property](#)%20radar.entities.asns%20%3E%20(method)%20botnet_threat_feed%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

location: optional string

Filters results by location. Specify an alpha-2 location code.

maxLength2

minLength2

[Link to this property](#)%20radar.entities.asns%20%3E%20(method)%20botnet_threat_feed%20%3E%20(params)%20default%20%3E%20(param)%20location%20%3E%20(schema)>)

<details>

<summary>

metric: optional "OFFENSE\_COUNT"or "NUMBER\_OF\_OFFENDING\_IPS"

Metric to rank ASNs by.

</summary>

One of the following:

"OFFENSE\_COUNT"

<a href="#">Link to this property</a>

"NUMBER\_OF\_OFFENDING\_IPS"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.entities.asns%20%3E%20(method)%20botnet_threat_feed%20%3E%20(params)%20default%20%3E%20(param)%20metric%20%3E%20(schema)>)

offset: optional number

Skips the specified number of objects before fetching the results.

minimum0

[Link to this property](#)%20radar.entities.asns%20%3E%20(method)%20botnet_threat_feed%20%3E%20(params)%20default%20%3E%20(param)%20offset%20%3E%20(schema)>)

<details>

<summary>

sortOrder: optional "ASC"or "DESC"

Sort order.

</summary>

One of the following:

"ASC"

<a href="#">Link to this property</a>

"DESC"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.entities.asns%20%3E%20(method)%20botnet_threat_feed%20%3E%20(params)%20default%20%3E%20(param)%20sortOrder%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {ases, meta }

</summary>

<details>

<summary>

ases: array of object {asn, country, name, 2 more }

</summary>

asn: number

<a href="#">Link to this property</a>

country: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

rank: number

<a href="#">Link to this property</a>

rankChange: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

meta: object {date, total, compareDate }

</summary>

date: string

<a href="#">Link to this property</a>

total: number

<a href="#">Link to this property</a>

compareDate: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.entities.asns%20%3E%20(method)%20botnet_threat_feed%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.entities.asns%20%3E%20(method)%20botnet_threat_feed%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get AS rankings by botnet threat feed activity

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/entities/asns/botnet_threat_feed \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "ases": [
      {
        "asn": 4134,
        "country": "CN",
        "name": "CHINANET-BACKBONE",
        "rank": 1,
        "rankChange": -2
      }
    ],
    "meta": {
      "date": "2026-02-04T00:00:00Z",
      "total": 50,
      "compareDate": "2026-01-28T00:00:00Z"
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
    "ases": [
      {
        "asn": 4134,
        "country": "CN",
        "name": "CHINANET-BACKBONE",
        "rank": 1,
        "rankChange": -2
      }
    ],
    "meta": {
      "date": "2026-02-04T00:00:00Z",
      "total": 50,
      "compareDate": "2026-01-28T00:00:00Z"
    }
  },
  "success": true
}
```