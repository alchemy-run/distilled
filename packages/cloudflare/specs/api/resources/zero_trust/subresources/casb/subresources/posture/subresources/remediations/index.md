---
title: Remediations
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Casb](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb)

[Posture](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Remediations

#### RemediationsJobs

##### [List remediation jobs](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/remediations/subresources/jobs/methods/list)

GET/accounts/{account\_id}/data-security/posture/remediations/jobs

##### [Creates remediation jobs](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/remediations/subresources/jobs/methods/create)

POST/accounts/{account\_id}/data-security/posture/remediations/jobs

##### [Create a remediation jobs export](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/remediations/subresources/jobs/methods/export)

POST/accounts/{account\_id}/data-security/posture/remediations/jobs/export

##### ModelsExpand Collapse

<details>

<summary>

JobListResponse object {id, asset, created\_at, 11 more }

Information about a remediation job.

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

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(model)%20job_list_response%20%3E%20(schema)>)

<details>

<summary>

JobCreateResponse object {created, failed }

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

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(model)%20job_create_response%20%3E%20(schema)>)

<details>

<summary>

JobExportResponse object {id, status, type, 5 more }

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

[Link to this property](#)%20zero_trust.casb.posture.remediations.jobs%20%3E%20(model)%20job_export_response%20%3E%20(schema)>)