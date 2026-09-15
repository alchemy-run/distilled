---
title: Default
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Devices](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices)

[Policies](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/policies)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Default

##### [Get the default device settings profile](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/policies/subresources/default/methods/get)

GET/accounts/{account\_id}/devices/policy

##### [Update the default device settings profile](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/policies/subresources/default/methods/edit)

PATCH/accounts/{account\_id}/devices/policy

##### ModelsExpand Collapse

<details>

<summary>

DefaultGetResponse object {allow\_mode\_switch, allow\_updates, allowed\_to\_leave, 21 more }

</summary>

allow\_mode\_switch: optional boolean

Whether to allow the user to switch WARP between modes.

<a href="#">Link to this property</a>

allow\_updates: optional boolean

Whether to receive update notifications when a new version of the client is available.

<a href="#">Link to this property</a>

allowed\_to\_leave: optional boolean

Whether to allow devices to leave the organization.

<a href="#">Link to this property</a>

auto\_connect: optional number

The amount of time in seconds to reconnect after having been disabled.

<a href="#">Link to this property</a>

captive\_portal: optional number

Turn on the captive portal after the specified amount of time.

<a href="#">Link to this property</a>

default: optional boolean

Whether the policy will be applied to matching devices.

<a href="#">Link to this property</a>

disable\_auto\_fallback: optional boolean

If the <code>dns_server</code> field of a fallback domain is not present, the client will fall back to a best guess of the default/system DNS resolvers unless this policy option is set to <code>true</code>.

<a href="#">Link to this property</a>

<details>

<summary>

dns\_search\_suffixes: optional array of object {suffix, description }

List of DNS search suffixes to apply to clients. Suffixes are evaluated in order. Use an empty array to clear.

</summary>

suffix: string

The DNS search suffix to append when resolving short hostnames.

<a href="#">Link to this property</a>

description: optional string

A description of the DNS search suffix.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: optional boolean

Whether the policy will be applied to matching devices.

<a href="#">Link to this property</a>

<details>

<summary>

exclude: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.devices.policies%20%3E%20(model)%20split_tunnel_exclude%20%3E%20(schema)">SplitTunnelExclude</a>

List of routes excluded in the WARP client’s tunnel.

</summary>

One of the following:

<details>

<summary>

TeamsDevicesExcludeSplitTunnelWithAddress object {address, description }

</summary>

address: string

The address in CIDR format to exclude from the tunnel. If <code>address</code> is present, <code>host</code> must not be present.

<a href="#">Link to this property</a>

description: optional string

A description of the Split Tunnel item, displayed in the client UI.

maxLength100

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TeamsDevicesExcludeSplitTunnelWithHost object {host, description }

</summary>

host: string

The domain name to exclude from the tunnel. If <code>host</code> is present, <code>address</code> must not be present.

<a href="#">Link to this property</a>

description: optional string

A description of the Split Tunnel item, displayed in the client UI.

maxLength100

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

exclude\_office\_ips: optional boolean

Whether to add Microsoft IPs to Split Tunnel exclusions.

<a href="#">Link to this property</a>

<details>

<summary>

fallback\_domains: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.devices.policies%20%3E%20(model)%20fallback_domain%20%3E%20(schema)">FallbackDomain</a> { suffix, description, dns\_server }

</summary>

suffix: string

The domain suffix to match when resolving locally.

<a href="#">Link to this property</a>

description: optional string

A description of the fallback domain, displayed in the client UI.

maxLength100

<a href="#">Link to this property</a>

dns\_server: optional array of string

A list of IP addresses to handle domain resolution.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

gateway\_unique\_id: optional string

<a href="#">Link to this property</a>

<details>

<summary>

global\_acceleration: optional object {api\_endpoints, enabled, masque\_endpoints, wireguard\_endpoints }

Global Acceleration settings for China. When configured, WARP clients connect to the Global Accelerator addresses instead of the default ones. Please contact your account representative to enable this feature on your account. See <a href="https://developers.cloudflare.com/china-network/concepts/global-acceleration/">https://developers.cloudflare.com/china-network/concepts/global-acceleration/</a>.

</summary>

api\_endpoints: array of string

IP:port entries for the API endpoints.

<a href="#">Link to this property</a>

enabled: boolean

Global acceleration settings are used only when “enabled”.

<a href="#">Link to this property</a>

masque\_endpoints: array of string

IP:port entries for the MASQUE tunnel endpoints. Either wireguard\_endpoints or masque\_endpoints must be provided.

<a href="#">Link to this property</a>

wireguard\_endpoints: array of string

IP:port entries for the WireGuard tunnel endpoints. Either wireguard\_endpoints or masque\_endpoints must be provided.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

include: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.devices.policies%20%3E%20(model)%20split_tunnel_include%20%3E%20(schema)">SplitTunnelInclude</a>

List of routes included in the WARP client’s tunnel.

</summary>

One of the following:

<details>

<summary>

TeamsDevicesIncludeSplitTunnelWithAddress object {address, description }

</summary>

address: string

The address in CIDR format to include in the tunnel. If <code>address</code> is present, <code>host</code> must not be present.

