---
title: Csam Scanner
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Csam Scanner

##### [Get CSAM Scanner setting](https://developers.cloudflare.com/api/resources/csam_scanner/methods/get)

GET/zones/{zone\_id}/settings/csam\_scanner\_third\_party

##### [Update CSAM Scanner setting](https://developers.cloudflare.com/api/resources/csam_scanner/methods/edit)

PATCH/zones/{zone\_id}/settings/csam\_scanner\_third\_party

##### ModelsExpand Collapse

<details>

<summary>

CsamScannerGetResponse object {id, editable, modified\_on, value }

CSAM Scanner configuration for a zone.

</summary>

id: optional "csam\_scanner"

The feature identifier.

<a href="#">Link to this property</a>

editable: optional boolean

Whether the feature state can be changed. When false, the zone or account may be locked by Trust &amp; Safety.

<a href="#">Link to this property</a>

modified\_on: optional string

When the setting was last modified. Currently always null as the server does not populate this field.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

value: optional object {email, email\_state, enabled, 2 more }

The CSAM Scanner feature configuration values. Contains the notification email and scanning enablement settings.

</summary>

email: optional string

Notification email address for CSAM scan results. Masked in responses unless explicitly unmasked via admin endpoint.

maxLength254

<a href="#">Link to this property</a>

<details>

<summary>

email\_state: optional "valid"or "pending"or "unverified"

Current verification state of the notification email.

</summary>

One of the following:

"valid"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"unverified"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: optional boolean

Whether CSAM scanning is enabled for this zone.

<a href="#">Link to this property</a>

sources: optional map\[boolean]

Map of scanning sources and their enabled state.

<a href="#">Link to this property</a>

zone\_plan: optional string

The zone’s plan level.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20csam_scanner%20%3E%20(model)%20csam_scanner_get_response%20%3E%20(schema)>)

<details>

<summary>

CsamScannerEditResponse object {id, editable, modified\_on, value }

CSAM Scanner configuration for a zone.

</summary>

id: optional "csam\_scanner"

The feature identifier.

<a href="#">Link to this property</a>

editable: optional boolean

Whether the feature state can be changed. When false, the zone or account may be locked by Trust &amp; Safety.

<a href="#">Link to this property</a>

modified\_on: optional string

When the setting was last modified. Currently always null as the server does not populate this field.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

value: optional object {email, email\_state, enabled, 2 more }

The CSAM Scanner feature configuration values. Contains the notification email and scanning enablement settings.

</summary>

email: optional string

Notification email address for CSAM scan results. Masked in responses unless explicitly unmasked via admin endpoint.

maxLength254

<a href="#">Link to this property</a>

<details>

<summary>

email\_state: optional "valid"or "pending"or "unverified"

Current verification state of the notification email.

</summary>

One of the following:

"valid"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"unverified"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

enabled: optional boolean

Whether CSAM scanning is enabled for this zone.

<a href="#">Link to this property</a>

sources: optional map\[boolean]

Map of scanning sources and their enabled state.

<a href="#">Link to this property</a>

zone\_plan: optional string

The zone’s plan level.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20csam_scanner%20%3E%20(model)%20csam_scanner_edit_response%20%3E%20(schema)>)