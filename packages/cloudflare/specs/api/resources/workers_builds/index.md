---
title: Workers Builds
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Workers Builds

##### [Get latest builds by script IDs](https://developers.cloudflare.com/api/resources/workers_builds/methods/get_latest_builds)

GET/accounts/{account\_id}/builds/builds/latest

##### [Get builds by Worker version](https://developers.cloudflare.com/api/resources/workers_builds/methods/get_builds_by_version)

GET/accounts/{account\_id}/builds/builds

##### [Get build-minute availability](https://developers.cloudflare.com/api/resources/workers_builds/methods/get_account_limits)

GET/accounts/{account\_id}/builds/account/limits

##### ModelsExpand Collapse

<details>

<summary>

WorkersBuildGetLatestBuildsResponse object {builds }

</summary>

<details>

<summary>

builds: optional map\[object {build\_outcome, build\_trigger\_metadata, build\_uuid, 8 more } ]

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

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers_builds%20%3E%20(model)%20workers_build_get_latest_builds_response%20%3E%20(schema)>)

<details>

<summary>

WorkersBuildGetBuildsByVersionResponse object {builds }

</summary>

<details>

<summary>

builds: optional map\[object {build\_outcome, build\_trigger\_metadata, build\_uuid, 8 more } ]

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

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers_builds%20%3E%20(model)%20workers_build_get_builds_by_version_response%20%3E%20(schema)>)

<details>

<summary>

WorkersBuildGetAccountLimitsResponse object {build\_minutes\_refresh\_on, has\_reached\_build\_minutes\_limit }

</summary>

build\_minutes\_refresh\_on: optional string

When build minutes will refresh (only for non-paid plans)

formatdate-time

<a href="#">Link to this property</a>

has\_reached\_build\_minutes\_limit: optional boolean

Whether build minutes limit has been reached (only for non-paid plans)

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers_builds%20%3E%20(model)%20workers_build_get_account_limits_response%20%3E%20(schema)>)

#### Workers BuildsTriggers

##### [List triggers for a Worker](https://developers.cloudflare.com/api/resources/workers_builds/subresources/triggers/methods/list)

GET/accounts/{account\_id}/builds/workers/{external\_script\_id}/triggers

##### [Create a build trigger](https://developers.cloudflare.com/api/resources/workers_builds/subresources/triggers/methods/create)

POST/accounts/{account\_id}/builds/triggers

##### [Update a build trigger](https://developers.cloudflare.com/api/resources/workers_builds/subresources/triggers/methods/update)

PATCH/accounts/{account\_id}/builds/triggers/{trigger\_uuid}

##### [Delete a build trigger](https://developers.cloudflare.com/api/resources/workers_builds/subresources/triggers/methods/delete)

DELETE/accounts/{account\_id}/builds/triggers/{trigger\_uuid}

##### [Purge a trigger's build cache](https://developers.cloudflare.com/api/resources/workers_builds/subresources/triggers/methods/purge_cache)

POST/accounts/{account\_id}/builds/triggers/{trigger\_uuid}/purge\_build\_cache

##### [Start a Workers build](https://developers.cloudflare.com/api/resources/workers_builds/subresources/triggers/methods/create_build)

POST/accounts/{account\_id}/builds/triggers/{trigger\_uuid}/builds

##### ModelsExpand Collapse

<details>

<summary>

TriggerListResponse object {branch\_excludes, branch\_includes, build\_caching\_enabled, 14 more }

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

build\_token\_name: optional string

<a href="#">Link to this property</a>

build\_token\_uuid: optional string

UUID of the build token used when deploying the Worker.

formatuuid

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

