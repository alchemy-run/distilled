---
title: Items
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI Search](https://developers.cloudflare.com/api/resources/ai_search)

[Namespaces](https://developers.cloudflare.com/api/resources/ai_search/subresources/namespaces)

[Instances](https://developers.cloudflare.com/api/resources/ai_search/subresources/namespaces/subresources/instances)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Items

##### [Items List.](https://developers.cloudflare.com/api/resources/ai_search/subresources/namespaces/subresources/instances/subresources/items/methods/list)

GET/accounts/{account\_id}/ai-search/namespaces/{name}/instances/{id}/items

##### [Upload Item.](https://developers.cloudflare.com/api/resources/ai_search/subresources/namespaces/subresources/instances/subresources/items/methods/upload)

POST/accounts/{account\_id}/ai-search/namespaces/{name}/instances/{id}/items

##### [Create or Update Item.](https://developers.cloudflare.com/api/resources/ai_search/subresources/namespaces/subresources/instances/subresources/items/methods/create_or_update)

PUT/accounts/{account\_id}/ai-search/namespaces/{name}/instances/{id}/items

##### [Get Item.](https://developers.cloudflare.com/api/resources/ai_search/subresources/namespaces/subresources/instances/subresources/items/methods/get)

GET/accounts/{account\_id}/ai-search/namespaces/{name}/instances/{id}/items/{item\_id}

##### [Sync Item.](https://developers.cloudflare.com/api/resources/ai_search/subresources/namespaces/subresources/instances/subresources/items/methods/sync)

PATCH/accounts/{account\_id}/ai-search/namespaces/{name}/instances/{id}/items/{item\_id}

##### [Delete Item.](https://developers.cloudflare.com/api/resources/ai_search/subresources/namespaces/subresources/instances/subresources/items/methods/delete)

DELETE/accounts/{account\_id}/ai-search/namespaces/{name}/instances/{id}/items/{item\_id}

##### [Download Item Content.](https://developers.cloudflare.com/api/resources/ai_search/subresources/namespaces/subresources/instances/subresources/items/methods/download)

GET/accounts/{account\_id}/ai-search/namespaces/{name}/instances/{id}/items/{item\_id}/download

##### [Item Logs.](https://developers.cloudflare.com/api/resources/ai_search/subresources/namespaces/subresources/instances/subresources/items/methods/logs)

GET/accounts/{account\_id}/ai-search/namespaces/{name}/instances/{id}/items/{item\_id}/logs

##### [List Item Chunks.](https://developers.cloudflare.com/api/resources/ai_search/subresources/namespaces/subresources/instances/subresources/items/methods/chunks)

GET/accounts/{account\_id}/ai-search/namespaces/{name}/instances/{id}/items/{item\_id}/chunks

##### ModelsExpand Collapse

<details>

<summary>

ItemListResponse object {id, checksum, chunks\_count, 10 more }

</summary>

id: string

<a href="#">Link to this property</a>

checksum: string

<a href="#">Link to this property</a>

chunks\_count: number

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

file\_size: number

<a href="#">Link to this property</a>

key: string

<a href="#">Link to this property</a>

last\_seen\_at: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

metadata: map\[stringor numberor boolean]

Built-in, configured filterable, and retained source metadata for the item.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

namespace: string

<a href="#">Link to this property</a>

<details>

<summary>

next\_action: "INDEX"or "DELETE"

</summary>

One of the following:

"INDEX"

<a href="#">Link to this property</a>

"DELETE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

source\_id: string

Identifies which data source this item belongs to. “builtin” for uploaded files, “{type}:{source}” for external sources, null for legacy items.

<a href="#">Link to this property</a>

<details>

<summary>

status: "queued"or "running"or "completed"or 3 more

</summary>

One of the following:

"queued"

<a href="#">Link to this property</a>

"running"

<a href="#">Link to this property</a>

"completed"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

"skipped"

<a href="#">Link to this property</a>

"outdated"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

error: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_search.namespaces.instances.items%20%3E%20(model)%20item_list_response%20%3E%20(schema)>)

<details>

<summary>

ItemUploadResponse object {id, checksum, chunks\_count, 11 more }

</summary>

id: string

<a href="#">Link to this property</a>

checksum: string

<a href="#">Link to this property</a>

chunks\_count: number

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

file\_size: number

<a href="#">Link to this property</a>

key: string

<a href="#">Link to this property</a>

last\_seen\_at: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

metadata: map\[stringor numberor boolean]

Built-in, configured filterable, and retained source metadata for the item.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

namespace: string

<a href="#">Link to this property</a>

<details>

<summary>

next\_action: "INDEX"or "DELETE"

</summary>

One of the following:

"INDEX"

<a href="#">Link to this property</a>

"DELETE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

source\_id: string

Identifies which data source this item belongs to. “builtin” for uploaded files, “{type}:{source}” for external sources, null for legacy items.

<a href="#">Link to this property</a>

<details>

<summary>

status: "queued"or "running"or "completed"or 3 more

</summary>

One of the following:

"queued"

<a href="#">Link to this property</a>

"running"

<a href="#">Link to this property</a>

"completed"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

"skipped"

<a href="#">Link to this property</a>

"outdated"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

error: optional string

<a href="#">Link to this property</a>

<details>

<summary>

warnings: optional array of object {code, expected\_type, field } or object {code, field }

</summary>

One of the following:

<details>

<summary>

object {code, expected\_type, field }

</summary>

code: "custom\_metadata\_value\_not\_indexed"

<a href="#">Link to this property</a>

<details>

<summary>

expected\_type: "text"or "number"or "boolean"or "datetime"

</summary>

One of the following:

"text"

<a href="#">Link to this property</a>

"number"

<a href="#">Link to this property</a>

"boolean"

<a href="#">Link to this property</a>

"datetime"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

field: string

maxLength512

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

object {code, field }

</summary>

code: "custom\_metadata\_field\_not\_filterable"

<a href="#">Link to this property</a>

field: string

maxLength512

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_search.namespaces.instances.items%20%3E%20(model)%20item_upload_response%20%3E%20(schema)>)

<details>

<summary>

ItemCreateOrUpdateResponse object {id, checksum, chunks\_count, 10 more }

</summary>

id: string

<a href="#">Link to this property</a>

checksum: string

<a href="#">Link to this property</a>

chunks\_count: number

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

file\_size: number

<a href="#">Link to this property</a>

key: string

<a href="#">Link to this property</a>

last\_seen\_at: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

metadata: map\[stringor numberor boolean]

Built-in, configured filterable, and retained source metadata for the item.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

namespace: string

<a href="#">Link to this property</a>

<details>

<summary>

next\_action: "INDEX"or "DELETE"

</summary>

One of the following:

"INDEX"

<a href="#">Link to this property</a>

"DELETE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

source\_id: string

Identifies which data source this item belongs to. “builtin” for uploaded files, “{type}:{source}” for external sources, null for legacy items.

<a href="#">Link to this property</a>

<details>

<summary>

status: "queued"or "running"or "completed"or 3 more

</summary>

One of the following:

"queued"

<a href="#">Link to this property</a>

"running"

<a href="#">Link to this property</a>

"completed"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

"skipped"

<a href="#">Link to this property</a>

"outdated"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

error: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_search.namespaces.instances.items%20%3E%20(model)%20item_create_or_update_response%20%3E%20(schema)>)

