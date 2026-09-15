---
title: Billing
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI Gateway](https://developers.cloudflare.com/api/resources/ai_gateway)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Billing

##### [Get credit balance](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/billing/methods/credit_balance)

GET/accounts/{account\_id}/ai-gateway/billing/credit-balance

##### [Get usage history](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/billing/methods/usage_history)

GET/accounts/{account\_id}/ai-gateway/billing/usage-history

##### [Get invoice history](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/billing/methods/invoice_history)

GET/accounts/{account\_id}/ai-gateway/billing/invoice-history

##### [Get invoice preview](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/billing/methods/invoice_preview)

GET/accounts/{account\_id}/ai-gateway/billing/invoice-preview

##### ModelsExpand Collapse

<details>

<summary>

BillingCreditBalanceResponse object {balance, has\_default\_payment\_method, payment\_method, 2 more }

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

[Link to this property](#)%20ai_gateway.billing%20%3E%20(model)%20billing_credit_balance_response%20%3E%20(schema)>)

<details>

<summary>

BillingUsageHistoryResponse object {history }

</summary>

<details>

<summary>

history: array of object {id, aggregated\_value, end\_time, start\_time }

</summary>

id: string

<a href="#">Link to this property</a>

aggregated\_value: number

<a href="#">Link to this property</a>

end\_time: number

<a href="#">Link to this property</a>

start\_time: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.billing%20%3E%20(model)%20billing_usage_history_response%20%3E%20(schema)>)

<details>

<summary>

BillingInvoiceHistoryResponse object {invoices, pagination }

</summary>

<details>

<summary>

invoices: array of object {amount\_due, amount\_paid, amount\_remaining, 11 more }

</summary>

amount\_due: number

<a href="#">Link to this property</a>

amount\_paid: number

<a href="#">Link to this property</a>

amount\_remaining: number

<a href="#">Link to this property</a>

currency: string

<a href="#">Link to this property</a>

id: optional string

<a href="#">Link to this property</a>

attempt\_count: optional number

<a href="#">Link to this property</a>

attempted: optional boolean

<a href="#">Link to this property</a>

auto\_advance: optional boolean

<a href="#">Link to this property</a>

created: optional number

<a href="#">Link to this property</a>

created\_by: optional string

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

invoice\_origin: optional string

<a href="#">Link to this property</a>

invoice\_pdf: optional string

<a href="#">Link to this property</a>

status: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

pagination: object {has\_more, page, per\_page, total\_count }

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

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.billing%20%3E%20(model)%20billing_invoice_history_response%20%3E%20(schema)>)

<details>

<summary>

BillingInvoicePreviewResponse object {id, amount\_due, amount\_paid, 6 more }

</summary>

id: string

<a href="#">Link to this property</a>

amount\_due: number

<a href="#">Link to this property</a>

amount\_paid: number

<a href="#">Link to this property</a>

amount\_remaining: number

<a href="#">Link to this property</a>

currency: string

<a href="#">Link to this property</a>

<details>

<summary>

invoice\_lines: array of object {amount, currency, description, 4 more }

</summary>

amount: number

<a href="#">Link to this property</a>

currency: string

<a href="#">Link to this property</a>

description: string

<a href="#">Link to this property</a>

<details>

<summary>

period: object {end, start }

</summary>

end: number

<a href="#">Link to this property</a>

start: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

pricing: object {unit\_amount\_decimal }

</summary>

unit\_amount\_decimal: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

quantity: number

<a href="#">Link to this property</a>

<details>

<summary>

pretax\_credit\_amounts: optional array of object {amount, type, credit\_balance\_transaction, discount }

</summary>

amount: number

<a href="#">Link to this property</a>

type: string

<a href="#">Link to this property</a>

credit\_balance\_transaction: optional string

<a href="#">Link to this property</a>

discount: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

period\_end: number

<a href="#">Link to this property</a>

period\_start: number

