---
title: Watermarks
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Stream](https://developers.cloudflare.com/api/resources/stream)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Watermarks

##### [List watermark profiles](https://developers.cloudflare.com/api/resources/stream/subresources/watermarks/methods/list)

GET/accounts/{account\_id}/stream/watermarks

##### [Watermark profile details](https://developers.cloudflare.com/api/resources/stream/subresources/watermarks/methods/get)

GET/accounts/{account\_id}/stream/watermarks/{identifier}

##### [Create watermark profiles via basic upload](https://developers.cloudflare.com/api/resources/stream/subresources/watermarks/methods/create)

POST/accounts/{account\_id}/stream/watermarks

##### [Delete watermark profiles](https://developers.cloudflare.com/api/resources/stream/subresources/watermarks/methods/delete)

DELETE/accounts/{account\_id}/stream/watermarks/{identifier}

##### ModelsExpand Collapse

<details>

<summary>

Watermark object {created, downloadedFrom, height, 8 more }

</summary>

created: optional string

The date and a time a watermark profile was created.

formatdate-time

<a href="#">Link to this property</a>

downloadedFrom: optional string

The source URL for a downloaded image. If the watermark profile was created via direct upload, this field is null.

<a href="#">Link to this property</a>

height: optional number

The height of the image in pixels.

<a href="#">Link to this property</a>

name: optional string

A short description of the watermark profile.

<a href="#">Link to this property</a>

opacity: optional number

The translucency of the image. A value of <code>0.0</code> makes the image completely transparent, and <code>1.0</code> makes the image completely opaque. Note that if the image is already semi-transparent, setting this to <code>1.0</code> will not make the image completely opaque.

maximum1

minimum0

<a href="#">Link to this property</a>

padding: optional number

The whitespace between the adjacent edges (determined by position) of the video and the image. <code>0.0</code> indicates no padding, and <code>1.0</code> indicates a fully padded video width or length, as determined by the algorithm.

maximum1

minimum0

<a href="#">Link to this property</a>

position: optional string

The location of the image. Valid positions are: <code>upperRight</code>, <code>upperLeft</code>, <code>lowerLeft</code>, <code>lowerRight</code>, and <code>center</code>. Note that <code>center</code> ignores the <code>padding</code> parameter.

<a href="#">Link to this property</a>

scale: optional number

The size of the image relative to the overall size of the video. This parameter will adapt to horizontal and vertical videos automatically. <code>0.0</code> indicates no scaling (use the size of the image as-is), and <code>1.0</code> fills the entire video.

maximum1

minimum0

<a href="#">Link to this property</a>

size: optional number

The size of the image in bytes.

<a href="#">Link to this property</a>

uid: optional string

The unique identifier for a watermark profile.

maxLength32

<a href="#">Link to this property</a>

width: optional number

The width of the image in pixels.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.watermarks%20%3E%20(model)%20watermark%20%3E%20(schema)>)

WatermarkDeleteResponse = string

[Link to this property](#)%20stream.watermarks%20%3E%20(model)%20watermark_delete_response%20%3E%20(schema)>)