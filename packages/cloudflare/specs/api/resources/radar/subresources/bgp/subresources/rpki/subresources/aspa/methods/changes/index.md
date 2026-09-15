---
title: Get ASPA changes over time
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

# Get ASPA changes over time

GET/radar/bgp/rpki/aspa/changes

Retrieves ASPA (Autonomous System Provider Authorization) changes over time. Returns daily aggregated changes including additions, removals, and modifications of ASPA objects.

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

Filter changes involving this ASN (as customer or provider).

[Link to this property](#)%20radar.bgp.rpki.aspa%20%3E%20(method)%20changes%20%3E%20(params)%20default%20%3E%20(param)%20asn%20%3E%20(schema)>)

dateEnd: optional string

End of the date range (inclusive). Alternative to `dateRange`; provide together with `dateStart`.

formatdate-time

[Link to this property](#)%20radar.bgp.rpki.aspa%20%3E%20(method)%20changes%20%3E%20(params)%20default%20%3E%20(param)%20dateEnd%20%3E%20(schema)>)

dateStart: optional string

Start of the date range (inclusive). Alternative to `dateRange`; provide together with `dateEnd`.

formatdate-time

[Link to this property](#)%20radar.bgp.rpki.aspa%20%3E%20(method)%20changes%20%3E%20(params)%20default%20%3E%20(param)%20dateStart%20%3E%20(schema)>)

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

[Link to this property](#)%20radar.bgp.rpki.aspa%20%3E%20(method)%20changes%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

includeAsnInfo: optional boolean

Include ASN metadata (name, country) in response.

[Link to this property](#)%20radar.bgp.rpki.aspa%20%3E%20(method)%20changes%20%3E%20(params)%20default%20%3E%20(param)%20includeAsnInfo%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {asnInfo, changes, meta }

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

changes: array of object {customersAdded, customersRemoved, date, 4 more }

</summary>

customersAdded: number

Number of new ASPA objects created.

<a href="#">Link to this property</a>

customersRemoved: number

Number of ASPA objects deleted.

<a href="#">Link to this property</a>

date: string

Date of the changes in ISO 8601 format.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

entries: array of object {customerAsn, providers, type }

</summary>

customerAsn: number

The customer ASN affected.

<a href="#">Link to this property</a>

providers: array of number

<a href="#">Link to this property</a>

<details>

<summary>

type: "CustomerAdded"or "CustomerRemoved"or "ProvidersAdded"or "ProvidersRemoved"

</summary>

One of the following:

"CustomerAdded"

<a href="#">Link to this property</a>

"CustomerRemoved"

<a href="#">Link to this property</a>

"ProvidersAdded"

<a href="#">Link to this property</a>

"ProvidersRemoved"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

providersAdded: number

Number of providers added to existing objects.

<a href="#">Link to this property</a>

providersRemoved: number

Number of providers removed from existing objects.

<a href="#">Link to this property</a>

totalCount: number

Running total of active ASPA objects after this day.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

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

</details>

[Link to this property](#)%20radar.bgp.rpki.aspa%20%3E%20(method)%20changes%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.bgp.rpki.aspa%20%3E%20(method)%20changes%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get ASPA changes over time

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/bgp/rpki/aspa/changes \
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
    "changes": [
      {
        "customersAdded": 0,
        "customersRemoved": 0,
        "date": "2019-12-27T18:11:19.117Z",
        "entries": [
          {
            "customerAsn": 0,
            "providers": [
              0
            ],
            "type": "CustomerAdded"
          }
        ],
        "providersAdded": 0,
        "providersRemoved": 0,
        "totalCount": 0
      }
    ],
    "meta": {
      "dataTime": "2019-12-27T18:11:19.117Z",
      "queryTime": "2019-12-27T18:11:19.117Z"
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
    "changes": [
      {
        "customersAdded": 0,
        "customersRemoved": 0,
        "date": "2019-12-27T18:11:19.117Z",
        "entries": [
          {
            "customerAsn": 0,
            "providers": [
              0
            ],
            "type": "CustomerAdded"
          }
        ],
        "providersAdded": 0,
        "providersRemoved": 0,
        "totalCount": 0
      }
    ],
    "meta": {
      "dataTime": "2019-12-27T18:11:19.117Z",
      "queryTime": "2019-12-27T18:11:19.117Z"
    }
  },
  "success": true
}
```