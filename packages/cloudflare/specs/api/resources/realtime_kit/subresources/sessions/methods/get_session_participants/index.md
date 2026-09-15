---
title: Fetch participants list of a session
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Realtime Kit](https://developers.cloudflare.com/api/resources/realtime_kit)

[Sessions](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/sessions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Fetch participants list of a session

GET/accounts/{account\_id}/realtime/kit/{app\_id}/sessions/{session\_id}/participants

Returns a list of participants for the given session ID.

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

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_session_participants%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

app\_id: string

The app identifier tag.

maxLength32

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_session_participants%20%3E%20(params)%20default%20%3E%20(param)%20app_id%20%3E%20(schema)>)

session\_id: string

formatuuid

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_session_participants%20%3E%20(params)%20default%20%3E%20(param)%20session_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

include\_peer\_events: optional boolean

if true, response includes all the peer events of participants.

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_session_participants%20%3E%20(params)%20default%20%3E%20(param)%20include_peer_events%20%3E%20(schema)>)

page\_no: optional number

The page number from which you want your page search results to be displayed.

minimum0

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_session_participants%20%3E%20(params)%20default%20%3E%20(param)%20page_no%20%3E%20(schema)>)

per\_page: optional number

Number of results per page.

maximum200

minimum1

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_session_participants%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

search: optional string

The search query string. You can search using participant ID, custom participant ID, or display name.

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_session_participants%20%3E%20(params)%20default%20%3E%20(param)%20search%20%3E%20(schema)>)

<details>

<summary>

sort\_by: optional "joinedAt"or "duration"

</summary>

One of the following:

"joinedAt"

<a href="#">Link to this property</a>

"duration"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_session_participants%20%3E%20(params)%20default%20%3E%20(param)%20sort_by%20%3E%20(schema)>)

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

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_session_participants%20%3E%20(params)%20default%20%3E%20(param)%20sort_order%20%3E%20(schema)>)

<details>

<summary>

view: optional "raw"or "consolidated"

In breakout room sessions, the view parameter can be set to <code>raw</code> for session specific duration for participants or <code>consolidated</code> to accumulate breakout room durations.

</summary>

One of the following:

"raw"

<a href="#">Link to this property</a>

"consolidated"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_session_participants%20%3E%20(params)%20default%20%3E%20(param)%20view%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

data: optional object {participants }

</summary>

<details>

<summary>

participants: optional array of object {id, created\_at, custom\_participant\_id, 8 more }

</summary>

id: optional string

Participant ID. This maps to the corresponding peerId.

<a href="#">Link to this property</a>

created\_at: optional string

timestamp when this participant was created.

<a href="#">Link to this property</a>

custom\_participant\_id: optional string

ID passed by client to create this participant.

<a href="#">Link to this property</a>

display\_name: optional string

Display name of participant when joining the session.

<a href="#">Link to this property</a>

duration: optional number

number of minutes for which the participant was in the session.

<a href="#">Link to this property</a>

joined\_at: optional string

timestamp at which participant joined the session.

<a href="#">Link to this property</a>

left\_at: optional string

timestamp at which participant left the session.

<a href="#">Link to this property</a>

<details>

<summary>

peer\_events: optional array of object {id, created\_at, event\_name, 7 more }

Connection lifecycle events for the participant’s peer. Only included when <code>include_peer_events</code> is true.

</summary>

id: optional string

ID of the peer event.

<a href="#">Link to this property</a>

created\_at: optional string

Timestamp when this peer event was created.

<a href="#">Link to this property</a>

<details>

<summary>

event\_name: optional "PEER\_CREATED"or "PEER\_JOINING"or "PEER\_LEAVING"

Name of the peer event.

</summary>

One of the following:

"PEER\_CREATED"

<a href="#">Link to this property</a>

"PEER\_JOINING"

<a href="#">Link to this property</a>

"PEER\_LEAVING"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

minutes\_consumed: optional number

Minutes consumed attributed to this event.

<a href="#">Link to this property</a>

participant\_id: optional string

ID of the participant this event belongs to.

<a href="#">Link to this property</a>

peer\_id: optional string

Peer ID this event belongs to.

<a href="#">Link to this property</a>

<details>

<summary>

preset\_view\_type: optional "GROUP\_CALL"or "WEBINAR"or "AUDIO\_ROOM"or 2 more

View type of the preset associated with the peer.

</summary>

One of the following:

"GROUP\_CALL"

<a href="#">Link to this property</a>

"WEBINAR"

<a href="#">Link to this property</a>

"AUDIO\_ROOM"

<a href="#">Link to this property</a>

"LIVESTREAM"

<a href="#">Link to this property</a>

"CHAT"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

session\_id: optional string

