---
title: List Subnets
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Networks](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks)

[Subnets](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/subnets)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Subnets

GET/accounts/{account\_id}/zerotrust/subnets

Lists and filters subnets in an account.

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

`Cloudflare One Networks Write``Cloudflare One Networks Read`

##### P ath ParametersExpand Collapse

account\_id: string

Cloudflare account ID

maxLength32

[Link to this property](#)%20zero_trust.networks.subnets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

<details>

<summary>

address\_family: optional "v4"or "v6"

If set, only include subnets in the given address family - <code>v4</code> or <code>v6</code>

</summary>

One of the following:

"v4"

<a href="#">Link to this property</a>

"v6"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.networks.subnets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20address_family%20%3E%20(schema)>)

comment: optional string

If set, only list subnets with the given comment.

[Link to this property](#)%20zero_trust.networks.subnets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20comment%20%3E%20(schema)>)

existed\_at: optional string

If provided, include only resources that were created (and not deleted) before this time. URL encoded.

formaturl-encoded-date-time

[Link to this property](#)%20zero_trust.networks.subnets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20existed_at%20%3E%20(schema)>)

is\_default\_network: optional boolean

If `true`, only include default subnets. If `false`, exclude default subnets subnets. If not set, all subnets will be included.

[Link to this property](#)%20zero_trust.networks.subnets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20is_default_network%20%3E%20(schema)>)

is\_deleted: optional boolean

If `true`, only include deleted subnets. If `false`, exclude deleted subnets. If not set, all subnets will be included.

[Link to this property](#)%20zero_trust.networks.subnets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20is_deleted%20%3E%20(schema)>)

name: optional string

If set, only list subnets with the given name

[Link to this property](#)%20zero_trust.networks.subnets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

network: optional string

If set, only list the subnet whose network exactly matches the given CIDR.

[Link to this property](#)%20zero_trust.networks.subnets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20network%20%3E%20(schema)>)

page: optional number

Page number of paginated results.

minimum1

[Link to this property](#)%20zero_trust.networks.subnets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Number of results to display.

maximum1000

minimum1

[Link to this property](#)%20zero_trust.networks.subnets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

<details>

<summary>

sort\_order: optional "asc"or "desc"

Sort order of the results. <code>asc</code> means oldest to newest, <code>desc</code> means newest to oldest. If not set, they will not be in any particular order.

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.networks.subnets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20sort_order%20%3E%20(schema)>)

<details>

<summary>

subnet\_types: optional "cloudflare\_source"or "initial\_resolved\_ip"or "warp"

If set, the types of subnets to include, separated by comma.

</summary>

One of the following:

"cloudflare\_source"

<a href="#">Link to this property</a>

"initial\_resolved\_ip"

<a href="#">Link to this property</a>

"warp"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.networks.subnets%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20subnet_types%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.networks.subnets%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.networks.subnets%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.networks.subnets.warp%20%3E%20(model)%20subnet%20%3E%20(schema)">Subnet</a> { id, capacity, comment, 6 more }

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

[Link to this property](#)%20zero_trust.networks.subnets%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20zero_trust.networks.subnets%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, total\_count }

</summary>

count: optional number

Total number of results for the requested service

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page of results

<a href="#">Link to this property</a>

total\_count: optional number

Total results available without any search parameters

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.networks.subnets%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List Subnets

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/zerotrust/subnets \
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