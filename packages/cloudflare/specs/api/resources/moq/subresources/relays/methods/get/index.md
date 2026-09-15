---
title: Get a relay
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[MoQ](https://developers.cloudflare.com/api/resources/moq)

[Relays](https://developers.cloudflare.com/api/resources/moq/subresources/relays)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get a relay

GET/accounts/{account\_id}/moq/relays/{relay\_id}

Retrieves a single MoQ relay including config and status. Tokens are NOT included.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### P ath ParametersExpand Collapse

account\_id: string

Cloudflare account identifier.

[Link to this property](#)%20moq.relays%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

relay\_id: string

[Link to this property](#)%20moq.relays%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20relay_id%20%3E%20(schema)>)

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

[Link to this property](#)%20moq.relays%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message }

</summary>

code: optional number

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20moq.relays%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: boolean

[Link to this property](#)%20moq.relays%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {config, created, modified, 3 more }

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

[Link to this property](#)%20moq.relays%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get a relay

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/moq/relays/$RELAY_ID \
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
    "modified": "2019-12-27T18:11:19.117Z",
    "name": "Production Live Stream",
    "uid": "a1b2c3d4e5f67890a1b2c3d4e5f67890",
    "status": "connected"
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
    "modified": "2019-12-27T18:11:19.117Z",
    "name": "Production Live Stream",
    "uid": "a1b2c3d4e5f67890a1b2c3d4e5f67890",
    "status": "connected"
  }
}
```