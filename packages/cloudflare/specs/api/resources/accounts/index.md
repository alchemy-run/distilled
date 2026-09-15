---
title: Accounts
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Accounts

##### [List Accounts](https://developers.cloudflare.com/api/resources/accounts/methods/list)

GET/accounts

##### [Account Details](https://developers.cloudflare.com/api/resources/accounts/methods/get)

GET/accounts/{account\_id}

##### [Create an account](https://developers.cloudflare.com/api/resources/accounts/methods/create)

POST/accounts

##### [Update Account](https://developers.cloudflare.com/api/resources/accounts/methods/update)

PUT/accounts/{account\_id}

##### [Delete a specific account](https://developers.cloudflare.com/api/resources/accounts/methods/delete)

DELETE/accounts/{account\_id}

##### ModelsExpand Collapse

<details>

<summary>

Account object {id, name, type, 3 more }

</summary>

id: string

Identifier

maxLength32

minLength32

<a href="#">Link to this property</a>

name: string

Account name

maxLength100

<a href="#">Link to this property</a>

<details>

<summary>

type: "standard"or "enterprise"

</summary>

One of the following:

"standard"

<a href="#">Link to this property</a>

"enterprise"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: optional string

Timestamp for the creation of the account

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

managed\_by: optional object {parent\_org\_id, parent\_org\_name }

Parent container details

</summary>

parent\_org\_id: optional string

ID of the parent Organization, if one exists

maxLength32

<a href="#">Link to this property</a>

parent\_org\_name: optional string

Name of the parent Organization, if one exists

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

settings: optional object {abuse\_contact\_email, enforce\_twofactor }

Account settings

</summary>

abuse\_contact\_email: optional string

Sets an abuse contact email to notify for abuse reports.

<a href="#">Link to this property</a>

enforce\_twofactor: optional boolean

Indicates whether membership in this account requires that Two-Factor Authentication is enabled

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts%20%3E%20(model)%20account%20%3E%20(schema)>)

<details>

<summary>

AccountDeleteResponse object {id }

</summary>

id: string

Identifier

maxLength32

minLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts%20%3E%20(model)%20account_delete_response%20%3E%20(schema)>)

#### AccountsAccount Organizations

##### [Move account](https://developers.cloudflare.com/api/resources/accounts/subresources/account_organizations/methods/create)

POST/accounts/{account\_id}/move

##### ModelsExpand Collapse

<details>

<summary>

AccountOrganizationCreateResponse object {account\_id, destination\_organization\_id, source\_organization\_id }

</summary>

account\_id: string

<a href="#">Link to this property</a>

destination\_organization\_id: string

<a href="#">Link to this property</a>

source\_organization\_id: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.account_organizations%20%3E%20(model)%20account_organization_create_response%20%3E%20(schema)>)

#### AccountsAccount Profile

##### [Get account profile](https://developers.cloudflare.com/api/resources/accounts/subresources/account_profile/methods/get)

GET/accounts/{account\_id}/profile

##### [Modify account profile](https://developers.cloudflare.com/api/resources/accounts/subresources/account_profile/methods/update)

PUT/accounts/{account\_id}/profile

##### ModelsExpand Collapse

<details>

<summary>

AccountProfile object {business\_address, business\_email, business\_name, 2 more }

</summary>

business\_address: string

<a href="#">Link to this property</a>

business\_email: string

<a href="#">Link to this property</a>

business\_name: string

<a href="#">Link to this property</a>

business\_phone: string

<a href="#">Link to this property</a>

external\_metadata: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.account_profile%20%3E%20(model)%20account_profile%20%3E%20(schema)>)

#### AccountsMembers

##### [List Members](https://developers.cloudflare.com/api/resources/accounts/subresources/members/methods/list)

GET/accounts/{account\_id}/members

##### [Member Details](https://developers.cloudflare.com/api/resources/accounts/subresources/members/methods/get)

GET/accounts/{account\_id}/members/{member\_id}

##### [Add Member](https://developers.cloudflare.com/api/resources/accounts/subresources/members/methods/create)

POST/accounts/{account\_id}/members

##### [Update Member](https://developers.cloudflare.com/api/resources/accounts/subresources/members/methods/update)

PUT/accounts/{account\_id}/members/{member\_id}

