---
title: Resource Groups
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[IAM](https://developers.cloudflare.com/api/resources/iam)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Resource Groups

##### [List Resource Groups](https://developers.cloudflare.com/api/resources/iam/subresources/resource_groups/methods/list)

GET/accounts/{account\_id}/iam/resource\_groups

##### [Resource Group Details](https://developers.cloudflare.com/api/resources/iam/subresources/resource_groups/methods/get)

GET/accounts/{account\_id}/iam/resource\_groups/{resource\_group\_id}

##### [Create Resource Group](https://developers.cloudflare.com/api/resources/iam/subresources/resource_groups/methods/create)

POST/accounts/{account\_id}/iam/resource\_groups

##### [Update Resource Group](https://developers.cloudflare.com/api/resources/iam/subresources/resource_groups/methods/update)

PUT/accounts/{account\_id}/iam/resource\_groups/{resource\_group\_id}

##### [Remove Resource Group](https://developers.cloudflare.com/api/resources/iam/subresources/resource_groups/methods/delete)

DELETE/accounts/{account\_id}/iam/resource\_groups/{resource\_group\_id}

##### ModelsExpand Collapse

<details>

<summary>

ResourceGroupListResponse object {id, scope, meta, name }

A group of scoped resources.

</summary>

id: string

Identifier of the resource group.

<a href="#">Link to this property</a>

<details>

<summary>

scope: object {key, objects }

A scope is a combination of scope objects which provides additional context.

</summary>

key: string

This is a combination of pre-defined resource name and identifier (like Account ID etc.)

<a href="#">Link to this property</a>

<details>

<summary>

objects: array of object {key }

A list of scope objects for additional context.

</summary>

key: string

This is a combination of pre-defined resource name and identifier (like Zone ID etc.)

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

meta: optional object {key, value }

Attributes associated to the resource group.

</summary>

key: optional string

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Name of the resource group.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.resource_groups%20%3E%20(model)%20resource_group_list_response%20%3E%20(schema)>)

<details>

<summary>

ResourceGroupGetResponse object {id, scope, meta, name }

A group of scoped resources.

</summary>

id: string

Identifier of the resource group.

<a href="#">Link to this property</a>

<details>

<summary>

scope: object {key, objects }

A scope is a combination of scope objects which provides additional context.

</summary>

key: string

This is a combination of pre-defined resource name and identifier (like Account ID etc.)

<a href="#">Link to this property</a>

<details>

<summary>

objects: array of object {key }

A list of scope objects for additional context.

</summary>

key: string

This is a combination of pre-defined resource name and identifier (like Zone ID etc.)

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

meta: optional object {key, value }

Attributes associated to the resource group.

</summary>

key: optional string

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Name of the resource group.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.resource_groups%20%3E%20(model)%20resource_group_get_response%20%3E%20(schema)>)

<details>

<summary>

ResourceGroupCreateResponse object {id, scope, meta, name }

A group of scoped resources.

</summary>

id: string

Identifier of the resource group.

<a href="#">Link to this property</a>

<details>

<summary>

scope: object {key, objects }

A scope is a combination of scope objects which provides additional context.

</summary>

key: string

This is a combination of pre-defined resource name and identifier (like Account ID etc.)

<a href="#">Link to this property</a>

<details>

<summary>

objects: array of object {key }

A list of scope objects for additional context.

</summary>

key: string

This is a combination of pre-defined resource name and identifier (like Zone ID etc.)

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

meta: optional object {key, value }

Attributes associated to the resource group.

</summary>

key: optional string

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Name of the resource group.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.resource_groups%20%3E%20(model)%20resource_group_create_response%20%3E%20(schema)>)

<details>

<summary>

ResourceGroupUpdateResponse object {id, scope, meta, name }

A group of scoped resources.

</summary>

id: string

Identifier of the resource group.

<a href="#">Link to this property</a>

<details>

<summary>

scope: object {key, objects }

A scope is a combination of scope objects which provides additional context.

</summary>

key: string

This is a combination of pre-defined resource name and identifier (like Account ID etc.)

<a href="#">Link to this property</a>

<details>

<summary>

objects: array of object {key }

A list of scope objects for additional context.

</summary>

key: string

This is a combination of pre-defined resource name and identifier (like Zone ID etc.)

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

meta: optional object {key, value }

Attributes associated to the resource group.

</summary>

key: optional string

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Name of the resource group.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.resource_groups%20%3E%20(model)%20resource_group_update_response%20%3E%20(schema)>)

<details>

<summary>

ResourceGroupDeleteResponse object {id }

</summary>

id: string

Identifier

maxLength32

minLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.resource_groups%20%3E%20(model)%20resource_group_delete_response%20%3E%20(schema)>)