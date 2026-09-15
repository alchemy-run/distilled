---
title: SSL
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# SSL

#### SSLAnalyze

##### [Analyze Certificate](https://developers.cloudflare.com/api/resources/ssl/subresources/analyze/methods/create)

POST/zones/{zone\_id}/ssl/analyze

##### ModelsExpand Collapse

AnalyzeCreateResponse = unknown

[Link to this property](#)%20ssl.analyze%20%3E%20(model)%20analyze_create_response%20%3E%20(schema)>)

#### SSLCertificate Packs

##### [List Certificate Packs](https://developers.cloudflare.com/api/resources/ssl/subresources/certificate_packs/methods/list)

GET/zones/{zone\_id}/ssl/certificate\_packs

##### [Get Certificate Pack](https://developers.cloudflare.com/api/resources/ssl/subresources/certificate_packs/methods/get)

GET/zones/{zone\_id}/ssl/certificate\_packs/{certificate\_pack\_id}

##### [Order Advanced Certificate Manager Certificate Pack](https://developers.cloudflare.com/api/resources/ssl/subresources/certificate_packs/methods/create)

POST/zones/{zone\_id}/ssl/certificate\_packs/order

##### [Restart Validation or Update Advanced Certificate Manager Certificate Pack](https://developers.cloudflare.com/api/resources/ssl/subresources/certificate_packs/methods/edit)

PATCH/zones/{zone\_id}/ssl/certificate\_packs/{certificate\_pack\_id}

##### [Delete Advanced Certificate Manager Certificate Pack](https://developers.cloudflare.com/api/resources/ssl/subresources/certificate_packs/methods/delete)

DELETE/zones/{zone\_id}/ssl/certificate\_packs/{certificate\_pack\_id}

##### ModelsExpand Collapse

Host = string

[Link to this property](#)%20ssl.certificate_packs%20%3E%20(model)%20host%20%3E%20(schema)>)

<details>

<summary>

RequestValidity = 7or 30or 90or 4 more

The number of days for which the certificate should be valid.

</summary>

One of the following:

7

<a href="#">Link to this property</a>

30

<a href="#">Link to this property</a>

90

<a href="#">Link to this property</a>

365

<a href="#">Link to this property</a>

730

<a href="#">Link to this property</a>

1095

<a href="#">Link to this property</a>

5475

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ssl.certificate_packs%20%3E%20(model)%20request_validity%20%3E%20(schema)>)

<details>

<summary>

Status = "initializing"or "pending\_validation"or "deleted"or 18 more

Status of certificate pack.

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

[Link to this property](#)%20ssl.certificate_packs%20%3E%20(model)%20status%20%3E%20(schema)>)

<details>

<summary>

ValidationMethod = "http"or "cname"or "txt"

Validation method in use for a certificate pack order.

</summary>

One of the following:

"http"

<a href="#">Link to this property</a>

"cname"

<a href="#">Link to this property</a>

"txt"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ssl.certificate_packs%20%3E%20(model)%20validation_method%20%3E%20(schema)>)

<details>

<summary>

CertificatePackListResponse object {id, certificates, hosts, 10 more }

A certificate pack with all its properties.

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

certificates: array of object {id, hosts, status, 9 more }

Array of certificates in this pack.

</summary>

id: string

Certificate identifier.

<a href="#">Link to this property</a>

hosts: array of string

Hostnames covered by this certificate.

<a href="#">Link to this property</a>

status: string

Certificate status.

<a href="#">Link to this property</a>

bundle\_method: optional string

Certificate bundle method.

<a href="#">Link to this property</a>

expires\_on: optional string

When the certificate from the authority expires.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

geo\_restrictions: optional object {label }

Specify the region where your private key can be held locally.

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

<a href="#">Link to this property</a>

issuer: optional string

The certificate authority that issued the certificate.

<a href="#">Link to this property</a>

modified\_on: optional string

When the certificate was last modified.

formatdate-time

<a href="#">Link to this property</a>

priority: optional number

The order/priority in which the certificate will be used.

<a href="#">Link to this property</a>

signature: optional string

The type of hash used for the certificate.

<a href="#">Link to this property</a>

uploaded\_on: optional string

When the certificate was uploaded to Cloudflare.

formatdate-time

<a href="#">Link to this property</a>

zone\_id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

hosts: array of <a href="https://developers.cloudflare.com/api/resources/ssl#(resource)%20ssl.certificate_packs%20%3E%20(model)%20host%20%3E%20(schema)">Host</a>

Comma separated list of valid host names for the certificate packs. Must contain the zone apex, may not contain more than 50 hosts, and may not be empty.

<a href="#">Link to this property</a>

status: <a href="https://developers.cloudflare.com/api/resources/ssl#(resource)%20ssl.certificate_packs%20%3E%20(model)%20status%20%3E%20(schema)">Status</a>

Status of certificate pack.

<a href="#">Link to this property</a>

<details>

<summary>

type: "mh\_custom"or "managed\_hostname"or "sni\_custom"or 5 more

Type of certificate pack.

</summary>

One of the following:

"mh\_custom"

<a href="#">Link to this property</a>

"managed\_hostname"

<a href="#">Link to this property</a>

"sni\_custom"

<a href="#">Link to this property</a>

"universal"

<a href="#">Link to this property</a>

"advanced"

<a href="#">Link to this property</a>

"total\_tls"

<a href="#">Link to this property</a>

"keyless"

<a href="#">Link to this property</a>

"legacy\_custom"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

certificate\_authority: optional "google"or "lets\_encrypt"or "ssl\_com"

Certificate Authority selected for the order. For information on any certificate authority specific details or restrictions <a href="https://developers.cloudflare.com/ssl/reference/certificate-authorities">see this page for more details</a>.

</summary>

One of the following:

"google"

<a href="#">Link to this property</a>

"lets\_encrypt"

<a href="#">Link to this property</a>

"ssl\_com"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cloudflare\_branding: optional boolean

Whether or not to add Cloudflare Branding for the order. This will add a subdomain of sni.cloudflaressl.com as the Common Name if set to true.

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

primary\_certificate: optional string

Identifier of the primary certificate in a pack.

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

validation\_method: optional "txt"or "http"or "email"

Validation Method selected for the order.

</summary>

One of the following:

"txt"

<a href="#">Link to this property</a>

"http"

<a href="#">Link to this property</a>

"email"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

validation\_records: optional array of object {cname, cname\_target, emails, 5 more }

Certificates’ validation records.

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

<details>

<summary>

validity\_days: optional 14or 30or 90or 365

Validity Days selected for the order.

</summary>

One of the following:

14

<a href="#">Link to this property</a>

30

<a href="#">Link to this property</a>

90

<a href="#">Link to this property</a>

365

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ssl.certificate_packs%20%3E%20(model)%20certificate_pack_list_response%20%3E%20(schema)>)

