---
title: Certificates
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Gateway](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Certificates

##### [List Zero Trust certificates](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/certificates/methods/list)

GET/accounts/{account\_id}/gateway/certificates

##### [Get Zero Trust certificate details](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/certificates/methods/get)

GET/accounts/{account\_id}/gateway/certificates/{certificate\_id}

##### [Create Zero Trust certificate](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/certificates/methods/create)

POST/accounts/{account\_id}/gateway/certificates

##### [Delete Zero Trust certificate](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/certificates/methods/delete)

DELETE/accounts/{account\_id}/gateway/certificates/{certificate\_id}

##### [Activate a Zero Trust certificate](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/certificates/methods/activate)

POST/accounts/{account\_id}/gateway/certificates/{certificate\_id}/activate

##### [Deactivate a Zero Trust certificate](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/certificates/methods/deactivate)

POST/accounts/{account\_id}/gateway/certificates/{certificate\_id}/deactivate

##### ModelsExpand Collapse

<details>

<summary>

CertificateListResponse object {id, binding\_status, certificate, 9 more }

</summary>

id: optional string

Identify the certificate with a UUID.

maxLength36

<a href="#">Link to this property</a>

<details>

<summary>

binding\_status: optional "pending\_deployment"or "available"or "pending\_deletion"or "inactive"

Indicate the read-only deployment status of the certificate on Cloudflare’s edge. Gateway TLS interception can use certificates in the ‘available’ (previously called ‘active’) state.

</summary>

One of the following:

"pending\_deployment"

<a href="#">Link to this property</a>

"available"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"inactive"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

certificate: optional string

Provide the CA certificate (read-only).

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

expires\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

fingerprint: optional string

Provide the SHA256 fingerprint of the certificate (read-only).

<a href="#">Link to this property</a>

in\_use: optional boolean

Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named <code>certificate</code> (read-only).

<a href="#">Link to this property</a>

issuer\_org: optional string

Indicate the organization that issued the certificate (read-only).

<a href="#">Link to this property</a>

issuer\_raw: optional string

Provide the entire issuer field of the certificate (read-only).

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "custom"or "gateway\_managed"

Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.

</summary>

One of the following:

"custom"

<a href="#">Link to this property</a>

"gateway\_managed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

uploaded\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.certificates%20%3E%20(model)%20certificate_list_response%20%3E%20(schema)>)

<details>

<summary>

CertificateGetResponse object {id, binding\_status, certificate, 9 more }

</summary>

id: optional string

Identify the certificate with a UUID.

maxLength36

<a href="#">Link to this property</a>

<details>

<summary>

binding\_status: optional "pending\_deployment"or "available"or "pending\_deletion"or "inactive"

Indicate the read-only deployment status of the certificate on Cloudflare’s edge. Gateway TLS interception can use certificates in the ‘available’ (previously called ‘active’) state.

</summary>

One of the following:

"pending\_deployment"

<a href="#">Link to this property</a>

"available"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"inactive"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

certificate: optional string

Provide the CA certificate (read-only).

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

expires\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

fingerprint: optional string

Provide the SHA256 fingerprint of the certificate (read-only).

<a href="#">Link to this property</a>

in\_use: optional boolean

Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named <code>certificate</code> (read-only).

<a href="#">Link to this property</a>

issuer\_org: optional string

Indicate the organization that issued the certificate (read-only).

<a href="#">Link to this property</a>

issuer\_raw: optional string

Provide the entire issuer field of the certificate (read-only).

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "custom"or "gateway\_managed"

Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.

</summary>

One of the following:

"custom"

<a href="#">Link to this property</a>

"gateway\_managed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

uploaded\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.certificates%20%3E%20(model)%20certificate_get_response%20%3E%20(schema)>)

<details>

<summary>

CertificateCreateResponse object {id, binding\_status, certificate, 9 more }

</summary>

id: optional string

Identify the certificate with a UUID.

maxLength36

<a href="#">Link to this property</a>

<details>

<summary>

binding\_status: optional "pending\_deployment"or "available"or "pending\_deletion"or "inactive"

Indicate the read-only deployment status of the certificate on Cloudflare’s edge. Gateway TLS interception can use certificates in the ‘available’ (previously called ‘active’) state.

</summary>

One of the following:

"pending\_deployment"

<a href="#">Link to this property</a>

"available"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"inactive"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

certificate: optional string

Provide the CA certificate (read-only).

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

expires\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

fingerprint: optional string

Provide the SHA256 fingerprint of the certificate (read-only).

<a href="#">Link to this property</a>

in\_use: optional boolean

Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named <code>certificate</code> (read-only).

<a href="#">Link to this property</a>

issuer\_org: optional string

