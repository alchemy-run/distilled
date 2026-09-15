---
title: Get top ASes by announced IP space
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[BGP](https://developers.cloudflare.com/api/resources/radar/subresources/bgp)

[IPs](https://developers.cloudflare.com/api/resources/radar/subresources/bgp/subresources/ips)

[Top](https://developers.cloudflare.com/api/resources/radar/subresources/bgp/subresources/ips/subresources/top)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get top ASes by announced IP space

GET/radar/bgp/ips/top/ases

Returns the top-N autonomous systems by announced IP space at the nearest 8-hour RIB boundary at or before the requested date. The snapped boundary is returned as `anchor_ts`.

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

Optional ISO 3166-1 alpha-2 country filter. Omit for global top-N.

maxLength2

minLength2

[Link to this property](#)%20radar.bgp.ips.top%20%3E%20(method)%20ases%20%3E%20(params)%20default%20%3E%20(param)%20country%20%3E%20(schema)>)

date: optional string

Filters results by the specified datetime (ISO 8601).

formatdate-time

[Link to this property](#)%20radar.bgp.ips.top%20%3E%20(method)%20ases%20%3E%20(params)%20default%20%3E%20(param)%20date%20%3E%20(schema)>)

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

[Link to this property](#)%20radar.bgp.ips.top%20%3E%20(method)%20ases%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

limit: optional number

Limits the number of objects returned in the response.

maximum50

minimum1

[Link to this property](#)%20radar.bgp.ips.top%20%3E%20(method)%20ases%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

<details>

<summary>

metric: optional "v4\_24s"or "v6\_48s"

Ranking metric: IPv4 /24 count or IPv6 /48 count.

</summary>

One of the following:

"v4\_24s"

<a href="#">Link to this property</a>

"v6\_48s"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.bgp.ips.top%20%3E%20(method)%20ases%20%3E%20(params)%20default%20%3E%20(param)%20metric%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {anchorTs, asns, country, metric }

</summary>

anchorTs: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

asns: array of object {asn, v4\_24s, v6\_48s }

</summary>

asn: number

<a href="#">Link to this property</a>

v4\_24s: number

<a href="#">Link to this property</a>

v6\_48s: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

country: string

<a href="#">Link to this property</a>

metric: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.bgp.ips.top%20%3E%20(method)%20ases%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.bgp.ips.top%20%3E%20(method)%20ases%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get top ASes by announced IP space

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/bgp/ips/top/ases \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "anchorTs": "2026-04-18T16:00:00Z",
    "asns": [
      {
        "asn": 749,
        "v4_24s": 875649,
        "v6_48s": 0
      }
    ],
    "country": "US",
    "metric": "v4_24s"
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "anchorTs": "2026-04-18T16:00:00Z",
    "asns": [
      {
        "asn": 749,
        "v4_24s": 875649,
        "v6_48s": 0
      }
    ],
    "country": "US",
    "metric": "v4_24s"
  },
  "success": true
}
```