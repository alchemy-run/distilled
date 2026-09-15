---
title: Sync MCP Server Capabilities
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

# Sync MCP Server Capabilities

POST/accounts/{account\_id}/access/ai-controls/mcp/servers/{id}/sync

Syncs an MCP server’s capabilities and returns the updated server state, including any connection errors.

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

[Link to this property](#)%20zero_trust.access.ai_controls.mcp.servers%20%3E%20(method)%20sync%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

id: string

Unique identifier for the MCP server.

maxLength32

minLength1

[Link to this property](#)%20zero_trust.access.ai_controls.mcp.servers%20%3E%20(method)%20sync%20%3E%20(params)%20default%20%3E%20(param)%20id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {error, error\_details, status }

</summary>

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

<details>

<summary>

status: optional "waiting"or "ready"or "stale"or "error"

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

</details>

[Link to this property](#)%20zero_trust.access.ai_controls.mcp.servers%20%3E%20(method)%20sync%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20zero_trust.access.ai_controls.mcp.servers%20%3E%20(method)%20sync%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Sync MCP Server Capabilities

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/ai-controls/mcp/servers/$ID/sync \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "error": "error",
    "error_details": {
      "cause": "cause",
      "is_upstream": true,
      "mcp_code": 0,
      "retryable": true,
      "status_code": 0
    },
    "status": "waiting"
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "error": "error",
    "error_details": {
      "cause": "cause",
      "is_upstream": true,
      "mcp_code": 0,
      "retryable": true,
      "status_code": 0
    },
    "status": "waiting"
  },
  "success": true
}
```