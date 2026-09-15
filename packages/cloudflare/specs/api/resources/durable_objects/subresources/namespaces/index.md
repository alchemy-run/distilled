---
title: Namespaces
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Durable Objects](https://developers.cloudflare.com/api/resources/durable_objects)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Namespaces

##### [List Namespaces](https://developers.cloudflare.com/api/resources/durable_objects/subresources/namespaces/methods/list)

GET/accounts/{account\_id}/workers/durable\_objects/namespaces

##### ModelsExpand Collapse

<details>

<summary>

Namespace object {id, class, name, 2 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

class: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

script: optional string

<a href="#">Link to this property</a>

use\_sqlite: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20durable_objects.namespaces%20%3E%20(model)%20namespace%20%3E%20(schema)>)

#### NamespacesObjects

##### [List Objects](https://developers.cloudflare.com/api/resources/durable_objects/subresources/namespaces/subresources/objects/methods/list)

GET/accounts/{account\_id}/workers/durable\_objects/namespaces/{id}/objects

##### ModelsExpand Collapse

<details>

<summary>

DurableObject object {id, hasStoredData }

</summary>

id: optional string

ID of the Durable Object.

<a href="#">Link to this property</a>

hasStoredData: optional boolean

Whether the Durable Object has stored data.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20durable_objects.namespaces.objects%20%3E%20(model)%20durable_object%20%3E%20(schema)>)