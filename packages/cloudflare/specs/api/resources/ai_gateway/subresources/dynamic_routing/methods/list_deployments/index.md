---
title: List all AI Gateway Dynamic Route Deployments.
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI Gateway](https://developers.cloudflare.com/api/resources/ai_gateway)

[Dynamic Routing](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/dynamic_routing)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List all AI Gateway Dynamic Route Deployments.

GET/accounts/{account\_id}/ai-gateway/gateways/{gateway\_id}/routes/{id}/deployments

List all AI Gateway Dynamic Route Deployments.

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

[Link to this property](#)%20ai_gateway.dynamic_routing%20%3E%20(method)%20list_deployments%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

gateway\_id: string

[Link to this property](#)%20ai_gateway.dynamic_routing%20%3E%20(method)%20list_deployments%20%3E%20(params)%20default%20%3E%20(param)%20gateway_id%20%3E%20(schema)>)

id: string

[Link to this property](#)%20ai_gateway.dynamic_routing%20%3E%20(method)%20list_deployments%20%3E%20(params)%20default%20%3E%20(param)%20id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

data: object {deployments, order\_by, order\_by\_direction, 2 more }

</summary>

<details>

<summary>

deployments: array of object {created\_at, deployment\_id, version\_id }

</summary>

created\_at: string

<a href="#">Link to this property</a>

deployment\_id: string

<a href="#">Link to this property</a>

version\_id: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

order\_by: string

<a href="#">Link to this property</a>

order\_by\_direction: string

<a href="#">Link to this property</a>

page: number

<a href="#">Link to this property</a>

per\_page: number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.dynamic_routing%20%3E%20(model)%20dynamic_routing_list_deployments_response%20%3E%20(schema)%20%3E%20(property)%20data>)

success: boolean

[Link to this property](#)%20ai_gateway.dynamic_routing%20%3E%20(model)%20dynamic_routing_list_deployments_response%20%3E%20(schema)%20%3E%20(property)%20success>)

### List all AI Gateway Dynamic Route Deployments.

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/routes/$ID/deployments \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "data": {
    "deployments": [
      {
        "created_at": "created_at",
        "deployment_id": "deployment_id",
        "version_id": "version_id"
      }
    ],
    "order_by": "order_by",
    "order_by_direction": "order_by_direction",
    "page": 0,
    "per_page": 0
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "data": {
    "deployments": [
      {
        "created_at": "created_at",
        "deployment_id": "deployment_id",
        "version_id": "version_id"
      }
    ],
    "order_by": "order_by",
    "order_by_direction": "order_by_direction",
    "page": 0,
    "per_page": 0
  },
  "success": true
}
```