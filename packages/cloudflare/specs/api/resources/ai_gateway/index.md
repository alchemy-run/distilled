---
title: AI Gateway
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# AI Gateway

##### [List Gateways](https://developers.cloudflare.com/api/resources/ai_gateway/methods/list)

GET/accounts/{account\_id}/ai-gateway/gateways

##### [Fetch a Gateway](https://developers.cloudflare.com/api/resources/ai_gateway/methods/get)

GET/accounts/{account\_id}/ai-gateway/gateways/{id}

##### [Create a new Gateway](https://developers.cloudflare.com/api/resources/ai_gateway/methods/create)

POST/accounts/{account\_id}/ai-gateway/gateways

##### [Update a Gateway](https://developers.cloudflare.com/api/resources/ai_gateway/methods/update)

PUT/accounts/{account\_id}/ai-gateway/gateways/{id}

##### [Delete a Gateway](https://developers.cloudflare.com/api/resources/ai_gateway/methods/delete)

DELETE/accounts/{account\_id}/ai-gateway/gateways/{id}

##### ModelsExpand Collapse

<details>

<summary>

AIGatewayListResponse object {id, cache\_invalidate\_on\_update, cache\_ttl, 25 more }

</summary>

id: string

gateway id

maxLength64

minLength1

<a href="#">Link to this property</a>

cache\_invalidate\_on\_update: boolean

<a href="#">Link to this property</a>

cache\_ttl: number

minimum0

<a href="#">Link to this property</a>

collect\_logs: boolean

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

modified\_at: string

formatdate-time

<a href="#">Link to this property</a>

rate\_limiting\_interval: number

minimum0

<a href="#">Link to this property</a>

rate\_limiting\_limit: number

minimum0

<a href="#">Link to this property</a>

authentication: optional boolean

<a href="#">Link to this property</a>

byok\_only: optional boolean

Requires customer-provided provider credentials and prevents fallback to Unified Billing.

<a href="#">Link to this property</a>

<details>

<summary>

dlp: optional object {action, enabled, profiles } or object {enabled, policies }

</summary>

One of the following:

<details>

<summary>

object {action, enabled, profiles }

</summary>

<details>

<summary>

action: "BLOCK"or "FLAG"

</summary>

One of the following:

"BLOCK"

<a href="#">Link to this property</a>

"FLAG"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

profiles: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {enabled, policies }

</summary>

enabled: boolean

<a href="#">Link to this property</a>

<details>

<summary>

policies: array of object {id, action, check, 2 more }

</summary>

id: string

<a href="#">Link to this property</a>

<details>

<summary>

action: "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

check: array of "REQUEST"or "RESPONSE"

</summary>

One of the following:

"REQUEST"

<a href="#">Link to this property</a>

"RESPONSE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

profiles: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

guardrails: optional object {prompt, response }

</summary>

<details>

<summary>

prompt: object {P1, S1, S10, 11 more }

</summary>

<details>

<summary>

P1: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S1: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S10: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S11: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S12: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S13: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S2: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S3: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S4: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S5: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S6: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S7: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S8: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S9: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

response: object {P1, S1, S10, 11 more }

</summary>

<details>

<summary>

P1: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S1: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S10: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S11: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S12: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S13: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S2: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S3: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S4: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S5: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S6: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S7: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S8: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S9: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

is\_default: optional boolean

<a href="#">Link to this property</a>

log\_classification: optional boolean

<a href="#">Link to this property</a>

log\_management: optional number

maximum10000000

minimum10000

<a href="#">Link to this property</a>

<details>

<summary>

log\_management\_strategy: optional "STOP\_INSERTING"or "DELETE\_OLDEST"

</summary>

One of the following:

"STOP\_INSERTING"

<a href="#">Link to this property</a>

"DELETE\_OLDEST"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

logpush: optional boolean

<a href="#">Link to this property</a>

logpush\_public\_key: optional string

maxLength1024

minLength16

<a href="#">Link to this property</a>

<details>

<summary>

otel: optional array of object {headers, url, authorization, content\_type }

</summary>

headers: map\[string]

<a href="#">Link to this property</a>

url: string

formaturi

maxLength2048

<a href="#">Link to this property</a>

authorization: optional string

maxLength256

<a href="#">Link to this property</a>

<details>

<summary>

content\_type: optional "json"or "protobuf"

</summary>

One of the following:

"json"

<a href="#">Link to this property</a>

"protobuf"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

rate\_limiting\_technique: optional "fixed"or "sliding"

</summary>

One of the following:

"fixed"

<a href="#">Link to this property</a>

"sliding"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

retry\_backoff: optional "constant"or "linear"or "exponential"

Backoff strategy for retry delays

</summary>

One of the following:

"constant"

<a href="#">Link to this property</a>

"linear"

<a href="#">Link to this property</a>

"exponential"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

retry\_delay: optional number

Delay between retry attempts in milliseconds (0-60000)

maximum60000

minimum0

<a href="#">Link to this property</a>

retry\_max\_attempts: optional number

Maximum number of retry attempts for failed requests (1-5)

maximum5

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

spend\_limits: optional object {enabled, rules }

</summary>

enabled: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

rules: optional array of object {limit, limitType, window, 6 more }

</summary>

limit: number

exclusiveMinimum

minimum0

<a href="#">Link to this property</a>

limitType: "cost"

<a href="#">Link to this property</a>

window: number

exclusiveMinimum

minimum0

<a href="#">Link to this property</a>

id: optional string

minLength1

<a href="#">Link to this property</a>

enabled: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

metadata: optional map\[object {mode } or object {mode, values } ]

</summary>

One of the following:

<details>

<summary>

Mode object {mode }

</summary>

mode: "partition"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {mode, values }

</summary>

mode: "filter"

<a href="#">Link to this property</a>

values: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

model: optional object {mode, values }

</summary>

mode: "filter"

<a href="#">Link to this property</a>

values: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

provider: optional object {mode, values }

</summary>

mode: "filter"

<a href="#">Link to this property</a>

values: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

technique: optional "fixed"or "sliding"

</summary>

One of the following:

"fixed"

<a href="#">Link to this property</a>

"sliding"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

store\_id: optional string

<a href="#">Link to this property</a>

<details>

<summary>

stripe: optional object {authorization, usage\_events }

</summary>

authorization: string

<a href="#">Link to this property</a>

<details>

<summary>

usage\_events: array of object {payload }

</summary>

payload: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

workers\_ai\_billing\_mode: optional "postpaid"or "unified"

