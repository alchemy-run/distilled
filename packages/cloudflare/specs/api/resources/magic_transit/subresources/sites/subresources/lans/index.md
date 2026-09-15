---
title: LANs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Magic Transit](https://developers.cloudflare.com/api/resources/magic_transit)

[Sites](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# LANs

##### [List Site LANs](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/lans/methods/list)

GET/accounts/{account\_id}/magic/sites/{site\_id}/lans

##### [Site LAN Details](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/lans/methods/get)

GET/accounts/{account\_id}/magic/sites/{site\_id}/lans/{lan\_id}

##### [Create a new Site LAN](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/lans/methods/create)

POST/accounts/{account\_id}/magic/sites/{site\_id}/lans

##### [Update Site LAN](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/lans/methods/update)

PUT/accounts/{account\_id}/magic/sites/{site\_id}/lans/{lan\_id}

##### [Patch Site LAN](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/lans/methods/edit)

PATCH/accounts/{account\_id}/magic/sites/{site\_id}/lans/{lan\_id}

##### [Delete Site LAN](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/lans/methods/delete)

DELETE/accounts/{account\_id}/magic/sites/{site\_id}/lans/{lan\_id}

##### ModelsExpand Collapse

<details>

<summary>

DHCPRelay object {server\_addresses }

</summary>

server\_addresses: optional array of string

List of DHCP server IPs.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.lans%20%3E%20(model)%20dhcp_relay%20%3E%20(schema)>)

<details>

<summary>

DHCPServer object {dhcp\_options, dhcp\_pool\_end, dhcp\_pool\_start, 3 more }

</summary>

<details>

<summary>

dhcp\_options: optional array of object {code, type, value }

Optional list of custom DHCP options to include in DHCP responses. Only valid when DHCP server is enabled.

</summary>

code: number

DHCP option number (1-254). Options 0 and 255 are reserved by RFC 2132. Options 3, 6, and 51 are not allowed because they conflict with connector-managed configuration.

maximum254

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

type: "text"or "hex"or "ip"or 3 more

The type of the option value. text: a string (max 255 bytes). hex: colon-separated hex bytes (e.g. “01:04:aa:bb:cc”, max 255 bytes). ip: an IPv4 address (e.g. “10.20.30.40”). byte: an unsigned integer 0-255 (1 byte). short: an unsigned integer 0-65535 (2 bytes). integer: an unsigned integer 0-4294967295 (4 bytes).

</summary>

One of the following:

"text"

<a href="#">Link to this property</a>

"hex"

<a href="#">Link to this property</a>

"ip"

<a href="#">Link to this property</a>

"byte"

<a href="#">Link to this property</a>

"short"

<a href="#">Link to this property</a>

"integer"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: string

The option value, interpreted according to the type field.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

dhcp\_pool\_end: optional string

A valid IPv4 address.

<a href="#">Link to this property</a>

dhcp\_pool\_start: optional string

A valid IPv4 address.

<a href="#">Link to this property</a>

Deprecateddns\_server: optional string

A valid IPv4 address.

<a href="#">Link to this property</a>

dns\_servers: optional array of string

<a href="#">Link to this property</a>

reservations: optional map\[string]

Mapping of MAC addresses to IP addresses

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.lans%20%3E%20(model)%20dhcp_server%20%3E%20(schema)>)

<details>

<summary>

LAN object {id, bond\_id, ha\_link, 9 more }

</summary>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

bond\_id: optional number

<a href="#">Link to this property</a>

ha\_link: optional boolean

mark true to use this LAN for HA probing. only works for site with HA turned on. only one LAN can be set as the ha\_link.

<a href="#">Link to this property</a>

is\_breakout: optional boolean

mark true to use this LAN for source-based breakout traffic

<a href="#">Link to this property</a>

is\_prioritized: optional boolean

mark true to use this LAN for source-based prioritized traffic

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

nat: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.lans%20%3E%20(model)%20nat%20%3E%20(schema)">Nat</a> { static\_prefix }

<a href="#">Link to this property</a>

physport: optional number

<a href="#">Link to this property</a>

<details>

<summary>

routed\_subnets: optional array of <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.lans%20%3E%20(model)%20routed_subnet%20%3E%20(schema)">RoutedSubnet</a> { next\_hop, prefix, nat }

</summary>

next\_hop: string

A valid IPv4 address.

<a href="#">Link to this property</a>

prefix: string

A valid CIDR notation representing an IP range.

<a href="#">Link to this property</a>

nat: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.lans%20%3E%20(model)%20nat%20%3E%20(schema)">Nat</a> { static\_prefix }

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

static\_addressing: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.lans%20%3E%20(model)%20lan_static_addressing%20%3E%20(schema)">LANStaticAddressing</a> { address, dhcp\_relay, dhcp\_server, 2 more }

If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static\_address is required along with secondary and virtual address.

<a href="#">Link to this property</a>

vlan\_tag: optional number

VLAN ID. Use zero for untagged.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.lans%20%3E%20(model)%20lan%20%3E%20(schema)>)

<details>

<summary>

LANStaticAddressing object {address, dhcp\_relay, dhcp\_server, 2 more }

If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static\_address is required along with secondary and virtual address.

</summary>

address: string

A valid CIDR notation representing an IP range.

<a href="#">Link to this property</a>

dhcp\_relay: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.lans%20%3E%20(model)%20dhcp_relay%20%3E%20(schema)">DHCPRelay</a> { server\_addresses }

<a href="#">Link to this property</a>

dhcp\_server: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.lans%20%3E%20(model)%20dhcp_server%20%3E%20(schema)">DHCPServer</a> { dhcp\_options, dhcp\_pool\_end, dhcp\_pool\_start, 3 more }

<a href="#">Link to this property</a>

secondary\_address: optional string

A valid CIDR notation representing an IP range.

<a href="#">Link to this property</a>

virtual\_address: optional string

A valid CIDR notation representing an IP range.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.lans%20%3E%20(model)%20lan_static_addressing%20%3E%20(schema)>)

<details>

<summary>

Nat object {static\_prefix }

</summary>

static\_prefix: optional string

A valid CIDR notation representing an IP range.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.lans%20%3E%20(model)%20nat%20%3E%20(schema)>)

<details>

<summary>

RoutedSubnet object {next\_hop, prefix, nat }

</summary>

next\_hop: string

A valid IPv4 address.

<a href="#">Link to this property</a>

prefix: string

A valid CIDR notation representing an IP range.

<a href="#">Link to this property</a>

nat: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.lans%20%3E%20(model)%20nat%20%3E%20(schema)">Nat</a> { static\_prefix }

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.lans%20%3E%20(model)%20routed_subnet%20%3E%20(schema)>)