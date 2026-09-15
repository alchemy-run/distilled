---
title: Sessions
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Realtime Kit](https://developers.cloudflare.com/api/resources/realtime_kit)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Sessions

##### [Fetch all sessions of an App](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/sessions/methods/get_sessions)

GET/accounts/{account\_id}/realtime/kit/{app\_id}/sessions

##### [Fetch details of a session](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/sessions/methods/get_session_details)

GET/accounts/{account\_id}/realtime/kit/{app\_id}/sessions/{session\_id}

##### [Fetch participants list of a session](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/sessions/methods/get_session_participants)

GET/accounts/{account\_id}/realtime/kit/{app\_id}/sessions/{session\_id}/participants

##### [Fetch details of a participant](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/sessions/methods/get_session_participant_details)

GET/accounts/{account\_id}/realtime/kit/{app\_id}/sessions/{session\_id}/participants/{participant\_id}

##### [Fetch all chat messages of a session](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/sessions/methods/get_session_chat)

GET/accounts/{account\_id}/realtime/kit/{app\_id}/sessions/{session\_id}/chat

##### [Fetch the complete transcript for a session](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/sessions/methods/get_session_transcripts)

GET/accounts/{account\_id}/realtime/kit/{app\_id}/sessions/{session\_id}/transcript

##### [Fetch summary of transcripts for a session](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/sessions/methods/get_session_summary)

GET/accounts/{account\_id}/realtime/kit/{app\_id}/sessions/{session\_id}/summary

##### [Generate summary of Transcripts for the session](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/sessions/methods/generate_summary_of_transcripts)

POST/accounts/{account\_id}/realtime/kit/{app\_id}/sessions/{session\_id}/summary

##### [Fetch details of peer](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/sessions/methods/get_participant_data_from_peer_id)

GET/accounts/{account\_id}/realtime/kit/{app\_id}/sessions/peer-report/{peer\_id}

##### ModelsExpand Collapse

<details>

<summary>

SessionGetSessionsResponse object {data, paging, success }

</summary>

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

<a href="#">Link to this property</a>

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

<a href="#">Link to this property</a>

success: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(model)%20session_get_sessions_response%20%3E%20(schema)>)

<details>

<summary>

SessionGetSessionDetailsResponse object {data, success }

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

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(model)%20session_get_session_details_response%20%3E%20(schema)>)

<details>

<summary>

SessionGetSessionParticipantsResponse object {data, success }

</summary>

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

<a href="#">Link to this property</a>

success: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(model)%20session_get_session_participants_response%20%3E%20(schema)>)

<details>

<summary>

SessionGetSessionParticipantDetailsResponse object {data, success }

</summary>

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

<a href="#">Link to this property</a>

success: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(model)%20session_get_session_participant_details_response%20%3E%20(schema)>)

<details>

<summary>

SessionGetSessionChatResponse object {data, success }

</summary>

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

<a href="#">Link to this property</a>

success: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(model)%20session_get_session_chat_response%20%3E%20(schema)>)

<details>

<summary>

SessionGetSessionTranscriptsResponse object {data, success }

</summary>

<details>

<summary>

data: optional object {sessionId, transcript\_download\_url, transcript\_download\_url\_expiry }

</summary>

sessionId: string

<a href="#">Link to this property</a>

transcript\_download\_url: string

URL where the transcript can be downloaded

<a href="#">Link to this property</a>

transcript\_download\_url\_expiry: string

Time when the download URL will expire

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(model)%20session_get_session_transcripts_response%20%3E%20(schema)>)

<details>

<summary>

SessionGetSessionSummaryResponse object {data, success }

</summary>

<details>

<summary>

data: optional object {sessionId, summaryDownloadUrl, summaryDownloadUrlExpiry }

</summary>

sessionId: string

<a href="#">Link to this property</a>

summaryDownloadUrl: string

URL where the summary of transcripts can be downloaded

<a href="#">Link to this property</a>

summaryDownloadUrlExpiry: string

Time of Expiry before when you need to download the csv file.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(model)%20session_get_session_summary_response%20%3E%20(schema)>)

<details>

<summary>

SessionGenerateSummaryOfTranscriptsResponse object {data, success }

</summary>

<details>

<summary>

data: optional object {session\_id, status }

</summary>

session\_id: optional string

formatuuid

<a href="#">Link to this property</a>

status: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(model)%20session_generate_summary_of_transcripts_response%20%3E%20(schema)>)

<details>

<summary>

SessionGetParticipantDataFromPeerIDResponse object {data, success }

</summary>

<details>

<summary>

data: optional object {participant }

</summary>

<details>

<summary>

participant: optional object {id, created\_at, custom\_participant\_id, 10 more }

</summary>

id: optional string

ID of the participant.

formatuuid

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

Connection lifecycle events for the participant’s peer.

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

<details>

<summary>

peer\_report: optional object {metadata, quality }

