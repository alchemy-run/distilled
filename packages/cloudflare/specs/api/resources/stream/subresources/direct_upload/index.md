---
title: Direct Upload
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Stream](https://developers.cloudflare.com/api/resources/stream)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Direct Upload

##### [Upload videos via direct upload URLs](https://developers.cloudflare.com/api/resources/stream/subresources/direct_upload/methods/create)

POST/accounts/{account\_id}/stream/direct\_upload

##### ModelsExpand Collapse

<details>

<summary>

DirectUploadCreateResponse object {scheduledDeletion, uid, uploadURL, watermark }

</summary>

scheduledDeletion: optional string

Indicates the date and time at which the video will be deleted. Omit the field to indicate no change, or include with a <code>null</code> value to remove an existing scheduled deletion. If specified, must be at least 30 days from upload time.

formatdate-time

<a href="#">Link to this property</a>

uid: optional string

A Cloudflare-generated unique identifier for a media item.

maxLength32

<a href="#">Link to this property</a>

uploadURL: optional string

The URL an unauthenticated upload can use for a single <code>HTTP POST multipart/form-data</code> request.

<a href="#">Link to this property</a>

watermark: optional <a href="https://developers.cloudflare.com/api/resources/stream#(resource)%20stream.watermarks%20%3E%20(model)%20watermark%20%3E%20(schema)">Watermark</a> { created, downloadedFrom, height, 8 more }

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20stream.direct_upload%20%3E%20(model)%20direct_upload_create_response%20%3E%20(schema)>)