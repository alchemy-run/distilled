---
title: Devices
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Devices](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Devices

##### [List devices](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/devices/methods/list)

GET/accounts/{account\_id}/devices/physical-devices

##### [Get device](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/devices/methods/get)

GET/accounts/{account\_id}/devices/physical-devices/{device\_id}

##### [Delete device](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/devices/methods/delete)

DELETE/accounts/{account\_id}/devices/physical-devices/{device\_id}

##### [Revoke device registrations](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/devices/methods/revoke)

POST/accounts/{account\_id}/devices/physical-devices/{device\_id}/revoke

##### ModelsExpand Collapse

<details>

<summary>

DeviceListResponse object {id, active\_registrations, created\_at, 16 more }

A WARP Device.

</summary>

id: string

The unique ID of the device.

<a href="#">Link to this property</a>

active\_registrations: number

The number of active registrations for the device. Active registrations are those which haven’t been revoked or deleted.

<a href="#">Link to this property</a>

created\_at: string

The RFC3339 timestamp when the device was created.

<a href="#">Link to this property</a>

last\_seen\_at: string

The RFC3339 timestamp when the device was last seen.

<a href="#">Link to this property</a>

name: string

The name of the device.

<a href="#">Link to this property</a>

updated\_at: string

The RFC3339 timestamp when the device was last updated.

<a href="#">Link to this property</a>

client\_version: optional string

Version of the WARP client.

<a href="#">Link to this property</a>

deleted\_at: optional string

The RFC3339 timestamp when the device was deleted.

<a href="#">Link to this property</a>

device\_type: optional string

The device operating system.

<a href="#">Link to this property</a>

hardware\_id: optional string

A string that uniquely identifies the hardware or virtual machine (VM).

<a href="#">Link to this property</a>

<details>

<summary>

last\_seen\_registration: optional object {policy }

The last seen registration for the device.

</summary>

<details>

<summary>

policy: optional object {id, default, deleted, 2 more }

A summary of the device profile evaluated for the registration.

</summary>

id: string

The ID of the device settings profile.

<a href="#">Link to this property</a>

default: boolean

Whether the device settings profile is the default profile for the account.

<a href="#">Link to this property</a>

deleted: boolean

Whether the device settings profile was deleted.

<a href="#">Link to this property</a>

name: string

The name of the device settings profile.

<a href="#">Link to this property</a>

updated\_at: string

The RFC3339 timestamp of when the device settings profile last changed for the registration.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

last\_seen\_user: optional object {id, email, name }

The last user to use the WARP device.

</summary>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

email: optional string

The contact email address of the user.

maxLength90

<a href="#">Link to this property</a>

name: optional string

The enrolled device user’s name.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

mac\_address: optional string

The device MAC address.

<a href="#">Link to this property</a>

manufacturer: optional string

The device manufacturer.

<a href="#">Link to this property</a>

model: optional string

The model name of the device.

<a href="#">Link to this property</a>

os\_version: optional string

The device operating system version number.

<a href="#">Link to this property</a>

os\_version\_extra: optional string

Additional operating system version details. For Windows, the UBR (Update Build Revision). For Mac or iOS, the Product Version Extra. For Linux, the distribution name and version.

<a href="#">Link to this property</a>

Deprecatedpublic\_ip: optional string

**Deprecated**: IP information is provided by DEX - see <a href="https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/fleet_status/subresources/devices/methods/list/">https://developers.cloudflare.com/api/resources/zero\_trust/subresources/dex/subresources/fleet\_status/subresources/devices/methods/list/</a>

<a href="#">Link to this property</a>

serial\_number: optional string

The device serial number.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.devices%20%3E%20(model)%20device_list_response%20%3E%20(schema)>)

<details>

<summary>

DeviceGetResponse object {id, active\_registrations, created\_at, 16 more }

A WARP Device.

</summary>

id: string

The unique ID of the device.

<a href="#">Link to this property</a>

active\_registrations: number

The number of active registrations for the device. Active registrations are those which haven’t been revoked or deleted.

<a href="#">Link to this property</a>

created\_at: string

The RFC3339 timestamp when the device was created.

<a href="#">Link to this property</a>

last\_seen\_at: string

The RFC3339 timestamp when the device was last seen.

<a href="#">Link to this property</a>

name: string

The name of the device.

<a href="#">Link to this property</a>

updated\_at: string

The RFC3339 timestamp when the device was last updated.

<a href="#">Link to this property</a>

client\_version: optional string

Version of the WARP client.

<a href="#">Link to this property</a>

deleted\_at: optional string

The RFC3339 timestamp when the device was deleted.

<a href="#">Link to this property</a>

device\_type: optional string

The device operating system.

<a href="#">Link to this property</a>

hardware\_id: optional string

A string that uniquely identifies the hardware or virtual machine (VM).

<a href="#">Link to this property</a>

<details>

<summary>

last\_seen\_registration: optional object {policy }

The last seen registration for the device.

</summary>

<details>

<summary>

policy: optional object {id, default, deleted, 2 more }

A summary of the device profile evaluated for the registration.

</summary>

id: string

The ID of the device settings profile.

<a href="#">Link to this property</a>

default: boolean

Whether the device settings profile is the default profile for the account.

<a href="#">Link to this property</a>

deleted: boolean

Whether the device settings profile was deleted.

<a href="#">Link to this property</a>

name: string

The name of the device settings profile.

<a href="#">Link to this property</a>

updated\_at: string

The RFC3339 timestamp of when the device settings profile last changed for the registration.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

last\_seen\_user: optional object {id, email, name }

The last user to use the WARP device.

</summary>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

email: optional string

The contact email address of the user.

maxLength90

<a href="#">Link to this property</a>

name: optional string

The enrolled device user’s name.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

mac\_address: optional string

The device MAC address.

<a href="#">Link to this property</a>

manufacturer: optional string

The device manufacturer.

<a href="#">Link to this property</a>

model: optional string

The model name of the device.

<a href="#">Link to this property</a>

os\_version: optional string

The device operating system version number.

<a href="#">Link to this property</a>

os\_version\_extra: optional string

Additional operating system version details. For Windows, the UBR (Update Build Revision). For Mac or iOS, the Product Version Extra. For Linux, the distribution name and version.

<a href="#">Link to this property</a>

Deprecatedpublic\_ip: optional string

**Deprecated**: IP information is provided by DEX - see <a href="https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/fleet_status/subresources/devices/methods/list/">https://developers.cloudflare.com/api/resources/zero\_trust/subresources/dex/subresources/fleet\_status/subresources/devices/methods/list/</a>

<a href="#">Link to this property</a>

serial\_number: optional string

The device serial number.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.devices%20%3E%20(model)%20device_get_response%20%3E%20(schema)>)

DeviceDeleteResponse = unknown

[Link to this property](#)%20zero_trust.devices.devices%20%3E%20(model)%20device_delete_response%20%3E%20(schema)>)

DeviceRevokeResponse = unknown

[Link to this property](#)%20zero_trust.devices.devices%20%3E%20(model)%20device_revoke_response%20%3E%20(schema)>)