<a href="#">Link to this property</a>

description: optional string

A description of the Split Tunnel item, displayed in the client UI.

maxLength100

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TeamsDevicesIncludeSplitTunnelWithHost object {host, description }

</summary>

host: string

The domain name to include in the tunnel. If <code>host</code> is present, <code>address</code> must not be present.

<a href="#">Link to this property</a>

description: optional string

A description of the Split Tunnel item, displayed in the client UI.

maxLength100

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

policy\_id: optional string

maxLength36

<a href="#">Link to this property</a>

register\_interface\_ip\_with\_dns: optional boolean

Determines if the operating system will register WARP’s local interface IP with your on-premises DNS server.

<a href="#">Link to this property</a>

sccm\_vpn\_boundary\_support: optional boolean

Determines whether the WARP client indicates to SCCM that it is inside a VPN boundary. (Windows only).

<a href="#">Link to this property</a>

<details>

<summary>

service\_mode\_v2: optional object {mode, port }

</summary>

mode: optional string

The mode to run the WARP client under.

<a href="#">Link to this property</a>

port: optional number

The port number when used with proxy mode.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

support\_url: optional string

The URL to launch when the Send Feedback button is clicked.

<a href="#">Link to this property</a>

switch\_locked: optional boolean

Whether to allow the user to turn off the WARP switch and disconnect the client.

<a href="#">Link to this property</a>

tunnel\_protocol: optional string

Determines which tunnel protocol to use.

<a href="#">Link to this property</a>

uninstall\_protection: optional boolean

Determines whether uninstalling the WARP client requires an override code. (Windows only).

<a href="#">Link to this property</a>

<details>

<summary>

virtual\_networks: optional object {allowed, default }

Virtual network access settings for the device.

</summary>

allowed: array of string

List of virtual network IDs the device is allowed to access. When virtual\_networks is set, at least one entry is required.

<a href="#">Link to this property</a>

default: string

The default virtual network ID. Must be included in the <code>allowed</code> list.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.policies.default%20%3E%20(model)%20default_get_response%20%3E%20(schema)>)

<details>

<summary>

DefaultEditResponse object {allow\_mode\_switch, allow\_updates, allowed\_to\_leave, 21 more }

</summary>

allow\_mode\_switch: optional boolean

Whether to allow the user to switch WARP between modes.

<a href="#">Link to this property</a>

allow\_updates: optional boolean

Whether to receive update notifications when a new version of the client is available.

<a href="#">Link to this property</a>

allowed\_to\_leave: optional boolean

Whether to allow devices to leave the organization.

<a href="#">Link to this property</a>

auto\_connect: optional number

The amount of time in seconds to reconnect after having been disabled.

<a href="#">Link to this property</a>

captive\_portal: optional number

Turn on the captive portal after the specified amount of time.

<a href="#">Link to this property</a>

default: optional boolean

Whether the policy will be applied to matching devices.

<a href="#">Link to this property</a>

disable\_auto\_fallback: optional boolean

If the <code>dns_server</code> field of a fallback domain is not present, the client will fall back to a best guess of the default/system DNS resolvers unless this policy option is set to <code>true</code>.

<a href="#">Link to this property</a>

<details>

<summary>

dns\_search\_suffixes: optional array of object {suffix, description }

List of DNS search suffixes to apply to clients. Suffixes are evaluated in order. Use an empty array to clear.

</summary>

suffix: string

The DNS search suffix to append when resolving short hostnames.

<a href="#">Link to this property</a>

description: optional string

A description of the DNS search suffix.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: optional boolean

Whether the policy will be applied to matching devices.

<a href="#">Link to this property</a>

<details>

<summary>

exclude: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.devices.policies%20%3E%20(model)%20split_tunnel_exclude%20%3E%20(schema)">SplitTunnelExclude</a>

List of routes excluded in the WARP client’s tunnel.

</summary>

One of the following:

<details>

<summary>

TeamsDevicesExcludeSplitTunnelWithAddress object {address, description }

</summary>

address: string

The address in CIDR format to exclude from the tunnel. If <code>address</code> is present, <code>host</code> must not be present.

<a href="#">Link to this property</a>

description: optional string

A description of the Split Tunnel item, displayed in the client UI.

maxLength100

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TeamsDevicesExcludeSplitTunnelWithHost object {host, description }

</summary>

host: string

The domain name to exclude from the tunnel. If <code>host</code> is present, <code>address</code> must not be present.

<a href="#">Link to this property</a>

description: optional string

A description of the Split Tunnel item, displayed in the client UI.

maxLength100

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

exclude\_office\_ips: optional boolean

Whether to add Microsoft IPs to Split Tunnel exclusions.

<a href="#">Link to this property</a>

<details>

<summary>

fallback\_domains: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.devices.policies%20%3E%20(model)%20fallback_domain%20%3E%20(schema)">FallbackDomain</a> { suffix, description, dns\_server }

</summary>

suffix: string

The domain suffix to match when resolving locally.

<a href="#">Link to this property</a>

description: optional string

A description of the fallback domain, displayed in the client UI.

maxLength100

<a href="#">Link to this property</a>

dns\_server: optional array of string

