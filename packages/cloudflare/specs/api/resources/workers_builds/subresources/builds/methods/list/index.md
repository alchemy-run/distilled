---
title: List builds for a Worker
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers Builds](https://developers.cloudflare.com/api/resources/workers_builds)

[Builds](https://developers.cloudflare.com/api/resources/workers_builds/subresources/builds)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List builds for a Worker

GET/accounts/{account\_id}/builds/workers/{external\_script\_id}/builds

List paginated build records associated with a Worker tag.

##### Security

<details>

<summary>API Token</summary>



The preferred authorization scheme for interacting with the Cloudflare API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/create-token/">Create a token</a>.

**Example:**<code>Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY</code>

</details>

<details>

<summary>API Email + API Key</summary>



The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**<code>X-Auth-Email: user@example.com</code>

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**<code>X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194</code>

</details>

##### Accepted Permissions (at least one required)

`Workers CI Write``Workers CI Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account identifier.

[Link to this property](#)%20workers_builds.builds%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

external\_script\_id: string

System-generated tag of the Worker. This is not the Worker name.

[Link to this property](#)%20workers_builds.builds%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20external_script_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

page: optional number

Page number for pagination

minimum1

[Link to this property](#)%20workers_builds.builds%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Number of items per page

maximum200

minimum1

[Link to this property](#)%20workers_builds.builds%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message }

</summary>

code: optional number

<a href="#">Link to this property</a>

message: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers_builds.builds%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of string

[Link to this property](#)%20workers_builds.builds%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {build\_outcome, build\_trigger\_metadata, build\_uuid, 8 more }

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

[Link to this property](#)%20workers_builds.builds%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20workers_builds.builds%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, 2 more }

</summary>

count: optional number

<a href="#">Link to this property</a>

page: optional number

<a href="#">Link to this property</a>

per\_page: optional number

<a href="#">Link to this property</a>

total\_count: optional number

<a href="#">Link to this property</a>

total\_pages: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers_builds.builds%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List builds for a Worker

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/workers/$EXTERNAL_SCRIPT_ID/builds \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

401 example

```
{
  "errors": [
    {
      "code": 12000,
      "message": "Not found"
    }
  ],
  "messages": [
    "string"
  ],
  "result": [
    {
      "build_outcome": "success",
      "build_trigger_metadata": {
        "author": "developer@cloudflare.com",
        "branch": "main",
        "build_command": "npm run build",
        "build_token_name": "My Build Token",
        "build_token_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "build_trigger_source": "push",
        "commit_hash": "abc123def456",
        "commit_message": "Add new feature",
        "deploy_command": "npx wrangler deploy",
        "environment_variables": {
          "foo": "string"
        },
        "provider_account_name": "Cloudflare",
        "provider_type": "github",
        "repo_name": "workers-sdk",
        "root_directory": "/"
      },
      "build_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "created_on": "2019-12-27T18:11:19.117Z",
      "initializing_on": "2019-12-27T18:11:19.117Z",
      "modified_on": "2019-12-27T18:11:19.117Z",
      "pull_request": {
        "created_on": "2019-12-27T18:11:19.117Z",
        "pull_request_url": "https://github.com/cloudflare/workers-sdk/pull/123"
      },
      "running_on": "2019-12-27T18:11:19.117Z",
      "status": "running",
      "stopped_on": "2019-12-27T18:11:19.117Z",
      "trigger": {
        "branch_excludes": [
          "string"
        ],
        "branch_includes": [
          "main"
        ],
        "build_caching_enabled": false,
        "build_command": "npm run build",
        "created_on": "2019-12-27T18:11:19.117Z",
        "deleted_on": "2019-12-27T18:11:19.117Z",
        "deploy_command": "npx wrangler deploy",
        "external_script_id": "dd7160bb9cef458093557736f4b9e75b",
        "modified_on": "2019-12-27T18:11:19.117Z",
        "path_excludes": [
          "*.md"
        ],
        "path_includes": [
          "*"
        ],
        "repo_connection": {
          "created_on": "2019-12-27T18:11:19.117Z",
          "deleted_on": "2019-12-27T18:11:19.117Z",
          "modified_on": "2019-12-27T18:11:19.117Z",
          "provider_account_id": "cloudflare",
          "provider_account_name": "Cloudflare",
          "provider_type": "github",
          "repo_connection_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "repo_id": "workers-sdk",
          "repo_name": "workers-sdk"
        },
        "root_directory": "/",
        "trigger_name": "Production Deploy",
        "trigger_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      }
    }
  ],
  "success": true,
  "result_info": {
    "count": 25,
    "page": 1,
    "per_page": 50,
    "total_count": 150,
    "total_pages": 3
  }
}
```

```
{
  "errors": [
    {
      "code": 12005,
      "message": "Missing token from authorization header"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

##### Returns Examples

200 example

401 example

```
{
  "errors": [
    {
      "code": 12000,
      "message": "Not found"
    }
  ],
  "messages": [
    "string"
  ],
  "result": [
    {
      "build_outcome": "success",
      "build_trigger_metadata": {
        "author": "developer@cloudflare.com",
        "branch": "main",
        "build_command": "npm run build",
        "build_token_name": "My Build Token",
        "build_token_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "build_trigger_source": "push",
        "commit_hash": "abc123def456",
        "commit_message": "Add new feature",
        "deploy_command": "npx wrangler deploy",
        "environment_variables": {
          "foo": "string"
        },
        "provider_account_name": "Cloudflare",
        "provider_type": "github",
        "repo_name": "workers-sdk",
        "root_directory": "/"
      },
      "build_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "created_on": "2019-12-27T18:11:19.117Z",
      "initializing_on": "2019-12-27T18:11:19.117Z",
      "modified_on": "2019-12-27T18:11:19.117Z",
      "pull_request": {
        "created_on": "2019-12-27T18:11:19.117Z",
        "pull_request_url": "https://github.com/cloudflare/workers-sdk/pull/123"
      },
      "running_on": "2019-12-27T18:11:19.117Z",
      "status": "running",
      "stopped_on": "2019-12-27T18:11:19.117Z",
      "trigger": {
        "branch_excludes": [
          "string"
        ],
        "branch_includes": [
          "main"
        ],
        "build_caching_enabled": false,
        "build_command": "npm run build",
        "created_on": "2019-12-27T18:11:19.117Z",
        "deleted_on": "2019-12-27T18:11:19.117Z",
        "deploy_command": "npx wrangler deploy",
        "external_script_id": "dd7160bb9cef458093557736f4b9e75b",
        "modified_on": "2019-12-27T18:11:19.117Z",
        "path_excludes": [
          "*.md"
        ],
        "path_includes": [
          "*"
        ],
        "repo_connection": {
          "created_on": "2019-12-27T18:11:19.117Z",
          "deleted_on": "2019-12-27T18:11:19.117Z",
          "modified_on": "2019-12-27T18:11:19.117Z",
          "provider_account_id": "cloudflare",
          "provider_account_name": "Cloudflare",
          "provider_type": "github",
          "repo_connection_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "repo_id": "workers-sdk",
          "repo_name": "workers-sdk"
        },
        "root_directory": "/",
        "trigger_name": "Production Deploy",
        "trigger_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      }
    }
  ],
  "success": true,
  "result_info": {
    "count": 25,
    "page": 1,
    "per_page": 50,
    "total_count": 150,
    "total_pages": 3
  }
}
```

```
{
  "errors": [
    {
      "code": 12005,
      "message": "Missing token from authorization header"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```