---
title: Schedule
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Speed](https://developers.cloudflare.com/api/resources/speed)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Schedule

##### [Get a page test schedule](https://developers.cloudflare.com/api/resources/speed/subresources/schedule/methods/get)

GET/zones/{zone\_id}/speed\_api/schedule/{url}

##### [Create scheduled page test](https://developers.cloudflare.com/api/resources/speed/subresources/schedule/methods/create)

POST/zones/{zone\_id}/speed\_api/schedule/{url}

##### [Delete scheduled page test](https://developers.cloudflare.com/api/resources/speed/subresources/schedule/methods/delete)

DELETE/zones/{zone\_id}/speed\_api/schedule/{url}

##### ModelsExpand Collapse

<details>

<summary>

Schedule object {frequency, region, url }

The test schedule.

</summary>

<details>

<summary>

frequency: optional "DAILY"or "WEEKLY"

The frequency of the test.

</summary>

One of the following:

"DAILY"

<a href="#">Link to this property</a>

"WEEKLY"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

region: optional "asia-east1"or "asia-northeast1"or "asia-northeast2"or 18 more

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

url: optional string

A URL.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20speed.schedule%20%3E%20(model)%20schedule%20%3E%20(schema)>)

<details>

<summary>

ScheduleCreateResponse object {schedule, test }

</summary>

schedule: optional <a href="https://developers.cloudflare.com/api/resources/speed#(resource)%20speed.schedule%20%3E%20(model)%20schedule%20%3E%20(schema)">Schedule</a> { frequency, region, url }

The test schedule.

<a href="#">Link to this property</a>

test: optional <a href="https://developers.cloudflare.com/api/resources/speed#(resource)%20speed.pages.tests%20%3E%20(model)%20test%20%3E%20(schema)">Test</a> { id, date, desktopReport, 4 more }

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20speed.schedule%20%3E%20(model)%20schedule_create_response%20%3E%20(schema)>)

<details>

<summary>

ScheduleDeleteResponse object {count }

</summary>

count: optional number

Number of items affected.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20speed.schedule%20%3E%20(model)%20schedule_delete_response%20%3E%20(schema)>)