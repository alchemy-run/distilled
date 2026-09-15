---
title: Messages
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Queues](https://developers.cloudflare.com/api/resources/queues)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Messages

##### [Push Message](https://developers.cloudflare.com/api/resources/queues/subresources/messages/methods/push)

POST/accounts/{account\_id}/queues/{queue\_id}/messages

##### [Acknowledge + Retry Queue Messages](https://developers.cloudflare.com/api/resources/queues/subresources/messages/methods/ack)

POST/accounts/{account\_id}/queues/{queue\_id}/messages/ack

##### [Pull Queue Messages](https://developers.cloudflare.com/api/resources/queues/subresources/messages/methods/pull)

POST/accounts/{account\_id}/queues/{queue\_id}/messages/pull

##### [Push Message Batch](https://developers.cloudflare.com/api/resources/queues/subresources/messages/methods/bulk_push)

POST/accounts/{account\_id}/queues/{queue\_id}/messages/batch

##### [Peek Queue Messages](https://developers.cloudflare.com/api/resources/queues/subresources/messages/methods/peek)

POST/accounts/{account\_id}/queues/{queue\_id}/messages/peek

##### [Purge Peeked Queue Messages](https://developers.cloudflare.com/api/resources/queues/subresources/messages/methods/purge)

POST/accounts/{account\_id}/queues/{queue\_id}/messages/purge

##### ModelsExpand Collapse

<details>

<summary>

MessagePushResponse object {metadata }

</summary>

<details>

<summary>

metadata: optional object {metrics }

</summary>

<details>

<summary>

metrics: optional object {backlog\_bytes, backlog\_count, oldest\_message\_timestamp\_ms }

Best-effort metrics for the queue. Values may be approximate due to the distributed nature of queues.

</summary>

backlog\_bytes: number

The size in bytes of unacknowledged messages in the queue.

<a href="#">Link to this property</a>

backlog\_count: number

The number of unacknowledged messages in the queue.

<a href="#">Link to this property</a>

oldest\_message\_timestamp\_ms: number

Unix timestamp in milliseconds of the oldest unacknowledged message in the queue. Returns 0 if unknown.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20queues.messages%20%3E%20(model)%20message_push_response%20%3E%20(schema)>)

<details>

<summary>

MessageAckResponse object {ackCount, retryCount, warnings }

</summary>

ackCount: optional number

The number of messages that were succesfully acknowledged.

<a href="#">Link to this property</a>

retryCount: optional number

The number of messages that were succesfully retried.

<a href="#">Link to this property</a>

warnings: optional map\[string]

Map of lease IDs to warning messages encountered during acknowledgement.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20queues.messages%20%3E%20(model)%20message_ack_response%20%3E%20(schema)>)

<details>

<summary>

MessagePullResponse object {message\_backlog\_count, messages, metadata }

</summary>

message\_backlog\_count: optional number

The number of unacknowledged messages in the queue.

<a href="#">Link to this property</a>

<details>

<summary>

messages: optional array of object {id, attempts, body, 3 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

attempts: optional number

<a href="#">Link to this property</a>

body: optional string

<a href="#">Link to this property</a>

lease\_id: optional string

An ID that represents an “in-flight” message that has been pulled from a Queue. You must hold on to this ID and use it to acknowledge this message.

<a href="#">Link to this property</a>

metadata: optional unknown

<a href="#">Link to this property</a>

timestamp\_ms: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

metadata: optional object {metrics }

</summary>

<details>

<summary>

metrics: optional object {backlog\_bytes, backlog\_count, oldest\_message\_timestamp\_ms }

Best-effort metrics for the queue. Values may be approximate due to the distributed nature of queues.

</summary>

backlog\_bytes: number

The size in bytes of unacknowledged messages in the queue.

<a href="#">Link to this property</a>

backlog\_count: number

The number of unacknowledged messages in the queue.

<a href="#">Link to this property</a>

oldest\_message\_timestamp\_ms: number

Unix timestamp in milliseconds of the oldest unacknowledged message in the queue. Returns 0 if unknown.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20queues.messages%20%3E%20(model)%20message_pull_response%20%3E%20(schema)>)

<details>

<summary>

MessageBulkPushResponse object {metadata }

</summary>

<details>

<summary>

metadata: optional object {metrics }

</summary>

<details>

<summary>

metrics: optional object {backlog\_bytes, backlog\_count, oldest\_message\_timestamp\_ms }

Best-effort metrics for the queue. Values may be approximate due to the distributed nature of queues.

</summary>

backlog\_bytes: number

The size in bytes of unacknowledged messages in the queue.

<a href="#">Link to this property</a>

backlog\_count: number

The number of unacknowledged messages in the queue.

<a href="#">Link to this property</a>

oldest\_message\_timestamp\_ms: number

Unix timestamp in milliseconds of the oldest unacknowledged message in the queue. Returns 0 if unknown.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20queues.messages%20%3E%20(model)%20message_bulk_push_response%20%3E%20(schema)>)

<details>

<summary>

MessagePeekResponse object {messages }

</summary>

<details>

<summary>

messages: optional array of object {id, attempts, body, 3 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

attempts: optional number

<a href="#">Link to this property</a>

body: optional string

<a href="#">Link to this property</a>

metadata: optional unknown

<a href="#">Link to this property</a>

ref: optional string

An opaque reference to a peeked message. You must hold on to this value and use it to purge the message.

<a href="#">Link to this property</a>

timestamp\_ms: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20queues.messages%20%3E%20(model)%20message_peek_response%20%3E%20(schema)>)

<details>

<summary>

MessagePurgeResponse object {errors, warnings }

</summary>

<details>

<summary>

errors: optional array of object {message }

Errors encountered while purging messages.

</summary>

message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

warnings: optional map\[string]

Map of refs to warning messages encountered during purge.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20queues.messages%20%3E%20(model)%20message_purge_response%20%3E%20(schema)>)