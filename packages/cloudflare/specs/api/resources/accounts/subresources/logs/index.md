---
title: Logs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Accounts](https://developers.cloudflare.com/api/resources/accounts)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Logs

#### LogsAudit

##### [Get account audit logs (Version 2)](https://developers.cloudflare.com/api/resources/accounts/subresources/logs/subresources/audit/methods/list)

GET/accounts/{account\_id}/logs/audit

##### [Get resource change history from an account audit log entry (Version 2)](https://developers.cloudflare.com/api/resources/accounts/subresources/logs/subresources/audit/methods/history)

GET/accounts/{account\_id}/logs/audit/{id}/history

##### [List account audit log product categories (Version 2)](https://developers.cloudflare.com/api/resources/accounts/subresources/logs/subresources/audit/methods/product_categories)

GET/accounts/{account\_id}/logs/audit/product\_categories

##### ModelsExpand Collapse

<details>

<summary>

AuditListResponse object {id, account, action, 4 more }

</summary>

id: optional string

A unique identifier for the audit log entry.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

account: optional object {id, name }

Contains account related information.

</summary>

id: optional string

A unique identifier for the account.

<a href="#">Link to this property</a>

name: optional string

A string that identifies the account name.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

action: optional object {description, result, time, type }

Provides information about the action performed.

</summary>

description: optional string

A short description of the action performed.

<a href="#">Link to this property</a>

result: optional string

The result of the action, indicating success or failure.

<a href="#">Link to this property</a>

time: optional string

A timestamp indicating when the action was logged.

formatdate-time

<a href="#">Link to this property</a>

type: optional string

A short string that describes the action that was performed.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

actor: optional object {id, context, email, 4 more }

Provides details about the actor who performed the action.

</summary>

id: optional string

The ID of the actor who performed the action. If a user performed the action, this will be their User ID.

<a href="#">Link to this property</a>

<details>

<summary>

context: optional "api"or "api\_key"or "api\_token"or 3 more

The context in which the action was initiated.

- <code>api</code>: The action was performed through the API. The specific credential type was not recorded.
- <code>api_key</code>: The action was authenticated with a Cloudflare Global API Key.
- <code>api_token</code>: The action was authenticated with an API token.
- <code>dash</code>: The action was performed through the Cloudflare dashboard.
- <code>oauth</code>: The action was authenticated with an OAuth token.
- <code>origin_ca_key</code>: The action was authenticated with an Origin CA key.

</summary>

One of the following:

"api"

<a href="#">Link to this property</a>

"api\_key"

<a href="#">Link to this property</a>

"api\_token"

<a href="#">Link to this property</a>

"dash"

<a href="#">Link to this property</a>

"oauth"

<a href="#">Link to this property</a>

"origin\_ca\_key"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

email: optional string

The email of the actor who performed the action.

formatemail

<a href="#">Link to this property</a>

ip\_address: optional string

The IP address of the request that performed the action.

<a href="#">Link to this property</a>

token\_id: optional string

The API token ID when the actor context is an api\_token or oauth.

<a href="#">Link to this property</a>

token\_name: optional string

The API token name when the actor context is an api\_token or oauth.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "account"or "cloudflare\_admin"or "delegated\_service"or 2 more

The type of actor.

</summary>

One of the following:

"account"

<a href="#">Link to this property</a>

"cloudflare\_admin"

<a href="#">Link to this property</a>

"delegated\_service"

<a href="#">Link to this property</a>

"system"

<a href="#">Link to this property</a>

"user"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

raw: optional object {cf\_ray\_id, method, status\_code, 2 more }

Provides raw information about the request and response.

</summary>

cf\_ray\_id: optional string

The Cloudflare Ray ID for the request.

<a href="#">Link to this property</a>

method: optional string

The HTTP method of the request.

<a href="#">Link to this property</a>

status\_code: optional number

The HTTP response status code returned by the API.

<a href="#">Link to this property</a>

uri: optional string

The URI of the request.

<a href="#">Link to this property</a>

user\_agent: optional string

The client’s user agent string sent with the request.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

resource: optional object {id, product, request, 3 more }

Provides details about the affected resource.

</summary>

id: optional string

The unique identifier for the affected resource.

<a href="#">Link to this property</a>

product: optional string

The Cloudflare product associated with the resource.

<a href="#">Link to this property</a>

request: optional unknown

<a href="#">Link to this property</a>

response: optional unknown

<a href="#">Link to this property</a>

scope: optional unknown

The scope of the resource.

<a href="#">Link to this property</a>

type: optional string

The type of the resource.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

zone: optional object {id, name }

Provides details about the zone affected by the action.

</summary>

id: optional string

A string that identifies the zone id.

<a href="#">Link to this property</a>

name: optional string

A string that identifies the zone name.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.logs.audit%20%3E%20(model)%20audit_list_response%20%3E%20(schema)>)