Peer call statistics report.

</summary>

<details>

<summary>

metadata: optional object {audio\_devices\_updates, browser\_metadata, candidate\_pairs, 12 more }

Connection and device metadata for the participant.

</summary>

<details>

<summary>

audio\_devices\_updates: optional array of object {added, removed, timestamp }

</summary>

<details>

<summary>

added: optional array of object {device\_id, kind, label }

Devices that became available.

</summary>

device\_id: optional string

ID of the device.

<a href="#">Link to this property</a>

kind: optional string

Kind of device, for example audioinput or videoinput.

<a href="#">Link to this property</a>

label: optional string

Human-readable label of the device.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

removed: optional array of object {device\_id, kind, label }

Devices that became unavailable.

</summary>

device\_id: optional string

ID of the device.

<a href="#">Link to this property</a>

kind: optional string

Kind of device, for example audioinput or videoinput.

<a href="#">Link to this property</a>

label: optional string

Human-readable label of the device.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

timestamp: optional string

Timestamp of the device update.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

browser\_metadata: optional object {browser, browser\_version, engine, 2 more }

</summary>

browser: optional string

<a href="#">Link to this property</a>

browser\_version: optional string

<a href="#">Link to this property</a>

engine: optional string

<a href="#">Link to this property</a>

user\_agent: optional string

<a href="#">Link to this property</a>

webgl\_support: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

candidate\_pairs: optional object {consuming\_transport, producing\_transport }

</summary>

<details>

<summary>

consuming\_transport: optional array of object {available\_incoming\_bitrate, available\_outgoing\_bitrate, bytes\_discarded\_on\_send, 25 more }

</summary>

available\_incoming\_bitrate: optional number

<a href="#">Link to this property</a>

available\_outgoing\_bitrate: optional number

<a href="#">Link to this property</a>

bytes\_discarded\_on\_send: optional number

<a href="#">Link to this property</a>

bytes\_received: optional number

<a href="#">Link to this property</a>

bytes\_sent: optional number

<a href="#">Link to this property</a>

current\_round\_trip\_time: optional number

<a href="#">Link to this property</a>

last\_packet\_received\_timestamp: optional number

Epoch milliseconds when the last packet was received.

<a href="#">Link to this property</a>

last\_packet\_sent\_timestamp: optional number

Epoch milliseconds when the last packet was sent.

<a href="#">Link to this property</a>

local\_candidate\_address: optional string

<a href="#">Link to this property</a>

local\_candidate\_id: optional string

<a href="#">Link to this property</a>

local\_candidate\_network\_type: optional string

<a href="#">Link to this property</a>

local\_candidate\_port: optional number

<a href="#">Link to this property</a>

local\_candidate\_protocol: optional string

<a href="#">Link to this property</a>

local\_candidate\_related\_address: optional string

<a href="#">Link to this property</a>

local\_candidate\_related\_port: optional number

<a href="#">Link to this property</a>

local\_candidate\_type: optional string

<a href="#">Link to this property</a>

local\_candidate\_url: optional string

<a href="#">Link to this property</a>

nominated: optional boolean

<a href="#">Link to this property</a>

packets\_discarded\_on\_send: optional number

<a href="#">Link to this property</a>

packets\_received: optional number

<a href="#">Link to this property</a>

packets\_sent: optional number

<a href="#">Link to this property</a>

remote\_candidate\_address: optional string

<a href="#">Link to this property</a>

remote\_candidate\_id: optional string

<a href="#">Link to this property</a>

remote\_candidate\_port: optional number

<a href="#">Link to this property</a>

remote\_candidate\_protocol: optional string

<a href="#">Link to this property</a>

remote\_candidate\_type: optional string

<a href="#">Link to this property</a>

remote\_candidate\_url: optional string

<a href="#">Link to this property</a>

total\_round\_trip\_time: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

producing\_transport: optional array of object {available\_incoming\_bitrate, available\_outgoing\_bitrate, bytes\_discarded\_on\_send, 25 more }

</summary>

available\_incoming\_bitrate: optional number

<a href="#">Link to this property</a>

available\_outgoing\_bitrate: optional number

<a href="#">Link to this property</a>

bytes\_discarded\_on\_send: optional number

<a href="#">Link to this property</a>

bytes\_received: optional number

<a href="#">Link to this property</a>

bytes\_sent: optional number

<a href="#">Link to this property</a>

current\_round\_trip\_time: optional number

<a href="#">Link to this property</a>

last\_packet\_received\_timestamp: optional number

Epoch milliseconds when the last packet was received.

<a href="#">Link to this property</a>

last\_packet\_sent\_timestamp: optional number

Epoch milliseconds when the last packet was sent.

<a href="#">Link to this property</a>

local\_candidate\_address: optional string

<a href="#">Link to this property</a>

local\_candidate\_id: optional string

<a href="#">Link to this property</a>

