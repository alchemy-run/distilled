---
title: WARP Connector
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Tunnels](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# WARP Connector

##### [List Warp Connector Tunnels](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/warp_connector/methods/list)

GET/accounts/{account\_id}/warp\_connector

##### [Get a Warp Connector Tunnel](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/warp_connector/methods/get)

GET/accounts/{account\_id}/warp\_connector/{tunnel\_id}

##### [Create a Warp Connector Tunnel](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/warp_connector/methods/create)

POST/accounts/{account\_id}/warp\_connector

##### [Update a Warp Connector Tunnel](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/warp_connector/methods/edit)

PATCH/accounts/{account\_id}/warp\_connector/{tunnel\_id}

##### [Delete a Warp Connector Tunnel](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/warp_connector/methods/delete)

DELETE/accounts/{account\_id}/warp\_connector/{tunnel\_id}

##### ModelsExpand Collapse

<details>

<summary>

WARPConnectorListResponse object {id, account\_tag, connections, 8 more }

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

[Link to this property](#)%20zero_trust.tunnels.warp_connector%20%3E%20(model)%20warp_connector_list_response%20%3E%20(schema)>)

<details>

<summary>

WARPConnectorGetResponse object {id, account\_tag, connections, 8 more }

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

[Link to this property](#)%20zero_trust.tunnels.warp_connector%20%3E%20(model)%20warp_connector_get_response%20%3E%20(schema)>)

<details>

<summary>

WARPConnectorCreateResponse object {id, account\_tag, connections, 8 more }

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

[Link to this property](#)%20zero_trust.tunnels.warp_connector%20%3E%20(model)%20warp_connector_create_response%20%3E%20(schema)>)

<details>

<summary>

WARPConnectorEditResponse object {id, account\_tag, connections, 8 more }

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

[Link to this property](#)%20zero_trust.tunnels.warp_connector%20%3E%20(model)%20warp_connector_edit_response%20%3E%20(schema)>)

<details>

<summary>

WARPConnectorDeleteResponse object {id, account\_tag, connections, 8 more }

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

[Link to this property](#)%20zero_trust.tunnels.warp_connector%20%3E%20(model)%20warp_connector_delete_response%20%3E%20(schema)>)

#### WARP ConnectorToken

##### [Get a Warp Connector Tunnel token](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/warp_connector/subresources/token/methods/get)

GET/accounts/{account\_id}/warp\_connector/{tunnel\_id}/token

##### ModelsExpand Collapse

TokenGetResponse = string

The Tunnel Token is used as a mechanism to authenticate the operation of a tunnel.

[Link to this property](#)%20zero_trust.tunnels.warp_connector.token%20%3E%20(model)%20token_get_response%20%3E%20(schema)>)

#### WARP ConnectorConnections

##### [List WARP Connector Tunnel connections](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/warp_connector/subresources/connections/methods/get)

GET/accounts/{account\_id}/warp\_connector/{tunnel\_id}/connections

##### ModelsExpand Collapse

<details>

<summary>

ConnectionGetResponse object {id, arch, conns, 4 more }

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

[Link to this property](#)%20zero_trust.tunnels.warp_connector.connections%20%3E%20(model)%20connection_get_response%20%3E%20(schema)>)

#### WARP ConnectorConnectors

##### [Get WARP Connector Tunnel connector](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/warp_connector/subresources/connectors/methods/get)

GET/accounts/{account\_id}/warp\_connector/{tunnel\_id}/connectors/{connector\_id}

##### ModelsExpand Collapse

<details>

<summary>

ConnectorGetResponse object {id, arch, conns, 4 more }

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

[Link to this property](#)%20zero_trust.tunnels.warp_connector.connectors%20%3E%20(model)%20connector_get_response%20%3E%20(schema)>)

#### WARP ConnectorFailover

##### [Trigger a manual failover for a WARP Connector Tunnel](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/warp_connector/subresources/failover/methods/update)

PUT/accounts/{account\_id}/warp\_connector/{tunnel\_id}/failover

##### ModelsExpand Collapse

FailoverUpdateResponse = unknown

[Link to this property](#)%20zero_trust.tunnels.warp_connector.failover%20%3E%20(model)%20failover_update_response%20%3E%20(schema)>)

#### WARP ConnectorConfigurations

##### [Get WARP Connector HA configuration](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/warp_connector/subresources/configurations/methods/get)

GET/accounts/{account\_id}/warp\_connector/{tunnel\_id}/configurations

##### [Update WARP Connector HA configuration](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/warp_connector/subresources/configurations/methods/update)

PUT/accounts/{account\_id}/warp\_connector/{tunnel\_id}/configurations

##### ModelsExpand Collapse

<details>

<summary>

ConfigurationGetResponse object {configuration\_version, created\_at, ha\_mode, 3 more }

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

[Link to this property](#)%20zero_trust.tunnels.warp_connector.configurations%20%3E%20(model)%20configuration_get_response%20%3E%20(schema)>)

<details>

<summary>

ConfigurationUpdateResponse object {configuration\_version, created\_at, ha\_mode, 3 more }

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

[Link to this property](#)%20zero_trust.tunnels.warp_connector.configurations%20%3E%20(model)%20configuration_update_response%20%3E%20(schema)>)