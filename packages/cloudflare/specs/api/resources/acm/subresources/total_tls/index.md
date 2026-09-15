---
title: Total TLS
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[ACM](https://developers.cloudflare.com/api/resources/acm)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Total TLS

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