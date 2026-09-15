---
title: Move a message
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Security](https://developers.cloudflare.com/api/resources/email_security)

[Investigate](https://developers.cloudflare.com/api/resources/email_security/subresources/investigate)

[Move](https://developers.cloudflare.com/api/resources/email_security/subresources/investigate/subresources/move)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Move a message

POST/accounts/{account\_id}/email-security/investigate/{investigate\_id}/move

Moves a single message to a specified mailbox folder (Inbox, JunkEmail, DeletedItems, RecoverableItemsDeletions, or RecoverableItemsPurges). Requires active integration.

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

[Link to this property](#)%20email_security.investigate.move%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

investigate\_id: string

Unique identifier for a message retrieved from investigation.

[Link to this property](#)%20email_security.investigate.move%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20investigate_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

destination: "Inbox"or "JunkEmail"or "DeletedItems"or 2 more

</summary>

One of the following:

"Inbox"

<a href="#">Link to this property</a>

"JunkEmail"

<a href="#">Link to this property</a>

"DeletedItems"

<a href="#">Link to this property</a>

"RecoverableItemsDeletions"

<a href="#">Link to this property</a>

"RecoverableItemsPurges"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.investigate.move%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20destination%20%3E%20(schema)>)

<details>

<summary>

expected\_disposition: optional "MALICIOUS"or "MALICIOUS-BEC"or "SUSPICIOUS"or 7 more

</summary>

One of the following:

"MALICIOUS"

<a href="#">Link to this property</a>

"MALICIOUS-BEC"

<a href="#">Link to this property</a>

"SUSPICIOUS"

<a href="#">Link to this property</a>

"SPOOF"

<a href="#">Link to this property</a>

"SPAM"

<a href="#">Link to this property</a>

"BULK"

<a href="#">Link to this property</a>

"ENCRYPTED"

<a href="#">Link to this property</a>

"EXTERNAL"

<a href="#">Link to this property</a>

"UNKNOWN"

<a href="#">Link to this property</a>

"NONE"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.investigate.move%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20expected_disposition%20%3E%20(schema)>)

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

[Link to this property](#)%20email_security.investigate.move%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20email_security.investigate.move%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {success, completed\_at, completed\_timestamp, 6 more }

</summary>

success: boolean

Whether the operation succeeded.

<a href="#">Link to this property</a>

completed\_at: optional string

When the move operation completed (UTC).

formatdate-time

<a href="#">Link to this property</a>

Deprecatedcompleted\_timestamp: optional string

Use <code>completed_at</code> instead.

Deprecated, use <code>completed_at</code> instead. End of life: November 1, 2026.

formatdate-time

<a href="#">Link to this property</a>

destination: optional string

Destination folder for the message.

<a href="#">Link to this property</a>

Deprecateditem\_count: optional number

This field is deprecated.

Number of items moved. End of life: November 1, 2026.

<a href="#">Link to this property</a>

message\_id: optional string

Message identifier.

<a href="#">Link to this property</a>

operation: optional string

Type of operation performed.

<a href="#">Link to this property</a>

recipient: optional string

Recipient email address.

<a href="#">Link to this property</a>

status: optional string

Operation status.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.investigate.move%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20email_security.investigate.move%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Move a message

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/investigate/$INVESTIGATE_ID/move \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "destination": "Inbox"
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
  "result": [
    {
      "success": true,
      "completed_at": "2019-12-27T18:11:19.117Z",
      "completed_timestamp": "2019-12-27T18:11:19.117Z",
      "destination": "destination",
      "item_count": 0,
      "message_id": "message_id",
      "operation": "operation",
      "recipient": "recipient",
      "status": "status"
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
      "success": true,
      "completed_at": "2019-12-27T18:11:19.117Z",
      "completed_timestamp": "2019-12-27T18:11:19.117Z",
      "destination": "destination",
      "item_count": 0,
      "message_id": "message_id",
      "operation": "operation",
      "recipient": "recipient",
      "status": "status"
    }
  ],
  "success": true
}
```