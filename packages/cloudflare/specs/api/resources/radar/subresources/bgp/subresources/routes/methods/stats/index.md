---
title: "Get BGP routing table stats "
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

# Get BGP routing table stats

GET/radar/bgp/routes/stats

Retrieves the BGP routing table stats.

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

[Link to this property](#)%20radar.bgp.routes%20%3E%20(method)%20stats%20%3E%20(params)%20default%20%3E%20(param)%20asn%20%3E%20(schema)>)

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

[Link to this property](#)%20radar.bgp.routes%20%3E%20(method)%20stats%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

location: optional string

Filters results by location. Specify an alpha-2 location code.

maxLength2

minLength2

[Link to this property](#)%20radar.bgp.routes%20%3E%20(method)%20stats%20%3E%20(params)%20default%20%3E%20(param)%20location%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {meta, stats }

</summary>

<details>

<summary>

meta: object {data\_time, query\_time, total\_peers }

</summary>

data\_time: string

<a href="#">Link to this property</a>

query\_time: string

<a href="#">Link to this property</a>

total\_peers: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

stats: object {distinct\_origins, distinct\_origins\_ipv4, distinct\_origins\_ipv6, 15 more }

</summary>

distinct\_origins: number

<a href="#">Link to this property</a>

distinct\_origins\_ipv4: number

<a href="#">Link to this property</a>

distinct\_origins\_ipv6: number

<a href="#">Link to this property</a>

distinct\_prefixes: number

<a href="#">Link to this property</a>

distinct\_prefixes\_ipv4: number

<a href="#">Link to this property</a>

distinct\_prefixes\_ipv6: number

<a href="#">Link to this property</a>

routes\_invalid: number

<a href="#">Link to this property</a>

routes\_invalid\_ipv4: number

<a href="#">Link to this property</a>

routes\_invalid\_ipv6: number

<a href="#">Link to this property</a>

routes\_total: number

<a href="#">Link to this property</a>

routes\_total\_ipv4: number

<a href="#">Link to this property</a>

routes\_total\_ipv6: number

<a href="#">Link to this property</a>

routes\_unknown: number

<a href="#">Link to this property</a>

routes\_unknown\_ipv4: number

<a href="#">Link to this property</a>

routes\_unknown\_ipv6: number

<a href="#">Link to this property</a>

routes\_valid: number

<a href="#">Link to this property</a>

routes\_valid\_ipv4: number

<a href="#">Link to this property</a>

routes\_valid\_ipv6: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.bgp.routes%20%3E%20(method)%20stats%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.bgp.routes%20%3E%20(method)%20stats%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get BGP routing table stats

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/bgp/routes/stats \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "meta": {
      "data_time": "data_time",
      "query_time": "query_time",
      "total_peers": 0
    },
    "stats": {
      "distinct_origins": 0,
      "distinct_origins_ipv4": 0,
      "distinct_origins_ipv6": 0,
      "distinct_prefixes": 0,
      "distinct_prefixes_ipv4": 0,
      "distinct_prefixes_ipv6": 0,
      "routes_invalid": 0,
      "routes_invalid_ipv4": 0,
      "routes_invalid_ipv6": 0,
      "routes_total": 0,
      "routes_total_ipv4": 0,
      "routes_total_ipv6": 0,
      "routes_unknown": 0,
      "routes_unknown_ipv4": 0,
      "routes_unknown_ipv6": 0,
      "routes_valid": 0,
      "routes_valid_ipv4": 0,
      "routes_valid_ipv6": 0
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
      "data_time": "data_time",
      "query_time": "query_time",
      "total_peers": 0
    },
    "stats": {
      "distinct_origins": 0,
      "distinct_origins_ipv4": 0,
      "distinct_origins_ipv6": 0,
      "distinct_prefixes": 0,
      "distinct_prefixes_ipv4": 0,
      "distinct_prefixes_ipv6": 0,
      "routes_invalid": 0,
      "routes_invalid_ipv4": 0,
      "routes_invalid_ipv6": 0,
      "routes_total": 0,
      "routes_total_ipv4": 0,
      "routes_total_ipv6": 0,
      "routes_unknown": 0,
      "routes_unknown_ipv4": 0,
      "routes_unknown_ipv6": 0,
      "routes_valid": 0,
      "routes_valid_ipv4": 0,
      "routes_valid_ipv6": 0
    }
  },
  "success": true
}
```