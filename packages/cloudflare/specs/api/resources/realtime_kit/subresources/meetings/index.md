---
title: Meetings
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Realtime Kit](https://developers.cloudflare.com/api/resources/realtime_kit)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Meetings

##### [Fetch all meetings for an App](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/meetings/methods/get)

GET/accounts/{account\_id}/realtime/kit/{app\_id}/meetings

##### [Create a meeting](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/meetings/methods/create)

POST/accounts/{account\_id}/realtime/kit/{app\_id}/meetings

##### [Fetch a meeting for an App](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/meetings/methods/get_meeting_by_id)

GET/accounts/{account\_id}/realtime/kit/{app\_id}/meetings/{meeting\_id}

##### [Update a meeting](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/meetings/methods/update_meeting_by_id)

PATCH/accounts/{account\_id}/realtime/kit/{app\_id}/meetings/{meeting\_id}

##### [Replace a meeting](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/meetings/methods/replace_meeting_by_id)

PUT/accounts/{account\_id}/realtime/kit/{app\_id}/meetings/{meeting\_id}

##### [Fetch all participants of a meeting](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/meetings/methods/get_meeting_participants)

GET/accounts/{account\_id}/realtime/kit/{app\_id}/meetings/{meeting\_id}/participants

##### [Add a participant](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/meetings/methods/add_participant)

POST/accounts/{account\_id}/realtime/kit/{app\_id}/meetings/{meeting\_id}/participants

##### [Fetch a participant's detail](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/meetings/methods/get_meeting_participant)

GET/accounts/{account\_id}/realtime/kit/{app\_id}/meetings/{meeting\_id}/participants/{participant\_id}

##### [Edit a participant's detail](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/meetings/methods/edit_participant)

PATCH/accounts/{account\_id}/realtime/kit/{app\_id}/meetings/{meeting\_id}/participants/{participant\_id}

##### [Delete a participant](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/meetings/methods/delete_meeting_participant)

DELETE/accounts/{account\_id}/realtime/kit/{app\_id}/meetings/{meeting\_id}/participants/{participant\_id}

##### [Refresh participant's authentication token](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/meetings/methods/refresh_participant_token)

POST/accounts/{account\_id}/realtime/kit/{app\_id}/meetings/{meeting\_id}/participants/{participant\_id}/token

##### ModelsExpand Collapse

<details>

<summary>

MeetingGetResponse object {data, paging, success }

</summary>

<details>

<summary>

data: array of object {id, created\_at, updated\_at, 9 more }

</summary>

id: string

ID of the meeting.

formatuuid

<a href="#">Link to this property</a>

created\_at: string

Timestamp the object was created at. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

updated\_at: string

Timestamp the object was updated at. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

live\_stream\_on\_start: optional boolean

Specifies if the meeting should start getting livestreamed on start.

<a href="#">Link to this property</a>

persist\_chat: optional boolean

Specifies if Chat within a meeting should persist for a week.

<a href="#">Link to this property</a>

record\_on\_start: optional boolean

Specifies if the meeting should start getting recorded as soon as someone joins the meeting.

<a href="#">Link to this property</a>

<details>

<summary>

recording\_config: optional object {audio\_config, file\_name\_prefix, live\_streaming\_config, 4 more }

Recording Configurations to be used for this meeting. This level of configs takes higher preference over App level configs on the RealtimeKit developer portal.

</summary>

<details>

<summary>

audio\_config: optional object {channel, codec, export\_file }

Object containing configuration regarding the audio that is being recorded.

</summary>

<details>

<summary>

channel: optional "mono"or "stereo"

Audio signal pathway within an audio file that carries a specific sound source.

</summary>

One of the following:

"mono"

<a href="#">Link to this property</a>

"stereo"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

codec: optional "MP3"or "AAC"

Codec using which the recording will be encoded. If VP8/VP9 is selected for videoConfig, changing audioConfig is not allowed. In this case, the codec in the audioConfig is automatically set to vorbis.

</summary>

One of the following:

"MP3"

<a href="#">Link to this property</a>

"AAC"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

export\_file: optional boolean

Controls whether to export audio file seperately

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

file\_name\_prefix: optional string

Adds a prefix to the beginning of the file name of the recording.

<a href="#">Link to this property</a>

<details>

<summary>

live\_streaming\_config: optional object {rtmp\_url }

</summary>

rtmp\_url: optional string

RTMP URL to stream to

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

max\_seconds: optional number

Specifies the maximum duration for recording in seconds, ranging from a minimum of 60 seconds to a maximum of 24 hours.

maximum86400

minimum60

<a href="#">Link to this property</a>

<details>

<summary>

realtimekit\_bucket\_config: optional object {enabled }

</summary>

enabled: boolean

Controls whether recordings are uploaded to RealtimeKit’s bucket. If set to false, <code>download_url</code>, <code>audio_download_url</code>, <code>download_url_expiry</code> won’t be generated for a recording.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

storage\_config: optional object {access\_key, auth\_method, bucket, 9 more } or object {access\_key, region, auth\_method, 9 more } or object {private\_key, access\_key, auth\_method, 9 more } or object {password, access\_key, auth\_method, 9 more }

</summary>

One of the following:

<details>

<summary>

object {access\_key, auth\_method, bucket, 9 more }

</summary>

access\_key: optional string

Access key of the storage medium. Access key is not required for the <code>gcs</code> storage media type.

Note that this field is not readable by clients, only writeable.

<a href="#">Link to this property</a>

<details>

<summary>

auth\_method: optional "KEY"or "PASSWORD"

Authentication method used for “sftp” type storage medium

</summary>

One of the following:

"KEY"

<a href="#">Link to this property</a>

"PASSWORD"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

bucket: optional string

Name of the storage medium’s bucket.

<a href="#">Link to this property</a>

host: optional string

SSH destination server host for SFTP type storage medium

<a href="#">Link to this property</a>

password: optional string

SSH destination server password for SFTP type storage medium when auth\_method is “PASSWORD”. If auth\_method is “KEY”, this specifies the password for the ssh private key.

<a href="#">Link to this property</a>

path: optional string

Path relative to the bucket root at which the recording will be placed.

<a href="#">Link to this property</a>

port: optional number

SSH destination server port for SFTP type storage medium

<a href="#">Link to this property</a>

private\_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth\_method used is “KEY”

<a href="#">Link to this property</a>

region: optional string

Region of the storage medium.

<a href="#">Link to this property</a>

secret: optional string

Secret key of the storage medium. Similar to <code>access_key</code>, it is only writeable by clients, not readable.

<a href="#">Link to this property</a>

type: optional "gcs"

<a href="#">Link to this property</a>

username: optional string

SSH destination server username for SFTP type storage medium

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {access\_key, region, auth\_method, 9 more }

</summary>

access\_key: unknown

minLength1

<a href="#">Link to this property</a>

region: unknown

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

auth\_method: optional "KEY"or "PASSWORD"

Authentication method used for “sftp” type storage medium

</summary>

One of the following:

"KEY"

<a href="#">Link to this property</a>

"PASSWORD"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

bucket: optional string

Name of the storage medium’s bucket.

<a href="#">Link to this property</a>

host: optional string

SSH destination server host for SFTP type storage medium

<a href="#">Link to this property</a>

password: optional string

SSH destination server password for SFTP type storage medium when auth\_method is “PASSWORD”. If auth\_method is “KEY”, this specifies the password for the ssh private key.

<a href="#">Link to this property</a>

path: optional string

Path relative to the bucket root at which the recording will be placed.

<a href="#">Link to this property</a>

port: optional number

SSH destination server port for SFTP type storage medium

<a href="#">Link to this property</a>

private\_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth\_method used is “KEY”

<a href="#">Link to this property</a>

secret: optional string

Secret key of the storage medium. Similar to <code>access_key</code>, it is only writeable by clients, not readable.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "aws"or "azure"or "digitalocean"

</summary>

One of the following:

"aws"

<a href="#">Link to this property</a>

"azure"

<a href="#">Link to this property</a>

"digitalocean"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

username: optional string

SSH destination server username for SFTP type storage medium

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {private\_key, access\_key, auth\_method, 9 more }

</summary>

private\_key: string

Private key used to login to destination SSH server for SFTP type storage medium, when auth\_method used is “KEY”

<a href="#">Link to this property</a>

access\_key: optional string

Access key of the storage medium. Access key is not required for the <code>gcs</code> storage media type.

Note that this field is not readable by clients, only writeable.

<a href="#">Link to this property</a>

auth\_method: optional "KEY"

<a href="#">Link to this property</a>

bucket: optional string

Name of the storage medium’s bucket.

<a href="#">Link to this property</a>

host: optional string

SSH destination server host for SFTP type storage medium

<a href="#">Link to this property</a>

password: optional string

SSH destination server password for SFTP type storage medium when auth\_method is “PASSWORD”. If auth\_method is “KEY”, this specifies the password for the ssh private key.

<a href="#">Link to this property</a>

path: optional string

Path relative to the bucket root at which the recording will be placed.

<a href="#">Link to this property</a>

port: optional number

SSH destination server port for SFTP type storage medium

<a href="#">Link to this property</a>

region: optional string

Region of the storage medium.

<a href="#">Link to this property</a>

secret: optional string

Secret key of the storage medium. Similar to <code>access_key</code>, it is only writeable by clients, not readable.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "aws"or "azure"or "digitalocean"or 2 more

Type of storage media.

</summary>

One of the following:

"aws"

<a href="#">Link to this property</a>

"azure"

<a href="#">Link to this property</a>

"digitalocean"

<a href="#">Link to this property</a>

"gcs"

<a href="#">Link to this property</a>

"sftp"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

username: optional string

SSH destination server username for SFTP type storage medium

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {password, access\_key, auth\_method, 9 more }

</summary>

password: string

SSH destination server password for SFTP type storage medium when auth\_method is “PASSWORD”. If auth\_method is “KEY”, this specifies the password for the ssh private key.

<a href="#">Link to this property</a>

access\_key: optional string

Access key of the storage medium. Access key is not required for the <code>gcs</code> storage media type.

Note that this field is not readable by clients, only writeable.

<a href="#">Link to this property</a>

auth\_method: optional "PASSWORD"

<a href="#">Link to this property</a>

bucket: optional string

Name of the storage medium’s bucket.

<a href="#">Link to this property</a>

host: optional string

SSH destination server host for SFTP type storage medium

<a href="#">Link to this property</a>

path: optional string

Path relative to the bucket root at which the recording will be placed.

<a href="#">Link to this property</a>

port: optional number

SSH destination server port for SFTP type storage medium

<a href="#">Link to this property</a>

private\_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth\_method used is “KEY”

<a href="#">Link to this property</a>

region: optional string

Region of the storage medium.

<a href="#">Link to this property</a>

secret: optional string

Secret key of the storage medium. Similar to <code>access_key</code>, it is only writeable by clients, not readable.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "aws"or "azure"or "digitalocean"or 2 more

Type of storage media.

</summary>

One of the following:

"aws"

<a href="#">Link to this property</a>

"azure"

<a href="#">Link to this property</a>

"digitalocean"

<a href="#">Link to this property</a>

"gcs"

<a href="#">Link to this property</a>

"sftp"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

username: optional string

SSH destination server username for SFTP type storage medium

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

video\_config: optional object {codec, export\_file, height, 2 more }

</summary>

<details>

<summary>

codec: optional "H264"or "VP8"or "VP9"

Codec using which the recording will be encoded.

</summary>

One of the following:

"H264"

<a href="#">Link to this property</a>

"VP8"

<a href="#">Link to this property</a>

"VP9"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

export\_file: optional boolean

Controls whether to export video file seperately

<a href="#">Link to this property</a>

height: optional number

Height of the recording video in pixels

maximum1920

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

watermark: optional object {position, size, url }

Watermark to be added to the recording

</summary>

<details>

<summary>

position: optional "left top"or "right top"or "left bottom"or "right bottom"

Position of the watermark

</summary>

One of the following:

"left top"

<a href="#">Link to this property</a>

"right top"

<a href="#">Link to this property</a>

"left bottom"

<a href="#">Link to this property</a>

"right bottom"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

size: optional object {height, width }

Size of the watermark

</summary>

height: optional number

Height of the watermark in px

minimum1

<a href="#">Link to this property</a>

width: optional number

Width of the watermark in px

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

url: optional string

URL of the watermark image

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

width: optional number

Width of the recording video in pixels

maximum1920

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

session\_keep\_alive\_time\_in\_secs: optional number

Time in seconds, for which a session remains active, after the last participant has left the meeting.

maximum600

minimum60

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "ACTIVE"or "INACTIVE"

Whether the meeting is <code>ACTIVE</code> or <code>INACTIVE</code>. Users will not be able to join an <code>INACTIVE</code> meeting.

</summary>

One of the following:

"ACTIVE"

<a href="#">Link to this property</a>

"INACTIVE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

summarize\_on\_end: optional boolean

Automatically generate summary of meetings using transcripts. Requires Transcriptions to be enabled, and can be retrieved via Webhooks or summary API.

<a href="#">Link to this property</a>

title: optional string

Title of the meeting.

<a href="#">Link to this property</a>

transcribe\_on\_end: optional boolean

Automatically generate transcripts when the meeting ends.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

paging: object {end\_offset, start\_offset, total\_count }

</summary>

end\_offset: number

<a href="#">Link to this property</a>

start\_offset: number

<a href="#">Link to this property</a>

total\_count: number

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.meetings%20%3E%20(model)%20meeting_get_response%20%3E%20(schema)>)

