---
title: Fetch active recording
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Realtime Kit](https://developers.cloudflare.com/api/resources/realtime_kit)

[Recordings](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/recordings)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Fetch active recording

GET/accounts/{account\_id}/realtime/kit/{app\_id}/recordings/active-recording/{meeting\_id}

Returns the active recording details for the given meeting ID.

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

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(method)%20get_active_recordings%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

app\_id: string

The app identifier tag.

maxLength32

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(method)%20get_active_recordings%20%3E%20(params)%20default%20%3E%20(param)%20app_id%20%3E%20(schema)>)

meeting\_id: string

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(method)%20get_active_recordings%20%3E%20(params)%20default%20%3E%20(param)%20meeting_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

data: object {id, audio\_download\_url, download\_url, 9 more }

Data returned by the operation

</summary>

id: string

ID of the recording

formatuuid

<a href="#">Link to this property</a>

audio\_download\_url: string

If the audio\_config is passed, the URL for downloading the audio recording is returned.

formaturi

<a href="#">Link to this property</a>

download\_url: string

URL where the recording can be downloaded.

formaturi

<a href="#">Link to this property</a>

download\_url\_expiry: string

Timestamp when the download URL expires.

formatdate-time

<a href="#">Link to this property</a>

file\_size: number

File size of the recording, in bytes.

<a href="#">Link to this property</a>

invoked\_time: string

Timestamp when this recording was invoked.

formatdate-time

<a href="#">Link to this property</a>

output\_file\_name: string

File name of the recording.

<a href="#">Link to this property</a>

session\_id: string

ID of the meeting session this recording is for.

formatuuid

<a href="#">Link to this property</a>

started\_time: string

Timestamp when this recording actually started after being invoked. Usually a few seconds after <code>invoked_time</code>.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

status: "INVOKED"or "RECORDING"or "UPLOADING"or 3 more

Current status of the recording.

</summary>

One of the following:

"INVOKED"

<a href="#">Link to this property</a>

"RECORDING"

<a href="#">Link to this property</a>

"UPLOADING"

<a href="#">Link to this property</a>

"UPLOADED"

<a href="#">Link to this property</a>

"ERRORED"

<a href="#">Link to this property</a>

"PAUSED"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

stopped\_time: string

Timestamp when this recording was stopped. Optional; is present only when the recording has actually been stopped.

formatdate-time

<a href="#">Link to this property</a>

recording\_duration: optional number

Total recording time in seconds.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(model)%20recording_get_active_recordings_response%20%3E%20(schema)%20%3E%20(property)%20data>)

success: boolean

Success status of the operation

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(model)%20recording_get_active_recordings_response%20%3E%20(schema)%20%3E%20(property)%20success>)

### Fetch active recording

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/recordings/active-recording/$MEETING_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "data": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "audio_download_url": "https://example.com",
    "download_url": "https://example.com",
    "download_url_expiry": "2019-12-27T18:11:19.117Z",
    "file_size": 0,
    "invoked_time": "2019-12-27T18:11:19.117Z",
    "output_file_name": "output_file_name",
    "session_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "started_time": "2019-12-27T18:11:19.117Z",
    "status": "INVOKED",
    "stopped_time": "2019-12-27T18:11:19.117Z",
    "recording_duration": 0
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "data": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "audio_download_url": "https://example.com",
    "download_url": "https://example.com",
    "download_url_expiry": "2019-12-27T18:11:19.117Z",
    "file_size": 0,
    "invoked_time": "2019-12-27T18:11:19.117Z",
    "output_file_name": "output_file_name",
    "session_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "started_time": "2019-12-27T18:11:19.117Z",
    "status": "INVOKED",
    "stopped_time": "2019-12-27T18:11:19.117Z",
    "recording_duration": 0
  },
  "success": true
}
```