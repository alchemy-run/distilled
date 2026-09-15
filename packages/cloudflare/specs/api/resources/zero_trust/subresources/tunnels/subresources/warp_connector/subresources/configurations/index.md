---
title: Configurations
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

# Configurations

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