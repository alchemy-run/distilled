---
title: User Details
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[User](https://developers.cloudflare.com/api/resources/user)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# User Details

GET/user

Retrieves detailed information about the currently authenticated user, including email, name, and account memberships.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`User Details Write``User Details Read`

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

[Link to this property](#)%20user%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20user%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20user%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, email, betas, 12 more }

</summary>

id: string

Identifier of the user.

<a href="#">Link to this property</a>

email: string

Current email address of the user.

formatemail

<a href="#">Link to this property</a>

betas: optional array of string

Lists the betas that the user is participating in.

<a href="#">Link to this property</a>

country: optional string

The country in which the user lives.

maxLength30

<a href="#">Link to this property</a>

first\_name: optional string

User’s first name

maxLength60

<a href="#">Link to this property</a>

has\_business\_zones: optional boolean

Indicates whether user has any business zones

<a href="#">Link to this property</a>

has\_enterprise\_zones: optional boolean

Indicates whether user has any enterprise zones

<a href="#">Link to this property</a>

has\_pro\_zones: optional boolean

Indicates whether user has any pro zones

<a href="#">Link to this property</a>

last\_name: optional string

User’s last name

maxLength60

<a href="#">Link to this property</a>

<details>

<summary>

organizations: optional array of <a href="https://developers.cloudflare.com/api/resources/user#(resource)%20user.organizations%20%3E%20(model)%20organization%20%3E%20(schema)">Organization</a> { id, name, permissions, 2 more }

</summary>

id: optional string

Identifier

maxLength32

minLength32

<a href="#">Link to this property</a>

name: optional string

Organization name.

maxLength100

<a href="#">Link to this property</a>

permissions: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission%20%3E%20(schema)">Permission</a>

Access permissions for this User.

<a href="#">Link to this property</a>

roles: optional array of string

List of roles that a user has within an organization.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional <a href="https://developers.cloudflare.com/api/resources/accounts#(resource)%20accounts.members%20%3E%20(model)%20status%20%3E%20(schema)">Status</a>

Whether the user is a member of the organization or has an invitation pending.

</summary>

One of the following:

"member"

<a href="#">Link to this property</a>

"invited"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

suspended: optional boolean

Indicates whether user has been suspended

<a href="#">Link to this property</a>

telephone: optional string

User’s telephone number

maxLength20

<a href="#">Link to this property</a>

two\_factor\_authentication\_enabled: optional boolean

Indicates whether two-factor authentication is enabled for the user account. Does not apply to API authentication.

<a href="#">Link to this property</a>

two\_factor\_authentication\_locked: optional boolean

Indicates whether two-factor authentication is required by one of the accounts that the user is a member of.

<a href="#">Link to this property</a>

zipcode: optional string

The zipcode or postal code where the user lives.

maxLength20

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### User Details

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/user \
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
  "result": {
    "id": "6d7f2f5f5b1d4a0e9081fdc98d432fd1",
    "email": "alice@example.com",
    "betas": [
      "zone_level_access_beta"
    ],
    "country": "US",
    "first_name": "John",
    "has_business_zones": true,
    "has_enterprise_zones": true,
    "has_pro_zones": true,
    "last_name": "Appleseed",
    "organizations": [
      {
        "id": "023e105f4ecef8ad9ca31a8372d0c353",
        "name": "Cloudflare, Inc.",
        "permissions": [
          "#zones:read"
        ],
        "roles": [
          "All Privileges - Super Administrator"
        ],
        "status": "member"
      }
    ],
    "suspended": true,
    "telephone": "+1 123-123-1234",
    "two_factor_authentication_enabled": true,
    "two_factor_authentication_locked": true,
    "zipcode": "12345"
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
    "id": "6d7f2f5f5b1d4a0e9081fdc98d432fd1",
    "email": "alice@example.com",
    "betas": [
      "zone_level_access_beta"
    ],
    "country": "US",
    "first_name": "John",
    "has_business_zones": true,
    "has_enterprise_zones": true,
    "has_pro_zones": true,
    "last_name": "Appleseed",
    "organizations": [
      {
        "id": "023e105f4ecef8ad9ca31a8372d0c353",
        "name": "Cloudflare, Inc.",
        "permissions": [
          "#zones:read"
        ],
        "roles": [
          "All Privileges - Super Administrator"
        ],
        "status": "member"
      }
    ],
    "suspended": true,
    "telephone": "+1 123-123-1234",
    "two_factor_authentication_enabled": true,
    "two_factor_authentication_locked": true,
    "zipcode": "12345"
  }
}
```