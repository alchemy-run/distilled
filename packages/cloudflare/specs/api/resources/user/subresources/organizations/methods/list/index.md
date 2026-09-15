---
title: List Organizations
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[User](https://developers.cloudflare.com/api/resources/user)

[Organizations](https://developers.cloudflare.com/api/resources/user/subresources/organizations)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Organizations

Deprecated

GET/user/organizations

Lists organizations the user is associated with.

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

direction: optional "asc"or "desc"

Direction to order organizations.

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.organizations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

<details>

<summary>

match: optional "any"or "all"

Whether to match all search requirements or at least one (any).

</summary>

One of the following:

"any"

<a href="#">Link to this property</a>

"all"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.organizations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20match%20%3E%20(schema)>)

name: optional string

Organization name.

maxLength100

[Link to this property](#)%20user.organizations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

<details>

<summary>

order: optional "id"or "name"or "status"

Field to order organizations by.

</summary>

One of the following:

"id"

<a href="#">Link to this property</a>

"name"

<a href="#">Link to this property</a>

"status"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.organizations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order%20%3E%20(schema)>)

page: optional number

Page number of paginated results.

minimum1

[Link to this property](#)%20user.organizations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Number of organizations per page.

maximum50

minimum5

[Link to this property](#)%20user.organizations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

<details>

<summary>

status: optional "member"or "invited"

Whether the user is a member of the organization or has an inivitation pending.

</summary>

One of the following:

"member"

<a href="#">Link to this property</a>

"invited"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.organizations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20status%20%3E%20(schema)>)

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

[Link to this property](#)%20user.organizations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20user.organizations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20user.organizations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of <a href="https://developers.cloudflare.com/api/resources/user#(resource)%20user.organizations%20%3E%20(model)%20organization%20%3E%20(schema)">Organization</a> { id, name, permissions, 2 more }

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

[Link to this property](#)%20user.organizations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

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

[Link to this property](#)%20user.organizations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List Organizations

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/user/organizations \
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
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```