local\_candidate\_network\_type: optional string

<a href="#">Link to this property</a>

local\_candidate\_port: optional number

<a href="#">Link to this property</a>

local\_candidate\_protocol: optional string

<a href="#">Link to this property</a>

local\_candidate\_related\_address: optional string

<a href="#">Link to this property</a>

local\_candidate\_related\_port: optional number

<a href="#">Link to this property</a>

local\_candidate\_type: optional string

<a href="#">Link to this property</a>

local\_candidate\_url: optional string

<a href="#">Link to this property</a>

nominated: optional boolean

<a href="#">Link to this property</a>

packets\_discarded\_on\_send: optional number

<a href="#">Link to this property</a>

packets\_received: optional number

<a href="#">Link to this property</a>

packets\_sent: optional number

<a href="#">Link to this property</a>

remote\_candidate\_address: optional string

<a href="#">Link to this property</a>

remote\_candidate\_id: optional string

<a href="#">Link to this property</a>

remote\_candidate\_port: optional number

<a href="#">Link to this property</a>

remote\_candidate\_protocol: optional string

<a href="#">Link to this property</a>

remote\_candidate\_type: optional string

<a href="#">Link to this property</a>

remote\_candidate\_url: optional string

<a href="#">Link to this property</a>

total\_round\_trip\_time: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

device\_info: optional object {cpus, is\_mobile, os, os\_version }

</summary>

cpus: optional number

<a href="#">Link to this property</a>

is\_mobile: optional boolean

<a href="#">Link to this property</a>

os: optional string

<a href="#">Link to this property</a>

os\_version: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

events: optional array of object {metadata, name, timestamp }

</summary>

<details>

<summary>

metadata: optional map\[stringor numberor boolean]

Event-specific metadata. Keys vary per event; values are primitive scalars (string, number, boolean, or null).

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Name of the event.

<a href="#">Link to this property</a>

timestamp: optional string

Timestamp when the event occurred.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ip\_information: optional object {asn, city, country, 4 more }

</summary>

<details>

<summary>

asn: optional object {asn, domain, name, 2 more }

</summary>

asn: optional string

<a href="#">Link to this property</a>

domain: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

route: optional string

<a href="#">Link to this property</a>

type: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

city: optional string

<a href="#">Link to this property</a>

country: optional string

<a href="#">Link to this property</a>

ipv4: optional string

<a href="#">Link to this property</a>

org: optional string

<a href="#">Link to this property</a>

region: optional string

<a href="#">Link to this property</a>

timezone: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

native\_metadata: optional object {audio\_encoder, video\_encoder }

</summary>

audio\_encoder: optional string

<a href="#">Link to this property</a>

video\_encoder: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

pc\_metadata: optional array of object {effective\_network\_type, reflexive\_connectivity, relay\_connectivity, 3 more }

</summary>

effective\_network\_type: optional string

<a href="#">Link to this property</a>

reflexive\_connectivity: optional boolean

<a href="#">Link to this property</a>

relay\_connectivity: optional boolean

<a href="#">Link to this property</a>

sdp: optional array of string

<a href="#">Link to this property</a>

timestamp: optional string

<a href="#">Link to this property</a>

turn\_connectivity: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

room\_view\_type: optional string

<a href="#">Link to this property</a>

sdk\_name: optional string

<a href="#">Link to this property</a>

sdk\_type: optional string

<a href="#">Link to this property</a>

sdk\_version: optional string

<a href="#">Link to this property</a>

<details>

<summary>

selected\_device\_updates: optional array of object {device, timestamp }

</summary>

<details>

<summary>

device: optional object {device\_id, kind, label }

A media device (camera, microphone, or speaker).

</summary>

device\_id: optional string

ID of the device.

<a href="#">Link to this property</a>

kind: optional string

Kind of device, for example audioinput or videoinput.

<a href="#">Link to this property</a>

label: optional string

Human-readable label of the device.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

timestamp: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

speaker\_devices\_updates: optional array of object {added, removed, timestamp }

</summary>

<details>

<summary>

added: optional array of object {device\_id, kind, label }

Devices that became available.

</summary>

device\_id: optional string

ID of the device.

<a href="#">Link to this property</a>

kind: optional string

Kind of device, for example audioinput or videoinput.

<a href="#">Link to this property</a>

label: optional string

Human-readable label of the device.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

removed: optional array of object {device\_id, kind, label }

Devices that became unavailable.

</summary>

device\_id: optional string

ID of the device.

<a href="#">Link to this property</a>

kind: optional string

Kind of device, for example audioinput or videoinput.

<a href="#">Link to this property</a>

label: optional string

Human-readable label of the device.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

timestamp: optional string

Timestamp of the device update.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

video\_devices\_updates: optional array of object {added, removed, timestamp }

</summary>

<details>

<summary>

added: optional array of object {device\_id, kind, label }

Devices that became available.

