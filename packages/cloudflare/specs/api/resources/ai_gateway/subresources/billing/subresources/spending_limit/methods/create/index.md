---
title: Set spending limit (deprecated)
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI Gateway](https://developers.cloudflare.com/api/resources/ai_gateway)

[Billing](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/billing)

[Spending Limit](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/billing/subresources/spending_limit)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Set spending limit (deprecated)

Deprecated

POST/accounts/{account\_id}/ai-gateway/billing/spending-limit

Deprecated: spending limits can no longer be created, enabled, or modified and this endpoint always responds 403. Use the new AI Gateway spend limits instead: https://developers.cloudflare.com/ai-gateway/features/spend-limits/. Existing limits can be removed via DELETE /spending-limit.

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

[Link to this property](#)%20ai_gateway.billing.spending_limit%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

amount: number

Spending limit amount in cents (min 100).

minimum100

[Link to this property](#)%20ai_gateway.billing.spending_limit%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20amount%20%3E%20(schema)>)

<details>

<summary>

duration: "daily"or "weekly"or "monthly"

Spending limit duration.

</summary>

One of the following:

"daily"

<a href="#">Link to this property</a>

"weekly"

<a href="#">Link to this property</a>

"monthly"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.billing.spending_limit%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20duration%20%3E%20(schema)>)

<details>

<summary>

strategy: "fixed"or "sliding"

Spending limit strategy.

</summary>

One of the following:

"fixed"

<a href="#">Link to this property</a>

"sliding"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.billing.spending_limit%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20strategy%20%3E%20(schema)>)

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

[Link to this property](#)%20ai_gateway.billing.spending_limit%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message }

</summary>

code: number

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.billing.spending_limit%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

result: unknown

[Link to this property](#)%20ai_gateway.billing.spending_limit%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

[Link to this property](#)%20ai_gateway.billing.spending_limit%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

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

[Link to this property](#)%20ai_gateway.billing.spending_limit%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Set spending limit (deprecated)

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/billing/spending-limit \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "amount": 10000,
          "duration": "monthly",
          "strategy": "fixed"
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
  "result": {},
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
  "result": {},
  "success": true,
  "result_info": {
    "has_more": true,
    "page": 0,
    "per_page": 0,
    "total_count": 0
  }
}
```