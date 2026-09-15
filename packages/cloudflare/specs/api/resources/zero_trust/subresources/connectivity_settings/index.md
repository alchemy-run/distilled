---
title: Connectivity Settings
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Connectivity Settings

##### [Get Zero Trust Connectivity Settings](https://developers.cloudflare.com/api/resources/zero_trust/subresources/connectivity_settings/methods/get)

GET/accounts/{account\_id}/zerotrust/connectivity\_settings

##### [Updates the Zero Trust Connectivity Settings](https://developers.cloudflare.com/api/resources/zero_trust/subresources/connectivity_settings/methods/edit)

PATCH/accounts/{account\_id}/zerotrust/connectivity\_settings

##### ModelsExpand Collapse

<details>

<summary>

ConnectivitySettingGetResponse object {icmp\_proxy\_enabled, offramp\_warp\_enabled }

</summary>

icmp\_proxy\_enabled: optional boolean

A flag to enable the ICMP proxy for the account network.

<a href="#">Link to this property</a>

offramp\_warp\_enabled: optional boolean

A flag to enable WARP to WARP traffic.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.connectivity_settings%20%3E%20(model)%20connectivity_setting_get_response%20%3E%20(schema)>)

<details>

<summary>

ConnectivitySettingEditResponse object {icmp\_proxy\_enabled, offramp\_warp\_enabled }

</summary>

icmp\_proxy\_enabled: optional boolean

A flag to enable the ICMP proxy for the account network.

<a href="#">Link to this property</a>

offramp\_warp\_enabled: optional boolean

A flag to enable WARP to WARP traffic.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.connectivity_settings%20%3E%20(model)%20connectivity_setting_edit_response%20%3E%20(schema)>)