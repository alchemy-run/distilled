---
title: Fetch livestream details using livestream ID
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Realtime Kit](https://developers.cloudflare.com/api/resources/realtime_kit)

[Livestreams](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/livestreams)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Fetch livestream details using livestream ID

GET/accounts/{account\_id}/realtime/kit/{app\_id}/livestreams/{livestream\_id}

Returns details of a livestream with sessions for the given livestream ID. Retreive the livestream ID using the `Start livestreaming a meeting` API.

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

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20get_livestream_session_for_livestream_id%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

app\_id: string

The app identifier tag.

maxLength32

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20get_livestream_session_for_livestream_id%20%3E%20(params)%20default%20%3E%20(param)%20app_id%20%3E%20(schema)>)

livestream\_id: string

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20get_livestream_session_for_livestream_id%20%3E%20(params)%20default%20%3E%20(param)%20livestream_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

page\_no: optional number

The page number from which you want your page search results to be displayed.

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20get_livestream_session_for_livestream_id%20%3E%20(params)%20default%20%3E%20(param)%20page_no%20%3E%20(schema)>)

per\_page: optional number

Number of results per page.

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20get_livestream_session_for_livestream_id%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

##### ReturnsExpand Collapse

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

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(model)%20livestream_get_livestream_session_for_livestream_id_response%20%3E%20(schema)%20%3E%20(property)%20data>)

success: optional boolean

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(model)%20livestream_get_livestream_session_for_livestream_id_response%20%3E%20(schema)%20%3E%20(property)%20success>)

### Fetch livestream details using livestream ID

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/livestreams/$LIVESTREAM_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "data": {
    "livestream": {
      "id": "id",
      "created_at": "created_at",
      "disabled": "disabled",
      "ingest_server": "ingest_server",
      "meeting_id": "meeting_id",
      "name": "name",
      "playback_url": "playback_url",
      "status": "LIVE",
      "stream_key": "stream_key",
      "updated_at": "updated_at"
    },
    "paging": {
      "end_offset": 1,
      "start_offset": 1,
      "total_count": 1
    },
    "session": {
      "id": "id",
      "created_at": "2019-12-27T18:11:19.117Z",
      "err_message": "err_message",
      "ingest_seconds": 0,
      "invoked_time": "2019-12-27T18:11:19.117Z",
      "livestream_id": "livestream_id",
      "started_time": "2019-12-27T18:11:19.117Z",
      "stopped_time": "2019-12-27T18:11:19.117Z",
      "updated_at": "2019-12-27T18:11:19.117Z",
      "viewer_seconds": 0
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
    "livestream": {
      "id": "id",
      "created_at": "created_at",
      "disabled": "disabled",
      "ingest_server": "ingest_server",
      "meeting_id": "meeting_id",
      "name": "name",
      "playback_url": "playback_url",
      "status": "LIVE",
      "stream_key": "stream_key",
      "updated_at": "updated_at"
    },
    "paging": {
      "end_offset": 1,
      "start_offset": 1,
      "total_count": 1
    },
    "session": {
      "id": "id",
      "created_at": "2019-12-27T18:11:19.117Z",
      "err_message": "err_message",
      "ingest_seconds": 0,
      "invoked_time": "2019-12-27T18:11:19.117Z",
      "livestream_id": "livestream_id",
      "started_time": "2019-12-27T18:11:19.117Z",
      "stopped_time": "2019-12-27T18:11:19.117Z",
      "updated_at": "2019-12-27T18:11:19.117Z",
      "viewer_seconds": 0
    }
  },
  "success": true
}
```