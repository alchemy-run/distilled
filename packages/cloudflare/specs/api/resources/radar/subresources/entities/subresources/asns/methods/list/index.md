---
title: List autonomous systems
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

# List autonomous systems

GET/radar/entities/asns

Retrieves a list of autonomous systems.

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

asn: optional string

Filters results by Autonomous System. Specify one or more Autonomous System Numbers (ASNs) as a comma-separated list.

[Link to this property](#)%20radar.entities.asns%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20asn%20%3E%20(schema)>)

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

[Link to this property](#)%20radar.entities.asns%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

limit: optional number

Limits the number of objects returned in the response.

exclusiveMinimum

minimum0

[Link to this property](#)%20radar.entities.asns%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

location: optional string

Filters results by location. Specify an alpha-2 location code.

maxLength2

minLength2

[Link to this property](#)%20radar.entities.asns%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20location%20%3E%20(schema)>)

offset: optional number

Skips the specified number of objects before fetching the results.

minimum0

[Link to this property](#)%20radar.entities.asns%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20offset%20%3E%20(schema)>)

<details>

<summary>

orderBy: optional "ASN"or "POPULATION"

Specifies the metric to order the ASNs by.

</summary>

One of the following:

"ASN"

<a href="#">Link to this property</a>

"POPULATION"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.entities.asns%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20orderBy%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {asns }

</summary>

<details>

<summary>

asns: array of object {asn, country, countryName, 5 more }

</summary>

asn: number

<a href="#">Link to this property</a>

country: string

<a href="#">Link to this property</a>

countryName: string

<a href="#">Link to this property</a>

<details>

<summary>

estimatedUsers: object {estimatedUsers }

</summary>

estimatedUsers: optional number

Total estimated users.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

aka: optional string

<a href="#">Link to this property</a>

orgName: optional string

<a href="#">Link to this property</a>

website: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.entities.asns%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.entities.asns%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List autonomous systems

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/entities/asns \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "asns": [
      {
        "asn": 714,
        "country": "GB",
        "countryName": "United Kingdom",
        "estimatedUsers": {
          "estimatedUsers": 86099
        },
        "name": "Apple Inc.",
        "aka": "aka",
        "orgName": "orgName",
        "website": "https://www.apple.com/support/systemstatus/"
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
    "asns": [
      {
        "asn": 714,
        "country": "GB",
        "countryName": "United Kingdom",
        "estimatedUsers": {
          "estimatedUsers": 86099
        },
        "name": "Apple Inc.",
        "aka": "aka",
        "orgName": "orgName",
        "website": "https://www.apple.com/support/systemstatus/"
      }
    ]
  },
  "success": true
}
```