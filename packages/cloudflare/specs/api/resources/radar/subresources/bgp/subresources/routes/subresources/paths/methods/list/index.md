---
title: Get tier-1 path segments for an AS
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[BGP](https://developers.cloudflare.com/api/resources/radar/subresources/bgp)

[Routes](https://developers.cloudflare.com/api/resources/radar/subresources/bgp/subresources/routes)

[Paths](https://developers.cloudflare.com/api/resources/radar/subresources/bgp/subresources/routes/subresources/paths)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get tier-1 path segments for an AS

GET/radar/bgp/routes/paths/{asn}

Retrieves the paths an AS uses to reach the tier-1 clique, derived from RouteViews RIB snapshots. Each entry is an ordered AS-path segment (from the queried AS toward a tier-1) with the number of observed paths and peers, and the collectors that observed it. By default segments are merged across all active collectors; pass “collector” to scope to one. The response also includes an “asnInfo” map (keyed by ASN) with the name and country for every ASN in the returned segments plus the queried ASN (best-effort; null when unavailable).

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

asn: number

Single Autonomous System Number (ASN) as integer.

[Link to this property](#)%20radar.bgp.routes.paths%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20asn%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

collector: optional string

Scope to a single RouteViews collector (e.g. “route-views3”). Omit to merge across all active collectors (identical path segments are deduplicated, observation counts summed, and every contributing collector listed).

maxLength100

[Link to this property](#)%20radar.bgp.routes.paths%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20collector%20%3E%20(schema)>)

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

[Link to this property](#)%20radar.bgp.routes.paths%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

<details>

<summary>

ipVersion: optional "IPv4"or "IPv6"

Address family of the observed paths. Defaults to IPv4.

</summary>

One of the following:

"IPv4"

<a href="#">Link to this property</a>

"IPv6"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.bgp.routes.paths%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20ipVersion%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {asnInfo, collectors, meta, paths }

</summary>

<details>

<summary>

asnInfo: map\[object {asn, country, name } ]

</summary>

asn: number

ASN number.

<a href="#">Link to this property</a>

country: string

Alpha-2 country code.

<a href="#">Link to this property</a>

name: string

AS name.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

collectors: array of string

<a href="#">Link to this property</a>

<details>

<summary>

meta: object {dataTime, effectiveCollector, queryTime, stale }

</summary>

dataTime: string

Timestamp of the underlying RIB data.

formatdate-time

<a href="#">Link to this property</a>

effectiveCollector: string

<a href="#">Link to this property</a>

queryTime: string

Timestamp when the query was executed.

formatdate-time

<a href="#">Link to this property</a>

stale: boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

paths: array of object {collectors, pathsCount, peersCount, segment }

</summary>

collectors: array of string

<a href="#">Link to this property</a>

pathsCount: number

<a href="#">Link to this property</a>

peersCount: number

<a href="#">Link to this property</a>

segment: array of number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.bgp.routes.paths%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.bgp.routes.paths%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get tier-1 path segments for an AS

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/bgp/routes/paths/$ASN \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "asnInfo": {
      "13335": {
        "asn": 13335,
        "country": "US",
        "name": "Cloudflare"
      }
    },
    "collectors": [
      "string"
    ],
    "meta": {
      "dataTime": "2019-12-27T18:11:19.117Z",
      "effectiveCollector": "effectiveCollector",
      "queryTime": "2019-12-27T18:11:19.117Z",
      "stale": true
    },
    "paths": [
      {
        "collectors": [
          "string"
        ],
        "pathsCount": 0,
        "peersCount": 0,
        "segment": [
          0
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
    "asnInfo": {
      "13335": {
        "asn": 13335,
        "country": "US",
        "name": "Cloudflare"
      }
    },
    "collectors": [
      "string"
    ],
    "meta": {
      "dataTime": "2019-12-27T18:11:19.117Z",
      "effectiveCollector": "effectiveCollector",
      "queryTime": "2019-12-27T18:11:19.117Z",
      "stale": true
    },
    "paths": [
      {
        "collectors": [
          "string"
        ],
        "pathsCount": 0,
        "peersCount": 0,
        "segment": [
          0
        ]
      }
    ]
  },
  "success": true
}
```