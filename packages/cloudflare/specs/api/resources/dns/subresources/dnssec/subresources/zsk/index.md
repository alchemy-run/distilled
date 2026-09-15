---
title: Zsk
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[DNS](https://developers.cloudflare.com/api/resources/dns)

[DNSSEC](https://developers.cloudflare.com/api/resources/dns/subresources/dnssec)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Zsk

##### [List DNSSEC ZSKs](https://developers.cloudflare.com/api/resources/dns/subresources/dnssec/subresources/zsk/methods/list)

GET/zones/{zone\_id}/dnssec/zsk

##### ModelsExpand Collapse

<details>

<summary>

ZskListResponse object {DNSKEY, Location, Name, 2 more }

</summary>

<details>

<summary>

DNSKEY: optional object {Algorithm, Flags, Hdr, 2 more }

</summary>

Algorithm: optional number

<a href="#">Link to this property</a>

Flags: optional number

<a href="#">Link to this property</a>

<details>

<summary>

Hdr: optional object {Class, Name, Rdlength, 2 more }

</summary>

Class: optional number

<a href="#">Link to this property</a>

Name: optional string

<a href="#">Link to this property</a>

Rdlength: optional number

<a href="#">Link to this property</a>

Rrtype: optional number

<a href="#">Link to this property</a>

Ttl: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

Protocol: optional number

<a href="#">Link to this property</a>

PublicKey: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Location: optional "database"or "vault"

Storage backend where the DNSSEC key material is stored.

</summary>

One of the following:

"database"

<a href="#">Link to this property</a>

"vault"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

Name: optional string

Internal key name for the ZSK.

<a href="#">Link to this property</a>

<details>

<summary>

SigningKey: optional object {kek, privkey, pubkey }

</summary>

kek: optional string

Key encryption key name used to encrypt the private key.

<a href="#">Link to this property</a>

privkey: optional string

Encrypted private key material for the signing key.

formatbyte

<a href="#">Link to this property</a>

pubkey: optional string

Public key content associated with the signing key.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Tag: optional "active"or "publish"or "external"or 3 more

Lifecycle state tag attached to the DNSSEC key.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"publish"

<a href="#">Link to this property</a>

"external"

<a href="#">Link to this property</a>

"retired"

<a href="#">Link to this property</a>

"revoked"

<a href="#">Link to this property</a>

"removed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.dnssec.zsk%20%3E%20(model)%20zsk_list_response%20%3E%20(schema)>)