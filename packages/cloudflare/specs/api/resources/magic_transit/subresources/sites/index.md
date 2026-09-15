---
title: Sites
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Magic Transit](https://developers.cloudflare.com/api/resources/magic_transit)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Sites

##### [List Sites](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/methods/list)

GET/accounts/{account\_id}/magic/sites

##### [Site Details](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/methods/get)

GET/accounts/{account\_id}/magic/sites/{site\_id}

##### [Create a new Site](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/methods/create)

POST/accounts/{account\_id}/magic/sites

##### [Update Site](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/methods/update)

PUT/accounts/{account\_id}/magic/sites/{site\_id}

##### [Patch Site](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/methods/edit)

PATCH/accounts/{account\_id}/magic/sites/{site\_id}

##### [Delete Site](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/methods/delete)

DELETE/accounts/{account\_id}/magic/sites/{site\_id}

##### ModelsExpand Collapse

<details>

<summary>

Site object {id, connector\_id, description, 4 more }

</summary>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

connector\_id: optional string

Magic Connector identifier tag.

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

ha\_mode: optional boolean

Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode.

<a href="#">Link to this property</a>

location: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites%20%3E%20(model)%20site_location%20%3E%20(schema)">SiteLocation</a> { lat, lon }

Location of site in latitude and longitude.

<a href="#">Link to this property</a>

name: optional string

The name of the site.

<a href="#">Link to this property</a>

secondary\_connector\_id: optional string

Magic Connector identifier tag. Used when high availability mode is on.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites%20%3E%20(model)%20site%20%3E%20(schema)>)

<details>

<summary>

SiteLocation object {lat, lon }

Location of site in latitude and longitude.

</summary>

lat: optional string

Latitude

<a href="#">Link to this property</a>

lon: optional string

Longitude

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites%20%3E%20(model)%20site_location%20%3E%20(schema)>)

#### SitesApp Configuration

##### [List App Configs](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/app_configuration/methods/list)

GET/accounts/{account\_id}/magic/sites/{site\_id}/app\_configs

##### [Create a new App Config](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/app_configuration/methods/create)

POST/accounts/{account\_id}/magic/sites/{site\_id}/app\_configs

##### [Update an App Config](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/app_configuration/methods/update)

PUT/accounts/{account\_id}/magic/sites/{site\_id}/app\_configs/{app\_config\_id}

##### [Update an App Config](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/app_configuration/methods/edit)

PATCH/accounts/{account\_id}/magic/sites/{site\_id}/app\_configs/{app\_config\_id}

##### [Delete App Config](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/app_configuration/methods/delete)

DELETE/accounts/{account\_id}/magic/sites/{site\_id}/app\_configs/{app\_config\_id}

##### ModelsExpand Collapse

<details>

<summary>

AppConfigurationListResponse = object {account\_app\_id, id, breakout, 3 more } or object {managed\_app\_id, id, breakout, 3 more }

Traffic decision configuration for an app.

</summary>

One of the following:

<details>

<summary>

AccountApp object {account\_app\_id, id, breakout, 3 more }

</summary>

account\_app\_id: string

Magic account app ID.

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

breakout: optional boolean

Whether to breakout traffic to the app’s endpoints directly. Null preserves default behavior.

<a href="#">Link to this property</a>

preferred\_wans: optional array of string

WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

<a href="#">Link to this property</a>

priority: optional number

Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

maximum1

minimum0

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ManagedApp object {managed\_app\_id, id, breakout, 3 more }

</summary>

managed\_app\_id: string

Managed app ID.

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

breakout: optional boolean

Whether to breakout traffic to the app’s endpoints directly. Null preserves default behavior.

<a href="#">Link to this property</a>

preferred\_wans: optional array of string

WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

<a href="#">Link to this property</a>

priority: optional number

Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

maximum1

minimum0

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.app_configuration%20%3E%20(model)%20app_configuration_list_response%20%3E%20(schema)>)

<details>

<summary>

AppConfigurationCreateResponse = object {account\_app\_id, id, breakout, 3 more } or object {managed\_app\_id, id, breakout, 3 more }

Traffic decision configuration for an app.

</summary>

One of the following:

<details>

<summary>

AccountApp object {account\_app\_id, id, breakout, 3 more }

</summary>

account\_app\_id: string

Magic account app ID.

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

breakout: optional boolean

Whether to breakout traffic to the app’s endpoints directly. Null preserves default behavior.

<a href="#">Link to this property</a>

preferred\_wans: optional array of string

WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

<a href="#">Link to this property</a>

priority: optional number

Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

maximum1

minimum0

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ManagedApp object {managed\_app\_id, id, breakout, 3 more }

</summary>

managed\_app\_id: string

Managed app ID.

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

breakout: optional boolean

Whether to breakout traffic to the app’s endpoints directly. Null preserves default behavior.

<a href="#">Link to this property</a>

preferred\_wans: optional array of string

WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

<a href="#">Link to this property</a>

priority: optional number

Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

maximum1

minimum0

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.app_configuration%20%3E%20(model)%20app_configuration_create_response%20%3E%20(schema)>)

<details>

<summary>

