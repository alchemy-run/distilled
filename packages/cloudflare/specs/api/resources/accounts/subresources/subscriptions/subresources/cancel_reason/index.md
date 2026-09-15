---
title: Cancel Reason
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Accounts](https://developers.cloudflare.com/api/resources/accounts)

[Subscriptions](https://developers.cloudflare.com/api/resources/accounts/subresources/subscriptions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Cancel Reason

##### [Create Cancel Reason](https://developers.cloudflare.com/api/resources/accounts/subresources/subscriptions/subresources/cancel_reason/methods/create)

POST/accounts/{account\_id}/subscriptions/{subscription\_identifier}/cancel-reason

##### [Get Cancel Reason](https://developers.cloudflare.com/api/resources/accounts/subresources/subscriptions/subresources/cancel_reason/methods/get)

GET/accounts/{account\_id}/subscriptions/{subscription\_identifier}/cancel-reason

##### ModelsExpand Collapse

<details>

<summary>

CancelReasonCreateResponse object {id, other, reason\_code, 2 more }

</summary>

id: optional string

The cancel reason identifier.

<a href="#">Link to this property</a>

other: optional string

Additional cancellation details.

<a href="#">Link to this property</a>

reason\_code: optional array of string

The cancellation reason codes.

<a href="#">Link to this property</a>

submitted: optional string

When the cancel reason was submitted.

formatdate-time

<a href="#">Link to this property</a>

subscription\_id: optional string

The subscription identifier.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.subscriptions.cancel_reason%20%3E%20(model)%20cancel_reason_create_response%20%3E%20(schema)>)

<details>

<summary>

CancelReasonGetResponse object {id, other, reason\_code, 2 more }

</summary>

id: optional string

The cancel reason identifier.

<a href="#">Link to this property</a>

other: optional string

Additional cancellation details.

<a href="#">Link to this property</a>

reason\_code: optional array of string

The cancellation reason codes.

<a href="#">Link to this property</a>

submitted: optional string

When the cancel reason was submitted.

formatdate-time

<a href="#">Link to this property</a>

subscription\_id: optional string

The subscription identifier.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.subscriptions.cancel_reason%20%3E%20(model)%20cancel_reason_get_response%20%3E%20(schema)>)