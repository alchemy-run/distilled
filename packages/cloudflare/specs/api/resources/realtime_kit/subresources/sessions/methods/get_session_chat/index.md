---
title: Fetch all chat messages of a session
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Realtime Kit](https://developers.cloudflare.com/api/resources/realtime_kit)

[Sessions](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/sessions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Fetch all chat messages of a session

GET/accounts/{account\_id}/realtime/kit/{app\_id}/sessions/{session\_id}/chat

Returns a URL to download all chat messages of the session ID in CSV format.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Realtime Admin``Realtime`

##### P ath ParametersExpand Collapse

account\_id: string

The account identifier tag.

maxLength32

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_session_chat%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

app\_id: string

The app identifier tag.

maxLength32

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_session_chat%20%3E%20(params)%20default%20%3E%20(param)%20app_id%20%3E%20(schema)>)

session\_id: string

formatuuid

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_session_chat%20%3E%20(params)%20default%20%3E%20(param)%20session_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

data: optional object {chat\_download\_url, chat\_download\_url\_expiry }

</summary>

chat\_download\_url: string

URL where the chat logs can be downloaded

<a href="#">Link to this property</a>

chat\_download\_url\_expiry: string

Time when the download URL will expire

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(model)%20session_get_session_chat_response%20%3E%20(schema)%20%3E%20(property)%20data>)

success: optional boolean

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(model)%20session_get_session_chat_response%20%3E%20(schema)%20%3E%20(property)%20success>)

### Fetch all chat messages of a session

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/sessions/$SESSION_ID/chat \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "data": {
    "chat_download_url": "chat_download_url",
    "chat_download_url_expiry": "chat_download_url_expiry"
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "data": {
    "chat_download_url": "chat_download_url",
    "chat_download_url_expiry": "chat_download_url_expiry"
  },
  "success": true
}
```