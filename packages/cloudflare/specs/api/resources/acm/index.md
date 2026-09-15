---
title: ACM
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# ACM

#### ACMTotal TLS

##### [Total TLS Settings Details](https://developers.cloudflare.com/api/resources/acm/subresources/total_tls/methods/get)

GET/zones/{zone\_id}/acm/total\_tls

##### [Enable or Disable Total TLS](https://developers.cloudflare.com/api/resources/acm/subresources/total_tls/methods/update)

POST/zones/{zone\_id}/acm/total\_tls

##### [Enable or Disable Total TLS](https://developers.cloudflare.com/api/resources/acm/subresources/total_tls/methods/edit)

POST/zones/{zone\_id}/acm/total\_tls

##### ModelsExpand Collapse

<details>

<summary>

CertificateAuthority = "google"or "lets\_encrypt"or "ssl\_com"

The Certificate Authority that Total TLS certificates will be issued through.

</summary>

One of the following:

"google"

<a href="#">Link to this property</a>

"lets\_encrypt"

<a href="#">Link to this property</a>

"ssl\_com"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20acm.total_tls%20%3E%20(model)%20certificate_authority%20%3E%20(schema)>)

<details>

<summary>

TotalTLSGetResponse object {certificate\_authority, enabled, validity\_period }

</summary>

certificate\_authority: optional <a href="https://developers.cloudflare.com/api/resources/acm#(resource)%20acm.total_tls%20%3E%20(model)%20certificate_authority%20%3E%20(schema)">CertificateAuthority</a>

The Certificate Authority that Total TLS certificates will be issued through.

<a href="#">Link to this property</a>

enabled: optional boolean

If enabled, Total TLS will order a hostname specific TLS certificate for any proxied A, AAAA, or CNAME record in your zone.

<a href="#">Link to this property</a>

validity\_period: optional 90

The validity period in days for the certificates ordered via Total TLS.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20acm.total_tls%20%3E%20(model)%20total_tls_get_response%20%3E%20(schema)>)

<details>

<summary>

TotalTLSUpdateResponse object {certificate\_authority, enabled, validity\_period }

</summary>

certificate\_authority: optional <a href="https://developers.cloudflare.com/api/resources/acm#(resource)%20acm.total_tls%20%3E%20(model)%20certificate_authority%20%3E%20(schema)">CertificateAuthority</a>

The Certificate Authority that Total TLS certificates will be issued through.

<a href="#">Link to this property</a>

enabled: optional boolean

If enabled, Total TLS will order a hostname specific TLS certificate for any proxied A, AAAA, or CNAME record in your zone.

<a href="#">Link to this property</a>

validity\_period: optional 90

The validity period in days for the certificates ordered via Total TLS.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20acm.total_tls%20%3E%20(model)%20total_tls_update_response%20%3E%20(schema)>)

<details>

<summary>

TotalTLSEditResponse object {certificate\_authority, enabled, validity\_period }

</summary>

certificate\_authority: optional <a href="https://developers.cloudflare.com/api/resources/acm#(resource)%20acm.total_tls%20%3E%20(model)%20certificate_authority%20%3E%20(schema)">CertificateAuthority</a>

The Certificate Authority that Total TLS certificates will be issued through.

<a href="#">Link to this property</a>

enabled: optional boolean

If enabled, Total TLS will order a hostname specific TLS certificate for any proxied A, AAAA, or CNAME record in your zone.

<a href="#">Link to this property</a>

validity\_period: optional 90

The validity period in days for the certificates ordered via Total TLS.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20acm.total_tls%20%3E%20(model)%20total_tls_edit_response%20%3E%20(schema)>)

#### ACMCustom Trust Store

##### [List Custom Origin Trust Store Details](https://developers.cloudflare.com/api/resources/acm/subresources/custom_trust_store/methods/list)

GET/zones/{zone\_id}/acm/custom\_trust\_store

##### [Upload Custom Origin Trust Store](https://developers.cloudflare.com/api/resources/acm/subresources/custom_trust_store/methods/create)

POST/zones/{zone\_id}/acm/custom\_trust\_store

##### [Custom Origin Trust Store Details](https://developers.cloudflare.com/api/resources/acm/subresources/custom_trust_store/methods/get)

GET/zones/{zone\_id}/acm/custom\_trust\_store/{custom\_origin\_trust\_store\_id}

##### [Delete Custom Origin Trust Store](https://developers.cloudflare.com/api/resources/acm/subresources/custom_trust_store/methods/delete)

DELETE/zones/{zone\_id}/acm/custom\_trust\_store/{custom\_origin\_trust\_store\_id}

##### ModelsExpand Collapse

<details>

<summary>

CustomTrustStore object {id, certificate, expires\_on, 5 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

certificate: string

The root CA certificate in PEM format. Only root CA certificates are accepted; intermediate and leaf certificates are not supported.

<a href="#">Link to this property</a>

expires\_on: string

When the certificate expires.

formatdate-time

<a href="#">Link to this property</a>

issuer: string

The certificate authority that issued the certificate.

<a href="#">Link to this property</a>

signature: string

The type of hash used for the certificate.

<a href="#">Link to this property</a>

<details>

<summary>

status: "initializing"or "pending\_deployment"or "active"or 3 more

Status of the zone’s custom SSL.

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending\_deployment"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

"expired"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: string

When the certificate was last modified.

formatdate-time

<a href="#">Link to this property</a>

uploaded\_on: string

When the certificate was uploaded to Cloudflare.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20acm.custom_trust_store%20%3E%20(model)%20custom-trust-store%20%3E%20(schema)>)

<details>

<summary>

CustomTrustStoreDeleteResponse object {id }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20acm.custom_trust_store%20%3E%20(model)%20custom_trust_store_delete_response%20%3E%20(schema)>)