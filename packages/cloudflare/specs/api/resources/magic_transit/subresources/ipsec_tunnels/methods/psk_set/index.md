---
title: Set Pre-Shared Keys (PSK) for IPsec tunnels
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Magic Transit](https://developers.cloudflare.com/api/resources/magic_transit)

[IPSEC Tunnels](https://developers.cloudflare.com/api/resources/magic_transit/subresources/ipsec_tunnels)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Set Pre-Shared Keys (PSK) for IPsec tunnels

POST/accounts/{account\_id}/magic/ipsec\_tunnels/psk

Sets Pre-Shared Keys for multiple IPsec tunnels associated with an account. Use `?validate_only=true` as an optional query parameter to only run validation without persisting changes. After PSKs are applied, they are immediately persisted to Cloudflare’s edge and cannot be retrieved later. Store the PSKs in a safe place.

##### Security

<details>

<summary>API Token</summary>



The preferred authorization scheme for interacting with the Cloudflare API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/create-token/">Create a token</a>.

**Example:**<code>Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY</code>

</details>

<details>

<summary>API Email + API Key</summary>



The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**<code>X-Auth-Email: user@example.com</code>

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**<code>X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194</code>

</details>

##### Accepted Permissions (at least one required)

`Magic WAN Write``Magic Transit Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier

maxLength32

[Link to this property](#)%20magic_transit.ipsec_tunnels%20%3E%20(method)%20psk_set%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

validate\_only: optional boolean

If `true`, only run validation without persisting changes.

[Link to this property](#)%20magic_transit.ipsec_tunnels%20%3E%20(method)%20psk_set%20%3E%20(params)%20default%20%3E%20(param)%20validate_only%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

psks: array of object {id, psk }

List of tunnel ID and PSK pairs.

</summary>

id: string

The ID of the IPsec tunnel.

maxLength32

<a href="#">Link to this property</a>

psk: string

A randomly generated or provided string for use in the IPsec tunnel.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.ipsec_tunnels%20%3E%20(method)%20psk_set%20%3E%20(params)%200%20%3E%20(param)%20psks%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.ipsec_tunnels%20%3E%20(method)%20psk_set%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.ipsec_tunnels%20%3E%20(method)%20psk_set%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {successfully\_applied\_psks, unapplied\_psks }

</summary>

<details>

<summary>

successfully\_applied\_psks: optional map\[object {ipsec\_id, ipsec\_tunnel\_id, psk, psk\_metadata } ]

Map of tunnel IDs to successfully applied PSK details.

</summary>

ipsec\_id: string

The IKE identifier used for this tunnel on the Cloudflare edge.

<a href="#">Link to this property</a>

ipsec\_tunnel\_id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

psk: string

A randomly generated or provided string for use in the IPsec tunnel.

<a href="#">Link to this property</a>

<details>

<summary>

psk\_metadata: <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.ipsec_tunnels%20%3E%20(model)%20psk_metadata%20%3E%20(schema)">PSKMetadata</a> { last\_generated\_on }

The PSK metadata that includes when the PSK was generated.

</summary>

last\_generated\_on: optional string

The date and time the tunnel was last modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

unapplied\_psks: optional map\[string]

Map of tunnel IDs to failure reasons for PSKs that could not be applied.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.ipsec_tunnels%20%3E%20(method)%20psk_set%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20magic_transit.ipsec_tunnels%20%3E%20(method)%20psk_set%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Set Pre-Shared Keys (PSK) for IPsec tunnels

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/ipsec_tunnels/psk \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "psks": [
            {
              "id": "023e105f4ecef8ad9ca31a8372d0c353",
              "psk": "O3bwKSjnaoCxDoUxjcq4Rk8ZKkezQUiy"
            }
          ]
        }'
```

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": {
    "successfully_applied_psks": {
      "foo": {
        "ipsec_id": "12345_abc123def4567890abcdef1234567890",
        "ipsec_tunnel_id": "023e105f4ecef8ad9ca31a8372d0c353",
        "psk": "O3bwKSjnaoCxDoUxjcq4Rk8ZKkezQUiy",
        "psk_metadata": {
          "last_generated_on": "2017-06-14T05:20:00Z"
        }
      }
    },
    "unapplied_psks": {
      "foo": "string"
    }
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": {
    "successfully_applied_psks": {
      "foo": {
        "ipsec_id": "12345_abc123def4567890abcdef1234567890",
        "ipsec_tunnel_id": "023e105f4ecef8ad9ca31a8372d0c353",
        "psk": "O3bwKSjnaoCxDoUxjcq4Rk8ZKkezQUiy",
        "psk_metadata": {
          "last_generated_on": "2017-06-14T05:20:00Z"
        }
      }
    },
    "unapplied_psks": {
      "foo": "string"
    }
  },
  "success": true
}
```