---
title: IP Profiles
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Devices](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# IP Profiles

##### [List IP profiles](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/ip_profiles/methods/list)

GET/accounts/{account\_id}/devices/ip-profiles

##### [Get IP profile](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/ip_profiles/methods/get)

GET/accounts/{account\_id}/devices/ip-profiles/{profile\_id}

##### [Create IP profile](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/ip_profiles/methods/create)

POST/accounts/{account\_id}/devices/ip-profiles

##### [Update IP profile](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/ip_profiles/methods/update)

PATCH/accounts/{account\_id}/devices/ip-profiles/{profile\_id}

##### [Delete IP profile](https://developers.cloudflare.com/api/resources/zero_trust/subresources/devices/subresources/ip_profiles/methods/delete)

DELETE/accounts/{account\_id}/devices/ip-profiles/{profile\_id}

##### ModelsExpand Collapse

<details>

<summary>

IPProfile object {id, created\_at, description, 6 more }

</summary>

id: string

The ID of the Device IP profile.

<a href="#">Link to this property</a>

created\_at: string

The RFC3339Nano timestamp when the Device IP profile was created.

<a href="#">Link to this property</a>

description: string

An optional description of the Device IP profile.

<a href="#">Link to this property</a>

enabled: boolean

Whether the Device IP profile is enabled.

<a href="#">Link to this property</a>

match: string

The wirefilter expression to match registrations. Available values: “identity.name”, “identity.email”, “identity.groups.id”, “identity.groups.name”, “identity.groups.email”, “identity.saml\_attributes”.

maxLength10000

<a href="#">Link to this property</a>

name: string

A user-friendly name for the Device IP profile.

<a href="#">Link to this property</a>

precedence: number

The precedence of the Device IP profile. Lower values indicate higher precedence. Device IP profile will be evaluated in ascending order of this field.

<a href="#">Link to this property</a>

subnet\_id: string

The ID of the Subnet.

<a href="#">Link to this property</a>

updated\_at: string

The RFC3339Nano timestamp when the Device IP profile was last updated.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.ip_profiles%20%3E%20(model)%20ip_profile%20%3E%20(schema)>)

<details>

<summary>

IPProfileDeleteResponse object {id }

</summary>

id: optional string

ID of the deleted Device IP profile.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.devices.ip_profiles%20%3E%20(model)%20ip_profile_delete_response%20%3E%20(schema)>)