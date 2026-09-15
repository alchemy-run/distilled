---
title: RUM
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# RUM

#### RUMSite Info

##### [List Web Analytics sites](https://developers.cloudflare.com/api/resources/rum/subresources/site_info/methods/list)

GET/accounts/{account\_id}/rum/site\_info/list

##### [Get a Web Analytics site](https://developers.cloudflare.com/api/resources/rum/subresources/site_info/methods/get)

GET/accounts/{account\_id}/rum/site\_info/{site\_id}

##### [Create a Web Analytics site](https://developers.cloudflare.com/api/resources/rum/subresources/site_info/methods/create)

POST/accounts/{account\_id}/rum/site\_info

##### [Update a Web Analytics site](https://developers.cloudflare.com/api/resources/rum/subresources/site_info/methods/update)

PUT/accounts/{account\_id}/rum/site\_info/{site\_id}

##### [Delete a Web Analytics site](https://developers.cloudflare.com/api/resources/rum/subresources/site_info/methods/delete)

DELETE/accounts/{account\_id}/rum/site\_info/{site\_id}

##### ModelsExpand Collapse

<details>

<summary>

Site object {auto\_install, created, rules, 4 more }

</summary>

auto\_install: optional boolean

If enabled, the JavaScript snippet is automatically injected for orange-clouded sites.

<a href="#">Link to this property</a>

created: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

rules: optional array of <a href="https://developers.cloudflare.com/api/resources/rum#(resource)%20rum.rules%20%3E%20(model)%20rum_rule%20%3E%20(schema)">RUMRule</a> { id, created, host, 4 more }

A list of rules.

</summary>

id: optional string

The Web Analytics rule identifier.

<a href="#">Link to this property</a>

created: optional string

formatdate-time

<a href="#">Link to this property</a>

host: optional string

The hostname the rule will be applied to.

<a href="#">Link to this property</a>

inclusive: optional boolean

Whether the rule includes or excludes traffic from being measured.

<a href="#">Link to this property</a>

is\_paused: optional boolean

Whether the rule is paused or not.

<a href="#">Link to this property</a>

paths: optional array of string

The paths the rule will be applied to.

<a href="#">Link to this property</a>

priority: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ruleset: optional object {id, enabled, zone\_name, zone\_tag }

</summary>

id: optional string

The Web Analytics ruleset identifier.

<a href="#">Link to this property</a>

enabled: optional boolean

Whether the ruleset is enabled.

<a href="#">Link to this property</a>

zone\_name: optional string

<a href="#">Link to this property</a>

zone\_tag: optional string

The zone identifier.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

site\_tag: optional string

The Web Analytics site identifier.

<a href="#">Link to this property</a>

site\_token: optional string

The Web Analytics site token.

<a href="#">Link to this property</a>

snippet: optional string

Encoded JavaScript snippet.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rum.site_info%20%3E%20(model)%20site%20%3E%20(schema)>)

<details>

<summary>

SiteInfoDeleteResponse object {site\_tag }

</summary>

site\_tag: optional string

The Web Analytics site identifier.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rum.site_info%20%3E%20(model)%20site_info_delete_response%20%3E%20(schema)>)

#### RUMRules

##### [List rules in Web Analytics ruleset](https://developers.cloudflare.com/api/resources/rum/subresources/rules/methods/list)

GET/accounts/{account\_id}/rum/v2/{ruleset\_id}/rules

##### [Create a Web Analytics rule](https://developers.cloudflare.com/api/resources/rum/subresources/rules/methods/create)

POST/accounts/{account\_id}/rum/v2/{ruleset\_id}/rule

##### [Update a Web Analytics rule](https://developers.cloudflare.com/api/resources/rum/subresources/rules/methods/update)

PUT/accounts/{account\_id}/rum/v2/{ruleset\_id}/rule/{rule\_id}

##### [Delete a Web Analytics rule](https://developers.cloudflare.com/api/resources/rum/subresources/rules/methods/delete)

DELETE/accounts/{account\_id}/rum/v2/{ruleset\_id}/rule/{rule\_id}

