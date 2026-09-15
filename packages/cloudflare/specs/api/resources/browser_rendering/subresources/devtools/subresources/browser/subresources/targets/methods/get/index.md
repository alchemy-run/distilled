---
title: Get a target by ID.
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

# Get a target by ID.

GET/accounts/{account\_id}/browser-rendering/devtools/browser/{session\_id}/json/list/{target\_id}

Returns the debuggable target with the given ID.

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

[Link to this property](#)%20browser_rendering.devtools.browser.targets%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

session\_id: string

Browser session ID.

formatuuid

[Link to this property](#)%20browser_rendering.devtools.browser.targets%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20session_id%20%3E%20(schema)>)

target\_id: string

Target ID.

[Link to this property](#)%20browser_rendering.devtools.browser.targets%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20target_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

id: string

Target ID.

[Link to this property](#)%20browser_rendering.devtools.browser.targets%20%3E%20(model)%20target_get_response%20%3E%20(schema)%20%3E%20(property)%20id>)

type: string

Target type (page, background\_page, worker, etc.).

[Link to this property](#)%20browser_rendering.devtools.browser.targets%20%3E%20(model)%20target_get_response%20%3E%20(schema)%20%3E%20(property)%20type>)

url: string

URL of the target.

[Link to this property](#)%20browser_rendering.devtools.browser.targets%20%3E%20(model)%20target_get_response%20%3E%20(schema)%20%3E%20(property)%20url>)

description: optional string

Target description.

[Link to this property](#)%20browser_rendering.devtools.browser.targets%20%3E%20(model)%20target_get_response%20%3E%20(schema)%20%3E%20(property)%20description>)

devtoolsFrontendUrl: optional string

DevTools frontend URL.

[Link to this property](#)%20browser_rendering.devtools.browser.targets%20%3E%20(model)%20target_get_response%20%3E%20(schema)%20%3E%20(property)%20devtoolsFrontendUrl>)

title: optional string

Title of the target.

[Link to this property](#)%20browser_rendering.devtools.browser.targets%20%3E%20(model)%20target_get_response%20%3E%20(schema)%20%3E%20(property)%20title>)

webSocketDebuggerUrl: optional string

WebSocket URL for debugging this target.

[Link to this property](#)%20browser_rendering.devtools.browser.targets%20%3E%20(model)%20target_get_response%20%3E%20(schema)%20%3E%20(property)%20webSocketDebuggerUrl>)

### Get a target by ID.

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser/$SESSION_ID/json/list/$TARGET_ID \
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