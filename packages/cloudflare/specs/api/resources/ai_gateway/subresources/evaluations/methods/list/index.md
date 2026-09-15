---
title: List Evaluations
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI Gateway](https://developers.cloudflare.com/api/resources/ai_gateway)

[Evaluations](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/evaluations)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Evaluations

GET/accounts/{account\_id}/ai-gateway/gateways/{gateway\_id}/evaluations

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

[Link to this property](#)%20ai_gateway.evaluations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

gateway\_id: string

gateway id

maxLength64

minLength1

[Link to this property](#)%20ai_gateway.evaluations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20gateway_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

name: optional string

[Link to this property](#)%20ai_gateway.evaluations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

page: optional number

minimum1

[Link to this property](#)%20ai_gateway.evaluations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

maximum100

minimum1

[Link to this property](#)%20ai_gateway.evaluations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

processed: optional boolean

[Link to this property](#)%20ai_gateway.evaluations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20processed%20%3E%20(schema)>)

search: optional string

Search by id, name

[Link to this property](#)%20ai_gateway.evaluations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20search%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: array of object {id, created\_at, datasets, 6 more }

</summary>

id: string

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

datasets: array of object {id, account\_id, account\_tag, 6 more }

</summary>

id: string

<a href="#">Link to this property</a>

account\_id: string

<a href="#">Link to this property</a>

account\_tag: string

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

enable: boolean

<a href="#">Link to this property</a>

<details>

<summary>

filters: array of object {key, operator, value }

</summary>

<details>

<summary>

key: "created\_at"or "request\_content\_type"or "response\_content\_type"or 10 more

</summary>

One of the following:

"created\_at"

<a href="#">Link to this property</a>

"request\_content\_type"

<a href="#">Link to this property</a>

"response\_content\_type"

<a href="#">Link to this property</a>

"success"

<a href="#">Link to this property</a>

"cached"

<a href="#">Link to this property</a>

"provider"

<a href="#">Link to this property</a>

"model"

<a href="#">Link to this property</a>

"cost"

<a href="#">Link to this property</a>

"tokens"

<a href="#">Link to this property</a>

"tokens\_in"

<a href="#">Link to this property</a>

"tokens\_out"

<a href="#">Link to this property</a>

"duration"

<a href="#">Link to this property</a>

"feedback"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

operator: "eq"or "contains"or "lt"or "gt"

</summary>

One of the following:

"eq"

<a href="#">Link to this property</a>

"contains"

<a href="#">Link to this property</a>

"lt"

<a href="#">Link to this property</a>

"gt"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

value: array of stringor numberor boolean

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

gateway\_id: string

gateway id

maxLength64

minLength1

<a href="#">Link to this property</a>

modified\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

gateway\_id: string

gateway id

maxLength64

minLength1

<a href="#">Link to this property</a>

modified\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

processed: boolean

<a href="#">Link to this property</a>

<details>

<summary>

results: array of object {id, created\_at, evaluation\_id, 6 more }

</summary>

id: string

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

evaluation\_id: string

<a href="#">Link to this property</a>

evaluation\_type\_id: string

<a href="#">Link to this property</a>

modified\_at: string

formatdate-time

<a href="#">Link to this property</a>

result: string

<a href="#">Link to this property</a>

status: number

<a href="#">Link to this property</a>

status\_description: string

<a href="#">Link to this property</a>

total\_logs: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

total\_logs: number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.evaluations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20ai_gateway.evaluations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List Evaluations

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/evaluations \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": [
    {
      "id": "id",
      "created_at": "2019-12-27T18:11:19.117Z",
      "datasets": [
        {
          "id": "id",
          "account_id": "account_id",
          "account_tag": "account_tag",
          "created_at": "2019-12-27T18:11:19.117Z",
          "enable": true,
          "filters": [
            {
              "key": "created_at",
              "operator": "eq",
              "value": [
                "string"
              ]
            }
          ],
          "gateway_id": "my-gateway",
          "modified_at": "2019-12-27T18:11:19.117Z",
          "name": "name"
        }
      ],
      "gateway_id": "my-gateway",
      "modified_at": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "processed": true,
      "results": [
        {
          "id": "id",
          "created_at": "2019-12-27T18:11:19.117Z",
          "evaluation_id": "evaluation_id",
          "evaluation_type_id": "evaluation_type_id",
          "modified_at": "2019-12-27T18:11:19.117Z",
          "result": "result",
          "status": 0,
          "status_description": "status_description",
          "total_logs": 0
        }
      ],
      "total_logs": 0
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
      "id": "id",
      "created_at": "2019-12-27T18:11:19.117Z",
      "datasets": [
        {
          "id": "id",
          "account_id": "account_id",
          "account_tag": "account_tag",
          "created_at": "2019-12-27T18:11:19.117Z",
          "enable": true,
          "filters": [
            {
              "key": "created_at",
              "operator": "eq",
              "value": [
                "string"
              ]
            }
          ],
          "gateway_id": "my-gateway",
          "modified_at": "2019-12-27T18:11:19.117Z",
          "name": "name"
        }
      ],
      "gateway_id": "my-gateway",
      "modified_at": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "processed": true,
      "results": [
        {
          "id": "id",
          "created_at": "2019-12-27T18:11:19.117Z",
          "evaluation_id": "evaluation_id",
          "evaluation_type_id": "evaluation_type_id",
          "modified_at": "2019-12-27T18:11:19.117Z",
          "result": "result",
          "status": 0,
          "status_description": "status_description",
          "total_logs": 0
        }
      ],
      "total_logs": 0
    }
  ],
  "success": true
}
```