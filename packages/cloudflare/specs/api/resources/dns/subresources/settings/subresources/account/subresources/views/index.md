---
title: Views
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[DNS](https://developers.cloudflare.com/api/resources/dns)

[Settings](https://developers.cloudflare.com/api/resources/dns/subresources/settings)

[Account](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/account)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Views

##### [List Internal DNS Views](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/account/subresources/views/methods/list)

GET/accounts/{account\_id}/dns\_settings/views

##### [DNS Internal View Details](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/account/subresources/views/methods/get)

GET/accounts/{account\_id}/dns\_settings/views/{view\_id}

##### [Create Internal DNS View](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/account/subresources/views/methods/create)

POST/accounts/{account\_id}/dns\_settings/views

##### [Update Internal DNS View](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/account/subresources/views/methods/edit)

PATCH/accounts/{account\_id}/dns\_settings/views/{view\_id}

##### [Delete Internal DNS View](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/account/subresources/views/methods/delete)

DELETE/accounts/{account\_id}/dns\_settings/views/{view\_id}

##### ModelsExpand Collapse

<details>

<summary>

ViewListResponse object {id, created\_time, modified\_time, 2 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

created\_time: string

When the view was created.

formatdate-time

<a href="#">Link to this property</a>

modified\_time: string

When the view was last modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

The name of the view.

maxLength255

minLength1

<a href="#">Link to this property</a>

zones: array of string

The list of zones linked to this view.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.settings.account.views%20%3E%20(model)%20view_list_response%20%3E%20(schema)>)

<details>

<summary>

ViewGetResponse object {id, created\_time, modified\_time, 2 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

created\_time: string

When the view was created.

formatdate-time

<a href="#">Link to this property</a>

modified\_time: string

When the view was last modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

The name of the view.

maxLength255

minLength1

<a href="#">Link to this property</a>

zones: array of string

The list of zones linked to this view.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.settings.account.views%20%3E%20(model)%20view_get_response%20%3E%20(schema)>)

<details>

<summary>

ViewCreateResponse object {id, created\_time, modified\_time, 2 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

created\_time: string

When the view was created.

formatdate-time

<a href="#">Link to this property</a>

modified\_time: string

When the view was last modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

The name of the view.

maxLength255

minLength1

<a href="#">Link to this property</a>

zones: array of string

The list of zones linked to this view.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.settings.account.views%20%3E%20(model)%20view_create_response%20%3E%20(schema)>)

<details>

<summary>

ViewEditResponse object {id, created\_time, modified\_time, 2 more }

</summary>

id: string

Identifier.

maxLength32

<a href="#">Link to this property</a>

created\_time: string

When the view was created.

formatdate-time

<a href="#">Link to this property</a>

modified\_time: string

When the view was last modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

The name of the view.

maxLength255

minLength1

<a href="#">Link to this property</a>

zones: array of string

The list of zones linked to this view.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.settings.account.views%20%3E%20(model)%20view_edit_response%20%3E%20(schema)>)

<details>

<summary>

ViewDeleteResponse object {id }

</summary>

id: optional string

Identifier.

maxLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20dns.settings.account.views%20%3E%20(model)%20view_delete_response%20%3E%20(schema)>)