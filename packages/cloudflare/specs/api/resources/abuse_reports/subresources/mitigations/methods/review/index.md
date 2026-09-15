---
title: Request review on mitigations
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Abuse Reports](https://developers.cloudflare.com/api/resources/abuse_reports)

[Mitigations](https://developers.cloudflare.com/api/resources/abuse_reports/subresources/mitigations)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Request review on mitigations

POST/accounts/{account\_id}/abuse-reports/{report\_id}/mitigations/appeal

Request a review for mitigations on an account. Repeating a request for a mitigation with an unresolved appeal is idempotent and returns that mitigation in the in-review state.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Trust and Safety Write`

##### P ath ParametersExpand Collapse

account\_id: string

maxLength32

[Link to this property](#)%20abuse_reports.mitigations%20%3E%20(method)%20review%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

report\_id: string

[Link to this property](#)%20abuse_reports.mitigations%20%3E%20(method)%20review%20%3E%20(params)%20default%20%3E%20(param)%20report_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

appeals: optional array of object {id, reason }

List of mitigations to appeal.

</summary>

id: string

ID of the mitigation to appeal.

<a href="#">Link to this property</a>

<details>

<summary>

reason: "removed"or "misclassified"

Reason why the customer is appealing.

</summary>

One of the following:

"removed"

<a href="#">Link to this property</a>

"misclassified"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20abuse_reports.mitigations%20%3E%20(method)%20review%20%3E%20(params)%200%20%3E%20(param)%20appeals%20%3E%20(schema)>)

<details>

<summary>

data: optional object {city, country, email, 11 more }

Counter-notice details supporting an appeal.

</summary>

city: string

<a href="#">Link to this property</a>

country: string

<a href="#">Link to this property</a>

email: string

formatemail

<a href="#">Link to this property</a>

full\_name: string

<a href="#">Link to this property</a>

jurisdiction\_consent: boolean

<a href="#">Link to this property</a>

perjury\_attestation: boolean

<a href="#">Link to this property</a>

phone\_number: string

<a href="#">Link to this property</a>

signature: string

<a href="#">Link to this property</a>

state: string

<a href="#">Link to this property</a>

street\_address: string

<a href="#">Link to this property</a>

urls: array of string

<a href="#">Link to this property</a>

zip\_code: string

<a href="#">Link to this property</a>

company: optional string

<a href="#">Link to this property</a>

counter\_notice\_response: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20abuse_reports.mitigations%20%3E%20(method)%20review%20%3E%20(params)%200%20%3E%20(param)%20data%20%3E%20(schema)>)

<details>

<summary>

type: optional "counter\_notice"or "content\_removed"

The type of appeal being submitted.

</summary>

One of the following:

"counter\_notice"

<a href="#">Link to this property</a>

"content\_removed"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20abuse_reports.mitigations%20%3E%20(method)%20review%20%3E%20(params)%200%20%3E%20(param)%20type%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result\_info: object {count, page, per\_page, 2 more }

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

[Link to this property](#)%20abuse_reports.mitigations%20%3E%20(method)%20review%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

success: boolean

[Link to this property](#)%20abuse_reports.mitigations%20%3E%20(method)%20review%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

errors: optional array of object {message }

</summary>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20abuse_reports.mitigations%20%3E%20(method)%20review%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: optional array of object {message }

</summary>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20abuse_reports.mitigations%20%3E%20(method)%20review%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: optional array of object {id, effective\_date, entity\_id, 3 more }

</summary>

id: string

ID of remediation.

<a href="#">Link to this property</a>

effective\_date: string

Date when the mitigation will become active. Time in RFC 3339 format (<a href="https://www.rfc-editor.org/rfc/rfc3339.html">https://www.rfc-editor.org/rfc/rfc3339.html</a>)

<a href="#">Link to this property</a>

entity\_id: string

<a href="#">Link to this property</a>

<details>

<summary>

entity\_type: "url\_pattern"or "account"or "zone"or "custom\_expression"

The type of entity targeted by a mitigation.

</summary>

One of the following:

"url\_pattern"

<a href="#">Link to this property</a>

"account"

<a href="#">Link to this property</a>

"zone"

<a href="#">Link to this property</a>

"custom\_expression"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: "pending"or "active"or "in\_review"or 2 more

The status of a mitigation

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"in\_review"

<a href="#">Link to this property</a>

"cancelled"

<a href="#">Link to this property</a>

"removed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: string

The type of mitigation applied to a reported entity.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20abuse_reports.mitigations%20%3E%20(method)%20review%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Request review on mitigations

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/abuse-reports/$REPORT_ID/mitigations/appeal \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "type": "counter_notice"
        }'
```

200 example

```
{
  "result_info": {
    "count": 0,
    "page": 0,
    "per_page": 0,
    "total_count": 0,
    "total_pages": 0
  },
  "success": true,
  "errors": [
    {
      "message": "message"
    }
  ],
  "messages": [
    {
      "message": "message"
    }
  ],
  "result": [
    {
      "id": "id",
      "effective_date": "2009-11-10T23:00:00Z",
      "entity_id": "entity_id",
      "entity_type": "url_pattern",
      "status": "pending",
      "type": "type"
    }
  ]
}
```

##### Returns Examples

200 example

```
{
  "result_info": {
    "count": 0,
    "page": 0,
    "per_page": 0,
    "total_count": 0,
    "total_pages": 0
  },
  "success": true,
  "errors": [
    {
      "message": "message"
    }
  ],
  "messages": [
    {
      "message": "message"
    }
  ],
  "result": [
    {
      "id": "id",
      "effective_date": "2009-11-10T23:00:00Z",
      "entity_id": "entity_id",
      "entity_type": "url_pattern",
      "status": "pending",
      "type": "type"
    }
  ]
}
```