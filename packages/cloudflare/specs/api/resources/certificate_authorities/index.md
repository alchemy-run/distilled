---
title: Certificate Authorities
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Certificate Authorities

#### Certificate AuthoritiesHostname Associations

##### [List Hostname Associations](https://developers.cloudflare.com/api/resources/certificate_authorities/subresources/hostname_associations/methods/get)

GET/zones/{zone\_id}/certificate\_authorities/hostname\_associations

##### [Replace Hostname Associations](https://developers.cloudflare.com/api/resources/certificate_authorities/subresources/hostname_associations/methods/update)

PUT/zones/{zone\_id}/certificate\_authorities/hostname\_associations

##### ModelsExpand Collapse

<details>

<summary>

TLSHostnameAssociation object {hostnames, mtls\_certificate\_id }

</summary>

hostnames: optional array of string

<a href="#">Link to this property</a>

mtls\_certificate\_id: optional string

The UUID for a certificate that was uploaded to the mTLS Certificate Management endpoint. If no mtls\_certificate\_id is given, the hostnames will be associated to your active Cloudflare Managed CA.

maxLength36

minLength36

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20certificate_authorities.hostname_associations%20%3E%20(model)%20tls_hostname_association%20%3E%20(schema)>)

<details>

<summary>

HostnameAssociationGetResponse object {hostnames }

</summary>

hostnames: optional array of string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20certificate_authorities.hostname_associations%20%3E%20(model)%20hostname_association_get_response%20%3E%20(schema)>)

<details>

<summary>

HostnameAssociationUpdateResponse object {hostnames }

</summary>

hostnames: optional array of string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20certificate_authorities.hostname_associations%20%3E%20(model)%20hostname_association_update_response%20%3E%20(schema)>)