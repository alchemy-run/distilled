---
title: Addresses
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Routing](https://developers.cloudflare.com/api/resources/email_routing)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Addresses

##### [List destination addresses](https://developers.cloudflare.com/api/resources/email_routing/subresources/addresses/methods/list)

GET/accounts/{account\_id}/email/routing/addresses

##### [Get a destination address](https://developers.cloudflare.com/api/resources/email_routing/subresources/addresses/methods/get)

GET/accounts/{account\_id}/email/routing/addresses/{destination\_address\_identifier}

##### [Create a destination address](https://developers.cloudflare.com/api/resources/email_routing/subresources/addresses/methods/create)

POST/accounts/{account\_id}/email/routing/addresses

##### [Update destination address](https://developers.cloudflare.com/api/resources/email_routing/subresources/addresses/methods/edit)

PATCH/accounts/{account\_id}/email/routing/addresses/{destination\_address\_identifier}

##### [Delete destination address](https://developers.cloudflare.com/api/resources/email_routing/subresources/addresses/methods/delete)

DELETE/accounts/{account\_id}/email/routing/addresses/{destination\_address\_identifier}

##### ModelsExpand Collapse

<details>

<summary>

Address object {id, created, email, 3 more }

</summary>

id: optional string

Destination address identifier.

maxLength32

<a href="#">Link to this property</a>

created: optional string

The date and time the destination address has been created.

formatdate-time

<a href="#">Link to this property</a>

email: optional string

The contact email address of the user.

maxLength90

<a href="#">Link to this property</a>

modified: optional string

The date and time the destination address was last modified.

formatdate-time

<a href="#">Link to this property</a>

Deprecatedtag: optional string

Destination address tag. (Deprecated, replaced by destination address identifier)

maxLength32

<a href="#">Link to this property</a>

verified: optional string

The date and time the destination address has been verified. Null means not verified yet.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_routing.addresses%20%3E%20(model)%20address%20%3E%20(schema)>)