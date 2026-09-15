---
title: List Prefix Delegations
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Addressing](https://developers.cloudflare.com/api/resources/addressing)

[Prefixes](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes)

[Delegations](https://developers.cloudflare.com/api/resources/addressing/subresources/prefixes/subresources/delegations)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Prefix Delegations

GET/accounts/{account\_id}/addressing/prefixes/{prefix\_id}/delegations

List all delegations for a given account IP prefix.

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

Identifier of a Cloudflare account.

maxLength32

[Link to this property](#)%20addressing.prefixes.delegations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

prefix\_id: string

Identifier of an IP Prefix.

maxLength32

[Link to this property](#)%20addressing.prefixes.delegations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20prefix_id%20%3E%20(schema)>)

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

[Link to this property](#)%20addressing.prefixes.delegations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20addressing.prefixes.delegations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20addressing.prefixes.delegations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of <a href="https://developers.cloudflare.com/api/resources/addressing#(resource)%20addressing.prefixes.delegations%20%3E%20(model)%20delegations%20%3E%20(schema)">Delegations</a> { id, cidr, created\_at, 3 more }

</summary>

id: optional string

Identifier of a Delegation.

maxLength32

<a href="#">Link to this property</a>

cidr: optional string

IP Prefix in Classless Inter-Domain Routing format.

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

delegated\_account\_id: optional string

Account identifier for the account to which prefix is being delegated.

maxLength32

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

parent\_prefix\_id: optional string

Identifier of an IP Prefix.

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20addressing.prefixes.delegations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, 2 more }

</summary>

count: optional number

Total number of results for the requested service.

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page of results.

<a href="#">Link to this property</a>

total\_count: optional number

Total results available without any search parameters.

<a href="#">Link to this property</a>

total\_pages: optional number

The number of total pages in the entire result set.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20addressing.prefixes.delegations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List Prefix Delegations

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/delegations \
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
      "id": "d933b1530bc56c9953cf8ce166da8004",
      "cidr": "192.0.2.0/24",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "delegated_account_id": "b1946ac92492d2347c6235b4d2611184",
      "modified_at": "2014-01-01T05:20:00.12345Z",
      "parent_prefix_id": "2af39739cc4e3b5910c918468bb89828"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
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
      "id": "d933b1530bc56c9953cf8ce166da8004",
      "cidr": "192.0.2.0/24",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "delegated_account_id": "b1946ac92492d2347c6235b4d2611184",
      "modified_at": "2014-01-01T05:20:00.12345Z",
      "parent_prefix_id": "2af39739cc4e3b5910c918468bb89828"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```