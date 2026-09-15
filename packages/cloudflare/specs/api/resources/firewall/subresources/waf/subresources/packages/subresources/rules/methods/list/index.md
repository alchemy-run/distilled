---
title: List WAF rules
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Firewall](https://developers.cloudflare.com/api/resources/firewall)

[WAF](https://developers.cloudflare.com/api/resources/firewall/subresources/waf)

[Packages](https://developers.cloudflare.com/api/resources/firewall/subresources/waf/subresources/packages)

[Rules](https://developers.cloudflare.com/api/resources/firewall/subresources/waf/subresources/packages/subresources/rules)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List WAF rules

Deprecated

GET/zones/{zone\_id}/firewall/waf/packages/{package\_id}/rules

Fetches WAF rules in a WAF package.

**Note:** Applies only to the [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).

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

Defines an identifier of a schema.

maxLength32

[Link to this property](#)%20firewall.waf.packages.rules%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

package\_id: string

Defines the unique identifier of a WAF package.

maxLength32

[Link to this property](#)%20firewall.waf.packages.rules%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20package_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

description: optional string

Defines the public description of the WAF rule.

[Link to this property](#)%20firewall.waf.packages.rules%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20description%20%3E%20(schema)>)

<details>

<summary>

direction: optional "asc"or "desc"

Defines the direction used to sort returned rules.

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.waf.packages.rules%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

group\_id: optional string

Defines the unique identifier of the rule group.

maxLength32

[Link to this property](#)%20firewall.waf.packages.rules%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20group_id%20%3E%20(schema)>)

<details>

<summary>

match: optional "any"or "all"

Defines the search requirements. When set to <code>all</code>, all the search requirements must match. When set to <code>any</code>, only one of the search requirements has to match.

</summary>

One of the following:

"any"

<a href="#">Link to this property</a>

"all"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.waf.packages.rules%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20match%20%3E%20(schema)>)

<details>

<summary>

mode: optional "DIS"or "CHL"or "BLK"or "SIM"

Defines the action/mode a rule has been overridden to perform.

</summary>

One of the following:

"DIS"

<a href="#">Link to this property</a>

"CHL"

<a href="#">Link to this property</a>

"BLK"

<a href="#">Link to this property</a>

"SIM"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.waf.packages.rules%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20mode%20%3E%20(schema)>)

<details>

<summary>

order: optional "priority"or "group\_id"or "description"

Defines the field used to sort returned rules.

</summary>

One of the following:

"priority"

<a href="#">Link to this property</a>

"group\_id"

<a href="#">Link to this property</a>

"description"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.waf.packages.rules%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order%20%3E%20(schema)>)

page: optional number

Defines the page number of paginated results.

minimum1

[Link to this property](#)%20firewall.waf.packages.rules%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Defines the number of rules per page.

maximum100

minimum5

[Link to this property](#)%20firewall.waf.packages.rules%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

priority: optional string

Defines the order in which the individual WAF rule is executed within its rule group.

[Link to this property](#)%20firewall.waf.packages.rules%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20priority%20%3E%20(schema)>)

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

[Link to this property](#)%20firewall.waf.packages.rules%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20firewall.waf.packages.rules%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {id, allowed\_modes, description, 4 more } or object {id, allowed\_modes, default\_mode, 5 more } or object {id, allowed\_modes, description, 4 more }

</summary>

One of the following:

<details>

<summary>

WAFManagedRulesAnomalyRule object {id, allowed\_modes, description, 4 more }

When triggered, anomaly detection WAF rules contribute to an overall threat score that will determine if a request is considered malicious. You can configure the total scoring threshold through the ‘sensitivity’ property of the WAF package.

</summary>

id: string

Defines the unique identifier of the WAF rule.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

allowed\_modes: array of <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.waf.packages.rules%20%3E%20(model)%20allowed_modes_anomaly%20%3E%20(schema)">AllowedModesAnomaly</a>

Defines the available modes for the current WAF rule. Applies to anomaly detection WAF rules.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: string

Defines the public description of the WAF rule.

<a href="#">Link to this property</a>

<details>

<summary>

group: <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.waf.packages.rules%20%3E%20(model)%20waf_rule_group%20%3E%20(schema)">WAFRuleGroup</a> { id, name }

Defines the rule group to which the current WAF rule belongs.

</summary>

id: optional string

Defines the unique identifier of the rule group.

maxLength32

<a href="#">Link to this property</a>

name: optional string

Defines the name of the rule group.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

mode: <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.waf.packages.rules%20%3E%20(model)%20allowed_modes_anomaly%20%3E%20(schema)">AllowedModesAnomaly</a>

Defines the mode anomaly. When set to <code>on</code>, the current WAF rule will be used when evaluating the request. Applies to anomaly detection WAF rules.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

package\_id: string

Defines the unique identifier of a WAF package.

maxLength32

<a href="#">Link to this property</a>

priority: string

Defines the order in which the individual WAF rule is executed within its rule group.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

WAFManagedRulesTraditionalDenyRule object {id, allowed\_modes, default\_mode, 5 more }

When triggered, traditional WAF rules cause the firewall to immediately act upon the request based on the configuration of the rule. A ‘deny’ rule will immediately respond to the request based on the configured rule action/mode (for example, ‘block’) and no other rules will be processed.

</summary>

id: string

Defines the unique identifier of the WAF rule.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

allowed\_modes: array of "default"or "disable"or "simulate"or 2 more

Defines the list of possible actions of the WAF rule when it is triggered.

</summary>

One of the following:

"default"

<a href="#">Link to this property</a>

"disable"

<a href="#">Link to this property</a>

"simulate"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"challenge"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

default\_mode: "disable"or "simulate"or "block"or "challenge"

Defines the default action/mode of a rule.

</summary>

One of the following:

"disable"

<a href="#">Link to this property</a>

"simulate"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"challenge"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: string

Defines the public description of the WAF rule.

<a href="#">Link to this property</a>

<details>

<summary>

group: <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.waf.packages.rules%20%3E%20(model)%20waf_rule_group%20%3E%20(schema)">WAFRuleGroup</a> { id, name }

Defines the rule group to which the current WAF rule belongs.

</summary>

id: optional string

Defines the unique identifier of the rule group.

maxLength32

<a href="#">Link to this property</a>

name: optional string

Defines the name of the rule group.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

mode: "default"or "disable"or "simulate"or 2 more

Defines the action that the current WAF rule will perform when triggered. Applies to traditional (deny) WAF rules.

</summary>

One of the following:

"default"

<a href="#">Link to this property</a>

"disable"

<a href="#">Link to this property</a>

"simulate"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

"challenge"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

package\_id: string

Defines the unique identifier of a WAF package.

maxLength32

<a href="#">Link to this property</a>

priority: string

Defines the order in which the individual WAF rule is executed within its rule group.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

WAFManagedRulesTraditionalAllowRule object {id, allowed\_modes, description, 4 more }

When triggered, traditional WAF rules cause the firewall to immediately act on the request based on the rule configuration. An ‘allow’ rule will immediately allow the request and no other rules will be processed.

</summary>

id: string

Defines the unique identifier of the WAF rule.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

allowed\_modes: array of "on"or "off"

Defines the available modes for the current WAF rule.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: string

Defines the public description of the WAF rule.

<a href="#">Link to this property</a>

<details>

<summary>

group: <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.waf.packages.rules%20%3E%20(model)%20waf_rule_group%20%3E%20(schema)">WAFRuleGroup</a> { id, name }

Defines the rule group to which the current WAF rule belongs.

</summary>

id: optional string

Defines the unique identifier of the rule group.

maxLength32

<a href="#">Link to this property</a>

name: optional string

Defines the name of the rule group.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

mode: "on"or "off"

When set to <code>on</code>, the current rule will be used when evaluating the request. Applies to traditional (allow) WAF rules.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

package\_id: string

Defines the unique identifier of a WAF package.

maxLength32

<a href="#">Link to this property</a>

priority: string

Defines the order in which the individual WAF rule is executed within its rule group.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.waf.packages.rules%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Defines whether the API call was successful.

[Link to this property](#)%20firewall.waf.packages.rules%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

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

[Link to this property](#)%20firewall.waf.packages.rules%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List WAF rules

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/waf/packages/$PACKAGE_ID/rules \
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
      "id": "f939de3be84e66e757adcdcb87908023",
      "allowed_modes": [
        "on",
        "off"
      ],
      "description": "SQL injection prevention for SELECT statements",
      "group": {
        "id": "de677e5818985db1285d0e80225f06e5",
        "name": "Project Honey Pot"
      },
      "mode": "on",
      "package_id": "a25a9a7e9c00afc1fb2e0245519d725b",
      "priority": "priority"
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
      "id": "f939de3be84e66e757adcdcb87908023",
      "allowed_modes": [
        "on",
        "off"
      ],
      "description": "SQL injection prevention for SELECT statements",
      "group": {
        "id": "de677e5818985db1285d0e80225f06e5",
        "name": "Project Honey Pot"
      },
      "mode": "on",
      "package_id": "a25a9a7e9c00afc1fb2e0245519d725b",
      "priority": "priority"
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