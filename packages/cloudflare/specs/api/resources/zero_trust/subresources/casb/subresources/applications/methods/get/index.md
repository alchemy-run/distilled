---
title: Get application details
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Casb](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb)

[Applications](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/applications)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get application details

GET/accounts/{account\_id}/one/applications/{application\_id}

Returns full application details including auth methods, use cases, and permissions.

##### Security

<details>

<summary>API Token</summary>



The preferred authorization scheme for interacting with the Cloudflare API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/create-token/">Create a token</a>.

**Example:**<code>Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY</code>

</details>

<details>

<summary>API Email + API Key</summary>



The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**<code>X-Auth-Email: user@example.com</code>

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**<code>X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194</code>

</details>

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.casb.applications%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

<details>

<summary>

application\_id: "ANTHROPIC"or "AWS"or "BITBUCKET"or 12 more

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

[Link to this property](#)%20zero_trust.casb.applications%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20application_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {id, auth\_methods, category, 6 more }

The requested item.

</summary>

<details>

<summary>

id: "ANTHROPIC"or "AWS"or "BITBUCKET"or 12 more

Vendor identifier.

- <code>ANTHROPIC</code> - ANTHROPIC
- <code>AWS</code> - AWS
- <code>BITBUCKET</code> - BITBUCKET
- <code>BOX</code> - BOX
- <code>CONFLUENCE</code> - CONFLUENCE
- <code>DROPBOX</code> - DROPBOX
- <code>GITHUB</code> - GITHUB
- <code>GOOGLE_CLOUD_PLATFORM</code> - GOOGLE\_CLOUD\_PLATFORM
- <code>GOOGLE_WORKSPACE</code> - GOOGLE\_WORKSPACE
- <code>JIRA</code> - JIRA
- <code>MICROSOFT_INTERNAL</code> - MICROSOFT\_INTERNAL
- <code>OPENAI</code> - OPENAI
- <code>SALESFORCE</code> - SALESFORCE
- <code>SERVICENOW</code> - SERVICENOW
- <code>SLACK</code> - SLACK

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

<a href="#">Link to this property</a>

<details>

<summary>

auth\_methods: array of object {id, display\_name, is\_default, supported\_environments }

Available authentication methods.

</summary>

id: string

Auth method identifier.

<a href="#">Link to this property</a>

display\_name: string

Human-readable auth method name.

<a href="#">Link to this property</a>

is\_default: boolean

Whether this is the default auth method.

<a href="#">Link to this property</a>

supported\_environments: array of string

Environments this auth method supports.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

category: string

Vendor category.

<a href="#">Link to this property</a>

description: string

Brief description.

<a href="#">Link to this property</a>

display\_name: string

Human-readable vendor name.

<a href="#">Link to this property</a>

dlp\_enabled: boolean

Whether DLP scanning is supported.

<a href="#">Link to this property</a>

instructions: string

Setup instructions for the user.

<a href="#">Link to this property</a>

logo: string

Logo path.

<a href="#">Link to this property</a>

<details>

<summary>

use\_cases: array of object {id, base\_scopes, description, 2 more }

Use cases with full scope details.

</summary>

id: string

Use case identifier.

<a href="#">Link to this property</a>

<details>

<summary>

base\_scopes: array of object {display\_name, scope, severity }

Scopes always required for this use case.

</summary>

display\_name: string

Human-readable permission name.

<a href="#">Link to this property</a>

scope: string

Vendor-native scope identifier.

<a href="#">Link to this property</a>

<details>

<summary>

severity: "low"or "medium"or "high"or "critical"

Permission sensitivity level.

- <code>low</code> - low
- <code>medium</code> - medium
- <code>high</code> - high
- <code>critical</code> - critical

</summary>

One of the following:

"low"

<a href="#">Link to this property</a>

"medium"

<a href="#">Link to this property</a>

"high"

<a href="#">Link to this property</a>

"critical"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

description: string

Use case description.

<a href="#">Link to this property</a>

display\_name: string

Human-readable use case name.

<a href="#">Link to this property</a>

<details>

<summary>

features: array of object {id, description, display\_name, scopes }

Optional features with extra scopes.

</summary>

id: string

Feature identifier.

<a href="#">Link to this property</a>

description: string

Feature description.

<a href="#">Link to this property</a>

display\_name: string

Human-readable feature name.

<a href="#">Link to this property</a>

<details>

<summary>

scopes: array of object {display\_name, scope, severity }

Additional scopes when feature is enabled.

</summary>

display\_name: string

Human-readable permission name.

<a href="#">Link to this property</a>

scope: string

Vendor-native scope identifier.

<a href="#">Link to this property</a>

<details>

<summary>

severity: "low"or "medium"or "high"or "critical"

Permission sensitivity level.

- <code>low</code> - low
- <code>medium</code> - medium
- <code>high</code> - high
- <code>critical</code> - critical

</summary>

One of the following:

"low"

<a href="#">Link to this property</a>

"medium"

<a href="#">Link to this property</a>

"high"

<a href="#">Link to this property</a>

"critical"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.applications%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

Whether the request succeeded.

[Link to this property](#)%20zero_trust.casb.applications%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

errors: optional array of map\[unknown]

List of errors.

[Link to this property](#)%20zero_trust.casb.applications%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: optional array of string

List of messages.

[Link to this property](#)%20zero_trust.casb.applications%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

### Get application details

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/one/applications/$APPLICATION_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [],
  "messages": [],
  "result": {
    "auth_methods": [
      {
        "display_name": "OAuth 2.0 Admin Consent",
        "id": "oauth2",
        "is_default": true,
        "supported_environments": [
          "standard",
          "fedramp"
        ]
      }
    ],
    "category": "Productivity",
    "description": "Monitor OneDrive, SharePoint, Teams, and Outlook.",
    "display_name": "Microsoft",
    "dlp_enabled": true,
    "id": "MICROSOFT_INTERNAL",
    "instructions": "You'll need a Microsoft 365 admin account with Global Admin or Application Admin role.",
    "logo": "https://dash.cloudflare.com/v2/static/microsoft_internal.svg",
    "use_cases": [
      {
        "base_scopes": [
          {
            "display_name": "Read all users' full profiles",
            "scope": "User.Read.All",
            "severity": "high"
          },
          {
            "display_name": "Read all files",
            "scope": "Files.Read.All",
            "severity": "high"
          }
        ],
        "description": "Discover and secure SaaS applications",
        "display_name": "Cloud Access Security Broker",
        "features": [
          {
            "description": "Automatically remediate security issues",
            "display_name": "Auto Remediation",
            "id": "auto_remediation",
            "scopes": [
              {
                "display_name": "Read and write all files",
                "scope": "Files.ReadWrite.All",
                "severity": "critical"
              }
            ]
          }
        ],
        "id": "casb"
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
  "errors": [],
  "messages": [],
  "result": {
    "auth_methods": [
      {
        "display_name": "OAuth 2.0 Admin Consent",
        "id": "oauth2",
        "is_default": true,
        "supported_environments": [
          "standard",
          "fedramp"
        ]
      }
    ],
    "category": "Productivity",
    "description": "Monitor OneDrive, SharePoint, Teams, and Outlook.",
    "display_name": "Microsoft",
    "dlp_enabled": true,
    "id": "MICROSOFT_INTERNAL",
    "instructions": "You'll need a Microsoft 365 admin account with Global Admin or Application Admin role.",
    "logo": "https://dash.cloudflare.com/v2/static/microsoft_internal.svg",
    "use_cases": [
      {
        "base_scopes": [
          {
            "display_name": "Read all users' full profiles",
            "scope": "User.Read.All",
            "severity": "high"
          },
          {
            "display_name": "Read all files",
            "scope": "Files.Read.All",
            "severity": "high"
          }
        ],
        "description": "Discover and secure SaaS applications",
        "display_name": "Cloud Access Security Broker",
        "features": [
          {
            "description": "Automatically remediate security issues",
            "display_name": "Auto Remediation",
            "id": "auto_remediation",
            "scopes": [
              {
                "display_name": "Read and write all files",
                "scope": "Files.ReadWrite.All",
                "severity": "critical"
              }
            ]
          }
        ],
        "id": "casb"
      }
    ]
  },
  "success": true
}
```