---
title: Get logs and status from instance
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workflows](https://developers.cloudflare.com/api/resources/workflows)

[Instances](https://developers.cloudflare.com/api/resources/workflows/subresources/instances)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get logs and status from instance

GET/accounts/{account\_id}/workflows/{workflow\_name}/instances/{instance\_id}

Retrieves logs and execution status for a specific workflow instance.

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

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

workflow\_name: string

maxLength64

minLength1

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20workflow_name%20%3E%20(schema)>)

instance\_id: string

maxLength271

minLength1

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20instance_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

<details>

<summary>

order: optional "asc"or "desc"

Step ordering: “asc” (default, oldest first) or “desc” (newest first).

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20order%20%3E%20(schema)>)

<details>

<summary>

simple: optional "true"or "false"

When true, omits step details and returns only metadata with step\_count.

</summary>

One of the following:

"true"

<a href="#">Link to this property</a>

"false"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20simple%20%3E%20(schema)>)

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

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message }

</summary>

code: number

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {end, error, output, 11 more }

</summary>

end: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

error: object {message, name }

</summary>

message: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

output: stringor number

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

params: unknown

<a href="#">Link to this property</a>

queued: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

rollback: object {error, outcome }

</summary>

<details>

<summary>

error: object {message, name }

</summary>

message: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

outcome: "complete"or "failed"

</summary>

One of the following:

"complete"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

start: string

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

step\_count: number

maximum9007199254740991

minimum-9007199254740991

<a href="#">Link to this property</a>

<details>

<summary>

steps: array of object {attempts, config, end, 5 more } or object {end, error, finished, 3 more } or object {trigger, type } or object {end, error, finished, 5 more }

</summary>

One of the following:

<details>

<summary>

object {attempts, config, end, 5 more }

</summary>

<details>

<summary>

attempts: array of object {end, error, start, success }

</summary>

end: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

error: object {message, name }

</summary>

message: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

start: string

formatdate-time

<a href="#">Link to this property</a>

success: boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

config: object {retries, timeout, sensitive }

</summary>

<details>

<summary>

retries: object {delay, limit, backoff }

</summary>

<details>

<summary>

delay: stringor number

Specifies the delay duration. The value ‘\[dynamic]’ means that a user-supplied function computes the delay.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

limit: number

<a href="#">Link to this property</a>

<details>

<summary>

backoff: optional "constant"or "linear"or "exponential"

</summary>

One of the following:

"constant"

<a href="#">Link to this property</a>

"linear"

<a href="#">Link to this property</a>

"exponential"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

timeout: stringor number

Specifies the timeout duration.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

sensitive: optional "output"

When set to ‘output’, step output is redacted from log and step output responses.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

end: string

formatdate-time

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

output: string

<a href="#">Link to this property</a>

start: string

formatdate-time

<a href="#">Link to this property</a>

success: boolean

<a href="#">Link to this property</a>

<details>

<summary>

type: "step"or "rollback"

</summary>

One of the following:

"step"

<a href="#">Link to this property</a>

"rollback"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {end, error, finished, 3 more }

</summary>

end: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

error: object {message, name }

</summary>

message: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

finished: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

start: string

formatdate-time

<a href="#">Link to this property</a>

type: "sleep"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {trigger, type }

</summary>

<details>

<summary>

trigger: object {source }

</summary>

source: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "termination"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {end, error, finished, 5 more }

</summary>

end: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

error: object {message, name }

</summary>

message: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

finished: boolean

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

start: string

formatdate-time

<a href="#">Link to this property</a>

type: "waitForEvent"

<a href="#">Link to this property</a>

event\_type: optional string

<a href="#">Link to this property</a>

output: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: boolean

<a href="#">Link to this property</a>

<details>

<summary>

trigger: object {source }

</summary>

<details>

<summary>

source: "unknown"or "api"or "binding"or 2 more

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

<a href="#">Link to this property</a>

versionId: string

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

schedule: optional object {cron, scheduledTime }

</summary>

cron: string

<a href="#">Link to this property</a>

scheduledTime: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

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

[Link to this property](#)%20workflows.instances%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Get logs and status from instance

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workflows/$WORKFLOW_NAME/instances/$INSTANCE_ID \
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
    "end": "2019-12-27T18:11:19.117Z",
    "error": {
      "message": "message",
      "name": "name"
    },
    "output": "string",
    "params": {},
    "queued": "2019-12-27T18:11:19.117Z",
    "rollback": {
      "error": {
        "message": "message",
        "name": "name"
      },
      "outcome": "complete"
    },
    "start": "2019-12-27T18:11:19.117Z",
    "status": "queued",
    "step_count": -9007199254740991,
    "steps": [
      {
        "attempts": [
          {
            "end": "2019-12-27T18:11:19.117Z",
            "error": {
              "message": "message",
              "name": "name"
            },
            "start": "2019-12-27T18:11:19.117Z",
            "success": true
          }
        ],
        "config": {
          "retries": {
            "delay": "string",
            "limit": 0,
            "backoff": "constant"
          },
          "timeout": "string",
          "sensitive": "output"
        },
        "end": "2019-12-27T18:11:19.117Z",
        "name": "name",
        "output": "output",
        "start": "2019-12-27T18:11:19.117Z",
        "success": true,
        "type": "step"
      }
    ],
    "success": true,
    "trigger": {
      "source": "unknown"
    },
    "versionId": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "schedule": {
      "cron": "cron",
      "scheduledTime": 0
    }
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
    "end": "2019-12-27T18:11:19.117Z",
    "error": {
      "message": "message",
      "name": "name"
    },
    "output": "string",
    "params": {},
    "queued": "2019-12-27T18:11:19.117Z",
    "rollback": {
      "error": {
        "message": "message",
        "name": "name"
      },
      "outcome": "complete"
    },
    "start": "2019-12-27T18:11:19.117Z",
    "status": "queued",
    "step_count": -9007199254740991,
    "steps": [
      {
        "attempts": [
          {
            "end": "2019-12-27T18:11:19.117Z",
            "error": {
              "message": "message",
              "name": "name"
            },
            "start": "2019-12-27T18:11:19.117Z",
            "success": true
          }
        ],
        "config": {
          "retries": {
            "delay": "string",
            "limit": 0,
            "backoff": "constant"
          },
          "timeout": "string",
          "sensitive": "output"
        },
        "end": "2019-12-27T18:11:19.117Z",
        "name": "name",
        "output": "output",
        "start": "2019-12-27T18:11:19.117Z",
        "success": true,
        "type": "step"
      }
    ],
    "success": true,
    "trigger": {
      "source": "unknown"
    },
    "versionId": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "schedule": {
      "cron": "cron",
      "scheduledTime": 0
    }
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