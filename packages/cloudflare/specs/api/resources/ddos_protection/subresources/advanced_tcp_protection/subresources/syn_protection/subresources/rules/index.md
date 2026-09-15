---
title: Rules
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[DDoS Protection](https://developers.cloudflare.com/api/resources/ddos_protection)

[Advanced TCP Protection](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection)

[SYN Protection](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/syn_protection)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Rules

##### [List all SYN Protection rules.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/syn_protection/subresources/rules/methods/list)

GET/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/syn\_protection/rules

##### [Create SYN Protection rule.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/syn_protection/subresources/rules/methods/create)

POST/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/syn\_protection/rules

##### [Delete all SYN Protection rules.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/syn_protection/subresources/rules/methods/bulk_delete)

DELETE/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/syn\_protection/rules

##### ModelsExpand Collapse

<details>

<summary>

RuleListResponse object {id, burst\_sensitivity, created\_on, 6 more }

</summary>

id: string

The unique ID of the SYN Protection rule.

<a href="#">Link to this property</a>

burst\_sensitivity: string

The burst sensitivity. Must be one of ‘low’, ‘medium’, ‘high’.

<a href="#">Link to this property</a>

created\_on: string

The creation timestamp of the SYN Protection rule.

formatdate-time

<a href="#">Link to this property</a>

mitigation\_type: string

The type of mitigation for SYN Protection. Must be one of ‘challenge’ or ‘retransmit’.

<a href="#">Link to this property</a>

mode: string

The mode for SYN Protection. Must be one of ‘enabled’, ‘disabled’, ‘monitoring’.

<a href="#">Link to this property</a>

modified\_on: string

The last modification timestamp of the SYN Protection rule.

formatdate-time

<a href="#">Link to this property</a>

name: string

The name of the SYN Protection rule. Value is relative to the ‘scope’ setting. For ‘global’ scope, name should be ‘global’. For either the ‘region’ or ‘datacenter’ scope, name should be the actual name of the region or datacenter, e.g., ‘wnam’ or ‘lax’.

<a href="#">Link to this property</a>

rate\_sensitivity: string

The rate sensitivity. Must be one of ‘low’, ‘medium’, ‘high’.

<a href="#">Link to this property</a>

scope: string

The scope for the SYN Protection rule. Must be one of ‘global’, ‘region’, or ‘datacenter’.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.syn_protection.rules%20%3E%20(model)%20rule_list_response%20%3E%20(schema)>)

<details>

<summary>

RuleCreateResponse object {id, burst\_sensitivity, created\_on, 6 more }

</summary>

id: string

The unique ID of the SYN Protection rule.

<a href="#">Link to this property</a>

burst\_sensitivity: string

The burst sensitivity. Must be one of ‘low’, ‘medium’, ‘high’.

<a href="#">Link to this property</a>

created\_on: string

The creation timestamp of the SYN Protection rule.

formatdate-time

<a href="#">Link to this property</a>

mitigation\_type: string

The type of mitigation for SYN Protection. Must be one of ‘challenge’ or ‘retransmit’.

<a href="#">Link to this property</a>

mode: string

The mode for SYN Protection. Must be one of ‘enabled’, ‘disabled’, ‘monitoring’.

<a href="#">Link to this property</a>

modified\_on: string

The last modification timestamp of the SYN Protection rule.

formatdate-time

<a href="#">Link to this property</a>

name: string

The name of the SYN Protection rule. Value is relative to the ‘scope’ setting. For ‘global’ scope, name should be ‘global’. For either the ‘region’ or ‘datacenter’ scope, name should be the actual name of the region or datacenter, e.g., ‘wnam’ or ‘lax’.

<a href="#">Link to this property</a>

rate\_sensitivity: string

The rate sensitivity. Must be one of ‘low’, ‘medium’, ‘high’.

<a href="#">Link to this property</a>

scope: string

The scope for the SYN Protection rule. Must be one of ‘global’, ‘region’, or ‘datacenter’.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.syn_protection.rules%20%3E%20(model)%20rule_create_response%20%3E%20(schema)>)

<details>

<summary>

RuleBulkDeleteResponse object {errors, messages, success }

</summary>

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

<a href="#">Link to this property</a>

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

<a href="#">Link to this property</a>

success: true

