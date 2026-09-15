---
title: Retrieve TURN key details
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Calls](https://developers.cloudflare.com/api/resources/calls)

[TURN](https://developers.cloudflare.com/api/resources/calls/subresources/turn)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Retrieve TURN key details

GET/accounts/{account\_id}/calls/turn\_keys/{key\_id}

Fetches details for a single TURN key.

##### Security

API Token

The preferred authorization scheme for interacting with the Cloudflare API. [Create a token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

**Example:**`Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY`

##### Accepted Permissions (at least one required)

`Calls Write``Calls Read`

##### P ath ParametersExpand Collapse

account\_id: string

The account identifier tag.

maxLength32

[Link to this property](#)%20calls.turn%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

key\_id: string

A Cloudflare-generated unique identifier for a item.

maxLength32

minLength32

[Link to this property](#)%20calls.turn%20%3E%20(method)%20get%20%3E%20(params)%20default%20%3E%20(param)%20key_id%20%3E%20(schema)>)

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

[Link to this property](#)%20calls.turn%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20calls.turn%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

success: true

Whether the API call was successful.

[Link to this property](#)%20calls.turn%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

<details>

<summary>

result: optional object {created, modified, name, uid }

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

uid: string

A Cloudflare-generated unique identifier for a item.

maxLength32

minLength32

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20calls.turn%20%3E%20(method)%20get%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

### Retrieve TURN key details

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/calls/turn_keys/$KEY_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
    "uid": "2a95132c15732412d22c1476fa83f27a"
  }
}
```