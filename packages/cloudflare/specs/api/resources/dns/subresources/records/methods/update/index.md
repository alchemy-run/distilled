---
title: Overwrite DNS Record
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[DNS](https://developers.cloudflare.com/api/resources/dns)

[Records](https://developers.cloudflare.com/api/resources/dns/subresources/records)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Overwrite DNS Record

PUT/zones/{zone\_id}/dns\_records/{dns\_record\_id}

Overwrite an existing DNS record.

Notes:

- A/AAAA records cannot exist on the same name as CNAME records.
- NS records cannot exist on the same name as any other record type.
- Domain names are always represented in Punycode, even if Unicode characters were used when creating the record.

##### Security

<details>

<summary>API Token</summary>



The preferred authorization scheme for interacting with the Cloudflare API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/create-token/">Create a token</a>.

**Example:**<code>Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY</code>

</details>

<details>

<summary>API Email + API Key</summary>



The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**<code>X-Auth-Email: user@example.com</code>

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**<code>X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194</code>

</details>

##### Accepted Permissions (at least one required)

`DNS Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20dns.records%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

dns\_record\_id: string

Identifier.

maxLength32

[Link to this property](#)%20dns.records%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20dns_record_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

include\_shadow\_metadata: optional boolean

Whether to include shadow metadata in the `meta` field of each record in the response. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)%20dns.records%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20include_shadow_metadata%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

body: <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20a_record%20%3E%20(schema)">ARecord</a> { name, ttl, type, 6 more } or <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20aaaa_record%20%3E%20(schema)">AAAARecord</a> { name, ttl, type, 6 more } or <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20cname_record%20%3E%20(schema)">CNAMERecord</a> { name, ttl, type, 5 more } or 18 more

</summary>

One of the following:

<details>

<summary>

ARecord object {name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

ttl: <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema)">TTL</a>

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

</summary>

One of the following:

number

<a href="#">Link to this property</a>

1

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "A"

Record type.

<a href="#">Link to this property</a>

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

content: optional string

A valid IPv4 address.

formatipv4

<a href="#">Link to this property</a>

private\_routing: optional boolean

Enables private network routing to the origin.

<a href="#">Link to this property</a>

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

<a href="#">Link to this property</a>

<details>

<summary>

settings: optional object {ipv4\_only, ipv6\_only }

Settings for the DNS record.

</summary>

ipv4\_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

ipv6\_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tags: optional array of <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema)">RecordTags</a>

Custom tags for the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AAAARecord object {name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

ttl: <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema)">TTL</a>

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

</summary>

One of the following:

number

<a href="#">Link to this property</a>

1

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "AAAA"

Record type.

<a href="#">Link to this property</a>

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

content: optional string

A valid IPv6 address.

formatipv6

<a href="#">Link to this property</a>

private\_routing: optional boolean

Enables private network routing to the origin.

<a href="#">Link to this property</a>

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

<a href="#">Link to this property</a>

<details>

<summary>

settings: optional object {ipv4\_only, ipv6\_only }

Settings for the DNS record.

</summary>

ipv4\_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

ipv6\_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tags: optional array of <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema)">RecordTags</a>

Custom tags for the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CNAMERecord object {name, ttl, type, 5 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

ttl: <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema)">TTL</a>

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

</summary>

One of the following:

number

<a href="#">Link to this property</a>

1

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "CNAME"

Record type.

<a href="#">Link to this property</a>

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

content: optional string

A valid hostname. Must not match the record’s name.

<a href="#">Link to this property</a>

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

<a href="#">Link to this property</a>

<details>

<summary>

settings: optional object {flatten\_cname, ipv4\_only, ipv6\_only }

Settings for the DNS record.

</summary>

flatten\_cname: optional boolean

If enabled, causes the CNAME record to be resolved externally and the resulting address records (e.g., A and AAAA) to be returned instead of the CNAME record itself. This setting is unavailable for proxied records, since they are always flattened.

<a href="#">Link to this property</a>

ipv4\_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

ipv6\_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tags: optional array of <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema)">RecordTags</a>

Custom tags for the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

MXRecord object {name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

ttl: <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema)">TTL</a>

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

</summary>

One of the following:

number

<a href="#">Link to this property</a>

1

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "MX"

Record type.

<a href="#">Link to this property</a>

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

content: optional string

A valid mail server hostname.

formathostname

<a href="#">Link to this property</a>

priority: optional number

Required for MX and URI records; ignored for other record types (but may still be returned by the API). Records with lower priorities are preferred. This field is to be deprecated in favor of the priority field within the data map.

maximum65535

minimum0

<a href="#">Link to this property</a>

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

<a href="#">Link to this property</a>

<details>

<summary>

settings: optional object {ipv4\_only, ipv6\_only }

Settings for the DNS record.

</summary>

ipv4\_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

ipv6\_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tags: optional array of <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema)">RecordTags</a>

Custom tags for the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

NSRecord object {name, ttl, type, 5 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

ttl: <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema)">TTL</a>

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

</summary>

One of the following:

number

<a href="#">Link to this property</a>

1

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "NS"

Record type.

<a href="#">Link to this property</a>

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

content: optional string

A valid name server host name.

<a href="#">Link to this property</a>

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

<a href="#">Link to this property</a>

<details>

<summary>

settings: optional object {ipv4\_only, ipv6\_only }

Settings for the DNS record.

</summary>

ipv4\_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

ipv6\_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tags: optional array of <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema)">RecordTags</a>

Custom tags for the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DNSRecordsOpenpgpkeyRecord object {name, ttl, type, 5 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

ttl: <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema)">TTL</a>

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

</summary>

One of the following:

number

<a href="#">Link to this property</a>

1

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "OPENPGPKEY"

Record type.

<a href="#">Link to this property</a>

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

content: optional string

A single Base64-encoded OpenPGP Transferable Public Key (RFC 4880 Section 11.1)

<a href="#">Link to this property</a>

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

<a href="#">Link to this property</a>

<details>

<summary>

settings: optional object {ipv4\_only, ipv6\_only }

Settings for the DNS record.

</summary>

ipv4\_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

ipv6\_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tags: optional array of <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema)">RecordTags</a>

Custom tags for the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

PTRRecord object {name, ttl, type, 5 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

ttl: <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema)">TTL</a>

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

</summary>

One of the following:

number

<a href="#">Link to this property</a>

1

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "PTR"

Record type.

<a href="#">Link to this property</a>

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

content: optional string

Domain name pointing to the address.

<a href="#">Link to this property</a>

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

<a href="#">Link to this property</a>

<details>

<summary>

settings: optional object {ipv4\_only, ipv6\_only }

Settings for the DNS record.

</summary>

ipv4\_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

ipv6\_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tags: optional array of <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema)">RecordTags</a>

Custom tags for the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TXTRecord object {name, ttl, type, 5 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

ttl: <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema)">TTL</a>

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

</summary>

One of the following:

number

<a href="#">Link to this property</a>

1

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "TXT"

Record type.

<a href="#">Link to this property</a>

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

content: optional string

Text content for the record. The content must consist of quoted “character strings” (RFC 1035), each with a length of up to 255 bytes. Strings exceeding this allowed maximum length are automatically split.

Learn more at <a href="https://www.cloudflare.com/learning/dns/dns-records/dns-txt-record/">https://www.cloudflare.com/learning/dns/dns-records/dns-txt-record/</a>.

<a href="#">Link to this property</a>

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

<a href="#">Link to this property</a>

<details>

<summary>

settings: optional object {ipv4\_only, ipv6\_only }

Settings for the DNS record.

</summary>

ipv4\_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

ipv6\_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tags: optional array of <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema)">RecordTags</a>

Custom tags for the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CAARecord object {name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

ttl: <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema)">TTL</a>

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

</summary>

One of the following:

number

<a href="#">Link to this property</a>

1

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "CAA"

Record type.

<a href="#">Link to this property</a>

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

content: optional string

Formatted CAA content. See ‘data’ to set CAA properties.

<a href="#">Link to this property</a>

<details>

<summary>

data: optional object {flags, tag, value }

Components of a CAA record.

</summary>

flags: optional number

Flags for the CAA record.

maximum255

minimum0

<a href="#">Link to this property</a>

tag: optional string

Name of the property controlled by this record (e.g.: issue, issuewild, iodef).

<a href="#">Link to this property</a>

value: optional string

Value of the record. This field’s semantics depend on the chosen tag.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

<a href="#">Link to this property</a>

<details>

<summary>

settings: optional object {ipv4\_only, ipv6\_only }

Settings for the DNS record.

</summary>

ipv4\_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

ipv6\_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tags: optional array of <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema)">RecordTags</a>

Custom tags for the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CERTRecord object {name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

ttl: <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema)">TTL</a>

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

</summary>

One of the following:

number

<a href="#">Link to this property</a>

1

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "CERT"

Record type.

<a href="#">Link to this property</a>

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

content: optional string

Formatted CERT content. See ‘data’ to set CERT properties.

<a href="#">Link to this property</a>

<details>

<summary>

data: optional object {algorithm, certificate, key\_tag, type }

Components of a CERT record.

</summary>

algorithm: optional number

Algorithm.

maximum255

minimum0

<a href="#">Link to this property</a>

certificate: optional string

Certificate.

<a href="#">Link to this property</a>

key\_tag: optional number

Key Tag.

maximum65535

minimum0

<a href="#">Link to this property</a>

type: optional number

Type.

maximum65535

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

<a href="#">Link to this property</a>

<details>

<summary>

settings: optional object {ipv4\_only, ipv6\_only }

Settings for the DNS record.

</summary>

ipv4\_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

ipv6\_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tags: optional array of <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema)">RecordTags</a>

Custom tags for the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DNSKEYRecord object {name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

ttl: <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema)">TTL</a>

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

</summary>

One of the following:

number

<a href="#">Link to this property</a>

1

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "DNSKEY"

Record type.

<a href="#">Link to this property</a>

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

content: optional string

Formatted DNSKEY content. See ‘data’ to set DNSKEY properties.

<a href="#">Link to this property</a>

<details>

<summary>

data: optional object {algorithm, flags, protocol, public\_key }

Components of a DNSKEY record.

</summary>

algorithm: optional number

Algorithm.

maximum255

minimum0

<a href="#">Link to this property</a>

flags: optional number

Flags.

maximum65535

minimum0

<a href="#">Link to this property</a>

protocol: optional number

Protocol.

maximum255

minimum0

<a href="#">Link to this property</a>

public\_key: optional string

Public Key.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

<a href="#">Link to this property</a>

<details>

<summary>

settings: optional object {ipv4\_only, ipv6\_only }

Settings for the DNS record.

</summary>

ipv4\_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

ipv6\_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tags: optional array of <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema)">RecordTags</a>

Custom tags for the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DSRecord object {name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

ttl: <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema)">TTL</a>

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

</summary>

One of the following:

number

<a href="#">Link to this property</a>

1

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "DS"

Record type.

<a href="#">Link to this property</a>

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

content: optional string

Formatted DS content. See ‘data’ to set DS properties.

<a href="#">Link to this property</a>

<details>

<summary>

data: optional object {algorithm, digest, digest\_type, key\_tag }

Components of a DS record.

</summary>

algorithm: optional number

Algorithm.

maximum255

minimum0

<a href="#">Link to this property</a>

digest: optional string

Digest.

<a href="#">Link to this property</a>

digest\_type: optional number

Digest Type.

maximum255

minimum0

<a href="#">Link to this property</a>

key\_tag: optional number

Key Tag.

maximum65535

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

<a href="#">Link to this property</a>

<details>

<summary>

settings: optional object {ipv4\_only, ipv6\_only }

Settings for the DNS record.

</summary>

ipv4\_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

ipv6\_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tags: optional array of <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema)">RecordTags</a>

Custom tags for the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

HTTPSRecord object {name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

ttl: <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema)">TTL</a>

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

</summary>

One of the following:

number

<a href="#">Link to this property</a>

1

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "HTTPS"

Record type.

<a href="#">Link to this property</a>

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

content: optional string

Formatted HTTPS content. See ‘data’ to set HTTPS properties.

<a href="#">Link to this property</a>

<details>

<summary>

data: optional object {priority, target, value }

Components of a HTTPS record.

</summary>

priority: optional number

Priority.

maximum65535

minimum0

<a href="#">Link to this property</a>

target: optional string

Target.

<a href="#">Link to this property</a>

value: optional string

Value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

<a href="#">Link to this property</a>

<details>

<summary>

settings: optional object {ipv4\_only, ipv6\_only }

Settings for the DNS record.

</summary>

ipv4\_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

ipv6\_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tags: optional array of <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema)">RecordTags</a>

Custom tags for the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

LOCRecord object {name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

ttl: <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema)">TTL</a>

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

</summary>

One of the following:

number

<a href="#">Link to this property</a>

1

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "LOC"

Record type.

<a href="#">Link to this property</a>

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

content: optional string

Formatted LOC content. See ‘data’ to set LOC properties.

<a href="#">Link to this property</a>

<details>

<summary>

data: optional object {altitude, lat\_degrees, lat\_direction, 9 more }

Components of a LOC record.

</summary>

altitude: optional number

Altitude of location in meters.

maximum42849672.95

minimum-100000

<a href="#">Link to this property</a>

lat\_degrees: optional number

Degrees of latitude.

maximum90

minimum0

<a href="#">Link to this property</a>

<details>

<summary>

lat\_direction: optional "N"or "S"

Latitude direction.

</summary>

One of the following:

"N"

<a href="#">Link to this property</a>

"S"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

lat\_minutes: optional number

Minutes of latitude.

maximum59

minimum0

<a href="#">Link to this property</a>

lat\_seconds: optional number

Seconds of latitude.

maximum59.999

minimum0

<a href="#">Link to this property</a>

long\_degrees: optional number

Degrees of longitude.

maximum180

minimum0

<a href="#">Link to this property</a>

<details>

<summary>

long\_direction: optional "E"or "W"

Longitude direction.

</summary>

One of the following:

"E"

<a href="#">Link to this property</a>

"W"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

long\_minutes: optional number

Minutes of longitude.

maximum59

minimum0

<a href="#">Link to this property</a>

long\_seconds: optional number

Seconds of longitude.

maximum59.999

minimum0

<a href="#">Link to this property</a>

precision\_horz: optional number

Horizontal precision of location.

maximum90000000

minimum0

<a href="#">Link to this property</a>

precision\_vert: optional number

Vertical precision of location.

maximum90000000

minimum0

<a href="#">Link to this property</a>

size: optional number

Size of location in meters.

maximum90000000

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

<a href="#">Link to this property</a>

<details>

<summary>

settings: optional object {ipv4\_only, ipv6\_only }

Settings for the DNS record.

</summary>

ipv4\_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

ipv6\_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tags: optional array of <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema)">RecordTags</a>

Custom tags for the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

NAPTRRecord object {name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

ttl: <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema)">TTL</a>

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

</summary>

One of the following:

number

<a href="#">Link to this property</a>

1

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "NAPTR"

Record type.

<a href="#">Link to this property</a>

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

content: optional string

Formatted NAPTR content. See ‘data’ to set NAPTR properties.

<a href="#">Link to this property</a>

<details>

<summary>

data: optional object {flags, order, preference, 3 more }

Components of a NAPTR record.

</summary>

flags: optional string

Flags.

<a href="#">Link to this property</a>

order: optional number

Order.

maximum65535

minimum0

<a href="#">Link to this property</a>

preference: optional number

Preference.

maximum65535

minimum0

<a href="#">Link to this property</a>

regex: optional string

Regex.

<a href="#">Link to this property</a>

replacement: optional string

Replacement.

<a href="#">Link to this property</a>

service: optional string

Service.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

<a href="#">Link to this property</a>

<details>

<summary>

settings: optional object {ipv4\_only, ipv6\_only }

Settings for the DNS record.

</summary>

ipv4\_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

ipv6\_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tags: optional array of <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema)">RecordTags</a>

Custom tags for the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SMIMEARecord object {name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

ttl: <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema)">TTL</a>

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

</summary>

One of the following:

number

<a href="#">Link to this property</a>

1

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "SMIMEA"

Record type.

<a href="#">Link to this property</a>

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

content: optional string

Formatted SMIMEA content. See ‘data’ to set SMIMEA properties.

<a href="#">Link to this property</a>

<details>

<summary>

data: optional object {certificate, matching\_type, selector, usage }

Components of a SMIMEA record.

</summary>

certificate: optional string

Certificate.

<a href="#">Link to this property</a>

matching\_type: optional number

Matching Type.

maximum255

minimum0

<a href="#">Link to this property</a>

selector: optional number

Selector.

maximum255

minimum0

<a href="#">Link to this property</a>

usage: optional number

Usage.

maximum255

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

<a href="#">Link to this property</a>

<details>

<summary>

settings: optional object {ipv4\_only, ipv6\_only }

Settings for the DNS record.

</summary>

ipv4\_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

ipv6\_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tags: optional array of <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema)">RecordTags</a>

Custom tags for the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SRVRecord object {name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

ttl: <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema)">TTL</a>

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

</summary>

One of the following:

number

<a href="#">Link to this property</a>

1

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "SRV"

Record type.

<a href="#">Link to this property</a>

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

content: optional string

Priority, weight, port, and SRV target. See ‘data’ for setting the individual component values.

<a href="#">Link to this property</a>

<details>

<summary>

data: optional object {port, priority, target, weight }

Components of a SRV record.

</summary>

port: optional number

The port of the service.

maximum65535

minimum0

<a href="#">Link to this property</a>

priority: optional number

Required for MX and URI records; ignored for other record types (but may still be returned by the API). Records with lower priorities are preferred. This field is to be deprecated in favor of the priority field within the data map.

maximum65535

minimum0

<a href="#">Link to this property</a>

target: optional string

A valid hostname.

formathostname

<a href="#">Link to this property</a>

weight: optional number

The record weight.

maximum65535

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

<a href="#">Link to this property</a>

<details>

<summary>

settings: optional object {ipv4\_only, ipv6\_only }

Settings for the DNS record.

</summary>

ipv4\_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

ipv6\_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tags: optional array of <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema)">RecordTags</a>

Custom tags for the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SSHFPRecord object {name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

ttl: <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema)">TTL</a>

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

</summary>

One of the following:

number

<a href="#">Link to this property</a>

1

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "SSHFP"

Record type.

<a href="#">Link to this property</a>

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

content: optional string

Formatted SSHFP content. See ‘data’ to set SSHFP properties.

<a href="#">Link to this property</a>

<details>

<summary>

data: optional object {algorithm, fingerprint, type }

Components of a SSHFP record.

</summary>

algorithm: optional number

Algorithm.

maximum255

minimum0

<a href="#">Link to this property</a>

fingerprint: optional string

Fingerprint.

<a href="#">Link to this property</a>

type: optional number

Type.

maximum255

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

<a href="#">Link to this property</a>

<details>

<summary>

settings: optional object {ipv4\_only, ipv6\_only }

Settings for the DNS record.

</summary>

ipv4\_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

ipv6\_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tags: optional array of <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema)">RecordTags</a>

Custom tags for the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SVCBRecord object {name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

ttl: <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema)">TTL</a>

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

</summary>

One of the following:

number

<a href="#">Link to this property</a>

1

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "SVCB"

Record type.

<a href="#">Link to this property</a>

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

content: optional string

Formatted SVCB content. See ‘data’ to set SVCB properties.

<a href="#">Link to this property</a>

<details>

<summary>

data: optional object {priority, target, value }

Components of a SVCB record.

</summary>

priority: optional number

Priority.

maximum65535

minimum0

<a href="#">Link to this property</a>

target: optional string

Target.

<a href="#">Link to this property</a>

value: optional string

Value.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

<a href="#">Link to this property</a>

<details>

<summary>

settings: optional object {ipv4\_only, ipv6\_only }

Settings for the DNS record.

</summary>

ipv4\_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

ipv6\_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tags: optional array of <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema)">RecordTags</a>

Custom tags for the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TLSARecord object {name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

ttl: <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema)">TTL</a>

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

</summary>

One of the following:

number

<a href="#">Link to this property</a>

1

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "TLSA"

Record type.

<a href="#">Link to this property</a>

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

content: optional string

Formatted TLSA content. See ‘data’ to set TLSA properties.

<a href="#">Link to this property</a>

<details>

<summary>

data: optional object {certificate, matching\_type, selector, usage }

Components of a TLSA record.

</summary>

certificate: optional string

Certificate.

<a href="#">Link to this property</a>

matching\_type: optional number

Matching Type.

maximum255

minimum0

<a href="#">Link to this property</a>

selector: optional number

Selector.

maximum255

minimum0

<a href="#">Link to this property</a>

usage: optional number

Usage.

maximum255

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

<a href="#">Link to this property</a>

<details>

<summary>

settings: optional object {ipv4\_only, ipv6\_only }

Settings for the DNS record.

</summary>

ipv4\_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

ipv6\_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tags: optional array of <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema)">RecordTags</a>

Custom tags for the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

URIRecord object {name, ttl, type, 7 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

<a href="#">Link to this property</a>

<details>

<summary>

ttl: <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema)">TTL</a>

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

</summary>

One of the following:

number

<a href="#">Link to this property</a>

1

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "URI"

Record type.

<a href="#">Link to this property</a>

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

content: optional string

Formatted URI content. See ‘data’ to set URI properties.

<a href="#">Link to this property</a>

<details>

<summary>

data: optional object {target, weight }

Components of a URI record.

</summary>

target: optional string

The record content.

<a href="#">Link to this property</a>

weight: optional number

The record weight.

maximum65535

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

priority: optional number

Required for MX and URI records; ignored for other record types (but may still be returned by the API). Records with lower priorities are preferred. This field is to be deprecated in favor of the priority field within the data map.

maximum65535

minimum0

<a href="#">Link to this property</a>

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

<a href="#">Link to this property</a>

<details>

<summary>

settings: optional object {ipv4\_only, ipv6\_only }

Settings for the DNS record.

</summary>

ipv4\_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

ipv6\_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tags: optional array of <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema)">RecordTags</a>

Custom tags for the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.records%20%3E%20(method)%20update%20%3E%20(params)%200%20%3E%20(param)%20body%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.records%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.records%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20dns.records%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_response%20%3E%20(schema)">RecordResponse</a>

</summary>

One of the following:

<details>

<summary>

ARecord = <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20a_record%20%3E%20(schema)">ARecord</a> { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

created\_on: string

When the record was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

meta: object {dead\_glue, is\_glue, shadowed\_by, shadowed\_records\_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead\_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only <code>is_glue</code>. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records">Unreachable glue records</a>.

<a href="#">Link to this property</a>

is\_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records">Glue records</a>.

<a href="#">Link to this property</a>

shadowed\_by: optional array of string

IDs of the NS records that shadow this record. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

<a href="#">Link to this property</a>

shadowed\_records\_count: optional number

Number of records shadowed by this NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

maximum10000

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

When the record was last modified.

formatdate-time

<a href="#">Link to this property</a>

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

<a href="#">Link to this property</a>

comment\_modified\_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

<a href="#">Link to this property</a>

tags\_modified\_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

AAAARecord = <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20aaaa_record%20%3E%20(schema)">AAAARecord</a> { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

created\_on: string

When the record was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

meta: object {dead\_glue, is\_glue, shadowed\_by, shadowed\_records\_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead\_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only <code>is_glue</code>. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records">Unreachable glue records</a>.

<a href="#">Link to this property</a>

is\_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records">Glue records</a>.

<a href="#">Link to this property</a>

shadowed\_by: optional array of string

IDs of the NS records that shadow this record. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

<a href="#">Link to this property</a>

shadowed\_records\_count: optional number

Number of records shadowed by this NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

maximum10000

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

When the record was last modified.

formatdate-time

<a href="#">Link to this property</a>

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

<a href="#">Link to this property</a>

comment\_modified\_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

<a href="#">Link to this property</a>

tags\_modified\_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CNAMERecord = <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20cname_record%20%3E%20(schema)">CNAMERecord</a> { name, ttl, type, 5 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

created\_on: string

When the record was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

meta: object {dead\_glue, is\_glue, shadowed\_by, shadowed\_records\_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead\_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only <code>is_glue</code>. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records">Unreachable glue records</a>.

<a href="#">Link to this property</a>

is\_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records">Glue records</a>.

<a href="#">Link to this property</a>

shadowed\_by: optional array of string

IDs of the NS records that shadow this record. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

<a href="#">Link to this property</a>

shadowed\_records\_count: optional number

Number of records shadowed by this NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

maximum10000

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

When the record was last modified.

formatdate-time

<a href="#">Link to this property</a>

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

<a href="#">Link to this property</a>

comment\_modified\_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

<a href="#">Link to this property</a>

tags\_modified\_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

MXRecord = <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20mx_record%20%3E%20(schema)">MXRecord</a> { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

created\_on: string

When the record was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

meta: object {dead\_glue, is\_glue, shadowed\_by, shadowed\_records\_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead\_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only <code>is_glue</code>. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records">Unreachable glue records</a>.

<a href="#">Link to this property</a>

is\_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records">Glue records</a>.

<a href="#">Link to this property</a>

shadowed\_by: optional array of string

IDs of the NS records that shadow this record. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

<a href="#">Link to this property</a>

shadowed\_records\_count: optional number

Number of records shadowed by this NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

maximum10000

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

When the record was last modified.

formatdate-time

<a href="#">Link to this property</a>

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

<a href="#">Link to this property</a>

comment\_modified\_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

<a href="#">Link to this property</a>

tags\_modified\_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

NSRecord = <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ns_record%20%3E%20(schema)">NSRecord</a> { name, ttl, type, 5 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

created\_on: string

When the record was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

meta: object {dead\_glue, is\_glue, shadowed\_by, shadowed\_records\_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead\_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only <code>is_glue</code>. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records">Unreachable glue records</a>.

<a href="#">Link to this property</a>

is\_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records">Glue records</a>.

<a href="#">Link to this property</a>

shadowed\_by: optional array of string

IDs of the NS records that shadow this record. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

<a href="#">Link to this property</a>

shadowed\_records\_count: optional number

Number of records shadowed by this NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

maximum10000

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

When the record was last modified.

formatdate-time

<a href="#">Link to this property</a>

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

<a href="#">Link to this property</a>

comment\_modified\_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

<a href="#">Link to this property</a>

tags\_modified\_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

OpenpgpkeyRecord object {id, comment, content, 12 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

comment: string

Comments or notes about the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

content: string

A single Base64-encoded OpenPGP Transferable Public Key (RFC 4880 Section 11.1)

<a href="#">Link to this property</a>

created\_on: string

When the record was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

meta: object {dead\_glue, is\_glue, shadowed\_by, shadowed\_records\_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead\_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only <code>is_glue</code>. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records">Unreachable glue records</a>.

<a href="#">Link to this property</a>

is\_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records">Glue records</a>.

<a href="#">Link to this property</a>

shadowed\_by: optional array of string

IDs of the NS records that shadow this record. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

<a href="#">Link to this property</a>

shadowed\_records\_count: optional number

Number of records shadowed by this NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

maximum10000

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

When the record was last modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

<a href="#">Link to this property</a>

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

<a href="#">Link to this property</a>

proxied: boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

<a href="#">Link to this property</a>

<details>

<summary>

settings: object {ipv4\_only, ipv6\_only }

Settings for the DNS record.

</summary>

ipv4\_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

ipv6\_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tags: array of <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema)">RecordTags</a>

Custom tags for the DNS record. This field has no effect on DNS responses.

<a href="#">Link to this property</a>

<details>

<summary>

ttl: <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema)">TTL</a>

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

</summary>

One of the following:

number

<a href="#">Link to this property</a>

1

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: "OPENPGPKEY"

Record type.

<a href="#">Link to this property</a>

comment\_modified\_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

<a href="#">Link to this property</a>

tags\_modified\_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

PTRRecord = <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ptr_record%20%3E%20(schema)">PTRRecord</a> { name, ttl, type, 5 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

created\_on: string

When the record was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

meta: object {dead\_glue, is\_glue, shadowed\_by, shadowed\_records\_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead\_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only <code>is_glue</code>. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records">Unreachable glue records</a>.

<a href="#">Link to this property</a>

is\_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records">Glue records</a>.

<a href="#">Link to this property</a>

shadowed\_by: optional array of string

IDs of the NS records that shadow this record. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

<a href="#">Link to this property</a>

shadowed\_records\_count: optional number

Number of records shadowed by this NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

maximum10000

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

When the record was last modified.

formatdate-time

<a href="#">Link to this property</a>

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

<a href="#">Link to this property</a>

comment\_modified\_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

<a href="#">Link to this property</a>

tags\_modified\_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TXTRecord = <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20txt_record%20%3E%20(schema)">TXTRecord</a> { name, ttl, type, 5 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

created\_on: string

When the record was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

meta: object {dead\_glue, is\_glue, shadowed\_by, shadowed\_records\_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead\_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only <code>is_glue</code>. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records">Unreachable glue records</a>.

<a href="#">Link to this property</a>

is\_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records">Glue records</a>.

<a href="#">Link to this property</a>

shadowed\_by: optional array of string

IDs of the NS records that shadow this record. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

<a href="#">Link to this property</a>

shadowed\_records\_count: optional number

Number of records shadowed by this NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

maximum10000

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

When the record was last modified.

formatdate-time

<a href="#">Link to this property</a>

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

<a href="#">Link to this property</a>

comment\_modified\_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

<a href="#">Link to this property</a>

tags\_modified\_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CAARecord = <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20caa_record%20%3E%20(schema)">CAARecord</a> { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

created\_on: string

When the record was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

meta: object {dead\_glue, is\_glue, shadowed\_by, shadowed\_records\_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead\_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only <code>is_glue</code>. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records">Unreachable glue records</a>.

<a href="#">Link to this property</a>

is\_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records">Glue records</a>.

<a href="#">Link to this property</a>

shadowed\_by: optional array of string

IDs of the NS records that shadow this record. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

<a href="#">Link to this property</a>

shadowed\_records\_count: optional number

Number of records shadowed by this NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

maximum10000

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

When the record was last modified.

formatdate-time

<a href="#">Link to this property</a>

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

<a href="#">Link to this property</a>

comment\_modified\_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

<a href="#">Link to this property</a>

tags\_modified\_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

CERTRecord = <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20cert_record%20%3E%20(schema)">CERTRecord</a> { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

created\_on: string

When the record was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

meta: object {dead\_glue, is\_glue, shadowed\_by, shadowed\_records\_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead\_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only <code>is_glue</code>. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records">Unreachable glue records</a>.

<a href="#">Link to this property</a>

is\_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records">Glue records</a>.

<a href="#">Link to this property</a>

shadowed\_by: optional array of string

IDs of the NS records that shadow this record. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

<a href="#">Link to this property</a>

shadowed\_records\_count: optional number

Number of records shadowed by this NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

maximum10000

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

When the record was last modified.

formatdate-time

<a href="#">Link to this property</a>

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

<a href="#">Link to this property</a>

comment\_modified\_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

<a href="#">Link to this property</a>

tags\_modified\_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DNSKEYRecord = <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20dnskey_record%20%3E%20(schema)">DNSKEYRecord</a> { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

created\_on: string

When the record was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

meta: object {dead\_glue, is\_glue, shadowed\_by, shadowed\_records\_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead\_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only <code>is_glue</code>. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records">Unreachable glue records</a>.

<a href="#">Link to this property</a>

is\_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records">Glue records</a>.

<a href="#">Link to this property</a>

shadowed\_by: optional array of string

IDs of the NS records that shadow this record. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

<a href="#">Link to this property</a>

shadowed\_records\_count: optional number

Number of records shadowed by this NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

maximum10000

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

When the record was last modified.

formatdate-time

<a href="#">Link to this property</a>

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

<a href="#">Link to this property</a>

comment\_modified\_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

<a href="#">Link to this property</a>

tags\_modified\_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

DSRecord = <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ds_record%20%3E%20(schema)">DSRecord</a> { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

created\_on: string

When the record was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

meta: object {dead\_glue, is\_glue, shadowed\_by, shadowed\_records\_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead\_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only <code>is_glue</code>. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records">Unreachable glue records</a>.

<a href="#">Link to this property</a>

is\_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records">Glue records</a>.

<a href="#">Link to this property</a>

shadowed\_by: optional array of string

IDs of the NS records that shadow this record. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

<a href="#">Link to this property</a>

shadowed\_records\_count: optional number

Number of records shadowed by this NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

maximum10000

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

When the record was last modified.

formatdate-time

<a href="#">Link to this property</a>

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

<a href="#">Link to this property</a>

comment\_modified\_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

<a href="#">Link to this property</a>

tags\_modified\_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

HTTPSRecord = <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20https_record%20%3E%20(schema)">HTTPSRecord</a> { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

created\_on: string

When the record was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

meta: object {dead\_glue, is\_glue, shadowed\_by, shadowed\_records\_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead\_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only <code>is_glue</code>. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records">Unreachable glue records</a>.

<a href="#">Link to this property</a>

is\_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records">Glue records</a>.

<a href="#">Link to this property</a>

shadowed\_by: optional array of string

IDs of the NS records that shadow this record. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

<a href="#">Link to this property</a>

shadowed\_records\_count: optional number

Number of records shadowed by this NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

maximum10000

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

When the record was last modified.

formatdate-time

<a href="#">Link to this property</a>

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

<a href="#">Link to this property</a>

comment\_modified\_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

<a href="#">Link to this property</a>

tags\_modified\_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

LOCRecord = <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20loc_record%20%3E%20(schema)">LOCRecord</a> { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

created\_on: string

When the record was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

meta: object {dead\_glue, is\_glue, shadowed\_by, shadowed\_records\_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead\_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only <code>is_glue</code>. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records">Unreachable glue records</a>.

<a href="#">Link to this property</a>

is\_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records">Glue records</a>.

<a href="#">Link to this property</a>

shadowed\_by: optional array of string

IDs of the NS records that shadow this record. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

<a href="#">Link to this property</a>

shadowed\_records\_count: optional number

Number of records shadowed by this NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

maximum10000

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

When the record was last modified.

formatdate-time

<a href="#">Link to this property</a>

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

<a href="#">Link to this property</a>

comment\_modified\_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

<a href="#">Link to this property</a>

tags\_modified\_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

NAPTRRecord = <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20naptr_record%20%3E%20(schema)">NAPTRRecord</a> { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

created\_on: string

When the record was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

meta: object {dead\_glue, is\_glue, shadowed\_by, shadowed\_records\_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead\_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only <code>is_glue</code>. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records">Unreachable glue records</a>.

<a href="#">Link to this property</a>

is\_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records">Glue records</a>.

<a href="#">Link to this property</a>

shadowed\_by: optional array of string

IDs of the NS records that shadow this record. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

<a href="#">Link to this property</a>

shadowed\_records\_count: optional number

Number of records shadowed by this NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

maximum10000

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

When the record was last modified.

formatdate-time

<a href="#">Link to this property</a>

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

<a href="#">Link to this property</a>

comment\_modified\_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

<a href="#">Link to this property</a>

tags\_modified\_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SMIMEARecord = <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20smimea_record%20%3E%20(schema)">SMIMEARecord</a> { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

created\_on: string

When the record was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

meta: object {dead\_glue, is\_glue, shadowed\_by, shadowed\_records\_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead\_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only <code>is_glue</code>. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records">Unreachable glue records</a>.

<a href="#">Link to this property</a>

is\_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records">Glue records</a>.

<a href="#">Link to this property</a>

shadowed\_by: optional array of string

IDs of the NS records that shadow this record. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

<a href="#">Link to this property</a>

shadowed\_records\_count: optional number

Number of records shadowed by this NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

maximum10000

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

When the record was last modified.

formatdate-time

<a href="#">Link to this property</a>

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

<a href="#">Link to this property</a>

comment\_modified\_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

<a href="#">Link to this property</a>

tags\_modified\_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SRVRecord = <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20srv_record%20%3E%20(schema)">SRVRecord</a> { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

created\_on: string

When the record was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

meta: object {dead\_glue, is\_glue, shadowed\_by, shadowed\_records\_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead\_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only <code>is_glue</code>. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records">Unreachable glue records</a>.

<a href="#">Link to this property</a>

is\_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records">Glue records</a>.

<a href="#">Link to this property</a>

shadowed\_by: optional array of string

IDs of the NS records that shadow this record. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

<a href="#">Link to this property</a>

shadowed\_records\_count: optional number

Number of records shadowed by this NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

maximum10000

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

When the record was last modified.

formatdate-time

<a href="#">Link to this property</a>

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

<a href="#">Link to this property</a>

comment\_modified\_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

<a href="#">Link to this property</a>

tags\_modified\_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SSHFPRecord = <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20sshfp_record%20%3E%20(schema)">SSHFPRecord</a> { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

created\_on: string

When the record was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

meta: object {dead\_glue, is\_glue, shadowed\_by, shadowed\_records\_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead\_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only <code>is_glue</code>. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records">Unreachable glue records</a>.

<a href="#">Link to this property</a>

is\_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records">Glue records</a>.

<a href="#">Link to this property</a>

shadowed\_by: optional array of string

IDs of the NS records that shadow this record. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

<a href="#">Link to this property</a>

shadowed\_records\_count: optional number

Number of records shadowed by this NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

maximum10000

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

When the record was last modified.

formatdate-time

<a href="#">Link to this property</a>

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

<a href="#">Link to this property</a>

comment\_modified\_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

<a href="#">Link to this property</a>

tags\_modified\_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

SVCBRecord = <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20svcb_record%20%3E%20(schema)">SVCBRecord</a> { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

created\_on: string

When the record was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

meta: object {dead\_glue, is\_glue, shadowed\_by, shadowed\_records\_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead\_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only <code>is_glue</code>. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records">Unreachable glue records</a>.

<a href="#">Link to this property</a>

is\_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records">Glue records</a>.

<a href="#">Link to this property</a>

shadowed\_by: optional array of string

IDs of the NS records that shadow this record. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

<a href="#">Link to this property</a>

shadowed\_records\_count: optional number

Number of records shadowed by this NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

maximum10000

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

When the record was last modified.

formatdate-time

<a href="#">Link to this property</a>

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

<a href="#">Link to this property</a>

comment\_modified\_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

<a href="#">Link to this property</a>

tags\_modified\_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

TLSARecord = <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20tlsa_record%20%3E%20(schema)">TLSARecord</a> { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

created\_on: string

When the record was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

meta: object {dead\_glue, is\_glue, shadowed\_by, shadowed\_records\_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead\_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only <code>is_glue</code>. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records">Unreachable glue records</a>.

<a href="#">Link to this property</a>

is\_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records">Glue records</a>.

<a href="#">Link to this property</a>

shadowed\_by: optional array of string

IDs of the NS records that shadow this record. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

<a href="#">Link to this property</a>

shadowed\_records\_count: optional number

Number of records shadowed by this NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

maximum10000

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

When the record was last modified.

formatdate-time

<a href="#">Link to this property</a>

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

<a href="#">Link to this property</a>

comment\_modified\_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

<a href="#">Link to this property</a>

tags\_modified\_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

URIRecord = <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20uri_record%20%3E%20(schema)">URIRecord</a> { name, ttl, type, 7 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

created\_on: string

When the record was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

meta: object {dead\_glue, is\_glue, shadowed\_by, shadowed\_records\_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead\_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only <code>is_glue</code>. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records">Unreachable glue records</a>.

<a href="#">Link to this property</a>

is\_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records">Glue records</a>.

<a href="#">Link to this property</a>

shadowed\_by: optional array of string

IDs of the NS records that shadow this record. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

<a href="#">Link to this property</a>

shadowed\_records\_count: optional number

Number of records shadowed by this NS delegation. See <a href="https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records">Shadowed records</a>.

maximum10000

minimum0

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

modified\_on: string

When the record was last modified.

formatdate-time

<a href="#">Link to this property</a>

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

<a href="#">Link to this property</a>

comment\_modified\_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

<a href="#">Link to this property</a>

tags\_modified\_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.records%20%3E%20(method)%20update%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Overwrite DNS Record

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$DNS_RECORD_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "example.com",
          "ttl": 3600,
          "type": "A",
          "comment": "Domain verification record",
          "content": "198.51.100.4",
          "private_routing": true,
          "proxied": true
        }'
```

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "name": "example.com",
    "ttl": 3600,
    "type": "A",
    "comment": "Domain verification record",
    "content": "198.51.100.4",
    "private_routing": true,
    "proxied": true,
    "settings": {
      "ipv4_only": true,
      "ipv6_only": true
    },
    "tags": [
      "owner:dns-team"
    ],
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "meta": {
      "dead_glue": true,
      "is_glue": true,
      "shadowed_by": [
        "372e67954025e0ba6aaa6d586b9e0b59"
      ],
      "shadowed_records_count": 42
    },
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "proxiable": true,
    "comment_modified_on": "2024-01-01T05:20:00.12345Z",
    "tags_modified_on": "2025-01-01T05:20:00.12345Z"
  }
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "name": "example.com",
    "ttl": 3600,
    "type": "A",
    "comment": "Domain verification record",
    "content": "198.51.100.4",
    "private_routing": true,
    "proxied": true,
    "settings": {
      "ipv4_only": true,
      "ipv6_only": true
    },
    "tags": [
      "owner:dns-team"
    ],
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "meta": {
      "dead_glue": true,
      "is_glue": true,
      "shadowed_by": [
        "372e67954025e0ba6aaa6d586b9e0b59"
      ],
      "shadowed_records_count": 42
    },
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "proxiable": true,
    "comment_modified_on": "2024-01-01T05:20:00.12345Z",
    "tags_modified_on": "2025-01-01T05:20:00.12345Z"
  }
}
```