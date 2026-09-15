---
title: Livestreams
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Realtime Kit](https://developers.cloudflare.com/api/resources/realtime_kit)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Livestreams

##### [Fetch all livestreams](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/livestreams/methods/get_all_livestreams)

GET/accounts/{account\_id}/realtime/kit/{app\_id}/livestreams

##### [Stop livestreaming a meeting](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/livestreams/methods/stop_livestreaming_a_meeting)

POST/accounts/{account\_id}/realtime/kit/{app\_id}/meetings/{meeting\_id}/active-livestream/stop

##### [Start livestreaming a meeting](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/livestreams/methods/start_livestreaming_a_meeting)

POST/accounts/{account\_id}/realtime/kit/{app\_id}/meetings/{meeting\_id}/livestreams

##### [Fetch complete analytics data for your livestreams](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/livestreams/methods/get_livestream_analytics_complete)

GET/accounts/{account\_id}/realtime/kit/{app\_id}/analytics/livestreams/overall

##### [Fetch day-wise analytics data for your livestreams](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/livestreams/methods/get_livestream_analytics_daywise)

GET/accounts/{account\_id}/realtime/kit/{app\_id}/analytics/livestreams/daywise

##### [Fetch day-wise session and recording analytics data for an App](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/livestreams/methods/get_org_analytics)

GET/accounts/{account\_id}/realtime/kit/{app\_id}/analytics/daywise

##### [Fetch active livestreams for a meeting](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/livestreams/methods/get_meeting_active_livestreams)

GET/accounts/{account\_id}/realtime/kit/{app\_id}/meetings/{meeting\_id}/active-livestream

##### [Fetch livestream session details using livestream session ID](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/livestreams/methods/get_livestream_session_details_for_session_id)

GET/accounts/{account\_id}/realtime/kit/{app\_id}/livestreams/sessions/{livestream-session-id}

##### [Fetch active livestream session details](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/livestreams/methods/get_active_livestreams_for_livestream_id)

GET/accounts/{account\_id}/realtime/kit/{app\_id}/livestreams/{livestream\_id}/active-livestream-session

##### [Fetch livestream details using livestream ID](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/livestreams/methods/get_livestream_session_for_livestream_id)

GET/accounts/{account\_id}/realtime/kit/{app\_id}/livestreams/{livestream\_id}

##### ModelsExpand Collapse

<details>

<summary>

LivestreamGetAllLivestreamsResponse object {data, success }

</summary>

<details>

<summary>

data: optional object {id, created\_at, disabled, 8 more }

</summary>

id: optional string

The ID of the livestream.

formatuuid

<a href="#">Link to this property</a>

created\_at: optional string

Timestamp the object was created at. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

disabled: optional string

Specifies if the livestream was disabled.

<a href="#">Link to this property</a>

ingest\_server: optional string

The server URL to which the RTMP encoder sends the video and audio data.

<a href="#">Link to this property</a>

meeting\_id: optional string

ID of the meeting.

<a href="#">Link to this property</a>

name: optional string

Name of the livestream.

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

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

playback\_url: optional string

The web address that viewers can use to watch the livestream.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "LIVE"or "IDLE"or "ERRORED"or "INVOKED"

</summary>

One of the following:

"LIVE"

<a href="#">Link to this property</a>

"IDLE"

<a href="#">Link to this property</a>

"ERRORED"

<a href="#">Link to this property</a>

"INVOKED"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

stream\_key: optional string

Unique key for accessing each livestream.

<a href="#">Link to this property</a>

updated\_at: optional string

Timestamp the object was updated at. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(model)%20livestream_get_all_livestreams_response%20%3E%20(schema)>)

<details>

<summary>

LivestreamStopLivestreamingAMeetingResponse object {data, success }

</summary>

<details>

<summary>

data: optional object {message }

</summary>

message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(model)%20livestream_stop_livestreaming_a_meeting_response%20%3E%20(schema)>)

<details>

<summary>

LivestreamStartLivestreamingAMeetingResponse object {data, success }

</summary>

<details>

<summary>

data: optional object {id, ingest\_server, playback\_url, 2 more }

</summary>

id: optional string

The livestream ID.

<a href="#">Link to this property</a>

ingest\_server: optional string

The server URL to which the RTMP encoder sends the video and audio data.

<a href="#">Link to this property</a>

playback\_url: optional string

The web address that viewers can use to watch the livestream.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "LIVE"or "IDLE"or "ERRORED"or "INVOKED"

</summary>

One of the following:

"LIVE"

<a href="#">Link to this property</a>

"IDLE"

<a href="#">Link to this property</a>

"ERRORED"

<a href="#">Link to this property</a>

"INVOKED"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

stream\_key: optional string

Unique key for accessing each livestream.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(model)%20livestream_start_livestreaming_a_meeting_response%20%3E%20(schema)>)

<details>

<summary>

