---
title: Instances
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

# Instances

##### [List instances of a finding](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/findings/subresources/instances/methods/list)

GET/accounts/{account\_id}/data-security/posture/findings/{finding\_id}/instances

##### [Get a finding instance using an instance ID](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/findings/subresources/instances/methods/get)

GET/accounts/{account\_id}/data-security/posture/findings/{finding\_id}/instances/{instance\_id}

##### [Create a finding instances export](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/findings/subresources/instances/methods/export)

POST/accounts/{account\_id}/data-security/posture/findings/{storage\_namespace\_id}/instances/export

##### [Archive a finding](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/findings/subresources/instances/methods/archive)

POST/accounts/{account\_id}/data-security/posture/findings/{finding\_id}/instances/archive

##### [Remove the archive marking from a finding instance](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/findings/subresources/instances/methods/unarchive)

POST/accounts/{account\_id}/data-security/posture/findings/{finding\_id}/instances/unarchive

##### ModelsExpand Collapse

<details>

<summary>

InstanceListResponse object {affliction\_date, asset, dlp\_contexts, 4 more }

A specific instance of a security finding. In the API interface, we refer to the ‘finding’ table in our DB as finding instances, optimized for the p99 use case.

</summary>

affliction\_date: string

When this specific instance was identified.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

asset: object {category, external\_id, fields, 3 more }

Asset information including metadata and categorization.

</summary>

<details>

<summary>

category: object {service, type, vendor, id }

Category information for an asset.

</summary>

service: string

The specific service within the vendor the asset is part of (often none). Example - AWS is the vendor, S3 is the service.

<a href="#">Link to this property</a>

type: string

The type of asset.

<a href="#">Link to this property</a>

vendor: string

The vendor the asset is part of.

<a href="#">Link to this property</a>

id: optional string

Unique identifier for the asset category.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

external\_id: string

External identifier from the source system.

maxLength512

<a href="#">Link to this property</a>

<details>

<summary>

fields: array of object {name, value, link }

The fields associated with the asset.

</summary>

name: string

The name of the field.

<a href="#">Link to this property</a>

value: string

The value of the field.

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

id: optional string

Unique identifier for the asset.

formatuuid

<a href="#">Link to this property</a>

link: optional string

Direct link to the asset.

formaturi

maxLength2048

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

dlp\_contexts: array of object {created, entry\_ids, profile\_id, 6 more }

DLP context information if this is a content finding.

</summary>

created: string

When the DLP context was created.

formatdate-time

<a href="#">Link to this property</a>

entry\_ids: array of string

DLP Entry IDs.

<a href="#">Link to this property</a>

profile\_id: string

DLP Profile ID.

formatuuid

<a href="#">Link to this property</a>

updated: string

When the DLP context was last updated.

formatdate-time

<a href="#">Link to this property</a>

id: optional string

Unique identifier for the DLP context.

formatuuid

<a href="#">Link to this property</a>

deleted: optional string

When the DLP context was deleted.

formatdate-time

<a href="#">Link to this property</a>

match\_context\_max\_extent: optional number

DLP Right Boundary of match context.

maximum2147483647

minimum0

<a href="#">Link to this property</a>

match\_context\_min\_extent: optional number

DLP Left Boundary of match context.

maximum2147483647

minimum0

<a href="#">Link to this property</a>

match\_context\_payload: optional map\[unknown]

DLP Match context payload that matched the profile in question.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

remediations: array of object {id, created\_at, stale, status }

A list of the 10 most recent remediation jobs for this finding instance, ordered by creation time (most recent first). The ‘stale’ field indicates whether the remediation job was created before the finding instance’s affliction\_date (true) or after it (false). If there has never been a remediation job for this finding instance, this field will be an empty array.

</summary>

id: string

Unique identifier for the remediation job.

formatuuid

<a href="#">Link to this property</a>

created\_at: string

When the remediation job was created.

