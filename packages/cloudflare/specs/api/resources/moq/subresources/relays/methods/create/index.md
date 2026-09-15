---
title: Create a relay
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[MoQ](https://developers.cloudflare.com/api/resources/moq)

[Relays](https://developers.cloudflare.com/api/resources/moq/subresources/relays)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create a relay

POST/accounts/{account\_id}/moq/relays

Provisions a new MoQ relay instance. Auto-creates a publish+subscribe token and a subscribe-only token. Token values are included in the response (shown once). Config is always set to defaults (upstreams off) and cannot be supplied here — sending a non-empty `config` is rejected (21014); `null` or `{}` is accepted as absent. Use PUT to configure the relay after it exists.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### P ath ParametersExpand Collapse

account\_id: string

Cloudflare account identifier.

[Link to this property](#)%20moq.relays%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

name: string

Human-readable name for the relay.

minLength1

[Link to this property](#)%20moq.relays%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

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

[Link to this property](#)%20moq.relays%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message }

</summary>

code: optional number

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20moq.relays%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: boolean

[Link to this property](#)%20moq.relays%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {config, created, issuers, 3 more }

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

[Link to this property](#)%20moq.relays%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Create a relay

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/moq/relays \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "Production Live Stream"
        }'
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
    "config": {
      "upstreams": {
        "enabled": true,
        "upstreams": [
          {
            "url": "https://example.com"
          }
        ]
      }
    },
    "created": "2019-12-27T18:11:19.117Z",
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
    ],
    "modified": "2019-12-27T18:11:19.117Z",
    "name": "Production Live Stream",
    "uid": "a1b2c3d4e5f67890a1b2c3d4e5f67890"
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
    "config": {
      "upstreams": {
        "enabled": true,
        "upstreams": [
          {
            "url": "https://example.com"
          }
        ]
      }
    },
    "created": "2019-12-27T18:11:19.117Z",
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
    ],
    "modified": "2019-12-27T18:11:19.117Z",
    "name": "Production Live Stream",
    "uid": "a1b2c3d4e5f67890a1b2c3d4e5f67890"
  }
}
```