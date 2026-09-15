---
title: Delete Site ACL
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Magic Transit](https://developers.cloudflare.com/api/resources/magic_transit)

[Sites](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites)

[ACLs](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/acls)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Delete Site ACL

DELETE/accounts/{account\_id}/magic/sites/{site\_id}/acls/{acl\_id}

Remove a specific Site ACL.

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

`Magic WAN Write``Magic Transit Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier

maxLength32

[Link to this property](#)%20magic_transit.sites.acls%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

site\_id: string

Identifier

maxLength32

[Link to this property](#)%20magic_transit.sites.acls%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20site_id%20%3E%20(schema)>)

acl\_id: string

Identifier

maxLength32

[Link to this property](#)%20magic_transit.sites.acls%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20acl_id%20%3E%20(schema)>)

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

[Link to this property](#)%20magic_transit.sites.acls%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20magic_transit.sites.acls%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.acls%20%3E%20(model)%20acl%20%3E%20(schema)">ACL</a> { id, description, forward\_locally, 5 more }

Bidirectional ACL policy for network traffic within a site.

</summary>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

description: optional string

Description for the ACL.

<a href="#">Link to this property</a>

forward\_locally: optional boolean

The desired forwarding action for this ACL policy. If set to “false”, the policy will forward traffic to Cloudflare. If set to “true”, the policy will forward traffic locally on the Magic Connector. If not included in request, will default to false.

<a href="#">Link to this property</a>

<details>

<summary>

lan\_1: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.acls%20%3E%20(model)%20acl_configuration%20%3E%20(schema)">ACLConfiguration</a> { lan\_id, lan\_name, port\_ranges, 2 more }

</summary>

lan\_id: string

The identifier for the LAN you want to create an ACL policy with.

<a href="#">Link to this property</a>

lan\_name: optional string

The name of the LAN based on the provided lan\_id.

<a href="#">Link to this property</a>

port\_ranges: optional array of string

Array of port ranges on the provided LAN that will be included in the ACL. If no ports or port rangess are provided, communication on any port on this LAN is allowed.

<a href="#">Link to this property</a>

ports: optional array of number

Array of ports on the provided LAN that will be included in the ACL. If no ports or port ranges are provided, communication on any port on this LAN is allowed.

<a href="#">Link to this property</a>

subnets: optional array of <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.acls%20%3E%20(model)%20subnet%20%3E%20(schema)">Subnet</a>

Array of subnet IPs within the LAN that will be included in the ACL. If no subnets are provided, communication on any subnets on this LAN are allowed.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

lan\_2: optional <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.acls%20%3E%20(model)%20acl_configuration%20%3E%20(schema)">ACLConfiguration</a> { lan\_id, lan\_name, port\_ranges, 2 more }

</summary>

lan\_id: string

The identifier for the LAN you want to create an ACL policy with.

<a href="#">Link to this property</a>

lan\_name: optional string

The name of the LAN based on the provided lan\_id.

<a href="#">Link to this property</a>

port\_ranges: optional array of string

Array of port ranges on the provided LAN that will be included in the ACL. If no ports or port rangess are provided, communication on any port on this LAN is allowed.

<a href="#">Link to this property</a>

ports: optional array of number

Array of ports on the provided LAN that will be included in the ACL. If no ports or port ranges are provided, communication on any port on this LAN is allowed.

<a href="#">Link to this property</a>

subnets: optional array of <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.acls%20%3E%20(model)%20subnet%20%3E%20(schema)">Subnet</a>

Array of subnet IPs within the LAN that will be included in the ACL. If no subnets are provided, communication on any subnets on this LAN are allowed.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

The name of the ACL.

<a href="#">Link to this property</a>

<details>

<summary>

protocols: optional array of <a href="https://developers.cloudflare.com/api/resources/magic_transit#(resource)%20magic_transit.sites.acls%20%3E%20(model)%20allowed_protocol%20%3E%20(schema)">AllowedProtocol</a>

</summary>

One of the following:

"tcp"

<a href="#">Link to this property</a>

"udp"

<a href="#">Link to this property</a>

"icmp"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

unidirectional: optional boolean

The desired traffic direction for this ACL policy. If set to “false”, the policy will allow bidirectional traffic. If set to “true”, the policy will only allow traffic in one direction. If not included in request, will default to false.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.acls%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20magic_transit.sites.acls%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Delete Site ACL

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/acls/$ACL_ID \
    -X DELETE \
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
    "description": "Allows local traffic between PIN pads and cash register.",
    "forward_locally": true,
    "lan_1": {
      "lan_id": "lan_id",
      "lan_name": "lan_name",
      "port_ranges": [
        "8080-9000"
      ],
      "ports": [
        1
      ],
      "subnets": [
        "192.0.2.1"
      ]
    },
    "lan_2": {
      "lan_id": "lan_id",
      "lan_name": "lan_name",
      "port_ranges": [
        "8080-9000"
      ],
      "ports": [
        1
      ],
      "subnets": [
        "192.0.2.1"
      ]
    },
    "name": "PIN Pad - Cash Register",
    "protocols": [
      "tcp"
    ],
    "unidirectional": true
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
    "description": "Allows local traffic between PIN pads and cash register.",
    "forward_locally": true,
    "lan_1": {
      "lan_id": "lan_id",
      "lan_name": "lan_name",
      "port_ranges": [
        "8080-9000"
      ],
      "ports": [
        1
      ],
      "subnets": [
        "192.0.2.1"
      ]
    },
    "lan_2": {
      "lan_id": "lan_id",
      "lan_name": "lan_name",
      "port_ranges": [
        "8080-9000"
      ],
      "ports": [
        1
      ],
      "subnets": [
        "192.0.2.1"
      ]
    },
    "name": "PIN Pad - Cash Register",
    "protocols": [
      "tcp"
    ],
    "unidirectional": true
  },
  "success": true
}
```