---
title: Permission Groups
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[IAM](https://developers.cloudflare.com/api/resources/iam)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Permission Groups

##### [List Account Permission Groups](https://developers.cloudflare.com/api/resources/iam/subresources/permission_groups/methods/list)

GET/accounts/{account\_id}/iam/permission\_groups

##### [Permission Group Details](https://developers.cloudflare.com/api/resources/iam/subresources/permission_groups/methods/get)

GET/accounts/{account\_id}/iam/permission\_groups/{permission\_group\_id}

##### ModelsExpand Collapse

<details>

<summary>

PermissionGroupListResponse object {id, meta, name }

A named group of permissions that map to a group of operations against resources.

</summary>

id: string

Identifier of the permission group.

<a href="#">Link to this property</a>

<details>

<summary>

meta: optional object {key, value }

Attributes associated to the permission group.

</summary>

key: optional string

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Name of the permission group.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.permission_groups%20%3E%20(model)%20permission_group_list_response%20%3E%20(schema)>)

<details>

<summary>

PermissionGroupGetResponse object {id, meta, name }

A named group of permissions that map to a group of operations against resources.

</summary>

id: string

Identifier of the permission group.

<a href="#">Link to this property</a>

<details>

<summary>

meta: optional object {key, value }

Attributes associated to the permission group.

</summary>

key: optional string

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Name of the permission group.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.permission_groups%20%3E%20(model)%20permission_group_get_response%20%3E%20(schema)>)