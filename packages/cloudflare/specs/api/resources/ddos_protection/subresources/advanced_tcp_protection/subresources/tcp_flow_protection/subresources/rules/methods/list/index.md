---
title: List all TCP Flow Protection rules.
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[DDoS Protection](https://developers.cloudflare.com/api/resources/ddos_protection)

[Advanced TCP Protection](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection)

[TCP Flow Protection](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/tcp_flow_protection)

[Rules](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/tcp_flow_protection/subresources/rules)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List all TCP Flow Protection rules.

GET/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_flow\_protection/rules

List all TCP Flow Protection rules for an account.

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

`DDoS Protection Write``DDoS Protection Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.rules%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

direction: optional string

The direction of ordering (ASC or DESC). Defaults to ‘ASC’.

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.rules%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

order: optional string

The field to order by. Defaults to ‘prefix’.

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.rules%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order%20%3E%20(schema)>)

page: optional number

The page number for pagination. Defaults to 1.

formatint64

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.rules%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

The number of items per page. Must be between 10 and 1000. Defaults to 25.

formatint64

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.rules%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

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

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.rules%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.rules%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.rules%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of object {id, burst\_sensitivity, created\_on, 5 more }

</summary>

id: string

The unique ID of the TCP Flow Protection rule.

<a href="#">Link to this property</a>

burst\_sensitivity: string

The burst sensitivity. Must be one of ‘low’, ‘medium’, ‘high’.

<a href="#">Link to this property</a>

created\_on: string

The creation timestamp of the TCP Flow Protection rule.

formatdate-time

<a href="#">Link to this property</a>

mode: string

The mode for TCP Flow Protection. Must be one of ‘enabled’, ‘disabled’, ‘monitoring’.

<a href="#">Link to this property</a>

modified\_on: string

The last modification timestamp of the TCP Flow Protection rule.

formatdate-time

<a href="#">Link to this property</a>

name: string

The name of the TCP Flow Protection rule. Value is relative to the ‘scope’ setting. For ‘global’ scope, name should be ‘global’. For either the ‘region’ or ‘datacenter’ scope, name should be the actual name of the region or datacenter, e.g., ‘wnam’ or ‘lax’.

<a href="#">Link to this property</a>

rate\_sensitivity: string

The rate sensitivity. Must be one of ‘low’, ‘medium’, ‘high’.

<a href="#">Link to this property</a>

scope: string

The scope for the TCP Flow Protection rule. Must be one of ‘global’, ‘region’, or ‘datacenter’.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.rules%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, 2 more }

</summary>

count: optional number

Total number of results for the requested service.

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page of results.

<a href="#">Link to this property</a>

total\_count: optional number

Total results available without any search parameters.

<a href="#">Link to this property</a>

total\_pages: optional number

The number of total pages in the entire result set.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.rules%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List all TCP Flow Protection rules.

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules \
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
      "id": "id",
      "burst_sensitivity": "burst_sensitivity",
      "created_on": "2019-12-27T18:11:19.117Z",
      "mode": "mode",
      "modified_on": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "rate_sensitivity": "rate_sensitivity",
      "scope": "scope"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
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
      "id": "id",
      "burst_sensitivity": "burst_sensitivity",
      "created_on": "2019-12-27T18:11:19.117Z",
      "mode": "mode",
      "modified_on": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "rate_sensitivity": "rate_sensitivity",
      "scope": "scope"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```