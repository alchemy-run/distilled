---
title: Categories
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cloudforce One](https://developers.cloudflare.com/api/resources/cloudforce_one)

[Threat Events](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Categories

##### [Lists categories across multiple datasets](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/categories/methods/list)

GET/accounts/{account\_id}/cloudforce-one/events/categories

##### [Reads a category](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/categories/methods/get)

GET/accounts/{account\_id}/cloudforce-one/events/categories/{category\_id}

##### [Creates a new category](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/categories/methods/create)

POST/accounts/{account\_id}/cloudforce-one/events/categories/create

##### [Updates a category](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/categories/methods/edit)

PATCH/accounts/{account\_id}/cloudforce-one/events/categories/{category\_id}

##### [Deletes a category](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/categories/methods/delete)

DELETE/accounts/{account\_id}/cloudforce-one/events/categories/{category\_id}

##### ModelsExpand Collapse

<details>

<summary>

CategoryListResponse = array of object {killChain, name, uuid, 3 more }

</summary>

killChain: number

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

mitreAttack: optional array of string

<a href="#">Link to this property</a>

mitreCapec: optional array of string

<a href="#">Link to this property</a>

shortname: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(model)%20category_list_response%20%3E%20(schema)>)

<details>

<summary>

CategoryGetResponse object {killChain, name, uuid, 3 more }

</summary>

killChain: number

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

mitreAttack: optional array of string

<a href="#">Link to this property</a>

mitreCapec: optional array of string

<a href="#">Link to this property</a>

shortname: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(model)%20category_get_response%20%3E%20(schema)>)

<details>

<summary>

CategoryCreateResponse object {killChain, name, uuid, 3 more }

</summary>

killChain: number

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

mitreAttack: optional array of string

<a href="#">Link to this property</a>

mitreCapec: optional array of string

<a href="#">Link to this property</a>

shortname: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(model)%20category_create_response%20%3E%20(schema)>)

<details>

<summary>

CategoryEditResponse object {killChain, name, uuid, 3 more }

</summary>

killChain: number

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

mitreAttack: optional array of string

<a href="#">Link to this property</a>

mitreCapec: optional array of string

<a href="#">Link to this property</a>

shortname: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(model)%20category_edit_response%20%3E%20(schema)>)

<details>

<summary>

CategoryDeleteResponse object {uuid }

</summary>

uuid: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.categories%20%3E%20(model)%20category_delete_response%20%3E%20(schema)>)

#### CategoriesCatalog

##### [Lists categories](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/categories/subresources/catalog/methods/list)

GET/accounts/{account\_id}/cloudforce-one/events/categories/catalog

##### ModelsExpand Collapse

<details>

<summary>

CatalogListResponse = array of object {killChain, name, uuid, 3 more }

</summary>

killChain: number

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

uuid: string

<a href="#">Link to this property</a>

mitreAttack: optional array of string

<a href="#">Link to this property</a>

mitreCapec: optional array of string

<a href="#">Link to this property</a>

shortname: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cloudforce_one.threat_events.categories.catalog%20%3E%20(model)%20catalog_list_response%20%3E%20(schema)>)