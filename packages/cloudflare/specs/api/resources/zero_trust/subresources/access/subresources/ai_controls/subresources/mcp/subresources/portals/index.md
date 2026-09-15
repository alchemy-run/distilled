---
title: Portals
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

[AI Controls](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/ai_controls)

[Mcp](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/ai_controls/subresources/mcp)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Portals

##### [List MCP Portals](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/ai_controls/subresources/mcp/subresources/portals/methods/list)

GET/accounts/{account\_id}/access/ai-controls/mcp/portals

##### [Create a new MCP Portal](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/ai_controls/subresources/mcp/subresources/portals/methods/create)

POST/accounts/{account\_id}/access/ai-controls/mcp/portals

##### [Read details of an MCP Portal](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/ai_controls/subresources/mcp/subresources/portals/methods/read)

GET/accounts/{account\_id}/access/ai-controls/mcp/portals/{id}

##### [Update an MCP Portal](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/ai_controls/subresources/mcp/subresources/portals/methods/update)

PUT/accounts/{account\_id}/access/ai-controls/mcp/portals/{id}

##### [Delete an MCP Portal](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/ai_controls/subresources/mcp/subresources/portals/methods/delete)

DELETE/accounts/{account\_id}/access/ai-controls/mcp/portals/{id}

##### ModelsExpand Collapse

<details>

<summary>

PortalListResponse object {id, hostname, name, 9 more }

</summary>

id: string

Unique identifier for the MCP portal.

maxLength32

minLength1

<a href="#">Link to this property</a>

hostname: string

Hostname where the MCP portal is available.

<a href="#">Link to this property</a>

name: string

Display name for the MCP portal.

maxLength350

<a href="#">Link to this property</a>

<details>

<summary>

servers: array of object {id, auth\_type, hostname, 22 more }

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

server\_id: string

Unique identifier for the MCP server.

maxLength32

minLength1

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

default\_disabled: optional boolean

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

on\_behalf: optional boolean

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

updated\_prompts: optional array of object {name, enabled, portal\_alias, 3 more }

</summary>

name: string

<a href="#">Link to this property</a>

enabled: optional boolean

<a href="#">Link to this property</a>

portal\_alias: optional string

<a href="#">Link to this property</a>

portal\_description: optional string

<a href="#">Link to this property</a>

server\_alias: optional string

<a href="#">Link to this property</a>

server\_description: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

updated\_tools: optional array of object {name, enabled, portal\_alias, 3 more }

</summary>

name: string

<a href="#">Link to this property</a>

enabled: optional boolean

<a href="#">Link to this property</a>

portal\_alias: optional string

<a href="#">Link to this property</a>

portal\_description: optional string

<a href="#">Link to this property</a>

server\_alias: optional string

<a href="#">Link to this property</a>

server\_description: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

Deprecatedallow\_code\_mode: optional boolean

Deprecated: use <code>code_mode</code> for new integrations. <code>true</code> maps to any non-off Code Mode policy; <code>false</code> maps to <code>code_mode: off</code>. If both fields are sent, they must be consistent or the request returns a 400.

<a href="#">Link to this property</a>

<details>

<summary>

code\_mode: optional "off"or "opt\_in"or "default\_on"or "enforced"

Code Mode policy for this portal. <code>off</code>: Code Mode is unavailable; query parameters are ignored. <code>opt_in</code>: Code Mode is off by default; clients turn it on with <code>?codemode=search_and_execute</code>. <code>default_on</code>: Code Mode is on by default; clients can opt out with <code>?codemode=off</code>. <code>enforced</code>: Code Mode is always on; query parameters are ignored. Defaults to <code>opt_in</code> when omitted on create. If both <code>code_mode</code> and <code>allow_code_mode</code> are sent, they must be consistent or the request returns a 400.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"opt\_in"

<a href="#">Link to this property</a>

"default\_on"

<a href="#">Link to this property</a>

"enforced"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

created\_by: optional string

<a href="#">Link to this property</a>

description: optional string

Optional description of the MCP portal.

maxLength512

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

modified\_by: optional string

<a href="#">Link to this property</a>

secure\_web\_gateway: optional boolean

Route outbound MCP traffic through Zero Trust Secure Web Gateway.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.ai_controls.mcp.portals%20%3E%20(model)%20portal_list_response%20%3E%20(schema)>)

<details>

<summary>

PortalCreateResponse object {id, hostname, name, 9 more }

</summary>

id: string

Unique identifier for the MCP portal.

maxLength32

minLength1

<a href="#">Link to this property</a>

hostname: string

Hostname where the MCP portal is available.

<a href="#">Link to this property</a>

name: string

Display name for the MCP portal.

maxLength350

<a href="#">Link to this property</a>

<details>

<summary>

servers: array of object {id, auth\_type, hostname, 22 more }

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

server\_id: string

Unique identifier for the MCP server.

maxLength32

minLength1

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

default\_disabled: optional boolean

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

on\_behalf: optional boolean

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

updated\_prompts: optional array of object {name, enabled, portal\_alias, 3 more }

</summary>

name: string

<a href="#">Link to this property</a>

