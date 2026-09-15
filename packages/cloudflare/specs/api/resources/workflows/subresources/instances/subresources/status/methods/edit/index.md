---
title: Change status of instance
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workflows](https://developers.cloudflare.com/api/resources/workflows)

[Instances](https://developers.cloudflare.com/api/resources/workflows/subresources/instances)

[Status](https://developers.cloudflare.com/api/resources/workflows/subresources/instances/subresources/status)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Change status of instance

PATCH/accounts/{account\_id}/workflows/{workflow\_name}/instances/{instance\_id}/status

Changes the execution status of a workflow instance (e.g., pause, resume, terminate).

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

[Link to this property](#)%20workflows.instances.status%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20account_id%20%3E%20(schema)>)

workflow\_name: string

maxLength64

minLength1

[Link to this property](#)%20workflows.instances.status%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20workflow_name%20%3E%20(schema)>)

instance\_id: string

maxLength271

minLength1

[Link to this property](#)%20workflows.instances.status%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20instance_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

body: object {status } or object {status } or object {status, rollback } or object {status, from }

</summary>

One of the following:

<details>

<summary>

Status object {status }

</summary>

status: "pause"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Status object {status }

</summary>

status: "resume"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {status, rollback }

</summary>

status: "terminate"

<a href="#">Link to this property</a>

rollback: optional boolean

Run rollback before terminating.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {status, from }

</summary>

status: "restart"

<a href="#">Link to this property</a>

<details>

<summary>

from: optional object {name, count, type }

Step to restart from.

</summary>

name: string

maxLength256

minLength1

<a href="#">Link to this property</a>

count: optional number

exclusiveMinimum

maximum9007199254740991

minimum0

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "do"or "sleep"or "waitForEvent"

</summary>

One of the following:

"do"

<a href="#">Link to this property</a>

"sleep"

<a href="#">Link to this property</a>

"waitForEvent"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workflows.instances.status%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20body%20%3E%20(schema)>)

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

[Link to this property](#)%20workflows.instances.status%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message }

</summary>

code: number

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workflows.instances.status%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {status, timestamp }

</summary>

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

timestamp: string

Accepts ISO 8601 with no timezone offsets and in UTC.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workflows.instances.status%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

[Link to this property](#)%20workflows.instances.status%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

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

[Link to this property](#)%20workflows.instances.status%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Change status of instance

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workflows/$WORKFLOW_NAME/instances/$INSTANCE_ID/status \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "status": "pause"
        }'
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
    "status": "queued",
    "timestamp": "2019-12-27T18:11:19.117Z"
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
    "status": "queued",
    "timestamp": "2019-12-27T18:11:19.117Z"
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