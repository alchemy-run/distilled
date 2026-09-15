---
title: Connections
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Tunnels](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels)

[Cloudflared](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/cloudflared)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Connections

##### [List Cloudflare Tunnel connections](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/cloudflared/subresources/connections/methods/get)

GET/accounts/{account\_id}/cfd\_tunnel/{tunnel\_id}/connections

##### [Clean up Cloudflare Tunnel connections](https://developers.cloudflare.com/api/resources/zero_trust/subresources/tunnels/subresources/cloudflared/subresources/connections/methods/delete)

DELETE/accounts/{account\_id}/cfd\_tunnel/{tunnel\_id}/connections

##### ModelsExpand Collapse

<details>

<summary>

Client object {id, arch, config\_version, 4 more }

A client (typically cloudflared) that maintains connections to a Cloudflare data center.

</summary>

id: optional string

UUID of the Cloudflare Tunnel connection.

formatuuid

maxLength36

<a href="#">Link to this property</a>

arch: optional string

The cloudflared OS architecture used to establish this connection.

<a href="#">Link to this property</a>

config\_version: optional number

The version of the remote tunnel configuration. Used internally to sync cloudflared with the Zero Trust dashboard.

<a href="#">Link to this property</a>

<details>

<summary>

conns: optional array of object {id, client\_id, client\_version, 5 more }

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

features: optional array of string

Features enabled for the Cloudflare Tunnel.

<a href="#">Link to this property</a>

run\_at: optional string

Timestamp of when the tunnel connection was started.

formatdate-time

<a href="#">Link to this property</a>

version: optional string

The cloudflared version used to establish this connection.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.tunnels.cloudflared.connections%20%3E%20(model)%20client%20%3E%20(schema)>)

ConnectionDeleteResponse = unknown

[Link to this property](#)%20zero_trust.tunnels.cloudflared.connections%20%3E%20(model)%20connection_delete_response%20%3E%20(schema)>)