---
title: Get a browser session ID.
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Browser Rendering](https://developers.cloudflare.com/api/resources/browser_rendering)

[Devtools](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools)

[Browser](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/browser)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get a browser session ID.

POST/accounts/{account\_id}/browser-rendering/devtools/browser

Acquires a browser and returns its session ID and websocket URL. Optionally accepts a JSON body with session guardrails to restrict outbound HTTP/S traffic.

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

`Browser Rendering Write`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20browser_rendering.devtools.browser%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

keep\_alive: optional number

Keep-alive time in milliseconds.

maximum1200000

minimum10000

[Link to this property](#)%20browser_rendering.devtools.browser%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20keep_alive%20%3E%20(schema)>)

lab: optional boolean

Use experimental browser.

[Link to this property](#)%20browser_rendering.devtools.browser%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20lab%20%3E%20(schema)>)

liveViewUrlExpiresInMs: optional number

How long the live view URL remains valid, in milliseconds (max 60 minutes). Only used when targets is true.

maximum3600000

minimum60000

[Link to this property](#)%20browser_rendering.devtools.browser%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20liveViewUrlExpiresInMs%20%3E%20(schema)>)

recording: optional boolean

[Link to this property](#)%20browser_rendering.devtools.browser%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20recording%20%3E%20(schema)>)

targets: optional boolean

Include browser targets in response.

[Link to this property](#)%20browser_rendering.devtools.browser%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20targets%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

guardrails: optional object {allowedDomains, allowedDomainSets }

</summary>

allowedDomains: optional array of string

Hostname patterns, max 50. Supports exact hosts (example.com) or a single \* wildcard anywhere. Prefer \*.example.com (subdomain wildcard) over \*example.com (prefix wildcard) to avoid matching overbroad lookalikes like evilexample.com.

<a href="#">Link to this property</a>

allowedDomainSets: optional array of string

Max 4 entries: curated preset names (common-cdns) and/or https URLs of newline-separated hostname lists.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.devtools.browser%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20guardrails%20%3E%20(schema)>)

##### ReturnsExpand Collapse

sessionId: string

Browser session ID.

[Link to this property](#)%20browser_rendering.devtools.browser%20%3E%20(model)%20browser_create_response%20%3E%20(schema)%20%3E%20(property)%20sessionId>)

webSocketDebuggerUrl: optional string

WebSocket URL for the session.

[Link to this property](#)%20browser_rendering.devtools.browser%20%3E%20(model)%20browser_create_response%20%3E%20(schema)%20%3E%20(property)%20webSocketDebuggerUrl>)

### Get a browser session ID.

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "sessionId": "sessionId",
  "webSocketDebuggerUrl": "webSocketDebuggerUrl"
}
```

##### Returns Examples

200 example

```
{
  "sessionId": "sessionId",
  "webSocketDebuggerUrl": "webSocketDebuggerUrl"
}
```