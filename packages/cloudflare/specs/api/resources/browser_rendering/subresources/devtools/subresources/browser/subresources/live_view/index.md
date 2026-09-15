---
title: Live View
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

# Live View

##### [Mint live view URLs for a browser session](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/browser/subresources/live_view/methods/create)

POST/accounts/{account\_id}/browser-rendering/devtools/browser/{session\_id}/live\_view

##### ModelsExpand Collapse

<details>

<summary>

LiveViewCreateResponse object {id, devtoolsFrontendUrl, options, webSocketDebuggerUrl }

</summary>

id: string

Target ID

<a href="#">Link to this property</a>

devtoolsFrontendUrl: string

URL to open the live view in a browser

formaturi

<a href="#">Link to this property</a>

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

<a href="#">Link to this property</a>

webSocketDebuggerUrl: string

WebSocket URL for CDP connection

formaturi

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.devtools.browser.live_view%20%3E%20(model)%20live_view_create_response%20%3E%20(schema)>)