<details>

<summary>

MeetingCreateResponse object {success, data }

</summary>

success: boolean

Success status of the operation

<a href="#">Link to this property</a>

<details>

<summary>

data: optional object {id, created\_at, updated\_at, 10 more }

Data returned by the operation

</summary>

id: string

ID of the meeting.

formatuuid

<a href="#">Link to this property</a>

created\_at: string

Timestamp the object was created at. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

updated\_at: string

Timestamp the object was updated at. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

ai\_config: optional object {summarization, transcription }

The AI Config allows you to customize the behavior of meeting transcriptions and summaries

</summary>

<details>

<summary>

summarization: optional object {summary\_type, text\_format, word\_limit }

Summary Config

</summary>

<details>

<summary>

summary\_type: optional "general"or "team\_meeting"or "sales\_call"or 6 more

Defines the style of the summary, such as general, team meeting, or sales call.

</summary>

One of the following:

"general"

<a href="#">Link to this property</a>

"team\_meeting"

<a href="#">Link to this property</a>

"sales\_call"

<a href="#">Link to this property</a>

"client\_check\_in"

<a href="#">Link to this property</a>

"interview"

<a href="#">Link to this property</a>

"daily\_standup"

<a href="#">Link to this property</a>

"one\_on\_one\_meeting"

<a href="#">Link to this property</a>

"lecture"

<a href="#">Link to this property</a>

"code\_review"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

text\_format: optional "plain\_text"or "markdown"

Determines the text format of the summary, such as plain text or markdown.

</summary>

One of the following:

"plain\_text"

<a href="#">Link to this property</a>

"markdown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

word\_limit: optional number

Sets the maximum number of words in the meeting summary.

maximum1000

minimum150

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

transcription: optional object {keywords, language, profanity\_filter }

Transcription Configurations

</summary>

keywords: optional array of string

Adds specific terms to improve accurate detection during transcription.

<a href="#">Link to this property</a>

<details>

<summary>

language: optional "en-US"or "en-IN"or "de"or 7 more

Specifies the language code for transcription to ensure accurate results.

</summary>

One of the following:

"en-US"

<a href="#">Link to this property</a>

"en-IN"

<a href="#">Link to this property</a>

"de"

<a href="#">Link to this property</a>

"hi"

<a href="#">Link to this property</a>

"sv"

<a href="#">Link to this property</a>

"ru"

<a href="#">Link to this property</a>

"pl"

<a href="#">Link to this property</a>

"el"

<a href="#">Link to this property</a>

"fr"

<a href="#">Link to this property</a>

"nl"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

profanity\_filter: optional boolean

Control the inclusion of offensive language in transcriptions.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

live\_stream\_on\_start: optional boolean

Specifies if the meeting should start getting livestreamed on start.

<a href="#">Link to this property</a>

persist\_chat: optional boolean

Specifies if Chat within a meeting should persist for a week.

<a href="#">Link to this property</a>

record\_on\_start: optional boolean

Specifies if the meeting should start getting recorded as soon as someone joins the meeting.

<a href="#">Link to this property</a>

<details>

<summary>

recording\_config: optional object {audio\_config, file\_name\_prefix, live\_streaming\_config, 4 more }

Recording Configurations to be used for this meeting. This level of configs takes higher preference over App level configs on the RealtimeKit developer portal.

</summary>

<details>

<summary>

audio\_config: optional object {channel, codec, export\_file }

Object containing configuration regarding the audio that is being recorded.

</summary>

<details>

<summary>

channel: optional "mono"or "stereo"

Audio signal pathway within an audio file that carries a specific sound source.

</summary>

One of the following:

"mono"

<a href="#">Link to this property</a>

"stereo"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

codec: optional "MP3"or "AAC"

Codec using which the recording will be encoded. If VP8/VP9 is selected for videoConfig, changing audioConfig is not allowed. In this case, the codec in the audioConfig is automatically set to vorbis.

</summary>

One of the following:

"MP3"

<a href="#">Link to this property</a>

"AAC"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

export\_file: optional boolean

Controls whether to export audio file seperately

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

file\_name\_prefix: optional string

Adds a prefix to the beginning of the file name of the recording.

<a href="#">Link to this property</a>

<details>

<summary>

live\_streaming\_config: optional object {rtmp\_url }

</summary>

rtmp\_url: optional string

RTMP URL to stream to

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

max\_seconds: optional number

