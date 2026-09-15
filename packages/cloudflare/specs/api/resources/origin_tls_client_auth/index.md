---
title: Origin TLS Client Auth
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Origin TLS Client Auth

##### [List Certificates](https://developers.cloudflare.com/api/resources/origin_tls_client_auth/methods/list)

Deprecated

GET/zones/{zone\_id}/origin\_tls\_client\_auth

##### [Get Certificate Details](https://developers.cloudflare.com/api/resources/origin_tls_client_auth/methods/get)

Deprecated

GET/zones/{zone\_id}/origin\_tls\_client\_auth/{certificate\_id}

##### [Upload Certificate](https://developers.cloudflare.com/api/resources/origin_tls_client_auth/methods/create)

Deprecated

POST/zones/{zone\_id}/origin\_tls\_client\_auth

##### [Delete Certificate](https://developers.cloudflare.com/api/resources/origin_tls_client_auth/methods/delete)

Deprecated

DELETE/zones/{zone\_id}/origin\_tls\_client\_auth/{certificate\_id}

##### ModelsExpand Collapse

<details>

<summary>

OriginTLSClientAuthListResponse = <a href="https://developers.cloudflare.com/api/resources/origin_tls_client_auth#(resource)%20origin_tls_client_auth.zone_certificates%20%3E%20(model)%20zone_authenticated_origin_pull%20%3E%20(schema)">ZoneAuthenticatedOriginPull</a> { id, certificate, expires\_on, 4 more }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

certificate: optional string

The zone’s leaf certificate.

<a href="#">Link to this property</a>

enabled: optional boolean

Indicates whether zone-level authenticated origin pulls is enabled.

<a href="#">Link to this property</a>

private\_key: optional string

The zone’s private key.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20origin_tls_client_auth%20%3E%20(model)%20origin_tls_client_auth_list_response%20%3E%20(schema)>)

<details>

<summary>

OriginTLSClientAuthGetResponse = <a href="https://developers.cloudflare.com/api/resources/origin_tls_client_auth#(resource)%20origin_tls_client_auth.zone_certificates%20%3E%20(model)%20zone_authenticated_origin_pull%20%3E%20(schema)">ZoneAuthenticatedOriginPull</a> { id, certificate, expires\_on, 4 more }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

certificate: optional string

The zone’s leaf certificate.

<a href="#">Link to this property</a>

enabled: optional boolean

Indicates whether zone-level authenticated origin pulls is enabled.

<a href="#">Link to this property</a>

private\_key: optional string

The zone’s private key.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20origin_tls_client_auth%20%3E%20(model)%20origin_tls_client_auth_get_response%20%3E%20(schema)>)

<details>

<summary>

OriginTLSClientAuthCreateResponse = <a href="https://developers.cloudflare.com/api/resources/origin_tls_client_auth#(resource)%20origin_tls_client_auth.zone_certificates%20%3E%20(model)%20zone_authenticated_origin_pull%20%3E%20(schema)">ZoneAuthenticatedOriginPull</a> { id, certificate, expires\_on, 4 more }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

certificate: optional string

The zone’s leaf certificate.

<a href="#">Link to this property</a>

enabled: optional boolean

Indicates whether zone-level authenticated origin pulls is enabled.

<a href="#">Link to this property</a>

private\_key: optional string

The zone’s private key.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20origin_tls_client_auth%20%3E%20(model)%20origin_tls_client_auth_create_response%20%3E%20(schema)>)

<details>

<summary>

OriginTLSClientAuthDeleteResponse = <a href="https://developers.cloudflare.com/api/resources/origin_tls_client_auth#(resource)%20origin_tls_client_auth.zone_certificates%20%3E%20(model)%20zone_authenticated_origin_pull%20%3E%20(schema)">ZoneAuthenticatedOriginPull</a> { id, certificate, expires\_on, 4 more }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

certificate: optional string

The zone’s leaf certificate.

<a href="#">Link to this property</a>

enabled: optional boolean

Indicates whether zone-level authenticated origin pulls is enabled.

