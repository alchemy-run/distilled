---
title: History
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Alerting](https://developers.cloudflare.com/api/resources/alerting)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# History

##### [List History](https://developers.cloudflare.com/api/resources/alerting/subresources/history/methods/list)

GET/accounts/{account\_id}/alerting/v3/history

##### ModelsExpand Collapse

<details>

<summary>

History object {id, alert\_body, alert\_type, 6 more }

</summary>

id: optional string

UUID

maxLength32

<a href="#">Link to this property</a>

alert\_body: optional string

Message body included in the notification sent.

<a href="#">Link to this property</a>

alert\_type: optional string

Type of notification that has been dispatched.

<a href="#">Link to this property</a>

description: optional string

Description of the notification policy (if present).

<a href="#">Link to this property</a>

mechanism: optional string

The mechanism to which the notification has been dispatched.

<a href="#">Link to this property</a>

<details>

<summary>

mechanism\_type: optional "email"or "pagerduty"or "webhook"

The type of mechanism to which the notification has been dispatched. This can be email/pagerduty/webhook based on the mechanism configured.

</summary>

One of the following:

"email"

<a href="#">Link to this property</a>

"pagerduty"

<a href="#">Link to this property</a>

"webhook"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Name of the policy.

<a href="#">Link to this property</a>

policy\_id: optional string

The unique identifier of a notification policy

maxLength32

<a href="#">Link to this property</a>

sent: optional string

Timestamp of when the notification was dispatched in ISO 8601 format.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20alerting.history%20%3E%20(model)%20history%20%3E%20(schema)>)