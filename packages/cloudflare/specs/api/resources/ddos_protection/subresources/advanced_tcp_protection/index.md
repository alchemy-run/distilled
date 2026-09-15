---
title: Advanced TCP Protection
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[DDoS Protection](https://developers.cloudflare.com/api/resources/ddos_protection)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Advanced TCP Protection

#### Advanced TCP ProtectionAllowlist

##### [List all allowlist prefixes.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/allowlist/methods/list)

GET/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/allowlist

##### [Create allowlist prefix.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/allowlist/methods/create)

POST/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/allowlist

##### [Delete all allowlist prefixes.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/allowlist/methods/bulk_delete)

DELETE/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/allowlist

##### ModelsExpand Collapse

<details>

<summary>

AllowlistListResponse object {id, comment, created\_on, 3 more }

</summary>

id: string

The unique ID of the allowlist prefix.

<a href="#">Link to this property</a>

comment: string

An optional comment describing the allowlist prefix.

<a href="#">Link to this property</a>

created\_on: string

The creation timestamp of the allowlist prefix.

formatdate-time

<a href="#">Link to this property</a>

enabled: boolean

Whether to enable the allowlist prefix into effect. Defaults to false.

<a href="#">Link to this property</a>

modified\_on: string

The last modification timestamp of the allowlist prefix.

formatdate-time

<a href="#">Link to this property</a>

prefix: string

The allowlist prefix in CIDR format.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.allowlist%20%3E%20(model)%20allowlist_list_response%20%3E%20(schema)>)

<details>

<summary>

AllowlistCreateResponse object {id, comment, created\_on, 3 more }

</summary>

id: string

The unique ID of the allowlist prefix.

<a href="#">Link to this property</a>

comment: string

An optional comment describing the allowlist prefix.

<a href="#">Link to this property</a>

created\_on: string

The creation timestamp of the allowlist prefix.

formatdate-time

<a href="#">Link to this property</a>

enabled: boolean

Whether to enable the allowlist prefix into effect. Defaults to false.

<a href="#">Link to this property</a>

modified\_on: string

The last modification timestamp of the allowlist prefix.

formatdate-time

<a href="#">Link to this property</a>

prefix: string

The allowlist prefix in CIDR format.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.allowlist%20%3E%20(model)%20allowlist_create_response%20%3E%20(schema)>)

<details>

<summary>

AllowlistBulkDeleteResponse object {errors, messages, success }

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

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.allowlist%20%3E%20(model)%20allowlist_bulk_delete_response%20%3E%20(schema)>)

#### Advanced TCP ProtectionAllowlistItems

##### [Get allowlist prefix.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/allowlist/subresources/items/methods/get)

GET/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/allowlist/{prefix\_id}

##### [Update allowlist prefix.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/allowlist/subresources/items/methods/edit)

PATCH/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/allowlist/{prefix\_id}

##### [Delete allowlist prefix.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/allowlist/subresources/items/methods/delete)

DELETE/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/allowlist/{prefix\_id}

##### ModelsExpand Collapse

<details>

<summary>

ItemGetResponse object {id, comment, created\_on, 3 more }

</summary>

id: string

The unique ID of the allowlist prefix.

<a href="#">Link to this property</a>

comment: string

An optional comment describing the allowlist prefix.

<a href="#">Link to this property</a>

created\_on: string

The creation timestamp of the allowlist prefix.

formatdate-time

<a href="#">Link to this property</a>

enabled: boolean

Whether to enable the allowlist prefix into effect. Defaults to false.

<a href="#">Link to this property</a>

modified\_on: string

The last modification timestamp of the allowlist prefix.

formatdate-time

<a href="#">Link to this property</a>

prefix: string

The allowlist prefix in CIDR format.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.allowlist.items%20%3E%20(model)%20item_get_response%20%3E%20(schema)>)

<details>

<summary>

ItemEditResponse object {id, comment, created\_on, 3 more }

</summary>

id: string

The unique ID of the allowlist prefix.

<a href="#">Link to this property</a>

comment: string

An optional comment describing the allowlist prefix.

<a href="#">Link to this property</a>

created\_on: string

The creation timestamp of the allowlist prefix.

formatdate-time

