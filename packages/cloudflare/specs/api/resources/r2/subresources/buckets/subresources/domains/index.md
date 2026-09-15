---
title: Domains
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[R2](https://developers.cloudflare.com/api/resources/r2)

[Buckets](https://developers.cloudflare.com/api/resources/r2/subresources/buckets)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Domains

#### DomainsCustom

##### [List Custom Domains of Bucket](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/domains/subresources/custom/methods/list)

GET/accounts/{account\_id}/r2/buckets/{bucket\_name}/domains/custom

##### [Get Custom Domain Settings](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/domains/subresources/custom/methods/get)

GET/accounts/{account\_id}/r2/buckets/{bucket\_name}/domains/custom/{domain}

##### [Attach Custom Domain To Bucket](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/domains/subresources/custom/methods/create)

POST/accounts/{account\_id}/r2/buckets/{bucket\_name}/domains/custom

##### [Configure Custom Domain Settings](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/domains/subresources/custom/methods/update)

PUT/accounts/{account\_id}/r2/buckets/{bucket\_name}/domains/custom/{domain}

##### [Remove Custom Domain From Bucket](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/subresources/domains/subresources/custom/methods/delete)

DELETE/accounts/{account\_id}/r2/buckets/{bucket\_name}/domains/custom/{domain}

##### ModelsExpand Collapse

<details>

<summary>

CustomListResponse object {domains }

</summary>

<details>

<summary>

domains: array of object {domain, enabled, status, 4 more }

</summary>

domain: string

Domain name of the custom domain to be added.

<a href="#">Link to this property</a>

enabled: boolean

Whether this bucket is publicly accessible at the specified custom domain.

<a href="#">Link to this property</a>

<details>

<summary>

status: object {ownership, ssl }

</summary>

<details>

<summary>

ownership: "pending"or "active"or "deactivated"or 3 more

Ownership status of the domain.

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

"unknown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ssl: "initializing"or "pending"or "active"or 3 more

SSL certificate status.

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

"unknown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ciphers: optional array of string

An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

<a href="#">Link to this property</a>

<details>

<summary>

minTLS: optional "1.0"or "1.1"or "1.2"or "1.3"

Minimum TLS Version the custom domain will accept for incoming connections. If not set, defaults to 1.0.

</summary>

One of the following:

"1.0"

<a href="#">Link to this property</a>

"1.1"

<a href="#">Link to this property</a>

"1.2"

<a href="#">Link to this property</a>

"1.3"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

zoneId: optional string

Zone ID of the custom domain resides in.

<a href="#">Link to this property</a>

zoneName: optional string

Zone that the custom domain resides in.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(model)%20custom_list_response%20%3E%20(schema)>)

<details>

<summary>

CustomGetResponse object {domain, enabled, status, 4 more }

</summary>

domain: string

Domain name of the custom domain to be added.

<a href="#">Link to this property</a>

enabled: boolean

Whether this bucket is publicly accessible at the specified custom domain.

<a href="#">Link to this property</a>

<details>

<summary>

status: object {ownership, ssl }

</summary>

<details>

<summary>

ownership: "pending"or "active"or "deactivated"or 3 more

Ownership status of the domain.

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

"unknown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ssl: "initializing"or "pending"or "active"or 3 more

SSL certificate status.

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

"unknown"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ciphers: optional array of string

An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

<a href="#">Link to this property</a>

<details>

<summary>

minTLS: optional "1.0"or "1.1"or "1.2"or "1.3"

Minimum TLS Version the custom domain will accept for incoming connections. If not set, defaults to 1.0.

</summary>

One of the following:

"1.0"

<a href="#">Link to this property</a>

"1.1"

<a href="#">Link to this property</a>

"1.2"

<a href="#">Link to this property</a>

"1.3"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

zoneId: optional string

Zone ID of the custom domain resides in.

<a href="#">Link to this property</a>

zoneName: optional string

Zone that the custom domain resides in.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(model)%20custom_get_response%20%3E%20(schema)>)

<details>

<summary>

CustomCreateResponse object {domain, enabled, zoneId, 2 more }

</summary>

domain: string

Domain name of the affected custom domain.

<a href="#">Link to this property</a>

enabled: boolean

Whether this bucket is publicly accessible at the specified custom domain.

<a href="#">Link to this property</a>

zoneId: string

Zone ID of the custom domain.

<a href="#">Link to this property</a>

ciphers: optional array of string

An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

<a href="#">Link to this property</a>

<details>

<summary>

minTLS: optional "1.0"or "1.1"or "1.2"or "1.3"

Minimum TLS Version the custom domain will accept for incoming connections. If not set, defaults to 1.0.

</summary>

One of the following:

"1.0"

<a href="#">Link to this property</a>

"1.1"

<a href="#">Link to this property</a>

"1.2"

<a href="#">Link to this property</a>

"1.3"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(model)%20custom_create_response%20%3E%20(schema)>)

<details>

<summary>

CustomUpdateResponse object {domain, ciphers, enabled, minTLS }

</summary>

domain: string

Domain name of the affected custom domain.

<a href="#">Link to this property</a>

ciphers: optional array of string

An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

<a href="#">Link to this property</a>

enabled: optional boolean

Whether this bucket is publicly accessible at the specified custom domain.

<a href="#">Link to this property</a>

<details>

<summary>

minTLS: optional "1.0"or "1.1"or "1.2"or "1.3"

Minimum TLS Version the custom domain will accept for incoming connections. If not set, defaults to 1.0.

</summary>

One of the following:

"1.0"

<a href="#">Link to this property</a>

"1.1"

<a href="#">Link to this property</a>

"1.2"

<a href="#">Link to this property</a>

"1.3"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(model)%20custom_update_response%20%3E%20(schema)>)

<details>

<summary>

CustomDeleteResponse object {domain }

</summary>

domain: string

Name of the removed custom domain.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20r2.buckets.domains.custom%20%3E%20(model)%20custom_delete_response%20%3E%20(schema)>)

#### DomainsManaged

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