enabled: optional boolean

<a href="#">Link to this property</a>

portal\_alias: optional string

<a href="#">Link to this property</a>

portal\_description: optional string

<a href="#">Link to this property</a>

server\_alias: optional string

<a href="#">Link to this property</a>

server\_description: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

updated\_tools: optional array of object {name, enabled, portal\_alias, 3 more }

</summary>

name: string

<a href="#">Link to this property</a>

enabled: optional boolean

<a href="#">Link to this property</a>

portal\_alias: optional string

<a href="#">Link to this property</a>

portal\_description: optional string

<a href="#">Link to this property</a>

server\_alias: optional string

<a href="#">Link to this property</a>

server\_description: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

Deprecatedallow\_code\_mode: optional boolean

Deprecated: use <code>code_mode</code> for new integrations. <code>true</code> maps to any non-off Code Mode policy; <code>false</code> maps to <code>code_mode: off</code>. If both fields are sent, they must be consistent or the request returns a 400.

<a href="#">Link to this property</a>

<details>

<summary>

code\_mode: optional "off"or "opt\_in"or "default\_on"or "enforced"

Code Mode policy for this portal. <code>off</code>: Code Mode is unavailable; query parameters are ignored. <code>opt_in</code>: Code Mode is off by default; clients turn it on with <code>?codemode=search_and_execute</code>. <code>default_on</code>: Code Mode is on by default; clients can opt out with <code>?codemode=off</code>. <code>enforced</code>: Code Mode is always on; query parameters are ignored. Defaults to <code>opt_in</code> when omitted on create. If both <code>code_mode</code> and <code>allow_code_mode</code> are sent, they must be consistent or the request returns a 400.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"opt\_in"

<a href="#">Link to this property</a>

"default\_on"

<a href="#">Link to this property</a>

"enforced"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

created\_by: optional string

<a href="#">Link to this property</a>

description: optional string

Optional description of the MCP portal.

maxLength512

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

modified\_by: optional string

<a href="#">Link to this property</a>

secure\_web\_gateway: optional boolean

Route outbound MCP traffic through Zero Trust Secure Web Gateway.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.ai_controls.mcp.portals%20%3E%20(model)%20portal_create_response%20%3E%20(schema)>)

<details>

<summary>

PortalReadResponse object {id, hostname, name, 9 more }

</summary>

id: string

Unique identifier for the MCP portal.

maxLength32

minLength1

<a href="#">Link to this property</a>

hostname: string

Hostname where the MCP portal is available.

<a href="#">Link to this property</a>

name: string

Display name for the MCP portal.

maxLength350

<a href="#">Link to this property</a>

<details>

<summary>

servers: array of object {id, auth\_type, hostname, 22 more }

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

server\_id: string

Unique identifier for the MCP server.

maxLength32

minLength1

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

default\_disabled: optional boolean

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

on\_behalf: optional boolean

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

updated\_prompts: optional array of object {name, enabled, portal\_alias, 3 more }

</summary>

name: string

<a href="#">Link to this property</a>

enabled: optional boolean

<a href="#">Link to this property</a>

portal\_alias: optional string

<a href="#">Link to this property</a>

portal\_description: optional string

<a href="#">Link to this property</a>

server\_alias: optional string

<a href="#">Link to this property</a>

server\_description: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

updated\_tools: optional array of object {name, enabled, portal\_alias, 3 more }

</summary>

name: string

<a href="#">Link to this property</a>

enabled: optional boolean

<a href="#">Link to this property</a>

portal\_alias: optional string

<a href="#">Link to this property</a>

portal\_description: optional string

<a href="#">Link to this property</a>

server\_alias: optional string

<a href="#">Link to this property</a>

server\_description: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

Deprecatedallow\_code\_mode: optional boolean

Deprecated: use <code>code_mode</code> for new integrations. <code>true</code> maps to any non-off Code Mode policy; <code>false</code> maps to <code>code_mode: off</code>. If both fields are sent, they must be consistent or the request returns a 400.

<a href="#">Link to this property</a>

<details>

<summary>

code\_mode: optional "off"or "opt\_in"or "default\_on"or "enforced"

Code Mode policy for this portal. <code>off</code>: Code Mode is unavailable; query parameters are ignored. <code>opt_in</code>: Code Mode is off by default; clients turn it on with <code>?codemode=search_and_execute</code>. <code>default_on</code>: Code Mode is on by default; clients can opt out with <code>?codemode=off</code>. <code>enforced</code>: Code Mode is always on; query parameters are ignored. Defaults to <code>opt_in</code> when omitted on create. If both <code>code_mode</code> and <code>allow_code_mode</code> are sent, they must be consistent or the request returns a 400.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"opt\_in"

<a href="#">Link to this property</a>

"default\_on"

<a href="#">Link to this property</a>

"enforced"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

created\_by: optional string

<a href="#">Link to this property</a>

description: optional string

Optional description of the MCP portal.

maxLength512

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

modified\_by: optional string

<a href="#">Link to this property</a>

secure\_web\_gateway: optional boolean