<details>

<summary>

CertificatePackGetResponse object {id, certificates, hosts, 10 more }

A certificate pack with all its properties.

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

certificates: array of object {id, hosts, status, 9 more }

Array of certificates in this pack.

</summary>

id: string

Certificate identifier.

<a href="#">Link to this property</a>

hosts: array of string

Hostnames covered by this certificate.

<a href="#">Link to this property</a>

status: string

Certificate status.

<a href="#">Link to this property</a>

bundle\_method: optional string

Certificate bundle method.

<a href="#">Link to this property</a>

expires\_on: optional string

When the certificate from the authority expires.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

geo\_restrictions: optional object {label }

Specify the region where your private key can be held locally.

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

<a href="#">Link to this property</a>

issuer: optional string

The certificate authority that issued the certificate.

<a href="#">Link to this property</a>

modified\_on: optional string

When the certificate was last modified.

formatdate-time

<a href="#">Link to this property</a>

priority: optional number

The order/priority in which the certificate will be used.

<a href="#">Link to this property</a>

signature: optional string

The type of hash used for the certificate.

<a href="#">Link to this property</a>

uploaded\_on: optional string

When the certificate was uploaded to Cloudflare.

formatdate-time

<a href="#">Link to this property</a>

zone\_id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

hosts: array of <a href="https://developers.cloudflare.com/api/resources/ssl#(resource)%20ssl.certificate_packs%20%3E%20(model)%20host%20%3E%20(schema)">Host</a>

