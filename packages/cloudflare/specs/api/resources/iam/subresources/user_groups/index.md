---
title: User Groups
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[IAM](https://developers.cloudflare.com/api/resources/iam)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# User Groups

##### [List User Groups](https://developers.cloudflare.com/api/resources/iam/subresources/user_groups/methods/list)

GET/accounts/{account\_id}/iam/user\_groups

##### [User Group Details](https://developers.cloudflare.com/api/resources/iam/subresources/user_groups/methods/get)

GET/accounts/{account\_id}/iam/user\_groups/{user\_group\_id}

##### [Create User Group](https://developers.cloudflare.com/api/resources/iam/subresources/user_groups/methods/create)

POST/accounts/{account\_id}/iam/user\_groups

##### [Update User Group](https://developers.cloudflare.com/api/resources/iam/subresources/user_groups/methods/update)

PUT/accounts/{account\_id}/iam/user\_groups/{user\_group\_id}

##### [Remove User Group](https://developers.cloudflare.com/api/resources/iam/subresources/user_groups/methods/delete)

DELETE/accounts/{account\_id}/iam/user\_groups/{user\_group\_id}

##### ModelsExpand Collapse

<details>

<summary>

UserGroupListResponse object {id, created\_on, modified\_on, 2 more }

A group of policies resources.

</summary>

id: string

User Group identifier tag.

maxLength32

minLength32

<a href="#">Link to this property</a>

created\_on: string

Timestamp for the creation of the user group

formatdate-time

<a href="#">Link to this property</a>

modified\_on: string

Last time the user group was modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

Name of the user group.

<a href="#">Link to this property</a>

<details>

<summary>

policies: optional array of object {id, access, permission\_groups, resource\_groups }

Policies attached to the User group

</summary>

id: optional string

Policy identifier.

<a href="#">Link to this property</a>

<details>

<summary>

access: optional "allow"or "deny"

Allow or deny operations against the resources.

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"deny"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

permission\_groups: optional array of object {id, meta, name }

A set of permission groups that are specified to the policy.

</summary>

id: string

Identifier of the permission group.

<a href="#">Link to this property</a>

<details>

<summary>

meta: optional object {key, value }

Attributes associated to the permission group.

</summary>

key: optional string

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Name of the permission group.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

resource\_groups: optional array of object {id, scope, meta, name }

A list of resource groups that the policy applies to.

</summary>

id: string

Identifier of the resource group.

<a href="#">Link to this property</a>

<details>

<summary>

scope: object {key, objects }

A scope is a combination of scope objects which provides additional context.

</summary>

key: string

This is a combination of pre-defined resource name and identifier (like Account ID etc.)

<a href="#">Link to this property</a>

<details>

<summary>

objects: array of object {key }

A list of scope objects for additional context.

</summary>

key: string

This is a combination of pre-defined resource name and identifier (like Zone ID etc.)

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

meta: optional object {key, value }

Attributes associated to the resource group.

</summary>

key: optional string

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Name of the resource group.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.user_groups%20%3E%20(model)%20user_group_list_response%20%3E%20(schema)>)

<details>

<summary>

UserGroupGetResponse object {id, created\_on, modified\_on, 2 more }

A group of policies resources.

</summary>

id: string

User Group identifier tag.

maxLength32

minLength32

<a href="#">Link to this property</a>

created\_on: string

Timestamp for the creation of the user group

formatdate-time

<a href="#">Link to this property</a>

modified\_on: string

Last time the user group was modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

Name of the user group.

<a href="#">Link to this property</a>

<details>

<summary>

policies: optional array of object {id, access, permission\_groups, resource\_groups }

Policies attached to the User group

</summary>

id: optional string

Policy identifier.

<a href="#">Link to this property</a>

<details>

<summary>

access: optional "allow"or "deny"

Allow or deny operations against the resources.

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"deny"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

permission\_groups: optional array of object {id, meta, name }

A set of permission groups that are specified to the policy.

</summary>

id: string

Identifier of the permission group.

<a href="#">Link to this property</a>

<details>

<summary>

meta: optional object {key, value }

Attributes associated to the permission group.

</summary>

key: optional string

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Name of the permission group.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

resource\_groups: optional array of object {id, scope, meta, name }

A list of resource groups that the policy applies to.

</summary>

id: string

Identifier of the resource group.

<a href="#">Link to this property</a>

<details>

<summary>

scope: object {key, objects }

A scope is a combination of scope objects which provides additional context.

</summary>

key: string

This is a combination of pre-defined resource name and identifier (like Account ID etc.)

<a href="#">Link to this property</a>

