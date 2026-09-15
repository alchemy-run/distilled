---
title: List Account Providers
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI Gateway](https://developers.cloudflare.com/api/resources/ai_gateway)

[Custom Providers](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/custom_providers)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Account Providers

GET/accounts/{account\_id}/ai-gateway/custom-providers

Lists all AI Gateway evaluator types configured for the account.

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

`AI Gateway Write``AI Gateway Read`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20ai_gateway.custom_providers%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

beta: optional boolean

[Link to this property](#)%20ai_gateway.custom_providers%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20beta%20%3E%20(schema)>)

enable: optional boolean

[Link to this property](#)%20ai_gateway.custom_providers%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20enable%20%3E%20(schema)>)

page: optional number

minimum1

[Link to this property](#)%20ai_gateway.custom_providers%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

maximum100

minimum1

[Link to this property](#)%20ai_gateway.custom_providers%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

search: optional string

Search by id, name, slug

[Link to this property](#)%20ai_gateway.custom_providers%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20search%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: array of object {id, base\_url, created\_at, 12 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

base\_url: string

formaturi

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

modified\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

slug: string

<a href="#">Link to this property</a>

beta: optional boolean

<a href="#">Link to this property</a>

curl\_example: optional string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

enable: optional boolean

<a href="#">Link to this property</a>

headers: optional string

maxLength8192

<a href="#">Link to this property</a>

js\_example: optional string

<a href="#">Link to this property</a>

link: optional string

<a href="#">Link to this property</a>

logo: optional string

<a href="#">Link to this property</a>

position: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.custom_providers%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20ai_gateway.custom_providers%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List Account Providers

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/custom-providers \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": [
    {
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "base_url": "https://example.com",
      "created_at": "2019-12-27T18:11:19.117Z",
      "modified_at": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "slug": "slug",
      "beta": true,
      "curl_example": "curl_example",
      "description": "description",
      "enable": true,
      "headers": "headers",
      "js_example": "js_example",
      "link": "link",
      "logo": "logo",
      "position": 0
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
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "base_url": "https://example.com",
      "created_at": "2019-12-27T18:11:19.117Z",
      "modified_at": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "slug": "slug",
      "beta": true,
      "curl_example": "curl_example",
      "description": "description",
      "enable": true,
      "headers": "headers",
      "js_example": "js_example",
      "link": "link",
      "logo": "logo",
      "position": 0
    }
  ],
  "success": true
}
```