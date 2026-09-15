---
title: Custom Hostnames
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Custom Hostnames

##### [List Custom Hostnames](https://developers.cloudflare.com/api/resources/custom_hostnames/methods/list)

GET/zones/{zone\_id}/custom\_hostnames

##### [Custom Hostname Details](https://developers.cloudflare.com/api/resources/custom_hostnames/methods/get)

GET/zones/{zone\_id}/custom\_hostnames/{custom\_hostname\_id}

##### [Create Custom Hostname](https://developers.cloudflare.com/api/resources/custom_hostnames/methods/create)

POST/zones/{zone\_id}/custom\_hostnames

##### [Edit Custom Hostname](https://developers.cloudflare.com/api/resources/custom_hostnames/methods/edit)

PATCH/zones/{zone\_id}/custom\_hostnames/{custom\_hostname\_id}

##### [Delete Custom Hostname (and any issued SSL certificates)](https://developers.cloudflare.com/api/resources/custom_hostnames/methods/delete)

DELETE/zones/{zone\_id}/custom\_hostnames/{custom\_hostname\_id}

##### ModelsExpand Collapse

<details>

<summary>

BundleMethod = "ubiquitous"or "optimal"or "force"

A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An optimal bundle uses the shortest chain and newest intermediates. And the force bundle verifies the chain, but does not otherwise modify it.

</summary>

One of the following:

"ubiquitous"

<a href="#">Link to this property</a>

"optimal"

<a href="#">Link to this property</a>

"force"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_hostnames%20%3E%20(model)%20bundle_method%20%3E%20(schema)>)

<details>

<summary>

CustomHostname object {id, hostname, created\_at, 8 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

hostname: string

The custom hostname that will point to your hostname via CNAME.

maxLength255

<a href="#">Link to this property</a>

created\_at: optional string

This is the time the hostname was created.

formatdate-time

<a href="#">Link to this property</a>

custom\_metadata: optional map\[string]

Unique key/value metadata for this hostname. These are per-hostname (customer) settings.

<a href="#">Link to this property</a>

custom\_origin\_server: optional string

a valid hostname that’s been added to your DNS zone as an A, AAAA, or CNAME record.

<a href="#">Link to this property</a>

custom\_origin\_sni: optional string

A hostname that will be sent to your custom origin server as SNI for TLS handshake. This can be a valid subdomain of the zone or custom origin server name or the string ‘:request\_host\_header:’ which will cause the host header in the request to be used as SNI. Not configurable with default/fallback origin server.

<a href="#">Link to this property</a>

<details>

<summary>

ownership\_verification: optional object {name, type, value }

This is a record which can be placed to activate a hostname.

</summary>

name: optional string

DNS Name for record.

<a href="#">Link to this property</a>

type: optional "txt"

DNS Record type.

<a href="#">Link to this property</a>

value: optional string

Content for the record.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ownership\_verification\_http: optional object {http\_body, http\_url }

This presents the token to be served by the given http url to activate a hostname.

</summary>

http\_body: optional string

Token to be served.

<a href="#">Link to this property</a>

http\_url: optional string

The HTTP URL that will be checked during custom hostname verification and where the customer should host the token.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ssl: optional object {id, bundle\_method, certificate\_authority, 17 more }

</summary>

id: optional string

Custom hostname SSL identifier tag.

maxLength36

minLength36

<a href="#">Link to this property</a>

bundle\_method: optional <a href="https://developers.cloudflare.com/api/resources/custom_hostnames#(resource)%20custom_hostnames%20%3E%20(model)%20bundle_method%20%3E%20(schema)">BundleMethod</a>

A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An optimal bundle uses the shortest chain and newest intermediates. And the force bundle verifies the chain, but does not otherwise modify it.

<a href="#">Link to this property</a>

certificate\_authority: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20certificate_ca%20%3E%20(schema)">CertificateCA</a>

The Certificate Authority that will issue the certificate.

<a href="#">Link to this property</a>

custom\_certificate: optional string

If a custom uploaded certificate is used.

<a href="#">Link to this property</a>

custom\_csr\_id: optional string

The identifier for the Custom CSR that was used.

<a href="#">Link to this property</a>

custom\_key: optional string

The key for a custom uploaded certificate.

<a href="#">Link to this property</a>

<details>

<summary>

dcv\_delegation\_records: optional array of object {cname, cname\_target, emails, 5 more }

DCV Delegation records for domain validation.

</summary>

cname: optional string

The CNAME record hostname for DCV delegation.

<a href="#">Link to this property</a>

cname\_target: optional string

The CNAME record target value for DCV delegation.

<a href="#">Link to this property</a>

emails: optional array of string

The set of email addresses that the certificate authority (CA) will use to complete domain validation.

<a href="#">Link to this property</a>

http\_body: optional string

The content that the certificate authority (CA) will expect to find at the http\_url during the domain validation.

<a href="#">Link to this property</a>

http\_url: optional string

The url that will be checked during domain validation.

<a href="#">Link to this property</a>

status: optional string

Status of the validation record.

<a href="#">Link to this property</a>

txt\_name: optional string

The hostname that the certificate authority (CA) will check for a TXT record during domain validation .

<a href="#">Link to this property</a>

txt\_value: optional string

The TXT record that the certificate authority (CA) will check during domain validation.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

expires\_on: optional string

The time the custom certificate expires on.

formatdate-time

<a href="#">Link to this property</a>

hosts: optional array of string

A list of Hostnames on a custom uploaded certificate.

<a href="#">Link to this property</a>

issuer: optional string

The issuer on a custom uploaded certificate.

<a href="#">Link to this property</a>

method: optional <a href="https://developers.cloudflare.com/api/resources/custom_hostnames#(resource)%20custom_hostnames%20%3E%20(model)%20dcv_method%20%3E%20(schema)">DCVMethod</a>

Domain control validation (DCV) method used for this hostname.

<a href="#">Link to this property</a>

serial\_number: optional string

The serial number on a custom uploaded certificate.

<a href="#">Link to this property</a>

<details>

<summary>

settings: optional object {ciphers, early\_hints, http2, 2 more }

</summary>

ciphers: optional array of string

An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

<a href="#">Link to this property</a>

<details>

<summary>

early\_hints: optional "on"or "off"

Whether or not Early Hints is enabled.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

http2: optional "on"or "off"

Whether or not HTTP2 is enabled.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

min\_tls\_version: optional "1.0"or "1.1"or "1.2"or "1.3"

The minimum TLS version supported.

</summary>

One of the following:

"1.0"

<a href="#">Link to this property</a>

"1.1"

<a href="#">Link to this property</a>

"1.2"

<a href="#">Link to this property</a>

"1.3"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tls\_1\_3: optional "on"or "off"

Whether or not TLS 1.3 is enabled.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

signature: optional string

The signature on a custom uploaded certificate.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "initializing"or "pending\_validation"or "deleted"or 18 more

Status of the hostname’s SSL certificates.

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending\_validation"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

"pending\_issuance"

<a href="#">Link to this property</a>

"pending\_deployment"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"pending\_expiration"

<a href="#">Link to this property</a>

"expired"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"initializing\_timed\_out"

<a href="#">Link to this property</a>

"validation\_timed\_out"

<a href="#">Link to this property</a>

"issuance\_timed\_out"

<a href="#">Link to this property</a>

"deployment\_timed\_out"

<a href="#">Link to this property</a>

"deletion\_timed\_out"

<a href="#">Link to this property</a>

"pending\_cleanup"

<a href="#">Link to this property</a>

"staging\_deployment"

<a href="#">Link to this property</a>

"staging\_active"

<a href="#">Link to this property</a>

"deactivating"

<a href="#">Link to this property</a>

"inactive"

<a href="#">Link to this property</a>

"backup\_issued"

<a href="#">Link to this property</a>

"holding\_deployment"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: optional <a href="https://developers.cloudflare.com/api/resources/custom_hostnames#(resource)%20custom_hostnames%20%3E%20(model)%20domain_validation_type%20%3E%20(schema)">DomainValidationType</a>

Level of validation to be used for this hostname. Domain validation (dv) must be used.

<a href="#">Link to this property</a>

uploaded\_on: optional string

The time the custom certificate was uploaded.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

validation\_errors: optional array of object {message }

Domain validation errors that have been received by the certificate authority (CA).

</summary>

message: optional string

A domain validation error.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

validation\_records: optional array of object {cname, cname\_target, emails, 5 more }

</summary>

cname: optional string

The CNAME record hostname for DCV delegation.

<a href="#">Link to this property</a>

cname\_target: optional string

The CNAME record target value for DCV delegation.

<a href="#">Link to this property</a>

emails: optional array of string

The set of email addresses that the certificate authority (CA) will use to complete domain validation.

<a href="#">Link to this property</a>

http\_body: optional string

The content that the certificate authority (CA) will expect to find at the http\_url during the domain validation.

<a href="#">Link to this property</a>

http\_url: optional string

The url that will be checked during domain validation.

<a href="#">Link to this property</a>

status: optional string

Status of the validation record.

<a href="#">Link to this property</a>

txt\_name: optional string

The hostname that the certificate authority (CA) will check for a TXT record during domain validation .

<a href="#">Link to this property</a>

txt\_value: optional string

The TXT record that the certificate authority (CA) will check during domain validation.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

wildcard: optional boolean

Indicates whether the certificate covers a wildcard.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "active"or "pending"or "active\_redeploying"or 13 more

Status of the hostname’s activation.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"active\_redeploying"

<a href="#">Link to this property</a>

"moved"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

"pending\_blocked"

<a href="#">Link to this property</a>

"pending\_migration"

<a href="#">Link to this property</a>

"pending\_provisioned"

<a href="#">Link to this property</a>

"test\_pending"

<a href="#">Link to this property</a>

"test\_active"

<a href="#">Link to this property</a>

"test\_active\_apex"

<a href="#">Link to this property</a>

"test\_blocked"

<a href="#">Link to this property</a>

"test\_failed"

<a href="#">Link to this property</a>

"provisioned"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

verification\_errors: optional array of string

These are errors that were encountered while trying to activate a hostname.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_hostnames%20%3E%20(model)%20custom_hostname%20%3E%20(schema)>)

