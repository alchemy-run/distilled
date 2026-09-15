---
title: Get repository configuration autofill
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers Builds](https://developers.cloudflare.com/api/resources/workers_builds)

[Repos](https://developers.cloudflare.com/api/resources/workers_builds/subresources/repos)

[Config Autofill](https://developers.cloudflare.com/api/resources/workers_builds/subresources/repos/subresources/config_autofill)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get repository configuration autofill

GET/accounts/{account\_id}/builds/repos/{provider\_type}/{provider\_account\_id}/{repo\_id}/config\_autofill

Analyze repository for automatic configuration detection

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

[Link to this property](#)%20workers_builds.repos.config_autofill%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

<details>

<summary>

provider\_type: "github"or "gitlab"or "gitlab\_internal"or "origin"

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

[Link to this property](#)%20workers_builds.repos.config_autofill%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20provider_type%20%3E%20(schema)>)

provider\_account\_id: string

Provider-specific identifier of the account or namespace that owns the repository.

[Link to this property](#)%20workers_builds.repos.config_autofill%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20provider_account_id%20%3E%20(schema)>)

repo\_id: string

Provider-specific repository identifier.

[Link to this property](#)%20workers_builds.repos.config_autofill%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20repo_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

branch: string

Git branch name.

[Link to this property](#)%20workers_builds.repos.config_autofill%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20branch%20%3E%20(schema)>)

root\_directory: optional string

Repository directory in which build and deploy commands run.

[Link to this property](#)%20workers_builds.repos.config_autofill%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20root_directory%20%3E%20(schema)>)

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

[Link to this property](#)%20workers_builds.repos.config_autofill%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of string

[Link to this property](#)%20workers_builds.repos.config_autofill%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {config\_file, default\_worker\_name, env\_worker\_names, 2 more }

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

[Link to this property](#)%20workers_builds.repos.config_autofill%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20workers_builds.repos.config_autofill%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

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

[Link to this property](#)%20workers_builds.repos.config_autofill%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Get repository configuration autofill

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/repos/$PROVIDER_TYPE/$PROVIDER_ACCOUNT_ID/$REPO_ID/config_autofill \
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
  "result": {
    "config_file": "wrangler.toml",
    "default_worker_name": "my-worker",
    "env_worker_names": {
      "production": "my-worker-prod",
      "staging": "my-worker-staging"
    },
    "package_manager": "npm",
    "scripts": {
      "build": "npm run build",
      "test": "npm test"
    }
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
    "config_file": "wrangler.toml",
    "default_worker_name": "my-worker",
    "env_worker_names": {
      "production": "my-worker-prod",
      "staging": "my-worker-staging"
    },
    "package_manager": "npm",
    "scripts": {
      "build": "npm run build",
      "test": "npm test"
    }
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