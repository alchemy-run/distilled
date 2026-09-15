---
title: Cancel a bulk action job
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Security](https://developers.cloudflare.com/api/resources/email_security)

[Investigate](https://developers.cloudflare.com/api/resources/email_security/subresources/investigate)

[Bulk](https://developers.cloudflare.com/api/resources/email_security/subresources/investigate/subresources/bulk)

[Cancel](https://developers.cloudflare.com/api/resources/email_security/subresources/investigate/subresources/bulk/subresources/cancel)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Cancel a bulk action job

POST/accounts/{account\_id}/email-security/investigate/bulk/{job\_id}/cancel

Cancels the job, marking it as cancelled and stopping any pending message processing. The job record remains visible in list and detail endpoints.

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

[Link to this property](#)%20email_security.investigate.bulk.cancel%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

job\_id: string

formatuuid

[Link to this property](#)%20email_security.investigate.bulk.cancel%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20job_id%20%3E%20(schema)>)

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

[Link to this property](#)%20email_security.investigate.bulk.cancel%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20email_security.investigate.bulk.cancel%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {action\_params, action\_type, created\_at, 11 more }

</summary>

<details>

<summary>

action\_params: object {destination, type, expected\_disposition } or object {type }

</summary>

One of the following:

<details>

<summary>

Move object {destination, type, expected\_disposition }

</summary>

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

Release object {type }

</summary>

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

job\_id: string

formatuuid

<a href="#">Link to this property</a>

messages\_failed: number

<a href="#">Link to this property</a>

messages\_pending: number

<a href="#">Link to this property</a>

messages\_successful: number

<a href="#">Link to this property</a>

<details>

<summary>

search\_params: object {action\_log, alert\_id, delivery\_status, 15 more }

</summary>

Deprecatedaction\_log: optional boolean

Use GET /investigate/{investigate\_id}/action\_log instead.

Deprecated, use <code>GET /investigate/{investigate_id}/action_log</code> instead. End of life: November 1, 2026.

<a href="#">Link to this property</a>

alert\_id: optional string

<a href="#">Link to this property</a>

<details>

<summary>

delivery\_status: optional "delivered"or "moved"or "quarantined"or 5 more

Delivery status of the message.

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

detections\_only: optional boolean

<a href="#">Link to this property</a>

domain: optional string

<a href="#">Link to this property</a>

end: optional string

End of search date range.

formatdate-time

<a href="#">Link to this property</a>

exact\_subject: optional string

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

message\_action: optional "PREVIEW"or "QUARANTINE\_RELEASED"or "MOVED"

</summary>

One of the following:

"PREVIEW"

<a href="#">Link to this property</a>

"QUARANTINE\_RELEASED"

<a href="#">Link to this property</a>

"MOVED"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

message\_id: optional string

<a href="#">Link to this property</a>

metric: optional string

<a href="#">Link to this property</a>

query: optional string

<a href="#">Link to this property</a>

recipient: optional string

<a href="#">Link to this property</a>

sender: optional string

<a href="#">Link to this property</a>

smtp\_helo\_ip: optional string

Matches messages whose SMTP HELO server IP address equals this value.

<a href="#">Link to this property</a>

start: optional string

Beginning of search date range.

formatdate-time

<a href="#">Link to this property</a>

subject: optional string

<a href="#">Link to this property</a>

submissions: optional boolean

<a href="#">Link to this property</a>

</details>

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

total\_messages\_discovered: number

<a href="#">Link to this property</a>

comment: optional string

<a href="#">Link to this property</a>

completed\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

started\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

status\_message: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.investigate.bulk.cancel%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful.

[Link to this property](#)%20email_security.investigate.bulk.cancel%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Cancel a bulk action job

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/investigate/bulk/$JOB_ID/cancel \
    -X POST \
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
    "action_params": {
      "destination": "Inbox",
      "type": "MOVE",
      "expected_disposition": "MALICIOUS"
    },
    "action_type": "MOVE",
    "created_at": "2019-12-27T18:11:19.117Z",
    "job_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "messages_failed": 0,
    "messages_pending": 0,
    "messages_successful": 0,
    "search_params": {
      "action_log": true,
      "alert_id": "alert_id",
      "delivery_status": "delivered",
      "detections_only": true,
      "domain": "domain",
      "end": "2022-07-25T14:30:00Z",
      "exact_subject": "exact_subject",
      "final_disposition": "MALICIOUS",
      "message_action": "PREVIEW",
      "message_id": "message_id",
      "metric": "metric",
      "query": "query",
      "recipient": "recipient",
      "sender": "sender",
      "smtp_helo_ip": "smtp_helo_ip",
      "start": "2022-06-25T14:30:00Z",
      "subject": "subject",
      "submissions": true
    },
    "status": "PENDING",
    "total_messages_discovered": 0,
    "comment": "comment",
    "completed_at": "2019-12-27T18:11:19.117Z",
    "started_at": "2019-12-27T18:11:19.117Z",
    "status_message": "status_message"
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
    "action_params": {
      "destination": "Inbox",
      "type": "MOVE",
      "expected_disposition": "MALICIOUS"
    },
    "action_type": "MOVE",
    "created_at": "2019-12-27T18:11:19.117Z",
    "job_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "messages_failed": 0,
    "messages_pending": 0,
    "messages_successful": 0,
    "search_params": {
      "action_log": true,
      "alert_id": "alert_id",
      "delivery_status": "delivered",
      "detections_only": true,
      "domain": "domain",
      "end": "2022-07-25T14:30:00Z",
      "exact_subject": "exact_subject",
      "final_disposition": "MALICIOUS",
      "message_action": "PREVIEW",
      "message_id": "message_id",
      "metric": "metric",
      "query": "query",
      "recipient": "recipient",
      "sender": "sender",
      "smtp_helo_ip": "smtp_helo_ip",
      "start": "2022-06-25T14:30:00Z",
      "subject": "subject",
      "submissions": true
    },
    "status": "PENDING",
    "total_messages_discovered": 0,
    "comment": "comment",
    "completed_at": "2019-12-27T18:11:19.117Z",
    "started_at": "2019-12-27T18:11:19.117Z",
    "status_message": "status_message"
  },
  "success": true
}
```