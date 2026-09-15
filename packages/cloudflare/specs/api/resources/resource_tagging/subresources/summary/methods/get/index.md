---
title: List tag key summary
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Resource Tagging](https://developers.cloudflare.com/api/resources/resource_tagging)

[Summary](https://developers.cloudflare.com/api/resources/resource_tagging/subresources/summary)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List tag key summary

GET/accounts/{account\_id}/tags/summary

Lists all distinct tag keys and their distinct values across resources in an account.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

minLength32

[Link to this property](#)%20resource_tagging.summary%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

cursor: optional string

Cursor for pagination.

[Link to this property](#)%20resource_tagging.summary%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20cursor%20%3E%20(schema)>)

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

[Link to this property](#)%20resource_tagging.summary%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20resource_tagging.summary%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20resource_tagging.summary%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of object {key, values }

Contains an array of tag keys with their distinct values.

</summary>

key: string

A tag key.

<a href="#">Link to this property</a>

values: array of string

All distinct values for this tag key.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20resource_tagging.summary%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: optional object {count, cursor }

</summary>

count: optional number

Indicates the number of results returned in the current page.

<a href="#">Link to this property</a>

cursor: optional string

Provides a cursor for the next page of results. Include this value in the next request to continue pagination.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20resource_tagging.summary%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List tag key summary

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags/summary \
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
      "key": "environment",
      "values": [
        "production",
        "staging"
      ]
    },
    {
      "key": "team",
      "values": [
        "engineering",
        "platform"
      ]
    }
  ],
  "result_info": {
    "count": 20,
    "cursor": "eyJhY2NvdW50X2lkIjoxMjM0NTY3ODkwfQ"
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
      "key": "environment",
      "values": [
        "production",
        "staging"
      ]
    },
    {
      "key": "team",
      "values": [
        "engineering",
        "platform"
      ]
    }
  ],
  "result_info": {
    "count": 20,
    "cursor": "eyJhY2NvdW50X2lkIjoxMjM0NTY3ODkwfQ"
  }
}
```