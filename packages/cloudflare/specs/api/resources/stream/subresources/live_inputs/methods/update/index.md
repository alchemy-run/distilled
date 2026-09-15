---
title: Update a live input
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Stream](https://developers.cloudflare.com/api/resources/stream)

[Live Inputs](https://developers.cloudflare.com/api/resources/stream/subresources/live_inputs)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Update a live input

PUT/accounts/{account\_id}/stream/live\_inputs/{live\_input\_identifier}

Updates a specified live input.

##### Security

<details>

<summary>API Token</summary>



The preferred authorization scheme for interacting with the Cloudflare API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/create-token/">Create a token</a>.

**Example:**<code>Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY</code>

</details>

<details>

<summary>API Email + API Key</summary>



The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**<code>X-Auth-Email: user@example.com</code>

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**<code>X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194</code>

</details>

##### Accepted Permissions (at least one required)

`Stream Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20stream.live_inputs%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

live\_input\_identifier: string

A unique identifier for a live input.

maxLength32

[Link to this property](#)%20stream.live_inputs%20%3E%20(method)%20update%20%3E%20(params)%20default%20%3E%20(param)%20live_input_identifier%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

defaultCreator: optional string

Sets the creator ID asssociated with this live input.

[Link to this property](#)%20stream.live_inputs%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20defaultCreator%20%3E%20(schema)>)

deleteRecordingAfterDays: optional number

Indicates the number of days after which the live inputs recordings will be deleted. When a stream completes and the recording is ready, the value is used to calculate a scheduled deletion date for that recording. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion.

minimum30

[Link to this property](#)%20stream.live_inputs%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20deleteRecordingAfterDays%20%3E%20(schema)>)

enabled: optional boolean

Indicates whether the live input is enabled and can accept streams.

[Link to this property](#)%20stream.live_inputs%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20enabled%20%3E%20(schema)>)

meta: optional unknown

A user modifiable key-value store used to reference other systems of record for managing live inputs.

[Link to this property](#)%20stream.live_inputs%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20meta%20%3E%20(schema)>)

preferLowLatency: optional boolean

When enabled, the live stream is delivered using Low-Latency HLS (LL-HLS), reducing glass-to-glass latency for viewers at the cost of reduced player compatibility.

[Link to this property](#)%20stream.live_inputs%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20preferLowLatency%20%3E%20(schema)>)

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

[Link to this property](#)%20stream.live_inputs%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20recording%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.live_inputs%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.live_inputs%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20stream.live_inputs%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/stream#(resource)%20stream.live_inputs%20%3E%20(model)%20live_input%20%3E%20(schema)">LiveInput</a> { created, deleteRecordingAfterDays, enabled, 14 more }

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

[Link to this property](#)%20stream.live_inputs%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Update a live input

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/live_inputs/$LIVE_INPUT_IDENTIFIER \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "deleteRecordingAfterDays": 45,
          "enabled": true,
          "meta": {
            "name": "test stream 1"
          },
          "preferLowLatency": true,
          "recording": {
            "hideLiveViewerCount": false,
            "mode": "off",
            "requireSignedURLs": false,
            "timeoutSeconds": 0
          }
        }'
```

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "created": "2014-01-02T02:20:00Z",
    "deleteRecordingAfterDays": 45,
    "enabled": true,
    "keysRotatedAt": "2014-01-02T02:20:00Z",
    "meta": {
      "name": "test stream 1"
    },
    "modified": "2014-01-02T02:20:00Z",
    "playback": {
      "dash": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/66be4bf738797e01e1fca35a7bdecdcd/manifest/video.mpd",
      "hls": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/66be4bf738797e01e1fca35a7bdecdcd/manifest/video.m3u8"
    },
    "preferLowLatency": true,
    "recording": {
      "allowedOrigins": [
        "example.com"
      ],
      "hideLiveViewerCount": false,
      "mode": "off",
      "requireSignedURLs": false,
      "timeoutSeconds": 0
    },
    "rtmps": {
      "streamKey": "2fb3cb9f17e68a2568d6ebed8d5505eak3ceaf8c9b1f395e1b76b79332497cada",
      "url": "rtmps://live.cloudflare.com:443/live/"
    },
    "rtmpsPlayback": {
      "streamKey": "2fb3cb9f17e68a2568d6ebed8d5505eak3ceaf8c9b1f395e1b76b79332497cada",
      "url": "rtmps://live.cloudflare.com:443/live/"
    },
    "srt": {
      "passphrase": "2fb3cb9f17e68a2568d6ebed8d5505eak3ceaf8c9b1f395e1b76b79332497cada",
      "streamId": "f256e6ea9341d51eea64c9454659e576",
      "url": "srt://live.cloudflare.com:778"
    },
    "srtPlayback": {
      "passphrase": "2fb3cb9f17e68a2568d6ebed8d5505eak3ceaf8c9b1f395e1b76b79332497cada",
      "streamId": "f256e6ea9341d51eea64c9454659e576",
      "url": "rtmps://live.cloudflare.com:443/live/"
    },
    "status": "connected",
    "uid": "66be4bf738797e01e1fca35a7bdecdcd",
    "webRTC": {
      "url": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3edake34a3efb3896e18f2dc277ce6cc993ad/webRTC/publish"
    },
    "webRTCPlayback": {
      "url": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3edake34a3efb3896e18f2dc277ce6cc993ad/webRTC/play"
    }
  }
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "created": "2014-01-02T02:20:00Z",
    "deleteRecordingAfterDays": 45,
    "enabled": true,
    "keysRotatedAt": "2014-01-02T02:20:00Z",
    "meta": {
      "name": "test stream 1"
    },
    "modified": "2014-01-02T02:20:00Z",
    "playback": {
      "dash": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/66be4bf738797e01e1fca35a7bdecdcd/manifest/video.mpd",
      "hls": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/66be4bf738797e01e1fca35a7bdecdcd/manifest/video.m3u8"
    },
    "preferLowLatency": true,
    "recording": {
      "allowedOrigins": [
        "example.com"
      ],
      "hideLiveViewerCount": false,
      "mode": "off",
      "requireSignedURLs": false,
      "timeoutSeconds": 0
    },
    "rtmps": {
      "streamKey": "2fb3cb9f17e68a2568d6ebed8d5505eak3ceaf8c9b1f395e1b76b79332497cada",
      "url": "rtmps://live.cloudflare.com:443/live/"
    },
    "rtmpsPlayback": {
      "streamKey": "2fb3cb9f17e68a2568d6ebed8d5505eak3ceaf8c9b1f395e1b76b79332497cada",
      "url": "rtmps://live.cloudflare.com:443/live/"
    },
    "srt": {
      "passphrase": "2fb3cb9f17e68a2568d6ebed8d5505eak3ceaf8c9b1f395e1b76b79332497cada",
      "streamId": "f256e6ea9341d51eea64c9454659e576",
      "url": "srt://live.cloudflare.com:778"
    },
    "srtPlayback": {
      "passphrase": "2fb3cb9f17e68a2568d6ebed8d5505eak3ceaf8c9b1f395e1b76b79332497cada",
      "streamId": "f256e6ea9341d51eea64c9454659e576",
      "url": "rtmps://live.cloudflare.com:443/live/"
    },
    "status": "connected",
    "uid": "66be4bf738797e01e1fca35a7bdecdcd",
    "webRTC": {
      "url": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3edake34a3efb3896e18f2dc277ce6cc993ad/webRTC/publish"
    },
    "webRTCPlayback": {
      "url": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3edake34a3efb3896e18f2dc277ce6cc993ad/webRTC/play"
    }
  }
}
```