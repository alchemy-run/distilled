---
title: IAM
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# IAM

#### IAMPermission Groups

##### [List Account Permission Groups](https://developers.cloudflare.com/api/resources/iam/subresources/permission_groups/methods/list)

GET/accounts/{account\_id}/iam/permission\_groups

##### [Permission Group Details](https://developers.cloudflare.com/api/resources/iam/subresources/permission_groups/methods/get)

GET/accounts/{account\_id}/iam/permission\_groups/{permission\_group\_id}

##### ModelsExpand Collapse

<details>

<summary>

PermissionGroupListResponse object {id, meta, name }

A named group of permissions that map to a group of operations against resources.

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

[Link to this property](#)%20iam.permission_groups%20%3E%20(model)%20permission_group_list_response%20%3E%20(schema)>)

<details>

<summary>

PermissionGroupGetResponse object {id, meta, name }

A named group of permissions that map to a group of operations against resources.

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

[Link to this property](#)%20iam.permission_groups%20%3E%20(model)%20permission_group_get_response%20%3E%20(schema)>)

#### IAMResource Groups

##### [List Resource Groups](https://developers.cloudflare.com/api/resources/iam/subresources/resource_groups/methods/list)

GET/accounts/{account\_id}/iam/resource\_groups

##### [Resource Group Details](https://developers.cloudflare.com/api/resources/iam/subresources/resource_groups/methods/get)

GET/accounts/{account\_id}/iam/resource\_groups/{resource\_group\_id}

##### [Create Resource Group](https://developers.cloudflare.com/api/resources/iam/subresources/resource_groups/methods/create)

POST/accounts/{account\_id}/iam/resource\_groups

##### [Update Resource Group](https://developers.cloudflare.com/api/resources/iam/subresources/resource_groups/methods/update)

PUT/accounts/{account\_id}/iam/resource\_groups/{resource\_group\_id}

##### [Remove Resource Group](https://developers.cloudflare.com/api/resources/iam/subresources/resource_groups/methods/delete)

DELETE/accounts/{account\_id}/iam/resource\_groups/{resource\_group\_id}

##### ModelsExpand Collapse

<details>

<summary>

ResourceGroupListResponse object {id, scope, meta, name }

A group of scoped resources.

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

[Link to this property](#)%20iam.resource_groups%20%3E%20(model)%20resource_group_list_response%20%3E%20(schema)>)

<details>

<summary>

ResourceGroupGetResponse object {id, scope, meta, name }

A group of scoped resources.

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

[Link to this property](#)%20iam.resource_groups%20%3E%20(model)%20resource_group_get_response%20%3E%20(schema)>)

<details>

<summary>

ResourceGroupCreateResponse object {id, scope, meta, name }

A group of scoped resources.

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

[Link to this property](#)%20iam.resource_groups%20%3E%20(model)%20resource_group_create_response%20%3E%20(schema)>)

<details>

<summary>

ResourceGroupUpdateResponse object {id, scope, meta, name }

A group of scoped resources.

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

[Link to this property](#)%20iam.resource_groups%20%3E%20(model)%20resource_group_update_response%20%3E%20(schema)>)

<details>

<summary>

ResourceGroupDeleteResponse object {id }

</summary>

id: string

Identifier

maxLength32

minLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.resource_groups%20%3E%20(model)%20resource_group_delete_response%20%3E%20(schema)>)

#### IAMUser Groups

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

#### IAMUser GroupsMembers

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

#### IAMSSO

##### [Get all SSO connectors](https://developers.cloudflare.com/api/resources/iam/subresources/sso/methods/list)

GET/accounts/{account\_id}/sso\_connectors

##### [Get single SSO connector](https://developers.cloudflare.com/api/resources/iam/subresources/sso/methods/get)

GET/accounts/{account\_id}/sso\_connectors/{sso\_connector\_id}

##### [Initialize new SSO connector](https://developers.cloudflare.com/api/resources/iam/subresources/sso/methods/create)

POST/accounts/{account\_id}/sso\_connectors

##### [Update SSO connector state](https://developers.cloudflare.com/api/resources/iam/subresources/sso/methods/update)

PATCH/accounts/{account\_id}/sso\_connectors/{sso\_connector\_id}

##### [Delete SSO connector](https://developers.cloudflare.com/api/resources/iam/subresources/sso/methods/delete)

DELETE/accounts/{account\_id}/sso\_connectors/{sso\_connector\_id}

##### [Begin SSO connector verification](https://developers.cloudflare.com/api/resources/iam/subresources/sso/methods/begin_verification)

POST/accounts/{account\_id}/sso\_connectors/{sso\_connector\_id}/begin\_verification

##### ModelsExpand Collapse

<details>

<summary>

SSOListResponse object {id, created\_on, email\_domain, 4 more }

</summary>

id: optional string

SSO Connector identifier tag.

maxLength32

minLength32

<a href="#">Link to this property</a>

created\_on: optional string

Timestamp for the creation of the SSO connector

formatdate-time

<a href="#">Link to this property</a>

email\_domain: optional string

<a href="#">Link to this property</a>

enabled: optional boolean

<a href="#">Link to this property</a>

updated\_on: optional string

Timestamp for the last update of the SSO connector

formatdate-time

<a href="#">Link to this property</a>

use\_fedramp\_language: optional boolean

Controls the display of FedRAMP language to the user during SSO login

<a href="#">Link to this property</a>

<details>

<summary>

verification: optional object {code, status }

</summary>

code: optional string

DNS verification code. Add this entire string to the DNS TXT record of the email domain to validate ownership.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "awaiting"or "pending"or "failed"or "verified"

The status of the verification code from the verification process.

</summary>

One of the following:

"awaiting"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

"verified"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.sso%20%3E%20(model)%20sso_list_response%20%3E%20(schema)>)

<details>

<summary>

SSOGetResponse object {id, created\_on, email\_domain, 4 more }

</summary>

id: optional string

SSO Connector identifier tag.

maxLength32

minLength32

<a href="#">Link to this property</a>

created\_on: optional string

Timestamp for the creation of the SSO connector

formatdate-time

<a href="#">Link to this property</a>

email\_domain: optional string

<a href="#">Link to this property</a>

enabled: optional boolean

<a href="#">Link to this property</a>

updated\_on: optional string

Timestamp for the last update of the SSO connector

formatdate-time

<a href="#">Link to this property</a>

use\_fedramp\_language: optional boolean

Controls the display of FedRAMP language to the user during SSO login

<a href="#">Link to this property</a>

<details>

<summary>

verification: optional object {code, status }

</summary>

code: optional string

DNS verification code. Add this entire string to the DNS TXT record of the email domain to validate ownership.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "awaiting"or "pending"or "failed"or "verified"

The status of the verification code from the verification process.

</summary>

One of the following:

"awaiting"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

"verified"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.sso%20%3E%20(model)%20sso_get_response%20%3E%20(schema)>)

<details>

<summary>

SSOCreateResponse object {id, created\_on, email\_domain, 4 more }

</summary>

id: optional string

SSO Connector identifier tag.

maxLength32

minLength32

<a href="#">Link to this property</a>

created\_on: optional string

Timestamp for the creation of the SSO connector

formatdate-time

<a href="#">Link to this property</a>

email\_domain: optional string

<a href="#">Link to this property</a>

enabled: optional boolean

<a href="#">Link to this property</a>

updated\_on: optional string

Timestamp for the last update of the SSO connector

formatdate-time

<a href="#">Link to this property</a>

use\_fedramp\_language: optional boolean

Controls the display of FedRAMP language to the user during SSO login

<a href="#">Link to this property</a>

<details>

<summary>

verification: optional object {code, status }

</summary>

code: optional string

DNS verification code. Add this entire string to the DNS TXT record of the email domain to validate ownership.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "awaiting"or "pending"or "failed"or "verified"

The status of the verification code from the verification process.

</summary>

One of the following:

"awaiting"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

"verified"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.sso%20%3E%20(model)%20sso_create_response%20%3E%20(schema)>)

<details>

<summary>

SSOUpdateResponse object {id, created\_on, email\_domain, 4 more }

</summary>

id: optional string

SSO Connector identifier tag.

maxLength32

minLength32

<a href="#">Link to this property</a>

created\_on: optional string

Timestamp for the creation of the SSO connector

formatdate-time

<a href="#">Link to this property</a>

email\_domain: optional string

<a href="#">Link to this property</a>

enabled: optional boolean

<a href="#">Link to this property</a>

updated\_on: optional string

Timestamp for the last update of the SSO connector

formatdate-time

<a href="#">Link to this property</a>

use\_fedramp\_language: optional boolean

Controls the display of FedRAMP language to the user during SSO login

<a href="#">Link to this property</a>

<details>

<summary>

verification: optional object {code, status }

</summary>

code: optional string

DNS verification code. Add this entire string to the DNS TXT record of the email domain to validate ownership.

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "awaiting"or "pending"or "failed"or "verified"

The status of the verification code from the verification process.

</summary>

One of the following:

"awaiting"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

"verified"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.sso%20%3E%20(model)%20sso_update_response%20%3E%20(schema)>)

<details>

<summary>

SSODeleteResponse object {id }

</summary>

id: string

Identifier

maxLength32

minLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.sso%20%3E%20(model)%20sso_delete_response%20%3E%20(schema)>)