Controls how Workers AI inference calls routed through this gateway are billed. ‘postpaid’ bills the account directly through Workers AI; ‘unified’ deducts credits via AI Gateway using neuron-based pricing and delegates billing to AI Gateway.

</summary>

One of the following:

"postpaid"

<a href="#">Link to this property</a>

"unified"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

zdr: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway%20%3E%20(model)%20ai_gateway_list_response%20%3E%20(schema)>)

<details>

<summary>

AIGatewayGetResponse object {id, cache\_invalidate\_on\_update, cache\_ttl, 25 more }

</summary>

id: string

gateway id

maxLength64

minLength1

<a href="#">Link to this property</a>

cache\_invalidate\_on\_update: boolean

<a href="#">Link to this property</a>

cache\_ttl: number

minimum0

<a href="#">Link to this property</a>

collect\_logs: boolean

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

modified\_at: string

formatdate-time

<a href="#">Link to this property</a>

rate\_limiting\_interval: number

minimum0

<a href="#">Link to this property</a>

rate\_limiting\_limit: number

minimum0

<a href="#">Link to this property</a>

authentication: optional boolean

<a href="#">Link to this property</a>

byok\_only: optional boolean

Requires customer-provided provider credentials and prevents fallback to Unified Billing.

<a href="#">Link to this property</a>

<details>

<summary>

dlp: optional object {action, enabled, profiles } or object {enabled, policies }

</summary>

One of the following:

<details>

<summary>

object {action, enabled, profiles }

</summary>

<details>

<summary>

action: "BLOCK"or "FLAG"

</summary>

One of the following:

"BLOCK"

<a href="#">Link to this property</a>

"FLAG"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

profiles: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {enabled, policies }

</summary>

enabled: boolean

<a href="#">Link to this property</a>

<details>

<summary>

policies: array of object {id, action, check, 2 more }

</summary>

id: string

<a href="#">Link to this property</a>

<details>

<summary>

action: "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

check: array of "REQUEST"or "RESPONSE"

</summary>

One of the following:

"REQUEST"

<a href="#">Link to this property</a>

"RESPONSE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

profiles: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

guardrails: optional object {prompt, response }

</summary>

<details>

<summary>

prompt: object {P1, S1, S10, 11 more }

</summary>

<details>

<summary>

P1: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S1: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S10: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S11: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S12: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S13: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S2: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S3: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S4: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S5: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S6: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S7: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S8: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S9: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

response: object {P1, S1, S10, 11 more }

</summary>

<details>

<summary>

P1: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S1: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S10: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S11: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S12: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S13: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S2: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S3: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S4: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S5: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S6: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S7: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S8: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S9: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

is\_default: optional boolean

<a href="#">Link to this property</a>

log\_classification: optional boolean

<a href="#">Link to this property</a>

log\_management: optional number

maximum10000000

minimum10000

<a href="#">Link to this property</a>

<details>

<summary>

log\_management\_strategy: optional "STOP\_INSERTING"or "DELETE\_OLDEST"

</summary>

One of the following:

"STOP\_INSERTING"

<a href="#">Link to this property</a>

"DELETE\_OLDEST"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

logpush: optional boolean

<a href="#">Link to this property</a>

logpush\_public\_key: optional string

maxLength1024

minLength16

<a href="#">Link to this property</a>

<details>

<summary>

otel: optional array of object {headers, url, authorization, content\_type }

</summary>

headers: map\[string]

<a href="#">Link to this property</a>

url: string

formaturi

maxLength2048

<a href="#">Link to this property</a>

authorization: optional string

maxLength256

<a href="#">Link to this property</a>

<details>

<summary>

content\_type: optional "json"or "protobuf"

</summary>

One of the following:

"json"

<a href="#">Link to this property</a>

"protobuf"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

rate\_limiting\_technique: optional "fixed"or "sliding"

</summary>

One of the following:

"fixed"

<a href="#">Link to this property</a>

"sliding"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

retry\_backoff: optional "constant"or "linear"or "exponential"

Backoff strategy for retry delays

</summary>

One of the following:

"constant"

<a href="#">Link to this property</a>

"linear"

<a href="#">Link to this property</a>

"exponential"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

retry\_delay: optional number

Delay between retry attempts in milliseconds (0-60000)

maximum60000

minimum0

<a href="#">Link to this property</a>

retry\_max\_attempts: optional number

Maximum number of retry attempts for failed requests (1-5)

maximum5

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

spend\_limits: optional object {enabled, rules }

</summary>

enabled: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

rules: optional array of object {limit, limitType, window, 6 more }

</summary>

limit: number

exclusiveMinimum

minimum0

<a href="#">Link to this property</a>

limitType: "cost"

<a href="#">Link to this property</a>

window: number

exclusiveMinimum

minimum0

<a href="#">Link to this property</a>

id: optional string

minLength1

<a href="#">Link to this property</a>

enabled: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

metadata: optional map\[object {mode } or object {mode, values } ]

</summary>

One of the following:

<details>

<summary>

Mode object {mode }

</summary>

mode: "partition"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {mode, values }

</summary>

mode: "filter"

<a href="#">Link to this property</a>

values: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

model: optional object {mode, values }

</summary>

mode: "filter"

<a href="#">Link to this property</a>

values: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

provider: optional object {mode, values }

</summary>

mode: "filter"

<a href="#">Link to this property</a>

values: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

technique: optional "fixed"or "sliding"

</summary>

One of the following:

"fixed"

<a href="#">Link to this property</a>

"sliding"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

store\_id: optional string

<a href="#">Link to this property</a>

<details>

<summary>

stripe: optional object {authorization, usage\_events }

</summary>

authorization: string

<a href="#">Link to this property</a>

<details>

<summary>

usage\_events: array of object {payload }

</summary>

payload: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

workers\_ai\_billing\_mode: optional "postpaid"or "unified"

Controls how Workers AI inference calls routed through this gateway are billed. ‘postpaid’ bills the account directly through Workers AI; ‘unified’ deducts credits via AI Gateway using neuron-based pricing and delegates billing to AI Gateway.

</summary>

One of the following:

"postpaid"

<a href="#">Link to this property</a>

"unified"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

zdr: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway%20%3E%20(model)%20ai_gateway_get_response%20%3E%20(schema)>)

<details>

<summary>

AIGatewayCreateResponse object {id, cache\_invalidate\_on\_update, cache\_ttl, 25 more }

</summary>

id: string

gateway id

maxLength64

minLength1

