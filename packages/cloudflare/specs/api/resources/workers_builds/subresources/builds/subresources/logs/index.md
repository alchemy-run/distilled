---
title: Logs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers Builds](https://developers.cloudflare.com/api/resources/workers_builds)

[Builds](https://developers.cloudflare.com/api/resources/workers_builds/subresources/builds)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Logs

##### [Get Workers build logs](https://developers.cloudflare.com/api/resources/workers_builds/subresources/builds/subresources/logs/methods/get)

GET/accounts/{account\_id}/builds/builds/{build\_uuid}/logs

##### ModelsExpand Collapse

<details>

<summary>

LogGetResponse object {cursor, lines, truncated }

</summary>

cursor: optional string

Pagination cursor for log retrieval.

<a href="#">Link to this property</a>

<details>

<summary>

lines: optional array of array of numberor string

</summary>

One of the following:

number

Unix epoch timestamp

<a href="#">Link to this property</a>

string

Log message

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

truncated: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers_builds.builds.logs%20%3E%20(model)%20log_get_response%20%3E%20(schema)>)