LivestreamGetLivestreamAnalyticsCompleteResponse object {data, success }

</summary>

<details>

<summary>

data: optional object {count, total\_ingest\_seconds, total\_viewer\_seconds }

</summary>

count: optional number

Count of total livestreams.

<a href="#">Link to this property</a>

total\_ingest\_seconds: optional number

Total time duration for which the input was given or the meeting was streamed.

<a href="#">Link to this property</a>

total\_viewer\_seconds: optional number

Total view time for which the viewers watched the stream.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(model)%20livestream_get_livestream_analytics_complete_response%20%3E%20(schema)>)

<details>

<summary>

LivestreamGetLivestreamAnalyticsDaywiseResponse object {data, success }

</summary>

<details>

<summary>

data: optional array of object {count, date, total\_ingest\_seconds, total\_viewer\_seconds }

</summary>

count: optional number

Count of total livestream sessions.

<a href="#">Link to this property</a>

date: optional string

Analytics date.

<a href="#">Link to this property</a>

total\_ingest\_seconds: optional number

Total time duration for which the input was given or the meeting was streamed.

<a href="#">Link to this property</a>

total\_viewer\_seconds: optional number

Total view time for which the viewers watched the stream.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(model)%20livestream_get_livestream_analytics_daywise_response%20%3E%20(schema)>)

<details>

<summary>

LivestreamGetOrgAnalyticsResponse object {data, success }

</summary>

<details>

<summary>

data: optional object {recording\_stats, session\_stats }

</summary>

<details>

<summary>

recording\_stats: optional object {day\_stats, recording\_count, recording\_minutes\_consumed }

Recording statistics of an App during the range specified

</summary>

<details>

<summary>

day\_stats: optional array of object {day, total\_recording\_minutes, total\_recordings }

Day wise recording stats

</summary>

day: optional string

<a href="#">Link to this property</a>

total\_recording\_minutes: optional number

Total recording minutes for a specific day

<a href="#">Link to this property</a>

total\_recordings: optional number

Total number of recordings for a specific day

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

recording\_count: optional number

Total number of recordings during the range specified

<a href="#">Link to this property</a>

recording\_minutes\_consumed: optional number

Total recording minutes during the range specified

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

session\_stats: optional object {day\_stats, sessions\_count, sessions\_minutes\_consumed }

Session statistics of an App during the range specified

</summary>

<details>

<summary>

day\_stats: optional array of object {day, total\_session\_minutes, total\_sessions }

Day wise session stats

</summary>

day: optional string

<a href="#">Link to this property</a>

total\_session\_minutes: optional number

Total session minutes for a specific day

<a href="#">Link to this property</a>

total\_sessions: optional number

Total number of sessions for a specific day

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

sessions\_count: optional number

Total number of sessions during the range specified

<a href="#">Link to this property</a>

sessions\_minutes\_consumed: optional number

Total session minutes during the range specified

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(model)%20livestream_get_org_analytics_response%20%3E%20(schema)>)

<details>

<summary>

LivestreamGetMeetingActiveLivestreamsResponse object {data, success }

</summary>

<details>

<summary>

data: optional object {id, created\_at, disabled, 7 more }

</summary>

id: optional string

The livestream ID.

<a href="#">Link to this property</a>

created\_at: optional string

Timestamp the object was created at. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

disabled: optional string

Specifies if the livestream was disabled.

<a href="#">Link to this property</a>

ingest\_server: optional string

The server URL to which the RTMP encoder sends the video and audio data.

<a href="#">Link to this property</a>

meeting\_id: optional string

<a href="#">Link to this property</a>

name: optional string

Name of the livestream.

<a href="#">Link to this property</a>

playback\_url: optional string

The web address that viewers can use to watch the livestream.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "LIVE"or "IDLE"or "ERRORED"or "INVOKED"

</summary>

One of the following:

"LIVE"

<a href="#">Link to this property</a>

"IDLE"

<a href="#">Link to this property</a>

"ERRORED"

<a href="#">Link to this property</a>

"INVOKED"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

stream\_key: optional string

Unique key for accessing each livestream.

<a href="#">Link to this property</a>

updated\_at: optional string

Timestamp the object was updated at. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(model)%20livestream_get_meeting_active_livestreams_response%20%3E%20(schema)>)

<details>

<summary>

LivestreamGetLivestreamSessionDetailsForSessionIDResponse object {data, success }

</summary>

<details>

<summary>

data: optional object {id, created\_at, err\_message, 6 more }

</summary>

id: optional string

The livestream ID.

<a href="#">Link to this property</a>

created\_at: optional string

Timestamp the object was created at. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

err\_message: optional string

The server URL to which the RTMP encoder sends the video and audio data.

<a href="#">Link to this property</a>

ingest\_seconds: optional number

Name of the livestream.

<a href="#">Link to this property</a>

livestream\_id: optional string

