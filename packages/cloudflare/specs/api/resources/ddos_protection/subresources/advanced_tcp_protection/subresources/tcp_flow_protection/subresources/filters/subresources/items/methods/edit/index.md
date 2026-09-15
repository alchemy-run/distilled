---
title: Update TCP Flow Protection filter.
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[DDoS Protection](https://developers.cloudflare.com/api/resources/ddos_protection)

[Advanced TCP Protection](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection)

[TCP Flow Protection](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/tcp_flow_protection)

[Filters](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/tcp_flow_protection/subresources/filters)

[Items](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/tcp_flow_protection/subresources/filters/subresources/items)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update TCP Flow Protection filter.

PATCH/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/tcp\_flow\_protection/filters/{filter\_id}

Update a TCP Flow Protection filter specified by the given UUID.

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

`DDoS Protection Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.filters.items%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

filter\_id: string

UUID.

maxLength36

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.filters.items%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20filter_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

expression: optional string

The new filter expression. Optional.

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.filters.items%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20expression%20%3E%20(schema)>)

mode: optional string

The new mode for the filter. Optional. Must be one of ‘enabled’, ‘disabled’, ‘monitoring’.

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.filters.items%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20mode%20%3E%20(schema)>)

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

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.filters.items%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.filters.items%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.filters.items%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, created\_on, expression, 2 more }

</summary>

id: string

The unique ID of the expression filter.

<a href="#">Link to this property</a>

created\_on: string

The creation timestamp of the expression filter.

formatdate-time

<a href="#">Link to this property</a>

expression: string

The filter expression.

<a href="#">Link to this property</a>

mode: string

The filter’s mode. Must be one of ‘enabled’, ‘disabled’, ‘monitoring’.

<a href="#">Link to this property</a>

modified\_on: string

The last modification timestamp of the expression filter.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.tcp_flow_protection.filters.items%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Update TCP Flow Protection filter.

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters/$FILTER_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "expression": "ip.dst in { 192.0.2.0/24 198.51.100.0/24 } and tcp.srcport in { 80 443 10000..65535 }"
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
    "id": "id",
    "created_on": "2019-12-27T18:11:19.117Z",
    "expression": "ip.dst in { 192.0.2.0/24 198.51.100.0/24 } and tcp.srcport in { 80 443 10000..65535 }",
    "mode": "mode",
    "modified_on": "2019-12-27T18:11:19.117Z"
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
    "id": "id",
    "created_on": "2019-12-27T18:11:19.117Z",
    "expression": "ip.dst in { 192.0.2.0/24 198.51.100.0/24 } and tcp.srcport in { 80 443 10000..65535 }",
    "mode": "mode",
    "modified_on": "2019-12-27T18:11:19.117Z"
  }
}
```