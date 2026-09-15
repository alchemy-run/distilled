---
title: Get ASPA objects snapshot
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[BGP](https://developers.cloudflare.com/api/resources/radar/subresources/bgp)

[RPKI](https://developers.cloudflare.com/api/resources/radar/subresources/bgp/subresources/rpki)

[ASPA](https://developers.cloudflare.com/api/resources/radar/subresources/bgp/subresources/rpki/subresources/aspa)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get ASPA objects snapshot

GET/radar/bgp/rpki/aspa/snapshot

Retrieves current or historical ASPA (Autonomous System Provider Authorization) objects. ASPA objects define which ASNs are authorized upstream providers for a customer ASN.

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

customerAsn: optional number

Filter by customer ASN (the ASN publishing the ASPA object).

[Link to this property](#)%20radar.bgp.rpki.aspa%20%3E%20(method)%20snapshot%20%3E%20(params)%20default%20%3E%20(param)%20customerAsn%20%3E%20(schema)>)

date: optional string

Filters results by the specified datetime (ISO 8601).

formatdate-time

[Link to this property](#)%20radar.bgp.rpki.aspa%20%3E%20(method)%20snapshot%20%3E%20(params)%20default%20%3E%20(param)%20date%20%3E%20(schema)>)

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

[Link to this property](#)%20radar.bgp.rpki.aspa%20%3E%20(method)%20snapshot%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

includeAsnInfo: optional boolean

Include ASN metadata (name, country) in response.

[Link to this property](#)%20radar.bgp.rpki.aspa%20%3E%20(method)%20snapshot%20%3E%20(params)%20default%20%3E%20(param)%20includeAsnInfo%20%3E%20(schema)>)

providerAsn: optional number

Filter by provider ASN (an authorized upstream provider in ASPA objects).

[Link to this property](#)%20radar.bgp.rpki.aspa%20%3E%20(method)%20snapshot%20%3E%20(params)%20default%20%3E%20(param)%20providerAsn%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {asnInfo, aspaObjects, meta }

</summary>

<details>

<summary>

asnInfo: object {"13335" }

</summary>

<details>

<summary>

"13335": object {asn, country, name }

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

</details>

<a href="#">Link to this property</a>

<details>

<summary>

aspaObjects: array of object {customerAsn, providers }

</summary>

customerAsn: number

The customer ASN publishing the ASPA object.

<a href="#">Link to this property</a>

providers: array of number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

meta: object {dataTime, queryTime, totalCount }

</summary>

dataTime: string

Timestamp of the underlying data.

formatdate-time

<a href="#">Link to this property</a>

queryTime: string

Timestamp when the query was executed.

formatdate-time

<a href="#">Link to this property</a>

totalCount: number

Total number of ASPA objects.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.bgp.rpki.aspa%20%3E%20(method)%20snapshot%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.bgp.rpki.aspa%20%3E%20(method)%20snapshot%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get ASPA objects snapshot

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/bgp/rpki/aspa/snapshot \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "asnInfo": {
      "13335": {
        "asn": 0,
        "country": "country",
        "name": "name"
      }
    },
    "aspaObjects": [
      {
        "customerAsn": 0,
        "providers": [
          0
        ]
      }
    ],
    "meta": {
      "dataTime": "2019-12-27T18:11:19.117Z",
      "queryTime": "2019-12-27T18:11:19.117Z",
      "totalCount": 0
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
    "asnInfo": {
      "13335": {
        "asn": 0,
        "country": "country",
        "name": "name"
      }
    },
    "aspaObjects": [
      {
        "customerAsn": 0,
        "providers": [
          0
        ]
      }
    ],
    "meta": {
      "dataTime": "2019-12-27T18:11:19.117Z",
      "queryTime": "2019-12-27T18:11:19.117Z",
      "totalCount": 0
    }
  },
  "success": true
}
```