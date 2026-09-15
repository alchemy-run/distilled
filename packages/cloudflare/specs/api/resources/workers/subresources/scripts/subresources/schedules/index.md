---
title: Schedules
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers](https://developers.cloudflare.com/api/resources/workers)

[Scripts](https://developers.cloudflare.com/api/resources/workers/subresources/scripts)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Schedules

##### [Get Cron Triggers](https://developers.cloudflare.com/api/resources/workers/subresources/scripts/subresources/schedules/methods/get)

GET/accounts/{account\_id}/workers/scripts/{script\_name}/schedules

##### [Update Cron Triggers](https://developers.cloudflare.com/api/resources/workers/subresources/scripts/subresources/schedules/methods/update)

PUT/accounts/{account\_id}/workers/scripts/{script\_name}/schedules

##### ModelsExpand Collapse

<details>

<summary>

ScheduleGetResponse object {schedules }

</summary>

<details>

<summary>

schedules: array of object {cron, created\_on, modified\_on }

</summary>

cron: string

<a href="#">Link to this property</a>

created\_on: optional string

<a href="#">Link to this property</a>

modified\_on: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.scripts.schedules%20%3E%20(model)%20schedule_get_response%20%3E%20(schema)>)

<details>

<summary>

ScheduleUpdateResponse object {schedules }

</summary>

<details>

<summary>

schedules: array of object {cron, created\_on, modified\_on }

</summary>

cron: string

<a href="#">Link to this property</a>

created\_on: optional string

<a href="#">Link to this property</a>

modified\_on: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.scripts.schedules%20%3E%20(model)%20schedule_update_response%20%3E%20(schema)>)