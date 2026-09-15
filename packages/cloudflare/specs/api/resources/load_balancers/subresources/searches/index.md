---
title: Searches
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Load Balancers](https://developers.cloudflare.com/api/resources/load_balancers)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Searches

##### [Search Resources](https://developers.cloudflare.com/api/resources/load_balancers/subresources/searches/methods/list)

GET/accounts/{account\_id}/load\_balancers/search

##### ModelsExpand Collapse

<details>

<summary>

SearchListResponse object {resources }

</summary>

<details>

<summary>

resources: optional array of object {reference\_type, references, resource\_id, 2 more }

A list of resources matching the search query.

</summary>

<details>

<summary>

reference\_type: optional "referral"or "referrer"

When listed as a reference, the type (direction) of the reference.

</summary>

One of the following:

"referral"

<a href="#">Link to this property</a>

"referrer"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

references: optional array of unknown

A list of references to (referrer) or from (referral) this resource.

<a href="#">Link to this property</a>

resource\_id: optional string

<a href="#">Link to this property</a>

resource\_name: optional string

The human-identifiable name of the resource.

<a href="#">Link to this property</a>

<details>

<summary>

resource\_type: optional "load\_balancer"or "monitor"or "pool"

The type of the resource.

</summary>

One of the following:

"load\_balancer"

<a href="#">Link to this property</a>

"monitor"

<a href="#">Link to this property</a>

"pool"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.searches%20%3E%20(model)%20search_list_response%20%3E%20(schema)>)