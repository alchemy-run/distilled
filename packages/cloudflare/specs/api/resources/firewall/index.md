---
title: Firewall
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Firewall

#### FirewallLockdowns

##### [List Zone Lockdown rules](https://developers.cloudflare.com/api/resources/firewall/subresources/lockdowns/methods/list)

GET/zones/{zone\_id}/firewall/lockdowns

##### [Get a Zone Lockdown rule](https://developers.cloudflare.com/api/resources/firewall/subresources/lockdowns/methods/get)

GET/zones/{zone\_id}/firewall/lockdowns/{lock\_downs\_id}

##### [Create a Zone Lockdown rule](https://developers.cloudflare.com/api/resources/firewall/subresources/lockdowns/methods/create)

POST/zones/{zone\_id}/firewall/lockdowns

##### [Update a Zone Lockdown rule](https://developers.cloudflare.com/api/resources/firewall/subresources/lockdowns/methods/update)

PUT/zones/{zone\_id}/firewall/lockdowns/{lock\_downs\_id}

##### [Delete a Zone Lockdown rule](https://developers.cloudflare.com/api/resources/firewall/subresources/lockdowns/methods/delete)

DELETE/zones/{zone\_id}/firewall/lockdowns/{lock\_downs\_id}

##### ModelsExpand Collapse

<details>

<summary>

Configuration = array of <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.lockdowns%20%3E%20(model)%20lockdown_ip_configuration%20%3E%20(schema)">LockdownIPConfiguration</a> { target, value } or <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.lockdowns%20%3E%20(model)%20lockdown_cidr_configuration%20%3E%20(schema)">LockdownCIDRConfiguration</a> { target, value }

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

