---
title: Files
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AutoRAG](https://developers.cloudflare.com/api/resources/autorag)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Files

Deprecated: Use AI Search instead.

GET/accounts/{account\_id}/autorag/rags/{id}/files

Lists files indexed by an AutoRAG.

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

`Auto Rag Write``Auto Rag Read`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20autorag%20%3E%20(method)%20files%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

id: string

rag id

maxLength32

minLength1

[Link to this property](#)%20autorag%20%3E%20(method)%20files%20%3E%20(params)%20default%20%3E%20(param)%20id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

page: optional number

minimum1

[Link to this property](#)%20autorag%20%3E%20(method)%20files%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

maximum50

minimum0

[Link to this property](#)%20autorag%20%3E%20(method)%20files%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

search: optional string

[Link to this property](#)%20autorag%20%3E%20(method)%20files%20%3E%20(params)%20default%20%3E%20(param)%20search%20%3E%20(schema)>)

<details>

<summary>

status: optional "completed"or "queued"or "running"or "error"

</summary>

One of the following:

"completed"

<a href="#">Link to this property</a>

"queued"

<a href="#">Link to this property</a>

"running"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20autorag%20%3E%20(method)%20files%20%3E%20(params)%20default%20%3E%20(param)%20status%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: array of object {error, key }

</summary>

error: string

<a href="#">Link to this property</a>

key: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20autorag%20%3E%20(method)%20files%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: object {count, page, total\_count, per\_page }

</summary>

count: number

<a href="#">Link to this property</a>

page: number

<a href="#">Link to this property</a>

total\_count: number

<a href="#">Link to this property</a>

per\_page: optional number

maximum50

minimum5

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20autorag%20%3E%20(method)%20files%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

success: boolean

[Link to this property](#)%20autorag%20%3E%20(method)%20files%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Files

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/autorag/rags/$ID/files \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": [
    {
      "error": "error",
      "key": "key"
    }
  ],
  "result_info": {
    "count": 0,
    "page": 0,
    "total_count": 0,
    "per_page": 5
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
      "error": "error",
      "key": "key"
    }
  ],
  "result_info": {
    "count": 0,
    "page": 0,
    "total_count": 0,
    "per_page": 5
  },
  "success": true
}
```