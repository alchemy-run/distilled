---
title: Subscriptions
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zones](https://developers.cloudflare.com/api/resources/zones)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Subscriptions

##### [Zone Subscription Details](https://developers.cloudflare.com/api/resources/zones/subresources/subscriptions/methods/get)

GET/zones/{zone\_id}/subscription

##### [Create Zone Subscription](https://developers.cloudflare.com/api/resources/zones/subresources/subscriptions/methods/create)

POST/zones/{zone\_id}/subscription

##### [Update Zone Subscription](https://developers.cloudflare.com/api/resources/zones/subresources/subscriptions/methods/update)

PUT/zones/{zone\_id}/subscription

##### ModelsExpand Collapse

<details>

<summary>

SubscriptionGetResponse object {id, currency, current\_period\_end, 5 more }

</summary>

id: optional string

Subscription identifier tag.

maxLength32

<a href="#">Link to this property</a>

currency: optional string

The monetary unit in which pricing information is displayed.

<a href="#">Link to this property</a>

current\_period\_end: optional string

The end of the current period and also when the next billing is due.

formatdate-time

<a href="#">Link to this property</a>

current\_period\_start: optional string

When the current billing period started. May match initial\_period\_start if this is the first period.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

frequency: optional "weekly"or "monthly"or "quarterly"or 2 more

How often the subscription is renewed automatically.

</summary>

One of the following:

"weekly"

<a href="#">Link to this property</a>

"monthly"

<a href="#">Link to this property</a>

"quarterly"

<a href="#">Link to this property</a>

"yearly"

<a href="#">Link to this property</a>

"not-applicable"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

price: optional number

The price of the subscription that will be billed, in US dollars.

<a href="#">Link to this property</a>

rate\_plan: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20rate_plan%20%3E%20(schema)">RatePlan</a> { id, currency, externally\_managed, 4 more }

The rate plan applied to the subscription.

<a href="#">Link to this property</a>

<details>

<summary>

state: optional "Trial"or "Provisioned"or "Paid"or 4 more

The state that the subscription is in.

</summary>

One of the following:

"Trial"

<a href="#">Link to this property</a>

"Provisioned"

<a href="#">Link to this property</a>

"Paid"

<a href="#">Link to this property</a>

"AwaitingPayment"

<a href="#">Link to this property</a>

"Cancelled"

<a href="#">Link to this property</a>

"Failed"

<a href="#">Link to this property</a>

"Expired"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zones.subscriptions%20%3E%20(model)%20subscription_get_response%20%3E%20(schema)>)

<details>

<summary>

SubscriptionCreateResponse object {id, currency, current\_period\_end, 5 more }

</summary>

id: optional string

Subscription identifier tag.

maxLength32

<a href="#">Link to this property</a>

currency: optional string

The monetary unit in which pricing information is displayed.

<a href="#">Link to this property</a>

current\_period\_end: optional string

The end of the current period and also when the next billing is due.

formatdate-time

<a href="#">Link to this property</a>

current\_period\_start: optional string

When the current billing period started. May match initial\_period\_start if this is the first period.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

frequency: optional "weekly"or "monthly"or "quarterly"or 2 more

How often the subscription is renewed automatically.

</summary>

One of the following:

"weekly"

<a href="#">Link to this property</a>

"monthly"

<a href="#">Link to this property</a>

"quarterly"

<a href="#">Link to this property</a>

"yearly"

<a href="#">Link to this property</a>

"not-applicable"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

price: optional number

The price of the subscription that will be billed, in US dollars.

<a href="#">Link to this property</a>

rate\_plan: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20rate_plan%20%3E%20(schema)">RatePlan</a> { id, currency, externally\_managed, 4 more }

The rate plan applied to the subscription.

<a href="#">Link to this property</a>

<details>

<summary>

state: optional "Trial"or "Provisioned"or "Paid"or 4 more

The state that the subscription is in.

</summary>

One of the following:

"Trial"

<a href="#">Link to this property</a>

"Provisioned"

<a href="#">Link to this property</a>

"Paid"

<a href="#">Link to this property</a>

"AwaitingPayment"

<a href="#">Link to this property</a>

"Cancelled"

<a href="#">Link to this property</a>

"Failed"

<a href="#">Link to this property</a>

"Expired"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zones.subscriptions%20%3E%20(model)%20subscription_create_response%20%3E%20(schema)>)

<details>

<summary>

SubscriptionUpdateResponse object {id, currency, current\_period\_end, 5 more }

</summary>

id: optional string

Subscription identifier tag.

maxLength32

<a href="#">Link to this property</a>

currency: optional string

The monetary unit in which pricing information is displayed.

<a href="#">Link to this property</a>

current\_period\_end: optional string

The end of the current period and also when the next billing is due.

formatdate-time

<a href="#">Link to this property</a>

current\_period\_start: optional string

When the current billing period started. May match initial\_period\_start if this is the first period.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

frequency: optional "weekly"or "monthly"or "quarterly"or 2 more

How often the subscription is renewed automatically.

</summary>

One of the following:

"weekly"

<a href="#">Link to this property</a>

"monthly"

<a href="#">Link to this property</a>

"quarterly"

<a href="#">Link to this property</a>

"yearly"

<a href="#">Link to this property</a>

"not-applicable"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

price: optional number

The price of the subscription that will be billed, in US dollars.

<a href="#">Link to this property</a>

rate\_plan: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20rate_plan%20%3E%20(schema)">RatePlan</a> { id, currency, externally\_managed, 4 more }

The rate plan applied to the subscription.

<a href="#">Link to this property</a>

<details>

<summary>

state: optional "Trial"or "Provisioned"or "Paid"or 4 more

The state that the subscription is in.

</summary>

One of the following:

"Trial"

<a href="#">Link to this property</a>

"Provisioned"

<a href="#">Link to this property</a>

"Paid"

<a href="#">Link to this property</a>

"AwaitingPayment"

<a href="#">Link to this property</a>

"Cancelled"

<a href="#">Link to this property</a>

"Failed"

<a href="#">Link to this property</a>

"Expired"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zones.subscriptions%20%3E%20(model)%20subscription_update_response%20%3E%20(schema)>)