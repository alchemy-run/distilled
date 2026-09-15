---
title: List Public Finetunes
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI](https://developers.cloudflare.com/api/resources/ai)

[Finetunes](https://developers.cloudflare.com/api/resources/ai/subresources/finetunes)

[Public](https://developers.cloudflare.com/api/resources/ai/subresources/finetunes/subresources/public)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Public Finetunes

GET/accounts/{account\_id}/ai/finetunes/public

Lists publicly available fine-tuned models that can be used with Workers AI.

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

[Link to this property](#)%20ai.finetunes.public%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

limit: optional number

Pagination Limit.

[Link to this property](#)%20ai.finetunes.public%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

offset: optional number

Pagination Offset.

[Link to this property](#)%20ai.finetunes.public%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20offset%20%3E%20(schema)>)

orderBy: optional string

Order By Column Name.

[Link to this property](#)%20ai.finetunes.public%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20orderBy%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: array of object {id, created\_at, model, 4 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

model: string

<a href="#">Link to this property</a>

modified\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

public: boolean

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai.finetunes.public%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20ai.finetunes.public%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List Public Finetunes

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai/finetunes/public \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": [
    {
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "created_at": "2019-12-27T18:11:19.117Z",
      "model": "model",
      "modified_at": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "public": true,
      "description": "description"
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
      "created_at": "2019-12-27T18:11:19.117Z",
      "model": "model",
      "modified_at": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "public": true,
      "description": "description"
    }
  ],
  "success": true
}
```