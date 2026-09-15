---
title: List Zero Trust Gateway locations
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Gateway](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway)

[Locations](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/locations)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Zero Trust Gateway locations

GET/accounts/{account\_id}/gateway/locations

List Zero Trust Gateway locations for an account.

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

`Cloudflare Zero Trust Secure DNS Locations Write``Zero Trust Read``Zero Trust Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.gateway.locations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

<details>

<summary>

direction: optional "asc"or "desc"

Sort direction. Only takes effect when <code>order_by</code> is also provided; it is ignored otherwise. When <code>direction</code> is omitted the effective direction is field-specific: <code>created_at</code> and <code>updated_at</code> default to descending (newest first); <code>name</code> defaults to ascending.

- <code>asc</code> — ascending.
- <code>desc</code> — descending.

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.locations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

filter: optional array of unknown

Filter the returned locations by one or more `field:value` pairs. Repeat the parameter to apply multiple filters; they are combined with logical AND (a location must satisfy every filter to be returned).

Supported fields and their matching behaviour:

- `name` — case-insensitive substring match on the location name.
- `id` — substring match on the location ID (UUID), with or without dashes.
- `is_default` — whether it is the default for the account.

Each entry must match one of the per-field patterns below:

- the field must be one of `name`, `id`, or `is_default`;
- `name`/ `id` accept any value;
- `is_default` only accepts `true` or `false`; any other value returns `400`

[Link to this property](#)%20zero_trust.gateway.locations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20filter%20%3E%20(schema)>)

<details>

<summary>

order\_by: optional "name"or "created\_at"or "updated\_at"

Field to sort the returned locations by. When omitted, the order of results is unspecified. Supported values:

- <code>name</code> — sort alphabetically by location name.
- <code>created_at</code> — sort by creation time; defaults to descending unless <code>direction</code> is set.
- <code>updated_at</code> — sort by last-modified time; defaults to descending unless <code>direction</code> is set.

</summary>

One of the following:

"name"

<a href="#">Link to this property</a>

"created\_at"

<a href="#">Link to this property</a>

"updated\_at"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.locations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order_by%20%3E%20(schema)>)

search: optional string

Case-insensitive substring match on the location name. When combined with `filter`, both must match (logical AND).

[Link to this property](#)%20zero_trust.gateway.locations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20search%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.gateway.locations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.gateway.locations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Indicate whether the API call was successful.

[Link to this property](#)%20zero_trust.gateway.locations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.locations%20%3E%20(model)%20location%20%3E%20(schema)">Location</a> { id, client\_default, created\_at, 12 more }

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

<details>

<summary>

endpoints: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.locations%20%3E%20(model)%20endpoint%20%3E%20(schema)">Endpoint</a> { doh, dot, ipv4, ipv6 }

Configure the destination endpoints for this location.

</summary>

<details>

<summary>

doh: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.locations%20%3E%20(model)%20doh_endpoint%20%3E%20(schema)">DOHEndpoint</a> { enabled, networks, require\_token }

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

<a href="#">Link to this property</a>

<details>

<summary>

dot: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.locations%20%3E%20(model)%20dot_endpoint%20%3E%20(schema)">DOTEndpoint</a> { enabled, networks }

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

<a href="#">Link to this property</a>

<details>

<summary>

ipv4: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.locations%20%3E%20(model)%20ipv4_endpoint%20%3E%20(schema)">IPV4Endpoint</a> { enabled }

</summary>

enabled: optional boolean

Indicate whether the IPv4 endpoint is enabled for this location.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ipv6: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.locations%20%3E%20(model)%20ipv6_endpoint%20%3E%20(schema)">IPV6Endpoint</a> { enabled, networks }

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

<a href="#">Link to this property</a>

</details>

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

[Link to this property](#)%20zero_trust.gateway.locations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, total\_count }

</summary>

count: optional number

Indicate the total number of results for the requested service.

<a href="#">Link to this property</a>

page: optional number

Indicate the current page within a paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Indicate the number of results per page.

<a href="#">Link to this property</a>

total\_count: optional number

Indicate the total results available without any search parameters.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.locations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List Zero Trust Gateway locations

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/locations \
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
  "success": true,
  "result": [
    {
      "id": "ed35569b41ce4d1facfe683550f54086",
      "client_default": false,
      "created_at": "2014-01-01T05:20:00.12345Z",
      "dns_destination_ips_id": "0e4a32c6-6fb8-4858-9296-98f51631e8e6",
      "dns_destination_ipv6_block_id": "b08f7231-d458-495c-98ef-190604c9ee83",
      "doh_subdomain": "oli3n9zkz5",
      "ecs_support": false,
      "endpoints": {
        "doh": {
          "enabled": true,
          "networks": [
            {
              "network": "2001:85a3::/64"
            }
          ],
          "require_token": true
        },
        "dot": {
          "enabled": true,
          "networks": [
            {
              "network": "2001:85a3::/64"
            }
          ]
        },
        "ipv4": {
          "enabled": true
        },
        "ipv6": {
          "enabled": true,
          "networks": [
            {
              "network": "2001:85a3::/64"
            }
          ]
        }
      },
      "ip": "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
      "ipv4_destination": "172.64.36.1",
      "ipv4_destination_backup": "172.64.36.2",
      "max_ttl": {
        "mode": "override",
        "ttl_secs": 3600
      },
      "name": "Austin Office Location",
      "networks": [
        {
          "network": "192.0.2.1/32"
        }
      ],
      "updated_at": "2014-01-01T05:20:00.12345Z"
    }
  ],
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
  "success": true,
  "result": [
    {
      "id": "ed35569b41ce4d1facfe683550f54086",
      "client_default": false,
      "created_at": "2014-01-01T05:20:00.12345Z",
      "dns_destination_ips_id": "0e4a32c6-6fb8-4858-9296-98f51631e8e6",
      "dns_destination_ipv6_block_id": "b08f7231-d458-495c-98ef-190604c9ee83",
      "doh_subdomain": "oli3n9zkz5",
      "ecs_support": false,
      "endpoints": {
        "doh": {
          "enabled": true,
          "networks": [
            {
              "network": "2001:85a3::/64"
            }
          ],
          "require_token": true
        },
        "dot": {
          "enabled": true,
          "networks": [
            {
              "network": "2001:85a3::/64"
            }
          ]
        },
        "ipv4": {
          "enabled": true
        },
        "ipv6": {
          "enabled": true,
          "networks": [
            {
              "network": "2001:85a3::/64"
            }
          ]
        }
      },
      "ip": "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
      "ipv4_destination": "172.64.36.1",
      "ipv4_destination_backup": "172.64.36.2",
      "max_ttl": {
        "mode": "override",
        "ttl_secs": 3600
      },
      "name": "Austin Office Location",
      "networks": [
        {
          "network": "192.0.2.1/32"
        }
      ],
      "updated_at": "2014-01-01T05:20:00.12345Z"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```