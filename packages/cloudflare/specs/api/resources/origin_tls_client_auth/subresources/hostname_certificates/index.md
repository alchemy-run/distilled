---
title: Hostname Certificates
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Origin TLS Client Auth](https://developers.cloudflare.com/api/resources/origin_tls_client_auth)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Hostname Certificates

##### [List Certificates](https://developers.cloudflare.com/api/resources/origin_tls_client_auth/subresources/hostname_certificates/methods/list)

GET/zones/{zone\_id}/origin\_tls\_client\_auth/hostnames/certificates

##### [Get the Hostname Client Certificate](https://developers.cloudflare.com/api/resources/origin_tls_client_auth/subresources/hostname_certificates/methods/get)

GET/zones/{zone\_id}/origin\_tls\_client\_auth/hostnames/certificates/{certificate\_id}

##### [Upload a Hostname Client Certificate](https://developers.cloudflare.com/api/resources/origin_tls_client_auth/subresources/hostname_certificates/methods/create)

POST/zones/{zone\_id}/origin\_tls\_client\_auth/hostnames/certificates

##### [Delete Hostname Client Certificate](https://developers.cloudflare.com/api/resources/origin_tls_client_auth/subresources/hostname_certificates/methods/delete)

DELETE/zones/{zone\_id}/origin\_tls\_client\_auth/hostnames/certificates/{certificate\_id}

##### ModelsExpand Collapse

<details>

<summary>

Certificate object {id, certificate, expires\_on, 5 more }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

certificate: optional string

The hostname certificate.

<a href="#">Link to this property</a>

expires\_on: optional string

The date when the certificate expires.

formatdate-time

<a href="#">Link to this property</a>

issuer: optional string

The certificate authority that issued the certificate.

<a href="#">Link to this property</a>

serial\_number: optional string

The serial number on the uploaded certificate.

<a href="#">Link to this property</a>

signature: optional string

The type of hash used for the certificate.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "initializing"or "pending\_deployment"or "pending\_deletion"or 4 more

Status of the certificate or the association.

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending\_deployment"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

"deployment\_timed\_out"

<a href="#">Link to this property</a>

"deletion\_timed\_out"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

uploaded\_on: optional string

The time when the certificate was uploaded.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20origin_tls_client_auth.hostname_certificates%20%3E%20(model)%20certificate%20%3E%20(schema)>)

<details>

<summary>

HostnameCertificateListResponse object {id, certificate, expires\_on, 5 more }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

certificate: optional string

The hostname certificate.

<a href="#">Link to this property</a>

expires\_on: optional string

The date when the certificate expires.

formatdate-time

<a href="#">Link to this property</a>

issuer: optional string

The certificate authority that issued the certificate.

<a href="#">Link to this property</a>

serial\_number: optional string

The serial number on the uploaded certificate.

<a href="#">Link to this property</a>

signature: optional string

The type of hash used for the certificate.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "initializing"or "pending\_deployment"or "pending\_deletion"or 4 more

Status of the certificate or the association.

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending\_deployment"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

"deployment\_timed\_out"

<a href="#">Link to this property</a>

"deletion\_timed\_out"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

uploaded\_on: optional string

The time when the certificate was uploaded.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20origin_tls_client_auth.hostname_certificates%20%3E%20(model)%20hostname_certificate_list_response%20%3E%20(schema)>)

<details>

<summary>

HostnameCertificateGetResponse object {id, certificate, expires\_on, 5 more }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

certificate: optional string

The hostname certificate.

<a href="#">Link to this property</a>

expires\_on: optional string

The date when the certificate expires.

formatdate-time

<a href="#">Link to this property</a>

issuer: optional string

The certificate authority that issued the certificate.

<a href="#">Link to this property</a>

serial\_number: optional string

The serial number on the uploaded certificate.

<a href="#">Link to this property</a>

signature: optional string

The type of hash used for the certificate.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "initializing"or "pending\_deployment"or "pending\_deletion"or 4 more

Status of the certificate or the association.

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending\_deployment"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

"deployment\_timed\_out"

<a href="#">Link to this property</a>

"deletion\_timed\_out"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

uploaded\_on: optional string

The time when the certificate was uploaded.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20origin_tls_client_auth.hostname_certificates%20%3E%20(model)%20hostname_certificate_get_response%20%3E%20(schema)>)

<details>

<summary>

HostnameCertificateCreateResponse object {id, certificate, expires\_on, 5 more }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

certificate: optional string

The hostname certificate.

<a href="#">Link to this property</a>

expires\_on: optional string

The date when the certificate expires.

formatdate-time

<a href="#">Link to this property</a>

issuer: optional string

The certificate authority that issued the certificate.

<a href="#">Link to this property</a>

serial\_number: optional string

The serial number on the uploaded certificate.

<a href="#">Link to this property</a>

signature: optional string

The type of hash used for the certificate.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "initializing"or "pending\_deployment"or "pending\_deletion"or 4 more

Status of the certificate or the association.

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending\_deployment"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

"deployment\_timed\_out"

<a href="#">Link to this property</a>

"deletion\_timed\_out"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

uploaded\_on: optional string

The time when the certificate was uploaded.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20origin_tls_client_auth.hostname_certificates%20%3E%20(model)%20hostname_certificate_create_response%20%3E%20(schema)>)

<details>

<summary>

HostnameCertificateDeleteResponse object {id, certificate, expires\_on, 5 more }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

certificate: optional string

The hostname certificate.

<a href="#">Link to this property</a>

expires\_on: optional string

The date when the certificate expires.

formatdate-time

<a href="#">Link to this property</a>

issuer: optional string

The certificate authority that issued the certificate.

<a href="#">Link to this property</a>

serial\_number: optional string

The serial number on the uploaded certificate.

<a href="#">Link to this property</a>

signature: optional string

The type of hash used for the certificate.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "initializing"or "pending\_deployment"or "pending\_deletion"or 4 more

Status of the certificate or the association.

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending\_deployment"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

"deployment\_timed\_out"

<a href="#">Link to this property</a>

"deletion\_timed\_out"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

uploaded\_on: optional string

The time when the certificate was uploaded.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20origin_tls_client_auth.hostname_certificates%20%3E%20(model)%20hostname_certificate_delete_response%20%3E%20(schema)>)