<a href="#">Link to this property</a>

cache\_invalidate\_on\_update: boolean

<a href="#">Link to this property</a>

cache\_ttl: number

minimum0

<a href="#">Link to this property</a>

collect\_logs: boolean

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

modified\_at: string

formatdate-time

<a href="#">Link to this property</a>

rate\_limiting\_interval: number

minimum0

<a href="#">Link to this property</a>

rate\_limiting\_limit: number

minimum0

<a href="#">Link to this property</a>

authentication: optional boolean

<a href="#">Link to this property</a>

byok\_only: optional boolean

Requires customer-provided provider credentials and prevents fallback to Unified Billing.

<a href="#">Link to this property</a>

<details>

<summary>

dlp: optional object {action, enabled, profiles } or object {enabled, policies }

</summary>

One of the following:

<details>

<summary>

object {action, enabled, profiles }

</summary>

<details>

<summary>

action: "BLOCK"or "FLAG"

</summary>

One of the following:

"BLOCK"

<a href="#">Link to this property</a>

"FLAG"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

profiles: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {enabled, policies }

</summary>

enabled: boolean

<a href="#">Link to this property</a>

<details>

<summary>

policies: array of object {id, action, check, 2 more }

</summary>

id: string

<a href="#">Link to this property</a>

<details>

<summary>

action: "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

check: array of "REQUEST"or "RESPONSE"

</summary>

One of the following:

"REQUEST"

<a href="#">Link to this property</a>

"RESPONSE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

profiles: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

guardrails: optional object {prompt, response }

</summary>

<details>

<summary>

prompt: object {P1, S1, S10, 11 more }

</summary>

<details>

<summary>

P1: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S1: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S10: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S11: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S12: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S13: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S2: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S3: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S4: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S5: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S6: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S7: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S8: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S9: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

response: object {P1, S1, S10, 11 more }

</summary>

<details>

<summary>

P1: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S1: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S10: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S11: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S12: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S13: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S2: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S3: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S4: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S5: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S6: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S7: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S8: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S9: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

is\_default: optional boolean

<a href="#">Link to this property</a>

log\_classification: optional boolean

<a href="#">Link to this property</a>

log\_management: optional number

maximum10000000

minimum10000

<a href="#">Link to this property</a>

<details>

<summary>

log\_management\_strategy: optional "STOP\_INSERTING"or "DELETE\_OLDEST"

</summary>

One of the following:

"STOP\_INSERTING"

<a href="#">Link to this property</a>

"DELETE\_OLDEST"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

logpush: optional boolean

<a href="#">Link to this property</a>

logpush\_public\_key: optional string

maxLength1024

minLength16

<a href="#">Link to this property</a>

<details>

<summary>

otel: optional array of object {headers, url, authorization, content\_type }

</summary>

headers: map\[string]

<a href="#">Link to this property</a>

url: string

formaturi

maxLength2048

<a href="#">Link to this property</a>

authorization: optional string

maxLength256

<a href="#">Link to this property</a>

<details>

<summary>

content\_type: optional "json"or "protobuf"

</summary>

One of the following:

"json"

<a href="#">Link to this property</a>

"protobuf"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

rate\_limiting\_technique: optional "fixed"or "sliding"

</summary>

One of the following:

"fixed"

<a href="#">Link to this property</a>

"sliding"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

retry\_backoff: optional "constant"or "linear"or "exponential"

Backoff strategy for retry delays

</summary>

One of the following:

"constant"

<a href="#">Link to this property</a>

"linear"

<a href="#">Link to this property</a>

"exponential"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

retry\_delay: optional number

Delay between retry attempts in milliseconds (0-60000)

maximum60000

minimum0

<a href="#">Link to this property</a>

retry\_max\_attempts: optional number

Maximum number of retry attempts for failed requests (1-5)

maximum5

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

spend\_limits: optional object {enabled, rules }

</summary>

enabled: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

rules: optional array of object {limit, limitType, window, 6 more }

</summary>

limit: number

exclusiveMinimum

minimum0

<a href="#">Link to this property</a>

limitType: "cost"

<a href="#">Link to this property</a>

window: number

exclusiveMinimum

minimum0

<a href="#">Link to this property</a>

id: optional string

minLength1

<a href="#">Link to this property</a>

enabled: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

metadata: optional map\[object {mode } or object {mode, values } ]

</summary>

One of the following:

<details>

<summary>

Mode object {mode }

</summary>

mode: "partition"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {mode, values }

</summary>

mode: "filter"

<a href="#">Link to this property</a>

values: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

model: optional object {mode, values }

</summary>

mode: "filter"

<a href="#">Link to this property</a>

values: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

provider: optional object {mode, values }

</summary>

mode: "filter"

<a href="#">Link to this property</a>

values: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

technique: optional "fixed"or "sliding"

</summary>

One of the following:

"fixed"

<a href="#">Link to this property</a>

"sliding"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

store\_id: optional string

<a href="#">Link to this property</a>

<details>

<summary>

stripe: optional object {authorization, usage\_events }

</summary>

authorization: string

<a href="#">Link to this property</a>

<details>

<summary>

usage\_events: array of object {payload }

</summary>

payload: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

workers\_ai\_billing\_mode: optional "postpaid"or "unified"

Controls how Workers AI inference calls routed through this gateway are billed. ‘postpaid’ bills the account directly through Workers AI; ‘unified’ deducts credits via AI Gateway using neuron-based pricing and delegates billing to AI Gateway.

</summary>

One of the following:

"postpaid"

<a href="#">Link to this property</a>

"unified"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

zdr: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway%20%3E%20(model)%20ai_gateway_create_response%20%3E%20(schema)>)

<details>

<summary>

AIGatewayUpdateResponse object {id, cache\_invalidate\_on\_update, cache\_ttl, 25 more }

</summary>

id: string

gateway id

maxLength64

minLength1

<a href="#">Link to this property</a>

cache\_invalidate\_on\_update: boolean

<a href="#">Link to this property</a>

cache\_ttl: number

minimum0

<a href="#">Link to this property</a>

collect\_logs: boolean

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

modified\_at: string

formatdate-time

<a href="#">Link to this property</a>

rate\_limiting\_interval: number

minimum0

<a href="#">Link to this property</a>

rate\_limiting\_limit: number

minimum0

<a href="#">Link to this property</a>

authentication: optional boolean

<a href="#">Link to this property</a>

byok\_only: optional boolean

Requires customer-provided provider credentials and prevents fallback to Unified Billing.

