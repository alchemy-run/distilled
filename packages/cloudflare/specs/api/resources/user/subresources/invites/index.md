---
title: Invites
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[User](https://developers.cloudflare.com/api/resources/user)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Invites

##### [List Invitations](https://developers.cloudflare.com/api/resources/user/subresources/invites/methods/list)

GET/user/invites

##### [Invitation Details](https://developers.cloudflare.com/api/resources/user/subresources/invites/methods/get)

GET/user/invites/{invite\_id}

##### [Respond to Invitation](https://developers.cloudflare.com/api/resources/user/subresources/invites/methods/edit)

PATCH/user/invites/{invite\_id}

##### ModelsExpand Collapse

<details>

<summary>

Invite object {invited\_member\_id, organization\_id, id, 8 more }

</summary>

invited\_member\_id: string

ID of the user to add to the organization.

maxLength32

<a href="#">Link to this property</a>

organization\_id: string

ID of the organization the user will be added to.

maxLength32

<a href="#">Link to this property</a>

id: optional string

Invite identifier tag.

maxLength32

<a href="#">Link to this property</a>

expires\_on: optional string

When the invite is no longer active.

formatdate-time

<a href="#">Link to this property</a>

invited\_by: optional string

The email address of the user who created the invite.

maxLength90

<a href="#">Link to this property</a>

invited\_member\_email: optional string

Email address of the user to add to the organization.

maxLength90

<a href="#">Link to this property</a>

invited\_on: optional string

When the invite was sent.

formatdate-time

<a href="#">Link to this property</a>

organization\_is\_enforcing\_twofactor: optional boolean

<a href="#">Link to this property</a>

organization\_name: optional string

Organization name.

maxLength100

<a href="#">Link to this property</a>

roles: optional array of string

List of role names the membership has for this account.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "pending"or "accepted"or "rejected"or "expired"

Current status of the invitation.

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"accepted"

<a href="#">Link to this property</a>

"rejected"

<a href="#">Link to this property</a>

"expired"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.invites%20%3E%20(model)%20invite%20%3E%20(schema)>)