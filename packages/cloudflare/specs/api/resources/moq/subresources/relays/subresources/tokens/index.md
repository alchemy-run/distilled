---
title: Tokens
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[MoQ](https://developers.cloudflare.com/api/resources/moq)

[Relays](https://developers.cloudflare.com/api/resources/moq/subresources/relays)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Tokens

##### [Create a token](https://developers.cloudflare.com/api/resources/moq/subresources/relays/subresources/tokens/methods/create)

POST/accounts/{account\_id}/moq/relays/{relay\_id}/tokens

##### [List tokens](https://developers.cloudflare.com/api/resources/moq/subresources/relays/subresources/tokens/methods/list)

GET/accounts/{account\_id}/moq/relays/{relay\_id}/tokens

##### [Revoke a token](https://developers.cloudflare.com/api/resources/moq/subresources/relays/subresources/tokens/methods/delete)

DELETE/accounts/{account\_id}/moq/relays/{relay\_id}/tokens/{jti}

##### ModelsExpand Collapse

<details>

<summary>

TokenCreateResponse object {issuers }

A relay’s token collection, keyed on issuer <code>type</code> (a discriminated union). V1 ships exactly one arm (<code>cloudflare_jwt</code>). Clients iterate <code>issuers</code>, switch on <code>type</code>, and ignore unknown types — that contract is what makes adding or removing an arm non-breaking.

</summary>

<details>

<summary>

issuers: array of object {cloudflare\_tokens, issuer, type }

</summary>

<details>

<summary>

cloudflare\_tokens: array of object {created, expires, jti, 3 more }

Always present (\[] when empty).

</summary>

created: string

formatdate-time

<a href="#">Link to this property</a>

expires: string

Mandatory; no more than 1 year after <code>created</code>.

formatdate-time

<a href="#">Link to this property</a>

jti: string

Token identity and registry key (32 hex chars).

<a href="#">Link to this property</a>

<details>

<summary>

operations: array of "publish"or "subscribe"

Signed allowlist of what the token may do. V1 coarse roles; the array form extends to fine-grained MoQT message names later without a breaking change.

</summary>

One of the following:

"publish"

<a href="#">Link to this property</a>

"subscribe"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

label: optional string

Optional, customer-set.

<a href="#">Link to this property</a>

secret: optional string

The signed JWT. Present ONLY in create / auto-create responses (shown once); never returned by list, never stored.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

issuer: "cloudflare"

<a href="#">Link to this property</a>

type: "cloudflare\_jwt"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20moq.relays.tokens%20%3E%20(model)%20token_create_response%20%3E%20(schema)>)

<details>

<summary>

TokenListResponse object {issuers }

A relay’s token collection, keyed on issuer <code>type</code> (a discriminated union). V1 ships exactly one arm (<code>cloudflare_jwt</code>). Clients iterate <code>issuers</code>, switch on <code>type</code>, and ignore unknown types — that contract is what makes adding or removing an arm non-breaking.

</summary>

<details>

<summary>

issuers: array of object {cloudflare\_tokens, issuer, type }

</summary>

<details>

<summary>

cloudflare\_tokens: array of object {created, expires, jti, 3 more }

Always present (\[] when empty).

</summary>

created: string

formatdate-time

<a href="#">Link to this property</a>

expires: string

Mandatory; no more than 1 year after <code>created</code>.

formatdate-time

<a href="#">Link to this property</a>

jti: string

Token identity and registry key (32 hex chars).

<a href="#">Link to this property</a>

<details>

<summary>

operations: array of "publish"or "subscribe"

Signed allowlist of what the token may do. V1 coarse roles; the array form extends to fine-grained MoQT message names later without a breaking change.

</summary>

One of the following:

"publish"

<a href="#">Link to this property</a>

"subscribe"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

label: optional string

Optional, customer-set.

<a href="#">Link to this property</a>

secret: optional string

The signed JWT. Present ONLY in create / auto-create responses (shown once); never returned by list, never stored.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

issuer: "cloudflare"

<a href="#">Link to this property</a>

type: "cloudflare\_jwt"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20moq.relays.tokens%20%3E%20(model)%20token_list_response%20%3E%20(schema)>)

<details>

<summary>

TokenDeleteResponse object {errors, messages, success }

</summary>

<details>

<summary>

errors: array of object {code, message }

</summary>

code: optional number

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

messages: array of object {code, message }

</summary>

code: optional number

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20moq.relays.tokens%20%3E%20(model)%20token_delete_response%20%3E%20(schema)>)