---
title: Create a top-up
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI Gateway](https://developers.cloudflare.com/api/resources/ai_gateway)

[Billing](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/billing)

[Topup](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/billing/subresources/topup)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create a top-up

POST/accounts/{account\_id}/ai-gateway/billing/topup

Create a credit top-up for the given account, charged to the account’s default payment method.

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

`AI Gateway Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20ai_gateway.billing.topup%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

amount: number

Top-up amount in cents (min 1000).

minimum1000

[Link to this property](#)%20ai_gateway.billing.topup%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20amount%20%3E%20(schema)>)

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

[Link to this property](#)%20ai_gateway.billing.topup%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message }

</summary>

code: number

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.billing.topup%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {client\_secret, onboarding, payment\_intent\_id, 2 more }

</summary>

client\_secret: string

Stripe PaymentIntent client secret.

<a href="#">Link to this property</a>

onboarding: boolean

Whether the user was already onboarded.

<a href="#">Link to this property</a>

payment\_intent\_id: string

Stripe invoice ID.

<a href="#">Link to this property</a>

brand: optional string

Card brand (visa, mastercard, etc.).

<a href="#">Link to this property</a>

last4: optional string

Last 4 digits of card.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.billing.topup%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

[Link to this property](#)%20ai_gateway.billing.topup%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

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

[Link to this property](#)%20ai_gateway.billing.topup%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Create a top-up

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/billing/topup \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "amount": 5000
        }'
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
    "client_secret": "client_secret",
    "onboarding": true,
    "payment_intent_id": "payment_intent_id",
    "brand": "brand",
    "last4": "last4"
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
    "client_secret": "client_secret",
    "onboarding": true,
    "payment_intent_id": "payment_intent_id",
    "brand": "brand",
    "last4": "last4"
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