---
title: MoQ
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# MoQ

#### MoQRelays

##### [List relays](https://developers.cloudflare.com/api/resources/moq/subresources/relays/methods/list)

GET/accounts/{account\_id}/moq/relays

##### [Get a relay](https://developers.cloudflare.com/api/resources/moq/subresources/relays/methods/get)

GET/accounts/{account\_id}/moq/relays/{relay\_id}

##### [Create a relay](https://developers.cloudflare.com/api/resources/moq/subresources/relays/methods/create)

POST/accounts/{account\_id}/moq/relays

##### [Update a relay](https://developers.cloudflare.com/api/resources/moq/subresources/relays/methods/update)

PUT/accounts/{account\_id}/moq/relays/{relay\_id}

##### [Delete a relay](https://developers.cloudflare.com/api/resources/moq/subresources/relays/methods/delete)

DELETE/accounts/{account\_id}/moq/relays/{relay\_id}

##### ModelsExpand Collapse

<details>

<summary>

RelayListResponse object {created, modified, name, uid }

Abbreviated relay for list responses.

</summary>

created: string

formatdate-time

<a href="#">Link to this property</a>

modified: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

uid: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20moq.relays%20%3E%20(model)%20relay_list_response%20%3E%20(schema)>)

<details>

<summary>

RelayGetResponse object {config, created, modified, 3 more }

Full relay details (no tokens).

</summary>

<details>

<summary>

config: object {upstreams }

</summary>

<details>

<summary>

upstreams: optional object {enabled, upstreams }

Upstreams are external MOQT server publishers that a relay falls back to when it has no local publisher for a requested namespace/track.

</summary>

enabled: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

upstreams: optional array of object {url }

Ordered list of upstream MOQT server publishers. Each entry is an object (not a bare string) so per-upstream configuration can be added in the future without another breaking change.

</summary>

url: string

Upstream MOQT server publisher URL. Must be an absolute URL with a host and a scheme the relay can dial: moqt:// (raw QUIC) or https:// (WebTransport). Validated on update (PUT); rejected with 21013.

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created: string

formatdate-time

<a href="#">Link to this property</a>

modified: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

uid: string

<a href="#">Link to this property</a>

status: optional "connected"

“connected” when active, omitted otherwise.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20moq.relays%20%3E%20(model)%20relay_get_response%20%3E%20(schema)>)

<details>

<summary>

RelayCreateResponse object {config, created, issuers, 3 more }

Relay with its auto-created default token pair (one full-access \[publish, subscribe] and one \[subscribe]-only), each with its one-time secret, wrapped in the issuers envelope.

</summary>

<details>

<summary>

config: object {upstreams }

</summary>

<details>

<summary>

upstreams: optional object {enabled, upstreams }

Upstreams are external MOQT server publishers that a relay falls back to when it has no local publisher for a requested namespace/track.

</summary>

enabled: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

upstreams: optional array of object {url }

Ordered list of upstream MOQT server publishers. Each entry is an object (not a bare string) so per-upstream configuration can be added in the future without another breaking change.

</summary>

url: string

Upstream MOQT server publisher URL. Must be an absolute URL with a host and a scheme the relay can dial: moqt:// (raw QUIC) or https:// (WebTransport). Validated on update (PUT); rejected with 21013.

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

issuers: array of object {cloudflare\_tokens, issuer, type }

Token collection (discriminated union on <code>type</code>). On create this holds the auto-created default pair, each including its one-time secret.

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

modified: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

uid: string

Server-generated unique identifier (32 hex chars).

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20moq.relays%20%3E%20(model)%20relay_create_response%20%3E%20(schema)>)

<details>

<summary>

RelayUpdateResponse object {config, created, modified, 3 more }

Full relay details (no tokens).

</summary>

<details>

<summary>

config: object {upstreams }

</summary>

<details>

<summary>

upstreams: optional object {enabled, upstreams }

Upstreams are external MOQT server publishers that a relay falls back to when it has no local publisher for a requested namespace/track.

</summary>

enabled: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

upstreams: optional array of object {url }

Ordered list of upstream MOQT server publishers. Each entry is an object (not a bare string) so per-upstream configuration can be added in the future without another breaking change.

</summary>

url: string

Upstream MOQT server publisher URL. Must be an absolute URL with a host and a scheme the relay can dial: moqt:// (raw QUIC) or https:// (WebTransport). Validated on update (PUT); rejected with 21013.

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created: string

formatdate-time

<a href="#">Link to this property</a>

modified: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

uid: string

<a href="#">Link to this property</a>

status: optional "connected"

“connected” when active, omitted otherwise.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20moq.relays%20%3E%20(model)%20relay_update_response%20%3E%20(schema)>)

RelayDeleteResponse = unknown

[Link to this property](#)%20moq.relays%20%3E%20(model)%20relay_delete_response%20%3E%20(schema)>)

#### MoQRelaysTokens

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