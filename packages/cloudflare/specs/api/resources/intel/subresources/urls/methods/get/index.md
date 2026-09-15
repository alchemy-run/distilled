---
title: Get URL Intelligence
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Intel](https://developers.cloudflare.com/api/resources/intel)

[URLs](https://developers.cloudflare.com/api/resources/intel/subresources/urls)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get URL Intelligence

GET/accounts/{account\_id}/intel/url

Gets security information about a URL, including content categories and risk types. The URL must be provided as a query parameter.

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

`Intel Write``Intel Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20intel.urls%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

url: string

The URL to look up.

[Link to this property](#)%20intel.urls%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20url%20%3E%20(schema)>)

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

[Link to this property](#)%20intel.urls%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20intel.urls%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20intel.urls%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/intel#(resource)%20intel.urls%20%3E%20(model)%20url%20%3E%20(schema)">URL</a> { content\_categories, full\_url, hostname, 2 more }

</summary>

<details>

<summary>

content\_categories: array of object {id, name, source\_id, super\_category\_id }

Content categories associated with this URL.

</summary>

id: optional number

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

source\_id: optional number

<a href="#">Link to this property</a>

super\_category\_id: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

full\_url: string

The full URL that was looked up.

<a href="#">Link to this property</a>

hostname: string

The hostname of the URL.

<a href="#">Link to this property</a>

<details>

<summary>

risk\_type: array of object {id, name, source\_id, super\_category\_id }

Security risk types associated with this URL.

</summary>

id: optional number

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

source\_id: optional number

<a href="#">Link to this property</a>

super\_category\_id: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

url\_path: string

The path component of the URL.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.urls%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get URL Intelligence

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/url \
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
  "result": {
    "content_categories": [
      {
        "id": 155,
        "name": "Technology",
        "source_id": 1,
        "super_category_id": 26
      }
    ],
    "full_url": "https://example.com/path",
    "hostname": "example.com",
    "risk_type": [
      {
        "id": 0,
        "name": "name",
        "source_id": 0,
        "super_category_id": 0
      }
    ],
    "url_path": "/path"
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
    "content_categories": [
      {
        "id": 155,
        "name": "Technology",
        "source_id": 1,
        "super_category_id": 26
      }
    ],
    "full_url": "https://example.com/path",
    "hostname": "example.com",
    "risk_type": [
      {
        "id": 0,
        "name": "name",
        "source_id": 0,
        "super_category_id": 0
      }
    ],
    "url_path": "/path"
  }
}
```