---
title: Findings
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

# Findings

##### [List posture findings](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/findings/methods/list)

GET/accounts/{account\_id}/data-security/posture/findings

##### [Get a finding type](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/findings/methods/get)

GET/accounts/{account\_id}/data-security/posture/findings/{finding\_id}

##### [Create new findings export request](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/findings/methods/export)

POST/accounts/{account\_id}/data-security/posture/findings/export

##### [Mark a finding as ignored](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/findings/methods/ignore)

POST/accounts/{account\_id}/data-security/posture/findings/ignore

##### [Remove ignore marker from a finding](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/findings/methods/unignore)

POST/accounts/{account\_id}/data-security/posture/findings/unignore

##### [Update the severity for a finding](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/findings/methods/tune_severity)

POST/accounts/{account\_id}/data-security/posture/findings/{finding\_id}/tune\_finding\_severity

##### [Reset severity for a finding back to the default](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/posture/subresources/findings/methods/reset_severity)

POST/accounts/{account\_id}/data-security/posture/findings/{finding\_id}/reset\_finding\_severity

##### ModelsExpand Collapse

<details>

<summary>

FindingListResponse object {id, active\_count, archived\_count, 6 more }

Aggregated finding information with counts and metadata. This is optimized for list API queries and represents a finding along with its instance statistics.

</summary>

id: string

Base64 encoded identifier of the security finding.

formatbyte

<a href="#">Link to this property</a>

active\_count: number

Number of active problematic instances identified in the security finding.

<a href="#">Link to this property</a>

archived\_count: number

Number of archived instances identified in the security finding.

<a href="#">Link to this property</a>

<details>

<summary>

finding: object {id, category, name, 4 more }

Basic finding type information.

</summary>

id: string

The unique identifier of the finding.

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

category: object {observation, product, type }

Category information for a finding.

</summary>

<details>

<summary>

observation: "Issue"or "Insight"or "Activity"

The type of the observation.

</summary>

One of the following:

"Issue"

<a href="#">Link to this property</a>

"Insight"

<a href="#">Link to this property</a>

"Activity"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

product: "SaaS"or "Cloud"

The product category.

</summary>

One of the following:

"SaaS"

<a href="#">Link to this property</a>

"Cloud"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: "Content"or "Posture"

The type of the finding category.

</summary>

One of the following:

"Content"

<a href="#">Link to this property</a>

"Posture"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

The name of the finding.

<a href="#">Link to this property</a>

<details>

<summary>

severity: "Critical"or "High"or "Medium"or "Low"

The severity level of a finding.

</summary>

One of the following:

"Critical"

<a href="#">Link to this property</a>

"High"

<a href="#">Link to this property</a>

"Medium"

<a href="#">Link to this property</a>

"Low"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

vendor: string

The SaaS/Cloud vendor of the platform with which the finding is associated.

<a href="#">Link to this property</a>

description: optional string

Detailed description of the finding.

<a href="#">Link to this property</a>

<details>

<summary>

remediation: optional object {id, frameworks, guide, 3 more }

Remediation guide information for a finding.

</summary>

id: string

Remediation Id.

formatuuid

<a href="#">Link to this property</a>

frameworks: array of string

Relevant Compliance Frameworks.

<a href="#">Link to this property</a>

guide: string

Remediation guide text.

<a href="#">Link to this property</a>

impact: string

Description of the potential impact.

<a href="#">Link to this property</a>

locale: string

I18N Locale.

<a href="#">Link to this property</a>

threat: string

Description of the threat.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ignored: boolean

Determines if finding is currently ignored.

<a href="#">Link to this property</a>

instance\_count: number

Number of total (Active or archived) problematic instances identified in the security finding.

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

Timestamp of the latest affliction date of an active finding.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

severity\_override: optional object {created\_by, severity }

Override information for finding severity.

</summary>

created\_by: string

User ID who created the override.

<a href="#">Link to this property</a>

<details>

<summary>

severity: "Critical"or "High"or "Medium"or "Low"

The severity level of a finding.

</summary>

One of the following:

"Critical"

