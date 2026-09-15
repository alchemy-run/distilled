---
title: Create a content export
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Casb](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb)

[Posture](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture)

[Content](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/content)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create a content export

POST/accounts/{account\_id}/data-security/posture/content/export

Creates a CSV export for content and accepts optional filters in the payload.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Zero Trust Read``Zero Trust Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.casb.posture.content%20%3E%20(method)%20export%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

dlp\_profile\_information: array of object {id, entries, name }

DLP profile metadata for the export.

</summary>

id: string

Unique identifier for the DLP profile.

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

entries: array of object {id, name, profile\_id }

Entries contained within this DLP profile.

</summary>

id: string

Unique identifier for the DLP profile entry.

formatuuid

<a href="#">Link to this property</a>

name: string

Name of the DLP profile entry.

<a href="#">Link to this property</a>

profile\_id: string

ID of the parent DLP profile.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

Name of the DLP profile.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.content%20%3E%20(method)%20export%20%3E%20(params)%200%20%3E%20(param)%20dlp_profile_information%20%3E%20(schema)>)

dlp\_profile\_id: optional array of string

Filter by DLP profile IDs.

[Link to this property](#)%20zero_trust.casb.posture.content%20%3E%20(method)%20export%20%3E%20(params)%200%20%3E%20(param)%20dlp_profile_id%20%3E%20(schema)>)

integration\_id: optional array of string

Filter by integration IDs.

[Link to this property](#)%20zero_trust.casb.posture.content%20%3E%20(method)%20export%20%3E%20(params)%200%20%3E%20(param)%20integration_id%20%3E%20(schema)>)

max\_affliction\_date: optional string

Filter to view content flagged on or before this date.

formatdate-time

[Link to this property](#)%20zero_trust.casb.posture.content%20%3E%20(method)%20export%20%3E%20(params)%200%20%3E%20(param)%20max_affliction_date%20%3E%20(schema)>)

min\_affliction\_date: optional string

Filter to view content flagged on or after this date.

formatdate-time

[Link to this property](#)%20zero_trust.casb.posture.content%20%3E%20(method)%20export%20%3E%20(params)%200%20%3E%20(param)%20min_affliction_date%20%3E%20(schema)>)

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

name: "asset\_name"or "dlp\_profile\_count"or "integration\_name"or "latest\_affliction\_date"

Content-specific field names for ordering.

</summary>

One of the following:

"asset\_name"

<a href="#">Link to this property</a>

"dlp\_profile\_count"

<a href="#">Link to this property</a>

"integration\_name"

<a href="#">Link to this property</a>

"latest\_affliction\_date"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.content%20%3E%20(method)%20export%20%3E%20(params)%200%20%3E%20(param)%20orders%20%3E%20(schema)>)

search: optional string

Search term to filter content.

[Link to this property](#)%20zero_trust.casb.posture.content%20%3E%20(method)%20export%20%3E%20(params)%200%20%3E%20(param)%20search%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.casb.posture.content%20%3E%20(method)%20export%20%3E%20(params)%200%20%3E%20(param)%20vendors%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.casb.posture.content%20%3E%20(method)%20export%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.casb.posture.content%20%3E%20(method)%20export%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: boolean

Whether the API call was successful.

[Link to this property](#)%20zero_trust.casb.posture.content%20%3E%20(method)%20export%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

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

[Link to this property](#)%20zero_trust.casb.posture.content%20%3E%20(method)%20export%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Create a content export

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/data-security/posture/content/export \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "dlp_profile_information": [
            {
              "id": "e91a2360-da51-4fdf-9711-bcdecd462614",
              "entries": [
                {
                  "id": "55ba2c6c-8ef4-4b2e-9148-e75e8b6ccac1",
                  "name": "Credit Card Numbers",
                  "profile_id": "e91a2360-da51-4fdf-9711-bcdecd462614"
                }
              ],
              "name": "Financial Information"
            }
          ],
          "dlp_profile_id": [
            "e91a2360-da51-4fdf-9711-bcdecd462614"
          ],
          "integration_id": [
            "c416bc38-75dc-425f-ae25-c37b5df5c37f"
          ],
          "max_affliction_date": "2024-01-01T00:00:00Z",
          "min_affliction_date": "2023-01-01T00:00:00Z",
          "search": "sensitive",
          "vendors": [
            "GOOGLE_WORKSPACE"
          ]
        }'
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