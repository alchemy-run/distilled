---
title: Database
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[D1](https://developers.cloudflare.com/api/resources/d1)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Database

##### [List D1 Databases](https://developers.cloudflare.com/api/resources/d1/subresources/database/methods/list)

GET/accounts/{account\_id}/d1/database

##### [Get D1 Database](https://developers.cloudflare.com/api/resources/d1/subresources/database/methods/get)

GET/accounts/{account\_id}/d1/database/{database\_id}

##### [Create D1 Database](https://developers.cloudflare.com/api/resources/d1/subresources/database/methods/create)

POST/accounts/{account\_id}/d1/database

##### [Update D1 Database](https://developers.cloudflare.com/api/resources/d1/subresources/database/methods/update)

PUT/accounts/{account\_id}/d1/database/{database\_id}

##### [Update D1 Database partially](https://developers.cloudflare.com/api/resources/d1/subresources/database/methods/edit)

PATCH/accounts/{account\_id}/d1/database/{database\_id}

##### [Delete D1 Database](https://developers.cloudflare.com/api/resources/d1/subresources/database/methods/delete)

DELETE/accounts/{account\_id}/d1/database/{database\_id}

##### [Query D1 Database](https://developers.cloudflare.com/api/resources/d1/subresources/database/methods/query)

POST/accounts/{account\_id}/d1/database/{database\_id}/query

##### [Raw D1 Database query](https://developers.cloudflare.com/api/resources/d1/subresources/database/methods/raw)

POST/accounts/{account\_id}/d1/database/{database\_id}/raw

##### [Export D1 Database as SQL](https://developers.cloudflare.com/api/resources/d1/subresources/database/methods/export)

POST/accounts/{account\_id}/d1/database/{database\_id}/export

##### [Import SQL into your D1 Database](https://developers.cloudflare.com/api/resources/d1/subresources/database/methods/import)

POST/accounts/{account\_id}/d1/database/{database\_id}/import

##### ModelsExpand Collapse

<details>

<summary>

QueryResult object {meta, results, success }

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

results: optional array of unknown

<a href="#">Link to this property</a>

success: optional boolean

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20d1.database%20%3E%20(model)%20query_result%20%3E%20(schema)>)

<details>

<summary>

DatabaseListResponse object {created\_at, jurisdiction, name, 2 more }

</summary>

created\_at: optional string

Specifies the timestamp the resource was created as an ISO8601 string.

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

jurisdiction: optional "eu"or "fedramp"or "us"

Specify the location to restrict the D1 database to run and store data. If this option is present, the location hint is ignored.

</summary>

One of the following:

"eu"

<a href="#">Link to this property</a>

"fedramp"

<a href="#">Link to this property</a>

"us"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

name: optional string

D1 database name.

<a href="#">Link to this property</a>

uuid: optional string

D1 database identifier (UUID).

<a href="#">Link to this property</a>

version: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20d1.database%20%3E%20(model)%20database_list_response%20%3E%20(schema)>)

DatabaseDeleteResponse = unknown

[Link to this property](#)%20d1.database%20%3E%20(model)%20database_delete_response%20%3E%20(schema)>)

<details>

<summary>

DatabaseRawResponse object {meta, results, success }

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

[Link to this property](#)%20d1.database%20%3E%20(model)%20database_raw_response%20%3E%20(schema)>)

<details>

<summary>

DatabaseExportResponse object {at\_bookmark, error, messages, 4 more }

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

[Link to this property](#)%20d1.database%20%3E%20(model)%20database_export_response%20%3E%20(schema)>)

<details>

<summary>

DatabaseImportResponse object {at\_bookmark, error, filename, 6 more }

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

[Link to this property](#)%20d1.database%20%3E%20(model)%20database_import_response%20%3E%20(schema)>)

#### DatabaseTime Travel

##### [Get D1 database bookmark](https://developers.cloudflare.com/api/resources/d1/subresources/database/subresources/time_travel/methods/get_bookmark)

GET/accounts/{account\_id}/d1/database/{database\_id}/time\_travel/bookmark

##### [Restore D1 Database to a bookmark or point in time](https://developers.cloudflare.com/api/resources/d1/subresources/database/subresources/time_travel/methods/restore)

POST/accounts/{account\_id}/d1/database/{database\_id}/time\_travel/restore

##### ModelsExpand Collapse

<details>

<summary>

TimeTravelGetBookmarkResponse object {bookmark }

</summary>

bookmark: optional string

A bookmark representing a specific state of the database at a specific point in time.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20d1.database.time_travel%20%3E%20(model)%20time_travel_get_bookmark_response%20%3E%20(schema)>)

<details>

<summary>

TimeTravelRestoreResponse object {bookmark, message, previous\_bookmark }

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

[Link to this property](#)%20d1.database.time_travel%20%3E%20(model)%20time_travel_restore_response%20%3E%20(schema)>)