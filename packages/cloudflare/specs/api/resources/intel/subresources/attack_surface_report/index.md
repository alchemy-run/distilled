---
title: Attack Surface Report
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Intel](https://developers.cloudflare.com/api/resources/intel)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Attack Surface Report

#### Attack Surface ReportIssue Types

##### [Retrieves Security Center Issues Types](https://developers.cloudflare.com/api/resources/intel/subresources/attack_surface_report/subresources/issue_types/methods/get)

GET/accounts/{account\_id}/intel/attack-surface-report/issue-types

##### ModelsExpand Collapse

IssueTypeGetResponse = string

[Link to this property](#)%20intel.attack_surface_report.issue_types%20%3E%20(model)%20issue_type_get_response%20%3E%20(schema)>)

#### Attack Surface ReportIssues

##### [Retrieves Security Center Issues](https://developers.cloudflare.com/api/resources/intel/subresources/attack_surface_report/subresources/issues/methods/list)

Deprecated

GET/accounts/{account\_id}/intel/attack-surface-report/issues

##### [Retrieves Security Center Issue Counts by Class](https://developers.cloudflare.com/api/resources/intel/subresources/attack_surface_report/subresources/issues/methods/class)

Deprecated

GET/accounts/{account\_id}/intel/attack-surface-report/issues/class

##### [Retrieves Security Center Issue Counts by Severity](https://developers.cloudflare.com/api/resources/intel/subresources/attack_surface_report/subresources/issues/methods/severity)

Deprecated

GET/accounts/{account\_id}/intel/attack-surface-report/issues/severity

##### [Retrieves Security Center Issue Counts by Type](https://developers.cloudflare.com/api/resources/intel/subresources/attack_surface_report/subresources/issues/methods/type)

Deprecated

GET/accounts/{account\_id}/intel/attack-surface-report/issues/type

##### ModelsExpand Collapse

<details>

<summary>

IssueType = "compliance\_violation"or "email\_security"or "exposed\_infrastructure"or 3 more

</summary>

One of the following:

"compliance\_violation"

<a href="#">Link to this property</a>

"email\_security"

<a href="#">Link to this property</a>

"exposed\_infrastructure"

<a href="#">Link to this property</a>

"insecure\_configuration"

<a href="#">Link to this property</a>

"weak\_authentication"

<a href="#">Link to this property</a>

"configuration\_suggestion"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(model)%20issue_type%20%3E%20(schema)>)

<details>

<summary>

SeverityQueryParam = "low"or "moderate"or "critical"

</summary>

One of the following:

"low"

<a href="#">Link to this property</a>

"moderate"

<a href="#">Link to this property</a>

"critical"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(model)%20severity_query_param%20%3E%20(schema)>)

<details>

<summary>

IssueListResponse object {count, issues, page, per\_page }

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

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(model)%20issue_list_response%20%3E%20(schema)>)

<details>

<summary>

IssueClassResponse = array of object {count, value }

</summary>

count: optional number

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(model)%20issue_class_response%20%3E%20(schema)>)

<details>

<summary>

IssueSeverityResponse = array of object {count, value }

</summary>

count: optional number

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(model)%20issue_severity_response%20%3E%20(schema)>)

<details>

<summary>

IssueTypeResponse = array of object {count, value }

</summary>

count: optional number

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.attack_surface_report.issues%20%3E%20(model)%20issue_type_response%20%3E%20(schema)>)