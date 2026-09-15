---
title: Rules
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Firewall](https://developers.cloudflare.com/api/resources/firewall)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Rules

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