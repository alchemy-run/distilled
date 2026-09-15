---
title: List abuse report mitigations
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Abuse Reports](https://developers.cloudflare.com/api/resources/abuse_reports)

[Mitigations](https://developers.cloudflare.com/api/resources/abuse_reports/subresources/mitigations)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List abuse report mitigations

GET/accounts/{account\_id}/abuse-reports/{report\_id}/mitigations

List mitigations done to remediate the abuse report.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Trust and Safety Write``Trust and Safety Read`

##### P ath ParametersExpand Collapse

account\_id: string

maxLength32

[Link to this property](#)%20abuse_reports.mitigations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

report\_id: string

[Link to this property](#)%20abuse_reports.mitigations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20report_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

effective\_after: optional string

Returns mitigation that were dispatched after the given date

[Link to this property](#)%20abuse_reports.mitigations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20effective_after%20%3E%20(schema)>)

effective\_before: optional string

Returns mitigations that were dispatched before the given date

[Link to this property](#)%20abuse_reports.mitigations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20effective_before%20%3E%20(schema)>)

<details>

<summary>

entity\_type: optional "url\_pattern"or "account"or "zone"or "custom\_expression"

Filter by the type of entity the mitigation impacts.

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

[Link to this property](#)%20abuse_reports.mitigations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20entity_type%20%3E%20(schema)>)

page: optional number

Where in pagination to start listing abuse reports

[Link to this property](#)%20abuse_reports.mitigations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

How many abuse reports per page to list

[Link to this property](#)%20abuse_reports.mitigations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

<details>

<summary>

sort: optional "type,asc"or "type,desc"or "effective\_date,asc"or 5 more

A property to sort by, followed by the order

</summary>

One of the following:

"type,asc"

<a href="#">Link to this property</a>

"type,desc"

<a href="#">Link to this property</a>

"effective\_date,asc"

<a href="#">Link to this property</a>

"effective\_date,desc"

<a href="#">Link to this property</a>

"status,asc"

<a href="#">Link to this property</a>

"status,desc"

<a href="#">Link to this property</a>

"entity\_type,asc"

<a href="#">Link to this property</a>

"entity\_type,desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20abuse_reports.mitigations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20sort%20%3E%20(schema)>)

<details>

<summary>

status: optional "pending"or "active"or "in\_review"or 2 more

Filter by the status of the mitigation.

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

[Link to this property](#)%20abuse_reports.mitigations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20status%20%3E%20(schema)>)

type: optional string

Filter by the type of mitigation. This filter parameter can be specified multiple times to include multiple types of mitigations in the result set.

[Link to this property](#)%20abuse_reports.mitigations%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20type%20%3E%20(schema)>)

##### ReturnsExpand Collapse

success: boolean

[Link to this property](#)%20abuse_reports.mitigations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

errors: optional array of object {message }

</summary>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20abuse_reports.mitigations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: optional array of object {message }

</summary>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20abuse_reports.mitigations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: optional object {mitigations }

</summary>

<details>

<summary>

mitigations: array of object {id, effective\_date, entity\_id, 3 more }

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

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20abuse_reports.mitigations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

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

[Link to this property](#)%20abuse_reports.mitigations%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List abuse report mitigations

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/abuse-reports/$REPORT_ID/mitigations \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
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
  "result": {
    "mitigations": [
      {
        "id": "id",
        "effective_date": "2009-11-10T23:00:00Z",
        "entity_id": "entity_id",
        "entity_type": "url_pattern",
        "status": "pending",
        "type": "type"
      }
    ]
  },
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
  "result": {
    "mitigations": [
      {
        "id": "id",
        "effective_date": "2009-11-10T23:00:00Z",
        "entity_id": "entity_id",
        "entity_type": "url_pattern",
        "status": "pending",
        "type": "type"
      }
    ]
  },
  "result_info": {
    "count": 0,
    "page": 0,
    "per_page": 0,
    "total_count": 0,
    "total_pages": 0
  }
}
```