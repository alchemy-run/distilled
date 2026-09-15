---
title: Users
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Zero Trust](https://developers.cloudflare.com/api/resources/zero_trust)

[Access](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access)

[Applications](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/applications)

[Policy Tests](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/applications/subresources/policy_tests)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Users

##### [Get an Access policy test users page](https://developers.cloudflare.com/api/resources/zero_trust/subresources/access/subresources/applications/subresources/policy_tests/subresources/users/methods/list)

GET/accounts/{account\_id}/access/policy-tests/{policy\_test\_id}/users

##### ModelsExpand Collapse

<details>

<summary>

UserListResponse object {id, email, name, status }

</summary>

id: optional string

UUID.

maxLength36

<a href="#">Link to this property</a>

email: optional string

The email of the user.

formatemail

<a href="#">Link to this property</a>

name: optional string

The name of the user.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "approved"or "blocked"or "error"

Policy evaluation result for an individual user.

</summary>

One of the following:

"approved"

<a href="#">Link to this property</a>

"blocked"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20zero_trust.access.applications.policy_tests.users%20%3E%20(model)%20user_list_response%20%3E%20(schema)>)