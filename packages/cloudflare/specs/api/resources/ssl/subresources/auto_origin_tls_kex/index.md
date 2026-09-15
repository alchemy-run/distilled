---
title: Auto Origin TLS Kex
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[SSL](https://developers.cloudflare.com/api/resources/ssl)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Auto Origin TLS Kex

##### [Get Auto-Origin TLS KEX enrollment status for the given zone](https://developers.cloudflare.com/api/resources/ssl/subresources/auto_origin_tls_kex/methods/get)

GET/zones/{zone\_id}/settings/auto\_origin\_tls\_kex

##### [Patch Auto-Origin TLS KEX enrollment status for the given zone](https://developers.cloudflare.com/api/resources/ssl/subresources/auto_origin_tls_kex/methods/edit)

PATCH/zones/{zone\_id}/settings/auto\_origin\_tls\_kex

##### ModelsExpand Collapse

<details>

<summary>

AutoOriginTLSKexGetResponse object {id, enabled, modified\_on }

</summary>

id: string

<a href="#">Link to this property</a>

enabled: boolean

Whether Auto-Origin TLS KEX selection is enabled for the zone.

<a href="#">Link to this property</a>

modified\_on: string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ssl.auto_origin_tls_kex%20%3E%20(model)%20auto_origin_tls_kex_get_response%20%3E%20(schema)>)

<details>

<summary>

AutoOriginTLSKexEditResponse object {id, enabled, modified\_on }

</summary>

id: string

<a href="#">Link to this property</a>

enabled: boolean

Whether Auto-Origin TLS KEX selection is enabled for the zone.

<a href="#">Link to this property</a>

modified\_on: string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ssl.auto_origin_tls_kex%20%3E%20(model)%20auto_origin_tls_kex_edit_response%20%3E%20(schema)>)