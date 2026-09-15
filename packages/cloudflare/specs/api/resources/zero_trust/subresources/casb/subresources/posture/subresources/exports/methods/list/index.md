---
title: List all export jobs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Casb](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb)

[Posture](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture)

[Exports](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/exports)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List all export jobs

GET/accounts/{account\_id}/data-security/posture/exports

List all export jobs for a given requestor’s organization

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Zero Trust Read``Zero Trust Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.casb.posture.exports%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

page: optional number

A page number within the paginated result set.

[Link to this property](#)%20zero_trust.casb.posture.exports%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Number of results to return per page.

[Link to this property](#)%20zero_trust.casb.posture.exports%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

<details>

<summary>

status: optional "Pending"or "Success"or "Failure"or 2 more

Filter on export job’s status

</summary>

One of the following:

"Pending"

<a href="#">Link to this property</a>

"Success"

<a href="#">Link to this property</a>

"Failure"

<a href="#">Link to this property</a>

"Rescheduled"

<a href="#">Link to this property</a>

"In-Progress"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.exports%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20status%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

</summary>

code: number

Error or message code.

minimum1000

<a href="#">Link to this property</a>

message: string

Human-readable message.

<a href="#">Link to this property</a>

documentation\_url: optional string

Link to relevant documentation.

formaturi

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

JSON pointer to the source of the error.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.exports%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

</summary>

code: number

Error or message code.

minimum1000

<a href="#">Link to this property</a>

message: string

Human-readable message.

<a href="#">Link to this property</a>

documentation\_url: optional string

Link to relevant documentation.

formaturi

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

JSON pointer to the source of the error.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.exports%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result\_info: object {count, cursor, next, 4 more }

Pagination and result information.

</summary>

count: optional number

Total number of results for the requested service.

<a href="#">Link to this property</a>

cursor: optional string

Cursor for cursor-based pagination.

<a href="#">Link to this property</a>

next: optional string

URL to the next page of results.

formaturi

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page of results.

<a href="#">Link to this property</a>

previous: optional string

URL to the previous page of results.

formaturi

<a href="#">Link to this property</a>

total\_count: optional number

Total results available without any search parameters.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.exports%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

success: boolean

Whether the API call was successful.

[Link to this property](#)%20zero_trust.casb.posture.exports%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of object {id, status, type, 5 more }

Array of export job objects.

</summary>

id: string

Unique identifier for the export job.

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

status: "Pending"or "Success"or "Failure"or 2 more

Status of an export job.

</summary>

One of the following:

"Pending"

<a href="#">Link to this property</a>

"Success"

<a href="#">Link to this property</a>

"Failure"

<a href="#">Link to this property</a>

"Rescheduled"

<a href="#">Link to this property</a>

"In-Progress"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: "finding"or "findingInstance"or "content"or "remediationJob"

Type of export job.

</summary>

One of the following:

"finding"

<a href="#">Link to this property</a>

"findingInstance"

<a href="#">Link to this property</a>

"content"

<a href="#">Link to this property</a>

"remediationJob"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

user\_id: string

ID of the export-requesting user.

maxLength128

<a href="#">Link to this property</a>

download\_url: optional string

The URL by which the successfully created export can be downloaded by the end users.

formaturi

maxLength1024

<a href="#">Link to this property</a>

errors: optional string

Contains information on errors which may have occurred during export creation.

<a href="#">Link to this property</a>

file\_name: optional string

The base name of the file that is/was generated by the export job.

maxLength256

<a href="#">Link to this property</a>

file\_path: optional string

The full path of the file that is stored within external storage (currently R2).

maxLength512

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.exports%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### List all export jobs

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/data-security/posture/exports \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "Request processed successfully",
      "documentation_url": "https://developers.cloudflare.com/api/operations/list-findings",
      "source": {
        "pointer": "/data/attributes/name"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "Request processed successfully",
      "documentation_url": "https://developers.cloudflare.com/api/operations/list-findings",
      "source": {
        "pointer": "/data/attributes/name"
      }
    }
  ],
  "result_info": {
    "count": 1,
    "cursor": "eyJpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsImFmZmxpY3Rpb25fZGF0ZSI6IjE5NzAtMDEtMDFUMDA6MDA6MDAuMDAwMDAwWiJ9",
    "next": "https://example.com",
    "page": 1,
    "per_page": 20,
    "previous": "https://example.com",
    "total_count": 2000
  },
  "success": true,
  "result": [
    {
      "id": "45ce02c2-e797-4a71-98cb-937244352fd4",
      "status": "Success",
      "type": "finding",
      "user_id": "e7712d506b1ee4c5ede0802815f55a75",
      "download_url": "https://example.com/45ce02c2-e797-4a71-98cb-937244352fd4",
      "errors": null,
      "file_name": "findings_export_2024-02-27.csv",
      "file_path": "/exports/finding-instances/2024/02/27/Finding_Instances_2024-02-27T04:05:26Z.csv"
    }
  ]
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "Request processed successfully",
      "documentation_url": "https://developers.cloudflare.com/api/operations/list-findings",
      "source": {
        "pointer": "/data/attributes/name"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "Request processed successfully",
      "documentation_url": "https://developers.cloudflare.com/api/operations/list-findings",
      "source": {
        "pointer": "/data/attributes/name"
      }
    }
  ],
  "result_info": {
    "count": 1,
    "cursor": "eyJpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsImFmZmxpY3Rpb25fZGF0ZSI6IjE5NzAtMDEtMDFUMDA6MDA6MDAuMDAwMDAwWiJ9",
    "next": "https://example.com",
    "page": 1,
    "per_page": 20,
    "previous": "https://example.com",
    "total_count": 2000
  },
  "success": true,
  "result": [
    {
      "id": "45ce02c2-e797-4a71-98cb-937244352fd4",
      "status": "Success",
      "type": "finding",
      "user_id": "e7712d506b1ee4c5ede0802815f55a75",
      "download_url": "https://example.com/45ce02c2-e797-4a71-98cb-937244352fd4",
      "errors": null,
      "file_name": "findings_export_2024-02-27.csv",
      "file_path": "/exports/finding-instances/2024/02/27/Finding_Instances_2024-02-27T04:05:26Z.csv"
    }
  ]
}
```