---
title: Move
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Security](https://developers.cloudflare.com/api/resources/email_security)

[Investigate](https://developers.cloudflare.com/api/resources/email_security/subresources/investigate)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Move

##### [Move a message](https://developers.cloudflare.com/api/resources/email_security/subresources/investigate/subresources/move/methods/create)

POST/accounts/{account\_id}/email-security/investigate/{investigate\_id}/move

##### [Move multiple messages](https://developers.cloudflare.com/api/resources/email_security/subresources/investigate/subresources/move/methods/bulk)

POST/accounts/{account\_id}/email-security/investigate/move

##### ModelsExpand Collapse

<details>

<summary>

MoveCreateResponse object {success, completed\_at, completed\_timestamp, 6 more }

</summary>

success: boolean

Whether the operation succeeded.

<a href="#">Link to this property</a>

completed\_at: optional string

When the move operation completed (UTC).

formatdate-time

<a href="#">Link to this property</a>

Deprecatedcompleted\_timestamp: optional string

Use <code>completed_at</code> instead.

Deprecated, use <code>completed_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

destination: optional string

Destination folder for the message.

<a href="#">Link to this property</a>

Deprecateditem\_count: optional number

This field is deprecated.

Number of items moved. End of life: November 1, 2026.

<a href="#">Link to this property</a>

message\_id: optional string

Message identifier.

<a href="#">Link to this property</a>

operation: optional string

Type of operation performed.

<a href="#">Link to this property</a>

recipient: optional string

Recipient email address.

<a href="#">Link to this property</a>

status: optional string

Operation status.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.investigate.move%20%3E%20(model)%20move_create_response%20%3E%20(schema)>)

<details>

<summary>

MoveBulkResponse object {success, completed\_at, completed\_timestamp, 6 more }

</summary>

success: boolean

Whether the operation succeeded.

<a href="#">Link to this property</a>

completed\_at: optional string

When the move operation completed (UTC).

formatdate-time

<a href="#">Link to this property</a>

Deprecatedcompleted\_timestamp: optional string

Use <code>completed_at</code> instead.

Deprecated, use <code>completed_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

destination: optional string

Destination folder for the message.

<a href="#">Link to this property</a>

Deprecateditem\_count: optional number

This field is deprecated.

Number of items moved. End of life: November 1, 2026.

<a href="#">Link to this property</a>

message\_id: optional string

Message identifier.

<a href="#">Link to this property</a>

operation: optional string

Type of operation performed.

<a href="#">Link to this property</a>

recipient: optional string

Recipient email address.

<a href="#">Link to this property</a>

status: optional string

Operation status.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.investigate.move%20%3E%20(model)%20move_bulk_response%20%3E%20(schema)>)