##### [Remove Member](https://developers.cloudflare.com/api/resources/accounts/subresources/members/methods/delete)

DELETE/accounts/{account\_id}/members/{member\_id}

##### ModelsExpand Collapse

<details>

<summary>

Status = "member"or "invited"

Whether the user is a member of the organization or has an invitation pending.

</summary>

One of the following:

"member"

<a href="#">Link to this property</a>

"invited"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.members%20%3E%20(model)%20status%20%3E%20(schema)>)

<details>

<summary>

MemberDeleteResponse object {id }

</summary>

id: string

Identifier

maxLength32

minLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.members%20%3E%20(model)%20member_delete_response%20%3E%20(schema)>)

#### AccountsRoles

##### [List Roles](https://developers.cloudflare.com/api/resources/accounts/subresources/roles/methods/list)

Deprecated

GET/accounts/{account\_id}/roles

##### [Role Details](https://developers.cloudflare.com/api/resources/accounts/subresources/roles/methods/get)

Deprecated

GET/accounts/{account\_id}/roles/{role\_id}

#### AccountsSubscriptions

##### [List Subscriptions](https://developers.cloudflare.com/api/resources/accounts/subresources/subscriptions/methods/get)

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/subscriptions

##### [Get Subscription](https://developers.cloudflare.com/api/resources/accounts/subresources/subscriptions/methods/get_by_identifier)

GET/accounts/{account\_id}/subscriptions/{subscription\_identifier}

##### [Create Subscription](https://developers.cloudflare.com/api/resources/accounts/subresources/subscriptions/methods/create)

POST/{accounts\_or\_zones}/{account\_or\_zone\_id}/subscriptions

##### [Update Subscription](https://developers.cloudflare.com/api/resources/accounts/subresources/subscriptions/methods/update)

PUT/accounts/{account\_id}/subscriptions/{subscription\_identifier}

##### [Delete Subscription](https://developers.cloudflare.com/api/resources/accounts/subresources/subscriptions/methods/delete)

DELETE/accounts/{account\_id}/subscriptions/{subscription\_identifier}

##### [Cancel Delayed Downgrade](https://developers.cloudflare.com/api/resources/accounts/subresources/subscriptions/methods/cancel_downgrade)

POST/accounts/{account\_id}/subscriptions/cancel-downgrade

##### ModelsExpand Collapse

<details>

<summary>

SubscriptionDeleteResponse object {subscription\_id }

</summary>

subscription\_id: optional string

Subscription identifier tag.

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.subscriptions%20%3E%20(model)%20subscription_delete_response%20%3E%20(schema)>)

<details>

<summary>

SubscriptionCancelDowngradeResponse = unknownor string

</summary>

One of the following:

unknown

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.subscriptions%20%3E%20(model)%20subscription_cancel_downgrade_response%20%3E%20(schema)>)

#### AccountsSubscriptionsCancel Reason

##### [Create Cancel Reason](https://developers.cloudflare.com/api/resources/accounts/subresources/subscriptions/subresources/cancel_reason/methods/create)

POST/accounts/{account\_id}/subscriptions/{subscription\_identifier}/cancel-reason

##### [Get Cancel Reason](https://developers.cloudflare.com/api/resources/accounts/subresources/subscriptions/subresources/cancel_reason/methods/get)

GET/accounts/{account\_id}/subscriptions/{subscription\_identifier}/cancel-reason

##### ModelsExpand Collapse

<details>

<summary>

CancelReasonCreateResponse object {id, other, reason\_code, 2 more }

</summary>

id: optional string

The cancel reason identifier.

<a href="#">Link to this property</a>

other: optional string

Additional cancellation details.

<a href="#">Link to this property</a>

reason\_code: optional array of string

The cancellation reason codes.

<a href="#">Link to this property</a>

submitted: optional string

When the cancel reason was submitted.

formatdate-time

<a href="#">Link to this property</a>

subscription\_id: optional string

The subscription identifier.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.subscriptions.cancel_reason%20%3E%20(model)%20cancel_reason_create_response%20%3E%20(schema)>)

<details>

<summary>

CancelReasonGetResponse object {id, other, reason\_code, 2 more }

</summary>

id: optional string

The cancel reason identifier.

<a href="#">Link to this property</a>

other: optional string

Additional cancellation details.