<a href="#">Link to this property</a>

enabled: boolean

Whether to enable the allowlist prefix into effect. Defaults to false.

<a href="#">Link to this property</a>

modified\_on: string

The last modification timestamp of the allowlist prefix.

formatdate-time

<a href="#">Link to this property</a>

prefix: string

The allowlist prefix in CIDR format.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.allowlist.items%20%3E%20(model)%20item_edit_response%20%3E%20(schema)>)

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

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.allowlist.items%20%3E%20(model)%20item_delete_response%20%3E%20(schema)>)

#### Advanced TCP ProtectionPrefixes

##### [List all prefixes.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/prefixes/methods/list)

GET/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/prefixes

##### [Create prefix.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/prefixes/methods/create)

POST/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/prefixes

##### [Delete all prefixes.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/prefixes/methods/bulk_delete)

DELETE/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/prefixes

##### [Create multiple prefixes.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/prefixes/methods/bulk_create)

POST/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/prefixes/bulk

##### ModelsExpand Collapse

<details>

<summary>

PrefixListResponse object {id, comment, created\_on, 3 more }

</summary>

id: string

The unique ID of the prefix.

<a href="#">Link to this property</a>

comment: string

A comment describing the prefix.

<a href="#">Link to this property</a>

created\_on: string

The creation timestamp of the prefix.

formatdate-time

<a href="#">Link to this property</a>

excluded: boolean

Whether to exclude the prefix from protection.

<a href="#">Link to this property</a>

modified\_on: string

The last modification timestamp of the prefix.

formatdate-time

<a href="#">Link to this property</a>

prefix: string

The prefix in CIDR format.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.prefixes%20%3E%20(model)%20prefix_list_response%20%3E%20(schema)>)

<details>

<summary>

PrefixCreateResponse object {id, comment, created\_on, 3 more }

</summary>

id: string

The unique ID of the prefix.

<a href="#">Link to this property</a>

comment: string

A comment describing the prefix.

<a href="#">Link to this property</a>

created\_on: string

The creation timestamp of the prefix.

formatdate-time

<a href="#">Link to this property</a>

excluded: boolean

Whether to exclude the prefix from protection.

<a href="#">Link to this property</a>

modified\_on: string

The last modification timestamp of the prefix.

formatdate-time

<a href="#">Link to this property</a>

prefix: string

The prefix in CIDR format.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.prefixes%20%3E%20(model)%20prefix_create_response%20%3E%20(schema)>)

<details>

<summary>

PrefixBulkDeleteResponse object {errors, messages, success }

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

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.prefixes%20%3E%20(model)%20prefix_bulk_delete_response%20%3E%20(schema)>)

<details>

<summary>

PrefixBulkCreateResponse object {id, comment, created\_on, 3 more }

</summary>

id: string

The unique ID of the prefix.

<a href="#">Link to this property</a>

comment: string

A comment describing the prefix.

<a href="#">Link to this property</a>

created\_on: string

The creation timestamp of the prefix.

formatdate-time

<a href="#">Link to this property</a>

excluded: boolean

Whether to exclude the prefix from protection.

<a href="#">Link to this property</a>

modified\_on: string

The last modification timestamp of the prefix.

formatdate-time

<a href="#">Link to this property</a>

prefix: string

The prefix in CIDR format.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.prefixes%20%3E%20(model)%20prefix_bulk_create_response%20%3E%20(schema)>)

#### Advanced TCP ProtectionPrefixesItems

##### [Get prefix.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/prefixes/subresources/items/methods/get)

GET/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/prefixes/{prefix\_id}

##### [Update prefix.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/prefixes/subresources/items/methods/edit)

PATCH/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/prefixes/{prefix\_id}

##### [Delete prefix.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/prefixes/subresources/items/methods/delete)

DELETE/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/prefixes/{prefix\_id}

##### ModelsExpand Collapse

<details>

<summary>

ItemGetResponse object {id, comment, created\_on, 3 more }

</summary>

id: string

The unique ID of the prefix.

<a href="#">Link to this property</a>

comment: string

A comment describing the prefix.

<a href="#">Link to this property</a>

created\_on: string

The creation timestamp of the prefix.

formatdate-time

<a href="#">Link to this property</a>

