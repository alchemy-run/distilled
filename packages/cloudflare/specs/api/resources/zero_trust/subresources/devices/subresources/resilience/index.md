---
title: Resilience
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Devices](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Resilience

#### ResilienceGlobal WARP Override

##### [Retrieve Global WARP override state](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/resilience/subresources/global_warp_override/methods/get)

GET/accounts/{account\_id}/devices/resilience/disconnect

##### [Set Global WARP override state](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/resilience/subresources/global_warp_override/methods/create)

POST/accounts/{account\_id}/devices/resilience/disconnect

##### ModelsExpand Collapse

<details>

<summary>

GlobalWARPOverrideGetResponse object {disconnect, timestamp }

</summary>

disconnect: optional boolean

Disconnects all devices on the account using Global WARP override.

<a href="#">Link to this property</a>

timestamp: optional string

When the Global WARP override state was updated.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.resilience.global_warp_override%20%3E%20(model)%20global_warp_override_get_response%20%3E%20(schema)>)

<details>

<summary>

GlobalWARPOverrideCreateResponse object {disconnect, timestamp }

</summary>

disconnect: optional boolean

Disconnects all devices on the account using Global WARP override.

<a href="#">Link to this property</a>

timestamp: optional string

When the Global WARP override state was updated.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.resilience.global_warp_override%20%3E%20(model)%20global_warp_override_create_response%20%3E%20(schema)>)