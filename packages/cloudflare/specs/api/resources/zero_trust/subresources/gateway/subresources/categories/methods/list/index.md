---
title: List categories
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Gateway](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway)

[Categories](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/categories)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List categories

GET/accounts/{account\_id}/gateway/categories

List all categories.

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

`Zero Trust Read``Zero Trust Write`

##### P ath ParametersExpand Collapse

account\_id: string

Provide the identifier string.

maxLength32

[Link to this property](#)%20zero_trust.gateway.categories%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20zero_trust.gateway.categories%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20zero_trust.gateway.categories%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Indicate whether the API call was successful.

[Link to this property](#)%20zero_trust.gateway.categories%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.categories%20%3E%20(model)%20category%20%3E%20(schema)">Category</a> { id, beta, class, 3 more }

</summary>

id: optional number

Identify this category. Only one category per ID.

<a href="#">Link to this property</a>

beta: optional boolean

Indicate whether the category is in beta and subject to change.

<a href="#">Link to this property</a>

<details>

<summary>

class: optional "free"or "premium"or "blocked"or 2 more

Specify which account types can create policies for this category. <code>blocked</code> Blocks unconditionally for all accounts. <code>removalPending</code> Allows removal from policies but disables addition. <code>noBlock</code> Prevents blocking.

</summary>

One of the following:

"free"

<a href="#">Link to this property</a>

"premium"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

"removalPending"

<a href="#">Link to this property</a>

"noBlock"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: optional string

Provide a short summary of domains in the category.

<a href="#">Link to this property</a>

name: optional string

Specify the category name.

<a href="#">Link to this property</a>

<details>

<summary>

subcategories: optional array of object {id, beta, class, 2 more }

Provide all subcategories for this category.

</summary>

id: optional number

Identify this category. Only one category per ID.

<a href="#">Link to this property</a>

beta: optional boolean

Indicate whether the category is in beta and subject to change.

<a href="#">Link to this property</a>

<details>

<summary>

class: optional "free"or "premium"or "blocked"or 2 more

Specify which account types can create policies for this category. <code>blocked</code> Blocks unconditionally for all accounts. <code>removalPending</code> Allows removal from policies but disables addition. <code>noBlock</code> Prevents blocking.

</summary>

One of the following:

"free"

<a href="#">Link to this property</a>

"premium"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

"removalPending"

<a href="#">Link to this property</a>

"noBlock"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: optional string

Provide a short summary of domains in the category.

<a href="#">Link to this property</a>

name: optional string

Specify the category name.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.categories%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, total\_count }

</summary>

count: optional number

Indicate the total number of results for the requested service.

<a href="#">Link to this property</a>

page: optional number

Indicate the current page within a paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Indicate the number of results per page.

<a href="#">Link to this property</a>

total\_count: optional number

Indicate the total results available without any search parameters.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.categories%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List categories

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/categories \
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
      "id": 0,
      "beta": false,
      "class": "premium",
      "description": "Sites related to educational content that are not included in other categories such as Science, Technology or Educational institutions.",
      "name": "Education",
      "subcategories": [
        {
          "id": 0,
          "beta": false,
          "class": "premium",
          "description": "Sites related to educational content that are not included in other categories such as Science, Technology or Educational institutions.",
          "name": "Education"
        }
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
      "id": 0,
      "beta": false,
      "class": "premium",
      "description": "Sites related to educational content that are not included in other categories such as Science, Technology or Educational institutions.",
      "name": "Education",
      "subcategories": [
        {
          "id": 0,
          "beta": false,
          "class": "premium",
          "description": "Sites related to educational content that are not included in other categories such as Science, Technology or Educational institutions.",
          "name": "Education"
        }
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