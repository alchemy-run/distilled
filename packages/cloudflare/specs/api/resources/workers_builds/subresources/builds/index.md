---
title: Builds
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers Builds](https://developers.cloudflare.com/api/resources/workers_builds)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Builds

##### [List builds for a Worker](https://developers.cloudflare.com/api/resources/workers_builds/subresources/builds/methods/list)

GET/accounts/{account\_id}/builds/workers/{external\_script\_id}/builds

##### [Get a Workers build](https://developers.cloudflare.com/api/resources/workers_builds/subresources/builds/methods/get)

GET/accounts/{account\_id}/builds/builds/{build\_uuid}

##### [Cancel a Workers build](https://developers.cloudflare.com/api/resources/workers_builds/subresources/builds/methods/cancel)

PUT/accounts/{account\_id}/builds/builds/{build\_uuid}/cancel

##### ModelsExpand Collapse

<details>

<summary>

BuildListResponse object {build\_outcome, build\_trigger\_metadata, build\_uuid, 8 more }

</summary>

<details>

<summary>

build\_outcome: optional "success"or "fail"or "skipped"or 2 more

</summary>

One of the following:

"success"

<a href="#">Link to this property</a>

"fail"

<a href="#">Link to this property</a>

"skipped"

<a href="#">Link to this property</a>

"cancelled"

<a href="#">Link to this property</a>

"terminated"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

build\_trigger\_metadata: optional object {author, branch, build\_command, 11 more }

</summary>

author: optional string

<a href="#">Link to this property</a>

branch: optional string

Git branch name.

<a href="#">Link to this property</a>

build\_command: optional string

Command to build the Worker.

<a href="#">Link to this property</a>

build\_token\_name: optional string

<a href="#">Link to this property</a>

build\_token\_uuid: optional string

UUID of the build token used when deploying the Worker.

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

build\_trigger\_source: optional "push"or "pull\_request"or "manual"or "api"

</summary>

One of the following:

"push"

<a href="#">Link to this property</a>

"pull\_request"

<a href="#">Link to this property</a>

"manual"

<a href="#">Link to this property</a>

"api"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

commit\_hash: optional string

Git commit hash

<a href="#">Link to this property</a>

commit\_message: optional string

<a href="#">Link to this property</a>

deploy\_command: optional string

Command to deploy the Worker.

<a href="#">Link to this property</a>

environment\_variables: optional map\[string]

<a href="#">Link to this property</a>

provider\_account\_name: optional string

Human-readable name of the account or namespace that owns the repository.

<a href="#">Link to this property</a>

<details>

<summary>

provider\_type: optional "github"or "gitlab"or "gitlab\_internal"or "origin"

Source control provider.

</summary>

One of the following:

"github"

<a href="#">Link to this property</a>

"gitlab"

<a href="#">Link to this property</a>

"gitlab\_internal"

<a href="#">Link to this property</a>

"origin"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

repo\_name: optional string

Human-readable repository name.

<a href="#">Link to this property</a>

root\_directory: optional string

Repository directory in which build and deploy commands run.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

build\_uuid: optional string

Build UUID.

formatuuid

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

initializing\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

modified\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

pull\_request: optional object {created\_on, pull\_request\_url }

</summary>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

pull\_request\_url: optional string

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

running\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "queued"or "initializing"or "running"or "stopped"

</summary>

One of the following:

"queued"

<a href="#">Link to this property</a>

"initializing"

<a href="#">Link to this property</a>

"running"

<a href="#">Link to this property</a>

"stopped"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

stopped\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

trigger: optional object {branch\_excludes, branch\_includes, build\_caching\_enabled, 12 more }

Trigger information without build\_token\_uuid

</summary>

branch\_excludes: optional array of string

Branch patterns that must not start builds.

<a href="#">Link to this property</a>

branch\_includes: optional array of string

Branch patterns that can start builds.

<a href="#">Link to this property</a>

build\_caching\_enabled: optional boolean

Whether builds reuse cached dependencies and build artifacts.

<a href="#">Link to this property</a>

build\_command: optional string

Command to build the Worker.

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

deleted\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

deploy\_command: optional string

Command to deploy the Worker.

<a href="#">Link to this property</a>

external\_script\_id: optional string

System-generated tag of the Worker. This is not the Worker name.

<a href="#">Link to this property</a>

modified\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

path\_excludes: optional array of string

Path patterns that must not start builds.

<a href="#">Link to this property</a>

path\_includes: optional array of string

Path patterns that can start builds.

<a href="#">Link to this property</a>

<details>

<summary>

repo\_connection: optional object {created\_on, deleted\_on, modified\_on, 6 more }

</summary>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

deleted\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

modified\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

provider\_account\_id: optional string

Provider-specific identifier of the account or namespace that owns the repository.

<a href="#">Link to this property</a>

provider\_account\_name: optional string

Human-readable name of the account or namespace that owns the repository.

<a href="#">Link to this property</a>

<details>

<summary>

provider\_type: optional "github"or "gitlab"or "gitlab\_internal"or "origin"

Source control provider.

</summary>

One of the following:

"github"

<a href="#">Link to this property</a>

"gitlab"

<a href="#">Link to this property</a>

"gitlab\_internal"

<a href="#">Link to this property</a>

"origin"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

repo\_connection\_uuid: optional string

Repository connection UUID.

formatuuid

<a href="#">Link to this property</a>

repo\_id: optional string

Provider-specific repository identifier.

<a href="#">Link to this property</a>

repo\_name: optional string

Human-readable repository name.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

root\_directory: optional string

Repository directory in which build and deploy commands run.

<a href="#">Link to this property</a>

trigger\_name: optional string

Human-readable name of the build trigger.

<a href="#">Link to this property</a>

trigger\_uuid: optional string

Trigger UUID.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers_builds.builds%20%3E%20(model)%20build_list_response%20%3E%20(schema)>)

