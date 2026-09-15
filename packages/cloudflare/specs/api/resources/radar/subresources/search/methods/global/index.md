---
title: Search for locations, ASes, reports, and more
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[Search](https://developers.cloudflare.com/api/resources/radar/subresources/search)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Search for locations, ASes, reports, and more

GET/radar/search/global

Searches for locations, autonomous systems, reports, bots, certificate logs, certificate authorities, industries and verticals. Location names can be localized by sending an `Accept-Language` HTTP header with a BCP 47 language tag (e.g., `Accept-Language: pt-PT`). The full quality-value chain is supported (e.g., `pt-PT,pt;q=0.9,en;q=0.8`).

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

query: string

String used to perform the search operation.

[Link to this property](#)%20radar.search%20%3E%20(method)%20global%20%3E%20(params)%20default%20%3E%20(param)%20query%20%3E%20(schema)>)

<details>

<summary>

exclude: optional array of "ADM1S"or "ASNS"or "BOTS"or 9 more

Search types excluded from results.

</summary>

One of the following:

"ADM1S"

<a href="#">Link to this property</a>

"ASNS"

<a href="#">Link to this property</a>

"BOTS"

<a href="#">Link to this property</a>

"CERTIFICATE\_AUTHORITIES"

<a href="#">Link to this property</a>

"CERTIFICATE\_LOGS"

<a href="#">Link to this property</a>

"ORIGINS"

<a href="#">Link to this property</a>

"ORIGIN\_REGIONS"

<a href="#">Link to this property</a>

"INDUSTRIES"

<a href="#">Link to this property</a>

"LOCATIONS"

<a href="#">Link to this property</a>

"NOTEBOOKS"

<a href="#">Link to this property</a>

"TLDS"

<a href="#">Link to this property</a>

"VERTICALS"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.search%20%3E%20(method)%20global%20%3E%20(params)%20default%20%3E%20(param)%20exclude%20%3E%20(schema)>)

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

[Link to this property](#)%20radar.search%20%3E%20(method)%20global%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

<details>

<summary>

include: optional array of "ADM1S"or "ASNS"or "BOTS"or 9 more

Search types included in results.

</summary>

One of the following:

"ADM1S"

<a href="#">Link to this property</a>

"ASNS"

<a href="#">Link to this property</a>

"BOTS"

<a href="#">Link to this property</a>

"CERTIFICATE\_AUTHORITIES"

<a href="#">Link to this property</a>

"CERTIFICATE\_LOGS"

<a href="#">Link to this property</a>

"ORIGINS"

<a href="#">Link to this property</a>

"ORIGIN\_REGIONS"

<a href="#">Link to this property</a>

"INDUSTRIES"

<a href="#">Link to this property</a>

"LOCATIONS"

<a href="#">Link to this property</a>

"NOTEBOOKS"

<a href="#">Link to this property</a>

"TLDS"

<a href="#">Link to this property</a>

"VERTICALS"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.search%20%3E%20(method)%20global%20%3E%20(params)%20default%20%3E%20(param)%20include%20%3E%20(schema)>)

limit: optional number

Limits the number of objects returned in the response.

exclusiveMinimum

minimum0

[Link to this property](#)%20radar.search%20%3E%20(method)%20global%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

limitPerGroup: optional number

Limits the number of objects per search category.

[Link to this property](#)%20radar.search%20%3E%20(method)%20global%20%3E%20(params)%20default%20%3E%20(param)%20limitPerGroup%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {search }

</summary>

<details>

<summary>

search: array of object {code, name, type }

</summary>

code: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.search%20%3E%20(method)%20global%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.search%20%3E%20(method)%20global%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Search for locations, ASes, reports, and more

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/search/global \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "search": [
      {
        "code": "13335",
        "name": "Cloudflare",
        "type": "asn"
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
    "search": [
      {
        "code": "13335",
        "name": "Cloudflare",
        "type": "asn"
      }
    ]
  },
  "success": true
}
```