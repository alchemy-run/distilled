---
title: Get browser version metadata.
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

# Get browser version metadata.

GET/accounts/{account\_id}/browser-rendering/devtools/browser/{session\_id}/json/version

Get browser version metadata.

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

`Browser Rendering Write``Browser Rendering Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account ID.

[Link to this property](#)%20browser_rendering.devtools.browser%20%3E%20(method)%20version%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

session\_id: string

Browser session ID.

formatuuid

[Link to this property](#)%20browser_rendering.devtools.browser%20%3E%20(method)%20version%20%3E%20(params)%20default%20%3E%20(param)%20session_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

Browser: string

Browser name and version.

[Link to this property](#)%20browser_rendering.devtools.browser%20%3E%20(model)%20browser_version_response%20%3E%20(schema)%20%3E%20(property)%20Browser>)

"Protocol-Version": string

Chrome DevTools Protocol version.

[Link to this property](#)%20browser_rendering.devtools.browser%20%3E%20(model)%20browser_version_response%20%3E%20(schema)%20%3E%20(property)%20Protocol-Version>)

"User-Agent": string

User agent string.

[Link to this property](#)%20browser_rendering.devtools.browser%20%3E%20(model)%20browser_version_response%20%3E%20(schema)%20%3E%20(property)%20User-Agent>)

"V8-Version": string

V8 JavaScript engine version.

[Link to this property](#)%20browser_rendering.devtools.browser%20%3E%20(model)%20browser_version_response%20%3E%20(schema)%20%3E%20(property)%20V8-Version>)

"WebKit-Version": string

WebKit version.

[Link to this property](#)%20browser_rendering.devtools.browser%20%3E%20(model)%20browser_version_response%20%3E%20(schema)%20%3E%20(property)%20WebKit-Version>)

webSocketDebuggerUrl: string

WebSocket URL for debugging the browser.

[Link to this property](#)%20browser_rendering.devtools.browser%20%3E%20(model)%20browser_version_response%20%3E%20(schema)%20%3E%20(property)%20webSocketDebuggerUrl>)

### Get browser version metadata.

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser/$SESSION_ID/json/version \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "Browser": "Browser",
  "Protocol-Version": "Protocol-Version",
  "User-Agent": "User-Agent",
  "V8-Version": "V8-Version",
  "WebKit-Version": "WebKit-Version",
  "webSocketDebuggerUrl": "webSocketDebuggerUrl"
}
```

##### Returns Examples

200 example

```
{
  "Browser": "Browser",
  "Protocol-Version": "Protocol-Version",
  "User-Agent": "User-Agent",
  "V8-Version": "V8-Version",
  "WebKit-Version": "WebKit-Version",
  "webSocketDebuggerUrl": "webSocketDebuggerUrl"
}
```