<details>

<summary>

SSOBeginVerificationResponse object {errors, messages, success }

</summary>

<details>

<summary>

errors: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

messages: array of object {code, message, documentation\_url, source }

</summary>

code: number

minimum1000

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

documentation\_url: optional string

<a href="#">Link to this property</a>

<details>

<summary>

source: optional object {pointer }

</summary>

pointer: optional string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: true

Whether the API call was successful.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.sso%20%3E%20(model)%20sso_begin_verification_response%20%3E%20(schema)>)

#### IAMOAuth Clients

##### [List OAuth Clients](https://developers.cloudflare.com/api/resources/iam/subresources/oauth_clients/methods/list)

GET/accounts/{account\_id}/oauth\_clients

##### [OAuth Client Details](https://developers.cloudflare.com/api/resources/iam/subresources/oauth_clients/methods/get)

GET/accounts/{account\_id}/oauth\_clients/{oauth\_client\_id}

##### [Create OAuth Client](https://developers.cloudflare.com/api/resources/iam/subresources/oauth_clients/methods/create)

POST/accounts/{account\_id}/oauth\_clients

##### [Update OAuth Client](https://developers.cloudflare.com/api/resources/iam/subresources/oauth_clients/methods/update)

PATCH/accounts/{account\_id}/oauth\_clients/{oauth\_client\_id}

