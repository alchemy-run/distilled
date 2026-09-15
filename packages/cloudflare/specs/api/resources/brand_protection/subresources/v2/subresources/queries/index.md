---
title: Queries
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Brand Protection](https://developers.cloudflare.com/api/resources/brand_protection)

[V2](https://developers.cloudflare.com/api/resources/brand_protection/subresources/v2)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Queries

##### [Get queries](https://developers.cloudflare.com/api/resources/brand_protection/subresources/v2/subresources/queries/methods/get)

GET/accounts/{account\_id}/cloudforce-one/v2/brand-protection/domain/queries

##### ModelsExpand Collapse

<details>

<summary>

QueryGetResponse = array of object {created, parameters, query\_id, 3 more } or object {created, parameters, query\_id, 3 more }

</summary>

One of the following:

<details>

<summary>

array of object {created, parameters, query\_id, 3 more }

</summary>

created: string

<a href="#">Link to this property</a>

<details>

<summary>

parameters: object {string\_matches, max\_time, min\_time }

</summary>

<details>

<summary>

string\_matches: array of object {pattern }

</summary>

pattern: string

maxLength200

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

max\_time: optional string

<a href="#">Link to this property</a>

min\_time: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

query\_id: number

<a href="#">Link to this property</a>

query\_tag: string

<a href="#">Link to this property</a>

scan: boolean

<a href="#">Link to this property</a>

updated: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {created, parameters, query\_id, 3 more }

</summary>

created: string

<a href="#">Link to this property</a>

<details>

<summary>

parameters: object {string\_matches, max\_time, min\_time }

</summary>

<details>

<summary>

string\_matches: array of object {pattern }

</summary>

pattern: string

maxLength200

minLength1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

max\_time: optional string

<a href="#">Link to this property</a>

min\_time: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

query\_id: number

<a href="#">Link to this property</a>

query\_tag: string

<a href="#">Link to this property</a>

scan: boolean

<a href="#">Link to this property</a>

updated: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20brand_protection.v2.queries%20%3E%20(model)%20query_get_response%20%3E%20(schema)>)