---
title: Session
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Browser Rendering](https://developers.cloudflare.com/api/resources/browser_rendering)

[Devtools](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Session

##### [List sessions.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/session/methods/list)

GET/accounts/{account\_id}/browser-rendering/devtools/session

##### [Get session details.](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/session/methods/get)

GET/accounts/{account\_id}/browser-rendering/devtools/session/{session\_id}

##### ModelsExpand Collapse

<details>

<summary>

SessionListResponse = array of object {sessionId, closeReason, closeReasonText, 8 more }

</summary>

sessionId: string

Session ID.

formatuuid

<a href="#">Link to this property</a>

closeReason: optional number

Reason code for session closure.

<a href="#">Link to this property</a>

closeReasonText: optional string

Human-readable close reason.

<a href="#">Link to this property</a>

connectionEndTime: optional number

Connection end time.

<a href="#">Link to this property</a>

connectionId: optional string

Connection ID.

<a href="#">Link to this property</a>

connectionStartTime: optional number

Connection start time.

<a href="#">Link to this property</a>

devtoolsFrontendUrl: optional string

DevTools frontend URL.

<a href="#">Link to this property</a>

endTime: optional number

Session end time.

<a href="#">Link to this property</a>

lastUpdated: optional number

Last updated timestamp.

<a href="#">Link to this property</a>

startTime: optional number

Session start time.

<a href="#">Link to this property</a>

webSocketDebuggerUrl: optional string

WebSocket URL for debugging this target.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.devtools.session%20%3E%20(model)%20session_list_response%20%3E%20(schema)>)

<details>

<summary>

SessionGetResponse object {sessionId, closeReason, closeReasonText, 8 more }

</summary>

sessionId: string

Session ID.

formatuuid

<a href="#">Link to this property</a>

closeReason: optional number

Reason code for session closure.

<a href="#">Link to this property</a>

closeReasonText: optional string

Human-readable close reason.

<a href="#">Link to this property</a>

connectionEndTime: optional number

Connection end time.

<a href="#">Link to this property</a>

connectionId: optional string

Connection ID.

<a href="#">Link to this property</a>

connectionStartTime: optional number

Connection start time.

<a href="#">Link to this property</a>

devtoolsFrontendUrl: optional string

DevTools frontend URL.

<a href="#">Link to this property</a>

endTime: optional number

Session end time.

<a href="#">Link to this property</a>

lastUpdated: optional number

Last updated timestamp.

<a href="#">Link to this property</a>

startTime: optional number

Session start time.

<a href="#">Link to this property</a>

webSocketDebuggerUrl: optional string

WebSocket URL for debugging this target.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20browser_rendering.devtools.session%20%3E%20(model)%20session_get_response%20%3E%20(schema)>)