Comma separated list of valid host names for the certificate packs. Must contain the zone apex, may not contain more than 50 hosts, and may not be empty.

<a href="#">Link to this property</a>

status: <a href="https://developers.cloudflare.com/api/resources/ssl#(resource)%20ssl.certificate_packs%20%3E%20(model)%20status%20%3E%20(schema)">Status</a>

Status of certificate pack.

<a href="#">Link to this property</a>

<details>

<summary>

type: "mh\_custom"or "managed\_hostname"or "sni\_custom"or 5 more

Type of certificate pack.

</summary>

One of the following:

"mh\_custom"

<a href="#">Link to this property</a>

"managed\_hostname"

<a href="#">Link to this property</a>

"sni\_custom"

<a href="#">Link to this property</a>

"universal"

<a href="#">Link to this property</a>

"advanced"

<a href="#">Link to this property</a>

"total\_tls"

<a href="#">Link to this property</a>

"keyless"

<a href="#">Link to this property</a>

"legacy\_custom"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

certificate\_authority: optional "google"or "lets\_encrypt"or "ssl\_com"

Certificate Authority selected for the order. For information on any certificate authority specific details or restrictions <a href="https://developers.cloudflare.com/ssl/reference/certificate-authorities">see this page for more details</a>.

</summary>

One of the following:

"google"

<a href="#">Link to this property</a>

"lets\_encrypt"

<a href="#">Link to this property</a>

"ssl\_com"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cloudflare\_branding: optional boolean

Whether or not to add Cloudflare Branding for the order. This will add a subdomain of sni.cloudflaressl.com as the Common Name if set to true.

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

primary\_certificate: optional string

Identifier of the primary certificate in a pack.

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

validation\_method: optional "txt"or "http"or "email"

Validation Method selected for the order.

</summary>

One of the following:

"txt"

<a href="#">Link to this property</a>

"http"

<a href="#">Link to this property</a>

"email"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

validation\_records: optional array of object {cname, cname\_target, emails, 5 more }

Certificates’ validation records.

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

<details>

<summary>

validity\_days: optional 14or 30or 90or 365

Validity Days selected for the order.

</summary>

One of the following:

14

<a href="#">Link to this property</a>

30

<a href="#">Link to this property</a>

90

<a href="#">Link to this property</a>

365

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ssl.certificate_packs%20%3E%20(model)%20certificate_pack_get_response%20%3E%20(schema)>)

<details>

<summary>

CertificatePackCreateResponse object {id, certificates, hosts, 10 more }

A certificate pack with all its properties.

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

certificates: array of object {id, hosts, status, 9 more }

Array of certificates in this pack.

</summary>

id: string

Certificate identifier.

<a href="#">Link to this property</a>

hosts: array of string

Hostnames covered by this certificate.

<a href="#">Link to this property</a>

status: string

Certificate status.

<a href="#">Link to this property</a>

bundle\_method: optional string

Certificate bundle method.

<a href="#">Link to this property</a>

expires\_on: optional string

When the certificate from the authority expires.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

geo\_restrictions: optional object {label }

Specify the region where your private key can be held locally.

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

<a href="#">Link to this property</a>

issuer: optional string

The certificate authority that issued the certificate.

<a href="#">Link to this property</a>

modified\_on: optional string

When the certificate was last modified.

formatdate-time

<a href="#">Link to this property</a>

priority: optional number

The order/priority in which the certificate will be used.

<a href="#">Link to this property</a>

signature: optional string

The type of hash used for the certificate.

<a href="#">Link to this property</a>

uploaded\_on: optional string

