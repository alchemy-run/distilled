---
title: Update WARP Connector HA configuration
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Tunnels](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels)

[WARP Connector](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/warp_connector)

[Configurations](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/warp_connector/subresources/configurations)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update WARP Connector HA configuration

PUT/accounts/{account\_id}/warp\_connector/{tunnel\_id}/configurations

Adds or updates the high-availability configuration for a WARP Connector tunnel.

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

`Cloudflare One Connectors Write``Cloudflare One Connector: WARP Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20zero_trust.tunnels.warp_connector.configurations%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

tunnel\_id: string

UUID of the tunnel.

formatuuid

maxLength36

[Link to this property](#)%20zero_trust.tunnels.warp_connector.configurations%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20tunnel_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

ha\_mode: "none"or "disabled"or "aws"or "local"

High-availability mode for the WARP Connector tunnel. <code>none</code> means HA is enabled but no provider is configured yet (newly created tunnels default to this). <code>disabled</code> means HA is explicitly turned off. <code>aws</code> uses AWS ENI move for failover. <code>local</code> uses virtual IPs (VIPs) on the local interface.

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

"aws"

<a href="#">Link to this property</a>

"local"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.tunnels.warp_connector.configurations%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20ha_mode%20%3E%20(schema)>)

<details>

<summary>

config: optional object {fnr\_id } or object {vips, vips\_previous } or unknown

Provider-specific configuration. Required shape depends on ha\_mode. For <code>aws</code>, must contain <code>fnr_id</code>. For <code>local</code>, must contain <code>vips</code>. For <code>none</code> and <code>disabled</code>, must be empty or omitted.

</summary>

One of the following:

<details>

<summary>

TunnelMeshAwsConfig object {fnr\_id }

</summary>

fnr\_id: string

Floating Network Resource ID — the secondary ENI that is moved between nodes on failover.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TunnelMeshLocalConfig object {vips, vips\_previous }

</summary>

<details>

<summary>

vips: array of object {address }

VIPs to assign on the CloudflareWARP interface.

</summary>

address: string

Virtual IP address (IPv4 or IPv6).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

vips\_previous: optional array of object {address }

VIPs to clean up on demotion or version drift.

</summary>

address: string

Virtual IP address (IPv4 or IPv6).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

unknown

Empty object for none/disabled modes.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.tunnels.warp_connector.configurations%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20config%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

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

[Link to this property](#)%20zero_trust.tunnels.warp_connector.configurations%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

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

[Link to this property](#)%20zero_trust.tunnels.warp_connector.configurations%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.tunnels.warp_connector.configurations%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {configuration\_version, created\_at, ha\_mode, 3 more }

</summary>

configuration\_version: number

Monotonically increasing configuration version, incremented on each PUT.

<a href="#">Link to this property</a>

created\_at: string

Timestamp of when the resource was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

ha\_mode: "none"or "disabled"or "aws"or "local"

High-availability mode for the WARP Connector tunnel. <code>none</code> means HA is enabled but no provider is configured yet (newly created tunnels default to this). <code>disabled</code> means HA is explicitly turned off. <code>aws</code> uses AWS ENI move for failover. <code>local</code> uses virtual IPs (VIPs) on the local interface.

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

"aws"

<a href="#">Link to this property</a>

"local"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tunnel\_id: string

UUID of the tunnel.

formatuuid

maxLength36

<a href="#">Link to this property</a>

<details>

<summary>

config: optional object {fnr\_id } or object {vips, vips\_previous }

Provider-specific configuration. Present for <code>aws</code> and <code>local</code> modes.

</summary>

One of the following:

<details>

<summary>

TunnelMeshAwsConfig object {fnr\_id }

</summary>

fnr\_id: string

Floating Network Resource ID — the secondary ENI that is moved between nodes on failover.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TunnelMeshLocalConfig object {vips, vips\_previous }

</summary>

<details>

<summary>

vips: array of object {address }

VIPs to assign on the CloudflareWARP interface.

</summary>

address: string

Virtual IP address (IPv4 or IPv6).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

vips\_previous: optional array of object {address }

VIPs to clean up on demotion or version drift.

</summary>

address: string

Virtual IP address (IPv4 or IPv6).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

Timestamp of the last update. Null if never updated.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.tunnels.warp_connector.configurations%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Update WARP Connector HA configuration

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/warp_connector/$TUNNEL_ID/configurations \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "ha_mode": "aws"
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
  "success": true,
  "result": {
    "configuration_version": 0,
    "created_at": "2021-01-25T18:22:34.317854Z",
    "ha_mode": "aws",
    "tunnel_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "config": {
      "fnr_id": "eni-0123456789abcdef0"
    },
    "updated_at": "2021-01-25T18:22:34.317854Z"
  }
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
  "success": true,
  "result": {
    "configuration_version": 0,
    "created_at": "2021-01-25T18:22:34.317854Z",
    "ha_mode": "aws",
    "tunnel_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "config": {
      "fnr_id": "eni-0123456789abcdef0"
    },
    "updated_at": "2021-01-25T18:22:34.317854Z"
  }
}
```