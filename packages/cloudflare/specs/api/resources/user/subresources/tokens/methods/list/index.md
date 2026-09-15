---
title: List Tokens
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[User](https://developers.cloudflare.com/api/resources/user)

[Tokens](https://developers.cloudflare.com/api/resources/user/subresources/tokens)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Tokens

GET/user/tokens

List all access tokens you created. Results include active, disabled, and recently-expired tokens when include\_expired is set to true.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`API Tokens Write``API Tokens Read`

##### Q uery ParametersExpand Collapse

<details>

<summary>

direction: optional "asc"or "desc"

Direction to order results.

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.tokens%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

include\_expired: optional boolean

When true, includes recently-expired tokens in the response.

[Link to this property](#)%20user.tokens%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20include_expired%20%3E%20(schema)>)

page: optional number

Page number of paginated results.

minimum1

[Link to this property](#)%20user.tokens%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Maximum number of results per page.

maximum50

minimum5

[Link to this property](#)%20user.tokens%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

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

[Link to this property](#)%20user.tokens%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20user.tokens%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20user.tokens%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20token%20%3E%20(schema)">Token</a> { id, condition, expires\_on, 7 more }

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

</details>

[Link to this property](#)%20user.tokens%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

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

[Link to this property](#)%20user.tokens%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List Tokens

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/user/tokens \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
      "id": "ed17574386854bf78a67040be0a770b0",
      "condition": {
        "request_ip": {
          "in": [
            "123.123.123.0/24",
            "2606:4700::/32"
          ],
          "not_in": [
            "123.123.123.100/24",
            "2606:4700:4700::/48"
          ]
        }
      },
      "expires_on": "2020-01-01T00:00:00Z",
      "issued_on": "2018-07-01T05:20:00Z",
      "last_used_on": "2020-01-02T12:34:00Z",
      "modified_on": "2018-07-02T05:20:00Z",
      "name": "readonly token",
      "not_before": "2018-07-01T05:20:00Z",
      "policies": [
        {
          "id": "f267e341f3dd4697bd3b9f71dd96247f",
          "effect": "allow",
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
          "resources": {
            "foo": "string"
          }
        }
      ],
      "status": "active"
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
      "id": "ed17574386854bf78a67040be0a770b0",
      "condition": {
        "request_ip": {
          "in": [
            "123.123.123.0/24",
            "2606:4700::/32"
          ],
          "not_in": [
            "123.123.123.100/24",
            "2606:4700:4700::/48"
          ]
        }
      },
      "expires_on": "2020-01-01T00:00:00Z",
      "issued_on": "2018-07-01T05:20:00Z",
      "last_used_on": "2020-01-02T12:34:00Z",
      "modified_on": "2018-07-02T05:20:00Z",
      "name": "readonly token",
      "not_before": "2018-07-01T05:20:00Z",
      "policies": [
        {
          "id": "f267e341f3dd4697bd3b9f71dd96247f",
          "effect": "allow",
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
          "resources": {
            "foo": "string"
          }
        }
      ],
      "status": "active"
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