<a href="#">Link to this property</a>

<details>

<summary>

dlp: optional object {action, enabled, profiles } or object {enabled, policies }

</summary>

One of the following:

<details>

<summary>

object {action, enabled, profiles }

</summary>

<details>

<summary>

action: "BLOCK"or "FLAG"

</summary>

One of the following:

"BLOCK"

<a href="#">Link to this property</a>

"FLAG"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

profiles: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {enabled, policies }

</summary>

enabled: boolean

<a href="#">Link to this property</a>

<details>

<summary>

policies: array of object {id, action, check, 2 more }

</summary>

id: string

<a href="#">Link to this property</a>

<details>

<summary>

action: "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

check: array of "REQUEST"or "RESPONSE"

</summary>

One of the following:

"REQUEST"

<a href="#">Link to this property</a>

"RESPONSE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

profiles: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

guardrails: optional object {prompt, response }

</summary>

<details>

<summary>

prompt: object {P1, S1, S10, 11 more }

</summary>

<details>

<summary>

P1: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S1: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S10: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S11: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S12: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S13: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S2: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S3: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S4: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S5: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S6: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S7: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S8: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S9: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

response: object {P1, S1, S10, 11 more }

</summary>

<details>

<summary>

P1: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S1: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S10: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S11: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S12: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S13: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S2: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S3: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S4: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S5: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S6: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S7: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S8: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S9: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

is\_default: optional boolean

<a href="#">Link to this property</a>

log\_classification: optional boolean

<a href="#">Link to this property</a>

log\_management: optional number

maximum10000000

minimum10000

<a href="#">Link to this property</a>

<details>

<summary>

log\_management\_strategy: optional "STOP\_INSERTING"or "DELETE\_OLDEST"

</summary>

One of the following:

"STOP\_INSERTING"

<a href="#">Link to this property</a>

"DELETE\_OLDEST"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

logpush: optional boolean

<a href="#">Link to this property</a>

logpush\_public\_key: optional string

maxLength1024

minLength16

<a href="#">Link to this property</a>

<details>

<summary>

otel: optional array of object {headers, url, authorization, content\_type }

</summary>

headers: map\[string]

<a href="#">Link to this property</a>

url: string

formaturi

maxLength2048

<a href="#">Link to this property</a>

authorization: optional string

maxLength256

<a href="#">Link to this property</a>

<details>

<summary>

content\_type: optional "json"or "protobuf"

</summary>

One of the following:

"json"

<a href="#">Link to this property</a>

"protobuf"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

rate\_limiting\_technique: optional "fixed"or "sliding"

</summary>

One of the following:

"fixed"

<a href="#">Link to this property</a>

"sliding"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

retry\_backoff: optional "constant"or "linear"or "exponential"

Backoff strategy for retry delays

</summary>

One of the following:

"constant"

<a href="#">Link to this property</a>

"linear"

<a href="#">Link to this property</a>

"exponential"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

retry\_delay: optional number

Delay between retry attempts in milliseconds (0-60000)

maximum60000

minimum0

<a href="#">Link to this property</a>

retry\_max\_attempts: optional number

Maximum number of retry attempts for failed requests (1-5)

maximum5

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

spend\_limits: optional object {enabled, rules }

</summary>

enabled: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

rules: optional array of object {limit, limitType, window, 6 more }

</summary>

limit: number

exclusiveMinimum

minimum0

<a href="#">Link to this property</a>

limitType: "cost"

<a href="#">Link to this property</a>

window: number

exclusiveMinimum

minimum0

<a href="#">Link to this property</a>

id: optional string

minLength1

<a href="#">Link to this property</a>

enabled: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

metadata: optional map\[object {mode } or object {mode, values } ]

</summary>

One of the following:

<details>

<summary>

Mode object {mode }

</summary>

mode: "partition"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {mode, values }

</summary>

mode: "filter"

<a href="#">Link to this property</a>

values: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

model: optional object {mode, values }

</summary>

mode: "filter"

<a href="#">Link to this property</a>

values: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

provider: optional object {mode, values }

</summary>

mode: "filter"

<a href="#">Link to this property</a>

values: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

technique: optional "fixed"or "sliding"

</summary>

One of the following:

"fixed"

<a href="#">Link to this property</a>

"sliding"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

store\_id: optional string

<a href="#">Link to this property</a>

<details>

<summary>

stripe: optional object {authorization, usage\_events }

</summary>

authorization: string

<a href="#">Link to this property</a>

<details>

<summary>

usage\_events: array of object {payload }

</summary>

payload: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

workers\_ai\_billing\_mode: optional "postpaid"or "unified"

Controls how Workers AI inference calls routed through this gateway are billed. ‘postpaid’ bills the account directly through Workers AI; ‘unified’ deducts credits via AI Gateway using neuron-based pricing and delegates billing to AI Gateway.

</summary>

One of the following:

"postpaid"

<a href="#">Link to this property</a>

"unified"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

zdr: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway%20%3E%20(model)%20ai_gateway_update_response%20%3E%20(schema)>)

<details>

<summary>

AIGatewayDeleteResponse object {id, cache\_invalidate\_on\_update, cache\_ttl, 25 more }

</summary>

id: string

gateway id

maxLength64

minLength1

<a href="#">Link to this property</a>

cache\_invalidate\_on\_update: boolean

<a href="#">Link to this property</a>

cache\_ttl: number

minimum0

<a href="#">Link to this property</a>

collect\_logs: boolean

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

modified\_at: string

formatdate-time

<a href="#">Link to this property</a>

rate\_limiting\_interval: number

minimum0

<a href="#">Link to this property</a>

rate\_limiting\_limit: number

minimum0

<a href="#">Link to this property</a>

authentication: optional boolean

<a href="#">Link to this property</a>

byok\_only: optional boolean

Requires customer-provided provider credentials and prevents fallback to Unified Billing.

<a href="#">Link to this property</a>

<details>

<summary>

dlp: optional object {action, enabled, profiles } or object {enabled, policies }

</summary>

One of the following:

<details>

<summary>

object {action, enabled, profiles }

</summary>

<details>

<summary>

action: "BLOCK"or "FLAG"

</summary>

One of the following:

"BLOCK"

<a href="#">Link to this property</a>

"FLAG"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

profiles: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {enabled, policies }

</summary>

enabled: boolean

<a href="#">Link to this property</a>

<details>

<summary>

policies: array of object {id, action, check, 2 more }

</summary>

id: string

<a href="#">Link to this property</a>

