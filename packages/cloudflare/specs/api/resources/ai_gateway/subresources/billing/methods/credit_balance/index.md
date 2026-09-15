---
title: Get credit balance
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI Gateway](https://developers.cloudflare.com/api/resources/ai_gateway)

[Billing](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/billing)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get credit balance

GET/accounts/{account\_id}/ai-gateway/billing/credit-balance

Retrieve the current credit balance, payment method info, and top-up configuration.

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

`AI Gateway Write``AI Gateway Read`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20ai_gateway.billing%20%3E%20(method)%20credit_balance%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message }

</summary>

code: number

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.billing%20%3E%20(method)%20credit_balance%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message }

</summary>

code: number

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.billing%20%3E%20(method)%20credit_balance%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {balance, has\_default\_payment\_method, payment\_method, 2 more }

</summary>

balance: number

<a href="#">Link to this property</a>

has\_default\_payment\_method: boolean

<a href="#">Link to this property</a>

<details>

<summary>

payment\_method: object {brand, last4 }

</summary>

brand: optional string

<a href="#">Link to this property</a>

last4: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

topup\_config: object {amount, threshold, disabledReason, 2 more }

</summary>

amount: number

<a href="#">Link to this property</a>

threshold: number

<a href="#">Link to this property</a>

disabledReason: optional string

<a href="#">Link to this property</a>

error: optional string

<a href="#">Link to this property</a>

lastFailedAt: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

first\_topup\_success: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.billing%20%3E%20(method)%20credit_balance%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

[Link to this property](#)%20ai_gateway.billing%20%3E%20(method)%20credit_balance%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result\_info: optional object {has\_more, page, per\_page, total\_count }

</summary>

has\_more: boolean

<a href="#">Link to this property</a>

page: number

<a href="#">Link to this property</a>

per\_page: number

<a href="#">Link to this property</a>

total\_count: number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.billing%20%3E%20(method)%20credit_balance%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Get credit balance

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/billing/credit-balance \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "balance": 0,
    "has_default_payment_method": true,
    "payment_method": {
      "brand": "brand",
      "last4": "last4"
    },
    "topup_config": {
      "amount": 0,
      "threshold": 0,
      "disabledReason": "disabledReason",
      "error": "error",
      "lastFailedAt": 0
    },
    "first_topup_success": true
  },
  "success": true,
  "result_info": {
    "has_more": true,
    "page": 0,
    "per_page": 0,
    "total_count": 0
  }
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "balance": 0,
    "has_default_payment_method": true,
    "payment_method": {
      "brand": "brand",
      "last4": "last4"
    },
    "topup_config": {
      "amount": 0,
      "threshold": 0,
      "disabledReason": "disabledReason",
      "error": "error",
      "lastFailedAt": 0
    },
    "first_topup_success": true
  },
  "success": true,
  "result_info": {
    "has_more": true,
    "page": 0,
    "per_page": 0,
    "total_count": 0
  }
}
```