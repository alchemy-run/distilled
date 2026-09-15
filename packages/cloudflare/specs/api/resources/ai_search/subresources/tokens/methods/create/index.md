---
title: Create a token
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI Search](https://developers.cloudflare.com/api/resources/ai_search)

[Tokens](https://developers.cloudflare.com/api/resources/ai_search/subresources/tokens)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create a token

POST/accounts/{account\_id}/ai-search/tokens

Create a stored Cloudflare credential for an AI Search instance to access its data source.

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

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20ai_search.tokens%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

cf\_api\_id: string

[Link to this property](#)%20ai_search.tokens%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20cf_api_id%20%3E%20(schema)>)

cf\_api\_key: string

[Link to this property](#)%20ai_search.tokens%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20cf_api_key%20%3E%20(schema)>)

name: string

[Link to this property](#)%20ai_search.tokens%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

legacy: optional boolean

[Link to this property](#)%20ai_search.tokens%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20legacy%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {id, cf\_api\_id, created\_at, 6 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

cf\_api\_id: string

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

modified\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

created\_by: optional string

<a href="#">Link to this property</a>

enabled: optional boolean

<a href="#">Link to this property</a>

legacy: optional boolean

<a href="#">Link to this property</a>

modified\_by: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_search.tokens%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

[Link to this property](#)%20ai_search.tokens%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Create a token

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/tokens \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "cf_api_id": "a1b2c3d4e5f6",
          "cf_api_key": "abc123",
          "name": "my-token"
        }'
```

200 example

```
{
  "result": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "cf_api_id": "cf_api_id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "created_by": "created_by",
    "enabled": true,
    "legacy": true,
    "modified_by": "modified_by"
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
    "cf_api_id": "cf_api_id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "created_by": "created_by",
    "enabled": true,
    "legacy": true,
    "modified_by": "modified_by"
  },
  "success": true
}
```