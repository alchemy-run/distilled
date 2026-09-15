---
title: Mint live view URLs for a browser session
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Browser Rendering](https://developers.cloudflare.com/api/resources/browser_rendering)

[Devtools](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools)

[Browser](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/browser)

[Live View](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/browser/subresources/live_view)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Mint live view URLs for a browser session

POST/accounts/{account\_id}/browser-rendering/devtools/browser/{session\_id}/live\_view

Generates time-limited URLs to view a remote browser session. Set `guardrails: { mode: 'readonly' }` to create a view-only link.

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

[Link to this property](#)%20browser_rendering.devtools.browser.live_view%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

session\_id: string

Browser session ID

formatuuid

[Link to this property](#)%20browser_rendering.devtools.browser.live_view%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20session_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

expiresInMs: optional number

How long the live view URLs remain valid, in milliseconds. Default: 5 minutes. Max: 60 minutes.

maximum3600000

minimum60000

[Link to this property](#)%20browser_rendering.devtools.browser.live_view%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20expiresInMs%20%3E%20(schema)>)

<details>

<summary>

guardrails: optional object {mode }

Connection guardrails. Use <code>{ mode: 'readonly' }</code> to generate a view-only link.

</summary>

mode: "readonly"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.devtools.browser.live_view%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20guardrails%20%3E%20(schema)>)

<details>

<summary>

mode: optional "devtools"or "tab"or "full"

UI mode: ‘devtools’ (Chrome DevTools), ‘tab’ (single tab view), ‘full’ (multi-tab browser)

</summary>

One of the following:

"devtools"

<a href="#">Link to this property</a>

"tab"

<a href="#">Link to this property</a>

"full"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.devtools.browser.live_view%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20mode%20%3E%20(schema)>)

targetId: optional string

Target ID (page) to connect to. If omitted, auto-resolves to the first active page.

[Link to this property](#)%20browser_rendering.devtools.browser.live_view%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20targetId%20%3E%20(schema)>)

##### ReturnsExpand Collapse

id: string

Target ID

[Link to this property](#)%20browser_rendering.devtools.browser.live_view%20%3E%20(model)%20live_view_create_response%20%3E%20(schema)%20%3E%20(property)%20id>)

devtoolsFrontendUrl: string

URL to open the live view in a browser

formaturi

[Link to this property](#)%20browser_rendering.devtools.browser.live_view%20%3E%20(model)%20live_view_create_response%20%3E%20(schema)%20%3E%20(property)%20devtoolsFrontendUrl>)

<details>

<summary>

options: object {mode, guardrails }

</summary>

<details>

<summary>

mode: "devtools"or "tab"or "full"

UI mode for the live view

</summary>

One of the following:

"devtools"

<a href="#">Link to this property</a>

"tab"

<a href="#">Link to this property</a>

"full"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

guardrails: optional object {mode }

Connection guardrails applied to this link

</summary>

mode: "readonly"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.devtools.browser.live_view%20%3E%20(model)%20live_view_create_response%20%3E%20(schema)%20%3E%20(property)%20options>)

webSocketDebuggerUrl: string

WebSocket URL for CDP connection

formaturi

[Link to this property](#)%20browser_rendering.devtools.browser.live_view%20%3E%20(model)%20live_view_create_response%20%3E%20(schema)%20%3E%20(property)%20webSocketDebuggerUrl>)

### Mint live view URLs for a browser session

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser/$SESSION_ID/live_view \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "id": "id",
  "devtoolsFrontendUrl": "https://example.com",
  "options": {
    "mode": "devtools",
    "guardrails": {
      "mode": "readonly"
    }
  },
  "webSocketDebuggerUrl": "https://example.com"
}
```

##### Returns Examples

200 example

```
{
  "id": "id",
  "devtoolsFrontendUrl": "https://example.com",
  "options": {
    "mode": "devtools",
    "guardrails": {
      "mode": "readonly"
    }
  },
  "webSocketDebuggerUrl": "https://example.com"
}
```