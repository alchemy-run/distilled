---
title: ACLs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Magic Transit](https://developers.cloudflare.com/api/resources/magic_transit)

[Sites](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# ACLs

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