---
title: Get a finding type
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

# Get a finding type

GET/accounts/{account\_id}/data-security/posture/findings/{finding\_id}

Gets a security Finding that has been identified as being problematic.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Zero Trust Read``Zero Trust Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

finding\_id: string

formatbyte

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20finding_id%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: boolean

Whether the API call was successful.

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, active\_count, archived\_count, 6 more }

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

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get a finding type

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/data-security/posture/findings/$FINDING_ID \
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
    "id": "MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAxOjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMgo=",
    "active_count": 5,
    "archived_count": 2,
    "finding": {
      "id": "a20895dd-9c3b-43bd-a608-71c98c6c2d94",
      "category": {
        "observation": "Issue",
        "product": "SaaS",
        "type": "Posture"
      },
      "name": "Slack File Publicly Accessible",
      "severity": "High",
      "vendor": "Google Workspace",
      "description": "This finding indicates that a file in your Slack workspace is publicly accessible.",
      "remediation": {
        "id": "a20895dd-9c3b-43bd-a608-71c98c6c2d94",
        "frameworks": [
          "SOC2",
          "ISO27001"
        ],
        "guide": "To fix this issue, update the file permissions to remove public access.",
        "impact": "Publicly accessible files may expose sensitive information.",
        "locale": "en-US",
        "threat": "Data exposure and potential compliance violations."
      }
    },
    "ignored": false,
    "instance_count": 7,
    "integration": {
      "created": "2021-08-10T20:16:11.851451Z",
      "last_hydrated": "2025-03-18T17:25:38.697894Z",
      "name": "Example integration",
      "permissions": [
        "GroupMember.Read.All",
        "Group.Read.All"
      ],
      "policy": {
        "id": "d647642e-09ac-4b34-8acc-ac30f57adc2c",
        "client_id": "client_id",
        "compliance_level": "standard",
        "dlp_enabled": true,
        "link": "https://example.com",
        "name": "Google Workspace Standard Policy",
        "permissions": [
          "https://www.googleapis.com/auth/admin.directory.domain.readonly",
          "https://www.googleapis.com/auth/admin.directory.user.readonly"
        ]
      },
      "status": "Healthy",
      "updated": "2021-08-10T20:16:11.851451Z",
      "upgradable": false,
      "vendor": {
        "id": "R09PR0xFX1dPUktTUEFDRQ==",
        "description": "Identify important security issues across your Google Workspace account ranging from shadow IT, misconfigurations, user access, and more.",
        "display_name": "Google Workspace",
        "logo": "https://cdn.vectrix-infra.com/DetectionPack_Logos/GoogleWorkspace/g.png",
        "name": "GOOGLE_WORKSPACE",
        "static_logo": "https://onprem.cloudflare.come/DetectionPack_Logos/GoogleWorkspace/g.png",
        "zt_enrollments": [
          "casb"
        ],
        "policies": [
          {
            "foo": "bar"
          }
        ]
      },
      "zt_enrollments": [
        {
          "id": "casb",
          "description": "example",
          "display_name": "Cloud Access Security Broker",
          "enabled": true
        }
      ],
      "id": "c416bc38-75dc-425f-ae25-c37b5df5c37f",
      "credential_health_status": "Healthy",
      "credentials_expiry": "2025-03-18T17:25:38.697902Z",
      "is_paused": false,
      "upgrade_dismissed": false
    },
    "latest_affliction_date": "2025-03-18T17:25:38.700131Z",
    "severity_override": {
      "created_by": "1234",
      "severity": "Critical"
    }
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
    "id": "MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAxOjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMgo=",
    "active_count": 5,
    "archived_count": 2,
    "finding": {
      "id": "a20895dd-9c3b-43bd-a608-71c98c6c2d94",
      "category": {
        "observation": "Issue",
        "product": "SaaS",
        "type": "Posture"
      },
      "name": "Slack File Publicly Accessible",
      "severity": "High",
      "vendor": "Google Workspace",
      "description": "This finding indicates that a file in your Slack workspace is publicly accessible.",
      "remediation": {
        "id": "a20895dd-9c3b-43bd-a608-71c98c6c2d94",
        "frameworks": [
          "SOC2",
          "ISO27001"
        ],
        "guide": "To fix this issue, update the file permissions to remove public access.",
        "impact": "Publicly accessible files may expose sensitive information.",
        "locale": "en-US",
        "threat": "Data exposure and potential compliance violations."
      }
    },
    "ignored": false,
    "instance_count": 7,
    "integration": {
      "created": "2021-08-10T20:16:11.851451Z",
      "last_hydrated": "2025-03-18T17:25:38.697894Z",
      "name": "Example integration",
      "permissions": [
        "GroupMember.Read.All",
        "Group.Read.All"
      ],
      "policy": {
        "id": "d647642e-09ac-4b34-8acc-ac30f57adc2c",
        "client_id": "client_id",
        "compliance_level": "standard",
        "dlp_enabled": true,
        "link": "https://example.com",
        "name": "Google Workspace Standard Policy",
        "permissions": [
          "https://www.googleapis.com/auth/admin.directory.domain.readonly",
          "https://www.googleapis.com/auth/admin.directory.user.readonly"
        ]
      },
      "status": "Healthy",
      "updated": "2021-08-10T20:16:11.851451Z",
      "upgradable": false,
      "vendor": {
        "id": "R09PR0xFX1dPUktTUEFDRQ==",
        "description": "Identify important security issues across your Google Workspace account ranging from shadow IT, misconfigurations, user access, and more.",
        "display_name": "Google Workspace",
        "logo": "https://cdn.vectrix-infra.com/DetectionPack_Logos/GoogleWorkspace/g.png",
        "name": "GOOGLE_WORKSPACE",
        "static_logo": "https://onprem.cloudflare.come/DetectionPack_Logos/GoogleWorkspace/g.png",
        "zt_enrollments": [
          "casb"
        ],
        "policies": [
          {
            "foo": "bar"
          }
        ]
      },
      "zt_enrollments": [
        {
          "id": "casb",
          "description": "example",
          "display_name": "Cloud Access Security Broker",
          "enabled": true
        }
      ],
      "id": "c416bc38-75dc-425f-ae25-c37b5df5c37f",
      "credential_health_status": "Healthy",
      "credentials_expiry": "2025-03-18T17:25:38.697902Z",
      "is_paused": false,
      "upgrade_dismissed": false
    },
    "latest_affliction_date": "2025-03-18T17:25:38.700131Z",
    "severity_override": {
      "created_by": "1234",
      "severity": "Critical"
    }
  }
}
```