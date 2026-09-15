---
title: Clip videos given a start and end time
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Stream](https://developers.cloudflare.com/api/resources/stream)

[Clip](https://developers.cloudflare.com/api/resources/stream/subresources/clip)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Clip videos given a start and end time

POST/accounts/{account\_id}/stream/clip

Clips a video based on the specified start and end times provided in seconds.

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

The account identifier tag.

maxLength32

[Link to this property](#)%20stream.clip%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

clippedFromVideoUID: string

The unique video identifier (UID).

maxLength32

[Link to this property](#)%20stream.clip%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20clippedFromVideoUID%20%3E%20(schema)>)

endTimeSeconds: number

Specifies the end time for the video clip in seconds.

[Link to this property](#)%20stream.clip%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20endTimeSeconds%20%3E%20(schema)>)

startTimeSeconds: number

Specifies the start time for the video clip in seconds.

[Link to this property](#)%20stream.clip%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20startTimeSeconds%20%3E%20(schema)>)

allowedOrigins: optional array of [AllowedOrigins](<https://developers.cloudflare.com/api/resources/stream#(resource)%20stream%20%3E%20(model)%20allowed_origins%20%3E%20(schema)>)

Lists the origins allowed to display the video. Enter allowed origin domains in an array and use `*` for wildcard subdomains. Empty arrays allow the video to be viewed on any origin.

[Link to this property](#)%20stream.clip%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20allowedOrigins%20%3E%20(schema)>)

creator: optional string

A user-defined identifier for the media creator.

maxLength64

[Link to this property](#)%20stream.clip%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20creator%20%3E%20(schema)>)

input: optional string

A video’s URL. Preferred over ‘url’.

formaturi

[Link to this property](#)%20stream.clip%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20input%20%3E%20(schema)>)

meta: optional unknown

A user modifiable key-value store used to reference other systems of record for managing videos.

[Link to this property](#)%20stream.clip%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20meta%20%3E%20(schema)>)

name: optional string

A name for the video.

[Link to this property](#)%20stream.clip%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

requireSignedURLs: optional boolean

Indicates whether the video can be a accessed using the UID. When set to `true`, a signed token must be generated with a signing key to view the video.

[Link to this property](#)%20stream.clip%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20requireSignedURLs%20%3E%20(schema)>)

scheduledDeletion: optional string

Indicates the date and time at which the video will be deleted. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion. If specified, must be at least 30 days from upload time.

formatdate-time

[Link to this property](#)%20stream.clip%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20scheduledDeletion%20%3E%20(schema)>)

thumbnailTimestampPct: optional number

The timestamp for a thumbnail image calculated as a percentage value of the video’s duration. To convert from a second-wise timestamp to a percentage, divide the desired timestamp by the total duration of the video. If this value is not set, the default thumbnail image is taken from 0s of the video.

maximum1

minimum0

[Link to this property](#)%20stream.clip%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20thumbnailTimestampPct%20%3E%20(schema)>)

url: optional string

A video’s URL (legacy field, use ‘input’ instead).

formaturi

[Link to this property](#)%20stream.clip%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20url%20%3E%20(schema)>)

<details>

<summary>

watermark: optional object {uid }

</summary>

uid: optional string

The unique identifier for the watermark profile.

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.clip%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20watermark%20%3E%20(schema)>)

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

[Link to this property](#)%20stream.clip%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20stream.clip%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20stream.clip%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/stream#(resource)%20stream%20%3E%20(model)%20video%20%3E%20(schema)">Video</a> { allowedOrigins, clippedFrom, created, 23 more }

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

<details>

<summary>

watermark: optional <a href="https://developers.cloudflare.com/api/resources/stream#(resource)%20stream.watermarks%20%3E%20(model)%20watermark%20%3E%20(schema)">Watermark</a> { created, downloadedFrom, height, 8 more }

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

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.clip%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Clip videos given a start and end time

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/clip \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "clippedFromVideoUID": "023e105f4ecef8ad9ca31a8372d0c353",
          "endTimeSeconds": 0,
          "startTimeSeconds": 0,
          "allowedOrigins": [
            "example.com"
          ],
          "creator": "creator-id_abcde12345",
          "input": "https://example.com/myvideo.mp4",
          "meta": {
            "name": "video12345.mp4"
          },
          "name": "myvideo.mp4",
          "requireSignedURLs": true,
          "scheduledDeletion": "2014-01-02T02:20:00Z",
          "thumbnailTimestampPct": 0.529241,
          "url": "https://example.com/myvideo.mp4"
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
    "allowedOrigins": [
      "example.com"
    ],
    "clippedFrom": "ea95132c15732412d22c1476fa83f27a",
    "created": "2014-01-02T02:20:00Z",
    "creator": "creator-id_abcde12345",
    "duration": 0,
    "input": {
      "height": 0,
      "width": 0
    },
    "liveInput": "fc0a8dc887b16759bfd9ad922230a014",
    "maxDurationSeconds": 1,
    "maxSizeBytes": 0,
    "meta": {
      "name": "video12345.mp4"
    },
    "modified": "2014-01-02T02:20:00Z",
    "playback": {
      "dash": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/manifest/video.mpd",
      "hls": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/manifest/video.m3u8"
    },
    "preview": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/watch",
    "publicDetails": {
      "channel_link": "channel_link",
      "logo": "logo",
      "media_id": 0,
      "share_link": "share_link",
      "title": "title"
    },
    "readyToStream": true,
    "readyToStreamAt": "2014-01-02T02:20:00Z",
    "requireSignedURLs": true,
    "scheduledDeletion": "2014-01-02T02:20:00Z",
    "size": 4190963,
    "status": {
      "errorReasonCode": "ERR_NON_VIDEO",
      "errorReasonText": "The file was not recognized as a valid video file.",
      "pctComplete": "45",
      "state": "inprogress"
    },
    "thumbnail": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/thumbnails/thumbnail.jpg",
    "thumbnailTimestampPct": 0.529241,
    "uid": "ea95132c15732412d22c1476fa83f27a",
    "uploaded": "2014-01-02T02:20:00Z",
    "uploadExpiry": "2014-01-02T02:20:00Z",
    "watermark": {
      "created": "2014-01-02T02:20:00Z",
      "downloadedFrom": "https://company.com/logo.png",
      "height": 0,
      "name": "Marketing Videos",
      "opacity": 0.75,
      "padding": 0.1,
      "position": "center",
      "scale": 0.1,
      "size": 29472,
      "uid": "ea95132c15732412d22c1476fa83f27a",
      "width": 0
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
    "allowedOrigins": [
      "example.com"
    ],
    "clippedFrom": "ea95132c15732412d22c1476fa83f27a",
    "created": "2014-01-02T02:20:00Z",
    "creator": "creator-id_abcde12345",
    "duration": 0,
    "input": {
      "height": 0,
      "width": 0
    },
    "liveInput": "fc0a8dc887b16759bfd9ad922230a014",
    "maxDurationSeconds": 1,
    "maxSizeBytes": 0,
    "meta": {
      "name": "video12345.mp4"
    },
    "modified": "2014-01-02T02:20:00Z",
    "playback": {
      "dash": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/manifest/video.mpd",
      "hls": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/manifest/video.m3u8"
    },
    "preview": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/watch",
    "publicDetails": {
      "channel_link": "channel_link",
      "logo": "logo",
      "media_id": 0,
      "share_link": "share_link",
      "title": "title"
    },
    "readyToStream": true,
    "readyToStreamAt": "2014-01-02T02:20:00Z",
    "requireSignedURLs": true,
    "scheduledDeletion": "2014-01-02T02:20:00Z",
    "size": 4190963,
    "status": {
      "errorReasonCode": "ERR_NON_VIDEO",
      "errorReasonText": "The file was not recognized as a valid video file.",
      "pctComplete": "45",
      "state": "inprogress"
    },
    "thumbnail": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/thumbnails/thumbnail.jpg",
    "thumbnailTimestampPct": 0.529241,
    "uid": "ea95132c15732412d22c1476fa83f27a",
    "uploaded": "2014-01-02T02:20:00Z",
    "uploadExpiry": "2014-01-02T02:20:00Z",
    "watermark": {
      "created": "2014-01-02T02:20:00Z",
      "downloadedFrom": "https://company.com/logo.png",
      "height": 0,
      "name": "Marketing Videos",
      "opacity": 0.75,
      "padding": 0.1,
      "position": "center",
      "scale": 0.1,
      "size": 29472,
      "uid": "ea95132c15732412d22c1476fa83f27a",
      "width": 0
    }
  }
}
```