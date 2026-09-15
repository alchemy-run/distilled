---
title: Fetch details of peer
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Realtime Kit](https://developers.cloudflare.com/api/resources/realtime_kit)

[Sessions](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/sessions)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Fetch details of peer

GET/accounts/{account\_id}/realtime/kit/{app\_id}/sessions/peer-report/{peer\_id}

Returns participant details for the given peer ID along with call statistics.

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

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_participant_data_from_peer_id%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

app\_id: string

The app identifier tag.

maxLength32

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_participant_data_from_peer_id%20%3E%20(params)%20default%20%3E%20(param)%20app_id%20%3E%20(schema)>)

peer\_id: string

formatuuid

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_participant_data_from_peer_id%20%3E%20(params)%20default%20%3E%20(param)%20peer_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

<details>

<summary>

filters: optional "device\_info"or "ip\_information"or "precall\_network\_information"or 2 more

Filter to apply to the peer report.

</summary>

One of the following:

"device\_info"

<a href="#">Link to this property</a>

"ip\_information"

<a href="#">Link to this property</a>

"precall\_network\_information"

<a href="#">Link to this property</a>

"events"

<a href="#">Link to this property</a>

"quality\_stats"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_participant_data_from_peer_id%20%3E%20(params)%20default%20%3E%20(param)%20filters%20%3E%20(schema)>)

include\_peer\_events: optional boolean

if true, response includes all the peer events of participant.

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(method)%20get_participant_data_from_peer_id%20%3E%20(params)%20default%20%3E%20(param)%20include_peer_events%20%3E%20(schema)>)

##### ReturnsExpand Collapse

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

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(model)%20session_get_participant_data_from_peer_id_response%20%3E%20(schema)%20%3E%20(property)%20data>)

success: optional boolean

