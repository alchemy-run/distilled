---
title: Get a proxy endpoint
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Gateway](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway)

[Proxy Endpoints](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/proxy_endpoints)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get a proxy endpoint

GET/accounts/{account\_id}/gateway/proxy\_endpoints/{proxy\_endpoint\_id}

Get a single Zero Trust Gateway proxy endpoint.

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

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.gateway.proxy_endpoints%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

proxy\_endpoint\_id: string

[Link to this property](#)%20zero_trust.gateway.proxy_endpoints%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20proxy_endpoint_id%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.gateway.proxy_endpoints%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.gateway.proxy_endpoints%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Indicate whether the API call was successful.

[Link to this property](#)%20zero_trust.gateway.proxy_endpoints%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.proxy_endpoints%20%3E%20(model)%20proxy_endpoint%20%3E%20(schema)">ProxyEndpoint</a>

</summary>

One of the following:

<details>

<summary>

IP object {ips, name, id, 4 more }

</summary>

ips: array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.proxy_endpoints%20%3E%20(model)%20gateway_ips%20%3E%20(schema)">GatewayIPs</a>

Specify the list of CIDRs to restrict ingress connections.

<a href="#">Link to this property</a>

name: string

Specify the name of the proxy endpoint.

<a href="#">Link to this property</a>

id: optional string

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

kind: optional "ip"

The proxy endpoint kind

<a href="#">Link to this property</a>

subdomain: optional string

Specify the subdomain to use as the destination in the proxy client.

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Identity object {kind, name, id, 3 more }

</summary>

kind: "identity"

The proxy endpoint kind

<a href="#">Link to this property</a>

name: string

Specify the name of the proxy endpoint.

<a href="#">Link to this property</a>

id: optional string

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

subdomain: optional string

Specify the subdomain to use as the destination in the proxy client.

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.proxy_endpoints%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get a proxy endpoint

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/proxy_endpoints/$PROXY_ENDPOINT_ID \
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
    "ips": [
      "192.0.2.1/32"
    ],
    "name": "Devops team",
    "id": "ed35569b41ce4d1facfe683550f54086",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "kind": "ip",
    "subdomain": "oli3n9zkz5.proxy.cloudflare-gateway.com",
    "updated_at": "2014-01-01T05:20:00.12345Z"
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
    "ips": [
      "192.0.2.1/32"
    ],
    "name": "Devops team",
    "id": "ed35569b41ce4d1facfe683550f54086",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "kind": "ip",
    "subdomain": "oli3n9zkz5.proxy.cloudflare-gateway.com",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```