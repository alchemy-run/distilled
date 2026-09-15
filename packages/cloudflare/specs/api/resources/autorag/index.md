---
title: AutoRAG
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# AutoRAG

##### [AI Search](https://developers.cloudflare.com/api/resources/autorag/methods/ai_search)

Deprecated

POST/accounts/{account\_id}/autorag/rags/{id}/ai-search

##### [Search](https://developers.cloudflare.com/api/resources/autorag/methods/search)

Deprecated

POST/accounts/{account\_id}/autorag/rags/{id}/search

##### [Sync](https://developers.cloudflare.com/api/resources/autorag/methods/sync)

Deprecated

PATCH/accounts/{account\_id}/autorag/rags/{id}/sync

##### [Files](https://developers.cloudflare.com/api/resources/autorag/methods/files)

Deprecated

GET/accounts/{account\_id}/autorag/rags/{id}/files

##### ModelsExpand Collapse

<details>

<summary>

AutoRAGAISearchResponse object {response, search\_query, data, 3 more }

</summary>

response: string

<a href="#">Link to this property</a>

search\_query: string

<a href="#">Link to this property</a>

<details>

<summary>

data: optional array of object {score, attributes, content, 2 more }

</summary>

score: number

<a href="#">Link to this property</a>

attributes: optional unknown

<a href="#">Link to this property</a>

<details>

<summary>

content: optional array of object {text, type }

</summary>

text: optional string

<a href="#">Link to this property</a>

type: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

file\_id: optional string

<a href="#">Link to this property</a>

filename: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

has\_more: optional boolean

<a href="#">Link to this property</a>

next\_page: optional string

<a href="#">Link to this property</a>

object: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20autorag%20%3E%20(model)%20autorag_ai_search_response%20%3E%20(schema)>)

<details>

<summary>

AutoRAGSearchResponse object {search\_query, data, has\_more, 2 more }

</summary>

search\_query: string

<a href="#">Link to this property</a>

<details>

<summary>

data: optional array of object {score, attributes, content, 2 more }

</summary>

score: number

<a href="#">Link to this property</a>

attributes: optional unknown

<a href="#">Link to this property</a>

<details>

<summary>

content: optional array of object {text, type }

</summary>

text: optional string

<a href="#">Link to this property</a>

type: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

file\_id: optional string

<a href="#">Link to this property</a>

filename: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

has\_more: optional boolean

<a href="#">Link to this property</a>

next\_page: optional string

<a href="#">Link to this property</a>

object: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20autorag%20%3E%20(model)%20autorag_search_response%20%3E%20(schema)>)

<details>

<summary>

AutoRAGSyncResponse object {job\_id }

</summary>

job\_id: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20autorag%20%3E%20(model)%20autorag_sync_response%20%3E%20(schema)>)

<details>

<summary>

AutoRAGFilesResponse = array of object {error, key }

</summary>

error: string

<a href="#">Link to this property</a>

key: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20autorag%20%3E%20(model)%20autorag_files_response%20%3E%20(schema)>)

#### AutoRAGJobs

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