<a href="#">Link to this property</a>

"High"

<a href="#">Link to this property</a>

"Medium"

<a href="#">Link to this property</a>

"Low"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(model)%20finding_list_response%20%3E%20(schema)>)

<details>

<summary>

FindingGetResponse object {id, active\_count, archived\_count, 6 more }

Aggregated finding information with counts and metadata. This is optimized for list API queries and represents a finding along with its instance statistics.

</summary>

id: string

Base64 encoded identifier of the security finding.

formatbyte

<a href="#">Link to this property</a>

active\_count: number

Number of active problematic instances identified in the security finding.

<a href="#">Link to this property</a>

archived\_count: number

Number of archived instances identified in the security finding.

<a href="#">Link to this property</a>

<details>

<summary>

finding: object {id, category, name, 4 more }

Basic finding type information.

</summary>

id: string

The unique identifier of the finding.

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

category: object {observation, product, type }

Category information for a finding.

</summary>

<details>

<summary>

observation: "Issue"or "Insight"or "Activity"

The type of the observation.

</summary>

One of the following:

"Issue"

<a href="#">Link to this property</a>

"Insight"

<a href="#">Link to this property</a>

"Activity"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

product: "SaaS"or "Cloud"

The product category.

</summary>

One of the following:

"SaaS"

<a href="#">Link to this property</a>

"Cloud"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: "Content"or "Posture"

The type of the finding category.

</summary>

One of the following:

"Content"

<a href="#">Link to this property</a>

"Posture"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

The name of the finding.

<a href="#">Link to this property</a>

<details>

<summary>

severity: "Critical"or "High"or "Medium"or "Low"

The severity level of a finding.

</summary>

One of the following:

"Critical"

<a href="#">Link to this property</a>

"High"

<a href="#">Link to this property</a>

"Medium"

<a href="#">Link to this property</a>

"Low"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

vendor: string

The SaaS/Cloud vendor of the platform with which the finding is associated.

<a href="#">Link to this property</a>

description: optional string

Detailed description of the finding.

<a href="#">Link to this property</a>

<details>

<summary>

remediation: optional object {id, frameworks, guide, 3 more }

Remediation guide information for a finding.

</summary>

id: string

Remediation Id.

formatuuid

<a href="#">Link to this property</a>

frameworks: array of string

Relevant Compliance Frameworks.

<a href="#">Link to this property</a>

guide: string

Remediation guide text.

<a href="#">Link to this property</a>

impact: string

Description of the potential impact.

<a href="#">Link to this property</a>

locale: string

I18N Locale.

<a href="#">Link to this property</a>

threat: string

Description of the threat.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ignored: boolean

Determines if finding is currently ignored.

<a href="#">Link to this property</a>

instance\_count: number

Number of total (Active or archived) problematic instances identified in the security finding.

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

Timestamp of the latest affliction date of an active finding.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

severity\_override: optional object {created\_by, severity }

Override information for finding severity.

</summary>

created\_by: string

User ID who created the override.

<a href="#">Link to this property</a>

<details>

<summary>

severity: "Critical"or "High"or "Medium"or "Low"

The severity level of a finding.

</summary>

One of the following:

"Critical"

<a href="#">Link to this property</a>

"High"

<a href="#">Link to this property</a>

"Medium"

<a href="#">Link to this property</a>

"Low"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(model)%20finding_get_response%20%3E%20(schema)>)

<details>

<summary>

FindingExportResponse object {id, status, type, 5 more }

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

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(model)%20finding_export_response%20%3E%20(schema)>)

<details>

<summary>

FindingIgnoreResponse object {id, active\_count, archived\_count, 6 more }

Aggregated finding information with counts and metadata. This is optimized for list API queries and represents a finding along with its instance statistics.

</summary>

id: string

Base64 encoded identifier of the security finding.

formatbyte

<a href="#">Link to this property</a>

active\_count: number

Number of active problematic instances identified in the security finding.

<a href="#">Link to this property</a>

archived\_count: number

Number of archived instances identified in the security finding.

<a href="#">Link to this property</a>

<details>

<summary>

