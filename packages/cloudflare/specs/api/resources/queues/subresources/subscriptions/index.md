---
title: Subscriptions
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Queues](https://developers.cloudflare.com/api/resources/queues)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Subscriptions

##### [List Event Subscriptions](https://developers.cloudflare.com/api/resources/queues/subresources/subscriptions/methods/list)

GET/accounts/{account\_id}/event\_subscriptions/subscriptions

##### [Get Event Subscription](https://developers.cloudflare.com/api/resources/queues/subresources/subscriptions/methods/get)

GET/accounts/{account\_id}/event\_subscriptions/subscriptions/{subscription\_id}

##### [Create Event Subscription](https://developers.cloudflare.com/api/resources/queues/subresources/subscriptions/methods/create)

POST/accounts/{account\_id}/event\_subscriptions/subscriptions

##### [Update Event Subscription](https://developers.cloudflare.com/api/resources/queues/subresources/subscriptions/methods/update)

PATCH/accounts/{account\_id}/event\_subscriptions/subscriptions/{subscription\_id}

##### [Delete Event Subscription](https://developers.cloudflare.com/api/resources/queues/subresources/subscriptions/methods/delete)

DELETE/accounts/{account\_id}/event\_subscriptions/subscriptions/{subscription\_id}

##### ModelsExpand Collapse

<details>

<summary>

SubscriptionListResponse object {id, created\_at, destination, 5 more }

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

[Link to this property](#)%20queues.subscriptions%20%3E%20(model)%20subscription_list_response%20%3E%20(schema)>)

<details>

<summary>

SubscriptionGetResponse object {id, created\_at, destination, 5 more }

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

[Link to this property](#)%20queues.subscriptions%20%3E%20(model)%20subscription_get_response%20%3E%20(schema)>)

<details>

<summary>

SubscriptionCreateResponse object {id, created\_at, destination, 5 more }

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

[Link to this property](#)%20queues.subscriptions%20%3E%20(model)%20subscription_create_response%20%3E%20(schema)>)

<details>

<summary>

SubscriptionUpdateResponse object {id, created\_at, destination, 5 more }

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

[Link to this property](#)%20queues.subscriptions%20%3E%20(model)%20subscription_update_response%20%3E%20(schema)>)

<details>

<summary>

SubscriptionDeleteResponse object {id, created\_at, destination, 5 more }

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

[Link to this property](#)%20queues.subscriptions%20%3E%20(model)%20subscription_delete_response%20%3E%20(schema)>)