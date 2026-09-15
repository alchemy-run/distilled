---
title: Start a Workers build
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers Builds](https://developers.cloudflare.com/api/resources/workers_builds)

[Triggers](https://developers.cloudflare.com/api/resources/workers_builds/subresources/triggers)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Start a Workers build

POST/accounts/{account\_id}/builds/triggers/{trigger\_uuid}/builds

Start a build for a branch or commit using the selected trigger.

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

[Link to this property](#)%20workers_builds.triggers%20%3E%20(method)%20create_build%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

trigger\_uuid: string

Trigger UUID.

formatuuid

[Link to this property](#)%20workers_builds.triggers%20%3E%20(method)%20create_build%20%3E%20(params)%20default%20%3E%20(param)%20trigger_uuid%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

branch: optional string

Git branch name (required if commit\_hash not provided)

[Link to this property](#)%20workers_builds.triggers%20%3E%20(method)%20create_build%20%3E%20(params)%200%20%3E%20(param)%20branch%20%3E%20(schema)>)

commit\_hash: optional string

Git commit hash (required if branch not provided)

[Link to this property](#)%20workers_builds.triggers%20%3E%20(method)%20create_build%20%3E%20(params)%200%20%3E%20(param)%20commit_hash%20%3E%20(schema)>)

<details>

<summary>

seed\_repo: optional object {owner, provider, repository, 3 more }

Optional repository and file overrides used to seed this build.

</summary>

owner: string

Repository owner or namespace.

<a href="#">Link to this property</a>

<details>

<summary>

provider: "github"or "gitlab"

Source control provider for the seed repository.

</summary>

One of the following:

"github"

<a href="#">Link to this property</a>

"gitlab"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

repository: string

Repository name.

<a href="#">Link to this property</a>

branch: optional string

Repository branch to seed.

<a href="#">Link to this property</a>

<details>

<summary>

files: optional array of object {content, filename, isBase64, replace }

Files to add or replace for this build. Maximum 2.

</summary>

content: string

<a href="#">Link to this property</a>

filename: string

<a href="#">Link to this property</a>

isBase64: optional boolean

Whether content is Base64-encoded.

<a href="#">Link to this property</a>

replace: optional string

Existing text in the target file to replace with content.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

path: optional string

Path within the repository to seed.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers_builds.triggers%20%3E%20(method)%20create_build%20%3E%20(params)%200%20%3E%20(param)%20seed_repo%20%3E%20(schema)>)

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

[Link to this property](#)%20workers_builds.triggers%20%3E%20(method)%20create_build%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of string

[Link to this property](#)%20workers_builds.triggers%20%3E%20(method)%20create_build%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {build\_uuid, created\_on }

</summary>

build\_uuid: optional string

Build UUID.

formatuuid

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers_builds.triggers%20%3E%20(method)%20create_build%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20workers_builds.triggers%20%3E%20(method)%20create_build%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

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

[Link to this property](#)%20workers_builds.triggers%20%3E%20(method)%20create_build%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Start a Workers build

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/triggers/$TRIGGER_UUID/builds \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "branch": "main",
          "commit_hash": "abc123def456"
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
    "build_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_on": "2019-12-27T18:11:19.117Z"
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
    "build_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_on": "2019-12-27T18:11:19.117Z"
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