---
title: List firewall rules
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Firewall](https://developers.cloudflare.com/api/resources/firewall)

[Rules](https://developers.cloudflare.com/api/resources/firewall/subresources/rules)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List firewall rules

Deprecated: The Firewall Rules API is deprecated in favour of using the Ruleset Engine. See https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#firewall-rules-api-and-filters-api for full details.

GET/zones/{zone\_id}/firewall/rules

**This endpoint has been deprecated and returns 410 Gone. Please use the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/) instead.**

Fetches firewall rules in a zone. You can filter the results using several optional parameters.

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

[Link to this property](#)%20firewall.rules%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

id: optional string

The unique identifier of the firewall rule.

maxLength32

[Link to this property](#)%20firewall.rules%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20id%20%3E%20(schema)>)

action: optional string

The action to search for. Must be an exact match.

[Link to this property](#)%20firewall.rules%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20action%20%3E%20(schema)>)

description: optional string

A case-insensitive string to find in the description.

[Link to this property](#)%20firewall.rules%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20description%20%3E%20(schema)>)

page: optional number

Page number of paginated results.

minimum1

[Link to this property](#)%20firewall.rules%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

paused: optional boolean

When true, indicates that the firewall rule is currently paused.

[Link to this property](#)%20firewall.rules%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20paused%20%3E%20(schema)>)

per\_page: optional number

Number of firewall rules per page.

maximum100

minimum5

[Link to this property](#)%20firewall.rules%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

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

[Link to this property](#)%20firewall.rules%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20firewall.rules%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.rules%20%3E%20(model)%20firewall_rule%20%3E%20(schema)">FirewallRule</a> { id, action, description, 5 more }

</summary>

id: optional string

The unique identifier of the firewall rule.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

action: optional <a href="https://developers.cloudflare.com/api/resources/rate_limits#(resource)%20rate_limits%20%3E%20(model)%20action%20%3E%20(schema)">Action</a>

The action to apply to a matched request. The <code>log</code> action is only available on an Enterprise plan.

</summary>

One of the following:

"block"

<a href="#">Link to this property</a>

"challenge"

<a href="#">Link to this property</a>

"js\_challenge"

<a href="#">Link to this property</a>

"managed\_challenge"

<a href="#">Link to this property</a>

"allow"

<a href="#">Link to this property</a>

"log"

<a href="#">Link to this property</a>

"bypass"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: optional string

An informative summary of the firewall rule.

maxLength500

<a href="#">Link to this property</a>

<details>

<summary>

filter: optional <a href="https://developers.cloudflare.com/api/resources/filters#(resource)%20filters%20%3E%20(model)%20firewall_filter%20%3E%20(schema)">FirewallFilter</a> { id, description, expression, 2 more } or <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.rules%20%3E%20(model)%20deleted_filter%20%3E%20(schema)">DeletedFilter</a> { id, deleted }

</summary>

One of the following:

<details>

<summary>

FirewallFilter object {id, description, expression, 2 more }

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

<a href="#">Link to this property</a>

<details>

<summary>

DeletedFilter object {id, deleted }

</summary>

id: string

The unique identifier of the filter.

maxLength32

minLength32

<a href="#">Link to this property</a>

deleted: boolean

When true, indicates that the firewall rule was deleted.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

paused: optional boolean

When true, indicates that the firewall rule is currently paused.

<a href="#">Link to this property</a>

priority: optional number

The priority of the rule. Optional value used to define the processing order. A lower number indicates a higher priority. If not provided, rules with a defined priority will be processed before rules without a priority.

maximum2147483647

minimum0

<a href="#">Link to this property</a>

<details>

<summary>

products: optional array of <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.rules%20%3E%20(model)%20product%20%3E%20(schema)">Product</a>

</summary>

One of the following:

"zoneLockdown"

<a href="#">Link to this property</a>

"uaBlock"

<a href="#">Link to this property</a>

"bic"

<a href="#">Link to this property</a>

"hot"

<a href="#">Link to this property</a>

"securityLevel"

<a href="#">Link to this property</a>

"rateLimit"

<a href="#">Link to this property</a>

"waf"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ref: optional string

A short reference tag. Allows you to select related firewall rules.

maxLength50

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.rules%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Defines whether the API call was successful.

[Link to this property](#)%20firewall.rules%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, total\_count }

</summary>

count: optional number

Defines the total number of results for the requested service.

<a href="#">Link to this property</a>

page: optional number

Defines the current page within paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Defines the number of results per page of results.

<a href="#">Link to this property</a>

total\_count: optional number

Defines the total results available without any search parameters.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.rules%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List firewall rules

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/rules \
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
  "result": [
    {
      "id": "372e67954025e0ba6aaa6d586b9e0b60",
      "action": "block",
      "description": "Blocks traffic identified during investigation for MIR-31",
      "filter": {
        "id": "372e67954025e0ba6aaa6d586b9e0b61",
        "description": "Restrict access from these browsers on this address range.",
        "expression": "(http.request.uri.path ~ \".*wp-login.php\" or http.request.uri.path ~ \".*xmlrpc.php\") and ip.addr ne 172.16.22.155",
        "paused": false,
        "ref": "FIL-100"
      },
      "paused": false,
      "priority": 50,
      "products": [
        "waf"
      ],
      "ref": "MIR-31"
    }
  ],
  "success": true,
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
  "result": [
    {
      "id": "372e67954025e0ba6aaa6d586b9e0b60",
      "action": "block",
      "description": "Blocks traffic identified during investigation for MIR-31",
      "filter": {
        "id": "372e67954025e0ba6aaa6d586b9e0b61",
        "description": "Restrict access from these browsers on this address range.",
        "expression": "(http.request.uri.path ~ \".*wp-login.php\" or http.request.uri.path ~ \".*xmlrpc.php\") and ip.addr ne 172.16.22.155",
        "paused": false,
        "ref": "FIL-100"
      },
      "paused": false,
      "priority": 50,
      "products": [
        "waf"
      ],
      "ref": "MIR-31"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```