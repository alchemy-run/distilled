---
title: Update a Zone Lockdown rule
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Firewall](https://developers.cloudflare.com/api/resources/firewall)

[Lockdowns](https://developers.cloudflare.com/api/resources/firewall/subresources/lockdowns)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update a Zone Lockdown rule

PUT/zones/{zone\_id}/firewall/lockdowns/{lock\_downs\_id}

Updates an existing Zone Lockdown rule.

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

`Firewall Services Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Defines an identifier.

maxLength32

[Link to this property](#)%20firewall.lockdowns%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

lock\_downs\_id: string

The unique identifier of the Zone Lockdown rule.

maxLength32

[Link to this property](#)%20firewall.lockdowns%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20lock_downs_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

configurations: <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.lockdowns%20%3E%20(model)%20configuration%20%3E%20(schema)">Configuration</a> { , }

A list of IP addresses or CIDR ranges that will be allowed to access the URLs specified in the Zone Lockdown rule. You can include any number of <code>ip</code> or <code>ip_range</code> configurations.

</summary>

One of the following:

<details>

<summary>

LockdownIPConfiguration object {target, value }

</summary>

target: optional "ip"

The configuration target. You must set the target to <code>ip</code> when specifying an IP address in the Zone Lockdown rule.

<a href="#">Link to this property</a>

value: optional string

The IP address to match. This address will be compared to the IP address of incoming requests.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

LockdownCIDRConfiguration object {target, value }

</summary>

target: optional "ip\_range"

The configuration target. You must set the target to <code>ip_range</code> when specifying an IP address range in the Zone Lockdown rule.

<a href="#">Link to this property</a>

value: optional string

The IP address range to match. You can only use prefix lengths <code>/16</code> and <code>/24</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.lockdowns%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20configurations%20%3E%20(schema)>)

urls: array of [OverrideURL](<https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.waf.overrides%20%3E%20(model)%20override_url%20%3E%20(schema)>)

The URLs to include in the current WAF override. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns.

[Link to this property](#)%20firewall.lockdowns%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20urls%20%3E%20(schema)>)

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

[Link to this property](#)%20firewall.lockdowns%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20firewall.lockdowns%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.lockdowns%20%3E%20(model)%20lockdown%20%3E%20(schema)">Lockdown</a> { id, configurations, created\_on, 4 more }

</summary>

id: string

The unique identifier of the Zone Lockdown rule.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

configurations: <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.lockdowns%20%3E%20(model)%20configuration%20%3E%20(schema)">Configuration</a> { , }

A list of IP addresses or CIDR ranges that will be allowed to access the URLs specified in the Zone Lockdown rule. You can include any number of <code>ip</code> or <code>ip_range</code> configurations.

</summary>

One of the following:

<details>

<summary>

LockdownIPConfiguration object {target, value }

</summary>

target: optional "ip"

The configuration target. You must set the target to <code>ip</code> when specifying an IP address in the Zone Lockdown rule.

<a href="#">Link to this property</a>

value: optional string

The IP address to match. This address will be compared to the IP address of incoming requests.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

LockdownCIDRConfiguration object {target, value }

</summary>

target: optional "ip\_range"

The configuration target. You must set the target to <code>ip_range</code> when specifying an IP address range in the Zone Lockdown rule.

<a href="#">Link to this property</a>

value: optional string

The IP address range to match. You can only use prefix lengths <code>/16</code> and <code>/24</code>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: string

The timestamp of when the rule was created.

formatdate-time

<a href="#">Link to this property</a>

description: string

An informative summary of the rule.

maxLength1024

<a href="#">Link to this property</a>

modified\_on: string

The timestamp of when the rule was last modified.

formatdate-time

<a href="#">Link to this property</a>

paused: boolean

When true, indicates that the rule is currently paused.

<a href="#">Link to this property</a>

urls: array of <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.lockdowns%20%3E%20(model)%20lockdown_url%20%3E%20(schema)">LockdownURL</a>

The URLs to include in the rule definition. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.lockdowns%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Defines whether the API call was successful.

[Link to this property](#)%20firewall.lockdowns%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Update a Zone Lockdown rule

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/lockdowns/$LOCK_DOWNS_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "configurations": [
            {}
          ],
          "urls": [
            "shop.example.com/*"
          ]
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
  "result": {
    "id": "372e67954025e0ba6aaa6d586b9e0b59",
    "configurations": [
      {
        "target": "ip",
        "value": "198.51.100.4"
      }
    ],
    "created_on": "2014-01-01T05:20:00.12345Z",
    "description": "Restrict access to these endpoints to requests from a known IP address",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "paused": false,
    "urls": [
      "api.mysite.com/some/endpoint*"
    ]
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
    "id": "372e67954025e0ba6aaa6d586b9e0b59",
    "configurations": [
      {
        "target": "ip",
        "value": "198.51.100.4"
      }
    ],
    "created_on": "2014-01-01T05:20:00.12345Z",
    "description": "Restrict access to these endpoints to requests from a known IP address",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "paused": false,
    "urls": [
      "api.mysite.com/some/endpoint*"
    ]
  },
  "success": true
}
```