[Link to this property](#)%20workers_builds.triggers%20%3E%20(model)%20trigger_list_response%20%3E%20(schema)>)

<details>

<summary>

TriggerCreateResponse object {branch\_excludes, branch\_includes, build\_caching\_enabled, 14 more }

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

build\_token\_name: optional string

<a href="#">Link to this property</a>

build\_token\_uuid: optional string

UUID of the build token used when deploying the Worker.

formatuuid

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

[Link to this property](#)%20workers_builds.triggers%20%3E%20(model)%20trigger_create_response%20%3E%20(schema)>)

<details>

<summary>

TriggerUpdateResponse object {branch\_excludes, branch\_includes, build\_caching\_enabled, 14 more }

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

build\_token\_name: optional string

<a href="#">Link to this property</a>

build\_token\_uuid: optional string

UUID of the build token used when deploying the Worker.

formatuuid

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

[Link to this property](#)%20workers_builds.triggers%20%3E%20(model)%20trigger_update_response%20%3E%20(schema)>)

TriggerDeleteResponse = unknown

[Link to this property](#)%20workers_builds.triggers%20%3E%20(model)%20trigger_delete_response%20%3E%20(schema)>)

TriggerPurgeCacheResponse = unknown

[Link to this property](#)%20workers_builds.triggers%20%3E%20(model)%20trigger_purge_cache_response%20%3E%20(schema)>)

<details>

<summary>

TriggerCreateBuildResponse object {build\_uuid, created\_on }

</summary>

build\_uuid: optional string

Build UUID.

formatuuid

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers_builds.triggers%20%3E%20(model)%20trigger_create_build_response%20%3E%20(schema)>)

#### Workers BuildsTriggersEnvironment Variables

##### [List build variables](https://developers.cloudflare.com/api/resources/workers_builds/subresources/triggers/subresources/environment_variables/methods/list)

GET/accounts/{account\_id}/builds/triggers/{trigger\_uuid}/environment\_variables

##### [Set build variables](https://developers.cloudflare.com/api/resources/workers_builds/subresources/triggers/subresources/environment_variables/methods/upsert)

PATCH/accounts/{account\_id}/builds/triggers/{trigger\_uuid}/environment\_variables

##### [Delete a build variable](https://developers.cloudflare.com/api/resources/workers_builds/subresources/triggers/subresources/environment_variables/methods/delete)

DELETE/accounts/{account\_id}/builds/triggers/{trigger\_uuid}/environment\_variables/{environment\_variable\_key}

##### ModelsExpand Collapse

<details>

<summary>

EnvironmentVariableListResponse = map\[object {created\_on, is\_secret, value } ]

</summary>

created\_on: string

formatdate-time

<a href="#">Link to this property</a>

is\_secret: boolean

Whether to hide the value after it is saved. Secret values remain available to builds but appear as <code>null</code> when you list variables; non-secret values remain visible.

<a href="#">Link to this property</a>

value: optional string

Value is null for secret environment variables

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers_builds.triggers.environment_variables%20%3E%20(model)%20environment_variable_list_response%20%3E%20(schema)>)

<details>

<summary>

EnvironmentVariableUpsertResponse = map\[object {created\_on, is\_secret, value } ]

</summary>

created\_on: string

formatdate-time

<a href="#">Link to this property</a>

is\_secret: boolean

Whether to hide the value after it is saved. Secret values remain available to builds but appear as <code>null</code> when you list variables; non-secret values remain visible.

<a href="#">Link to this property</a>

value: optional string

Value is null for secret environment variables

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers_builds.triggers.environment_variables%20%3E%20(model)%20environment_variable_upsert_response%20%3E%20(schema)>)

EnvironmentVariableDeleteResponse = unknown

[Link to this property](#)%20workers_builds.triggers.environment_variables%20%3E%20(model)%20environment_variable_delete_response%20%3E%20(schema)>)

#### Workers BuildsDeploy Hooks

##### [List deploy hooks](https://developers.cloudflare.com/api/resources/workers_builds/subresources/deploy_hooks/methods/list)

GET/accounts/{account\_id}/builds/workers/{script\_name}/deploy\_hooks

##### [Create a deploy hook](https://developers.cloudflare.com/api/resources/workers_builds/subresources/deploy_hooks/methods/create)

POST/accounts/{account\_id}/builds/workers/{script\_name}/deploy\_hooks

##### [Get a deploy hook](https://developers.cloudflare.com/api/resources/workers_builds/subresources/deploy_hooks/methods/get)

GET/accounts/{account\_id}/builds/workers/{script\_name}/deploy\_hooks/{deploy\_hook\_uuid}

##### [Update a deploy hook](https://developers.cloudflare.com/api/resources/workers_builds/subresources/deploy_hooks/methods/update)

PUT/accounts/{account\_id}/builds/workers/{script\_name}/deploy\_hooks/{deploy\_hook\_uuid}

##### [Delete a deploy hook](https://developers.cloudflare.com/api/resources/workers_builds/subresources/deploy_hooks/methods/delete)

DELETE/accounts/{account\_id}/builds/workers/{script\_name}/deploy\_hooks/{deploy\_hook\_uuid}

##### [Trigger deploy hook](https://developers.cloudflare.com/api/resources/workers_builds/subresources/deploy_hooks/methods/trigger)

POST/workers/builds/deploy\_hooks/{deploy\_hook\_uuid}

##### ModelsExpand Collapse

<details>

<summary>

DeployHookListResponse object {branch, created\_on, deploy\_hook\_name, 4 more }

</summary>

branch: optional string

Git branch name.

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

deploy\_hook\_name: optional string

Deploy hook name (1-58 characters).

maxLength58

minLength1

<a href="#">Link to this property</a>

deploy\_hook\_uuid: optional string

Deploy hook UUID.

formatuuid

<a href="#">Link to this property</a>

external\_script\_id: optional string

System-generated tag of the Worker. This is not the Worker name.

<a href="#">Link to this property</a>

<details>

<summary>

latest\_build: optional object {created\_on }

</summary>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers_builds.deploy_hooks%20%3E%20(model)%20deploy_hook_list_response%20%3E%20(schema)>)

<details>

<summary>

DeployHookCreateResponse object {branch, created\_on, deploy\_hook\_name, 3 more }

</summary>

branch: optional string

Git branch name.

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

deploy\_hook\_name: optional string

Deploy hook name (1-58 characters).

maxLength58

minLength1

<a href="#">Link to this property</a>

deploy\_hook\_uuid: optional string

Deploy hook UUID.

formatuuid

<a href="#">Link to this property</a>

external\_script\_id: optional string

System-generated tag of the Worker. This is not the Worker name.

<a href="#">Link to this property</a>

modified\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers_builds.deploy_hooks%20%3E%20(model)%20deploy_hook_create_response%20%3E%20(schema)>)

<details>

<summary>

DeployHookGetResponse object {branch, created\_on, deploy\_hook\_name, 3 more }

</summary>

branch: optional string

Git branch name.

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

deploy\_hook\_name: optional string

Deploy hook name (1-58 characters).

maxLength58

minLength1

<a href="#">Link to this property</a>

deploy\_hook\_uuid: optional string

Deploy hook UUID.

formatuuid

<a href="#">Link to this property</a>

external\_script\_id: optional string

System-generated tag of the Worker. This is not the Worker name.

<a href="#">Link to this property</a>

modified\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers_builds.deploy_hooks%20%3E%20(model)%20deploy_hook_get_response%20%3E%20(schema)>)

