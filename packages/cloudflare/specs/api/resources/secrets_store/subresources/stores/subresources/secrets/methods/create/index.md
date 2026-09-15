---
title: Create a secret
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Secrets Store](https://developers.cloudflare.com/api/resources/secrets_store)

[Stores](https://developers.cloudflare.com/api/resources/secrets_store/subresources/stores)

[Secrets](https://developers.cloudflare.com/api/resources/secrets_store/subresources/stores/subresources/secrets)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create a secret

POST/accounts/{account\_id}/secrets\_store/stores/{store\_id}/secrets

Creates a secret in the account.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`Secrets Store Write`

##### P ath ParametersExpand Collapse

account\_id: string

maxLength32

[Link to this property](#)%20secrets_store.stores.secrets%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

store\_id: string

maxLength32

[Link to this property](#)%20secrets_store.stores.secrets%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20store_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

body: array of object {name, scopes, value, comment }

</summary>

name: string

The name of the secret.

<a href="#">Link to this property</a>

<details>

<summary>

scopes: array of "workers"or "ai\_gateway"or "dex"or 3 more

The list of services that can use this secret.

</summary>

One of the following:

"workers"

<a href="#">Link to this property</a>

"ai\_gateway"

<a href="#">Link to this property</a>

"dex"

<a href="#">Link to this property</a>

"access"

<a href="#">Link to this property</a>

"containers"

<a href="#">Link to this property</a>

"websearch"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: string

The value of the secret. Maximum 64 KiB (65,536 bytes). Note that this is ‘write only’ - the API never returns this value; it exists only to create or modify secrets.

maxLength65536

<a href="#">Link to this property</a>

comment: optional string

Freeform text describing the secret.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20secrets_store.stores.secrets%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20body%20%3E%20(schema)>)

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

[Link to this property](#)%20secrets_store.stores.secrets%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20secrets_store.stores.secrets%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20secrets_store.stores.secrets%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of object {id, created, modified, 5 more }

</summary>

id: string

Secret identifier tag.

maxLength32

<a href="#">Link to this property</a>

created: string

When the secret was created.

formatdate-time

<a href="#">Link to this property</a>

modified: string

When the secret was modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

The name of the secret.

<a href="#">Link to this property</a>

<details>

<summary>

status: "pending"or "active"or "deleted"

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

store\_id: string

Store Identifier.

maxLength32

<a href="#">Link to this property</a>

comment: optional string

Freeform text describing the secret.

<a href="#">Link to this property</a>

<details>

<summary>

scopes: optional array of "workers"or "ai\_gateway"or "dex"or 3 more

The list of services that can use this secret.

</summary>

One of the following:

"workers"

<a href="#">Link to this property</a>

"ai\_gateway"

<a href="#">Link to this property</a>

"dex"

<a href="#">Link to this property</a>

"access"

<a href="#">Link to this property</a>

"containers"

<a href="#">Link to this property</a>

"websearch"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20secrets_store.stores.secrets%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

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

[Link to this property](#)%20secrets_store.stores.secrets%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Create a secret

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secrets_store/stores/$STORE_ID/secrets \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '[
          {
            "name": "MY_API_KEY",
            "scopes": [
              "workers",
              "ai_gateway",
              "dex",
              "access",
              "websearch"
            ],
            "value": "api-token-secret-123",
            "comment": "info about my secret"
          }
        ]'
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
      "id": "3fd85f74b32742f1bff64a85009dda07",
      "created": "2023-09-21T18:56:32.624632Z",
      "modified": "2023-09-21T18:56:32.624632Z",
      "name": "MY_API_KEY",
      "status": "pending",
      "store_id": "023e105f4ecef8ad9ca31a8372d0c353",
      "comment": "info about my secret",
      "scopes": [
        "workers",
        "ai_gateway",
        "dex",
        "access",
        "websearch"
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
      "id": "3fd85f74b32742f1bff64a85009dda07",
      "created": "2023-09-21T18:56:32.624632Z",
      "modified": "2023-09-21T18:56:32.624632Z",
      "name": "MY_API_KEY",
      "status": "pending",
      "store_id": "023e105f4ecef8ad9ca31a8372d0c353",
      "comment": "info about my secret",
      "scopes": [
        "workers",
        "ai_gateway",
        "dex",
        "access",
        "websearch"
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