formatdate-time

<a href="#">Link to this property</a>

stale: boolean

Whether this remediation job is stale (created before the finding instance’s affliction\_date).

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

</details>

<a href="#">Link to this property</a>

<details>

<summary>

webhooks: array of object {latest\_job, webhook\_id, webhook\_label }

The most recent webhook job invocation for each webhook configuration associated with this finding instance. Each entry represents the latest job (any status) per webhook config. The ‘stale’ field indicates whether the job was invoked before the finding instance’s current affliction\_date. If no webhook jobs have been created, this field will be an empty array.

</summary>

<details>

<summary>

latest\_job: object {id, created\_at, stale, status }

The most recent webhook job for this webhook configuration.

</summary>

id: string

Unique identifier for the webhook job.

formatuuid

<a href="#">Link to this property</a>

created\_at: string

When the webhook job was created.

formatdate-time

<a href="#">Link to this property</a>

stale: boolean

Whether this webhook job is stale (created before the finding instance’s current affliction\_date).

<a href="#">Link to this property</a>

<details>

<summary>

status: "pending"or "processing"or "completed"

Current status of the webhook job.

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"processing"

<a href="#">Link to this property</a>

"completed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

webhook\_id: string

Unique identifier for the webhook configuration.

formatuuid

<a href="#">Link to this property</a>

webhook\_label: string

Account-specified display label for the webhook configuration.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

id: optional string

Unique identifier for the finding instance.

formatuuid

<a href="#">Link to this property</a>

is\_archived: optional boolean

Whether this finding instance has been archived.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.findings.instances%20%3E%20(model)%20instance_list_response%20%3E%20(schema)>)

<details>

<summary>

InstanceGetResponse object {affliction\_date, asset, dlp\_contexts, 4 more }

A specific instance of a security finding. In the API interface, we refer to the ‘finding’ table in our DB as finding instances, optimized for the p99 use case.

</summary>

affliction\_date: string

When this specific instance was identified.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

asset: object {category, external\_id, fields, 3 more }

Asset information including metadata and categorization.

</summary>

<details>

<summary>

category: object {service, type, vendor, id }

Category information for an asset.

</summary>

service: string

The specific service within the vendor the asset is part of (often none). Example - AWS is the vendor, S3 is the service.

<a href="#">Link to this property</a>

type: string

The type of asset.

<a href="#">Link to this property</a>

vendor: string

The vendor the asset is part of.

<a href="#">Link to this property</a>

id: optional string

Unique identifier for the asset category.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

external\_id: string

External identifier from the source system.

maxLength512

<a href="#">Link to this property</a>

<details>

<summary>

fields: array of object {name, value, link }

The fields associated with the asset.

</summary>

name: string

The name of the field.

<a href="#">Link to this property</a>

value: string

The value of the field.

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

id: optional string

Unique identifier for the asset.

formatuuid

<a href="#">Link to this property</a>

link: optional string

Direct link to the asset.

formaturi

maxLength2048

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

dlp\_contexts: array of object {created, entry\_ids, profile\_id, 6 more }

DLP context information if this is a content finding.

</summary>

created: string

When the DLP context was created.

formatdate-time

<a href="#">Link to this property</a>

entry\_ids: array of string

DLP Entry IDs.

<a href="#">Link to this property</a>

profile\_id: string

DLP Profile ID.

formatuuid

<a href="#">Link to this property</a>

updated: string

When the DLP context was last updated.

formatdate-time

<a href="#">Link to this property</a>

id: optional string

Unique identifier for the DLP context.

formatuuid

<a href="#">Link to this property</a>

deleted: optional string

When the DLP context was deleted.

formatdate-time

<a href="#">Link to this property</a>

match\_context\_max\_extent: optional number

DLP Right Boundary of match context.

maximum2147483647

minimum0

<a href="#">Link to this property</a>

match\_context\_min\_extent: optional number

DLP Left Boundary of match context.

