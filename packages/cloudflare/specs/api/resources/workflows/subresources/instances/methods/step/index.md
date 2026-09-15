---
title: Get full step output from instance
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workflows](https://developers.cloudflare.com/api/resources/workflows)

[Instances](https://developers.cloudflare.com/api/resources/workflows/subresources/instances)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get full step output from instance

GET/accounts/{account\_id}/workflows/{workflow\_name}/instances/{instance\_id}/step

Retrieves the full, untruncated output for a specific step on a workflow instance. Returns a flat status-shaped JSON body with step `status` (‘running’ | ‘waiting’ | ‘complete’ | ‘errored’), `error` (nullable), and `output` (the step value, or null while running/waiting/errored). When the step returned a ReadableStream from step.do, the response is served as ‘application/octet-stream’ with the raw bytes as the body instead of JSON. A `status='running'` response with non-null `error` indicates the step is currently retrying after a prior attempt failed.

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

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20step%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

workflow\_name: string

maxLength64

minLength1

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20step%20%3E%20(params)%20default%20%3E%20(param)%20workflow_name%20%3E%20(schema)>)

instance\_id: string

maxLength271

minLength1

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20step%20%3E%20(params)%20default%20%3E%20(param)%20instance_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

name: string

Exact step name from the instance logs response, including the generated counter suffix.

minLength1

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20step%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

<details>

<summary>

type: "step"or "waitForEvent"

Step type to disambiguate step.do and waitForEvent entries that share the same name.

</summary>

One of the following:

"step"

<a href="#">Link to this property</a>

"waitForEvent"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20step%20%3E%20(params)%20default%20%3E%20(param)%20type%20%3E%20(schema)>)

attempt: optional number

Specific attempt number to retrieve output or error for.

exclusiveMinimum

maximum9007199254740991

minimum0

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20step%20%3E%20(params)%20default%20%3E%20(param)%20attempt%20%3E%20(schema)>)

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

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20step%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message }

</summary>

code: number

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20step%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {error, status, event\_type, output }

</summary>

<details>

<summary>

error: object {message, name }

Error details when status=‘errored’; null otherwise.

</summary>

message: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

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

event\_type: optional string

The event type the step is waiting on, as supplied to step.waitForEvent. Only present when type=‘waitForEvent’.

<a href="#">Link to this property</a>

output: optional unknown

Contains the full step output or waitForEvent payload without truncation. Uses ‘\[REDACTED]’ for sensitive outputs. Contains a value when status=‘complete’. May contain a ReadableStream when step.do returns one; the response serves stream outputs as application/octet-stream rather than JSON.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20step%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20step%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

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

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20step%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Get full step output from instance

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workflows/$WORKFLOW_NAME/instances/$INSTANCE_ID/step \
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
  "result": {
    "error": {
      "message": "message",
      "name": "name"
    },
    "status": "queued",
    "event_type": "event_type",
    "output": {}
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
    "error": {
      "message": "message",
      "name": "name"
    },
    "status": "queued",
    "event_type": "event_type",
    "output": {}
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