---
title: List webhook configurations
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Casb](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb)

[Posture](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture)

[Webhooks](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/webhooks)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List webhook configurations

GET/accounts/{account\_id}/data-security/posture/webhooks

Retrieves all webhook configurations for the authenticated account. Returns an array of webhook configurations that can be used to send finding notifications.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Zero Trust Read``Zero Trust Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.casb.posture.webhooks%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.casb.posture.webhooks%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.casb.posture.webhooks%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: boolean

Whether the API call was successful.

[Link to this property](#)%20zero_trust.casb.posture.webhooks%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of object {id, authentication\_type, created\_at, 6 more }

List of webhook configurations.

</summary>

id: string

Unique identifier for the specific webhook configuration.

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

authentication\_type: "Basic Auth"or "None"or "Bearer Auth"or 2 more

Type of authentication used for the webhook.

</summary>

One of the following:

"Basic Auth"

<a href="#">Link to this property</a>

"None"

<a href="#">Link to this property</a>

"Bearer Auth"

<a href="#">Link to this property</a>

"Static Headers"

<a href="#">Link to this property</a>

"HMAC-Signing"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: string

Timestamp when the webhook configuration was created.

formatdate-time

<a href="#">Link to this property</a>

destination\_url: string

Target URL for the webhook configuration. Where resulting data will be sent.

formaturi

<a href="#">Link to this property</a>

label: string

Account-specified display label for the webhook configuration.

<a href="#">Link to this property</a>

<details>

<summary>

status: "enabled"or "disabled"

Current status of the webhook configuration. If disabled, data cannot be sent through this configuration.

</summary>

One of the following:

"enabled"

<a href="#">Link to this property</a>

"disabled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the webhook configuration was last updated.

formatdate-time

<a href="#">Link to this property</a>

version: number

Version number of the configuration.

formatuint32

<a href="#">Link to this property</a>

<details>

<summary>

headers: optional array of object {key, value }

List of header keys configured for this webhook. Values are not included for security reasons.

</summary>

key: optional string

Header key name (lowercase).

<a href="#">Link to this property</a>

value: optional string

Header value. This field is never returned in API responses for security reasons.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.webhooks%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### List webhook configurations

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/data-security/posture/webhooks \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "result": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "authentication_type": "Bearer Auth",
      "created_at": "2024-01-15T10:30:00Z",
      "destination_url": "https://example.com/webhook",
      "label": "Send to Gmail",
      "status": "enabled",
      "updated_at": "2024-01-20T14:45:00Z",
      "version": 1,
      "headers": [
        {
          "key": "authorization"
        }
      ]
    }
  ]
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
  "result": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "authentication_type": "Bearer Auth",
      "created_at": "2024-01-15T10:30:00Z",
      "destination_url": "https://example.com/webhook",
      "label": "Send to Gmail",
      "status": "enabled",
      "updated_at": "2024-01-20T14:45:00Z",
      "version": 1,
      "headers": [
        {
          "key": "authorization"
        }
      ]
    }
  ]
}
```