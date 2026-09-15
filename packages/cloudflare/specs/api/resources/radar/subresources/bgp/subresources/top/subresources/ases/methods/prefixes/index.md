---
title: Get top ASes by prefix count
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[BGP](https://developers.cloudflare.com/api/resources/radar/subresources/bgp)

[Top](https://developers.cloudflare.com/api/resources/radar/subresources/bgp/subresources/top)

[Ases](https://developers.cloudflare.com/api/resources/radar/subresources/bgp/subresources/top/subresources/ases)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get top ASes by prefix count

GET/radar/bgp/top/ases/prefixes

Retrieves the full list of autonomous systems on the global routing table ordered by announced prefixes count. The data comes from public BGP MRT data archives and updates every 2 hours.

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

country: optional string

Alpha-2 country code.

[Link to this property](#)%20radar.bgp.top.ases%20%3E%20(method)%20prefixes%20%3E%20(params)%20default%20%3E%20(param)%20country%20%3E%20(schema)>)

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

[Link to this property](#)%20radar.bgp.top.ases%20%3E%20(method)%20prefixes%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

limit: optional number

Maximum number of ASes to return.

[Link to this property](#)%20radar.bgp.top.ases%20%3E%20(method)%20prefixes%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {asns, meta }

</summary>

<details>

<summary>

asns: array of object {asn, country, name, pfxs\_count }

</summary>

asn: number

<a href="#">Link to this property</a>

country: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

pfxs\_count: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

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

</details>

[Link to this property](#)%20radar.bgp.top.ases%20%3E%20(method)%20prefixes%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.bgp.top.ases%20%3E%20(method)%20prefixes%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get top ASes by prefix count

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/bgp/top/ases/prefixes \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "asns": [
      {
        "asn": 0,
        "country": "country",
        "name": "name",
        "pfxs_count": 0
      }
    ],
    "meta": {
      "data_time": "data_time",
      "query_time": "query_time",
      "total_peers": 0
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
    "asns": [
      {
        "asn": 0,
        "country": "country",
        "name": "name",
        "pfxs_count": 0
      }
    ],
    "meta": {
      "data_time": "data_time",
      "query_time": "query_time",
      "total_peers": 0
    }
  },
  "success": true
}
```