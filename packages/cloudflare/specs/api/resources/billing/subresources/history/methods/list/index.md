---
title: Get Account Billing History
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Billing](https://developers.cloudflare.com/api/resources/billing)

[History](https://developers.cloudflare.com/api/resources/billing/subresources/history)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Account Billing History

GET/accounts/{account\_id}/billing/history

Gets the billing history for an account.

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

##### P ath ParametersExpand Collapse

account\_id: string

Identifier

maxLength32

[Link to this property](#)%20billing.history%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

page: optional number

Page number of paginated results.

minimum1

[Link to this property](#)%20billing.history%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Number of items per page.

minimum1

[Link to this property](#)%20billing.history%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

status: optional string

Filter billing history by status.

[Link to this property](#)%20billing.history%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20status%20%3E%20(schema)>)

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

[Link to this property](#)%20billing.history%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20billing.history%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {id, action, amount, 12 more }

</summary>

id: optional string

Billing history item identifier.

<a href="#">Link to this property</a>

action: optional string

The billing item action.

<a href="#">Link to this property</a>

amount: optional number

The amount associated with this billing item.

<a href="#">Link to this property</a>

amount\_to\_pay: optional number

The amount remaining to pay.

<a href="#">Link to this property</a>

currency: optional string

The currency of the billing item.

<a href="#">Link to this property</a>

description: optional string

The billing item description.

<a href="#">Link to this property</a>

external\_invoice\_id: optional string

The external invoice identifier.

<a href="#">Link to this property</a>

hosted\_invoice\_url: optional string

URL to the hosted invoice.

<a href="#">Link to this property</a>

invoice\_id: optional string

The associated invoice identifier.

<a href="#">Link to this property</a>

occurred\_at: optional string

When the billing event occurred.

formatdate-time

<a href="#">Link to this property</a>

receipt\_id: optional string

The associated receipt identifier.

<a href="#">Link to this property</a>

source: optional string

The source of the billing item.

<a href="#">Link to this property</a>

source\_invoice\_id: optional string

The source invoice identifier.

<a href="#">Link to this property</a>

status: optional string

The status of the billing item.

<a href="#">Link to this property</a>

type: optional string

The billing item type.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20billing.history%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20billing.history%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

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

[Link to this property](#)%20billing.history%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Get Account Billing History

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/billing/history \
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
      "amount_to_pay": 0,
      "currency": "USD",
      "description": "The billing item description",
      "external_invoice_id": "external_invoice_id",
      "hosted_invoice_url": "hosted_invoice_url",
      "invoice_id": "invoice_id",
      "occurred_at": "2014-03-01T12:21:59.3456Z",
      "receipt_id": "receipt_id",
      "source": "source",
      "source_invoice_id": "source_invoice_id",
      "status": "status",
      "type": "charge"
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
      "amount_to_pay": 0,
      "currency": "USD",
      "description": "The billing item description",
      "external_invoice_id": "external_invoice_id",
      "hosted_invoice_url": "hosted_invoice_url",
      "invoice_id": "invoice_id",
      "occurred_at": "2014-03-01T12:21:59.3456Z",
      "receipt_id": "receipt_id",
      "source": "source",
      "source_invoice_id": "source_invoice_id",
      "status": "status",
      "type": "charge"
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