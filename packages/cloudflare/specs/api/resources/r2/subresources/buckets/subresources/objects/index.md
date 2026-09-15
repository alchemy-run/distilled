---
title: Objects
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[R2](https://developers.cloudflare.com/api/resources/r2)

[Buckets](https://developers.cloudflare.com/api/resources/r2/subresources/buckets)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Objects

##### [List Objects](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/objects/methods/list)

GET/accounts/{account\_id}/r2/buckets/{bucket\_name}/objects

##### [Get Object](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/objects/methods/get)

GET/accounts/{account\_id}/r2/buckets/{bucket\_name}/objects/{object\_key}

##### [Upload Object](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/objects/methods/upload)

PUT/accounts/{account\_id}/r2/buckets/{bucket\_name}/objects/{object\_key}

##### [Delete Object](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/objects/methods/delete)

DELETE/accounts/{account\_id}/r2/buckets/{bucket\_name}/objects/{object\_key}

##### ModelsExpand Collapse

<details>

<summary>

ObjectListResponse object {custom\_metadata, etag, http\_metadata, 5 more }

Metadata for an R2 object.

</summary>

custom\_metadata: optional map\[string]

Custom metadata key-value pairs associated with the object.

<a href="#">Link to this property</a>

etag: optional string

The entity tag for the object. In JSON list/get responses this is the raw hex digest (without surrounding quotes). The HTTP <code>ETag</code> response header on Get Object follows RFC 7232 and IS wrapped in surrounding double-quotes.

<a href="#">Link to this property</a>

<details>

<summary>

http\_metadata: optional object {cacheControl, cacheExpiry, contentDisposition, 3 more }

HTTP metadata associated with an R2 object.

</summary>

cacheControl: optional string

Specifies caching behavior for the object.

<a href="#">Link to this property</a>

cacheExpiry: optional string

The date and time at which the object’s cache entry expires.

formatdate-time

<a href="#">Link to this property</a>

contentDisposition: optional string

Specifies presentational information for the object.

<a href="#">Link to this property</a>

contentEncoding: optional string

Specifies the content encoding applied to the object.

<a href="#">Link to this property</a>

contentLanguage: optional string

The language of the object content.

<a href="#">Link to this property</a>

contentType: optional string

The MIME type of the object.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

key: optional string

The object key (name).

<a href="#">Link to this property</a>

last\_modified: optional string

The date and time the object was last modified.

formatdate-time

<a href="#">Link to this property</a>

size: optional number

The size of the object in bytes.

<a href="#">Link to this property</a>

ssec: optional boolean

Whether the object is encrypted with a customer-supplied encryption key.

<a href="#">Link to this property</a>

<details>

<summary>

storage\_class: optional "Standard"or "InfrequentAccess"

Storage class for newly uploaded objects, unless specified otherwise.

</summary>

One of the following:

"Standard"

<a href="#">Link to this property</a>

"InfrequentAccess"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.objects%20%3E%20(model)%20object_list_response%20%3E%20(schema)>)

<details>

<summary>

ObjectUploadResponse object {etag, key, size, 3 more }

Result of a successful object upload.

</summary>

etag: optional string

The entity tag for the uploaded object.

<a href="#">Link to this property</a>

key: optional string

The key (name) of the uploaded object.

<a href="#">Link to this property</a>

size: optional string

The size of the uploaded object in bytes (as a string).

<a href="#">Link to this property</a>

<details>

<summary>

storage\_class: optional "Standard"or "InfrequentAccess"

Storage class for newly uploaded objects, unless specified otherwise.

</summary>

One of the following:

"Standard"

<a href="#">Link to this property</a>

"InfrequentAccess"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

uploaded: optional string

The date and time the object was uploaded.

formatdate-time

<a href="#">Link to this property</a>

version: optional string

The version UUID of the uploaded object.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.objects%20%3E%20(model)%20object_upload_response%20%3E%20(schema)>)

<details>

<summary>

ObjectDeleteResponse object {key }

Result of a successful object deletion.

</summary>

key: optional string

The key (name) of the deleted object.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.objects%20%3E%20(model)%20object_delete_response%20%3E%20(schema)>)