---
title: Stream
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Stream

##### [List videos](https://developers.cloudflare.com/api/resources/stream/methods/list)

GET/accounts/{account\_id}/stream

##### [Retrieve video details](https://developers.cloudflare.com/api/resources/stream/methods/get)

GET/accounts/{account\_id}/stream/{identifier}

##### [Initiate video uploads using TUS](https://developers.cloudflare.com/api/resources/stream/methods/create)

POST/accounts/{account\_id}/stream

##### [Edit video details](https://developers.cloudflare.com/api/resources/stream/methods/edit)

POST/accounts/{account\_id}/stream/{identifier}

##### [Delete video](https://developers.cloudflare.com/api/resources/stream/methods/delete)

DELETE/accounts/{account\_id}/stream/{identifier}

##### ModelsExpand Collapse

AllowedOrigins = string

[Link to this property](#)%20stream%20%3E%20(model)%20allowed_origins%20%3E%20(schema)>)

<details>

<summary>

Video object {allowedOrigins, clippedFrom, created, 23 more }

</summary>

allowedOrigins: optional array of <a href="https://developers.cloudflare.com/api/resources/stream#(resource)%20stream%20%3E%20(model)%20allowed_origins%20%3E%20(schema)">AllowedOrigins</a>

Lists the origins allowed to display the video. Enter allowed origin domains in an array and use <code>*</code> for wildcard subdomains. Empty arrays allow the video to be viewed on any origin.

<a href="#">Link to this property</a>

clippedFrom: optional string

The unique identifier of the source video this video was clipped from.

<a href="#">Link to this property</a>

created: optional string

The date and time the media item was created.

formatdate-time

<a href="#">Link to this property</a>

creator: optional string

A user-defined identifier for the media creator.

maxLength64

<a href="#">Link to this property</a>

duration: optional number

The duration of the video in seconds. A value of <code>-1</code> means the duration is unknown. The duration becomes available after the upload and before the video is ready.

<a href="#">Link to this property</a>

<details>

<summary>

input: optional object {height, width }

</summary>

height: optional number

The video height in pixels. A value of <code>-1</code> means the height is unknown. The value becomes available after the upload and before the video is ready.

<a href="#">Link to this property</a>

width: optional number

The video width in pixels. A value of <code>-1</code> means the width is unknown. The value becomes available after the upload and before the video is ready.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

liveInput: optional string

The live input ID used to upload a video with Stream Live.

maxLength32

<a href="#">Link to this property</a>

maxDurationSeconds: optional number

The maximum duration in seconds for a video upload. Can be set for a video that is not yet uploaded to limit its duration. Uploads that exceed the specified duration will fail during processing. A value of <code>-1</code> means the value is unknown.

maximum36000

minimum1

<a href="#">Link to this property</a>

maxSizeBytes: optional number

The maximum size in bytes for the video upload.

formatint64

<a href="#">Link to this property</a>

meta: optional unknown

A user modifiable key-value store used to reference other systems of record for managing videos.

<a href="#">Link to this property</a>

modified: optional string

The date and time the media item was last modified.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

playback: optional object {dash, hls }

</summary>

dash: optional string

DASH Media Presentation Description for the video.

<a href="#">Link to this property</a>

hls: optional string

The HLS manifest for the video.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

preview: optional string

The video’s preview page URI. This field is omitted until encoding is complete.

formaturi

<a href="#">Link to this property</a>

<details>

<summary>

publicDetails: optional object {channel\_link, logo, media\_id, 2 more }

Public details for the video including title, share link, channel link, and logo.

</summary>

channel\_link: optional string

<a href="#">Link to this property</a>

logo: optional string

<a href="#">Link to this property</a>

media\_id: optional number

<a href="#">Link to this property</a>

share\_link: optional string

<a href="#">Link to this property</a>

title: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

readyToStream: optional boolean

Indicates whether the video is playable. The field is empty if the video is not ready for viewing or the live stream is still in progress.

<a href="#">Link to this property</a>

readyToStreamAt: optional string

Indicates the time at which the video became playable. The field is empty if the video is not ready for viewing or the live stream is still in progress.

formatdate-time

<a href="#">Link to this property</a>

requireSignedURLs: optional boolean

Indicates whether the video can be a accessed using the UID. When set to <code>true</code>, a signed token must be generated with a signing key to view the video.

<a href="#">Link to this property</a>

scheduledDeletion: optional string

Indicates the date and time at which the video will be deleted. Omit the field to indicate no change, or include with a <code>null</code> value to remove an existing scheduled deletion. If specified, must be at least 30 days from upload time.

formatdate-time

<a href="#">Link to this property</a>

size: optional number

The size of the media item in bytes.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional object {errorReasonCode, errorReasonText, pctComplete, state }

Specifies a detailed status for a video. If the <code>state</code> is <code>inprogress</code> or <code>error</code>, the <code>step</code> field returns <code>encoding</code> or <code>manifest</code>. If the <code>state</code> is <code>inprogress</code>, <code>pctComplete</code> returns a number between 0 and 100 to indicate the approximate percent of completion. If the <code>state</code> is <code>error</code>, <code>errorReasonCode</code> and <code>errorReasonText</code> provide additional details.

</summary>

errorReasonCode: optional string

Specifies why the video failed to encode. This field is empty if the video is not in an <code>error</code> state. Preferred for programmatic use.

<a href="#">Link to this property</a>

errorReasonText: optional string

Specifies why the video failed to encode using a human readable error message in English. This field is empty if the video is not in an <code>error</code> state.

<a href="#">Link to this property</a>

pctComplete: optional string

Indicates the progress as a percentage between 0 and 100.

<a href="#">Link to this property</a>

<details>

<summary>

state: optional "pendingupload"or "downloading"or "queued"or 4 more

Specifies the processing status for all quality levels for a video.

</summary>

One of the following:

"pendingupload"

<a href="#">Link to this property</a>

"downloading"

<a href="#">Link to this property</a>

"queued"

<a href="#">Link to this property</a>

"inprogress"

<a href="#">Link to this property</a>

"ready"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

"live-inprogress"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

thumbnail: optional string

The media item’s thumbnail URI. This field is omitted until encoding is complete.

formaturi

<a href="#">Link to this property</a>

thumbnailTimestampPct: optional number

The timestamp for a thumbnail image calculated as a percentage value of the video’s duration. To convert from a second-wise timestamp to a percentage, divide the desired timestamp by the total duration of the video. If this value is not set, the default thumbnail image is taken from 0s of the video.

maximum1

minimum0

<a href="#">Link to this property</a>

uid: optional string

A Cloudflare-generated unique identifier for a media item.

maxLength32

<a href="#">Link to this property</a>

uploaded: optional string

The date and time the media item was uploaded.

formatdate-time

<a href="#">Link to this property</a>

uploadExpiry: optional string

The date and time when the video upload URL is no longer valid for direct user uploads.

formatdate-time

<a href="#">Link to this property</a>

watermark: optional <a href="https://developers.cloudflare.com/api/resources/stream#(resource)%20stream.watermarks%20%3E%20(model)%20watermark%20%3E%20(schema)">Watermark</a> { created, downloadedFrom, height, 8 more }

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream%20%3E%20(model)%20video%20%3E%20(schema)>)

