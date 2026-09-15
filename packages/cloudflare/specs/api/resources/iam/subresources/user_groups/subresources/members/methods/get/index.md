---
title: Get User Group Member
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[IAM](https://developers.cloudflare.com/api/resources/iam)

[User Groups](https://developers.cloudflare.com/api/resources/iam/subresources/user_groups)

[Members](https://developers.cloudflare.com/api/resources/iam/subresources/user_groups/subresources/members)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get User Group Member

GET/accounts/{account\_id}/iam/user\_groups/{user\_group\_id}/members/{member\_id}

Get details of a specific member in a user group.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`SCIM Provisioning``Account Settings Write``Account Settings Read`

##### P ath ParametersExpand Collapse

account\_id: string

Account identifier tag.

maxLength32

minLength32

[Link to this property](#)%20iam.user_groups.members%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

user\_group\_id: string

User Group identifier tag.

maxLength32

minLength32

[Link to this property](#)%20iam.user_groups.members%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20user_group_id%20%3E%20(schema)>)

member\_id: string

The identifier of an existing account Member.

maxLength32

minLength32

[Link to this property](#)%20iam.user_groups.members%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20member_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

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

[Link to this property](#)%20iam.user_groups.members%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20iam.user_groups.members%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20iam.user_groups.members%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {id, created\_at, email, 2 more }

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

[Link to this property](#)%20iam.user_groups.members%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Get User Group Member

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/iam/user_groups/$USER_GROUP_ID/members/$MEMBER_ID \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "id": "4f5f0c14a2a41d5063dd301b2f829f04",
    "created_at": "2026-01-15T10:30:00Z",
    "email": "user@example.com",
    "status": "accepted",
    "user": {
      "id": "7c5dae5552338874e5053f2534d2767a",
      "email": "user@example.com",
      "first_name": "Alice",
      "last_name": "Smith"
    }
  }
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "id": "4f5f0c14a2a41d5063dd301b2f829f04",
    "created_at": "2026-01-15T10:30:00Z",
    "email": "user@example.com",
    "status": "accepted",
    "user": {
      "id": "7c5dae5552338874e5053f2534d2767a",
      "email": "user@example.com",
      "first_name": "Alice",
      "last_name": "Smith"
    }
  }
}
```