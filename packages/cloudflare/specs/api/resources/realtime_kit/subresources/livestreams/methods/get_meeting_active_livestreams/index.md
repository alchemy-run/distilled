---
title: Fetch active livestreams for a meeting
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Realtime Kit](https://developers.cloudflare.com/api/resources/realtime_kit)

[Livestreams](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/livestreams)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Fetch active livestreams for a meeting

GET/accounts/{account\_id}/realtime/kit/{app\_id}/meetings/{meeting\_id}/active-livestream

Returns details of all active livestreams for the given meeting ID.

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

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20get_meeting_active_livestreams%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

app\_id: string

The app identifier tag.

maxLength32

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20get_meeting_active_livestreams%20%3E%20(params)%20default%20%3E%20(param)%20app_id%20%3E%20(schema)>)

meeting\_id: string

formatuuid

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20get_meeting_active_livestreams%20%3E%20(params)%20default%20%3E%20(param)%20meeting_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

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

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(model)%20livestream_get_meeting_active_livestreams_response%20%3E%20(schema)%20%3E%20(property)%20data>)

success: optional boolean

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(model)%20livestream_get_meeting_active_livestreams_response%20%3E%20(schema)%20%3E%20(property)%20success>)

### Fetch active livestreams for a meeting

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID/active-livestream \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "data": {
    "id": "id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "disabled": "disabled",
    "ingest_server": "ingest_server",
    "meeting_id": "meeting_id",
    "name": "name",
    "playback_url": "playback_url",
    "status": "LIVE",
    "stream_key": "stream_key",
    "updated_at": "2019-12-27T18:11:19.117Z"
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "data": {
    "id": "id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "disabled": "disabled",
    "ingest_server": "ingest_server",
    "meeting_id": "meeting_id",
    "name": "name",
    "playback_url": "playback_url",
    "status": "LIVE",
    "stream_key": "stream_key",
    "updated_at": "2019-12-27T18:11:19.117Z"
  },
  "success": true
}
```