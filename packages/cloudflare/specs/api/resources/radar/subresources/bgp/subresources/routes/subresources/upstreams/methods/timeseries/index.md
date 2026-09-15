---
title: Get upstream composition time series for an AS
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[BGP](https://developers.cloudflare.com/api/resources/radar/subresources/bgp)

[Routes](https://developers.cloudflare.com/api/resources/radar/subresources/bgp/subresources/routes)

[Upstreams](https://developers.cloudflare.com/api/resources/radar/subresources/bgp/subresources/routes/subresources/upstreams)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get upstream composition time series for an AS

GET/radar/bgp/routes/upstreams/{asn}/timeseries

Retrieves the share of an AS’s observed paths carried by each direct upstream over time, derived from RouteViews RIB snapshots across all collectors (the combined product). Each upstream ASN is returned as its own series of shares (0–1); the least-significant upstreams beyond the requested limit are grouped into an “OTHER” series. Series share a common set of timestamps.

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

[Link to this property](#)%20radar.bgp.routes.upstreams%20%3E%20(method)%20timeseries%20%3E%20(params)%20default%20%3E%20(param)%20asn%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

dateEnd: optional string

End of the date range (inclusive). Alternative to `dateRange`; provide together with `dateStart`.

formatdate-time

[Link to this property](#)%20radar.bgp.routes.upstreams%20%3E%20(method)%20timeseries%20%3E%20(params)%20default%20%3E%20(param)%20dateEnd%20%3E%20(schema)>)

dateStart: optional string

Start of the date range (inclusive). Alternative to `dateRange`; provide together with `dateEnd`.

formatdate-time

[Link to this property](#)%20radar.bgp.routes.upstreams%20%3E%20(method)%20timeseries%20%3E%20(params)%20default%20%3E%20(param)%20dateStart%20%3E%20(schema)>)

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

[Link to this property](#)%20radar.bgp.routes.upstreams%20%3E%20(method)%20timeseries%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

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

[Link to this property](#)%20radar.bgp.routes.upstreams%20%3E%20(method)%20timeseries%20%3E%20(params)%20default%20%3E%20(param)%20ipVersion%20%3E%20(schema)>)

limit: optional number

Number of upstream ASNs to return as separate series, ranked by the first bucket. Remaining upstreams are grouped into an “OTHER” series. Defaults to 5.

[Link to this property](#)%20radar.bgp.routes.upstreams%20%3E%20(method)%20timeseries%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {meta, serie\_0 }

</summary>

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

serie\_0: object {timestamps }

</summary>

timestamps: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.bgp.routes.upstreams%20%3E%20(method)%20timeseries%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.bgp.routes.upstreams%20%3E%20(method)%20timeseries%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get upstream composition time series for an AS

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/bgp/routes/upstreams/$ASN/timeseries \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "meta": {
      "dataTime": "2019-12-27T18:11:19.117Z",
      "effectiveCollector": "effectiveCollector",
      "queryTime": "2019-12-27T18:11:19.117Z",
      "stale": true
    },
    "serie_0": {
      "timestamps": [
        "2023-08-08T10:15:00Z"
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
      "dataTime": "2019-12-27T18:11:19.117Z",
      "effectiveCollector": "effectiveCollector",
      "queryTime": "2019-12-27T18:11:19.117Z",
      "stale": true
    },
    "serie_0": {
      "timestamps": [
        "2023-08-08T10:15:00Z"
      ]
    }
  },
  "success": true
}
```