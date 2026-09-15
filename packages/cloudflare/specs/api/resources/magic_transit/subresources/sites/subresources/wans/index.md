---
title: WANs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Magic Transit](https://developers.cloudflare.com/api/resources/magic_transit)

[Sites](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# WANs

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