---
title: Rules
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Firewall](https://developers.cloudflare.com/api/resources/firewall)

[WAF](https://developers.cloudflare.com/api/resources/firewall/subresources/waf)

[Packages](https://developers.cloudflare.com/api/resources/firewall/subresources/waf/subresources/packages)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Rules

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