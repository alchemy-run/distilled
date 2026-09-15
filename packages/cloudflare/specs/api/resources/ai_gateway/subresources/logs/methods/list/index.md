---
title: List Gateway Logs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI Gateway](https://developers.cloudflare.com/api/resources/ai_gateway)

[Logs](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/logs)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Gateway Logs

GET/accounts/{account\_id}/ai-gateway/gateways/{gateway\_id}/logs

Lists request/response log entries for the AI gateway with filtering and pagination.

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

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

gateway\_id: string

gateway id

maxLength64

minLength1

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20gateway_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

Deprecatedcached: optional boolean

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20cached%20%3E%20(schema)>)

<details>

<summary>

Deprecateddirection: optional "asc"or "desc"

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

Deprecatedend\_date: optional string

formatdate-time

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20end_date%20%3E%20(schema)>)

<details>

<summary>

Deprecatedfeedback: optional 0or 1

</summary>

One of the following:

0

<a href="#">Link to this property</a>

1

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20feedback%20%3E%20(schema)>)

<details>

<summary>

filters: optional array of object {key, operator, value }

</summary>

<details>

<summary>

key: "id"or "created\_at"or "request\_content\_type"or 21 more

</summary>

One of the following:

"id"

<a href="#">Link to this property</a>

"created\_at"

<a href="#">Link to this property</a>

"request\_content\_type"

<a href="#">Link to this property</a>

"response\_content\_type"

<a href="#">Link to this property</a>

"request\_type"

<a href="#">Link to this property</a>

"success"

<a href="#">Link to this property</a>

"cached"

<a href="#">Link to this property</a>

"provider"

<a href="#">Link to this property</a>

"model"

<a href="#">Link to this property</a>

"model\_type"

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

"event\_id"

<a href="#">Link to this property</a>

"metadata.key"

<a href="#">Link to this property</a>

"metadata.value"

<a href="#">Link to this property</a>

"authentication"

<a href="#">Link to this property</a>

"wholesale"

<a href="#">Link to this property</a>

"compatibilityMode"

<a href="#">Link to this property</a>

"dlp\_action"

<a href="#">Link to this property</a>

"user\_agent"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

operator: "eq"or "neq"or "contains"or 2 more

</summary>

One of the following:

"eq"

<a href="#">Link to this property</a>

"neq"

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

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20filters%20%3E%20(schema)>)

Deprecatedmax\_cost: optional number

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20max_cost%20%3E%20(schema)>)

Deprecatedmax\_duration: optional number

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20max_duration%20%3E%20(schema)>)

Deprecatedmax\_tokens\_in: optional number

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20max_tokens_in%20%3E%20(schema)>)

Deprecatedmax\_tokens\_out: optional number

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20max_tokens_out%20%3E%20(schema)>)

Deprecatedmax\_total\_tokens: optional number

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20max_total_tokens%20%3E%20(schema)>)

meta\_info: optional boolean

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20meta_info%20%3E%20(schema)>)

Deprecatedmin\_cost: optional number

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20min_cost%20%3E%20(schema)>)

Deprecatedmin\_duration: optional number

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20min_duration%20%3E%20(schema)>)

Deprecatedmin\_tokens\_in: optional number

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20min_tokens_in%20%3E%20(schema)>)

Deprecatedmin\_tokens\_out: optional number

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20min_tokens_out%20%3E%20(schema)>)

Deprecatedmin\_total\_tokens: optional number

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20min_total_tokens%20%3E%20(schema)>)

Deprecatedmodel: optional string

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20model%20%3E%20(schema)>)

Deprecatedmodel\_type: optional string

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20model_type%20%3E%20(schema)>)

<details>

<summary>

order\_by: optional "created\_at"or "provider"or "model"or 3 more

</summary>

One of the following:

"created\_at"

<a href="#">Link to this property</a>

"provider"

<a href="#">Link to this property</a>

"model"

<a href="#">Link to this property</a>

"model\_type"

<a href="#">Link to this property</a>

"success"

<a href="#">Link to this property</a>

"cached"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order_by%20%3E%20(schema)>)

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

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order_by_direction%20%3E%20(schema)>)

page: optional number

minimum1

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

maximum50

minimum1

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

Deprecatedprovider: optional string

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20provider%20%3E%20(schema)>)

