---
title: Fetch all recordings for an App
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Realtime Kit](https://developers.cloudflare.com/api/resources/realtime_kit)

[Recordings](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/recordings)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Fetch all recordings for an App

GET/accounts/{account\_id}/realtime/kit/{app\_id}/recordings

Returns all recordings for an App. If the `meeting_id` parameter is passed, returns all recordings for the given meeting ID.

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

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(method)%20get_recordings%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

app\_id: string

The app identifier tag.

maxLength32

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(method)%20get_recordings%20%3E%20(params)%20default%20%3E%20(param)%20app_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

end\_time: optional string

The end time range for which you want to retrieve the meetings. The time must be specified in ISO format.

formatdate-time

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(method)%20get_recordings%20%3E%20(params)%20default%20%3E%20(param)%20end_time%20%3E%20(schema)>)

expired: optional boolean

If passed, only shows expired/non-expired recordings on RealtimeKit’s bucket

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(method)%20get_recordings%20%3E%20(params)%20default%20%3E%20(param)%20expired%20%3E%20(schema)>)

meeting\_id: optional string

ID of a meeting. Optional. Will limit results to only this meeting if passed.

formatuuid

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(method)%20get_recordings%20%3E%20(params)%20default%20%3E%20(param)%20meeting_id%20%3E%20(schema)>)

page\_no: optional number

The page number from which you want your page search results to be displayed.

minimum0

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(method)%20get_recordings%20%3E%20(params)%20default%20%3E%20(param)%20page_no%20%3E%20(schema)>)

per\_page: optional number

Number of results per page

minimum0

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(method)%20get_recordings%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

search: optional string

The search query string. You can search using the meeting ID or title.

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(method)%20get_recordings%20%3E%20(params)%20default%20%3E%20(param)%20search%20%3E%20(schema)>)

sort\_by: optional "invokedTime"

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(method)%20get_recordings%20%3E%20(params)%20default%20%3E%20(param)%20sort_by%20%3E%20(schema)>)

<details>

<summary>

sort\_order: optional "ASC"or "DESC"

</summary>

One of the following:

"ASC"

<a href="#">Link to this property</a>

"DESC"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(method)%20get_recordings%20%3E%20(params)%20default%20%3E%20(param)%20sort_order%20%3E%20(schema)>)

start\_time: optional string

The start time range for which you want to retrieve the meetings. The time must be specified in ISO format.

formatdate-time

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(method)%20get_recordings%20%3E%20(params)%20default%20%3E%20(param)%20start_time%20%3E%20(schema)>)

<details>

<summary>

status: optional array of "INVOKED"or "RECORDING"or "UPLOADING"or 3 more

Filter by one or more recording status

</summary>

One of the following:

"INVOKED"

<a href="#">Link to this property</a>

"RECORDING"

<a href="#">Link to this property</a>

"UPLOADING"

<a href="#">Link to this property</a>

"UPLOADED"

<a href="#">Link to this property</a>

"ERRORED"

<a href="#">Link to this property</a>

"PAUSED"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(method)%20get_recordings%20%3E%20(params)%20default%20%3E%20(param)%20status%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

data: array of object {id, audio\_download\_url, download\_url, 11 more }

</summary>

id: string

ID of the recording

formatuuid

<a href="#">Link to this property</a>

audio\_download\_url: string

If the audio\_config is passed, the URL for downloading the audio recording is returned.

formaturi

<a href="#">Link to this property</a>

download\_url: string

URL where the recording can be downloaded.

formaturi

<a href="#">Link to this property</a>

download\_url\_expiry: string

Timestamp when the download URL expires.

formatdate-time

<a href="#">Link to this property</a>

file\_size: number

File size of the recording, in bytes.

<a href="#">Link to this property</a>

invoked\_time: string

Timestamp when this recording was invoked.

formatdate-time

<a href="#">Link to this property</a>

output\_file\_name: string

File name of the recording.

<a href="#">Link to this property</a>

session\_id: string

ID of the meeting session this recording is for.

formatuuid

<a href="#">Link to this property</a>

started\_time: string

Timestamp when this recording actually started after being invoked. Usually a few seconds after <code>invoked_time</code>.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

status: "INVOKED"or "RECORDING"or "UPLOADING"or 3 more

Current status of the recording.

</summary>

One of the following:

"INVOKED"

<a href="#">Link to this property</a>

"RECORDING"

<a href="#">Link to this property</a>

"UPLOADING"

<a href="#">Link to this property</a>

"UPLOADED"

<a href="#">Link to this property</a>

"ERRORED"

<a href="#">Link to this property</a>

"PAUSED"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

stopped\_time: string

Timestamp when this recording was stopped. Optional; is present only when the recording has actually been stopped.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

meeting: optional object {id, created\_at, updated\_at, 9 more }

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

recording\_duration: optional number

Total recording time in seconds.

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

</details>

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(model)%20recording_get_recordings_response%20%3E%20(schema)%20%3E%20(property)%20data>)

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

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(model)%20recording_get_recordings_response%20%3E%20(schema)%20%3E%20(property)%20paging>)

success: boolean

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(model)%20recording_get_recordings_response%20%3E%20(schema)%20%3E%20(property)%20success>)

### Fetch all recordings for an App

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/recordings \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "data": [
    {
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "audio_download_url": "https://example.com",
      "download_url": "https://example.com",
      "download_url_expiry": "2019-12-27T18:11:19.117Z",
      "file_size": 0,
      "invoked_time": "2019-12-27T18:11:19.117Z",
      "output_file_name": "output_file_name",
      "session_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "started_time": "2019-12-27T18:11:19.117Z",
      "status": "INVOKED",
      "stopped_time": "2019-12-27T18:11:19.117Z",
      "meeting": {
        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "created_at": "2019-12-27T18:11:19.117Z",
        "updated_at": "2019-12-27T18:11:19.117Z",
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
      },
      "recording_duration": 0,
      "storage_config": {
        "auth_method": "KEY",
        "bucket": "bucket",
        "host": "host",
        "path": "path",
        "port": 0,
        "region": "us-east-1",
        "type": "gcs",
        "username": "username"
      }
    }
  ],
  "paging": {
    "end_offset": 30,
    "start_offset": 1,
    "total_count": 30
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "data": [
    {
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "audio_download_url": "https://example.com",
      "download_url": "https://example.com",
      "download_url_expiry": "2019-12-27T18:11:19.117Z",
      "file_size": 0,
      "invoked_time": "2019-12-27T18:11:19.117Z",
      "output_file_name": "output_file_name",
      "session_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "started_time": "2019-12-27T18:11:19.117Z",
      "status": "INVOKED",
      "stopped_time": "2019-12-27T18:11:19.117Z",
      "meeting": {
        "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
        "created_at": "2019-12-27T18:11:19.117Z",
        "updated_at": "2019-12-27T18:11:19.117Z",
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
      },
      "recording_duration": 0,
      "storage_config": {
        "auth_method": "KEY",
        "bucket": "bucket",
        "host": "host",
        "path": "path",
        "port": 0,
        "region": "us-east-1",
        "type": "gcs",
        "username": "username"
      }
    }
  ],
  "paging": {
    "end_offset": 30,
    "start_offset": 1,
    "total_count": 30
  },
  "success": true
}
```