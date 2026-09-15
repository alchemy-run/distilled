---
title: Fetch all livestreams
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Realtime Kit](https://developers.cloudflare.com/api/resources/realtime_kit)

[Livestreams](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/livestreams)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Fetch all livestreams

GET/accounts/{account\_id}/realtime/kit/{app\_id}/livestreams

Returns details of livestreams associated with the given App ID. It includes livestreams created by your App and RealtimeKit meetings that are livestreamed by your App. If you only want details of livestreams created by your App and not RealtimeKit meetings, you can use the `exclude_meetings` query parameter.

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

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20get_all_livestreams%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

app\_id: string

The app identifier tag.

maxLength32

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20get_all_livestreams%20%3E%20(params)%20default%20%3E%20(param)%20app_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

end\_time: optional string

Specify the end time range in ISO format to access the live stream.

formatdate-time

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20get_all_livestreams%20%3E%20(params)%20default%20%3E%20(param)%20end_time%20%3E%20(schema)>)

exclude\_meetings: optional boolean

Exclude the RealtimeKit meetings that are livestreamed.

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20get_all_livestreams%20%3E%20(params)%20default%20%3E%20(param)%20exclude_meetings%20%3E%20(schema)>)

page\_no: optional number

The page number from which you want your page search results to be displayed.

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20get_all_livestreams%20%3E%20(params)%20default%20%3E%20(param)%20page_no%20%3E%20(schema)>)

per\_page: optional number

Number of results per page.

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20get_all_livestreams%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

<details>

<summary>

sort\_order: optional "ASC"or "DSC"

Specifies the sorting order for the results.

</summary>

One of the following:

"ASC"

<a href="#">Link to this property</a>

"DSC"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20get_all_livestreams%20%3E%20(params)%20default%20%3E%20(param)%20sort_order%20%3E%20(schema)>)

start\_time: optional string

Specify the start time range in ISO format to access the live stream.

formatdate-time

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20get_all_livestreams%20%3E%20(params)%20default%20%3E%20(param)%20start_time%20%3E%20(schema)>)

<details>

<summary>

status: optional "LIVE"or "IDLE"or "ERRORED"or "INVOKED"

Specifies the status of the operation.

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

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20get_all_livestreams%20%3E%20(params)%20default%20%3E%20(param)%20status%20%3E%20(schema)>)

##### ReturnsExpand Collapse

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

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(model)%20livestream_get_all_livestreams_response%20%3E%20(schema)%20%3E%20(property)%20data>)

success: optional boolean

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(model)%20livestream_get_all_livestreams_response%20%3E%20(schema)%20%3E%20(property)%20success>)

### Fetch all livestreams

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/livestreams \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "data": {
    "id": "3fd739f4-3c41-456e-bfba-6ebd51e16d2d",
    "created_at": "2023-07-15T11:48:34.753Z",
    "disabled": "disabled",
    "ingest_server": "rtmps://live.cloudflare.com:443/live/",
    "meeting_id": "meeting_id",
    "name": "test",
    "paging": {
      "end_offset": 1,
      "start_offset": 1,
      "total_count": 1
    },
    "playback_url": "https://customer-s8oj0c1n5ek8ah1e.cloudflarestream.com/7de6a3fec0f9c05bf1df140950d3a237/manifest/video.m3u8",
    "status": "LIVE",
    "stream_key": "f26566285faca6fbe2e79a73a66rsrrsrrsr3cde23a2bb7dbc6c2c1761b98f4e4",
    "updated_at": "2023-07-15T11:48:34.753Z"
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "data": {
    "id": "3fd739f4-3c41-456e-bfba-6ebd51e16d2d",
    "created_at": "2023-07-15T11:48:34.753Z",
    "disabled": "disabled",
    "ingest_server": "rtmps://live.cloudflare.com:443/live/",
    "meeting_id": "meeting_id",
    "name": "test",
    "paging": {
      "end_offset": 1,
      "start_offset": 1,
      "total_count": 1
    },
    "playback_url": "https://customer-s8oj0c1n5ek8ah1e.cloudflarestream.com/7de6a3fec0f9c05bf1df140950d3a237/manifest/video.m3u8",
    "status": "LIVE",
    "stream_key": "f26566285faca6fbe2e79a73a66rsrrsrrsr3cde23a2bb7dbc6c2c1761b98f4e4",
    "updated_at": "2023-07-15T11:48:34.753Z"
  },
  "success": true
}
```