Specifies the maximum duration for recording in seconds, ranging from a minimum of 60 seconds to a maximum of 24 hours.

maximum86400

minimum60

<a href="#">Link to this property</a>

<details>

<summary>

realtimekit\_bucket\_config: optional object {enabled }

</summary>

enabled: boolean

Controls whether recordings are uploaded to RealtimeKit’s bucket. If set to false, <code>download_url</code>, <code>audio_download_url</code>, <code>download_url_expiry</code> won’t be generated for a recording.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

storage\_config: optional object {access\_key, auth\_method, bucket, 9 more } or object {access\_key, region, auth\_method, 9 more } or object {private\_key, access\_key, auth\_method, 9 more } or object {password, access\_key, auth\_method, 9 more }

</summary>

One of the following:

<details>

<summary>

object {access\_key, auth\_method, bucket, 9 more }

</summary>

access\_key: optional string

Access key of the storage medium. Access key is not required for the <code>gcs</code> storage media type.

Note that this field is not readable by clients, only writeable.

<a href="#">Link to this property</a>

<details>

<summary>

auth\_method: optional "KEY"or "PASSWORD"

Authentication method used for “sftp” type storage medium

</summary>

One of the following:

"KEY"

<a href="#">Link to this property</a>

"PASSWORD"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

bucket: optional string

Name of the storage medium’s bucket.

<a href="#">Link to this property</a>

host: optional string

SSH destination server host for SFTP type storage medium

<a href="#">Link to this property</a>

password: optional string

SSH destination server password for SFTP type storage medium when auth\_method is “PASSWORD”. If auth\_method is “KEY”, this specifies the password for the ssh private key.

<a href="#">Link to this property</a>

path: optional string

Path relative to the bucket root at which the recording will be placed.

<a href="#">Link to this property</a>

port: optional number

SSH destination server port for SFTP type storage medium

<a href="#">Link to this property</a>

private\_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth\_method used is “KEY”

<a href="#">Link to this property</a>

region: optional string

Region of the storage medium.

<a href="#">Link to this property</a>

secret: optional string

Secret key of the storage medium. Similar to <code>access_key</code>, it is only writeable by clients, not readable.

<a href="#">Link to this property</a>

type: optional "gcs"

<a href="#">Link to this property</a>

username: optional string

SSH destination server username for SFTP type storage medium

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {access\_key, region, auth\_method, 9 more }

</summary>

access\_key: unknown

minLength1

<a href="#">Link to this property</a>

region: unknown

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

auth\_method: optional "KEY"or "PASSWORD"

Authentication method used for “sftp” type storage medium

</summary>

One of the following:

"KEY"

<a href="#">Link to this property</a>

"PASSWORD"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

bucket: optional string

Name of the storage medium’s bucket.

<a href="#">Link to this property</a>

host: optional string

SSH destination server host for SFTP type storage medium

<a href="#">Link to this property</a>

password: optional string

SSH destination server password for SFTP type storage medium when auth\_method is “PASSWORD”. If auth\_method is “KEY”, this specifies the password for the ssh private key.

<a href="#">Link to this property</a>

path: optional string

Path relative to the bucket root at which the recording will be placed.

<a href="#">Link to this property</a>

port: optional number

SSH destination server port for SFTP type storage medium

<a href="#">Link to this property</a>

private\_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth\_method used is “KEY”

<a href="#">Link to this property</a>

secret: optional string

Secret key of the storage medium. Similar to <code>access_key</code>, it is only writeable by clients, not readable.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "aws"or "azure"or "digitalocean"

</summary>

One of the following:

"aws"

<a href="#">Link to this property</a>

"azure"

<a href="#">Link to this property</a>

"digitalocean"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

username: optional string

SSH destination server username for SFTP type storage medium

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {private\_key, access\_key, auth\_method, 9 more }

</summary>

private\_key: string

Private key used to login to destination SSH server for SFTP type storage medium, when auth\_method used is “KEY”

<a href="#">Link to this property</a>

access\_key: optional string

Access key of the storage medium. Access key is not required for the <code>gcs</code> storage media type.

Note that this field is not readable by clients, only writeable.

<a href="#">Link to this property</a>

auth\_method: optional "KEY"

<a href="#">Link to this property</a>

bucket: optional string

Name of the storage medium’s bucket.

<a href="#">Link to this property</a>

host: optional string

SSH destination server host for SFTP type storage medium

<a href="#">Link to this property</a>

password: optional string

SSH destination server password for SFTP type storage medium when auth\_method is “PASSWORD”. If auth\_method is “KEY”, this specifies the password for the ssh private key.

<a href="#">Link to this property</a>

path: optional string

Path relative to the bucket root at which the recording will be placed.

<a href="#">Link to this property</a>

port: optional number

SSH destination server port for SFTP type storage medium

<a href="#">Link to this property</a>

region: optional string

Region of the storage medium.

<a href="#">Link to this property</a>

secret: optional string

Secret key of the storage medium. Similar to <code>access_key</code>, it is only writeable by clients, not readable.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "aws"or "azure"or "digitalocean"or 2 more

Type of storage media.

</summary>

One of the following:

"aws"

<a href="#">Link to this property</a>

"azure"

<a href="#">Link to this property</a>

"digitalocean"

<a href="#">Link to this property</a>

"gcs"

<a href="#">Link to this property</a>

"sftp"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

username: optional string

SSH destination server username for SFTP type storage medium

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {password, access\_key, auth\_method, 9 more }

</summary>

password: string

SSH destination server password for SFTP type storage medium when auth\_method is “PASSWORD”. If auth\_method is “KEY”, this specifies the password for the ssh private key.

<a href="#">Link to this property</a>

access\_key: optional string

Access key of the storage medium. Access key is not required for the <code>gcs</code> storage media type.

Note that this field is not readable by clients, only writeable.

<a href="#">Link to this property</a>

auth\_method: optional "PASSWORD"

<a href="#">Link to this property</a>

bucket: optional string

Name of the storage medium’s bucket.

<a href="#">Link to this property</a>

host: optional string

SSH destination server host for SFTP type storage medium

<a href="#">Link to this property</a>

path: optional string

Path relative to the bucket root at which the recording will be placed.

<a href="#">Link to this property</a>

port: optional number

SSH destination server port for SFTP type storage medium

<a href="#">Link to this property</a>

private\_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth\_method used is “KEY”

<a href="#">Link to this property</a>

region: optional string

Region of the storage medium.

<a href="#">Link to this property</a>

secret: optional string

Secret key of the storage medium. Similar to <code>access_key</code>, it is only writeable by clients, not readable.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "aws"or "azure"or "digitalocean"or 2 more

Type of storage media.

</summary>

One of the following:

"aws"

<a href="#">Link to this property</a>

"azure"

<a href="#">Link to this property</a>

"digitalocean"

<a href="#">Link to this property</a>

"gcs"

<a href="#">Link to this property</a>

"sftp"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

username: optional string

SSH destination server username for SFTP type storage medium

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

video\_config: optional object {codec, export\_file, height, 2 more }

</summary>

<details>

<summary>

codec: optional "H264"or "VP8"or "VP9"

Codec using which the recording will be encoded.

</summary>

One of the following:

"H264"

<a href="#">Link to this property</a>

"VP8"

<a href="#">Link to this property</a>

"VP9"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

export\_file: optional boolean

Controls whether to export video file seperately

<a href="#">Link to this property</a>

height: optional number

Height of the recording video in pixels

maximum1920

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

watermark: optional object {position, size, url }

Watermark to be added to the recording

</summary>

<details>

<summary>

position: optional "left top"or "right top"or "left bottom"or "right bottom"

Position of the watermark

</summary>

One of the following:

"left top"

<a href="#">Link to this property</a>

"right top"

<a href="#">Link to this property</a>

"left bottom"

<a href="#">Link to this property</a>

"right bottom"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

size: optional object {height, width }

Size of the watermark

</summary>

height: optional number

Height of the watermark in px

minimum1

<a href="#">Link to this property</a>

width: optional number

Width of the watermark in px

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

url: optional string

URL of the watermark image

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

width: optional number

Width of the recording video in pixels

maximum1920

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

session\_keep\_alive\_time\_in\_secs: optional number

Time in seconds, for which a session remains active, after the last participant has left the meeting.

maximum600

minimum60

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "ACTIVE"or "INACTIVE"

Whether the meeting is <code>ACTIVE</code> or <code>INACTIVE</code>. Users will not be able to join an <code>INACTIVE</code> meeting.

</summary>

One of the following:

"ACTIVE"

<a href="#">Link to this property</a>

"INACTIVE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

summarize\_on\_end: optional boolean

Automatically generate summary of meetings using transcripts. Requires Transcriptions to be enabled, and can be retrieved via Webhooks or summary API.

<a href="#">Link to this property</a>

title: optional string

Title of the meeting.

<a href="#">Link to this property</a>

transcribe\_on\_end: optional boolean

Automatically generate transcripts when the meeting ends.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.meetings%20%3E%20(model)%20meeting_create_response%20%3E%20(schema)>)

