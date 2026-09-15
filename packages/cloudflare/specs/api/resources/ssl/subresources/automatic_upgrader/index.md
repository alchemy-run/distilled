---
title: Automatic Upgrader
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[SSL](https://developers.cloudflare.com/api/resources/ssl)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Automatic Upgrader

##### [Get Automatic SSL/TLS enrollment status for the given zone](https://developers.cloudflare.com/api/resources/ssl/subresources/automatic_upgrader/methods/get)

GET/zones/{zone\_id}/settings/ssl\_automatic\_mode

##### [Patch Automatic SSL/TLS Enrollment status for given zone](https://developers.cloudflare.com/api/resources/ssl/subresources/automatic_upgrader/methods/patch)

PATCH/zones/{zone\_id}/settings/ssl\_automatic\_mode

##### ModelsExpand Collapse

<details>

<summary>

AutomaticUpgraderGetResponse object {id, editable, modified\_on, 2 more }

</summary>

id: string

<a href="#">Link to this property</a>

editable: boolean

Whether this setting can be updated or not.

<a href="#">Link to this property</a>

modified\_on: string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

value: "auto"or "custom"

Current setting of the automatic SSL/TLS.

</summary>

One of the following:

"auto"

<a href="#">Link to this property</a>

"custom"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

next\_scheduled\_scan: optional string

Next time this zone will be scanned by the Automatic SSL/TLS.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ssl.automatic_upgrader%20%3E%20(model)%20automatic_upgrader_get_response%20%3E%20(schema)>)

<details>

<summary>

AutomaticUpgraderPatchResponse object {id, editable, modified\_on, 2 more }

</summary>

id: string

<a href="#">Link to this property</a>

editable: boolean

Whether this setting can be updated or not.

<a href="#">Link to this property</a>

modified\_on: string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

value: "auto"or "custom"

Current setting of the automatic SSL/TLS.

</summary>

One of the following:

"auto"

<a href="#">Link to this property</a>

"custom"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

next\_scheduled\_scan: optional string

Next time this zone will be scanned by the Automatic SSL/TLS.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ssl.automatic_upgrader%20%3E%20(model)%20automatic_upgrader_patch_response%20%3E%20(schema)>)