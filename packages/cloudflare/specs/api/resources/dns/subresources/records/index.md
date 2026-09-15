##### [List DNS Records](/api/resources/dns/subresources/records/methods/list)

GET/zones/{zone_id}/dns_records

##### [DNS Record Details](/api/resources/dns/subresources/records/methods/get)

GET/zones/{zone_id}/dns_records/{dns_record_id}

##### [Create DNS Record](/api/resources/dns/subresources/records/methods/create)

POST/zones/{zone_id}/dns_records

##### [Overwrite DNS Record](/api/resources/dns/subresources/records/methods/update)

PUT/zones/{zone_id}/dns_records/{dns_record_id}

##### [Update DNS Record](/api/resources/dns/subresources/records/methods/edit)

PATCH/zones/{zone_id}/dns_records/{dns_record_id}

##### [Delete DNS Record](/api/resources/dns/subresources/records/methods/delete)

DELETE/zones/{zone_id}/dns_records/{dns_record_id}

##### [Export DNS Records](/api/resources/dns/subresources/records/methods/export)

GET/zones/{zone_id}/dns_records/export

##### [Import DNS Records](/api/resources/dns/subresources/records/methods/import)

POST/zones/{zone_id}/dns_records/import

##### [Scan DNS Records](/api/resources/dns/subresources/records/methods/scan)

POST/zones/{zone_id}/dns_records/scan

##### [Trigger DNS Record Scan](/api/resources/dns/subresources/records/methods/scan_trigger)

POST/zones/{zone_id}/dns_records/scan/trigger

##### [Review Scanned DNS Records](/api/resources/dns/subresources/records/methods/scan_review)

POST/zones/{zone_id}/dns_records/scan/review

##### [List Scanned DNS Records](/api/resources/dns/subresources/records/methods/scan_list)

GET/zones/{zone_id}/dns_records/scan/review

##### [Batch DNS Records](/api/resources/dns/subresources/records/methods/batch)

POST/zones/{zone_id}/dns_records/batch

##### Models

<details>

<summary>