<details>

<summary>

MeetingGetMeetingByIDResponse object {success, data }

</summary>

success: boolean

Success status of the operation

<a href="#">Link to this property</a>

<details>

<summary>

data: optional object {id, created\_at, updated\_at, 10 more }

Data returned by the operation

</summary>

id: string

ID of the meeting.

formatuuid

<a href="#">Link to this property</a>

created\_at: string

Timestamp the object was created at. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

updated\_at: string

Timestamp the object was updated at. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

ai\_config: optional object {summarization, transcription }

The AI Config allows you to customize the behavior of meeting transcriptions and summaries

</summary>

<details>

<summary>

summarization: optional object {summary\_type, text\_format, word\_limit }

Summary Config

</summary>

<details>

<summary>

summary\_type: optional "general"or "team\_meeting"or "sales\_call"or 6 more

Defines the style of the summary, such as general, team meeting, or sales call.

</summary>

One of the following:

"general"

<a href="#">Link to this property</a>

"team\_meeting"

<a href="#">Link to this property</a>

"sales\_call"

<a href="#">Link to this property</a>

"client\_check\_in"

<a href="#">Link to this property</a>

"interview"

<a href="#">Link to this property</a>

"daily\_standup"

<a href="#">Link to this property</a>

"one\_on\_one\_meeting"

<a href="#">Link to this property</a>

"lecture"

<a href="#">Link to this property</a>

"code\_review"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

text\_format: optional "plain\_text"or "markdown"

Determines the text format of the summary, such as plain text or markdown.

</summary>

One of the following:

"plain\_text"

<a href="#">Link to this property</a>

"markdown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

word\_limit: optional number

Sets the maximum number of words in the meeting summary.

maximum1000

minimum150

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

transcription: optional object {keywords, language, profanity\_filter }

Transcription Configurations

</summary>

keywords: optional array of string

Adds specific terms to improve accurate detection during transcription.

<a href="#">Link to this property</a>

<details>

<summary>

language: optional "en-US"or "en-IN"or "de"or 7 more

Specifies the language code for transcription to ensure accurate results.

</summary>

One of the following:

"en-US"

<a href="#">Link to this property</a>

"en-IN"

<a href="#">Link to this property</a>

"de"

<a href="#">Link to this property</a>

"hi"

<a href="#">Link to this property</a>

"sv"

<a href="#">Link to this property</a>

"ru"

<a href="#">Link to this property</a>

"pl"

<a href="#">Link to this property</a>

"el"

<a href="#">Link to this property</a>

"fr"

<a href="#">Link to this property</a>

"nl"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

profanity\_filter: optional boolean

Control the inclusion of offensive language in transcriptions.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

live\_stream\_on\_start: optional boolean

Specifies if the meeting should start getting livestreamed on start.

<a href="#">Link to this property</a>

persist\_chat: optional boolean

Specifies if Chat within a meeting should persist for a week.

<a href="#">Link to this property</a>

record\_on\_start: optional boolean

Specifies if the meeting should start getting recorded as soon as someone joins the meeting.

<a href="#">Link to this property</a>

<details>

<summary>

recording\_config: optional object {audio\_config, file\_name\_prefix, live\_streaming\_config, 4 more }

Recording Configurations to be used for this meeting. This level of configs takes higher preference over App level configs on the RealtimeKit developer portal.

</summary>

<details>

<summary>

audio\_config: optional object {channel, codec, export\_file }

Object containing configuration regarding the audio that is being recorded.

</summary>

<details>

<summary>

channel: optional "mono"or "stereo"

Audio signal pathway within an audio file that carries a specific sound source.

</summary>

One of the following:

"mono"

<a href="#">Link to this property</a>

"stereo"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

codec: optional "MP3"or "AAC"

Codec using which the recording will be encoded. If VP8/VP9 is selected for videoConfig, changing audioConfig is not allowed. In this case, the codec in the audioConfig is automatically set to vorbis.

</summary>

One of the following:

"MP3"

<a href="#">Link to this property</a>

"AAC"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

export\_file: optional boolean

Controls whether to export audio file seperately

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

file\_name\_prefix: optional string

Adds a prefix to the beginning of the file name of the recording.

<a href="#">Link to this property</a>

<details>

<summary>

live\_streaming\_config: optional object {rtmp\_url }

</summary>

rtmp\_url: optional string

RTMP URL to stream to

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

max\_seconds: optional number

Specifies the maximum duration for recording in seconds, ranging from a minimum of 60 seconds to a maximum of 24 hours.

maximum86400

minimum60

<a href="#">Link to this property</a>

<details>

<summary>

realtimekit\_bucket\_config: optional object {enabled }

</summary>

enabled: boolean

Controls whether recordings are uploaded to RealtimeKit’s bucket. If set to false, <code>download_url</code>, <code>audio_download_url</code>, <code>download_url_expiry</code> won’t be generated for a recording.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

storage\_config: optional object {access\_key, auth\_method, bucket, 9 more } or object {access\_key, region, auth\_method, 9 more } or object {private\_key, access\_key, auth\_method, 9 more } or object {password, access\_key, auth\_method, 9 more }

</summary>

One of the following:

<details>

<summary>

object {access\_key, auth\_method, bucket, 9 more }

</summary>

access\_key: optional string

Access key of the storage medium. Access key is not required for the <code>gcs</code> storage media type.

Note that this field is not readable by clients, only writeable.

<a href="#">Link to this property</a>

<details>

<summary>

auth\_method: optional "KEY"or "PASSWORD"

Authentication method used for “sftp” type storage medium

</summary>

One of the following:

"KEY"

<a href="#">Link to this property</a>

"PASSWORD"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

bucket: optional string

Name of the storage medium’s bucket.

<a href="#">Link to this property</a>

host: optional string

SSH destination server host for SFTP type storage medium

<a href="#">Link to this property</a>

password: optional string

SSH destination server password for SFTP type storage medium when auth\_method is “PASSWORD”. If auth\_method is “KEY”, this specifies the password for the ssh private key.

<a href="#">Link to this property</a>

path: optional string

Path relative to the bucket root at which the recording will be placed.

<a href="#">Link to this property</a>

port: optional number

SSH destination server port for SFTP type storage medium

<a href="#">Link to this property</a>

private\_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth\_method used is “KEY”

<a href="#">Link to this property</a>

region: optional string

Region of the storage medium.

<a href="#">Link to this property</a>

secret: optional string

Secret key of the storage medium. Similar to <code>access_key</code>, it is only writeable by clients, not readable.

<a href="#">Link to this property</a>

type: optional "gcs"

<a href="#">Link to this property</a>

username: optional string

SSH destination server username for SFTP type storage medium

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {access\_key, region, auth\_method, 9 more }

</summary>

access\_key: unknown

minLength1

<a href="#">Link to this property</a>

region: unknown

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

auth\_method: optional "KEY"or "PASSWORD"

Authentication method used for “sftp” type storage medium

</summary>

One of the following:

"KEY"

<a href="#">Link to this property</a>

"PASSWORD"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

bucket: optional string

Name of the storage medium’s bucket.

<a href="#">Link to this property</a>

host: optional string

SSH destination server host for SFTP type storage medium

<a href="#">Link to this property</a>

password: optional string

SSH destination server password for SFTP type storage medium when auth\_method is “PASSWORD”. If auth\_method is “KEY”, this specifies the password for the ssh private key.

<a href="#">Link to this property</a>

path: optional string

Path relative to the bucket root at which the recording will be placed.

<a href="#">Link to this property</a>

port: optional number

SSH destination server port for SFTP type storage medium

<a href="#">Link to this property</a>

private\_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth\_method used is “KEY”

<a href="#">Link to this property</a>

secret: optional string

Secret key of the storage medium. Similar to <code>access_key</code>, it is only writeable by clients, not readable.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "aws"or "azure"or "digitalocean"

</summary>

One of the following:

"aws"

<a href="#">Link to this property</a>

"azure"

<a href="#">Link to this property</a>

"digitalocean"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

username: optional string

SSH destination server username for SFTP type storage medium

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {private\_key, access\_key, auth\_method, 9 more }

</summary>

private\_key: string

Private key used to login to destination SSH server for SFTP type storage medium, when auth\_method used is “KEY”

<a href="#">Link to this property</a>

access\_key: optional string

Access key of the storage medium. Access key is not required for the <code>gcs</code> storage media type.

Note that this field is not readable by clients, only writeable.

<a href="#">Link to this property</a>

auth\_method: optional "KEY"

<a href="#">Link to this property</a>

bucket: optional string

Name of the storage medium’s bucket.

<a href="#">Link to this property</a>

host: optional string

SSH destination server host for SFTP type storage medium

<a href="#">Link to this property</a>

password: optional string

SSH destination server password for SFTP type storage medium when auth\_method is “PASSWORD”. If auth\_method is “KEY”, this specifies the password for the ssh private key.

<a href="#">Link to this property</a>

path: optional string

Path relative to the bucket root at which the recording will be placed.

<a href="#">Link to this property</a>

