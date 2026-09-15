---
title: Create webhook jobs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Casb](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb)

[Posture](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture)

[Webhooks](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/webhooks)

[Jobs](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/webhooks/subresources/jobs)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create webhook jobs

POST/accounts/{account\_id}/data-security/posture/webhooks/jobs

Creates webhook jobs to send a finding instance to one or more configured webhooks.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Zero Trust Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.casb.posture.webhooks.jobs%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

finding\_instance\_ids: array of string

Array of finding instance IDs to send to the webhooks.

[Link to this property](#)%20zero_trust.casb.posture.webhooks.jobs%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20finding_instance_ids%20%3E%20(schema)>)

webhook\_ids: array of string

Array of webhook IDs to trigger jobs for.

[Link to this property](#)%20zero_trust.casb.posture.webhooks.jobs%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20webhook_ids%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

</summary>

code: number

Error or message code.

minimum1000

<a href="#">Link to this property</a>

message: string

Human-readable message.

<a href="#">Link to this property</a>

documentation\_url: optional string

Link to relevant documentation.

formaturi

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

JSON pointer to the source of the error.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.webhooks.jobs%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

</summary>

code: number

Error or message code.

minimum1000

<a href="#">Link to this property</a>

message: string

Human-readable message.

<a href="#">Link to this property</a>

documentation\_url: optional string

Link to relevant documentation.

formaturi

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

JSON pointer to the source of the error.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.webhooks.jobs%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {created, failed }

</summary>

<details>

<summary>

created: array of object {id, asset\_data, created\_at, 9 more }

Successfully created webhook jobs.

</summary>

id: string

Unique identifier for the webhook job.

formatuuid

<a href="#">Link to this property</a>

asset\_data: map\[unknown]

Asset data associated with this webhook job.

<a href="#">Link to this property</a>

created\_at: string

When the webhook job was created.

formatdate-time

<a href="#">Link to this property</a>

integration\_id: string

ID of the integration.

formatuuid

<a href="#">Link to this property</a>

last\_updated\_at: string

When the webhook job was last updated.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

parameters: object {finding\_instance\_id }

Parameters for a webhook job.

</summary>

finding\_instance\_id: string

ID of the finding instance.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: "pending"or "processing"or "completed"or "failed"

Status of a webhook job.

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"processing"

<a href="#">Link to this property</a>

"completed"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

triggered\_by\_actor: "user"or "account\_token"

Type of actor that triggered the webhook job.

</summary>

One of the following:

"user"

<a href="#">Link to this property</a>

"account\_token"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

triggered\_by\_id: string

ID of the actor that triggered the job.

<a href="#">Link to this property</a>

webhook\_id: string

ID of the webhook configuration.

formatuuid

<a href="#">Link to this property</a>

failure\_details: optional map\[unknown]

Additional details about the failure.

<a href="#">Link to this property</a>

<details>

<summary>

failure\_reason: optional "Permission Denied"or "Integration Unavailable"or "Service Temporarily Unavailable"or "System Error"

Reason for webhook job failure.

</summary>

One of the following:

"Permission Denied"

<a href="#">Link to this property</a>

"Integration Unavailable"

<a href="#">Link to this property</a>

"Service Temporarily Unavailable"

<a href="#">Link to this property</a>

"System Error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

failed: array of object {error, finding\_instance\_id, webhook\_id }

Failed webhook job creation attempts.

</summary>

error: string

Error message describing the failure.

<a href="#">Link to this property</a>

finding\_instance\_id: string

ID of the finding instance that failed to create a webhook job.

formatuuid

<a href="#">Link to this property</a>

webhook\_id: string

ID of the webhook configuration.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.webhooks.jobs%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

Whether the API call was successful.

[Link to this property](#)%20zero_trust.casb.posture.webhooks.jobs%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Create webhook jobs

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/data-security/posture/webhooks/jobs \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "finding_instance_ids": [
            "770e8400-e29b-41d4-a716-446655440002",
            "660e8400-e29b-41d4-a716-446655440001"
          ],
          "webhook_ids": [
            "550e8400-e29b-41d4-a716-446655440000",
            "660e8400-e29b-41d4-a716-446655440001"
          ]
        }'
```

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "Request processed successfully",
      "documentation_url": "https://developers.cloudflare.com/api/operations/list-findings",
      "source": {
        "pointer": "/data/attributes/name"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "Request processed successfully",
      "documentation_url": "https://developers.cloudflare.com/api/operations/list-findings",
      "source": {
        "pointer": "/data/attributes/name"
      }
    }
  ],
  "result": {
    "created": [
      {
        "id": "c416bc38-75db-425f-ae25-c37b5df5c37f",
        "asset_data": {
          "foo": "bar"
        },
        "created_at": "2025-07-07T18:39:13.123456Z",
        "integration_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "last_updated_at": "2025-07-07T18:39:13.123456Z",
        "parameters": {
          "finding_instance_id": "3f7b8c9d-6e5a-4f3b-9c2d-1e0a8b7c6d5e"
        },
        "status": "pending",
        "triggered_by_actor": "user",
        "triggered_by_id": "user@example.com",
        "webhook_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "failure_details": {
          "foo": "bar"
        },
        "failure_reason": "Permission Denied"
      }
    ],
    "failed": [
      {
        "error": "Failed to create webhook job",
        "finding_instance_id": "2e6b4c8a-9d1f-4e3b-8c7a-5f9e2d1a6b4c",
        "webhook_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      }
    ]
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "Request processed successfully",
      "documentation_url": "https://developers.cloudflare.com/api/operations/list-findings",
      "source": {
        "pointer": "/data/attributes/name"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "Request processed successfully",
      "documentation_url": "https://developers.cloudflare.com/api/operations/list-findings",
      "source": {
        "pointer": "/data/attributes/name"
      }
    }
  ],
  "result": {
    "created": [
      {
        "id": "c416bc38-75db-425f-ae25-c37b5df5c37f",
        "asset_data": {
          "foo": "bar"
        },
        "created_at": "2025-07-07T18:39:13.123456Z",
        "integration_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "last_updated_at": "2025-07-07T18:39:13.123456Z",
        "parameters": {
          "finding_instance_id": "3f7b8c9d-6e5a-4f3b-9c2d-1e0a8b7c6d5e"
        },
        "status": "pending",
        "triggered_by_actor": "user",
        "triggered_by_id": "user@example.com",
        "webhook_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "failure_details": {
          "foo": "bar"
        },
        "failure_reason": "Permission Denied"
      }
    ],
    "failed": [
      {
        "error": "Failed to create webhook job",
        "finding_instance_id": "2e6b4c8a-9d1f-4e3b-8c7a-5f9e2d1a6b4c",
        "webhook_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
      }
    ]
  },
  "success": true
}
```