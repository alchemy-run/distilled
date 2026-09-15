---
title: Create a remediation jobs export
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Casb](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb)

[Posture](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture)

[Remediations](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/remediations)

[Jobs](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/remediations/subresources/jobs)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create a remediation jobs export

POST/accounts/{account\_id}/data-security/posture/remediations/jobs/export

Creates a CSV export for remediation jobs and accepts optional filters in the payload.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Zero Trust Read``Zero Trust Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(method)%20export%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

integration\_id: optional array of string

Filter by multiple integration IDs.

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(method)%20export%20%3E%20(params)%200%20%3E%20(param)%20integration_id%20%3E%20(schema)>)

max\_updated\_at: optional string

Filter to view remediation jobs updated on or before this datetime. Can be a date-time in ISO 8601 format or an epoch timestamp.

formatdate-time

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(method)%20export%20%3E%20(params)%200%20%3E%20(param)%20max_updated_at%20%3E%20(schema)>)

min\_updated\_at: optional string

Filter to view remediation jobs updated on or after this datetime. Can be a date-time in ISO 8601 format or an epoch timestamp.

formatdate-time

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(method)%20export%20%3E%20(params)%200%20%3E%20(param)%20min_updated_at%20%3E%20(schema)>)

<details>

<summary>

orders: optional array of object {direction, name }

Ordering specifications for the export.

</summary>

<details>

<summary>

direction: "asc"or "desc"

Sort direction.

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

name: "asset\_name"or "finding\_type\_name"or "integration\_name"or 3 more

Which field to use when ordering the remediation jobs.

</summary>

One of the following:

"asset\_name"

<a href="#">Link to this property</a>

"finding\_type\_name"

<a href="#">Link to this property</a>

"integration\_name"

<a href="#">Link to this property</a>

"status"

<a href="#">Link to this property</a>

"last\_updated\_at"

<a href="#">Link to this property</a>

"affliction\_date"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(method)%20export%20%3E%20(params)%200%20%3E%20(param)%20orders%20%3E%20(schema)>)

search: optional string

A search term.

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(method)%20export%20%3E%20(params)%200%20%3E%20(param)%20search%20%3E%20(schema)>)

<details>

<summary>

status: optional array of "pending"or "processing"or "completed"or 2 more

Filter by remediation job status.

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"processing"

<a href="#">Link to this property</a>

"completed"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

"validating"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(method)%20export%20%3E%20(params)%200%20%3E%20(param)%20status%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(method)%20export%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(method)%20export%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: boolean

Whether the API call was successful.

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(method)%20export%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, status, type, 5 more }

Information about an export job.

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

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(method)%20export%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Create a remediation jobs export

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/data-security/posture/remediations/jobs/export \
    -X POST \
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
  "success": true,
  "result": {
    "id": "45ce02c2-e797-4a71-98cb-937244352fd4",
    "status": "Success",
    "type": "finding",
    "user_id": "e7712d506b1ee4c5ede0802815f55a75",
    "download_url": "https://example.com/45ce02c2-e797-4a71-98cb-937244352fd4",
    "errors": null,
    "file_name": "findings_export_2024-02-27.csv",
    "file_path": "/exports/finding-instances/2024/02/27/Finding_Instances_2024-02-27T04:05:26Z.csv"
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
  "success": true,
  "result": {
    "id": "45ce02c2-e797-4a71-98cb-937244352fd4",
    "status": "Success",
    "type": "finding",
    "user_id": "e7712d506b1ee4c5ede0802815f55a75",
    "download_url": "https://example.com/45ce02c2-e797-4a71-98cb-937244352fd4",
    "errors": null,
    "file_name": "findings_export_2024-02-27.csv",
    "file_path": "/exports/finding-instances/2024/02/27/Finding_Instances_2024-02-27T04:05:26Z.csv"
  }
}
```