maximum2147483647

minimum0

<a href="#">Link to this property</a>

match\_context\_payload: optional map\[unknown]

DLP Match context payload that matched the profile in question.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

remediations: array of object {id, created\_at, stale, status }

A list of the 10 most recent remediation jobs for this finding instance, ordered by creation time (most recent first). The ‘stale’ field indicates whether the remediation job was created before the finding instance’s affliction\_date (true) or after it (false). If there has never been a remediation job for this finding instance, this field will be an empty array.

</summary>

id: string

Unique identifier for the remediation job.

formatuuid

<a href="#">Link to this property</a>

created\_at: string

When the remediation job was created.

formatdate-time

<a href="#">Link to this property</a>

stale: boolean

Whether this remediation job is stale (created before the finding instance’s affliction\_date).

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

</details>

<a href="#">Link to this property</a>

<details>

<summary>

webhooks: array of object {latest\_job, webhook\_id, webhook\_label }

The most recent webhook job invocation for each webhook configuration associated with this finding instance. Each entry represents the latest job (any status) per webhook config. The ‘stale’ field indicates whether the job was invoked before the finding instance’s current affliction\_date. If no webhook jobs have been created, this field will be an empty array.

</summary>

<details>

<summary>

latest\_job: object {id, created\_at, stale, status }

The most recent webhook job for this webhook configuration.

</summary>

id: string

Unique identifier for the webhook job.

formatuuid

<a href="#">Link to this property</a>

created\_at: string

When the webhook job was created.

formatdate-time

<a href="#">Link to this property</a>

stale: boolean

Whether this webhook job is stale (created before the finding instance’s current affliction\_date).

<a href="#">Link to this property</a>

<details>

<summary>

status: "pending"or "processing"or "completed"

Current status of the webhook job.

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"processing"

<a href="#">Link to this property</a>

"completed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

webhook\_id: string

Unique identifier for the webhook configuration.

formatuuid

<a href="#">Link to this property</a>

webhook\_label: string

Account-specified display label for the webhook configuration.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

id: optional string

Unique identifier for the finding instance.

formatuuid

<a href="#">Link to this property</a>

is\_archived: optional boolean

Whether this finding instance has been archived.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.findings.instances%20%3E%20(model)%20instance_get_response%20%3E%20(schema)>)

<details>

<summary>

InstanceExportResponse object {id, status, type, 5 more }

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

