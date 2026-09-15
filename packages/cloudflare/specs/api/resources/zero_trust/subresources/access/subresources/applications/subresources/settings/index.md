---
title: Settings
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

[Applications](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/applications)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Settings

##### [Update Access application settings](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/applications/subresources/settings/methods/update)

PUT/{accounts\_or\_zones}/{account\_or\_zone\_id}/access/apps/{app\_id}/settings

##### [Update Access application settings](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/applications/subresources/settings/methods/edit)

PATCH/{accounts\_or\_zones}/{account\_or\_zone\_id}/access/apps/{app\_id}/settings

##### ModelsExpand Collapse

<details>

<summary>

SettingUpdateResponse object {allow\_iframe, skip\_interstitial }

</summary>

allow\_iframe: optional boolean

Enables loading application content in an iFrame.

<a href="#">Link to this property</a>

skip\_interstitial: optional boolean

Enables automatic authentication through cloudflared.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.applications.settings%20%3E%20(model)%20setting_update_response%20%3E%20(schema)>)

<details>

<summary>

SettingEditResponse object {allow\_iframe, skip\_interstitial }

</summary>

allow\_iframe: optional boolean

Enables loading application content in an iFrame.

<a href="#">Link to this property</a>

skip\_interstitial: optional boolean

Enables automatic authentication through cloudflared.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.applications.settings%20%3E%20(model)%20setting_edit_response%20%3E%20(schema)>)