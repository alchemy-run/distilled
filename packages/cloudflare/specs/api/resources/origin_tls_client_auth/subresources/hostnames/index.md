---
title: Hostnames
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Origin TLS Client Auth](https://developers.cloudflare.com/api/resources/origin_tls_client_auth)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Hostnames

##### [Get the Hostname Status for Client Authentication](https://developers.cloudflare.com/api/resources/origin_tls_client_auth/subresources/hostnames/methods/get)

GET/zones/{zone\_id}/origin\_tls\_client\_auth/hostnames/{hostname}

##### [Enable or Disable a Hostname for Client Authentication](https://developers.cloudflare.com/api/resources/origin_tls_client_auth/subresources/hostnames/methods/update)

PUT/zones/{zone\_id}/origin\_tls\_client\_auth/hostnames

##### ModelsExpand Collapse

<details>

<summary>

AuthenticatedOriginPull object {cert\_id, cert\_status, cert\_updated\_at, 11 more }

</summary>

cert\_id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

cert\_status: optional "initializing"or "pending\_deployment"or "pending\_deletion"or 4 more

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

cert\_updated\_at: optional string

The time when the certificate was updated.

formatdate-time

<a href="#">Link to this property</a>

cert\_uploaded\_on: optional string

The time when the certificate was uploaded.

formatdate-time

<a href="#">Link to this property</a>

certificate: optional string

The hostname certificate.

<a href="#">Link to this property</a>

created\_at: optional string

The time when the certificate was created.

formatdate-time

<a href="#">Link to this property</a>

enabled: optional boolean

Indicates whether hostname-level authenticated origin pulls is enabled. A null value voids the association.

<a href="#">Link to this property</a>

expires\_on: optional string

The date when the certificate expires.

formatdate-time

<a href="#">Link to this property</a>

hostname: optional string

The hostname on the origin for which the client certificate uploaded will be used.

maxLength255

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

updated\_at: optional string

The time when the certificate was updated.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20origin_tls_client_auth.hostnames%20%3E%20(model)%20authenticated_origin_pull%20%3E%20(schema)>)

<details>

<summary>

HostnameUpdateResponse = <a href="https://developers.cloudflare.com/api/resources/origin_tls_client_auth#(resource)%20origin_tls_client_auth.hostnames%20%3E%20(model)%20authenticated_origin_pull%20%3E%20(schema)">AuthenticatedOriginPull</a> { cert\_id, cert\_status, cert\_updated\_at, 11 more }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

cert\_id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

certificate: optional string

The hostname certificate.

<a href="#">Link to this property</a>

enabled: optional boolean

Indicates whether hostname-level authenticated origin pulls is enabled. A null value voids the association.

<a href="#">Link to this property</a>

hostname: optional string

The hostname on the origin for which the client certificate uploaded will be used.

maxLength255

<a href="#">Link to this property</a>

private\_key: optional string

The hostname certificate’s private key.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20origin_tls_client_auth.hostnames%20%3E%20(model)%20hostname_update_response%20%3E%20(schema)>)