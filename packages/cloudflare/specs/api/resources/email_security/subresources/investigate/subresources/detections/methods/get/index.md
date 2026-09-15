---
title: Get message detection details
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Security](https://developers.cloudflare.com/api/resources/email_security)

[Investigate](https://developers.cloudflare.com/api/resources/email_security/subresources/investigate)

[Detections](https://developers.cloudflare.com/api/resources/email_security/subresources/investigate/subresources/detections)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get message detection details

GET/accounts/{account\_id}/email-security/investigate/{investigate\_id}/detections

Returns detection details such as threat categories and sender information for non-benign messages.

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

`Cloud Email Security: Write``Cloud Email Security: Read`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20email_security.investigate.detections%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

investigate\_id: string

Unique identifier for a message retrieved from investigation.

[Link to this property](#)%20email_security.investigate.detections%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20investigate_id%20%3E%20(schema)>)

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

[Link to this property](#)%20email_security.investigate.detections%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20email_security.investigate.detections%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {action, attachments, findings, 6 more }

</summary>

action: string

<a href="#">Link to this property</a>

<details>

<summary>

attachments: array of object {size, content\_type, detection, 6 more }

</summary>

size: number

Size of the attachment in bytes.

minimum0

<a href="#">Link to this property</a>

content\_type: optional string

MIME type of the attachment.

<a href="#">Link to this property</a>

<details>

<summary>

detection: optional "MALICIOUS"or "MALICIOUS-BEC"or "SUSPICIOUS"or 7 more

Detection result for this attachment.

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

<a href="#">Link to this property</a>

encrypted: optional boolean

Whether the attachment is encrypted.

<a href="#">Link to this property</a>

filename: optional string

Name of the attached file.

<a href="#">Link to this property</a>

md5: optional string

MD5 hash of the attachment.

<a href="#">Link to this property</a>

name: optional string

Attachment name (alternative to filename).

<a href="#">Link to this property</a>

sha1: optional string

SHA1 hash of the attachment.

<a href="#">Link to this property</a>

sha256: optional string

SHA256 hash of the attachment.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

findings: array of object {attachment, detail, detection, 6 more }

</summary>

attachment: optional string

<a href="#">Link to this property</a>

detail: optional string

<a href="#">Link to this property</a>

<details>

<summary>

detection: optional "MALICIOUS"or "MALICIOUS-BEC"or "SUSPICIOUS"or 7 more

Detection result associated with this finding.

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

<a href="#">Link to this property</a>

field: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

portion: optional string

<a href="#">Link to this property</a>

reason: optional string

<a href="#">Link to this property</a>

score: optional number

formatdouble

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

headers: array of object {name, value }

</summary>

name: string

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

links: array of object {href, text }

</summary>

href: string

<a href="#">Link to this property</a>

text: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

sender\_info: object {as\_name, as\_number, geo, 2 more }

</summary>

as\_name: optional string

The name of the autonomous system.

<a href="#">Link to this property</a>

as\_number: optional number

The number of the autonomous system.

<a href="#">Link to this property</a>

geo: optional string

<a href="#">Link to this property</a>

ip: optional string

<a href="#">Link to this property</a>

pld: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

threat\_categories: array of object {id, description, name }

</summary>

id: optional number

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

validation: object {comment, dkim, dmarc, spf }

</summary>

comment: optional string

<a href="#">Link to this property</a>

<details>

<summary>

dkim: optional "pass"or "neutral"or "fail"or 2 more

</summary>

One of the following:

"pass"

<a href="#">Link to this property</a>

"neutral"

<a href="#">Link to this property</a>

"fail"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

dmarc: optional "pass"or "neutral"or "fail"or 2 more

</summary>

One of the following:

"pass"

<a href="#">Link to this property</a>

"neutral"

<a href="#">Link to this property</a>

"fail"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

spf: optional "pass"or "neutral"or "fail"or 2 more

</summary>

One of the following:

"pass"

<a href="#">Link to this property</a>

"neutral"

<a href="#">Link to this property</a>

"fail"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

final\_disposition: optional "MALICIOUS"or "MALICIOUS-BEC"or "SUSPICIOUS"or 7 more

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

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.investigate.detections%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20email_security.investigate.detections%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get message detection details

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/investigate/$INVESTIGATE_ID/detections \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "result": {
    "action": "action",
    "attachments": [
      {
        "size": 0,
        "content_type": "content_type",
        "detection": "MALICIOUS",
        "encrypted": true,
        "filename": "filename",
        "md5": "md5",
        "name": "name",
        "sha1": "sha1",
        "sha256": "sha256"
      }
    ],
    "findings": [
      {
        "attachment": "attachment",
        "detail": "detail",
        "detection": "MALICIOUS",
        "field": "field",
        "name": "name",
        "portion": "portion",
        "reason": "reason",
        "score": 0,
        "value": "value"
      }
    ],
    "headers": [
      {
        "name": "name",
        "value": "value"
      }
    ],
    "links": [
      {
        "href": "href",
        "text": "text"
      }
    ],
    "sender_info": {
      "as_name": "as_name",
      "as_number": 0,
      "geo": "geo",
      "ip": "ip",
      "pld": "pld"
    },
    "threat_categories": [
      {
        "id": 0,
        "description": "description",
        "name": "name"
      }
    ],
    "validation": {
      "comment": "comment",
      "dkim": "pass",
      "dmarc": "pass",
      "spf": "pass"
    },
    "final_disposition": "MALICIOUS"
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
  "result": {
    "action": "action",
    "attachments": [
      {
        "size": 0,
        "content_type": "content_type",
        "detection": "MALICIOUS",
        "encrypted": true,
        "filename": "filename",
        "md5": "md5",
        "name": "name",
        "sha1": "sha1",
        "sha256": "sha256"
      }
    ],
    "findings": [
      {
        "attachment": "attachment",
        "detail": "detail",
        "detection": "MALICIOUS",
        "field": "field",
        "name": "name",
        "portion": "portion",
        "reason": "reason",
        "score": 0,
        "value": "value"
      }
    ],
    "headers": [
      {
        "name": "name",
        "value": "value"
      }
    ],
    "links": [
      {
        "href": "href",
        "text": "text"
      }
    ],
    "sender_info": {
      "as_name": "as_name",
      "as_number": 0,
      "geo": "geo",
      "ip": "ip",
      "pld": "pld"
    },
    "threat_categories": [
      {
        "id": 0,
        "description": "description",
        "name": "name"
      }
    ],
    "validation": {
      "comment": "comment",
      "dkim": "pass",
      "dmarc": "pass",
      "spf": "pass"
    },
    "final_disposition": "MALICIOUS"
  },
  "success": true
}
```