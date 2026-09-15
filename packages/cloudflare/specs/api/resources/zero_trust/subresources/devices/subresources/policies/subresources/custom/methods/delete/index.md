---
title: Delete a device settings profile
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Devices](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices)

[Policies](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/policies)

[Custom](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/policies/subresources/custom)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Delete a device settings profile

DELETE/accounts/{account\_id}/devices/policy/{policy\_id}

Deletes a device settings profile and fetches a list of the remaining profiles for an account.

##### Security

<details>

<summary>API Token</summary>



The preferred authorization scheme for interacting with the Cloudflare API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/create-token/">Create a token</a>.

**Example:**<code>Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY</code>

</details>

<details>

<summary>API Email + API Key</summary>



The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**<code>X-Auth-Email: user@example.com</code>

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**<code>X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194</code>

</details>

##### Accepted Permissions (at least one required)

`Zero Trust Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.devices.policies.custom%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

policy\_id: string

maxLength36

[Link to this property](#)%20zero_trust.devices.policies.custom%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20policy_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.policies.custom%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.policies.custom%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.devices.policies%20%3E%20(model)%20settings_policy%20%3E%20(schema)">SettingsPolicy</a> { allow\_mode\_switch, allow\_updates, allowed\_to\_leave, 28 more }

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

Whether the policy is the default policy for an account.

<a href="#">Link to this property</a>

description: optional string

A description of the policy.

maxLength500

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

lan\_allow\_minutes: optional number

The amount of time in minutes a user is allowed access to their LAN. A value of 0 will allow LAN access until the next WARP reconnection, such as a reboot or a laptop waking from sleep. Note that this field is omitted from the response if null or unset.

<a href="#">Link to this property</a>

lan\_allow\_subnet\_size: optional number

The size of the subnet for the local access network. Note that this field is omitted from the response if null or unset.

<a href="#">Link to this property</a>

match: optional string

The wirefilter expression to match devices. Available values: “identity.email”, “identity.groups.id”, “identity.groups.name”, “identity.groups.email”, “identity.service\_token\_uuid”, “identity.saml\_attributes”, “network”, “os.name”, “os.version”.

maxLength500

<a href="#">Link to this property</a>

name: optional string

The name of the device settings profile.

maxLength100

<a href="#">Link to this property</a>

policy\_id: optional string

maxLength36

<a href="#">Link to this property</a>

precedence: optional number

The precedence of the policy. Lower values indicate higher precedence. Policies will be evaluated in ascending order of this field.

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

<details>

<summary>

target\_tests: optional array of object {id, name }

</summary>

id: optional string

The id of the DEX test targeting this policy.

<a href="#">Link to this property</a>

name: optional string

The name of the DEX test targeting this policy.

<a href="#">Link to this property</a>

</details>

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

[Link to this property](#)%20zero_trust.devices.policies.custom%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20zero_trust.devices.policies.custom%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, total\_count }

</summary>

count: optional number

Total number of results for the requested service.

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page of results.

<a href="#">Link to this property</a>

total\_count: optional number

Total results available without any search parameters.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.policies.custom%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Delete a device settings profile

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy/$POLICY_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": [
    {
      "allow_mode_switch": true,
      "allow_updates": true,
      "allowed_to_leave": true,
      "auto_connect": 0,
      "captive_portal": 180,
      "default": false,
      "description": "Policy for test teams.",
      "disable_auto_fallback": true,
      "dns_search_suffixes": [
        {
          "suffix": "internal.corp",
          "description": "Example internal domains"
        }
      ],
      "enabled": true,
      "exclude": [
        {
          "address": "192.0.2.0/24",
          "description": "Exclude testing domains from the tunnel"
        }
      ],
      "exclude_office_ips": true,
      "fallback_domains": [
        {
          "suffix": "example.com",
          "description": "Domain bypass for local development",
          "dns_server": [
            "1.1.1.1"
          ]
        }
      ],
      "gateway_unique_id": "699d98642c564d2e855e9661899b7252",
      "global_acceleration": {
        "api_endpoints": [
          "198.51.100.1:443"
        ],
        "enabled": true,
        "masque_endpoints": [
          "198.51.100.1:443"
        ],
        "wireguard_endpoints": [
          "198.51.100.1:2408"
        ]
      },
      "include": [
        {
          "address": "192.0.2.0/24",
          "description": "Include testing domains in the tunnel"
        }
      ],
      "lan_allow_minutes": 30,
      "lan_allow_subnet_size": 24,
      "match": "identity.email == \"test@cloudflare.com\"",
      "name": "Allow Developers",
      "policy_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "precedence": 100,
      "register_interface_ip_with_dns": true,
      "sccm_vpn_boundary_support": false,
      "service_mode_v2": {
        "mode": "proxy",
        "port": 3000
      },
      "support_url": "https://1.1.1.1/help",
      "switch_locked": true,
      "target_tests": [
        {
          "id": "id",
          "name": "name"
        }
      ],
      "tunnel_protocol": "wireguard",
      "uninstall_protection": false,
      "virtual_networks": {
        "allowed": [
          "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
        ],
        "default": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
      }
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": [
    {
      "allow_mode_switch": true,
      "allow_updates": true,
      "allowed_to_leave": true,
      "auto_connect": 0,
      "captive_portal": 180,
      "default": false,
      "description": "Policy for test teams.",
      "disable_auto_fallback": true,
      "dns_search_suffixes": [
        {
          "suffix": "internal.corp",
          "description": "Example internal domains"
        }
      ],
      "enabled": true,
      "exclude": [
        {
          "address": "192.0.2.0/24",
          "description": "Exclude testing domains from the tunnel"
        }
      ],
      "exclude_office_ips": true,
      "fallback_domains": [
        {
          "suffix": "example.com",
          "description": "Domain bypass for local development",
          "dns_server": [
            "1.1.1.1"
          ]
        }
      ],
      "gateway_unique_id": "699d98642c564d2e855e9661899b7252",
      "global_acceleration": {
        "api_endpoints": [
          "198.51.100.1:443"
        ],
        "enabled": true,
        "masque_endpoints": [
          "198.51.100.1:443"
        ],
        "wireguard_endpoints": [
          "198.51.100.1:2408"
        ]
      },
      "include": [
        {
          "address": "192.0.2.0/24",
          "description": "Include testing domains in the tunnel"
        }
      ],
      "lan_allow_minutes": 30,
      "lan_allow_subnet_size": 24,
      "match": "identity.email == \"test@cloudflare.com\"",
      "name": "Allow Developers",
      "policy_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "precedence": 100,
      "register_interface_ip_with_dns": true,
      "sccm_vpn_boundary_support": false,
      "service_mode_v2": {
        "mode": "proxy",
        "port": 3000
      },
      "support_url": "https://1.1.1.1/help",
      "switch_locked": true,
      "target_tests": [
        {
          "id": "id",
          "name": "name"
        }
      ],
      "tunnel_protocol": "wireguard",
      "uninstall_protection": false,
      "virtual_networks": {
        "allowed": [
          "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
        ],
        "default": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
      }
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```