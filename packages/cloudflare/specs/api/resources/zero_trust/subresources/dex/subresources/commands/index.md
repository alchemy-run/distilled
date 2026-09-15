---
title: Commands
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DEX](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Commands

##### [List account commands](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/commands/methods/list)

GET/accounts/{account\_id}/dex/commands

##### [Create account commands](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/commands/methods/create)

POST/accounts/{account\_id}/dex/commands

##### ModelsExpand Collapse

<details>

<summary>

CommandListResponse object {commands }

</summary>

<details>

<summary>

commands: optional array of object {id, completed\_date, created\_date, 6 more }

</summary>

id: optional string

<a href="#">Link to this property</a>

completed\_date: optional string

formatdate-time

<a href="#">Link to this property</a>

created\_date: optional string

formatdate-time

<a href="#">Link to this property</a>

device\_id: optional string

<a href="#">Link to this property</a>

filename: optional string

<a href="#">Link to this property</a>

registration\_id: optional string

Unique identifier for the device registration

<a href="#">Link to this property</a>

status: optional string

<a href="#">Link to this property</a>

type: optional string

<a href="#">Link to this property</a>

user\_email: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.commands%20%3E%20(model)%20command_list_response%20%3E%20(schema)>)

<details>

<summary>

CommandCreateResponse object {commands }

</summary>

<details>

<summary>

commands: optional array of object {id, args, device\_id, 3 more }

List of created commands

</summary>

id: optional string

Unique identifier for the command

<a href="#">Link to this property</a>

args: optional map\[string]

Command arguments

<a href="#">Link to this property</a>

device\_id: optional string

Identifier for the device associated with the command

<a href="#">Link to this property</a>

registration\_id: optional string

Unique identifier for the device registration

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "PENDING\_EXEC"or "PENDING\_UPLOAD"or "SUCCESS"or "FAILED"

Current status of the command

</summary>

One of the following:

"PENDING\_EXEC"

<a href="#">Link to this property</a>

"PENDING\_UPLOAD"

<a href="#">Link to this property</a>

"SUCCESS"

<a href="#">Link to this property</a>

"FAILED"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: optional string

Type of the command (e.g., “pcap”, “speed-test”, or “warp-diag”)

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.commands%20%3E%20(model)%20command_create_response%20%3E%20(schema)>)

#### CommandsDevices

##### [List devices eligible for remote captures](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/commands/subresources/devices/methods/list)

GET/accounts/{account\_id}/dex/commands/devices

##### ModelsExpand Collapse

<details>

<summary>

DeviceListResponse object {devices }

</summary>

<details>

<summary>

devices: optional array of object {deviceId, deviceName, eligible, 7 more }

List of eligible devices

</summary>

deviceId: optional string

Device identifier (UUID v4)

<a href="#">Link to this property</a>

deviceName: optional string

Device identifier (human readable)

<a href="#">Link to this property</a>

eligible: optional boolean

Whether the device is eligible for remote captures

<a href="#">Link to this property</a>

ineligibleReason: optional string

If the device is not eligible, the reason why.

<a href="#">Link to this property</a>

personEmail: optional string

User contact email address

<a href="#">Link to this property</a>

platform: optional string

Operating system.

<a href="#">Link to this property</a>

registrationId: optional string

Device registration identifier (UUID v4). On multi-user devices, this uniquely identifies a user’s registration on the device.

<a href="#">Link to this property</a>

status: optional string

Network status.

<a href="#">Link to this property</a>

timestamp: optional string

<a href="#">Link to this property</a>

version: optional string

WARP client version.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.commands.devices%20%3E%20(model)%20device_list_response%20%3E%20(schema)>)

#### CommandsDownloads

##### [Download command output file](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/commands/subresources/downloads/methods/get)

GET/accounts/{account\_id}/dex/commands/{command\_id}/downloads/{filename}

#### CommandsQuota

##### [Returns account commands usage, quota, and reset time](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/commands/subresources/quota/methods/get)

GET/accounts/{account\_id}/dex/commands/quota

##### ModelsExpand Collapse

<details>

<summary>

QuotaGetResponse object {quota, quota\_usage, reset\_time }

</summary>

quota: number

The total number of commands that can be initiated for an account.

<a href="#">Link to this property</a>

quota\_usage: number

The number of commands that have been initiated for an account.

<a href="#">Link to this property</a>

reset\_time: string

The time when the quota resets.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.commands.quota%20%3E%20(model)%20quota_get_response%20%3E%20(schema)>)