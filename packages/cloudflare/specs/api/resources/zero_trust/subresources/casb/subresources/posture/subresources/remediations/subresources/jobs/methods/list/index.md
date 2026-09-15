---
title: List remediation jobs
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

# List remediation jobs

GET/accounts/{account\_id}/data-security/posture/remediations/jobs

List all remediation jobs tied to a specific Cloudflare Account. Note that `cursor` and `page` are mutually exclusive.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Zero Trust Read``Zero Trust Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

cursor: optional string

A cursor for pagination.

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20cursor%20%3E%20(schema)>)

<details>

<summary>

direction: optional "asc"or "desc"

Direction to order results.

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

integration\_id: optional string

Filter by an integration ID

formatuuid

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20integration_id%20%3E%20(schema)>)

max\_updated\_at: optional string

Filter to view remediations updated on or before the max updated datetime. Can be a date-time in ISO 8601 format or an epoch timestamp.

formatdate-time

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20max_updated_at%20%3E%20(schema)>)

min\_updated\_at: optional string

Filter to view remediations updated on or after the min updated datetime. Can be a date-time in ISO 8601 format or an epoch timestamp.

formatdate-time

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20min_updated_at%20%3E%20(schema)>)

<details>

<summary>

order: optional "created\_at"or "affliction\_date"or "integration\_name"or 4 more

An optional param to sort the results by the given field.

</summary>

One of the following:

"created\_at"

<a href="#">Link to this property</a>

"affliction\_date"

<a href="#">Link to this property</a>

"integration\_name"

<a href="#">Link to this property</a>

"status"

<a href="#">Link to this property</a>

"last\_updated\_at"

<a href="#">Link to this property</a>

"asset\_name"

<a href="#">Link to this property</a>

"finding\_type\_name"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order%20%3E%20(schema)>)

page: optional number

A page number within the paginated result set.

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Number of results to return per page.

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

search: optional string

A search term.

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20search%20%3E%20(schema)>)

<details>

<summary>

status: optional "pending"or "processing"or "completed"or 2 more

Filter to view remediations with the given status.

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

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20status%20%3E%20(schema)>)

<details>

<summary>

triggered\_by\_actor: optional array of "user"or "account\_token"

Filter remediations by what kind of actor triggered them. Supports multiple comma-separated values.

</summary>

One of the following:

"user"

<a href="#">Link to this property</a>

"account\_token"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20triggered_by_actor%20%3E%20(schema)>)

##### ReturnsExpand Collapse

errors: array of unknown

Array of error messages.

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of unknown

Array of informational messages.

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {id, asset, created\_at, 11 more }

Array of remediation job objects.

</summary>

id: string

Unique identifier for the remediation job.

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

asset: object {id, category, external\_id, 3 more }

Asset information for a remediation job.

</summary>

id: string

Unique identifier for the asset.

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

category: object {service, type, vendor }

Category information for a remediation job asset.

</summary>

service: string

Specific service within the vendor.

<a href="#">Link to this property</a>

type: string

Asset type.

<a href="#">Link to this property</a>

<details>

<summary>

vendor: "AWS"or "Anthropic"or "Bitbucket"or 16 more

Display names for vendor types.

</summary>

One of the following:

"AWS"

<a href="#">Link to this property</a>

"Anthropic"

<a href="#">Link to this property</a>

"Bitbucket"

<a href="#">Link to this property</a>

"Box"

<a href="#">Link to this property</a>

"Confluence"

<a href="#">Link to this property</a>

"Dropbox"

<a href="#">Link to this property</a>

"GitHub"

<a href="#">Link to this property</a>

"Google Cloud Platform"

<a href="#">Link to this property</a>

"Google Workspace"

<a href="#">Link to this property</a>

"Jira"

<a href="#">Link to this property</a>

"Microsoft"

<a href="#">Link to this property</a>

"Microsoft Internal"

<a href="#">Link to this property</a>

"Okta"

<a href="#">Link to this property</a>

"OpenAI"

<a href="#">Link to this property</a>

"Slack"

<a href="#">Link to this property</a>

"Salesforce"

<a href="#">Link to this property</a>

"ServiceNow"

<a href="#">Link to this property</a>

"Workday"

<a href="#">Link to this property</a>

"Zoom"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

external\_id: string

External identifier from the source system.

<a href="#">Link to this property</a>

<details>

<summary>

fields: array of object {name, value, link }

Additional fields associated with the asset.

</summary>

name: string

Field name.

<a href="#">Link to this property</a>

<details>

<summary>

value: stringor numberor boolean

Field value (can be string, number, or boolean).

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

link: optional string

Optional link associated with the field.

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

Human-readable name of the asset.

<a href="#">Link to this property</a>

link: optional string

Direct link to the asset.

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: string

When the remediation job was created.

formatdate-time

<a href="#">Link to this property</a>

finding\_id: string

Encoded finding ID.

<a href="#">Link to this property</a>

finding\_instance\_id: string

