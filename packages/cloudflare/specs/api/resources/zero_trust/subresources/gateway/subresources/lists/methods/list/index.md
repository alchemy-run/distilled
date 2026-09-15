---
title: List Zero Trust lists
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Gateway](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway)

[Lists](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/lists)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Zero Trust lists

GET/accounts/{account\_id}/gateway/lists

Fetch all Zero Trust lists for an account.

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

[Link to this property](#)%20zero_trust.gateway.lists%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

<details>

<summary>

direction: optional "asc"or "desc"

Sort direction. Applies to the field named in <code>order_by</code>; when <code>order_by</code> is omitted it applies to the default <code>created_at</code> ordering. When <code>direction</code> is omitted the default is field-specific: explicitly choosing <code>created_at</code> or <code>updated_at</code> defaults to descending (newest first); <code>name</code> and <code>item_count</code> default to ascending; and the default <code>created_at</code> ordering used when <code>order_by</code> is omitted is ascending (for backwards compatibility).

- <code>asc</code> — ascending.
- <code>desc</code> — descending.

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.lists%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

filter: optional array of unknown

Filter the returned lists by one or more `field:value` pairs. Repeat the parameter to apply multiple filters; they are combined with logical AND (a list must satisfy every filter to be returned).

Supported fields and their matching behaviour:

- `name` — case-insensitive substring match on the list name.
- `id` — substring match on the list ID (UUID), with or without dashes.
- `type` — exact match on the list type. Supersedes the legacy `type` query parameter when both are supplied. Must be one of the valid type values.
- `item_count` — exact integer match on the number of items in the list.

Each entry must match one of the per-field patterns below: the field must be one of `name`, `id`, `type`, or `item_count`; `name`/`id` accept any value, `type` is restricted to the valid list type values, and `item_count` must be a non-negative integer.

[Link to this property](#)%20zero_trust.gateway.lists%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20filter%20%3E%20(schema)>)

<details>

<summary>

order\_by: optional "name"or "created\_at"or "updated\_at"or "item\_count"

Field to sort the returned lists by. When omitted, results are ordered by <code>created_at</code> in ascending order (i.e. creation order) for backwards compatibility. Supported values:

- <code>name</code> — sort alphabetically by list name.
- <code>created_at</code> — sort by creation time; defaults to descending unless <code>direction</code> is set.
- <code>updated_at</code> — sort by last-modified time; defaults to descending unless <code>direction</code> is set.
- <code>item_count</code> — sort by number of items in the list.

</summary>

One of the following:

"name"

<a href="#">Link to this property</a>

"created\_at"

<a href="#">Link to this property</a>

"updated\_at"

<a href="#">Link to this property</a>

"item\_count"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.lists%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order_by%20%3E%20(schema)>)

search: optional string

Case-insensitive substring match on the list name or description. When combined with `filter`, both must match (logical AND).

[Link to this property](#)%20zero_trust.gateway.lists%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20search%20%3E%20(schema)>)

<details>

<summary>

type: optional "SERIAL"or "URL"or "DOMAIN"or 6 more

Specify the list type.

</summary>

One of the following:

"SERIAL"

<a href="#">Link to this property</a>

"URL"

<a href="#">Link to this property</a>

"DOMAIN"

<a href="#">Link to this property</a>

"EMAIL"

<a href="#">Link to this property</a>

"IP"

<a href="#">Link to this property</a>

"CATEGORY"

<a href="#">Link to this property</a>

"LOCATION"

<a href="#">Link to this property</a>

"DEVICE"

<a href="#">Link to this property</a>

"AAGUID"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.lists%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20type%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.gateway.lists%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.gateway.lists%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Indicate whether the API call was successful.

[Link to this property](#)%20zero_trust.gateway.lists%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.lists%20%3E%20(model)%20gateway_list%20%3E%20(schema)">GatewayList</a> { id, count, created\_at, 5 more }

</summary>

id: optional string

Identify the API resource with a UUID.

maxLength36

<a href="#">Link to this property</a>

count: optional number

Indicate the number of items in the list.

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

Provide the list description.

<a href="#">Link to this property</a>

<details>

<summary>

items: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.lists%20%3E%20(model)%20gateway_item%20%3E%20(schema)">GatewayItem</a> { created\_at, description, value }

Provide the list items.

</summary>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

Provide the list item description (optional).

minimum0

<a href="#">Link to this property</a>

value: optional string

Specify the item value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Specify the list name.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "SERIAL"or "URL"or "DOMAIN"or 6 more

Specify the list type.

</summary>

One of the following:

"SERIAL"

<a href="#">Link to this property</a>

"URL"

<a href="#">Link to this property</a>

"DOMAIN"

<a href="#">Link to this property</a>

"EMAIL"

<a href="#">Link to this property</a>

"IP"

<a href="#">Link to this property</a>

"CATEGORY"

<a href="#">Link to this property</a>

"LOCATION"

<a href="#">Link to this property</a>

"DEVICE"

<a href="#">Link to this property</a>

"AAGUID"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.lists%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

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

[Link to this property](#)%20zero_trust.gateway.lists%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List Zero Trust lists

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/lists \
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
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "count": 20,
      "created_at": "2014-01-01T05:20:00.12345Z",
      "description": "The serial numbers for administrators",
      "items": [
        {
          "created_at": "2014-01-01T05:20:00.12345Z",
          "description": "Austin office IP",
          "value": "8GE8721REF"
        }
      ],
      "name": "Admin Serial Numbers",
      "type": "SERIAL",
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
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "count": 20,
      "created_at": "2014-01-01T05:20:00.12345Z",
      "description": "The serial numbers for administrators",
      "items": [
        {
          "created_at": "2014-01-01T05:20:00.12345Z",
          "description": "Austin office IP",
          "value": "8GE8721REF"
        }
      ],
      "name": "Admin Serial Numbers",
      "type": "SERIAL",
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