[Link to this property](#)%20firewall.lockdowns%20%3E%20(model)%20configuration%20%3E%20(schema)>)

<details>

<summary>

Lockdown object {id, configurations, created\_on, 4 more }

</summary>

id: string

The unique identifier of the Zone Lockdown rule.

maxLength32

<a href="#">Link to this property</a>

configurations: <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.lockdowns%20%3E%20(model)%20configuration%20%3E%20(schema)">Configuration</a> { , }

A list of IP addresses or CIDR ranges that will be allowed to access the URLs specified in the Zone Lockdown rule. You can include any number of <code>ip</code> or <code>ip_range</code> configurations.

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

[Link to this property](#)%20firewall.lockdowns%20%3E%20(model)%20lockdown%20%3E%20(schema)>)

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

[Link to this property](#)%20firewall.lockdowns%20%3E%20(model)%20lockdown_cidr_configuration%20%3E%20(schema)>)

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

[Link to this property](#)%20firewall.lockdowns%20%3E%20(model)%20lockdown_ip_configuration%20%3E%20(schema)>)

LockdownURL = string

[Link to this property](#)%20firewall.lockdowns%20%3E%20(model)%20lockdown_url%20%3E%20(schema)>)

<details>

<summary>

LockdownDeleteResponse object {id }

</summary>

id: optional string

The unique identifier of the Zone Lockdown rule.

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.lockdowns%20%3E%20(model)%20lockdown_delete_response%20%3E%20(schema)>)

#### FirewallRules

##### [List firewall rules](https://developers.cloudflare.com/api/resources/firewall/subresources/rules/methods/list)

Deprecated

GET/zones/{zone\_id}/firewall/rules

##### [Get a firewall rule](https://developers.cloudflare.com/api/resources/firewall/subresources/rules/methods/get)

Deprecated

GET/zones/{zone\_id}/firewall/rules/{rule\_id}

##### [Create firewall rules](https://developers.cloudflare.com/api/resources/firewall/subresources/rules/methods/create)

Deprecated

POST/zones/{zone\_id}/firewall/rules

##### [Update a firewall rule](https://developers.cloudflare.com/api/resources/firewall/subresources/rules/methods/update)

Deprecated

PUT/zones/{zone\_id}/firewall/rules/{rule\_id}

##### [Update priority of a firewall rule](https://developers.cloudflare.com/api/resources/firewall/subresources/rules/methods/edit)

Deprecated

PATCH/zones/{zone\_id}/firewall/rules/{rule\_id}

##### [Delete a firewall rule](https://developers.cloudflare.com/api/resources/firewall/subresources/rules/methods/delete)

Deprecated

DELETE/zones/{zone\_id}/firewall/rules/{rule\_id}

##### [Update firewall rules](https://developers.cloudflare.com/api/resources/firewall/subresources/rules/methods/bulk_update)

Deprecated

PUT/zones/{zone\_id}/firewall/rules

##### [Update priority of firewall rules](https://developers.cloudflare.com/api/resources/firewall/subresources/rules/methods/bulk_edit)

Deprecated

PATCH/zones/{zone\_id}/firewall/rules

##### [Delete firewall rules](https://developers.cloudflare.com/api/resources/firewall/subresources/rules/methods/bulk_delete)

Deprecated

DELETE/zones/{zone\_id}/firewall/rules

##### ModelsExpand Collapse

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

[Link to this property](#)%20firewall.rules%20%3E%20(model)%20deleted_filter%20%3E%20(schema)>)

<details>

<summary>

FirewallRule object {id, action, description, 5 more }

</summary>

id: optional string

The unique identifier of the firewall rule.

maxLength32

<a href="#">Link to this property</a>

action: optional <a href="https://developers.cloudflare.com/api/resources/rate_limits#(resource)%20rate_limits%20%3E%20(model)%20action%20%3E%20(schema)">Action</a>

The action to apply to a matched request. The <code>log</code> action is only available on an Enterprise plan.

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

[Link to this property](#)%20firewall.rules%20%3E%20(model)%20firewall_rule%20%3E%20(schema)>)

<details>

<summary>

Product = "zoneLockdown"or "uaBlock"or "bic"or 4 more

A list of products to bypass for a request when using the <code>bypass</code> action.

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

[Link to this property](#)%20firewall.rules%20%3E%20(model)%20product%20%3E%20(schema)>)

#### FirewallAccess Rules

##### [List IP Access rules](https://developers.cloudflare.com/api/resources/firewall/subresources/access_rules/methods/list)

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/firewall/access\_rules/rules

##### [Get an IP Access rule](https://developers.cloudflare.com/api/resources/firewall/subresources/access_rules/methods/get)

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/firewall/access\_rules/rules/{rule\_id}

##### [Create an IP Access rule](https://developers.cloudflare.com/api/resources/firewall/subresources/access_rules/methods/create)

POST/{accounts\_or\_zones}/{account\_or\_zone\_id}/firewall/access\_rules/rules

##### [Update an IP Access rule](https://developers.cloudflare.com/api/resources/firewall/subresources/access_rules/methods/edit)

PATCH/{accounts\_or\_zones}/{account\_or\_zone\_id}/firewall/access\_rules/rules/{rule\_id}

##### [Delete an IP Access rule](https://developers.cloudflare.com/api/resources/firewall/subresources/access_rules/methods/delete)

DELETE/{accounts\_or\_zones}/{account\_or\_zone\_id}/firewall/access\_rules/rules/{rule\_id}

##### ModelsExpand Collapse

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

[Link to this property](#)%20firewall.access_rules%20%3E%20(model)%20access_rule_cidr_configuration%20%3E%20(schema)>)

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

[Link to this property](#)%20firewall.access_rules%20%3E%20(model)%20access_rule_ip_configuration%20%3E%20(schema)>)

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

[Link to this property](#)%20firewall.access_rules%20%3E%20(model)%20asn_configuration%20%3E%20(schema)>)

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

[Link to this property](#)%20firewall.access_rules%20%3E%20(model)%20country_configuration%20%3E%20(schema)>)

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

[Link to this property](#)%20firewall.access_rules%20%3E%20(model)%20ipv6_configuration%20%3E%20(schema)>)

<details>

<summary>

AccessRuleListResponse object {id, allowed\_modes, configuration, 5 more }

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

[Link to this property](#)%20firewall.access_rules%20%3E%20(model)%20access_rule_list_response%20%3E%20(schema)>)

<details>

<summary>

AccessRuleGetResponse object {id, allowed\_modes, configuration, 5 more }

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

[Link to this property](#)%20firewall.access_rules%20%3E%20(model)%20access_rule_get_response%20%3E%20(schema)>)

<details>

<summary>

AccessRuleCreateResponse object {id, allowed\_modes, configuration, 5 more }

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

[Link to this property](#)%20firewall.access_rules%20%3E%20(model)%20access_rule_create_response%20%3E%20(schema)>)

<details>

<summary>

AccessRuleEditResponse object {id, allowed\_modes, configuration, 5 more }

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

[Link to this property](#)%20firewall.access_rules%20%3E%20(model)%20access_rule_edit_response%20%3E%20(schema)>)

<details>

<summary>

AccessRuleDeleteResponse object {id }

</summary>

id: string

Defines an identifier.

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.access_rules%20%3E%20(model)%20access_rule_delete_response%20%3E%20(schema)>)

#### FirewallUA Rules

##### [List User Agent Blocking rules](https://developers.cloudflare.com/api/resources/firewall/subresources/ua_rules/methods/list)

GET/zones/{zone\_id}/firewall/ua\_rules

##### [Get a User Agent Blocking rule](https://developers.cloudflare.com/api/resources/firewall/subresources/ua_rules/methods/get)

GET/zones/{zone\_id}/firewall/ua\_rules/{ua\_rule\_id}

##### [Create a User Agent Blocking rule](https://developers.cloudflare.com/api/resources/firewall/subresources/ua_rules/methods/create)

POST/zones/{zone\_id}/firewall/ua\_rules

##### [Update a User Agent Blocking rule](https://developers.cloudflare.com/api/resources/firewall/subresources/ua_rules/methods/update)

PUT/zones/{zone\_id}/firewall/ua\_rules/{ua\_rule\_id}

##### [Delete a User Agent Blocking rule](https://developers.cloudflare.com/api/resources/firewall/subresources/ua_rules/methods/delete)

DELETE/zones/{zone\_id}/firewall/ua\_rules/{ua\_rule\_id}

##### ModelsExpand Collapse

<details>

<summary>

UARuleListResponse object {id, configuration, description, 2 more }

</summary>

id: optional string

The unique identifier of the User Agent Blocking rule.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

configuration: optional object {target, value }

The configuration object for the current rule.

</summary>

target: optional string

The configuration target for this rule. You must set the target to <code>ua</code> for User Agent Blocking rules.

<a href="#">Link to this property</a>

value: optional string

The exact user agent string to match. This value will be compared to the received <code>User-Agent</code> HTTP header value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: optional string

An informative summary of the rule.

maxLength1024

<a href="#">Link to this property</a>

<details>

<summary>

mode: optional "block"or "challenge"or "js\_challenge"or "managed\_challenge"

The action to apply to a matched request.

maxLength12

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

</details>

<a href="#">Link to this property</a>

paused: optional boolean

When true, indicates that the rule is currently paused.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.ua_rules%20%3E%20(model)%20ua_rule_list_response%20%3E%20(schema)>)

<details>

<summary>

UARuleGetResponse object {id, configuration, description, 2 more }

</summary>

id: optional string

The unique identifier of the User Agent Blocking rule.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

configuration: optional object {target, value }

The configuration object for the current rule.

</summary>

target: optional string

The configuration target for this rule. You must set the target to <code>ua</code> for User Agent Blocking rules.

<a href="#">Link to this property</a>

value: optional string

The exact user agent string to match. This value will be compared to the received <code>User-Agent</code> HTTP header value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: optional string

An informative summary of the rule.

maxLength1024

<a href="#">Link to this property</a>

<details>

<summary>

mode: optional "block"or "challenge"or "js\_challenge"or "managed\_challenge"

The action to apply to a matched request.

maxLength12

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

</details>

<a href="#">Link to this property</a>

paused: optional boolean

When true, indicates that the rule is currently paused.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.ua_rules%20%3E%20(model)%20ua_rule_get_response%20%3E%20(schema)>)

<details>

<summary>

UARuleCreateResponse object {id, configuration, description, 2 more }

</summary>

id: optional string

The unique identifier of the User Agent Blocking rule.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

configuration: optional object {target, value }

The configuration object for the current rule.

</summary>

target: optional string

The configuration target for this rule. You must set the target to <code>ua</code> for User Agent Blocking rules.

<a href="#">Link to this property</a>

value: optional string

The exact user agent string to match. This value will be compared to the received <code>User-Agent</code> HTTP header value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: optional string

An informative summary of the rule.

maxLength1024

<a href="#">Link to this property</a>

<details>

<summary>

mode: optional "block"or "challenge"or "js\_challenge"or "managed\_challenge"

The action to apply to a matched request.

maxLength12

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

</details>

<a href="#">Link to this property</a>

paused: optional boolean

When true, indicates that the rule is currently paused.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.ua_rules%20%3E%20(model)%20ua_rule_create_response%20%3E%20(schema)>)

<details>

<summary>

UARuleUpdateResponse object {id, configuration, description, 2 more }

</summary>

id: optional string

The unique identifier of the User Agent Blocking rule.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

configuration: optional object {target, value }

The configuration object for the current rule.

</summary>

target: optional string

The configuration target for this rule. You must set the target to <code>ua</code> for User Agent Blocking rules.

<a href="#">Link to this property</a>

value: optional string

The exact user agent string to match. This value will be compared to the received <code>User-Agent</code> HTTP header value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: optional string

An informative summary of the rule.

maxLength1024

<a href="#">Link to this property</a>

<details>

<summary>

mode: optional "block"or "challenge"or "js\_challenge"or "managed\_challenge"

The action to apply to a matched request.

maxLength12

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

</details>

<a href="#">Link to this property</a>

paused: optional boolean

When true, indicates that the rule is currently paused.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.ua_rules%20%3E%20(model)%20ua_rule_update_response%20%3E%20(schema)>)

<details>

<summary>

UARuleDeleteResponse object {id, configuration, description, 2 more }

</summary>

id: optional string

The unique identifier of the User Agent Blocking rule.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

configuration: optional object {target, value }

The configuration object for the current rule.

</summary>

target: optional string

The configuration target for this rule. You must set the target to <code>ua</code> for User Agent Blocking rules.

<a href="#">Link to this property</a>

value: optional string

The exact user agent string to match. This value will be compared to the received <code>User-Agent</code> HTTP header value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: optional string

An informative summary of the rule.

maxLength1024

<a href="#">Link to this property</a>

<details>

<summary>

mode: optional "block"or "challenge"or "js\_challenge"or "managed\_challenge"

The action to apply to a matched request.

maxLength12

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

</details>

<a href="#">Link to this property</a>

paused: optional boolean

When true, indicates that the rule is currently paused.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.ua_rules%20%3E%20(model)%20ua_rule_delete_response%20%3E%20(schema)>)

#### FirewallWAF

#### FirewallWAFOverrides

##### [List WAF overrides](https://developers.cloudflare.com/api/resources/firewall/subresources/waf/subresources/overrides/methods/list)

Deprecated

GET/zones/{zone\_id}/firewall/waf/overrides

##### [Get a WAF override](https://developers.cloudflare.com/api/resources/firewall/subresources/waf/subresources/overrides/methods/get)

Deprecated

GET/zones/{zone\_id}/firewall/waf/overrides/{overrides\_id}

##### [Create a WAF override](https://developers.cloudflare.com/api/resources/firewall/subresources/waf/subresources/overrides/methods/create)

Deprecated

POST/zones/{zone\_id}/firewall/waf/overrides

##### [Update WAF override](https://developers.cloudflare.com/api/resources/firewall/subresources/waf/subresources/overrides/methods/update)

Deprecated

PUT/zones/{zone\_id}/firewall/waf/overrides/{overrides\_id}

##### [Delete a WAF override](https://developers.cloudflare.com/api/resources/firewall/subresources/waf/subresources/overrides/methods/delete)

Deprecated

DELETE/zones/{zone\_id}/firewall/waf/overrides/{overrides\_id}

##### ModelsExpand Collapse

<details>

<summary>

Override object {id, description, groups, 5 more }

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

rewrite\_action: optional <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.waf.overrides%20%3E%20(model)%20rewrite_action%20%3E%20(schema)">RewriteAction</a> { block, challenge, default, 2 more }

Specifies that, when a WAF rule matches, its configured action will be replaced by the action configured in this object.

<a href="#">Link to this property</a>

rules: optional <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.waf.overrides%20%3E%20(model)%20waf_rule%20%3E%20(schema)">WAFRule</a> { , , , 2 more }

An object that allows you to override the action of specific WAF rules. Each key of this object must be the ID of a WAF rule, and each value must be a valid WAF action. Unless you are disabling a rule, ensure that you also enable the rule group that this WAF rule belongs to. When creating a new URI-based WAF override, you must provide a <code>groups</code> object or a <code>rules</code> object.

<a href="#">Link to this property</a>

urls: optional array of <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.waf.overrides%20%3E%20(model)%20override_url%20%3E%20(schema)">OverrideURL</a>

The URLs to include in the current WAF override. You can use wildcards. Each entered URL will be escaped before use, which means you can only use simple wildcard patterns.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.waf.overrides%20%3E%20(model)%20override%20%3E%20(schema)>)

OverrideURL = string

[Link to this property](#)%20firewall.waf.overrides%20%3E%20(model)%20override_url%20%3E%20(schema)>)

<details>

<summary>

RewriteAction object {block, challenge, default, 2 more }

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

[Link to this property](#)%20firewall.waf.overrides%20%3E%20(model)%20rewrite_action%20%3E%20(schema)>)

<details>

<summary>

WAFRule = map\["challenge"or "block"or "simulate"or 2 more]

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

[Link to this property](#)%20firewall.waf.overrides%20%3E%20(model)%20waf_rule%20%3E%20(schema)>)

<details>

<summary>

OverrideDeleteResponse object {id }

</summary>

id: optional string

The unique identifier of the WAF override.

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.waf.overrides%20%3E%20(model)%20override_delete_response%20%3E%20(schema)>)

#### FirewallWAFPackages

##### [List WAF packages](https://developers.cloudflare.com/api/resources/firewall/subresources/waf/subresources/packages/methods/list)

Deprecated

GET/zones/{zone\_id}/firewall/waf/packages

##### [Get a WAF package](https://developers.cloudflare.com/api/resources/firewall/subresources/waf/subresources/packages/methods/get)

Deprecated

GET/zones/{zone\_id}/firewall/waf/packages/{package\_id}

##### ModelsExpand Collapse

PackageListResponse = unknown

[Link to this property](#)%20firewall.waf.packages%20%3E%20(model)%20package_list_response%20%3E%20(schema)>)

<details>

<summary>

PackageGetResponse = object {errors, messages, result, success } or object {result }

</summary>

One of the following:

<details>

<summary>

FirewallAPIResponseSingle object {errors, messages, result, success }

</summary>

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

<a href="#">Link to this property</a>

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

<a href="#">Link to this property</a>

<details>

<summary>

result: unknownor string

</summary>

One of the following:

unknown

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: true

Defines whether the API call was successful.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Result object {result }

</summary>

result: optional unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.waf.packages%20%3E%20(model)%20package_get_response%20%3E%20(schema)>)

#### FirewallWAFPackagesGroups

##### [List WAF rule groups](https://developers.cloudflare.com/api/resources/firewall/subresources/waf/subresources/packages/subresources/groups/methods/list)

Deprecated

GET/zones/{zone\_id}/firewall/waf/packages/{package\_id}/groups

##### [Get a WAF rule group](https://developers.cloudflare.com/api/resources/firewall/subresources/waf/subresources/packages/subresources/groups/methods/get)

Deprecated

GET/zones/{zone\_id}/firewall/waf/packages/{package\_id}/groups/{group\_id}

##### [Update a WAF rule group](https://developers.cloudflare.com/api/resources/firewall/subresources/waf/subresources/packages/subresources/groups/methods/edit)

Deprecated

PATCH/zones/{zone\_id}/firewall/waf/packages/{package\_id}/groups/{group\_id}

##### ModelsExpand Collapse

<details>

<summary>

Group object {id, description, mode, 5 more }

</summary>

id: string

Defines the unique identifier of the rule group.

maxLength32

<a href="#">Link to this property</a>

description: string

Defines an informative summary of what the rule group does.

<a href="#">Link to this property</a>

<details>

<summary>

mode: "on"or "off"

Defines the state of the rules contained in the rule group. When <code>on</code>, the rules in the group are configurable/usable.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

Defines the name of the rule group.

<a href="#">Link to this property</a>

rules\_count: number

Defines the number of rules in the current rule group.

<a href="#">Link to this property</a>

<details>

<summary>

allowed\_modes: optional array of "on"or "off"

Defines the available states for the rule group.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_rules\_count: optional number

Defines the number of rules within the group that have been modified from their default configuration.

<a href="#">Link to this property</a>

package\_id: optional string

Defines the unique identifier of a WAF package.

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.waf.packages.groups%20%3E%20(model)%20group%20%3E%20(schema)>)

<details>

<summary>

GroupGetResponse = unknownor string

</summary>

One of the following:

unknown

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.waf.packages.groups%20%3E%20(model)%20group_get_response%20%3E%20(schema)>)

<details>

<summary>

GroupEditResponse = unknownor string

</summary>

One of the following:

unknown

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.waf.packages.groups%20%3E%20(model)%20group_edit_response%20%3E%20(schema)>)

#### FirewallWAFPackagesRules

##### [List WAF rules](https://developers.cloudflare.com/api/resources/firewall/subresources/waf/subresources/packages/subresources/rules/methods/list)

Deprecated

GET/zones/{zone\_id}/firewall/waf/packages/{package\_id}/rules

##### [Get a WAF rule](https://developers.cloudflare.com/api/resources/firewall/subresources/waf/subresources/packages/subresources/rules/methods/get)

Deprecated

GET/zones/{zone\_id}/firewall/waf/packages/{package\_id}/rules/{rule\_id}

##### [Update a WAF rule](https://developers.cloudflare.com/api/resources/firewall/subresources/waf/subresources/packages/subresources/rules/methods/edit)

Deprecated

PATCH/zones/{zone\_id}/firewall/waf/packages/{package\_id}/rules/{rule\_id}

##### ModelsExpand Collapse

<details>

<summary>

AllowedModesAnomaly = "on"or "off"

Defines the mode anomaly. When set to <code>on</code>, the current WAF rule will be used when evaluating the request. Applies to anomaly detection WAF rules.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.waf.packages.rules%20%3E%20(model)%20allowed_modes_anomaly%20%3E%20(schema)>)

<details>

<summary>

WAFRuleGroup object {id, name }

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

[Link to this property](#)%20firewall.waf.packages.rules%20%3E%20(model)%20waf_rule_group%20%3E%20(schema)>)

<details>

<summary>

RuleListResponse = object {id, allowed\_modes, description, 4 more } or object {id, allowed\_modes, default\_mode, 5 more } or object {id, allowed\_modes, description, 4 more }

When triggered, anomaly detection WAF rules contribute to an overall threat score that will determine if a request is considered malicious. You can configure the total scoring threshold through the ‘sensitivity’ property of the WAF package.

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

group: <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.waf.packages.rules%20%3E%20(model)%20waf_rule_group%20%3E%20(schema)">WAFRuleGroup</a> { id, name }

Defines the rule group to which the current WAF rule belongs.

<a href="#">Link to this property</a>

mode: <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.waf.packages.rules%20%3E%20(model)%20allowed_modes_anomaly%20%3E%20(schema)">AllowedModesAnomaly</a>

Defines the mode anomaly. When set to <code>on</code>, the current WAF rule will be used when evaluating the request. Applies to anomaly detection WAF rules.

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

group: <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.waf.packages.rules%20%3E%20(model)%20waf_rule_group%20%3E%20(schema)">WAFRuleGroup</a> { id, name }

Defines the rule group to which the current WAF rule belongs.

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

group: <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.waf.packages.rules%20%3E%20(model)%20waf_rule_group%20%3E%20(schema)">WAFRuleGroup</a> { id, name }

Defines the rule group to which the current WAF rule belongs.

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

[Link to this property](#)%20firewall.waf.packages.rules%20%3E%20(model)%20rule_list_response%20%3E%20(schema)>)

<details>

<summary>

RuleGetResponse = unknownor string

</summary>

One of the following:

unknown

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20firewall.waf.packages.rules%20%3E%20(model)%20rule_get_response%20%3E%20(schema)>)

<details>

<summary>

RuleEditResponse = object {id, allowed\_modes, description, 4 more } or object {id, allowed\_modes, default\_mode, 5 more } or object {id, allowed\_modes, description, 4 more }

When triggered, anomaly detection WAF rules contribute to an overall threat score that will determine if a request is considered malicious. You can configure the total scoring threshold through the ‘sensitivity’ property of the WAF package.

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

group: <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.waf.packages.rules%20%3E%20(model)%20waf_rule_group%20%3E%20(schema)">WAFRuleGroup</a> { id, name }

Defines the rule group to which the current WAF rule belongs.

<a href="#">Link to this property</a>

mode: <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.waf.packages.rules%20%3E%20(model)%20allowed_modes_anomaly%20%3E%20(schema)">AllowedModesAnomaly</a>

Defines the mode anomaly. When set to <code>on</code>, the current WAF rule will be used when evaluating the request. Applies to anomaly detection WAF rules.

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

group: <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.waf.packages.rules%20%3E%20(model)%20waf_rule_group%20%3E%20(schema)">WAFRuleGroup</a> { id, name }

Defines the rule group to which the current WAF rule belongs.

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

group: <a href="https://developers.cloudflare.com/api/resources/firewall#(resource)%20firewall.waf.packages.rules%20%3E%20(model)%20waf_rule_group%20%3E%20(schema)">WAFRuleGroup</a> { id, name }

Defines the rule group to which the current WAF rule belongs.

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

[Link to this property](#)%20firewall.waf.packages.rules%20%3E%20(model)%20rule_edit_response%20%3E%20(schema)>)