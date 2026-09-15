---
title: Client Certificates
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Client Certificates

##### [List Client Certificates](https://developers.cloudflare.com/api/resources/client_certificates/methods/list)

GET/zones/{zone\_id}/client\_certificates

##### [Client Certificate Details](https://developers.cloudflare.com/api/resources/client_certificates/methods/get)

GET/zones/{zone\_id}/client\_certificates/{client\_certificate\_id}

##### [Create Client Certificate](https://developers.cloudflare.com/api/resources/client_certificates/methods/create)

POST/zones/{zone\_id}/client\_certificates

##### [Reactivate Client Certificate](https://developers.cloudflare.com/api/resources/client_certificates/methods/edit)

PATCH/zones/{zone\_id}/client\_certificates/{client\_certificate\_id}

##### [Revoke Client Certificate](https://developers.cloudflare.com/api/resources/client_certificates/methods/delete)

DELETE/zones/{zone\_id}/client\_certificates/{client\_certificate\_id}

##### ModelsExpand Collapse

<details>

<summary>

ClientCertificate object {id, certificate, certificate\_authority, 15 more }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

certificate: optional string

The Client Certificate PEM.

<a href="#">Link to this property</a>

<details>

<summary>

certificate\_authority: optional object {id, name }

Certificate Authority used to issue the Client Certificate.

</summary>

id: optional string

<a href="#">Link to this property</a>

name: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

common\_name: optional string

Common Name of the Client Certificate.

<a href="#">Link to this property</a>

country: optional string

Country, provided by the CSR.

<a href="#">Link to this property</a>

csr: optional string

The Certificate Signing Request (CSR). Must be newline-encoded.

<a href="#">Link to this property</a>

expires\_on: optional string

Date that the Client Certificate expires.

<a href="#">Link to this property</a>

fingerprint\_sha256: optional string

Unique identifier of the Client Certificate.

<a href="#">Link to this property</a>

issued\_on: optional string

Date that the Client Certificate was issued by the Certificate Authority.

<a href="#">Link to this property</a>

location: optional string

Location, provided by the CSR.

<a href="#">Link to this property</a>

organization: optional string

Organization, provided by the CSR.

<a href="#">Link to this property</a>

organizational\_unit: optional string

Organizational Unit, provided by the CSR.

<a href="#">Link to this property</a>

serial\_number: optional string

The serial number on the created Client Certificate.

<a href="#">Link to this property</a>

signature: optional string

The type of hash used for the Client Certificate..

<a href="#">Link to this property</a>

ski: optional string

Subject Key Identifier.

<a href="#">Link to this property</a>

state: optional string

State, provided by the CSR.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "active"or "pending\_reactivation"or "pending\_revocation"or "revoked"

Client Certificates may be active or revoked, and the pending\_reactivation or pending\_revocation represent in-progress asynchronous transitions.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"pending\_reactivation"

<a href="#">Link to this property</a>

"pending\_revocation"

<a href="#">Link to this property</a>

"revoked"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

validity\_days: optional number

The number of days the Client Certificate will be valid after the issued\_on date.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20client_certificates%20%3E%20(model)%20client_certificate%20%3E%20(schema)>)