When the certificate was uploaded to Cloudflare.

formatdate-time

<a href="#">Link to this property</a>

zone\_id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

hosts: array of <a href="https://developers.cloudflare.com/api/resources/ssl#(resource)%20ssl.certificate_packs%20%3E%20(model)%20host%20%3E%20(schema)">Host</a>

Comma separated list of valid host names for the certificate packs. Must contain the zone apex, may not contain more than 50 hosts, and may not be empty.

<a href="#">Link to this property</a>

status: <a href="https://developers.cloudflare.com/api/resources/ssl#(resource)%20ssl.certificate_packs%20%3E%20(model)%20status%20%3E%20(schema)">Status</a>

Status of certificate pack.

<a href="#">Link to this property</a>

<details>

<summary>

type: "mh\_custom"or "managed\_hostname"or "sni\_custom"or 5 more

Type of certificate pack.

</summary>

One of the following:

"mh\_custom"

<a href="#">Link to this property</a>

"managed\_hostname"

<a href="#">Link to this property</a>

"sni\_custom"

<a href="#">Link to this property</a>

"universal"

<a href="#">Link to this property</a>

"advanced"

<a href="#">Link to this property</a>

"total\_tls"

<a href="#">Link to this property</a>

"keyless"

<a href="#">Link to this property</a>

"legacy\_custom"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

certificate\_authority: optional "google"or "lets\_encrypt"or "ssl\_com"

Certificate Authority selected for the order. For information on any certificate authority specific details or restrictions <a href="https://developers.cloudflare.com/ssl/reference/certificate-authorities">see this page for more details</a>.

</summary>

One of the following:

"google"

<a href="#">Link to this property</a>

"lets\_encrypt"

<a href="#">Link to this property</a>

"ssl\_com"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cloudflare\_branding: optional boolean

Whether or not to add Cloudflare Branding for the order. This will add a subdomain of sni.cloudflaressl.com as the Common Name if set to true.

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

primary\_certificate: optional string

Identifier of the primary certificate in a pack.

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

validation\_method: optional "txt"or "http"or "email"

Validation Method selected for the order.

</summary>

One of the following:

"txt"

<a href="#">Link to this property</a>

"http"

<a href="#">Link to this property</a>

"email"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

validation\_records: optional array of object {cname, cname\_target, emails, 5 more }

Certificates’ validation records.

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

<details>

<summary>

validity\_days: optional 14or 30or 90or 365

Validity Days selected for the order.

</summary>

One of the following:

14

<a href="#">Link to this property</a>

30

<a href="#">Link to this property</a>

90

<a href="#">Link to this property</a>

365

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ssl.certificate_packs%20%3E%20(model)%20certificate_pack_create_response%20%3E%20(schema)>)

<details>

<summary>

CertificatePackEditResponse object {id, certificates, hosts, 10 more }

A certificate pack with all its properties.

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

certificates: array of object {id, hosts, status, 9 more }

Array of certificates in this pack.

</summary>

id: string

Certificate identifier.

<a href="#">Link to this property</a>

hosts: array of string

Hostnames covered by this certificate.

<a href="#">Link to this property</a>

status: string

Certificate status.

<a href="#">Link to this property</a>

bundle\_method: optional string

Certificate bundle method.

<a href="#">Link to this property</a>

expires\_on: optional string

When the certificate from the authority expires.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

geo\_restrictions: optional object {label }

Specify the region where your private key can be held locally.

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

<a href="#">Link to this property</a>

issuer: optional string

The certificate authority that issued the certificate.

<a href="#">Link to this property</a>

modified\_on: optional string

When the certificate was last modified.

formatdate-time

<a href="#">Link to this property</a>

priority: optional number

The order/priority in which the certificate will be used.

<a href="#">Link to this property</a>

signature: optional string

The type of hash used for the certificate.

<a href="#">Link to this property</a>

uploaded\_on: optional string

When the certificate was uploaded to Cloudflare.

formatdate-time

<a href="#">Link to this property</a>

zone\_id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

