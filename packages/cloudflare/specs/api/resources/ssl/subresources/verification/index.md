---
title: Verification
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[SSL](https://developers.cloudflare.com/api/resources/ssl)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Verification

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