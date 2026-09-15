---
title: Control
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Logs](https://developers.cloudflare.com/api/resources/logs)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Control

#### ControlRetention

##### [Get log retention flag](https://developers.cloudflare.com/api/resources/logs/subresources/control/subresources/retention/methods/get)

GET/zones/{zone\_id}/logs/control/retention/flag

##### [Update log retention flag](https://developers.cloudflare.com/api/resources/logs/subresources/control/subresources/retention/methods/create)

POST/zones/{zone\_id}/logs/control/retention/flag

##### ModelsExpand Collapse

<details>

<summary>

RetentionGetResponse object {flag }

</summary>

flag: optional boolean

The log retention flag for Logpull API.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20logs.control.retention%20%3E%20(model)%20retention_get_response%20%3E%20(schema)>)

<details>

<summary>

RetentionCreateResponse object {flag }

</summary>

flag: optional boolean

The log retention flag for Logpull API.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20logs.control.retention%20%3E%20(model)%20retention_create_response%20%3E%20(schema)>)

#### ControlCmb

#### ControlCmbConfig

##### [Get CMB config](https://developers.cloudflare.com/api/resources/logs/subresources/control/subresources/cmb/subresources/config/methods/get)

GET/accounts/{account\_id}/logs/control/cmb/config

##### [Update CMB config](https://developers.cloudflare.com/api/resources/logs/subresources/control/subresources/cmb/subresources/config/methods/create)

POST/accounts/{account\_id}/logs/control/cmb/config

##### [Delete CMB config](https://developers.cloudflare.com/api/resources/logs/subresources/control/subresources/cmb/subresources/config/methods/delete)

DELETE/accounts/{account\_id}/logs/control/cmb/config

##### ModelsExpand Collapse

<details>

<summary>

CmbConfig object {allow\_out\_of\_region\_access, regions }

</summary>

allow\_out\_of\_region\_access: optional boolean

Allow out of region access

<a href="#">Link to this property</a>

regions: optional string

Name of the region.

maxLength256

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20logs.control.cmb.config%20%3E%20(model)%20cmb_config%20%3E%20(schema)>)

ConfigDeleteResponse = unknown

[Link to this property](#)%20logs.control.cmb.config%20%3E%20(model)%20config_delete_response%20%3E%20(schema)>)