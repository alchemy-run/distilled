---
title: Permission Groups
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Accounts](https://developers.cloudflare.com/api/resources/accounts)

[Tokens](https://developers.cloudflare.com/api/resources/accounts/subresources/tokens)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Permission Groups

##### [List Permission Groups](https://developers.cloudflare.com/api/resources/accounts/subresources/tokens/subresources/permission_groups/methods/list)

GET/accounts/{account\_id}/tokens/permission\_groups

##### [List Permission Groups](https://developers.cloudflare.com/api/resources/accounts/subresources/tokens/subresources/permission_groups/methods/get)

GET/accounts/{account\_id}/tokens/permission\_groups

##### ModelsExpand Collapse

<details>

<summary>

PermissionGroupListResponse object {id, category, name, scopes }

</summary>

id: optional string

Public ID.

<a href="#">Link to this property</a>

<details>

<summary>

category: optional "developer\_platform"or "ai\_and\_machine\_learning"or "dns\_and\_zones"or 10 more

Product category that this permission group belongs to.

</summary>

One of the following:

"developer\_platform"

<a href="#">Link to this property</a>

"ai\_and\_machine\_learning"

<a href="#">Link to this property</a>

"dns\_and\_zones"

<a href="#">Link to this property</a>

"app\_security"

<a href="#">Link to this property</a>

"rules\_and\_configuration"

<a href="#">Link to this property</a>

"cloudflare\_one\_and\_zero\_trust"

<a href="#">Link to this property</a>

"analytics\_and\_logs"

<a href="#">Link to this property</a>

"network\_services"

<a href="#">Link to this property</a>

"media"

<a href="#">Link to this property</a>

"email\_and\_messaging"

<a href="#">Link to this property</a>

"cache\_and\_performance"

<a href="#">Link to this property</a>

"account\_and\_billing"

<a href="#">Link to this property</a>

"other"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Permission Group Name

<a href="#">Link to this property</a>

<details>

<summary>

scopes: optional array of "com.cloudflare.api.account"or "com.cloudflare.api.account.zone"or "com.cloudflare.api.user"or "com.cloudflare.edge.r2.bucket"

Resources to which the Permission Group is scoped

</summary>

One of the following:

"com.cloudflare.api.account"

<a href="#">Link to this property</a>

"com.cloudflare.api.account.zone"

<a href="#">Link to this property</a>

"com.cloudflare.api.user"

<a href="#">Link to this property</a>

"com.cloudflare.edge.r2.bucket"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.tokens.permission_groups%20%3E%20(model)%20permission_group_list_response%20%3E%20(schema)>)

<details>

<summary>

PermissionGroupGetResponse = array of object {id, category, name, scopes }

</summary>

id: optional string

Public ID.

<a href="#">Link to this property</a>

<details>

<summary>

category: optional "developer\_platform"or "ai\_and\_machine\_learning"or "dns\_and\_zones"or 10 more

Product category that this permission group belongs to.

</summary>

One of the following:

"developer\_platform"

<a href="#">Link to this property</a>

"ai\_and\_machine\_learning"

<a href="#">Link to this property</a>

"dns\_and\_zones"

<a href="#">Link to this property</a>

"app\_security"

<a href="#">Link to this property</a>

"rules\_and\_configuration"

<a href="#">Link to this property</a>

"cloudflare\_one\_and\_zero\_trust"

<a href="#">Link to this property</a>

"analytics\_and\_logs"

<a href="#">Link to this property</a>

"network\_services"

<a href="#">Link to this property</a>

"media"

<a href="#">Link to this property</a>

"email\_and\_messaging"

<a href="#">Link to this property</a>

"cache\_and\_performance"

<a href="#">Link to this property</a>

"account\_and\_billing"

<a href="#">Link to this property</a>

"other"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Permission Group Name

<a href="#">Link to this property</a>

<details>

<summary>

scopes: optional array of "com.cloudflare.api.account"or "com.cloudflare.api.account.zone"or "com.cloudflare.api.user"or "com.cloudflare.edge.r2.bucket"

Resources to which the Permission Group is scoped

</summary>

One of the following:

"com.cloudflare.api.account"

<a href="#">Link to this property</a>

"com.cloudflare.api.account.zone"

<a href="#">Link to this property</a>

"com.cloudflare.api.user"

<a href="#">Link to this property</a>

"com.cloudflare.edge.r2.bucket"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.tokens.permission_groups%20%3E%20(model)%20permission_group_get_response%20%3E%20(schema)>)