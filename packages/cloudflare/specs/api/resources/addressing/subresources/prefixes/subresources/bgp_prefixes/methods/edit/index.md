---
title: Update BGP Prefix
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Addressing](https://developers.cloudflare.com/api/resources/addressing)

[Prefixes](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes)

[BGP Prefixes](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/bgp_prefixes)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update BGP Prefix

PATCH/accounts/{account\_id}/addressing/prefixes/{prefix\_id}/bgp/prefixes/{bgp\_prefix\_id}

Update the properties of a BGP Prefix, such as the on demand advertisement status (advertised or withdrawn).

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

`Magic Transit Write``IP Prefixes: Write``IP Prefixes: BGP On Demand Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier of a Cloudflare account.

maxLength32

[Link to this property](#)%20addressing.prefixes.bgp_prefixes%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

prefix\_id: string

Identifier of an IP Prefix.

maxLength32

[Link to this property](#)%20addressing.prefixes.bgp_prefixes%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20prefix_id%20%3E%20(schema)>)

bgp\_prefix\_id: string

Identifier of BGP Prefix.

maxLength32

[Link to this property](#)%20addressing.prefixes.bgp_prefixes%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20bgp_prefix_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

asn\_prepend\_count: optional number

Number of times to prepend the Cloudflare ASN to the BGP AS-Path attribute

maximum3

minimum0

[Link to this property](#)%20addressing.prefixes.bgp_prefixes%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20asn_prepend_count%20%3E%20(schema)>)

auto\_advertise\_withdraw: optional boolean

Determines if Cloudflare advertises a BYOIP BGP prefix even when there is no matching BGP prefix in the Magic routing table. When true, Cloudflare will automatically withdraw the BGP prefix when there are no matching BGP routes, and will resume advertising when there is at least one matching BGP route.

[Link to this property](#)%20addressing.prefixes.bgp_prefixes%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20auto_advertise_withdraw%20%3E%20(schema)>)

<details>

<summary>

on\_demand: optional object {advertised }

</summary>

advertised: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20addressing.prefixes.bgp_prefixes%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20on_demand%20%3E%20(schema)>)

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

[Link to this property](#)%20addressing.prefixes.bgp_prefixes%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20addressing.prefixes.bgp_prefixes%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20addressing.prefixes.bgp_prefixes%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/addressing#(resource)%20addressing.prefixes.bgp_prefixes%20%3E%20(model)%20bgp_prefix%20%3E%20(schema)">BGPPrefix</a> { id, asn, asn\_prepend\_count, 6 more }

</summary>

id: optional string

Identifier of BGP Prefix.

maxLength32

<a href="#">Link to this property</a>

asn: optional number

Autonomous System Number (ASN) the prefix will be advertised under.

<a href="#">Link to this property</a>

asn\_prepend\_count: optional number

Number of times to prepend the Cloudflare ASN to the BGP AS-Path attribute

maximum3

minimum0

<a href="#">Link to this property</a>

auto\_advertise\_withdraw: optional boolean

Determines if Cloudflare advertises a BYOIP BGP prefix even when there is no matching BGP prefix in the Magic routing table. When true, Cloudflare will automatically withdraw the BGP prefix when there are no matching BGP routes, and will resume advertising when there is at least one matching BGP route.

<a href="#">Link to this property</a>

<details>

<summary>

bgp\_signal\_opts: optional object {enabled, modified\_at }

</summary>

enabled: optional boolean

Whether control of advertisement of the prefix to the Internet is enabled to be performed via BGP signal

<a href="#">Link to this property</a>

modified\_at: optional string

Last time BGP signaling control was toggled. This field is null if BGP signaling has never been enabled.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cidr: optional string

IP Prefix in Classless Inter-Domain Routing format.

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

on\_demand: optional object {advertised, advertised\_modified\_at, on\_demand\_enabled, on\_demand\_locked }

</summary>

advertised: optional boolean

Prefix advertisement status to the Internet. This field is only not ‘null’ if on demand is enabled.

<a href="#">Link to this property</a>

advertised\_modified\_at: optional string

Last time the advertisement status was changed. This field is only not ‘null’ if on demand is enabled.

formatdate-time

<a href="#">Link to this property</a>

on\_demand\_enabled: optional boolean

Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.

<a href="#">Link to this property</a>

on\_demand\_locked: optional boolean

Whether the advertisement status of the prefix is locked, meaning it cannot be changed.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20addressing.prefixes.bgp_prefixes%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Update BGP Prefix

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/bgp/prefixes/$BGP_PREFIX_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "asn_prepend_count": 2,
          "auto_advertise_withdraw": true
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
    "id": "7009ba364c7a5760798ceb430e603b74",
    "asn": 13335,
    "asn_prepend_count": 2,
    "auto_advertise_withdraw": true,
    "bgp_signal_opts": {
      "enabled": false,
      "modified_at": "2014-01-01T05:20:00.12345Z"
    },
    "cidr": "192.0.2.0/24",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "on_demand": {
      "advertised": true,
      "advertised_modified_at": "2014-01-01T05:20:00.12345Z",
      "on_demand_enabled": true,
      "on_demand_locked": false
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
    "id": "7009ba364c7a5760798ceb430e603b74",
    "asn": 13335,
    "asn_prepend_count": 2,
    "auto_advertise_withdraw": true,
    "bgp_signal_opts": {
      "enabled": false,
      "modified_at": "2014-01-01T05:20:00.12345Z"
    },
    "cidr": "192.0.2.0/24",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "on_demand": {
      "advertised": true,
      "advertised_modified_at": "2014-01-01T05:20:00.12345Z",
      "on_demand_enabled": true,
      "on_demand_locked": false
    }
  }
}
```