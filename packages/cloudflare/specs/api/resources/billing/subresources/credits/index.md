---
title: Credits
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Billing](https://developers.cloudflare.com/api/resources/billing)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Credits

##### [Get Account Credits](https://developers.cloudflare.com/api/resources/billing/subresources/credits/methods/get)

GET/accounts/{account\_id}/billing/credits

##### ModelsExpand Collapse

<details>

<summary>

CreditGetResponse object {confirmed\_balance\_cents, currency, days\_remaining, 7 more }

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

[Link to this property](#)%20billing.credits%20%3E%20(model)%20credit_get_response%20%3E%20(schema)>)