</summary>

device\_id: optional string

ID of the device.

<a href="#">Link to this property</a>

kind: optional string

Kind of device, for example audioinput or videoinput.

<a href="#">Link to this property</a>

label: optional string

Human-readable label of the device.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

removed: optional array of object {device\_id, kind, label }

Devices that became unavailable.

</summary>

device\_id: optional string

ID of the device.

<a href="#">Link to this property</a>

kind: optional string

Kind of device, for example audioinput or videoinput.

<a href="#">Link to this property</a>

label: optional string

Human-readable label of the device.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

timestamp: optional string

Timestamp of the device update.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

quality: optional object {audio\_consumer, audio\_consumer\_cumulative, audio\_producer, 13 more }

Media quality statistics for the participant.

</summary>

<details>

<summary>

audio\_consumer: optional array of object {bytes\_received, concealment\_events, consumer\_id, 11 more }

</summary>

bytes\_received: optional number

<a href="#">Link to this property</a>

concealment\_events: optional number

<a href="#">Link to this property</a>

consumer\_id: optional string

<a href="#">Link to this property</a>

jitter: optional number

<a href="#">Link to this property</a>

jitter\_buffer\_delay: optional number

<a href="#">Link to this property</a>

jitter\_buffer\_emitted\_count: optional number

<a href="#">Link to this property</a>

mid: optional string

<a href="#">Link to this property</a>

mos\_quality: optional number

<a href="#">Link to this property</a>

packets\_lost: optional number

<a href="#">Link to this property</a>

packets\_received: optional number

<a href="#">Link to this property</a>

peer\_id: optional string

<a href="#">Link to this property</a>

producer\_id: optional string

<a href="#">Link to this property</a>

ssrc: optional number

<a href="#">Link to this property</a>

timestamp: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

audio\_consumer\_cumulative: optional object {jitter\_buffer\_delay, packet\_loss, quality\_mos }

Aggregated inbound (consumer) audio statistics for the session.

</summary>

<details>

<summary>

jitter\_buffer\_delay: optional object {"100ms\_or\_greater\_event\_fraction", "250ms\_or\_greater\_event\_fraction", "500ms\_or\_greater\_event\_fraction", avg }

Cumulative latency distribution (milliseconds-based thresholds).

</summary>

"100ms\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"250ms\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"500ms\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

avg: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

packet\_loss: optional object {"10\_or\_greater\_event\_fraction", "25\_or\_greater\_event\_fraction", "5\_or\_greater\_event\_fraction", 2 more }

Cumulative packet loss distribution.

</summary>

"10\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"25\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"5\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"50\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

avg: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

quality\_mos: optional object {avg, p50, p75, p90 }

Distribution summary with average and percentiles.

</summary>

avg: optional number

<a href="#">Link to this property</a>

p50: optional number

<a href="#">Link to this property</a>

p75: optional number

<a href="#">Link to this property</a>

p90: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

audio\_producer: optional array of object {bytes\_sent, jitter, mid, 7 more }

</summary>

bytes\_sent: optional number

<a href="#">Link to this property</a>

jitter: optional number

<a href="#">Link to this property</a>

mid: optional string

<a href="#">Link to this property</a>

mos\_quality: optional number

<a href="#">Link to this property</a>

packets\_lost: optional number

<a href="#">Link to this property</a>

packets\_sent: optional number

<a href="#">Link to this property</a>

producer\_id: optional string

<a href="#">Link to this property</a>

rtt: optional number

<a href="#">Link to this property</a>

ssrc: optional number

<a href="#">Link to this property</a>

timestamp: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

audio\_producer\_cumulative: optional object {packet\_loss, quality\_mos, rtt }

Aggregated outbound (producer) audio statistics for the session.

</summary>

<details>

<summary>

packet\_loss: optional object {"10\_or\_greater\_event\_fraction", "25\_or\_greater\_event\_fraction", "5\_or\_greater\_event\_fraction", 2 more }

Cumulative packet loss distribution.

</summary>

"10\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"25\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"5\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"50\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

avg: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

quality\_mos: optional object {avg, p50, p75, p90 }

Distribution summary with average and percentiles.

</summary>

avg: optional number

<a href="#">Link to this property</a>

p50: optional number

<a href="#">Link to this property</a>

p75: optional number

<a href="#">Link to this property</a>

p90: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

rtt: optional object {"100ms\_or\_greater\_event\_fraction", "250ms\_or\_greater\_event\_fraction", "500ms\_or\_greater\_event\_fraction", avg }

Cumulative latency distribution (milliseconds-based thresholds).

</summary>

"100ms\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"250ms\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"500ms\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

avg: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

screenshare\_audio\_consumer: optional array of object {bytes\_received, concealment\_events, consumer\_id, 11 more }

</summary>

bytes\_received: optional number

<a href="#">Link to this property</a>

concealment\_events: optional number

