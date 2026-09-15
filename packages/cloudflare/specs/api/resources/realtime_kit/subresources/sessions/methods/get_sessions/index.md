---
title: Fetch all sessions of an App
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Realtime Kit](https://developers.cloudflare.com/api/resources/realtime_kit)

[Sessions](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/sessions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Fetch all sessions of an App

GET/accounts/{account\_id}/realtime/kit/{app\_id}/sessions

Returns details of all sessions of an App.

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

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_sessions%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

app\_id: string

The app identifier tag.

maxLength32

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_sessions%20%3E%20(params)%20default%20%3E%20(param)%20app_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

associated\_id: optional string

ID of the meeting that sessions should be associated with

formatuuid

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_sessions%20%3E%20(params)%20default%20%3E%20(param)%20associated_id%20%3E%20(schema)>)

end\_time: optional string

The end time range for which you want to retrieve the meetings. The time must be specified in ISO format.

formatdate-time

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_sessions%20%3E%20(params)%20default%20%3E%20(param)%20end_time%20%3E%20(schema)>)

page\_no: optional number

The page number from which you want your page search results to be displayed.

minimum0

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_sessions%20%3E%20(params)%20default%20%3E%20(param)%20page_no%20%3E%20(schema)>)

participants: optional string

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_sessions%20%3E%20(params)%20default%20%3E%20(param)%20participants%20%3E%20(schema)>)

per\_page: optional number

Number of results per page

minimum0

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_sessions%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

search: optional string

Search string that matches sessions based on meeting title, meeting ID, and session ID

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_sessions%20%3E%20(params)%20default%20%3E%20(param)%20search%20%3E%20(schema)>)

<details>

<summary>

sort\_by: optional "minutesConsumed"or "createdAt"

</summary>

One of the following:

"minutesConsumed"

<a href="#">Link to this property</a>

"createdAt"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_sessions%20%3E%20(params)%20default%20%3E%20(param)%20sort_by%20%3E%20(schema)>)

<details>

<summary>

sort\_order: optional "ASC"or "DESC"

</summary>

One of the following:

"ASC"

<a href="#">Link to this property</a>

"DESC"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_sessions%20%3E%20(params)%20default%20%3E%20(param)%20sort_order%20%3E%20(schema)>)

start\_time: optional string

The start time range for which you want to retrieve the meetings. The time must be specified in ISO format.

formatdate-time

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_sessions%20%3E%20(params)%20default%20%3E%20(param)%20start_time%20%3E%20(schema)>)

<details>

<summary>

status: optional "LIVE"or "ENDED"

</summary>

One of the following:

"LIVE"

<a href="#">Link to this property</a>

"ENDED"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_sessions%20%3E%20(params)%20default%20%3E%20(param)%20status%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

data: optional object {sessions }

</summary>

<details>

<summary>

sessions: optional array of object {id, associated\_id, created\_at, 11 more }

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

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(model)%20session_get_sessions_response%20%3E%20(schema)%20%3E%20(property)%20data>)

<details>

<summary>

paging: optional object {end\_offset, start\_offset, total\_count }

</summary>

end\_offset: optional number

<a href="#">Link to this property</a>

start\_offset: optional number

<a href="#">Link to this property</a>

total\_count: optional number

minimum0

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(model)%20session_get_sessions_response%20%3E%20(schema)%20%3E%20(property)%20paging>)

success: optional boolean

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(model)%20session_get_sessions_response%20%3E%20(schema)%20%3E%20(property)%20success>)

### Fetch all sessions of an App

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/sessions \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "data": {
    "sessions": [
      {
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
      }
    ]
  },
  "paging": {
    "end_offset": 0,
    "start_offset": 0,
    "total_count": 0
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "data": {
    "sessions": [
      {
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
      }
    ]
  },
  "paging": {
    "end_offset": 0,
    "start_offset": 0,
    "total_count": 0
  },
  "success": true
}
```