<details>

<summary>

objects: array of object {key }

A list of scope objects for additional context.

</summary>

key: string

This is a combination of pre-defined resource name and identifier (like Zone ID etc.)

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

meta: optional object {key, value }

Attributes associated to the resource group.

</summary>

key: optional string

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Name of the resource group.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.user_groups%20%3E%20(model)%20user_group_get_response%20%3E%20(schema)>)

<details>

<summary>

UserGroupCreateResponse object {id, created\_on, modified\_on, 2 more }

A group of policies resources.

</summary>

id: string

User Group identifier tag.

maxLength32

minLength32

<a href="#">Link to this property</a>

created\_on: string

Timestamp for the creation of the user group

formatdate-time

<a href="#">Link to this property</a>

modified\_on: string

Last time the user group was modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

Name of the user group.

<a href="#">Link to this property</a>

<details>

<summary>

policies: optional array of object {id, access, permission\_groups, resource\_groups }

Policies attached to the User group

</summary>

id: optional string

Policy identifier.

<a href="#">Link to this property</a>

<details>

<summary>

access: optional "allow"or "deny"

Allow or deny operations against the resources.

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"deny"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

permission\_groups: optional array of object {id, meta, name }

A set of permission groups that are specified to the policy.

</summary>

id: string

Identifier of the permission group.

<a href="#">Link to this property</a>

<details>

<summary>

meta: optional object {key, value }

Attributes associated to the permission group.

</summary>

key: optional string

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Name of the permission group.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

resource\_groups: optional array of object {id, scope, meta, name }

A list of resource groups that the policy applies to.

</summary>

id: string

Identifier of the resource group.

<a href="#">Link to this property</a>

<details>

<summary>

scope: object {key, objects }

A scope is a combination of scope objects which provides additional context.

</summary>

key: string

This is a combination of pre-defined resource name and identifier (like Account ID etc.)

<a href="#">Link to this property</a>

<details>

<summary>

objects: array of object {key }

A list of scope objects for additional context.

</summary>

key: string

This is a combination of pre-defined resource name and identifier (like Zone ID etc.)

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

meta: optional object {key, value }

Attributes associated to the resource group.

</summary>

key: optional string

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Name of the resource group.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.user_groups%20%3E%20(model)%20user_group_create_response%20%3E%20(schema)>)

<details>

<summary>

UserGroupUpdateResponse object {id, created\_on, modified\_on, 2 more }

A group of policies resources.

</summary>

id: string

User Group identifier tag.

maxLength32

minLength32

<a href="#">Link to this property</a>

created\_on: string

Timestamp for the creation of the user group

formatdate-time

<a href="#">Link to this property</a>

modified\_on: string

Last time the user group was modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

Name of the user group.

<a href="#">Link to this property</a>

<details>

<summary>

policies: optional array of object {id, access, permission\_groups, resource\_groups }

Policies attached to the User group

</summary>

id: optional string

Policy identifier.

<a href="#">Link to this property</a>

<details>

<summary>

access: optional "allow"or "deny"

Allow or deny operations against the resources.

</summary>

One of the following:

"allow"

<a href="#">Link to this property</a>

"deny"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

permission\_groups: optional array of object {id, meta, name }

A set of permission groups that are specified to the policy.

</summary>

id: string

Identifier of the permission group.

<a href="#">Link to this property</a>

<details>

<summary>

meta: optional object {key, value }

Attributes associated to the permission group.

</summary>

key: optional string

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Name of the permission group.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

resource\_groups: optional array of object {id, scope, meta, name }

A list of resource groups that the policy applies to.

</summary>

id: string

Identifier of the resource group.

<a href="#">Link to this property</a>

<details>

<summary>

scope: object {key, objects }

A scope is a combination of scope objects which provides additional context.

</summary>

key: string

This is a combination of pre-defined resource name and identifier (like Account ID etc.)

<a href="#">Link to this property</a>

<details>

<summary>

objects: array of object {key }

A list of scope objects for additional context.

</summary>

key: string

This is a combination of pre-defined resource name and identifier (like Zone ID etc.)

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

meta: optional object {key, value }

Attributes associated to the resource group.

</summary>

key: optional string

<a href="#">Link to this property</a>

value: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

Name of the resource group.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.user_groups%20%3E%20(model)%20user_group_update_response%20%3E%20(schema)>)

<details>

<summary>

UserGroupDeleteResponse object {id }

</summary>

id: string

Identifier

maxLength32

minLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.user_groups%20%3E%20(model)%20user_group_delete_response%20%3E%20(schema)>)

#### User GroupsMembers

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