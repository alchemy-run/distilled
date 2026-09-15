---
title: Status
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workflows](https://developers.cloudflare.com/api/resources/workflows)

[Instances](https://developers.cloudflare.com/api/resources/workflows/subresources/instances)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Status

##### [Change status of instance](https://developers.cloudflare.com/api/resources/workflows/subresources/instances/subresources/status/methods/edit)

PATCH/accounts/{account\_id}/workflows/{workflow\_name}/instances/{instance\_id}/status

##### ModelsExpand Collapse

<details>

<summary>

StatusEditResponse object {status, timestamp }

</summary>

<details>

<summary>

status: "queued"or "running"or "paused"or 6 more

</summary>

One of the following:

"queued"

<a href="#">Link to this property</a>

"running"

<a href="#">Link to this property</a>

"paused"

<a href="#">Link to this property</a>

"errored"

<a href="#">Link to this property</a>

"terminated"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

"waitingForPause"

<a href="#">Link to this property</a>

"waiting"

<a href="#">Link to this property</a>

"rollingBack"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

timestamp: string

Accepts ISO 8601 with no timezone offsets and in UTC.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workflows.instances.status%20%3E%20(model)%20status_edit_response%20%3E%20(schema)>)