hosts: array of <a href="https://developers.cloudflare.com/api/resources/ssl#(resource)%20ssl.certificate_packs%20%3E%20(model)%20host%20%3E%20(schema)">Host</a>

Comma separated list of valid host names for the certificate packs. Must contain the zone apex, may not contain more than 50 hosts, and may not be empty.

<a href="#">Link to this property</a>

status: <a href="https://developers.cloudflare.com/api/resources/ssl#(resource)%20ssl.certificate_packs%20%3E%20(model)%20status%20%3E%20(schema)">Status</a>

Status of certificate pack.

<a href="#">Link to this property</a>

<details>

<summary>

type: "mh\_custom"or "managed\_hostname"or "sni\_custom"or 5 more

Type of certificate pack.

</summary>

One of the following:

"mh\_custom"

<a href="#">Link to this property</a>

"managed\_hostname"

<a href="#">Link to this property</a>

"sni\_custom"

<a href="#">Link to this property</a>

"universal"

<a href="#">Link to this property</a>

"advanced"

<a href="#">Link to this property</a>

"total\_tls"

<a href="#">Link to this property</a>

"keyless"

<a href="#">Link to this property</a>

"legacy\_custom"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

certificate\_authority: optional "google"or "lets\_encrypt"or "ssl\_com"

Certificate Authority selected for the order. For information on any certificate authority specific details or restrictions <a href="https://developers.cloudflare.com/ssl/reference/certificate-authorities">see this page for more details</a>.

</summary>

One of the following:

"google"

<a href="#">Link to this property</a>

"lets\_encrypt"

<a href="#">Link to this property</a>

"ssl\_com"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cloudflare\_branding: optional boolean

Whether or not to add Cloudflare Branding for the order. This will add a subdomain of sni.cloudflaressl.com as the Common Name if set to true.

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

primary\_certificate: optional string

Identifier of the primary certificate in a pack.

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

validation\_method: optional "txt"or "http"or "email"

Validation Method selected for the order.

</summary>

One of the following:

"txt"

<a href="#">Link to this property</a>

"http"

<a href="#">Link to this property</a>

"email"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

validation\_records: optional array of object {cname, cname\_target, emails, 5 more }

Certificates’ validation records.

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

<details>

<summary>

validity\_days: optional 14or 30or 90or 365

Validity Days selected for the order.

</summary>

One of the following:

14

<a href="#">Link to this property</a>

30

<a href="#">Link to this property</a>

90

<a href="#">Link to this property</a>

365

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ssl.certificate_packs%20%3E%20(model)%20certificate_pack_edit_response%20%3E%20(schema)>)

<details>

<summary>

CertificatePackDeleteResponse object {id }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ssl.certificate_packs%20%3E%20(model)%20certificate_pack_delete_response%20%3E%20(schema)>)

#### SSLCertificate PacksQuota

##### [Get Certificate Pack Quotas](https://developers.cloudflare.com/api/resources/ssl/subresources/certificate_packs/subresources/quota/methods/get)

GET/zones/{zone\_id}/ssl/certificate\_packs/quota

##### ModelsExpand Collapse

<details>

<summary>

QuotaGetResponse object {advanced }

</summary>

<details>

<summary>

advanced: optional object {allocated, used }

</summary>

allocated: optional number

Quantity Allocated.

<a href="#">Link to this property</a>

used: optional number

Quantity Used.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ssl.certificate_packs.quota%20%3E%20(model)%20quota_get_response%20%3E%20(schema)>)

#### SSLRecommendations

##### [SSL/TLS Recommendation](https://developers.cloudflare.com/api/resources/ssl/subresources/recommendations/methods/get)

Deprecated

GET/zones/{zone\_id}/ssl/recommendation

##### ModelsExpand Collapse

<details>

<summary>

RecommendationGetResponse object {id, editable, modified\_on, 2 more }

</summary>

id: string

<a href="#">Link to this property</a>

editable: boolean

Whether this setting can be updated or not.

<a href="#">Link to this property</a>

