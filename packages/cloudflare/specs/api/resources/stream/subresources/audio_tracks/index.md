---
title: Audio Tracks
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Stream](https://developers.cloudflare.com/api/resources/stream)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Audio Tracks

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