<details>

<summary>

ItemGetResponse object {id, checksum, chunks\_count, 10 more }

</summary>

id: string

<a href="#">Link to this property</a>

checksum: string

<a href="#">Link to this property</a>

chunks\_count: number

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

file\_size: number

<a href="#">Link to this property</a>

key: string

<a href="#">Link to this property</a>

last\_seen\_at: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

metadata: map\[stringor numberor boolean]

Built-in, configured filterable, and retained source metadata for the item.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

namespace: string

<a href="#">Link to this property</a>

<details>

<summary>

next\_action: "INDEX"or "DELETE"

</summary>

One of the following:

"INDEX"

<a href="#">Link to this property</a>

"DELETE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

source\_id: string

Identifies which data source this item belongs to. “builtin” for uploaded files, “{type}:{source}” for external sources, null for legacy items.

<a href="#">Link to this property</a>

<details>

<summary>

status: "queued"or "running"or "completed"or 3 more

</summary>

One of the following:

"queued"

<a href="#">Link to this property</a>

"running"

<a href="#">Link to this property</a>

"completed"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

"skipped"

<a href="#">Link to this property</a>

"outdated"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

error: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_search.namespaces.instances.items%20%3E%20(model)%20item_get_response%20%3E%20(schema)>)

<details>

<summary>

