---
title: List submitted abuse reports
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Abuse Reports](https://developers.cloudflare.com/api/resources/abuse_reports)

[Submitted](https://developers.cloudflare.com/api/resources/abuse_reports/subresources/submitted)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List submitted abuse reports

GET/accounts/{account\_id}/abuse-reports/submitted

List abuse reports submitted by the account.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Trust and Safety Write``Trust and Safety Read`

##### P ath ParametersExpand Collapse

account\_id: string

maxLength32

[Link to this property](#)%20abuse_reports.submitted%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

id: optional string

Filter by report code.

[Link to this property](#)%20abuse_reports.submitted%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20id%20%3E%20(schema)>)

created\_after: optional string

Return reports submitted after this time.

formatdate-time

[Link to this property](#)%20abuse_reports.submitted%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20created_after%20%3E%20(schema)>)

created\_before: optional string

Return reports submitted before this time.

formatdate-time

[Link to this property](#)%20abuse_reports.submitted%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20created_before%20%3E%20(schema)>)

domain: optional array of string

Filter by reported domain. This parameter can be specified multiple times.

[Link to this property](#)%20abuse_reports.submitted%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20domain%20%3E%20(schema)>)

page: optional number

Page of submitted reports to return.

minimum1

[Link to this property](#)%20abuse_reports.submitted%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Number of submitted reports per page.

maximum200

minimum1

[Link to this property](#)%20abuse_reports.submitted%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

sort: optional string

A property and direction to sort by (id, cdate, domain, type, status).

[Link to this property](#)%20abuse_reports.submitted%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20sort%20%3E%20(schema)>)

<details>

<summary>

status: optional array of "submitted"or "accepted"or "denied"

Filter by submitter-facing status. This parameter can be specified multiple times.

</summary>

One of the following:

"submitted"

<a href="#">Link to this property</a>

"accepted"

<a href="#">Link to this property</a>

"denied"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20abuse_reports.submitted%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20status%20%3E%20(schema)>)

<details>

<summary>

type: optional array of "PHISH"or "GEN"or "THREAT"or 6 more

Filter by report type. This parameter can be specified multiple times.

</summary>

One of the following:

"PHISH"

<a href="#">Link to this property</a>

"GEN"

<a href="#">Link to this property</a>

"THREAT"

<a href="#">Link to this property</a>

"DMCA"

<a href="#">Link to this property</a>

"EMER"

<a href="#">Link to this property</a>

"TM"

<a href="#">Link to this property</a>

"REG\_WHO"

<a href="#">Link to this property</a>

"NCSEI"

<a href="#">Link to this property</a>

"NETWORK"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20abuse_reports.submitted%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20type%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {reports }

</summary>

<details>

<summary>

reports: array of object {id, cdate, denial\_reason, 4 more }

</summary>

id: string

Public report code.

<a href="#">Link to this property</a>

cdate: string

Time the report was submitted.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

denial\_reason: "unable\_to\_confirm"or "incomplete\_report"or "not\_on\_cloudflare"or 10 more

Submitter-safe reason for a denied report. Null when unavailable.

</summary>

One of the following:

"unable\_to\_confirm"

<a href="#">Link to this property</a>

"incomplete\_report"

<a href="#">Link to this property</a>

"not\_on\_cloudflare"

<a href="#">Link to this property</a>

"duplicate\_report"

<a href="#">Link to this property</a>

"content\_removed"

<a href="#">Link to this property</a>

"report\_details\_mismatch"

<a href="#">Link to this property</a>

"no\_abuse\_found"

<a href="#">Link to this property</a>

"missing\_original\_work"

<a href="#">Link to this property</a>

"direct\_url\_required"

<a href="#">Link to this property</a>

"wrong\_report\_category"

<a href="#">Link to this property</a>

"content\_unavailable"

<a href="#">Link to this property</a>

"law\_enforcement\_referral\_required"

<a href="#">Link to this property</a>

"domain\_dispute\_process\_required"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

domain: string

Domain identified in the report.

<a href="#">Link to this property</a>

<details>

<summary>

status: "submitted"or "accepted"or "denied"

Status visible to the account that submitted the report.

</summary>

One of the following:

"submitted"

<a href="#">Link to this property</a>

"accepted"

<a href="#">Link to this property</a>

"denied"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: "PHISH"or "GEN"or "THREAT"or 6 more

The abuse report type

</summary>

One of the following:

"PHISH"

<a href="#">Link to this property</a>

"GEN"

<a href="#">Link to this property</a>

"THREAT"

<a href="#">Link to this property</a>

"DMCA"

<a href="#">Link to this property</a>

"EMER"

<a href="#">Link to this property</a>

"TM"

<a href="#">Link to this property</a>

"REG\_WHO"

<a href="#">Link to this property</a>

"NCSEI"

<a href="#">Link to this property</a>

"NETWORK"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

submitter: optional object {company, email, name, telephone }

Information about the submitter of the report.

</summary>

company: optional string

<a href="#">Link to this property</a>

email: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

telephone: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20abuse_reports.submitted%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20abuse_reports.submitted%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

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

[Link to this property](#)%20abuse_reports.submitted%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: optional array of object {message }

</summary>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20abuse_reports.submitted%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

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

[Link to this property](#)%20abuse_reports.submitted%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List submitted abuse reports

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/abuse-reports/submitted \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "reports": [
      {
        "id": "id",
        "cdate": "2019-12-27T18:11:19.117Z",
        "denial_reason": "unable_to_confirm",
        "domain": "domain",
        "status": "submitted",
        "type": "PHISH",
        "submitter": {
          "company": "company",
          "email": "email",
          "name": "name",
          "telephone": "telephone"
        }
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
    "reports": [
      {
        "id": "id",
        "cdate": "2019-12-27T18:11:19.117Z",
        "denial_reason": "unable_to_confirm",
        "domain": "domain",
        "status": "submitted",
        "type": "PHISH",
        "submitter": {
          "company": "company",
          "email": "email",
          "name": "name",
          "telephone": "telephone"
        }
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