##### [Update Web Analytics rules](https://developers.cloudflare.com/api/resources/rum/subresources/rules/methods/bulk_create)

POST/accounts/{account\_id}/rum/v2/{ruleset\_id}/rules

##### ModelsExpand Collapse

<details>

<summary>

RUMRule object {id, created, host, 4 more }

</summary>

id: optional string

The Web Analytics rule identifier.

<a href="#">Link to this property</a>

created: optional string

formatdate-time

<a href="#">Link to this property</a>

host: optional string

The hostname the rule will be applied to.

<a href="#">Link to this property</a>

inclusive: optional boolean

Whether the rule includes or excludes traffic from being measured.

<a href="#">Link to this property</a>

is\_paused: optional boolean

Whether the rule is paused or not.

<a href="#">Link to this property</a>

paths: optional array of string

The paths the rule will be applied to.

<a href="#">Link to this property</a>

priority: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rum.rules%20%3E%20(model)%20rum_rule%20%3E%20(schema)>)

<details>

<summary>

RuleListResponse object {rules, ruleset }

</summary>

<details>

<summary>

rules: optional array of <a href="https://developers.cloudflare.com/api/resources/rum#(resource)%20rum.rules%20%3E%20(model)%20rum_rule%20%3E%20(schema)">RUMRule</a> { id, created, host, 4 more }

A list of rules.

</summary>

id: optional string

The Web Analytics rule identifier.

<a href="#">Link to this property</a>

created: optional string

formatdate-time

<a href="#">Link to this property</a>

host: optional string

The hostname the rule will be applied to.

<a href="#">Link to this property</a>

inclusive: optional boolean

Whether the rule includes or excludes traffic from being measured.

<a href="#">Link to this property</a>

is\_paused: optional boolean

Whether the rule is paused or not.

<a href="#">Link to this property</a>

paths: optional array of string

The paths the rule will be applied to.

<a href="#">Link to this property</a>

priority: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ruleset: optional object {id, enabled, zone\_name, zone\_tag }

</summary>

id: optional string

The Web Analytics ruleset identifier.

<a href="#">Link to this property</a>

enabled: optional boolean

Whether the ruleset is enabled.

<a href="#">Link to this property</a>

zone\_name: optional string

<a href="#">Link to this property</a>

zone\_tag: optional string

The zone identifier.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rum.rules%20%3E%20(model)%20rule_list_response%20%3E%20(schema)>)

<details>

<summary>

RuleDeleteResponse object {id }

</summary>

id: optional string

The Web Analytics rule identifier.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rum.rules%20%3E%20(model)%20rule_delete_response%20%3E%20(schema)>)

<details>

<summary>

RuleBulkCreateResponse object {rules, ruleset }

</summary>

<details>

<summary>

rules: optional array of <a href="https://developers.cloudflare.com/api/resources/rum#(resource)%20rum.rules%20%3E%20(model)%20rum_rule%20%3E%20(schema)">RUMRule</a> { id, created, host, 4 more }

A list of rules.

</summary>

id: optional string

The Web Analytics rule identifier.

<a href="#">Link to this property</a>

created: optional string

formatdate-time

<a href="#">Link to this property</a>

host: optional string

The hostname the rule will be applied to.

<a href="#">Link to this property</a>

inclusive: optional boolean

Whether the rule includes or excludes traffic from being measured.

<a href="#">Link to this property</a>

is\_paused: optional boolean

Whether the rule is paused or not.

<a href="#">Link to this property</a>

paths: optional array of string

The paths the rule will be applied to.

<a href="#">Link to this property</a>

priority: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ruleset: optional object {id, enabled, zone\_name, zone\_tag }

</summary>

id: optional string

The Web Analytics ruleset identifier.

<a href="#">Link to this property</a>

enabled: optional boolean

Whether the ruleset is enabled.

<a href="#">Link to this property</a>

zone\_name: optional string

<a href="#">Link to this property</a>

zone\_tag: optional string

The zone identifier.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rum.rules%20%3E%20(model)%20rule_bulk_create_response%20%3E%20(schema)>)