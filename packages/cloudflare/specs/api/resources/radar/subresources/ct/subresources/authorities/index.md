---
title: Authorities
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Radar](https://developers.cloudflare.com/api/resources/radar)

[CT](https://developers.cloudflare.com/api/resources/radar/subresources/ct)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Authorities

##### [Get certificate authority details](https://developers.cloudflare.com/api/resources/radar/subresources/ct/subresources/authorities/methods/get)

GET/radar/ct/authorities/{ca\_slug}

##### [List certificate authorities](https://developers.cloudflare.com/api/resources/radar/subresources/ct/subresources/authorities/methods/list)

GET/radar/ct/authorities

##### ModelsExpand Collapse

<details>

<summary>

AuthorityGetResponse object {certificateAuthority }

</summary>

<details>

<summary>

certificateAuthority: object {appleStatus, authorityKeyIdentifier, certificateRecordType, 15 more }

</summary>

<details>

<summary>

appleStatus: "INCLUDED"or "NOT\_YET\_INCLUDED"or "NOT\_INCLUDED"or 4 more

The inclusion status of a Certificate Authority (CA) in the trust store.

</summary>

One of the following:

"INCLUDED"

<a href="#">Link to this property</a>

"NOT\_YET\_INCLUDED"

<a href="#">Link to this property</a>

"NOT\_INCLUDED"

<a href="#">Link to this property</a>

"NOT\_BEFORE"

<a href="#">Link to this property</a>

"REMOVED"

<a href="#">Link to this property</a>

"DISABLED"

<a href="#">Link to this property</a>

"BLOCKED"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

authorityKeyIdentifier: string

The authorityKeyIdentifier value extracted from the certificate PEM.

<a href="#">Link to this property</a>

<details>

<summary>

certificateRecordType: "ROOT\_CERTIFICATE"or "INTERMEDIATE\_CERTIFICATE"

Specifies the type of certificate in the trust chain.

</summary>

One of the following:

"ROOT\_CERTIFICATE"

<a href="#">Link to this property</a>

"INTERMEDIATE\_CERTIFICATE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

chromeStatus: "INCLUDED"or "NOT\_YET\_INCLUDED"or "NOT\_INCLUDED"or 4 more

The inclusion status of a Certificate Authority (CA) in the trust store.

</summary>

One of the following:

"INCLUDED"

<a href="#">Link to this property</a>

"NOT\_YET\_INCLUDED"

<a href="#">Link to this property</a>

"NOT\_INCLUDED"

<a href="#">Link to this property</a>

"NOT\_BEFORE"

<a href="#">Link to this property</a>

"REMOVED"

<a href="#">Link to this property</a>

"DISABLED"

<a href="#">Link to this property</a>

"BLOCKED"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

country: string

The two-letter ISO country code where the CA organization is based.

<a href="#">Link to this property</a>

countryName: string

The full country name corresponding to the country code.

<a href="#">Link to this property</a>

<details>

<summary>

microsoftStatus: "INCLUDED"or "NOT\_YET\_INCLUDED"or "NOT\_INCLUDED"or 4 more

The inclusion status of a Certificate Authority (CA) in the trust store.

</summary>

One of the following:

"INCLUDED"

<a href="#">Link to this property</a>

"NOT\_YET\_INCLUDED"

<a href="#">Link to this property</a>

"NOT\_INCLUDED"

<a href="#">Link to this property</a>

"NOT\_BEFORE"

<a href="#">Link to this property</a>

"REMOVED"

<a href="#">Link to this property</a>

"DISABLED"

<a href="#">Link to this property</a>

"BLOCKED"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

mozillaStatus: "INCLUDED"or "NOT\_YET\_INCLUDED"or "NOT\_INCLUDED"or 4 more

The inclusion status of a Certificate Authority (CA) in the trust store.

</summary>

One of the following:

"INCLUDED"

<a href="#">Link to this property</a>

"NOT\_YET\_INCLUDED"

<a href="#">Link to this property</a>

"NOT\_INCLUDED"

<a href="#">Link to this property</a>

"NOT\_BEFORE"

<a href="#">Link to this property</a>

"REMOVED"

<a href="#">Link to this property</a>

"DISABLED"

<a href="#">Link to this property</a>

"BLOCKED"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

The full name of the certificate authority (CA).

<a href="#">Link to this property</a>

owner: string

The organization that owns and operates the CA.

<a href="#">Link to this property</a>

parentName: string

The name of the parent/root certificate authority that issued this intermediate certificate.

<a href="#">Link to this property</a>

parentSha256Fingerprint: string

The SHA-256 fingerprint of the parent certificate.

<a href="#">Link to this property</a>

<details>

<summary>

related: array of object {certificateRecordType, name, revocationStatus, sha256Fingerprint }

CAs from the same owner.

</summary>

<details>

<summary>

certificateRecordType: "ROOT\_CERTIFICATE"or "INTERMEDIATE\_CERTIFICATE"

Specifies the type of certificate in the trust chain.

</summary>

One of the following:

"ROOT\_CERTIFICATE"

<a href="#">Link to this property</a>

"INTERMEDIATE\_CERTIFICATE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: string

The full name of the certificate authority (CA).

<a href="#">Link to this property</a>

<details>

<summary>

revocationStatus: "NOT\_REVOKED"or "REVOKED"or "PARENT\_CERT\_REVOKED"

The current revocation status of a Certificate Authority (CA) certificate.

</summary>

One of the following:

"NOT\_REVOKED"

<a href="#">Link to this property</a>

"REVOKED"

<a href="#">Link to this property</a>

"PARENT\_CERT\_REVOKED"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

sha256Fingerprint: string

The SHA-256 fingerprint of the intermediate certificate.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

revocationStatus: "NOT\_REVOKED"or "REVOKED"or "PARENT\_CERT\_REVOKED"

The current revocation status of a Certificate Authority (CA) certificate.

</summary>

One of the following:

"NOT\_REVOKED"

<a href="#">Link to this property</a>

"REVOKED"

<a href="#">Link to this property</a>

"PARENT\_CERT\_REVOKED"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

sha256Fingerprint: string

The SHA-256 fingerprint of the intermediate certificate.

<a href="#">Link to this property</a>

subjectKeyIdentifier: string

The subjectKeyIdentifier value extracted from the certificate PEM.

<a href="#">Link to this property</a>

validFrom: string

The start date of the certificate’s validity period (ISO format).

<a href="#">Link to this property</a>

validTo: string

The end date of the certificate’s validity period (ISO format).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.ct.authorities%20%3E%20(model)%20authority_get_response%20%3E%20(schema)>)

<details>

<summary>

AuthorityListResponse object {certificateAuthorities }

</summary>

<details>

<summary>

certificateAuthorities: array of object {certificateRecordType, country, countryName, 6 more }

</summary>

<details>

<summary>

certificateRecordType: "ROOT\_CERTIFICATE"or "INTERMEDIATE\_CERTIFICATE"

Specifies the type of certificate in the trust chain.

</summary>

One of the following:

"ROOT\_CERTIFICATE"

<a href="#">Link to this property</a>

"INTERMEDIATE\_CERTIFICATE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

country: string

The two-letter ISO country code where the CA organization is based.

<a href="#">Link to this property</a>

countryName: string

The full country name corresponding to the country code.

<a href="#">Link to this property</a>

name: string

The full name of the certificate authority (CA).

<a href="#">Link to this property</a>

owner: string

The organization that owns and operates the CA.

<a href="#">Link to this property</a>

parentName: string

The name of the parent/root certificate authority that issued this intermediate certificate.

<a href="#">Link to this property</a>

parentSha256Fingerprint: string

The SHA-256 fingerprint of the parent certificate.

<a href="#">Link to this property</a>

<details>

<summary>

revocationStatus: "NOT\_REVOKED"or "REVOKED"or "PARENT\_CERT\_REVOKED"

The current revocation status of a Certificate Authority (CA) certificate.

</summary>

One of the following:

"NOT\_REVOKED"

<a href="#">Link to this property</a>

"REVOKED"

<a href="#">Link to this property</a>

"PARENT\_CERT\_REVOKED"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

sha256Fingerprint: string

The SHA-256 fingerprint of the intermediate certificate.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20radar.ct.authorities%20%3E%20(model)%20authority_list_response%20%3E%20(schema)>)