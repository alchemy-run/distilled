---
title: Secrets
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Secrets Store](https://developers.cloudflare.com/api/resources/secrets_store)

[Stores](https://developers.cloudflare.com/api/resources/secrets_store/subresources/stores)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Secrets

##### [List store secrets](https://developers.cloudflare.com/api/resources/secrets_store/subresources/stores/subresources/secrets/methods/list)

GET/accounts/{account\_id}/secrets\_store/stores/{store\_id}/secrets

##### [Get a secret by ID](https://developers.cloudflare.com/api/resources/secrets_store/subresources/stores/subresources/secrets/methods/get)

GET/accounts/{account\_id}/secrets\_store/stores/{store\_id}/secrets/{secret\_id}

##### [Create a secret](https://developers.cloudflare.com/api/resources/secrets_store/subresources/stores/subresources/secrets/methods/create)

POST/accounts/{account\_id}/secrets\_store/stores/{store\_id}/secrets

##### [Patch a secret](https://developers.cloudflare.com/api/resources/secrets_store/subresources/stores/subresources/secrets/methods/edit)

PATCH/accounts/{account\_id}/secrets\_store/stores/{store\_id}/secrets/{secret\_id}

##### [Delete a secret](https://developers.cloudflare.com/api/resources/secrets_store/subresources/stores/subresources/secrets/methods/delete)

DELETE/accounts/{account\_id}/secrets\_store/stores/{store\_id}/secrets/{secret\_id}

##### [Delete secrets](https://developers.cloudflare.com/api/resources/secrets_store/subresources/stores/subresources/secrets/methods/bulk_delete)

DELETE/accounts/{account\_id}/secrets\_store/stores/{store\_id}/secrets

##### [Duplicate Secret](https://developers.cloudflare.com/api/resources/secrets_store/subresources/stores/subresources/secrets/methods/duplicate)

POST/accounts/{account\_id}/secrets\_store/stores/{store\_id}/secrets/{secret\_id}/duplicate

##### ModelsExpand Collapse

<details>

<summary>

SecretListResponse object {id, created, modified, 5 more }

</summary>

id: string

Secret identifier tag.

maxLength32

<a href="#">Link to this property</a>

created: string

When the secret was created.

formatdate-time

<a href="#">Link to this property</a>

modified: string

When the secret was modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

The name of the secret.

<a href="#">Link to this property</a>

<details>

<summary>

status: "pending"or "active"or "deleted"

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

store\_id: string

Store Identifier.

maxLength32

<a href="#">Link to this property</a>

comment: optional string

Freeform text describing the secret.

<a href="#">Link to this property</a>

<details>

<summary>

scopes: optional array of "workers"or "ai\_gateway"or "dex"or 3 more

The list of services that can use this secret.

</summary>

One of the following:

"workers"

<a href="#">Link to this property</a>

"ai\_gateway"

<a href="#">Link to this property</a>

"dex"

<a href="#">Link to this property</a>

"access"

<a href="#">Link to this property</a>

"containers"

<a href="#">Link to this property</a>

"websearch"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20secrets_store.stores.secrets%20%3E%20(model)%20secret_list_response%20%3E%20(schema)>)

<details>

<summary>

SecretGetResponse object {id, created, modified, 5 more }

</summary>

id: string

Secret identifier tag.

maxLength32

<a href="#">Link to this property</a>

created: string

When the secret was created.

formatdate-time

<a href="#">Link to this property</a>

modified: string

When the secret was modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

The name of the secret.

<a href="#">Link to this property</a>

<details>

<summary>

status: "pending"or "active"or "deleted"

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

store\_id: string

Store Identifier.

maxLength32

<a href="#">Link to this property</a>

comment: optional string

Freeform text describing the secret.

<a href="#">Link to this property</a>

<details>

<summary>

scopes: optional array of "workers"or "ai\_gateway"or "dex"or 3 more

The list of services that can use this secret.

</summary>

One of the following:

"workers"

<a href="#">Link to this property</a>

"ai\_gateway"

<a href="#">Link to this property</a>

"dex"

<a href="#">Link to this property</a>

"access"

<a href="#">Link to this property</a>

"containers"

<a href="#">Link to this property</a>

"websearch"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20secrets_store.stores.secrets%20%3E%20(model)%20secret_get_response%20%3E%20(schema)>)

