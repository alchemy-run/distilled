---
title: Reports
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Security](https://developers.cloudflare.com/api/resources/email_security)

[Phishguard](https://developers.cloudflare.com/api/resources/email_security/subresources/phishguard)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Reports

##### [Get PhishGuard reports](https://developers.cloudflare.com/api/resources/email_security/subresources/phishguard/subresources/reports/methods/list)

GET/accounts/{account\_id}/email-security/phishguard/reports

##### ModelsExpand Collapse

<details>

<summary>

ReportListResponse object {id, content, disposition, 7 more }

</summary>

id: number

<a href="#">Link to this property</a>

content: string

<a href="#">Link to this property</a>

<details>

<summary>

disposition: "MALICIOUS"or "MALICIOUS-BEC"or "SUSPICIOUS"or 7 more

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

fields: object {to, from, occurred\_at, 2 more }

</summary>

to: array of string

<a href="#">Link to this property</a>

from: optional string

<a href="#">Link to this property</a>

occurred\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

postfix\_id: optional string

<a href="#">Link to this property</a>

Deprecatedts: optional string

Use <code>occurred_at</code> instead.

Deprecated, use <code>occurred_at</code> instead.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

priority: string

<a href="#">Link to this property</a>

title: string

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

tags: optional array of object {category, value }

</summary>

category: string

<a href="#">Link to this property</a>

value: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

Deprecatedts: optional string

Use <code>created_at</code> instead.

Deprecated, use <code>created_at</code> instead.

formatdate-time

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.phishguard.reports%20%3E%20(model)%20report_list_response%20%3E%20(schema)>)