<a href="#">Link to this property</a>

consumer\_id: optional string

<a href="#">Link to this property</a>

jitter: optional number

<a href="#">Link to this property</a>

jitter\_buffer\_delay: optional number

<a href="#">Link to this property</a>

jitter\_buffer\_emitted\_count: optional number

<a href="#">Link to this property</a>

mid: optional string

<a href="#">Link to this property</a>

mos\_quality: optional number

<a href="#">Link to this property</a>

packets\_lost: optional number

<a href="#">Link to this property</a>

packets\_received: optional number

<a href="#">Link to this property</a>

peer\_id: optional string

<a href="#">Link to this property</a>

producer\_id: optional string

<a href="#">Link to this property</a>

ssrc: optional number

<a href="#">Link to this property</a>

timestamp: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

screenshare\_audio\_consumer\_cumulative: optional object {jitter\_buffer\_delay, packet\_loss, quality\_mos }

Aggregated inbound (consumer) audio statistics for the session.

</summary>

<details>

<summary>

jitter\_buffer\_delay: optional object {"100ms\_or\_greater\_event\_fraction", "250ms\_or\_greater\_event\_fraction", "500ms\_or\_greater\_event\_fraction", avg }

Cumulative latency distribution (milliseconds-based thresholds).

</summary>

"100ms\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"250ms\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"500ms\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

avg: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

packet\_loss: optional object {"10\_or\_greater\_event\_fraction", "25\_or\_greater\_event\_fraction", "5\_or\_greater\_event\_fraction", 2 more }

Cumulative packet loss distribution.

</summary>

"10\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"25\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"5\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"50\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

avg: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

quality\_mos: optional object {avg, p50, p75, p90 }

Distribution summary with average and percentiles.

</summary>

avg: optional number

<a href="#">Link to this property</a>

p50: optional number

<a href="#">Link to this property</a>

p75: optional number

<a href="#">Link to this property</a>

p90: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

screenshare\_audio\_producer: optional array of object {bytes\_sent, jitter, mid, 7 more }

</summary>

bytes\_sent: optional number

<a href="#">Link to this property</a>

jitter: optional number

<a href="#">Link to this property</a>

mid: optional string

<a href="#">Link to this property</a>

mos\_quality: optional number

<a href="#">Link to this property</a>

packets\_lost: optional number

<a href="#">Link to this property</a>

packets\_sent: optional number

<a href="#">Link to this property</a>

producer\_id: optional string

<a href="#">Link to this property</a>

rtt: optional number

<a href="#">Link to this property</a>

ssrc: optional number

<a href="#">Link to this property</a>

timestamp: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

screenshare\_audio\_producer\_cumulative: optional object {packet\_loss, quality\_mos, rtt }

Aggregated outbound (producer) audio statistics for the session.

</summary>

<details>

<summary>

packet\_loss: optional object {"10\_or\_greater\_event\_fraction", "25\_or\_greater\_event\_fraction", "5\_or\_greater\_event\_fraction", 2 more }

Cumulative packet loss distribution.

</summary>

"10\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"25\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"5\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"50\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

avg: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

quality\_mos: optional object {avg, p50, p75, p90 }

Distribution summary with average and percentiles.

</summary>

avg: optional number

<a href="#">Link to this property</a>

p50: optional number

<a href="#">Link to this property</a>

p75: optional number

<a href="#">Link to this property</a>

p90: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

rtt: optional object {"100ms\_or\_greater\_event\_fraction", "250ms\_or\_greater\_event\_fraction", "500ms\_or\_greater\_event\_fraction", avg }

Cumulative latency distribution (milliseconds-based thresholds).

</summary>

"100ms\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"250ms\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"500ms\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

avg: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

screenshare\_video\_consumer: optional array of object {bytes\_received, consumer\_id, fir\_count, 17 more }

</summary>

bytes\_received: optional number

<a href="#">Link to this property</a>

consumer\_id: optional string

<a href="#">Link to this property</a>

fir\_count: optional number

<a href="#">Link to this property</a>

frame\_height: optional number

<a href="#">Link to this property</a>

frame\_width: optional number

<a href="#">Link to this property</a>

frames\_decoded: optional number

<a href="#">Link to this property</a>

frames\_dropped: optional number

<a href="#">Link to this property</a>

frames\_per\_second: optional number

<a href="#">Link to this property</a>

jitter: optional number

<a href="#">Link to this property</a>

jitter\_buffer\_delay: optional number

<a href="#">Link to this property</a>

jitter\_buffer\_emitted\_count: optional number

<a href="#">Link to this property</a>

key\_frames\_decoded: optional number

<a href="#">Link to this property</a>

mid: optional string

<a href="#">Link to this property</a>

mos\_quality: optional number

<a href="#">Link to this property</a>

packets\_lost: optional number

<a href="#">Link to this property</a>

packets\_received: optional number

