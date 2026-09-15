---
title: Assets
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Pages](https://developers.cloudflare.com/api/resources/pages)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Assets

##### [Upsert asset hashes](https://developers.cloudflare.com/api/resources/pages/subresources/assets/methods/upsert_hashes)

POST/pages/assets/upsert-hashes

##### [Check missing assets](https://developers.cloudflare.com/api/resources/pages/subresources/assets/methods/check_missing)

POST/pages/assets/check-missing

##### [Upload asset](https://developers.cloudflare.com/api/resources/pages/subresources/assets/methods/upload)

POST/pages/assets/upload

##### ModelsExpand Collapse

<details>

<summary>

AssetUpsertHashesResponse object {errors, messages, success }

</summary>

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: true

Whether the API call was successful.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pages.assets%20%3E%20(model)%20asset_upsert_hashes_response%20%3E%20(schema)>)

AssetCheckMissingResponse = string

[Link to this property](#)%20pages.assets%20%3E%20(model)%20asset_check_missing_response%20%3E%20(schema)>)

<details>

<summary>

AssetUploadResponse object {errors, messages, success }

</summary>

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: true

Whether the API call was successful.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pages.assets%20%3E%20(model)%20asset_upload_response%20%3E%20(schema)>)