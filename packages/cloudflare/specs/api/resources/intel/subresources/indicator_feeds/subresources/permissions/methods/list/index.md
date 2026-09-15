---
title: List indicator feed permissions
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Intel](https://developers.cloudflare.com/api/resources/intel)

[Indicator Feeds](https://developers.cloudflare.com/api/resources/intel/subresources/indicator_feeds)

[Permissions](https://developers.cloudflare.com/api/resources/intel/subresources/indicator_feeds/subresources/permissions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List indicator feed permissions

GET/accounts/{account\_id}/intel/indicator-feeds/permissions/view

Lists current access permissions for custom threat indicator feeds.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`Intel Write``Intel Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier

maxLength32

[Link to this property](#)%20intel.indicator_feeds.permissions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

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

[Link to this property](#)%20intel.indicator_feeds.permissions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20intel.indicator_feeds.permissions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20intel.indicator_feeds.permissions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of object {id, description, is\_attributable, 3 more }

</summary>

id: optional number

The unique identifier for the indicator feed

<a href="#">Link to this property</a>

description: optional string

The description of the example test

<a href="#">Link to this property</a>

is\_attributable: optional boolean

Whether the indicator feed can be attributed to a provider

<a href="#">Link to this property</a>

is\_downloadable: optional boolean

Whether the indicator feed can be downloaded

<a href="#">Link to this property</a>

is\_public: optional boolean

Whether the indicator feed is exposed to customers

<a href="#">Link to this property</a>

name: optional string

The name of the indicator feed

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.indicator_feeds.permissions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### List indicator feed permissions

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/indicator-feeds/permissions/view \
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
      "id": 1,
      "description": "An important indicator list",
      "is_attributable": false,
      "is_downloadable": false,
      "is_public": false,
      "name": "indicator_list_1"
    },
    {
      "id": 2,
      "description": "An even more important indicator list",
      "is_attributable": true,
      "is_downloadable": false,
      "is_public": true,
      "name": "indicator_list_2"
    }
  ]
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
      "id": 1,
      "description": "An important indicator list",
      "is_attributable": false,
      "is_downloadable": false,
      "is_public": false,
      "name": "indicator_list_1"
    },
    {
      "id": 2,
      "description": "An even more important indicator list",
      "is_attributable": true,
      "is_downloadable": false,
      "is_public": true,
      "name": "indicator_list_2"
    }
  ]
}
```