<a href="#">Link to this property</a>

peer\_id: optional string

<a href="#">Link to this property</a>

producer\_id: optional string

<a href="#">Link to this property</a>

ssrc: optional number

<a href="#">Link to this property</a>

timestamp: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

screenshare\_video\_consumer\_cumulative: optional object {frame\_per\_second, frame\_width, issues, 4 more }

Aggregated inbound (consumer) video statistics for the session.

</summary>

<details>

<summary>

frame\_per\_second: optional object {avg, p50, p75, p90 }

Distribution summary with average and percentiles.

</summary>

avg: optional number

<a href="#">Link to this property</a>

p50: optional number

<a href="#">Link to this property</a>

p75: optional number

<a href="#">Link to this property</a>

p90: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

frame\_width: optional object {avg, p50, p75, p90 }

Distribution summary with average and percentiles.

</summary>

avg: optional number

<a href="#">Link to this property</a>

p50: optional number

<a href="#">Link to this property</a>

p75: optional number

<a href="#">Link to this property</a>

p90: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

issues: optional object {lag\_fraction, no\_video\_fraction, poor\_resolution\_fraction }

</summary>

lag\_fraction: optional number

<a href="#">Link to this property</a>

no\_video\_fraction: optional number

<a href="#">Link to this property</a>

poor\_resolution\_fraction: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

jitter\_buffer\_delay: optional object {"100ms\_or\_greater\_event\_fraction", "250ms\_or\_greater\_event\_fraction", "500ms\_or\_greater\_event\_fraction", avg }

Cumulative latency distribution (milliseconds-based thresholds).

</summary>

"100ms\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"250ms\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"500ms\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

avg: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

key\_frames\_decoded\_fraction: optional number

<a href="#">Link to this property</a>

<details>

<summary>

packet\_loss: optional object {"10\_or\_greater\_event\_fraction", "25\_or\_greater\_event\_fraction", "5\_or\_greater\_event\_fraction", 2 more }

Cumulative packet loss distribution.

</summary>

"10\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"25\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"5\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"50\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

avg: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

quality\_mos: optional object {avg, p50, p75, p90 }

Distribution summary with average and percentiles.

</summary>

avg: optional number

<a href="#">Link to this property</a>

p50: optional number

<a href="#">Link to this property</a>

p75: optional number

<a href="#">Link to this property</a>

p90: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

screenshare\_video\_producer: optional array of object {bytes\_sent, fir\_count, frame\_height, 17 more }

</summary>

bytes\_sent: optional number

<a href="#">Link to this property</a>

fir\_count: optional number

<a href="#">Link to this property</a>

frame\_height: optional number

<a href="#">Link to this property</a>

frame\_width: optional number

<a href="#">Link to this property</a>

frames\_encoded: optional number

<a href="#">Link to this property</a>

frames\_per\_second: optional number

<a href="#">Link to this property</a>

jitter: optional number

<a href="#">Link to this property</a>

key\_frames\_encoded: optional number

<a href="#">Link to this property</a>

mid: optional string

<a href="#">Link to this property</a>

mos\_quality: optional number

<a href="#">Link to this property</a>

packets\_lost: optional number

<a href="#">Link to this property</a>

packets\_sent: optional number

<a href="#">Link to this property</a>

pli\_count: optional number

<a href="#">Link to this property</a>

producer\_id: optional string

<a href="#">Link to this property</a>

<details>

<summary>

quality\_limitation\_durations: optional object {bandwidth, cpu, none, other }

</summary>

bandwidth: optional number

<a href="#">Link to this property</a>

cpu: optional number

<a href="#">Link to this property</a>

none: optional number

<a href="#">Link to this property</a>

other: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

quality\_limitation\_reason: optional "cpu"or "bandwidth"or "none"or "other"

</summary>

One of the following:

"cpu"

<a href="#">Link to this property</a>

"bandwidth"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

"other"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

quality\_limitation\_resolution\_changes: optional number

<a href="#">Link to this property</a>

rtt: optional number

<a href="#">Link to this property</a>

ssrc: optional number

<a href="#">Link to this property</a>

timestamp: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

screenshare\_video\_producer\_cumulative: optional object {frame\_per\_second, frame\_width, high\_negative\_feedback\_fraction, 5 more }

Aggregated outbound (producer) video statistics for the session.

</summary>

<details>

<summary>

frame\_per\_second: optional object {avg, p50, p75, p90 }

Distribution summary with average and percentiles.

</summary>

avg: optional number

<a href="#">Link to this property</a>

p50: optional number

<a href="#">Link to this property</a>

p75: optional number

<a href="#">Link to this property</a>

p90: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

frame\_width: optional object {avg, p50, p75, p90 }

Distribution summary with average and percentiles.

</summary>

avg: optional number

<a href="#">Link to this property</a>

p50: optional number

<a href="#">Link to this property</a>

p75: optional number

