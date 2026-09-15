---
title: Smart Routing
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Argo](https://developers.cloudflare.com/api/resources/argo)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Smart Routing

##### [Get Argo Smart Routing setting](https://developers.cloudflare.com/api/resources/argo/subresources/smart_routing/methods/get)

GET/zones/{zone\_id}/argo/smart\_routing

##### [Patch Argo Smart Routing setting](https://developers.cloudflare.com/api/resources/argo/subresources/smart_routing/methods/edit)

PATCH/zones/{zone\_id}/argo/smart\_routing

##### ModelsExpand Collapse

<details>

<summary>

SmartRoutingGetResponse object {id, editable, value, modified\_on }

</summary>

id: string

Specifies the identifier of the Argo Smart Routing setting.

<a href="#">Link to this property</a>

editable: boolean

Specifies if the setting is editable.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Specifies the enablement value of Argo Smart Routing.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

Specifies the time when the setting was last modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20argo.smart_routing%20%3E%20(model)%20smart_routing_get_response%20%3E%20(schema)>)

<details>

<summary>

SmartRoutingEditResponse object {id, editable, value, modified\_on }

</summary>

id: string

Specifies the identifier of the Argo Smart Routing setting.

<a href="#">Link to this property</a>

editable: boolean

Specifies if the setting is editable.

<a href="#">Link to this property</a>

<details>

<summary>

value: "on"or "off"

Specifies the enablement value of Argo Smart Routing.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

Specifies the time when the setting was last modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20argo.smart_routing%20%3E%20(model)%20smart_routing_edit_response%20%3E%20(schema)>)