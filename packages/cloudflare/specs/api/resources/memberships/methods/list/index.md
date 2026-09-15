---
title: List Memberships
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Memberships](https://developers.cloudflare.com/api/resources/memberships)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Memberships

GET/memberships

List memberships of accounts the user can access.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`Memberships Write``Memberships Read`

##### Q uery ParametersExpand Collapse

<details>

<summary>

account: optional object {name }

</summary>

name: optional string

Account name

maxLength100

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20memberships%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account%20%3E%20(schema)>)

<details>

<summary>

direction: optional "asc"or "desc"

Direction to order memberships.

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20memberships%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

name: optional string

Account name

maxLength100

[Link to this property](#)%20memberships%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

<details>

<summary>

order: optional "id"or "account.name"or "status"

Field to order memberships by.

</summary>

One of the following:

"id"

<a href="#">Link to this property</a>

"account.name"

<a href="#">Link to this property</a>

"status"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20memberships%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order%20%3E%20(schema)>)

page: optional number

Page number of paginated results.

minimum1

[Link to this property](#)%20memberships%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Number of memberships per page.

maximum50

minimum5

[Link to this property](#)%20memberships%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

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

[Link to this property](#)%20memberships%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20status%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

IAMCollectionMembershipResponse object {errors, messages, success, 2 more }

</summary>

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: true

Whether the API call was successful.

<a href="#">Link to this property</a>

<details>

<summary>

result: optional array of <a href="https://developers.cloudflare.com/api/resources/memberships#(resource)%20memberships%20%3E%20(model)%20membership%20%3E%20(schema)">Membership</a> { id, account, api\_access\_enabled, 3 more }

</summary>

id: optional string

Membership identifier tag.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

account: optional <a href="https://developers.cloudflare.com/api/resources/accounts#(resource)%20accounts%20%3E%20(model)%20account%20%3E%20(schema)">Account</a> { id, name, type, 3 more }

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

<a href="#">Link to this property</a>

api\_access\_enabled: optional boolean

Enterprise only. Indicates whether or not API access is enabled specifically for this user on a given account.

<a href="#">Link to this property</a>

<details>

<summary>

permissions: optional object {analytics, billing, cache\_purge, 9 more }

All access permissions for the user at the account.

</summary>

<details>

<summary>

analytics: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

</summary>

read: optional boolean

<a href="#">Link to this property</a>

write: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

billing: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

</summary>

read: optional boolean

<a href="#">Link to this property</a>

write: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

cache\_purge: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

</summary>

read: optional boolean

<a href="#">Link to this property</a>

write: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

dns: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

</summary>

read: optional boolean

<a href="#">Link to this property</a>

write: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

dns\_records: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

</summary>

read: optional boolean

<a href="#">Link to this property</a>

write: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

lb: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

</summary>

read: optional boolean

<a href="#">Link to this property</a>

write: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logs: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

</summary>

read: optional boolean

<a href="#">Link to this property</a>

write: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

organization: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

</summary>

read: optional boolean

<a href="#">Link to this property</a>

write: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ssl: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

</summary>

read: optional boolean

<a href="#">Link to this property</a>

write: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

waf: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

</summary>

read: optional boolean

<a href="#">Link to this property</a>

write: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

zone\_settings: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

</summary>

read: optional boolean

<a href="#">Link to this property</a>

write: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

zones: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

</summary>

read: optional boolean

<a href="#">Link to this property</a>

write: optional boolean

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

<a href="#">Link to this property</a>

<details>

<summary>

result\_info: optional object {count, page, per\_page, total\_count }

</summary>

count: optional number

Total number of results for the requested service

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page of results

<a href="#">Link to this property</a>

total\_count: optional number

Total results available without any search parameters

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20memberships%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(variant)%200>)

<details>

<summary>

IAMCollectionMembershipResponseWithPolicies object {errors, messages, success, 2 more }

</summary>

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: true

Whether the API call was successful.

<a href="#">Link to this property</a>

<details>

<summary>

result: optional array of object {id, account, api\_access\_enabled, 4 more }

</summary>

id: optional string

Membership identifier tag.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

account: optional <a href="https://developers.cloudflare.com/api/resources/accounts#(resource)%20accounts%20%3E%20(model)%20account%20%3E%20(schema)">Account</a> { id, name, type, 3 more }

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

<a href="#">Link to this property</a>

api\_access\_enabled: optional boolean

Enterprise only. Indicates whether or not API access is enabled specifically for this user on a given account.

<a href="#">Link to this property</a>

<details>

<summary>

permissions: optional object {analytics, billing, cache\_purge, 9 more }

All access permissions for the user at the account.

</summary>

<details>

<summary>

analytics: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

</summary>

read: optional boolean

<a href="#">Link to this property</a>

write: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

billing: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

</summary>

read: optional boolean

<a href="#">Link to this property</a>

write: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

cache\_purge: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

</summary>

read: optional boolean

<a href="#">Link to this property</a>

write: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

dns: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

</summary>

read: optional boolean

<a href="#">Link to this property</a>

write: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

dns\_records: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

</summary>

read: optional boolean

<a href="#">Link to this property</a>

write: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

lb: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

</summary>

read: optional boolean

<a href="#">Link to this property</a>

write: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

logs: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

</summary>

read: optional boolean

<a href="#">Link to this property</a>

write: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

organization: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

</summary>

read: optional boolean

<a href="#">Link to this property</a>

write: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ssl: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

</summary>

read: optional boolean

<a href="#">Link to this property</a>

write: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

waf: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

</summary>

read: optional boolean

<a href="#">Link to this property</a>

write: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

zone\_settings: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

</summary>

read: optional boolean

<a href="#">Link to this property</a>

write: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

zones: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission_grant%20%3E%20(schema)">PermissionGrant</a> { read, write }

</summary>

read: optional boolean

<a href="#">Link to this property</a>

write: optional boolean

<a href="#">Link to this property</a>

</details>

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

<a href="#">Link to this property</a>

<details>

<summary>

result\_info: optional object {count, page, per\_page, total\_count }

</summary>

count: optional number

Total number of results for the requested service

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page of results

<a href="#">Link to this property</a>

total\_count: optional number

Total results available without any search parameters

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20memberships%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(variant)%201>)

### List Memberships

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/memberships \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": [
    {
      "id": "4536bcfad5faccb111b47003c79917fa",
      "account": {
        "id": "023e105f4ecef8ad9ca31a8372d0c353",
        "name": "Demo Account",
        "type": "standard",
        "created_on": "2014-03-01T12:21:02Z",
        "managed_by": {
          "parent_org_id": "4536bcfad5faccb111b47003c79917fa",
          "parent_org_name": "Demo Parent Organization"
        },
        "settings": {
          "abuse_contact_email": "abuse_contact_email",
          "enforce_twofactor": true
        }
      },
      "api_access_enabled": true,
      "permissions": {
        "analytics": {
          "read": true,
          "write": false
        },
        "billing": {
          "read": true,
          "write": false
        },
        "cache_purge": {
          "read": true,
          "write": false
        },
        "dns": {
          "read": true,
          "write": false
        },
        "dns_records": {
          "read": true,
          "write": false
        },
        "lb": {
          "read": true,
          "write": false
        },
        "logs": {
          "read": true,
          "write": false
        },
        "organization": {
          "read": true,
          "write": false
        },
        "ssl": {
          "read": true,
          "write": false
        },
        "waf": {
          "read": true,
          "write": false
        },
        "zone_settings": {
          "read": true,
          "write": false
        },
        "zones": {
          "read": true,
          "write": true
        }
      },
      "roles": [
        "Account Administrator"
      ],
      "status": "accepted"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": [
    {
      "id": "4536bcfad5faccb111b47003c79917fa",
      "account": {
        "id": "023e105f4ecef8ad9ca31a8372d0c353",
        "name": "Demo Account",
        "type": "standard",
        "created_on": "2014-03-01T12:21:02Z",
        "managed_by": {
          "parent_org_id": "4536bcfad5faccb111b47003c79917fa",
          "parent_org_name": "Demo Parent Organization"
        },
        "settings": {
          "abuse_contact_email": "abuse_contact_email",
          "enforce_twofactor": true
        }
      },
      "api_access_enabled": true,
      "permissions": {
        "analytics": {
          "read": true,
          "write": false
        },
        "billing": {
          "read": true,
          "write": false
        },
        "cache_purge": {
          "read": true,
          "write": false
        },
        "dns": {
          "read": true,
          "write": false
        },
        "dns_records": {
          "read": true,
          "write": false
        },
        "lb": {
          "read": true,
          "write": false
        },
        "logs": {
          "read": true,
          "write": false
        },
        "organization": {
          "read": true,
          "write": false
        },
        "ssl": {
          "read": true,
          "write": false
        },
        "waf": {
          "read": true,
          "write": false
        },
        "zone_settings": {
          "read": true,
          "write": false
        },
        "zones": {
          "read": true,
          "write": true
        }
      },
      "roles": [
        "Account Administrator"
      ],
      "status": "accepted"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```