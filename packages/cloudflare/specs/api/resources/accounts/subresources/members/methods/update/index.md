---
title: Update Member
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Accounts](https://developers.cloudflare.com/api/resources/accounts)

[Members](https://developers.cloudflare.com/api/resources/accounts/subresources/members)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update Member

PUT/accounts/{account\_id}/members/{member\_id}

Modify an account member.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`SCIM Provisioning``Account Settings Write`

##### P ath ParametersExpand Collapse

account\_id: string

Account identifier tag.

maxLength32

minLength32

[Link to this property](#)%20accounts.members%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20account_id%20%3E%20(schema)>)

member\_id: string

Membership identifier tag.

maxLength32

[Link to this property](#)%20accounts.members%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20member_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

body: object {id, roles, status, user } or object {policies }

</summary>

One of the following:

<details>

<summary>

IAMUpdateMemberWithRoles object {id, roles, status, user }

</summary>

id: optional string

Membership identifier tag.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

roles: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20role%20%3E%20(schema)">Role</a> { id, description, name, permissions }

Roles assigned to this member.

</summary>

id: string

Role identifier tag.

maxLength32

<a href="#">Link to this property</a>

description: string

Description of role’s permissions.

<a href="#">Link to this property</a>

name: string

Role name.

maxLength120

<a href="#">Link to this property</a>

<details>

<summary>

permissions: object {analytics, billing, cache\_purge, 9 more }

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

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "accepted"or "pending"

A member’s status in the account.

</summary>

One of the following:

"accepted"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

user: optional object {email, id, first\_name, 2 more }

Details of the user associated to the membership.

</summary>

email: string

The contact email address of the user.

maxLength90

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

minLength32

<a href="#">Link to this property</a>

first\_name: optional string

User’s first name

maxLength60

<a href="#">Link to this property</a>

last\_name: optional string

User’s last name

maxLength60

<a href="#">Link to this property</a>

two\_factor\_authentication\_enabled: optional boolean

Indicates whether two-factor authentication is enabled for the user account. Does not apply to API authentication.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

IAMUpdateMemberWithPolicies object {policies }

</summary>

<details>

<summary>

policies: array of object {id, access, permission\_groups, resource\_groups }

Array of policies associated with this member.

</summary>

id: string

Policy identifier.

<a href="#">Link to this property</a>

<details>

<summary>

access: "allow"or "deny"

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

permission\_groups: array of object {id }

A set of permission groups that are specified to the policy.

</summary>

id: string

Identifier of the group.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

resource\_groups: array of object {id }

A list of resource groups that the policy applies to.

</summary>

id: string

Identifier of the group.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.members%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20body%20%3E%20(schema)>)

##### ReturnsExpand Collapse

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

[Link to this property](#)%20accounts.members%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20accounts.members%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20accounts.members%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20member%20%3E%20(schema)">Member</a> { id, email, policies, 3 more }

</summary>

id: optional string

Membership identifier tag.

maxLength32

<a href="#">Link to this property</a>

email: optional string

The contact email address of the user.

maxLength90

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

<details>

<summary>

roles: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20role%20%3E%20(schema)">Role</a> { id, description, name, permissions }

Roles assigned to this Member.

</summary>

id: string

Role identifier tag.

maxLength32

<a href="#">Link to this property</a>

description: string

Description of role’s permissions.

<a href="#">Link to this property</a>

name: string

Role name.

maxLength120

<a href="#">Link to this property</a>

<details>

<summary>

permissions: object {analytics, billing, cache\_purge, 9 more }

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

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "accepted"or "pending"

A member’s status in the account.

</summary>

One of the following:

"accepted"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

user: optional object {email, id, first\_name, 2 more }

Details of the user associated to the membership.

</summary>

email: string

The contact email address of the user.

maxLength90

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

minLength32

<a href="#">Link to this property</a>

first\_name: optional string

User’s first name

maxLength60

<a href="#">Link to this property</a>

last\_name: optional string

User’s last name

maxLength60

<a href="#">Link to this property</a>

two\_factor\_authentication\_enabled: optional boolean

Indicates whether two-factor authentication is enabled for the user account. Does not apply to API authentication.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.members%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Update Member

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/members/$MEMBER_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{}'
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
  "result": {
    "id": "4536bcfad5faccb111b47003c79917fa",
    "email": "user@example.com",
    "policies": [
      {
        "id": "f267e341f3dd4697bd3b9f71dd96247f",
        "access": "allow",
        "permission_groups": [
          {
            "id": "c8fed203ed3043cba015a93ad1616f1f",
            "meta": {
              "key": "key",
              "value": "value"
            },
            "name": "Zone Read"
          },
          {
            "id": "82e64a83756745bbbb1c9c2701bf816b",
            "meta": {
              "key": "key",
              "value": "value"
            },
            "name": "Magic Network Monitoring"
          }
        ],
        "resource_groups": [
          {
            "id": "6d7f2f5f5b1d4a0e9081fdc98d432fd1",
            "scope": {
              "key": "com.cloudflare.api.account.eb78d65290b24279ba6f44721b3ea3c4",
              "objects": [
                {
                  "key": "com.cloudflare.api.account.zone.23f8d65290b24279ba6f44721b3eaad5"
                }
              ]
            },
            "meta": {
              "key": "key",
              "value": "value"
            },
            "name": "com.cloudflare.api.account.eb78d65290b24279ba6f44721b3ea3c4"
          }
        ]
      }
    ],
    "roles": [
      {
        "id": "3536bcfad5faccb999b47003c79917fb",
        "description": "Administrative access to the entire Account",
        "name": "Account Administrator",
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
        }
      }
    ],
    "status": "accepted",
    "user": {
      "email": "user@example.com",
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "first_name": "John",
      "last_name": "Appleseed",
      "two_factor_authentication_enabled": true
    }
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
  "result": {
    "id": "4536bcfad5faccb111b47003c79917fa",
    "email": "user@example.com",
    "policies": [
      {
        "id": "f267e341f3dd4697bd3b9f71dd96247f",
        "access": "allow",
        "permission_groups": [
          {
            "id": "c8fed203ed3043cba015a93ad1616f1f",
            "meta": {
              "key": "key",
              "value": "value"
            },
            "name": "Zone Read"
          },
          {
            "id": "82e64a83756745bbbb1c9c2701bf816b",
            "meta": {
              "key": "key",
              "value": "value"
            },
            "name": "Magic Network Monitoring"
          }
        ],
        "resource_groups": [
          {
            "id": "6d7f2f5f5b1d4a0e9081fdc98d432fd1",
            "scope": {
              "key": "com.cloudflare.api.account.eb78d65290b24279ba6f44721b3ea3c4",
              "objects": [
                {
                  "key": "com.cloudflare.api.account.zone.23f8d65290b24279ba6f44721b3eaad5"
                }
              ]
            },
            "meta": {
              "key": "key",
              "value": "value"
            },
            "name": "com.cloudflare.api.account.eb78d65290b24279ba6f44721b3ea3c4"
          }
        ]
      }
    ],
    "roles": [
      {
        "id": "3536bcfad5faccb999b47003c79917fb",
        "description": "Administrative access to the entire Account",
        "name": "Account Administrator",
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
        }
      }
    ],
    "status": "accepted",
    "user": {
      "email": "user@example.com",
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "first_name": "John",
      "last_name": "Appleseed",
      "two_factor_authentication_enabled": true
    }
  }
}
```