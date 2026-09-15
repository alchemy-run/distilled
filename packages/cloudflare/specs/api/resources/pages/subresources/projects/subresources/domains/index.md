---
title: Domains
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Pages](https://developers.cloudflare.com/api/resources/pages)

[Projects](https://developers.cloudflare.com/api/resources/pages/subresources/projects)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Domains

##### [Get domains](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/domains/methods/list)

GET/accounts/{account\_id}/pages/projects/{project\_name}/domains

##### [Get domain](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/domains/methods/get)

GET/accounts/{account\_id}/pages/projects/{project\_name}/domains/{domain\_name}

##### [Add domain](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/domains/methods/create)

POST/accounts/{account\_id}/pages/projects/{project\_name}/domains

##### [Patch domain](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/domains/methods/edit)

PATCH/accounts/{account\_id}/pages/projects/{project\_name}/domains/{domain\_name}

##### [Delete domain](https://developers.cloudflare.com/api/resources/pages/subresources/projects/subresources/domains/methods/delete)

DELETE/accounts/{account\_id}/pages/projects/{project\_name}/domains/{domain\_name}

##### ModelsExpand Collapse

<details>

<summary>

DomainListResponse object {id, certificate\_authority, created\_on, 6 more }

</summary>

id: string

<a href="#">Link to this property</a>

<details>

<summary>

certificate\_authority: "google"or "lets\_encrypt"

</summary>

One of the following:

"google"

<a href="#">Link to this property</a>

"lets\_encrypt"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: string

<a href="#">Link to this property</a>

domain\_id: string

<a href="#">Link to this property</a>

name: string

The domain name.

<a href="#">Link to this property</a>

<details>

<summary>

status: "initializing"or "pending"or "active"or 3 more

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

validation\_data: object {method, status, error\_message, 2 more }

</summary>

<details>

<summary>

method: "http"or "txt"

</summary>

One of the following:

"http"

<a href="#">Link to this property</a>

"txt"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: "initializing"or "pending"or "active"or 2 more

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

error\_message: optional string

<a href="#">Link to this property</a>

txt\_name: optional string

<a href="#">Link to this property</a>

txt\_value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

verification\_data: object {status, error\_message }

</summary>

<details>

<summary>

status: "pending"or "active"or "deactivated"or 2 more

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

error\_message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

zone\_tag: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pages.projects.domains%20%3E%20(model)%20domain_list_response%20%3E%20(schema)>)

<details>

<summary>

DomainGetResponse object {id, certificate\_authority, created\_on, 6 more }

</summary>

id: string

<a href="#">Link to this property</a>

<details>

<summary>

certificate\_authority: "google"or "lets\_encrypt"

</summary>

One of the following:

"google"

<a href="#">Link to this property</a>

"lets\_encrypt"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: string

<a href="#">Link to this property</a>

domain\_id: string

<a href="#">Link to this property</a>

name: string

The domain name.

<a href="#">Link to this property</a>

<details>

<summary>

status: "initializing"or "pending"or "active"or 3 more

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

validation\_data: object {method, status, error\_message, 2 more }

</summary>

<details>

<summary>

method: "http"or "txt"

</summary>

One of the following:

"http"

<a href="#">Link to this property</a>

"txt"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: "initializing"or "pending"or "active"or 2 more

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

error\_message: optional string

<a href="#">Link to this property</a>

txt\_name: optional string

<a href="#">Link to this property</a>

txt\_value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

verification\_data: object {status, error\_message }

</summary>

<details>

<summary>

status: "pending"or "active"or "deactivated"or 2 more

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

error\_message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

zone\_tag: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pages.projects.domains%20%3E%20(model)%20domain_get_response%20%3E%20(schema)>)

<details>

<summary>

DomainCreateResponse object {id, certificate\_authority, created\_on, 6 more }

</summary>

id: string

<a href="#">Link to this property</a>

<details>

<summary>

certificate\_authority: "google"or "lets\_encrypt"

</summary>

One of the following:

"google"

<a href="#">Link to this property</a>

"lets\_encrypt"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: string

<a href="#">Link to this property</a>

domain\_id: string

<a href="#">Link to this property</a>

name: string

The domain name.

<a href="#">Link to this property</a>

<details>

<summary>

status: "initializing"or "pending"or "active"or 3 more

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

validation\_data: object {method, status, error\_message, 2 more }

</summary>

<details>

<summary>

method: "http"or "txt"

</summary>

One of the following:

"http"

<a href="#">Link to this property</a>

"txt"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: "initializing"or "pending"or "active"or 2 more

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

error\_message: optional string

<a href="#">Link to this property</a>

txt\_name: optional string

<a href="#">Link to this property</a>

txt\_value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

verification\_data: object {status, error\_message }

</summary>

<details>

<summary>

status: "pending"or "active"or "deactivated"or 2 more

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

error\_message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

zone\_tag: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pages.projects.domains%20%3E%20(model)%20domain_create_response%20%3E%20(schema)>)

<details>

<summary>

DomainEditResponse object {id, certificate\_authority, created\_on, 6 more }

</summary>

id: string

<a href="#">Link to this property</a>

<details>

<summary>

certificate\_authority: "google"or "lets\_encrypt"

</summary>

One of the following:

"google"

<a href="#">Link to this property</a>

"lets\_encrypt"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_on: string

<a href="#">Link to this property</a>

domain\_id: string

<a href="#">Link to this property</a>

name: string

The domain name.

<a href="#">Link to this property</a>

<details>

<summary>

status: "initializing"or "pending"or "active"or 3 more

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

validation\_data: object {method, status, error\_message, 2 more }

</summary>

<details>

<summary>

method: "http"or "txt"

</summary>

One of the following:

"http"

<a href="#">Link to this property</a>

"txt"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: "initializing"or "pending"or "active"or 2 more

</summary>

One of the following:

"initializing"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

error\_message: optional string

<a href="#">Link to this property</a>

txt\_name: optional string

<a href="#">Link to this property</a>

txt\_value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

verification\_data: object {status, error\_message }

</summary>

<details>

<summary>

status: "pending"or "active"or "deactivated"or 2 more

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"active"

<a href="#">Link to this property</a>

"deactivated"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

error\_message: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

zone\_tag: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20pages.projects.domains%20%3E%20(model)%20domain_edit_response%20%3E%20(schema)>)

DomainDeleteResponse = unknown

[Link to this property](#)%20pages.projects.domains%20%3E%20(model)%20domain_delete_response%20%3E%20(schema)>)