ID of the session this event belongs to.

<a href="#">Link to this property</a>

socket\_session\_id: optional string

ID of the socket session associated with this event.

<a href="#">Link to this property</a>

updated\_at: optional string

Timestamp when this peer event was last updated.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

preset\_name: optional string

Name of the preset associated with the participant.

<a href="#">Link to this property</a>

updated\_at: optional string

timestamp when this participant’s data was last updated.

<a href="#">Link to this property</a>

user\_id: optional string

User id for this participant.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(model)%20session_get_session_participants_response%20%3E%20(schema)%20%3E%20(property)%20data>)

success: optional boolean

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(model)%20session_get_session_participants_response%20%3E%20(schema)%20%3E%20(property)%20success>)

### Fetch participants list of a session

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/sessions/$SESSION_ID/participants \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

200 example

```
{
  "data": {
    "paging": {
      "end_offset": 2,
      "start_offset": 1,
      "total_count": 123
    },
    "participants": [
      {
        "created_at": "2023-02-01T10:51:08.039Z",
        "custom_participant_id": "83qi0i",
        "display_name": "Mark",
        "duration": 5.8097,
        "id": "005f4e0c-4d08-4d4e-a391-a76be75cd296",
        "joined_at": "2023-02-01T10:51:08.03Z",
        "left_at": "2023-02-01T10:56:56.612Z",
        "preset_name": "webinar_participant",
        "updated_at": "2023-02-01T10:56:56.618Z",
        "user_id": "0a08343d-a9dc-45f0-9feb-6a64afcc4f81"
      },
      {
        "created_at": "2023-02-01T10:50:36.853Z",
        "custom_participant_id": "3uggr",
        "display_name": "Henry",
        "duration": 6.9263,
        "id": "51fdf95f-d893-471a-922b-7db7adb14453",
        "joined_at": "2023-02-01T10:50:36.846Z\"",
        "left_at": "2023-02-01T10:57:32.424Z",
        "preset_name": "webinar_participant",
        "updated_at": "2023-02-01T10:57:32.431Z",
        "user_id": "85e7f0fd-7c16-45e9-9d68-f17ef007c4eb"
      }
    ]
  },
  "success": true
}
```

```
{
  "data": {
    "paging": {
      "end_offset": 2,
      "start_offset": 1,
      "total_count": 123
    },
    "participants": [
      {
        "created_at": "2023-02-01T10:51:08.039Z",
        "custom_participant_id": "83qi0i",
        "display_name": "Mark",
        "duration": 5.8097,
        "id": "005f4e0c-4d08-4d4e-a391-a76be75cd296",
        "joined_at": "2023-02-01T10:51:08.03Z",
        "left_at": "2023-02-01T10:56:56.612Z",
        "peer_events": [
          {
            "created_at": "2023-02-01T10:51:50.786Z",
            "event_name": "PEER_JOINING",
            "id": "94af3bac-f30b-40b9-ab45-4b9e6eff191a",
            "peer_id": "79d87ca5-7e47-452a-b3c1-b6842ad84bf5",
            "updated_at": "2023-02-01T10:51:50.792Z"
          },
          {
            "created_at": "2023-02-01T10:56:50.786Z",
            "event_name": "PEER_LEAVING",
            "id": "94af3bac-f30b-40b9-ab45-4b9e6eff191b",
            "peer_id": "79d87ca5-7e47-452a-b3c1-b6842ad84bf5",
            "updated_at": "2023-02-01T10:56:50.792Z"
          }
        ],
        "preset_name": "webinar_participant",
        "updated_at": "2023-02-01T10:56:56.618Z",
        "user_id": "0a08343d-a9dc-45f0-9feb-6a64afcc4f81"
      },
      {
        "created_at": "2023-02-01T10:50:36.853Z",
        "custom_participant_id": "3uggr",
        "display_name": "Henry",
        "duration": 6.9263,
        "id": "51fdf95f-d893-471a-922b-7db7adb14453",
        "joined_at": "2023-02-01T10:50:36.846Z\"",
        "left_at": "2023-02-01T10:57:32.424Z",
        "peer_events": [
          {
            "created_at": "2023-02-01T10:51:50.786Z",
            "event_name": "PEER_JOINING",
            "id": "94af3bac-f30b-40b9-ab45-4b9e6eff191a",
            "peer_id": "51fdf95f-d893-471a-922b-7db7adb14453",
            "updated_at": "2023-02-01T10:51:50.792Z"
          },
          {
            "created_at": "2023-02-01T10:56:50.786Z",
            "event_name": "PEER_LEAVING",
            "id": "94af3bac-f30b-40b9-ab45-4b9e6eff191b",
            "peer_id": "51fdf95f-d893-471a-922b-7db7adb14453",
            "updated_at": "2023-02-01T10:56:50.792Z"
          }
        ],
        "preset_name": "webinar_participant",
        "updated_at": "2023-02-01T10:57:32.431Z",
        "user_id": "85e7f0fd-7c16-45e9-9d68-f17ef007c4eb"
      }
    ]
  },
  "success": true
}
```

