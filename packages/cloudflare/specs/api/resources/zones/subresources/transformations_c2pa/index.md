---
title: Transformations C2pa
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zones](https://developers.cloudflare.com/api/resources/zones)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Transformations C2pa

##### [Get Image Transformations C2PA setting](https://developers.cloudflare.com/api/resources/zones/subresources/transformations_c2pa/methods/get)

GET/zones/{zone\_id}/settings/transformations\_c2pa

##### [Change Image Transformations C2PA setting](https://developers.cloudflare.com/api/resources/zones/subresources/transformations_c2pa/methods/edit)

PATCH/zones/{zone\_id}/settings/transformations\_c2pa

##### ModelsExpand Collapse

<details>

<summary>

TransformationsC2pa object {id, editable, modified\_on, value }

Controls C2PA signing for images processed through Cloudflare Image Transformations.

</summary>

id: optional "image\_resizing\_c2pa"

ID of the zone setting.

<a href="#">Link to this property</a>

<details>

<summary>

editable: optional trueor false

Whether or not this setting can be modified for this zone (based on your Cloudflare plan level).

</summary>

One of the following:

true

<a href="#">Link to this property</a>

false

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

value: optional "on"or "off"

Current value of the zone setting.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zones.transformations_c2pa%20%3E%20(model)%20transformations_c2pa%20%3E%20(schema)>)