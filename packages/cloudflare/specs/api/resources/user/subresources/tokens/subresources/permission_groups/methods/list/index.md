---
title: List Token Permission Groups
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[User](https://developers.cloudflare.com/api/resources/user)

[Tokens](https://developers.cloudflare.com/api/resources/user/subresources/tokens)

[Permission Groups](https://developers.cloudflare.com/api/resources/user/subresources/tokens/subresources/permission_groups)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Token Permission Groups

GET/user/tokens/permission\_groups

Find all available permission groups for API Tokens.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`API Tokens Write``API Tokens Read`

##### Q uery ParametersExpand Collapse

name: optional string

Filter by the name of the permission group. The value must be URL-encoded.

[Link to this property](#)%20user.tokens.permission_groups%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

scope: optional string

Filter by the scope of the permission group. The value must be URL-encoded.

[Link to this property](#)%20user.tokens.permission_groups%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20scope%20%3E%20(schema)>)

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

[Link to this property](#)%20user.tokens.permission_groups%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20user.tokens.permission_groups%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20user.tokens.permission_groups%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of object {id, category, name, scopes }

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

[Link to this property](#)%20user.tokens.permission_groups%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

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

[Link to this property](#)%20user.tokens.permission_groups%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List Token Permission Groups

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/user/tokens/permission_groups \
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
      "id": "7cf72faf220841aabcfdfab81c43c4f6",
      "category": "account_and_billing",
      "name": "Billing Read",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "9d24387c6e8544e2bc4024a03991339f",
      "category": "network_services",
      "name": "Load Balancing: Monitors and Pools Read",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "d2a1802cc9a34e30852f8b33869b2f3c",
      "category": "network_services",
      "name": "Load Balancing: Monitors and Pools Write",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "8b47d2786a534c08a1f94ee8f9f599ef",
      "category": "developer_platform",
      "name": "Workers KV Storage Read",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "f7f0eda5697f475c90846e879bab8666",
      "category": "developer_platform",
      "name": "Workers KV Storage Write",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "1a71c399035b4950a1bd1466bbe4f420",
      "category": "developer_platform",
      "name": "Workers Scripts Read",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "e086da7e2179491d91ee5f35b3ca210a",
      "category": "developer_platform",
      "name": "Workers Scripts Write",
      "scopes": [
        "com.cloudflare.api.account"
      ]
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
      "id": "7cf72faf220841aabcfdfab81c43c4f6",
      "category": "account_and_billing",
      "name": "Billing Read",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "9d24387c6e8544e2bc4024a03991339f",
      "category": "network_services",
      "name": "Load Balancing: Monitors and Pools Read",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "d2a1802cc9a34e30852f8b33869b2f3c",
      "category": "network_services",
      "name": "Load Balancing: Monitors and Pools Write",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "8b47d2786a534c08a1f94ee8f9f599ef",
      "category": "developer_platform",
      "name": "Workers KV Storage Read",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "f7f0eda5697f475c90846e879bab8666",
      "category": "developer_platform",
      "name": "Workers KV Storage Write",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "1a71c399035b4950a1bd1466bbe4f420",
      "category": "developer_platform",
      "name": "Workers Scripts Read",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "e086da7e2179491d91ee5f35b3ca210a",
      "category": "developer_platform",
      "name": "Workers Scripts Write",
      "scopes": [
        "com.cloudflare.api.account"
      ]
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