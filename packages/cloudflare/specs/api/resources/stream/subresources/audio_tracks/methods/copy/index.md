---
title: Add audio tracks to a video
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Stream](https://developers.cloudflare.com/api/resources/stream)

[Audio Tracks](https://developers.cloudflare.com/api/resources/stream/subresources/audio_tracks)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Add audio tracks to a video

POST/accounts/{account\_id}/stream/{identifier}/audio/copy

Adds an additional audio track to a video using the provided audio track URL.

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

##### P ath ParametersExpand Collapse

account\_id: string

The account identifier tag.

maxLength32

[Link to this property](#)%20stream.audio_tracks%20%3E%20(method)%20copy%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

identifier: string

A Cloudflare-generated unique identifier for a media item.

maxLength32

[Link to this property](#)%20stream.audio_tracks%20%3E%20(method)%20copy%20%3E%20(params)%20default%20%3E%20(param)%20identifier%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

label: string

A string to uniquely identify the track amongst other audio track labels for the specified video.

[Link to this property](#)%20stream.audio_tracks%20%3E%20(method)%20copy%20%3E%20(params)%200%20%3E%20(param)%20label%20%3E%20(schema)>)

url: optional string

An audio track URL. The server must be publicly routable and support `HTTP HEAD` requests and `HTTP GET` range requests. The server should respond to `HTTP HEAD` requests with a `content-range` header that includes the size of the file.

formaturi

[Link to this property](#)%20stream.audio_tracks%20%3E%20(method)%20copy%20%3E%20(params)%200%20%3E%20(param)%20url%20%3E%20(schema)>)

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

[Link to this property](#)%20stream.audio_tracks%20%3E%20(method)%20copy%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20stream.audio_tracks%20%3E%20(method)%20copy%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20stream.audio_tracks%20%3E%20(method)%20copy%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/stream#(resource)%20stream.audio_tracks%20%3E%20(model)%20audio%20%3E%20(schema)">Audio</a> { default, label, status, uid }

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

[Link to this property](#)%20stream.audio_tracks%20%3E%20(method)%20copy%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Add audio tracks to a video

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/$IDENTIFIER/audio/copy \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "label": "director commentary",
          "url": "https://www.examplestorage.com/audio_file.mp3"
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
    "default": true,
    "label": "director commentary",
    "status": "queued",
    "uid": "ea95132c15732412d22c1476fa83f27a"
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
    "default": true,
    "label": "director commentary",
    "status": "queued",
    "uid": "ea95132c15732412d22c1476fa83f27a"
  }
}
```