<a href="#">Link to this property</a>

private\_key: optional string

The zone’s private key.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20origin_tls_client_auth%20%3E%20(model)%20origin_tls_client_auth_delete_response%20%3E%20(schema)>)

#### Origin TLS Client AuthZone Certificates

##### [List Certificates](https://developers.cloudflare.com/api/resources/origin_tls_client_auth/subresources/zone_certificates/methods/list)

GET/zones/{zone\_id}/origin\_tls\_client\_auth

##### [Get Certificate Details](https://developers.cloudflare.com/api/resources/origin_tls_client_auth/subresources/zone_certificates/methods/get)

GET/zones/{zone\_id}/origin\_tls\_client\_auth/{certificate\_id}

##### [Upload Certificate](https://developers.cloudflare.com/api/resources/origin_tls_client_auth/subresources/zone_certificates/methods/create)

POST/zones/{zone\_id}/origin\_tls\_client\_auth

##### [Delete Certificate](https://developers.cloudflare.com/api/resources/origin_tls_client_auth/subresources/zone_certificates/methods/delete)

DELETE/zones/{zone\_id}/origin\_tls\_client\_auth/{certificate\_id}

##### ModelsExpand Collapse

<details>

<summary>

ZoneAuthenticatedOriginPull object {id, certificate, expires\_on, 4 more }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

certificate: optional string

The zone’s leaf certificate.

<a href="#">Link to this property</a>

expires\_on: optional string

When the certificate from the authority expires.

formatdate-time

<a href="#">Link to this property</a>

issuer: optional string

The certificate authority that issued the certificate.

<a href="#">Link to this property</a>

signature: optional string

The type of hash used for the certificate.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "initializing"or "pending\_deployment"or "pending\_deletion"or 4 more

Status of the certificate activation.

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

"deleted"

<a href="#">Link to this property</a>

"deployment\_timed\_out"

<a href="#">Link to this property</a>

"deletion\_timed\_out"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

uploaded\_on: optional string

This is the time the certificate was uploaded.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20origin_tls_client_auth.zone_certificates%20%3E%20(model)%20zone_authenticated_origin_pull%20%3E%20(schema)>)

<details>

<summary>

ZoneCertificateListResponse = <a href="https://developers.cloudflare.com/api/resources/origin_tls_client_auth#(resource)%20origin_tls_client_auth.zone_certificates%20%3E%20(model)%20zone_authenticated_origin_pull%20%3E%20(schema)">ZoneAuthenticatedOriginPull</a> { id, certificate, expires\_on, 4 more }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

certificate: optional string

The zone’s leaf certificate.

<a href="#">Link to this property</a>

enabled: optional boolean

Indicates whether zone-level authenticated origin pulls is enabled.

<a href="#">Link to this property</a>

private\_key: optional string

The zone’s private key.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20origin_tls_client_auth.zone_certificates%20%3E%20(model)%20zone_certificate_list_response%20%3E%20(schema)>)

<details>

<summary>

ZoneCertificateGetResponse = <a href="https://developers.cloudflare.com/api/resources/origin_tls_client_auth#(resource)%20origin_tls_client_auth.zone_certificates%20%3E%20(model)%20zone_authenticated_origin_pull%20%3E%20(schema)">ZoneAuthenticatedOriginPull</a> { id, certificate, expires\_on, 4 more }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

certificate: optional string

The zone’s leaf certificate.

<a href="#">Link to this property</a>

enabled: optional boolean

Indicates whether zone-level authenticated origin pulls is enabled.

<a href="#">Link to this property</a>

private\_key: optional string

The zone’s private key.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20origin_tls_client_auth.zone_certificates%20%3E%20(model)%20zone_certificate_get_response%20%3E%20(schema)>)

<details>

<summary>

ZoneCertificateCreateResponse = <a href="https://developers.cloudflare.com/api/resources/origin_tls_client_auth#(resource)%20origin_tls_client_auth.zone_certificates%20%3E%20(model)%20zone_authenticated_origin_pull%20%3E%20(schema)">ZoneAuthenticatedOriginPull</a> { id, certificate, expires\_on, 4 more }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

