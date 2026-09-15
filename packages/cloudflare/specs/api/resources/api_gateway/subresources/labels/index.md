---
title: Labels
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[API Gateway](https://developers.cloudflare.com/api/resources/api_gateway)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Labels

##### [List operation labels](https://developers.cloudflare.com/api/resources/api_gateway/subresources/labels/methods/list)

GET/zones/{zone\_id}/api\_gateway/labels

##### ModelsExpand Collapse

<details>

<summary>

LabelListResponse object {created\_at, description, last\_updated, 4 more }

</summary>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: string

The description of the label

<a href="#">Link to this property</a>

last\_updated: string

formatdate-time

<a href="#">Link to this property</a>

metadata: unknown

Metadata for the label

<a href="#">Link to this property</a>

name: string

The name of the label

<a href="#">Link to this property</a>

<details>

<summary>

source: "user"or "managed"

- <code>user</code> - label is owned by the user
- <code>managed</code> - label is owned by cloudflare

</summary>

One of the following:

"user"

<a href="#">Link to this property</a>

"managed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

mapped\_resources: optional unknown

Provides counts of what resources are linked to this label

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.labels%20%3E%20(model)%20label_list_response%20%3E%20(schema)>)

#### LabelsUser

##### [Create user-defined operation labels](https://developers.cloudflare.com/api/resources/api_gateway/subresources/labels/subresources/user/methods/bulk_create)

POST/zones/{zone\_id}/api\_gateway/labels/user

##### [Delete user-defined operation labels](https://developers.cloudflare.com/api/resources/api_gateway/subresources/labels/subresources/user/methods/bulk_delete)

DELETE/zones/{zone\_id}/api\_gateway/labels/user

##### [Get a user-defined operation label](https://developers.cloudflare.com/api/resources/api_gateway/subresources/labels/subresources/user/methods/get)

GET/zones/{zone\_id}/api\_gateway/labels/user/{name}

##### [Update a user-defined operation label](https://developers.cloudflare.com/api/resources/api_gateway/subresources/labels/subresources/user/methods/update)

PUT/zones/{zone\_id}/api\_gateway/labels/user/{name}

##### [Edit a user-defined operation label](https://developers.cloudflare.com/api/resources/api_gateway/subresources/labels/subresources/user/methods/edit)

PATCH/zones/{zone\_id}/api\_gateway/labels/user/{name}

##### [Delete a user-defined operation label](https://developers.cloudflare.com/api/resources/api_gateway/subresources/labels/subresources/user/methods/delete)

DELETE/zones/{zone\_id}/api\_gateway/labels/user/{name}

##### ModelsExpand Collapse

<details>

<summary>

UserBulkCreateResponse object {created\_at, description, last\_updated, 3 more }

</summary>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: string

The description of the label

<a href="#">Link to this property</a>

last\_updated: string

formatdate-time

<a href="#">Link to this property</a>

metadata: unknown

Metadata for the label

<a href="#">Link to this property</a>

name: string

The name of the label

<a href="#">Link to this property</a>

<details>

<summary>

source: "user"or "managed"

- <code>user</code> - label is owned by the user
- <code>managed</code> - label is owned by cloudflare

</summary>

One of the following:

"user"

<a href="#">Link to this property</a>

"managed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.labels.user%20%3E%20(model)%20user_bulk_create_response%20%3E%20(schema)>)

<details>

<summary>

UserBulkDeleteResponse object {created\_at, description, last\_updated, 3 more }

</summary>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: string

The description of the label

<a href="#">Link to this property</a>

last\_updated: string

formatdate-time

<a href="#">Link to this property</a>

metadata: unknown

Metadata for the label

<a href="#">Link to this property</a>

name: string

The name of the label

<a href="#">Link to this property</a>

<details>

<summary>

source: "user"or "managed"

- <code>user</code> - label is owned by the user
- <code>managed</code> - label is owned by cloudflare

</summary>

One of the following:

"user"

<a href="#">Link to this property</a>

"managed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.labels.user%20%3E%20(model)%20user_bulk_delete_response%20%3E%20(schema)>)

<details>

<summary>

UserGetResponse object {created\_at, description, last\_updated, 4 more }

</summary>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: string

The description of the label

<a href="#">Link to this property</a>

last\_updated: string

formatdate-time

<a href="#">Link to this property</a>

metadata: unknown

Metadata for the label

<a href="#">Link to this property</a>

name: string

The name of the label

<a href="#">Link to this property</a>

<details>

<summary>

source: "user"or "managed"

- <code>user</code> - label is owned by the user
- <code>managed</code> - label is owned by cloudflare

</summary>

One of the following:

"user"

<a href="#">Link to this property</a>

"managed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

mapped\_resources: optional unknown

Provides counts of what resources are linked to this label

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.labels.user%20%3E%20(model)%20user_get_response%20%3E%20(schema)>)

<details>

<summary>

UserUpdateResponse object {created\_at, description, last\_updated, 3 more }

</summary>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: string

The description of the label

<a href="#">Link to this property</a>

last\_updated: string

formatdate-time

<a href="#">Link to this property</a>

metadata: unknown

Metadata for the label

<a href="#">Link to this property</a>

name: string

The name of the label