<a href="#">Link to this property</a>

reason\_code: optional array of string

The cancellation reason codes.

<a href="#">Link to this property</a>

submitted: optional string

When the cancel reason was submitted.

formatdate-time

<a href="#">Link to this property</a>

subscription\_id: optional string

The subscription identifier.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.subscriptions.cancel_reason%20%3E%20(model)%20cancel_reason_get_response%20%3E%20(schema)>)

#### AccountsSubscriptionsActions

##### [Append Subscription Action](https://developers.cloudflare.com/api/resources/accounts/subresources/subscriptions/subresources/actions/methods/append)

POST/accounts/{account\_id}/subscriptions/{subscription\_identifier}/action/append

#### AccountsSubscriptionsBulk

##### [Create Subscriptions](https://developers.cloudflare.com/api/resources/accounts/subresources/subscriptions/subresources/bulk/methods/create)

POST/accounts/{account\_id}/bulk/subscriptions

##### ModelsExpand Collapse

BulkCreateResponse = array of unknown

[Link to this property](#)%20accounts.subscriptions.bulk%20%3E%20(model)%20bulk_create_response%20%3E%20(schema)>)

#### AccountsTokens

##### [List Tokens](https://developers.cloudflare.com/api/resources/accounts/subresources/tokens/methods/list)

GET/accounts/{account\_id}/tokens

##### [Token Details](https://developers.cloudflare.com/api/resources/accounts/subresources/tokens/methods/get)

GET/accounts/{account\_id}/tokens/{token\_id}

##### [Create Token](https://developers.cloudflare.com/api/resources/accounts/subresources/tokens/methods/create)

POST/accounts/{account\_id}/tokens

##### [Update Token](https://developers.cloudflare.com/api/resources/accounts/subresources/tokens/methods/update)

PUT/accounts/{account\_id}/tokens/{token\_id}

##### [Delete Token](https://developers.cloudflare.com/api/resources/accounts/subresources/tokens/methods/delete)

DELETE/accounts/{account\_id}/tokens/{token\_id}

##### [Verify Token](https://developers.cloudflare.com/api/resources/accounts/subresources/tokens/methods/verify)

GET/accounts/{account\_id}/tokens/verify

##### ModelsExpand Collapse

<details>

<summary>

TokenCreateResponse object {id, condition, expires\_on, 8 more }

</summary>

id: optional string

Token identifier tag.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

condition: optional object {request\_ip }

</summary>

<details>

<summary>

request\_ip: optional object {in, not\_in }

Client IP restrictions.

</summary>

in: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20token_condition_cidr_list%20%3E%20(schema)">TokenConditionCIDRList</a>

List of IPv4/IPv6 CIDR addresses.

<a href="#">Link to this property</a>

not\_in: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20token_condition_cidr_list%20%3E%20(schema)">TokenConditionCIDRList</a>

List of IPv4/IPv6 CIDR addresses.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

expires\_on: optional string

The expiration time on or after which the JWT MUST NOT be accepted for processing.

formatdate-time

<a href="#">Link to this property</a>

issued\_on: optional string

The time on which the token was created.

formatdate-time

<a href="#">Link to this property</a>

last\_used\_on: optional string

Last time the token was used.

formatdate-time

<a href="#">Link to this property</a>

modified\_on: optional string

Last time the token was modified.

formatdate-time

<a href="#">Link to this property</a>

name: optional string

Token name.

maxLength120

<a href="#">Link to this property</a>

not\_before: optional string

The time before which the token MUST NOT be accepted for processing.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

policies: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20token_policy%20%3E%20(schema)">TokenPolicy</a> { id, effect, permission\_groups, resources }

List of access policies assigned to the token.

</summary>

id: string

Policy identifier.

<a href="#">Link to this property</a>

<details>

<summary>

effect: "allow"or "deny"

Allow or deny operations against the resources.

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"deny"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

permission\_groups: array of object {id, meta, name }

A set of permission groups that are specified to the policy.

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

<a href="#">Link to this property</a>

<details>

<summary>

resources: map\[string]or map\[map\[string]]

A list of resource names that the policy applies to.

</summary>

One of the following:

IAMResourcesTypeObjectString = map\[string]

Map of simple string resource permissions

<a href="#">Link to this property</a>

IAMResourcesTypeObjectNested = map\[map\[string]]

Map of nested resource permissions

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "active"or "disabled"or "expired"

Status of the token.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

"expired"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20token_value%20%3E%20(schema)">TokenValue</a>

The token value.

maxLength80

minLength40

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.tokens%20%3E%20(model)%20token_create_response%20%3E%20(schema)>)

