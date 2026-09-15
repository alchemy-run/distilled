---
title: Raw D1 Database query
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[D1](https://developers.cloudflare.com/api/resources/d1)

[Database](https://developers.cloudflare.com/api/resources/d1/subresources/database)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Raw D1 Database query

POST/accounts/{account\_id}/d1/database/{database\_id}/raw

Returns the query result rows as arrays rather than objects. This is a performance-optimized version of the /query endpoint.

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

[Link to this property](#)%20d1.database%20%3E%20(method)%20raw%20%3E%20(params)%200%20%3E%20(param)%20account_id%20%3E%20(schema)>)

database\_id: string

D1 database identifier (UUID).

[Link to this property](#)%20d1.database%20%3E%20(method)%20raw%20%3E%20(params)%200%20%3E%20(param)%20database_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

body: object {sql, params } or object {batch }

A single query object or a batch query object

</summary>

One of the following:

<details>

<summary>

D1SingleQuery object {sql, params }

A single query with or without parameters

</summary>

sql: string

Your SQL query. Supports multiple statements, joined by semicolons, which will be executed as a batch.

<a href="#">Link to this property</a>

params: optional array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

MultipleQueries object {batch }

</summary>

<details>

<summary>

batch: array of object {sql, params }

</summary>

sql: string

Your SQL query. Supports multiple statements, joined by semicolons, which will be executed as a batch.

<a href="#">Link to this property</a>

params: optional array of string

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20d1.database%20%3E%20(method)%20raw%20%3E%20(params)%200%20%3E%20(param)%20body%20%3E%20(schema)>)

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

[Link to this property](#)%20d1.database%20%3E%20(method)%20raw%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20d1.database%20%3E%20(method)%20raw%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: array of object {meta, results, success }

</summary>

<details>

<summary>

meta: optional object {changed\_db, changes, duration, 8 more }

</summary>

changed\_db: optional boolean

Denotes if the database has been altered in some way, like deleting rows.

<a href="#">Link to this property</a>

changes: optional number

Rough indication of how many rows were modified by the query, as provided by SQLite’s <code>sqlite3_total_changes()</code>.

<a href="#">Link to this property</a>

duration: optional number

The duration of the SQL query execution inside the database. Does not include any network communication.

<a href="#">Link to this property</a>

last\_row\_id: optional number

The row ID of the last inserted row in a table with an <code>INTEGER PRIMARY KEY</code> as provided by SQLite. Tables created with <code>WITHOUT ROWID</code> do not populate this.

<a href="#">Link to this property</a>

rows\_read: optional number

Number of rows read during the SQL query execution, including indices (not all rows are necessarily returned).

<a href="#">Link to this property</a>

rows\_written: optional number

Number of rows written during the SQL query execution, including indices.

<a href="#">Link to this property</a>

served\_by\_colo: optional string

The three letters airport code of the colo that handled the query.

<a href="#">Link to this property</a>

served\_by\_primary: optional boolean

Denotes if the query has been handled by the database primary instance.

<a href="#">Link to this property</a>

<details>

<summary>

served\_by\_region: optional "WNAM"or "ENAM"or "WEUR"or 3 more

Region location hint of the database instance that handled the query.

</summary>

One of the following:

"WNAM"

<a href="#">Link to this property</a>

"ENAM"

<a href="#">Link to this property</a>

"WEUR"

<a href="#">Link to this property</a>

"EEUR"

<a href="#">Link to this property</a>

"APAC"

<a href="#">Link to this property</a>

"OC"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

size\_after: optional number

Size of the database after the query committed, in bytes.

<a href="#">Link to this property</a>

<details>

<summary>

timings: optional object {sql\_duration\_ms }

Various durations for the query.

</summary>

sql\_duration\_ms: optional number

The duration of the SQL query execution inside the database. Does not include any network communication.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

results: optional object {columns, rows }

</summary>

columns: optional array of string

<a href="#">Link to this property</a>

<details>

<summary>

rows: optional array of array of numberor stringor unknown

</summary>

One of the following:

number

<a href="#">Link to this property</a>

string

<a href="#">Link to this property</a>

unknown

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

success: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20d1.database%20%3E%20(method)%20raw%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20d1.database%20%3E%20(method)%20raw%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Raw D1 Database query

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/d1/database/$DATABASE_ID/raw \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "sql": "SELECT * FROM myTable WHERE field = ? OR field = ?;",
          "params": [
            "firstParam",
            "secondParam"
          ]
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
  "result": [
    {
      "meta": {
        "changed_db": true,
        "changes": 0,
        "duration": 0,
        "last_row_id": 0,
        "rows_read": 0,
        "rows_written": 0,
        "served_by_colo": "LHR",
        "served_by_primary": true,
        "served_by_region": "EEUR",
        "size_after": 0,
        "timings": {
          "sql_duration_ms": 0
        }
      },
      "results": {
        "columns": [
          "string"
        ],
        "rows": [
          [
            0
          ]
        ]
      },
      "success": true
    }
  ],
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
  "result": [
    {
      "meta": {
        "changed_db": true,
        "changes": 0,
        "duration": 0,
        "last_row_id": 0,
        "rows_read": 0,
        "rows_written": 0,
        "served_by_colo": "LHR",
        "served_by_primary": true,
        "served_by_region": "EEUR",
        "size_after": 0,
        "timings": {
          "sql_duration_ms": 0
        }
      },
      "results": {
        "columns": [
          "string"
        ],
        "rows": [
          [
            0
          ]
        ]
      },
      "success": true
    }
  ],
  "success": true
}
```