<details>

<summary>

DCVMethod = "http"or "txt"or "email"

Domain control validation (DCV) method used for this hostname.

</summary>

One of the following:

"http"

<a href="#">Link to this property</a>

"txt"

<a href="#">Link to this property</a>

"email"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_hostnames%20%3E%20(model)%20dcv_method%20%3E%20(schema)>)

DomainValidationType = "dv"

Level of validation to be used for this hostname. Domain validation (dv) must be used.

[Link to this property](#)%20custom_hostnames%20%3E%20(model)%20domain_validation_type%20%3E%20(schema)>)

<details>

<summary>

CustomHostnameListResponse object {id, hostname, created\_at, 8 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

hostname: string

The custom hostname that will point to your hostname via CNAME.

maxLength255

<a href="#">Link to this property</a>

created\_at: optional string

This is the time the hostname was created.

formatdate-time

<a href="#">Link to this property</a>

custom\_metadata: optional map\[string]

Unique key/value metadata for this hostname. These are per-hostname (customer) settings.

<a href="#">Link to this property</a>

custom\_origin\_server: optional string

a valid hostname that’s been added to your DNS zone as an A, AAAA, or CNAME record.

<a href="#">Link to this property</a>

custom\_origin\_sni: optional string

A hostname that will be sent to your custom origin server as SNI for TLS handshake. This can be a valid subdomain of the zone or custom origin server name or the string ‘:request\_host\_header:’ which will cause the host header in the request to be used as SNI. Not configurable with default/fallback origin server.

<a href="#">Link to this property</a>

<details>

<summary>

ownership\_verification: optional object {name, type, value }

This is a record which can be placed to activate a hostname.

</summary>

name: optional string

DNS Name for record.

<a href="#">Link to this property</a>

type: optional "txt"

DNS Record type.

<a href="#">Link to this property</a>

value: optional string

Content for the record.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ownership\_verification\_http: optional object {http\_body, http\_url }

This presents the token to be served by the given http url to activate a hostname.

</summary>

http\_body: optional string

Token to be served.

<a href="#">Link to this property</a>

http\_url: optional string

The HTTP URL that will be checked during custom hostname verification and where the customer should host the token.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ssl: optional object {id, bundle\_method, certificate\_authority, 17 more }

</summary>

id: optional string

Custom hostname SSL identifier tag.

maxLength36

minLength36

<a href="#">Link to this property</a>

bundle\_method: optional <a href="https://developers.cloudflare.com/api/resources/custom_hostnames#(resource)%20custom_hostnames%20%3E%20(model)%20bundle_method%20%3E%20(schema)">BundleMethod</a>

A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An optimal bundle uses the shortest chain and newest intermediates. And the force bundle verifies the chain, but does not otherwise modify it.

<a href="#">Link to this property</a>

certificate\_authority: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20certificate_ca%20%3E%20(schema)">CertificateCA</a>

The Certificate Authority that will issue the certificate.

<a href="#">Link to this property</a>

custom\_certificate: optional string

If a custom uploaded certificate is used.

<a href="#">Link to this property</a>

custom\_csr\_id: optional string

The identifier for the Custom CSR that was used.

<a href="#">Link to this property</a>

custom\_key: optional string

The key for a custom uploaded certificate.

<a href="#">Link to this property</a>

<details>

<summary>

dcv\_delegation\_records: optional array of object {cname, cname\_target, emails, 5 more }

DCV Delegation records for domain validation.

</summary>

cname: optional string

The CNAME record hostname for DCV delegation.

<a href="#">Link to this property</a>

cname\_target: optional string

The CNAME record target value for DCV delegation.

<a href="#">Link to this property</a>

emails: optional array of string

The set of email addresses that the certificate authority (CA) will use to complete domain validation.

<a href="#">Link to this property</a>

http\_body: optional string

The content that the certificate authority (CA) will expect to find at the http\_url during the domain validation.

<a href="#">Link to this property</a>

http\_url: optional string

The url that will be checked during domain validation.

<a href="#">Link to this property</a>

status: optional string

Status of the validation record.

<a href="#">Link to this property</a>

txt\_name: optional string

The hostname that the certificate authority (CA) will check for a TXT record during domain validation .

<a href="#">Link to this property</a>

txt\_value: optional string

The TXT record that the certificate authority (CA) will check during domain validation.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

expires\_on: optional string

The time the custom certificate expires on.

formatdate-time

<a href="#">Link to this property</a>

hosts: optional array of string

A list of Hostnames on a custom uploaded certificate.

<a href="#">Link to this property</a>

issuer: optional string

The issuer on a custom uploaded certificate.

<a href="#">Link to this property</a>

method: optional <a href="https://developers.cloudflare.com/api/resources/custom_hostnames#(resource)%20custom_hostnames%20%3E%20(model)%20dcv_method%20%3E%20(schema)">DCVMethod</a>

Domain control validation (DCV) method used for this hostname.

<a href="#">Link to this property</a>

serial\_number: optional string

The serial number on a custom uploaded certificate.

<a href="#">Link to this property</a>

<details>

<summary>

settings: optional object {ciphers, early\_hints, http2, 2 more }

</summary>

ciphers: optional array of string

An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

<a href="#">Link to this property</a>

<details>

<summary>

early\_hints: optional "on"or "off"

Whether or not Early Hints is enabled.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

http2: optional "on"or "off"

Whether or not HTTP2 is enabled.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

min\_tls\_version: optional "1.0"or "1.1"or "1.2"or "1.3"

The minimum TLS version supported.

</summary>

One of the following:

"1.0"

<a href="#">Link to this property</a>

"1.1"

<a href="#">Link to this property</a>

"1.2"

<a href="#">Link to this property</a>

"1.3"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tls\_1\_3: optional "on"or "off"

Whether or not TLS 1.3 is enabled.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

signature: optional string

The signature on a custom uploaded certificate.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "initializing"or "pending\_validation"or "deleted"or 18 more

Status of the hostname’s SSL certificates.

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending\_validation"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

"pending\_issuance"

<a href="#">Link to this property</a>

"pending\_deployment"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"pending\_expiration"

<a href="#">Link to this property</a>

"expired"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"initializing\_timed\_out"

<a href="#">Link to this property</a>

"validation\_timed\_out"

<a href="#">Link to this property</a>

"issuance\_timed\_out"

<a href="#">Link to this property</a>

"deployment\_timed\_out"

<a href="#">Link to this property</a>

"deletion\_timed\_out"

<a href="#">Link to this property</a>

"pending\_cleanup"

<a href="#">Link to this property</a>

"staging\_deployment"

<a href="#">Link to this property</a>

"staging\_active"

<a href="#">Link to this property</a>

"deactivating"

<a href="#">Link to this property</a>

"inactive"

<a href="#">Link to this property</a>

"backup\_issued"

<a href="#">Link to this property</a>

"holding\_deployment"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: optional <a href="https://developers.cloudflare.com/api/resources/custom_hostnames#(resource)%20custom_hostnames%20%3E%20(model)%20domain_validation_type%20%3E%20(schema)">DomainValidationType</a>

Level of validation to be used for this hostname. Domain validation (dv) must be used.

<a href="#">Link to this property</a>

uploaded\_on: optional string

The time the custom certificate was uploaded.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

validation\_errors: optional array of object {message }

Domain validation errors that have been received by the certificate authority (CA).

</summary>

message: optional string

A domain validation error.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

validation\_records: optional array of object {cname, cname\_target, emails, 5 more }

</summary>

cname: optional string

The CNAME record hostname for DCV delegation.

<a href="#">Link to this property</a>

cname\_target: optional string

The CNAME record target value for DCV delegation.

<a href="#">Link to this property</a>

emails: optional array of string

The set of email addresses that the certificate authority (CA) will use to complete domain validation.

<a href="#">Link to this property</a>

http\_body: optional string

The content that the certificate authority (CA) will expect to find at the http\_url during the domain validation.

<a href="#">Link to this property</a>

http\_url: optional string

The url that will be checked during domain validation.

<a href="#">Link to this property</a>

status: optional string

Status of the validation record.

<a href="#">Link to this property</a>

txt\_name: optional string

The hostname that the certificate authority (CA) will check for a TXT record during domain validation .

<a href="#">Link to this property</a>

txt\_value: optional string

The TXT record that the certificate authority (CA) will check during domain validation.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

wildcard: optional boolean

Indicates whether the certificate covers a wildcard.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "active"or "pending"or "active\_redeploying"or 13 more

Status of the hostname’s activation.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"active\_redeploying"

<a href="#">Link to this property</a>

"moved"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

"pending\_blocked"

<a href="#">Link to this property</a>

"pending\_migration"

<a href="#">Link to this property</a>

"pending\_provisioned"

<a href="#">Link to this property</a>

"test\_pending"

<a href="#">Link to this property</a>

"test\_active"

<a href="#">Link to this property</a>

"test\_active\_apex"

<a href="#">Link to this property</a>

"test\_blocked"

<a href="#">Link to this property</a>

"test\_failed"

<a href="#">Link to this property</a>

"provisioned"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

verification\_errors: optional array of string

These are errors that were encountered while trying to activate a hostname.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_hostnames%20%3E%20(model)%20custom_hostname_list_response%20%3E%20(schema)>)

<details>

<summary>

CustomHostnameGetResponse object {id, hostname, created\_at, 8 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

hostname: string

The custom hostname that will point to your hostname via CNAME.

maxLength255

<a href="#">Link to this property</a>

created\_at: optional string

This is the time the hostname was created.

formatdate-time

<a href="#">Link to this property</a>

custom\_metadata: optional map\[string]

Unique key/value metadata for this hostname. These are per-hostname (customer) settings.

<a href="#">Link to this property</a>

custom\_origin\_server: optional string

a valid hostname that’s been added to your DNS zone as an A, AAAA, or CNAME record.

<a href="#">Link to this property</a>

custom\_origin\_sni: optional string

A hostname that will be sent to your custom origin server as SNI for TLS handshake. This can be a valid subdomain of the zone or custom origin server name or the string ‘:request\_host\_header:’ which will cause the host header in the request to be used as SNI. Not configurable with default/fallback origin server.

<a href="#">Link to this property</a>

<details>

<summary>

ownership\_verification: optional object {name, type, value }

This is a record which can be placed to activate a hostname.

</summary>

name: optional string

DNS Name for record.

<a href="#">Link to this property</a>

type: optional "txt"

DNS Record type.

<a href="#">Link to this property</a>

value: optional string

Content for the record.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ownership\_verification\_http: optional object {http\_body, http\_url }

This presents the token to be served by the given http url to activate a hostname.

</summary>

http\_body: optional string

Token to be served.

<a href="#">Link to this property</a>

http\_url: optional string

The HTTP URL that will be checked during custom hostname verification and where the customer should host the token.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ssl: optional object {id, bundle\_method, certificate\_authority, 17 more }

</summary>

id: optional string

Custom hostname SSL identifier tag.

maxLength36

minLength36

<a href="#">Link to this property</a>

bundle\_method: optional <a href="https://developers.cloudflare.com/api/resources/custom_hostnames#(resource)%20custom_hostnames%20%3E%20(model)%20bundle_method%20%3E%20(schema)">BundleMethod</a>

A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An optimal bundle uses the shortest chain and newest intermediates. And the force bundle verifies the chain, but does not otherwise modify it.

<a href="#">Link to this property</a>

certificate\_authority: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20certificate_ca%20%3E%20(schema)">CertificateCA</a>

The Certificate Authority that will issue the certificate.

<a href="#">Link to this property</a>

custom\_certificate: optional string

If a custom uploaded certificate is used.

<a href="#">Link to this property</a>

custom\_csr\_id: optional string

The identifier for the Custom CSR that was used.

<a href="#">Link to this property</a>

custom\_key: optional string

The key for a custom uploaded certificate.

<a href="#">Link to this property</a>

<details>

<summary>

dcv\_delegation\_records: optional array of object {cname, cname\_target, emails, 5 more }

DCV Delegation records for domain validation.

</summary>

cname: optional string

The CNAME record hostname for DCV delegation.

<a href="#">Link to this property</a>

cname\_target: optional string

The CNAME record target value for DCV delegation.

<a href="#">Link to this property</a>

emails: optional array of string

The set of email addresses that the certificate authority (CA) will use to complete domain validation.

<a href="#">Link to this property</a>

http\_body: optional string

The content that the certificate authority (CA) will expect to find at the http\_url during the domain validation.

<a href="#">Link to this property</a>

http\_url: optional string

The url that will be checked during domain validation.

<a href="#">Link to this property</a>

status: optional string

Status of the validation record.

<a href="#">Link to this property</a>

txt\_name: optional string

The hostname that the certificate authority (CA) will check for a TXT record during domain validation .

<a href="#">Link to this property</a>

txt\_value: optional string

The TXT record that the certificate authority (CA) will check during domain validation.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

expires\_on: optional string

The time the custom certificate expires on.

formatdate-time

<a href="#">Link to this property</a>

hosts: optional array of string

A list of Hostnames on a custom uploaded certificate.

<a href="#">Link to this property</a>

issuer: optional string

The issuer on a custom uploaded certificate.

<a href="#">Link to this property</a>

method: optional <a href="https://developers.cloudflare.com/api/resources/custom_hostnames#(resource)%20custom_hostnames%20%3E%20(model)%20dcv_method%20%3E%20(schema)">DCVMethod</a>

Domain control validation (DCV) method used for this hostname.

<a href="#">Link to this property</a>

serial\_number: optional string

The serial number on a custom uploaded certificate.

<a href="#">Link to this property</a>

<details>

<summary>

settings: optional object {ciphers, early\_hints, http2, 2 more }

</summary>

ciphers: optional array of string

An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

<a href="#">Link to this property</a>

<details>

<summary>

early\_hints: optional "on"or "off"

Whether or not Early Hints is enabled.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

http2: optional "on"or "off"

Whether or not HTTP2 is enabled.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

min\_tls\_version: optional "1.0"or "1.1"or "1.2"or "1.3"

The minimum TLS version supported.

</summary>

One of the following:

"1.0"

<a href="#">Link to this property</a>

"1.1"

<a href="#">Link to this property</a>

"1.2"

<a href="#">Link to this property</a>

"1.3"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tls\_1\_3: optional "on"or "off"

Whether or not TLS 1.3 is enabled.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

signature: optional string

The signature on a custom uploaded certificate.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "initializing"or "pending\_validation"or "deleted"or 18 more

Status of the hostname’s SSL certificates.

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending\_validation"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

"pending\_issuance"

<a href="#">Link to this property</a>

"pending\_deployment"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"pending\_expiration"

<a href="#">Link to this property</a>

"expired"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"initializing\_timed\_out"

<a href="#">Link to this property</a>

"validation\_timed\_out"

<a href="#">Link to this property</a>

"issuance\_timed\_out"

<a href="#">Link to this property</a>

"deployment\_timed\_out"

<a href="#">Link to this property</a>

"deletion\_timed\_out"

<a href="#">Link to this property</a>

"pending\_cleanup"

<a href="#">Link to this property</a>

"staging\_deployment"

<a href="#">Link to this property</a>

"staging\_active"

<a href="#">Link to this property</a>

"deactivating"

<a href="#">Link to this property</a>

"inactive"

<a href="#">Link to this property</a>

"backup\_issued"

<a href="#">Link to this property</a>

"holding\_deployment"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: optional <a href="https://developers.cloudflare.com/api/resources/custom_hostnames#(resource)%20custom_hostnames%20%3E%20(model)%20domain_validation_type%20%3E%20(schema)">DomainValidationType</a>

Level of validation to be used for this hostname. Domain validation (dv) must be used.

<a href="#">Link to this property</a>

uploaded\_on: optional string

The time the custom certificate was uploaded.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

validation\_errors: optional array of object {message }

Domain validation errors that have been received by the certificate authority (CA).

</summary>

message: optional string

A domain validation error.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

validation\_records: optional array of object {cname, cname\_target, emails, 5 more }

</summary>

cname: optional string

The CNAME record hostname for DCV delegation.

<a href="#">Link to this property</a>

cname\_target: optional string

The CNAME record target value for DCV delegation.

<a href="#">Link to this property</a>

emails: optional array of string

The set of email addresses that the certificate authority (CA) will use to complete domain validation.

<a href="#">Link to this property</a>

http\_body: optional string

The content that the certificate authority (CA) will expect to find at the http\_url during the domain validation.

<a href="#">Link to this property</a>

http\_url: optional string

The url that will be checked during domain validation.

<a href="#">Link to this property</a>

status: optional string

Status of the validation record.

<a href="#">Link to this property</a>

txt\_name: optional string

The hostname that the certificate authority (CA) will check for a TXT record during domain validation .

<a href="#">Link to this property</a>

txt\_value: optional string

The TXT record that the certificate authority (CA) will check during domain validation.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

wildcard: optional boolean

Indicates whether the certificate covers a wildcard.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "active"or "pending"or "active\_redeploying"or 13 more

Status of the hostname’s activation.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"active\_redeploying"

<a href="#">Link to this property</a>

"moved"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

"pending\_blocked"

<a href="#">Link to this property</a>

"pending\_migration"

<a href="#">Link to this property</a>

"pending\_provisioned"

<a href="#">Link to this property</a>

"test\_pending"

<a href="#">Link to this property</a>

"test\_active"

<a href="#">Link to this property</a>

"test\_active\_apex"

<a href="#">Link to this property</a>

"test\_blocked"

<a href="#">Link to this property</a>

"test\_failed"

<a href="#">Link to this property</a>

"provisioned"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

verification\_errors: optional array of string

These are errors that were encountered while trying to activate a hostname.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_hostnames%20%3E%20(model)%20custom_hostname_get_response%20%3E%20(schema)>)

<details>

<summary>

CustomHostnameCreateResponse object {id, hostname, created\_at, 8 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

hostname: string

The custom hostname that will point to your hostname via CNAME.

maxLength255

<a href="#">Link to this property</a>

created\_at: optional string

This is the time the hostname was created.

formatdate-time

<a href="#">Link to this property</a>

custom\_metadata: optional map\[string]

Unique key/value metadata for this hostname. These are per-hostname (customer) settings.

<a href="#">Link to this property</a>

custom\_origin\_server: optional string

a valid hostname that’s been added to your DNS zone as an A, AAAA, or CNAME record.

<a href="#">Link to this property</a>

custom\_origin\_sni: optional string

A hostname that will be sent to your custom origin server as SNI for TLS handshake. This can be a valid subdomain of the zone or custom origin server name or the string ‘:request\_host\_header:’ which will cause the host header in the request to be used as SNI. Not configurable with default/fallback origin server.

<a href="#">Link to this property</a>

<details>

<summary>

ownership\_verification: optional object {name, type, value }

This is a record which can be placed to activate a hostname.

</summary>

name: optional string

DNS Name for record.

<a href="#">Link to this property</a>

type: optional "txt"

DNS Record type.

<a href="#">Link to this property</a>

value: optional string

Content for the record.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ownership\_verification\_http: optional object {http\_body, http\_url }

This presents the token to be served by the given http url to activate a hostname.

</summary>

http\_body: optional string

Token to be served.

<a href="#">Link to this property</a>

http\_url: optional string

The HTTP URL that will be checked during custom hostname verification and where the customer should host the token.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ssl: optional object {id, bundle\_method, certificate\_authority, 17 more }

</summary>

id: optional string

Custom hostname SSL identifier tag.

maxLength36

minLength36

<a href="#">Link to this property</a>

bundle\_method: optional <a href="https://developers.cloudflare.com/api/resources/custom_hostnames#(resource)%20custom_hostnames%20%3E%20(model)%20bundle_method%20%3E%20(schema)">BundleMethod</a>

A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An optimal bundle uses the shortest chain and newest intermediates. And the force bundle verifies the chain, but does not otherwise modify it.

<a href="#">Link to this property</a>

certificate\_authority: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20certificate_ca%20%3E%20(schema)">CertificateCA</a>

The Certificate Authority that will issue the certificate.

<a href="#">Link to this property</a>

custom\_certificate: optional string

If a custom uploaded certificate is used.

<a href="#">Link to this property</a>

custom\_csr\_id: optional string

The identifier for the Custom CSR that was used.

<a href="#">Link to this property</a>

custom\_key: optional string

The key for a custom uploaded certificate.

<a href="#">Link to this property</a>

<details>

<summary>

dcv\_delegation\_records: optional array of object {cname, cname\_target, emails, 5 more }

DCV Delegation records for domain validation.

</summary>

cname: optional string

The CNAME record hostname for DCV delegation.

<a href="#">Link to this property</a>

cname\_target: optional string

The CNAME record target value for DCV delegation.

<a href="#">Link to this property</a>

emails: optional array of string

The set of email addresses that the certificate authority (CA) will use to complete domain validation.

<a href="#">Link to this property</a>

http\_body: optional string

The content that the certificate authority (CA) will expect to find at the http\_url during the domain validation.

<a href="#">Link to this property</a>

http\_url: optional string

The url that will be checked during domain validation.

<a href="#">Link to this property</a>

status: optional string

Status of the validation record.

<a href="#">Link to this property</a>

txt\_name: optional string

The hostname that the certificate authority (CA) will check for a TXT record during domain validation .

<a href="#">Link to this property</a>

txt\_value: optional string

The TXT record that the certificate authority (CA) will check during domain validation.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

expires\_on: optional string

The time the custom certificate expires on.

formatdate-time

<a href="#">Link to this property</a>

hosts: optional array of string

A list of Hostnames on a custom uploaded certificate.

<a href="#">Link to this property</a>

issuer: optional string

The issuer on a custom uploaded certificate.

<a href="#">Link to this property</a>

method: optional <a href="https://developers.cloudflare.com/api/resources/custom_hostnames#(resource)%20custom_hostnames%20%3E%20(model)%20dcv_method%20%3E%20(schema)">DCVMethod</a>

Domain control validation (DCV) method used for this hostname.

<a href="#">Link to this property</a>

serial\_number: optional string

The serial number on a custom uploaded certificate.

<a href="#">Link to this property</a>

<details>

<summary>

settings: optional object {ciphers, early\_hints, http2, 2 more }

</summary>

ciphers: optional array of string

An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

<a href="#">Link to this property</a>

<details>

<summary>

early\_hints: optional "on"or "off"

Whether or not Early Hints is enabled.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

http2: optional "on"or "off"

Whether or not HTTP2 is enabled.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

min\_tls\_version: optional "1.0"or "1.1"or "1.2"or "1.3"

The minimum TLS version supported.

</summary>

One of the following:

"1.0"

<a href="#">Link to this property</a>

"1.1"

<a href="#">Link to this property</a>

"1.2"

<a href="#">Link to this property</a>

"1.3"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tls\_1\_3: optional "on"or "off"

Whether or not TLS 1.3 is enabled.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

signature: optional string

The signature on a custom uploaded certificate.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "initializing"or "pending\_validation"or "deleted"or 18 more

Status of the hostname’s SSL certificates.

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending\_validation"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

"pending\_issuance"

<a href="#">Link to this property</a>

"pending\_deployment"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"pending\_expiration"

<a href="#">Link to this property</a>

"expired"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"initializing\_timed\_out"

<a href="#">Link to this property</a>

"validation\_timed\_out"

<a href="#">Link to this property</a>

"issuance\_timed\_out"

<a href="#">Link to this property</a>

"deployment\_timed\_out"

<a href="#">Link to this property</a>

"deletion\_timed\_out"

<a href="#">Link to this property</a>

"pending\_cleanup"

<a href="#">Link to this property</a>

"staging\_deployment"

<a href="#">Link to this property</a>

"staging\_active"

<a href="#">Link to this property</a>

"deactivating"

<a href="#">Link to this property</a>

"inactive"

<a href="#">Link to this property</a>

"backup\_issued"

<a href="#">Link to this property</a>

"holding\_deployment"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: optional <a href="https://developers.cloudflare.com/api/resources/custom_hostnames#(resource)%20custom_hostnames%20%3E%20(model)%20domain_validation_type%20%3E%20(schema)">DomainValidationType</a>

Level of validation to be used for this hostname. Domain validation (dv) must be used.

<a href="#">Link to this property</a>

uploaded\_on: optional string

The time the custom certificate was uploaded.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

validation\_errors: optional array of object {message }

Domain validation errors that have been received by the certificate authority (CA).

</summary>

message: optional string

A domain validation error.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

validation\_records: optional array of object {cname, cname\_target, emails, 5 more }

</summary>

cname: optional string

The CNAME record hostname for DCV delegation.

<a href="#">Link to this property</a>

cname\_target: optional string

The CNAME record target value for DCV delegation.

<a href="#">Link to this property</a>

emails: optional array of string

The set of email addresses that the certificate authority (CA) will use to complete domain validation.

<a href="#">Link to this property</a>

http\_body: optional string

The content that the certificate authority (CA) will expect to find at the http\_url during the domain validation.

<a href="#">Link to this property</a>

http\_url: optional string

The url that will be checked during domain validation.

<a href="#">Link to this property</a>

status: optional string

Status of the validation record.

<a href="#">Link to this property</a>

txt\_name: optional string

The hostname that the certificate authority (CA) will check for a TXT record during domain validation .

<a href="#">Link to this property</a>

txt\_value: optional string

The TXT record that the certificate authority (CA) will check during domain validation.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

wildcard: optional boolean

Indicates whether the certificate covers a wildcard.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "active"or "pending"or "active\_redeploying"or 13 more

Status of the hostname’s activation.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"active\_redeploying"

<a href="#">Link to this property</a>

"moved"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

"pending\_blocked"

<a href="#">Link to this property</a>

"pending\_migration"

<a href="#">Link to this property</a>

"pending\_provisioned"

<a href="#">Link to this property</a>

"test\_pending"

<a href="#">Link to this property</a>

"test\_active"

<a href="#">Link to this property</a>

"test\_active\_apex"

<a href="#">Link to this property</a>

"test\_blocked"

<a href="#">Link to this property</a>

"test\_failed"

<a href="#">Link to this property</a>

"provisioned"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

verification\_errors: optional array of string

These are errors that were encountered while trying to activate a hostname.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_hostnames%20%3E%20(model)%20custom_hostname_create_response%20%3E%20(schema)>)

<details>

<summary>

CustomHostnameEditResponse object {id, hostname, created\_at, 8 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

hostname: string

The custom hostname that will point to your hostname via CNAME.

maxLength255

<a href="#">Link to this property</a>

created\_at: optional string

This is the time the hostname was created.

formatdate-time

<a href="#">Link to this property</a>

custom\_metadata: optional map\[string]

Unique key/value metadata for this hostname. These are per-hostname (customer) settings.

<a href="#">Link to this property</a>

custom\_origin\_server: optional string

a valid hostname that’s been added to your DNS zone as an A, AAAA, or CNAME record.

<a href="#">Link to this property</a>

custom\_origin\_sni: optional string

A hostname that will be sent to your custom origin server as SNI for TLS handshake. This can be a valid subdomain of the zone or custom origin server name or the string ‘:request\_host\_header:’ which will cause the host header in the request to be used as SNI. Not configurable with default/fallback origin server.

<a href="#">Link to this property</a>

<details>

<summary>

ownership\_verification: optional object {name, type, value }

This is a record which can be placed to activate a hostname.

</summary>

name: optional string

DNS Name for record.

<a href="#">Link to this property</a>

type: optional "txt"

DNS Record type.

<a href="#">Link to this property</a>

value: optional string

Content for the record.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ownership\_verification\_http: optional object {http\_body, http\_url }

This presents the token to be served by the given http url to activate a hostname.

</summary>

http\_body: optional string

Token to be served.

<a href="#">Link to this property</a>

http\_url: optional string

The HTTP URL that will be checked during custom hostname verification and where the customer should host the token.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ssl: optional object {id, bundle\_method, certificate\_authority, 17 more }

</summary>

id: optional string

Custom hostname SSL identifier tag.

maxLength36

minLength36

<a href="#">Link to this property</a>

bundle\_method: optional <a href="https://developers.cloudflare.com/api/resources/custom_hostnames#(resource)%20custom_hostnames%20%3E%20(model)%20bundle_method%20%3E%20(schema)">BundleMethod</a>

A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An optimal bundle uses the shortest chain and newest intermediates. And the force bundle verifies the chain, but does not otherwise modify it.

<a href="#">Link to this property</a>

certificate\_authority: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20certificate_ca%20%3E%20(schema)">CertificateCA</a>

The Certificate Authority that will issue the certificate.

<a href="#">Link to this property</a>

custom\_certificate: optional string

If a custom uploaded certificate is used.

<a href="#">Link to this property</a>

custom\_csr\_id: optional string

The identifier for the Custom CSR that was used.

<a href="#">Link to this property</a>

custom\_key: optional string

The key for a custom uploaded certificate.

<a href="#">Link to this property</a>

<details>

<summary>

dcv\_delegation\_records: optional array of object {cname, cname\_target, emails, 5 more }

DCV Delegation records for domain validation.

</summary>

cname: optional string

The CNAME record hostname for DCV delegation.

<a href="#">Link to this property</a>

cname\_target: optional string

The CNAME record target value for DCV delegation.

<a href="#">Link to this property</a>

emails: optional array of string

The set of email addresses that the certificate authority (CA) will use to complete domain validation.

<a href="#">Link to this property</a>

http\_body: optional string

The content that the certificate authority (CA) will expect to find at the http\_url during the domain validation.

<a href="#">Link to this property</a>

http\_url: optional string

The url that will be checked during domain validation.

<a href="#">Link to this property</a>

status: optional string

Status of the validation record.

<a href="#">Link to this property</a>

txt\_name: optional string

The hostname that the certificate authority (CA) will check for a TXT record during domain validation .

<a href="#">Link to this property</a>

txt\_value: optional string

The TXT record that the certificate authority (CA) will check during domain validation.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

expires\_on: optional string

The time the custom certificate expires on.

formatdate-time

<a href="#">Link to this property</a>

hosts: optional array of string

A list of Hostnames on a custom uploaded certificate.

<a href="#">Link to this property</a>

issuer: optional string

The issuer on a custom uploaded certificate.

<a href="#">Link to this property</a>

method: optional <a href="https://developers.cloudflare.com/api/resources/custom_hostnames#(resource)%20custom_hostnames%20%3E%20(model)%20dcv_method%20%3E%20(schema)">DCVMethod</a>

Domain control validation (DCV) method used for this hostname.

<a href="#">Link to this property</a>

serial\_number: optional string

The serial number on a custom uploaded certificate.

<a href="#">Link to this property</a>

<details>

<summary>

settings: optional object {ciphers, early\_hints, http2, 2 more }

</summary>

ciphers: optional array of string

An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

<a href="#">Link to this property</a>

<details>

<summary>

early\_hints: optional "on"or "off"

Whether or not Early Hints is enabled.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

http2: optional "on"or "off"

Whether or not HTTP2 is enabled.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

min\_tls\_version: optional "1.0"or "1.1"or "1.2"or "1.3"

The minimum TLS version supported.

</summary>

One of the following:

"1.0"

<a href="#">Link to this property</a>

"1.1"

<a href="#">Link to this property</a>

"1.2"

<a href="#">Link to this property</a>

"1.3"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tls\_1\_3: optional "on"or "off"

Whether or not TLS 1.3 is enabled.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

signature: optional string

The signature on a custom uploaded certificate.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "initializing"or "pending\_validation"or "deleted"or 18 more

Status of the hostname’s SSL certificates.

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending\_validation"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

"pending\_issuance"

<a href="#">Link to this property</a>

"pending\_deployment"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"pending\_expiration"

<a href="#">Link to this property</a>

"expired"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"initializing\_timed\_out"

<a href="#">Link to this property</a>

"validation\_timed\_out"

<a href="#">Link to this property</a>

"issuance\_timed\_out"

<a href="#">Link to this property</a>

"deployment\_timed\_out"

<a href="#">Link to this property</a>

"deletion\_timed\_out"

<a href="#">Link to this property</a>

"pending\_cleanup"

<a href="#">Link to this property</a>

"staging\_deployment"

<a href="#">Link to this property</a>

"staging\_active"

<a href="#">Link to this property</a>

"deactivating"

<a href="#">Link to this property</a>

"inactive"

<a href="#">Link to this property</a>

"backup\_issued"

<a href="#">Link to this property</a>

"holding\_deployment"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: optional <a href="https://developers.cloudflare.com/api/resources/custom_hostnames#(resource)%20custom_hostnames%20%3E%20(model)%20domain_validation_type%20%3E%20(schema)">DomainValidationType</a>

Level of validation to be used for this hostname. Domain validation (dv) must be used.

<a href="#">Link to this property</a>

uploaded\_on: optional string

The time the custom certificate was uploaded.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

validation\_errors: optional array of object {message }

Domain validation errors that have been received by the certificate authority (CA).

</summary>

message: optional string

A domain validation error.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

validation\_records: optional array of object {cname, cname\_target, emails, 5 more }

</summary>

cname: optional string

The CNAME record hostname for DCV delegation.

<a href="#">Link to this property</a>

cname\_target: optional string

The CNAME record target value for DCV delegation.

<a href="#">Link to this property</a>

emails: optional array of string

The set of email addresses that the certificate authority (CA) will use to complete domain validation.

<a href="#">Link to this property</a>

http\_body: optional string

The content that the certificate authority (CA) will expect to find at the http\_url during the domain validation.

<a href="#">Link to this property</a>

http\_url: optional string

The url that will be checked during domain validation.

<a href="#">Link to this property</a>

status: optional string

Status of the validation record.

<a href="#">Link to this property</a>

txt\_name: optional string

The hostname that the certificate authority (CA) will check for a TXT record during domain validation .

<a href="#">Link to this property</a>

txt\_value: optional string

The TXT record that the certificate authority (CA) will check during domain validation.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

wildcard: optional boolean

Indicates whether the certificate covers a wildcard.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "active"or "pending"or "active\_redeploying"or 13 more

Status of the hostname’s activation.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"active\_redeploying"

<a href="#">Link to this property</a>

"moved"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

"pending\_blocked"

<a href="#">Link to this property</a>

"pending\_migration"

<a href="#">Link to this property</a>

"pending\_provisioned"

<a href="#">Link to this property</a>

"test\_pending"

<a href="#">Link to this property</a>

"test\_active"

<a href="#">Link to this property</a>

"test\_active\_apex"

<a href="#">Link to this property</a>

"test\_blocked"

<a href="#">Link to this property</a>

"test\_failed"

<a href="#">Link to this property</a>

"provisioned"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

verification\_errors: optional array of string

These are errors that were encountered while trying to activate a hostname.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_hostnames%20%3E%20(model)%20custom_hostname_edit_response%20%3E%20(schema)>)

<details>

<summary>

CustomHostnameDeleteResponse object {id }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_hostnames%20%3E%20(model)%20custom_hostname_delete_response%20%3E%20(schema)>)

