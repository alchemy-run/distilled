---
title: Get prefix.
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[DDoS Protection](https://developers.cloudflare.com/api/resources/ddos_protection)

[Advanced TCP Protection](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection)

[Prefixes](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/prefixes)

[Items](https://developers.cloudflare.com/api/resources/ddos_protection/subresources/advanced_tcp_protection/subresources/prefixes/subresources/items)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get prefix.

GET/accounts/{account\_id}/magic/advanced\_tcp\_protection/configs/prefixes/{prefix\_id}

Get a prefix specified by the given UUID.

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

`DDoS Protection Write``DDoS Protection Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.prefixes.items%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

prefix\_id: string

UUID.

maxLength36

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.prefixes.items%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20prefix_id%20%3E%20(schema)>)

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

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.prefixes.items%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.prefixes.items%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.prefixes.items%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, comment, created\_on, 3 more }

</summary>

id: string

The unique ID of the prefix.

<a href="#">Link to this property</a>

comment: string

A comment describing the prefix.

<a href="#">Link to this property</a>

created\_on: string

The creation timestamp of the prefix.

formatdate-time

<a href="#">Link to this property</a>

excluded: boolean

Whether to exclude the prefix from protection.

<a href="#">Link to this property</a>

modified\_on: string

The last modification timestamp of the prefix.

formatdate-time

<a href="#">Link to this property</a>

prefix: string

The prefix in CIDR format.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ddos_protection.advanced_tcp_protection.prefixes.items%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get prefix.

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/prefixes/$PREFIX_ID \
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
    "id": "id",
    "comment": "comment",
    "created_on": "2019-12-27T18:11:19.117Z",
    "excluded": true,
    "modified_on": "2019-12-27T18:11:19.117Z",
    "prefix": "192.0.2.0/24"
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
    "comment": "comment",
    "created_on": "2019-12-27T18:11:19.117Z",
    "excluded": true,
    "modified_on": "2019-12-27T18:11:19.117Z",
    "prefix": "192.0.2.0/24"
  }
}
```