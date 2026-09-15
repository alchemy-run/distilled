---
title: Replace operations attached to a user-defined label
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[API Gateway](https://developers.cloudflare.com/api/resources/api_gateway)

[Labels](https://developers.cloudflare.com/api/resources/api_gateway/subresources/labels)

[User](https://developers.cloudflare.com/api/resources/api_gateway/subresources/labels/subresources/user)

[Resources](https://developers.cloudflare.com/api/resources/api_gateway/subresources/labels/subresources/user/subresources/resources)

[Operation](https://developers.cloudflare.com/api/resources/api_gateway/subresources/labels/subresources/user/subresources/resources/subresources/operation)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Replace operations attached to a user-defined label

PUT/zones/{zone\_id}/api\_gateway/labels/user/{name}/resources/operation

Replaces the complete set of web and API operations attached to the user-defined label.

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

`Account API Gateway``Domain API Gateway`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20api_gateway.labels.user.resources.operation%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

name: string

The name of the label

[Link to this property](#)%20api_gateway.labels.user.resources.operation%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

selector: object {include }

Operation IDs selector

</summary>

<details>

<summary>

include: object {operation\_ids }

</summary>

operation\_ids: array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.labels.user.resources.operation%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20selector%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: <a href="https://developers.cloudflare.com/api/resources/api_gateway#(resource)%20api_gateway.user_schemas%20%3E%20(model)%20message%20%3E%20(schema)">Message</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20api_gateway.labels.user.resources.operation%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: <a href="https://developers.cloudflare.com/api/resources/api_gateway#(resource)%20api_gateway.user_schemas%20%3E%20(model)%20message%20%3E%20(schema)">Message</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20api_gateway.labels.user.resources.operation%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {created\_at, description, last\_updated, 4 more }

</summary>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

description: string

The description of the label

<a href="#">Link to this property</a>

last\_updated: string

formatdate-time

<a href="#">Link to this property</a>

metadata: unknown

Metadata for the label

<a href="#">Link to this property</a>

name: string

The name of the label

<a href="#">Link to this property</a>

<details>

<summary>

source: "user"or "managed"

- <code>user</code> - label is owned by the user
- <code>managed</code> - label is owned by cloudflare

</summary>

One of the following:

"user"

<a href="#">Link to this property</a>

"managed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

mapped\_resources: optional unknown

Provides counts of what resources are linked to this label

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20api_gateway.labels.user.resources.operation%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20api_gateway.labels.user.resources.operation%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Replace operations attached to a user-defined label

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/labels/user/$NAME/resources/operation \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "selector": {
            "include": {
              "operation_ids": [
                "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
              ]
            }
          }
        }'
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
  "result": {
    "created_at": "2014-01-01T05:20:00.12345Z",
    "description": "All endpoints that deal with logins",
    "last_updated": "2014-01-01T05:20:00.12345Z",
    "metadata": {
      "foo": "bar"
    },
    "name": "login",
    "source": "user",
    "mapped_resources": {
      "operations": 29
    }
  },
  "success": true
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
  "result": {
    "created_at": "2014-01-01T05:20:00.12345Z",
    "description": "All endpoints that deal with logins",
    "last_updated": "2014-01-01T05:20:00.12345Z",
    "metadata": {
      "foo": "bar"
    },
    "name": "login",
    "source": "user",
    "mapped_resources": {
      "operations": 29
    }
  },
  "success": true
}
```