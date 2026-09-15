---
title: Live Inputs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Stream](https://developers.cloudflare.com/api/resources/stream)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Live Inputs

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

#### Live InputsOutputs

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