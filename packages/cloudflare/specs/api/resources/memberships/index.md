---
title: Memberships
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Memberships

##### [List Memberships](https://developers.cloudflare.com/api/resources/memberships/methods/list)

GET/memberships

##### [Membership Details](https://developers.cloudflare.com/api/resources/memberships/methods/get)

GET/memberships/{membership\_id}

##### [Update Membership](https://developers.cloudflare.com/api/resources/memberships/methods/update)

PUT/memberships/{membership\_id}

##### [Delete Membership](https://developers.cloudflare.com/api/resources/memberships/methods/delete)

DELETE/memberships/{membership\_id}

##### ModelsExpand Collapse

<details>

<summary>

Membership object {id, account, api\_access\_enabled, 3 more }

</summary>

id: optional string

Membership identifier tag.

maxLength32

<a href="#">Link to this property</a>

account: optional <a href="https://developers.cloudflare.com/api/resources/accounts#(resource)%20accounts%20%3E%20(model)%20account%20%3E%20(schema)">Account</a> { id, name, type, 3 more }

<a href="#">Link to this property</a>

api\_access\_enabled: optional boolean

Enterprise only. Indicates whether or not API access is enabled specifically for this user on a given account.

<a href="#">Link to this property</a>

<details>

<summary>

permissions: optional object {analytics, billing, cache\_purge, 9 more }

All access permissions for the user at the account.

</summary>

analytics: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

billing: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

cache\_purge: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

dns: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

dns\_records: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

lb: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

logs: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

organization: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

ssl: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

waf: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

zone\_settings: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

zones: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

roles: optional array of string

List of role names the membership has for this account.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "accepted"or "pending"or "rejected"

Status of this membership.

</summary>

One of the following:

"accepted"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"rejected"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20memberships%20%3E%20(model)%20membership%20%3E%20(schema)>)

<details>

<summary>

MembershipGetResponse object {id, account, api\_access\_enabled, 4 more }

</summary>

id: optional string

Membership identifier tag.

maxLength32

<a href="#">Link to this property</a>

account: optional <a href="https://developers.cloudflare.com/api/resources/accounts#(resource)%20accounts%20%3E%20(model)%20account%20%3E%20(schema)">Account</a> { id, name, type, 3 more }

<a href="#">Link to this property</a>

api\_access\_enabled: optional boolean

Enterprise only. Indicates whether or not API access is enabled specifically for this user on a given account.

<a href="#">Link to this property</a>

<details>

<summary>

permissions: optional object {analytics, billing, cache\_purge, 9 more }

All access permissions for the user at the account.

</summary>

analytics: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

billing: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

cache\_purge: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

dns: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

dns\_records: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

lb: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

logs: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

organization: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

ssl: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

waf: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

zone\_settings: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

zones: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

policies: optional array of object {id, access, permission\_groups, resource\_groups }

Access policy for the membership

</summary>

id: optional string

Policy identifier.

<a href="#">Link to this property</a>

<details>

<summary>

access: optional "allow"or "deny"

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

permission\_groups: optional array of object {id, meta, name }

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

resource\_groups: optional array of object {id, scope, meta, name }

A list of resource groups that the policy applies to.

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

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

roles: optional array of string

List of role names the membership has for this account.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "accepted"or "pending"or "rejected"

Status of this membership.

</summary>

One of the following:

"accepted"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"rejected"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20memberships%20%3E%20(model)%20membership_get_response%20%3E%20(schema)>)

<details>

<summary>

MembershipUpdateResponse object {id, account, api\_access\_enabled, 4 more }

</summary>

id: optional string

Membership identifier tag.

maxLength32

<a href="#">Link to this property</a>

account: optional <a href="https://developers.cloudflare.com/api/resources/accounts#(resource)%20accounts%20%3E%20(model)%20account%20%3E%20(schema)">Account</a> { id, name, type, 3 more }

<a href="#">Link to this property</a>

api\_access\_enabled: optional boolean

Enterprise only. Indicates whether or not API access is enabled specifically for this user on a given account.

<a href="#">Link to this property</a>

<details>

<summary>

permissions: optional object {analytics, billing, cache\_purge, 9 more }

All access permissions for the user at the account.

</summary>

analytics: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

billing: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

cache\_purge: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

dns: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

dns\_records: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

lb: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

logs: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

organization: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

ssl: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

waf: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

zone\_settings: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

zones: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

policies: optional array of object {id, access, permission\_groups, resource\_groups }

Access policy for the membership

</summary>

id: optional string

Policy identifier.

<a href="#">Link to this property</a>

<details>

<summary>

access: optional "allow"or "deny"

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

permission\_groups: optional array of object {id, meta, name }

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

resource\_groups: optional array of object {id, scope, meta, name }

A list of resource groups that the policy applies to.

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

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

roles: optional array of string

List of role names the membership has for this account.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "accepted"or "pending"or "rejected"

Status of this membership.

</summary>

One of the following:

"accepted"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"rejected"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20memberships%20%3E%20(model)%20membership_update_response%20%3E%20(schema)>)

<details>

<summary>

MembershipDeleteResponse object {id }

</summary>

id: optional string

Membership identifier tag.

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20memberships%20%3E%20(model)%20membership_delete_response%20%3E%20(schema)>)