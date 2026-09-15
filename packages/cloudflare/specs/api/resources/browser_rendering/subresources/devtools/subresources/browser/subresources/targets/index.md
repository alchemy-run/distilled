---
title: Targets
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

# Targets

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