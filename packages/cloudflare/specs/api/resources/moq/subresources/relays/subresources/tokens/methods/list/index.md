---
title: List tokens
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[MoQ](https://developers.cloudflare.com/api/resources/moq)

[Relays](https://developers.cloudflare.com/api/resources/moq/subresources/relays)

[Tokens](https://developers.cloudflare.com/api/resources/moq/subresources/relays/subresources/tokens)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List tokens

GET/accounts/{account\_id}/moq/relays/{relay\_id}/tokens

Returns metadata for every token the relay accepts. Secrets are never returned, so a token that has been lost cannot be recovered here. There is no expiry filter: compare each token’s `expires` to the current time to tell which ones have lapsed.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### P ath ParametersExpand Collapse

account\_id: string

Cloudflare account identifier.

[Link to this property](#)%20moq.relays.tokens%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

relay\_id: string

[Link to this property](#)%20moq.relays.tokens%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20relay_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message }

</summary>

code: optional number

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20moq.relays.tokens%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message }

</summary>

code: optional number

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20moq.relays.tokens%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: boolean

[Link to this property](#)%20moq.relays.tokens%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {issuers }

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

[Link to this property](#)%20moq.relays.tokens%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### List tokens

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/moq/relays/$RELAY_ID/tokens \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "success": true,
  "result": {
    "issuers": [
      {
        "cloudflare_tokens": [
          {
            "created": "2019-12-27T18:11:19.117Z",
            "expires": "2019-12-27T18:11:19.117Z",
            "jti": "f3a1b2c3d4e5f67890a1b2c3d4e5f678",
            "operations": [
              "publish",
              "subscribe"
            ],
            "label": "primary-encoder",
            "secret": "eyJhbGciOiJFZDI1NTE5..."
          }
        ],
        "issuer": "cloudflare",
        "type": "cloudflare_jwt"
      }
    ]
  }
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "success": true,
  "result": {
    "issuers": [
      {
        "cloudflare_tokens": [
          {
            "created": "2019-12-27T18:11:19.117Z",
            "expires": "2019-12-27T18:11:19.117Z",
            "jti": "f3a1b2c3d4e5f67890a1b2c3d4e5f678",
            "operations": [
              "publish",
              "subscribe"
            ],
            "label": "primary-encoder",
            "secret": "eyJhbGciOiJFZDI1NTE5..."
          }
        ],
        "issuer": "cloudflare",
        "type": "cloudflare_jwt"
      }
    ]
  }
}
```