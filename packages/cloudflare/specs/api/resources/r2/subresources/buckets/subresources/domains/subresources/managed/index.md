---
title: Managed
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[R2](https://developers.cloudflare.com/api/resources/r2)

[Buckets](https://developers.cloudflare.com/api/resources/r2/subresources/buckets)

[Domains](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/domains)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Managed

##### [Get r2.dev Domain of Bucket](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/domains/subresources/managed/methods/list)

GET/accounts/{account\_id}/r2/buckets/{bucket\_name}/domains/managed

##### [Update r2.dev Domain of Bucket](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/domains/subresources/managed/methods/update)

PUT/accounts/{account\_id}/r2/buckets/{bucket\_name}/domains/managed

##### ModelsExpand Collapse

<details>

<summary>

ManagedListResponse object {bucketId, domain, enabled }

</summary>

bucketId: string

Bucket ID.

maxLength32

<a href="#">Link to this property</a>

domain: string

Domain name of the bucket’s r2.dev domain.

<a href="#">Link to this property</a>

enabled: boolean

Whether this bucket is publicly accessible at the r2.dev domain.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.domains.managed%20%3E%20(model)%20managed_list_response%20%3E%20(schema)>)

<details>

<summary>

ManagedUpdateResponse object {bucketId, domain, enabled }

</summary>

bucketId: string

Bucket ID.

maxLength32

<a href="#">Link to this property</a>

domain: string

Domain name of the bucket’s r2.dev domain.

<a href="#">Link to this property</a>

enabled: boolean

Whether this bucket is publicly accessible at the r2.dev domain.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.domains.managed%20%3E%20(model)%20managed_update_response%20%3E%20(schema)>)