<details>

<summary>

action: "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

check: array of "REQUEST"or "RESPONSE"

</summary>

One of the following:

"REQUEST"

<a href="#">Link to this property</a>

"RESPONSE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

profiles: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

guardrails: optional object {prompt, response }

</summary>

<details>

<summary>

prompt: object {P1, S1, S10, 11 more }

</summary>

<details>

<summary>

P1: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S1: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S10: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S11: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S12: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S13: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S2: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S3: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S4: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S5: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S6: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S7: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S8: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S9: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

response: object {P1, S1, S10, 11 more }

</summary>

<details>

<summary>

P1: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S1: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S10: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S11: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S12: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S13: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S2: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S3: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S4: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S5: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S6: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S7: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S8: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

S9: optional "FLAG"or "BLOCK"

</summary>

One of the following:

"FLAG"

<a href="#">Link to this property</a>

"BLOCK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

is\_default: optional boolean

<a href="#">Link to this property</a>

log\_classification: optional boolean

<a href="#">Link to this property</a>

log\_management: optional number

maximum10000000

minimum10000

<a href="#">Link to this property</a>

<details>

<summary>

log\_management\_strategy: optional "STOP\_INSERTING"or "DELETE\_OLDEST"

</summary>

One of the following:

"STOP\_INSERTING"

<a href="#">Link to this property</a>

"DELETE\_OLDEST"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

logpush: optional boolean

<a href="#">Link to this property</a>

logpush\_public\_key: optional string

maxLength1024

minLength16

<a href="#">Link to this property</a>

<details>

<summary>

otel: optional array of object {headers, url, authorization, content\_type }

</summary>

headers: map\[string]

<a href="#">Link to this property</a>

url: string

formaturi

maxLength2048

<a href="#">Link to this property</a>

authorization: optional string

maxLength256

<a href="#">Link to this property</a>

<details>

<summary>

content\_type: optional "json"or "protobuf"

</summary>

One of the following:

"json"

<a href="#">Link to this property</a>

"protobuf"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

rate\_limiting\_technique: optional "fixed"or "sliding"

</summary>

One of the following:

"fixed"

<a href="#">Link to this property</a>

"sliding"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

retry\_backoff: optional "constant"or "linear"or "exponential"

Backoff strategy for retry delays

</summary>

One of the following:

"constant"

<a href="#">Link to this property</a>

"linear"

<a href="#">Link to this property</a>

"exponential"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

retry\_delay: optional number

Delay between retry attempts in milliseconds (0-60000)

maximum60000

minimum0

<a href="#">Link to this property</a>

retry\_max\_attempts: optional number

Maximum number of retry attempts for failed requests (1-5)

maximum5

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

spend\_limits: optional object {enabled, rules }

</summary>

enabled: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

rules: optional array of object {limit, limitType, window, 6 more }

</summary>

limit: number

exclusiveMinimum

minimum0

<a href="#">Link to this property</a>

limitType: "cost"

<a href="#">Link to this property</a>

window: number

exclusiveMinimum

minimum0

<a href="#">Link to this property</a>

id: optional string

minLength1

<a href="#">Link to this property</a>

enabled: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

metadata: optional map\[object {mode } or object {mode, values } ]

</summary>

One of the following:

<details>

<summary>

Mode object {mode }

</summary>

mode: "partition"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {mode, values }

</summary>

mode: "filter"

<a href="#">Link to this property</a>

values: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

model: optional object {mode, values }

</summary>

mode: "filter"

<a href="#">Link to this property</a>

values: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

provider: optional object {mode, values }

</summary>

mode: "filter"

<a href="#">Link to this property</a>

values: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

technique: optional "fixed"or "sliding"

</summary>

One of the following:

"fixed"

<a href="#">Link to this property</a>

"sliding"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

store\_id: optional string

<a href="#">Link to this property</a>

<details>

<summary>

stripe: optional object {authorization, usage\_events }

</summary>

authorization: string

<a href="#">Link to this property</a>

<details>

<summary>

usage\_events: array of object {payload }

</summary>

payload: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

workers\_ai\_billing\_mode: optional "postpaid"or "unified"

Controls how Workers AI inference calls routed through this gateway are billed. ‘postpaid’ bills the account directly through Workers AI; ‘unified’ deducts credits via AI Gateway using neuron-based pricing and delegates billing to AI Gateway.

</summary>

One of the following:

"postpaid"

<a href="#">Link to this property</a>

"unified"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

zdr: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway%20%3E%20(model)%20ai_gateway_delete_response%20%3E%20(schema)>)

#### AI GatewayEvaluation Types

##### [List Evaluators](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/evaluation_types/methods/list)

GET/accounts/{account\_id}/ai-gateway/evaluation-types

##### ModelsExpand Collapse

<details>

<summary>

EvaluationTypeListResponse object {id, created\_at, description, 5 more }

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

