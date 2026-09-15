---
title: Kick all participants
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Realtime Kit](https://developers.cloudflare.com/api/resources/realtime_kit)

[Active Session](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/active-session)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Kick all participants

POST/accounts/{account\_id}/realtime/kit/{app\_id}/meetings/{meeting\_id}/active-session/kick-all

Kicks all participants from an active session for the given meeting ID.

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

[Link to this property](#)%20realtime_kit.active-session%20%3E%20(method)%20kick_all_participants%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

app\_id: string

The app identifier tag.

maxLength32

[Link to this property](#)%20realtime_kit.active-session%20%3E%20(method)%20kick_all_participants%20%3E%20(params)%20default%20%3E%20(param)%20app_id%20%3E%20(schema)>)

meeting\_id: string

[Link to this property](#)%20realtime_kit.active-session%20%3E%20(method)%20kick_all_participants%20%3E%20(params)%20default%20%3E%20(param)%20meeting_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

data: optional object {action, kicked\_participants\_count }

</summary>

action: optional string

<a href="#">Link to this property</a>

kicked\_participants\_count: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.active-session%20%3E%20(model)%20active_session_kick_all_participants_response%20%3E%20(schema)%20%3E%20(property)%20data>)

success: optional boolean

[Link to this property](#)%20realtime_kit.active-session%20%3E%20(model)%20active_session_kick_all_participants_response%20%3E%20(schema)%20%3E%20(property)%20success>)

### Kick all participants

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID/active-session/kick-all \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "data": {
    "action": "action",
    "kicked_participants_count": 0
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "data": {
    "action": "action",
    "kicked_participants_count": 0
  },
  "success": true
}
```