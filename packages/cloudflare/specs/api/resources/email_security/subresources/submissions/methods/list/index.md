---
title: Get reclassify submissions
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Security](https://developers.cloudflare.com/api/resources/email_security)

[Submissions](https://developers.cloudflare.com/api/resources/email_security/subresources/submissions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get reclassify submissions

GET/accounts/{account\_id}/email-security/submissions

Returns information for submissions made to reclassify emails. Shows the status, outcome, and disposition changes for reclassification requests made by users or the security team. Useful for tracking false positive/negative reports.

##### Security

<details>

<summary>API Token</summary>



The preferred authorization scheme for interacting with the Cloudflare API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/create-token/">Create a token</a>.

**Example:**<code>Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY</code>

</details>

<details>

<summary>API Email + API Key</summary>



The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**<code>X-Auth-Email: user@example.com</code>

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**<code>X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194</code>

</details>

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20email_security.submissions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

<details>

<summary>

direction: optional "asc"or "desc"

The sorting direction.

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.submissions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

end: optional string

The end of the search date range. Defaults to `now`.

formatdate-time

[Link to this property](#)%20email_security.submissions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20end%20%3E%20(schema)>)

escalated\_from\_user: optional boolean

When true, return only submissions that were escalated by an end user (vs. by the security team). When false, return only submissions that were not escalated by an end user. When omitted, no filter is applied.

[Link to this property](#)%20email_security.submissions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20escalated_from_user%20%3E%20(schema)>)

<details>

<summary>

order: optional "submission\_id"or "subject"or "original\_disposition"or 3 more

Field to sort by.

</summary>

One of the following:

"submission\_id"

<a href="#">Link to this property</a>

"subject"

<a href="#">Link to this property</a>

"original\_disposition"

<a href="#">Link to this property</a>

"requested\_disposition"

<a href="#">Link to this property</a>

"outcome\_disposition"

<a href="#">Link to this property</a>

"requested\_at"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.submissions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order%20%3E%20(schema)>)

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

[Link to this property](#)%20email_security.submissions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20original_disposition%20%3E%20(schema)>)

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

[Link to this property](#)%20email_security.submissions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20outcome_disposition%20%3E%20(schema)>)

page: optional number

Current page within paginated list of results.

minimum1

[Link to this property](#)%20email_security.submissions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

The number of results per page. Maximum value is 1000.

maximum1000

minimum1

[Link to this property](#)%20email_security.submissions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

query: optional string

[Link to this property](#)%20email_security.submissions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20query%20%3E%20(schema)>)

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

[Link to this property](#)%20email_security.submissions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20requested_disposition%20%3E%20(schema)>)

start: optional string

The beginning of the search date range. Defaults to `now - 30 days`.

formatdate-time

[Link to this property](#)%20email_security.submissions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20start%20%3E%20(schema)>)

status: optional string

[Link to this property](#)%20email_security.submissions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20status%20%3E%20(schema)>)

submission\_id: optional string

[Link to this property](#)%20email_security.submissions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20submission_id%20%3E%20(schema)>)

<details>

<summary>

type: optional "TEAM"or "USER"

</summary>

One of the following:

"TEAM"

<a href="#">Link to this property</a>

"USER"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.submissions%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20type%20%3E%20(schema)>)

##### ReturnsExpand Collapse

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

[Link to this property](#)%20email_security.submissions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20email_security.submissions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20email_security.submissions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of object {requested\_at, submission\_id, customer\_status, 15 more }

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

[Link to this property](#)%20email_security.submissions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, total\_count }

</summary>

count: optional number

Total number of results for the requested service.

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page of results.

<a href="#">Link to this property</a>

total\_count: optional number

Total results available without any search parameters.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_security.submissions%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### Get reclassify submissions

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/submissions \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": [
    {
      "requested_at": "2019-12-27T18:11:19.117Z",
      "submission_id": "submission_id",
      "customer_status": "escalated",
      "escalated_as": "MALICIOUS",
      "escalated_at": "2019-12-27T18:11:19.117Z",
      "escalated_by": "escalated_by",
      "escalated_submission_id": "escalated_submission_id",
      "original_disposition": "MALICIOUS",
      "original_edf_hash": "original_edf_hash",
      "original_postfix_id": "original_postfix_id",
      "outcome": "outcome",
      "outcome_disposition": "MALICIOUS",
      "requested_by": "requested_by",
      "requested_disposition": "MALICIOUS",
      "requested_ts": "requested_ts",
      "status": "status",
      "subject": "subject",
      "type": "Team"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": [
    {
      "requested_at": "2019-12-27T18:11:19.117Z",
      "submission_id": "submission_id",
      "customer_status": "escalated",
      "escalated_as": "MALICIOUS",
      "escalated_at": "2019-12-27T18:11:19.117Z",
      "escalated_by": "escalated_by",
      "escalated_submission_id": "escalated_submission_id",
      "original_disposition": "MALICIOUS",
      "original_edf_hash": "original_edf_hash",
      "original_postfix_id": "original_postfix_id",
      "outcome": "outcome",
      "outcome_disposition": "MALICIOUS",
      "requested_by": "requested_by",
      "requested_disposition": "MALICIOUS",
      "requested_ts": "requested_ts",
      "status": "status",
      "subject": "subject",
      "type": "Team"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```