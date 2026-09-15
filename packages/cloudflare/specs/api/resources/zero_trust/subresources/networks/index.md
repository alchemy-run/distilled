---
title: Networks
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Networks

#### NetworksRoutes

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

#### NetworksRoutesIPs

##### [Get tunnel route by IP](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/routes/subresources/ips/methods/get)

GET/accounts/{account\_id}/teamnet/routes/ip/{ip}

#### NetworksRoutesNetworks

##### [Create a tunnel route (CIDR Endpoint)](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/routes/subresources/networks/methods/create)

Deprecated

POST/accounts/{account\_id}/teamnet/routes/network/{ip\_network\_encoded}

##### [Update a tunnel route (CIDR Endpoint)](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/routes/subresources/networks/methods/edit)

Deprecated

PATCH/accounts/{account\_id}/teamnet/routes/network/{ip\_network\_encoded}

##### [Delete a tunnel route (CIDR Endpoint)](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/routes/subresources/networks/methods/delete)

Deprecated

DELETE/accounts/{account\_id}/teamnet/routes/network/{ip\_network\_encoded}

#### NetworksVirtual Networks

##### [List virtual networks](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/virtual_networks/methods/list)

GET/accounts/{account\_id}/teamnet/virtual\_networks

##### [Get a virtual network](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/virtual_networks/methods/get)

GET/accounts/{account\_id}/teamnet/virtual\_networks/{virtual\_network\_id}

##### [Create a virtual network](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/virtual_networks/methods/create)

POST/accounts/{account\_id}/teamnet/virtual\_networks

##### [Update a virtual network](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/virtual_networks/methods/edit)

PATCH/accounts/{account\_id}/teamnet/virtual\_networks/{virtual\_network\_id}

##### [Delete a virtual network](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/virtual_networks/methods/delete)

DELETE/accounts/{account\_id}/teamnet/virtual\_networks/{virtual\_network\_id}

##### ModelsExpand Collapse

<details>

<summary>

VirtualNetwork object {id, comment, created\_at, 3 more }

</summary>

id: string

UUID of the virtual network.

formatuuid

<a href="#">Link to this property</a>

comment: string

Optional remark describing the virtual network.

maxLength256

<a href="#">Link to this property</a>

created\_at: string

Timestamp of when the resource was created.

formatdate-time

<a href="#">Link to this property</a>

is\_default\_network: boolean

If <code>true</code>, this virtual network is the default for the account.

<a href="#">Link to this property</a>

name: string

A user-friendly name for the virtual network.

maxLength256

<a href="#">Link to this property</a>

deleted\_at: optional string

Timestamp of when the resource was deleted. If <code>null</code>, the resource has not been deleted.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.networks.virtual_networks%20%3E%20(model)%20virtual_network%20%3E%20(schema)>)

#### NetworksSubnets

##### [List Subnets](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/subnets/methods/list)

GET/accounts/{account\_id}/zerotrust/subnets

#### NetworksSubnetsWARP

##### [Create WARP IP subnet](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/subnets/subresources/warp/methods/create)

POST/accounts/{account\_id}/zerotrust/subnets/warp

##### [Get WARP IP subnet](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/subnets/subresources/warp/methods/get)

GET/accounts/{account\_id}/zerotrust/subnets/warp/{subnet\_id}

##### [Update WARP IP subnet](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/subnets/subresources/warp/methods/edit)

PATCH/accounts/{account\_id}/zerotrust/subnets/warp/{subnet\_id}

##### [Delete WARP IP subnet](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/subnets/subresources/warp/methods/delete)

DELETE/accounts/{account\_id}/zerotrust/subnets/warp/{subnet\_id}

##### ModelsExpand Collapse

<details>

<summary>

Subnet object {id, capacity, comment, 6 more }

</summary>

id: optional string

The UUID of the subnet.

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

capacity: optional object {total, used }

IP capacity information for the subnet.

</summary>

total: optional number

Total number of assignable IPs in the subnet.

<a href="#">Link to this property</a>

used: optional number

Number of assigned IPs in the subnet.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

comment: optional string

An optional description of the subnet.

<a href="#">Link to this property</a>

created\_at: optional string

Timestamp of when the resource was created.

formatdate-time

<a href="#">Link to this property</a>

deleted\_at: optional string

Timestamp of when the resource was deleted. If <code>null</code>, the resource has not been deleted.

formatdate-time

<a href="#">Link to this property</a>

is\_default\_network: optional boolean

If <code>true</code>, this is the default subnet for the account. There can only be one default subnet per account.