ItemSyncResponse object {id, checksum, chunks\_count, 10 more }

</summary>

id: string

<a href="#">Link to this property</a>

checksum: string

<a href="#">Link to this property</a>

chunks\_count: number

<a href="#">Link to this property</a>

created\_at: string

formatdate-time

<a href="#">Link to this property</a>

file\_size: number

<a href="#">Link to this property</a>

key: string

<a href="#">Link to this property</a>

last\_seen\_at: string

formatdate-time

<a href="#">Link to this property</a>

<details>

<summary>

metadata: map\[stringor numberor boolean]

Built-in, configured filterable, and retained source metadata for the item.

</summary>

One of the following:

string

<a href="#">Link to this property</a>

number

<a href="#">Link to this property</a>

boolean

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

namespace: string

<a href="#">Link to this property</a>

<details>

<summary>

next\_action: "INDEX"or "DELETE"

</summary>

One of the following:

"INDEX"

<a href="#">Link to this property</a>

"DELETE"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

source\_id: string

Identifies which data source this item belongs to. “builtin” for uploaded files, “{type}:{source}” for external sources, null for legacy items.

<a href="#">Link to this property</a>

<details>

<summary>

status: "queued"or "running"or "completed"or 3 more

</summary>

One of the following:

"queued"

<a href="#">Link to this property</a>

"running"

<a href="#">Link to this property</a>

"completed"

<a href="#">Link to this property</a>

"error"

<a href="#">Link to this property</a>

"skipped"

<a href="#">Link to this property</a>

"outdated"

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

error: optional string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_search.namespaces.instances.items%20%3E%20(model)%20item_sync_response%20%3E%20(schema)>)

<details>

<summary>

ItemDeleteResponse object {key }

</summary>

key: string

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_search.namespaces.instances.items%20%3E%20(model)%20item_delete_response%20%3E%20(schema)>)

<details>

<summary>

ItemLogsResponse = array of object {action, chunkCount, errorType, 4 more }

</summary>

action: string

<a href="#">Link to this property</a>

chunkCount: number

<a href="#">Link to this property</a>

errorType: string

<a href="#">Link to this property</a>

fileKey: string

<a href="#">Link to this property</a>

message: string

<a href="#">Link to this property</a>

processingTimeMs: number

<a href="#">Link to this property</a>

timestamp: string

formatdate-time

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_search.namespaces.instances.items%20%3E%20(model)%20item_logs_response%20%3E%20(schema)>)

<details>

<summary>

ItemChunksResponse = array of object {id, item, text, 2 more }

</summary>

id: string

<a href="#">Link to this property</a>

<details>

<summary>

item: object {key, metadata, timestamp }

</summary>

key: string

<a href="#">Link to this property</a>

metadata: optional map\[unknown]

<a href="#">Link to this property</a>

timestamp: optional number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

text: string

<a href="#">Link to this property</a>

end\_byte: optional number

<a href="#">Link to this property</a>

start\_byte: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_search.namespaces.instances.items%20%3E%20(model)%20item_chunks_response%20%3E%20(schema)>)