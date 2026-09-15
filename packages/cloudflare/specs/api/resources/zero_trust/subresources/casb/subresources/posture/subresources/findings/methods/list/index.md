---
title: List posture findings
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

# List posture findings

GET/accounts/{account\_id}/data-security/posture/findings

List all security findings that have been identified as being problematic. This will return a list of findings regardless if they have been ignored or not.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Zero Trust Read``Zero Trust Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

cursor: optional string

A cursor for pagination. Obtained from the `result_info.cursor` field of a previous response.

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20cursor%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

finding\_type\_ids: optional string

A comma separated list of UUIDs identifying the finding type(s).

formatuuid

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20finding_type_ids%20%3E%20(schema)>)

ignored: optional boolean

Filter for only the ignored findings. Set to false to only see “active” items

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20ignored%20%3E%20(schema)>)

integration\_id: optional string

Filter by an integration ID

formatuuid

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20integration_id%20%3E%20(schema)>)

max\_affliction\_date: optional string

Filter to view findings that occurred on or before the affliction date. Can be a date-time in ISO 8601 format or an epoch timestamp.

formatdate-time

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20max_affliction_date%20%3E%20(schema)>)

min\_affliction\_date: optional string

Filter to view findings that occurred on or after the affliction date. Can be a date-time in ISO 8601 format or an epoch timestamp.

formatdate-time

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20min_affliction_date%20%3E%20(schema)>)

<details>

<summary>

observation: optional "Activity"or "Insight"or "Issue"

Filter by observation type of the finding

</summary>

One of the following:

"Activity"

<a href="#">Link to this property</a>

"Insight"

<a href="#">Link to this property</a>

"Issue"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20observation%20%3E%20(schema)>)

<details>

<summary>

order: optional "finding.name"or "instance\_count"or "integration.name"or 2 more

Which field to use when ordering the findings.

</summary>

One of the following:

"finding.name"

<a href="#">Link to this property</a>

"instance\_count"

<a href="#">Link to this property</a>

"integration.name"

<a href="#">Link to this property</a>

"latest\_affliction\_date"

<a href="#">Link to this property</a>

"severity"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order%20%3E%20(schema)>)

page: optional number

A page number within the paginated result set.

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Number of results to return per page.

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

<details>

<summary>

product: optional "Cloud"or "Saas"

Filter by product category of the finding

</summary>

One of the following:

"Cloud"

<a href="#">Link to this property</a>

"Saas"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20product%20%3E%20(schema)>)

search: optional string

A search term.

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20search%20%3E%20(schema)>)

<details>

<summary>

severity: optional "Critical"or "High"or "Medium"or "Low"

Filter by severity

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

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20severity%20%3E%20(schema)>)

<details>

<summary>

type: optional "Content"or "Posture"

Filter by type of the finding

</summary>

One of the following:

"Content"

<a href="#">Link to this property</a>

"Posture"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20type%20%3E%20(schema)>)

<details>

<summary>

vendor: optional "ANTHROPIC"or "AWS"or "BITBUCKET"or 13 more

Filter by vendor

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

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20vendor%20%3E%20(schema)>)

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

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result\_info: object {count, cursor, next, 4 more }

Pagination and result information.

</summary>

count: optional number

Total number of results for the requested service.

<a href="#">Link to this property</a>

cursor: optional string

Cursor for cursor-based pagination.

<a href="#">Link to this property</a>

next: optional string

URL to the next page of results.

formaturi

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page of results.

<a href="#">Link to this property</a>

previous: optional string

URL to the previous page of results.

formaturi

<a href="#">Link to this property</a>

total\_count: optional number

Total results available without any search parameters.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

success: boolean

Whether the API call was successful.

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of object {id, active\_count, archived\_count, 6 more }

Array of finding objects.

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

[Link to this property](#)%20zero_trust.casb.posture.findings%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### List posture findings

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/data-security/posture/findings \
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
  "result_info": {
    "count": 1,
    "cursor": "eyJpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsImFmZmxpY3Rpb25fZGF0ZSI6IjE5NzAtMDEtMDFUMDA6MDA6MDAuMDAwMDAwWiJ9",
    "next": "https://example.com",
    "page": 1,
    "per_page": 20,
    "previous": "https://example.com",
    "total_count": 2000
  },
  "success": true,
  "result": [
    {
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
  ]
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
  "result_info": {
    "count": 1,
    "cursor": "eyJpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsImFmZmxpY3Rpb25fZGF0ZSI6IjE5NzAtMDEtMDFUMDA6MDA6MDAuMDAwMDAwWiJ9",
    "next": "https://example.com",
    "page": 1,
    "per_page": 20,
    "previous": "https://example.com",
    "total_count": 2000
  },
  "success": true,
  "result": [
    {
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
  ]
}
```