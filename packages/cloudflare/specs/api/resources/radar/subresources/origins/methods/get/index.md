---
title: Get Origin details
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[Origins](https://developers.cloudflare.com/api/resources/radar/subresources/origins)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Origin details

GET/radar/origins/{slug}

Retrieves the requested origin information with its regions.

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

<details>

<summary>

slug: "AMAZON"or "GOOGLE"or "MICROSOFT"or "ORACLE"

Origin slug.

</summary>

One of the following:

"AMAZON"

<a href="#">Link to this property</a>

"GOOGLE"

<a href="#">Link to this property</a>

"MICROSOFT"

<a href="#">Link to this property</a>

"ORACLE"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.origins%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20slug%20%3E%20(schema)>)

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

[Link to this property](#)%20radar.origins%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {origin }

</summary>

<details>

<summary>

origin: object {regions, slug }

</summary>

<details>

<summary>

regions: array of object {region }

</summary>

region: string

The region code.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

slug: string

The origin slug.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.origins%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.origins%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get Origin details

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/origins/$SLUG \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "origin": {
      "regions": [
        {
          "region": "us-east-1"
        }
      ],
      "slug": "amazon"
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
    "origin": {
      "regions": [
        {
          "region": "us-east-1"
        }
      ],
      "slug": "amazon"
    }
  },
  "success": true
}
```