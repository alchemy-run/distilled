---
title: Bulk Operations
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Rules Lists](https://developers.cloudflare.com/api/resources/rules)

[Lists](https://developers.cloudflare.com/api/resources/rules/subresources/lists)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Bulk Operations

##### [Get bulk operation status](https://developers.cloudflare.com/api/resources/rules/subresources/lists/subresources/bulk_operations/methods/get)

GET/accounts/{account\_id}/rules/lists/bulk\_operations/{operation\_id}

##### ModelsExpand Collapse

<details>

<summary>

BulkOperationGetResponse = object {id, status } or object {id, completed, status } or object {id, completed, error, status }

</summary>

One of the following:

<details>

<summary>

ListsBulkOperationPendingOrRunning object {id, status }

</summary>

id: string

The unique operation ID of the asynchronous action.

<a href="#">Link to this property</a>

<details>

<summary>

status: "pending"or "running"

The current status of the asynchronous operation.

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"running"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ListsBulkOperationCompleted object {id, completed, status }

</summary>

id: string

The unique operation ID of the asynchronous action.

<a href="#">Link to this property</a>

completed: string

The RFC 3339 timestamp of when the operation was completed.

<a href="#">Link to this property</a>

status: "completed"

The current status of the asynchronous operation.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ListsBulkOperationFailed object {id, completed, error, status }

</summary>

id: string

The unique operation ID of the asynchronous action.

<a href="#">Link to this property</a>

completed: string

The RFC 3339 timestamp of when the operation was completed.

<a href="#">Link to this property</a>

error: string

A message describing the error when the status is <code>failed</code>.

<a href="#">Link to this property</a>

status: "failed"

The current status of the asynchronous operation.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20rules.lists.bulk_operations%20%3E%20(model)%20bulk_operation_get_response%20%3E%20(schema)>)