#### StreamAudio Tracks

##### [List additional audio tracks on a video](https://developers.cloudflare.com/api/resources/stream/subresources/audio_tracks/methods/get)

GET/accounts/{account\_id}/stream/{identifier}/audio

##### [Edit additional audio tracks on a video](https://developers.cloudflare.com/api/resources/stream/subresources/audio_tracks/methods/edit)

PATCH/accounts/{account\_id}/stream/{identifier}/audio/{audio\_identifier}

##### [Delete additional audio tracks on a video](https://developers.cloudflare.com/api/resources/stream/subresources/audio_tracks/methods/delete)

DELETE/accounts/{account\_id}/stream/{identifier}/audio/{audio\_identifier}

##### [Add audio tracks to a video](https://developers.cloudflare.com/api/resources/stream/subresources/audio_tracks/methods/copy)

POST/accounts/{account\_id}/stream/{identifier}/audio/copy

##### ModelsExpand Collapse

<details>

<summary>

Audio object {default, label, status, uid }

</summary>

default: optional boolean

Denotes whether the audio track will be played by default in a player.

<a href="#">Link to this property</a>

label: optional string

A string to uniquely identify the track amongst other audio track labels for the specified video.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "queued"or "ready"or "error"

Specifies the processing status of the video.

</summary>

One of the following:

"queued"

<a href="#">Link to this property</a>

"ready"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

uid: optional string

