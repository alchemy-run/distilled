---
title: List SCIM User resources
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Identity Providers](https://developers.cloudflare.com/api/resources/zero_trust/subresources/identity_providers)

[SCIM](https://developers.cloudflare.com/api/resources/zero_trust/subresources/identity_providers/subresources/scim)

[Users](https://developers.cloudflare.com/api/resources/zero_trust/subresources/identity_providers/subresources/scim/subresources/users)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List SCIM User resources

GET/accounts/{account\_id}/access/identity\_providers/{identity\_provider\_id}/scim/users

Lists SCIM User resources synced to Cloudflare via the System for Cross-domain Identity Management (SCIM).

##### Security

<details>

<summary>API Token</summary>



The preferred authorization scheme for interacting with the Cloudflare API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/create-token/">Create a token</a>.

**Example:**<code>Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY</code>

</details>

<details>

<summary>API Email + API Key</summary>



The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**<code>X-Auth-Email: user@example.com</code>

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**<code>X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194</code>

</details>

##### Accepted Permissions (at least one required)

`Access: Organizations, Identity Providers, and Groups Write``Access: Organizations, Identity Providers, and Groups Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20zero_trust.identity_providers.scim.users%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

identity\_provider\_id: string

UUID.

maxLength36

[Link to this property](#)%20zero_trust.identity_providers.scim.users%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20identity_provider_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

cf\_resource\_id: optional array of string

The unique Cloudflare-generated Id of the SCIM User resource; also known as the “Id”. Pass once for a single lookup (`?cf_resource_id=A`) or repeat the parameter (`?cf_resource_id=A&cf_resource_id=B`) to look up multiple users in one request, up to 50 values. Mutually exclusive with `idp_resource_id`, `username`, `email`, `name`, `search_contains`, and `search_starts_with`.

[Link to this property](#)%20zero_trust.identity_providers.scim.users%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20cf_resource_id%20%3E%20(schema)>)

email: optional string

The email address of the SCIM User resource.

[Link to this property](#)%20zero_trust.identity_providers.scim.users%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20email%20%3E%20(schema)>)

idp\_resource\_id: optional array of string

The IdP-generated Id of the SCIM User resource; also known as the “external Id”. Pass once for a single lookup (`?idp_resource_id=A`) or repeat the parameter (`?idp_resource_id=A&idp_resource_id=B`) to look up multiple users in one request, up to 50 values. Mutually exclusive with `cf_resource_id`, `username`, `email`, `name`, `search_contains`, and `search_starts_with`.

[Link to this property](#)%20zero_trust.identity_providers.scim.users%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20idp_resource_id%20%3E%20(schema)>)

name: optional string

The name of the SCIM User resource.

[Link to this property](#)%20zero_trust.identity_providers.scim.users%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

page: optional number

Page number of results.

[Link to this property](#)%20zero_trust.identity_providers.scim.users%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Number of results per page.

maximum100

[Link to this property](#)%20zero_trust.identity_providers.scim.users%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

username: optional string

The username of the SCIM User resource.

[Link to this property](#)%20zero_trust.identity_providers.scim.users%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20username%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.identity_providers.scim.users%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.identity_providers.scim.users%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.identity_providers.scim.users%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.access.users%20%3E%20(model)%20access_user%20%3E%20(schema)">AccessUser</a> { id, active, displayName, 4 more }

</summary>

id: optional string

The unique Cloudflare-generated Id of the SCIM resource.

<a href="#">Link to this property</a>

active: optional boolean

Determines the status of the SCIM User resource.

<a href="#">Link to this property</a>

displayName: optional string

The name of the SCIM User resource.

<a href="#">Link to this property</a>

<details>

<summary>

emails: optional array of object {primary, type, value }

</summary>

primary: optional boolean

Indicates if the email address is the primary email belonging to the SCIM User resource.

<a href="#">Link to this property</a>

type: optional string

Indicates the type of the email address.

<a href="#">Link to this property</a>

value: optional string

The email address of the SCIM User resource.

formatemail

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

externalId: optional string

The IdP-generated Id of the SCIM resource.

<a href="#">Link to this property</a>

<details>

<summary>

meta: optional object {created, lastModified }

The metadata of the SCIM resource.

</summary>

created: optional string

The timestamp of when the SCIM resource was created.

formatdate-time

<a href="#">Link to this property</a>

lastModified: optional string

The timestamp of when the SCIM resource was last modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

schemas: optional array of string

The list of URIs which indicate the attributes contained within a SCIM resource.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.identity_providers.scim.users%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, 2 more }

</summary>

count: optional number

Total number of results for the requested service.

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page of results.

<a href="#">Link to this property</a>

total\_count: optional number

Total results available without any search parameters.

<a href="#">Link to this property</a>

total\_pages: optional number

The number of total pages in the entire result set.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.identity_providers.scim.users%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List SCIM User resources

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/identity_providers/$IDENTITY_PROVIDER_ID/scim/users \
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
      "id": "bd97ef8d-7986-43e3-9ee0-c25dda33e4b0",
      "active": true,
      "displayName": "John Smith",
      "emails": [
        {
          "primary": true,
          "type": "work",
          "value": "john.smith@example.com"
        }
      ],
      "externalId": "john_smith",
      "meta": {
        "created": "2025-01-01T00:00:00Z",
        "lastModified": "2025-01-02T00:00:00Z"
      },
      "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:User"
      ]
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
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
      "id": "bd97ef8d-7986-43e3-9ee0-c25dda33e4b0",
      "active": true,
      "displayName": "John Smith",
      "emails": [
        {
          "primary": true,
          "type": "work",
          "value": "john.smith@example.com"
        }
      ],
      "externalId": "john_smith",
      "meta": {
        "created": "2025-01-01T00:00:00Z",
        "lastModified": "2025-01-02T00:00:00Z"
      },
      "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:User"
      ]
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```