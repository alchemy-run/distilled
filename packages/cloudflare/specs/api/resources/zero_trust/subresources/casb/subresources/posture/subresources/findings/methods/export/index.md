---
title: Create new findings export request
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Casb](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb)

[Posture](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture)

[Findings](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/findings)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create new findings export request

POST/accounts/{account\_id}/data-security/posture/findings/export

Creates a CSV export for findings and accepts optional filters in the payload.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Zero Trust Read``Zero Trust Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20export%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

ignored: optional boolean

Filter for only the ignored findings. Set to false to only see active items.

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20export%20%3E%20(params)%200%20%3E%20(param)%20ignored%20%3E%20(schema)>)

integration\_id: optional array of string

Filter by multiple integration IDs.

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20export%20%3E%20(params)%200%20%3E%20(param)%20integration_id%20%3E%20(schema)>)

max\_affliction\_date: optional string

Filter to view findings that occurred on or before the affliction date. Can be a date-time in ISO 8601 format or an epoch timestamp.

formatdate-time

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20export%20%3E%20(params)%200%20%3E%20(param)%20max_affliction_date%20%3E%20(schema)>)

min\_affliction\_date: optional string

Filter to view findings that occurred on or after the affliction date. Can be a date-time in ISO 8601 format or an epoch timestamp.

formatdate-time

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20export%20%3E%20(params)%200%20%3E%20(param)%20min_affliction_date%20%3E%20(schema)>)

<details>

<summary>

orders: optional array of object {direction, name }

Which fields to use when ordering the findings.

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

name: "instance\_count"or "finding.name"or "integration.name"or 2 more

Which field to use when ordering the findings.

</summary>

One of the following:

"instance\_count"

<a href="#">Link to this property</a>

"finding.name"

<a href="#">Link to this property</a>

"integration.name"

<a href="#">Link to this property</a>

"latest\_affliction\_date"

<a href="#">Link to this property</a>

"severity"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20export%20%3E%20(params)%200%20%3E%20(param)%20orders%20%3E%20(schema)>)

<details>

<summary>

product: optional "SaaS"or "Cloud"

Filter by finding’s category product.

</summary>

One of the following:

"SaaS"

<a href="#">Link to this property</a>

"Cloud"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20export%20%3E%20(params)%200%20%3E%20(param)%20product%20%3E%20(schema)>)

search: optional string

A search term.

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20export%20%3E%20(params)%200%20%3E%20(param)%20search%20%3E%20(schema)>)

<details>

<summary>

severities: optional array of "CRITICAL"or "HIGH"or "MEDIUM"or "LOW"

Filter by severity levels.

</summary>

One of the following:

"CRITICAL"

<a href="#">Link to this property</a>

"HIGH"

<a href="#">Link to this property</a>

"MEDIUM"

<a href="#">Link to this property</a>

"LOW"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20export%20%3E%20(params)%200%20%3E%20(param)%20severities%20%3E%20(schema)>)

<details>

<summary>

vendors: optional array of "ANTHROPIC"or "AWS"or "BITBUCKET"or 13 more

Filter by vendor types.

</summary>

One of the following:

"ANTHROPIC"

<a href="#">Link to this property</a>

"AWS"

<a href="#">Link to this property</a>

"BITBUCKET"

<a href="#">Link to this property</a>

"BOX"

<a href="#">Link to this property</a>

"CONFLUENCE"

<a href="#">Link to this property</a>

"DROPBOX"

<a href="#">Link to this property</a>

"GITHUB"

<a href="#">Link to this property</a>

"GOOGLE\_CLOUD\_PLATFORM"

<a href="#">Link to this property</a>

"GOOGLE\_WORKSPACE"

<a href="#">Link to this property</a>

"JIRA"

<a href="#">Link to this property</a>

"MICROSOFT"

<a href="#">Link to this property</a>

"MICROSOFT\_INTERNAL"

<a href="#">Link to this property</a>

"OPENAI"

<a href="#">Link to this property</a>

"SALESFORCE"

<a href="#">Link to this property</a>

"SERVICENOW"

<a href="#">Link to this property</a>

"SLACK"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20export%20%3E%20(params)%200%20%3E%20(param)%20vendors%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20export%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20export%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: boolean

Whether the API call was successful.

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20export%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

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

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20export%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Create new findings export request

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/data-security/posture/findings/export \
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