##### [Delete OAuth Client](https://developers.cloudflare.com/api/resources/iam/subresources/oauth_clients/methods/delete)

DELETE/accounts/{account\_id}/oauth\_clients/{oauth\_client\_id}

##### [Rotate OAuth Client Secret](https://developers.cloudflare.com/api/resources/iam/subresources/oauth_clients/methods/rotate_secret)

POST/accounts/{account\_id}/oauth\_clients/{oauth\_client\_id}/rotate\_secret

##### [Delete Rotated OAuth Client Secret](https://developers.cloudflare.com/api/resources/iam/subresources/oauth_clients/methods/delete_rotated_secret)

DELETE/accounts/{account\_id}/oauth\_clients/{oauth\_client\_id}/rotate\_secret

##### ModelsExpand Collapse

<details>

<summary>

OAuthClientListResponse object {client\_id, visibility, allowed\_cors\_origins, 17 more }

Fields shared by OAuth client responses and create/update requests.

</summary>

client\_id: string

The unique identifier for an OAuth client.

<a href="#">Link to this property</a>

<details>

<summary>

visibility: "public"or "private"

Visibility of the OAuth client.

</summary>

One of the following:

"public"

<a href="#">Link to this property</a>

"private"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

allowed\_cors\_origins: optional array of string

Array of allowed CORS origins.

<a href="#">Link to this property</a>

client\_name: optional string

Human-readable name of the OAuth client.

