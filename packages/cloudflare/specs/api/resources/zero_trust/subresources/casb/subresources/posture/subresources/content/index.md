---
title: Content
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

# Content

##### [List DLP content findings](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/content/methods/list)

GET/accounts/{account\_id}/data-security/posture/content

##### [Create a content export](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/content/methods/export)

POST/accounts/{account\_id}/data-security/posture/content/export

##### ModelsExpand Collapse

<details>

<summary>

ContentListResponse object {asset\_id, asset\_name, dlp\_contexts, 4 more }

Content asset with DLP information.

</summary>

asset\_id: string

Unique identifier for the asset.

formatuuid

<a href="#">Link to this property</a>

asset\_name: string

Name of the asset.

<a href="#">Link to this property</a>

<details>

<summary>

dlp\_contexts: array of object {created, entry\_ids, profile\_id, 6 more }

DLP context information for this asset.

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

dlp\_profile\_count: number

Number of DLP profiles that flagged this asset.

<a href="#">Link to this property</a>

dlp\_profile\_ids: array of string

IDs of DLP profiles that flagged this asset.

<a href="#">Link to this property</a>

<details>

<summary>

integration: object {created, last\_hydrated, name, 12 more }

Summary information about an integration.

</summary>

created: string

When entity was created.

formatdate-time

<a href="#">Link to this property</a>

last\_hydrated: string

When were the integration credentials last updated.

formatdate-time

<a href="#">Link to this property</a>

name: string

Name of the integration.

maxLength256

<a href="#">Link to this property</a>

permissions: array of string

The vendor-specific permissions associated with the integration.

<a href="#">Link to this property</a>

<details>

<summary>

policy: object {id, client\_id, compliance\_level, 4 more }

Policy configuration for an integration.

</summary>

id: optional string

Policy identifier.

formatuuid

<a href="#">Link to this property</a>

client\_id: optional string

OAuth client ID for the policy.

<a href="#">Link to this property</a>

compliance\_level: optional string

Compliance level for the policy.

<a href="#">Link to this property</a>

dlp\_enabled: optional boolean

Whether DLP is enabled for this policy.

<a href="#">Link to this property</a>

link: optional string

Link to policy documentation.

formaturi

<a href="#">Link to this property</a>

name: optional string

Policy name.

<a href="#">Link to this property</a>

permissions: optional array of string

List of permissions included in the policy.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

status: string

Current status of the integration.

<a href="#">Link to this property</a>

updated: string

Last entity was updated.

formatdate-time

<a href="#">Link to this property</a>

upgradable: boolean

Whether the integrations permissions can be updated.

<a href="#">Link to this property</a>

<details>

<summary>

vendor: object {id, description, display\_name, 5 more }

Information about a vendor/service provider.

</summary>

id: string

The id of the vendor.

<a href="#">Link to this property</a>

description: string

Detailed information about what kinds of issues are detected for this vendor.

<a href="#">Link to this property</a>

display\_name: string

The display name of the vendor.

<a href="#">Link to this property</a>

logo: string

Logo URL for the vendor.

formaturi

<a href="#">Link to this property</a>

name: string

The name of the vendor.

<a href="#">Link to this property</a>

static\_logo: string

Static logo URL for the vendor.

formaturi

<a href="#">Link to this property</a>

zt\_enrollments: array of string

The vendor’s compatible Zero Trust products.

<a href="#">Link to this property</a>

policies: optional array of map\[unknown]

The policies related to the vendor.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

zt\_enrollments: array of object {id, description, display\_name, enabled }

Zero Trust products associated with this integration.

</summary>

id: optional string

The internal identifier of the Zero Trust Product.

<a href="#">Link to this property</a>

description: optional string

Brief description of the Zero Trust Product.

<a href="#">Link to this property</a>

display\_name: optional string

The verbose name of the Zero Trust Product.

<a href="#">Link to this property</a>

enabled: optional boolean

Flag to enable/disable access to the listed integration from the corresponding Cloudflare product.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

id: optional string

Integration ID.

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

credential\_health\_status: optional "Initializing"or "Healthy"or "Unhealthy"

Health status of integration credentials.

</summary>

One of the following:

"Initializing"

<a href="#">Link to this property</a>

"Healthy"

<a href="#">Link to this property</a>

"Unhealthy"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

credentials\_expiry: optional string

The date and time when the integration credentials will expire.

formatdate-time

<a href="#">Link to this property</a>

is\_paused: optional boolean

Whether the given integration is paused by the user.

<a href="#">Link to this property</a>

upgrade\_dismissed: optional boolean

UI State as to whether a potential permissions upgrade has been dismissed.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

latest\_affliction\_date: string

Most recent date this asset was flagged.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.content%20%3E%20(model)%20content_list_response%20%3E%20(schema)>)

<details>

<summary>

ContentExportResponse object {id, status, type, 5 more }

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

[Link to this property](#)%20zero_trust.casb.posture.content%20%3E%20(model)%20content_export_response%20%3E%20(schema)>)