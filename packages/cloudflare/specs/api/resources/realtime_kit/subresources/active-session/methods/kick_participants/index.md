---
title: Kick participants from an active session
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Realtime Kit](https://developers.cloudflare.com/api/resources/realtime_kit)

[Active Session](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/active-session)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Kick participants from an active session

POST/accounts/{account\_id}/realtime/kit/{app\_id}/meetings/{meeting\_id}/active-session/kick

Kicks one or more participants from an active session using user ID or custom participant ID.

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

[Link to this property](#)%20realtime_kit.active-session%20%3E%20(method)%20kick_participants%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

app\_id: string

The app identifier tag.

maxLength32

[Link to this property](#)%20realtime_kit.active-session%20%3E%20(method)%20kick_participants%20%3E%20(params)%20default%20%3E%20(param)%20app_id%20%3E%20(schema)>)

meeting\_id: string

[Link to this property](#)%20realtime_kit.active-session%20%3E%20(method)%20kick_participants%20%3E%20(params)%20default%20%3E%20(param)%20meeting_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

custom\_participant\_ids: optional array of string

[Link to this property](#)%20realtime_kit.active-session%20%3E%20(method)%20kick_participants%20%3E%20(params)%200%20%3E%20(param)%20custom_participant_ids%20%3E%20(schema)>)

participant\_ids: optional array of string

[Link to this property](#)%20realtime_kit.active-session%20%3E%20(method)%20kick_participants%20%3E%20(params)%200%20%3E%20(param)%20participant_ids%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

data: optional object {action, participants }

</summary>

action: optional string

<a href="#">Link to this property</a>

<details>

<summary>

participants: optional array of object {id, created\_at, updated\_at, 3 more }

</summary>

id: string

ID of the session participant

<a href="#">Link to this property</a>

created\_at: string

<a href="#">Link to this property</a>

updated\_at: string

<a href="#">Link to this property</a>

email: optional string

Email of the session participant.

<a href="#">Link to this property</a>

name: optional string

Name of the session participant.

<a href="#">Link to this property</a>

picture: optional string

A URL pointing to a picture of the participant.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.active-session%20%3E%20(model)%20active_session_kick_participants_response%20%3E%20(schema)%20%3E%20(property)%20data>)

success: optional boolean

[Link to this property](#)%20realtime_kit.active-session%20%3E%20(model)%20active_session_kick_participants_response%20%3E%20(schema)%20%3E%20(property)%20success>)

### Kick participants from an active session

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID/active-session/kick \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
```

200 example

404 example

```
{
  "data": {
    "action": "action",
    "participants": [
      {
        "id": "id",
        "created_at": "created_at",
        "updated_at": "updated_at",
        "email": "email",
        "name": "name",
        "picture": "picture"
      }
    ]
  },
  "success": true
}
```

```
{
  "error": {
    "code": 404,
    "message": "No user found with id 813432c7-3c5a-45e2-9acf-eef7061c7584"
  },
  "success": false
}
```

##### Returns Examples

200 example

404 example

```
{
  "data": {
    "action": "action",
    "participants": [
      {
        "id": "id",
        "created_at": "created_at",
        "updated_at": "updated_at",
        "email": "email",
        "name": "name",
        "picture": "picture"
      }
    ]
  },
  "success": true
}
```

```
{
  "error": {
    "code": 404,
    "message": "No user found with id 813432c7-3c5a-45e2-9acf-eef7061c7584"
  },
  "success": false
}
```