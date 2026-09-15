---
title: Get RPKI ROA deployment time series
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[BGP](https://developers.cloudflare.com/api/resources/radar/subresources/bgp)

[RPKI](https://developers.cloudflare.com/api/resources/radar/subresources/bgp/subresources/rpki)

[Roas](https://developers.cloudflare.com/api/resources/radar/subresources/bgp/subresources/rpki/subresources/roas)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get RPKI ROA deployment time series

GET/radar/bgp/rpki/roas/timeseries

Retrieves RPKI ROA (Route Origin Authorization) validation ratios over time. Returns the selected metric as a time series. Supports filtering by ASN or location (country code) — multiple values of the same filter type produce one series per value. If no ASN or location is specified, returns the global aggregate.

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

Filters results by Autonomous System Number. Specify one or more ASNs. Multiple values generate one series per ASN.

[Link to this property](#)%20radar.bgp.rpki.roas%20%3E%20(method)%20timeseries%20%3E%20(params)%20default%20%3E%20(param)%20asn%20%3E%20(schema)>)

dateEnd: optional string

End of the date range (inclusive). Alternative to `dateRange`; provide together with `dateStart`.

formatdate-time

[Link to this property](#)%20radar.bgp.rpki.roas%20%3E%20(method)%20timeseries%20%3E%20(params)%20default%20%3E%20(param)%20dateEnd%20%3E%20(schema)>)

dateStart: optional string

Start of the date range (inclusive). Alternative to `dateRange`; provide together with `dateEnd`.

formatdate-time

[Link to this property](#)%20radar.bgp.rpki.roas%20%3E%20(method)%20timeseries%20%3E%20(params)%20default%20%3E%20(param)%20dateStart%20%3E%20(schema)>)

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

[Link to this property](#)%20radar.bgp.rpki.roas%20%3E%20(method)%20timeseries%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

location: optional array of string

Filters results by location. Specify a comma-separated list of alpha-2 location codes.

[Link to this property](#)%20radar.bgp.rpki.roas%20%3E%20(method)%20timeseries%20%3E%20(params)%20default%20%3E%20(param)%20location%20%3E%20(schema)>)

<details>

<summary>

metric: optional "validPfxsRatio"or "validPfxsV4Ratio"or "validPfxsV6Ratio"or 3 more

Which RPKI ROA validation metric to return. validPfxsRatio = ratio of RPKI-valid prefixes (IPv4+IPv6 combined). validPfxsV4Ratio / validPfxsV6Ratio = same, split by IP version. validIpsRatio = ratio of RPKI-valid address space (IPv4 /24s + IPv6 /48s). validIpsV4Ratio / validIpsV6Ratio = same, split by IP version.

</summary>

One of the following:

"validPfxsRatio"

<a href="#">Link to this property</a>

"validPfxsV4Ratio"

<a href="#">Link to this property</a>

"validPfxsV6Ratio"

<a href="#">Link to this property</a>

"validIpsRatio"

<a href="#">Link to this property</a>

"validIpsV4Ratio"

<a href="#">Link to this property</a>

"validIpsV6Ratio"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.bgp.rpki.roas%20%3E%20(method)%20timeseries%20%3E%20(params)%20default%20%3E%20(param)%20metric%20%3E%20(schema)>)

name: optional array of string

Array of names used to label the series in the response.

[Link to this property](#)%20radar.bgp.rpki.roas%20%3E%20(method)%20timeseries%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {meta, serie\_0 }

</summary>

<details>

<summary>

meta: object {dataTime, queryTime }

</summary>

dataTime: string

Timestamp of the underlying data.

formatdate-time

<a href="#">Link to this property</a>

queryTime: string

Timestamp when the query was executed.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

serie\_0: object {timestamps, values }

</summary>

timestamps: array of string

<a href="#">Link to this property</a>

values: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.bgp.rpki.roas%20%3E%20(method)%20timeseries%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.bgp.rpki.roas%20%3E%20(method)%20timeseries%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get RPKI ROA deployment time series

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/bgp/rpki/roas/timeseries \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "meta": {
      "dataTime": "2019-12-27T18:11:19.117Z",
      "queryTime": "2019-12-27T18:11:19.117Z"
    },
    "serie_0": {
      "timestamps": [
        "2019-12-27T18:11:19.117Z"
      ],
      "values": [
        "10"
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
      "queryTime": "2019-12-27T18:11:19.117Z"
    },
    "serie_0": {
      "timestamps": [
        "2019-12-27T18:11:19.117Z"
      ],
      "values": [
        "10"
      ]
    }
  },
  "success": true
}
```