certificate: optional string

The zone’s leaf certificate.

<a href="#">Link to this property</a>

enabled: optional boolean

Indicates whether zone-level authenticated origin pulls is enabled.

<a href="#">Link to this property</a>

private\_key: optional string

The zone’s private key.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20origin_tls_client_auth.zone_certificates%20%3E%20(model)%20zone_certificate_create_response%20%3E%20(schema)>)

<details>

<summary>

ZoneCertificateDeleteResponse = <a href="https://developers.cloudflare.com/api/resources/origin_tls_client_auth#(resource)%20origin_tls_client_auth.zone_certificates%20%3E%20(model)%20zone_authenticated_origin_pull%20%3E%20(schema)">ZoneAuthenticatedOriginPull</a> { id, certificate, expires\_on, 4 more }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

certificate: optional string

The zone’s leaf certificate.

<a href="#">Link to this property</a>

enabled: optional boolean

Indicates whether zone-level authenticated origin pulls is enabled.

<a href="#">Link to this property</a>

private\_key: optional string

The zone’s private key.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20origin_tls_client_auth.zone_certificates%20%3E%20(model)%20zone_certificate_delete_response%20%3E%20(schema)>)

#### Origin TLS Client AuthHostnames

##### [Get the Hostname Status for Client Authentication](https://developers.cloudflare.com/api/resources/origin_tls_client_auth/subresources/hostnames/methods/get)

GET/zones/{zone\_id}/origin\_tls\_client\_auth/hostnames/{hostname}

##### [Enable or Disable a Hostname for Client Authentication](https://developers.cloudflare.com/api/resources/origin_tls_client_auth/subresources/hostnames/methods/update)

PUT/zones/{zone\_id}/origin\_tls\_client\_auth/hostnames

##### ModelsExpand Collapse

<details>

<summary>

AuthenticatedOriginPull object {cert\_id, cert\_status, cert\_updated\_at, 11 more }

</summary>

cert\_id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

<details>

<summary>

cert\_status: optional "initializing"or "pending\_deployment"or "pending\_deletion"or 4 more

Status of the certificate or the association.

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

"deleted"

<a href="#">Link to this property</a>

"deployment\_timed\_out"

<a href="#">Link to this property</a>

"deletion\_timed\_out"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cert\_updated\_at: optional string

The time when the certificate was updated.

formatdate-time

<a href="#">Link to this property</a>

cert\_uploaded\_on: optional string

The time when the certificate was uploaded.

formatdate-time

<a href="#">Link to this property</a>

certificate: optional string

The hostname certificate.

<a href="#">Link to this property</a>

created\_at: optional string

The time when the certificate was created.

formatdate-time

<a href="#">Link to this property</a>

enabled: optional boolean

Indicates whether hostname-level authenticated origin pulls is enabled. A null value voids the association.

<a href="#">Link to this property</a>

expires\_on: optional string

The date when the certificate expires.

formatdate-time

<a href="#">Link to this property</a>

hostname: optional string

The hostname on the origin for which the client certificate uploaded will be used.

maxLength255

<a href="#">Link to this property</a>

issuer: optional string

The certificate authority that issued the certificate.

<a href="#">Link to this property</a>

serial\_number: optional string

The serial number on the uploaded certificate.

<a href="#">Link to this property</a>

signature: optional string

The type of hash used for the certificate.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "initializing"or "pending\_deployment"or "pending\_deletion"or 4 more

Status of the certificate or the association.

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

"deleted"

<a href="#">Link to this property</a>

"deployment\_timed\_out"

<a href="#">Link to this property</a>

"deletion\_timed\_out"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

updated\_at: optional string

The time when the certificate was updated.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20origin_tls_client_auth.hostnames%20%3E%20(model)%20authenticated_origin_pull%20%3E%20(schema)>)

<details>

<summary>

