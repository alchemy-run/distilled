---
title: Categories
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Resource Library](https://developers.cloudflare.com/api/resources/zero_trust/subresources/resource_library)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Categories

##### [List application categories](https://developers.cloudflare.com/api/resources/zero_trust/subresources/resource_library/subresources/categories/methods/list)

GET/accounts/{account\_id}/resource-library/categories

##### [Get application category](https://developers.cloudflare.com/api/resources/zero_trust/subresources/resource_library/subresources/categories/methods/get)

GET/accounts/{account\_id}/resource-library/categories/{id}

##### ModelsExpand Collapse

<details>

<summary>

CategoryListResponse object {id, created\_at, description, name }

</summary>

id: number

Returns the category ID.

formatint64

maximum4294967295

minimum1

<a href="#">Link to this property</a>

created\_at: string

Returns the category creation time.

<a href="#">Link to this property</a>

description: string

Returns the category description.

<a href="#">Link to this property</a>

name: string

Returns the category name.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.resource_library.categories%20%3E%20(model)%20category_list_response%20%3E%20(schema)>)

<details>

<summary>

CategoryGetResponse object {id, created\_at, description, name }

</summary>

id: number

Returns the category ID.

formatint64

maximum4294967295

minimum1

<a href="#">Link to this property</a>

created\_at: string

Returns the category creation time.

<a href="#">Link to this property</a>

description: string

Returns the category description.

<a href="#">Link to this property</a>

name: string

Returns the category name.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.resource_library.categories%20%3E%20(model)%20category_get_response%20%3E%20(schema)>)