---
title: Data Tags
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DLP](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp)

[Data Tag Categories](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/data_tag_categories)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Data Tags

##### [Retrieve all data tags in a data tag category](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/data_tag_categories/subresources/data_tags/methods/list)

GET/accounts/{account\_id}/dlp/data\_tag\_categories/{category\_id}/data\_tags

##### [Retrieve a specific data tag.](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/data_tag_categories/subresources/data_tags/methods/get)

GET/accounts/{account\_id}/dlp/data\_tag\_categories/{category\_id}/data\_tags/{tag\_id}

##### [Creates a new data tag.](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/data_tag_categories/subresources/data_tags/methods/create)

POST/accounts/{account\_id}/dlp/data\_tag\_categories/{category\_id}/data\_tags

##### [Update the attributes of a single data tag.](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/data_tag_categories/subresources/data_tags/methods/update)

PUT/accounts/{account\_id}/dlp/data\_tag\_categories/{category\_id}/data\_tags/{tag\_id}

##### [Delete a single data tag.](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dlp/subresources/data_tag_categories/subresources/data_tags/methods/delete)

DELETE/accounts/{account\_id}/dlp/data\_tag\_categories/{category\_id}/data\_tags/{tag\_id}

##### ModelsExpand Collapse

<details>

<summary>

DataTagListResponse object {id, created\_at, name, 2 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.data_tag_categories.data_tags%20%3E%20(model)%20data_tag_list_response%20%3E%20(schema)>)

<details>

<summary>

DataTagGetResponse object {id, created\_at, name, 2 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.data_tag_categories.data_tags%20%3E%20(model)%20data_tag_get_response%20%3E%20(schema)>)

<details>

<summary>

DataTagCreateResponse object {id, created\_at, name, 2 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.data_tag_categories.data_tags%20%3E%20(model)%20data_tag_create_response%20%3E%20(schema)>)

<details>

<summary>

DataTagUpdateResponse object {id, created\_at, name, 2 more }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dlp.data_tag_categories.data_tags%20%3E%20(model)%20data_tag_update_response%20%3E%20(schema)>)

DataTagDeleteResponse = unknown

[Link to this property](#)%20zero_trust.dlp.data_tag_categories.data_tags%20%3E%20(model)%20data_tag_delete_response%20%3E%20(schema)>)