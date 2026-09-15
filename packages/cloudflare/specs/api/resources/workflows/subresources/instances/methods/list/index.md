---
title: List of workflow instances
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workflows](https://developers.cloudflare.com/api/resources/workflows)

[Instances](https://developers.cloudflare.com/api/resources/workflows/subresources/instances)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List of workflow instances

GET/accounts/{account\_id}/workflows/{workflow\_name}/instances

Lists all instances of a workflow with their execution status.

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

`Workers Tail Read``Workers Scripts Write``Workers Scripts Read`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

workflow\_name: string

maxLength64

minLength1

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20workflow_name%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

cursor: optional string

Opaque token for cursor-based pagination. Mutually exclusive with `page`.

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20cursor%20%3E%20(schema)>)

date\_end: optional string

Accepts ISO 8601 with no timezone offsets and in UTC.

formatdate-time

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20date_end%20%3E%20(schema)>)

date\_start: optional string

Accepts ISO 8601 with no timezone offsets and in UTC.

formatdate-time

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20date_start%20%3E%20(schema)>)

<details>

<summary>

direction: optional "asc"or "desc"

Defines the direction for cursor-based pagination.

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

Deprecatedpage: optional number

Deprecated: use `cursor` for pagination instead.

minimum1

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

maximum100

minimum1

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

<details>

<summary>

status: optional "queued"or "running"or "paused"or 6 more

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

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20status%20%3E%20(schema)>)

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

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message }

</summary>

code: number

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {id, created\_on, ended\_on, 6 more }

</summary>

id: string

maxLength100

minLength1

<a href="#">Link to this property</a>

created\_on: string

formatdate-time

<a href="#">Link to this property</a>

ended\_on: string

formatdate-time

<a href="#">Link to this property</a>

modified\_on: string

formatdate-time

<a href="#">Link to this property</a>

started\_on: string

formatdate-time

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

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result\_info: optional object {count, per\_page, total\_count, 3 more }

</summary>

count: number

<a href="#">Link to this property</a>

per\_page: number

<a href="#">Link to this property</a>

Deprecatedtotal\_count: number

Deprecated: cursor-based pagination can produce an inaccurate total count.

<a href="#">Link to this property</a>

cursor: optional string

<a href="#">Link to this property</a>

Deprecatedpage: optional number

Deprecated: use cursor-based pagination instead.

<a href="#">Link to this property</a>

total\_pages: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List of workflow instances

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workflows/$WORKFLOW_NAME/instances \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "result": [
    {
      "id": "x",
      "created_on": "2019-12-27T18:11:19.117Z",
      "ended_on": "2019-12-27T18:11:19.117Z",
      "modified_on": "2019-12-27T18:11:19.117Z",
      "started_on": "2019-12-27T18:11:19.117Z",
      "status": "queued",
      "version_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "workflow_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "trigger_source": "unknown"
    }
  ],
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
  "result": [
    {
      "id": "x",
      "created_on": "2019-12-27T18:11:19.117Z",
      "ended_on": "2019-12-27T18:11:19.117Z",
      "modified_on": "2019-12-27T18:11:19.117Z",
      "started_on": "2019-12-27T18:11:19.117Z",
      "status": "queued",
      "version_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "workflow_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "trigger_source": "unknown"
    }
  ],
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