---
title: Rate Plans
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Billing](https://developers.cloudflare.com/api/resources/billing)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Rate Plans

##### [Get Rate Plan by Public Key](https://developers.cloudflare.com/api/resources/billing/subresources/rate_plans/methods/get)

GET/billing/rate\_plans/{public\_key}

##### ModelsExpand Collapse

<details>

<summary>

RatePlanGetResponse object {id, components, currency, public\_name }

</summary>

id: optional string

The uppercase rate plan public key.

<a href="#">Link to this property</a>

components: optional array of map\[unknown]

Pricing components that make up this rate plan.

<a href="#">Link to this property</a>

currency: optional string

Currency of the rate plan pricing.

<a href="#">Link to this property</a>

public\_name: optional string

Human-readable description of the rate plan.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20billing.rate_plans%20%3E%20(model)%20rate_plan_get_response%20%3E%20(schema)>)