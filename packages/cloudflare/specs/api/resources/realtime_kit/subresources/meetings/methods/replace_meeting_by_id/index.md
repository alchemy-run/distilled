---
title: Replace a meeting
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Realtime Kit](https://developers.cloudflare.com/api/resources/realtime_kit)

[Meetings](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/meetings)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Replace a meeting

PUT/accounts/{account\_id}/realtime/kit/{app\_id}/meetings/{meeting\_id}

Replaces all the details for the given meeting ID.

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

[Link to this property](#)%20realtime_kit.meetings%20%3E%20(method)%20replace_meeting_by_id%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

app\_id: string

The app identifier tag.

maxLength32

[Link to this property](#)%20realtime_kit.meetings%20%3E%20(method)%20replace_meeting_by_id%20%3E%20(params)%20default%20%3E%20(param)%20app_id%20%3E%20(schema)>)

meeting\_id: string

formatuuid

[Link to this property](#)%20realtime_kit.meetings%20%3E%20(method)%20replace_meeting_by_id%20%3E%20(params)%20default%20%3E%20(param)%20meeting_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

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

[Link to this property](#)%20realtime_kit.meetings%20%3E%20(method)%20replace_meeting_by_id%20%3E%20(params)%200%20%3E%20(param)%20ai_config%20%3E%20(schema)>)

live\_stream\_on\_start: optional boolean

Specifies if the meeting should start getting livestreamed on start.

[Link to this property](#)%20realtime_kit.meetings%20%3E%20(method)%20replace_meeting_by_id%20%3E%20(params)%200%20%3E%20(param)%20live_stream_on_start%20%3E%20(schema)>)

persist\_chat: optional boolean

If a meeting is set to persist\_chat, meeting chat would remain for a week within the meeting space.

[Link to this property](#)%20realtime_kit.meetings%20%3E%20(method)%20replace_meeting_by_id%20%3E%20(params)%200%20%3E%20(param)%20persist_chat%20%3E%20(schema)>)

record\_on\_start: optional boolean

Specifies if the meeting should start getting recorded as soon as someone joins the meeting.

[Link to this property](#)%20realtime_kit.meetings%20%3E%20(method)%20replace_meeting_by_id%20%3E%20(params)%200%20%3E%20(param)%20record_on_start%20%3E%20(schema)>)

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

[Link to this property](#)%20realtime_kit.meetings%20%3E%20(method)%20replace_meeting_by_id%20%3E%20(params)%200%20%3E%20(param)%20recording_config%20%3E%20(schema)>)

session\_keep\_alive\_time\_in\_secs: optional number

Time in seconds, for which a session remains active, after the last participant has left the meeting.

maximum600

minimum60

[Link to this property](#)%20realtime_kit.meetings%20%3E%20(method)%20replace_meeting_by_id%20%3E%20(params)%200%20%3E%20(param)%20session_keep_alive_time_in_secs%20%3E%20(schema)>)

summarize\_on\_end: optional boolean

Automatically generate summary of meetings using transcripts. Requires Transcriptions to be enabled, and can be retrieved via Webhooks or summary API.

[Link to this property](#)%20realtime_kit.meetings%20%3E%20(method)%20replace_meeting_by_id%20%3E%20(params)%200%20%3E%20(param)%20summarize_on_end%20%3E%20(schema)>)

title: optional string

Title of the meeting

[Link to this property](#)%20realtime_kit.meetings%20%3E%20(method)%20replace_meeting_by_id%20%3E%20(params)%200%20%3E%20(param)%20title%20%3E%20(schema)>)

transcribe\_on\_end: optional boolean

Automatically generate transcripts when the meeting ends.

[Link to this property](#)%20realtime_kit.meetings%20%3E%20(method)%20replace_meeting_by_id%20%3E%20(params)%200%20%3E%20(param)%20transcribe_on_end%20%3E%20(schema)>)

##### ReturnsExpand Collapse

success: boolean

Success status of the operation

[Link to this property](#)%20realtime_kit.meetings%20%3E%20(model)%20meeting_replace_meeting_by_id_response%20%3E%20(schema)%20%3E%20(property)%20success>)

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

[Link to this property](#)%20realtime_kit.meetings%20%3E%20(model)%20meeting_replace_meeting_by_id_response%20%3E%20(schema)%20%3E%20(property)%20data>)

### Replace a meeting

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
```

200 example

```
{
  "success": true,
  "data": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_at": "2019-12-27T18:11:19.117Z",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "ai_config": {
      "summarization": {
        "summary_type": "general",
        "text_format": "plain_text",
        "word_limit": 150
      },
      "transcription": {
        "keywords": [
          "string"
        ],
        "language": "en-US",
        "profanity_filter": true
      }
    },
    "live_stream_on_start": true,
    "persist_chat": true,
    "record_on_start": true,
    "recording_config": {
      "audio_config": {
        "channel": "mono",
        "codec": "MP3",
        "export_file": true
      },
      "file_name_prefix": "file_name_prefix",
      "live_streaming_config": {
        "rtmp_url": "rtmp://a.rtmp.youtube.com/live2"
      },
      "max_seconds": 60,
      "realtimekit_bucket_config": {
        "enabled": true
      },
      "storage_config": {
        "auth_method": "KEY",
        "bucket": "bucket",
        "host": "host",
        "path": "path",
        "port": 0,
        "region": "us-east-1",
        "type": "gcs",
        "username": "username"
      },
      "video_config": {
        "codec": "H264",
        "export_file": true,
        "height": 720,
        "watermark": {
          "position": "left top",
          "size": {
            "height": 1,
            "width": 1
          },
          "url": "https://example.com"
        },
        "width": 1280
      }
    },
    "session_keep_alive_time_in_secs": 60,
    "status": "ACTIVE",
    "summarize_on_end": true,
    "title": "title",
    "transcribe_on_end": true
  }
}
```

##### Returns Examples

200 example

```
{
  "success": true,
  "data": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_at": "2019-12-27T18:11:19.117Z",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "ai_config": {
      "summarization": {
        "summary_type": "general",
        "text_format": "plain_text",
        "word_limit": 150
      },
      "transcription": {
        "keywords": [
          "string"
        ],
        "language": "en-US",
        "profanity_filter": true
      }
    },
    "live_stream_on_start": true,
    "persist_chat": true,
    "record_on_start": true,
    "recording_config": {
      "audio_config": {
        "channel": "mono",
        "codec": "MP3",
        "export_file": true
      },
      "file_name_prefix": "file_name_prefix",
      "live_streaming_config": {
        "rtmp_url": "rtmp://a.rtmp.youtube.com/live2"
      },
      "max_seconds": 60,
      "realtimekit_bucket_config": {
        "enabled": true
      },
      "storage_config": {
        "auth_method": "KEY",
        "bucket": "bucket",
        "host": "host",
        "path": "path",
        "port": 0,
        "region": "us-east-1",
        "type": "gcs",
        "username": "username"
      },
      "video_config": {
        "codec": "H264",
        "export_file": true,
        "height": 720,
        "watermark": {
          "position": "left top",
          "size": {
            "height": 1,
            "width": 1
          },
          "url": "https://example.com"
        },
        "width": 1280
      }
    },
    "session_keep_alive_time_in_secs": 60,
    "status": "ACTIVE",
    "summarize_on_end": true,
    "title": "title",
    "transcribe_on_end": true
  }
}
```