HostnameUpdateResponse = <a href="https://developers.cloudflare.com/api/resources/origin_tls_client_auth#(resource)%20origin_tls_client_auth.hostnames%20%3E%20(model)%20authenticated_origin_pull%20%3E%20(schema)">AuthenticatedOriginPull</a> { cert\_id, cert\_status, cert\_updated\_at, 11 more }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

cert\_id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

certificate: optional string

The hostname certificate.

<a href="#">Link to this property</a>

enabled: optional boolean

Indicates whether hostname-level authenticated origin pulls is enabled. A null value voids the association.

<a href="#">Link to this property</a>

hostname: optional string

The hostname on the origin for which the client certificate uploaded will be used.

maxLength255

<a href="#">Link to this property</a>

private\_key: optional string

The hostname certificate’s private key.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20origin_tls_client_auth.hostnames%20%3E%20(model)%20hostname_update_response%20%3E%20(schema)>)

#### Origin TLS Client AuthHostname Certificates

##### [List Certificates](https://developers.cloudflare.com/api/resources/origin_tls_client_auth/subresources/hostname_certificates/methods/list)

GET/zones/{zone\_id}/origin\_tls\_client\_auth/hostnames/certificates

##### [Get the Hostname Client Certificate](https://developers.cloudflare.com/api/resources/origin_tls_client_auth/subresources/hostname_certificates/methods/get)

GET/zones/{zone\_id}/origin\_tls\_client\_auth/hostnames/certificates/{certificate\_id}

##### [Upload a Hostname Client Certificate](https://developers.cloudflare.com/api/resources/origin_tls_client_auth/subresources/hostname_certificates/methods/create)

POST/zones/{zone\_id}/origin\_tls\_client\_auth/hostnames/certificates

##### [Delete Hostname Client Certificate](https://developers.cloudflare.com/api/resources/origin_tls_client_auth/subresources/hostname_certificates/methods/delete)

DELETE/zones/{zone\_id}/origin\_tls\_client\_auth/hostnames/certificates/{certificate\_id}

##### ModelsExpand Collapse

<details>

<summary>

Certificate object {id, certificate, expires\_on, 5 more }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

certificate: optional string

The hostname certificate.

<a href="#">Link to this property</a>

expires\_on: optional string

The date when the certificate expires.

formatdate-time

<a href="#">Link to this property</a>

issuer: optional string

The certificate authority that issued the certificate.

<a href="#">Link to this property</a>

serial\_number: optional string

The serial number on the uploaded certificate.

<a href="#">Link to this property</a>

signature: optional string

The type of hash used for the certificate.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "initializing"or "pending\_deployment"or "pending\_deletion"or 4 more

Status of the certificate or the association.

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

"deleted"

<a href="#">Link to this property</a>

"deployment\_timed\_out"

<a href="#">Link to this property</a>

"deletion\_timed\_out"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

uploaded\_on: optional string

The time when the certificate was uploaded.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20origin_tls_client_auth.hostname_certificates%20%3E%20(model)%20certificate%20%3E%20(schema)>)

<details>

<summary>

HostnameCertificateListResponse object {id, certificate, expires\_on, 5 more }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

certificate: optional string

The hostname certificate.

<a href="#">Link to this property</a>

expires\_on: optional string

The date when the certificate expires.

formatdate-time

<a href="#">Link to this property</a>

issuer: optional string

The certificate authority that issued the certificate.

<a href="#">Link to this property</a>

serial\_number: optional string

The serial number on the uploaded certificate.

<a href="#">Link to this property</a>

signature: optional string

The type of hash used for the certificate.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "initializing"or "pending\_deployment"or "pending\_deletion"or 4 more

Status of the certificate or the association.

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

"deleted"

<a href="#">Link to this property</a>

"deployment\_timed\_out"

<a href="#">Link to this property</a>

"deletion\_timed\_out"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

uploaded\_on: optional string

The time when the certificate was uploaded.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20origin_tls_client_auth.hostname_certificates%20%3E%20(model)%20hostname_certificate_list_response%20%3E%20(schema)>)

<details>

<summary>

HostnameCertificateGetResponse object {id, certificate, expires\_on, 5 more }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

certificate: optional string

