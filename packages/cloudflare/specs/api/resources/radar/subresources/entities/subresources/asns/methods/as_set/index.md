---
title: Get IRR AS-SETs that an AS is a member of
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

# Get IRR AS-SETs that an AS is a member of

GET/radar/entities/asns/{asn}/as\_set

Retrieves Internet Routing Registry AS-SETs that an AS is a member of.

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

Retrieves all AS-SETs that the given AS is a member of.

[Link to this property](#)%20radar.entities.asns%20%3E%20(method)%20as_set%20%3E%20(params)%20default%20%3E%20(param)%20asn%20%3E%20(schema)>)

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

[Link to this property](#)%20radar.entities.asns%20%3E%20(method)%20as_set%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {as\_sets, paths }

</summary>

<details>

<summary>

as\_sets: array of object {as\_members\_count, as\_set\_members\_count, as\_set\_upstreams\_count, 6 more }

</summary>

as\_members\_count: number

The number of AS members in the AS-SET

<a href="#">Link to this property</a>

as\_set\_members\_count: number

The number of AS-SET members in the AS-SET

<a href="#">Link to this property</a>

as\_set\_upstreams\_count: number

The number of recursive upstream AS-SETs

<a href="#">Link to this property</a>

asn\_cone\_size: number

The number of unique ASNs in the AS-SETs recursive downstream

<a href="#">Link to this property</a>

irr\_sources: array of string

The IRR sources of the AS-SET

<a href="#">Link to this property</a>

name: string

The name of the AS-SET

<a href="#">Link to this property</a>

hierarchical\_asn: optional number

The AS number following hierarchical AS-SET name

<a href="#">Link to this property</a>

inferred\_asn: optional number

The inferred AS number of the AS-SET

<a href="#">Link to this property</a>

peeringdb\_asn: optional number

The AS number matching PeeringDB record

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

paths: array of array of string

Paths from the AS-SET that include the given AS to its upstreams recursively

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.entities.asns%20%3E%20(method)%20as_set%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.entities.asns%20%3E%20(method)%20as_set%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get IRR AS-SETs that an AS is a member of

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/entities/asns/$ASN/as_set \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "as_sets": [
      {
        "as_members_count": 0,
        "as_set_members_count": 0,
        "as_set_upstreams_count": 0,
        "asn_cone_size": 0,
        "irr_sources": [
          "string"
        ],
        "name": "name",
        "hierarchical_asn": 0,
        "inferred_asn": 0,
        "peeringdb_asn": 0
      }
    ],
    "paths": [
      [
        "string"
      ]
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
    "as_sets": [
      {
        "as_members_count": 0,
        "as_set_members_count": 0,
        "as_set_upstreams_count": 0,
        "asn_cone_size": 0,
        "irr_sources": [
          "string"
        ],
        "name": "name",
        "hierarchical_asn": 0,
        "inferred_asn": 0,
        "peeringdb_asn": 0
      }
    ],
    "paths": [
      [
        "string"
      ]
    ]
  },
  "success": true
}
```