AppConfigurationUpdateResponse = object {account\_app\_id, id, breakout, 3 more } or object {managed\_app\_id, id, breakout, 3 more }

Traffic decision configuration for an app.

</summary>

One of the following:

<details>

<summary>

AccountApp object {account\_app\_id, id, breakout, 3 more }

</summary>

account\_app\_id: string

Magic account app ID.

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

breakout: optional boolean

Whether to breakout traffic to the app’s endpoints directly. Null preserves default behavior.

<a href="#">Link to this property</a>

preferred\_wans: optional array of string

WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

<a href="#">Link to this property</a>

priority: optional number

Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

maximum1

minimum0

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ManagedApp object {managed\_app\_id, id, breakout, 3 more }

</summary>

managed\_app\_id: string

Managed app ID.

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

breakout: optional boolean

Whether to breakout traffic to the app’s endpoints directly. Null preserves default behavior.

<a href="#">Link to this property</a>

preferred\_wans: optional array of string

WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

<a href="#">Link to this property</a>

priority: optional number

Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

maximum1

minimum0

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.app_configuration%20%3E%20(model)%20app_configuration_update_response%20%3E%20(schema)>)

<details>

<summary>

AppConfigurationEditResponse = object {account\_app\_id, id, breakout, 3 more } or object {managed\_app\_id, id, breakout, 3 more }

Traffic decision configuration for an app.

</summary>

One of the following:

<details>

<summary>

AccountApp object {account\_app\_id, id, breakout, 3 more }

</summary>

account\_app\_id: string

Magic account app ID.

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

breakout: optional boolean

Whether to breakout traffic to the app’s endpoints directly. Null preserves default behavior.

<a href="#">Link to this property</a>

preferred\_wans: optional array of string

WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

<a href="#">Link to this property</a>

priority: optional number

Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

maximum1

minimum0

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ManagedApp object {managed\_app\_id, id, breakout, 3 more }

</summary>

managed\_app\_id: string

Managed app ID.

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

breakout: optional boolean

Whether to breakout traffic to the app’s endpoints directly. Null preserves default behavior.

<a href="#">Link to this property</a>

preferred\_wans: optional array of string

WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

<a href="#">Link to this property</a>

priority: optional number

Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

maximum1

minimum0

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.app_configuration%20%3E%20(model)%20app_configuration_edit_response%20%3E%20(schema)>)

<details>

<summary>

AppConfigurationDeleteResponse = object {account\_app\_id, id, breakout, 3 more } or object {managed\_app\_id, id, breakout, 3 more }

Traffic decision configuration for an app.

</summary>

One of the following:

<details>

<summary>

AccountApp object {account\_app\_id, id, breakout, 3 more }

</summary>

account\_app\_id: string

Magic account app ID.

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

breakout: optional boolean

Whether to breakout traffic to the app’s endpoints directly. Null preserves default behavior.

<a href="#">Link to this property</a>

preferred\_wans: optional array of string

WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

<a href="#">Link to this property</a>

priority: optional number

Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

maximum1

minimum0

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ManagedApp object {managed\_app\_id, id, breakout, 3 more }

</summary>

managed\_app\_id: string

Managed app ID.

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

breakout: optional boolean

Whether to breakout traffic to the app’s endpoints directly. Null preserves default behavior.

<a href="#">Link to this property</a>

preferred\_wans: optional array of string

WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

<a href="#">Link to this property</a>

priority: optional number

Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

maximum1

minimum0

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.app_configuration%20%3E%20(model)%20app_configuration_delete_response%20%3E%20(schema)>)

#### SitesACLs

##### [List Site ACLs](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/acls/methods/list)

GET/accounts/{account\_id}/magic/sites/{site\_id}/acls

##### [Site ACL Details](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/acls/methods/get)

GET/accounts/{account\_id}/magic/sites/{site\_id}/acls/{acl\_id}

##### [Create a new Site ACL](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/acls/methods/create)

POST/accounts/{account\_id}/magic/sites/{site\_id}/acls

##### [Update Site ACL](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/acls/methods/update)

PUT/accounts/{account\_id}/magic/sites/{site\_id}/acls/{acl\_id}

##### [Patch Site ACL](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/acls/methods/edit)

PATCH/accounts/{account\_id}/magic/sites/{site\_id}/acls/{acl\_id}

##### [Delete Site ACL](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/acls/methods/delete)

DELETE/accounts/{account\_id}/magic/sites/{site\_id}/acls/{acl\_id}

##### ModelsExpand Collapse

<details>

<summary>

ACL object {id, description, forward\_locally, 5 more }

Bidirectional ACL policy for network traffic within a site.

</summary>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

description: optional string

Description for the ACL.

<a href="#">Link to this property</a>

forward\_locally: optional boolean

The desired forwarding action for this ACL policy. If set to “false”, the policy will forward traffic to Cloudflare. If set to “true”, the policy will forward traffic locally on the Magic Connector. If not included in request, will default to false.

<a href="#">Link to this property</a>

lan\_1: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.acls%20%3E%20(model)%20acl_configuration%20%3E%20(schema)">ACLConfiguration</a> { lan\_id, lan\_name, port\_ranges, 2 more }

