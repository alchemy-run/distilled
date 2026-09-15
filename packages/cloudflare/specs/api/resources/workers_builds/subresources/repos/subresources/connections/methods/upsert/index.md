---
title: Create or update a repository connection
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers Builds](https://developers.cloudflare.com/api/resources/workers_builds)

[Repos](https://developers.cloudflare.com/api/resources/workers_builds/subresources/repos)

[Connections](https://developers.cloudflare.com/api/resources/workers_builds/subresources/repos/subresources/connections)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create or update a repository connection

PUT/accounts/{account\_id}/builds/repos/connections

Save the repository connection required by build triggers.

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

[Link to this property](#)%20workers_builds.repos.connections%20%3E%20(method)%20upsert%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

provider\_account\_id: string

Provider-specific identifier of the account or namespace that owns the repository.

[Link to this property](#)%20workers_builds.repos.connections%20%3E%20(method)%20upsert%20%3E%20(params)%200%20%3E%20(param)%20provider_account_id%20%3E%20(schema)>)

provider\_account\_name: string

Human-readable name of the account or namespace that owns the repository.

[Link to this property](#)%20workers_builds.repos.connections%20%3E%20(method)%20upsert%20%3E%20(params)%200%20%3E%20(param)%20provider_account_name%20%3E%20(schema)>)

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

[Link to this property](#)%20workers_builds.repos.connections%20%3E%20(method)%20upsert%20%3E%20(params)%200%20%3E%20(param)%20provider_type%20%3E%20(schema)>)

repo\_id: string

Provider-specific repository identifier.

[Link to this property](#)%20workers_builds.repos.connections%20%3E%20(method)%20upsert%20%3E%20(params)%200%20%3E%20(param)%20repo_id%20%3E%20(schema)>)

repo\_name: string

Human-readable repository name.

[Link to this property](#)%20workers_builds.repos.connections%20%3E%20(method)%20upsert%20%3E%20(params)%200%20%3E%20(param)%20repo_name%20%3E%20(schema)>)

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

[Link to this property](#)%20workers_builds.repos.connections%20%3E%20(method)%20upsert%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of string

[Link to this property](#)%20workers_builds.repos.connections%20%3E%20(method)%20upsert%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {created\_on, deleted\_on, modified\_on, 6 more }

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

[Link to this property](#)%20workers_builds.repos.connections%20%3E%20(method)%20upsert%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20workers_builds.repos.connections%20%3E%20(method)%20upsert%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

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

[Link to this property](#)%20workers_builds.repos.connections%20%3E%20(method)%20upsert%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Create or update a repository connection

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/repos/connections \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "provider_account_id": "cloudflare",
          "provider_account_name": "Cloudflare",
          "provider_type": "github",
          "repo_id": "workers-sdk",
          "repo_name": "workers-sdk"
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