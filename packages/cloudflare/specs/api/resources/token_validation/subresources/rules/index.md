---
title: Rules
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Token Validation](https://developers.cloudflare.com/api/resources/token_validation)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Rules

##### [List token validation rules](https://developers.cloudflare.com/api/resources/token_validation/subresources/rules/methods/list)

GET/zones/{zone\_id}/token\_validation/rules

##### [Create a token validation rule](https://developers.cloudflare.com/api/resources/token_validation/subresources/rules/methods/create)

POST/zones/{zone\_id}/token\_validation/rules

##### [Create token validation rules](https://developers.cloudflare.com/api/resources/token_validation/subresources/rules/methods/bulk_create)

POST/zones/{zone\_id}/token\_validation/rules/bulk

##### [Edit token validation rules](https://developers.cloudflare.com/api/resources/token_validation/subresources/rules/methods/bulk_edit)

PATCH/zones/{zone\_id}/token\_validation/rules/bulk

##### [Get a token validation rule](https://developers.cloudflare.com/api/resources/token_validation/subresources/rules/methods/get)

GET/zones/{zone\_id}/token\_validation/rules/{rule\_id}

##### [Delete a token validation rule](https://developers.cloudflare.com/api/resources/token_validation/subresources/rules/methods/delete)

DELETE/zones/{zone\_id}/token\_validation/rules/{rule\_id}

##### [Edit a token validation rule](https://developers.cloudflare.com/api/resources/token_validation/subresources/rules/methods/edit)

PATCH/zones/{zone\_id}/token\_validation/rules/{rule\_id}

##### ModelsExpand Collapse

<details>

<summary>

TokenValidationRule object {action, description, enabled, 6 more }

A Token Validation rule that can enforce security policies using JWT Tokens.

</summary>

<details>

<summary>

action: "log"or "block"

Action to take on requests that match operations included in <code>selector</code> and fail <code>expression</code>.

</summary>

One of the following:

"log"

<a href="#">Link to this property</a>

"block"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: string

A human-readable description that gives more details than <code>title</code>.

maxLength500

<a href="#">Link to this property</a>

enabled: boolean

Toggle rule on or off.

<a href="#">Link to this property</a>

expression: string

Rule expression. Requests that fail to match this expression will be subject to <code>action</code>.

For details on expressions, see the <a href="https://developers.cloudflare.com/api-shield/security/jwt-validation/">Cloudflare Docs</a>.

<a href="#">Link to this property</a>

<details>

<summary>

selector: object {exclude, include }

Select operations covered by this rule.

For details on selectors, see the <a href="https://developers.cloudflare.com/api-shield/security/jwt-validation/">Cloudflare Docs</a>.

</summary>

<details>

<summary>

exclude: optional array of object {operation\_ids }

Ignore operations that were otherwise included by <code>include</code>.

</summary>

operation\_ids: optional array of string

Excluded operation IDs.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

include: optional array of object {host }

Select all matching operations.

</summary>

host: optional array of string

Included hostnames.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

title: string

A human-readable name for the rule.

maxLength50

<a href="#">Link to this property</a>

id: optional string

UUID.

maxLength36

minLength36

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

last\_updated: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20token_validation.rules%20%3E%20(model)%20token_validation_rule%20%3E%20(schema)>)

RuleDeleteResponse = unknown

[Link to this property](#)%20token_validation.rules%20%3E%20(model)%20rule_delete_response%20%3E%20(schema)>)