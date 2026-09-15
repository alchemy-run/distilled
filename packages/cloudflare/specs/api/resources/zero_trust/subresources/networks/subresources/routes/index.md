---
title: Routes
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Networks](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Routes

##### [List tunnel routes](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/routes/methods/list)

GET/accounts/{account\_id}/teamnet/routes

##### [Get tunnel route](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/routes/methods/get)

GET/accounts/{account\_id}/teamnet/routes/{route\_id}

##### [Create a tunnel route](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/routes/methods/create)

POST/accounts/{account\_id}/teamnet/routes

##### [Update a tunnel route](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/routes/methods/edit)

PATCH/accounts/{account\_id}/teamnet/routes/{route\_id}

##### [Delete a tunnel route](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/routes/methods/delete)

DELETE/accounts/{account\_id}/teamnet/routes/{route\_id}

##### ModelsExpand Collapse

<details>

<summary>

NetworkRoute object {id, comment, created\_at, 4 more }

</summary>

id: optional string

UUID of the route.

maxLength36

<a href="#">Link to this property</a>

comment: optional string

Optional remark describing the route.

maxLength100

<a href="#">Link to this property</a>

created\_at: optional string

Timestamp of when the resource was created.

formatdate-time

<a href="#">Link to this property</a>

deleted\_at: optional string

Timestamp of when the resource was deleted. If <code>null</code>, the resource has not been deleted.

formatdate-time

<a href="#">Link to this property</a>

network: optional string

The private IPv4 or IPv6 range connected by the route, in CIDR notation.

<a href="#">Link to this property</a>

tunnel\_id: optional string

UUID of the tunnel.

formatuuid

maxLength36

<a href="#">Link to this property</a>

virtual\_network\_id: optional string

UUID of the virtual network.

formatuuid

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.networks.routes%20%3E%20(model)%20network_route%20%3E%20(schema)>)

<details>

<summary>

Route object {id, comment, created\_at, 4 more }

</summary>

id: optional string

UUID of the route.

maxLength36

<a href="#">Link to this property</a>

comment: optional string

Optional remark describing the route.

maxLength100

<a href="#">Link to this property</a>

created\_at: optional string

Timestamp of when the resource was created.

formatdate-time

<a href="#">Link to this property</a>

deleted\_at: optional string

Timestamp of when the resource was deleted. If <code>null</code>, the resource has not been deleted.

formatdate-time

<a href="#">Link to this property</a>

network: optional string

The private IPv4 or IPv6 range connected by the route, in CIDR notation.

<a href="#">Link to this property</a>

tunnel\_id: optional string

UUID of the tunnel.

formatuuid

maxLength36

<a href="#">Link to this property</a>

virtual\_network\_id: optional string

UUID of the virtual network.

formatuuid

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.networks.routes%20%3E%20(model)%20route%20%3E%20(schema)>)

<details>

<summary>

Teamnet object {id, comment, created\_at, 7 more }

</summary>

id: optional string

UUID of the route.

maxLength36

<a href="#">Link to this property</a>

comment: optional string

Optional remark describing the route.

maxLength100

<a href="#">Link to this property</a>

created\_at: optional string

Timestamp of when the resource was created.

formatdate-time

<a href="#">Link to this property</a>

deleted\_at: optional string

Timestamp of when the resource was deleted. If <code>null</code>, the resource has not been deleted.

formatdate-time

<a href="#">Link to this property</a>

network: optional string

The private IPv4 or IPv6 range connected by the route, in CIDR notation.

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

tunnel\_id: optional string

UUID of the tunnel.

formatuuid

maxLength36

<a href="#">Link to this property</a>

tunnel\_name: optional string

A user-friendly name for a tunnel.

<a href="#">Link to this property</a>

virtual\_network\_id: optional string

UUID of the virtual network.

formatuuid

<a href="#">Link to this property</a>

virtual\_network\_name: optional string

A user-friendly name for the virtual network.

maxLength256

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.networks.routes%20%3E%20(model)%20teamnet%20%3E%20(schema)>)

#### RoutesIPs

##### [Get tunnel route by IP](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/routes/subresources/ips/methods/get)

GET/accounts/{account\_id}/teamnet/routes/ip/{ip}

#### RoutesNetworks

##### [Create a tunnel route (CIDR Endpoint)](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/routes/subresources/networks/methods/create)

Deprecated

POST/accounts/{account\_id}/teamnet/routes/network/{ip\_network\_encoded}

##### [Update a tunnel route (CIDR Endpoint)](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/routes/subresources/networks/methods/edit)

Deprecated

PATCH/accounts/{account\_id}/teamnet/routes/network/{ip\_network\_encoded}

##### [Delete a tunnel route (CIDR Endpoint)](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/routes/subresources/networks/methods/delete)

Deprecated

DELETE/accounts/{account\_id}/teamnet/routes/network/{ip\_network\_encoded}