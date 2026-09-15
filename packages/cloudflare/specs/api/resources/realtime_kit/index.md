##### [Fetch all apps](/api/resources/realtime_kit/subresources/apps/methods/get)

GET/accounts/{account_id}/realtime/kit/apps

##### [Create App](/api/resources/realtime_kit/subresources/apps/methods/post)

POST/accounts/{account_id}/realtime/kit/apps

##### Models

<details>

<summary>

AppGetResponse object { data, paging, success }

</summary>

<details>

<summary>

data: optional array of object { id, created_at, name }

</summary>

id: optional string

formatuuid

[Link to this property](#)

created_at: optional string

formatdate-time

[Link to this property](#)

name: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

paging: optional object { end_offset, start_offset, total_count }

</summary>

end_offset: optional number

[Link to this property](#)

start_offset: optional number

[Link to this property](#)

total_count: optional number

[Link to this property](#)

</details>

[Link to this property](#)

success: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AppPostResponse object { data, success }

</summary>

<details>

<summary>

data: optional object { app }

</summary>

<details>

<summary>

app: optional object { id, created_at, name }

</summary>

id: optional string

formatuuid

[Link to this property](#)

created_at: optional string

formatdate-time

[Link to this property](#)

name: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

success: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

##### [Fetch all meetings for an App](/api/resources/realtime_kit/subresources/meetings/methods/get)

GET/accounts/{account_id}/realtime/kit/{app_id}/meetings

##### [Create a meeting](/api/resources/realtime_kit/subresources/meetings/methods/create)

POST/accounts/{account_id}/realtime/kit/{app_id}/meetings

##### [Fetch a meeting for an App](/api/resources/realtime_kit/subresources/meetings/methods/get_meeting_by_id)

GET/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}

##### [Update a meeting](/api/resources/realtime_kit/subresources/meetings/methods/update_meeting_by_id)

PATCH/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}

##### [Replace a meeting](/api/resources/realtime_kit/subresources/meetings/methods/replace_meeting_by_id)

PUT/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}

##### [Fetch all participants of a meeting](/api/resources/realtime_kit/subresources/meetings/methods/get_meeting_participants)

GET/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/participants

##### [Add a participant](/api/resources/realtime_kit/subresources/meetings/methods/add_participant)

POST/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/participants

##### [Fetch a participant's detail](/api/resources/realtime_kit/subresources/meetings/methods/get_meeting_participant)

GET/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/participants/{participant_id}

##### [Edit a participant's detail](/api/resources/realtime_kit/subresources/meetings/methods/edit_participant)

PATCH/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/participants/{participant_id}

##### [Delete a participant](/api/resources/realtime_kit/subresources/meetings/methods/delete_meeting_participant)

DELETE/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/participants/{participant_id}

##### [Refresh participant's authentication token](/api/resources/realtime_kit/subresources/meetings/methods/refresh_participant_token)

POST/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/participants/{participant_id}/token

##### Models

<details>

<summary>

MeetingGetResponse object { data, paging, success }

</summary>

<details>

<summary>

data: array of object { id, created_at, updated_at, 9 more }

</summary>

id: string

ID of the meeting.

formatuuid

[Link to this property](#)

created_at: string

Timestamp the object was created at. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

updated_at: string

Timestamp the object was updated at. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

live_stream_on_start: optional boolean

Specifies if the meeting should start getting livestreamed on start.

[Link to this property](#)

persist_chat: optional boolean

Specifies if Chat within a meeting should persist for a week.

[Link to this property](#)

record_on_start: optional boolean

Specifies if the meeting should start getting recorded as soon as someone joins the meeting.

[Link to this property](#)

<details>

<summary>

recording_config: optional object { audio_config, file_name_prefix, live_streaming_config, 4 more }

Recording Configurations to be used for this meeting. This level of configs takes higher preference over App level configs on the RealtimeKit developer portal.

</summary>

<details>

<summary>

audio_config: optional object { channel, codec, export_file }

Object containing configuration regarding the audio that is being recorded.

</summary>

<details>

<summary>

channel: optional "mono" or "stereo"

Audio signal pathway within an audio file that carries a specific sound source.

</summary>

One of the following:

"mono"

[Link to this property](#)

"stereo"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

codec: optional "MP3" or "AAC"

Codec using which the recording will be encoded. If VP8/VP9 is selected for videoConfig, changing audioConfig is not allowed. In this case, the codec in the audioConfig is automatically set to vorbis.

</summary>

One of the following:

"MP3"

[Link to this property](#)

"AAC"

[Link to this property](#)

</details>

[Link to this property](#)

export_file: optional boolean

Controls whether to export audio file seperately

[Link to this property](#)

</details>

[Link to this property](#)

file_name_prefix: optional string

Adds a prefix to the beginning of the file name of the recording.

[Link to this property](#)

<details>

<summary>

live_streaming_config: optional object { rtmp_url }

</summary>

rtmp_url: optional string

RTMP URL to stream to

formaturi

[Link to this property](#)

</details>

[Link to this property](#)

max_seconds: optional number

Specifies the maximum duration for recording in seconds, ranging from a minimum of 60 seconds to a maximum of 24 hours.

maximum86400

minimum60

[Link to this property](#)

<details>

<summary>

realtimekit_bucket_config: optional object { enabled }

</summary>

enabled: boolean

Controls whether recordings are uploaded to RealtimeKit’s bucket. If set to false, `download_url`, `audio_download_url`, `download_url_expiry` won’t be generated for a recording.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

storage_config: optional object { access_key, auth_method, bucket, 9 more } or object { access_key, region, auth_method, 9 more } or object { private_key, access_key, auth_method, 9 more } or object { password, access_key, auth_method, 9 more }

</summary>

One of the following:

<details>

<summary>

object { access_key, auth_method, bucket, 9 more }

</summary>

access_key: optional string

Access key of the storage medium. Access key is not required for the `gcs` storage media type.

Note that this field is not readable by clients, only writeable.

[Link to this property](#)

<details>

<summary>

auth_method: optional "KEY" or "PASSWORD"

Authentication method used for “sftp” type storage medium

</summary>

One of the following:

"KEY"

[Link to this property](#)

"PASSWORD"

[Link to this property](#)

</details>

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

password: optional string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

private_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

region: optional string

Region of the storage medium.

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

type: optional "gcs"

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { access_key, region, auth_method, 9 more }

</summary>

access_key: unknown

minLength1

[Link to this property](#)

region: unknown

minLength1

[Link to this property](#)

<details>

<summary>

auth_method: optional "KEY" or "PASSWORD"

Authentication method used for “sftp” type storage medium

</summary>

One of the following:

"KEY"

[Link to this property](#)

"PASSWORD"

[Link to this property](#)

</details>

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

password: optional string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

private_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

<details>

<summary>

type: optional "aws" or "azure" or "digitalocean"

</summary>

One of the following:

"aws"

[Link to this property](#)

"azure"

[Link to this property](#)

"digitalocean"

[Link to this property](#)

</details>

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { private_key, access_key, auth_method, 9 more }

</summary>

private_key: string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

access_key: optional string

Access key of the storage medium. Access key is not required for the `gcs` storage media type.

Note that this field is not readable by clients, only writeable.

[Link to this property](#)

auth_method: optional "KEY"

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

password: optional string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

region: optional string

Region of the storage medium.

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

<details>

<summary>

type: optional "aws" or "azure" or "digitalocean" or 2 more

Type of storage media.

</summary>

One of the following:

"aws"

[Link to this property](#)

"azure"

[Link to this property](#)

"digitalocean"

[Link to this property](#)

"gcs"

[Link to this property](#)

"sftp"

[Link to this property](#)

</details>

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { password, access_key, auth_method, 9 more }

</summary>

password: string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

access_key: optional string

Access key of the storage medium. Access key is not required for the `gcs` storage media type.

Note that this field is not readable by clients, only writeable.

[Link to this property](#)

auth_method: optional "PASSWORD"

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

private_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

region: optional string

Region of the storage medium.

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

<details>

<summary>

type: optional "aws" or "azure" or "digitalocean" or 2 more

Type of storage media.

</summary>

One of the following:

"aws"

[Link to this property](#)

"azure"

[Link to this property](#)

"digitalocean"

[Link to this property](#)

"gcs"

[Link to this property](#)

"sftp"

[Link to this property](#)

</details>

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

video_config: optional object { codec, export_file, height, 2 more }

</summary>

<details>

<summary>

codec: optional "H264" or "VP8" or "VP9"

Codec using which the recording will be encoded.

</summary>

One of the following:

"H264"

[Link to this property](#)

"VP8"

[Link to this property](#)

"VP9"

[Link to this property](#)

</details>

[Link to this property](#)

export_file: optional boolean

Controls whether to export video file seperately

[Link to this property](#)

height: optional number

Height of the recording video in pixels

maximum1920

minimum1

[Link to this property](#)

<details>

<summary>

watermark: optional object { position, size, url }

Watermark to be added to the recording

</summary>

<details>

<summary>

position: optional "left top" or "right top" or "left bottom" or "right bottom"

Position of the watermark

</summary>

One of the following:

"left top"

[Link to this property](#)

"right top"

[Link to this property](#)

"left bottom"

[Link to this property](#)

"right bottom"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

size: optional object { height, width }

Size of the watermark

</summary>

height: optional number

Height of the watermark in px

minimum1

[Link to this property](#)

width: optional number

Width of the watermark in px

minimum1

[Link to this property](#)

</details>

[Link to this property](#)

url: optional string

URL of the watermark image

formaturi

[Link to this property](#)

</details>

[Link to this property](#)

width: optional number

Width of the recording video in pixels

maximum1920

minimum1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

session_keep_alive_time_in_secs: optional number

Time in seconds, for which a session remains active, after the last participant has left the meeting.

maximum600

minimum60

[Link to this property](#)

<details>

<summary>

status: optional "ACTIVE" or "INACTIVE"

Whether the meeting is `ACTIVE` or `INACTIVE`. Users will not be able to join an `INACTIVE` meeting.

</summary>

One of the following:

"ACTIVE"

[Link to this property](#)

"INACTIVE"

[Link to this property](#)

</details>

[Link to this property](#)

summarize_on_end: optional boolean

Automatically generate summary of meetings using transcripts. Requires Transcriptions to be enabled, and can be retrieved via Webhooks or summary API.

[Link to this property](#)

title: optional string

Title of the meeting.

[Link to this property](#)

transcribe_on_end: optional boolean

Automatically generate transcripts when the meeting ends.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

paging: object { end_offset, start_offset, total_count }

</summary>

end_offset: number

[Link to this property](#)

start_offset: number

[Link to this property](#)

total_count: number

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

success: boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

MeetingCreateResponse object { success, data }

</summary>

success: boolean

Success status of the operation

[Link to this property](#)

<details>

<summary>

data: optional object { id, created_at, updated_at, 10 more }

Data returned by the operation

</summary>

id: string

ID of the meeting.

formatuuid

[Link to this property](#)

created_at: string

Timestamp the object was created at. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

updated_at: string

Timestamp the object was updated at. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

<details>

<summary>

ai_config: optional object { summarization, transcription }

The AI Config allows you to customize the behavior of meeting transcriptions and summaries

</summary>

<details>

<summary>

summarization: optional object { summary_type, text_format, word_limit }

Summary Config

</summary>

<details>

<summary>

summary_type: optional "general" or "team_meeting" or "sales_call" or 6 more

Defines the style of the summary, such as general, team meeting, or sales call.

</summary>

One of the following:

"general"

[Link to this property](#)

"team_meeting"

[Link to this property](#)

"sales_call"

[Link to this property](#)

"client_check_in"

[Link to this property](#)

"interview"

[Link to this property](#)

"daily_standup"

[Link to this property](#)

"one_on_one_meeting"

[Link to this property](#)

"lecture"

[Link to this property](#)

"code_review"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

text_format: optional "plain_text" or "markdown"

Determines the text format of the summary, such as plain text or markdown.

</summary>

One of the following:

"plain_text"

[Link to this property](#)

"markdown"

[Link to this property](#)

</details>

[Link to this property](#)

word_limit: optional number

Sets the maximum number of words in the meeting summary.

maximum1000

minimum150

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

transcription: optional object { keywords, language, profanity_filter }

Transcription Configurations

</summary>

keywords: optional array of string

Adds specific terms to improve accurate detection during transcription.

[Link to this property](#)

<details>

<summary>

language: optional "en-US" or "en-IN" or "de" or 7 more

Specifies the language code for transcription to ensure accurate results.

</summary>

One of the following:

"en-US"

[Link to this property](#)

"en-IN"

[Link to this property](#)

"de"

[Link to this property](#)

"hi"

[Link to this property](#)

"sv"

[Link to this property](#)

"ru"

[Link to this property](#)

"pl"

[Link to this property](#)

"el"

[Link to this property](#)

"fr"

[Link to this property](#)

"nl"

[Link to this property](#)

</details>

[Link to this property](#)

profanity_filter: optional boolean

Control the inclusion of offensive language in transcriptions.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

live_stream_on_start: optional boolean

Specifies if the meeting should start getting livestreamed on start.

[Link to this property](#)

persist_chat: optional boolean

Specifies if Chat within a meeting should persist for a week.

[Link to this property](#)

record_on_start: optional boolean

Specifies if the meeting should start getting recorded as soon as someone joins the meeting.

[Link to this property](#)

<details>

<summary>

recording_config: optional object { audio_config, file_name_prefix, live_streaming_config, 4 more }

Recording Configurations to be used for this meeting. This level of configs takes higher preference over App level configs on the RealtimeKit developer portal.

</summary>

<details>

<summary>

audio_config: optional object { channel, codec, export_file }

Object containing configuration regarding the audio that is being recorded.

</summary>

<details>

<summary>

channel: optional "mono" or "stereo"

Audio signal pathway within an audio file that carries a specific sound source.

</summary>

One of the following:

"mono"

[Link to this property](#)

"stereo"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

codec: optional "MP3" or "AAC"

Codec using which the recording will be encoded. If VP8/VP9 is selected for videoConfig, changing audioConfig is not allowed. In this case, the codec in the audioConfig is automatically set to vorbis.

</summary>

One of the following:

"MP3"

[Link to this property](#)

"AAC"

[Link to this property](#)

</details>

[Link to this property](#)

export_file: optional boolean

Controls whether to export audio file seperately

[Link to this property](#)

</details>

[Link to this property](#)

file_name_prefix: optional string

Adds a prefix to the beginning of the file name of the recording.

[Link to this property](#)

<details>

<summary>

live_streaming_config: optional object { rtmp_url }

</summary>

rtmp_url: optional string

RTMP URL to stream to

formaturi

[Link to this property](#)

</details>

[Link to this property](#)

max_seconds: optional number

Specifies the maximum duration for recording in seconds, ranging from a minimum of 60 seconds to a maximum of 24 hours.

maximum86400

minimum60

[Link to this property](#)

<details>

<summary>

realtimekit_bucket_config: optional object { enabled }

</summary>

enabled: boolean

Controls whether recordings are uploaded to RealtimeKit’s bucket. If set to false, `download_url`, `audio_download_url`, `download_url_expiry` won’t be generated for a recording.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

storage_config: optional object { access_key, auth_method, bucket, 9 more } or object { access_key, region, auth_method, 9 more } or object { private_key, access_key, auth_method, 9 more } or object { password, access_key, auth_method, 9 more }

</summary>

One of the following:

<details>

<summary>

object { access_key, auth_method, bucket, 9 more }

</summary>

access_key: optional string

Access key of the storage medium. Access key is not required for the `gcs` storage media type.

Note that this field is not readable by clients, only writeable.

[Link to this property](#)

<details>

<summary>

auth_method: optional "KEY" or "PASSWORD"

Authentication method used for “sftp” type storage medium

</summary>

One of the following:

"KEY"

[Link to this property](#)

"PASSWORD"

[Link to this property](#)

</details>

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

password: optional string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

private_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

region: optional string

Region of the storage medium.

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

type: optional "gcs"

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { access_key, region, auth_method, 9 more }

</summary>

access_key: unknown

minLength1

[Link to this property](#)

region: unknown

minLength1

[Link to this property](#)

<details>

<summary>

auth_method: optional "KEY" or "PASSWORD"

Authentication method used for “sftp” type storage medium

</summary>

One of the following:

"KEY"

[Link to this property](#)

"PASSWORD"

[Link to this property](#)

</details>

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

password: optional string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

private_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

<details>

<summary>

type: optional "aws" or "azure" or "digitalocean"

</summary>

One of the following:

"aws"

[Link to this property](#)

"azure"

[Link to this property](#)

"digitalocean"

[Link to this property](#)

</details>

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { private_key, access_key, auth_method, 9 more }

</summary>

private_key: string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

access_key: optional string

Access key of the storage medium. Access key is not required for the `gcs` storage media type.

Note that this field is not readable by clients, only writeable.

[Link to this property](#)

auth_method: optional "KEY"

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

password: optional string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

region: optional string

Region of the storage medium.

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

<details>

<summary>

type: optional "aws" or "azure" or "digitalocean" or 2 more

Type of storage media.

</summary>

One of the following:

"aws"

[Link to this property](#)

"azure"

[Link to this property](#)

"digitalocean"

[Link to this property](#)

"gcs"

[Link to this property](#)

"sftp"

[Link to this property](#)

</details>

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { password, access_key, auth_method, 9 more }

</summary>

password: string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

access_key: optional string

Access key of the storage medium. Access key is not required for the `gcs` storage media type.

Note that this field is not readable by clients, only writeable.

[Link to this property](#)

auth_method: optional "PASSWORD"

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

private_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

region: optional string

Region of the storage medium.

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

<details>

<summary>

type: optional "aws" or "azure" or "digitalocean" or 2 more

Type of storage media.

</summary>

One of the following:

"aws"

[Link to this property](#)

"azure"

[Link to this property](#)

"digitalocean"

[Link to this property](#)

"gcs"

[Link to this property](#)

"sftp"

[Link to this property](#)

</details>

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

video_config: optional object { codec, export_file, height, 2 more }

</summary>

<details>

<summary>

codec: optional "H264" or "VP8" or "VP9"

Codec using which the recording will be encoded.

</summary>

One of the following:

"H264"

[Link to this property](#)

"VP8"

[Link to this property](#)

"VP9"

[Link to this property](#)

</details>

[Link to this property](#)

export_file: optional boolean

Controls whether to export video file seperately

[Link to this property](#)

height: optional number

Height of the recording video in pixels

maximum1920

minimum1

[Link to this property](#)

<details>

<summary>

watermark: optional object { position, size, url }

Watermark to be added to the recording

</summary>

<details>

<summary>

position: optional "left top" or "right top" or "left bottom" or "right bottom"

Position of the watermark

</summary>

One of the following:

"left top"

[Link to this property](#)

"right top"

[Link to this property](#)

"left bottom"

[Link to this property](#)

"right bottom"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

size: optional object { height, width }

Size of the watermark

</summary>

height: optional number

Height of the watermark in px

minimum1

[Link to this property](#)

width: optional number

Width of the watermark in px

minimum1

[Link to this property](#)

</details>

[Link to this property](#)

url: optional string

URL of the watermark image

formaturi

[Link to this property](#)

</details>

[Link to this property](#)

width: optional number

Width of the recording video in pixels

maximum1920

minimum1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

session_keep_alive_time_in_secs: optional number

Time in seconds, for which a session remains active, after the last participant has left the meeting.

maximum600

minimum60

[Link to this property](#)

<details>

<summary>

status: optional "ACTIVE" or "INACTIVE"

Whether the meeting is `ACTIVE` or `INACTIVE`. Users will not be able to join an `INACTIVE` meeting.

</summary>

One of the following:

"ACTIVE"

[Link to this property](#)

"INACTIVE"

[Link to this property](#)

</details>

[Link to this property](#)

summarize_on_end: optional boolean

Automatically generate summary of meetings using transcripts. Requires Transcriptions to be enabled, and can be retrieved via Webhooks or summary API.

[Link to this property](#)

title: optional string

Title of the meeting.

[Link to this property](#)

transcribe_on_end: optional boolean

Automatically generate transcripts when the meeting ends.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

MeetingGetMeetingByIDResponse object { success, data }

</summary>

success: boolean

Success status of the operation

[Link to this property](#)

<details>

<summary>

data: optional object { id, created_at, updated_at, 10 more }

Data returned by the operation

</summary>

id: string

ID of the meeting.

formatuuid

[Link to this property](#)

created_at: string

Timestamp the object was created at. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

updated_at: string

Timestamp the object was updated at. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

<details>

<summary>

ai_config: optional object { summarization, transcription }

The AI Config allows you to customize the behavior of meeting transcriptions and summaries

</summary>

<details>

<summary>

summarization: optional object { summary_type, text_format, word_limit }

Summary Config

</summary>

<details>

<summary>

summary_type: optional "general" or "team_meeting" or "sales_call" or 6 more

Defines the style of the summary, such as general, team meeting, or sales call.

</summary>

One of the following:

"general"

[Link to this property](#)

"team_meeting"

[Link to this property](#)

"sales_call"

[Link to this property](#)

"client_check_in"

[Link to this property](#)

"interview"

[Link to this property](#)

"daily_standup"

[Link to this property](#)

"one_on_one_meeting"

[Link to this property](#)

"lecture"

[Link to this property](#)

"code_review"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

text_format: optional "plain_text" or "markdown"

Determines the text format of the summary, such as plain text or markdown.

</summary>

One of the following:

"plain_text"

[Link to this property](#)

"markdown"

[Link to this property](#)

</details>

[Link to this property](#)

word_limit: optional number

Sets the maximum number of words in the meeting summary.

maximum1000

minimum150

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

transcription: optional object { keywords, language, profanity_filter }

Transcription Configurations

</summary>

keywords: optional array of string

Adds specific terms to improve accurate detection during transcription.

[Link to this property](#)

<details>

<summary>

language: optional "en-US" or "en-IN" or "de" or 7 more

Specifies the language code for transcription to ensure accurate results.

</summary>

One of the following:

"en-US"

[Link to this property](#)

"en-IN"

[Link to this property](#)

"de"

[Link to this property](#)

"hi"

[Link to this property](#)

"sv"

[Link to this property](#)

"ru"

[Link to this property](#)

"pl"

[Link to this property](#)

"el"

[Link to this property](#)

"fr"

[Link to this property](#)

"nl"

[Link to this property](#)

</details>

[Link to this property](#)

profanity_filter: optional boolean

Control the inclusion of offensive language in transcriptions.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

live_stream_on_start: optional boolean

Specifies if the meeting should start getting livestreamed on start.

[Link to this property](#)

persist_chat: optional boolean

Specifies if Chat within a meeting should persist for a week.

[Link to this property](#)

record_on_start: optional boolean

Specifies if the meeting should start getting recorded as soon as someone joins the meeting.

[Link to this property](#)

<details>

<summary>

recording_config: optional object { audio_config, file_name_prefix, live_streaming_config, 4 more }

Recording Configurations to be used for this meeting. This level of configs takes higher preference over App level configs on the RealtimeKit developer portal.

</summary>

<details>

<summary>

audio_config: optional object { channel, codec, export_file }

Object containing configuration regarding the audio that is being recorded.

</summary>

<details>

<summary>

channel: optional "mono" or "stereo"

Audio signal pathway within an audio file that carries a specific sound source.

</summary>

One of the following:

"mono"

[Link to this property](#)

"stereo"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

codec: optional "MP3" or "AAC"

Codec using which the recording will be encoded. If VP8/VP9 is selected for videoConfig, changing audioConfig is not allowed. In this case, the codec in the audioConfig is automatically set to vorbis.

</summary>

One of the following:

"MP3"

[Link to this property](#)

"AAC"

[Link to this property](#)

</details>

[Link to this property](#)

export_file: optional boolean

Controls whether to export audio file seperately

[Link to this property](#)

</details>

[Link to this property](#)

file_name_prefix: optional string

Adds a prefix to the beginning of the file name of the recording.

[Link to this property](#)

<details>

<summary>

live_streaming_config: optional object { rtmp_url }

</summary>

rtmp_url: optional string

RTMP URL to stream to

formaturi

[Link to this property](#)

</details>

[Link to this property](#)

max_seconds: optional number

Specifies the maximum duration for recording in seconds, ranging from a minimum of 60 seconds to a maximum of 24 hours.

maximum86400

minimum60

[Link to this property](#)

<details>

<summary>

realtimekit_bucket_config: optional object { enabled }

</summary>

enabled: boolean

Controls whether recordings are uploaded to RealtimeKit’s bucket. If set to false, `download_url`, `audio_download_url`, `download_url_expiry` won’t be generated for a recording.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

storage_config: optional object { access_key, auth_method, bucket, 9 more } or object { access_key, region, auth_method, 9 more } or object { private_key, access_key, auth_method, 9 more } or object { password, access_key, auth_method, 9 more }

</summary>

One of the following:

<details>

<summary>

object { access_key, auth_method, bucket, 9 more }

</summary>

access_key: optional string

Access key of the storage medium. Access key is not required for the `gcs` storage media type.

Note that this field is not readable by clients, only writeable.

[Link to this property](#)

<details>

<summary>

auth_method: optional "KEY" or "PASSWORD"

Authentication method used for “sftp” type storage medium

</summary>

One of the following:

"KEY"

[Link to this property](#)

"PASSWORD"

[Link to this property](#)

</details>

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

password: optional string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

private_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

region: optional string

Region of the storage medium.

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

type: optional "gcs"

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { access_key, region, auth_method, 9 more }

</summary>

access_key: unknown

minLength1

[Link to this property](#)

region: unknown

minLength1

[Link to this property](#)

<details>

<summary>

auth_method: optional "KEY" or "PASSWORD"

Authentication method used for “sftp” type storage medium

</summary>

One of the following:

"KEY"

[Link to this property](#)

"PASSWORD"

[Link to this property](#)

</details>

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

password: optional string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

private_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

<details>

<summary>

type: optional "aws" or "azure" or "digitalocean"

</summary>

One of the following:

"aws"

[Link to this property](#)

"azure"

[Link to this property](#)

"digitalocean"

[Link to this property](#)

</details>

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { private_key, access_key, auth_method, 9 more }

</summary>

private_key: string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

access_key: optional string

Access key of the storage medium. Access key is not required for the `gcs` storage media type.

Note that this field is not readable by clients, only writeable.

[Link to this property](#)

auth_method: optional "KEY"

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

password: optional string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

region: optional string

Region of the storage medium.

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

<details>

<summary>

type: optional "aws" or "azure" or "digitalocean" or 2 more

Type of storage media.

</summary>

One of the following:

"aws"

[Link to this property](#)

"azure"

[Link to this property](#)

"digitalocean"

[Link to this property](#)

"gcs"

[Link to this property](#)

"sftp"

[Link to this property](#)

</details>

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { password, access_key, auth_method, 9 more }

</summary>

password: string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

access_key: optional string

Access key of the storage medium. Access key is not required for the `gcs` storage media type.

Note that this field is not readable by clients, only writeable.

[Link to this property](#)

auth_method: optional "PASSWORD"

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

private_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

region: optional string

Region of the storage medium.

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

<details>

<summary>

type: optional "aws" or "azure" or "digitalocean" or 2 more

Type of storage media.

</summary>

One of the following:

"aws"

[Link to this property](#)

"azure"

[Link to this property](#)

"digitalocean"

[Link to this property](#)

"gcs"

[Link to this property](#)

"sftp"

[Link to this property](#)

</details>

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

video_config: optional object { codec, export_file, height, 2 more }

</summary>

<details>

<summary>

codec: optional "H264" or "VP8" or "VP9"

Codec using which the recording will be encoded.

</summary>

One of the following:

"H264"

[Link to this property](#)

"VP8"

[Link to this property](#)

"VP9"

[Link to this property](#)

</details>

[Link to this property](#)

export_file: optional boolean

Controls whether to export video file seperately

[Link to this property](#)

height: optional number

Height of the recording video in pixels

maximum1920

minimum1

[Link to this property](#)

<details>

<summary>

watermark: optional object { position, size, url }

Watermark to be added to the recording

</summary>

<details>

<summary>

position: optional "left top" or "right top" or "left bottom" or "right bottom"

Position of the watermark

</summary>

One of the following:

"left top"

[Link to this property](#)

"right top"

[Link to this property](#)

"left bottom"

[Link to this property](#)

"right bottom"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

size: optional object { height, width }

Size of the watermark

</summary>

height: optional number

Height of the watermark in px

minimum1

[Link to this property](#)

width: optional number

Width of the watermark in px

minimum1

[Link to this property](#)

</details>

[Link to this property](#)

url: optional string

URL of the watermark image

formaturi

[Link to this property](#)

</details>

[Link to this property](#)

width: optional number

Width of the recording video in pixels

maximum1920

minimum1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

session_keep_alive_time_in_secs: optional number

Time in seconds, for which a session remains active, after the last participant has left the meeting.

maximum600

minimum60

[Link to this property](#)

<details>

<summary>

status: optional "ACTIVE" or "INACTIVE"

Whether the meeting is `ACTIVE` or `INACTIVE`. Users will not be able to join an `INACTIVE` meeting.

</summary>

One of the following:

"ACTIVE"

[Link to this property](#)

"INACTIVE"

[Link to this property](#)

</details>

[Link to this property](#)

summarize_on_end: optional boolean

Automatically generate summary of meetings using transcripts. Requires Transcriptions to be enabled, and can be retrieved via Webhooks or summary API.

[Link to this property](#)

title: optional string

Title of the meeting.

[Link to this property](#)

transcribe_on_end: optional boolean

Automatically generate transcripts when the meeting ends.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

MeetingUpdateMeetingByIDResponse object { success, data }

</summary>

success: boolean

Success status of the operation

[Link to this property](#)

<details>

<summary>

data: optional object { id, created_at, updated_at, 10 more }

Data returned by the operation

</summary>

id: string

ID of the meeting.

formatuuid

[Link to this property](#)

created_at: string

Timestamp the object was created at. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

updated_at: string

Timestamp the object was updated at. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

<details>

<summary>

ai_config: optional object { summarization, transcription }

The AI Config allows you to customize the behavior of meeting transcriptions and summaries

</summary>

<details>

<summary>

summarization: optional object { summary_type, text_format, word_limit }

Summary Config

</summary>

<details>

<summary>

summary_type: optional "general" or "team_meeting" or "sales_call" or 6 more

Defines the style of the summary, such as general, team meeting, or sales call.

</summary>

One of the following:

"general"

[Link to this property](#)

"team_meeting"

[Link to this property](#)

"sales_call"

[Link to this property](#)

"client_check_in"

[Link to this property](#)

"interview"

[Link to this property](#)

"daily_standup"

[Link to this property](#)

"one_on_one_meeting"

[Link to this property](#)

"lecture"

[Link to this property](#)

"code_review"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

text_format: optional "plain_text" or "markdown"

Determines the text format of the summary, such as plain text or markdown.

</summary>

One of the following:

"plain_text"

[Link to this property](#)

"markdown"

[Link to this property](#)

</details>

[Link to this property](#)

word_limit: optional number

Sets the maximum number of words in the meeting summary.

maximum1000

minimum150

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

transcription: optional object { keywords, language, profanity_filter }

Transcription Configurations

</summary>

keywords: optional array of string

Adds specific terms to improve accurate detection during transcription.

[Link to this property](#)

<details>

<summary>

language: optional "en-US" or "en-IN" or "de" or 7 more

Specifies the language code for transcription to ensure accurate results.

</summary>

One of the following:

"en-US"

[Link to this property](#)

"en-IN"

[Link to this property](#)

"de"

[Link to this property](#)

"hi"

[Link to this property](#)

"sv"

[Link to this property](#)

"ru"

[Link to this property](#)

"pl"

[Link to this property](#)

"el"

[Link to this property](#)

"fr"

[Link to this property](#)

"nl"

[Link to this property](#)

</details>

[Link to this property](#)

profanity_filter: optional boolean

Control the inclusion of offensive language in transcriptions.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

live_stream_on_start: optional boolean

Specifies if the meeting should start getting livestreamed on start.

[Link to this property](#)

persist_chat: optional boolean

Specifies if Chat within a meeting should persist for a week.

[Link to this property](#)

record_on_start: optional boolean

Specifies if the meeting should start getting recorded as soon as someone joins the meeting.

[Link to this property](#)

<details>

<summary>

recording_config: optional object { audio_config, file_name_prefix, live_streaming_config, 4 more }

Recording Configurations to be used for this meeting. This level of configs takes higher preference over App level configs on the RealtimeKit developer portal.

</summary>

<details>

<summary>

audio_config: optional object { channel, codec, export_file }

Object containing configuration regarding the audio that is being recorded.

</summary>

<details>

<summary>

channel: optional "mono" or "stereo"

Audio signal pathway within an audio file that carries a specific sound source.

</summary>

One of the following:

"mono"

[Link to this property](#)

"stereo"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

codec: optional "MP3" or "AAC"

Codec using which the recording will be encoded. If VP8/VP9 is selected for videoConfig, changing audioConfig is not allowed. In this case, the codec in the audioConfig is automatically set to vorbis.

</summary>

One of the following:

"MP3"

[Link to this property](#)

"AAC"

[Link to this property](#)

</details>

[Link to this property](#)

export_file: optional boolean

Controls whether to export audio file seperately

[Link to this property](#)

</details>

[Link to this property](#)

file_name_prefix: optional string

Adds a prefix to the beginning of the file name of the recording.

[Link to this property](#)

<details>

<summary>

live_streaming_config: optional object { rtmp_url }

</summary>

rtmp_url: optional string

RTMP URL to stream to

formaturi

[Link to this property](#)

</details>

[Link to this property](#)

max_seconds: optional number

Specifies the maximum duration for recording in seconds, ranging from a minimum of 60 seconds to a maximum of 24 hours.

maximum86400

minimum60

[Link to this property](#)

<details>

<summary>

realtimekit_bucket_config: optional object { enabled }

</summary>

enabled: boolean

Controls whether recordings are uploaded to RealtimeKit’s bucket. If set to false, `download_url`, `audio_download_url`, `download_url_expiry` won’t be generated for a recording.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

storage_config: optional object { access_key, auth_method, bucket, 9 more } or object { access_key, region, auth_method, 9 more } or object { private_key, access_key, auth_method, 9 more } or object { password, access_key, auth_method, 9 more }

</summary>

One of the following:

<details>

<summary>

object { access_key, auth_method, bucket, 9 more }

</summary>

access_key: optional string

Access key of the storage medium. Access key is not required for the `gcs` storage media type.

Note that this field is not readable by clients, only writeable.

[Link to this property](#)

<details>

<summary>

auth_method: optional "KEY" or "PASSWORD"

Authentication method used for “sftp” type storage medium

</summary>

One of the following:

"KEY"

[Link to this property](#)

"PASSWORD"

[Link to this property](#)

</details>

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

password: optional string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

private_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

region: optional string

Region of the storage medium.

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

type: optional "gcs"

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { access_key, region, auth_method, 9 more }

</summary>

access_key: unknown

minLength1

[Link to this property](#)

region: unknown

minLength1

[Link to this property](#)

<details>

<summary>

auth_method: optional "KEY" or "PASSWORD"

Authentication method used for “sftp” type storage medium

</summary>

One of the following:

"KEY"

[Link to this property](#)

"PASSWORD"

[Link to this property](#)

</details>

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

password: optional string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

private_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

<details>

<summary>

type: optional "aws" or "azure" or "digitalocean"

</summary>

One of the following:

"aws"

[Link to this property](#)

"azure"

[Link to this property](#)

"digitalocean"

[Link to this property](#)

</details>

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { private_key, access_key, auth_method, 9 more }

</summary>

private_key: string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

access_key: optional string

Access key of the storage medium. Access key is not required for the `gcs` storage media type.

Note that this field is not readable by clients, only writeable.

[Link to this property](#)

auth_method: optional "KEY"

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

password: optional string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

region: optional string

Region of the storage medium.

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

<details>

<summary>

type: optional "aws" or "azure" or "digitalocean" or 2 more

Type of storage media.

</summary>

One of the following:

"aws"

[Link to this property](#)

"azure"

[Link to this property](#)

"digitalocean"

[Link to this property](#)

"gcs"

[Link to this property](#)

"sftp"

[Link to this property](#)

</details>

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { password, access_key, auth_method, 9 more }

</summary>

password: string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

access_key: optional string

Access key of the storage medium. Access key is not required for the `gcs` storage media type.

Note that this field is not readable by clients, only writeable.

[Link to this property](#)

auth_method: optional "PASSWORD"

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

private_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

region: optional string

Region of the storage medium.

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

<details>

<summary>

type: optional "aws" or "azure" or "digitalocean" or 2 more

Type of storage media.

</summary>

One of the following:

"aws"

[Link to this property](#)

"azure"

[Link to this property](#)

"digitalocean"

[Link to this property](#)

"gcs"

[Link to this property](#)

"sftp"

[Link to this property](#)

</details>

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

video_config: optional object { codec, export_file, height, 2 more }

</summary>

<details>

<summary>

codec: optional "H264" or "VP8" or "VP9"

Codec using which the recording will be encoded.

</summary>

One of the following:

"H264"

[Link to this property](#)

"VP8"

[Link to this property](#)

"VP9"

[Link to this property](#)

</details>

[Link to this property](#)

export_file: optional boolean

Controls whether to export video file seperately

[Link to this property](#)

height: optional number

Height of the recording video in pixels

maximum1920

minimum1

[Link to this property](#)

<details>

<summary>

watermark: optional object { position, size, url }

Watermark to be added to the recording

</summary>

<details>

<summary>

position: optional "left top" or "right top" or "left bottom" or "right bottom"

Position of the watermark

</summary>

One of the following:

"left top"

[Link to this property](#)

"right top"

[Link to this property](#)

"left bottom"

[Link to this property](#)

"right bottom"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

size: optional object { height, width }

Size of the watermark

</summary>

height: optional number

Height of the watermark in px

minimum1

[Link to this property](#)

width: optional number

Width of the watermark in px

minimum1

[Link to this property](#)

</details>

[Link to this property](#)

url: optional string

URL of the watermark image

formaturi

[Link to this property](#)

</details>

[Link to this property](#)

width: optional number

Width of the recording video in pixels

maximum1920

minimum1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

session_keep_alive_time_in_secs: optional number

Time in seconds, for which a session remains active, after the last participant has left the meeting.

maximum600

minimum60

[Link to this property](#)

<details>

<summary>

status: optional "ACTIVE" or "INACTIVE"

Whether the meeting is `ACTIVE` or `INACTIVE`. Users will not be able to join an `INACTIVE` meeting.

</summary>

One of the following:

"ACTIVE"

[Link to this property](#)

"INACTIVE"

[Link to this property](#)

</details>

[Link to this property](#)

summarize_on_end: optional boolean

Automatically generate summary of meetings using transcripts. Requires Transcriptions to be enabled, and can be retrieved via Webhooks or summary API.

[Link to this property](#)

title: optional string

Title of the meeting.

[Link to this property](#)

transcribe_on_end: optional boolean

Automatically generate transcripts when the meeting ends.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

MeetingReplaceMeetingByIDResponse object { success, data }

</summary>

success: boolean

Success status of the operation

[Link to this property](#)

<details>

<summary>

data: optional object { id, created_at, updated_at, 10 more }

Data returned by the operation

</summary>

id: string

ID of the meeting.

formatuuid

[Link to this property](#)

created_at: string

Timestamp the object was created at. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

updated_at: string

Timestamp the object was updated at. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

<details>

<summary>

ai_config: optional object { summarization, transcription }

The AI Config allows you to customize the behavior of meeting transcriptions and summaries

</summary>

<details>

<summary>

summarization: optional object { summary_type, text_format, word_limit }

Summary Config

</summary>

<details>

<summary>

summary_type: optional "general" or "team_meeting" or "sales_call" or 6 more

Defines the style of the summary, such as general, team meeting, or sales call.

</summary>

One of the following:

"general"

[Link to this property](#)

"team_meeting"

[Link to this property](#)

"sales_call"

[Link to this property](#)

"client_check_in"

[Link to this property](#)

"interview"

[Link to this property](#)

"daily_standup"

[Link to this property](#)

"one_on_one_meeting"

[Link to this property](#)

"lecture"

[Link to this property](#)

"code_review"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

text_format: optional "plain_text" or "markdown"

Determines the text format of the summary, such as plain text or markdown.

</summary>

One of the following:

"plain_text"

[Link to this property](#)

"markdown"

[Link to this property](#)

</details>

[Link to this property](#)

word_limit: optional number

Sets the maximum number of words in the meeting summary.

maximum1000

minimum150

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

transcription: optional object { keywords, language, profanity_filter }

Transcription Configurations

</summary>

keywords: optional array of string

Adds specific terms to improve accurate detection during transcription.

[Link to this property](#)

<details>

<summary>

language: optional "en-US" or "en-IN" or "de" or 7 more

Specifies the language code for transcription to ensure accurate results.

</summary>

One of the following:

"en-US"

[Link to this property](#)

"en-IN"

[Link to this property](#)

"de"

[Link to this property](#)

"hi"

[Link to this property](#)

"sv"

[Link to this property](#)

"ru"

[Link to this property](#)

"pl"

[Link to this property](#)

"el"

[Link to this property](#)

"fr"

[Link to this property](#)

"nl"

[Link to this property](#)

</details>

[Link to this property](#)

profanity_filter: optional boolean

Control the inclusion of offensive language in transcriptions.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

live_stream_on_start: optional boolean

Specifies if the meeting should start getting livestreamed on start.

[Link to this property](#)

persist_chat: optional boolean

Specifies if Chat within a meeting should persist for a week.

[Link to this property](#)

record_on_start: optional boolean

Specifies if the meeting should start getting recorded as soon as someone joins the meeting.

[Link to this property](#)

<details>

<summary>

recording_config: optional object { audio_config, file_name_prefix, live_streaming_config, 4 more }

Recording Configurations to be used for this meeting. This level of configs takes higher preference over App level configs on the RealtimeKit developer portal.

</summary>

<details>

<summary>

audio_config: optional object { channel, codec, export_file }

Object containing configuration regarding the audio that is being recorded.

</summary>

<details>

<summary>

channel: optional "mono" or "stereo"

Audio signal pathway within an audio file that carries a specific sound source.

</summary>

One of the following:

"mono"

[Link to this property](#)

"stereo"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

codec: optional "MP3" or "AAC"

Codec using which the recording will be encoded. If VP8/VP9 is selected for videoConfig, changing audioConfig is not allowed. In this case, the codec in the audioConfig is automatically set to vorbis.

</summary>

One of the following:

"MP3"

[Link to this property](#)

"AAC"

[Link to this property](#)

</details>

[Link to this property](#)

export_file: optional boolean

Controls whether to export audio file seperately

[Link to this property](#)

</details>

[Link to this property](#)

file_name_prefix: optional string

Adds a prefix to the beginning of the file name of the recording.

[Link to this property](#)

<details>

<summary>

live_streaming_config: optional object { rtmp_url }

</summary>

rtmp_url: optional string

RTMP URL to stream to

formaturi

[Link to this property](#)

</details>

[Link to this property](#)

max_seconds: optional number

Specifies the maximum duration for recording in seconds, ranging from a minimum of 60 seconds to a maximum of 24 hours.

maximum86400

minimum60

[Link to this property](#)

<details>

<summary>

realtimekit_bucket_config: optional object { enabled }

</summary>

enabled: boolean

Controls whether recordings are uploaded to RealtimeKit’s bucket. If set to false, `download_url`, `audio_download_url`, `download_url_expiry` won’t be generated for a recording.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

storage_config: optional object { access_key, auth_method, bucket, 9 more } or object { access_key, region, auth_method, 9 more } or object { private_key, access_key, auth_method, 9 more } or object { password, access_key, auth_method, 9 more }

</summary>

One of the following:

<details>

<summary>

object { access_key, auth_method, bucket, 9 more }

</summary>

access_key: optional string

Access key of the storage medium. Access key is not required for the `gcs` storage media type.

Note that this field is not readable by clients, only writeable.

[Link to this property](#)

<details>

<summary>

auth_method: optional "KEY" or "PASSWORD"

Authentication method used for “sftp” type storage medium

</summary>

One of the following:

"KEY"

[Link to this property](#)

"PASSWORD"

[Link to this property](#)

</details>

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

password: optional string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

private_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

region: optional string

Region of the storage medium.

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

type: optional "gcs"

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { access_key, region, auth_method, 9 more }

</summary>

access_key: unknown

minLength1

[Link to this property](#)

region: unknown

minLength1

[Link to this property](#)

<details>

<summary>

auth_method: optional "KEY" or "PASSWORD"

Authentication method used for “sftp” type storage medium

</summary>

One of the following:

"KEY"

[Link to this property](#)

"PASSWORD"

[Link to this property](#)

</details>

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

password: optional string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

private_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

<details>

<summary>

type: optional "aws" or "azure" or "digitalocean"

</summary>

One of the following:

"aws"

[Link to this property](#)

"azure"

[Link to this property](#)

"digitalocean"

[Link to this property](#)

</details>

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { private_key, access_key, auth_method, 9 more }

</summary>

private_key: string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

access_key: optional string

Access key of the storage medium. Access key is not required for the `gcs` storage media type.

Note that this field is not readable by clients, only writeable.

[Link to this property](#)

auth_method: optional "KEY"

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

password: optional string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

region: optional string

Region of the storage medium.

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

<details>

<summary>

type: optional "aws" or "azure" or "digitalocean" or 2 more

Type of storage media.

</summary>

One of the following:

"aws"

[Link to this property](#)

"azure"

[Link to this property](#)

"digitalocean"

[Link to this property](#)

"gcs"

[Link to this property](#)

"sftp"

[Link to this property](#)

</details>

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { password, access_key, auth_method, 9 more }

</summary>

password: string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

access_key: optional string

Access key of the storage medium. Access key is not required for the `gcs` storage media type.

Note that this field is not readable by clients, only writeable.

[Link to this property](#)

auth_method: optional "PASSWORD"

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

private_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

region: optional string

Region of the storage medium.

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

<details>

<summary>

type: optional "aws" or "azure" or "digitalocean" or 2 more

Type of storage media.

</summary>

One of the following:

"aws"

[Link to this property](#)

"azure"

[Link to this property](#)

"digitalocean"

[Link to this property](#)

"gcs"

[Link to this property](#)

"sftp"

[Link to this property](#)

</details>

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

video_config: optional object { codec, export_file, height, 2 more }

</summary>

<details>

<summary>

codec: optional "H264" or "VP8" or "VP9"

Codec using which the recording will be encoded.

</summary>

One of the following:

"H264"

[Link to this property](#)

"VP8"

[Link to this property](#)

"VP9"

[Link to this property](#)

</details>

[Link to this property](#)

export_file: optional boolean

Controls whether to export video file seperately

[Link to this property](#)

height: optional number

Height of the recording video in pixels

maximum1920

minimum1

[Link to this property](#)

<details>

<summary>

watermark: optional object { position, size, url }

Watermark to be added to the recording

</summary>

<details>

<summary>

position: optional "left top" or "right top" or "left bottom" or "right bottom"

Position of the watermark

</summary>

One of the following:

"left top"

[Link to this property](#)

"right top"

[Link to this property](#)

"left bottom"

[Link to this property](#)

"right bottom"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

size: optional object { height, width }

Size of the watermark

</summary>

height: optional number

Height of the watermark in px

minimum1

[Link to this property](#)

width: optional number

Width of the watermark in px

minimum1

[Link to this property](#)

</details>

[Link to this property](#)

url: optional string

URL of the watermark image

formaturi

[Link to this property](#)

</details>

[Link to this property](#)

width: optional number

Width of the recording video in pixels

maximum1920

minimum1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

session_keep_alive_time_in_secs: optional number

Time in seconds, for which a session remains active, after the last participant has left the meeting.

maximum600

minimum60

[Link to this property](#)

<details>

<summary>

status: optional "ACTIVE" or "INACTIVE"

Whether the meeting is `ACTIVE` or `INACTIVE`. Users will not be able to join an `INACTIVE` meeting.

</summary>

One of the following:

"ACTIVE"

[Link to this property](#)

"INACTIVE"

[Link to this property](#)

</details>

[Link to this property](#)

summarize_on_end: optional boolean

Automatically generate summary of meetings using transcripts. Requires Transcriptions to be enabled, and can be retrieved via Webhooks or summary API.

[Link to this property](#)

title: optional string

Title of the meeting.

[Link to this property](#)

transcribe_on_end: optional boolean

Automatically generate transcripts when the meeting ends.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

MeetingGetMeetingParticipantsResponse object { data, paging, success }

</summary>

<details>

<summary>

data: array of object { id, created_at, custom_participant_id, 4 more }

</summary>

id: string

ID of the participant.

formatuuid

[Link to this property](#)

created_at: string

When this object was created. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

custom_participant_id: string

A unique participant ID generated by the client.

[Link to this property](#)

preset_name: string

Preset applied to the participant.

[Link to this property](#)

updated_at: string

When this object was updated. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

name: optional string

Name of the participant.

[Link to this property](#)

picture: optional string

URL to a picture of the participant.

formaturi

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

paging: object { end_offset, start_offset, total_count }

</summary>

end_offset: number

[Link to this property](#)

start_offset: number

[Link to this property](#)

total_count: number

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

success: boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

MeetingAddParticipantResponse object { success, data }

</summary>

success: boolean

Success status of the operation

[Link to this property](#)

<details>

<summary>

data: optional object { id, token, created_at, 5 more }

Represents a participant.

</summary>

id: string

ID of the participant.

formatuuid

[Link to this property](#)

token: string

The participant’s auth token that can be used for joining a meeting from the client side.

[Link to this property](#)

created_at: string

When this object was created. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

custom_participant_id: string

A unique participant ID generated by the client.

[Link to this property](#)

preset_name: string

Preset applied to the participant.

[Link to this property](#)

updated_at: string

When this object was updated. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

name: optional string

Name of the participant.

[Link to this property](#)

picture: optional string

URL to a picture of the participant.

formaturi

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

MeetingGetMeetingParticipantResponse object { data, success }

</summary>

<details>

<summary>

data: object { id, created_at, custom_participant_id, 4 more }

Data returned by the operation

</summary>

id: string

ID of the participant.

formatuuid

[Link to this property](#)

created_at: string

When this object was created. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

custom_participant_id: string

A unique participant ID generated by the client.

[Link to this property](#)

preset_name: string

Preset applied to the participant.

[Link to this property](#)

updated_at: string

When this object was updated. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

name: optional string

Name of the participant.

[Link to this property](#)

picture: optional string

URL to a picture of the participant.

formaturi

[Link to this property](#)

</details>

[Link to this property](#)

success: boolean

Success status of the operation

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

MeetingEditParticipantResponse object { success, data }

</summary>

success: boolean

Success status of the operation

[Link to this property](#)

<details>

<summary>

data: optional object { id, token, created_at, 5 more }

Represents a participant.

</summary>

id: string

ID of the participant.

formatuuid

[Link to this property](#)

token: string

The participant’s auth token that can be used for joining a meeting from the client side.

[Link to this property](#)

created_at: string

When this object was created. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

custom_participant_id: string

A unique participant ID generated by the client.

[Link to this property](#)

preset_name: string

Preset applied to the participant.

[Link to this property](#)

updated_at: string

When this object was updated. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

name: optional string

Name of the participant.

[Link to this property](#)

picture: optional string

URL to a picture of the participant.

formaturi

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

MeetingDeleteMeetingParticipantResponse object { success, data }

</summary>

success: boolean

Success status of the operation

[Link to this property](#)

<details>

<summary>

data: optional object { created_at, custom_participant_id, preset_id, updated_at }

Data returned by the operation

</summary>

created_at: string

Timestamp this object was created at. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

custom_participant_id: string

A unique participant ID generated by the client.

[Link to this property](#)

preset_id: string

ID of the preset applied to this participant.

formatuuid

[Link to this property](#)

updated_at: string

Timestamp this object was updated at. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

MeetingRefreshParticipantTokenResponse object { data, success }

</summary>

<details>

<summary>

data: object { token }

Data returned by the operation

</summary>

token: string

Regenerated participant’s authentication token.

[Link to this property](#)

</details>

[Link to this property](#)

success: boolean

Success status of the operation

[Link to this property](#)

</details>

[Link to this property](#)

##### [Fetch all presets](/api/resources/realtime_kit/subresources/presets/methods/get)

GET/accounts/{account_id}/realtime/kit/{app_id}/presets

##### [Create a preset](/api/resources/realtime_kit/subresources/presets/methods/create)

POST/accounts/{account_id}/realtime/kit/{app_id}/presets

##### [Fetch details of a preset](/api/resources/realtime_kit/subresources/presets/methods/get_preset_by_id)

GET/accounts/{account_id}/realtime/kit/{app_id}/presets/{preset_id}

##### [Delete a preset](/api/resources/realtime_kit/subresources/presets/methods/delete)

DELETE/accounts/{account_id}/realtime/kit/{app_id}/presets/{preset_id}

##### [Update a preset](/api/resources/realtime_kit/subresources/presets/methods/update)

PATCH/accounts/{account_id}/realtime/kit/{app_id}/presets/{preset_id}

##### [Replace a preset](/api/resources/realtime_kit/subresources/presets/methods/replace_preset_by_id)

PUT/accounts/{account_id}/realtime/kit/{app_id}/presets/{preset_id}

##### Models

<details>

<summary>

PresetGetResponse object { data, paging, success }

</summary>

<details>

<summary>

data: array of object { id, created_at, name, updated_at }

</summary>

id: optional string

ID of the preset

formatuuid

[Link to this property](#)

created_at: optional string

Timestamp this preset was created at

formatdate-time

[Link to this property](#)

name: optional string

Name of the preset

[Link to this property](#)

updated_at: optional string

Timestamp this preset was last updated

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

paging: object { end_offset, start_offset, total_count }

</summary>

end_offset: number

[Link to this property](#)

start_offset: number

[Link to this property](#)

total_count: number

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

success: boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PresetCreateResponse object { data, success }

</summary>

<details>

<summary>

data: object { id, config, created_at, 4 more }

Data returned by the operation

</summary>

id: string

ID of the preset

formatuuid

[Link to this property](#)

<details>

<summary>

config: object { max_screenshare_count, max_video_streams, media, 2 more }

</summary>

max_screenshare_count: number

Maximum number of screen shares that can be active at a given time

[Link to this property](#)

<details>

<summary>

max_video_streams: object { desktop, mobile }

Maximum number of streams that are visible on a device

</summary>

desktop: number

Maximum number of video streams visible on desktop devices

[Link to this property](#)

mobile: number

Maximum number of streams visible on mobile devices

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

media: object { screenshare, video, audio }

Media configuration options. eg: Video quality

</summary>

<details>

<summary>

screenshare: object { frame_rate, quality }

Configuration options for participant screen shares

</summary>

frame_rate: number

Frame rate of screen share

[Link to this property](#)

<details>

<summary>

quality: "hd" or "vga" or "qvga" or 2 more

Quality of screen share

</summary>

One of the following:

"hd"

[Link to this property](#)

"vga"

[Link to this property](#)

"qvga"

[Link to this property](#)

"fhd"

[Link to this property](#)

"uhd"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

video: object { frame_rate, quality, simulcast }

Configuration options for participant videos

</summary>

frame_rate: number

Frame rate of participants’ video

maximum30

[Link to this property](#)

<details>

<summary>

quality: "hd" or "vga" or "qvga" or 2 more

Video quality of participants

</summary>

One of the following:

"hd"

[Link to this property](#)

"vga"

[Link to this property](#)

"qvga"

[Link to this property](#)

"fhd"

[Link to this property](#)

"uhd"

[Link to this property](#)

</details>

[Link to this property](#)

simulcast: optional boolean

Enable simulcast for participant videos.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

audio: optional object { enable_high_bitrate, enable_stereo }

Control options for Audio quality.

</summary>

enable_high_bitrate: optional boolean

Enable High Quality Audio for your meetings

[Link to this property](#)

enable_stereo: optional boolean

Enable Stereo for your meetings

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

view_type: "GROUP_CALL" or "WEBINAR" or "AUDIO_ROOM" or "LIVESTREAM"

Type of the meeting

</summary>

One of the following:

"GROUP_CALL"

[Link to this property](#)

"WEBINAR"

[Link to this property](#)

"AUDIO_ROOM"

[Link to this property](#)

"LIVESTREAM"

[Link to this property](#)

</details>

[Link to this property](#)

livestream_viewer_qualities: optional array of number

Livestream viewer quality levels.

[Link to this property](#)

</details>

[Link to this property](#)

created_at: string

Timestamp this preset was created at

formatdate-time

[Link to this property](#)

name: string

Name of the preset

[Link to this property](#)

<details>

<summary>

permissions: object { accept_waiting_requests, can_accept_production_requests, can_change_participant_permissions, 23 more }

</summary>

accept_waiting_requests: boolean

Whether this participant can accept waiting requests

[Link to this property](#)

can_accept_production_requests: boolean

[Link to this property](#)

can_change_participant_permissions: boolean

[Link to this property](#)

can_edit_display_name: boolean

[Link to this property](#)

can_livestream: boolean

[Link to this property](#)

can_record: boolean

[Link to this property](#)

can_spotlight: boolean

[Link to this property](#)

<details>

<summary>

chat: object { private, public }

</summary>

<details>

<summary>

private: object { can_receive, can_send, files, text }

</summary>

can_receive: boolean

[Link to this property](#)

can_send: boolean

[Link to this property](#)

files: boolean

[Link to this property](#)

text: boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

public: object { can_send, files, text }

</summary>

can_send: boolean

Can send messages in general

[Link to this property](#)

files: boolean

Can send file messages

[Link to this property](#)

text: boolean

Can send text messages

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

connected_meetings: object { can_alter_connected_meetings, can_switch_connected_meetings, can_switch_to_parent_meeting }

</summary>

can_alter_connected_meetings: boolean

[Link to this property](#)

can_switch_connected_meetings: boolean

[Link to this property](#)

can_switch_to_parent_meeting: boolean

[Link to this property](#)

</details>

[Link to this property](#)

disable_participant_audio: boolean

[Link to this property](#)

disable_participant_screensharing: boolean

[Link to this property](#)

disable_participant_video: boolean

[Link to this property](#)

hidden_participant: boolean

Whether this participant is visible to others or not

[Link to this property](#)

kick_participant: boolean

[Link to this property](#)

<details>

<summary>

media: object { audio, screenshare, video }

Media permissions

</summary>

<details>

<summary>

audio: object { can_produce }

Audio permissions

</summary>

<details>

<summary>

can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"

Can produce audio

</summary>

One of the following:

"ALLOWED"

[Link to this property](#)

"NOT_ALLOWED"

[Link to this property](#)

"CAN_REQUEST"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

screenshare: object { can_produce }

Screenshare permissions

</summary>

<details>

<summary>

can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"

Can produce screen share video

</summary>

One of the following:

"ALLOWED"

[Link to this property](#)

"NOT_ALLOWED"

[Link to this property](#)

"CAN_REQUEST"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

video: object { can_produce }

Video permissions

</summary>

<details>

<summary>

can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"

Can produce video

</summary>

One of the following:

"ALLOWED"

[Link to this property](#)

"NOT_ALLOWED"

[Link to this property](#)

"CAN_REQUEST"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

pin_participant: boolean

[Link to this property](#)

<details>

<summary>

plugins: object { can_close, can_edit_config, can_start, config }

Plugin permissions

</summary>

can_close: boolean

Can close plugins that are already open

[Link to this property](#)

can_edit_config: boolean

Can edit plugin config

[Link to this property](#)

can_start: boolean

Can start plugins

[Link to this property](#)

<details>

<summary>

config: map[object { access_control, handles_view_only } ]

Plugin configuration keyed by plugin UUID.

</summary>

<details>

<summary>

access_control: optional "FULL_ACCESS" or "VIEW_ONLY"

</summary>

One of the following:

"FULL_ACCESS"

[Link to this property](#)

"VIEW_ONLY"

[Link to this property](#)

</details>

[Link to this property](#)

handles_view_only: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

polls: object { can_create, can_view, can_vote }

Poll permissions

</summary>

can_create: boolean

Can create polls

[Link to this property](#)

can_view: boolean

Can view polls

[Link to this property](#)

can_vote: boolean

Can vote on polls

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

recorder_type: "RECORDER" or "LIVESTREAMER" or "NONE"

Type of the recording peer

</summary>

One of the following:

"RECORDER"

[Link to this property](#)

"LIVESTREAMER"

[Link to this property](#)

"NONE"

[Link to this property](#)

</details>

[Link to this property](#)

show_participant_list: boolean

[Link to this property](#)

<details>

<summary>

waiting_room_type: "SKIP" or "ON_PRIVILEGED_USER_ENTRY" or "SKIP_ON_ACCEPT"

Waiting room type

</summary>

One of the following:

"SKIP"

[Link to this property](#)

"ON_PRIVILEGED_USER_ENTRY"

[Link to this property](#)

"SKIP_ON_ACCEPT"

[Link to this property](#)

</details>

[Link to this property](#)

accept_stage_requests: optional boolean

[Link to this property](#)

is_recorder: optional boolean

[Link to this property](#)

<details>

<summary>

stage_access: optional "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"

</summary>

One of the following:

"ALLOWED"

[Link to this property](#)

"NOT_ALLOWED"

[Link to this property](#)

"CAN_REQUEST"

[Link to this property](#)

</details>

[Link to this property](#)

stage_enabled: optional boolean

[Link to this property](#)

transcription_enabled: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ui: object { design_tokens }

</summary>

<details>

<summary>

design_tokens: object { border_radius, border_width, colors, 5 more }

</summary>

<details>

<summary>

border_radius: "sharp" or "rounded" or "extra-rounded" or "circular"

</summary>

One of the following:

"sharp"

[Link to this property](#)

"rounded"

[Link to this property](#)

"extra-rounded"

[Link to this property](#)

"circular"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

border_width: "none" or "thin" or "fat"

</summary>

One of the following:

"none"

[Link to this property](#)

"thin"

[Link to this property](#)

"fat"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

colors: object { background, brand, danger, 5 more }

</summary>

<details>

<summary>

background: object { "1000", "600", "700", 2 more }

</summary>

"1000": string

[Link to this property](#)

"600": string

[Link to this property](#)

"700": string

[Link to this property](#)

"800": string

[Link to this property](#)

"900": string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

brand: object { "300", "400", "500", 2 more }

</summary>

"300": string

[Link to this property](#)

"400": string

[Link to this property](#)

"500": string

[Link to this property](#)

"600": string

[Link to this property](#)

"700": string

[Link to this property](#)

</details>

[Link to this property](#)

danger: string

[Link to this property](#)

success: string

[Link to this property](#)

text: string

[Link to this property](#)

text_on_brand: string

[Link to this property](#)

video_bg: string

[Link to this property](#)

warning: string

[Link to this property](#)

</details>

[Link to this property](#)

spacing_base: number

minimum1

[Link to this property](#)

<details>

<summary>

theme: "darkest" or "dark" or "light"

</summary>

One of the following:

"darkest"

[Link to this property](#)

"dark"

[Link to this property](#)

"light"

[Link to this property](#)

</details>

[Link to this property](#)

font_family: optional string

[Link to this property](#)

google_font: optional string

[Link to this property](#)

logo: optional string

formaturi

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

updated_at: string

Timestamp this preset was last updated

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

success: boolean

Success status of the operation

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PresetGetPresetByIDResponse object { data, success }

</summary>

<details>

<summary>

data: object { id, config, created_at, 4 more }

Data returned by the operation

</summary>

id: string

ID of the preset

formatuuid

[Link to this property](#)

<details>

<summary>

config: object { max_screenshare_count, max_video_streams, media, 2 more }

</summary>

max_screenshare_count: number

Maximum number of screen shares that can be active at a given time

[Link to this property](#)

<details>

<summary>

max_video_streams: object { desktop, mobile }

Maximum number of streams that are visible on a device

</summary>

desktop: number

Maximum number of video streams visible on desktop devices

[Link to this property](#)

mobile: number

Maximum number of streams visible on mobile devices

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

media: object { screenshare, video, audio }

Media configuration options. eg: Video quality

</summary>

<details>

<summary>

screenshare: object { frame_rate, quality }

Configuration options for participant screen shares

</summary>

frame_rate: number

Frame rate of screen share

[Link to this property](#)

<details>

<summary>

quality: "hd" or "vga" or "qvga" or 2 more

Quality of screen share

</summary>

One of the following:

"hd"

[Link to this property](#)

"vga"

[Link to this property](#)

"qvga"

[Link to this property](#)

"fhd"

[Link to this property](#)

"uhd"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

video: object { frame_rate, quality, simulcast }

Configuration options for participant videos

</summary>

frame_rate: number

Frame rate of participants’ video

maximum30

[Link to this property](#)

<details>

<summary>

quality: "hd" or "vga" or "qvga" or 2 more

Video quality of participants

</summary>

One of the following:

"hd"

[Link to this property](#)

"vga"

[Link to this property](#)

"qvga"

[Link to this property](#)

"fhd"

[Link to this property](#)

"uhd"

[Link to this property](#)

</details>

[Link to this property](#)

simulcast: optional boolean

Enable simulcast for participant videos.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

audio: optional object { enable_high_bitrate, enable_stereo }

Control options for Audio quality.

</summary>

enable_high_bitrate: optional boolean

Enable High Quality Audio for your meetings

[Link to this property](#)

enable_stereo: optional boolean

Enable Stereo for your meetings

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

view_type: "GROUP_CALL" or "WEBINAR" or "AUDIO_ROOM" or "LIVESTREAM"

Type of the meeting

</summary>

One of the following:

"GROUP_CALL"

[Link to this property](#)

"WEBINAR"

[Link to this property](#)

"AUDIO_ROOM"

[Link to this property](#)

"LIVESTREAM"

[Link to this property](#)

</details>

[Link to this property](#)

livestream_viewer_qualities: optional array of number

Livestream viewer quality levels.

[Link to this property](#)

</details>

[Link to this property](#)

created_at: string

Timestamp this preset was created at

formatdate-time

[Link to this property](#)

name: string

Name of the preset

[Link to this property](#)

<details>

<summary>

permissions: object { accept_waiting_requests, can_accept_production_requests, can_change_participant_permissions, 23 more }

</summary>

accept_waiting_requests: boolean

Whether this participant can accept waiting requests

[Link to this property](#)

can_accept_production_requests: boolean

[Link to this property](#)

can_change_participant_permissions: boolean

[Link to this property](#)

can_edit_display_name: boolean

[Link to this property](#)

can_livestream: boolean

[Link to this property](#)

can_record: boolean

[Link to this property](#)

can_spotlight: boolean

[Link to this property](#)

<details>

<summary>

chat: object { private, public }

</summary>

<details>

<summary>

private: object { can_receive, can_send, files, text }

</summary>

can_receive: boolean

[Link to this property](#)

can_send: boolean

[Link to this property](#)

files: boolean

[Link to this property](#)

text: boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

public: object { can_send, files, text }

</summary>

can_send: boolean

Can send messages in general

[Link to this property](#)

files: boolean

Can send file messages

[Link to this property](#)

text: boolean

Can send text messages

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

connected_meetings: object { can_alter_connected_meetings, can_switch_connected_meetings, can_switch_to_parent_meeting }

</summary>

can_alter_connected_meetings: boolean

[Link to this property](#)

can_switch_connected_meetings: boolean

[Link to this property](#)

can_switch_to_parent_meeting: boolean

[Link to this property](#)

</details>

[Link to this property](#)

disable_participant_audio: boolean

[Link to this property](#)

disable_participant_screensharing: boolean

[Link to this property](#)

disable_participant_video: boolean

[Link to this property](#)

hidden_participant: boolean

Whether this participant is visible to others or not

[Link to this property](#)

kick_participant: boolean

[Link to this property](#)

<details>

<summary>

media: object { audio, screenshare, video }

Media permissions

</summary>

<details>

<summary>

audio: object { can_produce }

Audio permissions

</summary>

<details>

<summary>

can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"

Can produce audio

</summary>

One of the following:

"ALLOWED"

[Link to this property](#)

"NOT_ALLOWED"

[Link to this property](#)

"CAN_REQUEST"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

screenshare: object { can_produce }

Screenshare permissions

</summary>

<details>

<summary>

can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"

Can produce screen share video

</summary>

One of the following:

"ALLOWED"

[Link to this property](#)

"NOT_ALLOWED"

[Link to this property](#)

"CAN_REQUEST"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

video: object { can_produce }

Video permissions

</summary>

<details>

<summary>

can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"

Can produce video

</summary>

One of the following:

"ALLOWED"

[Link to this property](#)

"NOT_ALLOWED"

[Link to this property](#)

"CAN_REQUEST"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

pin_participant: boolean

[Link to this property](#)

<details>

<summary>

plugins: object { can_close, can_edit_config, can_start, config }

Plugin permissions

</summary>

can_close: boolean

Can close plugins that are already open

[Link to this property](#)

can_edit_config: boolean

Can edit plugin config

[Link to this property](#)

can_start: boolean

Can start plugins

[Link to this property](#)

<details>

<summary>

config: map[object { access_control, handles_view_only } ]

Plugin configuration keyed by plugin UUID.

</summary>

<details>

<summary>

access_control: optional "FULL_ACCESS" or "VIEW_ONLY"

</summary>

One of the following:

"FULL_ACCESS"

[Link to this property](#)

"VIEW_ONLY"

[Link to this property](#)

</details>

[Link to this property](#)

handles_view_only: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

polls: object { can_create, can_view, can_vote }

Poll permissions

</summary>

can_create: boolean

Can create polls

[Link to this property](#)

can_view: boolean

Can view polls

[Link to this property](#)

can_vote: boolean

Can vote on polls

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

recorder_type: "RECORDER" or "LIVESTREAMER" or "NONE"

Type of the recording peer

</summary>

One of the following:

"RECORDER"

[Link to this property](#)

"LIVESTREAMER"

[Link to this property](#)

"NONE"

[Link to this property](#)

</details>

[Link to this property](#)

show_participant_list: boolean

[Link to this property](#)

<details>

<summary>

waiting_room_type: "SKIP" or "ON_PRIVILEGED_USER_ENTRY" or "SKIP_ON_ACCEPT"

Waiting room type

</summary>

One of the following:

"SKIP"

[Link to this property](#)

"ON_PRIVILEGED_USER_ENTRY"

[Link to this property](#)

"SKIP_ON_ACCEPT"

[Link to this property](#)

</details>

[Link to this property](#)

accept_stage_requests: optional boolean

[Link to this property](#)

is_recorder: optional boolean

[Link to this property](#)

<details>

<summary>

stage_access: optional "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"

</summary>

One of the following:

"ALLOWED"

[Link to this property](#)

"NOT_ALLOWED"

[Link to this property](#)

"CAN_REQUEST"

[Link to this property](#)

</details>

[Link to this property](#)

stage_enabled: optional boolean

[Link to this property](#)

transcription_enabled: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ui: object { design_tokens }

</summary>

<details>

<summary>

design_tokens: object { border_radius, border_width, colors, 5 more }

</summary>

<details>

<summary>

border_radius: "sharp" or "rounded" or "extra-rounded" or "circular"

</summary>

One of the following:

"sharp"

[Link to this property](#)

"rounded"

[Link to this property](#)

"extra-rounded"

[Link to this property](#)

"circular"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

border_width: "none" or "thin" or "fat"

</summary>

One of the following:

"none"

[Link to this property](#)

"thin"

[Link to this property](#)

"fat"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

colors: object { background, brand, danger, 5 more }

</summary>

<details>

<summary>

background: object { "1000", "600", "700", 2 more }

</summary>

"1000": string

[Link to this property](#)

"600": string

[Link to this property](#)

"700": string

[Link to this property](#)

"800": string

[Link to this property](#)

"900": string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

brand: object { "300", "400", "500", 2 more }

</summary>

"300": string

[Link to this property](#)

"400": string

[Link to this property](#)

"500": string

[Link to this property](#)

"600": string

[Link to this property](#)

"700": string

[Link to this property](#)

</details>

[Link to this property](#)

danger: string

[Link to this property](#)

success: string

[Link to this property](#)

text: string

[Link to this property](#)

text_on_brand: string

[Link to this property](#)

video_bg: string

[Link to this property](#)

warning: string

[Link to this property](#)

</details>

[Link to this property](#)

spacing_base: number

minimum1

[Link to this property](#)

<details>

<summary>

theme: "darkest" or "dark" or "light"

</summary>

One of the following:

"darkest"

[Link to this property](#)

"dark"

[Link to this property](#)

"light"

[Link to this property](#)

</details>

[Link to this property](#)

font_family: optional string

[Link to this property](#)

google_font: optional string

[Link to this property](#)

logo: optional string

formaturi

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

updated_at: string

Timestamp this preset was last updated

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

success: boolean

Success status of the operation

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PresetDeleteResponse object { data, success }

</summary>

<details>

<summary>

data: object { id, config, created_at, 4 more }

Data returned by the operation

</summary>

id: string

ID of the preset

formatuuid

[Link to this property](#)

<details>

<summary>

config: object { max_screenshare_count, max_video_streams, media, 2 more }

</summary>

max_screenshare_count: number

Maximum number of screen shares that can be active at a given time

[Link to this property](#)

<details>

<summary>

max_video_streams: object { desktop, mobile }

Maximum number of streams that are visible on a device

</summary>

desktop: number

Maximum number of video streams visible on desktop devices

[Link to this property](#)

mobile: number

Maximum number of streams visible on mobile devices

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

media: object { screenshare, video, audio }

Media configuration options. eg: Video quality

</summary>

<details>

<summary>

screenshare: object { frame_rate, quality }

Configuration options for participant screen shares

</summary>

frame_rate: number

Frame rate of screen share

[Link to this property](#)

<details>

<summary>

quality: "hd" or "vga" or "qvga" or 2 more

Quality of screen share

</summary>

One of the following:

"hd"

[Link to this property](#)

"vga"

[Link to this property](#)

"qvga"

[Link to this property](#)

"fhd"

[Link to this property](#)

"uhd"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

video: object { frame_rate, quality, simulcast }

Configuration options for participant videos

</summary>

frame_rate: number

Frame rate of participants’ video

maximum30

[Link to this property](#)

<details>

<summary>

quality: "hd" or "vga" or "qvga" or 2 more

Video quality of participants

</summary>

One of the following:

"hd"

[Link to this property](#)

"vga"

[Link to this property](#)

"qvga"

[Link to this property](#)

"fhd"

[Link to this property](#)

"uhd"

[Link to this property](#)

</details>

[Link to this property](#)

simulcast: optional boolean

Enable simulcast for participant videos.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

audio: optional object { enable_high_bitrate, enable_stereo }

Control options for Audio quality.

</summary>

enable_high_bitrate: optional boolean

Enable High Quality Audio for your meetings

[Link to this property](#)

enable_stereo: optional boolean

Enable Stereo for your meetings

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

view_type: "GROUP_CALL" or "WEBINAR" or "AUDIO_ROOM" or "LIVESTREAM"

Type of the meeting

</summary>

One of the following:

"GROUP_CALL"

[Link to this property](#)

"WEBINAR"

[Link to this property](#)

"AUDIO_ROOM"

[Link to this property](#)

"LIVESTREAM"

[Link to this property](#)

</details>

[Link to this property](#)

livestream_viewer_qualities: optional array of number

Livestream viewer quality levels.

[Link to this property](#)

</details>

[Link to this property](#)

created_at: string

Timestamp this preset was created at

formatdate-time

[Link to this property](#)

name: string

Name of the preset

[Link to this property](#)

<details>

<summary>

permissions: object { accept_waiting_requests, can_accept_production_requests, can_change_participant_permissions, 23 more }

</summary>

accept_waiting_requests: boolean

Whether this participant can accept waiting requests

[Link to this property](#)

can_accept_production_requests: boolean

[Link to this property](#)

can_change_participant_permissions: boolean

[Link to this property](#)

can_edit_display_name: boolean

[Link to this property](#)

can_livestream: boolean

[Link to this property](#)

can_record: boolean

[Link to this property](#)

can_spotlight: boolean

[Link to this property](#)

<details>

<summary>

chat: object { private, public }

</summary>

<details>

<summary>

private: object { can_receive, can_send, files, text }

</summary>

can_receive: boolean

[Link to this property](#)

can_send: boolean

[Link to this property](#)

files: boolean

[Link to this property](#)

text: boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

public: object { can_send, files, text }

</summary>

can_send: boolean

Can send messages in general

[Link to this property](#)

files: boolean

Can send file messages

[Link to this property](#)

text: boolean

Can send text messages

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

connected_meetings: object { can_alter_connected_meetings, can_switch_connected_meetings, can_switch_to_parent_meeting }

</summary>

can_alter_connected_meetings: boolean

[Link to this property](#)

can_switch_connected_meetings: boolean

[Link to this property](#)

can_switch_to_parent_meeting: boolean

[Link to this property](#)

</details>

[Link to this property](#)

disable_participant_audio: boolean

[Link to this property](#)

disable_participant_screensharing: boolean

[Link to this property](#)

disable_participant_video: boolean

[Link to this property](#)

hidden_participant: boolean

Whether this participant is visible to others or not

[Link to this property](#)

kick_participant: boolean

[Link to this property](#)

<details>

<summary>

media: object { audio, screenshare, video }

Media permissions

</summary>

<details>

<summary>

audio: object { can_produce }

Audio permissions

</summary>

<details>

<summary>

can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"

Can produce audio

</summary>

One of the following:

"ALLOWED"

[Link to this property](#)

"NOT_ALLOWED"

[Link to this property](#)

"CAN_REQUEST"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

screenshare: object { can_produce }

Screenshare permissions

</summary>

<details>

<summary>

can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"

Can produce screen share video

</summary>

One of the following:

"ALLOWED"

[Link to this property](#)

"NOT_ALLOWED"

[Link to this property](#)

"CAN_REQUEST"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

video: object { can_produce }

Video permissions

</summary>

<details>

<summary>

can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"

Can produce video

</summary>

One of the following:

"ALLOWED"

[Link to this property](#)

"NOT_ALLOWED"

[Link to this property](#)

"CAN_REQUEST"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

pin_participant: boolean

[Link to this property](#)

<details>

<summary>

plugins: object { can_close, can_edit_config, can_start, config }

Plugin permissions

</summary>

can_close: boolean

Can close plugins that are already open

[Link to this property](#)

can_edit_config: boolean

Can edit plugin config

[Link to this property](#)

can_start: boolean

Can start plugins

[Link to this property](#)

<details>

<summary>

config: map[object { access_control, handles_view_only } ]

Plugin configuration keyed by plugin UUID.

</summary>

<details>

<summary>

access_control: optional "FULL_ACCESS" or "VIEW_ONLY"

</summary>

One of the following:

"FULL_ACCESS"

[Link to this property](#)

"VIEW_ONLY"

[Link to this property](#)

</details>

[Link to this property](#)

handles_view_only: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

polls: object { can_create, can_view, can_vote }

Poll permissions

</summary>

can_create: boolean

Can create polls

[Link to this property](#)

can_view: boolean

Can view polls

[Link to this property](#)

can_vote: boolean

Can vote on polls

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

recorder_type: "RECORDER" or "LIVESTREAMER" or "NONE"

Type of the recording peer

</summary>

One of the following:

"RECORDER"

[Link to this property](#)

"LIVESTREAMER"

[Link to this property](#)

"NONE"

[Link to this property](#)

</details>

[Link to this property](#)

show_participant_list: boolean

[Link to this property](#)

<details>

<summary>

waiting_room_type: "SKIP" or "ON_PRIVILEGED_USER_ENTRY" or "SKIP_ON_ACCEPT"

Waiting room type

</summary>

One of the following:

"SKIP"

[Link to this property](#)

"ON_PRIVILEGED_USER_ENTRY"

[Link to this property](#)

"SKIP_ON_ACCEPT"

[Link to this property](#)

</details>

[Link to this property](#)

accept_stage_requests: optional boolean

[Link to this property](#)

is_recorder: optional boolean

[Link to this property](#)

<details>

<summary>

stage_access: optional "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"

</summary>

One of the following:

"ALLOWED"

[Link to this property](#)

"NOT_ALLOWED"

[Link to this property](#)

"CAN_REQUEST"

[Link to this property](#)

</details>

[Link to this property](#)

stage_enabled: optional boolean

[Link to this property](#)

transcription_enabled: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ui: object { design_tokens }

</summary>

<details>

<summary>

design_tokens: object { border_radius, border_width, colors, 5 more }

</summary>

<details>

<summary>

border_radius: "sharp" or "rounded" or "extra-rounded" or "circular"

</summary>

One of the following:

"sharp"

[Link to this property](#)

"rounded"

[Link to this property](#)

"extra-rounded"

[Link to this property](#)

"circular"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

border_width: "none" or "thin" or "fat"

</summary>

One of the following:

"none"

[Link to this property](#)

"thin"

[Link to this property](#)

"fat"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

colors: object { background, brand, danger, 5 more }

</summary>

<details>

<summary>

background: object { "1000", "600", "700", 2 more }

</summary>

"1000": string

[Link to this property](#)

"600": string

[Link to this property](#)

"700": string

[Link to this property](#)

"800": string

[Link to this property](#)

"900": string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

brand: object { "300", "400", "500", 2 more }

</summary>

"300": string

[Link to this property](#)

"400": string

[Link to this property](#)

"500": string

[Link to this property](#)

"600": string

[Link to this property](#)

"700": string

[Link to this property](#)

</details>

[Link to this property](#)

danger: string

[Link to this property](#)

success: string

[Link to this property](#)

text: string

[Link to this property](#)

text_on_brand: string

[Link to this property](#)

video_bg: string

[Link to this property](#)

warning: string

[Link to this property](#)

</details>

[Link to this property](#)

spacing_base: number

minimum1

[Link to this property](#)

<details>

<summary>

theme: "darkest" or "dark" or "light"

</summary>

One of the following:

"darkest"

[Link to this property](#)

"dark"

[Link to this property](#)

"light"

[Link to this property](#)

</details>

[Link to this property](#)

font_family: optional string

[Link to this property](#)

google_font: optional string

[Link to this property](#)

logo: optional string

formaturi

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

updated_at: string

Timestamp this preset was last updated

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

success: boolean

Success status of the operation

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PresetUpdateResponse object { data, success }

</summary>

<details>

<summary>

data: object { id, config, created_at, 4 more }

Data returned by the operation

</summary>

id: string

ID of the preset

formatuuid

[Link to this property](#)

<details>

<summary>

config: object { max_screenshare_count, max_video_streams, media, 2 more }

</summary>

max_screenshare_count: number

Maximum number of screen shares that can be active at a given time

[Link to this property](#)

<details>

<summary>

max_video_streams: object { desktop, mobile }

Maximum number of streams that are visible on a device

</summary>

desktop: number

Maximum number of video streams visible on desktop devices

[Link to this property](#)

mobile: number

Maximum number of streams visible on mobile devices

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

media: object { screenshare, video, audio }

Media configuration options. eg: Video quality

</summary>

<details>

<summary>

screenshare: object { frame_rate, quality }

Configuration options for participant screen shares

</summary>

frame_rate: number

Frame rate of screen share

[Link to this property](#)

<details>

<summary>

quality: "hd" or "vga" or "qvga" or 2 more

Quality of screen share

</summary>

One of the following:

"hd"

[Link to this property](#)

"vga"

[Link to this property](#)

"qvga"

[Link to this property](#)

"fhd"

[Link to this property](#)

"uhd"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

video: object { frame_rate, quality, simulcast }

Configuration options for participant videos

</summary>

frame_rate: number

Frame rate of participants’ video

maximum30

[Link to this property](#)

<details>

<summary>

quality: "hd" or "vga" or "qvga" or 2 more

Video quality of participants

</summary>

One of the following:

"hd"

[Link to this property](#)

"vga"

[Link to this property](#)

"qvga"

[Link to this property](#)

"fhd"

[Link to this property](#)

"uhd"

[Link to this property](#)

</details>

[Link to this property](#)

simulcast: optional boolean

Enable simulcast for participant videos.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

audio: optional object { enable_high_bitrate, enable_stereo }

Control options for Audio quality.

</summary>

enable_high_bitrate: optional boolean

Enable High Quality Audio for your meetings

[Link to this property](#)

enable_stereo: optional boolean

Enable Stereo for your meetings

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

view_type: "GROUP_CALL" or "WEBINAR" or "AUDIO_ROOM" or "LIVESTREAM"

Type of the meeting

</summary>

One of the following:

"GROUP_CALL"

[Link to this property](#)

"WEBINAR"

[Link to this property](#)

"AUDIO_ROOM"

[Link to this property](#)

"LIVESTREAM"

[Link to this property](#)

</details>

[Link to this property](#)

livestream_viewer_qualities: optional array of number

Livestream viewer quality levels.

[Link to this property](#)

</details>

[Link to this property](#)

created_at: string

Timestamp this preset was created at

formatdate-time

[Link to this property](#)

name: string

Name of the preset

[Link to this property](#)

<details>

<summary>

permissions: object { accept_waiting_requests, can_accept_production_requests, can_change_participant_permissions, 23 more }

</summary>

accept_waiting_requests: boolean

Whether this participant can accept waiting requests

[Link to this property](#)

can_accept_production_requests: boolean

[Link to this property](#)

can_change_participant_permissions: boolean

[Link to this property](#)

can_edit_display_name: boolean

[Link to this property](#)

can_livestream: boolean

[Link to this property](#)

can_record: boolean

[Link to this property](#)

can_spotlight: boolean

[Link to this property](#)

<details>

<summary>

chat: object { private, public }

</summary>

<details>

<summary>

private: object { can_receive, can_send, files, text }

</summary>

can_receive: boolean

[Link to this property](#)

can_send: boolean

[Link to this property](#)

files: boolean

[Link to this property](#)

text: boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

public: object { can_send, files, text }

</summary>

can_send: boolean

Can send messages in general

[Link to this property](#)

files: boolean

Can send file messages

[Link to this property](#)

text: boolean

Can send text messages

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

connected_meetings: object { can_alter_connected_meetings, can_switch_connected_meetings, can_switch_to_parent_meeting }

</summary>

can_alter_connected_meetings: boolean

[Link to this property](#)

can_switch_connected_meetings: boolean

[Link to this property](#)

can_switch_to_parent_meeting: boolean

[Link to this property](#)

</details>

[Link to this property](#)

disable_participant_audio: boolean

[Link to this property](#)

disable_participant_screensharing: boolean

[Link to this property](#)

disable_participant_video: boolean

[Link to this property](#)

hidden_participant: boolean

Whether this participant is visible to others or not

[Link to this property](#)

kick_participant: boolean

[Link to this property](#)

<details>

<summary>

media: object { audio, screenshare, video }

Media permissions

</summary>

<details>

<summary>

audio: object { can_produce }

Audio permissions

</summary>

<details>

<summary>

can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"

Can produce audio

</summary>

One of the following:

"ALLOWED"

[Link to this property](#)

"NOT_ALLOWED"

[Link to this property](#)

"CAN_REQUEST"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

screenshare: object { can_produce }

Screenshare permissions

</summary>

<details>

<summary>

can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"

Can produce screen share video

</summary>

One of the following:

"ALLOWED"

[Link to this property](#)

"NOT_ALLOWED"

[Link to this property](#)

"CAN_REQUEST"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

video: object { can_produce }

Video permissions

</summary>

<details>

<summary>

can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"

Can produce video

</summary>

One of the following:

"ALLOWED"

[Link to this property](#)

"NOT_ALLOWED"

[Link to this property](#)

"CAN_REQUEST"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

pin_participant: boolean

[Link to this property](#)

<details>

<summary>

plugins: object { can_close, can_edit_config, can_start, config }

Plugin permissions

</summary>

can_close: boolean

Can close plugins that are already open

[Link to this property](#)

can_edit_config: boolean

Can edit plugin config

[Link to this property](#)

can_start: boolean

Can start plugins

[Link to this property](#)

<details>

<summary>

config: map[object { access_control, handles_view_only } ]

Plugin configuration keyed by plugin UUID.

</summary>

<details>

<summary>

access_control: optional "FULL_ACCESS" or "VIEW_ONLY"

</summary>

One of the following:

"FULL_ACCESS"

[Link to this property](#)

"VIEW_ONLY"

[Link to this property](#)

</details>

[Link to this property](#)

handles_view_only: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

polls: object { can_create, can_view, can_vote }

Poll permissions

</summary>

can_create: boolean

Can create polls

[Link to this property](#)

can_view: boolean

Can view polls

[Link to this property](#)

can_vote: boolean

Can vote on polls

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

recorder_type: "RECORDER" or "LIVESTREAMER" or "NONE"

Type of the recording peer

</summary>

One of the following:

"RECORDER"

[Link to this property](#)

"LIVESTREAMER"

[Link to this property](#)

"NONE"

[Link to this property](#)

</details>

[Link to this property](#)

show_participant_list: boolean

[Link to this property](#)

<details>

<summary>

waiting_room_type: "SKIP" or "ON_PRIVILEGED_USER_ENTRY" or "SKIP_ON_ACCEPT"

Waiting room type

</summary>

One of the following:

"SKIP"

[Link to this property](#)

"ON_PRIVILEGED_USER_ENTRY"

[Link to this property](#)

"SKIP_ON_ACCEPT"

[Link to this property](#)

</details>

[Link to this property](#)

accept_stage_requests: optional boolean

[Link to this property](#)

is_recorder: optional boolean

[Link to this property](#)

<details>

<summary>

stage_access: optional "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"

</summary>

One of the following:

"ALLOWED"

[Link to this property](#)

"NOT_ALLOWED"

[Link to this property](#)

"CAN_REQUEST"

[Link to this property](#)

</details>

[Link to this property](#)

stage_enabled: optional boolean

[Link to this property](#)

transcription_enabled: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ui: object { design_tokens }

</summary>

<details>

<summary>

design_tokens: object { border_radius, border_width, colors, 5 more }

</summary>

<details>

<summary>

border_radius: "sharp" or "rounded" or "extra-rounded" or "circular"

</summary>

One of the following:

"sharp"

[Link to this property](#)

"rounded"

[Link to this property](#)

"extra-rounded"

[Link to this property](#)

"circular"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

border_width: "none" or "thin" or "fat"

</summary>

One of the following:

"none"

[Link to this property](#)

"thin"

[Link to this property](#)

"fat"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

colors: object { background, brand, danger, 5 more }

</summary>

<details>

<summary>

background: object { "1000", "600", "700", 2 more }

</summary>

"1000": string

[Link to this property](#)

"600": string

[Link to this property](#)

"700": string

[Link to this property](#)

"800": string

[Link to this property](#)

"900": string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

brand: object { "300", "400", "500", 2 more }

</summary>

"300": string

[Link to this property](#)

"400": string

[Link to this property](#)

"500": string

[Link to this property](#)

"600": string

[Link to this property](#)

"700": string

[Link to this property](#)

</details>

[Link to this property](#)

danger: string

[Link to this property](#)

success: string

[Link to this property](#)

text: string

[Link to this property](#)

text_on_brand: string

[Link to this property](#)

video_bg: string

[Link to this property](#)

warning: string

[Link to this property](#)

</details>

[Link to this property](#)

spacing_base: number

minimum1

[Link to this property](#)

<details>

<summary>

theme: "darkest" or "dark" or "light"

</summary>

One of the following:

"darkest"

[Link to this property](#)

"dark"

[Link to this property](#)

"light"

[Link to this property](#)

</details>

[Link to this property](#)

font_family: optional string

[Link to this property](#)

google_font: optional string

[Link to this property](#)

logo: optional string

formaturi

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

updated_at: string

Timestamp this preset was last updated

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

success: boolean

Success status of the operation

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PresetReplacePresetByIDResponse object { data, success }

</summary>

<details>

<summary>

data: object { id, config, created_at, 4 more }

Data returned by the operation

</summary>

id: string

ID of the preset

formatuuid

[Link to this property](#)

<details>

<summary>

config: object { max_screenshare_count, max_video_streams, media, 2 more }

</summary>

max_screenshare_count: number

Maximum number of screen shares that can be active at a given time

[Link to this property](#)

<details>

<summary>

max_video_streams: object { desktop, mobile }

Maximum number of streams that are visible on a device

</summary>

desktop: number

Maximum number of video streams visible on desktop devices

[Link to this property](#)

mobile: number

Maximum number of streams visible on mobile devices

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

media: object { screenshare, video, audio }

Media configuration options. eg: Video quality

</summary>

<details>

<summary>

screenshare: object { frame_rate, quality }

Configuration options for participant screen shares

</summary>

frame_rate: number

Frame rate of screen share

[Link to this property](#)

<details>

<summary>

quality: "hd" or "vga" or "qvga" or 2 more

Quality of screen share

</summary>

One of the following:

"hd"

[Link to this property](#)

"vga"

[Link to this property](#)

"qvga"

[Link to this property](#)

"fhd"

[Link to this property](#)

"uhd"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

video: object { frame_rate, quality, simulcast }

Configuration options for participant videos

</summary>

frame_rate: number

Frame rate of participants’ video

maximum30

[Link to this property](#)

<details>

<summary>

quality: "hd" or "vga" or "qvga" or 2 more

Video quality of participants

</summary>

One of the following:

"hd"

[Link to this property](#)

"vga"

[Link to this property](#)

"qvga"

[Link to this property](#)

"fhd"

[Link to this property](#)

"uhd"

[Link to this property](#)

</details>

[Link to this property](#)

simulcast: optional boolean

Enable simulcast for participant videos.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

audio: optional object { enable_high_bitrate, enable_stereo }

Control options for Audio quality.

</summary>

enable_high_bitrate: optional boolean

Enable High Quality Audio for your meetings

[Link to this property](#)

enable_stereo: optional boolean

Enable Stereo for your meetings

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

view_type: "GROUP_CALL" or "WEBINAR" or "AUDIO_ROOM" or "LIVESTREAM"

Type of the meeting

</summary>

One of the following:

"GROUP_CALL"

[Link to this property](#)

"WEBINAR"

[Link to this property](#)

"AUDIO_ROOM"

[Link to this property](#)

"LIVESTREAM"

[Link to this property](#)

</details>

[Link to this property](#)

livestream_viewer_qualities: optional array of number

Livestream viewer quality levels.

[Link to this property](#)

</details>

[Link to this property](#)

created_at: string

Timestamp this preset was created at

formatdate-time

[Link to this property](#)

name: string

Name of the preset

[Link to this property](#)

<details>

<summary>

permissions: object { accept_waiting_requests, can_accept_production_requests, can_change_participant_permissions, 23 more }

</summary>

accept_waiting_requests: boolean

Whether this participant can accept waiting requests

[Link to this property](#)

can_accept_production_requests: boolean

[Link to this property](#)

can_change_participant_permissions: boolean

[Link to this property](#)

can_edit_display_name: boolean

[Link to this property](#)

can_livestream: boolean

[Link to this property](#)

can_record: boolean

[Link to this property](#)

can_spotlight: boolean

[Link to this property](#)

<details>

<summary>

chat: object { private, public }

</summary>

<details>

<summary>

private: object { can_receive, can_send, files, text }

</summary>

can_receive: boolean

[Link to this property](#)

can_send: boolean

[Link to this property](#)

files: boolean

[Link to this property](#)

text: boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

public: object { can_send, files, text }

</summary>

can_send: boolean

Can send messages in general

[Link to this property](#)

files: boolean

Can send file messages

[Link to this property](#)

text: boolean

Can send text messages

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

connected_meetings: object { can_alter_connected_meetings, can_switch_connected_meetings, can_switch_to_parent_meeting }

</summary>

can_alter_connected_meetings: boolean

[Link to this property](#)

can_switch_connected_meetings: boolean

[Link to this property](#)

can_switch_to_parent_meeting: boolean

[Link to this property](#)

</details>

[Link to this property](#)

disable_participant_audio: boolean

[Link to this property](#)

disable_participant_screensharing: boolean

[Link to this property](#)

disable_participant_video: boolean

[Link to this property](#)

hidden_participant: boolean

Whether this participant is visible to others or not

[Link to this property](#)

kick_participant: boolean

[Link to this property](#)

<details>

<summary>

media: object { audio, screenshare, video }

Media permissions

</summary>

<details>

<summary>

audio: object { can_produce }

Audio permissions

</summary>

<details>

<summary>

can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"

Can produce audio

</summary>

One of the following:

"ALLOWED"

[Link to this property](#)

"NOT_ALLOWED"

[Link to this property](#)

"CAN_REQUEST"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

screenshare: object { can_produce }

Screenshare permissions

</summary>

<details>

<summary>

can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"

Can produce screen share video

</summary>

One of the following:

"ALLOWED"

[Link to this property](#)

"NOT_ALLOWED"

[Link to this property](#)

"CAN_REQUEST"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

video: object { can_produce }

Video permissions

</summary>

<details>

<summary>

can_produce: "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"

Can produce video

</summary>

One of the following:

"ALLOWED"

[Link to this property](#)

"NOT_ALLOWED"

[Link to this property](#)

"CAN_REQUEST"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

pin_participant: boolean

[Link to this property](#)

<details>

<summary>

plugins: object { can_close, can_edit_config, can_start, config }

Plugin permissions

</summary>

can_close: boolean

Can close plugins that are already open

[Link to this property](#)

can_edit_config: boolean

Can edit plugin config

[Link to this property](#)

can_start: boolean

Can start plugins

[Link to this property](#)

<details>

<summary>

config: map[object { access_control, handles_view_only } ]

Plugin configuration keyed by plugin UUID.

</summary>

<details>

<summary>

access_control: optional "FULL_ACCESS" or "VIEW_ONLY"

</summary>

One of the following:

"FULL_ACCESS"

[Link to this property](#)

"VIEW_ONLY"

[Link to this property](#)

</details>

[Link to this property](#)

handles_view_only: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

polls: object { can_create, can_view, can_vote }

Poll permissions

</summary>

can_create: boolean

Can create polls

[Link to this property](#)

can_view: boolean

Can view polls

[Link to this property](#)

can_vote: boolean

Can vote on polls

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

recorder_type: "RECORDER" or "LIVESTREAMER" or "NONE"

Type of the recording peer

</summary>

One of the following:

"RECORDER"

[Link to this property](#)

"LIVESTREAMER"

[Link to this property](#)

"NONE"

[Link to this property](#)

</details>

[Link to this property](#)

show_participant_list: boolean

[Link to this property](#)

<details>

<summary>

waiting_room_type: "SKIP" or "ON_PRIVILEGED_USER_ENTRY" or "SKIP_ON_ACCEPT"

Waiting room type

</summary>

One of the following:

"SKIP"

[Link to this property](#)

"ON_PRIVILEGED_USER_ENTRY"

[Link to this property](#)

"SKIP_ON_ACCEPT"

[Link to this property](#)

</details>

[Link to this property](#)

accept_stage_requests: optional boolean

[Link to this property](#)

is_recorder: optional boolean

[Link to this property](#)

<details>

<summary>

stage_access: optional "ALLOWED" or "NOT_ALLOWED" or "CAN_REQUEST"

</summary>

One of the following:

"ALLOWED"

[Link to this property](#)

"NOT_ALLOWED"

[Link to this property](#)

"CAN_REQUEST"

[Link to this property](#)

</details>

[Link to this property](#)

stage_enabled: optional boolean

[Link to this property](#)

transcription_enabled: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ui: object { design_tokens }

</summary>

<details>

<summary>

design_tokens: object { border_radius, border_width, colors, 5 more }

</summary>

<details>

<summary>

border_radius: "sharp" or "rounded" or "extra-rounded" or "circular"

</summary>

One of the following:

"sharp"

[Link to this property](#)

"rounded"

[Link to this property](#)

"extra-rounded"

[Link to this property](#)

"circular"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

border_width: "none" or "thin" or "fat"

</summary>

One of the following:

"none"

[Link to this property](#)

"thin"

[Link to this property](#)

"fat"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

colors: object { background, brand, danger, 5 more }

</summary>

<details>

<summary>

background: object { "1000", "600", "700", 2 more }

</summary>

"1000": string

[Link to this property](#)

"600": string

[Link to this property](#)

"700": string

[Link to this property](#)

"800": string

[Link to this property](#)

"900": string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

brand: object { "300", "400", "500", 2 more }

</summary>

"300": string

[Link to this property](#)

"400": string

[Link to this property](#)

"500": string

[Link to this property](#)

"600": string

[Link to this property](#)

"700": string

[Link to this property](#)

</details>

[Link to this property](#)

danger: string

[Link to this property](#)

success: string

[Link to this property](#)

text: string

[Link to this property](#)

text_on_brand: string

[Link to this property](#)

video_bg: string

[Link to this property](#)

warning: string

[Link to this property](#)

</details>

[Link to this property](#)

spacing_base: number

minimum1

[Link to this property](#)

<details>

<summary>

theme: "darkest" or "dark" or "light"

</summary>

One of the following:

"darkest"

[Link to this property](#)

"dark"

[Link to this property](#)

"light"

[Link to this property](#)

</details>

[Link to this property](#)

font_family: optional string

[Link to this property](#)

google_font: optional string

[Link to this property](#)

logo: optional string

formaturi

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

updated_at: string

Timestamp this preset was last updated

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

success: boolean

Success status of the operation

[Link to this property](#)

</details>

[Link to this property](#)

##### [Fetch all sessions of an App](/api/resources/realtime_kit/subresources/sessions/methods/get_sessions)

GET/accounts/{account_id}/realtime/kit/{app_id}/sessions

##### [Fetch details of a session](/api/resources/realtime_kit/subresources/sessions/methods/get_session_details)

GET/accounts/{account_id}/realtime/kit/{app_id}/sessions/{session_id}

##### [Fetch participants list of a session](/api/resources/realtime_kit/subresources/sessions/methods/get_session_participants)

GET/accounts/{account_id}/realtime/kit/{app_id}/sessions/{session_id}/participants

##### [Fetch details of a participant](/api/resources/realtime_kit/subresources/sessions/methods/get_session_participant_details)

GET/accounts/{account_id}/realtime/kit/{app_id}/sessions/{session_id}/participants/{participant_id}

##### [Fetch all chat messages of a session](/api/resources/realtime_kit/subresources/sessions/methods/get_session_chat)

GET/accounts/{account_id}/realtime/kit/{app_id}/sessions/{session_id}/chat

##### [Fetch the complete transcript for a session](/api/resources/realtime_kit/subresources/sessions/methods/get_session_transcripts)

GET/accounts/{account_id}/realtime/kit/{app_id}/sessions/{session_id}/transcript

##### [Fetch summary of transcripts for a session](/api/resources/realtime_kit/subresources/sessions/methods/get_session_summary)

GET/accounts/{account_id}/realtime/kit/{app_id}/sessions/{session_id}/summary

##### [Generate summary of Transcripts for the session](/api/resources/realtime_kit/subresources/sessions/methods/generate_summary_of_transcripts)

POST/accounts/{account_id}/realtime/kit/{app_id}/sessions/{session_id}/summary

##### [Fetch details of peer](/api/resources/realtime_kit/subresources/sessions/methods/get_participant_data_from_peer_id)

GET/accounts/{account_id}/realtime/kit/{app_id}/sessions/peer-report/{peer_id}

##### Models

<details>

<summary>

SessionGetSessionsResponse object { data, paging, success }

</summary>

<details>

<summary>

data: optional object { sessions }

</summary>

<details>

<summary>

sessions: optional array of object { id, associated_id, created_at, 11 more }

</summary>

id: string

ID of the session

[Link to this property](#)

associated_id: string

ID of the meeting this session is associated with. In the case of V2 meetings, it is always a UUID. In V1 meetings, it is a room name of the form `abcdef-ghijkl`

[Link to this property](#)

created_at: string

timestamp when session created

[Link to this property](#)

live_participants: number

number of participants currently in the session

[Link to this property](#)

max_concurrent_participants: number

number of maximum participants that were in the session

[Link to this property](#)

meeting_display_name: string

Title of the meeting this session belongs to

[Link to this property](#)

minutes_consumed: number

number of minutes consumed since the session started

[Link to this property](#)

organization_id: string

App id that hosted this session

[Link to this property](#)

started_at: string

timestamp when session started

[Link to this property](#)

<details>

<summary>

status: "LIVE" or "ENDED"

current status of session

</summary>

One of the following:

"LIVE"

[Link to this property](#)

"ENDED"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

type: "meeting" or "livestream" or "participant"

type of session

</summary>

One of the following:

"meeting"

[Link to this property](#)

"livestream"

[Link to this property](#)

"participant"

[Link to this property](#)

</details>

[Link to this property](#)

updated_at: string

timestamp when session was last updated

[Link to this property](#)

breakout_rooms: optional array of unknown

[Link to this property](#)

ended_at: optional string

timestamp when session ended

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

paging: optional object { end_offset, start_offset, total_count }

</summary>

end_offset: optional number

[Link to this property](#)

start_offset: optional number

[Link to this property](#)

total_count: optional number

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

success: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SessionGetSessionDetailsResponse object { data, success }

</summary>

<details>

<summary>

data: optional object { id, associated_id, created_at, 11 more }

</summary>

id: string

ID of the session

[Link to this property](#)

associated_id: string

ID of the meeting this session is associated with. In the case of V2 meetings, it is always a UUID. In V1 meetings, it is a room name of the form `abcdef-ghijkl`

[Link to this property](#)

created_at: string

timestamp when session created

[Link to this property](#)

live_participants: number

number of participants currently in the session

[Link to this property](#)

max_concurrent_participants: number

number of maximum participants that were in the session

[Link to this property](#)

meeting_display_name: string

Title of the meeting this session belongs to

[Link to this property](#)

minutes_consumed: number

number of minutes consumed since the session started

[Link to this property](#)

organization_id: string

App id that hosted this session

[Link to this property](#)

started_at: string

timestamp when session started

[Link to this property](#)

<details>

<summary>

status: "LIVE" or "ENDED"

current status of session

</summary>

One of the following:

"LIVE"

[Link to this property](#)

"ENDED"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

type: "meeting" or "livestream" or "participant"

type of session

</summary>

One of the following:

"meeting"

[Link to this property](#)

"livestream"

[Link to this property](#)

"participant"

[Link to this property](#)

</details>

[Link to this property](#)

updated_at: string

timestamp when session was last updated

[Link to this property](#)

breakout_rooms: optional array of unknown

[Link to this property](#)

ended_at: optional string

timestamp when session ended

[Link to this property](#)

</details>

[Link to this property](#)

success: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SessionGetSessionParticipantsResponse object { data, success }

</summary>

<details>

<summary>

data: optional object { participants }

</summary>

<details>

<summary>

participants: optional array of object { id, created_at, custom_participant_id, 8 more }

</summary>

id: optional string

Participant ID. This maps to the corresponding peerId.

[Link to this property](#)

created_at: optional string

timestamp when this participant was created.

[Link to this property](#)

custom_participant_id: optional string

ID passed by client to create this participant.

[Link to this property](#)

display_name: optional string

Display name of participant when joining the session.

[Link to this property](#)

duration: optional number

number of minutes for which the participant was in the session.

[Link to this property](#)

joined_at: optional string

timestamp at which participant joined the session.

[Link to this property](#)

left_at: optional string

timestamp at which participant left the session.

[Link to this property](#)

<details>

<summary>

peer_events: optional array of object { id, created_at, event_name, 7 more }

Connection lifecycle events for the participant’s peer. Only included when `include_peer_events` is true.

</summary>

id: optional string

ID of the peer event.

[Link to this property](#)

created_at: optional string

Timestamp when this peer event was created.

[Link to this property](#)

<details>

<summary>

event_name: optional "PEER_CREATED" or "PEER_JOINING" or "PEER_LEAVING"

Name of the peer event.

</summary>

One of the following:

"PEER_CREATED"

[Link to this property](#)

"PEER_JOINING"

[Link to this property](#)

"PEER_LEAVING"

[Link to this property](#)

</details>

[Link to this property](#)

minutes_consumed: optional number

Minutes consumed attributed to this event.

[Link to this property](#)

participant_id: optional string

ID of the participant this event belongs to.

[Link to this property](#)

peer_id: optional string

Peer ID this event belongs to.

[Link to this property](#)

<details>

<summary>

preset_view_type: optional "GROUP_CALL" or "WEBINAR" or "AUDIO_ROOM" or 2 more

View type of the preset associated with the peer.

</summary>

One of the following:

"GROUP_CALL"

[Link to this property](#)

"WEBINAR"

[Link to this property](#)

"AUDIO_ROOM"

[Link to this property](#)

"LIVESTREAM"

[Link to this property](#)

"CHAT"

[Link to this property](#)

</details>

[Link to this property](#)

session_id: optional string

ID of the session this event belongs to.

[Link to this property](#)

socket_session_id: optional string

ID of the socket session associated with this event.

[Link to this property](#)

updated_at: optional string

Timestamp when this peer event was last updated.

[Link to this property](#)

</details>

[Link to this property](#)

preset_name: optional string

Name of the preset associated with the participant.

[Link to this property](#)

updated_at: optional string

timestamp when this participant’s data was last updated.

[Link to this property](#)

user_id: optional string

User id for this participant.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

success: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SessionGetSessionParticipantDetailsResponse object { data, success }

</summary>

<details>

<summary>

data: optional object { participant }

</summary>

<details>

<summary>

participant: optional object { id, created_at, custom_participant_id, 8 more }

</summary>

id: optional string

Participant ID. This maps to the corresponding peerId.

[Link to this property](#)

created_at: optional string

timestamp when this participant was created.

[Link to this property](#)

custom_participant_id: optional string

ID passed by client to create this participant.

[Link to this property](#)

display_name: optional string

Display name of participant when joining the session.

[Link to this property](#)

duration: optional number

number of minutes for which the participant was in the session.

[Link to this property](#)

joined_at: optional string

timestamp at which participant joined the session.

[Link to this property](#)

left_at: optional string

timestamp at which participant left the session.

[Link to this property](#)

<details>

<summary>

peer_events: optional array of object { id, created_at, event_name, 7 more }

Connection lifecycle events for the participant’s peer. Only included when `include_peer_events` is true.

</summary>

id: optional string

ID of the peer event.

[Link to this property](#)

created_at: optional string

Timestamp when this peer event was created.

[Link to this property](#)

<details>

<summary>

event_name: optional "PEER_CREATED" or "PEER_JOINING" or "PEER_LEAVING"

Name of the peer event.

</summary>

One of the following:

"PEER_CREATED"

[Link to this property](#)

"PEER_JOINING"

[Link to this property](#)

"PEER_LEAVING"

[Link to this property](#)

</details>

[Link to this property](#)

minutes_consumed: optional number

Minutes consumed attributed to this event.

[Link to this property](#)

participant_id: optional string

ID of the participant this event belongs to.

[Link to this property](#)

peer_id: optional string

Peer ID this event belongs to.

[Link to this property](#)

<details>

<summary>

preset_view_type: optional "GROUP_CALL" or "WEBINAR" or "AUDIO_ROOM" or 2 more

View type of the preset associated with the peer.

</summary>

One of the following:

"GROUP_CALL"

[Link to this property](#)

"WEBINAR"

[Link to this property](#)

"AUDIO_ROOM"

[Link to this property](#)

"LIVESTREAM"

[Link to this property](#)

"CHAT"

[Link to this property](#)

</details>

[Link to this property](#)

session_id: optional string

ID of the session this event belongs to.

[Link to this property](#)

socket_session_id: optional string

ID of the socket session associated with this event.

[Link to this property](#)

updated_at: optional string

Timestamp when this peer event was last updated.

[Link to this property](#)

</details>

[Link to this property](#)

preset_name: optional string

Name of the preset associated with the participant.

[Link to this property](#)

updated_at: optional string

timestamp when this participant’s data was last updated.

[Link to this property](#)

user_id: optional string

User id for this participant.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

success: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SessionGetSessionChatResponse object { data, success }

</summary>

<details>

<summary>

data: optional object { chat_download_url, chat_download_url_expiry }

</summary>

chat_download_url: string

URL where the chat logs can be downloaded

[Link to this property](#)

chat_download_url_expiry: string

Time when the download URL will expire

[Link to this property](#)

</details>

[Link to this property](#)

success: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SessionGetSessionTranscriptsResponse object { data, success }

</summary>

<details>

<summary>

data: optional object { sessionId, transcript_download_url, transcript_download_url_expiry }

</summary>

sessionId: string

[Link to this property](#)

transcript_download_url: string

URL where the transcript can be downloaded

[Link to this property](#)

transcript_download_url_expiry: string

Time when the download URL will expire

[Link to this property](#)

</details>

[Link to this property](#)

success: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SessionGetSessionSummaryResponse object { data, success }

</summary>

<details>

<summary>

data: optional object { sessionId, summaryDownloadUrl, summaryDownloadUrlExpiry }

</summary>

sessionId: string

[Link to this property](#)

summaryDownloadUrl: string

URL where the summary of transcripts can be downloaded

[Link to this property](#)

summaryDownloadUrlExpiry: string

Time of Expiry before when you need to download the csv file.

[Link to this property](#)

</details>

[Link to this property](#)

success: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SessionGenerateSummaryOfTranscriptsResponse object { data, success }

</summary>

<details>

<summary>

data: optional object { session_id, status }

</summary>

session_id: optional string

formatuuid

[Link to this property](#)

status: optional string

[Link to this property](#)

</details>

[Link to this property](#)

success: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SessionGetParticipantDataFromPeerIDResponse object { data, success }

</summary>

<details>

<summary>

data: optional object { participant }

</summary>

<details>

<summary>

participant: optional object { id, created_at, custom_participant_id, 10 more }

</summary>

id: optional string

ID of the participant.

formatuuid

[Link to this property](#)

created_at: optional string

timestamp when this participant was created.

[Link to this property](#)

custom_participant_id: optional string

ID passed by client to create this participant.

[Link to this property](#)

display_name: optional string

Display name of participant when joining the session.

[Link to this property](#)

duration: optional number

number of minutes for which the participant was in the session.

[Link to this property](#)

joined_at: optional string

timestamp at which participant joined the session.

[Link to this property](#)

left_at: optional string

timestamp at which participant left the session.

[Link to this property](#)

<details>

<summary>

peer_events: optional array of object { id, created_at, event_name, 7 more }

Connection lifecycle events for the participant’s peer.

</summary>

id: optional string

ID of the peer event.

[Link to this property](#)

created_at: optional string

Timestamp when this peer event was created.

[Link to this property](#)

<details>

<summary>

event_name: optional "PEER_CREATED" or "PEER_JOINING" or "PEER_LEAVING"

Name of the peer event.

</summary>

One of the following:

"PEER_CREATED"

[Link to this property](#)

"PEER_JOINING"

[Link to this property](#)

"PEER_LEAVING"

[Link to this property](#)

</details>

[Link to this property](#)

minutes_consumed: optional number

Minutes consumed attributed to this event.

[Link to this property](#)

participant_id: optional string

ID of the participant this event belongs to.

[Link to this property](#)

peer_id: optional string

Peer ID this event belongs to.

[Link to this property](#)

<details>

<summary>

preset_view_type: optional "GROUP_CALL" or "WEBINAR" or "AUDIO_ROOM" or 2 more

View type of the preset associated with the peer.

</summary>

One of the following:

"GROUP_CALL"

[Link to this property](#)

"WEBINAR"

[Link to this property](#)

"AUDIO_ROOM"

[Link to this property](#)

"LIVESTREAM"

[Link to this property](#)

"CHAT"

[Link to this property](#)

</details>

[Link to this property](#)

session_id: optional string

ID of the session this event belongs to.

[Link to this property](#)

socket_session_id: optional string

ID of the socket session associated with this event.

[Link to this property](#)

updated_at: optional string

Timestamp when this peer event was last updated.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

peer_report: optional object { metadata, quality }

Peer call statistics report.

</summary>

<details>

<summary>

metadata: optional object { audio_devices_updates, browser_metadata, candidate_pairs, 12 more }

Connection and device metadata for the participant.

</summary>

<details>

<summary>

audio_devices_updates: optional array of object { added, removed, timestamp }

</summary>

<details>

<summary>

added: optional array of object { device_id, kind, label }

Devices that became available.

</summary>

device_id: optional string

ID of the device.

[Link to this property](#)

kind: optional string

Kind of device, for example audioinput or videoinput.

[Link to this property](#)

label: optional string

Human-readable label of the device.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

removed: optional array of object { device_id, kind, label }

Devices that became unavailable.

</summary>

device_id: optional string

ID of the device.

[Link to this property](#)

kind: optional string

Kind of device, for example audioinput or videoinput.

[Link to this property](#)

label: optional string

Human-readable label of the device.

[Link to this property](#)

</details>

[Link to this property](#)

timestamp: optional string

Timestamp of the device update.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

browser_metadata: optional object { browser, browser_version, engine, 2 more }

</summary>

browser: optional string

[Link to this property](#)

browser_version: optional string

[Link to this property](#)

engine: optional string

[Link to this property](#)

user_agent: optional string

[Link to this property](#)

webgl_support: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

candidate_pairs: optional object { consuming_transport, producing_transport }

</summary>

<details>

<summary>

consuming_transport: optional array of object { available_incoming_bitrate, available_outgoing_bitrate, bytes_discarded_on_send, 25 more }

</summary>

available_incoming_bitrate: optional number

[Link to this property](#)

available_outgoing_bitrate: optional number

[Link to this property](#)

bytes_discarded_on_send: optional number

[Link to this property](#)

bytes_received: optional number

[Link to this property](#)

bytes_sent: optional number

[Link to this property](#)

current_round_trip_time: optional number

[Link to this property](#)

last_packet_received_timestamp: optional number

Epoch milliseconds when the last packet was received.

[Link to this property](#)

last_packet_sent_timestamp: optional number

Epoch milliseconds when the last packet was sent.

[Link to this property](#)

local_candidate_address: optional string

[Link to this property](#)

local_candidate_id: optional string

[Link to this property](#)

local_candidate_network_type: optional string

[Link to this property](#)

local_candidate_port: optional number

[Link to this property](#)

local_candidate_protocol: optional string

[Link to this property](#)

local_candidate_related_address: optional string

[Link to this property](#)

local_candidate_related_port: optional number

[Link to this property](#)

local_candidate_type: optional string

[Link to this property](#)

local_candidate_url: optional string

[Link to this property](#)

nominated: optional boolean

[Link to this property](#)

packets_discarded_on_send: optional number

[Link to this property](#)

packets_received: optional number

[Link to this property](#)

packets_sent: optional number

[Link to this property](#)

remote_candidate_address: optional string

[Link to this property](#)

remote_candidate_id: optional string

[Link to this property](#)

remote_candidate_port: optional number

[Link to this property](#)

remote_candidate_protocol: optional string

[Link to this property](#)

remote_candidate_type: optional string

[Link to this property](#)

remote_candidate_url: optional string

[Link to this property](#)

total_round_trip_time: optional number

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

producing_transport: optional array of object { available_incoming_bitrate, available_outgoing_bitrate, bytes_discarded_on_send, 25 more }

</summary>

available_incoming_bitrate: optional number

[Link to this property](#)

available_outgoing_bitrate: optional number

[Link to this property](#)

bytes_discarded_on_send: optional number

[Link to this property](#)

bytes_received: optional number

[Link to this property](#)

bytes_sent: optional number

[Link to this property](#)

current_round_trip_time: optional number

[Link to this property](#)

last_packet_received_timestamp: optional number

Epoch milliseconds when the last packet was received.

[Link to this property](#)

last_packet_sent_timestamp: optional number

Epoch milliseconds when the last packet was sent.

[Link to this property](#)

local_candidate_address: optional string

[Link to this property](#)

local_candidate_id: optional string

[Link to this property](#)

local_candidate_network_type: optional string

[Link to this property](#)

local_candidate_port: optional number

[Link to this property](#)

local_candidate_protocol: optional string

[Link to this property](#)

local_candidate_related_address: optional string

[Link to this property](#)

local_candidate_related_port: optional number

[Link to this property](#)

local_candidate_type: optional string

[Link to this property](#)

local_candidate_url: optional string

[Link to this property](#)

nominated: optional boolean

[Link to this property](#)

packets_discarded_on_send: optional number

[Link to this property](#)

packets_received: optional number

[Link to this property](#)

packets_sent: optional number

[Link to this property](#)

remote_candidate_address: optional string

[Link to this property](#)

remote_candidate_id: optional string

[Link to this property](#)

remote_candidate_port: optional number

[Link to this property](#)

remote_candidate_protocol: optional string

[Link to this property](#)

remote_candidate_type: optional string

[Link to this property](#)

remote_candidate_url: optional string

[Link to this property](#)

total_round_trip_time: optional number

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

device_info: optional object { cpus, is_mobile, os, os_version }

</summary>

cpus: optional number

[Link to this property](#)

is_mobile: optional boolean

[Link to this property](#)

os: optional string

[Link to this property](#)

os_version: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

events: optional array of object { metadata, name, timestamp }

</summary>

<details>

<summary>

metadata: optional map[string or number or boolean]

Event-specific metadata. Keys vary per event; values are primitive scalars (string, number, boolean, or null).

</summary>

One of the following:

string

[Link to this property](#)

number

[Link to this property](#)

boolean

[Link to this property](#)

</details>

[Link to this property](#)

name: optional string

Name of the event.

[Link to this property](#)

timestamp: optional string

Timestamp when the event occurred.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ip_information: optional object { asn, city, country, 4 more }

</summary>

<details>

<summary>

asn: optional object { asn, domain, name, 2 more }

</summary>

asn: optional string

[Link to this property](#)

domain: optional string

[Link to this property](#)

name: optional string

[Link to this property](#)

route: optional string

[Link to this property](#)

type: optional string

[Link to this property](#)

</details>

[Link to this property](#)

city: optional string

[Link to this property](#)

country: optional string

[Link to this property](#)

ipv4: optional string

[Link to this property](#)

org: optional string

[Link to this property](#)

region: optional string

[Link to this property](#)

timezone: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

native_metadata: optional object { audio_encoder, video_encoder }

</summary>

audio_encoder: optional string

[Link to this property](#)

video_encoder: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

pc_metadata: optional array of object { effective_network_type, reflexive_connectivity, relay_connectivity, 3 more }

</summary>

effective_network_type: optional string

[Link to this property](#)

reflexive_connectivity: optional boolean

[Link to this property](#)

relay_connectivity: optional boolean

[Link to this property](#)

sdp: optional array of string

[Link to this property](#)

timestamp: optional string

[Link to this property](#)

turn_connectivity: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

room_view_type: optional string

[Link to this property](#)

sdk_name: optional string

[Link to this property](#)

sdk_type: optional string

[Link to this property](#)

sdk_version: optional string

[Link to this property](#)

<details>

<summary>

selected_device_updates: optional array of object { device, timestamp }

</summary>

<details>

<summary>

device: optional object { device_id, kind, label }

A media device (camera, microphone, or speaker).

</summary>

device_id: optional string

ID of the device.

[Link to this property](#)

kind: optional string

Kind of device, for example audioinput or videoinput.

[Link to this property](#)

label: optional string

Human-readable label of the device.

[Link to this property](#)

</details>

[Link to this property](#)

timestamp: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

speaker_devices_updates: optional array of object { added, removed, timestamp }

</summary>

<details>

<summary>

added: optional array of object { device_id, kind, label }

Devices that became available.

</summary>

device_id: optional string

ID of the device.

[Link to this property](#)

kind: optional string

Kind of device, for example audioinput or videoinput.

[Link to this property](#)

label: optional string

Human-readable label of the device.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

removed: optional array of object { device_id, kind, label }

Devices that became unavailable.

</summary>

device_id: optional string

ID of the device.

[Link to this property](#)

kind: optional string

Kind of device, for example audioinput or videoinput.

[Link to this property](#)

label: optional string

Human-readable label of the device.

[Link to this property](#)

</details>

[Link to this property](#)

timestamp: optional string

Timestamp of the device update.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

video_devices_updates: optional array of object { added, removed, timestamp }

</summary>

<details>

<summary>

added: optional array of object { device_id, kind, label }

Devices that became available.

</summary>

device_id: optional string

ID of the device.

[Link to this property](#)

kind: optional string

Kind of device, for example audioinput or videoinput.

[Link to this property](#)

label: optional string

Human-readable label of the device.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

removed: optional array of object { device_id, kind, label }

Devices that became unavailable.

</summary>

device_id: optional string

ID of the device.

[Link to this property](#)

kind: optional string

Kind of device, for example audioinput or videoinput.

[Link to this property](#)

label: optional string

Human-readable label of the device.

[Link to this property](#)

</details>

[Link to this property](#)

timestamp: optional string

Timestamp of the device update.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

quality: optional object { audio_consumer, audio_consumer_cumulative, audio_producer, 13 more }

Media quality statistics for the participant.

</summary>

<details>

<summary>

audio_consumer: optional array of object { bytes_received, concealment_events, consumer_id, 11 more }

</summary>

bytes_received: optional number

[Link to this property](#)

concealment_events: optional number

[Link to this property](#)

consumer_id: optional string

[Link to this property](#)

jitter: optional number

[Link to this property](#)

jitter_buffer_delay: optional number

[Link to this property](#)

jitter_buffer_emitted_count: optional number

[Link to this property](#)

mid: optional string

[Link to this property](#)

mos_quality: optional number

[Link to this property](#)

packets_lost: optional number

[Link to this property](#)

packets_received: optional number

[Link to this property](#)

peer_id: optional string

[Link to this property](#)

producer_id: optional string

[Link to this property](#)

ssrc: optional number

[Link to this property](#)

timestamp: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

audio_consumer_cumulative: optional object { jitter_buffer_delay, packet_loss, quality_mos }

Aggregated inbound (consumer) audio statistics for the session.

</summary>

<details>

<summary>

jitter_buffer_delay: optional object { "100ms_or_greater_event_fraction", "250ms_or_greater_event_fraction", "500ms_or_greater_event_fraction", avg }

Cumulative latency distribution (milliseconds-based thresholds).

</summary>

"100ms_or_greater_event_fraction": optional number

[Link to this property](#)

"250ms_or_greater_event_fraction": optional number

[Link to this property](#)

"500ms_or_greater_event_fraction": optional number

[Link to this property](#)

avg: optional number

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

packet_loss: optional object { "10_or_greater_event_fraction", "25_or_greater_event_fraction", "5_or_greater_event_fraction", 2 more }

Cumulative packet loss distribution.

</summary>

"10_or_greater_event_fraction": optional number

[Link to this property](#)

"25_or_greater_event_fraction": optional number

[Link to this property](#)

"5_or_greater_event_fraction": optional number

[Link to this property](#)

"50_or_greater_event_fraction": optional number

[Link to this property](#)

avg: optional number

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

quality_mos: optional object { avg, p50, p75, p90 }

Distribution summary with average and percentiles.

</summary>

avg: optional number

[Link to this property](#)

p50: optional number

[Link to this property](#)

p75: optional number

[Link to this property](#)

p90: optional number

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

audio_producer: optional array of object { bytes_sent, jitter, mid, 7 more }

</summary>

bytes_sent: optional number

[Link to this property](#)

jitter: optional number

[Link to this property](#)

mid: optional string

[Link to this property](#)

mos_quality: optional number

[Link to this property](#)

packets_lost: optional number

[Link to this property](#)

packets_sent: optional number

[Link to this property](#)

producer_id: optional string

[Link to this property](#)

rtt: optional number

[Link to this property](#)

ssrc: optional number

[Link to this property](#)

timestamp: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

audio_producer_cumulative: optional object { packet_loss, quality_mos, rtt }

Aggregated outbound (producer) audio statistics for the session.

</summary>

<details>

<summary>

packet_loss: optional object { "10_or_greater_event_fraction", "25_or_greater_event_fraction", "5_or_greater_event_fraction", 2 more }

Cumulative packet loss distribution.

</summary>

"10_or_greater_event_fraction": optional number

[Link to this property](#)

"25_or_greater_event_fraction": optional number

[Link to this property](#)

"5_or_greater_event_fraction": optional number

[Link to this property](#)

"50_or_greater_event_fraction": optional number

[Link to this property](#)

avg: optional number

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

quality_mos: optional object { avg, p50, p75, p90 }

Distribution summary with average and percentiles.

</summary>

avg: optional number

[Link to this property](#)

p50: optional number

[Link to this property](#)

p75: optional number

[Link to this property](#)

p90: optional number

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

rtt: optional object { "100ms_or_greater_event_fraction", "250ms_or_greater_event_fraction", "500ms_or_greater_event_fraction", avg }

Cumulative latency distribution (milliseconds-based thresholds).

</summary>

"100ms_or_greater_event_fraction": optional number

[Link to this property](#)

"250ms_or_greater_event_fraction": optional number

[Link to this property](#)

"500ms_or_greater_event_fraction": optional number

[Link to this property](#)

avg: optional number

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

screenshare_audio_consumer: optional array of object { bytes_received, concealment_events, consumer_id, 11 more }

</summary>

bytes_received: optional number

[Link to this property](#)

concealment_events: optional number

[Link to this property](#)

consumer_id: optional string

[Link to this property](#)

jitter: optional number

[Link to this property](#)

jitter_buffer_delay: optional number

[Link to this property](#)

jitter_buffer_emitted_count: optional number

[Link to this property](#)

mid: optional string

[Link to this property](#)

mos_quality: optional number

[Link to this property](#)

packets_lost: optional number

[Link to this property](#)

packets_received: optional number

[Link to this property](#)

peer_id: optional string

[Link to this property](#)

producer_id: optional string

[Link to this property](#)

ssrc: optional number

[Link to this property](#)

timestamp: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

screenshare_audio_consumer_cumulative: optional object { jitter_buffer_delay, packet_loss, quality_mos }

Aggregated inbound (consumer) audio statistics for the session.

</summary>

<details>

<summary>

jitter_buffer_delay: optional object { "100ms_or_greater_event_fraction", "250ms_or_greater_event_fraction", "500ms_or_greater_event_fraction", avg }

Cumulative latency distribution (milliseconds-based thresholds).

</summary>

"100ms_or_greater_event_fraction": optional number

[Link to this property](#)

"250ms_or_greater_event_fraction": optional number

[Link to this property](#)

"500ms_or_greater_event_fraction": optional number

[Link to this property](#)

avg: optional number

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

packet_loss: optional object { "10_or_greater_event_fraction", "25_or_greater_event_fraction", "5_or_greater_event_fraction", 2 more }

Cumulative packet loss distribution.

</summary>

"10_or_greater_event_fraction": optional number

[Link to this property](#)

"25_or_greater_event_fraction": optional number

[Link to this property](#)

"5_or_greater_event_fraction": optional number

[Link to this property](#)

"50_or_greater_event_fraction": optional number

[Link to this property](#)

avg: optional number

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

quality_mos: optional object { avg, p50, p75, p90 }

Distribution summary with average and percentiles.

</summary>

avg: optional number

[Link to this property](#)

p50: optional number

[Link to this property](#)

p75: optional number

[Link to this property](#)

p90: optional number

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

screenshare_audio_producer: optional array of object { bytes_sent, jitter, mid, 7 more }

</summary>

bytes_sent: optional number

[Link to this property](#)

jitter: optional number

[Link to this property](#)

mid: optional string

[Link to this property](#)

mos_quality: optional number

[Link to this property](#)

packets_lost: optional number

[Link to this property](#)

packets_sent: optional number

[Link to this property](#)

producer_id: optional string

[Link to this property](#)

rtt: optional number

[Link to this property](#)

ssrc: optional number

[Link to this property](#)

timestamp: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

screenshare_audio_producer_cumulative: optional object { packet_loss, quality_mos, rtt }

Aggregated outbound (producer) audio statistics for the session.

</summary>

<details>

<summary>

packet_loss: optional object { "10_or_greater_event_fraction", "25_or_greater_event_fraction", "5_or_greater_event_fraction", 2 more }

Cumulative packet loss distribution.

</summary>

"10_or_greater_event_fraction": optional number

[Link to this property](#)

"25_or_greater_event_fraction": optional number

[Link to this property](#)

"5_or_greater_event_fraction": optional number

[Link to this property](#)

"50_or_greater_event_fraction": optional number

[Link to this property](#)

avg: optional number

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

quality_mos: optional object { avg, p50, p75, p90 }

Distribution summary with average and percentiles.

</summary>

avg: optional number

[Link to this property](#)

p50: optional number

[Link to this property](#)

p75: optional number

[Link to this property](#)

p90: optional number

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

rtt: optional object { "100ms_or_greater_event_fraction", "250ms_or_greater_event_fraction", "500ms_or_greater_event_fraction", avg }

Cumulative latency distribution (milliseconds-based thresholds).

</summary>

"100ms_or_greater_event_fraction": optional number

[Link to this property](#)

"250ms_or_greater_event_fraction": optional number

[Link to this property](#)

"500ms_or_greater_event_fraction": optional number

[Link to this property](#)

avg: optional number

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

screenshare_video_consumer: optional array of object { bytes_received, consumer_id, fir_count, 17 more }

</summary>

bytes_received: optional number

[Link to this property](#)

consumer_id: optional string

[Link to this property](#)

fir_count: optional number

[Link to this property](#)

frame_height: optional number

[Link to this property](#)

frame_width: optional number

[Link to this property](#)

frames_decoded: optional number

[Link to this property](#)

frames_dropped: optional number

[Link to this property](#)

frames_per_second: optional number

[Link to this property](#)

jitter: optional number

[Link to this property](#)

jitter_buffer_delay: optional number

[Link to this property](#)

jitter_buffer_emitted_count: optional number

[Link to this property](#)

key_frames_decoded: optional number

[Link to this property](#)

mid: optional string

[Link to this property](#)

mos_quality: optional number

[Link to this property](#)

packets_lost: optional number

[Link to this property](#)

packets_received: optional number

[Link to this property](#)

peer_id: optional string

[Link to this property](#)

producer_id: optional string

[Link to this property](#)

ssrc: optional number

[Link to this property](#)

timestamp: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

screenshare_video_consumer_cumulative: optional object { frame_per_second, frame_width, issues, 4 more }

Aggregated inbound (consumer) video statistics for the session.

</summary>

<details>

<summary>

frame_per_second: optional object { avg, p50, p75, p90 }

Distribution summary with average and percentiles.

</summary>

avg: optional number

[Link to this property](#)

p50: optional number

[Link to this property](#)

p75: optional number

[Link to this property](#)

p90: optional number

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

frame_width: optional object { avg, p50, p75, p90 }

Distribution summary with average and percentiles.

</summary>

avg: optional number

[Link to this property](#)

p50: optional number

[Link to this property](#)

p75: optional number

[Link to this property](#)

p90: optional number

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

issues: optional object { lag_fraction, no_video_fraction, poor_resolution_fraction }

</summary>

lag_fraction: optional number

[Link to this property](#)

no_video_fraction: optional number

[Link to this property](#)

poor_resolution_fraction: optional number

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

jitter_buffer_delay: optional object { "100ms_or_greater_event_fraction", "250ms_or_greater_event_fraction", "500ms_or_greater_event_fraction", avg }

Cumulative latency distribution (milliseconds-based thresholds).

</summary>

"100ms_or_greater_event_fraction": optional number

[Link to this property](#)

"250ms_or_greater_event_fraction": optional number

[Link to this property](#)

"500ms_or_greater_event_fraction": optional number

[Link to this property](#)

avg: optional number

[Link to this property](#)

</details>

[Link to this property](#)

key_frames_decoded_fraction: optional number

[Link to this property](#)

<details>

<summary>

packet_loss: optional object { "10_or_greater_event_fraction", "25_or_greater_event_fraction", "5_or_greater_event_fraction", 2 more }

Cumulative packet loss distribution.

</summary>

"10_or_greater_event_fraction": optional number

[Link to this property](#)

"25_or_greater_event_fraction": optional number

[Link to this property](#)

"5_or_greater_event_fraction": optional number

[Link to this property](#)

"50_or_greater_event_fraction": optional number

[Link to this property](#)

avg: optional number

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

quality_mos: optional object { avg, p50, p75, p90 }

Distribution summary with average and percentiles.

</summary>

avg: optional number

[Link to this property](#)

p50: optional number

[Link to this property](#)

p75: optional number

[Link to this property](#)

p90: optional number

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

screenshare_video_producer: optional array of object { bytes_sent, fir_count, frame_height, 17 more }

</summary>

bytes_sent: optional number

[Link to this property](#)

fir_count: optional number

[Link to this property](#)

frame_height: optional number

[Link to this property](#)

frame_width: optional number

[Link to this property](#)

frames_encoded: optional number

[Link to this property](#)

frames_per_second: optional number

[Link to this property](#)

jitter: optional number

[Link to this property](#)

key_frames_encoded: optional number

[Link to this property](#)

mid: optional string

[Link to this property](#)

mos_quality: optional number

[Link to this property](#)

packets_lost: optional number

[Link to this property](#)

packets_sent: optional number

[Link to this property](#)

pli_count: optional number

[Link to this property](#)

producer_id: optional string

[Link to this property](#)

<details>

<summary>

quality_limitation_durations: optional object { bandwidth, cpu, none, other }

</summary>

bandwidth: optional number

[Link to this property](#)

cpu: optional number

[Link to this property](#)

none: optional number

[Link to this property](#)

other: optional number

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

quality_limitation_reason: optional "cpu" or "bandwidth" or "none" or "other"

</summary>

One of the following:

"cpu"

[Link to this property](#)

"bandwidth"

[Link to this property](#)

"none"

[Link to this property](#)

"other"

[Link to this property](#)

</details>

[Link to this property](#)

quality_limitation_resolution_changes: optional number

[Link to this property](#)

rtt: optional number

[Link to this property](#)

ssrc: optional number

[Link to this property](#)

timestamp: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

screenshare_video_producer_cumulative: optional object { frame_per_second, frame_width, high_negative_feedback_fraction, 5 more }

Aggregated outbound (producer) video statistics for the session.

</summary>

<details>

<summary>

frame_per_second: optional object { avg, p50, p75, p90 }

Distribution summary with average and percentiles.

</summary>

avg: optional number

[Link to this property](#)

p50: optional number

[Link to this property](#)

p75: optional number

[Link to this property](#)

p90: optional number

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

frame_width: optional object { avg, p50, p75, p90 }

Distribution summary with average and percentiles.

</summary>

avg: optional number

[Link to this property](#)

p50: optional number

[Link to this property](#)

p75: optional number

[Link to this property](#)

p90: optional number

[Link to this property](#)

</details>

[Link to this property](#)

high_negative_feedback_fraction: optional number

[Link to this property](#)

<details>

<summary>

issues: optional object { bandwidth_quality_limitation_fraction, cpu_quality_limitation_fraction, no_video_fraction, 2 more }

</summary>

bandwidth_quality_limitation_fraction: optional number

[Link to this property](#)

cpu_quality_limitation_fraction: optional number

[Link to this property](#)

no_video_fraction: optional number

[Link to this property](#)

poor_resolution_fraction: optional number

[Link to this property](#)

quality_limitation_fraction: optional number

[Link to this property](#)

</details>

[Link to this property](#)

key_frames_encoded_fraction: optional number

[Link to this property](#)

<details>

<summary>

packet_loss: optional object { "10_or_greater_event_fraction", "25_or_greater_event_fraction", "5_or_greater_event_fraction", 2 more }

Cumulative packet loss distribution.

</summary>

"10_or_greater_event_fraction": optional number

[Link to this property](#)

"25_or_greater_event_fraction": optional number

[Link to this property](#)

"5_or_greater_event_fraction": optional number

[Link to this property](#)

"50_or_greater_event_fraction": optional number

[Link to this property](#)

avg: optional number

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

quality_mos: optional object { avg, p50, p75, p90 }

Distribution summary with average and percentiles.

</summary>

avg: optional number

[Link to this property](#)

p50: optional number

[Link to this property](#)

p75: optional number

[Link to this property](#)

p90: optional number

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

rtt: optional object { "100ms_or_greater_event_fraction", "250ms_or_greater_event_fraction", "500ms_or_greater_event_fraction", avg }

Cumulative latency distribution (milliseconds-based thresholds).

</summary>

"100ms_or_greater_event_fraction": optional number

[Link to this property](#)

"250ms_or_greater_event_fraction": optional number

[Link to this property](#)

"500ms_or_greater_event_fraction": optional number

[Link to this property](#)

avg: optional number

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

video_consumer: optional array of object { bytes_received, consumer_id, fir_count, 17 more }

</summary>

bytes_received: optional number

[Link to this property](#)

consumer_id: optional string

[Link to this property](#)

fir_count: optional number

[Link to this property](#)

frame_height: optional number

[Link to this property](#)

frame_width: optional number

[Link to this property](#)

frames_decoded: optional number

[Link to this property](#)

frames_dropped: optional number

[Link to this property](#)

frames_per_second: optional number

[Link to this property](#)

jitter: optional number

[Link to this property](#)

jitter_buffer_delay: optional number

[Link to this property](#)

jitter_buffer_emitted_count: optional number

[Link to this property](#)

key_frames_decoded: optional number

[Link to this property](#)

mid: optional string

[Link to this property](#)

mos_quality: optional number

[Link to this property](#)

packets_lost: optional number

[Link to this property](#)

packets_received: optional number

[Link to this property](#)

peer_id: optional string

[Link to this property](#)

producer_id: optional string

[Link to this property](#)

ssrc: optional number

[Link to this property](#)

timestamp: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

video_consumer_cumulative: optional object { frame_per_second, frame_width, issues, 4 more }

Aggregated inbound (consumer) video statistics for the session.

</summary>

<details>

<summary>

frame_per_second: optional object { avg, p50, p75, p90 }

Distribution summary with average and percentiles.

</summary>

avg: optional number

[Link to this property](#)

p50: optional number

[Link to this property](#)

p75: optional number

[Link to this property](#)

p90: optional number

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

frame_width: optional object { avg, p50, p75, p90 }

Distribution summary with average and percentiles.

</summary>

avg: optional number

[Link to this property](#)

p50: optional number

[Link to this property](#)

p75: optional number

[Link to this property](#)

p90: optional number

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

issues: optional object { lag_fraction, no_video_fraction, poor_resolution_fraction }

</summary>

lag_fraction: optional number

[Link to this property](#)

no_video_fraction: optional number

[Link to this property](#)

poor_resolution_fraction: optional number

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

jitter_buffer_delay: optional object { "100ms_or_greater_event_fraction", "250ms_or_greater_event_fraction", "500ms_or_greater_event_fraction", avg }

Cumulative latency distribution (milliseconds-based thresholds).

</summary>

"100ms_or_greater_event_fraction": optional number

[Link to this property](#)

"250ms_or_greater_event_fraction": optional number

[Link to this property](#)

"500ms_or_greater_event_fraction": optional number

[Link to this property](#)

avg: optional number

[Link to this property](#)

</details>

[Link to this property](#)

key_frames_decoded_fraction: optional number

[Link to this property](#)

<details>

<summary>

packet_loss: optional object { "10_or_greater_event_fraction", "25_or_greater_event_fraction", "5_or_greater_event_fraction", 2 more }

Cumulative packet loss distribution.

</summary>

"10_or_greater_event_fraction": optional number

[Link to this property](#)

"25_or_greater_event_fraction": optional number

[Link to this property](#)

"5_or_greater_event_fraction": optional number

[Link to this property](#)

"50_or_greater_event_fraction": optional number

[Link to this property](#)

avg: optional number

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

quality_mos: optional object { avg, p50, p75, p90 }

Distribution summary with average and percentiles.

</summary>

avg: optional number

[Link to this property](#)

p50: optional number

[Link to this property](#)

p75: optional number

[Link to this property](#)

p90: optional number

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

video_producer: optional array of object { bytes_sent, fir_count, frame_height, 17 more }

</summary>

bytes_sent: optional number

[Link to this property](#)

fir_count: optional number

[Link to this property](#)

frame_height: optional number

[Link to this property](#)

frame_width: optional number

[Link to this property](#)

frames_encoded: optional number

[Link to this property](#)

frames_per_second: optional number

[Link to this property](#)

jitter: optional number

[Link to this property](#)

key_frames_encoded: optional number

[Link to this property](#)

mid: optional string

[Link to this property](#)

mos_quality: optional number

[Link to this property](#)

packets_lost: optional number

[Link to this property](#)

packets_sent: optional number

[Link to this property](#)

pli_count: optional number

[Link to this property](#)

producer_id: optional string

[Link to this property](#)

<details>

<summary>

quality_limitation_durations: optional object { bandwidth, cpu, none, other }

</summary>

bandwidth: optional number

[Link to this property](#)

cpu: optional number

[Link to this property](#)

none: optional number

[Link to this property](#)

other: optional number

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

quality_limitation_reason: optional "cpu" or "bandwidth" or "none" or "other"

</summary>

One of the following:

"cpu"

[Link to this property](#)

"bandwidth"

[Link to this property](#)

"none"

[Link to this property](#)

"other"

[Link to this property](#)

</details>

[Link to this property](#)

quality_limitation_resolution_changes: optional number

[Link to this property](#)

rtt: optional number

[Link to this property](#)

ssrc: optional number

[Link to this property](#)

timestamp: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

video_producer_cumulative: optional object { frame_per_second, frame_width, high_negative_feedback_fraction, 5 more }

Aggregated outbound (producer) video statistics for the session.

</summary>

<details>

<summary>

frame_per_second: optional object { avg, p50, p75, p90 }

Distribution summary with average and percentiles.

</summary>

avg: optional number

[Link to this property](#)

p50: optional number

[Link to this property](#)

p75: optional number

[Link to this property](#)

p90: optional number

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

frame_width: optional object { avg, p50, p75, p90 }

Distribution summary with average and percentiles.

</summary>

avg: optional number

[Link to this property](#)

p50: optional number

[Link to this property](#)

p75: optional number

[Link to this property](#)

p90: optional number

[Link to this property](#)

</details>

[Link to this property](#)

high_negative_feedback_fraction: optional number

[Link to this property](#)

<details>

<summary>

issues: optional object { bandwidth_quality_limitation_fraction, cpu_quality_limitation_fraction, no_video_fraction, 2 more }

</summary>

bandwidth_quality_limitation_fraction: optional number

[Link to this property](#)

cpu_quality_limitation_fraction: optional number

[Link to this property](#)

no_video_fraction: optional number

[Link to this property](#)

poor_resolution_fraction: optional number

[Link to this property](#)

quality_limitation_fraction: optional number

[Link to this property](#)

</details>

[Link to this property](#)

key_frames_encoded_fraction: optional number

[Link to this property](#)

<details>

<summary>

packet_loss: optional object { "10_or_greater_event_fraction", "25_or_greater_event_fraction", "5_or_greater_event_fraction", 2 more }

Cumulative packet loss distribution.

</summary>

"10_or_greater_event_fraction": optional number

[Link to this property](#)

"25_or_greater_event_fraction": optional number

[Link to this property](#)

"5_or_greater_event_fraction": optional number

[Link to this property](#)

"50_or_greater_event_fraction": optional number

[Link to this property](#)

avg: optional number

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

quality_mos: optional object { avg, p50, p75, p90 }

Distribution summary with average and percentiles.

</summary>

avg: optional number

[Link to this property](#)

p50: optional number

[Link to this property](#)

p75: optional number

[Link to this property](#)

p90: optional number

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

rtt: optional object { "100ms_or_greater_event_fraction", "250ms_or_greater_event_fraction", "500ms_or_greater_event_fraction", avg }

Cumulative latency distribution (milliseconds-based thresholds).

</summary>

"100ms_or_greater_event_fraction": optional number

[Link to this property](#)

"250ms_or_greater_event_fraction": optional number

[Link to this property](#)

"500ms_or_greater_event_fraction": optional number

[Link to this property](#)

avg: optional number

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

role: optional string

Name of the preset associated with the participant.

[Link to this property](#)

session_id: optional string

formatuuid

[Link to this property](#)

updated_at: optional string

timestamp when this participant’s data was last updated.

[Link to this property](#)

user_id: optional string

User id for this participant.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

success: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

##### [Fetch all recordings for an App](/api/resources/realtime_kit/subresources/recordings/methods/get_recordings)

GET/accounts/{account_id}/realtime/kit/{app_id}/recordings

##### [Start recording a meeting](/api/resources/realtime_kit/subresources/recordings/methods/start_recordings)

POST/accounts/{account_id}/realtime/kit/{app_id}/recordings

##### [Fetch active recording](/api/resources/realtime_kit/subresources/recordings/methods/get_active_recordings)

GET/accounts/{account_id}/realtime/kit/{app_id}/recordings/active-recording/{meeting_id}

##### [Fetch details of a recording](/api/resources/realtime_kit/subresources/recordings/methods/get_one_recording)

GET/accounts/{account_id}/realtime/kit/{app_id}/recordings/{recording_id}

##### [Pause/Resume/Stop recording](/api/resources/realtime_kit/subresources/recordings/methods/pause_resume_stop_recording)

PUT/accounts/{account_id}/realtime/kit/{app_id}/recordings/{recording_id}

##### [Start recording participant audio tracks](/api/resources/realtime_kit/subresources/recordings/methods/start_track_recording)

POST/accounts/{account_id}/realtime/kit/{app_id}/recordings/track

##### Models

<details>

<summary>

RecordingGetRecordingsResponse object { data, paging, success }

</summary>

<details>

<summary>

data: array of object { id, audio_download_url, download_url, 11 more }

</summary>

id: string

ID of the recording

formatuuid

[Link to this property](#)

audio_download_url: string

If the audio_config is passed, the URL for downloading the audio recording is returned.

formaturi

[Link to this property](#)

download_url: string

URL where the recording can be downloaded.

formaturi

[Link to this property](#)

download_url_expiry: string

Timestamp when the download URL expires.

formatdate-time

[Link to this property](#)

file_size: number

File size of the recording, in bytes.

[Link to this property](#)

invoked_time: string

Timestamp when this recording was invoked.

formatdate-time

[Link to this property](#)

output_file_name: string

File name of the recording.

[Link to this property](#)

session_id: string

ID of the meeting session this recording is for.

formatuuid

[Link to this property](#)

started_time: string

Timestamp when this recording actually started after being invoked. Usually a few seconds after `invoked_time`.

formatdate-time

[Link to this property](#)

<details>

<summary>

status: "INVOKED" or "RECORDING" or "UPLOADING" or 3 more

Current status of the recording.

</summary>

One of the following:

"INVOKED"

[Link to this property](#)

"RECORDING"

[Link to this property](#)

"UPLOADING"

[Link to this property](#)

"UPLOADED"

[Link to this property](#)

"ERRORED"

[Link to this property](#)

"PAUSED"

[Link to this property](#)

</details>

[Link to this property](#)

stopped_time: string

Timestamp when this recording was stopped. Optional; is present only when the recording has actually been stopped.

formatdate-time

[Link to this property](#)

<details>

<summary>

meeting: optional object { id, created_at, updated_at, 9 more }

</summary>

id: string

ID of the meeting.

formatuuid

[Link to this property](#)

created_at: string

Timestamp the object was created at. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

updated_at: string

Timestamp the object was updated at. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

live_stream_on_start: optional boolean

Specifies if the meeting should start getting livestreamed on start.

[Link to this property](#)

persist_chat: optional boolean

Specifies if Chat within a meeting should persist for a week.

[Link to this property](#)

record_on_start: optional boolean

Specifies if the meeting should start getting recorded as soon as someone joins the meeting.

[Link to this property](#)

<details>

<summary>

recording_config: optional object { audio_config, file_name_prefix, live_streaming_config, 4 more }

Recording Configurations to be used for this meeting. This level of configs takes higher preference over App level configs on the RealtimeKit developer portal.

</summary>

<details>

<summary>

audio_config: optional object { channel, codec, export_file }

Object containing configuration regarding the audio that is being recorded.

</summary>

<details>

<summary>

channel: optional "mono" or "stereo"

Audio signal pathway within an audio file that carries a specific sound source.

</summary>

One of the following:

"mono"

[Link to this property](#)

"stereo"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

codec: optional "MP3" or "AAC"

Codec using which the recording will be encoded. If VP8/VP9 is selected for videoConfig, changing audioConfig is not allowed. In this case, the codec in the audioConfig is automatically set to vorbis.

</summary>

One of the following:

"MP3"

[Link to this property](#)

"AAC"

[Link to this property](#)

</details>

[Link to this property](#)

export_file: optional boolean

Controls whether to export audio file seperately

[Link to this property](#)

</details>

[Link to this property](#)

file_name_prefix: optional string

Adds a prefix to the beginning of the file name of the recording.

[Link to this property](#)

<details>

<summary>

live_streaming_config: optional object { rtmp_url }

</summary>

rtmp_url: optional string

RTMP URL to stream to

formaturi

[Link to this property](#)

</details>

[Link to this property](#)

max_seconds: optional number

Specifies the maximum duration for recording in seconds, ranging from a minimum of 60 seconds to a maximum of 24 hours.

maximum86400

minimum60

[Link to this property](#)

<details>

<summary>

realtimekit_bucket_config: optional object { enabled }

</summary>

enabled: boolean

Controls whether recordings are uploaded to RealtimeKit’s bucket. If set to false, `download_url`, `audio_download_url`, `download_url_expiry` won’t be generated for a recording.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

storage_config: optional object { access_key, auth_method, bucket, 9 more } or object { access_key, region, auth_method, 9 more } or object { private_key, access_key, auth_method, 9 more } or object { password, access_key, auth_method, 9 more }

</summary>

One of the following:

<details>

<summary>

object { access_key, auth_method, bucket, 9 more }

</summary>

access_key: optional string

Access key of the storage medium. Access key is not required for the `gcs` storage media type.

Note that this field is not readable by clients, only writeable.

[Link to this property](#)

<details>

<summary>

auth_method: optional "KEY" or "PASSWORD"

Authentication method used for “sftp” type storage medium

</summary>

One of the following:

"KEY"

[Link to this property](#)

"PASSWORD"

[Link to this property](#)

</details>

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

password: optional string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

private_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

region: optional string

Region of the storage medium.

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

type: optional "gcs"

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { access_key, region, auth_method, 9 more }

</summary>

access_key: unknown

minLength1

[Link to this property](#)

region: unknown

minLength1

[Link to this property](#)

<details>

<summary>

auth_method: optional "KEY" or "PASSWORD"

Authentication method used for “sftp” type storage medium

</summary>

One of the following:

"KEY"

[Link to this property](#)

"PASSWORD"

[Link to this property](#)

</details>

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

password: optional string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

private_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

<details>

<summary>

type: optional "aws" or "azure" or "digitalocean"

</summary>

One of the following:

"aws"

[Link to this property](#)

"azure"

[Link to this property](#)

"digitalocean"

[Link to this property](#)

</details>

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { private_key, access_key, auth_method, 9 more }

</summary>

private_key: string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

access_key: optional string

Access key of the storage medium. Access key is not required for the `gcs` storage media type.

Note that this field is not readable by clients, only writeable.

[Link to this property](#)

auth_method: optional "KEY"

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

password: optional string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

region: optional string

Region of the storage medium.

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

<details>

<summary>

type: optional "aws" or "azure" or "digitalocean" or 2 more

Type of storage media.

</summary>

One of the following:

"aws"

[Link to this property](#)

"azure"

[Link to this property](#)

"digitalocean"

[Link to this property](#)

"gcs"

[Link to this property](#)

"sftp"

[Link to this property](#)

</details>

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { password, access_key, auth_method, 9 more }

</summary>

password: string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

access_key: optional string

Access key of the storage medium. Access key is not required for the `gcs` storage media type.

Note that this field is not readable by clients, only writeable.

[Link to this property](#)

auth_method: optional "PASSWORD"

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

private_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

region: optional string

Region of the storage medium.

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

<details>

<summary>

type: optional "aws" or "azure" or "digitalocean" or 2 more

Type of storage media.

</summary>

One of the following:

"aws"

[Link to this property](#)

"azure"

[Link to this property](#)

"digitalocean"

[Link to this property](#)

"gcs"

[Link to this property](#)

"sftp"

[Link to this property](#)

</details>

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

video_config: optional object { codec, export_file, height, 2 more }

</summary>

<details>

<summary>

codec: optional "H264" or "VP8" or "VP9"

Codec using which the recording will be encoded.

</summary>

One of the following:

"H264"

[Link to this property](#)

"VP8"

[Link to this property](#)

"VP9"

[Link to this property](#)

</details>

[Link to this property](#)

export_file: optional boolean

Controls whether to export video file seperately

[Link to this property](#)

height: optional number

Height of the recording video in pixels

maximum1920

minimum1

[Link to this property](#)

<details>

<summary>

watermark: optional object { position, size, url }

Watermark to be added to the recording

</summary>

<details>

<summary>

position: optional "left top" or "right top" or "left bottom" or "right bottom"

Position of the watermark

</summary>

One of the following:

"left top"

[Link to this property](#)

"right top"

[Link to this property](#)

"left bottom"

[Link to this property](#)

"right bottom"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

size: optional object { height, width }

Size of the watermark

</summary>

height: optional number

Height of the watermark in px

minimum1

[Link to this property](#)

width: optional number

Width of the watermark in px

minimum1

[Link to this property](#)

</details>

[Link to this property](#)

url: optional string

URL of the watermark image

formaturi

[Link to this property](#)

</details>

[Link to this property](#)

width: optional number

Width of the recording video in pixels

maximum1920

minimum1

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

session_keep_alive_time_in_secs: optional number

Time in seconds, for which a session remains active, after the last participant has left the meeting.

maximum600

minimum60

[Link to this property](#)

<details>

<summary>

status: optional "ACTIVE" or "INACTIVE"

Whether the meeting is `ACTIVE` or `INACTIVE`. Users will not be able to join an `INACTIVE` meeting.

</summary>

One of the following:

"ACTIVE"

[Link to this property](#)

"INACTIVE"

[Link to this property](#)

</details>

[Link to this property](#)

summarize_on_end: optional boolean

Automatically generate summary of meetings using transcripts. Requires Transcriptions to be enabled, and can be retrieved via Webhooks or summary API.

[Link to this property](#)

title: optional string

Title of the meeting.

[Link to this property](#)

transcribe_on_end: optional boolean

Automatically generate transcripts when the meeting ends.

[Link to this property](#)

</details>

[Link to this property](#)

recording_duration: optional number

Total recording time in seconds.

[Link to this property](#)

<details>

<summary>

storage_config: optional object { access_key, auth_method, bucket, 9 more } or object { access_key, region, auth_method, 9 more } or object { private_key, access_key, auth_method, 9 more } or object { password, access_key, auth_method, 9 more }

</summary>

One of the following:

<details>

<summary>

object { access_key, auth_method, bucket, 9 more }

</summary>

access_key: optional string

Access key of the storage medium. Access key is not required for the `gcs` storage media type.

Note that this field is not readable by clients, only writeable.

[Link to this property](#)

<details>

<summary>

auth_method: optional "KEY" or "PASSWORD"

Authentication method used for “sftp” type storage medium

</summary>

One of the following:

"KEY"

[Link to this property](#)

"PASSWORD"

[Link to this property](#)

</details>

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

password: optional string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

private_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

region: optional string

Region of the storage medium.

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

type: optional "gcs"

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { access_key, region, auth_method, 9 more }

</summary>

access_key: unknown

minLength1

[Link to this property](#)

region: unknown

minLength1

[Link to this property](#)

<details>

<summary>

auth_method: optional "KEY" or "PASSWORD"

Authentication method used for “sftp” type storage medium

</summary>

One of the following:

"KEY"

[Link to this property](#)

"PASSWORD"

[Link to this property](#)

</details>

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

password: optional string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

private_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

<details>

<summary>

type: optional "aws" or "azure" or "digitalocean"

</summary>

One of the following:

"aws"

[Link to this property](#)

"azure"

[Link to this property](#)

"digitalocean"

[Link to this property](#)

</details>

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { private_key, access_key, auth_method, 9 more }

</summary>

private_key: string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

access_key: optional string

Access key of the storage medium. Access key is not required for the `gcs` storage media type.

Note that this field is not readable by clients, only writeable.

[Link to this property](#)

auth_method: optional "KEY"

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

password: optional string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

region: optional string

Region of the storage medium.

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

<details>

<summary>

type: optional "aws" or "azure" or "digitalocean" or 2 more

Type of storage media.

</summary>

One of the following:

"aws"

[Link to this property](#)

"azure"

[Link to this property](#)

"digitalocean"

[Link to this property](#)

"gcs"

[Link to this property](#)

"sftp"

[Link to this property](#)

</details>

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { password, access_key, auth_method, 9 more }

</summary>

password: string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

access_key: optional string

Access key of the storage medium. Access key is not required for the `gcs` storage media type.

Note that this field is not readable by clients, only writeable.

[Link to this property](#)

auth_method: optional "PASSWORD"

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

private_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

region: optional string

Region of the storage medium.

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

<details>

<summary>

type: optional "aws" or "azure" or "digitalocean" or 2 more

Type of storage media.

</summary>

One of the following:

"aws"

[Link to this property](#)

"azure"

[Link to this property](#)

"digitalocean"

[Link to this property](#)

"gcs"

[Link to this property](#)

"sftp"

[Link to this property](#)

</details>

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

paging: object { end_offset, start_offset, total_count }

</summary>

end_offset: number

[Link to this property](#)

start_offset: number

[Link to this property](#)

total_count: number

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

success: boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RecordingStartRecordingsResponse object { success, data }

</summary>

success: boolean

Success status of the operation

[Link to this property](#)

<details>

<summary>

data: optional object { id, audio_download_url, download_url, 12 more }

Data returned by the operation

</summary>

id: string

ID of the recording

formatuuid

[Link to this property](#)

audio_download_url: string

If the audio_config is passed, the URL for downloading the audio recording is returned.

formaturi

[Link to this property](#)

download_url: string

URL where the recording can be downloaded.

formaturi

[Link to this property](#)

download_url_expiry: string

Timestamp when the download URL expires.

formatdate-time

[Link to this property](#)

file_size: number

File size of the recording, in bytes.

[Link to this property](#)

invoked_time: string

Timestamp when this recording was invoked.

formatdate-time

[Link to this property](#)

output_file_name: string

File name of the recording.

[Link to this property](#)

session_id: string

ID of the meeting session this recording is for.

formatuuid

[Link to this property](#)

started_time: string

Timestamp when this recording actually started after being invoked. Usually a few seconds after `invoked_time`.

formatdate-time

[Link to this property](#)

<details>

<summary>

status: "INVOKED" or "RECORDING" or "UPLOADING" or 3 more

Current status of the recording.

</summary>

One of the following:

"INVOKED"

[Link to this property](#)

"RECORDING"

[Link to this property](#)

"UPLOADING"

[Link to this property](#)

"UPLOADED"

[Link to this property](#)

"ERRORED"

[Link to this property](#)

"PAUSED"

[Link to this property](#)

</details>

[Link to this property](#)

stopped_time: string

Timestamp when this recording was stopped. Optional; is present only when the recording has actually been stopped.

formatdate-time

[Link to this property](#)

recording_duration: optional number

Total recording time in seconds.

[Link to this property](#)

<details>

<summary>

start_reason: optional object { caller, reason }

</summary>

<details>

<summary>

caller: optional object { name, type, user_Id }

</summary>

name: optional string

Name of the user who started the recording.

[Link to this property](#)

<details>

<summary>

type: optional "ORGANIZATION" or "USER"

The type can be an App or a user. If the type is `user`, then only the `user_Id` and `name` are returned.

</summary>

One of the following:

"ORGANIZATION"

[Link to this property](#)

"USER"

[Link to this property](#)

</details>

[Link to this property](#)

user_Id: optional string

The user ID of the person who started the recording.

formatuuid

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

reason: optional "API_CALL" or "RECORD_ON_START"

Specifies if the recording was started using the “Start a Recording”API or using the parameter RECORD_ON_START in the “Create a meeting” API.

If the recording is initiated using the “RECORD_ON_START” parameter, the user details will not be populated.

</summary>

One of the following:

"API_CALL"

[Link to this property](#)

"RECORD_ON_START"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

stop_reason: optional object { caller, reason }

</summary>

<details>

<summary>

caller: optional object { name, type, user_Id }

</summary>

name: optional string

Name of the user who stopped the recording.

[Link to this property](#)

<details>

<summary>

type: optional "ORGANIZATION" or "USER"

The type can be an App or a user. If the type is `user`, then only the `user_Id` and `name` are returned.

</summary>

One of the following:

"ORGANIZATION"

[Link to this property](#)

"USER"

[Link to this property](#)

</details>

[Link to this property](#)

user_Id: optional string

The user ID of the person who stopped the recording.

formatuuid

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

reason: optional "API_CALL" or "INTERNAL_ERROR" or "ALL_PEERS_LEFT"

Specifies the reason why the recording stopped.

</summary>

One of the following:

"API_CALL"

[Link to this property](#)

"INTERNAL_ERROR"

[Link to this property](#)

"ALL_PEERS_LEFT"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

storage_config: optional object { access_key, auth_method, bucket, 9 more } or object { access_key, region, auth_method, 9 more } or object { private_key, access_key, auth_method, 9 more } or object { password, access_key, auth_method, 9 more }

</summary>

One of the following:

<details>

<summary>

object { access_key, auth_method, bucket, 9 more }

</summary>

access_key: optional string

Access key of the storage medium. Access key is not required for the `gcs` storage media type.

Note that this field is not readable by clients, only writeable.

[Link to this property](#)

<details>

<summary>

auth_method: optional "KEY" or "PASSWORD"

Authentication method used for “sftp” type storage medium

</summary>

One of the following:

"KEY"

[Link to this property](#)

"PASSWORD"

[Link to this property](#)

</details>

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

password: optional string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

private_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

region: optional string

Region of the storage medium.

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

type: optional "gcs"

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { access_key, region, auth_method, 9 more }

</summary>

access_key: unknown

minLength1

[Link to this property](#)

region: unknown

minLength1

[Link to this property](#)

<details>

<summary>

auth_method: optional "KEY" or "PASSWORD"

Authentication method used for “sftp” type storage medium

</summary>

One of the following:

"KEY"

[Link to this property](#)

"PASSWORD"

[Link to this property](#)

</details>

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

password: optional string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

private_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

<details>

<summary>

type: optional "aws" or "azure" or "digitalocean"

</summary>

One of the following:

"aws"

[Link to this property](#)

"azure"

[Link to this property](#)

"digitalocean"

[Link to this property](#)

</details>

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { private_key, access_key, auth_method, 9 more }

</summary>

private_key: string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

access_key: optional string

Access key of the storage medium. Access key is not required for the `gcs` storage media type.

Note that this field is not readable by clients, only writeable.

[Link to this property](#)

auth_method: optional "KEY"

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

password: optional string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

region: optional string

Region of the storage medium.

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

<details>

<summary>

type: optional "aws" or "azure" or "digitalocean" or 2 more

Type of storage media.

</summary>

One of the following:

"aws"

[Link to this property](#)

"azure"

[Link to this property](#)

"digitalocean"

[Link to this property](#)

"gcs"

[Link to this property](#)

"sftp"

[Link to this property](#)

</details>

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { password, access_key, auth_method, 9 more }

</summary>

password: string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

access_key: optional string

Access key of the storage medium. Access key is not required for the `gcs` storage media type.

Note that this field is not readable by clients, only writeable.

[Link to this property](#)

auth_method: optional "PASSWORD"

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

private_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

region: optional string

Region of the storage medium.

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

<details>

<summary>

type: optional "aws" or "azure" or "digitalocean" or 2 more

Type of storage media.

</summary>

One of the following:

"aws"

[Link to this property](#)

"azure"

[Link to this property](#)

"digitalocean"

[Link to this property](#)

"gcs"

[Link to this property](#)

"sftp"

[Link to this property](#)

</details>

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RecordingGetActiveRecordingsResponse object { data, success }

</summary>

<details>

<summary>

data: object { id, audio_download_url, download_url, 9 more }

Data returned by the operation

</summary>

id: string

ID of the recording

formatuuid

[Link to this property](#)

audio_download_url: string

If the audio_config is passed, the URL for downloading the audio recording is returned.

formaturi

[Link to this property](#)

download_url: string

URL where the recording can be downloaded.

formaturi

[Link to this property](#)

download_url_expiry: string

Timestamp when the download URL expires.

formatdate-time

[Link to this property](#)

file_size: number

File size of the recording, in bytes.

[Link to this property](#)

invoked_time: string

Timestamp when this recording was invoked.

formatdate-time

[Link to this property](#)

output_file_name: string

File name of the recording.

[Link to this property](#)

session_id: string

ID of the meeting session this recording is for.

formatuuid

[Link to this property](#)

started_time: string

Timestamp when this recording actually started after being invoked. Usually a few seconds after `invoked_time`.

formatdate-time

[Link to this property](#)

<details>

<summary>

status: "INVOKED" or "RECORDING" or "UPLOADING" or 3 more

Current status of the recording.

</summary>

One of the following:

"INVOKED"

[Link to this property](#)

"RECORDING"

[Link to this property](#)

"UPLOADING"

[Link to this property](#)

"UPLOADED"

[Link to this property](#)

"ERRORED"

[Link to this property](#)

"PAUSED"

[Link to this property](#)

</details>

[Link to this property](#)

stopped_time: string

Timestamp when this recording was stopped. Optional; is present only when the recording has actually been stopped.

formatdate-time

[Link to this property](#)

recording_duration: optional number

Total recording time in seconds.

[Link to this property](#)

</details>

[Link to this property](#)

success: boolean

Success status of the operation

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RecordingGetOneRecordingResponse object { success, data }

</summary>

success: boolean

Success status of the operation

[Link to this property](#)

<details>

<summary>

data: optional object { id, audio_download_url, download_url, 12 more }

Data returned by the operation

</summary>

id: string

ID of the recording

formatuuid

[Link to this property](#)

audio_download_url: string

If the audio_config is passed, the URL for downloading the audio recording is returned.

formaturi

[Link to this property](#)

download_url: string

URL where the recording can be downloaded.

formaturi

[Link to this property](#)

download_url_expiry: string

Timestamp when the download URL expires.

formatdate-time

[Link to this property](#)

file_size: number

File size of the recording, in bytes.

[Link to this property](#)

invoked_time: string

Timestamp when this recording was invoked.

formatdate-time

[Link to this property](#)

output_file_name: string

File name of the recording.

[Link to this property](#)

session_id: string

ID of the meeting session this recording is for.

formatuuid

[Link to this property](#)

started_time: string

Timestamp when this recording actually started after being invoked. Usually a few seconds after `invoked_time`.

formatdate-time

[Link to this property](#)

<details>

<summary>

status: "INVOKED" or "RECORDING" or "UPLOADING" or 3 more

Current status of the recording.

</summary>

One of the following:

"INVOKED"

[Link to this property](#)

"RECORDING"

[Link to this property](#)

"UPLOADING"

[Link to this property](#)

"UPLOADED"

[Link to this property](#)

"ERRORED"

[Link to this property](#)

"PAUSED"

[Link to this property](#)

</details>

[Link to this property](#)

stopped_time: string

Timestamp when this recording was stopped. Optional; is present only when the recording has actually been stopped.

formatdate-time

[Link to this property](#)

recording_duration: optional number

Total recording time in seconds.

[Link to this property](#)

<details>

<summary>

start_reason: optional object { caller, reason }

</summary>

<details>

<summary>

caller: optional object { name, type, user_Id }

</summary>

name: optional string

Name of the user who started the recording.

[Link to this property](#)

<details>

<summary>

type: optional "ORGANIZATION" or "USER"

The type can be an App or a user. If the type is `user`, then only the `user_Id` and `name` are returned.

</summary>

One of the following:

"ORGANIZATION"

[Link to this property](#)

"USER"

[Link to this property](#)

</details>

[Link to this property](#)

user_Id: optional string

The user ID of the person who started the recording.

formatuuid

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

reason: optional "API_CALL" or "RECORD_ON_START"

Specifies if the recording was started using the “Start a Recording”API or using the parameter RECORD_ON_START in the “Create a meeting” API.

If the recording is initiated using the “RECORD_ON_START” parameter, the user details will not be populated.

</summary>

One of the following:

"API_CALL"

[Link to this property](#)

"RECORD_ON_START"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

stop_reason: optional object { caller, reason }

</summary>

<details>

<summary>

caller: optional object { name, type, user_Id }

</summary>

name: optional string

Name of the user who stopped the recording.

[Link to this property](#)

<details>

<summary>

type: optional "ORGANIZATION" or "USER"

The type can be an App or a user. If the type is `user`, then only the `user_Id` and `name` are returned.

</summary>

One of the following:

"ORGANIZATION"

[Link to this property](#)

"USER"

[Link to this property](#)

</details>

[Link to this property](#)

user_Id: optional string

The user ID of the person who stopped the recording.

formatuuid

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

reason: optional "API_CALL" or "INTERNAL_ERROR" or "ALL_PEERS_LEFT"

Specifies the reason why the recording stopped.

</summary>

One of the following:

"API_CALL"

[Link to this property](#)

"INTERNAL_ERROR"

[Link to this property](#)

"ALL_PEERS_LEFT"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

storage_config: optional object { access_key, auth_method, bucket, 9 more } or object { access_key, region, auth_method, 9 more } or object { private_key, access_key, auth_method, 9 more } or object { password, access_key, auth_method, 9 more }

</summary>

One of the following:

<details>

<summary>

object { access_key, auth_method, bucket, 9 more }

</summary>

access_key: optional string

Access key of the storage medium. Access key is not required for the `gcs` storage media type.

Note that this field is not readable by clients, only writeable.

[Link to this property](#)

<details>

<summary>

auth_method: optional "KEY" or "PASSWORD"

Authentication method used for “sftp” type storage medium

</summary>

One of the following:

"KEY"

[Link to this property](#)

"PASSWORD"

[Link to this property](#)

</details>

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

password: optional string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

private_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

region: optional string

Region of the storage medium.

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

type: optional "gcs"

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { access_key, region, auth_method, 9 more }

</summary>

access_key: unknown

minLength1

[Link to this property](#)

region: unknown

minLength1

[Link to this property](#)

<details>

<summary>

auth_method: optional "KEY" or "PASSWORD"

Authentication method used for “sftp” type storage medium

</summary>

One of the following:

"KEY"

[Link to this property](#)

"PASSWORD"

[Link to this property](#)

</details>

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

password: optional string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

private_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

<details>

<summary>

type: optional "aws" or "azure" or "digitalocean"

</summary>

One of the following:

"aws"

[Link to this property](#)

"azure"

[Link to this property](#)

"digitalocean"

[Link to this property](#)

</details>

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { private_key, access_key, auth_method, 9 more }

</summary>

private_key: string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

access_key: optional string

Access key of the storage medium. Access key is not required for the `gcs` storage media type.

Note that this field is not readable by clients, only writeable.

[Link to this property](#)

auth_method: optional "KEY"

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

password: optional string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

region: optional string

Region of the storage medium.

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

<details>

<summary>

type: optional "aws" or "azure" or "digitalocean" or 2 more

Type of storage media.

</summary>

One of the following:

"aws"

[Link to this property](#)

"azure"

[Link to this property](#)

"digitalocean"

[Link to this property](#)

"gcs"

[Link to this property](#)

"sftp"

[Link to this property](#)

</details>

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { password, access_key, auth_method, 9 more }

</summary>

password: string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

access_key: optional string

Access key of the storage medium. Access key is not required for the `gcs` storage media type.

Note that this field is not readable by clients, only writeable.

[Link to this property](#)

auth_method: optional "PASSWORD"

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

private_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

region: optional string

Region of the storage medium.

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

<details>

<summary>

type: optional "aws" or "azure" or "digitalocean" or 2 more

Type of storage media.

</summary>

One of the following:

"aws"

[Link to this property](#)

"azure"

[Link to this property](#)

"digitalocean"

[Link to this property](#)

"gcs"

[Link to this property](#)

"sftp"

[Link to this property](#)

</details>

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RecordingPauseResumeStopRecordingResponse object { success, data }

</summary>

success: boolean

Success status of the operation

[Link to this property](#)

<details>

<summary>

data: optional object { id, audio_download_url, download_url, 12 more }

Data returned by the operation

</summary>

id: string

ID of the recording

formatuuid

[Link to this property](#)

audio_download_url: string

If the audio_config is passed, the URL for downloading the audio recording is returned.

formaturi

[Link to this property](#)

download_url: string

URL where the recording can be downloaded.

formaturi

[Link to this property](#)

download_url_expiry: string

Timestamp when the download URL expires.

formatdate-time

[Link to this property](#)

file_size: number

File size of the recording, in bytes.

[Link to this property](#)

invoked_time: string

Timestamp when this recording was invoked.

formatdate-time

[Link to this property](#)

output_file_name: string

File name of the recording.

[Link to this property](#)

session_id: string

ID of the meeting session this recording is for.

formatuuid

[Link to this property](#)

started_time: string

Timestamp when this recording actually started after being invoked. Usually a few seconds after `invoked_time`.

formatdate-time

[Link to this property](#)

<details>

<summary>

status: "INVOKED" or "RECORDING" or "UPLOADING" or 3 more

Current status of the recording.

</summary>

One of the following:

"INVOKED"

[Link to this property](#)

"RECORDING"

[Link to this property](#)

"UPLOADING"

[Link to this property](#)

"UPLOADED"

[Link to this property](#)

"ERRORED"

[Link to this property](#)

"PAUSED"

[Link to this property](#)

</details>

[Link to this property](#)

stopped_time: string

Timestamp when this recording was stopped. Optional; is present only when the recording has actually been stopped.

formatdate-time

[Link to this property](#)

recording_duration: optional number

Total recording time in seconds.

[Link to this property](#)

<details>

<summary>

start_reason: optional object { caller, reason }

</summary>

<details>

<summary>

caller: optional object { name, type, user_Id }

</summary>

name: optional string

Name of the user who started the recording.

[Link to this property](#)

<details>

<summary>

type: optional "ORGANIZATION" or "USER"

The type can be an App or a user. If the type is `user`, then only the `user_Id` and `name` are returned.

</summary>

One of the following:

"ORGANIZATION"

[Link to this property](#)

"USER"

[Link to this property](#)

</details>

[Link to this property](#)

user_Id: optional string

The user ID of the person who started the recording.

formatuuid

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

reason: optional "API_CALL" or "RECORD_ON_START"

Specifies if the recording was started using the “Start a Recording”API or using the parameter RECORD_ON_START in the “Create a meeting” API.

If the recording is initiated using the “RECORD_ON_START” parameter, the user details will not be populated.

</summary>

One of the following:

"API_CALL"

[Link to this property](#)

"RECORD_ON_START"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

stop_reason: optional object { caller, reason }

</summary>

<details>

<summary>

caller: optional object { name, type, user_Id }

</summary>

name: optional string

Name of the user who stopped the recording.

[Link to this property](#)

<details>

<summary>

type: optional "ORGANIZATION" or "USER"

The type can be an App or a user. If the type is `user`, then only the `user_Id` and `name` are returned.

</summary>

One of the following:

"ORGANIZATION"

[Link to this property](#)

"USER"

[Link to this property](#)

</details>

[Link to this property](#)

user_Id: optional string

The user ID of the person who stopped the recording.

formatuuid

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

reason: optional "API_CALL" or "INTERNAL_ERROR" or "ALL_PEERS_LEFT"

Specifies the reason why the recording stopped.

</summary>

One of the following:

"API_CALL"

[Link to this property](#)

"INTERNAL_ERROR"

[Link to this property](#)

"ALL_PEERS_LEFT"

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

storage_config: optional object { access_key, auth_method, bucket, 9 more } or object { access_key, region, auth_method, 9 more } or object { private_key, access_key, auth_method, 9 more } or object { password, access_key, auth_method, 9 more }

</summary>

One of the following:

<details>

<summary>

object { access_key, auth_method, bucket, 9 more }

</summary>

access_key: optional string

Access key of the storage medium. Access key is not required for the `gcs` storage media type.

Note that this field is not readable by clients, only writeable.

[Link to this property](#)

<details>

<summary>

auth_method: optional "KEY" or "PASSWORD"

Authentication method used for “sftp” type storage medium

</summary>

One of the following:

"KEY"

[Link to this property](#)

"PASSWORD"

[Link to this property](#)

</details>

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

password: optional string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

private_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

region: optional string

Region of the storage medium.

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

type: optional "gcs"

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { access_key, region, auth_method, 9 more }

</summary>

access_key: unknown

minLength1

[Link to this property](#)

region: unknown

minLength1

[Link to this property](#)

<details>

<summary>

auth_method: optional "KEY" or "PASSWORD"

Authentication method used for “sftp” type storage medium

</summary>

One of the following:

"KEY"

[Link to this property](#)

"PASSWORD"

[Link to this property](#)

</details>

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

password: optional string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

private_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

<details>

<summary>

type: optional "aws" or "azure" or "digitalocean"

</summary>

One of the following:

"aws"

[Link to this property](#)

"azure"

[Link to this property](#)

"digitalocean"

[Link to this property](#)

</details>

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { private_key, access_key, auth_method, 9 more }

</summary>

private_key: string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

access_key: optional string

Access key of the storage medium. Access key is not required for the `gcs` storage media type.

Note that this field is not readable by clients, only writeable.

[Link to this property](#)

auth_method: optional "KEY"

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

password: optional string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

region: optional string

Region of the storage medium.

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

<details>

<summary>

type: optional "aws" or "azure" or "digitalocean" or 2 more

Type of storage media.

</summary>

One of the following:

"aws"

[Link to this property](#)

"azure"

[Link to this property](#)

"digitalocean"

[Link to this property](#)

"gcs"

[Link to this property](#)

"sftp"

[Link to this property](#)

</details>

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

object { password, access_key, auth_method, 9 more }

</summary>

password: string

SSH destination server password for SFTP type storage medium when auth_method is “PASSWORD”. If auth_method is “KEY”, this specifies the password for the ssh private key.

[Link to this property](#)

access_key: optional string

Access key of the storage medium. Access key is not required for the `gcs` storage media type.

Note that this field is not readable by clients, only writeable.

[Link to this property](#)

auth_method: optional "PASSWORD"

[Link to this property](#)

bucket: optional string

Name of the storage medium’s bucket.

[Link to this property](#)

host: optional string

SSH destination server host for SFTP type storage medium

[Link to this property](#)

path: optional string

Path relative to the bucket root at which the recording will be placed.

[Link to this property](#)

port: optional number

SSH destination server port for SFTP type storage medium

[Link to this property](#)

private_key: optional string

Private key used to login to destination SSH server for SFTP type storage medium, when auth_method used is “KEY”

[Link to this property](#)

region: optional string

Region of the storage medium.

[Link to this property](#)

secret: optional string

Secret key of the storage medium. Similar to `access_key`, it is only writeable by clients, not readable.

[Link to this property](#)

<details>

<summary>

type: optional "aws" or "azure" or "digitalocean" or 2 more

Type of storage media.

</summary>

One of the following:

"aws"

[Link to this property](#)

"azure"

[Link to this property](#)

"digitalocean"

[Link to this property](#)

"gcs"

[Link to this property](#)

"sftp"

[Link to this property](#)

</details>

[Link to this property](#)

username: optional string

SSH destination server username for SFTP type storage medium

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RecordingStartTrackRecordingResponse object { success, data }

</summary>

success: boolean

Success status of the operation

[Link to this property](#)

<details>

<summary>

data: optional object { recording }

Data returned by the operation

</summary>

<details>

<summary>

recording: object { id, audio_download_url, download_url, 9 more }

</summary>

id: string

ID of the recording

formatuuid

[Link to this property](#)

audio_download_url: string

If the audio_config is passed, the URL for downloading the audio recording is returned.

formaturi

[Link to this property](#)

download_url: string

URL where the recording can be downloaded.

formaturi

[Link to this property](#)

download_url_expiry: string

Timestamp when the download URL expires.

formatdate-time

[Link to this property](#)

file_size: number

File size of the recording, in bytes.

[Link to this property](#)

invoked_time: string

Timestamp when this recording was invoked.

formatdate-time

[Link to this property](#)

output_file_name: string

File name of the recording.

[Link to this property](#)

session_id: string

ID of the meeting session this recording is for.

formatuuid

[Link to this property](#)

started_time: string

Timestamp when this recording actually started after being invoked. Usually a few seconds after `invoked_time`.

formatdate-time

[Link to this property](#)

<details>

<summary>

status: "INVOKED" or "RECORDING" or "UPLOADING" or 3 more

Current status of the recording.

</summary>

One of the following:

"INVOKED"

[Link to this property](#)

"RECORDING"

[Link to this property](#)

"UPLOADING"

[Link to this property](#)

"UPLOADED"

[Link to this property](#)

"ERRORED"

[Link to this property](#)

"PAUSED"

[Link to this property](#)

</details>

[Link to this property](#)

stopped_time: string

Timestamp when this recording was stopped. Optional; is present only when the recording has actually been stopped.

formatdate-time

[Link to this property](#)

recording_duration: optional number

Total recording time in seconds.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

##### [Fetch all webhooks details](/api/resources/realtime_kit/subresources/webhooks/methods/get_webhooks)

GET/accounts/{account_id}/realtime/kit/{app_id}/webhooks

##### [Add a webhook](/api/resources/realtime_kit/subresources/webhooks/methods/create_webhook)

POST/accounts/{account_id}/realtime/kit/{app_id}/webhooks

##### [Fetch details of a webhook](/api/resources/realtime_kit/subresources/webhooks/methods/get_webhook_by_id)

GET/accounts/{account_id}/realtime/kit/{app_id}/webhooks/{webhook_id}

##### [Replace a webhook](/api/resources/realtime_kit/subresources/webhooks/methods/replace_webhook)

PUT/accounts/{account_id}/realtime/kit/{app_id}/webhooks/{webhook_id}

##### [Edit a webhook](/api/resources/realtime_kit/subresources/webhooks/methods/edit_webhook)

PATCH/accounts/{account_id}/realtime/kit/{app_id}/webhooks/{webhook_id}

##### [Delete a webhook](/api/resources/realtime_kit/subresources/webhooks/methods/delete_webhook)

DELETE/accounts/{account_id}/realtime/kit/{app_id}/webhooks/{webhook_id}

##### Models

<details>

<summary>

WebhookGetWebhooksResponse object { data, success }

</summary>

<details>

<summary>

data: array of object { id, created_at, enabled, 4 more }

</summary>

id: string

ID of the webhook

formatuuid

[Link to this property](#)

created_at: string

Timestamp when this webhook was created

formatdate-time

[Link to this property](#)

enabled: boolean

Set to true if the webhook is active

[Link to this property](#)

<details>

<summary>

events: array of "meeting.started" or "meeting.ended" or "meeting.participantJoined" or 6 more

Events this webhook will send updates for

</summary>

One of the following:

"meeting.started"

[Link to this property](#)

"meeting.ended"

[Link to this property](#)

"meeting.participantJoined"

[Link to this property](#)

"meeting.participantLeft"

[Link to this property](#)

"meeting.chatSynced"

[Link to this property](#)

"recording.statusUpdate"

[Link to this property](#)

"livestreaming.statusUpdate"

[Link to this property](#)

"meeting.transcript"

[Link to this property](#)

"meeting.summary"

[Link to this property](#)

</details>

[Link to this property](#)

name: string

Name of the webhook

[Link to this property](#)

updated_at: string

Timestamp when this webhook was updated

formatdate-time

[Link to this property](#)

url: string

URL the webhook will send events to

formaturi

[Link to this property](#)

</details>

[Link to this property](#)

success: boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WebhookCreateWebhookResponse object { data, success }

</summary>

<details>

<summary>

data: object { id, created_at, enabled, 4 more }

</summary>

id: string

ID of the webhook

formatuuid

[Link to this property](#)

created_at: string

Timestamp when this webhook was created

formatdate-time

[Link to this property](#)

enabled: boolean

Set to true if the webhook is active

[Link to this property](#)

<details>

<summary>

events: array of "meeting.started" or "meeting.ended" or "meeting.participantJoined" or 6 more

Events this webhook will send updates for

</summary>

One of the following:

"meeting.started"

[Link to this property](#)

"meeting.ended"

[Link to this property](#)

"meeting.participantJoined"

[Link to this property](#)

"meeting.participantLeft"

[Link to this property](#)

"meeting.chatSynced"

[Link to this property](#)

"recording.statusUpdate"

[Link to this property](#)

"livestreaming.statusUpdate"

[Link to this property](#)

"meeting.transcript"

[Link to this property](#)

"meeting.summary"

[Link to this property](#)

</details>

[Link to this property](#)

name: string

Name of the webhook

[Link to this property](#)

updated_at: string

Timestamp when this webhook was updated

formatdate-time

[Link to this property](#)

url: string

URL the webhook will send events to

formaturi

[Link to this property](#)

</details>

[Link to this property](#)

success: boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WebhookGetWebhookByIDResponse object { data, success }

</summary>

<details>

<summary>

data: object { id, created_at, enabled, 4 more }

</summary>

id: string

ID of the webhook

formatuuid

[Link to this property](#)

created_at: string

Timestamp when this webhook was created

formatdate-time

[Link to this property](#)

enabled: boolean

Set to true if the webhook is active

[Link to this property](#)

<details>

<summary>

events: array of "meeting.started" or "meeting.ended" or "meeting.participantJoined" or 6 more

Events this webhook will send updates for

</summary>

One of the following:

"meeting.started"

[Link to this property](#)

"meeting.ended"

[Link to this property](#)

"meeting.participantJoined"

[Link to this property](#)

"meeting.participantLeft"

[Link to this property](#)

"meeting.chatSynced"

[Link to this property](#)

"recording.statusUpdate"

[Link to this property](#)

"livestreaming.statusUpdate"

[Link to this property](#)

"meeting.transcript"

[Link to this property](#)

"meeting.summary"

[Link to this property](#)

</details>

[Link to this property](#)

name: string

Name of the webhook

[Link to this property](#)

updated_at: string

Timestamp when this webhook was updated

formatdate-time

[Link to this property](#)

url: string

URL the webhook will send events to

formaturi

[Link to this property](#)

</details>

[Link to this property](#)

success: boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WebhookReplaceWebhookResponse object { data, success }

</summary>

<details>

<summary>

data: object { id, created_at, enabled, 4 more }

</summary>

id: string

ID of the webhook

formatuuid

[Link to this property](#)

created_at: string

Timestamp when this webhook was created

formatdate-time

[Link to this property](#)

enabled: boolean

Set to true if the webhook is active

[Link to this property](#)

<details>

<summary>

events: array of "meeting.started" or "meeting.ended" or "meeting.participantJoined" or 6 more

Events this webhook will send updates for

</summary>

One of the following:

"meeting.started"

[Link to this property](#)

"meeting.ended"

[Link to this property](#)

"meeting.participantJoined"

[Link to this property](#)

"meeting.participantLeft"

[Link to this property](#)

"meeting.chatSynced"

[Link to this property](#)

"recording.statusUpdate"

[Link to this property](#)

"livestreaming.statusUpdate"

[Link to this property](#)

"meeting.transcript"

[Link to this property](#)

"meeting.summary"

[Link to this property](#)

</details>

[Link to this property](#)

name: string

Name of the webhook

[Link to this property](#)

updated_at: string

Timestamp when this webhook was updated

formatdate-time

[Link to this property](#)

url: string

URL the webhook will send events to

formaturi

[Link to this property](#)

</details>

[Link to this property](#)

success: boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WebhookEditWebhookResponse object { data, success }

</summary>

<details>

<summary>

data: object { id, created_at, enabled, 4 more }

</summary>

id: string

ID of the webhook

formatuuid

[Link to this property](#)

created_at: string

Timestamp when this webhook was created

formatdate-time

[Link to this property](#)

enabled: boolean

Set to true if the webhook is active

[Link to this property](#)

<details>

<summary>

events: array of "meeting.started" or "meeting.ended" or "meeting.participantJoined" or 6 more

Events this webhook will send updates for

</summary>

One of the following:

"meeting.started"

[Link to this property](#)

"meeting.ended"

[Link to this property](#)

"meeting.participantJoined"

[Link to this property](#)

"meeting.participantLeft"

[Link to this property](#)

"meeting.chatSynced"

[Link to this property](#)

"recording.statusUpdate"

[Link to this property](#)

"livestreaming.statusUpdate"

[Link to this property](#)

"meeting.transcript"

[Link to this property](#)

"meeting.summary"

[Link to this property](#)

</details>

[Link to this property](#)

name: string

Name of the webhook

[Link to this property](#)

updated_at: string

Timestamp when this webhook was updated

formatdate-time

[Link to this property](#)

url: string

URL the webhook will send events to

formaturi

[Link to this property](#)

</details>

[Link to this property](#)

success: boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

WebhookDeleteWebhookResponse object { data, success }

</summary>

<details>

<summary>

data: object { id, created_at, enabled, 4 more }

</summary>

id: string

ID of the webhook

formatuuid

[Link to this property](#)

created_at: string

Timestamp when this webhook was created

formatdate-time

[Link to this property](#)

enabled: boolean

Set to true if the webhook is active

[Link to this property](#)

<details>

<summary>

events: array of "meeting.started" or "meeting.ended" or "meeting.participantJoined" or 6 more

Events this webhook will send updates for

</summary>

One of the following:

"meeting.started"

[Link to this property](#)

"meeting.ended"

[Link to this property](#)

"meeting.participantJoined"

[Link to this property](#)

"meeting.participantLeft"

[Link to this property](#)

"meeting.chatSynced"

[Link to this property](#)

"recording.statusUpdate"

[Link to this property](#)

"livestreaming.statusUpdate"

[Link to this property](#)

"meeting.transcript"

[Link to this property](#)

"meeting.summary"

[Link to this property](#)

</details>

[Link to this property](#)

name: string

Name of the webhook

[Link to this property](#)

updated_at: string

Timestamp when this webhook was updated

formatdate-time

[Link to this property](#)

url: string

URL the webhook will send events to

formaturi

[Link to this property](#)

</details>

[Link to this property](#)

success: boolean

[Link to this property](#)

</details>

[Link to this property](#)

##### [Fetch details of an active session](/api/resources/realtime_kit/subresources/active-session/methods/get_active_session)

GET/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/active-session

##### [Kick participants from an active session](/api/resources/realtime_kit/subresources/active-session/methods/kick_participants)

POST/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/active-session/kick

##### [Kick all participants](/api/resources/realtime_kit/subresources/active-session/methods/kick_all_participants)

POST/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/active-session/kick-all

##### [Create a poll](/api/resources/realtime_kit/subresources/active-session/methods/create_poll)

POST/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/active-session/poll

##### Models

<details>

<summary>

ActiveSessionGetActiveSessionResponse object { data, success }

</summary>

<details>

<summary>

data: optional object { id, associated_id, created_at, 11 more }

</summary>

id: string

ID of the session

[Link to this property](#)

associated_id: string

ID of the meeting this session is associated with. In the case of V2 meetings, it is always a UUID. In V1 meetings, it is a room name of the form `abcdef-ghijkl`

[Link to this property](#)

created_at: string

timestamp when session created

[Link to this property](#)

live_participants: number

number of participants currently in the session

[Link to this property](#)

max_concurrent_participants: number

number of maximum participants that were in the session

[Link to this property](#)

meeting_display_name: string

Title of the meeting this session belongs to

[Link to this property](#)

minutes_consumed: number

number of minutes consumed since the session started

[Link to this property](#)

organization_id: string

App id that hosted this session

[Link to this property](#)

started_at: string

timestamp when session started

[Link to this property](#)

<details>

<summary>

status: "LIVE" or "ENDED"

current status of session

</summary>

One of the following:

"LIVE"

[Link to this property](#)

"ENDED"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

type: "meeting" or "livestream" or "participant"

type of session

</summary>

One of the following:

"meeting"

[Link to this property](#)

"livestream"

[Link to this property](#)

"participant"

[Link to this property](#)

</details>

[Link to this property](#)

updated_at: string

timestamp when session was last updated

[Link to this property](#)

breakout_rooms: optional array of unknown

[Link to this property](#)

ended_at: optional string

timestamp when session ended

[Link to this property](#)

</details>

[Link to this property](#)

success: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ActiveSessionKickParticipantsResponse object { data, success }

</summary>

<details>

<summary>

data: optional object { action, participants }

</summary>

action: optional string

[Link to this property](#)

<details>

<summary>

participants: optional array of object { id, created_at, updated_at, 3 more }

</summary>

id: string

ID of the session participant

[Link to this property](#)

created_at: string

[Link to this property](#)

updated_at: string

[Link to this property](#)

email: optional string

Email of the session participant.

[Link to this property](#)

name: optional string

Name of the session participant.

[Link to this property](#)

picture: optional string

A URL pointing to a picture of the participant.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

success: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ActiveSessionKickAllParticipantsResponse object { data, success }

</summary>

<details>

<summary>

data: optional object { action, kicked_participants_count }

</summary>

action: optional string

[Link to this property](#)

kicked_participants_count: optional number

[Link to this property](#)

</details>

[Link to this property](#)

success: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

ActiveSessionCreatePollResponse object { data, success }

</summary>

<details>

<summary>

data: optional object { action, poll }

</summary>

action: optional string

[Link to this property](#)

<details>

<summary>

poll: optional object { id, options, question, 4 more }

</summary>

id: string

ID of the poll

[Link to this property](#)

<details>

<summary>

options: array of object { count, text, votes }

Answer options

</summary>

count: number

[Link to this property](#)

text: string

Text of the answer option

[Link to this property](#)

<details>

<summary>

votes: array of object { id, name }

</summary>

id: string

[Link to this property](#)

name: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

question: string

Question asked by the poll

[Link to this property](#)

anonymous: optional boolean

[Link to this property](#)

created_by: optional string

[Link to this property](#)

hide_votes: optional boolean

[Link to this property](#)

voted: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

success: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

##### [Fetch all livestreams](/api/resources/realtime_kit/subresources/livestreams/methods/get_all_livestreams)

GET/accounts/{account_id}/realtime/kit/{app_id}/livestreams

##### [Stop livestreaming a meeting](/api/resources/realtime_kit/subresources/livestreams/methods/stop_livestreaming_a_meeting)

POST/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/active-livestream/stop

##### [Start livestreaming a meeting](/api/resources/realtime_kit/subresources/livestreams/methods/start_livestreaming_a_meeting)

POST/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/livestreams

##### [Fetch complete analytics data for your livestreams](/api/resources/realtime_kit/subresources/livestreams/methods/get_livestream_analytics_complete)

GET/accounts/{account_id}/realtime/kit/{app_id}/analytics/livestreams/overall

##### [Fetch day-wise analytics data for your livestreams](/api/resources/realtime_kit/subresources/livestreams/methods/get_livestream_analytics_daywise)

GET/accounts/{account_id}/realtime/kit/{app_id}/analytics/livestreams/daywise

##### [Fetch day-wise session and recording analytics data for an App](/api/resources/realtime_kit/subresources/livestreams/methods/get_org_analytics)

GET/accounts/{account_id}/realtime/kit/{app_id}/analytics/daywise

##### [Fetch active livestreams for a meeting](/api/resources/realtime_kit/subresources/livestreams/methods/get_meeting_active_livestreams)

GET/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/active-livestream

##### [Fetch livestream session details using livestream session ID](/api/resources/realtime_kit/subresources/livestreams/methods/get_livestream_session_details_for_session_id)

GET/accounts/{account_id}/realtime/kit/{app_id}/livestreams/sessions/{livestream-session-id}

##### [Fetch active livestream session details](/api/resources/realtime_kit/subresources/livestreams/methods/get_active_livestreams_for_livestream_id)

GET/accounts/{account_id}/realtime/kit/{app_id}/livestreams/{livestream_id}/active-livestream-session

##### [Fetch livestream details using livestream ID](/api/resources/realtime_kit/subresources/livestreams/methods/get_livestream_session_for_livestream_id)

GET/accounts/{account_id}/realtime/kit/{app_id}/livestreams/{livestream_id}

##### Models

<details>

<summary>

LivestreamGetAllLivestreamsResponse object { data, success }

</summary>

<details>

<summary>

data: optional object { id, created_at, disabled, 8 more }

</summary>

id: optional string

The ID of the livestream.

formatuuid

[Link to this property](#)

created_at: optional string

Timestamp the object was created at. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

disabled: optional string

Specifies if the livestream was disabled.

[Link to this property](#)

ingest_server: optional string

The server URL to which the RTMP encoder sends the video and audio data.

[Link to this property](#)

meeting_id: optional string

ID of the meeting.

[Link to this property](#)

name: optional string

Name of the livestream.

[Link to this property](#)

<details>

<summary>

paging: optional object { end_offset, start_offset, total_count }

</summary>

end_offset: optional number

[Link to this property](#)

start_offset: optional number

[Link to this property](#)

total_count: optional number

[Link to this property](#)

</details>

[Link to this property](#)

playback_url: optional string

The web address that viewers can use to watch the livestream.

[Link to this property](#)

<details>

<summary>

status: optional "LIVE" or "IDLE" or "ERRORED" or "INVOKED"

</summary>

One of the following:

"LIVE"

[Link to this property](#)

"IDLE"

[Link to this property](#)

"ERRORED"

[Link to this property](#)

"INVOKED"

[Link to this property](#)

</details>

[Link to this property](#)

stream_key: optional string

Unique key for accessing each livestream.

[Link to this property](#)

updated_at: optional string

Timestamp the object was updated at. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

success: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LivestreamStopLivestreamingAMeetingResponse object { data, success }

</summary>

<details>

<summary>

data: optional object { message }

</summary>

message: optional string

[Link to this property](#)

</details>

[Link to this property](#)

success: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LivestreamStartLivestreamingAMeetingResponse object { data, success }

</summary>

<details>

<summary>

data: optional object { id, ingest_server, playback_url, 2 more }

</summary>

id: optional string

The livestream ID.

[Link to this property](#)

ingest_server: optional string

The server URL to which the RTMP encoder sends the video and audio data.

[Link to this property](#)

playback_url: optional string

The web address that viewers can use to watch the livestream.

[Link to this property](#)

<details>

<summary>

status: optional "LIVE" or "IDLE" or "ERRORED" or "INVOKED"

</summary>

One of the following:

"LIVE"

[Link to this property](#)

"IDLE"

[Link to this property](#)

"ERRORED"

[Link to this property](#)

"INVOKED"

[Link to this property](#)

</details>

[Link to this property](#)

stream_key: optional string

Unique key for accessing each livestream.

[Link to this property](#)

</details>

[Link to this property](#)

success: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LivestreamGetLivestreamAnalyticsCompleteResponse object { data, success }

</summary>

<details>

<summary>

data: optional object { count, total_ingest_seconds, total_viewer_seconds }

</summary>

count: optional number

Count of total livestreams.

[Link to this property](#)

total_ingest_seconds: optional number

Total time duration for which the input was given or the meeting was streamed.

[Link to this property](#)

total_viewer_seconds: optional number

Total view time for which the viewers watched the stream.

[Link to this property](#)

</details>

[Link to this property](#)

success: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LivestreamGetLivestreamAnalyticsDaywiseResponse object { data, success }

</summary>

<details>

<summary>

data: optional array of object { count, date, total_ingest_seconds, total_viewer_seconds }

</summary>

count: optional number

Count of total livestream sessions.

[Link to this property](#)

date: optional string

Analytics date.

[Link to this property](#)

total_ingest_seconds: optional number

Total time duration for which the input was given or the meeting was streamed.

[Link to this property](#)

total_viewer_seconds: optional number

Total view time for which the viewers watched the stream.

[Link to this property](#)

</details>

[Link to this property](#)

success: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LivestreamGetOrgAnalyticsResponse object { data, success }

</summary>

<details>

<summary>

data: optional object { recording_stats, session_stats }

</summary>

<details>

<summary>

recording_stats: optional object { day_stats, recording_count, recording_minutes_consumed }

Recording statistics of an App during the range specified

</summary>

<details>

<summary>

day_stats: optional array of object { day, total_recording_minutes, total_recordings }

Day wise recording stats

</summary>

day: optional string

[Link to this property](#)

total_recording_minutes: optional number

Total recording minutes for a specific day

[Link to this property](#)

total_recordings: optional number

Total number of recordings for a specific day

[Link to this property](#)

</details>

[Link to this property](#)

recording_count: optional number

Total number of recordings during the range specified

[Link to this property](#)

recording_minutes_consumed: optional number

Total recording minutes during the range specified

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

session_stats: optional object { day_stats, sessions_count, sessions_minutes_consumed }

Session statistics of an App during the range specified

</summary>

<details>

<summary>

day_stats: optional array of object { day, total_session_minutes, total_sessions }

Day wise session stats

</summary>

day: optional string

[Link to this property](#)

total_session_minutes: optional number

Total session minutes for a specific day

[Link to this property](#)

total_sessions: optional number

Total number of sessions for a specific day

[Link to this property](#)

</details>

[Link to this property](#)

sessions_count: optional number

Total number of sessions during the range specified

[Link to this property](#)

sessions_minutes_consumed: optional number

Total session minutes during the range specified

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

success: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LivestreamGetMeetingActiveLivestreamsResponse object { data, success }

</summary>

<details>

<summary>

data: optional object { id, created_at, disabled, 7 more }

</summary>

id: optional string

The livestream ID.

[Link to this property](#)

created_at: optional string

Timestamp the object was created at. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

disabled: optional string

Specifies if the livestream was disabled.

[Link to this property](#)

ingest_server: optional string

The server URL to which the RTMP encoder sends the video and audio data.

[Link to this property](#)

meeting_id: optional string

[Link to this property](#)

name: optional string

Name of the livestream.

[Link to this property](#)

playback_url: optional string

The web address that viewers can use to watch the livestream.

[Link to this property](#)

<details>

<summary>

status: optional "LIVE" or "IDLE" or "ERRORED" or "INVOKED"

</summary>

One of the following:

"LIVE"

[Link to this property](#)

"IDLE"

[Link to this property](#)

"ERRORED"

[Link to this property](#)

"INVOKED"

[Link to this property](#)

</details>

[Link to this property](#)

stream_key: optional string

Unique key for accessing each livestream.

[Link to this property](#)

updated_at: optional string

Timestamp the object was updated at. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

success: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LivestreamGetLivestreamSessionDetailsForSessionIDResponse object { data, success }

</summary>

<details>

<summary>

data: optional object { id, created_at, err_message, 6 more }

</summary>

id: optional string

The livestream ID.

[Link to this property](#)

created_at: optional string

Timestamp the object was created at. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

err_message: optional string

The server URL to which the RTMP encoder sends the video and audio data.

[Link to this property](#)

ingest_seconds: optional number

Name of the livestream.

[Link to this property](#)

livestream_id: optional string

[Link to this property](#)

started_time: optional string

Unique key for accessing each livestream.

[Link to this property](#)

stopped_time: optional string

The web address that viewers can use to watch the livestream.

[Link to this property](#)

updated_at: optional string

Timestamp the object was updated at. The time is returned in ISO format.

[Link to this property](#)

viewer_seconds: optional number

Specifies if the livestream was disabled.

[Link to this property](#)

</details>

[Link to this property](#)

success: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LivestreamGetActiveLivestreamsForLivestreamIDResponse object { data, success }

</summary>

<details>

<summary>

data: optional object { livestream, session }

</summary>

<details>

<summary>

livestream: optional object { id, created_at, disabled, 7 more }

</summary>

id: optional string

[Link to this property](#)

created_at: optional string

Timestamp the object was created at. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

disabled: optional string

Specifies if the livestream was disabled.

[Link to this property](#)

ingest_server: optional string

The server URL to which the RTMP encoder sends the video and audio data.

[Link to this property](#)

meeting_id: optional string

ID of the meeting.

[Link to this property](#)

name: optional string

Name of the livestream.

[Link to this property](#)

playback_url: optional string

The web address that viewers can use to watch the livestream.

[Link to this property](#)

<details>

<summary>

status: optional "LIVE" or "IDLE" or "ERRORED" or "INVOKED"

</summary>

One of the following:

"LIVE"

[Link to this property](#)

"IDLE"

[Link to this property](#)

"ERRORED"

[Link to this property](#)

"INVOKED"

[Link to this property](#)

</details>

[Link to this property](#)

stream_key: optional string

Unique key for accessing each livestream.

[Link to this property](#)

updated_at: optional string

Timestamp the object was updated at. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

session: optional object { id, created_at, err_message, 7 more }

</summary>

id: optional string

[Link to this property](#)

created_at: optional string

Timestamp the object was created at. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

err_message: optional string

[Link to this property](#)

ingest_seconds: optional string

The time duration for which the input was given or the meeting was streamed.

[Link to this property](#)

invoked_time: optional string

Timestamp the object was invoked. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

livestream_id: optional string

[Link to this property](#)

started_time: optional string

Timestamp the object was started. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

stopped_time: optional string

Timestamp the object was stopped. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

updated_at: optional string

Timestamp the object was updated at. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

viewer_seconds: optional string

The total view time for which the viewers watched the stream.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

success: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LivestreamGetLivestreamSessionForLivestreamIDResponse object { data, success }

</summary>

<details>

<summary>

data: optional object { livestream, paging, session }

</summary>

<details>

<summary>

livestream: optional object { id, created_at, disabled, 7 more }

</summary>

id: optional string

ID of the livestream.

[Link to this property](#)

created_at: optional string

Timestamp the object was created at. The time is returned in ISO format.

[Link to this property](#)

disabled: optional string

Specifies if the livestream was disabled.

[Link to this property](#)

ingest_server: optional string

The server URL to which the RTMP encoder sends the video and audio data.

[Link to this property](#)

meeting_id: optional string

The ID of the meeting.

[Link to this property](#)

name: optional string

Name of the livestream.

[Link to this property](#)

playback_url: optional string

The web address that viewers can use to watch the livestream.

[Link to this property](#)

<details>

<summary>

status: optional "LIVE" or "IDLE" or "ERRORED" or "INVOKED"

</summary>

One of the following:

"LIVE"

[Link to this property](#)

"IDLE"

[Link to this property](#)

"ERRORED"

[Link to this property](#)

"INVOKED"

[Link to this property](#)

</details>

[Link to this property](#)

stream_key: optional string

Unique key for accessing each livestream.

[Link to this property](#)

updated_at: optional string

Timestamp the object was updated at. The time is returned in ISO format.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

paging: optional object { end_offset, start_offset, total_count }

</summary>

end_offset: optional number

[Link to this property](#)

start_offset: optional number

[Link to this property](#)

total_count: optional number

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

session: optional object { id, created_at, err_message, 7 more }

</summary>

id: optional string

ID of the session.

[Link to this property](#)

created_at: optional string

Timestamp the object was created at. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

err_message: optional string

[Link to this property](#)

ingest_seconds: optional number

The time duration for which the input was given or the meeting was streamed.

[Link to this property](#)

invoked_time: optional string

Timestamp the object was invoked. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

livestream_id: optional string

[Link to this property](#)

started_time: optional string

Timestamp the object was started. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

stopped_time: optional string

Timestamp the object was stopped. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

updated_at: optional string

Timestamp the object was updated at. The time is returned in ISO format.

formatdate-time

[Link to this property](#)

viewer_seconds: optional number

The total view time for which the viewers watched the stream.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

success: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)

##### [Fetch day-wise session and recording analytics data for an App](/api/resources/realtime_kit/subresources/analytics/methods/get_org_analytics)

GET/accounts/{account_id}/realtime/kit/{app_id}/analytics/daywise

##### Models

<details>

<summary>

AnalyticsGetOrgAnalyticsResponse object { data, success }

</summary>

<details>

<summary>

data: optional object { recording_stats, session_stats }

</summary>

<details>

<summary>

recording_stats: optional object { day_stats, recording_count, recording_minutes_consumed }

Recording statistics of an App during the range specified

</summary>

<details>

<summary>

day_stats: optional array of object { day, total_recording_minutes, total_recordings }

Day wise recording stats

</summary>

day: optional string

[Link to this property](#)

total_recording_minutes: optional number

Total recording minutes for a specific day

[Link to this property](#)

total_recordings: optional number

Total number of recordings for a specific day

[Link to this property](#)

</details>

[Link to this property](#)

recording_count: optional number

Total number of recordings during the range specified

[Link to this property](#)

recording_minutes_consumed: optional number

Total recording minutes during the range specified

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

session_stats: optional object { day_stats, sessions_count, sessions_minutes_consumed }

Session statistics of an App during the range specified

</summary>

<details>

<summary>

day_stats: optional array of object { day, total_session_minutes, total_sessions }

Day wise session stats

</summary>

day: optional string

[Link to this property](#)

total_session_minutes: optional number

Total session minutes for a specific day

[Link to this property](#)

total_sessions: optional number

Total number of sessions for a specific day

[Link to this property](#)

</details>

[Link to this property](#)

sessions_count: optional number

Total number of sessions during the range specified

[Link to this property](#)

sessions_minutes_consumed: optional number

Total session minutes during the range specified

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

success: optional boolean

[Link to this property](#)

</details>

[Link to this property](#)