ID of the finding instance being remediated.

formatuuid

<a href="#">Link to this property</a>

finding\_type\_id: string

ID of the finding type.

formatuuid

<a href="#">Link to this property</a>

finding\_type\_name: string

Name of the finding type.

<a href="#">Link to this property</a>

integration\_name: string

Name of the integration.

<a href="#">Link to this property</a>

last\_updated: string

When the remediation job was last updated.

formatdate-time

<a href="#">Link to this property</a>

remediation\_type: string

Type of remediation being performed.

<a href="#">Link to this property</a>

<details>

<summary>

status: "pending"or "processing"or "completed"or 2 more

Status of a remediation job.

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

<a href="#">Link to this property</a>

triggered\_by\_user: string

Email of the user who triggered the remediation. For account-token actors this is the literal “Account API Token”; for policy actors this is empty.

<a href="#">Link to this property</a>

<details>

<summary>

triggered\_by\_actor: optional "user"or "account\_token"

Type of actor that triggered the remediation job. Null on legacy rows created before this column was populated.

</summary>

One of the following:

"user"

<a href="#">Link to this property</a>

"account\_token"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

triggered\_by\_id: optional string

ID of the actor that triggered the job. Meaning depends on triggered\_by\_actor. Null on legacy rows.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: object {count, cursor, page, 2 more }

</summary>

count: optional number

Number of results on current page.

<a href="#">Link to this property</a>

cursor: optional string

Cursor for pagination.

<a href="#">Link to this property</a>

page: optional number

Current page number.

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page.

<a href="#">Link to this property</a>

total\_count: optional number

Total number of results.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

success: boolean

Whether the API call was successful.

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List remediation jobs

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/data-security/posture/remediations/jobs \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [
    {}
  ],
  "messages": [
    {}
  ],
  "result": [
    {
      "id": "c416bc38-75db-425f-ae25-c37b5df5c37f",
      "asset": {
        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "category": {
          "service": "OneDrive",
          "type": "SaaS",
          "vendor": "Google Workspace"
        },
        "external_id": "c416bc38-75db-425f-ae25-c37b5df5c37f",
        "fields": [
          {
            "name": "File Name",
            "value": "sensitive-document.xlsx",
            "link": "https://dashboard.microsoft.com/files/details"
          }
        ],
        "name": "Microsoft File Publicly Accessible",
        "link": "https://dashboard.microsoft.com/files/details"
      },
      "created_at": "2025-07-07T18:39:13.123456Z",
      "finding_id": "MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAxOjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMgo=",
      "finding_instance_id": "3f7b8c9d-6e5a-4f3b-9c2d-1e0a8b7c6d5e",
      "finding_type_id": "775c5f38-efcf-4b2b-93db-8428979eb6a2",
      "finding_type_name": "Microsoft: File publicly accessible with edit access",
      "integration_name": "Microsoft",
      "last_updated": "2025-07-07T18:39:13.123456Z",
      "remediation_type": "Remove publicly accessible edit url",
      "status": "pending",
      "triggered_by_user": "user@example.com",
      "triggered_by_actor": "user",
      "triggered_by_id": "0123456789abcdef0123456789abcdef"
    }
  ],
  "result_info": {
    "count": 2,
    "cursor": "next_cursor_value",
    "page": 1,
    "per_page": 10,
    "total_count": 2
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {}
  ],
  "messages": [
    {}
  ],
  "result": [
    {
      "id": "c416bc38-75db-425f-ae25-c37b5df5c37f",
      "asset": {
        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "category": {
          "service": "OneDrive",
          "type": "SaaS",
          "vendor": "Google Workspace"
        },
        "external_id": "c416bc38-75db-425f-ae25-c37b5df5c37f",
        "fields": [
          {
            "name": "File Name",
            "value": "sensitive-document.xlsx",
            "link": "https://dashboard.microsoft.com/files/details"
          }
        ],
        "name": "Microsoft File Publicly Accessible",
        "link": "https://dashboard.microsoft.com/files/details"
      },
      "created_at": "2025-07-07T18:39:13.123456Z",
      "finding_id": "MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAxOjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMgo=",
      "finding_instance_id": "3f7b8c9d-6e5a-4f3b-9c2d-1e0a8b7c6d5e",
      "finding_type_id": "775c5f38-efcf-4b2b-93db-8428979eb6a2",
      "finding_type_name": "Microsoft: File publicly accessible with edit access",
      "integration_name": "Microsoft",
      "last_updated": "2025-07-07T18:39:13.123456Z",
      "remediation_type": "Remove publicly accessible edit url",
      "status": "pending",
      "triggered_by_user": "user@example.com",
      "triggered_by_actor": "user",
      "triggered_by_id": "0123456789abcdef0123456789abcdef"
    }
  ],
  "result_info": {
    "count": 2,
    "cursor": "next_cursor_value",
    "page": 1,
    "per_page": 10,
    "total_count": 2
  },
  "success": true
}
```