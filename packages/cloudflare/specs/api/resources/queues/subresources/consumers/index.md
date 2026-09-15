---
title: Consumers
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Queues](https://developers.cloudflare.com/api/resources/queues)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Consumers

##### [List Queue Consumers](https://developers.cloudflare.com/api/resources/queues/subresources/consumers/methods/list)

GET/accounts/{account\_id}/queues/{queue\_id}/consumers

##### [Get Queue Consumer](https://developers.cloudflare.com/api/resources/queues/subresources/consumers/methods/get)

GET/accounts/{account\_id}/queues/{queue\_id}/consumers/{consumer\_id}

##### [Create a Queue Consumer](https://developers.cloudflare.com/api/resources/queues/subresources/consumers/methods/create)

POST/accounts/{account\_id}/queues/{queue\_id}/consumers

##### [Update Queue Consumer](https://developers.cloudflare.com/api/resources/queues/subresources/consumers/methods/update)

PUT/accounts/{account\_id}/queues/{queue\_id}/consumers/{consumer\_id}

##### [Delete Queue Consumer](https://developers.cloudflare.com/api/resources/queues/subresources/consumers/methods/delete)

DELETE/accounts/{account\_id}/queues/{queue\_id}/consumers/{consumer\_id}

##### ModelsExpand Collapse

<details>

<summary>

Consumer = object {consumer\_id, created\_on, dead\_letter\_queue, 4 more } or object {consumer\_id, created\_on, dead\_letter\_queue, 3 more }

Response body representing a consumer

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

[Link to this property](#)%20queues.consumers%20%3E%20(model)%20consumer%20%3E%20(schema)>)

<details>

<summary>

ConsumerDeleteResponse object {errors, messages, success }

</summary>

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

<a href="#">Link to this property</a>

messages: optional array of string

<a href="#">Link to this property</a>

success: optional true

Indicates if the API call was successful or not.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20queues.consumers%20%3E%20(model)%20consumer_delete_response%20%3E%20(schema)>)