<a href="#">Link to this property</a>

name: optional string

A user-friendly name for the subnet.

<a href="#">Link to this property</a>

network: optional string

The private IPv4 or IPv6 range defining the subnet, in CIDR notation.

<a href="#">Link to this property</a>

<details>

<summary>

subnet\_type: optional "cloudflare\_source"or "initial\_resolved\_ip"or "warp"

The type of subnet.

</summary>

One of the following:

"cloudflare\_source"

<a href="#">Link to this property</a>

"initial\_resolved\_ip"

<a href="#">Link to this property</a>

"warp"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.networks.subnets.warp%20%3E%20(model)%20subnet%20%3E%20(schema)>)

<details>

<summary>

WARPDeleteResponse object {id, capacity, comment, 6 more }

</summary>

id: optional string

The UUID of the subnet.

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

capacity: optional object {total, used }

IP capacity information for the subnet.

</summary>

total: optional number

Total number of assignable IPs in the subnet.

<a href="#">Link to this property</a>

used: optional number

Number of assigned IPs in the subnet.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

comment: optional string

An optional description of the subnet.

<a href="#">Link to this property</a>

created\_at: optional string

Timestamp of when the resource was created.

formatdate-time

<a href="#">Link to this property</a>

deleted\_at: optional string

Timestamp of when the resource was deleted. If <code>null</code>, the resource has not been deleted.

formatdate-time

<a href="#">Link to this property</a>

is\_default\_network: optional boolean

If <code>true</code>, this is the default subnet for the account. There can only be one default subnet per account.

<a href="#">Link to this property</a>

name: optional string

A user-friendly name for the subnet.

<a href="#">Link to this property</a>

network: optional string

The private IPv4 or IPv6 range defining the subnet, in CIDR notation.

<a href="#">Link to this property</a>

<details>

<summary>

subnet\_type: optional "cloudflare\_source"or "initial\_resolved\_ip"or "warp"

The type of subnet.

</summary>

One of the following:

"cloudflare\_source"

<a href="#">Link to this property</a>

"initial\_resolved\_ip"

<a href="#">Link to this property</a>

"warp"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.networks.subnets.warp%20%3E%20(model)%20warp_delete_response%20%3E%20(schema)>)

#### NetworksSubnetsCloudflare Source

##### [Update Cloudflare Source Subnet](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/subnets/subresources/cloudflare_source/methods/update)

PATCH/accounts/{account\_id}/zerotrust/subnets/cloudflare\_source/{address\_family}

#### NetworksSubnetsInitial Resolved IP

##### [Get Initial Resolved IP Subnet](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/subnets/subresources/initial_resolved_ip/methods/get)

GET/accounts/{account\_id}/zerotrust/subnets/initial\_resolved\_ip/{address\_family}

##### [Update Initial Resolved IP Subnet](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/subnets/subresources/initial_resolved_ip/methods/update)

PUT/accounts/{account\_id}/zerotrust/subnets/initial\_resolved\_ip/{address\_family}

#### NetworksHostname Routes

##### [List hostname routes](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/hostname_routes/methods/list)

GET/accounts/{account\_id}/zerotrust/routes/hostname

##### [Get hostname route](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/hostname_routes/methods/get)

GET/accounts/{account\_id}/zerotrust/routes/hostname/{hostname\_route\_id}

##### [Create hostname route](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/hostname_routes/methods/create)

POST/accounts/{account\_id}/zerotrust/routes/hostname

##### [Update hostname route](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/hostname_routes/methods/edit)

PATCH/accounts/{account\_id}/zerotrust/routes/hostname/{hostname\_route\_id}

##### [Delete hostname route](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/hostname_routes/methods/delete)

DELETE/accounts/{account\_id}/zerotrust/routes/hostname/{hostname\_route\_id}

##### ModelsExpand Collapse

<details>

<summary>

HostnameRoute object {id, comment, created\_at, 5 more }

</summary>

id: optional string

The hostname route ID.

formatuuid

<a href="#">Link to this property</a>

comment: optional string

An optional description of the hostname route.

<a href="#">Link to this property</a>

created\_at: optional string

Timestamp of when the resource was created.

formatdate-time

<a href="#">Link to this property</a>

deleted\_at: optional string

Timestamp of when the resource was deleted. If <code>null</code>, the resource has not been deleted.

formatdate-time

<a href="#">Link to this property</a>

hostname: optional string

The hostname of the route.

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

</details>

[Link to this property](#)%20zero_trust.networks.hostname_routes%20%3E%20(model)%20hostname_route%20%3E%20(schema)>)