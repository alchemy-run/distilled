---
title: Send an email
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Sending](https://developers.cloudflare.com/api/resources/email_sending)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Send an email

POST/accounts/{account\_id}/email/sending/send

Send an email for the specified account using the structured builder. Provide the sender, recipients, subject, and at least one of text or html; attachments are optional.

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

Identifier of the account.

[Link to this property](#)%20email_sending%20%3E%20(method)%20send%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

from: stringor object {address, name }

Sender email address. Either a plain string or an object with address and name.

</summary>

One of the following:

EmailSendingEmailAddressString = string

An email address as a plain string.

<a href="#">Link to this property</a>

<details>

<summary>

EmailSendingEmailAddressObject object {address, name }

</summary>

address: string

Email address (e.g., ‘<a href="mailto:user@example.com">user@example.com</a>’).

<a href="#">Link to this property</a>

name: optional string

Display name for the email address (e.g., ‘John Doe’). Optional; set to null or leave it unset to send the address on its own.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_sending%20%3E%20(method)%20send%20%3E%20(params)%200%20%3E%20(param)%20from%20%3E%20(schema)>)

subject: string

Email subject line.

[Link to this property](#)%20email_sending%20%3E%20(method)%20send%20%3E%20(params)%200%20%3E%20(param)%20subject%20%3E%20(schema)>)

<details>

<summary>

attachments: optional array of object {content, content\_id, disposition, 2 more } or object {content, disposition, filename, type }

File attachments and inline images.

</summary>

One of the following:

<details>

<summary>

Inline object {content, content\_id, disposition, 2 more }

</summary>

content: string

Base64-encoded content of the attachment.

<a href="#">Link to this property</a>

content\_id: string

Content ID used to reference this attachment in HTML via cid: URI (e.g., ![](cid:logo)).

<a href="#">Link to this property</a>

disposition: "inline"

Use ‘inline’ to embed the attachment in the email body.

<a href="#">Link to this property</a>

filename: string

Filename for the attachment.

<a href="#">Link to this property</a>

type: string

MIME type of the attachment (e.g., ‘image/png’, ‘text/plain’).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Attachment object {content, disposition, filename, type }

</summary>

content: string

Base64-encoded content of the attachment.

<a href="#">Link to this property</a>

disposition: "attachment"

Use ‘attachment’ for a standard file attachment.

<a href="#">Link to this property</a>

filename: string

Filename for the attachment.

<a href="#">Link to this property</a>

type: string

MIME type of the attachment (e.g., ‘application/pdf’, ‘text/plain’).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_sending%20%3E%20(method)%20send%20%3E%20(params)%200%20%3E%20(param)%20attachments%20%3E%20(schema)>)

<details>

<summary>

bcc: optional stringor object {address, name } or array of stringor object {address, name }

Blind carbon copy recipient(s). Optional. A single email string, a named address object, or an array of either.

</summary>

One of the following:

EmailSendingEmailAddressString = string

An email address as a plain string.

<a href="#">Link to this property</a>

<details>

<summary>

EmailSendingEmailAddressObject object {address, name }

</summary>

address: string

Email address (e.g., ‘<a href="mailto:user@example.com">user@example.com</a>’).

<a href="#">Link to this property</a>

name: optional string

Display name for the email address (e.g., ‘John Doe’). Optional; set to null or leave it unset to send the address on its own.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

array of stringor object {address, name }

</summary>

One of the following:

EmailSendingEmailAddressString = string

An email address as a plain string.

<a href="#">Link to this property</a>

<details>

<summary>

EmailSendingEmailAddressObject object {address, name }

</summary>

address: string

Email address (e.g., ‘<a href="mailto:user@example.com">user@example.com</a>’).

<a href="#">Link to this property</a>

name: optional string

Display name for the email address (e.g., ‘John Doe’). Optional; set to null or leave it unset to send the address on its own.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_sending%20%3E%20(method)%20send%20%3E%20(params)%200%20%3E%20(param)%20bcc%20%3E%20(schema)>)

<details>

<summary>

cc: optional stringor object {address, name } or array of stringor object {address, name }

Carbon copy recipient(s). Optional. A single email string, a named address object, or an array of either.

</summary>

One of the following:

EmailSendingEmailAddressString = string

An email address as a plain string.

<a href="#">Link to this property</a>

<details>

<summary>

EmailSendingEmailAddressObject object {address, name }

</summary>

address: string

Email address (e.g., ‘<a href="mailto:user@example.com">user@example.com</a>’).

<a href="#">Link to this property</a>

name: optional string

Display name for the email address (e.g., ‘John Doe’). Optional; set to null or leave it unset to send the address on its own.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

array of stringor object {address, name }

</summary>

One of the following:

EmailSendingEmailAddressString = string

An email address as a plain string.

<a href="#">Link to this property</a>

<details>

<summary>

EmailSendingEmailAddressObject object {address, name }

</summary>

address: string

Email address (e.g., ‘<a href="mailto:user@example.com">user@example.com</a>’).

<a href="#">Link to this property</a>

name: optional string

Display name for the email address (e.g., ‘John Doe’). Optional; set to null or leave it unset to send the address on its own.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_sending%20%3E%20(method)%20send%20%3E%20(params)%200%20%3E%20(param)%20cc%20%3E%20(schema)>)

headers: optional map\[string]

Custom email headers as key-value pairs.

