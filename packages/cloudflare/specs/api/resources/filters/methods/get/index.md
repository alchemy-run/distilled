---
title: Get a filter
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Filters](https://developers.cloudflare.com/api/resources/filters)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get a filter

Deprecated: The Filters API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.

GET/zones/{zone\_id}/filters/{filter\_id}

Fetches the details of a filter.

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

`Firewall Services Write``Firewall Services Read`

##### P ath ParametersExpand Collapse

zone\_id: string

Defines an identifier.

maxLength32

[Link to this property](#)%20filters%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

filter\_id: string

The unique identifier of the filter.

maxLength32

minLength32

[Link to this property](#)%20filters%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20filter_id%20%3E%20(schema)>)

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

[Link to this property](#)%20filters%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20filters%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/filters#(resource)%20filters%20%3E%20(model)%20firewall_filter%20%3E%20(schema)">FirewallFilter</a> { id, description, expression, 2 more }

</summary>

id: optional string

The unique identifier of the filter.

maxLength32

minLength32

<a href="#">Link to this property</a>

description: optional string

An informative summary of the filter.

maxLength500

<a href="#">Link to this property</a>

expression: optional string

The filter expression. For more information, refer to <a href="https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/">Expressions</a>.

<a href="#">Link to this property</a>

paused: optional boolean

When true, indicates that the filter is currently paused.

<a href="#">Link to this property</a>

ref: optional string

A short reference tag. Allows you to select related filters.

maxLength50

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20filters%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Defines whether the API call was successful.

[Link to this property](#)%20filters%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get a filter

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/filters/$FILTER_ID \
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
  "result": {
    "id": "372e67954025e0ba6aaa6d586b9e0b61",
    "description": "Restrict access from these browsers on this address range.",
    "expression": "(http.request.uri.path ~ \".*wp-login.php\" or http.request.uri.path ~ \".*xmlrpc.php\") and ip.addr ne 172.16.22.155",
    "paused": false,
    "ref": "FIL-100"
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
    "id": "372e67954025e0ba6aaa6d586b9e0b61",
    "description": "Restrict access from these browsers on this address range.",
    "expression": "(http.request.uri.path ~ \".*wp-login.php\" or http.request.uri.path ~ \".*xmlrpc.php\") and ip.addr ne 172.16.22.155",
    "paused": false,
    "ref": "FIL-100"
  },
  "success": true
}
```