<details>

<summary>

DeployHookUpdateResponse object {branch, created\_on, deploy\_hook\_name, 3 more }

</summary>

branch: optional string

Git branch name.

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

deploy\_hook\_name: optional string

Deploy hook name (1-58 characters).

maxLength58

minLength1

<a href="#">Link to this property</a>

deploy\_hook\_uuid: optional string

Deploy hook UUID.

formatuuid

<a href="#">Link to this property</a>

external\_script\_id: optional string

System-generated tag of the Worker. This is not the Worker name.

<a href="#">Link to this property</a>

modified\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers_builds.deploy_hooks%20%3E%20(model)%20deploy_hook_update_response%20%3E%20(schema)>)

<details>

<summary>

DeployHookDeleteResponse object {branch, created\_on, deploy\_hook\_name, 3 more }

</summary>

branch: optional string

Git branch name.

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

deploy\_hook\_name: optional string

Deploy hook name (1-58 characters).

maxLength58

minLength1

<a href="#">Link to this property</a>

deploy\_hook\_uuid: optional string

Deploy hook UUID.

formatuuid

<a href="#">Link to this property</a>

external\_script\_id: optional string

System-generated tag of the Worker. This is not the Worker name.

<a href="#">Link to this property</a>

modified\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers_builds.deploy_hooks%20%3E%20(model)%20deploy_hook_delete_response%20%3E%20(schema)>)

<details>

<summary>

DeployHookTriggerResponse object {already\_exists, build\_uuid, created\_on, status }

</summary>

already\_exists: optional boolean

True if a pending build already exists for this branch

<a href="#">Link to this property</a>

build\_uuid: optional string

Build UUID.

formatuuid

<a href="#">Link to this property</a>

created\_on: optional string

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

</details>

