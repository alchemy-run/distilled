---
title: Dynamic Routing
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI Gateway](https://developers.cloudflare.com/api/resources/ai_gateway)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Dynamic Routing

##### [List all AI Gateway Dynamic Routes.](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/dynamic_routing/methods/list)

GET/accounts/{account\_id}/ai-gateway/gateways/{gateway\_id}/routes

##### [Get an AI Gateway Dynamic Route.](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/dynamic_routing/methods/get)

GET/accounts/{account\_id}/ai-gateway/gateways/{gateway\_id}/routes/{id}

##### [Create a new AI Gateway Dynamic Route.](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/dynamic_routing/methods/create)

POST/accounts/{account\_id}/ai-gateway/gateways/{gateway\_id}/routes

##### [Update an AI Gateway Dynamic Route.](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/dynamic_routing/methods/update)

PATCH/accounts/{account\_id}/ai-gateway/gateways/{gateway\_id}/routes/{id}

##### [Delete an AI Gateway Dynamic Route.](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/dynamic_routing/methods/delete)

DELETE/accounts/{account\_id}/ai-gateway/gateways/{gateway\_id}/routes/{id}

##### [List all AI Gateway Dynamic Route Deployments.](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/dynamic_routing/methods/list_deployments)

GET/accounts/{account\_id}/ai-gateway/gateways/{gateway\_id}/routes/{id}/deployments

##### [Create a new AI Gateway Dynamic Route Deployment.](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/dynamic_routing/methods/create_deployment)

POST/accounts/{account\_id}/ai-gateway/gateways/{gateway\_id}/routes/{id}/deployments

##### [List all AI Gateway Dynamic Route Versions.](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/dynamic_routing/methods/list_versions)

GET/accounts/{account\_id}/ai-gateway/gateways/{gateway\_id}/routes/{id}/versions

##### [Create a new AI Gateway Dynamic Route Version.](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/dynamic_routing/methods/create_version)

POST/accounts/{account\_id}/ai-gateway/gateways/{gateway\_id}/routes/{id}/versions

##### [Get an AI Gateway Dynamic Route Version.](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/dynamic_routing/methods/get_version)

GET/accounts/{account\_id}/ai-gateway/gateways/{gateway\_id}/routes/{id}/versions/{version\_id}

##### ModelsExpand Collapse

<details>

<summary>

DynamicRoutingListResponse object {data, success }

</summary>

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

<a href="#">Link to this property</a>

success: boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.dynamic_routing%20%3E%20(model)%20dynamic_routing_list_response%20%3E%20(schema)>)

<details>

<summary>

DynamicRoutingGetResponse object {id, created\_at, deployment, 5 more }

</summary>

id: string

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

[Link to this property](#)%20ai_gateway.dynamic_routing%20%3E%20(model)%20dynamic_routing_get_response%20%3E%20(schema)>)

<details>

<summary>

DynamicRoutingCreateResponse object {id, created\_at, deployment, 5 more }

</summary>

id: string

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

[Link to this property](#)%20ai_gateway.dynamic_routing%20%3E%20(model)%20dynamic_routing_create_response%20%3E%20(schema)>)

<details>

<summary>

DynamicRoutingUpdateResponse object {route, success }

</summary>

<details>

<summary>

route: object {id, account\_tag, created\_at, 6 more }

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

success: boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.dynamic_routing%20%3E%20(model)%20dynamic_routing_update_response%20%3E%20(schema)>)

<details>

<summary>

DynamicRoutingDeleteResponse object {id, created\_at, elements, 3 more }

</summary>

id: string

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

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

</details>

[Link to this property](#)%20ai_gateway.dynamic_routing%20%3E%20(model)%20dynamic_routing_delete_response%20%3E%20(schema)>)

<details>

<summary>

DynamicRoutingListDeploymentsResponse object {data, success }

</summary>

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

<a href="#">Link to this property</a>

success: boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.dynamic_routing%20%3E%20(model)%20dynamic_routing_list_deployments_response%20%3E%20(schema)>)

<details>

<summary>

DynamicRoutingCreateDeploymentResponse object {id, created\_at, elements, 3 more }

</summary>

id: string

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

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

</details>

[Link to this property](#)%20ai_gateway.dynamic_routing%20%3E%20(model)%20dynamic_routing_create_deployment_response%20%3E%20(schema)>)

<details>

<summary>

DynamicRoutingListVersionsResponse object {data, success }

</summary>

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

versions: array of object {active, created\_at, data, 2 more }

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

success: boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.dynamic_routing%20%3E%20(model)%20dynamic_routing_list_versions_response%20%3E%20(schema)>)

<details>

<summary>

DynamicRoutingCreateVersionResponse object {id, created\_at, elements, 3 more }

</summary>

id: string

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

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

</details>

[Link to this property](#)%20ai_gateway.dynamic_routing%20%3E%20(model)%20dynamic_routing_create_version_response%20%3E%20(schema)>)

<details>

<summary>

DynamicRoutingGetVersionResponse object {id, active, created\_at, 7 more }

</summary>

id: string

<a href="#">Link to this property</a>

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

version\_id: string

<a href="#">Link to this property</a>

is\_valid: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.dynamic_routing%20%3E%20(model)%20dynamic_routing_get_version_response%20%3E%20(schema)>)