A Cloudflare-generated unique identifier for a media item.

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.audio_tracks%20%3E%20(model)%20audio%20%3E%20(schema)>)

<details>

<summary>

AudioTrackGetResponse object {audio }

</summary>

<details>

<summary>

audio: optional array of <a href="https://developers.cloudflare.com/api/resources/stream#(resource)%20stream.audio_tracks%20%3E%20(model)%20audio%20%3E%20(schema)">Audio</a> { default, label, status, uid }

Array of audio tracks for the video.

</summary>

default: optional boolean

Denotes whether the audio track will be played by default in a player.

<a href="#">Link to this property</a>

label: optional string

A string to uniquely identify the track amongst other audio track labels for the specified video.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "queued"or "ready"or "error"

Specifies the processing status of the video.

</summary>

One of the following:

"queued"

<a href="#">Link to this property</a>

"ready"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

uid: optional string

A Cloudflare-generated unique identifier for a media item.

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.audio_tracks%20%3E%20(model)%20audio_track_get_response%20%3E%20(schema)>)

AudioTrackDeleteResponse = string

[Link to this property](#)%20stream.audio_tracks%20%3E%20(model)%20audio_track_delete_response%20%3E%20(schema)>)

#### StreamVideos

##### [Storage use](https://developers.cloudflare.com/api/resources/stream/subresources/videos/methods/storage_usage)

GET/accounts/{account\_id}/stream/storage-usage

##### ModelsExpand Collapse

<details>

<summary>

VideoStorageUsageResponse object {creator, totalStorageMinutes, totalStorageMinutesLimit, videoCount }

</summary>

creator: optional string

A user-defined identifier for the media creator.

maxLength64

<a href="#">Link to this property</a>

totalStorageMinutes: optional number

The total minutes of video content stored in the account. May contain decimal values.

formatfloat

<a href="#">Link to this property</a>

totalStorageMinutesLimit: optional number

The storage capacity alloted for the account.

<a href="#">Link to this property</a>

videoCount: optional number

The total count of videos associated with the account.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.videos%20%3E%20(model)%20video_storage_usage_response%20%3E%20(schema)>)

#### StreamClip

##### [Clip videos given a start and end time](https://developers.cloudflare.com/api/resources/stream/subresources/clip/methods/create)

POST/accounts/{account\_id}/stream/clip

#### StreamCopy

##### [Upload videos from a URL](https://developers.cloudflare.com/api/resources/stream/subresources/copy/methods/create)

POST/accounts/{account\_id}/stream/copy

#### StreamDirect Upload

##### [Upload videos via direct upload URLs](https://developers.cloudflare.com/api/resources/stream/subresources/direct_upload/methods/create)

POST/accounts/{account\_id}/stream/direct\_upload

##### ModelsExpand Collapse

<details>

<summary>

DirectUploadCreateResponse object {scheduledDeletion, uid, uploadURL, watermark }

</summary>

scheduledDeletion: optional string

Indicates the date and time at which the video will be deleted. Omit the field to indicate no change, or include with a <code>null</code> value to remove an existing scheduled deletion. If specified, must be at least 30 days from upload time.

formatdate-time

<a href="#">Link to this property</a>

uid: optional string

A Cloudflare-generated unique identifier for a media item.

maxLength32

<a href="#">Link to this property</a>

uploadURL: optional string

The URL an unauthenticated upload can use for a single <code>HTTP POST multipart/form-data</code> request.

<a href="#">Link to this property</a>

watermark: optional <a href="https://developers.cloudflare.com/api/resources/stream#(resource)%20stream.watermarks%20%3E%20(model)%20watermark%20%3E%20(schema)">Watermark</a> { created, downloadedFrom, height, 8 more }

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.direct_upload%20%3E%20(model)%20direct_upload_create_response%20%3E%20(schema)>)

#### StreamKeys

##### [List signing keys](https://developers.cloudflare.com/api/resources/stream/subresources/keys/methods/get)

GET/accounts/{account\_id}/stream/keys

##### [Create signing keys](https://developers.cloudflare.com/api/resources/stream/subresources/keys/methods/create)

POST/accounts/{account\_id}/stream/keys

##### [Delete signing keys](https://developers.cloudflare.com/api/resources/stream/subresources/keys/methods/delete)

DELETE/accounts/{account\_id}/stream/keys/{identifier}

##### ModelsExpand Collapse

<details>

<summary>

