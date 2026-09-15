---
title: Get a list item
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Rules Lists](https://developers.cloudflare.com/api/resources/rules)

[Lists](https://developers.cloudflare.com/api/resources/rules/subresources/lists)

[Items](https://developers.cloudflare.com/api/resources/rules/subresources/lists/subresources/items)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get a list item

GET/accounts/{account\_id}/rules/lists/{list\_id}/items/{item\_id}

Fetches a list item in the list.

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

`Account Filter Lists Edit``Account Filter Lists Read`

##### P ath ParametersExpand Collapse

account\_id: string

The Account ID for this resource.

maxLength32

minLength32

[Link to this property](#)%20rules.lists.items%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

list\_id: string

The unique ID of the list.

maxLength32

minLength32

[Link to this property](#)%20rules.lists.items%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20list_id%20%3E%20(schema)>)

item\_id: string

Defines the unique ID of the item in the List.

maxLength32

minLength32

[Link to this property](#)%20rules.lists.items%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20item_id%20%3E%20(schema)>)

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

[Link to this property](#)%20rules.lists.items%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20rules.lists.items%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {id, created\_on, ip, 2 more } or object {id, created\_on, hostname, 2 more } or object {id, created\_on, modified\_on, 2 more } or object {id, asn, created\_on, 2 more }

</summary>

One of the following:

<details>

<summary>

ListsListItemIPFull object {id, created\_on, ip, 2 more }

</summary>

id: string

Defines the unique ID of the item in the List.

maxLength32

minLength32

<a href="#">Link to this property</a>

created\_on: string

The RFC 3339 timestamp of when the list was created.

<a href="#">Link to this property</a>

ip: string

An IPv4 address, an IPv4 CIDR, an IPv6 address, or an IPv6 CIDR.

<a href="#">Link to this property</a>

modified\_on: string

The RFC 3339 timestamp of when the list was last modified.

<a href="#">Link to this property</a>

comment: optional string

Defines an informative summary of the list item.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ListsListItemHostnameFull object {id, created\_on, hostname, 2 more }

</summary>

id: string

Defines the unique ID of the item in the List.

maxLength32

minLength32

<a href="#">Link to this property</a>

created\_on: string

The RFC 3339 timestamp of when the list was created.

<a href="#">Link to this property</a>

<details>

<summary>

hostname: <a href="https://developers.cloudflare.com/api/resources/rules#(resource)%20rules.lists%20%3E%20(model)%20hostname%20%3E%20(schema)">Hostname</a> { url\_hostname, exclude\_exact\_hostname }

Hostnames support ASCII(7) letters from a to z, the digits from 0 to 9, wildcards (\*), and the hyphen (-).

</summary>

url\_hostname: string

<a href="#">Link to this property</a>

exclude\_exact\_hostname: optional boolean

Only applies to wildcard hostnames (e.g., \*.example.com). When true (default), the rule blocks only subdomains. When false, the rule blocks both the root domain and subdomains.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

The RFC 3339 timestamp of when the list was last modified.

<a href="#">Link to this property</a>

comment: optional string

Defines an informative summary of the list item.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ListsListItemRedirectFull object {id, created\_on, modified\_on, 2 more }

</summary>

id: string

Defines the unique ID of the item in the List.

maxLength32

minLength32

<a href="#">Link to this property</a>

created\_on: string

The RFC 3339 timestamp of when the list was created.

<a href="#">Link to this property</a>

modified\_on: string

The RFC 3339 timestamp of when the list was last modified.

<a href="#">Link to this property</a>

<details>

<summary>

redirect: <a href="https://developers.cloudflare.com/api/resources/rules#(resource)%20rules.lists%20%3E%20(model)%20redirect%20%3E%20(schema)">Redirect</a> { source\_url, target\_url, include\_subdomains, 4 more }

The definition of the redirect.

</summary>

source\_url: string

<a href="#">Link to this property</a>

target\_url: string

<a href="#">Link to this property</a>

include\_subdomains: optional boolean

<a href="#">Link to this property</a>

preserve\_path\_suffix: optional boolean

<a href="#">Link to this property</a>

preserve\_query\_string: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

status\_code: optional 301or 302or 307or 308

</summary>

One of the following:

301

<a href="#">Link to this property</a>

302

<a href="#">Link to this property</a>

307

<a href="#">Link to this property</a>

308

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

subpath\_matching: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

comment: optional string

Defines an informative summary of the list item.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ListsListItemASNFull object {id, asn, created\_on, 2 more }

</summary>

id: string

Defines the unique ID of the item in the List.

maxLength32

minLength32

<a href="#">Link to this property</a>

asn: number

Defines a non-negative 32 bit integer.

<a href="#">Link to this property</a>

created\_on: string

The RFC 3339 timestamp of when the list was created.

<a href="#">Link to this property</a>

modified\_on: string

The RFC 3339 timestamp of when the list was last modified.

<a href="#">Link to this property</a>

comment: optional string

Defines an informative summary of the list item.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rules.lists.items%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Defines whether the API call was successful.

[Link to this property](#)%20rules.lists.items%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get a list item

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rules/lists/$LIST_ID/items/$ITEM_ID \
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
    "id": "34b12448945f11eaa1b71c4d701ab86e",
    "created_on": "2020-01-01T08:00:00Z",
    "ip": "10.0.0.1",
    "modified_on": "2020-01-10T14:00:00Z",
    "comment": "Private IP address"
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
    "id": "34b12448945f11eaa1b71c4d701ab86e",
    "created_on": "2020-01-01T08:00:00Z",
    "ip": "10.0.0.1",
    "modified_on": "2020-01-10T14:00:00Z",
    "comment": "Private IP address"
  },
  "success": true
}
```