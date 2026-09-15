---
title: Categories
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Gateway](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Categories

##### [List categories](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/categories/methods/list)

GET/accounts/{account\_id}/gateway/categories

##### ModelsExpand Collapse

<details>

<summary>

Category object {id, beta, class, 3 more }

</summary>

id: optional number

Identify this category. Only one category per ID.

<a href="#">Link to this property</a>

beta: optional boolean

Indicate whether the category is in beta and subject to change.

<a href="#">Link to this property</a>

<details>

<summary>

class: optional "free"or "premium"or "blocked"or 2 more

Specify which account types can create policies for this category. <code>blocked</code> Blocks unconditionally for all accounts. <code>removalPending</code> Allows removal from policies but disables addition. <code>noBlock</code> Prevents blocking.

</summary>

One of the following:

"free"

<a href="#">Link to this property</a>

"premium"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

"removalPending"

<a href="#">Link to this property</a>

"noBlock"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: optional string

Provide a short summary of domains in the category.

<a href="#">Link to this property</a>

name: optional string

Specify the category name.

<a href="#">Link to this property</a>

<details>

<summary>

subcategories: optional array of object {id, beta, class, 2 more }

Provide all subcategories for this category.

</summary>

id: optional number

Identify this category. Only one category per ID.

<a href="#">Link to this property</a>

beta: optional boolean

Indicate whether the category is in beta and subject to change.

<a href="#">Link to this property</a>

<details>

<summary>

class: optional "free"or "premium"or "blocked"or 2 more

Specify which account types can create policies for this category. <code>blocked</code> Blocks unconditionally for all accounts. <code>removalPending</code> Allows removal from policies but disables addition. <code>noBlock</code> Prevents blocking.

</summary>

One of the following:

"free"

<a href="#">Link to this property</a>

"premium"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

"removalPending"

<a href="#">Link to this property</a>

"noBlock"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: optional string

Provide a short summary of domains in the category.

<a href="#">Link to this property</a>

name: optional string

Specify the category name.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.categories%20%3E%20(model)%20category%20%3E%20(schema)>)