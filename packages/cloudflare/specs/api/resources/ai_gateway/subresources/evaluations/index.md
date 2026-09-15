---
title: Evaluations
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI Gateway](https://developers.cloudflare.com/api/resources/ai_gateway)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Evaluations

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