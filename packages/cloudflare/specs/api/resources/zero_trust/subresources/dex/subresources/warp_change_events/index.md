---
title: WARP Change Events
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[DEX](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# WARP Change Events

##### [List WARP change events.](https://developers.cloudflare.com/api/resources/zero_trust/subresources/dex/subresources/warp_change_events/methods/get)

GET/accounts/{account\_id}/dex/warp-change-events

##### ModelsExpand Collapse

<details>

<summary>

WARPChangeEventGetResponse = array of object {account\_name, account\_tag, device\_id, 7 more } or object {device\_id, device\_registration, from, 6 more }

</summary>

One of the following:

<details>

<summary>

DigitalExperienceMonitoringWARPToggleChangeEvent object {account\_name, account\_tag, device\_id, 7 more }

</summary>

account\_name: optional string

The account name.

<a href="#">Link to this property</a>

account\_tag: optional string

The public account identifier.

<a href="#">Link to this property</a>

device\_id: optional string

The device ID.

maxLength36

<a href="#">Link to this property</a>

Deprecateddevice\_registration: optional string

Use <code>registration_id</code> instead.

Deprecated: use registration\_id. The device registration ID.

maxLength36

<a href="#">Link to this property</a>

hostname: optional string

The hostname of the machine the event is from.

<a href="#">Link to this property</a>

registration\_id: optional string

The device registration ID.

maxLength36

<a href="#">Link to this property</a>

serial\_number: optional string

The serial number of the machine the event is from.

<a href="#">Link to this property</a>

timestamp: optional string

The event time.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

toggle: optional "on"or "off"

The state of the WARP toggle.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

user\_email: optional string

Email tied to the device.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DigitalExperienceMonitoringWARPConfigChangeEvent object {device\_id, device\_registration, from, 6 more }

</summary>

device\_id: optional string

The device ID.

maxLength36

<a href="#">Link to this property</a>

Deprecateddevice\_registration: optional string

Use <code>registration_id</code> instead.

Deprecated: use registration\_id. The device registration ID.

maxLength36

<a href="#">Link to this property</a>

<details>

<summary>

from: optional object {account\_name, account\_tag, config\_name }

The details for the WARP configuration that was switched from.

</summary>

account\_name: optional string

The account name.

<a href="#">Link to this property</a>

account\_tag: optional string

The public account identifier.

maxLength36

<a href="#">Link to this property</a>

config\_name: optional string

The name of the WARP configuration.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

hostname: optional string

The hostname of the machine the event is from.

<a href="#">Link to this property</a>

registration\_id: optional string

The device registration ID.

maxLength36

<a href="#">Link to this property</a>

serial\_number: optional string

The serial number of the machine the event is from.

<a href="#">Link to this property</a>

timestamp: optional string

The event time.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

to: optional object {account\_name, account\_tag, config\_name }

The details for the WARP configuration that was switched to.

</summary>

account\_name: optional string

The account name.

<a href="#">Link to this property</a>

account\_tag: optional string

The public account identifier.

maxLength36

<a href="#">Link to this property</a>

config\_name: optional string

The name of the WARP configuration.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

user\_email: optional string

Email tied to the device.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.dex.warp_change_events%20%3E%20(model)%20warp_change_event_get_response%20%3E%20(schema)>)