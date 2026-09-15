---
title: Get Account Credits
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Billing](https://developers.cloudflare.com/api/resources/billing)

[Credits](https://developers.cloudflare.com/api/resources/billing/subresources/credits)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Account Credits

GET/accounts/{account\_id}/billing/credits

Gets the credit balance and eligibility for an account.

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

[Link to this property](#)%20billing.credits%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

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

[Link to this property](#)%20billing.credits%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20billing.credits%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {confirmed\_balance\_cents, currency, days\_remaining, 7 more }

</summary>

confirmed\_balance\_cents: optional number

The confirmed credit balance in cents.

formatint64

<a href="#">Link to this property</a>

currency: optional string

Currency of the credit balance.

<a href="#">Link to this property</a>

days\_remaining: optional number

Days remaining until the credits expire.

formatint64

<a href="#">Link to this property</a>

eligible: optional boolean

Whether the account is eligible to receive credits.

<a href="#">Link to this property</a>

has\_record: optional boolean

Whether a credit record exists for the account.

<a href="#">Link to this property</a>

original\_amount\_cents: optional number

The original credit amount in cents.

formatint64

<a href="#">Link to this property</a>

percent\_consumed: optional number

Percentage of the original credit amount consumed.

formatdouble

<a href="#">Link to this property</a>

projected\_depletion\_date: optional string

Projected date when the credits will be depleted.

formatdate-time

<a href="#">Link to this property</a>

valid\_from: optional string

When the credits become valid.

formatdate-time

<a href="#">Link to this property</a>

valid\_to: optional string

When the credits expire.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20billing.credits%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20billing.credits%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get Account Credits

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/billing/credits \
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
    "confirmed_balance_cents": 5000,
    "currency": "USD",
    "days_remaining": 180,
    "eligible": true,
    "has_record": true,
    "original_amount_cents": 10000,
    "percent_consumed": 50,
    "projected_depletion_date": "2024-07-01T00:00:00Z",
    "valid_from": "2024-01-01T00:00:00Z",
    "valid_to": "2025-01-01T00:00:00Z"
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
    "confirmed_balance_cents": 5000,
    "currency": "USD",
    "days_remaining": 180,
    "eligible": true,
    "has_record": true,
    "original_amount_cents": 10000,
    "percent_consumed": 50,
    "projected_depletion_date": "2024-07-01T00:00:00Z",
    "valid_from": "2024-01-01T00:00:00Z",
    "valid_to": "2025-01-01T00:00:00Z"
  },
  "success": true
}
```