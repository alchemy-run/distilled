---
title: Get WARP Connector Tunnel connector
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Tunnels](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels)

[WARP Connector](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/warp_connector)

[Connectors](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/warp_connector/subresources/connectors)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get WARP Connector Tunnel connector

GET/accounts/{account\_id}/warp\_connector/{tunnel\_id}/connectors/{connector\_id}

Fetches connector and connection details for a WARP Connector Tunnel.

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

`Cloudflare One Connectors Write``Cloudflare One Connectors Read``Cloudflare One Connector: WARP Write``Cloudflare One Connector: WARP Read`

##### P ath ParametersExpand Collapse

account\_id: string

Cloudflare account ID

maxLength32

[Link to this property](#)%20zero_trust.tunnels.warp_connector.connectors%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

tunnel\_id: string

UUID of the tunnel.

formatuuid

maxLength36

[Link to this property](#)%20zero_trust.tunnels.warp_connector.connectors%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20tunnel_id%20%3E%20(schema)>)

connector\_id: string

UUID of the Cloudflare Tunnel connector.

formatuuid

maxLength36

[Link to this property](#)%20zero_trust.tunnels.warp_connector.connectors%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20connector_id%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.tunnels.warp_connector.connectors%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.tunnels.warp_connector.connectors%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {id, arch, conns, 4 more }

A WARP Connector client that maintains a connection to a Cloudflare data center.

</summary>

id: optional string

UUID of the Cloudflare Tunnel connector.

formatuuid

maxLength36

<a href="#">Link to this property</a>

arch: optional string

The cloudflared OS architecture used to establish this connection.

<a href="#">Link to this property</a>

<details>

<summary>

conns: optional array of object {id, client\_id, client\_version, 3 more }

The WARP Connector Tunnel connections between your origin and Cloudflare’s edge.

</summary>

id: optional string

UUID of the Cloudflare Tunnel connection.

formatuuid

maxLength36

<a href="#">Link to this property</a>

client\_id: optional string

UUID of the Cloudflare Tunnel connector.

formatuuid

maxLength36

<a href="#">Link to this property</a>

client\_version: optional string

The cloudflared version used to establish this connection.

<a href="#">Link to this property</a>

colo\_name: optional string

The Cloudflare data center used for this connection.

<a href="#">Link to this property</a>

opened\_at: optional string

Timestamp of when the connection was established.

formatdate-time

<a href="#">Link to this property</a>

origin\_ip: optional string

The public IP address of the host running WARP Connector.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

features: optional array of string

Features enabled for the Cloudflare Tunnel.

<a href="#">Link to this property</a>

<details>

<summary>

ha\_status: optional "offline"or "passive"or "active"

The HA status of a WARP Connector client.

</summary>

One of the following:

"offline"

<a href="#">Link to this property</a>

"passive"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

run\_at: optional string

Timestamp of when the tunnel connection was started.

formatdate-time

<a href="#">Link to this property</a>

version: optional string

The cloudflared version used to establish this connection.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.tunnels.warp_connector.connectors%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20zero_trust.tunnels.warp_connector.connectors%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get WARP Connector Tunnel connector

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/warp_connector/$TUNNEL_ID/connectors/$CONNECTOR_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
    "id": "1bedc50d-42b3-473c-b108-ff3d10c0d925",
    "arch": "linux_amd64",
    "conns": [
      {
        "id": "1bedc50d-42b3-473c-b108-ff3d10c0d925",
        "client_id": "1bedc50d-42b3-473c-b108-ff3d10c0d925",
        "client_version": "2022.7.1",
        "colo_name": "DFW",
        "opened_at": "2021-01-25T18:22:34.317854Z",
        "origin_ip": "10.1.0.137"
      }
    ],
    "features": [
      "ha-origin"
    ],
    "ha_status": "offline",
    "run_at": "2009-11-10T23:00:00Z",
    "version": "2022.7.1"
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
    "id": "1bedc50d-42b3-473c-b108-ff3d10c0d925",
    "arch": "linux_amd64",
    "conns": [
      {
        "id": "1bedc50d-42b3-473c-b108-ff3d10c0d925",
        "client_id": "1bedc50d-42b3-473c-b108-ff3d10c0d925",
        "client_version": "2022.7.1",
        "colo_name": "DFW",
        "opened_at": "2021-01-25T18:22:34.317854Z",
        "origin_ip": "10.1.0.137"
      }
    ],
    "features": [
      "ha-origin"
    ],
    "ha_status": "offline",
    "run_at": "2009-11-10T23:00:00Z",
    "version": "2022.7.1"
  },
  "success": true
}
```