<details>

<summary>

TokenDeleteResponse object {id }

</summary>

id: string

Identifier

maxLength32

minLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.tokens%20%3E%20(model)%20token_delete_response%20%3E%20(schema)>)

<details>

<summary>

TokenVerifyResponse object {id, status, expires\_on, not\_before }

</summary>

id: string

Token identifier tag.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

status: "active"or "disabled"or "expired"

Status of the token.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

"expired"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

expires\_on: optional string

The expiration time on or after which the JWT MUST NOT be accepted for processing.

formatdate-time

<a href="#">Link to this property</a>

not\_before: optional string

The time before which the token MUST NOT be accepted for processing.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.tokens%20%3E%20(model)%20token_verify_response%20%3E%20(schema)>)

#### AccountsTokensPermission Groups

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

#### AccountsTokensValue

##### [Roll Token](https://developers.cloudflare.com/api/resources/accounts/subresources/tokens/subresources/value/methods/update)

PUT/accounts/{account\_id}/tokens/{token\_id}/value

#### AccountsLogs

#### AccountsLogsAudit

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

#### AccountsSpeed Settings

#### AccountsSpeed SettingsTransformations

##### [List Image Resizing configurations for account](https://developers.cloudflare.com/api/resources/accounts/subresources/speed_settings/subresources/transformations/methods/get)

GET/accounts/{account\_id}/settings/transformations

##### ModelsExpand Collapse

<details>

<summary>

TransformationsConfig object {id, cf\_zone\_tag, editable, 2 more }

A configuration item for a specific zone and feature.

</summary>

id: optional string

Feature identifier.

<a href="#">Link to this property</a>

cf\_zone\_tag: optional string

Zone tag identifier.

<a href="#">Link to this property</a>

editable: optional boolean

Whether this setting can be modified.

<a href="#">Link to this property</a>

modified\_on: optional string

When this setting was last modified.

formatdate-time

<a href="#">Link to this property</a>

value: optional string

Current value of the feature setting.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.speed_settings.transformations%20%3E%20(model)%20transformations_config%20%3E%20(schema)>)

#### AccountsPayment Methods

##### [List Payment Methods](https://developers.cloudflare.com/api/resources/accounts/subresources/payment_methods/methods/list)

GET/accounts/{account\_id}/payment-methods

##### [Create Payment Method](https://developers.cloudflare.com/api/resources/accounts/subresources/payment_methods/methods/create)

POST/accounts/{account\_id}/payment-methods

##### [Get Payment Method](https://developers.cloudflare.com/api/resources/accounts/subresources/payment_methods/methods/get)

GET/accounts/{account\_id}/payment-methods/{payment\_method\_id}

##### [Update Payment Method](https://developers.cloudflare.com/api/resources/accounts/subresources/payment_methods/methods/update)

PUT/accounts/{account\_id}/payment-methods/{payment\_method\_id}

##### [Delete Payment Method](https://developers.cloudflare.com/api/resources/accounts/subresources/payment_methods/methods/delete)

DELETE/accounts/{account\_id}/payment-methods/{payment\_method\_id}

##### [Set Default Payment Method](https://developers.cloudflare.com/api/resources/accounts/subresources/payment_methods/methods/set_as_default)

POST/accounts/{account\_id}/payment-methods/{payment\_method\_id}/set-as-default

##### ModelsExpand Collapse

<details>

<summary>

PaymentMethodListResponse object {id, address, address2, 22 more }

</summary>

id: optional string

Payment method identifier.

<a href="#">Link to this property</a>

address: optional string

Billing address line 1.

<a href="#">Link to this property</a>

address2: optional string

Billing address line 2.

<a href="#">Link to this property</a>

bank\_account\_type: optional string

Bank account type.

<a href="#">Link to this property</a>

bank\_code: optional string

Bank code.

<a href="#">Link to this property</a>

bank\_country: optional string

Bank country.

<a href="#">Link to this property</a>