<a href="#">Link to this property</a>

client\_uri: optional string

URL of the home page of the client.

<a href="#">Link to this property</a>

<details>

<summary>

client\_uri\_verification: optional object {status, text }

Client URI domain control verification state.

</summary>

<details>

<summary>

status: optional "pending"or "in\_progress"or "verified"or "failed"

Current verification status for the client URI host.

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"in\_progress"

<a href="#">Link to this property</a>

"verified"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

text: optional string

Exact TXT record value that must be added to DNS to prove ownership of the client URI host.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

Timestamp when the OAuth client was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

grant\_types: optional array of "authorization\_code"or "refresh\_token"

Array of OAuth grant types the client is allowed to use. <code>authorization_code</code> is required; <code>refresh_token</code> may be included optionally.

</summary>

One of the following:

"authorization\_code"

<a href="#">Link to this property</a>

"refresh\_token"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

has\_rotated\_secret: optional boolean

Indicates whether the client has a rotated secret that has not yet been deleted.

<a href="#">Link to this property</a>

logo\_uri: optional string

URL of the client’s logo.

<a href="#">Link to this property</a>

optional\_scopes: optional array of string

Scopes that the authorizing user may decline during consent. Each value must also appear in <code>scopes</code>. The scopes <code>openid</code>, <code>offline</code>, and <code>offline_access</code> cannot be optional.

<a href="#">Link to this property</a>

policy\_uri: optional string

URL that points to a privacy policy document.

<a href="#">Link to this property</a>

post\_logout\_redirect\_uris: optional array of string

Array of allowed post-logout redirect URIs.

<a href="#">Link to this property</a>

promoted\_at: optional string

Timestamp when the OAuth client was promoted to public visibility.

formatdate-time

<a href="#">Link to this property</a>

redirect\_uris: optional array of string

Array of allowed redirect URIs for the client.

<a href="#">Link to this property</a>

<details>

<summary>

response\_types: optional array of "token"or "id\_token"or "code"

Array of OAuth response types the client is allowed to use.

</summary>

One of the following:

"token"

<a href="#">Link to this property</a>

"id\_token"

<a href="#">Link to this property</a>

"code"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

scopes: optional array of string

Array of OAuth scopes the client is allowed to request. Colon-delimited scopes are not accepted. Dot-delimited scopes are validated against available OAuth API scopes; simple identity scopes are allowed. Protocol scopes <code>offline_access</code> and <code>openid</code> are added or removed automatically based on <code>grant_types</code> and <code>response_types</code>.

<a href="#">Link to this property</a>

<details>

<summary>

token\_endpoint\_auth\_method: optional "none"or "client\_secret\_basic"or "client\_secret\_post"

The authentication method the client uses at the token endpoint.

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"client\_secret\_basic"

<a href="#">Link to this property</a>

"client\_secret\_post"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tos\_uri: optional string

URL that points to a terms of service document.

<a href="#">Link to this property</a>

updated\_at: optional string

Timestamp when the OAuth client was last updated.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.oauth_clients%20%3E%20(model)%20oauth_client_list_response%20%3E%20(schema)>)

<details>

<summary>

OAuthClientGetResponse object {client\_id, visibility, allowed\_cors\_origins, 17 more }

Fields shared by OAuth client responses and create/update requests.

</summary>

client\_id: string

The unique identifier for an OAuth client.

<a href="#">Link to this property</a>

<details>

<summary>

visibility: "public"or "private"

Visibility of the OAuth client.

</summary>

One of the following:

"public"

<a href="#">Link to this property</a>

"private"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

allowed\_cors\_origins: optional array of string

Array of allowed CORS origins.

<a href="#">Link to this property</a>

client\_name: optional string

Human-readable name of the OAuth client.

<a href="#">Link to this property</a>

client\_uri: optional string

URL of the home page of the client.

<a href="#">Link to this property</a>

<details>

<summary>

client\_uri\_verification: optional object {status, text }

Client URI domain control verification state.

</summary>

<details>

<summary>

status: optional "pending"or "in\_progress"or "verified"or "failed"