Keys object {id, created, jwk, pem }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

created: optional string

The date and time a signing key was created.

formatdate-time

<a href="#">Link to this property</a>

jwk: optional string

The signing key in JWK format.

<a href="#">Link to this property</a>

pem: optional string

The signing key in PEM format.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.keys%20%3E%20(model)%20keys%20%3E%20(schema)>)

<details>

<summary>

KeyGetResponse object {id, created, key\_id }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

created: optional string

The date and time a signing key was created.

formatdate-time

<a href="#">Link to this property</a>

key\_id: optional string

The unique identifier for the signing key.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.keys%20%3E%20(model)%20key_get_response%20%3E%20(schema)>)

KeyDeleteResponse = string

[Link to this property](#)%20stream.keys%20%3E%20(model)%20key_delete_response%20%3E%20(schema)>)

#### StreamLive Inputs

##### [List live inputs](https://developers.cloudflare.com/api/resources/stream/subresources/live_inputs/methods/list)

GET/accounts/{account\_id}/stream/live\_inputs

##### [Retrieve a live input](https://developers.cloudflare.com/api/resources/stream/subresources/live_inputs/methods/get)

GET/accounts/{account\_id}/stream/live\_inputs/{live\_input\_identifier}

##### [Create a live input](https://developers.cloudflare.com/api/resources/stream/subresources/live_inputs/methods/create)

POST/accounts/{account\_id}/stream/live\_inputs

##### [Update a live input](https://developers.cloudflare.com/api/resources/stream/subresources/live_inputs/methods/update)

PUT/accounts/{account\_id}/stream/live\_inputs/{live\_input\_identifier}

##### [Delete a live input](https://developers.cloudflare.com/api/resources/stream/subresources/live_inputs/methods/delete)

DELETE/accounts/{account\_id}/stream/live\_inputs/{live\_input\_identifier}

##### ModelsExpand Collapse

<details>

<summary>

LiveInput object {created, deleteRecordingAfterDays, enabled, 14 more }

Details about a live input.

</summary>

created: optional string

The date and time the live input was created.

formatdate-time

<a href="#">Link to this property</a>

deleteRecordingAfterDays: optional number

Indicates the number of days after which the live inputs recordings will be deleted. When a stream completes and the recording is ready, the value is used to calculate a scheduled deletion date for that recording. Omit the field to indicate no change, or include with a <code>null</code> value to remove an existing scheduled deletion.

minimum30

<a href="#">Link to this property</a>

enabled: optional boolean

Indicates whether the live input is enabled and can accept streams.

<a href="#">Link to this property</a>

keysRotatedAt: optional string

The date and time the live input keys were last rotated. Omitted for live inputs that have never had their keys rotated.

formatdate-time

<a href="#">Link to this property</a>

meta: optional unknown

A user modifiable key-value store used to reference other systems of record for managing live inputs.

<a href="#">Link to this property</a>

modified: optional string

The date and time the live input was last modified.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

playback: optional object {dash, hls }

Details for playing a live input’s broadcast using the HLS or DASH manifests. URLs reference the live input ID.

</summary>

dash: string

The DASH manifest URL used to play live video, referencing the live input ID.

<a href="#">Link to this property</a>

hls: string

The HLS manifest URL used to play live video, referencing the live input ID.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

preferLowLatency: optional boolean

When enabled, the live stream is delivered using Low-Latency HLS (LL-HLS), reducing glass-to-glass latency for viewers at the cost of reduced player compatibility.

<a href="#">Link to this property</a>

<details>

<summary>

recording: optional object {allowedOrigins, hideLiveViewerCount, mode, 2 more }

Records the input to a Cloudflare Stream video. Behavior depends on the mode. In most cases, the video will initially be viewable as a live video and transition to on-demand after a condition is satisfied.

</summary>

allowedOrigins: optional array of string

Lists the origins allowed to display videos created with this input. Enter allowed origin domains in an array and use <code>*</code> for wildcard subdomains. An empty array allows videos to be viewed on any origin.

<a href="#">Link to this property</a>

hideLiveViewerCount: optional boolean

Disables reporting the number of live viewers when this property is set to <code>true</code>.

<a href="#">Link to this property</a>

<details>

<summary>

mode: optional "off"or "automatic"

Specifies the recording behavior for the live input. Set this value to <code>off</code> to prevent a recording. Set the value to <code>automatic</code> to begin a recording and transition to on-demand after Stream Live stops receiving input.

</summary>

One of the following:

"off"

<a href="#">Link to this property</a>

"automatic"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

requireSignedURLs: optional boolean

Indicates if a video using the live input has the <code>requireSignedURLs</code> property set. Also enforces access controls on any video recording of the livestream with the live input.

<a href="#">Link to this property</a>

timeoutSeconds: optional number

Determines the amount of time a live input configured in <code>automatic</code> mode should wait before a recording transitions from live to on-demand. <code>0</code> is recommended for most use cases and indicates the platform default should be used.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

rtmps: optional object {streamKey, url }

Details for streaming to an live input using RTMPS.

</summary>

streamKey: optional string

The secret key to use when streaming via RTMPS to a live input.

<a href="#">Link to this property</a>

url: optional string

The RTMPS URL you provide to the broadcaster, which they stream live video to.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

rtmpsPlayback: optional object {streamKey, url }

Details for playback from an live input using RTMPS.

</summary>

streamKey: optional string

The secret key to use for playback via RTMPS.

<a href="#">Link to this property</a>

url: optional string

The URL used to play live video over RTMPS.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

srt: optional object {passphrase, streamId, url }

Details for streaming to a live input using SRT.

</summary>

passphrase: optional string

The secret key to use when streaming via SRT to a live input.

<a href="#">Link to this property</a>

streamId: optional string

The identifier of the live input to use when streaming via SRT.

<a href="#">Link to this property</a>

url: optional string

The SRT URL you provide to the broadcaster, which they stream live video to.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

srtPlayback: optional object {passphrase, streamId, url }

Details for playback from an live input using SRT.

</summary>

passphrase: optional string

The secret key to use for playback via SRT.

<a href="#">Link to this property</a>

streamId: optional string

The identifier of the live input to use for playback via SRT.

<a href="#">Link to this property</a>

url: optional string

The URL used to play live video over SRT.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "connected"or "reconnected"or "reconnecting"or 5 more

The connection status of a live input.

</summary>

One of the following:

"connected"

<a href="#">Link to this property</a>

"reconnected"

<a href="#">Link to this property</a>

"reconnecting"

<a href="#">Link to this property</a>

"client\_disconnect"

<a href="#">Link to this property</a>

"ttl\_exceeded"

<a href="#">Link to this property</a>

"failed\_to\_connect"

<a href="#">Link to this property</a>

"failed\_to\_reconnect"

<a href="#">Link to this property</a>

"new\_configuration\_accepted"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

uid: optional string

A unique identifier for a live input.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

webRTC: optional object {url }

Details for streaming to a live input using WebRTC.

</summary>

url: optional string

The WebRTC URL you provide to the broadcaster, which they stream live video to.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

webRTCPlayback: optional object {url }

Details for playback from a live input using WebRTC.

</summary>

url: optional string

The URL used to play live video over WebRTC.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.live_inputs%20%3E%20(model)%20live_input%20%3E%20(schema)>)