bank\_name: optional string

Bank name for bank-based payment methods.

<a href="#">Link to this property</a>

bank\_routing\_number: optional string

Bank routing number.

<a href="#">Link to this property</a>

cashapp\_cash\_tag: optional string

Cash App cash tag.

<a href="#">Link to this property</a>

city: optional string

Billing city.

<a href="#">Link to this property</a>

country: optional string

Billing country.

<a href="#">Link to this property</a>

default: optional boolean

Whether this is the default payment method.

<a href="#">Link to this property</a>

device\_data: optional string

Device data for fraud prevention.

<a href="#">Link to this property</a>

expiration\_date: optional string

Card expiration date.

<a href="#">Link to this property</a>

first\_name: optional string

Billing first name.

<a href="#">Link to this property</a>

last\_four: optional string

Last four digits of the card number.

<a href="#">Link to this property</a>

last\_name: optional string

Billing last name.

<a href="#">Link to this property</a>

nick\_name: optional string

A nickname for the payment method.

<a href="#">Link to this property</a>

payment\_account\_email: optional string

Email associated with the payment account.

<a href="#">Link to this property</a>

payment\_email: optional string

Payment email address.

<a href="#">Link to this property</a>

payment\_gateway: optional string

The payment gateway used.

<a href="#">Link to this property</a>

payment\_nonce: optional string

Payment nonce for tokenized payments.

<a href="#">Link to this property</a>

state: optional string

Billing state.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "CREDIT\_CARD"or "PAYPAL"or "CASHAPP"or 3 more

The payment method type.

</summary>

One of the following:

"CREDIT\_CARD"

<a href="#">Link to this property</a>

"PAYPAL"

<a href="#">Link to this property</a>

"CASHAPP"

<a href="#">Link to this property</a>

"SEPA\_DEBIT"

<a href="#">Link to this property</a>

"LINK"

<a href="#">Link to this property</a>

"ACH\_DIRECT\_DEBIT"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

zipcode: optional string

Billing zip code.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.payment_methods%20%3E%20(model)%20payment_method_list_response%20%3E%20(schema)>)

<details>

<summary>

PaymentMethodCreateResponse object {id, address, address2, 22 more }

</summary>

id: optional string

Payment method identifier.

<a href="#">Link to this property</a>

address: optional string

Billing address line 1.

<a href="#">Link to this property</a>

address2: optional string

Billing address line 2.

<a href="#">Link to this property</a>

bank\_account\_type: optional string

Bank account type.

<a href="#">Link to this property</a>

bank\_code: optional string

Bank code.

<a href="#">Link to this property</a>

bank\_country: optional string

Bank country.

<a href="#">Link to this property</a>

bank\_name: optional string

Bank name for bank-based payment methods.

<a href="#">Link to this property</a>

bank\_routing\_number: optional string

Bank routing number.

<a href="#">Link to this property</a>

cashapp\_cash\_tag: optional string

Cash App cash tag.

<a href="#">Link to this property</a>

city: optional string

Billing city.

<a href="#">Link to this property</a>

country: optional string

Billing country.

<a href="#">Link to this property</a>

default: optional boolean

Whether this is the default payment method.

<a href="#">Link to this property</a>

device\_data: optional string

Device data for fraud prevention.

<a href="#">Link to this property</a>

expiration\_date: optional string

Card expiration date.

<a href="#">Link to this property</a>

first\_name: optional string

Billing first name.

<a href="#">Link to this property</a>

last\_four: optional string

Last four digits of the card number.

<a href="#">Link to this property</a>

last\_name: optional string

Billing last name.

<a href="#">Link to this property</a>

nick\_name: optional string

A nickname for the payment method.

<a href="#">Link to this property</a>

payment\_account\_email: optional string

Email associated with the payment account.

<a href="#">Link to this property</a>

payment\_email: optional string

Payment email address.

<a href="#">Link to this property</a>

payment\_gateway: optional string

The payment gateway used.

<a href="#">Link to this property</a>

payment\_nonce: optional string

Payment nonce for tokenized payments.

<a href="#">Link to this property</a>

state: optional string

Billing state.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "CREDIT\_CARD"or "PAYPAL"or "CASHAPP"or 3 more

The payment method type.

</summary>

One of the following:

"CREDIT\_CARD"