Route outbound MCP traffic through Zero Trust Secure Web Gateway.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.ai_controls.mcp.portals%20%3E%20(model)%20portal_read_response%20%3E%20(schema)>)

<details>

<summary>

PortalUpdateResponse object {id, hostname, name, 9 more }

</summary>

id: string

Unique identifier for the MCP portal.

maxLength32

minLength1

<a href="#">Link to this property</a>

hostname: string

Hostname where the MCP portal is available.

<a href="#">Link to this property</a>

name: string

Display name for the MCP portal.

maxLength350

<a href="#">Link to this property</a>

<details>

<summary>

servers: array of object {id, auth\_type, hostname, 22 more }

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

server\_id: string

Unique identifier for the MCP server.

maxLength32

minLength1

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

default\_disabled: optional boolean

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

on\_behalf: optional boolean

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

updated\_prompts: optional array of object {name, enabled, portal\_alias, 3 more }

</summary>

name: string

<a href="#">Link to this property</a>

enabled: optional boolean

<a href="#">Link to this property</a>

portal\_alias: optional string

<a href="#">Link to this property</a>

portal\_description: optional string

<a href="#">Link to this property</a>

server\_alias: optional string

<a href="#">Link to this property</a>

server\_description: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

updated\_tools: optional array of object {name, enabled, portal\_alias, 3 more }

</summary>

name: string

<a href="#">Link to this property</a>

enabled: optional boolean

<a href="#">Link to this property</a>

portal\_alias: optional string

<a href="#">Link to this property</a>

portal\_description: optional string

<a href="#">Link to this property</a>

server\_alias: optional string

<a href="#">Link to this property</a>

server\_description: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

Deprecatedallow\_code\_mode: optional boolean

Deprecated: use <code>code_mode</code> for new integrations. <code>true</code> maps to any non-off Code Mode policy; <code>false</code> maps to <code>code_mode: off</code>. If both fields are sent, they must be consistent or the request returns a 400.

<a href="#">Link to this property</a>

<details>

<summary>

code\_mode: optional "off"or "opt\_in"or "default\_on"or "enforced"

Code Mode policy for this portal. <code>off</code>: Code Mode is unavailable; query parameters are ignored. <code>opt_in</code>: Code Mode is off by default; clients turn it on with <code>?codemode=search_and_execute</code>. <code>default_on</code>: Code Mode is on by default; clients can opt out with <code>?codemode=off</code>. <code>enforced</code>: Code Mode is always on; query parameters are ignored. Defaults to <code>opt_in</code> when omitted on create. If both <code>code_mode</code> and <code>allow_code_mode</code> are sent, they must be consistent or the request returns a 400.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"opt\_in"

<a href="#">Link to this property</a>

"default\_on"

<a href="#">Link to this property</a>

"enforced"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

created\_by: optional string

<a href="#">Link to this property</a>

description: optional string

Optional description of the MCP portal.

maxLength512

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

modified\_by: optional string

<a href="#">Link to this property</a>

secure\_web\_gateway: optional boolean

Route outbound MCP traffic through Zero Trust Secure Web Gateway.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.ai_controls.mcp.portals%20%3E%20(model)%20portal_update_response%20%3E%20(schema)>)

<details>

<summary>

PortalDeleteResponse object {id, hostname, name, 8 more }

</summary>

id: string

Unique identifier for the MCP portal.

maxLength32

minLength1

<a href="#">Link to this property</a>

hostname: string

Hostname where the MCP portal is available.

<a href="#">Link to this property</a>

name: string

Display name for the MCP portal.

maxLength350

<a href="#">Link to this property</a>

Deprecatedallow\_code\_mode: optional boolean

Deprecated: use <code>code_mode</code> for new integrations. <code>true</code> maps to any non-off Code Mode policy; <code>false</code> maps to <code>code_mode: off</code>. If both fields are sent, they must be consistent or the request returns a 400.

<a href="#">Link to this property</a>

<details>

<summary>

code\_mode: optional "off"or "opt\_in"or "default\_on"or "enforced"

Code Mode policy for this portal. <code>off</code>: Code Mode is unavailable; query parameters are ignored. <code>opt_in</code>: Code Mode is off by default; clients turn it on with <code>?codemode=search_and_execute</code>. <code>default_on</code>: Code Mode is on by default; clients can opt out with <code>?codemode=off</code>. <code>enforced</code>: Code Mode is always on; query parameters are ignored. Defaults to <code>opt_in</code> when omitted on create. If both <code>code_mode</code> and <code>allow_code_mode</code> are sent, they must be consistent or the request returns a 400.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"opt\_in"

<a href="#">Link to this property</a>

"default\_on"

<a href="#">Link to this property</a>

"enforced"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

created\_by: optional string

<a href="#">Link to this property</a>

description: optional string

Optional description of the MCP portal.

maxLength512

<a href="#">Link to this property</a>

modified\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

modified\_by: optional string

<a href="#">Link to this property</a>

secure\_web\_gateway: optional boolean

Route outbound MCP traffic through Zero Trust Secure Web Gateway.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.ai_controls.mcp.portals%20%3E%20(model)%20portal_delete_response%20%3E%20(schema)>)