[Link to this property](#)%20workers_builds.deploy_hooks%20%3E%20(model)%20deploy_hook_trigger_response%20%3E%20(schema)>)

#### Workers BuildsTokens

##### [Create build token](https://developers.cloudflare.com/api/resources/workers_builds/subresources/tokens/methods/create)

POST/accounts/{account\_id}/builds/tokens

##### [List build tokens](https://developers.cloudflare.com/api/resources/workers_builds/subresources/tokens/methods/list)

GET/accounts/{account\_id}/builds/tokens

##### [Delete a build token](https://developers.cloudflare.com/api/resources/workers_builds/subresources/tokens/methods/delete)

DELETE/accounts/{account\_id}/builds/tokens/{build\_token\_uuid}

##### ModelsExpand Collapse

<details>

<summary>

TokenCreateResponse object {build\_token\_name, build\_token\_uuid, cloudflare\_token\_id, owner\_type }

</summary>

build\_token\_name: optional string

<a href="#">Link to this property</a>

build\_token\_uuid: optional string

UUID of the build token used when deploying the Worker.

formatuuid

<a href="#">Link to this property</a>

cloudflare\_token\_id: optional string

<a href="#">Link to this property</a>

owner\_type: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers_builds.tokens%20%3E%20(model)%20token_create_response%20%3E%20(schema)>)

<details>

<summary>

TokenListResponse object {build\_token\_name, build\_token\_uuid, cloudflare\_token\_id, owner\_type }

</summary>

build\_token\_name: optional string

<a href="#">Link to this property</a>

build\_token\_uuid: optional string

UUID of the build token used when deploying the Worker.

formatuuid

<a href="#">Link to this property</a>

cloudflare\_token\_id: optional string

<a href="#">Link to this property</a>

owner\_type: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers_builds.tokens%20%3E%20(model)%20token_list_response%20%3E%20(schema)>)

TokenDeleteResponse = unknown

[Link to this property](#)%20workers_builds.tokens%20%3E%20(model)%20token_delete_response%20%3E%20(schema)>)

#### Workers BuildsRepos

#### Workers BuildsReposConnections

##### [Create or update a repository connection](https://developers.cloudflare.com/api/resources/workers_builds/subresources/repos/subresources/connections/methods/upsert)

PUT/accounts/{account\_id}/builds/repos/connections

##### [Delete a repository connection](https://developers.cloudflare.com/api/resources/workers_builds/subresources/repos/subresources/connections/methods/delete)

DELETE/accounts/{account\_id}/builds/repos/connections/{repo\_connection\_uuid}

##### ModelsExpand Collapse

<details>

<summary>

ConnectionUpsertResponse object {created\_on, deleted\_on, modified\_on, 6 more }

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

[Link to this property](#)%20workers_builds.repos.connections%20%3E%20(model)%20connection_upsert_response%20%3E%20(schema)>)

ConnectionDeleteResponse = unknown

[Link to this property](#)%20workers_builds.repos.connections%20%3E%20(model)%20connection_delete_response%20%3E%20(schema)>)

#### Workers BuildsReposConfig Autofill

##### [Get repository configuration autofill](https://developers.cloudflare.com/api/resources/workers_builds/subresources/repos/subresources/config_autofill/methods/get)

GET/accounts/{account\_id}/builds/repos/{provider\_type}/{provider\_account\_id}/{repo\_id}/config\_autofill

##### ModelsExpand Collapse

<details>

<summary>

ConfigAutofillGetResponse object {config\_file, default\_worker\_name, env\_worker\_names, 2 more }

</summary>

config\_file: optional string

<a href="#">Link to this property</a>

default\_worker\_name: optional string

<a href="#">Link to this property</a>

env\_worker\_names: optional map\[string]

<a href="#">Link to this property</a>

<details>

<summary>

package\_manager: optional "npm"or "yarn"or "pnpm"or 2 more

Package manager inferred from repository lockfiles; defaults to npm when none is detected.

</summary>

One of the following:

"npm"

<a href="#">Link to this property</a>

"yarn"

<a href="#">Link to this property</a>

"pnpm"

<a href="#">Link to this property</a>

"bun"

<a href="#">Link to this property</a>

"uv"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

scripts: optional map\[string]

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers_builds.repos.config_autofill%20%3E%20(model)%20config_autofill_get_response%20%3E%20(schema)>)

#### Workers BuildsBuilds

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

#### Workers BuildsBuildsLogs

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