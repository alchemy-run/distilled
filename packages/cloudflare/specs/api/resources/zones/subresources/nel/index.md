---
title: NEL
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zones](https://developers.cloudflare.com/api/resources/zones)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# NEL

##### [Get NEL setting](https://developers.cloudflare.com/api/resources/zones/subresources/nel/methods/get)

GET/zones/{zone\_id}/settings/nel

##### [Edit NEL setting](https://developers.cloudflare.com/api/resources/zones/subresources/nel/methods/edit)

PATCH/zones/{zone\_id}/settings/nel

##### ModelsExpand Collapse

<details>

<summary>

Setting object {id, editable, modified\_on, value }

A zone-scoped NEL configuration setting.

</summary>

id: "nel"

Zone setting identifier.

<a href="#">Link to this property</a>

editable: boolean

Whether the setting is editable. This is false when the zone’s plan does not include NEL or the NEL product feature is not enabled.

<a href="#">Link to this property</a>

modified\_on: string

When the setting was last modified. A zero value (0001-01-01T00:00:00Z) indicates the setting has never been explicitly set and is using the default value.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

value: object {enabled }

The NEL configuration value.

</summary>

enabled: boolean

Whether Network Error Logging is enabled for the zone. When enabled, browsers report network errors to Cloudflare’s NEL endpoint.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zones.nel%20%3E%20(model)%20setting%20%3E%20(schema)>)