---
title: Delete an MCP Portal
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

[AI Controls](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/ai_controls)

[Mcp](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/ai_controls/subresources/mcp)

[Portals](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/ai_controls/subresources/mcp/subresources/portals)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Delete an MCP Portal

DELETE/accounts/{account\_id}/access/ai-controls/mcp/portals/{id}

Deletes an MCP portal from the account.

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

`MCP Portals Write`

##### P ath ParametersExpand Collapse

account\_id: string

[Link to this property](#)%20zero_trust.access.ai_controls.mcp.portals%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

id: string

Unique identifier for the MCP portal.

maxLength32

minLength1

[Link to this property](#)%20zero_trust.access.ai_controls.mcp.portals%20%3E%20(method)%20delete%20%3E%20(params)%20default%20%3E%20(param)%20id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {id, hostname, name, 8 more }

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

[Link to this property](#)%20zero_trust.access.ai_controls.mcp.portals%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20zero_trust.access.ai_controls.mcp.portals%20%3E%20(method)%20delete%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Delete an MCP Portal

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/ai-controls/mcp/portals/$ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "id": "my-mcp-portal",
    "hostname": "example.com",
    "name": "My MCP Portal",
    "allow_code_mode": true,
    "code_mode": "opt_in",
    "created_at": "2019-12-27T18:11:19.117Z",
    "created_by": "created_by",
    "description": "This is my custom MCP Portal",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "modified_by": "modified_by",
    "secure_web_gateway": false
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "id": "my-mcp-portal",
    "hostname": "example.com",
    "name": "My MCP Portal",
    "allow_code_mode": true,
    "code_mode": "opt_in",
    "created_at": "2019-12-27T18:11:19.117Z",
    "created_by": "created_by",
    "description": "This is my custom MCP Portal",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "modified_by": "modified_by",
    "secure_web_gateway": false
  },
  "success": true
}
```