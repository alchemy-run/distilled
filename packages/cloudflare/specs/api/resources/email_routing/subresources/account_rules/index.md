---
title: Account Rules
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Routing](https://developers.cloudflare.com/api/resources/email_routing)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Account Rules

##### [List account or zone routing rules](https://developers.cloudflare.com/api/resources/email_routing/subresources/account_rules/methods/list)

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/email/routing/rules

##### ModelsExpand Collapse

<details>

<summary>

AccountRule object {id, actions, enabled, 6 more }

</summary>

id: optional string

Routing rule identifier.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

actions: optional array of <a href="https://developers.cloudflare.com/api/resources/email_routing#(resource)%20email_routing.rules%20%3E%20(model)%20action%20%3E%20(schema)">Action</a> { type, value }

List actions patterns.

</summary>

<details>

<summary>

type: "drop"or "forward"or "worker"

Type of supported action.

</summary>

One of the following:

"drop"

<a href="#">Link to this property</a>

"forward"

<a href="#">Link to this property</a>

"worker"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: optional array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

enabled: optional trueor false

Routing rule status.

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

matchers: optional array of <a href="https://developers.cloudflare.com/api/resources/email_routing#(resource)%20email_routing.rules%20%3E%20(model)%20matcher%20%3E%20(schema)">Matcher</a> { type, field, value }

Matching patterns to forward to your actions.

</summary>

<details>

<summary>

type: "all"or "literal"

Type of matcher.

</summary>

One of the following:

"all"

<a href="#">Link to this property</a>

"literal"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

field: optional "to"

Field for type matcher.

<a href="#">Link to this property</a>

value: optional string

Value for matcher.

maxLength90

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Routing rule name.

maxLength256

<a href="#">Link to this property</a>

priority: optional number

Priority of the routing rule.

minimum0

<a href="#">Link to this property</a>

<details>

<summary>

source: optional "api"or "wrangler"

Who manages the rule. <code>api</code> covers dashboard, generic API, and Terraform; <code>wrangler</code> means the rule is managed by a Worker’s wrangler.jsonc. Defaults to <code>api</code> when omitted on write.

</summary>

One of the following:

"api"

<a href="#">Link to this property</a>

"wrangler"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

Deprecatedtag: optional string

Routing rule tag. (Deprecated, replaced by routing rule identifier)

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

zone: optional object {name, tag }

Zone information for the routing rule.

</summary>

name: optional string

Zone name.

<a href="#">Link to this property</a>

tag: optional string

Zone tag.

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_routing.account_rules%20%3E%20(model)%20account_rule%20%3E%20(schema)>)