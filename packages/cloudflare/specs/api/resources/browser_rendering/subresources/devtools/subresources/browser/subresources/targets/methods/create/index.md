---
title: Open a new browser tab.
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Browser Rendering](https://developers.cloudflare.com/api/resources/browser_rendering)

[Devtools](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools)

[Browser](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/browser)

[Targets](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/browser/subresources/targets)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Open a new browser tab.

PUT/accounts/{account\_id}/browser-rendering/devtools/browser/{session\_id}/json/new

Opens a new tab in the browser. Optionally specify a URL to navigate to.

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

Account ID.

[Link to this property](#)%20browser_rendering.devtools.browser.targets%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

session\_id: string

Browser session ID.

formatuuid

[Link to this property](#)%20browser_rendering.devtools.browser.targets%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20session_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

liveViewUrlExpiresInMs: optional number

How long the live view URL remains valid, in milliseconds (max 60 minutes)

maximum3600000

minimum60000

[Link to this property](#)%20browser_rendering.devtools.browser.targets%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20liveViewUrlExpiresInMs%20%3E%20(schema)>)

url: optional string

formaturi

[Link to this property](#)%20browser_rendering.devtools.browser.targets%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20url%20%3E%20(schema)>)

##### ReturnsExpand Collapse

id: string

Target ID.

[Link to this property](#)%20browser_rendering.devtools.browser.targets%20%3E%20(model)%20target_create_response%20%3E%20(schema)%20%3E%20(property)%20id>)

type: string

Target type (page, background\_page, worker, etc.).

[Link to this property](#)%20browser_rendering.devtools.browser.targets%20%3E%20(model)%20target_create_response%20%3E%20(schema)%20%3E%20(property)%20type>)

url: string

URL of the target.

[Link to this property](#)%20browser_rendering.devtools.browser.targets%20%3E%20(model)%20target_create_response%20%3E%20(schema)%20%3E%20(property)%20url>)

description: optional string

Target description.

[Link to this property](#)%20browser_rendering.devtools.browser.targets%20%3E%20(model)%20target_create_response%20%3E%20(schema)%20%3E%20(property)%20description>)

devtoolsFrontendUrl: optional string

DevTools frontend URL.

[Link to this property](#)%20browser_rendering.devtools.browser.targets%20%3E%20(model)%20target_create_response%20%3E%20(schema)%20%3E%20(property)%20devtoolsFrontendUrl>)

title: optional string

Title of the target.

[Link to this property](#)%20browser_rendering.devtools.browser.targets%20%3E%20(model)%20target_create_response%20%3E%20(schema)%20%3E%20(property)%20title>)

webSocketDebuggerUrl: optional string

WebSocket URL for debugging this target.

[Link to this property](#)%20browser_rendering.devtools.browser.targets%20%3E%20(model)%20target_create_response%20%3E%20(schema)%20%3E%20(property)%20webSocketDebuggerUrl>)

### Open a new browser tab.

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser/$SESSION_ID/json/new \
    -X PUT \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "id": "id",
  "type": "type",
  "url": "url",
  "description": "description",
  "devtoolsFrontendUrl": "devtoolsFrontendUrl",
  "title": "title",
  "webSocketDebuggerUrl": "webSocketDebuggerUrl"
}
```

##### Returns Examples

200 example

```
{
  "id": "id",
  "type": "type",
  "url": "url",
  "description": "description",
  "devtoolsFrontendUrl": "devtoolsFrontendUrl",
  "title": "title",
  "webSocketDebuggerUrl": "webSocketDebuggerUrl"
}
```