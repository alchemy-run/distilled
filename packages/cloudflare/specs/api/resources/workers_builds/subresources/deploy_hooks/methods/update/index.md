---
title: Update a deploy hook
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers Builds](https://developers.cloudflare.com/api/resources/workers_builds)

[Deploy Hooks](https://developers.cloudflare.com/api/resources/workers_builds/subresources/deploy_hooks)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update a deploy hook

PUT/accounts/{account\_id}/builds/workers/{script\_name}/deploy\_hooks/{deploy\_hook\_uuid}

Replace the name and target branch for a deploy hook.

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

[Link to this property](#)%20workers_builds.deploy_hooks%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

script\_name: string

Human-readable name of the Worker.

[Link to this property](#)%20workers_builds.deploy_hooks%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20script_name%20%3E%20(schema)>)

deploy\_hook\_uuid: string

Deploy hook UUID.

formatuuid

[Link to this property](#)%20workers_builds.deploy_hooks%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20deploy_hook_uuid%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

branch: string

Git branch name.

[Link to this property](#)%20workers_builds.deploy_hooks%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20branch%20%3E%20(schema)>)

deploy\_hook\_name: string

Deploy hook name (1-58 characters).

maxLength58

minLength1

[Link to this property](#)%20workers_builds.deploy_hooks%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20deploy_hook_name%20%3E%20(schema)>)

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

[Link to this property](#)%20workers_builds.deploy_hooks%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of string

[Link to this property](#)%20workers_builds.deploy_hooks%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {branch, created\_on, deploy\_hook\_name, 3 more }

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

[Link to this property](#)%20workers_builds.deploy_hooks%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20workers_builds.deploy_hooks%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

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

[Link to this property](#)%20workers_builds.deploy_hooks%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Update a deploy hook

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/workers/$SCRIPT_NAME/deploy_hooks/$DEPLOY_HOOK_UUID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "branch": "main",
          "deploy_hook_name": "Production Deploy Hook"
        }'
```

200 example

400 example

401 example

404 example

409 example

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
    "branch": "main",
    "created_on": "2019-12-27T18:11:19.117Z",
    "deploy_hook_name": "Production Deploy Hook",
    "deploy_hook_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "external_script_id": "dd7160bb9cef458093557736f4b9e75b",
    "modified_on": "2019-12-27T18:11:19.117Z"
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
      "code": 12002,
      "message": "Invalid request body"
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
      "code": 12005,
      "message": "Missing token from authorization header"
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
      "code": 12049,
      "message": "Resource already exists"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

##### Returns Examples

200 example

400 example

401 example

404 example

409 example

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
    "branch": "main",
    "created_on": "2019-12-27T18:11:19.117Z",
    "deploy_hook_name": "Production Deploy Hook",
    "deploy_hook_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "external_script_id": "dd7160bb9cef458093557736f4b9e75b",
    "modified_on": "2019-12-27T18:11:19.117Z"
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
      "code": 12002,
      "message": "Invalid request body"
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
      "code": 12005,
      "message": "Missing token from authorization header"
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
      "code": 12049,
      "message": "Resource already exists"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```