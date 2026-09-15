---
title: Bookmarks
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Bookmarks

##### [List Bookmark applications](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/bookmarks/methods/list)

Deprecated

GET/accounts/{account\_id}/access/bookmarks

##### [Get a Bookmark application](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/bookmarks/methods/get)

Deprecated

GET/accounts/{account\_id}/access/bookmarks/{bookmark\_id}

##### [Create a Bookmark application](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/bookmarks/methods/create)

Deprecated

POST/accounts/{account\_id}/access/bookmarks/{bookmark\_id}

##### [Update a Bookmark application](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/bookmarks/methods/update)

Deprecated

PUT/accounts/{account\_id}/access/bookmarks/{bookmark\_id}

##### [Delete a Bookmark application](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/bookmarks/methods/delete)

Deprecated

DELETE/accounts/{account\_id}/access/bookmarks/{bookmark\_id}

##### ModelsExpand Collapse

<details>

<summary>

Bookmark object {id, app\_launcher\_visible, domain, 2 more }

</summary>

id: optional string

The unique identifier for the Bookmark application.

<a href="#">Link to this property</a>

app\_launcher\_visible: optional boolean

Displays the application in the App Launcher.

<a href="#">Link to this property</a>

domain: optional string

The domain of the Bookmark application.

<a href="#">Link to this property</a>

logo\_url: optional string

The image URL for the logo shown in the App Launcher dashboard.

<a href="#">Link to this property</a>

name: optional string

The name of the Bookmark application.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.bookmarks%20%3E%20(model)%20bookmark%20%3E%20(schema)>)

<details>

<summary>

BookmarkDeleteResponse object {id }

</summary>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.bookmarks%20%3E%20(model)%20bookmark_delete_response%20%3E%20(schema)>)