---
title: Start recording a meeting
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Realtime Kit](https://developers.cloudflare.com/api/resources/realtime_kit)

[Recordings](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/recordings)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Start recording a meeting

POST/accounts/{account\_id}/realtime/kit/{app\_id}/recordings

Starts recording a meeting. The meeting can be started by an App admin directly, or a participant with permissions to start a recording, based on the type of authorization used.

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

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(method)%20start_recordings%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

app\_id: string

The app identifier tag.

maxLength32

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(method)%20start_recordings%20%3E%20(params)%20default%20%3E%20(param)%20app_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

meeting\_id: string

ID of the meeting to record.

formatuuid

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(method)%20start_recordings%20%3E%20(params)%200%20%3E%20(param)%20meeting_id%20%3E%20(schema)>)

allow\_multiple\_recordings: optional boolean

By default, a meeting allows only one recording to run at a time. Enabling the `allow_multiple_recordings` parameter to true allows you to initiate multiple recordings concurrently in the same meeting. This allows you to record separate videos of the same meeting with different configurations, such as portrait mode or landscape mode.

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(method)%20start_recordings%20%3E%20(params)%200%20%3E%20(param)%20allow_multiple_recordings%20%3E%20(schema)>)

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

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(method)%20start_recordings%20%3E%20(params)%200%20%3E%20(param)%20audio_config%20%3E%20(schema)>)

file\_name\_prefix: optional string

Update the recording file name.

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(method)%20start_recordings%20%3E%20(params)%200%20%3E%20(param)%20file_name_prefix%20%3E%20(schema)>)

<details>

<summary>

interactive\_config: optional object {type }

Allows you to add timed metadata to your recordings, which are digital markers inserted into a video file to provide contextual information at specific points in the content range. The ID3 tags containing this information are available to clients on the playback timeline in HLS format. The output files are generated in a compressed .tar format.

</summary>

type: optional "ID3"

The metadata is presented in the form of ID3 tags.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(method)%20start_recordings%20%3E%20(params)%200%20%3E%20(param)%20interactive_config%20%3E%20(schema)>)

max\_seconds: optional number

Specifies the maximum duration for recording in seconds, ranging from a minimum of 60 seconds to a maximum of 24 hours.

maximum86400

minimum60

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(method)%20start_recordings%20%3E%20(params)%200%20%3E%20(param)%20max_seconds%20%3E%20(schema)>)

<details>

<summary>

realtimekit\_bucket\_config: optional object {enabled }

</summary>

enabled: boolean

Controls whether recordings are uploaded to RealtimeKit’s bucket. If set to false, <code>download_url</code>, <code>audio_download_url</code>, <code>download_url_expiry</code> won’t be generated for a recording.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(method)%20start_recordings%20%3E%20(params)%200%20%3E%20(param)%20realtimekit_bucket_config%20%3E%20(schema)>)

<details>

<summary>

rtmp\_out\_config: optional object {rtmp\_url }

</summary>

rtmp\_url: optional string

RTMP URL to stream to

formaturi

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(method)%20start_recordings%20%3E%20(params)%200%20%3E%20(param)%20rtmp_out_config%20%3E%20(schema)>)

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

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(method)%20start_recordings%20%3E%20(params)%200%20%3E%20(param)%20storage_config%20%3E%20(schema)>)

url: optional string

Pass a custom url to record arbitary screen

formaturi

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(method)%20start_recordings%20%3E%20(params)%200%20%3E%20(param)%20url%20%3E%20(schema)>)

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

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(method)%20start_recordings%20%3E%20(params)%200%20%3E%20(param)%20video_config%20%3E%20(schema)>)

##### ReturnsExpand Collapse

success: boolean

Success status of the operation

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(model)%20recording_start_recordings_response%20%3E%20(schema)%20%3E%20(property)%20success>)

<details>

<summary>

data: optional object {id, audio\_download\_url, download\_url, 12 more }

Data returned by the operation

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

recording\_duration: optional number

Total recording time in seconds.

<a href="#">Link to this property</a>

<details>

<summary>

start\_reason: optional object {caller, reason }

</summary>

<details>

<summary>

caller: optional object {name, type, user\_Id }

</summary>

name: optional string

Name of the user who started the recording.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "ORGANIZATION"or "USER"

The type can be an App or a user. If the type is <code>user</code>, then only the <code>user_Id</code> and <code>name</code> are returned.

</summary>

One of the following:

"ORGANIZATION"

<a href="#">Link to this property</a>

"USER"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

user\_Id: optional string

The user ID of the person who started the recording.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

reason: optional "API\_CALL"or "RECORD\_ON\_START"

Specifies if the recording was started using the “Start a Recording”API or using the parameter RECORD\_ON\_START in the “Create a meeting” API.

If the recording is initiated using the “RECORD\_ON\_START” parameter, the user details will not be populated.

</summary>

One of the following:

"API\_CALL"

<a href="#">Link to this property</a>

"RECORD\_ON\_START"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

stop\_reason: optional object {caller, reason }

</summary>

<details>

<summary>

caller: optional object {name, type, user\_Id }

</summary>

name: optional string

Name of the user who stopped the recording.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "ORGANIZATION"or "USER"

The type can be an App or a user. If the type is <code>user</code>, then only the <code>user_Id</code> and <code>name</code> are returned.

</summary>

One of the following:

"ORGANIZATION"

<a href="#">Link to this property</a>

"USER"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

user\_Id: optional string

The user ID of the person who stopped the recording.

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

reason: optional "API\_CALL"or "INTERNAL\_ERROR"or "ALL\_PEERS\_LEFT"

Specifies the reason why the recording stopped.

</summary>

One of the following:

"API\_CALL"

<a href="#">Link to this property</a>

"INTERNAL\_ERROR"

<a href="#">Link to this property</a>

"ALL\_PEERS\_LEFT"

<a href="#">Link to this property</a>

</details>

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

</details>

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(model)%20recording_start_recordings_response%20%3E%20(schema)%20%3E%20(property)%20data>)

### Start recording a meeting

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/recordings \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "meeting_id": "97440c6a-140b-40a9-9499-b23fd7a3868a"
        }'
```

200 example

```
{
  "success": true,
  "data": {
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
    "recording_duration": 0,
    "start_reason": {
      "caller": {
        "name": "RealtimeKit_test",
        "type": "ORGANIZATION",
        "user_Id": "d61f6956-e68f-4375-bf10-c38a704d1bec"
      },
      "reason": "API_CALL"
    },
    "stop_reason": {
      "caller": {
        "name": "RealtimeKit_test",
        "type": "ORGANIZATION",
        "user_Id": "d61f6956-e68f-4375-bf10-c38a704d1bec"
      },
      "reason": "API_CALL"
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
    }
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
    "recording_duration": 0,
    "start_reason": {
      "caller": {
        "name": "RealtimeKit_test",
        "type": "ORGANIZATION",
        "user_Id": "d61f6956-e68f-4375-bf10-c38a704d1bec"
      },
      "reason": "API_CALL"
    },
    "stop_reason": {
      "caller": {
        "name": "RealtimeKit_test",
        "type": "ORGANIZATION",
        "user_Id": "d61f6956-e68f-4375-bf10-c38a704d1bec"
      },
      "reason": "API_CALL"
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
    }
  }
}
```