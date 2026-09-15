---
title: Fetch details of a recording
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Realtime Kit](https://developers.cloudflare.com/api/resources/realtime_kit)

[Recordings](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/recordings)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Fetch details of a recording

GET/accounts/{account\_id}/realtime/kit/{app\_id}/recordings/{recording\_id}

Returns details of a recording for the given recording ID.

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

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(method)%20get_one_recording%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

app\_id: string

The app identifier tag.

maxLength32

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(method)%20get_one_recording%20%3E%20(params)%20default%20%3E%20(param)%20app_id%20%3E%20(schema)>)

recording\_id: string

formatuuid

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(method)%20get_one_recording%20%3E%20(params)%20default%20%3E%20(param)%20recording_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

success: boolean

Success status of the operation

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(model)%20recording_get_one_recording_response%20%3E%20(schema)%20%3E%20(property)%20success>)

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

[Link to this property](#)%20realtime_kit.recordings%20%3E%20(model)%20recording_get_one_recording_response%20%3E%20(schema)%20%3E%20(property)%20data>)

### Fetch details of a recording

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/recordings/$RECORDING_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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