#### Custom HostnamesFallback Origin

##### [Get Fallback Origin for Custom Hostnames](https://developers.cloudflare.com/api/resources/custom_hostnames/subresources/fallback_origin/methods/get)

GET/zones/{zone\_id}/custom\_hostnames/fallback\_origin

##### [Update Fallback Origin for Custom Hostnames](https://developers.cloudflare.com/api/resources/custom_hostnames/subresources/fallback_origin/methods/update)

PUT/zones/{zone\_id}/custom\_hostnames/fallback\_origin

##### [Delete Fallback Origin for Custom Hostnames](https://developers.cloudflare.com/api/resources/custom_hostnames/subresources/fallback_origin/methods/delete)

DELETE/zones/{zone\_id}/custom\_hostnames/fallback\_origin

##### ModelsExpand Collapse

<details>

<summary>

FallbackOriginGetResponse object {created\_at, errors, origin, 2 more }

</summary>

created\_at: optional string

This is the time the fallback origin was created.

formatdate-time

<a href="#">Link to this property</a>

errors: optional array of string

These are errors that were encountered while trying to activate a fallback origin.

<a href="#">Link to this property</a>

origin: optional string

Your origin hostname that requests to your custom hostnames will be sent to.

maxLength255

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "initializing"or "pending\_deployment"or "pending\_deletion"or 3 more

