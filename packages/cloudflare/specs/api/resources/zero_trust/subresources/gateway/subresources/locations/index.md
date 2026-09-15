---
title: Locations
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Gateway](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Locations

##### [List Zero Trust Gateway locations](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/locations/methods/list)

GET/accounts/{account\_id}/gateway/locations

##### [Get Zero Trust Gateway location details](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/locations/methods/get)

GET/accounts/{account\_id}/gateway/locations/{location\_id}

##### [Create a Zero Trust Gateway location](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/locations/methods/create)

POST/accounts/{account\_id}/gateway/locations

##### [Update a Zero Trust Gateway location](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/locations/methods/update)

PUT/accounts/{account\_id}/gateway/locations/{location\_id}

##### [Delete a Zero Trust Gateway location](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/locations/methods/delete)

DELETE/accounts/{account\_id}/gateway/locations/{location\_id}

##### ModelsExpand Collapse

<details>

<summary>

DOHEndpoint object {enabled, networks, require\_token }

</summary>

enabled: optional boolean

Indicate whether the DOH endpoint is enabled for this location.

<a href="#">Link to this property</a>

<details>

<summary>

networks: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.locations%20%3E%20(model)%20ip_network%20%3E%20(schema)">IPNetwork</a> { network }

Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

</summary>

network: string

Specify the IP address or IP CIDR.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

require\_token: optional boolean

Specify whether the DOH endpoint requires user identity authentication.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.locations%20%3E%20(model)%20doh_endpoint%20%3E%20(schema)>)

<details>

<summary>

DOTEndpoint object {enabled, networks }

</summary>

enabled: optional boolean

Indicate whether the DOT endpoint is enabled for this location.

<a href="#">Link to this property</a>

<details>

<summary>

networks: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.locations%20%3E%20(model)%20ip_network%20%3E%20(schema)">IPNetwork</a> { network }

Specify the list of allowed source IP network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

</summary>

network: string

Specify the IP address or IP CIDR.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.locations%20%3E%20(model)%20dot_endpoint%20%3E%20(schema)>)

<details>

<summary>

Endpoint object {doh, dot, ipv4, ipv6 }

Configure the destination endpoints for this location.

</summary>

doh: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.locations%20%3E%20(model)%20doh_endpoint%20%3E%20(schema)">DOHEndpoint</a> { enabled, networks, require\_token }

<a href="#">Link to this property</a>

dot: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.locations%20%3E%20(model)%20dot_endpoint%20%3E%20(schema)">DOTEndpoint</a> { enabled, networks }

<a href="#">Link to this property</a>

ipv4: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.locations%20%3E%20(model)%20ipv4_endpoint%20%3E%20(schema)">IPV4Endpoint</a> { enabled }

<a href="#">Link to this property</a>

ipv6: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.locations%20%3E%20(model)%20ipv6_endpoint%20%3E%20(schema)">IPV6Endpoint</a> { enabled, networks }

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.locations%20%3E%20(model)%20endpoint%20%3E%20(schema)>)

<details>

<summary>

IPNetwork object {network }

</summary>

network: string

Specify the IP address or IP CIDR.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.locations%20%3E%20(model)%20ip_network%20%3E%20(schema)>)

<details>

<summary>

IPV4Endpoint object {enabled }

</summary>

enabled: optional boolean

Indicate whether the IPv4 endpoint is enabled for this location.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.locations%20%3E%20(model)%20ipv4_endpoint%20%3E%20(schema)>)

<details>

<summary>

IPV6Endpoint object {enabled, networks }

</summary>

enabled: optional boolean

Indicate whether the IPV6 endpoint is enabled for this location.

<a href="#">Link to this property</a>

<details>

<summary>

networks: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.locations%20%3E%20(model)%20ipv6_network%20%3E%20(schema)">IPV6Network</a> { network }

Specify the list of allowed source IPv6 network ranges for this endpoint. When the list is empty, the endpoint allows all source IPs. The list takes effect only if the endpoint is enabled for this location.

</summary>

network: string

Specify the IPv6 address or IPv6 CIDR.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.locations%20%3E%20(model)%20ipv6_endpoint%20%3E%20(schema)>)

<details>

<summary>

IPV6Network object {network }

</summary>

network: string

Specify the IPv6 address or IPv6 CIDR.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.locations%20%3E%20(model)%20ipv6_network%20%3E%20(schema)>)

<details>

<summary>

Location object {id, client\_default, created\_at, 12 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

client\_default: optional boolean

Indicate whether this location is the default location.

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

dns\_destination\_ips\_id: optional string

Indicate the identifier of the pair of IPv4 addresses assigned to this location.

<a href="#">Link to this property</a>

dns\_destination\_ipv6\_block\_id: optional string

Specify the UUID of the IPv6 block brought to the gateway so that this location’s IPv6 address is allocated from the Bring Your Own IPv6 (BYOIPv6) block rather than the standard Cloudflare IPv6 block.

<a href="#">Link to this property</a>

doh\_subdomain: optional string

Specify the DNS over HTTPS domain that receives DNS requests. Gateway automatically generates this value.

<a href="#">Link to this property</a>

ecs\_support: optional boolean

Indicate whether the location must resolve EDNS queries.

<a href="#">Link to this property</a>

endpoints: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.locations%20%3E%20(model)%20endpoint%20%3E%20(schema)">Endpoint</a> { doh, dot, ipv4, ipv6 }

Configure the destination endpoints for this location.

<a href="#">Link to this property</a>

ip: optional string

Defines the automatically generated IPv6 destination IP assigned to this location. Gateway counts all DNS requests sent to this IP as requests under this location.

<a href="#">Link to this property</a>

ipv4\_destination: optional string

Show the primary destination IPv4 address from the pair identified dns\_destination\_ips\_id. This field read-only.

<a href="#">Link to this property</a>

ipv4\_destination\_backup: optional string

Show the backup destination IPv4 address from the pair identified dns\_destination\_ips\_id. This field read-only.

<a href="#">Link to this property</a>

<details>

<summary>

max\_ttl: optional object {mode, ttl\_secs }

Controls how DNS response TTLs are capped for this location relative to the account <code>max_ttl_secs</code> setting. Omitting <code>max_ttl</code> on update resets it to <code>inherit</code>.

</summary>

<details>

<summary>

mode: "inherit"or "override"or "disabled"

<code>inherit</code> uses the account <code>max_ttl_secs</code>. <code>override</code> uses this location’s <code>ttl_secs</code>. <code>disabled</code> leaves returned TTLs unchanged.

</summary>

One of the following:

"inherit"

<a href="#">Link to this property</a>

"override"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ttl\_secs: optional number

Location-specific cap on DNS response TTLs, in seconds. Required when <code>mode</code> is <code>override</code>. Must be omitted when <code>mode</code> is <code>inherit</code> or <code>disabled</code>.

maximum36000

minimum60

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Specify the location name.

<a href="#">Link to this property</a>

<details>

<summary>

networks: optional array of object {network }

Specify the list of network ranges from which requests at this location originate. The list takes effect only if it is non-empty and the IPv4 endpoint is enabled for this location.

</summary>

network: string

Specify the IPv4 address or IPv4 CIDR. Limit IPv4 CIDRs to a maximum of /24.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.locations%20%3E%20(model)%20location%20%3E%20(schema)>)

LocationDeleteResponse = unknown

[Link to this property](#)%20zero_trust.gateway.locations%20%3E%20(model)%20location_delete_response%20%3E%20(schema)>)