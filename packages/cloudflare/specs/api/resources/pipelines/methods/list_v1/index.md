---
title: List Pipelines
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Pipelines](https://developers.cloudflare.com/api/resources/pipelines)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Pipelines

GET/accounts/{account\_id}/pipelines/v1/pipelines

List/Filter Pipelines in Account.

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

`Pipelines Write``Pipelines Read`

##### P ath ParametersExpand Collapse

account\_id: string

Specifies the public ID of the account.

[Link to this property](#)%20pipelines%20%3E%20(method)%20list_v1%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

name: optional string

Filters pipelines by name (case-insensitive substring).

maxLength128

minLength1

[Link to this property](#)%20pipelines%20%3E%20(method)%20list_v1%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

page: optional number

[Link to this property](#)%20pipelines%20%3E%20(method)%20list_v1%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

[Link to this property](#)%20pipelines%20%3E%20(method)%20list_v1%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: array of object {id, created\_at, modified\_at, 3 more }

</summary>

id: string

Indicates a unique identifier for this pipeline.

<a href="#">Link to this property</a>

created\_at: string

<a href="#">Link to this property</a>

modified\_at: string

<a href="#">Link to this property</a>

name: string

Indicates the name of the Pipeline.

maxLength128

minLength1

<a href="#">Link to this property</a>

sql: string

Specifies SQL for the Pipeline processing flow.

<a href="#">Link to this property</a>

status: string

Indicates the current status of the Pipeline.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pipelines%20%3E%20(method)%20list_v1%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: object {count, page, per\_page, total\_count }

</summary>

count: number

Indicates the number of items on current page.

<a href="#">Link to this property</a>

page: number

Indicates the current page number.

<a href="#">Link to this property</a>

per\_page: number

Indicates the number of items per page.

<a href="#">Link to this property</a>

total\_count: number

Indicates the total number of items.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pipelines%20%3E%20(method)%20list_v1%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

success: boolean

Indicates whether the API call was successful.

[Link to this property](#)%20pipelines%20%3E%20(method)%20list_v1%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List Pipelines

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pipelines/v1/pipelines \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": [
    {
      "id": "01234567890123457689012345678901",
      "created_at": "created_at",
      "modified_at": "modified_at",
      "name": "my_pipeline",
      "sql": "insert into sink select * from source;",
      "status": "status"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 0,
    "per_page": 10,
    "total_count": 1
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
      "id": "01234567890123457689012345678901",
      "created_at": "created_at",
      "modified_at": "modified_at",
      "name": "my_pipeline",
      "sql": "insert into sink select * from source;",
      "status": "status"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 0,
    "per_page": 10,
    "total_count": 1
  },
  "success": true
}
```