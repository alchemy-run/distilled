---
title: Show DNS Settings
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[DNS](https://developers.cloudflare.com/api/resources/dns)

[Settings](https://developers.cloudflare.com/api/resources/dns/subresources/settings)

[Account](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/account)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Show DNS Settings

GET/accounts/{account\_id}/dns\_settings

Show DNS settings for an account

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

`Account DNS Settings Write``Account DNS Settings Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20dns.settings.account%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

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

[Link to this property](#)%20dns.settings.account%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20dns.settings.account%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20dns.settings.account%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {zone\_defaults, enforce\_dns\_only }

</summary>

<details>

<summary>

zone\_defaults: object {flatten\_all\_cnames, foundation\_dns, internal\_dns, 6 more }

</summary>

flatten\_all\_cnames: boolean

Whether to flatten all CNAME records in the zone. Note that, due to DNS limitations, a CNAME record at the zone apex will always be flattened.

<a href="#">Link to this property</a>

Deprecatedfoundation\_dns: boolean

foundation\_dns is deprecated. Use nameservers.type: cloudflare.advanced to turn on Advanced Nameservers and cloudflare.standard to turn it off. This field will be removed in a future API version.

Deprecated. Use nameservers.type to configure Advanced Nameservers.

<a href="#">Link to this property</a>

<details>

<summary>

internal\_dns: object {reference\_zone\_id }

Settings for this internal zone.

</summary>

reference\_zone\_id: optional string

The ID of the zone to fallback to.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

multi\_provider: boolean

Whether to enable multi-provider DNS, which causes Cloudflare to activate the zone even when non-Cloudflare NS records exist, and to respect NS records at the zone apex during outbound zone transfers.

<a href="#">Link to this property</a>

<details>

<summary>

nameservers: object {type }

Settings determining the nameservers through which the zone should be available.

</summary>

<details>

<summary>

type: "cloudflare.standard"or "cloudflare.advanced"or "cloudflare.standard.random"or 2 more

Nameserver type

</summary>

One of the following:

"cloudflare.standard"

<a href="#">Link to this property</a>

"cloudflare.advanced"

<a href="#">Link to this property</a>

"cloudflare.standard.random"

<a href="#">Link to this property</a>

"custom.account"

<a href="#">Link to this property</a>

"custom.tenant"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ns\_ttl: number

The time to live (TTL) of the zone’s nameserver (NS) records.

maximum86400

minimum30

<a href="#">Link to this property</a>

secondary\_overrides: boolean

Allows a Secondary DNS zone to use (proxied) override records and CNAME flattening at the zone apex.

<a href="#">Link to this property</a>

<details>

<summary>

soa: object {expire, min\_ttl, mname, 4 more }

Components of the zone’s SOA record.

</summary>

expire: optional number

Time in seconds of being unable to query the primary server after which secondary servers should stop serving the zone.

maximum2419200

minimum86400

<a href="#">Link to this property</a>

min\_ttl: optional number

The time to live (TTL) for negative caching of records within the zone.

maximum86400

minimum60

<a href="#">Link to this property</a>

mname: optional string

The primary nameserver, which may be used for outbound zone transfers. If null, a Cloudflare-assigned value will be used.

<a href="#">Link to this property</a>

refresh: optional number

Time in seconds after which secondary servers should re-check the SOA record to see if the zone has been updated.

maximum86400

minimum600

<a href="#">Link to this property</a>

retry: optional number

Time in seconds after which secondary servers should retry queries after the primary server was unresponsive.

maximum86400

minimum600

<a href="#">Link to this property</a>

rname: optional string

The email address of the zone administrator, with the first label representing the local part of the email address.

<a href="#">Link to this property</a>

ttl: optional number

The time to live (TTL) of the SOA record itself.

maximum86400

minimum300

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

zone\_mode: "standard"or "cdn\_only"or "dns\_only"

Whether the zone mode is a regular or CDN/DNS only zone.

</summary>

One of the following:

"standard"

<a href="#">Link to this property</a>

"cdn\_only"

<a href="#">Link to this property</a>

"dns\_only"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enforce\_dns\_only: optional boolean

When enabled, forces all proxied DNS records in the account to behave as DNS-only at the edge, regardless of each record’s individual proxy setting. Note that this account-level override does not modify the records themselves; it only affects how they are served at the edge. See more on <a href="https://developers.cloudflare.com/dns/proxy-status/enforce-dns-only">Enforce DNS-only</a>.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.settings.account%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Show DNS Settings

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_settings \
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
  "result": {
    "zone_defaults": {
      "flatten_all_cnames": false,
      "foundation_dns": false,
      "internal_dns": {
        "reference_zone_id": "reference_zone_id"
      },
      "multi_provider": false,
      "nameservers": {
        "type": "cloudflare.standard"
      },
      "ns_ttl": 86400,
      "secondary_overrides": false,
      "soa": {
        "expire": 604800,
        "min_ttl": 1800,
        "mname": "kristina.ns.cloudflare.com",
        "refresh": 10000,
        "retry": 2400,
        "rname": "admin.example.com",
        "ttl": 3600
      },
      "zone_mode": "dns_only"
    },
    "enforce_dns_only": false
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
    "zone_defaults": {
      "flatten_all_cnames": false,
      "foundation_dns": false,
      "internal_dns": {
        "reference_zone_id": "reference_zone_id"
      },
      "multi_provider": false,
      "nameservers": {
        "type": "cloudflare.standard"
      },
      "ns_ttl": 86400,
      "secondary_overrides": false,
      "soa": {
        "expire": 604800,
        "min_ttl": 1800,
        "mname": "kristina.ns.cloudflare.com",
        "refresh": 10000,
        "retry": 2400,
        "rname": "admin.example.com",
        "ttl": 3600
      },
      "zone_mode": "dns_only"
    },
    "enforce_dns_only": false
  }
}
```