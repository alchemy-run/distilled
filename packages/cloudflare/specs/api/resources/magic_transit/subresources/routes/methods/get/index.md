---
title: Route Details
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Magic Transit](https://developers.cloudflare.com/api/resources/magic_transit)

[Routes](https://developers.cloudflare.com/api/resources/magic_transit/subresources/routes)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Route Details

GET/accounts/{account\_id}/magic/routes/{route\_id}

Get a specific Magic static route.

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

[Link to this property](#)%20magic_transit.routes%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

route\_id: string

Identifier

maxLength32

[Link to this property](#)%20magic_transit.routes%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20route_id%20%3E%20(schema)>)

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

[Link to this property](#)%20magic_transit.routes%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20magic_transit.routes%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {route }

</summary>

<details>

<summary>

route: optional object {id, nexthop, prefix, 6 more }

</summary>

id: string

Identifier

maxLength32

<a href="#">Link to this property</a>

nexthop: string

The next-hop IP Address for the static route.

<a href="#">Link to this property</a>

prefix: string

IP Prefix in Classless Inter-Domain Routing format.

<a href="#">Link to this property</a>

priority: number

Priority of the static route.

<a href="#">Link to this property</a>

created\_on: optional string

When the route was created.

formatdate-time

<a href="#">Link to this property</a>

description: optional string

An optional human provided description of the static route.

<a href="#">Link to this property</a>

modified\_on: optional string

When the route was last modified.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

scope: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.routes%20%3E%20(model)%20scope%20%3E%20(schema)">Scope</a> { colo\_names, colo\_regions }

Used only for ECMP routes.

</summary>

colo\_names: optional array of string

List of colo names for the ECMP scope.

<a href="#">Link to this property</a>

colo\_regions: optional array of string

List of colo regions for the ECMP scope.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

weight: optional number

Optional weight of the ECMP scope - if provided.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.routes%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20magic_transit.routes%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Route Details

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/routes/$ROUTE_ID \
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
    "route": {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "nexthop": "203.0.113.1",
      "prefix": "192.0.2.0/24",
      "priority": 0,
      "created_on": "2017-06-14T00:00:00Z",
      "description": "New route for new prefix 203.0.113.1",
      "modified_on": "2017-06-14T05:20:00Z",
      "scope": {
        "colo_names": [
          "den01"
        ],
        "colo_regions": [
          "APAC"
        ]
      },
      "weight": 0
    }
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
    "route": {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "nexthop": "203.0.113.1",
      "prefix": "192.0.2.0/24",
      "priority": 0,
      "created_on": "2017-06-14T00:00:00Z",
      "description": "New route for new prefix 203.0.113.1",
      "modified_on": "2017-06-14T05:20:00Z",
      "scope": {
        "colo_names": [
          "den01"
        ],
        "colo_regions": [
          "APAC"
        ]
      },
      "weight": 0
    }
  },
  "success": true
}
```