<a href="#">Link to this property</a>

p90: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

high\_negative\_feedback\_fraction: optional number

<a href="#">Link to this property</a>

<details>

<summary>

issues: optional object {bandwidth\_quality\_limitation\_fraction, cpu\_quality\_limitation\_fraction, no\_video\_fraction, 2 more }

</summary>

bandwidth\_quality\_limitation\_fraction: optional number

<a href="#">Link to this property</a>

cpu\_quality\_limitation\_fraction: optional number

<a href="#">Link to this property</a>

no\_video\_fraction: optional number

<a href="#">Link to this property</a>

poor\_resolution\_fraction: optional number

<a href="#">Link to this property</a>

quality\_limitation\_fraction: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

key\_frames\_encoded\_fraction: optional number

<a href="#">Link to this property</a>

<details>

<summary>

packet\_loss: optional object {"10\_or\_greater\_event\_fraction", "25\_or\_greater\_event\_fraction", "5\_or\_greater\_event\_fraction", 2 more }

Cumulative packet loss distribution.

</summary>

"10\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"25\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"5\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"50\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

avg: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

quality\_mos: optional object {avg, p50, p75, p90 }

Distribution summary with average and percentiles.

</summary>

avg: optional number

<a href="#">Link to this property</a>

p50: optional number

<a href="#">Link to this property</a>

p75: optional number

<a href="#">Link to this property</a>

p90: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

rtt: optional object {"100ms\_or\_greater\_event\_fraction", "250ms\_or\_greater\_event\_fraction", "500ms\_or\_greater\_event\_fraction", avg }

Cumulative latency distribution (milliseconds-based thresholds).

</summary>

"100ms\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"250ms\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"500ms\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

avg: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

video\_consumer: optional array of object {bytes\_received, consumer\_id, fir\_count, 17 more }

</summary>

bytes\_received: optional number

<a href="#">Link to this property</a>

consumer\_id: optional string

<a href="#">Link to this property</a>

fir\_count: optional number

<a href="#">Link to this property</a>

frame\_height: optional number

<a href="#">Link to this property</a>

frame\_width: optional number

<a href="#">Link to this property</a>

frames\_decoded: optional number

<a href="#">Link to this property</a>

frames\_dropped: optional number

<a href="#">Link to this property</a>

frames\_per\_second: optional number

<a href="#">Link to this property</a>

jitter: optional number

<a href="#">Link to this property</a>

jitter\_buffer\_delay: optional number

<a href="#">Link to this property</a>

jitter\_buffer\_emitted\_count: optional number

<a href="#">Link to this property</a>

key\_frames\_decoded: optional number

<a href="#">Link to this property</a>

mid: optional string

<a href="#">Link to this property</a>

mos\_quality: optional number

<a href="#">Link to this property</a>

packets\_lost: optional number

<a href="#">Link to this property</a>

packets\_received: optional number

<a href="#">Link to this property</a>

peer\_id: optional string

<a href="#">Link to this property</a>

producer\_id: optional string

<a href="#">Link to this property</a>

ssrc: optional number

<a href="#">Link to this property</a>

timestamp: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

video\_consumer\_cumulative: optional object {frame\_per\_second, frame\_width, issues, 4 more }

Aggregated inbound (consumer) video statistics for the session.

</summary>

<details>

<summary>

frame\_per\_second: optional object {avg, p50, p75, p90 }

Distribution summary with average and percentiles.

</summary>

avg: optional number

<a href="#">Link to this property</a>

p50: optional number

<a href="#">Link to this property</a>

p75: optional number

<a href="#">Link to this property</a>

p90: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

frame\_width: optional object {avg, p50, p75, p90 }

Distribution summary with average and percentiles.

</summary>

avg: optional number

<a href="#">Link to this property</a>

p50: optional number

<a href="#">Link to this property</a>

p75: optional number

<a href="#">Link to this property</a>

p90: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

issues: optional object {lag\_fraction, no\_video\_fraction, poor\_resolution\_fraction }

</summary>

lag\_fraction: optional number

<a href="#">Link to this property</a>

no\_video\_fraction: optional number

<a href="#">Link to this property</a>

poor\_resolution\_fraction: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

jitter\_buffer\_delay: optional object {"100ms\_or\_greater\_event\_fraction", "250ms\_or\_greater\_event\_fraction", "500ms\_or\_greater\_event\_fraction", avg }

Cumulative latency distribution (milliseconds-based thresholds).

</summary>

"100ms\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"250ms\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"500ms\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

avg: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

key\_frames\_decoded\_fraction: optional number

<a href="#">Link to this property</a>

<details>

<summary>

packet\_loss: optional object {"10\_or\_greater\_event\_fraction", "25\_or\_greater\_event\_fraction", "5\_or\_greater\_event\_fraction", 2 more }

Cumulative packet loss distribution.

</summary>

"10\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"25\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"5\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"50\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

