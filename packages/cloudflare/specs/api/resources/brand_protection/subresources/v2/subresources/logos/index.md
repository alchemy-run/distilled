---
title: Logos
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Brand Protection](https://developers.cloudflare.com/api/resources/brand_protection)

[V2](https://developers.cloudflare.com/api/resources/brand_protection/subresources/v2)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Logos

##### [Insert logo query](https://developers.cloudflare.com/api/resources/brand_protection/subresources/v2/subresources/logos/methods/create)

POST/accounts/{account\_id}/cloudforce-one/v2/brand-protection/logo/queries

##### [Delete logo query](https://developers.cloudflare.com/api/resources/brand_protection/subresources/v2/subresources/logos/methods/delete)

DELETE/accounts/{account\_id}/cloudforce-one/v2/brand-protection/logo/queries/{query\_id}

##### [Get logo queries](https://developers.cloudflare.com/api/resources/brand_protection/subresources/v2/subresources/logos/methods/get)

GET/accounts/{account\_id}/cloudforce-one/v2/brand-protection/logo/queries

##### ModelsExpand Collapse

<details>

<summary>

LogoCreateResponse object {message, success, query\_id }

</summary>

message: string

<a href="#">Link to this property</a>

success: boolean

<a href="#">Link to this property</a>

query\_id: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20brand_protection.v2.logos%20%3E%20(model)%20logo_create_response%20%3E%20(schema)>)

<details>

<summary>

LogoDeleteResponse object {message, success }

</summary>

message: string

<a href="#">Link to this property</a>

success: boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20brand_protection.v2.logos%20%3E%20(model)%20logo_delete_response%20%3E%20(schema)>)

<details>

<summary>

LogoGetResponse = array of object {id, r2\_path, similarity\_threshold, 4 more }

</summary>

id: number

<a href="#">Link to this property</a>

r2\_path: string

<a href="#">Link to this property</a>

similarity\_threshold: number

<a href="#">Link to this property</a>

tag: string

<a href="#">Link to this property</a>

uploaded\_at: string

<a href="#">Link to this property</a>

content\_type: optional string

MIME type of the image (only present when download=true)

<a href="#">Link to this property</a>

image\_data: optional string

Base64-encoded image data (only present when download=true)

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20brand_protection.v2.logos%20%3E%20(model)%20logo_get_response%20%3E%20(schema)>)