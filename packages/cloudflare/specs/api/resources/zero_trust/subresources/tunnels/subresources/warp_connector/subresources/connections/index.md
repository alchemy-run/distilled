---
title: Connections
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

# Connections

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