A list of IP addresses to handle domain resolution.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

gateway\_unique\_id: optional string

<a href="#">Link to this property</a>

<details>

<summary>

global\_acceleration: optional object {api\_endpoints, enabled, masque\_endpoints, wireguard\_endpoints }

Global Acceleration settings for China. When configured, WARP clients connect to the Global Accelerator addresses instead of the default ones. Please contact your account representative to enable this feature on your account. See <a href="https://developers.cloudflare.com/china-network/concepts/global-acceleration/">https://developers.cloudflare.com/china-network/concepts/global-acceleration/</a>.

</summary>

api\_endpoints: array of string

IP:port entries for the API endpoints.

<a href="#">Link to this property</a>

enabled: boolean

Global acceleration settings are used only when “enabled”.

<a href="#">Link to this property</a>

masque\_endpoints: array of string

IP:port entries for the MASQUE tunnel endpoints. Either wireguard\_endpoints or masque\_endpoints must be provided.

<a href="#">Link to this property</a>

wireguard\_endpoints: array of string

IP:port entries for the WireGuard tunnel endpoints. Either wireguard\_endpoints or masque\_endpoints must be provided.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

include: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.devices.policies%20%3E%20(model)%20split_tunnel_include%20%3E%20(schema)">SplitTunnelInclude</a>

List of routes included in the WARP client’s tunnel.

</summary>

One of the following:

<details>

<summary>

TeamsDevicesIncludeSplitTunnelWithAddress object {address, description }

</summary>

address: string

The address in CIDR format to include in the tunnel. If <code>address</code> is present, <code>host</code> must not be present.

<a href="#">Link to this property</a>

description: optional string

A description of the Split Tunnel item, displayed in the client UI.

maxLength100

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TeamsDevicesIncludeSplitTunnelWithHost object {host, description }

</summary>

host: string

The domain name to include in the tunnel. If <code>host</code> is present, <code>address</code> must not be present.

<a href="#">Link to this property</a>

description: optional string

A description of the Split Tunnel item, displayed in the client UI.

maxLength100

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

policy\_id: optional string

maxLength36

<a href="#">Link to this property</a>

register\_interface\_ip\_with\_dns: optional boolean

Determines if the operating system will register WARP’s local interface IP with your on-premises DNS server.

<a href="#">Link to this property</a>

sccm\_vpn\_boundary\_support: optional boolean

Determines whether the WARP client indicates to SCCM that it is inside a VPN boundary. (Windows only).

<a href="#">Link to this property</a>

<details>

<summary>

service\_mode\_v2: optional object {mode, port }

</summary>

mode: optional string

The mode to run the WARP client under.

<a href="#">Link to this property</a>

port: optional number

The port number when used with proxy mode.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

support\_url: optional string

The URL to launch when the Send Feedback button is clicked.

<a href="#">Link to this property</a>

switch\_locked: optional boolean

Whether to allow the user to turn off the WARP switch and disconnect the client.

<a href="#">Link to this property</a>

tunnel\_protocol: optional string

Determines which tunnel protocol to use.

<a href="#">Link to this property</a>

uninstall\_protection: optional boolean

Determines whether uninstalling the WARP client requires an override code. (Windows only).

<a href="#">Link to this property</a>

<details>

<summary>

virtual\_networks: optional object {allowed, default }

Virtual network access settings for the device.

</summary>

allowed: array of string

List of virtual network IDs the device is allowed to access. When virtual\_networks is set, at least one entry is required.

<a href="#">Link to this property</a>

default: string

The default virtual network ID. Must be included in the <code>allowed</code> list.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.policies.default%20%3E%20(model)%20default_edit_response%20%3E%20(schema)>)

#### DefaultExcludes

##### [Get the Split Tunnel exclude list](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/policies/subresources/default/subresources/excludes/methods/get)

GET/accounts/{account\_id}/devices/policy/exclude

##### [Set the Split Tunnel exclude list](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/policies/subresources/default/subresources/excludes/methods/update)

PUT/accounts/{account\_id}/devices/policy/exclude

#### DefaultIncludes

##### [Get the Split Tunnel include list](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/policies/subresources/default/subresources/includes/methods/get)

GET/accounts/{account\_id}/devices/policy/include

##### [Set the Split Tunnel include list](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/policies/subresources/default/subresources/includes/methods/update)

PUT/accounts/{account\_id}/devices/policy/include

#### DefaultFallback Domains

##### [Get your Local Domain Fallback list](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/policies/subresources/default/subresources/fallback_domains/methods/get)

GET/accounts/{account\_id}/devices/policy/fallback\_domains

##### [Set your Local Domain Fallback list](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/policies/subresources/default/subresources/fallback_domains/methods/update)

PUT/accounts/{account\_id}/devices/policy/fallback\_domains

#### DefaultCertificates

##### [Get device certificate provisioning status](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/policies/subresources/default/subresources/certificates/methods/get)

GET/zones/{zone\_id}/devices/policy/certificates

##### [Update device certificate provisioning status](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/policies/subresources/default/subresources/certificates/methods/edit)

PATCH/zones/{zone\_id}/devices/policy/certificates