Current verification status for the client URI host.

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"in\_progress"

<a href="#">Link to this property</a>

"verified"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

text: optional string

Exact TXT record value that must be added to DNS to prove ownership of the client URI host.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

Timestamp when the OAuth client was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

grant\_types: optional array of "authorization\_code"or "refresh\_token"

Array of OAuth grant types the client is allowed to use. <code>authorization_code</code> is required; <code>refresh_token</code> may be included optionally.

</summary>

One of the following:

"authorization\_code"

<a href="#">Link to this property</a>

"refresh\_token"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

has\_rotated\_secret: optional boolean

Indicates whether the client has a rotated secret that has not yet been deleted.

<a href="#">Link to this property</a>

logo\_uri: optional string

URL of the client’s logo.

<a href="#">Link to this property</a>

optional\_scopes: optional array of string

Scopes that the authorizing user may decline during consent. Each value must also appear in <code>scopes</code>. The scopes <code>openid</code>, <code>offline</code>, and <code>offline_access</code> cannot be optional.

<a href="#">Link to this property</a>

policy\_uri: optional string

URL that points to a privacy policy document.

<a href="#">Link to this property</a>

post\_logout\_redirect\_uris: optional array of string

Array of allowed post-logout redirect URIs.

<a href="#">Link to this property</a>

promoted\_at: optional string

Timestamp when the OAuth client was promoted to public visibility.

formatdate-time

<a href="#">Link to this property</a>

redirect\_uris: optional array of string

Array of allowed redirect URIs for the client.

<a href="#">Link to this property</a>

<details>

<summary>

response\_types: optional array of "token"or "id\_token"or "code"

Array of OAuth response types the client is allowed to use.

</summary>

One of the following:

"token"

<a href="#">Link to this property</a>

"id\_token"

<a href="#">Link to this property</a>

"code"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

scopes: optional array of string

Array of OAuth scopes the client is allowed to request. Colon-delimited scopes are not accepted. Dot-delimited scopes are validated against available OAuth API scopes; simple identity scopes are allowed. Protocol scopes <code>offline_access</code> and <code>openid</code> are added or removed automatically based on <code>grant_types</code> and <code>response_types</code>.

<a href="#">Link to this property</a>

<details>

<summary>

token\_endpoint\_auth\_method: optional "none"or "client\_secret\_basic"or "client\_secret\_post"

The authentication method the client uses at the token endpoint.

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"client\_secret\_basic"

<a href="#">Link to this property</a>

"client\_secret\_post"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tos\_uri: optional string

URL that points to a terms of service document.

<a href="#">Link to this property</a>

updated\_at: optional string

Timestamp when the OAuth client was last updated.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.oauth_clients%20%3E%20(model)%20oauth_client_get_response%20%3E%20(schema)>)

<details>

<summary>

OAuthClientCreateResponse object {client\_id, visibility, allowed\_cors\_origins, 18 more }

Fields shared by OAuth client responses and create/update requests.

</summary>

client\_id: string

The unique identifier for an OAuth client.

<a href="#">Link to this property</a>

<details>

<summary>

visibility: "public"or "private"

Visibility of the OAuth client.

</summary>

One of the following:

"public"

<a href="#">Link to this property</a>

"private"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

allowed\_cors\_origins: optional array of string

Array of allowed CORS origins.

<a href="#">Link to this property</a>

client\_name: optional string

Human-readable name of the OAuth client.

<a href="#">Link to this property</a>

client\_secret: optional string

The client secret. This is the only time the secret is returned in a response.

<a href="#">Link to this property</a>

client\_uri: optional string

URL of the home page of the client.

<a href="#">Link to this property</a>

<details>

<summary>

client\_uri\_verification: optional object {status, text }

Client URI domain control verification state.

</summary>

<details>

<summary>

status: optional "pending"or "in\_progress"or "verified"or "failed"

Current verification status for the client URI host.

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"in\_progress"

<a href="#">Link to this property</a>

"verified"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

text: optional string

Exact TXT record value that must be added to DNS to prove ownership of the client URI host.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

Timestamp when the OAuth client was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

