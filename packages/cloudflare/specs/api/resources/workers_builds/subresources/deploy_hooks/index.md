---
title: Deploy Hooks
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers Builds](https://developers.cloudflare.com/api/resources/workers_builds)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Deploy Hooks

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