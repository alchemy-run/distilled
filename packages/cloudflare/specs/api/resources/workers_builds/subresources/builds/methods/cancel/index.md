---
title: Cancel a Workers build
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers Builds](https://developers.cloudflare.com/api/resources/workers_builds)

[Builds](https://developers.cloudflare.com/api/resources/workers_builds/subresources/builds)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Cancel a Workers build

PUT/accounts/{account\_id}/builds/builds/{build\_uuid}/cancel

Cancel a queued or running build.

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

[Link to this property](#)%20workers_builds.builds%20%3E%20(method)%20cancel%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

build\_uuid: string

Build UUID.

formatuuid

[Link to this property](#)%20workers_builds.builds%20%3E%20(method)%20cancel%20%3E%20(params)%20default%20%3E%20(param)%20build_uuid%20%3E%20(schema)>)

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

[Link to this property](#)%20workers_builds.builds%20%3E%20(method)%20cancel%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of string

[Link to this property](#)%20workers_builds.builds%20%3E%20(method)%20cancel%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {build\_outcome, build\_uuid, stopped\_on }

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

[Link to this property](#)%20workers_builds.builds%20%3E%20(method)%20cancel%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20workers_builds.builds%20%3E%20(method)%20cancel%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

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

[Link to this property](#)%20workers_builds.builds%20%3E%20(method)%20cancel%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Cancel a Workers build

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/builds/builds/$BUILD_UUID/cancel \
    -X PUT \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

401 example

404 example

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
    "build_outcome": "success",
    "build_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "stopped_on": "2019-12-27T18:11:19.117Z"
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

##### Returns Examples

200 example

401 example

404 example

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
    "build_outcome": "success",
    "build_uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "stopped_on": "2019-12-27T18:11:19.117Z"
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