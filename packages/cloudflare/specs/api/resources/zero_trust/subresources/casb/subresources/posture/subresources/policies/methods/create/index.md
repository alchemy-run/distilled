---
title: Create a new policy configuration
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Casb](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb)

[Posture](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture)

[Policies](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/policies)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create a new policy configuration

POST/accounts/{account\_id}/data-security/posture/policies

Creates a new policy configuration that defines automated actions to be executed when security findings are detected. A policy can include multiple remediation and/or webhook actions that will be triggered automatically.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Zero Trust Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.casb.posture.policies%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

actions: object {remediation\_types, webhook\_configs }

Actions to execute when this policy is triggered, grouped by action type. A policy must contain at least one action across all groups and may include at most one remediation.

</summary>

<details>

<summary>

remediation\_types: optional array of object {remediation\_type\_id }

Remediation actions to execute (at most one).

</summary>

remediation\_type\_id: string

The ID of the remediation type to execute.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

webhook\_configs: optional array of object {webhook\_config\_id }

Webhook actions to execute.

</summary>

webhook\_config\_id: string

The ID of the webhook configuration to use.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.policies%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20actions%20%3E%20(schema)>)

applies\_to\_all\_integrations: boolean

When true, the policy applies to all integrations for the account. When false, integration\_ids must be provided.

[Link to this property](#)%20zero_trust.casb.posture.policies%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20applies_to_all_integrations%20%3E%20(schema)>)

display\_name: string

Display name for the policy configuration.

maxLength255

[Link to this property](#)%20zero_trust.casb.posture.policies%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20display_name%20%3E%20(schema)>)

enabled: boolean

Boolean specifying if the policy is enabled or disabled.

[Link to this property](#)%20zero_trust.casb.posture.policies%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20enabled%20%3E%20(schema)>)

finding\_type\_id: string

The finding type this policy is associated with. All remediation actions must match this finding type.

formatuuid

[Link to this property](#)%20zero_trust.casb.posture.policies%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20finding_type_id%20%3E%20(schema)>)

description: optional string

Optional description of what this policy does.

maxLength1000

[Link to this property](#)%20zero_trust.casb.posture.policies%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20description%20%3E%20(schema)>)

integration\_ids: optional array of string

The integrations this policy applies to. Required when applies\_to\_all\_integrations is false.

[Link to this property](#)%20zero_trust.casb.posture.policies%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20integration_ids%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.casb.posture.policies%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.casb.posture.policies%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: boolean

Whether the API call was successful.

[Link to this property](#)%20zero_trust.casb.posture.policies%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, actions, applies\_to\_all\_integrations, 9 more }

Response body for a policy configuration.

</summary>

id: string

Unique identifier for the policy configuration.

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

actions: object {remediation\_types, webhook\_configs }

The actions configured for this policy.

</summary>

<details>

<summary>

remediation\_types: array of object {display\_name, remediation\_type, remediation\_type\_id }

List of remediation types that will be executed.

</summary>

display\_name: string

Display name/label of the remediation type.

<a href="#">Link to this property</a>

remediation\_type: string

The system name of the remediation type.

<a href="#">Link to this property</a>

remediation\_type\_id: string

Unique identifier for the remediation type.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

webhook\_configs: array of object {display\_name, webhook\_config\_id }

List of webhook configurations that will be triggered.

</summary>

display\_name: string

Display name/label of the webhook configuration.

<a href="#">Link to this property</a>

webhook\_config\_id: string

Unique identifier for the webhook configuration.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

applies\_to\_all\_integrations: boolean

When true, the policy applies to all integrations for the account. When false, it applies only to the specified integration\_ids.

<a href="#">Link to this property</a>

created\_at: string

Timestamp when the policy was created.

formatdate-time

<a href="#">Link to this property</a>

description: string

User-set description of what this policy does. Limited to 1000 characters.

<a href="#">Link to this property</a>

display\_name: string

Display name for the policy configuration. Limited to 255 characters.

<a href="#">Link to this property</a>

enabled: boolean

Whether the policy is enabled. Derived from disabled\_at (enabled when disabled\_at is unset).

<a href="#">Link to this property</a>

finding\_type\_id: string

The finding type this policy is associated with. Immutable after creation; changing it replaces the policy.

formatuuid

<a href="#">Link to this property</a>

integration\_ids: array of string

The integrations this policy applies to.

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the policy was last updated.

formatdate-time

<a href="#">Link to this property</a>

disabled\_at: optional string

Timestamp when the policy was disabled. Omitted from the response when the policy is enabled.

formatdate-time

<a href="#">Link to this property</a>

last\_triggered\_at: optional string

Timestamp of the most recent successful policy invocation. Omitted from the response when the policy has never been successfully triggered. Only populated on GET responses; absent on responses from create/update endpoints.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.policies%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Create a new policy configuration

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/data-security/posture/policies \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "actions": {},
          "applies_to_all_integrations": false,
          "display_name": "Auto-remediate public files",
          "enabled": true,
          "finding_type_id": "5a7d9e2f-1b3c-4d5e-8f6a-7b8c9d0e1f2a",
          "description": "Automatically remove public access from files when detected",
          "integration_ids": [
            "497f6eca-6276-4993-bfeb-53cbbbba6f08"
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
  "success": true,
  "result": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "actions": {
      "remediation_types": [
        {
          "display_name": "Remove Public Access",
          "remediation_type": "remove_public_access",
          "remediation_type_id": "5a7d9e2f-1b3c-4d5e-8f6a-7b8c9d0e1f2a"
        }
      ],
      "webhook_configs": [
        {
          "display_name": "Send to Slack",
          "webhook_config_id": "3f7b8c9d-6e5a-4f3b-9c2d-1e0a8b7c6d5e"
        }
      ]
    },
    "applies_to_all_integrations": false,
    "created_at": "2025-03-18T17:25:38.700541Z",
    "description": "Automatically remove public access from files when detected",
    "display_name": "Auto-remediate public files",
    "enabled": true,
    "finding_type_id": "5a7d9e2f-1b3c-4d5e-8f6a-7b8c9d0e1f2a",
    "integration_ids": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "updated_at": "2025-03-18T17:25:38.700541Z",
    "disabled_at": "2025-03-18T17:25:38.700541Z",
    "last_triggered_at": "2025-03-18T17:25:38.700541Z"
  }
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
  "success": true,
  "result": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "actions": {
      "remediation_types": [
        {
          "display_name": "Remove Public Access",
          "remediation_type": "remove_public_access",
          "remediation_type_id": "5a7d9e2f-1b3c-4d5e-8f6a-7b8c9d0e1f2a"
        }
      ],
      "webhook_configs": [
        {
          "display_name": "Send to Slack",
          "webhook_config_id": "3f7b8c9d-6e5a-4f3b-9c2d-1e0a8b7c6d5e"
        }
      ]
    },
    "applies_to_all_integrations": false,
    "created_at": "2025-03-18T17:25:38.700541Z",
    "description": "Automatically remove public access from files when detected",
    "display_name": "Auto-remediate public files",
    "enabled": true,
    "finding_type_id": "5a7d9e2f-1b3c-4d5e-8f6a-7b8c9d0e1f2a",
    "integration_ids": [
      "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    ],
    "updated_at": "2025-03-18T17:25:38.700541Z",
    "disabled_at": "2025-03-18T17:25:38.700541Z",
    "last_triggered_at": "2025-03-18T17:25:38.700541Z"
  }
}
```