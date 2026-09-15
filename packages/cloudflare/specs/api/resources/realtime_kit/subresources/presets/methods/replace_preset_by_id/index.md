---
title: Replace a preset
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Realtime Kit](https://developers.cloudflare.com/api/resources/realtime_kit)

[Presets](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/presets)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Replace a preset

PUT/accounts/{account\_id}/realtime/kit/{app\_id}/presets/{preset\_id}

Replace all details for the preset using the provided preset ID.

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

[Link to this property](#)%20realtime_kit.presets%20%3E%20(method)%20replace_preset_by_id%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

app\_id: string

The app identifier tag.

maxLength32

[Link to this property](#)%20realtime_kit.presets%20%3E%20(method)%20replace_preset_by_id%20%3E%20(params)%20default%20%3E%20(param)%20app_id%20%3E%20(schema)>)

preset\_id: string

formatuuid

[Link to this property](#)%20realtime_kit.presets%20%3E%20(method)%20replace_preset_by_id%20%3E%20(params)%20default%20%3E%20(param)%20preset_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

config: object {max\_screenshare\_count, max\_video\_streams, media, 2 more }

</summary>

max\_screenshare\_count: number

Maximum number of screen shares that can be active at a given time

<a href="#">Link to this property</a>

<details>

<summary>

max\_video\_streams: object {desktop, mobile }

Maximum number of streams that are visible on a device

</summary>

desktop: number

Maximum number of video streams visible on desktop devices

<a href="#">Link to this property</a>

mobile: number

Maximum number of streams visible on mobile devices

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

media: object {screenshare, video, audio }

Media configuration options. eg: Video quality

</summary>

<details>

<summary>

screenshare: object {frame\_rate, quality }

Configuration options for participant screen shares

</summary>

frame\_rate: number

Frame rate of screen share

<a href="#">Link to this property</a>

<details>

<summary>

quality: "hd"or "vga"or "qvga"or 2 more

Quality of screen share

</summary>

One of the following:

"hd"

<a href="#">Link to this property</a>

"vga"

<a href="#">Link to this property</a>

"qvga"

<a href="#">Link to this property</a>

"fhd"

<a href="#">Link to this property</a>

"uhd"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

video: object {frame\_rate, quality, simulcast }

Configuration options for participant videos

</summary>

frame\_rate: number

Frame rate of participants’ video

maximum30

<a href="#">Link to this property</a>

<details>

<summary>

quality: "hd"or "vga"or "qvga"or 2 more

Video quality of participants

</summary>

One of the following:

"hd"

<a href="#">Link to this property</a>

"vga"

<a href="#">Link to this property</a>

"qvga"

<a href="#">Link to this property</a>

"fhd"

<a href="#">Link to this property</a>

"uhd"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

simulcast: optional boolean

Enable simulcast for participant videos.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

audio: optional object {enable\_high\_bitrate, enable\_stereo }

Control options for Audio quality.

</summary>

enable\_high\_bitrate: optional boolean

Enable High Quality Audio for your meetings

<a href="#">Link to this property</a>

enable\_stereo: optional boolean

Enable Stereo for your meetings

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

view\_type: "GROUP\_CALL"or "WEBINAR"or "AUDIO\_ROOM"or "LIVESTREAM"

Type of the meeting

</summary>

One of the following:

"GROUP\_CALL"

<a href="#">Link to this property</a>

"WEBINAR"

<a href="#">Link to this property</a>

"AUDIO\_ROOM"

<a href="#">Link to this property</a>

"LIVESTREAM"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

livestream\_viewer\_qualities: optional array of number

Livestream viewer quality levels.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.presets%20%3E%20(method)%20replace_preset_by_id%20%3E%20(params)%200%20%3E%20(param)%20config%20%3E%20(schema)>)

name: string

Name of the preset

[Link to this property](#)%20realtime_kit.presets%20%3E%20(method)%20replace_preset_by_id%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

<details>

<summary>

permissions: object {accept\_waiting\_requests, can\_accept\_production\_requests, can\_change\_participant\_permissions, 23 more }

</summary>

accept\_waiting\_requests: boolean

Whether this participant can accept waiting requests

<a href="#">Link to this property</a>

can\_accept\_production\_requests: boolean

<a href="#">Link to this property</a>

can\_change\_participant\_permissions: boolean

<a href="#">Link to this property</a>

can\_edit\_display\_name: boolean

<a href="#">Link to this property</a>

can\_livestream: boolean

<a href="#">Link to this property</a>

can\_record: boolean

<a href="#">Link to this property</a>

can\_spotlight: boolean

<a href="#">Link to this property</a>

<details>

<summary>

chat: object {private, public }

</summary>

<details>

<summary>

private: object {can\_receive, can\_send, files, text }

</summary>

can\_receive: boolean

<a href="#">Link to this property</a>

can\_send: boolean

<a href="#">Link to this property</a>

files: boolean

<a href="#">Link to this property</a>

text: boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

public: object {can\_send, files, text }

</summary>

can\_send: boolean

Can send messages in general

<a href="#">Link to this property</a>

files: boolean

Can send file messages

<a href="#">Link to this property</a>

text: boolean

Can send text messages

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

connected\_meetings: object {can\_alter\_connected\_meetings, can\_switch\_connected\_meetings, can\_switch\_to\_parent\_meeting }

</summary>

can\_alter\_connected\_meetings: boolean

<a href="#">Link to this property</a>

can\_switch\_connected\_meetings: boolean

<a href="#">Link to this property</a>

can\_switch\_to\_parent\_meeting: boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

disable\_participant\_audio: boolean

<a href="#">Link to this property</a>

disable\_participant\_screensharing: boolean

<a href="#">Link to this property</a>

disable\_participant\_video: boolean

<a href="#">Link to this property</a>

hidden\_participant: boolean

Whether this participant is visible to others or not

<a href="#">Link to this property</a>

kick\_participant: boolean

<a href="#">Link to this property</a>

<details>

<summary>

media: object {audio, screenshare, video }

Media permissions

</summary>

<details>

<summary>

audio: object {can\_produce }

Audio permissions

</summary>

<details>

<summary>

can\_produce: "ALLOWED"or "NOT\_ALLOWED"or "CAN\_REQUEST"

Can produce audio

</summary>

One of the following:

"ALLOWED"

<a href="#">Link to this property</a>

"NOT\_ALLOWED"

<a href="#">Link to this property</a>

"CAN\_REQUEST"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

screenshare: object {can\_produce }

Screenshare permissions

</summary>

<details>

<summary>

can\_produce: "ALLOWED"or "NOT\_ALLOWED"or "CAN\_REQUEST"

Can produce screen share video

</summary>

One of the following:

"ALLOWED"

<a href="#">Link to this property</a>

"NOT\_ALLOWED"

<a href="#">Link to this property</a>

"CAN\_REQUEST"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

video: object {can\_produce }

Video permissions

</summary>

<details>

<summary>

can\_produce: "ALLOWED"or "NOT\_ALLOWED"or "CAN\_REQUEST"

Can produce video

</summary>

One of the following:

"ALLOWED"

<a href="#">Link to this property</a>

"NOT\_ALLOWED"

<a href="#">Link to this property</a>

"CAN\_REQUEST"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

pin\_participant: boolean

<a href="#">Link to this property</a>

<details>

<summary>

plugins: object {can\_close, can\_edit\_config, can\_start, config }

Plugin permissions

</summary>

can\_close: boolean

Can close plugins that are already open

<a href="#">Link to this property</a>

can\_edit\_config: boolean

Can edit plugin config

<a href="#">Link to this property</a>

can\_start: boolean

Can start plugins

<a href="#">Link to this property</a>

<details>

<summary>

config: map\[object {access\_control, handles\_view\_only } ]

Plugin configuration keyed by plugin UUID.

</summary>

<details>

<summary>

access\_control: optional "FULL\_ACCESS"or "VIEW\_ONLY"

</summary>

One of the following:

"FULL\_ACCESS"

<a href="#">Link to this property</a>

"VIEW\_ONLY"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

handles\_view\_only: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

polls: object {can\_create, can\_view, can\_vote }

Poll permissions

</summary>

can\_create: boolean

Can create polls

<a href="#">Link to this property</a>

can\_view: boolean

Can view polls

<a href="#">Link to this property</a>

can\_vote: boolean

Can vote on polls

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

recorder\_type: "RECORDER"or "LIVESTREAMER"or "NONE"

Type of the recording peer

</summary>

One of the following:

"RECORDER"

<a href="#">Link to this property</a>

"LIVESTREAMER"

<a href="#">Link to this property</a>

"NONE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

show\_participant\_list: boolean

<a href="#">Link to this property</a>

<details>

<summary>

waiting\_room\_type: "SKIP"or "ON\_PRIVILEGED\_USER\_ENTRY"or "SKIP\_ON\_ACCEPT"

Waiting room type

</summary>

One of the following:

"SKIP"

<a href="#">Link to this property</a>

"ON\_PRIVILEGED\_USER\_ENTRY"

<a href="#">Link to this property</a>

"SKIP\_ON\_ACCEPT"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

accept\_stage\_requests: optional boolean

<a href="#">Link to this property</a>

is\_recorder: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

stage\_access: optional "ALLOWED"or "NOT\_ALLOWED"or "CAN\_REQUEST"

</summary>

One of the following:

"ALLOWED"

<a href="#">Link to this property</a>

"NOT\_ALLOWED"

<a href="#">Link to this property</a>

"CAN\_REQUEST"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

stage\_enabled: optional boolean

<a href="#">Link to this property</a>

transcription\_enabled: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.presets%20%3E%20(method)%20replace_preset_by_id%20%3E%20(params)%200%20%3E%20(param)%20permissions%20%3E%20(schema)>)

<details>

<summary>

ui: object {design\_tokens }

</summary>

<details>

<summary>

design\_tokens: object {border\_radius, border\_width, colors, 5 more }

</summary>

<details>

<summary>

border\_radius: "sharp"or "rounded"or "extra-rounded"or "circular"

</summary>

One of the following:

"sharp"

<a href="#">Link to this property</a>

"rounded"

<a href="#">Link to this property</a>

"extra-rounded"

<a href="#">Link to this property</a>

"circular"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

border\_width: "none"or "thin"or "fat"

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"thin"

<a href="#">Link to this property</a>

"fat"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

colors: object {background, brand, danger, 5 more }

</summary>

<details>

<summary>

background: object {"1000", "600", "700", 2 more }

</summary>

"1000": string

<a href="#">Link to this property</a>

"600": string

<a href="#">Link to this property</a>

"700": string

<a href="#">Link to this property</a>

"800": string

<a href="#">Link to this property</a>

"900": string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

brand: object {"300", "400", "500", 2 more }

</summary>

"300": string

<a href="#">Link to this property</a>

"400": string

<a href="#">Link to this property</a>

"500": string

<a href="#">Link to this property</a>

"600": string

<a href="#">Link to this property</a>

"700": string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

danger: string

<a href="#">Link to this property</a>

success: string

<a href="#">Link to this property</a>

text: string

<a href="#">Link to this property</a>

text\_on\_brand: string

<a href="#">Link to this property</a>

video\_bg: string

<a href="#">Link to this property</a>

warning: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

spacing\_base: number

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

theme: "darkest"or "dark"or "light"

</summary>

One of the following:

"darkest"

<a href="#">Link to this property</a>

"dark"

<a href="#">Link to this property</a>

"light"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

font\_family: optional string

<a href="#">Link to this property</a>

google\_font: optional string

<a href="#">Link to this property</a>

logo: optional string

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.presets%20%3E%20(method)%20replace_preset_by_id%20%3E%20(params)%200%20%3E%20(param)%20ui%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

data: object {id, config, created\_at, 4 more }

Data returned by the operation

</summary>

id: string

ID of the preset

formatuuid

<a href="#">Link to this property</a>

<details>

<summary>

config: object {max\_screenshare\_count, max\_video\_streams, media, 2 more }

</summary>

max\_screenshare\_count: number

Maximum number of screen shares that can be active at a given time

<a href="#">Link to this property</a>

<details>

<summary>

max\_video\_streams: object {desktop, mobile }

Maximum number of streams that are visible on a device

</summary>

desktop: number

Maximum number of video streams visible on desktop devices

<a href="#">Link to this property</a>

mobile: number

Maximum number of streams visible on mobile devices

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

media: object {screenshare, video, audio }

Media configuration options. eg: Video quality

</summary>

<details>

<summary>

screenshare: object {frame\_rate, quality }

Configuration options for participant screen shares

</summary>

frame\_rate: number

Frame rate of screen share

<a href="#">Link to this property</a>

<details>

<summary>

quality: "hd"or "vga"or "qvga"or 2 more

Quality of screen share

</summary>

One of the following:

"hd"

<a href="#">Link to this property</a>

"vga"

<a href="#">Link to this property</a>

"qvga"

<a href="#">Link to this property</a>

"fhd"

<a href="#">Link to this property</a>

"uhd"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

video: object {frame\_rate, quality, simulcast }

Configuration options for participant videos

</summary>

frame\_rate: number

Frame rate of participants’ video

maximum30

<a href="#">Link to this property</a>

<details>

<summary>

quality: "hd"or "vga"or "qvga"or 2 more

Video quality of participants

</summary>

One of the following:

"hd"

<a href="#">Link to this property</a>

"vga"

<a href="#">Link to this property</a>

"qvga"

<a href="#">Link to this property</a>

"fhd"

<a href="#">Link to this property</a>

"uhd"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

simulcast: optional boolean

Enable simulcast for participant videos.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

audio: optional object {enable\_high\_bitrate, enable\_stereo }

Control options for Audio quality.

</summary>

enable\_high\_bitrate: optional boolean

Enable High Quality Audio for your meetings

<a href="#">Link to this property</a>

enable\_stereo: optional boolean

Enable Stereo for your meetings

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

view\_type: "GROUP\_CALL"or "WEBINAR"or "AUDIO\_ROOM"or "LIVESTREAM"

Type of the meeting

</summary>

One of the following:

"GROUP\_CALL"

<a href="#">Link to this property</a>

"WEBINAR"

<a href="#">Link to this property</a>

"AUDIO\_ROOM"

<a href="#">Link to this property</a>

"LIVESTREAM"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

livestream\_viewer\_qualities: optional array of number

Livestream viewer quality levels.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: string

Timestamp this preset was created at

formatdate-time

<a href="#">Link to this property</a>

name: string

Name of the preset

<a href="#">Link to this property</a>

<details>

<summary>

permissions: object {accept\_waiting\_requests, can\_accept\_production\_requests, can\_change\_participant\_permissions, 23 more }

</summary>

accept\_waiting\_requests: boolean

Whether this participant can accept waiting requests

<a href="#">Link to this property</a>

can\_accept\_production\_requests: boolean

<a href="#">Link to this property</a>

can\_change\_participant\_permissions: boolean

<a href="#">Link to this property</a>

can\_edit\_display\_name: boolean

<a href="#">Link to this property</a>

can\_livestream: boolean

<a href="#">Link to this property</a>

can\_record: boolean

<a href="#">Link to this property</a>

can\_spotlight: boolean

<a href="#">Link to this property</a>

<details>

<summary>

chat: object {private, public }

</summary>

<details>

<summary>

private: object {can\_receive, can\_send, files, text }

</summary>

can\_receive: boolean

<a href="#">Link to this property</a>

can\_send: boolean

<a href="#">Link to this property</a>

files: boolean

<a href="#">Link to this property</a>

text: boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

public: object {can\_send, files, text }

</summary>

can\_send: boolean

Can send messages in general

<a href="#">Link to this property</a>

files: boolean

Can send file messages

<a href="#">Link to this property</a>

text: boolean

Can send text messages

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

connected\_meetings: object {can\_alter\_connected\_meetings, can\_switch\_connected\_meetings, can\_switch\_to\_parent\_meeting }

</summary>

can\_alter\_connected\_meetings: boolean

<a href="#">Link to this property</a>

can\_switch\_connected\_meetings: boolean

<a href="#">Link to this property</a>

can\_switch\_to\_parent\_meeting: boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

disable\_participant\_audio: boolean

<a href="#">Link to this property</a>

disable\_participant\_screensharing: boolean

<a href="#">Link to this property</a>

disable\_participant\_video: boolean

<a href="#">Link to this property</a>

hidden\_participant: boolean

Whether this participant is visible to others or not

<a href="#">Link to this property</a>

kick\_participant: boolean

<a href="#">Link to this property</a>

<details>

<summary>

media: object {audio, screenshare, video }

Media permissions

</summary>

<details>

<summary>

audio: object {can\_produce }

Audio permissions

</summary>

<details>

<summary>

can\_produce: "ALLOWED"or "NOT\_ALLOWED"or "CAN\_REQUEST"

Can produce audio

</summary>

One of the following:

"ALLOWED"

<a href="#">Link to this property</a>

"NOT\_ALLOWED"

<a href="#">Link to this property</a>

"CAN\_REQUEST"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

screenshare: object {can\_produce }

Screenshare permissions

</summary>

<details>

<summary>

can\_produce: "ALLOWED"or "NOT\_ALLOWED"or "CAN\_REQUEST"

Can produce screen share video

</summary>

One of the following:

"ALLOWED"

<a href="#">Link to this property</a>

"NOT\_ALLOWED"

<a href="#">Link to this property</a>

"CAN\_REQUEST"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

video: object {can\_produce }

Video permissions

</summary>

<details>

<summary>

can\_produce: "ALLOWED"or "NOT\_ALLOWED"or "CAN\_REQUEST"

Can produce video

</summary>

One of the following:

"ALLOWED"

<a href="#">Link to this property</a>

"NOT\_ALLOWED"

<a href="#">Link to this property</a>

"CAN\_REQUEST"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

pin\_participant: boolean

<a href="#">Link to this property</a>

<details>

<summary>

plugins: object {can\_close, can\_edit\_config, can\_start, config }

Plugin permissions

</summary>

can\_close: boolean

Can close plugins that are already open

<a href="#">Link to this property</a>

can\_edit\_config: boolean

Can edit plugin config

<a href="#">Link to this property</a>

can\_start: boolean

Can start plugins

<a href="#">Link to this property</a>

<details>

<summary>

config: map\[object {access\_control, handles\_view\_only } ]

Plugin configuration keyed by plugin UUID.

</summary>

<details>

<summary>

access\_control: optional "FULL\_ACCESS"or "VIEW\_ONLY"

</summary>

One of the following:

"FULL\_ACCESS"

<a href="#">Link to this property</a>

"VIEW\_ONLY"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

handles\_view\_only: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

polls: object {can\_create, can\_view, can\_vote }

Poll permissions

</summary>

can\_create: boolean

Can create polls

<a href="#">Link to this property</a>

can\_view: boolean

Can view polls

<a href="#">Link to this property</a>

can\_vote: boolean

Can vote on polls

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

recorder\_type: "RECORDER"or "LIVESTREAMER"or "NONE"

Type of the recording peer

</summary>

One of the following:

"RECORDER"

<a href="#">Link to this property</a>

"LIVESTREAMER"

<a href="#">Link to this property</a>

"NONE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

show\_participant\_list: boolean

<a href="#">Link to this property</a>

<details>

<summary>

waiting\_room\_type: "SKIP"or "ON\_PRIVILEGED\_USER\_ENTRY"or "SKIP\_ON\_ACCEPT"

Waiting room type

</summary>

One of the following:

"SKIP"

<a href="#">Link to this property</a>

"ON\_PRIVILEGED\_USER\_ENTRY"

<a href="#">Link to this property</a>

"SKIP\_ON\_ACCEPT"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

accept\_stage\_requests: optional boolean

<a href="#">Link to this property</a>

is\_recorder: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

stage\_access: optional "ALLOWED"or "NOT\_ALLOWED"or "CAN\_REQUEST"

</summary>

One of the following:

"ALLOWED"

<a href="#">Link to this property</a>

"NOT\_ALLOWED"

<a href="#">Link to this property</a>

"CAN\_REQUEST"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

stage\_enabled: optional boolean

<a href="#">Link to this property</a>

transcription\_enabled: optional boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ui: object {design\_tokens }

</summary>

<details>

<summary>

design\_tokens: object {border\_radius, border\_width, colors, 5 more }

</summary>

<details>

<summary>

border\_radius: "sharp"or "rounded"or "extra-rounded"or "circular"

</summary>

One of the following:

"sharp"

<a href="#">Link to this property</a>

"rounded"

<a href="#">Link to this property</a>

"extra-rounded"

<a href="#">Link to this property</a>

"circular"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

border\_width: "none"or "thin"or "fat"

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"thin"

<a href="#">Link to this property</a>

"fat"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

colors: object {background, brand, danger, 5 more }

</summary>

<details>

<summary>

background: object {"1000", "600", "700", 2 more }

</summary>

"1000": string

<a href="#">Link to this property</a>

"600": string

<a href="#">Link to this property</a>

"700": string

<a href="#">Link to this property</a>

"800": string

<a href="#">Link to this property</a>

"900": string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

brand: object {"300", "400", "500", 2 more }

</summary>

"300": string

<a href="#">Link to this property</a>

"400": string

<a href="#">Link to this property</a>

"500": string

<a href="#">Link to this property</a>

"600": string

<a href="#">Link to this property</a>

"700": string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

danger: string

<a href="#">Link to this property</a>

success: string

<a href="#">Link to this property</a>

text: string

<a href="#">Link to this property</a>

text\_on\_brand: string

<a href="#">Link to this property</a>

video\_bg: string

<a href="#">Link to this property</a>

warning: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

spacing\_base: number

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

theme: "darkest"or "dark"or "light"

</summary>

One of the following:

"darkest"

<a href="#">Link to this property</a>

"dark"

<a href="#">Link to this property</a>

"light"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

font\_family: optional string

<a href="#">Link to this property</a>

google\_font: optional string

<a href="#">Link to this property</a>

logo: optional string

formaturi

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: string

Timestamp this preset was last updated

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.presets%20%3E%20(model)%20preset_replace_preset_by_id_response%20%3E%20(schema)%20%3E%20(property)%20data>)

success: boolean

Success status of the operation

[Link to this property](#)%20realtime_kit.presets%20%3E%20(model)%20preset_replace_preset_by_id_response%20%3E%20(schema)%20%3E%20(property)%20success>)

### Replace a preset

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/presets/$PRESET_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "config": {
            "max_screenshare_count": 0,
            "max_video_streams": {
              "desktop": 0,
              "mobile": 0
            },
            "media": {
              "screenshare": {
                "frame_rate": 0,
                "quality": "hd"
              },
              "video": {
                "frame_rate": 30,
                "quality": "hd"
              }
            },
            "view_type": "GROUP_CALL"
          },
          "name": "name",
          "permissions": {
            "accept_waiting_requests": true,
            "can_accept_production_requests": true,
            "can_change_participant_permissions": true,
            "can_edit_display_name": true,
            "can_livestream": true,
            "can_record": true,
            "can_spotlight": true,
            "chat": {
              "private": {
                "can_receive": true,
                "can_send": true,
                "files": true,
                "text": true
              },
              "public": {
                "can_send": true,
                "files": true,
                "text": true
              }
            },
            "connected_meetings": {
              "can_alter_connected_meetings": true,
              "can_switch_connected_meetings": true,
              "can_switch_to_parent_meeting": true
            },
            "disable_participant_audio": true,
            "disable_participant_screensharing": true,
            "disable_participant_video": true,
            "hidden_participant": true,
            "kick_participant": true,
            "media": {
              "audio": {
                "can_produce": "ALLOWED"
              },
              "screenshare": {
                "can_produce": "ALLOWED"
              },
              "video": {
                "can_produce": "ALLOWED"
              }
            },
            "pin_participant": true,
            "plugins": {
              "can_close": true,
              "can_edit_config": true,
              "can_start": true,
              "config": {
                "foo": {}
              }
            },
            "polls": {
              "can_create": true,
              "can_view": true,
              "can_vote": true
            },
            "recorder_type": "RECORDER",
            "show_participant_list": true,
            "waiting_room_type": "SKIP"
          },
          "ui": {
            "design_tokens": {
              "border_radius": "sharp",
              "border_width": "none",
              "colors": {
                "background": {
                  "600": "600",
                  "700": "700",
                  "800": "800",
                  "900": "900",
                  "1000": "1000"
                },
                "brand": {
                  "300": "300",
                  "400": "400",
                  "500": "500",
                  "600": "600",
                  "700": "700"
                },
                "danger": "danger",
                "success": "success",
                "text": "text",
                "text_on_brand": "text_on_brand",
                "video_bg": "video_bg",
                "warning": "warning"
              },
              "spacing_base": 1,
              "theme": "darkest"
            }
          }
        }'
```

200 example

```
{
  "data": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "config": {
      "max_screenshare_count": 0,
      "max_video_streams": {
        "desktop": 0,
        "mobile": 0
      },
      "media": {
        "screenshare": {
          "frame_rate": 0,
          "quality": "hd"
        },
        "video": {
          "frame_rate": 30,
          "quality": "hd",
          "simulcast": true
        },
        "audio": {
          "enable_high_bitrate": true,
          "enable_stereo": true
        }
      },
      "view_type": "GROUP_CALL",
      "livestream_viewer_qualities": [
        0
      ]
    },
    "created_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "permissions": {
      "accept_waiting_requests": true,
      "can_accept_production_requests": true,
      "can_change_participant_permissions": true,
      "can_edit_display_name": true,
      "can_livestream": true,
      "can_record": true,
      "can_spotlight": true,
      "chat": {
        "private": {
          "can_receive": true,
          "can_send": true,
          "files": true,
          "text": true
        },
        "public": {
          "can_send": true,
          "files": true,
          "text": true
        }
      },
      "connected_meetings": {
        "can_alter_connected_meetings": true,
        "can_switch_connected_meetings": true,
        "can_switch_to_parent_meeting": true
      },
      "disable_participant_audio": true,
      "disable_participant_screensharing": true,
      "disable_participant_video": true,
      "hidden_participant": true,
      "kick_participant": true,
      "media": {
        "audio": {
          "can_produce": "ALLOWED"
        },
        "screenshare": {
          "can_produce": "ALLOWED"
        },
        "video": {
          "can_produce": "ALLOWED"
        }
      },
      "pin_participant": true,
      "plugins": {
        "can_close": true,
        "can_edit_config": true,
        "can_start": true,
        "config": {
          "foo": {
            "access_control": "FULL_ACCESS",
            "handles_view_only": true
          }
        }
      },
      "polls": {
        "can_create": true,
        "can_view": true,
        "can_vote": true
      },
      "recorder_type": "RECORDER",
      "show_participant_list": true,
      "waiting_room_type": "SKIP",
      "accept_stage_requests": true,
      "is_recorder": true,
      "stage_access": "ALLOWED",
      "stage_enabled": true,
      "transcription_enabled": true
    },
    "ui": {
      "design_tokens": {
        "border_radius": "sharp",
        "border_width": "none",
        "colors": {
          "background": {
            "600": "600",
            "700": "700",
            "800": "800",
            "900": "900",
            "1000": "1000"
          },
          "brand": {
            "300": "300",
            "400": "400",
            "500": "500",
            "600": "600",
            "700": "700"
          },
          "danger": "danger",
          "success": "success",
          "text": "text",
          "text_on_brand": "text_on_brand",
          "video_bg": "video_bg",
          "warning": "warning"
        },
        "spacing_base": 1,
        "theme": "darkest",
        "font_family": "font_family",
        "google_font": "google_font",
        "logo": "https://example.com"
      }
    },
    "updated_at": "2019-12-27T18:11:19.117Z"
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "data": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "config": {
      "max_screenshare_count": 0,
      "max_video_streams": {
        "desktop": 0,
        "mobile": 0
      },
      "media": {
        "screenshare": {
          "frame_rate": 0,
          "quality": "hd"
        },
        "video": {
          "frame_rate": 30,
          "quality": "hd",
          "simulcast": true
        },
        "audio": {
          "enable_high_bitrate": true,
          "enable_stereo": true
        }
      },
      "view_type": "GROUP_CALL",
      "livestream_viewer_qualities": [
        0
      ]
    },
    "created_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "permissions": {
      "accept_waiting_requests": true,
      "can_accept_production_requests": true,
      "can_change_participant_permissions": true,
      "can_edit_display_name": true,
      "can_livestream": true,
      "can_record": true,
      "can_spotlight": true,
      "chat": {
        "private": {
          "can_receive": true,
          "can_send": true,
          "files": true,
          "text": true
        },
        "public": {
          "can_send": true,
          "files": true,
          "text": true
        }
      },
      "connected_meetings": {
        "can_alter_connected_meetings": true,
        "can_switch_connected_meetings": true,
        "can_switch_to_parent_meeting": true
      },
      "disable_participant_audio": true,
      "disable_participant_screensharing": true,
      "disable_participant_video": true,
      "hidden_participant": true,
      "kick_participant": true,
      "media": {
        "audio": {
          "can_produce": "ALLOWED"
        },
        "screenshare": {
          "can_produce": "ALLOWED"
        },
        "video": {
          "can_produce": "ALLOWED"
        }
      },
      "pin_participant": true,
      "plugins": {
        "can_close": true,
        "can_edit_config": true,
        "can_start": true,
        "config": {
          "foo": {
            "access_control": "FULL_ACCESS",
            "handles_view_only": true
          }
        }
      },
      "polls": {
        "can_create": true,
        "can_view": true,
        "can_vote": true
      },
      "recorder_type": "RECORDER",
      "show_participant_list": true,
      "waiting_room_type": "SKIP",
      "accept_stage_requests": true,
      "is_recorder": true,
      "stage_access": "ALLOWED",
      "stage_enabled": true,
      "transcription_enabled": true
    },
    "ui": {
      "design_tokens": {
        "border_radius": "sharp",
        "border_width": "none",
        "colors": {
          "background": {
            "600": "600",
            "700": "700",
            "800": "800",
            "900": "900",
            "1000": "1000"
          },
          "brand": {
            "300": "300",
            "400": "400",
            "500": "500",
            "600": "600",
            "700": "700"
          },
          "danger": "danger",
          "success": "success",
          "text": "text",
          "text_on_brand": "text_on_brand",
          "video_bg": "video_bg",
          "warning": "warning"
        },
        "spacing_base": 1,
        "theme": "darkest",
        "font_family": "font_family",
        "google_font": "google_font",
        "logo": "https://example.com"
      }
    },
    "updated_at": "2019-12-27T18:11:19.117Z"
  },
  "success": true
}
```