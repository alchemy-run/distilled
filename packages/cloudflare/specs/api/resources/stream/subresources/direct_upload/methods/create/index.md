---
title: Upload videos via direct upload URLs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Stream](https://developers.cloudflare.com/api/resources/stream)

[Direct Upload](https://developers.cloudflare.com/api/resources/stream/subresources/direct_upload)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Upload videos via direct upload URLs

POST/accounts/{account\_id}/stream/direct\_upload

Creates a direct upload endpoint that allows an end-user to upload a video without an API key.

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

[Link to this property](#)%20stream.direct_upload%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### H eader ParametersExpand Collapse

"Upload-Creator": optional string

A user-defined identifier for the media creator.

maxLength64

[Link to this property](#)%20stream.direct_upload%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20Upload-Creator%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

maxDurationSeconds: number

The maximum duration in seconds for a video upload. Can be set for a video that is not yet uploaded to limit its duration. Uploads that exceed the specified duration will fail during processing. A value of `-1` means the value is unknown.

maximum36000

minimum1

[Link to this property](#)%20stream.direct_upload%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20maxDurationSeconds%20%3E%20(schema)>)

allowedOrigins: optional array of [AllowedOrigins](<https://developers.cloudflare.com/api/resources/stream#(resource)%20stream%20%3E%20(model)%20allowed_origins%20%3E%20(schema)>)

Lists the origins allowed to display the video. Enter allowed origin domains in an array and use `*` for wildcard subdomains. Empty arrays allow the video to be viewed on any origin.

[Link to this property](#)%20stream.direct_upload%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20allowedOrigins%20%3E%20(schema)>)

creator: optional string

A user-defined identifier for the media creator.

maxLength64

[Link to this property](#)%20stream.direct_upload%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20creator%20%3E%20(schema)>)

expiry: optional string

The date and time after upload when videos will not be accepted.

formatdate-time

[Link to this property](#)%20stream.direct_upload%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20expiry%20%3E%20(schema)>)

meta: optional unknown

A user modifiable key-value store used to reference other systems of record for managing videos.

[Link to this property](#)%20stream.direct_upload%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20meta%20%3E%20(schema)>)

requireSignedURLs: optional boolean

Indicates whether the video can be a accessed using the UID. When set to `true`, a signed token must be generated with a signing key to view the video.

[Link to this property](#)%20stream.direct_upload%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20requireSignedURLs%20%3E%20(schema)>)

scheduledDeletion: optional string

Indicates the date and time at which the video will be deleted. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion. If specified, must be at least 30 days from upload time.

formatdate-time

[Link to this property](#)%20stream.direct_upload%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20scheduledDeletion%20%3E%20(schema)>)

thumbnailTimestampPct: optional number

The timestamp for a thumbnail image calculated as a percentage value of the video’s duration. To convert from a second-wise timestamp to a percentage, divide the desired timestamp by the total duration of the video. If this value is not set, the default thumbnail image is taken from 0s of the video.

maximum1

minimum0

[Link to this property](#)%20stream.direct_upload%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20thumbnailTimestampPct%20%3E%20(schema)>)

<details>

<summary>

watermark: optional object {uid }

</summary>

uid: optional string

The unique identifier for the watermark profile.

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.direct_upload%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20watermark%20%3E%20(schema)>)

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

[Link to this property](#)%20stream.direct_upload%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20stream.direct_upload%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20stream.direct_upload%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {scheduledDeletion, uid, uploadURL, watermark }

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

[Link to this property](#)%20stream.direct_upload%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Upload videos via direct upload URLs

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/direct_upload \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "maxDurationSeconds": 1,
          "allowedOrigins": [
            "example.com"
          ],
          "creator": "creator-id_abcde12345",
          "expiry": "2021-01-02T02:20:00Z",
          "meta": {
            "name": "video12345.mp4"
          },
          "requireSignedURLs": true,
          "scheduledDeletion": "2014-01-02T02:20:00Z",
          "thumbnailTimestampPct": 0.529241
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
    "scheduledDeletion": "2014-01-02T02:20:00Z",
    "uid": "ea95132c15732412d22c1476fa83f27a",
    "uploadURL": "www.example.com/samplepath",
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
    "scheduledDeletion": "2014-01-02T02:20:00Z",
    "uid": "ea95132c15732412d22c1476fa83f27a",
    "uploadURL": "www.example.com/samplepath",
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