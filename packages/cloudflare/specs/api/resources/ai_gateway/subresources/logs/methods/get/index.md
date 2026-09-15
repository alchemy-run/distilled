---
title: Get Gateway Log Detail
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI Gateway](https://developers.cloudflare.com/api/resources/ai_gateway)

[Logs](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/logs)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Gateway Log Detail

GET/accounts/{account\_id}/ai-gateway/gateways/{gateway\_id}/logs/{id}

Retrieves detailed information for a specific AI Gateway log entry.

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

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

gateway\_id: string

gateway id

maxLength64

minLength1

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20gateway_id%20%3E%20(schema)>)

id: string

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {id, cached, created\_at, 22 more }

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

request\_head: optional string

<a href="#">Link to this property</a>

request\_head\_complete: optional boolean

<a href="#">Link to this property</a>

request\_size: optional number

<a href="#">Link to this property</a>

request\_type: optional string

<a href="#">Link to this property</a>

response\_content\_type: optional string

<a href="#">Link to this property</a>

response\_head: optional string

<a href="#">Link to this property</a>

response\_head\_complete: optional boolean

<a href="#">Link to this property</a>

response\_size: optional number

<a href="#">Link to this property</a>

status\_code: optional number

<a href="#">Link to this property</a>

step: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20ai_gateway.logs%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get Gateway Log Detail

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/logs/$ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
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
    "request_head": "request_head",
    "request_head_complete": true,
    "request_size": 0,
    "request_type": "request_type",
    "response_content_type": "response_content_type",
    "response_head": "response_head",
    "response_head_complete": true,
    "response_size": 0,
    "status_code": 0,
    "step": 0
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": {
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
    "request_head": "request_head",
    "request_head_complete": true,
    "request_size": 0,
    "request_type": "request_type",
    "response_content_type": "response_content_type",
    "response_head": "response_head",
    "response_head_complete": true,
    "response_size": 0,
    "status_code": 0,
    "step": 0
  },
  "success": true
}
```