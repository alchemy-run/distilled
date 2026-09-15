---
title: List tag values
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Resource Tagging](https://developers.cloudflare.com/api/resources/resource_tagging)

[Values](https://developers.cloudflare.com/api/resources/resource_tagging/subresources/values)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List tag values

GET/accounts/{account\_id}/tags/values/{tag\_key}

Lists all distinct values for a given tag key, optionally filtered by resource type.

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

[Link to this property](#)%20resource_tagging.values%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

tag\_key: string

[Link to this property](#)%20resource_tagging.values%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20tag_key%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

cursor: optional string

Cursor for pagination.

[Link to this property](#)%20resource_tagging.values%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20cursor%20%3E%20(schema)>)

<details>

<summary>

type: optional "access\_application"or "access\_application\_policy"or "access\_group"or 38 more

Filter by resource type.

</summary>

One of the following:

"access\_application"

<a href="#">Link to this property</a>

"access\_application\_policy"

<a href="#">Link to this property</a>

"access\_group"

<a href="#">Link to this property</a>

"account"

<a href="#">Link to this property</a>

"account\_ruleset"

<a href="#">Link to this property</a>

"ai\_gateway"

<a href="#">Link to this property</a>

"alerting\_policy"

<a href="#">Link to this property</a>

"alerting\_webhook"

<a href="#">Link to this property</a>

"api\_gateway\_operation"

<a href="#">Link to this property</a>

"cloudflared\_tunnel"

<a href="#">Link to this property</a>

"custom\_certificate"

<a href="#">Link to this property</a>

"custom\_hostname"

<a href="#">Link to this property</a>

"cws\_deployment"

<a href="#">Link to this property</a>

"cws\_policy"

<a href="#">Link to this property</a>

"cws\_policy\_set"

<a href="#">Link to this property</a>

"cws\_workload"

<a href="#">Link to this property</a>

"d1\_database"

<a href="#">Link to this property</a>

"dns\_record"

<a href="#">Link to this property</a>

"durable\_object\_namespace"

<a href="#">Link to this property</a>

"gateway\_list"

<a href="#">Link to this property</a>

"gateway\_rule"

<a href="#">Link to this property</a>

"healthcheck"

<a href="#">Link to this property</a>

"image"

<a href="#">Link to this property</a>

"infrastructure\_target"

<a href="#">Link to this property</a>

"kv\_namespace"

<a href="#">Link to this property</a>

"load\_balancer"

<a href="#">Link to this property</a>

"load\_balancer\_monitor"

<a href="#">Link to this property</a>

"load\_balancer\_pool"

<a href="#">Link to this property</a>

"managed\_client\_certificate"

<a href="#">Link to this property</a>

"pages\_project"

<a href="#">Link to this property</a>

"queue"

<a href="#">Link to this property</a>

"r2\_bucket"

<a href="#">Link to this property</a>

"resource\_share"

<a href="#">Link to this property</a>

"stream\_live\_input"

<a href="#">Link to this property</a>

"stream\_video"

<a href="#">Link to this property</a>

"vectorize\_index"

<a href="#">Link to this property</a>

"worker"

<a href="#">Link to this property</a>

"worker\_route"

<a href="#">Link to this property</a>

"worker\_version"

<a href="#">Link to this property</a>

"zone"

<a href="#">Link to this property</a>

"zone\_ruleset"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20resource_tagging.values%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20type%20%3E%20(schema)>)

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

[Link to this property](#)%20resource_tagging.values%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20resource_tagging.values%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20resource_tagging.values%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

result: optional array of string

[Link to this property](#)%20resource_tagging.values%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

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

[Link to this property](#)%20resource_tagging.values%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List tag values

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tags/values/$TAG_KEY \
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
    "production",
    "staging"
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
    "production",
    "staging"
  ],
  "result_info": {
    "count": 20,
    "cursor": "eyJhY2NvdW50X2lkIjoxMjM0NTY3ODkwfQ"
  }
}
```