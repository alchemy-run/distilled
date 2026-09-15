---
title: Update Queue
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Queues](https://developers.cloudflare.com/api/resources/queues)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update Queue

PUT/accounts/{account\_id}/queues/{queue\_id}

Updates a Queue. Note that this endpoint does not support partial updates. If successful, the Queue’s configuration is overwritten with the supplied configuration.

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

`Queues Write``Workers Scripts Write`

##### P ath ParametersExpand Collapse

account\_id: string

A Resource identifier.

maxLength32

[Link to this property](#)%20queues%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

queue\_id: string

A Resource identifier.

maxLength32

[Link to this property](#)%20queues%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20queue_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

jurisdiction: optional "eu"or "us"or "fedramp"

</summary>

One of the following:

"eu"

<a href="#">Link to this property</a>

"us"

<a href="#">Link to this property</a>

"fedramp"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20queues%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20jurisdiction%20%3E%20(schema)>)

queue\_name: optional string

[Link to this property](#)%20queues%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20queue_name%20%3E%20(schema)>)

<details>

<summary>

settings: optional object {delivery\_delay, delivery\_paused, message\_retention\_period }

</summary>

delivery\_delay: optional number

Number of seconds to delay delivery of all messages to consumers.

<a href="#">Link to this property</a>

delivery\_paused: optional boolean

Indicates if message delivery to consumers is currently paused.

<a href="#">Link to this property</a>

message\_retention\_period: optional number

Number of seconds after which an unconsumed message will be delayed.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20queues%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20settings%20%3E%20(schema)>)

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

[Link to this property](#)%20queues%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: optional array of string

[Link to this property](#)%20queues%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/queues#(resource)%20queues%20%3E%20(model)%20queue%20%3E%20(schema)">Queue</a> { consumers, consumers\_total\_count, created\_on, 7 more }

</summary>

<details>

<summary>

consumers: optional array of <a href="https://developers.cloudflare.com/api/resources/queues#(resource)%20queues.consumers%20%3E%20(model)%20consumer%20%3E%20(schema)">Consumer</a>

</summary>

One of the following:

<details>

<summary>

Worker object {consumer\_id, created\_on, dead\_letter\_queue, 4 more }

</summary>

consumer\_id: optional string

A Resource identifier.

maxLength32

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

dead\_letter\_queue: optional string

Name of the dead letter queue, or empty string if not configured

<a href="#">Link to this property</a>

queue\_name: optional string

<a href="#">Link to this property</a>

script\_name: optional string

Name of a Worker

<a href="#">Link to this property</a>

<details>

<summary>

settings: optional object {batch\_size, max\_concurrency, max\_retries, 2 more }

</summary>

batch\_size: optional number

The maximum number of messages to include in a batch.

<a href="#">Link to this property</a>

max\_concurrency: optional number

Maximum number of concurrent consumers that may consume from this Queue. Set to <code>null</code> to automatically opt in to the platform’s maximum (recommended).

<a href="#">Link to this property</a>

max\_retries: optional number

The maximum number of retries

<a href="#">Link to this property</a>

max\_wait\_time\_ms: optional number

The number of milliseconds to wait for a batch to fill up before attempting to deliver it

<a href="#">Link to this property</a>

retry\_delay: optional number

The number of seconds to delay before making the message available for another attempt.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: optional "worker"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

HTTPPull object {consumer\_id, created\_on, dead\_letter\_queue, 3 more }

</summary>

consumer\_id: optional string

A Resource identifier.

maxLength32

<a href="#">Link to this property</a>

created\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

dead\_letter\_queue: optional string

Name of the dead letter queue, or empty string if not configured

<a href="#">Link to this property</a>

queue\_name: optional string

<a href="#">Link to this property</a>

<details>

<summary>

settings: optional object {batch\_size, max\_retries, retry\_delay, visibility\_timeout\_ms }

</summary>

batch\_size: optional number

The maximum number of messages to include in a batch.

<a href="#">Link to this property</a>

max\_retries: optional number

The maximum number of retries

<a href="#">Link to this property</a>

retry\_delay: optional number

The number of seconds to delay before making the message available for another attempt.

<a href="#">Link to this property</a>

visibility\_timeout\_ms: optional number

The number of milliseconds that a message is exclusively leased. After the timeout, the message becomes available for another attempt.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: optional "http\_pull"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

consumers\_total\_count: optional number

<a href="#">Link to this property</a>

created\_on: optional string

<a href="#">Link to this property</a>

<details>

<summary>

jurisdiction: optional "eu"or "us"or "fedramp"

</summary>

One of the following:

"eu"

<a href="#">Link to this property</a>

"us"

<a href="#">Link to this property</a>

"fedramp"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

<a href="#">Link to this property</a>

<details>

<summary>

producers: optional array of object {script, type } or object {bucket\_name, type }

</summary>

One of the following:

<details>

<summary>

MqWorkerProducer object {script, type }

</summary>

script: optional string

<a href="#">Link to this property</a>

type: optional "worker"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

MqR2Producer object {bucket\_name, type }

</summary>

bucket\_name: optional string

<a href="#">Link to this property</a>

type: optional "r2\_bucket"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

producers\_total\_count: optional number

<a href="#">Link to this property</a>

queue\_id: optional string

<a href="#">Link to this property</a>

queue\_name: optional string

<a href="#">Link to this property</a>

<details>

<summary>

settings: optional object {delivery\_delay, delivery\_paused, message\_retention\_period }

</summary>

delivery\_delay: optional number

Number of seconds to delay delivery of all messages to consumers.

<a href="#">Link to this property</a>

delivery\_paused: optional boolean

Indicates if message delivery to consumers is currently paused.

<a href="#">Link to this property</a>

message\_retention\_period: optional number

Number of seconds after which an unconsumed message will be delayed.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20queues%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: optional true

Indicates if the API call was successful or not.

[Link to this property](#)%20queues%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Update Queue

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/queues/$QUEUE_ID \
    -X PUT \
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
  "result": {
    "consumers": [
      {
        "consumer_id": "023e105f4ecef8ad9ca31a8372d0c353",
        "created_on": "2019-12-27T18:11:19.117Z",
        "dead_letter_queue": "dead_letter_queue",
        "queue_name": "example-queue",
        "script_name": "my-consumer-worker",
        "settings": {
          "batch_size": 50,
          "max_concurrency": 10,
          "max_retries": 3,
          "max_wait_time_ms": 5000,
          "retry_delay": 10
        },
        "type": "worker"
      }
    ],
    "consumers_total_count": 0,
    "created_on": "created_on",
    "jurisdiction": "eu",
    "modified_on": "modified_on",
    "producers": [
      {
        "script": "script",
        "type": "worker"
      }
    ],
    "producers_total_count": 0,
    "queue_id": "queue_id",
    "queue_name": "example-queue",
    "settings": {
      "delivery_delay": 5,
      "delivery_paused": true,
      "message_retention_period": 345600
    }
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
  "result": {
    "consumers": [
      {
        "consumer_id": "023e105f4ecef8ad9ca31a8372d0c353",
        "created_on": "2019-12-27T18:11:19.117Z",
        "dead_letter_queue": "dead_letter_queue",
        "queue_name": "example-queue",
        "script_name": "my-consumer-worker",
        "settings": {
          "batch_size": 50,
          "max_concurrency": 10,
          "max_retries": 3,
          "max_wait_time_ms": 5000,
          "retry_delay": 10
        },
        "type": "worker"
      }
    ],
    "consumers_total_count": 0,
    "created_on": "created_on",
    "jurisdiction": "eu",
    "modified_on": "modified_on",
    "producers": [
      {
        "script": "script",
        "type": "worker"
      }
    ],
    "producers_total_count": 0,
    "queue_id": "queue_id",
    "queue_name": "example-queue",
    "settings": {
      "delivery_delay": 5,
      "delivery_paused": true,
      "message_retention_period": 345600
    }
  },
  "success": true
}
```