<a href="#">Link to this property</a>

<details>

<summary>

status: "draft"or "open"or "paid"or 2 more

</summary>

One of the following:

"draft"

<a href="#">Link to this property</a>

"open"

<a href="#">Link to this property</a>

"paid"

<a href="#">Link to this property</a>

"uncollectible"

<a href="#">Link to this property</a>

"void"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.billing%20%3E%20(model)%20billing_invoice_preview_response%20%3E%20(schema)>)

#### BillingTopup

##### [Create a top-up](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/billing/subresources/topup/methods/create)

POST/accounts/{account\_id}/ai-gateway/billing/topup

##### [Check top-up status](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/billing/subresources/topup/methods/status)

POST/accounts/{account\_id}/ai-gateway/billing/topup/status

##### ModelsExpand Collapse

<details>

<summary>

TopupCreateResponse object {client\_secret, onboarding, payment\_intent\_id, 2 more }

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

[Link to this property](#)%20ai_gateway.billing.topup%20%3E%20(model)%20topup_create_response%20%3E%20(schema)>)

<details>

<summary>

TopupStatusResponse object {payment\_intent\_id, status }

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

[Link to this property](#)%20ai_gateway.billing.topup%20%3E%20(model)%20topup_status_response%20%3E%20(schema)>)

#### BillingTopupConfig

##### [Get auto top-up configuration](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/billing/subresources/topup/subresources/config/methods/get)

GET/accounts/{account\_id}/ai-gateway/billing/topup/config

##### [Set auto top-up configuration](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/billing/subresources/topup/subresources/config/methods/create)

POST/accounts/{account\_id}/ai-gateway/billing/topup/config

##### [Delete auto top-up configuration](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/billing/subresources/topup/subresources/config/methods/delete)

DELETE/accounts/{account\_id}/ai-gateway/billing/topup/config

##### ModelsExpand Collapse

<details>

<summary>

ConfigGetResponse object {amount, threshold, disabledReason, 2 more }

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

[Link to this property](#)%20ai_gateway.billing.topup.config%20%3E%20(model)%20config_get_response%20%3E%20(schema)>)

<details>

<summary>

ConfigCreateResponse object {amount, threshold }

</summary>

amount: number

<a href="#">Link to this property</a>

threshold: number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.billing.topup.config%20%3E%20(model)%20config_create_response%20%3E%20(schema)>)

ConfigDeleteResponse = unknown

[Link to this property](#)%20ai_gateway.billing.topup.config%20%3E%20(model)%20config_delete_response%20%3E%20(schema)>)

#### BillingSpending Limit

##### [Get spending limit](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/billing/subresources/spending_limit/methods/get)

GET/accounts/{account\_id}/ai-gateway/billing/spending-limit

##### [Set spending limit (deprecated)](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/billing/subresources/spending_limit/methods/create)

Deprecated

POST/accounts/{account\_id}/ai-gateway/billing/spending-limit

##### [Delete spending limit](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/billing/subresources/spending_limit/methods/delete)

DELETE/accounts/{account\_id}/ai-gateway/billing/spending-limit

##### ModelsExpand Collapse

<details>

<summary>

SpendingLimitGetResponse object {config, enabled }

</summary>

<details>

<summary>

config: object {amount, duration, strategy }

</summary>

amount: number

<a href="#">Link to this property</a>

duration: string

<a href="#">Link to this property</a>

strategy: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_gateway.billing.spending_limit%20%3E%20(model)%20spending_limit_get_response%20%3E%20(schema)>)

SpendingLimitCreateResponse = unknown

[Link to this property](#)%20ai_gateway.billing.spending_limit%20%3E%20(model)%20spending_limit_create_response%20%3E%20(schema)>)

SpendingLimitDeleteResponse = unknown

[Link to this property](#)%20ai_gateway.billing.spending_limit%20%3E%20(model)%20spending_limit_delete_response%20%3E%20(schema)>)