<details>

<summary>

SecretCreateResponse object {id, created, modified, 5 more }

</summary>

id: string

Secret identifier tag.

maxLength32

<a href="#">Link to this property</a>

created: string

When the secret was created.

formatdate-time

<a href="#">Link to this property</a>

modified: string

When the secret was modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

The name of the secret.

<a href="#">Link to this property</a>

<details>

<summary>

status: "pending"or "active"or "deleted"

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

store\_id: string

Store Identifier.

maxLength32

<a href="#">Link to this property</a>

comment: optional string

Freeform text describing the secret.

<a href="#">Link to this property</a>

<details>

<summary>

scopes: optional array of "workers"or "ai\_gateway"or "dex"or 3 more

The list of services that can use this secret.

</summary>

One of the following:

"workers"

<a href="#">Link to this property</a>

"ai\_gateway"

<a href="#">Link to this property</a>

"dex"

<a href="#">Link to this property</a>

"access"

<a href="#">Link to this property</a>

"containers"

<a href="#">Link to this property</a>

"websearch"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20secrets_store.stores.secrets%20%3E%20(model)%20secret_create_response%20%3E%20(schema)>)

<details>

<summary>

SecretEditResponse object {id, created, modified, 5 more }

</summary>

id: string

Secret identifier tag.

maxLength32

<a href="#">Link to this property</a>

created: string

When the secret was created.

formatdate-time

<a href="#">Link to this property</a>

modified: string

When the secret was modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

The name of the secret.

<a href="#">Link to this property</a>

<details>

<summary>

status: "pending"or "active"or "deleted"

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

store\_id: string

Store Identifier.

maxLength32

<a href="#">Link to this property</a>

comment: optional string

Freeform text describing the secret.

<a href="#">Link to this property</a>

<details>

<summary>

scopes: optional array of "workers"or "ai\_gateway"or "dex"or 3 more

The list of services that can use this secret.

</summary>

One of the following:

"workers"

<a href="#">Link to this property</a>

"ai\_gateway"

<a href="#">Link to this property</a>

"dex"

<a href="#">Link to this property</a>

"access"

<a href="#">Link to this property</a>

"containers"

<a href="#">Link to this property</a>

"websearch"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20secrets_store.stores.secrets%20%3E%20(model)%20secret_edit_response%20%3E%20(schema)>)

SecretDeleteResponse = unknown

Result is null for delete operations.

[Link to this property](#)%20secrets_store.stores.secrets%20%3E%20(model)%20secret_delete_response%20%3E%20(schema)>)

SecretBulkDeleteResponse = unknown

Result is null for delete operations.

[Link to this property](#)%20secrets_store.stores.secrets%20%3E%20(model)%20secret_bulk_delete_response%20%3E%20(schema)>)

<details>

<summary>

SecretDuplicateResponse object {id, created, modified, 5 more }

</summary>

id: string

Secret identifier tag.

maxLength32

<a href="#">Link to this property</a>

created: string

When the secret was created.

formatdate-time

<a href="#">Link to this property</a>

modified: string

When the secret was modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

The name of the secret.

<a href="#">Link to this property</a>

<details>

<summary>

status: "pending"or "active"or "deleted"

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

store\_id: string

Store Identifier.

maxLength32

<a href="#">Link to this property</a>

comment: optional string

Freeform text describing the secret.

<a href="#">Link to this property</a>

<details>

<summary>

scopes: optional array of "workers"or "ai\_gateway"or "dex"or 3 more

The list of services that can use this secret.

</summary>

One of the following:

"workers"

<a href="#">Link to this property</a>

"ai\_gateway"

<a href="#">Link to this property</a>

"dex"

<a href="#">Link to this property</a>

"access"

<a href="#">Link to this property</a>

"containers"

<a href="#">Link to this property</a>

"websearch"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20secrets_store.stores.secrets%20%3E%20(model)%20secret_duplicate_response%20%3E%20(schema)>)