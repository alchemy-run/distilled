---
title: Create TCP Flow Protection rule.
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

# Create TCP Flow Protection rule.

POST/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_flow\_protection/rules

Create a TCP Flow Protection rule for an account.

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

`DDoS Protection Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.rules%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

burst\_sensitivity: string

The burst sensitivity. Must be one of ‘low’, ‘medium’, ‘high’.

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.rules%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20burst_sensitivity%20%3E%20(schema)>)

mode: string

The mode for the TCP Flow Protection. Must be one of ‘enabled’, ‘disabled’, ‘monitoring’.

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.rules%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20mode%20%3E%20(schema)>)

name: string

The name of the TCP Flow Protection rule. Value is relative to the ‘scope’ setting. For ‘global’ scope, name should be ‘global’. For either the ‘region’ or ‘datacenter’ scope, name should be the actual name of the region or datacenter, e.g., ‘wnam’ or ‘lax’.

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.rules%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

rate\_sensitivity: string

The rate sensitivity. Must be one of ‘low’, ‘medium’, ‘high’.

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.rules%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20rate_sensitivity%20%3E%20(schema)>)

scope: string

The scope for the TCP Flow Protection rule.

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.rules%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20scope%20%3E%20(schema)>)

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

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.rules%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.rules%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.rules%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, burst\_sensitivity, created\_on, 5 more }

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

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.rules%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Create TCP Flow Protection rule.

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "burst_sensitivity": "burst_sensitivity",
          "mode": "mode",
          "name": "name",
          "rate_sensitivity": "rate_sensitivity",
          "scope": "scope"
        }'
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
    "id": "id",
    "burst_sensitivity": "burst_sensitivity",
    "created_on": "2019-12-27T18:11:19.117Z",
    "mode": "mode",
    "modified_on": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "rate_sensitivity": "rate_sensitivity",
    "scope": "scope"
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
    "id": "id",
    "burst_sensitivity": "burst_sensitivity",
    "created_on": "2019-12-27T18:11:19.117Z",
    "mode": "mode",
    "modified_on": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "rate_sensitivity": "rate_sensitivity",
    "scope": "scope"
  }
}
```