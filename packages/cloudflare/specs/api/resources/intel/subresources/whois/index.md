---
title: Whois
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Intel](https://developers.cloudflare.com/api/resources/intel)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Whois

##### [Get WHOIS Record](https://developers.cloudflare.com/api/resources/intel/subresources/whois/methods/get)

GET/accounts/{account\_id}/intel/whois

##### ModelsExpand Collapse

<details>

<summary>

Whois object {created\_date, domain, nameservers, 6 more }

</summary>

created\_date: optional string

formatdate

<a href="#">Link to this property</a>

domain: optional string

<a href="#">Link to this property</a>

nameservers: optional array of string

<a href="#">Link to this property</a>

registrant: optional string

<a href="#">Link to this property</a>

registrant\_country: optional string

<a href="#">Link to this property</a>

registrant\_email: optional string

<a href="#">Link to this property</a>

registrant\_org: optional string

<a href="#">Link to this property</a>

registrar: optional string

<a href="#">Link to this property</a>

updated\_date: optional string

formatdate

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.whois%20%3E%20(model)%20whois%20%3E%20(schema)>)

<details>

<summary>

WhoisGetResponse object {dnssec, domain, extension, 84 more }

</summary>

dnssec: boolean

<a href="#">Link to this property</a>

domain: string

<a href="#">Link to this property</a>

extension: string

<a href="#">Link to this property</a>

found: boolean

<a href="#">Link to this property</a>

nameservers: array of string

<a href="#">Link to this property</a>

punycode: string

<a href="#">Link to this property</a>

registrant: string

<a href="#">Link to this property</a>

registrar: string

<a href="#">Link to this property</a>

id: optional string

<a href="#">Link to this property</a>

administrative\_city: optional string

<a href="#">Link to this property</a>

administrative\_country: optional string

<a href="#">Link to this property</a>

administrative\_email: optional string

<a href="#">Link to this property</a>

administrative\_fax: optional string

<a href="#">Link to this property</a>

administrative\_fax\_ext: optional string

<a href="#">Link to this property</a>

administrative\_id: optional string

<a href="#">Link to this property</a>

administrative\_name: optional string

<a href="#">Link to this property</a>

administrative\_org: optional string

<a href="#">Link to this property</a>

administrative\_phone: optional string

<a href="#">Link to this property</a>

administrative\_phone\_ext: optional string

<a href="#">Link to this property</a>

administrative\_postal\_code: optional string

<a href="#">Link to this property</a>

administrative\_province: optional string

<a href="#">Link to this property</a>

administrative\_referral\_url: optional string

<a href="#">Link to this property</a>

administrative\_street: optional string

<a href="#">Link to this property</a>

billing\_city: optional string

<a href="#">Link to this property</a>

billing\_country: optional string

<a href="#">Link to this property</a>

billing\_email: optional string

<a href="#">Link to this property</a>

billing\_fax: optional string

<a href="#">Link to this property</a>

billing\_fax\_ext: optional string

<a href="#">Link to this property</a>

billing\_id: optional string

<a href="#">Link to this property</a>

billing\_name: optional string

<a href="#">Link to this property</a>

billing\_org: optional string

<a href="#">Link to this property</a>

billing\_phone: optional string

<a href="#">Link to this property</a>

billing\_phone\_ext: optional string

<a href="#">Link to this property</a>

billing\_postal\_code: optional string

<a href="#">Link to this property</a>

billing\_province: optional string

<a href="#">Link to this property</a>

billing\_referral\_url: optional string

<a href="#">Link to this property</a>

billing\_street: optional string

<a href="#">Link to this property</a>

created\_date: optional string

formatdate-time

<a href="#">Link to this property</a>

created\_date\_raw: optional string

<a href="#">Link to this property</a>

expiration\_date: optional string

formatdate-time

<a href="#">Link to this property</a>

expiration\_date\_raw: optional string

<a href="#">Link to this property</a>

registrant\_city: optional string

<a href="#">Link to this property</a>

registrant\_country: optional string

<a href="#">Link to this property</a>

registrant\_email: optional string

<a href="#">Link to this property</a>

registrant\_fax: optional string

<a href="#">Link to this property</a>

registrant\_fax\_ext: optional string

<a href="#">Link to this property</a>

registrant\_id: optional string

<a href="#">Link to this property</a>

registrant\_name: optional string

<a href="#">Link to this property</a>

registrant\_org: optional string

<a href="#">Link to this property</a>

registrant\_phone: optional string

<a href="#">Link to this property</a>

registrant\_phone\_ext: optional string

<a href="#">Link to this property</a>

registrant\_postal\_code: optional string

<a href="#">Link to this property</a>

registrant\_province: optional string

<a href="#">Link to this property</a>

registrant\_referral\_url: optional string

<a href="#">Link to this property</a>

registrant\_street: optional string

<a href="#">Link to this property</a>

registrar\_city: optional string

<a href="#">Link to this property</a>

registrar\_country: optional string

<a href="#">Link to this property</a>

registrar\_email: optional string

<a href="#">Link to this property</a>

registrar\_fax: optional string

<a href="#">Link to this property</a>

registrar\_fax\_ext: optional string

<a href="#">Link to this property</a>

registrar\_id: optional string

<a href="#">Link to this property</a>

registrar\_name: optional string

<a href="#">Link to this property</a>

registrar\_org: optional string

<a href="#">Link to this property</a>

registrar\_phone: optional string

<a href="#">Link to this property</a>

registrar\_phone\_ext: optional string

<a href="#">Link to this property</a>

registrar\_postal\_code: optional string

<a href="#">Link to this property</a>

registrar\_province: optional string

<a href="#">Link to this property</a>

registrar\_referral\_url: optional string

<a href="#">Link to this property</a>

registrar\_street: optional string

<a href="#">Link to this property</a>

status: optional array of string

<a href="#">Link to this property</a>

technical\_city: optional string

<a href="#">Link to this property</a>

technical\_country: optional string

<a href="#">Link to this property</a>

technical\_email: optional string

<a href="#">Link to this property</a>

technical\_fax: optional string

<a href="#">Link to this property</a>

technical\_fax\_ext: optional string

<a href="#">Link to this property</a>

technical\_id: optional string

<a href="#">Link to this property</a>

technical\_name: optional string

<a href="#">Link to this property</a>

technical\_org: optional string

<a href="#">Link to this property</a>

technical\_phone: optional string

<a href="#">Link to this property</a>

technical\_phone\_ext: optional string

<a href="#">Link to this property</a>

technical\_postal\_code: optional string

<a href="#">Link to this property</a>

technical\_province: optional string

<a href="#">Link to this property</a>

technical\_referral\_url: optional string

<a href="#">Link to this property</a>

technical\_street: optional string

<a href="#">Link to this property</a>

updated\_date: optional string

formatdate-time

<a href="#">Link to this property</a>

updated\_date\_raw: optional string

<a href="#">Link to this property</a>

whois\_server: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20intel.whois%20%3E%20(model)%20whois_get_response%20%3E%20(schema)>)