port: optional number

SSH destination server port for SFTP type storage medium

<a href="#">Link to this property</a>

region: optional string

Region of the storage medium.

<a href="#">Link to this property</a>

secret: optional string

Secret key of the storage medium. Similar to <code>access_key</code>, it is only writeable by clients, not readable.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "aws"or "azure"or "digitalocean"or 2 more

Type of storage media.

</summary>

One of the following:

"aws"

<a href="#">Link to this property</a>

"azure"

<a href="#">Link to this property</a>

"digitalocean"

<a href="#">Link to this property</a>

"gcs"

<a href="#">Link to this property</a>

"sftp"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

username: optional string

SSH destination server username for SFTP type storage medium

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {password, access\_key, auth\_method, 9 more }

</summary>

password: string

SSH destination server password for SFTP type storage medium when auth\_method is “PASSWORD”. If auth\_method is “KEY”, this specifies the password for the ssh private key.

<a href="#">Link to this property</a>

access\_key: optional string

Access key of the storage medium. Access key is not required for the <code>gcs</code> storage media type.

Note that this field is not readable by clients, only writeable.

<a href="#">Link to this property</a>

auth\_method: optional "PASSWORD"

<a href="#">Link to this property</a>

bucket: optional string

Name of the storage medium’s bucket.

<a href="#">Link to this property</a>

host: optional string

SSH destination server host for SFTP type storage medium

<a href="#">Link to this property</a>

path: optional string

Path relative to the bucket root at which the recording will be placed.

<a href="#">Link to this property</a>

port: optional number

SSH destination server port for SFTP type storage medium

<a href="#">Link to this property</a>

private\_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth\_method used is “KEY”

<a href="#">Link to this property</a>

region: optional string

Region of the storage medium.

<a href="#">Link to this property</a>

secret: optional string

Secret key of the storage medium. Similar to <code>access_key</code>, it is only writeable by clients, not readable.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "aws"or "azure"or "digitalocean"or 2 more

Type of storage media.

</summary>

One of the following:

"aws"

<a href="#">Link to this property</a>

"azure"

<a href="#">Link to this property</a>

"digitalocean"

<a href="#">Link to this property</a>

"gcs"

<a href="#">Link to this property</a>

"sftp"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

username: optional string

SSH destination server username for SFTP type storage medium

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

video\_config: optional object {codec, export\_file, height, 2 more }

</summary>

<details>

<summary>

codec: optional "H264"or "VP8"or "VP9"

Codec using which the recording will be encoded.

</summary>

One of the following:

"H264"

<a href="#">Link to this property</a>

"VP8"

<a href="#">Link to this property</a>

"VP9"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

export\_file: optional boolean

Controls whether to export video file seperately

<a href="#">Link to this property</a>

height: optional number

Height of the recording video in pixels

maximum1920

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

watermark: optional object {position, size, url }

Watermark to be added to the recording

</summary>

<details>

<summary>

position: optional "left top"or "right top"or "left bottom"or "right bottom"

Position of the watermark

</summary>

One of the following:

"left top"

<a href="#">Link to this property</a>

"right top"

<a href="#">Link to this property</a>

"left bottom"

<a href="#">Link to this property</a>

"right bottom"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

size: optional object {height, width }

Size of the watermark

</summary>

height: optional number

Height of the watermark in px

minimum1

<a href="#">Link to this property</a>

width: optional number

Width of the watermark in px

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

url: optional string

URL of the watermark image

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

width: optional number

Width of the recording video in pixels

maximum1920

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

session\_keep\_alive\_time\_in\_secs: optional number

Time in seconds, for which a session remains active, after the last participant has left the meeting.

maximum600

minimum60

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "ACTIVE"or "INACTIVE"

Whether the meeting is <code>ACTIVE</code> or <code>INACTIVE</code>. Users will not be able to join an <code>INACTIVE</code> meeting.

</summary>

One of the following:

"ACTIVE"

<a href="#">Link to this property</a>

"INACTIVE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

summarize\_on\_end: optional boolean

Automatically generate summary of meetings using transcripts. Requires Transcriptions to be enabled, and can be retrieved via Webhooks or summary API.

<a href="#">Link to this property</a>

title: optional string

Title of the meeting.

<a href="#">Link to this property</a>

transcribe\_on\_end: optional boolean

Automatically generate transcripts when the meeting ends.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.meetings%20%3E%20(model)%20meeting_get_meeting_by_id_response%20%3E%20(schema)>)

<details>

<summary>

MeetingUpdateMeetingByIDResponse object {success, data }

</summary>

success: boolean

Success status of the operation

<a href="#">Link to this property</a>

<details>

<summary>

data: optional object {id, created\_at, updated\_at, 10 more }

Data returned by the operation

</summary>

id: string

ID of the meeting.

formatuuid

<a href="#">Link to this property</a>

created\_at: string

Timestamp the object was created at. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

updated\_at: string

Timestamp the object was updated at. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

ai\_config: optional object {summarization, transcription }

The AI Config allows you to customize the behavior of meeting transcriptions and summaries

</summary>

<details>

<summary>

summarization: optional object {summary\_type, text\_format, word\_limit }

Summary Config

</summary>

<details>

<summary>

summary\_type: optional "general"or "team\_meeting"or "sales\_call"or 6 more

Defines the style of the summary, such as general, team meeting, or sales call.

</summary>

One of the following:

"general"

<a href="#">Link to this property</a>

"team\_meeting"

<a href="#">Link to this property</a>

"sales\_call"

<a href="#">Link to this property</a>

"client\_check\_in"

<a href="#">Link to this property</a>

"interview"

<a href="#">Link to this property</a>

"daily\_standup"

<a href="#">Link to this property</a>

"one\_on\_one\_meeting"

<a href="#">Link to this property</a>

"lecture"

<a href="#">Link to this property</a>

"code\_review"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

text\_format: optional "plain\_text"or "markdown"

Determines the text format of the summary, such as plain text or markdown.

</summary>

One of the following:

"plain\_text"

<a href="#">Link to this property</a>

"markdown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

word\_limit: optional number

Sets the maximum number of words in the meeting summary.

maximum1000

minimum150

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

transcription: optional object {keywords, language, profanity\_filter }

Transcription Configurations

</summary>

keywords: optional array of string

Adds specific terms to improve accurate detection during transcription.

<a href="#">Link to this property</a>

<details>

<summary>

language: optional "en-US"or "en-IN"or "de"or 7 more

Specifies the language code for transcription to ensure accurate results.

</summary>

One of the following:

"en-US"

<a href="#">Link to this property</a>

"en-IN"

<a href="#">Link to this property</a>

"de"

<a href="#">Link to this property</a>

"hi"

<a href="#">Link to this property</a>

"sv"

<a href="#">Link to this property</a>

"ru"

<a href="#">Link to this property</a>

"pl"

<a href="#">Link to this property</a>

"el"

<a href="#">Link to this property</a>

"fr"

<a href="#">Link to this property</a>

"nl"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

profanity\_filter: optional boolean

Control the inclusion of offensive language in transcriptions.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

live\_stream\_on\_start: optional boolean

Specifies if the meeting should start getting livestreamed on start.

<a href="#">Link to this property</a>

persist\_chat: optional boolean

Specifies if Chat within a meeting should persist for a week.

<a href="#">Link to this property</a>

record\_on\_start: optional boolean

Specifies if the meeting should start getting recorded as soon as someone joins the meeting.

<a href="#">Link to this property</a>

<details>

<summary>

recording\_config: optional object {audio\_config, file\_name\_prefix, live\_streaming\_config, 4 more }

Recording Configurations to be used for this meeting. This level of configs takes higher preference over App level configs on the RealtimeKit developer portal.

</summary>

<details>

<summary>

audio\_config: optional object {channel, codec, export\_file }

Object containing configuration regarding the audio that is being recorded.

</summary>

<details>

<summary>

channel: optional "mono"or "stereo"

Audio signal pathway within an audio file that carries a specific sound source.

</summary>

One of the following:

"mono"

<a href="#">Link to this property</a>

"stereo"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

codec: optional "MP3"or "AAC"

Codec using which the recording will be encoded. If VP8/VP9 is selected for videoConfig, changing audioConfig is not allowed. In this case, the codec in the audioConfig is automatically set to vorbis.

</summary>

One of the following:

"MP3"

<a href="#">Link to this property</a>

"AAC"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

export\_file: optional boolean

Controls whether to export audio file seperately

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

file\_name\_prefix: optional string

Adds a prefix to the beginning of the file name of the recording.

<a href="#">Link to this property</a>

<details>

<summary>

live\_streaming\_config: optional object {rtmp\_url }

</summary>

rtmp\_url: optional string

RTMP URL to stream to

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

max\_seconds: optional number

Specifies the maximum duration for recording in seconds, ranging from a minimum of 60 seconds to a maximum of 24 hours.

maximum86400

minimum60

<a href="#">Link to this property</a>

<details>

<summary>

realtimekit\_bucket\_config: optional object {enabled }