<details>

<summary>

BuildGetResponse object {build\_outcome, build\_trigger\_metadata, build\_uuid, 8 more }

</summary>

<details>

<summary>

build\_outcome: optional "success"or "fail"or "skipped"or 2 more

</summary>

One of the following:

"success"

<a href="#">Link to this property</a>

"fail"

<a href="#">Link to this property</a>

"skipped"

<a href="#">Link to this property</a>

"cancelled"

<a href="#">Link to this property</a>

"terminated"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

build\_trigger\_metadata: optional object {author, branch, build\_command, 11 more }

</summary>

author: optional string

<a href="#">Link to this property</a>

branch: optional string

Git branch name.

<a href="#">Link to this property</a>

build\_command: optional string

Command to build the Worker.

<a href="#">Link to this property</a>

build\_token\_name: optional string

<a href="#">Link to this property</a>

build\_token\_uuid: optional string

UUID of the build token used when deploying the Worker.

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

build\_trigger\_source: optional "push"or "pull\_request"or "manual"or "api"

</summary>

One of the following:

"push"

<a href="#">Link to this property</a>

"pull\_request"

<a href="#">Link to this property</a>

"manual"

<a href="#">Link to this property</a>

"api"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

commit\_hash: optional string

Git commit hash

<a href="#">Link to this property</a>

commit\_message: optional string

<a href="#">Link to this property</a>

deploy\_command: optional string

Command to deploy the Worker.

<a href="#">Link to this property</a>

environment\_variables: optional map\[string]

<a href="#">Link to this property</a>

provider\_account\_name: optional string

Human-readable name of the account or namespace that owns the repository.

<a href="#">Link to this property</a>

<details>

<summary>

provider\_type: optional "github"or "gitlab"or "gitlab\_internal"or "origin"

Source control provider.

</summary>

One of the following:

"github"