excluded: boolean

Whether to exclude the prefix from protection.

<a href="#">Link to this property</a>

modified\_on: string

The last modification timestamp of the prefix.

formatdate-time

<a href="#">Link to this property</a>

prefix: string

The prefix in CIDR format.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.prefixes.items%20%3E%20(model)%20item_get_response%20%3E%20(schema)>)

<details>

<summary>

ItemEditResponse object {id, comment, created\_on, 3 more }

</summary>

id: string

The unique ID of the prefix.

<a href="#">Link to this property</a>

comment: string

A comment describing the prefix.

<a href="#">Link to this property</a>

created\_on: string

The creation timestamp of the prefix.

formatdate-time

<a href="#">Link to this property</a>

excluded: boolean

Whether to exclude the prefix from protection.

<a href="#">Link to this property</a>

modified\_on: string

The last modification timestamp of the prefix.

formatdate-time

<a href="#">Link to this property</a>

prefix: string

The prefix in CIDR format.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.prefixes.items%20%3E%20(model)%20item_edit_response%20%3E%20(schema)>)

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

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.prefixes.items%20%3E%20(model)%20item_delete_response%20%3E%20(schema)>)

#### Advanced TCP ProtectionSYN Protection

#### Advanced TCP ProtectionSYN ProtectionFilters

##### [List all SYN Protection filters.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/syn_protection/subresources/filters/methods/list)

GET/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/syn\_protection/filters

##### [Create a SYN Protection filter.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/syn_protection/subresources/filters/methods/create)

POST/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/syn\_protection/filters

##### [Delete all SYN Protection filters.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/syn_protection/subresources/filters/methods/bulk_delete)

DELETE/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/syn\_protection/filters

##### ModelsExpand Collapse

<details>

<summary>

FilterListResponse object {id, created\_on, expression, 2 more }

</summary>

id: string

The unique ID of the expression filter.

<a href="#">Link to this property</a>

created\_on: string

The creation timestamp of the expression filter.

formatdate-time

<a href="#">Link to this property</a>

expression: string

The filter expression.

<a href="#">Link to this property</a>

mode: string

The filter’s mode. Must be one of ‘enabled’, ‘disabled’, ‘monitoring’.

<a href="#">Link to this property</a>

modified\_on: string

The last modification timestamp of the expression filter.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.syn_protection.filters%20%3E%20(model)%20filter_list_response%20%3E%20(schema)>)

<details>

<summary>

FilterCreateResponse object {id, created\_on, expression, 2 more }

</summary>

id: string

The unique ID of the expression filter.

<a href="#">Link to this property</a>

created\_on: string

The creation timestamp of the expression filter.

formatdate-time

<a href="#">Link to this property</a>

expression: string

The filter expression.

<a href="#">Link to this property</a>

mode: string

The filter’s mode. Must be one of ‘enabled’, ‘disabled’, ‘monitoring’.

<a href="#">Link to this property</a>

modified\_on: string

The last modification timestamp of the expression filter.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.syn_protection.filters%20%3E%20(model)%20filter_create_response%20%3E%20(schema)>)

<details>

<summary>

FilterBulkDeleteResponse object {errors, messages, success }

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

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.syn_protection.filters%20%3E%20(model)%20filter_bulk_delete_response%20%3E%20(schema)>)

#### Advanced TCP ProtectionSYN ProtectionFiltersItems

##### [Get SYN Protection filter.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/syn_protection/subresources/filters/subresources/items/methods/get)

GET/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/syn\_protection/filters/{filter\_id}

##### [Update SYN Protection filter.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/syn_protection/subresources/filters/subresources/items/methods/edit)

PATCH/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/syn\_protection/filters/{filter\_id}

##### [Delete SYN Protection filter.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/syn_protection/subresources/filters/subresources/items/methods/delete)

DELETE/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/syn\_protection/filters/{filter\_id}

##### ModelsExpand Collapse

<details>

<summary>

ItemGetResponse object {id, created\_on, expression, 2 more }

</summary>

id: string

The unique ID of the expression filter.

<a href="#">Link to this property</a>

created\_on: string

The creation timestamp of the expression filter.

formatdate-time

<a href="#">Link to this property</a>

