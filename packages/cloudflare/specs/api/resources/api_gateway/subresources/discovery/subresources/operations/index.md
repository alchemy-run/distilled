---
title: Operations
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[API Gateway](https://developers.cloudflare.com/api/resources/api_gateway)

[Discovery](https://developers.cloudflare.com/api/resources/api_gateway/subresources/discovery)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Operations

##### [List discovered web and API operations](https://developers.cloudflare.com/api/resources/api_gateway/subresources/discovery/subresources/operations/methods/list)

GET/zones/{zone\_id}/api\_gateway/discovery/operations

##### [Edit discovered web and API operations](https://developers.cloudflare.com/api/resources/api_gateway/subresources/discovery/subresources/operations/methods/bulk_edit)

PATCH/zones/{zone\_id}/api\_gateway/discovery/operations

##### ModelsExpand Collapse

<details>

<summary>

OperationBulkEditResponse = map\[object {state } ]

</summary>

<details>

<summary>

state: optional "review"or "ignored"

Mark state of operation in API Discovery

- <code>review</code> - Mark operation as for review
- <code>ignored</code> - Mark operation as ignored

</summary>

One of the following:

"review"

<a href="#">Link to this property</a>

"ignored"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.discovery.operations%20%3E%20(model)%20operation_bulk_edit_response%20%3E%20(schema)>)