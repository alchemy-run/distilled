---
title: Fetch livestream session details using livestream session ID
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Realtime Kit](https://developers.cloudflare.com/api/resources/realtime_kit)

[Livestreams](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/livestreams)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Fetch livestream session details using livestream session ID

GET/accounts/{account\_id}/realtime/kit/{app\_id}/livestreams/sessions/{livestream-session-id}

Returns livestream session details for the given livestream session ID. Retrieve the `livestream_session_id`using the `Fetch livestream session details using a session ID` API.

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

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20get_livestream_session_details_for_session_id%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

app\_id: string

The app identifier tag.

maxLength32

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20get_livestream_session_details_for_session_id%20%3E%20(params)%20default%20%3E%20(param)%20app_id%20%3E%20(schema)>)

"livestream-session-id": string

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(method)%20get_livestream_session_details_for_session_id%20%3E%20(params)%20default%20%3E%20(param)%20livestream-session-id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

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

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(model)%20livestream_get_livestream_session_details_for_session_id_response%20%3E%20(schema)%20%3E%20(property)%20data>)

success: optional boolean

[Link to this property](#)%20realtime_kit.livestreams%20%3E%20(model)%20livestream_get_livestream_session_details_for_session_id_response%20%3E%20(schema)%20%3E%20(property)%20success>)

### Fetch livestream session details using livestream session ID

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/livestreams/sessions/$LIVESTREAM_SESSION_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "data": {
    "id": "id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "err_message": "err_message",
    "ingest_seconds": 0,
    "livestream_id": "livestream_id",
    "started_time": "started_time",
    "stopped_time": "stopped_time",
    "updated_at": "updated_at",
    "viewer_seconds": 0
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
    "err_message": "err_message",
    "ingest_seconds": 0,
    "livestream_id": "livestream_id",
    "started_time": "started_time",
    "stopped_time": "stopped_time",
    "updated_at": "updated_at",
    "viewer_seconds": 0
  },
  "success": true
}
```