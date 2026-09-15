---
title: SAML Certificates
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# SAML Certificates

##### [List SAML certificate sets](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/saml_certificates/methods/list)

GET/accounts/{account\_id}/access/saml\_certificates

##### [Get SAML certificate set](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/saml_certificates/methods/get)

GET/accounts/{account\_id}/access/saml\_certificates/{saml\_cert\_set\_id}

##### [Rotate SAML certificate](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/saml_certificates/methods/rotate)

POST/accounts/{account\_id}/access/saml\_certificates/{saml\_cert\_set\_id}/rotate

##### [Download current certificate in PEM format](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/saml_certificates/methods/get_pem)

GET/accounts/{account\_id}/access/saml\_certificates/{saml\_cert\_set\_id}/pem

##### ModelsExpand Collapse

<details>

<summary>

SAMLCertificateListResponse object {created\_at, uid, updated\_at, 2 more }

</summary>

created\_at: string

When the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

<a href="#">Link to this property</a>

updated\_at: string

When the certificate set was last updated

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The current active certificate

</summary>

is\_current: boolean

Indicates whether the certificate can be used for IdP configuration.

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

The public certificate in PEM format

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate (maintained during rotation period). May be null when no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.saml_certificates%20%3E%20(model)%20saml_certificate_list_response%20%3E%20(schema)>)

<details>

<summary>

SAMLCertificateGetResponse object {created\_at, uid, updated\_at, 2 more }

</summary>

created\_at: string

When the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

<a href="#">Link to this property</a>

updated\_at: string

When the certificate set was last updated

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The current active certificate

</summary>

is\_current: boolean

Indicates whether the certificate can be used for IdP configuration.

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

The public certificate in PEM format

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate (maintained during rotation period). May be null when no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.saml_certificates%20%3E%20(model)%20saml_certificate_get_response%20%3E%20(schema)>)

<details>

<summary>

SAMLCertificateRotateResponse object {created\_at, uid, updated\_at, 2 more }

</summary>

created\_at: string

When the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

<a href="#">Link to this property</a>

updated\_at: string

When the certificate set was last updated

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The current active certificate

</summary>

is\_current: boolean

Indicates whether the certificate can be used for IdP configuration.

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

The public certificate in PEM format

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate (maintained during rotation period). May be null when no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.saml_certificates%20%3E%20(model)%20saml_certificate_rotate_response%20%3E%20(schema)>)