Status of the fallback origin’s activation.

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending\_deployment"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deployment\_timed\_out"

<a href="#">Link to this property</a>

"deletion\_timed\_out"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

This is the time the fallback origin was updated.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_hostnames.fallback_origin%20%3E%20(model)%20fallback_origin_get_response%20%3E%20(schema)>)

<details>

<summary>

FallbackOriginUpdateResponse object {created\_at, errors, origin, 2 more }

</summary>

created\_at: optional string

This is the time the fallback origin was created.

formatdate-time

<a href="#">Link to this property</a>

errors: optional array of string

These are errors that were encountered while trying to activate a fallback origin.

<a href="#">Link to this property</a>

origin: optional string

Your origin hostname that requests to your custom hostnames will be sent to.

maxLength255

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "initializing"or "pending\_deployment"or "pending\_deletion"or 3 more

Status of the fallback origin’s activation.

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending\_deployment"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deployment\_timed\_out"

<a href="#">Link to this property</a>

"deletion\_timed\_out"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

This is the time the fallback origin was updated.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_hostnames.fallback_origin%20%3E%20(model)%20fallback_origin_update_response%20%3E%20(schema)>)

<details>

<summary>

FallbackOriginDeleteResponse object {created\_at, errors, origin, 2 more }

</summary>

