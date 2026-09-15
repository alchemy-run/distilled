---
title: Trigger deploy hook
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers Builds](https://developers.cloudflare.com/api/resources/workers_builds)

[Deploy Hooks](https://developers.cloudflare.com/api/resources/workers_builds/subresources/deploy_hooks)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Trigger deploy hook

POST/workers/builds/deploy\_hooks/{deploy\_hook\_uuid}

Trigger a build using a deploy hook. This endpoint does not require authentication - the deploy\_hook\_uuid acts as a secret token.

##### Security

<details>

<summary>API Token</summary>



The preferred authorization scheme for interacting with the Cloudflare API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/create-token/">Create a token</a>.

**Example:**<code>Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY</code>

</details>

<details>

<summary></summary>



</details>

##### P ath ParametersExpand Collapse

deploy\_hook\_uuid: string

Deploy hook UUID.

formatuuid

[Link to this property](#)%20workers_builds.deploy_hooks%20%3E%20(method)%20trigger%20%3E%20(params)%20default%20%3E%20(param)%20deploy_hook_uuid%20%3E%20(schema)>)

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

[Link to this property](#)%20workers_builds.deploy_hooks%20%3E%20(method)%20trigger%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of string

[Link to this property](#)%20workers_builds.deploy_hooks%20%3E%20(method)%20trigger%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {already\_exists, build\_uuid, created\_on, status }

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

[Link to this property](#)%20workers_builds.deploy_hooks%20%3E%20(method)%20trigger%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20workers_builds.deploy_hooks%20%3E%20(method)%20trigger%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

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

[Link to this property](#)%20workers_builds.deploy_hooks%20%3E%20(method)%20trigger%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Trigger deploy hook

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/workers/builds/deploy_hooks/$DEPLOY_HOOK_UUID \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

404 example

429 example

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
    "already_exists": false,
    "build_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_on": "2019-12-27T18:11:19.117Z",
    "status": "running"
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
      "code": 12000,
      "message": "Not found"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

```
{
  "errors": [
    {
      "code": 12051,
      "message": "Rate limit exceeded"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

##### Returns Examples

200 example

404 example

429 example

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
    "already_exists": false,
    "build_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_on": "2019-12-27T18:11:19.117Z",
    "status": "running"
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
      "code": 12000,
      "message": "Not found"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

```
{
  "errors": [
    {
      "code": 12051,
      "message": "Rate limit exceeded"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```