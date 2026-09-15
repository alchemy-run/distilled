---
title: Entitlements
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Tenants](https://developers.cloudflare.com/api/resources/tenants)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Entitlements

##### [List tenant entitlements](https://developers.cloudflare.com/api/resources/tenants/subresources/entitlements/methods/get)

GET/tenants/{tenant\_id}/entitlements

##### ModelsExpand Collapse

<details>

<summary>

TenantEntitlements object {allow\_add\_subdomain, allow\_auto\_accept\_invites, cname\_setup\_allowed, 3 more }

</summary>

<details>

<summary>

allow\_add\_subdomain: object {type, value }

</summary>

type: "bool"

<a href="#">Link to this property</a>

value: boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

allow\_auto\_accept\_invites: object {type, value }

</summary>

type: "bool"

<a href="#">Link to this property</a>

value: boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

cname\_setup\_allowed: object {type, value }

</summary>

type: "bool"

<a href="#">Link to this property</a>

value: boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

custom\_entitlements: array of object {allocation, feature }

</summary>

<details>

<summary>

allocation: object {type, value } or object {type, value } or object {type, value }

</summary>

One of the following:

<details>

<summary>

OrganizationsAPIMaxCountAllocation object {type, value }

</summary>

type: "max\_count"

<a href="#">Link to this property</a>

value: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

OrganizationsAPIBoolAllocation object {type, value }

</summary>

type: "bool"

<a href="#">Link to this property</a>

value: boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

OrganizationsAPINullAllocation object {type, value }

</summary>

type: ""

<a href="#">Link to this property</a>

value: optional unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

feature: object {key }

</summary>

key: string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

mhs\_certificate\_count: object {type, value }

</summary>

type: "max\_count"

<a href="#">Link to this property</a>

value: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

partial\_setup\_allowed: object {type, value }

</summary>

type: "bool"

<a href="#">Link to this property</a>

value: boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20tenants.entitlements%20%3E%20(model)%20tenant_entitlements%20%3E%20(schema)>)