created\_at: optional string

This is the time the fallback origin was created.

formatdate-time

<a href="#">Link to this property</a>

errors: optional array of string

These are errors that were encountered while trying to activate a fallback origin.

<a href="#">Link to this property</a>

origin: optional string

Your origin hostname that requests to your custom hostnames will be sent to.

maxLength255

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "initializing"or "pending\_deployment"or "pending\_deletion"or 3 more

Status of the fallback origin’s activation.

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending\_deployment"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deployment\_timed\_out"

<a href="#">Link to this property</a>

"deletion\_timed\_out"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

This is the time the fallback origin was updated.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_hostnames.fallback_origin%20%3E%20(model)%20fallback_origin_delete_response%20%3E%20(schema)>)

#### Custom HostnamesCertificate Pack

#### Custom HostnamesCertificate PackCertificates

##### [Replace Custom Certificate and Custom Key In Custom Hostname](https://developers.cloudflare.com/api/resources/custom_hostnames/subresources/certificate_pack/subresources/certificates/methods/update)

PUT/zones/{zone\_id}/custom\_hostnames/{custom\_hostname\_id}/certificate\_pack/{certificate\_pack\_id}/certificates/{certificate\_id}

##### [Delete Single Certificate And Key For Custom Hostname](https://developers.cloudflare.com/api/resources/custom_hostnames/subresources/certificate_pack/subresources/certificates/methods/delete)