</summary>

enabled: boolean

Controls whether recordings are uploaded to RealtimeKit’s bucket. If set to false, <code>download_url</code>, <code>audio_download_url</code>, <code>download_url_expiry</code> won’t be generated for a recording.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

storage\_config: optional object {access\_key, auth\_method, bucket, 9 more } or object {access\_key, region, auth\_method, 9 more } or object {private\_key, access\_key, auth\_method, 9 more } or object {password, access\_key, auth\_method, 9 more }

</summary>

One of the following:

<details>

<summary>

object {access\_key, auth\_method, bucket, 9 more }

</summary>

access\_key: optional string

Access key of the storage medium. Access key is not required for the <code>gcs</code> storage media type.

Note that this field is not readable by clients, only writeable.

<a href="#">Link to this property</a>

<details>

<summary>

auth\_method: optional "KEY"or "PASSWORD"

Authentication method used for “sftp” type storage medium

</summary>

One of the following:

"KEY"

<a href="#">Link to this property</a>

"PASSWORD"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

bucket: optional string

Name of the storage medium’s bucket.

<a href="#">Link to this property</a>

host: optional string

SSH destination server host for SFTP type storage medium

<a href="#">Link to this property</a>

password: optional string

SSH destination server password for SFTP type storage medium when auth\_method is “PASSWORD”. If auth\_method is “KEY”, this specifies the password for the ssh private key.

<a href="#">Link to this property</a>

path: optional string

Path relative to the bucket root at which the recording will be placed.

<a href="#">Link to this property</a>

port: optional number

SSH destination server port for SFTP type storage medium

<a href="#">Link to this property</a>

private\_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth\_method used is “KEY”

<a href="#">Link to this property</a>

region: optional string

Region of the storage medium.

<a href="#">Link to this property</a>

secret: optional string

Secret key of the storage medium. Similar to <code>access_key</code>, it is only writeable by clients, not readable.

<a href="#">Link to this property</a>

type: optional "gcs"

<a href="#">Link to this property</a>

username: optional string

SSH destination server username for SFTP type storage medium

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {access\_key, region, auth\_method, 9 more }

</summary>

access\_key: unknown

minLength1

<a href="#">Link to this property</a>

region: unknown

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

auth\_method: optional "KEY"or "PASSWORD"

Authentication method used for “sftp” type storage medium

</summary>

One of the following:

"KEY"

<a href="#">Link to this property</a>

"PASSWORD"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

bucket: optional string

Name of the storage medium’s bucket.

<a href="#">Link to this property</a>

host: optional string

SSH destination server host for SFTP type storage medium

<a href="#">Link to this property</a>

password: optional string

SSH destination server password for SFTP type storage medium when auth\_method is “PASSWORD”. If auth\_method is “KEY”, this specifies the password for the ssh private key.

<a href="#">Link to this property</a>

path: optional string

Path relative to the bucket root at which the recording will be placed.

<a href="#">Link to this property</a>

port: optional number

SSH destination server port for SFTP type storage medium

<a href="#">Link to this property</a>

private\_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth\_method used is “KEY”

<a href="#">Link to this property</a>

secret: optional string

Secret key of the storage medium. Similar to <code>access_key</code>, it is only writeable by clients, not readable.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "aws"or "azure"or "digitalocean"

</summary>

One of the following:

"aws"

<a href="#">Link to this property</a>

"azure"

<a href="#">Link to this property</a>

"digitalocean"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

username: optional string

SSH destination server username for SFTP type storage medium

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {private\_key, access\_key, auth\_method, 9 more }

</summary>

private\_key: string

Private key used to login to destination SSH server for SFTP type storage medium, when auth\_method used is “KEY”

<a href="#">Link to this property</a>

access\_key: optional string

Access key of the storage medium. Access key is not required for the <code>gcs</code> storage media type.

Note that this field is not readable by clients, only writeable.

<a href="#">Link to this property</a>

auth\_method: optional "KEY"

<a href="#">Link to this property</a>

bucket: optional string

Name of the storage medium’s bucket.

<a href="#">Link to this property</a>

host: optional string

SSH destination server host for SFTP type storage medium

<a href="#">Link to this property</a>

password: optional string

SSH destination server password for SFTP type storage medium when auth\_method is “PASSWORD”. If auth\_method is “KEY”, this specifies the password for the ssh private key.

<a href="#">Link to this property</a>

path: optional string

Path relative to the bucket root at which the recording will be placed.

<a href="#">Link to this property</a>

port: optional number

SSH destination server port for SFTP type storage medium

<a href="#">Link to this property</a>

region: optional string

Region of the storage medium.

<a href="#">Link to this property</a>

secret: optional string

Secret key of the storage medium. Similar to <code>access_key</code>, it is only writeable by clients, not readable.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "aws"or "azure"or "digitalocean"or 2 more

Type of storage media.

</summary>

One of the following:

"aws"

<a href="#">Link to this property</a>

"azure"

<a href="#">Link to this property</a>

"digitalocean"

<a href="#">Link to this property</a>

"gcs"

<a href="#">Link to this property</a>

"sftp"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

username: optional string

SSH destination server username for SFTP type storage medium

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {password, access\_key, auth\_method, 9 more }

</summary>

password: string

SSH destination server password for SFTP type storage medium when auth\_method is “PASSWORD”. If auth\_method is “KEY”, this specifies the password for the ssh private key.

<a href="#">Link to this property</a>

access\_key: optional string

Access key of the storage medium. Access key is not required for the <code>gcs</code> storage media type.

Note that this field is not readable by clients, only writeable.

<a href="#">Link to this property</a>

auth\_method: optional "PASSWORD"

<a href="#">Link to this property</a>

bucket: optional string

Name of the storage medium’s bucket.

<a href="#">Link to this property</a>

host: optional string

SSH destination server host for SFTP type storage medium

<a href="#">Link to this property</a>

path: optional string

Path relative to the bucket root at which the recording will be placed.

<a href="#">Link to this property</a>

port: optional number

SSH destination server port for SFTP type storage medium

<a href="#">Link to this property</a>

private\_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth\_method used is “KEY”

<a href="#">Link to this property</a>

region: optional string

Region of the storage medium.

<a href="#">Link to this property</a>

secret: optional string

Secret key of the storage medium. Similar to <code>access_key</code>, it is only writeable by clients, not readable.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "aws"or "azure"or "digitalocean"or 2 more

Type of storage media.

</summary>

One of the following:

"aws"

<a href="#">Link to this property</a>

"azure"

<a href="#">Link to this property</a>

"digitalocean"

<a href="#">Link to this property</a>

"gcs"

<a href="#">Link to this property</a>

"sftp"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

username: optional string

SSH destination server username for SFTP type storage medium

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

video\_config: optional object {codec, export\_file, height, 2 more }

</summary>

<details>

<summary>

codec: optional "H264"or "VP8"or "VP9"

Codec using which the recording will be encoded.

</summary>

One of the following:

"H264"

<a href="#">Link to this property</a>

"VP8"

<a href="#">Link to this property</a>

"VP9"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

export\_file: optional boolean

Controls whether to export video file seperately

<a href="#">Link to this property</a>

height: optional number

Height of the recording video in pixels

maximum1920

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

watermark: optional object {position, size, url }

Watermark to be added to the recording

</summary>

<details>

<summary>

position: optional "left top"or "right top"or "left bottom"or "right bottom"

Position of the watermark

</summary>

One of the following:

"left top"

<a href="#">Link to this property</a>

"right top"

<a href="#">Link to this property</a>

"left bottom"

<a href="#">Link to this property</a>

"right bottom"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

size: optional object {height, width }

Size of the watermark

</summary>

height: optional number

Height of the watermark in px

minimum1

<a href="#">Link to this property</a>

width: optional number

Width of the watermark in px

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

url: optional string

URL of the watermark image

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

width: optional number

Width of the recording video in pixels

maximum1920

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

session\_keep\_alive\_time\_in\_secs: optional number

Time in seconds, for which a session remains active, after the last participant has left the meeting.

maximum600

minimum60

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "ACTIVE"or "INACTIVE"

Whether the meeting is <code>ACTIVE</code> or <code>INACTIVE</code>. Users will not be able to join an <code>INACTIVE</code> meeting.

</summary>

One of the following:

"ACTIVE"

<a href="#">Link to this property</a>

"INACTIVE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

summarize\_on\_end: optional boolean

Automatically generate summary of meetings using transcripts. Requires Transcriptions to be enabled, and can be retrieved via Webhooks or summary API.

<a href="#">Link to this property</a>

title: optional string

Title of the meeting.

<a href="#">Link to this property</a>

transcribe\_on\_end: optional boolean

Automatically generate transcripts when the meeting ends.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.meetings%20%3E%20(model)%20meeting_update_meeting_by_id_response%20%3E%20(schema)>)

<details>

<summary>

MeetingReplaceMeetingByIDResponse object {success, data }

</summary>

success: boolean

Success status of the operation

<a href="#">Link to this property</a>

<details>

