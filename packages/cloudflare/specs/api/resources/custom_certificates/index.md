---
title: Custom Certificates
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Custom Certificates

##### [List SSL Configurations](https://developers.cloudflare.com/api/resources/custom_certificates/methods/list)

GET/zones/{zone\_id}/custom\_certificates

##### [SSL Configuration Details](https://developers.cloudflare.com/api/resources/custom_certificates/methods/get)

GET/zones/{zone\_id}/custom\_certificates/{custom\_certificate\_id}

##### [Create SSL Configuration](https://developers.cloudflare.com/api/resources/custom_certificates/methods/create)

POST/zones/{zone\_id}/custom\_certificates

##### [Edit SSL Configuration](https://developers.cloudflare.com/api/resources/custom_certificates/methods/edit)

PATCH/zones/{zone\_id}/custom\_certificates/{custom\_certificate\_id}

##### [Delete SSL Configuration](https://developers.cloudflare.com/api/resources/custom_certificates/methods/delete)

DELETE/zones/{zone\_id}/custom\_certificates/{custom\_certificate\_id}

##### ModelsExpand Collapse

<details>

<summary>

CustomCertificate object {id, zone\_id, bundle\_method, 12 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

zone\_id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

bundle\_method: optional <a href="https://developers.cloudflare.com/api/resources/custom_hostnames#(resource)%20custom_hostnames%20%3E%20(model)%20bundle_method%20%3E%20(schema)">BundleMethod</a>

A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An optimal bundle uses the shortest chain and newest intermediates. And the force bundle verifies the chain, but does not otherwise modify it.

<a href="#">Link to this property</a>

custom\_csr\_id: optional string

The identifier for the Custom CSR that was used.

<a href="#">Link to this property</a>

expires\_on: optional string

When the certificate from the authority expires.

formatdate-time

<a href="#">Link to this property</a>

geo\_restrictions: optional <a href="https://developers.cloudflare.com/api/resources/custom_certificates#(resource)%20custom_certificates%20%3E%20(model)%20geo_restrictions%20%3E%20(schema)">GeoRestrictions</a> { label }

Specify the region where your private key can be held locally for optimal TLS performance. HTTPS connections to any excluded data center will still be fully encrypted, but will incur some latency while Keyless SSL is used to complete the handshake with the nearest allowed data center. Options allow distribution to only to U.S. data centers, only to E.U. data centers, or only to highest security data centers. Default distribution is to all Cloudflare datacenters, for optimal performance.

<a href="#">Link to this property</a>

hosts: optional array of string

<a href="#">Link to this property</a>

issuer: optional string

The certificate authority that issued the certificate.

<a href="#">Link to this property</a>

keyless\_server: optional <a href="https://developers.cloudflare.com/api/resources/keyless_certificates#(resource)%20keyless_certificates%20%3E%20(model)%20keyless_certificate%20%3E%20(schema)">KeylessCertificate</a> { id, created\_on, enabled, 7 more }

<a href="#">Link to this property</a>

modified\_on: optional string

When the certificate was last modified.

formatdate-time

<a href="#">Link to this property</a>

policy\_restrictions: optional string

The policy restrictions returned by the API. This field is returned in responses when a policy has been set. The API accepts the “policy” field in requests but returns this field as “policy\_restrictions” in responses.

Specifies the region(s) where your private key can be held locally for optimal TLS performance. Format is a boolean expression, for example: “(country: US) or (region: EU)”

<a href="#">Link to this property</a>

priority: optional number

The order/priority in which the certificate will be used in a request. The higher priority will break ties across overlapping ‘legacy\_custom’ certificates, but ‘legacy\_custom’ certificates will always supercede ‘sni\_custom’ certificates.

<a href="#">Link to this property</a>

signature: optional string

The type of hash used for the certificate.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "active"or "expired"or "deleted"or 2 more

Status of the zone’s custom SSL.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"expired"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"initializing"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

uploaded\_on: optional string

When the certificate was uploaded to Cloudflare.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_certificates%20%3E%20(model)%20custom_certificate%20%3E%20(schema)>)

<details>

<summary>

GeoRestrictions object {label }

Specify the region where your private key can be held locally for optimal TLS performance. HTTPS connections to any excluded data center will still be fully encrypted, but will incur some latency while Keyless SSL is used to complete the handshake with the nearest allowed data center. Options allow distribution to only to U.S. data centers, only to E.U. data centers, or only to highest security data centers. Default distribution is to all Cloudflare datacenters, for optimal performance.

</summary>

<details>

<summary>

label: optional "us"or "eu"or "highest\_security"

</summary>

One of the following:

"us"

<a href="#">Link to this property</a>

"eu"

<a href="#">Link to this property</a>

"highest\_security"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_certificates%20%3E%20(model)%20geo_restrictions%20%3E%20(schema)>)

<details>

<summary>

CustomCertificateDeleteResponse object {id }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_certificates%20%3E%20(model)%20custom_certificate_delete_response%20%3E%20(schema)>)

#### Custom CertificatesPrioritize

##### [Re-prioritize SSL Certificates](https://developers.cloudflare.com/api/resources/custom_certificates/subresources/prioritize/methods/update)

PUT/zones/{zone\_id}/custom\_certificates/prioritize