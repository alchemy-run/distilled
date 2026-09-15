---
title: List Internet services categories
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[Ranking](https://developers.cloudflare.com/api/resources/radar/subresources/ranking)

[Internet Services](https://developers.cloudflare.com/api/resources/radar/subresources/ranking/subresources/internet_services)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Internet services categories

GET/radar/ranking/internet\_services/categories

Retrieves the list of Internet services categories.

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

date: optional array of string

Filters results by the specified array of dates.

[Link to this property](#)%20radar.ranking.internet_services%20%3E%20(method)%20categories%20%3E%20(params)%20default%20%3E%20(param)%20date%20%3E%20(schema)>)

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

[Link to this property](#)%20radar.ranking.internet_services%20%3E%20(method)%20categories%20%3E%20(params)%20default%20%3E%20(param)%20format%20%3E%20(schema)>)

limit: optional number

Limits the number of objects returned in the response.

[Link to this property](#)%20radar.ranking.internet_services%20%3E%20(method)%20categories%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

name: optional array of string

Array of names used to label the series in the response.

[Link to this property](#)%20radar.ranking.internet_services%20%3E%20(method)%20categories%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {categories\_0 }

</summary>

<details>

<summary>

categories\_0: array of object {name }

</summary>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.ranking.internet_services%20%3E%20(method)%20categories%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20radar.ranking.internet_services%20%3E%20(method)%20categories%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List Internet services categories

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/radar/ranking/internet_services/categories \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "categories_0": [
      {
        "name": "Generative AI"
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
    "categories_0": [
      {
        "name": "Generative AI"
      }
    ]
  },
  "success": true
}
```