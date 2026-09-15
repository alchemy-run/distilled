---
title: Browser
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Browser Rendering](https://developers.cloudflare.com/api/resources/browser_rendering)

[Devtools](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Browser

##### [Get a browser session ID.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/browser/methods/create)

POST/accounts/{account\_id}/browser-rendering/devtools/browser

##### [Acquire and connect to browser session.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/browser/methods/launch)

GET/accounts/{account\_id}/browser-rendering/devtools/browser

##### [Connect to browser session.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/browser/methods/connect)

GET/accounts/{account\_id}/browser-rendering/devtools/browser/{session\_id}

##### [Close browser session.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/browser/methods/delete)

DELETE/accounts/{account\_id}/browser-rendering/devtools/browser/{session\_id}

##### [Get browser version metadata.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/browser/methods/version)

GET/accounts/{account\_id}/browser-rendering/devtools/browser/{session\_id}/json/version

##### [Get Chrome DevTools Protocol schema.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/browser/methods/protocol)

GET/accounts/{account\_id}/browser-rendering/devtools/browser/{session\_id}/json/protocol

##### ModelsExpand Collapse

<details>

<summary>

BrowserCreateResponse object {sessionId, webSocketDebuggerUrl }

</summary>

sessionId: string

Browser session ID.

<a href="#">Link to this property</a>

webSocketDebuggerUrl: optional string

WebSocket URL for the session.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.devtools.browser%20%3E%20(model)%20browser_create_response%20%3E%20(schema)>)

<details>

<summary>

BrowserDeleteResponse object {status }

</summary>

<details>

<summary>

status: "closing"or "closed"

</summary>

One of the following:

"closing"

<a href="#">Link to this property</a>

"closed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.devtools.browser%20%3E%20(model)%20browser_delete_response%20%3E%20(schema)>)

<details>

<summary>

BrowserVersionResponse object {Browser, "Protocol-Version", "User-Agent", 3 more }

</summary>

Browser: string

Browser name and version.

<a href="#">Link to this property</a>

"Protocol-Version": string

Chrome DevTools Protocol version.

<a href="#">Link to this property</a>

"User-Agent": string

User agent string.

<a href="#">Link to this property</a>

"V8-Version": string

V8 JavaScript engine version.

<a href="#">Link to this property</a>

"WebKit-Version": string

WebKit version.

<a href="#">Link to this property</a>

webSocketDebuggerUrl: string

WebSocket URL for debugging the browser.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.devtools.browser%20%3E%20(model)%20browser_version_response%20%3E%20(schema)>)

<details>

<summary>

BrowserProtocolResponse object {domains, version }

</summary>

<details>

<summary>

domains: array of object {domain, commands, dependencies, 3 more }

List of protocol domains.

</summary>

domain: string

Domain name.

<a href="#">Link to this property</a>

commands: optional array of map\[unknown]

Available commands.

<a href="#">Link to this property</a>

dependencies: optional array of string

Domain dependencies.

<a href="#">Link to this property</a>

events: optional array of map\[unknown]

Available events.

<a href="#">Link to this property</a>

experimental: optional boolean

Whether this domain is experimental.

<a href="#">Link to this property</a>

types: optional array of map\[unknown]

Type definitions.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

version: optional object {major, minor }

Protocol version.

</summary>

major: string

Major version.

<a href="#">Link to this property</a>

minor: string

Minor version.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.devtools.browser%20%3E%20(model)%20browser_protocol_response%20%3E%20(schema)>)

#### BrowserLive View

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

#### BrowserPage

##### [Connect to a specific Chrome DevTools page.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/browser/subresources/page/methods/get)

GET/accounts/{account\_id}/browser-rendering/devtools/browser/{session\_id}/page/{target\_id}

#### BrowserTargets

##### [Open a new browser tab.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/browser/subresources/targets/methods/create)

PUT/accounts/{account\_id}/browser-rendering/devtools/browser/{session\_id}/json/new

##### [List targets.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/browser/subresources/targets/methods/list)

GET/accounts/{account\_id}/browser-rendering/devtools/browser/{session\_id}/json/list

##### [Get a target by ID.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/browser/subresources/targets/methods/get)

GET/accounts/{account\_id}/browser-rendering/devtools/browser/{session\_id}/json/list/{target\_id}

##### [Activate a browser target.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/browser/subresources/targets/methods/activate)

GET/accounts/{account\_id}/browser-rendering/devtools/browser/{session\_id}/json/activate/{target\_id}

##### [Close a browser target.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/browser/subresources/targets/methods/close)

GET/accounts/{account\_id}/browser-rendering/devtools/browser/{session\_id}/json/close/{target\_id}

##### ModelsExpand Collapse

<details>

<summary>

TargetCreateResponse object {id, type, url, 4 more }

</summary>

id: string

Target ID.

<a href="#">Link to this property</a>

type: string

Target type (page, background\_page, worker, etc.).

<a href="#">Link to this property</a>

url: string

URL of the target.

<a href="#">Link to this property</a>

description: optional string

Target description.

<a href="#">Link to this property</a>

devtoolsFrontendUrl: optional string

DevTools frontend URL.

<a href="#">Link to this property</a>

title: optional string

Title of the target.

<a href="#">Link to this property</a>

webSocketDebuggerUrl: optional string

WebSocket URL for debugging this target.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.devtools.browser.targets%20%3E%20(model)%20target_create_response%20%3E%20(schema)>)

<details>

<summary>

TargetListResponse = array of object {id, type, url, 4 more }

</summary>

id: string

Target ID.

<a href="#">Link to this property</a>

type: string

Target type (page, background\_page, worker, etc.).

<a href="#">Link to this property</a>

url: string

URL of the target.

<a href="#">Link to this property</a>

description: optional string

Target description.

<a href="#">Link to this property</a>

devtoolsFrontendUrl: optional string

DevTools frontend URL.

<a href="#">Link to this property</a>

title: optional string

Title of the target.

<a href="#">Link to this property</a>

webSocketDebuggerUrl: optional string

WebSocket URL for debugging this target.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.devtools.browser.targets%20%3E%20(model)%20target_list_response%20%3E%20(schema)>)

<details>

<summary>

TargetGetResponse object {id, type, url, 4 more }

</summary>

id: string

Target ID.

<a href="#">Link to this property</a>

type: string

Target type (page, background\_page, worker, etc.).

<a href="#">Link to this property</a>

url: string

URL of the target.

<a href="#">Link to this property</a>

description: optional string

Target description.

<a href="#">Link to this property</a>

devtoolsFrontendUrl: optional string

DevTools frontend URL.

<a href="#">Link to this property</a>

title: optional string

Title of the target.

<a href="#">Link to this property</a>

webSocketDebuggerUrl: optional string

WebSocket URL for debugging this target.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.devtools.browser.targets%20%3E%20(model)%20target_get_response%20%3E%20(schema)>)

<details>

<summary>

TargetActivateResponse object {message }

</summary>

message: string

Target activated.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.devtools.browser.targets%20%3E%20(model)%20target_activate_response%20%3E%20(schema)>)

<details>

<summary>

TargetCloseResponse object {message }

</summary>

message: string

Target is closing.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.devtools.browser.targets%20%3E%20(model)%20target_close_response%20%3E%20(schema)>)