<a href="#">Link to this property</a>

lan\_2: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.acls%20%3E%20(model)%20acl_configuration%20%3E%20(schema)">ACLConfiguration</a> { lan\_id, lan\_name, port\_ranges, 2 more }

<a href="#">Link to this property</a>

name: optional string

The name of the ACL.

<a href="#">Link to this property</a>

<details>

<summary>

protocols: optional array of <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.acls%20%3E%20(model)%20allowed_protocol%20%3E%20(schema)">AllowedProtocol</a>

</summary>

One of the following:

"tcp"

<a href="#">Link to this property</a>

"udp"

<a href="#">Link to this property</a>

"icmp"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

unidirectional: optional boolean

The desired traffic direction for this ACL policy. If set to “false”, the policy will allow bidirectional traffic. If set to “true”, the policy will only allow traffic in one direction. If not included in request, will default to false.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.acls%20%3E%20(model)%20acl%20%3E%20(schema)>)

<details>

<summary>

ACLConfiguration object {lan\_id, lan\_name, port\_ranges, 2 more }

</summary>

lan\_id: string

The identifier for the LAN you want to create an ACL policy with.

<a href="#">Link to this property</a>

lan\_name: optional string

The name of the LAN based on the provided lan\_id.

<a href="#">Link to this property</a>

port\_ranges: optional array of string

Array of port ranges on the provided LAN that will be included in the ACL. If no ports or port rangess are provided, communication on any port on this LAN is allowed.

<a href="#">Link to this property</a>

ports: optional array of number

Array of ports on the provided LAN that will be included in the ACL. If no ports or port ranges are provided, communication on any port on this LAN is allowed.

<a href="#">Link to this property</a>

subnets: optional array of <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.acls%20%3E%20(model)%20subnet%20%3E%20(schema)">Subnet</a>

Array of subnet IPs within the LAN that will be included in the ACL. If no subnets are provided, communication on any subnets on this LAN are allowed.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.acls%20%3E%20(model)%20acl_configuration%20%3E%20(schema)>)

<details>

<summary>

AllowedProtocol = "tcp"or "udp"or "icmp"

Array of allowed communication protocols between configured LANs. If no protocols are provided, all protocols are allowed.

</summary>

One of the following:

"tcp"

<a href="#">Link to this property</a>

"udp"

<a href="#">Link to this property</a>

"icmp"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.acls%20%3E%20(model)%20allowed_protocol%20%3E%20(schema)>)

Subnet = string

A valid IPv4 address.

[Link to this property](#)%20magic_transit.sites.acls%20%3E%20(model)%20subnet%20%3E%20(schema)>)

#### SitesLANs

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

#### SitesWANs

##### [List Site WANs](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/wans/methods/list)

GET/accounts/{account\_id}/magic/sites/{site\_id}/wans

##### [Site WAN Details](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/wans/methods/get)

GET/accounts/{account\_id}/magic/sites/{site\_id}/wans/{wan\_id}

##### [Create a new Site WAN](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/wans/methods/create)

POST/accounts/{account\_id}/magic/sites/{site\_id}/wans

##### [Update Site WAN](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/wans/methods/update)

PUT/accounts/{account\_id}/magic/sites/{site\_id}/wans/{wan\_id}

##### [Patch Site WAN](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/wans/methods/edit)

PATCH/accounts/{account\_id}/magic/sites/{site\_id}/wans/{wan\_id}

##### [Delete Site WAN](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/wans/methods/delete)

DELETE/accounts/{account\_id}/magic/sites/{site\_id}/wans/{wan\_id}

##### ModelsExpand Collapse

<details>

<summary>

WAN object {id, health\_check\_rate, name, 5 more }

</summary>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

health\_check\_rate: optional "low"or "mid"or "high"

Magic WAN health check rate for tunnels created on this link. The default value is <code>mid</code>.

</summary>

One of the following:

"low"

<a href="#">Link to this property</a>

"mid"

<a href="#">Link to this property</a>

"high"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

physport: optional number

<a href="#">Link to this property</a>

priority: optional number

Priority of WAN for traffic loadbalancing.

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

static\_addressing: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.wans%20%3E%20(model)%20wan_static_addressing%20%3E%20(schema)">WANStaticAddressing</a> { address, gateway\_address, secondary\_address }

(optional) if omitted, use DHCP. Submit secondary\_address when site is in high availability mode.

<a href="#">Link to this property</a>

vlan\_tag: optional number

VLAN ID. Use zero for untagged.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.wans%20%3E%20(model)%20wan%20%3E%20(schema)>)

<details>

<summary>

WANStaticAddressing object {address, gateway\_address, secondary\_address }

(optional) if omitted, use DHCP. Submit secondary\_address when site is in high availability mode.

</summary>

address: string

A valid CIDR notation representing an IP range.

<a href="#">Link to this property</a>

gateway\_address: string

A valid IPv4 address.

<a href="#">Link to this property</a>

secondary\_address: optional string

A valid CIDR notation representing an IP range.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.wans%20%3E%20(model)%20wan_static_addressing%20%3E%20(schema)>)