---
title: Billing
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[User](https://developers.cloudflare.com/api/resources/user)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Billing

#### BillingHistory

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

#### BillingProfile

##### [Billing Profile Details](https://developers.cloudflare.com/api/resources/user/subresources/billing/subresources/profile/methods/get)

Deprecated

GET/user/billing/profile

##### ModelsExpand Collapse

<details>

<summary>

ProfileGetResponse object {id, account\_type, address, 35 more }

</summary>

id: optional string

Billing item identifier tag.

maxLength32

<a href="#">Link to this property</a>

account\_type: optional string

<a href="#">Link to this property</a>

address: optional string

<a href="#">Link to this property</a>

address2: optional string

<a href="#">Link to this property</a>

balance: optional string

<a href="#">Link to this property</a>

card\_expiry\_month: optional number

<a href="#">Link to this property</a>

card\_expiry\_year: optional number

<a href="#">Link to this property</a>

card\_number: optional string

<a href="#">Link to this property</a>

city: optional string

<a href="#">Link to this property</a>

company: optional string

<a href="#">Link to this property</a>

country: optional string

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

device\_data: optional string

<a href="#">Link to this property</a>

edited\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

enterprise\_billing\_email: optional string

<a href="#">Link to this property</a>

enterprise\_primary\_email: optional string

<a href="#">Link to this property</a>

first\_name: optional string

<a href="#">Link to this property</a>

is\_partner: optional boolean

<a href="#">Link to this property</a>

last\_name: optional string

<a href="#">Link to this property</a>

next\_bill\_date: optional string

formatdate-time

<a href="#">Link to this property</a>

payment\_address: optional string

<a href="#">Link to this property</a>

payment\_address2: optional string

<a href="#">Link to this property</a>

payment\_city: optional string

<a href="#">Link to this property</a>

payment\_country: optional string

<a href="#">Link to this property</a>

payment\_email: optional string

<a href="#">Link to this property</a>

payment\_first\_name: optional string

<a href="#">Link to this property</a>

payment\_gateway: optional string

<a href="#">Link to this property</a>

payment\_last\_name: optional string

<a href="#">Link to this property</a>

payment\_nonce: optional string

<a href="#">Link to this property</a>

payment\_state: optional string

<a href="#">Link to this property</a>

payment\_zipcode: optional string

<a href="#">Link to this property</a>

primary\_email: optional string

<a href="#">Link to this property</a>

state: optional string

<a href="#">Link to this property</a>

tax\_id\_type: optional string

<a href="#">Link to this property</a>

telephone: optional string

<a href="#">Link to this property</a>

validation\_code: optional string

<a href="#">Link to this property</a>

vat: optional string

<a href="#">Link to this property</a>

zipcode: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.billing.profile%20%3E%20(model)%20profile_get_response%20%3E%20(schema)>)