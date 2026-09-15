---
title: Regions
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Data Localization Suite](https://developers.cloudflare.com/api/resources/dls)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Regions

##### [List DLS regions for an account](https://developers.cloudflare.com/api/resources/dls/subresources/regions/methods/list)

GET/accounts/{account\_id}/dls/regions

##### [Get a DLS region](https://developers.cloudflare.com/api/resources/dls/subresources/regions/methods/get)

GET/accounts/{account\_id}/dls/regions/{region\_id}

##### ModelsExpand Collapse

<details>

<summary>

RegionListResponse object {id, created\_on, modified\_on, 4 more }

</summary>

id: string

<a href="#">Link to this property</a>

created\_on: string

formatdate-time

<a href="#">Link to this property</a>

modified\_on: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

region\_key: string

maxLength128

minLength1

<a href="#">Link to this property</a>

version: number

<a href="#">Link to this property</a>

version\_created\_on: string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dls.regions%20%3E%20(model)%20region_list_response%20%3E%20(schema)>)

<details>

<summary>

RegionGetResponse object {id, created\_on, modified\_on, 4 more }

</summary>

id: string

<a href="#">Link to this property</a>

created\_on: string

formatdate-time

<a href="#">Link to this property</a>

modified\_on: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

region\_key: string

maxLength128

minLength1

<a href="#">Link to this property</a>

version: number

<a href="#">Link to this property</a>

version\_created\_on: string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dls.regions%20%3E%20(model)%20region_get_response%20%3E%20(schema)>)