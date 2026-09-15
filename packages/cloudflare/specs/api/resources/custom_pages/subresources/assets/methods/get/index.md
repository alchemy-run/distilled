---
title: Get a custom asset
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Custom Pages](https://developers.cloudflare.com/api/resources/custom_pages)

[Assets](https://developers.cloudflare.com/api/resources/custom_pages/subresources/assets)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get a custom asset

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/custom\_pages/assets/{asset\_name}

Fetches the details of a custom asset.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### P ath ParametersExpand Collapse

asset\_name: string

The unique name of the custom asset. Can only contain letters (A-Z, a-z), numbers (0-9), and underscores (\_).

minLength1

[Link to this property](#)%20custom_pages.assets%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20asset_name%20%3E%20(schema)>)

account\_id: optional string

The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

[Link to this property](#)%20custom_pages.assets%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

zone\_id: optional string

The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

[Link to this property](#)%20custom_pages.assets%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

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

[Link to this property](#)%20custom_pages.assets%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20custom_pages.assets%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20custom_pages.assets%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {description, last\_updated, name, 2 more }

</summary>

description: optional string

A short description of the custom asset.

<a href="#">Link to this property</a>

last\_updated: optional string

formatdate-time

<a href="#">Link to this property</a>

name: optional string

The unique name of the custom asset. Can only contain letters (A-Z, a-z), numbers (0-9), and underscores (\_).

minLength1

<a href="#">Link to this property</a>

size\_bytes: optional number

The size of the asset content in bytes.

<a href="#">Link to this property</a>

url: optional string

The URL where the asset content is fetched from.

formaturi

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_pages.assets%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get a custom asset

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/custom_pages/assets/$ASSET_NAME \
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
  "result": {
    "description": "Custom 500 error page",
    "last_updated": "2014-01-01T05:20:00.12345Z",
    "name": "my_custom_error_page",
    "size_bytes": 1024,
    "url": "https://example.com/error.html"
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
  "result": {
    "description": "Custom 500 error page",
    "last_updated": "2014-01-01T05:20:00.12345Z",
    "name": "my_custom_error_page",
    "size_bytes": 1024,
    "url": "https://example.com/error.html"
  }
}
```