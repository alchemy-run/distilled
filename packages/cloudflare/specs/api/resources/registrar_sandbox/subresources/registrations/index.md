---
title: Registrations
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Registrar Sandbox](https://developers.cloudflare.com/api/resources/registrar_sandbox)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Registrations

##### [Create Registration](https://developers.cloudflare.com/api/resources/registrar_sandbox/subresources/registrations/methods/create)

POST/accounts/{account\_id}/registrar-sandbox/registrations

##### [List Registrations](https://developers.cloudflare.com/api/resources/registrar_sandbox/subresources/registrations/methods/list)

GET/accounts/{account\_id}/registrar-sandbox/registrations

##### [Get Registration](https://developers.cloudflare.com/api/resources/registrar_sandbox/subresources/registrations/methods/get)

GET/accounts/{account\_id}/registrar-sandbox/registrations/{domain\_name}

##### [Update Registration](https://developers.cloudflare.com/api/resources/registrar_sandbox/subresources/registrations/methods/edit)

PATCH/accounts/{account\_id}/registrar-sandbox/registrations/{domain\_name}

##### ModelsExpand Collapse

<details>

<summary>

RegistrationCreateResponse object {completed, created\_at, links, 4 more }

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

[Link to this property](#)%20registrar_sandbox.registrations%20%3E%20(model)%20registration_create_response%20%3E%20(schema)>)

<details>

<summary>

RegistrationListResponse object {auto\_renew, created\_at, domain\_name, 4 more }

A domain registration resource representing the current state of a registered domain.

</summary>

auto\_renew: boolean

Whether automatic renewal occurs before expiration.

<a href="#">Link to this property</a>

created\_at: string

When the domain was registered. Present when the registration resource exists.

formatdate-time

<a href="#">Link to this property</a>

domain\_name: string

Provides a fully qualified domain name (FQDN), including the extension (e.g., <code>example.com</code>, <code>mybrand.app</code>). The domain name uniquely identifies a registration. Cloudflare permits only one registration per domain, making the domain name a natural idempotency key for registration requests.

<a href="#">Link to this property</a>

expires\_at: string

When the domain registration expires. Ready registrations include this value; only <code>registration_pending</code> may return null.

formatdate-time

<a href="#">Link to this property</a>

locked: boolean

Whether the domain is locked for transfer.

<a href="#">Link to this property</a>

<details>

<summary>

privacy\_mode: "off"or "redaction"

Current WHOIS privacy mode for the registration.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"redaction"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: "active"or "registration\_pending"or "expired"or 3 more

Current registration status.

- <code>active</code>: The domain operates with an active registration.
- <code>registration_pending</code>: Registration remains in progress.
- <code>expired</code>: The domain registration expired.
- <code>suspended</code>: The registry suspended the domain.
- <code>redemption_period</code>: The domain entered the redemption grace period.
- <code>pending_delete</code>: The registry scheduled the domain for deletion.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"registration\_pending"

<a href="#">Link to this property</a>

"expired"

<a href="#">Link to this property</a>

"suspended"

<a href="#">Link to this property</a>

"redemption\_period"

<a href="#">Link to this property</a>

"pending\_delete"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20registrar_sandbox.registrations%20%3E%20(model)%20registration_list_response%20%3E%20(schema)>)

<details>

<summary>

RegistrationGetResponse object {auto\_renew, created\_at, domain\_name, 4 more }

A domain registration resource representing the current state of a registered domain.

</summary>

auto\_renew: boolean

Whether automatic renewal occurs before expiration.

<a href="#">Link to this property</a>

created\_at: string

When the domain was registered. Present when the registration resource exists.

formatdate-time

<a href="#">Link to this property</a>

domain\_name: string

Provides a fully qualified domain name (FQDN), including the extension (e.g., <code>example.com</code>, <code>mybrand.app</code>). The domain name uniquely identifies a registration. Cloudflare permits only one registration per domain, making the domain name a natural idempotency key for registration requests.

<a href="#">Link to this property</a>

expires\_at: string

When the domain registration expires. Ready registrations include this value; only <code>registration_pending</code> may return null.

formatdate-time

<a href="#">Link to this property</a>

locked: boolean

Whether the domain is locked for transfer.

<a href="#">Link to this property</a>

<details>

<summary>

privacy\_mode: "off"or "redaction"

Current WHOIS privacy mode for the registration.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"redaction"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: "active"or "registration\_pending"or "expired"or 3 more

Current registration status.

- <code>active</code>: The domain operates with an active registration.
- <code>registration_pending</code>: Registration remains in progress.
- <code>expired</code>: The domain registration expired.
- <code>suspended</code>: The registry suspended the domain.
- <code>redemption_period</code>: The domain entered the redemption grace period.
- <code>pending_delete</code>: The registry scheduled the domain for deletion.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"registration\_pending"

<a href="#">Link to this property</a>

"expired"

<a href="#">Link to this property</a>

"suspended"

<a href="#">Link to this property</a>

"redemption\_period"

<a href="#">Link to this property</a>

"pending\_delete"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20registrar_sandbox.registrations%20%3E%20(model)%20registration_get_response%20%3E%20(schema)>)

<details>

<summary>

RegistrationEditResponse object {completed, created\_at, links, 4 more }

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

[Link to this property](#)%20registrar_sandbox.registrations%20%3E%20(model)%20registration_edit_response%20%3E%20(schema)>)