---
title: UA Rules
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Firewall](https://developers.cloudflare.com/api/resources/firewall)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# UA Rules

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