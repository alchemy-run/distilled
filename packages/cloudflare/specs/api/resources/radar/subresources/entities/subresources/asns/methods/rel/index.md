---
title: Get AS-level relationships by ASN
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[Entities](https://developers.cloudflare.com/api/resources/radar/subresources/entities)

[ASNs](https://developers.cloudflare.com/api/resources/radar/subresources/entities/subresources/asns)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get AS-level relationships by ASN

GET/radar/entities/asns/{asn}/rel

Retrieves AS-level relationship for given networks.

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

Retrieves all ASNs with provider-customer or peering relationships with the given ASN.

[Link to this property](#)%20radar.entities.asns%20%3E%20(method)%20rel%20%3E%20(params)%20default%20%3E%20(param)%20asn%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

asn2: optional number

Retrieves the AS relationship of ASN2 with respect to the given ASN.

[Link to this property](#)%20radar.entities.asns%20%3E%20(method)%20rel%20%3E%20(params)%20default%20%3E%20(param)%20asn2%20%3E%20(schema)>)

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

[Link to this property](#)%20radar.entities.asns%20%3E%20(method)%20rel%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {meta, rels }

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

rels: array of object {asn1, asn1\_country, asn1\_name, 4 more }

</summary>

asn1: number

<a href="#">Link to this property</a>

asn1\_country: string

<a href="#">Link to this property</a>

asn1\_name: string

<a href="#">Link to this property</a>

asn2: number

<a href="#">Link to this property</a>

asn2\_country: string

<a href="#">Link to this property</a>

asn2\_name: string

<a href="#">Link to this property</a>

rel: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.entities.asns%20%3E%20(method)%20rel%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.entities.asns%20%3E%20(method)%20rel%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get AS-level relationships by ASN

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/entities/asns/$ASN/rel \
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
    "rels": [
      {
        "asn1": 0,
        "asn1_country": "asn1_country",
        "asn1_name": "asn1_name",
        "asn2": 0,
        "asn2_country": "asn2_country",
        "asn2_name": "asn2_name",
        "rel": "rel"
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
    "rels": [
      {
        "asn1": 0,
        "asn1_country": "asn1_country",
        "asn1_name": "asn1_name",
        "asn2": 0,
        "asn2_country": "asn2_country",
        "asn2_name": "asn2_name",
        "rel": "rel"
      }
    ]
  },
  "success": true
}
```