expression: string

The filter expression.

<a href="#">Link to this property</a>

mode: string

The filter’s mode. Must be one of ‘enabled’, ‘disabled’, ‘monitoring’.

<a href="#">Link to this property</a>

modified\_on: string

The last modification timestamp of the expression filter.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.syn_protection.filters.items%20%3E%20(model)%20item_get_response%20%3E%20(schema)>)

<details>

<summary>

ItemEditResponse object {id, created\_on, expression, 2 more }

</summary>

id: string

The unique ID of the expression filter.

<a href="#">Link to this property</a>

created\_on: string

The creation timestamp of the expression filter.

formatdate-time

<a href="#">Link to this property</a>

expression: string

The filter expression.

<a href="#">Link to this property</a>

mode: string

The filter’s mode. Must be one of ‘enabled’, ‘disabled’, ‘monitoring’.

<a href="#">Link to this property</a>

modified\_on: string

The last modification timestamp of the expression filter.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.syn_protection.filters.items%20%3E%20(model)%20item_edit_response%20%3E%20(schema)>)

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

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.syn_protection.filters.items%20%3E%20(model)%20item_delete_response%20%3E%20(schema)>)

#### Advanced TCP ProtectionSYN ProtectionRules

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

#### Advanced TCP ProtectionSYN ProtectionRulesItems

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

#### Advanced TCP ProtectionTCP Flow Protection

#### Advanced TCP ProtectionTCP Flow ProtectionFilters

##### [List all TCP Flow Protection filters.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/tcp_flow_protection/subresources/filters/methods/list)

GET/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_flow\_protection/filters

##### [Create a TCP Flow Protection filter.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/tcp_flow_protection/subresources/filters/methods/create)

POST/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_flow\_protection/filters

##### [Delete all TCP Flow Protection filters.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/tcp_flow_protection/subresources/filters/methods/bulk_delete)

DELETE/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_flow\_protection/filters

##### ModelsExpand Collapse

<details>

<summary>

FilterListResponse object {id, created\_on, expression, 2 more }

</summary>

id: string

The unique ID of the expression filter.

<a href="#">Link to this property</a>

created\_on: string

The creation timestamp of the expression filter.

formatdate-time

<a href="#">Link to this property</a>

expression: string

The filter expression.

<a href="#">Link to this property</a>

mode: string

The filter’s mode. Must be one of ‘enabled’, ‘disabled’, ‘monitoring’.

<a href="#">Link to this property</a>

modified\_on: string

The last modification timestamp of the expression filter.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.filters%20%3E%20(model)%20filter_list_response%20%3E%20(schema)>)

<details>

<summary>

FilterCreateResponse object {id, created\_on, expression, 2 more }

</summary>

id: string

The unique ID of the expression filter.

<a href="#">Link to this property</a>

created\_on: string

The creation timestamp of the expression filter.

formatdate-time

<a href="#">Link to this property</a>

expression: string

The filter expression.

<a href="#">Link to this property</a>

mode: string

The filter’s mode. Must be one of ‘enabled’, ‘disabled’, ‘monitoring’.

<a href="#">Link to this property</a>

modified\_on: string

The last modification timestamp of the expression filter.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.filters%20%3E%20(model)%20filter_create_response%20%3E%20(schema)>)

<details>

<summary>

FilterBulkDeleteResponse object {errors, messages, success }

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

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.filters%20%3E%20(model)%20filter_bulk_delete_response%20%3E%20(schema)>)

#### Advanced TCP ProtectionTCP Flow ProtectionFiltersItems

##### [Get TCP Flow Protection filter.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/tcp_flow_protection/subresources/filters/subresources/items/methods/get)

GET/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_flow\_protection/filters/{filter\_id}

##### [Update TCP Flow Protection filter.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/tcp_flow_protection/subresources/filters/subresources/items/methods/edit)

PATCH/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_flow\_protection/filters/{filter\_id}

##### [Delete TCP Flow Protection filter.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/tcp_flow_protection/subresources/filters/subresources/items/methods/delete)

DELETE/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_flow\_protection/filters/{filter\_id}

##### ModelsExpand Collapse

<details>

<summary>

ItemGetResponse object {id, created\_on, expression, 2 more }