modified\_on: string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

value: "auto"or "custom"

Current setting of the automatic SSL/TLS.

</summary>

One of the following:

"auto"

<a href="#">Link to this property</a>

"custom"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

next\_scheduled\_scan: optional string

Next time this zone will be scanned by the Automatic SSL/TLS.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ssl.recommendations%20%3E%20(model)%20recommendation_get_response%20%3E%20(schema)>)

#### SSLAutomatic Upgrader

##### [Get Automatic SSL/TLS enrollment status for the given zone](https://developers.cloudflare.com/api/resources/ssl/subresources/automatic_upgrader/methods/get)

GET/zones/{zone\_id}/settings/ssl\_automatic\_mode

##### [Patch Automatic SSL/TLS Enrollment status for given zone](https://developers.cloudflare.com/api/resources/ssl/subresources/automatic_upgrader/methods/patch)

PATCH/zones/{zone\_id}/settings/ssl\_automatic\_mode

##### ModelsExpand Collapse

<details>

<summary>

AutomaticUpgraderGetResponse object {id, editable, modified\_on, 2 more }

</summary>

id: string

<a href="#">Link to this property</a>

editable: boolean

Whether this setting can be updated or not.

<a href="#">Link to this property</a>

modified\_on: string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

value: "auto"or "custom"

Current setting of the automatic SSL/TLS.

</summary>

One of the following:

"auto"

<a href="#">Link to this property</a>

"custom"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

next\_scheduled\_scan: optional string

Next time this zone will be scanned by the Automatic SSL/TLS.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ssl.automatic_upgrader%20%3E%20(model)%20automatic_upgrader_get_response%20%3E%20(schema)>)

<details>

<summary>

AutomaticUpgraderPatchResponse object {id, editable, modified\_on, 2 more }

</summary>

id: string

<a href="#">Link to this property</a>

editable: boolean

Whether this setting can be updated or not.

<a href="#">Link to this property</a>

modified\_on: string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

value: "auto"or "custom"

Current setting of the automatic SSL/TLS.

</summary>

One of the following:

"auto"

<a href="#">Link to this property</a>

"custom"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

next\_scheduled\_scan: optional string

Next time this zone will be scanned by the Automatic SSL/TLS.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ssl.automatic_upgrader%20%3E%20(model)%20automatic_upgrader_patch_response%20%3E%20(schema)>)

#### SSLAuto Origin TLS Kex

##### [Get Auto-Origin TLS KEX enrollment status for the given zone](https://developers.cloudflare.com/api/resources/ssl/subresources/auto_origin_tls_kex/methods/get)

GET/zones/{zone\_id}/settings/auto\_origin\_tls\_kex

##### [Patch Auto-Origin TLS KEX enrollment status for the given zone](https://developers.cloudflare.com/api/resources/ssl/subresources/auto_origin_tls_kex/methods/edit)

PATCH/zones/{zone\_id}/settings/auto\_origin\_tls\_kex

##### ModelsExpand Collapse

<details>

<summary>

AutoOriginTLSKexGetResponse object {id, enabled, modified\_on }

</summary>

id: string

<a href="#">Link to this property</a>

enabled: boolean

Whether Auto-Origin TLS KEX selection is enabled for the zone.

<a href="#">Link to this property</a>

modified\_on: string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ssl.auto_origin_tls_kex%20%3E%20(model)%20auto_origin_tls_kex_get_response%20%3E%20(schema)>)

<details>

<summary>

AutoOriginTLSKexEditResponse object {id, enabled, modified\_on }

</summary>

id: string

<a href="#">Link to this property</a>

enabled: boolean

Whether Auto-Origin TLS KEX selection is enabled for the zone.

<a href="#">Link to this property</a>

modified\_on: string

Last time this setting was modified.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ssl.auto_origin_tls_kex%20%3E%20(model)%20auto_origin_tls_kex_edit_response%20%3E%20(schema)>)

#### SSLUniversal

#### SSLUniversalSettings

