---
title: App Types
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Gateway](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# App Types

##### [List application and application type mappings](https://developers.cloudflare.com/api/resources/zero_trust/subresources/gateway/subresources/app_types/methods/list)

GET/accounts/{account\_id}/gateway/app\_types

##### ModelsExpand Collapse

<details>

<summary>

AppType = object {id, application\_type\_id, created\_at, name } or object {id, created\_at, description, name }

</summary>

One of the following:

<details>

<summary>

ZeroTrustGatewayApplication object {id, application\_type\_id, created\_at, name }

</summary>

id: optional number

Identify this application. Only one application per ID.

<a href="#">Link to this property</a>

application\_type\_id: optional number

Identify the type of this application. Multiple applications can share the same type. Refers to the <code>id</code> of a returned application type.

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

name: optional string

Specify the name of the application or application type.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

ZeroTrustGatewayApplicationType object {id, created\_at, description, name }

</summary>

id: optional number

Identify the type of this application. Multiple applications can share the same type. Refers to the <code>id</code> of a returned application type.

<a href="#">Link to this property</a>

created\_at: optional string

formatdate-time

<a href="#">Link to this property</a>

description: optional string

Provide a short summary of applications with this type.

<a href="#">Link to this property</a>

name: optional string

Specify the name of the application or application type.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.gateway.app_types%20%3E%20(model)%20app_type%20%3E%20(schema)>)