DELETE/zones/{zone\_id}/custom\_hostnames/{custom\_hostname\_id}/certificate\_pack/{certificate\_pack\_id}/certificates/{certificate\_id}

##### ModelsExpand Collapse

<details>

<summary>

CertificateUpdateResponse object {id, hostname, created\_at, 8 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

hostname: string

The custom hostname that will point to your hostname via CNAME.

maxLength255

<a href="#">Link to this property</a>

created\_at: optional string

This is the time the hostname was created.

formatdate-time

<a href="#">Link to this property</a>

custom\_metadata: optional map\[string]

Unique key/value metadata for this hostname. These are per-hostname (customer) settings.

<a href="#">Link to this property</a>

custom\_origin\_server: optional string

a valid hostname that’s been added to your DNS zone as an A, AAAA, or CNAME record.

<a href="#">Link to this property</a>

custom\_origin\_sni: optional string

A hostname that will be sent to your custom origin server as SNI for TLS handshake. This can be a valid subdomain of the zone or custom origin server name or the string ‘:request\_host\_header:’ which will cause the host header in the request to be used as SNI. Not configurable with default/fallback origin server.

<a href="#">Link to this property</a>

<details>

<summary>

ownership\_verification: optional object {name, type, value }

This is a record which can be placed to activate a hostname.

</summary>

name: optional string

DNS Name for record.

<a href="#">Link to this property</a>

type: optional "txt"

DNS Record type.

<a href="#">Link to this property</a>

value: optional string

Content for the record.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ownership\_verification\_http: optional object {http\_body, http\_url }

This presents the token to be served by the given http url to activate a hostname.

</summary>

http\_body: optional string

Token to be served.

<a href="#">Link to this property</a>

http\_url: optional string

The HTTP URL that will be checked during custom hostname verification and where the customer should host the token.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ssl: optional object {id, bundle\_method, certificate\_authority, 17 more }

</summary>

id: optional string

Custom hostname SSL identifier tag.

maxLength36

minLength36

<a href="#">Link to this property</a>

bundle\_method: optional <a href="https://developers.cloudflare.com/api/resources/custom_hostnames#(resource)%20custom_hostnames%20%3E%20(model)%20bundle_method%20%3E%20(schema)">BundleMethod</a>

A ubiquitous bundle has the highest probability of being verified everywhere, even by clients using outdated or unusual trust stores. An optimal bundle uses the shortest chain and newest intermediates. And the force bundle verifies the chain, but does not otherwise modify it.

<a href="#">Link to this property</a>

certificate\_authority: optional <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20certificate_ca%20%3E%20(schema)">CertificateCA</a>

The Certificate Authority that will issue the certificate.

<a href="#">Link to this property</a>

custom\_certificate: optional string

If a custom uploaded certificate is used.

<a href="#">Link to this property</a>

custom\_csr\_id: optional string

The identifier for the Custom CSR that was used.

<a href="#">Link to this property</a>

custom\_key: optional string

The key for a custom uploaded certificate.

<a href="#">Link to this property</a>

<details>

<summary>

dcv\_delegation\_records: optional array of object {cname, cname\_target, emails, 5 more }

DCV Delegation records for domain validation.

</summary>

cname: optional string

The CNAME record hostname for DCV delegation.

<a href="#">Link to this property</a>

cname\_target: optional string

The CNAME record target value for DCV delegation.

<a href="#">Link to this property</a>

emails: optional array of string

The set of email addresses that the certificate authority (CA) will use to complete domain validation.

<a href="#">Link to this property</a>

http\_body: optional string

The content that the certificate authority (CA) will expect to find at the http\_url during the domain validation.

<a href="#">Link to this property</a>

http\_url: optional string

The url that will be checked during domain validation.

<a href="#">Link to this property</a>

status: optional string

Status of the validation record.

<a href="#">Link to this property</a>

txt\_name: optional string

The hostname that the certificate authority (CA) will check for a TXT record during domain validation .

<a href="#">Link to this property</a>

txt\_value: optional string

The TXT record that the certificate authority (CA) will check during domain validation.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

expires\_on: optional string

The time the custom certificate expires on.

formatdate-time

<a href="#">Link to this property</a>

hosts: optional array of string

A list of Hostnames on a custom uploaded certificate.

<a href="#">Link to this property</a>

issuer: optional string

The issuer on a custom uploaded certificate.

<a href="#">Link to this property</a>

method: optional <a href="https://developers.cloudflare.com/api/resources/custom_hostnames#(resource)%20custom_hostnames%20%3E%20(model)%20dcv_method%20%3E%20(schema)">DCVMethod</a>

Domain control validation (DCV) method used for this hostname.

<a href="#">Link to this property</a>

serial\_number: optional string

The serial number on a custom uploaded certificate.

<a href="#">Link to this property</a>

<details>

<summary>

settings: optional object {ciphers, early\_hints, http2, 2 more }

</summary>

ciphers: optional array of string

An allowlist of ciphers for TLS termination. These ciphers must be in the BoringSSL format.

<a href="#">Link to this property</a>

<details>

<summary>

early\_hints: optional "on"or "off"

Whether or not Early Hints is enabled.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

http2: optional "on"or "off"

Whether or not HTTP2 is enabled.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

min\_tls\_version: optional "1.0"or "1.1"or "1.2"or "1.3"

The minimum TLS version supported.

</summary>

One of the following:

"1.0"

<a href="#">Link to this property</a>

"1.1"

<a href="#">Link to this property</a>

"1.2"

<a href="#">Link to this property</a>

"1.3"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tls\_1\_3: optional "on"or "off"

Whether or not TLS 1.3 is enabled.

</summary>

One of the following:

"on"

<a href="#">Link to this property</a>

"off"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

signature: optional string

The signature on a custom uploaded certificate.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "initializing"or "pending\_validation"or "deleted"or 18 more

Status of the hostname’s SSL certificates.

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending\_validation"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

"pending\_issuance"

<a href="#">Link to this property</a>

"pending\_deployment"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"pending\_expiration"

<a href="#">Link to this property</a>

"expired"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"initializing\_timed\_out"

<a href="#">Link to this property</a>

"validation\_timed\_out"

<a href="#">Link to this property</a>

"issuance\_timed\_out"

<a href="#">Link to this property</a>

"deployment\_timed\_out"

<a href="#">Link to this property</a>

"deletion\_timed\_out"

<a href="#">Link to this property</a>

"pending\_cleanup"

<a href="#">Link to this property</a>

"staging\_deployment"

<a href="#">Link to this property</a>

"staging\_active"

<a href="#">Link to this property</a>

"deactivating"

<a href="#">Link to this property</a>

"inactive"

<a href="#">Link to this property</a>

"backup\_issued"

<a href="#">Link to this property</a>

"holding\_deployment"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

type: optional <a href="https://developers.cloudflare.com/api/resources/custom_hostnames#(resource)%20custom_hostnames%20%3E%20(model)%20domain_validation_type%20%3E%20(schema)">DomainValidationType</a>

Level of validation to be used for this hostname. Domain validation (dv) must be used.

<a href="#">Link to this property</a>

uploaded\_on: optional string

The time the custom certificate was uploaded.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

validation\_errors: optional array of object {message }

Domain validation errors that have been received by the certificate authority (CA).

</summary>

message: optional string

A domain validation error.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

validation\_records: optional array of object {cname, cname\_target, emails, 5 more }

</summary>

cname: optional string

The CNAME record hostname for DCV delegation.

<a href="#">Link to this property</a>

cname\_target: optional string

The CNAME record target value for DCV delegation.

<a href="#">Link to this property</a>

emails: optional array of string

The set of email addresses that the certificate authority (CA) will use to complete domain validation.

<a href="#">Link to this property</a>

http\_body: optional string

The content that the certificate authority (CA) will expect to find at the http\_url during the domain validation.

<a href="#">Link to this property</a>

http\_url: optional string

The url that will be checked during domain validation.

<a href="#">Link to this property</a>

status: optional string

Status of the validation record.

<a href="#">Link to this property</a>

txt\_name: optional string

The hostname that the certificate authority (CA) will check for a TXT record during domain validation .

<a href="#">Link to this property</a>

txt\_value: optional string

The TXT record that the certificate authority (CA) will check during domain validation.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

wildcard: optional boolean

Indicates whether the certificate covers a wildcard.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "active"or "pending"or "active\_redeploying"or 13 more

Status of the hostname’s activation.

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"active\_redeploying"

<a href="#">Link to this property</a>

"moved"

<a href="#">Link to this property</a>

"pending\_deletion"

<a href="#">Link to this property</a>

"deleted"

<a href="#">Link to this property</a>

"pending\_blocked"

<a href="#">Link to this property</a>

"pending\_migration"

<a href="#">Link to this property</a>

"pending\_provisioned"

<a href="#">Link to this property</a>

"test\_pending"

<a href="#">Link to this property</a>

"test\_active"

<a href="#">Link to this property</a>

"test\_active\_apex"

<a href="#">Link to this property</a>

"test\_blocked"

<a href="#">Link to this property</a>

"test\_failed"

<a href="#">Link to this property</a>

"provisioned"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

verification\_errors: optional array of string

These are errors that were encountered while trying to activate a hostname.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_hostnames.certificate_pack.certificates%20%3E%20(model)%20certificate_update_response%20%3E%20(schema)>)

<details>

<summary>

CertificateDeleteResponse object {id }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_hostnames.certificate_pack.certificates%20%3E%20(model)%20certificate_delete_response%20%3E%20(schema)>)

#### Custom HostnamesQuota

##### [Get Custom Hostname Quota](https://developers.cloudflare.com/api/resources/custom_hostnames/subresources/quota/methods/get)

GET/zones/{zone\_id}/custom\_hostnames/quota

##### ModelsExpand Collapse

<details>

<summary>

QuotaGetResponse object {allocated, exceeded, hard\_cap, used }

</summary>

allocated: number

The allocated custom hostname quota.

formatint64

<a href="#">Link to this property</a>

exceeded: boolean

Whether the current usage has exceeded the allocated quota.

<a href="#">Link to this property</a>

hard\_cap: number

The maximum number of custom hostnames allowed before create requests are rejected.

formatint64

<a href="#">Link to this property</a>

used: number

The number of custom hostnames currently in use.

formatint64

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_hostnames.quota%20%3E%20(model)%20quota_get_response%20%3E%20(schema)>)