---
title: Event Notifications
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[R2](https://developers.cloudflare.com/api/resources/r2)

[Buckets](https://developers.cloudflare.com/api/resources/r2/subresources/buckets)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Event Notifications

##### [List Event Notification Rules](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/event_notifications/methods/list)

GET/accounts/{account\_id}/event\_notifications/r2/{bucket\_name}/configuration

##### [Get Event Notification Rule](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/event_notifications/methods/get)

GET/accounts/{account\_id}/event\_notifications/r2/{bucket\_name}/configuration/queues/{queue\_id}

##### [Create Event Notification Rule](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/event_notifications/methods/update)

PUT/accounts/{account\_id}/event\_notifications/r2/{bucket\_name}/configuration/queues/{queue\_id}

##### [Delete Event Notification Rules](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/event_notifications/methods/delete)

DELETE/accounts/{account\_id}/event\_notifications/r2/{bucket\_name}/configuration/queues/{queue\_id}

##### ModelsExpand Collapse

<details>

<summary>

EventNotificationListResponse object {bucketName, queues }

</summary>

bucketName: optional string

Name of the bucket.

<a href="#">Link to this property</a>

<details>

<summary>

queues: optional array of object {queueId, queueName, rules }

List of queues associated with the bucket.

</summary>

queueId: optional string

Queue ID.

<a href="#">Link to this property</a>

queueName: optional string

Name of the queue.

<a href="#">Link to this property</a>

<details>

<summary>

rules: optional array of object {actions, createdAt, description, 3 more }

</summary>

<details>

<summary>

actions: array of "PutObject"or "CopyObject"or "DeleteObject"or 2 more

Array of R2 object actions that will trigger notifications.

</summary>

One of the following:

"PutObject"

<a href="#">Link to this property</a>

"CopyObject"

<a href="#">Link to this property</a>

"DeleteObject"

<a href="#">Link to this property</a>

"CompleteMultipartUpload"

<a href="#">Link to this property</a>

"LifecycleDeletion"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

createdAt: optional string

Timestamp when the rule was created.

<a href="#">Link to this property</a>

description: optional string

A description that can be used to identify the event notification rule after creation.

<a href="#">Link to this property</a>

prefix: optional string

Notifications will be sent only for objects with this prefix.

<a href="#">Link to this property</a>

ruleId: optional string

Rule ID.

<a href="#">Link to this property</a>

suffix: optional string

Notifications will be sent only for objects with this suffix.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.event_notifications%20%3E%20(model)%20event_notification_list_response%20%3E%20(schema)>)

<details>

<summary>

EventNotificationGetResponse object {queueId, queueName, rules }

</summary>

queueId: optional string

Queue ID.

<a href="#">Link to this property</a>

queueName: optional string

Name of the queue.

<a href="#">Link to this property</a>

<details>

<summary>

rules: optional array of object {actions, createdAt, description, 3 more }

</summary>

<details>

<summary>

actions: array of "PutObject"or "CopyObject"or "DeleteObject"or 2 more

Array of R2 object actions that will trigger notifications.

</summary>

One of the following:

"PutObject"

<a href="#">Link to this property</a>

"CopyObject"

<a href="#">Link to this property</a>

"DeleteObject"

<a href="#">Link to this property</a>

"CompleteMultipartUpload"

<a href="#">Link to this property</a>

"LifecycleDeletion"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

createdAt: optional string

Timestamp when the rule was created.

<a href="#">Link to this property</a>

description: optional string

A description that can be used to identify the event notification rule after creation.

<a href="#">Link to this property</a>

prefix: optional string

Notifications will be sent only for objects with this prefix.

<a href="#">Link to this property</a>

ruleId: optional string

Rule ID.

<a href="#">Link to this property</a>

suffix: optional string

Notifications will be sent only for objects with this suffix.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.event_notifications%20%3E%20(model)%20event_notification_get_response%20%3E%20(schema)>)

EventNotificationUpdateResponse = unknown

[Link to this property](#)%20r2.buckets.event_notifications%20%3E%20(model)%20event_notification_update_response%20%3E%20(schema)>)

EventNotificationDeleteResponse = unknown

[Link to this property](#)%20r2.buckets.event_notifications%20%3E%20(model)%20event_notification_delete_response%20%3E%20(schema)>)