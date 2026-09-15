---
title: Jobs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AutoRAG](https://developers.cloudflare.com/api/resources/autorag)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Jobs

##### [List Jobs](https://developers.cloudflare.com/api/resources/autorag/subresources/jobs/methods/list)

Deprecated

GET/accounts/{account\_id}/autorag/rags/{id}/jobs

##### [Get a Job Details](https://developers.cloudflare.com/api/resources/autorag/subresources/jobs/methods/get)

Deprecated

GET/accounts/{account\_id}/autorag/rags/{id}/jobs/{job\_id}

##### [List Job Logs](https://developers.cloudflare.com/api/resources/autorag/subresources/jobs/methods/logs)

Deprecated

GET/accounts/{account\_id}/autorag/rags/{id}/jobs/{job\_id}/logs

##### ModelsExpand Collapse

<details>

<summary>

JobListResponse object {id, source, end\_reason, 3 more }

</summary>

id: string

<a href="#">Link to this property</a>

<details>

<summary>

source: "user"or "schedule"

</summary>

One of the following:

"user"

<a href="#">Link to this property</a>

"schedule"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

end\_reason: optional string

<a href="#">Link to this property</a>

ended\_at: optional string

<a href="#">Link to this property</a>

last\_seen\_at: optional string

<a href="#">Link to this property</a>

started\_at: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20autorag.jobs%20%3E%20(model)%20job_list_response%20%3E%20(schema)>)

<details>

<summary>

JobGetResponse object {id, source, end\_reason, 3 more }

</summary>

id: string

<a href="#">Link to this property</a>

<details>

<summary>

source: "user"or "schedule"

</summary>

One of the following:

"user"

<a href="#">Link to this property</a>

"schedule"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

end\_reason: optional string

<a href="#">Link to this property</a>

ended\_at: optional string

<a href="#">Link to this property</a>

last\_seen\_at: optional string

<a href="#">Link to this property</a>

started\_at: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20autorag.jobs%20%3E%20(model)%20job_get_response%20%3E%20(schema)>)

<details>

<summary>

JobLogsResponse = array of object {id, created\_at, message, message\_type }

</summary>

id: number

<a href="#">Link to this property</a>

created\_at: number

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

message\_type: number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20autorag.jobs%20%3E%20(model)%20job_logs_response%20%3E%20(schema)>)