---
title: List emails sent to an abuse report submitter
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Abuse Reports](https://developers.cloudflare.com/api/resources/abuse_reports)

[Submitted](https://developers.cloudflare.com/api/resources/abuse_reports/subresources/submitted)

[Emails](https://developers.cloudflare.com/api/resources/abuse_reports/subresources/submitted/subresources/emails)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List emails sent to an abuse report submitter

GET/accounts/{account\_id}/abuse-reports/submitted/{report\_id}/emails

List successful emails sent to the submitter of a report submitted by the account. Does not include emails sent to customers or hosts.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Trust and Safety Write``Trust and Safety Read`

##### P ath ParametersExpand Collapse

account\_id: string

maxLength32

[Link to this property](#)%20abuse_reports.submitted.emails%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

report\_id: string

[Link to this property](#)%20abuse_reports.submitted.emails%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20report_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

page: optional number

Page number to retrieve (default 1).

[Link to this property](#)%20abuse_reports.submitted.emails%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Number of emails per page (default 20, max 100).

[Link to this property](#)%20abuse_reports.submitted.emails%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {emails }

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

[Link to this property](#)%20abuse_reports.submitted.emails%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20abuse_reports.submitted.emails%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

errors: optional array of object {message, code }

</summary>

message: string

<a href="#">Link to this property</a>

<details>

<summary>

code: optional stringor number

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20abuse_reports.submitted.emails%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: optional array of object {message }

</summary>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20abuse_reports.submitted.emails%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, 2 more }

</summary>

count: number

<a href="#">Link to this property</a>

page: number

<a href="#">Link to this property</a>

per\_page: number

<a href="#">Link to this property</a>

total\_count: number

<a href="#">Link to this property</a>

total\_pages: number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20abuse_reports.submitted.emails%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List emails sent to an abuse report submitter

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/abuse-reports/submitted/$REPORT_ID/emails \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "emails": [
      {
        "id": "id",
        "body": "body",
        "recipient": "recipient",
        "sent_at": "2009-11-10T23:00:00Z",
        "subject": "subject"
      }
    ]
  },
  "success": true,
  "errors": [
    {
      "message": "message",
      "code": "string"
    }
  ],
  "messages": [
    {
      "message": "message"
    }
  ],
  "result_info": {
    "count": 0,
    "page": 0,
    "per_page": 0,
    "total_count": 0,
    "total_pages": 0
  }
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "emails": [
      {
        "id": "id",
        "body": "body",
        "recipient": "recipient",
        "sent_at": "2009-11-10T23:00:00Z",
        "subject": "subject"
      }
    ]
  },
  "success": true,
  "errors": [
    {
      "message": "message",
      "code": "string"
    }
  ],
  "messages": [
    {
      "message": "message"
    }
  ],
  "result_info": {
    "count": 0,
    "page": 0,
    "per_page": 0,
    "total_count": 0,
    "total_pages": 0
  }
}
```