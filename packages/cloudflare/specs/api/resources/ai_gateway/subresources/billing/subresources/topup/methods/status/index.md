---
title: Check top-up status
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

# Check top-up status

POST/accounts/{account\_id}/ai-gateway/billing/topup/status

Get the payment processing status of a top-up by its invoice ID.

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

[Link to this property](#)%20ai_gateway.billing.topup%20%3E%20(method)%20status%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

payment\_intent\_id: string

Stripe invoice ID to check status for.

[Link to this property](#)%20ai_gateway.billing.topup%20%3E%20(method)%20status%20%3E%20(params)%200%20%3E%20(param)%20payment_intent_id%20%3E%20(schema)>)

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

[Link to this property](#)%20ai_gateway.billing.topup%20%3E%20(method)%20status%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message }

</summary>

code: number

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.billing.topup%20%3E%20(method)%20status%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {payment\_intent\_id, status }

</summary>

payment\_intent\_id: string

<a href="#">Link to this property</a>

<details>

<summary>

status: "completed"or "pending"

</summary>

One of the following:

"completed"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.billing.topup%20%3E%20(method)%20status%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

[Link to this property](#)%20ai_gateway.billing.topup%20%3E%20(method)%20status%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

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

[Link to this property](#)%20ai_gateway.billing.topup%20%3E%20(method)%20status%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Check top-up status

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/billing/topup/status \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "payment_intent_id": "in_1abc"
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
    "payment_intent_id": "payment_intent_id",
    "status": "completed"
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
    "payment_intent_id": "payment_intent_id",
    "status": "completed"
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