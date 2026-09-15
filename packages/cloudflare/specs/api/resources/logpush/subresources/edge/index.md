---
title: Edge
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Logpush](https://developers.cloudflare.com/api/resources/logpush)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Edge

##### [List Instant Logs jobs](https://developers.cloudflare.com/api/resources/logpush/subresources/edge/methods/get)

GET/zones/{zone\_id}/logpush/edge/jobs

##### [Create Instant Logs job](https://developers.cloudflare.com/api/resources/logpush/subresources/edge/methods/create)

POST/zones/{zone\_id}/logpush/edge/jobs

##### ModelsExpand Collapse

<details>

<summary>

InstantLogpushJob object {destination\_conf, fields, filter, 2 more }

</summary>

destination\_conf: optional string

Unique WebSocket address that will receive messages from Cloudflare’s edge.

formaturi

maxLength4096

<a href="#">Link to this property</a>

fields: optional string

Comma-separated list of fields.

<a href="#">Link to this property</a>

filter: optional string

Filters to drill down into specific events.

<a href="#">Link to this property</a>

sample: optional number

The sample parameter is the sample rate of the records set by the client: “sample”: 1 is 100% of records “sample”: 10 is 10% and so on.

<a href="#">Link to this property</a>

session\_id: optional string

Unique session id of the job.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20logpush.edge%20%3E%20(model)%20instant_logpush_job%20%3E%20(schema)>)