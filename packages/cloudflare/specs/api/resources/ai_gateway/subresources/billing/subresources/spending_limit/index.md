---
title: Spending Limit
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI Gateway](https://developers.cloudflare.com/api/resources/ai_gateway)

[Billing](https://developers.cloudflare.com/api/resources/ai_gateway/subresources/billing)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Spending Limit

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