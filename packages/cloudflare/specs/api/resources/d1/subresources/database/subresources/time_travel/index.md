---
title: Time Travel
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[D1](https://developers.cloudflare.com/api/resources/d1)

[Database](https://developers.cloudflare.com/api/resources/d1/subresources/database)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Time Travel

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