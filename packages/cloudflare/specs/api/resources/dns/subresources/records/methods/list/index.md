---
title: List DNS Records
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[DNS](https://developers.cloudflare.com/api/resources/dns)

[Records](https://developers.cloudflare.com/api/resources/dns/subresources/records)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# List DNS Records

GET/zones/{zone\_id}/dns\_records

List, search, sort, and filter a zones’ DNS records.

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

`DNS Read``DNS Write`

##### P ath ParametersExpand Collapse

zone\_id: string

Identifier.

maxLength32

[Link to this property](#)%20dns.records%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20zone_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

<details>

<summary>

comment: optional object {absent, contains, endswith, 3 more }

</summary>

absent: optional string

If this parameter is present, only records *without* a comment are returned.

<a href="#">Link to this property</a>

contains: optional string

Substring of the DNS record comment. Comment filters are case-insensitive.

<a href="#">Link to this property</a>

endswith: optional string

Suffix of the DNS record comment. Comment filters are case-insensitive.

<a href="#">Link to this property</a>

exact: optional string

Exact value of the DNS record comment. Comment filters are case-insensitive.

<a href="#">Link to this property</a>

present: optional string

If this parameter is present, only records *with* a comment are returned.

<a href="#">Link to this property</a>

startswith: optional string

Prefix of the DNS record comment. Comment filters are case-insensitive.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.records%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20comment%20%3E%20(schema)>)

<details>

<summary>

content: optional object {contains, endswith, exact, startswith }

</summary>

contains: optional string

Substring of the DNS record content. Content filters are case-insensitive.

<a href="#">Link to this property</a>

endswith: optional string

Suffix of the DNS record content. Content filters are case-insensitive.

<a href="#">Link to this property</a>

exact: optional string

Exact value of the DNS record content. Content filters are case-insensitive.

<a href="#">Link to this property</a>

startswith: optional string

Prefix of the DNS record content. Content filters are case-insensitive.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.records%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20content%20%3E%20(schema)>)

<details>

<summary>

direction: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20sort_direction%20%3E%20(schema)">SortDirection</a>

Direction to order DNS records in.

</summary>

One of the following:

"asc"

<a href="#">Link to this property</a>

"desc"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.records%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20direction%20%3E%20(schema)>)

include\_shadow\_metadata: optional boolean

Whether to include shadow metadata in the `meta` field of each record in the response. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)%20dns.records%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20include_shadow_metadata%20%3E%20(schema)>)

<details>

<summary>

match: optional "any"or "all"

Whether to match all search requirements or at least one (any). If set to <code>all</code>, acts like a logical AND between filters. If set to <code>any</code>, acts like a logical OR instead. Note that the interaction between tag filters is controlled by the <code>tag-match</code> parameter instead.

</summary>

One of the following:

"any"

<a href="#">Link to this property</a>

"all"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.records%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20match%20%3E%20(schema)>)

<details>

<summary>

name: optional object {contains, endswith, exact, startswith }

</summary>

contains: optional string

Substring of the DNS record name. Name filters are case-insensitive.

<a href="#">Link to this property</a>

endswith: optional string

Suffix of the DNS record name. Name filters are case-insensitive.

<a href="#">Link to this property</a>

exact: optional string

Exact value of the DNS record name. Name filters are case-insensitive.

<a href="#">Link to this property</a>

startswith: optional string

Prefix of the DNS record name. Name filters are case-insensitive.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.records%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

<details>

<summary>

order: optional "type"or "name"or "content"or 2 more

Field to order DNS records by.

</summary>

One of the following:

"type"

<a href="#">Link to this property</a>

"name"

<a href="#">Link to this property</a>

"content"

<a href="#">Link to this property</a>

"ttl"

<a href="#">Link to this property</a>

"proxied"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.records%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20order%20%3E%20(schema)>)

page: optional number

Page number of paginated results.

minimum1