##### [Universal SSL Settings Details](https://developers.cloudflare.com/api/resources/ssl/subresources/universal/subresources/settings/methods/get)

GET/zones/{zone\_id}/ssl/universal/settings

##### [Edit Universal SSL Settings](https://developers.cloudflare.com/api/resources/ssl/subresources/universal/subresources/settings/methods/edit)

PATCH/zones/{zone\_id}/ssl/universal/settings

##### ModelsExpand Collapse

<details>

<summary>

UniversalSSLSettings object {enabled }

</summary>

enabled: optional boolean

Disabling Universal SSL removes any currently active Universal SSL certificates for your zone from the edge and prevents any future Universal SSL certificates from being ordered. If there are no advanced certificates or custom certificates uploaded for the domain, visitors will be unable to access the domain over HTTPS.

By disabling Universal SSL, you understand that the following Cloudflare settings and preferences will result in visitors being unable to visit your domain unless you have uploaded a custom certificate or purchased an advanced certificate.

- HSTS
- Always Use HTTPS
- Opportunistic Encryption
- Onion Routing
- Any Page Rules redirecting traffic to HTTPS

Similarly, any HTTP redirect to HTTPS at the origin while the Cloudflare proxy is enabled will result in users being unable to visit your site without a valid certificate at Cloudflare’s edge.

If you do not have a valid custom or advanced certificate at Cloudflare’s edge and are unsure if any of the above Cloudflare settings are enabled, or if any HTTP redirects exist at your origin, we advise leaving Universal SSL enabled for your domain.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ssl.universal.settings%20%3E%20(model)%20universal_ssl_settings%20%3E%20(schema)>)

#### SSLVerification

##### [SSL Verification Details](https://developers.cloudflare.com/api/resources/ssl/subresources/verification/methods/get)

GET/zones/{zone\_id}/ssl/verification

##### [Edit SSL Certificate Pack Validation Method](https://developers.cloudflare.com/api/resources/ssl/subresources/verification/methods/edit)

PATCH/zones/{zone\_id}/ssl/verification/{certificate\_pack\_id}

##### ModelsExpand Collapse

<details>

<summary>

Verification object {certificate\_status, brand\_check, cert\_pack\_uuid, 5 more }

</summary>

<details>

<summary>

certificate\_status: "initializing"or "authorizing"or "active"or 4 more

Current status of certificate.

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"authorizing"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"expired"

<a href="#">Link to this property</a>

"issuing"

<a href="#">Link to this property</a>

"timing\_out"

<a href="#">Link to this property</a>

"pending\_deployment"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

brand\_check: optional boolean

Certificate Authority is manually reviewing the order.

<a href="#">Link to this property</a>

cert\_pack\_uuid: optional string

Certificate Pack UUID.

<a href="#">Link to this property</a>

<details>

<summary>

signature: optional "ECDSAWithSHA256"or "SHA1WithRSA"or "SHA256WithRSA"

Certificate’s signature algorithm.

</summary>

One of the following:

"ECDSAWithSHA256"

<a href="#">Link to this property</a>

"SHA1WithRSA"

<a href="#">Link to this property</a>

"SHA256WithRSA"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

validation\_method: optional <a href="https://developers.cloudflare.com/api/resources/ssl#(resource)%20ssl.certificate_packs%20%3E%20(model)%20validation_method%20%3E%20(schema)">ValidationMethod</a>

Validation method in use for a certificate pack order.

<a href="#">Link to this property</a>

<details>

<summary>

verification\_info: optional object {record\_name, record\_target }

Certificate’s required verification information.

</summary>

<details>

<summary>

record\_name: optional "record\_name"or "http\_url"or "cname"or "txt\_name"

Name of CNAME record.

formathostname

</summary>

One of the following:

"record\_name"

<a href="#">Link to this property</a>

"http\_url"

<a href="#">Link to this property</a>

"cname"

<a href="#">Link to this property</a>

"txt\_name"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

record\_target: optional "record\_value"or "http\_body"or "cname\_target"or "txt\_value"

