---
title: Billing History Details
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[User](https://developers.cloudflare.com/api/resources/user)

[Billing](https://developers.cloudflare.com/api/resources/user/subresources/billing)

[History](https://developers.cloudflare.com/api/resources/user/subresources/billing/subresources/history)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Billing History Details

Deprecated

GET/user/billing/history

Accesses your billing history object.

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

`Billing Write``Billing Read`

##### Q uery ParametersExpand Collapse

action: optional string

The billing item action.

maxLength30

[Link to this property](#)%20user.billing.history%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20action%20%3E%20(schema)>)

occurred\_at: optional string

When the billing item was created.

formatdate-time

[Link to this property](#)%20user.billing.history%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20occurred_at%20%3E%20(schema)>)

<details>

<summary>

order: optional "type"or "occurred\_at"or "action"

Field to order billing history by.

</summary>

One of the following:

"type"

<a href="#">Link to this property</a>

"occurred\_at"

<a href="#">Link to this property</a>

"action"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.billing.history%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order%20%3E%20(schema)>)

page: optional number

Page number of paginated results.

minimum1

[Link to this property](#)%20user.billing.history%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Number of items per page.

maximum50

minimum5

[Link to this property](#)%20user.billing.history%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

type: optional string

The billing item type.

maxLength30

[Link to this property](#)%20user.billing.history%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20type%20%3E%20(schema)>)

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

[Link to this property](#)%20user.billing.history%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20user.billing.history%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of <a href="https://developers.cloudflare.com/api/resources/user#(resource)%20user.billing.history%20%3E%20(model)%20billing_history%20%3E%20(schema)">BillingHistory</a> { id, action, amount, 5 more }

</summary>

id: string

Billing item identifier tag.

maxLength32

<a href="#">Link to this property</a>

action: string

The billing item action.

maxLength30

<a href="#">Link to this property</a>

amount: number

The amount associated with this billing item.

<a href="#">Link to this property</a>

currency: string

The monetary unit in which pricing information is displayed.

<a href="#">Link to this property</a>

description: string

The billing item description.

maxLength255

<a href="#">Link to this property</a>

occurred\_at: string

When the billing item was created.

formatdate-time

<a href="#">Link to this property</a>

type: string

The billing item type.

maxLength30

<a href="#">Link to this property</a>

<details>

<summary>

zone: object {name }

</summary>

name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.billing.history%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20user.billing.history%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, total\_count }

</summary>

count: optional number

Total number of results for the requested service

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page of results

<a href="#">Link to this property</a>

total\_count: optional number

Total results available without any search parameters

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.billing.history%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Billing History Details

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/user/billing/history \
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
      "id": "b69a9f3492637782896352daae219e7d",
      "action": "subscription",
      "amount": 20.99,
      "currency": "USD",
      "description": "The billing item description",
      "occurred_at": "2014-03-01T12:21:59.3456Z",
      "type": "charge",
      "zone": {
        "name": "name"
      }
    }
  ],
  "success": true,
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
  "result": [
    {
      "id": "b69a9f3492637782896352daae219e7d",
      "action": "subscription",
      "amount": 20.99,
      "currency": "USD",
      "description": "The billing item description",
      "occurred_at": "2014-03-01T12:21:59.3456Z",
      "type": "charge",
      "zone": {
        "name": "name"
      }
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```