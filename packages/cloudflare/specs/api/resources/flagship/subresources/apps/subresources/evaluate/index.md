---
title: Evaluate
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Flagship](https://developers.cloudflare.com/api/resources/flagship)

[Apps](https://developers.cloudflare.com/api/resources/flagship/subresources/apps)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Evaluate

##### [Evaluate flag](https://developers.cloudflare.com/api/resources/flagship/subresources/apps/subresources/evaluate/methods/get)

GET/accounts/{account\_id}/flagship/apps/{app\_id}/evaluate

##### ModelsExpand Collapse

<details>

<summary>

EvaluateGetResponse object {flagKey, reason, variant, value }

</summary>

flagKey: string

<a href="#">Link to this property</a>

<details>

<summary>

reason: "TARGETING\_MATCH"or "DEFAULT"or "DISABLED"or "SPLIT"

</summary>

One of the following:

"TARGETING\_MATCH"

<a href="#">Link to this property</a>

"DEFAULT"

<a href="#">Link to this property</a>

"DISABLED"

<a href="#">Link to this property</a>

"SPLIT"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

variant: string

<a href="#">Link to this property</a>

<details>

<summary>

value: optional stringor numberor booleanor 2 more

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

map\[unknown]

<a href="#">Link to this property</a>

array of unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20flagship.apps.evaluate%20%3E%20(model)%20evaluate_get_response%20%3E%20(schema)>)