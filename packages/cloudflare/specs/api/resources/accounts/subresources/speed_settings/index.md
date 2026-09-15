---
title: Speed Settings
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Accounts](https://developers.cloudflare.com/api/resources/accounts)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Speed Settings

#### Speed SettingsTransformations

##### [List Image Resizing configurations for account](https://developers.cloudflare.com/api/resources/accounts/subresources/speed_settings/subresources/transformations/methods/get)

GET/accounts/{account\_id}/settings/transformations

##### ModelsExpand Collapse

<details>

<summary>

TransformationsConfig object {id, cf\_zone\_tag, editable, 2 more }

A configuration item for a specific zone and feature.

</summary>

id: optional string

Feature identifier.

<a href="#">Link to this property</a>

cf\_zone\_tag: optional string

Zone tag identifier.

<a href="#">Link to this property</a>

editable: optional boolean

Whether this setting can be modified.

<a href="#">Link to this property</a>

modified\_on: optional string

When this setting was last modified.

formatdate-time

<a href="#">Link to this property</a>

value: optional string

Current value of the feature setting.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.speed_settings.transformations%20%3E%20(model)%20transformations_config%20%3E%20(schema)>)