[Link to this property](#)%20email_sending%20%3E%20(method)%20send%20%3E%20(params)%200%20%3E%20(param)%20headers%20%3E%20(schema)>)

html: optional string

HTML body of the email. Provide at least one of text or html (non-empty).

[Link to this property](#)%20email_sending%20%3E%20(method)%20send%20%3E%20(params)%200%20%3E%20(param)%20html%20%3E%20(schema)>)

<details>

<summary>

reply\_to: optional stringor object {address, name }

Reply-to address. Either a plain string or an object with address and name.

</summary>

One of the following:

EmailSendingEmailAddressString = string

An email address as a plain string.

<a href="#">Link to this property</a>

<details>

<summary>

EmailSendingEmailAddressObject object {address, name }

</summary>

address: string

Email address (e.g., ‘<a href="mailto:user@example.com">user@example.com</a>’).

<a href="#">Link to this property</a>

name: optional string

Display name for the email address (e.g., ‘John Doe’). Optional; set to null or leave it unset to send the address on its own.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_sending%20%3E%20(method)%20send%20%3E%20(params)%200%20%3E%20(param)%20reply_to%20%3E%20(schema)>)

text: optional string

Plain text body of the email. Provide at least one of text or html (non-empty).

[Link to this property](#)%20email_sending%20%3E%20(method)%20send%20%3E%20(params)%200%20%3E%20(param)%20text%20%3E%20(schema)>)

<details>

<summary>

to: optional stringor object {address, name } or array of stringor object {address, name }

Recipient(s). Optional if cc or bcc is provided. A single email string, a named address object, or an array of either.

</summary>

One of the following:

EmailSendingEmailAddressString = string

An email address as a plain string.

<a href="#">Link to this property</a>

<details>

<summary>

EmailSendingEmailAddressObject object {address, name }

</summary>

address: string

Email address (e.g., ‘<a href="mailto:user@example.com">user@example.com</a>’).

<a href="#">Link to this property</a>

name: optional string

Display name for the email address (e.g., ‘John Doe’). Optional; set to null or leave it unset to send the address on its own.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

array of stringor object {address, name }

</summary>

One of the following:

EmailSendingEmailAddressString = string

An email address as a plain string.

<a href="#">Link to this property</a>

<details>

<summary>

EmailSendingEmailAddressObject object {address, name }

</summary>

address: string

Email address (e.g., ‘<a href="mailto:user@example.com">user@example.com</a>’).

<a href="#">Link to this property</a>

name: optional string

Display name for the email address (e.g., ‘John Doe’). Optional; set to null or leave it unset to send the address on its own.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_sending%20%3E%20(method)%20send%20%3E%20(params)%200%20%3E%20(param)%20to%20%3E%20(schema)>)

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

[Link to this property](#)%20email_sending%20%3E%20(method)%20send%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message }

</summary>

code: number

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_sending%20%3E%20(method)%20send%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {delivered, message\_id, permanent\_bounces, 2 more }

</summary>

delivered: array of string

Email addresses to which the message was delivered immediately.

<a href="#">Link to this property</a>

message\_id: string

Message ID of the sent email.

<a href="#">Link to this property</a>

permanent\_bounces: array of string

Email addresses that permanently bounced.

<a href="#">Link to this property</a>

queued: array of string

Email addresses for which delivery was queued for later.

<a href="#">Link to this property</a>

suppressed\_recipients: array of string

Email addresses dropped because they are on the suppression list. Returned when suppressed-recipient dropping is enabled for the sending subdomain; otherwise the request fails instead.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_sending%20%3E%20(method)%20send%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

[Link to this property](#)%20email_sending%20%3E%20(method)%20send%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result\_info: optional object {count, per\_page, total\_count, 2 more }

</summary>

count: number

<a href="#">Link to this property</a>

per\_page: number

<a href="#">Link to this property</a>

total\_count: number

<a href="#">Link to this property</a>

cursor: optional string

<a href="#">Link to this property</a>

page: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_sending%20%3E%20(method)%20send%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Send an email

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email/sending/send \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "from": "sender@example.com",
          "subject": "Monthly Report",
          "attachments": [
            {
              "content": "JVBERi0xLjQK...",
              "disposition": "attachment",
              "filename": "report.pdf",
              "type": "application/pdf"
            }
          ],
          "bcc": [
            "bcc-recipient@example.com"
          ],
          "cc": [
            "cc-recipient@example.com"
          ],
          "headers": {
            "X-Custom-Header": "value"
          },
          "html": "<h1>Hello</h1><p>Please find your report attached.</p>",
          "reply_to": "replies@example.com",
          "text": "Hello\\n\\nPlease find your report attached.",
          "to": [
            "recipient@example.com"
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
    "delivered": [
      "recipient@example.com"
    ],
    "message_id": "<aB3xK9mP2qR5sT8uV0wX1yZ4cD6fG7hJ9kL0@example.com>",
    "permanent_bounces": [
      "string"
    ],
    "queued": [
      "string"
    ],
    "suppressed_recipients": [
      "string"
    ]
  },
  "success": true,
  "result_info": {
    "count": 0,
    "per_page": 0,
    "total_count": 0,
    "cursor": "cursor",
    "page": 0
  }
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
    "delivered": [
      "recipient@example.com"
    ],
    "message_id": "<aB3xK9mP2qR5sT8uV0wX1yZ4cD6fG7hJ9kL0@example.com>",
    "permanent_bounces": [
      "string"
    ],
    "queued": [
      "string"
    ],
    "suppressed_recipients": [
      "string"
    ]
  },
  "success": true,
  "result_info": {
    "count": 0,
    "per_page": 0,
    "total_count": 0,
    "cursor": "cursor",
    "page": 0
  }
}
```