<a href="#">Link to this property</a>

"PAYPAL"

<a href="#">Link to this property</a>

"CASHAPP"

<a href="#">Link to this property</a>

"SEPA\_DEBIT"

<a href="#">Link to this property</a>

"LINK"

<a href="#">Link to this property</a>

"ACH\_DIRECT\_DEBIT"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

zipcode: optional string

Billing zip code.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.payment_methods%20%3E%20(model)%20payment_method_create_response%20%3E%20(schema)>)

<details>

<summary>

PaymentMethodGetResponse object {id, address, address2, 22 more }

</summary>

id: optional string

Payment method identifier.

<a href="#">Link to this property</a>

address: optional string

Billing address line 1.

<a href="#">Link to this property</a>

address2: optional string

Billing address line 2.

<a href="#">Link to this property</a>

bank\_account\_type: optional string

Bank account type.

<a href="#">Link to this property</a>

bank\_code: optional string

Bank code.

<a href="#">Link to this property</a>

bank\_country: optional string

Bank country.

<a href="#">Link to this property</a>

bank\_name: optional string

Bank name for bank-based payment methods.

<a href="#">Link to this property</a>

bank\_routing\_number: optional string

Bank routing number.

<a href="#">Link to this property</a>

cashapp\_cash\_tag: optional string

Cash App cash tag.

<a href="#">Link to this property</a>

city: optional string

Billing city.

<a href="#">Link to this property</a>

country: optional string

Billing country.

<a href="#">Link to this property</a>

default: optional boolean

Whether this is the default payment method.

<a href="#">Link to this property</a>

device\_data: optional string

Device data for fraud prevention.

<a href="#">Link to this property</a>

expiration\_date: optional string

Card expiration date.

<a href="#">Link to this property</a>

first\_name: optional string

Billing first name.

<a href="#">Link to this property</a>

last\_four: optional string

Last four digits of the card number.

<a href="#">Link to this property</a>

last\_name: optional string

Billing last name.

<a href="#">Link to this property</a>

nick\_name: optional string

A nickname for the payment method.

<a href="#">Link to this property</a>

payment\_account\_email: optional string

Email associated with the payment account.

<a href="#">Link to this property</a>

payment\_email: optional string

Payment email address.

<a href="#">Link to this property</a>

payment\_gateway: optional string

The payment gateway used.

<a href="#">Link to this property</a>

payment\_nonce: optional string

Payment nonce for tokenized payments.

<a href="#">Link to this property</a>

state: optional string

Billing state.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "CREDIT\_CARD"or "PAYPAL"or "CASHAPP"or 3 more

The payment method type.

</summary>

One of the following:

"CREDIT\_CARD"

<a href="#">Link to this property</a>

"PAYPAL"

<a href="#">Link to this property</a>

"CASHAPP"

<a href="#">Link to this property</a>

"SEPA\_DEBIT"

<a href="#">Link to this property</a>

"LINK"

<a href="#">Link to this property</a>

"ACH\_DIRECT\_DEBIT"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

zipcode: optional string

Billing zip code.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.payment_methods%20%3E%20(model)%20payment_method_get_response%20%3E%20(schema)>)

<details>

<summary>

PaymentMethodUpdateResponse object {id, address, address2, 22 more }

</summary>

id: optional string

Payment method identifier.

<a href="#">Link to this property</a>

address: optional string

Billing address line 1.

<a href="#">Link to this property</a>

address2: optional string

Billing address line 2.

<a href="#">Link to this property</a>

bank\_account\_type: optional string

Bank account type.

<a href="#">Link to this property</a>

bank\_code: optional string

Bank code.

<a href="#">Link to this property</a>

bank\_country: optional string

Bank country.

<a href="#">Link to this property</a>

bank\_name: optional string

Bank name for bank-based payment methods.

<a href="#">Link to this property</a>

bank\_routing\_number: optional string

Bank routing number.

<a href="#">Link to this property</a>

cashapp\_cash\_tag: optional string

Cash App cash tag.

<a href="#">Link to this property</a>

city: optional string

Billing city.

<a href="#">Link to this property</a>

country: optional string

Billing country.

<a href="#">Link to this property</a>

default: optional boolean

Whether this is the default payment method.

<a href="#">Link to this property</a>

