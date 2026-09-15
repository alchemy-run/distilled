---
title: Create a new workflow instance
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workflows](https://developers.cloudflare.com/api/resources/workflows)

[Instances](https://developers.cloudflare.com/api/resources/workflows/subresources/instances)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create a new workflow instance

POST/accounts/{account\_id}/workflows/{workflow\_name}/instances

Creates a new instance of a workflow, starting its execution.

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

`Workers Scripts Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

workflow\_name: string

maxLength64

minLength1

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20workflow_name%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

instance\_id: optional string

The system reserves IDs that consist of the `cf_` prefix and exactly 64 lowercase hexadecimal characters.

maximum100

minimum1

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20instance_id%20%3E%20(schema)>)

<details>

<summary>

instance\_retention: optional object {error\_retention, success\_retention }

</summary>

<details>

<summary>

error\_retention: optional numberor string

Specifies the duration in milliseconds or as a string like ‘5 minutes’.

</summary>

One of the following:

number

Specifies the duration in milliseconds.

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

success\_retention: optional numberor string

Specifies the duration in milliseconds or as a string like ‘5 minutes’.

</summary>

One of the following:

number

Specifies the duration in milliseconds.

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20instance_retention%20%3E%20(schema)>)

<details>

<summary>

location\_hint: optional "wnam"or "weur"or "enam"or 8 more

</summary>

One of the following:

"wnam"

<a href="#">Link to this property</a>

"weur"

<a href="#">Link to this property</a>

"enam"

<a href="#">Link to this property</a>

"eeur"

<a href="#">Link to this property</a>

"apac"

<a href="#">Link to this property</a>

"apac-ne"

<a href="#">Link to this property</a>

"apac-se"

<a href="#">Link to this property</a>

"oc"

<a href="#">Link to this property</a>

"sam"

<a href="#">Link to this property</a>

"afr"

<a href="#">Link to this property</a>

"me"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20location_hint%20%3E%20(schema)>)

params: optional string

JSON-encoded event payload passed into the new instance.

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20params%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message }

</summary>

code: number

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message }

</summary>

code: number

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {id, status, version\_id, 2 more }

</summary>

id: string

maxLength100

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

status: "queued"or "running"or "paused"or 6 more

</summary>

One of the following:

"queued"

<a href="#">Link to this property</a>

"running"

<a href="#">Link to this property</a>

"paused"

<a href="#">Link to this property</a>

"errored"

<a href="#">Link to this property</a>

"terminated"

<a href="#">Link to this property</a>

"complete"

<a href="#">Link to this property</a>

"waitingForPause"

<a href="#">Link to this property</a>

"waiting"

<a href="#">Link to this property</a>

"rollingBack"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

version\_id: string

formatuuid

<a href="#">Link to this property</a>

workflow\_id: string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

trigger\_source: optional "unknown"or "api"or "binding"or 2 more

</summary>

One of the following:

"unknown"

<a href="#">Link to this property</a>

"api"

<a href="#">Link to this property</a>

"binding"

<a href="#">Link to this property</a>

"event"

<a href="#">Link to this property</a>

"cron"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result\_info: optional object {count, per\_page, total\_count, 3 more }

</summary>

count: number

<a href="#">Link to this property</a>

per\_page: number

<a href="#">Link to this property</a>

total\_count: number

<a href="#">Link to this property</a>

cursor: optional string

<a href="#">Link to this property</a>

page: optional number

<a href="#">Link to this property</a>

total\_pages: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Create a new workflow instance

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workflows/$WORKFLOW_NAME/instances \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
```

200 example

```
{
  "errors": [],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "id": "x",
    "status": "queued",
    "version_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "workflow_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "trigger_source": "unknown"
  },
  "success": true,
  "result_info": {
    "count": 0,
    "per_page": 0,
    "total_count": 0,
    "cursor": "cursor",
    "page": 0,
    "total_pages": 0
  }
}
```

##### Returns Examples

200 example

```
{
  "errors": [],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "id": "x",
    "status": "queued",
    "version_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "workflow_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "trigger_source": "unknown"
  },
  "success": true,
  "result_info": {
    "count": 0,
    "per_page": 0,
    "total_count": 0,
    "cursor": "cursor",
    "page": 0,
    "total_pages": 0
  }
}
```