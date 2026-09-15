---
title: Get a namespace
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI Search](https://developers.cloudflare.com/api/resources/ai_search)

[Namespaces](https://developers.cloudflare.com/api/resources/ai_search/subresources/namespaces)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get a namespace

GET/accounts/{account\_id}/ai-search/namespaces/{name}

Retrieve a namespace and its description.

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

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20ai_search.namespaces%20%3E%20(method)%20read%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

name: string

[Link to this property](#)%20ai_search.namespaces%20%3E%20(method)%20read%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {created\_at, name, description, 2 more }

</summary>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

description: optional string

Optional description for the namespace. Max 256 characters.

maxLength256

<a href="#">Link to this property</a>

public\_endpoint\_id: optional string

<a href="#">Link to this property</a>

<details>

<summary>

public\_endpoint\_params: optional object {authorized\_hosts, chat\_completions\_endpoint, custom\_domains, 6 more }

</summary>

authorized\_hosts: optional array of string

<a href="#">Link to this property</a>

<details>

<summary>

chat\_completions\_endpoint: optional object {disabled }

</summary>

disabled: optional boolean

Disable chat completions endpoint for this public endpoint

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

custom\_domains: optional array of string

Custom domain hostnames that alias this public endpoint. GET and create responses return the current set; on update (PUT) this field is only echoed back when supplied in the request body, otherwise it is null (omit it to leave domains unchanged).

<a href="#">Link to this property</a>

default\_domain\_enabled: optional boolean

When false, the instance is reachable only via a registered custom domain and the default &lt;public\_endpoint\_id&gt;.search.ai.cloudflare.com host returns 404. Requires at least one custom domain. Defaults to true. public\_endpoint\_params is replaced wholesale on update, so resend default\_domain\_enabled on every update to keep the default host off — omitting it resets to true.

<a href="#">Link to this property</a>

enabled: optional boolean

<a href="#">Link to this property</a>

instances\_allowed: optional array of string

Instance IDs exposed through the namespace public endpoint. Empty means nothing is searchable. Every ID must be an existing instance in this namespace, and the list cannot exceed the account’s multi-instance search limit.

<a href="#">Link to this property</a>

<details>

<summary>

mcp: optional object {description, disabled }

</summary>

description: optional string

<a href="#">Link to this property</a>

disabled: optional boolean

Disable MCP endpoint for this public endpoint

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

rate\_limit: optional object {period\_ms, requests, technique }

</summary>

period\_ms: optional number

maximum3600000

minimum60000

<a href="#">Link to this property</a>

requests: optional number

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

technique: optional "fixed"or "sliding"

</summary>

One of the following:

"fixed"

<a href="#">Link to this property</a>

"sliding"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

search\_endpoint: optional object {disabled }

</summary>

disabled: optional boolean

Disable search endpoint for this public endpoint

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_search.namespaces%20%3E%20(method)%20read%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

[Link to this property](#)%20ai_search.namespaces%20%3E%20(method)%20read%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get a namespace

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "created_at": "2019-12-27T18:11:19.117Z",
    "name": "production",
    "description": "Production environment",
    "public_endpoint_id": "public_endpoint_id",
    "public_endpoint_params": {
      "authorized_hosts": [
        "string"
      ],
      "chat_completions_endpoint": {
        "disabled": true
      },
      "custom_domains": [
        "search.example.com"
      ],
      "default_domain_enabled": true,
      "enabled": true,
      "instances_allowed": [
        "docs",
        "blog"
      ],
      "mcp": {
        "description": "description",
        "disabled": true
      },
      "rate_limit": {
        "period_ms": 60000,
        "requests": 1,
        "technique": "fixed"
      },
      "search_endpoint": {
        "disabled": true
      }
    }
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "created_at": "2019-12-27T18:11:19.117Z",
    "name": "production",
    "description": "Production environment",
    "public_endpoint_id": "public_endpoint_id",
    "public_endpoint_params": {
      "authorized_hosts": [
        "string"
      ],
      "chat_completions_endpoint": {
        "disabled": true
      },
      "custom_domains": [
        "search.example.com"
      ],
      "default_domain_enabled": true,
      "enabled": true,
      "instances_allowed": [
        "docs",
        "blog"
      ],
      "mcp": {
        "description": "description",
        "disabled": true
      },
      "rate_limit": {
        "period_ms": 60000,
        "requests": 1,
        "technique": "fixed"
      },
      "search_endpoint": {
        "disabled": true
      }
    }
  },
  "success": true
}
```