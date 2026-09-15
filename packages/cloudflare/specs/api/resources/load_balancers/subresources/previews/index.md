---
title: Previews
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Load Balancers](https://developers.cloudflare.com/api/resources/load_balancers)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Previews

##### [Preview Result](https://developers.cloudflare.com/api/resources/load_balancers/subresources/previews/methods/get)

GET/accounts/{account\_id}/load\_balancers/preview/{preview\_id}

##### ModelsExpand Collapse

<details>

<summary>

PreviewGetResponse = map\[object {healthy, origins } ]

Resulting health data from a preview operation.

</summary>

healthy: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

origins: optional array of map\[object {failure\_reason, healthy, response\_code, rtt } ]

</summary>

failure\_reason: optional string

<a href="#">Link to this property</a>

healthy: optional boolean

<a href="#">Link to this property</a>

response\_code: optional number

<a href="#">Link to this property</a>

rtt: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20load_balancers.previews%20%3E%20(model)%20preview_get_response%20%3E%20(schema)>)