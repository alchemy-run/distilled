---
title: Create a new Account Provider
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI Gateway](https://developers.cloudflare.com/api/resources/ai_gateway)

[Custom Providers](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/custom_providers)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create a new Account Provider

POST/accounts/{account\_id}/ai-gateway/custom-providers

Creates a new AI Gateway.

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

`AI Gateway Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20ai_gateway.custom_providers%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

base\_url: string

formaturi

[Link to this property](#)%20ai_gateway.custom_providers%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20base_url%20%3E%20(schema)>)

name: string

[Link to this property](#)%20ai_gateway.custom_providers%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

slug: string

[Link to this property](#)%20ai_gateway.custom_providers%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20slug%20%3E%20(schema)>)

beta: optional boolean

[Link to this property](#)%20ai_gateway.custom_providers%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20beta%20%3E%20(schema)>)

curl\_example: optional string

[Link to this property](#)%20ai_gateway.custom_providers%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20curl_example%20%3E%20(schema)>)

description: optional string

[Link to this property](#)%20ai_gateway.custom_providers%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20description%20%3E%20(schema)>)

enable: optional boolean

[Link to this property](#)%20ai_gateway.custom_providers%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20enable%20%3E%20(schema)>)

headers: optional string

maxLength8192

[Link to this property](#)%20ai_gateway.custom_providers%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20headers%20%3E%20(schema)>)

js\_example: optional string

[Link to this property](#)%20ai_gateway.custom_providers%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20js_example%20%3E%20(schema)>)

link: optional string

[Link to this property](#)%20ai_gateway.custom_providers%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20link%20%3E%20(schema)>)

position: optional number

[Link to this property](#)%20ai_gateway.custom_providers%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20position%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {id, base\_url, created\_at, 12 more }

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

[Link to this property](#)%20ai_gateway.custom_providers%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20ai_gateway.custom_providers%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Create a new Account Provider

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/custom-providers \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "base_url": "https://example.com",
          "name": "name",
          "slug": "slug"
        }'
```

200 example

```
{
  "result": {
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
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": {
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
  },
  "success": true
}
```