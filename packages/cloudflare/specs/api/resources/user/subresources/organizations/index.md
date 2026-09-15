---
title: Organizations
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[User](https://developers.cloudflare.com/api/resources/user)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Organizations

##### [List Organizations](https://developers.cloudflare.com/api/resources/user/subresources/organizations/methods/list)

Deprecated

GET/user/organizations

##### [Organization Details](https://developers.cloudflare.com/api/resources/user/subresources/organizations/methods/get)

Deprecated

GET/user/organizations/{organization\_id}

##### [Leave Organization](https://developers.cloudflare.com/api/resources/user/subresources/organizations/methods/delete)

Deprecated

DELETE/user/organizations/{organization\_id}

##### ModelsExpand Collapse

<details>

<summary>

Organization object {id, name, permissions, 2 more }

</summary>

id: optional string

Identifier

maxLength32

minLength32

<a href="#">Link to this property</a>

name: optional string

Organization name.

maxLength100

<a href="#">Link to this property</a>

permissions: optional array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20permission%20%3E%20(schema)">Permission</a>

Access permissions for this User.

<a href="#">Link to this property</a>

roles: optional array of string

List of roles that a user has within an organization.

<a href="#">Link to this property</a>

status: optional <a href="https://developers.cloudflare.com/api/resources/accounts#(resource)%20accounts.members%20%3E%20(model)%20status%20%3E%20(schema)">Status</a>

Whether the user is a member of the organization or has an invitation pending.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.organizations%20%3E%20(model)%20organization%20%3E%20(schema)>)

OrganizationGetResponse = unknown

[Link to this property](#)%20user.organizations%20%3E%20(model)%20organization_get_response%20%3E%20(schema)>)

<details>

<summary>

OrganizationDeleteResponse object {id }

</summary>

id: optional string

Identifier

maxLength32

minLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.organizations%20%3E%20(model)%20organization_delete_response%20%3E%20(schema)>)