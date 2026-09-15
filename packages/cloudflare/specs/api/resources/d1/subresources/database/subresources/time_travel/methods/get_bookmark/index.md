---
title: Get D1 database bookmark
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[D1](https://developers.cloudflare.com/api/resources/d1)

[Database](https://developers.cloudflare.com/api/resources/d1/subresources/database)

[Time Travel](https://developers.cloudflare.com/api/resources/d1/subresources/database/subresources/time_travel)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Get D1 database bookmark

GET/accounts/{account\_id}/d1/database/{database\_id}/time\_travel/bookmark

Retrieves the current bookmark, or the nearest bookmark at or before a provided timestamp. Bookmarks can be used with the restore endpoint to revert the database to a previous point in time.

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

`D1 Read``D1 Write`

##### P ath ParametersExpand Collapse

account\_id: string

Account identifier tag.

maxLength32

[Link to this property](#)%20d1.database.time_travel%20%3E%20(method)%20get_bookmark%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

database\_id: string

D1 database identifier (UUID).

[Link to this property](#)%20d1.database.time_travel%20%3E%20(method)%20get_bookmark%20%3E%20(params)%20default%20%3E%20(param)%20database_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

timestamp: optional string

An optional ISO 8601 timestamp. If provided, returns the nearest available bookmark at or before this timestamp. If omitted, returns the current bookmark.

formatdate-time

[Link to this property](#)%20d1.database.time_travel%20%3E%20(method)%20get_bookmark%20%3E%20(params)%20default%20%3E%20(param)%20timestamp%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

errors: array of <a href="https://developers.cloudflare.com/api/resources/$shared#(resource)%20%24shared%20%3E%20(model)%20response_info%20%3E%20(schema)">ResponseInfo</a> { code, message, documentation\_url, source }

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

[Link to this property](#)%20d1.database.time_travel%20%3E%20(method)%20get_bookmark%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20d1.database.time_travel%20%3E%20(method)%20get_bookmark%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {bookmark }

</summary>

bookmark: optional string

A bookmark representing a specific state of the database at a specific point in time.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20d1.database.time_travel%20%3E%20(method)%20get_bookmark%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20d1.database.time_travel%20%3E%20(method)%20get_bookmark%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get D1 database bookmark

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/d1/database/$DATABASE_ID/time_travel/bookmark \
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
  "result": {
    "bookmark": "00000001-00000002-00004e2f-0a83ea2fceebc654de0640c422be4653"
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
  "result": {
    "bookmark": "00000001-00000002-00004e2f-0a83ea2fceebc654de0640c422be4653"
  },
  "success": true
}
```