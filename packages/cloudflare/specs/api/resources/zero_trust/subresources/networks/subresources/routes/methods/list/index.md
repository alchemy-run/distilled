---
title: List tunnel routes
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Networks](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks)

[Routes](https://developers.cloudflare.com/api/resources/zero_trust/subresources/networks/subresources/routes)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List tunnel routes

GET/accounts/{account\_id}/teamnet/routes

Lists and filters private network routes in an account.

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

`Cloudflare One Networks Write``Cloudflare One Networks Read``Cloudflare Tunnel Write``Cloudflare Tunnel Read`

##### P ath ParametersExpand Collapse

account\_id: string

Cloudflare account ID

maxLength32

[Link to this property](#)%20zero_trust.networks.routes%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

comment: optional string

Optional remark describing the route.

maxLength100

[Link to this property](#)%20zero_trust.networks.routes%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20comment%20%3E%20(schema)>)

existed\_at: optional string

If provided, include only resources that were created (and not deleted) before this time. URL encoded.

formaturl-encoded-date-time

[Link to this property](#)%20zero_trust.networks.routes%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20existed_at%20%3E%20(schema)>)

is\_deleted: optional boolean

If `true`, only include deleted routes. If `false`, exclude deleted routes. If empty, all routes will be included.

[Link to this property](#)%20zero_trust.networks.routes%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20is_deleted%20%3E%20(schema)>)

network\_subset: optional string

If set, only list routes that are contained within this IP range.

[Link to this property](#)%20zero_trust.networks.routes%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20network_subset%20%3E%20(schema)>)

network\_superset: optional string

If set, only list routes that contain this IP range.

[Link to this property](#)%20zero_trust.networks.routes%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20network_superset%20%3E%20(schema)>)

page: optional number

Page number of paginated results.

minimum1

[Link to this property](#)%20zero_trust.networks.routes%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Number of results to display.

maximum1000

minimum1

[Link to this property](#)%20zero_trust.networks.routes%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

route\_id: optional string

UUID of the route.

maxLength36

[Link to this property](#)%20zero_trust.networks.routes%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20route_id%20%3E%20(schema)>)

<details>

<summary>

tun\_types: optional array of "cfd\_tunnel"or "warp\_connector"or "warp"or 4 more

The types of tunnels to filter by, separated by commas.

</summary>

One of the following:

"cfd\_tunnel"

<a href="#">Link to this property</a>

"warp\_connector"

<a href="#">Link to this property</a>

"warp"

<a href="#">Link to this property</a>

"magic"

<a href="#">Link to this property</a>

"ip\_sec"

<a href="#">Link to this property</a>

"gre"

<a href="#">Link to this property</a>

"cni"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.networks.routes%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20tun_types%20%3E%20(schema)>)

tunnel\_id: optional string

UUID of the tunnel.

formatuuid

maxLength36

[Link to this property](#)%20zero_trust.networks.routes%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20tunnel_id%20%3E%20(schema)>)

virtual\_network\_id: optional string

UUID of the virtual network.

formatuuid

[Link to this property](#)%20zero_trust.networks.routes%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20virtual_network_id%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.networks.routes%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.networks.routes%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.networks.routes%20%3E%20(model)%20teamnet%20%3E%20(schema)">Teamnet</a> { id, comment, created\_at, 7 more }

</summary>

id: optional string

UUID of the route.

maxLength36

<a href="#">Link to this property</a>

comment: optional string

Optional remark describing the route.

maxLength100

<a href="#">Link to this property</a>

created\_at: optional string

Timestamp of when the resource was created.

formatdate-time

<a href="#">Link to this property</a>

deleted\_at: optional string

Timestamp of when the resource was deleted. If <code>null</code>, the resource has not been deleted.

formatdate-time

<a href="#">Link to this property</a>

network: optional string

The private IPv4 or IPv6 range connected by the route, in CIDR notation.

<a href="#">Link to this property</a>

<details>

<summary>

tun\_type: optional "cfd\_tunnel"or "warp\_connector"or "warp"or 4 more

The type of tunnel.

</summary>

One of the following:

"cfd\_tunnel"

<a href="#">Link to this property</a>

"warp\_connector"

<a href="#">Link to this property</a>

"warp"

<a href="#">Link to this property</a>

"magic"

<a href="#">Link to this property</a>

"ip\_sec"

<a href="#">Link to this property</a>

"gre"

<a href="#">Link to this property</a>

"cni"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tunnel\_id: optional string

UUID of the tunnel.

formatuuid

maxLength36

<a href="#">Link to this property</a>

tunnel\_name: optional string

A user-friendly name for a tunnel.

<a href="#">Link to this property</a>

virtual\_network\_id: optional string

UUID of the virtual network.

formatuuid

<a href="#">Link to this property</a>

virtual\_network\_name: optional string

A user-friendly name for the virtual network.

maxLength256

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.networks.routes%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20zero_trust.networks.routes%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

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

[Link to this property](#)%20zero_trust.networks.routes%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List tunnel routes

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/teamnet/routes \
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
      "comment": "Example comment for this route.",
      "created_at": "2021-01-25T18:22:34.317854Z",
      "deleted_at": "2009-11-10T23:00:00Z",
      "network": "172.16.0.0/16",
      "tun_type": "cfd_tunnel",
      "tunnel_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
      "tunnel_name": "blog",
      "virtual_network_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
      "virtual_network_name": "us-east-1-vpc"
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
      "comment": "Example comment for this route.",
      "created_at": "2021-01-25T18:22:34.317854Z",
      "deleted_at": "2009-11-10T23:00:00Z",
      "network": "172.16.0.0/16",
      "tun_type": "cfd_tunnel",
      "tunnel_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
      "tunnel_name": "blog",
      "virtual_network_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
      "virtual_network_name": "us-east-1-vpc"
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