---
title: Tenant Custom Nameservers
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Tenant Custom Nameservers

##### [List Tenant Custom Nameservers](https://developers.cloudflare.com/api/resources/tenant_custom_nameservers/methods/get)

GET/tenants/{tenant\_tag}/custom\_ns

##### [Add Tenant Custom Nameserver](https://developers.cloudflare.com/api/resources/tenant_custom_nameservers/methods/create)

POST/tenants/{tenant\_tag}/custom\_ns

##### [Delete Tenant Custom Nameserver](https://developers.cloudflare.com/api/resources/tenant_custom_nameservers/methods/delete)

DELETE/tenants/{tenant\_tag}/custom\_ns/{custom\_ns\_id}

##### ModelsExpand Collapse

<details>

<summary>

TenantCustomNameserverGetResponse object {dns\_records, ns\_name, status, 2 more }

A single tenant custom nameserver.

</summary>

<details>

<summary>

dns\_records: array of object {type, value }

A and AAAA records associated with the nameserver.

</summary>

<details>

<summary>

type: optional "A"or "AAAA"

DNS record type.

</summary>

One of the following:

"A"

<a href="#">Link to this property</a>

"AAAA"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: optional string

DNS record contents (an IPv4 or IPv6 address).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ns\_name: string

The FQDN of the name server.

formathostname

<a href="#">Link to this property</a>

<details>

<summary>

Deprecatedstatus: "moved"or "pending"or "verified"

Verification status of the nameserver.

</summary>

One of the following:

"moved"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"verified"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

zone\_tag: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

ns\_set: optional number

The number of the set that this name server belongs to.

maximum5

minimum1

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20tenant_custom_nameservers%20%3E%20(model)%20tenant_custom_nameserver_get_response%20%3E%20(schema)>)

<details>

<summary>

TenantCustomNameserverCreateResponse object {dns\_records, ns\_name, status, 2 more }

A single tenant custom nameserver.

</summary>

<details>

<summary>

dns\_records: array of object {type, value }

A and AAAA records associated with the nameserver.

</summary>

<details>

<summary>

type: optional "A"or "AAAA"

DNS record type.

</summary>

One of the following:

"A"

<a href="#">Link to this property</a>

"AAAA"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

value: optional string

DNS record contents (an IPv4 or IPv6 address).

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ns\_name: string

The FQDN of the name server.

formathostname

<a href="#">Link to this property</a>

<details>

<summary>

Deprecatedstatus: "moved"or "pending"or "verified"

Verification status of the nameserver.

</summary>

One of the following:

"moved"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"verified"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

zone\_tag: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

ns\_set: optional number

The number of the set that this name server belongs to.

maximum5

minimum1

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20tenant_custom_nameservers%20%3E%20(model)%20tenant_custom_nameserver_create_response%20%3E%20(schema)>)

TenantCustomNameserverDeleteResponse = string

Unused.

[Link to this property](#)%20tenant_custom_nameservers%20%3E%20(model)%20tenant_custom_nameserver_delete_response%20%3E%20(schema)>)