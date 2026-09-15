---
title: Submissions
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Security](https://developers.cloudflare.com/api/resources/email_security)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Submissions

##### [Get reclassify submissions](https://developers.cloudflare.com/api/resources/email_security/subresources/submissions/methods/list)

GET/accounts/{account\_id}/email-security/submissions

##### ModelsExpand Collapse

<details>

<summary>

SubmissionListResponse object {requested\_at, submission\_id, customer\_status, 15 more }

</summary>

requested\_at: string

When the submission was requested (UTC).

formatdate-time

<a href="#">Link to this property</a>

submission\_id: string

<a href="#">Link to this property</a>

<details>

<summary>

customer\_status: optional "escalated"or "reviewed"or "unreviewed"

</summary>

One of the following:

"escalated"

<a href="#">Link to this property</a>

"reviewed"

<a href="#">Link to this property</a>

"unreviewed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

escalated\_as: optional "MALICIOUS"or "SUSPICIOUS"or "SPOOF"or 3 more

</summary>

One of the following:

"MALICIOUS"

<a href="#">Link to this property</a>

"SUSPICIOUS"

<a href="#">Link to this property</a>

"SPOOF"

<a href="#">Link to this property</a>

"SPAM"

<a href="#">Link to this property</a>

"BULK"

<a href="#">Link to this property</a>

"NONE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

escalated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

escalated\_by: optional string

<a href="#">Link to this property</a>

escalated\_submission\_id: optional string

<a href="#">Link to this property</a>

<details>

<summary>

original\_disposition: optional "MALICIOUS"or "SUSPICIOUS"or "SPOOF"or 3 more

</summary>

One of the following:

"MALICIOUS"

<a href="#">Link to this property</a>

"SUSPICIOUS"

<a href="#">Link to this property</a>

"SPOOF"

<a href="#">Link to this property</a>

"SPAM"

<a href="#">Link to this property</a>

"BULK"

<a href="#">Link to this property</a>

"NONE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

original\_edf\_hash: optional string

<a href="#">Link to this property</a>

original\_postfix\_id: optional string

The postfix ID of the original message that was submitted.

<a href="#">Link to this property</a>

outcome: optional string

<a href="#">Link to this property</a>

<details>

<summary>

outcome\_disposition: optional "MALICIOUS"or "SUSPICIOUS"or "SPOOF"or 3 more

</summary>

One of the following:

"MALICIOUS"

<a href="#">Link to this property</a>

"SUSPICIOUS"

<a href="#">Link to this property</a>

"SPOOF"

<a href="#">Link to this property</a>

"SPAM"

<a href="#">Link to this property</a>

"BULK"

<a href="#">Link to this property</a>

"NONE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

requested\_by: optional string

<a href="#">Link to this property</a>

<details>

<summary>

requested\_disposition: optional "MALICIOUS"or "SUSPICIOUS"or "SPOOF"or 3 more

</summary>

One of the following:

"MALICIOUS"

<a href="#">Link to this property</a>

"SUSPICIOUS"

<a href="#">Link to this property</a>

"SPOOF"

<a href="#">Link to this property</a>

"SPAM"

<a href="#">Link to this property</a>

"BULK"

<a href="#">Link to this property</a>

"NONE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

Deprecatedrequested\_ts: optional string

Use <code>requested_at</code> instead.

Deprecated, use <code>requested_at</code> instead.

<a href="#">Link to this property</a>

status: optional string

<a href="#">Link to this property</a>

subject: optional string

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "Team"or "User"

Indicates whether a team member or an end user created the submission.

</summary>

One of the following:

"Team"

<a href="#">Link to this property</a>

"User"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.submissions%20%3E%20(model)%20submission_list_response%20%3E%20(schema)>)