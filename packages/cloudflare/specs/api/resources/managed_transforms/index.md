---
title: Managed Transforms
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Managed Transforms

##### [List Managed Transforms](https://developers.cloudflare.com/api/resources/managed_transforms/methods/list)

GET/zones/{zone\_id}/managed\_headers

##### [Update Managed Transforms](https://developers.cloudflare.com/api/resources/managed_transforms/methods/edit)

PATCH/zones/{zone\_id}/managed\_headers

##### [Delete Managed Transforms](https://developers.cloudflare.com/api/resources/managed_transforms/methods/delete)

DELETE/zones/{zone\_id}/managed\_headers

##### ModelsExpand Collapse

<details>

<summary>

ManagedTransformListResponse object {managed\_request\_headers, managed\_response\_headers }

A result.

</summary>

<details>

<summary>

managed\_request\_headers: array of object {id, enabled, has\_conflict, conflicts\_with }

The list of Managed Request Transforms.

</summary>

id: string

The human-readable identifier of the Managed Transform.

minLength1

<a href="#">Link to this property</a>

enabled: boolean

Whether the Managed Transform is enabled.

<a href="#">Link to this property</a>

has\_conflict: boolean

Whether the Managed Transform conflicts with the currently-enabled Managed Transforms.

<a href="#">Link to this property</a>

conflicts\_with: optional array of string

The Managed Transforms that this Managed Transform conflicts with.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

managed\_response\_headers: array of object {id, enabled, has\_conflict, conflicts\_with }

The list of Managed Response Transforms.

</summary>

id: string

The human-readable identifier of the Managed Transform.

minLength1

<a href="#">Link to this property</a>

enabled: boolean

Whether the Managed Transform is enabled.

<a href="#">Link to this property</a>

has\_conflict: boolean

Whether the Managed Transform conflicts with the currently-enabled Managed Transforms.

<a href="#">Link to this property</a>

conflicts\_with: optional array of string

The Managed Transforms that this Managed Transform conflicts with.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20managed_transforms%20%3E%20(model)%20managed_transform_list_response%20%3E%20(schema)>)

<details>

<summary>

ManagedTransformEditResponse object {managed\_request\_headers, managed\_response\_headers }

A result.

</summary>

<details>

<summary>

managed\_request\_headers: array of object {id, enabled, has\_conflict, conflicts\_with }

The list of Managed Request Transforms.

</summary>

id: string

The human-readable identifier of the Managed Transform.

minLength1

<a href="#">Link to this property</a>

enabled: boolean

Whether the Managed Transform is enabled.

<a href="#">Link to this property</a>

has\_conflict: boolean

Whether the Managed Transform conflicts with the currently-enabled Managed Transforms.

<a href="#">Link to this property</a>

conflicts\_with: optional array of string

The Managed Transforms that this Managed Transform conflicts with.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

managed\_response\_headers: array of object {id, enabled, has\_conflict, conflicts\_with }

The list of Managed Response Transforms.

</summary>

id: string

The human-readable identifier of the Managed Transform.

minLength1

<a href="#">Link to this property</a>

enabled: boolean

Whether the Managed Transform is enabled.

<a href="#">Link to this property</a>

has\_conflict: boolean

Whether the Managed Transform conflicts with the currently-enabled Managed Transforms.

<a href="#">Link to this property</a>

conflicts\_with: optional array of string

The Managed Transforms that this Managed Transform conflicts with.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20managed_transforms%20%3E%20(model)%20managed_transform_edit_response%20%3E%20(schema)>)