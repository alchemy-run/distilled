---
title: Read the details of an MCP Server
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

[AI Controls](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/ai_controls)

[Mcp](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/ai_controls/subresources/mcp)

[Servers](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/ai_controls/subresources/mcp/subresources/servers)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Read the details of an MCP Server

GET/accounts/{account\_id}/access/ai-controls/mcp/servers/{id}

Retrieves an MCP server’s configuration and capability sync state.

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

##### Accepted Permissions (at least one required)

`MCP Portals Write``MCP Portals Read`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.access.ai_controls.mcp.servers%20%3E%20(method)%20read%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

id: string

Unique identifier for the MCP server.

maxLength32

minLength1

[Link to this property](#)%20zero_trust.access.ai_controls.mcp.servers%20%3E%20(method)%20read%20%3E%20(params)%20default%20%3E%20(param)%20id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {id, auth\_type, hostname, 19 more }

</summary>

id: string

Unique identifier for the MCP server.

maxLength32

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

auth\_type: "oauth"or "bearer"or "unauthenticated"

Authentication method used to connect to the upstream MCP server.

</summary>

One of the following:

"oauth"

<a href="#">Link to this property</a>

"bearer"

<a href="#">Link to this property</a>

"unauthenticated"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

hostname: string

URL of the upstream MCP endpoint.

formaturi

<a href="#">Link to this property</a>

name: string

Display name for the MCP server.

maxLength350

<a href="#">Link to this property</a>

prompts: array of map\[unknown]

<a href="#">Link to this property</a>

tools: array of map\[unknown]

<a href="#">Link to this property</a>

<details>

<summary>

auth\_config\_summary: optional object {auth\_mode, client\_secret\_version, config, 2 more }

Safe subset of auth\_credentials surfaced to the dashboard. Includes auth\_mode (dcr|manual), has\_client\_secret, client\_secret\_version, and the OAuth endpoints + client\_id for manual servers. Never includes the secret value.

</summary>

<details>

<summary>

auth\_mode: optional "dcr"or "manual"

</summary>

One of the following:

"dcr"

<a href="#">Link to this property</a>

"manual"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

client\_secret\_version: optional number

<a href="#">Link to this property</a>

<details>

<summary>

config: optional object {authorization\_endpoint, issuer, resource, 2 more }

</summary>

authorization\_endpoint: optional string

<a href="#">Link to this property</a>

issuer: optional string

<a href="#">Link to this property</a>

resource: optional string

<a href="#">Link to this property</a>

revocation\_endpoint: optional string

<a href="#">Link to this property</a>

token\_endpoint: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

has\_client\_secret: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

registration\_info: optional object {client\_id, redirect\_uris, scope, token\_endpoint\_auth\_method }

</summary>

client\_id: optional string

<a href="#">Link to this property</a>

redirect\_uris: optional array of string

<a href="#">Link to this property</a>

scope: optional string

<a href="#">Link to this property</a>

token\_endpoint\_auth\_method: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

authentication\_status: optional "not\_required"or "required"or "connected"or 2 more

Whether administrative authentication is required before capabilities can be synced. Manual OAuth is user-managed and has no administrative authentication flow.

</summary>

One of the following:

"not\_required"

<a href="#">Link to this property</a>

"required"

<a href="#">Link to this property</a>

"connected"

<a href="#">Link to this property</a>

"stale"

<a href="#">Link to this property</a>

"manual"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

created\_by: optional string

<a href="#">Link to this property</a>

description: optional string

Optional description of the MCP server.

maxLength512

<a href="#">Link to this property</a>

error: optional string

<a href="#">Link to this property</a>

<details>

<summary>

error\_details: optional object {cause, is\_upstream, mcp\_code, 2 more }

</summary>

cause: optional string

Underlying error message

<a href="#">Link to this property</a>

is\_upstream: optional boolean

True = MCP server returned an error. False = couldn’t reach the server

<a href="#">Link to this property</a>

mcp\_code: optional number

MCP protocol error code

<a href="#">Link to this property</a>

retryable: optional boolean

Whether the error is transient and worth retrying

<a href="#">Link to this property</a>

status\_code: optional number

HTTP status code from the server

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

is\_shared\_oauth\_callback\_enabled: optional boolean

When true, the gateway worker uses the shared Cloudflare-owned OAuth callback endpoint as the redirect\_uri for upstream on-behalf OAuth, instead of the customer portal hostname. Defaults to false (off); opt in per server by setting true.

<a href="#">Link to this property</a>

last\_successful\_sync: optional string

formatdate-time

<a href="#">Link to this property</a>

last\_synced: optional string

formatdate-time

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

modified\_by: optional string

<a href="#">Link to this property</a>

secure\_web\_gateway: optional boolean

Route outbound traffic to this MCP server through Zero Trust Secure Web Gateway.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "waiting"or "ready"or "stale"or "error"

Current sync state of the server

</summary>

One of the following:

"waiting"

<a href="#">Link to this property</a>

"ready"

<a href="#">Link to this property</a>

"stale"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

updated\_prompts: optional array of object {name, alias, description, enabled }

Server-wide prompt capability overrides.

</summary>

name: string

Name of the tool or prompt capability to override.

<a href="#">Link to this property</a>

alias: optional string

Custom name exposed for the capability.

maxLength40

<a href="#">Link to this property</a>

description: optional string

Custom description exposed for the capability.

<a href="#">Link to this property</a>

enabled: optional boolean

Whether the capability is available through the MCP server.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

updated\_tools: optional array of object {name, alias, description, enabled }

Server-wide tool capability overrides.

</summary>

name: string

Name of the tool or prompt capability to override.

<a href="#">Link to this property</a>

alias: optional string

Custom name exposed for the capability.

maxLength40

<a href="#">Link to this property</a>

description: optional string

Custom description exposed for the capability.

<a href="#">Link to this property</a>

enabled: optional boolean

Whether the capability is available through the MCP server.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.ai_controls.mcp.servers%20%3E%20(method)%20read%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20zero_trust.access.ai_controls.mcp.servers%20%3E%20(method)%20read%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Read the details of an MCP Server

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/ai-controls/mcp/servers/$ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "id": "my-mcp-server",
    "auth_type": "unauthenticated",
    "hostname": "https://example.com/mcp",
    "name": "My MCP Server",
    "prompts": [
      {
        "foo": "bar"
      }
    ],
    "tools": [
      {
        "foo": "bar"
      }
    ],
    "auth_config_summary": {
      "auth_mode": "dcr",
      "client_secret_version": 0,
      "config": {
        "authorization_endpoint": "authorization_endpoint",
        "issuer": "issuer",
        "resource": "resource",
        "revocation_endpoint": "revocation_endpoint",
        "token_endpoint": "token_endpoint"
      },
      "has_client_secret": true,
      "registration_info": {
        "client_id": "client_id",
        "redirect_uris": [
          "string"
        ],
        "scope": "scope",
        "token_endpoint_auth_method": "token_endpoint_auth_method"
      }
    },
    "authentication_status": "not_required",
    "created_at": "2019-12-27T18:11:19.117Z",
    "created_by": "created_by",
    "description": "This is one remote MCP server",
    "error": "error",
    "error_details": {
      "cause": "cause",
      "is_upstream": true,
      "mcp_code": 0,
      "retryable": true,
      "status_code": 0
    },
    "is_shared_oauth_callback_enabled": true,
    "last_successful_sync": "2019-12-27T18:11:19.117Z",
    "last_synced": "2019-12-27T18:11:19.117Z",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "modified_by": "modified_by",
    "secure_web_gateway": false,
    "status": "ready",
    "updated_prompts": [
      {
        "name": "name",
        "alias": "my-custom-alias",
        "description": "description",
        "enabled": true
      }
    ],
    "updated_tools": [
      {
        "name": "name",
        "alias": "my-custom-alias",
        "description": "description",
        "enabled": true
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
  "result": {
    "id": "my-mcp-server",
    "auth_type": "unauthenticated",
    "hostname": "https://example.com/mcp",
    "name": "My MCP Server",
    "prompts": [
      {
        "foo": "bar"
      }
    ],
    "tools": [
      {
        "foo": "bar"
      }
    ],
    "auth_config_summary": {
      "auth_mode": "dcr",
      "client_secret_version": 0,
      "config": {
        "authorization_endpoint": "authorization_endpoint",
        "issuer": "issuer",
        "resource": "resource",
        "revocation_endpoint": "revocation_endpoint",
        "token_endpoint": "token_endpoint"
      },
      "has_client_secret": true,
      "registration_info": {
        "client_id": "client_id",
        "redirect_uris": [
          "string"
        ],
        "scope": "scope",
        "token_endpoint_auth_method": "token_endpoint_auth_method"
      }
    },
    "authentication_status": "not_required",
    "created_at": "2019-12-27T18:11:19.117Z",
    "created_by": "created_by",
    "description": "This is one remote MCP server",
    "error": "error",
    "error_details": {
      "cause": "cause",
      "is_upstream": true,
      "mcp_code": 0,
      "retryable": true,
      "status_code": 0
    },
    "is_shared_oauth_callback_enabled": true,
    "last_successful_sync": "2019-12-27T18:11:19.117Z",
    "last_synced": "2019-12-27T18:11:19.117Z",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "modified_by": "modified_by",
    "secure_web_gateway": false,
    "status": "ready",
    "updated_prompts": [
      {
        "name": "name",
        "alias": "my-custom-alias",
        "description": "description",
        "enabled": true
      }
    ],
    "updated_tools": [
      {
        "name": "name",
        "alias": "my-custom-alias",
        "description": "description",
        "enabled": true
      }
    ]
  },
  "success": true
}
```