</summary>

id: string

The unique ID of the expression filter.

<a href="#">Link to this property</a>

created\_on: string

The creation timestamp of the expression filter.

formatdate-time

<a href="#">Link to this property</a>

expression: string

The filter expression.

<a href="#">Link to this property</a>

mode: string

The filter’s mode. Must be one of ‘enabled’, ‘disabled’, ‘monitoring’.

<a href="#">Link to this property</a>

modified\_on: string

The last modification timestamp of the expression filter.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.filters.items%20%3E%20(model)%20item_get_response%20%3E%20(schema)>)

<details>

<summary>

ItemEditResponse object {id, created\_on, expression, 2 more }

</summary>

id: string

The unique ID of the expression filter.

<a href="#">Link to this property</a>

created\_on: string

The creation timestamp of the expression filter.

formatdate-time

<a href="#">Link to this property</a>

expression: string

The filter expression.

<a href="#">Link to this property</a>

mode: string

The filter’s mode. Must be one of ‘enabled’, ‘disabled’, ‘monitoring’.

<a href="#">Link to this property</a>

modified\_on: string

The last modification timestamp of the expression filter.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.filters.items%20%3E%20(model)%20item_edit_response%20%3E%20(schema)>)

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

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.filters.items%20%3E%20(model)%20item_delete_response%20%3E%20(schema)>)

#### Advanced TCP ProtectionTCP Flow ProtectionRules

##### [List all TCP Flow Protection rules.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/tcp_flow_protection/subresources/rules/methods/list)

GET/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_flow\_protection/rules

##### [Create TCP Flow Protection rule.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/tcp_flow_protection/subresources/rules/methods/create)

POST/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_flow\_protection/rules

##### [Delete all TCP Flow Protection rules.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/tcp_flow_protection/subresources/rules/methods/bulk_delete)

DELETE/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_flow\_protection/rules

##### ModelsExpand Collapse

<details>

<summary>

RuleListResponse object {id, burst\_sensitivity, created\_on, 5 more }

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

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.rules%20%3E%20(model)%20rule_list_response%20%3E%20(schema)>)

<details>

<summary>

RuleCreateResponse object {id, burst\_sensitivity, created\_on, 5 more }

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

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.rules%20%3E%20(model)%20rule_create_response%20%3E%20(schema)>)

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

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.rules%20%3E%20(model)%20rule_bulk_delete_response%20%3E%20(schema)>)

#### Advanced TCP ProtectionTCP Flow ProtectionRulesItems

##### [Get TCP Flow Protection rule.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/tcp_flow_protection/subresources/rules/subresources/items/methods/get)

GET/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_flow\_protection/rules/{rule\_id}

##### [Update TCP Flow Protection rule.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/tcp_flow_protection/subresources/rules/subresources/items/methods/edit)

PATCH/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_flow\_protection/rules/{rule\_id}

##### [Delete TCP Flow Protection rule.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/tcp_flow_protection/subresources/rules/subresources/items/methods/delete)

DELETE/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_flow\_protection/rules/{rule\_id}

##### ModelsExpand Collapse

<details>

<summary>

ItemGetResponse object {id, burst\_sensitivity, created\_on, 5 more }

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

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.rules.items%20%3E%20(model)%20item_get_response%20%3E%20(schema)>)

<details>

<summary>

ItemEditResponse object {id, burst\_sensitivity, created\_on, 5 more }

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

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.rules.items%20%3E%20(model)%20item_edit_response%20%3E%20(schema)>)

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

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.rules.items%20%3E%20(model)%20item_delete_response%20%3E%20(schema)>)

#### Advanced TCP ProtectionStatus

##### [Get protection status.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/status/methods/get)

GET/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_protection\_status

##### [Update protection status.](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/status/methods/edit)

PATCH/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_protection\_status

##### ModelsExpand Collapse

<details>

<summary>

StatusGetResponse object {enabled }

</summary>

enabled: boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.status%20%3E%20(model)%20status_get_response%20%3E%20(schema)>)

<details>

<summary>

StatusEditResponse object {enabled }

</summary>

enabled: boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.status%20%3E%20(model)%20status_edit_response%20%3E%20(schema)>)