Indicate the organization that issued the certificate (read-only).

<a href="#">Link to this property</a>

issuer\_raw: optional string

Provide the entire issuer field of the certificate (read-only).

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "custom"or "gateway\_managed"

Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.

</summary>

One of the following:

"custom"

<a href="#">Link to this property</a>

"gateway\_managed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

uploaded\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.certificates%20%3E%20(model)%20certificate_create_response%20%3E%20(schema)>)

<details>

<summary>

CertificateDeleteResponse object {id, binding\_status, certificate, 9 more }

</summary>

id: optional string

Identify the certificate with a UUID.

maxLength36

<a href="#">Link to this property</a>

<details>

<summary>

binding\_status: optional "pending\_deployment"or "available"or "pending\_deletion"or "inactive"

Indicate the read-only deployment status of the certificate on Cloudflare’s edge. Gateway TLS interception can use certificates in the ‘available’ (previously called ‘active’) state.

</summary>

One of the following:

"pending\_deployment"

<a href="#">Link to this property</a>

"available"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"inactive"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

certificate: optional string

Provide the CA certificate (read-only).

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

expires\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

fingerprint: optional string

Provide the SHA256 fingerprint of the certificate (read-only).

<a href="#">Link to this property</a>

in\_use: optional boolean

Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named <code>certificate</code> (read-only).

<a href="#">Link to this property</a>

issuer\_org: optional string

Indicate the organization that issued the certificate (read-only).

<a href="#">Link to this property</a>

issuer\_raw: optional string

Provide the entire issuer field of the certificate (read-only).

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "custom"or "gateway\_managed"

Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.

</summary>

One of the following:

"custom"

<a href="#">Link to this property</a>

"gateway\_managed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

uploaded\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.certificates%20%3E%20(model)%20certificate_delete_response%20%3E%20(schema)>)

<details>

<summary>

CertificateActivateResponse object {id, binding\_status, certificate, 9 more }

</summary>

id: optional string

Identify the certificate with a UUID.

maxLength36

<a href="#">Link to this property</a>

<details>

<summary>

binding\_status: optional "pending\_deployment"or "available"or "pending\_deletion"or "inactive"

Indicate the read-only deployment status of the certificate on Cloudflare’s edge. Gateway TLS interception can use certificates in the ‘available’ (previously called ‘active’) state.

</summary>

One of the following:

"pending\_deployment"

<a href="#">Link to this property</a>

"available"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"inactive"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

certificate: optional string

Provide the CA certificate (read-only).

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

expires\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

fingerprint: optional string

Provide the SHA256 fingerprint of the certificate (read-only).

<a href="#">Link to this property</a>

in\_use: optional boolean

Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named <code>certificate</code> (read-only).

<a href="#">Link to this property</a>

issuer\_org: optional string

Indicate the organization that issued the certificate (read-only).

<a href="#">Link to this property</a>

issuer\_raw: optional string

Provide the entire issuer field of the certificate (read-only).

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "custom"or "gateway\_managed"

Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.

</summary>

One of the following:

"custom"

<a href="#">Link to this property</a>

"gateway\_managed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

uploaded\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.certificates%20%3E%20(model)%20certificate_activate_response%20%3E%20(schema)>)

<details>

<summary>

CertificateDeactivateResponse object {id, binding\_status, certificate, 9 more }

</summary>

id: optional string

Identify the certificate with a UUID.

maxLength36

<a href="#">Link to this property</a>

<details>

<summary>

binding\_status: optional "pending\_deployment"or "available"or "pending\_deletion"or "inactive"

Indicate the read-only deployment status of the certificate on Cloudflare’s edge. Gateway TLS interception can use certificates in the ‘available’ (previously called ‘active’) state.

</summary>

One of the following:

"pending\_deployment"

<a href="#">Link to this property</a>

"available"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"inactive"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

certificate: optional string

Provide the CA certificate (read-only).

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

expires\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

fingerprint: optional string

Provide the SHA256 fingerprint of the certificate (read-only).

<a href="#">Link to this property</a>

in\_use: optional boolean

Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named <code>certificate</code> (read-only).

<a href="#">Link to this property</a>

issuer\_org: optional string

Indicate the organization that issued the certificate (read-only).

<a href="#">Link to this property</a>

issuer\_raw: optional string

Provide the entire issuer field of the certificate (read-only).

<a href="#">Link to this property</a>

<details>

<summary>

type: optional "custom"or "gateway\_managed"

Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.

</summary>

One of the following:

"custom"

<a href="#">Link to this property</a>

"gateway\_managed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

uploaded\_on: optional string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.certificates%20%3E%20(model)%20certificate_deactivate_response%20%3E%20(schema)>)