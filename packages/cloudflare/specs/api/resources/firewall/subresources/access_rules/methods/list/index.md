---
title: List IP Access rules
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Firewall](https://developers.cloudflare.com/api/resources/firewall)

[Access Rules](https://developers.cloudflare.com/api/resources/firewall/subresources/access_rules)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List IP Access rules

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/firewall/access\_rules/rules

Fetches IP Access rules of an account or zone. These rules apply to all the zones in the account or zone. You can filter the results using several optional parameters.

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

`Account Firewall Access Rules Write``Account Firewall Access Rules Read`

##### P ath ParametersExpand Collapse

account\_id: optional string

The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

[Link to this property](#)%20firewall.access_rules%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

zone\_id: optional string

The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

[Link to this property](#)%20firewall.access_rules%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

<details>

<summary>

configuration: optional object {target, value }

</summary>

<details>

<summary>

target: optional "ip"or "ip\_range"or "asn"or "country"

Defines the target to search in existing rules.

</summary>

One of the following:

"ip"

<a href="#">Link to this property</a>

"ip\_range"

<a href="#">Link to this property</a>

"asn"

<a href="#">Link to this property</a>

"country"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: optional string

Defines the target value to search for in existing rules: an IP address, an IP address range, or a country code, depending on the provided <code>configuration.target</code>. Notes: You can search for a single IPv4 address, an IP address range with a subnet of ‘/16’ or ‘/24’, or a two-letter ISO-3166-1 alpha-2 country code.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.access_rules%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20configuration%20%3E%20(schema)>)

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

[Link to this property](#)%20firewall.access_rules%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

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

[Link to this property](#)%20firewall.access_rules%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20match%20%3E%20(schema)>)

<details>

<summary>

mode: optional "block"or "challenge"or "whitelist"or 2 more

The action to apply to a matched request.

</summary>

One of the following:

"block"

<a href="#">Link to this property</a>

"challenge"

<a href="#">Link to this property</a>

"whitelist"

<a href="#">Link to this property</a>

"js\_challenge"

<a href="#">Link to this property</a>

"managed\_challenge"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.access_rules%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20mode%20%3E%20(schema)>)

notes: optional string

Defines the string to search for in the notes of existing IP Access rules. Notes: For example, the string ‘attack’ would match IP Access rules with notes ‘Attack 26/02’ and ‘Attack 27/02’. The search is case insensitive.

[Link to this property](#)%20firewall.access_rules%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20notes%20%3E%20(schema)>)

<details>

<summary>

order: optional "configuration.target"or "configuration.value"or "mode"

Defines the field used to sort returned rules.

</summary>

One of the following:

"configuration.target"

<a href="#">Link to this property</a>

"configuration.value"

<a href="#">Link to this property</a>

"mode"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.access_rules%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order%20%3E%20(schema)>)

page: optional number

Defines the requested page within paginated list of results.

[Link to this property](#)%20firewall.access_rules%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Defines the maximum number of results requested.

[Link to this property](#)%20firewall.access_rules%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

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

[Link to this property](#)%20firewall.access_rules%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20firewall.access_rules%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {id, allowed\_modes, configuration, 5 more }

</summary>

id: string

The unique identifier of the IP Access rule.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

allowed\_modes: array of "block"or "challenge"or "whitelist"or 2 more

The available actions that a rule can apply to a matched request.

</summary>

One of the following:

"block"

<a href="#">Link to this property</a>

"challenge"

<a href="#">Link to this property</a>

"whitelist"

<a href="#">Link to this property</a>

"js\_challenge"

<a href="#">Link to this property</a>

"managed\_challenge"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

configuration: <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.access_rules%20%3E%20(model)%20access_rule_ip_configuration%20%3E%20(schema)">AccessRuleIPConfiguration</a> { target, value } or <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.access_rules%20%3E%20(model)%20ipv6_configuration%20%3E%20(schema)">IPV6Configuration</a> { target, value } or <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.access_rules%20%3E%20(model)%20access_rule_cidr_configuration%20%3E%20(schema)">AccessRuleCIDRConfiguration</a> { target, value } or 2 more

The rule configuration.

</summary>

One of the following:

<details>

<summary>

AccessRuleIPConfiguration object {target, value }

</summary>

target: optional "ip"

The configuration target. You must set the target to <code>ip</code> when specifying an IP address in the rule.

<a href="#">Link to this property</a>

value: optional string

The IP address to match. This address will be compared to the IP address of incoming requests.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

IPV6Configuration object {target, value }

</summary>

target: optional "ip6"

The configuration target. You must set the target to <code>ip6</code> when specifying an IPv6 address in the rule.

<a href="#">Link to this property</a>

value: optional string

The IPv6 address to match.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AccessRuleCIDRConfiguration object {target, value }

</summary>

target: optional "ip\_range"

The configuration target. You must set the target to <code>ip_range</code> when specifying an IP address range in the rule.

<a href="#">Link to this property</a>

value: optional string

The IP address range to match. You can only use prefix lengths <code>/16</code> and <code>/24</code> for IPv4 ranges, and prefix lengths <code>/32</code>, <code>/48</code>, and <code>/64</code> for IPv6 ranges.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ASNConfiguration object {target, value }

</summary>

target: optional "asn"

The configuration target. You must set the target to <code>asn</code> when specifying an Autonomous System Number (ASN) in the rule.

<a href="#">Link to this property</a>

value: optional string

The AS number to match.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CountryConfiguration object {target, value }

</summary>

target: optional "country"

The configuration target. You must set the target to <code>country</code> when specifying a country code in the rule.

<a href="#">Link to this property</a>

value: optional string

The two-letter ISO-3166-1 alpha-2 code to match. For more information, refer to <a href="https://developers.cloudflare.com/waf/tools/ip-access-rules/parameters/#country">IP Access rules: Parameters</a>.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

mode: "block"or "challenge"or "whitelist"or 2 more

The action to apply to a matched request.

</summary>

One of the following:

"block"

<a href="#">Link to this property</a>

"challenge"

<a href="#">Link to this property</a>

"whitelist"

<a href="#">Link to this property</a>

"js\_challenge"

<a href="#">Link to this property</a>

"managed\_challenge"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: optional string

The timestamp of when the rule was created.

formatdate-time

<a href="#">Link to this property</a>

modified\_on: optional string

The timestamp of when the rule was last modified.

formatdate-time

<a href="#">Link to this property</a>

notes: optional string

An informative summary of the rule, typically used as a reminder or explanation.

<a href="#">Link to this property</a>

<details>

<summary>

scope: optional object {id, email, type }

All zones owned by the user will have the rule applied.

</summary>

id: optional string

Defines an identifier.

maxLength32

<a href="#">Link to this property</a>

email: optional string

The contact email address of the user.

maxLength90

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "user"or "organization"

Defines the scope of the rule.

</summary>

One of the following:

"user"

<a href="#">Link to this property</a>

"organization"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.access_rules%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Defines whether the API call was successful.

[Link to this property](#)%20firewall.access_rules%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

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

[Link to this property](#)%20firewall.access_rules%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List IP Access rules

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/firewall/access_rules/rules \
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
      "id": "92f17202ed8bd63d69a66b86a49a8f6b",
      "allowed_modes": [
        "whitelist",
        "block",
        "challenge",
        "js_challenge",
        "managed_challenge"
      ],
      "configuration": {
        "target": "ip",
        "value": "198.51.100.4"
      },
      "mode": "challenge",
      "created_on": "2014-01-01T05:20:00.12345Z",
      "modified_on": "2014-01-01T05:20:00.12345Z",
      "notes": "This rule is enabled because of an event that occurred on date X.",
      "scope": {
        "id": "023e105f4ecef8ad9ca31a8372d0c353",
        "email": "user@example.com",
        "type": "user"
      }
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
      "id": "92f17202ed8bd63d69a66b86a49a8f6b",
      "allowed_modes": [
        "whitelist",
        "block",
        "challenge",
        "js_challenge",
        "managed_challenge"
      ],
      "configuration": {
        "target": "ip",
        "value": "198.51.100.4"
      },
      "mode": "challenge",
      "created_on": "2014-01-01T05:20:00.12345Z",
      "modified_on": "2014-01-01T05:20:00.12345Z",
      "notes": "This rule is enabled because of an event that occurred on date X.",
      "scope": {
        "id": "023e105f4ecef8ad9ca31a8372d0c353",
        "email": "user@example.com",
        "type": "user"
      }
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