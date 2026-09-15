---
title: Images
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Images

#### ImagesV1

##### [List images](https://developers.cloudflare.com/api/resources/images/subresources/v1/methods/list)

Deprecated

GET/accounts/{account\_id}/images/v1

##### [Image details](https://developers.cloudflare.com/api/resources/images/subresources/v1/methods/get)

GET/accounts/{account\_id}/images/v1/{image\_id}

##### [Upload an image](https://developers.cloudflare.com/api/resources/images/subresources/v1/methods/create)

POST/accounts/{account\_id}/images/v1

##### [Update image](https://developers.cloudflare.com/api/resources/images/subresources/v1/methods/edit)

PATCH/accounts/{account\_id}/images/v1/{image\_id}

##### [Delete image](https://developers.cloudflare.com/api/resources/images/subresources/v1/methods/delete)

DELETE/accounts/{account\_id}/images/v1/{image\_id}

##### ModelsExpand Collapse

<details>

<summary>

Image object {id, creator, filename, 4 more }

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

[Link to this property](#)%20images.v1%20%3E%20(model)%20image%20%3E%20(schema)>)

<details>

<summary>

V1ListResponse object {images }

</summary>

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

[Link to this property](#)%20images.v1%20%3E%20(model)%20v1_list_response%20%3E%20(schema)>)

<details>

<summary>

V1DeleteResponse = unknownor string

</summary>

One of the following:

unknown

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20images.v1%20%3E%20(model)%20v1_delete_response%20%3E%20(schema)>)

#### ImagesV1Keys

##### [List Signing Keys](https://developers.cloudflare.com/api/resources/images/subresources/v1/subresources/keys/methods/list)

GET/accounts/{account\_id}/images/v1/keys

##### [Create a new Signing Key](https://developers.cloudflare.com/api/resources/images/subresources/v1/subresources/keys/methods/update)

PUT/accounts/{account\_id}/images/v1/keys/{signing\_key\_name}

##### [Delete Signing Key](https://developers.cloudflare.com/api/resources/images/subresources/v1/subresources/keys/methods/delete)

DELETE/accounts/{account\_id}/images/v1/keys/{signing\_key\_name}

##### ModelsExpand Collapse

<details>

<summary>

Key object {name, value }

</summary>

name: optional string

Key name.

<a href="#">Link to this property</a>

value: optional string

Key value.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20images.v1.keys%20%3E%20(model)%20key%20%3E%20(schema)>)

<details>

<summary>

KeyListResponse object {keys }

</summary>

<details>

<summary>

keys: optional array of <a href="https://developers.cloudflare.com/api/resources/images#(resource)%20images.v1.keys%20%3E%20(model)%20key%20%3E%20(schema)">Key</a> { name, value }

</summary>

name: optional string

Key name.

<a href="#">Link to this property</a>

value: optional string

Key value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20images.v1.keys%20%3E%20(model)%20key_list_response%20%3E%20(schema)>)

<details>

<summary>

KeyUpdateResponse object {keys }

</summary>

<details>

<summary>

keys: optional array of <a href="https://developers.cloudflare.com/api/resources/images#(resource)%20images.v1.keys%20%3E%20(model)%20key%20%3E%20(schema)">Key</a> { name, value }

</summary>

name: optional string

Key name.

<a href="#">Link to this property</a>

value: optional string

Key value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20images.v1.keys%20%3E%20(model)%20key_update_response%20%3E%20(schema)>)

<details>

<summary>

KeyDeleteResponse object {keys }

</summary>

<details>

<summary>

keys: optional array of <a href="https://developers.cloudflare.com/api/resources/images#(resource)%20images.v1.keys%20%3E%20(model)%20key%20%3E%20(schema)">Key</a> { name, value }

</summary>

name: optional string

Key name.

<a href="#">Link to this property</a>

value: optional string

Key value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20images.v1.keys%20%3E%20(model)%20key_delete_response%20%3E%20(schema)>)

#### ImagesV1Stats

##### [Images usage statistics](https://developers.cloudflare.com/api/resources/images/subresources/v1/subresources/stats/methods/get)

GET/accounts/{account\_id}/images/v1/stats

##### ModelsExpand Collapse

<details>

<summary>

Stat object {count }

</summary>

<details>

<summary>

count: optional object {allowed, current }

</summary>

allowed: optional number

Cloudflare Images allowed usage.

<a href="#">Link to this property</a>

current: optional number

Cloudflare Images current usage.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20images.v1.stats%20%3E%20(model)%20stat%20%3E%20(schema)>)

#### ImagesV1Variants

##### [List variants](https://developers.cloudflare.com/api/resources/images/subresources/v1/subresources/variants/methods/list)

GET/accounts/{account\_id}/images/v1/variants

##### [Variant details](https://developers.cloudflare.com/api/resources/images/subresources/v1/subresources/variants/methods/get)

GET/accounts/{account\_id}/images/v1/variants/{variant\_id}

##### [Create a variant](https://developers.cloudflare.com/api/resources/images/subresources/v1/subresources/variants/methods/create)

POST/accounts/{account\_id}/images/v1/variants

##### [Update a variant](https://developers.cloudflare.com/api/resources/images/subresources/v1/subresources/variants/methods/edit)

PATCH/accounts/{account\_id}/images/v1/variants/{variant\_id}

##### [Delete a variant](https://developers.cloudflare.com/api/resources/images/subresources/v1/subresources/variants/methods/delete)

DELETE/accounts/{account\_id}/images/v1/variants/{variant\_id}

##### ModelsExpand Collapse

<details>

<summary>

