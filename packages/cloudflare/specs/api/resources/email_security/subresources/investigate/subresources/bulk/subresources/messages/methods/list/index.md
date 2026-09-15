---
title: List messages for a bulk action job
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Security](https://developers.cloudflare.com/api/resources/email_security)

[Investigate](https://developers.cloudflare.com/api/resources/email_security/subresources/investigate)

[Bulk](https://developers.cloudflare.com/api/resources/email_security/subresources/investigate/subresources/bulk)

[Messages](https://developers.cloudflare.com/api/resources/email_security/subresources/investigate/subresources/bulk/subresources/messages)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List messages for a bulk action job

GET/accounts/{account\_id}/email-security/investigate/bulk/{job\_id}/messages

Returns the individual messages associated with a bulk action job, including their processing status.

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

[Link to this property](#)%20email_security.investigate.bulk.messages%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

job\_id: string

formatuuid

[Link to this property](#)%20email_security.investigate.bulk.messages%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20job_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

page: optional number

Current page within paginated list of results.

minimum1

[Link to this property](#)%20email_security.investigate.bulk.messages%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

The number of results per page. Maximum value is 1000.

maximum1000

minimum1

[Link to this property](#)%20email_security.investigate.bulk.messages%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

<details>

<summary>

status: optional "PENDING"or "DISCOVERING"or "PROCESSING"or 4 more

</summary>

One of the following:

"PENDING"

<a href="#">Link to this property</a>

"DISCOVERING"

<a href="#">Link to this property</a>

"PROCESSING"

<a href="#">Link to this property</a>

"COMPLETED"

<a href="#">Link to this property</a>

"FAILED"

<a href="#">Link to this property</a>

"CANCELLED"

<a href="#">Link to this property</a>

"SKIPPED"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.investigate.bulk.messages%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20status%20%3E%20(schema)>)

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

[Link to this property](#)%20email_security.investigate.bulk.messages%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20email_security.investigate.bulk.messages%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {action\_params, action\_type, created\_at, 10 more }

</summary>

<details>

<summary>

action\_params: object {client\_recipient, destination, type, expected\_disposition } or object {client\_recipient, type }

</summary>

One of the following:

<details>

<summary>

Move object {client\_recipient, destination, type, expected\_disposition }

</summary>

client\_recipient: string

<a href="#">Link to this property</a>

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

<a href="#">Link to this property</a>

type: "MOVE"

<a href="#">Link to this property</a>

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

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Release object {client\_recipient, type }

</summary>

client\_recipient: string

<a href="#">Link to this property</a>

type: "RELEASE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

action\_type: "MOVE"or "RELEASE"

</summary>

One of the following:

"MOVE"

<a href="#">Link to this property</a>

"RELEASE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

message\_id: string

formatuuid

<a href="#">Link to this property</a>

postfix\_id: string

<a href="#">Link to this property</a>

retry\_count: number

<a href="#">Link to this property</a>

<details>

<summary>

status: "PENDING"or "DISCOVERING"or "PROCESSING"or 4 more

</summary>

One of the following:

"PENDING"

<a href="#">Link to this property</a>

"DISCOVERING"

<a href="#">Link to this property</a>

"PROCESSING"

<a href="#">Link to this property</a>

"COMPLETED"

<a href="#">Link to this property</a>

"FAILED"

<a href="#">Link to this property</a>

"CANCELLED"

<a href="#">Link to this property</a>

"SKIPPED"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

alert\_id: optional string

<a href="#">Link to this property</a>

email\_message\_id: optional string

<a href="#">Link to this property</a>

<details>

<summary>

message: optional object {id, action\_log, client\_recipients, 32 more }

</summary>

id: string

Unique identifier for a message retrieved from investigation.

<a href="#">Link to this property</a>

<details>

<summary>

Deprecatedaction\_log: array of object {completed\_at, operation, completed\_timestamp, 2 more }

Use GET /investigate/{investigate\_id}/action\_log instead.

Deprecated, use <code>GET /investigate/{investigate_id}/action_log</code> instead. End of life: November 1, 2026.

</summary>

completed\_at: string

Timestamp when action completed.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

operation: "MOVE"or "RELEASE"or "RECLASSIFY"or 3 more

Type of action performed.

</summary>

One of the following:

"MOVE"

<a href="#">Link to this property</a>

"RELEASE"

<a href="#">Link to this property</a>

"RECLASSIFY"

<a href="#">Link to this property</a>

"SUBMISSION"

<a href="#">Link to this property</a>

"QUARANTINE\_RELEASE"

<a href="#">Link to this property</a>

"PREVIEW"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

Deprecatedcompleted\_timestamp: optional string

Use <code>completed_at</code> instead.

Deprecated, use <code>completed_at</code> instead. End of life: November 1, 2026.

<a href="#">Link to this property</a>

<details>

<summary>

properties: optional object {folder, requested\_by }

Additional properties for the action.

</summary>

folder: optional string

Target folder for move operations.

<a href="#">Link to this property</a>

requested\_by: optional string

User who requested the action.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

status: optional string

Status of the action.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

client\_recipients: array of string

<a href="#">Link to this property</a>

detection\_reasons: array of string

<a href="#">Link to this property</a>

is\_phish\_submission: boolean

<a href="#">Link to this property</a>

is\_quarantined: boolean

<a href="#">Link to this property</a>

postfix\_id: string

The identifier of the message.

<a href="#">Link to this property</a>

<details>

<summary>

properties: object {allowlisted\_pattern, allowlisted\_pattern\_type, blocklisted\_message, 2 more }

Message processing properties.

</summary>

allowlisted\_pattern: optional string

Pattern that allowlisted this message.

<a href="#">Link to this property</a>

<details>

<summary>

allowlisted\_pattern\_type: optional "quarantine\_release"or "acceptable\_sender"or "allowed\_sender"or 5 more

Type of allowlist pattern.

</summary>

One of the following:

"quarantine\_release"

<a href="#">Link to this property</a>

"acceptable\_sender"

<a href="#">Link to this property</a>

"allowed\_sender"

<a href="#">Link to this property</a>

"allowed\_recipient"

<a href="#">Link to this property</a>

"domain\_similarity"

<a href="#">Link to this property</a>

"domain\_recency"

<a href="#">Link to this property</a>

"managed\_acceptable\_sender"

<a href="#">Link to this property</a>

"outbound\_ndr"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

blocklisted\_message: optional boolean

Whether message was blocklisted.

<a href="#">Link to this property</a>

blocklisted\_pattern: optional string

Pattern that blocklisted this message.

<a href="#">Link to this property</a>

<details>

<summary>

whitelisted\_pattern\_type: optional "quarantine\_release"or "acceptable\_sender"or "allowed\_sender"or 5 more

Legacy field for allowlist pattern type.

</summary>

One of the following:

"quarantine\_release"

<a href="#">Link to this property</a>

"acceptable\_sender"

<a href="#">Link to this property</a>

"allowed\_sender"

<a href="#">Link to this property</a>

"allowed\_recipient"

<a href="#">Link to this property</a>

"domain\_similarity"

<a href="#">Link to this property</a>

"domain\_recency"

<a href="#">Link to this property</a>

"managed\_acceptable\_sender"

<a href="#">Link to this property</a>

"outbound\_ndr"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

Deprecatedts: string

Use <code>scanned_at</code> instead.

Deprecated, use <code>scanned_at</code> instead. End of life: November 1, 2026.

<a href="#">Link to this property</a>

alert\_id: optional string

<a href="#">Link to this property</a>

<details>

<summary>

delivery\_mode: optional "DIRECT"or "BCC"or "JOURNAL"or 8 more

</summary>

One of the following:

"DIRECT"

<a href="#">Link to this property</a>

"BCC"

<a href="#">Link to this property</a>

"JOURNAL"

<a href="#">Link to this property</a>

"REVIEW\_SUBMISSION"

<a href="#">Link to this property</a>

"DMARC\_UNVERIFIED"

<a href="#">Link to this property</a>

"DMARC\_FAILURE\_REPORT"

<a href="#">Link to this property</a>

"DMARC\_AGGREGATE\_REPORT"

<a href="#">Link to this property</a>

"THREAT\_INTEL\_SUBMISSION"

<a href="#">Link to this property</a>

"SIMULATION\_SUBMISSION"

<a href="#">Link to this property</a>

"API"

<a href="#">Link to this property</a>

"RETRO\_SCAN"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

delivery\_status: optional array of "delivered"or "moved"or "quarantined"or 5 more

</summary>

One of the following:

"delivered"

<a href="#">Link to this property</a>

"moved"

<a href="#">Link to this property</a>

"quarantined"

<a href="#">Link to this property</a>

"rejected"

<a href="#">Link to this property</a>

"deferred"

<a href="#">Link to this property</a>

"bounced"

<a href="#">Link to this property</a>

"queued"

<a href="#">Link to this property</a>

"move\_failed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

edf\_hash: optional string

<a href="#">Link to this property</a>

envelope\_from: optional string

<a href="#">Link to this property</a>

envelope\_to: optional array of string

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

<details>

<summary>

Deprecatedfindings: optional array of object {attachment, detail, detection, 6 more }

Use the <code>findings</code> field from GET /investigate/{investigate\_id}/detections instead.

Deprecated, use the <code>findings</code> field from <code>GET /investigate/{investigate_id}/detections</code> instead. End of life: November 1, 2026. Detection findings for this message.

</summary>

attachment: optional string

<a href="#">Link to this property</a>

detail: optional string

<a href="#">Link to this property</a>

<details>

<summary>

detection: optional "MALICIOUS"or "MALICIOUS-BEC"or "SUSPICIOUS"or 7 more

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

from: optional string

<a href="#">Link to this property</a>

from\_name: optional string

<a href="#">Link to this property</a>

htmltext\_structure\_hash: optional string

<a href="#">Link to this property</a>

message\_id: optional string

<a href="#">Link to this property</a>

<details>

<summary>

post\_delivery\_operations: optional array of "PREVIEW"or "QUARANTINE\_RELEASE"or "SUBMISSION"or "MOVE"

Post-delivery operations performed on this message.

</summary>

One of the following:

"PREVIEW"

<a href="#">Link to this property</a>

"QUARANTINE\_RELEASE"

<a href="#">Link to this property</a>

"SUBMISSION"

<a href="#">Link to this property</a>

"MOVE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

postfix\_id\_outbound: optional string

<a href="#">Link to this property</a>

replyto: optional string

<a href="#">Link to this property</a>

scanned\_at: optional string

When the message was scanned (UTC).

formatdate-time

<a href="#">Link to this property</a>

sent\_at: optional string

When the message was sent (UTC).

formatdate-time

<a href="#">Link to this property</a>

sent\_date: optional string

<a href="#">Link to this property</a>

smtp\_helo\_server\_ip: optional string

<a href="#">Link to this property</a>

smtp\_previous\_hop\_ip: optional string

<a href="#">Link to this property</a>

subject: optional string

<a href="#">Link to this property</a>

threat\_categories: optional array of string

<a href="#">Link to this property</a>

to: optional array of string

<a href="#">Link to this property</a>

to\_name: optional array of string

<a href="#">Link to this property</a>

<details>

<summary>

validation: optional object {comment, dkim, dmarc, spf }

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

x\_originating\_ip: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

processed\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

retry\_after: optional string

When to retry the action if it failed.

formatdate-time

<a href="#">Link to this property</a>

status\_message: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.investigate.bulk.messages%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: object {count, per\_page, total\_count, 3 more }

</summary>

count: number

Number of items in current page.

minimum0

<a href="#">Link to this property</a>

per\_page: number

Number of items per page.

minimum0

<a href="#">Link to this property</a>

Deprecatedtotal\_count: number

This field always returns 0 and is deprecated.

Deprecated: Always returns 0. End of life: November 1, 2026.

minimum0

<a href="#">Link to this property</a>

next: optional string

Cursor for next page.

<a href="#">Link to this property</a>

Deprecatedpage: optional number

This field always returns 0 and is deprecated.

Deprecated: Always returns 0. End of life: November 1, 2026.

minimum0

<a href="#">Link to this property</a>

previous: optional string

Cursor for previous page.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.investigate.bulk.messages%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

success: true

Whether the API call was successful.

[Link to this property](#)%20email_security.investigate.bulk.messages%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List messages for a bulk action job

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/investigate/bulk/$JOB_ID/messages \
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
  "result": [
    {
      "action_params": {
        "client_recipient": "client_recipient",
        "destination": "Inbox",
        "type": "MOVE",
        "expected_disposition": "MALICIOUS"
      },
      "action_type": "MOVE",
      "created_at": "2019-12-27T18:11:19.117Z",
      "message_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "postfix_id": "postfix_id",
      "retry_count": 0,
      "status": "PENDING",
      "alert_id": "alert_id",
      "email_message_id": "email_message_id",
      "message": {
        "id": "4Njp3P0STMz2c02Q-2024-01-05T10:00:00-12345678",
        "action_log": [
          {
            "completed_at": "2019-12-27T18:11:19.117Z",
            "operation": "MOVE",
            "completed_timestamp": "completed_timestamp",
            "properties": {
              "folder": "folder",
              "requested_by": "requested_by"
            },
            "status": "status"
          }
        ],
        "client_recipients": [
          "string"
        ],
        "detection_reasons": [
          "string"
        ],
        "is_phish_submission": true,
        "is_quarantined": true,
        "postfix_id": "4Njp3P0STMz2c02Q",
        "properties": {
          "allowlisted_pattern": "allowlisted_pattern",
          "allowlisted_pattern_type": "quarantine_release",
          "blocklisted_message": true,
          "blocklisted_pattern": "blocklisted_pattern",
          "whitelisted_pattern_type": "quarantine_release"
        },
        "ts": "ts",
        "alert_id": "alert_id",
        "delivery_mode": "DIRECT",
        "delivery_status": [
          "delivered"
        ],
        "edf_hash": "edf_hash",
        "envelope_from": "envelope_from",
        "envelope_to": [
          "string"
        ],
        "final_disposition": "MALICIOUS",
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
        "from": "from",
        "from_name": "from_name",
        "htmltext_structure_hash": "htmltext_structure_hash",
        "message_id": "message_id",
        "post_delivery_operations": [
          "PREVIEW"
        ],
        "postfix_id_outbound": "postfix_id_outbound",
        "replyto": "replyto",
        "scanned_at": "2019-12-27T18:11:19.117Z",
        "sent_at": "2019-12-27T18:11:19.117Z",
        "sent_date": "sent_date",
        "smtp_helo_server_ip": "smtp_helo_server_ip",
        "smtp_previous_hop_ip": "smtp_previous_hop_ip",
        "subject": "subject",
        "threat_categories": [
          "string"
        ],
        "to": [
          "string"
        ],
        "to_name": [
          "string"
        ],
        "validation": {
          "comment": "comment",
          "dkim": "pass",
          "dmarc": "pass",
          "spf": "pass"
        },
        "x_originating_ip": "x_originating_ip"
      },
      "processed_at": "2019-12-27T18:11:19.117Z",
      "retry_after": "2019-12-27T18:11:19.117Z",
      "status_message": "status_message"
    }
  ],
  "result_info": {
    "count": 0,
    "per_page": 0,
    "total_count": 0,
    "next": "next",
    "page": 0,
    "previous": "previous"
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
  "result": [
    {
      "action_params": {
        "client_recipient": "client_recipient",
        "destination": "Inbox",
        "type": "MOVE",
        "expected_disposition": "MALICIOUS"
      },
      "action_type": "MOVE",
      "created_at": "2019-12-27T18:11:19.117Z",
      "message_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "postfix_id": "postfix_id",
      "retry_count": 0,
      "status": "PENDING",
      "alert_id": "alert_id",
      "email_message_id": "email_message_id",
      "message": {
        "id": "4Njp3P0STMz2c02Q-2024-01-05T10:00:00-12345678",
        "action_log": [
          {
            "completed_at": "2019-12-27T18:11:19.117Z",
            "operation": "MOVE",
            "completed_timestamp": "completed_timestamp",
            "properties": {
              "folder": "folder",
              "requested_by": "requested_by"
            },
            "status": "status"
          }
        ],
        "client_recipients": [
          "string"
        ],
        "detection_reasons": [
          "string"
        ],
        "is_phish_submission": true,
        "is_quarantined": true,
        "postfix_id": "4Njp3P0STMz2c02Q",
        "properties": {
          "allowlisted_pattern": "allowlisted_pattern",
          "allowlisted_pattern_type": "quarantine_release",
          "blocklisted_message": true,
          "blocklisted_pattern": "blocklisted_pattern",
          "whitelisted_pattern_type": "quarantine_release"
        },
        "ts": "ts",
        "alert_id": "alert_id",
        "delivery_mode": "DIRECT",
        "delivery_status": [
          "delivered"
        ],
        "edf_hash": "edf_hash",
        "envelope_from": "envelope_from",
        "envelope_to": [
          "string"
        ],
        "final_disposition": "MALICIOUS",
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
        "from": "from",
        "from_name": "from_name",
        "htmltext_structure_hash": "htmltext_structure_hash",
        "message_id": "message_id",
        "post_delivery_operations": [
          "PREVIEW"
        ],
        "postfix_id_outbound": "postfix_id_outbound",
        "replyto": "replyto",
        "scanned_at": "2019-12-27T18:11:19.117Z",
        "sent_at": "2019-12-27T18:11:19.117Z",
        "sent_date": "sent_date",
        "smtp_helo_server_ip": "smtp_helo_server_ip",
        "smtp_previous_hop_ip": "smtp_previous_hop_ip",
        "subject": "subject",
        "threat_categories": [
          "string"
        ],
        "to": [
          "string"
        ],
        "to_name": [
          "string"
        ],
        "validation": {
          "comment": "comment",
          "dkim": "pass",
          "dmarc": "pass",
          "spf": "pass"
        },
        "x_originating_ip": "x_originating_ip"
      },
      "processed_at": "2019-12-27T18:11:19.117Z",
      "retry_after": "2019-12-27T18:11:19.117Z",
      "status_message": "status_message"
    }
  ],
  "result_info": {
    "count": 0,
    "per_page": 0,
    "total_count": 0,
    "next": "next",
    "page": 0,
    "previous": "previous"
  },
  "success": true
}
```