---
title: Insights
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Security Center](https://developers.cloudflare.com/api/resources/security_center)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Insights

##### [Retrieves Security Center Insights](https://developers.cloudflare.com/api/resources/security_center/subresources/insights/methods/list)

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/security-center/insights

##### [Archives Security Center Insight](https://developers.cloudflare.com/api/resources/security_center/subresources/insights/methods/dismiss)

PUT/{accounts\_or\_zones}/{account\_or\_zone\_id}/security-center/insights/{issue\_id}/dismiss

##### ModelsExpand Collapse

<details>

<summary>

InsightListResponse object {count, issues, page, per\_page }

</summary>

count: optional number

Indicates the total number of results.

<a href="#">Link to this property</a>

<details>

<summary>

issues: optional array of object {id, dismissed, has\_extended\_context, 11 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

dismissed: optional boolean

<a href="#">Link to this property</a>

has\_extended\_context: optional boolean

Indicates whether the insight has a large payload that requires fetching via the context endpoint.

<a href="#">Link to this property</a>

issue\_class: optional string

<a href="#">Link to this property</a>

issue\_type: optional <a href="https://developers.cloudflare.com/api/resources/intel#(resource)%20intel.attack_surface_report.issues%20%3E%20(model)%20issue_type%20%3E%20(schema)">IssueType</a>

<a href="#">Link to this property</a>

<details>

<summary>

payload: optional object {detection\_method, zone\_tag }

</summary>

detection\_method: optional string

Describes the method used to detect insight.

<a href="#">Link to this property</a>

zone\_tag: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

resolve\_link: optional string

<a href="#">Link to this property</a>

resolve\_text: optional string

<a href="#">Link to this property</a>

<details>

<summary>

severity: optional "Low"or "Moderate"or "Critical"

</summary>

One of the following:

"Low"

<a href="#">Link to this property</a>

"Moderate"

<a href="#">Link to this property</a>

"Critical"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

since: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "active"or "resolved"

The current status of the insight.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"resolved"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

subject: optional string

<a href="#">Link to this property</a>

timestamp: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

user\_classification: optional "false\_positive"or "accept\_risk"or "other"

User-defined classification for the insight. Can be ‘false\_positive’, ‘accept\_risk’, ‘other’, or null.

</summary>

One of the following:

"false\_positive"

<a href="#">Link to this property</a>

"accept\_risk"

<a href="#">Link to this property</a>

"other"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

page: optional number

Specifies the current page within paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Sets the number of results per page of results.

maximum1000

minimum1

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20security_center.insights%20%3E%20(model)%20insight_list_response%20%3E%20(schema)>)

<details>

<summary>

InsightDismissResponse object {errors, messages, success }

</summary>

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

<a href="#">Link to this property</a>

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

<a href="#">Link to this property</a>

success: true

Whether the API call was successful.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20security_center.insights%20%3E%20(model)%20insight_dismiss_response%20%3E%20(schema)>)

#### InsightsClass

##### [Retrieves Security Center Insight Counts by Class](https://developers.cloudflare.com/api/resources/security_center/subresources/insights/subresources/class/methods/get)

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/security-center/insights/class

##### ModelsExpand Collapse

<details>

<summary>

ClassGetResponse = array of object {count, value }

</summary>

count: optional number

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20security_center.insights.class%20%3E%20(model)%20class_get_response%20%3E%20(schema)>)

#### InsightsSeverity

##### [Retrieves Security Center Insight Counts by Severity](https://developers.cloudflare.com/api/resources/security_center/subresources/insights/subresources/severity/methods/get)

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/security-center/insights/severity

##### ModelsExpand Collapse

<details>

<summary>

SeverityGetResponse = array of object {count, value }

</summary>

count: optional number

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20security_center.insights.severity%20%3E%20(model)%20severity_get_response%20%3E%20(schema)>)

#### InsightsType

##### [Retrieves Security Center Insight Counts by Type](https://developers.cloudflare.com/api/resources/security_center/subresources/insights/subresources/type/methods/get)

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/security-center/insights/type

##### ModelsExpand Collapse

<details>

<summary>

TypeGetResponse = array of object {count, value }

</summary>

count: optional number

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20security_center.insights.type%20%3E%20(model)%20type_get_response%20%3E%20(schema)>)

#### InsightsAudit Logs

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

#### InsightsClassification

##### [Updates Security Center Insight Classification](https://developers.cloudflare.com/api/resources/security_center/subresources/insights/subresources/classification/methods/update)

PATCH/{accounts\_or\_zones}/{account\_or\_zone\_id}/security-center/insights/{issue\_id}/classification

##### ModelsExpand Collapse

<details>

<summary>

ClassificationUpdateResponse object {errors, messages, success }

</summary>

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

<a href="#">Link to this property</a>

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

<a href="#">Link to this property</a>

success: true

Whether the API call was successful.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20security_center.insights.classification%20%3E%20(model)%20classification_update_response%20%3E%20(schema)>)

#### InsightsContext

##### [Retrieves Security Center Insight Context](https://developers.cloudflare.com/api/resources/security_center/subresources/insights/subresources/context/methods/get)

GET/accounts/{account\_id}/security-center/insights/{issue\_id}/context

##### ModelsExpand Collapse

ContextGetResponse = map\[unknown]

[Link to this property](#)%20security_center.insights.context%20%3E%20(model)%20context_get_response%20%3E%20(schema)>)