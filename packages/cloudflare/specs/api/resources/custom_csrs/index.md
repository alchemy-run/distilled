---
title: Custom Csrs
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Custom Csrs

##### [List Custom CSRs](https://developers.cloudflare.com/api/resources/custom_csrs/methods/list)

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/custom\_csrs

##### [Create Custom CSR](https://developers.cloudflare.com/api/resources/custom_csrs/methods/create)

POST/{accounts\_or\_zones}/{account\_or\_zone\_id}/custom\_csrs

##### [Custom CSR Details](https://developers.cloudflare.com/api/resources/custom_csrs/methods/get)

GET/{accounts\_or\_zones}/{account\_or\_zone\_id}/custom\_csrs/{custom\_csr\_id}

##### [Delete Custom CSR](https://developers.cloudflare.com/api/resources/custom_csrs/methods/delete)

DELETE/{accounts\_or\_zones}/{account\_or\_zone\_id}/custom\_csrs/{custom\_csr\_id}

##### ModelsExpand Collapse

<details>

<summary>

CustomCsr object {id, created\_at, key\_type, 8 more }

A custom Certificate Signing Request (CSR).

</summary>

id: string

Custom CSR identifier tag.

maxLength36

<a href="#">Link to this property</a>

created\_at: string

When the CSR was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

key\_type: "rsa2048"or "p256v1"

The key algorithm used to generate the CSR.

</summary>

One of the following:

"rsa2048"

<a href="#">Link to this property</a>

"p256v1"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

common\_name: optional string

The common name (domain) for the CSR.

maxLength64

<a href="#">Link to this property</a>

country: optional string

Two-letter ISO 3166-1 alpha-2 country code.

<a href="#">Link to this property</a>

csr: optional string

The PEM-encoded Certificate Signing Request.

<a href="#">Link to this property</a>

locality: optional string

City or locality name.

<a href="#">Link to this property</a>

organization: optional string

Organization name.

<a href="#">Link to this property</a>

organizational\_unit: optional string

Organizational unit for the CSR subject.

<a href="#">Link to this property</a>

sans: optional array of string

Subject Alternative Names included in the CSR.

<a href="#">Link to this property</a>

state: optional string

State or province name.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_csrs%20%3E%20(model)%20custom_csr%20%3E%20(schema)>)

<details>

<summary>

CustomCsrListResponse object {id, created\_at, key\_type, 11 more }

A custom Certificate Signing Request (CSR).

</summary>

id: string

Custom CSR identifier tag.

maxLength36

<a href="#">Link to this property</a>

created\_at: string

When the CSR was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

key\_type: "rsa2048"or "p256v1"

The key algorithm used to generate the CSR.

</summary>

One of the following:

"rsa2048"

<a href="#">Link to this property</a>

"p256v1"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

account\_tag: optional string

Account identifier associated with this CSR.

<a href="#">Link to this property</a>

common\_name: optional string

The common name (domain) for the CSR.

maxLength64

<a href="#">Link to this property</a>

country: optional string

Two-letter ISO 3166-1 alpha-2 country code.

<a href="#">Link to this property</a>

csr: optional string

The PEM-encoded Certificate Signing Request.

<a href="#">Link to this property</a>

description: optional string

Optional description for the CSR.

<a href="#">Link to this property</a>

locality: optional string

City or locality name.

<a href="#">Link to this property</a>

name: optional string

Human-readable name for the CSR.

<a href="#">Link to this property</a>

organization: optional string

Organization name.

<a href="#">Link to this property</a>

organizational\_unit: optional string

Organizational unit name.

<a href="#">Link to this property</a>

sans: optional array of string

Subject Alternative Names included in the CSR.

<a href="#">Link to this property</a>

state: optional string

State or province name.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_csrs%20%3E%20(model)%20custom_csr_list_response%20%3E%20(schema)>)

<details>

<summary>

CustomCsrCreateResponse object {id, created\_at, key\_type, 11 more }

A custom Certificate Signing Request (CSR).

</summary>

id: string

Custom CSR identifier tag.

maxLength36

<a href="#">Link to this property</a>

created\_at: string

When the CSR was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

key\_type: "rsa2048"or "p256v1"

The key algorithm used to generate the CSR.

</summary>

One of the following:

"rsa2048"

<a href="#">Link to this property</a>

"p256v1"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

account\_tag: optional string

Account identifier associated with this CSR.

<a href="#">Link to this property</a>

common\_name: optional string

The common name (domain) for the CSR.

maxLength64

<a href="#">Link to this property</a>

country: optional string

Two-letter ISO 3166-1 alpha-2 country code.

<a href="#">Link to this property</a>

csr: optional string

The PEM-encoded Certificate Signing Request.

<a href="#">Link to this property</a>

description: optional string

Optional description for the CSR.

<a href="#">Link to this property</a>

locality: optional string

City or locality name.

<a href="#">Link to this property</a>

name: optional string

Human-readable name for the CSR.

<a href="#">Link to this property</a>

organization: optional string

Organization name.

<a href="#">Link to this property</a>

organizational\_unit: optional string

Organizational unit name.

<a href="#">Link to this property</a>

sans: optional array of string

Subject Alternative Names included in the CSR.

<a href="#">Link to this property</a>

state: optional string

State or province name.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_csrs%20%3E%20(model)%20custom_csr_create_response%20%3E%20(schema)>)

<details>

<summary>

CustomCsrGetResponse object {id, created\_at, key\_type, 11 more }

A custom Certificate Signing Request (CSR).

</summary>

id: string

Custom CSR identifier tag.

maxLength36

<a href="#">Link to this property</a>

created\_at: string

When the CSR was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

key\_type: "rsa2048"or "p256v1"

The key algorithm used to generate the CSR.

</summary>

One of the following:

"rsa2048"

<a href="#">Link to this property</a>

"p256v1"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

account\_tag: optional string

Account identifier associated with this CSR.

<a href="#">Link to this property</a>

common\_name: optional string

The common name (domain) for the CSR.

maxLength64

<a href="#">Link to this property</a>

country: optional string

Two-letter ISO 3166-1 alpha-2 country code.

<a href="#">Link to this property</a>

csr: optional string

The PEM-encoded Certificate Signing Request.

<a href="#">Link to this property</a>

description: optional string

Optional description for the CSR.

<a href="#">Link to this property</a>

locality: optional string

City or locality name.

<a href="#">Link to this property</a>

name: optional string

Human-readable name for the CSR.

<a href="#">Link to this property</a>

organization: optional string

Organization name.

<a href="#">Link to this property</a>

organizational\_unit: optional string

Organizational unit name.

<a href="#">Link to this property</a>

sans: optional array of string

Subject Alternative Names included in the CSR.

<a href="#">Link to this property</a>

state: optional string

State or province name.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_csrs%20%3E%20(model)%20custom_csr_get_response%20%3E%20(schema)>)

<details>

<summary>

CustomCsrDeleteResponse object {id }

</summary>

id: optional string

Custom CSR identifier tag.

maxLength36

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20custom_csrs%20%3E%20(model)%20custom_csr_delete_response%20%3E%20(schema)>)