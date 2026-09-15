---
title: Domain History
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Intel](https://developers.cloudflare.com/api/resources/intel)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Domain History

##### [Get Domain History](https://developers.cloudflare.com/api/resources/intel/subresources/domain_history/methods/get)

GET/accounts/{account\_id}/intel/domain-history

##### ModelsExpand Collapse

<details>

<summary>

DomainHistory object {categorizations, domain }

</summary>

<details>

<summary>

categorizations: optional array of object {categories, end, start }

</summary>

<details>

<summary>

categories: optional array of object {id, name }

</summary>

id: optional number

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

end: optional string

formatdate

<a href="#">Link to this property</a>

start: optional string

formatdate

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

domain: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.domain_history%20%3E%20(model)%20domain_history%20%3E%20(schema)>)

<details>

<summary>

DomainHistoryGetResponse = array of <a href="https://developers.cloudflare.com/api/resources/intel#(resource)%20intel.domain_history%20%3E%20(model)%20domain_history%20%3E%20(schema)">DomainHistory</a> { categorizations, domain }

</summary>

<details>

<summary>

categorizations: optional array of object {categories, end, start }

</summary>

<details>

<summary>

categories: optional array of object {id, name }

</summary>

id: optional number

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

end: optional string

formatdate

<a href="#">Link to this property</a>

start: optional string

formatdate

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

domain: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.domain_history%20%3E%20(model)%20domain_history_get_response%20%3E%20(schema)>)