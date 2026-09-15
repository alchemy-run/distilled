---
title: List Event Subscriptions
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Queues](https://developers.cloudflare.com/api/resources/queues)

[Subscriptions](https://developers.cloudflare.com/api/resources/queues/subresources/subscriptions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List Event Subscriptions

GET/accounts/{account\_id}/event\_subscriptions/subscriptions

Get a paginated list of event subscriptions with optional sorting and filtering

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

`Queues Write``Queues Read``Workers Scripts Write``Workers Scripts Read`

##### P ath ParametersExpand Collapse

account\_id: string

A Resource identifier.

maxLength32

[Link to this property](#)%20queues.subscriptions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

<details>

<summary>

direction: optional "asc"or "desc"

Sort direction

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20queues.subscriptions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

<details>

<summary>

order: optional "created\_at"or "name"or "enabled"or "source"

Field to sort by

</summary>

One of the following:

"created\_at"

<a href="#">Link to this property</a>

"name"

<a href="#">Link to this property</a>

"enabled"

<a href="#">Link to this property</a>

"source"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20queues.subscriptions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order%20%3E%20(schema)>)

page: optional number

Page number for pagination

minimum1

[Link to this property](#)%20queues.subscriptions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Number of items per page

maximum100

minimum1

[Link to this property](#)%20queues.subscriptions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

minLength1

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20queues.subscriptions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: optional array of string

[Link to this property](#)%20queues.subscriptions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: optional array of object {id, created\_at, destination, 5 more }

</summary>

id: string

Unique identifier for the subscription

<a href="#">Link to this property</a>

created\_at: string

When the subscription was created

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

destination: object {queue\_id, type }

Destination configuration for the subscription

</summary>

queue\_id: string

ID of the target queue

<a href="#">Link to this property</a>

type: "queues.queue"

Type of destination

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: boolean

Whether the subscription is active

<a href="#">Link to this property</a>

events: array of string

List of event types this subscription handles

<a href="#">Link to this property</a>

modified\_at: string

When the subscription was last modified

formatdate-time

<a href="#">Link to this property</a>

name: string

Name of the subscription

<a href="#">Link to this property</a>

<details>

<summary>

source: object {type } or object {type } or object {type } or 6 more

Source configuration for the subscription

</summary>

One of the following:

<details>

<summary>

MqEventSourceImages object {type }

</summary>

type: optional "images"

Type of source

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

MqEventSourceKV object {type }

</summary>

type: optional "kv"

Type of source

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

MqEventSourceR2 object {type }

</summary>

type: optional "r2"

Type of source

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

MqEventSourceSuperSlurper object {type }

</summary>

type: optional "superSlurper"

Type of source

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

MqEventSourceVectorize object {type }

</summary>

type: optional "vectorize"

Type of source

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

MqEventSourceWorkersAIModel object {model\_name, type }

</summary>

model\_name: optional string

Name of the Workers AI model

<a href="#">Link to this property</a>

type: optional "workersAi.model"

Type of source

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

MqEventSourceWorkersBuildsWorker object {type, worker\_name }

</summary>

type: optional "workersBuilds.worker"

Type of source

<a href="#">Link to this property</a>

worker\_name: optional string

Name of the worker

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

MqEventSourceWorkersScript object {script\_tag, type }

</summary>

script\_tag: optional string

Tag of the Worker script

<a href="#">Link to this property</a>

type: optional "workers.script"

Type of source

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

MqEventSourceWorkflowsWorkflow object {type, workflow\_name }

</summary>

type: optional "workflows.workflow"

Type of source

<a href="#">Link to this property</a>

workflow\_name: optional string

Name of the workflow

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20queues.subscriptions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, 2 more }

</summary>

count: number

Number of items in current page

<a href="#">Link to this property</a>

page: number

Current page number

<a href="#">Link to this property</a>

per\_page: number

Items per page

<a href="#">Link to this property</a>

total\_count: number

Total number of items

<a href="#">Link to this property</a>

total\_pages: number

Total number of pages

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20queues.subscriptions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

success: optional true

Indicates if the API call was successful or not.

[Link to this property](#)%20queues.subscriptions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List Event Subscriptions

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/event_subscriptions/subscriptions \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "code": 7003,
      "message": "No route for the URI",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    "string"
  ],
  "result": [
    {
      "id": "id",
      "created_at": "2019-12-27T18:11:19.117Z",
      "destination": {
        "queue_id": "queue_id",
        "type": "queues.queue"
      },
      "enabled": true,
      "events": [
        "string"
      ],
      "modified_at": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "source": {
        "type": "images"
      }
    }
  ],
  "result_info": {
    "count": 0,
    "page": 0,
    "per_page": 0,
    "total_count": 0,
    "total_pages": 0
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "code": 7003,
      "message": "No route for the URI",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    "string"
  ],
  "result": [
    {
      "id": "id",
      "created_at": "2019-12-27T18:11:19.117Z",
      "destination": {
        "queue_id": "queue_id",
        "type": "queues.queue"
      },
      "enabled": true,
      "events": [
        "string"
      ],
      "modified_at": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "source": {
        "type": "images"
      }
    }
  ],
  "result_info": {
    "count": 0,
    "page": 0,
    "per_page": 0,
    "total_count": 0,
    "total_pages": 0
  },
  "success": true
}
```