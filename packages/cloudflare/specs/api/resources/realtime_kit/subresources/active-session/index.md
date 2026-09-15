---
title: Active Session
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Realtime Kit](https://developers.cloudflare.com/api/resources/realtime_kit)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Active Session

##### [Fetch details of an active session](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/active-session/methods/get_active_session)

GET/accounts/{account\_id}/realtime/kit/{app\_id}/meetings/{meeting\_id}/active-session

##### [Kick participants from an active session](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/active-session/methods/kick_participants)

POST/accounts/{account\_id}/realtime/kit/{app\_id}/meetings/{meeting\_id}/active-session/kick

##### [Kick all participants](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/active-session/methods/kick_all_participants)

POST/accounts/{account\_id}/realtime/kit/{app\_id}/meetings/{meeting\_id}/active-session/kick-all

##### [Create a poll](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/active-session/methods/create_poll)

POST/accounts/{account\_id}/realtime/kit/{app\_id}/meetings/{meeting\_id}/active-session/poll

##### ModelsExpand Collapse

<details>

<summary>

ActiveSessionGetActiveSessionResponse object {data, success }

</summary>

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

<a href="#">Link to this property</a>

success: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.active-session%20%3E%20(model)%20active_session_get_active_session_response%20%3E%20(schema)>)

<details>

<summary>

ActiveSessionKickParticipantsResponse object {data, success }

</summary>

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

<a href="#">Link to this property</a>

success: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.active-session%20%3E%20(model)%20active_session_kick_participants_response%20%3E%20(schema)>)

<details>

<summary>

ActiveSessionKickAllParticipantsResponse object {data, success }

</summary>

<details>

<summary>

data: optional object {action, kicked\_participants\_count }

</summary>

action: optional string

<a href="#">Link to this property</a>

kicked\_participants\_count: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.active-session%20%3E%20(model)%20active_session_kick_all_participants_response%20%3E%20(schema)>)

<details>

<summary>

ActiveSessionCreatePollResponse object {data, success }

</summary>

<details>

<summary>

data: optional object {action, poll }

</summary>

action: optional string

<a href="#">Link to this property</a>

<details>

<summary>

poll: optional object {id, options, question, 4 more }

</summary>

id: string

ID of the poll

<a href="#">Link to this property</a>

<details>

<summary>

options: array of object {count, text, votes }

Answer options

</summary>

count: number

<a href="#">Link to this property</a>

text: string

Text of the answer option

<a href="#">Link to this property</a>

<details>

<summary>

votes: array of object {id, name }

</summary>

id: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

question: string

Question asked by the poll

<a href="#">Link to this property</a>

anonymous: optional boolean

<a href="#">Link to this property</a>

created\_by: optional string

<a href="#">Link to this property</a>

hide\_votes: optional boolean

<a href="#">Link to this property</a>

voted: optional array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.active-session%20%3E%20(model)%20active_session_create_poll_response%20%3E%20(schema)>)