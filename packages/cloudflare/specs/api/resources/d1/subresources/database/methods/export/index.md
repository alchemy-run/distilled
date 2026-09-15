---
title: Export D1 Database as SQL
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[D1](https://developers.cloudflare.com/api/resources/d1)

[Database](https://developers.cloudflare.com/api/resources/d1/subresources/database)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Export D1 Database as SQL

POST/accounts/{account\_id}/d1/database/{database\_id}/export

Returns a URL where the SQL contents of your D1 can be downloaded. Note: this process may take some time for larger DBs, during which your D1 will be unavailable to serve queries. To avoid blocking your DB unnecessarily, an in-progress export must be continually polled or will automatically cancel.

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

[Link to this property](#)%20d1.database%20%3E%20(method)%20export%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

database\_id: string

D1 database identifier (UUID).

[Link to this property](#)%20d1.database%20%3E%20(method)%20export%20%3E%20(params)%20default%20%3E%20(param)%20database_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

output\_format: "polling"

Specifies that you will poll this endpoint until the export completes

[Link to this property](#)%20d1.database%20%3E%20(method)%20export%20%3E%20(params)%200%20%3E%20(param)%20output_format%20%3E%20(schema)>)

current\_bookmark: optional string

To poll an in-progress export, provide the current bookmark (returned by your first polling response)

[Link to this property](#)%20d1.database%20%3E%20(method)%20export%20%3E%20(params)%200%20%3E%20(param)%20current_bookmark%20%3E%20(schema)>)

<details>

<summary>

dump\_options: optional object {no\_data, no\_schema, tables }

</summary>

no\_data: optional boolean

Export only the table definitions, not their contents

<a href="#">Link to this property</a>

no\_schema: optional boolean

Export only each table’s contents, not its definition

<a href="#">Link to this property</a>

tables: optional array of string

Filter the export to just one or more tables. Passing an empty array is the same as not passing anything and means: export all tables.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20d1.database%20%3E%20(method)%20export%20%3E%20(params)%200%20%3E%20(param)%20dump_options%20%3E%20(schema)>)

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

[Link to this property](#)%20d1.database%20%3E%20(method)%20export%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20d1.database%20%3E%20(method)%20export%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {at\_bookmark, error, messages, 4 more }

</summary>

at\_bookmark: optional string

The current time-travel bookmark for your D1, used to poll for updates. Will not change for the duration of the export task.

<a href="#">Link to this property</a>

error: optional string

Only present when status = ‘error’. Contains the error message.

<a href="#">Link to this property</a>

messages: optional array of string

Logs since the last time you polled

<a href="#">Link to this property</a>

<details>

<summary>

result: optional object {filename, signed\_url }

Only present when status = ‘complete’

</summary>

filename: optional string

The generated SQL filename.

<a href="#">Link to this property</a>

signed\_url: optional string

The URL to download the exported SQL. Available for one hour.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

status: optional "complete"or "error"

</summary>

One of the following:

"complete"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: optional boolean

<a href="#">Link to this property</a>

type: optional "export"

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20d1.database%20%3E%20(method)%20export%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20d1.database%20%3E%20(method)%20export%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Export D1 Database as SQL

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/d1/database/$DATABASE_ID/export \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "output_format": "polling"
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
  "result": {
    "at_bookmark": "at_bookmark",
    "error": "error",
    "messages": [
      "string"
    ],
    "result": {
      "filename": "filename",
      "signed_url": "signed_url"
    },
    "status": "complete",
    "success": true,
    "type": "export"
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
    "at_bookmark": "at_bookmark",
    "error": "error",
    "messages": [
      "string"
    ],
    "result": {
      "filename": "filename",
      "signed_url": "signed_url"
    },
    "status": "complete",
    "success": true,
    "type": "export"
  },
  "success": true
}
```