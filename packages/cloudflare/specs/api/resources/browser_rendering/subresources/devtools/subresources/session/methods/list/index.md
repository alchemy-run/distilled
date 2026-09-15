---
title: List sessions.
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Browser Rendering](https://developers.cloudflare.com/api/resources/browser_rendering)

[Devtools](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools)

[Session](https://developers.cloudflare.com/api/resources/browser_rendering/subresources/devtools/subresources/session)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List sessions.

GET/accounts/{account\_id}/browser-rendering/devtools/session

List active browser sessions.

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

[Link to this property](#)%20browser_rendering.devtools.session%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

limit: optional number

maximum200

minimum1

[Link to this property](#)%20browser_rendering.devtools.session%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20limit%20%3E%20(schema)>)

offset: optional number

minimum0

[Link to this property](#)%20browser_rendering.devtools.session%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20offset%20%3E%20(schema)>)

##### ReturnsExpand Collapse

sessionId: string

Session ID.

formatuuid

[Link to this property](#)%20browser_rendering.devtools.session%20%3E%20(model)%20session_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20sessionId>)

closeReason: optional number

Reason code for session closure.

[Link to this property](#)%20browser_rendering.devtools.session%20%3E%20(model)%20session_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20closeReason>)

closeReasonText: optional string

Human-readable close reason.

[Link to this property](#)%20browser_rendering.devtools.session%20%3E%20(model)%20session_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20closeReasonText>)

connectionEndTime: optional number

Connection end time.

[Link to this property](#)%20browser_rendering.devtools.session%20%3E%20(model)%20session_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20connectionEndTime>)

connectionId: optional string

Connection ID.

[Link to this property](#)%20browser_rendering.devtools.session%20%3E%20(model)%20session_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20connectionId>)

connectionStartTime: optional number

Connection start time.

[Link to this property](#)%20browser_rendering.devtools.session%20%3E%20(model)%20session_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20connectionStartTime>)

devtoolsFrontendUrl: optional string

DevTools frontend URL.

[Link to this property](#)%20browser_rendering.devtools.session%20%3E%20(model)%20session_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20devtoolsFrontendUrl>)

endTime: optional number

Session end time.

[Link to this property](#)%20browser_rendering.devtools.session%20%3E%20(model)%20session_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20endTime>)

lastUpdated: optional number

Last updated timestamp.

[Link to this property](#)%20browser_rendering.devtools.session%20%3E%20(model)%20session_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20lastUpdated>)

startTime: optional number

Session start time.

[Link to this property](#)%20browser_rendering.devtools.session%20%3E%20(model)%20session_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20startTime>)

webSocketDebuggerUrl: optional string

WebSocket URL for debugging this target.

[Link to this property](#)%20browser_rendering.devtools.session%20%3E%20(model)%20session_list_response%20%3E%20(schema)%20%3E%20(items)%20%3E%20(property)%20webSocketDebuggerUrl>)

### List sessions.

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/session \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
[
  {
    "sessionId": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "closeReason": 0,
    "closeReasonText": "closeReasonText",
    "connectionEndTime": 0,
    "connectionId": "connectionId",
    "connectionStartTime": 0,
    "devtoolsFrontendUrl": "devtoolsFrontendUrl",
    "endTime": 0,
    "lastUpdated": 0,
    "startTime": 0,
    "webSocketDebuggerUrl": "webSocketDebuggerUrl"
  }
]
```

##### Returns Examples

200 example

```
[
  {
    "sessionId": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "closeReason": 0,
    "closeReasonText": "closeReasonText",
    "connectionEndTime": 0,
    "connectionId": "connectionId",
    "connectionStartTime": 0,
    "devtoolsFrontendUrl": "devtoolsFrontendUrl",
    "endTime": 0,
    "lastUpdated": 0,
    "startTime": 0,
    "webSocketDebuggerUrl": "webSocketDebuggerUrl"
  }
]
```