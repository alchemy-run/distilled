---
title: Zone Certificates
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Origin TLS Client Auth](https://developers.cloudflare.com/api/resources/origin_tls_client_auth)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Zone Certificates

##### [List Certificates](https://developers.cloudflare.com/api/resources/origin_tls_client_auth/subresources/zone_certificates/methods/list)

GET/zones/{zone\_id}/origin\_tls\_client\_auth

##### [Get Certificate Details](https://developers.cloudflare.com/api/resources/origin_tls_client_auth/subresources/zone_certificates/methods/get)

GET/zones/{zone\_id}/origin\_tls\_client\_auth/{certificate\_id}

##### [Upload Certificate](https://developers.cloudflare.com/api/resources/origin_tls_client_auth/subresources/zone_certificates/methods/create)

POST/zones/{zone\_id}/origin\_tls\_client\_auth

##### [Delete Certificate](https://developers.cloudflare.com/api/resources/origin_tls_client_auth/subresources/zone_certificates/methods/delete)

DELETE/zones/{zone\_id}/origin\_tls\_client\_auth/{certificate\_id}

##### ModelsExpand Collapse

<details>

<summary>

ZoneAuthenticatedOriginPull object {id, certificate, expires\_on, 4 more }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

certificate: optional string

The zone’s leaf certificate.

<a href="#">Link to this property</a>

expires\_on: optional string

When the certificate from the authority expires.

formatdate-time

<a href="#">Link to this property</a>

issuer: optional string

The certificate authority that issued the certificate.

<a href="#">Link to this property</a>

signature: optional string

The type of hash used for the certificate.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "initializing"or "pending\_deployment"or "pending\_deletion"or 4 more

Status of the certificate activation.

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

This is the time the certificate was uploaded.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20origin_tls_client_auth.zone_certificates%20%3E%20(model)%20zone_authenticated_origin_pull%20%3E%20(schema)>)

<details>

<summary>

ZoneCertificateListResponse = <a href="https://developers.cloudflare.com/api/resources/origin_tls_client_auth#(resource)%20origin_tls_client_auth.zone_certificates%20%3E%20(model)%20zone_authenticated_origin_pull%20%3E%20(schema)">ZoneAuthenticatedOriginPull</a> { id, certificate, expires\_on, 4 more }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

certificate: optional string

The zone’s leaf certificate.

<a href="#">Link to this property</a>

enabled: optional boolean

Indicates whether zone-level authenticated origin pulls is enabled.

<a href="#">Link to this property</a>

private\_key: optional string

The zone’s private key.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20origin_tls_client_auth.zone_certificates%20%3E%20(model)%20zone_certificate_list_response%20%3E%20(schema)>)

<details>

<summary>

ZoneCertificateGetResponse = <a href="https://developers.cloudflare.com/api/resources/origin_tls_client_auth#(resource)%20origin_tls_client_auth.zone_certificates%20%3E%20(model)%20zone_authenticated_origin_pull%20%3E%20(schema)">ZoneAuthenticatedOriginPull</a> { id, certificate, expires\_on, 4 more }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

certificate: optional string

The zone’s leaf certificate.

<a href="#">Link to this property</a>

enabled: optional boolean

Indicates whether zone-level authenticated origin pulls is enabled.

<a href="#">Link to this property</a>

private\_key: optional string

The zone’s private key.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20origin_tls_client_auth.zone_certificates%20%3E%20(model)%20zone_certificate_get_response%20%3E%20(schema)>)

<details>

<summary>

ZoneCertificateCreateResponse = <a href="https://developers.cloudflare.com/api/resources/origin_tls_client_auth#(resource)%20origin_tls_client_auth.zone_certificates%20%3E%20(model)%20zone_authenticated_origin_pull%20%3E%20(schema)">ZoneAuthenticatedOriginPull</a> { id, certificate, expires\_on, 4 more }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

certificate: optional string

The zone’s leaf certificate.

<a href="#">Link to this property</a>

enabled: optional boolean

Indicates whether zone-level authenticated origin pulls is enabled.

<a href="#">Link to this property</a>

private\_key: optional string

The zone’s private key.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20origin_tls_client_auth.zone_certificates%20%3E%20(model)%20zone_certificate_create_response%20%3E%20(schema)>)

<details>

<summary>

ZoneCertificateDeleteResponse = <a href="https://developers.cloudflare.com/api/resources/origin_tls_client_auth#(resource)%20origin_tls_client_auth.zone_certificates%20%3E%20(model)%20zone_authenticated_origin_pull%20%3E%20(schema)">ZoneAuthenticatedOriginPull</a> { id, certificate, expires\_on, 4 more }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

certificate: optional string

The zone’s leaf certificate.

<a href="#">Link to this property</a>

enabled: optional boolean

Indicates whether zone-level authenticated origin pulls is enabled.

<a href="#">Link to this property</a>

private\_key: optional string

The zone’s private key.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20origin_tls_client_auth.zone_certificates%20%3E%20(model)%20zone_certificate_delete_response%20%3E%20(schema)>)