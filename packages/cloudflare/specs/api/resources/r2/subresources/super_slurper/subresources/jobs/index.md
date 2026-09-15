---
title: Jobs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[R2](https://developers.cloudflare.com/api/resources/r2)

[Super Slurper](https://developers.cloudflare.com/api/resources/r2/subresources/super_slurper)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Jobs

##### [List jobs](https://developers.cloudflare.com/api/resources/r2/subresources/super_slurper/subresources/jobs/methods/list)

GET/accounts/{account\_id}/slurper/jobs

##### [Get job details](https://developers.cloudflare.com/api/resources/r2/subresources/super_slurper/subresources/jobs/methods/get)

GET/accounts/{account\_id}/slurper/jobs/{job\_id}

##### [Create a job](https://developers.cloudflare.com/api/resources/r2/subresources/super_slurper/subresources/jobs/methods/create)

POST/accounts/{account\_id}/slurper/jobs

##### [Abort all jobs](https://developers.cloudflare.com/api/resources/r2/subresources/super_slurper/subresources/jobs/methods/abort_all)

PUT/accounts/{account\_id}/slurper/jobs/abortAll

##### [Abort a job](https://developers.cloudflare.com/api/resources/r2/subresources/super_slurper/subresources/jobs/methods/abort)

PUT/accounts/{account\_id}/slurper/jobs/{job\_id}/abort

##### [Pause a job](https://developers.cloudflare.com/api/resources/r2/subresources/super_slurper/subresources/jobs/methods/pause)

PUT/accounts/{account\_id}/slurper/jobs/{job\_id}/pause

##### [Get job progress](https://developers.cloudflare.com/api/resources/r2/subresources/super_slurper/subresources/jobs/methods/progress)

GET/accounts/{account\_id}/slurper/jobs/{job\_id}/progress

##### [Resume a job](https://developers.cloudflare.com/api/resources/r2/subresources/super_slurper/subresources/jobs/methods/resume)

PUT/accounts/{account\_id}/slurper/jobs/{job\_id}/resume

##### ModelsExpand Collapse

<details>

<summary>

JobListResponse object {id, createdAt, finishedAt, 4 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

createdAt: optional string

<a href="#">Link to this property</a>

finishedAt: optional string

<a href="#">Link to this property</a>

overwrite: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {bucket, endpoint, keys, 2 more } or object {bucket, keys, pathPrefix, vendor } or object {bucket, jurisdiction, keys, 2 more }

</summary>

One of the following:

<details>

<summary>

S3SourceResponseSchema object {bucket, endpoint, keys, 2 more }

</summary>

bucket: optional string

<a href="#">Link to this property</a>

endpoint: optional string

formaturi

<a href="#">Link to this property</a>

keys: optional array of string

<a href="#">Link to this property</a>

pathPrefix: optional string

<a href="#">Link to this property</a>

vendor: optional "s3"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

GcsSourceResponseSchema object {bucket, keys, pathPrefix, vendor }

</summary>

bucket: optional string

<a href="#">Link to this property</a>

keys: optional array of string

<a href="#">Link to this property</a>

pathPrefix: optional string

<a href="#">Link to this property</a>

vendor: optional "gcs"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

R2SourceResponseSchema object {bucket, jurisdiction, keys, 2 more }

</summary>

bucket: optional string

<a href="#">Link to this property</a>

<details>

<summary>

jurisdiction: optional "default"or "eu"or "us"or "fedramp"

</summary>

One of the following:

"default"

<a href="#">Link to this property</a>

"eu"

<a href="#">Link to this property</a>

"us"

<a href="#">Link to this property</a>

"fedramp"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

keys: optional array of string

<a href="#">Link to this property</a>

pathPrefix: optional string

<a href="#">Link to this property</a>

vendor: optional <a href="https://developers.cloudflare.com/api/resources/r2#(resource)%20r2.buckets.sippy%20%3E%20(model)%20provider%20%3E%20(schema)">Provider</a>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "running"or "paused"or "aborted"or "completed"

</summary>

One of the following:

"running"

<a href="#">Link to this property</a>

"paused"

<a href="#">Link to this property</a>

"aborted"

<a href="#">Link to this property</a>

"completed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

target: optional object {bucket, jurisdiction, vendor }

</summary>

bucket: optional string

<a href="#">Link to this property</a>

<details>

<summary>

jurisdiction: optional "default"or "eu"or "us"or "fedramp"

</summary>

One of the following:

"default"

<a href="#">Link to this property</a>

"eu"

<a href="#">Link to this property</a>

"us"

<a href="#">Link to this property</a>

"fedramp"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

vendor: optional <a href="https://developers.cloudflare.com/api/resources/r2#(resource)%20r2.buckets.sippy%20%3E%20(model)%20provider%20%3E%20(schema)">Provider</a>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.super_slurper.jobs%20%3E%20(model)%20job_list_response%20%3E%20(schema)>)

<details>

<summary>

JobGetResponse object {id, createdAt, finishedAt, 4 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

createdAt: optional string

<a href="#">Link to this property</a>

finishedAt: optional string

<a href="#">Link to this property</a>

overwrite: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {bucket, endpoint, keys, 2 more } or object {bucket, keys, pathPrefix, vendor } or object {bucket, jurisdiction, keys, 2 more }

</summary>

One of the following:

<details>

<summary>

S3SourceResponseSchema object {bucket, endpoint, keys, 2 more }

</summary>

bucket: optional string

<a href="#">Link to this property</a>

endpoint: optional string

formaturi

<a href="#">Link to this property</a>

keys: optional array of string

<a href="#">Link to this property</a>

pathPrefix: optional string

<a href="#">Link to this property</a>

vendor: optional "s3"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

GcsSourceResponseSchema object {bucket, keys, pathPrefix, vendor }

</summary>

bucket: optional string

<a href="#">Link to this property</a>

keys: optional array of string

<a href="#">Link to this property</a>

pathPrefix: optional string

<a href="#">Link to this property</a>

vendor: optional "gcs"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

R2SourceResponseSchema object {bucket, jurisdiction, keys, 2 more }

</summary>

bucket: optional string

<a href="#">Link to this property</a>

<details>

<summary>

jurisdiction: optional "default"or "eu"or "us"or "fedramp"

</summary>

One of the following:

"default"

<a href="#">Link to this property</a>

"eu"

<a href="#">Link to this property</a>

"us"

<a href="#">Link to this property</a>

"fedramp"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

keys: optional array of string

<a href="#">Link to this property</a>

pathPrefix: optional string

<a href="#">Link to this property</a>

vendor: optional <a href="https://developers.cloudflare.com/api/resources/r2#(resource)%20r2.buckets.sippy%20%3E%20(model)%20provider%20%3E%20(schema)">Provider</a>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "running"or "paused"or "aborted"or "completed"

</summary>

One of the following:

"running"

<a href="#">Link to this property</a>

"paused"

<a href="#">Link to this property</a>

"aborted"

<a href="#">Link to this property</a>

"completed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

target: optional object {bucket, jurisdiction, vendor }

</summary>

bucket: optional string

<a href="#">Link to this property</a>

<details>

<summary>

jurisdiction: optional "default"or "eu"or "us"or "fedramp"

</summary>

One of the following:

"default"

<a href="#">Link to this property</a>

"eu"

<a href="#">Link to this property</a>

"us"

<a href="#">Link to this property</a>

"fedramp"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

vendor: optional <a href="https://developers.cloudflare.com/api/resources/r2#(resource)%20r2.buckets.sippy%20%3E%20(model)%20provider%20%3E%20(schema)">Provider</a>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.super_slurper.jobs%20%3E%20(model)%20job_get_response%20%3E%20(schema)>)

<details>

<summary>

JobCreateResponse object {id }

</summary>

id: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.super_slurper.jobs%20%3E%20(model)%20job_create_response%20%3E%20(schema)>)

JobAbortAllResponse = string

[Link to this property](#)%20r2.super_slurper.jobs%20%3E%20(model)%20job_abort_all_response%20%3E%20(schema)>)

JobAbortResponse = string

[Link to this property](#)%20r2.super_slurper.jobs%20%3E%20(model)%20job_abort_response%20%3E%20(schema)>)

JobPauseResponse = string

[Link to this property](#)%20r2.super_slurper.jobs%20%3E%20(model)%20job_pause_response%20%3E%20(schema)>)

<details>

<summary>

JobProgressResponse object {id, createdAt, failedObjects, 4 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

createdAt: optional string

<a href="#">Link to this property</a>

failedObjects: optional number

<a href="#">Link to this property</a>

objects: optional number

<a href="#">Link to this property</a>

skippedObjects: optional number

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "running"or "paused"or "aborted"or "completed"

</summary>

One of the following:

"running"

<a href="#">Link to this property</a>

"paused"

<a href="#">Link to this property</a>

"aborted"

<a href="#">Link to this property</a>

"completed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

transferredObjects: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.super_slurper.jobs%20%3E%20(model)%20job_progress_response%20%3E%20(schema)>)

JobResumeResponse = string

[Link to this property](#)%20r2.super_slurper.jobs%20%3E%20(model)%20job_resume_response%20%3E%20(schema)>)

#### JobsLogs

##### [Get job logs](https://developers.cloudflare.com/api/resources/r2/subresources/super_slurper/subresources/jobs/subresources/logs/methods/list)

GET/accounts/{account\_id}/slurper/jobs/{job\_id}/logs

##### ModelsExpand Collapse

<details>

<summary>

LogListResponse object {createdAt, job, logType, 2 more }

</summary>

createdAt: optional string

<a href="#">Link to this property</a>

job: optional string

<a href="#">Link to this property</a>

<details>

<summary>

logType: optional "migrationStart"or "migrationComplete"or "migrationAbort"or 12 more

</summary>

One of the following:

"migrationStart"

<a href="#">Link to this property</a>

"migrationComplete"

<a href="#">Link to this property</a>

"migrationAbort"

<a href="#">Link to this property</a>

"migrationError"

<a href="#">Link to this property</a>

"migrationPause"

<a href="#">Link to this property</a>

"migrationResume"

<a href="#">Link to this property</a>

"migrationErrorFailedContinuation"

<a href="#">Link to this property</a>

"importErrorRetryExhaustion"

<a href="#">Link to this property</a>

"importSkippedStorageClass"

<a href="#">Link to this property</a>

"importSkippedOversized"

<a href="#">Link to this property</a>

"importSkippedEmptyObject"

<a href="#">Link to this property</a>

"importSkippedUnsupportedContentType"

<a href="#">Link to this property</a>

"importSkippedExcludedContentType"

<a href="#">Link to this property</a>

"importSkippedInvalidMedia"

<a href="#">Link to this property</a>

"importSkippedRequiresRetrieval"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

objectKey: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.super_slurper.jobs.logs%20%3E%20(model)%20log_list_response%20%3E%20(schema)>)