---
title: Triggers
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers Builds](https://developers.cloudflare.com/api/resources/workers_builds)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Triggers

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

#### TriggersEnvironment Variables

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