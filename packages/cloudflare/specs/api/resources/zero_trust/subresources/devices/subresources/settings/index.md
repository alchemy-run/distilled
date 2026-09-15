---
title: Settings
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Devices](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Settings

##### [Get device settings for a Zero Trust account](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/settings/methods/get)

GET/accounts/{account\_id}/devices/settings

##### [Update device settings for a Zero Trust account](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/settings/methods/update)

PUT/accounts/{account\_id}/devices/settings

##### [Patch device settings for a Zero Trust account](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/settings/methods/edit)

PATCH/accounts/{account\_id}/devices/settings

##### [Reset device settings for a Zero Trust account with defaults. This turns off all proxying.](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/settings/methods/delete)

DELETE/accounts/{account\_id}/devices/settings

##### ModelsExpand Collapse

<details>

<summary>

DeviceSettings object {disable\_for\_time, external\_emergency\_signal\_enabled, external\_emergency\_signal\_fingerprint, 6 more }

</summary>

disable\_for\_time: optional number

Sets the time limit, in seconds, that a user can use an override code to bypass WARP.

<a href="#">Link to this property</a>

external\_emergency\_signal\_enabled: optional boolean

Controls whether the external emergency disconnect feature is enabled.

<a href="#">Link to this property</a>

external\_emergency\_signal\_fingerprint: optional string

The SHA256 fingerprint (64 hexadecimal characters) of the HTTPS server certificate for the external\_emergency\_signal\_url. If provided, the WARP client will use this value to verify the server’s identity. The device will ignore any response if the server’s certificate fingerprint does not exactly match this value.

<a href="#">Link to this property</a>

external\_emergency\_signal\_interval: optional string

The interval at which the WARP client fetches the emergency disconnect signal, formatted as a duration string (e.g., “5m”, “2m30s”, “1h”). Minimum 30 seconds.

<a href="#">Link to this property</a>

external\_emergency\_signal\_url: optional string

The HTTPS URL from which to fetch the emergency disconnect signal. Must use HTTPS and have an IPv4 or IPv6 address as the host.

<a href="#">Link to this property</a>

gateway\_proxy\_enabled: optional boolean

Enable gateway proxy filtering on TCP.

<a href="#">Link to this property</a>

gateway\_udp\_proxy\_enabled: optional boolean

Enable gateway proxy filtering on UDP.

<a href="#">Link to this property</a>

root\_certificate\_installation\_enabled: optional boolean

Enable installation of cloudflare managed root certificate.

<a href="#">Link to this property</a>

use\_zt\_virtual\_ip: optional boolean

Enable using CGNAT virtual IPv4.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.settings%20%3E%20(model)%20device_settings%20%3E%20(schema)>)