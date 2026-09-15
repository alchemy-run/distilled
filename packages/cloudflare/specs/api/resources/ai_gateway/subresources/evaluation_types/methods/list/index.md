---
title: List Evaluators
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI Gateway](https://developers.cloudflare.com/api/resources/ai_gateway)

[Evaluation Types](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/evaluation_types)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Evaluators

GET/accounts/{account\_id}/ai-gateway/evaluation-types

Lists all available evaluator types for scoring AI gateway responses.

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

[Link to this property](#)%20ai_gateway.evaluation_types%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

order\_by: optional string

[Link to this property](#)%20ai_gateway.evaluation_types%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order_by%20%3E%20(schema)>)

<details>

<summary>

order\_by\_direction: optional "asc"or "desc"

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.evaluation_types%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order_by_direction%20%3E%20(schema)>)

page: optional number

minimum1

[Link to this property](#)%20ai_gateway.evaluation_types%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

maximum50

minimum5

[Link to this property](#)%20ai_gateway.evaluation_types%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: array of object {id, created\_at, description, 5 more }

</summary>

id: string

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: string

<a href="#">Link to this property</a>

enable: boolean

<a href="#">Link to this property</a>

mandatory: boolean

<a href="#">Link to this property</a>

modified\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.evaluation_types%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: object {count, page, per\_page, total\_count }

</summary>

count: number

<a href="#">Link to this property</a>

page: number

<a href="#">Link to this property</a>

per\_page: number

<a href="#">Link to this property</a>

total\_count: number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.evaluation_types%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

success: boolean

[Link to this property](#)%20ai_gateway.evaluation_types%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List Evaluators

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/evaluation-types \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": [
    {
      "id": "id",
      "created_at": "2019-12-27T18:11:19.117Z",
      "description": "description",
      "enable": true,
      "mandatory": true,
      "modified_at": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "type": "type"
    }
  ],
  "result_info": {
    "count": 0,
    "page": 0,
    "per_page": 0,
    "total_count": 0
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
      "id": "id",
      "created_at": "2019-12-27T18:11:19.117Z",
      "description": "description",
      "enable": true,
      "mandatory": true,
      "modified_at": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "type": "type"
    }
  ],
  "result_info": {
    "count": 0,
    "page": 0,
    "per_page": 0,
    "total_count": 0
  },
  "success": true
}
```