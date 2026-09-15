---
title: Availabilities
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Speed](https://developers.cloudflare.com/api/resources/speed)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Availabilities

##### [Get quota and availability](https://developers.cloudflare.com/api/resources/speed/subresources/availabilities/methods/list)

GET/zones/{zone\_id}/speed\_api/availabilities

##### ModelsExpand Collapse

<details>

<summary>

Availability object {quota, regions, regionsPerPlan }

</summary>

<details>

<summary>

quota: optional object {plan, quotasPerPlan, remainingSchedules, 2 more }

</summary>

plan: optional string

Cloudflare plan.

<a href="#">Link to this property</a>

<details>

<summary>

quotasPerPlan: optional object {value }

The number of tests available per plan.

</summary>

<details>

<summary>

value: optional object {business, enterprise, free, pro }

Counts per account plan.

</summary>

business: optional number

<a href="#">Link to this property</a>

enterprise: optional number

<a href="#">Link to this property</a>

free: optional number

<a href="#">Link to this property</a>

pro: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

remainingSchedules: optional number

The number of remaining schedules available.

<a href="#">Link to this property</a>

remainingTests: optional number

The number of remaining tests available.

<a href="#">Link to this property</a>

<details>

<summary>

scheduleQuotasPerPlan: optional object {value }

The number of schedules available per plan.

</summary>

<details>

<summary>

value: optional object {business, enterprise, free, pro }

Counts per account plan.

</summary>

business: optional number

<a href="#">Link to this property</a>

enterprise: optional number

<a href="#">Link to this property</a>

free: optional number

<a href="#">Link to this property</a>

pro: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

regions: optional array of <a href="https://developers.cloudflare.com/api/resources/speed#(resource)%20speed%20%3E%20(model)%20labeled_region%20%3E%20(schema)">LabeledRegion</a> { label, value }

</summary>

label: optional string

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "asia-east1"or "asia-northeast1"or "asia-northeast2"or 18 more

A test region.

</summary>

One of the following:

"asia-east1"

<a href="#">Link to this property</a>

"asia-northeast1"

<a href="#">Link to this property</a>

"asia-northeast2"

<a href="#">Link to this property</a>

"asia-south1"

<a href="#">Link to this property</a>

"asia-southeast1"

<a href="#">Link to this property</a>

"australia-southeast1"

<a href="#">Link to this property</a>

"europe-north1"

<a href="#">Link to this property</a>

"europe-southwest1"

<a href="#">Link to this property</a>

"europe-west1"

<a href="#">Link to this property</a>

"europe-west2"

<a href="#">Link to this property</a>

"europe-west3"

<a href="#">Link to this property</a>

"europe-west4"

<a href="#">Link to this property</a>

"europe-west8"

<a href="#">Link to this property</a>

"europe-west9"

<a href="#">Link to this property</a>

"me-west1"

<a href="#">Link to this property</a>

"southamerica-east1"

<a href="#">Link to this property</a>

"us-central1"

<a href="#">Link to this property</a>

"us-east1"

<a href="#">Link to this property</a>

"us-east4"

<a href="#">Link to this property</a>

"us-south1"

<a href="#">Link to this property</a>

"us-west1"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

regionsPerPlan: optional object {business, enterprise, free, pro }

Available regions.

</summary>

<details>

<summary>

business: optional array of <a href="https://developers.cloudflare.com/api/resources/speed#(resource)%20speed%20%3E%20(model)%20labeled_region%20%3E%20(schema)">LabeledRegion</a> { label, value }

</summary>

label: optional string

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "asia-east1"or "asia-northeast1"or "asia-northeast2"or 18 more

A test region.

</summary>

One of the following:

"asia-east1"

<a href="#">Link to this property</a>

"asia-northeast1"

<a href="#">Link to this property</a>

"asia-northeast2"

<a href="#">Link to this property</a>

"asia-south1"

<a href="#">Link to this property</a>

"asia-southeast1"

<a href="#">Link to this property</a>

"australia-southeast1"

<a href="#">Link to this property</a>

"europe-north1"

<a href="#">Link to this property</a>

"europe-southwest1"

<a href="#">Link to this property</a>

"europe-west1"

<a href="#">Link to this property</a>

"europe-west2"

<a href="#">Link to this property</a>

"europe-west3"

<a href="#">Link to this property</a>

"europe-west4"

<a href="#">Link to this property</a>

"europe-west8"

<a href="#">Link to this property</a>

"europe-west9"

<a href="#">Link to this property</a>

"me-west1"

<a href="#">Link to this property</a>

"southamerica-east1"

<a href="#">Link to this property</a>

"us-central1"

<a href="#">Link to this property</a>

"us-east1"

<a href="#">Link to this property</a>

"us-east4"

<a href="#">Link to this property</a>

"us-south1"

<a href="#">Link to this property</a>

"us-west1"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

enterprise: optional array of <a href="https://developers.cloudflare.com/api/resources/speed#(resource)%20speed%20%3E%20(model)%20labeled_region%20%3E%20(schema)">LabeledRegion</a> { label, value }

</summary>

label: optional string

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "asia-east1"or "asia-northeast1"or "asia-northeast2"or 18 more

A test region.

</summary>

One of the following:

"asia-east1"

<a href="#">Link to this property</a>

"asia-northeast1"

<a href="#">Link to this property</a>

"asia-northeast2"

<a href="#">Link to this property</a>

"asia-south1"

<a href="#">Link to this property</a>

"asia-southeast1"

<a href="#">Link to this property</a>

"australia-southeast1"

<a href="#">Link to this property</a>

"europe-north1"

<a href="#">Link to this property</a>

"europe-southwest1"

<a href="#">Link to this property</a>

"europe-west1"

<a href="#">Link to this property</a>

"europe-west2"

<a href="#">Link to this property</a>

"europe-west3"

<a href="#">Link to this property</a>

"europe-west4"

<a href="#">Link to this property</a>

"europe-west8"

<a href="#">Link to this property</a>

"europe-west9"

<a href="#">Link to this property</a>

"me-west1"

<a href="#">Link to this property</a>

"southamerica-east1"

<a href="#">Link to this property</a>

"us-central1"

<a href="#">Link to this property</a>

"us-east1"

<a href="#">Link to this property</a>

"us-east4"

<a href="#">Link to this property</a>

"us-south1"

<a href="#">Link to this property</a>

"us-west1"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

free: optional array of <a href="https://developers.cloudflare.com/api/resources/speed#(resource)%20speed%20%3E%20(model)%20labeled_region%20%3E%20(schema)">LabeledRegion</a> { label, value }

</summary>

label: optional string

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "asia-east1"or "asia-northeast1"or "asia-northeast2"or 18 more

A test region.

</summary>

One of the following:

"asia-east1"

<a href="#">Link to this property</a>

"asia-northeast1"

<a href="#">Link to this property</a>

"asia-northeast2"

<a href="#">Link to this property</a>

"asia-south1"

<a href="#">Link to this property</a>

"asia-southeast1"

<a href="#">Link to this property</a>

"australia-southeast1"

<a href="#">Link to this property</a>

"europe-north1"

<a href="#">Link to this property</a>

"europe-southwest1"

<a href="#">Link to this property</a>

"europe-west1"

<a href="#">Link to this property</a>

"europe-west2"

<a href="#">Link to this property</a>

"europe-west3"

<a href="#">Link to this property</a>

"europe-west4"

<a href="#">Link to this property</a>

"europe-west8"

<a href="#">Link to this property</a>

"europe-west9"

<a href="#">Link to this property</a>

"me-west1"

<a href="#">Link to this property</a>

"southamerica-east1"

<a href="#">Link to this property</a>

"us-central1"

<a href="#">Link to this property</a>

"us-east1"

<a href="#">Link to this property</a>

"us-east4"

<a href="#">Link to this property</a>

"us-south1"

<a href="#">Link to this property</a>

"us-west1"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

pro: optional array of <a href="https://developers.cloudflare.com/api/resources/speed#(resource)%20speed%20%3E%20(model)%20labeled_region%20%3E%20(schema)">LabeledRegion</a> { label, value }

</summary>

label: optional string

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "asia-east1"or "asia-northeast1"or "asia-northeast2"or 18 more

A test region.

</summary>

One of the following:

"asia-east1"

<a href="#">Link to this property</a>

"asia-northeast1"

<a href="#">Link to this property</a>

"asia-northeast2"

<a href="#">Link to this property</a>

"asia-south1"

<a href="#">Link to this property</a>

"asia-southeast1"

<a href="#">Link to this property</a>

"australia-southeast1"

<a href="#">Link to this property</a>

"europe-north1"

<a href="#">Link to this property</a>

"europe-southwest1"

<a href="#">Link to this property</a>

"europe-west1"

<a href="#">Link to this property</a>

"europe-west2"

<a href="#">Link to this property</a>

"europe-west3"

<a href="#">Link to this property</a>

"europe-west4"

<a href="#">Link to this property</a>

"europe-west8"

<a href="#">Link to this property</a>

"europe-west9"

<a href="#">Link to this property</a>

"me-west1"

<a href="#">Link to this property</a>

"southamerica-east1"

<a href="#">Link to this property</a>

"us-central1"

<a href="#">Link to this property</a>

"us-east1"

<a href="#">Link to this property</a>

"us-east4"

<a href="#">Link to this property</a>

"us-south1"

<a href="#">Link to this property</a>

"us-west1"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20speed.availabilities%20%3E%20(model)%20availability%20%3E%20(schema)>)