<details>

<summary>

AuditHistoryResponse = array of object {id, account, action, 4 more }

</summary>

id: optional string

A unique identifier for the audit log entry.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

account: optional object {id, name }

Contains account related information.

</summary>

id: optional string

A unique identifier for the account.

<a href="#">Link to this property</a>

name: optional string

A string that identifies the account name.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

action: optional object {description, result, time, type }

Provides information about the action performed.

</summary>

description: optional string

A short description of the action performed.

<a href="#">Link to this property</a>

result: optional string

The result of the action, indicating success or failure.

<a href="#">Link to this property</a>

time: optional string

A timestamp indicating when the action was logged.

formatdate-time

<a href="#">Link to this property</a>

type: optional string

A short string that describes the action that was performed.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

actor: optional object {id, context, email, 4 more }

Provides details about the actor who performed the action.

</summary>

id: optional string

The ID of the actor who performed the action. If a user performed the action, this will be their User ID.

<a href="#">Link to this property</a>

<details>

<summary>

context: optional "api"or "api\_key"or "api\_token"or 3 more

The context in which the action was initiated.

- <code>api</code>: The action was performed through the API. The specific credential type was not recorded.
- <code>api_key</code>: The action was authenticated with a Cloudflare Global API Key.
- <code>api_token</code>: The action was authenticated with an API token.
- <code>dash</code>: The action was performed through the Cloudflare dashboard.
- <code>oauth</code>: The action was authenticated with an OAuth token.
- <code>origin_ca_key</code>: The action was authenticated with an Origin CA key.

</summary>

One of the following:

"api"

<a href="#">Link to this property</a>

"api\_key"

<a href="#">Link to this property</a>

"api\_token"

<a href="#">Link to this property</a>

"dash"

<a href="#">Link to this property</a>

"oauth"

<a href="#">Link to this property</a>

"origin\_ca\_key"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

email: optional string

The email of the actor who performed the action.

formatemail

<a href="#">Link to this property</a>

ip\_address: optional string

The IP address of the request that performed the action.

<a href="#">Link to this property</a>

token\_id: optional string

The API token ID when the actor context is an api\_token or oauth.

<a href="#">Link to this property</a>

token\_name: optional string

The API token name when the actor context is an api\_token or oauth.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "account"or "cloudflare\_admin"or "delegated\_service"or 2 more

The type of actor.

</summary>

One of the following:

"account"

<a href="#">Link to this property</a>

"cloudflare\_admin"

<a href="#">Link to this property</a>

"delegated\_service"

<a href="#">Link to this property</a>

"system"

<a href="#">Link to this property</a>

"user"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

raw: optional object {cf\_ray\_id, method, status\_code, 2 more }

Provides raw information about the request and response.

</summary>

cf\_ray\_id: optional string

The Cloudflare Ray ID for the request.

<a href="#">Link to this property</a>

method: optional string

The HTTP method of the request.

<a href="#">Link to this property</a>

status\_code: optional number

The HTTP response status code returned by the API.

<a href="#">Link to this property</a>

uri: optional string

The URI of the request.

<a href="#">Link to this property</a>

user\_agent: optional string

The client’s user agent string sent with the request.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

resource: optional object {id, product, request, 3 more }

Provides details about the affected resource.

</summary>

id: optional string

The unique identifier for the affected resource.

<a href="#">Link to this property</a>

product: optional string

The Cloudflare product associated with the resource.

<a href="#">Link to this property</a>

request: optional unknown

<a href="#">Link to this property</a>

response: optional unknown

<a href="#">Link to this property</a>

scope: optional unknown

The scope of the resource.

<a href="#">Link to this property</a>

type: optional string

The type of the resource.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

zone: optional object {id, name }

Provides details about the zone affected by the action.

</summary>

id: optional string

A string that identifies the zone id.

<a href="#">Link to this property</a>

name: optional string

A string that identifies the zone name.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.logs.audit%20%3E%20(model)%20audit_history_response%20%3E%20(schema)>)

<details>

<summary>

AuditProductCategoriesResponse object {label, products, value }

A predefined product category and the resource products it expands to.

</summary>

label: optional string

A human-readable label for the product category.

<a href="#">Link to this property</a>

<details>

<summary>

products: optional array of object {label, value }

The resource products that the product category expands to.

</summary>

label: optional string

A human-readable label for the product.

<a href="#">Link to this property</a>

value: optional string

The resource\_product value that the product category expands to.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: optional string

The product category identifier used with the product\_category filter.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.logs.audit%20%3E%20(model)%20audit_product_categories_response%20%3E%20(schema)>)