##### Returns Examples

200 example

200 example

```
{
  "data": {
    "paging": {
      "end_offset": 2,
      "start_offset": 1,
      "total_count": 123
    },
    "participants": [
      {
        "created_at": "2023-02-01T10:51:08.039Z",
        "custom_participant_id": "83qi0i",
        "display_name": "Mark",
        "duration": 5.8097,
        "id": "005f4e0c-4d08-4d4e-a391-a76be75cd296",
        "joined_at": "2023-02-01T10:51:08.03Z",
        "left_at": "2023-02-01T10:56:56.612Z",
        "preset_name": "webinar_participant",
        "updated_at": "2023-02-01T10:56:56.618Z",
        "user_id": "0a08343d-a9dc-45f0-9feb-6a64afcc4f81"
      },
      {
        "created_at": "2023-02-01T10:50:36.853Z",
        "custom_participant_id": "3uggr",
        "display_name": "Henry",
        "duration": 6.9263,
        "id": "51fdf95f-d893-471a-922b-7db7adb14453",
        "joined_at": "2023-02-01T10:50:36.846Z\"",
        "left_at": "2023-02-01T10:57:32.424Z",
        "preset_name": "webinar_participant",
        "updated_at": "2023-02-01T10:57:32.431Z",
        "user_id": "85e7f0fd-7c16-45e9-9d68-f17ef007c4eb"
      }
    ]
  },
  "success": true
}
```

```
{
  "data": {
    "paging": {
      "end_offset": 2,
      "start_offset": 1,
      "total_count": 123
    },
    "participants": [
      {
        "created_at": "2023-02-01T10:51:08.039Z",
        "custom_participant_id": "83qi0i",
        "display_name": "Mark",
        "duration": 5.8097,
        "id": "005f4e0c-4d08-4d4e-a391-a76be75cd296",
        "joined_at": "2023-02-01T10:51:08.03Z",
        "left_at": "2023-02-01T10:56:56.612Z",
        "peer_events": [
          {
            "created_at": "2023-02-01T10:51:50.786Z",
            "event_name": "PEER_JOINING",
            "id": "94af3bac-f30b-40b9-ab45-4b9e6eff191a",
            "peer_id": "79d87ca5-7e47-452a-b3c1-b6842ad84bf5",
            "updated_at": "2023-02-01T10:51:50.792Z"
          },
          {
            "created_at": "2023-02-01T10:56:50.786Z",
            "event_name": "PEER_LEAVING",
            "id": "94af3bac-f30b-40b9-ab45-4b9e6eff191b",
            "peer_id": "79d87ca5-7e47-452a-b3c1-b6842ad84bf5",
            "updated_at": "2023-02-01T10:56:50.792Z"
          }
        ],
        "preset_name": "webinar_participant",
        "updated_at": "2023-02-01T10:56:56.618Z",
        "user_id": "0a08343d-a9dc-45f0-9feb-6a64afcc4f81"
      },
      {
        "created_at": "2023-02-01T10:50:36.853Z",
        "custom_participant_id": "3uggr",
        "display_name": "Henry",
        "duration": 6.9263,
        "id": "51fdf95f-d893-471a-922b-7db7adb14453",
        "joined_at": "2023-02-01T10:50:36.846Z\"",
        "left_at": "2023-02-01T10:57:32.424Z",
        "peer_events": [
          {
            "created_at": "2023-02-01T10:51:50.786Z",
            "event_name": "PEER_JOINING",
            "id": "94af3bac-f30b-40b9-ab45-4b9e6eff191a",
            "peer_id": "51fdf95f-d893-471a-922b-7db7adb14453",
            "updated_at": "2023-02-01T10:51:50.792Z"
          },
          {
            "created_at": "2023-02-01T10:56:50.786Z",
            "event_name": "PEER_LEAVING",
            "id": "94af3bac-f30b-40b9-ab45-4b9e6eff191b",
            "peer_id": "51fdf95f-d893-471a-922b-7db7adb14453",
            "updated_at": "2023-02-01T10:56:50.792Z"
          }
        ],
        "preset_name": "webinar_participant",
        "updated_at": "2023-02-01T10:57:32.431Z",
        "user_id": "85e7f0fd-7c16-45e9-9d68-f17ef007c4eb"
      }
    ]
  },
  "success": true
}
```