<a href="#">Link to this property</a>

started\_time: optional string

Unique key for accessing each livestream.

<a href="#">Link to this property</a>

stopped\_time: optional string

The web address that viewers can use to watch the livestream.

<a href="#">Link to this property</a>

updated\_at: optional string

Timestamp the object was updated at. The time is returned in ISO format.

<a href="#">Link to this property</a>

viewer\_seconds: optional number

Specifies if the livestream was disabled.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(model)%20livestream_get_livestream_session_details_for_session_id_response%20%3E%20(schema)>)

<details>

<summary>

LivestreamGetActiveLivestreamsForLivestreamIDResponse object {data, success }

</summary>

<details>

<summary>

data: optional object {livestream, session }

</summary>

<details>

<summary>

livestream: optional object {id, created\_at, disabled, 7 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

created\_at: optional string

Timestamp the object was created at. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

disabled: optional string

Specifies if the livestream was disabled.

<a href="#">Link to this property</a>

ingest\_server: optional string

The server URL to which the RTMP encoder sends the video and audio data.

<a href="#">Link to this property</a>

meeting\_id: optional string

ID of the meeting.

<a href="#">Link to this property</a>

name: optional string

Name of the livestream.

<a href="#">Link to this property</a>

playback\_url: optional string

The web address that viewers can use to watch the livestream.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "LIVE"or "IDLE"or "ERRORED"or "INVOKED"

</summary>

One of the following:

"LIVE"

<a href="#">Link to this property</a>

"IDLE"

<a href="#">Link to this property</a>

"ERRORED"

<a href="#">Link to this property</a>

"INVOKED"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

stream\_key: optional string

Unique key for accessing each livestream.

<a href="#">Link to this property</a>

updated\_at: optional string

Timestamp the object was updated at. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

session: optional object {id, created\_at, err\_message, 7 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

created\_at: optional string

Timestamp the object was created at. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

err\_message: optional string

<a href="#">Link to this property</a>

ingest\_seconds: optional string

The time duration for which the input was given or the meeting was streamed.

<a href="#">Link to this property</a>

invoked\_time: optional string

Timestamp the object was invoked. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

livestream\_id: optional string

<a href="#">Link to this property</a>

started\_time: optional string

Timestamp the object was started. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

stopped\_time: optional string

Timestamp the object was stopped. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

updated\_at: optional string

Timestamp the object was updated at. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

viewer\_seconds: optional string

The total view time for which the viewers watched the stream.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(model)%20livestream_get_active_livestreams_for_livestream_id_response%20%3E%20(schema)>)

<details>

<summary>

LivestreamGetLivestreamSessionForLivestreamIDResponse object {data, success }

</summary>

<details>

<summary>

data: optional object {livestream, paging, session }

</summary>

<details>

<summary>

livestream: optional object {id, created\_at, disabled, 7 more }

</summary>

id: optional string

ID of the livestream.

<a href="#">Link to this property</a>

created\_at: optional string

Timestamp the object was created at. The time is returned in ISO format.

<a href="#">Link to this property</a>

disabled: optional string

Specifies if the livestream was disabled.

<a href="#">Link to this property</a>

ingest\_server: optional string

The server URL to which the RTMP encoder sends the video and audio data.

<a href="#">Link to this property</a>

meeting\_id: optional string

The ID of the meeting.

<a href="#">Link to this property</a>

name: optional string

Name of the livestream.

<a href="#">Link to this property</a>

playback\_url: optional string

The web address that viewers can use to watch the livestream.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "LIVE"or "IDLE"or "ERRORED"or "INVOKED"

</summary>

One of the following:

"LIVE"

<a href="#">Link to this property</a>

"IDLE"

<a href="#">Link to this property</a>

"ERRORED"

<a href="#">Link to this property</a>

"INVOKED"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

stream\_key: optional string

Unique key for accessing each livestream.

<a href="#">Link to this property</a>

updated\_at: optional string

Timestamp the object was updated at. The time is returned in ISO format.

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

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

session: optional object {id, created\_at, err\_message, 7 more }

</summary>

id: optional string

ID of the session.

<a href="#">Link to this property</a>

created\_at: optional string

Timestamp the object was created at. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

err\_message: optional string

<a href="#">Link to this property</a>

ingest\_seconds: optional number

The time duration for which the input was given or the meeting was streamed.

<a href="#">Link to this property</a>

invoked\_time: optional string

Timestamp the object was invoked. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

livestream\_id: optional string

<a href="#">Link to this property</a>

started\_time: optional string

Timestamp the object was started. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

stopped\_time: optional string

Timestamp the object was stopped. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

updated\_at: optional string

Timestamp the object was updated at. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

viewer\_seconds: optional number

The total view time for which the viewers watched the stream.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(model)%20livestream_get_livestream_session_for_livestream_id_response%20%3E%20(schema)>)