Target of CNAME record.

formathostname

</summary>

One of the following:

"record\_value"

<a href="#">Link to this property</a>

"http\_body"

<a href="#">Link to this property</a>

"cname\_target"

<a href="#">Link to this property</a>

"txt\_value"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

verification\_status: optional boolean

Status of the required verification information, omitted if verification status is unknown.

<a href="#">Link to this property</a>

<details>

<summary>

verification\_type: optional "cname"or "meta tag"

Method of verification.

</summary>

One of the following:

"cname"

<a href="#">Link to this property</a>

"meta tag"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ssl.verification%20%3E%20(model)%20verification%20%3E%20(schema)>)

<details>

<summary>

VerificationGetResponse = array of <a href="https://developers.cloudflare.com/api/resources/ssl#(resource)%20ssl.verification%20%3E%20(model)%20verification%20%3E%20(schema)">Verification</a> { certificate\_status, brand\_check, cert\_pack\_uuid, 5 more }

</summary>

<details>

<summary>

certificate\_status: "initializing"or "authorizing"or "active"or 4 more

Current status of certificate.

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"authorizing"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"expired"

<a href="#">Link to this property</a>

"issuing"

<a href="#">Link to this property</a>

"timing\_out"

<a href="#">Link to this property</a>

"pending\_deployment"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

brand\_check: optional boolean

Certificate Authority is manually reviewing the order.

<a href="#">Link to this property</a>

cert\_pack\_uuid: optional string

Certificate Pack UUID.

<a href="#">Link to this property</a>

<details>

<summary>

signature: optional "ECDSAWithSHA256"or "SHA1WithRSA"or "SHA256WithRSA"

Certificate’s signature algorithm.

</summary>

One of the following:

"ECDSAWithSHA256"

<a href="#">Link to this property</a>

"SHA1WithRSA"

<a href="#">Link to this property</a>

"SHA256WithRSA"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

validation\_method: optional <a href="https://developers.cloudflare.com/api/resources/ssl#(resource)%20ssl.certificate_packs%20%3E%20(model)%20validation_method%20%3E%20(schema)">ValidationMethod</a>

Validation method in use for a certificate pack order.

<a href="#">Link to this property</a>

<details>

<summary>

verification\_info: optional object {record\_name, record\_target }

Certificate’s required verification information.

</summary>

<details>

<summary>

record\_name: optional "record\_name"or "http\_url"or "cname"or "txt\_name"

Name of CNAME record.

formathostname

</summary>

One of the following:

"record\_name"

<a href="#">Link to this property</a>

"http\_url"

<a href="#">Link to this property</a>

"cname"

<a href="#">Link to this property</a>

"txt\_name"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

record\_target: optional "record\_value"or "http\_body"or "cname\_target"or "txt\_value"

Target of CNAME record.

formathostname

</summary>

One of the following:

"record\_value"

<a href="#">Link to this property</a>

"http\_body"

<a href="#">Link to this property</a>

"cname\_target"

<a href="#">Link to this property</a>

"txt\_value"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

verification\_status: optional boolean

Status of the required verification information, omitted if verification status is unknown.

<a href="#">Link to this property</a>

<details>

<summary>

verification\_type: optional "cname"or "meta tag"

Method of verification.

</summary>

One of the following:

"cname"

<a href="#">Link to this property</a>

"meta tag"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ssl.verification%20%3E%20(model)%20verification_get_response%20%3E%20(schema)>)

<details>

<summary>

VerificationEditResponse object {status, validation\_method }

</summary>

status: optional string

Result status.

<a href="#">Link to this property</a>

<details>

<summary>

validation\_method: optional "http"or "cname"or "txt"or "email"

Desired validation method.

</summary>

One of the following:

"http"

<a href="#">Link to this property</a>

"cname"

<a href="#">Link to this property</a>

"txt"

<a href="#">Link to this property</a>

"email"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ssl.verification%20%3E%20(model)%20verification_edit_response%20%3E%20(schema)>)