---
title: Asset Upload
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers For Platforms](https://developers.cloudflare.com/api/resources/workers_for_platforms)

[Dispatch](https://developers.cloudflare.com/api/resources/workers_for_platforms/subresources/dispatch)

[Namespaces](https://developers.cloudflare.com/api/resources/workers_for_platforms/subresources/dispatch/subresources/namespaces)

[Scripts](https://developers.cloudflare.com/api/resources/workers_for_platforms/subresources/dispatch/subresources/namespaces/subresources/scripts)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Asset Upload

##### [Create Assets Upload Session](https://developers.cloudflare.com/api/resources/workers_for_platforms/subresources/dispatch/subresources/namespaces/subresources/scripts/subresources/asset_upload/methods/create)

POST/accounts/{account\_id}/workers/dispatch/namespaces/{dispatch\_namespace}/scripts/{script\_name}/assets-upload-session

##### ModelsExpand Collapse

<details>

<summary>

AssetUploadCreateResponse object {buckets, jwt }

</summary>

buckets: optional array of array of string

The requests to make to upload assets.

<a href="#">Link to this property</a>

jwt: optional string

A JWT to use as authentication for uploading assets.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers_for_platforms.dispatch.namespaces.scripts.asset_upload%20%3E%20(model)%20asset_upload_create_response%20%3E%20(schema)>)