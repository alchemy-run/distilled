---
title: List applications
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

# List applications

GET/accounts/{account\_id}/one/applications

Returns a list of available applications with use cases and permissions.

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

[Link to this property](#)%20zero_trust.casb.applications%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

environment: optional string

Filter by supported environment (standard, fedramp).

[Link to this property](#)%20zero_trust.casb.applications%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20environment%20%3E%20(schema)>)

page: optional number

A page number within the paginated result set.

[Link to this property](#)%20zero_trust.casb.applications%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

page\_size: optional number

Number of results to return per page.

[Link to this property](#)%20zero_trust.casb.applications%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page_size%20%3E%20(schema)>)

##### ReturnsExpand Collapse

errors: array of unknown

List of errors.

[Link to this property](#)%20zero_trust.casb.applications%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: array of string

List of messages.

[Link to this property](#)%20zero_trust.casb.applications%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {id, auth\_methods, category, 7 more }

List of items.

</summary>

<details>

<summary>

id: "ANTHROPIC"or "AWS"or "BITBUCKET"or 12 more

Vendor identifier (e.g. microsoft\_internal, google\_workspace).

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

auth\_methods: array of object {id, display\_name }

Available auth methods.

</summary>

id: string

Auth method identifier.

<a href="#">Link to this property</a>

display\_name: string

Human-readable auth method name.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

category: string

Vendor category (e.g. Productivity, AI).

<a href="#">Link to this property</a>

description: string

Brief description of the integration.

<a href="#">Link to this property</a>

display\_name: string

Human-readable vendor name.

<a href="#">Link to this property</a>

dlp\_enabled: boolean

Whether DLP scanning is supported.

<a href="#">Link to this property</a>

logo: string

Logo path.

<a href="#">Link to this property</a>

<details>

<summary>

permissions: array of object {display\_name, scope, severity }

All permissions with severity.

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

supported\_environments: array of string

Environments this vendor supports (standard, fedramp).

<a href="#">Link to this property</a>

<details>

<summary>

use\_cases: array of object {id, display\_name }

Supported use cases.

</summary>

id: string

Use case identifier (e.g. casb, ces).

<a href="#">Link to this property</a>

display\_name: string

Human-readable use case name.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.applications%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: object {count, next, page, 3 more }

Pagination metadata.

</summary>

count: optional number

Number of items in current page.

<a href="#">Link to this property</a>

next: optional string

URL for next page.

formaturi

<a href="#">Link to this property</a>

page: optional number

Current page number.

<a href="#">Link to this property</a>

per\_page: optional number

Number of items per page.

<a href="#">Link to this property</a>

previous: optional string

URL for previous page.

formaturi

<a href="#">Link to this property</a>

total\_count: optional number

Total number of items.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.applications%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

success: boolean

Whether the request succeeded.

[Link to this property](#)%20zero_trust.casb.applications%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### List applications

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/one/applications \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [],
  "messages": [],
  "result": [
    {
      "auth_methods": [
        {
          "display_name": "OAuth 2.0 Admin Consent",
          "id": "oauth2_standard"
        }
      ],
      "category": "Productivity",
      "description": "Monitor OneDrive, SharePoint, Teams, and Outlook.",
      "display_name": "Microsoft",
      "dlp_enabled": true,
      "id": "MICROSOFT_INTERNAL",
      "logo": "https://dash.cloudflare.com/v2/static/microsoft_internal.svg",
      "permissions": [
        {
          "display_name": "Read all users' full profiles",
          "scope": "User.Read.All",
          "severity": "high"
        },
        {
          "display_name": "Read all files",
          "scope": "Files.Read.All",
          "severity": "high"
        },
        {
          "display_name": "Read and write mail",
          "scope": "Mail.ReadWrite",
          "severity": "critical"
        }
      ],
      "supported_environments": [
        "standard",
        "fedramp"
      ],
      "use_cases": [
        {
          "display_name": "Cloud Access Security Broker",
          "id": "casb"
        },
        {
          "display_name": "Cloud Email Security",
          "id": "ces"
        }
      ]
    }
  ],
  "result_info": {
    "count": 1,
    "next": null,
    "page": 1,
    "per_page": 10,
    "previous": null,
    "total_count": 1
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
  "result": [
    {
      "auth_methods": [
        {
          "display_name": "OAuth 2.0 Admin Consent",
          "id": "oauth2_standard"
        }
      ],
      "category": "Productivity",
      "description": "Monitor OneDrive, SharePoint, Teams, and Outlook.",
      "display_name": "Microsoft",
      "dlp_enabled": true,
      "id": "MICROSOFT_INTERNAL",
      "logo": "https://dash.cloudflare.com/v2/static/microsoft_internal.svg",
      "permissions": [
        {
          "display_name": "Read all users' full profiles",
          "scope": "User.Read.All",
          "severity": "high"
        },
        {
          "display_name": "Read all files",
          "scope": "Files.Read.All",
          "severity": "high"
        },
        {
          "display_name": "Read and write mail",
          "scope": "Mail.ReadWrite",
          "severity": "critical"
        }
      ],
      "supported_environments": [
        "standard",
        "fedramp"
      ],
      "use_cases": [
        {
          "display_name": "Cloud Access Security Broker",
          "id": "casb"
        },
        {
          "display_name": "Cloud Email Security",
          "id": "ces"
        }
      ]
    }
  ],
  "result_info": {
    "count": 1,
    "next": null,
    "page": 1,
    "per_page": 10,
    "previous": null,
    "total_count": 1
  },
  "success": true
}
```