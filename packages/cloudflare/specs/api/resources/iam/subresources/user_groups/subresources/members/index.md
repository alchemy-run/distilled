---
title: Members
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[IAM](https://developers.cloudflare.com/api/resources/iam)

[User Groups](https://developers.cloudflare.com/api/resources/iam/subresources/user_groups)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Members

##### [List User Group Members](https://developers.cloudflare.com/api/resources/iam/subresources/user_groups/subresources/members/methods/list)

GET/accounts/{account\_id}/iam/user\_groups/{user\_group\_id}/members

##### [Get User Group Member](https://developers.cloudflare.com/api/resources/iam/subresources/user_groups/subresources/members/methods/get)

GET/accounts/{account\_id}/iam/user\_groups/{user\_group\_id}/members/{member\_id}

##### [Add User Group Members](https://developers.cloudflare.com/api/resources/iam/subresources/user_groups/subresources/members/methods/create)

POST/accounts/{account\_id}/iam/user\_groups/{user\_group\_id}/members

##### [Update User Group Members](https://developers.cloudflare.com/api/resources/iam/subresources/user_groups/subresources/members/methods/update)

PUT/accounts/{account\_id}/iam/user\_groups/{user\_group\_id}/members

##### [Remove User Group Member](https://developers.cloudflare.com/api/resources/iam/subresources/user_groups/subresources/members/methods/delete)

DELETE/accounts/{account\_id}/iam/user\_groups/{user\_group\_id}/members/{member\_id}

##### ModelsExpand Collapse

<details>

<summary>

MemberListResponse object {id, email, status }

Member attached to a User Group.

</summary>

id: string

Account member identifier.

<a href="#">Link to this property</a>

email: optional string

The contact email address of the user.

maxLength90

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "accepted"or "pending"

The member’s status in the account.

</summary>

One of the following:

"accepted"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.user_groups.members%20%3E%20(model)%20member_list_response%20%3E%20(schema)>)

<details>

<summary>

MemberGetResponse object {id, created\_at, email, 2 more }

Detailed member information for a User Group member.

</summary>

id: string

Account member identifier.

<a href="#">Link to this property</a>

created\_at: optional string

When the member was added to the user group.

formatdate-time

<a href="#">Link to this property</a>

email: optional string

The contact email address of the user.

maxLength90

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "accepted"or "pending"

The member’s status in the account.

</summary>

One of the following:

"accepted"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

user: optional object {id, email, first\_name, last\_name }

Details of the user associated with this membership.

</summary>

id: optional string

User identifier tag.

<a href="#">Link to this property</a>

email: optional string

The contact email address of the user.

maxLength90

<a href="#">Link to this property</a>

first\_name: optional string

User’s first name.

<a href="#">Link to this property</a>

last\_name: optional string

User’s last name.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.user_groups.members%20%3E%20(model)%20member_get_response%20%3E%20(schema)>)

<details>

<summary>

MemberCreateResponse object {id, email, status }

Member attached to a User Group.

</summary>

id: string

Account member identifier.

<a href="#">Link to this property</a>

email: optional string

The contact email address of the user.

maxLength90

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "accepted"or "pending"

The member’s status in the account.

</summary>

One of the following:

"accepted"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.user_groups.members%20%3E%20(model)%20member_create_response%20%3E%20(schema)>)

<details>

<summary>

MemberUpdateResponse object {id, email, status }

Member attached to a User Group.

</summary>

id: string

Account member identifier.

<a href="#">Link to this property</a>

email: optional string

The contact email address of the user.

maxLength90

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "accepted"or "pending"

The member’s status in the account.

</summary>

One of the following:

"accepted"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.user_groups.members%20%3E%20(model)%20member_update_response%20%3E%20(schema)>)

<details>

<summary>

MemberDeleteResponse object {id, email, status }

Member attached to a User Group.

</summary>

id: string

Account member identifier.

<a href="#">Link to this property</a>

email: optional string

The contact email address of the user.

maxLength90

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "accepted"or "pending"

The member’s status in the account.

</summary>

One of the following:

"accepted"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.user_groups.members%20%3E%20(model)%20member_delete_response%20%3E%20(schema)>)