Deprecatedrequest\_content\_type: optional string

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20request_content_type%20%3E%20(schema)>)

Deprecatedresponse\_content\_type: optional string

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20response_content_type%20%3E%20(schema)>)

search: optional string

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20search%20%3E%20(schema)>)

Deprecatedstart\_date: optional string

formatdate-time

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20start_date%20%3E%20(schema)>)

Deprecatedsuccess: optional boolean

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20success%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: array of object {id, cached, created\_at, 16 more }

</summary>

id: string

<a href="#">Link to this property</a>

cached: boolean

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

duration: number

<a href="#">Link to this property</a>

model: string

<a href="#">Link to this property</a>

path: string

<a href="#">Link to this property</a>

provider: string

<a href="#">Link to this property</a>

success: boolean

<a href="#">Link to this property</a>

tokens\_in: number

<a href="#">Link to this property</a>

tokens\_out: number

<a href="#">Link to this property</a>

cost: optional number

<a href="#">Link to this property</a>

custom\_cost: optional boolean

<a href="#">Link to this property</a>

metadata: optional string

<a href="#">Link to this property</a>

model\_type: optional string

<a href="#">Link to this property</a>

request\_content\_type: optional string

<a href="#">Link to this property</a>

request\_type: optional string

<a href="#">Link to this property</a>

response\_content\_type: optional string

<a href="#">Link to this property</a>

status\_code: optional number

<a href="#">Link to this property</a>

step: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: object {count, max\_cost, max\_duration, 11 more }

</summary>

count: optional number

<a href="#">Link to this property</a>

max\_cost: optional number

<a href="#">Link to this property</a>

max\_duration: optional number

<a href="#">Link to this property</a>

max\_tokens\_in: optional number

<a href="#">Link to this property</a>

max\_tokens\_out: optional number

<a href="#">Link to this property</a>

max\_total\_tokens: optional number

<a href="#">Link to this property</a>

min\_cost: optional number

<a href="#">Link to this property</a>

min\_duration: optional number

<a href="#">Link to this property</a>

min\_tokens\_in: optional number

<a href="#">Link to this property</a>

min\_tokens\_out: optional number

<a href="#">Link to this property</a>

min\_total\_tokens: optional number

<a href="#">Link to this property</a>

page: optional number

<a href="#">Link to this property</a>

per\_page: optional number

<a href="#">Link to this property</a>

total\_count: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

success: boolean

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List Gateway Logs

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/logs \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": [
    {
      "id": "id",
      "cached": true,
      "created_at": "2019-12-27T18:11:19.117Z",
      "duration": 0,
      "model": "model",
      "path": "path",
      "provider": "provider",
      "success": true,
      "tokens_in": 0,
      "tokens_out": 0,
      "cost": 0,
      "custom_cost": true,
      "metadata": "metadata",
      "model_type": "model_type",
      "request_content_type": "request_content_type",
      "request_type": "request_type",
      "response_content_type": "response_content_type",
      "status_code": 0,
      "step": 0
    }
  ],
  "result_info": {
    "count": 0,
    "max_cost": 0,
    "max_duration": 0,
    "max_tokens_in": 0,
    "max_tokens_out": 0,
    "max_total_tokens": 0,
    "min_cost": 0,
    "min_duration": 0,
    "min_tokens_in": 0,
    "min_tokens_out": 0,
    "min_total_tokens": 0,
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
      "cached": true,
      "created_at": "2019-12-27T18:11:19.117Z",
      "duration": 0,
      "model": "model",
      "path": "path",
      "provider": "provider",
      "success": true,
      "tokens_in": 0,
      "tokens_out": 0,
      "cost": 0,
      "custom_cost": true,
      "metadata": "metadata",
      "model_type": "model_type",
      "request_content_type": "request_content_type",
      "request_type": "request_type",
      "response_content_type": "response_content_type",
      "status_code": 0,
      "step": 0
    }
  ],
  "result_info": {
    "count": 0,
    "max_cost": 0,
    "max_duration": 0,
    "max_tokens_in": 0,
    "max_tokens_out": 0,
    "max_total_tokens": 0,
    "min_cost": 0,
    "min_duration": 0,
    "min_tokens_in": 0,
    "min_tokens_out": 0,
    "min_total_tokens": 0,
    "page": 0,
    "per_page": 0,
    "total_count": 0
  },
  "success": true
}
```