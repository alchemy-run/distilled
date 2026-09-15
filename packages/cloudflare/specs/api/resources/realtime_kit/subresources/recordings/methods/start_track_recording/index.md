---
title: Start recording participant audio tracks
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Realtime Kit](https://developers.cloudflare.com/api/resources/realtime_kit)

[Recordings](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/recordings)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Start recording participant audio tracks

POST/accounts/{account\_id}/realtime/kit/{app\_id}/recordings/track

Starts track recording for a meeting. Track recording currently records separate participant audio tracks as WebM files in the RealtimeKit bucket. Video track recording is in development. For more information, refer to [Track recording](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/track-recording/).

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

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(method)%20start_track_recording%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

app\_id: string

The app identifier tag.

maxLength32

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(method)%20start_track_recording%20%3E%20(params)%20default%20%3E%20(param)%20app_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

meeting\_id: string

ID of the meeting to record.

formatuuid

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(method)%20start_track_recording%20%3E%20(params)%200%20%3E%20(param)%20meeting_id%20%3E%20(schema)>)

<details>

<summary>

layers: optional map\[object {file\_name\_prefix, media\_kind } ]

Optional audio layer configuration. If omitted, RealtimeKit records all participant audio using the default file name prefix.

</summary>

file\_name\_prefix: optional string

A file name prefix to apply for files generated from this layer

<a href="#">Link to this property</a>

media\_kind: optional "audio"

Media kind to record. Track recording currently supports audio only.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(method)%20start_track_recording%20%3E%20(params)%200%20%3E%20(param)%20layers%20%3E%20(schema)>)

user\_ids: optional array of string

Optional list of participant user IDs to record. Selective track recording (`user_ids`) is in early beta contact support to use this feature.

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(method)%20start_track_recording%20%3E%20(params)%200%20%3E%20(param)%20user_ids%20%3E%20(schema)>)

##### ReturnsExpand Collapse

success: boolean

Success status of the operation

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(model)%20recording_start_track_recording_response%20%3E%20(schema)%20%3E%20(property)%20success>)

<details>

<summary>

data: optional object {recording }

Data returned by the operation

</summary>

<details>

<summary>

recording: object {id, audio\_download\_url, download\_url, 9 more }

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

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(model)%20recording_start_track_recording_response%20%3E%20(schema)%20%3E%20(property)%20data>)

### Start recording participant audio tracks

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/recordings/track \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "meeting_id": "97440c6a-140b-40a9-9499-b23fd7a3868a"
        }'
```

200 example

```
{
  "success": true,
  "data": {
    "recording": {
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
    }
  }
}
```

##### Returns Examples

200 example

```
{
  "success": true,
  "data": {
    "recording": {
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
    }
  }
}
```