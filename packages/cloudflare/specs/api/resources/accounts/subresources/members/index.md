---
title: Members
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Accounts](https://developers.cloudflare.com/api/resources/accounts)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Members

##### [List Members](https://developers.cloudflare.com/api/resources/accounts/subresources/members/methods/list)

GET/accounts/{account\_id}/members

##### [Member Details](https://developers.cloudflare.com/api/resources/accounts/subresources/members/methods/get)

GET/accounts/{account\_id}/members/{member\_id}

##### [Add Member](https://developers.cloudflare.com/api/resources/accounts/subresources/members/methods/create)

POST/accounts/{account\_id}/members

##### [Update Member](https://developers.cloudflare.com/api/resources/accounts/subresources/members/methods/update)

PUT/accounts/{account\_id}/members/{member\_id}

##### [Remove Member](https://developers.cloudflare.com/api/resources/accounts/subresources/members/methods/delete)

DELETE/accounts/{account\_id}/members/{member\_id}

##### ModelsExpand Collapse

<details>

<summary>

Status = "member"or "invited"

Whether the user is a member of the organization or has an invitation pending.

</summary>

One of the following:

"member"

<a href="#">Link to this property</a>

"invited"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.members%20%3E%20(model)%20status%20%3E%20(schema)>)

<details>

<summary>

MemberDeleteResponse object {id }

</summary>

id: string

Identifier

maxLength32

minLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20accounts.members%20%3E%20(model)%20member_delete_response%20%3E%20(schema)>)