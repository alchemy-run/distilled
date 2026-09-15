---
title: Bulk
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Security](https://developers.cloudflare.com/api/resources/email_security)

[Investigate](https://developers.cloudflare.com/api/resources/email_security/subresources/investigate)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Bulk

##### [List bulk action jobs](https://developers.cloudflare.com/api/resources/email_security/subresources/investigate/subresources/bulk/methods/list)

GET/accounts/{account\_id}/email-security/investigate/bulk

##### [Create a bulk action job](https://developers.cloudflare.com/api/resources/email_security/subresources/investigate/subresources/bulk/methods/create)

POST/accounts/{account\_id}/email-security/investigate/bulk

##### [Get bulk action job details](https://developers.cloudflare.com/api/resources/email_security/subresources/investigate/subresources/bulk/methods/get)

GET/accounts/{account\_id}/email-security/investigate/bulk/{job\_id}

##### [Delete a bulk action job](https://developers.cloudflare.com/api/resources/email_security/subresources/investigate/subresources/bulk/methods/delete)

DELETE/accounts/{account\_id}/email-security/investigate/bulk/{job\_id}

##### ModelsExpand Collapse

<details>

<summary>

BulkListResponse object {action\_params, action\_type, created\_at, 11 more }

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

[Link to this property](#)%20email_security.investigate.bulk%20%3E%20(model)%20bulk_list_response%20%3E%20(schema)>)

<details>

<summary>

BulkCreateResponse object {action\_params, action\_type, created\_at, 11 more }

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

[Link to this property](#)%20email_security.investigate.bulk%20%3E%20(model)%20bulk_create_response%20%3E%20(schema)>)

<details>

<summary>

BulkGetResponse object {action\_params, action\_type, created\_at, 11 more }

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

[Link to this property](#)%20email_security.investigate.bulk%20%3E%20(model)%20bulk_get_response%20%3E%20(schema)>)

<details>

<summary>

BulkDeleteResponse object {id }

</summary>

id: string

formatuuid

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.investigate.bulk%20%3E%20(model)%20bulk_delete_response%20%3E%20(schema)>)

#### BulkCancel

##### [Cancel a bulk action job](https://developers.cloudflare.com/api/resources/email_security/subresources/investigate/subresources/bulk/subresources/cancel/methods/create)

POST/accounts/{account\_id}/email-security/investigate/bulk/{job\_id}/cancel

##### ModelsExpand Collapse

<details>

<summary>

CancelCreateResponse object {action\_params, action\_type, created\_at, 11 more }

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

[Link to this property](#)%20email_security.investigate.bulk.cancel%20%3E%20(model)%20cancel_create_response%20%3E%20(schema)>)

#### BulkMessages

##### [List messages for a bulk action job](https://developers.cloudflare.com/api/resources/email_security/subresources/investigate/subresources/bulk/subresources/messages/methods/list)

GET/accounts/{account\_id}/email-security/investigate/bulk/{job\_id}/messages

##### ModelsExpand Collapse

<details>

<summary>

MessageListResponse object {action\_params, action\_type, created\_at, 10 more }

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

[Link to this property](#)%20email_security.investigate.bulk.messages%20%3E%20(model)%20message_list_response%20%3E%20(schema)>)