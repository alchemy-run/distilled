---
title: Subdomain
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Workers](https://developers.cloudflare.com/api/resources/workers)

[Scripts](https://developers.cloudflare.com/api/resources/workers/subresources/scripts)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Subdomain

##### [Get Worker subdomain](https://developers.cloudflare.com/api/resources/workers/subresources/scripts/subresources/subdomain/methods/get)

GET/accounts/{account\_id}/workers/scripts/{script\_name}/subdomain

##### [Post Worker subdomain](https://developers.cloudflare.com/api/resources/workers/subresources/scripts/subresources/subdomain/methods/create)

POST/accounts/{account\_id}/workers/scripts/{script\_name}/subdomain

##### [Delete Worker subdomain](https://developers.cloudflare.com/api/resources/workers/subresources/scripts/subresources/subdomain/methods/delete)

DELETE/accounts/{account\_id}/workers/scripts/{script\_name}/subdomain

##### ModelsExpand Collapse

<details>

<summary>

SubdomainGetResponse object {enabled, previews\_enabled }

</summary>

enabled: boolean

Whether the Worker is available on the workers.dev subdomain.

<a href="#">Link to this property</a>

previews\_enabled: boolean

Whether the Worker’s Preview URLs are available on the workers.dev subdomain.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.scripts.subdomain%20%3E%20(model)%20subdomain_get_response%20%3E%20(schema)>)

<details>

<summary>

SubdomainCreateResponse object {enabled, previews\_enabled }

</summary>

enabled: boolean

Whether the Worker is available on the workers.dev subdomain.

<a href="#">Link to this property</a>

previews\_enabled: boolean

Whether the Worker’s Preview URLs are available on the workers.dev subdomain.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.scripts.subdomain%20%3E%20(model)%20subdomain_create_response%20%3E%20(schema)>)

<details>

<summary>

SubdomainDeleteResponse object {enabled, previews\_enabled }

</summary>

enabled: boolean

Whether the Worker is available on the workers.dev subdomain.

<a href="#">Link to this property</a>

previews\_enabled: boolean

Whether the Worker’s Preview URLs are available on the workers.dev subdomain.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20workers.scripts.subdomain%20%3E%20(model)%20subdomain_delete_response%20%3E%20(schema)>)