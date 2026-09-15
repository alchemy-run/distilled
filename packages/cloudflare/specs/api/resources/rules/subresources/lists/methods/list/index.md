---
title: Get lists
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Rules Lists](https://developers.cloudflare.com/api/resources/rules)

[Lists](https://developers.cloudflare.com/api/resources/rules/subresources/lists)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get lists

GET/accounts/{account\_id}/rules/lists

Fetches all lists in the account.

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

`Account Filter Lists Read``Account Filter Lists Edit`

##### P ath ParametersExpand Collapse

account\_id: string

The Account ID for this resource.

maxLength32

minLength32

[Link to this property](#)%20rules.lists%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

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

[Link to this property](#)%20rules.lists%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20rules.lists%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of <a href="https://developers.cloudflare.com/api/resources/rules#(resource)%20rules.lists%20%3E%20(model)%20lists_list%20%3E%20(schema)">ListsList</a> { id, created\_on, kind, 5 more }

</summary>

id: string

The unique ID of the list.

maxLength32

minLength32

<a href="#">Link to this property</a>

created\_on: string

The RFC 3339 timestamp of when the list was created.

<a href="#">Link to this property</a>

<details>

<summary>

kind: "ip"or "redirect"or "hostname"or "asn"

The type of the list. Each type supports specific list items (IP addresses, ASNs, hostnames or redirects).

</summary>

One of the following:

"ip"

<a href="#">Link to this property</a>

"redirect"

<a href="#">Link to this property</a>

"hostname"

<a href="#">Link to this property</a>

"asn"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

The RFC 3339 timestamp of when the list was last modified.

<a href="#">Link to this property</a>

name: string

An informative name for the list. Use this name in filter and rule expressions.

maxLength50

<a href="#">Link to this property</a>

num\_items: number

The number of items in the list.

<a href="#">Link to this property</a>

num\_referencing\_filters: number

The number of <a href="https://developers.cloudflare.com/api/resources/filters/">filters</a> referencing the list.

<a href="#">Link to this property</a>

description: optional string

An informative summary of the list.

maxLength500

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rules.lists%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Defines whether the API call was successful.

[Link to this property](#)%20rules.lists%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get lists

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rules/lists \
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
      "id": "2c0fc9fa937b11eaa1b71c4d701ab86e",
      "created_on": "2020-01-01T08:00:00Z",
      "kind": "ip",
      "modified_on": "2020-01-10T14:00:00Z",
      "name": "list1",
      "num_items": 10,
      "num_referencing_filters": 2,
      "description": "This is a note"
    }
  ],
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
  "result": [
    {
      "id": "2c0fc9fa937b11eaa1b71c4d701ab86e",
      "created_on": "2020-01-01T08:00:00Z",
      "kind": "ip",
      "modified_on": "2020-01-10T14:00:00Z",
      "name": "list1",
      "num_items": 10,
      "num_referencing_filters": 2,
      "description": "This is a note"
    }
  ],
  "success": true
}
```