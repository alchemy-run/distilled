---
title: Create DNS Firewall Cluster
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[DNS Firewall](https://developers.cloudflare.com/api/resources/dns_firewall)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create DNS Firewall Cluster

POST/accounts/{account\_id}/dns\_firewall

Create a DNS Firewall cluster

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

`DNS Firewall Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20dns_firewall%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

name: string

DNS Firewall cluster name

maxLength160

minLength1

[Link to this property](#)%20dns_firewall%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

upstream\_ips: array of [UpstreamIPs](<https://developers.cloudflare.com/api/resources/dns_firewall#(resource)%20dns_firewall%20%3E%20(model)%20upstream_ips%20%3E%20(schema)>)

minLength1

[Link to this property](#)%20dns_firewall%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20upstream_ips%20%3E%20(schema)>)

<details>

<summary>

attack\_mitigation: optional <a href="https://developers.cloudflare.com/api/resources/dns_firewall#(resource)%20dns_firewall%20%3E%20(model)%20attack_mitigation%20%3E%20(schema)">AttackMitigation</a> { enabled, only\_when\_upstream\_unhealthy }

Attack mitigation settings

</summary>

enabled: optional boolean

When enabled, automatically mitigate random-prefix attacks to protect upstream DNS servers

<a href="#">Link to this property</a>

only\_when\_upstream\_unhealthy: optional boolean

Only mitigate attacks when upstream servers seem unhealthy

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns_firewall%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20attack_mitigation%20%3E%20(schema)>)

deprecate\_any\_requests: optional boolean

Whether to refuse to answer queries for the ANY type

[Link to this property](#)%20dns_firewall%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20deprecate_any_requests%20%3E%20(schema)>)

dns\_firewall\_ip\_count: optional number

Number of IPv4 addresses to assign to the DNS Firewall cluster. Only used during cluster creation and cannot be changed later.

maximum10

minimum1

[Link to this property](#)%20dns_firewall%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20dns_firewall_ip_count%20%3E%20(schema)>)

ecs\_fallback: optional boolean

Whether to forward client IP (resolver) subnet if no EDNS Client Subnet is sent

[Link to this property](#)%20dns_firewall%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20ecs_fallback%20%3E%20(schema)>)

maximum\_cache\_ttl: optional number

By default, Cloudflare attempts to cache responses for as long as indicated by the TTL received from upstream nameservers. This setting sets an upper bound on this duration. For caching purposes, higher TTLs will be decreased to the maximum value defined by this setting.

This setting does not affect the TTL value in the DNS response Cloudflare returns to clients. Cloudflare will always forward the TTL value received from upstream nameservers.

maximum36000

minimum30

[Link to this property](#)%20dns_firewall%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20maximum_cache_ttl%20%3E%20(schema)>)

minimum\_cache\_ttl: optional number

By default, Cloudflare attempts to cache responses for as long as indicated by the TTL received from upstream nameservers. This setting sets a lower bound on this duration. For caching purposes, lower TTLs will be increased to the minimum value defined by this setting.

This setting does not affect the TTL value in the DNS response Cloudflare returns to clients. Cloudflare will always forward the TTL value received from upstream nameservers.

Note that, even with this setting, there is no guarantee that a response will be cached for at least the specified duration. Cached responses may be removed earlier for capacity or other operational reasons.

maximum36000

minimum30

[Link to this property](#)%20dns_firewall%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20minimum_cache_ttl%20%3E%20(schema)>)

negative\_cache\_ttl: optional number

This setting controls how long DNS Firewall should cache negative responses (e.g., NXDOMAIN) from the upstream servers.

This setting does not affect the TTL value in the DNS response Cloudflare returns to clients. Cloudflare will always forward the TTL value received from upstream nameservers.

maximum36000

minimum30

[Link to this property](#)%20dns_firewall%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20negative_cache_ttl%20%3E%20(schema)>)

ratelimit: optional number

Maximum number of DNS queries per second that will be forwarded to your upstream nameservers. The limit is enforced per server, where each server receives a fraction of the configured value. The actual aggregate rate for a data center may vary depending on how many servers are present. Responses served from cache do not count toward this limit. Set to null to disable rate limiting.

maximum1000000000

minimum100

[Link to this property](#)%20dns_firewall%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20ratelimit%20%3E%20(schema)>)

retries: optional number

Number of retries for fetching DNS responses from upstream nameservers (not counting the initial attempt)

maximum2

minimum0

[Link to this property](#)%20dns_firewall%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20retries%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

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

[Link to this property](#)%20dns_firewall%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

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

[Link to this property](#)%20dns_firewall%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20dns_firewall%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, deprecate\_any\_requests, dns\_firewall\_ips, 10 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

deprecate\_any\_requests: boolean

Whether to refuse to answer queries for the ANY type

<a href="#">Link to this property</a>

dns\_firewall\_ips: array of <a href="https://developers.cloudflare.com/api/resources/dns_firewall#(resource)%20dns_firewall%20%3E%20(model)%20firewall_ips%20%3E%20(schema)">FirewallIPs</a>

<a href="#">Link to this property</a>

ecs\_fallback: boolean

Whether to forward client IP (resolver) subnet if no EDNS Client Subnet is sent

<a href="#">Link to this property</a>

maximum\_cache\_ttl: number

By default, Cloudflare attempts to cache responses for as long as indicated by the TTL received from upstream nameservers. This setting sets an upper bound on this duration. For caching purposes, higher TTLs will be decreased to the maximum value defined by this setting.

This setting does not affect the TTL value in the DNS response Cloudflare returns to clients. Cloudflare will always forward the TTL value received from upstream nameservers.

maximum36000

minimum30

<a href="#">Link to this property</a>

minimum\_cache\_ttl: number

By default, Cloudflare attempts to cache responses for as long as indicated by the TTL received from upstream nameservers. This setting sets a lower bound on this duration. For caching purposes, lower TTLs will be increased to the minimum value defined by this setting.

This setting does not affect the TTL value in the DNS response Cloudflare returns to clients. Cloudflare will always forward the TTL value received from upstream nameservers.

Note that, even with this setting, there is no guarantee that a response will be cached for at least the specified duration. Cached responses may be removed earlier for capacity or other operational reasons.

maximum36000

minimum30

<a href="#">Link to this property</a>

modified\_on: string

Last modification of DNS Firewall cluster

formatdate-time

<a href="#">Link to this property</a>

name: string

DNS Firewall cluster name

maxLength160

minLength1

<a href="#">Link to this property</a>

negative\_cache\_ttl: number

This setting controls how long DNS Firewall should cache negative responses (e.g., NXDOMAIN) from the upstream servers.

This setting does not affect the TTL value in the DNS response Cloudflare returns to clients. Cloudflare will always forward the TTL value received from upstream nameservers.

maximum36000

minimum30

<a href="#">Link to this property</a>

ratelimit: number

Maximum number of DNS queries per second that will be forwarded to your upstream nameservers. The limit is enforced per server, where each server receives a fraction of the configured value. The actual aggregate rate for a data center may vary depending on how many servers are present. Responses served from cache do not count toward this limit. Set to null to disable rate limiting.

maximum1000000000

minimum100

<a href="#">Link to this property</a>

retries: number

Number of retries for fetching DNS responses from upstream nameservers (not counting the initial attempt)

maximum2

minimum0

<a href="#">Link to this property</a>

upstream\_ips: array of <a href="https://developers.cloudflare.com/api/resources/dns_firewall#(resource)%20dns_firewall%20%3E%20(model)%20upstream_ips%20%3E%20(schema)">UpstreamIPs</a>

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

attack\_mitigation: optional <a href="https://developers.cloudflare.com/api/resources/dns_firewall#(resource)%20dns_firewall%20%3E%20(model)%20attack_mitigation%20%3E%20(schema)">AttackMitigation</a> { enabled, only\_when\_upstream\_unhealthy }

Attack mitigation settings

</summary>

enabled: optional boolean

When enabled, automatically mitigate random-prefix attacks to protect upstream DNS servers

<a href="#">Link to this property</a>

only\_when\_upstream\_unhealthy: optional boolean

Only mitigate attacks when upstream servers seem unhealthy

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns_firewall%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Create DNS Firewall Cluster

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_firewall \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "My Awesome DNS Firewall cluster",
          "upstream_ips": [
            "192.0.2.1",
            "198.51.100.1",
            "2001:DB8:100::CF"
          ],
          "deprecate_any_requests": true,
          "dns_firewall_ip_count": 2,
          "maximum_cache_ttl": 900,
          "minimum_cache_ttl": 60,
          "negative_cache_ttl": 900,
          "ratelimit": 600,
          "retries": 2
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
  "success": true,
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "deprecate_any_requests": true,
    "dns_firewall_ips": [
      "203.0.113.1",
      "203.0.113.254",
      "2001:DB8:AB::CF",
      "2001:DB8:CD::CF"
    ],
    "ecs_fallback": false,
    "maximum_cache_ttl": 900,
    "minimum_cache_ttl": 60,
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "name": "My Awesome DNS Firewall cluster",
    "negative_cache_ttl": 900,
    "ratelimit": 600,
    "retries": 2,
    "upstream_ips": [
      "192.0.2.1",
      "198.51.100.1",
      "2001:DB8:100::CF"
    ],
    "attack_mitigation": {
      "enabled": true,
      "only_when_upstream_unhealthy": false
    }
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
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "deprecate_any_requests": true,
    "dns_firewall_ips": [
      "203.0.113.1",
      "203.0.113.254",
      "2001:DB8:AB::CF",
      "2001:DB8:CD::CF"
    ],
    "ecs_fallback": false,
    "maximum_cache_ttl": 900,
    "minimum_cache_ttl": 60,
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "name": "My Awesome DNS Firewall cluster",
    "negative_cache_ttl": 900,
    "ratelimit": 600,
    "retries": 2,
    "upstream_ips": [
      "192.0.2.1",
      "198.51.100.1",
      "2001:DB8:100::CF"
    ],
    "attack_mitigation": {
      "enabled": true,
      "only_when_upstream_unhealthy": false
    }
  }
}
```