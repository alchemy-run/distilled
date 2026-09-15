---
title: Initialize new SSO connector
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[IAM](https://developers.cloudflare.com/api/resources/iam)

[SSO](https://developers.cloudflare.com/api/resources/iam/subresources/sso)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Initialize new SSO connector

POST/accounts/{account\_id}/sso\_connectors

Creates a new SSO connector for logging into Cloudflare through an identity provider.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`SSO Connector Write`

##### P ath ParametersExpand Collapse

account\_id: string

Account identifier tag.

maxLength32

minLength32

[Link to this property](#)%20iam.sso%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

email\_domain: string

Email domain of the new SSO connector

[Link to this property](#)%20iam.sso%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20email_domain%20%3E%20(schema)>)

begin\_verification: optional boolean

Begin the verification process after creation

[Link to this property](#)%20iam.sso%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20begin_verification%20%3E%20(schema)>)

use\_fedramp\_language: optional boolean

Controls the display of FedRAMP language to the user during SSO login

[Link to this property](#)%20iam.sso%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20use_fedramp_language%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.sso%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.sso%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20iam.sso%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, created\_on, email\_domain, 4 more }

</summary>

id: optional string

SSO Connector identifier tag.

maxLength32

minLength32

<a href="#">Link to this property</a>

created\_on: optional string

Timestamp for the creation of the SSO connector

formatdate-time

<a href="#">Link to this property</a>

email\_domain: optional string

<a href="#">Link to this property</a>

enabled: optional boolean

<a href="#">Link to this property</a>

updated\_on: optional string

Timestamp for the last update of the SSO connector

formatdate-time

<a href="#">Link to this property</a>

use\_fedramp\_language: optional boolean

Controls the display of FedRAMP language to the user during SSO login

<a href="#">Link to this property</a>

<details>

<summary>

verification: optional object {code, status }

</summary>

code: optional string

DNS verification code. Add this entire string to the DNS TXT record of the email domain to validate ownership.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "awaiting"or "pending"or "failed"or "verified"

The status of the verification code from the verification process.

</summary>

One of the following:

"awaiting"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

"verified"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.sso%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Initialize new SSO connector

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/sso_connectors \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "email_domain": "example.com",
          "begin_verification": true
        }'
```

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "created_on": "2025-01-01T12:21:02Z",
    "email_domain": "example.com",
    "enabled": false,
    "updated_on": "2025-01-01T12:21:02Z",
    "use_fedramp_language": false,
    "verification": {
      "code": "cloudflare_dashboard_sso=023e105f4ecef8ad9ca31a8372d0c353",
      "status": "pending"
    }
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
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "created_on": "2025-01-01T12:21:02Z",
    "email_domain": "example.com",
    "enabled": false,
    "updated_on": "2025-01-01T12:21:02Z",
    "use_fedramp_language": false,
    "verification": {
      "code": "cloudflare_dashboard_sso=023e105f4ecef8ad9ca31a8372d0c353",
      "status": "pending"
    }
  }
}
```