---
title: Release messages from quarantine
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Security](https://developers.cloudflare.com/api/resources/email_security)

[Investigate](https://developers.cloudflare.com/api/resources/email_security/subresources/investigate)

[Release](https://developers.cloudflare.com/api/resources/email_security/subresources/investigate/subresources/release)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Release messages from quarantine

POST/accounts/{account\_id}/email-security/investigate/release

Delivers one or more quarantined messages to their intended recipients, for cases where a message was incorrectly quarantined. The response includes delivery status for each recipient.

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

##### Accepted Permissions (at least one required)

`Cloud Email Security: Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20email_security.investigate.release%20%3E%20(method)%20bulk%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

body: array of string

[Link to this property](#)%20email_security.investigate.release%20%3E%20(method)%20bulk%20%3E%20(params)%200%20%3E%20(param)%20body%20%3E%20(schema)>)

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

[Link to this property](#)%20email_security.investigate.release%20%3E%20(method)%20bulk%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20email_security.investigate.release%20%3E%20(method)%20bulk%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {id, delivered, failed, 2 more }

</summary>

id: string

Unique identifier for a message retrieved from investigation.

<a href="#">Link to this property</a>

delivered: optional array of string

<a href="#">Link to this property</a>

failed: optional array of string

<a href="#">Link to this property</a>

Deprecatedpostfix\_id: optional string

Use <code>id</code> instead.

Deprecated, use <code>id</code> instead. End of life: November 1, 2026.

<a href="#">Link to this property</a>

undelivered: optional array of string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.investigate.release%20%3E%20(method)%20bulk%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20email_security.investigate.release%20%3E%20(method)%20bulk%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Release messages from quarantine

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/investigate/release \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          "4Njp3P0STMz2c02Q-2024-01-05T10:00:00-12345678"
        ]'
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
  "result": [
    {
      "id": "4Njp3P0STMz2c02Q-2024-01-05T10:00:00-12345678",
      "delivered": [
        "string"
      ],
      "failed": [
        "string"
      ],
      "postfix_id": "4Njp3P0STMz2c02Q",
      "undelivered": [
        "string"
      ]
    }
  ],
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
  "result": [
    {
      "id": "4Njp3P0STMz2c02Q-2024-01-05T10:00:00-12345678",
      "delivered": [
        "string"
      ],
      "failed": [
        "string"
      ],
      "postfix_id": "4Njp3P0STMz2c02Q",
      "undelivered": [
        "string"
      ]
    }
  ],
  "success": true
}
```