<a href="#">Link to this property</a>

<details>

<summary>

source: "user"or "managed"

- <code>user</code> - label is owned by the user
- <code>managed</code> - label is owned by cloudflare

</summary>

One of the following:

"user"

<a href="#">Link to this property</a>

"managed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.labels.user%20%3E%20(model)%20user_update_response%20%3E%20(schema)>)

<details>

<summary>

UserEditResponse object {created\_at, description, last\_updated, 3 more }

</summary>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: string

The description of the label

<a href="#">Link to this property</a>

last\_updated: string

formatdate-time

<a href="#">Link to this property</a>

metadata: unknown

Metadata for the label

<a href="#">Link to this property</a>

name: string

The name of the label

<a href="#">Link to this property</a>

<details>

<summary>

source: "user"or "managed"

- <code>user</code> - label is owned by the user
- <code>managed</code> - label is owned by cloudflare

</summary>

One of the following:

"user"

<a href="#">Link to this property</a>

"managed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.labels.user%20%3E%20(model)%20user_edit_response%20%3E%20(schema)>)

<details>

<summary>

UserDeleteResponse object {created\_at, description, last\_updated, 3 more }

</summary>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: string

The description of the label

<a href="#">Link to this property</a>

last\_updated: string

formatdate-time

<a href="#">Link to this property</a>

metadata: unknown

Metadata for the label

<a href="#">Link to this property</a>

name: string

The name of the label

<a href="#">Link to this property</a>

<details>

<summary>

source: "user"or "managed"

- <code>user</code> - label is owned by the user
- <code>managed</code> - label is owned by cloudflare

</summary>

One of the following:

"user"

<a href="#">Link to this property</a>

"managed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.labels.user%20%3E%20(model)%20user_delete_response%20%3E%20(schema)>)

#### LabelsUserResources

#### LabelsUserResourcesOperation

##### [Replace operations attached to a user-defined label](https://developers.cloudflare.com/api/resources/api_gateway/subresources/labels/subresources/user/subresources/resources/subresources/operation/methods/update)

PUT/zones/{zone\_id}/api\_gateway/labels/user/{name}/resources/operation

##### ModelsExpand Collapse

<details>

<summary>

OperationUpdateResponse object {created\_at, description, last\_updated, 4 more }

</summary>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: string

The description of the label

<a href="#">Link to this property</a>

last\_updated: string

formatdate-time

<a href="#">Link to this property</a>

metadata: unknown

Metadata for the label

<a href="#">Link to this property</a>

name: string

The name of the label

<a href="#">Link to this property</a>

<details>

<summary>

source: "user"or "managed"

- <code>user</code> - label is owned by the user
- <code>managed</code> - label is owned by cloudflare

</summary>

One of the following:

"user"

<a href="#">Link to this property</a>

"managed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

mapped\_resources: optional unknown

Provides counts of what resources are linked to this label

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.labels.user.resources.operation%20%3E%20(model)%20operation_update_response%20%3E%20(schema)>)

#### LabelsManaged

##### [Get a managed operation label](https://developers.cloudflare.com/api/resources/api_gateway/subresources/labels/subresources/managed/methods/get)

GET/zones/{zone\_id}/api\_gateway/labels/managed/{name}

##### ModelsExpand Collapse

<details>

<summary>

ManagedGetResponse object {created\_at, description, last\_updated, 4 more }

</summary>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: string

The description of the label

<a href="#">Link to this property</a>

last\_updated: string

formatdate-time

<a href="#">Link to this property</a>

metadata: unknown

Metadata for the label

<a href="#">Link to this property</a>

name: string

The name of the label

<a href="#">Link to this property</a>

<details>

<summary>

source: "user"or "managed"

- <code>user</code> - label is owned by the user
- <code>managed</code> - label is owned by cloudflare

</summary>

One of the following:

"user"

<a href="#">Link to this property</a>

"managed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

mapped\_resources: optional unknown

Provides counts of what resources are linked to this label

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.labels.managed%20%3E%20(model)%20managed_get_response%20%3E%20(schema)>)

#### LabelsManagedResources

#### LabelsManagedResourcesOperation

##### [Replace operations attached to a managed label](https://developers.cloudflare.com/api/resources/api_gateway/subresources/labels/subresources/managed/subresources/resources/subresources/operation/methods/update)

PUT/zones/{zone\_id}/api\_gateway/labels/managed/{name}/resources/operation

##### ModelsExpand Collapse

<details>

<summary>

OperationUpdateResponse object {created\_at, description, last\_updated, 4 more }

</summary>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: string

The description of the label

<a href="#">Link to this property</a>

last\_updated: string

formatdate-time

<a href="#">Link to this property</a>

metadata: unknown

Metadata for the label

<a href="#">Link to this property</a>

name: string

The name of the label

<a href="#">Link to this property</a>

<details>

<summary>

source: "user"or "managed"

- <code>user</code> - label is owned by the user
- <code>managed</code> - label is owned by cloudflare

</summary>

One of the following:

"user"

<a href="#">Link to this property</a>

"managed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

mapped\_resources: optional unknown

Provides counts of what resources are linked to this label

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.labels.managed.resources.operation%20%3E%20(model)%20operation_update_response%20%3E%20(schema)>)