finding: object {id, category, name, 4 more }

Basic finding type information.

</summary>

id: string

The unique identifier of the finding.

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

category: object {observation, product, type }

Category information for a finding.

</summary>

<details>

<summary>

observation: "Issue"or "Insight"or "Activity"

The type of the observation.

</summary>

One of the following:

"Issue"

<a href="#">Link to this property</a>

"Insight"

<a href="#">Link to this property</a>

"Activity"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

product: "SaaS"or "Cloud"

The product category.

</summary>

One of the following:

"SaaS"

<a href="#">Link to this property</a>

"Cloud"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: "Content"or "Posture"

The type of the finding category.

</summary>

One of the following:

"Content"

<a href="#">Link to this property</a>

"Posture"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

The name of the finding.

<a href="#">Link to this property</a>

<details>

<summary>

severity: "Critical"or "High"or "Medium"or "Low"

The severity level of a finding.

</summary>

One of the following:

"Critical"

<a href="#">Link to this property</a>

"High"

<a href="#">Link to this property</a>

"Medium"

<a href="#">Link to this property</a>

"Low"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

vendor: string

The SaaS/Cloud vendor of the platform with which the finding is associated.

<a href="#">Link to this property</a>

description: optional string

Detailed description of the finding.

<a href="#">Link to this property</a>

<details>

<summary>

remediation: optional object {id, frameworks, guide, 3 more }

Remediation guide information for a finding.

</summary>

id: string

Remediation Id.

formatuuid

<a href="#">Link to this property</a>

frameworks: array of string

Relevant Compliance Frameworks.

<a href="#">Link to this property</a>

guide: string

Remediation guide text.

<a href="#">Link to this property</a>

impact: string

Description of the potential impact.

<a href="#">Link to this property</a>

locale: string

I18N Locale.

<a href="#">Link to this property</a>

threat: string

Description of the threat.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ignored: boolean

Determines if finding is currently ignored.

<a href="#">Link to this property</a>

instance\_count: number

Number of total (Active or archived) problematic instances identified in the security finding.

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

Timestamp of the latest affliction date of an active finding.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

severity\_override: optional object {created\_by, severity }

Override information for finding severity.

</summary>

created\_by: string

User ID who created the override.

<a href="#">Link to this property</a>

<details>

<summary>

severity: "Critical"or "High"or "Medium"or "Low"

The severity level of a finding.

</summary>

One of the following:

"Critical"

<a href="#">Link to this property</a>

"High"

<a href="#">Link to this property</a>

"Medium"

<a href="#">Link to this property</a>

"Low"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(model)%20finding_ignore_response%20%3E%20(schema)>)

<details>

<summary>

FindingUnignoreResponse object {id, active\_count, archived\_count, 6 more }

Aggregated finding information with counts and metadata. This is optimized for list API queries and represents a finding along with its instance statistics.

</summary>

id: string

Base64 encoded identifier of the security finding.

formatbyte

<a href="#">Link to this property</a>

active\_count: number

Number of active problematic instances identified in the security finding.

<a href="#">Link to this property</a>

archived\_count: number

Number of archived instances identified in the security finding.

<a href="#">Link to this property</a>

<details>

<summary>

finding: object {id, category, name, 4 more }

Basic finding type information.

</summary>

id: string

The unique identifier of the finding.

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

category: object {observation, product, type }

Category information for a finding.

</summary>

<details>

<summary>

observation: "Issue"or "Insight"or "Activity"

The type of the observation.

</summary>

One of the following:

"Issue"

<a href="#">Link to this property</a>

"Insight"

<a href="#">Link to this property</a>

"Activity"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

product: "SaaS"or "Cloud"

The product category.

</summary>

One of the following:

"SaaS"

<a href="#">Link to this property</a>

"Cloud"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: "Content"or "Posture"

The type of the finding category.

</summary>

One of the following:

"Content"

<a href="#">Link to this property</a>

"Posture"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

The name of the finding.

<a href="#">Link to this property</a>

<details>

<summary>

severity: "Critical"or "High"or "Medium"or "Low"

The severity level of a finding.

