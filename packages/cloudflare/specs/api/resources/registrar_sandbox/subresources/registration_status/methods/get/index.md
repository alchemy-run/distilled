---
title: Get Registration Status
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Registrar Sandbox](https://developers.cloudflare.com/api/resources/registrar_sandbox)

[Registration Status](https://developers.cloudflare.com/api/resources/registrar_sandbox/subresources/registration_status)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get Registration Status

GET/accounts/{account\_id}/registrar-sandbox/registrations/{domain\_name}/registration-status

Returns the current status of a domain registration workflow.

Use this endpoint to poll for completion when the POST response returned `202 Accepted`. The URL is provided in the `links.self` field of the workflow status response.

Poll this endpoint until the workflow reaches a terminal state or a state that requires user attention.

**Terminal states:** `succeeded` and `failed` are terminal and always have `completed: true`.

**Non-terminal states:**

- `action_required` has `completed: false` and will not resolve on its own. The workflow is paused pending user intervention.
- `blocked` has `completed: false` and indicates the workflow is waiting on a third party such as the extension registry or losing registrar. Continue polling while informing the user of the delay.

Use increasing backoff between polls. When `state: blocked`, use a longer polling interval and do not poll indefinitely.

A naive polling loop that only checks `completed` can run indefinitely when `state: action_required`. Break explicitly on `action_required`:

```js
let status;
do {
  await new Promise(r => setTimeout(r, 2000));
  status = await cloudflare.request({
    method: 'GET',
    path: reg.result.links.self,
  });
} while (
  !status.result.completed &&
  status.result.state !== 'action_required'
);

if (status.result.state === 'action_required') {
  // Surface context.action and context.confirmation_sent_to to the user.
  // Do not re-submit the registration request.
}
```

##### Security

<details>

<summary>API Token</summary>



The preferred authorization scheme for interacting with the Cloudflare API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/create-token/">Create a token</a>.

**Example:**<code>Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY</code>

</details>

<details>

<summary>API Email + API Key</summary>



The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**<code>X-Auth-Email: user@example.com</code>

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**<code>X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194</code>

</details>

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20registrar_sandbox.registration_status%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

domain\_name: string

Provides a fully qualified domain name (FQDN), including the extension (e.g., `example.com`, `mybrand.app`). The domain name uniquely identifies a registration. Cloudflare permits only one registration per domain, making the domain name a natural idempotency key for registration requests.

[Link to this property](#)%20registrar_sandbox.registration_status%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20domain_name%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

Location of the invalid value that caused the error.

</summary>

pointer: string

JSON Pointer to the invalid or missing request value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20registrar_sandbox.registration_status%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

Location of the invalid value that caused the error.

</summary>

pointer: string

JSON Pointer to the invalid or missing request value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20registrar_sandbox.registration_status%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {completed, created\_at, links, 4 more }

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

[Link to this property](#)%20registrar_sandbox.registration_status%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20registrar_sandbox.registration_status%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get Registration Status

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/registrar-sandbox/registrations/$DOMAIN_NAME/registration-status \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

200 example

200 example

200 example

200 example

4XX example

```
{
  "errors": [],
  "messages": [],
  "result": {
    "completed": false,
    "context": {
      "action": "registrant_email_confirmation_pending",
      "confirmation_sent_to": "a***@example.com",
      "domain_name": "example.com"
    },
    "created_at": "2025-10-27T10:00:00Z",
    "links": {
      "resource": "/accounts/abc/registrar/registrations/example.com",
      "self": "/accounts/abc/registrar/registrations/example.com/registration-status"
    },
    "state": "action_required",
    "updated_at": "2025-10-27T10:01:00Z"
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": {
    "completed": false,
    "context": {
      "blocked_by": "registry",
      "detail": "Awaiting registry confirmation. This may take up to 24 hours.",
      "domain_name": "example.com"
    },
    "created_at": "2025-10-27T10:00:00Z",
    "links": {
      "resource": "/accounts/abc/registrar/registrations/example.com",
      "self": "/accounts/abc/registrar/registrations/example.com/registration-status"
    },
    "state": "blocked",
    "updated_at": "2025-10-27T10:05:00Z"
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": {
    "completed": true,
    "context": {
      "domain_name": "example.com"
    },
    "created_at": "2025-10-27T10:00:00Z",
    "error": {
      "code": "registry_rejected",
      "message": "Registry rejected the registration request."
    },
    "links": {
      "resource": "/accounts/abc/registrar/registrations/example.com",
      "self": "/accounts/abc/registrar/registrations/example.com/registration-status"
    },
    "state": "failed",
    "updated_at": "2025-10-27T10:00:08Z"
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": {
    "completed": false,
    "context": {
      "domain_name": "example.com"
    },
    "created_at": "2025-10-27T10:00:00Z",
    "links": {
      "resource": "/accounts/abc/registrar/registrations/example.com",
      "self": "/accounts/abc/registrar/registrations/example.com/registration-status"
    },
    "state": "in_progress",
    "updated_at": "2025-10-27T10:00:12Z"
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": {
    "completed": true,
    "context": {
      "domain_name": "example.com",
      "registration": {
        "auto_renew": true,
        "created_at": "2025-10-27T10:00:00Z",
        "domain_name": "example.com",
        "expires_at": "2026-10-27T10:00:00Z",
        "locked": true,
        "privacy_mode": "redaction",
        "status": "active"
      }
    },
    "created_at": "2025-10-27T10:00:00Z",
    "links": {
      "resource": "/accounts/abc/registrar/registrations/example.com",
      "self": "/accounts/abc/registrar/registrations/example.com/registration-status"
    },
    "state": "succeeded",
    "updated_at": "2025-10-27T10:00:03Z"
  },
  "success": true
}
```

```
{
  "errors": [
    {
      "code": 10000,
      "message": "No workflow found for example.com"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```

##### Returns Examples

200 example

200 example

200 example

200 example

200 example

4XX example

```
{
  "errors": [],
  "messages": [],
  "result": {
    "completed": false,
    "context": {
      "action": "registrant_email_confirmation_pending",
      "confirmation_sent_to": "a***@example.com",
      "domain_name": "example.com"
    },
    "created_at": "2025-10-27T10:00:00Z",
    "links": {
      "resource": "/accounts/abc/registrar/registrations/example.com",
      "self": "/accounts/abc/registrar/registrations/example.com/registration-status"
    },
    "state": "action_required",
    "updated_at": "2025-10-27T10:01:00Z"
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": {
    "completed": false,
    "context": {
      "blocked_by": "registry",
      "detail": "Awaiting registry confirmation. This may take up to 24 hours.",
      "domain_name": "example.com"
    },
    "created_at": "2025-10-27T10:00:00Z",
    "links": {
      "resource": "/accounts/abc/registrar/registrations/example.com",
      "self": "/accounts/abc/registrar/registrations/example.com/registration-status"
    },
    "state": "blocked",
    "updated_at": "2025-10-27T10:05:00Z"
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": {
    "completed": true,
    "context": {
      "domain_name": "example.com"
    },
    "created_at": "2025-10-27T10:00:00Z",
    "error": {
      "code": "registry_rejected",
      "message": "Registry rejected the registration request."
    },
    "links": {
      "resource": "/accounts/abc/registrar/registrations/example.com",
      "self": "/accounts/abc/registrar/registrations/example.com/registration-status"
    },
    "state": "failed",
    "updated_at": "2025-10-27T10:00:08Z"
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": {
    "completed": false,
    "context": {
      "domain_name": "example.com"
    },
    "created_at": "2025-10-27T10:00:00Z",
    "links": {
      "resource": "/accounts/abc/registrar/registrations/example.com",
      "self": "/accounts/abc/registrar/registrations/example.com/registration-status"
    },
    "state": "in_progress",
    "updated_at": "2025-10-27T10:00:12Z"
  },
  "success": true
}
```

```
{
  "errors": [],
  "messages": [],
  "result": {
    "completed": true,
    "context": {
      "domain_name": "example.com",
      "registration": {
        "auto_renew": true,
        "created_at": "2025-10-27T10:00:00Z",
        "domain_name": "example.com",
        "expires_at": "2026-10-27T10:00:00Z",
        "locked": true,
        "privacy_mode": "redaction",
        "status": "active"
      }
    },
    "created_at": "2025-10-27T10:00:00Z",
    "links": {
      "resource": "/accounts/abc/registrar/registrations/example.com",
      "self": "/accounts/abc/registrar/registrations/example.com/registration-status"
    },
    "state": "succeeded",
    "updated_at": "2025-10-27T10:00:03Z"
  },
  "success": true
}
```

```
{
  "errors": [
    {
      "code": 10000,
      "message": "No workflow found for example.com"
    }
  ],
  "messages": [],
  "result": null,
  "success": false
}
```