[Link to this property](#)%20ai_gateway.evaluation_types%20%3E%20(model)%20evaluation_type_list_response%20%3E%20(schema)>)

#### AI GatewayCustom Providers

##### [List Account Providers](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/custom_providers/methods/list)

GET/accounts/{account\_id}/ai-gateway/custom-providers

##### [Fetch a Account Provider](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/custom_providers/methods/get)

GET/accounts/{account\_id}/ai-gateway/custom-providers/{id}

##### [Create a new Account Provider](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/custom_providers/methods/create)

POST/accounts/{account\_id}/ai-gateway/custom-providers

##### [Delete a Account Provider](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/custom_providers/methods/delete)

DELETE/accounts/{account\_id}/ai-gateway/custom-providers/{id}

##### ModelsExpand Collapse

<details>

<summary>

CustomProviderListResponse object {id, base\_url, created\_at, 12 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

base\_url: string

formaturi

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

modified\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

slug: string

<a href="#">Link to this property</a>

beta: optional boolean

<a href="#">Link to this property</a>

curl\_example: optional string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

enable: optional boolean

<a href="#">Link to this property</a>

headers: optional string

maxLength8192

<a href="#">Link to this property</a>

js\_example: optional string

<a href="#">Link to this property</a>

link: optional string

<a href="#">Link to this property</a>

logo: optional string

<a href="#">Link to this property</a>

position: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.custom_providers%20%3E%20(model)%20custom_provider_list_response%20%3E%20(schema)>)

<details>

<summary>

CustomProviderGetResponse object {id, base\_url, created\_at, 12 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

base\_url: string

formaturi

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

modified\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

slug: string

<a href="#">Link to this property</a>

beta: optional boolean

<a href="#">Link to this property</a>

curl\_example: optional string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

enable: optional boolean

<a href="#">Link to this property</a>

headers: optional string

maxLength8192

<a href="#">Link to this property</a>

js\_example: optional string

<a href="#">Link to this property</a>

link: optional string

<a href="#">Link to this property</a>

logo: optional string

<a href="#">Link to this property</a>

position: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.custom_providers%20%3E%20(model)%20custom_provider_get_response%20%3E%20(schema)>)

<details>

<summary>

CustomProviderCreateResponse object {id, base\_url, created\_at, 12 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

base\_url: string

formaturi

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

modified\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

slug: string

<a href="#">Link to this property</a>

beta: optional boolean

<a href="#">Link to this property</a>

curl\_example: optional string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

enable: optional boolean

<a href="#">Link to this property</a>

headers: optional string

maxLength8192

<a href="#">Link to this property</a>

js\_example: optional string

<a href="#">Link to this property</a>

link: optional string

<a href="#">Link to this property</a>

logo: optional string

<a href="#">Link to this property</a>

position: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.custom_providers%20%3E%20(model)%20custom_provider_create_response%20%3E%20(schema)>)

<details>

<summary>

CustomProviderDeleteResponse object {id, base\_url, created\_at, 12 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

base\_url: string

formaturi

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

modified\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

slug: string

<a href="#">Link to this property</a>

beta: optional boolean

<a href="#">Link to this property</a>

curl\_example: optional string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

enable: optional boolean

<a href="#">Link to this property</a>

headers: optional string

maxLength8192

<a href="#">Link to this property</a>

js\_example: optional string

<a href="#">Link to this property</a>

link: optional string

<a href="#">Link to this property</a>

logo: optional string

<a href="#">Link to this property</a>

position: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.custom_providers%20%3E%20(model)%20custom_provider_delete_response%20%3E%20(schema)>)

#### AI GatewayLogs

##### [List Gateway Logs](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/logs/methods/list)

GET/accounts/{account\_id}/ai-gateway/gateways/{gateway\_id}/logs

##### [Get Gateway Log Detail](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/logs/methods/get)

GET/accounts/{account\_id}/ai-gateway/gateways/{gateway\_id}/logs/{id}

##### [Patch Gateway Log](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/logs/methods/edit)

PATCH/accounts/{account\_id}/ai-gateway/gateways/{gateway\_id}/logs/{id}

##### [Delete Gateway Logs](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/logs/methods/delete)

DELETE/accounts/{account\_id}/ai-gateway/gateways/{gateway\_id}/logs

##### [Get Gateway Log Request](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/logs/methods/request)

GET/accounts/{account\_id}/ai-gateway/gateways/{gateway\_id}/logs/{id}/request

##### [Get Gateway Log Response](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/logs/methods/response)

GET/accounts/{account\_id}/ai-gateway/gateways/{gateway\_id}/logs/{id}/response

##### ModelsExpand Collapse

<details>

<summary>

LogListResponse object {id, cached, created\_at, 16 more }

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

[Link to this property](#)%20ai_gateway.logs%20%3E%20(model)%20log_list_response%20%3E%20(schema)>)

<details>

<summary>

LogGetResponse object {id, cached, created\_at, 22 more }

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

[Link to this property](#)%20ai_gateway.logs%20%3E%20(model)%20log_get_response%20%3E%20(schema)>)

LogEditResponse = unknown

[Link to this property](#)%20ai_gateway.logs%20%3E%20(model)%20log_edit_response%20%3E%20(schema)>)

<details>

<summary>

LogDeleteResponse object {success }

</summary>

success: boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.logs%20%3E%20(model)%20log_delete_response%20%3E%20(schema)>)

LogRequestResponse = unknown

[Link to this property](#)%20ai_gateway.logs%20%3E%20(model)%20log_request_response%20%3E%20(schema)>)

LogResponseResponse = unknown

[Link to this property](#)%20ai_gateway.logs%20%3E%20(model)%20log_response_response%20%3E%20(schema)>)

#### AI GatewayDatasets

##### [List Datasets](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/datasets/methods/list)

GET/accounts/{account\_id}/ai-gateway/gateways/{gateway\_id}/datasets

##### [Fetch a Dataset](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/datasets/methods/get)

GET/accounts/{account\_id}/ai-gateway/gateways/{gateway\_id}/datasets/{id}

##### [Create a new Dataset](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/datasets/methods/create)

POST/accounts/{account\_id}/ai-gateway/gateways/{gateway\_id}/datasets

##### [Update a Dataset](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/datasets/methods/update)

PUT/accounts/{account\_id}/ai-gateway/gateways/{gateway\_id}/datasets/{id}

##### [Delete a Dataset](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/datasets/methods/delete)

DELETE/accounts/{account\_id}/ai-gateway/gateways/{gateway\_id}/datasets/{id}

##### ModelsExpand Collapse

<details>

<summary>

DatasetListResponse object {id, created\_at, enable, 4 more }

</summary>

id: string

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

[Link to this property](#)%20ai_gateway.datasets%20%3E%20(model)%20dataset_list_response%20%3E%20(schema)>)

<details>

<summary>

DatasetGetResponse object {id, created\_at, enable, 4 more }

</summary>

id: string

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

[Link to this property](#)%20ai_gateway.datasets%20%3E%20(model)%20dataset_get_response%20%3E%20(schema)>)

<details>

<summary>

DatasetCreateResponse object {id, created\_at, enable, 4 more }

</summary>

id: string

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

[Link to this property](#)%20ai_gateway.datasets%20%3E%20(model)%20dataset_create_response%20%3E%20(schema)>)

<details>

<summary>

DatasetUpdateResponse object {id, created\_at, enable, 4 more }

</summary>

id: string

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

[Link to this property](#)%20ai_gateway.datasets%20%3E%20(model)%20dataset_update_response%20%3E%20(schema)>)

<details>

<summary>

DatasetDeleteResponse object {id, created\_at, enable, 4 more }

</summary>

id: string

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

[Link to this property](#)%20ai_gateway.datasets%20%3E%20(model)%20dataset_delete_response%20%3E%20(schema)>)

#### AI GatewayEvaluations

##### [List Evaluations](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/evaluations/methods/list)

GET/accounts/{account\_id}/ai-gateway/gateways/{gateway\_id}/evaluations

##### [Fetch a Evaluation](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/evaluations/methods/get)

GET/accounts/{account\_id}/ai-gateway/gateways/{gateway\_id}/evaluations/{id}

##### [Create a new Evaluation](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/evaluations/methods/create)

POST/accounts/{account\_id}/ai-gateway/gateways/{gateway\_id}/evaluations

##### [Delete a Evaluation](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/evaluations/methods/delete)

DELETE/accounts/{account\_id}/ai-gateway/gateways/{gateway\_id}/evaluations/{id}

##### ModelsExpand Collapse

<details>

<summary>

EvaluationListResponse object {id, created\_at, datasets, 6 more }

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

[Link to this property](#)%20ai_gateway.evaluations%20%3E%20(model)%20evaluation_list_response%20%3E%20(schema)>)

<details>

<summary>

EvaluationGetResponse object {id, created\_at, datasets, 6 more }

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

[Link to this property](#)%20ai_gateway.evaluations%20%3E%20(model)%20evaluation_get_response%20%3E%20(schema)>)

<details>

<summary>

EvaluationCreateResponse object {id, created\_at, datasets, 6 more }

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

[Link to this property](#)%20ai_gateway.evaluations%20%3E%20(model)%20evaluation_create_response%20%3E%20(schema)>)

<details>

<summary>

EvaluationDeleteResponse object {id, created\_at, datasets, 6 more }

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

[Link to this property](#)%20ai_gateway.evaluations%20%3E%20(model)%20evaluation_delete_response%20%3E%20(schema)>)

#### AI GatewayDynamic Routing

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

#### AI GatewayProvider Configs

##### [List Provider Configs](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/provider_configs/methods/list)

GET/accounts/{account\_id}/ai-gateway/gateways/{gateway\_id}/provider\_configs

##### [Create a new Provider Configs](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/provider_configs/methods/create)

POST/accounts/{account\_id}/ai-gateway/gateways/{gateway\_id}/provider\_configs

##### ModelsExpand Collapse

<details>

<summary>

ProviderConfigListResponse object {id, alias, default\_config, 7 more }

</summary>

id: string

<a href="#">Link to this property</a>

alias: string

<a href="#">Link to this property</a>

default\_config: boolean

<a href="#">Link to this property</a>

gateway\_id: string

gateway id

maxLength64

minLength1

<a href="#">Link to this property</a>

modified\_at: string

formatdate-time

<a href="#">Link to this property</a>

provider\_slug: string

<a href="#">Link to this property</a>

secret\_id: string

<a href="#">Link to this property</a>

secret\_preview: string

<a href="#">Link to this property</a>

rate\_limit: optional number

<a href="#">Link to this property</a>

rate\_limit\_period: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.provider_configs%20%3E%20(model)%20provider_config_list_response%20%3E%20(schema)>)

<details>

<summary>

ProviderConfigCreateResponse object {id, alias, default\_config, 7 more }

</summary>

id: string

<a href="#">Link to this property</a>

alias: string

<a href="#">Link to this property</a>

default\_config: boolean

<a href="#">Link to this property</a>

gateway\_id: string

gateway id

maxLength64

minLength1

<a href="#">Link to this property</a>

modified\_at: string

formatdate-time

<a href="#">Link to this property</a>

provider\_slug: string

<a href="#">Link to this property</a>

secret\_id: string

<a href="#">Link to this property</a>

secret\_preview: string

<a href="#">Link to this property</a>

rate\_limit: optional number

<a href="#">Link to this property</a>

rate\_limit\_period: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.provider_configs%20%3E%20(model)%20provider_config_create_response%20%3E%20(schema)>)

#### AI GatewayURLs

##### [Get Gateway URL](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/urls/methods/get)

GET/accounts/{account\_id}/ai-gateway/gateways/{gateway\_id}/url/{provider}

##### ModelsExpand Collapse

URLGetResponse = string

[Link to this property](#)%20ai_gateway.urls%20%3E%20(model)%20url_get_response%20%3E%20(schema)>)

#### AI GatewayBilling

##### [Get credit balance](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/billing/methods/credit_balance)

GET/accounts/{account\_id}/ai-gateway/billing/credit-balance

##### [Get usage history](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/billing/methods/usage_history)

GET/accounts/{account\_id}/ai-gateway/billing/usage-history

##### [Get invoice history](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/billing/methods/invoice_history)

GET/accounts/{account\_id}/ai-gateway/billing/invoice-history

##### [Get invoice preview](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/billing/methods/invoice_preview)

GET/accounts/{account\_id}/ai-gateway/billing/invoice-preview

##### ModelsExpand Collapse

<details>

<summary>

BillingCreditBalanceResponse object {balance, has\_default\_payment\_method, payment\_method, 2 more }

</summary>

balance: number

<a href="#">Link to this property</a>

has\_default\_payment\_method: boolean

<a href="#">Link to this property</a>

<details>

<summary>

payment\_method: object {brand, last4 }

</summary>

brand: optional string

<a href="#">Link to this property</a>

last4: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

topup\_config: object {amount, threshold, disabledReason, 2 more }

</summary>

amount: number

<a href="#">Link to this property</a>

threshold: number

<a href="#">Link to this property</a>

disabledReason: optional string

<a href="#">Link to this property</a>

error: optional string

<a href="#">Link to this property</a>

lastFailedAt: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

first\_topup\_success: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.billing%20%3E%20(model)%20billing_credit_balance_response%20%3E%20(schema)>)

<details>

<summary>

BillingUsageHistoryResponse object {history }

</summary>

<details>

<summary>

history: array of object {id, aggregated\_value, end\_time, start\_time }

</summary>

id: string

<a href="#">Link to this property</a>

aggregated\_value: number

<a href="#">Link to this property</a>

end\_time: number

<a href="#">Link to this property</a>

start\_time: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.billing%20%3E%20(model)%20billing_usage_history_response%20%3E%20(schema)>)

<details>

<summary>

BillingInvoiceHistoryResponse object {invoices, pagination }

</summary>

<details>

<summary>

invoices: array of object {amount\_due, amount\_paid, amount\_remaining, 11 more }

</summary>

amount\_due: number

<a href="#">Link to this property</a>

amount\_paid: number

<a href="#">Link to this property</a>

amount\_remaining: number

<a href="#">Link to this property</a>

currency: string

<a href="#">Link to this property</a>

id: optional string

<a href="#">Link to this property</a>

attempt\_count: optional number

<a href="#">Link to this property</a>

attempted: optional boolean

<a href="#">Link to this property</a>

auto\_advance: optional boolean

<a href="#">Link to this property</a>

created: optional number

<a href="#">Link to this property</a>

created\_by: optional string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

invoice\_origin: optional string

<a href="#">Link to this property</a>

invoice\_pdf: optional string

<a href="#">Link to this property</a>

status: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

pagination: object {has\_more, page, per\_page, total\_count }

</summary>

has\_more: boolean

<a href="#">Link to this property</a>

page: number

<a href="#">Link to this property</a>

per\_page: number

<a href="#">Link to this property</a>

total\_count: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.billing%20%3E%20(model)%20billing_invoice_history_response%20%3E%20(schema)>)

<details>

<summary>

BillingInvoicePreviewResponse object {id, amount\_due, amount\_paid, 6 more }

</summary>

id: string

<a href="#">Link to this property</a>

amount\_due: number

<a href="#">Link to this property</a>

amount\_paid: number

<a href="#">Link to this property</a>

amount\_remaining: number

<a href="#">Link to this property</a>

currency: string

<a href="#">Link to this property</a>

<details>

<summary>

invoice\_lines: array of object {amount, currency, description, 4 more }

</summary>

amount: number

<a href="#">Link to this property</a>

currency: string

<a href="#">Link to this property</a>

description: string

<a href="#">Link to this property</a>

<details>

<summary>

period: object {end, start }

</summary>

end: number

<a href="#">Link to this property</a>

start: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

pricing: object {unit\_amount\_decimal }

</summary>

unit\_amount\_decimal: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

quantity: number

<a href="#">Link to this property</a>

<details>

<summary>

pretax\_credit\_amounts: optional array of object {amount, type, credit\_balance\_transaction, discount }

</summary>

amount: number

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

credit\_balance\_transaction: optional string

<a href="#">Link to this property</a>

discount: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

period\_end: number

<a href="#">Link to this property</a>

period\_start: number

<a href="#">Link to this property</a>

<details>

<summary>

status: "draft"or "open"or "paid"or 2 more

</summary>

One of the following:

"draft"

<a href="#">Link to this property</a>

"open"

<a href="#">Link to this property</a>

"paid"

<a href="#">Link to this property</a>

"uncollectible"

<a href="#">Link to this property</a>

"void"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.billing%20%3E%20(model)%20billing_invoice_preview_response%20%3E%20(schema)>)

#### AI GatewayBillingTopup

##### [Create a top-up](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/billing/subresources/topup/methods/create)

POST/accounts/{account\_id}/ai-gateway/billing/topup

##### [Check top-up status](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/billing/subresources/topup/methods/status)

POST/accounts/{account\_id}/ai-gateway/billing/topup/status

##### ModelsExpand Collapse

<details>

<summary>

TopupCreateResponse object {client\_secret, onboarding, payment\_intent\_id, 2 more }

</summary>

client\_secret: string

Stripe PaymentIntent client secret.

<a href="#">Link to this property</a>

onboarding: boolean

Whether the user was already onboarded.

<a href="#">Link to this property</a>

payment\_intent\_id: string

Stripe invoice ID.

<a href="#">Link to this property</a>

brand: optional string

Card brand (visa, mastercard, etc.).

<a href="#">Link to this property</a>

last4: optional string

Last 4 digits of card.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.billing.topup%20%3E%20(model)%20topup_create_response%20%3E%20(schema)>)

<details>

<summary>

TopupStatusResponse object {payment\_intent\_id, status }

</summary>

payment\_intent\_id: string

<a href="#">Link to this property</a>

<details>

<summary>

status: "completed"or "pending"

</summary>

One of the following:

"completed"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.billing.topup%20%3E%20(model)%20topup_status_response%20%3E%20(schema)>)

#### AI GatewayBillingTopupConfig

##### [Get auto top-up configuration](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/billing/subresources/topup/subresources/config/methods/get)

GET/accounts/{account\_id}/ai-gateway/billing/topup/config

##### [Set auto top-up configuration](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/billing/subresources/topup/subresources/config/methods/create)

POST/accounts/{account\_id}/ai-gateway/billing/topup/config

##### [Delete auto top-up configuration](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/billing/subresources/topup/subresources/config/methods/delete)

DELETE/accounts/{account\_id}/ai-gateway/billing/topup/config

##### ModelsExpand Collapse

<details>

<summary>

ConfigGetResponse object {amount, threshold, disabledReason, 2 more }

</summary>

amount: number

<a href="#">Link to this property</a>

threshold: number

<a href="#">Link to this property</a>

disabledReason: optional string

<a href="#">Link to this property</a>

error: optional string

<a href="#">Link to this property</a>

lastFailedAt: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.billing.topup.config%20%3E%20(model)%20config_get_response%20%3E%20(schema)>)

<details>

<summary>

ConfigCreateResponse object {amount, threshold }

</summary>

amount: number

<a href="#">Link to this property</a>

threshold: number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.billing.topup.config%20%3E%20(model)%20config_create_response%20%3E%20(schema)>)

ConfigDeleteResponse = unknown

[Link to this property](#)%20ai_gateway.billing.topup.config%20%3E%20(model)%20config_delete_response%20%3E%20(schema)>)

#### AI GatewayBillingSpending Limit

##### [Get spending limit](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/billing/subresources/spending_limit/methods/get)

GET/accounts/{account\_id}/ai-gateway/billing/spending-limit

##### [Set spending limit (deprecated)](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/billing/subresources/spending_limit/methods/create)

Deprecated

POST/accounts/{account\_id}/ai-gateway/billing/spending-limit

##### [Delete spending limit](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/billing/subresources/spending_limit/methods/delete)

DELETE/accounts/{account\_id}/ai-gateway/billing/spending-limit

##### ModelsExpand Collapse

<details>

<summary>

SpendingLimitGetResponse object {config, enabled }

</summary>

<details>

<summary>

config: object {amount, duration, strategy }

</summary>

amount: number

<a href="#">Link to this property</a>

duration: string

<a href="#">Link to this property</a>

strategy: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.billing.spending_limit%20%3E%20(model)%20spending_limit_get_response%20%3E%20(schema)>)

SpendingLimitCreateResponse = unknown

[Link to this property](#)%20ai_gateway.billing.spending_limit%20%3E%20(model)%20spending_limit_create_response%20%3E%20(schema)>)

SpendingLimitDeleteResponse = unknown

[Link to this property](#)%20ai_gateway.billing.spending_limit%20%3E%20(model)%20spending_limit_delete_response%20%3E%20(schema)>)