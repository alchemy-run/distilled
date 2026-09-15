---
title: Presets
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Realtime Kit](https://developers.cloudflare.com/api/resources/realtime_kit)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Presets

##### [Fetch all presets](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/presets/methods/get)

GET/accounts/{account\_id}/realtime/kit/{app\_id}/presets

##### [Create a preset](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/presets/methods/create)

POST/accounts/{account\_id}/realtime/kit/{app\_id}/presets

##### [Fetch details of a preset](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/presets/methods/get_preset_by_id)

GET/accounts/{account\_id}/realtime/kit/{app\_id}/presets/{preset\_id}

##### [Delete a preset](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/presets/methods/delete)

DELETE/accounts/{account\_id}/realtime/kit/{app\_id}/presets/{preset\_id}

##### [Update a preset](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/presets/methods/update)

PATCH/accounts/{account\_id}/realtime/kit/{app\_id}/presets/{preset\_id}

##### [Replace a preset](https://developers.cloudflare.com/api/resources/realtime_kit/subresources/presets/methods/replace_preset_by_id)

PUT/accounts/{account\_id}/realtime/kit/{app\_id}/presets/{preset\_id}

##### ModelsExpand Collapse

<details>

<summary>

PresetGetResponse object {data, paging, success }

</summary>

<details>

<summary>

data: array of object {id, created\_at, name, updated\_at }

</summary>

id: optional string

ID of the preset

formatuuid

<a href="#">Link to this property</a>

created\_at: optional string

Timestamp this preset was created at

formatdate-time

<a href="#">Link to this property</a>

name: optional string

Name of the preset

<a href="#">Link to this property</a>

updated\_at: optional string

Timestamp this preset was last updated

formatdate-time

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

[Link to this property](#)%20realtime_kit.presets%20%3E%20(model)%20preset_get_response%20%3E%20(schema)>)

<details>

<summary>

PresetCreateResponse object {data, success }

</summary>

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

<a href="#">Link to this property</a>

success: boolean

Success status of the operation

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.presets%20%3E%20(model)%20preset_create_response%20%3E%20(schema)>)

<details>

<summary>

PresetGetPresetByIDResponse object {data, success }

</summary>

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

<a href="#">Link to this property</a>

success: boolean

Success status of the operation

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.presets%20%3E%20(model)%20preset_get_preset_by_id_response%20%3E%20(schema)>)

<details>

<summary>

PresetDeleteResponse object {data, success }

</summary>

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

<a href="#">Link to this property</a>

success: boolean

Success status of the operation

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.presets%20%3E%20(model)%20preset_delete_response%20%3E%20(schema)>)

<details>

<summary>

PresetUpdateResponse object {data, success }

</summary>

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

<a href="#">Link to this property</a>

success: boolean

Success status of the operation

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.presets%20%3E%20(model)%20preset_update_response%20%3E%20(schema)>)

<details>

<summary>

PresetReplacePresetByIDResponse object {data, success }

</summary>

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

<a href="#">Link to this property</a>

success: boolean

Success status of the operation

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20realtime_kit.presets%20%3E%20(model)%20preset_replace_preset_by_id_response%20%3E%20(schema)>)