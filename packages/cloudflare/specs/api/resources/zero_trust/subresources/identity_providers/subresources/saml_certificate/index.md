---
title: SAML Certificate
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Identity Providers](https://developers.cloudflare.com/api/resources/zero_trust/subresources/identity_providers)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# SAML Certificate

##### [Create SAML encryption certificate for Identity Provider](https://developers.cloudflare.com/api/resources/zero_trust/subresources/identity_providers/subresources/saml_certificate/methods/create)

POST/accounts/{account\_id}/access/identity\_providers/{identity\_provider\_id}/saml\_certificate

##### ModelsExpand Collapse

<details>

<summary>

SAMLCertificateCreateResponse object {created\_at, uid, updated\_at, 2 more }

A SAML encryption certificate set containing current and optionally previous certificates for encryption key rotation.

</summary>

created\_at: string

Timestamp when the certificate set was created

formatdate-time

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate set

formatuuid

<a href="#">Link to this property</a>

updated\_at: string

Timestamp when the certificate set was last updated (e.g., during rotation)

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

current\_certificate: optional object {is\_current, not\_after, public\_certificate, uid }

The currently active certificate used for encrypting SAML assertions

</summary>

is\_current: boolean

Indicates whether this is the currently active certificate

<a href="#">Link to this property</a>

not\_after: string

Certificate expiration date. Certificates are automatically rotated 30 days before expiration.

formatdate-time

<a href="#">Link to this property</a>

public\_certificate: string

PEM-encoded X.509 certificate containing the public key. Configure this certificate in your external SAML Identity Provider to enable encryption.

<a href="#">Link to this property</a>

uid: string

Unique identifier for the certificate

formatuuid

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

previous\_certificate: optional unknown

The previous certificate, maintained during rotation to ensure continuity. Null if no rotation has occurred. Mirrors the structure of <code>saml_certificate</code>.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.identity_providers.saml_certificate%20%3E%20(model)%20saml_certificate_create_response%20%3E%20(schema)>)