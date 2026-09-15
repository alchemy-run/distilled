---
title: WAF
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Firewall](https://developers.cloudflare.com/api/resources/firewall)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# WAF

#### WAFOverrides

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

#### WAFPackages

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

#### WAFPackagesGroups

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

#### WAFPackagesRules

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