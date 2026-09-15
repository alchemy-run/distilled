---
title: History
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[User](https://developers.cloudflare.com/api/resources/user)

[Billing](https://developers.cloudflare.com/api/resources/user/subresources/billing)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# History

##### [Billing History Details](https://developers.cloudflare.com/api/resources/user/subresources/billing/subresources/history/methods/list)

Deprecated

GET/user/billing/history

##### ModelsExpand Collapse

<details>

<summary>

BillingHistory object {id, action, amount, 5 more }

</summary>

id: string

Billing item identifier tag.

maxLength32

<a href="#">Link to this property</a>

action: string

The billing item action.

maxLength30

<a href="#">Link to this property</a>

amount: number

The amount associated with this billing item.

<a href="#">Link to this property</a>

currency: string

The monetary unit in which pricing information is displayed.

<a href="#">Link to this property</a>

description: string

The billing item description.

maxLength255

<a href="#">Link to this property</a>

occurred\_at: string

When the billing item was created.

formatdate-time

<a href="#">Link to this property</a>

type: string

The billing item type.

maxLength30

<a href="#">Link to this property</a>

<details>

<summary>

zone: object {name }

</summary>

name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.billing.history%20%3E%20(model)%20billing_history%20%3E%20(schema)>)