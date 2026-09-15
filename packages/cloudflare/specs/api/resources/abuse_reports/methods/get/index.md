---
title: Abuse Report Details
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Abuse Reports](https://developers.cloudflare.com/api/resources/abuse_reports)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Abuse Report Details

GET/accounts/{account\_id}/abuse-reports/{report\_param}

Retrieve the details of an abuse report.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Trust and Safety Write``Trust and Safety Read`

##### P ath ParametersExpand Collapse

account\_id: string

maxLength32

[Link to this property](#)%20abuse_reports%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

report\_param: string

[Link to this property](#)%20abuse_reports%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20report_param%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {id, cdate, domain, 7 more }

</summary>

id: string

Public facing ID of abuse report, aka abuse\_rand.

<a href="#">Link to this property</a>

cdate: string

Creation date of report. Time in RFC 3339 format (<a href="https://www.rfc-editor.org/rfc/rfc3339.html">https://www.rfc-editor.org/rfc/rfc3339.html</a>)

<a href="#">Link to this property</a>

domain: string

Domain that relates to the report.

<a href="#">Link to this property</a>

<details>

<summary>

mitigation\_summary: object {accepted\_url\_count, active\_count, external\_host\_notified, 2 more }

A summary of the mitigations related to this report.

</summary>

accepted\_url\_count: number

How many of the reported URLs were confirmed as abusive.

<a href="#">Link to this property</a>

active\_count: number

How many mitigations are active.

<a href="#">Link to this property</a>

external\_host\_notified: boolean

Whether the report has been forwarded to an external hosting provider.

<a href="#">Link to this property</a>

in\_review\_count: number

How many mitigations are under review.

<a href="#">Link to this property</a>

pending\_count: number

How many mitigations are pending their effective date.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: "accepted"or "in\_review"

An enum value that represents the status of an abuse record

</summary>

One of the following:

"accepted"

<a href="#">Link to this property</a>

"in\_review"

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

justification: optional string

Justification for the report.

<a href="#">Link to this property</a>

original\_work: optional string

Original work / Targeted brand in the alleged abuse.

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

urls: optional array of string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20abuse_reports%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20abuse_reports%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

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

[Link to this property](#)%20abuse_reports%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: optional array of object {message }

</summary>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20abuse_reports%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

### Abuse Report Details

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/abuse-reports/$REPORT_PARAM \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "id": "id",
    "cdate": "2009-11-10T23:00:00Z",
    "domain": "domain",
    "mitigation_summary": {
      "accepted_url_count": 0,
      "active_count": 0,
      "external_host_notified": true,
      "in_review_count": 0,
      "pending_count": 0
    },
    "status": "accepted",
    "type": "PHISH",
    "justification": "justification",
    "original_work": "original_work",
    "submitter": {
      "company": "company",
      "email": "email",
      "name": "name",
      "telephone": "telephone"
    },
    "urls": [
      "string"
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
  ]
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "id": "id",
    "cdate": "2009-11-10T23:00:00Z",
    "domain": "domain",
    "mitigation_summary": {
      "accepted_url_count": 0,
      "active_count": 0,
      "external_host_notified": true,
      "in_review_count": 0,
      "pending_count": 0
    },
    "status": "accepted",
    "type": "PHISH",
    "justification": "justification",
    "original_work": "original_work",
    "submitter": {
      "company": "company",
      "email": "email",
      "name": "name",
      "telephone": "telephone"
    },
    "urls": [
      "string"
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
  ]
}
```