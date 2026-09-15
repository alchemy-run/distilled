---
title: Fetch details of a participant
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Realtime Kit](https://developers.cloudflare.com/api/resources/realtime_kit)

[Sessions](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/sessions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Fetch details of a participant

GET/accounts/{account\_id}/realtime/kit/{app\_id}/sessions/{session\_id}/participants/{participant\_id}

Returns details of the given participant ID for the given session ID. Use the peer report endpoint to retrieve call statistics.

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

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_session_participant_details%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

app\_id: string

The app identifier tag.

maxLength32

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_session_participant_details%20%3E%20(params)%20default%20%3E%20(param)%20app_id%20%3E%20(schema)>)

session\_id: string

formatuuid

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_session_participant_details%20%3E%20(params)%20default%20%3E%20(param)%20session_id%20%3E%20(schema)>)

participant\_id: string

formatuuid

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_session_participant_details%20%3E%20(params)%20default%20%3E%20(param)%20participant_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

include\_peer\_events: optional boolean

if true, response includes all the peer events of participant.

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_session_participant_details%20%3E%20(params)%20default%20%3E%20(param)%20include_peer_events%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

data: optional object {participant }

</summary>

<details>

<summary>

participant: optional object {id, created\_at, custom\_participant\_id, 8 more }

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

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(model)%20session_get_session_participant_details_response%20%3E%20(schema)%20%3E%20(property)%20data>)

success: optional boolean

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(model)%20session_get_session_participant_details_response%20%3E%20(schema)%20%3E%20(property)%20success>)

### Fetch details of a participant

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/sessions/$SESSION_ID/participants/$PARTICIPANT_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "data": {
    "participant": {
      "id": "id",
      "created_at": "created_at",
      "custom_participant_id": "custom_participant_id",
      "display_name": "display_name",
      "duration": 0,
      "joined_at": "joined_at",
      "left_at": "left_at",
      "peer_events": [
        {
          "id": "id",
          "created_at": "created_at",
          "event_name": "PEER_CREATED",
          "minutes_consumed": 0,
          "participant_id": "participant_id",
          "peer_id": "peer_id",
          "preset_view_type": "GROUP_CALL",
          "session_id": "session_id",
          "socket_session_id": "socket_session_id",
          "updated_at": "updated_at"
        }
      ],
      "preset_name": "preset_name",
      "updated_at": "updated_at",
      "user_id": "user_id"
    }
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "data": {
    "participant": {
      "id": "id",
      "created_at": "created_at",
      "custom_participant_id": "custom_participant_id",
      "display_name": "display_name",
      "duration": 0,
      "joined_at": "joined_at",
      "left_at": "left_at",
      "peer_events": [
        {
          "id": "id",
          "created_at": "created_at",
          "event_name": "PEER_CREATED",
          "minutes_consumed": 0,
          "participant_id": "participant_id",
          "peer_id": "peer_id",
          "preset_view_type": "GROUP_CALL",
          "session_id": "session_id",
          "socket_session_id": "socket_session_id",
          "updated_at": "updated_at"
        }
      ],
      "preset_name": "preset_name",
      "updated_at": "updated_at",
      "user_id": "user_id"
    }
  },
  "success": true
}
```