grant\_types: optional array of "authorization\_code"or "refresh\_token"

Array of OAuth grant types the client is allowed to use. <code>authorization_code</code> is required; <code>refresh_token</code> may be included optionally.

</summary>

One of the following:

"authorization\_code"

<a href="#">Link to this property</a>

"refresh\_token"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

has\_rotated\_secret: optional boolean

Indicates whether the client has a rotated secret that has not yet been deleted.

<a href="#">Link to this property</a>

logo\_uri: optional string

URL of the client’s logo.

<a href="#">Link to this property</a>

optional\_scopes: optional array of string

Scopes that the authorizing user may decline during consent. Each value must also appear in <code>scopes</code>. The scopes <code>openid</code>, <code>offline</code>, and <code>offline_access</code> cannot be optional.

<a href="#">Link to this property</a>

policy\_uri: optional string

URL that points to a privacy policy document.

<a href="#">Link to this property</a>

post\_logout\_redirect\_uris: optional array of string

Array of allowed post-logout redirect URIs.

<a href="#">Link to this property</a>

promoted\_at: optional string

Timestamp when the OAuth client was promoted to public visibility.

formatdate-time

<a href="#">Link to this property</a>

redirect\_uris: optional array of string

Array of allowed redirect URIs for the client.

<a href="#">Link to this property</a>

<details>

<summary>

response\_types: optional array of "token"or "id\_token"or "code"

Array of OAuth response types the client is allowed to use.

</summary>

One of the following:

"token"

<a href="#">Link to this property</a>

"id\_token"

<a href="#">Link to this property</a>

"code"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

scopes: optional array of string

Array of OAuth scopes the client is allowed to request. Colon-delimited scopes are not accepted. Dot-delimited scopes are validated against available OAuth API scopes; simple identity scopes are allowed. Protocol scopes <code>offline_access</code> and <code>openid</code> are added or removed automatically based on <code>grant_types</code> and <code>response_types</code>.

<a href="#">Link to this property</a>

<details>

<summary>

token\_endpoint\_auth\_method: optional "none"or "client\_secret\_basic"or "client\_secret\_post"

The authentication method the client uses at the token endpoint.

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"client\_secret\_basic"

<a href="#">Link to this property</a>

"client\_secret\_post"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tos\_uri: optional string

URL that points to a terms of service document.

<a href="#">Link to this property</a>

updated\_at: optional string

Timestamp when the OAuth client was last updated.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.oauth_clients%20%3E%20(model)%20oauth_client_create_response%20%3E%20(schema)>)

<details>

<summary>

OAuthClientUpdateResponse object {client\_id, visibility, allowed\_cors\_origins, 17 more }

Fields shared by OAuth client responses and create/update requests.

</summary>

client\_id: string

The unique identifier for an OAuth client.

<a href="#">Link to this property</a>

<details>

<summary>

visibility: "public"or "private"

Visibility of the OAuth client.

</summary>

One of the following:

"public"

<a href="#">Link to this property</a>

"private"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

allowed\_cors\_origins: optional array of string

Array of allowed CORS origins.

<a href="#">Link to this property</a>

client\_name: optional string

Human-readable name of the OAuth client.

<a href="#">Link to this property</a>

client\_uri: optional string

URL of the home page of the client.

<a href="#">Link to this property</a>

<details>

<summary>

client\_uri\_verification: optional object {status, text }

Client URI domain control verification state.

</summary>

<details>

<summary>

status: optional "pending"or "in\_progress"or "verified"or "failed"

Current verification status for the client URI host.

</summary>

One of the following:

"pending"

<a href="#">Link to this property</a>

"in\_progress"

<a href="#">Link to this property</a>

"verified"

<a href="#">Link to this property</a>

"failed"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

text: optional string

Exact TXT record value that must be added to DNS to prove ownership of the client URI host.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

created\_at: optional string

Timestamp when the OAuth client was created.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

grant\_types: optional array of "authorization\_code"or "refresh\_token"

Array of OAuth grant types the client is allowed to use. <code>authorization_code</code> is required; <code>refresh_token</code> may be included optionally.

