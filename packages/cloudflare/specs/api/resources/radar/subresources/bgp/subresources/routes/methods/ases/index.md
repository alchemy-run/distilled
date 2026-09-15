---
title: List ASes from global routing tables
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

# List ASes from global routing tables

GET/radar/bgp/routes/ases

Retrieves all ASes in the current global routing tables with routing statistics.

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

[Link to this property](#)%20radar.bgp.routes%20%3E%20(method)%20ases%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

limit: optional number

Limits the number of objects returned in the response.

exclusiveMinimum

minimum0

[Link to this property](#)%20radar.bgp.routes%20%3E%20(method)%20ases%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

location: optional string

Filters results by location. Specify an alpha-2 location code.

maxLength2

minLength2

[Link to this property](#)%20radar.bgp.routes%20%3E%20(method)%20ases%20%3E%20(params)%20default%20%3E%20(param)%20location%20%3E%20(schema)>)

<details>

<summary>

sortBy: optional "cone"or "pfxs"or "ipv4"or 4 more

Sorts results by the specified field.

</summary>

One of the following:

"cone"

<a href="#">Link to this property</a>

"pfxs"

<a href="#">Link to this property</a>

"ipv4"

<a href="#">Link to this property</a>

"ipv6"

<a href="#">Link to this property</a>

"rpki\_valid"

<a href="#">Link to this property</a>

"rpki\_invalid"

<a href="#">Link to this property</a>

"rpki\_unknown"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.bgp.routes%20%3E%20(method)%20ases%20%3E%20(params)%20default%20%3E%20(param)%20sortBy%20%3E%20(schema)>)

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

[Link to this property](#)%20radar.bgp.routes%20%3E%20(method)%20ases%20%3E%20(params)%20default%20%3E%20(param)%20sortOrder%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {asns, meta }

</summary>

<details>

<summary>

asns: array of object {asn, coneSize, country, 7 more }

</summary>

asn: number

<a href="#">Link to this property</a>

coneSize: number

AS’s customer cone size.

<a href="#">Link to this property</a>

country: string

Alpha-2 code for the AS’s registration country.

<a href="#">Link to this property</a>

ipv4Count: number

Number of IPv4 addresses originated by the AS.

<a href="#">Link to this property</a>

ipv6Count: string

Number of IPv6 addresses originated by the AS.

<a href="#">Link to this property</a>

name: string

Name of the AS.

<a href="#">Link to this property</a>

pfxsCount: number

Number of total IP prefixes originated by the AS.

<a href="#">Link to this property</a>

rpkiInvalid: number

Number of RPKI invalid prefixes originated by the AS.

<a href="#">Link to this property</a>

rpkiUnknown: number

Number of RPKI unknown prefixes originated by the AS.

<a href="#">Link to this property</a>

rpkiValid: number

Number of RPKI valid prefixes originated by the AS.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

meta: object {dataTime, queryTime, totalPeers }

</summary>

dataTime: string

The timestamp of when the data is generated.

<a href="#">Link to this property</a>

queryTime: string

The timestamp of the query.

<a href="#">Link to this property</a>

totalPeers: number

Total number of route collector peers used to generate this data.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.bgp.routes%20%3E%20(method)%20ases%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.bgp.routes%20%3E%20(method)%20ases%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List ASes from global routing tables

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/bgp/routes/ases \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "asns": [
      {
        "asn": 0,
        "coneSize": 0,
        "country": "US",
        "ipv4Count": 0,
        "ipv6Count": "1.21e24",
        "name": "name",
        "pfxsCount": 0,
        "rpkiInvalid": 0,
        "rpkiUnknown": 0,
        "rpkiValid": 0
      }
    ],
    "meta": {
      "dataTime": "2024-06-03T14:00:00",
      "queryTime": "2024-06-03T14:00:00",
      "totalPeers": 0
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
        "coneSize": 0,
        "country": "US",
        "ipv4Count": 0,
        "ipv6Count": "1.21e24",
        "name": "name",
        "pfxsCount": 0,
        "rpkiInvalid": 0,
        "rpkiUnknown": 0,
        "rpkiValid": 0
      }
    ],
    "meta": {
      "dataTime": "2024-06-03T14:00:00",
      "queryTime": "2024-06-03T14:00:00",
      "totalPeers": 0
    }
  },
  "success": true
}
```