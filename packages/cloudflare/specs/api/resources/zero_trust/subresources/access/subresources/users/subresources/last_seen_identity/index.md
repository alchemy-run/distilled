---
title: Last Seen Identity
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

[Users](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/users)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Last Seen Identity

##### [Get last seen identity](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/users/subresources/last_seen_identity/methods/get)

GET/accounts/{account\_id}/access/users/{user\_id}/last\_seen\_identity

##### ModelsExpand Collapse

<details>

<summary>

Identity object {account\_id, auth\_status, common\_name, 15 more }

</summary>

account\_id: optional string

<a href="#">Link to this property</a>

auth\_status: optional string

<a href="#">Link to this property</a>

common\_name: optional string

<a href="#">Link to this property</a>

device\_id: optional string

<a href="#">Link to this property</a>

<details>

<summary>

device\_sessions: optional map\[object {last\_authenticated } ]

</summary>

last\_authenticated: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

devicePosture: optional map\[object {id, check, data, 6 more } ]

</summary>

id: optional string

<a href="#">Link to this property</a>

<details>

<summary>

check: optional object {exists, path }

</summary>

exists: optional boolean

<a href="#">Link to this property</a>

path: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

data: optional unknown

<a href="#">Link to this property</a>

description: optional string

<a href="#">Link to this property</a>

error: optional string

<a href="#">Link to this property</a>

rule\_name: optional string

<a href="#">Link to this property</a>

success: optional boolean

<a href="#">Link to this property</a>

timestamp: optional string

<a href="#">Link to this property</a>

type: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

email: optional string

<a href="#">Link to this property</a>

<details>

<summary>

geo: optional object {country }

</summary>

country: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

iat: optional number

<a href="#">Link to this property</a>

<details>

<summary>

idp: optional object {id, type }

</summary>

id: optional string

<a href="#">Link to this property</a>

type: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

ip: optional string

<a href="#">Link to this property</a>

is\_gateway: optional boolean

<a href="#">Link to this property</a>

is\_warp: optional boolean

<a href="#">Link to this property</a>

<details>

<summary>

mtls\_auth: optional object {auth\_status, cert\_issuer\_dn, cert\_issuer\_ski, 2 more }

</summary>

auth\_status: optional string

<a href="#">Link to this property</a>

cert\_issuer\_dn: optional string

<a href="#">Link to this property</a>

cert\_issuer\_ski: optional string

<a href="#">Link to this property</a>

cert\_presented: optional boolean

<a href="#">Link to this property</a>

cert\_serial: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

service\_token\_id: optional string

<a href="#">Link to this property</a>

service\_token\_status: optional boolean

<a href="#">Link to this property</a>

user\_uuid: optional string

<a href="#">Link to this property</a>

version: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.users.last_seen_identity%20%3E%20(model)%20identity%20%3E%20(schema)>)