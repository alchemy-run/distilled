---
title: Create a new app
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Calls](https://developers.cloudflare.com/api/resources/calls)

[SFU](https://developers.cloudflare.com/api/resources/calls/subresources/sfu)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create a new app

POST/accounts/{account\_id}/calls/apps

Creates a new Cloudflare calls app. An app is an unique enviroment where each Session can access all Tracks within the app.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Calls Write`

##### P ath ParametersExpand Collapse

account\_id: string

The account identifier tag.

maxLength32

[Link to this property](#)%20calls.sfu%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

name: optional string

A short description of Calls app, not shown to end users.

[Link to this property](#)%20calls.sfu%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

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

[Link to this property](#)%20calls.sfu%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20calls.sfu%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20calls.sfu%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {created, modified, name, 2 more }

</summary>

created: string

The date and time the item was created.

formatdate-time

<a href="#">Link to this property</a>

modified: string

The date and time the item was last modified.

formatdate-time

<a href="#">Link to this property</a>

name: string

A short description of Calls app, not shown to end users.

<a href="#">Link to this property</a>

secret: string

Bearer token

maxLength64

minLength64

<a href="#">Link to this property</a>

uid: string

A Cloudflare-generated unique identifier for a item.

maxLength32

minLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20calls.sfu%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Create a new app

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/calls/apps \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "production-realtime-app"
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
    "created": "2014-01-02T02:20:00Z",
    "modified": "2014-01-02T02:20:00Z",
    "name": "production-realtime-app",
    "secret": "66bcf64aa8907b9f9d90ac17746a77ce394c393b92b3916633dc02846e608ad4",
    "uid": "2a95132c15732412d22c1476fa83f27a"
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
    "created": "2014-01-02T02:20:00Z",
    "modified": "2014-01-02T02:20:00Z",
    "name": "production-realtime-app",
    "secret": "66bcf64aa8907b9f9d90ac17746a77ce394c393b92b3916633dc02846e608ad4",
    "uid": "2a95132c15732412d22c1476fa83f27a"
  }
}
```