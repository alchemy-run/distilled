---
title: Rate Plans
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zones](https://developers.cloudflare.com/api/resources/zones)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Rate Plans

##### [List Available Rate Plans](https://developers.cloudflare.com/api/resources/zones/subresources/rate_plans/methods/get)

GET/zones/{zone\_id}/available\_rate\_plans

##### ModelsExpand Collapse

<details>

<summary>

RatePlanGetResponse object {id, components, currency, 3 more }

</summary>

id: optional string

Plan identifier tag.

<a href="#">Link to this property</a>

<details>

<summary>

components: optional array of object {default, name, unit\_price }

Array of available components values for the plan.

</summary>

default: optional number

The default amount allocated.

<a href="#">Link to this property</a>

<details>

<summary>

name: optional "zones"or "page\_rules"or "dedicated\_certificates"or "dedicated\_certificates\_custom"

The unique component.

</summary>

One of the following:

"zones"

<a href="#">Link to this property</a>

"page\_rules"

<a href="#">Link to this property</a>

"dedicated\_certificates"

<a href="#">Link to this property</a>

"dedicated\_certificates\_custom"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

unit\_price: optional number

The unit price of the component.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

currency: optional string

The monetary unit in which pricing information is displayed.

<a href="#">Link to this property</a>

duration: optional number

The duration of the plan subscription.

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

name: optional string

The plan name.

maxLength80

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zones.rate_plans%20%3E%20(model)%20rate_plan_get_response%20%3E%20(schema)>)