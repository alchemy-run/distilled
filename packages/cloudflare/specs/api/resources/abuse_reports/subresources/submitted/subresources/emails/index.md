---
title: Emails
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Abuse Reports](https://developers.cloudflare.com/api/resources/abuse_reports)

[Submitted](https://developers.cloudflare.com/api/resources/abuse_reports/subresources/submitted)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Emails

##### [List emails sent to an abuse report submitter](https://developers.cloudflare.com/api/resources/abuse_reports/subresources/submitted/subresources/emails/methods/list)

GET/accounts/{account\_id}/abuse-reports/submitted/{report\_id}/emails

##### ModelsExpand Collapse

<details>

<summary>

EmailListResponse object {emails }

</summary>

<details>

<summary>

emails: array of object {id, body, recipient, 2 more }

</summary>

id: string

Unique identifier of the email.

<a href="#">Link to this property</a>

body: string

Body content of the email.

<a href="#">Link to this property</a>

recipient: string

Email address of the recipient.

<a href="#">Link to this property</a>

sent\_at: string

When the email was sent. Time in RFC 3339 format (<a href="https://www.rfc-editor.org/rfc/rfc3339.html">https://www.rfc-editor.org/rfc/rfc3339.html</a>)

<a href="#">Link to this property</a>

subject: string

Subject line of the email.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20abuse_reports.submitted.emails%20%3E%20(model)%20email_list_response%20%3E%20(schema)>)