---
title: Connect to browser session.
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

# Connect to browser session.

GET/accounts/{account\_id}/browser-rendering/devtools/browser/{session\_id}

Establishes a WebSocket connection to an existing browser session.

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

[Link to this property](#)%20browser_rendering.devtools.browser%20%3E%20(method)%20connect%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

session\_id: string

Browser session ID to connect to.

formatuuid

[Link to this property](#)%20browser_rendering.devtools.browser%20%3E%20(method)%20connect%20%3E%20(params)%20default%20%3E%20(param)%20session_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

keep\_alive: optional number

Keep-alive time in ms (only valid when acquiring new session).

maximum1200000

minimum10000

[Link to this property](#)%20browser_rendering.devtools.browser%20%3E%20(method)%20connect%20%3E%20(params)%20default%20%3E%20(param)%20keep_alive%20%3E%20(schema)>)

lab: optional boolean

Use experimental browser.

[Link to this property](#)%20browser_rendering.devtools.browser%20%3E%20(method)%20connect%20%3E%20(params)%20default%20%3E%20(param)%20lab%20%3E%20(schema)>)

recording: optional boolean

[Link to this property](#)%20browser_rendering.devtools.browser%20%3E%20(method)%20connect%20%3E%20(params)%20default%20%3E%20(param)%20recording%20%3E%20(schema)>)

##### H eader ParametersExpand Collapse

"cf-brapi-guardrails": optional string

Optional base64url-encoded JSON connection guardrails (mode)

[Link to this property](#)%20browser_rendering.devtools.browser%20%3E%20(method)%20connect%20%3E%20(params)%20default%20%3E%20(param)%20cf-brapi-guardrails%20%3E%20(schema)>)

### Connect to browser session.

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser/$SESSION_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

##### Returns Examples