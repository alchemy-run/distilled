---
title: List TLDs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[TLDs](https://developers.cloudflare.com/api/resources/radar/subresources/tlds)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List TLDs

GET/radar/tlds

Retrieves a list of TLDs.

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

[Link to this property](#)%20radar.tlds%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

limit: optional number

Limits the number of objects returned in the response.

exclusiveMinimum

minimum0

[Link to this property](#)%20radar.tlds%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

offset: optional number

Skips the specified number of objects before fetching the results.

minimum0

[Link to this property](#)%20radar.tlds%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20offset%20%3E%20(schema)>)

tld: optional string

Filters results by top-level domain. Specify a comma-separated list of TLDs.

[Link to this property](#)%20radar.tlds%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20tld%20%3E%20(schema)>)

tldManager: optional string

Filters results by TLD manager.

maxLength100

[Link to this property](#)%20radar.tlds%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20tldManager%20%3E%20(schema)>)

<details>

<summary>

tldType: optional "GENERIC"or "COUNTRY\_CODE"or "GENERIC\_RESTRICTED"or 2 more

Filters results by TLD type.

</summary>

One of the following:

"GENERIC"

<a href="#">Link to this property</a>

"COUNTRY\_CODE"

<a href="#">Link to this property</a>

"GENERIC\_RESTRICTED"

<a href="#">Link to this property</a>

"INFRASTRUCTURE"

<a href="#">Link to this property</a>

"SPONSORED"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.tlds%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20tldType%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {tlds }

</summary>

<details>

<summary>

tlds: array of object {manager, tld, type }

</summary>

manager: string

The organization that manages the TLD.

<a href="#">Link to this property</a>

tld: string

The actual TLD.

<a href="#">Link to this property</a>

type: string

The type of TLD.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.tlds%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.tlds%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List TLDs

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/tlds \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "tlds": [
      {
        "manager": "VeriSign Global Registry Services",
        "tld": "com",
        "type": "GENERIC"
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
    "tlds": [
      {
        "manager": "VeriSign Global Registry Services",
        "tld": "com",
        "type": "GENERIC"
      }
    ]
  },
  "success": true
}
```