<a href="#">Link to this property</a>

"gitlab"

<a href="#">Link to this property</a>

"gitlab\_internal"

<a href="#">Link to this property</a>

"origin"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

repo\_name: optional string

Human-readable repository name.

<a href="#">Link to this property</a>

root\_directory: optional string

Repository directory in which build and deploy commands run.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

build\_uuid: optional string

Build UUID.

formatuuid

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

initializing\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

modified\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

pull\_request: optional object {created\_on, pull\_request\_url }

</summary>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

pull\_request\_url: optional string

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

running\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "queued"or "initializing"or "running"or "stopped"

</summary>

One of the following:

"queued"

<a href="#">Link to this property</a>

"initializing"

<a href="#">Link to this property</a>

"running"

<a href="#">Link to this property</a>

"stopped"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

stopped\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

trigger: optional object {branch\_excludes, branch\_includes, build\_caching\_enabled, 12 more }

Trigger information without build\_token\_uuid

</summary>

branch\_excludes: optional array of string

Branch patterns that must not start builds.

<a href="#">Link to this property</a>

branch\_includes: optional array of string

Branch patterns that can start builds.

<a href="#">Link to this property</a>

build\_caching\_enabled: optional boolean

Whether builds reuse cached dependencies and build artifacts.

<a href="#">Link to this property</a>

build\_command: optional string

Command to build the Worker.

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

deleted\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

deploy\_command: optional string

Command to deploy the Worker.

<a href="#">Link to this property</a>

external\_script\_id: optional string

System-generated tag of the Worker. This is not the Worker name.

<a href="#">Link to this property</a>

modified\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

path\_excludes: optional array of string

Path patterns that must not start builds.

<a href="#">Link to this property</a>

path\_includes: optional array of string

Path patterns that can start builds.

<a href="#">Link to this property</a>

<details>

<summary>

repo\_connection: optional object {created\_on, deleted\_on, modified\_on, 6 more }

</summary>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

deleted\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

modified\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

provider\_account\_id: optional string

Provider-specific identifier of the account or namespace that owns the repository.

<a href="#">Link to this property</a>

provider\_account\_name: optional string

Human-readable name of the account or namespace that owns the repository.

<a href="#">Link to this property</a>

<details>

<summary>

provider\_type: optional "github"or "gitlab"or "gitlab\_internal"or "origin"

Source control provider.

</summary>

One of the following:

"github"

<a href="#">Link to this property</a>

"gitlab"

<a href="#">Link to this property</a>

"gitlab\_internal"

<a href="#">Link to this property</a>

"origin"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

repo\_connection\_uuid: optional string

Repository connection UUID.

formatuuid

<a href="#">Link to this property</a>

repo\_id: optional string

Provider-specific repository identifier.

<a href="#">Link to this property</a>

repo\_name: optional string

Human-readable repository name.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

root\_directory: optional string

Repository directory in which build and deploy commands run.

<a href="#">Link to this property</a>

trigger\_name: optional string

Human-readable name of the build trigger.

<a href="#">Link to this property</a>

trigger\_uuid: optional string

Trigger UUID.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers_builds.builds%20%3E%20(model)%20build_get_response%20%3E%20(schema)>)

<details>

<summary>

BuildCancelResponse object {build\_outcome, build\_uuid, stopped\_on }

</summary>

<details>

<summary>

build\_outcome: optional "success"or "fail"or "skipped"or 2 more

</summary>

One of the following:

"success"

<a href="#">Link to this property</a>

"fail"

<a href="#">Link to this property</a>

"skipped"

<a href="#">Link to this property</a>

"cancelled"

<a href="#">Link to this property</a>

"terminated"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

build\_uuid: optional string

Build UUID.

formatuuid

<a href="#">Link to this property</a>

stopped\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers_builds.builds%20%3E%20(model)%20build_cancel_response%20%3E%20(schema)>)

#### BuildsLogs

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