[Link to this property](#)%20dns.records%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20page%20%3E%20(schema)>)

per\_page: optional number

Number of DNS records per page.

maximum5000000

minimum1

[Link to this property](#)%20dns.records%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20per_page%20%3E%20(schema)>)

proxied: optional boolean

Whether the record is receiving the performance and security benefits of Cloudflare.

[Link to this property](#)%20dns.records%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20proxied%20%3E%20(schema)>)

search: optional string

Allows searching in multiple properties of a DNS record simultaneously. This parameter is intended for human users, not automation. Its exact behavior is intentionally left unspecified and is subject to change in the future. This parameter works independently of the `match` setting. For automated searches, please use the other available parameters.

[Link to this property](#)%20dns.records%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20search%20%3E%20(schema)>)

shadowed\_by\_name: optional string

Filters to records at or below the given NS delegation name, excluding the NS records that form the delegation itself. The value must be a subdomain of the zone; the zone apex is not accepted. Requires `include_shadow_metadata=true`. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)%20dns.records%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20shadowed_by_name%20%3E%20(schema)>)

shadowing\_name: optional string

Returns NS records that shadow the given name, searching at the name itself and each of its ancestor names within the zone, excluding the zone apex. The value must be a subdomain of the zone; the zone apex is not accepted. See [Shadowed records](https://developers.cloudflare.com/dns/manage-dns-records/reference/shadowed-records).

[Link to this property](#)%20dns.records%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20shadowing_name%20%3E%20(schema)>)

<details>

<summary>

tag: optional object {absent, contains, endswith, 3 more }

</summary>

absent: optional string

Name of a tag which must *not* be present on the DNS record. Tag filters are case-insensitive.

<a href="#">Link to this property</a>

contains: optional string

A tag and value, of the form <code>&lt;tag-name&gt;:&lt;tag-value&gt;</code>. The API will only return DNS records that have a tag named <code>&lt;tag-name&gt;</code> whose value contains <code>&lt;tag-value&gt;</code>. Tag filters are case-insensitive.

<a href="#">Link to this property</a>

endswith: optional string

A tag and value, of the form <code>&lt;tag-name&gt;:&lt;tag-value&gt;</code>. The API will only return DNS records that have a tag named <code>&lt;tag-name&gt;</code> whose value ends with <code>&lt;tag-value&gt;</code>. Tag filters are case-insensitive.

<a href="#">Link to this property</a>

exact: optional string

A tag and value, of the form <code>&lt;tag-name&gt;:&lt;tag-value&gt;</code>. The API will only return DNS records that have a tag named <code>&lt;tag-name&gt;</code> whose value is <code>&lt;tag-value&gt;</code>. Tag filters are case-insensitive.

<a href="#">Link to this property</a>

present: optional string

Name of a tag which must be present on the DNS record. Tag filters are case-insensitive.

<a href="#">Link to this property</a>

startswith: optional string

A tag and value, of the form <code>&lt;tag-name&gt;:&lt;tag-value&gt;</code>. The API will only return DNS records that have a tag named <code>&lt;tag-name&gt;</code> whose value starts with <code>&lt;tag-value&gt;</code>. Tag filters are case-insensitive.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.records%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20tag%20%3E%20(schema)>)

<details>

<summary>

tag\_match: optional "any"or "all"

Whether to match all tag search requirements or at least one (any). If set to <code>all</code>, acts like a logical AND between tag filters. If set to <code>any</code>, acts like a logical OR instead. Note that the regular <code>match</code> parameter is still used to combine the resulting condition with other filters that aren’t related to tags.

</summary>

One of the following:

"any"

<a href="#">Link to this property</a>

"all"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.records%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20tag_match%20%3E%20(schema)>)

<details>

<summary>

type: optional "A"or "AAAA"or "CAA"or 18 more

Record type.

</summary>

One of the following:

"A"

<a href="#">Link to this property</a>

"AAAA"

<a href="#">Link to this property</a>

"CAA"

<a href="#">Link to this property</a>

"CERT"

<a href="#">Link to this property</a>

"CNAME"

<a href="#">Link to this property</a>

"DNSKEY"

<a href="#">Link to this property</a>

"DS"

<a href="#">Link to this property</a>

"HTTPS"

<a href="#">Link to this property</a>

"LOC"

<a href="#">Link to this property</a>

"MX"

<a href="#">Link to this property</a>

"NAPTR"

<a href="#">Link to this property</a>

"NS"

<a href="#">Link to this property</a>

"OPENPGPKEY"

<a href="#">Link to this property</a>

"PTR"

<a href="#">Link to this property</a>

"SMIMEA"

<a href="#">Link to this property</a>

"SRV"

<a href="#">Link to this property</a>

"SSHFP"

<a href="#">Link to this property</a>

"SVCB"

<a href="#">Link to this property</a>

"TLSA"

<a href="#">Link to this property</a>

"TXT"

<a href="#">Link to this property</a>

"URI"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.records%20%3E%20(method)%20list%20%3E%20(params)%20default%20%3E%20(param)%20type%20%3E%20(schema)>)

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

[Link to this property](#)%20dns.records%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20dns.records%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20dns.records%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional array of <a href="https://developers.cloudflare.com/api/resources/dns#(resource)%20dns.records%20%3E%20(model)%20record_response%20%3E%20(schema)">RecordResponse</a>

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

[Link to this property](#)%20dns.records%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

<details>

<summary>

result\_info: optional object {count, page, per\_page, 2 more }

</summary>

count: optional number

Total number of results for the requested service.

<a href="#">Link to this property</a>

page: optional number

Current page within paginated list of results.

<a href="#">Link to this property</a>

per\_page: optional number

Number of results per page of results.

<a href="#">Link to this property</a>

total\_count: optional number

Total results available without any search parameters.

<a href="#">Link to this property</a>

total\_pages: optional number

The number of total pages in the entire result set.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.records%20%3E%20(method)%20list%20%3E%20(network%20schema)%20%3E%20(property)%20result_info>)

### List DNS Records

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "result": [
    {
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
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
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
  "result": [
    {
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
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```