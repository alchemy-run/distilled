---
title: Audit Logs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Security Center](https://developers.cloudflare.com/api/resources/security_center)

[Insights](https://developers.cloudflare.com/api/resources/security_center/subresources/insights)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Audit Logs

##### [Retrieves account or zone Audit Log](https://developers.cloudflare.com/api/resources/security_center/subresources/insights/subresources/audit_logs/methods/list)

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/security-center/insights/audit-log

##### [Retrieves Issue Audit Log](https://developers.cloudflare.com/api/resources/security_center/subresources/insights/subresources/audit_logs/methods/list_by_insight)

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/security-center/insights/{issue\_id}/audit-log

##### ModelsExpand Collapse

<details>

<summary>

AuditLogListResponse object {id, changed\_at, changed\_by, 6 more }

</summary>

id: optional string

UUIDv7 identifier for the audit log entry, time-ordered.

formatuuid

<a href="#">Link to this property</a>

changed\_at: optional string

The timestamp when the change occurred.

formatdate-time

<a href="#">Link to this property</a>

changed\_by: optional string

The actor that made the change. ‘system’ for automated changes, or a user identifier.

<a href="#">Link to this property</a>

current\_value: optional string

The value of the field after the change. Null if the field was cleared.

<a href="#">Link to this property</a>

<details>

<summary>

field\_changed: optional "status"or "user\_classification"

The field that was changed.

</summary>

One of the following:

"status"

<a href="#">Link to this property</a>

"user\_classification"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

issue\_id: optional string

The ID of the insight this audit log entry relates to.

<a href="#">Link to this property</a>

previous\_value: optional string

The value of the field before the change. Null if the field was not previously set.

<a href="#">Link to this property</a>

rationale: optional string

Optional rationale provided for the change.

<a href="#">Link to this property</a>

zone\_id: optional number

The zone ID associated with the insight. Only present for zone-level insights.

formatint64

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20security_center.insights.audit_logs%20%3E%20(model)%20audit_log_list_response%20%3E%20(schema)>)

<details>

<summary>

AuditLogListByInsightResponse object {id, changed\_at, changed\_by, 6 more }

</summary>

id: optional string

UUIDv7 identifier for the audit log entry, time-ordered.

formatuuid

<a href="#">Link to this property</a>

changed\_at: optional string

The timestamp when the change occurred.

formatdate-time

<a href="#">Link to this property</a>

changed\_by: optional string

The actor that made the change. ‘system’ for automated changes, or a user identifier.

<a href="#">Link to this property</a>

current\_value: optional string

The value of the field after the change. Null if the field was cleared.

<a href="#">Link to this property</a>

<details>

<summary>

field\_changed: optional "status"or "user\_classification"

The field that was changed.

</summary>

One of the following:

"status"

<a href="#">Link to this property</a>

"user\_classification"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

issue\_id: optional string

The ID of the insight this audit log entry relates to.

<a href="#">Link to this property</a>

previous\_value: optional string

The value of the field before the change. Null if the field was not previously set.

<a href="#">Link to this property</a>

rationale: optional string

Optional rationale provided for the change.

<a href="#">Link to this property</a>

zone\_id: optional number

The zone ID associated with the insight. Only present for zone-level insights.

formatint64

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20security_center.insights.audit_logs%20%3E%20(model)%20audit_log_list_by_insight_response%20%3E%20(schema)>)