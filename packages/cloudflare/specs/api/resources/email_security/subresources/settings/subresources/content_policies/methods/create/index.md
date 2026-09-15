---
title: Create a content policy
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Security](https://developers.cloudflare.com/api/resources/email_security)

[Settings](https://developers.cloudflare.com/api/resources/email_security/subresources/settings)

[Content Policies](https://developers.cloudflare.com/api/resources/email_security/subresources/settings/subresources/content_policies)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create a content policy

POST/accounts/{account\_id}/email-security/settings/content\_policies

Creates a new content policy. Emails whose subject or body matches the pattern will be subject to the configured action.

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

[Link to this property](#)%20email_security.settings.content_policies%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

enabled: boolean

[Link to this property](#)%20email_security.settings.content_policies%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20enabled%20%3E%20(schema)>)

name: string

maxLength256

minLength1

[Link to this property](#)%20email_security.settings.content_policies%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

pattern: string

maxLength2048

minLength1

[Link to this property](#)%20email_security.settings.content_policies%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20pattern%20%3E%20(schema)>)

<details>

<summary>

targets: array of "SUBJECT"or "BODY"

</summary>

One of the following:

"SUBJECT"

<a href="#">Link to this property</a>

"BODY"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.content_policies%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20targets%20%3E%20(schema)>)

notes: optional string

maxLength4096

[Link to this property](#)%20email_security.settings.content_policies%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20notes%20%3E%20(schema)>)

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

[Link to this property](#)%20email_security.settings.content_policies%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20email_security.settings.content_policies%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20email_security.settings.content_policies%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, created\_at, enabled, 5 more }

A content policy pattern that matches against the subject or body of an email.

</summary>

id: optional string

Content policy identifier.

formatuuid

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

enabled: optional boolean

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

name: optional string

maxLength256

minLength1

<a href="#">Link to this property</a>

notes: optional string

maxLength4096

<a href="#">Link to this property</a>

pattern: optional string

maxLength2048

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

targets: optional array of "SUBJECT"or "BODY"

</summary>

One of the following:

"SUBJECT"

<a href="#">Link to this property</a>

"BODY"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.settings.content_policies%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Create a content policy

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/content_policies \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "enabled": true,
          "name": "Block phishing keywords",
          "pattern": "urgent.*verify.*account",
          "targets": [
            "SUBJECT"
          ],
          "notes": "Blocks common phishing subject lines"
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "enabled": true,
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "name": "Block phishing keywords",
    "notes": "Blocks common phishing subject lines",
    "pattern": "urgent.*verify.*account",
    "targets": [
      "SUBJECT"
    ]
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "enabled": true,
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "name": "Block phishing keywords",
    "notes": "Blocks common phishing subject lines",
    "pattern": "urgent.*verify.*account",
    "targets": [
      "SUBJECT"
    ]
  }
}
```