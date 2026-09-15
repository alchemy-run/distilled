---
title: Jobs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI Search](https://developers.cloudflare.com/api/resources/ai_search)

[Instances](https://developers.cloudflare.com/api/resources/ai_search/subresources/instances)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Jobs

##### [List Jobs](https://developers.cloudflare.com/api/resources/ai_search/subresources/instances/subresources/jobs/methods/list)

GET/accounts/{account\_id}/ai-search/instances/{id}/jobs

##### [Create new job](https://developers.cloudflare.com/api/resources/ai_search/subresources/instances/subresources/jobs/methods/create)

POST/accounts/{account\_id}/ai-search/instances/{id}/jobs

##### [Get a Job Details](https://developers.cloudflare.com/api/resources/ai_search/subresources/instances/subresources/jobs/methods/get)

GET/accounts/{account\_id}/ai-search/instances/{id}/jobs/{job\_id}

##### [List Job Logs](https://developers.cloudflare.com/api/resources/ai_search/subresources/instances/subresources/jobs/methods/logs)

GET/accounts/{account\_id}/ai-search/instances/{id}/jobs/{job\_id}/logs

##### ModelsExpand Collapse

<details>

<summary>

JobListResponse object {id, source, description, 4 more }

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

description: optional string

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

[Link to this property](#)%20ai_search.instances.jobs%20%3E%20(model)%20job_list_response%20%3E%20(schema)>)

<details>

<summary>

JobCreateResponse object {id, source, description, 4 more }

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

description: optional string

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

[Link to this property](#)%20ai_search.instances.jobs%20%3E%20(model)%20job_create_response%20%3E%20(schema)>)

<details>

<summary>

JobGetResponse object {id, source, description, 4 more }

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

description: optional string

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

[Link to this property](#)%20ai_search.instances.jobs%20%3E%20(model)%20job_get_response%20%3E%20(schema)>)

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

[Link to this property](#)%20ai_search.instances.jobs%20%3E%20(model)%20job_logs_response%20%3E%20(schema)>)