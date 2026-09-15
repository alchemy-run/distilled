---
title: Update Status
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Registrar Sandbox](https://developers.cloudflare.com/api/resources/registrar_sandbox)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update Status

##### [Get Update Status](https://developers.cloudflare.com/api/resources/registrar_sandbox/subresources/update_status/methods/get)

GET/accounts/{account\_id}/registrar-sandbox/registrations/{domain\_name}/update-status

##### ModelsExpand Collapse

<details>

<summary>

UpdateStatusGetResponse object {completed, created\_at, links, 4 more }

Status of an async registration workflow.

</summary>

completed: boolean

Indicates whether the workflow reached a terminal state. A <code>succeeded</code> or <code>failed</code> state returns <code>true</code>; <code>pending</code>, <code>in_progress</code>, <code>action_required</code>, and <code>blocked</code> return <code>false</code>.

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

links: object {self, resource }

</summary>

self: string

URL to this status resource.

<a href="#">Link to this property</a>

resource: optional string

URL to the domain resource.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

state: "pending"or "in\_progress"or "action\_required"or 3 more

Describes the workflow lifecycle state.

- <code>pending</code>: The workflow awaits processing.
- <code>in_progress</code>: Processing started. Continue polling <code>links.self</code>. An internal deadline limits the duration of this state.
- <code>action_required</code>: The workflow pauses for user action. See <code>context.action</code> for details. Stop automated polling until the user completes the required action.
- <code>blocked</code>: A third party, such as the domain extension’s registry or a losing registrar, prevents progress. Continue polling because the block may resolve when the third party responds.
- <code>succeeded</code>: Terminal state. The operation completed successfully. <code>completed</code> equals <code>true</code>. For registrations, <code>context.registration</code> contains the resulting registration resource.
- <code>failed</code>: Terminal state. The operation failed. <code>completed</code> equals <code>true</code>. See <code>error.code</code> and <code>error.message</code> for the reason. Require user review before retrying.

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"in\_progress"

<a href="#">Link to this property</a>

"action\_required"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

"succeeded"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: string

formatdate-time

<a href="#">Link to this property</a>

context: optional map\[unknown]

Provides workflow-specific data.

For domain-centric workflows, <code>context.domain_name</code> identifies the workflow subject.

<a href="#">Link to this property</a>

<details>

<summary>

error: optional object {code, message }

Provides error details when a workflow reaches the <code>failed</code> state. The workflow type (registration, update, etc.) and underlying registry response determine the specific codes and messages. Workflow error codes differ from immediate HTTP error <code>errors[].code</code> values in non-2xx responses. Surface <code>error.message</code> to the user for context.

</summary>

code: string

Machine-readable error code identifying the failure reason.

<a href="#">Link to this property</a>

message: string

Human-readable explanation of the failure. May include registry-specific details.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20registrar_sandbox.update_status%20%3E%20(model)%20update_status_get_response%20%3E%20(schema)>)