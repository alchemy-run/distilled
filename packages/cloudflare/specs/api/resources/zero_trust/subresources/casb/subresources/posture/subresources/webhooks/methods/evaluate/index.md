---
title: Test a webhook configuration before creating it
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

# Test a webhook configuration before creating it

POST/accounts/{account\_id}/data-security/posture/webhooks/evaluate

Sends a test webhook event to the specified destination URL to verify the webhook endpoint is reachable and properly configured. This allows customers to validate their webhook configuration before creating the actual webhook resource.

The test payload includes:

- event\_type: “webhook.test”
- timestamp: Current UTC timestamp
- message: Test message indicating this is from Cloudflare CASB
- data: Object with test: true

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Zero Trust Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.casb.posture.webhooks%20%3E%20(method)%20evaluate%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

authentication\_type: "Basic Auth"or "None"or "Bearer Auth"or 2 more

Type of authentication to use for the test webhook request.

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

[Link to this property](#)%20zero_trust.casb.posture.webhooks%20%3E%20(method)%20evaluate%20%3E%20(params)%200%20%3E%20(param)%20authentication_type%20%3E%20(schema)>)

destination\_url: string

Target URL to send the test webhook event to.

formaturi

[Link to this property](#)%20zero_trust.casb.posture.webhooks%20%3E%20(method)%20evaluate%20%3E%20(params)%200%20%3E%20(param)%20destination_url%20%3E%20(schema)>)

<details>

<summary>

headers: optional array of object {key, value }

List of custom headers to include in the test webhook request.

</summary>

key: string

Header key name.

maxLength255

<a href="#">Link to this property</a>

value: optional string

Header value. Required on Create and Evaluate. On Update, omit or set to null to keep existing value.

maxLength4096

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.webhooks%20%3E%20(method)%20evaluate%20%3E%20(params)%200%20%3E%20(param)%20headers%20%3E%20(schema)>)

signing\_secret: optional string

Secret key used for HMAC signing when authentication\_type is “HMAC-Signing”.

[Link to this property](#)%20zero_trust.casb.posture.webhooks%20%3E%20(method)%20evaluate%20%3E%20(params)%200%20%3E%20(param)%20signing_secret%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.casb.posture.webhooks%20%3E%20(method)%20evaluate%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.casb.posture.webhooks%20%3E%20(method)%20evaluate%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: boolean

Whether the API call was successful.

[Link to this property](#)%20zero_trust.casb.posture.webhooks%20%3E%20(method)%20evaluate%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {message, status\_code, success }

Response body for webhook evaluation test results.

</summary>

message: string

Human-readable message describing the test result.

<a href="#">Link to this property</a>

status\_code: number

HTTP status code returned by the webhook endpoint. 0 if connection failed.

<a href="#">Link to this property</a>

success: boolean

Whether the webhook test was successful (received 2xx response).

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.webhooks%20%3E%20(method)%20evaluate%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Test a webhook configuration before creating it

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/data-security/posture/webhooks/evaluate \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "authentication_type": "Bearer Auth",
          "destination_url": "https://example.com/webhook",
          "headers": [
            {
              "key": "Authorization",
              "value": "Bearer token123"
            },
            {
              "key": "X-Custom-Header",
              "value": "value"
            }
          ],
          "signing_secret": "my-secret-key"
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
    "message": "Webhook test successful",
    "status_code": 200,
    "success": true
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
    "message": "Webhook test successful",
    "status_code": 200,
    "success": true
  }
}
```