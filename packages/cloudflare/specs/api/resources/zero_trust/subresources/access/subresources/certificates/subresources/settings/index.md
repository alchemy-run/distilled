---
title: Settings
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

[Certificates](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/certificates)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Settings

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