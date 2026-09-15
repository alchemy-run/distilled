---
title: List proxy endpoints
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

# List proxy endpoints

GET/accounts/{account\_id}/gateway/proxy\_endpoints

List all Zero Trust Gateway proxy endpoints for an account.

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

[Link to this property](#)%20zero_trust.gateway.proxy_endpoints%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

<details>

<summary>

direction: optional "asc"or "desc"

Sort direction. Only takes effect when <code>order_by</code> is also provided; it is ignored otherwise. When <code>direction</code> is omitted the effective direction is field-specific: <code>created_at</code> and <code>updated_at</code> default to descending (newest first); <code>name</code> defaults to ascending.

- <code>asc</code> — ascending.
- <code>desc</code> — descending.

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.proxy_endpoints%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

filter: optional array of unknown

Filter the returned proxy endpoints by one or more `field:value` pairs. Repeat the parameter to apply multiple filters; they are combined with logical AND (an endpoint must satisfy every filter to be returned).

Supported fields and their matching behaviour:

- `name` — case-insensitive substring match on the endpoint name.
- `id` — substring match on the endpoint ID (UUID), with or without dashes.
- `kind` — exact match on the endpoint kind. The value must be `ip` or `identity`; any other value returns `400`.

Each entry must match one of the per-field patterns below: the field must be one of `name`, `id`, or `kind`; `name`/`id` accept any value, while `kind` only accepts `ip` or `identity`.

[Link to this property](#)%20zero_trust.gateway.proxy_endpoints%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20filter%20%3E%20(schema)>)

<details>

<summary>

order\_by: optional "name"or "created\_at"or "updated\_at"

Field to sort the returned endpoints by. When omitted, the order of results is unspecified. Supported values:

- <code>name</code> — sort alphabetically by endpoint name.
- <code>created_at</code> — sort by creation time; defaults to descending unless <code>direction</code> is set.
- <code>updated_at</code> — sort by last-modified time; defaults to descending unless <code>direction</code> is set.

</summary>

One of the following:

"name"

<a href="#">Link to this property</a>

"created\_at"

<a href="#">Link to this property</a>

"updated\_at"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.proxy_endpoints%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order_by%20%3E%20(schema)>)

search: optional string

Case-insensitive substring match on the endpoint name. When combined with `filter`, both must match (logical AND).

[Link to this property](#)%20zero_trust.gateway.proxy_endpoints%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20search%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.gateway.proxy_endpoints%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.gateway.proxy_endpoints%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Indicate whether the API call was successful.

[Link to this property](#)%20zero_trust.gateway.proxy_endpoints%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.proxy_endpoints%20%3E%20(model)%20proxy_endpoint%20%3E%20(schema)">ProxyEndpoint</a>

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

[Link to this property](#)%20zero_trust.gateway.proxy_endpoints%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, total\_count }

</summary>

count: optional number

Indicate the total number of results for the requested service.

<a href="#">Link to this property</a>

page: optional number

Indicate the current page within a paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Indicate the number of results per page.

<a href="#">Link to this property</a>

total\_count: optional number

Indicate the total results available without any search parameters.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.proxy_endpoints%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List proxy endpoints

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/proxy_endpoints \
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
  "result": [
    {
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
  ],
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
  "success": true,
  "result": [
    {
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
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```