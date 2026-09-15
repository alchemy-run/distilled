---
title: Bad Debt
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Billing](https://developers.cloudflare.com/api/resources/billing)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Bad Debt

##### [Get Account Bad Debt](https://developers.cloudflare.com/api/resources/billing/subresources/bad_debt/methods/get)

GET/accounts/{account\_id}/billing/bad-debt

##### ModelsExpand Collapse

<details>

<summary>

BadDebtGetResponse object {already\_paid, bad\_debt\_status, invoices, total\_debt\_amount }

</summary>

already\_paid: optional number

Amount already paid towards the debt.

<a href="#">Link to this property</a>

bad\_debt\_status: optional string

The current bad debt status of the account.

<a href="#">Link to this property</a>

<details>

<summary>

invoices: optional array of object {id, action, amount, 12 more }

List of outstanding invoices contributing to bad debt.

</summary>

id: optional string

Billing history item identifier.

<a href="#">Link to this property</a>

action: optional string

The billing item action.

<a href="#">Link to this property</a>

amount: optional number

The amount associated with this billing item.

<a href="#">Link to this property</a>

amount\_to\_pay: optional number

The amount remaining to pay.

<a href="#">Link to this property</a>

currency: optional string

The currency of the billing item.

<a href="#">Link to this property</a>

description: optional string

The billing item description.

<a href="#">Link to this property</a>

external\_invoice\_id: optional string

The external invoice identifier.

<a href="#">Link to this property</a>

hosted\_invoice\_url: optional string

URL to the hosted invoice.

<a href="#">Link to this property</a>

invoice\_id: optional string

The associated invoice identifier.

<a href="#">Link to this property</a>

occurred\_at: optional string

When the billing event occurred.

formatdate-time

<a href="#">Link to this property</a>

receipt\_id: optional string

The associated receipt identifier.

<a href="#">Link to this property</a>

source: optional string

The source of the billing item.

<a href="#">Link to this property</a>

source\_invoice\_id: optional string

The source invoice identifier.

<a href="#">Link to this property</a>

status: optional string

The status of the billing item.

<a href="#">Link to this property</a>

type: optional string

The billing item type.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

total\_debt\_amount: optional number

Total outstanding debt amount.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20billing.bad_debt%20%3E%20(model)%20bad_debt_get_response%20%3E%20(schema)>)