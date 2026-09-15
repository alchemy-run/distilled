---
title: Resume integration
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Casb](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb)

[Integrations](https://developers.cloudflare.com/api/resources/zero_trust/subresources/casb/subresources/integrations)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Resume integration

POST/accounts/{account\_id}/one/integrations/{id}/resume

Resumes a paused integration, restarting crawlers.

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

[Link to this property](#)%20zero_trust.casb.integrations%20%3E%20(method)%20resume%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

id: string

[Link to this property](#)%20zero_trust.casb.integrations%20%3E%20(method)%20resume%20%3E%20(params)%20default%20%3E%20(param)%20id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {id, application, auth\_method, 11 more }

The requested item.

</summary>

id: string

Integration ID.

formatuuid

<a href="#">Link to this property</a>

application: map\[string]

<a href="#">Link to this property</a>

auth\_method: map\[string]

The integration’s authentication method.

<a href="#">Link to this property</a>

<details>

<summary>

authorization\_link: object {components, link }

Authorization link for the integration.

</summary>

components: map\[unknown]

<a href="#">Link to this property</a>

link: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created: string

When the integration was created.

formatdate-time

<a href="#">Link to this property</a>

credentials\_expiry: string

Credentials expiry time.

formatdate-time

<a href="#">Link to this property</a>

dlp\_profiles: array of string

DLP Profiles enabled for the integration.

<a href="#">Link to this property</a>

health\_details: array of map\[unknown]

Health details with remediation hints.

<a href="#">Link to this property</a>

is\_paused: boolean

Whether the user paused the integration.

<a href="#">Link to this property</a>

last\_hydrated: string

Last time the integration was hydrated.

formatdate-time

<a href="#">Link to this property</a>

name: string

Name of the integration.

<a href="#">Link to this property</a>

status: string

Integration status.

<a href="#">Link to this property</a>

updated: string

When the integration was last updated.

formatdate-time

<a href="#">Link to this property</a>

use\_cases: array of map\[unknown]

Use cases enabled for the integration.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.casb.integrations%20%3E%20(method)%20resume%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

Whether the request succeeded.

[Link to this property](#)%20zero_trust.casb.integrations%20%3E%20(method)%20resume%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

errors: optional array of map\[unknown]

List of errors.

[Link to this property](#)%20zero_trust.casb.integrations%20%3E%20(method)%20resume%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

messages: optional array of string

List of messages.

[Link to this property](#)%20zero_trust.casb.integrations%20%3E%20(method)%20resume%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

### Resume integration

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/one/integrations/$ID/resume \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "errors": [],
  "messages": [],
  "result": {
    "application": {
      "category": "Productivity",
      "display_name": "Google Workspace",
      "logo": "https://dash.cloudflare.com/v2/static/google_workspace.png"
    },
    "auth_method": {
      "display_name": "OAuth 2.0",
      "id": "oauth"
    },
    "authorization_link": {
      "components": {
        "client_id": "abc",
        "instance_name": "example"
      },
      "link": "https://example.cloudflare.com/authorize"
    },
    "created": "2025-01-01T00:00:00Z",
    "credentials_expiry": "2026-01-01T00:00:00Z",
    "dlp_profiles": [
      "e91a2360-da51-4fdf-9711-bcdecd462614"
    ],
    "health_details": [],
    "id": "019d2e6a-d995-7185-afbd-4feead9e42ec",
    "is_paused": false,
    "last_hydrated": "2025-04-10T08:30:00Z",
    "name": "My Google Workspace",
    "status": "Healthy",
    "updated": "2025-04-10T08:30:00Z",
    "use_cases": [
      {
        "description": "Discover and secure SaaS applications",
        "features": [
          {
            "description": "Automatically remediate security issues (requires write permissions)",
            "id": "auto_remediation",
            "is_enabled": true,
            "name": "Auto Remediation",
            "permissions": [
              {
                "display_name": "Manage users",
                "scope": "https://www.googleapis.com/auth/admin.directory.user",
                "status": "granted"
              }
            ]
          }
        ],
        "id": "casb",
        "is_enabled": true,
        "name": "Cloud Access Security Broker",
        "permissions": [
          {
            "display_name": "Drive (Read Only)",
            "scope": "https://www.googleapis.com/auth/drive.readonly",
            "status": "granted"
          },
          {
            "display_name": "Gmail (Read Only)",
            "scope": "https://www.googleapis.com/auth/gmail.readonly",
            "status": "missing"
          }
        ]
      },
      {
        "description": "Protect against email-based threats",
        "features": [],
        "id": "ces",
        "is_enabled": false,
        "name": "Cloud Email Security",
        "permissions": []
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
    "application": {
      "category": "Productivity",
      "display_name": "Google Workspace",
      "logo": "https://dash.cloudflare.com/v2/static/google_workspace.png"
    },
    "auth_method": {
      "display_name": "OAuth 2.0",
      "id": "oauth"
    },
    "authorization_link": {
      "components": {
        "client_id": "abc",
        "instance_name": "example"
      },
      "link": "https://example.cloudflare.com/authorize"
    },
    "created": "2025-01-01T00:00:00Z",
    "credentials_expiry": "2026-01-01T00:00:00Z",
    "dlp_profiles": [
      "e91a2360-da51-4fdf-9711-bcdecd462614"
    ],
    "health_details": [],
    "id": "019d2e6a-d995-7185-afbd-4feead9e42ec",
    "is_paused": false,
    "last_hydrated": "2025-04-10T08:30:00Z",
    "name": "My Google Workspace",
    "status": "Healthy",
    "updated": "2025-04-10T08:30:00Z",
    "use_cases": [
      {
        "description": "Discover and secure SaaS applications",
        "features": [
          {
            "description": "Automatically remediate security issues (requires write permissions)",
            "id": "auto_remediation",
            "is_enabled": true,
            "name": "Auto Remediation",
            "permissions": [
              {
                "display_name": "Manage users",
                "scope": "https://www.googleapis.com/auth/admin.directory.user",
                "status": "granted"
              }
            ]
          }
        ],
        "id": "casb",
        "is_enabled": true,
        "name": "Cloud Access Security Broker",
        "permissions": [
          {
            "display_name": "Drive (Read Only)",
            "scope": "https://www.googleapis.com/auth/drive.readonly",
            "status": "granted"
          },
          {
            "display_name": "Gmail (Read Only)",
            "scope": "https://www.googleapis.com/auth/gmail.readonly",
            "status": "missing"
          }
        ]
      },
      {
        "description": "Protect against email-based threats",
        "features": [],
        "id": "ces",
        "is_enabled": false,
        "name": "Cloud Email Security",
        "permissions": []
      }
    ]
  },
  "success": true
}
```