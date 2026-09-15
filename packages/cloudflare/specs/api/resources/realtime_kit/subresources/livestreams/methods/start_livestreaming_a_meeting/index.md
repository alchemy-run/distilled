---
title: Start livestreaming a meeting
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Realtime Kit](https://developers.cloudflare.com/api/resources/realtime_kit)

[Livestreams](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/livestreams)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Start livestreaming a meeting

POST/accounts/{account\_id}/realtime/kit/{app\_id}/meetings/{meeting\_id}/livestreams

Starts livestream of a meeting associated with the given meeting ID. Retreive the meeting ID using the `Create a meeting` API.

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

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20start_livestreaming_a_meeting%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

app\_id: string

The app identifier tag.

maxLength32

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20start_livestreaming_a_meeting%20%3E%20(params)%20default%20%3E%20(param)%20app_id%20%3E%20(schema)>)

meeting\_id: string

formatuuid

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20start_livestreaming_a_meeting%20%3E%20(params)%20default%20%3E%20(param)%20meeting_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

name: optional string

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20start_livestreaming_a_meeting%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

<details>

<summary>

video\_config: optional object {height, width }

</summary>

height: optional number

Height of the livestreaming video in pixels

<a href="#">Link to this property</a>

width: optional number

Width of the livestreaming video in pixels

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20start_livestreaming_a_meeting%20%3E%20(params)%200%20%3E%20(param)%20video_config%20%3E%20(schema)>)

##### ReturnsExpand Collapse

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

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(model)%20livestream_start_livestreaming_a_meeting_response%20%3E%20(schema)%20%3E%20(property)%20data>)

success: optional boolean

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(model)%20livestream_start_livestreaming_a_meeting_response%20%3E%20(schema)%20%3E%20(property)%20success>)

### Start livestreaming a meeting

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID/livestreams \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
```

201 example

```
{
  "data": {
    "id": "7088bba8-f522-49a8-b59b-3cd0e946bbb0",
    "ingest_server": "rtmps://live.cloudflare.com:443/live/",
    "playback_url": "https://customer-s8oj0c1n5ek8ah1e.cloudflarestream.com/7de6a3fec0f9c05bf1df140950d3a237/manifest/video.m3u8",
    "status": "INVOKED",
    "stream_key": "f26566285faca6fbe2e79a73a66rsrrsrrsr3cde23a2bb7dbc6c2c1761b98f4e4"
  },
  "success": true
}
```

##### Returns Examples

201 example

```
{
  "data": {
    "id": "7088bba8-f522-49a8-b59b-3cd0e946bbb0",
    "ingest_server": "rtmps://live.cloudflare.com:443/live/",
    "playback_url": "https://customer-s8oj0c1n5ek8ah1e.cloudflarestream.com/7de6a3fec0f9c05bf1df140950d3a237/manifest/video.m3u8",
    "status": "INVOKED",
    "stream_key": "f26566285faca6fbe2e79a73a66rsrrsrrsr3cde23a2bb7dbc6c2c1761b98f4e4"
  },
  "success": true
}
```