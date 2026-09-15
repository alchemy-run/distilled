---
title: Plans
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zones](https://developers.cloudflare.com/api/resources/zones)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Plans

##### [List Available Plans](https://developers.cloudflare.com/api/resources/zones/subresources/plans/methods/list)

GET/zones/{zone\_id}/available\_plans

##### [Available Plan Details](https://developers.cloudflare.com/api/resources/zones/subresources/plans/methods/get)

GET/zones/{zone\_id}/available\_plans/{plan\_identifier}

##### ModelsExpand Collapse

<details>

<summary>

AvailableRatePlan object {id, can\_subscribe, currency, 6 more }

</summary>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

can\_subscribe: optional boolean

Indicates whether you can subscribe to this plan.

<a href="#">Link to this property</a>

currency: optional string

The monetary unit in which pricing information is displayed.

<a href="#">Link to this property</a>

externally\_managed: optional boolean

Indicates whether this plan is managed externally.

<a href="#">Link to this property</a>

<details>

<summary>

frequency: optional "weekly"or "monthly"or "quarterly"or "yearly"

The frequency at which you will be billed for this plan.

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

</details>

<a href="#">Link to this property</a>

is\_subscribed: optional boolean

Indicates whether you are currently subscribed to this plan.

<a href="#">Link to this property</a>

legacy\_id: optional string

The legacy identifier for this rate plan, if any.

<a href="#">Link to this property</a>

name: optional string

The plan name.

maxLength80

<a href="#">Link to this property</a>

price: optional number

The amount you will be billed for this plan.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zones.plans%20%3E%20(model)%20available_rate_plan%20%3E%20(schema)>)