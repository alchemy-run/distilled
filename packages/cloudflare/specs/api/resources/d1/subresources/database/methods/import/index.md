---
title: Import SQL into your D1 Database
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[D1](https://developers.cloudflare.com/api/resources/d1)

[Database](https://developers.cloudflare.com/api/resources/d1/subresources/database)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Import SQL into your D1 Database

POST/accounts/{account\_id}/d1/database/{database\_id}/import

Generates a temporary URL for uploading an SQL file to, then instructing the D1 to import it and polling it for status updates. Imports block the D1 for their duration.

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

[Link to this property](#)%20d1.database%20%3E%20(method)%20import%20%3E%20(params)%200%20%3E%20(param)%20account_id%20%3E%20(schema)>)

database\_id: string

D1 database identifier (UUID).

[Link to this property](#)%20d1.database%20%3E%20(method)%20import%20%3E%20(params)%200%20%3E%20(param)%20database_id%20%3E%20(schema)>)

##### Body ParametersJSONExpand Collapse

<details>

<summary>

body: object {action, etag } or object {action, etag, filename } or object {action, current\_bookmark }

</summary>

One of the following:

<details>

<summary>

Init object {action, etag }

</summary>

action: "init"

Indicates you have a new SQL file to upload.

<a href="#">Link to this property</a>

etag: string

Required when action is ‘init’ or ‘ingest’. An md5 hash of the file you’re uploading. Used to check if it already exists, and validate its contents before ingesting.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Ingest object {action, etag, filename }

</summary>

action: "ingest"

Indicates you’ve finished uploading to tell the D1 to start consuming it

<a href="#">Link to this property</a>

etag: string

An md5 hash of the file you’re uploading. Used to check if it already exists, and validate its contents before ingesting.

<a href="#">Link to this property</a>

filename: string

The filename you have successfully uploaded.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

Poll object {action, current\_bookmark }

</summary>

action: "poll"

Indicates you’ve finished uploading to tell the D1 to start consuming it

<a href="#">Link to this property</a>

current\_bookmark: string

This identifies the currently-running import, checking its status.

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20d1.database%20%3E%20(method)%20import%20%3E%20(params)%200%20%3E%20(param)%20body%20%3E%20(schema)>)

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

[Link to this property](#)%20d1.database%20%3E%20(method)%20import%20%3E%20(network%20schema)%20%3E%20(property)%20errors>)

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

[Link to this property](#)%20d1.database%20%3E%20(method)%20import%20%3E%20(network%20schema)%20%3E%20(property)%20messages>)

<details>

<summary>

result: object {at\_bookmark, error, filename, 6 more }

</summary>

at\_bookmark: optional string

The current time-travel bookmark for your D1, used to poll for updates. Will not change for the duration of the import. Only returned if an import process is currently running or recently finished.

<a href="#">Link to this property</a>

error: optional string

Only present when status = ‘error’. Contains the error message that prevented the import from succeeding.

<a href="#">Link to this property</a>

filename: optional string

Derived from the database ID and etag, to use in avoiding repeated uploads. Only returned when for the ‘init’ action.

<a href="#">Link to this property</a>

messages: optional array of string

Logs since the last time you polled

<a href="#">Link to this property</a>

<details>

<summary>

result: optional object {final\_bookmark, meta, num\_queries }

Only present when status = ‘complete’

</summary>

final\_bookmark: optional string

The time-travel bookmark if you need restore your D1 to directly after the import succeeded.

<a href="#">Link to this property</a>

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

num\_queries: optional number

The total number of queries that were executed during the import.

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

type: optional "import"

<a href="#">Link to this property</a>

upload\_url: optional string

The R2 presigned URL to use for uploading. Only returned when for the ‘init’ action.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20d1.database%20%3E%20(method)%20import%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: true

Whether the API call was successful

[Link to this property](#)%20d1.database%20%3E%20(method)%20import%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Import SQL into your D1 Database

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/d1/database/$DATABASE_ID/import \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "action": "init",
          "etag": "etag"
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
    "filename": "filename",
    "messages": [
      "string"
    ],
    "result": {
      "final_bookmark": "final_bookmark",
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
      "num_queries": 0
    },
    "status": "complete",
    "success": true,
    "type": "import",
    "upload_url": "upload_url"
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
    "filename": "filename",
    "messages": [
      "string"
    ],
    "result": {
      "final_bookmark": "final_bookmark",
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
      "num_queries": 0
    },
    "status": "complete",
    "success": true,
    "type": "import",
    "upload_url": "upload_url"
  },
  "success": true
}
```