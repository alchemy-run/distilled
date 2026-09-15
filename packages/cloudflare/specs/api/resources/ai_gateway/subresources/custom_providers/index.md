---
title: Custom Providers
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI Gateway](https://developers.cloudflare.com/api/resources/ai_gateway)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Custom Providers

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