</summary>

One of the following:

"Critical"

<a href="#">Link to this property</a>

"High"

<a href="#">Link to this property</a>

"Medium"

<a href="#">Link to this property</a>

"Low"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

vendor: string

The SaaS/Cloud vendor of the platform with which the finding is associated.

<a href="#">Link to this property</a>

description: optional string

Detailed description of the finding.

<a href="#">Link to this property</a>

<details>

<summary>

remediation: optional object {id, frameworks, guide, 3 more }

Remediation guide information for a finding.

</summary>

id: string

Remediation Id.

formatuuid

<a href="#">Link to this property</a>

frameworks: array of string

Relevant Compliance Frameworks.

<a href="#">Link to this property</a>

guide: string

Remediation guide text.

<a href="#">Link to this property</a>

impact: string

Description of the potential impact.

<a href="#">Link to this property</a>

locale: string

I18N Locale.

<a href="#">Link to this property</a>

threat: string

Description of the threat.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ignored: boolean

Determines if finding is currently ignored.

<a href="#">Link to this property</a>

instance\_count: number

Number of total (Active or archived) problematic instances identified in the security finding.

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

Timestamp of the latest affliction date of an active finding.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

severity\_override: optional object {created\_by, severity }

Override information for finding severity.

</summary>

created\_by: string

User ID who created the override.

<a href="#">Link to this property</a>

<details>

<summary>

severity: "Critical"or "High"or "Medium"or "Low"

The severity level of a finding.

</summary>

One of the following:

"Critical"

<a href="#">Link to this property</a>

"High"

<a href="#">Link to this property</a>

"Medium"

<a href="#">Link to this property</a>

"Low"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(model)%20finding_unignore_response%20%3E%20(schema)>)

<details>

<summary>

FindingTuneSeverityResponse object {id, active\_count, archived\_count, 6 more }

Aggregated finding information with counts and metadata. This is optimized for list API queries and represents a finding along with its instance statistics.

</summary>

id: string

Base64 encoded identifier of the security finding.

formatbyte

<a href="#">Link to this property</a>

active\_count: number

Number of active problematic instances identified in the security finding.

<a href="#">Link to this property</a>

archived\_count: number

Number of archived instances identified in the security finding.

<a href="#">Link to this property</a>

<details>

<summary>

finding: object {id, category, name, 4 more }

Basic finding type information.

</summary>

id: string

The unique identifier of the finding.

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

category: object {observation, product, type }

Category information for a finding.

</summary>

<details>

<summary>

observation: "Issue"or "Insight"or "Activity"

The type of the observation.

</summary>

One of the following:

"Issue"

<a href="#">Link to this property</a>

"Insight"

<a href="#">Link to this property</a>

"Activity"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

product: "SaaS"or "Cloud"

The product category.

</summary>

One of the following:

"SaaS"

<a href="#">Link to this property</a>

"Cloud"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: "Content"or "Posture"

The type of the finding category.

</summary>

One of the following:

"Content"

<a href="#">Link to this property</a>

"Posture"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

The name of the finding.

<a href="#">Link to this property</a>

<details>

<summary>

severity: "Critical"or "High"or "Medium"or "Low"

The severity level of a finding.

</summary>

One of the following:

"Critical"

<a href="#">Link to this property</a>

"High"

<a href="#">Link to this property</a>

"Medium"

<a href="#">Link to this property</a>

"Low"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

vendor: string

The SaaS/Cloud vendor of the platform with which the finding is associated.

<a href="#">Link to this property</a>

description: optional string

Detailed description of the finding.

<a href="#">Link to this property</a>

<details>

<summary>

remediation: optional object {id, frameworks, guide, 3 more }

Remediation guide information for a finding.

</summary>

id: string

Remediation Id.

formatuuid

<a href="#">Link to this property</a>

frameworks: array of string

Relevant Compliance Frameworks.

<a href="#">Link to this property</a>

guide: string

Remediation guide text.

<a href="#">Link to this property</a>

impact: string

Description of the potential impact.

<a href="#">Link to this property</a>

locale: string

