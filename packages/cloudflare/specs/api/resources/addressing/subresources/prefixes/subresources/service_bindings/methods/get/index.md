---
title: Get Service Binding
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Addressing](https://developers.cloudflare.com/api/resources/addressing)

[Prefixes](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes)

[Service Bindings](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/service_bindings)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Service Binding

GET/accounts/{account\_id}/addressing/prefixes/{prefix\_id}/bindings/{binding\_id}

Fetch a single Service Binding

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

`IP Prefixes: Write``IP Prefixes: Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier of a Cloudflare account.

maxLength32

[Link to this property](#)%20addressing.prefixes.service_bindings%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

prefix\_id: string

Identifier of an IP Prefix.

maxLength32

[Link to this property](#)%20addressing.prefixes.service_bindings%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20prefix_id%20%3E%20(schema)>)

binding\_id: string

Identifier of a Service Binding.

maxLength32

[Link to this property](#)%20addressing.prefixes.service_bindings%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20binding_id%20%3E%20(schema)>)

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

[Link to this property](#)%20addressing.prefixes.service_bindings%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20addressing.prefixes.service_bindings%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20addressing.prefixes.service_bindings%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/addressing#(resource)%20addressing.prefixes.service_bindings%20%3E%20(model)%20service_binding%20%3E%20(schema)">ServiceBinding</a> { id, cidr, provisioning, 2 more }

</summary>

id: optional string

Identifier of a Service Binding.

maxLength32

<a href="#">Link to this property</a>

cidr: optional string

IP Prefix in Classless Inter-Domain Routing format.

<a href="#">Link to this property</a>

<details>

<summary>

provisioning: optional object {state }

Status of a Service Binding’s deployment to the Cloudflare network

</summary>

<details>

<summary>

state: optional "provisioning"or "active"or "magic\_transit\_route\_missing"

When a binding has been deployed to a majority of Cloudflare datacenters, the binding will become active and can be used with its associated service.

</summary>

One of the following:

"provisioning"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"magic\_transit\_route\_missing"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

service\_id: optional string

Identifier of a Service on the Cloudflare network. Available services and their IDs may be found in the **List Services** endpoint.

maxLength32

<a href="#">Link to this property</a>

service\_name: optional string

Name of a service running on the Cloudflare network

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20addressing.prefixes.service_bindings%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get Service Binding

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/bindings/$BINDING_ID \
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
    "id": "0429b49b6a5155297b78e75a44b09e14",
    "cidr": "192.0.2.0/24",
    "provisioning": {
      "state": "provisioning"
    },
    "service_id": "2db684ee7ca04e159946fd05b99e1bcd",
    "service_name": "Magic Transit"
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
    "id": "0429b49b6a5155297b78e75a44b09e14",
    "cidr": "192.0.2.0/24",
    "provisioning": {
      "state": "provisioning"
    },
    "service_id": "2db684ee7ca04e159946fd05b99e1bcd",
    "service_name": "Magic Transit"
  }
}
```