[Link to this property](#)%20zero_trust.casb.posture.findings.instances%20%3E%20(model)%20instance_export_response%20%3E%20(schema)>)

<details>

<summary>

InstanceArchiveResponse object {affliction\_date, asset, dlp\_contexts, 4 more }

A specific instance of a security finding. In the API interface, we refer to the ‘finding’ table in our DB as finding instances, optimized for the p99 use case.

</summary>

affliction\_date: string

When this specific instance was identified.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

asset: object {category, external\_id, fields, 3 more }

Asset information including metadata and categorization.

</summary>

<details>

<summary>

category: object {service, type, vendor, id }

Category information for an asset.

</summary>

service: string

The specific service within the vendor the asset is part of (often none). Example - AWS is the vendor, S3 is the service.

<a href="#">Link to this property</a>

type: string

The type of asset.

<a href="#">Link to this property</a>

vendor: string

The vendor the asset is part of.

<a href="#">Link to this property</a>

id: optional string

Unique identifier for the asset category.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

external\_id: string

External identifier from the source system.

maxLength512

<a href="#">Link to this property</a>

<details>

<summary>

fields: array of object {name, value, link }

The fields associated with the asset.

</summary>

name: string

The name of the field.

<a href="#">Link to this property</a>

value: string

The value of the field.

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

id: optional string

Unique identifier for the asset.

formatuuid

<a href="#">Link to this property</a>

link: optional string

Direct link to the asset.

formaturi

maxLength2048

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

dlp\_contexts: array of object {created, entry\_ids, profile\_id, 6 more }

DLP context information if this is a content finding.

</summary>

created: string

When the DLP context was created.

formatdate-time

<a href="#">Link to this property</a>

entry\_ids: array of string

DLP Entry IDs.

<a href="#">Link to this property</a>

profile\_id: string

DLP Profile ID.

formatuuid

<a href="#">Link to this property</a>

updated: string

When the DLP context was last updated.

formatdate-time

<a href="#">Link to this property</a>

id: optional string

Unique identifier for the DLP context.

formatuuid

<a href="#">Link to this property</a>

deleted: optional string

When the DLP context was deleted.

formatdate-time

<a href="#">Link to this property</a>

match\_context\_max\_extent: optional number

DLP Right Boundary of match context.

maximum2147483647

minimum0

<a href="#">Link to this property</a>

match\_context\_min\_extent: optional number

DLP Left Boundary of match context.

maximum2147483647

minimum0

<a href="#">Link to this property</a>

match\_context\_payload: optional map\[unknown]

DLP Match context payload that matched the profile in question.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

remediations: array of object {id, created\_at, stale, status }

A list of the 10 most recent remediation jobs for this finding instance, ordered by creation time (most recent first). The ‘stale’ field indicates whether the remediation job was created before the finding instance’s affliction\_date (true) or after it (false). If there has never been a remediation job for this finding instance, this field will be an empty array.

</summary>

id: string

Unique identifier for the remediation job.

formatuuid

<a href="#">Link to this property</a>

created\_at: string

When the remediation job was created.

formatdate-time

<a href="#">Link to this property</a>

stale: boolean

Whether this remediation job is stale (created before the finding instance’s affliction\_date).

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

</details>

<a href="#">Link to this property</a>

<details>

<summary>

webhooks: array of object {latest\_job, webhook\_id, webhook\_label }

The most recent webhook job invocation for each webhook configuration associated with this finding instance. Each entry represents the latest job (any status) per webhook config. The ‘stale’ field indicates whether the job was invoked before the finding instance’s current affliction\_date. If no webhook jobs have been created, this field will be an empty array.

</summary>

<details>

<summary>

latest\_job: object {id, created\_at, stale, status }

The most recent webhook job for this webhook configuration.

</summary>

id: string

Unique identifier for the webhook job.

formatuuid

<a href="#">Link to this property</a>

created\_at: string

When the webhook job was created.

formatdate-time

<a href="#">Link to this property</a>

stale: boolean

Whether this webhook job is stale (created before the finding instance’s current affliction\_date).

<a href="#">Link to this property</a>

<details>

<summary>

status: "pending"or "processing"or "completed"

Current status of the webhook job.

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"processing"

<a href="#">Link to this property</a>

"completed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

webhook\_id: string

Unique identifier for the webhook configuration.

formatuuid

<a href="#">Link to this property</a>

webhook\_label: string

Account-specified display label for the webhook configuration.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

id: optional string

Unique identifier for the finding instance.

formatuuid

<a href="#">Link to this property</a>

is\_archived: optional boolean

Whether this finding instance has been archived.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.findings.instances%20%3E%20(model)%20instance_archive_response%20%3E%20(schema)>)

<details>

<summary>

InstanceUnarchiveResponse object {affliction\_date, asset, dlp\_contexts, 4 more }

A specific instance of a security finding. In the API interface, we refer to the ‘finding’ table in our DB as finding instances, optimized for the p99 use case.

</summary>

affliction\_date: string

When this specific instance was identified.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

asset: object {category, external\_id, fields, 3 more }

Asset information including metadata and categorization.

</summary>

<details>

<summary>

category: object {service, type, vendor, id }

Category information for an asset.

</summary>

service: string

The specific service within the vendor the asset is part of (often none). Example - AWS is the vendor, S3 is the service.

<a href="#">Link to this property</a>

type: string

