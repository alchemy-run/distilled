---
title: Create Zone
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zones](https://developers.cloudflare.com/api/resources/zones)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create Zone

POST/zones

Creates a new zone (domain) in your Cloudflare account.

The zone is created in a pending state and must be activated by updating your domain’s nameservers to point to Cloudflare, or by completing the verification process for partial (CNAME) setups.

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

`Zone Zone Edit``Zone DNS Edit`

##### Body ParametersJSONExpand Collapse

<details>

<summary>

account: object {id }

</summary>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zones%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20account%20%3E%20(schema)>)

name: string

The domain name. Per [RFC 1035](https://datatracker.ietf.org/doc/html/rfc1035#section-2.3.4) the overall zone name can be up to 253 characters, with each segment (“label”) not exceeding 63 characters.

maxLength253

[Link to this property](#)%20zones%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

<details>

<summary>

type: optional <a href="https://developers.cloudflare.com/api/resources/zones#(resource)%20zones%20%3E%20(model)%20type%20%3E%20(schema)">Type</a>

A full zone implies that DNS is hosted with Cloudflare. A partial zone is typically a partner-hosted zone or a CNAME setup.

</summary>

One of the following:

"full"

<a href="#">Link to this property</a>

"partial"

<a href="#">Link to this property</a>

"secondary"

<a href="#">Link to this property</a>

"internal"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zones%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20type%20%3E%20(schema)>)

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

[Link to this property](#)%20zones%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zones%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: boolean

Whether the API call was successful.

[Link to this property](#)%20zones%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/zones#(resource)%20zones%20%3E%20(model)%20zone%20%3E%20(schema)">Zone</a> { id, account, activated\_on, 20 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

account: object {id, name }

The account the zone belongs to.

</summary>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

name: optional string

The name of the account.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

activated\_on: string

The last time proof of ownership was detected and the zone was made active.

formatdate-time

<a href="#">Link to this property</a>

created\_on: string

When the zone was created.

formatdate-time

<a href="#">Link to this property</a>

development\_mode: number

The interval (in seconds) from when development mode expires (positive integer) or last expired (negative integer) for the domain. If development mode has never been enabled, this value is 0.

<a href="#">Link to this property</a>

<details>

<summary>

meta: object {cdn\_only, custom\_certificate\_quota, dns\_only, 4 more }

Metadata about the zone.

</summary>

cdn\_only: optional boolean

The zone is only configured for CDN.

<a href="#">Link to this property</a>

custom\_certificate\_quota: optional number

Number of Custom Certificates the zone can have.

<a href="#">Link to this property</a>

dns\_only: optional boolean

The zone is only configured for DNS.

<a href="#">Link to this property</a>

foundation\_dns: optional boolean

The zone is setup with Foundation DNS.

<a href="#">Link to this property</a>

page\_rule\_quota: optional number

Number of Page Rules a zone can have.

<a href="#">Link to this property</a>

phishing\_detected: optional boolean

The zone has been flagged for phishing.

<a href="#">Link to this property</a>

step: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

When the zone was last modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

The domain name. Per <a href="https://datatracker.ietf.org/doc/html/rfc1035#section-2.3.4">RFC 1035</a> the overall zone name can be up to 253 characters, with each segment (“label”) not exceeding 63 characters.

maxLength253

<a href="#">Link to this property</a>

name\_servers: array of string

The name servers Cloudflare assigns to a zone.

<a href="#">Link to this property</a>

original\_dnshost: string

DNS host at the time of switching to Cloudflare.

maxLength50

<a href="#">Link to this property</a>

original\_name\_servers: array of string

Original name servers before moving to Cloudflare.

<a href="#">Link to this property</a>

original\_registrar: string

Registrar for the domain at the time of switching to Cloudflare.

<a href="#">Link to this property</a>

<details>

<summary>

owner: object {id, name, type }

The owner of the zone.

</summary>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

name: optional string

Name of the owner.

<a href="#">Link to this property</a>

type: optional string

The type of owner.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Deprecatedplan: object {id, can\_subscribe, currency, 7 more }

Please use the <code>/zones/{zone_id}/subscription</code> API to update a zone’s plan. Changing this value will create/cancel associated subscriptions. To view available plans for this zone, see <a href="https://developers.cloudflare.com/api/resources/zones/subresources/plans/">Zone Plans</a>.

A Zones subscription information.

</summary>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

can\_subscribe: optional boolean

States if the subscription can be activated.

<a href="#">Link to this property</a>

currency: optional string

The denomination of the customer.

<a href="#">Link to this property</a>

externally\_managed: optional boolean

If this Zone is managed by another company.

<a href="#">Link to this property</a>

frequency: optional string

How often the customer is billed.

<a href="#">Link to this property</a>

is\_subscribed: optional boolean

States if the subscription active.

<a href="#">Link to this property</a>

legacy\_discount: optional boolean

If the legacy discount applies to this Zone.

<a href="#">Link to this property</a>

legacy\_id: optional string

The legacy name of the plan.

<a href="#">Link to this property</a>

name: optional string

Name of the owner.

<a href="#">Link to this property</a>

price: optional number

How much the customer is paying.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cname\_suffix: optional string

Allows the customer to use a custom apex. *Tenants Only Configuration*.

<a href="#">Link to this property</a>

paused: optional boolean

Indicates whether the zone is only using Cloudflare DNS services. A true value means the zone will not receive security or performance benefits.

<a href="#">Link to this property</a>

Deprecatedpermissions: optional array of string

This has been replaced by Account memberships.

Legacy permissions based on legacy user membership information.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "initializing"or "pending"or "active"or "moved"

The zone status on Cloudflare.

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"moved"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tenant: optional object {id, name }

The root organizational unit that this zone belongs to (such as a tenant or organization).

</summary>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

name: optional string

The name of the Tenant account.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tenant\_unit: optional object {id }

The immediate parent organizational unit that this zone belongs to (such as under a tenant or sub-organization).

</summary>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: optional <a href="https://developers.cloudflare.com/api/resources/zones#(resource)%20zones%20%3E%20(model)%20type%20%3E%20(schema)">Type</a>

A full zone implies that DNS is hosted with Cloudflare. A partial zone is typically a partner-hosted zone or a CNAME setup.

</summary>

One of the following:

"full"

<a href="#">Link to this property</a>

"partial"

<a href="#">Link to this property</a>

"secondary"

<a href="#">Link to this property</a>

"internal"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

vanity\_name\_servers: optional array of string

An array of domains used for custom name servers. This is only available for Business and Enterprise plans.

<a href="#">Link to this property</a>

verification\_key: optional string

Verification key for partial zone setup.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zones%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Create Zone

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "account": {},
          "name": "example.com",
          "type": "full"
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
    "account": {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "name": "Example Account Name"
    },
    "activated_on": "2014-01-02T00:01:00.12345Z",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "development_mode": 7200,
    "meta": {
      "cdn_only": true,
      "custom_certificate_quota": 1,
      "dns_only": true,
      "foundation_dns": true,
      "page_rule_quota": 100,
      "phishing_detected": false,
      "step": 2
    },
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "name": "example.com",
    "name_servers": [
      "bob.ns.cloudflare.com",
      "lola.ns.cloudflare.com"
    ],
    "original_dnshost": "NameCheap",
    "original_name_servers": [
      "ns1.originaldnshost.com",
      "ns2.originaldnshost.com"
    ],
    "original_registrar": "GoDaddy",
    "owner": {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "name": "Example Org",
      "type": "organization"
    },
    "plan": {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "can_subscribe": false,
      "currency": "USD",
      "externally_managed": false,
      "frequency": "monthly",
      "is_subscribed": false,
      "legacy_discount": false,
      "legacy_id": "free",
      "name": "Example Org",
      "price": 10.99
    },
    "cname_suffix": "cdn.cloudflare.com",
    "paused": true,
    "permissions": [
      "#worker:read"
    ],
    "status": "active",
    "tenant": {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "name": "Example Account Name"
    },
    "tenant_unit": {
      "id": "023e105f4ecef8ad9ca31a8372d0c353"
    },
    "type": "full",
    "vanity_name_servers": [
      "ns1.example.com",
      "ns2.example.com"
    ],
    "verification_key": "284344499-1084221259"
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
    "account": {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "name": "Example Account Name"
    },
    "activated_on": "2014-01-02T00:01:00.12345Z",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "development_mode": 7200,
    "meta": {
      "cdn_only": true,
      "custom_certificate_quota": 1,
      "dns_only": true,
      "foundation_dns": true,
      "page_rule_quota": 100,
      "phishing_detected": false,
      "step": 2
    },
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "name": "example.com",
    "name_servers": [
      "bob.ns.cloudflare.com",
      "lola.ns.cloudflare.com"
    ],
    "original_dnshost": "NameCheap",
    "original_name_servers": [
      "ns1.originaldnshost.com",
      "ns2.originaldnshost.com"
    ],
    "original_registrar": "GoDaddy",
    "owner": {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "name": "Example Org",
      "type": "organization"
    },
    "plan": {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "can_subscribe": false,
      "currency": "USD",
      "externally_managed": false,
      "frequency": "monthly",
      "is_subscribed": false,
      "legacy_discount": false,
      "legacy_id": "free",
      "name": "Example Org",
      "price": 10.99
    },
    "cname_suffix": "cdn.cloudflare.com",
    "paused": true,
    "permissions": [
      "#worker:read"
    ],
    "status": "active",
    "tenant": {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "name": "Example Account Name"
    },
    "tenant_unit": {
      "id": "023e105f4ecef8ad9ca31a8372d0c353"
    },
    "type": "full",
    "vanity_name_servers": [
      "ns1.example.com",
      "ns2.example.com"
    ],
    "verification_key": "284344499-1084221259"
  }
}
```