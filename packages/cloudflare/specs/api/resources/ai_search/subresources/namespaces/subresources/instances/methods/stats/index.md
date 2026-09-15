---
title: Get instance statistics.
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

# Get instance statistics.

GET/accounts/{account\_id}/ai-search/namespaces/{name}/instances/{id}/stats

Retrieve usage and indexing statistics for an AI Search instance.

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

[Link to this property](#)%20ai_search.namespaces.instances%20%3E%20(method)%20stats%20%3E%20(params)%20default%20%3E%20(param)%20account_id%20%3E%20(schema)>)

name: string

[Link to this property](#)%20ai_search.namespaces.instances%20%3E%20(method)%20stats%20%3E%20(params)%20default%20%3E%20(param)%20name%20%3E%20(schema)>)

id: string

AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.

maxLength64

minLength1

[Link to this property](#)%20ai_search.namespaces.instances%20%3E%20(method)%20stats%20%3E%20(params)%20default%20%3E%20(param)%20id%20%3E%20(schema)>)

##### ReturnsExpand Collapse

<details>

<summary>

result: object {completed, degraded, engine, 8 more }

</summary>

completed: optional number

<a href="#">Link to this property</a>

degraded: optional boolean

True when status counts are unavailable (e.g. legacy stats query exceeded D1 statement-size limit). Counts are omitted in this case.

<a href="#">Link to this property</a>

<details>

<summary>

engine: optional object {r2, vectorize }

Engine-specific metadata. Present only for managed (v3) instances.

</summary>

<details>

<summary>

r2: optional object {metadataSizeBytes, objectCount, payloadSizeBytes }

R2 bucket storage usage in bytes.

</summary>

metadataSizeBytes: number

<a href="#">Link to this property</a>

objectCount: number

<a href="#">Link to this property</a>

payloadSizeBytes: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

vectorize: optional object {dimensions, vectorsCount }

Vectorize index metadata (dimensions, vector count).

</summary>

dimensions: number

<a href="#">Link to this property</a>

vectorsCount: number

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

error: optional number

<a href="#">Link to this property</a>

file\_embed\_errors: optional map\[unknown]

<a href="#">Link to this property</a>

index\_source\_errors: optional map\[unknown]

<a href="#">Link to this property</a>

last\_activity: optional string

formatdate-time

<a href="#">Link to this property</a>

outdated: optional number

<a href="#">Link to this property</a>

queued: optional number

<a href="#">Link to this property</a>

running: optional number

<a href="#">Link to this property</a>

skipped: optional number

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20ai_search.namespaces.instances%20%3E%20(method)%20stats%20%3E%20(network%20schema)%20%3E%20(property)%20result>)

success: boolean

[Link to this property](#)%20ai_search.namespaces.instances%20%3E%20(method)%20stats%20%3E%20(network%20schema)%20%3E%20(property)%20success>)

### Get instance statistics.

HTTP

HTTPTypeScriptPythonGoTerraform

```
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME/instances/$ID/stats \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

200 example

```
{
  "result": {
    "completed": 0,
    "degraded": true,
    "engine": {
      "r2": {
        "metadataSizeBytes": 0,
        "objectCount": 0,
        "payloadSizeBytes": 0
      },
      "vectorize": {
        "dimensions": 0,
        "vectorsCount": 0
      }
    },
    "error": 0,
    "file_embed_errors": {
      "foo": "bar"
    },
    "index_source_errors": {
      "foo": "bar"
    },
    "last_activity": "2019-12-27T18:11:19.117Z",
    "outdated": 0,
    "queued": 0,
    "running": 0,
    "skipped": 0
  },
  "success": true
}
```

##### Returns Examples

200 example

```
{
  "result": {
    "completed": 0,
    "degraded": true,
    "engine": {
      "r2": {
        "metadataSizeBytes": 0,
        "objectCount": 0,
        "payloadSizeBytes": 0
      },
      "vectorize": {
        "dimensions": 0,
        "vectorsCount": 0
      }
    },
    "error": 0,
    "file_embed_errors": {
      "foo": "bar"
    },
    "index_source_errors": {
      "foo": "bar"
    },
    "last_activity": "2019-12-27T18:11:19.117Z",
    "outdated": 0,
    "queued": 0,
    "running": 0,
    "skipped": 0
  },
  "success": true
}
```