The hostname certificate.

<a href="#">Link to this property</a>

expires\_on: optional string

The date when the certificate expires.

formatdate-time

<a href="#">Link to this property</a>

issuer: optional string

The certificate authority that issued the certificate.

<a href="#">Link to this property</a>

serial\_number: optional string

The serial number on the uploaded certificate.

<a href="#">Link to this property</a>

signature: optional string

The type of hash used for the certificate.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "initializing"or "pending\_deployment"or "pending\_deletion"or 4 more

Status of the certificate or the association.

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

"deleted"

<a href="#">Link to this property</a>

"deployment\_timed\_out"

<a href="#">Link to this property</a>

"deletion\_timed\_out"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

uploaded\_on: optional string

The time when the certificate was uploaded.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20origin_tls_client_auth.hostname_certificates%20%3E%20(model)%20hostname_certificate_get_response%20%3E%20(schema)>)

<details>

<summary>

HostnameCertificateCreateResponse object {id, certificate, expires\_on, 5 more }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

certificate: optional string

The hostname certificate.

<a href="#">Link to this property</a>

expires\_on: optional string

The date when the certificate expires.

formatdate-time

<a href="#">Link to this property</a>

issuer: optional string

The certificate authority that issued the certificate.

<a href="#">Link to this property</a>

serial\_number: optional string

The serial number on the uploaded certificate.

<a href="#">Link to this property</a>

signature: optional string

The type of hash used for the certificate.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "initializing"or "pending\_deployment"or "pending\_deletion"or 4 more

Status of the certificate or the association.

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

"deleted"

<a href="#">Link to this property</a>

"deployment\_timed\_out"

<a href="#">Link to this property</a>

"deletion\_timed\_out"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

uploaded\_on: optional string

The time when the certificate was uploaded.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20origin_tls_client_auth.hostname_certificates%20%3E%20(model)%20hostname_certificate_create_response%20%3E%20(schema)>)

<details>

<summary>

HostnameCertificateDeleteResponse object {id, certificate, expires\_on, 5 more }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

certificate: optional string

The hostname certificate.

<a href="#">Link to this property</a>

expires\_on: optional string

The date when the certificate expires.

formatdate-time

<a href="#">Link to this property</a>

issuer: optional string

The certificate authority that issued the certificate.

<a href="#">Link to this property</a>

serial\_number: optional string

The serial number on the uploaded certificate.

<a href="#">Link to this property</a>

signature: optional string

The type of hash used for the certificate.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "initializing"or "pending\_deployment"or "pending\_deletion"or 4 more

Status of the certificate or the association.

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

"deleted"

<a href="#">Link to this property</a>

"deployment\_timed\_out"

<a href="#">Link to this property</a>

"deletion\_timed\_out"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

uploaded\_on: optional string

The time when the certificate was uploaded.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20origin_tls_client_auth.hostname_certificates%20%3E%20(model)%20hostname_certificate_delete_response%20%3E%20(schema)>)

#### Origin TLS Client AuthSettings

##### [Get Enablement Setting for Zone](https://developers.cloudflare.com/api/resources/origin_tls_client_auth/subresources/settings/methods/get)

GET/zones/{zone\_id}/origin\_tls\_client\_auth/settings

##### [Set Enablement for Zone](https://developers.cloudflare.com/api/resources/origin_tls_client_auth/subresources/settings/methods/update)

PUT/zones/{zone\_id}/origin\_tls\_client\_auth/settings

##### ModelsExpand Collapse

<details>

<summary>

SettingGetResponse object {enabled }

</summary>

enabled: optional boolean

Indicates whether zone-level authenticated origin pulls is enabled.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20origin_tls_client_auth.settings%20%3E%20(model)%20setting_get_response%20%3E%20(schema)>)

<details>

<summary>

SettingUpdateResponse object {enabled }

</summary>

enabled: optional boolean

Indicates whether zone-level authenticated origin pulls is enabled.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20origin_tls_client_auth.settings%20%3E%20(model)%20setting_update_response%20%3E%20(schema)>)