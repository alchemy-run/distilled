---
title: Respond to Invitation
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[User](https://developers.cloudflare.com/api/resources/user)

[Invites](https://developers.cloudflare.com/api/resources/user/subresources/invites)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Respond to Invitation

PATCH/user/invites/{invite\_id}

Responds to an invitation.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`Memberships Write`

##### P ath ParametersExpand Collapse

invite\_id: string

Invite identifier tag.

maxLength32

[Link to this property](#)%20user.invites%20%3E%20(method)%20edit%20%3E%20(params)%20default%20%3E%20(param)%20invite_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

status: "accepted"or "rejected"

Status of your response to the invitation (rejected or accepted).

</summary>

One of the following:

"accepted"

<a href="#">Link to this property</a>

"rejected"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20user.invites%20%3E%20(method)%20edit%20%3E%20(params)%200%20%3E%20(param)%20status%20%3E%20(schema)>)

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

[Link to this property](#)%20user.invites%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20user.invites%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20user.invites%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/user#(resource)%20user.invites%20%3E%20(model)%20invite%20%3E%20(schema)">Invite</a> { invited\_member\_id, organization\_id, id, 8 more }

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

[Link to this property](#)%20user.invites%20%3E%20(method)%20edit%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Respond to Invitation

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/user/invites/$INVITE_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "status": "accepted"
        }'
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
    "invited_member_id": "5a7805061c76ada191ed06f989cc3dac",
    "organization_id": "5a7805061c76ada191ed06f989cc3dac",
    "id": "4f5f0c14a2a41d5063dd301b2f829f04",
    "expires_on": "2014-01-01T05:20:00Z",
    "invited_by": "user@example.com",
    "invited_member_email": "user@example.com",
    "invited_on": "2014-01-01T05:20:00Z",
    "organization_is_enforcing_twofactor": true,
    "organization_name": "Cloudflare, Inc.",
    "roles": [
      "Account Administrator"
    ],
    "status": "accepted"
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
    "invited_member_id": "5a7805061c76ada191ed06f989cc3dac",
    "organization_id": "5a7805061c76ada191ed06f989cc3dac",
    "id": "4f5f0c14a2a41d5063dd301b2f829f04",
    "expires_on": "2014-01-01T05:20:00Z",
    "invited_by": "user@example.com",
    "invited_member_email": "user@example.com",
    "invited_on": "2014-01-01T05:20:00Z",
    "organization_is_enforcing_twofactor": true,
    "organization_name": "Cloudflare, Inc.",
    "roles": [
      "Account Administrator"
    ],
    "status": "accepted"
  }
}
```