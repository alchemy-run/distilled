---
title: Create deployment group
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Devices](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices)

[Deployment Groups](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/deployment_groups)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create deployment group

POST/accounts/{account\_id}/devices/deployment-groups

Creates a new deployment group. Policy IDs must be unique across all deployment groups. This endpoint is in Beta.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.devices.deployment_groups%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

name: string

A user-friendly name for the deployment group.

maxLength255

minLength1

[Link to this property](#)%20zero_trust.devices.deployment_groups%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

<details>

<summary>

version\_config: array of object {target\_environment, version }

Contains at least one version configuration.

</summary>

target\_environment: string

The target environment for the client version (e.g., windows, macos).

<a href="#">Link to this property</a>

version: string

The specific client version to deploy.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.deployment_groups%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20version_config%20%3E%20(schema)>)

policy\_ids: optional array of string

Contains an optional list of policy IDs assigned to a group.

[Link to this property](#)%20zero_trust.devices.deployment_groups%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20policy_ids%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message }

</summary>

code: number

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.deployment_groups%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message }

</summary>

code: number

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.deployment_groups%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.devices.deployment_groups%20%3E%20(model)%20deployment_group%20%3E%20(schema)">DeploymentGroup</a> { id, created\_at, name, 3 more }

</summary>

id: string

The ID of the deployment group.

<a href="#">Link to this property</a>

created\_at: string

The RFC3339Nano timestamp when the deployment group was created.

<a href="#">Link to this property</a>

name: string

A user-friendly name for the deployment group.

maxLength255

minLength1

<a href="#">Link to this property</a>

updated\_at: string

The RFC3339Nano timestamp when the deployment group was last updated.

<a href="#">Link to this property</a>

<details>

<summary>

version\_config: array of object {target\_environment, version }

Contains version configurations for different target environments.

</summary>

target\_environment: string

The target environment for the client version (e.g., windows, macos).

<a href="#">Link to this property</a>

version: string

The specific client version to deploy.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

policy\_ids: optional array of string

Contains a list of policy IDs assigned to this deployment group.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.deployment_groups%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

Indicates whether the API call was successful.

[Link to this property](#)%20zero_trust.devices.deployment_groups%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Create deployment group

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/deployment-groups \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "Engineering Ring 0",
          "version_config": [
            {
              "target_environment": "windows",
              "version": "2026.6.234.0"
            }
          ]
        }'
```

200 example

```
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "created_at": "2026-02-14T13:17:00.123456789Z",
    "name": "Engineering Ring 0",
    "updated_at": "2026-02-14T13:17:00.123456789Z",
    "version_config": [
      {
        "target_environment": "windows",
        "version": "2026.6.234.0"
      }
    ],
    "policy_ids": [
      "policy-uuid-1",
      "policy-uuid-2"
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
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "created_at": "2026-02-14T13:17:00.123456789Z",
    "name": "Engineering Ring 0",
    "updated_at": "2026-02-14T13:17:00.123456789Z",
    "version_config": [
      {
        "target_environment": "windows",
        "version": "2026.6.234.0"
      }
    ],
    "policy_ids": [
      "policy-uuid-1",
      "policy-uuid-2"
    ]
  },
  "success": true
}
```