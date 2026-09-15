---
title: History
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Billing](https://developers.cloudflare.com/api/resources/billing)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# History

##### [Get Account Billing History](https://developers.cloudflare.com/api/resources/billing/subresources/history/methods/list)

GET/accounts/{account\_id}/billing/history

##### ModelsExpand Collapse

<details>

<summary>

HistoryListResponse object {id, action, amount, 12 more }

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

[Link to this property](#)%20billing.history%20%3E%20(model)%20history_list_response%20%3E%20(schema)>)