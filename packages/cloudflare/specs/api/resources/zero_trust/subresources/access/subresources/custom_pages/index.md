---
title: Custom Pages
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Custom Pages

##### [List custom pages](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/custom_pages/methods/list)

GET/accounts/{account\_id}/access/custom\_pages

##### [Get a custom page](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/custom_pages/methods/get)

GET/accounts/{account\_id}/access/custom\_pages/{custom\_page\_id}

##### [Create a custom page](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/custom_pages/methods/create)

POST/accounts/{account\_id}/access/custom\_pages

##### [Update a custom page](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/custom_pages/methods/update)

PUT/accounts/{account\_id}/access/custom\_pages/{custom\_page\_id}

##### [Delete a custom page](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/custom_pages/methods/delete)

DELETE/accounts/{account\_id}/access/custom\_pages/{custom\_page\_id}

##### ModelsExpand Collapse

<details>

<summary>

CustomPage object {custom\_html, name, type, 2 more }

</summary>

custom\_html: string

Custom page HTML.

<a href="#">Link to this property</a>

name: string

Custom page name.

<a href="#">Link to this property</a>

<details>

<summary>

type: "identity\_denied"or "forbidden"or "login"or "interstitial"

Custom page type.

</summary>

One of the following:

"identity\_denied"

<a href="#">Link to this property</a>

"forbidden"

<a href="#">Link to this property</a>

"login"

<a href="#">Link to this property</a>

"interstitial"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

contract\_version: optional number

Contract version of the page’s Liquid template. Present (&gt;= 1) marks a sanitized template; absent or 0 marks a legacy page served verbatim.

<a href="#">Link to this property</a>

uid: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.custom_pages%20%3E%20(model)%20custom_page%20%3E%20(schema)>)

<details>

<summary>

CustomPageWithoutHTML object {name, type, contract\_version, 2 more }

</summary>

name: string

Custom page name.

<a href="#">Link to this property</a>

<details>

<summary>

type: "identity\_denied"or "forbidden"or "login"or "interstitial"

Custom page type.

</summary>

One of the following:

"identity\_denied"

<a href="#">Link to this property</a>

"forbidden"

<a href="#">Link to this property</a>

"login"

<a href="#">Link to this property</a>

"interstitial"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

contract\_version: optional number

Contract version of the page’s Liquid template. Present (&gt;= 1) marks a sanitized template; absent or 0 marks a legacy page served verbatim.

<a href="#">Link to this property</a>

uid: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

<details>

<summary>

warnings: optional array of object {message, tier, ref }

Advisory validation findings returned when creating or updating a template. Omitted when empty.

</summary>

message: string

Human-readable description of the finding.

<a href="#">Link to this property</a>

tier: string

The validation tier that produced the finding (e.g. html, liquid).

<a href="#">Link to this property</a>

ref: optional string

Optional pointer to the part of the template the finding refers to.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.custom_pages%20%3E%20(model)%20custom_page_without_html%20%3E%20(schema)>)

<details>

<summary>

CustomPageDeleteResponse object {id }

</summary>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.custom_pages%20%3E%20(model)%20custom_page_delete_response%20%3E%20(schema)>)