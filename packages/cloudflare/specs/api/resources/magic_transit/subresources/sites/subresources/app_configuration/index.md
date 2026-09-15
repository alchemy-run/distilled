---
title: App Configuration
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Magic Transit](https://developers.cloudflare.com/api/resources/magic_transit)

[Sites](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# App Configuration

##### [List App Configs](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/app_configuration/methods/list)

GET/accounts/{account\_id}/magic/sites/{site\_id}/app\_configs

##### [Create a new App Config](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/app_configuration/methods/create)

POST/accounts/{account\_id}/magic/sites/{site\_id}/app\_configs

##### [Update an App Config](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/app_configuration/methods/update)

PUT/accounts/{account\_id}/magic/sites/{site\_id}/app\_configs/{app\_config\_id}

##### [Update an App Config](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/app_configuration/methods/edit)

PATCH/accounts/{account\_id}/magic/sites/{site\_id}/app\_configs/{app\_config\_id}

##### [Delete App Config](https://developers.cloudflare.com/api/resources/magic_transit/subresources/sites/subresources/app_configuration/methods/delete)

DELETE/accounts/{account\_id}/magic/sites/{site\_id}/app\_configs/{app\_config\_id}

##### ModelsExpand Collapse

<details>

<summary>

AppConfigurationListResponse = object {account\_app\_id, id, breakout, 3 more } or object {managed\_app\_id, id, breakout, 3 more }

Traffic decision configuration for an app.

</summary>

One of the following:

<details>

<summary>

AccountApp object {account\_app\_id, id, breakout, 3 more }

</summary>

account\_app\_id: string

Magic account app ID.

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

breakout: optional boolean

Whether to breakout traffic to the app’s endpoints directly. Null preserves default behavior.

<a href="#">Link to this property</a>

preferred\_wans: optional array of string

WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

<a href="#">Link to this property</a>

priority: optional number

Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

maximum1

minimum0

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ManagedApp object {managed\_app\_id, id, breakout, 3 more }

</summary>

managed\_app\_id: string

Managed app ID.

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

breakout: optional boolean

Whether to breakout traffic to the app’s endpoints directly. Null preserves default behavior.

<a href="#">Link to this property</a>

preferred\_wans: optional array of string

WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

<a href="#">Link to this property</a>

priority: optional number

Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

maximum1

minimum0

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.app_configuration%20%3E%20(model)%20app_configuration_list_response%20%3E%20(schema)>)

<details>

<summary>

AppConfigurationCreateResponse = object {account\_app\_id, id, breakout, 3 more } or object {managed\_app\_id, id, breakout, 3 more }

Traffic decision configuration for an app.

</summary>

One of the following:

<details>

<summary>

AccountApp object {account\_app\_id, id, breakout, 3 more }

</summary>

account\_app\_id: string

Magic account app ID.

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

breakout: optional boolean

Whether to breakout traffic to the app’s endpoints directly. Null preserves default behavior.

<a href="#">Link to this property</a>

preferred\_wans: optional array of string

WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

<a href="#">Link to this property</a>

priority: optional number

Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

maximum1

minimum0

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ManagedApp object {managed\_app\_id, id, breakout, 3 more }

</summary>

managed\_app\_id: string

Managed app ID.

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

breakout: optional boolean

Whether to breakout traffic to the app’s endpoints directly. Null preserves default behavior.

<a href="#">Link to this property</a>

preferred\_wans: optional array of string

WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

<a href="#">Link to this property</a>

priority: optional number

Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

maximum1

minimum0

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.app_configuration%20%3E%20(model)%20app_configuration_create_response%20%3E%20(schema)>)

<details>

<summary>

AppConfigurationUpdateResponse = object {account\_app\_id, id, breakout, 3 more } or object {managed\_app\_id, id, breakout, 3 more }

Traffic decision configuration for an app.

</summary>

One of the following:

<details>

<summary>

AccountApp object {account\_app\_id, id, breakout, 3 more }

</summary>

account\_app\_id: string

Magic account app ID.

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

breakout: optional boolean

Whether to breakout traffic to the app’s endpoints directly. Null preserves default behavior.

<a href="#">Link to this property</a>

preferred\_wans: optional array of string

WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

<a href="#">Link to this property</a>

priority: optional number

Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

maximum1

minimum0

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ManagedApp object {managed\_app\_id, id, breakout, 3 more }

</summary>

managed\_app\_id: string

Managed app ID.

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

breakout: optional boolean

Whether to breakout traffic to the app’s endpoints directly. Null preserves default behavior.

<a href="#">Link to this property</a>

preferred\_wans: optional array of string

WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

<a href="#">Link to this property</a>

priority: optional number

Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

maximum1

minimum0

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.app_configuration%20%3E%20(model)%20app_configuration_update_response%20%3E%20(schema)>)

<details>

<summary>

AppConfigurationEditResponse = object {account\_app\_id, id, breakout, 3 more } or object {managed\_app\_id, id, breakout, 3 more }

Traffic decision configuration for an app.

</summary>

One of the following:

<details>

<summary>

AccountApp object {account\_app\_id, id, breakout, 3 more }

</summary>

account\_app\_id: string

Magic account app ID.

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

breakout: optional boolean

Whether to breakout traffic to the app’s endpoints directly. Null preserves default behavior.

<a href="#">Link to this property</a>

preferred\_wans: optional array of string

WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

<a href="#">Link to this property</a>

priority: optional number

Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

maximum1

minimum0

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ManagedApp object {managed\_app\_id, id, breakout, 3 more }

</summary>

managed\_app\_id: string

Managed app ID.

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

breakout: optional boolean

Whether to breakout traffic to the app’s endpoints directly. Null preserves default behavior.

<a href="#">Link to this property</a>

preferred\_wans: optional array of string

WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

<a href="#">Link to this property</a>

priority: optional number

Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

maximum1

minimum0

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.app_configuration%20%3E%20(model)%20app_configuration_edit_response%20%3E%20(schema)>)

<details>

<summary>

AppConfigurationDeleteResponse = object {account\_app\_id, id, breakout, 3 more } or object {managed\_app\_id, id, breakout, 3 more }

Traffic decision configuration for an app.

</summary>

One of the following:

<details>

<summary>

AccountApp object {account\_app\_id, id, breakout, 3 more }

</summary>

account\_app\_id: string

Magic account app ID.

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

breakout: optional boolean

Whether to breakout traffic to the app’s endpoints directly. Null preserves default behavior.

<a href="#">Link to this property</a>

preferred\_wans: optional array of string

WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

<a href="#">Link to this property</a>

priority: optional number

Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

maximum1

minimum0

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ManagedApp object {managed\_app\_id, id, breakout, 3 more }

</summary>

managed\_app\_id: string

Managed app ID.

<a href="#">Link to this property</a>

id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

breakout: optional boolean

Whether to breakout traffic to the app’s endpoints directly. Null preserves default behavior.

<a href="#">Link to this property</a>

preferred\_wans: optional array of string

WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

<a href="#">Link to this property</a>

priority: optional number

Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

maximum1

minimum0

<a href="#">Link to this property</a>

site\_id: optional string

Identifier

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.sites.app_configuration%20%3E%20(model)%20app_configuration_delete_response%20%3E%20(schema)>)