<summary>

data: optional object {id, created\_at, updated\_at, 10 more }

Data returned by the operation

</summary>

id: string

ID of the meeting.

formatuuid

<a href="#">Link to this property</a>

created\_at: string

Timestamp the object was created at. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

updated\_at: string

Timestamp the object was updated at. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

ai\_config: optional object {summarization, transcription }

The AI Config allows you to customize the behavior of meeting transcriptions and summaries

</summary>

<details>

<summary>

summarization: optional object {summary\_type, text\_format, word\_limit }

Summary Config

</summary>

<details>

<summary>

summary\_type: optional "general"or "team\_meeting"or "sales\_call"or 6 more

Defines the style of the summary, such as general, team meeting, or sales call.

</summary>

One of the following:

"general"

<a href="#">Link to this property</a>

"team\_meeting"

<a href="#">Link to this property</a>

"sales\_call"

<a href="#">Link to this property</a>

"client\_check\_in"

<a href="#">Link to this property</a>

"interview"

<a href="#">Link to this property</a>

"daily\_standup"

<a href="#">Link to this property</a>

"one\_on\_one\_meeting"

<a href="#">Link to this property</a>

"lecture"

<a href="#">Link to this property</a>

"code\_review"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

text\_format: optional "plain\_text"or "markdown"

Determines the text format of the summary, such as plain text or markdown.

</summary>

One of the following:

"plain\_text"

<a href="#">Link to this property</a>

"markdown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

word\_limit: optional number

Sets the maximum number of words in the meeting summary.

maximum1000

minimum150

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

transcription: optional object {keywords, language, profanity\_filter }

Transcription Configurations

</summary>

keywords: optional array of string

Adds specific terms to improve accurate detection during transcription.

<a href="#">Link to this property</a>

<details>

<summary>

language: optional "en-US"or "en-IN"or "de"or 7 more

Specifies the language code for transcription to ensure accurate results.

</summary>

One of the following:

"en-US"

<a href="#">Link to this property</a>

"en-IN"

<a href="#">Link to this property</a>

"de"

<a href="#">Link to this property</a>

"hi"

<a href="#">Link to this property</a>

"sv"

<a href="#">Link to this property</a>

"ru"

<a href="#">Link to this property</a>

"pl"

<a href="#">Link to this property</a>

"el"

<a href="#">Link to this property</a>

"fr"

<a href="#">Link to this property</a>

"nl"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

profanity\_filter: optional boolean

Control the inclusion of offensive language in transcriptions.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

live\_stream\_on\_start: optional boolean

Specifies if the meeting should start getting livestreamed on start.

<a href="#">Link to this property</a>

persist\_chat: optional boolean

Specifies if Chat within a meeting should persist for a week.

<a href="#">Link to this property</a>

record\_on\_start: optional boolean

Specifies if the meeting should start getting recorded as soon as someone joins the meeting.

<a href="#">Link to this property</a>

<details>

<summary>

recording\_config: optional object {audio\_config, file\_name\_prefix, live\_streaming\_config, 4 more }

Recording Configurations to be used for this meeting. This level of configs takes higher preference over App level configs on the RealtimeKit developer portal.

</summary>

<details>

<summary>

audio\_config: optional object {channel, codec, export\_file }

Object containing configuration regarding the audio that is being recorded.

</summary>

<details>

<summary>

channel: optional "mono"or "stereo"

Audio signal pathway within an audio file that carries a specific sound source.

</summary>

One of the following:

"mono"

<a href="#">Link to this property</a>

"stereo"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

codec: optional "MP3"or "AAC"

Codec using which the recording will be encoded. If VP8/VP9 is selected for videoConfig, changing audioConfig is not allowed. In this case, the codec in the audioConfig is automatically set to vorbis.

</summary>

One of the following:

"MP3"

<a href="#">Link to this property</a>

"AAC"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

export\_file: optional boolean

Controls whether to export audio file seperately

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

file\_name\_prefix: optional string

Adds a prefix to the beginning of the file name of the recording.

<a href="#">Link to this property</a>

<details>

<summary>

live\_streaming\_config: optional object {rtmp\_url }

</summary>

rtmp\_url: optional string

RTMP URL to stream to

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

max\_seconds: optional number

Specifies the maximum duration for recording in seconds, ranging from a minimum of 60 seconds to a maximum of 24 hours.

maximum86400

minimum60

<a href="#">Link to this property</a>

<details>

<summary>

realtimekit\_bucket\_config: optional object {enabled }

</summary>

enabled: boolean

Controls whether recordings are uploaded to RealtimeKit’s bucket. If set to false, <code>download_url</code>, <code>audio_download_url</code>, <code>download_url_expiry</code> won’t be generated for a recording.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

storage\_config: optional object {access\_key, auth\_method, bucket, 9 more } or object {access\_key, region, auth\_method, 9 more } or object {private\_key, access\_key, auth\_method, 9 more } or object {password, access\_key, auth\_method, 9 more }

</summary>

One of the following:

<details>

<summary>

object {access\_key, auth\_method, bucket, 9 more }

</summary>

access\_key: optional string

Access key of the storage medium. Access key is not required for the <code>gcs</code> storage media type.

Note that this field is not readable by clients, only writeable.

<a href="#">Link to this property</a>

<details>

<summary>

auth\_method: optional "KEY"or "PASSWORD"

Authentication method used for “sftp” type storage medium

</summary>

One of the following:

"KEY"

<a href="#">Link to this property</a>

"PASSWORD"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

bucket: optional string

Name of the storage medium’s bucket.

<a href="#">Link to this property</a>

host: optional string

SSH destination server host for SFTP type storage medium

<a href="#">Link to this property</a>

password: optional string

SSH destination server password for SFTP type storage medium when auth\_method is “PASSWORD”. If auth\_method is “KEY”, this specifies the password for the ssh private key.

<a href="#">Link to this property</a>

path: optional string

Path relative to the bucket root at which the recording will be placed.

<a href="#">Link to this property</a>

port: optional number

SSH destination server port for SFTP type storage medium

<a href="#">Link to this property</a>

private\_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth\_method used is “KEY”

<a href="#">Link to this property</a>

region: optional string

Region of the storage medium.

<a href="#">Link to this property</a>

secret: optional string

Secret key of the storage medium. Similar to <code>access_key</code>, it is only writeable by clients, not readable.

<a href="#">Link to this property</a>

type: optional "gcs"

<a href="#">Link to this property</a>

username: optional string

SSH destination server username for SFTP type storage medium

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {access\_key, region, auth\_method, 9 more }

</summary>

access\_key: unknown

minLength1

<a href="#">Link to this property</a>

region: unknown

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

auth\_method: optional "KEY"or "PASSWORD"

Authentication method used for “sftp” type storage medium

</summary>

One of the following:

"KEY"

<a href="#">Link to this property</a>

"PASSWORD"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

bucket: optional string

Name of the storage medium’s bucket.

<a href="#">Link to this property</a>

host: optional string

SSH destination server host for SFTP type storage medium

<a href="#">Link to this property</a>

password: optional string

SSH destination server password for SFTP type storage medium when auth\_method is “PASSWORD”. If auth\_method is “KEY”, this specifies the password for the ssh private key.

<a href="#">Link to this property</a>

path: optional string

Path relative to the bucket root at which the recording will be placed.

<a href="#">Link to this property</a>

port: optional number

SSH destination server port for SFTP type storage medium

<a href="#">Link to this property</a>

private\_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth\_method used is “KEY”

<a href="#">Link to this property</a>

secret: optional string

Secret key of the storage medium. Similar to <code>access_key</code>, it is only writeable by clients, not readable.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "aws"or "azure"or "digitalocean"

</summary>

One of the following:

"aws"

<a href="#">Link to this property</a>

"azure"

<a href="#">Link to this property</a>

"digitalocean"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

username: optional string

SSH destination server username for SFTP type storage medium

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {private\_key, access\_key, auth\_method, 9 more }

</summary>

private\_key: string

Private key used to login to destination SSH server for SFTP type storage medium, when auth\_method used is “KEY”

<a href="#">Link to this property</a>

access\_key: optional string

Access key of the storage medium. Access key is not required for the <code>gcs</code> storage media type.

Note that this field is not readable by clients, only writeable.

<a href="#">Link to this property</a>

auth\_method: optional "KEY"

<a href="#">Link to this property</a>

bucket: optional string

Name of the storage medium’s bucket.

<a href="#">Link to this property</a>

host: optional string

SSH destination server host for SFTP type storage medium

<a href="#">Link to this property</a>

password: optional string

SSH destination server password for SFTP type storage medium when auth\_method is “PASSWORD”. If auth\_method is “KEY”, this specifies the password for the ssh private key.

<a href="#">Link to this property</a>

path: optional string

Path relative to the bucket root at which the recording will be placed.

<a href="#">Link to this property</a>

port: optional number

SSH destination server port for SFTP type storage medium

<a href="#">Link to this property</a>

region: optional string

Region of the storage medium.

<a href="#">Link to this property</a>

