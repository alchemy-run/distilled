---
title: Creates remediation jobs
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

# Creates remediation jobs

POST/accounts/{account\_id}/data-security/posture/remediations/jobs

Create one or more remediation jobs tied to a specific Cloudflare Account.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Zero Trust Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

finding\_instance\_ids: array of string

UUIDs identifying Finding Instances.

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20finding_instance_ids%20%3E%20(schema)>)

remediation\_type\_id: string

A UUID identifying this Remediation Type.

formatuuid

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20remediation_type_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

errors: array of unknown

Array of error messages.

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of unknown

Array of informational messages.

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {created, failed }

</summary>

<details>

<summary>

created: array of object {id, asset, created\_at, 11 more }

Successfully created remediation jobs.

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

<a href="#">Link to this property</a>

<details>

<summary>

failed: array of object {error, finding\_instance\_id }

Failed remediation job creation attempts.

</summary>

error: string

Error message describing the failure.

<a href="#">Link to this property</a>

finding\_instance\_id: string

ID of the finding instance that failed to create a remediation job.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

Whether the API call was successful.

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Creates remediation jobs

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/data-security/posture/remediations/jobs \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "finding_instance_ids": [
            "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
          ],
          "remediation_type_id": "5a7d9e2f-1b3c-4d5e-8f6a-7b8c9d0e1f2a"
        }'
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
  "result": {
    "created": [
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
    "failed": [
      {
        "error": "Failed to create remediation job",
        "finding_instance_id": "2e6b4c8a-9d1f-4e3b-8c7a-5f9e2d1a6b4c"
      }
    ]
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
  "result": {
    "created": [
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
    "failed": [
      {
        "error": "Failed to create remediation job",
        "finding_instance_id": "2e6b4c8a-9d1f-4e3b-8c7a-5f9e2d1a6b4c"
      }
    ]
  },
  "success": true
}
```