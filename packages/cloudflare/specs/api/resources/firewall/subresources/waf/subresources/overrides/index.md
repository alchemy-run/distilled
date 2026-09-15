---
title: Overrides
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Firewall](https://developers.cloudflare.com/api/resources/firewall)

[WAF](https://developers.cloudflare.com/api/resources/firewall/subresources/waf)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Overrides

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