avg: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

quality\_mos: optional object {avg, p50, p75, p90 }

Distribution summary with average and percentiles.

</summary>

avg: optional number

<a href="#">Link to this property</a>

p50: optional number

<a href="#">Link to this property</a>

p75: optional number

<a href="#">Link to this property</a>

p90: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

video\_producer: optional array of object {bytes\_sent, fir\_count, frame\_height, 17 more }

</summary>

bytes\_sent: optional number

<a href="#">Link to this property</a>

fir\_count: optional number

<a href="#">Link to this property</a>

frame\_height: optional number

<a href="#">Link to this property</a>

frame\_width: optional number

<a href="#">Link to this property</a>

frames\_encoded: optional number

<a href="#">Link to this property</a>

frames\_per\_second: optional number

<a href="#">Link to this property</a>

jitter: optional number

<a href="#">Link to this property</a>

key\_frames\_encoded: optional number

<a href="#">Link to this property</a>

mid: optional string

<a href="#">Link to this property</a>

mos\_quality: optional number

<a href="#">Link to this property</a>

packets\_lost: optional number

<a href="#">Link to this property</a>

packets\_sent: optional number

<a href="#">Link to this property</a>

pli\_count: optional number

<a href="#">Link to this property</a>

producer\_id: optional string

<a href="#">Link to this property</a>

<details>

<summary>

quality\_limitation\_durations: optional object {bandwidth, cpu, none, other }

</summary>

bandwidth: optional number

<a href="#">Link to this property</a>

cpu: optional number

<a href="#">Link to this property</a>

none: optional number

<a href="#">Link to this property</a>

other: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

quality\_limitation\_reason: optional "cpu"or "bandwidth"or "none"or "other"

</summary>

One of the following:

"cpu"

<a href="#">Link to this property</a>

"bandwidth"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

"other"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

quality\_limitation\_resolution\_changes: optional number

<a href="#">Link to this property</a>

rtt: optional number

<a href="#">Link to this property</a>

ssrc: optional number

<a href="#">Link to this property</a>

timestamp: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

video\_producer\_cumulative: optional object {frame\_per\_second, frame\_width, high\_negative\_feedback\_fraction, 5 more }

Aggregated outbound (producer) video statistics for the session.

</summary>

<details>

<summary>

frame\_per\_second: optional object {avg, p50, p75, p90 }

Distribution summary with average and percentiles.

</summary>

avg: optional number

<a href="#">Link to this property</a>

p50: optional number

<a href="#">Link to this property</a>

p75: optional number

<a href="#">Link to this property</a>

p90: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

frame\_width: optional object {avg, p50, p75, p90 }

Distribution summary with average and percentiles.

</summary>

avg: optional number

<a href="#">Link to this property</a>

p50: optional number

<a href="#">Link to this property</a>

p75: optional number

<a href="#">Link to this property</a>

p90: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

high\_negative\_feedback\_fraction: optional number

<a href="#">Link to this property</a>

<details>

<summary>

issues: optional object {bandwidth\_quality\_limitation\_fraction, cpu\_quality\_limitation\_fraction, no\_video\_fraction, 2 more }

</summary>

bandwidth\_quality\_limitation\_fraction: optional number

<a href="#">Link to this property</a>

cpu\_quality\_limitation\_fraction: optional number

<a href="#">Link to this property</a>

no\_video\_fraction: optional number

<a href="#">Link to this property</a>

poor\_resolution\_fraction: optional number

<a href="#">Link to this property</a>

quality\_limitation\_fraction: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

key\_frames\_encoded\_fraction: optional number

<a href="#">Link to this property</a>

<details>

<summary>

packet\_loss: optional object {"10\_or\_greater\_event\_fraction", "25\_or\_greater\_event\_fraction", "5\_or\_greater\_event\_fraction", 2 more }

Cumulative packet loss distribution.

</summary>

"10\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"25\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"5\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"50\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

avg: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

quality\_mos: optional object {avg, p50, p75, p90 }

Distribution summary with average and percentiles.

</summary>

avg: optional number

<a href="#">Link to this property</a>

p50: optional number

<a href="#">Link to this property</a>

p75: optional number

<a href="#">Link to this property</a>

p90: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

rtt: optional object {"100ms\_or\_greater\_event\_fraction", "250ms\_or\_greater\_event\_fraction", "500ms\_or\_greater\_event\_fraction", avg }

Cumulative latency distribution (milliseconds-based thresholds).

</summary>

"100ms\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"250ms\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

"500ms\_or\_greater\_event\_fraction": optional number

<a href="#">Link to this property</a>

avg: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

role: optional string

Name of the preset associated with the participant.

<a href="#">Link to this property</a>

session\_id: optional string

formatuuid

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

<a href="#">Link to this property</a>

success: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(model)%20session_get_participant_data_from_peer_id_response%20%3E%20(schema)>)