device\_data: optional string

Device data for fraud prevention.

<a href="#">Link to this property</a>

expiration\_date: optional string

Card expiration date.

<a href="#">Link to this property</a>

first\_name: optional string

Billing first name.

<a href="#">Link to this property</a>

last\_four: optional string

Last four digits of the card number.

<a href="#">Link to this property</a>

last\_name: optional string

Billing last name.

<a href="#">Link to this property</a>

nick\_name: optional string

A nickname for the payment method.

<a href="#">Link to this property</a>

payment\_account\_email: optional string

Email associated with the payment account.

<a href="#">Link to this property</a>

payment\_email: optional string

Payment email address.

<a href="#">Link to this property</a>

payment\_gateway: optional string

The payment gateway used.

<a href="#">Link to this property</a>

payment\_nonce: optional string

Payment nonce for tokenized payments.

<a href="#">Link to this property</a>

state: optional string

Billing state.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "CREDIT\_CARD"or "PAYPAL"or "CASHAPP"or 3 more

The payment method type.

</summary>

One of the following:

"CREDIT\_CARD"

<a href="#">Link to this property</a>

"PAYPAL"

<a href="#">Link to this property</a>

"CASHAPP"

<a href="#">Link to this property</a>

"SEPA\_DEBIT"

<a href="#">Link to this property</a>

"LINK"

<a href="#">Link to this property</a>

"ACH\_DIRECT\_DEBIT"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

zipcode: optional string

Billing zip code.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.payment_methods%20%3E%20(model)%20payment_method_update_response%20%3E%20(schema)>)

<details>

<summary>

PaymentMethodDeleteResponse = unknownor string

</summary>

One of the following:

unknown

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.payment_methods%20%3E%20(model)%20payment_method_delete_response%20%3E%20(schema)>)

<details>

<summary>

PaymentMethodSetAsDefaultResponse = unknownor string

</summary>

One of the following:

unknown

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.payment_methods%20%3E%20(model)%20payment_method_set_as_default_response%20%3E%20(schema)>)

#### AccountsPay Invoice

##### [Pay Invoice](https://developers.cloudflare.com/api/resources/accounts/subresources/pay_invoice/methods/create)

POST/accounts/{account\_id}/pay-invoice

##### ModelsExpand Collapse

<details>

<summary>

PayInvoiceCreateResponse object {client\_secret }

</summary>

client\_secret: optional string

The Stripe client secret for frontend payment confirmation.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.pay_invoice%20%3E%20(model)%20pay_invoice_create_response%20%3E%20(schema)>)

#### AccountsPay Bad Debt

##### [Pay Bad Debt](https://developers.cloudflare.com/api/resources/accounts/subresources/pay_bad_debt/methods/create)

POST/accounts/{account\_id}/pay-bad-debt

##### ModelsExpand Collapse

<details>

<summary>

PayBadDebtCreateResponse object {client\_secret }

</summary>

client\_secret: optional string

The Stripe client secret for frontend payment confirmation.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.pay_bad_debt%20%3E%20(model)%20pay_bad_debt_create_response%20%3E%20(schema)>)

#### AccountsReceipts

##### [Get Receipt PDF](https://developers.cloudflare.com/api/resources/accounts/subresources/receipts/methods/pdf)

GET/accounts/{account\_id}/receipts/{receipt\_id}/pdf

#### AccountsInvoices

##### [Toggle PDF Invoices](https://developers.cloudflare.com/api/resources/accounts/subresources/invoices/methods/edit)

PATCH/accounts/{account\_id}/invoices

##### ModelsExpand Collapse

<details>

<summary>

InvoiceEditResponse = unknownor string

</summary>

One of the following:

unknown

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.invoices%20%3E%20(model)%20invoice_edit_response%20%3E%20(schema)>)

#### AccountsClient Secret

##### [Create Setup Intent](https://developers.cloudflare.com/api/resources/accounts/subresources/client_secret/methods/create)

POST/accounts/{account\_id}/client-secret

##### ModelsExpand Collapse

<details>

<summary>

ClientSecretCreateResponse object {client\_secret }

</summary>

client\_secret: optional string

The Stripe client secret for frontend payment confirmation.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.client_secret%20%3E%20(model)%20client_secret_create_response%20%3E%20(schema)>)