---
title: Variants
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Cache](https://developers.cloudflare.com/api/resources/cache)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Variants

##### [Get variants setting](https://developers.cloudflare.com/api/resources/cache/subresources/variants/methods/get)

GET/zones/{zone\_id}/cache/variants

##### [Change variants setting](https://developers.cloudflare.com/api/resources/cache/subresources/variants/methods/edit)

PATCH/zones/{zone\_id}/cache/variants

##### [Delete variants setting](https://developers.cloudflare.com/api/resources/cache/subresources/variants/methods/delete)

DELETE/zones/{zone\_id}/cache/variants

##### ModelsExpand Collapse

<details>

<summary>

CacheVariant object {id, modified\_on }

Variant support enables caching variants of images with certain file extensions in addition to the original. This only applies when the origin server sends the ‘Vary: Accept’ response header. If the origin server sends ‘Vary: Accept’ but does not serve the variant requested, the response will not be cached. This will be indicated with BYPASS cache status in the response headers.

</summary>

id: "variants"

ID of the zone setting.

<a href="#">Link to this property</a>

modified\_on: optional string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.variants%20%3E%20(model)%20cache_variant%20%3E%20(schema)>)

<details>

<summary>

VariantGetResponse object {id, editable, value, modified\_on }

</summary>

id: "variants"

The identifier of the caching setting.

<a href="#">Link to this property</a>

editable: boolean

Whether the setting is editable.

<a href="#">Link to this property</a>

<details>

<summary>

value: object {avif, bmp, gif, 8 more }

Value of the zone setting.

</summary>

avif: optional array of string

List of strings with the MIME types of all the variants that should be served for avif.

<a href="#">Link to this property</a>

bmp: optional array of string

List of strings with the MIME types of all the variants that should be served for bmp.

<a href="#">Link to this property</a>

gif: optional array of string

List of strings with the MIME types of all the variants that should be served for gif.

<a href="#">Link to this property</a>

jp2: optional array of string

List of strings with the MIME types of all the variants that should be served for jp2.

<a href="#">Link to this property</a>

jpeg: optional array of string

List of strings with the MIME types of all the variants that should be served for jpeg.

<a href="#">Link to this property</a>

jpg: optional array of string

List of strings with the MIME types of all the variants that should be served for jpg.

<a href="#">Link to this property</a>

jpg2: optional array of string

List of strings with the MIME types of all the variants that should be served for jpg2.

<a href="#">Link to this property</a>

png: optional array of string

List of strings with the MIME types of all the variants that should be served for png.

<a href="#">Link to this property</a>

tif: optional array of string

List of strings with the MIME types of all the variants that should be served for tif.

<a href="#">Link to this property</a>

tiff: optional array of string

List of strings with the MIME types of all the variants that should be served for tiff.

<a href="#">Link to this property</a>

webp: optional array of string

List of strings with the MIME types of all the variants that should be served for webp.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.variants%20%3E%20(model)%20variant_get_response%20%3E%20(schema)>)

<details>

<summary>

VariantEditResponse object {id, editable, value, modified\_on }

</summary>

id: "variants"

The identifier of the caching setting.

<a href="#">Link to this property</a>

editable: boolean

Whether the setting is editable.

<a href="#">Link to this property</a>

<details>

<summary>

value: object {avif, bmp, gif, 8 more }

Value of the zone setting.

</summary>

avif: optional array of string

List of strings with the MIME types of all the variants that should be served for avif.

<a href="#">Link to this property</a>

bmp: optional array of string

List of strings with the MIME types of all the variants that should be served for bmp.

<a href="#">Link to this property</a>

gif: optional array of string

List of strings with the MIME types of all the variants that should be served for gif.

<a href="#">Link to this property</a>

jp2: optional array of string

List of strings with the MIME types of all the variants that should be served for jp2.

<a href="#">Link to this property</a>

jpeg: optional array of string

List of strings with the MIME types of all the variants that should be served for jpeg.

<a href="#">Link to this property</a>

jpg: optional array of string

List of strings with the MIME types of all the variants that should be served for jpg.

<a href="#">Link to this property</a>

jpg2: optional array of string

List of strings with the MIME types of all the variants that should be served for jpg2.

<a href="#">Link to this property</a>

png: optional array of string

List of strings with the MIME types of all the variants that should be served for png.

<a href="#">Link to this property</a>

tif: optional array of string

List of strings with the MIME types of all the variants that should be served for tif.

<a href="#">Link to this property</a>

tiff: optional array of string

List of strings with the MIME types of all the variants that should be served for tiff.

<a href="#">Link to this property</a>

webp: optional array of string

List of strings with the MIME types of all the variants that should be served for webp.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: optional string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.variants%20%3E%20(model)%20variant_edit_response%20%3E%20(schema)>)

<details>

<summary>

VariantDeleteResponse object {id, editable, modified\_on }

</summary>

id: "variants"

The identifier of the caching setting.

<a href="#">Link to this property</a>

editable: boolean

Whether the setting is editable.

<a href="#">Link to this property</a>

modified\_on: optional string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20cache.variants%20%3E%20(model)%20variant_delete_response%20%3E%20(schema)>)