---
title: Convert Files into Markdown
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI](https://developers.cloudflare.com/api/resources/ai)

[To Markdown](https://developers.cloudflare.com/api/resources/ai/subresources/to_markdown)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Convert Files into Markdown

POST/accounts/{account\_id}/ai/tomarkdown

Converts uploaded files into Markdown format using Workers AI.

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

`Workers AI Write``Workers AI Read`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20ai.to_markdown%20%3E%20(method)%20transform%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersForm DataExpand Collapse

<details>

<summary>

file: object {files }

</summary>

files: array of string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai.to_markdown%20%3E%20(method)%20transform%20%3E%20(params)%200%20%3E%20(param)%20file%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: array of object {data, format, mimeType, 2 more }

</summary>

data: string

<a href="#">Link to this property</a>

format: string

<a href="#">Link to this property</a>

mimeType: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

tokens: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai.to_markdown%20%3E%20(method)%20transform%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20ai.to_markdown%20%3E%20(method)%20transform%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Convert Files into Markdown

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai/tomarkdown \
    -H 'Content-Type: multipart/form-data' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -F file='{"files":["Example data"]}'
```

200 example

```
{
  "result": [
    {
      "data": "data",
      "format": "format",
      "mimeType": "mimeType",
      "name": "name",
      "tokens": "tokens"
    }
  ],
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": [
    {
      "data": "data",
      "format": "format",
      "mimeType": "mimeType",
      "name": "name",
      "tokens": "tokens"
    }
  ],
  "success": true
}
```