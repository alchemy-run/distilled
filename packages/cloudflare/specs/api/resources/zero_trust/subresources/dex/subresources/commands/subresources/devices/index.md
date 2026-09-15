---
title: Devices
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DEX](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex)

[Commands](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/commands)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Devices

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