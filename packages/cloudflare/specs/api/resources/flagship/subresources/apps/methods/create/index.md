---
title: Create app
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Flagship](https://developers.cloudflare.com/api/resources/flagship)

[Apps](https://developers.cloudflare.com/api/resources/flagship/subresources/apps)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Create app

POST/accounts/{account\_id}/flagship/apps

Creates an app. The returned `id` is used in all subsequent flag, changelog, and evaluation requests.

##### Security

<details>

<summary>API Token</summary>



The preferred authorization scheme for interacting with the Cloudflare API. <a href="https://developers.cloudflare.com/fundamentals/api/get-started/create-token/">Create a token</a>.

**Example:**<code>Authorization: Bearer Sn3lZJTBX6kkg7OdcBUAxOO963GEIyGQqnFTOFYY</code>

</details>

<details>

<summary>API Email + API Key</summary>



The previous authorization scheme for interacting with the Cloudflare API, used in conjunction with a Global API key.

**Example:**<code>X-Auth-Email: user@example.com</code>

The previous authorization scheme for interacting with the Cloudflare API. When possible, use API tokens instead of Global API keys.

**Example:**<code>X-Auth-Key: 144c9defac04969c7bfad8efaa8ea194</code>

</details>

##### Accepted Permissions (at least one required)

`Flagship Write`

##### P ath ParametersExpand Collapse

account\_id: string

Cloudflare account ID.

[Link to this property](#)%20flagship.apps%20%3E%20(method)%20create%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

name: string

maxLength64

minLength1

[Link to this property](#)%20flagship.apps%20%3E%20(method)%20create%20%3E%20(params)%200%20%3E%20(param)%20name%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of object {message }

</summary>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20flagship.apps%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

<details>

<summary>

messages: array of object {message }

</summary>

message: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20flagship.apps%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {id, created\_at, name, 2 more }

</summary>

id: string

<a href="#">Link to this property</a>

created\_at: string

<a href="#">Link to this property</a>

name: string

<a href="#">Link to this property</a>

updated\_at: string

<a href="#">Link to this property</a>

updated\_by: string

Email of the actor who last modified the app, or <code>unknown</code> when unavailable.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20flagship.apps%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20flagship.apps%20%3E%20(method)%20create%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Create app

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/flagship/apps \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "x"
        }'
```

200 example

```
{
  "errors": [
    {
      "message": "message"
    }
  ],
  "messages": [
    {
      "message": "message"
    }
  ],
  "result": {
    "id": "id",
    "created_at": "created_at",
    "name": "name",
    "updated_at": "updated_at",
    "updated_by": "updated_by"
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "errors": [
    {
      "message": "message"
    }
  ],
  "messages": [
    {
      "message": "message"
    }
  ],
  "result": {
    "id": "id",
    "created_at": "created_at",
    "name": "name",
    "updated_at": "updated_at",
    "updated_by": "updated_by"
  },
  "success": true
}
```