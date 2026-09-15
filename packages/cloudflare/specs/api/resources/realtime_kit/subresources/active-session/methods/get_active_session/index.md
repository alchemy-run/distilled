---
title: Fetch details of an active session
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Realtime Kit](https://developers.cloudflare.com/api/resources/realtime_kit)

[Active Session](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/active-session)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Fetch details of an active session

GET/accounts/{account\_id}/realtime/kit/{app\_id}/meetings/{meeting\_id}/active-session

Returns details of an ongoing active session for the given meeting ID.

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

[Link to this property](#)%20realtime_kit.active-session%20%3E%20(method)%20get_active_session%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

app\_id: string

The app identifier tag.

maxLength32

[Link to this property](#)%20realtime_kit.active-session%20%3E%20(method)%20get_active_session%20%3E%20(params)%20default%20%3E%20(param)%20app_id%20%3E%20(schema)>)

meeting\_id: string

[Link to this property](#)%20realtime_kit.active-session%20%3E%20(method)%20get_active_session%20%3E%20(params)%20default%20%3E%20(param)%20meeting_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

data: optional object {id, associated\_id, created\_at, 11 more }

</summary>

id: string

ID of the session

<a href="#">Link to this property</a>

associated\_id: string

ID of the meeting this session is associated with. In the case of V2 meetings, it is always a UUID. In V1 meetings, it is a room name of the form <code>abcdef-ghijkl</code>

<a href="#">Link to this property</a>

created\_at: string

timestamp when session created

<a href="#">Link to this property</a>

live\_participants: number

number of participants currently in the session

<a href="#">Link to this property</a>

max\_concurrent\_participants: number

number of maximum participants that were in the session

<a href="#">Link to this property</a>

meeting\_display\_name: string

Title of the meeting this session belongs to

<a href="#">Link to this property</a>

minutes\_consumed: number

number of minutes consumed since the session started

<a href="#">Link to this property</a>

organization\_id: string

App id that hosted this session

<a href="#">Link to this property</a>

started\_at: string

timestamp when session started

<a href="#">Link to this property</a>

<details>

<summary>

status: "LIVE"or "ENDED"

current status of session

</summary>

One of the following:

"LIVE"

<a href="#">Link to this property</a>

"ENDED"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

type: "meeting"or "livestream"or "participant"

type of session

</summary>

One of the following:

"meeting"

<a href="#">Link to this property</a>

"livestream"

<a href="#">Link to this property</a>

"participant"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: string

timestamp when session was last updated

<a href="#">Link to this property</a>

breakout\_rooms: optional array of unknown

<a href="#">Link to this property</a>

ended\_at: optional string

timestamp when session ended

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.active-session%20%3E%20(model)%20active_session_get_active_session_response%20%3E%20(schema)%20%3E%20(property)%20data>)

success: optional boolean

[Link to this property](#)%20realtime_kit.active-session%20%3E%20(model)%20active_session_get_active_session_response%20%3E%20(schema)%20%3E%20(property)%20success>)

### Fetch details of an active session

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID/active-session \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

404 example

```
{
  "data": {
    "id": "id",
    "associated_id": "associated_id",
    "created_at": "created_at",
    "live_participants": 0,
    "max_concurrent_participants": 0,
    "meeting_display_name": "meeting_display_name",
    "minutes_consumed": 0,
    "organization_id": "organization_id",
    "started_at": "started_at",
    "status": "LIVE",
    "type": "meeting",
    "updated_at": "updated_at",
    "breakout_rooms": [
      {}
    ],
    "ended_at": "ended_at"
  },
  "success": true
}
```

```
{
  "error": {
    "code": 404,
    "message": "No active session found for meeting_id 6bf2b8be-04dd-4191-b602-1128921a306b"
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
    "id": "id",
    "associated_id": "associated_id",
    "created_at": "created_at",
    "live_participants": 0,
    "max_concurrent_participants": 0,
    "meeting_display_name": "meeting_display_name",
    "minutes_consumed": 0,
    "organization_id": "organization_id",
    "started_at": "started_at",
    "status": "LIVE",
    "type": "meeting",
    "updated_at": "updated_at",
    "breakout_rooms": [
      {}
    ],
    "ended_at": "ended_at"
  },
  "success": true
}
```

```
{
  "error": {
    "code": 404,
    "message": "No active session found for meeting_id 6bf2b8be-04dd-4191-b602-1128921a306b"
  },
  "success": false
}
```