Whether the API call was successful.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.syn_protection.rules%20%3E%20(model)%20rule_bulk_delete_response%20%3E%20(schema)>)

#### RulesItems

##### [Get SYN Protection rule.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/syn_protection/subresources/rules/subresources/items/methods/get)

GET/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/syn\_protection/rules/{rule\_id}

##### [Update SYN Protection rule.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/syn_protection/subresources/rules/subresources/items/methods/edit)

PATCH/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/syn\_protection/rules/{rule\_id}

##### [Delete SYN Protection rule.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/syn_protection/subresources/rules/subresources/items/methods/delete)

DELETE/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/syn\_protection/rules/{rule\_id}

##### ModelsExpand Collapse

<details>

<summary>

ItemGetResponse object {id, burst\_sensitivity, created\_on, 6 more }

</summary>

id: string

The unique ID of the SYN Protection rule.

<a href="#">Link to this property</a>

burst\_sensitivity: string

The burst sensitivity. Must be one of ‘low’, ‘medium’, ‘high’.

<a href="#">Link to this property</a>

created\_on: string

The creation timestamp of the SYN Protection rule.

formatdate-time

<a href="#">Link to this property</a>

mitigation\_type: string

The type of mitigation for SYN Protection. Must be one of ‘challenge’ or ‘retransmit’.

<a href="#">Link to this property</a>

mode: string

The mode for SYN Protection. Must be one of ‘enabled’, ‘disabled’, ‘monitoring’.

<a href="#">Link to this property</a>

modified\_on: string

The last modification timestamp of the SYN Protection rule.

formatdate-time

<a href="#">Link to this property</a>

name: string

The name of the SYN Protection rule. Value is relative to the ‘scope’ setting. For ‘global’ scope, name should be ‘global’. For either the ‘region’ or ‘datacenter’ scope, name should be the actual name of the region or datacenter, e.g., ‘wnam’ or ‘lax’.

<a href="#">Link to this property</a>

rate\_sensitivity: string

The rate sensitivity. Must be one of ‘low’, ‘medium’, ‘high’.

<a href="#">Link to this property</a>

scope: string

The scope for the SYN Protection rule. Must be one of ‘global’, ‘region’, or ‘datacenter’.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.syn_protection.rules.items%20%3E%20(model)%20item_get_response%20%3E%20(schema)>)

<details>

<summary>

ItemEditResponse object {id, burst\_sensitivity, created\_on, 6 more }

</summary>

id: string

The unique ID of the SYN Protection rule.

<a href="#">Link to this property</a>

burst\_sensitivity: string

The burst sensitivity. Must be one of ‘low’, ‘medium’, ‘high’.

<a href="#">Link to this property</a>

created\_on: string

The creation timestamp of the SYN Protection rule.

formatdate-time

<a href="#">Link to this property</a>

mitigation\_type: string

The type of mitigation for SYN Protection. Must be one of ‘challenge’ or ‘retransmit’.

<a href="#">Link to this property</a>

mode: string

The mode for SYN Protection. Must be one of ‘enabled’, ‘disabled’, ‘monitoring’.

<a href="#">Link to this property</a>

modified\_on: string

The last modification timestamp of the SYN Protection rule.

formatdate-time

<a href="#">Link to this property</a>

name: string

The name of the SYN Protection rule. Value is relative to the ‘scope’ setting. For ‘global’ scope, name should be ‘global’. For either the ‘region’ or ‘datacenter’ scope, name should be the actual name of the region or datacenter, e.g., ‘wnam’ or ‘lax’.

<a href="#">Link to this property</a>

rate\_sensitivity: string

The rate sensitivity. Must be one of ‘low’, ‘medium’, ‘high’.

<a href="#">Link to this property</a>

scope: string

The scope for the SYN Protection rule. Must be one of ‘global’, ‘region’, or ‘datacenter’.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.syn_protection.rules.items%20%3E%20(model)%20item_edit_response%20%3E%20(schema)>)

<details>

<summary>

ItemDeleteResponse object {errors, messages, success }

</summary>

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

<a href="#">Link to this property</a>

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

<a href="#">Link to this property</a>

success: true

Whether the API call was successful.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.syn_protection.rules.items%20%3E%20(model)%20item_delete_response%20%3E%20(schema)>)