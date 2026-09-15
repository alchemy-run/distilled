---
title: Upload Item.
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[AI Search](https://developers.cloudflare.com/api/resources/ai_search)

[Namespaces](https://developers.cloudflare.com/api/resources/ai_search/subresources/namespaces)

[Instances](https://developers.cloudflare.com/api/resources/ai_search/subresources/namespaces/subresources/instances)

[Items](https://developers.cloudflare.com/api/resources/ai_search/subresources/namespaces/subresources/instances/subresources/items)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Upload Item.

POST/accounts/{account\_id}/ai-search/namespaces/{name}/instances/{id}/items

Uploads a file to a managed AI Search instance via multipart/form-data.

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

[Link to this property](#)%20ai_search.namespaces.instances.items%20%3E%20(method)%20upload%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

name: string

[Link to this property](#)%20ai_search.namespaces.instances.items%20%3E%20(method)%20upload%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

id: string

AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.

maxLength64

minLength1

[Link to this property](#)%20ai_search.namespaces.instances.items%20%3E%20(method)%20upload%20%3E%20(params)%20default%20%3E%20(param)%20id%20%3E%20(schema)>)

##### Body ParametersForm DataExpand Collapse

<details>

<summary>

file: object {file, metadata, wait\_for\_completion }

</summary>

file: string

The file to upload. Filename must not exceed 128 characters.

<a href="#">Link to this property</a>

metadata: optional string

JSON string of custom metadata key-value pairs.

<a href="#">Link to this property</a>

wait\_for\_completion: optional boolean

Wait for indexing to fully complete before responding. On RAGs with vector indexing enabled, this additionally waits for Vectorize ingestion confirmation (up to 40s) so the returned item reflects a queryable state. On timeout the item is returned in <code>running</code> state and the background alarm continues polling. Defaults to false.

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_search.namespaces.instances.items%20%3E%20(method)%20upload%20%3E%20(params)%200%20%3E%20(param)%20file%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {id, checksum, chunks\_count, 11 more }

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

[Link to this property](#)%20ai_search.namespaces.instances.items%20%3E%20(method)%20upload%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20ai_search.namespaces.instances.items%20%3E%20(method)%20upload%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Upload Item.

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME/instances/$ID/items \
    -H 'Content-Type: multipart/form-data' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -F file='{"file":"Example data"}'
```

200 example

```
{
  "result": {
    "id": "id",
    "checksum": "checksum",
    "chunks_count": 0,
    "created_at": "2019-12-27T18:11:19.117Z",
    "file_size": 0,
    "key": "key",
    "last_seen_at": "2019-12-27T18:11:19.117Z",
    "metadata": {
      "foo": "string"
    },
    "namespace": "namespace",
    "next_action": "INDEX",
    "source_id": "source_id",
    "status": "queued",
    "error": "error",
    "warnings": [
      {
        "code": "custom_metadata_value_not_indexed",
        "expected_type": "text",
        "field": "field"
      }
    ]
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "id": "id",
    "checksum": "checksum",
    "chunks_count": 0,
    "created_at": "2019-12-27T18:11:19.117Z",
    "file_size": 0,
    "key": "key",
    "last_seen_at": "2019-12-27T18:11:19.117Z",
    "metadata": {
      "foo": "string"
    },
    "namespace": "namespace",
    "next_action": "INDEX",
    "source_id": "source_id",
    "status": "queued",
    "error": "error",
    "warnings": [
      {
        "code": "custom_metadata_value_not_indexed",
        "expected_type": "text",
        "field": "field"
      }
    ]
  },
  "success": true
}
```