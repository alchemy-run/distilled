---
title: Delete a Warp Connector Tunnel
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Tunnels](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels)

[WARP Connector](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/warp_connector)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Delete a Warp Connector Tunnel

DELETE/accounts/{account\_id}/warp\_connector/{tunnel\_id}

Deletes a Warp Connector Tunnel from an account.

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

Cloudflare account ID

maxLength32

[Link to this property](#)%20zero_trust.tunnels.warp_connector%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

tunnel\_id: string

UUID of the tunnel.

formatuuid

maxLength36

[Link to this property](#)%20zero_trust.tunnels.warp_connector%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20tunnel_id%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.tunnels.warp_connector%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.tunnels.warp_connector%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {id, account\_tag, connections, 8 more }

A Warp Connector Tunnel that connects your origin to Cloudflare’s edge.

</summary>

id: optional string

UUID of the tunnel.

formatuuid

maxLength36

<a href="#">Link to this property</a>

account\_tag: optional string

Cloudflare account ID

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

Deprecatedconnections: optional array of object {id, client\_id, client\_version, 5 more }

This field will start returning an empty array. To fetch the connections of a given tunnel, please use the dedicated endpoint <code>/accounts/{account_id}/{tunnel_type}/{tunnel_id}/connections</code>

The Cloudflare Tunnel connections between your origin and Cloudflare’s edge.

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

Deprecatedis\_pending\_reconnect: optional boolean

This functionality has been removed. The is\_pending\_reconnect field will now always report false.

Cloudflare continues to track connections for several minutes after they disconnect. This is an optimization to improve latency and reliability of reconnecting. If <code>true</code>, the connection has disconnected but is still being tracked. If <code>false</code>, the connection is actively serving traffic.

<a href="#">Link to this property</a>

opened\_at: optional string

Timestamp of when the connection was established.

formatdate-time

<a href="#">Link to this property</a>

origin\_ip: optional string

The public IP address of the host running cloudflared.

<a href="#">Link to this property</a>

uuid: optional string

UUID of the Cloudflare Tunnel connection.

formatuuid

maxLength36

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

conns\_active\_at: optional string

Timestamp of when the tunnel established at least one connection to Cloudflare’s edge. If <code>null</code>, the tunnel is inactive.

formatdate-time

<a href="#">Link to this property</a>

conns\_inactive\_at: optional string

Timestamp of when the tunnel became inactive (no connections to Cloudflare’s edge). If <code>null</code>, the tunnel is active.

formatdate-time

<a href="#">Link to this property</a>

created\_at: optional string

Timestamp of when the resource was created.

formatdate-time

<a href="#">Link to this property</a>

deleted\_at: optional string

Timestamp of when the resource was deleted. If <code>null</code>, the resource has not been deleted.

formatdate-time

<a href="#">Link to this property</a>

metadata: optional unknown

Metadata associated with the tunnel.

<a href="#">Link to this property</a>

name: optional string

A user-friendly name for a tunnel.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "inactive"or "degraded"or "healthy"or "down"

The status of the tunnel. Valid values are <code>inactive</code> (tunnel has never been run), <code>degraded</code> (tunnel is active and able to serve traffic but in an unhealthy state), <code>healthy</code> (tunnel is active and able to serve traffic), or <code>down</code> (tunnel can not serve traffic as it has no connections to the Cloudflare Edge).

</summary>

One of the following:

"inactive"

<a href="#">Link to this property</a>

"degraded"

<a href="#">Link to this property</a>

"healthy"

<a href="#">Link to this property</a>

"down"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tun\_type: optional "cfd\_tunnel"or "warp\_connector"or "warp"or 4 more

The type of tunnel.

</summary>

One of the following:

"cfd\_tunnel"

<a href="#">Link to this property</a>

"warp\_connector"

<a href="#">Link to this property</a>

"warp"

<a href="#">Link to this property</a>

"magic"

<a href="#">Link to this property</a>

"ip\_sec"

<a href="#">Link to this property</a>

"gre"

<a href="#">Link to this property</a>

"cni"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.tunnels.warp_connector%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20zero_trust.tunnels.warp_connector%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Delete a Warp Connector Tunnel

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/warp_connector/$TUNNEL_ID \
    -X DELETE \
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
    "id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "account_tag": "699d98642c564d2e855e9661899b7252",
    "connections": [
      {
        "id": "1bedc50d-42b3-473c-b108-ff3d10c0d925",
        "client_id": "1bedc50d-42b3-473c-b108-ff3d10c0d925",
        "client_version": "2022.7.1",
        "colo_name": "DFW",
        "is_pending_reconnect": false,
        "opened_at": "2021-01-25T18:22:34.317854Z",
        "origin_ip": "10.1.0.137",
        "uuid": "1bedc50d-42b3-473c-b108-ff3d10c0d925"
      }
    ],
    "conns_active_at": "2009-11-10T23:00:00Z",
    "conns_inactive_at": "2009-11-10T23:00:00Z",
    "created_at": "2021-01-25T18:22:34.317854Z",
    "deleted_at": "2009-11-10T23:00:00Z",
    "metadata": {},
    "name": "blog",
    "status": "healthy",
    "tun_type": "cfd_tunnel"
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
    "id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "account_tag": "699d98642c564d2e855e9661899b7252",
    "connections": [
      {
        "id": "1bedc50d-42b3-473c-b108-ff3d10c0d925",
        "client_id": "1bedc50d-42b3-473c-b108-ff3d10c0d925",
        "client_version": "2022.7.1",
        "colo_name": "DFW",
        "is_pending_reconnect": false,
        "opened_at": "2021-01-25T18:22:34.317854Z",
        "origin_ip": "10.1.0.137",
        "uuid": "1bedc50d-42b3-473c-b108-ff3d10c0d925"
      }
    ],
    "conns_active_at": "2009-11-10T23:00:00Z",
    "conns_inactive_at": "2009-11-10T23:00:00Z",
    "created_at": "2021-01-25T18:22:34.317854Z",
    "deleted_at": "2009-11-10T23:00:00Z",
    "metadata": {},
    "name": "blog",
    "status": "healthy",
    "tun_type": "cfd_tunnel"
  },
  "success": true
}
```