<details>

<summary>

LiveInputListResponse object {liveInputs, range, total }

</summary>

<details>

<summary>

liveInputs: optional array of object {created, deleteRecordingAfterDays, enabled, 3 more }

</summary>

created: optional string

The date and time the live input was created.

formatdate-time

<a href="#">Link to this property</a>

deleteRecordingAfterDays: optional number

Indicates the number of days after which the live inputs recordings will be deleted. When a stream completes and the recording is ready, the value is used to calculate a scheduled deletion date for that recording. Omit the field to indicate no change, or include with a <code>null</code> value to remove an existing scheduled deletion.

minimum30

<a href="#">Link to this property</a>

enabled: optional boolean

Indicates whether the live input is enabled and can accept streams.

<a href="#">Link to this property</a>

meta: optional unknown

A user modifiable key-value store used to reference other systems of record for managing live inputs.

<a href="#">Link to this property</a>

modified: optional string

The date and time the live input was last modified.

formatdate-time

<a href="#">Link to this property</a>

uid: optional string

A unique identifier for a live input.

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

range: optional number

The total number of remaining live inputs based on cursor position.

<a href="#">Link to this property</a>

total: optional number

The total number of live inputs that match the provided filters.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.live_inputs%20%3E%20(model)%20live_input_list_response%20%3E%20(schema)>)

#### StreamLive InputsOutputs

