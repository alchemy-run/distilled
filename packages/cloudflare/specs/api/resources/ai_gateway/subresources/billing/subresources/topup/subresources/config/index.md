---
title: Config
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

# Config

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