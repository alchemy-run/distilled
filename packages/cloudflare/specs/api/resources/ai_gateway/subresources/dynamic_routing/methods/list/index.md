---
title: List all AI Gateway Dynamic Routes.
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI Gateway](https://developers.cloudflare.com/api/resources/ai_gateway)

[Dynamic Routing](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/dynamic_routing)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List all AI Gateway Dynamic Routes.

GET/accounts/{account\_id}/ai-gateway/gateways/{gateway\_id}/routes

List all AI Gateway Dynamic Routes.

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

[Link to this property](#)%20ai_gateway.dynamic_routing%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

gateway\_id: string

[Link to this property](#)%20ai_gateway.dynamic_routing%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20gateway_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

page: optional number

Page number

[Link to this property](#)%20ai_gateway.dynamic_routing%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Number of routes per page

[Link to this property](#)%20ai_gateway.dynamic_routing%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

data: object {order\_by, order\_by\_direction, page, 2 more }

</summary>

order\_by: string

<a href="#">Link to this property</a>

order\_by\_direction: string

<a href="#">Link to this property</a>

page: number

<a href="#">Link to this property</a>

per\_page: number

<a href="#">Link to this property</a>

<details>

<summary>

routes: array of object {id, account\_tag, created\_at, 6 more }

</summary>

id: string

<a href="#">Link to this property</a>

account\_tag: string

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

deployment: object {created\_at, deployment\_id, version\_id }

</summary>

created\_at: string

<a href="#">Link to this property</a>

deployment\_id: string

<a href="#">Link to this property</a>

version\_id: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

elements: array of object {id, outputs, type } or object {id, outputs, properties, type } or object {id, outputs, type } or 3 more

</summary>

One of the following:

<details>

<summary>

object {id, outputs, type }

</summary>

id: string

<a href="#">Link to this property</a>

<details>

<summary>

outputs: object {next }

</summary>

<details>

<summary>

next: object {elementId }

</summary>

elementId: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "start"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {id, outputs, properties, type }

</summary>

id: string

<a href="#">Link to this property</a>

<details>

<summary>

outputs: object {false, true }

</summary>

<details>

<summary>

false: object {elementId }

</summary>

elementId: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

true: object {elementId }

</summary>

elementId: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

properties: object {conditions }

</summary>

conditions: optional unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "conditional"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {id, outputs, type }

</summary>

id: string

<a href="#">Link to this property</a>

<details>

<summary>

outputs: map\[object {elementId } ]

</summary>

elementId: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "percentage"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {id, outputs, properties, type }

</summary>

id: string

<a href="#">Link to this property</a>

<details>

<summary>

outputs: object {fallback, success }

</summary>

<details>

<summary>

fallback: object {elementId }

</summary>

elementId: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

success: object {elementId }

</summary>

elementId: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

properties: object {key, limit, limitType, window }

</summary>

key: string

<a href="#">Link to this property</a>

limit: number

<a href="#">Link to this property</a>

<details>

<summary>

limitType: "count"or "cost"

</summary>

One of the following:

"count"

<a href="#">Link to this property</a>

"cost"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

window: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "rate"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {id, outputs, properties, type }

</summary>

id: string

<a href="#">Link to this property</a>

<details>

<summary>

outputs: object {fallback, success }

</summary>

<details>

<summary>

fallback: object {elementId }

</summary>

elementId: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

success: object {elementId }

</summary>

elementId: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

properties: object {model, provider, retries, timeout }

</summary>

model: string

<a href="#">Link to this property</a>

provider: string

<a href="#">Link to this property</a>

retries: number

<a href="#">Link to this property</a>

timeout: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "model"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {id, outputs, type }

</summary>

id: string

<a href="#">Link to this property</a>

<details>

<summary>

outputs: map\[object {elementId } ]

</summary>

elementId: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "end"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

gateway\_id: string

<a href="#">Link to this property</a>

modified\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

<details>

<summary>

version: object {active, created\_at, data, 2 more }

</summary>

<details>

<summary>

active: "true"or "false"

</summary>

One of the following:

"true"

<a href="#">Link to this property</a>

"false"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: string

<a href="#">Link to this property</a>

data: string

<a href="#">Link to this property</a>

version\_id: string

<a href="#">Link to this property</a>

is\_valid: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.dynamic_routing%20%3E%20(model)%20dynamic_routing_list_response%20%3E%20(schema)%20%3E%20(property)%20data>)

success: boolean

[Link to this property](#)%20ai_gateway.dynamic_routing%20%3E%20(model)%20dynamic_routing_list_response%20%3E%20(schema)%20%3E%20(property)%20success>)

### List all AI Gateway Dynamic Routes.

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/routes \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "data": {
    "order_by": "order_by",
    "order_by_direction": "order_by_direction",
    "page": 0,
    "per_page": 0,
    "routes": [
      {
        "id": "id",
        "account_tag": "account_tag",
        "created_at": "2019-12-27T18:11:19.117Z",
        "deployment": {
          "created_at": "created_at",
          "deployment_id": "deployment_id",
          "version_id": "version_id"
        },
        "elements": [
          {
            "id": "id",
            "outputs": {
              "next": {
                "elementId": "elementId"
              }
            },
            "type": "start"
          }
        ],
        "gateway_id": "gateway_id",
        "modified_at": "2019-12-27T18:11:19.117Z",
        "name": "name",
        "version": {
          "active": "true",
          "created_at": "created_at",
          "data": "data",
          "version_id": "version_id",
          "is_valid": true
        }
      }
    ]
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "data": {
    "order_by": "order_by",
    "order_by_direction": "order_by_direction",
    "page": 0,
    "per_page": 0,
    "routes": [
      {
        "id": "id",
        "account_tag": "account_tag",
        "created_at": "2019-12-27T18:11:19.117Z",
        "deployment": {
          "created_at": "created_at",
          "deployment_id": "deployment_id",
          "version_id": "version_id"
        },
        "elements": [
          {
            "id": "id",
            "outputs": {
              "next": {
                "elementId": "elementId"
              }
            },
            "type": "start"
          }
        ],
        "gateway_id": "gateway_id",
        "modified_at": "2019-12-27T18:11:19.117Z",
        "name": "name",
        "version": {
          "active": "true",
          "created_at": "created_at",
          "data": "data",
          "version_id": "version_id",
          "is_valid": true
        }
      }
    ]
  },
  "success": true
}
```