##### [List all outputs associated with a specified live input](https://developers.cloudflare.com/api/resources/stream/subresources/live_inputs/subresources/outputs/methods/list)

GET/accounts/{account\_id}/stream/live\_inputs/{live\_input\_identifier}/outputs

##### [Create a new output, connected to a live input](https://developers.cloudflare.com/api/resources/stream/subresources/live_inputs/subresources/outputs/methods/create)

POST/accounts/{account\_id}/stream/live\_inputs/{live\_input\_identifier}/outputs

##### [Update an output](https://developers.cloudflare.com/api/resources/stream/subresources/live_inputs/subresources/outputs/methods/update)

PUT/accounts/{account\_id}/stream/live\_inputs/{live\_input\_identifier}/outputs/{output\_identifier}

##### [Delete an output](https://developers.cloudflare.com/api/resources/stream/subresources/live_inputs/subresources/outputs/methods/delete)

DELETE/accounts/{account\_id}/stream/live\_inputs/{live\_input\_identifier}/outputs/{output\_identifier}

##### ModelsExpand Collapse

<details>

<summary>

Output object {enabled, streamKey, uid, url }

</summary>

enabled: optional boolean

When enabled, live video streamed to the associated live input will be sent to the output URL. When disabled, live video will not be sent to the output URL, even when streaming to the associated live input. Use this to control precisely when you start and stop simulcasting to specific destinations like YouTube and Twitch.

<a href="#">Link to this property</a>

streamKey: optional string

The streamKey used to authenticate against an output’s target.

<a href="#">Link to this property</a>

uid: optional string

A unique identifier for the output.

maxLength32

<a href="#">Link to this property</a>

url: optional string

The URL an output uses to restream.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.live_inputs.outputs%20%3E%20(model)%20output%20%3E%20(schema)>)

#### StreamWatermarks

##### [List watermark profiles](https://developers.cloudflare.com/api/resources/stream/subresources/watermarks/methods/list)

GET/accounts/{account\_id}/stream/watermarks

##### [Watermark profile details](https://developers.cloudflare.com/api/resources/stream/subresources/watermarks/methods/get)

GET/accounts/{account\_id}/stream/watermarks/{identifier}

##### [Create watermark profiles via basic upload](https://developers.cloudflare.com/api/resources/stream/subresources/watermarks/methods/create)

POST/accounts/{account\_id}/stream/watermarks

##### [Delete watermark profiles](https://developers.cloudflare.com/api/resources/stream/subresources/watermarks/methods/delete)

DELETE/accounts/{account\_id}/stream/watermarks/{identifier}

##### ModelsExpand Collapse

<details>

<summary>

Watermark object {created, downloadedFrom, height, 8 more }

</summary>

created: optional string

The date and a time a watermark profile was created.

formatdate-time

<a href="#">Link to this property</a>

downloadedFrom: optional string

The source URL for a downloaded image. If the watermark profile was created via direct upload, this field is null.

<a href="#">Link to this property</a>

height: optional number

The height of the image in pixels.

<a href="#">Link to this property</a>

name: optional string

A short description of the watermark profile.

<a href="#">Link to this property</a>

opacity: optional number

The translucency of the image. A value of <code>0.0</code> makes the image completely transparent, and <code>1.0</code> makes the image completely opaque. Note that if the image is already semi-transparent, setting this to <code>1.0</code> will not make the image completely opaque.

maximum1

minimum0

<a href="#">Link to this property</a>

padding: optional number

The whitespace between the adjacent edges (determined by position) of the video and the image. <code>0.0</code> indicates no padding, and <code>1.0</code> indicates a fully padded video width or length, as determined by the algorithm.

maximum1

minimum0

<a href="#">Link to this property</a>

position: optional string

The location of the image. Valid positions are: <code>upperRight</code>, <code>upperLeft</code>, <code>lowerLeft</code>, <code>lowerRight</code>, and <code>center</code>. Note that <code>center</code> ignores the <code>padding</code> parameter.

<a href="#">Link to this property</a>

scale: optional number

The size of the image relative to the overall size of the video. This parameter will adapt to horizontal and vertical videos automatically. <code>0.0</code> indicates no scaling (use the size of the image as-is), and <code>1.0</code> fills the entire video.

maximum1

minimum0

<a href="#">Link to this property</a>

size: optional number

The size of the image in bytes.

<a href="#">Link to this property</a>

uid: optional string

The unique identifier for a watermark profile.

