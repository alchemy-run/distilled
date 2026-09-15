---
title: Get Multi-Origin AS (MOAS) prefixes
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

# Get Multi-Origin AS (MOAS) prefixes

GET/radar/bgp/routes/moas

Retrieves all Multi-Origin AS (MOAS) prefixes in the global routing tables.

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

[Link to this property](#)%20radar.bgp.routes%20%3E%20(method)%20moas%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

invalid\_only: optional boolean

Lookup only RPKI invalid MOASes.

[Link to this property](#)%20radar.bgp.routes%20%3E%20(method)%20moas%20%3E%20(params)%20default%20%3E%20(param)%20invalid_only%20%3E%20(schema)>)

origin: optional number

Lookup MOASes originated by the given ASN.

[Link to this property](#)%20radar.bgp.routes%20%3E%20(method)%20moas%20%3E%20(params)%20default%20%3E%20(param)%20origin%20%3E%20(schema)>)

prefix: optional string

[Link to this property](#)%20radar.bgp.routes%20%3E%20(method)%20moas%20%3E%20(params)%20default%20%3E%20(param)%20prefix%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {meta, moas }

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

moas: array of object {origins, prefix }

</summary>

<details>

<summary>

origins: array of object {origin, peer\_count, rpki\_validation }

</summary>

origin: number

<a href="#">Link to this property</a>

peer\_count: number

<a href="#">Link to this property</a>

rpki\_validation: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

prefix: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.bgp.routes%20%3E%20(method)%20moas%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.bgp.routes%20%3E%20(method)%20moas%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get Multi-Origin AS (MOAS) prefixes

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/bgp/routes/moas \
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
    "moas": [
      {
        "origins": [
          {
            "origin": 0,
            "peer_count": 0,
            "rpki_validation": "rpki_validation"
          }
        ],
        "prefix": "prefix"
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
      "data_time": "data_time",
      "query_time": "query_time",
      "total_peers": 0
    },
    "moas": [
      {
        "origins": [
          {
            "origin": 0,
            "peer_count": 0,
            "rpki_validation": "rpki_validation"
          }
        ],
        "prefix": "prefix"
      }
    ]
  },
  "success": true
}
```