[Link to this property](#)%20realtime_kit.sessions%20%3E%20(model)%20session_get_participant_data_from_peer_id_response%20%3E%20(schema)%20%3E%20(property)%20success>)

### Fetch details of peer

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/sessions/peer-report/$PEER_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "data": {
    "participant": {
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
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
      "peer_report": {
        "metadata": {
          "audio_devices_updates": [
            {
              "added": [
                {
                  "device_id": "device_id",
                  "kind": "kind",
                  "label": "label"
                }
              ],
              "removed": [
                {
                  "device_id": "device_id",
                  "kind": "kind",
                  "label": "label"
                }
              ],
              "timestamp": "timestamp"
            }
          ],
          "browser_metadata": {
            "browser": "browser",
            "browser_version": "browser_version",
            "engine": "engine",
            "user_agent": "user_agent",
            "webgl_support": true
          },
          "candidate_pairs": {
            "consuming_transport": [
              {
                "available_incoming_bitrate": 0,
                "available_outgoing_bitrate": 0,
                "bytes_discarded_on_send": 0,
                "bytes_received": 0,
                "bytes_sent": 0,
                "current_round_trip_time": 0,
                "last_packet_received_timestamp": 0,
                "last_packet_sent_timestamp": 0,
                "local_candidate_address": "local_candidate_address",
                "local_candidate_id": "local_candidate_id",
                "local_candidate_network_type": "local_candidate_network_type",
                "local_candidate_port": 0,
                "local_candidate_protocol": "local_candidate_protocol",
                "local_candidate_related_address": "local_candidate_related_address",
                "local_candidate_related_port": 0,
                "local_candidate_type": "local_candidate_type",
                "local_candidate_url": "local_candidate_url",
                "nominated": true,
                "packets_discarded_on_send": 0,
                "packets_received": 0,
                "packets_sent": 0,
                "remote_candidate_address": "remote_candidate_address",
                "remote_candidate_id": "remote_candidate_id",
                "remote_candidate_port": 0,
                "remote_candidate_protocol": "remote_candidate_protocol",
                "remote_candidate_type": "remote_candidate_type",
                "remote_candidate_url": "remote_candidate_url",
                "total_round_trip_time": 0
              }
            ],
            "producing_transport": [
              {
                "available_incoming_bitrate": 0,
                "available_outgoing_bitrate": 0,
                "bytes_discarded_on_send": 0,
                "bytes_received": 0,
                "bytes_sent": 0,
                "current_round_trip_time": 0,
                "last_packet_received_timestamp": 0,
                "last_packet_sent_timestamp": 0,
                "local_candidate_address": "local_candidate_address",
                "local_candidate_id": "local_candidate_id",
                "local_candidate_network_type": "local_candidate_network_type",
                "local_candidate_port": 0,
                "local_candidate_protocol": "local_candidate_protocol",
                "local_candidate_related_address": "local_candidate_related_address",
                "local_candidate_related_port": 0,
                "local_candidate_type": "local_candidate_type",
                "local_candidate_url": "local_candidate_url",
                "nominated": true,
                "packets_discarded_on_send": 0,
                "packets_received": 0,
                "packets_sent": 0,
                "remote_candidate_address": "remote_candidate_address",
                "remote_candidate_id": "remote_candidate_id",
                "remote_candidate_port": 0,
                "remote_candidate_protocol": "remote_candidate_protocol",
                "remote_candidate_type": "remote_candidate_type",
                "remote_candidate_url": "remote_candidate_url",
                "total_round_trip_time": 0
              }
            ]
          },
          "device_info": {
            "cpus": 0,
            "is_mobile": true,
            "os": "os",
            "os_version": "os_version"
          },
          "events": [
            {
              "metadata": {
                "foo": "string"
              },
              "name": "name",
              "timestamp": "timestamp"
            }
          ],
          "ip_information": {
            "asn": {
              "asn": "asn",
              "domain": "domain",
              "name": "name",
              "route": "route",
              "type": "type"
            },
            "city": "city",
            "country": "country",
            "ipv4": "ipv4",
            "org": "org",
            "region": "region",
            "timezone": "timezone"
          },
          "native_metadata": {
            "audio_encoder": "audio_encoder",
            "video_encoder": "video_encoder"
          },
          "pc_metadata": [
            {
              "effective_network_type": "effective_network_type",
              "reflexive_connectivity": true,
              "relay_connectivity": true,
              "sdp": [
                "string"
              ],
              "timestamp": "timestamp",
              "turn_connectivity": true
            }
          ],
          "room_view_type": "room_view_type",
          "sdk_name": "sdk_name",
          "sdk_type": "sdk_type",
          "sdk_version": "sdk_version",
          "selected_device_updates": [
            {
              "device": {
                "device_id": "device_id",
                "kind": "kind",
                "label": "label"
              },
              "timestamp": "timestamp"
            }
          ],
          "speaker_devices_updates": [
            {
              "added": [
                {
                  "device_id": "device_id",
                  "kind": "kind",
                  "label": "label"
                }
              ],
              "removed": [
                {
                  "device_id": "device_id",
                  "kind": "kind",
                  "label": "label"
                }
              ],
              "timestamp": "timestamp"
            }
          ],
          "video_devices_updates": [
            {
              "added": [
                {
                  "device_id": "device_id",
                  "kind": "kind",
                  "label": "label"
                }
              ],
              "removed": [
                {
                  "device_id": "device_id",
                  "kind": "kind",
                  "label": "label"
                }
              ],
              "timestamp": "timestamp"
            }
          ]
        },
        "quality": {
          "audio_consumer": [
            {
              "bytes_received": 0,
              "concealment_events": 0,
              "consumer_id": "consumer_id",
              "jitter": 0,
              "jitter_buffer_delay": 0,
              "jitter_buffer_emitted_count": 0,
              "mid": "mid",
              "mos_quality": 0,
              "packets_lost": 0,
              "packets_received": 0,
              "peer_id": "peer_id",
              "producer_id": "producer_id",
              "ssrc": 0,
              "timestamp": "timestamp"
            }
          ],
          "audio_consumer_cumulative": {
            "jitter_buffer_delay": {
              "100ms_or_greater_event_fraction": 0,
              "250ms_or_greater_event_fraction": 0,
              "500ms_or_greater_event_fraction": 0,
              "avg": 0
            },
            "packet_loss": {
              "10_or_greater_event_fraction": 0,
              "25_or_greater_event_fraction": 0,
              "5_or_greater_event_fraction": 0,
              "50_or_greater_event_fraction": 0,
              "avg": 0
            },
            "quality_mos": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            }
          },
          "audio_producer": [
            {
              "bytes_sent": 0,
              "jitter": 0,
              "mid": "mid",
              "mos_quality": 0,
              "packets_lost": 0,
              "packets_sent": 0,
              "producer_id": "producer_id",
              "rtt": 0,
              "ssrc": 0,
              "timestamp": "timestamp"
            }
          ],
          "audio_producer_cumulative": {
            "packet_loss": {
              "10_or_greater_event_fraction": 0,
              "25_or_greater_event_fraction": 0,
              "5_or_greater_event_fraction": 0,
              "50_or_greater_event_fraction": 0,
              "avg": 0
            },
            "quality_mos": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            },
            "rtt": {
              "100ms_or_greater_event_fraction": 0,
              "250ms_or_greater_event_fraction": 0,
              "500ms_or_greater_event_fraction": 0,
              "avg": 0
            }
          },
          "screenshare_audio_consumer": [
            {
              "bytes_received": 0,
              "concealment_events": 0,
              "consumer_id": "consumer_id",
              "jitter": 0,
              "jitter_buffer_delay": 0,
              "jitter_buffer_emitted_count": 0,
              "mid": "mid",
              "mos_quality": 0,
              "packets_lost": 0,
              "packets_received": 0,
              "peer_id": "peer_id",
              "producer_id": "producer_id",
              "ssrc": 0,
              "timestamp": "timestamp"
            }
          ],
          "screenshare_audio_consumer_cumulative": {
            "jitter_buffer_delay": {
              "100ms_or_greater_event_fraction": 0,
              "250ms_or_greater_event_fraction": 0,
              "500ms_or_greater_event_fraction": 0,
              "avg": 0
            },
            "packet_loss": {
              "10_or_greater_event_fraction": 0,
              "25_or_greater_event_fraction": 0,
              "5_or_greater_event_fraction": 0,
              "50_or_greater_event_fraction": 0,
              "avg": 0
            },
            "quality_mos": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            }
          },
          "screenshare_audio_producer": [
            {
              "bytes_sent": 0,
              "jitter": 0,
              "mid": "mid",
              "mos_quality": 0,
              "packets_lost": 0,
              "packets_sent": 0,
              "producer_id": "producer_id",
              "rtt": 0,
              "ssrc": 0,
              "timestamp": "timestamp"
            }
          ],
          "screenshare_audio_producer_cumulative": {
            "packet_loss": {
              "10_or_greater_event_fraction": 0,
              "25_or_greater_event_fraction": 0,
              "5_or_greater_event_fraction": 0,
              "50_or_greater_event_fraction": 0,
              "avg": 0
            },
            "quality_mos": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            },
            "rtt": {
              "100ms_or_greater_event_fraction": 0,
              "250ms_or_greater_event_fraction": 0,
              "500ms_or_greater_event_fraction": 0,
              "avg": 0
            }
          },
          "screenshare_video_consumer": [
            {
              "bytes_received": 0,
              "consumer_id": "consumer_id",
              "fir_count": 0,
              "frame_height": 0,
              "frame_width": 0,
              "frames_decoded": 0,
              "frames_dropped": 0,
              "frames_per_second": 0,
              "jitter": 0,
              "jitter_buffer_delay": 0,
              "jitter_buffer_emitted_count": 0,
              "key_frames_decoded": 0,
              "mid": "mid",
              "mos_quality": 0,
              "packets_lost": 0,
              "packets_received": 0,
              "peer_id": "peer_id",
              "producer_id": "producer_id",
              "ssrc": 0,
              "timestamp": "timestamp"
            }
          ],
          "screenshare_video_consumer_cumulative": {
            "frame_per_second": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            },
            "frame_width": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            },
            "issues": {
              "lag_fraction": 0,
              "no_video_fraction": 0,
              "poor_resolution_fraction": 0
            },
            "jitter_buffer_delay": {
              "100ms_or_greater_event_fraction": 0,
              "250ms_or_greater_event_fraction": 0,
              "500ms_or_greater_event_fraction": 0,
              "avg": 0
            },
            "key_frames_decoded_fraction": 0,
            "packet_loss": {
              "10_or_greater_event_fraction": 0,
              "25_or_greater_event_fraction": 0,
              "5_or_greater_event_fraction": 0,
              "50_or_greater_event_fraction": 0,
              "avg": 0
            },
            "quality_mos": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            }
          },
          "screenshare_video_producer": [
            {
              "bytes_sent": 0,
              "fir_count": 0,
              "frame_height": 0,
              "frame_width": 0,
              "frames_encoded": 0,
              "frames_per_second": 0,
              "jitter": 0,
              "key_frames_encoded": 0,
              "mid": "mid",
              "mos_quality": 0,
              "packets_lost": 0,
              "packets_sent": 0,
              "pli_count": 0,
              "producer_id": "producer_id",
              "quality_limitation_durations": {
                "bandwidth": 0,
                "cpu": 0,
                "none": 0,
                "other": 0
              },
              "quality_limitation_reason": "cpu",
              "quality_limitation_resolution_changes": 0,
              "rtt": 0,
              "ssrc": 0,
              "timestamp": "timestamp"
            }
          ],
          "screenshare_video_producer_cumulative": {
            "frame_per_second": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            },
            "frame_width": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            },
            "high_negative_feedback_fraction": 0,
            "issues": {
              "bandwidth_quality_limitation_fraction": 0,
              "cpu_quality_limitation_fraction": 0,
              "no_video_fraction": 0,
              "poor_resolution_fraction": 0,
              "quality_limitation_fraction": 0
            },
            "key_frames_encoded_fraction": 0,
            "packet_loss": {
              "10_or_greater_event_fraction": 0,
              "25_or_greater_event_fraction": 0,
              "5_or_greater_event_fraction": 0,
              "50_or_greater_event_fraction": 0,
              "avg": 0
            },
            "quality_mos": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            },
            "rtt": {
              "100ms_or_greater_event_fraction": 0,
              "250ms_or_greater_event_fraction": 0,
              "500ms_or_greater_event_fraction": 0,
              "avg": 0
            }
          },
          "video_consumer": [
            {
              "bytes_received": 0,
              "consumer_id": "consumer_id",
              "fir_count": 0,
              "frame_height": 0,
              "frame_width": 0,
              "frames_decoded": 0,
              "frames_dropped": 0,
              "frames_per_second": 0,
              "jitter": 0,
              "jitter_buffer_delay": 0,
              "jitter_buffer_emitted_count": 0,
              "key_frames_decoded": 0,
              "mid": "mid",
              "mos_quality": 0,
              "packets_lost": 0,
              "packets_received": 0,
              "peer_id": "peer_id",
              "producer_id": "producer_id",
              "ssrc": 0,
              "timestamp": "timestamp"
            }
          ],
          "video_consumer_cumulative": {
            "frame_per_second": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            },
            "frame_width": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            },
            "issues": {
              "lag_fraction": 0,
              "no_video_fraction": 0,
              "poor_resolution_fraction": 0
            },
            "jitter_buffer_delay": {
              "100ms_or_greater_event_fraction": 0,
              "250ms_or_greater_event_fraction": 0,
              "500ms_or_greater_event_fraction": 0,
              "avg": 0
            },
            "key_frames_decoded_fraction": 0,
            "packet_loss": {
              "10_or_greater_event_fraction": 0,
              "25_or_greater_event_fraction": 0,
              "5_or_greater_event_fraction": 0,
              "50_or_greater_event_fraction": 0,
              "avg": 0
            },
            "quality_mos": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            }
          },
          "video_producer": [
            {
              "bytes_sent": 0,
              "fir_count": 0,
              "frame_height": 0,
              "frame_width": 0,
              "frames_encoded": 0,
              "frames_per_second": 0,
              "jitter": 0,
              "key_frames_encoded": 0,
              "mid": "mid",
              "mos_quality": 0,
              "packets_lost": 0,
              "packets_sent": 0,
              "pli_count": 0,
              "producer_id": "producer_id",
              "quality_limitation_durations": {
                "bandwidth": 0,
                "cpu": 0,
                "none": 0,
                "other": 0
              },
              "quality_limitation_reason": "cpu",
              "quality_limitation_resolution_changes": 0,
              "rtt": 0,
              "ssrc": 0,
              "timestamp": "timestamp"
            }
          ],
          "video_producer_cumulative": {
            "frame_per_second": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            },
            "frame_width": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            },
            "high_negative_feedback_fraction": 0,
            "issues": {
              "bandwidth_quality_limitation_fraction": 0,
              "cpu_quality_limitation_fraction": 0,
              "no_video_fraction": 0,
              "poor_resolution_fraction": 0,
              "quality_limitation_fraction": 0
            },
            "key_frames_encoded_fraction": 0,
            "packet_loss": {
              "10_or_greater_event_fraction": 0,
              "25_or_greater_event_fraction": 0,
              "5_or_greater_event_fraction": 0,
              "50_or_greater_event_fraction": 0,
              "avg": 0
            },
            "quality_mos": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            },
            "rtt": {
              "100ms_or_greater_event_fraction": 0,
              "250ms_or_greater_event_fraction": 0,
              "500ms_or_greater_event_fraction": 0,
              "avg": 0
            }
          }
        }
      },
      "role": "role",
      "session_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
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
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
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
      "peer_report": {
        "metadata": {
          "audio_devices_updates": [
            {
              "added": [
                {
                  "device_id": "device_id",
                  "kind": "kind",
                  "label": "label"
                }
              ],
              "removed": [
                {
                  "device_id": "device_id",
                  "kind": "kind",
                  "label": "label"
                }
              ],
              "timestamp": "timestamp"
            }
          ],
          "browser_metadata": {
            "browser": "browser",
            "browser_version": "browser_version",
            "engine": "engine",
            "user_agent": "user_agent",
            "webgl_support": true
          },
          "candidate_pairs": {
            "consuming_transport": [
              {
                "available_incoming_bitrate": 0,
                "available_outgoing_bitrate": 0,
                "bytes_discarded_on_send": 0,
                "bytes_received": 0,
                "bytes_sent": 0,
                "current_round_trip_time": 0,
                "last_packet_received_timestamp": 0,
                "last_packet_sent_timestamp": 0,
                "local_candidate_address": "local_candidate_address",
                "local_candidate_id": "local_candidate_id",
                "local_candidate_network_type": "local_candidate_network_type",
                "local_candidate_port": 0,
                "local_candidate_protocol": "local_candidate_protocol",
                "local_candidate_related_address": "local_candidate_related_address",
                "local_candidate_related_port": 0,
                "local_candidate_type": "local_candidate_type",
                "local_candidate_url": "local_candidate_url",
                "nominated": true,
                "packets_discarded_on_send": 0,
                "packets_received": 0,
                "packets_sent": 0,
                "remote_candidate_address": "remote_candidate_address",
                "remote_candidate_id": "remote_candidate_id",
                "remote_candidate_port": 0,
                "remote_candidate_protocol": "remote_candidate_protocol",
                "remote_candidate_type": "remote_candidate_type",
                "remote_candidate_url": "remote_candidate_url",
                "total_round_trip_time": 0
              }
            ],
            "producing_transport": [
              {
                "available_incoming_bitrate": 0,
                "available_outgoing_bitrate": 0,
                "bytes_discarded_on_send": 0,
                "bytes_received": 0,
                "bytes_sent": 0,
                "current_round_trip_time": 0,
                "last_packet_received_timestamp": 0,
                "last_packet_sent_timestamp": 0,
                "local_candidate_address": "local_candidate_address",
                "local_candidate_id": "local_candidate_id",
                "local_candidate_network_type": "local_candidate_network_type",
                "local_candidate_port": 0,
                "local_candidate_protocol": "local_candidate_protocol",
                "local_candidate_related_address": "local_candidate_related_address",
                "local_candidate_related_port": 0,
                "local_candidate_type": "local_candidate_type",
                "local_candidate_url": "local_candidate_url",
                "nominated": true,
                "packets_discarded_on_send": 0,
                "packets_received": 0,
                "packets_sent": 0,
                "remote_candidate_address": "remote_candidate_address",
                "remote_candidate_id": "remote_candidate_id",
                "remote_candidate_port": 0,
                "remote_candidate_protocol": "remote_candidate_protocol",
                "remote_candidate_type": "remote_candidate_type",
                "remote_candidate_url": "remote_candidate_url",
                "total_round_trip_time": 0
              }
            ]
          },
          "device_info": {
            "cpus": 0,
            "is_mobile": true,
            "os": "os",
            "os_version": "os_version"
          },
          "events": [
            {
              "metadata": {
                "foo": "string"
              },
              "name": "name",
              "timestamp": "timestamp"
            }
          ],
          "ip_information": {
            "asn": {
              "asn": "asn",
              "domain": "domain",
              "name": "name",
              "route": "route",
              "type": "type"
            },
            "city": "city",
            "country": "country",
            "ipv4": "ipv4",
            "org": "org",
            "region": "region",
            "timezone": "timezone"
          },
          "native_metadata": {
            "audio_encoder": "audio_encoder",
            "video_encoder": "video_encoder"
          },
          "pc_metadata": [
            {
              "effective_network_type": "effective_network_type",
              "reflexive_connectivity": true,
              "relay_connectivity": true,
              "sdp": [
                "string"
              ],
              "timestamp": "timestamp",
              "turn_connectivity": true
            }
          ],
          "room_view_type": "room_view_type",
          "sdk_name": "sdk_name",
          "sdk_type": "sdk_type",
          "sdk_version": "sdk_version",
          "selected_device_updates": [
            {
              "device": {
                "device_id": "device_id",
                "kind": "kind",
                "label": "label"
              },
              "timestamp": "timestamp"
            }
          ],
          "speaker_devices_updates": [
            {
              "added": [
                {
                  "device_id": "device_id",
                  "kind": "kind",
                  "label": "label"
                }
              ],
              "removed": [
                {
                  "device_id": "device_id",
                  "kind": "kind",
                  "label": "label"
                }
              ],
              "timestamp": "timestamp"
            }
          ],
          "video_devices_updates": [
            {
              "added": [
                {
                  "device_id": "device_id",
                  "kind": "kind",
                  "label": "label"
                }
              ],
              "removed": [
                {
                  "device_id": "device_id",
                  "kind": "kind",
                  "label": "label"
                }
              ],
              "timestamp": "timestamp"
            }
          ]
        },
        "quality": {
          "audio_consumer": [
            {
              "bytes_received": 0,
              "concealment_events": 0,
              "consumer_id": "consumer_id",
              "jitter": 0,
              "jitter_buffer_delay": 0,
              "jitter_buffer_emitted_count": 0,
              "mid": "mid",
              "mos_quality": 0,
              "packets_lost": 0,
              "packets_received": 0,
              "peer_id": "peer_id",
              "producer_id": "producer_id",
              "ssrc": 0,
              "timestamp": "timestamp"
            }
          ],
          "audio_consumer_cumulative": {
            "jitter_buffer_delay": {
              "100ms_or_greater_event_fraction": 0,
              "250ms_or_greater_event_fraction": 0,
              "500ms_or_greater_event_fraction": 0,
              "avg": 0
            },
            "packet_loss": {
              "10_or_greater_event_fraction": 0,
              "25_or_greater_event_fraction": 0,
              "5_or_greater_event_fraction": 0,
              "50_or_greater_event_fraction": 0,
              "avg": 0
            },
            "quality_mos": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            }
          },
          "audio_producer": [
            {
              "bytes_sent": 0,
              "jitter": 0,
              "mid": "mid",
              "mos_quality": 0,
              "packets_lost": 0,
              "packets_sent": 0,
              "producer_id": "producer_id",
              "rtt": 0,
              "ssrc": 0,
              "timestamp": "timestamp"
            }
          ],
          "audio_producer_cumulative": {
            "packet_loss": {
              "10_or_greater_event_fraction": 0,
              "25_or_greater_event_fraction": 0,
              "5_or_greater_event_fraction": 0,
              "50_or_greater_event_fraction": 0,
              "avg": 0
            },
            "quality_mos": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            },
            "rtt": {
              "100ms_or_greater_event_fraction": 0,
              "250ms_or_greater_event_fraction": 0,
              "500ms_or_greater_event_fraction": 0,
              "avg": 0
            }
          },
          "screenshare_audio_consumer": [
            {
              "bytes_received": 0,
              "concealment_events": 0,
              "consumer_id": "consumer_id",
              "jitter": 0,
              "jitter_buffer_delay": 0,
              "jitter_buffer_emitted_count": 0,
              "mid": "mid",
              "mos_quality": 0,
              "packets_lost": 0,
              "packets_received": 0,
              "peer_id": "peer_id",
              "producer_id": "producer_id",
              "ssrc": 0,
              "timestamp": "timestamp"
            }
          ],
          "screenshare_audio_consumer_cumulative": {
            "jitter_buffer_delay": {
              "100ms_or_greater_event_fraction": 0,
              "250ms_or_greater_event_fraction": 0,
              "500ms_or_greater_event_fraction": 0,
              "avg": 0
            },
            "packet_loss": {
              "10_or_greater_event_fraction": 0,
              "25_or_greater_event_fraction": 0,
              "5_or_greater_event_fraction": 0,
              "50_or_greater_event_fraction": 0,
              "avg": 0
            },
            "quality_mos": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            }
          },
          "screenshare_audio_producer": [
            {
              "bytes_sent": 0,
              "jitter": 0,
              "mid": "mid",
              "mos_quality": 0,
              "packets_lost": 0,
              "packets_sent": 0,
              "producer_id": "producer_id",
              "rtt": 0,
              "ssrc": 0,
              "timestamp": "timestamp"
            }
          ],
          "screenshare_audio_producer_cumulative": {
            "packet_loss": {
              "10_or_greater_event_fraction": 0,
              "25_or_greater_event_fraction": 0,
              "5_or_greater_event_fraction": 0,
              "50_or_greater_event_fraction": 0,
              "avg": 0
            },
            "quality_mos": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            },
            "rtt": {
              "100ms_or_greater_event_fraction": 0,
              "250ms_or_greater_event_fraction": 0,
              "500ms_or_greater_event_fraction": 0,
              "avg": 0
            }
          },
          "screenshare_video_consumer": [
            {
              "bytes_received": 0,
              "consumer_id": "consumer_id",
              "fir_count": 0,
              "frame_height": 0,
              "frame_width": 0,
              "frames_decoded": 0,
              "frames_dropped": 0,
              "frames_per_second": 0,
              "jitter": 0,
              "jitter_buffer_delay": 0,
              "jitter_buffer_emitted_count": 0,
              "key_frames_decoded": 0,
              "mid": "mid",
              "mos_quality": 0,
              "packets_lost": 0,
              "packets_received": 0,
              "peer_id": "peer_id",
              "producer_id": "producer_id",
              "ssrc": 0,
              "timestamp": "timestamp"
            }
          ],
          "screenshare_video_consumer_cumulative": {
            "frame_per_second": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            },
            "frame_width": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            },
            "issues": {
              "lag_fraction": 0,
              "no_video_fraction": 0,
              "poor_resolution_fraction": 0
            },
            "jitter_buffer_delay": {
              "100ms_or_greater_event_fraction": 0,
              "250ms_or_greater_event_fraction": 0,
              "500ms_or_greater_event_fraction": 0,
              "avg": 0
            },
            "key_frames_decoded_fraction": 0,
            "packet_loss": {
              "10_or_greater_event_fraction": 0,
              "25_or_greater_event_fraction": 0,
              "5_or_greater_event_fraction": 0,
              "50_or_greater_event_fraction": 0,
              "avg": 0
            },
            "quality_mos": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            }
          },
          "screenshare_video_producer": [
            {
              "bytes_sent": 0,
              "fir_count": 0,
              "frame_height": 0,
              "frame_width": 0,
              "frames_encoded": 0,
              "frames_per_second": 0,
              "jitter": 0,
              "key_frames_encoded": 0,
              "mid": "mid",
              "mos_quality": 0,
              "packets_lost": 0,
              "packets_sent": 0,
              "pli_count": 0,
              "producer_id": "producer_id",
              "quality_limitation_durations": {
                "bandwidth": 0,
                "cpu": 0,
                "none": 0,
                "other": 0
              },
              "quality_limitation_reason": "cpu",
              "quality_limitation_resolution_changes": 0,
              "rtt": 0,
              "ssrc": 0,
              "timestamp": "timestamp"
            }
          ],
          "screenshare_video_producer_cumulative": {
            "frame_per_second": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            },
            "frame_width": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            },
            "high_negative_feedback_fraction": 0,
            "issues": {
              "bandwidth_quality_limitation_fraction": 0,
              "cpu_quality_limitation_fraction": 0,
              "no_video_fraction": 0,
              "poor_resolution_fraction": 0,
              "quality_limitation_fraction": 0
            },
            "key_frames_encoded_fraction": 0,
            "packet_loss": {
              "10_or_greater_event_fraction": 0,
              "25_or_greater_event_fraction": 0,
              "5_or_greater_event_fraction": 0,
              "50_or_greater_event_fraction": 0,
              "avg": 0
            },
            "quality_mos": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            },
            "rtt": {
              "100ms_or_greater_event_fraction": 0,
              "250ms_or_greater_event_fraction": 0,
              "500ms_or_greater_event_fraction": 0,
              "avg": 0
            }
          },
          "video_consumer": [
            {
              "bytes_received": 0,
              "consumer_id": "consumer_id",
              "fir_count": 0,
              "frame_height": 0,
              "frame_width": 0,
              "frames_decoded": 0,
              "frames_dropped": 0,
              "frames_per_second": 0,
              "jitter": 0,
              "jitter_buffer_delay": 0,
              "jitter_buffer_emitted_count": 0,
              "key_frames_decoded": 0,
              "mid": "mid",
              "mos_quality": 0,
              "packets_lost": 0,
              "packets_received": 0,
              "peer_id": "peer_id",
              "producer_id": "producer_id",
              "ssrc": 0,
              "timestamp": "timestamp"
            }
          ],
          "video_consumer_cumulative": {
            "frame_per_second": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            },
            "frame_width": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            },
            "issues": {
              "lag_fraction": 0,
              "no_video_fraction": 0,
              "poor_resolution_fraction": 0
            },
            "jitter_buffer_delay": {
              "100ms_or_greater_event_fraction": 0,
              "250ms_or_greater_event_fraction": 0,
              "500ms_or_greater_event_fraction": 0,
              "avg": 0
            },
            "key_frames_decoded_fraction": 0,
            "packet_loss": {
              "10_or_greater_event_fraction": 0,
              "25_or_greater_event_fraction": 0,
              "5_or_greater_event_fraction": 0,
              "50_or_greater_event_fraction": 0,
              "avg": 0
            },
            "quality_mos": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            }
          },
          "video_producer": [
            {
              "bytes_sent": 0,
              "fir_count": 0,
              "frame_height": 0,
              "frame_width": 0,
              "frames_encoded": 0,
              "frames_per_second": 0,
              "jitter": 0,
              "key_frames_encoded": 0,
              "mid": "mid",
              "mos_quality": 0,
              "packets_lost": 0,
              "packets_sent": 0,
              "pli_count": 0,
              "producer_id": "producer_id",
              "quality_limitation_durations": {
                "bandwidth": 0,
                "cpu": 0,
                "none": 0,
                "other": 0
              },
              "quality_limitation_reason": "cpu",
              "quality_limitation_resolution_changes": 0,
              "rtt": 0,
              "ssrc": 0,
              "timestamp": "timestamp"
            }
          ],
          "video_producer_cumulative": {
            "frame_per_second": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            },
            "frame_width": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            },
            "high_negative_feedback_fraction": 0,
            "issues": {
              "bandwidth_quality_limitation_fraction": 0,
              "cpu_quality_limitation_fraction": 0,
              "no_video_fraction": 0,
              "poor_resolution_fraction": 0,
              "quality_limitation_fraction": 0
            },
            "key_frames_encoded_fraction": 0,
            "packet_loss": {
              "10_or_greater_event_fraction": 0,
              "25_or_greater_event_fraction": 0,
              "5_or_greater_event_fraction": 0,
              "50_or_greater_event_fraction": 0,
              "avg": 0
            },
            "quality_mos": {
              "avg": 0,
              "p50": 0,
              "p75": 0,
              "p90": 0
            },
            "rtt": {
              "100ms_or_greater_event_fraction": 0,
              "250ms_or_greater_event_fraction": 0,
              "500ms_or_greater_event_fraction": 0,
              "avg": 0
            }
          }
        }
      },
      "role": "role",
      "session_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "updated_at": "updated_at",
      "user_id": "user_id"
    }
  },
  "success": true
}
```