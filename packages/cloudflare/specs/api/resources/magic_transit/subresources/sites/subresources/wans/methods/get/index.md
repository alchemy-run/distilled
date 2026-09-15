---
title: Site WAN Details
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Magic Transit](https://developers.cloudflare.com/api/resources/magic_transit)

[Sites](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites)

[WANs](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/wans)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Site WAN Details

GET/accounts/{account\_id}/magic/sites/{site\_id}/wans/{wan\_id}

Get a specific Site WAN.

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

`Magic WAN Write``Magic WAN Read``Magic Transit Read``Magic Transit Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier

maxLength32

[Link to this property](#)%20magic_transit.sites.wans%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

site\_id: string

Identifier

maxLength32

[Link to this property](#)%20magic_transit.sites.wans%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20site_id%20%3E%20(schema)>)

wan\_id: string

Identifier

maxLength32

[Link to this property](#)%20magic_transit.sites.wans%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20wan_id%20%3E%20(schema)>)

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

[Link to this property](#)%20magic_transit.sites.wans%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20magic_transit.sites.wans%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.wans%20%3E%20(model)%20wan%20%3E%20(schema)">WAN</a> { id, health\_check\_rate, name, 5 more }

</summary>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

health\_check\_rate: optional "low"or "mid"or "high"

Magic WAN health check rate for tunnels created on this link. The default value is <code>mid</code>.

</summary>

One of the following:

"low"

<a href="#">Link to this property</a>

"mid"

<a href="#">Link to this property</a>

"high"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

physport: optional number

<a href="#">Link to this property</a>

priority: optional number

Priority of WAN for traffic loadbalancing.

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

static\_addressing: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.wans%20%3E%20(model)%20wan_static_addressing%20%3E%20(schema)">WANStaticAddressing</a> { address, gateway\_address, secondary\_address }

(optional) if omitted, use DHCP. Submit secondary\_address when site is in high availability mode.

</summary>

address: string

A valid CIDR notation representing an IP range.

<a href="#">Link to this property</a>

gateway\_address: string

A valid IPv4 address.

<a href="#">Link to this property</a>

secondary\_address: optional string

A valid CIDR notation representing an IP range.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

vlan\_tag: optional number

VLAN ID. Use zero for untagged.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.wans%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20magic_transit.sites.wans%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Site WAN Details

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/wans/$WAN_ID \
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
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "health_check_rate": "low",
    "name": "name",
    "physport": 1,
    "priority": 0,
    "site_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "static_addressing": {
      "address": "192.0.2.0/24",
      "gateway_address": "192.0.2.1",
      "secondary_address": "192.0.2.0/24"
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
    "health_check_rate": "low",
    "name": "name",
    "physport": 1,
    "priority": 0,
    "site_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "static_addressing": {
      "address": "192.0.2.0/24",
      "gateway_address": "192.0.2.1",
      "secondary_address": "192.0.2.0/24"
    },
    "vlan_tag": 42
  },
  "success": true
}
```