maxLength32

<a href="#">Link to this property</a>

width: optional number

The width of the image in pixels.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.watermarks%20%3E%20(model)%20watermark%20%3E%20(schema)>)

WatermarkDeleteResponse = string

[Link to this property](#)%20stream.watermarks%20%3E%20(model)%20watermark_delete_response%20%3E%20(schema)>)

#### StreamWebhooks

##### [View webhook](https://developers.cloudflare.com/api/resources/stream/subresources/webhooks/methods/get)

GET/accounts/{account\_id}/stream/webhook

##### [Create VOD webhooks](https://developers.cloudflare.com/api/resources/stream/subresources/webhooks/methods/update)

PUT/accounts/{account\_id}/stream/webhook

##### [Delete webhooks](https://developers.cloudflare.com/api/resources/stream/subresources/webhooks/methods/delete)

DELETE/accounts/{account\_id}/stream/webhook

##### ModelsExpand Collapse

<details>

<summary>

WebhookGetResponse object {modified, notification\_url, notificationUrl, secret }

</summary>

modified: optional string

The date and time the webhook was last modified.

formatdate-time

<a href="#">Link to this property</a>

notification\_url: optional string

The URL where webhooks will be sent.

formaturi

<a href="#">Link to this property</a>

notificationUrl: optional string

The URL where webhooks will be sent.

formaturi

<a href="#">Link to this property</a>

secret: optional string

The secret used to verify webhook signatures.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.webhooks%20%3E%20(model)%20webhook_get_response%20%3E%20(schema)>)

<details>

<summary>

WebhookUpdateResponse object {modified, notification\_url, notificationUrl, secret }

</summary>

modified: optional string

The date and time the webhook was last modified.

formatdate-time

<a href="#">Link to this property</a>

notification\_url: optional string

The URL where webhooks will be sent.

formaturi

<a href="#">Link to this property</a>

notificationUrl: optional string

The URL where webhooks will be sent.

formaturi

<a href="#">Link to this property</a>

secret: optional string

The secret used to verify webhook signatures.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.webhooks%20%3E%20(model)%20webhook_update_response%20%3E%20(schema)>)

WebhookDeleteResponse = string

[Link to this property](#)%20stream.webhooks%20%3E%20(model)%20webhook_delete_response%20%3E%20(schema)>)

#### StreamCaptions

##### [List captions or subtitles](https://developers.cloudflare.com/api/resources/stream/subresources/captions/methods/get)

GET/accounts/{account\_id}/stream/{identifier}/captions

##### ModelsExpand Collapse

<details>

<summary>

Caption object {generated, label, language, status }

</summary>

generated: optional boolean

Whether the caption was generated via AI.

<a href="#">Link to this property</a>

label: optional string

The language label displayed in the native language to users.

<a href="#">Link to this property</a>

language: optional string

The language tag in BCP 47 format.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "ready"or "inprogress"or "error"

The status of a generated caption.

</summary>

One of the following:

"ready"

<a href="#">Link to this property</a>

"inprogress"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.captions%20%3E%20(model)%20caption%20%3E%20(schema)>)

#### StreamCaptionsLanguage

##### [List captions or subtitles for a provided language](https://developers.cloudflare.com/api/resources/stream/subresources/captions/subresources/language/methods/get)

GET/accounts/{account\_id}/stream/{identifier}/captions/{language}

##### [Generate captions or subtitles for a provided language via AI](https://developers.cloudflare.com/api/resources/stream/subresources/captions/subresources/language/methods/create)

POST/accounts/{account\_id}/stream/{identifier}/captions/{language}/generate

##### [Upload captions or subtitles](https://developers.cloudflare.com/api/resources/stream/subresources/captions/subresources/language/methods/update)

PUT/accounts/{account\_id}/stream/{identifier}/captions/{language}

##### [Delete captions or subtitles](https://developers.cloudflare.com/api/resources/stream/subresources/captions/subresources/language/methods/delete)

DELETE/accounts/{account\_id}/stream/{identifier}/captions/{language}

##### ModelsExpand Collapse

LanguageDeleteResponse = string

