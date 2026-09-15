---
title: Certificates
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Certificates

##### [List mTLS certificates](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/certificates/methods/list)

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/access/certificates

##### [Get an mTLS certificate](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/certificates/methods/get)

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/access/certificates/{certificate\_id}

##### [Add an mTLS certificate](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/certificates/methods/create)

POST/{accounts\_or\_zones}/{account\_or\_zone\_id}/access/certificates

##### [Update an mTLS certificate](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/certificates/methods/update)

PUT/{accounts\_or\_zones}/{account\_or\_zone\_id}/access/certificates/{certificate\_id}

##### [Delete an mTLS certificate](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/certificates/methods/delete)

DELETE/{accounts\_or\_zones}/{account\_or\_zone\_id}/access/certificates/{certificate\_id}

##### ModelsExpand Collapse

AssociatedHostnames = string

A fully-qualified domain name (FQDN).

[Link to this property](#)%20zero_trust.access.certificates%20%3E%20(model)%20associated_hostnames%20%3E%20(schema)>)

<details>

<summary>

Certificate object {id, associated\_hostnames, expires\_on, 2 more }

</summary>

id: optional string

The ID of the application that will use this certificate.

<a href="#">Link to this property</a>

associated\_hostnames: optional array of <a href="https://developers.cloudflare.com/api/resources/zero_trust#(resource)%20zero_trust.access.certificates%20%3E%20(model)%20associated_hostnames%20%3E%20(schema)">AssociatedHostnames</a>

The hostnames of the applications that will use this certificate.

<a href="#">Link to this property</a>

expires\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

fingerprint: optional string

The MD5 fingerprint of the certificate.

<a href="#">Link to this property</a>

name: optional string

The name of the certificate.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.certificates%20%3E%20(model)%20certificate%20%3E%20(schema)>)

<details>

<summary>

CertificateDeleteResponse object {id }

</summary>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.certificates%20%3E%20(model)%20certificate_delete_response%20%3E%20(schema)>)

#### CertificatesSettings

##### [List all mTLS hostname settings](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/certificates/subresources/settings/methods/get)

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/access/certificates/settings

##### [Update an mTLS certificate's hostname settings](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/certificates/subresources/settings/methods/update)

PUT/{accounts\_or\_zones}/{account\_or\_zone\_id}/access/certificates/settings

##### ModelsExpand Collapse

<details>

<summary>

CertificateSettings object {china\_network, client\_certificate\_forwarding, hostname }

</summary>

china\_network: boolean

Request client certificates for this hostname in China. Can only be set to true if this zone is china network enabled.

<a href="#">Link to this property</a>

client\_certificate\_forwarding: boolean

Client Certificate Forwarding is a feature that takes the client cert provided by the eyeball to the edge, and forwards it to the origin as a HTTP header to allow logging on the origin.

<a href="#">Link to this property</a>

hostname: string

The hostname that these settings apply to.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.certificates.settings%20%3E%20(model)%20certificate_settings%20%3E%20(schema)>)