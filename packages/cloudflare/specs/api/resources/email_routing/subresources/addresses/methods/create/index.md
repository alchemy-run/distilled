---
title: Create a destination address
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Email Routing](https://developers.cloudflare.com/api/resources/email_routing)

[Addresses](https://developers.cloudflare.com/api/resources/email_routing/subresources/addresses)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create a destination address

POST/accounts/{account\_id}/email/routing/addresses

Create a destination address to forward your emails to. Destination addresses need to be verified before they can be used.

##### Security

API Email + API Key

The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**`X-Auth-Email: user@example.com`

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**`X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194`

##### Accepted Permissions (at least one required)

`Email Routing Addresses Write`

##### P ath ParametersExpand Collapse

account\_id: string

Identifier.

maxLength32

[Link to this property](#)%20email_routing.addresses%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

email: string

The contact email address of the user.

maxLength90

[Link to this property](#)%20email_routing.addresses%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20email%20%3E%20(schema)>)

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

[Link to this property](#)%20email_routing.addresses%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20email_routing.addresses%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20email_routing.addresses%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional <a href="https://developers.cloudflare.com/api/resources/email_routing#(resource)%20email_routing.addresses%20%3E%20(model)%20address%20%3E%20(schema)">Address</a> { id, created, email, 3 more }

</summary>

id: optional string

Destination address identifier.

maxLength32

<a href="#">Link to this property</a>

created: optional string

The date and time the destination address has been created.

formatdate-time

<a href="#">Link to this property</a>

email: optional string

The contact email address of the user.

maxLength90

<a href="#">Link to this property</a>

modified: optional string

The date and time the destination address was last modified.

formatdate-time

<a href="#">Link to this property</a>

Deprecatedtag: optional string

Destination address tag. (Deprecated, replaced by destination address identifier)

maxLength32

<a href="#">Link to this property</a>

verified: optional string

The date and time the destination address has been verified. Null means not verified yet.

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20email_routing.addresses%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Create a destination address

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email/routing/addresses \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "email": "user@example.com"
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
    "id": "ea95132c15732412d22c1476fa83f27a",
    "created": "2014-01-02T02:20:00Z",
    "email": "user@example.com",
    "modified": "2014-01-02T02:20:00Z",
    "tag": "ea95132c15732412d22c1476fa83f27a",
    "verified": "2014-01-02T02:20:00Z"
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
    "id": "ea95132c15732412d22c1476fa83f27a",
    "created": "2014-01-02T02:20:00Z",
    "email": "user@example.com",
    "modified": "2014-01-02T02:20:00Z",
    "tag": "ea95132c15732412d22c1476fa83f27a",
    "verified": "2014-01-02T02:20:00Z"
  }
}
```