[Link to this property](#)%20stream.captions.language%20%3E%20(model)%20language_delete_response%20%3E%20(schema)>)

#### StreamCaptionsLanguageVtt

##### [Return WebVTT captions for a provided language](https://developers.cloudflare.com/api/resources/stream/subresources/captions/subresources/language/subresources/vtt/methods/get)

GET/accounts/{account\_id}/stream/{identifier}/captions/{language}/vtt

##### ModelsExpand Collapse

VttGetResponse = string

[Link to this property](#)%20stream.captions.language.vtt%20%3E%20(model)%20vtt_get_response%20%3E%20(schema)>)

#### StreamDownloads

##### [List downloads](https://developers.cloudflare.com/api/resources/stream/subresources/downloads/methods/get)

GET/accounts/{account\_id}/stream/{identifier}/downloads

##### [Create downloads](https://developers.cloudflare.com/api/resources/stream/subresources/downloads/methods/create)

POST/accounts/{account\_id}/stream/{identifier}/downloads

##### [Delete downloads](https://developers.cloudflare.com/api/resources/stream/subresources/downloads/methods/delete)

DELETE/accounts/{account\_id}/stream/{identifier}/downloads

##### ModelsExpand Collapse

<details>

<summary>

DownloadGetResponse object {audio, default }

An object with download type keys. Each key is optional and only present if that download type has been created.

</summary>

<details>

<summary>

audio: optional object {percentComplete, status, url }

The audio-only download. Only present if this download type has been created.

</summary>

percentComplete: number

Indicates the progress as a percentage between 0 and 100.

maximum100

minimum0

<a href="#">Link to this property</a>

<details>

<summary>

status: "ready"or "inprogress"or "error"

The status of a generated download.

</summary>

One of the following:

"ready"

<a href="#">Link to this property</a>

"inprogress"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

url: optional string

The URL to access the generated download.

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

default: optional object {percentComplete, status, url }

The default video download. Only present if this download type has been created.

</summary>

percentComplete: number

Indicates the progress as a percentage between 0 and 100.

maximum100

minimum0

<a href="#">Link to this property</a>

<details>

<summary>

status: "ready"or "inprogress"or "error"

The status of a generated download.

</summary>

One of the following:

"ready"

<a href="#">Link to this property</a>

"inprogress"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

url: optional string

The URL to access the generated download.

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.downloads%20%3E%20(model)%20download_get_response%20%3E%20(schema)>)

<details>

<summary>

DownloadCreateResponse object {audio, default }

An object with download type keys. Each key is optional and only present if that download type has been created.

</summary>

<details>

<summary>

audio: optional object {percentComplete, status, url }

The audio-only download. Only present if this download type has been created.

</summary>

percentComplete: number

Indicates the progress as a percentage between 0 and 100.

maximum100

minimum0

<a href="#">Link to this property</a>

<details>

<summary>

status: "ready"or "inprogress"or "error"

The status of a generated download.

</summary>

One of the following:

"ready"

<a href="#">Link to this property</a>

"inprogress"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

url: optional string

The URL to access the generated download.

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

default: optional object {percentComplete, status, url }

The default video download. Only present if this download type has been created.

</summary>

percentComplete: number

Indicates the progress as a percentage between 0 and 100.

maximum100

minimum0

<a href="#">Link to this property</a>

<details>

<summary>

status: "ready"or "inprogress"or "error"

The status of a generated download.

</summary>

One of the following:

"ready"

<a href="#">Link to this property</a>

"inprogress"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

url: optional string

The URL to access the generated download.

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.downloads%20%3E%20(model)%20download_create_response%20%3E%20(schema)>)

DownloadDeleteResponse = string

[Link to this property](#)%20stream.downloads%20%3E%20(model)%20download_delete_response%20%3E%20(schema)>)

#### StreamEmbed

##### [Deprecated: Retrieve legacy embed code HTML](https://developers.cloudflare.com/api/resources/stream/subresources/embed/methods/get)

GET/accounts/{account\_id}/stream/{identifier}/embed

##### ModelsExpand Collapse

EmbedGetResponse = string

[Link to this property](#)%20stream.embed%20%3E%20(model)%20embed_get_response%20%3E%20(schema)>)

#### StreamToken

##### [Create signed URL tokens for videos](https://developers.cloudflare.com/api/resources/stream/subresources/token/methods/create)

POST/accounts/{account\_id}/stream/{identifier}/token

##### ModelsExpand Collapse

<details>

<summary>

TokenCreateResponse object {token }

</summary>

token: optional string

The signed token used with the signed URLs feature.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.token%20%3E%20(model)%20token_create_response%20%3E%20(schema)>)