The type of asset.

<a href="#">Link to this property</a>

vendor: string

The vendor the asset is part of.

<a href="#">Link to this property</a>

id: optional string

Unique identifier for the asset category.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

external\_id: string

External identifier from the source system.

maxLength512

<a href="#">Link to this property</a>

<details>

<summary>

fields: array of object {name, value, link }

The fields associated with the asset.

</summary>

name: string

The name of the field.

<a href="#">Link to this property</a>

value: string

The value of the field.

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

id: optional string

Unique identifier for the asset.

formatuuid

<a href="#">Link to this property</a>

link: optional string

Direct link to the asset.

formaturi

maxLength2048

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

dlp\_contexts: array of object {created, entry\_ids, profile\_id, 6 more }

DLP context information if this is a content finding.

</summary>

created: string

When the DLP context was created.

formatdate-time

<a href="#">Link to this property</a>

entry\_ids: array of string

DLP Entry IDs.

<a href="#">Link to this property</a>

profile\_id: string

DLP Profile ID.

formatuuid

<a href="#">Link to this property</a>

updated: string

When the DLP context was last updated.

formatdate-time

<a href="#">Link to this property</a>

id: optional string

Unique identifier for the DLP context.

formatuuid

<a href="#">Link to this property</a>

deleted: optional string

When the DLP context was deleted.

formatdate-time

<a href="#">Link to this property</a>

match\_context\_max\_extent: optional number

DLP Right Boundary of match context.

maximum2147483647

minimum0

<a href="#">Link to this property</a>

match\_context\_min\_extent: optional number

DLP Left Boundary of match context.

maximum2147483647

minimum0

<a href="#">Link to this property</a>

match\_context\_payload: optional map\[unknown]

DLP Match context payload that matched the profile in question.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

remediations: array of object {id, created\_at, stale, status }

A list of the 10 most recent remediation jobs for this finding instance, ordered by creation time (most recent first). The ‘stale’ field indicates whether the remediation job was created before the finding instance’s affliction\_date (true) or after it (false). If there has never been a remediation job for this finding instance, this field will be an empty array.

</summary>

id: string

Unique identifier for the remediation job.

formatuuid

<a href="#">Link to this property</a>

created\_at: string

When the remediation job was created.

formatdate-time

<a href="#">Link to this property</a>

stale: boolean

Whether this remediation job is stale (created before the finding instance’s affliction\_date).

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

</details>

<a href="#">Link to this property</a>

<details>

<summary>

webhooks: array of object {latest\_job, webhook\_id, webhook\_label }

The most recent webhook job invocation for each webhook configuration associated with this finding instance. Each entry represents the latest job (any status) per webhook config. The ‘stale’ field indicates whether the job was invoked before the finding instance’s current affliction\_date. If no webhook jobs have been created, this field will be an empty array.

</summary>

<details>

<summary>

latest\_job: object {id, created\_at, stale, status }

The most recent webhook job for this webhook configuration.

</summary>

id: string

Unique identifier for the webhook job.

formatuuid

<a href="#">Link to this property</a>

created\_at: string

When the webhook job was created.

formatdate-time

<a href="#">Link to this property</a>

stale: boolean

Whether this webhook job is stale (created before the finding instance’s current affliction\_date).

<a href="#">Link to this property</a>

<details>

<summary>

status: "pending"or "processing"or "completed"

Current status of the webhook job.

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"processing"

<a href="#">Link to this property</a>

"completed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

webhook\_id: string

Unique identifier for the webhook configuration.

formatuuid

<a href="#">Link to this property</a>

webhook\_label: string

Account-specified display label for the webhook configuration.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

id: optional string

Unique identifier for the finding instance.

formatuuid

<a href="#">Link to this property</a>

is\_archived: optional boolean

Whether this finding instance has been archived.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.findings.instances%20%3E%20(model)%20instance_unarchive_response%20%3E%20(schema)>)