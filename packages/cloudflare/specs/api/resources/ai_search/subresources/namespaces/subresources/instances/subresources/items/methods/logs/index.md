---
title: Item Logs.
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI Search](https://developers.cloudflare.com/api/resources/ai_search)

[Namespaces](https://developers.cloudflare.com/api/resources/ai_search/subresources/namespaces)

[Instances](https://developers.cloudflare.com/api/resources/ai_search/subresources/namespaces/subresources/instances)

[Items](https://developers.cloudflare.com/api/resources/ai_search/subresources/namespaces/subresources/instances/subresources/items)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Item Logs.

GET/accounts/{account\_id}/ai-search/namespaces/{name}/instances/{id}/items/{item\_id}/logs

Lists processing logs for a specific item in an AI Search instance.

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

[Link to this property](#)%20ai_search.namespaces.instances.items%20%3E%20(method)%20logs%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

name: string

[Link to this property](#)%20ai_search.namespaces.instances.items%20%3E%20(method)%20logs%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

id: string

AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.

maxLength64

minLength1

[Link to this property](#)%20ai_search.namespaces.instances.items%20%3E%20(method)%20logs%20%3E%20(params)%20default%20%3E%20(param)%20id%20%3E%20(schema)>)

item\_id: string

[Link to this property](#)%20ai_search.namespaces.instances.items%20%3E%20(method)%20logs%20%3E%20(params)%20default%20%3E%20(param)%20item_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

cursor: optional string

maxLength512

[Link to this property](#)%20ai_search.namespaces.instances.items%20%3E%20(method)%20logs%20%3E%20(params)%20default%20%3E%20(param)%20cursor%20%3E%20(schema)>)

limit: optional number

maximum100

minimum1

[Link to this property](#)%20ai_search.namespaces.instances.items%20%3E%20(method)%20logs%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: array of object {action, chunkCount, errorType, 4 more }

</summary>

action: string

<a href="#">Link to this property</a>

chunkCount: number

<a href="#">Link to this property</a>

errorType: string

<a href="#">Link to this property</a>

fileKey: string

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

processingTimeMs: number

<a href="#">Link to this property</a>

timestamp: string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_search.namespaces.instances.items%20%3E%20(method)%20logs%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: object {count, cursor, per\_page, truncated }

</summary>

count: number

<a href="#">Link to this property</a>

cursor: string

<a href="#">Link to this property</a>

per\_page: number

<a href="#">Link to this property</a>

truncated: boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_search.namespaces.instances.items%20%3E%20(method)%20logs%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

success: boolean

[Link to this property](#)%20ai_search.namespaces.instances.items%20%3E%20(method)%20logs%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Item Logs.

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME/instances/$ID/items/$ITEM_ID/logs \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": [
    {
      "action": "action",
      "chunkCount": 0,
      "errorType": "errorType",
      "fileKey": "fileKey",
      "message": "message",
      "processingTimeMs": 0,
      "timestamp": "2019-12-27T18:11:19.117Z"
    }
  ],
  "result_info": {
    "count": 0,
    "cursor": "cursor",
    "per_page": 0,
    "truncated": true
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": [
    {
      "action": "action",
      "chunkCount": 0,
      "errorType": "errorType",
      "fileKey": "fileKey",
      "message": "message",
      "processingTimeMs": 0,
      "timestamp": "2019-12-27T18:11:19.117Z"
    }
  ],
  "result_info": {
    "count": 0,
    "cursor": "cursor",
    "per_page": 0,
    "truncated": true
  },
  "success": true
}
```