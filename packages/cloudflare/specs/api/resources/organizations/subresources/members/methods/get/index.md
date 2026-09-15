---
title: Get organization member
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Organizations](https://developers.cloudflare.com/api/resources/organizations)

[Members](https://developers.cloudflare.com/api/resources/organizations/subresources/members)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get organization member

GET/organizations/{organization\_id}/members/{member\_id}

Retrieve a single membership from an Organization. (Currently in Public Beta - see https://developers.cloudflare.com/fundamentals/organizations/)

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### P ath ParametersExpand Collapse

organization\_id: string

[Link to this property](#)%20organizations.members%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20organization_id%20%3E%20(schema)>)

member\_id: string

Organization Member ID

[Link to this property](#)%20organizations.members%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20member_id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

errors: array of unknown

[Link to this property](#)%20organizations.members%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20organizations.members%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: <a href="https://developers.cloudflare.com/api/resources/organizations#(resource)%20organizations.members%20%3E%20(model)%20organization_member%20%3E%20(schema)">OrganizationMember</a> { id, create\_time, meta, 3 more }

</summary>

id: string

Organization Member ID

<a href="#">Link to this property</a>

create\_time: string

formatdate-time

<a href="#">Link to this property</a>

meta: map\[unknown]

<a href="#">Link to this property</a>

<details>

<summary>

status: "active"or "pending"or "rejected"or "canceled"

</summary>

One of the following:

"active"

<a href="#">Link to this property</a>

"pending"

<a href="#">Link to this property</a>

"rejected"

<a href="#">Link to this property</a>

"canceled"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

update\_time: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

user: object {id, email, name, two\_factor\_authentication\_enabled }

</summary>

id: string

<a href="#">Link to this property</a>

email: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

two\_factor\_authentication\_enabled: boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20organizations.members%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

[Link to this property](#)%20organizations.members%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get organization member

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/organizations/$ORGANIZATION_ID/members/$MEMBER_ID \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

200 example

```
{
  "errors": [],
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
  "result": {
    "id": "a7b9c3d2e8f4a1b5c6d0e9f2a3b7c4d8",
    "create_time": "2019-12-27T18:11:19.117Z",
    "meta": {
      "foo": {}
    },
    "status": "active",
    "update_time": "2019-12-27T18:11:19.117Z",
    "user": {
      "id": "id",
      "email": "email",
      "name": "name",
      "two_factor_authentication_enabled": true
    }
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "errors": [],
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
  "result": {
    "id": "a7b9c3d2e8f4a1b5c6d0e9f2a3b7c4d8",
    "create_time": "2019-12-27T18:11:19.117Z",
    "meta": {
      "foo": {}
    },
    "status": "active",
    "update_time": "2019-12-27T18:11:19.117Z",
    "user": {
      "id": "id",
      "email": "email",
      "name": "name",
      "two_factor_authentication_enabled": true
    }
  },
  "success": true
}
```