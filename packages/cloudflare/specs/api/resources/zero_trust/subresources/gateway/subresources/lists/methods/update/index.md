---
title: Update Zero Trust list
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

# Update Zero Trust list

PUT/accounts/{account\_id}/gateway/lists/{list\_id}

Updates a configured Zero Trust list. Skips updating list items if not included in the payload. A non empty list items will overwrite the existing list.

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

[Link to this property](#)%20zero_trust.gateway.lists%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

list\_id: string

Identify the API resource with a UUID.

maxLength36

[Link to this property](#)%20zero_trust.gateway.lists%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20list_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

name: string

Specify the list name.

[Link to this property](#)%20zero_trust.gateway.lists%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

description: optional string

Provide the list description.

[Link to this property](#)%20zero_trust.gateway.lists%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20description%20%3E%20(schema)>)

<details>

<summary>

items: optional array of object {description, value }

Add items to the list.

</summary>

description: optional string

Provide the list item description (optional).

minimum0

<a href="#">Link to this property</a>

value: optional string

Specify the item value.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.lists%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20items%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.gateway.lists%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.gateway.lists%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Indicate whether the API call was successful.

[Link to this property](#)%20zero_trust.gateway.lists%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.gateway.lists%20%3E%20(model)%20gateway_list%20%3E%20(schema)">GatewayList</a> { id, count, created\_at, 5 more }

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

[Link to this property](#)%20zero_trust.gateway.lists%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Update Zero Trust list

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/lists/$LIST_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "Admin Serial Numbers",
          "description": "The serial numbers for administrators"
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
}
```