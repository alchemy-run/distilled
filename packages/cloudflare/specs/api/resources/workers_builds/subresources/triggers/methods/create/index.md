---
title: Create a build trigger
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers Builds](https://developers.cloudflare.com/api/resources/workers_builds)

[Triggers](https://developers.cloudflare.com/api/resources/workers_builds/subresources/triggers)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create a build trigger

POST/accounts/{account\_id}/builds/triggers

Create a trigger defining the repository connection, Worker tag, commands, filters, cache setting, and build token.

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

`Workers CI Write`

##### P ath ParametersExpand Collapse

account\_id: string

Account identifier.

[Link to this property](#)%20workers_builds.triggers%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

branch\_excludes: array of string

Branch patterns that must not start builds.

[Link to this property](#)%20workers_builds.triggers%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20branch_excludes%20%3E%20(schema)>)

branch\_includes: array of string

Branch patterns that can start builds.

[Link to this property](#)%20workers_builds.triggers%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20branch_includes%20%3E%20(schema)>)

build\_command: string

Command to build the Worker.

[Link to this property](#)%20workers_builds.triggers%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20build_command%20%3E%20(schema)>)

build\_token\_uuid: string

UUID of the build token used when deploying the Worker.

formatuuid

[Link to this property](#)%20workers_builds.triggers%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20build_token_uuid%20%3E%20(schema)>)

deploy\_command: string

Command to deploy the Worker.

[Link to this property](#)%20workers_builds.triggers%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20deploy_command%20%3E%20(schema)>)

external\_script\_id: string

System-generated tag of the Worker. This is not the Worker name.

[Link to this property](#)%20workers_builds.triggers%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20external_script_id%20%3E%20(schema)>)

path\_excludes: array of string

Path patterns that must not start builds.

[Link to this property](#)%20workers_builds.triggers%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20path_excludes%20%3E%20(schema)>)

path\_includes: array of string

Path patterns that can start builds.

[Link to this property](#)%20workers_builds.triggers%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20path_includes%20%3E%20(schema)>)

repo\_connection\_uuid: string

Repository connection UUID.

formatuuid

[Link to this property](#)%20workers_builds.triggers%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20repo_connection_uuid%20%3E%20(schema)>)

root\_directory: string

Repository directory in which build and deploy commands run.

[Link to this property](#)%20workers_builds.triggers%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20root_directory%20%3E%20(schema)>)

trigger\_name: string

Human-readable name of the build trigger.

[Link to this property](#)%20workers_builds.triggers%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20trigger_name%20%3E%20(schema)>)

build\_caching\_enabled: optional boolean

Whether builds reuse cached dependencies and build artifacts.

[Link to this property](#)%20workers_builds.triggers%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20build_caching_enabled%20%3E%20(schema)>)

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

[Link to this property](#)%20workers_builds.triggers%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of string

[Link to this property](#)%20workers_builds.triggers%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {branch\_excludes, branch\_includes, build\_caching\_enabled, 14 more }

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

[Link to this property](#)%20workers_builds.triggers%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20workers_builds.triggers%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

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

[Link to this property](#)%20workers_builds.triggers%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Create a build trigger

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/triggers \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "branch_excludes": [
            "string"
          ],
          "branch_includes": [
            "main"
          ],
          "build_command": "npm run build",
          "build_token_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "deploy_command": "npx wrangler deploy",
          "external_script_id": "dd7160bb9cef458093557736f4b9e75b",
          "path_excludes": [
            "*.md"
          ],
          "path_includes": [
            "*"
          ],
          "repo_connection_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
          "root_directory": "/",
          "trigger_name": "Production Deploy"
        }'
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
  "result": {
    "branch_excludes": [
      "string"
    ],
    "branch_includes": [
      "main"
    ],
    "build_caching_enabled": false,
    "build_command": "npm run build",
    "build_token_name": "My Build Token",
    "build_token_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
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
  },
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
  "result": {
    "branch_excludes": [
      "string"
    ],
    "branch_includes": [
      "main"
    ],
    "build_caching_enabled": false,
    "build_command": "npm run build",
    "build_token_name": "My Build Token",
    "build_token_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
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
  },
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