Variant object {variants }

</summary>

<details>

<summary>

variants: optional object {hero }

</summary>

<details>

<summary>

hero: optional object {id, options, neverRequireSignedURLs }

</summary>

id: string

maxLength99

<a href="#">Link to this property</a>

<details>

<summary>

options: object {fit, height, metadata, width }

Allows you to define image resizing sizes for different use cases.

</summary>

<details>

<summary>

fit: "scale-down"or "contain"or "cover"or 2 more

The fit property describes how the width and height dimensions should be interpreted.

</summary>

One of the following:

"scale-down"

<a href="#">Link to this property</a>

"contain"

<a href="#">Link to this property</a>

"cover"

<a href="#">Link to this property</a>

"crop"

<a href="#">Link to this property</a>

"pad"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

height: number

Maximum height in image pixels.

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

metadata: "keep"or "copyright"or "none"

What EXIF data should be preserved in the output image.

</summary>

One of the following:

"keep"

<a href="#">Link to this property</a>

"copyright"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

width: number

Maximum width in image pixels.

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

neverRequireSignedURLs: optional boolean

Indicates whether the variant can access an image without a signature, regardless of image access control.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20images.v1.variants%20%3E%20(model)%20variant%20%3E%20(schema)>)

<details>

<summary>

VariantGetResponse object {variant }

</summary>

<details>

<summary>

variant: optional object {id, options, neverRequireSignedURLs }

</summary>

id: string

maxLength99

<a href="#">Link to this property</a>

<details>

<summary>

options: object {fit, height, metadata, width }

Allows you to define image resizing sizes for different use cases.

</summary>

<details>

<summary>

fit: "scale-down"or "contain"or "cover"or 2 more

The fit property describes how the width and height dimensions should be interpreted.

</summary>

One of the following:

"scale-down"

<a href="#">Link to this property</a>

"contain"

<a href="#">Link to this property</a>

"cover"

<a href="#">Link to this property</a>

"crop"

<a href="#">Link to this property</a>

"pad"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

height: number

Maximum height in image pixels.

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

metadata: "keep"or "copyright"or "none"

What EXIF data should be preserved in the output image.

</summary>

One of the following:

"keep"

<a href="#">Link to this property</a>

"copyright"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

width: number

Maximum width in image pixels.

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

neverRequireSignedURLs: optional boolean

Indicates whether the variant can access an image without a signature, regardless of image access control.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20images.v1.variants%20%3E%20(model)%20variant_get_response%20%3E%20(schema)>)

<details>

<summary>

VariantCreateResponse object {variant }

</summary>

<details>

<summary>

variant: optional object {id, options, neverRequireSignedURLs }

</summary>

id: string

maxLength99

<a href="#">Link to this property</a>

<details>

<summary>

options: object {fit, height, metadata, width }

Allows you to define image resizing sizes for different use cases.

</summary>

<details>

<summary>

fit: "scale-down"or "contain"or "cover"or 2 more

The fit property describes how the width and height dimensions should be interpreted.

</summary>

One of the following:

"scale-down"

<a href="#">Link to this property</a>

"contain"

<a href="#">Link to this property</a>

"cover"

<a href="#">Link to this property</a>

"crop"

<a href="#">Link to this property</a>

"pad"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

height: number

Maximum height in image pixels.

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

metadata: "keep"or "copyright"or "none"

What EXIF data should be preserved in the output image.

</summary>

One of the following:

"keep"

<a href="#">Link to this property</a>

"copyright"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

width: number

Maximum width in image pixels.

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

neverRequireSignedURLs: optional boolean

Indicates whether the variant can access an image without a signature, regardless of image access control.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20images.v1.variants%20%3E%20(model)%20variant_create_response%20%3E%20(schema)>)

<details>

<summary>

VariantEditResponse object {variant }

</summary>

<details>

<summary>

variant: optional object {id, options, neverRequireSignedURLs }

</summary>

id: string

maxLength99

<a href="#">Link to this property</a>

<details>

<summary>

options: object {fit, height, metadata, width }

Allows you to define image resizing sizes for different use cases.

</summary>

<details>

<summary>

fit: "scale-down"or "contain"or "cover"or 2 more

The fit property describes how the width and height dimensions should be interpreted.

</summary>

One of the following:

"scale-down"

<a href="#">Link to this property</a>

"contain"

<a href="#">Link to this property</a>

"cover"

<a href="#">Link to this property</a>

"crop"

<a href="#">Link to this property</a>

"pad"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

height: number

Maximum height in image pixels.

minimum1

<a href="#">Link to this property</a>

<details>

<summary>

metadata: "keep"or "copyright"or "none"

What EXIF data should be preserved in the output image.

</summary>

One of the following:

"keep"

<a href="#">Link to this property</a>

"copyright"

<a href="#">Link to this property</a>

"none"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

width: number

Maximum width in image pixels.

minimum1

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

neverRequireSignedURLs: optional boolean

Indicates whether the variant can access an image without a signature, regardless of image access control.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20images.v1.variants%20%3E%20(model)%20variant_edit_response%20%3E%20(schema)>)

<details>

<summary>

VariantDeleteResponse = unknownor string

</summary>

One of the following:

unknown

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20images.v1.variants%20%3E%20(model)%20variant_delete_response%20%3E%20(schema)>)

#### ImagesV1Blobs

##### [Download image](https://developers.cloudflare.com/api/resources/images/subresources/v1/subresources/blobs/methods/get)

GET/accounts/{account\_id}/images/v1/{image\_id}/blob

#### ImagesV2

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

#### ImagesV2Direct Uploads

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