secret: optional string

Secret key of the storage medium. Similar to <code>access_key</code>, it is only writeable by clients, not readable.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "aws"or "azure"or "digitalocean"or 2 more

Type of storage media.

</summary>

One of the following:

"aws"

<a href="#">Link to this property</a>

"azure"

<a href="#">Link to this property</a>

"digitalocean"

<a href="#">Link to this property</a>

"gcs"

<a href="#">Link to this property</a>

"sftp"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

username: optional string

SSH destination server username for SFTP type storage medium

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {password, access\_key, auth\_method, 9 more }

</summary>

password: string

SSH destination server password for SFTP type storage medium when auth\_method is “PASSWORD”. If auth\_method is “KEY”, this specifies the password for the ssh private key.

<a href="#">Link to this property</a>

access\_key: optional string

Access key of the storage medium. Access key is not required for the <code>gcs</code> storage media type.

Note that this field is not readable by clients, only writeable.

<a href="#">Link to this property</a>

auth\_method: optional "PASSWORD"

<a href="#">Link to this property</a>

bucket: optional string

Name of the storage medium’s bucket.

<a href="#">Link to this property</a>

host: optional string

SSH destination server host for SFTP type storage medium

<a href="#">Link to this property</a>

path: optional string

Path relative to the bucket root at which the recording will be placed.

<a href="#">Link to this property</a>

port: optional number

SSH destination server port for SFTP type storage medium

<a href="#">Link to this property</a>

private\_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth\_method used is “KEY”

<a href="#">Link to this property</a>

region: optional string

Region of the storage medium.

<a href="#">Link to this property</a>

secret: optional string

Secret key of the storage medium. Similar to <code>access_key</code>, it is only writeable by clients, not readable.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "aws"or "azure"or "digitalocean"or 2 more

Type of storage media.

</summary>

One of the following:

"aws"

<a href="#">Link to this property</a>

"azure"

<a href="#">Link to this property</a>

"digitalocean"

<a href="#">Link to this property</a>

"gcs"

<a href="#">Link to this property</a>

"sftp"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

username: optional string

SSH destination server username for SFTP type storage medium

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

video\_config: optional object {codec, export\_file, height, 2 more }

</summary>

<details>

<summary>

codec: optional "H264"or "VP8"or "VP9"

Codec using which the recording will be encoded.

</summary>

One of the following:

"H264"

<a href="#">Link to this property</a>

"VP8"

<a href="#">Link to this property</a>

"VP9"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

export\_file: optional boolean

Controls whether to export video file seperately

<a href="#">Link to this property</a>

height: optional number

Height of the recording video in pixels

maximum1920

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

watermark: optional object {position, size, url }

Watermark to be added to the recording

</summary>

<details>

<summary>

position: optional "left top"or "right top"or "left bottom"or "right bottom"

Position of the watermark

</summary>

One of the following:

"left top"

<a href="#">Link to this property</a>

"right top"

<a href="#">Link to this property</a>

"left bottom"

<a href="#">Link to this property</a>

"right bottom"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

size: optional object {height, width }

Size of the watermark

</summary>

height: optional number

Height of the watermark in px

minimum1

<a href="#">Link to this property</a>

width: optional number

Width of the watermark in px

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

url: optional string

URL of the watermark image

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

width: optional number

Width of the recording video in pixels

maximum1920

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

session\_keep\_alive\_time\_in\_secs: optional number

Time in seconds, for which a session remains active, after the last participant has left the meeting.

maximum600

minimum60

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "ACTIVE"or "INACTIVE"

Whether the meeting is <code>ACTIVE</code> or <code>INACTIVE</code>. Users will not be able to join an <code>INACTIVE</code> meeting.

</summary>

One of the following:

"ACTIVE"

<a href="#">Link to this property</a>

"INACTIVE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

summarize\_on\_end: optional boolean

Automatically generate summary of meetings using transcripts. Requires Transcriptions to be enabled, and can be retrieved via Webhooks or summary API.

<a href="#">Link to this property</a>

title: optional string

Title of the meeting.

<a href="#">Link to this property</a>

transcribe\_on\_end: optional boolean

Automatically generate transcripts when the meeting ends.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.meetings%20%3E%20(model)%20meeting_replace_meeting_by_id_response%20%3E%20(schema)>)

<details>

<summary>

MeetingGetMeetingParticipantsResponse object {data, paging, success }

</summary>

<details>

<summary>

data: array of object {id, created\_at, custom\_participant\_id, 4 more }

</summary>

id: string

ID of the participant.

formatuuid

<a href="#">Link to this property</a>

created\_at: string

When this object was created. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

custom\_participant\_id: string

A unique participant ID generated by the client.

<a href="#">Link to this property</a>

preset\_name: string

Preset applied to the participant.

<a href="#">Link to this property</a>

updated\_at: string

When this object was updated. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

name: optional string

Name of the participant.

<a href="#">Link to this property</a>

picture: optional string

URL to a picture of the participant.

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

paging: object {end\_offset, start\_offset, total\_count }

</summary>

end\_offset: number

<a href="#">Link to this property</a>

start\_offset: number

<a href="#">Link to this property</a>

total\_count: number

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.meetings%20%3E%20(model)%20meeting_get_meeting_participants_response%20%3E%20(schema)>)

<details>

<summary>

MeetingAddParticipantResponse object {success, data }

</summary>

success: boolean

Success status of the operation

<a href="#">Link to this property</a>

<details>

<summary>

data: optional object {id, token, created\_at, 5 more }

Represents a participant.

</summary>

id: string

ID of the participant.

formatuuid

<a href="#">Link to this property</a>

token: string

The participant’s auth token that can be used for joining a meeting from the client side.

<a href="#">Link to this property</a>

created\_at: string

When this object was created. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

custom\_participant\_id: string

A unique participant ID generated by the client.

<a href="#">Link to this property</a>

preset\_name: string

Preset applied to the participant.

<a href="#">Link to this property</a>

updated\_at: string

When this object was updated. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

name: optional string

Name of the participant.

<a href="#">Link to this property</a>

picture: optional string

URL to a picture of the participant.

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.meetings%20%3E%20(model)%20meeting_add_participant_response%20%3E%20(schema)>)

<details>

<summary>

MeetingGetMeetingParticipantResponse object {data, success }

</summary>

<details>

<summary>

data: object {id, created\_at, custom\_participant\_id, 4 more }

Data returned by the operation

</summary>

id: string

ID of the participant.

formatuuid

<a href="#">Link to this property</a>

created\_at: string

When this object was created. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

custom\_participant\_id: string

A unique participant ID generated by the client.

<a href="#">Link to this property</a>

preset\_name: string

Preset applied to the participant.

<a href="#">Link to this property</a>

updated\_at: string

When this object was updated. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

name: optional string

Name of the participant.

<a href="#">Link to this property</a>

picture: optional string

URL to a picture of the participant.

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: boolean

Success status of the operation

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.meetings%20%3E%20(model)%20meeting_get_meeting_participant_response%20%3E%20(schema)>)

<details>

<summary>

MeetingEditParticipantResponse object {success, data }

</summary>

success: boolean

Success status of the operation

<a href="#">Link to this property</a>

<details>

<summary>

data: optional object {id, token, created\_at, 5 more }

Represents a participant.

</summary>

id: string

ID of the participant.

formatuuid

<a href="#">Link to this property</a>

token: string

The participant’s auth token that can be used for joining a meeting from the client side.

<a href="#">Link to this property</a>

created\_at: string

When this object was created. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

custom\_participant\_id: string

A unique participant ID generated by the client.

<a href="#">Link to this property</a>

preset\_name: string

Preset applied to the participant.

<a href="#">Link to this property</a>

updated\_at: string

When this object was updated. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

name: optional string

Name of the participant.

<a href="#">Link to this property</a>

picture: optional string

URL to a picture of the participant.

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.meetings%20%3E%20(model)%20meeting_edit_participant_response%20%3E%20(schema)>)

<details>

<summary>

MeetingDeleteMeetingParticipantResponse object {success, data }

</summary>

success: boolean

Success status of the operation

<a href="#">Link to this property</a>

<details>

<summary>

data: optional object {created\_at, custom\_participant\_id, preset\_id, updated\_at }

Data returned by the operation

</summary>

created\_at: string

Timestamp this object was created at. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

custom\_participant\_id: string

A unique participant ID generated by the client.

<a href="#">Link to this property</a>

preset\_id: string

ID of the preset applied to this participant.

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

Timestamp this object was updated at. The time is returned in ISO format.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.meetings%20%3E%20(model)%20meeting_delete_meeting_participant_response%20%3E%20(schema)>)

<details>

<summary>

MeetingRefreshParticipantTokenResponse object {data, success }

</summary>

<details>

<summary>

data: object {token }

Data returned by the operation

</summary>

token: string

Regenerated participant’s authentication token.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: boolean

Success status of the operation

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.meetings%20%3E%20(model)%20meeting_refresh_participant_token_response%20%3E%20(schema)>)