I18N Locale.

<a href="#">Link to this property</a>

threat: string

Description of the threat.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ignored: boolean

Determines if finding is currently ignored.

<a href="#">Link to this property</a>

instance\_count: number

Number of total (Active or archived) problematic instances identified in the security finding.

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

Timestamp of the latest affliction date of an active finding.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

severity\_override: optional object {created\_by, severity }

Override information for finding severity.

</summary>

created\_by: string

User ID who created the override.

<a href="#">Link to this property</a>

<details>

<summary>

severity: "Critical"or "High"or "Medium"or "Low"

The severity level of a finding.

</summary>

One of the following:

"Critical"

<a href="#">Link to this property</a>

"High"

<a href="#">Link to this property</a>

"Medium"

<a href="#">Link to this property</a>

"Low"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(model)%20finding_tune_severity_response%20%3E%20(schema)>)

<details>

<summary>

FindingResetSeverityResponse object {id, active\_count, archived\_count, 6 more }

Aggregated finding information with counts and metadata. This is optimized for list API queries and represents a finding along with its instance statistics.

</summary>

id: string

Base64 encoded identifier of the security finding.

formatbyte

<a href="#">Link to this property</a>

active\_count: number

Number of active problematic instances identified in the security finding.

<a href="#">Link to this property</a>

archived\_count: number

Number of archived instances identified in the security finding.

<a href="#">Link to this property</a>

<details>

<summary>

finding: object {id, category, name, 4 more }

Basic finding type information.

</summary>

id: string

The unique identifier of the finding.

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

category: object {observation, product, type }

Category information for a finding.

</summary>

<details>

<summary>

observation: "Issue"or "Insight"or "Activity"

The type of the observation.

</summary>

One of the following:

"Issue"

<a href="#">Link to this property</a>

"Insight"

<a href="#">Link to this property</a>

"Activity"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

product: "SaaS"or "Cloud"

The product category.

</summary>

One of the following:

"SaaS"

<a href="#">Link to this property</a>

"Cloud"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: "Content"or "Posture"

The type of the finding category.

</summary>

One of the following:

"Content"

<a href="#">Link to this property</a>

"Posture"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

The name of the finding.

<a href="#">Link to this property</a>

<details>

<summary>

severity: "Critical"or "High"or "Medium"or "Low"

The severity level of a finding.

</summary>

One of the following:

"Critical"

<a href="#">Link to this property</a>

"High"

<a href="#">Link to this property</a>

"Medium"

<a href="#">Link to this property</a>

"Low"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

vendor: string

The SaaS/Cloud vendor of the platform with which the finding is associated.

<a href="#">Link to this property</a>

description: optional string

Detailed description of the finding.

<a href="#">Link to this property</a>

<details>

<summary>

remediation: optional object {id, frameworks, guide, 3 more }

Remediation guide information for a finding.

</summary>

id: string

Remediation Id.

formatuuid

<a href="#">Link to this property</a>

frameworks: array of string

Relevant Compliance Frameworks.

<a href="#">Link to this property</a>

guide: string

Remediation guide text.

<a href="#">Link to this property</a>

impact: string

Description of the potential impact.

<a href="#">Link to this property</a>

locale: string

I18N Locale.

<a href="#">Link to this property</a>

threat: string

Description of the threat.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ignored: boolean

Determines if finding is currently ignored.

<a href="#">Link to this property</a>

instance\_count: number

Number of total (Active or archived) problematic instances identified in the security finding.

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

Timestamp of the latest affliction date of an active finding.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

severity\_override: optional object {created\_by, severity }

Override information for finding severity.

</summary>

created\_by: string

User ID who created the override.

<a href="#">Link to this property</a>

<details>

<summary>

severity: "Critical"or "High"or "Medium"or "Low"

The severity level of a finding.

</summary>

One of the following:

"Critical"

<a href="#">Link to this property</a>

"High"

<a href="#">Link to this property</a>

"Medium"

<a href="#">Link to this property</a>

"Low"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(model)%20finding_reset_severity_response%20%3E%20(schema)>)

#### FindingsInstances

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