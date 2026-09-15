---
title: Restore D1 Database to a bookmark or point in time
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

# Restore D1 Database to a bookmark or point in time

POST/accounts/{account\_id}/d1/database/{database\_id}/time\_travel/restore

Restores a D1 database to a previous point in time either via a bookmark or a timestamp.

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

##### P ath ParametersExpand Collapse

account\_id: string

Account identifier tag.

maxLength32

[Link to this property](#)%20d1.database.time_travel%20%3E%20(method)%20restore%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

database\_id: string

D1 database identifier (UUID).

[Link to this property](#)%20d1.database.time_travel%20%3E%20(method)%20restore%20%3E%20(params)%20default%20%3E%20(param)%20database_id%20%3E%20(schema)>)

##### Q uery ParametersExpand Collapse

bookmark: optional string

A bookmark to restore the database to. Required if `timestamp` is not provided.

[Link to this property](#)%20d1.database.time_travel%20%3E%20(method)%20restore%20%3E%20(params)%20default%20%3E%20(param)%20bookmark%20%3E%20(schema)>)

timestamp: optional string

An ISO 8601 timestamp to restore the database to. Required if `bookmark` is not provided.

formatdate-time

[Link to this property](#)%20d1.database.time_travel%20%3E%20(method)%20restore%20%3E%20(params)%20default%20%3E%20(param)%20timestamp%20%3E%20(schema)>)

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

[Link to this property](#)%20d1.database.time_travel%20%3E%20(method)%20restore%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20d1.database.time_travel%20%3E%20(method)%20restore%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {bookmark, message, previous\_bookmark }

Response from a time travel restore operation.

</summary>

bookmark: optional string

The new bookmark representing the state of the database after the restore operation.

<a href="#">Link to this property</a>

message: optional string

A message describing the result of the restore operation.

<a href="#">Link to this property</a>

previous\_bookmark: optional string

The bookmark representing the state of the database before the restore operation. Can be used to undo the restore if needed.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20d1.database.time_travel%20%3E%20(method)%20restore%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20d1.database.time_travel%20%3E%20(method)%20restore%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Restore D1 Database to a bookmark or point in time

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/d1/database/$DATABASE_ID/time_travel/restore \
    -X POST \
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
    "bookmark": "00000001-00000002-00004e2f-0a83ea2fceebc654de0640c422be4653",
    "message": "Database restored successfully",
    "previous_bookmark": "00000001-00000002-00004e2f-0a83ea2fceebc654de0640c422be4653"
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
    "bookmark": "00000001-00000002-00004e2f-0a83ea2fceebc654de0640c422be4653",
    "message": "Database restored successfully",
    "previous_bookmark": "00000001-00000002-00004e2f-0a83ea2fceebc654de0640c422be4653"
  },
  "success": true
}
```