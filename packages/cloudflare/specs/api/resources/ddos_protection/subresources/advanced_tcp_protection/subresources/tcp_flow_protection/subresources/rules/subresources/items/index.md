---
title: Items
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[DDoS Protection](https://developers.cloudflare.com/api/resources/ddos_protection)

[Advanced TCP Protection](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection)

[TCP Flow Protection](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/tcp_flow_protection)

[Rules](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/tcp_flow_protection/subresources/rules)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Items

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