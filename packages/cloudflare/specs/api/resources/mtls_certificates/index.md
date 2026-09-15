---
title: MTLS Certificates
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# MTLS Certificates

##### [List mTLS certificates](https://developers.cloudflare.com/api/resources/mtls_certificates/methods/list)

GET/accounts/{account\_id}/mtls\_certificates

##### [Get mTLS certificate](https://developers.cloudflare.com/api/resources/mtls_certificates/methods/get)

GET/accounts/{account\_id}/mtls\_certificates/{mtls\_certificate\_id}

##### [Upload mTLS certificate](https://developers.cloudflare.com/api/resources/mtls_certificates/methods/create)

POST/accounts/{account\_id}/mtls\_certificates

##### [Delete mTLS certificate](https://developers.cloudflare.com/api/resources/mtls_certificates/methods/delete)

DELETE/accounts/{account\_id}/mtls\_certificates/{mtls\_certificate\_id}

##### ModelsExpand Collapse

<details>

<summary>

MTLSCertificate object {id, ca, certificates, 7 more }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

ca: optional boolean

Indicates whether the certificate is a CA or leaf certificate.

<a href="#">Link to this property</a>

certificates: optional string

The uploaded root CA certificate.

<a href="#">Link to this property</a>

expires\_on: optional string

When the certificate expires.

formatdate-time

<a href="#">Link to this property</a>

issuer: optional string

The certificate authority that issued the certificate.

<a href="#">Link to this property</a>

name: optional string

Optional unique name for the certificate. Only used for human readability.

<a href="#">Link to this property</a>

serial\_number: optional string

The certificate serial number.

<a href="#">Link to this property</a>

signature: optional string

The type of hash used for the certificate.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "custom"or "gateway\_managed"or "access\_managed"

The type of the certificate, indicating how it was created and who manages it.

</summary>

One of the following:

"custom"

<a href="#">Link to this property</a>

"gateway\_managed"

<a href="#">Link to this property</a>

"access\_managed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

uploaded\_on: optional string

This is the time the certificate was uploaded.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20mtls_certificates%20%3E%20(model)%20mtls_certificate%20%3E%20(schema)>)

<details>

<summary>

MTLSCertificateCreateResponse object {id, ca, certificates, 8 more }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

ca: optional boolean

Indicates whether the certificate is a CA or leaf certificate.

<a href="#">Link to this property</a>

certificates: optional string

The uploaded root CA certificate.

<a href="#">Link to this property</a>

expires\_on: optional string

When the certificate expires.

formatdate-time

<a href="#">Link to this property</a>

issuer: optional string

The certificate authority that issued the certificate.

<a href="#">Link to this property</a>

name: optional string

Optional unique name for the certificate. Only used for human readability.

<a href="#">Link to this property</a>

serial\_number: optional string

The certificate serial number.

<a href="#">Link to this property</a>

signature: optional string

The type of hash used for the certificate.

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "custom"or "gateway\_managed"or "access\_managed"

The type of the certificate, indicating how it was created and who manages it.

</summary>

One of the following:

"custom"

<a href="#">Link to this property</a>

"gateway\_managed"

<a href="#">Link to this property</a>

"access\_managed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

This is the time the certificate was updated.

formatdate-time

<a href="#">Link to this property</a>

uploaded\_on: optional string

This is the time the certificate was uploaded.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20mtls_certificates%20%3E%20(model)%20mtls_certificate_create_response%20%3E%20(schema)>)

#### MTLS CertificatesAssociations

##### [List mTLS certificate associations](https://developers.cloudflare.com/api/resources/mtls_certificates/subresources/associations/methods/get)

GET/accounts/{account\_id}/mtls\_certificates/{mtls\_certificate\_id}/associations

##### ModelsExpand Collapse

<details>

<summary>

CertificateAsssociation object {service, status }

</summary>

service: optional string

The service using the certificate.

<a href="#">Link to this property</a>

status: optional string

Certificate deployment status for the given service.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20mtls_certificates.associations%20%3E%20(model)%20certificate_asssociation%20%3E%20(schema)>)