</summary>

One of the following:

"authorization\_code"

<a href="#">Link to this property</a>

"refresh\_token"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

has\_rotated\_secret: optional boolean

Indicates whether the client has a rotated secret that has not yet been deleted.

<a href="#">Link to this property</a>

logo\_uri: optional string

URL of the client’s logo.

<a href="#">Link to this property</a>

optional\_scopes: optional array of string

Scopes that the authorizing user may decline during consent. Each value must also appear in <code>scopes</code>. The scopes <code>openid</code>, <code>offline</code>, and <code>offline_access</code> cannot be optional.

<a href="#">Link to this property</a>

policy\_uri: optional string

URL that points to a privacy policy document.

<a href="#">Link to this property</a>

post\_logout\_redirect\_uris: optional array of string

Array of allowed post-logout redirect URIs.

<a href="#">Link to this property</a>

promoted\_at: optional string

Timestamp when the OAuth client was promoted to public visibility.

formatdate-time

<a href="#">Link to this property</a>

redirect\_uris: optional array of string

Array of allowed redirect URIs for the client.

<a href="#">Link to this property</a>

<details>

<summary>

response\_types: optional array of "token"or "id\_token"or "code"

Array of OAuth response types the client is allowed to use.

</summary>

One of the following:

"token"

<a href="#">Link to this property</a>

"id\_token"

<a href="#">Link to this property</a>

"code"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

scopes: optional array of string

Array of OAuth scopes the client is allowed to request. Colon-delimited scopes are not accepted. Dot-delimited scopes are validated against available OAuth API scopes; simple identity scopes are allowed. Protocol scopes <code>offline_access</code> and <code>openid</code> are added or removed automatically based on <code>grant_types</code> and <code>response_types</code>.

<a href="#">Link to this property</a>

<details>

<summary>

token\_endpoint\_auth\_method: optional "none"or "client\_secret\_basic"or "client\_secret\_post"

The authentication method the client uses at the token endpoint.

</summary>

One of the following:

"none"

<a href="#">Link to this property</a>

"client\_secret\_basic"

<a href="#">Link to this property</a>

"client\_secret\_post"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

tos\_uri: optional string

URL that points to a terms of service document.

<a href="#">Link to this property</a>

updated\_at: optional string

Timestamp when the OAuth client was last updated.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.oauth_clients%20%3E%20(model)%20oauth_client_update_response%20%3E%20(schema)>)

<details>

<summary>

OAuthClientDeleteResponse object {id }

</summary>

id: string

Identifier

maxLength32

minLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.oauth_clients%20%3E%20(model)%20oauth_client_delete_response%20%3E%20(schema)>)

<details>

<summary>

OAuthClientRotateSecretResponse object {client\_secret }

</summary>

client\_secret: optional string

The new client secret.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.oauth_clients%20%3E%20(model)%20oauth_client_rotate_secret_response%20%3E%20(schema)>)

<details>

<summary>

OAuthClientDeleteRotatedSecretResponse object {id }

</summary>

id: string

Identifier

maxLength32

minLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.oauth_clients%20%3E%20(model)%20oauth_client_delete_rotated_secret_response%20%3E%20(schema)>)

#### IAMOAuth Scopes

##### [List OAuth Scopes](https://developers.cloudflare.com/api/resources/iam/subresources/oauth_scopes/methods/list)

GET/oauth/scopes

##### ModelsExpand Collapse

<details>

<summary>

OAuthScopeListResponse object {id, name, category, scopes }

An available OAuth scope that can be assigned to an OAuth client.

</summary>

id: string

The scope label to use in the scopes array when creating or updating an OAuth client.

<a href="#">Link to this property</a>

name: string

Human-readable name of the OAuth scope.

<a href="#">Link to this property</a>

category: optional string

Category for grouping scopes in the UI.

<a href="#">Link to this property</a>

scopes: optional array of string

The underlying resource scopes (Bach scopes) that define which resources this OAuth scope can act upon.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20iam.oauth_scopes%20%3E%20(model)%20oauth_scope_list_response%20%3E%20(schema)>)