ARecord object { name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "A"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

A valid IPv4 address.

formatipv4

[Link to this property](#)

private_routing: optional boolean

Enables private network routing to the origin.

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AAAARecord object { name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "AAAA"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

A valid IPv6 address.

formatipv6

[Link to this property](#)

private_routing: optional boolean

Enables private network routing to the origin.

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

BatchPatch = [ARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20a_record%20%3E%20(schema)) { name, ttl, type, 6 more } or [AAAARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20aaaa_record%20%3E%20(schema)) { name, ttl, type, 6 more } or [CNAMERecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20cname_record%20%3E%20(schema)) { name, ttl, type, 5 more } or 18 more

</summary>

One of the following:

<details>

<summary>

ARecord = [ARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20a_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AAAARecord = [AAAARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20aaaa_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CNAMERecord = [CNAMERecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20cname_record%20%3E%20(schema)) { name, ttl, type, 5 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

MXRecord = [MXRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20mx_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

NSRecord = [NSRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ns_record%20%3E%20(schema)) { name, ttl, type, 5 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OpenpgpkeyRecord object { id, name, ttl, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "OPENPGPKEY"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

A single Base64-encoded OpenPGP Transferable Public Key (RFC 4880 Section 11.1)

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PTRRecord = [PTRRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ptr_record%20%3E%20(schema)) { name, ttl, type, 5 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TXTRecord = [TXTRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20txt_record%20%3E%20(schema)) { name, ttl, type, 5 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CAARecord = [CAARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20caa_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CERTRecord = [CERTRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20cert_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DNSKEYRecord = [DNSKEYRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20dnskey_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DSRecord = [DSRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ds_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

HTTPSRecord = [HTTPSRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20https_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LOCRecord = [LOCRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20loc_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

NAPTRRecord = [NAPTRRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20naptr_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SMIMEARecord = [SMIMEARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20smimea_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SRVRecord = [SRVRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20srv_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SSHFPRecord = [SSHFPRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20sshfp_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SVCBRecord = [SVCBRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20svcb_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TLSARecord = [TLSARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20tlsa_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

URIRecord = [URIRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20uri_record%20%3E%20(schema)) { name, ttl, type, 7 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

BatchPut = [ARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20a_record%20%3E%20(schema)) { name, ttl, type, 6 more } or [AAAARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20aaaa_record%20%3E%20(schema)) { name, ttl, type, 6 more } or [CNAMERecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20cname_record%20%3E%20(schema)) { name, ttl, type, 5 more } or 18 more

</summary>

One of the following:

<details>

<summary>

ARecord = [ARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20a_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AAAARecord = [AAAARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20aaaa_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CNAMERecord = [CNAMERecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20cname_record%20%3E%20(schema)) { name, ttl, type, 5 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

MXRecord = [MXRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20mx_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

NSRecord = [NSRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ns_record%20%3E%20(schema)) { name, ttl, type, 5 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OpenpgpkeyRecord object { id, name, ttl, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "OPENPGPKEY"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

A single Base64-encoded OpenPGP Transferable Public Key (RFC 4880 Section 11.1)

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PTRRecord = [PTRRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ptr_record%20%3E%20(schema)) { name, ttl, type, 5 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TXTRecord = [TXTRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20txt_record%20%3E%20(schema)) { name, ttl, type, 5 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CAARecord = [CAARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20caa_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CERTRecord = [CERTRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20cert_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DNSKEYRecord = [DNSKEYRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20dnskey_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DSRecord = [DSRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ds_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

HTTPSRecord = [HTTPSRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20https_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LOCRecord = [LOCRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20loc_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

NAPTRRecord = [NAPTRRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20naptr_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SMIMEARecord = [SMIMEARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20smimea_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SRVRecord = [SRVRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20srv_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SSHFPRecord = [SSHFPRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20sshfp_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SVCBRecord = [SVCBRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20svcb_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TLSARecord = [TLSARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20tlsa_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

URIRecord = [URIRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20uri_record%20%3E%20(schema)) { name, ttl, type, 7 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CAARecord object { name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "CAA"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

Formatted CAA content. See ‘data’ to set CAA properties.

[Link to this property](#)

<details>

<summary>

data: optional object { flags, tag, value }

Components of a CAA record.

</summary>

flags: optional number

Flags for the CAA record.

maximum255

minimum0

[Link to this property](#)

tag: optional string

Name of the property controlled by this record (e.g.: issue, issuewild, iodef).

[Link to this property](#)

value: optional string

Value of the record. This field’s semantics depend on the chosen tag.

[Link to this property](#)

</details>

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CERTRecord object { name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "CERT"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

Formatted CERT content. See ‘data’ to set CERT properties.

[Link to this property](#)

<details>

<summary>

data: optional object { algorithm, certificate, key_tag, type }

Components of a CERT record.

</summary>

algorithm: optional number

Algorithm.

maximum255

minimum0

[Link to this property](#)

certificate: optional string

Certificate.

[Link to this property](#)

key_tag: optional number

Key Tag.

maximum65535

minimum0

[Link to this property](#)

type: optional number

Type.

maximum65535

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CNAMERecord object { name, ttl, type, 5 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "CNAME"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

A valid hostname. Must not match the record’s name.

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { flatten_cname, ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

flatten_cname: optional boolean

If enabled, causes the CNAME record to be resolved externally and the resulting address records (e.g., A and AAAA) to be returned instead of the CNAME record itself. This setting is unavailable for proxied records, since they are always flattened.

[Link to this property](#)

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DNSKEYRecord object { name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "DNSKEY"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

Formatted DNSKEY content. See ‘data’ to set DNSKEY properties.

[Link to this property](#)

<details>

<summary>

data: optional object { algorithm, flags, protocol, public_key }

Components of a DNSKEY record.

</summary>

algorithm: optional number

Algorithm.

maximum255

minimum0

[Link to this property](#)

flags: optional number

Flags.

maximum65535

minimum0

[Link to this property](#)

protocol: optional number

Protocol.

maximum255

minimum0

[Link to this property](#)

public_key: optional string

Public Key.

[Link to this property](#)

</details>

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DSRecord object { name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "DS"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

Formatted DS content. See ‘data’ to set DS properties.

[Link to this property](#)

<details>

<summary>

data: optional object { algorithm, digest, digest_type, key_tag }

Components of a DS record.

</summary>

algorithm: optional number

Algorithm.

maximum255

minimum0

[Link to this property](#)

digest: optional string

Digest.

[Link to this property](#)

digest_type: optional number

Digest Type.

maximum255

minimum0

[Link to this property](#)

key_tag: optional number

Key Tag.

maximum65535

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

HTTPSRecord object { name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "HTTPS"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

Formatted HTTPS content. See ‘data’ to set HTTPS properties.

[Link to this property](#)

<details>

<summary>

data: optional object { priority, target, value }

Components of a HTTPS record.

</summary>

priority: optional number

Priority.

maximum65535

minimum0

[Link to this property](#)

target: optional string

Target.

[Link to this property](#)

value: optional string

Value.

[Link to this property](#)

</details>

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LOCRecord object { name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "LOC"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

Formatted LOC content. See ‘data’ to set LOC properties.

[Link to this property](#)

<details>

<summary>

data: optional object { altitude, lat_degrees, lat_direction, 9 more }

Components of a LOC record.

</summary>

altitude: optional number

Altitude of location in meters.

maximum42849672.95

minimum-100000

[Link to this property](#)

lat_degrees: optional number

Degrees of latitude.

maximum90

minimum0

[Link to this property](#)

<details>

<summary>

lat_direction: optional "N" or "S"

Latitude direction.

</summary>

One of the following:

"N"

[Link to this property](#)

"S"

[Link to this property](#)

</details>

[Link to this property](#)

lat_minutes: optional number

Minutes of latitude.

maximum59

minimum0

[Link to this property](#)

lat_seconds: optional number

Seconds of latitude.

maximum59.999

minimum0

[Link to this property](#)

long_degrees: optional number

Degrees of longitude.

maximum180

minimum0

[Link to this property](#)

<details>

<summary>

long_direction: optional "E" or "W"

Longitude direction.

</summary>

One of the following:

"E"

[Link to this property](#)

"W"

[Link to this property](#)

</details>

[Link to this property](#)

long_minutes: optional number

Minutes of longitude.

maximum59

minimum0

[Link to this property](#)

long_seconds: optional number

Seconds of longitude.

maximum59.999

minimum0

[Link to this property](#)

precision_horz: optional number

Horizontal precision of location.

maximum90000000

minimum0

[Link to this property](#)

precision_vert: optional number

Vertical precision of location.

maximum90000000

minimum0

[Link to this property](#)

size: optional number

Size of location in meters.

maximum90000000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

MXRecord object { name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "MX"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

A valid mail server hostname.

formathostname

[Link to this property](#)

priority: optional number

Required for MX and URI records; ignored for other record types (but may still be returned by the API). Records with lower priorities are preferred. This field is to be deprecated in favor of the priority field within the data map.

maximum65535

minimum0

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

NAPTRRecord object { name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "NAPTR"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

Formatted NAPTR content. See ‘data’ to set NAPTR properties.

[Link to this property](#)

<details>

<summary>

data: optional object { flags, order, preference, 3 more }

Components of a NAPTR record.

</summary>

flags: optional string

Flags.

[Link to this property](#)

order: optional number

Order.

maximum65535

minimum0

[Link to this property](#)

preference: optional number

Preference.

maximum65535

minimum0

[Link to this property](#)

regex: optional string

Regex.

[Link to this property](#)

replacement: optional string

Replacement.

[Link to this property](#)

service: optional string

Service.

[Link to this property](#)

</details>

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

NSRecord object { name, ttl, type, 5 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "NS"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

A valid name server host name.

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PTRRecord object { name, ttl, type, 5 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "PTR"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

Domain name pointing to the address.

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Record = [ARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20a_record%20%3E%20(schema)) { name, ttl, type, 6 more } or [AAAARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20aaaa_record%20%3E%20(schema)) { name, ttl, type, 6 more } or [CNAMERecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20cname_record%20%3E%20(schema)) { name, ttl, type, 5 more } or 18 more

</summary>

One of the following:

<details>

<summary>

ARecord object { name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "A"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

A valid IPv4 address.

formatipv4

[Link to this property](#)

private_routing: optional boolean

Enables private network routing to the origin.

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AAAARecord object { name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "AAAA"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

A valid IPv6 address.

formatipv6

[Link to this property](#)

private_routing: optional boolean

Enables private network routing to the origin.

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CNAMERecord object { name, ttl, type, 5 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "CNAME"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

A valid hostname. Must not match the record’s name.

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { flatten_cname, ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

flatten_cname: optional boolean

If enabled, causes the CNAME record to be resolved externally and the resulting address records (e.g., A and AAAA) to be returned instead of the CNAME record itself. This setting is unavailable for proxied records, since they are always flattened.

[Link to this property](#)

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

MXRecord object { name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "MX"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

A valid mail server hostname.

formathostname

[Link to this property](#)

priority: optional number

Required for MX and URI records; ignored for other record types (but may still be returned by the API). Records with lower priorities are preferred. This field is to be deprecated in favor of the priority field within the data map.

maximum65535

minimum0

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

NSRecord object { name, ttl, type, 5 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "NS"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

A valid name server host name.

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

Openpgpkey object { name, ttl, type, 5 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "OPENPGPKEY"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

A single Base64-encoded OpenPGP Transferable Public Key (RFC 4880 Section 11.1)

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PTRRecord object { name, ttl, type, 5 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "PTR"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

Domain name pointing to the address.

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TXTRecord object { name, ttl, type, 5 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "TXT"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

Text content for the record. The content must consist of quoted “character strings” (RFC 1035), each with a length of up to 255 bytes. Strings exceeding this allowed maximum length are automatically split.

Learn more at https://www.cloudflare.com/learning/dns/dns-records/dns-txt-record/.

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CAARecord object { name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "CAA"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

Formatted CAA content. See ‘data’ to set CAA properties.

[Link to this property](#)

<details>

<summary>

data: optional object { flags, tag, value }

Components of a CAA record.

</summary>

flags: optional number

Flags for the CAA record.

maximum255

minimum0

[Link to this property](#)

tag: optional string

Name of the property controlled by this record (e.g.: issue, issuewild, iodef).

[Link to this property](#)

value: optional string

Value of the record. This field’s semantics depend on the chosen tag.

[Link to this property](#)

</details>

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CERTRecord object { name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "CERT"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

Formatted CERT content. See ‘data’ to set CERT properties.

[Link to this property](#)

<details>

<summary>

data: optional object { algorithm, certificate, key_tag, type }

Components of a CERT record.

</summary>

algorithm: optional number

Algorithm.

maximum255

minimum0

[Link to this property](#)

certificate: optional string

Certificate.

[Link to this property](#)

key_tag: optional number

Key Tag.

maximum65535

minimum0

[Link to this property](#)

type: optional number

Type.

maximum65535

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DNSKEYRecord object { name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "DNSKEY"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

Formatted DNSKEY content. See ‘data’ to set DNSKEY properties.

[Link to this property](#)

<details>

<summary>

data: optional object { algorithm, flags, protocol, public_key }

Components of a DNSKEY record.

</summary>

algorithm: optional number

Algorithm.

maximum255

minimum0

[Link to this property](#)

flags: optional number

Flags.

maximum65535

minimum0

[Link to this property](#)

protocol: optional number

Protocol.

maximum255

minimum0

[Link to this property](#)

public_key: optional string

Public Key.

[Link to this property](#)

</details>

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DSRecord object { name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "DS"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

Formatted DS content. See ‘data’ to set DS properties.

[Link to this property](#)

<details>

<summary>

data: optional object { algorithm, digest, digest_type, key_tag }

Components of a DS record.

</summary>

algorithm: optional number

Algorithm.

maximum255

minimum0

[Link to this property](#)

digest: optional string

Digest.

[Link to this property](#)

digest_type: optional number

Digest Type.

maximum255

minimum0

[Link to this property](#)

key_tag: optional number

Key Tag.

maximum65535

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

HTTPSRecord object { name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "HTTPS"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

Formatted HTTPS content. See ‘data’ to set HTTPS properties.

[Link to this property](#)

<details>

<summary>

data: optional object { priority, target, value }

Components of a HTTPS record.

</summary>

priority: optional number

Priority.

maximum65535

minimum0

[Link to this property](#)

target: optional string

Target.

[Link to this property](#)

value: optional string

Value.

[Link to this property](#)

</details>

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LOCRecord object { name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "LOC"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

Formatted LOC content. See ‘data’ to set LOC properties.

[Link to this property](#)

<details>

<summary>

data: optional object { altitude, lat_degrees, lat_direction, 9 more }

Components of a LOC record.

</summary>

altitude: optional number

Altitude of location in meters.

maximum42849672.95

minimum-100000

[Link to this property](#)

lat_degrees: optional number

Degrees of latitude.

maximum90

minimum0

[Link to this property](#)

<details>

<summary>

lat_direction: optional "N" or "S"

Latitude direction.

</summary>

One of the following:

"N"

[Link to this property](#)

"S"

[Link to this property](#)

</details>

[Link to this property](#)

lat_minutes: optional number

Minutes of latitude.

maximum59

minimum0

[Link to this property](#)

lat_seconds: optional number

Seconds of latitude.

maximum59.999

minimum0

[Link to this property](#)

long_degrees: optional number

Degrees of longitude.

maximum180

minimum0

[Link to this property](#)

<details>

<summary>

long_direction: optional "E" or "W"

Longitude direction.

</summary>

One of the following:

"E"

[Link to this property](#)

"W"

[Link to this property](#)

</details>

[Link to this property](#)

long_minutes: optional number

Minutes of longitude.

maximum59

minimum0

[Link to this property](#)

long_seconds: optional number

Seconds of longitude.

maximum59.999

minimum0

[Link to this property](#)

precision_horz: optional number

Horizontal precision of location.

maximum90000000

minimum0

[Link to this property](#)

precision_vert: optional number

Vertical precision of location.

maximum90000000

minimum0

[Link to this property](#)

size: optional number

Size of location in meters.

maximum90000000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

NAPTRRecord object { name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "NAPTR"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

Formatted NAPTR content. See ‘data’ to set NAPTR properties.

[Link to this property](#)

<details>

<summary>

data: optional object { flags, order, preference, 3 more }

Components of a NAPTR record.

</summary>

flags: optional string

Flags.

[Link to this property](#)

order: optional number

Order.

maximum65535

minimum0

[Link to this property](#)

preference: optional number

Preference.

maximum65535

minimum0

[Link to this property](#)

regex: optional string

Regex.

[Link to this property](#)

replacement: optional string

Replacement.

[Link to this property](#)

service: optional string

Service.

[Link to this property](#)

</details>

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SMIMEARecord object { name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "SMIMEA"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

Formatted SMIMEA content. See ‘data’ to set SMIMEA properties.

[Link to this property](#)

<details>

<summary>

data: optional object { certificate, matching_type, selector, usage }

Components of a SMIMEA record.

</summary>

certificate: optional string

Certificate.

[Link to this property](#)

matching_type: optional number

Matching Type.

maximum255

minimum0

[Link to this property](#)

selector: optional number

Selector.

maximum255

minimum0

[Link to this property](#)

usage: optional number

Usage.

maximum255

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SRVRecord object { name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "SRV"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

Priority, weight, port, and SRV target. See ‘data’ for setting the individual component values.

[Link to this property](#)

<details>

<summary>

data: optional object { port, priority, target, weight }

Components of a SRV record.

</summary>

port: optional number

The port of the service.

maximum65535

minimum0

[Link to this property](#)

priority: optional number

Required for MX and URI records; ignored for other record types (but may still be returned by the API). Records with lower priorities are preferred. This field is to be deprecated in favor of the priority field within the data map.

maximum65535

minimum0

[Link to this property](#)

target: optional string

A valid hostname.

formathostname

[Link to this property](#)

weight: optional number

The record weight.

maximum65535

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SSHFPRecord object { name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "SSHFP"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

Formatted SSHFP content. See ‘data’ to set SSHFP properties.

[Link to this property](#)

<details>

<summary>

data: optional object { algorithm, fingerprint, type }

Components of a SSHFP record.

</summary>

algorithm: optional number

Algorithm.

maximum255

minimum0

[Link to this property](#)

fingerprint: optional string

Fingerprint.

[Link to this property](#)

type: optional number

Type.

maximum255

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SVCBRecord object { name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "SVCB"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

Formatted SVCB content. See ‘data’ to set SVCB properties.

[Link to this property](#)

<details>

<summary>

data: optional object { priority, target, value }

Components of a SVCB record.

</summary>

priority: optional number

Priority.

maximum65535

minimum0

[Link to this property](#)

target: optional string

Target.

[Link to this property](#)

value: optional string

Value.

[Link to this property](#)

</details>

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TLSARecord object { name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "TLSA"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

Formatted TLSA content. See ‘data’ to set TLSA properties.

[Link to this property](#)

<details>

<summary>

data: optional object { certificate, matching_type, selector, usage }

Components of a TLSA record.

</summary>

certificate: optional string

Certificate.

[Link to this property](#)

matching_type: optional number

Matching Type.

maximum255

minimum0

[Link to this property](#)

selector: optional number

Selector.

maximum255

minimum0

[Link to this property](#)

usage: optional number

Usage.

maximum255

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

URIRecord object { name, ttl, type, 7 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "URI"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

Formatted URI content. See ‘data’ to set URI properties.

[Link to this property](#)

<details>

<summary>

data: optional object { target, weight }

Components of a URI record.

</summary>

target: optional string

The record content.

[Link to this property](#)

weight: optional number

The record weight.

maximum65535

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

priority: optional number

Required for MX and URI records; ignored for other record types (but may still be returned by the API). Records with lower priorities are preferred. This field is to be deprecated in favor of the priority field within the data map.

maximum65535

minimum0

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RecordResponse = [ARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20a_record%20%3E%20(schema)) { name, ttl, type, 6 more } or [AAAARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20aaaa_record%20%3E%20(schema)) { name, ttl, type, 6 more } or [CNAMERecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20cname_record%20%3E%20(schema)) { name, ttl, type, 5 more } or 18 more

</summary>

One of the following:

<details>

<summary>

ARecord = [ARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20a_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AAAARecord = [AAAARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20aaaa_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CNAMERecord = [CNAMERecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20cname_record%20%3E%20(schema)) { name, ttl, type, 5 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

MXRecord = [MXRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20mx_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

NSRecord = [NSRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ns_record%20%3E%20(schema)) { name, ttl, type, 5 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OpenpgpkeyRecord object { id, comment, content, 12 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

comment: string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: string

A single Base64-encoded OpenPGP Transferable Public Key (RFC 4880 Section 11.1)

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

proxied: boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "OPENPGPKEY"

Record type.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PTRRecord = [PTRRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ptr_record%20%3E%20(schema)) { name, ttl, type, 5 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TXTRecord = [TXTRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20txt_record%20%3E%20(schema)) { name, ttl, type, 5 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CAARecord = [CAARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20caa_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CERTRecord = [CERTRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20cert_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DNSKEYRecord = [DNSKEYRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20dnskey_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DSRecord = [DSRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ds_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

HTTPSRecord = [HTTPSRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20https_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LOCRecord = [LOCRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20loc_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

NAPTRRecord = [NAPTRRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20naptr_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SMIMEARecord = [SMIMEARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20smimea_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SRVRecord = [SRVRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20srv_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SSHFPRecord = [SSHFPRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20sshfp_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SVCBRecord = [SVCBRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20svcb_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TLSARecord = [TLSARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20tlsa_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

URIRecord = [URIRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20uri_record%20%3E%20(schema)) { name, ttl, type, 7 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

RecordTags = string

Individual tag of the form name:value (the name must consist of only letters, numbers, underscores and hyphens)

[Link to this property](#)

<details>

<summary>

SMIMEARecord object { name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "SMIMEA"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

Formatted SMIMEA content. See ‘data’ to set SMIMEA properties.

[Link to this property](#)

<details>

<summary>

data: optional object { certificate, matching_type, selector, usage }

Components of a SMIMEA record.

</summary>

certificate: optional string

Certificate.

[Link to this property](#)

matching_type: optional number

Matching Type.

maximum255

minimum0

[Link to this property](#)

selector: optional number

Selector.

maximum255

minimum0

[Link to this property](#)

usage: optional number

Usage.

maximum255

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SRVRecord object { name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "SRV"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

Priority, weight, port, and SRV target. See ‘data’ for setting the individual component values.

[Link to this property](#)

<details>

<summary>

data: optional object { port, priority, target, weight }

Components of a SRV record.

</summary>

port: optional number

The port of the service.

maximum65535

minimum0

[Link to this property](#)

priority: optional number

Required for MX and URI records; ignored for other record types (but may still be returned by the API). Records with lower priorities are preferred. This field is to be deprecated in favor of the priority field within the data map.

maximum65535

minimum0

[Link to this property](#)

target: optional string

A valid hostname.

formathostname

[Link to this property](#)

weight: optional number

The record weight.

maximum65535

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SSHFPRecord object { name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "SSHFP"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

Formatted SSHFP content. See ‘data’ to set SSHFP properties.

[Link to this property](#)

<details>

<summary>

data: optional object { algorithm, fingerprint, type }

Components of a SSHFP record.

</summary>

algorithm: optional number

Algorithm.

maximum255

minimum0

[Link to this property](#)

fingerprint: optional string

Fingerprint.

[Link to this property](#)

type: optional number

Type.

maximum255

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SVCBRecord object { name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "SVCB"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

Formatted SVCB content. See ‘data’ to set SVCB properties.

[Link to this property](#)

<details>

<summary>

data: optional object { priority, target, value }

Components of a SVCB record.

</summary>

priority: optional number

Priority.

maximum65535

minimum0

[Link to this property](#)

target: optional string

Target.

[Link to this property](#)

value: optional string

Value.

[Link to this property](#)

</details>

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TLSARecord object { name, ttl, type, 6 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "TLSA"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

Formatted TLSA content. See ‘data’ to set TLSA properties.

[Link to this property](#)

<details>

<summary>

data: optional object { certificate, matching_type, selector, usage }

Components of a TLSA record.

</summary>

certificate: optional string

Certificate.

[Link to this property](#)

matching_type: optional number

Matching Type.

maximum255

minimum0

[Link to this property](#)

selector: optional number

Selector.

maximum255

minimum0

[Link to this property](#)

usage: optional number

Usage.

maximum255

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TTL = number or 1

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

</summary>

One of the following:

number

[Link to this property](#)

1

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TXTRecord object { name, ttl, type, 5 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "TXT"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

Text content for the record. The content must consist of quoted “character strings” (RFC 1035), each with a length of up to 255 bytes. Strings exceeding this allowed maximum length are automatically split.

Learn more at https://www.cloudflare.com/learning/dns/dns-records/dns-txt-record/.

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

URIRecord object { name, ttl, type, 7 more }

</summary>

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "URI"

Record type.

[Link to this property](#)

comment: optional string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: optional string

Formatted URI content. See ‘data’ to set URI properties.

[Link to this property](#)

<details>

<summary>

data: optional object { target, weight }

Components of a URI record.

</summary>

target: optional string

The record content.

[Link to this property](#)

weight: optional number

The record weight.

maximum65535

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

priority: optional number

Required for MX and URI records; ignored for other record types (but may still be returned by the API). Records with lower priorities are preferred. This field is to be deprecated in favor of the priority field within the data map.

maximum65535

minimum0

[Link to this property](#)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: optional object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: optional array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RecordDeleteResponse object { id }

</summary>

id: optional string

Identifier.

maxLength32

[Link to this property](#)

</details>

[Link to this property](#)

RecordExportResponse = string

Exported BIND zone file.

[Link to this property](#)

<details>

<summary>

RecordImportResponse object { recs_added, total_records_parsed }

</summary>

recs_added: optional number

Number of DNS records added.

[Link to this property](#)

total_records_parsed: optional number

Total number of DNS records parsed.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RecordScanResponse object { recs_added, total_records_parsed }

</summary>

recs_added: optional number

Number of DNS records added.

[Link to this property](#)

total_records_parsed: optional number

Total number of DNS records parsed.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RecordScanTriggerResponse object { errors, messages, success }

</summary>

<details>

<summary>

errors: array of object { code, message, documentation_url, source }

</summary>

code: number

minimum1000

[Link to this property](#)

message: string

[Link to this property](#)

documentation_url: optional string

[Link to this property](#)

<details>

<summary>

source: optional object { pointer }

</summary>

pointer: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

messages: array of object { code, message, documentation_url, source }

</summary>

code: number

minimum1000

[Link to this property](#)

message: string

[Link to this property](#)

documentation_url: optional string

[Link to this property](#)

<details>

<summary>

source: optional object { pointer }

</summary>

pointer: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

success: true

Whether the API call was successful.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RecordScanReviewResponse object { accepts, rejects }

</summary>

<details>

<summary>

accepts: optional array of [RecordResponse](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_response%20%3E%20(schema))

</summary>

One of the following:

<details>

<summary>

ARecord = [ARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20a_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AAAARecord = [AAAARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20aaaa_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CNAMERecord = [CNAMERecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20cname_record%20%3E%20(schema)) { name, ttl, type, 5 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

MXRecord = [MXRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20mx_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

NSRecord = [NSRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ns_record%20%3E%20(schema)) { name, ttl, type, 5 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OpenpgpkeyRecord object { id, comment, content, 12 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

comment: string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: string

A single Base64-encoded OpenPGP Transferable Public Key (RFC 4880 Section 11.1)

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

proxied: boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "OPENPGPKEY"

Record type.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PTRRecord = [PTRRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ptr_record%20%3E%20(schema)) { name, ttl, type, 5 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TXTRecord = [TXTRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20txt_record%20%3E%20(schema)) { name, ttl, type, 5 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CAARecord = [CAARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20caa_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CERTRecord = [CERTRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20cert_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DNSKEYRecord = [DNSKEYRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20dnskey_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DSRecord = [DSRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ds_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

HTTPSRecord = [HTTPSRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20https_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LOCRecord = [LOCRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20loc_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

NAPTRRecord = [NAPTRRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20naptr_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SMIMEARecord = [SMIMEARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20smimea_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SRVRecord = [SRVRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20srv_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SSHFPRecord = [SSHFPRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20sshfp_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SVCBRecord = [SVCBRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20svcb_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TLSARecord = [TLSARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20tlsa_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

URIRecord = [URIRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20uri_record%20%3E%20(schema)) { name, ttl, type, 7 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

rejects: optional array of string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

RecordBatchResponse object { deletes, patches, posts, puts }

</summary>

<details>

<summary>

deletes: optional array of [RecordResponse](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_response%20%3E%20(schema))

</summary>

One of the following:

<details>

<summary>

ARecord = [ARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20a_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AAAARecord = [AAAARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20aaaa_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CNAMERecord = [CNAMERecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20cname_record%20%3E%20(schema)) { name, ttl, type, 5 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

MXRecord = [MXRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20mx_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

NSRecord = [NSRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ns_record%20%3E%20(schema)) { name, ttl, type, 5 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OpenpgpkeyRecord object { id, comment, content, 12 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

comment: string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: string

A single Base64-encoded OpenPGP Transferable Public Key (RFC 4880 Section 11.1)

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

proxied: boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "OPENPGPKEY"

Record type.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PTRRecord = [PTRRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ptr_record%20%3E%20(schema)) { name, ttl, type, 5 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TXTRecord = [TXTRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20txt_record%20%3E%20(schema)) { name, ttl, type, 5 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CAARecord = [CAARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20caa_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CERTRecord = [CERTRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20cert_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DNSKEYRecord = [DNSKEYRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20dnskey_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DSRecord = [DSRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ds_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

HTTPSRecord = [HTTPSRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20https_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LOCRecord = [LOCRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20loc_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

NAPTRRecord = [NAPTRRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20naptr_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SMIMEARecord = [SMIMEARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20smimea_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SRVRecord = [SRVRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20srv_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SSHFPRecord = [SSHFPRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20sshfp_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SVCBRecord = [SVCBRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20svcb_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TLSARecord = [TLSARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20tlsa_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

URIRecord = [URIRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20uri_record%20%3E%20(schema)) { name, ttl, type, 7 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

patches: optional array of [RecordResponse](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_response%20%3E%20(schema))

</summary>

One of the following:

<details>

<summary>

ARecord = [ARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20a_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AAAARecord = [AAAARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20aaaa_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CNAMERecord = [CNAMERecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20cname_record%20%3E%20(schema)) { name, ttl, type, 5 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

MXRecord = [MXRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20mx_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

NSRecord = [NSRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ns_record%20%3E%20(schema)) { name, ttl, type, 5 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OpenpgpkeyRecord object { id, comment, content, 12 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

comment: string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: string

A single Base64-encoded OpenPGP Transferable Public Key (RFC 4880 Section 11.1)

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

proxied: boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "OPENPGPKEY"

Record type.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PTRRecord = [PTRRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ptr_record%20%3E%20(schema)) { name, ttl, type, 5 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TXTRecord = [TXTRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20txt_record%20%3E%20(schema)) { name, ttl, type, 5 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CAARecord = [CAARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20caa_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CERTRecord = [CERTRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20cert_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DNSKEYRecord = [DNSKEYRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20dnskey_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DSRecord = [DSRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ds_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

HTTPSRecord = [HTTPSRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20https_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LOCRecord = [LOCRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20loc_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

NAPTRRecord = [NAPTRRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20naptr_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SMIMEARecord = [SMIMEARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20smimea_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SRVRecord = [SRVRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20srv_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SSHFPRecord = [SSHFPRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20sshfp_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SVCBRecord = [SVCBRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20svcb_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TLSARecord = [TLSARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20tlsa_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

URIRecord = [URIRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20uri_record%20%3E%20(schema)) { name, ttl, type, 7 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

posts: optional array of [RecordResponse](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_response%20%3E%20(schema))

</summary>

One of the following:

<details>

<summary>

ARecord = [ARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20a_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AAAARecord = [AAAARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20aaaa_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CNAMERecord = [CNAMERecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20cname_record%20%3E%20(schema)) { name, ttl, type, 5 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

MXRecord = [MXRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20mx_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

NSRecord = [NSRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ns_record%20%3E%20(schema)) { name, ttl, type, 5 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OpenpgpkeyRecord object { id, comment, content, 12 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

comment: string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: string

A single Base64-encoded OpenPGP Transferable Public Key (RFC 4880 Section 11.1)

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

proxied: boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "OPENPGPKEY"

Record type.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PTRRecord = [PTRRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ptr_record%20%3E%20(schema)) { name, ttl, type, 5 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TXTRecord = [TXTRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20txt_record%20%3E%20(schema)) { name, ttl, type, 5 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CAARecord = [CAARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20caa_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CERTRecord = [CERTRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20cert_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DNSKEYRecord = [DNSKEYRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20dnskey_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DSRecord = [DSRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ds_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

HTTPSRecord = [HTTPSRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20https_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LOCRecord = [LOCRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20loc_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

NAPTRRecord = [NAPTRRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20naptr_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SMIMEARecord = [SMIMEARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20smimea_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SRVRecord = [SRVRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20srv_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SSHFPRecord = [SSHFPRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20sshfp_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SVCBRecord = [SVCBRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20svcb_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TLSARecord = [TLSARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20tlsa_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

URIRecord = [URIRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20uri_record%20%3E%20(schema)) { name, ttl, type, 7 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

puts: optional array of [RecordResponse](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_response%20%3E%20(schema))

</summary>

One of the following:

<details>

<summary>

ARecord = [ARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20a_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AAAARecord = [AAAARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20aaaa_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CNAMERecord = [CNAMERecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20cname_record%20%3E%20(schema)) { name, ttl, type, 5 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

MXRecord = [MXRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20mx_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

NSRecord = [NSRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ns_record%20%3E%20(schema)) { name, ttl, type, 5 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OpenpgpkeyRecord object { id, comment, content, 12 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

comment: string

Comments or notes about the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

content: string

A single Base64-encoded OpenPGP Transferable Public Key (RFC 4880 Section 11.1)

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

name: string

Complete DNS record name, including the zone name, in Punycode.

maxLength255

minLength1

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

proxied: boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)

<details>

<summary>

settings: object { ipv4_only, ipv6_only }

Settings for the DNS record.

</summary>

ipv4_only: optional boolean

When enabled, only A records will be generated, and AAAA records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

ipv6_only: optional boolean

When enabled, only AAAA records will be generated, and A records will not be created. This setting is intended for exceptional cases. Note that this option only applies to proxied records and it has no effect on whether Cloudflare communicates with the origin using IPv4 or IPv6.

[Link to this property](#)

</details>

[Link to this property](#)

tags: array of [RecordTags](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_tags%20%3E%20(schema))

Custom tags for the DNS record. This field has no effect on DNS responses.

[Link to this property](#)

ttl: [TTL](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ttl%20%3E%20(schema))

Time To Live (TTL) of the DNS record in seconds. Setting to 1 means ‘automatic’. Value must be between 60 and 86400, with the minimum reduced to 30 for Enterprise zones.

[Link to this property](#)

type: "OPENPGPKEY"

Record type.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

PTRRecord = [PTRRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ptr_record%20%3E%20(schema)) { name, ttl, type, 5 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TXTRecord = [TXTRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20txt_record%20%3E%20(schema)) { name, ttl, type, 5 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CAARecord = [CAARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20caa_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

CERTRecord = [CERTRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20cert_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DNSKEYRecord = [DNSKEYRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20dnskey_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

DSRecord = [DSRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20ds_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

HTTPSRecord = [HTTPSRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20https_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

LOCRecord = [LOCRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20loc_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

NAPTRRecord = [NAPTRRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20naptr_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SMIMEARecord = [SMIMEARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20smimea_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SRVRecord = [SRVRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20srv_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SSHFPRecord = [SSHFPRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20sshfp_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

SVCBRecord = [SVCBRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20svcb_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

TLSARecord = [TLSARecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20tlsa_record%20%3E%20(schema)) { name, ttl, type, 6 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

URIRecord = [URIRecord](/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20uri_record%20%3E%20(schema)) { name, ttl, type, 7 more }

</summary>

id: string

Identifier.

maxLength32

[Link to this property](#)

created_on: string

When the record was created.

formatdate-time

[Link to this property](#)

<details>

<summary>

meta: object { dead_glue, is_glue, shadowed_by, shadowed_records_count }

Extra Cloudflare-specific metadata about the record.

</summary>

dead_glue: optional boolean

Whether this glue record is not served because a shallower NS delegation takes precedence over the deeper delegation that needs it. Present only when true; reachable glue carries only `is_glue`. See [Unreachable glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#unreachable-glue-records).

[Link to this property](#)

is_glue: optional boolean

Whether this A or AAAA record is glue for a subdomain NS delegation. See [Glue records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records#glue-records).

[Link to this property](#)

shadowed_by: optional array of string

IDs of the NS records that shadow this record. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)

shadowed_records_count: optional number

Number of records shadowed by this NS delegation. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

maximum10000

minimum0

[Link to this property](#)

</details>

[Link to this property](#)

modified_on: string

When the record was last modified.

formatdate-time

[Link to this property](#)

proxiable: boolean

Whether the record can be proxied by Cloudflare or not.

[Link to this property](#)

comment_modified_on: optional string

When the record comment was last modified. Omitted if there is no comment.

formatdate-time

[Link to this property](#)

tags_modified_on: optional string

When the record tags were last modified. Omitted if there are no tags.

formatdate-time

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)
