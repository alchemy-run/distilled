---
title: Get real-time BGP routes for a prefix
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[BGP](https://developers.cloudflare.com/api/resources/radar/subresources/bgp)

[Routes](https://developers.cloudflare.com/api/resources/radar/subresources/bgp/subresources/routes)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get real-time BGP routes for a prefix

GET/radar/bgp/routes/realtime

Retrieves real-time BGP routes for a prefix, using public real-time data collectors (RouteViews and RIPE RIS).

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

format: optional "JSON"or "CSV"

Format in which results will be returned.

</summary>

One of the following:

"JSON"

<a href="#">Link to this property</a>

"CSV"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.bgp.routes%20%3E%20(method)%20realtime%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

prefix: optional string

[Link to this property](#)%20radar.bgp.routes%20%3E%20(method)%20realtime%20%3E%20(params)%20default%20%3E%20(param)%20prefix%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {meta, routes }

</summary>

<details>

<summary>

meta: object {asn\_info, collectors, data\_time, 2 more }

</summary>

<details>

<summary>

asn\_info: array of object {as\_name, asn, country\_code, 2 more }

</summary>

as\_name: string

Name of the autonomous system.

<a href="#">Link to this property</a>

asn: number

AS number.

<a href="#">Link to this property</a>

country\_code: string

Alpha-2 code for the AS’s registration country.

<a href="#">Link to this property</a>

org\_id: string

Organization ID.

<a href="#">Link to this property</a>

org\_name: string

Organization name.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

collectors: array of object {collector, latest\_realtime\_ts, latest\_rib\_ts, 4 more }

</summary>

collector: string

Public route collector ID.

<a href="#">Link to this property</a>

latest\_realtime\_ts: string

Latest real-time stream timestamp for this collector.

<a href="#">Link to this property</a>

latest\_rib\_ts: string

Latest RIB dump MRT file timestamp for this collector.

<a href="#">Link to this property</a>

latest\_updates\_ts: string

Latest BGP updates MRT file timestamp for this collector.

<a href="#">Link to this property</a>

peers\_count: number

Total number of collector peers used from this collector.

<a href="#">Link to this property</a>

peers\_v4\_count: number

Total number of collector peers used from this collector for IPv4 prefixes.

<a href="#">Link to this property</a>

peers\_v6\_count: number

Total number of collector peers used from this collector for IPv6 prefixes.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

data\_time: string

The most recent data timestamp for from the real-time sources.

<a href="#">Link to this property</a>

<details>

<summary>

prefix\_origins: array of object {origin, prefix, rpki\_validation, 3 more }

</summary>

origin: number

Origin ASN.

<a href="#">Link to this property</a>

prefix: string

IP prefix of this query.

<a href="#">Link to this property</a>

rpki\_validation: string

Prefix-origin RPKI validation: valid, invalid, unknown.

<a href="#">Link to this property</a>

total\_peers: number

Total number of peers.

<a href="#">Link to this property</a>

total\_visible: number

Total number of peers seeing this prefix.

<a href="#">Link to this property</a>

visibility: number

Ratio of peers seeing this prefix to total number of peers.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

query\_time: string

The timestamp of this query.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

routes: array of object {as\_path, collector, communities, 2 more }

</summary>

as\_path: array of number

AS-level path for this route, from collector to origin.

<a href="#">Link to this property</a>

collector: string

Public collector ID for this route.

<a href="#">Link to this property</a>

communities: array of string

BGP community values.

<a href="#">Link to this property</a>

prefix: string

IP prefix of this query.

<a href="#">Link to this property</a>

timestamp: string

Latest timestamp of change for this route.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.bgp.routes%20%3E%20(method)%20realtime%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.bgp.routes%20%3E%20(method)%20realtime%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get real-time BGP routes for a prefix

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/bgp/routes/realtime \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "meta": {
      "asn_info": [
        {
          "as_name": "as_name",
          "asn": 0,
          "country_code": "country_code",
          "org_id": "org_id",
          "org_name": "org_name"
        }
      ],
      "collectors": [
        {
          "collector": "collector",
          "latest_realtime_ts": "latest_realtime_ts",
          "latest_rib_ts": "latest_rib_ts",
          "latest_updates_ts": "latest_updates_ts",
          "peers_count": 0,
          "peers_v4_count": 0,
          "peers_v6_count": 0
        }
      ],
      "data_time": "data_time",
      "prefix_origins": [
        {
          "origin": 0,
          "prefix": "prefix",
          "rpki_validation": "rpki_validation",
          "total_peers": 0,
          "total_visible": 0,
          "visibility": 0
        }
      ],
      "query_time": "query_time"
    },
    "routes": [
      {
        "as_path": [
          0
        ],
        "collector": "collector",
        "communities": [
          "string"
        ],
        "prefix": "prefix",
        "timestamp": "timestamp"
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
      "asn_info": [
        {
          "as_name": "as_name",
          "asn": 0,
          "country_code": "country_code",
          "org_id": "org_id",
          "org_name": "org_name"
        }
      ],
      "collectors": [
        {
          "collector": "collector",
          "latest_realtime_ts": "latest_realtime_ts",
          "latest_rib_ts": "latest_rib_ts",
          "latest_updates_ts": "latest_updates_ts",
          "peers_count": 0,
          "peers_v4_count": 0,
          "peers_v6_count": 0
        }
      ],
      "data_time": "data_time",
      "prefix_origins": [
        {
          "origin": 0,
          "prefix": "prefix",
          "rpki_validation": "rpki_validation",
          "total_peers": 0,
          "total_visible": 0,
          "visibility": 0
        }
      ],
      "query_time": "query_time"
    },
    "routes": [
      {
        "as_path": [
          0
        ],
        "collector": "collector",
        "communities": [
          "string"
        ],
        "prefix": "prefix",
        "timestamp": "timestamp"
      }
    ]
  },
  "success": true
}
```