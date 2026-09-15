---
title: Patch Site LAN
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Magic Transit](https://developers.cloudflare.com/api/resources/magic_transit)

[Sites](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites)

[LANs](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/lans)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Patch Site LAN

PATCH/accounts/{account\_id}/magic/sites/{site\_id}/lans/{lan\_id}

Patch a specific Site LAN.

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

`Magic WAN Write``Magic Transit Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier

maxLength32

[Link to this property](#)%20magic_transit.sites.lans%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

site\_id: string

Identifier

maxLength32

[Link to this property](#)%20magic_transit.sites.lans%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20site_id%20%3E%20(schema)>)

lan\_id: string

Identifier

maxLength32

[Link to this property](#)%20magic_transit.sites.lans%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20lan_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

bond\_id: optional number

[Link to this property](#)%20magic_transit.sites.lans%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20bond_id%20%3E%20(schema)>)

is\_breakout: optional boolean

mark true to use this LAN for source-based breakout traffic

[Link to this property](#)%20magic_transit.sites.lans%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20is_breakout%20%3E%20(schema)>)

is\_prioritized: optional boolean

mark true to use this LAN for source-based prioritized traffic

[Link to this property](#)%20magic_transit.sites.lans%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20is_prioritized%20%3E%20(schema)>)

name: optional string

[Link to this property](#)%20magic_transit.sites.lans%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

<details>

<summary>

nat: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.lans%20%3E%20(model)%20nat%20%3E%20(schema)">Nat</a> { static\_prefix }

</summary>

static\_prefix: optional string

A valid CIDR notation representing an IP range.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.lans%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20nat%20%3E%20(schema)>)

physport: optional number

[Link to this property](#)%20magic_transit.sites.lans%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20physport%20%3E%20(schema)>)

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

<details>

<summary>

nat: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.lans%20%3E%20(model)%20nat%20%3E%20(schema)">Nat</a> { static\_prefix }

</summary>

static\_prefix: optional string

A valid CIDR notation representing an IP range.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.lans%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20routed_subnets%20%3E%20(schema)>)

<details>

<summary>

static\_addressing: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.lans%20%3E%20(model)%20lan_static_addressing%20%3E%20(schema)">LANStaticAddressing</a> { address, dhcp\_relay, dhcp\_server, 2 more }

If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static\_address is required along with secondary and virtual address.

</summary>

address: string

A valid CIDR notation representing an IP range.

<a href="#">Link to this property</a>

<details>

<summary>

dhcp\_relay: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.lans%20%3E%20(model)%20dhcp_relay%20%3E%20(schema)">DHCPRelay</a> { server\_addresses }

</summary>

server\_addresses: optional array of string

List of DHCP server IPs.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

dhcp\_server: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.lans%20%3E%20(model)%20dhcp_server%20%3E%20(schema)">DHCPServer</a> { dhcp\_options, dhcp\_pool\_end, dhcp\_pool\_start, 3 more }

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

<a href="#">Link to this property</a>

secondary\_address: optional string

A valid CIDR notation representing an IP range.

<a href="#">Link to this property</a>

virtual\_address: optional string

A valid CIDR notation representing an IP range.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.lans%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20static_addressing%20%3E%20(schema)>)

vlan\_tag: optional number

VLAN ID. Use zero for untagged.

[Link to this property](#)%20magic_transit.sites.lans%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20vlan_tag%20%3E%20(schema)>)

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

[Link to this property](#)%20magic_transit.sites.lans%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20magic_transit.sites.lans%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.lans%20%3E%20(model)%20lan%20%3E%20(schema)">LAN</a> { id, bond\_id, ha\_link, 9 more }

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

<details>

<summary>

nat: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.lans%20%3E%20(model)%20nat%20%3E%20(schema)">Nat</a> { static\_prefix }

</summary>

static\_prefix: optional string

A valid CIDR notation representing an IP range.

<a href="#">Link to this property</a>

</details>

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

<details>

<summary>

nat: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.lans%20%3E%20(model)%20nat%20%3E%20(schema)">Nat</a> { static\_prefix }

</summary>

static\_prefix: optional string

A valid CIDR notation representing an IP range.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

static\_addressing: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.lans%20%3E%20(model)%20lan_static_addressing%20%3E%20(schema)">LANStaticAddressing</a> { address, dhcp\_relay, dhcp\_server, 2 more }

If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static\_address is required along with secondary and virtual address.

</summary>

address: string

A valid CIDR notation representing an IP range.

<a href="#">Link to this property</a>

<details>

<summary>

dhcp\_relay: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.lans%20%3E%20(model)%20dhcp_relay%20%3E%20(schema)">DHCPRelay</a> { server\_addresses }

</summary>

server\_addresses: optional array of string

List of DHCP server IPs.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

dhcp\_server: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.lans%20%3E%20(model)%20dhcp_server%20%3E%20(schema)">DHCPServer</a> { dhcp\_options, dhcp\_pool\_end, dhcp\_pool\_start, 3 more }

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

<a href="#">Link to this property</a>

secondary\_address: optional string

A valid CIDR notation representing an IP range.

<a href="#">Link to this property</a>

virtual\_address: optional string

A valid CIDR notation representing an IP range.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

vlan\_tag: optional number

VLAN ID. Use zero for untagged.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.lans%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20magic_transit.sites.lans%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Patch Site LAN

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/lans/$LAN_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "bond_id": 2,
          "physport": 1,
          "vlan_tag": 42
        }'
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
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "bond_id": 2,
    "ha_link": true,
    "is_breakout": true,
    "is_prioritized": true,
    "name": "name",
    "nat": {
      "static_prefix": "192.0.2.0/24"
    },
    "physport": 1,
    "routed_subnets": [
      {
        "next_hop": "192.0.2.1",
        "prefix": "192.0.2.0/24",
        "nat": {
          "static_prefix": "192.0.2.0/24"
        }
      }
    ],
    "site_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "static_addressing": {
      "address": "192.0.2.0/24",
      "dhcp_relay": {
        "server_addresses": [
          "192.0.2.1"
        ]
      },
      "dhcp_server": {
        "dhcp_options": [
          {
            "code": 66,
            "type": "ip",
            "value": "10.20.30.40"
          }
        ],
        "dhcp_pool_end": "192.0.2.1",
        "dhcp_pool_start": "192.0.2.1",
        "dns_server": "192.0.2.1",
        "dns_servers": [
          "192.0.2.1"
        ],
        "reservations": {
          "00:11:22:33:44:55": "192.0.2.100",
          "AA:BB:CC:DD:EE:FF": "192.168.1.101"
        }
      },
      "secondary_address": "192.0.2.0/24",
      "virtual_address": "192.0.2.0/24"
    },
    "vlan_tag": 42
  },
  "success": true
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
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "bond_id": 2,
    "ha_link": true,
    "is_breakout": true,
    "is_prioritized": true,
    "name": "name",
    "nat": {
      "static_prefix": "192.0.2.0/24"
    },
    "physport": 1,
    "routed_subnets": [
      {
        "next_hop": "192.0.2.1",
        "prefix": "192.0.2.0/24",
        "nat": {
          "static_prefix": "192.0.2.0/24"
        }
      }
    ],
    "site_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "static_addressing": {
      "address": "192.0.2.0/24",
      "dhcp_relay": {
        "server_addresses": [
          "192.0.2.1"
        ]
      },
      "dhcp_server": {
        "dhcp_options": [
          {
            "code": 66,
            "type": "ip",
            "value": "10.20.30.40"
          }
        ],
        "dhcp_pool_end": "192.0.2.1",
        "dhcp_pool_start": "192.0.2.1",
        "dns_server": "192.0.2.1",
        "dns_servers": [
          "192.0.2.1"
        ],
        "reservations": {
          "00:11:22:33:44:55": "192.0.2.100",
          "AA:BB:CC:DD:EE:FF": "192.168.1.101"
        }
      },
      "secondary_address": "192.0.2.0/24",
      "virtual_address": "192.0.2.0/24"
    },
    "vlan_tag": 42
  },
  "success": true
}
```