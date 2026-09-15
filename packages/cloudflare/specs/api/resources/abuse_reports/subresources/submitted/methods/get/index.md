---
title: Get a submitted abuse report
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Abuse Reports](https://developers.cloudflare.com/api/resources/abuse_reports)

[Submitted](https://developers.cloudflare.com/api/resources/abuse_reports/subresources/submitted)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get a submitted abuse report

GET/accounts/{account\_id}/abuse-reports/submitted/{report\_id}

Retrieve a report submitted by the account.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Trust and Safety Write``Trust and Safety Read`

##### P ath ParametersExpand Collapse

account\_id: string

maxLength32

[Link to this property](#)%20abuse_reports.submitted%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

report\_id: string

[Link to this property](#)%20abuse_reports.submitted%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20report_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {id, cdate, denial\_reason, 25 more }

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

dsa\_attestation: boolean

Whether the submitter provided the Digital Services Act attestation.

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

urls: array of string

URLs supplied with the report.

<a href="#">Link to this property</a>

agent\_name: optional string

Authorized agent name supplied with the report.

<a href="#">Link to this property</a>

comments: optional string

Additional comments supplied with the report.

<a href="#">Link to this property</a>

court: optional string

The string “on” when a court proceeding applies to the report; otherwise omitted.

<a href="#">Link to this property</a>

destination\_ips: optional array of string

Destination IP addresses supplied with a network abuse report.

<a href="#">Link to this property</a>

host\_notification: optional string

Submitter preference for notifying the hosting provider.

<a href="#">Link to this property</a>

justification: optional string

Evidence supplied with the report.

<a href="#">Link to this property</a>

ncmec\_notification: optional string

Submitter preference for notifying NCMEC.

<a href="#">Link to this property</a>

ncsei\_subject\_representation: optional boolean

Representation supplied for an NCSEI report.

<a href="#">Link to this property</a>

original\_work: optional string

Original work or targeted brand supplied with the report.

<a href="#">Link to this property</a>

owner\_notification: optional string

Submitter preference for notifying the content owner.

<a href="#">Link to this property</a>

ports\_protocols: optional array of string

Ports and protocols supplied with a network abuse report.

<a href="#">Link to this property</a>

<details>

<summary>

reg\_who\_request: optional object {reg\_who\_good\_faith\_affirmation, reg\_who\_lawful\_processing\_agreement, reg\_who\_legal\_basis, 4 more }

RDP-mandated fields for registrar WHOIS data disclosure requests.

</summary>

reg\_who\_good\_faith\_affirmation: boolean

Affirmation that the request is made in good faith per RDP 10.2.4. Must be true.

<a href="#">Link to this property</a>

reg\_who\_lawful\_processing\_agreement: boolean

Agreement to process data lawfully per RDP 10.2.5. Must be true.

<a href="#">Link to this property</a>

reg\_who\_legal\_basis: string

Legal rights and rationale for the request per RDP 10.2.3. Required for all WHOIS requests.

maxLength5000

<a href="#">Link to this property</a>

<details>

<summary>

reg\_who\_request\_type: "disclosure"or "invalid\_whois"

The type of WHOIS data request per RDP procedure.

</summary>

One of the following:

"disclosure"

<a href="#">Link to this property</a>

"invalid\_whois"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

reg\_who\_requested\_data\_elements: array of "registrant\_name"or "registrant\_organization"or "registrant\_email"or 14 more

The specific WHOIS data elements being requested per RDP 10.2.2. Required for all WHOIS requests.

</summary>

One of the following:

"registrant\_name"

<a href="#">Link to this property</a>

"registrant\_organization"

<a href="#">Link to this property</a>

"registrant\_email"

<a href="#">Link to this property</a>

"registrant\_phone"

<a href="#">Link to this property</a>

"registrant\_address"

<a href="#">Link to this property</a>

"registrant\_address\_country"

<a href="#">Link to this property</a>

"registrant\_address\_postal\_code"

<a href="#">Link to this property</a>

"admin\_name"

<a href="#">Link to this property</a>

"admin\_organization"

<a href="#">Link to this property</a>

"admin\_email"

<a href="#">Link to this property</a>

"admin\_phone"

<a href="#">Link to this property</a>

"admin\_address"

<a href="#">Link to this property</a>

"tech\_name"

<a href="#">Link to this property</a>

"tech\_organization"

<a href="#">Link to this property</a>

"tech\_email"

<a href="#">Link to this property</a>

"tech\_phone"

<a href="#">Link to this property</a>

"tech\_address"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

reg\_who\_authorization\_statement: optional string

Optional authorization statement or power of attorney per RDP 10.2.1.3.

maxLength5000

<a href="#">Link to this property</a>

<details>

<summary>

reg\_who\_requestor\_type: optional "government"or "corporation"or "individual"

The nature of the requestor per RDP 10.2.1.2.

</summary>

One of the following:

"government"

<a href="#">Link to this property</a>

"corporation"

<a href="#">Link to this property</a>

"individual"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

reported\_country: optional string

Country associated with the reported activity.

<a href="#">Link to this property</a>

reported\_user\_agent: optional string

User agent associated with the reported activity.

<a href="#">Link to this property</a>

source\_ips: optional array of string

Source IP addresses supplied with a network abuse report.

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

subtypes: optional array of string

Additional abuse classifications supplied with the report.

<a href="#">Link to this property</a>

title: optional string

Title supplied with the report.

<a href="#">Link to this property</a>

udrp: optional string

The string “on” when a UDRP proceeding applies to the report; otherwise omitted.

<a href="#">Link to this property</a>

urs: optional string

The string “on” when a URS proceeding applies to the report; otherwise omitted.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20abuse_reports.submitted%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20abuse_reports.submitted%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

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

[Link to this property](#)%20abuse_reports.submitted%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: optional array of object {message }

</summary>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20abuse_reports.submitted%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

### Get a submitted abuse report

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/abuse-reports/submitted/$REPORT_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "id": "id",
    "cdate": "2019-12-27T18:11:19.117Z",
    "denial_reason": "unable_to_confirm",
    "domain": "domain",
    "dsa_attestation": true,
    "status": "submitted",
    "type": "PHISH",
    "urls": [
      "string"
    ],
    "agent_name": "agent_name",
    "comments": "comments",
    "court": "court",
    "destination_ips": [
      "string"
    ],
    "host_notification": "host_notification",
    "justification": "justification",
    "ncmec_notification": "ncmec_notification",
    "ncsei_subject_representation": true,
    "original_work": "original_work",
    "owner_notification": "owner_notification",
    "ports_protocols": [
      "string"
    ],
    "reg_who_request": {
      "reg_who_good_faith_affirmation": true,
      "reg_who_lawful_processing_agreement": true,
      "reg_who_legal_basis": "reg_who_legal_basis",
      "reg_who_request_type": "disclosure",
      "reg_who_requested_data_elements": [
        "registrant_name"
      ],
      "reg_who_authorization_statement": "reg_who_authorization_statement",
      "reg_who_requestor_type": "government"
    },
    "reported_country": "reported_country",
    "reported_user_agent": "reported_user_agent",
    "source_ips": [
      "string"
    ],
    "submitter": {
      "company": "company",
      "email": "email",
      "name": "name",
      "telephone": "telephone"
    },
    "subtypes": [
      "string"
    ],
    "title": "title",
    "udrp": "udrp",
    "urs": "urs"
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
    "cdate": "2019-12-27T18:11:19.117Z",
    "denial_reason": "unable_to_confirm",
    "domain": "domain",
    "dsa_attestation": true,
    "status": "submitted",
    "type": "PHISH",
    "urls": [
      "string"
    ],
    "agent_name": "agent_name",
    "comments": "comments",
    "court": "court",
    "destination_ips": [
      "string"
    ],
    "host_notification": "host_notification",
    "justification": "justification",
    "ncmec_notification": "ncmec_notification",
    "ncsei_subject_representation": true,
    "original_work": "original_work",
    "owner_notification": "owner_notification",
    "ports_protocols": [
      "string"
    ],
    "reg_who_request": {
      "reg_who_good_faith_affirmation": true,
      "reg_who_lawful_processing_agreement": true,
      "reg_who_legal_basis": "reg_who_legal_basis",
      "reg_who_request_type": "disclosure",
      "reg_who_requested_data_elements": [
        "registrant_name"
      ],
      "reg_who_authorization_statement": "reg_who_authorization_statement",
      "reg_who_requestor_type": "government"
    },
    "reported_country": "reported_country",
    "reported_user_agent": "reported_user_agent",
    "source_ips": [
      "string"
    ],
    "submitter": {
      "company": "company",
      "email": "email",
      "name": "name",
      "telephone": "telephone"
    },
    "subtypes": [
      "string"
    ],
    "title": "title",
    "udrp": "udrp",
    "urs": "urs"
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