---
title: Update WAF override
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Firewall](https://developers.cloudflare.com/api/resources/firewall)

[WAF](https://developers.cloudflare.com/api/resources/firewall/subresources/waf)

[Overrides](https://developers.cloudflare.com/api/resources/firewall/subresources/waf/subresources/overrides)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update WAF override

Deprecated

PUT/zones/{zone\_id}/firewall/waf/overrides/{overrides\_id}

**This endpoint has been deprecated and returns 410 Gone. Please use the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/) instead.**

Previously updated an existing URI-based WAF override.

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

`Zone Settings Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Defines an identifier.

maxLength32

[Link to this property](#)%20firewall.waf.overrides%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

overrides\_id: string

The unique identifier of the WAF override.

maxLength32

[Link to this property](#)%20firewall.waf.overrides%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20overrides_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

id: string

Defines an identifier.

maxLength32

[Link to this property](#)%20firewall.waf.overrides%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20id%20%3E%20(schema)>)

<details>

<summary>

rewrite\_action: <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.waf.overrides%20%3E%20(model)%20rewrite_action%20%3E%20(schema)">RewriteAction</a> { block, challenge, default, 2 more }

Specifies that, when a WAF rule matches, its configured action will be replaced by the action configured in this object.

</summary>

<details>

<summary>

block: optional "challenge"or "block"or "simulate"or 2 more

The WAF rule action to apply.

</summary>

One of the following:

"challenge"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"simulate"

<a href="#">Link to this property</a>

"disable"

<a href="#">Link to this property</a>

"default"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

challenge: optional "challenge"or "block"or "simulate"or 2 more

The WAF rule action to apply.

</summary>

One of the following:

"challenge"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"simulate"

<a href="#">Link to this property</a>

"disable"

<a href="#">Link to this property</a>

"default"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

default: optional "challenge"or "block"or "simulate"or 2 more

The WAF rule action to apply.

</summary>

One of the following:

"challenge"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"simulate"

<a href="#">Link to this property</a>

"disable"

<a href="#">Link to this property</a>

"default"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

disable: optional "challenge"or "block"or "simulate"or 2 more

The WAF rule action to apply.

</summary>

One of the following:

"challenge"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"simulate"

<a href="#">Link to this property</a>

"disable"

<a href="#">Link to this property</a>

"default"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

simulate: optional "challenge"or "block"or "simulate"or 2 more

The WAF rule action to apply.

</summary>

One of the following:

"challenge"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"simulate"

<a href="#">Link to this property</a>

"disable"

<a href="#">Link to this property</a>

"default"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.waf.overrides%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20rewrite_action%20%3E%20(schema)>)

<details>

<summary>

rules: <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.waf.overrides%20%3E%20(model)%20waf_rule%20%3E%20(schema)">WAFRule</a> { , , , 2 more }

An object that allows you to override the action of specific WAF rules. Each key of this object must be the ID of a WAF rule, and each value must be a valid WAF action. Unless you are disabling a rule, ensure that you also enable the rule group that this WAF rule belongs to. When creating a new URI-based WAF override, you must provide a <code>groups</code> object or a <code>rules</code> object.

</summary>

One of the following:

"challenge"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"simulate"

<a href="#">Link to this property</a>

"disable"

<a href="#">Link to this property</a>

"default"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.waf.overrides%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20rules%20%3E%20(schema)>)

urls: array of [OverrideURL](<https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.waf.overrides%20%3E%20(model)%20override_url%20%3E%20(schema)>)

The URLs to include in the current WAF override. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns.

[Link to this property](#)%20firewall.waf.overrides%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20urls%20%3E%20(schema)>)

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

[Link to this property](#)%20firewall.waf.overrides%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20firewall.waf.overrides%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.waf.overrides%20%3E%20(model)%20override%20%3E%20(schema)">Override</a> { id, description, groups, 5 more }

</summary>

id: optional string

The unique identifier of the WAF override.

maxLength32

<a href="#">Link to this property</a>

description: optional string

An informative summary of the current URI-based WAF override.

maxLength1024

<a href="#">Link to this property</a>

groups: optional map\[unknown]

An object that allows you to enable or disable WAF rule groups for the current WAF override. Each key of this object must be the ID of a WAF rule group, and each value must be a valid WAF action (usually <code>default</code> or <code>disable</code>). When creating a new URI-based WAF override, you must provide a <code>groups</code> object or a <code>rules</code> object.

<a href="#">Link to this property</a>

paused: optional boolean

When true, indicates that the rule is currently paused.

<a href="#">Link to this property</a>

priority: optional number

The relative priority of the current URI-based WAF override when multiple overrides match a single URL. A lower number indicates higher priority. Higher priority overrides may overwrite values set by lower priority overrides.

maximum1000000000

minimum-1000000000

<a href="#">Link to this property</a>

<details>

<summary>

rewrite\_action: optional <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.waf.overrides%20%3E%20(model)%20rewrite_action%20%3E%20(schema)">RewriteAction</a> { block, challenge, default, 2 more }

Specifies that, when a WAF rule matches, its configured action will be replaced by the action configured in this object.

</summary>

<details>

<summary>

block: optional "challenge"or "block"or "simulate"or 2 more

The WAF rule action to apply.

</summary>

One of the following:

"challenge"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"simulate"

<a href="#">Link to this property</a>

"disable"

<a href="#">Link to this property</a>

"default"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

challenge: optional "challenge"or "block"or "simulate"or 2 more

The WAF rule action to apply.

</summary>

One of the following:

"challenge"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"simulate"

<a href="#">Link to this property</a>

"disable"

<a href="#">Link to this property</a>

"default"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

default: optional "challenge"or "block"or "simulate"or 2 more

The WAF rule action to apply.

</summary>

One of the following:

"challenge"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"simulate"

<a href="#">Link to this property</a>

"disable"

<a href="#">Link to this property</a>

"default"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

disable: optional "challenge"or "block"or "simulate"or 2 more

The WAF rule action to apply.

</summary>

One of the following:

"challenge"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"simulate"

<a href="#">Link to this property</a>

"disable"

<a href="#">Link to this property</a>

"default"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

simulate: optional "challenge"or "block"or "simulate"or 2 more

The WAF rule action to apply.

</summary>

One of the following:

"challenge"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"simulate"

<a href="#">Link to this property</a>

"disable"

<a href="#">Link to this property</a>

"default"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

rules: optional <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.waf.overrides%20%3E%20(model)%20waf_rule%20%3E%20(schema)">WAFRule</a> { , , , 2 more }

An object that allows you to override the action of specific WAF rules. Each key of this object must be the ID of a WAF rule, and each value must be a valid WAF action. Unless you are disabling a rule, ensure that you also enable the rule group that this WAF rule belongs to. When creating a new URI-based WAF override, you must provide a <code>groups</code> object or a <code>rules</code> object.

</summary>

One of the following:

"challenge"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"simulate"

<a href="#">Link to this property</a>

"disable"

<a href="#">Link to this property</a>

"default"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

urls: optional array of <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.waf.overrides%20%3E%20(model)%20override_url%20%3E%20(schema)">OverrideURL</a>

The URLs to include in the current WAF override. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.waf.overrides%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Defines whether the API call was successful.

[Link to this property](#)%20firewall.waf.overrides%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Update WAF override

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/waf/overrides/$OVERRIDES_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "id": "023e105f4ecef8ad9ca31a8372d0c353",
          "rewrite_action": {},
          "rules": {
            "100015": "disable"
          },
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
    "id": "de677e5818985db1285d0e80225f06e5",
    "description": "Enable Cloudflare Magento ruleset for shop.example.com",
    "groups": {
      "ea8687e59929c1fd05ba97574ad43f77": "bar"
    },
    "paused": true,
    "priority": 1,
    "rewrite_action": {
      "block": "challenge",
      "challenge": "challenge",
      "default": "challenge",
      "disable": "challenge",
      "simulate": "challenge"
    },
    "rules": {
      "100015": "disable"
    },
    "urls": [
      "shop.example.com/*"
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
    "id": "de677e5818985db1285d0e80225f06e5",
    "description": "Enable Cloudflare Magento ruleset for shop.example.com",
    "groups": {
      "ea8687e59929c1fd05ba97574ad43f77": "bar"
    },
    "paused": true,
    "priority": 1,
    "rewrite_action": {
      "block": "challenge",
      "challenge": "challenge",
      "default": "challenge",
      "disable": "challenge",
      "simulate": "challenge"
    },
    "rules": {
      "100015": "disable"
    },
    "urls": [
      "shop.example.com/*"
    ]
  },
  "success": true
}
```