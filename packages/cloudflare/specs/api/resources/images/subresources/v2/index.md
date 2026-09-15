---
title: V2
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Images](https://developers.cloudflare.com/api/resources/images)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# V2

##### [List images V2](https://developers.cloudflare.com/api/resources/images/subresources/v2/methods/list)

GET/accounts/{account\_id}/images/v2

##### ModelsExpand Collapse

<details>

<summary>

V2ListResponse object {continuation\_token, images }

</summary>

continuation\_token: optional string

Continuation token to fetch next page. Passed as a query param when requesting List V2 api endpoint.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

images: optional array of <a href="https://developers.cloudflare.com/api/resources/images#(resource)%20images.v1%20%3E%20(model)%20image%20%3E%20(schema)">Image</a> { id, creator, filename, 4 more }

</summary>

id: optional string

Image unique identifier.

maxLength32

<a href="#">Link to this property</a>

creator: optional string

Can set the creator field with an internal user ID.

maxLength1024

<a href="#">Link to this property</a>

filename: optional string

Image file name.

maxLength255

<a href="#">Link to this property</a>

meta: optional unknown

User modifiable key-value store. Can be used for keeping references to another system of record for managing images. Metadata must not exceed 1024 bytes.

<a href="#">Link to this property</a>

requireSignedURLs: optional boolean

Indicates whether the image can be a accessed only using it’s UID. If set to true, a signed token needs to be generated with a signing key to view the image.

<a href="#">Link to this property</a>

uploaded: optional string

When the media item was uploaded.

formatdate-time

<a href="#">Link to this property</a>

variants: optional array of string

Object specifying available variants for an image.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20images.v2%20%3E%20(model)%20v2_list_response%20%3E%20(schema)>)

#### V2Direct Uploads

##### [Create authenticated direct upload URL V2](https://developers.cloudflare.com/api/resources/images/subresources/v2/subresources/direct_uploads/methods/create)

POST/accounts/{account\_id}/images/v2/direct\_upload

##### ModelsExpand Collapse

<details>

<summary>

DirectUploadCreateResponse object {id, uploadURL }

</summary>

id: optional string

Image unique identifier.

maxLength32

<a href="#">Link to this property</a>

uploadURL: optional string

The URL the unauthenticated upload can be performed to using a single HTTP POST (multipart/form-data) request.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20images.v2.direct_uploads%20%3E%20(model)%20direct_upload_create_response%20%3E%20(schema)>)