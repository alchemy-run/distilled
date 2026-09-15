---
title: Create WARP IP subnet
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Networks](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks)

[Subnets](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/subnets)

[WARP](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/subnets/subresources/warp)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create WARP IP subnet

POST/accounts/{account\_id}/zerotrust/subnets/warp

Create a WARP IP assignment subnet. Currently, only IPv4 subnets can be created.

**Network constraints:**

- The network must be within one of the following private IP ranges:
  - `10.0.0.0/8` (RFC 1918)
  - `172.16.0.0/12` (RFC 1918)
  - `192.168.0.0/16` (RFC 1918)
  - `100.64.0.0/10` (RFC 6598 - CGNAT)
- The subnet must have a prefix length of `/24` or larger (e.g., `/16`, `/20`, `/24` are valid; `/25`, `/28` are not)

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

`Cloudflare One Networks Write`

##### P ath ParametersExpand Collapse

account\_id: string

Cloudflare account ID

maxLength32

[Link to this property](#)%20zero_trust.networks.subnets.warp%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

name: string

A user-friendly name for the subnet.

[Link to this property](#)%20zero_trust.networks.subnets.warp%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

network: string

The private IPv4 or IPv6 range defining the subnet, in CIDR notation.

[Link to this property](#)%20zero_trust.networks.subnets.warp%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20network%20%3E%20(schema)>)

comment: optional string

An optional description of the subnet.

[Link to this property](#)%20zero_trust.networks.subnets.warp%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20comment%20%3E%20(schema)>)

is\_default\_network: optional boolean

If `true`, this is the default subnet for the account. There can only be one default subnet per account.

[Link to this property](#)%20zero_trust.networks.subnets.warp%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20is_default_network%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.networks.subnets.warp%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.networks.subnets.warp%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.networks.subnets.warp%20%3E%20(model)%20subnet%20%3E%20(schema)">Subnet</a> { id, capacity, comment, 6 more }

</summary>

id: optional string

The UUID of the subnet.

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

capacity: optional object {total, used }

IP capacity information for the subnet.

</summary>

total: optional number

Total number of assignable IPs in the subnet.

<a href="#">Link to this property</a>

used: optional number

Number of assigned IPs in the subnet.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

comment: optional string

An optional description of the subnet.

<a href="#">Link to this property</a>

created\_at: optional string

Timestamp of when the resource was created.

formatdate-time

<a href="#">Link to this property</a>

deleted\_at: optional string

Timestamp of when the resource was deleted. If <code>null</code>, the resource has not been deleted.

formatdate-time

<a href="#">Link to this property</a>

is\_default\_network: optional boolean

If <code>true</code>, this is the default subnet for the account. There can only be one default subnet per account.

<a href="#">Link to this property</a>

name: optional string

A user-friendly name for the subnet.

<a href="#">Link to this property</a>

network: optional string

The private IPv4 or IPv6 range defining the subnet, in CIDR notation.

<a href="#">Link to this property</a>

<details>

<summary>

subnet\_type: optional "cloudflare\_source"or "initial\_resolved\_ip"or "warp"

The type of subnet.

</summary>

One of the following:

"cloudflare\_source"

<a href="#">Link to this property</a>

"initial\_resolved\_ip"

<a href="#">Link to this property</a>

"warp"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.networks.subnets.warp%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20zero_trust.networks.subnets.warp%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Create WARP IP subnet

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/zerotrust/subnets/warp \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "IPv4 Cloudflare Source IPs",
          "network": "100.64.0.0/12",
          "comment": "example comment"
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
    "id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "capacity": {
      "total": 254,
      "used": 42
    },
    "comment": "example comment",
    "created_at": "2021-01-25T18:22:34.317854Z",
    "deleted_at": "2009-11-10T23:00:00Z",
    "is_default_network": true,
    "name": "IPv4 Cloudflare Source IPs",
    "network": "100.64.0.0/12",
    "subnet_type": "cloudflare_source"
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
    "id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "capacity": {
      "total": 254,
      "used": 42
    },
    "comment": "example comment",
    "created_at": "2021-01-25T18:22:34.317854Z",
    "deleted_at": "2009-11-10T23:00:00Z",
    "is_default_network": true,
    "name": "IPv4 Cloudflare Source IPs",
    "network": "100.64.0.0/12",
    "subnet_type": "cloudflare_source"
  },
  "success": true
}
```